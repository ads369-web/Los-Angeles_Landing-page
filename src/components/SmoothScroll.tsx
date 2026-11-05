"use client";

import { useEffect } from "react";
import Lenis from "lenis";

interface SmoothScrollProps {
  children?: React.ReactNode;
}

export default function SmoothScroll({ children }: SmoothScrollProps) {
  useEffect(() => {
    // Respect user's motion preference
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let lenis: Lenis | null = null;

    if (!prefersReducedMotion) {
      lenis = new Lenis({
        duration: 1.2,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // BOTANIST-style deceleration curve
        orientation: "vertical",
        gestureOrientation: "vertical",
        smoothWheel: true,
        wheelMultiplier: 0.9,
        touchMultiplier: 1.2,
        infinite: false,
      });

      // Connect Lenis to requestAnimationFrame
      let rafId: number;
      function raf(time: number) {
        lenis?.raf(time);
        rafId = requestAnimationFrame(raf);
      }
      rafId = requestAnimationFrame(raf);

      // Parallax listener for background imagery
      lenis.on("scroll", ({ scroll }: { scroll: number }) => {
        const parallaxEls = document.querySelectorAll<HTMLElement>("[data-parallax-speed]");
        parallaxEls.forEach((el) => {
          const speed = parseFloat(el.getAttribute("data-parallax-speed") || "0.15");
          const rect = el.getBoundingClientRect();
          // Only transform if in or near viewport
          if (rect.top < window.innerHeight && rect.bottom > 0) {
            const offset = (window.innerHeight - rect.top) * speed * 0.4;
            el.style.transform = `translate3d(0, ${offset}px, 0)`;
          }
        });
      });

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
