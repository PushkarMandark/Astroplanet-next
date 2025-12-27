"use client";

import Link from "next/link";
import { X } from "lucide-react";
import { OptimizedImage } from "@/components/atoms/image";
import { Price } from "@/components/atoms/price";
import { QuantitySelector } from "@/components/molecules/quantity-selector";
import { Button } from "@/components/ui/button";
import { CartItem as CartItemType } from "@/types";
import { cn } from "@/lib/utils";

interface CartItemProps {
    item: CartItemType;
    onUpdateQuantity: (id: number, quantity: number) => void;
    onRemove: (id: number) => void;
    className?: string;
}

export function CartItem({
    item,
    onUpdateQuantity,
    onRemove,
    className,
}: CartItemProps) {
    return (
        <div
            className={cn(
                "flex gap-4 py-4 border-b last:border-b-0",
                className
            )}
        >
            {/* Product Image */}
            <Link
                href={`/product/${item.slug || item.id}`}
                className="relative w-20 h-20 rounded-md overflow-hidden flex-shrink-0"
            >
                <OptimizedImage
                    src={item.image}
                    alt={item.name}
                    fill
                    objectFit="cover"
                />
            </Link>

            {/* Product Details */}
            <div className="flex-1 min-w-0">
                <Link
                    href={`/product/${item.slug || item.id}`}
                    className="font-medium hover:text-primary line-clamp-2"
                >
                    {item.name}
                </Link>

                <Price amount={item.price} size="sm" className="mt-1" />

                <div className="flex items-center justify-between mt-2">
                    <QuantitySelector
                        value={item.quantity}
                        onChange={(qty) => onUpdateQuantity(item.id, qty)}
                    />

                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => onRemove(item.id)}
                        className="text-muted-foreground hover:text-destructive"
                    >
                        <X className="h-4 w-4" />
                    </Button>
                </div>
            </div>
        </div>
    );
}
