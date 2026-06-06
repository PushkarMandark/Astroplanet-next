import { BlogPost, BlogCategory } from "@/types";
import { wpRequest, WP_URL } from "./client";

/**
 * Fetch the published post count from WordPress via the X-WP-Total header.
 * Used to size `generateStaticParams` and the blog listing fetch dynamically
 * so newly published posts are never silently dropped from the static build.
 * Returns null on any failure — callers should fall back to a sane default.
 */
export async function getPostCount(): Promise<number | null> {
    try {
        const url = `${WP_URL}/wp-json/wp/v2/posts?per_page=1&_fields=id&status=publish`;
        const res = await fetch(url, {
            signal: AbortSignal.timeout(15_000),
            headers: { Accept: "application/json" },
        });
        if (!res.ok) return null;
        const total = res.headers.get("X-WP-Total");
        if (!total) return null;
        const n = parseInt(total, 10);
        return Number.isFinite(n) && n > 0 ? n : null;
    } catch (err) {
        console.warn(
            `[getPostCount] failed to read X-WP-Total: ${
                err instanceof Error ? err.message : String(err)
            }`
        );
        return null;
    }
}

// Get blog posts
export async function getPosts(params: {
    per_page?: number;
    page?: number;
    category?: number;
    search?: string;
    fields?: string;
} = {}): Promise<BlogPost[]> {
    const queryParams = new URLSearchParams();
    queryParams.append("_embed", "true");

    if (params.per_page) queryParams.append("per_page", String(params.per_page));
    if (params.page) queryParams.append("page", String(params.page));
    if (params.category) queryParams.append("categories", String(params.category));
    if (params.search) queryParams.append("search", params.search);
    if (params.fields) queryParams.append("_fields", params.fields);

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

// Get post by slug.
//
// Critically distinguishes two failure modes that callers must treat differently:
//  - success + empty result → the post genuinely doesn't exist → return null
//    (the page then renders notFound(), correct for a deleted/unpublished post).
//  - !success (5xx / timeout / network, after wpRequest's internal retries) → the
//    backend is down for a slug we KNOW is published (it came from
//    generateStaticParams). Returning null here would make the page ship a 404 for
//    a LIVE post — the bug that silently broke 100+ blog links in the last build.
//    Throw instead so `next build` fails loudly and the backend gets fixed before
//    anything is deployed.
export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
    const response = await wpRequest<BlogPost[]>(
        `/wp/v2/posts?slug=${slug}&_embed=true`
    );
    if (response.success) {
        return response.data && response.data.length > 0 ? response.data[0] : null;
    }
    throw new Error(
        `getPostBySlug("${slug}") failed at build time: ${response.error ?? "unknown error"} ` +
        `(httpCode=${response.httpCode ?? "n/a"}). Refusing to ship a 404 for a live post — ` +
        `the WordPress backend (${WP_URL}) must be reachable during the build. Aborting build.`
    );
}

// Get blog categories
export async function getPostCategories(): Promise<BlogCategory[]> {
    const response = await wpRequest<BlogCategory[]>(
        "/wp/v2/categories?per_page=50"
    );
    return response.success ? response.data || [] : [];
}

// Get recent posts.
//
// Every /blog/[slug] page renders the same "recent posts" list, so under static
// export this fetch otherwise runs once PER post — 300+ identical heavy _embed
// queries that pile needless load onto the fragile shared DB (and helped tip it
// into the 5xx storm that broke the build). Memoise per build-worker process so
// it runs at most once per worker per limit. Only a successful (non-empty) result
// is cached, so a transient failure can still be retried by a later page.
const recentPostsCache = new Map<number, Promise<BlogPost[]>>();
export async function getRecentPosts(limit = 5): Promise<BlogPost[]> {
    const cached = recentPostsCache.get(limit);
    if (cached) return cached;
    const promise = getPosts({ per_page: limit }).then((posts) => {
        if (posts.length === 0) recentPostsCache.delete(limit); // don't cache failures
        return posts;
    });
    recentPostsCache.set(limit, promise);
    return promise;
}

// Fields the blog list page actually consumes — drops the heavy `content.rendered`
// payload from the request, which on a slow shared host is the difference between
// a batch finishing in 5s and timing out at 30s.
const BLOG_LIST_FIELDS =
    "id,slug,title,excerpt,date,modified,author,featured_media,categories,tags,_links,_embedded,yoast_head_json";

// The WP shared host (api.astroeshop.com) chokes on more than ~2 concurrent
// _embed=true requests — each triggers per-post media + author DB joins. Limiting
// in-flight requests keeps each batch well under the 30s wpRequest timeout.
const MAX_CONCURRENT_BATCHES = 2;

// Fetch up to `maxTotal` posts. WP REST with _embed is slow on a shared host;
// we paginate into small `pageSize` batches and run only N at a time. Logs each
// empty batch loudly so build-time failures don't silently ship an empty index.
// If `maxTotal` is omitted, queries X-WP-Total once and fetches everything so
// the static export keeps up with new posts without code edits.
export async function getAllPosts(maxTotal?: number, pageSize = 10): Promise<BlogPost[]> {
    let effectiveTotal = maxTotal;
    if (effectiveTotal === undefined) {
        const live = await getPostCount();
        effectiveTotal = live ?? 500; // generous fallback if header read fails
        console.log(
            `[getAllPosts] auto-sized to ${effectiveTotal} posts (live=${live ?? "n/a"})`
        );
    }

    const totalBatches = Math.ceil(effectiveTotal / pageSize);
    const byPage = new Map<number, BlogPost[]>();

    for (let start = 1; start <= totalBatches; start += MAX_CONCURRENT_BATCHES) {
        const end = Math.min(start + MAX_CONCURRENT_BATCHES - 1, totalBatches);
        const pages: number[] = [];
        for (let page = start; page <= end; page++) pages.push(page);
        const waveResults = await Promise.all(
            pages.map((page) => getPosts({ per_page: pageSize, page, fields: BLOG_LIST_FIELDS }))
        );
        pages.forEach((page, i) => byPage.set(page, waveResults[i]));
    }

    // wpRequest already retries 5xx/timeout internally, but the first pages (the
    // newest posts) are the most visible and the most likely to be hit during a
    // backend hiccup. Re-fetch any still-empty batch once more, sequentially,
    // before giving up — a dropped batch here silently hides real posts from the
    // public listing (the last build shipped 321/341 for exactly this reason).
    const emptyPages = [...byPage.entries()]
        .filter(([, posts]) => posts.length === 0)
        .map(([page]) => page);
    for (const page of emptyPages) {
        const retried = await getPosts({ per_page: pageSize, page, fields: BLOG_LIST_FIELDS });
        byPage.set(page, retried);
        if (retried.length === 0) {
            console.warn(
                `[getAllPosts] batch page=${page} STILL empty after retry (backend 5xx/timeout). ` +
                `Listing is missing up to ${pageSize} posts — rebuild when the backend is healthy.`
            );
        } else {
            console.log(`[getAllPosts] batch page=${page} recovered ${retried.length} posts on retry`);
        }
    }

    const posts = [...byPage.keys()]
        .sort((a, b) => a - b)
        .flatMap((page) => byPage.get(page) ?? [])
        .slice(0, effectiveTotal);
    console.log(
        `[getAllPosts] fetched ${posts.length} posts across ${totalBatches} batches ` +
        `(per_page=${pageSize}, concurrency=${MAX_CONCURRENT_BATCHES})`
    );
    return posts;
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
// return the merged result. Used in /blog/[slug] where missing slugs would 404
// — Google sees those URLs in the sitemap and can't index them if the static
// export doesn't generate the page.
//
// If `total` is omitted, queries X-WP-Total once via getPostCount() and sizes
// the fan-out to cover EVERY published post (with 25% headroom for growth
// between sitemap generation and static build). This is the safest default
// for SEO — never silently drop posts.
export async function getAllPostSlugs(
    total?: number,
    perBatch = 100
): Promise<{ slug: string }[]> {
    let effectiveTotal = total;
    if (effectiveTotal === undefined) {
        const live = await getPostCount();
        // +25% headroom so a post added between sitemap regen and `next build`
        // is still picked up. Falls back generously if X-WP-Total isn't readable.
        effectiveTotal = live ? Math.ceil(live * 1.25) : 1000;
        console.log(
            `[getAllPostSlugs] auto-sized to ${effectiveTotal} slugs (live=${live ?? "n/a"})`
        );
    }
    // WP REST caps per_page at 100.
    const safePerBatch = Math.min(Math.max(perBatch, 1), 100);
    const batches = Math.ceil(effectiveTotal / safePerBatch);
    const requests: Promise<{ success: boolean; data?: { slug: string }[] }>[] = [];
    for (let page = 1; page <= batches; page++) {
        requests.push(
            wpRequest<{ slug: string }[]>(
                `/wp/v2/posts?_fields=slug&per_page=${safePerBatch}&page=${page}&status=publish`
            )
        );
    }
    const results = await Promise.all(requests);
    const seen = new Set<string>();
    const slugs: { slug: string }[] = [];
    results.forEach((response, idx) => {
        if (!response.success || !response.data) {
            const httpCode =
                "httpCode" in response
                    ? (response as { httpCode?: number }).httpCode
                    : undefined;
            // WP returns 400 ("rest_post_invalid_page_number") when we request
            // a page past the end. That's expected when `total` overshoots the
            // live count for growth headroom — earlier batches already covered
            // every real post. Only the *real* failures need flagging.
            if (httpCode !== 400) {
                console.warn(
                    `[getAllPostSlugs] batch page=${idx + 1} failed (httpCode=${
                        httpCode ?? "n/a"
                    }); some posts will 404 — fix the upstream WP error before deploying.`
                );
            }
            return;
        }
        for (const item of response.data) {
            if (item?.slug && !seen.has(item.slug)) {
                seen.add(item.slug);
                slugs.push({ slug: item.slug });
            }
        }
    });
    console.log(
        `[getAllPostSlugs] resolved ${slugs.length} unique slugs across ${batches} batches`
    );
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
