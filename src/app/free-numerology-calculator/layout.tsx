import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Free Numerology Calculator",
  description: "Free numerology calculator — discover your Life Path, Destiny, Soul Urge, and Personality numbers.",
  alternates: { canonical: "/free-numerology-calculator/" },
  openGraph: {
    title: "Free Numerology Calculator | AstroEshop",
    description: "Free numerology calculator — discover your Life Path, Destiny, Soul Urge, and Personality numbers.",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
