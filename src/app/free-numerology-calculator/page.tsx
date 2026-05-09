"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import {
    Hash,
    Sparkles,
    Heart,
    User,
    Calendar,
    Star,
    Gem,
    Clock,
    Users,
    Briefcase,
    TrendingUp,
    ArrowRight,
    Share2,
    Copy,
    Check,
    RotateCcw,
} from "lucide-react";

import { MainLayout } from "@/components/templates/main-layout";
import { ConsultationButton } from "@/components/molecules/consultation-button";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import { useMounted } from "@/lib/hooks/use-mounted";
import {
    NUMBER_PROFILES,
    getNumberProfile,
    getDimensionMeaning,
    getPersonalYearGuide,
    getCompatibility,
    getKarmicLessons,
    getMoolAnk,
    getBhagyaAnk,
    getNumberRelations,
    type NumerologyDimension,
    type NumerologyNumber,
    type NumberProfile,
    type DimensionMeaning,
    type PersonalYearGuide,
    type CompatibilityInfo,
    type KarmicLesson,
    type NumberRelation,
} from "@/lib/data/numerology-meanings";

/* ─────────────────────────  Schema & Types  ───────────────────────── */

const numerologySchema = z.object({
    name: z.string().min(2, "Name is required"),
    birthDate: z.string().min(1, "Birth date is required"),
});

type NumerologyFormData = z.infer<typeof numerologySchema>;

interface NumerologyResult {
    name: string;
    birthDate: string;
    lifePath: number;
    destiny: number;
    soulUrge: number;
    personality: number;
    birthday: number;
    personalYear: number;
    moolAnk: number;
    bhagyaAnk: number;
}

interface DimensionDescriptor {
    id: NumerologyDimension;
    label: string;
    icon: typeof Hash;
    tint: string;
    ring: string;
}

const DIMENSIONS: DimensionDescriptor[] = [
    {
        id: "lifePath",
        label: "Life Path",
        icon: Star,
        tint: "bg-primary/10 text-primary",
        ring: "ring-primary/20",
    },
    {
        id: "destiny",
        label: "Destiny",
        icon: Sparkles,
        tint: "bg-secondary/10 text-secondary",
        ring: "ring-secondary/20",
    },
    {
        id: "soulUrge",
        label: "Soul Urge",
        icon: Heart,
        tint: "bg-rose-100 text-rose-600",
        ring: "ring-rose-200",
    },
    {
        id: "personality",
        label: "Personality",
        icon: User,
        tint: "bg-indigo-100 text-indigo-600",
        ring: "ring-indigo-200",
    },
    {
        id: "birthday",
        label: "Birthday",
        icon: Calendar,
        tint: "bg-emerald-100 text-emerald-600",
        ring: "ring-emerald-200",
    },
    {
        id: "personalYear",
        label: "Personal Year",
        icon: Clock,
        tint: "bg-accent/20 text-accent",
        ring: "ring-accent/30",
    },
];

/* ─────────────────────────  Pure Calculators  ───────────────────────── */

function reduceToSingle(num: number): number {
    let n = num;
    while (n > 9 && n !== 11 && n !== 22 && n !== 33) {
        n = n
            .toString()
            .split("")
            .reduce((a, b) => a + parseInt(b, 10), 0);
    }
    return n;
}

function calculateLifePath(dateStr: string): number {
    const date = new Date(dateStr);
    const sum =
        date.getFullYear() + (date.getMonth() + 1) + date.getDate();
    return reduceToSingle(sum);
}

const LETTER_VALUES: Record<string, number> = {
    a: 1, b: 2, c: 3, d: 4, e: 5, f: 6, g: 7, h: 8, i: 9,
    j: 1, k: 2, l: 3, m: 4, n: 5, o: 6, p: 7, q: 8, r: 9,
    s: 1, t: 2, u: 3, v: 4, w: 5, x: 6, y: 7, z: 8,
};
const VOWEL_VALUES: Record<string, number> = {
    a: 1, e: 5, i: 9, o: 6, u: 3,
};
const VOWELS = "aeiou";

function nameToNumber(name: string): number {
    const sum = name
        .toLowerCase()
        .split("")
        .reduce((acc, c) => acc + (LETTER_VALUES[c] ?? 0), 0);
    return reduceToSingle(sum);
}

function getVowelNumber(name: string): number {
    const sum = name
        .toLowerCase()
        .split("")
        .filter((c) => VOWELS.includes(c))
        .reduce((acc, c) => acc + (VOWEL_VALUES[c] ?? 0), 0);
    return reduceToSingle(sum);
}

function getConsonantNumber(name: string): number {
    const sum = name
        .toLowerCase()
        .split("")
        .filter((c) => !VOWELS.includes(c) && LETTER_VALUES[c] !== undefined)
        .reduce((acc, c) => acc + (LETTER_VALUES[c] ?? 0), 0);
    return reduceToSingle(sum);
}

function calculatePersonalYear(dateStr: string): number {
    const birthDate = new Date(dateStr);
    const currentYear = new Date().getFullYear();
    const sum =
        birthDate.getMonth() + 1 + birthDate.getDate() + currentYear;
    return reduceToSingle(sum);
}

function buildResult(name: string, birthDate: string): NumerologyResult {
    const date = new Date(birthDate);
    return {
        name,
        birthDate,
        lifePath: calculateLifePath(birthDate),
        destiny: nameToNumber(name),
        soulUrge: getVowelNumber(name),
        personality: getConsonantNumber(name),
        birthday: reduceToSingle(date.getDate()),
        personalYear: calculatePersonalYear(birthDate),
        moolAnk: getMoolAnk(date.getDate()),
        bhagyaAnk: getBhagyaAnk(birthDate),
    };
}

function initials(name: string): string {
    return name
        .split(" ")
        .filter(Boolean)
        .slice(0, 2)
        .map((w) => w[0]?.toUpperCase() ?? "")
        .join("");
}

/* ─────────────────────────  Sub-components  ───────────────────────── */

interface HeroSectionProps {
    hasResult: boolean;
}

function HeroSection({ hasResult }: HeroSectionProps) {
    return (
        <section className="relative bg-primary text-white overflow-hidden">
            <div className="absolute inset-0">
                <div className="absolute top-10 right-20 w-72 h-72 bg-accent/15 rounded-full blur-3xl" />
                <div className="absolute -bottom-10 -left-10 w-56 h-56 bg-secondary/10 rounded-full blur-3xl" />
            </div>
            <div className="container mx-auto px-4 relative z-10 py-14 md:py-20">
                <div className="max-w-2xl mx-auto text-center">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-sm text-sm mb-5">
                        <Hash className="h-3.5 w-3.5 text-accent" />
                        अंक ज्योतिष / Vedic Numerology
                    </div>
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-heading mb-4 leading-tight">
                        Free numerology calculator
                    </h1>
                    <p className="text-white/70 text-base md:text-lg max-w-lg mx-auto">
                        {hasResult
                            ? "Explore the hidden meanings of your Life Path, Destiny and more — decoded from your name and birth date."
                            : "Discover your life path and destiny through the ancient science of numbers."}
                    </p>
                </div>
            </div>
        </section>
    );
}

interface InputFormProps {
    hasResult: boolean;
    onReset: () => void;
    register: ReturnType<typeof useForm<NumerologyFormData>>["register"];
    handleSubmit: ReturnType<typeof useForm<NumerologyFormData>>["handleSubmit"];
    errors: ReturnType<typeof useForm<NumerologyFormData>>["formState"]["errors"];
    onSubmit: (data: NumerologyFormData) => void;
}

function InputForm({
    hasResult,
    onReset,
    register,
    handleSubmit,
    errors,
    onSubmit,
}: InputFormProps) {
    return (
        <Card className="max-w-xl mx-auto rounded-3xl border-gray-100 shadow-sm">
            <CardContent className="p-6 md:p-8">
                <div className="flex items-center justify-between mb-5">
                    <div>
                        <p className="text-[11px] uppercase tracking-widest text-secondary font-bold mb-1">
                            Step 1
                        </p>
                        <h2 className="text-xl md:text-2xl font-bold font-heading text-gray-900">
                            Enter your details
                        </h2>
                    </div>
                    {hasResult && (
                        <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={onReset}
                            className="rounded-xl text-gray-500 hover:text-primary"
                        >
                            <RotateCcw className="h-3.5 w-3.5 mr-1.5" />
                            Reset
                        </Button>
                    )}
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="name">Full Name</Label>
                        <Input
                            id="name"
                            placeholder="Enter your full name as on birth certificate"
                            className="h-11 rounded-xl"
                            {...register("name")}
                        />
                        {errors.name && (
                            <p className="text-sm text-destructive">
                                {errors.name.message}
                            </p>
                        )}
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="birthDate">Birth Date</Label>
                        <Input
                            id="birthDate"
                            type="date"
                            className="h-11 rounded-xl"
                            {...register("birthDate")}
                        />
                        {errors.birthDate && (
                            <p className="text-sm text-destructive">
                                {errors.birthDate.message}
                            </p>
                        )}
                    </div>

                    <Button
                        type="submit"
                        className="w-full h-11 rounded-xl bg-primary hover:bg-primary/90"
                    >
                        <Hash className="h-4 w-4 mr-2" />
                        Calculate Numbers
                    </Button>
                </form>
            </CardContent>
        </Card>
    );
}

interface LifePathHeroCardProps {
    number: number;
    profile: NumberProfile | null;
}

function LifePathHeroCard({ number, profile }: LifePathHeroCardProps) {
    return (
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-primary via-primary to-[#5a0606] text-white p-8 md:p-12">
            <div className="absolute top-0 right-0 w-56 h-56 bg-accent/20 rounded-full blur-3xl" />
            <div className="absolute -bottom-10 -left-10 w-48 h-48 bg-secondary/10 rounded-full blur-3xl" />

            <div className="relative z-10 text-center">
                <p className="text-[11px] uppercase tracking-widest text-accent font-bold mb-3">
                    Your Life Path Number
                </p>
                <div className="w-28 h-28 mx-auto rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center mb-5">
                    <span className="text-5xl md:text-6xl font-bold font-heading text-accent">
                        {number}
                    </span>
                </div>
                <h2 className="text-3xl md:text-4xl font-bold font-heading mb-1">
                    {profile?.title ?? `Number ${number}`}
                </h2>
                {profile?.hindi && (
                    <p className="text-lg text-accent/90 font-heading mb-5">
                        {profile.hindi}
                    </p>
                )}

                {profile && (
                    <div className="flex flex-wrap items-center justify-center gap-2 mb-6">
                        <span className="px-3 py-1 rounded-full bg-white/10 border border-white/15 text-xs">
                            Planet · {profile.planet}
                        </span>
                        <span className="px-3 py-1 rounded-full bg-white/10 border border-white/15 text-xs">
                            Element · {profile.element}
                        </span>
                        <span className="px-3 py-1 rounded-full bg-white/10 border border-white/15 text-xs">
                            Gemstone · {profile.gemstone}
                        </span>
                    </div>
                )}

                {profile?.description && (
                    <p className="text-sm md:text-base text-white/80 leading-relaxed max-w-2xl mx-auto">
                        {profile.description}
                    </p>
                )}
            </div>
        </div>
    );
}

interface NumberTileProps {
    dim: DimensionDescriptor;
    value: number;
    summary: string;
    isActive: boolean;
    onSelect: (id: NumerologyDimension) => void;
}

function NumberTile({ dim, value, summary, isActive, onSelect }: NumberTileProps) {
    const Icon = dim.icon;
    return (
        <button
            type="button"
            onClick={() => onSelect(dim.id)}
            className={cn(
                "text-left rounded-2xl border bg-white p-5 transition-all hover:shadow-md focus:outline-none focus:ring-2",
                isActive
                    ? "border-primary/40 shadow-md ring-2 ring-primary/20"
                    : "border-gray-100 hover:border-primary/20"
            )}
            aria-pressed={isActive}
        >
            <div className="flex items-start gap-4">
                <div
                    className={cn(
                        "w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 ring-4",
                        dim.tint,
                        dim.ring
                    )}
                >
                    <span className="text-2xl font-bold font-heading">
                        {value}
                    </span>
                </div>
                <div className="min-w-0">
                    <div className="flex items-center gap-1.5 mb-1">
                        <Icon className="h-3.5 w-3.5 text-gray-500" />
                        <p className="text-[11px] uppercase tracking-widest text-gray-500 font-bold">
                            {dim.label}
                        </p>
                    </div>
                    <p className="text-sm text-gray-700 leading-relaxed line-clamp-3">
                        {summary}
                    </p>
                </div>
            </div>
        </button>
    );
}

interface ExpandedDimensionProps {
    dim: DimensionDescriptor;
    value: number;
    meaning: DimensionMeaning | null;
}

function ExpandedDimension({ dim, value, meaning }: ExpandedDimensionProps) {
    if (!meaning) return null;
    const Icon = dim.icon;
    return (
        <Card className="rounded-3xl border-primary/10 bg-gradient-to-br from-primary/5 via-white to-accent/5 py-0 overflow-hidden">
            <CardContent className="p-6 md:p-8">
                <div className="flex items-center gap-3 mb-4">
                    <div
                        className={cn(
                            "w-11 h-11 rounded-xl flex items-center justify-center",
                            dim.tint
                        )}
                    >
                        <Icon className="h-5 w-5" />
                    </div>
                    <div>
                        <p className="text-[11px] uppercase tracking-widest text-secondary font-bold">
                            {dim.label} · Number {value}
                        </p>
                        <h3 className="text-xl font-bold font-heading text-gray-900">
                            {meaning.title}
                        </h3>
                    </div>
                </div>
                <p className="text-sm md:text-base text-gray-700 leading-relaxed">
                    {meaning.description}
                </p>
            </CardContent>
        </Card>
    );
}

interface PersonalityTabProps {
    profile: NumberProfile | null;
    onCopyAffirmation: () => void;
    copied: boolean;
}

function PersonalityTab({ profile, onCopyAffirmation, copied }: PersonalityTabProps) {
    if (!profile) {
        return (
            <p className="text-sm text-gray-500">
                Profile details are not available for this number.
            </p>
        );
    }

    return (
        <div className="space-y-6">
            <Card className="rounded-2xl border-gray-100 py-0">
                <CardContent className="p-6 md:p-8 space-y-6">
                    <div>
                        <p className="text-[11px] uppercase tracking-widest text-secondary font-bold mb-2">
                            Core personality
                        </p>
                        <p className="text-sm md:text-base text-gray-700 leading-relaxed">
                            {profile.personality}
                        </p>
                    </div>

                    <div className="grid gap-5 md:grid-cols-2">
                        <div>
                            <p className="text-xs font-semibold text-emerald-700 mb-2">
                                Strengths
                            </p>
                            <div className="flex flex-wrap gap-2">
                                {profile.strengths.map((s) => (
                                    <span
                                        key={s}
                                        className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs border border-emerald-100"
                                    >
                                        {s}
                                    </span>
                                ))}
                            </div>
                        </div>
                        <div>
                            <p className="text-xs font-semibold text-rose-700 mb-2">
                                Watch-outs
                            </p>
                            <div className="flex flex-wrap gap-2">
                                {profile.weaknesses.map((w) => (
                                    <span
                                        key={w}
                                        className="px-3 py-1 rounded-full bg-rose-50 text-rose-700 text-xs border border-rose-100"
                                    >
                                        {w}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {profile.famousPeople.length > 0 && (
                <Card className="rounded-2xl border-gray-100 py-0">
                    <CardContent className="p-6 md:p-8">
                        <p className="text-[11px] uppercase tracking-widest text-secondary font-bold mb-3">
                            Famous {profile.number}s
                        </p>
                        <div className="flex flex-wrap gap-3">
                            {profile.famousPeople.map((p) => (
                                <div
                                    key={p}
                                    className="flex items-center gap-2 bg-gray-50 rounded-full px-3 py-1.5 border border-gray-100"
                                >
                                    <div className="w-7 h-7 rounded-full bg-primary/10 text-primary font-bold text-xs flex items-center justify-center">
                                        {initials(p) || "★"}
                                    </div>
                                    <span className="text-sm text-gray-700">
                                        {p}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            )}

            <Card className="rounded-2xl border-accent/30 bg-gradient-to-br from-accent/10 via-white to-white py-0">
                <CardContent className="p-6 md:p-8">
                    <div className="flex items-start justify-between gap-4">
                        <div className="min-w-0">
                            <p className="text-[11px] uppercase tracking-widest text-secondary font-bold mb-2">
                                Daily affirmation
                            </p>
                            <p className="text-base md:text-lg font-heading text-gray-900 leading-snug">
                                &ldquo;{profile.affirmation}&rdquo;
                            </p>
                        </div>
                        <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={onCopyAffirmation}
                            className="h-8 rounded-full bg-white border border-gray-200 hover:bg-primary/5 text-xs shrink-0"
                        >
                            {copied ? (
                                <>
                                    <Check className="h-3.5 w-3.5 mr-1" />
                                    Copied
                                </>
                            ) : (
                                <>
                                    <Copy className="h-3.5 w-3.5 mr-1" />
                                    Copy
                                </>
                            )}
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}

interface CareerTabProps {
    profile: NumberProfile | null;
}

function CareerTab({ profile }: CareerTabProps) {
    if (!profile) {
        return (
            <p className="text-sm text-gray-500">
                Career insights unavailable.
            </p>
        );
    }

    const whySuited = profile.description
        .split(/(?<=[.!?])\s+/)
        .slice(0, 2)
        .join(" ");

    return (
        <div className="space-y-6">
            <Card className="rounded-2xl border-gray-100 py-0">
                <CardContent className="p-6 md:p-8">
                    <div className="flex items-center gap-2 mb-4">
                        <div className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center">
                            <Briefcase className="h-4 w-4 text-primary" />
                        </div>
                        <div>
                            <p className="text-[11px] uppercase tracking-widest text-secondary font-bold">
                                Career paths that suit you
                            </p>
                            <p className="text-xs text-gray-500">
                                Based on your Life Path {profile.number}
                            </p>
                        </div>
                    </div>

                    <div className="flex flex-wrap gap-2 mb-5">
                        {profile.careers.map((c) => (
                            <span
                                key={c}
                                className="px-3 py-1.5 rounded-full bg-primary/5 text-primary text-sm border border-primary/10"
                            >
                                {c}
                            </span>
                        ))}
                    </div>

                    <p className="text-sm md:text-base text-gray-700 leading-relaxed">
                        {whySuited}
                    </p>
                </CardContent>
            </Card>

            <div className="flex items-center justify-center gap-3 flex-wrap">
                <ConsultationButton
                    service="Numerology Career Report"
                    className="bg-primary rounded-xl"
                >
                    Get Career Guidance
                </ConsultationButton>
                <Button variant="outline" className="rounded-xl" asChild>
                    <Link href="/services">
                        Explore Services
                        <ArrowRight className="h-4 w-4 ml-1.5" />
                    </Link>
                </Button>
            </div>
        </div>
    );
}

interface CompatibilityTabProps {
    lifePath: number;
    partnerInput: string;
    onPartnerInputChange: (v: string) => void;
    compatibility: CompatibilityInfo | null;
    topMatches: Array<{ n: number; info: CompatibilityInfo }>;
    challenging: Array<{ n: number; info: CompatibilityInfo }>;
}

function CompatibilityTab({
    lifePath,
    partnerInput,
    onPartnerInputChange,
    compatibility,
    topMatches,
    challenging,
}: CompatibilityTabProps) {
    return (
        <div className="space-y-6">
            <Card className="rounded-2xl border-gray-100 py-0">
                <CardContent className="p-6 md:p-8">
                    <p className="text-[11px] uppercase tracking-widest text-secondary font-bold mb-2">
                        Top 3 compatible numbers
                    </p>
                    <div className="grid gap-3 md:grid-cols-3 mb-6">
                        {topMatches.map(({ n, info }) => (
                            <div
                                key={n}
                                className="rounded-2xl p-4 border border-emerald-100 bg-emerald-50/60"
                            >
                                <div className="flex items-center gap-3 mb-2">
                                    <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold">
                                        {n}
                                    </div>
                                    <div>
                                        <p className="text-sm font-semibold text-emerald-800">
                                            {info.label}
                                        </p>
                                        <p className="text-xs text-emerald-700/80">
                                            Score {info.score}/10
                                        </p>
                                    </div>
                                </div>
                                <p className="text-xs text-emerald-900/80 leading-relaxed">
                                    {info.summary}
                                </p>
                            </div>
                        ))}
                    </div>

                    <p className="text-[11px] uppercase tracking-widest text-secondary font-bold mb-2">
                        Challenging matches
                    </p>
                    <div className="grid gap-3 md:grid-cols-2">
                        {challenging.map(({ n, info }) => (
                            <div
                                key={n}
                                className="rounded-2xl p-4 border border-rose-100 bg-rose-50/60"
                            >
                                <div className="flex items-center gap-3 mb-2">
                                    <div className="w-10 h-10 rounded-full bg-rose-100 text-rose-700 flex items-center justify-center font-bold">
                                        {n}
                                    </div>
                                    <div>
                                        <p className="text-sm font-semibold text-rose-800">
                                            {info.label}
                                        </p>
                                        <p className="text-xs text-rose-700/80">
                                            Score {info.score}/10
                                        </p>
                                    </div>
                                </div>
                                <p className="text-xs text-rose-900/80 leading-relaxed">
                                    {info.summary}
                                </p>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>

            <Card className="rounded-2xl border-gray-100 py-0">
                <CardContent className="p-6 md:p-8">
                    <div className="flex items-center gap-2 mb-4">
                        <div className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center">
                            <Heart className="h-4 w-4 text-primary" />
                        </div>
                        <div>
                            <p className="text-[11px] uppercase tracking-widest text-secondary font-bold">
                                Check your match
                            </p>
                            <p className="text-xs text-gray-500">
                                Enter partner&apos;s Life Path Number (1-9)
                            </p>
                        </div>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-3">
                        <Input
                            type="number"
                            min={1}
                            max={9}
                            placeholder="e.g. 5"
                            value={partnerInput}
                            onChange={(e) => onPartnerInputChange(e.target.value)}
                            className="h-11 rounded-xl max-w-[180px]"
                            aria-label="Partner Life Path Number"
                        />
                        <p className="text-xs text-gray-500 self-center">
                            Your Life Path: <span className="font-semibold text-primary">{lifePath}</span>
                        </p>
                    </div>

                    {compatibility && (
                        <div className="mt-6 rounded-2xl p-5 bg-gradient-to-br from-primary/5 via-white to-accent/10 border border-primary/10">
                            <div className="flex items-center justify-between mb-3">
                                <span className="text-sm font-bold text-gray-900">
                                    {compatibility.label}
                                </span>
                                <span className="text-sm font-bold text-primary">
                                    {compatibility.score}/10
                                </span>
                            </div>
                            <div className="h-2 rounded-full bg-gray-200 overflow-hidden mb-3">
                                <div
                                    className="h-full bg-gradient-to-r from-primary to-accent"
                                    style={{
                                        width: `${Math.max(0, Math.min(100, compatibility.score * 10))}%`,
                                    }}
                                />
                            </div>
                            <p className="text-sm text-gray-700 leading-relaxed">
                                {compatibility.summary}
                            </p>
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    );
}

const RELATION_CLASSES: Record<NumberRelation, string> = {
    Friend: "bg-emerald-100 text-emerald-700 border-emerald-200",
    Neutral: "bg-gray-100 text-gray-600 border-gray-200",
    Enemy: "bg-rose-100 text-rose-700 border-rose-200",
};

interface LuckyTabProps {
    profile: NumberProfile | null;
    relations: Record<number, NumberRelation>;
    moolAnk: number;
}

function LuckyTab({ profile, relations, moolAnk }: LuckyTabProps) {
    if (!profile) {
        return (
            <p className="text-sm text-gray-500">
                Lucky data unavailable.
            </p>
        );
    }

    return (
        <div className="space-y-6">
            <div className="grid gap-4 md:grid-cols-2">
                <Card className="rounded-2xl border-gray-100 py-0">
                    <CardContent className="p-6">
                        <div className="flex items-center gap-2 mb-3">
                            <Calendar className="h-4 w-4 text-primary" />
                            <p className="text-[11px] uppercase tracking-widest text-secondary font-bold">
                                Lucky days
                            </p>
                        </div>
                        <div className="flex flex-wrap gap-2">
                            {profile.luckyDays.map((d) => (
                                <span
                                    key={d}
                                    className="px-3 py-1 rounded-full bg-primary/5 text-primary text-sm border border-primary/10"
                                >
                                    {d}
                                </span>
                            ))}
                        </div>
                    </CardContent>
                </Card>

                <Card className="rounded-2xl border-gray-100 py-0">
                    <CardContent className="p-6">
                        <div className="flex items-center gap-2 mb-3">
                            <Hash className="h-4 w-4 text-primary" />
                            <p className="text-[11px] uppercase tracking-widest text-secondary font-bold">
                                Lucky numbers
                            </p>
                        </div>
                        <div className="flex flex-wrap gap-2">
                            {profile.luckyNumbers.map((n) => (
                                <span
                                    key={n}
                                    className="w-9 h-9 rounded-xl bg-accent/10 text-accent font-bold flex items-center justify-center border border-accent/20"
                                >
                                    {n}
                                </span>
                            ))}
                        </div>
                    </CardContent>
                </Card>

                <Card className="rounded-2xl border-gray-100 py-0">
                    <CardContent className="p-6">
                        <p className="text-[11px] uppercase tracking-widest text-secondary font-bold mb-3">
                            Lucky colour
                        </p>
                        <div className="flex items-center gap-3">
                            <span
                                className="w-12 h-12 rounded-2xl border border-gray-200 shadow-inner"
                                style={{ backgroundColor: profile.colorHex }}
                                aria-hidden
                            />
                            <div>
                                <p className="text-base font-bold text-gray-900">
                                    {profile.color}
                                </p>
                                <p className="text-xs text-gray-500">
                                    {profile.colorHex}
                                </p>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card className="rounded-2xl border-accent/30 bg-gradient-to-br from-accent/10 via-white to-white py-0">
                    <CardContent className="p-6">
                        <div className="flex items-center gap-2 mb-3">
                            <Gem className="h-4 w-4 text-primary" />
                            <p className="text-[11px] uppercase tracking-widest text-secondary font-bold">
                                Lucky gemstone
                            </p>
                        </div>
                        <p className="text-lg font-bold font-heading text-gray-900">
                            {profile.gemstone}
                        </p>
                        <p className="text-sm text-primary font-heading">
                            {profile.gemstoneHindi}
                        </p>
                    </CardContent>
                </Card>
            </div>

            <Card className="rounded-2xl border-gray-100 py-0">
                <CardContent className="p-6 md:p-8">
                    <div className="flex items-center gap-2 mb-4">
                        <Users className="h-4 w-4 text-primary" />
                        <div>
                            <p className="text-[11px] uppercase tracking-widest text-secondary font-bold">
                                Friendship grid
                            </p>
                            <p className="text-xs text-gray-500">
                                Based on your Mool Ank {moolAnk}
                            </p>
                        </div>
                    </div>
                    <div className="grid grid-cols-3 sm:grid-cols-9 gap-2">
                        {Array.from({ length: 9 }, (_, i) => i + 1).map((n) => {
                            const rel = relations[n] ?? "Neutral";
                            return (
                                <div
                                    key={n}
                                    className={cn(
                                        "flex flex-col items-center justify-center rounded-xl p-3 border",
                                        RELATION_CLASSES[rel]
                                    )}
                                >
                                    <span className="text-lg font-bold">{n}</span>
                                    <span className="text-[10px] uppercase tracking-wider">
                                        {rel}
                                    </span>
                                </div>
                            );
                        })}
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}

interface PersonalYearTabProps {
    year: number;
    currentCalendarYear: number;
    guide: PersonalYearGuide | null;
}

function PersonalYearTab({ year, currentCalendarYear, guide }: PersonalYearTabProps) {
    return (
        <div className="space-y-6">
            <Card className="rounded-3xl border-primary/10 bg-gradient-to-br from-primary/5 via-white to-accent/10 py-0 overflow-hidden">
                <CardContent className="p-6 md:p-8">
                    <div className="flex items-start gap-5">
                        <div className="w-16 h-16 rounded-2xl bg-primary text-primary-foreground flex items-center justify-center shrink-0">
                            <span className="text-2xl font-bold font-heading">
                                {year}
                            </span>
                        </div>
                        <div className="min-w-0">
                            <p className="text-[11px] uppercase tracking-widest text-secondary font-bold mb-1">
                                Personal year {year} · {currentCalendarYear}
                            </p>
                            <h3 className="text-2xl font-bold font-heading text-gray-900">
                                {guide?.theme ?? "Your year ahead"}
                            </h3>
                            {guide?.description && (
                                <p className="text-sm md:text-base text-gray-700 leading-relaxed mt-2">
                                    {guide.description}
                                </p>
                            )}
                        </div>
                    </div>
                </CardContent>
            </Card>

            {guide && (
                <div className="grid gap-4 md:grid-cols-2">
                    <Card className="rounded-2xl border-emerald-100 bg-emerald-50/40 py-0">
                        <CardContent className="p-6">
                            <p className="text-xs font-semibold text-emerald-700 mb-3">
                                Opportunities
                            </p>
                            <ul className="space-y-2">
                                {guide.opportunities.map((o) => (
                                    <li
                                        key={o}
                                        className="flex items-start gap-2 text-sm text-emerald-900/90"
                                    >
                                        <TrendingUp className="h-3.5 w-3.5 mt-0.5 shrink-0" />
                                        <span>{o}</span>
                                    </li>
                                ))}
                            </ul>
                        </CardContent>
                    </Card>
                    <Card className="rounded-2xl border-rose-100 bg-rose-50/40 py-0">
                        <CardContent className="p-6">
                            <p className="text-xs font-semibold text-rose-700 mb-3">
                                Cautions
                            </p>
                            <ul className="space-y-2">
                                {guide.cautions.map((c) => (
                                    <li
                                        key={c}
                                        className="flex items-start gap-2 text-sm text-rose-900/90"
                                    >
                                        <span className="h-1.5 w-1.5 rounded-full bg-rose-500 mt-2 shrink-0" />
                                        <span>{c}</span>
                                    </li>
                                ))}
                            </ul>
                        </CardContent>
                    </Card>
                </div>
            )}

            {guide && guide.bestMonths.length > 0 && (
                <Card className="rounded-2xl border-gray-100 py-0">
                    <CardContent className="p-6">
                        <p className="text-[11px] uppercase tracking-widest text-secondary font-bold mb-3">
                            Best months
                        </p>
                        <div className="flex flex-wrap gap-2">
                            {guide.bestMonths.map((m) => (
                                <span
                                    key={m}
                                    className="px-3 py-1 rounded-full bg-accent/10 text-accent text-sm border border-accent/20"
                                >
                                    {m}
                                </span>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            )}

            <Card className="rounded-2xl border-gray-100 py-0">
                <CardContent className="p-6">
                    <p className="text-[11px] uppercase tracking-widest text-secondary font-bold mb-4">
                        Your 9-year cycle
                    </p>
                    <div className="grid grid-cols-9 gap-1.5">
                        {Array.from({ length: 9 }, (_, i) => i + 1).map((step) => (
                            <div
                                key={step}
                                className={cn(
                                    "h-10 rounded-lg flex items-center justify-center text-sm font-bold transition-colors",
                                    step === year
                                        ? "bg-primary text-white shadow"
                                        : "bg-gray-100 text-gray-500"
                                )}
                            >
                                {step}
                            </div>
                        ))}
                    </div>
                    <p className="text-xs text-gray-500 mt-3">
                        You are in year {year} of a 9-year spiritual cycle.
                    </p>
                </CardContent>
            </Card>
        </div>
    );
}

interface KarmicTabProps {
    lessons: KarmicLesson[];
}

function KarmicTab({ lessons }: KarmicTabProps) {
    if (lessons.length === 0) {
        return (
            <Card className="rounded-2xl border-emerald-100 bg-emerald-50/40 py-0">
                <CardContent className="p-6 md:p-8 text-center">
                    <div className="w-12 h-12 mx-auto mb-3 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center">
                        <Check className="h-5 w-5" />
                    </div>
                    <p className="text-sm md:text-base font-semibold text-emerald-900 mb-1">
                        No karmic lessons detected
                    </p>
                    <p className="text-xs text-emerald-800/80">
                        Your birth date includes all digits 1-9.
                    </p>
                </CardContent>
            </Card>
        );
    }

    return (
        <div className="space-y-4">
            {lessons.map((l) => (
                <Card key={l.missingDigit} className="rounded-2xl border-gray-100 py-0">
                    <CardContent className="p-6 md:p-8">
                        <div className="flex items-start gap-4">
                            <div className="w-12 h-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center font-bold text-xl shrink-0">
                                {l.missingDigit}
                            </div>
                            <div className="min-w-0">
                                <p className="text-[11px] uppercase tracking-widest text-secondary font-bold mb-1">
                                    Missing digit
                                </p>
                                <h4 className="text-lg font-bold font-heading text-gray-900 mb-2">
                                    {l.lesson}
                                </h4>
                                <p className="text-sm text-gray-700 leading-relaxed mb-3">
                                    <span className="font-semibold text-gray-900">
                                        Challenge:{" "}
                                    </span>
                                    {l.challenge}
                                </p>
                                <p className="text-sm text-gray-700 leading-relaxed">
                                    <span className="font-semibold text-primary">
                                        Remedy:{" "}
                                    </span>
                                    {l.remedy}
                                </p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            ))}
        </div>
    );
}

interface MantraTabProps {
    profile: NumberProfile | null;
    onCopy: () => void;
    copied: boolean;
}

function MantraTab({ profile, onCopy, copied }: MantraTabProps) {
    if (!profile) {
        return (
            <p className="text-sm text-gray-500">
                Mantra unavailable for this number.
            </p>
        );
    }

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
                                Planet mantra · {profile.planet}
                            </p>
                            <p className="text-xs text-white/60">
                                Chant 108 times daily
                            </p>
                        </div>
                    </div>

                    <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={onCopy}
                        className="h-8 rounded-full bg-white/10 hover:bg-white/20 text-white text-xs border border-white/10"
                    >
                        {copied ? (
                            <>
                                <Check className="h-3.5 w-3.5 mr-1" />
                                Copied
                            </>
                        ) : (
                            <>
                                <Copy className="h-3.5 w-3.5 mr-1" />
                                Copy
                            </>
                        )}
                    </Button>
                </div>

                <p className="text-2xl md:text-3xl font-heading text-accent leading-snug mb-3">
                    {profile.mantra}
                </p>
                <p className="text-sm md:text-base italic text-white/80 mb-3">
                    {profile.mantraTransliteration}
                </p>
                <p className="text-sm md:text-base text-white/70 leading-relaxed">
                    {profile.mantraMeaning}
                </p>
            </div>
        </div>
    );
}

interface ShareStripProps {
    name: string;
    lifePath: number;
    title: string;
}

function ShareStrip({ name, lifePath, title }: ShareStripProps) {
    const mounted = useMounted();

    const shareText = `${name}'s Life Path is ${lifePath} — ${title}. Discover your numerology on AstroEshop.`;
    const shareUrl =
        mounted && typeof window !== "undefined"
            ? `${window.location.origin}/free-numerology-calculator`
            : "/free-numerology-calculator";
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
                    Share your reading
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

/* ─────────────────────────  Page  ───────────────────────── */

type TabValue =
    | "personality"
    | "career"
    | "love"
    | "lucky"
    | "year"
    | "karmic"
    | "mantra";

export default function NumerologyPage() {
    const [result, setResult] = useState<NumerologyResult | null>(null);
    const [activeTab, setActiveTab] = useState<TabValue>("personality");
    const [selectedDimension, setSelectedDimension] =
        useState<NumerologyDimension>("lifePath");
    const [partnerInput, setPartnerInput] = useState("");
    const [affirmationCopied, setAffirmationCopied] = useState(false);
    const [mantraCopied, setMantraCopied] = useState(false);

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<NumerologyFormData>({
        resolver: zodResolver(numerologySchema),
    });

    const onSubmit = (data: NumerologyFormData) => {
        setResult(buildResult(data.name, data.birthDate));
        setActiveTab("personality");
        setSelectedDimension("lifePath");
        setPartnerInput("");
    };

    const onReset = () => {
        setResult(null);
        setActiveTab("personality");
        setSelectedDimension("lifePath");
        setPartnerInput("");
        reset();
    };

    const lifePathProfile = useMemo(
        () => (result ? getNumberProfile(result.lifePath) : null),
        [result]
    );

    const dimensionValues = useMemo(() => {
        if (!result) return {} as Record<NumerologyDimension, number>;
        return {
            lifePath: result.lifePath,
            destiny: result.destiny,
            soulUrge: result.soulUrge,
            personality: result.personality,
            birthday: result.birthday,
            personalYear: result.personalYear,
        } satisfies Record<NumerologyDimension, number>;
    }, [result]);

    const dimensionSummaries = useMemo(() => {
        if (!result) return {} as Record<NumerologyDimension, string>;
        return DIMENSIONS.reduce<Record<NumerologyDimension, string>>(
            (acc, dim) => {
                const meaning = getDimensionMeaning(dim.id, dimensionValues[dim.id]);
                acc[dim.id] = meaning?.summary ?? "Meaning unavailable.";
                return acc;
            },
            {} as Record<NumerologyDimension, string>
        );
    }, [result, dimensionValues]);

    const expandedMeaning = useMemo<DimensionMeaning | null>(() => {
        if (!result) return null;
        return getDimensionMeaning(
            selectedDimension,
            dimensionValues[selectedDimension]
        );
    }, [result, selectedDimension, dimensionValues]);

    const personalYearGuide = useMemo(
        () => (result ? getPersonalYearGuide(result.personalYear) : null),
        [result]
    );

    const karmicLessons = useMemo(
        () => (result ? getKarmicLessons(result.birthDate) : []),
        [result]
    );

    const relations = useMemo(
        () => (result ? getNumberRelations(result.moolAnk) : {}),
        [result]
    );

    const partnerNumber = useMemo(() => {
        const n = parseInt(partnerInput, 10);
        if (Number.isNaN(n) || n < 1 || n > 9) return null;
        return n;
    }, [partnerInput]);

    const compatibility = useMemo<CompatibilityInfo | null>(() => {
        if (!result || partnerNumber === null) return null;
        return getCompatibility(result.lifePath, partnerNumber);
    }, [result, partnerNumber]);

    const allNumberMatches = useMemo(() => {
        if (!result) return [];
        const base = result.lifePath;
        const keys = Object.keys(NUMBER_PROFILES).map((k) => Number(k)) as NumerologyNumber[];
        return keys
            .filter((n) => n !== base && n >= 1 && n <= 9)
            .map((n) => ({ n, info: getCompatibility(base, n) }));
    }, [result]);

    const topMatches = useMemo(
        () =>
            [...allNumberMatches]
                .sort((a, b) => b.info.score - a.info.score)
                .slice(0, 3),
        [allNumberMatches]
    );

    const challengingMatches = useMemo(
        () =>
            [...allNumberMatches]
                .sort((a, b) => a.info.score - b.info.score)
                .slice(0, 2),
        [allNumberMatches]
    );

    const currentCalendarYear = useMemo(() => new Date().getFullYear(), []);

    const handleCopyAffirmation = async () => {
        if (!lifePathProfile) return;
        try {
            await navigator.clipboard.writeText(lifePathProfile.affirmation);
            setAffirmationCopied(true);
            toast.success("Affirmation copied!");
            window.setTimeout(() => setAffirmationCopied(false), 2000);
        } catch {
            toast.error("Could not copy affirmation");
        }
    };

    const handleCopyMantra = async () => {
        if (!lifePathProfile) return;
        try {
            await navigator.clipboard.writeText(
                `${lifePathProfile.mantra}\n${lifePathProfile.mantraTransliteration}\n${lifePathProfile.mantraMeaning}`
            );
            setMantraCopied(true);
            toast.success("Mantra copied!");
            window.setTimeout(() => setMantraCopied(false), 2000);
        } catch {
            toast.error("Could not copy mantra");
        }
    };

    return (
        <MainLayout>
            <HeroSection hasResult={!!result} />

            <section className="py-12 md:py-16">
                <div className="container mx-auto px-4">
                    <InputForm
                        hasResult={!!result}
                        onReset={onReset}
                        register={register}
                        handleSubmit={handleSubmit}
                        errors={errors}
                        onSubmit={onSubmit}
                    />
                </div>
            </section>

            {result && (
                <section className="pb-16 -mt-6">
                    <div className="container mx-auto px-4">
                        <div className="max-w-5xl mx-auto space-y-8">
                            <LifePathHeroCard
                                number={result.lifePath}
                                profile={lifePathProfile}
                            />

                            <div>
                                <p className="text-[11px] uppercase tracking-widest text-secondary font-bold text-center mb-4">
                                    Your core numbers · Tap a card for details
                                </p>
                                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                                    {DIMENSIONS.map((dim) => (
                                        <NumberTile
                                            key={dim.id}
                                            dim={dim}
                                            value={dimensionValues[dim.id]}
                                            summary={dimensionSummaries[dim.id]}
                                            isActive={selectedDimension === dim.id}
                                            onSelect={setSelectedDimension}
                                        />
                                    ))}
                                </div>
                            </div>

                            <ExpandedDimension
                                dim={
                                    DIMENSIONS.find((d) => d.id === selectedDimension) ??
                                    DIMENSIONS[0]
                                }
                                value={dimensionValues[selectedDimension]}
                                meaning={expandedMeaning}
                            />

                            <div className="grid grid-cols-2 gap-3 md:max-w-md">
                                <div className="rounded-2xl p-4 bg-white border border-gray-100">
                                    <p className="text-[11px] uppercase tracking-widest text-secondary font-bold mb-1">
                                        Mool Ank
                                    </p>
                                    <p className="text-3xl font-bold font-heading text-primary">
                                        {result.moolAnk}
                                    </p>
                                    <p className="text-xs text-gray-500">
                                        Ruling number from birth day
                                    </p>
                                </div>
                                <div className="rounded-2xl p-4 bg-white border border-gray-100">
                                    <p className="text-[11px] uppercase tracking-widest text-secondary font-bold mb-1">
                                        Bhagya Ank
                                    </p>
                                    <p className="text-3xl font-bold font-heading text-primary">
                                        {result.bhagyaAnk}
                                    </p>
                                    <p className="text-xs text-gray-500">
                                        Destiny number from full DOB
                                    </p>
                                </div>
                            </div>

                            <Tabs
                                value={activeTab}
                                onValueChange={(v) => setActiveTab(v as TabValue)}
                            >
                                <TabsList className="w-full h-auto bg-white border border-gray-100 rounded-2xl p-1 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-1">
                                    <TabsTrigger
                                        value="personality"
                                        className="rounded-xl data-[state=active]:bg-primary data-[state=active]:text-white text-gray-600 h-10 text-sm"
                                    >
                                        Personality
                                    </TabsTrigger>
                                    <TabsTrigger
                                        value="career"
                                        className="rounded-xl data-[state=active]:bg-primary data-[state=active]:text-white text-gray-600 h-10 text-sm"
                                    >
                                        Career
                                    </TabsTrigger>
                                    <TabsTrigger
                                        value="love"
                                        className="rounded-xl data-[state=active]:bg-primary data-[state=active]:text-white text-gray-600 h-10 text-sm"
                                    >
                                        Love
                                    </TabsTrigger>
                                    <TabsTrigger
                                        value="lucky"
                                        className="rounded-xl data-[state=active]:bg-primary data-[state=active]:text-white text-gray-600 h-10 text-sm"
                                    >
                                        Lucky
                                    </TabsTrigger>
                                    <TabsTrigger
                                        value="year"
                                        className="rounded-xl data-[state=active]:bg-primary data-[state=active]:text-white text-gray-600 h-10 text-sm"
                                    >
                                        Year
                                    </TabsTrigger>
                                    <TabsTrigger
                                        value="karmic"
                                        className="rounded-xl data-[state=active]:bg-primary data-[state=active]:text-white text-gray-600 h-10 text-sm"
                                    >
                                        Karmic
                                    </TabsTrigger>
                                    <TabsTrigger
                                        value="mantra"
                                        className="rounded-xl data-[state=active]:bg-primary data-[state=active]:text-white text-gray-600 h-10 text-sm"
                                    >
                                        Mantra
                                    </TabsTrigger>
                                </TabsList>

                                <TabsContent value="personality" className="mt-6">
                                    <PersonalityTab
                                        profile={lifePathProfile}
                                        onCopyAffirmation={handleCopyAffirmation}
                                        copied={affirmationCopied}
                                    />
                                </TabsContent>

                                <TabsContent value="career" className="mt-6">
                                    <CareerTab profile={lifePathProfile} />
                                </TabsContent>

                                <TabsContent value="love" className="mt-6">
                                    <CompatibilityTab
                                        lifePath={result.lifePath}
                                        partnerInput={partnerInput}
                                        onPartnerInputChange={setPartnerInput}
                                        compatibility={compatibility}
                                        topMatches={topMatches}
                                        challenging={challengingMatches}
                                    />
                                </TabsContent>

                                <TabsContent value="lucky" className="mt-6">
                                    <LuckyTab
                                        profile={lifePathProfile}
                                        relations={relations}
                                        moolAnk={result.moolAnk}
                                    />
                                </TabsContent>

                                <TabsContent value="year" className="mt-6">
                                    <PersonalYearTab
                                        year={result.personalYear}
                                        currentCalendarYear={currentCalendarYear}
                                        guide={personalYearGuide}
                                    />
                                </TabsContent>

                                <TabsContent value="karmic" className="mt-6">
                                    <KarmicTab lessons={karmicLessons} />
                                </TabsContent>

                                <TabsContent value="mantra" className="mt-6">
                                    <MantraTab
                                        profile={lifePathProfile}
                                        onCopy={handleCopyMantra}
                                        copied={mantraCopied}
                                    />
                                </TabsContent>
                            </Tabs>

                            <ShareStrip
                                name={result.name}
                                lifePath={result.lifePath}
                                title={lifePathProfile?.title ?? `Number ${result.lifePath}`}
                            />
                        </div>
                    </div>
                </section>
            )}

            <section className="py-12 border-t border-gray-100 bg-gray-50/40">
                <div className="container mx-auto px-4 text-center">
                    <h3 className="text-xl md:text-2xl font-bold font-heading text-gray-900 mb-2">
                        Want a Detailed Numerology Report?
                    </h3>
                    <p className="text-sm text-gray-500 mb-6 max-w-md mx-auto">
                        Get a personalized numerology analysis from our expert
                        astrologers — lucky name corrections, remedies and more.
                    </p>
                    <div className="flex items-center justify-center gap-3 flex-wrap">
                        <ConsultationButton
                            service="Numerology Report"
                            className="bg-primary rounded-xl"
                        >
                            Book Consultation
                        </ConsultationButton>
                        <Button variant="outline" className="rounded-xl" asChild>
                            <Link href="/contact">Contact Us</Link>
                        </Button>
                    </div>
                </div>
            </section>
        </MainLayout>
    );
}
