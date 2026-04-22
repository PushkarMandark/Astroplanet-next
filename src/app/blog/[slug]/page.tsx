import { notFound } from "next/navigation";
import { getPostBySlug, getRecentPosts, getFeaturedImage, getAuthorName, getPostSlugs } from "@/lib/api/blog";
import { BlogPostClient } from "./BlogPostClient";
import { MainLayout } from "@/components/templates/main-layout";

interface BlogPostPageProps {
    params: Promise<{
        slug: string;
    }>;
}

export async function generateStaticParams() {
    const slugs = await getPostSlugs(100);
    return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: BlogPostPageProps) {
    const { slug } = await params;
    const post = await getPostBySlug(slug);

    if (!post) {
        return { title: "Post Not Found" };
    }

    return {
        title: `${post.title.rendered.replace(/<[^>]*>/g, "")} | AstroEshop`,
        description: (post.excerpt?.rendered ?? "").replace(/<[^>]*>/g, "").slice(0, 160),
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

    return (
        <MainLayout>
            <BlogPostClient
                post={post}
                recentPosts={recentPosts}
                featuredImage={featuredImage}
                authorName={authorName}
            />
        </MainLayout>
    );
}
