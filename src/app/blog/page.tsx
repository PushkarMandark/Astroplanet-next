import Link from "next/link";
import { MainLayout } from "@/components/templates/main-layout";
import { OptimizedImage } from "@/components/atoms/image";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { getPosts, getPostCategories, getFeaturedImage, getPostUrl, getAuthorName } from "@/lib/api/blog";
import { Calendar, User } from "lucide-react";

export const metadata = {
    title: "Blog",
    description: "Read our latest articles on astrology, horoscopes, gemstones, and spiritual guidance.",
};

export default async function BlogPage() {
    const [posts, categories] = await Promise.all([
        getPosts({ per_page: 12 }),
        getPostCategories(),
    ]);

    return (
        <MainLayout>
            {/* Page Header */}
            <section className="bg-gradient-to-br from-primary to-secondary text-primary-foreground py-16">
                <div className="container mx-auto px-4 text-center">
                    <h1 className="text-4xl md:text-5xl font-bold font-heading mb-4">
                        Blog
                    </h1>
                    <p className="text-primary-foreground/80 max-w-2xl mx-auto">
                        Explore articles on astrology, horoscopes, gemstones, and spiritual guidance
                    </p>
                </div>
            </section>

            <section className="py-12">
                <div className="container mx-auto px-4">
                    {posts.length === 0 ? (
                        <div className="text-center py-12">
                            <p className="text-muted-foreground">No blog posts found.</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {posts.map((post) => (
                                <Link key={post.id} href={getPostUrl(post)}>
                                    <Card className="h-full overflow-hidden hover:shadow-lg transition-shadow group">
                                        <div className="relative aspect-video overflow-hidden">
                                            <OptimizedImage
                                                src={getFeaturedImage(post)}
                                                alt={post.title.rendered}
                                                fill
                                                className="object-cover transition-transform group-hover:scale-105"
                                            />
                                        </div>
                                        <CardContent className="p-6">
                                            <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                                                <span className="flex items-center gap-1">
                                                    <Calendar className="h-4 w-4" />
                                                    {new Date(post.date).toLocaleDateString("en-IN", {
                                                        year: "numeric",
                                                        month: "short",
                                                        day: "numeric",
                                                    })}
                                                </span>
                                                <span className="flex items-center gap-1">
                                                    <User className="h-4 w-4" />
                                                    {getAuthorName(post)}
                                                </span>
                                            </div>
                                            <h2
                                                className="text-xl font-bold font-heading mb-2 group-hover:text-primary transition-colors line-clamp-2"
                                                dangerouslySetInnerHTML={{ __html: post.title.rendered }}
                                            />
                                            <div
                                                className="text-muted-foreground text-sm line-clamp-3"
                                                dangerouslySetInnerHTML={{ __html: post.excerpt.rendered }}
                                            />
                                        </CardContent>
                                    </Card>
                                </Link>
                            ))}
                        </div>
                    )}
                </div>
            </section>
        </MainLayout>
    );
}
