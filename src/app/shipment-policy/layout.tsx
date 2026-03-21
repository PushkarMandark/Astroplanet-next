import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Shipping Policy",
  description: "AstroEshop shipping and delivery information across India.",
  openGraph: {
    title: "Shipping Policy | AstroEshop",
    description: "AstroEshop shipping and delivery information across India.",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
