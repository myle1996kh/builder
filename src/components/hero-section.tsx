import { Button } from '@/components/ui/button'
import { ArrowRight, Check, MessageSquareText, Sparkles } from 'lucide-react'

interface HeroSectionProps {
  badge: string
  title1: string
  title2: string
  subtitle: string
  cta1: string
  cta2: string
}

export function HeroSection({ badge, title1, title2, subtitle, cta1, cta2 }: HeroSectionProps) {
  return (
    <section className="relative overflow-hidden swiss-hero-pattern border-b-2 border-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-14 sm:py-20 lg:py-24">
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-10 items-center">
          <div className="lg:col-span-7">
            <div className="inline-flex items-center gap-2 mb-5 border-2 border-black px-4 py-2 bg-muted">
              <span className="w-2 h-2 bg-[#FF3000]" />
              <span className="text-[11px] sm:text-xs font-bold uppercase tracking-[0.12em]">{badge}</span>
            </div>

            <h1 className="max-w-[20ch] text-[clamp(1.9rem,5.2vw,4rem)] font-black uppercase tracking-[-0.01em] leading-[1.08] mb-6">
              <span className="block text-balance">{title1}</span>
              <span className="block mt-3 text-[#FF3000] text-balance">{title2}</span>
            </h1>

            <p className="text-base sm:text-lg text-muted-foreground mb-8 max-w-2xl leading-relaxed text-balance">
              {subtitle}
            </p>

            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              <Button
                size="lg"
                className="bg-black text-white hover:bg-[#FF3000] rounded-none font-bold uppercase tracking-wider text-sm px-7 py-5 border-2 border-black h-auto"
                asChild
              >
                <a href="#contact">
                  {cta1}
                  <ArrowRight className="w-4 h-4 ml-2" />
                </a>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="rounded-none font-bold uppercase tracking-wider text-sm px-7 py-5 border-2 border-black hover:bg-black hover:text-white h-auto"
                asChild
              >
                <a href="#protocol">{cta2}</a>
              </Button>
            </div>
          </div>

          <div className="lg:col-span-5 hidden lg:block">
            <div className="relative border-2 border-black bg-white p-6 xl:p-7">
              <div className="space-y-4">
                <div className="flex items-start gap-3 border-2 border-black bg-muted p-4">
                  <div className="w-10 h-10 border-2 border-black flex items-center justify-center bg-white shrink-0">
                    <MessageSquareText className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-[11px] font-black uppercase tracking-[0.14em] text-[#FF3000] mb-1">01 • Input</p>
                    <p className="text-sm font-semibold leading-snug">You describe the real bottleneck.</p>
                  </div>
                </div>

                <div className="flex justify-center">
                  <div className="w-1 h-6 bg-black" />
                </div>

                <div className="flex items-start gap-3 border-2 border-black bg-white p-4">
                  <div className="w-10 h-10 border-2 border-black flex items-center justify-center bg-[#FF3000] text-white shrink-0">
                    <Sparkles className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-[11px] font-black uppercase tracking-[0.14em] text-[#FF3000] mb-1">02 • AI + Build</p>
                    <p className="text-sm font-semibold leading-snug">Clarify requirements, map steps, and build fast.</p>
                  </div>
                </div>

                <div className="flex justify-center">
                  <div className="w-1 h-6 bg-black" />
                </div>

                <div className="flex items-start gap-3 border-2 border-black bg-black text-white p-4">
                  <div className="w-10 h-10 border-2 border-white flex items-center justify-center bg-white text-black shrink-0">
                    <Check className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-[11px] font-black uppercase tracking-[0.14em] text-[#FF3000] mb-1">03 • Output</p>
                    <p className="text-sm font-semibold leading-snug">Working solution you can use immediately.</p>
                  </div>
                </div>
              </div>

              <div className="absolute -top-3 -right-3 w-12 h-12 border-2 border-black bg-[#FF3000]" />
              <div className="absolute -bottom-3 -left-3 w-16 h-3 bg-black" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
