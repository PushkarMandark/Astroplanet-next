import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Refund & Cancellation Policy",
  description: "AstroEshop refund and order cancellation policy.",
  openGraph: {
    title: "Refund & Cancellation Policy | AstroEshop",
    description: "AstroEshop refund and order cancellation policy.",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
