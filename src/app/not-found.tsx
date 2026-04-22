import Link from "next/link";
import { MainLayout } from "@/components/templates/main-layout";
import { Button } from "@/components/ui/button";
import { Compass, Home, Search, Star } from "lucide-react";

export const metadata = {
    title: "Page Not Found",
    description: "The page you're looking for doesn't exist. Explore our shop, blog, and free astrology tools instead.",
};

export default function NotFound() {
    return (
        <MainLayout>
            <section className="relative bg-primary text-white overflow-hidden">
                <div className="absolute inset-0">
                    <div className="absolute top-10 right-20 w-72 h-72 bg-accent/15 rounded-full blur-3xl" />
                    <div className="absolute -bottom-10 -left-10 w-56 h-56 bg-secondary/10 rounded-full blur-3xl" />
                </div>
                <div className="container mx-auto px-4 relative z-10 py-20 md:py-28">
                    <div className="max-w-xl mx-auto text-center">
                        <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-white/10 backdrop-blur-sm mb-6">
                            <Compass className="h-10 w-10 text-accent" />
                        </div>
                        <p className="text-accent font-bold uppercase tracking-widest text-xs mb-3">
                            Error 404
                        </p>
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-heading mb-4 leading-tight">
                            The Stars Aren&apos;t Aligned Here
                        </h1>
                        <p className="text-white/70 text-base md:text-lg max-w-md mx-auto mb-8">
                            The page you&apos;re seeking isn&apos;t written in this chart. Let&apos;s guide you back to a known path.
                        </p>
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                            <Button
                                asChild
                                size="lg"
                                className="bg-accent text-primary hover:bg-accent/90 rounded-xl"
                            >
                                <Link href="/">
                                    <Home className="h-4 w-4 mr-2" />
                                    Go Home
                                </Link>
                            </Button>
                            <Button
                                asChild
                                size="lg"
                                variant="outline"
                                className="rounded-xl border-white/30 text-white hover:bg-white/10 hover:text-white"
                            >
                                <Link href="/shop">
                                    <Search className="h-4 w-4 mr-2" />
                                    Browse Shop
                                </Link>
                            </Button>
                        </div>
                    </div>
                </div>
            </section>

            <section className="py-12 md:py-16">
                <div className="container mx-auto px-4">
                    <div className="max-w-3xl mx-auto">
                        <p className="text-center text-xs font-bold uppercase tracking-widest text-secondary mb-2">
                            Popular Destinations
                        </p>
                        <h2 className="text-center text-2xl md:text-3xl font-bold font-heading text-gray-900 mb-8">
                            Try one of these instead
                        </h2>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            {[
                                { href: "/horoscope", label: "Horoscope", hindi: "राशिफल" },
                                { href: "/kundli", label: "Kundli", hindi: "कुंडली" },
                                { href: "/panchang", label: "Panchang", hindi: "पंचांग" },
                                { href: "/numerology", label: "Numerology", hindi: "अंक शास्त्र" },
                            ].map((item) => (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    className="group flex flex-col items-center gap-2 p-5 rounded-2xl border border-gray-100 hover:border-primary/30 hover:shadow-lg transition-all bg-white"
                                >
                                    <div className="w-12 h-12 rounded-xl bg-primary/5 group-hover:bg-primary/10 flex items-center justify-center transition-colors">
                                        <Star className="h-5 w-5 text-primary" />
                                    </div>
                                    <span className="text-sm font-bold text-gray-900 group-hover:text-primary transition-colors">
                                        {item.label}
                                    </span>
                                    <span className="text-[11px] text-secondary">{item.hindi}</span>
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
            </section>
        </MainLayout>
    );
}
