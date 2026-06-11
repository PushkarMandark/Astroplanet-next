"use client";

import {
    Suspense,
    useCallback,
    useEffect,
    useMemo,
    useRef,
    useState,
} from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { toast } from "sonner";
import {
    Activity,
    ArrowRight,
    Briefcase,
    Calendar,
    Check,
    Clock,
    Copy,
    Droplets,
    Flame,
    Gem,
    Hash as HashIcon,
    Heart,
    Loader2,
    Mountain,
    Palette,
    Share2,
    Sparkles,
    Star,
    TrendingUp,
    Users,
    Wind,
    X as XIcon,
} from "lucide-react";

import { MainLayout } from "@/components/templates/main-layout";
import { ConsultationButton } from "@/components/molecules/consultation-button";
import { FaqSection, LanguageSwitcher } from "@/components/molecules";
import { Button } from "@/components/ui/button";
import { useT, useLang } from "@/lib/i18n";
import { horoscope as horoscopeDict } from "@/lib/i18n/translations/horoscope";
import { Card, CardContent } from "@/components/ui/card";
import {
    Tabs,
    TabsList,
    TabsTrigger,
    TabsContent,
} from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import { useMounted } from "@/lib/hooks/use-mounted";
import { zodiacSigns } from "@/lib/data/zodiac";
import {
    getHoroscopeData,
    getRankedSigns,
    getSignFromDate,
    type HoroscopeData,
    type HoroscopePeriod,
} from "@/lib/api/horoscope";
import type { HoroscopeSign } from "@/types";

// ---------- constants ----------

const STORAGE_KEY = "astroplanet-horoscope-sign";

const PERIOD_TABS: { value: HoroscopePeriod; labelKey: "periodToday" | "periodWeekly" | "periodMonthly" | "periodYearly" }[] = [
    { value: "daily", labelKey: "periodToday" },
    { value: "weekly", labelKey: "periodWeekly" },
    { value: "monthly", labelKey: "periodMonthly" },
    { value: "yearly", labelKey: "periodYearly" },
];

const elementMeta: Record<
    HoroscopeSign["element"],
    { icon: typeof Flame; label: string }
> = {
    Fire: { icon: Flame, label: "Fire" },
    Water: { icon: Droplets, label: "Water" },
    Air: { icon: Wind, label: "Air" },
    Earth: { icon: Mountain, label: "Earth" },
};

const aspectMeta: {
    key: keyof HoroscopeData["aspects"];
    label: string;
    icon: typeof Heart;
}[] = [
    { key: "love", label: "Love", icon: Heart },
    { key: "career", label: "Career", icon: Briefcase },
    { key: "health", label: "Health", icon: Activity },
    { key: "finance", label: "Finance", icon: TrendingUp },
    { key: "family", label: "Family", icon: Users },
];

// ---------- helpers ----------

function StarRating({
    value,
    size = "sm",
    className,
}: {
    value: number;
    size?: "sm" | "md";
    className?: string;
}) {
    const filled = Math.max(0, Math.min(5, Math.round(value)));
    const starSize = size === "md" ? "h-4 w-4" : "h-3.5 w-3.5";

    return (
        <div className={cn("inline-flex items-center gap-0.5", className)}>
            {Array.from({ length: 5 }).map((_, i) => (
                <Star
                    key={i}
                    className={cn(
                        starSize,
                        i < filled
                            ? "fill-accent text-accent"
                            : "text-gray-300"
                    )}
                />
            ))}
        </div>
    );
}

// ---------- sub-components (module scope) ----------

interface TopLuckyStripProps {
    selectedSignKey: string | null;
    onSelect: (sign: HoroscopeSign) => void;
    eyebrowLabel: string;
    titleLabel: string;
}

function TopLuckyStrip({ selectedSignKey, onSelect, eyebrowLabel, titleLabel }: TopLuckyStripProps) {
    const ranked = useMemo(() => getRankedSigns("daily").slice(0, 3), []);

    if (ranked.length === 0) return null;

    return (
        <section className="py-8 bg-gradient-to-b from-background to-white">
            <div className="container mx-auto px-4">
                <div className="flex items-center justify-between mb-4 max-w-4xl mx-auto">
                    <div>
                        <p className="text-xs font-bold uppercase tracking-widest text-secondary mb-1">
                            {eyebrowLabel}
                        </p>
                        <h3 className="text-lg md:text-xl font-bold font-heading text-gray-900">
                            {titleLabel}
                        </h3>
                    </div>
                    <Sparkles className="h-5 w-5 text-accent shrink-0" />
                </div>

                <div className="flex gap-3 overflow-x-auto pt-3 pb-2 max-w-4xl mx-auto snap-x snap-mandatory">
                    {ranked.map(({ sign, rating }, idx) => {
                        const isActive = selectedSignKey === sign.sign;
                        return (
                            <button
                                key={sign.sign}
                                onClick={() => onSelect(sign)}
                                className={cn(
                                    "relative snap-start shrink-0 flex items-center gap-3 px-4 py-3 rounded-2xl transition-all border text-left min-w-55",
                                    isActive
                                        ? "bg-gradient-to-br from-accent/90 to-accent text-primary border-accent shadow-lg shadow-accent/30"
                                        : "bg-white border-accent/20 hover:border-accent hover:shadow-md"
                                )}
                            >
                                <div
                                    className={cn(
                                        "absolute -top-2 -left-2 w-6 h-6 rounded-full flex items-center justify-center text-[11px] font-bold shadow",
                                        idx === 0
                                            ? "bg-accent text-primary"
                                            : idx === 1
                                                ? "bg-primary text-white"
                                                : "bg-secondary text-white"
                                    )}
                                >
                                    {idx + 1}
                                </div>
                                <div
                                    className={cn(
                                        "w-11 h-11 rounded-xl flex items-center justify-center shrink-0",
                                        isActive
                                            ? "bg-primary/10"
                                            : "bg-accent/10"
                                    )}
                                >
                                    <span
                                        className={cn(
                                            "text-2xl font-serif leading-none",
                                            isActive
                                                ? "text-primary"
                                                : "text-accent"
                                        )}
                                    >
                                        {sign.symbol}
                                    </span>
                                </div>
                                <div className="flex flex-col min-w-0">
                                    <span
                                        className={cn(
                                            "text-sm font-bold truncate",
                                            isActive
                                                ? "text-primary"
                                                : "text-gray-900"
                                        )}
                                    >
                                        {sign.name}
                                    </span>
                                    <span
                                        className={cn(
                                            "text-[11px] truncate",
                                            isActive
                                                ? "text-primary/70"
                                                : "text-secondary"
                                        )}
                                    >
                                        {sign.hindi}
                                    </span>
                                    <StarRating
                                        value={rating}
                                        className="mt-0.5"
                                    />
                                </div>
                            </button>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}

interface DobDetectProps {
    value: string;
    onChange: (v: string) => void;
    onDetected: (sign: HoroscopeSign) => void;
    cardTitle: string;
    cardSubtitle: string;
    detectBtnLabel: string;
    toastNoDate: string;
    toastInvalid: string;
    toastError: string;
}

function DobDetect({ value, onChange, onDetected, cardTitle, cardSubtitle, detectBtnLabel, toastNoDate, toastInvalid, toastError }: DobDetectProps) {
    const [open, setOpen] = useState(false);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!value) {
            toast.error(toastNoDate);
            return;
        }
        const parsed = new Date(value);
        if (Number.isNaN(parsed.getTime())) {
            toast.error(toastInvalid);
            return;
        }
        const signKey = getSignFromDate(parsed);
        const match = zodiacSigns.find((s) => s.sign === signKey);
        if (match) {
            onDetected(match);
            toast.success(`Your sign is ${match.name} (${match.hindi})`);
            setOpen(false);
        } else {
            toast.error(toastError);
        }
    };

    return (
        <section className="py-4">
            <div className="container mx-auto px-4">
                <div className="max-w-4xl mx-auto">
                    <Card className="rounded-2xl border-accent/20 bg-accent/5 shadow-none py-0">
                        <CardContent className="p-4 md:p-5">
                            <button
                                type="button"
                                onClick={() => setOpen((v) => !v)}
                                className="flex items-center justify-between w-full text-left"
                            >
                                <div className="flex items-center gap-3">
                                    <div className="w-9 h-9 rounded-xl bg-accent/20 flex items-center justify-center shrink-0">
                                        <Calendar className="h-4 w-4 text-primary" />
                                    </div>
                                    <div>
                                        <p className="text-sm font-bold text-gray-900">
                                            {cardTitle}
                                        </p>
                                        <p className="text-xs text-gray-500">
                                            {cardSubtitle}
                                        </p>
                                    </div>
                                </div>
                                <span
                                    className={cn(
                                        "text-primary text-xs font-semibold transition-transform",
                                        open && "rotate-180"
                                    )}
                                >
                                    <ArrowRight
                                        className={cn(
                                            "h-4 w-4 transition-transform",
                                            open && "rotate-90"
                                        )}
                                    />
                                </span>
                            </button>

                            {open && (
                                <form
                                    onSubmit={handleSubmit}
                                    className="mt-4 flex flex-col sm:flex-row gap-2"
                                >
                                    <input
                                        type="date"
                                        value={value}
                                        onChange={(e) =>
                                            onChange(e.target.value)
                                        }
                                        max={new Date()
                                            .toISOString()
                                            .slice(0, 10)}
                                        className="flex-1 h-10 px-3 rounded-xl border border-accent/30 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
                                    />
                                    <Button
                                        type="submit"
                                        className="rounded-xl bg-primary hover:bg-primary/90 h-10"
                                    >
                                        {detectBtnLabel}
                                        <ArrowRight className="h-4 w-4 ml-1.5" />
                                    </Button>
                                </form>
                            )}
                        </CardContent>
                    </Card>
                </div>
            </div>
        </section>
    );
}

interface ZodiacGridProps {
    selectedSignKey: string | null;
    onSelect: (sign: HoroscopeSign) => void;
    eyebrowLabel: string;
    titleLabel: string;
}

function ZodiacGrid({ selectedSignKey, onSelect, eyebrowLabel, titleLabel }: ZodiacGridProps) {
    return (
        <section className="py-10 md:py-12">
            <div className="container mx-auto px-4">
                <div className="text-center mb-8">
                    <p className="text-xs font-bold uppercase tracking-widest text-secondary mb-2">
                        {eyebrowLabel}
                    </p>
                    <h2 className="text-2xl md:text-3xl font-bold font-heading text-gray-900">
                        {titleLabel}
                    </h2>
                </div>

                <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3 md:gap-4 max-w-4xl mx-auto">
                    {zodiacSigns.map((sign) => {
                        const isActive = selectedSignKey === sign.sign;
                        return (
                            <button
                                key={sign.sign}
                                onClick={() => onSelect(sign)}
                                className={cn(
                                    "flex flex-col items-center gap-1.5 p-4 md:p-5 rounded-2xl transition-all duration-300 group/sign",
                                    isActive
                                        ? "bg-primary text-white shadow-xl shadow-primary/25 scale-105"
                                        : "bg-white hover:shadow-lg hover:-translate-y-1 border border-gray-100 hover:border-primary/20"
                                )}
                            >
                                <div
                                    className={cn(
                                        "w-12 h-12 md:w-14 md:h-14 rounded-xl flex items-center justify-center transition-colors",
                                        isActive
                                            ? "bg-white/15"
                                            : "bg-primary/5 group-hover/sign:bg-primary/10"
                                    )}
                                >
                                    <span
                                        className={cn(
                                            "text-2xl md:text-3xl font-serif font-bold leading-none",
                                            isActive
                                                ? "text-white"
                                                : "text-primary"
                                        )}
                                    >
                                        {sign.symbol}
                                    </span>
                                </div>
                                <span
                                    className={cn(
                                        "text-xs font-bold",
                                        isActive
                                            ? "text-white"
                                            : "text-gray-900"
                                    )}
                                >
                                    {sign.name}
                                </span>
                                <span
                                    className={cn(
                                        "text-[10px] -mt-0.5",
                                        isActive
                                            ? "text-white/70"
                                            : "text-secondary"
                                    )}
                                >
                                    {sign.hindi}
                                </span>
                                <span
                                    className={cn(
                                        "text-[10px]",
                                        isActive
                                            ? "text-white/50"
                                            : "text-gray-400"
                                    )}
                                >
                                    {sign.dates}
                                </span>
                            </button>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}

interface SignHeaderProps {
    sign: HoroscopeSign;
    data: HoroscopeData;
    ruledByLabel: string;
    moodLabel: string;
    overallRatingLabel: string;
}

function SignHeader({ sign, data, ruledByLabel, moodLabel, overallRatingLabel }: SignHeaderProps) {
    const el = elementMeta[sign.element];
    const ElIcon = el.icon;

    return (
        <div className="relative rounded-3xl overflow-hidden bg-primary text-white p-8 md:p-10">
            <div className="absolute top-0 right-0 w-56 h-56 bg-accent/15 rounded-full blur-3xl" />
            <div className="absolute -bottom-10 -left-10 w-48 h-48 bg-secondary/15 rounded-full blur-3xl" />

            <div className="relative z-10 flex flex-col md:flex-row items-center gap-6">
                <div className="w-24 h-24 rounded-3xl bg-white/15 backdrop-blur-sm flex items-center justify-center shrink-0">
                    <span className="text-6xl font-serif text-white leading-none">
                        {sign.symbol}
                    </span>
                </div>

                <div className="flex-1 text-center md:text-left">
                    <h3 className="text-3xl md:text-4xl font-bold font-heading">
                        {sign.name}
                        <span className="text-accent ml-2 text-xl">
                            ({sign.hindi})
                        </span>
                    </h3>
                    <p className="text-white/60 text-sm mt-1">{sign.dates}</p>

                    <div className="flex flex-wrap items-center gap-2 mt-4 justify-center md:justify-start">
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-xs text-white/90">
                            <ElIcon className="h-3 w-3" />
                            {el.label}
                        </span>
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-accent/20 text-xs text-accent">
                            <Sparkles className="h-3 w-3" />
                            {ruledByLabel} {data.ruler}
                        </span>
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-xs text-white/90">
                            {moodLabel} {data.mood}
                        </span>
                    </div>

                    <div className="mt-4 flex items-center gap-2 justify-center md:justify-start">
                        <span className="text-xs text-white/70">
                            {overallRatingLabel}
                        </span>
                        <StarRating value={data.overallRating} size="md" />
                        <span className="text-xs text-accent font-semibold">
                            {data.overallRating}/5
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}

interface LuckyStatsGridProps {
    data: HoroscopeData;
    luckyNumberLabel: string;
    luckyColorLabel: string;
    luckyTimeLabel: string;
    bestMatchLabel: string;
}

function LuckyStatsGrid({ data, luckyNumberLabel, luckyColorLabel, luckyTimeLabel, bestMatchLabel }: LuckyStatsGridProps) {
    return (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
            <Card className="rounded-2xl border-gray-100 hover:shadow-md hover:-translate-y-0.5 transition-all py-0">
                <CardContent className="p-4 md:p-5 flex flex-col items-center text-center gap-2">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                        <HashIcon className="h-5 w-5 text-primary" />
                    </div>
                    <p className="text-xs uppercase tracking-wider text-gray-500 font-semibold">
                        {luckyNumberLabel}
                    </p>
                    <p className="text-3xl font-bold font-heading text-primary leading-none">
                        {data.luckyNumber}
                    </p>
                </CardContent>
            </Card>

            <Card className="rounded-2xl border-gray-100 hover:shadow-md hover:-translate-y-0.5 transition-all py-0">
                <CardContent className="p-4 md:p-5 flex flex-col items-center text-center gap-2">
                    <div className="w-10 h-10 rounded-xl bg-secondary/10 flex items-center justify-center">
                        <Palette className="h-5 w-5 text-secondary" />
                    </div>
                    <p className="text-xs uppercase tracking-wider text-gray-500 font-semibold">
                        {luckyColorLabel}
                    </p>
                    <div className="flex items-center gap-2">
                        <span
                            className="w-6 h-6 rounded-full border-2 border-white shadow"
                            style={{ backgroundColor: data.luckyColor.hex }}
                            aria-hidden
                        />
                        <span className="text-sm font-bold text-gray-900">
                            {data.luckyColor.name}
                        </span>
                    </div>
                </CardContent>
            </Card>

            <Card className="rounded-2xl border-gray-100 hover:shadow-md hover:-translate-y-0.5 transition-all py-0">
                <CardContent className="p-4 md:p-5 flex flex-col items-center text-center gap-2">
                    <div className="w-10 h-10 rounded-xl bg-accent/20 flex items-center justify-center">
                        <Clock className="h-5 w-5 text-primary" />
                    </div>
                    <p className="text-xs uppercase tracking-wider text-gray-500 font-semibold">
                        {luckyTimeLabel}
                    </p>
                    <p className="text-sm font-bold text-gray-900">
                        {data.luckyTime}
                    </p>
                </CardContent>
            </Card>

            <Card className="rounded-2xl border-gray-100 hover:shadow-md hover:-translate-y-0.5 transition-all py-0">
                <CardContent className="p-4 md:p-5 flex flex-col items-center text-center gap-2">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                        <span className="text-xl font-serif text-primary leading-none">
                            {data.compatibleSign.symbol}
                        </span>
                    </div>
                    <p className="text-xs uppercase tracking-wider text-gray-500 font-semibold">
                        {bestMatchLabel}
                    </p>
                    <p className="text-sm font-bold text-gray-900">
                        {data.compatibleSign.name}
                    </p>
                </CardContent>
            </Card>
        </div>
    );
}

interface LifeAspectsProps {
    data: HoroscopeData;
    titleLabel: string;
    outOfLabel: string;
    aspectLabels: Record<keyof HoroscopeData["aspects"], string>;
}

function LifeAspects({ data, titleLabel, outOfLabel, aspectLabels }: LifeAspectsProps) {
    return (
        <Card className="rounded-2xl border-gray-100 py-0">
            <CardContent className="p-6 md:p-8">
                <div className="flex items-center justify-between mb-5">
                    <h4 className="text-lg font-bold font-heading text-gray-900">
                        {titleLabel}
                    </h4>
                    <span className="text-xs text-gray-400">{outOfLabel}</span>
                </div>

                <div className="space-y-4">
                    {aspectMeta.map(({ key, icon: Icon }) => {
                        const value = data.aspects[key];
                        const pct = Math.max(0, Math.min(100, (value / 5) * 100));

                        return (
                            <div
                                key={key}
                                className="grid grid-cols-[auto_1fr_auto] items-center gap-3"
                            >
                                <div className="flex items-center gap-2 min-w-22.5">
                                    <div className="w-8 h-8 rounded-lg bg-primary/5 flex items-center justify-center shrink-0">
                                        <Icon className="h-4 w-4 text-primary" />
                                    </div>
                                    <span className="text-sm font-semibold text-gray-700">
                                        {aspectLabels[key]}
                                    </span>
                                </div>

                                <div className="h-2.5 rounded-full bg-gray-100 overflow-hidden">
                                    <div
                                        className="h-full rounded-full bg-gradient-to-r from-primary to-accent transition-all"
                                        style={{ width: `${pct}%` }}
                                    />
                                </div>

                                <StarRating value={value} />
                            </div>
                        );
                    })}
                </div>
            </CardContent>
        </Card>
    );
}

interface DosAndDontsProps {
    dos: string[];
    donts: string[];
    dosTitle: string;
    dontsTitle: string;
}

function DosAndDonts({ dos, donts, dosTitle, dontsTitle }: DosAndDontsProps) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card className="rounded-2xl border-green-100 bg-green-50/50 py-0">
                <CardContent className="p-6">
                    <div className="flex items-center gap-2 mb-4">
                        <div className="w-8 h-8 rounded-lg bg-green-100 flex items-center justify-center">
                            <Check className="h-4 w-4 text-green-700" />
                        </div>
                        <h4 className="text-base font-bold font-heading text-green-900">
                            {dosTitle}
                        </h4>
                    </div>
                    <ul className="space-y-3">
                        {dos.map((item, i) => (
                            <li
                                key={i}
                                className="flex items-start gap-2 text-sm text-gray-700"
                            >
                                <Check className="h-4 w-4 text-green-600 mt-0.5 shrink-0" />
                                <span>{item}</span>
                            </li>
                        ))}
                    </ul>
                </CardContent>
            </Card>

            <Card className="rounded-2xl border-red-100 bg-red-50/50 py-0">
                <CardContent className="p-6">
                    <div className="flex items-center gap-2 mb-4">
                        <div className="w-8 h-8 rounded-lg bg-red-100 flex items-center justify-center">
                            <XIcon className="h-4 w-4 text-red-700" />
                        </div>
                        <h4 className="text-base font-bold font-heading text-red-900">
                            {dontsTitle}
                        </h4>
                    </div>
                    <ul className="space-y-3">
                        {donts.map((item, i) => (
                            <li
                                key={i}
                                className="flex items-start gap-2 text-sm text-gray-700"
                            >
                                <XIcon className="h-4 w-4 text-red-600 mt-0.5 shrink-0" />
                                <span>{item}</span>
                            </li>
                        ))}
                    </ul>
                </CardContent>
            </Card>
        </div>
    );
}

interface MantraCardProps {
    mantra: HoroscopeData["mantra"];
    eyebrowLabel: string;
    chantHint: string;
    copyBtnLabel: string;
    copiedBtnLabel: string;
    copiedToast: string;
    copyErrorToast: string;
}

function MantraCard({ mantra, eyebrowLabel, chantHint, copyBtnLabel, copiedBtnLabel, copiedToast, copyErrorToast }: MantraCardProps) {
    const [copied, setCopied] = useState(false);

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(
                `${mantra.sanskrit}\n${mantra.transliteration}\n${mantra.meaning}`
            );
            setCopied(true);
            toast.success(copiedToast);
            window.setTimeout(() => setCopied(false), 2000);
        } catch {
            toast.error(copyErrorToast);
        }
    };

    return (
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-primary via-primary to-[#5a0606] text-white p-8 md:p-10">
            <div className="absolute top-0 right-0 w-56 h-56 bg-accent/20 rounded-full blur-3xl" />
            <div className="absolute -bottom-10 -left-10 w-48 h-48 bg-secondary/10 rounded-full blur-3xl" />

            <div className="relative z-10">
                <div className="flex items-start justify-between gap-4 mb-5">
                    <div className="flex items-center gap-2">
                        <div className="w-9 h-9 rounded-xl bg-accent/20 flex items-center justify-center">
                            <Sparkles className="h-4 w-4 text-accent" />
                        </div>
                        <div>
                            <p className="text-[11px] uppercase tracking-widest text-accent font-bold">
                                {eyebrowLabel}
                            </p>
                            <p className="text-xs text-white/60">
                                {chantHint}
                            </p>
                        </div>
                    </div>

                    <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={handleCopy}
                        className="h-8 rounded-full bg-white/10 hover:bg-white/20 text-white text-xs border border-white/10"
                    >
                        {copied ? (
                            <>
                                <Check className="h-3.5 w-3.5 mr-1" />
                                {copiedBtnLabel}
                            </>
                        ) : (
                            <>
                                <Copy className="h-3.5 w-3.5 mr-1" />
                                {copyBtnLabel}
                            </>
                        )}
                    </Button>
                </div>

                <p className="text-2xl md:text-3xl font-heading text-accent leading-snug mb-3">
                    {mantra.sanskrit}
                </p>
                <p className="text-sm md:text-base italic text-white/80 mb-3">
                    {mantra.transliteration}
                </p>
                <p className="text-sm md:text-base text-white/70 leading-relaxed">
                    {mantra.meaning}
                </p>
            </div>
        </div>
    );
}

interface GemstoneCardProps {
    gemstone: HoroscopeData["gemstone"];
    ruler: string;
    eyebrowLabel: string;
    subtextTemplate: string;
    shopBtnLabel: string;
}

function GemstoneCard({ gemstone, ruler, eyebrowLabel, subtextTemplate, shopBtnLabel }: GemstoneCardProps) {
    const subtext = subtextTemplate.replace("{{ruler}}", ruler);
    return (
        <Card className="rounded-3xl border-accent/30 bg-gradient-to-br from-accent/10 via-background to-white py-0 overflow-hidden">
            <CardContent className="p-6 md:p-8 flex flex-col md:flex-row items-center gap-6">
                <div className="w-20 h-20 rounded-2xl bg-accent/20 flex items-center justify-center shrink-0">
                    <Gem className="h-9 w-9 text-primary" />
                </div>

                <div className="flex-1 text-center md:text-left">
                    <p className="text-[11px] uppercase tracking-widest text-secondary font-bold mb-1">
                        {eyebrowLabel}
                    </p>
                    <h4 className="text-2xl font-bold font-heading text-gray-900">
                        {gemstone.name}
                        <span className="text-primary ml-2 text-base">
                            ({gemstone.hindi})
                        </span>
                    </h4>
                    <p className="text-sm text-gray-500 mt-1">
                        {subtext}
                    </p>
                </div>

                <Button
                    asChild
                    className="rounded-xl bg-primary hover:bg-primary/90 h-11 px-5"
                >
                    <Link href={`/shop/${gemstone.shopCategory}`}>
                        {shopBtnLabel}
                        <ArrowRight className="h-4 w-4 ml-1.5" />
                    </Link>
                </Button>
            </CardContent>
        </Card>
    );
}

interface ShareBarProps {
    sign: HoroscopeSign;
    overall: string;
    shareLabel: string;
    periodLabel: string;
}

function ShareBar({ sign, overall, shareLabel, periodLabel }: ShareBarProps) {
    const mounted = useMounted();

    const shareText = `${sign.name} (${sign.hindi}) — ${periodLabel}'s Reading: ${overall.slice(0, 140)}${overall.length > 140 ? "..." : ""}`;
    const shareUrl =
        mounted && typeof window !== "undefined"
            ? `${window.location.origin}/free-horoscope?sign=${sign.sign}`
            : `/free-horoscope?sign=${sign.sign}`;

    const fullShare = `${shareText} ${shareUrl}`;

    const handleCopyLink = async () => {
        try {
            await navigator.clipboard.writeText(shareUrl);
            toast.success("Link copied!");
        } catch {
            toast.error("Could not copy link");
        }
    };

    const waHref = `https://wa.me/?text=${encodeURIComponent(fullShare)}`;
    const twitterHref = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`;
    const fbHref = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`;

    return (
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-5 rounded-2xl bg-gray-50 border border-gray-100">
            <div className="flex items-center gap-2">
                <Share2 className="h-4 w-4 text-primary" />
                <span className="text-sm font-semibold text-gray-700">
                    {shareLabel}
                </span>
            </div>

            <div className="flex items-center gap-2">
                <a
                    href={waHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Share on WhatsApp"
                    className="w-10 h-10 rounded-xl bg-white border border-gray-200 hover:border-green-400 hover:bg-green-50 flex items-center justify-center transition-colors"
                >
                    <svg
                        viewBox="0 0 24 24"
                        className="h-4 w-4 text-green-600 fill-current"
                        aria-hidden
                    >
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                    </svg>
                </a>

                <a
                    href={twitterHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Share on X"
                    className="w-10 h-10 rounded-xl bg-white border border-gray-200 hover:border-gray-900 hover:bg-gray-50 flex items-center justify-center transition-colors"
                >
                    <svg
                        viewBox="0 0 24 24"
                        className="h-4 w-4 text-gray-900 fill-current"
                        aria-hidden
                    >
                        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                    </svg>
                </a>

                <a
                    href={fbHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Share on Facebook"
                    className="w-10 h-10 rounded-xl bg-white border border-gray-200 hover:border-blue-500 hover:bg-blue-50 flex items-center justify-center transition-colors"
                >
                    <svg
                        viewBox="0 0 24 24"
                        className="h-4 w-4 text-blue-600 fill-current"
                        aria-hidden
                    >
                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                    </svg>
                </a>

                <button
                    type="button"
                    onClick={handleCopyLink}
                    aria-label="Copy link"
                    className="w-10 h-10 rounded-xl bg-white border border-gray-200 hover:border-primary hover:bg-primary/5 flex items-center justify-center transition-colors"
                >
                    <Copy className="h-4 w-4 text-primary" />
                </button>
            </div>
        </div>
    );
}

interface QuickSwitchRowProps {
    currentSignKey: string;
    onSelect: (sign: HoroscopeSign) => void;
    checkAnotherSignLabel: string;
}

function QuickSwitchRow({ currentSignKey, onSelect, checkAnotherSignLabel }: QuickSwitchRowProps) {
    return (
        <div className="text-center">
            <p className="text-xs text-gray-400 mb-3">{checkAnotherSignLabel}</p>
            <div className="flex flex-wrap justify-center gap-2">
                {zodiacSigns
                    .filter((s) => s.sign !== currentSignKey)
                    .map((sign) => (
                        <button
                            key={sign.sign}
                            onClick={() => onSelect(sign)}
                            className="w-10 h-10 rounded-xl bg-white hover:bg-primary/5 border border-gray-100 hover:border-primary/20 flex items-center justify-center text-lg font-serif text-primary transition-all hover:scale-110 hover:shadow-md"
                            title={sign.name}
                        >
                            {sign.symbol}
                        </button>
                    ))}
            </div>
        </div>
    );
}

// ---------- main content (wrapped in Suspense) ----------

function HoroscopeContent() {
    const mounted = useMounted();
    const searchParams = useSearchParams();
    const readingRef = useRef<HTMLDivElement | null>(null);

    const t = useT(horoscopeDict);
    const lang = useLang();

    const [selectedSign, setSelectedSign] = useState<HoroscopeSign | null>(null);
    const [period, setPeriod] = useState<HoroscopePeriod>("daily");
    const [dobInput, setDobInput] = useState("");

    // Initial hydration: URL param first, then localStorage
    useEffect(() => {
        if (!mounted) return;

        const urlSign = searchParams.get("sign");
        const source =
            urlSign ??
            (typeof window !== "undefined"
                ? window.localStorage.getItem(STORAGE_KEY)
                : null);

        if (source) {
            const match = zodiacSigns.find((s) => s.sign === source);
            if (match) {
                setSelectedSign((prev) => (prev ? prev : match));
            }
        }
        // We intentionally only run this on initial mount.
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [mounted]);

    // Persist selection + update URL when sign changes
    useEffect(() => {
        if (!mounted || !selectedSign) return;
        try {
            window.localStorage.setItem(STORAGE_KEY, selectedSign.sign);
        } catch {
            // ignore quota errors
        }
    }, [mounted, selectedSign]);

    const data = useMemo<HoroscopeData | null>(() => {
        if (!selectedSign) return null;
        return getHoroscopeData(selectedSign.sign, period);
    }, [selectedSign, period]);

    const handleSignSelect = useCallback((sign: HoroscopeSign) => {
        setSelectedSign(sign);

        // Update URL without triggering Next.js navigation (static export safe).
        // router.replace() causes a full reload on Apache because the query-param
        // change is resolved against a new HTML file — use native history API instead.
        if (typeof window !== "undefined") {
            const url = `/free-horoscope/?sign=${sign.sign}`;
            window.history.replaceState(window.history.state, "", url);
        }

        // Smooth scroll to reading section after paint
        window.requestAnimationFrame(() => {
            readingRef.current?.scrollIntoView({
                behavior: "smooth",
                block: "start",
            });
        });
    }, []);

    const today = new Date().toLocaleDateString(lang === "hi" ? "hi-IN" : "en-IN", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
    });

    const selectedSignKey = selectedSign?.sign ?? null;

    // Aspect labels driven by the dictionary so they switch with language
    const aspectLabels: Record<keyof HoroscopeData["aspects"], string> = {
        love: t("aspectLove"),
        career: t("aspectCareer"),
        health: t("aspectHealth"),
        finance: t("aspectFinance"),
        family: t("aspectFamily"),
    };

    // Derive the current period's translated label for ShareBar
    const currentPeriodLabel = t(
        PERIOD_TABS.find((tab) => tab.value === period)?.labelKey ?? "periodToday"
    );

    return (
        <MainLayout>
            {/* Hero */}
            <section className="relative bg-primary text-white overflow-hidden">
                <div className="absolute inset-0">
                    <div className="absolute top-10 right-20 w-72 h-72 bg-accent/15 rounded-full blur-3xl" />
                    <div className="absolute -bottom-10 -left-10 w-56 h-56 bg-secondary/10 rounded-full blur-3xl" />
                </div>
                <div className="container mx-auto px-4 relative z-10 py-14 md:py-20">
                    <div className="flex justify-end mb-4">
                        <LanguageSwitcher />
                    </div>
                    <div className="max-w-2xl mx-auto text-center">
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-sm text-sm mb-5">
                            <Calendar className="h-3.5 w-3.5 text-accent" />
                            {today}
                        </div>
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-heading mb-4 leading-tight">
                            {t("heroTitle")}
                        </h1>
                        <p className="text-white/70 text-base md:text-lg max-w-lg mx-auto">
                            {t("heroSubtitle")}
                        </p>
                    </div>
                </div>
            </section>

            {/* DOB Quick-detect */}
            <DobDetect
                value={dobInput}
                onChange={setDobInput}
                onDetected={handleSignSelect}
                cardTitle={t("dobCardTitle")}
                cardSubtitle={t("dobCardSubtitle")}
                detectBtnLabel={t("dobDetectBtn")}
                toastNoDate={t("dobToastNoDate")}
                toastInvalid={t("dobToastInvalid")}
                toastError={t("dobToastError")}
            />

            {/* Top 3 Lucky Strip */}
            <TopLuckyStrip
                selectedSignKey={selectedSignKey}
                onSelect={handleSignSelect}
                eyebrowLabel={t("luckyStripEyebrow")}
                titleLabel={t("luckyStripTitle")}
            />

            {/* Zodiac grid */}
            <ZodiacGrid
                selectedSignKey={selectedSignKey}
                onSelect={handleSignSelect}
                eyebrowLabel={t("zodiacEyebrow")}
                titleLabel={t("zodiacTitle")}
            />

            {/* Reading */}
            <section ref={readingRef} className="pb-16 scroll-mt-24">
                <div className="container mx-auto px-4">
                    <div className="max-w-4xl mx-auto">
                        {selectedSign && data ? (
                            <div className="space-y-6">
                                <SignHeader
                                    sign={selectedSign}
                                    data={data}
                                    ruledByLabel={t("ruledBy")}
                                    moodLabel={t("mood")}
                                    overallRatingLabel={t("overallRating")}
                                />

                                <Tabs
                                    value={period}
                                    onValueChange={(v) =>
                                        setPeriod(v as HoroscopePeriod)
                                    }
                                >
                                    <TabsList className="w-full h-auto bg-white border border-gray-100 rounded-2xl p-1 grid grid-cols-2 md:grid-cols-4 gap-1">
                                        {PERIOD_TABS.map((tab) => (
                                            <TabsTrigger
                                                key={tab.value}
                                                value={tab.value}
                                                className="rounded-xl data-[state=active]:bg-primary data-[state=active]:text-white text-gray-600 h-10 text-sm"
                                            >
                                                {t(tab.labelKey)}
                                            </TabsTrigger>
                                        ))}
                                    </TabsList>

                                    {PERIOD_TABS.map((tab) => (
                                        <TabsContent
                                            key={tab.value}
                                            value={tab.value}
                                            className="mt-6 space-y-6"
                                        >
                                            {/* Overall paragraph */}
                                            <Card className="rounded-2xl border-gray-100 py-0">
                                                <CardContent className="p-6 md:p-8">
                                                    <p className="text-[11px] uppercase tracking-widest text-secondary font-bold mb-3">
                                                        {data.periodLabel}
                                                    </p>
                                                    <p className="text-base md:text-lg leading-relaxed text-gray-700">
                                                        {data.overall}
                                                    </p>
                                                </CardContent>
                                            </Card>

                                            <LuckyStatsGrid
                                                data={data}
                                                luckyNumberLabel={t("luckyNumber")}
                                                luckyColorLabel={t("luckyColor")}
                                                luckyTimeLabel={t("luckyTime")}
                                                bestMatchLabel={t("bestMatch")}
                                            />
                                            <LifeAspects
                                                data={data}
                                                titleLabel={t("lifeAspectsTitle")}
                                                outOfLabel={t("lifeAspectsOutOf")}
                                                aspectLabels={aspectLabels}
                                            />
                                            <DosAndDonts
                                                dos={data.dos}
                                                donts={data.donts}
                                                dosTitle={t("dosTitle")}
                                                dontsTitle={t("dontsTitle")}
                                            />
                                            <MantraCard
                                                mantra={data.mantra}
                                                eyebrowLabel={t("mantraEyebrow")}
                                                chantHint={t("mantraChantHint")}
                                                copyBtnLabel={t("mantraCopyBtn")}
                                                copiedBtnLabel={t("mantraCopiedBtn")}
                                                copiedToast={t("mantraCopiedToast")}
                                                copyErrorToast={t("mantraCopyError")}
                                            />
                                            <GemstoneCard
                                                gemstone={data.gemstone}
                                                ruler={data.ruler}
                                                eyebrowLabel={t("gemstoneEyebrow")}
                                                subtextTemplate={t("gemstoneSubtext")}
                                                shopBtnLabel={t("gemstoneShopBtn")}
                                            />
                                            <ShareBar
                                                sign={selectedSign}
                                                overall={data.overall}
                                                shareLabel={t("shareLabel")}
                                                periodLabel={currentPeriodLabel}
                                            />
                                        </TabsContent>
                                    ))}
                                </Tabs>

                                <div className="pt-4">
                                    <QuickSwitchRow
                                        currentSignKey={selectedSign.sign}
                                        onSelect={handleSignSelect}
                                        checkAnotherSignLabel={t("checkAnotherSign")}
                                    />
                                </div>
                            </div>
                        ) : (
                            <div className="text-center py-8">
                                <div className="max-w-sm mx-auto">
                                    <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-accent/10 flex items-center justify-center">
                                        <Star className="h-8 w-8 text-accent" />
                                    </div>
                                    <p className="text-sm text-gray-500">
                                        {t("emptyPrompt")}
                                    </p>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </section>

            {/* FAQ */}
            <FaqSection
                description="Get answers to the most common questions about reading your free horoscope, understanding daily, weekly, monthly and yearly predictions, the difference between Vedic and Western astrology, sun sign vs moon sign (rashi), lucky numbers, colours, mantras, gemstones and zodiac compatibility."
                faqs={[
                    { question: t("faqQ1"), answer: t("faqA1") },
                    { question: t("faqQ2"), answer: t("faqA2") },
                    { question: t("faqQ3"), answer: t("faqA3") },
                    { question: t("faqQ4"), answer: t("faqA4") },
                    { question: t("faqQ5"), answer: t("faqA5") },
                    { question: t("faqQ6"), answer: t("faqA6") },
                    { question: t("faqQ7"), answer: t("faqA7") },
                    { question: t("faqQ8"), answer: t("faqA8") },
                    { question: t("faqQ9"), answer: t("faqA9") },
                    { question: t("faqQ10"), answer: t("faqA10") },
                ]}
            />

            {/* Bottom CTA */}
            <section className="py-12 border-t border-gray-100 bg-gray-50/40">
                <div className="container mx-auto px-4 text-center">
                    <h3 className="text-xl md:text-2xl font-bold font-heading text-gray-900 mb-2">
                        {t("ctaTitle")}
                    </h3>
                    <p className="text-sm text-gray-500 mb-6 max-w-md mx-auto">
                        {t("ctaSubtitle")}
                    </p>
                    <div className="flex items-center justify-center gap-3 flex-wrap">
                        <ConsultationButton
                            service="Birth Chart Analysis"
                            className="bg-primary rounded-xl"
                        >
                            {t("ctaBookBtn")}
                        </ConsultationButton>
                        <Button variant="outline" className="rounded-xl" asChild>
                            <Link href="/contact">{t("ctaContactBtn")}</Link>
                        </Button>
                    </div>
                </div>
            </section>
        </MainLayout>
    );
}

// ---------- page (Suspense boundary) ----------

export default function HoroscopePage() {
    return (
        <Suspense
            fallback={
                <MainLayout>
                    <div className="min-h-[60vh] flex items-center justify-center">
                        <Loader2 className="h-8 w-8 animate-spin text-primary" />
                    </div>
                </MainLayout>
            }
        >
            <HoroscopeContent />
        </Suspense>
    );
}
