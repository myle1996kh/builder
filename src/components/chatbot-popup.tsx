'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { IntakeChatbot } from '@/components/intake-chatbot'
import { useLanguage } from '@/contexts/language-context'
import { Bot, X } from 'lucide-react'

export function ChatbotPopup() {
  const { language } = useLanguage()
  const [open, setOpen] = useState(false)

  return (
    <div className="fixed right-4 bottom-4 z-[60]">
      {open ? (
        <div className="w-[min(92vw,420px)]">
          <div className="flex justify-end mb-2">
            <Button
              type="button"
              onClick={() => setOpen(false)}
              className="rounded-none border-2 border-black bg-black text-white hover:bg-[#FF3000] h-10 px-3"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
          <IntakeChatbot className="mb-0 shadow-[6px_6px_0px_0px_#000]" />
        </div>
      ) : (
        <Button
          type="button"
          onClick={() => setOpen(true)}
          className="rounded-none border-2 border-black bg-black text-white hover:bg-[#FF3000] h-12 px-4 font-bold uppercase tracking-wider text-xs"
        >
          <Bot className="w-4 h-4 mr-2" />
          {language === 'vi' ? 'AI chat' : 'AI chat'}
        </Button>
      )}
    </div>
  )
}
