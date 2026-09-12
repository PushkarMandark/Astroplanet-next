import { AuthCredentials, RegisterData, AuthResponse, User } from "@/types";
import { wpRequest, WP_URL } from "./client";

// Clean HTML tags from WordPress error messages
function cleanErrorMessage(message: string): string {
    // Remove HTML tags
    const cleanMessage = message.replace(/<[^>]*>/g, '');

    // Make common error messages more user-friendly
    if (cleanMessage.toLowerCase().includes('not registered')) {
        return 'This username is not registered. Please check your username or email.';
    }
    if (cleanMessage.toLowerCase().includes('incorrect') || cleanMessage.toLowerCase().includes('wrong')) {
        return 'Incorrect password. Please try again.';
    }
    if (cleanMessage.toLowerCase().includes('invalid')) {
        return 'Invalid username or password.';
    }

    return cleanMessage || 'Login failed. Please try again.';
}

// The api host answers OPTIONS for exactly /jwt-auth/v1/token and
// /jwt-auth/v1/token/validate with a bare 200 that never reaches WordPress
// (no X-Powered-By, no Access-Control-* headers) - the fingerprint of a
// "fast preflight" rewrite, most likely written by the JWT Auth plugin's CORS
// feature. Browsers reject that preflight, so login failed with
// "Failed to fetch" while curl/Node (which skip preflights) worked fine.
// A query string slips past the exact-match rule and the request reaches
// WordPress, whose core CORS handling is correct on every route. The param is
// ignored by the endpoint; a timestamp also defeats any caching layer.
// Verified 2026-09-12 against the live host. Safe to keep if the server rule
// is later removed.
function jwtRoute(path: string): string {
    return `${path}?_=${Date.now()}`;
}

// Login with JWT — uses wpRequest for consistent timeout/error handling
export async function login(
    credentials: AuthCredentials
): Promise<AuthResponse> {
    const response = await wpRequest<{
        token?: string;
        user_id?: number;
        user_email?: string;
        user_display_name?: string;
        message?: string;
    }>(jwtRoute("/jwt-auth/v1/token"), {
        method: "POST",
        body: JSON.stringify({
            username: credentials.username,
            password: credentials.password,
        }),
    });

    if (!response.success || !response.data?.token) {
        return {
            success: false,
            message: cleanErrorMessage(
                response.data?.message || response.error || "Invalid credentials"
            ),
        };
    }

    const data = response.data;
    return {
        success: true,
        token: data.token,
        user: {
            id: data.user_id || 0,
            username: credentials.username,
            email: data.user_email || "",
            displayName: data.user_display_name || credentials.username,
        },
    };
}

// Register new customer via custom WP endpoint (no WC credentials needed)
export async function register(data: RegisterData): Promise<AuthResponse> {
    const response = await wpRequest<{
        success: boolean;
        message: string;
        data?: { id: number; email: string; username: string };
    }>("/astroeshop/v1/register", {
        method: "POST",
        body: JSON.stringify({
            email: data.email,
            username: data.username,
            password: data.password,
            first_name: data.firstName || data.username,
            last_name: data.lastName || "",
        }),
    });

    if (!response.success || !response.data?.success) {
        return {
            success: false,
            message: response.data?.message || response.error || "Registration failed",
        };
    }

    // Auto-login after registration
    return login({ username: data.username, password: data.password });
}

// Outcome of a token check. "unknown" means we could not get an answer from
// the server (throttled, offline, CORS-blocked, 5xx) - NOT that the token is
// bad. Callers must never log the user out on "unknown".
export type TokenValidity = "valid" | "invalid" | "unknown";

// Read the `exp` claim out of a JWT without verifying it. Verification is the
// server's job; this only lets us skip a network round-trip for a token that
// is obviously dead, and it costs zero requests. Returns null if the token
// isn't a decodable JWT.
export function getJwtExpiry(token: string): number | null {
    const parts = token.split(".");
    if (parts.length !== 3) return null;
    try {
        const base64 = parts[1].replace(/-/g, "+").replace(/_/g, "/");
        const padded = base64 + "=".repeat((4 - (base64.length % 4)) % 4);
        const payload = JSON.parse(atob(padded)) as { exp?: unknown };
        return typeof payload.exp === "number" ? payload.exp * 1000 : null;
    } catch {
        return null;
    }
}

export function isJwtExpired(token: string, nowMs: number): boolean {
    const exp = getJwtExpiry(token);
    return exp !== null && exp <= nowMs;
}

// Validate JWT token against the server.
//
// Only a 401/403 that carries the JWT plugin's own error code counts as a
// rejection. Everything else - a 429 from the host's rate limiter, a
// CORS-blocked preflight (fetch throws), a timeout, a 5xx - is "unknown".
// The previous version returned a bare boolean and the auth store logged the
// user out on false, so a hard refresh (37 asset requests + this POST in one
// burst) could throttle this single call and end the session. Before the
// preflight fix it failed on EVERY page load, which is why nobody stayed
// signed in past their next navigation.
export async function validateToken(token: string): Promise<TokenValidity> {
    const response = await wpRequest<{ code?: string; data?: { status: number } }>(
        jwtRoute("/jwt-auth/v1/token/validate"),
        {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );

    if (response.success) return "valid";

    const rejected =
        (response.httpCode === 401 || response.httpCode === 403) &&
        typeof response.code === "string" &&
        response.code.startsWith("jwt_auth_");
    return rejected ? "invalid" : "unknown";
}

// Get current user data
export async function getCurrentUser(token: string): Promise<User | null> {
    try {
        const response = await fetch(`${WP_URL}/wp-json/wp/v2/users/me`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
            signal: AbortSignal.timeout(10_000),
        });

        if (!response.ok) return null;

        const data = await response.json();
        return {
            id: data.id,
            username: data.slug,
            email: data.email || "",
            displayName: data.name,
            firstName: data.first_name,
            lastName: data.last_name,
            avatar: data.avatar_urls?.["96"],
        };
    } catch {
        return null;
    }
}
