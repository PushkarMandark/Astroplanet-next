"use client";

import Link from "next/link";
import { ShoppingCart, Heart, Eye, Star } from "lucide-react";
import { OptimizedImage } from "@/components/atoms/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useCartStore, useWishlistStore } from "@/stores";
import { Product } from "@/types";
import { cn } from "@/lib/utils";

interface ProductCardProps {
    product: Product;
    className?: string;
}

export function ProductCard({ product, className }: ProductCardProps) {
    const addItem = useCartStore((state) => state.addItem);
    const { toggleItem, isInWishlist } = useWishlistStore();
    const isWishlisted = isInWishlist(product.id);

    const handleAddToCart = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        addItem(product);
    };

    const handleWishlist = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        toggleItem(product);
    };

    const productUrl = `/product/${product.slug}`;
    const imageUrl = product.images?.[0]?.src || "/images/placeholder.svg";
    const hasDiscount = product.on_sale && product.sale_price;
    const regularPrice = Number(product.regular_price);
    const discountPercent =
        hasDiscount && regularPrice > 0
            ? Math.round(((regularPrice - Number(product.sale_price)) / regularPrice) * 100)
            : 0;

    return (
        <Card
            className={cn(
                "group overflow-hidden transition-all duration-300 hover:shadow-2xl hover:shadow-primary/20 hover:-translate-y-2 border border-gray-100 bg-white rounded-2xl",
                className
            )}
        >
            <Link href={productUrl}>
                {/* Image Container */}
                <div className="relative aspect-square overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100">
                    <OptimizedImage
                        src={imageUrl}
                        alt={product.name}
                        fill
                        className="transition-transform duration-500 group-hover:scale-105"
                    />

                    {/* Overlay gradient on hover */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                    {/* Badges - Top Left */}
                    <div className="absolute top-3 left-3 flex flex-col gap-2 z-10">
                        {hasDiscount && (
                            <Badge className="bg-gradient-to-r from-red-500 to-red-600 text-white border-0 shadow-lg px-3 py-1 text-sm font-bold">
                                {discountPercent}% OFF
                            </Badge>
                        )}
                        {product.featured && (
                            <Badge className="bg-gradient-to-r from-accent to-yellow-400 text-black border-0 shadow-lg px-2 py-1">
                                <Star className="h-3 w-3 mr-1 fill-current" />
                                Featured
                            </Badge>
                        )}
                        {product.stock_status === "outofstock" && (
                            <Badge variant="destructive" className="shadow-lg">
                                Out of Stock
                            </Badge>
                        )}
                    </div>

                    {/* Quick Action Buttons - Top Right - Always Visible */}
                    <div className="absolute top-3 right-3 flex flex-col gap-2 z-10">
                        <Button
                            variant="secondary"
                            size="icon"
                            onClick={handleWishlist}
                            className={cn(
                                "h-10 w-10 rounded-full shadow-lg transition-all duration-300 border-2",
                                isWishlisted
                                    ? "bg-red-500 border-red-500 text-white hover:bg-red-600"
                                    : "bg-white/90 backdrop-blur-sm border-gray-200 text-gray-600 hover:bg-red-50 hover:border-red-300 hover:text-red-500"
                            )}
                        >
                            <Heart className={cn("h-5 w-5", isWishlisted && "fill-current")} />
                        </Button>
                        <Button
                            variant="secondary"
                            size="icon"
                            className="h-10 w-10 rounded-full bg-white/90 backdrop-blur-sm shadow-lg border-2 border-gray-200 text-gray-600 hover:bg-primary/10 hover:border-primary hover:text-primary transition-all duration-300"
                        >
                            <Eye className="h-5 w-5" />
                        </Button>
                    </div>

                    {/* Add to Cart Button - Bottom - Visible on hover */}
                    <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300 z-10">
                        <Button
                            onClick={handleAddToCart}
                            disabled={product.stock_status === "outofstock"}
                            className="w-full bg-gradient-to-r from-primary to-primary/90 hover:from-primary/95 hover:to-primary/85 text-white shadow-xl rounded-xl h-12 font-semibold text-base"
                        >
                            <ShoppingCart className="h-5 w-5 mr-2" />
                            Add to Cart
                        </Button>
                    </div>
                </div>
            </Link>

            <CardContent className="p-5">
                {/* Category */}
                {product.categories?.[0] && (
                    <p className="text-xs font-semibold text-secondary uppercase tracking-wider mb-2">
                        {product.categories[0].name}
                    </p>
                )}

                {/* Title */}
                <Link href={productUrl}>
                    <h3 className="font-bold text-gray-800 line-clamp-2 hover:text-primary transition-colors mb-3 min-h-[48px] text-[15px] leading-tight">
                        {product.name}
                    </h3>
                </Link>

                {/* Rating placeholder */}
                <div className="flex items-center gap-1 mb-3" aria-label="4.8 out of 5 stars">
                    {[...Array(5)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 text-amber-400 fill-amber-400" aria-hidden="true" />
                    ))}
                    <span className="text-xs text-muted-foreground ml-1" aria-hidden="true">(4.8)</span>
                </div>

                {/* Price */}
                <div className="flex items-center justify-between">
                    <div className="flex items-baseline gap-2">
                        <span className="text-2xl font-bold text-primary">
                            ₹{product.price ? Number(product.price).toLocaleString('en-IN') : '0'}
                        </span>
                        {hasDiscount && (
                            <span className="text-sm text-gray-400 line-through">
                                ₹{Number(product.regular_price).toLocaleString('en-IN')}
                            </span>
                        )}
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
