"use client";

import Link from "next/link";
import Image from "next/image";
import { Heart, ShoppingCart, Trash2, ArrowRight, ShoppingBag } from "lucide-react";
import { MainLayout } from "@/components/templates/main-layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useWishlistStore, useCartStore } from "@/stores";
import { formatPrice } from "@/lib/api/client";
import { useState, useEffect } from "react";

export default function WishlistPage() {
    const [mounted, setMounted] = useState(false);
    const { items, removeItem, clearWishlist } = useWishlistStore();
    const addToCart = useCartStore((state) => state.addItem);

    useEffect(() => {
        setMounted(true);
    }, []);

    // Prevent hydration mismatch
    if (!mounted) {
        return (
            <MainLayout>
                <section className="bg-gradient-to-r from-primary to-primary/80 text-white py-12">
                    <div className="container mx-auto px-4">
                        <h1 className="text-4xl font-bold font-serif">My Wishlist</h1>
                        <p className="text-white/80 mt-2">Your saved items</p>
                    </div>
                </section>
                <section className="py-12">
                    <div className="container mx-auto px-4">
                        <div className="text-center py-12">
                            <div className="w-16 h-16 mx-auto bg-muted rounded-full flex items-center justify-center animate-pulse" />
                        </div>
                    </div>
                </section>
            </MainLayout>
        );
    }

    if (items.length === 0) {
        return (
            <MainLayout>
                <section className="bg-gradient-to-r from-primary to-primary/80 text-white py-12">
                    <div className="container mx-auto px-4">
                        <h1 className="text-4xl font-bold font-serif">My Wishlist</h1>
                        <p className="text-white/80 mt-2">Your saved items</p>
                    </div>
                </section>
                <section className="py-20">
                    <div className="container mx-auto px-4 text-center">
                        <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-muted flex items-center justify-center">
                            <Heart className="h-12 w-12 text-muted-foreground" />
                        </div>
                        <h2 className="text-2xl font-bold font-serif mb-2">
                            Your Wishlist is Empty
                        </h2>
                        <p className="text-muted-foreground mb-8 max-w-md mx-auto">
                            Save your favorite products to your wishlist and shop them later.
                        </p>
                        <Button asChild size="lg" className="bg-gradient-to-r from-primary to-primary/80">
                            <Link href="/shop">
                                <ShoppingBag className="h-5 w-5 mr-2" />
                                Continue Shopping
                            </Link>
                        </Button>
                    </div>
                </section>
            </MainLayout>
        );
    }

    const handleAddToCart = (item: typeof items[0]) => {
        // Create a minimal product object for cart
        addToCart({
            id: item.id,
            name: item.name,
            slug: item.slug,
            permalink: "",
            type: "simple",
            status: "publish",
            featured: false,
            description: "",
            short_description: "",
            sku: "",
            price: String(item.price),
            regular_price: String(item.regularPrice || item.price),
            sale_price: "",
            on_sale: item.onSale || false,
            stock_status: "instock",
            stock_quantity: null,
            categories: [],
            tags: [],
            images: [{ id: 0, src: item.image, name: "", alt: "" }],
            attributes: [],
            related_ids: [],
            average_rating: "0",
            rating_count: 0,
            manage_stock: false,
            weight: "",
            dimensions: { length: "", width: "", height: "" },
        });
        removeItem(item.id);
    };

    return (
        <MainLayout>
            {/* Page Header */}
            <section className="bg-gradient-to-r from-primary to-primary/80 text-white py-12">
                <div className="container mx-auto px-4">
                    <h1 className="text-4xl font-bold font-serif">My Wishlist</h1>
                    <p className="text-white/80 mt-2">{items.length} item{items.length !== 1 ? 's' : ''} saved</p>
                </div>
            </section>

            <section className="py-12">
                <div className="container mx-auto px-4">
                    {/* Actions Bar */}
                    <div className="flex items-center justify-between mb-8">
                        <Button asChild variant="outline">
                            <Link href="/shop">
                                <ArrowRight className="h-4 w-4 mr-2 rotate-180" />
                                Continue Shopping
                            </Link>
                        </Button>
                        <Button
                            variant="ghost"
                            onClick={clearWishlist}
                            className="text-destructive hover:text-destructive hover:bg-destructive/10"
                        >
                            <Trash2 className="h-4 w-4 mr-2" />
                            Clear Wishlist
                        </Button>
                    </div>

                    {/* Wishlist Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {items.map((item) => (
                            <Card key={item.id} className="group overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all">
                                <div className="relative aspect-square bg-gray-100">
                                    <Link href={`/product/${item.slug}`}>
                                        <Image
                                            src={item.image}
                                            alt={item.name}
                                            fill
                                            className="object-cover transition-transform duration-300 group-hover:scale-105"
                                        />
                                    </Link>
                                    {item.onSale && (
                                        <Badge className="absolute top-3 left-3 bg-red-500 text-white border-0">
                                            Sale
                                        </Badge>
                                    )}
                                    <Button
                                        variant="destructive"
                                        size="icon"
                                        onClick={() => removeItem(item.id)}
                                        className="absolute top-3 right-3 h-10 w-10 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity"
                                    >
                                        <Trash2 className="h-5 w-5" />
                                    </Button>
                                </div>
                                <CardContent className="p-5">
                                    <Link href={`/product/${item.slug}`}>
                                        <h3 className="font-bold text-gray-800 line-clamp-2 hover:text-primary transition-colors mb-2">
                                            {item.name}
                                        </h3>
                                    </Link>
                                    <div className="flex items-baseline gap-2 mb-4">
                                        <span className="text-xl font-bold text-primary">
                                            {formatPrice(item.price)}
                                        </span>
                                        {item.regularPrice && item.regularPrice > item.price && (
                                            <span className="text-sm text-gray-400 line-through">
                                                {formatPrice(item.regularPrice)}
                                            </span>
                                        )}
                                    </div>
                                    <Button
                                        onClick={() => handleAddToCart(item)}
                                        className="w-full bg-gradient-to-r from-primary to-primary/80"
                                    >
                                        <ShoppingCart className="h-4 w-4 mr-2" />
                                        Move to Cart
                                    </Button>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>
        </MainLayout>
    );
}
