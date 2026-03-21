import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us",
  description: "Get in touch with AstroEshop for astrology consultations, product inquiries, and support.",
  openGraph: {
    title: "Contact Us | AstroEshop",
    description: "Get in touch with AstroEshop for astrology consultations, product inquiries, and support.",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
