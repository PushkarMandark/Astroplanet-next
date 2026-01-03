"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { OptimizedImage } from "@/components/atoms/image";
import { Card, CardContent } from "@/components/ui/card";
import { Pagination } from "@/components/molecules/pagination";
import { Calendar, User } from "lucide-react";
import { getFeaturedImage, getPostUrl, getAuthorName } from "@/lib/api/blog";
import { BlogPost } from "@/types/blog";

interface BlogGridClientProps {
    posts: BlogPost[];
    perPage?: number;
}

export function BlogGridClient({ posts, perPage = 9 }: BlogGridClientProps) {
    const [currentPage, setCurrentPage] = useState(1);

    const totalPosts = posts.length;
    const totalPages = Math.ceil(totalPosts / perPage);

    // Get posts for current page
    const paginatedPosts = useMemo(() => {
        const startIndex = (currentPage - 1) * perPage;
        const endIndex = startIndex + perPage;
        return posts.slice(startIndex, endIndex);
    }, [posts, currentPage, perPage]);

    // Calculate display range
    const startIndex = (currentPage - 1) * perPage + 1;
    const endIndex = Math.min(currentPage * perPage, totalPosts);

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
        window.scrollTo({ top: 300, behavior: "smooth" });
    };

    return (
        <div>
            {/* Results Info */}
            <p className="text-muted-foreground mb-6">
                Showing {startIndex}-{endIndex} of {totalPosts} articles
            </p>

            {/* Posts Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {paginatedPosts.map((post) => (
                    <Link key={post.id} href={getPostUrl(post)}>
                        <Card className="h-full overflow-hidden hover:shadow-xl transition-all duration-300 group border-0 shadow-lg">
                            <div className="relative aspect-video overflow-hidden">
                                <OptimizedImage
                                    src={getFeaturedImage(post)}
                                    alt={post.title.rendered}
                                    fill
                                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
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

            {/* Pagination */}
            {totalPages > 1 && (
                <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={handlePageChange}
                    className="mt-12"
                />
            )}
        </div>
    );
}
