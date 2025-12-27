"use client";

import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
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
    const router = useRouter();
    const addItem = useCartStore((state) => state.addItem);

    const handleAddToCart = (quantity: number) => {
        addItem(product, quantity);
        toast.success("Added to cart", {
            description: `${product.name} has been added to your cart.`,
        });
    };

    const handleBuyNow = (quantity: number) => {
        addItem(product, quantity);
        router.push("/cart");
    };

    return (
        <main className="min-h-screen bg-white">
            {/* Breadcrumbs */}
            <div className="bg-gray-50 border-b">
                <div className="container mx-auto px-4 py-4">
                    <nav className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Link href="/" className="hover:text-primary transition-colors">Home</Link>
                        <ChevronRight className="h-4 w-4" />
                        <Link href="/shop" className="hover:text-primary transition-colors">Shop</Link>
                        {product.categories?.[0] && (
                            <>
                                <ChevronRight className="h-4 w-4" />
                                <Link
                                    href={`/shop?category=${product.categories[0].id}`}
                                    className="hover:text-primary transition-colors"
                                >
                                    {decodeHtmlEntities(product.categories[0].name)}
                                </Link>
                            </>
                        )}
                        <ChevronRight className="h-4 w-4" />
                        <span className="text-gray-900 font-medium line-clamp-1">
                            {decodeHtmlEntities(product.name)}
                        </span>
                    </nav>
                </div>
            </div>

            {/* Main Product Section */}
            <section className="py-12 md:py-20">
                <div className="container mx-auto px-4">
                    <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
                        {/* Left: Image Gallery */}
                        <ProductImageGallery
                            images={product.images || []}
                            productName={product.name}
                        />

                        {/* Right: Product Info */}
                        <ProductInfo
                            product={product}
                            onAddToCart={handleAddToCart}
                            onBuyNow={handleBuyNow}
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
