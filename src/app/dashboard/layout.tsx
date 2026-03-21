import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Manage your AstroEshop account, orders, and preferences.",
  openGraph: {
    title: "Dashboard | AstroEshop",
    description: "Manage your AstroEshop account, orders, and preferences.",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
