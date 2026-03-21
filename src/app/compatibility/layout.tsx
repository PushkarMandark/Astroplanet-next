import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Kundli Matching",
  description: "Free Kundli matching with 36-point Ashtakoot Guna Milan for marriage compatibility.",
  openGraph: {
    title: "Kundli Matching | AstroEshop",
    description: "Free Kundli matching with 36-point Ashtakoot Guna Milan for marriage compatibility.",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
