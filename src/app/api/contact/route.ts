import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

interface ContactPayload {
  name: string
  email: string
  goal: string
  timeSpent: string
  tools?: string
  deadline: string
  budget: string
  freeSlot: 'yes' | 'no'
  friction: string
  conversationId?: string
  source?: string
}

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

async function appendToGoogleSheet(payload: ContactPayload & { leadId: string }) {
  const webhookUrl = process.env.GOOGLE_SHEETS_WEBHOOK_URL
  if (!webhookUrl) return { enabled: false as const }

  const res = await fetch(webhookUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      leadId: payload.leadId,
      createdAt: new Date().toISOString(),
      name: payload.name,
      email: payload.email,
      goal: payload.goal,
      timeSpent: payload.timeSpent,
      tools: payload.tools || '',
      deadline: payload.deadline,
      budget: payload.budget,
      freeSlot: payload.freeSlot,
      friction: payload.friction,
      conversationId: payload.conversationId || '',
      source: payload.source || 'form',
    }),
  })

  if (!res.ok) {
    throw new Error(`Google Sheets webhook failed with status ${res.status}`)
  }

  return { enabled: true as const }
}

async function appendToNotion(payload: ContactPayload & { leadId: string }) {
  const notionToken = process.env.NOTION_API_KEY
  const databaseId = process.env.NOTION_DATABASE_ID

  if (!notionToken || !databaseId) return { enabled: false as const }

  const res = await fetch('https://api.notion.com/v1/pages', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${notionToken}`,
      'Content-Type': 'application/json',
      'Notion-Version': '2022-06-28',
    },
    body: JSON.stringify({
      parent: { database_id: databaseId },
      properties: {
        Name: {
          title: [{ text: { content: payload.name } }],
        },
        Email: {
          email: payload.email,
        },
        Goal: {
          rich_text: [{ text: { content: payload.goal } }],
        },
        TimeSpent: {
          rich_text: [{ text: { content: payload.timeSpent } }],
        },
        Tools: {
          rich_text: [{ text: { content: payload.tools || '' } }],
        },
        Deadline: {
          rich_text: [{ text: { content: payload.deadline } }],
        },
        Budget: {
          rich_text: [{ text: { content: payload.budget } }],
        },
        FreeSlot: {
          select: { name: payload.freeSlot },
        },
        Source: {
          rich_text: [{ text: { content: payload.source || 'form' } }],
        },
        LeadId: {
          rich_text: [{ text: { content: payload.leadId } }],
        },
        ConversationId: {
          rich_text: [{ text: { content: payload.conversationId || '' } }],
        },
      },
      children: [
        {
          object: 'block',
          type: 'paragraph',
          paragraph: {
            rich_text: [{ type: 'text', text: { content: payload.friction } }],
          },
        },
      ],
    }),
  })

  if (!res.ok) {
    const text = await res.text()
    throw new Error(`Notion API failed with status ${res.status}: ${text}`)
  }

  return { enabled: true as const }
}

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as Partial<ContactPayload>

    const requiredFields: Array<keyof ContactPayload> = [
      'name',
      'email',
      'goal',
      'timeSpent',
      'deadline',
      'budget',
      'freeSlot',
      'friction',
    ]

    const missing = requiredFields.filter((field) => !body[field] || String(body[field]).trim() === '')

    if (missing.length > 0) {
      return NextResponse.json(
        {
          ok: false,
          error: 'Missing required fields',
          missing,
        },
        { status: 400 }
      )
    }

    if (!isValidEmail(body.email!)) {
      return NextResponse.json(
        {
          ok: false,
          error: 'Invalid email format',
        },
        { status: 400 }
      )
    }

    if (body.freeSlot !== 'yes' && body.freeSlot !== 'no') {
      return NextResponse.json(
        {
          ok: false,
          error: 'Invalid freeSlot value',
        },
        { status: 400 }
      )
    }

    const payload: ContactPayload = {
      name: body.name!.trim(),
      email: body.email!.trim(),
      goal: body.goal!.trim(),
      timeSpent: body.timeSpent!.trim(),
      tools: body.tools?.trim() || '',
      deadline: body.deadline!.trim(),
      budget: body.budget!.trim(),
      freeSlot: body.freeSlot,
      friction: body.friction!.trim(),
      conversationId: body.conversationId?.trim() || undefined,
      source: body.source?.trim() || 'form',
    }

    const lead = await db.lead.create({
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
        source: payload.source,
        conversationId: payload.conversationId,
      },
    })

    if (payload.conversationId) {
      await db.intakeConversation.update({
        where: { id: payload.conversationId },
        data: {
          status: 'submitted',
        },
      }).catch(() => null)
    }

    let sheetResult: { enabled: boolean; error?: string } = { enabled: false }
    let notionResult: { enabled: boolean; error?: string } = { enabled: false }

    try {
      const result = await appendToGoogleSheet({ ...payload, leadId: lead.id })
      sheetResult = { enabled: result.enabled }
    } catch (error) {
      sheetResult = {
        enabled: true,
        error: error instanceof Error ? error.message : 'Unknown Google Sheets error',
      }
    }

    try {
      const result = await appendToNotion({ ...payload, leadId: lead.id })
      notionResult = { enabled: result.enabled }
    } catch (error) {
      notionResult = {
        enabled: true,
        error: error instanceof Error ? error.message : 'Unknown Notion error',
      }
    }

    return NextResponse.json(
      {
        ok: true,
        message: 'Contact request received',
        leadId: lead.id,
        integrations: {
          googleSheets: sheetResult,
          notion: notionResult,
        },
      },
      { status: 200 }
    )
  } catch (error) {
    console.error('[contact-intake-error]', error)
    return NextResponse.json(
      {
        ok: false,
        error: 'Failed to process request',
      },
      { status: 500 }
    )
  }
}
