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
                    href: "/horoscope",
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
                    href: "/numerology",
                    description: "Number-based life insights",
                    icon: "hash",
                    badge: "FREE",
                },
            ],
        },
        { label: "Blog", href: "/blog" },
        { label: "Contact", href: "/contact" },
    ],

    footer: {
        quickLinks: [
            { label: "About Us", href: "/about" },
            { label: "Shop", href: "/shop" },
            { label: "Services", href: "/services" },
            { label: "Contact", href: "/contact" },
        ],
        policies: [
            { label: "Privacy Policy", href: "/privacy-policy" },
            { label: "Terms of Service", href: "/terms" },
            { label: "Refund Policy", href: "/refund-policy" },
            { label: "Shipping Info", href: "/shipping" },
        ],
        freeTools: [
            { label: "Daily Horoscope", href: "/horoscope" },
            { label: "Panchang", href: "/panchang" },
            { label: "Numerology", href: "/numerology" },
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
