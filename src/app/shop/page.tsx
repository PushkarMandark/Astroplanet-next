import { MainLayout } from "@/components/templates/main-layout";
import { ProductGrid } from "@/components/organisms/product-grid";
import { getProducts, getCategories, buildCategoryTree } from "@/lib/api/products";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { decodeHtmlEntities } from "@/lib/utils/decode";
import {
    Search,
    Sparkles,
    Filter,
    Grid3X3,
    LayoutGrid,
    Star,
    ShoppingBag,
    Gem,
    Package,
    ChevronRight,
    ChevronLeft,
    SlidersHorizontal,
} from "lucide-react";

interface ShopPageProps {
    searchParams: Promise<{
        category?: string;
        search?: string;
        page?: string;
    }>;
}

export const metadata = {
    title: "Shop",
    description: "Browse our collection of authentic astrology products, gemstones, and spiritual items.",
};

// Category icons mapping
const categoryIcons: Record<string, React.ReactNode> = {
    "gemstones": <Gem className="h-5 w-5" />,
    "astrology": <Star className="h-5 w-5" />,
    "spiritual": <Sparkles className="h-5 w-5" />,
    "yantras": <Sparkles className="h-5 w-5" />,
    "rudraksha": <Gem className="h-5 w-5" />,
    "default": <Package className="h-5 w-5" />,
};

// Products per page
const PRODUCTS_PER_PAGE = 24;

export default async function ShopPage({ searchParams }: ShopPageProps) {
    const params = await searchParams;
    const categoryId = params.category ? parseInt(params.category) : undefined;
    const searchQuery = params.search || "";
    const currentPage = params.page ? parseInt(params.page) : 1;

    // Fetch products and categories
    const [products, categories] = await Promise.all([
        getProducts({
            per_page: PRODUCTS_PER_PAGE,
            page: currentPage,
            category: categoryId,
            search: searchQuery || undefined,
        }),
        getCategories(),
    ]);

    // Find selected category name
    const selectedCategory = categories.find(c => c.id === categoryId);

    // Calculate total pages (estimate based on product count)
    // WooCommerce returns all products if we fetch with high per_page, so we estimate
    const totalProducts = selectedCategory ? selectedCategory.count : categories.reduce((acc, c) => acc + c.count, 0);
    const totalPages = Math.ceil(totalProducts / PRODUCTS_PER_PAGE);
    const hasNextPage = products.length === PRODUCTS_PER_PAGE;
    const hasPrevPage = currentPage > 1;

    // Build pagination URL helper
    const buildPageUrl = (page: number) => {
        const params = new URLSearchParams();
        if (categoryId) params.set('category', categoryId.toString());
        if (searchQuery) params.set('search', searchQuery);
        params.set('page', page.toString());
        return `/shop?${params.toString()}`;
    };

    return (
        <MainLayout>

            {/* Category Pills */}
            <section className="py-6 bg-gradient-to-b from-muted/50 to-white border-b sticky top-16 z-30 backdrop-blur-sm bg-white/80">
                <div className="container mx-auto px-4">
                    <div className="flex items-center gap-3 overflow-x-auto pb-2 scrollbar-hide">
                        <span className="text-sm font-medium text-muted-foreground flex-shrink-0 flex items-center gap-1">
                            <Filter className="h-4 w-4" />
                            Filter:
                        </span>
                        <Link href="/shop">
                            <Button
                                variant={!categoryId ? "default" : "outline"}
                                size="sm"
                                className={`rounded-full flex-shrink-0 ${!categoryId ? 'bg-primary' : ''}`}
                            >
                                All Products
                            </Button>
                        </Link>
                        {categories.slice(0, 10).map((category) => (
                            <Link
                                key={category.id}
                                href={`/shop/${category.slug}`}
                            >
                                <Button
                                    variant={categoryId === category.id ? "default" : "outline"}
                                    size="sm"
                                    className={`rounded-full flex-shrink-0 ${categoryId === category.id ? 'bg-primary' : ''}`}
                                >
                                    {decodeHtmlEntities(category.name)}
                                    <Badge variant="secondary" className="ml-2 text-xs">
                                        {category.count}
                                    </Badge>
                                </Button>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* Main Content */}
            <section className="py-10">
                <div className="container mx-auto px-4">
                    <div className="flex flex-col lg:flex-row gap-8">
                        {/* Enhanced Sidebar */}
                        <aside className="w-full lg:w-72 flex-shrink-0">
                            <div className="lg:sticky lg:top-40 space-y-6">
                                {/* Categories Card */}
                                <Card className="border-0 shadow-lg overflow-hidden">
                                    <div className="bg-gradient-to-r from-primary to-primary/80 text-white p-4">
                                        <h3 className="font-bold flex items-center gap-2">
                                            <SlidersHorizontal className="h-4 w-4" />
                                            Categories
                                        </h3>
                                    </div>
                                    <CardContent className="p-3 max-h-[400px] overflow-y-auto">
                                        <div className="space-y-1">
                                            <Link href="/shop" className="block">
                                                <div className={`flex items-center justify-between p-3 rounded-lg transition-all ${!categoryId ? 'bg-primary/10 text-primary font-medium' : 'hover:bg-muted'}`}>
                                                    <span className="flex items-center gap-2">
                                                        <LayoutGrid className="h-4 w-4" />
                                                        All Products
                                                    </span>
                                                    <ChevronRight className="h-4 w-4" />
                                                </div>
                                            </Link>
                                            {/* Hierarchical Categories */}
                                            {buildCategoryTree(categories).map((parent) => (
                                                <div key={parent.id}>
                                                    {/* Parent Category */}
                                                    <Link href={`/shop/${parent.slug}`} className="block">
                                                        <div className="flex items-center justify-between p-3 rounded-lg transition-all hover:bg-muted font-medium">
                                                            <span className="flex items-center gap-2">
                                                                {categoryIcons[parent.slug] || categoryIcons.default}
                                                                <span className="truncate max-w-[140px]">{parent.name}</span>
                                                            </span>
                                                            <Badge variant="secondary" className="text-xs flex-shrink-0">
                                                                {parent.count}
                                                            </Badge>
                                                        </div>
                                                    </Link>
                                                    {/* Child Categories */}
                                                    {parent.children && parent.children.length > 0 && (
                                                        <div className="ml-4 border-l-2 border-muted pl-2 mt-1 space-y-1">
                                                            {parent.children.map((child) => (
                                                                <Link key={child.id} href={`/shop/${child.slug}`} className="block">
                                                                    <div className="flex items-center justify-between p-2 pl-3 rounded-lg transition-all hover:bg-muted text-sm">
                                                                        <span className="truncate max-w-[120px] text-muted-foreground hover:text-foreground">
                                                                            {decodeHtmlEntities(child.name)}
                                                                        </span>
                                                                        <Badge variant="outline" className="text-xs flex-shrink-0">
                                                                            {child.count}
                                                                        </Badge>
                                                                    </div>
                                                                </Link>
                                                            ))}
                                                        </div>
                                                    )}
                                                </div>
                                            ))}
                                        </div>
                                    </CardContent>
                                </Card>

                                {/* Promo Card */}
                                <Card className="border-0 shadow-lg overflow-hidden bg-gradient-to-br from-accent/20 via-secondary/10 to-primary/10">
                                    <CardContent className="p-6 text-center">
                                        <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-accent to-yellow-400 flex items-center justify-center">
                                            <Gem className="h-8 w-8 text-black" />
                                        </div>
                                        <h4 className="font-bold mb-2">Free Consultation</h4>
                                        <p className="text-sm text-muted-foreground mb-4">
                                            Get expert gemstone advice based on your birth chart
                                        </p>
                                        <Button size="sm" className="w-full bg-primary">
                                            Book Now
                                        </Button>
                                    </CardContent>
                                </Card>
                            </div>
                        </aside>

                        {/* Products Section */}
                        <main className="flex-1">
                            {/* Results Header */}
                            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
                                <div>
                                    {searchQuery && (
                                        <p className="text-sm text-muted-foreground mb-1">
                                            Showing results for &quot;{searchQuery}&quot;
                                        </p>
                                    )}
                                    <h2 className="text-2xl font-bold font-serif">
                                        {selectedCategory ? selectedCategory.name : 'All Products'}
                                    </h2>
                                    <p className="text-muted-foreground">
                                        Page {currentPage} • Showing {products.length} products
                                    </p>
                                </div>

                                {/* View Options */}
                                <div className="flex items-center gap-2">
                                    <span className="text-sm text-muted-foreground">View:</span>
                                    <Button variant="outline" size="icon" className="h-9 w-9">
                                        <Grid3X3 className="h-4 w-4" />
                                    </Button>
                                    <Button variant="ghost" size="icon" className="h-9 w-9">
                                        <LayoutGrid className="h-4 w-4" />
                                    </Button>
                                </div>
                            </div>

                            {/* Products Grid */}
                            {products.length > 0 ? (
                                <>
                                    <ProductGrid products={products} columns={3} />

                                    {/* Pagination */}
                                    <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4">
                                        {/* Previous Button */}
                                        {hasPrevPage ? (
                                            <Link href={buildPageUrl(currentPage - 1)}>
                                                <Button variant="outline" size="lg" className="px-6">
                                                    <ChevronLeft className="h-4 w-4 mr-2" />
                                                    Previous
                                                </Button>
                                            </Link>
                                        ) : (
                                            <Button variant="outline" size="lg" className="px-6" disabled>
                                                <ChevronLeft className="h-4 w-4 mr-2" />
                                                Previous
                                            </Button>
                                        )}

                                        {/* Page Numbers */}
                                        <div className="flex items-center gap-2">
                                            {[...Array(Math.min(totalPages, 5))].map((_, i) => {
                                                const pageNum = i + 1;
                                                const isActive = pageNum === currentPage;
                                                return (
                                                    <Link key={pageNum} href={buildPageUrl(pageNum)}>
                                                        <Button
                                                            variant={isActive ? "default" : "outline"}
                                                            size="icon"
                                                            className={`h-10 w-10 ${isActive ? 'bg-primary' : ''}`}
                                                        >
                                                            {pageNum}
                                                        </Button>
                                                    </Link>
                                                );
                                            })}
                                            {totalPages > 5 && (
                                                <>
                                                    <span className="px-2 text-muted-foreground">...</span>
                                                    <Link href={buildPageUrl(totalPages)}>
                                                        <Button variant="outline" size="icon" className="h-10 w-10">
                                                            {totalPages}
                                                        </Button>
                                                    </Link>
                                                </>
                                            )}
                                        </div>

                                        {/* Next Button */}
                                        {hasNextPage ? (
                                            <Link href={buildPageUrl(currentPage + 1)}>
                                                <Button variant="outline" size="lg" className="px-6">
                                                    Next
                                                    <ChevronRight className="h-4 w-4 ml-2" />
                                                </Button>
                                            </Link>
                                        ) : (
                                            <Button variant="outline" size="lg" className="px-6" disabled>
                                                Next
                                                <ChevronRight className="h-4 w-4 ml-2" />
                                            </Button>
                                        )}
                                    </div>
                                </>
                            ) : (
                                /* Enhanced Empty State */
                                <Card className="border-0 shadow-lg">
                                    <CardContent className="py-16 text-center">
                                        <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-muted flex items-center justify-center">
                                            <Package className="h-12 w-12 text-muted-foreground" />
                                        </div>
                                        <h3 className="text-xl font-bold mb-2">No Products Found</h3>
                                        <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                                            We couldn&apos;t find any products matching your criteria. Try adjusting your search or browse our categories.
                                        </p>
                                        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                                            <Button asChild>
                                                <Link href="/shop">View All Products</Link>
                                            </Button>
                                            <Button asChild variant="outline">
                                                <Link href="/contact">Contact Us</Link>
                                            </Button>
                                        </div>
                                    </CardContent>
                                </Card>
                            )}
                        </main>
                    </div>
                </div>
            </section>

            {/* Bottom CTA Section */}
            <section className="py-16 bg-gradient-to-r from-primary/5 via-secondary/5 to-accent/5">
                <div className="container mx-auto px-4 text-center">
                    <h3 className="text-2xl md:text-3xl font-bold font-serif mb-4">
                        Can&apos;t Find What You&apos;re Looking For?
                    </h3>
                    <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
                        Our experts can help you find the perfect spiritual item for your needs
                    </p>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <Button size="lg" className="bg-gradient-to-r from-primary to-primary/80">
                            Get Expert Advice
                        </Button>
                        <Button size="lg" variant="outline">
                            WhatsApp Us
                        </Button>
                    </div>
                </div>
            </section>
        </MainLayout>
    );
}
