import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

interface Params {
  params: Promise<{ id: string }>
}

export async function GET(_req: NextRequest, { params }: Params) {
  try {
    const { id } = await params

    const conversation = await db.intakeConversation.findUnique({
      where: { id },
      include: {
        messages: {
          orderBy: { createdAt: 'asc' },
          select: {
            id: true,
            role: true,
            content: true,
            createdAt: true,
          },
        },
        leads: {
          orderBy: { createdAt: 'desc' },
          select: {
            id: true,
            name: true,
            email: true,
            goal: true,
            timeSpent: true,
            budget: true,
            createdAt: true,
          },
        },
      },
    })

    if (!conversation) {
      return NextResponse.json({ ok: false, error: 'Conversation not found' }, { status: 404 })
    }

    return NextResponse.json({ ok: true, conversation }, { status: 200 })
  } catch (error) {
    console.error('[chatbot-conversation-get-error]', error)
    return NextResponse.json({ ok: false, error: 'Failed to fetch conversation' }, { status: 500 })
  }
}
