import { Metadata } from "next";

export const metadata: Metadata = {
  title: "My Account",
  description: "Manage your profile, password, and account settings.",
  openGraph: {
    title: "My Account | AstroEshop",
    description: "Manage your profile, password, and account settings.",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
