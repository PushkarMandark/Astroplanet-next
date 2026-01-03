"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { OptimizedImage } from "@/components/atoms/image";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Pagination } from "@/components/molecules/pagination";
import { Calendar, User, ArrowRight, Filter, Sparkles } from "lucide-react";
import { getFeaturedImage, getPostUrl, getAuthorName } from "@/lib/api/blog";
import { BlogPost, BlogCategory } from "@/types/blog";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

interface BlogGridClientProps {
    posts: BlogPost[];
    categories?: BlogCategory[];
    perPage?: number;
}

export function BlogGridClient({ posts, categories = [], perPage = 9 }: BlogGridClientProps) {
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedCategory, setSelectedCategory] = useState<string>("all");

    // Create a map of category IDs to category names
    const categoryMap = useMemo(() => {
        const map: Record<number, string> = {};
        categories.forEach((cat) => {
            map[cat.id] = cat.name;
        });
        return map;
    }, [categories]);

    // Filter posts by selected category
    const filteredPosts = useMemo(() => {
        if (selectedCategory === "all") {
            return posts;
        }
        const categoryId = parseInt(selectedCategory, 10);
        return posts.filter((post) => post.categories?.includes(categoryId));
    }, [posts, selectedCategory]);

    const totalPosts = filteredPosts.length;
    const totalPages = Math.ceil(totalPosts / perPage);

    // Get posts for current page
    const paginatedPosts = useMemo(() => {
        const startIndex = (currentPage - 1) * perPage;
        const endIndex = startIndex + perPage;
        return filteredPosts.slice(startIndex, endIndex);
    }, [filteredPosts, currentPage, perPage]);

    // Calculate display range
    const startIndex = totalPosts > 0 ? (currentPage - 1) * perPage + 1 : 0;
    const endIndex = Math.min(currentPage * perPage, totalPosts);

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
        window.scrollTo({ top: 300, behavior: "smooth" });
    };

    const handleCategoryChange = (value: string) => {
        setSelectedCategory(value);
        setCurrentPage(1); // Reset to first page when filtering
    };

    // Get first category name for a post
    const getPostCategoryName = (post: BlogPost): string | null => {
        if (post.categories && post.categories.length > 0) {
            return categoryMap[post.categories[0]] || null;
        }
        return null;
    };

    return (
        <div>
            {/* Header Row with Results Info & Category Filter */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
                <div className="flex items-center gap-3">
                    <div className="h-10 w-1 bg-gradient-to-b from-primary to-secondary rounded-full" />
                    <div>
                        <p className="text-foreground font-medium">
                            {totalPosts > 0 ? (
                                <>Showing <span className="text-primary font-bold">{startIndex}-{endIndex}</span> of <span className="text-primary font-bold">{totalPosts}</span> articles</>
                            ) : (
                                "No articles found"
                            )}
                        </p>
                        {selectedCategory !== "all" && (
                            <p className="text-sm text-muted-foreground">
                                Filtered by: {categoryMap[parseInt(selectedCategory, 10)]}
                            </p>
                        )}
                    </div>
                </div>

                {/* Category Filter Dropdown */}
                {categories.length > 0 && (
                    <div className="flex items-center gap-3">
                        <Filter className="h-4 w-4 text-muted-foreground" />
                        <Select value={selectedCategory} onValueChange={handleCategoryChange}>
                            <SelectTrigger className="w-[200px] bg-card border-border/50 shadow-md hover:shadow-lg transition-shadow">
                                <SelectValue placeholder="All Categories" />
                            </SelectTrigger>
                            <SelectContent className="bg-card border-border/50 shadow-xl">
                                <SelectItem value="all" className="cursor-pointer">
                                    <span className="flex items-center gap-2">
                                        <Sparkles className="h-4 w-4 text-primary" />
                                        All Categories
                                    </span>
                                </SelectItem>
                                {categories.map((category) => (
                                    <SelectItem
                                        key={category.id}
                                        value={String(category.id)}
                                        className="cursor-pointer"
                                    >
                                        <span className="flex items-center justify-between w-full">
                                            {category.name}
                                            <Badge variant="secondary" className="ml-2 text-xs px-1.5 py-0">
                                                {category.count}
                                            </Badge>
                                        </span>
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                )}
            </div>

            {/* Posts Grid */}
            {paginatedPosts.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {paginatedPosts.map((post, index) => {
                        const categoryName = getPostCategoryName(post);
                        return (
                            <Link key={post.id} href={getPostUrl(post)} className="group">
                                <Card
                                    className="h-full overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-500 group bg-card"
                                    style={{
                                        animationDelay: `${index * 50}ms`,
                                    }}
                                >
                                    {/* Image Container - 5:3 aspect ratio to match 1000x600 images */}
                                    <div className="relative aspect-[5/3] overflow-hidden">
                                        <OptimizedImage
                                            src={getFeaturedImage(post)}
                                            alt={post.title.rendered}
                                            fill
                                            className="object-cover transition-transform duration-700 group-hover:scale-110"
                                        />
                                        {/* Gradient Overlay */}
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500" />

                                        {/* Category Badge */}
                                        {categoryName && (
                                            <Badge
                                                className="absolute top-4 left-4 bg-primary/90 text-primary-foreground backdrop-blur-sm border-0 shadow-lg text-xs font-medium tracking-wide"
                                            >
                                                {categoryName}
                                            </Badge>
                                        )}

                                        {/* Read More Indicator (visible on hover) */}
                                        <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-2 group-hover:translate-x-0">
                                            <div className="flex items-center gap-1.5 bg-white/95 text-primary px-3 py-1.5 rounded-full text-sm font-medium shadow-lg">
                                                Read More
                                                <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                                            </div>
                                        </div>
                                    </div>

                                    {/* Content */}
                                    <CardContent className="p-6">
                                        {/* Meta Info */}
                                        <div className="flex items-center gap-4 text-xs text-muted-foreground mb-3">
                                            <span className="flex items-center gap-1.5 bg-muted/50 px-2 py-1 rounded-full">
                                                <Calendar className="h-3 w-3 text-primary" />
                                                {new Date(post.date).toLocaleDateString("en-IN", {
                                                    year: "numeric",
                                                    month: "short",
                                                    day: "numeric",
                                                })}
                                            </span>
                                            <span className="flex items-center gap-1.5">
                                                <User className="h-3 w-3 text-secondary" />
                                                {getAuthorName(post)}
                                            </span>
                                        </div>

                                        {/* Title */}
                                        <h2
                                            className="text-lg font-bold font-heading mb-3 group-hover:text-primary transition-colors duration-300 line-clamp-2 leading-tight"
                                            dangerouslySetInnerHTML={{ __html: post.title.rendered }}
                                        />

                                        {/* Excerpt */}
                                        <div
                                            className="text-muted-foreground text-sm line-clamp-2 leading-relaxed"
                                            dangerouslySetInnerHTML={{ __html: post.excerpt.rendered }}
                                        />

                                        {/* Divider & Read Indicator */}
                                        <div className="mt-4 pt-4 border-t border-border/50 flex items-center justify-between">
                                            <span className="text-xs text-muted-foreground">~5 min read</span>
                                            <span className="text-primary text-sm font-medium flex items-center gap-1 group-hover:gap-2 transition-all">
                                                Continue
                                                <ArrowRight className="h-3.5 w-3.5" />
                                            </span>
                                        </div>
                                    </CardContent>
                                </Card>
                            </Link>
                        );
                    })}
                </div>
            ) : (
                <div className="text-center py-16">
                    <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-primary/10 to-secondary/10 flex items-center justify-center">
                        <Filter className="h-8 w-8 text-primary/50" />
                    </div>
                    <h3 className="text-xl font-bold mb-2">No Posts Found</h3>
                    <p className="text-muted-foreground mb-4">
                        Try selecting a different category or clear the filter.
                    </p>
                    <button
                        onClick={() => handleCategoryChange("all")}
                        className="text-primary font-medium hover:underline"
                    >
                        Show all posts
                    </button>
                </div>
            )}

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
