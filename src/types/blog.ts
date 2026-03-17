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


