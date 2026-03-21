import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Order Confirmed",
  description: "Your order has been placed successfully.",
  openGraph: {
    title: "Order Confirmed | AstroEshop",
    description: "Your order has been placed successfully.",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
