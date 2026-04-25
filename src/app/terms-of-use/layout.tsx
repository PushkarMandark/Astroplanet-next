import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Use",
  description: "Terms and conditions for using AstroEshop.",
  alternates: { canonical: "/terms-of-use/" },
  openGraph: {
    title: "Terms of Use | AstroEshop",
    description: "Terms and conditions for using AstroEshop.",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
