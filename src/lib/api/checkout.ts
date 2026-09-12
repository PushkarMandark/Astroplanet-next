import { CartItem } from "@/types";
import { wpRequest, authenticatedWpRequest } from "./client";
import { siteConfig } from "@/config/site";

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
    return_url: string;
    cancel_url: string;
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

// Create order via custom WordPress plugin endpoint.
// `idempotencyKey` is forwarded as the `Idempotency-Key` HTTP header so retries
// of the same logical order do not produce duplicate orders on the WP side.
// `token` (the customer's JWT) is sent as a Bearer header so WordPress ties the
// order to their account. Without it the plugin has no idea who is ordering and
// creates a GUEST order (customer_id 0): WooCommerce then shows "You are paying
// for a guest order…" on the pay page — alarming for a customer who just signed
// in — and the address never gets saved for next time's prefill. Checkout is
// gated behind login, so the token is always available here; it stays optional
// only so a stale session degrades to a guest order instead of a crash.
export async function createOrder(
    items: CartItem[],
    billing: CheckoutBilling,
    customerNote: string,
    idempotencyKey?: string,
    token?: string
): Promise<CreateOrderApiResponse> {
    const frontendUrl = siteConfig.url;
    const payload: CreateOrderPayload = {
        items: items.map((item) => ({
            product_id: item.id,
            quantity: item.quantity,
        })),
        billing,
        customer_note: customerNote,
        return_url: `${frontendUrl}/order-confirmation`,
        cancel_url: `${frontendUrl}/payment-failed`,
    };

    const headers: Record<string, string> = {};
    if (idempotencyKey) {
        headers["Idempotency-Key"] = idempotencyKey;
    }
    if (token) {
        // client.ts spots this header and, on a 401 (expired JWT), fires the
        // unauthorized handler so the user is logged out cleanly.
        headers["Authorization"] = `Bearer ${token}`;
    }

    const response = await wpRequest<CreateOrderApiResponse>(
        "/astroeshop/v1/create-order",
        {
            method: "POST",
            body: JSON.stringify(payload),
            headers,
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
