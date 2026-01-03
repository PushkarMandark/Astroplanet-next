"use client";

import { useState, useMemo } from "react";
import { Product } from "@/types";
import { ProductCard } from "@/components/organisms/product-card";
import { Pagination } from "@/components/molecules/pagination";
import { cn } from "@/lib/utils";

interface PaginatedProductGridProps {
    products: Product[];
    perPage?: number;
    columns?: 2 | 3 | 4;
    className?: string;
}

export function PaginatedProductGrid({
    products,
    perPage = 12,
    columns = 3,
    className,
}: PaginatedProductGridProps) {
    const [currentPage, setCurrentPage] = useState(1);

    const totalProducts = products.length;
    const totalPages = Math.ceil(totalProducts / perPage);

    // Get products for current page
    const paginatedProducts = useMemo(() => {
        const startIndex = (currentPage - 1) * perPage;
        const endIndex = startIndex + perPage;
        return products.slice(startIndex, endIndex);
    }, [products, currentPage, perPage]);

    // Calculate display range
    const startIndex = (currentPage - 1) * perPage + 1;
    const endIndex = Math.min(currentPage * perPage, totalProducts);

    const gridClasses = {
        2: "grid-cols-1 sm:grid-cols-2",
        3: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
        4: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4",
    };

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
        // Scroll to top of grid
        window.scrollTo({ top: 300, behavior: "smooth" });
    };

    return (
        <div className={className}>
            {/* Results Info */}
            {totalProducts > 0 && (
                <p className="text-muted-foreground mb-6">
                    Showing {startIndex}-{endIndex} of {totalProducts} products
                </p>
            )}

            {/* Products Grid */}
            <div className={cn("grid gap-6", gridClasses[columns])}>
                {paginatedProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
                <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={handlePageChange}
                    className="mt-12"
                />
            )}
        </div>
    );
}
