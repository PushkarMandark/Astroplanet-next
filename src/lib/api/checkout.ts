import { CartItem } from "@/types";
import { wpRequest, authenticatedWpRequest } from "./client";

// Billing address shape as expected by the WordPress custom endpoint
interface CheckoutBilling {
    first_name: string;
    last_name: string;
    email: string;
    phone: string;
    address_1: string;
    city: string;
    state: string;
    postcode: string;
    country: string;
}

interface CreateOrderPayload {
    items: { product_id: number; quantity: number }[];
    billing: CheckoutBilling;
    customer_note: string;
}

interface CreateOrderApiResponse {
    success: boolean;
    order_id?: number;
    order_key?: string;
    checkout_url?: string;
    total?: string;
    message?: string;
}

interface UserAddressApiResponse {
    billing?: {
        first_name?: string;
        last_name?: string;
        email?: string;
        phone?: string;
        address_1?: string;
        city?: string;
        state?: string;
        postcode?: string;
    };
}

// Create order via custom WordPress plugin endpoint
export async function createOrder(
    items: CartItem[],
    billing: CheckoutBilling,
    customerNote: string
): Promise<CreateOrderApiResponse> {
    const payload: CreateOrderPayload = {
        items: items.map((item) => ({
            product_id: item.id,
            quantity: item.quantity,
        })),
        billing,
        customer_note: customerNote,
    };

    const response = await wpRequest<CreateOrderApiResponse>(
        "/astroeshop/v1/create-order",
        {
            method: "POST",
            body: JSON.stringify(payload),
        }
    );

    if (!response.success || !response.data) {
        return {
            success: false,
            message: response.error || "Failed to create order",
        };
    }

    return response.data;
}

// Fetch saved user address (requires JWT)
export async function getUserAddress(
    token: string
): Promise<UserAddressApiResponse | null> {
    const response = await authenticatedWpRequest<UserAddressApiResponse>(
        "/astroeshop/v1/user-address",
        token
    );

    if (response.success && response.data) {
        return response.data;
    }

    return null;
}
