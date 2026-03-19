"use client";

import { useState, useMemo } from "react";
import { MainLayout } from "@/components/templates/main-layout";
import { Button } from "@/components/ui/button";
import {
    Sun,
    Moon,
    Star,
    Clock,
    Calendar,
    ChevronLeft,
    ChevronRight,
    Sunrise,
    Sunset,
    MoonStar,
    Sparkles,
    ArrowRight,
    AlertTriangle,
    PartyPopper,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { calculatePanchang } from "@/lib/panchang";
import Link from "next/link";

// Hindi day names
const hindiDays: Record<string, string> = {
    Sunday: "रविवार",
    Monday: "सोमवार",
    Tuesday: "मंगलवार",
    Wednesday: "बुधवार",
    Thursday: "गुरुवार",
    Friday: "शुक्रवार",
    Saturday: "शनिवार",
};

export default function PanchangPage() {
    const [selectedDate, setSelectedDate] = useState(new Date());

    const panchang = useMemo(() => calculatePanchang(selectedDate), [selectedDate]);

    const goToDay = (offset: number) => {
        setSelectedDate((prev) => {
            const d = new Date(prev);
            d.setDate(d.getDate() + offset);
            return d;
        });
    };

    const goToToday = () => setSelectedDate(new Date());

    const isToday =
        selectedDate.toDateString() === new Date().toDateString();

    const formattedDate = selectedDate.toLocaleDateString("en-IN", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
    });

    const hindiDay = hindiDays[panchang.vara] || "";

    return (
        <MainLayout>
            {/* Hero */}
            <section className="relative bg-primary text-white overflow-hidden">
                <div className="absolute inset-0">
                    <div className="absolute top-10 right-20 w-72 h-72 bg-accent/15 rounded-full blur-3xl" />
                    <div className="absolute -bottom-10 -left-10 w-56 h-56 bg-secondary/10 rounded-full blur-3xl" />
                </div>
                <div className="container mx-auto px-4 relative z-10 py-12 md:py-16">
                    <div className="max-w-2xl mx-auto text-center">
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-sm text-sm mb-4">
                            <Calendar className="h-3.5 w-3.5 text-accent" />
                            Hindu Calendar
                        </div>
                        <h1 className="text-4xl md:text-5xl font-bold font-heading mb-3">
                            Daily Panchang
                        </h1>
                        <p className="text-white/60 text-base max-w-lg mx-auto">
                            Tithi, Nakshatra, Yoga, Karana &amp; auspicious timings for {panchang.masa} month
                        </p>
                    </div>
                </div>
            </section>

            {/* Date Navigator */}
            <div className="sticky top-16 z-30 bg-white border-b border-gray-100 shadow-sm">
                <div className="container mx-auto px-4">
                    <div className="flex items-center justify-between py-3">
                        <Button
                            variant="ghost"
                            size="icon"
                            className="h-9 w-9 rounded-full"
                            onClick={() => goToDay(-1)}
                        >
                            <ChevronLeft className="h-5 w-5" />
                        </Button>

                        <div className="text-center">
                            <p className="text-sm font-bold text-gray-900">{formattedDate}</p>
                            <p className="text-[11px] text-secondary">
                                {hindiDay} &middot; {panchang.paksha} Paksha &middot; {panchang.masa} ({panchang.ritu})
                            </p>
                        </div>

                        <Button
                            variant="ghost"
                            size="icon"
                            className="h-9 w-9 rounded-full"
                            onClick={() => goToDay(1)}
                        >
                            <ChevronRight className="h-5 w-5" />
                        </Button>
                    </div>
                    {!isToday && (
                        <div className="flex justify-center pb-2">
                            <Button
                                variant="outline"
                                size="sm"
                                className="rounded-full text-xs h-7 px-3 border-primary/20 text-primary"
                                onClick={goToToday}
                            >
                                Go to Today
                            </Button>
                        </div>
                    )}
                </div>
            </div>

            <section className="py-8 md:py-12">
                <div className="container mx-auto px-4 max-w-5xl">

                    {/* Festivals Banner */}
                    {panchang.festivals.length > 0 && (
                        <div className="mb-8 rounded-2xl bg-accent/10 border border-accent/20 p-5">
                            <div className="flex items-start gap-3">
                                <div className="w-10 h-10 rounded-xl bg-accent/20 flex items-center justify-center shrink-0">
                                    <PartyPopper className="h-5 w-5 text-accent" />
                                </div>
                                <div>
                                    <p className="text-xs font-bold uppercase tracking-wider text-accent mb-1">Festival Today</p>
                                    {panchang.festivals.map((f) => (
                                        <div key={f.name}>
                                            <p className="font-bold text-gray-900">{f.name}</p>
                                            {f.description && (
                                                <p className="text-sm text-gray-600 mt-0.5">{f.description}</p>
                                            )}
                                            {f.isFastingDay && (
                                                <span className="inline-flex items-center gap-1 mt-1 text-[11px] font-medium text-primary bg-primary/5 px-2 py-0.5 rounded-full">
                                                    Fasting Day
                                                </span>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Sun & Moon Timings */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
                        {[
                            { icon: Sunrise, label: "Sunrise", value: panchang.sunrise, color: "text-amber-500", bg: "bg-amber-50" },
                            { icon: Sunset, label: "Sunset", value: panchang.sunset, color: "text-orange-500", bg: "bg-orange-50" },
                            { icon: MoonStar, label: "Moonrise", value: panchang.moonrise, color: "text-blue-500", bg: "bg-blue-50" },
                            { icon: AlertTriangle, label: "Rahu Kaal", value: panchang.rahuKaal, color: "text-red-600", bg: "bg-red-50" },
                        ].map(({ icon: Icon, label, value, color, bg }) => (
                            <div key={label} className={cn("rounded-2xl p-4 text-center", bg)}>
                                <Icon className={cn("h-6 w-6 mx-auto mb-2", color)} />
                                <p className="text-[11px] text-gray-500 mb-0.5">{label}</p>
                                <p className={cn("text-lg md:text-xl font-bold", label === "Rahu Kaal" ? "text-red-600" : "text-gray-900")}>
                                    {value}
                                </p>
                            </div>
                        ))}
                    </div>

                    {/* Main Panchang Elements */}
                    <div className="rounded-2xl border border-gray-100 bg-white overflow-hidden mb-8">
                        <div className="bg-primary/3 px-6 py-4 border-b border-gray-100">
                            <h2 className="text-lg font-bold font-heading text-gray-900 flex items-center gap-2">
                                <Sparkles className="h-5 w-5 text-primary" />
                                पंचांग — Five Elements
                            </h2>
                        </div>
                        <div className="divide-y divide-gray-50">
                            {[
                                { icon: Moon, label: "तिथि", english: "Tithi", value: `${panchang.paksha} ${panchang.tithi}`, sub: `Ends at ${panchang.tithiEndTime}` },
                                { icon: Star, label: "नक्षत्र", english: "Nakshatra", value: `${panchang.nakshatra} (Pada ${panchang.nakshatraPada})`, sub: `Ends at ${panchang.nakshatraEndTime}` },
                                { icon: Sun, label: "योग", english: "Yoga", value: panchang.yoga, sub: `Ends at ${panchang.yogaEndTime}` },
                                { icon: Calendar, label: "करण", english: "Karana", value: panchang.karana, sub: null },
                                { icon: Clock, label: "वार", english: "Day", value: `${panchang.vara} (${hindiDay})`, sub: null },
                            ].map(({ icon: Icon, label, english, value, sub }) => (
                                <div key={english} className="flex items-center gap-4 px-6 py-4">
                                    <div className="w-10 h-10 rounded-xl bg-primary/5 flex items-center justify-center shrink-0">
                                        <Icon className="h-5 w-5 text-primary" />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-[11px] text-gray-400">
                                            {label} ({english})
                                        </p>
                                        <p className="font-bold text-gray-900 text-sm">{value}</p>
                                    </div>
                                    {sub && (
                                        <span className="text-[11px] text-gray-400 shrink-0">{sub}</span>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Auspicious & Inauspicious Timings */}
                    <div className="grid md:grid-cols-2 gap-4 mb-8">
                        {/* Auspicious */}
                        <div className="rounded-2xl border border-green-100 bg-white overflow-hidden">
                            <div className="bg-green-50 px-5 py-3 border-b border-green-100">
                                <h3 className="text-sm font-bold text-green-800 flex items-center gap-2">
                                    <Sparkles className="h-4 w-4" />
                                    Auspicious Timings
                                </h3>
                            </div>
                            <div className="divide-y divide-green-50">
                                {[
                                    { label: "Brahma Muhurta", value: panchang.brahmaMuhurta },
                                    { label: "Abhijit Muhurta", value: panchang.abhijitMuhurta },
                                ].map(({ label, value }) => (
                                    <div key={label} className="flex items-center justify-between px-5 py-3">
                                        <span className="text-sm text-gray-700">{label}</span>
                                        <span className="text-sm font-bold text-green-700">{value}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Inauspicious */}
                        <div className="rounded-2xl border border-red-100 bg-white overflow-hidden">
                            <div className="bg-red-50 px-5 py-3 border-b border-red-100">
                                <h3 className="text-sm font-bold text-red-800 flex items-center gap-2">
                                    <AlertTriangle className="h-4 w-4" />
                                    Inauspicious Timings
                                </h3>
                            </div>
                            <div className="divide-y divide-red-50">
                                {[
                                    { label: "Rahu Kaal", value: panchang.rahuKaal },
                                    { label: "Yamaganda", value: panchang.yamaganda },
                                    { label: "Gulika Kaal", value: panchang.gulikaKaal },
                                ].map(({ label, value }) => (
                                    <div key={label} className="flex items-center justify-between px-5 py-3">
                                        <span className="text-sm text-gray-700">{label}</span>
                                        <span className="text-sm font-bold text-red-600">{value}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Astronomical Info */}
                    <div className="rounded-2xl border border-gray-100 bg-white overflow-hidden mb-8">
                        <div className="bg-primary/3 px-6 py-4 border-b border-gray-100">
                            <h3 className="text-sm font-bold text-gray-900 flex items-center gap-2">
                                <Moon className="h-4 w-4 text-primary" />
                                Astronomical Details
                            </h3>
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-gray-50">
                            {[
                                { label: "Moon Sign", value: panchang.moonRashi },
                                { label: "Sun Sign", value: panchang.sunRashi },
                                { label: "Season (Ritu)", value: panchang.ritu },
                                { label: "Hindu Month", value: panchang.masa },
                            ].map(({ label, value }) => (
                                <div key={label} className="px-5 py-4 text-center">
                                    <p className="text-[11px] text-gray-400 mb-0.5">{label}</p>
                                    <p className="text-sm font-bold text-gray-900">{value}</p>
                                </div>
                            ))}
                        </div>
                        <div className="border-t border-gray-50 grid grid-cols-3 divide-x divide-gray-50">
                            {[
                                { label: "Vikram Samvat", value: String(panchang.samvat.vikram) },
                                { label: "Shaka Samvat", value: String(panchang.samvat.shaka) },
                                { label: "Samvatsara", value: panchang.samvat.samvatsara },
                            ].map(({ label, value }) => (
                                <div key={label} className="px-5 py-3 text-center">
                                    <p className="text-[11px] text-gray-400 mb-0.5">{label}</p>
                                    <p className="text-sm font-bold text-gray-900">{value}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Bottom CTA */}
            <section className="py-12 border-t border-gray-100 bg-gray-50/40">
                <div className="container mx-auto px-4 text-center">
                    <h3 className="text-xl md:text-2xl font-bold font-heading text-gray-900 mb-2">
                        Need Personalized Muhurta Guidance?
                    </h3>
                    <p className="text-sm text-gray-500 mb-6 max-w-md mx-auto">
                        Our expert astrologers can find the most auspicious dates and timings for your important events.
                    </p>
                    <div className="flex items-center justify-center gap-3">
                        <Button asChild className="bg-primary rounded-xl">
                            <Link href="/services">
                                Book Consultation
                                <ArrowRight className="h-4 w-4 ml-1.5" />
                            </Link>
                        </Button>
                        <Button variant="outline" className="rounded-xl" asChild>
                            <Link href="/horoscope">Daily Horoscope</Link>
                        </Button>
                    </div>
                </div>
            </section>
        </MainLayout>
    );
}
