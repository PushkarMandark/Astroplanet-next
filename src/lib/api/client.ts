// Base API client for WooCommerce and WordPress REST API
export const WP_URL = process.env.NEXT_PUBLIC_WP_URL || "https://api.astroeshop.com";
const WC_KEY = process.env.WC_CONSUMER_KEY || "";
const WC_SECRET = process.env.WC_CONSUMER_SECRET || "";
const FETCH_TIMEOUT_MS = 30_000;

// Build-time fetches retry this many times total. The shared host
// (api.astroeshop.com) intermittently returns 5xx ("Error establishing a database
// connection") or times out under the concurrent load of a full static build;
// retrying with escalating backoff turns those transient blips into successful
// fetches instead of empty listings and 404 pages. A thrown getPostBySlug error
// aborts the whole build (no Next page-level retry on render errors), so we give
// each request several spaced-out chances to ride out a bad DB window.
//
// This guards BOTH WooCommerce and WordPress requests. It previously guarded only
// wpRequest, which is why blog pages built clean while 47 of 96 product pages
// shipped as static 404s out of that same build — every product goes through
// wcRequest, which had no retry at all.
const MAX_ATTEMPTS = 5;

// Backoff before retry N (0-indexed): 1s, 2s, 4s, 8s. Spacing retries out lets an
// overloaded MySQL recover instead of being hammered again immediately. A
// server-supplied Retry-After (see parseRetryAfter) takes precedence over this.
const BACKOFF_MS = (attempt: number) => Math.min(1000 * 2 ** attempt, 8000);

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

// Longest we will honour a server-supplied Retry-After. Rate-limit windows are
// often 60s+, which would stall a 500-page build indefinitely; past this we fall
// back to our own backoff and let the attempt budget run out.
const MAX_RETRY_AFTER_MS = 30_000;

// Parse a Retry-After header, which is either delta-seconds or an HTTP date.
// Returns null when absent or unparseable so the caller uses its own backoff.
function parseRetryAfter(value: string | null): number | null {
    if (!value) return null;
    const seconds = Number(value);
    if (Number.isFinite(seconds)) {
        return seconds > 0 ? Math.min(seconds * 1000, MAX_RETRY_AFTER_MS) : null;
    }
    const when = Date.parse(value);
    if (Number.isNaN(when)) return null;
    const ms = when - Date.now();
    return ms > 0 ? Math.min(ms, MAX_RETRY_AFTER_MS) : null;
}

// ── Build-time request rate gate ─────────────────────────────────────────────
// Hostinger fronts both api.astroeshop.com and www.astroeshop.com with a rate
// limiter that answers 429 (with no Retry-After) and STAYS engaged while you keep
// pushing. A 507-page build fires hundreds of requests, so retrying into an
// active throttle just burns the attempt budget — a build once died at page
// 0/507 with every request 429ing. The fix is to not exceed the limit at all.
//
// Server-side only: browser requests are user-paced and few, and spacing them
// would just add latency to clicks. Tune without a code change via
// WP_MAX_IN_FLIGHT / WP_MIN_SPACING_MS.
//
// NOTE: Next spawns `experimental.cpus` worker processes and this gate is
// per-process, so the aggregate ceiling is roughly
//   cpus × (1000 / WP_MIN_SPACING_MS) requests/second.
// Keep next.config.ts's `cpus` in mind when tuning either number.
const IS_SERVER = typeof window === "undefined";
const MAX_IN_FLIGHT = Math.max(1, Number(process.env.WP_MAX_IN_FLIGHT ?? 2));
const MIN_SPACING_MS = Math.max(0, Number(process.env.WP_MIN_SPACING_MS ?? 250));

let inFlight = 0;
const slotQueue: Array<() => void> = [];

function acquireSlot(): Promise<void> {
    if (inFlight < MAX_IN_FLIGHT) {
        inFlight++;
        return Promise.resolve();
    }
    return new Promise<void>((resolve) => slotQueue.push(resolve));
}

function releaseSlot(): void {
    const next = slotQueue.shift();
    // Hand the slot straight to the next waiter — inFlight is unchanged because
    // the slot never actually goes idle.
    if (next) next();
    else inFlight--;
}

// Serialise the "wait until MIN_SPACING_MS since the last start" step through a
// promise chain, so concurrent callers space out instead of all reading the same
// lastStart and firing together.
let lastStart = 0;
let spacingChain: Promise<void> = Promise.resolve();

function awaitSpacing(): Promise<void> {
    spacingChain = spacingChain.then(async () => {
        const gap = Date.now() - lastStart;
        if (gap < MIN_SPACING_MS) await delay(MIN_SPACING_MS - gap);
        lastStart = Date.now();
    });
    return spacingChain;
}

async function withRateLimit<T>(fn: () => Promise<T>): Promise<T> {
    if (!IS_SERVER) return fn();
    await acquireSlot();
    try {
        await awaitSpacing();
        return await fn();
    } finally {
        releaseSlot();
    }
}

interface ApiResponse<T> {
    success: boolean;
    data?: T;
    error?: string;
    httpCode?: number;
    // WordPress REST error code from the body (e.g. "jwt_auth_invalid_token",
    // "rest_no_route"). Lets callers tell a real application-level rejection
    // from a WAF/host error that happens to share the status code.
    code?: string;
    // True when the host never returned a usable answer — a timeout, a network
    // error, or a 5xx with every retry spent. Separates "the backend is broken
    // right now" from "the backend answered, and the answer is no". Build-time
    // callers key off this to abort the build instead of quietly rendering a 404
    // page into static HTML that nobody notices until a customer hits the URL.
    transportFailure?: boolean;
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

// Only idempotent verbs are safe to replay. A 5xx can arrive *after* the backend
// already committed the write — WooCommerce creating the order, then the response
// dying on the way back — so replaying a POST would duplicate the order, the
// inquiry, or the registration. GET/HEAD carry no such risk, and every build-time
// fetch (the case retries exist for) is a GET.
function isRetryableMethod(method: string | undefined): boolean {
    const verb = (method || "GET").toUpperCase();
    return verb === "GET" || verb === "HEAD";
}

// Shared request core for wcRequest and wpRequest — same host, same failure mode,
// so the same retry policy applies to both.
//
// Build-time calls retry on timeouts, 5xx AND 429 with backoff — the WP shared
// host drops requests when warm-starting, returns "database connection" 500s
// under concurrent build load, and throttles with 429 during a 500-page build.
// Genuine 4xx (404/400) returns immediately, so a real "not found" is never
// confused with a transient outage.
//
// `endpoint` is used only for log lines: for wcRequest the credentials live in the
// URL's query string, so logging the bare endpoint keeps them out of build output.
async function requestWithRetry<T>(
    url: string,
    endpoint: string,
    options: RequestInit
): Promise<ApiResponse<T>> {
    const headers = {
        "Content-Type": "application/json",
        Accept: "application/json",
        ...options.headers,
    };
    const maxAttempts = isRetryableMethod(options.method) ? MAX_ATTEMPTS : 1;

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

    for (let attempt = 0; attempt < maxAttempts; attempt++) {
        // First attempt at the base timeout; retries get double to ride out a slow host.
        const timeoutMs = attempt === 0 ? FETCH_TIMEOUT_MS : FETCH_TIMEOUT_MS * 2;
        let result: { response: Response; data: unknown };

        try {
            result = await withRateLimit(() => attemptFetch(timeoutMs));
        } catch (err) {
            const isTimeout =
                err instanceof Error &&
                (err.name === "TimeoutError" ||
                    err.name === "AbortError" ||
                    /timeout/i.test(err.message));
            lastErrorMsg = err instanceof Error ? err.message : "Network error";
            // Non-timeout network errors aren't worth hammering the host over.
            if (!isTimeout) {
                return { success: false, error: lastErrorMsg, transportFailure: true };
            }
            if (attempt < maxAttempts - 1) {
                console.warn(
                    `[api] timeout on ${endpoint} — retry ${attempt + 1}/${maxAttempts - 1}`
                );
                await delay(BACKOFF_MS(attempt));
                continue;
            }
            return { success: false, error: lastErrorMsg, transportFailure: true };
        }

        const { response, data } = result;
        const message =
            data && typeof data === "object" && "message" in data
                ? String((data as { message?: unknown }).message ?? "")
                : "";
        const code =
            data && typeof data === "object" && "code" in data
                ? String((data as { code?: unknown }).code ?? "")
                : "";

        if (response.ok) {
            return { success: true, data: data as T, httpCode: response.status };
        }

        if (response.status === 401 && hasAuthorizationHeader(options.headers) && onUnauthorized) {
            onUnauthorized();
        }

        // Transient statuses worth another attempt:
        //   5xx — DB-connection errors and gateway timeouts; the host usually
        //         recovers within a second or two.
        //   429 — the one 4xx that means "come back later", not "no". Both
        //         Cloudflare and Hostinger throttle this host, and a build that
        //         fetches 500+ pages trips it routinely. Treating it as final
        //         aborted a whole build on a single throttled request.
        // Every other 4xx is a real answer (404 = gone, 400 = page past end).
        const isTransient = response.status === 429 || response.status >= 500;

        if (isTransient && attempt < maxAttempts - 1) {
            // Prefer the host's own Retry-After over our guess when it sends one.
            const retryAfterMs = parseRetryAfter(response.headers.get("retry-after"));
            const waitMs = retryAfterMs ?? BACKOFF_MS(attempt);
            console.warn(
                `[api] HTTP ${response.status} on ${endpoint} — retry ${attempt + 1}/${maxAttempts - 1}` +
                    ` in ${waitMs}ms${retryAfterMs !== null ? " (Retry-After)" : ""}`
            );
            await delay(waitMs);
            continue;
        }

        return {
            success: false,
            error: message || "Request failed",
            code: code || undefined,
            httpCode: response.status,
            // A throttle or 5xx with retries spent is the host failing to answer,
            // not a real answer — callers must not read it as "not found".
            transportFailure: isTransient,
        };
    }

    return { success: false, error: lastErrorMsg, transportFailure: true };
}

// Server-side WooCommerce request (includes credentials).
// Static export: WC_KEY/WC_SECRET are build-time only, so this must never be
// called from a client component — the credentials would be empty strings.
export async function wcRequest<T>(
    endpoint: string,
    options: RequestInit = {}
): Promise<ApiResponse<T>> {
    const url = new URL(`${WP_URL}/wp-json${endpoint}`);

    // Add WooCommerce authentication
    url.searchParams.append("consumer_key", WC_KEY);
    url.searchParams.append("consumer_secret", WC_SECRET);

    return requestWithRetry<T>(url.toString(), endpoint, options);
}

// Client-side WordPress request (no credentials needed by default, but callers
// may pass an Authorization header — e.g. validateToken — in which case a 401
// should fire the unauthorized handler).
export async function wpRequest<T>(
    endpoint: string,
    options: RequestInit = {}
): Promise<ApiResponse<T>> {
    return requestWithRetry<T>(`${WP_URL}/wp-json${endpoint}`, endpoint, options);
}

// Client-side authenticated WordPress request (uses JWT token).
// Deliberately un-retried: these are user-initiated account mutations, not
// build-time reads, and the caller surfaces the failure to the user directly.
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
