import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us",
  description: "Learn about AstroEshop — authentic Vedic astrology products and expert consultations by AVIS TRADERS.",
  alternates: { canonical: "/about-us/" },
  openGraph: {
    title: "About Us | AstroEshop",
    description: "Learn about AstroEshop — authentic Vedic astrology products and expert consultations by AVIS TRADERS.",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
