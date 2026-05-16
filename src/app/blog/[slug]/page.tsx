import { notFound } from "next/navigation";
import { getPostBySlug, getRecentPosts, getFeaturedImage, getAuthorName, getAllPostSlugs } from "@/lib/api/blog";
import { stripHtml } from "@/lib/sanitize";
import { articleJsonLd, breadcrumbJsonLd } from "@/lib/structured-data";
import { BlogPostClient } from "./BlogPostClient";
import { MainLayout } from "@/components/templates/main-layout";

interface BlogPostPageProps {
    params: Promise<{
        slug: string;
    }>;
}

export async function generateStaticParams() {
    // Omit `total` so getAllPostSlugs auto-sizes to X-WP-Total — generating a
    // static page for every published post. Capping this is what made Google
    // index a fraction of posts: sitemap.xml listed all 332 URLs, but only the
    // first 200 had a built HTML page; the rest returned 404 and were dropped.
    return await getAllPostSlugs();
}

export async function generateMetadata({ params }: BlogPostPageProps) {
    const { slug } = await params;
    const post = await getPostBySlug(slug);

    if (!post) {
        return { title: "Post Not Found" };
    }

    const yoast = post.yoast_head_json;
    const fallbackTitle = stripHtml(post.title?.rendered || "");
    const rawExcerpt = stripHtml(post.excerpt?.rendered || "");
    const fallbackDescription = (
        rawExcerpt ||
        `Read ${fallbackTitle} on AstroEshop. Authentic Vedic astrology insights and guidance.`
    ).slice(0, 160);
    const featuredImage = post._embedded?.["wp:featuredmedia"]?.[0]?.source_url;

    const description = yoast?.description || fallbackDescription;
    const ogTitle = yoast?.og_title || yoast?.title || fallbackTitle;
    const ogDescription = yoast?.og_description || description;
    const ogImage = yoast?.og_image?.[0]?.url || featuredImage;
    const twitterTitle = yoast?.twitter_title || ogTitle;
    const twitterDescription = yoast?.twitter_description || ogDescription;
    const twitterImage = yoast?.twitter_image || ogImage;

    return {
        // Yoast outputs a fully-formed page title (already includes site suffix
        // via its template), so bypass the layout-level "%s | AstroEshop" wrap.
        title: yoast?.title ? { absolute: yoast.title } : fallbackTitle,
        description,
        alternates: { canonical: `/blog/${slug}/` },
        openGraph: {
            title: ogTitle,
            description: ogDescription,
            type: "article",
            images: ogImage ? [ogImage] : undefined,
        },
        twitter: {
            title: twitterTitle,
            description: twitterDescription,
            images: twitterImage ? [twitterImage] : undefined,
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
    const breadcrumbSchema = breadcrumbJsonLd([
        { name: "Home", url: "/" },
        { name: "Blog", url: "/blog/" },
        { name: post.title?.rendered ? post.title.rendered.replace(/<[^>]*>/g, "") : "Article", url: `/blog/${post.slug}/` },
    ]);

    return (
        <MainLayout>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
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
