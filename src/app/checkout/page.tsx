"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { ArrowLeft, Loader2 } from "lucide-react";
import { MainLayout } from "@/components/templates/main-layout";
import { CartItem } from "@/components/molecules/cart-item";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useCartStore, useAuthStore } from "@/stores";
import { formatPrice, WP_URL } from "@/lib/api/client";
import { FREE_SHIPPING_THRESHOLD, FLAT_SHIPPING_RATE } from "@/lib/constants";
import { toast } from "sonner";

const checkoutSchema = z.object({
    firstName: z.string().min(1, "First name is required"),
    lastName: z.string().min(1, "Last name is required"),
    email: z.string().email("Invalid email address"),
    phone: z
        .string()
        .regex(/^[6-9]\d{9}$/, "Enter a valid 10-digit Indian mobile number"),
    address: z.string().min(5, "Address is required"),
    city: z.string().min(2, "City is required"),
    state: z.string().min(2, "State is required"),
    postcode: z
        .string()
        .regex(/^\d{6}$/, "Enter a valid 6-digit PIN code"),
    notes: z.string().optional(),
});

type CheckoutFormData = z.infer<typeof checkoutSchema>;

export default function CheckoutPage() {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const router = useRouter();
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

    // Fetch user's saved address - check localStorage first, then WordPress
    useEffect(() => {
        const controller = new AbortController();

        const fetchUserAddress = async () => {
            // First check localStorage for saved address
            const savedAddress = localStorage.getItem('checkoutAddress');
            if (savedAddress) {
                try {
                    const parsed = JSON.parse(savedAddress);
                    reset({
                        firstName: parsed.firstName || "",
                        lastName: parsed.lastName || "",
                        email: parsed.email || "",
                        phone: parsed.phone || "",
                        address: parsed.address || "",
                        city: parsed.city || "",
                        state: parsed.state || "",
                        postcode: parsed.postcode || "",
                        notes: "",
                    });
                    setIsLoading(false);
                    return; // Use saved address from localStorage
                } catch {
                    // Ignore malformed localStorage data
                }
            }

            // If logged in and no localStorage, try WordPress
            if (user && token) {
                try {
                    const response = await fetch(
                        `${WP_URL}/wp-json/astroeshop/v1/user-address`,
                        {
                            signal: controller.signal,
                            headers: {
                                Authorization: `Bearer ${token}`,
                                "Content-Type": "application/json",
                            },
                        }
                    );

                    if (response.ok) {
                        const addressData = await response.json();

                        if (addressData.billing && addressData.billing.first_name) {
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
                            setIsLoading(false);
                            return;
                        }
                    }
                } catch (error) {
                    if ((error as Error).name === "AbortError") return;
                }

                // Pre-fill with basic user info if no saved address
                reset((current) => ({
                    ...current,
                    firstName: current.firstName || user.displayName?.split(" ")[0] || "",
                    lastName: current.lastName || user.displayName?.split(" ").slice(1).join(" ") || "",
                    email: current.email || user.email || "",
                }));
            }
            setIsLoading(false);
        };

        fetchUserAddress();
        return () => controller.abort();
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

        try {
            // Call WordPress PHP endpoint for order creation
            const response = await fetch(`${WP_URL}/wp-json/astroeshop/v1/create-order`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    items: items.map(item => ({
                        product_id: item.id,
                        quantity: item.quantity,
                    })),
                    billing: {
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
                    customer_note: data.notes || "",
                }),
            });

            const result = await response.json();

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

                // Save order info to localStorage for tracking
                localStorage.setItem('pendingOrder', JSON.stringify({
                    order_id: result.order_id,
                    order_key: result.order_key,
                    total: result.total,
                    created_at: new Date().toISOString(),
                }));

                // Save address to localStorage for future checkouts
                localStorage.setItem('checkoutAddress', JSON.stringify({
                    firstName: data.firstName,
                    lastName: data.lastName,
                    email: data.email,
                    phone: data.phone,
                    address: data.address,
                    city: data.city,
                    state: data.state,
                    postcode: data.postcode,
                }));

                clearCart();
                // Redirect to WooCommerce payment page
                window.location.href = result.checkout_url;
            } else {
                toast.error(result.message || "Failed to create order");
            }
        } catch (error) {
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
                                <Card className="py-4">
                                    <CardHeader>
                                        <CardTitle>Billing Details</CardTitle>
                                    </CardHeader>
                                    <CardContent className="space-y-4">
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                            <div className="space-y-2">
                                                <Label htmlFor="firstName">First Name *</Label>
                                                <Input
                                                    id="firstName"
                                                    {...register("firstName")}
                                                    className={errors.firstName ? "border-destructive" : ""}
                                                />
                                                {errors.firstName && (
                                                    <p className="text-sm text-destructive">
                                                        {errors.firstName.message}
                                                    </p>
                                                )}
                                            </div>
                                            <div className="space-y-2">
                                                <Label htmlFor="lastName">Last Name *</Label>
                                                <Input
                                                    id="lastName"
                                                    {...register("lastName")}
                                                    className={errors.lastName ? "border-destructive" : ""}
                                                />
                                                {errors.lastName && (
                                                    <p className="text-sm text-destructive">
                                                        {errors.lastName.message}
                                                    </p>
                                                )}
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                            <div className="space-y-2">
                                                <Label htmlFor="email">Email *</Label>
                                                <Input
                                                    id="email"
                                                    type="email"
                                                    {...register("email")}
                                                    className={errors.email ? "border-destructive" : ""}
                                                />
                                                {errors.email && (
                                                    <p className="text-sm text-destructive">
                                                        {errors.email.message}
                                                    </p>
                                                )}
                                            </div>
                                            <div className="space-y-2">
                                                <Label htmlFor="phone">Phone *</Label>
                                                <Input
                                                    id="phone"
                                                    type="tel"
                                                    {...register("phone")}
                                                    className={errors.phone ? "border-destructive" : ""}
                                                />
                                                {errors.phone && (
                                                    <p className="text-sm text-destructive">
                                                        {errors.phone.message}
                                                    </p>
                                                )}
                                            </div>
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="address">Address *</Label>
                                            <Input
                                                id="address"
                                                {...register("address")}
                                                className={errors.address ? "border-destructive" : ""}
                                            />
                                            {errors.address && (
                                                <p className="text-sm text-destructive">
                                                    {errors.address.message}
                                                </p>
                                            )}
                                        </div>

                                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                            <div className="space-y-2">
                                                <Label htmlFor="city">City *</Label>
                                                <Input
                                                    id="city"
                                                    {...register("city")}
                                                    className={errors.city ? "border-destructive" : ""}
                                                />
                                                {errors.city && (
                                                    <p className="text-sm text-destructive">
                                                        {errors.city.message}
                                                    </p>
                                                )}
                                            </div>
                                            <div className="space-y-2">
                                                <Label htmlFor="state">State *</Label>
                                                <Input
                                                    id="state"
                                                    {...register("state")}
                                                    className={errors.state ? "border-destructive" : ""}
                                                />
                                                {errors.state && (
                                                    <p className="text-sm text-destructive">
                                                        {errors.state.message}
                                                    </p>
                                                )}
                                            </div>
                                            <div className="space-y-2">
                                                <Label htmlFor="postcode">Postcode *</Label>
                                                <Input
                                                    id="postcode"
                                                    {...register("postcode")}
                                                    className={errors.postcode ? "border-destructive" : ""}
                                                />
                                                {errors.postcode && (
                                                    <p className="text-sm text-destructive">
                                                        {errors.postcode.message}
                                                    </p>
                                                )}
                                            </div>
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="notes">Order Notes (Optional)</Label>
                                            <Textarea
                                                id="notes"
                                                {...register("notes")}
                                                placeholder="Any special instructions..."
                                                rows={3}
                                            />
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>

                            {/* Order Summary */}
                            <div>
                                <Card className="sticky top-24 py-4">
                                    <CardHeader>
                                        <CardTitle>Order Summary</CardTitle>
                                    </CardHeader>
                                    <CardContent className="space-y-4">
                                        {items.map((item) => (
                                            <div key={item.id} className="flex justify-between text-sm">
                                                <span>
                                                    {item.name} × {item.quantity}
                                                </span>
                                                <span>{formatPrice(item.price * item.quantity)}</span>
                                            </div>
                                        ))}

                                        <Separator />

                                        <div className="flex justify-between">
                                            <span className="text-muted-foreground">Subtotal</span>
                                            <span>{formatPrice(subtotal)}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-muted-foreground">Shipping</span>
                                            <span>
                                                {shipping === 0 ? (
                                                    <span className="text-green-600">FREE</span>
                                                ) : (
                                                    formatPrice(shipping)
                                                )}
                                            </span>
                                        </div>

                                        <Separator />

                                        <div className="flex justify-between font-bold text-lg">
                                            <span>Total</span>
                                            <span>{formatPrice(total)}</span>
                                        </div>
                                    </CardContent>
                                    <CardFooter>
                                        <Button
                                            type="submit"
                                            className="w-full"
                                            size="lg"
                                            disabled={isSubmitting}
                                        >
                                            {isSubmitting ? (
                                                <>
                                                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                                                    Processing...
                                                </>
                                            ) : (
                                                "Proceed to Payment"
                                            )}
                                        </Button>
                                    </CardFooter>
                                </Card>
                            </div>
                        </div>
                    </form>
                </div>
            </section>
        </MainLayout>
    );
}
