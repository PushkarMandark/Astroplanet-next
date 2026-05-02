import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Free Kundli Generator",
  description: "Generate your Vedic birth chart (Janam Kundli) instantly with planetary positions, houses, and Vimshottari Dasha.",
  alternates: { canonical: "/kundli/" },
  openGraph: {
    title: "Free Kundli Generator | AstroEshop",
    description: "Generate your Vedic birth chart (Janam Kundli) instantly with planetary positions, houses, and Vimshottari Dasha.",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
