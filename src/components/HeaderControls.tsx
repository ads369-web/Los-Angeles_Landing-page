"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import type { Language, LocalizedContent } from "@/data/lpCopy";

interface HeaderControlsProps {
  lang: Language;
  t: LocalizedContent;
}

export default function HeaderControls({ lang, t }: HeaderControlsProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const drawerCloseBtnRef = useRef<HTMLButtonElement>(null);

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

  const scrollToTarget = (e: React.MouseEvent<HTMLAnchorElement>, selector: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const el = document.querySelector(selector);
    if (!el) return;
    const lenis = (window as unknown as { __lenis?: { scrollTo: (t: Element, o: { offset: number; duration: number }) => void } }).__lenis;
    if (lenis) {
      lenis.scrollTo(el, { offset: -88, duration: 1.1 });
      return;
    }
    const top = el.getBoundingClientRect().top + window.scrollY - 96;
    window.scrollTo({ top: Math.max(0, top), behavior: "smooth" });
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
        const href = code === "en" ? "/" : `/?lang=${code}`;
        return (
          <Link
            key={code}
            href={href}
            scroll={false}
            onClick={() => setMobileMenuOpen(false)}
            aria-current={active ? "page" : undefined}
            className={`px-2.5 py-1 text-center text-[11px] font-semibold rounded-full transition-colors ${
              active
                ? "bg-[#1A1816] text-[#FBF9F5] shadow-xs"
                : "text-[#5C554F] hover:text-[#1A1816]"
            }`}
          >
            {shortLabel}
          </Link>
        );
      })}
    </div>
  );

  return (
    <>
      <header
        className={`sticky top-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-[#FBF9F5]/95 backdrop-blur-md shadow-sm border-b border-[#E5E0D8]"
            : "bg-[#FBF9F5]/92 backdrop-blur-sm border-b border-[#E5E0D8]/70"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="h-16 sm:h-[72px] flex items-center justify-between gap-4">
            <a
              href="#hero"
              onClick={(e) => scrollToTarget(e, "#hero")}
              className="flex items-center gap-3 min-w-0 group"
            >
              <Image
                src="/assets/wdl_logo.png"
                alt="World Divine Light"
                width={1024}
                height={372}
                priority
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
              <a
                href="#booking"
                onClick={(e) => scrollToTarget(e, "#booking")}
                className="hidden sm:inline-flex items-center justify-center rounded-full bg-[#DE7356] hover:bg-[#C86348] text-white text-xs sm:text-sm font-semibold px-4 sm:px-5 py-2.5 shadow-retro-btn transition-colors"
              >
                {t.nav.cta}
              </a>
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

          <nav aria-label="Primary Navigation" className="hidden lg:block border-t border-[#E5E0D8]/70 py-2.5">
            <ul className="flex items-center justify-between list-none m-0 p-0">
              {t.nav.items.map((item) => (
                <li key={item.num}>
                  <a
                    href={item.href}
                    onClick={(e) => scrollToTarget(e, item.href)}
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
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </header>

      {mobileMenuOpen && (
        <div
          className="fixed inset-0 z-[100] lg:hidden flex justify-end bg-[#1A1816]/50 backdrop-blur-xs"
          role="dialog"
          aria-modal="true"
          aria-label={t.nav.menuNavLabel}
        >
          <div className="w-full max-w-sm h-full bg-[#FBF9F5] flex flex-col shadow-2xl border-l border-[#E5E0D8]">
            <div className="shrink-0 flex items-center justify-between px-5 py-4 border-b border-[#E5E0D8]">
              <div className="flex items-center gap-2.5">
                <Image
                  src="/assets/wdl_logo.png"
                  alt="World Divine Light"
                  width={1024}
                  height={372}
                  className="h-6 w-auto"
                />
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

            <nav aria-label={t.nav.menuNavLabel} className="flex-1 min-h-0 overflow-y-auto px-5 py-4">
              <ul className="space-y-1.5 list-none m-0 p-0">
                {t.nav.items.map((item) => (
                  <li key={item.num}>
                    <a
                      href={item.href}
                      onClick={(e) => scrollToTarget(e, item.href)}
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
                  </li>
                ))}
              </ul>
            </nav>

            <div className="shrink-0 p-5 border-t border-[#E5E0D8] bg-[#FAF6F0] space-y-3">
              <div>
                <p className="text-[10px] uppercase tracking-[0.16em] text-[#6C655E] mb-2">
                  {t.nav.languageLabel}
                </p>
                {renderLangSwitch(true)}
              </div>
              <a
                href="#booking"
                onClick={(e) => scrollToTarget(e, "#booking")}
                className="block w-full text-center py-3.5 px-5 rounded-full bg-[#DE7356] hover:bg-[#C86348] text-white font-semibold text-sm shadow-retro-btn transition-colors"
              >
                {t.nav.cta}
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
