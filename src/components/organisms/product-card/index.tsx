"use client";

import Link from "next/link";
import { ShoppingCart, Heart, Star } from "lucide-react";
import { OptimizedImage } from "@/components/atoms/image";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useCartStore, useWishlistStore } from "@/stores";
import { Product } from "@/types";
import { cn } from "@/lib/utils";
import { decodeHtmlEntities } from "@/lib/utils/decode";
import { toast } from "sonner";

interface ProductCardProps {
    product: Product;
    className?: string;
}

export function ProductCard({ product, className }: ProductCardProps) {
    const addItem = useCartStore((state) => state.addItem);
    const openCart = useCartStore((state) => state.openCart);
    const { toggleItem, isInWishlist } = useWishlistStore();
    const isWishlisted = isInWishlist(product.id);

    const handleAddToCart = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        addItem(product);
        toast.success(`${decodeHtmlEntities(product.name)} added to cart`, {
            action: { label: "View Cart", onClick: () => openCart() },
        });
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
    const isOutOfStock = product.stock_status === "outofstock";

    return (
        <div className={cn("group relative", className)}>
            <Link href={productUrl} className="block">
                {/* Image */}
                <div className="relative aspect-square overflow-hidden rounded-2xl bg-gray-100">
                    <OptimizedImage
                        src={imageUrl}
                        alt={decodeHtmlEntities(product.name)}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />

                    {/* Badges */}
                    <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10">
                        {hasDiscount && (
                            <Badge className="bg-red-600 text-white border-0 text-[11px] font-bold px-2 py-0.5 rounded-lg">
                                {discountPercent}% OFF
                            </Badge>
                        )}
                        {isOutOfStock && (
                            <Badge className="bg-gray-900/80 text-white border-0 text-[11px] font-medium px-2 py-0.5 rounded-lg backdrop-blur-sm">
                                Out of Stock
                            </Badge>
                        )}
                    </div>

                    {/* Wishlist */}
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={handleWishlist}
                        className={cn(
                            "absolute top-3 right-3 h-9 w-9 rounded-full z-10 transition-all",
                            isWishlisted
                                ? "bg-red-500 text-white hover:bg-red-600"
                                : "bg-white/80 backdrop-blur-sm text-gray-500 hover:bg-white hover:text-red-500"
                        )}
                    >
                        <Heart className={cn("h-4 w-4", isWishlisted && "fill-current")} />
                    </Button>

                    {/* Add to Cart bar — slides up from bottom */}
                    <div className="absolute inset-x-0 bottom-0 translate-y-full group-hover:translate-y-0 transition-transform duration-300 z-10">
                        <Button
                            onClick={handleAddToCart}
                            disabled={isOutOfStock}
                            className="w-full bg-primary text-white hover:bg-primary/90 rounded-none rounded-b-2xl h-10 text-sm font-semibold gap-2"
                        >
                            <ShoppingCart className="h-4 w-4" />
                            {isOutOfStock ? "Out of Stock" : "Add to Cart"}
                        </Button>
                    </div>
                </div>

                {/* Info */}
                <div className="pt-3 pb-1">
                    {/* Category */}
                    {product.categories?.[0] && (
                        <p className="text-[11px] font-semibold text-secondary uppercase tracking-wider mb-1">
                            {decodeHtmlEntities(product.categories[0].name)}
                        </p>
                    )}

                    {/* Title */}
                    <h3 className="text-sm font-semibold text-gray-900 line-clamp-2 leading-snug group-hover:text-primary transition-colors mb-1.5">
                        {decodeHtmlEntities(product.name)}
                    </h3>

                    {/* Rating */}
                    <div className="flex items-center gap-0.5 mb-2">
                        {[...Array(5)].map((_, i) => (
                            <Star key={i} className="h-3 w-3 text-accent fill-accent" />
                        ))}
                        <span className="text-[11px] text-gray-400 ml-1">(4.8)</span>
                    </div>

                    {/* Price */}
                    <div className="flex items-baseline gap-2">
                        <span className="text-lg font-bold text-gray-900">
                            ₹{product.price ? Number(product.price).toLocaleString("en-IN") : "0"}
                        </span>
                        {hasDiscount && (
                            <span className="text-xs text-gray-400 line-through">
                                ₹{regularPrice.toLocaleString("en-IN")}
                            </span>
                        )}
                    </div>
                </div>
            </Link>
        </div>
    );
}
