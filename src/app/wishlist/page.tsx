"use client";

import Link from "next/link";
import Image from "next/image";
import { Heart, ShoppingCart, Trash2, ShoppingBag } from "lucide-react";
import { AccountLayout } from "@/components/templates/account-layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useWishlistStore, useCartStore } from "@/stores";
import { formatPrice } from "@/lib/api/client";
import { useMounted } from "@/lib/hooks/use-mounted";

export default function WishlistPage() {
    const mounted = useMounted();
    const { items, removeItem, clearWishlist } = useWishlistStore();
    const addToCart = useCartStore((state) => state.addItem);

    const handleAddToCart = (item: typeof items[0]) => {
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

    const itemCount = mounted ? items.length : 0;

    return (
        <AccountLayout
            title="Wishlist"
            description={itemCount > 0 ? `${itemCount} item${itemCount !== 1 ? 's' : ''} saved` : "Your saved items"}
        >
            {mounted && items.length === 0 ? (
                <Card className="border-0 shadow-lg">
                    <CardContent className="py-16 text-center">
                        <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-muted flex items-center justify-center">
                            <Heart className="h-10 w-10 text-muted-foreground" />
                        </div>
                        <h3 className="text-xl font-bold mb-2">Your Wishlist is Empty</h3>
                        <p className="text-muted-foreground mb-6 max-w-sm mx-auto">
                            Save your favorite products to your wishlist and shop them later.
                        </p>
                        <Button asChild size="lg" className="bg-gradient-to-r from-primary to-primary/80">
                            <Link href="/shop">
                                <ShoppingBag className="h-5 w-5 mr-2" />
                                Continue Shopping
                            </Link>
                        </Button>
                    </CardContent>
                </Card>
            ) : (
                <>
                    {/* Actions Bar */}
                    {mounted && items.length > 0 && (
                        <div className="flex items-center justify-between mb-6">
                            <Button asChild variant="outline" size="sm">
                                <Link href="/shop">
                                    Continue Shopping
                                </Link>
                            </Button>
                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={clearWishlist}
                                className="text-destructive hover:text-destructive hover:bg-destructive/10"
                            >
                                <Trash2 className="h-4 w-4 mr-2" />
                                Clear All
                            </Button>
                        </div>
                    )}

                    {/* Wishlist Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {mounted && items.map((item) => (
                            <Card key={item.id} className="group overflow-hidden border-0 shadow-md hover:shadow-lg transition-all">
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
                                        className="absolute top-3 right-3 h-9 w-9 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity"
                                    >
                                        <Trash2 className="h-4 w-4" />
                                    </Button>
                                </div>
                                <CardContent className="p-4">
                                    <Link href={`/product/${item.slug}`}>
                                        <h3 className="font-semibold text-sm line-clamp-2 hover:text-primary transition-colors mb-2">
                                            {item.name}
                                        </h3>
                                    </Link>
                                    <div className="flex items-baseline gap-2 mb-3">
                                        <span className="text-lg font-bold text-primary">
                                            {formatPrice(item.price)}
                                        </span>
                                        {item.regularPrice && item.regularPrice > item.price && (
                                            <span className="text-sm text-muted-foreground line-through">
                                                {formatPrice(item.regularPrice)}
                                            </span>
                                        )}
                                    </div>
                                    <Button
                                        onClick={() => handleAddToCart(item)}
                                        className="w-full bg-gradient-to-r from-primary to-primary/80"
                                        size="sm"
                                    >
                                        <ShoppingCart className="h-4 w-4 mr-2" />
                                        Move to Cart
                                    </Button>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </>
            )}
        </AccountLayout>
    );
}
