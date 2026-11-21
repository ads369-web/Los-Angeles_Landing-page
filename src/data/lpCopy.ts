export type Language = "en" | "ja" | "zh" | "es";

export interface FaqItem {
  q: string;
  a: string;
}

export interface LocalizedContent {
  langLabel: string;
  seo: {
    title: string;
    description: string;
    ogLocale: string;
  };
  topBar: string;
  topBarHours: string;
  nav: {
    skipToContent: string;
    centerName: string;
    centerTagline: string;
    items: {
      num: string;
      href: string;
      label: string;
      enSub: string;
    }[];
    cta: string;
    menuOpen: string;
    menuClose: string;
    menuNavLabel: string;
    languageLabel: string;
  };
  hero: {
    badge: string;
    headlineLine1: string;
    headlineLine2: string;
    subheadline: string;
    primaryCta: string;
    secondaryCta: string;
    facts: string;
    scrollCue: string;
  };
  dilemma: {
    eyebrow: string;
    title: string;
    p1: string;
    p2: string;
    points: {
      label: string;
      text: string;
    }[];
    caption: string;
  };
  principleSection: {
    eyebrow: string;
    title: string;
    subtitle: string;
    diagramAlt: string;
    diagramCaption: string;
    stages: {
      step: string;
      title: string;
      role: string;
      desc: string;
    }[];
  };
  practice: {
    eyebrow: string;
    title: string;
    p1: string;
    p2: string;
    noteTitle: string;
    noteBody: string;
    sessionPhotoAlt: string;
    diagramAlt: string;
    diagramCaption: string;
    pillars: {
      title: string;
      desc: string;
    }[];
  };
  commitments: {
    eyebrow: string;
    title: string;
    subtitle: string;
    cards: {
      num: string;
      title: string;
      subtitle: string;
      body: string;
    }[];
  };
  journey: {
    eyebrow: string;
    title: string;
    subtitle: string;
    steps: {
      stepNum: string;
      duration: string;
      title: string;
      shortDesc: string;
      fullDesc: string;
      reassurance: string;
    }[];
  };
  hostMessage: {
    eyebrow: string;
    title: string;
    quote: string;
    body1: string;
    body2: string;
    body3: string;
    signatureName: string;
    signatureRole: string;
    cta: string;
  };
  access: {
    eyebrow: string;
    title: string;
    rows: {
      label: string;
      value: string;
      sub?: string;
    }[];
    bannerTitle: string;
    bannerDesc: string;
    bannerCta: string;
  };
  booking: {
    eyebrow: string;
    title: string;
    subtitle: string;
    phoneNoteTitle: string;
    phoneNoteBody: string;
    form: {
      fullName: string;
      fullNamePlaceholder: string;
      email: string;
      emailPlaceholder: string;
      phone: string;
      phonePlaceholder: string;
      preferredDate: string;
      preferredTime: string;
      timeOptions: string[];
      preferredLanguage: string;
      languageOptions: { value: "English" | "Japanese" | "Chinese" | "Spanish"; label: string }[];
      languageHint: string;
      practitionerPreference: string;
      practitionerOptions: {
        value: "No preference" | "Female practitioner" | "Male practitioner";
        label: string;
      }[];
      notes: string;
      notesPlaceholder: string;
      smsConsentPrefix: string;
      smsConsentPrivacyLink: string;
      smsConsentSuffix: string;
      submit: string;
      submitting: string;
      validationNotice: string;
      errorFallback: string;
      medicalNotice: string;
      successTitle: string;
      successBody: string;
      successReset: string;
    };
  };
  faq: {
    eyebrow: string;
    title: string;
    subtitle: string;
    items: FaqItem[];
  };
  closing: {
    eyebrow: string;
    title: string;
    subtitle: string;
    cta: string;
  };
  footer: {
    centerDesc: string;
    navHeading: string;
    accessHeading: string;
    hoursSummary: string;
    phoneLabel: string;
    phoneLangNote: string;
    disclaimerTitle: string;
    disclaimerBody: string;
    privacyLink: string;
    accessibilityLink: string;
    copyright: string;
  };
}

export const LP_COPY: Record<Language, LocalizedContent> = {
  en: {
    langLabel: "English",
    seo: {
      title: "Los Angeles Divine Light Center | Monterey Park Spiritual Sanctuary",
      description:
        "World Divine Light — Los Angeles Spiritual Center in Monterey Park, CA. Seated Art of Divine Light (Okiyome) sessions in English, Japanese, or by advance request in Standard Chinese and Spanish. Tue–Sat 10:00–18:00, Sun 9:00–16:00 (Closed Mon). Donation-based.",
      ogLocale: "en_US",
    },
    topBar: "US 501(c)(3) Nonprofit Spiritual Center · Monterey Park, CA · Donation-Based",
    topBarHours: "Tue–Sat 10:00–18:00 | Sun 9:00–16:00 (Closed Mon)",
    nav: {
      skipToContent: "Skip to main content",
      centerName: "Los Angeles Center",
      centerTagline: "WORLD DIVINE LIGHT · MONTEREY PARK",
      items: [
        { num: "01", href: "#dilemma", label: "Why Quiet Rest", enSub: "DILEMMA" },
        { num: "02", href: "#practice", label: "The Session", enSub: "OKIYOME" },
        { num: "03", href: "#principles", label: "Commitments", enSub: "TRANSPARENCY" },
        { num: "04", href: "#journey", label: "First Visit", enSub: "JOURNEY" },
        { num: "05", href: "#access", label: "Location & Hours", enSub: "ACCESS" },
        { num: "06", href: "#faq", label: "Common Questions", enSub: "FAQ" },
      ],
      cta: "Reserve a Visit",
      menuOpen: "Open navigation menu",
      menuClose: "Close navigation menu",
      menuNavLabel: "Mobile Navigation",
      languageLabel: "Language",
    },
    hero: {
      badge: "World Divine Light · Los Angeles Spiritual Center",
      headlineLine1: "Step out of the rush.",
      headlineLine2: "Return to your quiet center.",
      subheadline:
        "A serene spiritual sanctuary in Monterey Park, California. Experience the Art of Divine Light—a calm seated session radiating pure love from God to help lighten heavy thoughts and restore inner stillness.",
      primaryCta: "Discover the Principle",
      secondaryCta: "Reserve a Session",
      facts: "Tue–Sat 10:00–18:00 · Sun 9:00–16:00 (Closed Mon) · 43 Free Plaza Parking Stalls · Donation-Based",
      scrollCue: "SCROLL",
    },
    dilemma: {
      eyebrow: "01 / Why Quiet Rest Matters",
      title: "Even when your body stops moving, your mind rarely puts things down.",
      p1: "Long commutes on the 10 freeway, constant notifications, and carrying responsibilities for everyone around you leave an unseen heaviness that an ordinary weekend sleep rarely washes away.",
      p2: "Instead of adding another demanding self-improvement routine, our sanctuary offers a quiet place simply to sit in a chair, breathe slowly, and receive gentle spiritual Light.",
      points: [
        {
          label: "Mental Noise",
          text: "Thoughts keep spinning late at night even when you feel physically exhausted.",
        },
        {
          label: "Carrying Too Much",
          text: "Worry about family, work, or direction settles quietly into the shoulders and chest.",
        },
        {
          label: "A Calm Pause",
          text: "No background chatter, no hard sell—just unhurried stillness and warm hospitality.",
        },
      ],
      caption: "Monterey Park, Los Angeles — a quiet sanctuary above the palm trees.",
    },
    principleSection: {
      eyebrow: "The Fundamental Principle",
      title: "Spirit Primary · Mind Secondary · Body Subordinate",
      subtitle:
        "Much like a clear river flows from its mountain headwaters down to the valley floor, our core teaching looks at how our unseen spiritual state shapes our thoughts, feelings, and everyday vitality.",
      diagramAlt:
        "Watercolor diagram illustrating Spirit Primary upstream, Mind Secondary midstream, and Body Subordinate downstream.",
      diagramCaption:
        "Upstream clarity nourishes midstream peace of mind, which naturally supports downstream physical lightness.",
      stages: [
        {
          step: "Upstream · 01",
          title: "Spirit Primary",
          role: "Rei-Shu (霊主)",
          desc: "Our spiritual core is the source. Receiving pure Divine Light helps clear accumulated spiritual cloudiness at the fountainhead.",
        },
        {
          step: "Midstream · 02",
          title: "Mind Secondary",
          role: "Shin-Ju (心従)",
          desc: "As the spiritual root clears, anxious inner chatter softens and space opens for steadier perspective and gratitude.",
        },
        {
          step: "Downstream · 03",
          title: "Body Subordinate",
          role: "Tai-Zoku (体属)",
          desc: "Rather than chasing symptoms in isolation, tending upstream harmony helps visitors leave feeling calmer and lighter overall.",
        },
      ],
    },
    practice: {
      eyebrow: "02 / The Art of Divine Light (Okiyome)",
      title: "Seated stillness with an open palm—and an honest, nationwide practice.",
      p1: "During an Okiyome session, you sit comfortably in an upholstered chair wearing everyday clothes and socks. A practitioner holds an open palm roughly 1 foot (30 cm) away to channel Divine Light—never massage, manipulation, or medical treatment.",
      p2: "In keeping with all World Divine Light centers nationwide, the practitioner performs a brief, gentle acupressure-style fingertip check on common tension points (such as the shoulders, neck, or forehead) before and after radiating Light, so you can personally feel how tightness softens.",
      noteTitle: "Gentle Fingertip Check & Same-Gender Requests",
      noteBody:
        "While Light itself radiates at a ~30 cm distance, this short fingertip touch is part of our standard pre/post check across Japan and the U.S. Same-gender practitioner requests are happily honored—simply choose your preference below.",
      sessionPhotoAlt: "A visitor seated peacefully receiving an Okiyome Divine Light session.",
      diagramAlt:
        "Illustration showing a seated visitor in socks receiving Divine Light from roughly 30 cm away, with an inset showing the brief pre- and post-session gentle fingertip check.",
      diagramCaption:
        "Seated comfortably in a chair; Divine Light at ~1 ft (30 cm) plus brief pre/post fingertip tension check.",
      pillars: [
        {
          title: "Donation-Based Offerings",
          desc: "There is no ticket price or session fee. Visitors give voluntary gratitude offerings to God (such as Okiyome Orei) from the heart.",
        },
        {
          title: "Before & After Check",
          desc: "A quick, gentle acupressure-style fingertip check before and after Light helps you compare physical tension directly.",
        },
        {
          title: "Your Pace, Same-Gender Option",
          desc: "Ask questions freely, choose a female or male practitioner if preferred, and stay only as long as feels comfortable.",
        },
      ],
    },
    commitments: {
      eyebrow: "03 / Clear & Honest Commitments",
      title: "What you can expect—stated plainly.",
      subtitle:
        "Trust begins with complete transparency about how donations, seminars, product policies, and follow-up schedules actually work.",
      cards: [
        {
          num: "01",
          title: "Voluntary Donation System",
          subtitle: "GRATITUDE OFFERINGS · NOT PRICED TICKETS",
          body: "Individual sessions do not carry a fixed price tag; visitors are invited to offer heartfelt gratitude to God (Okiyome Orei / ご奉納) at their own discretion. Should you later choose to learn to channel Light by joining our optional 3-day Primary Seminar, there is a $160 seminar offering.",
        },
        {
          num: "02",
          title: "Zero Merchandise or Sales Calls",
          subtitle: "NO PRODUCTS SOLD · NO PRESSURE",
          body: "We never sell supplements, books as requirements, crystals, or health products, and we do not make follow-up sales phone calls or pressure anyone to join. Every visit stays strictly spiritual and respectful.",
        },
        {
          num: "03",
          title: "Weekly Schedule Only (Reply STOP)",
          subtitle: "501(c)(3) NONPROFIT · STAY INFORMED BY CHOICE",
          body: "Rather than sales outreach, our center occasionally shares weekly dojo schedule notices and announcements. If you ever prefer not to receive updates, simply let us know or reply STOP and we stop right away.",
        },
      ],
    },
    journey: {
      eyebrow: "04 / Your First 55 Minutes",
      title: "What happens when you walk through Suite #378.",
      subtitle:
        "No special clothing or prior knowledge needed. Volunteer host Kevin greets English and Japanese speakers daily, and Chinese or Spanish visits are arranged with advance notice.",
      steps: [
        {
          stepNum: "01",
          duration: "MIN 00–10",
          title: "Warm Welcome & Conversation",
          shortDesc: "Arrive, sign the guestbook, and speak comfortably in a chair.",
          fullDesc:
            "Step off the 3rd-floor elevator into a calm lounge. Over a glass of water or warm tea, we listen to what brought you in, answer any questions plainly, and confirm your language or practitioner preference.",
          reassurance: "Phone & walk-in line (+1 626-861-5069) is answered in English & Japanese by Kevin; request Chinese or Spanish via the form ahead of time.",
        },
        {
          stepNum: "02",
          duration: "MIN 10–45",
          title: "Brief Tension Check & Divine Light",
          shortDesc: "Pre-check on tight spots, quiet ~30 cm Light session, and post-check.",
          fullDesc:
            "Seated comfortably in an armchair, the practitioner checks gentle fingertip tender spots around the neck, shoulders, and back, channels Divine Light at ~1 foot away for about 30 minutes, and re-checks afterward so you can sense any shift.",
          reassurance: "Remain fully clothed in everyday attire; female or male practitioner available on request.",
        },
        {
          stepNum: "03",
          duration: "MIN 45–55",
          title: "Quiet Pause & Voluntary Offering",
          shortDesc: "Take a breath, share how you feel, and depart unhurried.",
          fullDesc:
            "Notice how your mind and shoulders feel after the session. Voluntary gratitude offerings (Okiyome Orei) are placed quietly in the offering box—no receipts for commercial sales, no pressure for next commitments.",
          reassurance: "Optional weekly dojo schedule updates only if you choose; reply STOP anytime.",
        },
      ],
    },
    hostMessage: {
      eyebrow: "A Note from Our Center",
      title: "A quiet corner of Los Angeles where you don’t have to perform.",
      quote: "“Even thirty quiet minutes away from the noise can remind you what stillness feels like.”",
      body1:
        "Whether you are curious about Japanese spiritual traditions, feeling weighed down by busy weeks in Los Angeles, or simply looking for a calm place to sit and reflect, you are always welcome here.",
      body2:
        "My name is Kevin, and I help coordinate visits and answer our center phone in English and Japanese. If you or your family prefer Chinese or Spanish, simply submit the form below ahead of your visit so I can arrange one of our multilingual members to host you.",
      body3:
        "Come once out of curiosity, ask hard questions honestly, and take whatever peace feels right for your life.",
      signatureName: "Kevin",
      signatureRole: "Volunteer Coordinator · Los Angeles Center (EN / JA)",
      cta: "Request Your Visit Time",
    },
    access: {
      eyebrow: "05 / Location & Practical Details",
      title: "Easy to reach in Monterey Park.",
      rows: [
        {
          label: "Address",
          value: "809 S Atlantic Blvd, Suite #378, Monterey Park, CA 91754",
          sub: "3rd Floor · Elevator access directly from lobby",
        },
        {
          label: "Opening Hours",
          value: "Tue–Sat: 10:00 AM – 6:00 PM · Sun: 9:00 AM – 4:00 PM (Closed Mondays)",
          sub: "By reservation so a host is ready for your preferred language",
        },
        {
          label: "Parking",
          value: "43 Free Plaza Parking Stalls On-Site",
          sub: "Direct surface lot entrance off S Atlantic Blvd",
        },
        {
          label: "Phone & Languages",
          value: "+1 (626) 861-5069 · losangeles@worlddivinelight.org",
          sub: "Phone answered in English & Japanese by Kevin. Chinese & Spanish welcome with advance request via form.",
        },
      ],
      bannerTitle: "Prefer to schedule in Chinese or Spanish?",
      bannerDesc:
        "Please submit the reservation form below with your language selection so we can ensure a fluent member is ready to greet you.",
      bannerCta: "Go to Reservation Form",
    },
    booking: {
      eyebrow: "Direct Center Reservation",
      title: "Request an Okiyome Visit",
      subtitle:
        "Reserve directly on this page—no external ticketing sites. Tell us your preferred day, time, and language so our team can welcome you smoothly.",
      phoneNoteTitle: "Language & Phone Notice",
      phoneNoteBody:
        "Voice calls to +1 (626) 861-5069 are answered in English and Japanese by volunteer host Kevin. For Chinese (中文) or Spanish (Español), please submit this form at least 1–2 days in advance so we can schedule a bilingual member for your session.",
      form: {
        fullName: "Full Name",
        fullNamePlaceholder: "Your name",
        email: "Email Address",
        emailPlaceholder: "you@example.com",
        phone: "Phone Number",
        phonePlaceholder: "+1 (626) 555-0199",
        preferredDate: "Preferred Date",
        preferredTime: "Preferred Time Window",
        timeOptions: [
          "Morning (10:00 AM – 12:00 PM · Sun from 9:00 AM)",
          "Midday (12:00 PM – 2:30 PM)",
          "Afternoon (2:30 PM – 4:00 PM)",
          "Late Afternoon (Tue–Sat 4:00 PM – 6:00 PM)",
        ],
        preferredLanguage: "Preferred Session Language",
        languageOptions: [
          { value: "English", label: "English" },
          { value: "Japanese", label: "Japanese (日本語)" },
          { value: "Chinese", label: "Chinese (Standard Chinese · Advance Request Required)" },
          { value: "Spanish", label: "Spanish (Español · Advance Request Required)" },
        ],
        languageHint:
          "Phone line (+1 626-861-5069) is handled in English & Japanese. Standard Chinese and Spanish hosting is happily arranged when requested in advance here.",
        practitionerPreference: "Practitioner Preference",
        practitionerOptions: [
          { value: "No preference", label: "No preference" },
          { value: "Female practitioner", label: "Female practitioner" },
          { value: "Male practitioner", label: "Male practitioner" },
        ],
        notes: "Optional Questions or Accessibility Notes",
        notesPlaceholder:
          "Let us know if you need Standard Chinese or Spanish support, wheelchair access, or have any questions.",
        smsConsentPrefix:
          "I agree to receive SMS appointment confirmations and optional weekly dojo schedule updates from World Divine Light LA. Reply STOP anytime to opt out. View our ",
        smsConsentPrivacyLink: "Privacy Policy",
        smsConsentSuffix: ".",
        submit: "Send Visit Request",
        submitting: "Sending Request...",
        validationNotice: "Please review the highlighted fields above before submitting.",
        errorFallback:
          "Unable to send right now. Please email losangeles@worlddivinelight.org or call +1 (626) 861-5069 (EN/JA).",
        medicalNotice:
          "California BPC § 2063 Disclosure: World Divine Light is a religious spiritual practice, not licensed medical care, diagnosis, or psychotherapy. Please consult a physician for medical concerns.",
        successTitle: "Request Received",
        successBody:
          "Thank you. Volunteer coordinator Kevin will confirm your visit time shortly (Chinese/Spanish requests are coordinated with a bilingual member and confirmed by email/text).",
        successReset: "Submit Another Request",
      },
    },
    faq: {
      eyebrow: "06 / Frequently Asked Questions",
      title: "Clear answers before your first visit.",
      subtitle: "Twelve honest answers covering spiritual practice, physical touch, offerings, language support, and accessibility.",
      items: [
        {
          q: "What is the Art of Divine Light (Okiyome)?",
          a: "It is a spiritual practice in which a practitioner raises an open palm to channel Divine Light—pure love from God—toward another person while both sit quietly in chairs. It aims to cleanse the spiritual root behind daily heaviness, rooted in the principle Spirit Primary, Mind Secondary, Body Subordinate.",
        },
        {
          q: "Is there any physical touch during a session?",
          a: "While Divine Light itself is channeled from about 1 foot (30 cm) away without massage, standard practice across all World Divine Light centers nationwide includes a brief, gentle acupressure-style fingertip check on common tension points (shoulders, neck, forehead, back) before and after Light so visitors can compare how stiffness shifts.",
        },
        {
          q: "Can I request a female or male practitioner?",
          a: "Yes. You can choose Female practitioner, Male practitioner, or No preference directly in the reservation form on this page.",
        },
        {
          q: "How do offerings and donations work?",
          a: "Sessions do not have a commercial price or admission fee. World Divine Light operates on a voluntary donation system where visitors offer gratitude to God (such as Okiyome Orei) from the heart. We never sell wellness products or merchandise.",
        },
        {
          q: "What if I want to learn to radiate Divine Light myself?",
          a: "There is zero obligation to join. For visitors who later choose to attend the 3-day Primary Seminar (初級研修会) to receive an Oshikumei and practice giving Light, a $160 seminar offering is requested.",
        },
        {
          q: "Will I get sales calls or pressured to convert after visiting?",
          a: "No. We do not make unsolicited sales calls or pressure anyone to attend seminars. We only send weekly dojo schedule updates if you opt in, and you can stop receiving them at any moment by replying STOP or asking us.",
        },
        {
          q: "What languages are supported on the phone and at the Center?",
          a: "Volunteer coordinator Kevin handles phone calls (+1 626-861-5069) and regular walk-in greeting in English and Japanese. Chinese (中文) and Spanish (Español) support is gladly arranged when requested in advance through the reservation form.",
        },
        {
          q: "Is this a substitute for medical or mental health treatment?",
          a: "No. Under California Business & Professions Code § 2063, Okiyome is strictly a religious spiritual practice, not a medical service, diagnosis, chiropractic care, or psychotherapy. Please continue seeing your licensed healthcare providers.",
        },
        {
          q: "Do I need to belong to a specific religion or faith?",
          a: "Not at all. People of all backgrounds—Christian, Buddhist, secular, spiritual-but-not-religious, or simply curious—visit peacefully without any requirement to change their personal beliefs.",
        },
        {
          q: "How long does a first visit take, and what should I wear?",
          a: "Plan for about 50–60 minutes, including warm greeting, the brief before/after fingertip tension check, and around 30 minutes of seated Light. Casual everyday clothing and socks (rather than bare feet inside the prayer room) are ideal.",
        },
        {
          q: "Is parking available, and is the Suite wheelchair accessible?",
          a: "Yes. Our building at 809 S Atlantic Blvd has 43 free on-site plaza parking stalls and an elevator directly to Suite #378 on the 3rd floor. Sessions take place seated comfortably in chairs.",
        },
        {
          q: "How do I change, cancel, or opt out of weekly notices?",
          a: "Reply STOP to any SMS notice, email losangeles@worlddivinelight.org, or call +1 (626) 861-5069 (EN/JA) anytime.",
        },
      ],
    },
    closing: {
      eyebrow: "Ready When You Are",
      title: "Make space for stillness this week.",
      subtitle: "Monterey Park, CA · 501(c)(3) Nonprofit · Tue–Sat 10:00–18:00 · Sun 9:00–16:00 (Closed Mon)",
      cta: "Reserve Your Session",
    },
    footer: {
      centerDesc:
        "A US 501(c)(3) nonprofit spiritual center offering the Art of Divine Light (Okiyome) in a peaceful Monterey Park sanctuary.",
      navHeading: "Navigation",
      accessHeading: "Sanctuary & Contact",
      hoursSummary: "Tue–Sat 10:00 AM – 6:00 PM · Sun 9:00 AM – 4:00 PM (Closed Mon)",
      phoneLabel: "+1 (626) 861-5069",
      phoneLangNote: "English & Japanese answered by Kevin (Chinese/Spanish by advance request)",
      disclaimerTitle: "Legal & Medical Notice (CA BPC § 2063 / SB 577)",
      disclaimerBody:
        "The Art of Divine Light (Okiyome) is a religious spiritual practice offered strictly by a 501(c)(3) nonprofit organization on a voluntary donation basis. It is not medical diagnosis, treatment, therapy, or massage. Please seek licensed medical care for health conditions.",
      privacyLink: "Privacy Policy (CalOPPA)",
      accessibilityLink: "Accessibility (WCAG 2.1 AA)",
      copyright: "© 2026 World Divine Light — Los Angeles Spiritual Center. All rights reserved.",
    },
  },

  ja: {
    langLabel: "日本語",
    seo: {
      title: "世界真光文明教団 ロサンゼルス道場 | カリフォルニア州モントレーパーク",
      description:
        "ロサンゼルス・モントレーパークの穏やかな霊性サンクチュアリ。椅子に座ったまま「神の光の業（お浄め）」を体験いただけます（火〜土 10:00–18:00・日 9:00–16:00／月曜休館・ドネーション制・駐車場43台無料）。",
      ogLocale: "ja_JP",
    },
    topBar: "米国政府公認 501(c)(3) 非営利スピリチュアルセンター ｜ ロサンゼルス・モントレーパーク",
    topBarHours: "火〜土 10:00–18:00 ｜ 日 9:00–16:00（月曜休館）",
    nav: {
      skipToContent: "本文へスキップ",
      centerName: "ロサンゼルス道場",
      centerTagline: "WORLD DIVINE LIGHT · MONTEREY PARK",
      items: [
        { num: "01", href: "#dilemma", label: "静寂の時間", enSub: "DILEMMA" },
        { num: "02", href: "#practice", label: "お浄めの流れ", enSub: "OKIYOME" },
        { num: "03", href: "#principles", label: "お約束と透明性", enSub: "TRANSPARENCY" },
        { num: "04", href: "#journey", label: "当日の流れ", enSub: "JOURNEY" },
        { num: "05", href: "#access", label: "アクセス", enSub: "ACCESS" },
        { num: "06", href: "#faq", label: "よくあるご質問", enSub: "FAQ" },
      ],
      cta: "体験予約をする",
      menuOpen: "メニューを開く",
      menuClose: "メニューを閉じる",
      menuNavLabel: "モバイルメニュー",
      languageLabel: "言語切り替え",
    },
    hero: {
      badge: "世界真光文明教団 · ロサンゼルス道場",
      headlineLine1: "日々の喧騒を離れ、",
      headlineLine2: "澄んだ原点へ還る。",
      subheadline:
        "カリフォルニア州モントレーパークにある穏やかなスピリチュアル・サンクチュアリ。椅子に座ったまま、天から降り注ぐ神の大愛のみ光を取り次ぐ手かざし（お浄め）をご体験いただけます。",
      primaryCta: "御教えの原理を見る",
      secondaryCta: "体験セッションを予約する",
      facts: "火〜土 10:00–18:00 ｜ 日 9:00–16:00（月曜休館）・駐車場43台無料・ドネーション制（ご奉納）",
      scrollCue: "SCROLL",
    },
    dilemma: {
      eyebrow: "01 / なぜ静かな休息が必要か",
      title: "体を休めても、心の重荷まではなかなか降ろせないから。",
      p1: "フリーウェイの渋滞や絶え間ない通知、家族や仕事への気遣いが重なり、週末にたっぷり眠っても拭えない重だるさを抱える方は少なくありません。",
      p2: "新しい健康法や自己啓発を増やすのではなく、まずは椅子に腰掛け、深呼吸して神様のみ光に包まれる静かな55分をご提供します。",
      points: [
        {
          label: "頭の疲れ",
          text: "体は疲れているのに、夜になっても思考や心配ごとが止まらない。",
        },
        {
          label: "肩の力み",
          text: "責任感やストレスが、気づかないうちに肩・首・胸の重さになって残っている。",
        },
        {
          label: "飾らない静寂",
          text: "無理な営業や会話の負担はなく、落ち着いた空間でほっと一息つけます。",
        },
      ],
      caption: "ロサンゼルス・モントレーパーク — 椰子の木を見渡す3階の静かな聖域。",
    },
    principleSection: {
      eyebrow: "基本原理 / The Fundamental Principle",
      title: "霊主・心従・体属（Spirit Primary, Mind Secondary, Body Subordinate）",
      subtitle:
        "清らかな川が上流の源泉から中流を経て下流へと流れるように、真光では目に見えない「霊」の曇りが「心」と「体・人生」へ映し出されると考えます。",
      diagramAlt:
        "上流の「霊主（Spirit Primary）」、中流の「心従（Mind Secondary）」、下流の「体属（Body Subordinate）」を示す水彩図解。",
      diagramCaption:
        "上流（霊）が清まることで中流（心）にゆとりが生まれ、下流（体）の軽やかさへと自然につながっていきます。",
      stages: [
        {
          step: "上流 · 01",
          title: "霊主（れいしゅ）",
          role: "Spirit Primary",
          desc: "すべての根源である「霊」の領域。神様のみ光を受けることで、上流に溜まった霊的な曇りを静かに清めます。",
        },
        {
          step: "中流 · 02",
          title: "心従（しんじゅう）",
          role: "Mind Secondary",
          desc: "霊の根源が澄んでくると、心のざわめきや焦りが和らぎ、感謝や穏やかな視点を取り戻しやすくなります。",
        },
        {
          step: "下流 · 03",
          title: "体属（たいぞく）",
          role: "Body Subordinate",
          desc: "表面の症状だけを追いかけるのではなく、上流を整えることで、帰り道に心身の軽やかさを感じる方が多くいらっしゃいます。",
        },
      ],
    },
    practice: {
      eyebrow: "02 / 神の光の業（お浄め）",
      title: "椅子に座ったまま、手のひらをかざすお浄めと、前後チェックの大切さ。",
      p1: "お浄めでは、普段着・靴下着用のままリラックスして椅子にお掛けいただきます。お浄めを行うメンバーが約30cm離れた位置から手のひらを向け、神様のみ光を取り次ぎます。医療行為やマッサージではありません。",
      p2: "お浄めは前後に体へ軽く触れる工程を含みます。日本全国の道場でも同様に、ダクドク（コリや圧痛のある箇所）を探し、お浄め前後の変化をはっきりご実感いただくために、施術前後に指圧のような優しく短いプッシュ確認を行います。",
      noteTitle: "前後の優しい指圧チェックと同性希望について",
      noteBody:
        "み光そのものは約30cm離してかざしますが、肩・首・背中などの圧痛点（ダクドク）をお浄めの前後で軽く指先で押し、変化をご確認いただいております。同性スタッフの希望もフォームからお選びいただけます。",
      sessionPhotoAlt: "椅子に座って穏やかにお浄めを受けている様子。",
      diagramAlt:
        "靴下着用で椅子に座り約30cm離して光を受ける様子と、お浄め前後に肩などの圧痛点（ダクドク）を指先で軽く確認する図解。",
      diagramCaption:
        "椅子に座り約30cm離してみ光を受けると同時に、前後でダクドク（圧痛）の変化を指先で確認します。",
      pillars: [
        {
          title: "ドネーション制（ご奉納）",
          desc: "セッションに決まった料金設定はありません。お浄め御礼など、神様への感謝のお気持ちをご奉納としてお納めいただいております。",
        },
        {
          title: "前後の変化を実感",
          desc: "お浄め前後で軽く指先で圧痛点を確認するため、言葉だけでなく体感として心身の緩みの違いをお確かめいただけます。",
        },
        {
          title: "同性スタッフ対応も可能",
          desc: "初めての方でも安心してお受けいただけるよう、女性・男性スタッフのご希望を事前にお伝えいただけます。",
        },
      ],
    },
    commitments: {
      eyebrow: "03 / 道場の透明性と3つのお約束",
      title: "ご奉納・研修会・ご案内について、正直にお伝えします。",
      subtitle:
        "安心して足をお運びいただけるよう、お金のこと・物販の有無・事後のご連絡方針をありのまま記載しています。",
      cards: [
        {
          num: "01",
          title: "ドネーション制（ご奉納）と研修会",
          subtitle: "感謝のご奉納 · 無理な料金請求なし",
          body: "お浄め体験は固定料金ではなく、神様への感謝のお気持ち（お浄め御礼等のご奉納）をお納めいただくドネーション制です。なお、ご自身でも手かざしができるようになる「初級研修会（3日間）」へ入会をご希望される場合は、研修会御礼として160ドルを頂戴しております。",
        },
        {
          num: "02",
          title: "物販・営業電話・勧誘はありません",
          subtitle: "商品販売ゼロ · 営業勧誘ゼロ",
          body: "健康食品や物品の販売は一切行っておらず、後日のしつこい営業電話や無理な入会勧誘もございません。ご自身のペースで純粋にお浄めを体験していただけます。",
        },
        {
          num: "03",
          title: "ウィークリースケジュール配信とSTOP停止",
          subtitle: "米国 501(c)(3) 非営利法人",
          body: "ご来訪いただいた方へ道場のウィークリースケジュール（週間予定）などのご案内をお送りすることがございます。ご不要な場合は、いつでも「STOP」とお知らせいただければ直ちに配信を停止いたします。",
        },
      ],
    },
    journey: {
      eyebrow: "04 / 当日の流れ（約55分）",
      title: "3階 Suite #378 に到着してからお帰りまで。",
      subtitle:
        "特別な服装や事前知識はいりません。お電話・窓口はボランティアスタッフのケビンが日本語・英語で対応しております。",
      steps: [
        {
          stepNum: "01",
          duration: "0〜10分",
          title: "温かいお迎えとご説明",
          shortDesc: "受付を済ませ、落ち着いた椅子でお話を伺います。",
          fullDesc:
            "エレベーターで3階へお上がりいただくと、静かなラウンジでお迎えします。お水やお茶を飲みながらご来場のきっかけや気になる点を伺い、疑問点に丁寧にお答えします。",
          reassurance: "お電話（+1 626-861-5069）は英語・日本語のみの対応です。中国語・スペイン語をご希望の方はフォームより事前にお知らせください。",
        },
        {
          stepNum: "02",
          duration: "10〜45分",
          title: "ダクドク確認とお浄め",
          shortDesc: "前後の優しい指先チェックと、約30分間の静かな光。",
          fullDesc:
            "お浄め前に首や肩・背中などの圧痛点（ダクドク）を軽く指先で押し確認します。その後約30分間、30cmほど離した手のひらからみ光を取り次ぎ、最後にもう一度押して変化をお確かめいただきます。",
          reassurance: "普段着のまま椅子に座ってお受けいただけます。同性スタッフのご希望も承ります。",
        },
        {
          stepNum: "03",
          duration: "45〜55分",
          title: "ひと息ついてご奉納・お帰り",
          shortDesc: "変化を感じた後、感謝のご奉納（ドネーション）をしてご退出。",
          fullDesc:
            "お浄め後の心地よい余韻の中で少しお休みいただき、神様への感謝としてお浄め御礼をご奉納箱へお納めください。物販や無理な勧誘は一切ございません。",
          reassurance: "道場の週間予定がご不要な場合は、いつでも「STOP」の一言で停止できます。",
        },
      ],
    },
    hostMessage: {
      eyebrow: "道場スタッフより",
      title: "「ここに来ると肩の力が抜ける」と思っていただける場所に。",
      quote: "「忙しいロサンゼルスだからこそ、30分だけ静かに光に触れる時間を。」",
      body1:
        "ロサンゼルスでの生活や仕事に追われる中、ふと立ち止まって深呼吸できる場所でありたいと願っています。宗教の背景や国籍を問わず、どなたでも穏やかにお迎えいたします。",
      body2:
        "窓口・お電話を担当しているボランティアスタッフのケビンは、英語と日本語で対応しております。中国語・スペイン語での対応をご希望の場合は、通訳できるメンバーを調整いたしますので、事前にフォームよりリクエストをお願いいたします。",
      body3:
        "まずは一度、どうぞ気負わずにお越しください。お目にかかれるのを楽しみにしております。",
      signatureName: "ケビン (Kevin)",
      signatureRole: "ロサンゼルス道場 ボランティアコーディネーター（英語・日本語対応）",
      cta: "体験日時をリクエストする",
    },
    access: {
      eyebrow: "05 / アクセス・基本情報",
      title: "モントレーパーク中心部のわかりやすい立地です。",
      rows: [
        {
          label: "所在地",
          value: "809 S Atlantic Blvd, Suite #378, Monterey Park, CA 91754",
          sub: "3階（建物ロビーからエレベーターをご利用いただけます）",
        },
        {
          label: "開所時間",
          value: "火〜土 10:00 AM – 6:00 PM ｜ 日 9:00 AM – 4:00 PM（月曜休館）",
          sub: "お待たせしないよう事前予約制で承っております",
        },
        {
          label: "駐車場",
          value: "敷地内プラザ駐車場 43台無料",
          sub: "S Atlantic Blvd 沿いからそのままお入りいただけます",
        },
        {
          label: "お電話・言語",
          value: "+1 (626) 861-5069 · losangeles@worlddivinelight.org",
          sub: "電話はケビンが英語・日本語で対応。中国語・スペイン語をご希望の場合はフォームにて事前リクエストをお願いします。",
        },
      ],
      bannerTitle: "中国語・スペイン語でのご案内をご希望の方へ",
      bannerDesc:
        "お電話窓口は英語・日本語のみとなります。中国語またはスペイン語対応をご希望の際は、下の予約フォームから事前にお申し込みください。",
      bannerCta: "予約フォームへ進む",
    },
    booking: {
      eyebrow: "道場直結 予約リクエスト",
      title: "お浄め体験セッションを予約する",
      subtitle:
        "外部サイトへ移動せず、このページから直接リクエストをお送りいただけます。ご希望の日時・言語・担当スタッフの性別をお選びください。",
      phoneNoteTitle: "対応言語・お電話についてのご案内",
      phoneNoteBody:
        "お電話（+1 626-861-5069）はボランティアのケビンが英語・日本語のみで承っております。中国語・スペイン語でのご対応をご希望の場合は、メンバーを調整するためフォームより事前にリクエストをお願いいたします。",
      form: {
        fullName: "お名前",
        fullNamePlaceholder: "山田 太郎 / Taro Yamada",
        email: "メールアドレス",
        emailPlaceholder: "you@example.com",
        phone: "お電話番号",
        phonePlaceholder: "+1 (626) 555-0199",
        preferredDate: "ご希望日",
        preferredTime: "ご希望時間帯",
        timeOptions: [
          "午前 (10:00 AM – 12:00 PM・日曜は 9:00 AM〜)",
          "昼 (12:00 PM – 2:30 PM)",
          "午後 (2:30 PM – 4:00 PM)",
          "夕方 (火〜土のみ 4:00 PM – 6:00 PM)",
        ],
        preferredLanguage: "ご希望の言語",
        languageOptions: [
          { value: "English", label: "English (英語)" },
          { value: "Japanese", label: "日本語 (Japanese)" },
          { value: "Chinese", label: "中文 / 中国語 (標準中国語・要事前リクエスト)" },
          { value: "Spanish", label: "Español / スペイン語 (要・事前リクエスト)" },
        ],
        languageHint:
          "ケビンの電話対応は英語・日本語のみです。中国語・スペイン語をご希望の際は事前調整を行います。",
        practitionerPreference: "お浄めスタッフのご希望",
        practitionerOptions: [
          { value: "No preference", label: "特に指定なし" },
          { value: "Female practitioner", label: "女性スタッフを希望" },
          { value: "Male practitioner", label: "男性スタッフを希望" },
        ],
        notes: "ご質問・事前リクエストメモ（任意）",
        notesPlaceholder:
          "中国語・スペイン語のご希望、車椅子でのご来場、その他気になることがございましたらご記入ください。",
        smsConsentPrefix:
          "予約確認およびロサンゼルス道場からのウィークリースケジュール（週間予定）のSMS配信に同意します（不要時はいつでも「STOP」で停止できます）。",
        smsConsentPrivacyLink: "プライバシーポリシー",
        smsConsentSuffix: "を確認しました。",
        submit: "予約リクエストを送信する",
        submitting: "送信中...",
        validationNotice: "赤枠で示された必須項目をご確認ください。",
        errorFallback:
          "送信できませんでした。losangeles@worlddivinelight.org までメール、または +1 (626) 861-5069（英語・日本語）へご連絡ください。",
        medicalNotice:
          "カリフォルニア州 BPC § 2063 に基づく開示：当法人の活動は宗教的・スピリチュアルな実践であり、医療診断・治療・カウンセリングではありません。",
        successTitle: "ご予約リクエストを受け付けました",
        successBody:
          "送信ありがとうございます。スタッフのケビンより日程確認のご連絡を差し上げます（中国語・スペイン語をご希望の場合は担当調整のうえご連絡いたします）。",
        successReset: "別のリクエストを送る",
      },
    },
    faq: {
      eyebrow: "06 / よくあるご質問",
      title: "初めての方からよくいただく12のご質問",
      subtitle: "お浄め時の接触、ご奉納（ドネーション）、初級研修会、対応言語、駐車場などについてまとめました。",
      items: [
        {
          q: "手かざし（お浄め）とはどのようなものですか？",
          a: "お浄めをする者が手のひらを約30cmほど離してかざし、神様の大愛のみ光を取り次ぐスピリチュアルな業（わざ）です。「霊主・心従・体属」の原理に基づき、日々の疲れや重荷の根源である霊的な曇りを静かに清めることを目的としています。",
        },
        {
          q: "体に触れることはありますか？",
          a: "み光そのものは約30cm離してかざしますが、全国の道場と同じく、お浄め前にダクドク（コリや圧痛点）を探し、お浄め後の緩みや変化を実感していただくため、肩・首・背中などに指圧のような優しいプッシュを行います。",
        },
        {
          q: "同性のスタッフにお願いすることはできますか？",
          a: "はい、可能です。このページの予約フォーム内にある「お浄めスタッフのご希望」から、女性スタッフ・男性スタッフ・指定なしをお選びいただけます。",
        },
        {
          q: "料金やご奉納（ドネーション）はどのようになっていますか？",
          a: "商業的なチケット料金ではなくドネーション制となっております。神様への感謝の気持ちとしてお浄め御礼などのご奉納をお納めいただいております。また、商品などの販売も一切ございません。",
        },
        {
          q: "自分でもお浄めができるようになりたい場合はどうなりますか？",
          a: "ご入会を無理におすすめすることはありません。もしご自身でもみ光を取り次げるようになる「初級研修会（3日間）」へ参加される場合は、160ドルの研修会ご奉納を頂戴しております。",
        },
        {
          q: "訪問後に電話営業や勧誘はありますか？",
          a: "いいえ、後日の営業電話や強引な勧誘は一切ございません。道場からのウィークリースケジュール（週間予定）のご案内はお送りしておりますが、不要な場合はいつでも「STOP」とお伝えいただければ直ちに停止いたします。",
        },
        {
          q: "対応している言語を教えてください。",
          a: "お電話（+1 626-861-5069）や常駐スタッフのケビンによる対応は英語・日本語となります。中国語・スペイン語でのご案内も歓迎しておりますが、対応スタッフを手配するため予約フォームから事前リクエストをお願いいたします。",
        },
        {
          q: "医療行為や治療の代わりになりますか？",
          a: "いいえ。カリフォルニア州法 BPC § 2063 に基づき、お浄めは医療・診断・治療・心理療法ではなく純粋な宗教的実践です。お体の不調がある場合は医師の診察もあわせてお受けください。",
        },
        {
          q: "特定の宗教を信仰していなくても受けられますか？",
          a: "はい、もちろんです。特定の宗教への改宗を求めるものではなく、さまざまな信仰や価値観をお持ちの方がどなたでも静かにご体験いただけます。",
        },
        {
          q: "所要時間と服装の目安を教えてください。",
          a: "ご説明・前後のダクドク確認・約30分のお浄めを含め、合計50〜60分ほどです。普段着のままで結構ですが、礼拝堂に入る際は靴を脱ぐため靴下をご着用ください。",
        },
        {
          q: "駐車場やエレベーターはありますか？",
          a: "はい。809 S Atlantic Blvd の建物敷地内に43台分の無料駐車場があり、ロビーから3階 Suite #378 までエレベーターをご利用いただけます。お浄めもすべて椅子に座った姿勢で行います。",
        },
        {
          q: "予定変更やウィークリースケジュールの停止はどうすればよいですか？",
          a: "SMSに「STOP」とご返信いただくか、losangeles@worlddivinelight.org または +1 (626) 861-5069（英語・日本語）までお知らせください。",
        },
      ],
    },
    closing: {
      eyebrow: "穏やかな時間を、ここから",
      title: "今週、静かに心を整えるひとときを。",
      subtitle: "カリフォルニア州モントレーパーク ｜ 火〜土 10:00–18:00・日 9:00–16:00（月曜休館）",
      cta: "予約フォームへ進む",
    },
    footer: {
      centerDesc:
        "カリフォルニア州モントレーパークにて「神の光の業（お浄め）」をお伝えする米国政府公認 501(c)(3) 非営利スピリチュアルセンター。",
      navHeading: "メニュー",
      accessHeading: "道場・お問い合わせ",
      hoursSummary: "火〜土 10:00 AM – 6:00 PM ｜ 日 9:00 AM – 4:00 PM（月曜休館）",
      phoneLabel: "+1 (626) 861-5069",
      phoneLangNote: "電話対応はケビンが英語・日本語のみ（中国語・スペイン語は要事前予約）",
      disclaimerTitle: "法的・医療に関する免責事項（CA BPC § 2063 / SB 577）",
      disclaimerBody:
        "世界真光文明教団ロサンゼルス道場の活動は、米国 501(c)(3) 非営利法人によるドネーション制の宗教的・スピリチュアルな実践であり、医療診断・治療・薬事・心理療法・マッサージではありません。健康上の問題は医療機関にご相談ください。",
      privacyLink: "プライバシーポリシー (CalOPPA)",
      accessibilityLink: "アクセシビリティ声明 (WCAG 2.1 AA)",
      copyright: "© 2026 World Divine Light — Los Angeles Spiritual Center. All rights reserved.",
    },
  },

  zh: {
    langLabel: "中文",
    seo: {
      title: "世界真光文明教团 洛杉矶道场 | 加州蒙特利公园市灵性中心",
      description:
        "位于加州蒙特利公园市的宁静灵性场所，体验“神之光的业（浄化 / Okiyome）”。周二至周六 10:00–18:00、周日 9:00–16:00（周一闭馆），采用随喜奉献制。提供标准中文预约接待。",
      ogLocale: "zh_CN",
    },
    topBar: "美国 501(c)(3) 非营利灵性中心 · 加州蒙特利公园市 · 随喜奉献（捐献制）",
    topBarHours: "周二至周六 10:00–18:00 ｜ 周日 9:00–16:00（周一闭馆）",
    nav: {
      skipToContent: "跳至主要内容",
      centerName: "洛杉矶道场",
      centerTagline: "WORLD DIVINE LIGHT · MONTEREY PARK",
      items: [
        { num: "01", href: "#dilemma", label: "为何需要静心", enSub: "DILEMMA" },
        { num: "02", href: "#practice", label: "真光净化体验", enSub: "OKIYOME" },
        { num: "03", href: "#principles", label: "坦诚承诺", enSub: "TRANSPARENCY" },
        { num: "04", href: "#journey", label: "首次来访流程", enSub: "JOURNEY" },
        { num: "05", href: "#access", label: "交通与时间", enSub: "ACCESS" },
        { num: "06", href: "#faq", label: "常见问题", enSub: "FAQ" },
      ],
      cta: "预约来访",
      menuOpen: "打开导航菜单",
      menuClose: "关闭导航菜单",
      menuNavLabel: "手机导航菜单",
      languageLabel: "语言选择",
    },
    hero: {
      badge: "世界真光文明教团 · 洛杉矶灵性中心",
      headlineLine1: "走出日常忙碌，",
      headlineLine2: "回到内心的澄明。",
      subheadline:
        "位于加州蒙特利公园市的宁静灵性场所。坐在舒适的座椅中体验“神之光的业（浄化）”——承接来自上天纯净大爱的光，沉淀纷乱思绪，恢复内在的平和与清明。",
      primaryCta: "了解核心原理",
      secondaryCta: "预约体验时段",
      facts: "周二至周六 10:00–18:00 · 周日 9:00–16:00（周一闭馆）· 43个免费停车位 · 随喜奉献制",
      scrollCue: "SCROLL",
    },
    dilemma: {
      eyebrow: "01 / 为何需要片刻沉静",
      title: "即便身体停下来休息，紧绷的心绪却依然难得片刻安宁。",
      p1: "高速公路的奔波、不断弹出的手机消息，以及对家庭与工作的牵挂，常让人在周末充分睡眠后依然觉得疲惫沉重。",
      p2: "我们不推销繁琐的养生课程，只是在蒙特利公园市保留一处安静的椅子空间，让您坐下来缓一口气，静静沐浴在清净的光中。",
      points: [
        {
          label: "思绪难止",
          text: "身体明明累了，夜里脑海中的担忧与念头却还在不停打转。",
        },
        {
          label: "肩背重担",
          text: "责任感与生活压力不知不觉沉淀在肩颈与胸口。",
        },
        {
          label: "纯粹静谧",
          text: "没有喧闹寒暄，也没有推销压力，只有温暖平和的款待。",
        },
      ],
      caption: "蒙特利公园市 — 棕榈树影旁的宁静3楼空间。",
    },
    principleSection: {
      eyebrow: "基本教义原理 / The Principle",
      title: "灵为主 · 心为从 · 体为属",
      subtitle:
        "犹如清澈河水自高山源头流向中游再入下游，我们认为看不见的“灵”处于源头，灵的澄明与否会直接反映在“心境”与“身体状态”之上。",
      diagramAlt: "水彩示意图：上游“灵为主”，中游“心为从”，下游“体为属”。",
      diagramCaption: "上游（灵）清净了，中游（心）自然舒展，进而支持下游（身体）的轻盈自在。",
      stages: [
        {
          step: "上游 · 01",
          title: "灵为主 (Spirit Primary)",
          role: "Rei-Shu (灵主)",
          desc: "灵性是生命最上游的源头。领受神之光能温柔净化源头累积的灵性阴霾。",
        },
        {
          step: "中游 · 02",
          title: "心为从 (Mind Secondary)",
          role: "Shin-Ju (心从)",
          desc: "当上游源头澄明下来，内心的焦虑杂音逐渐平息，更容易生出安定与感恩之心。",
        },
        {
          step: "下游 · 03",
          title: "体为属 (Body Subordinate)",
          role: "Tai-Zoku (体属)",
          desc: "不止头痛医头、脚痛医脚，而是先照料上游的和谐，让身心在不知不觉中感到松快。",
        },
      ],
    },
    practice: {
      eyebrow: "02 / 浄化（Okiyome）的真实流程",
      title: "坐在椅子上领受约30厘米外照耀的光，与前后轻按确认的传统做法。",
      p1: "进行体验时，您穿着日常服装与袜子舒适地坐在靠背椅上。施光者将手掌悬于约1英尺（30厘米）外传达神的大爱之光——绝非按摩或医疗诊疗。",
      p2: "与日本及全球所有真光道场完全一致：为了让您切实感受肩颈或压痛点（毒素聚积处）的前后变化，施光前后会在肩、颈、前额或背部进行短暂温和的指压式轻按确认，并非所谓“完全零接触”。",
      noteTitle: "关于前后轻按检查与同性人员安排",
      noteBody:
        "传达神光本身保持约30厘米距离；但为帮您对比净化前后紧绷点的改善，全各地道场均会做短暂轻柔的指腹按压检查。您可在下方表单指定同性施光人员。",
      sessionPhotoAlt: "来宾坐在椅子上平静领受真光体验。",
      diagramAlt: "示意图：穿着袜子坐于椅子上在约30厘米处领受神光，附带局部插图展示前后温和的指压检查。",
      diagramCaption: "全程坐椅完成；约30厘米外照光，并辅以体验前后的轻柔指压变化对比。",
      pillars: [
        {
          title: "随喜奉献（捐献制）",
          desc: "来访体验不设商业票价，均本着对神明的感恩之心自愿随喜奉献（如“お浄め御礼”等）。",
        },
        {
          title: "前后变化亲身对比",
          desc: "体验前后的轻柔指尖压痛点确认，帮助您不仅靠想象，而是亲身比较肩背放松的差别。",
        },
        {
          title: "可预约同性人员与中文服务",
          desc: "您可自由选择女性或男性人员；如需中文接待，请在预约表单提前提交申请，以便我们为您安排。",
        },
      ],
    },
    commitments: {
      eyebrow: "03 / 坦诚透明的三项承诺",
      title: "关于奉献、研修会、商品销售与后续联系的真实说明。",
      subtitle: "我们希望您在踏入道场前，对每一项细节都有清晰、诚实的了解。",
      cards: [
        {
          num: "01",
          title: "自愿捐献制与初级研修会说明",
          subtitle: "感恩奉献 · 无固定门票",
          body: "日常体验采用对神明表达感恩的自愿奉献制（如お浄め御礼/供奉），不设商业收费。日后若您希望参加为期3天的“初级研修会”学习亲自施光，研修会奉献金为160美元，全程毫无强迫。",
        },
        {
          num: "02",
          title: "绝无商品销售或推销电话",
          subtitle: "零商品贩售 · 零强迫劝诱",
          body: "我们从不售卖保健品、水晶或任何商品，来访后也绝不会拨打推销电话或施压入会。",
        },
        {
          num: "03",
          title: "每周道场日程通知（可回复 STOP 停收）",
          subtitle: "501(c)(3) 非营利组织",
          body: "经您同意，道场会向来宾发送每周开放时间表等日程简讯。若不需要，随时告诉我们或回复 STOP 即可立即停止发送。",
        },
      ],
    },
    journey: {
      eyebrow: "04 / 首次来访约 55 分钟体验流程",
      title: "走进蒙特利公园市 3 楼 Suite #378 后的轻松步骤。",
      subtitle:
        "无需特殊服饰或宗教知识。请注意接听电话的义工 Kevin 仅通英语与日语；如需中文服务，请务必通过表单提前预约以便安排通晓中文的会员接待。",
      steps: [
        {
          stepNum: "01",
          duration: "第 0–10 分钟",
          title: "亲切迎接与交流",
          shortDesc: "签到入座，在宁静客厅放松交谈。",
          fullDesc:
            "搭乘电梯到达3楼后，我们将奉上温水或热茶，聆听您最近的生活状态并坦诚解答任何疑问，同时核对您的语言与人员偏好。",
          reassurance: "电话热线 (+1 626-861-5069) 仅由 Kevin 以英/日双语接听；中文服务请务必提前经表单申请。",
        },
        {
          stepNum: "02",
          duration: "第 10–45 分钟",
          title: "前后指压确认与约30分钟浄化",
          shortDesc: "轻按压痛点对比、约30厘米照光及再次确认。",
          fullDesc:
            "在扶手椅坐好后，施光者先轻轻按压肩颈或背部的紧绷压痛点（Dakudoku），随后于约1英尺处安静传达神之光约30分钟，结束前再轻按一次让您感受变化。",
          reassurance: "穿日常便服与袜子即可；支持提前指定同性施光人员。",
        },
        {
          stepNum: "03",
          duration: "第 45–55 分钟",
          title: "静坐休息与自愿奉献",
          shortDesc: "感受片刻清明后随喜奉献，从容道别。",
          fullDesc:
            "稍微歇息并交流体验感受。若愿意向神明表达感谢，可将自愿奉献投入奉献箱——无任何商业收费或强迫留步。",
          reassurance: "道场周程通知完全自愿，可随时回复 STOP 取消。",
        },
      ],
    },
    hostMessage: {
      eyebrow: "来自道场的欢迎信",
      title: "在忙碌的洛杉矶，留一处不用勉强自己的安静角落。",
      quote: "“每周只需抽出几十分钟安静坐下，或许就会想起内心原本有多轻盈。”",
      body1:
        "无论您是对东方灵性文化充满好奇、最近在工作生活中感到疲惫，还是单纯想找个平静的场所坐坐，我们都竭诚欢迎您。",
      body2:
        "我是负责洛杉矶道场日常协调与电话接听的义工 Kevin，日常只能使用英语和日语沟通。如果您或家人希望以标准中文交流，请务必先透过下方表单预约，我会为您提前联系通晓中文的道场成员到场陪伴。",
      body3: "不必带着任何压力，欢迎随时预约来坐一坐。",
      signatureName: "Kevin",
      signatureRole: "洛杉矶道场 义工协调员（电话/现场仅英、日双语）",
      cta: "提交中文体验预约",
    },
    access: {
      eyebrow: "05 / 地址与实用信息",
      title: "位于蒙特利公园市中心，停车便捷。",
      rows: [
        {
          label: "道场地址",
          value: "809 S Atlantic Blvd, Suite #378, Monterey Park, CA 91754",
          sub: "3楼（大堂乘电梯直达，无需爬楼梯）",
        },
        {
          label: "开放时间",
          value: "周二至周六 10:00 AM – 6:00 PM ｜ 周日 9:00 AM – 4:00 PM（周一闭馆）",
          sub: "敬请提前预约，以便为您安排对应语言接待人员",
        },
        {
          label: "停车信息",
          value: "大楼广场提供 43 个免费专属停车位",
          sub: "由 S Atlantic Blvd 直接驶入地面停车场",
        },
        {
          label: "电话与语言说明",
          value: "+1 (626) 861-5069 · losangeles@worlddivinelight.org",
          sub: "义工 Kevin 接听电话仅支持英语与日语；中文服务需提前于下方表单备注预约。",
        },
      ],
      bannerTitle: "需要中文接待吗？",
      bannerDesc:
        "由于日常电话专线仅通英语和日语，请直接通过下方预约表单选择“中文”（通用标准中文服务），我们会在安排好中文会员后以邮件或短信向您确认时间。",
      bannerCta: "前往预约表单",
    },
    booking: {
      eyebrow: "道场直接预约表单",
      title: "预约真光体验来访",
      subtitle: "无需跳转第三方网站，直接在此提交预约请求。请注明您方便的时间与语言需求。",
      phoneNoteTitle: "电话与中文接待重要说明",
      phoneNoteBody:
        "联系电话 +1 (626) 861-5069 由义工 Kevin 接听，仅支持英语与日语。若您需要中文或西班牙语协助，请提前 1–2 天在此提交表单，以便我们协调双语成员为您服务。",
      form: {
        fullName: "您的姓名",
        fullNamePlaceholder: "您的称呼",
        email: "电子邮箱",
        emailPlaceholder: "you@example.com",
        phone: "联系电话",
        phonePlaceholder: "+1 (626) 555-0199",
        preferredDate: "期望日期",
        preferredTime: "期望时段",
        timeOptions: [
          "上午 (10:00 AM – 12:00 PM · 周日 9:00 AM 起)",
          "午间 (12:00 PM – 2:30 PM)",
          "下午 (2:30 PM – 4:00 PM)",
          "傍晚 (仅限周二至周六 4:00 PM – 6:00 PM)",
        ],
        preferredLanguage: "期望沟通语言",
        languageOptions: [
          { value: "English", label: "English (英语)" },
          { value: "Japanese", label: "日本語 (日语)" },
          { value: "Chinese", label: "中文（标准中文 · 需提前申请）" },
          { value: "Spanish", label: "Español / 西班牙语 (需提前申请)" },
        ],
        languageHint: "直接拨打电话仅支持英/日双语；选择中文将在收到申请后为您安排可通用中文的双语人员。",
        practitionerPreference: "施光人员性别偏好",
        practitionerOptions: [
          { value: "No preference", label: "不限制" },
          { value: "Female practitioner", label: "指定女性人员" },
          { value: "Male practitioner", label: "指定男性人员" },
        ],
        notes: "备注问题或需求（选填）",
        notesPlaceholder: "可备注希望标准中文接待、无障碍设施需求或任何疑问。",
        smsConsentPrefix:
          "我同意接收来自 World Divine Light LA 的预约确认短信及每周道场日程通知（可随时回复 STOP 退订）。详见",
        smsConsentPrivacyLink: "隐私政策",
        smsConsentSuffix: "。",
        submit: "发送预约请求",
        submitting: "正在提交...",
        validationNotice: "请检查上方标红的必填栏位后再试。",
        errorFallback:
          "暂时无法提交，请发邮件至 losangeles@worlddivinelight.org 或致电 +1 (626) 861-5069（英/日）。",
        medicalNotice:
          "加州商业与职业法典 BPC § 2063 声明：真光体验属宗教灵性实践，并非执业医疗诊断、治疗或心理咨询。如有健康问题请咨询执业医师。",
        successTitle: "已收到您的预约申请",
        successBody: "非常感谢！协调员 Kevin 将尽快核实时间并联系您；若您申请中文协助，我们将安排双语成员后尽快回复确认。",
        successReset: "提交另一份预约",
      },
    },
    faq: {
      eyebrow: "06 / 常见问题解答",
      title: "初次来访前的12个透明解答",
      subtitle: "完整说明体验性质、指压轻按检查、奉献机制、语言安排及无障碍环境。",
      items: [
        {
          q: "什么是“神之光的业”（浄化）？",
          a: "由施光者面向静坐椅上的来宾伸出单手手掌，传达来自神大爱之光的灵性修持。依据“灵为主、心为从、体为属”的教义，帮助净化造成身心沉重根源的灵性阴霾。",
        },
        {
          q: "体验过程中会触碰身体吗？",
          a: "照耀神光本身保持约30厘米距离；但与全球所有真光道场一样，施光前后会在肩、颈、额头或背部等常见紧绷点做短暂温和的指压式轻按，帮助您亲身对比体验前后的放松差异。",
        },
        {
          q: "可以指定女性或男性施光人员吗？",
          a: "可以。您可在本页预约表单中直接勾选“指定女性人员”、“指定男性人员”或“不限制”。",
        },
        {
          q: "如何收费或奉献？需要购买产品吗？",
          a: "我们不设门票定价，亦绝不售卖任何保健品、水晶或商品。道场完全采用自愿随喜捐献制（对神明的感恩奉献，如お浄め御礼）。",
        },
        {
          q: "如果未来想学习自己施光该怎么办？",
          a: "绝无任何入会压力。若您未来自愿希望学习如何传达神之光，可报名参加为期3天的“初级研修会（初級研修会）”，研修会奉献金为160美元。",
        },
        {
          q: "来访后会接到推销电话或被劝诱吗？",
          a: "绝不会。我们不打事后推销电话也不做强迫劝诱。我们仅会在您允许的情况下分享道场每周日程表，您随时可通过回复 STOP 立即停止接收。",
        },
        {
          q: "现场与电话支援哪些语言？",
          a: "电话专线 (+1 626-861-5069) 及常驻义工 Kevin 使用英语和日语。我们非常欢迎中文及西班牙语来宾，但需要您透过本页表单提前1–2天预约，以便安排通晓该语言的会员到场接待。",
        },
        {
          q: "这能替代医疗或心理治疗吗？",
          a: "不能。依据加州法律 BPC § 2063，这属于纯宗教灵性实践，并非医疗行为、理疗或心理治疗。请务必继续配合您的主治医生。",
        },
        {
          q: "没有宗教信仰，或者信仰其他宗教的人可以来吗？",
          a: "完全欢迎。无论您秉持何种信仰背景或毫无宗教背景，都可以平和地前来体验，绝不要求改变个人信仰。",
        },
        {
          q: "初次到访大概需要多久？着装有何要求？",
          a: "全程约 50 至 60 分钟，包括温馨介绍、前后指压检查与约30分钟静坐照光。穿着舒适的日常服装与袜子（进入神殿需脱鞋着袜）即可。",
        },
        {
          q: "好停车吗？是否支持轮椅无障碍进出？",
          a: "809 S Atlantic Blvd 大楼广场设有43个免费专属车位，大厅有电梯直达3楼 Suite #378，室内全程坐椅进行体验。",
        },
        {
          q: "如何更改预约时间或停止接收周程通知？",
          a: "只需对短信回复 STOP，或发送邮件至 losangeles@worlddivinelight.org，或以英/日语致电 +1 (626) 861-5069 即可。",
        },
      ],
    },
    closing: {
      eyebrow: "随时欢迎",
      title: "这周，为自己的心留出片刻安宁。",
      subtitle: "加州蒙特利公园市 · 周二至周六 10:00–18:00 · 周日 9:00–16:00（周一闭馆）",
      cta: "立即预约时段",
    },
    footer: {
      centerDesc:
        "洛杉矶蒙特利公园市美国 501(c)(3) 非营利灵性中心，提供温暖宁静的“神之光的业（Okiyome）”体验。",
      navHeading: "页面导航",
      accessHeading: "地址与联络",
      hoursSummary: "周二至周六 10:00 AM – 6:00 PM ｜ 周日 9:00 AM – 4:00 PM（周一闭馆）",
      phoneLabel: "+1 (626) 861-5069",
      phoneLangNote: "电话由 Kevin 仅以英语/日语接听；中文及西班牙语需经表单提前预约",
      disclaimerTitle: "法律与医疗免责声明（CA BPC § 2063 / SB 577）",
      disclaimerBody:
        "世界真光文明教团洛杉矶道场为 501(c)(3) 非营利宗教组织，基于自愿随喜捐献制提供灵性修持，不提供医疗诊断、治疗、药物或心理治疗。健康问题请务必就医。",
      privacyLink: "隐私政策 (CalOPPA)",
      accessibilityLink: "无障碍声明 (WCAG 2.1 AA)",
      copyright: "© 2026 World Divine Light — Los Angeles Spiritual Center. All rights reserved.",
    },
  },

  es: {
    langLabel: "Español",
    seo: {
      title: "World Divine Light Centro Los Ángeles | Santuario en Monterey Park",
      description:
        "Centro espiritual sin fines de lucro 501(c)(3) en Monterey Park, CA. Sesiones del Arte de la Luz Divina (Okiyome) sentado en silla. Mar–Sáb 10:00–18:00, Dom 9:00–16:00 (Cerrado Lun). Basado en donaciones.",
      ogLocale: "es_US",
    },
    topBar: "Centro Espiritual sin fines de lucro 501(c)(3) · Monterey Park, CA · Basado en donaciones",
    topBarHours: "Mar–Sáb 10:00–18:00 | Dom 9:00–16:00 (Cerrado Lun)",
    nav: {
      skipToContent: "Saltar al contenido principal",
      centerName: "Centro Los Ángeles",
      centerTagline: "WORLD DIVINE LIGHT · MONTEREY PARK",
      items: [
        { num: "01", href: "#dilemma", label: "Por Qué Descansar", enSub: "DILEMMA" },
        { num: "02", href: "#practice", label: "La Sesión", enSub: "OKIYOME" },
        { num: "03", href: "#principles", label: "Compromisos", enSub: "TRANSPARENCY" },
        { num: "04", href: "#journey", label: "Primera Visita", enSub: "JOURNEY" },
        { num: "05", href: "#access", label: "Ubicación y Horarios", enSub: "ACCESS" },
        { num: "06", href: "#faq", label: "Preguntas Frecuentes", enSub: "FAQ" },
      ],
      cta: "Reservar Visita",
      menuOpen: "Abrir menú de navegación",
      menuClose: "Cerrar menú de navegación",
      menuNavLabel: "Navegación móvil",
      languageLabel: "Idioma",
    },
    hero: {
      badge: "World Divine Light · Centro Espiritual de Los Ángeles",
      headlineLine1: "Sal de la prisa diaria.",
      headlineLine2: "Vuelve a tu centro interior.",
      subheadline:
        "Un santuario sereno en Monterey Park, California. Experimenta el Arte de la Luz Divina (Okiyome): una sesión tranquila sentado en silla donde se irradia amor puro de Dios para despejar la mente y recuperar la serenidad.",
      primaryCta: "Conocer el Principio",
      secondaryCta: "Solicitar una Sesión",
      facts: "Mar–Sáb 10:00–18:00 · Dom 9:00–16:00 (Cerrado Lun) · 43 Estacionamientos Gratuitos · Donación Voluntaria",
      scrollCue: "SCROLL",
    },
    dilemma: {
      eyebrow: "01 / Por Qué Importa la Calma",
      title: "Aunque el cuerpo se detenga, la mente rara vez suelta el peso del día.",
      p1: "El tráfico constante, las notificaciones sin pausa y las responsabilidades diarias dejan un agotamiento sutil que incluso dormir todo el fin de semana no siempre logra aliviar.",
      p2: "En lugar de exigirte otra rutina compleja, nuestro santuario te ofrece simplemente un lugar sereno donde sentarte en una silla, respirar sin prisas y recibir Luz espiritual.",
      points: [
        {
          label: "Ruido Mental",
          text: "Los pensamientos siguen dando vueltas por la noche incluso cuando estás exhausto.",
        },
        {
          label: "Peso Acumulado",
          text: "Las preocupaciones familiares o laborales se asientan poco a poco en hombros y pecho.",
        },
        {
          label: "Pausa Sincera",
          text: "Sin presiones ni ventas; solo hospitalidad tranquila y un ambiente pacífico.",
        },
      ],
      caption: "Monterey Park, Los Ángeles — un rincón de calma entre palmeras.",
    },
    principleSection: {
      eyebrow: "El Principio Fundamental",
      title: "Espíritu Primero · Mente en Segundo Lugar · Cuerpo Subordinado",
      subtitle:
        "Así como un río claro fluye desde su nacimiento en la montaña hacia el valle, nuestra enseñanza observa cómo nuestra dimensión espiritual da forma a los pensamientos y al bienestar cotidiano.",
      diagramAlt:
        "Ilustración en acuarela que muestra Espíritu Primero río arriba, Mente Secundaria a mitad del cauce y Cuerpo Subordinado río abajo.",
      diagramCaption:
        "Cuando el origen espiritual se aclara río arriba, la mente encuentra calma y el cuerpo percibe mayor ligereza.",
      stages: [
        {
          step: "Río Arriba · 01",
          title: "Espíritu Primero",
          role: "Rei-Shu (霊主)",
          desc: "El espíritu es la fuente original. Recibir Luz Divina pura ayuda a limpiar suavemente las nubes acumuladas en el origen.",
        },
        {
          step: "Cauce Medio · 02",
          title: "Mente Secundaria",
          role: "Shin-Ju (心従)",
          desc: "A medida que el origen se aclara, disminuye la inquietud interior y surge espacio para la gratitud y la calma.",
        },
        {
          step: "Río Abajo · 03",
          title: "Cuerpo Subordinado",
          role: "Tai-Zoku (体属)",
          desc: "En lugar de perseguir síntomas aislados, cuidar la armonía de origen permite salir con una sensación más ligera.",
        },
      ],
    },
    practice: {
      eyebrow: "02 / El Arte de la Luz Divina (Okiyome)",
      title: "Calma sentado en silla y una práctica transparente en todos nuestros centros.",
      p1: "Durante una sesión te sientas cómodamente con tu ropa habitual y calcetines. Quien canaliza la Luz sostiene la palma abierta a unos 30 cm de distancia—nunca es masaje ni tratamiento médico.",
      p2: "Tal como se realiza en todos los centros del mundo, antes y después de irradiar Luz hacemos una breve y suave presión con la yema de los dedos (estilo digitopresión) en puntos comunes de tensión (hombros, cuello, frente o espalda) para que puedas sentir directamente el cambio.",
      noteTitle: "Comprobación Suave con los Dedos y Preferencia de Género",
      noteBody:
        "La Luz se canaliza a unos 30 cm, pero incluimos esta breve comprobación táctil antes y después para notar la diferencia. Puedes pedir practicante del mismo género en el formulario.",
      sessionPhotoAlt: "Visitante sentado en silencio recibiendo una sesión de Luz Divina.",
      diagramAlt:
        "Diagrama en acuarela de una persona sentada con calcetines recibiendo Luz a 30 cm, con recuadro que muestra la breve comprobación suave de hombros.",
      diagramCaption:
        "Sentado en silla; Luz a ~30 cm acompañada de una breve comprobación táctil antes y después.",
      pillars: [
        {
          title: "Basado en Donaciones",
          desc: "No hay boletos ni tarifas comerciales; las ofrendas (Okiyome Orei) nacen voluntariamente de la gratitud a Dios.",
        },
        {
          title: "Comparación Antes y Después",
          desc: "La breve comprobación en puntos de tensión permite notar personalmente cómo cede la rigidez.",
        },
        {
          title: "Mismo Género y Español con Aviso",
          desc: "Elige practicante hombre o mujer si lo prefieres, y solicita atención en español con antelación.",
        },
      ],
    },
    commitments: {
      eyebrow: "03 / Compromisos Transparentes",
      title: "Lo que puedes esperar—explicado con total claridad.",
      subtitle:
        "Queremos que sepas exactamente cómo funcionan las donaciones, los seminarios y nuestra comunicación.",
      cards: [
        {
          num: "01",
          title: "Sistema de Donación Voluntaria",
          subtitle: "OFRENDAS DE GRATITUD · SIN PRECIOS FIJOS",
          body: "Las sesiones no tienen tarifa fija; se sostienen con donaciones voluntarias de agradecimiento a Dios (Okiyome Orei). Si algún día deseas aprender a canalizar Luz asistiendo al Seminario Primario opcional de 3 días, existe una ofrenda de $160.",
        },
        {
          num: "02",
          title: "Cero Venta de Productos o Presión",
          subtitle: "SIN MERCANCÍA · SIN LLAMADAS DE VENTA",
          body: "Nunca vendemos suplementos, amuletos ni libros como requisito, y tampoco realizamos llamadas telefónicas comerciales tras tu visita.",
        },
        {
          num: "03",
          title: "Solo Horario Semanal (Responde STOP)",
          subtitle: "ORG. SIN FINES DE LUCRO 501(c)(3)",
          body: "Si lo autorizas, enviamos el calendario semanal del centro y avisos sencillos. Si prefieres no recibir más mensajes, responde STOP en cualquier momento.",
        },
      ],
    },
    journey: {
      eyebrow: "04 / Tu Primera Visita (55 Minutos)",
      title: "Qué ocurre al llegar al Suite #378.",
      subtitle:
        "Ten en cuenta que nuestro coordinador Kevin atiende llamadas solo en inglés y japonés; para español o chino, solicita tu visita por el formulario con antelación.",
      steps: [
        {
          stepNum: "01",
          duration: "MIN 00–10",
          title: "Bienvenida y Charla Tranquila",
          shortDesc: "Llegas, tomas asiento y conversamos sin prisas.",
          fullDesc:
            "Al subir en ascensor al 3.er piso te recibimos con agua o té. Escuchamos qué te trajo, respondemos tus dudas con sinceridad y confirmamos tus preferencias.",
          reassurance: "El teléfono (+1 626-861-5069) se atiende en inglés y japonés; solicita español aquí con anticipación.",
        },
        {
          stepNum: "02",
          duration: "MIN 10–45",
          title: "Chequeo Breve y Sesión de Luz",
          shortDesc: "Comprobación suave antes/después y ~30 min de Luz sentado.",
          fullDesc:
            "Sentado en silla, se palpan brevemente puntos tensos en cuello, hombros o espalda, se canaliza Luz a unos 30 cm durante unos 30 minutos y se vuelve a comprobar para notar el cambio.",
          reassurance: "Con ropa normal y calcetines; opción de practicante femenino o masculino.",
        },
        {
          stepNum: "03",
          duration: "MIN 45–55",
          title: "Pausa Final y Ofrenda Voluntaria",
          shortDesc: "Respira tranquilo y retírate cuando gustes.",
          fullDesc:
            "Comparte cómo te sientes si lo deseas. Quienes desean ofrecer gratitud a Dios colocan su donación voluntaria en la urna del santuario, sin compromisos adicionales.",
          reassurance: "Puedes detener los avisos semanales respondiendo STOP cuando desees.",
        },
      ],
    },
    hostMessage: {
      eyebrow: "Palabras desde el Centro",
      title: "Un lugar sereno en Los Ángeles donde simplemente puedes descansar.",
      quote: "“Media hora en calma basta a veces para recordar cómo se siente la paz interior.”",
      body1:
        "No importa tu historia personal ni si nunca has visitado un centro espiritual japonés; aquí siempre serás recibido con respeto.",
      body2:
        "Soy Kevin y coordino las visitas y llamadas en inglés y japonés. Si prefieres atención en español o chino, envía el formulario de abajo unos días antes para coordinar a un miembro bilingüe que te reciba personalmente.",
      body3: "Ven sin compromisos y descubre por ti mismo cómo se siente este espacio.",
      signatureName: "Kevin",
      signatureRole: "Coordinador Voluntario · Centro Los Ángeles (EN / JA)",
      cta: "Solicitar Visita en Español",
    },
    access: {
      eyebrow: "05 / Ubicación y Datos Prácticos",
      title: "Fácil acceso y estacionamiento gratuito en Monterey Park.",
      rows: [
        {
          label: "Dirección",
          value: "809 S Atlantic Blvd, Suite #378, Monterey Park, CA 91754",
          sub: "3.er piso · Acceso directo con elevador desde el lobby",
        },
        {
          label: "Horario",
          value: "Mar–Sáb: 10:00 AM – 6:00 PM · Dom: 9:00 AM – 4:00 PM (Cerrado los Lunes)",
          sub: "Con cita previa para asegurar atención en tu idioma",
        },
        {
          label: "Estacionamiento",
          value: "43 Espacios Gratuitos en el Estacionamiento de la Plaza",
          sub: "Acceso directo desde S Atlantic Blvd",
        },
        {
          label: "Teléfono e Idiomas",
          value: "+1 (626) 861-5069 · losangeles@worlddivinelight.org",
          sub: "Llamadas atendidas en inglés y japonés por Kevin. Español y chino con solicitud previa en el formulario.",
        },
      ],
      bannerTitle: "¿Necesitas ser atendido en Español o Chino?",
      bannerDesc:
        "Dado que nuestra línea telefónica se atiende únicamente en inglés y japonés, usa el formulario inferior para pedir confirmación con un miembro hispanohablante.",
      bannerCta: "Ir al Formulario",
    },
    booking: {
      eyebrow: "Reserva Directa",
      title: "Solicita Tu Visita en Monterey Park",
      subtitle: "Reserva directamente en esta página. Indica tu día, horario e idioma preferido.",
      phoneNoteTitle: "Aviso Importante sobre Idiomas",
      phoneNoteBody:
        "Las llamadas al +1 (626) 861-5069 son respondidas por Kevin solo en inglés y japonés. Para visitas en Español o Chino (中文), por favor envía este formulario con 1–2 días de anticipación para coordinar a un integrante bilingüe.",
      form: {
        fullName: "Nombre Completo",
        fullNamePlaceholder: "Tu nombre",
        email: "Correo Electrónico",
        emailPlaceholder: "tu@ejemplo.com",
        phone: "Teléfono",
        phonePlaceholder: "+1 (626) 555-0199",
        preferredDate: "Fecha Preferida",
        preferredTime: "Horario Preferido",
        timeOptions: [
          "Mañana (10:00 AM – 12:00 PM · Dom desde 9:00 AM)",
          "Mediodía (12:00 PM – 2:30 PM)",
          "Tarde (2:30 PM – 4:00 PM)",
          "Última Hora (Mar–Sáb 4:00 PM – 6:00 PM)",
        ],
        preferredLanguage: "Idioma Preferido",
        languageOptions: [
          { value: "English", label: "English (Inglés)" },
          { value: "Japanese", label: "Japanese (Japonés)" },
          { value: "Chinese", label: "Chinese / 中文 (Chino estándar · Solicitud previa)" },
          { value: "Spanish", label: "Español (Requiere solicitud previa)" },
        ],
        languageHint:
          "Atención telefónica solo en inglés y japonés; coordinamos apoyo en español al enviar este formulario.",
        practitionerPreference: "Preferencia de Practicante",
        practitionerOptions: [
          { value: "No preference", label: "Sin preferencia" },
          { value: "Female practitioner", label: "Practicante mujer" },
          { value: "Male practitioner", label: "Practicante hombre" },
        ],
        notes: "Notas o Preguntas (Opcional)",
        notesPlaceholder: "Indica si requieres atención en español, acceso para silla de ruedas o cualquier duda.",
        smsConsentPrefix:
          "Acepto recibir confirmaciones de cita por SMS y avisos semanales de horario de World Divine Light LA (responde STOP cuando quieras para cancelar). Consulta nuestra ",
        smsConsentPrivacyLink: "Política de Privacidad",
        smsConsentSuffix: ".",
        submit: "Enviar Solicitud de Visita",
        submitting: "Enviando...",
        validationNotice: "Por favor revisa los campos resaltados antes de enviar.",
        errorFallback:
          "No se pudo enviar en este momento. Escribe a losangeles@worlddivinelight.org o llama al +1 (626) 861-5069 (EN/JA).",
        medicalNotice:
          "Divulgación CA BPC § 2063: Esta es una práctica espiritual religiosa, no atención médica, diagnóstico ni psicoterapia. Consulta a un médico para asuntos de salud.",
        successTitle: "Solicitud Recibida",
        successBody:
          "Gracias. Kevin confirmará tu horario pronto y coordinará a un miembro hispanohablante si elegiste Español.",
        successReset: "Enviar Otra Solicitud",
      },
    },
    faq: {
      eyebrow: "06 / Preguntas Frecuentes",
      title: "12 respuestas claras antes de tu primera visita.",
      subtitle: "Información transparente sobre la sesión, contacto físico, donaciones, idiomas y acceso.",
      items: [
        {
          q: "¿Qué es el Arte de la Luz Divina (Okiyome)?",
          a: "Es una práctica espiritual donde una persona extiende la palma abierta para canalizar Luz Divina —amor puro de Dios— hacia otra persona sentada tranquilamente en una silla, basada en el principio Espíritu Primero, Mente Secundaria, Cuerpo Subordinado.",
        },
        {
          q: "¿Hay contacto físico durante la sesión?",
          a: "Aunque la Luz se irradia a unos 30 cm sin masajes, en todos los centros del mundo realizamos antes y después de la Luz una breve presión suave con la yema de los dedos en puntos comunes de tensión (hombros, cuello, frente, espalda) para que compruebes directamente cómo disminuye la rigidez.",
        },
        {
          q: "¿Puedo pedir practicante mujer u hombre?",
          a: "Sí. Puedes elegir practicante mujer, practicante hombre o sin preferencia directamente en el formulario de reserva de esta página.",
        },
        {
          q: "¿Cuál es el costo o cómo funcionan las donaciones?",
          a: "No hay precios fijos ni entradas. Todo funciona mediante donación voluntaria de agradecimiento a Dios (Okiyome Orei), y nunca vendemos productos ni mercancía.",
        },
        {
          q: "¿Qué pasa si deseo aprender a dar Luz por mí mismo?",
          a: "No hay ninguna presión para inscribirse. Si en el futuro decides asistir voluntariamente al Seminario Primario de 3 días (初級研修会), la ofrenda del seminario es de $160.",
        },
        {
          q: "¿Recibiré llamadas comerciales o presiones después?",
          a: "No. Nunca hacemos llamadas comerciales ni presionamos a nadie. Solo compartimos el calendario semanal del centro si aceptas recibir avisos, y puedes detenerlos en cualquier momento respondiendo STOP.",
        },
        {
          q: "¿En qué idiomas atienden?",
          a: "El coordinador voluntario Kevin atiende llamadas (+1 626-861-5069) y visitas regulares en inglés y japonés. Las visitas en Español o Chino se coordinan con gusto solicitándolas previamente en el formulario.",
        },
        {
          q: "¿Sustituye la atención médica o psicológica?",
          a: "No. Según el Código CA BPC § 2063, es estrictamente una práctica religiosa espiritual y no diagnóstico médico, quiropráctica ni psicoterapia.",
        },
        {
          q: "¿Debo pertenecer a alguna religión específica?",
          a: "No. Visitantes de cualquier creencia o sin afiliación religiosa son bienvenidos sin ninguna exigencia de conversión.",
        },
        {
          q: "¿Cuánto dura la visita y qué ropa debo llevar?",
          a: "Cuenta con unos 50–60 minutos en total. Ropa cómoda cotidiana y calcetines (quitamos los zapatos al entrar al santuario) son ideales.",
        },
        {
          q: "¿Hay estacionamiento y elevador?",
          a: "Sí, el edificio en 809 S Atlantic Blvd cuenta con 43 lugares gratuitos de estacionamiento y elevador directo al 3.er piso, Suite #378. Todas las sesiones se hacen en silla.",
        },
        {
          q: "¿Cómo cancelo una cita o dejo de recibir el horario semanal?",
          a: "Responde STOP a cualquier mensaje SMS, escribe a losangeles@worlddivinelight.org o llama al +1 (626) 861-5069 (EN/JA).",
        },
      ],
    },
    closing: {
      eyebrow: "Cuando Estés Listo",
      title: "Regálate un espacio de calma esta semana.",
      subtitle: "Monterey Park, CA · Mar–Sáb 10:00–18:00 · Dom 9:00–16:00 (Cerrado Lunes)",
      cta: "Solicitar Sesión",
    },
    footer: {
      centerDesc:
        "Centro espiritual sin fines de lucro 501(c)(3) en Monterey Park dedicado a compartir el Arte de la Luz Divina (Okiyome).",
      navHeading: "Navegación",
      accessHeading: "Ubicación y Contacto",
      hoursSummary: "Mar–Sáb 10:00 AM – 6:00 PM · Dom 9:00 AM – 4:00 PM (Cerrado Lunes)",
      phoneLabel: "+1 (626) 861-5069",
      phoneLangNote: "Llamadas en inglés y japonés (Español/Chino con solicitud previa)",
      disclaimerTitle: "Aviso Legal y Médico (CA BPC § 2063 / SB 577)",
      disclaimerBody:
        "El Arte de la Luz Divina (Okiyome) es una práctica religiosa espiritual sin fines de lucro basada en donaciones voluntarias. No constituye diagnóstico médico, terapia ni masaje. Consulta a un profesional médico licenciado para temas de salud.",
      privacyLink: "Política de Privacidad (CalOPPA)",
      accessibilityLink: "Accesibilidad (WCAG 2.1 AA)",
      copyright: "© 2026 World Divine Light — Los Angeles Spiritual Center. Todos los derechos reservados.",
    },
  },
};
