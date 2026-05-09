import { Metadata } from "next";

const title =
  "Free Horoscope : Daily, Weekly, Monthly & Yearly Predictions";
const description =
  "Check your free horoscope for love, career, health & finance. Get accurate daily, weekly, and yearly zodiac predictions from India's famous astrologers.";

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  alternates: { canonical: "/free-horoscope/" },
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
