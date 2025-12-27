import { notFound } from "next/navigation";
import { MainLayout } from "@/components/templates/main-layout";
import { getProductBySlug, getProducts } from "@/lib/api/products";
import { ProductDetailClient } from "./ProductDetailClient";

interface ProductPageProps {
    params: Promise<{
        slug: string;
    }>;
}

export async function generateMetadata({ params }: ProductPageProps) {
    const { slug } = await params;
    const product = await getProductBySlug(slug);

    if (!product) {
        return { title: "Product Not Found" };
    }

    return {
        title: `${product.name} | AstroPlanet`,
        description: product.short_description?.replace(/<[^>]*>/g, "") || `Buy ${product.name} - authentic astrology products at AstroPlanet`,
        openGraph: {
            title: product.name,
            description: product.short_description?.replace(/<[^>]*>/g, "") || product.name,
            images: product.images?.[0]?.src ? [product.images[0].src] : [],
        }
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

    return (
        <MainLayout>
            <ProductDetailClient
                product={product}
                relatedProducts={relatedProducts}
            />
        </MainLayout>
    );
}
