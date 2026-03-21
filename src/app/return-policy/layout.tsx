import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Return Policy",
  description: "AstroEshop return and exchange policy for astrology products.",
  openGraph: {
    title: "Return Policy | AstroEshop",
    description: "AstroEshop return and exchange policy for astrology products.",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
