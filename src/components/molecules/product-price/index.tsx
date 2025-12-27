import React from "react";
import { Badge } from "@/components/ui/badge";

interface ProductPriceProps {
    price: string | number;
    regularPrice?: string | number;
    hasDiscount: boolean;
}

export function ProductPrice({ price, regularPrice, hasDiscount }: ProductPriceProps) {
    const mainPrice = typeof price === "string" ? parseFloat(price) : price;
    const basePrice = typeof regularPrice === "string" ? parseFloat(regularPrice) : regularPrice;

    return (
        <div className="bg-gradient-to-r from-primary/5 to-accent/5 rounded-2xl p-6">
            <div className="flex items-end gap-4 mb-2">
                <span className="text-4xl font-bold text-primary">
                    ₹{mainPrice.toLocaleString('en-IN')}
                </span>
                {hasDiscount && basePrice && (
                    <span className="text-xl text-gray-400 line-through">
                        ₹{basePrice.toLocaleString('en-IN')}
                    </span>
                )}
                {hasDiscount && basePrice && (
                    <Badge className="bg-green-100 text-green-700 border-0">
                        Save ₹{(basePrice - mainPrice).toLocaleString('en-IN')}
                    </Badge>
                )}
            </div>
            <p className="text-sm text-muted-foreground">Inclusive of all taxes. Free shipping above ₹999.</p>
        </div>
    );
}
