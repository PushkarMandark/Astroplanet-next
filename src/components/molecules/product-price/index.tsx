import React from "react";
import { Badge } from "@/components/ui/badge";
import { FREE_SHIPPING_THRESHOLD } from "@/lib/constants";

interface ProductPriceProps {
    price: string | number;
    regularPrice?: string | number;
    hasDiscount: boolean;
}

export function ProductPrice({ price, regularPrice, hasDiscount }: ProductPriceProps) {
    const mainPrice = typeof price === "string" ? parseFloat(price) : price;
    const basePrice = typeof regularPrice === "string" ? parseFloat(regularPrice) : regularPrice;
    const discountPercent = hasDiscount && basePrice ? Math.round(((basePrice - mainPrice) / basePrice) * 100) : 0;

    return (
        <div className="rounded-xl border border-gray-100 bg-linear-to-r from-primary/3 to-accent/5 p-5">
            <div className="flex items-baseline flex-wrap gap-3">
                <span className="text-3xl sm:text-4xl font-bold text-gray-900">
                    ₹{mainPrice.toLocaleString("en-IN")}
                </span>
                {hasDiscount && basePrice && (
                    <>
                        <span className="text-lg text-gray-400 line-through">
                            ₹{basePrice.toLocaleString("en-IN")}
                        </span>
                        <Badge className="bg-green-600 text-white border-0 text-xs font-bold px-2 py-0.5">
                            {discountPercent}% OFF
                        </Badge>
                    </>
                )}
            </div>
            {hasDiscount && basePrice && (
                <p className="text-sm font-medium text-green-700 mt-1.5">
                    You save ₹{(basePrice - mainPrice).toLocaleString("en-IN")}
                </p>
            )}
            <p className="text-xs text-gray-500 mt-2">
                Inclusive of all taxes. Free shipping above ₹{FREE_SHIPPING_THRESHOLD.toLocaleString("en-IN")}.
            </p>
        </div>
    );
}
