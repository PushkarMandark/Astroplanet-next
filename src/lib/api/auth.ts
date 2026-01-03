import { AuthCredentials, RegisterData, AuthResponse, User } from "@/types";
import { wpRequest, wcRequest } from "./client";

const WP_URL = process.env.NEXT_PUBLIC_WP_URL || "https://backend.astroplanet.in";

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

// Login with JWT
export async function login(
    credentials: AuthCredentials
): Promise<AuthResponse> {
    try {
        const response = await fetch(`${WP_URL}/wp-json/jwt-auth/v1/token`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                username: credentials.username,
                password: credentials.password,
            }),
        });

        const data = await response.json();

        if (!response.ok || !data.token) {
            return {
                success: false,
                message: cleanErrorMessage(data.message || "Invalid credentials"),
            };
        }

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
    } catch (error) {
        return {
            success: false,
            message: error instanceof Error ? error.message : "Login failed",
        };
    }
}

// Register new customer
export async function register(data: RegisterData): Promise<AuthResponse> {
    const response = await wcRequest<{ id: number; email: string }>(
        "/wc/v3/customers",
        {
            method: "POST",
            body: JSON.stringify({
                email: data.email,
                username: data.username,
                password: data.password,
                first_name: data.firstName || data.username,
                last_name: data.lastName || "",
            }),
        }
    );

    if (!response.success || !response.data) {
        return {
            success: false,
            message: response.error || "Registration failed",
        };
    }

    // Auto-login after registration
    return login({ username: data.username, password: data.password });
}

// Validate JWT token
export async function validateToken(token: string): Promise<boolean> {
    try {
        const response = await fetch(
            `${WP_URL}/wp-json/jwt-auth/v1/token/validate`,
            {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );

        return response.ok;
    } catch {
        return false;
    }
}

// Get current user data
export async function getCurrentUser(token: string): Promise<User | null> {
    try {
        const response = await fetch(`${WP_URL}/wp-json/wp/v2/users/me`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
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
