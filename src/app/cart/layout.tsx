import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Shopping Cart",
  description: "Review your astrology products before checkout.",
  openGraph: {
    title: "Shopping Cart | AstroEshop",
    description: "Review your astrology products before checkout.",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
