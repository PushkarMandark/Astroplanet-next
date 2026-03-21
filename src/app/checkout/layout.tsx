import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Checkout",
  description: "Complete your order for astrology products and services.",
  openGraph: {
    title: "Checkout | AstroEshop",
    description: "Complete your order for astrology products and services.",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
