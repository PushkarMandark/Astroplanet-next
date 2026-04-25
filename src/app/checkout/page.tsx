"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft } from "lucide-react";
import { MainLayout } from "@/components/templates/main-layout";
import { Button } from "@/components/ui/button";
import { useCartStore, useAuthStore, useCheckoutStore } from "@/stores";
import { WP_URL } from "@/lib/api/client";
import { createOrder, getUserAddress } from "@/lib/api/checkout";
import { FREE_SHIPPING_THRESHOLD, FLAT_SHIPPING_RATE } from "@/lib/constants";
import { toast } from "sonner";
import { checkoutSchema, CheckoutFormData } from "@/lib/validations/checkout";
import { CheckoutFormFields } from "@/components/checkout/checkout-form-fields";
import { OrderSummary } from "@/components/checkout/order-summary";

export default function CheckoutPage() {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const { items, getSubtotal, clearCart } = useCartStore();
    const { user, token } = useAuthStore();

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<CheckoutFormData>({
        resolver: zodResolver(checkoutSchema),
    });

    const {
        savedAddress,
        setSavedAddress,
        setPendingOrder,
        idempotencyKey,
        setIdempotencyKey,
        clearIdempotencyKey,
    } = useCheckoutStore();

    // Fetch user's saved address - check Zustand first, then WordPress
    useEffect(() => {
        let cancelled = false;

        const fetchUserAddress = async () => {
            // First check Zustand store for saved address
            if (savedAddress) {
                reset({
                    firstName: savedAddress.firstName || "",
                    lastName: savedAddress.lastName || "",
                    email: savedAddress.email || "",
                    phone: savedAddress.phone || "",
                    address: savedAddress.address || "",
                    city: savedAddress.city || "",
                    state: savedAddress.state || "",
                    postcode: savedAddress.postcode || "",
                    notes: "",
                });

                return;
            }

            // If logged in and no localStorage, try WordPress
            if (user && token) {
                const addressData = await getUserAddress(token);

                if (cancelled) return;

                if (addressData?.billing?.first_name) {
                    reset({
                        firstName: addressData.billing.first_name || "",
                        lastName: addressData.billing.last_name || "",
                        email: addressData.billing.email || user.email || "",
                        phone: addressData.billing.phone || "",
                        address: addressData.billing.address_1 || "",
                        city: addressData.billing.city || "",
                        state: addressData.billing.state || "",
                        postcode: addressData.billing.postcode || "",
                        notes: "",
                    });
    
                    return;
                }

                // Pre-fill with basic user info if no saved address
                reset((current) => ({
                    ...current,
                    firstName: current.firstName || user.displayName?.split(" ")[0] || "",
                    lastName: current.lastName || user.displayName?.split(" ").slice(1).join(" ") || "",
                    email: current.email || user.email || "",
                }));
            }
        };

        fetchUserAddress();
        return () => { cancelled = true; };
    }, [user, token, reset]);

    const subtotal = getSubtotal();
    const shipping = subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : FLAT_SHIPPING_RATE;
    const total = subtotal + shipping;

    const onSubmit = async (data: CheckoutFormData) => {
        if (items.length === 0) {
            toast.error("Your cart is empty");
            return;
        }

        setIsSubmitting(true);

        // Reuse an existing idempotency key across retries; only generate a new
        // one for the first Pay attempt of this checkout session. The key is
        // cleared after a successful order is created.
        let key = idempotencyKey;
        if (!key) {
            key =
                typeof crypto !== "undefined" && typeof crypto.randomUUID === "function"
                    ? crypto.randomUUID()
                    : `${Date.now()}-${Math.random().toString(36).slice(2)}`;
            setIdempotencyKey(key);
        }

        try {
            const result = await createOrder(
                items,
                {
                    first_name: data.firstName,
                    last_name: data.lastName,
                    email: data.email,
                    phone: data.phone,
                    address_1: data.address,
                    city: data.city,
                    state: data.state,
                    postcode: data.postcode,
                    country: "IN",
                },
                data.notes || "",
                key
            );

            if (result.success && result.checkout_url) {
                // Validate the redirect URL is from our expected backend domain
                try {
                    const redirectUrl = new URL(result.checkout_url);
                    const expectedHost = new URL(WP_URL).host;
                    if (redirectUrl.host !== expectedHost) {
                        toast.error("Invalid payment URL received. Please contact support.");
                        return;
                    }
                } catch {
                    toast.error("Invalid payment URL received. Please contact support.");
                    return;
                }

                // Save order info to store for tracking
                setPendingOrder({
                    order_id: result.order_id!,
                    order_key: result.order_key!,
                    total: result.total!,
                    created_at: new Date().toISOString(),
                });

                // Save address to store for future checkouts
                setSavedAddress({
                    firstName: data.firstName,
                    lastName: data.lastName,
                    email: data.email,
                    phone: data.phone,
                    address: data.address,
                    city: data.city,
                    state: data.state,
                    postcode: data.postcode,
                });

                clearCart();
                // Order successfully created — clear the idempotency key so the
                // next checkout session starts fresh.
                clearIdempotencyKey();
                // Redirect to WooCommerce payment page
                window.location.href = result.checkout_url;
            } else {
                toast.error(result.message || "Failed to create order");
            }
        } catch {
            toast.error("An error occurred. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    if (items.length === 0) {
        return (
            <MainLayout>
                <section className="py-20">
                    <div className="container mx-auto px-4 text-center">
                        <h1 className="text-2xl font-bold font-heading mb-4">
                            Your cart is empty
                        </h1>
                        <p className="text-muted-foreground mb-6">
                            Add some products to proceed with checkout.
                        </p>
                        <Button asChild>
                            <Link href="/shop">Continue Shopping</Link>
                        </Button>
                    </div>
                </section>
            </MainLayout>
        );
    }

    return (
        <MainLayout>
            {/* Page Header */}
            <section className="bg-primary text-primary-foreground py-8">
                <div className="container mx-auto px-4">
                    <h1 className="text-3xl font-bold font-heading">Checkout</h1>
                </div>
            </section>

            <section className="py-8">
                <div className="container mx-auto px-4">
                    <Link
                        href="/cart"
                        className="inline-flex items-center text-sm text-muted-foreground hover:text-primary mb-6"
                    >
                        <ArrowLeft className="h-4 w-4 mr-2" />
                        Back to Cart
                    </Link>

                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                            {/* Billing Form */}
                            <div className="lg:col-span-2 space-y-6">
                                <CheckoutFormFields register={register} errors={errors} />
                            </div>

                            {/* Order Summary */}
                            <div>
                                <OrderSummary
                                    items={items}
                                    subtotal={subtotal}
                                    shipping={shipping}
                                    total={total}
                                    isSubmitting={isSubmitting}
                                />
                            </div>
                        </div>
                    </form>
                </div>
            </section>
        </MainLayout>
    );
}
