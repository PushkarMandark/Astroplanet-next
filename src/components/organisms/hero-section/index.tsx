"use client";

import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface HeroSectionProps {
    title: string;
    subtitle?: string;
    description?: string;
    primaryCta?: {
        label: string;
        href: string;
    };
    secondaryCta?: {
        label: string;
        href: string;
    };
    className?: string;
}

export function HeroSection({
    title,
    subtitle,
    description,
    primaryCta,
    secondaryCta,
    className,
}: HeroSectionProps) {
    return (
        <section
            className={cn(
                "relative py-24 md:py-36 overflow-hidden",
                className
            )}
        >
            {/* Animated gradient background */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary via-[#6b0707] to-[#3d0404]" />

            {/* Star pattern using CSS instead of random values */}
            <div className="absolute inset-0 opacity-30 bg-[radial-gradient(white_1px,transparent_1px)] bg-[size:60px_60px]" />

            {/* Glowing orbs */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-radial from-accent/30 to-transparent rounded-full blur-3xl animate-pulse" />
            <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-gradient-radial from-secondary/20 to-transparent rounded-full blur-3xl" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-radial from-primary/20 to-transparent rounded-full blur-3xl" />

            {/* Cosmic ring decoration */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] border border-white/5 rounded-full" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border border-white/10 rounded-full" />

            <div className="container mx-auto px-4 relative z-10">
                <div className="max-w-4xl mx-auto text-center text-white">
                    {/* Sparkle icon */}
                    <div className="flex justify-center mb-6">
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20">
                            <Sparkles className="h-4 w-4 text-accent" />
                            <span className="text-sm font-medium">{subtitle || "Welcome to AstroPlanet"}</span>
                        </div>
                    </div>

                    <h1 className="text-5xl md:text-7xl font-bold font-serif mb-6 leading-tight tracking-tight">
                        <span className="bg-gradient-to-r from-white via-white to-accent bg-clip-text text-transparent">
                            {title}
                        </span>
                    </h1>

                    {description && (
                        <p className="text-lg md:text-xl text-white/80 mb-10 max-w-2xl mx-auto leading-relaxed">
                            {description}
                        </p>
                    )}

                    {(primaryCta || secondaryCta) && (
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                            {primaryCta && (
                                <Button
                                    asChild
                                    size="lg"
                                    className="bg-gradient-to-r from-accent to-yellow-400 text-black font-semibold px-8 py-6 text-lg hover:shadow-lg hover:shadow-accent/30 transition-all duration-300 hover:scale-105"
                                >
                                    <Link href={primaryCta.href}>
                                        {primaryCta.label}
                                        <ArrowRight className="ml-2 h-5 w-5" />
                                    </Link>
                                </Button>
                            )}
                            {secondaryCta && (
                                <Button
                                    asChild
                                    size="lg"
                                    variant="outline"
                                    className="border-2 border-white text-white bg-white/5 backdrop-blur-sm px-8 py-6 text-lg hover:bg-white/20 transition-all duration-300"
                                >
                                    <Link href={secondaryCta.href}>{secondaryCta.label}</Link>
                                </Button>
                            )}
                        </div>
                    )}

                    {/* Trust indicators */}
                    <div className="mt-12 flex flex-wrap items-center justify-center gap-8 text-white/60 text-sm">
                        <div className="flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-green-400" />
                            10,000+ Happy Customers
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-accent" />
                            Certified Astrologers
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-secondary" />
                            100% Authentic Products
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
