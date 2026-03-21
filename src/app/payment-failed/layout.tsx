import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Payment Failed",
  description: "Your payment could not be processed. Please try again.",
  openGraph: {
    title: "Payment Failed | AstroEshop",
    description: "Your payment could not be processed. Please try again.",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
