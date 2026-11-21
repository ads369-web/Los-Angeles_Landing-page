import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { TrackedPhoneLink, TrackedEmailLink } from "@/components/TrackingLink";

export const metadata: Metadata = {
  title: "Privacy Policy (CalOPPA) | World Divine Light - Los Angeles Spiritual Center",
  description:
    "California Online Privacy Protection Act (CalOPPA) compliant Privacy Policy for World Divine Light - Los Angeles Spiritual Center in Monterey Park, CA.",
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-brand-cream text-brand-dark">
      <header className="bg-brand-cream/95 border-b border-brand-border py-5 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto flex items-center justify-between gap-4">
          <Link href="/" className="flex items-center gap-3 group">
            <Image
              src="/assets/wdl_logo.png"
              alt="World Divine Light"
              width={1024}
              height={372}
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
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-terracotta mb-2">
            CalOPPA & TCPA Compliance
          </p>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-brand-dark mb-3">
            Privacy Policy
          </h1>
          <p className="text-xs sm:text-sm text-brand-muted">
            Effective Date: November 19, 2026 · World Divine Light - Los Angeles Spiritual Center (US 501(c)(3) Nonprofit)
          </p>
        </div>

        <section className="bg-white border border-brand-border rounded-3xl p-6 sm:p-8 shadow-retro space-y-6 text-sm text-brand-muted leading-relaxed">
          <div>
            <h2 className="font-serif text-lg font-bold text-brand-dark mb-2">
              1. Information We Collect
            </h2>
            <p>
              When you submit a session request on <strong>la.worlddivinelight.org</strong>, we collect only the details you voluntarily provide:
              Full Name, Email Address, Telephone Number (for call or SMS confirmation), Preferred Date & Time Window, Preferred Language,
              Optional Practitioner Gender Preference (female, male, or no preference), and any optional notes you choose to share.
            </p>
          </div>

          <div>
            <h2 className="font-serif text-lg font-bold text-brand-dark mb-2">
              2. Strict Purpose Limitation (Appointment Coordination Only)
            </h2>
            <p>
              Your contact information is used solely for scheduling your requested Art of Divine Light session, accommodating your language or
              practitioner preference, and sending requested appointment confirmations or pre-visit directions to{" "}
              <strong>809 S Atlantic Blvd, Suite #378, Monterey Park, CA 91754</strong>. We never use booking details for unsolicited commercial marketing.
            </p>
          </div>

          <div>
            <h2 className="font-serif text-lg font-bold text-brand-dark mb-2">
              3. Zero Sale, Rental, or Third-Party Sharing
            </h2>
            <p>
              World Divine Light - Los Angeles Spiritual Center does not sell, rent, trade, or transfer your personal information or SMS opt-in
              consent to any third parties, data brokers, or advertisers. Access is restricted solely to authorized center coordinators managing your visit.
            </p>
          </div>

          <div>
            <h2 className="font-serif text-lg font-bold text-brand-dark mb-2">
              4. SMS / Text Messaging Consent & Opt-Out (TCPA / A2P 10DLC)
            </h2>
            <p>
              Automated SMS confirmations, scheduling reminders, and weekly dojo schedule updates are sent strictly upon your explicit opt-in consent
              checkbox. You may opt out at any moment by replying <strong>STOP</strong>, or request assistance by replying <strong>HELP</strong> or
              calling <strong>+1 (626) 861-5069</strong> (answered in English &amp; Japanese by volunteer coordinator Kevin; Chinese or Spanish assistance is arranged upon advance request via form). Message and data rates may apply.
            </p>
          </div>

          <div>
            <h2 className="font-serif text-lg font-bold text-brand-dark mb-2">
              5. Your Privacy Rights & Data Deletion Requests (CalOPPA)
            </h2>
            <p>
              Under the California Online Privacy Protection Act (CalOPPA), you may inspect, update, or request permanent deletion of any
              personal information previously shared with us at any time—without charge or explanation.
            </p>
            <div className="mt-3 p-4 rounded-2xl bg-brand-cream border border-brand-border text-xs text-brand-dark space-y-1">
              <p>
                <strong>Privacy & Deletion Contact:</strong>{" "}
                <TrackedEmailLink
                  href="mailto:losangeles@worlddivinelight.org"
                  location="privacy_page"
                  className="underline text-brand-terracotta"
                >
                  losangeles@worlddivinelight.org
                </TrackedEmailLink>
              </p>
              <p>
                <strong>Phone / SMS:</strong>{" "}
                <TrackedPhoneLink
                  href="tel:+16268615069"
                  location="privacy_page"
                  className="underline text-brand-terracotta"
                >
                  +1 (626) 861-5069
                </TrackedPhoneLink>
              </p>
              <p>
                <strong>Address:</strong> 809 S Atlantic Blvd, Suite #378, Monterey Park, CA 91754
              </p>
            </div>
          </div>

          <div>
            <h2 className="font-serif text-lg font-bold text-brand-dark mb-2">
              6. Do Not Track (DNT) & Analytics Disclosure
            </h2>
            <p>
              Our site does not track users across external third-party websites or sell behavioral profiles. Basic aggregate site analytics are
              used only to understand general visitor interest and improve page clarity.
            </p>
          </div>
        </section>
      </main>
    </div>
  );
}
