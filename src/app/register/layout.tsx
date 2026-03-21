import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Create Account",
  description: "Register for an AstroEshop account to shop astrology products.",
  openGraph: {
    title: "Create Account | AstroEshop",
    description: "Register for an AstroEshop account to shop astrology products.",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
