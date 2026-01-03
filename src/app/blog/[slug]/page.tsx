import { notFound } from "next/navigation";
import { getPostBySlug, getRecentPosts, getFeaturedImage, getAuthorName, getPosts } from "@/lib/api/blog";
import { BlogPostClient } from "./BlogPostClient";

interface BlogPostPageProps {
    params: Promise<{
        slug: string;
    }>;
}

export async function generateStaticParams() {
    const posts = await getPosts({ per_page: 100 });
    return posts.map((post) => ({
        slug: post.slug,
    }));
}

export async function generateMetadata({ params }: BlogPostPageProps) {
    const { slug } = await params;
    const post = await getPostBySlug(slug);

    if (!post) {
        return { title: "Post Not Found" };
    }

    return {
        title: `${post.title.rendered.replace(/<[^>]*>/g, "")} | AstroPlanet`,
        description: post.excerpt.rendered.replace(/<[^>]*>/g, "").slice(0, 160),
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
        <BlogPostClient
            post={post}
            recentPosts={recentPosts}
            featuredImage={featuredImage}
            authorName={authorName}
        />
    );
}
