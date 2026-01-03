import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import { Toaster } from "@/components/ui/sonner";
import "./globals.css";

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
        className={`${playfairDisplay.variable} ${inter.variable} antialiased`}
      >
        {children}
        <Toaster position="top-right" />
      </body>
    </html>
  );
}
