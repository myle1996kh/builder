'use client'

import { useEffect, useRef, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useLanguage } from '@/contexts/language-context'
import { Loader2, Send, CheckCircle2, AlertCircle } from 'lucide-react'

interface ContactFormProps {
  onSuccess?: () => void
}

export function ContactForm({ onSuccess }: ContactFormProps) {
  const { t } = useLanguage()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    goal: '',
    timeSpent: '',
    tools: '',
    deadline: '',
    budget: '',
    freeSlot: 'yes' as 'yes' | 'no',
    friction: '',
    conversationId: ''
  })
  const formDataRef = useRef(formData)

  useEffect(() => {
    formDataRef.current = formData
  }, [formData])

  const submitPayload = async (payload: typeof formData) => {
    setIsSubmitting(true)
    setStatus('idle')

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      })

      if (response.ok) {
        setStatus('success')
        setFormData({
          name: '',
          email: '',
          goal: '',
          timeSpent: '',
          tools: '',
          deadline: '',
          budget: '',
          freeSlot: 'yes',
          friction: '',
          conversationId: ''
        })
        onSuccess?.()
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    await submitPayload(formData)
  }

  useEffect(() => {
    const handleIntakeUpdate = async (event: Event) => {
      const customEvent = event as CustomEvent<{
        fields?: Partial<typeof formData>
        autoSubmit?: boolean
        conversationId?: string
      }>

      const fields = customEvent.detail?.fields || {}
      const autoSubmit = Boolean(customEvent.detail?.autoSubmit)
      const conversationId = customEvent.detail?.conversationId

      if (!fields || Object.keys(fields).length === 0) return

      setFormData((prev) => ({ ...prev, ...fields, conversationId: conversationId || prev.conversationId }))

      if (autoSubmit) {
        const merged = {
          ...formDataRef.current,
          ...fields,
          conversationId: conversationId || formDataRef.current.conversationId,
        }
        const requiredFilled =
          merged.name &&
          merged.email &&
          merged.goal &&
          merged.timeSpent &&
          merged.deadline &&
          merged.budget &&
          merged.freeSlot &&
          merged.friction

        if (requiredFilled) {
          await submitPayload(merged)
        }
      }
    }

    window.addEventListener('builder:intake-update', handleIntakeUpdate as EventListener)

    return () => {
      window.removeEventListener('builder:intake-update', handleIntakeUpdate as EventListener)
    }
  }, [])

  return (
    <Card className="rounded-none border-4 border-black bg-white">
      <CardHeader className="pb-4 border-b-2 border-black bg-muted">
        <CardTitle className="text-xl font-black uppercase tracking-tighter text-center">
          {t('form.title')}
        </CardTitle>
      </CardHeader>
      <CardContent className="p-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label htmlFor="name" className="text-xs font-bold uppercase tracking-widest">
              {t('form.name')}
            </label>
            <Input
              id="name"
              type="text"
              placeholder={t('form.namePlaceholder')}
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
              className="rounded-none border-2 border-black bg-white focus:border-[#FF3000] focus-visible:ring-0 focus-visible:ring-offset-0 h-12 px-4 font-medium placeholder:text-gray-400"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="email" className="text-xs font-bold uppercase tracking-widest">
              {t('form.email')}
            </label>
            <Input
              id="email"
              type="email"
              placeholder={t('form.emailPlaceholder')}
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
              className="rounded-none border-2 border-black bg-white focus:border-[#FF3000] focus-visible:ring-0 focus-visible:ring-offset-0 h-12 px-4 font-medium placeholder:text-gray-400"
            />
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label htmlFor="goal" className="text-xs font-bold uppercase tracking-widest">
                {t('form.goal')}
              </label>
              <select
                id="goal"
                value={formData.goal}
                onChange={(e) => setFormData({ ...formData, goal: e.target.value })}
                required
                className="w-full rounded-none border-2 border-black bg-white h-12 px-4 font-medium focus:border-[#FF3000] focus:outline-none"
              >
                <option value="">{t('form.goalPlaceholder')}</option>
                <option value="save-time">{t('form.goal.time')}</option>
                <option value="increase-conversion">{t('form.goal.conversion')}</option>
                <option value="reduce-errors">{t('form.goal.errors')}</option>
                <option value="other">{t('form.goal.other')}</option>
              </select>
            </div>

            <div className="space-y-2">
              <label htmlFor="timeSpent" className="text-xs font-bold uppercase tracking-widest">
                {t('form.timeSpent')}
              </label>
              <select
                id="timeSpent"
                value={formData.timeSpent}
                onChange={(e) => setFormData({ ...formData, timeSpent: e.target.value })}
                required
                className="w-full rounded-none border-2 border-black bg-white h-12 px-4 font-medium focus:border-[#FF3000] focus:outline-none"
              >
                <option value="">{t('form.timeSpentPlaceholder')}</option>
                <option value="lt1">{t('form.timeSpent.lt1')}</option>
                <option value="1to2">{t('form.timeSpent.1to2')}</option>
                <option value="2to4">{t('form.timeSpent.2to4')}</option>
                <option value="gt4">{t('form.timeSpent.gt4')}</option>
              </select>
            </div>
          </div>

          <div className="space-y-2">
            <label htmlFor="tools" className="text-xs font-bold uppercase tracking-widest">
              {t('form.tools')}
            </label>
            <Input
              id="tools"
              type="text"
              placeholder={t('form.toolsPlaceholder')}
              value={formData.tools}
              onChange={(e) => setFormData({ ...formData, tools: e.target.value })}
              className="rounded-none border-2 border-black bg-white focus:border-[#FF3000] focus-visible:ring-0 focus-visible:ring-offset-0 h-12 px-4 font-medium placeholder:text-gray-400"
            />
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label htmlFor="deadline" className="text-xs font-bold uppercase tracking-widest">
                {t('form.deadline')}
              </label>
              <Input
                id="deadline"
                type="text"
                placeholder={t('form.deadlinePlaceholder')}
                value={formData.deadline}
                onChange={(e) => setFormData({ ...formData, deadline: e.target.value })}
                required
                className="rounded-none border-2 border-black bg-white focus:border-[#FF3000] focus-visible:ring-0 focus-visible:ring-offset-0 h-12 px-4 font-medium placeholder:text-gray-400"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="budget" className="text-xs font-bold uppercase tracking-widest">
                {t('form.budget')}
              </label>
              <select
                id="budget"
                value={formData.budget}
                onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                required
                className="w-full rounded-none border-2 border-black bg-white h-12 px-4 font-medium focus:border-[#FF3000] focus:outline-none"
              >
                <option value="">{t('form.budgetPlaceholder')}</option>
                <option value="free">{t('form.budget.0')}</option>
                <option value="lt200">{t('form.budget.1')}</option>
                <option value="200-500">{t('form.budget.2')}</option>
                <option value="500-1000">{t('form.budget.3')}</option>
                <option value="gt1000">{t('form.budget.4')}</option>
              </select>
            </div>
          </div>

          <div className="space-y-2">
            <label htmlFor="freeSlot" className="text-xs font-bold uppercase tracking-widest">
              {t('form.freeSlot')}
            </label>
            <select
              id="freeSlot"
              value={formData.freeSlot}
              onChange={(e) => setFormData({ ...formData, freeSlot: e.target.value })}
              className="w-full rounded-none border-2 border-black bg-white h-12 px-4 font-medium focus:border-[#FF3000] focus:outline-none"
            >
              <option value="yes">{t('form.freeSlot.yes')}</option>
              <option value="no">{t('form.freeSlot.no')}</option>
            </select>
          </div>

          <div className="space-y-2">
            <label htmlFor="friction" className="text-xs font-bold uppercase tracking-widest">
              {t('form.friction')}
            </label>
            <Textarea
              id="friction"
              placeholder={t('form.frictionPlaceholder')}
              value={formData.friction}
              onChange={(e) => setFormData({ ...formData, friction: e.target.value })}
              required
              rows={5}
              className="rounded-none border-2 border-black bg-white focus:border-[#FF3000] focus-visible:ring-0 focus-visible:ring-offset-0 p-4 font-medium placeholder:text-gray-400 resize-none"
            />
          </div>

          {status === 'success' && (
            <div className="flex items-center gap-3 p-4 border-2 border-black bg-muted">
              <CheckCircle2 className="w-5 h-5 text-[#FF3000] flex-shrink-0" />
              <span className="text-sm font-medium">{t('form.success')}</span>
            </div>
          )}

          {status === 'error' && (
            <div className="flex items-center gap-3 p-4 border-2 border-black bg-black text-white">
              <AlertCircle className="w-5 h-5 text-[#FF3000] flex-shrink-0" />
              <span className="text-sm font-medium">{t('form.error')}</span>
            </div>
          )}

          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-black text-white hover:bg-[#FF3000] rounded-none font-bold uppercase tracking-wider text-sm py-6 border-2 border-black h-auto disabled:opacity-50"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                {t('form.submitting')}
              </>
            ) : (
              <>
                <Send className="w-4 h-4 mr-2" />
                {t('form.submit')}
              </>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
