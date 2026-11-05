"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";

interface OpeningSplashProps {
  onComplete?: () => void;
}

export default function OpeningSplash({ onComplete }: OpeningSplashProps) {
  // Splash visibility lifecycle: 'hidden' | 'entering' | 'holding' | 'exiting' | 'removed'
  const [phase, setPhase] = useState<"hidden" | "entering" | "holding" | "exiting" | "removed">("hidden");

  useEffect(() => {
    // Check if visitor has already experienced the splash in this session
    try {
      const hasVisited = sessionStorage.getItem("has_visited");
      if (hasVisited === "true") {
        setPhase("removed");
        onComplete?.();
        return;
      }
      // Record visit for this session
      sessionStorage.setItem("has_visited", "true");
    } catch {
      // Fallback for environments where sessionStorage might be blocked
    }

    // Lock page scrolling while opening splash plays
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    // Begin entrance animation on next animation frame
    setPhase("entering");

    // Hold for 1.5 seconds after entrance, then begin dramatic exit
    const holdTimer = setTimeout(() => {
      setPhase("exiting");
    }, 1500);

    // Complete exit and unmount from DOM
    const removeTimer = setTimeout(() => {
      setPhase("removed");
      document.body.style.overflow = originalOverflow;
      onComplete?.();
    }, 2500);

    return () => {
      clearTimeout(holdTimer);
      clearTimeout(removeTimer);
      document.body.style.overflow = originalOverflow;
    };
  }, [onComplete]);

  // Fast skip if visitor clicks or presses any key
  const handleSkip = () => {
    if (phase === "entering" || phase === "holding") {
      setPhase("exiting");
      setTimeout(() => {
        setPhase("removed");
        document.body.style.overflow = "";
        onComplete?.();
      }, 500);
    }
  };

  if (phase === "hidden" || phase === "removed") {
    return null;
  }

  const isExiting = phase === "exiting";
  const isContentVisible = phase === "entering" || phase === "holding";

  return (
    <aside
      aria-label="Welcome to Los Angeles Divine Light Center"
      onClick={handleSkip}
      className={`fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#14110C] text-[#FAF8F2] select-none cursor-pointer transition-all duration-[900ms] ${
        isExiting
          ? "-translate-y-full opacity-0 pointer-events-none ease-[cubic-bezier(0.77,0,0.175,1)]"
          : "translate-y-0 opacity-100 ease-[cubic-bezier(0.16,1,0.3,1)]"
      }`}
    >
      {/* Sacred Ambient Halo Glow */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_center,_rgba(222,115,86,0.12)_0%,_transparent_65%)] animate-splash-glow"></div>

      {/* Center Branding Showcase */}
      <div
        className={`relative z-10 flex flex-col items-center text-center px-6 transition-all duration-[1000ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${
          isContentVisible ? "opacity-100 scale-100 translate-y-0" : "opacity-0 scale-[0.96] translate-y-2"
        }`}
      >
        {/* Church / Organization Logo */}
        <div className="relative w-40 sm:w-48 h-12 sm:h-14 mb-4 filter drop-shadow-[0_4px_20px_rgba(222,115,86,0.25)]">
          <Image
            src="/assets/wdl_logo.png"
            alt="World Divine Light"
            fill
            priority
            className="object-contain brightness-0 invert"
          />
        </div>

        {/* Center Main Name */}
        <h1 className="font-serif text-2xl sm:text-3xl md:text-4xl font-light text-[#FAF8F2] tracking-wide mt-2">
          Los Angeles Divine Light Center
        </h1>

        {/* Japanese Sacred Subtitle */}
        <p className="text-xs sm:text-sm text-[#D6CFBE]/80 tracking-[0.25em] font-light mt-3">
          神の大愛のみ光 ｜ カリフォルニア州モントレーパーク
        </p>

        {/* Hairline Golden Divider */}
        <div className="w-16 h-px bg-gradient-to-r from-transparent via-[#DE7356] to-transparent my-4"></div>

        {/* Non-Profit Badge */}
        <p className="font-mono text-[10px] text-[#E3A387] tracking-[0.28em] uppercase">
          US 501(c)(3) Nonprofit Spiritual Sanctuary
        </p>
      </div>

      {/* Discrete Skip Hint at Bottom */}
      <div className="absolute bottom-8 text-[11px] font-mono tracking-widest text-[#8C8276] hover:text-[#FAF8F2] transition-colors uppercase">
        Click anywhere to enter →
      </div>
    </aside>
  );
}
