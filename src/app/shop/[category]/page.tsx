import { MainLayout } from "@/components/templates/main-layout";
import { ProductGrid } from "@/components/organisms/product-grid";
import { getProducts, getCategories, buildCategoryTree } from "@/lib/api/products";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { notFound } from "next/navigation";
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

interface CategoryPageProps {
    params: Promise<{ category: string }>;
    searchParams: Promise<{
        search?: string;
        page?: string;
    }>;
}

// Generate static params for all categories
export async function generateStaticParams() {
    const categories = await getCategories();
    return categories.map((category) => ({
        category: category.slug,
    }));
}

// Generate metadata for SEO
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

export default async function CategoryPage({ params, searchParams }: CategoryPageProps) {
    const { category: categorySlug } = await params;
    const queryParams = await searchParams;
    const searchQuery = queryParams.search || "";
    const currentPage = queryParams.page ? parseInt(queryParams.page) : 1;

    // Fetch categories first to get the category ID
    const categories = await getCategories();
    const selectedCategory = categories.find(c => c.slug === categorySlug);

    // If category not found, show 404
    if (!selectedCategory) {
        notFound();
    }

    // Fetch products for this category
    const products = await getProducts({
        per_page: PRODUCTS_PER_PAGE,
        page: currentPage,
        category: selectedCategory.id,
        search: searchQuery || undefined,
    });

    // Calculate pagination
    const totalProducts = selectedCategory.count;
    const totalPages = Math.ceil(totalProducts / PRODUCTS_PER_PAGE);
    const hasNextPage = products.length === PRODUCTS_PER_PAGE;
    const hasPrevPage = currentPage > 1;

    // Build pagination URL helper
    const buildPageUrl = (page: number) => {
        const params = new URLSearchParams();
        if (searchQuery) params.set('search', searchQuery);
        if (page > 1) params.set('page', page.toString());
        const queryString = params.toString();
        return `/shop/${categorySlug}${queryString ? `?${queryString}` : ''}`;
    };

    return (
        <MainLayout>
            {/* Premium Hero Section */}
            <section className="relative bg-gradient-to-br from-primary via-primary to-[#5c0606] text-white py-16 md:py-20 overflow-hidden">
                {/* Decorative elements */}
                <div className="absolute inset-0 overflow-hidden">
                    <div className="absolute top-1/4 left-10 w-64 h-64 bg-accent/10 rounded-full blur-3xl" />
                    <div className="absolute bottom-0 right-10 w-96 h-96 bg-secondary/10 rounded-full blur-3xl" />
                    <div className="absolute top-10 right-1/4 w-32 h-32 border border-white/10 rounded-full" />
                    <div className="absolute bottom-10 left-1/3 w-20 h-20 border border-white/10 rounded-full" />
                </div>

                <div className="container mx-auto px-4 relative z-10">
                    <div className="max-w-3xl mx-auto text-center">
                        {/* Breadcrumb */}
                        <div className="flex items-center justify-center gap-2 text-white/60 text-sm mb-4">
                            <Link href="/shop" className="hover:text-white transition-colors">Shop</Link>
                            <ChevronRight className="h-4 w-4" />
                            <span className="text-white">{selectedCategory.name}</span>
                        </div>

                        <Badge className="mb-4 bg-white/10 text-white border-white/20 backdrop-blur-sm">
                            <ShoppingBag className="h-3 w-3 mr-1" />
                            {selectedCategory.count} Products
                        </Badge>
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-serif mb-4">
                            {selectedCategory.name}
                        </h1>
                        <p className="text-white/70 text-lg max-w-2xl mx-auto mb-8">
                            Explore our curated collection of {selectedCategory.name.toLowerCase()}
                        </p>

                        {/* Enhanced Search Bar */}
                        <form action={`/shop/${categorySlug}`} method="GET" className="max-w-xl mx-auto">
                            <div className="relative">
                                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                                <Input
                                    type="text"
                                    name="search"
                                    defaultValue={searchQuery}
                                    placeholder={`Search in ${selectedCategory.name}...`}
                                    className="w-full h-14 pl-12 pr-32 text-black text-lg rounded-full border-0 shadow-lg focus:ring-2 focus:ring-accent"
                                />
                                <Button
                                    type="submit"
                                    className="absolute right-2 top-1/2 -translate-y-1/2 h-10 px-6 rounded-full bg-gradient-to-r from-secondary to-orange-500 hover:from-secondary/90 hover:to-orange-400"
                                >
                                    Search
                                </Button>
                            </div>
                        </form>
                    </div>
                </div>
            </section>

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
                                variant="outline"
                                size="sm"
                                className="rounded-full flex-shrink-0"
                            >
                                All Products
                            </Button>
                        </Link>
                        {categories.slice(0, 10).map((cat) => (
                            <Link
                                key={cat.id}
                                href={`/shop/${cat.slug}`}
                            >
                                <Button
                                    variant={cat.slug === categorySlug ? "default" : "outline"}
                                    size="sm"
                                    className={`rounded-full flex-shrink-0 ${cat.slug === categorySlug ? 'bg-primary' : ''}`}
                                >
                                    {cat.name}
                                    <Badge variant="secondary" className="ml-2 text-xs">
                                        {cat.count}
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
                                                <div className="flex items-center justify-between p-3 rounded-lg transition-all hover:bg-muted">
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
                                                        <div className={`flex items-center justify-between p-3 rounded-lg transition-all font-medium ${parent.slug === categorySlug ? 'bg-primary/10 text-primary' : 'hover:bg-muted'}`}>
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
                                                                    <div className={`flex items-center justify-between p-2 pl-3 rounded-lg transition-all text-sm ${child.slug === categorySlug ? 'bg-primary/10 text-primary font-medium' : 'text-muted-foreground hover:bg-muted hover:text-foreground'}`}>
                                                                        <span className="truncate max-w-[120px]">
                                                                            {child.name}
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
                                            Get expert advice for {selectedCategory.name.toLowerCase()}
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
                                        {selectedCategory.name}
                                    </h2>
                                    <p className="text-muted-foreground">
                                        Page {currentPage} • Showing {products.length} of {totalProducts} products
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
                                    {totalPages > 1 && (
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
                                    )}
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
                                            We couldn&apos;t find any products in {selectedCategory.name}. Try browsing other categories.
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
                        Need Help Choosing the Right {selectedCategory.name}?
                    </h3>
                    <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
                        Our experts can help you find the perfect item based on your birth chart
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
