import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Free Match Making Calculator",
  description: "Free Kundli match making calculator with 36-point Ashtakoot Guna Milan for marriage compatibility.",
  alternates: { canonical: "/free-match-making-calculator/" },
  openGraph: {
    title: "Free Match Making Calculator | AstroEshop",
    description: "Free Kundli match making calculator with 36-point Ashtakoot Guna Milan for marriage compatibility.",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
