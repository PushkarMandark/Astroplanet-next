"use client";

import { useState, useTransition } from "react";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Product } from "@/types";
import { ProductCard } from "@/components/organisms/product-card";
import { cn } from "@/lib/utils";

interface ProductGridWithLoadMoreProps {
    initialProducts: Product[];
    totalProducts: number;
    perPage?: number;
    categoryId?: number;
    columns?: 2 | 3 | 4;
    className?: string;
}

export function ProductGridWithLoadMore({
    initialProducts,
    totalProducts,
    perPage = 12,
    categoryId,
    columns = 3,
    className,
}: ProductGridWithLoadMoreProps) {
    const [products, setProducts] = useState<Product[]>(initialProducts);
    const [page, setPage] = useState(1);
    const [isPending, startTransition] = useTransition();

    const hasMore = products.length < totalProducts;

    const gridClasses = {
        2: "grid-cols-1 sm:grid-cols-2",
        3: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
        4: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4",
    };

    const loadMore = async () => {
        startTransition(async () => {
            try {
                const nextPage = page + 1;
                const params = new URLSearchParams({
                    page: String(nextPage),
                    per_page: String(perPage),
                });
                if (categoryId) {
                    params.append("category", String(categoryId));
                }

                const response = await fetch(`/api/products?${params.toString()}`);

                if (response.ok) {
                    const newProducts: Product[] = await response.json();
                    setProducts((prev) => [...prev, ...newProducts]);
                    setPage(nextPage);
                }
            } catch (error) {
                console.error("Failed to load more products:", error);
            }
        });
    };

    return (
        <div className={className}>
            {/* Products Grid */}
            <div className={cn("grid gap-6", gridClasses[columns])}>
                {products.map((product) => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>

            {/* Load More Button */}
            {hasMore && (
                <div className="text-center mt-12">
                    <Button
                        onClick={loadMore}
                        disabled={isPending}
                        size="lg"
                        variant="outline"
                        className="min-w-[200px]"
                    >
                        {isPending ? (
                            <>
                                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                                Loading...
                            </>
                        ) : (
                            <>
                                Load More Products
                                <span className="ml-2 text-muted-foreground">
                                    ({products.length} of {totalProducts})
                                </span>
                            </>
                        )}
                    </Button>
                </div>
            )}

            {/* End of Results */}
            {!hasMore && products.length > 0 && (
                <p className="text-center text-muted-foreground mt-8">
                    Showing all {products.length} products
                </p>
            )}
        </div>
    );
}
