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

async function getOrCreateConversation(conversationId: string | undefined, language?: string) {
  if (!conversationId) {
    return db.intakeConversation.create({
      data: {
        language,
        status: 'collecting',
      },
    })
  }

  const existing = await db.intakeConversation.findUnique({ where: { id: conversationId } })
  if (existing) return existing

  return db.intakeConversation.create({
    data: {
      id: conversationId,
      language,
      status: 'collecting',
    },
  })
}

async function appendConversationMessages(conversationId: string, messages: ChatMessage[]) {
  if (messages.length === 0) return
  await db.intakeConversationMessage.createMany({
    data: messages.map((m) => ({
      conversationId,
      role: m.role,
      content: m.content,
    })),
  })
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

    const completion = await client.chat.completions.create({
      model: OPENAI_COMPAT_MODEL,
      temperature: 0.3,
      messages: [
        {
          role: 'system',
          content:
            `You are an intake chatbot for a Builder service website.\n` +
            `Goal: clarify the user's problem, collect required form fields, and guide to quick submission.\n` +
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
            `Rules:\n` +
            `- Keep reply concise and action-oriented.\n` +
            `- If user gives partial info, extract what you can into fields.\n` +
            `- Ask only 1-2 most important missing questions each turn.\n` +
            `- readyToSubmit=true only when required fields are known: name,email,goal,timeSpent,deadline,budget,freeSlot,friction.\n` +
            `- Never include markdown, only raw JSON.`,
        },
        {
          role: 'system',
          content: `Current form data snapshot: ${JSON.stringify(formData)}`,
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
    const reply = parsed.reply || 'Mình đã ghi nhận thông tin. Cho mình thêm 1-2 chi tiết để chốt form nhé.'

    await appendConversationMessages(conversation.id, [{ role: 'assistant', content: reply }])

    await db.intakeConversation.update({
      where: { id: conversation.id },
      data: {
        status: parsed.readyToSubmit ? 'ready' : 'collecting',
      },
    })

    return NextResponse.json(
      {
        ok: true,
        conversationId: conversation.id,
        reply,
        fields,
        readyToSubmit: Boolean(parsed.readyToSubmit),
        missingFields: Array.isArray(parsed.missingFields) ? parsed.missingFields : [],
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
