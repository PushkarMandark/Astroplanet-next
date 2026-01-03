import { CreateOrderData, CreateOrderResponse, Order } from "@/types";
import { wcRequest } from "./client";

const WP_URL = process.env.NEXT_PUBLIC_WP_URL || "https://api.astroeshop.com";

// Create order
export async function createOrder(
    data: CreateOrderData
): Promise<CreateOrderResponse> {
    const lineItems = data.items.map((item) => ({
        product_id: item.id,
        quantity: item.quantity,
    }));

    const orderData = {
        payment_method: "",
        payment_method_title: "",
        set_paid: false,
        billing: {
            first_name: data.billing.firstName,
            last_name: data.billing.lastName,
            email: data.billing.email,
            phone: data.billing.phone,
            address_1: data.billing.address,
            city: data.billing.city,
            state: data.billing.state,
            postcode: data.billing.postcode,
            country: "IN",
        },
        shipping: {
            first_name: data.billing.firstName,
            last_name: data.billing.lastName,
            address_1: data.billing.address,
            city: data.billing.city,
            state: data.billing.state,
            postcode: data.billing.postcode,
            country: "IN",
        },
        line_items: lineItems,
        customer_note: data.notes || "",
    };

    const response = await wcRequest<{
        id: number;
        order_key: string;
        total: string;
    }>("/wc/v3/orders", {
        method: "POST",
        body: JSON.stringify(orderData),
    });

    if (!response.success || !response.data) {
        return {
            success: false,
            message: response.error || "Failed to create order",
        };
    }

    const order = response.data;
    const checkoutUrl = `${WP_URL}/checkout/order-pay/${order.id}/?pay_for_order=true&key=${order.order_key}`;

    return {
        success: true,
        order_id: order.id,
        order_key: order.order_key,
        checkout_url: checkoutUrl,
        total: order.total,
    };
}

// Get customer orders
export async function getOrders(
    customerId: number,
    token: string
): Promise<Order[]> {
    const response = await wcRequest<Order[]>(
        `/wc/v3/orders?customer=${customerId}`,
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );

    return response.success ? response.data || [] : [];
}

// Get single order
export async function getOrder(
    orderId: number,
    token: string
): Promise<Order | null> {
    const response = await wcRequest<Order>(`/wc/v3/orders/${orderId}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    return response.success ? response.data || null : null;
}
