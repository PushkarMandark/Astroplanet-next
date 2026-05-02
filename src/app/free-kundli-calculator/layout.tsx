import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Free Kundli Calculator",
  description: "Calculate your Vedic birth chart (Janam Kundli) instantly with planetary positions, houses, and Vimshottari Dasha.",
  alternates: { canonical: "/free-kundli-calculator/" },
  openGraph: {
    title: "Free Kundli Calculator | AstroEshop",
    description: "Calculate your Vedic birth chart (Janam Kundli) instantly with planetary positions, houses, and Vimshottari Dasha.",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
