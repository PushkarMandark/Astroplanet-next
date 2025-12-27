// User types for authentication
export interface User {
    id: number;
    username: string;
    email: string;
    displayName: string;
    firstName?: string;
    lastName?: string;
    avatar?: string;
}

export interface AuthCredentials {
    username: string;
    password: string;
}

export interface RegisterData {
    username: string;
    email: string;
    password: string;
    firstName?: string;
    lastName?: string;
}

export interface AuthResponse {
    success: boolean;
    token?: string;
    user?: User;
    message?: string;
}

// Billing address
export interface BillingAddress {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    address: string;
    city: string;
    state: string;
    postcode: string;
    country: string;
}
