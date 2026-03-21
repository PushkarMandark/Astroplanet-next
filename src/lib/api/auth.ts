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
    }>("/jwt-auth/v1/token", {
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

// Validate JWT token
export async function validateToken(token: string): Promise<boolean> {
    const response = await wpRequest<{ data?: { status: number } }>(
        "/jwt-auth/v1/token/validate",
        {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );

    return response.success;
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
