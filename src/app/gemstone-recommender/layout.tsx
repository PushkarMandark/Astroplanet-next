import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Gemstone Recommender",
  description: "Find your ideal Vedic gemstone based on your birth chart. Personalized recommendations with wearing guidelines.",
  openGraph: {
    title: "Gemstone Recommender | AstroEshop",
    description: "Find your ideal Vedic gemstone based on your birth chart. Personalized recommendations with wearing guidelines.",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
