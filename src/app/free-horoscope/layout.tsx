import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Daily Horoscope",
  description: "Free daily horoscope predictions for all 12 zodiac signs based on Vedic astrology.",
  alternates: { canonical: "/horoscope/" },
  openGraph: {
    title: "Daily Horoscope | AstroEshop",
    description: "Free daily horoscope predictions for all 12 zodiac signs based on Vedic astrology.",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
