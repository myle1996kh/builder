'use client'

import React, { createContext, useContext, useState } from 'react'

type Language = 'en' | 'vi'

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string) => string
}

const translations: Record<Language, Record<string, string>> = {
  en: {
    // Header
    'nav.about': 'About',
    'nav.purpose': 'Why This',
    'nav.protocol': 'How It Works',
    'nav.approach': 'Approach',
    'nav.contact': 'Contact',
    'nav.talk': "Let's Talk",

    // Hero
    'hero.badge': 'Any problem AI can solve, I can help implement',
    'hero.title1': 'You describe the problem.',
    'hero.title2': 'I ship the working fix.',
    'hero.subtitle': 'I work problem-first, not service-first. Web, landing page, mini tools, and automation are common outputs — but the real focus is solving tasks that machine + AI can handle.',
    'hero.cta1': 'Tell Me The Problem',
    'hero.cta2': 'How It Works',

    // Stats
    'stats.slots': 'Projects / Month',
    'stats.days': 'Days to Deliver',
    'stats.working': 'Tools Shipped',
    'stats.problems': 'Repetitive Tasks Eliminated',

    // About
    'about.badge': 'Who I Am',
    'about.title': 'Proactive. Practical. Solution-first.',
    'about.subtitle': 'I don\'t wait for perfect conditions. I break complex problems into smaller solvable parts, then build step-by-step until we have something working.',
    'about.selfTaught.title': 'Learn fast, execute faster',
    'about.selfTaught.desc': 'My approach is simple: test quickly, learn quickly, improve quickly. I turn uncertainty into iterations, not delays.',
    'about.listening.title': 'Diagnose before building',
    'about.listening.desc': 'I ask focused questions to find the real bottleneck. Once the root issue is clear, solutions become much easier to design and ship.',
    'about.honesty.title': 'Clear commitments',
    'about.honesty.desc': 'No vague promises. If a problem is AI-solvable, I can map a realistic path and deliver in concrete steps.',
    'about.quote': '"Every problem can be decomposed. Once it is decomposed, it can be solved."',
    'about.signature': 'Builder mindset',
    'about.signatureDesc': 'Break down. Execute. Deliver.',

    // Purpose
    'purpose.badge': 'Why This Model Works',
    'purpose.title': 'Not limited by service type. Limited by solvable problems.',
    'purpose.subtitle': 'If machine + AI can solve the problem, I can design a practical implementation. The output can be a website, landing, mini tool, or automation flow — depending on what actually fixes the bottleneck.',
    'purpose.small.title': 'Problem-first over service-first',
    'purpose.small.desc': 'I start from your bottleneck, not from a fixed package list. The solution format comes after the problem is clear.',
    'purpose.action.title': 'Ship fast, improve with use',
    'purpose.action.desc': 'A working solution in 7 days creates learning faster than months of planning. We optimize after real usage.',
    'purpose.access.title': 'AI made practical for more people',
    'purpose.access.desc': 'No need for enterprise complexity. If your problem is clear and measurable, we can turn AI into a usable workflow quickly.',
    'purpose.quote': '"If AI can solve it, we can build it."',

    // Protocol
    'protocol.badge': 'How I Work',
    'protocol.title': 'Fast. Focused. No fluff.',
    'protocol.subtitle': 'The goal: in 7 days, you have something you can actually use. Not a slide deck. Not a prototype. Something real.',
    'protocol.slot1.title': '3 projects per month',
    'protocol.slot1.desc': 'I limit it so I can focus properly. Fewer clients, more attention, better results.',
    'protocol.slot2.title': 'Something working in 7 days',
    'protocol.slot2.desc': 'Not a mockup, not a promise — a tool that runs. By the end of the week, you can use it.',
    'protocol.slot3.title': 'Every project makes the next one better',
    'protocol.slot3.desc': 'I build things I can reuse and improve. What I learn from your project helps whoever comes next.',
    'protocol.timeline.title': 'What happens across 7 days',
    'protocol.timeline.day1': 'Day 1–2: I understand exactly what\'s slowing you down',
    'protocol.timeline.day2': 'Day 3–4: I build the core of the solution',
    'protocol.timeline.day3': 'Day 5–6: Test, fix, adjust',
    'protocol.timeline.day4': 'Day 7: You receive it — ready to use',
    'protocol.availability.title': 'Open spots this month',
    'protocol.availability.desc': 'slots remaining',

    // Services
    'services.badge': 'Common Implementations',
    'services.title': 'Not a fixed service menu — these are common ways solutions get shipped.',
    'services.subtitle': 'Websites, landing pages, mini tools, and workflow automation are typical outputs. But the scope is open if AI can realistically solve the problem.',
    'services.disclaimer': 'No hard limit by project type. If the problem has clear input/output and measurable impact, we can build it.',
    'services.automation.title': 'Repetitive task automation',
    'services.automation.desc': 'Replace repeated manual operations with scripts and AI-assisted flows that run reliably.',
    'services.pipeline.title': 'Cross-tool data workflows',
    'services.pipeline.desc': 'Connect systems so data moves automatically, without copy-paste or repeated exports.',
    'services.integration.title': 'AI-assisted integrations',
    'services.integration.desc': 'Bridge disconnected tools and layer AI where decisions, summarization, or classification is needed.',
    'services.tools.title': 'Mini tools for specific bottlenecks',
    'services.tools.desc': 'Small focused tools that solve one painful step fast and clearly.',
    'services.content.title': 'AI content operations',
    'services.content.desc': 'Speed up drafting, summarizing, repurposing, and publishing workflows with consistent quality.',
    'services.process.title': 'Workflow redesign with AI',
    'services.process.desc': 'Turn current habits into structured, trackable workflows that save time every day.',

    // Packages
    'packages.badge': 'What I Can Build & Timeline',
    'packages.title': 'Clear examples with delivery time',
    'packages.subtitle': 'These are reference packages, not hard limits. If AI can solve your problem, we can scope it and ship fast.',
    'packages.lp.title': 'Landing page sprint',
    'packages.lp.desc': '1 conversion-focused page with lead capture and core tracking.',
    'packages.lp.time': '3–5 days',
    'packages.web.title': 'Personal/business website',
    'packages.web.desc': 'Multi-section site to present your value and convert visitors.',
    'packages.web.time': '5–7 days',
    'packages.tool.title': 'Mini internal tool',
    'packages.tool.desc': 'A focused utility to eliminate one recurring bottleneck.',
    'packages.tool.time': '5–10 days',
    'packages.automation.title': 'AI workflow automation',
    'packages.automation.desc': 'End-to-end flow connecting tools, data, and AI-powered actions.',
    'packages.automation.time': '7–14 days',
    'packages.note': 'Outside these examples? Still possible — as long as the problem is AI-solvable and measurable.',

    // Free slots
    'free.badge': 'Free Projects / Month',
    'free.title': '3 free projects each month (small scope)',
    'free.subtitle': 'To help more people access practical AI implementation, I reserve 3 free slots monthly for focused, executable problems.',
    'free.rule1': 'Scope is intentionally small and clear',
    'free.rule2': 'Priority for high-friction, high-frequency tasks',
    'free.rule3': 'Response in 24–48 hours',

    // CTA
    'cta.title': 'What problem should we solve first?',
    'cta.subtitle': 'Send your workflow bottleneck. I will evaluate feasibility honestly and suggest a practical implementation path.',
    'cta.step1': 'You describe the problem clearly',
    'cta.step2': 'I assess if AI can solve it effectively',
    'cta.step3': 'We ship a working solution fast',
    'cta.button': 'Start the conversation',

    // Form
    'form.title': 'Project Intake',
    'form.name': 'Your name',
    'form.namePlaceholder': 'What should I call you?',
    'form.email': 'Email',
    'form.emailPlaceholder': 'Where should I respond?',
    'form.goal': 'Primary goal',
    'form.goalPlaceholder': 'Choose one',
    'form.goal.time': 'Save time',
    'form.goal.conversion': 'Increase conversion',
    'form.goal.errors': 'Reduce errors',
    'form.goal.other': 'Other',
    'form.timeSpent': 'Time currently wasted per day',
    'form.timeSpentPlaceholder': 'Choose range',
    'form.timeSpent.lt1': 'Less than 1 hour',
    'form.timeSpent.1to2': '1–2 hours',
    'form.timeSpent.2to4': '2–4 hours',
    'form.timeSpent.gt4': 'More than 4 hours',
    'form.tools': 'Current tools (optional)',
    'form.toolsPlaceholder': 'Example: Google Sheets, Notion, Gmail, Slack...',
    'form.deadline': 'Desired timeline',
    'form.deadlinePlaceholder': 'Example: Need first version within 7 days',
    'form.budget': 'Estimated budget',
    'form.budgetPlaceholder': 'Choose range',
    'form.budget.0': 'Free slot only',
    'form.budget.1': 'Below $200',
    'form.budget.2': '$200–$500',
    'form.budget.3': '$500–$1,000',
    'form.budget.4': 'Above $1,000',
    'form.freeSlot': 'Apply for free slot this month?',
    'form.freeSlot.yes': 'Yes',
    'form.freeSlot.no': 'No',
    'form.friction': 'Describe your problem',
    'form.frictionPlaceholder': 'What repetitive or high-friction task do you want to remove? Include current process and expected outcome.',
    'form.submit': 'Send it',
    'form.submitting': 'Sending...',
    'form.success': 'Received. I will review and get back to you soon.',
    'form.error': 'Something went wrong. Please try again.',

    // Footer
    'footer.tagline': 'AI-solvable problems. Fast practical implementation.',
  },
  vi: {
    // Header
    'nav.about': 'Mình là ai',
    'nav.purpose': 'Tại sao',
    'nav.protocol': 'Cách làm',
    'nav.approach': 'Cách tiếp cận',
    'nav.contact': 'Liên hệ',
    'nav.talk': 'Nhắn mình',

    // Hero
    'hero.badge': 'Bài toán nào AI giải được, mình triển khai được',
    'hero.title1': 'Bạn nêu vấn đề.',
    'hero.title2': 'Mình ship giải pháp chạy được.',
    'hero.subtitle': 'Mình đi theo hướng problem-first, không giới hạn theo dịch vụ cố định. Web, landing, mini tools hay automation chỉ là output thường gặp — mục tiêu thật là giải quyết việc máy + AI có thể xử lý.',
    'hero.cta1': 'Gửi bài toán cho mình',
    'hero.cta2': 'Quy trình làm việc',

    // Stats
    'stats.slots': 'Người mỗi tháng',
    'stats.days': 'Ngày là có thứ dùng',
    'stats.working': 'Tool đã làm xong',
    'stats.problems': 'Việc thủ công đã xóa sổ',

    // About
    'about.badge': 'Mình là ai',
    'about.title': 'Chủ động. Thực tế. Đi thẳng vào giải pháp.',
    'about.subtitle': 'Mình không chờ điều kiện hoàn hảo. Mình tách bài toán lớn thành các phần nhỏ có thể xử lý, rồi triển khai từng bước cho đến khi chạy được.',
    'about.selfTaught.title': 'Học nhanh, làm nhanh hơn',
    'about.selfTaught.desc': 'Cách mình làm là: thử nhanh, học nhanh, tối ưu nhanh. Biến sự mơ hồ thành các vòng lặp rõ ràng thay vì trì hoãn.',
    'about.listening.title': 'Chẩn đoán trước khi xây',
    'about.listening.desc': 'Mình đặt câu hỏi đúng để tìm điểm nghẽn gốc. Khi vấn đề cốt lõi rõ ràng, giải pháp sẽ rõ và triển khai nhanh hơn nhiều.',
    'about.honesty.title': 'Cam kết rõ ràng',
    'about.honesty.desc': 'Không hứa chung chung. Nếu AI giải được, mình sẽ vẽ lộ trình thực tế và làm ra theo từng bước cụ thể.',
    'about.quote': '"Mọi vấn đề đều có thể chia nhỏ. Chia nhỏ đúng thì giải được."',
    'about.signature': 'Tư duy Builder',
    'about.signatureDesc': 'Chia nhỏ. Thực thi. Bàn giao.',

    // Purpose
    'purpose.badge': 'Vì sao cách này hiệu quả',
    'purpose.title': 'Không giới hạn bởi dịch vụ. Giới hạn bởi bài toán có thể giải được.',
    'purpose.subtitle': 'Nếu máy + AI có thể xử lý bài toán, mình có thể thiết kế triển khai thực tế. Output có thể là web, landing, mini tool hoặc automation flow — tùy thứ gì giải đúng điểm nghẽn.',
    'purpose.small.title': 'Đi từ vấn đề, không đi từ gói dịch vụ',
    'purpose.small.desc': 'Mình bắt đầu từ bottleneck của bạn, không bắt đầu từ danh sách dịch vụ cố định. Format giải pháp đến sau khi vấn đề đã rõ.',
    'purpose.action.title': 'Ship nhanh, tối ưu sau khi dùng thật',
    'purpose.action.desc': 'Một giải pháp chạy được trong 7 ngày tạo ra học nhanh hơn nhiều tháng lên kế hoạch. Có sử dụng thật mới tối ưu chuẩn.',
    'purpose.access.title': 'Giúp nhiều người tiếp cận AI thực tế hơn',
    'purpose.access.desc': 'Không cần quy trình doanh nghiệp phức tạp. Chỉ cần bài toán rõ và đo được hiệu quả, mình có thể triển khai nhanh.',
    'purpose.quote': '"AI giải được thì mình làm được."',

    // Protocol
    'protocol.badge': 'Mình làm việc thế nào',
    'protocol.title': 'Nhanh. Tập trung. Không vòng vèo.',
    'protocol.subtitle': 'Mục tiêu: trong 7 ngày bạn có thứ gì đó dùng được thật — không phải slide, không phải hứa hẹn.',
    'protocol.slot1.title': '3 người mỗi tháng',
    'protocol.slot1.desc': 'Giới hạn để làm kỹ. Ít người hơn, tập trung hơn, kết quả tốt hơn.',
    'protocol.slot2.title': 'Có thứ dùng được sau 7 ngày',
    'protocol.slot2.desc': 'Không phải mockup, không phải lời hứa — là thứ chạy được thật. Cuối tuần bạn nhận và dùng luôn.',
    'protocol.slot3.title': 'Mỗi project giúp cái tiếp theo tốt hơn',
    'protocol.slot3.desc': 'Mình tích lũy dần. Thứ mình làm cho bạn hôm nay giúp mình phục vụ người tiếp theo tốt hơn.',
    'protocol.timeline.title': '7 ngày đó trông như thế nào',
    'protocol.timeline.day1': 'Ngày 1–2: Mình hiểu chính xác cái gì đang làm chậm bạn',
    'protocol.timeline.day2': 'Ngày 3–4: Làm phần cốt lõi của giải pháp',
    'protocol.timeline.day3': 'Ngày 5–6: Thử, sửa, chỉnh',
    'protocol.timeline.day4': 'Ngày 7: Bạn nhận — dùng được luôn',
    'protocol.availability.title': 'Tháng này còn chỗ',
    'protocol.availability.desc': 'slot còn trống',

    // Services
    'services.badge': 'Các dạng triển khai thường gặp',
    'services.title': 'Không phải menu dịch vụ cố định — đây là các output phổ biến.',
    'services.subtitle': 'Web, landing, mini tools, workflow automation là những dạng thường gặp. Nhưng phạm vi luôn mở nếu AI giải được bài toán thực tế.',
    'services.disclaimer': 'Không giới hạn theo loại dự án. Chỉ cần bài toán có input/output rõ và đo được hiệu quả là có thể triển khai.',
    'services.automation.title': 'Tự động hoá việc lặp lại',
    'services.automation.desc': 'Thay các thao tác tay lặp đi lặp lại bằng script và luồng có AI hỗ trợ chạy ổn định.',
    'services.pipeline.title': 'Luồng dữ liệu giữa nhiều công cụ',
    'services.pipeline.desc': 'Kết nối các hệ thống để dữ liệu tự chạy, không cần copy-paste hay xuất nhập thủ công.',
    'services.integration.title': 'Tích hợp có AI hỗ trợ',
    'services.integration.desc': 'Nối các công cụ rời rạc và chèn AI vào chỗ cần phân loại, tóm tắt, hoặc hỗ trợ quyết định.',
    'services.tools.title': 'Mini tool giải quyết đúng điểm nghẽn',
    'services.tools.desc': 'Công cụ nhỏ, tập trung, giải quyết nhanh một bước đau nhất trong quy trình.',
    'services.content.title': 'Vận hành nội dung với AI',
    'services.content.desc': 'Tăng tốc khâu soạn, tóm tắt, tái sử dụng và phân phối nội dung ổn định hơn.',
    'services.process.title': 'Thiết kế lại workflow với AI',
    'services.process.desc': 'Biến thói quen làm việc hiện tại thành luồng có cấu trúc, theo dõi được và tiết kiệm thời gian mỗi ngày.',

    // Packages
    'packages.badge': 'Làm gì cụ thể & thời gian',
    'packages.title': 'Các gói mẫu với thời gian triển khai rõ',
    'packages.subtitle': 'Đây là gói tham chiếu, không phải giới hạn cứng. Nếu AI giải được bài toán, mình có thể scope và triển khai nhanh.',
    'packages.lp.title': 'Landing page sprint',
    'packages.lp.desc': '1 landing page tập trung chuyển đổi, có form nhận lead và tracking cơ bản.',
    'packages.lp.time': '3–5 ngày',
    'packages.web.title': 'Website cá nhân/doanh nghiệp nhỏ',
    'packages.web.desc': 'Website nhiều section để thể hiện năng lực rõ và tăng chuyển đổi.',
    'packages.web.time': '5–7 ngày',
    'packages.tool.title': 'Mini tool nội bộ',
    'packages.tool.desc': 'Một công cụ nhỏ để xoá một bottleneck lặp lại thường xuyên.',
    'packages.tool.time': '5–10 ngày',
    'packages.automation.title': 'Workflow automation với AI',
    'packages.automation.desc': 'Luồng end-to-end kết nối tool, dữ liệu và các tác vụ AI.',
    'packages.automation.time': '7–14 ngày',
    'packages.note': 'Ngoài các gói mẫu này vẫn làm được — miễn là bài toán AI giải được và đo được hiệu quả.',

    // Free slots
    'free.badge': 'Dự án miễn phí / tháng',
    'free.title': '3 dự án miễn phí mỗi tháng (scope nhỏ)',
    'free.subtitle': 'Để nhiều người tiếp cận AI thực tế hơn, mình giữ 3 slot miễn phí mỗi tháng cho bài toán nhỏ, rõ và triển khai được.',
    'free.rule1': 'Scope nhỏ, mục tiêu rõ',
    'free.rule2': 'Ưu tiên việc lặp nhiều, gây tắc nghẽn cao',
    'free.rule3': 'Phản hồi trong 24–48 giờ',

    // CTA
    'cta.title': 'Mình nên giúp bạn xử lý bài toán nào trước?',
    'cta.subtitle': 'Gửi bottleneck trong quy trình hiện tại của bạn. Mình sẽ đánh giá khả thi thẳng thắn và đề xuất cách triển khai thực tế.',
    'cta.step1': 'Bạn mô tả vấn đề càng rõ càng tốt',
    'cta.step2': 'Mình đánh giá AI có giải hiệu quả được không',
    'cta.step3': 'Nếu phù hợp, ship nhanh bản chạy được',
    'cta.button': 'Bắt đầu trao đổi',

    // Form
    'form.title': 'Biểu mẫu nhận yêu cầu',
    'form.name': 'Tên của bạn',
    'form.namePlaceholder': 'Mình nên gọi bạn là gì?',
    'form.email': 'Email',
    'form.emailPlaceholder': 'Mình sẽ phản hồi qua đâu?',
    'form.goal': 'Mục tiêu chính',
    'form.goalPlaceholder': 'Chọn một mục tiêu',
    'form.goal.time': 'Tiết kiệm thời gian',
    'form.goal.conversion': 'Tăng chuyển đổi',
    'form.goal.errors': 'Giảm lỗi',
    'form.goal.other': 'Khác',
    'form.timeSpent': 'Thời gian đang mất mỗi ngày',
    'form.timeSpentPlaceholder': 'Chọn khoảng thời gian',
    'form.timeSpent.lt1': 'Dưới 1 giờ',
    'form.timeSpent.1to2': '1–2 giờ',
    'form.timeSpent.2to4': '2–4 giờ',
    'form.timeSpent.gt4': 'Trên 4 giờ',
    'form.tools': 'Tool đang dùng (không bắt buộc)',
    'form.toolsPlaceholder': 'Ví dụ: Google Sheets, Notion, Gmail, Slack...',
    'form.deadline': 'Mốc thời gian mong muốn',
    'form.deadlinePlaceholder': 'Ví dụ: Cần bản đầu tiên trong 7 ngày',
    'form.budget': 'Ngân sách dự kiến',
    'form.budgetPlaceholder': 'Chọn khoảng ngân sách',
    'form.budget.0': 'Chỉ nhận slot miễn phí',
    'form.budget.1': 'Dưới $200',
    'form.budget.2': '$200–$500',
    'form.budget.3': '$500–$1,000',
    'form.budget.4': 'Trên $1,000',
    'form.freeSlot': 'Bạn muốn apply slot miễn phí tháng này?',
    'form.freeSlot.yes': 'Có',
    'form.freeSlot.no': 'Không',
    'form.friction': 'Mô tả bài toán',
    'form.frictionPlaceholder': 'Bạn muốn bỏ thao tác lặp nào? Mô tả quy trình hiện tại và kết quả bạn mong muốn.',
    'form.submit': 'Gửi cho mình',
    'form.submitting': 'Đang gửi...',
    'form.success': 'Mình đã nhận được. Sẽ xem kỹ và phản hồi sớm cho bạn.',
    'form.error': 'Có lỗi xảy ra. Bạn thử lại giúp mình nhé.',

    // Footer
    'footer.tagline': 'Bài toán AI giải được. Triển khai nhanh để dùng thật.',
  }
}

const LanguageContext = createContext<LanguageContextType>({
  language: 'en',
  setLanguage: () => {},
  t: (key) => key,
})

function getInitialLanguage(): Language {
  // Keep initial render deterministic for SSR/CSR hydration consistency.
  return 'en'
}

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>(getInitialLanguage)

  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang)
    localStorage.setItem('language', lang)
  }

  const t = (key: string): string => {
    return translations[language][key] || key
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage: handleSetLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  return context
}
