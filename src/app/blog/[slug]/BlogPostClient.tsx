"use client";

import { useState } from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import {
    ArrowLeft,
    Calendar,
    User,
    Clock,
    Share2,
    Heart,
    MessageCircle,
    BookOpen,
    Facebook,
    Twitter,
    Linkedin,
    Copy,
    Check,
    ChevronUp
} from "lucide-react";
import { MainLayout } from "@/components/templates/main-layout";
import { OptimizedImage } from "@/components/atoms/image";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { BlogPost } from "@/types";

interface BlogPostClientProps {
    post: BlogPost;
    recentPosts: BlogPost[];
    featuredImage: string;
    authorName: string;
}

export function BlogPostClient({ post, recentPosts, featuredImage, authorName }: BlogPostClientProps) {
    const [liked, setLiked] = useState(false);
    const [likeCount, setLikeCount] = useState(42);
    const [copied, setCopied] = useState(false);
    const [showScrollTop, setShowScrollTop] = useState(false);

    // Calculate reading time
    const wordCount = post.content.rendered.replace(/<[^>]*>/g, "").split(/\s+/).length;
    const readingTime = Math.max(1, Math.ceil(wordCount / 200));

    const handleLike = () => {
        setLiked(!liked);
        setLikeCount(liked ? likeCount - 1 : likeCount + 1);
    };

    const handleCopyLink = async () => {
        await navigator.clipboard.writeText(window.location.href);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const handleShare = (platform: string) => {
        const url = encodeURIComponent(window.location.href);
        const title = encodeURIComponent(post.title.rendered.replace(/<[^>]*>/g, ""));

        const shareUrls: Record<string, string> = {
            facebook: `https://facebook.com/sharer/sharer.php?u=${url}`,
            twitter: `https://twitter.com/intent/tweet?url=${url}&text=${title}`,
            linkedin: `https://linkedin.com/shareArticle?mini=true&url=${url}&title=${title}`,
        };

        window.open(shareUrls[platform], "_blank", "width=600,height=400");
    };

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    // Helper function for featured image
    const getPostFeaturedImage = (blogPost: BlogPost): string => {
        if (blogPost._embedded?.["wp:featuredmedia"]?.[0]?.source_url) {
            return blogPost._embedded["wp:featuredmedia"][0].source_url;
        }
        return "/images/placeholder-blog.jpg";
    };

    return (
        <MainLayout>
            {/* Hero Section - Gradient Based */}
            <section className="relative bg-gradient-to-br from-primary via-[#6b0707] to-[#3d0404] text-white py-16 md:py-24 overflow-hidden">
                {/* Decorative Elements */}
                <div className="absolute inset-0 opacity-20 bg-[radial-gradient(white_1px,transparent_1px)] bg-[size:50px_50px]" />
                <div className="absolute top-0 right-0 w-96 h-96 bg-accent/20 rounded-full blur-3xl" />
                <div className="absolute bottom-0 left-0 w-80 h-80 bg-secondary/20 rounded-full blur-3xl" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border border-white/5 rounded-full" />

                {/* Content */}
                <div className="container mx-auto px-4 relative z-10">
                    <div className="max-w-4xl mx-auto">
                        {/* Back Button */}
                        <Link
                            href="/blog"
                            className="inline-flex items-center text-white/80 hover:text-white mb-6 text-sm group transition-colors"
                        >
                            <ArrowLeft className="h-4 w-4 mr-2 group-hover:-translate-x-1 transition-transform" />
                            Back to Blog
                        </Link>

                        {/* Category Badge */}
                        <Badge className="bg-accent text-black mb-4">
                            Astrology Insights
                        </Badge>

                        {/* Title */}
                        <h1
                            className="text-4xl md:text-5xl lg:text-6xl font-bold font-serif mb-8 leading-tight"
                            dangerouslySetInnerHTML={{ __html: post.title.rendered }}
                        />

                        {/* Meta Info */}
                        <div className="flex flex-wrap items-center gap-6">
                            <div className="flex items-center gap-3">
                                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-accent to-yellow-400 flex items-center justify-center text-black font-bold text-lg">
                                    {authorName.charAt(0).toUpperCase()}
                                </div>
                                <div>
                                    <p className="font-semibold">{authorName}</p>
                                    <p className="text-xs text-white/60">Author</p>
                                </div>
                            </div>

                            <div className="hidden sm:block w-px h-8 bg-white/20" />

                            <div className="flex flex-wrap items-center gap-4 text-white/80 text-sm">
                                <div className="flex items-center gap-2 bg-white/10 px-3 py-1.5 rounded-full">
                                    <Calendar className="h-4 w-4" />
                                    {new Date(post.date).toLocaleDateString("en-IN", {
                                        year: "numeric",
                                        month: "long",
                                        day: "numeric",
                                    })}
                                </div>
                                <div className="flex items-center gap-2 bg-white/10 px-3 py-1.5 rounded-full">
                                    <Clock className="h-4 w-4" />
                                    {readingTime} min read
                                </div>
                                <div className="flex items-center gap-2 bg-white/10 px-3 py-1.5 rounded-full">
                                    <BookOpen className="h-4 w-4" />
                                    {wordCount} words
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Main Content */}
            <section className="py-12 md:py-16 bg-gradient-to-b from-gray-50 to-white">
                <div className="container mx-auto px-4 max-w-6xl">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                        {/* Floating Actions Sidebar */}
                        <aside className="hidden lg:block lg:col-span-1">
                            <div className="sticky top-32 flex flex-col items-center gap-4">
                                <Button
                                    variant="outline"
                                    size="icon"
                                    onClick={handleLike}
                                    className={`rounded-full h-12 w-12 transition-all ${liked
                                        ? "bg-red-50 border-red-200 text-red-500 hover:bg-red-100"
                                        : "hover:border-red-200 hover:text-red-500"
                                        }`}
                                >
                                    <Heart className={`h-5 w-5 ${liked ? "fill-current" : ""}`} />
                                </Button>
                                <span className="text-sm text-muted-foreground">{likeCount}</span>

                                <Separator className="w-8 my-2" />

                                <Button
                                    variant="outline"
                                    size="icon"
                                    onClick={() => handleShare("facebook")}
                                    className="rounded-full h-10 w-10 hover:bg-blue-50 hover:border-blue-300 hover:text-blue-600"
                                >
                                    <Facebook className="h-4 w-4" />
                                </Button>
                                <Button
                                    variant="outline"
                                    size="icon"
                                    onClick={() => handleShare("twitter")}
                                    className="rounded-full h-10 w-10 hover:bg-sky-50 hover:border-sky-300 hover:text-sky-500"
                                >
                                    <Twitter className="h-4 w-4" />
                                </Button>
                                <Button
                                    variant="outline"
                                    size="icon"
                                    onClick={() => handleShare("linkedin")}
                                    className="rounded-full h-10 w-10 hover:bg-blue-50 hover:border-blue-400 hover:text-blue-700"
                                >
                                    <Linkedin className="h-4 w-4" />
                                </Button>
                                <Button
                                    variant="outline"
                                    size="icon"
                                    onClick={handleCopyLink}
                                    className="rounded-full h-10 w-10"
                                >
                                    {copied ? <Check className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
                                </Button>
                            </div>
                        </aside>

                        {/* Article Content */}
                        <article className="lg:col-span-7">
                            <Card className="border-0 shadow-xl bg-white overflow-hidden">
                                <CardContent className="p-8 md:p-12">
                                    {/* Article Body */}
                                    <div
                                        className="prose prose-lg max-w-none 
                                            prose-headings:font-serif prose-headings:text-gray-900
                                            prose-h2:text-3xl prose-h2:mt-12 prose-h2:mb-6
                                            prose-h3:text-2xl prose-h3:mt-8 prose-h3:mb-4
                                            prose-p:text-gray-700 prose-p:leading-relaxed
                                            prose-a:text-primary prose-a:no-underline hover:prose-a:underline
                                            prose-strong:text-gray-900
                                            prose-blockquote:border-l-primary prose-blockquote:bg-primary/5 prose-blockquote:py-4 prose-blockquote:px-6 prose-blockquote:rounded-r-lg
                                            prose-img:rounded-xl prose-img:shadow-lg"
                                        dangerouslySetInnerHTML={{ __html: post.content.rendered }}
                                    />

                                    <Separator className="my-12" />

                                    {/* Tags */}
                                    <div className="flex flex-wrap gap-2 mb-8">
                                        <span className="text-sm text-muted-foreground mr-2">Tags:</span>
                                        {["Astrology", "Horoscope", "Zodiac", "Vedic"].map((tag) => (
                                            <Badge key={tag} variant="secondary" className="cursor-pointer hover:bg-primary hover:text-white transition-colors">
                                                {tag}
                                            </Badge>
                                        ))}
                                    </div>

                                    {/* Mobile Share Buttons */}
                                    <div className="lg:hidden">
                                        <p className="font-semibold mb-4 flex items-center gap-2">
                                            <Share2 className="h-4 w-4" />
                                            Share this article
                                        </p>
                                        <div className="flex gap-3">
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                onClick={handleLike}
                                                className={liked ? "text-red-500" : ""}
                                            >
                                                <Heart className={`h-4 w-4 mr-2 ${liked ? "fill-current" : ""}`} />
                                                {likeCount}
                                            </Button>
                                            <Button variant="outline" size="sm" onClick={() => handleShare("facebook")}>
                                                <Facebook className="h-4 w-4" />
                                            </Button>
                                            <Button variant="outline" size="sm" onClick={() => handleShare("twitter")}>
                                                <Twitter className="h-4 w-4" />
                                            </Button>
                                            <Button variant="outline" size="sm" onClick={handleCopyLink}>
                                                {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                                            </Button>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Author Card */}
                            <Card className="mt-8 border-0 shadow-lg overflow-hidden">
                                <CardContent className="p-6">
                                    <div className="flex items-start gap-4">
                                        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white text-2xl font-bold">
                                            {authorName.charAt(0).toUpperCase()}
                                        </div>
                                        <div className="flex-1">
                                            <h3 className="font-bold text-lg">{authorName}</h3>
                                            <p className="text-sm text-muted-foreground mb-3">
                                                Vedic Astrologer & Spiritual Guide
                                            </p>
                                            <p className="text-sm text-gray-600">
                                                Expert in Vedic astrology with over 15 years of experience helping people discover their cosmic path.
                                            </p>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </article>

                        {/* Sidebar */}
                        <aside className="lg:col-span-4">
                            <div className="sticky top-24 space-y-6">
                                {/* Newsletter CTA */}
                                <Card className="border-0 shadow-lg bg-gradient-to-br from-primary to-[#5c0606] text-white overflow-hidden">
                                    <CardContent className="p-6 relative">
                                        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl" />
                                        <h3 className="font-bold font-serif text-xl mb-2 relative">
                                            Get Daily Insights
                                        </h3>
                                        <p className="text-white/80 text-sm mb-4 relative">
                                            Subscribe to receive daily horoscopes and spiritual guidance.
                                        </p>
                                        <div className="relative space-y-3">
                                            <input
                                                type="email"
                                                placeholder="Enter your email"
                                                className="w-full px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-accent"
                                            />
                                            <Button className="w-full bg-accent text-black hover:bg-accent/90 font-semibold">
                                                Subscribe Free
                                            </Button>
                                        </div>
                                    </CardContent>
                                </Card>

                                {/* Recent Posts */}
                                <Card className="border-0 shadow-lg">
                                    <CardContent className="pt-6">
                                        <h3 className="font-bold font-serif text-lg mb-4 flex items-center gap-2">
                                            <BookOpen className="h-5 w-5 text-primary" />
                                            Recent Posts
                                        </h3>
                                        <div className="space-y-4">
                                            {recentPosts
                                                .filter((p: BlogPost) => p.id !== post.id)
                                                .slice(0, 4)
                                                .map((recentPost: BlogPost) => (
                                                    <Link
                                                        key={recentPost.id}
                                                        href={`/blog/${recentPost.slug}`}
                                                        className="flex gap-4 group p-2 -mx-2 rounded-lg hover:bg-gray-50 transition-colors"
                                                    >
                                                        <div className="relative w-20 h-20 rounded-lg overflow-hidden flex-shrink-0">
                                                            <OptimizedImage
                                                                src={getPostFeaturedImage(recentPost)}
                                                                alt={recentPost.title.rendered}
                                                                fill
                                                                className="object-cover group-hover:scale-110 transition-transform duration-300"
                                                            />
                                                        </div>
                                                        <div className="flex-1 min-w-0">
                                                            <h4
                                                                className="text-sm font-semibold line-clamp-2 group-hover:text-primary transition-colors"
                                                                dangerouslySetInnerHTML={{ __html: recentPost.title.rendered }}
                                                            />
                                                            <p className="text-xs text-muted-foreground mt-2 flex items-center gap-1">
                                                                <Calendar className="h-3 w-3" />
                                                                {new Date(recentPost.date).toLocaleDateString("en-IN", {
                                                                    month: "short",
                                                                    day: "numeric",
                                                                })}
                                                            </p>
                                                        </div>
                                                    </Link>
                                                ))}
                                        </div>
                                    </CardContent>
                                </Card>

                                {/* Services CTA */}
                                <Card className="border-0 shadow-lg overflow-hidden">
                                    <div className="h-32 bg-gradient-to-r from-accent/30 to-secondary/30 flex items-center justify-center">
                                        <span className="text-6xl">✨</span>
                                    </div>
                                    <CardContent className="p-6 text-center">
                                        <h3 className="font-bold font-serif text-lg mb-2">
                                            Need Personal Guidance?
                                        </h3>
                                        <p className="text-sm text-muted-foreground mb-4">
                                            Get a personalized reading from our expert astrologers.
                                        </p>
                                        <Button asChild className="w-full bg-gradient-to-r from-primary to-primary/80">
                                            <Link href="/services">
                                                Explore Services
                                            </Link>
                                        </Button>
                                    </CardContent>
                                </Card>
                            </div>
                        </aside>
                    </div>
                </div>
            </section>

            {/* Scroll to Top Button */}
            <button
                onClick={scrollToTop}
                className="fixed bottom-8 right-8 w-12 h-12 bg-primary text-white rounded-full shadow-lg flex items-center justify-center hover:bg-primary/90 transition-all hover:scale-110 z-50"
            >
                <ChevronUp className="h-6 w-6" />
            </button>
        </MainLayout>
    );
}
