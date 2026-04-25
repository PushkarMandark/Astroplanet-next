import { MainLayout } from "@/components/templates/main-layout";
import { getAllPosts, getPostCategories } from "@/lib/api/blog";
import { BookOpen } from "lucide-react";
import { BlogGridClient } from "./blog-grid-client";
import { breadcrumbJsonLd } from "@/lib/structured-data";

export const metadata = {
    title: "Blog",
    description: "Read our latest articles on astrology, horoscopes, gemstones, and spiritual guidance.",
    alternates: { canonical: "/blog/" },
};

export default async function BlogPage() {
    const [posts, categories] = await Promise.all([
        getAllPosts(100, 25),
        getPostCategories(),
    ]);

    const breadcrumbSchema = breadcrumbJsonLd([
        { name: "Home", url: "/" },
        { name: "Blog", url: "/blog/" },
    ]);

    return (
        <MainLayout>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
            />
            {/* Compact Page Header */}
            <section className="bg-gradient-to-r from-primary to-secondary text-primary-foreground py-8">
                <div className="container mx-auto px-4">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                        <div>
                            <h1 className="text-3xl md:text-4xl font-bold font-heading">
                                Our Blog
                            </h1>
                            <p className="text-primary-foreground/80 text-sm md:text-base mt-1">
                                Insights on astrology, horoscopes, and spiritual guidance
                            </p>
                        </div>
                        <div className="flex items-center gap-6 text-sm">
                            <div className="flex items-center gap-2">
                                <span className="text-2xl font-bold">{posts.length}</span>
                                <span className="text-primary-foreground/70">Articles</span>
                            </div>
                            <div className="w-px h-8 bg-white/20" />
                            <div className="flex items-center gap-2">
                                <span className="text-2xl font-bold">{categories.length}</span>
                                <span className="text-primary-foreground/70">Categories</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="py-12 md:py-16">
                <div className="container mx-auto px-4">
                    {posts.length === 0 ? (
                        <div className="text-center py-16">
                            <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-br from-primary/10 to-secondary/10 flex items-center justify-center">
                                <BookOpen className="h-12 w-12 text-primary/50" />
                            </div>
                            <h3 className="text-xl font-bold mb-2">No Blog Posts Found</h3>
                            <p className="text-muted-foreground">
                                Check back later for new articles.
                            </p>
                        </div>
                    ) : (
                        <BlogGridClient posts={posts} categories={categories} />
                    )}
                </div>
            </section>
        </MainLayout>
    );
}

