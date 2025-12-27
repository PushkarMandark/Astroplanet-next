import { BillingAddress } from "./user";
import { CartItem } from "./product";

// Order types matching WooCommerce API
export interface Order {
    id: number;
    order_key: string;
    status: OrderStatus;
    currency: string;
    total: string;
    subtotal: string;
    shipping_total: string;
    tax_total: string;
    discount_total: string;
    billing: BillingAddress;
    shipping: BillingAddress;
    line_items: OrderLineItem[];
    payment_method: string;
    payment_method_title: string;
    date_created: string;
    date_modified: string;
    customer_id: number;
    customer_note: string;
}

export type OrderStatus =
    | "pending"
    | "processing"
    | "on-hold"
    | "completed"
    | "cancelled"
    | "refunded"
    | "failed";

export interface OrderLineItem {
    id: number;
    name: string;
    product_id: number;
    quantity: number;
    subtotal: string;
    total: string;
    price: number;
    image: {
        id: number;
        src: string;
    };
}

export interface CreateOrderData {
    items: CartItem[];
    billing: BillingAddress;
    notes?: string;
}

export interface CreateOrderResponse {
    success: boolean;
    order_id?: number;
    order_key?: string;
    checkout_url?: string;
    total?: string;
    message?: string;
}
