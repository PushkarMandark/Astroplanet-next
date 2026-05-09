import type { Metadata } from "next";
import Script from "next/script";
import { Playfair_Display, Inter } from "next/font/google";
import { Toaster } from "@/components/ui/sonner";
import { LeadPopupProvider } from "@/components/molecules/lead-popup/LeadPopupProvider";
import { CookieConsent } from "@/components/molecules/cookie-consent";
import "./globals.css";

const GA_MEASUREMENT_ID = "G-7LXHM29F4R";

const playfairDisplay = Playfair_Display({
  variable: "--font-heading",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const siteUrl = "https://www.astroeshop.com";
const siteDescription =
  "Discover authentic astrology products and services. Birth charts, gemstones, puja services, and expert consultations.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "AstroEshop - Your Cosmic Journey Starts Here",
    template: "%s | AstroEshop",
  },
  description: siteDescription,
  keywords: [
    "astrology",
    "horoscope",
    "kundli",
    "gemstones",
    "puja",
    "vedic astrology",
    "numerology",
    "panchang",
  ],
  authors: [{ name: "AstroEshop" }],
  creator: "AstroEshop",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: siteUrl,
    siteName: "AstroEshop",
    title: "AstroEshop - Your Cosmic Journey Starts Here",
    description: siteDescription,
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "AstroEshop — Vedic astrology products, gemstones, and consultations",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "AstroEshop - Your Cosmic Journey Starts Here",
    description: siteDescription,
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "1iJsbhqu27v2ZsvHeXhdFd6Q99Z_9ZR-tLr9llGo3N8",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${playfairDisplay.variable} ${inter.variable} antialiased`}
      >
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
          strategy="afterInteractive"
        />
        <Script id="gtag-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_MEASUREMENT_ID}');
          `}
        </Script>
        {children}
        <CookieConsent />
        <Toaster position="top-right" />
        <LeadPopupProvider />
        <a
          href="https://wa.me/919599686887?text=Hi%2C%20I%20need%20help%20with%20astrology%20products"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Chat on WhatsApp"
          className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg shadow-[#25D366]/30 transition-transform hover:scale-110 active:scale-95"
        >
          <svg viewBox="0 0 32 32" className="h-7 w-7 fill-current">
            <path d="M16.004 0h-.008C7.174 0 0 7.176 0 16.004c0 3.5 1.132 6.744 3.054 9.378L1.056 31.2l6.04-1.94a15.9 15.9 0 008.908 2.744C24.826 32 32 24.826 32 16.004 32 7.176 24.826 0 16.004 0zm9.302 22.602c-.39 1.098-1.936 2.01-3.162 2.276-.84.178-1.94.32-5.636-1.212-4.73-1.96-7.77-6.756-8.006-7.07-.228-.314-1.87-2.494-1.87-4.758 0-2.264 1.184-3.376 1.604-3.838.39-.428 1.024-.614 1.63-.614.196 0 .372.01.53.018.468.02.702.048 1.01.782.39.918 1.338 3.264 1.456 3.502.118.238.236.554.078.868-.148.322-.278.462-.516.738-.238.276-.462.488-.7.786-.216.258-.46.536-.196 1.024.264.488 1.178 1.944 2.53 3.15 1.734 1.548 3.2 2.038 3.646 2.256.448.218.71.188.97-.098.27-.296 1.148-1.326 1.454-1.784.298-.458.606-.378 1.014-.218.41.158 2.604 1.228 3.05 1.452.448.224.746.336.856.518.108.182.108 1.066-.282 2.164z" />
          </svg>
        </a>
      </body>
    </html>
  );
}
