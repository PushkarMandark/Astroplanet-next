import { Order } from "@/types";
import { wcRequest } from "./client";


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
