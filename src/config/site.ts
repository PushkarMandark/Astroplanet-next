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
        heading: "'Cormorant Garamond', 'Crimson Pro', Georgia, serif",
        body: "'Nunito Sans', 'Segoe UI', sans-serif",
        googleFonts:
            "Cormorant+Garamond:wght@400;500;600;700&family=Crimson+Pro:wght@400;500;600;700&family=Nunito+Sans:wght@400;500;600;700",
    },
};

export type SiteConfig = typeof siteConfig;
