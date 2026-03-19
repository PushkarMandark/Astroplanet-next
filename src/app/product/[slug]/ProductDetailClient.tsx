"use client";

import React from "react";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { toast } from "sonner";
import { useCartStore } from "@/stores";
import { Product } from "@/types";
import { decodeHtmlEntities } from "@/lib/utils/decode";

// Atomic Organisms
import { ProductImageGallery } from "@/components/organisms/product/ProductImageGallery";
import { ProductInfo } from "@/components/organisms/product/ProductInfo";
import { ProductAbout } from "@/components/organisms/product/ProductAbout";
import { RelatedProducts } from "@/components/organisms/product/RelatedProducts";

interface ProductDetailClientProps {
    product: Product;
    relatedProducts: Product[];
}

export function ProductDetailClient({ product, relatedProducts }: ProductDetailClientProps) {
    const addItem = useCartStore((state) => state.addItem);
    const openCart = useCartStore((state) => state.openCart);

    const handleAddToCart = (quantity: number) => {
        addItem(product, quantity);
        toast.success(`${decodeHtmlEntities(product.name)} added to cart`, {
            description: `Quantity: ${quantity} — ₹${(Number(product.price) * quantity).toLocaleString("en-IN")}`,
            action: {
                label: "View Cart",
                onClick: () => openCart(),
            },
        });
    };

    return (
        <main className="min-h-screen bg-white">
            {/* Breadcrumbs */}
            <nav className="border-b border-gray-100 bg-gray-50/60">
                <div className="container mx-auto px-4 py-3">
                    <ol className="flex items-center gap-1.5 text-sm text-gray-500 overflow-x-auto">
                        <li>
                            <Link href="/" className="hover:text-primary transition-colors whitespace-nowrap">Home</Link>
                        </li>
                        <li><ChevronRight className="h-3.5 w-3.5 text-gray-300" /></li>
                        <li>
                            <Link href="/shop" className="hover:text-primary transition-colors whitespace-nowrap">Shop</Link>
                        </li>
                        {product.categories?.[0] && (
                            <>
                                <li><ChevronRight className="h-3.5 w-3.5 text-gray-300" /></li>
                                <li>
                                    <Link
                                        href={`/shop/${product.categories[0].slug}`}
                                        className="hover:text-primary transition-colors whitespace-nowrap"
                                    >
                                        {decodeHtmlEntities(product.categories[0].name)}
                                    </Link>
                                </li>
                            </>
                        )}
                        <li><ChevronRight className="h-3.5 w-3.5 text-gray-300" /></li>
                        <li className="text-gray-900 font-medium truncate max-w-50 sm:max-w-none">
                            {decodeHtmlEntities(product.name)}
                        </li>
                    </ol>
                </div>
            </nav>

            {/* Main Product Section */}
            <section className="py-8 md:py-14">
                <div className="container mx-auto px-4">
                    <div className="grid lg:grid-cols-2 gap-8 lg:gap-16">
                        {/* Left: Image Gallery */}
                        <ProductImageGallery
                            images={product.images || []}
                            productName={product.name}
                        />

                        {/* Right: Product Info */}
                        <ProductInfo
                            product={product}
                            onAddToCart={handleAddToCart}
                        />
                    </div>
                </div>
            </section>

            {/* Product Details & Reviews (Tabs) */}
            <ProductAbout product={product} />

            {/* Related Products */}
            <RelatedProducts products={relatedProducts} />
        </main>
    );
}
