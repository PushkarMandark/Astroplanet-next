import { MainLayout } from "@/components/templates/main-layout";
import { PaginatedProductGrid } from "@/components/organisms/paginated-product-grid";
import { getProducts, getCategories, buildCategoryTree } from "@/lib/api/products";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { notFound } from "next/navigation";
import { decodeHtmlEntities } from "@/lib/utils/decode";
import {
    Gem,
    LayoutGrid,
    Package,
    ChevronRight,
    SlidersHorizontal,
    Phone,
} from "lucide-react";
import { categoryIcons } from "@/lib/category-icons";
import { ALL_PRODUCTS_FETCH_LIMIT } from "@/lib/constants";
import { siteConfig } from "@/config/site";

interface CategoryPageProps {
    params: Promise<{ category: string }>;
}

export async function generateStaticParams() {
    const categories = await getCategories();
    return categories.map((category) => ({
        category: category.slug,
    }));
}

export async function generateMetadata({ params }: CategoryPageProps) {
    const { category } = await params;
    const categories = await getCategories();
    const categoryData = categories.find(c => c.slug === category);

    if (!categoryData) {
        return { title: "Category Not Found" };
    }

    return {
        title: `${categoryData.name} | Shop`,
        description: `Browse our collection of ${categoryData.name.toLowerCase()} - authentic astrology products and spiritual items.`,
    };
}

export default async function CategoryPage({ params }: CategoryPageProps) {
    const { category: categorySlug } = await params;

    const categories = await getCategories();
    const selectedCategory = categories.find(c => c.slug === categorySlug);

    if (!selectedCategory) {
        notFound();
    }

    const products = await getProducts({
        per_page: ALL_PRODUCTS_FETCH_LIMIT,
        category: selectedCategory.id,
    });

    const categoryTree = buildCategoryTree(categories);

    return (
        <MainLayout>
            {/* Hero */}
            <section className="relative bg-primary text-white overflow-hidden">
                <div className="absolute inset-0">
                    <div className="absolute top-1/4 left-10 w-48 h-48 bg-white/5 rounded-full blur-3xl" />
                    <div className="absolute bottom-0 right-10 w-64 h-64 bg-accent/10 rounded-full blur-3xl" />
                </div>
                <div className="container mx-auto px-4 relative z-10 py-12 md:py-16">
                    <div className="max-w-2xl">
                        <nav className="flex items-center gap-1.5 text-white/50 text-sm mb-4">
                            <Link href="/" className="hover:text-white/80 transition-colors">Home</Link>
                            <ChevronRight className="h-3.5 w-3.5" />
                            <Link href="/shop" className="hover:text-white/80 transition-colors">Shop</Link>
                            <ChevronRight className="h-3.5 w-3.5" />
                            <span className="text-white">{decodeHtmlEntities(selectedCategory.name)}</span>
                        </nav>
                        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold font-heading mb-2">
                            {decodeHtmlEntities(selectedCategory.name)}
                        </h1>
                        <p className="text-white/60 text-base">
                            {products.length} products in this collection
                        </p>
                    </div>
                </div>
            </section>

            {/* Main Content */}
            <section className="py-8">
                <div className="container mx-auto px-4">
                    <div className="flex flex-col lg:flex-row gap-8">
                        {/* Sidebar */}
                        <aside className="w-full lg:w-64 shrink-0">
                            <div className="lg:sticky lg:top-36 space-y-6">
                                <div>
                                    <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider flex items-center gap-2 mb-3 px-1">
                                        <SlidersHorizontal className="h-4 w-4" />
                                        Categories
                                    </h3>
                                    <nav className="space-y-0.5">
                                        <Link href="/shop" className="block">
                                            <div className="flex items-center justify-between px-3 py-2.5 rounded-lg hover:bg-gray-50 text-sm font-medium text-gray-700 transition-colors">
                                                <span className="flex items-center gap-2">
                                                    <LayoutGrid className="h-4 w-4" />
                                                    All Products
                                                </span>
                                                <ChevronRight className="h-3.5 w-3.5 text-gray-300" />
                                            </div>
                                        </Link>
                                        {categoryTree.map((parent) => (
                                            <div key={parent.id}>
                                                <Link href={`/shop/${parent.slug}`} className="block">
                                                    <div className={`flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                                                        parent.slug === categorySlug
                                                            ? "bg-primary/5 text-primary"
                                                            : "text-gray-700 hover:bg-gray-50"
                                                    }`}>
                                                        <span className="flex items-center gap-2">
                                                            {categoryIcons[parent.slug] || categoryIcons.default}
                                                            <span className="truncate">{decodeHtmlEntities(parent.name)}</span>
                                                        </span>
                                                        <span className="text-xs text-gray-400">{parent.count}</span>
                                                    </div>
                                                </Link>
                                                {parent.children && parent.children.length > 0 && (
                                                    <div className="ml-6 border-l border-gray-100 pl-3 space-y-0.5 mt-0.5">
                                                        {parent.children.map((child) => (
                                                            <Link key={child.id} href={`/shop/${child.slug}`} className="block">
                                                                <div className={`flex items-center justify-between px-2 py-1.5 rounded-md text-xs transition-colors ${
                                                                    child.slug === categorySlug
                                                                        ? "text-primary font-medium bg-primary/5"
                                                                        : "text-gray-500 hover:text-gray-700 hover:bg-gray-50"
                                                                }`}>
                                                                    <span className="truncate">{decodeHtmlEntities(child.name)}</span>
                                                                    <span className="text-gray-300">{child.count}</span>
                                                                </div>
                                                            </Link>
                                                        ))}
                                                    </div>
                                                )}
                                            </div>
                                        ))}
                                    </nav>
                                </div>

                                {/* Promo Card */}
                                <div className="rounded-2xl bg-linear-to-br from-accent/10 to-primary/5 border border-accent/20 p-5 text-center">
                                    <div className="w-12 h-12 mx-auto mb-3 rounded-xl bg-accent/20 flex items-center justify-center">
                                        <Gem className="h-6 w-6 text-accent" />
                                    </div>
                                    <h4 className="text-sm font-bold text-gray-900 mb-1">Free Consultation</h4>
                                    <p className="text-xs text-gray-500 mb-3 leading-relaxed">
                                        Expert advice for {decodeHtmlEntities(selectedCategory.name).toLowerCase()}
                                    </p>
                                    <Button size="sm" className="w-full bg-primary text-white rounded-lg h-9 text-xs">
                                        Book Now
                                    </Button>
                                </div>
                            </div>
                        </aside>

                        {/* Products */}
                        <main className="flex-1 min-w-0">
                            <div className="flex items-baseline justify-between mb-6">
                                <h2 className="text-2xl font-bold font-heading text-gray-900">
                                    {decodeHtmlEntities(selectedCategory.name)}
                                </h2>
                                <span className="text-sm text-gray-400">{products.length} products</span>
                            </div>

                            {products.length > 0 ? (
                                <PaginatedProductGrid
                                    products={products}
                                    perPage={12}
                                    columns={3}
                                />
                            ) : (
                                <div className="py-20 text-center">
                                    <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gray-100 flex items-center justify-center">
                                        <Package className="h-8 w-8 text-gray-400" />
                                    </div>
                                    <h3 className="text-lg font-bold text-gray-900 mb-2">No Products Found</h3>
                                    <p className="text-sm text-gray-500 mb-6">
                                        No products in {decodeHtmlEntities(selectedCategory.name)} yet. Check back soon!
                                    </p>
                                    <Button asChild>
                                        <Link href="/shop">View All Products</Link>
                                    </Button>
                                </div>
                            )}
                        </main>
                    </div>
                </div>
            </section>

            {/* Bottom CTA */}
            <section className="py-12 border-t border-gray-100">
                <div className="container mx-auto px-4 text-center">
                    <h3 className="text-xl md:text-2xl font-bold font-heading text-gray-900 mb-2">
                        Need Help Choosing the Right {decodeHtmlEntities(selectedCategory.name)}?
                    </h3>
                    <p className="text-sm text-gray-500 mb-6 max-w-md mx-auto">
                        Our experts can help you find the perfect item based on your birth chart.
                    </p>
                    <div className="flex items-center justify-center gap-3">
                        <Button asChild className="bg-primary rounded-xl">
                            <Link href="/contact">Get Expert Advice</Link>
                        </Button>
                        <Button variant="outline" className="rounded-xl gap-2" asChild>
                            <a href={`https://wa.me/${siteConfig.contact.whatsapp}`} target="_blank" rel="noopener noreferrer">
                                <Phone className="h-4 w-4" />
                                WhatsApp Us
                            </a>
                        </Button>
                    </div>
                </div>
            </section>
        </MainLayout>
    );
}
