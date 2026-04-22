import { Product, ProductListParams, ProductCategory } from "@/types";
import { wcRequest, buildQueryString } from "./client";

// Get all products
export async function getProducts(
    params: ProductListParams = {}
): Promise<Product[]> {
    const defaults: ProductListParams = {
        per_page: 12,
        ...params,
    };

    const query = buildQueryString(defaults as Record<string, unknown>);
    const response = await wcRequest<Product[]>(
        `/wc/v3/products${query ? `?${query}` : ""}`
    );

    return response.success ? response.data || [] : [];
}

// Get single product by ID
export async function getProduct(id: number): Promise<Product | null> {
    const response = await wcRequest<Product>(`/wc/v3/products/${id}`);
    return response.success ? response.data || null : null;
}

// Get product by slug
export async function getProductBySlug(slug: string): Promise<Product | null> {
    const response = await wcRequest<Product[]>(`/wc/v3/products?slug=${slug}`);
    if (response.success && response.data && response.data.length > 0) {
        return response.data[0];
    }
    return null;
}

// Get featured products
export async function getFeaturedProducts(limit = 4): Promise<Product[]> {
    return getProducts({ featured: true, per_page: limit });
}

// Get products on sale
export async function getSaleProducts(limit = 8): Promise<Product[]> {
    return getProducts({ on_sale: true, per_page: limit });
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
