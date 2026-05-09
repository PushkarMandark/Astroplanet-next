// Navigation configuration matching PHP project
export const navigationConfig = {
    main: [
        { label: "Home", href: "/" },
        { label: "Shop", href: "/shop" },
        { label: "Services", href: "/services" },
        {
            label: "Free Tools",
            href: "#",
            children: [
                {
                    label: "Horoscope",
                    href: "/free-horoscope",
                    description: "Daily zodiac predictions",
                    icon: "star",
                    badge: "FREE",
                },
                {
                    label: "Panchang",
                    href: "/panchang",
                    description: "Hindu calendar & auspicious timings",
                    icon: "calendar",
                    badge: "FREE",
                },
                {
                    label: "Numerology",
                    href: "/free-numerology-calculator",
                    description: "Number-based life insights",
                    icon: "hash",
                    badge: "FREE",
                },
                {
                    label: "Kundli",
                    href: "/free-kundli-calculator",
                    description: "Free birth chart generator",
                    icon: "circle-dot",
                    badge: "NEW",
                },
                {
                    label: "Match Making",
                    href: "/free-match-making-calculator",
                    description: "36-point Guna Milan matching",
                    icon: "heart",
                    badge: "NEW",
                },
                {
                    label: "Gemstone Finder",
                    href: "/gemstone-recommender",
                    description: "Find your lucky gemstone",
                    icon: "gem",
                    badge: "NEW",
                },
            ],
        },
        { label: "Blog", href: "/blog" },
        { label: "Contact", href: "/contact" },
    ],

    footer: {
        quickLinks: [
            { label: "About Us", href: "/about-us" },
            { label: "Shop", href: "/shop" },
            { label: "Services", href: "/services" },
            { label: "Contact", href: "/contact" },
        ],
        policies: [
            { label: "Terms of Use", href: "/terms-of-use" },
            { label: "Privacy Policy", href: "/privacy-policy" },
            { label: "Return Policy", href: "/return-policy" },
            { label: "Shipment Policy", href: "/shipment-policy" },
            { label: "Refund & Cancellation", href: "/refund-cancellation-policy" },
        ],
        freeTools: [
            { label: "Daily Horoscope", href: "/free-horoscope" },
            { label: "Panchang", href: "/panchang" },
            { label: "Numerology", href: "/free-numerology-calculator" },
            { label: "Kundli Generator", href: "/free-kundli-calculator" },
            { label: "Match Making", href: "/free-match-making-calculator" },
            { label: "Gemstone Finder", href: "/gemstone-recommender" },
        ],
    },
};

export type NavigationItem = {
    label: string;
    href: string;
    description?: string;
    icon?: string;
    badge?: string;
    children?: NavigationItem[];
};
