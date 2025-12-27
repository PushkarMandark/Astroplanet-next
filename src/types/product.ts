// Product types matching WooCommerce API
export interface Product {
    id: number;
    name: string;
    slug: string;
    permalink: string;
    type: "simple" | "variable" | "grouped" | "external";
    status: "publish" | "draft" | "pending" | "private";
    featured: boolean;
    description: string;
    short_description: string;
    sku: string;
    price: string;
    regular_price: string;
    sale_price: string;
    on_sale: boolean;
    stock_status: "instock" | "outofstock" | "onbackorder";
    stock_quantity: number | null;
    categories: ProductCategory[];
    tags: ProductTag[];
    images: ProductImage[];
    attributes: ProductAttribute[];
    related_ids: number[];
    average_rating: string;
    rating_count: number;
    manage_stock: boolean;
    weight: string;
    dimensions: {
        length: string;
        width: string;
        height: string;
    };
}

export interface ProductCategory {
    id: number;
    name: string;
    slug: string;
}

export interface ProductTag {
    id: number;
    name: string;
    slug: string;
}

export interface ProductImage {
    id: number;
    src: string;
    name: string;
    alt: string;
}

export interface ProductAttribute {
    id: number;
    name: string;
    position: number;
    visible: boolean;
    variation: boolean;
    options: string[];
}

// Cart item
export interface CartItem {
    id: number;
    name: string;
    price: number;
    quantity: number;
    image: string;
    slug?: string;
}

// Product list params
export interface ProductListParams {
    per_page?: number;
    page?: number;
    search?: string;
    category?: number;
    featured?: boolean;
    on_sale?: boolean;
    orderby?: "date" | "price" | "popularity" | "rating";
    order?: "asc" | "desc";
}
