import { BlogPost, BlogCategory } from "@/types";
import { wpRequest } from "./client";

// Get blog posts
export async function getPosts(params: {
    per_page?: number;
    page?: number;
    category?: number;
    search?: string;
} = {}): Promise<BlogPost[]> {
    const queryParams = new URLSearchParams();
    queryParams.append("_embed", "true");

    if (params.per_page) queryParams.append("per_page", String(params.per_page));
    if (params.page) queryParams.append("page", String(params.page));
    if (params.category) queryParams.append("categories", String(params.category));
    if (params.search) queryParams.append("search", params.search);

    const response = await wpRequest<BlogPost[]>(
        `/wp/v2/posts?${queryParams.toString()}`
    );

    return response.success ? response.data || [] : [];
}

// Get single post by ID
export async function getPost(id: number): Promise<BlogPost | null> {
    const response = await wpRequest<BlogPost>(`/wp/v2/posts/${id}?_embed=true`);
    return response.success ? response.data || null : null;
}

// Get post by slug
export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
    const response = await wpRequest<BlogPost[]>(
        `/wp/v2/posts?slug=${slug}&_embed=true`
    );
    if (response.success && response.data && response.data.length > 0) {
        return response.data[0];
    }
    return null;
}

// Get blog categories
export async function getPostCategories(): Promise<BlogCategory[]> {
    const response = await wpRequest<BlogCategory[]>(
        "/wp/v2/categories?per_page=50"
    );
    return response.success ? response.data || [] : [];
}

// Get recent posts
export async function getRecentPosts(limit = 5): Promise<BlogPost[]> {
    return getPosts({ per_page: limit });
}

// Lightweight slug-only fetch for generateStaticParams (no _embed, no extra fields)
export async function getPostSlugs(limit = 100): Promise<string[]> {
    const response = await wpRequest<{ slug: string }[]>(
        `/wp/v2/posts?per_page=${limit}&_fields=slug`
    );
    return response.success && response.data ? response.data.map((p) => p.slug) : [];
}

// Helper to get featured image URL
export function getFeaturedImage(post: BlogPost): string {
    if (post._embedded?.["wp:featuredmedia"]?.[0]?.source_url) {
        return post._embedded["wp:featuredmedia"][0].source_url;
    }
    return "/images/placeholder.svg";
}

// Helper to get author name
export function getAuthorName(post: BlogPost): string {
    if (post._embedded?.author?.[0]?.name) {
        return post._embedded.author[0].name;
    }
    return "AstroPlanet";
}

// Helper to format post URL
export function getPostUrl(post: BlogPost): string {
    return `/blog/${post.slug}`;
}
