'use client'

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ContactForm } from "@/components/contact-form"
import { HeroSection } from "@/components/hero-section"
import { ChatbotPopup } from "@/components/chatbot-popup"
import { LanguageProvider, useLanguage } from "@/contexts/language-context"
import { 
  Plus,
  User,
  Wrench,
  MessageSquare,
  Target,
  Zap, 
  Layers,
  Sparkles,
  Blocks,
  Rocket,
  Heart,
  Lightbulb,
  Clock,
  Globe
} from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

function LandingPage() {
  const { t, language, setLanguage } = useLanguage()

  return (
    <div className="min-h-screen flex flex-col swiss-noise">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background border-b-2 border-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-black flex items-center justify-center">
              <Blocks className="w-6 h-6 text-white" />
            </div>
            <span className="font-bold text-lg tracking-tight uppercase hidden sm:block">Builder</span>
          </div>
          
          <nav className="hidden md:flex items-center gap-8">
            <a href="#about" className="swiss-nav-link text-sm font-bold uppercase tracking-widest" data-text={t('nav.about')}>
              <span>{t('nav.about')}</span>
            </a>
            <a href="#purpose" className="swiss-nav-link text-sm font-bold uppercase tracking-widest" data-text={t('nav.purpose')}>
              <span>{t('nav.purpose')}</span>
            </a>
            <a href="#protocol" className="swiss-nav-link text-sm font-bold uppercase tracking-widest" data-text={t('nav.protocol')}>
              <span>{t('nav.protocol')}</span>
            </a>
            <a href="/approach" className="swiss-nav-link text-sm font-bold uppercase tracking-widest" data-text={t('nav.approach')}>
              <span>{t('nav.approach')}</span>
            </a>
            <a href="#contact" className="swiss-nav-link text-sm font-bold uppercase tracking-widest" data-text={t('nav.contact')}>
              <span>{t('nav.contact')}</span>
            </a>
          </nav>
          
          <div className="flex items-center gap-4">
            {/* Language Switcher */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="gap-2 border-2 border-transparent hover:border-black font-bold uppercase tracking-wider">
                  <Globe className="w-4 h-4" />
                  <span>{language === 'vi' ? 'VI' : 'EN'}</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="border-2 border-black rounded-none">
                <DropdownMenuItem onClick={() => setLanguage('en')} className="font-bold uppercase tracking-wider">
                  <span className={language === 'en' ? 'text-[#FF3000]' : ''}>English</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setLanguage('vi')} className="font-bold uppercase tracking-wider">
                  <span className={language === 'vi' ? 'text-[#FF3000]' : ''}>Tiếng Việt</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            
            <Button className="hidden sm:flex bg-black text-white hover:bg-[#FF3000] rounded-none font-bold uppercase tracking-wider text-sm px-6 py-5 border-2 border-black" asChild>
              <a href="#contact">{t('nav.talk')}</a>
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <HeroSection
        badge={t('hero.badge')}
        title1={t('hero.title1')}
        title2={t('hero.title2')}
        subtitle={t('hero.subtitle')}
        cta1={t('hero.cta1')}
        cta2={t('hero.cta2')}
      />

      {/* Stats Bar */}
      <section className="border-y-4 border-black bg-muted swiss-grid-pattern">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4">
            {[
              { value: '3', label: t('stats.slots') },
              { value: '7', label: t('stats.days') },
              { value: '100%', label: t('stats.working') },
              { value: '∞', label: t('stats.problems') },
            ].map((stat, index) => (
              <div 
                key={index} 
                className="p-8 sm:p-12 border-r-2 border-black last:border-r-0 md:last:border-r-2 lg:last:border-r-0 group cursor-pointer swiss-scale-hover"
              >
                <div className="text-4xl sm:text-5xl font-black tracking-tighter group-hover:text-[#FF3000] transition-colors duration-150">
                  {stat.value}
                </div>
                <div className="text-xs font-bold uppercase tracking-widest mt-2">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 sm:py-28 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          {/* Section Header */}
          <div className="flex items-center gap-4 mb-12 lg:mb-16">
            <span className="swiss-section-number">01.</span>
            <div className="h-[2px] flex-1 bg-black"></div>
          </div>
          
          <div className="grid lg:grid-cols-12 gap-8 lg:gap-16">
            {/* Left Column - Title */}
            <div className="lg:col-span-5">
              <Badge variant="outline" className="mb-4 border-2 border-[#FF3000] bg-[#FF3000] text-white rounded-none px-4 py-2 font-bold uppercase tracking-wider">
                <User className="w-3 h-3 mr-2" />
                {t('about.badge')}
              </Badge>
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black uppercase tracking-tighter leading-[0.95] mb-6">
                {t('about.title')}
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                {t('about.subtitle')}
              </p>
            </div>
            
            {/* Right Column - Cards */}
            <div className="lg:col-span-7">
              <div className="grid sm:grid-cols-2 gap-4">
                <Card className="swiss-card rounded-none border-2 border-black">
                  <CardContent className="p-6">
                    <div className="swiss-card-icon w-12 h-12 border-2 border-black flex items-center justify-center mb-4 bg-muted">
                      <Lightbulb className="w-6 h-6" />
                    </div>
                    <h3 className="swiss-card-title font-bold uppercase tracking-wider text-sm mb-2">{t('about.selfTaught.title')}</h3>
                    <p className="swiss-card-desc text-sm text-muted-foreground leading-relaxed">
                      {t('about.selfTaught.desc')}
                    </p>
                  </CardContent>
                </Card>
                
                <Card className="swiss-card rounded-none border-2 border-black">
                  <CardContent className="p-6">
                    <div className="swiss-card-icon w-12 h-12 border-2 border-black flex items-center justify-center mb-4 bg-muted">
                      <MessageSquare className="w-6 h-6" />
                    </div>
                    <h3 className="swiss-card-title font-bold uppercase tracking-wider text-sm mb-2">{t('about.listening.title')}</h3>
                    <p className="swiss-card-desc text-sm text-muted-foreground leading-relaxed">
                      {t('about.listening.desc')}
                    </p>
                  </CardContent>
                </Card>
                
                <Card className="swiss-card rounded-none border-2 border-black sm:col-span-2">
                  <CardContent className="p-6">
                    <div className="swiss-card-icon w-12 h-12 border-2 border-black flex items-center justify-center mb-4 bg-muted">
                      <Heart className="w-6 h-6" />
                    </div>
                    <h3 className="swiss-card-title font-bold uppercase tracking-wider text-sm mb-2">{t('about.honesty.title')}</h3>
                    <p className="swiss-card-desc text-sm text-muted-foreground leading-relaxed">
                      {t('about.honesty.desc')}
                    </p>
                  </CardContent>
                </Card>
              </div>
              
              {/* Quote Block */}
              <div className="mt-8 p-8 bg-muted swiss-dots border-2 border-black">
                <blockquote className="text-xl sm:text-2xl font-medium italic leading-relaxed mb-6">
                  {t('about.quote')}
                </blockquote>
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 bg-black flex items-center justify-center">
                    <Wrench className="w-7 h-7 text-white" />
                  </div>
                  <div>
                    <div className="font-bold uppercase tracking-wider">{t('about.signature')}</div>
                    <div className="text-sm text-muted-foreground">{t('about.signatureDesc')}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Purpose Section */}
      <section id="purpose" className="py-20 sm:py-28 lg:py-32 bg-muted swiss-grid-pattern">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          {/* Section Header */}
          <div className="flex items-center gap-4 mb-12 lg:mb-16">
            <span className="swiss-section-number">02.</span>
            <div className="h-[2px] flex-1 bg-black"></div>
          </div>
          
          <div className="grid lg:grid-cols-12 gap-8 lg:gap-16">
            {/* Left - Title */}
            <div className="lg:col-span-5">
              <Badge variant="outline" className="mb-4 border-2 border-[#FF3000] bg-[#FF3000] text-white rounded-none px-4 py-2 font-bold uppercase tracking-wider">
                <Target className="w-3 h-3 mr-2" />
                {t('purpose.badge')}
              </Badge>
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black uppercase tracking-tighter leading-[0.95] mb-6">
                {t('purpose.title')}
              </h2>
              <p className="text-lg text-muted-foreground">
                {t('purpose.subtitle')}
              </p>
            </div>
            
            {/* Right - Cards */}
            <div className="lg:col-span-7">
              <div className="space-y-4">
                {[
                  { title: t('purpose.small.title'), desc: t('purpose.small.desc'), icon: Layers },
                  { title: t('purpose.action.title'), desc: t('purpose.action.desc'), icon: Rocket },
                  { title: t('purpose.access.title'), desc: t('purpose.access.desc'), icon: Zap },
                ].map((item, index) => (
                  <Card key={index} className="swiss-card rounded-none border-2 border-black bg-white">
                    <CardContent className="p-6 flex items-start gap-6">
                      <div className="swiss-card-icon w-16 h-16 border-2 border-black flex items-center justify-center flex-shrink-0 bg-muted swiss-dots">
                        <item.icon className="w-7 h-7" />
                      </div>
                      <div className="flex-1">
                        <h3 className="swiss-card-title font-bold uppercase tracking-wider text-lg mb-2">{item.title}</h3>
                        <p className="swiss-card-desc text-muted-foreground leading-relaxed">{item.desc}</p>
                      </div>
                      <Plus className="w-6 h-6 swiss-icon-rotate flex-shrink-0" />
                    </CardContent>
                  </Card>
                ))}
              </div>
              
              {/* Quote */}
              <div className="mt-8 p-6 bg-black text-white border-2 border-black">
                <p className="text-lg font-medium text-center tracking-wide">
                  {t('purpose.quote')}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Protocol Section */}
      <section id="protocol" className="py-20 sm:py-28 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          {/* Section Header */}
          <div className="flex items-center gap-4 mb-12 lg:mb-16">
            <span className="swiss-section-number">03.</span>
            <div className="h-[2px] flex-1 bg-black"></div>
          </div>
          
          <div className="grid lg:grid-cols-12 gap-8 lg:gap-16">
            {/* Left Column */}
            <div className="lg:col-span-7">
              <Badge variant="outline" className="mb-4 border-2 border-[#FF3000] bg-[#FF3000] text-white rounded-none px-4 py-2 font-bold uppercase tracking-wider">
                <Clock className="w-3 h-3 mr-2" />
                {t('protocol.badge')}
              </Badge>
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black uppercase tracking-tighter leading-[0.95] mb-6">
                {t('protocol.title')}
              </h2>
              <p className="text-lg text-muted-foreground mb-12">
                {t('protocol.subtitle')}
              </p>

              {/* Protocol Steps */}
              <div className="space-y-6">
                {[
                  { num: '01', title: t('protocol.slot1.title'), desc: t('protocol.slot1.desc') },
                  { num: '02', title: t('protocol.slot2.title'), desc: t('protocol.slot2.desc') },
                  { num: '03', title: t('protocol.slot3.title'), desc: t('protocol.slot3.desc') },
                ].map((item, index) => (
                  <div key={index} className="flex gap-6 group">
                    <div className="w-16 h-16 border-2 border-black flex items-center justify-center flex-shrink-0 bg-muted group-hover:bg-[#FF3000] group-hover:border-[#FF3000] transition-colors duration-150">
                      <span className="font-black text-xl group-hover:text-white transition-colors duration-150">{item.num}</span>
                    </div>
                    <div className="pt-2">
                      <h3 className="font-bold uppercase tracking-wider text-lg mb-1">{item.title}</h3>
                      <p className="text-muted-foreground">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Right Column - Timeline Card */}
            <div className="lg:col-span-5">
              <Card className="rounded-none border-4 border-black h-full">
                <CardContent className="p-8">
                  <h3 className="font-bold uppercase tracking-wider text-lg mb-6">{t('protocol.timeline.title')}</h3>
                  
                  <div className="space-y-4">
                    {[
                      t('protocol.timeline.day1'),
                      t('protocol.timeline.day2'),
                      t('protocol.timeline.day3'),
                      t('protocol.timeline.day4'),
                    ].map((item, index) => (
                      <div key={index} className="flex items-center gap-4 p-4 border-2 border-black bg-muted group hover:bg-black hover:border-black transition-colors duration-150 cursor-pointer">
                        <div className="w-8 h-8 bg-[#FF3000] flex items-center justify-center flex-shrink-0">
                          <span className="text-white font-bold text-sm">{index + 1}</span>
                        </div>
                        <span className="text-sm font-medium group-hover:text-white transition-colors duration-150">{item}</span>
                      </div>
                    ))}
                  </div>
                  
                  <div className="mt-8 p-6 bg-muted swiss-dots border-2 border-black">
                    <div className="flex items-center gap-2 mb-2">
                      <Clock className="w-4 h-4 text-[#FF3000]" />
                      <span className="font-bold uppercase tracking-wider text-sm">{t('protocol.availability.title')}</span>
                    </div>
                    <p className="text-lg">
                      <span className="text-[#FF3000] font-black text-2xl">2 slots</span> <span className="text-muted-foreground">{t('protocol.availability.desc')}</span>
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 sm:py-28 lg:py-32 bg-muted swiss-grid-pattern">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          {/* Section Header */}
          <div className="flex items-center gap-4 mb-12 lg:mb-16">
            <span className="swiss-section-number">04.</span>
            <div className="h-[2px] flex-1 bg-black"></div>
          </div>
          
          <div className="grid lg:grid-cols-12 gap-8 lg:gap-16">
            {/* Left - Title */}
            <div className="lg:col-span-4">
              <Badge variant="outline" className="mb-4 border-2 border-[#FF3000] bg-[#FF3000] text-white rounded-none px-4 py-2 font-bold uppercase tracking-wider">
                <Wrench className="w-3 h-3 mr-2" />
                {t('services.badge')}
              </Badge>
              <h2 className="text-4xl sm:text-5xl font-black uppercase tracking-tighter leading-[0.95] mb-6">
                {t('services.title')}
              </h2>
              <p className="text-muted-foreground mb-4">
                {t('services.subtitle')}
              </p>
              <p className="text-sm font-medium border-2 border-black bg-white p-4 leading-relaxed">
                {t('services.disclaimer')}
              </p>
            </div>
            
            {/* Right - Services Grid */}
            <div className="lg:col-span-8">
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {[
                  { title: t('services.automation.title'), desc: t('services.automation.desc'), icon: Zap },
                  { title: t('services.pipeline.title'), desc: t('services.pipeline.desc'), icon: Layers },
                  { title: t('services.integration.title'), desc: t('services.integration.desc'), icon: Blocks },
                  { title: t('services.tools.title'), desc: t('services.tools.desc'), icon: Wrench },
                  { title: t('services.content.title'), desc: t('services.content.desc'), icon: Sparkles },
                  { title: t('services.process.title'), desc: t('services.process.desc'), icon: Target },
                ].map((item, index) => (
                  <Card key={index} className="swiss-card rounded-none border-2 border-black bg-white">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="swiss-card-icon w-10 h-10 border-2 border-black flex items-center justify-center bg-muted">
                          <item.icon className="w-5 h-5" />
                        </div>
                        <Plus className="w-5 h-5 swiss-icon-rotate" />
                      </div>
                      <h3 className="swiss-card-title font-bold uppercase tracking-wider text-sm mb-2">{item.title}</h3>
                      <p className="swiss-card-desc text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Packages Section */}
      <section className="py-20 sm:py-28 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          {/* Section Header */}
          <div className="flex items-center gap-4 mb-12 lg:mb-16">
            <span className="swiss-section-number">05.</span>
            <div className="h-[2px] flex-1 bg-black"></div>
          </div>

          <div className="grid lg:grid-cols-12 gap-8 lg:gap-16">
            <div className="lg:col-span-4">
              <Badge variant="outline" className="mb-4 border-2 border-[#FF3000] bg-[#FF3000] text-white rounded-none px-4 py-2 font-bold uppercase tracking-wider">
                <Rocket className="w-3 h-3 mr-2" />
                {t('packages.badge')}
              </Badge>
              <h2 className="text-4xl sm:text-5xl font-black uppercase tracking-tighter leading-[0.95] mb-6">
                {t('packages.title')}
              </h2>
              <p className="text-muted-foreground mb-6">
                {t('packages.subtitle')}
              </p>
              <p className="text-sm font-medium border-2 border-black bg-muted p-4 leading-relaxed">
                {t('packages.note')}
              </p>
            </div>

            <div className="lg:col-span-8">
              <div className="grid sm:grid-cols-2 gap-4">
                {[
                  { title: t('packages.lp.title'), desc: t('packages.lp.desc'), time: t('packages.lp.time'), icon: Blocks },
                  { title: t('packages.web.title'), desc: t('packages.web.desc'), time: t('packages.web.time'), icon: User },
                  { title: t('packages.tool.title'), desc: t('packages.tool.desc'), time: t('packages.tool.time'), icon: Wrench },
                  { title: t('packages.automation.title'), desc: t('packages.automation.desc'), time: t('packages.automation.time'), icon: Zap },
                ].map((item, index) => (
                  <Card key={index} className="swiss-card rounded-none border-2 border-black bg-white">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <div className="swiss-card-icon w-10 h-10 border-2 border-black flex items-center justify-center bg-muted">
                          <item.icon className="w-5 h-5" />
                        </div>
                        <span className="text-xs font-black uppercase tracking-widest border-2 border-black px-3 py-1">
                          {item.time}
                        </span>
                      </div>
                      <h3 className="swiss-card-title font-bold uppercase tracking-wider text-sm mb-2">{item.title}</h3>
                      <p className="swiss-card-desc text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Free Slots Section */}
      <section className="py-20 sm:py-28 lg:py-32 bg-muted swiss-grid-pattern">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          {/* Section Header */}
          <div className="flex items-center gap-4 mb-12 lg:mb-16">
            <span className="swiss-section-number">06.</span>
            <div className="h-[2px] flex-1 bg-black"></div>
          </div>

          <div className="grid lg:grid-cols-12 gap-8 lg:gap-16">
            <div className="lg:col-span-5">
              <Badge variant="outline" className="mb-4 border-2 border-[#FF3000] bg-[#FF3000] text-white rounded-none px-4 py-2 font-bold uppercase tracking-wider">
                <Heart className="w-3 h-3 mr-2" />
                {t('free.badge')}
              </Badge>
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black uppercase tracking-tighter leading-[0.95] mb-6">
                {t('free.title')}
              </h2>
              <p className="text-lg text-muted-foreground">
                {t('free.subtitle')}
              </p>
            </div>

            <div className="lg:col-span-7">
              <Card className="rounded-none border-4 border-black bg-white">
                <CardContent className="p-8">
                  <div className="space-y-4">
                    {[t('free.rule1'), t('free.rule2'), t('free.rule3')].map((rule, index) => (
                      <div key={index} className="flex items-center gap-4 p-4 border-2 border-black bg-muted">
                        <div className="w-8 h-8 bg-[#FF3000] text-white font-black flex items-center justify-center text-sm">
                          {index + 1}
                        </div>
                        <p className="text-sm font-medium">{rule}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 sm:py-28 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          {/* Section Header */}
          <div className="flex items-center gap-4 mb-12 lg:mb-16">
            <span className="swiss-section-number">07.</span>
            <div className="h-[2px] flex-1 bg-black"></div>
          </div>

          {/* Execution Hook Block */}
          <div className="mb-12 border-4 border-black bg-white">
            <div className="bg-black text-white px-5 sm:px-7 py-3 border-b-2 border-black flex items-center gap-2">
              <span className="w-2 h-2 bg-[#FF3000]" />
              <span className="text-[11px] sm:text-xs font-bold uppercase tracking-[0.14em]">
                {language === 'vi'
                  ? 'Nếu một việc lặp lại mỗi ngày, đó là thứ cần tự động hoá trước'
                  : 'If a task repeats every day, automate that first'}
              </span>
            </div>

            <div className="grid lg:grid-cols-12 gap-0">
              <div className="lg:col-span-7 p-6 sm:p-8 lg:p-10 bg-black text-white">
                <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#FF3000] mb-3">
                  {language === 'vi' ? 'Hook chính' : 'Core hook'}
                </p>
                <h3 className="text-2xl sm:text-3xl lg:text-4xl font-black uppercase tracking-tighter leading-[1.03] mb-4 text-balance">
                  {language === 'vi'
                    ? 'Bạn không thiếu ý tưởng. Bạn thiếu một hệ thống để biến ý tưởng thành kết quả.'
                    : 'You do not lack ideas. You lack a system that turns ideas into outcomes.'}
                </h3>
                <p className="text-gray-300 leading-relaxed max-w-2xl mb-6">
                  {language === 'vi'
                    ? 'Mình giúp bạn tách bài toán thành các bước nhỏ có thể triển khai ngay, rồi ship một bản chạy được trong thời gian ngắn.'
                    : 'I help you decompose the problem into executable chunks, then ship a working version quickly.'}
                </p>

                <div className="inline-flex items-center gap-2 border-2 border-[#FF3000] bg-[#FF3000] px-4 py-2">
                  <Rocket className="w-4 h-4" />
                  <span className="text-xs sm:text-sm font-black uppercase tracking-wider">
                    {language === 'vi' ? 'Chia nhỏ đúng. Làm nhanh. Có kết quả.' : 'Decompose right. Build fast. Deliver outcomes.'}
                  </span>
                </div>
              </div>

              <div className="lg:col-span-5 p-6 sm:p-8 space-y-3 bg-muted">
                <div className="border-2 border-black bg-white p-4">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-9 h-9 border-2 border-black flex items-center justify-center">
                      <Target className="w-4 h-4" />
                    </div>
                    <p className="text-xs font-black uppercase tracking-widest">{language === 'vi' ? 'Vấn đề' : 'Problem'}</p>
                  </div>
                  <p className="text-sm font-medium leading-relaxed">
                    {language === 'vi' ? 'Việc lặp lại, tốn 2–4 giờ mỗi ngày.' : 'Repeated manual work taking 2–4 hours/day.'}
                  </p>
                </div>

                <div className="border-2 border-black bg-white p-4">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-9 h-9 border-2 border-[#FF3000] bg-[#FF3000] text-white flex items-center justify-center">
                      <Clock className="w-4 h-4" />
                    </div>
                    <p className="text-xs font-black uppercase tracking-widest text-[#FF3000]">{language === 'vi' ? 'Tiếp cận' : 'Approach'}</p>
                  </div>
                  <p className="text-sm font-medium leading-relaxed">
                    {language === 'vi' ? 'Chia nhỏ workflow, ưu tiên điểm nghẽn impact cao.' : 'Decompose workflow and prioritize high-impact bottlenecks.'}
                  </p>
                </div>

                <div className="border-2 border-black bg-black text-white p-4">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-9 h-9 border-2 border-white bg-white text-black flex items-center justify-center">
                      <Rocket className="w-4 h-4" />
                    </div>
                    <p className="text-xs font-black uppercase tracking-widest text-[#FF3000]">{language === 'vi' ? 'Kết quả' : 'Outcome'}</p>
                  </div>
                  <p className="text-sm font-medium leading-relaxed">
                    {language === 'vi' ? 'Bản chạy được trong 7 ngày + hướng tối ưu tiếp theo.' : 'Working solution in 7 days + next optimization path.'}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="grid lg:grid-cols-12 gap-8 lg:gap-16">
            {/* Left Column */}
            <div className="lg:col-span-5">
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black uppercase tracking-tighter leading-[0.95] mb-6">
                {t('cta.title')}
              </h2>
              <p className="text-lg text-muted-foreground mb-10">
                {t('cta.subtitle')}
              </p>
              
              {/* Steps */}
              <div className="space-y-4">
                {[
                  { num: '01', text: t('cta.step1') },
                  { num: '02', text: t('cta.step2') },
                  { num: '03', text: t('cta.step3') },
                ].map((item, index) => (
                  <div key={index} className="flex items-center gap-4 p-4 border-2 border-black bg-muted group hover:bg-black transition-colors duration-150 cursor-pointer">
                    <span className="text-[#FF3000] font-black text-xl">{item.num}</span>
                    <span className="text-sm font-medium group-hover:text-white transition-colors duration-150">{item.text}</span>
                  </div>
                ))}
              </div>

              {/* Contact Links */}
              <div className="mt-8 space-y-3">
                <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-4">
                  {language === 'vi' ? 'Hoặc liên hệ trực tiếp' : 'Or reach out directly'}
                </p>
                <a
                  href="https://www.facebook.com/LucyNguyen11/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 p-4 border-2 border-black bg-muted hover:bg-[#FF3000] hover:text-white hover:border-[#FF3000] transition-colors duration-150 group"
                >
                  <div className="w-8 h-8 border-2 border-current flex items-center justify-center flex-shrink-0">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                  </div>
                  <span className="text-sm font-bold uppercase tracking-wider">Facebook</span>
                </a>
                <a
                  href="https://zalo.me/0909045605"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 p-4 border-2 border-black bg-muted hover:bg-[#FF3000] hover:text-white hover:border-[#FF3000] transition-colors duration-150 group"
                >
                  <div className="w-8 h-8 border-2 border-current flex items-center justify-center flex-shrink-0 text-xs font-black">
                    Z
                  </div>
                  <span className="text-sm font-bold uppercase tracking-wider">Zalo — 0909 045 605</span>
                </a>
                <a
                  href="mailto:le.ntmkh@gmail.com"
                  className="flex items-center gap-4 p-4 border-2 border-black bg-muted hover:bg-[#FF3000] hover:text-white hover:border-[#FF3000] transition-colors duration-150 group"
                >
                  <div className="w-8 h-8 border-2 border-current flex items-center justify-center flex-shrink-0">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                  </div>
                  <span className="text-sm font-bold uppercase tracking-wider">le.ntmkh@gmail.com</span>
                </a>
              </div>
            </div>
            
            {/* Right Column - Form */}
            <div className="lg:col-span-7">
              <ContactForm />
            </div>
          </div>
        </div>
      </section>

      <ChatbotPopup />

      {/* Footer */}
      <footer className="mt-auto border-t-4 border-black bg-black text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 py-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="w-8 h-8 bg-white flex items-center justify-center">
                <Blocks className="w-5 h-5 text-black" />
              </div>
              <span className="font-bold uppercase tracking-wider">Human-Centered Builder</span>
            </div>
            
            <div className="flex items-center gap-8">
              <a href="#about" className="text-sm font-bold uppercase tracking-wider hover:text-[#FF3000] transition-colors duration-150">{t('nav.about')}</a>
              <a href="#purpose" className="text-sm font-bold uppercase tracking-wider hover:text-[#FF3000] transition-colors duration-150">{t('nav.purpose')}</a>
              <a href="#contact" className="text-sm font-bold uppercase tracking-wider hover:text-[#FF3000] transition-colors duration-150">{t('nav.contact')}</a>
            </div>
            
            <p className="text-sm text-gray-400 font-medium">
              {t('footer.tagline')}
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default function Home() {
  return (
    <LanguageProvider>
      <LandingPage />
    </LanguageProvider>
  )
}
