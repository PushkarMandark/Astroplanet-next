import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How AstroEshop collects, uses, and protects your personal information.",
  openGraph: {
    title: "Privacy Policy | AstroEshop",
    description: "How AstroEshop collects, uses, and protects your personal information.",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
