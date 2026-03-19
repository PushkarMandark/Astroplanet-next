import React from "react";
import { Star, FileText, Info, MessageSquare } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Product } from "@/types";

interface ProductAboutProps {
    product: Product;
}

export function ProductAbout({ product }: ProductAboutProps) {
    return (
        <section className="py-12 bg-gray-50/60">
            <div className="container mx-auto px-4">
                <Tabs defaultValue="description" className="max-w-4xl mx-auto">
                    <TabsList className="grid w-full grid-cols-3 h-12 p-1 bg-white shadow-sm rounded-xl border border-gray-100">
                        <TabsTrigger value="description" className="rounded-lg text-sm data-[state=active]:bg-primary data-[state=active]:text-white transition-all gap-2">
                            <FileText className="h-4 w-4" />
                            Description
                        </TabsTrigger>
                        <TabsTrigger value="details" className="rounded-lg text-sm data-[state=active]:bg-primary data-[state=active]:text-white transition-all gap-2">
                            <Info className="h-4 w-4" />
                            Details
                        </TabsTrigger>
                        <TabsTrigger value="reviews" className="rounded-lg text-sm data-[state=active]:bg-primary data-[state=active]:text-white transition-all gap-2">
                            <MessageSquare className="h-4 w-4" />
                            Reviews
                        </TabsTrigger>
                    </TabsList>

                    <Card className="mt-5 border border-gray-100 shadow-lg rounded-2xl overflow-hidden">
                        <CardContent className="p-6 md:p-10 bg-white">
                            <TabsContent value="description" className="mt-0">
                                <div
                                    className="prose prose-sm md:prose-base max-w-none text-gray-600 leading-relaxed [&_p]:mb-4 [&_h2]:text-xl [&_h2]:font-heading [&_h2]:text-gray-900 [&_h2]:mt-6 [&_h2]:mb-3 [&_h3]:text-lg [&_h3]:font-heading [&_h3]:text-gray-900 [&_strong]:text-gray-800 [&_ul]:space-y-2 [&_li]:text-gray-600"
                                    dangerouslySetInnerHTML={{ __html: product.description }}
                                />
                            </TabsContent>

                            <TabsContent value="details" className="mt-0">
                                <div className="grid md:grid-cols-2 gap-8">
                                    <div>
                                        <h3 className="text-lg font-bold font-heading text-gray-900 mb-4">Specifications</h3>
                                        <div className="rounded-xl border border-gray-100 divide-y divide-gray-100 overflow-hidden">
                                            {product.attributes?.map((attr) => (
                                                <div key={attr.name} className="flex items-center justify-between px-4 py-3 even:bg-gray-50/50">
                                                    <span className="text-sm text-gray-500">{attr.name}</span>
                                                    <span className="text-sm font-semibold text-gray-900">{attr.options.join(", ")}</span>
                                                </div>
                                            ))}
                                            <div className="flex items-center justify-between px-4 py-3 even:bg-gray-50/50">
                                                <span className="text-sm text-gray-500">Weight</span>
                                                <span className="text-sm font-semibold text-gray-900">{product.weight || "—"}g</span>
                                            </div>
                                            <div className="flex items-center justify-between px-4 py-3 even:bg-gray-50/50">
                                                <span className="text-sm text-gray-500">Dimensions</span>
                                                <span className="text-sm font-semibold text-gray-900">
                                                    {product.dimensions?.length && product.dimensions?.width
                                                        ? `${product.dimensions.length} × ${product.dimensions.width} × ${product.dimensions.height || 0} cm`
                                                        : "—"}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-bold font-heading text-gray-900 mb-4">Care Instructions</h3>
                                        <div className="p-5 bg-amber-50/80 rounded-xl border border-amber-100">
                                            <ul className="space-y-3 text-sm text-amber-900">
                                                {[
                                                    "Clean with a soft dry cloth after use",
                                                    "Avoid contact with water and perfume",
                                                    "Store in a dry, cool place",
                                                ].map((instruction) => (
                                                    <li key={instruction} className="flex items-start gap-2.5">
                                                        <span className="h-1.5 w-1.5 rounded-full bg-amber-400 mt-1.5 shrink-0" />
                                                        {instruction}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </TabsContent>

                            <TabsContent value="reviews" className="mt-0">
                                <div className="space-y-6">
                                    {/* Rating Summary */}
                                    <div className="flex items-center gap-8 p-5 bg-amber-50/80 rounded-xl border border-amber-100">
                                        <div className="text-center">
                                            <div className="text-4xl font-bold text-gray-900">4.8</div>
                                            <div className="flex items-center justify-center mt-1 gap-0.5">
                                                {[...Array(5)].map((_, i) => (
                                                    <Star key={i} className="h-3.5 w-3.5 text-accent fill-accent" />
                                                ))}
                                            </div>
                                            <p className="text-xs text-gray-500 mt-1">124 reviews</p>
                                        </div>
                                        <div className="flex-1 space-y-1.5">
                                            {[
                                                { rating: 5, percent: 75 },
                                                { rating: 4, percent: 15 },
                                                { rating: 3, percent: 5 },
                                                { rating: 2, percent: 3 },
                                                { rating: 1, percent: 2 },
                                            ].map(({ rating, percent }) => (
                                                <div key={rating} className="flex items-center gap-2">
                                                    <span className="text-xs w-3 text-gray-500">{rating}</span>
                                                    <Star className="h-3 w-3 text-accent fill-accent" />
                                                    <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                                                        <div
                                                            className="h-full bg-accent rounded-full transition-all"
                                                            style={{ width: `${percent}%` }}
                                                        />
                                                    </div>
                                                    <span className="text-xs text-gray-400 w-8">{percent}%</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Reviews */}
                                    {[
                                        { name: "Priya S.", rating: 5, text: "Excellent quality and authentic product. Got my career back on track after wearing this.", date: "2 days ago" },
                                        { name: "Rahul M.", rating: 5, text: "Fast delivery and very well packaged. The yantra is beautifully made.", date: "1 week ago" },
                                    ].map((review, i) => (
                                        <div key={i} className="border-b border-gray-100 pb-5 last:border-0 last:pb-0">
                                            <div className="flex items-center gap-3 mb-2">
                                                <div className="h-9 w-9 rounded-full bg-primary/10 flex items-center justify-center text-sm font-bold text-primary">
                                                    {review.name.charAt(0)}
                                                </div>
                                                <div>
                                                    <p className="text-sm font-semibold text-gray-900">{review.name}</p>
                                                    <div className="flex items-center gap-1">
                                                        {[...Array(review.rating)].map((_, j) => (
                                                            <Star key={j} className="h-3 w-3 text-accent fill-accent" />
                                                        ))}
                                                        <span className="text-xs text-gray-400 ml-1">{review.date}</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <p className="text-sm text-gray-600 leading-relaxed ml-12">{review.text}</p>
                                        </div>
                                    ))}
                                </div>
                            </TabsContent>
                        </CardContent>
                    </Card>
                </Tabs>
            </div>
        </section>
    );
}
