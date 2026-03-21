import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Wishlist",
  description: "Your saved astrology products and gemstones.",
  openGraph: {
    title: "Wishlist | AstroEshop",
    description: "Your saved astrology products and gemstones.",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
