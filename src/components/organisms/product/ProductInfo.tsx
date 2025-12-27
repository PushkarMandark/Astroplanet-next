import React, { useState } from "react";
import Link from "next/link";
import { Star, Truck, Shield, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { QuantitySelector } from "@/components/molecules/quantity-selector";
import { ProductPrice } from "@/components/molecules/product-price";
import { Product } from "@/types";
import { decodeHtmlEntities } from "@/lib/utils/decode";

interface ProductInfoProps {
    product: Product;
    onAddToCart: (quantity: number) => void;
    onBuyNow: (quantity: number) => void;
}

export function ProductInfo({ product, onAddToCart, onBuyNow }: ProductInfoProps) {
    const [quantity, setQuantity] = useState(1);
    const hasDiscount = !!(product.sale_price && product.regular_price && product.sale_price !== product.regular_price);

    return (
        <div className="space-y-6">
            {/* Category & Rating */}
            <div className="flex items-center justify-between">
                {product.categories?.[0] && (
                    <Link
                        href={`/shop/${product.categories[0].slug}`}
                        className="text-sm font-semibold text-secondary uppercase tracking-wider hover:text-primary transition-colors"
                    >
                        {decodeHtmlEntities(product.categories[0].name)}
                    </Link>
                )}
                <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 text-amber-400 fill-amber-400" />
                    ))}
                    <span className="text-sm text-muted-foreground ml-1">(4.8 • 124 reviews)</span>
                </div>
            </div>

            {/* Title */}
            <h1 className="text-3xl md:text-4xl font-bold font-serif text-gray-900 leading-tight">
                {decodeHtmlEntities(product.name)}
            </h1>

            {/* Price Section */}
            <ProductPrice
                price={product.price}
                regularPrice={product.regular_price}
                hasDiscount={hasDiscount}
            />

            {/* Short Description */}
            {product.short_description && (
                <div
                    className="prose prose-sm max-w-none text-gray-600 leading-relaxed"
                    dangerouslySetInnerHTML={{ __html: product.short_description }}
                />
            )}

            {/* Stock Status */}
            <div className="flex items-center gap-2">
                {product.stock_status === "instock" ? (
                    <>
                        <div className="h-3 w-3 rounded-full bg-green-500 animate-pulse" />
                        <span className="text-green-600 font-medium">In Stock - Ready to Ship</span>
                    </>
                ) : (
                    <>
                        <div className="h-3 w-3 rounded-full bg-red-500" />
                        <span className="text-red-600 font-medium">Out of Stock</span>
                    </>
                )
                }
            </div>

            {/* Actions */}
            <div className="space-y-4 pt-4 border-t">
                <div className="flex items-center gap-4">
                    <div className="w-32">
                        <QuantitySelector
                            value={quantity}
                            onChange={setQuantity}
                            max={product.manage_stock ? (product.stock_quantity ?? undefined) : undefined}
                        />
                    </div>
                    <Button
                        size="lg"
                        variant="outline"
                        className="flex-1 rounded-full border-2 hover:bg-primary hover:text-white hover:border-primary transition-all duration-300"
                        onClick={() => onAddToCart(quantity)}
                    >
                        Add to Cart
                    </Button>
                </div>
                <Button
                    size="lg"
                    className="w-full rounded-full bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 shadow-lg text-lg h-14"
                    onClick={() => onBuyNow(quantity)}
                    disabled={product.stock_status !== "instock"}
                >
                    Buy Now
                </Button>
            </div>

            {/* Features */}
            <div className="grid grid-cols-2 gap-4 py-6 border-y border-gray-100">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-green-50 flex items-center justify-center text-green-600">
                        <Truck className="h-5 w-5" />
                    </div>
                    <span className="text-sm font-medium">Free Express Shipping</span>
                </div>
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-600">
                        <Shield className="h-5 w-5" />
                    </div>
                    <span className="text-sm font-medium">100% Secure Checkout</span>
                </div>
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-purple-50 flex items-center justify-center text-purple-600">
                        <Shield className="h-5 w-5" />
                    </div>
                    <span className="text-sm font-medium">Authenticity Certified</span>
                </div>
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-amber-50 flex items-center justify-center text-amber-600">
                        <Clock className="h-5 w-5" />
                    </div>
                    <span className="text-sm font-medium">Pooja Services Available</span>
                </div>
            </div>
        </div>
    );
}
