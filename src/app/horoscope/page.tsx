"use client";

import { MainLayout } from "@/components/templates/main-layout";
import { HoroscopeSign } from "@/types";
import { zodiacSigns } from "@/lib/data/zodiac";
import { getDailyHoroscope } from "@/lib/api/horoscope";
import { useState } from "react";
import { Star, Sparkles, Calendar, Flame, Droplets, Wind, Mountain, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const elementMeta: Record<string, { icon: typeof Flame; label: string }> = {
    Fire: { icon: Flame, label: "Fire" },
    Water: { icon: Droplets, label: "Water" },
    Air: { icon: Wind, label: "Air" },
    Earth: { icon: Mountain, label: "Earth" },
};

export default function HoroscopePage() {
    const [selectedSign, setSelectedSign] = useState<HoroscopeSign | null>(null);
    const [horoscope, setHoroscope] = useState<string>("");
    const [isLoading, setIsLoading] = useState(false);

    const handleSignClick = async (sign: HoroscopeSign) => {
        setSelectedSign(sign);
        setIsLoading(true);
        setHoroscope("");

        try {
            const result = await getDailyHoroscope(sign.sign);
            setHoroscope(result.text);
        } catch {
            setHoroscope(
                "Unable to fetch horoscope at this time. Please try again later."
            );
        } finally {
            setIsLoading(false);
        }
    };

    const today = new Date().toLocaleDateString("en-IN", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
    });

    return (
        <MainLayout>
            {/* Hero */}
            <section className="relative bg-primary text-white overflow-hidden">
                <div className="absolute inset-0">
                    <div className="absolute top-10 right-20 w-72 h-72 bg-accent/15 rounded-full blur-3xl" />
                    <div className="absolute -bottom-10 -left-10 w-56 h-56 bg-secondary/10 rounded-full blur-3xl" />
                </div>
                <div className="container mx-auto px-4 relative z-10 py-14 md:py-20">
                    <div className="max-w-2xl mx-auto text-center">
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-sm text-sm mb-5">
                            <Calendar className="h-3.5 w-3.5 text-accent" />
                            {today}
                        </div>
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-heading mb-4 leading-tight">
                            Daily Horoscope
                        </h1>
                        <p className="text-white/70 text-base md:text-lg max-w-lg mx-auto">
                            Discover what the cosmos has planned for you today. Select your zodiac sign below.
                        </p>
                    </div>
                </div>
            </section>

            {/* Zodiac Grid */}
            <section className="py-12 md:py-16">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-10">
                        <p className="text-xs font-bold uppercase tracking-widest text-secondary mb-2">Choose Your Sign</p>
                        <h2 className="text-2xl md:text-3xl font-bold font-heading text-gray-900">
                            12 Zodiac Signs
                        </h2>
                    </div>

                    <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3 md:gap-4 max-w-4xl mx-auto">
                        {zodiacSigns.map((sign) => {
                            const isActive = selectedSign?.sign === sign.sign;

                            return (
                                <button
                                    key={sign.sign}
                                    onClick={() => handleSignClick(sign)}
                                    className={cn(
                                        "flex flex-col items-center gap-1.5 p-4 md:p-5 rounded-2xl transition-all duration-300 group/sign",
                                        isActive
                                            ? "bg-primary text-white shadow-xl shadow-primary/25 scale-105"
                                            : "bg-white hover:shadow-lg hover:-translate-y-1 border border-gray-100 hover:border-primary/20"
                                    )}
                                >
                                    {/* Icon container */}
                                    <div className={cn(
                                        "w-12 h-12 md:w-14 md:h-14 rounded-xl flex items-center justify-center transition-colors",
                                        isActive
                                            ? "bg-white/15"
                                            : "bg-primary/5 group-hover/sign:bg-primary/10"
                                    )}>
                                        <span className={cn(
                                            "text-2xl md:text-3xl font-serif font-bold leading-none",
                                            isActive ? "text-white" : "text-primary"
                                        )}>
                                            {sign.symbol}
                                        </span>
                                    </div>

                                    <span className={cn(
                                        "text-xs font-bold",
                                        isActive ? "text-white" : "text-gray-900"
                                    )}>
                                        {sign.name}
                                    </span>

                                    <span className={cn(
                                        "text-[10px] -mt-0.5",
                                        isActive ? "text-white/70" : "text-secondary"
                                    )}>
                                        {sign.hindi}
                                    </span>

                                    <span className={cn(
                                        "text-[10px]",
                                        isActive ? "text-white/50" : "text-gray-400"
                                    )}>
                                        {sign.dates}
                                    </span>
                                </button>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* Reading Result */}
            {selectedSign && (
                <section className="pb-16">
                    <div className="container mx-auto px-4">
                        <div className="max-w-3xl mx-auto">
                            {/* Sign Header */}
                            <div className="relative rounded-t-3xl overflow-hidden bg-primary text-white p-8 md:p-10">
                                <div className="absolute top-0 right-0 w-40 h-40 bg-accent/15 rounded-full blur-3xl" />

                                <div className="relative z-10 flex flex-col sm:flex-row items-center gap-5">
                                    <div className="w-20 h-20 rounded-2xl bg-white/15 backdrop-blur-sm flex items-center justify-center shrink-0">
                                        <span className="text-5xl font-serif text-white">{selectedSign.symbol}</span>
                                    </div>
                                    <div className="text-center sm:text-left">
                                        <h3 className="text-2xl md:text-3xl font-bold font-heading">
                                            {selectedSign.name}
                                            <span className="text-accent ml-2 text-lg">({selectedSign.hindi})</span>
                                        </h3>
                                        <p className="text-white/50 text-sm mt-0.5">{selectedSign.dates}</p>
                                        <div className="flex items-center gap-2 mt-3 justify-center sm:justify-start">
                                            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-white/10 text-xs text-white/80">
                                                {(() => {
                                                    const el = elementMeta[selectedSign.element];
                                                    const ElIcon = el.icon;
                                                    return <><ElIcon className="h-3 w-3" />{el.label}</>;
                                                })()}
                                            </span>
                                            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-accent/20 text-xs text-accent">
                                                <Star className="h-3 w-3 fill-current" />
                                                Today&apos;s Reading
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Horoscope Text */}
                            <div className="rounded-b-3xl bg-white border border-t-0 border-gray-100 shadow-lg p-8 md:p-10">
                                {isLoading ? (
                                    <div className="text-center py-8">
                                        <div className="relative w-14 h-14 mx-auto mb-4">
                                            <div className="absolute inset-0 rounded-full border-4 border-primary/10" />
                                            <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-primary animate-spin" />
                                            <Sparkles className="absolute inset-0 m-auto h-5 w-5 text-primary animate-pulse" />
                                        </div>
                                        <p className="text-gray-400 text-sm">Reading the stars for {selectedSign.name}...</p>
                                    </div>
                                ) : (
                                    <div>
                                        <p className="text-base md:text-lg leading-relaxed text-gray-700">
                                            {horoscope}
                                        </p>

                                        <div className="mt-8 pt-6 border-t border-gray-100 flex flex-wrap gap-3">
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                className="rounded-full text-xs h-8 border-primary/20 text-primary hover:bg-primary/5"
                                                onClick={() => handleSignClick(selectedSign)}
                                            >
                                                <Sparkles className="h-3.5 w-3.5 mr-1.5" />
                                                Refresh Reading
                                            </Button>
                                            <Button
                                                size="sm"
                                                className="rounded-full text-xs h-8 bg-primary hover:bg-primary/90"
                                                asChild
                                            >
                                                <Link href="/shop">
                                                    Shop Gemstones
                                                    <ArrowRight className="h-3.5 w-3.5 ml-1.5" />
                                                </Link>
                                            </Button>
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Quick Switch */}
                            <div className="mt-8 text-center">
                                <p className="text-xs text-gray-400 mb-3">Check another sign</p>
                                <div className="flex flex-wrap justify-center gap-2">
                                    {zodiacSigns
                                        .filter((s) => s.sign !== selectedSign.sign)
                                        .map((sign) => (
                                            <button
                                                key={sign.sign}
                                                onClick={() => handleSignClick(sign)}
                                                className="w-10 h-10 rounded-xl bg-white hover:bg-primary/5 border border-gray-100 hover:border-primary/20 flex items-center justify-center text-lg font-serif text-primary transition-all hover:scale-110 hover:shadow-md"
                                                title={sign.name}
                                            >
                                                {sign.symbol}
                                            </button>
                                        ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            )}

            {/* Empty State */}
            {!selectedSign && (
                <section className="pb-20">
                    <div className="container mx-auto px-4 text-center">
                        <div className="max-w-sm mx-auto">
                            <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-accent/10 flex items-center justify-center">
                                <Star className="h-8 w-8 text-accent" />
                            </div>
                            <p className="text-sm text-gray-500">
                                Select your zodiac sign above to get your personalized daily horoscope reading.
                            </p>
                        </div>
                    </div>
                </section>
            )}

            {/* Bottom CTA */}
            <section className="py-12 border-t border-gray-100 bg-gray-50/40">
                <div className="container mx-auto px-4 text-center">
                    <h3 className="text-xl md:text-2xl font-bold font-heading text-gray-900 mb-2">
                        Want a Detailed Birth Chart Analysis?
                    </h3>
                    <p className="text-sm text-gray-500 mb-6 max-w-md mx-auto">
                        Get a personalized reading from our expert astrologers based on your exact birth details.
                    </p>
                    <div className="flex items-center justify-center gap-3">
                        <Button asChild className="bg-primary rounded-xl">
                            <Link href="/services">Our Services</Link>
                        </Button>
                        <Button variant="outline" className="rounded-xl" asChild>
                            <Link href="/contact">Contact an Expert</Link>
                        </Button>
                    </div>
                </div>
            </section>
        </MainLayout>
    );
}
