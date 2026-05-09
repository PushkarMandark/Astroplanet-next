import { Metadata } from "next";

const title =
  "Free numerology calculator | Life Path, Destiny, Soul Urge, and Personality numbers.";
const description =
  "Use our Name Numerology Calculator and Numerology Calculator to get an accurate numerology reading and calculate your Destiny, Soul Urge, and Dream Numbers.";

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  alternates: { canonical: "/free-numerology-calculator/" },
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
