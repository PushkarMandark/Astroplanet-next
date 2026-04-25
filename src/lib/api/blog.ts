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

    if (!response.success) {
        console.error("Failed to fetch blog posts:", response.error, "HTTP Code:", response.httpCode);
    }

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

// Fetch up to `maxTotal` posts in parallel batches.
// WP REST with _embed is slow (~30s for per_page=100) and hits wpRequest's timeout.
// Splitting into parallel pages of `pageSize` each keeps every request well under the limit.
export async function getAllPosts(maxTotal = 100, pageSize = 25): Promise<BlogPost[]> {
    const batches = Math.ceil(maxTotal / pageSize);
    const requests: Promise<BlogPost[]>[] = [];
    for (let page = 1; page <= batches; page++) {
        requests.push(getPosts({ per_page: pageSize, page }));
    }
    const results = await Promise.all(requests);
    return results.flat().slice(0, maxTotal);
}

// Lightweight slug-only fetch for generateStaticParams (no _embed, no extra fields)
export async function getPostSlugs(limit = 100): Promise<string[]> {
    const response = await wpRequest<{ slug: string }[]>(
        `/wp/v2/posts?per_page=${limit}&_fields=slug`
    );
    return response.success && response.data ? response.data.map((p) => p.slug) : [];
}

// Paginated slug-only fetch for generateStaticParams. WP REST caps per_page at 100,
// so to cover more than 100 posts we fan out parallel page=N requests, dedupe, and
// return the merged result. Used in /blog/[slug] where missing slugs would 404.
export async function getAllPostSlugs(
    total = 200,
    perBatch = 50
): Promise<{ slug: string }[]> {
    const batches = Math.ceil(total / perBatch);
    const requests: Promise<{ success: boolean; data?: { slug: string }[] }>[] = [];
    for (let page = 1; page <= batches; page++) {
        requests.push(
            wpRequest<{ slug: string }[]>(
                `/wp/v2/posts?_fields=slug&per_page=${perBatch}&page=${page}`
            )
        );
    }
    const results = await Promise.all(requests);
    const seen = new Set<string>();
    const slugs: { slug: string }[] = [];
    results.forEach((response, idx) => {
        if (!response.success || !response.data) {
            console.warn(
                `getAllPostSlugs: batch page=${idx + 1} failed; skipping`
            );
            return;
        }
        for (const item of response.data) {
            if (item?.slug && !seen.has(item.slug)) {
                seen.add(item.slug);
                slugs.push({ slug: item.slug });
            }
        }
    });
    return slugs;
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
    return "AstroEshop";
}

// Helper to format post URL
export function getPostUrl(post: BlogPost): string {
    return `/blog/${post.slug}`;
}
