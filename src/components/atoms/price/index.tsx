"use client";

import { formatPrice } from "@/lib/api/client";
import { cn } from "@/lib/utils";

interface PriceProps {
    amount: number | string;
    originalPrice?: number | string;
    size?: "sm" | "md" | "lg";
    className?: string;
}

export function Price({
    amount,
    originalPrice,
    size = "md",
    className,
}: PriceProps) {
    const hasDiscount = originalPrice && Number(originalPrice) > Number(amount);

    const sizeClasses = {
        sm: "text-sm",
        md: "text-lg",
        lg: "text-2xl font-bold",
    };

    return (
        <div className={cn("flex items-center gap-2", className)}>
            <span
                className={cn(
                    "font-semibold text-primary",
                    sizeClasses[size]
                )}
            >
                {formatPrice(amount)}
            </span>
            {hasDiscount && (
                <span className="text-sm text-muted-foreground line-through">
                    {formatPrice(originalPrice)}
                </span>
            )}
        </div>
    );
}

export function DiscountBadge({
    originalPrice,
    salePrice,
    className,
}: {
    originalPrice: number | string;
    salePrice: number | string;
    className?: string;
}) {
    const original = Number(originalPrice);
    const sale = Number(salePrice);

    if (!original || !sale || original <= sale) return null;

    const discount = Math.round(((original - sale) / original) * 100);

    return (
        <span
            className={cn(
                "inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-accent text-accent-foreground",
                className
            )}
        >
            {discount}% OFF
        </span>
    );
}
