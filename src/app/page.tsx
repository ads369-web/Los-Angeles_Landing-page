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
  Menu: ({ className = "w-5 h-5" }: { className?: string }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="4" y1="12" x2="20" y2="12"></line>
      <line x1="4" y1="6" x2="20" y2="6"></line>
      <line x1="4" y1="18" x2="20" y2="18"></line>
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
          message: formData.notes || "Introduction Session requested via Los Angeles Landing Page.",
        }),
      });

      if (res.ok) {
        setSubmitStatus("success");
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

  useEffect(() => {
    if (isModalOpen || mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isModalOpen, mobileMenuOpen]);

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
          - Full natural aspect ratio for WDL logo (no clipping)
          - Unified two-tier navigation menu (上段: 数字, 下段: 文字)
          - Fully responsive & mobile-friendly drawer navigation
          ==================================================================== */}
      <header className="sticky top-0 z-40 w-full bg-[#FBF9F5]/90 backdrop-blur-md border-b border-[#EAE3D9] transition-all duration-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 h-18 sm:h-22 flex items-center justify-between">
          
          {/* Logo / Brand Identity - Full wide logo properly rendered */}
          <a href="#" className="flex items-center gap-2.5 sm:gap-4 group min-w-0 pr-2">
            <div className="relative h-7 sm:h-9 flex items-center shrink-0">
              <Image
                src="/assets/wdl_logo.png"
                alt="World Divine Light Organization"
                width={120}
                height={38}
                className="h-7 sm:h-9 w-auto object-contain block transition-opacity duration-300 group-hover:opacity-90"
                priority
              />
            </div>
            <div className="flex flex-col border-l border-[#DCD3C5] pl-2.5 sm:pl-3 min-w-0">
              <span className="text-xs sm:text-base font-semibold tracking-tight text-[#1A1816] font-serif leading-tight truncate">
                Los Angeles Divine Light Center
              </span>
              <span className="hidden sm:block text-[10px] tracking-widest text-[#7C756B] uppercase font-mono leading-none mt-0.5">
                World Divine Light Organization
              </span>
            </div>
          </a>

          {/* Desktop Nav Links: Unified two-tier layout (上段: 数字, 下段: 文字) */}
          <nav className="hidden lg:flex items-center gap-6 xl:gap-8 text-xs font-mono tracking-widest uppercase text-[#544D44]">
            
            <a href="#dilemma" className="group flex flex-col items-center hover:text-[#DE7356] transition-colors py-1">
              <span className="text-[10px] font-mono text-[#A89F94] group-hover:text-[#DE7356] leading-none mb-1 transition-colors">01</span>
              <span className="text-[11px] tracking-wider leading-none">Dilemma</span>
            </a>

            <a href="#practice" className="group flex flex-col items-center hover:text-[#DE7356] transition-colors py-1">
              <span className="text-[10px] font-mono text-[#A89F94] group-hover:text-[#DE7356] leading-none mb-1 transition-colors">02</span>
              <span className="text-[11px] tracking-wider leading-none">Tekazashi</span>
            </a>

            <a href="#principles" className="group flex flex-col items-center hover:text-[#DE7356] transition-colors py-1">
              <span className="text-[10px] font-mono text-[#A89F94] group-hover:text-[#DE7356] leading-none mb-1 transition-colors">03</span>
              <span className="text-[11px] tracking-wider leading-none">Integrity</span>
            </a>

            <a href="#journey" className="group flex flex-col items-center hover:text-[#DE7356] transition-colors py-1">
              <span className="text-[10px] font-mono text-[#A89F94] group-hover:text-[#DE7356] leading-none mb-1 transition-colors">04</span>
              <span className="text-[11px] tracking-wider leading-none">Journey</span>
            </a>

            <a href="#access" className="group flex flex-col items-center hover:text-[#DE7356] transition-colors py-1">
              <span className="text-[10px] font-mono text-[#A89F94] group-hover:text-[#DE7356] leading-none mb-1 transition-colors">05</span>
              <span className="text-[11px] tracking-wider leading-none">Location</span>
            </a>

            <a href="#faq" className="group flex flex-col items-center hover:text-[#DE7356] transition-colors py-1">
              <span className="text-[10px] font-mono text-[#A89F94] group-hover:text-[#DE7356] leading-none mb-1 transition-colors">06</span>
              <span className="text-[11px] tracking-wider leading-none">FAQ</span>
            </a>

          </nav>

          {/* Right Action: Language Switch + Reserve CTA + Mobile Menu Button */}
          <div className="flex items-center gap-2 sm:gap-4 shrink-0">
            {/* Language Toggle */}
            <div className="flex items-center border border-[#DDD4C7] rounded-full p-0.5 text-xs font-mono bg-[#F2EDE4]/60">
              <button
                type="button"
                onClick={() => setLang("ja")}
                className={`px-2 sm:px-2.5 py-1 rounded-full transition-all text-[11px] font-medium cursor-pointer ${
                  lang === "ja" ? "bg-[#1A1816] text-[#FBF9F5] shadow-xs" : "text-[#7C756B] hover:text-[#1A1816]"
                }`}
                aria-label="Switch to Japanese"
              >
                JA
              </button>
              <button
                type="button"
                onClick={() => setLang("en")}
                className={`px-2 sm:px-2.5 py-1 rounded-full transition-all text-[11px] font-medium cursor-pointer ${
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
              className="hidden sm:inline-flex items-center gap-2 bg-[#1A1816] hover:bg-[#DE7356] text-[#FBF9F5] text-xs font-mono uppercase tracking-wider px-4 sm:px-5 py-2.5 rounded-full transition-all duration-300 shadow-sm hover:shadow-md cursor-pointer shrink-0"
            >
              <span>{lang === "ja" ? "セッションを予約" : "Reserve a Session"}</span>
              <Icons.ArrowUpRight className="w-3.5 h-3.5" />
            </button>

            {/* Mobile Hamburger Button */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(true)}
              className="lg:hidden flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-[#DDD4C7] bg-[#F2EDE4]/70 hover:bg-[#F2EDE4] active:bg-[#EAE3D9] text-[#1A1816] transition-colors focus:outline-none cursor-pointer shrink-0"
              aria-label="Open Navigation Menu"
            >
              <Icons.Menu className="w-4 h-4 text-[#1A1816]" />
              <span className="text-[11px] font-mono tracking-wider uppercase font-semibold">
                {lang === "ja" ? "メニュー" : "MENU"}
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* ====================================================================
          FULL-SCREEN MOBILE MENU DRAWER (Root Level - No CSS Stacking Interference)
          ==================================================================== */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-[9999] lg:hidden flex justify-end">
          {/* Backdrop overlay */}
          <div
            className="fixed inset-0 bg-[#121110]/70 backdrop-blur-sm transition-opacity duration-300"
            onClick={() => setMobileMenuOpen(false)}
          />

          {/* Drawer container */}
          <div className="relative z-10 w-full max-w-sm sm:max-w-md h-full bg-[#FBF9F5] border-l border-[#EAE3D9] shadow-2xl flex flex-col justify-between overflow-y-auto">
            {/* Drawer Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-[#EAE3D9] bg-[#F4EFEA] sticky top-0 z-10">
              <div className="flex items-center gap-3">
                <Image
                  src="/assets/wdl_logo.png"
                  alt="World Divine Light Organization"
                  width={90}
                  height={28}
                  className="h-6 w-auto object-contain"
                />
                <div className="flex flex-col border-l border-[#DCD3C5] pl-2.5">
                  <span className="text-xs font-serif font-semibold text-[#1A1816] leading-none">
                    Los Angeles Center
                  </span>
                  <span className="text-[9px] font-mono text-[#8C8276] uppercase tracking-wider mt-0.5">
                    Divine Light Sanctuary
                  </span>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setMobileMenuOpen(false)}
                className="w-10 h-10 rounded-full flex items-center justify-center border border-[#DDD4C7] bg-white text-[#1A1816] hover:bg-[#F2EDE4] active:bg-[#EAE3D9] transition-colors cursor-pointer"
                aria-label="Close Menu"
              >
                <Icons.X className="w-5 h-5" />
              </button>
            </div>

            {/* Navigation Links */}
            <div className="px-5 py-6 flex-1 space-y-1">
              <div className="text-[10px] font-mono tracking-widest text-[#8C8276] uppercase mb-3 px-3">
                {lang === "ja" ? "メニューナビゲーション" : "Menu Navigation"}
              </div>

              {[
                {
                  num: "01",
                  id: "dilemma",
                  title_ja: "都会の渇きと静寂への回帰",
                  title_en: "The Modern Dilemma",
                  sub: "Dilemma",
                },
                {
                  num: "02",
                  id: "practice",
                  title_ja: "手かざし（お浄め）とは",
                  title_en: "The Art of Divine Light",
                  sub: "Tekazashi",
                },
                {
                  num: "03",
                  id: "principles",
                  title_ja: "3つの安心と透明性",
                  title_en: "Three Commitments",
                  sub: "Integrity",
                },
                {
                  num: "04",
                  id: "journey",
                  title_ja: "当日の体験の流れ",
                  title_en: "First Visit Journey",
                  sub: "Journey",
                },
                {
                  num: "05",
                  id: "access",
                  title_ja: "所在地・アクセス情報",
                  title_en: "Sanctuary Location",
                  sub: "Location",
                },
                {
                  num: "06",
                  id: "faq",
                  title_ja: "よくあるご質問",
                  title_en: "Frequently Asked Questions",
                  sub: "FAQ",
                },
              ].map((item) => (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-between p-3.5 rounded-xl hover:bg-[#F2EDE4] active:bg-[#EAE3D9] border border-transparent hover:border-[#E5DDD2] transition-colors group cursor-pointer"
                >
                  <div className="flex items-center gap-3.5">
                    <span className="w-8 h-8 rounded-lg bg-[#EFE8DE] group-hover:bg-[#DE7356] group-hover:text-white transition-colors flex items-center justify-center font-mono text-xs font-semibold text-[#8C8276]">
                      {item.num}
                    </span>
                    <div>
                      <div className="font-serif text-sm font-medium text-[#1A1816] group-hover:text-[#DE7356] transition-colors">
                        {lang === "ja" ? item.title_ja : item.title_en}
                      </div>
                      <div className="text-[10px] font-mono tracking-wider text-[#8C8276] uppercase">
                        {item.num} / {item.sub}
                      </div>
                    </div>
                  </div>
                  <Icons.ArrowRight className="w-4 h-4 text-[#A89F94] group-hover:text-[#DE7356] group-hover:translate-x-1 transition-all" />
                </a>
              ))}
            </div>

            {/* Bottom Actions & Contacts */}
            <div className="p-6 border-t border-[#EAE3D9] bg-[#F4EFEA] space-y-4">
              {/* Language Switcher in Drawer */}
              <div className="flex items-center justify-between bg-white p-2 rounded-xl border border-[#DDD4C7]">
                <span className="text-xs font-mono text-[#8C8276] uppercase pl-2">
                  {lang === "ja" ? "表示言語" : "Language"}
                </span>
                <div className="flex items-center border border-[#DDD4C7] rounded-full p-0.5 bg-[#F2EDE4]">
                  <button
                    type="button"
                    onClick={() => setLang("ja")}
                    className={`px-3 py-1 rounded-full text-xs font-mono font-medium transition-all cursor-pointer ${
                      lang === "ja" ? "bg-[#1A1816] text-[#FBF9F5] shadow-xs" : "text-[#7C756B]"
                    }`}
                  >
                    日本語
                  </button>
                  <button
                    type="button"
                    onClick={() => setLang("en")}
                    className={`px-3 py-1 rounded-full text-xs font-mono font-medium transition-all cursor-pointer ${
                      lang === "en" ? "bg-[#1A1816] text-[#FBF9F5] shadow-xs" : "text-[#7C756B]"
                    }`}
                  >
                    English
                  </button>
                </div>
              </div>

              {/* Main Booking CTA */}
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  setSubmitStatus("idle");
                  setIsModalOpen(true);
                }}
                className="w-full flex items-center justify-center gap-2 bg-[#DE7356] hover:bg-[#C86348] text-white py-3.5 rounded-full font-mono text-xs uppercase tracking-widest shadow-md active:scale-[0.99] transition-all cursor-pointer"
              >
                <span>{lang === "ja" ? "体験セッションを予約する" : "Reserve a Session"}</span>
                <Icons.ArrowRight className="w-4 h-4" />
              </button>

              {/* Direct Tap to Contact */}
              <div className="grid grid-cols-2 gap-2 pt-1 text-center text-xs font-mono text-[#6C645A]">
                <a
                  href="tel:+16268615069"
                  className="p-2.5 rounded-xl bg-white border border-[#E5DDD2] hover:border-[#DE7356] hover:text-[#DE7356] transition-colors flex items-center justify-center gap-1.5"
                >
                  <Icons.Phone className="w-3.5 h-3.5 text-[#DE7356]" />
                  <span>(626) 861-5069</span>
                </a>
                <a
                  href="mailto:losangeles@worlddivinelight.org"
                  className="p-2.5 rounded-xl bg-white border border-[#E5DDD2] hover:border-[#DE7356] hover:text-[#DE7356] transition-colors flex items-center justify-center gap-1.5"
                >
                  <Icons.Mail className="w-3.5 h-3.5 text-[#DE7356]" />
                  <span>Email</span>
                </a>
              </div>

              {/* Address / Monterey Park note */}
              <div className="text-[10px] font-mono text-[#8C8276] text-center">
                Monterey Park, CA ｜ 501(c)(3) Nonprofit Organization
              </div>
            </div>
          </div>
        </div>
      )}

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
                  神の大愛の光に包まれ、
                  <br />
                  本来の澄んだ自分へ。
                </>
              ) : (
                <>
                  <span className="block text-xl sm:text-2xl font-mono tracking-widest text-[#E3A387] mb-2 uppercase font-light">
                    Back to the Origin
                  </span>
                  Wrapped in the Radiant Light
                  <br />
                  <span className="italic font-light text-[#E8E2D7]">of God’s Boundless Love.</span>
                </>
              )}
            </h1>

            {/* Hairline Divider */}
            <div className="w-16 h-px bg-[#DE7356]"></div>

            {/* Subcopy */}
            <p className="max-w-2xl text-sm sm:text-base md:text-lg text-[#D6CFBE] font-light leading-relaxed">
              {lang === "ja" ? (
                "ロサンゼルスの日常で、知らず知らずのうちに積み重なる心身の重荷。言葉や思考を休め、ただ静かに身を委ねる。天から降り注ぐ神の大愛のみ光を取り次ぐ「手かざし（Art of Divine Light）」が、魂の奥底の曇りをそっと溶かし、本来の穏やかな命の輝きを呼び覚まします。"
              ) : (
                "Beyond the constant rush of the city lies a space to pause. Experience tekazashi—the gentle Art of Divine Light. Not a mere human technique, but the boundless love of God descending as pure, radiant light to dissolve inner burdens and restore your peaceful, unburdened self."
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
                <span>{lang === "ja" ? "体験セッションを予約する" : "Reserve a Divine Light Session"}</span>
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
              <span>100% NON-PROFIT 501(C)(3) ｜ PURELY DONATION-BASED</span>
            </div>
            <a href="#dilemma" className="inline-flex items-center gap-2 text-white/70 hover:text-white transition-colors">
              <span>( Scroll Down ↓ )</span>
            </a>
          </div>

        </div>
      </section>

      {/* ====================================================================
          SECTION 02: THE MODERN DILEMMA / EMPATHY
          Aesthetic: atami-sanga.jp (Dark-to-Light Sanctuary & Clean Window Frame)
          - Frame coordinates caption removed as requested
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
                  "情報とスピードに満ちた街で、なぜ心は愛と静けさを求めるのか。"
                ) : (
                  "In a World of Constant Movement, Where Does the Soul Find Rest?"
                )}
              </h2>
            </div>
            <div className="text-xs font-mono text-[#A89F94] tracking-widest uppercase">
              LOS ANGELES CONTEXT
            </div>
          </div>

          {/* Grid Layout: Framed Sanctuary Nature View (Caption removed) */}
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
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>
                </div>
              </div>
            </div>

            {/* Right: Thoughtful Typography and Analysis */}
            <div className="lg:col-span-7 order-1 lg:order-2 space-y-6 sm:space-y-8">
              
              <div className="space-y-5 text-base sm:text-lg text-[#C8BFB2] leading-relaxed font-light">
                {lang === "ja" ? (
                  <>
                    <p className="text-xl sm:text-2xl text-[#F4EFEA] font-serif leading-snug">
                      車列の途切れないフリーウェイ、絶え間なく鳴る通知、常に成果を求められ続ける日々。
                    </p>
                    <p>
                      便利で豊かな暮らしのただ中にありながら、私たちはどこかで拭いきれない「深い重さと孤独」を抱えています。
                    </p>
                    <p>
                      それは単なる肉体の疲労ではありません。大自然のリズムから切り離され、魂の奥底にある本来の美しい神性が、日々の摩擦や思考のノイズ（曇り）に覆われてしまっているからです。
                    </p>
                    <p>
                      人は、テクニックや言葉の慰めだけでは、心の奥の渇きを癒やすことはできません。
                    </p>
                    <div className="p-6 rounded-xl bg-[#23201C] border border-[#3A342D] space-y-2">
                      <p className="text-sm font-mono uppercase tracking-widest text-[#DE7356]">
                        Return to the Origin of Love
                      </p>
                      <p className="text-[#E6E0D5] font-serif italic text-base">
                        今、私たちに必要なのは、何かを足すことではなく、ただすべてを包み込む神の大愛のみ光に浸り、本来の澄んだ自分へと還る時間です。
                      </p>
                    </div>
                  </>
                ) : (
                  <>
                    <p className="text-xl sm:text-2xl text-[#F4EFEA] font-serif leading-snug">
                      Surrounded by endless highways, digital alerts, and constant demands, we carry an unshakeable inner fatigue.
                    </p>
                    <p>
                      It is more than physical exhaustion—it is the subtle weight of disconnect from natural stillness and the origin of love. Just as water settles when undisturbed, your spirit requires a sacred pause to clarify, breathe, and return to the unconditional love from which we came.
                    </p>
                    <div className="p-6 rounded-xl bg-[#23201C] border border-[#3A342D] space-y-2">
                      <p className="text-sm font-mono uppercase tracking-widest text-[#DE7356]">
                        A Sacred Pause in God’s Boundless Love
                      </p>
                      <p className="text-[#E6E0D5] font-serif italic text-base">
                        We do not need more stimuli; we need the grace to let go and rest in the boundless light of God&apos;s love.
                      </p>
                    </div>
                  </>
                )}
              </div>

              {/* Data points */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-4 border-t border-[#35302A] text-xs font-mono">
                <div className="space-y-1">
                  <div className="text-[#877E73] uppercase">Practice</div>
                  <div className="text-[#F4EFEA] font-medium">Tekazashi (Divine Light)</div>
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
          - The Art of Divine Light (Tekazashi)
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
                  <span className="text-[#964731] font-normal">神の大愛が「光」となって魂をほどく。</span>
                </>
              ) : (
                <>
                  The Art of Divine Light.
                  <br />
                  <span className="text-[#964731] font-normal italic">Pure Divine Love Descending as Radiant Light.</span>
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
                    ? "医療行為でも、催眠術や暗示でもありません。人間が本来宿している「神の子としての澄んだ生命力」へと立ち返るための、純粋で静かなアプローチです。"
                    : "Tekazashi is not medical treatment, nor is it hypnosis or psychological persuasion. It is a sacred, time-tested approach to awakening inner peace and divine vitality."}
                </p>
              </div>
            </div>

            {/* Content & Step Architecture */}
            <div className="lg:col-span-7 space-y-8">
              
              <div className="prose text-[#4A433A] text-base sm:text-lg leading-relaxed font-light space-y-5">
                {lang === "ja" ? (
                  <>
                    <p className="text-xl font-serif text-[#1A1816]">
                      「手かざし（Art of Divine Light）」は、人間が自らの念力やエネルギーを加えるものではありません。天地万物を生み出された創造主（元主大神様）の純粋な愛そのものが、目に見える現界において「聖なる光」となって天から降り注がれています。
                    </p>
                    <p>
                      施術者はその光を、無私の心で静かにお取り次ぎするパイプに過ぎません。
                    </p>
                    <p>
                      椅子に深く腰掛け、そっと目を閉じる。約30cm離れた手のひらから注がれる温かな愛の光が、魂の奥底にこびりついた想念の曇りや緊張を優しく溶かし、内側から芯まで満たされるような深い平安をもたらします。
                    </p>
                    <p className="text-sm sm:text-base text-[#665D52]">
                      医療行為でも、催眠でもありません。神の大愛に包まれることで、人間が本来授かっている「神の子としての澄んだ生命力」へと立ち返るための、最も純粋で静かなアプローチです。
                    </p>
                  </>
                ) : (
                  <>
                    <p className="text-xl font-serif text-[#1A1816]">
                      Tekazashi involves no physical contact, no personal force, and no human will. The practice is founded on the profound truth that God’s boundless love descends as radiant, purifying light.
                    </p>
                    <p>
                      The practitioner serves solely as a humble, clear conduit. Seated comfortably with eyes closed, you simply receive. The gentle warmth of Divine Light dissolves the spiritual burdens of daily life, awakening the luminous peace within.
                    </p>
                  </>
                )}
              </div>

              {/* 3 Pillars */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
                
                <div className="p-5 rounded-xl bg-white border border-[#EAE3D9] shadow-xs space-y-2">
                  <span className="text-xs font-mono text-[#DE7356] font-semibold tracking-wider">01 / PURE LIGHT</span>
                  <h3 className="font-serif text-base font-medium text-[#1A1816]">
                    {lang === "ja" ? "神の大愛のみ光" : "Light of Divine Love"}
                  </h3>
                  <p className="text-xs text-[#6C645A] leading-relaxed">
                    {lang === "ja"
                      ? "天地万物の創造主の純粋な愛が聖なる光となって注がれ、魂の奥底の曇りを優しく溶かします。"
                      : "God's boundless love descends as radiant, purifying light to dissolve inner spiritual burdens."}
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
                  <span className="text-xs font-mono text-[#DE7356] font-semibold tracking-wider">03 / NON-CONTACT</span>
                  <h3 className="font-serif text-base font-medium text-[#1A1816]">
                    {lang === "ja" ? "触れず、語らず" : "Non-Contact Conduit"}
                  </h3>
                  <p className="text-xs text-[#6C645A] leading-relaxed">
                    {lang === "ja"
                      ? "約30cm離れた手から光を静かにお取り次ぎします。お身体に直接触れることは一切ございません。"
                      : "Channeled approximately 12 inches away. There is no physical contact."}
                  </p>
                </div>

              </div>

            </div>

          </div>

        </div>
      </section>

      {/* ====================================================================
          SECTION 04: THREE COMMITMENTS TO INTEGRITY
          - Purely Donation-Based (Free First Visit removed as requested)
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
                  : "Built on Sincerity and Universal Love. Three Commitments to Every Guest."}
              </h2>
            </div>
            <p className="text-xs font-mono uppercase tracking-widest text-[#7C7368] max-w-xs">
              TRANSPARENCY & PEACE OF MIND
            </p>
          </div>

          {/* 3-Column Card Layout */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-[#DDD3C4] border border-[#DDD3C4] mt-12 rounded-2xl overflow-hidden shadow-xs">
            
            {/* Card 01: Purely Donation-Based */}
            <div className="bg-[#FBF9F5] p-8 sm:p-10 flex flex-col justify-between hover:bg-white transition-colors duration-300">
              <div className="space-y-6">
                <div className="flex items-center justify-between border-b border-[#EAE3D9] pb-4">
                  <span className="text-4xl sm:text-5xl font-mono font-light text-[#1A1816]">01</span>
                  <span className="text-[10px] font-mono tracking-widest uppercase px-2 py-1 bg-[#F2EDE4] rounded text-[#7C7368]">
                    DONATION-BASED
                  </span>
                </div>
                <h3 className="text-xl sm:text-2xl font-serif text-[#1A1816] font-medium leading-snug">
                  {lang === "ja" ? "完全な自発性（ドネーション制）" : "Purely Donation-Based"}
                </h3>
                <p className="text-sm text-[#5D554B] leading-relaxed">
                  {lang === "ja"
                    ? "神の大愛に基づく実践だからこそ、営利目的の定額請求や義務的な支払いは一切ありません。すべてご自身の感謝と自発的なお気持ちによる御奉納（ドネーション）のみで運営されています。"
                    : "Rooted in Divine Love, there are no commercial demands, fixed fees, or obligatory charges. All practices are sustained purely through voluntary contributions (donations) based on your personal gratitude."}
                </p>
              </div>
              <div className="pt-8 text-xs font-mono text-[#8C8377] flex items-center gap-2">
                <Icons.Check className="w-3.5 h-3.5 text-[#DE7356]" />
                <span>{lang === "ja" ? "完全ドネーション制 ｜ 物品販売・強制請求一切なし" : "Purely donation-based ｜ Zero sales or fees"}</span>
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
                    ? "神の大愛は、人種や信条、既存の宗教の垣根を越えて、すべての人に等しく注がれています。特定の教義への改宗を求めることは一切なく、どなたにも開かれた場です。"
                    : "God's boundless love descends equally on all people regardless of race, background, or religious creed. We never solicit membership or demand conversion. Our sanctuary is open to all."}
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
                    ? "World Divine Light Organization は、米国政府に認められた非営利団体です。見返りを求めない真心のボランティアスタッフによって、誠実に維持されています。"
                    : "World Divine Light Organization is an officially recognized US 501(c)(3) non-profit entity, maintained with sincerity and dedication by selfless volunteer staff."}
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
              {lang === "ja" ? "静寂と大愛へ至る、55分間の流れ。" : "A Thoughtful 55-Minute Journey."}
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
                    ? "椅子に腰掛け、目を閉じてリラックスしてください。天から降り注ぐ神の大愛のみ光を静かにお取り次ぎします。途中で眠ってしまっても差し支えありません。"
                    : "Sit comfortably and close your eyes. Experience 30 minutes of deep quietude as the radiant light of God’s love is gently channeled over you."}
                </p>
              </div>
              <div className="mt-8 pt-4 border-t border-[#EAE3D9] text-[11px] font-mono text-[#8C8276]">
                {lang === "ja" ? "※神の大愛に身を委ねる静寂の時間" : "Channeled with God's Boundless Love"}
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
              <span>{lang === "ja" ? "この流れでセッションを予約する" : "Schedule this 55-minute session"}</span>
              <Icons.ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

        </div>
      </section>

      {/* ====================================================================
          SECTION 06: WORDS FROM THE CENTER (迎える人の声)
          - Staff Host: Kevin
          ==================================================================== */}
      <section className="py-28 sm:py-36 bg-[#F4EFEA] border-b border-[#EAE3D9] relative overflow-hidden">
        <div className="max-w-5xl mx-auto px-6 sm:px-12">
          
          <div className="relative bg-[#FBF9F5] rounded-3xl border border-[#E2DAD0] p-8 sm:p-14 shadow-sm">
            
            {/* Header Badge */}
            <div className="flex items-center justify-between border-b border-[#EAE3D9] pb-6 mb-8">
              <span className="text-xs font-mono tracking-widest uppercase text-[#DE7356]">
                05 / MESSAGE
              </span>
              <span className="text-xs font-mono text-[#8A8174]">Staff Host: Kevin</span>
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
                    「ロサンゼルスで懸命に日々を過ごしていると、いつの間にか呼吸が浅くなり、自分の本質や温もりを見失ってしまうことがあります。
                  </p>
                  <p>
                    私たちが大切にしているのは、何かを教え込むことではなく、神様の大愛の光に包まれて、誰もが『ありのままの自分』で安心して魂を休められる場所をお守りすることです。
                  </p>
                  <p>
                    特別な準備も、気負いも要りません。心が温もりを求めたときは、いつでも静かに扉を開けてください。」
                  </p>
                  <p className="text-sm font-mono text-[#8C8276] pt-2">
                    — スタッフ：Kevin
                  </p>
                </>
              ) : (
                <>
                  <p>
                    &ldquo;Living in the vibrant pace of Los Angeles, it is easy to feel overwhelmed and disconnected.
                  </p>
                  <p>
                    Our center does not seek to lecture or persuade; we simply offer a quiet sanctuary where you are held in the pure light of God&apos;s love.
                  </p>
                  <p>
                    Whenever you feel the need to pause and breathe, our doors are open.&rdquo;
                  </p>
                  <p className="text-xs font-mono text-[#8C8276] pt-2">
                    — Kevin, Staff Host
                  </p>
                </>
              )}
            </div>

            {/* Signature Area: Kevin */}
            <div className="mt-10 pt-6 border-t border-[#EAE3D9] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="relative w-12 h-12 rounded-full overflow-hidden bg-[#964731] flex items-center justify-center text-white font-serif text-base font-medium">
                  K
                </div>
                <div>
                  <div className="text-sm font-semibold text-[#1A1816]">Kevin</div>
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
          - Email: losangeles@worlddivinelight.org
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
                  <a href="mailto:losangeles@worlddivinelight.org" className="block text-xs text-[#665D52] hover:text-[#DE7356] transition-colors truncate font-mono">
                    losangeles@worlddivinelight.org
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
          - Q1: Purely Donation-Based (No "Free" claim)
          - Q3: Accurate vital-point touch before/after
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
                q_ja: "料金やドネーションはどのようになっていますか？",
                a_ja: "当センターは定額の料金設定や義務的な請求は一切ございません。すべてご自身の感謝と自発的なお気持ちによる御奉納（ドネーション）によって支えられております。物品の販売や無理な支払いを求めることは一切ございません。",
                q_en: "How do fees and donations work?",
                a_en: "There are no fixed fees or obligatory charges. All sessions and activities are purely donation-based, supported by heartfelt voluntary contributions with zero obligation.",
              },
              {
                q_ja: "特定の宗教を信じていなくても参加できますか？",
                a_ja: "はい。どのような宗教・信条をお持ちの方でも、あるいは無宗教の方でも、分け隔てなく歓迎いたします。教義の押し付けや改宗の要求は一切ありません。",
                q_en: "Do I need a specific religious background?",
                a_en: "Not at all. People of all faiths and life philosophies are warmly welcomed.",
              },
              {
                q_ja: "施術中に身体に触れられることはありますか？",
                a_ja: "いいえ。手かざしは完全な非接触（約30cm離れた位置）で行われます。お身体に直接触れることは一切ございません。",
                q_en: "Is there any physical contact during tekazashi?",
                a_en: "None. The practice is completely non-contact, held approximately 12 inches away from your body.",
              },
              {
                q_ja: "予約なしで当日伺うことはできますか？",
                a_ja: "落ち着いた静謐な空間を保つため、また行事等により開館時間が変更となる場合があるため、必ず事前のご予約をお願いしております。お電話・SMSまたは予約フォームよりご連絡ください。",
                q_en: "Can I walk in without an appointment?",
                a_en: "Because our hours may adjust for community events and to ensure private quietude, advance reservations are required.",
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
            {lang === "ja" ? "体験セッションのご案内" : "Introductory Session"}
          </span>

          <h2 className="text-3xl sm:text-5xl md:text-6xl font-serif font-light tracking-tight leading-tight max-w-3xl mx-auto text-[#FAF6F0]">
            {lang === "ja" ? (
              <>
                神の大愛の光に包まれ、
                <br />
                本来の澄みわたるあなたへ。
              </>
            ) : (
              <>
                Wrapped in Divine Love.
                <br />
                <span className="italic font-light text-[#E0D7CC]">Step Into the Light.</span>
              </>
            )}
          </h2>

          <p className="max-w-2xl mx-auto text-sm sm:text-lg text-[#C8BFB2] font-light leading-relaxed">
            {lang === "ja"
              ? "都会の速度から一歩身を引き、心と魂に純粋な静寂と愛の温もりを届ける。静かな空間とお席を整えてお待ちしております。"
              : "Take a quiet step away from the urban noise. A sanctuary of peace and boundless divine love awaits you in Monterey Park."}
          </p>

          <div className="pt-6 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => {
                setSubmitStatus("idle");
                setIsModalOpen(true);
              }}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-3 bg-[#DE7356] hover:bg-[#C86348] text-white px-9 py-4 rounded-full font-mono text-xs uppercase tracking-widest transition-all duration-300 shadow-xl cursor-pointer"
            >
              <span>{lang === "ja" ? "体験セッションを予約する" : "Book Your Session"}</span>
              <Icons.ArrowRight className="w-4 h-4" />
            </button>

            <a
              href="tel:+16268615069"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 border border-white/20 hover:border-white/50 text-white/90 px-7 py-4 rounded-full font-mono text-xs uppercase tracking-widest transition-colors backdrop-blur-sm"
            >
              <Icons.Phone className="w-3.5 h-3.5 text-[#DE7356]" />
              <span>{lang === "ja" ? "事前お問い合わせ（通話・SMS）: +1 (626) 861-5069" : "Direct Call / SMS: +1 (626) 861-5069"}</span>
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
                <Image
                  src="/assets/wdl_logo.png"
                  alt="World Divine Light"
                  width={130}
                  height={40}
                  className="h-8 w-auto object-contain brightness-0 invert opacity-90 block"
                />
              </div>
              <div className="space-y-1">
                <p className="text-xs font-medium text-white/90">
                  World Divine Light Organization — Los Angeles Divine Light Center
                </p>
                <p className="text-xs text-[#7A7266] leading-relaxed max-w-md">
                  A US Government-Recognized 501(c)(3) Nonprofit Spiritual Organization dedicated to spiritual harmony and inner peace through the Art of Divine Light (Tekazashi).
                </p>
              </div>
            </div>

            {/* Col 2: Navigation Links */}
            <div className="md:col-span-3 space-y-3 font-mono text-xs uppercase tracking-wider">
              <span className="text-white block font-medium">Quick Directory</span>
              <ul className="space-y-2 text-[#7A7266]">
                <li><a href="#dilemma" className="hover:text-white transition-colors">01 / The Dilemma</a></li>
                <li><a href="#practice" className="hover:text-white transition-colors">02 / Tekazashi</a></li>
                <li><a href="#principles" className="hover:text-white transition-colors">03 / Integrity</a></li>
                <li><a href="#journey" className="hover:text-white transition-colors">04 / Journey</a></li>
                <li><a href="#access" className="hover:text-white transition-colors">05 / Location</a></li>
                <li><a href="#faq" className="hover:text-white transition-colors">06 / FAQ</a></li>
              </ul>
            </div>

            {/* Col 3: Direct Contacts & Hours */}
            <div className="md:col-span-4 space-y-3 font-mono text-xs">
              <span className="text-white block uppercase tracking-wider font-medium">Visiting Address & Hours</span>
              <div className="text-[#8C8377] leading-relaxed">
                <div>809 S Atlantic Blvd, #378</div>
                <div>Monterey Park, CA 91754</div>
                <div className="mt-2 text-white/80">Tue–Sat 10:00 AM – 6:00 PM</div>
                <div className="text-white/80">Sun 9:00 AM – 4:00 PM (Closed Mon)</div>
                <div className="mt-2 text-white">Direct: +1 (626) 861-5069</div>
                <div>Email: losangeles@worlddivinelight.org</div>
              </div>
            </div>

          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] font-mono text-[#665E55]">
            <div>
              © 2026 World Divine Light Organization. All rights reserved.
            </div>
            <div className="flex items-center gap-6">
              <span>501(c)(3) Nonprofit Entity</span>
              <span>Purely Donation-Based</span>
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
                    ? "お問い合わせありがとうございます。当センターのスタッフ（Kevin）より、確認のEメールまたはSMSをご連絡いたします。"
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
                    SANCTUARY APPOINTMENT
                  </span>
                  <h3 className="text-2xl font-serif font-medium text-[#1A1816]">
                    {lang === "ja" ? "体験セッションの予約" : "Book Your Session"}
                  </h3>
                  <p className="text-xs text-[#7C7368] mt-1">
                    {lang === "ja"
                      ? "完全事前予約制 ｜ 約55分の静寂と神の大愛に包まれるひととき（ドネーション制）"
                      : "By advance appointment ｜ Approx. 55 minutes of quietude & Divine Light (Donation-based)"}
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
                        : (lang === "ja" ? "体験セッションを予約する" : "Submit Reservation Request")}
                    </span>
                    <Icons.ArrowRight className="w-4 h-4" />
                  </button>
                </div>

                <div className="text-[11px] text-[#7C7368] text-center leading-relaxed">
                  {lang === "ja"
                    ? "お電話・SMSでのお問い合わせも直接承っております（+1 626-861-5069）。完全なドネーション制であり、無理な勧誘や請求は一切ございません。"
                    : "Direct SMS/call inquiries are always welcome (+1 626-861-5069). Purely donation-based with zero obligations."}
                </div>

              </form>
            )}

          </div>
        </div>
      )}

    </div>
  );
}
