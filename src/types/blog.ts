// Blog post types matching WordPress REST API
export interface BlogPost {
    id: number;
    slug: string;
    title: {
        rendered: string;
    };
    excerpt: {
        rendered: string;
    };
    content: {
        rendered: string;
    };
    date: string;
    modified: string;
    author: number;
    featured_media: number;
    categories: number[];
    tags: number[];
    _embedded?: {
        "wp:featuredmedia"?: Array<{
            source_url: string;
            alt_text: string;
        }>;
        author?: Array<{
            name: string;
            avatar_urls: Record<string, string>;
        }>;
    };
}

export interface BlogCategory {
    id: number;
    name: string;
    slug: string;
    count: number;
}

// Horoscope types
export interface HoroscopeSign {
    sign: string;
    name: string;
    hindi: string;
    symbol: string;
    dates: string;
    element: "Fire" | "Earth" | "Air" | "Water";
}

export interface HoroscopeReading {
    sign: string;
    name: string;
    hindi: string;
    symbol: string;
    dates: string;
    element: string;
    description: string;
    lucky_number?: number;
    lucky_color?: string;
    mood?: string;
}

// Zodiac signs data
export const zodiacSigns: HoroscopeSign[] = [
    { sign: "aries", name: "Aries", hindi: "मेष", symbol: "♈", dates: "Mar 21 - Apr 19", element: "Fire" },
    { sign: "taurus", name: "Taurus", hindi: "वृषभ", symbol: "♉", dates: "Apr 20 - May 20", element: "Earth" },
    { sign: "gemini", name: "Gemini", hindi: "मिथुन", symbol: "♊", dates: "May 21 - Jun 20", element: "Air" },
    { sign: "cancer", name: "Cancer", hindi: "कर्क", symbol: "♋", dates: "Jun 21 - Jul 22", element: "Water" },
    { sign: "leo", name: "Leo", hindi: "सिंह", symbol: "♌", dates: "Jul 23 - Aug 22", element: "Fire" },
    { sign: "virgo", name: "Virgo", hindi: "कन्या", symbol: "♍", dates: "Aug 23 - Sep 22", element: "Earth" },
    { sign: "libra", name: "Libra", hindi: "तुला", symbol: "♎", dates: "Sep 23 - Oct 22", element: "Air" },
    { sign: "scorpio", name: "Scorpio", hindi: "वृश्चिक", symbol: "♏", dates: "Oct 23 - Nov 21", element: "Water" },
    { sign: "sagittarius", name: "Sagittarius", hindi: "धनु", symbol: "♐", dates: "Nov 22 - Dec 21", element: "Fire" },
    { sign: "capricorn", name: "Capricorn", hindi: "मकर", symbol: "♑", dates: "Dec 22 - Jan 19", element: "Earth" },
    { sign: "aquarius", name: "Aquarius", hindi: "कुंभ", symbol: "♒", dates: "Jan 20 - Feb 18", element: "Air" },
    { sign: "pisces", name: "Pisces", hindi: "मीन", symbol: "♓", dates: "Feb 19 - Mar 20", element: "Water" },
];
