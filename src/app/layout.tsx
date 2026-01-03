import type { Metadata } from "next";
import { Cormorant_Garamond, Nunito_Sans } from "next/font/google";
import { Toaster } from "@/components/ui/sonner";
import "./globals.css";

const cormorantGaramond = Cormorant_Garamond({
  variable: "--font-heading",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const nunitoSans = Nunito_Sans({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "AstroEshop - Your Cosmic Journey Starts Here",
    template: "%s | AstroEshop",
  },
  description:
    "Discover authentic astrology products and services. Birth charts, gemstones, puja services, and expert consultations.",
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
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://astroeshop.com",
    siteName: "AstroEshop",
    title: "AstroEshop - Your Cosmic Journey Starts Here",
    description:
      "Discover authentic astrology products and services. Birth charts, gemstones, puja services, and expert consultations.",
  },
  twitter: {
    card: "summary_large_image",
    title: "AstroEshop - Your Cosmic Journey Starts Here",
    description:
      "Discover authentic astrology products and services. Birth charts, gemstones, puja services, and expert consultations.",
  },
  robots: {
    index: true,
    follow: true,
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
        className={`${cormorantGaramond.variable} ${nunitoSans.variable} antialiased`}
      >
        {children}
        <Toaster position="top-right" />
      </body>
    </html>
  );
}
