'use client'

import { useMemo } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { LanguageProvider, useLanguage } from '@/contexts/language-context'
import { ArrowLeft, ArrowRight, Blocks, Check, Layers, Search, Sparkles, Target } from 'lucide-react'

function ApproachContent() {
  const { language } = useLanguage()

  const copy = useMemo(
    () =>
      language === 'vi'
        ? {
            pageTitle: 'Cách tiếp cận: từ vấn đề đến giải pháp chạy được',
            intro:
              'Mục tiêu không phải là làm thật nhiều use case. Mục tiêu là có một phương pháp lặp lại được: hiểu vấn đề đúng, chia nhỏ đúng, triển khai đúng.',
            principleTitle: 'Nguyên tắc cốt lõi',
            principleItems: [
              'Không bắt đầu từ công nghệ, bắt đầu từ điểm nghẽn.',
              'Không giải quyết mọi thứ cùng lúc, chia thành từng phần có thể giao.',
              'Không đo bằng “đẹp”, đo bằng thời gian tiết kiệm và kết quả thực tế.',
            ],
            progressTitle: 'Progress framework (7 ngày)',
            stages: [
              {
                step: '01',
                title: 'Làm rõ bài toán',
                desc: 'Thu thập bối cảnh, quy trình hiện tại, đầu vào/đầu ra, điểm nghẽn chính.',
              },
              {
                step: '02',
                title: 'Chia nhỏ vấn đề',
                desc: 'Tách thành các khối: dữ liệu, logic, giao diện, automation và ưu tiên theo impact.',
              },
              {
                step: '03',
                title: 'Triển khai lõi',
                desc: 'Xây bản chạy được cho phần tạo impact lớn nhất trước.',
              },
              {
                step: '04',
                title: 'Kiểm thử & chốt',
                desc: 'Test với dữ liệu thực tế, tối ưu edge cases, bàn giao cách vận hành.',
              },
            ],
            progressBoardTitle: 'Current progress board',
            progressBoardSubtitle: 'Ảnh chụp tiến độ theo thời gian thực — đang phân tích gì, đang build gì, và đã bàn giao gì.',
            progressBoardColumns: {
              now: 'Đang phân tích',
              building: 'Đang xây',
              delivered: 'Đã bàn giao',
            },
            progressBoardItems: {
              now: [
                'Làm rõ bottleneck và kết quả mong muốn',
                'Chốt input/output dữ liệu cần thiết',
              ],
              building: [
                'AI intake chatbot tự trích xuất field',
                'Lead pipeline lưu DB + conversation log',
              ],
              delivered: [
                'Kiến trúc message problem-first cho landing',
                'Trang approach chi tiết với framework 7 ngày',
              ],
            },
            usecaseTitle: 'Use case là minh hoạ, không phải đích đến',
            usecaseSubtitle:
              'Các ví dụ dưới đây chỉ để bạn hình dung cách tiếp cận có thể áp dụng ở nhiều bài toán khác nhau.',
            usecases: [
              {
                title: 'Lead intake thủ công → AI intake + auto form submit',
                impact: 'Giảm vòng hỏi đáp ban đầu, tăng tốc chốt yêu cầu.',
              },
              {
                title: 'Báo cáo copy-paste hằng ngày → workflow tự tổng hợp',
                impact: 'Giảm 2–4 giờ thao tác lặp/ngày.',
              },
              {
                title: 'Landing page mơ hồ → message rõ + CTA rõ',
                impact: 'Tăng khả năng khách hiểu nhanh bạn giải quyết gì.',
              },
            ],
            ctaTitle: 'Bạn không cần đúng use case. Bạn cần đúng điểm nghẽn.',
            ctaDesc:
              'Kể bài toán hiện tại. Mình sẽ giúp bạn map theo framework này và đề xuất bước triển khai phù hợp.',
            ctaPrimary: 'Gửi bài toán',
            ctaSecondary: 'Quay lại trang chính',
          }
        : {
            pageTitle: 'Approach: from unclear problem to working outcome',
            intro:
              'The goal is not to chase random use cases. The goal is to use a repeatable method: diagnose correctly, decompose correctly, and execute correctly.',
            principleTitle: 'Core principles',
            principleItems: [
              'Start from bottlenecks, not from tools.',
              'Do not solve everything at once — split into shippable chunks.',
              'Measure by saved time and real outcomes, not aesthetics alone.',
            ],
            progressTitle: 'Progress framework (7 days)',
            stages: [
              {
                step: '01',
                title: 'Clarify the problem',
                desc: 'Capture context, current workflow, inputs/outputs, and primary bottleneck.',
              },
              {
                step: '02',
                title: 'Decompose the system',
                desc: 'Break into data, logic, interface, and automation blocks prioritized by impact.',
              },
              {
                step: '03',
                title: 'Build core outcome',
                desc: 'Ship the highest-impact working part first.',
              },
              {
                step: '04',
                title: 'Validate and handoff',
                desc: 'Test with real data, handle edge cases, and deliver operational guidance.',
              },
            ],
            progressBoardTitle: 'Current progress board',
            progressBoardSubtitle: 'Live execution snapshot — what is being diagnosed, built, and delivered right now.',
            progressBoardColumns: {
              now: 'Now diagnosing',
              building: 'Building',
              delivered: 'Delivered',
            },
            progressBoardItems: {
              now: [
                'Map user bottleneck and desired outcome',
                'Define required data inputs/outputs',
              ],
              building: [
                'AI intake chatbot with structured field extraction',
                'Lead pipeline persistence + conversation logs',
              ],
              delivered: [
                'Problem-first landing message architecture',
                'Detailed approach page with 7-day framework',
              ],
            },
            usecaseTitle: 'Use cases are examples, not the destination',
            usecaseSubtitle:
              'The examples below only show how the same method can adapt to different contexts.',
            usecases: [
              {
                title: 'Manual lead intake → AI intake + auto form submit',
                impact: 'Fewer back-and-forth loops and faster qualification.',
              },
              {
                title: 'Daily copy-paste reporting → automated workflow',
                impact: 'Save 2–4 hours of repetitive operations per day.',
              },
              {
                title: 'Unclear landing message → clear value + clear CTA',
                impact: 'Improve visitor understanding of what you actually solve.',
              },
            ],
            ctaTitle: 'You do not need the perfect use case. You need the right bottleneck.',
            ctaDesc:
              'Share your current problem. I will map it to this framework and propose a practical execution path.',
            ctaPrimary: 'Send your problem',
            ctaSecondary: 'Back to home',
          },
    [language]
  )

  return (
    <div className="min-h-screen swiss-noise pb-16">
      <header className="sticky top-0 z-50 bg-background border-b-2 border-black">
        <div className="max-w-6xl mx-auto px-4 sm:px-8 py-4 flex items-center justify-between">
          <Link href="/" className="inline-flex items-center gap-3 font-bold uppercase tracking-wide">
            <div className="w-9 h-9 bg-black flex items-center justify-center">
              <Blocks className="w-5 h-5 text-white" />
            </div>
            Builder
          </Link>
          <Link href="/">
            <Button className="rounded-none border-2 border-black bg-black text-white hover:bg-[#FF3000]">
              <ArrowLeft className="w-4 h-4 mr-2" />
              {copy.ctaSecondary}
            </Button>
          </Link>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 sm:px-8 pt-10 space-y-10">
        <section className="space-y-5">
          <Badge variant="outline" className="border-2 border-[#FF3000] bg-[#FF3000] text-white rounded-none px-4 py-2 font-bold uppercase tracking-wider">
            <Target className="w-3 h-3 mr-2" />
            Problem-first method
          </Badge>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black uppercase tracking-tighter leading-[0.95] max-w-4xl text-balance">
            {copy.pageTitle}
          </h1>
          <p className="text-lg text-muted-foreground max-w-3xl leading-relaxed text-balance">{copy.intro}</p>
        </section>

        <section className="grid lg:grid-cols-12 gap-6 lg:gap-8">
          <Card className="lg:col-span-5 rounded-none border-2 border-black bg-white">
            <CardContent className="p-6">
              <h2 className="font-black uppercase tracking-wider text-lg mb-4">{copy.principleTitle}</h2>
              <div className="space-y-3">
                {copy.principleItems.map((item, i) => (
                  <div key={i} className="flex items-start gap-3 border-2 border-black bg-muted p-3">
                    <div className="w-7 h-7 bg-black text-white font-bold text-xs flex items-center justify-center shrink-0">
                      {i + 1}
                    </div>
                    <p className="text-sm leading-relaxed font-medium">{item}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="lg:col-span-7 rounded-none border-2 border-black bg-white">
            <CardContent className="p-6">
              <h2 className="font-black uppercase tracking-wider text-lg mb-4">{copy.progressTitle}</h2>
              <div className="space-y-3">
                {copy.stages.map((stage) => (
                  <div key={stage.step} className="flex items-start gap-4 border-2 border-black p-4">
                    <div className="w-10 h-10 bg-[#FF3000] text-white font-black flex items-center justify-center shrink-0">
                      {stage.step}
                    </div>
                    <div>
                      <h3 className="font-bold uppercase tracking-wider text-sm mb-1">{stage.title}</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">{stage.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </section>

        <section className="space-y-4">
          <div className="flex items-center gap-3">
            <Layers className="w-5 h-5 text-[#FF3000]" />
            <h2 className="text-2xl sm:text-3xl font-black uppercase tracking-tighter">{copy.progressBoardTitle}</h2>
          </div>
          <p className="text-muted-foreground max-w-3xl leading-relaxed">{copy.progressBoardSubtitle}</p>

          <div className="grid md:grid-cols-3 gap-4">
            {[
              { key: 'now', title: copy.progressBoardColumns.now, items: copy.progressBoardItems.now },
              { key: 'building', title: copy.progressBoardColumns.building, items: copy.progressBoardItems.building },
              { key: 'delivered', title: copy.progressBoardColumns.delivered, items: copy.progressBoardItems.delivered },
            ].map((col, i) => (
              <Card key={col.key} className="rounded-none border-2 border-black bg-white">
                <CardContent className="p-5 space-y-4">
                  <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#FF3000]">
                    <span>{String(i + 1).padStart(2, '0')}</span>
                    <span>{col.title}</span>
                  </div>

                  <div className="space-y-3">
                    {col.items.map((item, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-sm leading-relaxed">
                        <Check className="w-4 h-4 mt-0.5 text-[#FF3000] shrink-0" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <section className="space-y-4">
          <div className="flex items-center gap-3">
            <Sparkles className="w-5 h-5 text-[#FF3000]" />
            <h2 className="text-2xl sm:text-3xl font-black uppercase tracking-tighter">{copy.usecaseTitle}</h2>
          </div>
          <p className="text-muted-foreground max-w-3xl leading-relaxed">{copy.usecaseSubtitle}</p>

          <div className="grid md:grid-cols-3 gap-4">
            {copy.usecases.map((item, i) => (
              <Card key={i} className="rounded-none border-2 border-black bg-white">
                <CardContent className="p-5 space-y-3">
                  <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#FF3000]">
                    <Layers className="w-4 h-4" />
                    Example {i + 1}
                  </div>
                  <h3 className="font-bold uppercase tracking-wide text-sm leading-snug">{item.title}</h3>
                  <div className="flex items-start gap-2 text-sm text-muted-foreground leading-relaxed">
                    <Check className="w-4 h-4 mt-0.5 text-[#FF3000] shrink-0" />
                    <span>{item.impact}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <section className="border-2 border-black bg-black text-white p-6 sm:p-8 space-y-4">
          <h2 className="text-2xl sm:text-3xl font-black uppercase tracking-tighter text-balance">{copy.ctaTitle}</h2>
          <p className="text-gray-300 leading-relaxed max-w-3xl">{copy.ctaDesc}</p>
          <div className="flex flex-col sm:flex-row gap-3">
            <Link href="/#contact">
              <Button className="rounded-none border-2 border-white bg-white text-black hover:bg-[#FF3000] hover:text-white hover:border-[#FF3000] font-bold uppercase tracking-wider">
                <Search className="w-4 h-4 mr-2" />
                {copy.ctaPrimary}
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
            <Link href="/">
              <Button variant="outline" className="rounded-none border-2 border-white text-white hover:bg-white hover:text-black font-bold uppercase tracking-wider">
                {copy.ctaSecondary}
              </Button>
            </Link>
          </div>
        </section>
      </main>
    </div>
  )
}

export default function ApproachPage() {
  return (
    <LanguageProvider>
      <ApproachContent />
    </LanguageProvider>
  )
}
