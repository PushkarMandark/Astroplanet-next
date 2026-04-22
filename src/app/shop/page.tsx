import { MainLayout } from "@/components/templates/main-layout";
import { PaginatedProductGrid } from "@/components/organisms/paginated-product-grid";
import { getAllProducts, getCategories, buildCategoryTree } from "@/lib/api/products";
import { Button } from "@/components/ui/button";
import Link from "next/link";
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
import { ConsultationButton } from "@/components/molecules/consultation-button";

export const metadata = {
    title: "Shop",
    description: "Browse our collection of authentic astrology products, gemstones, and spiritual items.",
};

export default async function ShopPage() {
    const [products, categories] = await Promise.all([
        getAllProducts(ALL_PRODUCTS_FETCH_LIMIT, 25),
        getCategories(),
    ]);

    const categoryTree = buildCategoryTree(categories);

    return (
        <MainLayout>
            {/* Main Content */}
            <section className="py-8">
                <div className="container mx-auto px-4">
                    <div className="flex flex-col lg:flex-row gap-8">
                        {/* Sidebar */}
                        <aside className="w-full lg:w-64 shrink-0">
                            <div className="lg:sticky lg:top-36 space-y-6">
                                {/* Categories */}
                                <div>
                                    <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider flex items-center gap-2 mb-3 px-1">
                                        <SlidersHorizontal className="h-4 w-4" />
                                        Categories
                                    </h3>
                                    <nav className="space-y-0.5">
                                        <Link href="/shop" className="block">
                                            <div className="flex items-center justify-between px-3 py-2.5 rounded-lg bg-primary/5 text-primary font-medium text-sm">
                                                <span className="flex items-center gap-2">
                                                    <LayoutGrid className="h-4 w-4" />
                                                    All Products
                                                </span>
                                                <ChevronRight className="h-3.5 w-3.5" />
                                            </div>
                                        </Link>
                                        {categoryTree.map((parent) => (
                                            <div key={parent.id}>
                                                <Link href={`/shop/${parent.slug}`} className="block">
                                                    <div className="flex items-center justify-between px-3 py-2.5 rounded-lg hover:bg-gray-50 text-sm font-medium text-gray-700 transition-colors">
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
                                                                <div className="flex items-center justify-between px-2 py-1.5 rounded-md hover:bg-gray-50 text-xs text-gray-500 hover:text-gray-700 transition-colors">
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
                                        Expert gemstone advice based on your birth chart
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
                                <h1 className="text-2xl font-bold font-heading text-gray-900">All Products</h1>
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
                                    <p className="text-sm text-gray-500 mb-6">Try browsing our categories or contact us for help.</p>
                                    <Button asChild>
                                        <Link href="/contact">Contact Us</Link>
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
                        Can&apos;t Find What You&apos;re Looking For?
                    </h3>
                    <p className="text-sm text-gray-500 mb-6 max-w-md mx-auto">
                        Our experts can help you find the perfect spiritual item for your needs.
                    </p>
                    <div className="flex items-center justify-center gap-3">
                        <ConsultationButton service="Product Guidance" className="bg-primary rounded-xl">
                            Get Expert Advice
                        </ConsultationButton>
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
