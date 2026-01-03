// Base API client for WooCommerce and WordPress REST API
const WP_URL = process.env.NEXT_PUBLIC_WP_URL || "https://api.astroeshop.com";
const WC_KEY = process.env.WC_CONSUMER_KEY || "";
const WC_SECRET = process.env.WC_CONSUMER_SECRET || "";

interface ApiResponse<T> {
    success: boolean;
    data?: T;
    error?: string;
    httpCode?: number;
}

// Server-side WooCommerce request (includes credentials)
export async function wcRequest<T>(
    endpoint: string,
    options: RequestInit = {}
): Promise<ApiResponse<T>> {
    const url = new URL(`${WP_URL}/wp-json${endpoint}`);

    // Add WooCommerce authentication
    url.searchParams.append("consumer_key", WC_KEY);
    url.searchParams.append("consumer_secret", WC_SECRET);

    try {
        const response = await fetch(url.toString(), {
            ...options,
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                ...options.headers,
            },
            next: { revalidate: 60 }, // Cache for 60 seconds
        });

        const data = await response.json();

        if (!response.ok) {
            return {
                success: false,
                error: data.message || "Request failed",
                httpCode: response.status,
            };
        }

        return { success: true, data, httpCode: response.status };
    } catch (error) {
        console.error("WC API Error:", error);
        return {
            success: false,
            error: error instanceof Error ? error.message : "Network error",
        };
    }
}

// Client-side WordPress request (no credentials needed)
export async function wpRequest<T>(
    endpoint: string,
    options: RequestInit = {}
): Promise<ApiResponse<T>> {
    const url = `${WP_URL}/wp-json${endpoint}`;

    try {
        const response = await fetch(url, {
            ...options,
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                ...options.headers,
            },
        });

        const data = await response.json();

        if (!response.ok) {
            return {
                success: false,
                error: data.message || "Request failed",
                httpCode: response.status,
            };
        }

        return { success: true, data, httpCode: response.status };
    } catch (error) {
        console.error("WP API Error:", error);
        return {
            success: false,
            error: error instanceof Error ? error.message : "Network error",
        };
    }
}

// Format price helper
export function formatPrice(amount: number | string): string {
    const num = typeof amount === "string" ? parseFloat(amount) : amount;
    return `₹${num.toLocaleString("en-IN", {
        minimumFractionDigits: 0,
        maximumFractionDigits: 2,
    })}`;
}

// Build query string
export function buildQueryString(params: Record<string, unknown>): string {
    const query = new URLSearchParams();
    Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null && value !== "") {
            query.append(key, String(value));
        }
    });
    return query.toString();
}
