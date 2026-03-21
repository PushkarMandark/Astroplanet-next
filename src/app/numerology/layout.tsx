import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Numerology Calculator",
  description: "Free numerology calculator — discover your Life Path, Destiny, Soul Urge, and Personality numbers.",
  openGraph: {
    title: "Numerology Calculator | AstroEshop",
    description: "Free numerology calculator — discover your Life Path, Destiny, Soul Urge, and Personality numbers.",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
