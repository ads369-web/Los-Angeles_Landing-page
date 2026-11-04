"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";

// ============================================================================
// Types & Interfaces
// ============================================================================
type Language = "ja" | "en";

interface BookingFormState {
  fullName: string;
  email: string;
  phone: string;
  preferredDate: string;
  preferredTime: string;
  partySize: string;
  notes: string;
}

// ============================================================================
// SVG Micro-Icons (Zero external dependencies, clean hairline style)
// ============================================================================
const Icons = {
  ArrowRight: ({ className = "w-4 h-4" }: { className?: string }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <line x1="5" y1="12" x2="19" y2="12"></line>
      <polyline points="12 5 19 12 12 19"></polyline>
    </svg>
  ),
  ArrowUpRight: ({ className = "w-4 h-4" }: { className?: string }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <line x1="7" y1="17" x2="17" y2="7"></line>
      <polyline points="7 7 17 7 17 17"></polyline>
    </svg>
  ),
  Check: ({ className = "w-4 h-4" }: { className?: string }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12"></polyline>
    </svg>
  ),
  Plus: ({ className = "w-4 h-4" }: { className?: string }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <line x1="12" y1="5" x2="12" y2="19"></line>
      <line x1="5" y1="12" x2="19" y2="12"></line>
    </svg>
  ),
  Minus: ({ className = "w-4 h-4" }: { className?: string }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <line x1="5" y1="12" x2="19" y2="12"></line>
    </svg>
  ),
  Phone: ({ className = "w-4 h-4" }: { className?: string }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
    </svg>
  ),
  Mail: ({ className = "w-4 h-4" }: { className?: string }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
      <polyline points="22,6 12,13 2,6"></polyline>
    </svg>
  ),
  MapPin: ({ className = "w-4 h-4" }: { className?: string }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
      <circle cx="12" cy="10" r="3"></circle>
    </svg>
  ),
  Clock: ({ className = "w-4 h-4" }: { className?: string }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10"></circle>
      <polyline points="12 6 12 12 16 14"></polyline>
    </svg>
  ),
  X: ({ className = "w-5 h-5" }: { className?: string }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="18" y1="6" x2="6" y2="18"></line>
      <line x1="6" y1="6" x2="18" y2="18"></line>
    </svg>
  ),
  ShieldCheck: ({ className = "w-5 h-5" }: { className?: string }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
      <polyline points="9 12 11 14 15 10"></polyline>
    </svg>
  ),
};

// ============================================================================
// Main Page Component
// ============================================================================
export default function Home() {
  const [lang, setLang] = useState<Language>("ja");
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [activeStep, setActiveStep] = useState<number>(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);

  // Booking Form State
  const [formData, setFormData] = useState<BookingFormState>({
    fullName: "",
    email: "",
    phone: "",
    preferredDate: "",
    preferredTime: "11:00 AM",
    partySize: "1",
    notes: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleBookingSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus("idle");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.fullName,
          email: formData.email,
          preferredTime: `${formData.preferredDate} ${formData.preferredTime} (Phone: ${formData.phone})`,
          message: formData.notes || "Free Introduction Session requested via Los Angeles Landing Page.",
        }),
      });

      if (res.ok) {
        setSubmitStatus("success");
        // Trigger Google Ads conversion tracking if available
        if (typeof window !== "undefined" && (window as unknown as { gtag?: (...args: unknown[]) => void }).gtag) {
          (window as unknown as { gtag: (...args: unknown[]) => void }).gtag("event", "conversion", {
            send_to: "AW-853490942/rYqNCMjM_vYZEN7b_5YD",
          });
        }
      } else {
        setSubmitStatus("error");
      }
    } catch {
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsModalOpen(false);
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <div className="relative min-h-screen bg-[#FBF9F5] text-[#24211D] font-sans selection:bg-[#DE7356]/20 selection:text-[#24211D] antialiased">
      
      {/* ====================================================================
          TOP NOTIFICATION BAR (Nonprofit Status & Location)
          ==================================================================== */}
      <div className="w-full bg-[#1A1816] text-[#A69F96] text-[11px] sm:text-xs tracking-wider uppercase py-2 px-4 border-b border-[#2C2825]">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-1 sm:gap-4 font-mono">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#DE7356] inline-block animate-pulse"></span>
            <span>
              {lang === "ja"
                ? "米国政府公認 501(c)(3) 非営利法人 ｜ カリフォルニア州モントレーパーク"
                : "US 501(c)(3) Nonprofit Spiritual Organization ｜ Monterey Park, California"}
            </span>
          </div>
          <div className="hidden sm:flex items-center gap-4 text-[#8C857D]">
            <span>Tue–Sat 10:00–18:00 ｜ Sun 9:00–16:00</span>
            <a href="tel:+16268615069" className="hover:text-white transition-colors">Tel: +1 (626) 861-5069</a>
          </div>
        </div>
      </div>

      {/* ====================================================================
          STICKY HEADER & NAVIGATION
          ==================================================================== */}
      <header className="sticky top-0 z-40 w-full bg-[#FBF9F5]/90 backdrop-blur-md border-b border-[#EAE3D9] transition-all duration-200">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 h-18 sm:h-20 flex items-center justify-between">
          
          {/* Logo / Brand Name */}
          <a href="#" className="flex items-center gap-3 group">
            <div className="relative w-9 h-9 rounded-full overflow-hidden bg-[#1A1816] flex items-center justify-center transition-transform duration-300 group-hover:scale-105">
              <Image
                src="/assets/wdl_logo.png"
                alt="World Divine Light Logo"
                width={36}
                height={36}
                className="object-contain"
                onError={(e) => {
                  (e.target as HTMLElement).style.display = "none";
                }}
              />
              <span className="text-white text-xs font-mono font-medium">WDL</span>
            </div>
            <div className="flex flex-col">
              <span className="text-sm sm:text-base font-semibold tracking-tight text-[#1A1816] font-serif">
                Los Angeles Divine Light Center
              </span>
              <span className="text-[10px] tracking-widest text-[#7C756B] uppercase font-mono">
                World Divine Light Organization
              </span>
            </div>
          </a>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-8 text-xs font-mono tracking-widest uppercase text-[#544D44]">
            <a href="#dilemma" className="hover:text-[#DE7356] transition-colors">01 / Dilemma</a>
            <a href="#practice" className="hover:text-[#DE7356] transition-colors">02 / Tekazashi</a>
            <a href="#principles" className="hover:text-[#DE7356] transition-colors">03 / Integrity</a>
            <a href="#journey" className="hover:text-[#DE7356] transition-colors">04 / 55-Min Walk</a>
            <a href="#access" className="hover:text-[#DE7356] transition-colors">05 / Location</a>
            <a href="#faq" className="hover:text-[#DE7356] transition-colors">06 / FAQ</a>
          </nav>

          {/* Right Action: Language Switch + Reserve CTA */}
          <div className="flex items-center gap-3 sm:gap-5">
            {/* Language Toggle */}
            <div className="flex items-center border border-[#DDD4C7] rounded-full p-0.5 text-xs font-mono bg-[#F2EDE4]/60">
              <button
                type="button"
                onClick={() => setLang("ja")}
                className={`px-2.5 py-1 rounded-full transition-all text-[11px] font-medium cursor-pointer ${
                  lang === "ja" ? "bg-[#1A1816] text-[#FBF9F5] shadow-xs" : "text-[#7C756B] hover:text-[#1A1816]"
                }`}
                aria-label="Switch to Japanese"
              >
                JA
              </button>
              <button
                type="button"
                onClick={() => setLang("en")}
                className={`px-2.5 py-1 rounded-full transition-all text-[11px] font-medium cursor-pointer ${
                  lang === "en" ? "bg-[#1A1816] text-[#FBF9F5] shadow-xs" : "text-[#7C756B] hover:text-[#1A1816]"
                }`}
                aria-label="Switch to English"
              >
                EN
              </button>
            </div>

            {/* Primary Action Button */}
            <button
              onClick={() => {
                setSubmitStatus("idle");
                setIsModalOpen(true);
              }}
              className="hidden sm:inline-flex items-center gap-2 bg-[#1A1816] hover:bg-[#DE7356] text-[#FBF9F5] text-xs font-mono uppercase tracking-wider px-5 py-2.5 rounded-full transition-all duration-300 shadow-sm hover:shadow-md cursor-pointer"
            >
              <span>{lang === "ja" ? "無料体験を予約" : "Reserve Free Session"}</span>
              <Icons.ArrowUpRight className="w-3.5 h-3.5" />
            </button>

            {/* Mobile Hamburger Button */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-[#1A1816] hover:text-[#DE7356] focus:outline-none cursor-pointer"
              aria-label="Toggle Mobile Menu"
            >
              <div className="w-5 h-4 flex flex-col justify-between">
                <span className={`h-0.5 w-full bg-current transition-transform duration-200 ${mobileMenuOpen ? "rotate-45 translate-y-1.5" : ""}`}></span>
                <span className={`h-0.5 w-full bg-current transition-opacity duration-200 ${mobileMenuOpen ? "opacity-0" : ""}`}></span>
                <span className={`h-0.5 w-full bg-current transition-transform duration-200 ${mobileMenuOpen ? "-rotate-45 -translate-y-1.5" : ""}`}></span>
              </div>
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-[#FBF9F5] border-b border-[#EAE3D9] px-6 py-6 shadow-lg">
            <nav className="flex flex-col gap-4 text-xs font-mono tracking-widest uppercase text-[#544D44]">
              <a href="#dilemma" onClick={() => setMobileMenuOpen(false)} className="py-1 hover:text-[#DE7356]">01 / Dilemma</a>
              <a href="#practice" onClick={() => setMobileMenuOpen(false)} className="py-1 hover:text-[#DE7356]">02 / Tekazashi</a>
              <a href="#principles" onClick={() => setMobileMenuOpen(false)} className="py-1 hover:text-[#DE7356]">03 / Integrity</a>
              <a href="#journey" onClick={() => setMobileMenuOpen(false)} className="py-1 hover:text-[#DE7356]">04 / 55-Min Walk</a>
              <a href="#access" onClick={() => setMobileMenuOpen(false)} className="py-1 hover:text-[#DE7356]">05 / Location</a>
              <a href="#faq" onClick={() => setMobileMenuOpen(false)} className="py-1 hover:text-[#DE7356]">06 / FAQ</a>
            </nav>
            <div className="mt-6 pt-5 border-t border-[#EAE3D9]">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  setSubmitStatus("idle");
                  setIsModalOpen(true);
                }}
                className="w-full flex items-center justify-center gap-2 bg-[#1A1816] text-[#FBF9F5] text-xs font-mono uppercase tracking-wider py-3 rounded-full cursor-pointer"
              >
                <span>{lang === "ja" ? "無料体験セッションを予約" : "Reserve Free Session"}</span>
                <Icons.ArrowUpRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </header>

      {/* ====================================================================
          SECTION 01: HERO / FIRST VIEW
          Aesthetic: kanazawa-c.co.jp + atami-sanga.jp (Stillness & Vast Landscape)
          ==================================================================== */}
      <section className="relative min-h-[92vh] sm:min-h-screen flex items-end justify-start overflow-hidden bg-[#121110]">
        
        {/* Full Landscape Visual with atmospheric layering */}
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=2400&q=85"
            alt="Sanctuary Landscape - Morning light breaking over quiet ridges"
            fill
            priority
            className="object-cover object-center scale-102 transition-transform duration-1000 ease-out brightness-[0.78] contrast-[1.08]"
          />
          {/* Subtle gradient vignette to emulate atami-sanga deep room frame */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#121110] via-[#121110]/40 to-black/30"></div>
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,0)_0%,rgba(18,17,16,0.6)_100%)]"></div>
        </div>

        {/* Editorial Frame Hairline Overlay */}
        <div className="absolute inset-4 sm:inset-8 border border-white/10 pointer-events-none z-10 hidden sm:block"></div>

        {/* Content Container */}
        <div className="relative z-20 max-w-7xl w-full mx-auto px-6 sm:px-12 pb-16 sm:pb-24 pt-32">
          
          {/* Badge & Monospace Meta */}
          <div className="flex flex-wrap items-center gap-3 mb-6 sm:mb-8 text-white/80 font-mono text-xs tracking-widest uppercase">
            <span className="px-3 py-1 rounded-full border border-white/20 bg-black/40 backdrop-blur-sm">
              Monterey Park, CA
            </span>
            <span className="hidden sm:inline-block text-white/40">/</span>
            <span className="text-white/70">
              {lang === "ja" ? "手かざし（Art of Divine Light）体験所" : "Authentic Japanese Tekazashi Practice"}
            </span>
          </div>

          {/* Main Hero Typography */}
          <div className="max-w-4xl space-y-4 sm:space-y-6">
            <h1 className="text-4xl sm:text-6xl md:text-7xl font-serif font-light text-white tracking-tight leading-[1.12]">
              {lang === "ja" ? (
                <>
                  <span className="block text-2xl sm:text-3xl font-mono tracking-widest text-[#E3A387] mb-2 uppercase font-light">
                    Back to the Origin
                  </span>
                  喧騒を脱ぎ、
                  <br />
                  本来の澄みわたる自分へ。
                </>
              ) : (
                <>
                  <span className="block text-xl sm:text-2xl font-mono tracking-widest text-[#E3A387] mb-2 uppercase font-light">
                    Sanctuary of Light & Stillness
                  </span>
                  Back to the Origin.
                  <br />
                  <span className="italic font-light text-[#E8E2D7]">Return to your unburdened self.</span>
                </>
              )}
            </h1>

            {/* Hairline Divider */}
            <div className="w-16 h-px bg-[#DE7356]"></div>

            {/* Subcopy */}
            <p className="max-w-2xl text-sm sm:text-base md:text-lg text-[#D6CFBE] font-light leading-relaxed">
              {lang === "ja" ? (
                "ロサンゼルスの日常で、知らず知らずのうちに積み重なる心身の重荷。言葉や思考を休め、ただ静かに光に身を委ねる。非接触の手かざし（Art of Divine Light）が、魂の奥底にある澄んだ静けさを呼び覚まします。"
              ) : (
                "Beyond the constant rush of the city lies a sacred space to pause. Experience tekazashi—the gentle, non-contact Art of Divine Light. Let go of accumulated fatigue, align with nature’s rhythm, and return to your peaceful, unburdened self."
              )}
            </p>

            {/* CTA Group */}
            <div className="pt-4 sm:pt-6 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <button
                onClick={() => {
                  setSubmitStatus("idle");
                  setIsModalOpen(true);
                }}
                className="inline-flex items-center justify-center gap-3 bg-[#DE7356] hover:bg-[#C86348] text-white px-8 py-4 rounded-full font-mono text-xs uppercase tracking-widest transition-all duration-300 shadow-lg hover:shadow-xl hover:translate-y-[-1px] cursor-pointer"
              >
                <span>{lang === "ja" ? "無料体験セッションを予約する" : "Reserve a Free Session"}</span>
                <Icons.ArrowRight className="w-4 h-4" />
              </button>

              <a
                href="#dilemma"
                className="inline-flex items-center justify-center gap-2 border border-white/20 hover:border-white/40 text-white/90 hover:text-white px-6 py-4 rounded-full font-mono text-xs uppercase tracking-widest transition-colors backdrop-blur-xs"
              >
                <span>{lang === "ja" ? "手かざしの本質を知る" : "Discover the Principle"}</span>
                <Icons.ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Bottom Indicators */}
          <div className="mt-16 sm:mt-24 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs font-mono text-white/50 tracking-wider">
            <div className="flex items-center gap-3">
              <span className="w-2 h-2 rounded-full bg-[#DE7356]"></span>
              <span>100% NON-PROFIT 501(C)(3) ｜ NEVER A FEE OR OBLIGATION</span>
            </div>
            <a href="#dilemma" className="inline-flex items-center gap-2 text-white/70 hover:text-white transition-colors">
              <span>( Scroll Down ↓ )</span>
            </a>
          </div>

        </div>
      </section>

      {/* ====================================================================
          SECTION 02: THE MODERN DILEMMA / EMPATHY
          Aesthetic: atami-sanga.jp (Dark-to-Light Sanctuary & Nature Window Frame)
          ==================================================================== */}
      <section id="dilemma" className="relative py-28 sm:py-36 bg-[#1A1816] text-[#F4EFEA] overflow-hidden">
        
        {/* Subtle Background Texture */}
        <div className="absolute inset-0 opacity-5 pointer-events-none bg-[radial-gradient(#F4EFEA_1px,transparent_1px)] [background-size:24px_24px]"></div>

        <div className="max-w-7xl mx-auto px-6 sm:px-12 relative z-10">
          
          {/* Section Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-12 border-b border-[#35302A]">
            <div>
              <div className="text-xs font-mono tracking-widest uppercase text-[#DE7356] mb-3">
                01 / THE PARADOX OF THE METROPOLIS
              </div>
              <h2 className="text-2xl sm:text-4xl md:text-5xl font-serif font-light tracking-tight leading-tight max-w-3xl">
                {lang === "ja" ? (
                  "情報とスピードに満ちた街で、なぜ心は静けさを求めるのか。"
                ) : (
                  "In a World of Constant Movement, Where Does the Soul Find Rest?"
                )}
              </h2>
            </div>
            <div className="text-xs font-mono text-[#A89F94] tracking-widest uppercase">
              LOS ANGELES CONTEXT
            </div>
          </div>

          {/* Grid Layout: Framed Sanctuary Nature View */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 sm:gap-16 items-center pt-14">
            
            {/* Left: Window Frame Photography */}
            <div className="lg:col-span-5 order-2 lg:order-1">
              <div className="relative rounded-2xl overflow-hidden border border-[#3E3832] bg-[#121110] p-3 sm:p-4 shadow-2xl group">
                <div className="relative aspect-[4/5] rounded-xl overflow-hidden">
                  <Image
                    src="/assets/la_palm_trees.jpg"
                    alt="Quiet sunlight through tree canopy in Los Angeles"
                    fill
                    className="object-cover object-center group-hover:scale-103 transition-transform duration-700 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                  
                  <div className="absolute bottom-4 left-4 right-4 text-xs font-mono text-white/80 backdrop-blur-md bg-black/40 px-3 py-2 rounded-lg border border-white/10 flex justify-between">
                    <span>Frame: Sanctuary Stillness</span>
                    <span>34.0522° N, 118.2437° W</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Thoughtful Typography and Analysis */}
            <div className="lg:col-span-7 order-1 lg:order-2 space-y-6 sm:space-y-8">
              
              <div className="space-y-5 text-base sm:text-lg text-[#C8BFB2] leading-relaxed font-light">
                {lang === "ja" ? (
                  <>
                    <p className="text-xl sm:text-2xl text-[#F4EFEA] font-serif leading-snug">
                      車列の途切れないフリーウェイ、絶え間なく鳴る通知、常に成果を求められる日常。
                    </p>
                    <p>
                      便利で豊かな暮らしのただ中にありながら、私たちはどこかで拭いきれない「深い重さ」を抱えています。
                    </p>
                    <p>
                      それは単なる肉体の疲労ではありません。大自然のリズムから切り離され、見えない澱（おり）のように心と魂に蓄積した「日々の摩擦と過剰なノイズ」です。
                    </p>
                    <div className="p-6 rounded-xl bg-[#23201C] border border-[#3A342D] space-y-2">
                      <p className="text-sm font-mono uppercase tracking-widest text-[#DE7356]">
                        Like Water Settling When Undisturbed
                      </p>
                      <p className="text-[#E6E0D5] font-serif italic text-base">
                        砂が風に撫でられ、水が澄んでいくように。今、私たちに必要なのは、何かを足すことではなく、ただ静かに洗い流し、本来の自分へと還る時間です。
                      </p>
                    </div>
                  </>
                ) : (
                  <>
                    <p className="text-xl sm:text-2xl text-[#F4EFEA] font-serif leading-snug">
                      Surrounded by endless highways, digital alerts, and constant demands, we carry an unshakeable inner fatigue.
                    </p>
                    <p>
                      It is more than physical exhaustion—it is the subtle weight of disconnect from natural stillness. In a metropolis that rarely sleeps, our senses remain perpetually engaged.
                    </p>
                    <div className="p-6 rounded-xl bg-[#23201C] border border-[#3A342D] space-y-2">
                      <p className="text-sm font-mono uppercase tracking-widest text-[#DE7356]">
                        A Sacred Pause to Clarify
                      </p>
                      <p className="text-[#E6E0D5] font-serif italic text-base">
                        Just as water settles when undisturbed, your spirit requires a sacred pause to clarify and breathe. We do not need more stimuli; we need the grace to let go.
                      </p>
                    </div>
                  </>
                )}
              </div>

              {/* Data points */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-4 border-t border-[#35302A] text-xs font-mono">
                <div className="space-y-1">
                  <div className="text-[#877E73] uppercase">Approach</div>
                  <div className="text-[#F4EFEA] font-medium">Non-Contact (30cm)</div>
                </div>
                <div className="space-y-1">
                  <div className="text-[#877E73] uppercase">Environment</div>
                  <div className="text-[#F4EFEA] font-medium">Total Quietude</div>
                </div>
                <div className="space-y-1 col-span-2 sm:col-span-1">
                  <div className="text-[#877E73] uppercase">Objective</div>
                  <div className="text-[#DE7356] font-medium">Spiritual Harmony</div>
                </div>
              </div>

            </div>

          </div>

        </div>
      </section>

      {/* ====================================================================
          SECTION 03: THE PRACTICE / OKIYOME
          Aesthetic: Clean minimalist architectural space & sincere explanation
          ==================================================================== */}
      <section id="practice" className="py-28 sm:py-36 bg-[#FBF9F5] border-b border-[#EAE3D9]">
        <div className="max-w-7xl mx-auto px-6 sm:px-12">
          
          {/* Eyebrow and Section Heading */}
          <div className="max-w-3xl mb-16">
            <span className="text-xs font-mono tracking-widest uppercase text-[#DE7356] block mb-3">
              02 / THE PRACTICE OF TEKAZASHI
            </span>
            <h2 className="text-3xl sm:text-5xl font-serif font-light text-[#1A1816] tracking-tight leading-tight mb-6">
              {lang === "ja" ? (
                <>
                  触れず、語らず。
                  <br />
                  <span className="text-[#964731] font-normal">光の温もりだけで魂を調律する。</span>
                </>
              ) : (
                <>
                  The Art of Divine Light.
                  <br />
                  <span className="text-[#964731] font-normal italic">A Quiet Resonance Beyond Words.</span>
                </>
              )}
            </h2>
            <div className="w-12 h-px bg-[#DE7356]"></div>
          </div>

          {/* Grid Layout: Visual on Left, Practice Architecture on Right */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            
            {/* Visual Card */}
            <div className="lg:col-span-5 space-y-6">
              <div className="relative aspect-[4/3] sm:aspect-square rounded-2xl overflow-hidden bg-[#EFE8DF] shadow-md border border-[#E2DAD0]">
                <Image
                  src="/assets/okiyome_session.jpg"
                  alt="Minimalist meditation space with gentle natural light during Okiyome"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>
                <div className="absolute bottom-4 left-4 right-4 bg-white/90 backdrop-blur-md px-4 py-3 rounded-xl border border-white/40 text-xs font-mono text-[#4A433A]">
                  <span className="font-semibold block text-[#1A1816]">The Sacred Space</span>
                  Clean, quiet, free from external disruptions.
                </div>
              </div>

              {/* Distinction Statement */}
              <div className="p-6 rounded-2xl bg-[#F4EFEA] border border-[#E5DDD2] space-y-2">
                <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#964731] font-semibold">
                  <Icons.ShieldCheck className="w-4 h-4 text-[#DE7356]" />
                  <span>{lang === "ja" ? "透明性と安心のために" : "Our Ethical Distinction"}</span>
                </div>
                <p className="text-xs sm:text-sm text-[#665D52] leading-relaxed">
                  {lang === "ja"
                    ? "医療行為でも、催眠術や暗示でもありません。人間が本来宿している「澄んだ生命力」へと立ち返るための、純粋で静かな伝統的アプローチです。"
                    : "Tekazashi is not medical treatment, nor is it hypnosis or psychological persuasion. It is a time-tested spiritual practice to restore human vitality and inner peace."}
                </p>
              </div>
            </div>

            {/* Content & Step Architecture */}
            <div className="lg:col-span-7 space-y-8">
              
              <div className="prose text-[#4A433A] text-base sm:text-lg leading-relaxed font-light space-y-5">
                {lang === "ja" ? (
                  <>
                    <p className="text-xl font-serif text-[#1A1816]">
                      「手かざし（Art of Divine Light）」は、施術者が自らの力を加えるものではありません。宇宙と自然を貫く根源的な神の光（Divine Light）を、静かに取り次ぐ無私の実践です。
                    </p>
                    <p>
                      椅子に深く腰掛け、そっと目を閉じる。約30cm離れた手のひらから注がれる穏やかな光が、蓄積した想念の曇りや緊張をほどき、内側から澄みわたるような深い安らぎをもたらします。
                    </p>
                  </>
                ) : (
                  <>
                    <p className="text-xl font-serif text-[#1A1816]">
                      Tekazashi involves no physical contact and no personal force. The practitioner serves solely as a clear conduit for Divine Light—the universal, purifying energy of nature and creation.
                    </p>
                    <p>
                      Seated comfortably with eyes closed, you simply receive. The gentle radiance melts inner tension, clears mental static, and harmonizes your original spiritual balance.
                    </p>
                  </>
                )}
              </div>

              {/* 3 Pillars */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
                
                <div className="p-5 rounded-xl bg-white border border-[#EAE3D9] shadow-xs space-y-2">
                  <span className="text-xs font-mono text-[#DE7356] font-semibold tracking-wider">01 / NON-CONTACT</span>
                  <h3 className="font-serif text-base font-medium text-[#1A1816]">
                    {lang === "ja" ? "完全な非接触" : "Zero Physical Touch"}
                  </h3>
                  <p className="text-xs text-[#6C645A] leading-relaxed">
                    {lang === "ja"
                      ? "身体から約30cm離した位置から手をかざします。接触や揉みほぐしはありません。"
                      : "Conducted approximately 12 inches away from your body without any physical touch."}
                  </p>
                </div>

                <div className="p-5 rounded-xl bg-white border border-[#EAE3D9] shadow-xs space-y-2">
                  <span className="text-xs font-mono text-[#DE7356] font-semibold tracking-wider">02 / STILLNESS</span>
                  <h3 className="font-serif text-base font-medium text-[#1A1816]">
                    {lang === "ja" ? "言葉や思考の休息" : "Quiet Mind"}
                  </h3>
                  <p className="text-xs text-[#6C645A] leading-relaxed">
                    {lang === "ja"
                      ? "無理な瞑想法や呪文などは一切不要。ただ座り、そっと目を閉じるだけです。"
                      : "No complicated meditation techniques. Simply sit, close your eyes, and rest."}
                  </p>
                </div>

                <div className="p-5 rounded-xl bg-white border border-[#EAE3D9] shadow-xs space-y-2">
                  <span className="text-xs font-mono text-[#DE7356] font-semibold tracking-wider">03 / NATURE</span>
                  <h3 className="font-serif text-base font-medium text-[#1A1816]">
                    {lang === "ja" ? "自然生命力の調律" : "Vital Alignment"}
                  </h3>
                  <p className="text-xs text-[#6C645A] leading-relaxed">
                    {lang === "ja"
                      ? "心身に溜まった見えない疲労を浄め、本来備わる澄んだ生命力を回復させます。"
                      : "Clears accumulated subtle burdens to rekindle your inherent calm vitality."}
                  </p>
                </div>

              </div>

            </div>

          </div>

        </div>
      </section>

      {/* ====================================================================
          SECTION 04: THREE COMMITMENTS TO INTEGRITY
          Aesthetic: wolverineworldwide.com 3-column clean hairline card layout
          ==================================================================== */}
      <section id="principles" className="py-28 sm:py-36 bg-[#F4EFEA] border-b border-[#EAE3D9]">
        <div className="max-w-7xl mx-auto px-6 sm:px-12">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-12 border-b border-[#DCD3C5]">
            <div>
              <span className="text-xs font-mono tracking-widest uppercase text-[#DE7356] block mb-3">
                03 / OUR PRINCIPLES
              </span>
              <h2 className="text-3xl sm:text-5xl font-serif font-light text-[#1A1816] tracking-tight">
                {lang === "ja"
                  ? "心から安心してお過ごしいただくための、3つの約束。"
                  : "Built on Pure Sincerity. Three Commitments to Every Guest."}
              </h2>
            </div>
            <p className="text-xs font-mono uppercase tracking-widest text-[#7C7368] max-w-xs">
              TRANSPARENCY & PEACE OF MIND
            </p>
          </div>

          {/* 3-Column Card Layout */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-[#DDD3C4] border border-[#DDD3C4] mt-12 rounded-2xl overflow-hidden shadow-xs">
            
            {/* Card 01 */}
            <div className="bg-[#FBF9F5] p-8 sm:p-10 flex flex-col justify-between hover:bg-white transition-colors duration-300">
              <div className="space-y-6">
                <div className="flex items-center justify-between border-b border-[#EAE3D9] pb-4">
                  <span className="text-4xl sm:text-5xl font-mono font-light text-[#1A1816]">01</span>
                  <span className="text-[10px] font-mono tracking-widest uppercase px-2 py-1 bg-[#F2EDE4] rounded text-[#7C7368]">
                    DONATION-BASED
                  </span>
                </div>
                <h3 className="text-xl sm:text-2xl font-serif text-[#1A1816] font-medium leading-snug">
                  {lang === "ja" ? "完全な自発性（ドネーション制）" : "Donation-Based / Free First Visit"}
                </h3>
                <p className="text-sm text-[#5D554B] leading-relaxed">
                  {lang === "ja"
                    ? "初回の体験セッションは完全無料です。継続される場合も定額の請求や強制はなく、ご自身の感謝と自発的なお気持ちによる御奉納（ドネーション）のみで運営されています。"
                    : "The first introductory session is completely free. Should you choose to return, there are never fixed fees or mandatory dues—our center operates entirely through sincere voluntary donations."}
                </p>
              </div>
              <div className="pt-8 text-xs font-mono text-[#8C8377] flex items-center gap-2">
                <Icons.Check className="w-3.5 h-3.5 text-[#DE7356]" />
                <span>{lang === "ja" ? "物品販売・高額請求の一切なし" : "Zero sales or product obligations"}</span>
              </div>
            </div>

            {/* Card 02 */}
            <div className="bg-[#FBF9F5] p-8 sm:p-10 flex flex-col justify-between hover:bg-white transition-colors duration-300">
              <div className="space-y-6">
                <div className="flex items-center justify-between border-b border-[#EAE3D9] pb-4">
                  <span className="text-4xl sm:text-5xl font-mono font-light text-[#1A1816]">02</span>
                  <span className="text-[10px] font-mono tracking-widest uppercase px-2 py-1 bg-[#F2EDE4] rounded text-[#7C7368]">
                    OPEN SANCTUARY
                  </span>
                </div>
                <h3 className="text-xl sm:text-2xl font-serif text-[#1A1816] font-medium leading-snug">
                  {lang === "ja" ? "信仰の自由・入会勧誘の完全排除" : "Absolute Freedom of Belief"}
                </h3>
                <p className="text-sm text-[#5D554B] leading-relaxed">
                  {lang === "ja"
                    ? "特定の宗教への改宗や入会を求めることは一切ありません。どのような信仰・哲学をお持ちの方でも、あるいは無宗教の方でも、等しく穏やかにお迎えいたします。"
                    : "We never solicit membership or pressure anyone toward religious conversion. People of all spiritual traditions, faiths, or secular backgrounds are warmly welcomed as equals."}
                </p>
              </div>
              <div className="pt-8 text-xs font-mono text-[#8C8377] flex items-center gap-2">
                <Icons.Check className="w-3.5 h-3.5 text-[#DE7356]" />
                <span>{lang === "ja" ? "勧誘・入会への圧力ゼロ" : "No conversion, no proselytizing"}</span>
              </div>
            </div>

            {/* Card 03 */}
            <div className="bg-[#FBF9F5] p-8 sm:p-10 flex flex-col justify-between hover:bg-white transition-colors duration-300">
              <div className="space-y-6">
                <div className="flex items-center justify-between border-b border-[#EAE3D9] pb-4">
                  <span className="text-4xl sm:text-5xl font-mono font-light text-[#1A1816]">03</span>
                  <span className="text-[10px] font-mono tracking-widest uppercase px-2 py-1 bg-[#F2EDE4] rounded text-[#7C7368]">
                    LEGAL STATUS
                  </span>
                </div>
                <h3 className="text-xl sm:text-2xl font-serif text-[#1A1816] font-medium leading-snug">
                  {lang === "ja" ? "米国政府公認 501(c)(3) 非営利法人" : "Recognized 501(c)(3) Nonprofit"}
                </h3>
                <p className="text-sm text-[#5D554B] leading-relaxed">
                  {lang === "ja"
                    ? "World Divine Light Organization は、米国政府に認められた非営利団体です。営利を目的とせず、真心のボランティアスタッフによって誠実に維持管理されています。"
                    : "World Divine Light Organization is an officially registered US federal 501(c)(3) non-profit entity, maintained with integrity by sincere volunteer staff members."}
                </p>
              </div>
              <div className="pt-8 text-xs font-mono text-[#8C8377] flex items-center gap-2">
                <Icons.Check className="w-3.5 h-3.5 text-[#DE7356]" />
                <span>{lang === "ja" ? "非営利性・公共性の厳格な保持" : "Strict adherence to nonprofit governance"}</span>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* ====================================================================
          SECTION 05: THE WALKTHROUGH (当日の流れ - 55-Minute Journey)
          ==================================================================== */}
      <section id="journey" className="py-28 sm:py-36 bg-[#FBF9F5] border-b border-[#EAE3D9]">
        <div className="max-w-7xl mx-auto px-6 sm:px-12">
          
          <div className="max-w-3xl mb-16">
            <span className="text-xs font-mono tracking-widest uppercase text-[#DE7356] block mb-3">
              04 / WHAT TO EXPECT
            </span>
            <h2 className="text-3xl sm:text-5xl font-serif font-light text-[#1A1816] tracking-tight leading-tight mb-4">
              {lang === "ja" ? "静寂へ至る、55分間の流れ。" : "A Thoughtful 55-Minute Journey."}
            </h2>
            <p className="text-sm sm:text-base text-[#6B6358] font-light">
              {lang === "ja"
                ? "初めての方でも緊張なさらないよう、事前の流れを透明にお伝えします。合計約55分のゆったりとした時間です。"
                : "To ensure complete comfort before your visit, here is how a typical session unfolds across 55 serene minutes."}
            </p>
          </div>

          {/* Interactive Steps Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            
            {/* Step 01 */}
            <div
              onClick={() => setActiveStep(0)}
              className={`p-8 rounded-2xl border transition-all duration-300 cursor-pointer flex flex-col justify-between ${
                activeStep === 0
                  ? "bg-white border-[#DE7356] shadow-md scale-[1.01]"
                  : "bg-[#F7F3EC] border-[#E8E0D5] hover:bg-white"
              }`}
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between text-xs font-mono text-[#8C8276]">
                  <span className="px-2.5 py-1 rounded bg-[#EFE8DE] text-[#1A1816] font-semibold">STEP 01</span>
                  <span>{lang === "ja" ? "約10分" : "Approx. 10 Min"}</span>
                </div>
                <h3 className="text-xl font-serif text-[#1A1816] font-medium">
                  {lang === "ja" ? "お出迎えと静かなご案内" : "Warm Welcome & Orientation"}
                </h3>
                <p className="text-xs sm:text-sm text-[#5C544A] leading-relaxed">
                  {lang === "ja"
                    ? "スタッフが静かに笑顔でお迎えします。お浄めの趣旨を簡潔にお伝えし、静穏な部屋へとご案内します。"
                    : "A gentle greeting in a peaceful setting. We explain the simple process so you can feel completely at ease."}
                </p>
              </div>
              <div className="mt-8 pt-4 border-t border-[#EAE3D9] text-[11px] font-mono text-[#8C8276]">
                {lang === "ja" ? "※服装：普段着の手ぶらでOK" : "Casual comfortable attire"}
              </div>
            </div>

            {/* Step 02 */}
            <div
              onClick={() => setActiveStep(1)}
              className={`p-8 rounded-2xl border transition-all duration-300 cursor-pointer flex flex-col justify-between ${
                activeStep === 1
                  ? "bg-white border-[#DE7356] shadow-md scale-[1.01]"
                  : "bg-[#F7F3EC] border-[#E8E0D5] hover:bg-white"
              }`}
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between text-xs font-mono text-[#8C8276]">
                  <span className="px-2.5 py-1 rounded bg-[#DE7356] text-white font-semibold">STEP 02 (CORE)</span>
                  <span>{lang === "ja" ? "約30分" : "Approx. 30 Min"}</span>
                </div>
                <h3 className="text-xl font-serif text-[#1A1816] font-medium">
                  {lang === "ja" ? "光のセッション（手かざし）" : "The Divine Light Session"}
                </h3>
                <p className="text-xs sm:text-sm text-[#5C544A] leading-relaxed">
                  {lang === "ja"
                    ? "椅子に腰掛け、目を閉じてリラックスしてください。施術者が静かに光を取り次ぎます。途中で眠ってしまっても差し支えありません。"
                    : "Sit comfortably and close your eyes. Experience 30 minutes of deep quietude as Divine Light is radiated over you."}
                </p>
              </div>
              <div className="mt-8 pt-4 border-t border-[#EAE3D9] text-[11px] font-mono text-[#8C8276]">
                {lang === "ja" ? "※完全非接触・静寂のひととき" : "Completely non-contact"}
              </div>
            </div>

            {/* Step 03 */}
            <div
              onClick={() => setActiveStep(2)}
              className={`p-8 rounded-2xl border transition-all duration-300 cursor-pointer flex flex-col justify-between ${
                activeStep === 2
                  ? "bg-white border-[#DE7356] shadow-md scale-[1.01]"
                  : "bg-[#F7F3EC] border-[#E8E0D5] hover:bg-white"
              }`}
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between text-xs font-mono text-[#8C8276]">
                  <span className="px-2.5 py-1 rounded bg-[#EFE8DE] text-[#1A1816] font-semibold">STEP 03</span>
                  <span>{lang === "ja" ? "約15分" : "Approx. 15 Min"}</span>
                </div>
                <h3 className="text-xl font-serif text-[#1A1816] font-medium">
                  {lang === "ja" ? "温かいお茶と余白の時間" : "Warm Tea & Reflection"}
                </h3>
                <p className="text-xs sm:text-sm text-[#5C544A] leading-relaxed">
                  {lang === "ja"
                    ? "セッション後には温かいお茶をご用意しています。感じたことをお話しいただくことも、ただ静かに余韻を味わうことも自由です。"
                    : "Enjoy a cup of warm tea. Ask any questions freely, or simply savor the lingering peace before re-entering your day."}
                </p>
              </div>
              <div className="mt-8 pt-4 border-t border-[#EAE3D9] text-[11px] font-mono text-[#8C8276]">
                {lang === "ja" ? "※無理な次回予約の勧誘なし" : "Zero pressure for follow-ups"}
              </div>
            </div>

          </div>

          <div className="mt-12 text-center">
            <button
              onClick={() => {
                setSubmitStatus("idle");
                setIsModalOpen(true);
              }}
              className="inline-flex items-center gap-2 text-xs font-mono tracking-widest uppercase text-[#1A1816] hover:text-[#DE7356] border-b border-current pb-1 transition-colors cursor-pointer"
            >
              <span>{lang === "ja" ? "この流れで体験セッションを予約する" : "Schedule this 55-minute session"}</span>
              <Icons.ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

        </div>
      </section>

      {/* ====================================================================
          SECTION 06: WORDS FROM THE CENTER (迎える人の声)
          ==================================================================== */}
      <section className="py-28 sm:py-36 bg-[#F4EFEA] border-b border-[#EAE3D9] relative overflow-hidden">
        <div className="max-w-5xl mx-auto px-6 sm:px-12">
          
          <div className="relative bg-[#FBF9F5] rounded-3xl border border-[#E2DAD0] p-8 sm:p-14 shadow-sm">
            
            {/* Header Badge */}
            <div className="flex items-center justify-between border-b border-[#EAE3D9] pb-6 mb-8">
              <span className="text-xs font-mono tracking-widest uppercase text-[#DE7356]">
                05 / MESSAGE FROM THE SANCTUARY
              </span>
              <span className="text-xs font-mono text-[#8A8174]">Staff Host: Meia</span>
            </div>

            {/* Letter Content */}
            <div className="space-y-6 text-base sm:text-xl text-[#3A342D] font-serif leading-relaxed font-light">
              <h3 className="text-2xl sm:text-3xl font-serif text-[#1A1816] font-normal leading-snug">
                {lang === "ja"
                  ? "止まり木のように、静かに羽を休められる場所として。"
                  : "A Gentle Haven in the Metropolis."}
              </h3>
              
              <div className="w-10 h-px bg-[#DE7356]"></div>

              {lang === "ja" ? (
                <>
                  <p>
                    「ロサンゼルスで懸命に日々を過ごしていると、いつの間にか呼吸が浅くなり、自分の本質を見失ってしまうことがあります。
                  </p>
                  <p>
                    私たちが大切にしているのは、何かを教え込むことではなく、誰もが本来持っている澄んだ状態へ還るための『余白』をお守りすることです。
                  </p>
                  <p>
                    特別な準備も、気負いも要りません。ふと自然の風に触れたくなったときのように、いつでも静かに扉を開けてください。」
                  </p>
                </>
              ) : (
                <>
                  <p>
                    &ldquo;Living in the vibrant pace of Los Angeles, it is easy for life to become overwhelming and for one’s breath to turn shallow.
                  </p>
                  <p>
                    Our center does not seek to lecture or persuade; we simply offer a quiet clearing where you can remember your natural lightness.
                  </p>
                  <p>
                    Whenever you feel the need to pause and breathe, our doors are open.&rdquo;
                  </p>
                </>
              )}
            </div>

            {/* Signature Area */}
            <div className="mt-10 pt-6 border-t border-[#EAE3D9] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="relative w-12 h-12 rounded-full overflow-hidden bg-[#1A1816]">
                  <Image
                    src="/assets/staff_host.jpg"
                    alt="Meia, Staff Host"
                    fill
                    className="object-cover"
                    onError={(e) => {
                      (e.target as HTMLElement).style.display = "none";
                    }}
                  />
                  <div className="w-full h-full flex items-center justify-center text-white font-serif text-sm">M</div>
                </div>
                <div>
                  <div className="text-sm font-semibold text-[#1A1816]">Meia</div>
                  <div className="text-xs font-mono text-[#7A7266]">Staff Host ｜ Los Angeles Divine Light Center</div>
                </div>
              </div>
              <div className="text-xs font-mono text-[#7A7266] uppercase tracking-wider">
                Monterey Park, California
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* ====================================================================
          SECTION 07: INFORMATION & VISITING GUIDELINES
          ==================================================================== */}
      <section id="access" className="py-28 sm:py-36 bg-[#FBF9F5] border-b border-[#EAE3D9]">
        <div className="max-w-7xl mx-auto px-6 sm:px-12">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-12 border-b border-[#DCD3C5]">
            <div>
              <span className="text-xs font-mono tracking-widest uppercase text-[#DE7356] block mb-3">
                06 / ACCESS & VISITING HOURS
              </span>
              <h2 className="text-3xl sm:text-5xl font-serif font-light text-[#1A1816] tracking-tight">
                {lang === "ja" ? "所在地と開館時間" : "Center Location & Visiting Hours"}
              </h2>
            </div>
            <div className="text-xs font-mono text-[#7C7368] uppercase tracking-widest">
              MONTEREY PARK, CA 91754
            </div>
          </div>

          {/* Hairline Data Snapshot Grid */}
          <div className="mt-12 border border-[#D5CCC0] rounded-2xl overflow-hidden bg-white shadow-xs">
            
            {/* Top Bar */}
            <div className="p-6 sm:p-8 bg-[#FAF6F0] border-b border-[#D5CCC0] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <span className="text-xs font-mono tracking-wider uppercase text-[#DE7356] block mb-1">
                  OFFICIAL BRANCH
                </span>
                <h3 className="text-xl sm:text-2xl font-serif font-medium text-[#1A1816]">
                  {lang === "ja" ? "ロサンゼルス道場" : "Los Angeles Divine Light Center"}
                </h3>
                <p className="text-xs font-mono text-[#665D52] mt-1">
                  World Divine Light Organization ｜ US Recognized 501(c)(3)
                </p>
              </div>
              <div className="flex items-center gap-2">
                <a
                  href="https://maps.google.com/?q=809+S+Atlantic+Blvd,+Monterey+Park,+CA+91754"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#D5CCC0] bg-white text-xs font-mono uppercase tracking-wider text-[#1A1816] hover:bg-[#1A1816] hover:text-white transition-colors"
                >
                  <span>Google Maps</span>
                  <Icons.ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

            {/* Spec Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-[#EAE3D9]">
              
              {/* Box 1: Address */}
              <div className="p-6 sm:p-8 space-y-3">
                <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#7C7368]">
                  <Icons.MapPin className="w-3.5 h-3.5 text-[#DE7356]" />
                  <span>{lang === "ja" ? "所在地" : "Address"}</span>
                </div>
                <div className="text-sm font-medium text-[#1A1816] space-y-1">
                  <div>809 S Atlantic Blvd, #378</div>
                  <div>Monterey Park, CA 91754</div>
                  <div className="text-xs text-[#7C7368] font-normal pt-1">
                    {lang === "ja" ? "敷地内無料駐車場完備" : "Free on-site plaza parking"}
                  </div>
                </div>
              </div>

              {/* Box 2: Hours */}
              <div className="p-6 sm:p-8 space-y-3">
                <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#7C7368]">
                  <Icons.Clock className="w-3.5 h-3.5 text-[#DE7356]" />
                  <span>{lang === "ja" ? "開館時間" : "Hours"}</span>
                </div>
                <div className="text-sm font-medium text-[#1A1816] space-y-1">
                  <div className="flex justify-between">
                    <span>Tue – Sat:</span>
                    <span className="font-mono">10:00 – 18:00</span>
                  </div>
                  <div className="flex justify-between text-[#964731]">
                    <span>Sunday:</span>
                    <span className="font-mono font-semibold">9:00 – 16:00</span>
                  </div>
                  <div className="flex justify-between text-[#8A8174] text-xs pt-1">
                    <span>Monday:</span>
                    <span className="font-mono uppercase">Closed</span>
                  </div>
                </div>
              </div>

              {/* Box 3: Contact */}
              <div className="p-6 sm:p-8 space-y-3">
                <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#7C7368]">
                  <Icons.Phone className="w-3.5 h-3.5 text-[#DE7356]" />
                  <span>{lang === "ja" ? "連絡先" : "Contact"}</span>
                </div>
                <div className="text-sm font-medium text-[#1A1816] space-y-1.5">
                  <a href="tel:+16268615069" className="block hover:text-[#DE7356] transition-colors font-mono">
                    +1 (626) 861-5069
                  </a>
                  <a href="mailto:info-la@worlddivinelight.org" className="block text-xs text-[#665D52] hover:text-[#DE7356] transition-colors truncate font-mono">
                    info-la@worlddivinelight.org
                  </a>
                  <div className="text-[11px] text-[#7C7368] font-mono">
                    SMS inquiries welcomed
                  </div>
                </div>
              </div>

              {/* Box 4: Attire */}
              <div className="p-6 sm:p-8 space-y-3">
                <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#7C7368]">
                  <Icons.Check className="w-3.5 h-3.5 text-[#DE7356]" />
                  <span>{lang === "ja" ? "ご来訪の準備" : "Attire & Entry"}</span>
                </div>
                <p className="text-xs text-[#5D554B] leading-relaxed">
                  {lang === "ja"
                    ? "カジュアルな普段着でお越しください。室内では靴を脱いでいただきますので、清潔な靴下をご着用ください。"
                    : "Casual everyday attire. Please wear clean socks, as shoes are removed upon entering the sanctuary."}
                </p>
              </div>

            </div>

            {/* Policy Banner */}
            <div className="p-6 sm:p-8 bg-[#1A1816] text-[#FBF9F5] border-t border-[#D5CCC0] flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
              <div className="space-y-2 max-w-3xl">
                <div className="flex items-center gap-2 text-xs font-mono text-[#DE7356] uppercase tracking-wider">
                  <span className="w-2 h-2 rounded-full bg-[#DE7356] animate-pulse"></span>
                  <span>{lang === "ja" ? "ご来訪に関する重要なお願い" : "Visiting Policy — Advance Reservation"}</span>
                </div>
                <p className="text-sm sm:text-base font-light text-[#E0D7CC] leading-relaxed">
                  {lang === "ja"
                    ? "当センターでは、訪れるすべての方に静寂で落ち着いた環境をお届けするため、また催事・特別行事等による開館日時の変動に対応するため、【完全事前予約制】とさせていただいております。ご来訪の際は、必ず事前にお問い合わせ・ご予約をお願いいたします。"
                    : "To maintain a quiet, sanctuary-grade atmosphere and accommodate occasional schedule adjustments for ceremonies, all visits are by advance appointment only. Please contact us prior to visiting."}
                </p>
              </div>
              <button
                onClick={() => {
                  setSubmitStatus("idle");
                  setIsModalOpen(true);
                }}
                className="shrink-0 bg-[#DE7356] hover:bg-[#C86348] text-white text-xs font-mono uppercase tracking-widest px-6 py-3.5 rounded-full transition-colors cursor-pointer"
              >
                {lang === "ja" ? "事前予約フォームへ" : "Book Advance Appointment"}
              </button>
            </div>

          </div>

        </div>
      </section>

      {/* ====================================================================
          SECTION 08: FREQUENTLY ASKED QUESTIONS
          ==================================================================== */}
      <section id="faq" className="py-28 sm:py-36 bg-[#F4EFEA] border-b border-[#EAE3D9]">
        <div className="max-w-4xl mx-auto px-6 sm:px-12">
          
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-mono tracking-widest uppercase text-[#DE7356] block mb-3">
              07 / FAQ
            </span>
            <h2 className="text-3xl sm:text-5xl font-serif font-light text-[#1A1816] tracking-tight mb-4">
              {lang === "ja" ? "よくあるご質問" : "Frequently Asked Questions"}
            </h2>
            <p className="text-xs sm:text-sm text-[#736A5E] font-mono">
              CLEAR & HONEST ANSWERS TO COMMON INQUIRIES
            </p>
          </div>

          {/* Accordion Container */}
          <div className="space-y-4">
            {[
              {
                q_ja: "本当に無料ですか？ 追加の請求はありませんか？",
                a_ja: "はい、初めての方の体験セッションは完全無料です。物品の販売や、寄付の強制などは一切ございません。どなた様も安心してお越しください。",
                q_en: "Is the first session truly free? Are there any hidden fees?",
                a_en: "Yes. The introductory session is 100% free with zero fees, no sales of items, and no mandatory donations whatsoever.",
              },
              {
                q_ja: "特定の宗教を信じていなくても参加できますか？",
                a_ja: "はい。どのような宗教・信条をお持ちの方でも、あるいは無宗教の方でも、分け隔てなく歓迎いたします。教義の押し付けや改宗の要求は一切ありません。",
                q_en: "Can I participate without a specific religious background?",
                a_en: "Absolutely. People of all backgrounds, faiths, or secular philosophies are welcomed warmly. There is no proselytizing or requirement to convert.",
              },
              {
                q_ja: "施術中に身体に触れられることはありますか？",
                a_ja: "いいえ。手かざしは完全な非接触（約30cm離れた位置）で行われます。お身体に直接触れることは一切ございません。",
                q_en: "Is there any physical contact during tekazashi?",
                a_en: "None at all. The practice is strictly non-contact, performed approximately 12 inches away from your body while you remain fully clothed.",
              },
              {
                q_ja: "予約なしで当日伺うことはできますか？",
                a_ja: "落ち着いた静謐な空間を保つため、また行事等により開館時間が変更となる場合があるため、事前のご予約をお願いしております。お電話・SMSまたは予約フォームよりご連絡ください。",
                q_en: "Can I walk in without an advance appointment?",
                a_en: "Because our schedule adjusts for community ceremonies and to preserve a tranquil environment for every guest, advance reservations are required.",
              },
            ].map((faq, idx) => (
              <div
                key={idx}
                className="bg-white rounded-2xl border border-[#DDD3C4] overflow-hidden transition-colors"
              >
                <button
                  type="button"
                  onClick={() => toggleFaq(idx)}
                  className="w-full p-6 sm:p-7 flex items-center justify-between gap-4 text-left cursor-pointer focus:outline-none"
                  aria-expanded={openFaq === idx}
                >
                  <span className="font-serif text-lg sm:text-xl font-normal text-[#1A1816]">
                    {lang === "ja" ? faq.q_ja : faq.q_en}
                  </span>
                  <span className="shrink-0 w-8 h-8 rounded-full bg-[#F4EFEA] flex items-center justify-center text-[#1A1816] transition-transform duration-200">
                    {openFaq === idx ? <Icons.Minus className="w-4 h-4" /> : <Icons.Plus className="w-4 h-4" />}
                  </span>
                </button>
                {openFaq === idx && (
                  <div className="px-6 sm:px-7 pb-6 sm:pb-7 text-sm sm:text-base text-[#5D554B] leading-relaxed border-t border-[#F2ECE2] pt-4 font-light">
                    {lang === "ja" ? faq.a_ja : faq.a_en}
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="mt-12 text-center text-xs font-mono text-[#8C8377]">
            {lang === "ja"
              ? "その他ご不明な点はお気軽にお電話（+1 626-861-5069）またはご予約時にお尋ねください。"
              : "Have other questions? Feel free to call +1 (626) 861-5069 or leave a note with your reservation."}
          </div>

        </div>
      </section>

      {/* ====================================================================
          SECTION 09: BOTTOM CTA (CLOSING)
          ==================================================================== */}
      <section className="relative py-32 sm:py-44 bg-[#121110] text-white overflow-hidden">
        
        {/* Atmospheric Landscape */}
        <div className="absolute inset-0 opacity-40">
          <Image
            src="/assets/ocean_light.jpg"
            alt="Quiet evening ocean horizon with soft warm glow"
            fill
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#121110] via-[#121110]/80 to-black/60"></div>
        </div>

        <div className="relative z-10 max-w-5xl mx-auto px-6 sm:px-12 text-center space-y-8">
          
          <span className="inline-block text-xs font-mono tracking-widest uppercase text-[#DE7356] px-4 py-1.5 rounded-full border border-[#DE7356]/30 bg-black/40 backdrop-blur-md">
            {lang === "ja" ? "無料体験セッションのご案内" : "Complimentary Introductory Visit"}
          </span>

          <h2 className="text-3xl sm:text-5xl md:text-6xl font-serif font-light tracking-tight leading-tight max-w-3xl mx-auto text-[#FAF6F0]">
            {lang === "ja" ? (
              <>
                呼吸を整え、
                <br />
                本来の澄みわたるあなたへ。
              </>
            ) : (
              <>
                Return to Stillness.
                <br />
                <span className="italic font-light text-[#E0D7CC]">Step into the Light.</span>
              </>
            )}
          </h2>

          <p className="max-w-2xl mx-auto text-sm sm:text-lg text-[#C8BFB2] font-light leading-relaxed">
            {lang === "ja"
              ? "都会の速度から一歩身を引き、心と魂に純粋な静寂を届ける。静かな空間とお席を整えてお待ちしております。"
              : "Take a quiet step away from the urban noise. A sanctuary of peace and gentle light awaits you in Monterey Park."}
          </p>

          <div className="pt-6 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => {
                setSubmitStatus("idle");
                setIsModalOpen(true);
              }}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-3 bg-[#DE7356] hover:bg-[#C86348] text-white px-9 py-4 rounded-full font-mono text-xs uppercase tracking-widest transition-all duration-300 shadow-xl cursor-pointer"
            >
              <span>{lang === "ja" ? "無料体験セッションを予約する" : "Book Your Free Session"}</span>
              <Icons.ArrowRight className="w-4 h-4" />
            </button>

            <a
              href="tel:+16268615069"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 border border-white/20 hover:border-white/50 text-white/90 px-7 py-4 rounded-full font-mono text-xs uppercase tracking-widest transition-colors backdrop-blur-sm"
            >
              <Icons.Phone className="w-3.5 h-3.5 text-[#DE7356]" />
              <span>Tel/SMS: +1 (626) 861-5069</span>
            </a>
          </div>

          <div className="pt-12 text-xs font-mono text-white/40 tracking-wider">
            MONTEREY PARK, CALIFORNIA ｜ ADVANCE APPOINTMENT ONLY
          </div>

        </div>
      </section>

      {/* ====================================================================
          SECTION 10: FOOTER
          ==================================================================== */}
      <footer className="bg-[#0E0D0C] text-[#8C8377] py-16 px-6 sm:px-12 border-t border-[#23201C]">
        <div className="max-w-7xl mx-auto space-y-12">
          
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-12 border-b border-[#23201C]">
            
            {/* Col 1: Identity */}
            <div className="md:col-span-5 space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white text-xs font-mono">
                  WDL
                </div>
                <span className="text-white font-serif text-lg font-medium">
                  Los Angeles Divine Light Center
                </span>
              </div>
              <p className="text-xs text-[#7A7266] leading-relaxed max-w-md">
                World Divine Light Organization is a US Government-Recognized 501(c)(3) Nonprofit Spiritual Organization dedicated to spiritual harmony and inner purification through the non-contact practice of Tekazashi.
              </p>
            </div>

            {/* Col 2: Navigation Links */}
            <div className="md:col-span-3 space-y-3 font-mono text-xs uppercase tracking-wider">
              <span className="text-white block font-medium">Quick Directory</span>
              <ul className="space-y-2 text-[#7A7266]">
                <li><a href="#dilemma" className="hover:text-white transition-colors">01 / The Dilemma</a></li>
                <li><a href="#practice" className="hover:text-white transition-colors">02 / Tekazashi</a></li>
                <li><a href="#principles" className="hover:text-white transition-colors">03 / Integrity</a></li>
                <li><a href="#journey" className="hover:text-white transition-colors">04 / 55-Min Walk</a></li>
                <li><a href="#access" className="hover:text-white transition-colors">05 / Location</a></li>
                <li><a href="#faq" className="hover:text-white transition-colors">06 / FAQ</a></li>
              </ul>
            </div>

            {/* Col 3: Direct Contacts */}
            <div className="md:col-span-4 space-y-3 font-mono text-xs">
              <span className="text-white block uppercase tracking-wider font-medium">Visiting Address</span>
              <div className="text-[#8C8377] leading-relaxed">
                <div>809 S Atlantic Blvd, #378</div>
                <div>Monterey Park, CA 91754</div>
                <div className="mt-2 text-white">Direct: +1 (626) 861-5069</div>
                <div>Email: info-la@worlddivinelight.org</div>
              </div>
            </div>

          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] font-mono text-[#665E55]">
            <div>
              © 2026 World Divine Light Organization. All rights reserved.
            </div>
            <div className="flex items-center gap-6">
              <span>501(c)(3) Nonprofit Entity</span>
              <span>Privacy-First Sanctuary</span>
            </div>
          </div>

        </div>
      </footer>

      {/* ====================================================================
          INTERACTIVE RESERVATION MODAL / DIALOG
          ==================================================================== */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/70 backdrop-blur-sm">
          <div className="relative w-full max-w-lg bg-[#FBF9F5] rounded-3xl border border-[#DDD3C4] shadow-2xl p-6 sm:p-8 overflow-hidden max-h-[92vh] overflow-y-auto">
            
            {/* Close Button */}
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-5 right-5 p-2 rounded-full text-[#7C7368] hover:text-[#1A1816] hover:bg-[#F2ECE2] transition-colors cursor-pointer"
              aria-label="Close reservation modal"
            >
              <Icons.X className="w-5 h-5" />
            </button>

            {submitStatus === "success" ? (
              /* Success State */
              <div className="text-center py-8 space-y-4">
                <div className="w-14 h-14 rounded-full bg-[#DE7356]/15 text-[#DE7356] flex items-center justify-center mx-auto">
                  <Icons.Check className="w-7 h-7" />
                </div>
                <h3 className="text-2xl font-serif font-medium text-[#1A1816]">
                  {lang === "ja" ? "ご予約リクエストを受け付けました" : "Reservation Request Received"}
                </h3>
                <p className="text-sm text-[#5D554B] leading-relaxed max-w-sm mx-auto">
                  {lang === "ja"
                    ? "お問い合わせありがとうございます。当センターのスタッフより、確認のEメールまたはSMSをご連絡いたします。"
                    : "Thank you for reaching out. A staff host will confirm your appointment via email or SMS shortly."}
                </p>
                <div className="p-4 rounded-xl bg-[#F4EFEA] border border-[#E5DDD2] text-xs font-mono text-[#7C7368] text-left space-y-1">
                  <div><strong>Guest:</strong> {formData.fullName}</div>
                  <div><strong>Date / Time:</strong> {formData.preferredDate || "Selected Day"} — {formData.preferredTime}</div>
                  <div><strong>Location:</strong> 809 S Atlantic Blvd, #378, Monterey Park</div>
                </div>
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="mt-4 inline-flex items-center justify-center px-6 py-2.5 rounded-full bg-[#1A1816] text-white text-xs font-mono uppercase tracking-widest hover:bg-[#DE7356] transition-colors cursor-pointer"
                >
                  {lang === "ja" ? "閉じる" : "Close"}
                </button>
              </div>
            ) : (
              /* Booking Form */
              <form onSubmit={handleBookingSubmit} className="space-y-4">
                
                <div className="border-b border-[#EAE3D9] pb-4">
                  <span className="text-[10px] font-mono tracking-widest uppercase text-[#DE7356] block mb-1">
                    COMPLIMENTARY SESSION
                  </span>
                  <h3 className="text-2xl font-serif font-medium text-[#1A1816]">
                    {lang === "ja" ? "無料体験セッションの予約" : "Book Your Free Session"}
                  </h3>
                  <p className="text-xs text-[#7C7368] mt-1">
                    {lang === "ja"
                      ? "完全事前予約制 ｜ 約55分の静寂と調律のひととき"
                      : "By advance appointment ｜ Approx. 55 minutes of quietude"}
                  </p>
                </div>

                {submitStatus === "error" && (
                  <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-xs text-red-700">
                    {lang === "ja"
                      ? "送信中にエラーが発生しました。お手数ですが、お電話（+1 626-861-5069）にて直接お問い合わせください。"
                      : "Submission error. Please call or text +1 (626) 861-5069 directly."}
                  </div>
                )}

                {/* Form Fields */}
                <div className="space-y-3 text-xs">
                  <div>
                    <label className="block font-mono uppercase tracking-wider text-[#665E54] mb-1">
                      {lang === "ja" ? "お名前 *" : "Full Name *"}
                    </label>
                    <input
                      type="text"
                      name="fullName"
                      required
                      value={formData.fullName}
                      onChange={handleInputChange}
                      placeholder={lang === "ja" ? "山田 太郎 / Taro Yamada" : "Jane Doe"}
                      className="w-full px-4 py-2.5 rounded-xl border border-[#D5CCC0] bg-white text-sm focus:outline-none focus:border-[#DE7356]"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block font-mono uppercase tracking-wider text-[#665E54] mb-1">
                        {lang === "ja" ? "Eメール *" : "Email Address *"}
                      </label>
                      <input
                        type="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="you@domain.com"
                        className="w-full px-4 py-2.5 rounded-xl border border-[#D5CCC0] bg-white text-sm focus:outline-none focus:border-[#DE7356]"
                      />
                    </div>
                    <div>
                      <label className="block font-mono uppercase tracking-wider text-[#665E54] mb-1">
                        {lang === "ja" ? "お電話番号 *" : "Phone / SMS *"}
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        required
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder="+1 (626) 000-0000"
                        className="w-full px-4 py-2.5 rounded-xl border border-[#D5CCC0] bg-white text-sm focus:outline-none focus:border-[#DE7356]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block font-mono uppercase tracking-wider text-[#665E54] mb-1">
                        {lang === "ja" ? "ご希望日 *" : "Preferred Date *"}
                      </label>
                      <input
                        type="date"
                        name="preferredDate"
                        required
                        value={formData.preferredDate}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 rounded-xl border border-[#D5CCC0] bg-white text-sm focus:outline-none focus:border-[#DE7356]"
                      />
                    </div>
                    <div>
                      <label className="block font-mono uppercase tracking-wider text-[#665E54] mb-1">
                        {lang === "ja" ? "ご希望時間 *" : "Preferred Time *"}
                      </label>
                      <select
                        name="preferredTime"
                        value={formData.preferredTime}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2.5 rounded-xl border border-[#D5CCC0] bg-white text-sm focus:outline-none focus:border-[#DE7356]"
                      >
                        <option value="10:30 AM">10:30 AM</option>
                        <option value="11:30 AM">11:30 AM</option>
                        <option value="1:30 PM">1:30 PM</option>
                        <option value="3:00 PM">3:00 PM</option>
                        <option value="4:30 PM">4:30 PM</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block font-mono uppercase tracking-wider text-[#665E54] mb-1">
                      {lang === "ja" ? "ご要望・事前のお問い合わせ（任意）" : "Notes or Questions (Optional)"}
                    </label>
                    <textarea
                      name="notes"
                      rows={2}
                      value={formData.notes}
                      onChange={handleInputChange}
                      placeholder={lang === "ja" ? "気になる点やご質問があればご記入ください" : "Let us know if you have any questions"}
                      className="w-full px-4 py-2 rounded-xl border border-[#D5CCC0] bg-white text-sm focus:outline-none focus:border-[#DE7356]"
                    ></textarea>
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3.5 rounded-full bg-[#DE7356] hover:bg-[#C86348] text-white text-xs font-mono uppercase tracking-widest transition-colors shadow-md cursor-pointer flex items-center justify-center gap-2 disabled:opacity-50"
                  >
                    <span>
                      {isSubmitting
                        ? (lang === "ja" ? "送信中..." : "Submitting...")
                        : (lang === "ja" ? "予約リクエストを送信する" : "Submit Reservation Request")}
                    </span>
                    <Icons.ArrowRight className="w-4 h-4" />
                  </button>
                </div>

                <div className="text-[11px] text-[#7C7368] text-center leading-relaxed">
                  {lang === "ja"
                    ? "お電話・SMSでのお問い合わせも直接承っております（+1 626-861-5069）。無理な勧誘や請求は一切ございません。"
                    : "Direct SMS/call inquiries are always welcome (+1 626-861-5069). Zero obligations or fees."}
                </div>

              </form>
            )}

          </div>
        </div>
      )}

    </div>
  );
}
