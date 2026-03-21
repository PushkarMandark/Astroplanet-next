import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Logout",
  description: "You have been logged out of AstroEshop.",
  openGraph: {
    title: "Logout | AstroEshop",
    description: "You have been logged out of AstroEshop.",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
