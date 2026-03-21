import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Login",
  description: "Sign in to your AstroEshop account.",
  openGraph: {
    title: "Login | AstroEshop",
    description: "Sign in to your AstroEshop account.",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
