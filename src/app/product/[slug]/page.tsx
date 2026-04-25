import { notFound } from "next/navigation";
import { MainLayout } from "@/components/templates/main-layout";
import { getProductBySlug, getProducts, getAllProducts } from "@/lib/api/products";
import { stripHtml } from "@/lib/sanitize";
import { productJsonLd, breadcrumbJsonLd } from "@/lib/structured-data";
import { ProductDetailClient } from "./ProductDetailClient";

interface ProductPageProps {
    params: Promise<{
        slug: string;
    }>;
}

export async function generateStaticParams() {
    const products = await getAllProducts(100, 25);
    return products.map((product) => ({
        slug: product.slug,
    }));
}

export async function generateMetadata({ params }: ProductPageProps) {
    const { slug } = await params;
    const product = await getProductBySlug(slug);

    if (!product) {
        return { title: "Product Not Found" };
    }

    const yoast = product.yoast_head_json;
    const fallbackTitle = product.name;
    const fallbackDescription = stripHtml(
        product.short_description ||
            `Buy ${product.name} from AstroEshop. Authentic Vedic astrology products.`
    );
    const fallbackImage = product.images?.[0]?.src;

    const description = yoast?.description || fallbackDescription;
    const ogTitle = yoast?.og_title || yoast?.title || fallbackTitle;
    const ogDescription = yoast?.og_description || description;
    const ogImage = yoast?.og_image?.[0]?.url || fallbackImage;
    const twitterTitle = yoast?.twitter_title || ogTitle;
    const twitterDescription = yoast?.twitter_description || ogDescription;
    const twitterImage = yoast?.twitter_image || ogImage;

    return {
        // Yoast outputs a fully-formed page title (already includes site suffix
        // via its template), so bypass the layout-level "%s | AstroEshop" wrap.
        title: yoast?.title ? { absolute: yoast.title } : fallbackTitle,
        description,
        alternates: { canonical: `/product/${slug}/` },
        openGraph: {
            title: ogTitle,
            description: ogDescription,
            images: ogImage ? [ogImage] : undefined,
        },
        twitter: {
            title: twitterTitle,
            description: twitterDescription,
            images: twitterImage ? [twitterImage] : undefined,
        },
    };
}

export default async function ProductPage({ params }: ProductPageProps) {
    const { slug } = await params;
    const product = await getProductBySlug(slug);

    if (!product) {
        notFound();
    }

    // Get related products from same category
    let relatedProducts: Awaited<ReturnType<typeof getProducts>> = [];
    if (product.categories?.[0]) {
        const categoryProducts = await getProducts({
            category: product.categories[0].id,
            per_page: 5
        });
        relatedProducts = categoryProducts.filter(p => p.id !== product.id).slice(0, 4);
    }

    const productSchema = productJsonLd(product);
    const breadcrumbItems: Array<{ name: string; url: string }> = [
        { name: "Home", url: "/" },
        { name: "Shop", url: "/shop/" },
    ];
    const primaryCategory = product.categories?.[0];
    if (primaryCategory) {
        breadcrumbItems.push({
            name: primaryCategory.name,
            url: `/shop/${primaryCategory.slug}/`,
        });
    }
    breadcrumbItems.push({
        name: product.name,
        url: `/product/${product.slug}/`,
    });
    const breadcrumbSchema = breadcrumbJsonLd(breadcrumbItems);

    return (
        <MainLayout>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
            />
            <ProductDetailClient
                product={product}
                relatedProducts={relatedProducts}
            />
        </MainLayout>
    );
}
