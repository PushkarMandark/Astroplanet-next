import React from "react";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { OptimizedImage } from "@/components/atoms/image";
import { Product } from "@/types";
import { decodeHtmlEntities } from "@/lib/utils/decode";

interface RelatedProductsProps {
    products: Product[];
}

export function RelatedProducts({ products }: RelatedProductsProps) {
    if (products.length === 0) return null;

    return (
        <section className="py-16">
            <div className="container mx-auto px-4">
                <div className="flex items-center justify-between mb-8">
                    <h2 className="text-2xl md:text-3xl font-bold font-serif">
                        You May Also Like
                    </h2>
                    <Link href="/shop">
                        <Button variant="outline" className="rounded-full">
                            View All
                            <ChevronRight className="h-4 w-4 ml-1" />
                        </Button>
                    </Link>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    {products.slice(0, 4).map((product) => (
                        <Link key={product.id} href={`/product/${product.slug}`}>
                            <Card className="group overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                                <div className="relative aspect-square bg-gray-100">
                                    <OptimizedImage
                                        src={product.images?.[0]?.src || "/images/placeholder.jpg"}
                                        alt={product.name}
                                        fill
                                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                                    />
                                </div>
                                <CardContent className="p-4">
                                    <h3 className="font-semibold line-clamp-2 mb-2 group-hover:text-primary transition-colors">
                                        {decodeHtmlEntities(product.name)}
                                    </h3>
                                    <div className="flex items-center justify-between">
                                        <span className="text-lg font-bold text-primary">
                                            ₹{Number(product.price).toLocaleString('en-IN')}
                                        </span>
                                        {product.regular_price && product.sale_price !== product.regular_price && (
                                            <span className="text-sm text-gray-400 line-through">
                                                ₹{Number(product.regular_price).toLocaleString('en-IN')}
                                            </span>
                                        )}
                                    </div>
                                </CardContent>
                            </Card>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}
