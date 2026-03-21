import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Daily Panchang",
  description: "Hindu Panchang with Tithi, Nakshatra, Yoga, Karana, and auspicious timings for today.",
  openGraph: {
    title: "Daily Panchang | AstroEshop",
    description: "Hindu Panchang with Tithi, Nakshatra, Yoga, Karana, and auspicious timings for today.",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
