import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronDown, Mail, AlertCircle } from "lucide-react";
import OpeningSplash from "@/components/OpeningSplash";
import SmoothScroll from "@/components/SmoothScroll";
import HeaderControls from "@/components/HeaderControls";
import JourneySteps from "@/components/JourneySteps";
import BookingForm from "@/components/BookingForm";
import { LP_COPY, type Language } from "@/data/lpCopy";

const VALID_LANGS: readonly Language[] = ["en", "ja", "zh", "es"] as const;

function resolveLanguage(raw?: string | string[]): Language {
  const candidate = Array.isArray(raw) ? raw[0] : raw;
  if (candidate && (VALID_LANGS as readonly string[]).includes(candidate)) {
    return candidate as Language;
  }
  return "en";
}

interface HomePageProps {
  searchParams: Promise<{ lang?: string | string[] }>;
}

export default async function HomePage({ searchParams }: HomePageProps) {
  const resolved = await searchParams;
  const lang = resolveLanguage(resolved?.lang);
  const t = LP_COPY[lang];

  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": ["Organization", "PlaceOfWorship"],
    "@id": "https://la.worlddivinelight.org/#organization",
    name: `World Divine Light — ${t.nav.centerName}`,
    alternateName: "世界真光文明教団 ロサンゼルス道場",
    url: "https://la.worlddivinelight.org",
    email: "losangeles@worlddivinelight.org",
    telephone: "+1-626-861-5069",
    priceRange: "Donation-Based",
    description: t.footer.centerDesc,
    address: {
      "@type": "PostalAddress",
      streetAddress: "809 S Atlantic Blvd, Suite #378",
      addressLocality: "Monterey Park",
      addressRegion: "CA",
      postalCode: "91754",
      addressCountry: "US",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 34.0378,
      longitude: -118.1332,
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
        opens: "10:00",
        closes: "18:00",
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Sunday"],
        opens: "09:00",
        closes: "16:00",
      },
    ],
    availableLanguage: ["English", "Japanese", "Chinese", "Spanish"],
  };

  return (
    <div
      lang={lang}
      className="min-h-screen bg-[#FBF9F5] text-[#1A1816] selection:bg-[#DE7356]/20 selection:text-[#1A1816]"
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />

      <OpeningSplash />
      <SmoothScroll />

      {/* Skip Link */}
      <a href="#main-content" className="visually-hidden skip-link">
        {t.nav.skipToContent}
      </a>

      {/* Top Notification Bar */}
      <div className="w-full bg-[#1A1816] text-[#EFEAE1] text-[11px] sm:text-xs tracking-wide py-2 px-4 border-b border-white/10">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-1 sm:gap-4">
          <span className="text-center sm:text-left">{t.topBar}</span>
          <div className="flex flex-wrap items-center justify-center sm:justify-end gap-x-4 gap-y-1 text-[#C7BFB5] font-mono text-[10px] sm:text-[11px]">
            <span>{t.topBarHours}</span>
            <a href="tel:+16268615069" className="hover:text-white transition-colors">
              Tel: +1 (626) 861-5069
            </a>
          </div>
        </div>
      </div>

      {/* Sticky Header + Mobile Drawer */}
      <HeaderControls lang={lang} t={t} />

      <main id="main-content">
        {/* SECTION 01: YOSEMITE MISTY HERO */}
        <section
          id="hero"
          className="relative min-h-[82vh] sm:min-h-[86vh] flex items-end pb-16 sm:pb-24 pt-24 overflow-hidden bg-[#1A1816]"
        >
          <Image
            src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1920&q=85"
            alt="Serene misty mountain valley illuminated by quiet morning light"
            fill
            priority
            fetchPriority="high"
            sizes="100vw"
            className="object-cover object-center opacity-80"
          />
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-gradient-to-t from-[#1A1816]/90 via-[#1A1816]/50 to-[#1A1816]/75"
          />

          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <div className="max-w-3xl">
              <p className="inline-flex items-center gap-2 text-xs font-medium tracking-[0.16em] uppercase text-[#E8C594] bg-white/10 backdrop-blur-xs border border-white/15 px-3.5 py-1.5 rounded-full mb-6">
                {t.hero.badge}
              </p>

              <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-[#FBF9F5] leading-[1.12] tracking-tight mb-6">
                {t.hero.headlineLine1}
                <br />
                <span className="text-[#F3DFC1]">{t.hero.headlineLine2}</span>
              </h1>

              <p className="text-base sm:text-lg text-[#E6E0D6] leading-relaxed mb-8 max-w-2xl">
                {t.hero.subheadline}
              </p>

              <div className="flex flex-wrap items-center gap-3.5 mb-8">
                <a
                  href="#principle"
                  className="inline-flex items-center justify-center rounded-full bg-[#DE7356] hover:bg-[#C86348] text-white font-semibold text-sm sm:text-base px-6 sm:px-7 py-3.5 shadow-retro-btn transition-colors"
                >
                  {t.hero.primaryCta}
                </a>
                <a
                  href="#booking"
                  className="inline-flex items-center justify-center rounded-full bg-white/12 hover:bg-white/20 text-[#FBF9F5] border border-white/30 backdrop-blur-xs font-semibold text-sm sm:text-base px-6 sm:px-7 py-3.5 transition-colors"
                >
                  {t.hero.secondaryCta}
                </a>
              </div>

              <p className="text-xs sm:text-sm text-[#CFC8BE] tracking-wide">{t.hero.facts}</p>
            </div>
          </div>

          <div
            aria-hidden="true"
            className="hidden sm:flex absolute bottom-6 right-8 z-10 items-center gap-2 text-[10px] tracking-[0.24em] text-[#D8D1C7]"
          >
            <span>{t.hero.scrollCue}</span>
            <span className="w-8 h-px bg-[#D8D1C7]/60" />
          </div>
        </section>

        {/* SECTION 02: DILEMMA */}
        <section id="dilemma" className="bg-[#1A1816] text-[#FBF9F5] py-20 sm:py-28 border-t border-white/10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
              <div className="lg:col-span-6 space-y-6 reveal-up">
                <p className="text-xs font-semibold tracking-[0.2em] uppercase text-[#E8C594]">
                  {t.dilemma.eyebrow}
                </p>
                <h2 className="font-serif text-3xl sm:text-4xl font-bold leading-snug text-[#FBF9F5]">
                  {t.dilemma.title}
                </h2>
                <p className="text-sm sm:text-base text-[#D3CCC2] leading-relaxed">{t.dilemma.p1}</p>
                <p className="text-sm sm:text-base text-[#D3CCC2] leading-relaxed">{t.dilemma.p2}</p>

                <ul className="pt-2 space-y-3.5 list-none m-0 p-0">
                  {t.dilemma.points.map((pt, i) => (
                    <li
                      key={i}
                      className={`p-4 rounded-2xl bg-white/[0.04] border border-white/10 reveal-up stagger-${i + 1}`}
                    >
                      <h3 className="font-serif text-sm font-semibold text-[#F3DFC1] mb-1">
                        {pt.label}
                      </h3>
                      <p className="text-xs sm:text-sm text-[#C7BFB5] leading-relaxed">{pt.text}</p>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="lg:col-span-6 reveal-up stagger-2">
                <figure className="space-y-3">
                  <div className="rounded-3xl overflow-hidden border border-white/15 img-zoom-reveal shadow-2xl">
                    <Image
                      src="/assets/la_palm_trees.jpg"
                      alt="Palm trees under clear Los Angeles light near Monterey Park"
                      width={1024}
                      height={764}
                      sizes="(max-width: 1024px) 100vw, 50vw"
                      className="w-full h-[380px] sm:h-[460px] object-cover"
                    />
                  </div>
                  <figcaption className="text-xs text-[#A89F95] text-right">
                    {t.dilemma.caption}
                  </figcaption>
                </figure>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 03: SPIRIT PRIMARY DIAGRAM (#principle) */}
        <section id="principle" className="bg-[#FAF6F0] py-20 sm:py-28 border-b border-[#E5E0D8]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto text-center mb-12 reveal-up">
              <p className="text-xs font-semibold tracking-[0.2em] uppercase text-[#9A5B25] mb-3">
                {t.principleSection.eyebrow}
              </p>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#1A1816] mb-4">
                {t.principleSection.title}
              </h2>
              <p className="text-sm sm:text-base text-[#5C554F] leading-relaxed">
                {t.principleSection.subtitle}
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
              <div className="lg:col-span-7 reveal-up stagger-1">
                <figure className="rounded-3xl bg-white border border-[#E5E0D8] p-3 sm:p-5 shadow-retro">
                  <div className="rounded-2xl overflow-hidden bg-[#FAF6F0]">
                    <Image
                      src="/assets/spirit_primary_diagram.jpg"
                      alt={t.principleSection.diagramAlt}
                      width={896}
                      height={1200}
                      sizes="(max-width: 1024px) 100vw, 55vw"
                      className="w-full h-auto object-contain"
                    />
                  </div>
                  <figcaption className="pt-3 px-2 text-xs text-[#6C655E] leading-relaxed text-center">
                    {t.principleSection.diagramCaption}
                  </figcaption>
                </figure>
              </div>

              <ol className="lg:col-span-5 space-y-4 list-none m-0 p-0">
                {t.principleSection.stages.map((stage, i) => (
                  <li
                    key={i}
                    className={`rounded-2xl bg-white border border-[#E5E0D8] p-5 sm:p-6 shadow-retro reveal-up stagger-${i + 1}`}
                  >
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <span className="text-[11px] font-semibold tracking-[0.16em] uppercase text-[#9A5B25]">
                        {stage.step}
                      </span>
                      <span className="text-xs font-mono text-[#6C655E]">{stage.role}</span>
                    </div>
                    <h3 className="font-serif text-lg font-bold text-[#1A1816] mb-1.5">
                      {stage.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-[#5C554F] leading-relaxed">
                      {stage.desc}
                    </p>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </section>

        {/* SECTION 04: THE PRACTICE (#practice) */}
        <section id="practice" className="bg-[#FBF9F5] py-20 sm:py-28">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
              <div className="lg:col-span-6 space-y-6 reveal-up">
                <p className="text-xs font-semibold tracking-[0.2em] uppercase text-[#9A5B25]">
                  {t.practice.eyebrow}
                </p>
                <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#1A1816] leading-snug">
                  {t.practice.title}
                </h2>
                <p className="text-sm sm:text-base text-[#5C554F] leading-relaxed">{t.practice.p1}</p>
                <p className="text-sm sm:text-base text-[#5C554F] leading-relaxed">{t.practice.p2}</p>

                <div className="rounded-2xl bg-[#FAF6F0] border border-[#E5E0D8] p-5 space-y-2">
                  <h3 className="font-serif text-sm font-bold text-[#1A1816]">
                    {t.practice.noteTitle}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#5C554F] leading-relaxed">
                    {t.practice.noteBody}
                  </p>
                </div>

                <ul className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2 list-none m-0 p-0">
                  {t.practice.pillars.map((pillar, idx) => (
                    <li
                      key={idx}
                      className="rounded-2xl bg-white border border-[#E5E0D8] p-4 shadow-retro"
                    >
                      <h3 className="font-serif text-sm font-bold text-[#1A1816] mb-1.5">
                        {pillar.title}
                      </h3>
                      <p className="text-xs text-[#5C554F] leading-relaxed">{pillar.desc}</p>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="lg:col-span-6 space-y-6 reveal-up stagger-2">
                <div className="rounded-3xl overflow-hidden border border-[#E5E0D8] bg-white shadow-retro img-zoom-reveal">
                  <Image
                    src="/assets/okiyome_session.jpg"
                    alt={t.practice.sessionPhotoAlt}
                    width={1024}
                    height={764}
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="w-full h-64 sm:h-72 object-cover"
                  />
                </div>
                <figure className="rounded-3xl bg-white border border-[#E5E0D8] p-3 sm:p-4 shadow-retro">
                  <div className="rounded-2xl overflow-hidden bg-[#FAF6F0]">
                    <Image
                      src="/assets/okiyome_session_diagram.jpg"
                      alt={t.practice.diagramAlt}
                      width={1376}
                      height={768}
                      sizes="(max-width: 1024px) 100vw, 50vw"
                      className="w-full h-auto object-contain"
                    />
                  </div>
                  <figcaption className="pt-2.5 px-2 text-xs text-[#6C655E] leading-relaxed">
                    {t.practice.diagramCaption}
                  </figcaption>
                </figure>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 05: THREE TRANSPARENT COMMITMENTS (#principles) */}
        <section id="principles" className="bg-[#F4EFEA] border-y border-[#E5E0D8] py-20 sm:py-28">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mb-12 reveal-up">
              <p className="text-xs font-semibold tracking-[0.2em] uppercase text-[#9A5B25] mb-3">
                {t.commitments.eyebrow}
              </p>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#1A1816] mb-4">
                {t.commitments.title}
              </h2>
              <p className="text-sm sm:text-base text-[#5C554F] leading-relaxed">
                {t.commitments.subtitle}
              </p>
            </div>

            <ol className="grid grid-cols-1 md:grid-cols-3 border border-[#D8D0C4] rounded-3xl overflow-hidden bg-[#FBF9F5] shadow-retro list-none m-0 p-0">
              {t.commitments.cards.map((card, idx) => (
                <li
                  key={card.num}
                  className={`p-7 sm:p-8 flex flex-col justify-between reveal-up stagger-${idx + 1} ${
                    idx < 2 ? "border-b md:border-b-0 md:border-r border-[#E5E0D8]" : ""
                  }`}
                >
                  <div>
                    <p className="font-mono text-2xl font-bold text-[#DE7356] mb-4">{card.num}</p>
                    <p className="text-[11px] font-semibold tracking-[0.14em] uppercase text-[#6C655E] mb-2">
                      {card.subtitle}
                    </p>
                    <h3 className="font-serif text-xl font-bold text-[#1A1816] mb-3">
                      {card.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-[#5C554F] leading-relaxed">
                      {card.body}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* SECTION 06: FIRST 55 MINUTES JOURNEY (#journey — Note Step 1 has NO photo) */}
        <section id="journey" className="bg-[#FBF9F5] py-20 sm:py-28">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mb-12 reveal-up">
              <p className="text-xs font-semibold tracking-[0.2em] uppercase text-[#9A5B25] mb-3">
                {t.journey.eyebrow}
              </p>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#1A1816] mb-4">
                {t.journey.title}
              </h2>
              <p className="text-sm sm:text-base text-[#5C554F] leading-relaxed">
                {t.journey.subtitle}
              </p>
            </div>

            <JourneySteps steps={t.journey.steps} />
          </div>
        </section>

        {/* SECTION 07: WORDS FROM THE CENTER */}
        <section className="bg-[#FAF6F0] border-y border-[#E5E0D8] py-20 sm:py-24">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 reveal-up">
            <div className="rounded-3xl bg-white border border-[#E5E0D8] p-7 sm:p-12 shadow-retro grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
              <div className="md:col-span-4 flex flex-col items-center text-center">
                <div className="w-36 h-36 sm:w-44 sm:h-44 rounded-full overflow-hidden border-4 border-[#FAF6F0] shadow-md mb-4">
                  <Image
                    src="/assets/staff_host.jpg"
                    alt={t.hostMessage.signatureName}
                    width={764}
                    height={1024}
                    sizes="176px"
                    className="w-full h-full object-cover"
                  />
                </div>
                <p className="font-serif font-bold text-base text-[#1A1816]">
                  {t.hostMessage.signatureName}
                </p>
                <p className="text-xs text-[#6C655E] mt-1">{t.hostMessage.signatureRole}</p>
              </div>

              <div className="md:col-span-8 space-y-4">
                <p className="text-xs font-semibold tracking-[0.2em] uppercase text-[#9A5B25]">
                  {t.hostMessage.eyebrow}
                </p>
                <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#1A1816] leading-snug">
                  {t.hostMessage.title}
                </h2>
                <blockquote className="font-serif italic text-base sm:text-lg text-[#5C554F] border-l-2 border-[#DE7356] pl-4 py-1">
                  {t.hostMessage.quote}
                </blockquote>
                <p className="text-xs sm:text-sm text-[#5C554F] leading-relaxed">{t.hostMessage.body1}</p>
                <p className="text-xs sm:text-sm text-[#5C554F] leading-relaxed">{t.hostMessage.body2}</p>
                <p className="text-xs sm:text-sm text-[#5C554F] leading-relaxed">{t.hostMessage.body3}</p>
                <div className="pt-2">
                  <a
                    href="#booking"
                    className="inline-flex items-center justify-center rounded-full bg-[#1A1816] hover:bg-[#322E2A] text-[#FBF9F5] text-xs sm:text-sm font-semibold px-6 py-3 transition-colors"
                  >
                    {t.hostMessage.cta}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 08: ACCESS & PRACTICAL DETAILS (#access — Semantic <table>) */}
        <section id="access" className="bg-[#FBF9F5] py-20 sm:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mb-10 reveal-up">
              <p className="text-xs font-semibold tracking-[0.2em] uppercase text-[#9A5B25] mb-3">
                {t.access.eyebrow}
              </p>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#1A1816]">
                {t.access.title}
              </h2>
            </div>

            <div className="rounded-3xl bg-white border border-[#E5E0D8] shadow-retro overflow-hidden mb-10 reveal-up stagger-1">
              <table className="w-full text-left border-collapse block md:table">
                <caption className="visually-hidden">{t.access.title}</caption>
                <tbody className="block md:table-row-group divide-y divide-[#E5E0D8]">
                  {t.access.rows.map((row, idx) => (
                    <tr
                      key={idx}
                      className="block md:table-row hover:bg-[#FAF6F0]/60 transition-colors"
                    >
                      <th
                        scope="row"
                        className="block md:table-cell md:w-56 px-6 pt-5 pb-1 md:py-6 text-[11px] font-semibold tracking-[0.14em] uppercase text-[#6C655E] align-top"
                      >
                        {row.label}
                      </th>
                      <td className="block md:table-cell px-6 pb-2 md:py-6 font-serif text-sm sm:text-base font-bold text-[#1A1816] align-top">
                        {row.value}
                      </td>
                      <td className="block md:table-cell px-6 pb-5 md:py-6 text-xs sm:text-sm text-[#5C554F] leading-relaxed align-top">
                        {row.sub}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="rounded-3xl bg-[#1A1816] text-[#FBF9F5] p-7 sm:p-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 reveal-up">
              <div className="space-y-2 max-w-2xl">
                <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#F3DFC1]">
                  {t.access.bannerTitle}
                </h3>
                <p className="text-xs sm:text-sm text-[#D3CCC2] leading-relaxed">
                  {t.access.bannerDesc}
                </p>
              </div>
              <a
                href="#booking"
                className="shrink-0 rounded-full bg-[#DE7356] hover:bg-[#C86348] text-white text-sm font-semibold px-6 py-3.5 shadow-retro-btn transition-colors"
              >
                {t.access.bannerCta}
              </a>
            </div>
          </div>
        </section>

        {/* SECTION 09: EMBEDDED INLINE RESERVATION FORM (#booking) */}
        <section id="booking" className="bg-[#FAF6F0] border-y border-[#E5E0D8] py-20 sm:py-28">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-10 reveal-up">
              <p className="text-xs font-semibold tracking-[0.2em] uppercase text-[#9A5B25] mb-3">
                {t.booking.eyebrow}
              </p>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#1A1816] mb-4">
                {t.booking.title}
              </h2>
              <p className="text-sm sm:text-base text-[#5C554F] leading-relaxed max-w-2xl mx-auto">
                {t.booking.subtitle}
              </p>
            </div>

            <div className="rounded-2xl bg-[#FBF5EB] border border-[#E5D3B3] p-4 sm:p-5 mb-8 flex items-start gap-3.5 reveal-up">
              <AlertCircle className="w-5 h-5 text-[#9A5B25] shrink-0 mt-0.5" aria-hidden="true" />
              <div className="text-xs sm:text-sm text-[#3F3833] leading-relaxed">
                <h3 className="font-semibold text-[#1A1816] mb-1">{t.booking.phoneNoteTitle}</h3>
                <p>{t.booking.phoneNoteBody}</p>
              </div>
            </div>

            <BookingForm lang={lang} copy={t.booking.form} />
          </div>
        </section>

        {/* SECTION 10: 12-ITEM NATIVE <details> FAQ ACCORDION (#faq) */}
        <section id="faq" className="bg-[#FBF9F5] py-20 sm:py-28">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12 reveal-up">
              <p className="text-xs font-semibold tracking-[0.2em] uppercase text-[#9A5B25] mb-3">
                {t.faq.eyebrow}
              </p>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#1A1816] mb-3">
                {t.faq.title}
              </h2>
              <p className="text-sm sm:text-base text-[#5C554F]">{t.faq.subtitle}</p>
            </div>

            <ul className="space-y-3 list-none m-0 p-0">
              {t.faq.items.map((item, idx) => (
                <li key={idx}>
                  <details className="faq-item group rounded-2xl bg-white border border-[#E5E0D8] px-5 sm:px-6 py-4 shadow-retro">
                    <summary className="flex items-center justify-between gap-4 cursor-pointer font-serif text-sm sm:text-base font-bold text-[#1A1816]">
                      <span className="flex items-start gap-3">
                        <span className="font-mono text-xs text-[#9A5B25] mt-1 shrink-0">
                          {String(idx + 1).padStart(2, "0")}
                        </span>
                        <span>{item.q}</span>
                      </span>
                      <ChevronDown
                        className="faq-chevron w-4 h-4 text-[#6C655E] shrink-0"
                        aria-hidden="true"
                      />
                    </summary>
                    <div className="pt-3 pl-7 text-xs sm:text-sm text-[#5C554F] leading-relaxed border-t border-[#F0EAE0] mt-3">
                      {item.a}
                    </div>
                  </details>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* SECTION 11: CLOSING DARK OCEAN CTA */}
        <section className="relative py-24 sm:py-32 bg-[#1A1816] text-[#FBF9F5] overflow-hidden">
          <Image
            src="/assets/ocean_light.jpg"
            alt="Quiet Pacific ocean horizon at dusk"
            fill
            sizes="100vw"
            className="object-cover opacity-55"
          />
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-gradient-to-b from-[#1A1816]/75 via-[#1A1816]/65 to-[#1A1816]/85"
          />

          <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 text-center space-y-6 reveal-up">
            <p className="text-xs font-semibold tracking-[0.22em] uppercase text-[#E8C594]">
              {t.closing.eyebrow}
            </p>
            <h2 className="font-serif text-3xl sm:text-5xl font-bold leading-tight text-[#FBF9F5]">
              {t.closing.title}
            </h2>
            <p className="text-xs sm:text-sm text-[#D8D1C7] tracking-wide">
              {t.closing.subtitle}
            </p>
            <div className="pt-2">
              <a
                href="#booking"
                className="inline-flex items-center justify-center rounded-full bg-[#DE7356] hover:bg-[#C86348] text-white font-semibold text-sm sm:text-base px-8 py-4 shadow-retro-btn transition-colors"
              >
                {t.closing.cta}
              </a>
            </div>
          </div>
        </section>
      </main>

      {/* DARK EDITORIAL FOOTER (#0E0D0C) */}
      <footer className="bg-[#0E0D0C] text-[#D3CCC2] pt-16 pb-12 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
            <div className="md:col-span-5 space-y-4">
              <div className="flex items-center gap-3">
                <Image
                  src="/assets/wdl_logo.png"
                  alt="World Divine Light"
                  width={1024}
                  height={372}
                  className="h-7 w-auto brightness-0 invert"
                />
                <span className="font-serif text-base font-semibold text-[#FBF9F5]">
                  {t.nav.centerName}
                </span>
              </div>
              <p className="text-xs sm:text-sm text-[#A89F95] leading-relaxed max-w-md">
                {t.footer.centerDesc}
              </p>
            </div>

            <div className="md:col-span-3">
              <h2 className="text-xs font-semibold tracking-[0.16em] uppercase text-[#E8C594] mb-4">
                {t.footer.navHeading}
              </h2>
              <nav aria-label="Footer Navigation">
                <ul className="space-y-2 list-none m-0 p-0">
                  {t.nav.items.map((item) => (
                    <li key={item.num}>
                      <a
                        href={item.href}
                        className="block text-xs text-[#C7BFB5] hover:text-[#FBF9F5] transition-colors"
                      >
                        {item.num} · {item.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>

            <div className="md:col-span-4 space-y-2.5 text-xs text-[#C7BFB5]">
              <h2 className="text-xs font-semibold tracking-[0.16em] uppercase text-[#E8C594] mb-3">
                {t.footer.accessHeading}
              </h2>
              <p className="text-[#FBF9F5] font-medium">
                809 S Atlantic Blvd, Suite #378, Monterey Park, CA 91754
              </p>
              <p>{t.footer.hoursSummary}</p>
              <p className="pt-1">
                <a href="tel:+16268615069" className="text-[#F3DFC1] hover:underline font-medium">
                  {t.footer.phoneLabel}
                </a>
                <span className="block text-[11px] text-[#9E958B] mt-0.5">
                  {t.footer.phoneLangNote}
                </span>
              </p>
              <p>
                <a
                  href="mailto:losangeles@worlddivinelight.org"
                  className="inline-flex items-center gap-1.5 text-[#F3DFC1] hover:underline"
                >
                  <Mail className="w-3.5 h-3.5" aria-hidden="true" />
                  losangeles@worlddivinelight.org
                </a>
              </p>
            </div>
          </div>

          <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-5 text-[11px] text-[#A89F95] leading-relaxed space-y-1.5">
            <h3 className="font-semibold text-[#E6E0D6]">{t.footer.disclaimerTitle}</h3>
            <p>{t.footer.disclaimerBody}</p>
          </div>

          <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-[#8E867D]">
            <p>{t.footer.copyright}</p>
            <div className="flex items-center gap-5">
              <Link href="/privacy" className="hover:text-[#FBF9F5] underline">
                {t.footer.privacyLink}
              </Link>
              <Link href="/accessibility" className="hover:text-[#FBF9F5] underline">
                {t.footer.accessibilityLink}
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
