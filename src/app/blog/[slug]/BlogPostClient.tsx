"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
    ArrowLeft,
    Calendar,
    User,
    Clock,
    Share2,
    Heart,
    Facebook,
    Twitter,
    Linkedin,
    Copy,
    Check,
    ChevronUp,
    BookOpen,
    List,
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

interface TOCItem {
    id: string;
    text: string;
    level: number;
}

export function BlogPostClient({ post, recentPosts, featuredImage, authorName }: BlogPostClientProps) {
    const [liked, setLiked] = useState(false);
    const [likeCount, setLikeCount] = useState(42);
    const [copied, setCopied] = useState(false);
    const [showScrollTop, setShowScrollTop] = useState(false);
    const [activeSection, setActiveSection] = useState("");
    const [tocItems, setTocItems] = useState<TOCItem[]>([]);
    const [showTOC, setShowTOC] = useState(false);

    // Calculate reading time
    const wordCount = post.content.rendered.replace(/<[^>]*>/g, "").split(/\s+/).length;
    const readingTime = Math.max(1, Math.ceil(wordCount / 200));

    // Extract table of contents from headings
    useEffect(() => {
        const parser = new DOMParser();
        const doc = parser.parseFromString(post.content.rendered, "text/html");
        const headings = doc.querySelectorAll("h2, h3");
        const items: TOCItem[] = [];

        headings.forEach((heading, index) => {
            const id = `section-${index}`;
            const text = heading.textContent || "";
            const level = parseInt(heading.tagName.charAt(1));
            items.push({ id, text, level });
        });

        setTocItems(items);
    }, [post.content.rendered]);

    // Handle scroll to show/hide scroll-to-top button
    useEffect(() => {
        const handleScroll = () => {
            setShowScrollTop(window.scrollY > 500);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Process content to add IDs to headings
    const processedContent = post.content.rendered.replace(
        /<h([23])([^>]*)>(.*?)<\/h\1>/gi,
        (match, level, attrs, content, offset) => {
            const index = (post.content.rendered.substring(0, offset).match(/<h[23]/g) || []).length;
            return `<h${level}${attrs} id="section-${index}">${content}</h${level}>`;
        }
    );

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

    const scrollToSection = (id: string) => {
        const element = document.getElementById(id);
        if (element) {
            const offset = 100;
            const y = element.getBoundingClientRect().top + window.pageYOffset - offset;
            window.scrollTo({ top: y, behavior: "smooth" });
            setShowTOC(false);
        }
    };

    // Helper function for featured image
    const getPostFeaturedImage = (blogPost: BlogPost): string => {
        if (blogPost._embedded?.["wp:featuredmedia"]?.[0]?.source_url) {
            return blogPost._embedded["wp:featuredmedia"][0].source_url;
        }
        return "/images/placeholder.svg";
    };

    return (
        <MainLayout>
            {/* Hero Section */}
            <section className="relative bg-gradient-to-br from-primary via-[#6b0707] to-[#3d0404] text-white py-12 md:py-16 overflow-hidden">
                {/* Decorative Elements */}
                <div className="absolute inset-0 opacity-10 bg-[radial-gradient(white_1px,transparent_1px)] bg-[size:50px_50px]" />
                <div className="absolute top-0 right-0 w-64 h-64 bg-accent/20 rounded-full blur-3xl" />
                <div className="absolute bottom-0 left-0 w-48 h-48 bg-secondary/20 rounded-full blur-3xl" />

                {/* Content */}
                <div className="container mx-auto px-4 relative z-10">
                    <div className="max-w-4xl mx-auto">
                        {/* Back Button */}
                        <Link
                            href="/blog"
                            className="inline-flex items-center text-white/80 hover:text-white mb-4 text-sm group transition-colors"
                        >
                            <ArrowLeft className="h-4 w-4 mr-2 group-hover:-translate-x-1 transition-transform" />
                            Back to Blog
                        </Link>

                        {/* Category Badge */}
                        <Badge className="bg-accent text-black mb-3">
                            Astrology Insights
                        </Badge>

                        {/* Title */}
                        <h1
                            className="text-3xl md:text-4xl lg:text-5xl font-bold font-serif mb-6 leading-tight"
                            dangerouslySetInnerHTML={{ __html: post.title.rendered }}
                        />

                        {/* Meta Info */}
                        <div className="flex flex-wrap items-center gap-4">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-accent to-yellow-400 flex items-center justify-center text-black font-bold">
                                    {authorName.charAt(0).toUpperCase()}
                                </div>
                                <div>
                                    <p className="font-medium text-sm">{authorName}</p>
                                    <p className="text-xs text-white/60">Author</p>
                                </div>
                            </div>

                            <div className="hidden sm:block w-px h-8 bg-white/20" />

                            <div className="flex flex-wrap items-center gap-3 text-white/80 text-xs">
                                <div className="flex items-center gap-1.5 bg-white/10 px-3 py-1.5 rounded-full">
                                    <Calendar className="h-3.5 w-3.5" />
                                    {new Date(post.date).toLocaleDateString("en-IN", {
                                        year: "numeric",
                                        month: "short",
                                        day: "numeric",
                                    })}
                                </div>
                                <div className="flex items-center gap-1.5 bg-white/10 px-3 py-1.5 rounded-full">
                                    <Clock className="h-3.5 w-3.5" />
                                    {readingTime} min read
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Featured Image */}
            {featuredImage && featuredImage !== "/images/placeholder.svg" && (
                <div className="container mx-auto px-4 -mt-8 relative z-20">
                    <div className="max-w-4xl mx-auto">
                        <div className="relative aspect-[21/9] rounded-2xl overflow-hidden shadow-2xl">
                            <OptimizedImage
                                src={featuredImage}
                                alt={post.title.rendered.replace(/<[^>]*>/g, "")}
                                fill
                                className="object-cover"
                                priority
                            />
                        </div>
                    </div>
                </div>
            )}

            {/* Main Content */}
            <section className="py-12 md:py-16">
                <div className="container mx-auto px-4">
                    <div className="max-w-4xl mx-auto">
                        <div className="flex gap-8">
                            {/* Table of Contents - Desktop Sidebar */}
                            {tocItems.length > 2 && (
                                <aside className="hidden xl:block w-64 flex-shrink-0">
                                    <div className="sticky top-24">
                                        <Card className="border-0 shadow-md">
                                            <CardContent className="p-4">
                                                <h3 className="font-semibold text-sm mb-3 flex items-center gap-2 text-muted-foreground">
                                                    <List className="h-4 w-4" />
                                                    Table of Contents
                                                </h3>
                                                <nav className="space-y-1">
                                                    {tocItems.map((item) => (
                                                        <button
                                                            key={item.id}
                                                            onClick={() => scrollToSection(item.id)}
                                                            className={`block text-left text-sm py-1.5 px-2 rounded transition-colors w-full hover:bg-muted ${item.level === 3 ? "pl-4 text-muted-foreground" : "font-medium"
                                                                } ${activeSection === item.id ? "bg-primary/10 text-primary" : ""}`}
                                                        >
                                                            {item.text}
                                                        </button>
                                                    ))}
                                                </nav>
                                            </CardContent>
                                        </Card>

                                        {/* Share Sidebar */}
                                        <div className="mt-6 flex flex-col items-center gap-3">
                                            <span className="text-xs text-muted-foreground">Share</span>
                                            <div className="flex flex-col gap-2">
                                                <Button
                                                    variant="outline"
                                                    size="icon"
                                                    onClick={handleLike}
                                                    className={`rounded-full h-10 w-10 transition-all ${liked
                                                        ? "bg-red-50 border-red-200 text-red-500 hover:bg-red-100"
                                                        : "hover:border-red-200 hover:text-red-500"
                                                        }`}
                                                >
                                                    <Heart className={`h-4 w-4 ${liked ? "fill-current" : ""}`} />
                                                </Button>
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
                                                    onClick={handleCopyLink}
                                                    className="rounded-full h-10 w-10"
                                                >
                                                    {copied ? <Check className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                </aside>
                            )}

                            {/* Article Content */}
                            <article className="flex-1 min-w-0">
                                {/* Mobile TOC Toggle */}
                                {tocItems.length > 2 && (
                                    <div className="xl:hidden mb-6">
                                        <Button
                                            variant="outline"
                                            onClick={() => setShowTOC(!showTOC)}
                                            className="w-full justify-between"
                                        >
                                            <span className="flex items-center gap-2">
                                                <List className="h-4 w-4" />
                                                Table of Contents
                                            </span>
                                            <span className="text-muted-foreground text-xs">
                                                {tocItems.length} sections
                                            </span>
                                        </Button>
                                        {showTOC && (
                                            <Card className="mt-2 border-0 shadow-md">
                                                <CardContent className="p-4">
                                                    <nav className="space-y-1">
                                                        {tocItems.map((item) => (
                                                            <button
                                                                key={item.id}
                                                                onClick={() => scrollToSection(item.id)}
                                                                className={`block text-left text-sm py-2 px-3 rounded transition-colors w-full hover:bg-muted ${item.level === 3 ? "pl-6 text-muted-foreground" : "font-medium"
                                                                    }`}
                                                            >
                                                                {item.text}
                                                            </button>
                                                        ))}
                                                    </nav>
                                                </CardContent>
                                            </Card>
                                        )}
                                    </div>
                                )}

                                {/* Article Body with clean, readable typography */}
                                <div
                                    className="blog-content"
                                    style={{
                                        fontSize: '19px',
                                        lineHeight: '2',
                                        color: '#374151',
                                        letterSpacing: '0.01em',
                                    }}
                                    dangerouslySetInnerHTML={{ __html: processedContent }}
                                />

                                {/* Global styles for blog content */}
                                <style jsx global>{`
                                    .blog-content p {
                                        margin-bottom: 1.75rem;
                                        text-align: justify;
                                        text-justify: inter-word;
                                    }
                                    
                                    .blog-content h2 {
                                        font-size: 1.875rem;
                                        font-weight: 700;
                                        color: #1f2937;
                                        margin-top: 3rem;
                                        margin-bottom: 1.25rem;
                                        padding-bottom: 0.75rem;
                                        border-bottom: 3px solid #EAB308;
                                        font-family: var(--font-heading);
                                    }
                                    
                                    .blog-content h3 {
                                        font-size: 1.5rem;
                                        font-weight: 600;
                                        color: #8B0000;
                                        margin-top: 2.5rem;
                                        margin-bottom: 1rem;
                                        padding-left: 1rem;
                                        border-left: 4px solid #EAB308;
                                        font-family: var(--font-heading);
                                    }
                                    
                                    .blog-content h4 {
                                        font-size: 1.25rem;
                                        font-weight: 600;
                                        color: #374151;
                                        margin-top: 2rem;
                                        margin-bottom: 0.75rem;
                                    }
                                    
                                    .blog-content ul,
                                    .blog-content ol {
                                        margin: 1.5rem 0;
                                        padding-left: 0;
                                    }
                                    
                                    .blog-content ul li,
                                    .blog-content ol li {
                                        margin-bottom: 1rem;
                                        padding-left: 2rem;
                                        position: relative;
                                        line-height: 1.8;
                                    }
                                    
                                    .blog-content ul li::before {
                                        content: "★";
                                        position: absolute;
                                        left: 0;
                                        color: #EAB308;
                                        font-size: 0.875rem;
                                    }
                                    
                                    .blog-content ol {
                                        counter-reset: list-counter;
                                    }
                                    
                                    .blog-content ol li {
                                        counter-increment: list-counter;
                                        padding-left: 3rem;
                                    }
                                    
                                    .blog-content ol li::before {
                                        content: counter(list-counter);
                                        position: absolute;
                                        left: 0;
                                        width: 1.75rem;
                                        height: 1.75rem;
                                        background: linear-gradient(135deg, #8B0000, #6b0000);
                                        color: white;
                                        border-radius: 50%;
                                        display: flex;
                                        align-items: center;
                                        justify-content: center;
                                        font-size: 0.875rem;
                                        font-weight: 600;
                                        top: 0.25rem;
                                    }
                                    
                                    .blog-content strong {
                                        color: #1f2937;
                                        font-weight: 700;
                                        background: rgba(234, 179, 8, 0.15);
                                        padding: 0.125rem 0.375rem;
                                        border-radius: 0.25rem;
                                    }
                                    
                                    .blog-content a {
                                        color: #8B0000;
                                        text-decoration: none;
                                        border-bottom: 2px solid rgba(139, 0, 0, 0.3);
                                        transition: all 0.2s;
                                    }
                                    
                                    .blog-content a:hover {
                                        border-bottom-color: #8B0000;
                                    }
                                    
                                    .blog-content blockquote {
                                        margin: 2rem 0;
                                        padding: 1.5rem 2rem;
                                        background: linear-gradient(135deg, rgba(139, 0, 0, 0.08), rgba(234, 179, 8, 0.05));
                                        border-left: 4px solid #8B0000;
                                        border-radius: 0 1rem 1rem 0;
                                        font-style: italic;
                                        font-size: 1.125rem;
                                    }
                                    
                                    .blog-content img {
                                        border-radius: 1rem;
                                        box-shadow: 0 10px 25px rgba(0,0,0,0.1);
                                        margin: 2rem 0;
                                    }
                                    
                                    .blog-content hr {
                                        border: none;
                                        height: 2px;
                                        background: linear-gradient(to right, transparent, rgba(139, 0, 0, 0.3), transparent);
                                        margin: 3rem 0;
                                    }
                                    
                                    /* First letter drop cap */
                                    .blog-content > p:first-of-type::first-letter {
                                        float: left;
                                        font-size: 4rem;
                                        line-height: 1;
                                        font-weight: 700;
                                        color: #8B0000;
                                        margin-right: 0.75rem;
                                        margin-top: 0.25rem;
                                        font-family: var(--font-heading);
                                    }
                                `}</style>

                                <Separator className="my-10" />

                                {/* Tags */}
                                <div className="flex flex-wrap gap-2 mb-8">
                                    <span className="text-sm text-muted-foreground mr-2">Tags:</span>
                                    {["Astrology", "Horoscope", "Zodiac", "Vedic", "Love Marriage"].map((tag) => (
                                        <Badge
                                            key={tag}
                                            variant="secondary"
                                            className="cursor-pointer hover:bg-primary hover:text-white transition-colors"
                                        >
                                            {tag}
                                        </Badge>
                                    ))}
                                </div>

                                {/* Mobile Share Buttons */}
                                <div className="xl:hidden mb-8">
                                    <p className="font-semibold mb-4 flex items-center gap-2">
                                        <Share2 className="h-4 w-4" />
                                        Share this article
                                    </p>
                                    <div className="flex flex-wrap gap-3">
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
                                            <Facebook className="h-4 w-4 mr-2" />
                                            Facebook
                                        </Button>
                                        <Button variant="outline" size="sm" onClick={() => handleShare("twitter")}>
                                            <Twitter className="h-4 w-4 mr-2" />
                                            Twitter
                                        </Button>
                                        <Button variant="outline" size="sm" onClick={handleCopyLink}>
                                            {copied ? <Check className="h-4 w-4 mr-2" /> : <Copy className="h-4 w-4 mr-2" />}
                                            {copied ? "Copied!" : "Copy Link"}
                                        </Button>
                                    </div>
                                </div>

                                {/* Author Card */}
                                <Card className="border-0 shadow-lg overflow-hidden bg-gradient-to-br from-gray-50 to-white">
                                    <CardContent className="p-6">
                                        <div className="flex items-start gap-4">
                                            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white text-2xl font-bold flex-shrink-0">
                                                {authorName.charAt(0).toUpperCase()}
                                            </div>
                                            <div className="flex-1">
                                                <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Written by</p>
                                                <h3 className="font-bold text-lg">{authorName}</h3>
                                                <p className="text-sm text-primary mb-2">
                                                    Vedic Astrologer & Spiritual Guide
                                                </p>
                                                <p className="text-sm text-gray-600 leading-relaxed">
                                                    Expert in Vedic astrology with over 15 years of experience helping people discover their cosmic path and make informed decisions about love, career, and life.
                                                </p>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            </article>
                        </div>
                    </div>
                </div>
            </section>

            {/* Related Posts */}
            <section className="py-12 bg-gray-50">
                <div className="container mx-auto px-4">
                    <div className="max-w-4xl mx-auto">
                        <h2 className="text-2xl font-bold font-serif mb-8 flex items-center gap-2">
                            <BookOpen className="h-6 w-6 text-primary" />
                            Related Articles
                        </h2>
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {recentPosts
                                .filter((p: BlogPost) => p.id !== post.id)
                                .slice(0, 3)
                                .map((recentPost: BlogPost) => (
                                    <Link
                                        key={recentPost.id}
                                        href={`/blog/${recentPost.slug}`}
                                        className="group"
                                    >
                                        <Card className="h-full border-0 shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden">
                                            <div className="relative aspect-video overflow-hidden">
                                                <OptimizedImage
                                                    src={getPostFeaturedImage(recentPost)}
                                                    alt={recentPost.title.rendered}
                                                    fill
                                                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                                                />
                                            </div>
                                            <CardContent className="p-4">
                                                <h4
                                                    className="font-semibold line-clamp-2 group-hover:text-primary transition-colors"
                                                    dangerouslySetInnerHTML={{ __html: recentPost.title.rendered }}
                                                />
                                                <p className="text-xs text-muted-foreground mt-2 flex items-center gap-1">
                                                    <Calendar className="h-3 w-3" />
                                                    {new Date(recentPost.date).toLocaleDateString("en-IN", {
                                                        month: "short",
                                                        day: "numeric",
                                                        year: "numeric",
                                                    })}
                                                </p>
                                            </CardContent>
                                        </Card>
                                    </Link>
                                ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Newsletter CTA */}
            <section className="py-12 bg-gradient-to-br from-primary via-[#6b0707] to-[#3d0404] text-white">
                <div className="container mx-auto px-4">
                    <div className="max-w-2xl mx-auto text-center">
                        <h2 className="text-2xl md:text-3xl font-bold font-serif mb-4">
                            Enjoyed this article?
                        </h2>
                        <p className="text-white/80 mb-6">
                            Subscribe to get weekly astrology insights and exclusive content delivered to your inbox.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                            <input
                                type="email"
                                placeholder="Enter your email"
                                className="flex-1 px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-accent"
                            />
                            <Button className="bg-accent text-black hover:bg-accent/90 font-semibold px-6">
                                Subscribe
                            </Button>
                        </div>
                    </div>
                </div>
            </section>

            {/* Scroll to Top Button */}
            {showScrollTop && (
                <button
                    onClick={scrollToTop}
                    className="fixed bottom-8 right-8 w-12 h-12 bg-primary text-white rounded-full shadow-lg flex items-center justify-center hover:bg-primary/90 transition-all hover:scale-110 z-50"
                    aria-label="Scroll to top"
                >
                    <ChevronUp className="h-6 w-6" />
                </button>
            )}
        </MainLayout>
    );
}
