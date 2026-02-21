"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ShoppingBag, Trash2, ArrowRight, LogIn, Minus, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { OptimizedImage } from "@/components/atoms/image";
import { useCartStore, useAuthStore } from "@/stores";
import { formatPrice } from "@/lib/api/client";
import { FREE_SHIPPING_THRESHOLD, FLAT_SHIPPING_RATE } from "@/lib/constants";
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetFooter,
    SheetClose,
} from "@/components/ui/sheet";

interface CartSidebarProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

export function CartSidebar({ open, onOpenChange }: CartSidebarProps) {
    const [mounted, setMounted] = useState(false);
    const { items, updateQuantity, removeItem, getSubtotal } = useCartStore();
    const isAuthenticated = useAuthStore((state) => state.isAuthenticated());

    useEffect(() => {
        setMounted(true);
    }, []);

    const subtotal = getSubtotal();
    const shipping = subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : FLAT_SHIPPING_RATE;
    const total = subtotal + shipping;

    return (
        <Sheet open={open} onOpenChange={onOpenChange}>
            <SheetContent side="right" className="w-full sm:max-w-md flex flex-col">
                <SheetHeader className="border-b pb-4">
                    <SheetTitle className="flex items-center gap-2 text-xl">
                        <ShoppingBag className="h-5 w-5" />
                        Your Cart
                        {items.length > 0 && (
                            <span className="text-sm font-normal text-muted-foreground">
                                ({items.length} {items.length === 1 ? "item" : "items"})
                            </span>
                        )}
                    </SheetTitle>
                </SheetHeader>

                {items.length === 0 ? (
                    /* Empty Cart */
                    <div className="flex-1 flex flex-col items-center justify-center text-center p-6">
                        <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center mb-4">
                            <ShoppingBag className="h-10 w-10 text-muted-foreground" />
                        </div>
                        <h3 className="text-lg font-semibold mb-2">Your cart is empty</h3>
                        <p className="text-muted-foreground text-sm mb-6">
                            Add some products to get started
                        </p>
                        <SheetClose asChild>
                            <Button asChild>
                                <Link href="/shop">
                                    Browse Products
                                    <ArrowRight className="h-4 w-4 ml-2" />
                                </Link>
                            </Button>
                        </SheetClose>
                    </div>
                ) : (
                    <>
                        {/* Cart Items */}
                        <div className="flex-1 overflow-y-auto py-4 space-y-4">
                            {items.map((item) => (
                                <div key={item.id} className="flex gap-3 p-3 rounded-lg bg-muted/30">
                                    {/* Product Image */}
                                    <Link
                                        href={`/product/${item.slug || item.id}`}
                                        onClick={() => onOpenChange(false)}
                                        className="relative w-20 h-20 rounded-md overflow-hidden flex-shrink-0"
                                    >
                                        <OptimizedImage
                                            src={item.image}
                                            alt={item.name}
                                            fill
                                            objectFit="cover"
                                        />
                                    </Link>

                                    {/* Details */}
                                    <div className="flex-1 min-w-0">
                                        <Link
                                            href={`/product/${item.slug || item.id}`}
                                            onClick={() => onOpenChange(false)}
                                            className="font-medium text-sm hover:text-primary line-clamp-2"
                                        >
                                            {item.name}
                                        </Link>
                                        <p className="text-primary font-semibold text-sm mt-1">
                                            {formatPrice(item.price)}
                                        </p>

                                        {/* Quantity Controls */}
                                        <div className="flex items-center justify-between mt-2">
                                            <div className="flex items-center gap-1">
                                                <Button
                                                    variant="outline"
                                                    size="icon"
                                                    className="h-7 w-7"
                                                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                >
                                                    <Minus className="h-3 w-3" />
                                                </Button>
                                                <span className="w-8 text-center text-sm font-medium">
                                                    {item.quantity}
                                                </span>
                                                <Button
                                                    variant="outline"
                                                    size="icon"
                                                    className="h-7 w-7"
                                                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                >
                                                    <Plus className="h-3 w-3" />
                                                </Button>
                                            </div>
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                className="h-7 w-7 text-muted-foreground hover:text-destructive"
                                                onClick={() => removeItem(item.id)}
                                            >
                                                <Trash2 className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Footer with Totals */}
                        <SheetFooter className="border-t pt-4 flex-col gap-4">
                            {/* Totals */}
                            <div className="w-full space-y-2">
                                <div className="flex justify-between text-sm">
                                    <span className="text-muted-foreground">Subtotal</span>
                                    <span>{formatPrice(subtotal)}</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-muted-foreground">Shipping</span>
                                    <span>
                                        {shipping === 0 ? (
                                            <span className="text-green-600">FREE</span>
                                        ) : (
                                            formatPrice(shipping)
                                        )}
                                    </span>
                                </div>
                                {subtotal < FREE_SHIPPING_THRESHOLD && subtotal > 0 && (
                                    <p className="text-xs text-muted-foreground">
                                        Add {formatPrice(FREE_SHIPPING_THRESHOLD - subtotal)} more for free shipping
                                    </p>
                                )}
                                <Separator />
                                <div className="flex justify-between font-bold text-lg">
                                    <span>Total</span>
                                    <span>{formatPrice(total)}</span>
                                </div>
                            </div>

                            {/* Action Buttons */}
                            {mounted && isAuthenticated ? (
                                <SheetClose asChild>
                                    <Button asChild className="w-full" size="lg">
                                        <Link href="/checkout">
                                            Proceed to Checkout
                                            <ArrowRight className="h-4 w-4 ml-2" />
                                        </Link>
                                    </Button>
                                </SheetClose>
                            ) : (
                                <div className="w-full space-y-3">
                                    <div className="p-3 rounded-lg bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900">
                                        <p className="text-sm text-amber-800 dark:text-amber-200 flex items-center gap-2">
                                            <LogIn className="h-4 w-4 flex-shrink-0" />
                                            Please login to proceed with checkout
                                        </p>
                                    </div>
                                    <SheetClose asChild>
                                        <Button asChild className="w-full" size="lg">
                                            <Link href="/login?redirect=/checkout">
                                                <LogIn className="h-4 w-4 mr-2" />
                                                Login to Checkout
                                            </Link>
                                        </Button>
                                    </SheetClose>
                                </div>
                            )}

                            {/* View Cart Link */}
                            <SheetClose asChild>
                                <Button asChild variant="outline" className="w-full">
                                    <Link href="/cart">View Full Cart</Link>
                                </Button>
                            </SheetClose>
                        </SheetFooter>
                    </>
                )}
            </SheetContent>
        </Sheet>
    );
}
