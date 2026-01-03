import Link from "next/link";
import { MainLayout } from "@/components/templates/main-layout";
import { OptimizedImage } from "@/components/atoms/image";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { getPosts, getPostCategories, getFeaturedImage, getPostUrl, getAuthorName } from "@/lib/api/blog";
import { Calendar, User, BookOpen } from "lucide-react";
import { BlogGridClient } from "./blog-grid-client";

export const metadata = {
    title: "Blog",
    description: "Read our latest articles on astrology, horoscopes, gemstones, and spiritual guidance.",
};

export default async function BlogPage() {
    const [posts, categories] = await Promise.all([
        getPosts({ per_page: 100 }),
        getPostCategories(),
    ]);

    return (
        <MainLayout>
            {/* Page Header */}
            <section className="bg-gradient-to-br from-primary to-secondary text-primary-foreground py-16">
                <div className="container mx-auto px-4 text-center">
                    <Badge className="mb-4 bg-white/10 text-white border-white/20 backdrop-blur-sm px-4 py-1">
                        <BookOpen className="h-3 w-3 mr-1" />
                        Latest Articles
                    </Badge>
                    <h1 className="text-4xl md:text-5xl font-bold font-heading mb-4">
                        Blog
                    </h1>
                    <p className="text-primary-foreground/80 max-w-2xl mx-auto">
                        Explore articles on astrology, horoscopes, gemstones, and spiritual guidance
                    </p>
                </div>
            </section>

            {/* Category Filters */}
            {categories.length > 0 && (
                <section className="py-6 bg-muted/30 border-b">
                    <div className="container mx-auto px-4">
                        <div className="flex items-center gap-3 overflow-x-auto pb-2 scrollbar-hide">
                            <span className="text-sm font-medium text-muted-foreground flex-shrink-0">
                                Categories:
                            </span>
                            {categories.slice(0, 8).map((category) => (
                                <Badge
                                    key={category.id}
                                    variant="outline"
                                    className="cursor-pointer hover:bg-primary hover:text-white transition-colors flex-shrink-0"
                                >
                                    {category.name}
                                </Badge>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            <section className="py-12">
                <div className="container mx-auto px-4">
                    {posts.length === 0 ? (
                        <div className="text-center py-16">
                            <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-muted flex items-center justify-center">
                                <BookOpen className="h-12 w-12 text-muted-foreground" />
                            </div>
                            <h3 className="text-xl font-bold mb-2">No Blog Posts Found</h3>
                            <p className="text-muted-foreground">
                                Check back later for new articles.
                            </p>
                        </div>
                    ) : (
                        <BlogGridClient posts={posts} />
                    )}
                </div>
            </section>
        </MainLayout>
    );
}
