// Base API client for WooCommerce and WordPress REST API
export const WP_URL = process.env.NEXT_PUBLIC_WP_URL || "https://api.astroeshop.com";
const WC_KEY = process.env.WC_CONSUMER_KEY || "";
const WC_SECRET = process.env.WC_CONSUMER_SECRET || "";
const FETCH_TIMEOUT_MS = 30_000;

interface ApiResponse<T> {
    success: boolean;
    data?: T;
    error?: string;
    httpCode?: number;
}

// Module-level handler invoked when an authenticated request returns 401.
// Wired by the auth store on rehydrate so an expired JWT triggers a clean logout.
let onUnauthorized: (() => void) | null = null;

export function setUnauthorizedHandler(fn: (() => void) | null): void {
    onUnauthorized = fn;
}

// Determine whether a RequestInit has an Authorization header (case-insensitive).
function hasAuthorizationHeader(headers: HeadersInit | undefined): boolean {
    if (!headers) return false;
    if (headers instanceof Headers) {
        return headers.has("Authorization");
    }
    if (Array.isArray(headers)) {
        return headers.some(([k]) => k.toLowerCase() === "authorization");
    }
    return Object.keys(headers).some((k) => k.toLowerCase() === "authorization");
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
            signal: AbortSignal.timeout(FETCH_TIMEOUT_MS),
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                ...options.headers,
            },

        });

        const data = await response.json();

        if (!response.ok) {
            // wcRequest is server-only; the 401 handler is a no-op there but we
            // fire it for symmetry if a JWT was passed.
            if (response.status === 401 && hasAuthorizationHeader(options.headers) && onUnauthorized) {
                onUnauthorized();
            }
            return {
                success: false,
                error: data.message || "Request failed",
                httpCode: response.status,
            };
        }

        return { success: true, data, httpCode: response.status };
    } catch (error) {
        return {
            success: false,
            error: error instanceof Error ? error.message : "Network error",
        };
    }
}

// Client-side WordPress request (no credentials needed by default, but callers
// may pass an Authorization header — e.g. validateToken — in which case a 401
// should fire the unauthorized handler).
// Build-time calls retry once on timeout/network error with a doubled timeout —
// the WP shared host occasionally drops the first request when warm-starting.
export async function wpRequest<T>(
    endpoint: string,
    options: RequestInit = {}
): Promise<ApiResponse<T>> {
    const url = `${WP_URL}/wp-json${endpoint}`;
    const headers = {
        "Content-Type": "application/json",
        Accept: "application/json",
        ...options.headers,
    };

    const attemptFetch = async (timeoutMs: number) => {
        const response = await fetch(url, {
            ...options,
            signal: AbortSignal.timeout(timeoutMs),
            headers,
        });
        const data = await response.json();
        return { response, data };
    };

    try {
        let result;
        try {
            result = await attemptFetch(FETCH_TIMEOUT_MS);
        } catch (firstErr) {
            const isTimeout =
                firstErr instanceof Error &&
                (firstErr.name === "TimeoutError" ||
                    firstErr.name === "AbortError" ||
                    /timeout/i.test(firstErr.message));
            if (!isTimeout) throw firstErr;
            console.warn(`[wpRequest] timeout on ${endpoint} — retrying with doubled timeout`);
            result = await attemptFetch(FETCH_TIMEOUT_MS * 2);
        }

        const { response, data } = result;

        if (!response.ok) {
            if (response.status === 401 && hasAuthorizationHeader(options.headers) && onUnauthorized) {
                onUnauthorized();
            }
            return {
                success: false,
                error: data.message || "Request failed",
                httpCode: response.status,
            };
        }

        return { success: true, data, httpCode: response.status };
    } catch (error) {
        return {
            success: false,
            error: error instanceof Error ? error.message : "Network error",
        };
    }
}

// Client-side authenticated WordPress request (uses JWT token)
export async function authenticatedWpRequest<T>(
    endpoint: string,
    token: string,
    options: RequestInit = {}
): Promise<ApiResponse<T>> {
    const url = `${WP_URL}/wp-json${endpoint}`;

    try {
        const response = await fetch(url, {
            ...options,
            signal: AbortSignal.timeout(FETCH_TIMEOUT_MS),
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                Authorization: `Bearer ${token}`,
                ...options.headers,
            },
        });

        const data = await response.json();

        if (!response.ok) {
            if (response.status === 401 && onUnauthorized) {
                onUnauthorized();
            }
            return {
                success: false,
                error: data.message || "Request failed",
                httpCode: response.status,
            };
        }

        return { success: true, data, httpCode: response.status };
    } catch (error) {
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
