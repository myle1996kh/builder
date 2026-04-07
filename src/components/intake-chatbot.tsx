'use client'

import { FormEvent, useMemo, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useLanguage } from '@/contexts/language-context'
import { cn } from '@/lib/utils'
import { Bot, Loader2, Send } from 'lucide-react'

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

interface IntakeResponse {
  ok: boolean
  conversationId?: string
  reply?: string
  fields?: Partial<IntakeFormData>
  readyToSubmit?: boolean
  missingFields?: string[]
  submitted?: boolean
  leadId?: string
  error?: string
}

const INITIAL_FORM_DATA: IntakeFormData = {
  name: '',
  email: '',
  goal: '',
  timeSpent: '',
  tools: '',
  deadline: '',
  budget: '',
  freeSlot: 'yes',
  friction: '',
}

interface IntakeChatbotProps {
  className?: string
}

export function IntakeChatbot({ className }: IntakeChatbotProps) {
  const { language } = useLanguage()

  const greeting = useMemo(
    () =>
      language === 'vi'
        ? 'Mình là trợ lý AI intake. Bạn mô tả bài toán đang làm chậm bạn, mình sẽ hỏi nhanh để tự điền form và gửi giúp bạn.'
        : 'I am your AI intake assistant. Describe the bottleneck and I will ask focused questions, auto-fill the form, and submit it for you.',
    [language]
  )

  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'assistant', content: greeting },
  ])
  const [conversationId, setConversationId] = useState<string | null>(null)
  const [input, setInput] = useState('')
  const [isThinking, setIsThinking] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [formData, setFormData] = useState<IntakeFormData>(INITIAL_FORM_DATA)

  const emitFormUpdate = (
    fields: Partial<IntakeFormData>,
    autoSubmit = false,
    nextConversationId?: string
  ) => {
    if (typeof window === 'undefined') return
    const event = new CustomEvent('builder:intake-update', {
      detail: {
        fields,
        autoSubmit,
        conversationId: nextConversationId,
      },
    })
    window.dispatchEvent(event)
  }

  const handleSend = async (e?: FormEvent) => {
    e?.preventDefault()
    const content = input.trim()
    if (!content || isThinking) return

    setError(null)
    setIsThinking(true)

    const nextMessages: ChatMessage[] = [...messages, { role: 'user', content }]
    setMessages(nextMessages)
    setInput('')

    try {
      const response = await fetch('/api/chatbot/intake', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          conversationId,
          messages: nextMessages,
          formData,
          language,
        }),
      })

      const data = (await response.json()) as IntakeResponse

      if (!response.ok || !data.ok) {
        throw new Error(data.error || 'Chatbot intake failed')
      }

      if (data.conversationId) {
        setConversationId(data.conversationId)
      }

      const assistantReply = data.reply || (language === 'vi' ? 'Mình đã ghi nhận.' : 'Noted.')
      setMessages((prev) => [...prev, { role: 'assistant', content: assistantReply }])

      const extractedFields = data.fields || {}
      const merged = { ...formData, ...extractedFields }
      setFormData(merged)

      emitFormUpdate(extractedFields, Boolean(data.readyToSubmit) && !Boolean(data.submitted), data.conversationId)
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Unexpected error'
      setError(message)
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content:
            language === 'vi'
              ? 'Mình bị gián đoạn kết nối một chút. Bạn thử gửi lại giúp mình nhé.'
              : 'I hit a temporary connection issue. Please try sending again.',
        },
      ])
    } finally {
      setIsThinking(false)
    }
  }

  return (
    <Card className={cn('rounded-none border-4 border-black bg-white', className)}>
      <CardHeader className="pb-4 border-b-2 border-black bg-muted">
        <CardTitle className="text-lg font-black uppercase tracking-tighter flex items-center gap-2">
          <Bot className="w-5 h-5" />
          {language === 'vi' ? 'AI Intake Assistant' : 'AI Intake Assistant'}
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6 space-y-4">
        <div className="max-h-72 overflow-y-auto border-2 border-black p-4 bg-white space-y-3">
          {messages.map((m, index) => (
            <div
              key={index}
              className={m.role === 'assistant' ? 'text-sm leading-relaxed' : 'text-sm leading-relaxed font-semibold'}
            >
              <span className="inline-block mr-2 font-black uppercase text-xs tracking-widest text-[#FF3000]">
                {m.role === 'assistant' ? 'AI' : language === 'vi' ? 'Bạn' : 'You'}
              </span>
              <span>{m.content}</span>
            </div>
          ))}
          {isThinking && (
            <div className="text-sm flex items-center gap-2 text-muted-foreground">
              <Loader2 className="w-4 h-4 animate-spin" />
              {language === 'vi' ? 'Đang xử lý...' : 'Thinking...'}
            </div>
          )}
        </div>

        {error && (
          <p className="text-sm border-2 border-black bg-black text-white p-3">
            {language === 'vi' ? 'Lỗi:' : 'Error:'} {error}
          </p>
        )}

        <form onSubmit={handleSend} className="flex gap-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={
              language === 'vi'
                ? 'Mô tả vấn đề bạn muốn AI giúp giải quyết...'
                : 'Describe the problem you want AI to help solve...'
            }
            className="rounded-none border-2 border-black bg-white focus:border-[#FF3000] focus-visible:ring-0 focus-visible:ring-offset-0 h-12 px-4"
          />
          <Button
            type="submit"
            disabled={isThinking || !input.trim()}
            className="bg-black text-white hover:bg-[#FF3000] rounded-none border-2 border-black h-12 px-4"
          >
            {isThinking ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
