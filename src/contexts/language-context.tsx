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
    'nav.purpose': 'Why Free?',
    'nav.protocol': 'How It Works',
    'nav.approach': 'Approach',
    'nav.contact': 'Contact',
    'nav.talk': "Let's Talk",

    // Hero
    'hero.badge': 'Understand AI. Understand Human.',
    'hero.title1': 'Automate the busywork.',
    'hero.title2': 'Reclaim your time.',
    'hero.subtitle': 'If you are tired of repeating the same computer tasks every day, I can help automate them. You explain the bottleneck, I build a working fix.',
    'hero.cta1': 'Tell Me Your Bottleneck',
    'hero.cta2': 'Why I Do This',

    // Stats
    'stats.slots': 'Free Projects / Month',
    'stats.days': 'Days to Deliver',
    'stats.working': 'Tools Shipped',
    'stats.problems': 'Hours Saved',

    // About
    'about.badge': 'Small, but works',
    'about.title': 'Why am I doing this for free?',
    'about.subtitle': 'I am not here to sell buzzwords. I am here to help you remove repetitive work so your time goes back to real tasks.',
    'about.selfTaught.title': 'Small scope, real output',
    'about.selfTaught.desc': 'We pick one painful step first, then build a practical fix you can use right away.',
    'about.listening.title': 'Talk like normal',
    'about.listening.desc': 'No technical language needed. Just explain what drains your day, and we map it together.',
    'about.honesty.title': 'Clear yes / clear no',
    'about.honesty.desc': 'If it is not a good fit for AI, I will say it. If it is, I will give you a concrete plan and timeline.',
    'about.quote': '"Every repetitive task can be handed to a machine. Time is for living."',
    'about.signature': 'Decompose mindset',
    'about.signatureDesc': 'Break down. Get it done. Rest.',

    // Purpose
    'purpose.badge': 'The True Value',
    'purpose.title': 'Drop the busywork. Keep the human work.',
    'purpose.subtitle': 'Simple target: remove one repetitive bottleneck with a working tool or automation flow.',
    'purpose.small.title': 'Time back in your day',
    'purpose.small.desc': 'Less clicking, less copy-paste, fewer manual checks.',
    'purpose.action.title': 'Built for your real workflow',
    'purpose.action.desc': 'No complex system migration. We improve what you already use.',
    'purpose.access.title': 'Clear scope, clear outcome',
    'purpose.access.desc': 'I take 3 projects each month so each one gets proper focus and delivery.',
    'purpose.quote': '"Let machines calculate. Let humans create."',

    // Protocol
    'protocol.badge': 'The Process',
    'protocol.title': 'Simple conversation. Real tool.',
    'protocol.subtitle': 'In 7 days, you will have something that actually runs and saves your time.',
    'protocol.slot1.title': '3 free projects per month',
    'protocol.slot1.desc': 'I cap it at 3 so I can genuinely help without burning out.',
    'protocol.slot2.title': 'Working tool in 7 days',
    'protocol.slot2.desc': 'Not a mockup, not an idea. An actual automation or script you can use by the end of the week.',
    'protocol.slot3.title': 'Mutual growth',
    'protocol.slot3.desc': 'Your problem helps me understand edge cases. My solution gives you free time. Fair trade.',
    'protocol.timeline.title': 'What happens next',
    'protocol.timeline.day1': 'Day 1–2: We talk. I figure out what slows you down.',
    'protocol.timeline.day2': 'Day 3–4: I try to build the core mechanism.',
    'protocol.timeline.day3': 'Day 5–6: We test it together. Fix what breaks.',
    'protocol.timeline.day4': 'Day 7: The tool is yours. Go enjoy your day.',
    'protocol.availability.title': 'Availability',
    'protocol.availability.desc': 'free slots left this month',

    // Services
    'services.badge': 'Common fixes',
    'services.title': 'Some examples of what we can offload to AI.',
    'services.subtitle': 'Websites, internal tools, and simple scripts. If it relies on clear input-output rules, we can probably automate it.',
    'services.disclaimer': 'Do not worry about the technical format. Just grab a free slot if you have a draining task.',
    'services.automation.title': 'The daily loop',
    'services.automation.desc': 'If you do the same 10 clicks every morning, let a script do it for you.',
    'services.pipeline.title': 'Tool bridging',
    'services.pipeline.desc': 'Connect your emails, spreadsheets, and CRM so data moves by itself.',
    'services.integration.title': 'AI summarization',
    'services.integration.desc': 'Stop reading a hundred emails. Let AI read them, categorize them, and give you a bulleted list.',
    'services.tools.title': 'Personal utility tools',
    'services.tools.desc': 'A little web app that solves one specific headache for your team.',
    'services.content.title': 'Drafting assist',
    'services.content.desc': 'Speed up your writing by having AI build out the boring structures.',
    'services.process.title': 'Workflow clarity',
    'services.process.desc': 'Translate your chaotic daily habits into an automated tracking layout.',

    // Packages
    'packages.badge': 'What we build',
    'packages.title': 'Projects I typically take on',
    'packages.subtitle': 'These are just examples. Bring your own headache to the table.',
    'packages.lp.title': 'Landing Page',
    'packages.lp.desc': 'A clean page to present an idea or capture a specific audience.',
    'packages.lp.time': '3–5 days',
    'packages.web.title': 'Personal Site',
    'packages.web.desc': 'A place to exist on the internet with a natural, human-friendly vibe.',
    'packages.web.time': '5–7 days',
    'packages.tool.title': 'Tiny Utility',
    'packages.tool.desc': 'A web tool that does exactly one thing perfectly to avoid manual work.',
    'packages.tool.time': '5–10 days',
    'packages.automation.title': 'Automated Flow',
    'packages.automation.desc': 'A background script handling your least favorite computer task.',
    'packages.automation.time': '7–14 days',
    'packages.note': 'Not sure if your idea fits? Let us chat. It costs nothing to ask.',

    // Free slots
    'free.badge': 'No hidden cost',
    'free.title': '3 free slots per month',
    'free.subtitle': 'I reserve time to do this because real-world practice is better than any course. It keeps me sharp, and it gives you a solution.',
    'free.rule1': 'Scope must be clear and small enough',
    'free.rule2': 'We prioritize tasks that drain you the most heavily',
    'free.rule3': 'I will tell you honestly if I can not do it',

    // CTA
    'cta.title': 'What task is wasting your time right now?',
    'cta.subtitle': 'Describe the task in plain words. I will tell you quickly if AI can solve it and how we can build it.',
    'cta.step1': 'You describe the bottleneck.',
    'cta.step2': 'I map a practical solution.',
    'cta.step3': 'We ship a working version fast.',
    'cta.button': 'Chat with me',

    // Form
    'form.title': 'Let\'s talk',
    'form.name': 'Your name',
    'form.namePlaceholder': 'What should I call you?',
    'form.email': 'Email',
    'form.emailPlaceholder': 'Where do I reply?',
    'form.goal': 'What do you want to achieve?',
    'form.goalPlaceholder': 'Pick one',
    'form.goal.time': 'Get my free time back',
    'form.goal.conversion': 'Need better outcomes',
    'form.goal.errors': 'Stop human mistakes',
    'form.goal.other': 'Something else',
    'form.timeSpent': 'How much time do you waste on this daily?',
    'form.timeSpentPlaceholder': 'Choose range',
    'form.timeSpent.lt1': 'Less than 1 hour',
    'form.timeSpent.1to2': '1–2 hours',
    'form.timeSpent.2to4': '2–4 hours',
    'form.timeSpent.gt4': 'More than 4 hours',
    'form.tools': 'Tools you are using right now',
    'form.toolsPlaceholder': 'Excel, Slack, Notion...?',
    'form.deadline': 'Timeline',
    'form.deadlinePlaceholder': 'When do you need relief from this?',
    'form.budget': 'Budget (If any)',
    'form.budgetPlaceholder': 'I mostly do free slots',
    'form.budget.0': 'I am looking for a free slot',
    'form.budget.1': 'Under $200',
    'form.budget.2': '$200–$500',
    'form.budget.3': '$500–$1,000',
    'form.budget.4': 'Above $1,000',
    'form.freeSlot': 'Applying for a free slot?',
    'form.freeSlot.yes': 'Yes',
    'form.freeSlot.no': 'No',
    'form.friction': 'Tell me the whole story',
    'form.frictionPlaceholder': 'Which exact part of the day makes you sigh? Walk me through what you do.',
    'form.submit': 'Send it to me',
    'form.submitting': 'Sending...',
    'form.success': 'Got it. I will read this and get back to you soon.',
    'form.error': 'Something went wrong. Let us try again.',

    // Footer
    'footer.tagline': 'Automate the busywork. Reclaim your time.',
  },
  vi: {
    // Header
    'nav.about': 'Mình là ai',
    'nav.purpose': 'Cái lợi chung',
    'nav.protocol': 'Cách làm',
    'nav.approach': 'Tiếp cận',
    'nav.contact': 'Liên hệ',
    'nav.talk': 'Thử nói chuyện',

    // Hero
    'hero.badge': 'Hiểu AI. Hiểu Con Người.',
    'hero.title1': 'Để máy móc ôm việc vặt.',
    'hero.title2': 'Lấy lại thời gian rảnh cho bạn.',
    'hero.subtitle': 'Nếu bạn đang mệt vì các thao tác lặp lại trên máy tính mỗi ngày, mình có thể giúp tự động hoá. Bạn nêu điểm nghẽn, mình làm ra bản chạy được.',
    'hero.cta1': 'Kể mình điểm kẹt của bạn',
    'hero.cta2': 'Vì sao mình làm việc này',

    // Stats
    'stats.slots': 'Dự án tặng / tháng',
    'stats.days': 'Ngày là có bản chạy thử',
    'stats.working': 'Tool đã làm',
    'stats.problems': 'Giờ rảnh đã trả lại',

    // About
    'about.badge': 'Nhỏ thôi, nhưng chạy được',
    'about.title': 'Tại sao mình làm chuyện này miễn phí?',
    'about.subtitle': 'Mình không bán buzzword. Mình giúp bạn bỏ bớt việc lặp lại để có thời gian làm việc quan trọng hơn.',
    'about.selfTaught.title': 'Làm nhỏ nhưng ra kết quả',
    'about.selfTaught.desc': 'Mình chọn đúng chỗ bạn mệt nhất, rồi làm giải pháp gọn, chạy được ngay.',
    'about.listening.title': 'Cứ nói chuyện bình thường',
    'about.listening.desc': 'Không cần thuật ngữ kỹ thuật. Bạn kể việc gì làm bạn mệt, mình cùng map lại.',
    'about.honesty.title': 'Rõ ràng từ đầu',
    'about.honesty.desc': 'Không phù hợp AI thì mình nói thẳng. Phù hợp thì mình đưa lộ trình cụ thể và timeline rõ.',
    'about.quote': '"Việc gì lặp lại, hãy ném cho máy tính. Thanh xuân là để trải nghiệm."',
    'about.signature': 'Tư duy Decompose',
    'about.signatureDesc': 'Chia nhỏ rắc rối. Sửa nó. Và nghỉ ngơi.',

    // Purpose
    'purpose.badge': 'Giá trị bạn nhận được',
    'purpose.title': 'Bỏ việc vặt đi. Làm việc người thôi.',
    'purpose.subtitle': 'Mục tiêu rất rõ: gỡ một điểm nghẽn lặp lại bằng tool hoặc automation chạy được.',
    'purpose.small.title': 'Lấy lại thời gian mỗi ngày',
    'purpose.small.desc': 'Bớt click tay, bớt copy-paste, bớt kiểm tra thủ công.',
    'purpose.action.title': 'Vừa với cách bạn đang làm việc',
    'purpose.action.desc': 'Không cần đổi cả hệ thống. Mình cải thiện ngay trên workflow bạn đang dùng.',
    'purpose.access.title': 'Phạm vi rõ, kết quả rõ',
    'purpose.access.desc': 'Mỗi tháng mình nhận 3 dự án để làm kỹ và bàn giao tử tế.',
    'purpose.quote': '"Để máy móc tính toán. Để con người sáng tạo."',

    // Protocol
    'protocol.badge': 'Quy trình',
    'protocol.title': 'Trò chuyện xong là có tool rảnh tay.',
    'protocol.subtitle': 'Trong vòng 7 ngày, bạn sẽ có thứ gì đó dùng được thật sự để gánh bớt việc nhàm chán.',
    'protocol.slot1.title': 'Tặng 3 dự án mỗi tháng',
    'protocol.slot1.desc': 'Giới hạn số lượng vì sức người có hạn, và mình muốn làm món quà mang lại giá trị trọn vẹn.',
    'protocol.slot2.title': 'Có công cụ chạy sau 7 ngày',
    'protocol.slot2.desc': 'Không hứa một ý tưởng. Hứa một công cụ cầm trong tay bấm chạy được ở cuối tuần.',
    'protocol.slot3.title': 'Hai bên cùng tiến',
    'protocol.slot3.desc': 'Hiểu được rắc rối của bạn giúp mình rành nghề hơn. Tool xong bạn có thêm thời gian. Một cuộc trao đổi đẹp.',
    'protocol.timeline.title': 'Điều gì diễn ra tiếp theo',
    'protocol.timeline.day1': 'Ngày 1–2: Tụi mình nói chuyện. Bắt bệnh xem bạn mệt mỏi ở đâu.',
    'protocol.timeline.day2': 'Ngày 3–4: Mình ráp bộ khung xử lý lỗi đau đó.',
    'protocol.timeline.day3': 'Ngày 5–6: Tụi mình cùng chạy thử và tinh chỉnh.',
    'protocol.timeline.day4': 'Ngày 7: Của bạn tất. Đi uống bia thôi.',
    'protocol.availability.title': 'Tình trạng tháng này',
    'protocol.availability.desc': 'vị trí miễn phí còn trống',

    // Services
    'services.badge': 'Hình hài giải pháp',
    'services.title': 'Những thứ tụi mình có thể ném lại cho máy tính.',
    'services.subtitle': 'Miễn là một việc có luật rõ ràng, đầu vào và đầu ra chốt được, thì dẫu nó nằm ở web, excel hay app, mình đều tự động hóa được.',
    'services.disclaimer': 'Đừng bận tâm khái niệm dân IT. Cứ biết là bạn đang mệt thì tìm mình xin slot.',
    'services.automation.title': 'Cắt đứt vòng lặp hàng ngày',
    'services.automation.desc': 'Mưu sinh bằng 15 cái click chuột y chang nhau mỗi sáng? Để script click cho.',
    'services.pipeline.title': 'Bắc cầu dữ liệu',
    'services.pipeline.desc': 'Nối mail, bảng tính và quản lý dự án lại để số tự nhảy, tay người khỏi phải chuyển.',
    'services.integration.title': 'Đọc thư mướn bằng AI',
    'services.integration.desc': 'Để AI đọc 150 cái email dài dòng và túm lại thành 3 cái đầu dòng bạn cần làm trong hôm nay.',
    'services.tools.title': 'Tool nhỏ giải sầu',
    'services.tools.desc': 'Một cục app web bé xíu giải quyết một cục cáu kỉnh vĩ đại của team bạn.',
    'services.content.title': 'Trợ lý dàn bài',
    'services.content.desc': 'Dùng AI dựng kịch bản nháp nhanh để bạn dồn sức vào chỗ sáng tạo bay bổng.',
    'services.process.title': 'Nắn lại thói quen',
    'services.process.desc': 'Gỡ cục rối ren công việc hàng ngày vào một khung bảng check-list nhìn phát là hiểu.',

    // Packages
    'packages.badge': 'Các ví dụ',
    'packages.title': 'Mình thường nhận làm giúp thứ gì',
    'packages.subtitle': 'Chỉ là để bạn dễ tham khảo. Nếu của bạn là thứ khác, cứ kể.',
    'packages.lp.title': 'Trang hạ cánh (Landing Page)',
    'packages.lp.desc': 'Giúp ý tưởng/dự án của bạn xuất hiện đàng hoàng mạch lạc trên in-tờ-nét.',
    'packages.lp.time': '3–5 ngày',
    'packages.web.title': 'Nhà riêng trực tuyến',
    'packages.web.desc': 'Một website nho nhỏ mang Vibe cá nhân tự nhiên, đời thường của bạn.',
    'packages.web.time': '5–7 ngày',
    'packages.tool.title': 'Chiếc Tool cứu rỗi',
    'packages.tool.desc': 'Nhỏ xíu thôi nhưng xử lý gọn cái bước bạn ghét làm nhất.',
    'packages.tool.time': '5–10 ngày',
    'packages.automation.title': 'Luồng việc tàng hình',
    'packages.automation.desc': 'Một kịch bản chạy ẩn gom thông tin và xử lý giúp mà bạn không cần coi chừng.',
    'packages.automation.time': '7–14 ngày',
    'packages.note': 'Cứ nhắn tụi mình bàn. Không mất cắc bạc nào mà biết đâu sáng ra vấn đề.',

    // Free slots
    'free.badge': 'Không chi phí ẩn',
    'free.title': '3 cơ hội gỡ rối miễn phí mỗi tháng',
    'free.subtitle': 'Mình nhận làm tặng vì giải quyết va vấp ngoài đời thực giúp tay nghề của mình cứng hơn chục cái khóa học. Nó giúp mình, thì nó tặng bạn kết quả.',
    'free.rule1': 'Làm nhỏ thôi, tập trung đúng 1 chỗ đau',
    'free.rule2': 'Ưu tiên những ca "trời ơi nó tốn thì giờ dã man"',
    'free.rule3': 'Nếu kỹ thuật không làm được mình sẽ từ chối thẳng thắn thà mất lòng',

    // CTA
    'cta.title': 'Bạn đang mắc kẹt ở tác vụ nào mỗi ngày?',
    'cta.subtitle': 'Bạn chỉ cần kể rõ việc đó. Mình sẽ nói nhanh AI có xử lý được không và hướng làm phù hợp.',
    'cta.step1': 'Bạn mô tả điểm nghẽn.',
    'cta.step2': 'Mình map giải pháp thực tế.',
    'cta.step3': 'Ship nhanh bản chạy được.',
    'cta.button': 'Cùng gỡ rối (Miễn phí nhé)',

    // Form
    'form.title': 'Tụi mình trò chuyện',
    'form.name': 'Bạn tên là gì?',
    'form.namePlaceholder': 'Xưng hô sao cho tiện nhỉ?',
    'form.email': 'Email',
    'form.emailPlaceholder': 'Chỗ nào gửi kết quả cho bạn báo hỉ?',
    'form.goal': 'Cái kết bạn mong muốn nhất?',
    'form.goalPlaceholder': 'Chọn cái cần nhất',
    'form.goal.time': 'Đòi lại thời gian rảnh',
    'form.goal.conversion': 'Khách ưng bụng hơn',
    'form.goal.errors': 'Bớt sai do bấm nhầm',
    'form.goal.other': 'Kỳ vọng khác',
    'form.timeSpent': 'Mỗi ngày tốn bao lâu nhai đi nhai lại cái thứ này?',
    'form.timeSpentPlaceholder': 'Khoảng khoảng',
    'form.timeSpent.lt1': 'Một lát, dưới 1 tiếng',
    'form.timeSpent.1to2': '1–2 tiếng lận',
    'form.timeSpent.2to4': '2–4 tiếng bay mất',
    'form.timeSpent.gt4': 'Thanh xuân trôi qua ở đây',
    'form.tools': 'Dạo này đang phải xài các công cụ gì?',
    'form.toolsPlaceholder': 'Lương tháng Excel, Slack vất vả đồ...',
    'form.deadline': 'Khi nào thì bạn không nhịn nổi nữa?',
    'form.deadlinePlaceholder': 'Có cần gấp rút không?',
    'form.budget': 'Kinh phí (Nếu có)',
    'form.budgetPlaceholder': 'Thực ra mình khoái cho không',
    'form.budget.0': 'Mình tới xin slot miễn phí hì hì',
    'form.budget.1': 'Dưới 5 củ ($200)',
    'form.budget.2': '$200–$500',
    'form.budget.3': '$500–$1,000',
    'form.budget.4': 'Trên $1,000 lun',
    'form.freeSlot': 'Xác nhận là bạn qua hốt slot free?',
    'form.freeSlot.yes': 'Quá đúng',
    'form.freeSlot.no': 'Mình có hầu bao riêng',
    'form.friction': 'Nào, giờ vào phần kể lể uất ức',
    'form.frictionPlaceholder': 'Mỗi ngày mở máy tính lên vào mục A, sang mục B, bạn tốn chỗ nào dông dài nhất? Kết quả sai lè ra làm sao? Kể hết.',
    'form.submit': 'Nhắn cho mình đi',
    'form.submitting': 'Đang gửi chim xách thư...',
    'form.success': 'Hàng đã đến. Mình đọc kỹ rồi rep sớm nhất nha.',
    'form.error': 'Có trục trặc đường truyền. Ai nhắn lại giúp một cái.',

    // Footer
    'footer.tagline': 'Để máy móc ôm việc vặt. Lấy lại thời gian rảnh cho bạn.',
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
