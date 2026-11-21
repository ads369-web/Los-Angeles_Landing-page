import Image from "next/image";
import { SmsLink } from "@/components/TrackingLink";

export default function Hero() {
  return (
    <section
      style={{
        minHeight: "100vh",
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        position: "relative",
        overflow: "hidden",
      }}
      className="hero-grid"
    >
      {/* ── LEFT: Text / Dark panel ── */}
      <div
        style={{
          background:
            "radial-gradient(ellipse 120% 100% at 0% 50%, #261F10 0%, #14110C 55%, #0A0806 100%)",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "center",
          padding: "80px 56px 80px 64px",
          position: "relative",
          overflow: "hidden",
        }}
        className="hero-left"
      >
        {/* Glow */}
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "30%",
            transform: "translate(-50%, -50%)",
            width: "600px",
            height: "600px",
            background:
              "radial-gradient(circle, rgba(192,144,64,0.10) 0%, transparent 65%)",
            borderRadius: "50%",
            pointerEvents: "none",
          }}
          className="anim-pulse-glow"
        />

        <div style={{ position: "relative", maxWidth: "480px", width: "100%" }}>
          {/* Logo */}
          <div style={{ marginBottom: "44px" }} className="anim-fade-up">
            <Image
              src="/logo_w.png"
              alt="World Divine Light Organization Logo"
              width={180}
              height={90}
              style={{
                objectFit: "contain",
                filter:
                  "brightness(0) invert(1) sepia(1) saturate(2) hue-rotate(5deg) brightness(0.85)",
                opacity: 0.92,
                marginBottom: "16px",
              }}
              priority
            />
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "12px",
                fontSize: "0.65rem",
                letterSpacing: "0.26em",
                textTransform: "uppercase",
                color: "#C09040",
                fontFamily: "var(--font-inter)",
              }}
            >
              <span
                style={{
                  display: "block",
                  width: "24px",
                  height: "1px",
                  background: "#C09040",
                }}
              />
              Los Angeles Spiritual Center
            </div>
          </div>

          {/* Headline */}
          <h1
            style={{
              fontFamily: "var(--font-playfair)",
              fontSize: "clamp(2.4rem, 4vw, 4rem)",
              fontWeight: 400,
              lineHeight: 1.15,
              color: "#F5EDD5",
              marginBottom: "24px",
              letterSpacing: "-0.01em",
            }}
            className="anim-fade-up anim-delay-1"
          >
            A{" "}
            <em
              className="gold-shimmer"
              style={{ fontStyle: "italic", paddingRight: "0.08em" }}
            >
              Light from God
            </em>
            <br />
            for All of Humanity
          </h1>

          {/* Tagline */}
          <p
            style={{
              fontSize: "clamp(0.95rem, 1.5vw, 1.1rem)",
              color: "#B8A070",
              lineHeight: 1.85,
              marginBottom: "48px",
              fontFamily: "var(--font-inter)",
              fontWeight: 300,
            }}
            className="anim-fade-up anim-delay-2"
          >
            Discover the Art of Divine Light — a sacred practice that purifies
            the soul, elevates the spirit, and opens the path toward a world of
            true harmony.
          </p>

          {/* CTAs */}
          <div
            style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}
            className="anim-fade-up anim-delay-3"
          >
            <SmsLink
              href="sms:+16268615069&body=Hello%2C%20I%27d%20like%20to%20book%20a%20Divine%20Light%20session."
              className="btn-gold-solid"
            >
              Book a Free Visit
            </SmsLink>
            <a href="#contact" className="btn-gold">
              Send a Message
            </a>
          </div>

          {/* Social proof */}
          <p
            style={{
              marginTop: "32px",
              fontSize: "0.75rem",
              color: "#7A6840",
              fontFamily: "var(--font-inter)",
              fontWeight: 300,
              letterSpacing: "0.04em",
            }}
            className="anim-fade-up anim-delay-4"
          >
            First visits are free &amp; open to everyone — no background required.
          </p>
        </div>
      </div>

      {/* ── RIGHT: Community Photo ── */}
      <div
        style={{
          position: "relative",
          overflow: "hidden",
          minHeight: "500px",
        }}
        className="hero-photo"
      >
        <Image
          src="/photo-community.jpg"
          alt="World Divine Light Organization community gathering"
          fill
          style={{ objectFit: "cover", objectPosition: "center 30%" }}
          priority
        />
        {/* Warm amber overlay for cohesion */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(135deg, rgba(20,17,12,0.35) 0%, rgba(192,144,64,0.08) 60%, transparent 100%)",
          }}
        />
        {/* Bottom quote */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            padding: "40px 36px",
            background:
              "linear-gradient(to top, rgba(14,11,7,0.82) 0%, transparent 100%)",
          }}
        >
          <p
            style={{
              fontFamily: "var(--font-playfair)",
              fontSize: "1.05rem",
              color: "#F5EDD5",
              fontStyle: "italic",
              lineHeight: 1.6,
            }}
          >
            &ldquo;A warm community united by the same light.&rdquo;
          </p>
          <p
            style={{
              fontSize: "0.7rem",
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: "#C09040",
              fontFamily: "var(--font-inter)",
              marginTop: "8px",
            }}
          >
            Los Angeles Members
          </p>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .hero-grid {
            grid-template-columns: 1fr !important;
            min-height: unset !important;
          }
          .hero-photo {
            order: -1;
            min-height: 280px !important;
            max-height: 340px;
          }
          .hero-left {
            padding: 60px 24px 80px !important;
            align-items: center !important;
            text-align: center;
          }
          .hero-left h1 { font-size: 2.2rem !important; }
          .hero-left > div > div:first-child { justify-content: center; }
          .hero-left > div { max-width: 100% !important; }
        }
      `}</style>
    </section>
  );
}
