import type { Metadata } from "next";
import { Fraunces, Plus_Jakarta_Sans, Noto_Serif_JP, Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import Script from "next/script";
import { LP_COPY } from "@/data/lpCopy";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  display: "swap",
});

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-plus-jakarta",
  display: "swap",
});

const notoSerifJP = Noto_Serif_JP({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-noto-serif-jp",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Los Angeles Divine Light Center | Monterey Park Spiritual Sanctuary",
  description:
    "World Divine Light — Los Angeles Spiritual Center in Monterey Park, CA. Experience seated Art of Divine Light (Okiyome) sessions in English, Japanese, or by advance request in Chinese and Spanish. US 501(c)(3) nonprofit operating on voluntary donations.",
  keywords: [
    "World Divine Light Organization",
    "Los Angeles Divine Light Center",
    "Monterey Park spiritual sanctuary",
    "Art of Divine Light",
    "Okiyome",
    "お浄め",
    "手かざし",
    "ロサンゼルス道場",
    "501(c)(3) nonprofit spiritual center",
  ],
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon.png", type: "image/png" },
    ],
    apple: "/apple-icon.png",
  },
  openGraph: {
    title: "Los Angeles Divine Light Center | Monterey Park Spiritual Sanctuary",
    description:
      "Serene seated Art of Divine Light (Okiyome) sanctuary in Monterey Park, CA. US 501(c)(3) nonprofit operating on voluntary gratitude offerings.",
    type: "website",
    locale: "en_US",
    alternateLocale: ["ja_JP", "zh_CN", "es_US"],
  },
};

const STRUCTURED_DATA = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": ["PlaceOfWorship", "CommunityCenter"],
      "@id": "https://la.worlddivinelight.org/#organization",
      name: "World Divine Light — Los Angeles Spiritual Center",
      alternateName: "世界真光文明教団 ロサンゼルス道場",
      url: "https://la.worlddivinelight.org",
      email: "losangeles@worlddivinelight.org",
      telephone: "+1-626-861-5069",
      priceRange: "Donation-Based",
      nonprofitStatus: "Nonprofit501c3",
      description:
        "A US 501(c)(3) nonprofit spiritual center in Monterey Park offering seated Art of Divine Light (Okiyome) sessions on a voluntary donation basis. Elevator access, seated armchair format, and 43 free plaza parking spaces on-site.",
      address: {
        "@type": "PostalAddress",
        streetAddress: "809 S Atlantic Blvd, Suite #378",
        addressLocality: "Monterey Park",
        addressRegion: "CA",
        postalCode: "91754",
        addressCountry: "US",
      },
      geo: {
        "@type": "GeoCoordinates",
        latitude: 34.0378,
        longitude: -118.1332,
      },
      openingHoursSpecification: [
        {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: ["Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
          opens: "10:00",
          closes: "18:00",
        },
        {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: ["Sunday"],
          opens: "09:00",
          closes: "16:00",
        },
      ],
      amenityFeature: [
        { "@type": "LocationFeatureSpecification", name: "43 Free Plaza Parking Stalls", value: true },
        { "@type": "LocationFeatureSpecification", name: "3rd Floor Elevator Access", value: true },
        { "@type": "LocationFeatureSpecification", name: "Seated Armchair Format", value: true },
      ],
      availableLanguage: ["English", "Japanese", "Chinese", "Spanish"],
    },
    {
      "@type": "FAQPage",
      "@id": "https://la.worlddivinelight.org/#faqpage",
      mainEntity: LP_COPY.en.faq.items.map((item) => ({
        "@type": "Question",
        name: item.q,
        acceptedAnswer: {
          "@type": "Answer",
          text: item.a,
        },
      })),
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${fraunces.variable} ${plusJakartaSans.variable} ${notoSerifJP.variable} ${playfair.variable} ${inter.variable}`}
    >
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(STRUCTURED_DATA) }}
        />
        {children}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-1695WNK4CX"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">{`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-1695WNK4CX');
          gtag('config', 'AW-853490942');
        `}</Script>
      </body>
    </html>
  );
}
