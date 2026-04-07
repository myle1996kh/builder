import { NextRequest, NextResponse } from 'next/server'
import OpenAI from 'openai'
import { db } from '@/lib/db'

type Role = 'user' | 'assistant'

interface ChatMessage {
  role: Role
  content: string
}

interface IntakeFormData {
  name: string
  email: string
  goal: string
  timeSpent: string
  tools: string
  deadline: string
  budget: string
  freeSlot: 'yes' | 'no'
  friction: string
}

interface LlmResult {
  reply: string
  fields: Partial<IntakeFormData>
  readyToSubmit: boolean
  missingFields: string[]
}

interface IntakeRequestBody {
  conversationId?: string
  language?: 'vi' | 'en'
  messages?: ChatMessage[]
  formData?: Partial<IntakeFormData>
}

const REQUIRED_FIELDS: Array<keyof IntakeFormData> = [
  'name',
  'email',
  'goal',
  'timeSpent',
  'deadline',
  'budget',
  'freeSlot',
  'friction',
]

const OPENAI_COMPAT_BASE_URL = process.env.OPENAI_COMPAT_BASE_URL || 'https://9router.vuhai.io.vn/v1'
const OPENAI_COMPAT_MODEL = process.env.OPENAI_COMPAT_MODEL || 'ces-chatbot-gpt-5.4'
const OPENAI_COMPAT_API_KEY = process.env.OPENAI_COMPAT_API_KEY

function getMissingFields(data: IntakeFormData) {
  return REQUIRED_FIELDS.filter((field) => !String(data[field] || '').trim())
}

function getConversationStage(missingFields: string[]) {
  if (missingFields.length >= 6) return 'discover'
  if (missingFields.length >= 3) return 'clarify'
  if (missingFields.length >= 1) return 'qualify'
  return 'close'
}

async function tryCreateLeadFromIntake(payload: IntakeFormData & { conversationId?: string }) {
  const lead = await safeDb(
    () =>
      db.lead.create({
        data: {
          name: payload.name,
          email: payload.email,
          goal: payload.goal,
          timeSpent: payload.timeSpent,
          tools: payload.tools,
          deadline: payload.deadline,
          budget: payload.budget,
          freeSlot: payload.freeSlot,
          friction: payload.friction,
          source: 'chatbot',
          conversationId: payload.conversationId,
        },
      }),
    null
  )

  return lead
}

function parseJsonFromText(text: string): LlmResult | null {
  try {
    return JSON.parse(text) as LlmResult
  } catch {
    // Try extracting JSON block if model wraps in markdown
    const match = text.match(/\{[\s\S]*\}/)
    if (!match) return null
    try {
      return JSON.parse(match[0]) as LlmResult
    } catch {
      return null
    }
  }
}

function sanitizeFields(input: Partial<IntakeFormData>): Partial<IntakeFormData> {
  const out: Partial<IntakeFormData> = {}

  if (typeof input.name === 'string') out.name = input.name.trim()
  if (typeof input.email === 'string') out.email = input.email.trim().toLowerCase()
  if (typeof input.tools === 'string') out.tools = input.tools.trim()
  if (typeof input.deadline === 'string') out.deadline = input.deadline.trim()
  if (typeof input.friction === 'string') out.friction = input.friction.trim()

  if (['save-time', 'increase-conversion', 'reduce-errors', 'other'].includes(input.goal || '')) {
    out.goal = input.goal as IntakeFormData['goal']
  }

  if (['lt1', '1to2', '2to4', 'gt4'].includes(input.timeSpent || '')) {
    out.timeSpent = input.timeSpent as IntakeFormData['timeSpent']
  }

  if (['free', 'lt200', '200-500', '500-1000', 'gt1000'].includes(input.budget || '')) {
    out.budget = input.budget as IntakeFormData['budget']
  }

  if (input.freeSlot === 'yes' || input.freeSlot === 'no') {
    out.freeSlot = input.freeSlot
  }

  return out
}

function fallbackReply(formData: IntakeFormData): LlmResult {
  const missingFields = REQUIRED_FIELDS.filter((field) => !String(formData[field] || '').trim())
  return {
    reply:
      'Mình đang giúp bạn thu thập thông tin để gửi form. Bạn cho mình biết thêm: tên, email, mục tiêu chính, thời gian đang mất mỗi ngày, deadline và ngân sách nhé.',
    fields: {},
    readyToSubmit: false,
    missingFields,
  }
}

async function safeDb<T>(fn: () => Promise<T>, fallback: T): Promise<T> {
  try {
    return await fn()
  } catch (error) {
    console.warn('[chatbot-intake-db-warning]', error)
    return fallback
  }
}

async function getOrCreateConversation(conversationId: string | undefined, language?: string) {
  if (!conversationId) {
    return safeDb(
      () =>
        db.intakeConversation.create({
          data: {
            language,
            status: 'collecting',
          },
        }),
      { id: `ephemeral-${Date.now()}`, language, status: 'collecting' }
    )
  }

  const existing = await safeDb(
    () => db.intakeConversation.findUnique({ where: { id: conversationId } }),
    null
  )
  if (existing) return existing

  return safeDb(
    () =>
      db.intakeConversation.create({
        data: {
          id: conversationId,
          language,
          status: 'collecting',
        },
      }),
    { id: conversationId, language, status: 'collecting' }
  )
}

async function appendConversationMessages(conversationId: string, messages: ChatMessage[]) {
  if (messages.length === 0 || conversationId.startsWith('ephemeral-')) return
  await safeDb(
    () =>
      db.intakeConversationMessage.createMany({
        data: messages.map((m) => ({
          conversationId,
          role: m.role,
          content: m.content,
        })),
      }),
    null
  )
}

export async function POST(req: NextRequest) {
  try {
    if (!OPENAI_COMPAT_API_KEY) {
      return NextResponse.json(
        { ok: false, error: 'Missing OPENAI_COMPAT_API_KEY on server.' },
        { status: 500 }
      )
    }

    const body = (await req.json()) as IntakeRequestBody

    const messages = Array.isArray(body.messages) ? body.messages : []
    const conversation = await getOrCreateConversation(body.conversationId, body.language)

    const formData: IntakeFormData = {
      name: body.formData?.name || '',
      email: body.formData?.email || '',
      goal: body.formData?.goal || '',
      timeSpent: body.formData?.timeSpent || '',
      tools: body.formData?.tools || '',
      deadline: body.formData?.deadline || '',
      budget: body.formData?.budget || '',
      freeSlot: body.formData?.freeSlot === 'no' ? 'no' : 'yes',
      friction: body.formData?.friction || '',
    }

    if (messages.length > 0) {
      const latestUserMessage = messages[messages.length - 1]
      if (latestUserMessage?.role === 'user') {
        await appendConversationMessages(conversation.id, [latestUserMessage])
      }
    }

    const client = new OpenAI({
      apiKey: OPENAI_COMPAT_API_KEY,
      baseURL: OPENAI_COMPAT_BASE_URL,
    })

    const missingBefore = getMissingFields(formData)
    const stage = getConversationStage(missingBefore)

    const completion = await client.chat.completions.create({
      model: OPENAI_COMPAT_MODEL,
      temperature: 0.3,
      messages: [
        {
          role: 'system',
          content:
            `You are the intake assistant for a problem-first AI automation landing page.\n` +
            `Brand purpose: help people reclaim time by removing repetitive computer tasks.\n` +
            `Conversation objective: diagnose bottleneck, propose practical path, collect intake data, and move to submission.\n` +
            `Always keep flow: Problem -> Approach -> Outcome -> Timeline.\n` +
            `Tone: natural, concise, practical, human. No jargon unless user asks.\n` +
            `Ask only 1-2 focused questions each turn.\n` +
            `Required fields: name,email,goal,timeSpent,deadline,budget,freeSlot,friction.\n` +
            `Respond ONLY valid JSON with schema:\n` +
            `{\n` +
            `  "reply": string,\n` +
            `  "fields": {\n` +
            `    "name"?: string,\n` +
            `    "email"?: string,\n` +
            `    "goal"?: "save-time"|"increase-conversion"|"reduce-errors"|"other",\n` +
            `    "timeSpent"?: "lt1"|"1to2"|"2to4"|"gt4",\n` +
            `    "tools"?: string,\n` +
            `    "deadline"?: string,\n` +
            `    "budget"?: "free"|"lt200"|"200-500"|"500-1000"|"gt1000",\n` +
            `    "freeSlot"?: "yes"|"no",\n` +
            `    "friction"?: string\n` +
            `  },\n` +
            `  "readyToSubmit": boolean,\n` +
            `  "missingFields": string[]\n` +
            `}\n` +
            `No markdown, no prose outside JSON.`,
        },
        {
          role: 'system',
          content: `Current intake stage: ${stage}. Missing fields: ${missingBefore.join(', ') || 'none'}. Current form snapshot: ${JSON.stringify(formData)}`,
        },
        ...messages.map((m) => ({ role: m.role, content: m.content })),
      ],
    })

    const content = completion.choices[0]?.message?.content || ''
    const parsed = parseJsonFromText(content)

    if (!parsed) {
      const fallback = fallbackReply(formData)
      await appendConversationMessages(conversation.id, [{ role: 'assistant', content: fallback.reply }])
      return NextResponse.json(
        {
          ok: true,
          conversationId: conversation.id,
          ...fallback,
        },
        { status: 200 }
      )
    }

    const fields = sanitizeFields(parsed.fields || {})
    const mergedData: IntakeFormData = {
      ...formData,
      ...fields,
    }
    const missingAfter = getMissingFields(mergedData)
    const readyToSubmit = Boolean(parsed.readyToSubmit) || missingAfter.length === 0

    let reply = parsed.reply || 'Mình đã ghi nhận thông tin. Cho mình thêm 1-2 chi tiết để chốt form nhé.'
    let submitted = false
    let leadId: string | undefined

    if (readyToSubmit) {
      const lead = await tryCreateLeadFromIntake({
        ...mergedData,
        conversationId: conversation.id.startsWith('ephemeral-') ? undefined : conversation.id,
      })

      if (lead?.id) {
        submitted = true
        leadId = lead.id
        reply =
          body.language === 'vi'
            ? 'Mình đã nhận đủ thông tin và gửi thành công. Mình sẽ phản hồi với hướng triển khai sớm nhất nhé.'
            : 'I have everything needed and your request is now submitted. I will follow up with a practical plan soon.'
      }
    }

    await appendConversationMessages(conversation.id, [{ role: 'assistant', content: reply }])

    if (!conversation.id.startsWith('ephemeral-')) {
      await safeDb(
        () =>
          db.intakeConversation.update({
            where: { id: conversation.id },
            data: {
              status: submitted ? 'submitted' : readyToSubmit ? 'ready' : 'collecting',
            },
          }),
        null
      )
    }

    return NextResponse.json(
      {
        ok: true,
        conversationId: conversation.id,
        reply,
        fields,
        readyToSubmit,
        missingFields: missingAfter,
        submitted,
        leadId,
      },
      { status: 200 }
    )
  } catch (error) {
    console.error('[chatbot-intake-error]', error)
    return NextResponse.json(
      {
        ok: false,
        error: 'Chatbot intake request failed.',
      },
      { status: 500 }
    )
  }
}
