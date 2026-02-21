import Link from "next/link";
import { MainLayout } from "@/components/templates/main-layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { getProducts, getCategories } from "@/lib/api/products";
import { OptimizedImage } from "@/components/atoms/image";
import {
    Star,
    ChevronRight,
    Phone,
    Sparkles,
    ArrowRight,
    Calendar,
    MessageCircle,
    ShoppingCart
} from "lucide-react";

export const metadata = {
    title: "Services | AstroPlanet",
    description: "Professional astrology consultation and pooja services. Get expert guidance from experienced astrologers.",
};

export default async function ServicesPage() {
    // Fetch categories to find service subcategories
    const categories = await getCategories();

    // Find consultation category (more flexible matching)
    const consultationCategory = categories.find(c =>
        c.slug === 'consultation' ||
        c.slug.includes('consult') ||
        c.name.toLowerCase().includes('consultation')
    );

    // Fetch consultation products (including from child categories)
    let consultationProducts: Awaited<ReturnType<typeof getProducts>> = [];
    if (consultationCategory) {
        // Get main category products
        const mainProducts = await getProducts({
            category: consultationCategory.id,
            per_page: 20
        });
        // Find child categories
        const childCategories = categories.filter(c => c.parent === consultationCategory.id);
        // Fetch from child categories too
        const childProductPromises = childCategories.map(child =>
            getProducts({ category: child.id, per_page: 10 })
        );
        const childProductArrays = await Promise.all(childProductPromises);
        // Combine all products
        consultationProducts = [...mainProducts, ...childProductArrays.flat()];
        // Remove duplicates
        consultationProducts = consultationProducts.filter((p, i, arr) =>
            arr.findIndex(x => x.id === p.id) === i
        );
    }

    // Fetch pooja services products (from ALL pooja-related categories)
    let poojaProducts: Awaited<ReturnType<typeof getProducts>> = [];

    // Find ALL categories that are related to pooja (parent or child)
    const allPoojaCategories = categories.filter(c =>
        c.slug === 'pooja-services' ||
        c.slug === 'pooja' ||
        c.slug.includes('pooja') ||
        c.name.toLowerCase().includes('pooja')
    );

    // Fetch products from all pooja categories
    if (allPoojaCategories.length > 0) {
        const poojaProductPromises = allPoojaCategories.map(cat =>
            getProducts({ category: cat.id, per_page: 20 })
        );
        const poojaProductArrays = await Promise.all(poojaProductPromises);
        poojaProducts = poojaProductArrays.flat();

        // Remove duplicates
        poojaProducts = poojaProducts.filter((p, i, arr) =>
            arr.findIndex(x => x.id === p.id) === i
        );
    }

    // Get the main pooja category for the "View All" link
    const poojaCategory = categories.find(c =>
        c.slug === 'pooja-services' || c.slug === 'pooja'
    ) || allPoojaCategories[0];

    return (
        <MainLayout>

            {/* Consultation Services Section */}
            <section className="py-16 bg-gradient-to-b from-muted/30 to-white">
                <div className="container mx-auto px-4">
                    <div className="flex items-center justify-between mb-8">
                        <div>
                            <Badge className="mb-2 bg-primary/10 text-primary">Expert Guidance</Badge>
                            <h2 className="text-3xl font-bold font-serif">
                                Consultation Services
                            </h2>
                            <p className="text-muted-foreground mt-2">
                                One-on-one sessions with experienced astrologers
                            </p>
                        </div>
                        {consultationCategory && (
                            <Link href={`/shop/${consultationCategory.slug}`}>
                                <Button variant="outline" className="rounded-full hidden sm:flex">
                                    View All
                                    <ChevronRight className="h-4 w-4 ml-1" />
                                </Button>
                            </Link>
                        )}
                    </div>

                    {/* Horizontal Scroll Container for Consultation */}
                    {consultationProducts.length > 0 ? (
                        <div className="overflow-x-auto pb-4 -mx-4 px-4">
                            <div className="flex gap-6" style={{ minWidth: 'max-content' }}>
                                {consultationProducts.map((product) => (
                                    <Link
                                        key={product.id}
                                        href={`/product/${product.slug}`}
                                        className="w-[280px] flex-shrink-0"
                                    >
                                        <Card className="h-full overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-0 shadow-lg group">
                                            <div className="relative aspect-[4/3] bg-gradient-to-br from-primary/5 to-accent/5">
                                                <OptimizedImage
                                                    src={product.images?.[0]?.src || "/images/placeholder.svg"}
                                                    alt={product.name}
                                                    fill
                                                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                                                />
                                                <Badge className="absolute top-3 left-3 bg-primary text-white">
                                                    <MessageCircle className="h-3 w-3 mr-1" />
                                                    Consultation
                                                </Badge>
                                            </div>
                                            <CardContent className="p-4">
                                                <h3 className="font-semibold line-clamp-2 mb-2 group-hover:text-primary transition-colors">
                                                    {product.name}
                                                </h3>
                                                <div className="flex items-center gap-1 mb-3">
                                                    {[...Array(5)].map((_, i) => (
                                                        <Star key={i} className="h-3 w-3 text-amber-400 fill-amber-400" />
                                                    ))}
                                                    <span className="text-xs text-muted-foreground ml-1">(4.9)</span>
                                                </div>
                                                <div className="flex items-center justify-between">
                                                    <span className="text-xl font-bold text-primary">
                                                        ₹{Number(product.price).toLocaleString('en-IN')}
                                                    </span>
                                                    <Button size="sm" className="rounded-full">
                                                        Book Now
                                                    </Button>
                                                </div>
                                            </CardContent>
                                        </Card>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    ) : (
                        <Card className="border-0 shadow-lg">
                            <CardContent className="py-12 text-center">
                                <MessageCircle className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                                <h3 className="text-lg font-semibold mb-2">Consultation Services Coming Soon</h3>
                                <p className="text-muted-foreground mb-4">We&apos;re preparing our consultation offerings.</p>
                                <Button asChild>
                                    <Link href="/contact">Contact Us</Link>
                                </Button>
                            </CardContent>
                        </Card>
                    )}

                    {consultationCategory && (
                        <div className="text-center mt-6 sm:hidden">
                            <Link href={`/shop/${consultationCategory.slug}`}>
                                <Button variant="outline" className="rounded-full">
                                    View All Consultations
                                    <ChevronRight className="h-4 w-4 ml-1" />
                                </Button>
                            </Link>
                        </div>
                    )}
                </div>
            </section>

            {/* Pooja Services Section */}
            <section className="py-16 bg-gradient-to-b from-white to-accent/5">
                <div className="container mx-auto px-4">
                    <div className="flex items-center justify-between mb-8">
                        <div>
                            <Badge className="mb-2 bg-accent/20 text-amber-700">Sacred Rituals</Badge>
                            <h2 className="text-3xl font-bold font-serif">
                                Pooja Services
                            </h2>
                            <p className="text-muted-foreground mt-2">
                                Authentic Vedic rituals performed by experienced pandits
                            </p>
                        </div>
                        {poojaCategory && (
                            <Link href={`/shop/${poojaCategory.slug}`}>
                                <Button variant="outline" className="rounded-full hidden sm:flex">
                                    View All
                                    <ChevronRight className="h-4 w-4 ml-1" />
                                </Button>
                            </Link>
                        )}
                    </div>

                    {/* Horizontal Scroll Container for Pooja Services */}
                    {poojaProducts.length > 0 ? (
                        <div className="overflow-x-auto pb-4 -mx-4 px-4">
                            <div className="flex gap-6" style={{ minWidth: 'max-content' }}>
                                {poojaProducts.map((product) => (
                                    <Link
                                        key={product.id}
                                        href={`/product/${product.slug}`}
                                        className="w-[280px] flex-shrink-0"
                                    >
                                        <Card className="h-full overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-0 shadow-lg group">
                                            <div className="relative aspect-[4/3] bg-gradient-to-br from-amber-50 to-orange-50">
                                                <OptimizedImage
                                                    src={product.images?.[0]?.src || "/images/placeholder.svg"}
                                                    alt={product.name}
                                                    fill
                                                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                                                />
                                                <Badge className="absolute top-3 left-3 bg-amber-500 text-white">
                                                    <Sparkles className="h-3 w-3 mr-1" />
                                                    Pooja
                                                </Badge>
                                            </div>
                                            <CardContent className="p-4">
                                                <h3 className="font-semibold line-clamp-2 mb-2 group-hover:text-primary transition-colors">
                                                    {product.name}
                                                </h3>
                                                <div className="flex items-center gap-1 mb-3">
                                                    {[...Array(5)].map((_, i) => (
                                                        <Star key={i} className="h-3 w-3 text-amber-400 fill-amber-400" />
                                                    ))}
                                                    <span className="text-xs text-muted-foreground ml-1">(4.8)</span>
                                                </div>
                                                <div className="flex items-center justify-between">
                                                    <span className="text-xl font-bold text-primary">
                                                        ₹{Number(product.price).toLocaleString('en-IN')}
                                                    </span>
                                                    <Button size="sm" className="rounded-full bg-amber-500 hover:bg-amber-600">
                                                        Book Now
                                                    </Button>
                                                </div>
                                            </CardContent>
                                        </Card>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    ) : (
                        <Card className="border-0 shadow-lg bg-gradient-to-br from-amber-50 to-orange-50">
                            <CardContent className="py-12 text-center">
                                <Sparkles className="h-12 w-12 mx-auto text-amber-500 mb-4" />
                                <h3 className="text-lg font-semibold mb-2">Pooja Services Coming Soon</h3>
                                <p className="text-muted-foreground mb-4">We&apos;re preparing our authentic pooja offerings.</p>
                                <Button asChild className="bg-amber-500 hover:bg-amber-600">
                                    <Link href="/contact">Contact Us</Link>
                                </Button>
                            </CardContent>
                        </Card>
                    )}

                    {poojaCategory && (
                        <div className="text-center mt-6 sm:hidden">
                            <Link href={`/shop/${poojaCategory.slug}`}>
                                <Button variant="outline" className="rounded-full">
                                    View All Pooja Services
                                    <ChevronRight className="h-4 w-4 ml-1" />
                                </Button>
                            </Link>
                        </div>
                    )}
                </div>
            </section>

            {/* How It Works Section */}
            <section className="py-16 bg-muted/30">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-bold font-serif mb-12 text-center">
                        How It Works
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                        <div className="text-center">
                            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-primary to-primary/80 text-white flex items-center justify-center text-2xl font-bold shadow-lg">
                                1
                            </div>
                            <h3 className="font-bold mb-2">Choose Service</h3>
                            <p className="text-sm text-muted-foreground">
                                Select consultation or pooja service
                            </p>
                        </div>
                        <div className="text-center">
                            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-primary to-primary/80 text-white flex items-center justify-center text-2xl font-bold shadow-lg">
                                2
                            </div>
                            <h3 className="font-bold mb-2">Provide Details</h3>
                            <p className="text-sm text-muted-foreground">
                                Enter your birth details and requirements
                            </p>
                        </div>
                        <div className="text-center">
                            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-primary to-primary/80 text-white flex items-center justify-center text-2xl font-bold shadow-lg">
                                3
                            </div>
                            <h3 className="font-bold mb-2">Make Payment</h3>
                            <p className="text-sm text-muted-foreground">
                                Secure payment through Razorpay
                            </p>
                        </div>
                        <div className="text-center">
                            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-primary to-primary/80 text-white flex items-center justify-center text-2xl font-bold shadow-lg">
                                4
                            </div>
                            <h3 className="font-bold mb-2">Get Service</h3>
                            <p className="text-sm text-muted-foreground">
                                Receive consultation or pooja completion
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-16 bg-gradient-to-r from-primary/5 via-secondary/5 to-accent/5">
                <div className="container mx-auto px-4 text-center">
                    <h2 className="text-3xl font-bold font-serif mb-4">
                        Need Custom Services?
                    </h2>
                    <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
                        Can&apos;t find what you&apos;re looking for? Contact us for
                        personalized astrology services tailored to your needs.
                    </p>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <Button asChild size="lg" className="bg-gradient-to-r from-primary to-primary/90">
                            <Link href="/contact">
                                Contact Us
                                <ArrowRight className="h-4 w-4 ml-2" />
                            </Link>
                        </Button>
                        <Button asChild size="lg" variant="outline">
                            <Link href="/shop">
                                Browse All Products
                            </Link>
                        </Button>
                    </div>
                </div>
            </section>
        </MainLayout>
    );
}
