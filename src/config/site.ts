import { BookOpen, Heart, Gem, Home, Briefcase, Baby } from "lucide-react";

// Site configuration matching the PHP project's design system
export const siteConfig = {
    name: "AstroEshop",
    tagline: "Your Cosmic Journey Starts Here",
    url: process.env.NEXT_PUBLIC_SITE_URL || "https://astroeshop.com",
    wpUrl: process.env.NEXT_PUBLIC_WP_URL || "https://api.astroeshop.com",

    // Contact Info
    contact: {
        email: "support@astroeshop.com",
        phone: "+91 9971 000226",
        whatsapp: "+919971000226",
        address:
            "Shop No. 25, Lambardar Market, Chakkarpur, Gurugram, Haryana - 122001",
    },

    // Social Links
    social: {
        facebook: "https://facebook.com/astroeshop",
        instagram: "https://instagram.com/astroeshop",
        twitter: "https://twitter.com/astroeshop",
        youtube: "https://youtube.com/astroeshop",
    },

    // Business Details
    business: {
        name: "AVIS TRADERS",
        gst: "06BNGPK0966D1Z6",
    },

    // Currency
    currency: {
        symbol: "₹",
        code: "INR",
    },

    // SEO Defaults
    seo: {
        titleSuffix: " | AstroEshop",
        defaultDescription:
            "Discover authentic astrology products and services. Birth charts, gemstones, puja services, and expert consultations.",
        defaultKeywords:
            "astrology, horoscope, kundli, gemstones, puja, vedic astrology",
    },

    // Pagination
    itemsPerPage: 12,
};

// Design tokens matching PHP project
export const designTokens = {
    colors: {
        primary: "#800909", // Deep Maroon Red
        primaryLight: "#a52a2a", // Light Maroon
        primaryDark: "#5c0606", // Dark Maroon
        secondary: "#ff5c16", // Vibrant Orange
        accent: "#EDC43A", // Rich Gold
        gold: "#EDC43A", // Rich Gold
        cream: "#FFF9F0", // Warm Cream Background
        creamLight: "#FFFCF7", // Light Cream
        success: "#2e7d32",
        warning: "#ed6c02",
        error: "#c62828",
        info: "#0277bd",
    },
    fonts: {
        heading: "'Playfair Display', Georgia, 'Times New Roman', serif",
        body: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
        googleFonts:
            "Playfair+Display:wght@400;500;600;700;800&family=Inter:wght@400;500;600;700",
    },
};

export type SiteConfig = typeof siteConfig;

export const servicesConfig = [
  {
    icon: BookOpen,
    title: "Kundli Analysis",
    description: "Detailed birth chart reading",
    href: "/services",
    color: "from-orange-500 to-red-500"
  },
  {
    icon: Heart,
    title: "Match Making",
    description: "Kundli matching for marriage",
    href: "/services",
    color: "from-pink-500 to-rose-500"
  },
  {
    icon: Gem,
    title: "Gemstone Advice",
    description: "Personalized gem recommendations",
    href: "/shop",
    color: "from-purple-500 to-indigo-500"
  },
  {
    icon: Home,
    title: "Vastu Shastra",
    description: "Home & office Vastu consultation",
    href: "/services",
    color: "from-green-500 to-emerald-500"
  },
  {
    icon: Briefcase,
    title: "Career Guidance",
    description: "Professional path insights",
    href: "/services",
    color: "from-blue-500 to-cyan-500"
  },
  {
    icon: Baby,
    title: "Baby Names",
    description: "Auspicious names as per nakshatra",
    href: "/services",
    color: "from-amber-500 to-yellow-500"
  },
];
