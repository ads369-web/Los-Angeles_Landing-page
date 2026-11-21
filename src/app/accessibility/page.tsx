import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Accessibility Statement (WCAG 2.1 AA) | World Divine Light - Los Angeles Spiritual Center",
  description:
    "Digital and physical accessibility commitment for World Divine Light - Los Angeles Spiritual Center under WCAG 2.1 Level AA and California Unruh Civil Rights Act.",
};

export default function AccessibilityPage() {
  return (
    <div className="min-h-screen bg-brand-cream text-brand-dark">
      <header className="bg-brand-cream/95 border-b border-brand-border py-5 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto flex items-center justify-between gap-4">
          <Link href="/" className="flex items-center gap-3 group">
            <img
              src="/assets/wdl_logo.png"
              alt="World Divine Light"
              width={84}
              height={30}
              className="h-7 w-auto object-contain"
            />
            <span className="font-serif font-bold text-sm sm:text-base text-brand-dark group-hover:text-brand-terracotta transition-colors">
              Los Angeles Divine Light Center
            </span>
          </Link>
          <Link
            href="/"
            className="text-xs sm:text-sm font-semibold text-brand-terracotta underline hover:text-brand-terracottaHover"
          >
            ← Back to Home
          </Link>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 sm:px-6 py-12 sm:py-16 space-y-8">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-sage mb-2">
            WCAG 2.1 Level AA · California Unruh Act
          </p>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-brand-dark mb-3">
            Accessibility Statement
          </h1>
          <p className="text-xs sm:text-sm text-brand-muted">
            World Divine Light - Los Angeles Spiritual Center is committed to welcoming every visitor in both our digital and physical sanctuary.
          </p>
        </div>

        <section className="bg-white border border-brand-border rounded-3xl p-6 sm:p-8 shadow-retro space-y-6 text-sm text-brand-muted leading-relaxed">
          <div>
            <h2 className="font-serif text-lg font-bold text-brand-dark mb-2">
              1. Web Accessibility Measures (WCAG 2.1 Level AA)
            </h2>
            <ul className="list-disc pl-5 space-y-2">
              <li>Semantic HTML landmarks (header, navigation, main, footer) and skip-to-content keyboard navigation.</li>
              <li>Color palettes verified to meet or exceed WCAG 2.1 AA contrast ratios (minimum 4.5:1 for normal text).</li>
              <li>Keyboard-accessible controls, visible focus indicators, and screen-reader-friendly native FAQ disclosures.</li>
              <li>Post-interaction validation cues (<code className="font-mono text-xs bg-brand-cream px-1.5 py-0.5 rounded">aria-invalid</code> and live announcements) with clear, descriptive form labels.</li>
              <li>Reduced motion support honoring system <code className="font-mono text-xs bg-brand-cream px-1.5 py-0.5 rounded">prefers-reduced-motion</code> settings.</li>
            </ul>
          </div>

          <div>
            <h2 className="font-serif text-lg font-bold text-brand-dark mb-2">
              2. Physical Sanctuary Accessibility (Monterey Park)
            </h2>
            <ul className="list-disc pl-5 space-y-2">
              <li>
                <strong>Elevator & Step-Free Access:</strong> Suite #378 on the 3rd floor of{" "}
                <strong>809 S Atlantic Blvd</strong> is accessible via building elevator.
              </li>
              <li>
                <strong>Armchair Sessions:</strong> All Art of Divine Light sessions take place seated comfortably in supportive chairs—floor seating is never required.
              </li>
              <li>
                <strong>On-Site Free Parking:</strong> 43 free dedicated parking stalls are located directly at the building.
              </li>
            </ul>
          </div>

          <div>
            <h2 className="font-serif text-lg font-bold text-brand-dark mb-2">
              3. Need Assistance or Have Feedback?
            </h2>
            <p>
              If you encounter any digital accessibility barrier on this site or would like assistance arranging wheelchair access, same-gender
              support, or multilingual communication prior to your visit, please reach out to us directly:
            </p>
            <div className="mt-3 p-4 rounded-2xl bg-brand-cream border border-brand-border text-xs text-brand-dark space-y-1">
              <p>
                <strong>Phone / SMS:</strong>{" "}
                <a href="tel:+16268615069" className="underline text-brand-terracotta">
                  +1 (626) 861-5069
                </a>{" "}
                <span className="text-brand-muted">(English &amp; Japanese; advance request for Chinese or Spanish)</span>
              </p>
              <p>
                <strong>Email:</strong>{" "}
                <a href="mailto:losangeles@worlddivinelight.org" className="underline text-brand-terracotta">
                  losangeles@worlddivinelight.org
                </a>
              </p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
