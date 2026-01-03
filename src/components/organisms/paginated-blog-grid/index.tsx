"use client";

import { useState, useMemo } from "react";
import { Pagination } from "@/components/molecules/pagination";

interface BlogPost {
    id: number;
    date: string;
    title: { rendered: string };
    excerpt: { rendered: string };
    slug: string;
    _embedded?: {
        author?: Array<{ name: string }>;
        "wp:featuredmedia"?: Array<{ source_url: string }>;
    };
}

interface PaginatedBlogGridProps {
    posts: BlogPost[];
    perPage?: number;
    renderPost: (post: BlogPost) => React.ReactNode;
    className?: string;
}

export function PaginatedBlogGrid({
    posts,
    perPage = 9,
    renderPost,
    className,
}: PaginatedBlogGridProps) {
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
        <div className={className}>
            {/* Results Info */}
            {totalPosts > 0 && (
                <p className="text-muted-foreground mb-6">
                    Showing {startIndex}-{endIndex} of {totalPosts} articles
                </p>
            )}

            {/* Posts Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {paginatedPosts.map((post) => renderPost(post))}
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
