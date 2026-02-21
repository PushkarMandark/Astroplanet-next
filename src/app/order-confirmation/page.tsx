"use client";

import { Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { CheckCircle, Package, ArrowRight, Home, Truck, Phone, Copy, Check } from "lucide-react";
import { MainLayout } from "@/components/templates/main-layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { siteConfig } from "@/config/site";
import { useEffect, useState } from "react";
import { useCartStore } from "@/stores";

function OrderConfirmationContent() {
    const searchParams = useSearchParams();
    const urlOrderId = searchParams.get("order_id");
    const status = searchParams.get("status");
    const clearCart = useCartStore((state) => state.clearCart);
    const [copied, setCopied] = useState(false);
    const [orderId, setOrderId] = useState<string | null>(urlOrderId);

    // Check localStorage for pending order if no order_id in URL
    useEffect(() => {
        if (!urlOrderId) {
            const pendingOrder = localStorage.getItem('pendingOrder');
            if (pendingOrder) {
                try {
                    const order = JSON.parse(pendingOrder);
                    setOrderId(order.order_id?.toString());
                    // Clear pending order after showing
                    localStorage.removeItem('pendingOrder');
                } catch {
                    // Ignore malformed localStorage data
                }
            }
        }
    }, [urlOrderId]);

    // Clear cart on successful order
    useEffect(() => {
        if (status === "success") {
            clearCart();
            // Also clear pending order
            localStorage.removeItem('pendingOrder');
        }
    }, [status, clearCart]);

    const copyOrderId = () => {
        if (orderId) {
            navigator.clipboard.writeText(orderId);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        }
    };

    return (
        <MainLayout>
            <section className="py-20 bg-gradient-to-b from-green-50 to-white dark:from-green-950/20 dark:to-background">
                <div className="container mx-auto px-4">
                    <div className="max-w-2xl mx-auto text-center">
                        {/* Success Icon */}
                        <div className="w-24 h-24 mx-auto mb-8 rounded-full bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center shadow-lg animate-bounce-slow">
                            <CheckCircle className="h-14 w-14 text-white" />
                        </div>

                        {/* Success Message */}
                        <h1 className="text-4xl md:text-5xl font-bold font-heading text-green-700 dark:text-green-400 mb-4">
                            Order Confirmed!
                        </h1>
                        <p className="text-xl text-gray-600 dark:text-gray-400 mb-8">
                            Thank you for your purchase. Your cosmic journey is about to begin!
                        </p>

                        {/* Order Info Card */}
                        <Card className="mb-8 border-0 shadow-lg">
                            <CardContent className="p-8">
                                {/* Order ID Display */}
                                {orderId && (
                                    <div className="mb-6 p-4 rounded-lg bg-green-50 dark:bg-green-950/30 border border-green-200 dark:border-green-900">
                                        <p className="text-sm text-muted-foreground mb-1">Order Number</p>
                                        <div className="flex items-center justify-center gap-3">
                                            <span className="text-2xl font-bold text-green-700 dark:text-green-400">
                                                #{orderId}
                                            </span>
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                onClick={copyOrderId}
                                                className="h-8 w-8 p-0"
                                            >
                                                {copied ? (
                                                    <Check className="h-4 w-4 text-green-600" />
                                                ) : (
                                                    <Copy className="h-4 w-4" />
                                                )}
                                            </Button>
                                        </div>
                                    </div>
                                )}

                                <div className="flex items-center justify-center gap-3 mb-6">
                                    <Package className="h-6 w-6 text-primary" />
                                    <span className="text-lg font-semibold">What&apos;s Next?</span>
                                </div>

                                <p className="text-muted-foreground mb-6">
                                    You will receive an order confirmation email with your order details and tracking information shortly.
                                </p>

                                <Separator className="my-6" />

                                {/* Next Steps */}
                                <div className="grid gap-4 text-left">
                                    <div className="flex items-start gap-4 p-4 rounded-lg bg-muted/50">
                                        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                                            <Truck className="h-5 w-5 text-primary" />
                                        </div>
                                        <div>
                                            <h4 className="font-semibold mb-1">Shipping Update</h4>
                                            <p className="text-sm text-muted-foreground">
                                                Your order will be shipped within 1-2 business days. Track your order in your account dashboard.
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-4 p-4 rounded-lg bg-muted/50">
                                        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                                            <Phone className="h-5 w-5 text-primary" />
                                        </div>
                                        <div>
                                            <h4 className="font-semibold mb-1">Need Help?</h4>
                                            <p className="text-sm text-muted-foreground">
                                                Contact us at{" "}
                                                <a href={`tel:${siteConfig.contact.phone.replace(/\s/g, '')}`} className="text-primary hover:underline">
                                                    {siteConfig.contact.phone}
                                                </a>
                                                {" "}or{" "}
                                                <a href={`mailto:${siteConfig.contact.email}`} className="text-primary hover:underline">
                                                    {siteConfig.contact.email}
                                                </a>
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Action Buttons */}
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                            <Button asChild size="lg" className="bg-gradient-to-r from-primary to-primary/80">
                                <Link href="/orders">
                                    <Package className="h-5 w-5 mr-2" />
                                    View My Orders
                                </Link>
                            </Button>
                            <Button asChild size="lg" variant="outline">
                                <Link href="/">
                                    <Home className="h-5 w-5 mr-2" />
                                    Back to Home
                                </Link>
                            </Button>
                        </div>

                        {/* Continue Shopping */}
                        <div className="mt-8">
                            <Link
                                href="/shop"
                                className="inline-flex items-center text-primary hover:underline font-medium"
                            >
                                Continue Shopping
                                <ArrowRight className="h-4 w-4 ml-1" />
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </MainLayout>
    );
}

export default function OrderConfirmationPage() {
    return (
        <Suspense fallback={
            <MainLayout>
                <section className="py-20">
                    <div className="container mx-auto px-4 text-center">
                        <div className="animate-pulse">
                            <div className="w-24 h-24 mx-auto mb-8 rounded-full bg-gray-200" />
                            <div className="h-10 w-64 mx-auto mb-4 bg-gray-200 rounded" />
                            <div className="h-6 w-96 mx-auto bg-gray-200 rounded" />
                        </div>
                    </div>
                </section>
            </MainLayout>
        }>
            <OrderConfirmationContent />
        </Suspense>
    );
}

