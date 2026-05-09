import { Metadata } from "next";

const title =
  "Free Kundli Online - Create Your Janam Kundli Using Vedic Astrology | Calculator";
const description =
  "Create your Free Kundli instantly by entering your date, time, and place of birth with our easy-to-use free Kundli Calculator. Get the most detailed kundli (Horoscope) analysis report using accurate principles of Vedic Astrology.";

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  alternates: { canonical: "/free-kundli-calculator/" },
  openGraph: {
    title,
    description,
  },
  twitter: {
    title,
    description,
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
