"use client";

import Link from "next/link";
import { Trash2, ArrowRight, ShoppingBag } from "lucide-react";
import { MainLayout } from "@/components/templates/main-layout";
import { CartItem } from "@/components/molecules/cart-item";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useCartStore } from "@/stores";
import { formatPrice } from "@/lib/api/client";
import { FREE_SHIPPING_THRESHOLD, FLAT_SHIPPING_RATE } from "@/lib/constants";

export default function CartPage() {
    const { items, updateQuantity, removeItem, clearCart, getSubtotal } =
        useCartStore();

    const subtotal = getSubtotal();
    const shipping = subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : FLAT_SHIPPING_RATE;
    const total = subtotal + shipping;

    if (items.length === 0) {
        return (
            <MainLayout>
                <section className="py-20">
                    <div className="container mx-auto px-4 text-center">
                        <ShoppingBag className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
                        <h1 className="text-2xl font-bold font-heading mb-2">
                            Your Cart is Empty
                        </h1>
                        <p className="text-muted-foreground mb-6">
                            Looks like you haven&apos;t added anything to your cart yet.
                        </p>
                        <Button asChild>
                            <Link href="/shop">
                                Continue Shopping
                                <ArrowRight className="ml-2 h-4 w-4" />
                            </Link>
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
                    <h1 className="text-3xl font-bold font-heading">Shopping Cart</h1>
                </div>
            </section>

            <section className="py-8">
                <div className="container mx-auto px-4">
                    <div className="flex flex-col lg:flex-row gap-8">
                        {/* Cart Items */}
                        <div className="flex-1">
                            <div className="flex items-center justify-between mb-4">
                                <p className="text-muted-foreground">
                                    {items.length} item{items.length !== 1 ? "s" : ""} in cart
                                </p>
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={clearCart}
                                    className="text-destructive hover:text-destructive"
                                >
                                    <Trash2 className="h-4 w-4 mr-2" />
                                    Clear Cart
                                </Button>
                            </div>

                            <Card className="py-4">
                                <CardContent className="p-4">
                                    {items.map((item) => (
                                        <CartItem
                                            key={item.id}
                                            item={item}
                                            onUpdateQuantity={updateQuantity}
                                            onRemove={removeItem}
                                        />
                                    ))}
                                </CardContent>
                            </Card>

                            <div className="mt-4">
                                <Button asChild variant="outline">
                                    <Link href="/shop">
                                        <ArrowRight className="h-4 w-4 mr-2 rotate-180" />
                                        Continue Shopping
                                    </Link>
                                </Button>
                            </div>
                        </div>

                        {/* Order Summary */}
                        <div className="w-full lg:w-80">
                            <Card className="sticky top-24 py-4">
                                <CardHeader>
                                    <CardTitle>Order Summary</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
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
                                    {subtotal < FREE_SHIPPING_THRESHOLD && (
                                        <p className="text-xs text-muted-foreground">
                                            Add {formatPrice(FREE_SHIPPING_THRESHOLD - subtotal)} more for free shipping
                                        </p>
                                    )}
                                    <Separator />
                                    <div className="flex justify-between font-bold text-lg">
                                        <span>Total</span>
                                        <span>{formatPrice(total)}</span>
                                    </div>
                                </CardContent>
                                <CardFooter>
                                    <Button asChild className="w-full" size="lg">
                                        <Link href="/checkout">
                                            Proceed to Checkout
                                            <ArrowRight className="ml-2 h-4 w-4" />
                                        </Link>
                                    </Button>
                                </CardFooter>
                            </Card>
                        </div>
                    </div>
                </div>
            </section>
        </MainLayout>
    );
}
