"use client";

import { ProductCard } from "@/components/organisms/product-card";
import { LoadingCard } from "@/components/atoms/spinner";
import { Product } from "@/types";
import { cn } from "@/lib/utils";

interface ProductGridProps {
    products: Product[];
    isLoading?: boolean;
    columns?: 2 | 3 | 4;
    className?: string;
}

export function ProductGrid({
    products,
    isLoading = false,
    columns = 4,
    className,
}: ProductGridProps) {
    const gridClasses = {
        2: "grid-cols-1 sm:grid-cols-2",
        3: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
        4: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4",
    };

    if (isLoading) {
        return (
            <div className={cn("grid gap-6", gridClasses[columns], className)}>
                {Array.from({ length: columns * 2 }).map((_, i) => (
                    <LoadingCard key={i} />
                ))}
            </div>
        );
    }

    if (products.length === 0) {
        return (
            <div className="text-center py-12">
                <p className="text-muted-foreground">No products found.</p>
            </div>
        );
    }

    return (
        <div className={cn("grid gap-6", gridClasses[columns], className)}>
            {products.map((product) => (
                <ProductCard key={product.id} product={product} />
            ))}
        </div>
    );
}
