// Base API client for WooCommerce and WordPress REST API
export const WP_URL = process.env.NEXT_PUBLIC_WP_URL || "https://api.astroeshop.com";
const WC_KEY = process.env.WC_CONSUMER_KEY || "";
const WC_SECRET = process.env.WC_CONSUMER_SECRET || "";
const FETCH_TIMEOUT_MS = 30_000;

// Build-time WP fetches retry this many times total. The shared host
// (api.astroeshop.com) intermittently returns 5xx ("Error establishing a database
// connection") or times out under the concurrent load of a full static build;
// retrying with escalating backoff turns those transient blips into successful
// fetches instead of empty listings and 404 pages. A thrown getPostBySlug error
// aborts the whole build (no Next page-level retry on render errors), so we give
// each request several spaced-out chances to ride out a bad DB window.
const WP_MAX_ATTEMPTS = 4;

// Backoff before retry N (0-indexed): 1s, 2s, 4s. Spacing retries out lets an
// overloaded MySQL recover instead of being hammered again immediately.
const WP_BACKOFF_MS = (attempt: number) => Math.min(1000 * 2 ** attempt, 8000);

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

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
// Build-time calls retry on BOTH timeout and 5xx with backoff — the WP shared host
// frequently drops requests when warm-starting and returns "database connection"
// 500s under concurrent build load. Genuine 4xx (404/400) returns immediately, so
// a real "post not found" is never confused with a transient outage.
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

    // Parse defensively: a 5xx error page (e.g. the WordPress "Error establishing a
    // database connection" page) is HTML, not JSON — a bare response.json() would
    // throw and mask the status code, defeating the 5xx retry below.
    const attemptFetch = async (timeoutMs: number) => {
        const response = await fetch(url, {
            ...options,
            signal: AbortSignal.timeout(timeoutMs),
            headers,
        });
        let data: unknown;
        try {
            data = await response.json();
        } catch {
            const text = await response.text().catch(() => "");
            data = { message: text || "Invalid response body" };
        }
        return { response, data };
    };

    let lastErrorMsg = "Network error";

    for (let attempt = 0; attempt < WP_MAX_ATTEMPTS; attempt++) {
        // First attempt at the base timeout; retries get double to ride out a slow host.
        const timeoutMs = attempt === 0 ? FETCH_TIMEOUT_MS : FETCH_TIMEOUT_MS * 2;
        let result: { response: Response; data: unknown };

        try {
            result = await attemptFetch(timeoutMs);
        } catch (err) {
            const isTimeout =
                err instanceof Error &&
                (err.name === "TimeoutError" ||
                    err.name === "AbortError" ||
                    /timeout/i.test(err.message));
            lastErrorMsg = err instanceof Error ? err.message : "Network error";
            // Non-timeout network errors aren't worth hammering the host over.
            if (!isTimeout) {
                return { success: false, error: lastErrorMsg };
            }
            if (attempt < WP_MAX_ATTEMPTS - 1) {
                console.warn(
                    `[wpRequest] timeout on ${endpoint} — retry ${attempt + 1}/${WP_MAX_ATTEMPTS - 1}`
                );
                await delay(WP_BACKOFF_MS(attempt));
                continue;
            }
            return { success: false, error: lastErrorMsg };
        }

        const { response, data } = result;
        const message =
            data && typeof data === "object" && "message" in data
                ? String((data as { message?: unknown }).message ?? "")
                : "";

        if (response.ok) {
            return { success: true, data: data as T, httpCode: response.status };
        }

        if (response.status === 401 && hasAuthorizationHeader(options.headers) && onUnauthorized) {
            onUnauthorized();
        }

        // Retry transient 5xx (DB-connection errors, gateway timeouts); the host
        // usually recovers within a second or two. Never retry 4xx — those are
        // genuine (404 = post really gone, 400 = page past end).
        if (response.status >= 500 && attempt < WP_MAX_ATTEMPTS - 1) {
            console.warn(
                `[wpRequest] HTTP ${response.status} on ${endpoint} — retry ${attempt + 1}/${WP_MAX_ATTEMPTS - 1}`
            );
            await delay(WP_BACKOFF_MS(attempt));
            continue;
        }

        return {
            success: false,
            error: message || "Request failed",
            httpCode: response.status,
        };
    }

    return { success: false, error: lastErrorMsg };
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
