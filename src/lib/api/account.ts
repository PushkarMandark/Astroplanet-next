import { authenticatedWpRequest } from "./client";

interface ProfileUpdateData {
    firstName: string;
    lastName: string;
}

interface WpUserResponse {
    id: number;
    name: string;
    first_name: string;
    last_name: string;
}

// Update user profile (name)
export async function updateProfile(
    token: string,
    data: ProfileUpdateData
): Promise<{ success: boolean; error?: string }> {
    const response = await authenticatedWpRequest<WpUserResponse>(
        "/wp/v2/users/me",
        token,
        {
            method: "POST",
            body: JSON.stringify({
                first_name: data.firstName,
                last_name: data.lastName,
                name: `${data.firstName} ${data.lastName}`.trim(),
            }),
        }
    );

    return {
        success: response.success,
        error: response.error,
    };
}

// Change user password
export async function changePassword(
    token: string,
    newPassword: string
): Promise<{ success: boolean; error?: string }> {
    const response = await authenticatedWpRequest<WpUserResponse>(
        "/wp/v2/users/me",
        token,
        {
            method: "POST",
            body: JSON.stringify({ password: newPassword }),
        }
    );

    return {
        success: response.success,
        error: response.error,
    };
}
