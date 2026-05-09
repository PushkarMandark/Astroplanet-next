import { Metadata } from "next";

const title = "Get Your Kundli Match making Report for Marriage | Matching";
const description =
  "Get accurate Kundli matching for marriage with Guna Milan, Manglik Dosha analysis, compatibility score and expert astrological guidance.";

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  alternates: { canonical: "/free-match-making-calculator/" },
  openGraph: {
    title,
    description,
  },
  twitter: {
    title,
    description,
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
