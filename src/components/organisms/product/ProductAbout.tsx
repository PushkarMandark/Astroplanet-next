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
        <section className="py-16 bg-gray-50/50">
            <div className="container mx-auto px-4">
                <Tabs defaultValue="description" className="max-w-4xl mx-auto">
                    <TabsList className="grid w-full grid-cols-3 h-14 p-1 bg-white shadow-sm rounded-xl border">
                        <TabsTrigger value="description" className="rounded-lg data-[state=active]:bg-primary data-[state=active]:text-white transition-all gap-2">
                            <FileText className="h-4 w-4" />
                            Description
                        </TabsTrigger>
                        <TabsTrigger value="details" className="rounded-lg data-[state=active]:bg-primary data-[state=active]:text-white transition-all gap-2">
                            <Info className="h-4 w-4" />
                            Details
                        </TabsTrigger>
                        <TabsTrigger value="reviews" className="rounded-lg data-[state=active]:bg-primary data-[state=active]:text-white transition-all gap-2">
                            <MessageSquare className="h-4 w-4" />
                            Reviews
                        </TabsTrigger>
                    </TabsList>

                    <Card className="mt-6 border-0 shadow-xl rounded-2xl overflow-hidden">
                        <CardContent className="p-8 md:p-12 bg-white">
                            <TabsContent value="description" className="mt-0">
                                <div
                                    className="prose prose-sm md:prose-base max-w-none text-gray-600 leading-relaxed space-y-4"
                                    dangerouslySetInnerHTML={{ __html: product.description }}
                                />
                            </TabsContent>

                            <TabsContent value="details" className="mt-0">
                                <div className="grid md:grid-cols-2 gap-8">
                                    <div className="space-y-4">
                                        <h3 className="text-xl font-bold font-serif text-primary">Specifications</h3>
                                        <div className="space-y-3">
                                            {product.attributes?.map((attr) => (
                                                <div key={attr.name} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0">
                                                    <span className="text-sm font-medium text-gray-500">{attr.name}</span>
                                                    <span className="text-sm font-semibold text-gray-900">{attr.options.join(", ")}</span>
                                                </div>
                                            ))}
                                            <div className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0">
                                                <span className="text-sm font-medium text-gray-500">Weight</span>
                                                <span className="text-sm font-semibold text-gray-900">{product.weight || "0"}g</span>
                                            </div>
                                            <div className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0">
                                                <span className="text-sm font-medium text-gray-500">Dimensions</span>
                                                <span className="text-sm font-semibold text-gray-900">
                                                    {product.dimensions?.length || "0"} × {product.dimensions?.width || "0"} × {product.dimensions?.height || "0"} cm
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="space-y-4">
                                        <h3 className="text-xl font-bold font-serif text-primary">Care Instructions</h3>
                                        <div className="p-6 bg-amber-50 rounded-2xl border border-amber-100">
                                            <ul className="space-y-3 text-sm text-amber-900">
                                                <li className="flex gap-2">
                                                    <div className="h-1.5 w-1.5 rounded-full bg-amber-400 mt-1.5 flex-shrink-0" />
                                                    Clean with a soft dry cloth after use
                                                </li>
                                                <li className="flex gap-2">
                                                    <div className="h-1.5 w-1.5 rounded-full bg-amber-400 mt-1.5 flex-shrink-0" />
                                                    Avoid contact with water and perfume
                                                </li>
                                                <li className="flex gap-2">
                                                    <div className="h-1.5 w-1.5 rounded-full bg-amber-400 mt-1.5 flex-shrink-0" />
                                                    Store in a dry place
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </TabsContent>

                            <TabsContent value="reviews" className="mt-0">
                                <div className="space-y-6">
                                    <div className="flex items-center gap-8 p-6 bg-amber-50 rounded-2xl">
                                        <div className="text-center">
                                            <div className="text-5xl font-bold text-amber-600">4.8</div>
                                            <div className="flex items-center justify-center mt-1">
                                                {[...Array(5)].map((_, i) => (
                                                    <Star key={i} className="h-4 w-4 text-amber-400 fill-amber-400" />
                                                ))}
                                            </div>
                                            <p className="text-sm text-muted-foreground mt-1">124 reviews</p>
                                        </div>
                                        <div className="flex-1 space-y-2">
                                            {[5, 4, 3, 2, 1].map((rating) => (
                                                <div key={rating} className="flex items-center gap-2">
                                                    <span className="text-sm w-3">{rating}</span>
                                                    <Star className="h-3 w-3 text-amber-400 fill-amber-400" />
                                                    <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                                                        <div
                                                            className="h-full bg-amber-400 rounded-full"
                                                            style={{ width: `${rating === 5 ? 75 : rating === 4 ? 15 : rating === 3 ? 5 : 3}%` }}
                                                        />
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    {[
                                        { name: "Priya S.", rating: 5, text: "Excellent quality and authentic product. Got my career back on track after wearing this.", date: "2 days ago" },
                                        { name: "Rahul M.", rating: 5, text: "Fast delivery and very well packaged. The yantra is beautifully made.", date: "1 week ago" },
                                    ].map((review, i) => (
                                        <div key={i} className="border-b pb-6 last:border-0">
                                            <div className="flex items-center justify-between mb-2">
                                                <div className="flex items-center gap-2">
                                                    <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center font-semibold text-primary">
                                                        {review.name.charAt(0)}
                                                    </div>
                                                    <div>
                                                        <p className="font-semibold">{review.name}</p>
                                                        <div className="flex items-center gap-1">
                                                            {[...Array(review.rating)].map((_, j) => (
                                                                <Star key={j} className="h-3 w-3 text-amber-400 fill-amber-400" />
                                                            ))}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <p className="text-muted-foreground">{review.text}</p>
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
