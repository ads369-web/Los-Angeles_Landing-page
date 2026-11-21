"use client";

import React, { useState, useEffect, useRef, useSyncExternalStore } from "react";
import Link from "next/link";
import { Menu, X, ChevronDown, CheckCircle2, MapPin, Clock, Car, Phone, Mail, ShieldCheck, AlertCircle } from "lucide-react";
import OpeningSplash from "@/components/OpeningSplash";
import SmoothScroll from "@/components/SmoothScroll";
import { LP_COPY, type Language } from "@/data/lpCopy";
import { BookingFormSchema } from "@/lib/bookingSchema";

const VALID_LANGS: readonly Language[] = ["en", "ja", "zh", "es"] as const;
const LANG_STORAGE_KEY = "wdl_la_lang";
const LANG_EVENT = "wdl-lang-change";

function isLanguage(value: string | null): value is Language {
  return value !== null && (VALID_LANGS as readonly string[]).includes(value);
}

function getLangSnapshot(): Language {
  if (typeof window === "undefined") return "en";
  const urlParam = new URLSearchParams(window.location.search).get("lang");
  if (isLanguage(urlParam)) return urlParam;
  const stored = window.localStorage.getItem(LANG_STORAGE_KEY);
  if (isLanguage(stored)) return stored;
  return "en";
}

function getLangServerSnapshot(): Language {
  return "en";
}

function subscribeToLang(callback: () => void): () => void {
  if (typeof window === "undefined") return () => {};
  window.addEventListener(LANG_EVENT, callback);
  window.addEventListener("storage", callback);
  window.addEventListener("popstate", callback);
  return () => {
    window.removeEventListener(LANG_EVENT, callback);
    window.removeEventListener("storage", callback);
    window.removeEventListener("popstate", callback);
  };
}

let cachedTodayIso = "";
function getTodaySnapshot(): string {
  if (typeof window === "undefined") return "";
  if (!cachedTodayIso) {
    cachedTodayIso = new Date().toISOString().split("T")[0];
  }
  return cachedTodayIso;
}
function getTodayServerSnapshot(): string {
  return "";
}
function noopSubscribe(): () => void {
  return () => {};
}

const DEFAULT_BOOKING_STATE = {
  fullName: "",
  email: "",
  phone: "",
  preferredDate: "",
  preferredTime: "",
  preferredLanguage: "English" as "English" | "Japanese" | "Chinese" | "Spanish",
  practitionerPreference: "No preference" as "No preference" | "Female practitioner" | "Male practitioner",
  notes: "",
  smsConsent: false,
};

function mapUiLangToFormLang(lang: Language): "English" | "Japanese" | "Chinese" | "Spanish" {
  switch (lang) {
    case "ja":
      return "Japanese";
    case "zh":
      return "Chinese";
    case "es":
      return "Spanish";
    default:
      return "English";
  }
}

export default function HomePage() {
  const lang = useSyncExternalStore(subscribeToLang, getLangSnapshot, getLangServerSnapshot);
  const todayIso = useSyncExternalStore(noopSubscribe, getTodaySnapshot, getTodayServerSnapshot);
  const t = LP_COPY[lang];

  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeStepIndex, setActiveStepIndex] = useState(0);

  // Booking form state
  const [formValues, setFormValues] = useState(DEFAULT_BOOKING_STATE);
  const [languageTouched, setLanguageTouched] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string[]>>({});
  const [submitStatus, setSubmitStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [submitMessage, setSubmitMessage] = useState("");
  const drawerCloseBtnRef = useRef<HTMLButtonElement>(null);

  const effectivePreferredLanguage = languageTouched
    ? formValues.preferredLanguage
    : mapUiLangToFormLang(lang);

  const effectivePreferredTime =
    formValues.preferredTime || t.booking.form.timeOptions[0];

  const handleSetLang = (next: Language) => {
    if (typeof window === "undefined") return;
    window.localStorage.setItem(LANG_STORAGE_KEY, next);
    const url = new URL(window.location.href);
    url.searchParams.set("lang", next);
    window.history.replaceState({}, "", url.toString());
    window.dispatchEvent(new Event(LANG_EVENT));
  };

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
      drawerCloseBtnRef.current?.focus();
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  const scrollToTarget = (selector: string) => {
    setMobileMenuOpen(false);
    const el = document.querySelector(selector);
    if (!el) return;
    const headerOffset = 96;
    const top = el.getBoundingClientRect().top + window.scrollY - headerOffset;
    window.scrollTo({ top: Math.max(0, top), behavior: "smooth" });
  };

  const handleBookingSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFieldErrors({});
    setSubmitMessage("");

    const payload = {
      ...formValues,
      preferredLanguage: effectivePreferredLanguage,
      preferredTime: effectivePreferredTime,
    };

    const parsed = BookingFormSchema.safeParse(payload);
    if (!parsed.success) {
      setFieldErrors(parsed.error.flatten().fieldErrors);
      setSubmitStatus("error");
      setSubmitMessage(t.booking.form.validationNotice);
      return;
    }

    setSubmitStatus("submitting");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(parsed.data),
      });

      if (!res.ok) {
        const errData = (await res.json().catch(() => null)) as {
          error?: string;
          fieldErrors?: Record<string, string[]>;
        } | null;
        if (errData?.fieldErrors) {
          setFieldErrors(errData.fieldErrors);
        }
        setSubmitStatus("error");
        setSubmitMessage(t.booking.form.errorFallback);
        return;
      }

      if (typeof window !== "undefined") {
        const gtagFn = (window as unknown as { gtag?: (...args: unknown[]) => void }).gtag;
        if (typeof gtagFn === "function") {
          gtagFn("event", "conversion", {
            send_to: "AW-853490942/rYqNCMjM_vYZEN7b_5YD",
          });
        }
      }

      setSubmitStatus("success");
      setSubmitMessage(t.booking.form.successBody);
      setFormValues(DEFAULT_BOOKING_STATE);
      setLanguageTouched(false);
    } catch {
      setSubmitStatus("error");
      setSubmitMessage(t.booking.form.errorFallback);
    }
  };

  const renderLangSwitch = (compact = false) => (
    <div
      role="group"
      aria-label={t.nav.languageLabel}
      className={
        compact
          ? "grid grid-cols-4 gap-1 rounded-full bg-[#EFEAE1] p-1 border border-[#E5E0D8]"
          : "inline-flex items-center rounded-full bg-[#EFEAE1] p-1 border border-[#E5E0D8]"
      }
    >
      {(["en", "ja", "zh", "es"] as const).map((code) => {
        const active = lang === code;
        const shortLabel = code === "en" ? "EN" : code === "ja" ? "日本語" : code === "zh" ? "中文" : "ES";
        return (
          <button
            key={code}
            type="button"
            onClick={() => handleSetLang(code)}
            aria-pressed={active}
            className={`px-2.5 py-1 text-[11px] font-semibold rounded-full transition-colors cursor-pointer ${
              active
                ? "bg-[#1A1816] text-[#FBF9F5] shadow-xs"
                : "text-[#5C554F] hover:text-[#1A1816]"
            }`}
          >
            {shortLabel}
          </button>
        );
      })}
    </div>
  );

  return (
    <div className="min-h-screen bg-[#FBF9F5] text-[#1A1816] selection:bg-[#DE7356]/20 selection:text-[#1A1816]">
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

      {/* Two-Tier Sticky Header */}
      <header
        className={`sticky top-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-[#FBF9F5]/95 backdrop-blur-md shadow-sm border-b border-[#E5E0D8]"
            : "bg-[#FBF9F5]/92 backdrop-blur-sm border-b border-[#E5E0D8]/70"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Tier 1: Brand + Language + Primary CTA + Mobile Trigger */}
          <div className="h-16 sm:h-[72px] flex items-center justify-between gap-4">
            <a
              href="#hero"
              onClick={(e) => {
                e.preventDefault();
                scrollToTarget("#hero");
              }}
              className="flex items-center gap-3 min-w-0 group"
            >
              <img
                src="/assets/wdl_logo.png"
                alt="World Divine Light"
                width={96}
                height={34}
                className="h-7 sm:h-8 w-auto object-contain shrink-0"
              />
              <div className="border-l border-[#E5E0D8] pl-3 min-w-0">
                <p className="font-serif font-semibold text-sm sm:text-base text-[#1A1816] truncate group-hover:text-[#9A5B25] transition-colors">
                  {t.nav.centerName}
                </p>
                <p className="hidden sm:block text-[10px] tracking-[0.18em] text-[#6C655E] truncate">
                  {t.nav.centerTagline}
                </p>
              </div>
            </a>

            <div className="flex items-center gap-3 shrink-0">
              <div className="hidden md:block">{renderLangSwitch(false)}</div>
              <button
                type="button"
                onClick={() => scrollToTarget("#booking")}
                className="hidden sm:inline-flex items-center justify-center rounded-full bg-[#DE7356] hover:bg-[#C86348] text-white text-xs sm:text-sm font-semibold px-4 sm:px-5 py-2.5 shadow-retro-btn transition-colors cursor-pointer"
              >
                {t.nav.cta}
              </button>
              <button
                type="button"
                onClick={() => setMobileMenuOpen(true)}
                aria-label={t.nav.menuOpen}
                aria-expanded={mobileMenuOpen}
                className="lg:hidden inline-flex items-center justify-center w-10 h-10 rounded-full border border-[#E5E0D8] bg-white text-[#1A1816] hover:bg-[#F4EFEA] transition-colors cursor-pointer"
              >
                <Menu className="w-5 h-5" aria-hidden="true" />
              </button>
            </div>
          </div>

          {/* Tier 2: Desktop Numbered Section Links */}
          <nav
            aria-label="Primary Navigation"
            className="hidden lg:flex items-center justify-between border-t border-[#E5E0D8]/70 py-2.5"
          >
            {t.nav.items.map((item) => (
              <a
                key={item.num}
                href={item.href}
                onClick={(e) => {
                  e.preventDefault();
                  scrollToTarget(item.href);
                }}
                className="group flex items-center gap-2 text-xs text-[#5C554F] hover:text-[#1A1816] transition-colors py-1"
              >
                <span className="font-mono text-[10px] font-semibold px-1.5 py-0.5 rounded bg-[#EFEAE1] text-[#6C655E] group-hover:bg-[#1A1816] group-hover:text-[#FBF9F5] transition-colors">
                  {item.num}
                </span>
                <span className="font-medium">{item.label}</span>
                <span className="text-[9px] tracking-[0.14em] text-[#8E867D] hidden xl:inline">
                  {item.enSub}
                </span>
              </a>
            ))}
          </nav>
        </div>
      </header>

      {/* Mobile Navigation Drawer — Bottom Language & CTA Always Pinned */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 z-[100] lg:hidden flex justify-end bg-[#1A1816]/50 backdrop-blur-xs"
          role="dialog"
          aria-modal="true"
          aria-label={t.nav.menuNavLabel}
        >
          <div className="w-full max-w-sm h-full bg-[#FBF9F5] flex flex-col shadow-2xl border-l border-[#E5E0D8]">
            {/* Drawer Header */}
            <div className="shrink-0 flex items-center justify-between px-5 py-4 border-b border-[#E5E0D8]">
              <div className="flex items-center gap-2.5">
                <img src="/assets/wdl_logo.png" alt="World Divine Light" className="h-6 w-auto" />
                <span className="font-serif font-semibold text-sm text-[#1A1816]">{t.nav.centerName}</span>
              </div>
              <button
                ref={drawerCloseBtnRef}
                type="button"
                onClick={() => setMobileMenuOpen(false)}
                aria-label={t.nav.menuClose}
                className="w-9 h-9 rounded-full border border-[#E5E0D8] bg-white flex items-center justify-center text-[#1A1816]"
              >
                <X className="w-4 h-4" aria-hidden="true" />
              </button>
            </div>

            {/* Scrollable Links Area */}
            <nav aria-label={t.nav.menuNavLabel} className="flex-1 min-h-0 overflow-y-auto px-5 py-4 space-y-1.5">
              {t.nav.items.map((item) => (
                <a
                  key={item.num}
                  href={item.href}
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToTarget(item.href);
                  }}
                  className="flex items-center justify-between px-3 py-3 rounded-2xl hover:bg-[#F4EFEA] border border-transparent hover:border-[#E5E0D8] transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <span className="w-7 h-7 rounded-lg bg-[#EFEAE1] text-[#6C655E] font-mono text-xs font-semibold flex items-center justify-center">
                      {item.num}
                    </span>
                    <div>
                      <p className="font-serif text-sm font-semibold text-[#1A1816]">{item.label}</p>
                      <p className="text-[10px] tracking-[0.14em] text-[#8E867D]">{item.enSub}</p>
                    </div>
                  </div>
                  <span className="text-[#8E867D]" aria-hidden="true">→</span>
                </a>
              ))}
            </nav>

            {/* Pinned Drawer Footer: Language Switch + Reserve Button Never Clipped */}
            <div className="shrink-0 p-5 border-t border-[#E5E0D8] bg-[#FAF6F0] space-y-3">
              <div>
                <p className="text-[10px] uppercase tracking-[0.16em] text-[#6C655E] mb-2">
                  {t.nav.languageLabel}
                </p>
                {renderLangSwitch(true)}
              </div>
              <button
                type="button"
                onClick={() => scrollToTarget("#booking")}
                className="w-full py-3.5 px-5 rounded-full bg-[#DE7356] hover:bg-[#C86348] text-white font-semibold text-sm shadow-retro-btn transition-colors cursor-pointer"
              >
                {t.nav.cta}
              </button>
            </div>
          </div>
        </div>
      )}

      <main id="main-content">
        {/* SECTION 01: YOSEMITE MISTY HERO (Preserving prod/main atmosphere) */}
        <section
          id="hero"
          className="relative min-h-[82vh] sm:min-h-[86vh] flex items-end pb-16 sm:pb-24 pt-24 overflow-hidden bg-[#1A1816]"
        >
          <img
            src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1920&q=85"
            alt="Serene misty mountain valley illuminated by quiet morning light"
            className="absolute inset-0 w-full h-full object-cover object-center opacity-80"
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
                <button
                  type="button"
                  onClick={() => scrollToTarget("#principle")}
                  className="inline-flex items-center justify-center rounded-full bg-[#DE7356] hover:bg-[#C86348] text-white font-semibold text-sm sm:text-base px-6 sm:px-7 py-3.5 shadow-retro-btn transition-colors cursor-pointer"
                >
                  {t.hero.primaryCta}
                </button>
                <button
                  type="button"
                  onClick={() => scrollToTarget("#booking")}
                  className="inline-flex items-center justify-center rounded-full bg-white/12 hover:bg-white/20 text-[#FBF9F5] border border-white/30 backdrop-blur-xs font-semibold text-sm sm:text-base px-6 sm:px-7 py-3.5 transition-colors cursor-pointer"
                >
                  {t.hero.secondaryCta}
                </button>
              </div>

              <p className="text-xs sm:text-sm text-[#CFC8BE] tracking-wide">
                {t.hero.facts}
              </p>
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

        {/* SECTION 02: DILEMMA (Dark #1A1816 w/ la_palm_trees.jpg) */}
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
                <p className="text-sm sm:text-base text-[#D3CCC2] leading-relaxed">
                  {t.dilemma.p1}
                </p>
                <p className="text-sm sm:text-base text-[#D3CCC2] leading-relaxed">
                  {t.dilemma.p2}
                </p>

                <div className="pt-2 space-y-3.5">
                  {t.dilemma.points.map((pt, i) => (
                    <div
                      key={i}
                      className={`p-4 rounded-2xl bg-white/[0.04] border border-white/10 reveal-up stagger-${i + 1}`}
                    >
                      <p className="font-serif text-sm font-semibold text-[#F3DFC1] mb-1">
                        {pt.label}
                      </p>
                      <p className="text-xs sm:text-sm text-[#C7BFB5] leading-relaxed">
                        {pt.text}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="lg:col-span-6 reveal-up stagger-2">
                <figure className="space-y-3">
                  <div className="rounded-3xl overflow-hidden border border-white/15 img-zoom-reveal shadow-2xl">
                    <img
                      src="/assets/la_palm_trees.jpg"
                      alt="Palm trees under clear Los Angeles light near Monterey Park"
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

        {/* SECTION 03: SPIRIT PRIMARY DIAGRAM (#principle - Hero CTA Target) */}
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
                    <img
                      src="/assets/spirit_primary_diagram.jpg"
                      alt={t.principleSection.diagramAlt}
                      className="w-full h-auto object-contain"
                    />
                  </div>
                  <figcaption className="pt-3 px-2 text-xs text-[#6C655E] leading-relaxed text-center">
                    {t.principleSection.diagramCaption}
                  </figcaption>
                </figure>
              </div>

              <div className="lg:col-span-5 space-y-4">
                {t.principleSection.stages.map((stage, i) => (
                  <div
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
                  </div>
                ))}
              </div>
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
                <p className="text-sm sm:text-base text-[#5C554F] leading-relaxed">
                  {t.practice.p1}
                </p>
                <p className="text-sm sm:text-base text-[#5C554F] leading-relaxed">
                  {t.practice.p2}
                </p>

                <div className="rounded-2xl bg-[#FAF6F0] border border-[#E5E0D8] p-5 space-y-2">
                  <p className="font-serif text-sm font-bold text-[#1A1816]">
                    {t.practice.noteTitle}
                  </p>
                  <p className="text-xs sm:text-sm text-[#5C554F] leading-relaxed">
                    {t.practice.noteBody}
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                  {t.practice.pillars.map((pillar, idx) => (
                    <div
                      key={idx}
                      className="rounded-2xl bg-white border border-[#E5E0D8] p-4 shadow-retro"
                    >
                      <h3 className="font-serif text-sm font-bold text-[#1A1816] mb-1.5">
                        {pillar.title}
                      </h3>
                      <p className="text-xs text-[#5C554F] leading-relaxed">{pillar.desc}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="lg:col-span-6 space-y-6 reveal-up stagger-2">
                <div className="rounded-3xl overflow-hidden border border-[#E5E0D8] bg-white shadow-retro img-zoom-reveal">
                  <img
                    src="/assets/okiyome_session.jpg"
                    alt={t.practice.sessionPhotoAlt}
                    className="w-full h-64 sm:h-72 object-cover"
                  />
                </div>
                <figure className="rounded-3xl bg-white border border-[#E5E0D8] p-3 sm:p-4 shadow-retro">
                  <div className="rounded-2xl overflow-hidden bg-[#FAF6F0]">
                    <img
                      src="/assets/okiyome_session_diagram.jpg"
                      alt={t.practice.diagramAlt}
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

        {/* SECTION 05: THREE TRANSPARENT COMMITMENTS (#principles - #F4EFEA Hairline Grid) */}
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

            <div className="grid grid-cols-1 md:grid-cols-3 border border-[#D8D0C4] rounded-3xl overflow-hidden bg-[#FBF9F5] shadow-retro">
              {t.commitments.cards.map((card, idx) => (
                <div
                  key={card.num}
                  className={`p-7 sm:p-8 flex flex-col justify-between reveal-up stagger-${idx + 1} ${
                    idx < 2 ? "border-b md:border-b-0 md:border-r border-[#E5E0D8]" : ""
                  }`}
                >
                  <div>
                    <p className="font-mono text-2xl font-bold text-[#DE7356] mb-4">
                      {card.num}
                    </p>
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
                </div>
              ))}
            </div>
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

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {t.journey.steps.map((step, idx) => {
                const isActive = activeStepIndex === idx;
                return (
                  <div
                    key={step.stepNum}
                    onClick={() => setActiveStepIndex(idx)}
                    className={`rounded-3xl p-6 sm:p-7 border transition-all cursor-pointer reveal-up stagger-${idx + 1} ${
                      isActive
                        ? "bg-white border-[#DE7356] shadow-retro-hover"
                        : "bg-[#FAF6F0] border-[#E5E0D8] hover:bg-white"
                    }`}
                  >
                    <div className="flex items-center justify-between gap-2 mb-4">
                      <span className="inline-flex items-center justify-center w-9 h-9 rounded-full bg-[#1A1816] text-[#FBF9F5] font-mono text-xs font-semibold">
                        {step.stepNum}
                      </span>
                      <span className="text-[11px] font-mono font-semibold text-[#9A5B25] bg-[#FBF5EB] px-2.5 py-1 rounded-full border border-[#E8DEC8]">
                        {step.duration}
                      </span>
                    </div>

                    <h3 className="font-serif text-lg sm:text-xl font-bold text-[#1A1816] mb-2">
                      {step.title}
                    </h3>
                    <p className="text-xs font-medium text-[#6C655E] mb-3">{step.shortDesc}</p>
                    <p className="text-xs sm:text-sm text-[#5C554F] leading-relaxed mb-4">
                      {step.fullDesc}
                    </p>
                    <p className="text-[11px] text-[#5B8266] bg-[#EBF2ED] border border-[#D4E4D8] rounded-xl px-3.5 py-2.5 leading-relaxed">
                      {step.reassurance}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* SECTION 07: WORDS FROM THE CENTER (Kevin Portrait) */}
        <section className="bg-[#FAF6F0] border-y border-[#E5E0D8] py-20 sm:py-24">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 reveal-up">
            <div className="rounded-3xl bg-white border border-[#E5E0D8] p-7 sm:p-12 shadow-retro grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
              <div className="md:col-span-4 flex flex-col items-center text-center">
                <div className="w-36 h-36 sm:w-44 sm:h-44 rounded-full overflow-hidden border-4 border-[#FAF6F0] shadow-md mb-4">
                  <img
                    src="/assets/staff_host.jpg"
                    alt={t.hostMessage.signatureName}
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
                  <button
                    type="button"
                    onClick={() => scrollToTarget("#booking")}
                    className="inline-flex items-center justify-center rounded-full bg-[#1A1816] hover:bg-[#322E2A] text-[#FBF9F5] text-xs sm:text-sm font-semibold px-6 py-3 transition-colors cursor-pointer"
                  >
                    {t.hostMessage.cta}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 08: ACCESS & PRACTICAL DETAILS (#access) */}
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

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-10">
              {t.access.rows.map((row, idx) => {
                const Icon = idx === 0 ? MapPin : idx === 1 ? Clock : idx === 2 ? Car : Phone;
                return (
                  <div
                    key={idx}
                    className={`rounded-2xl bg-white border border-[#E5E0D8] p-5 shadow-retro reveal-up stagger-${idx + 1}`}
                  >
                    <div className="w-9 h-9 rounded-xl bg-[#FAF6F0] border border-[#E5E0D8] flex items-center justify-center text-[#9A5B25] mb-3">
                      <Icon className="w-4 h-4" aria-hidden="true" />
                    </div>
                    <p className="text-[11px] font-semibold tracking-[0.14em] uppercase text-[#6C655E] mb-1">
                      {row.label}
                    </p>
                    <p className="font-serif text-sm font-bold text-[#1A1816] mb-1.5 leading-snug">
                      {row.value}
                    </p>
                    {row.sub && (
                      <p className="text-xs text-[#5C554F] leading-relaxed">{row.sub}</p>
                    )}
                  </div>
                );
              })}
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
              <button
                type="button"
                onClick={() => scrollToTarget("#booking")}
                className="shrink-0 rounded-full bg-[#DE7356] hover:bg-[#C86348] text-white text-sm font-semibold px-6 py-3.5 shadow-retro-btn transition-colors cursor-pointer"
              >
                {t.access.bannerCta}
              </button>
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

            {/* Honest Phone & Language Coordination Banner */}
            <div className="rounded-2xl bg-[#FBF5EB] border border-[#E5D3B3] p-4 sm:p-5 mb-8 flex items-start gap-3.5 reveal-up">
              <AlertCircle className="w-5 h-5 text-[#9A5B25] shrink-0 mt-0.5" aria-hidden="true" />
              <div className="text-xs sm:text-sm text-[#3F3833] leading-relaxed">
                <p className="font-semibold text-[#1A1816] mb-1">{t.booking.phoneNoteTitle}</p>
                <p>{t.booking.phoneNoteBody}</p>
              </div>
            </div>

            {submitStatus === "success" ? (
              <div className="rounded-3xl bg-white border border-[#5B8266]/40 p-8 sm:p-10 text-center shadow-retro space-y-4">
                <div className="w-12 h-12 rounded-full bg-[#EBF2ED] text-[#5B8266] flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-6 h-6" aria-hidden="true" />
                </div>
                <h3 className="font-serif text-2xl font-bold text-[#1A1816]">
                  {t.booking.form.successTitle}
                </h3>
                <p className="text-sm text-[#5C554F] max-w-lg mx-auto leading-relaxed">
                  {t.booking.form.successBody}
                </p>
                <button
                  type="button"
                  onClick={() => setSubmitStatus("idle")}
                  className="inline-flex items-center justify-center rounded-full border border-[#E5E0D8] px-5 py-2.5 text-xs font-semibold text-[#1A1816] hover:bg-[#FAF6F0] cursor-pointer"
                >
                  {t.booking.form.successReset}
                </button>
              </div>
            ) : (
              <form
                onSubmit={handleBookingSubmit}
                noValidate
                className="rounded-3xl bg-white border border-[#E5E0D8] p-6 sm:p-10 shadow-retro space-y-6"
              >
                {submitStatus === "error" && submitMessage && (
                  <div
                    role="alert"
                    className="rounded-2xl bg-[#FEF2F2] border border-[#FECACA] p-4 text-xs sm:text-sm text-[#991B1B]"
                  >
                    {submitMessage}
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="fullName" className="block text-xs font-semibold text-[#1A1816] mb-1.5">
                      {t.booking.form.fullName} *
                    </label>
                    <input
                      id="fullName"
                      name="fullName"
                      type="text"
                      required
                      minLength={2}
                      value={formValues.fullName}
                      onChange={(e) => setFormValues((s) => ({ ...s, fullName: e.target.value }))}
                      placeholder={t.booking.form.fullNamePlaceholder}
                      aria-invalid={Boolean(fieldErrors.fullName)}
                      aria-describedby={fieldErrors.fullName ? "fullName-error" : undefined}
                      className={`booking-field-control w-full rounded-xl border border-[#D8D0C4] bg-[#FBF9F5] px-4 py-2.5 text-sm text-[#1A1816] ${
                        fieldErrors.fullName ? "user-invalid-fallback" : ""
                      }`}
                    />
                    {fieldErrors.fullName && (
                      <p id="fullName-error" className="text-xs text-[#B91C1C] mt-1">
                        {fieldErrors.fullName[0]}
                      </p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-xs font-semibold text-[#1A1816] mb-1.5">
                      {t.booking.form.email} *
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      value={formValues.email}
                      onChange={(e) => setFormValues((s) => ({ ...s, email: e.target.value }))}
                      placeholder={t.booking.form.emailPlaceholder}
                      aria-invalid={Boolean(fieldErrors.email)}
                      aria-describedby={fieldErrors.email ? "email-error" : undefined}
                      className={`booking-field-control w-full rounded-xl border border-[#D8D0C4] bg-[#FBF9F5] px-4 py-2.5 text-sm text-[#1A1816] ${
                        fieldErrors.email ? "user-invalid-fallback" : ""
                      }`}
                    />
                    {fieldErrors.email && (
                      <p id="email-error" className="text-xs text-[#B91C1C] mt-1">
                        {fieldErrors.email[0]}
                      </p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="phone" className="block text-xs font-semibold text-[#1A1816] mb-1.5">
                      {t.booking.form.phone} *
                    </label>
                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      required
                      value={formValues.phone}
                      onChange={(e) => setFormValues((s) => ({ ...s, phone: e.target.value }))}
                      placeholder={t.booking.form.phonePlaceholder}
                      aria-invalid={Boolean(fieldErrors.phone)}
                      aria-describedby={fieldErrors.phone ? "phone-error" : undefined}
                      className={`booking-field-control w-full rounded-xl border border-[#D8D0C4] bg-[#FBF9F5] px-4 py-2.5 text-sm text-[#1A1816] ${
                        fieldErrors.phone ? "user-invalid-fallback" : ""
                      }`}
                    />
                    {fieldErrors.phone && (
                      <p id="phone-error" className="text-xs text-[#B91C1C] mt-1">
                        {fieldErrors.phone[0]}
                      </p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="preferredDate" className="block text-xs font-semibold text-[#1A1816] mb-1.5">
                      {t.booking.form.preferredDate} *
                    </label>
                    <input
                      id="preferredDate"
                      name="preferredDate"
                      type="date"
                      required
                      min={todayIso || undefined}
                      value={formValues.preferredDate}
                      onChange={(e) => setFormValues((s) => ({ ...s, preferredDate: e.target.value }))}
                      aria-invalid={Boolean(fieldErrors.preferredDate)}
                      aria-describedby={fieldErrors.preferredDate ? "preferredDate-error" : undefined}
                      className={`booking-field-control w-full rounded-xl border border-[#D8D0C4] bg-[#FBF9F5] px-4 py-2.5 text-sm text-[#1A1816] ${
                        fieldErrors.preferredDate ? "user-invalid-fallback" : ""
                      }`}
                    />
                    {fieldErrors.preferredDate && (
                      <p id="preferredDate-error" className="text-xs text-[#B91C1C] mt-1">
                        {fieldErrors.preferredDate[0]}
                      </p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="preferredTime" className="block text-xs font-semibold text-[#1A1816] mb-1.5">
                      {t.booking.form.preferredTime} *
                    </label>
                    <select
                      id="preferredTime"
                      name="preferredTime"
                      value={effectivePreferredTime}
                      onChange={(e) => setFormValues((s) => ({ ...s, preferredTime: e.target.value }))}
                      className="booking-field-control w-full rounded-xl border border-[#D8D0C4] bg-[#FBF9F5] px-4 py-2.5 text-sm text-[#1A1816]"
                    >
                      {t.booking.form.timeOptions.map((opt) => (
                        <option key={opt} value={opt}>
                          {opt}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label htmlFor="preferredLanguage" className="block text-xs font-semibold text-[#1A1816] mb-1.5">
                      {t.booking.form.preferredLanguage} *
                    </label>
                    <select
                      id="preferredLanguage"
                      name="preferredLanguage"
                      value={effectivePreferredLanguage}
                      onChange={(e) => {
                        setLanguageTouched(true);
                        setFormValues((s) => ({
                          ...s,
                          preferredLanguage: e.target.value as "English" | "Japanese" | "Chinese" | "Spanish",
                        }));
                      }}
                      className="booking-field-control w-full rounded-xl border border-[#D8D0C4] bg-[#FBF9F5] px-4 py-2.5 text-sm text-[#1A1816]"
                    >
                      {t.booking.form.languageOptions.map((opt) => (
                        <option key={opt.value} value={opt.value}>
                          {opt.label}
                        </option>
                      ))}
                    </select>
                    <p className="text-[11px] text-[#6C655E] mt-1">{t.booking.form.languageHint}</p>
                  </div>
                </div>

                {/* Practitioner Gender Preference — Visible Radio Buttons (Modern Web Guidance) */}
                <fieldset className="space-y-2">
                  <legend className="text-xs font-semibold text-[#1A1816]">
                    {t.booking.form.practitionerPreference}
                  </legend>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                    {t.booking.form.practitionerOptions.map((opt) => {
                      const checked = formValues.practitionerPreference === opt.value;
                      return (
                        <label
                          key={opt.value}
                          className={`flex items-center gap-2.5 rounded-xl border px-3.5 py-2.5 text-xs sm:text-sm cursor-pointer transition-colors ${
                            checked
                              ? "border-[#DE7356] bg-[#FDE8DF]/40 text-[#1A1816] font-semibold"
                              : "border-[#D8D0C4] bg-[#FBF9F5] text-[#5C554F] hover:bg-white"
                          }`}
                        >
                          <input
                            type="radio"
                            name="practitionerPreference"
                            value={opt.value}
                            checked={checked}
                            onChange={() =>
                              setFormValues((s) => ({
                                ...s,
                                practitionerPreference: opt.value,
                              }))
                            }
                            className="accent-[#DE7356]"
                          />
                          <span>{opt.label}</span>
                        </label>
                      );
                    })}
                  </div>
                </fieldset>

                <div>
                  <label htmlFor="notes" className="block text-xs font-semibold text-[#1A1816] mb-1.5">
                    {t.booking.form.notes}
                  </label>
                  <textarea
                    id="notes"
                    name="notes"
                    rows={3}
                    value={formValues.notes}
                    onChange={(e) => setFormValues((s) => ({ ...s, notes: e.target.value }))}
                    placeholder={t.booking.form.notesPlaceholder}
                    className="booking-field-control w-full rounded-xl border border-[#D8D0C4] bg-[#FBF9F5] px-4 py-2.5 text-sm text-[#1A1816]"
                  />
                </div>

                {/* Unchecked-by-default TCPA SMS & Weekly Schedule Consent */}
                <div>
                  <label className="flex items-start gap-3 text-xs text-[#5C554F] leading-relaxed cursor-pointer">
                    <input
                      type="checkbox"
                      name="smsConsent"
                      checked={formValues.smsConsent}
                      onChange={(e) => setFormValues((s) => ({ ...s, smsConsent: e.target.checked }))}
                      aria-invalid={Boolean(fieldErrors.smsConsent)}
                      className="mt-0.5 w-4 h-4 accent-[#DE7356] shrink-0"
                    />
                    <span>
                      {t.booking.form.smsConsentPrefix}
                      <Link href="/privacy" className="underline text-[#9A5B25] hover:text-[#1A1816]">
                        {t.booking.form.smsConsentPrivacyLink}
                      </Link>
                      {t.booking.form.smsConsentSuffix}
                    </span>
                  </label>
                  {fieldErrors.smsConsent && (
                    <p className="text-xs text-[#B91C1C] mt-1">{fieldErrors.smsConsent[0]}</p>
                  )}
                </div>

                <div className="pt-2 space-y-3">
                  <button
                    type="submit"
                    disabled={submitStatus === "submitting"}
                    className="w-full py-4 px-6 rounded-full bg-[#DE7356] hover:bg-[#C86348] text-white font-semibold text-sm sm:text-base shadow-retro-btn transition-colors cursor-pointer"
                  >
                    {submitStatus === "submitting" ? t.booking.form.submitting : t.booking.form.submit}
                  </button>
                  <p className="text-[11px] text-[#6C655E] leading-relaxed flex items-start gap-2">
                    <ShieldCheck className="w-4 h-4 shrink-0 text-[#5B8266] mt-0.5" aria-hidden="true" />
                    <span>{t.booking.form.medicalNotice}</span>
                  </p>
                </div>
              </form>
            )}
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

            <div className="space-y-3">
              {t.faq.items.map((item, idx) => (
                <details
                  key={idx}
                  className="faq-item group rounded-2xl bg-white border border-[#E5E0D8] px-5 sm:px-6 py-4 shadow-retro"
                >
                  {/* No heading element inside <summary> per ARIA/Modern Web Guidance */}
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
              ))}
            </div>
          </div>
        </section>

        {/* SECTION 11: CLOSING DARK OCEAN CTA (Preserving ocean_light.jpg) */}
        <section className="relative py-24 sm:py-32 bg-[#1A1816] text-[#FBF9F5] overflow-hidden">
          <img
            src="/assets/ocean_light.jpg"
            alt="Quiet Pacific ocean horizon at dusk"
            className="absolute inset-0 w-full h-full object-cover opacity-55"
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
              <button
                type="button"
                onClick={() => scrollToTarget("#booking")}
                className="inline-flex items-center justify-center rounded-full bg-[#DE7356] hover:bg-[#C86348] text-white font-semibold text-sm sm:text-base px-8 py-4 shadow-retro-btn transition-colors cursor-pointer"
              >
                {t.closing.cta}
              </button>
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
                <img
                  src="/assets/wdl_logo.png"
                  alt="World Divine Light"
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
              <p className="text-xs font-semibold tracking-[0.16em] uppercase text-[#E8C594] mb-4">
                {t.footer.navHeading}
              </p>
              <nav aria-label="Footer Navigation" className="space-y-2">
                {t.nav.items.map((item) => (
                  <a
                    key={item.num}
                    href={item.href}
                    onClick={(e) => {
                      e.preventDefault();
                      scrollToTarget(item.href);
                    }}
                    className="block text-xs text-[#C7BFB5] hover:text-[#FBF9F5] transition-colors"
                  >
                    {item.num} · {item.label}
                  </a>
                ))}
              </nav>
            </div>

            <div className="md:col-span-4 space-y-2.5 text-xs text-[#C7BFB5]">
              <p className="text-xs font-semibold tracking-[0.16em] uppercase text-[#E8C594] mb-3">
                {t.footer.accessHeading}
              </p>
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

          {/* Permanent Legal & Medical Notice (CA BPC § 2063 / SB 577) */}
          <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-5 text-[11px] text-[#A89F95] leading-relaxed space-y-1.5">
            <p className="font-semibold text-[#E6E0D6]">{t.footer.disclaimerTitle}</p>
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
