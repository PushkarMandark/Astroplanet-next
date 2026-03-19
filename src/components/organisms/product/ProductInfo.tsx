import React, { useState } from "react";
import Link from "next/link";
import { Star, Truck, Shield, Clock, ShoppingCart, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { QuantitySelector } from "@/components/molecules/quantity-selector";
import { ProductPrice } from "@/components/molecules/product-price";
import { Product } from "@/types";
import { decodeHtmlEntities } from "@/lib/utils/decode";

interface ProductInfoProps {
    product: Product;
    onAddToCart: (quantity: number) => void;
}

export function ProductInfo({ product, onAddToCart }: ProductInfoProps) {
    const [quantity, setQuantity] = useState(1);
    const hasDiscount = !!(product.sale_price && product.regular_price && product.sale_price !== product.regular_price);
    const isInStock = product.stock_status === "instock";

    return (
        <div className="space-y-6">
            {/* Category & Rating */}
            <div className="flex flex-wrap items-center gap-3">
                {product.categories?.[0] && (
                    <Link
                        href={`/shop/${product.categories[0].slug}`}
                        className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-secondary hover:text-primary transition-colors"
                    >
                        <Sparkles className="h-3 w-3" />
                        {decodeHtmlEntities(product.categories[0].name)}
                    </Link>
                )}
                {hasDiscount && (
                    <Badge className="bg-red-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-md">
                        SALE
                    </Badge>
                )}
            </div>

            {/* Title */}
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold font-heading text-gray-900 leading-tight">
                {decodeHtmlEntities(product.name)}
            </h1>

            {/* Rating */}
            <div className="flex items-center gap-2">
                <div className="flex items-center gap-0.5">
                    {[...Array(5)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 text-accent fill-accent" />
                    ))}
                </div>
                <span className="text-sm font-medium text-gray-600">4.8</span>
                <span className="text-sm text-gray-400">(124 reviews)</span>
            </div>

            {/* Price Section */}
            <ProductPrice
                price={product.price}
                regularPrice={product.regular_price}
                hasDiscount={hasDiscount}
            />

            {/* Short Description */}
            {product.short_description && (
                <div
                    className="text-gray-600 leading-relaxed text-[15px] [&_p]:mb-2 [&_strong]:text-gray-800"
                    dangerouslySetInnerHTML={{ __html: product.short_description }}
                />
            )}

            {/* Stock Status */}
            <div className="flex items-center gap-2">
                {isInStock ? (
                    <>
                        <span className="relative flex h-2.5 w-2.5">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500" />
                        </span>
                        <span className="text-green-700 text-sm font-semibold">In Stock — Ready to Ship</span>
                    </>
                ) : (
                    <>
                        <span className="h-2.5 w-2.5 rounded-full bg-red-500" />
                        <span className="text-red-600 text-sm font-semibold">Out of Stock</span>
                    </>
                )}
            </div>

            {/* Add to Cart */}
            <div className="pt-4 border-t border-gray-100">
                {isInStock ? (
                    <div className="flex items-center gap-3">
                        <QuantitySelector
                            value={quantity}
                            onChange={setQuantity}
                            max={product.manage_stock ? (product.stock_quantity ?? undefined) : undefined}
                        />
                        <Button
                            size="lg"
                            className="flex-1 h-12 rounded-xl bg-primary hover:bg-primary/90 text-white font-semibold text-base gap-2 shadow-lg shadow-primary/20 transition-all duration-300 hover:shadow-xl hover:shadow-primary/30 active:scale-98"
                            onClick={() => onAddToCart(quantity)}
                        >
                            <ShoppingCart className="h-5 w-5" />
                            Add to Cart
                        </Button>
                    </div>
                ) : (
                    <div className="space-y-3">
                        <Button
                            size="lg"
                            disabled
                            className="w-full h-12 rounded-xl text-base font-semibold"
                        >
                            <ShoppingCart className="h-5 w-5 mr-2" />
                            Out of Stock
                        </Button>
                        <p className="text-xs text-gray-500 text-center">
                            This product is currently unavailable. Please check back later or contact us.
                        </p>
                    </div>
                )}
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-2 gap-3 pt-4">
                {[
                    { icon: Truck, label: "Free Express Shipping", color: "text-green-600 bg-green-50" },
                    { icon: Shield, label: "100% Secure Checkout", color: "text-blue-600 bg-blue-50" },
                    { icon: Sparkles, label: "Authenticity Certified", color: "text-purple-600 bg-purple-50" },
                    { icon: Clock, label: "Pooja Services Available", color: "text-amber-600 bg-amber-50" },
                ].map(({ icon: Icon, label, color }) => (
                    <div key={label} className="flex items-center gap-2.5 p-3 rounded-xl bg-gray-50/80 border border-gray-100">
                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${color}`}>
                            <Icon className="h-4 w-4" />
                        </div>
                        <span className="text-xs font-medium text-gray-700 leading-tight">{label}</span>
                    </div>
                ))}
            </div>
        </div>
    );
}
