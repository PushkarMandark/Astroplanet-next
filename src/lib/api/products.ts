import { Product, ProductListParams, ProductCategory } from "@/types";
import { wcRequest, buildQueryString } from "./client";

// Fields a product CARD needs — ProductCard reads id, name, slug, price,
// regular_price, sale_price, on_sale, images, categories, stock_status, and the
// cart/wishlist derive from that same set. Nothing else is rendered in a listing.
//
// A full WooCommerce product is ~16.7 KB of JSON (full description HTML, every
// attribute, variation list, and a Yoast @graph) against ~3.4 KB with this
// whitelist — verified against the live API. Listing pages serialise every
// product they fetch into the static HTML twice (SSR markup + RSC flight
// payload), which is why out/shop/index.html was 1.9 MB and 93% inline script.
// The detail page still calls getProductBySlug, which fetches the full object.
export const PRODUCT_CARD_FIELDS =
    "id,name,slug,price,regular_price,sale_price,on_sale,images,categories,stock_status";

// Get all products
export async function getProducts(
    params: ProductListParams = {}
): Promise<Product[]> {
    const { fields, ...listParams } = params;
    const defaults: Omit<ProductListParams, "fields"> = {
        per_page: 12,
        ...listParams,
    };

    const query = buildQueryString(defaults as Record<string, unknown>);
    // `_fields` is appended by hand — buildQueryString would emit it as `fields=`,
    // which WooCommerce ignores. Commas are legal unencoded in a query value.
    const qs = [query, fields ? `_fields=${fields}` : ""].filter(Boolean).join("&");
    const response = await wcRequest<Product[]>(
        `/wc/v3/products${qs ? `?${qs}` : ""}`
    );

    if (!response.success) {
        // Log loudly: an empty array here renders "No products found." straight
        // into static HTML and the build still exits 0. `npm run verify` is the
        // hard gate, but this line tells you which query died and why.
        console.error(
            `[getProducts] FAILED (${query || "no params"}): ${response.error}` +
                (response.transportFailure ? " [backend unreachable]" : "")
        );
        return [];
    }

    return response.data || [];
}

// Get single product by ID
export async function getProduct(id: number): Promise<Product | null> {
    const response = await wcRequest<Product>(`/wc/v3/products/${id}`);
    return response.success ? response.data || null : null;
}

// Get product by slug.
//
// Throws when the backend is unreachable rather than returning null. The caller
// (`/product/[slug]`) turns null into notFound(), and under `output: "export"`
// that writes the 404 page to out/product/<slug>/index.html and exits 0 — a
// transient database blip becomes a permanently dead product URL that nobody
// notices until a customer lands on it. A slug reaching this function came from
// generateStaticParams, so the product provably exists; "no data" can only mean
// the fetch failed. Failing the build is the correct outcome.
export async function getProductBySlug(slug: string): Promise<Product | null> {
    const response = await wcRequest<Product[]>(
        `/wc/v3/products?slug=${encodeURIComponent(slug)}`
    );

    if (response.transportFailure) {
        throw new Error(
            `[getProductBySlug] backend unreachable for "${slug}" after retries: ${response.error}`
        );
    }

    if (response.success && response.data && response.data.length > 0) {
        return response.data[0];
    }
    return null;
}

// Get featured products. Card fields only — these feed ProductGrid.
export async function getFeaturedProducts(limit = 4): Promise<Product[]> {
    return getProducts({ featured: true, per_page: limit, fields: PRODUCT_CARD_FIELDS });
}

// Get products on sale. Card fields only — these feed ProductGrid.
export async function getSaleProducts(limit = 8): Promise<Product[]> {
    return getProducts({ on_sale: true, per_page: limit, fields: PRODUCT_CARD_FIELDS });
}

// Search products
export async function searchProducts(query: string): Promise<Product[]> {
    return getProducts({ search: query });
}

// Get products by category
export async function getProductsByCategory(
    categoryId: number,
    params: ProductListParams = {}
): Promise<Product[]> {
    return getProducts({ category: categoryId, ...params });
}

// Fetch up to `maxTotal` products in parallel batches.
// WooCommerce returns heavy payloads (images, attributes, variations) and a single
// per_page=100 request can exceed wcRequest's 30s timeout when the API is slow.
// Splitting into parallel smaller pages keeps every request well under the limit.
export async function getAllProducts(
    maxTotal = 100,
    pageSize = 25,
    extraParams: ProductListParams = {}
): Promise<Product[]> {
    const batches = Math.ceil(maxTotal / pageSize);
    const requests: Promise<Product[]>[] = [];
    for (let page = 1; page <= batches; page++) {
        requests.push(getProducts({ ...extraParams, per_page: pageSize, page }));
    }
    const results = await Promise.all(requests);
    return results.flat().slice(0, maxTotal);
}

// Get product categories
export async function getCategories(): Promise<ProductCategory[]> {
    const response = await wcRequest<ProductCategory[]>(
        "/wc/v3/products/categories?per_page=100&hide_empty=false"
    );
    return response.success ? response.data || [] : [];
}

// Build hierarchical category tree
export function buildCategoryTree(categories: ProductCategory[]) {
    const parentCategories = categories.filter(c => c.parent === 0);
    const childCategories = categories.filter(c => c.parent !== 0);

    return parentCategories.map(parent => ({
        ...parent,
        children: childCategories.filter(child => child.parent === parent.id)
    }));
}
