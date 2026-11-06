"use client";

import { useEffect } from "react";
import Lenis from "lenis";

interface SmoothScrollProps {
  children?: React.ReactNode;
}

export default function SmoothScroll({ children }: SmoothScrollProps) {
  useEffect(() => {
    // Respect user motion preference and never intercept touch on mobile devices
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isTouchDevice = typeof window !== "undefined" && ("ontouchstart" in window || navigator.maxTouchPoints > 0);

    let lenis: Lenis | null = null;

    if (!prefersReducedMotion && !isTouchDevice) {
      lenis = new Lenis({
        duration: 1.2,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // BOTANIST-style deceleration curve
        orientation: "vertical",
        gestureOrientation: "vertical",
        smoothWheel: true,
        wheelMultiplier: 0.9,
        infinite: false,
      });

      // Connect Lenis to requestAnimationFrame
      let rafId: number;
      function raf(time: number) {
        lenis?.raf(time);
        rafId = requestAnimationFrame(raf);
      }
      rafId = requestAnimationFrame(raf);

      // Smooth scroll on internal anchor clicks
      const handleAnchorClick = (e: MouseEvent) => {
        const target = e.target as HTMLElement | null;
        const anchor = target?.closest("a");
        if (!anchor) return;

        const href = anchor.getAttribute("href");
        if (href && href.startsWith("#") && href.length > 1) {
          const targetEl = document.querySelector(href);
          if (targetEl) {
            e.preventDefault();
            lenis?.scrollTo(targetEl as HTMLElement, {
              offset: -80,
              duration: 1.2,
            });
          }
        }
      };

      document.addEventListener("click", handleAnchorClick);

      // Expose lenis instance globally for modal pause/resume if needed
      (window as unknown as { __lenis?: Lenis }).__lenis = lenis;

      // Clean up RAF on unmount
      return () => {
        cancelAnimationFrame(rafId);
        document.removeEventListener("click", handleAnchorClick);
        lenis?.destroy();
        delete (window as unknown as { __lenis?: Lenis }).__lenis;
      };
    }
  }, []);

  // IntersectionObserver for BOTANIST-style scroll-triggered reveals
  useEffect(() => {
    const observerCallback: IntersectionObserverCallback = (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-revealed");
          // Optionally stop observing once revealed for pure performance
          observer.unobserve(entry.target);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, {
      rootMargin: "0px 0px -6% 0px", // Trigger slightly before full view for anticipation
      threshold: 0.12,
    });

    const revealElements = document.querySelectorAll(".reveal-up, .img-zoom-reveal");
    revealElements.forEach((el) => observer.observe(el));

    return () => {
      observer.disconnect();
    };
  }, []);

  return <>{children}</>;
}
