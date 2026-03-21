import { Metadata } from "next";

export const metadata: Metadata = {
  title: "My Orders",
  description: "Track and manage your AstroEshop orders.",
  openGraph: {
    title: "My Orders | AstroEshop",
    description: "Track and manage your AstroEshop orders.",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
