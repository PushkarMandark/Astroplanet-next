import { notFound } from "next/navigation";
import { getPostBySlug, getRecentPosts, getFeaturedImage, getAuthorName, getAllPostSlugs } from "@/lib/api/blog";
import { stripHtml } from "@/lib/sanitize";
import { articleJsonLd } from "@/lib/structured-data";
import { BlogPostClient } from "./BlogPostClient";
import { MainLayout } from "@/components/templates/main-layout";

interface BlogPostPageProps {
    params: Promise<{
        slug: string;
    }>;
}

export async function generateStaticParams() {
    return await getAllPostSlugs(200, 50);
}

export async function generateMetadata({ params }: BlogPostPageProps) {
    const { slug } = await params;
    const post = await getPostBySlug(slug);

    if (!post) {
        return { title: "Post Not Found" };
    }

    const title = stripHtml(post.title?.rendered || "");
    const rawExcerpt = stripHtml(post.excerpt?.rendered || "");
    const description = (
        rawExcerpt ||
        `Read ${title} on AstroEshop. Authentic Vedic astrology insights and guidance.`
    ).slice(0, 160);

    const featuredImage = post._embedded?.["wp:featuredmedia"]?.[0]?.source_url;

    return {
        title,
        description,
        openGraph: {
            title,
            description,
            type: "article",
            images: featuredImage ? [featuredImage] : undefined,
        },
        twitter: {
            title,
            description,
            images: featuredImage ? [featuredImage] : undefined,
        },
    };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
    const { slug } = await params;
    const [post, recentPosts] = await Promise.all([
        getPostBySlug(slug),
        getRecentPosts(5),
    ]);

    if (!post) {
        notFound();
    }

    const featuredImage = getFeaturedImage(post);
    const authorName = getAuthorName(post);
    const articleSchema = articleJsonLd(post, `/blog/${post.slug}/`);

    return (
        <MainLayout>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
            />
            <BlogPostClient
                post={post}
                recentPosts={recentPosts}
                featuredImage={featuredImage}
                authorName={authorName}
            />
        </MainLayout>
    );
}
