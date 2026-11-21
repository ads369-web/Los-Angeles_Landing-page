import type { Metadata } from "next";
import { headers } from "next/headers";
import { Fraunces, Plus_Jakarta_Sans, Noto_Serif_JP, Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import Script from "next/script";
import { GA_MEASUREMENT_ID, GOOGLE_ADS_ID } from "@/lib/gtag";

const VALID_HTML_LANGS = new Set(["en", "ja", "zh", "es"]);

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
  metadataBase: new URL("https://la.worlddivinelight.org"),
  title: "Los Angeles Divine Light Center | Monterey Park Spiritual Sanctuary",
  description:
    "World Divine Light — Los Angeles Spiritual Center in Monterey Park, CA. Experience seated Art of Divine Light (Okiyome) sessions in English, Japanese, or by advance request in Standard Chinese and Spanish. US 501(c)(3) nonprofit operating on voluntary donations.",
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

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const headerList = await headers();
  const rawLang = headerList.get("x-wdl-lang");
  const htmlLang = rawLang && VALID_HTML_LANGS.has(rawLang) ? rawLang : "en";

  return (
    <html
      lang={htmlLang}
      className={`${fraunces.variable} ${plusJakartaSans.variable} ${notoSerifJP.variable} ${playfair.variable} ${inter.variable}`}
    >
      <body>
        {children}
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">{`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GA_MEASUREMENT_ID}');
          gtag('config', '${GOOGLE_ADS_ID}');
        `}</Script>
      </body>
    </html>
  );
}
