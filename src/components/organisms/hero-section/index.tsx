"use client";

import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import { OptimizedImage } from "@/components/atoms/image";
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

function MandalaSvg({ className }: { className?: string }) {
    const petal =
        "M 0,-260 C 40,-220 50,-150 0,-90 C -50,-150 -40,-220 0,-260 Z";
    return (
        <svg
            viewBox="0 0 600 600"
            fill="none"
            stroke="currentColor"
            strokeWidth={1.5}
            strokeLinecap="round"
            className={className}
            aria-hidden="true"
        >
            <g transform="translate(300 300)">
                {/* Outer rings */}
                <circle r="290" strokeOpacity="0.55" />
                <circle r="278" strokeOpacity="0.35" strokeDasharray="2 6" />
                <circle r="232" strokeOpacity="0.5" />
                <circle r="200" strokeOpacity="0.35" strokeDasharray="4 6" />

                {/* 60 tick marks */}
                {Array.from({ length: 60 }).map((_, i) => (
                    <line
                        key={`tick-${i}`}
                        x1="0"
                        y1="-285"
                        x2="0"
                        y2="-260"
                        strokeOpacity={i % 5 === 0 ? "0.85" : "0.45"}
                        strokeWidth={i % 5 === 0 ? 2 : 1}
                        transform={`rotate(${i * 6})`}
                    />
                ))}

                {/* 12 lotus petals */}
                {Array.from({ length: 12 }).map((_, i) => (
                    <path
                        key={`petal-${i}`}
                        d={petal}
                        strokeOpacity="0.65"
                        transform={`rotate(${i * 30})`}
                    />
                ))}

                {/* 8-point star (yantra) */}
                <polygon
                    points="0,-150 35,-35 150,0 35,35 0,150 -35,35 -150,0 -35,-35"
                    strokeOpacity="0.55"
                />
                <polygon
                    points="0,-150 35,-35 150,0 35,35 0,150 -35,35 -150,0 -35,-35"
                    strokeOpacity="0.4"
                    transform="rotate(22.5)"
                />

                {/* Inner sacred circle */}
                <circle r="100" strokeOpacity="0.55" strokeDasharray="2 4" />
                <circle r="60" strokeOpacity="0.7" />

                {/* Inner 6-petal flower of life */}
                <g strokeOpacity="0.55">
                    <circle r="30" cx="0" cy="-30" />
                    <circle r="30" cx="26" cy="-15" />
                    <circle r="30" cx="26" cy="15" />
                    <circle r="30" cx="0" cy="30" />
                    <circle r="30" cx="-26" cy="15" />
                    <circle r="30" cx="-26" cy="-15" />
                    <circle r="30" cx="0" cy="0" />
                </g>
            </g>
        </svg>
    );
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
                "relative pt-16 md:pt-24 lg:pt-28 pb-0 overflow-hidden",
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

            <div className="container mx-auto px-4 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 items-end">
                    {/* Left: Astrologer image with rotating mandala */}
                    <div className="relative flex justify-center lg:justify-start order-2 lg:order-1 self-end">
                        <div className="relative w-[min(85vw,300px)] aspect-4/5 sm:w-95 sm:h-125 sm:aspect-auto md:w-110 md:h-140 lg:w-120 lg:h-150">
                            {/* Soft radial glow behind everything */}
                            <div
                                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[108%] sm:w-[110%] aspect-square rounded-full bg-gradient-radial from-accent/20 via-accent/5 to-transparent blur-2xl pointer-events-none"
                                aria-hidden="true"
                            />

                            {/* Rotating mandala — square, centered */}
                            <div
                                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[108%] sm:w-[115%] aspect-square pointer-events-none text-amber-300/70 motion-safe:animate-[spin_60s_linear_infinite]"
                                aria-hidden="true"
                            >
                                <MandalaSvg className="w-full h-full" />
                            </div>

                            {/* Counter-rotating outer ring with orbiting dots */}
                            <div
                                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[115%] sm:w-[125%] aspect-square pointer-events-none motion-safe:animate-[spin_90s_linear_infinite_reverse]"
                                aria-hidden="true"
                            >
                                <div className="relative w-full h-full rounded-full border border-amber-300/25">
                                    <span className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-amber-300/90 shadow-[0_0_14px_3px] shadow-amber-300/50" />
                                    <span className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-amber-300/90 shadow-[0_0_14px_3px] shadow-amber-300/50" />
                                    <span className="absolute left-0 top-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-amber-300/90 shadow-[0_0_14px_3px] shadow-amber-300/50" />
                                    <span className="absolute right-0 top-1/2 translate-x-1/2 -translate-y-1/2 w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-amber-300/90 shadow-[0_0_14px_3px] shadow-amber-300/50" />
                                </div>
                            </div>

                            {/* Person image — front layer */}
                            <div className="absolute inset-0 flex items-end justify-center">
                                <OptimizedImage
                                    src="/images/astrologer.png"
                                    alt="Vedic Astrologer"
                                    width={500}
                                    height={650}
                                    priority
                                    objectFit="contain"
                                    className="relative z-10 w-auto h-full object-contain object-bottom drop-shadow-[0_20px_40px_rgba(0,0,0,0.5)]"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Right: Content */}
                    <div className="text-center lg:text-left text-white order-1 lg:order-2 lg:pb-28">
                        {/* Sparkle subtitle pill */}
                        <div className="flex justify-center lg:justify-start mb-6">
                            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20">
                                <Sparkles className="h-4 w-4 text-accent" />
                                <span className="text-sm font-medium">{subtitle || "Welcome to AstroEshop"}</span>
                            </div>
                        </div>

                        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold font-serif mb-6 leading-tight tracking-tight">
                            <span className="bg-gradient-to-r from-white via-white to-accent bg-clip-text text-transparent">
                                {title}
                            </span>
                        </h1>

                        {description && (
                            <p className="text-base md:text-lg lg:text-xl text-white/80 mb-8 lg:mb-10 max-w-xl mx-auto lg:mx-0 leading-relaxed">
                                {description}
                            </p>
                        )}

                        {(primaryCta || secondaryCta) && (
                            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
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
                        <div className="mt-10 flex flex-wrap items-center justify-center lg:justify-start gap-6 text-white/60 text-sm">
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
            </div>
        </section>
    );
}
