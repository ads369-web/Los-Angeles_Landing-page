import type { Metadata } from "next";
import { Fraunces, Plus_Jakarta_Sans, Noto_Serif_JP, Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import Script from "next/script";

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
  title: "Los Angeles Divine Light Center | Back to the Origin",
  description:
    "神の大愛の光に包まれ、本来の澄んだ自分へ。カリフォルニア州モントレーパークの静寂な空間で、天から降り注ぐ神の大愛のみ光を取り次ぐ手かざし（Art of Divine Light）をご体験いただけます。米国政府公認 501(c)(3) 非営利法人。",
  keywords: [
    "World Divine Light Organization",
    "Los Angeles Divine Light Center",
    "Monterey Park spiritual sanctuary",
    "Tekazashi",
    "Art of Divine Light",
    "お浄め",
    "手かざし",
    "ロサンゼルス道場",
    "501(c)(3) nonprofit spiritual",
  ],
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon.png", type: "image/png" },
    ],
    apple: "/apple-icon.png",
  },
  openGraph: {
    title: "Los Angeles Divine Light Center | Back to the Origin",
    description:
      "神の大愛の光に包まれ、本来の澄んだ自分へ。ロサンゼルス・モントレーパークの静寂な空間で、天から降り注ぐ神の大愛のみ光を取り次ぐ手かざし（Art of Divine Light）をご体験いただけます。",
    type: "website",
    locale: "ja_JP",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${fraunces.variable} ${plusJakartaSans.variable} ${notoSerifJP.variable} ${playfair.variable} ${inter.variable}`}
    >
      <body>{children}</body>
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
    </html>
  );
}
