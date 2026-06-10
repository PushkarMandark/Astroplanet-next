"use client";

import { useState, useMemo } from "react";
import { MainLayout } from "@/components/templates/main-layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { toast } from "sonner";
import {
    Sun,
    Moon,
    Star,
    Clock,
    Calendar,
    ChevronLeft,
    ChevronRight,
    ChevronDown,
    Sunrise,
    Sunset,
    MoonStar,
    Sparkles,
    ArrowRight,
    AlertTriangle,
    PartyPopper,
    CheckCircle2,
    XCircle,
    Info,
    Gem,
    Copy,
    Check,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { calculatePanchang } from "@/lib/panchang";
import Link from "next/link";
import { ConsultationButton } from "@/components/molecules/consultation-button";
import { FaqSection } from "@/components/molecules";
import { LanguageSwitcher } from "@/components/molecules";
import { useT, useLang } from "@/lib/i18n";
import { panchang as panchangDict } from "@/lib/i18n/translations/panchang";
import {
    VARAS,
    CHOGHADIYAS,
    getTithiInfo,
    getNakshatraActivity,
    getYogaInfo,
    getKaranaInfo,
    buildDayChoghadiya,
    buildNightChoghadiya,
    getActivitySuggestions,
} from "@/lib/data/panchang-meanings";
import type {
    TithiInfo,
    NakshatraActivity,
    YogaInfo,
    KaranaInfo,
    VaraInfo,
    ChoghadiyaPeriod,
    ActivityGuide,
} from "@/lib/data/panchang-meanings";

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

type ExpandedElement = "tithi" | "nakshatra" | "yoga" | "karana" | "vara" | null;
type VibeStatus = "auspicious" | "mixed" | "inauspicious";
type ChoghadiyaTab = "day" | "night";

interface VibeMeta {
    status: VibeStatus;
    label: string;
    summary: string;
    pillClass: string;
    dotClass: string;
}

function computeVibe(
    tithiInfo: TithiInfo | null,
    nakshatraInfo: NakshatraActivity | null,
    yogaInfo: YogaInfo | null
): VibeMeta {
    const flags = [tithiInfo?.auspicious, nakshatraInfo?.nature, yogaInfo?.auspicious];
    // Normalize to auspicious boolean where possible
    const ausp = [
        tithiInfo?.auspicious === true,
        nakshatraInfo ? /good|auspicious|benefic|favor/i.test(nakshatraInfo.nature) : false,
        yogaInfo?.auspicious === true,
    ];
    const inausp = [
        tithiInfo?.auspicious === false,
        nakshatraInfo ? /bad|inauspicious|malefic|harsh|fierce|cruel/i.test(nakshatraInfo.nature) : false,
        yogaInfo?.auspicious === false,
    ];
    const auspCount = ausp.filter(Boolean).length;
    const inauspCount = inausp.filter(Boolean).length;

    if (auspCount >= 2) {
        return {
            status: "auspicious",
            label: "auspicious",
            summary: "auspicious",
            pillClass: "bg-green-100 text-green-800 border-green-200",
            dotClass: "bg-green-500",
        };
    }
    if (inauspCount >= 2) {
        return {
            status: "inauspicious",
            label: "inauspicious",
            summary: "inauspicious",
            pillClass: "bg-red-100 text-red-800 border-red-200",
            dotClass: "bg-red-500",
        };
    }
    // Fallback referencing flags to keep them linting-clean.
    void flags;
    return {
        status: "mixed",
        label: "mixed",
        summary: "mixed",
        pillClass: "bg-amber-100 text-amber-800 border-amber-200",
        dotClass: "bg-amber-500",
    };
}

interface InfoPillProps {
    label: string;
    tone: "green" | "amber" | "red" | "slate";
}

function InfoPill({ label, tone }: InfoPillProps) {
    const toneClass = {
        green: "bg-green-50 text-green-700 border-green-200",
        amber: "bg-amber-50 text-amber-800 border-amber-200",
        red: "bg-red-50 text-red-700 border-red-200",
        slate: "bg-slate-50 text-slate-700 border-slate-200",
    }[tone];
    return (
        <span
            className={cn(
                "inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-medium border",
                toneClass
            )}
        >
            {label}
        </span>
    );
}

interface BulletListProps {
    title: string;
    items: string[];
    tone: "green" | "red";
}

function BulletList({ title, items, tone }: BulletListProps) {
    if (!items || items.length === 0) return null;
    const Icon = tone === "green" ? CheckCircle2 : XCircle;
    const iconClass = tone === "green" ? "text-green-600" : "text-red-600";
    return (
        <div>
            <p className="text-[11px] font-bold uppercase tracking-wider text-gray-500 mb-2">
                {title}
            </p>
            <ul className="space-y-1.5">
                {items.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm text-gray-700">
                        <Icon className={cn("h-4 w-4 mt-0.5 shrink-0", iconClass)} />
                        <span>{item}</span>
                    </li>
                ))}
            </ul>
        </div>
    );
}

interface TithiDetailsProps {
    info: TithiInfo;
    t: (key: keyof typeof panchangDict["en"]) => string;
}

function TithiDetails({ info, t }: TithiDetailsProps) {
    return (
        <div className="space-y-4">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                <DetailCell label={t("cellDeity")} value={info.deity} />
                <DetailCell label={t("cellNature")} value={info.nature} />
                <DetailCell label={t("cellTithiNo")} value={String(info.number)} />
            </div>
            <p className="text-sm text-gray-600 leading-relaxed">{info.description}</p>
            <div className="grid md:grid-cols-2 gap-4">
                <BulletList title={t("bulletFavorable")} items={info.favorable} tone="green" />
                <BulletList title={t("bulletAvoid")} items={info.avoid} tone="red" />
            </div>
        </div>
    );
}

interface NakshatraDetailsProps {
    info: NakshatraActivity;
    t: (key: keyof typeof panchangDict["en"]) => string;
}

function NakshatraDetails({ info, t }: NakshatraDetailsProps) {
    return (
        <div className="space-y-4">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                <DetailCell label={t("cellDeity")} value={info.deity} />
                <DetailCell label={t("cellRuler")} value={info.ruler} />
                <DetailCell label={t("cellNature")} value={info.nature} />
            </div>
            <p className="text-sm text-gray-600 leading-relaxed">{info.description}</p>
            <div className="grid md:grid-cols-2 gap-4">
                <BulletList title={t("bulletFavorable")} items={info.favorable} tone="green" />
                <BulletList title={t("bulletAvoid")} items={info.avoid} tone="red" />
            </div>
        </div>
    );
}

interface YogaDetailsProps {
    info: YogaInfo;
    t: (key: keyof typeof panchangDict["en"]) => string;
}

function YogaDetails({ info, t }: YogaDetailsProps) {
    return (
        <div className="space-y-3">
            <div className="flex items-center gap-2">
                <InfoPill
                    label={info.auspicious ? t("pillAuspicious") : t("pillInauspicious")}
                    tone={info.auspicious ? "green" : "red"}
                />
                <InfoPill label={info.nature} tone="slate" />
            </div>
            <p className="text-sm text-gray-600 leading-relaxed">{info.description}</p>
        </div>
    );
}

interface KaranaDetailsProps {
    info: KaranaInfo;
    t: (key: keyof typeof panchangDict["en"]) => string;
}

function KaranaDetails({ info, t }: KaranaDetailsProps) {
    return (
        <div className="space-y-3">
            <div className="flex items-center gap-2">
                <InfoPill label={info.type} tone="slate" />
                <InfoPill
                    label={info.auspicious ? t("pillAuspicious") : t("pillInauspicious")}
                    tone={info.auspicious ? "green" : "red"}
                />
            </div>
            <p className="text-sm text-gray-600 leading-relaxed">{info.description}</p>
        </div>
    );
}

interface VaraDetailsProps {
    info: VaraInfo;
    t: (key: keyof typeof panchangDict["en"]) => string;
}

function VaraDetails({ info, t }: VaraDetailsProps) {
    return (
        <div className="space-y-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                <DetailCell label={t("cellRuler")} value={info.ruler} />
                <DetailCell label={t("cellDeity")} value={info.deity} />
                <div className="rounded-lg bg-gray-50 px-3 py-2">
                    <p className="text-[11px] text-gray-400 mb-1">{t("cellLuckyColor")}</p>
                    <div className="flex items-center gap-2">
                        <span
                            className="inline-block w-4 h-4 rounded-full border border-gray-200"
                            style={{ backgroundColor: info.colorHex }}
                        />
                        <span className="text-sm font-bold text-gray-900">{info.color}</span>
                    </div>
                </div>
                <DetailCell label={t("cellDay")} value={`${info.english} (${info.hindi})`} />
            </div>
            <p className="text-sm text-gray-600 leading-relaxed">{info.description}</p>
            <div className="rounded-xl bg-primary/5 border border-primary/10 p-4">
                <p className="text-[11px] font-bold uppercase tracking-wider text-primary mb-2">
                    {t("cellMantra")}
                </p>
                <p className="font-heading text-lg text-primary leading-snug mb-1">{info.mantra}</p>
                <p className="text-sm italic text-gray-600 mb-1">{info.mantraTransliteration}</p>
                <p className="text-xs text-gray-500">{info.mantraMeaning}</p>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
                <BulletList title={t("cellFavorableActivities")} items={info.favorable} tone="green" />
                <div>
                    <p className="text-[11px] font-bold uppercase tracking-wider text-gray-500 mb-2">
                        {t("cellTraditionalFasts")}
                    </p>
                    <ul className="space-y-1.5">
                        {info.fasts.map((f) => (
                            <li key={f} className="flex items-start gap-2 text-sm text-gray-700">
                                <Sparkles className="h-4 w-4 mt-0.5 shrink-0 text-accent" />
                                <span>{f}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
}

interface DetailCellProps {
    label: string;
    value: string;
}

function DetailCell({ label, value }: DetailCellProps) {
    return (
        <div className="rounded-lg bg-gray-50 px-3 py-2">
            <p className="text-[11px] text-gray-400 mb-0.5">{label}</p>
            <p className="text-sm font-bold text-gray-900">{value}</p>
        </div>
    );
}

interface ActivityTileProps {
    guide: ActivityGuide;
    favorableLabel: string;
    avoidLabel: string;
}

function ActivityTile({ guide, favorableLabel, avoidLabel }: ActivityTileProps) {
    const Icon = guide.favorable ? CheckCircle2 : XCircle;
    const containerClass = guide.favorable
        ? "bg-green-50/60 border-green-100"
        : "bg-red-50/60 border-red-100";
    const iconClass = guide.favorable ? "text-green-600" : "text-red-600";
    const statusText = guide.favorable ? favorableLabel : avoidLabel;
    const statusClass = guide.favorable ? "text-green-700" : "text-red-700";
    return (
        <div className={cn("rounded-2xl border p-4", containerClass)}>
            <div className="flex items-start gap-3">
                <Icon className={cn("h-5 w-5 shrink-0 mt-0.5", iconClass)} />
                <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-2 mb-1">
                        <p className="font-bold text-gray-900 text-sm">{guide.category}</p>
                        <span className={cn("text-[11px] font-bold uppercase tracking-wider", statusClass)}>
                            {statusText}
                        </span>
                    </div>
                    <p className="text-xs text-gray-600 leading-relaxed">{guide.reason}</p>
                </div>
            </div>
        </div>
    );
}

interface ChoghadiyaRowProps {
    period: ChoghadiyaPeriod;
    shubhLabel: string;
    ashubhLabel: string;
}

function ChoghadiyaRow({ period, shubhLabel, ashubhLabel }: ChoghadiyaRowProps) {
    const info = CHOGHADIYAS[period.name];
    const rowClass = period.auspicious
        ? "bg-green-50/50 hover:bg-green-50"
        : "bg-red-50/40 hover:bg-red-50";
    return (
        <div
            className={cn(
                "grid grid-cols-[1fr_auto] md:grid-cols-[1.2fr_auto_1fr_auto] gap-3 items-center px-4 md:px-5 py-3 transition-colors",
                rowClass
            )}
        >
            <div className="min-w-0">
                <p className="font-bold text-gray-900 text-sm leading-tight">
                    {period.name} <span className="text-xs text-gray-500">({period.hindi})</span>
                </p>
                <p className="text-[11px] text-gray-500 md:hidden">{info?.ruler}</p>
            </div>
            <div className="text-right md:text-left text-sm font-mono text-gray-700 whitespace-nowrap">
                {period.start} – {period.end}
            </div>
            <p className="hidden md:block text-xs text-gray-600 leading-snug">
                {info?.description}
            </p>
            <span
                className={cn(
                    "inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider col-span-2 md:col-span-1 justify-self-start md:justify-self-end",
                    period.auspicious
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                )}
            >
                {period.auspicious ? shubhLabel : ashubhLabel}
            </span>
        </div>
    );
}

interface MantraOfDayProps {
    vara: VaraInfo;
    mantraOfDayLabel: string;
    copyLabel: string;
    copiedLabel: string;
    chantTip: string;
}

function MantraOfDay({ vara, mantraOfDayLabel, copyLabel, copiedLabel, chantTip }: MantraOfDayProps) {
    const [copied, setCopied] = useState(false);

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(
                `${vara.mantra}\n${vara.mantraTransliteration}\n${vara.mantraMeaning}`
            );
            setCopied(true);
            toast.success("Mantra copied!");
            window.setTimeout(() => setCopied(false), 2000);
        } catch {
            toast.error("Could not copy mantra");
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
                            <Gem className="h-4 w-4 text-accent" />
                        </div>
                        <div>
                            <p className="text-[11px] uppercase tracking-widest text-accent font-bold">
                                {mantraOfDayLabel}
                            </p>
                            <p className="text-xs text-white/60">
                                {vara.ruler} &middot; {vara.deity}
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
                                {copiedLabel}
                            </>
                        ) : (
                            <>
                                <Copy className="h-3.5 w-3.5 mr-1" />
                                {copyLabel}
                            </>
                        )}
                    </Button>
                </div>
                <p className="text-2xl md:text-3xl font-heading text-accent leading-snug mb-3">
                    {vara.mantra}
                </p>
                <p className="text-sm md:text-base italic text-white/80 mb-3">
                    {vara.mantraTransliteration}
                </p>
                <p className="text-sm md:text-base text-white/70 leading-relaxed mb-4">
                    {vara.mantraMeaning}
                </p>
                <p className="text-xs text-accent/90 font-medium">
                    {chantTip}
                </p>
            </div>
        </div>
    );
}

export default function PanchangPage() {
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [expandedElement, setExpandedElement] = useState<ExpandedElement>(null);
    const [choghadiyaTab, setChoghadiyaTab] = useState<ChoghadiyaTab>("day");

    const t = useT(panchangDict);
    const lang = useLang();

    const panchangData = useMemo(() => calculatePanchang(selectedDate), [selectedDate]);

    const tithiInfo = useMemo(() => getTithiInfo(panchangData.tithi), [panchangData.tithi]);
    const nakshatraInfo = useMemo(
        () => getNakshatraActivity(panchangData.nakshatra),
        [panchangData.nakshatra]
    );
    const yogaInfo = useMemo(() => getYogaInfo(panchangData.yoga), [panchangData.yoga]);
    const karanaInfo = useMemo(() => getKaranaInfo(panchangData.karana), [panchangData.karana]);
    const varaInfo: VaraInfo | undefined = VARAS[panchangData.vara];

    const vibe = useMemo(
        () => computeVibe(tithiInfo, nakshatraInfo, yogaInfo),
        [tithiInfo, nakshatraInfo, yogaInfo]
    );

    const activityGuides = useMemo(
        () => getActivitySuggestions(panchangData.tithi, panchangData.nakshatra, panchangData.yoga),
        [panchangData.tithi, panchangData.nakshatra, panchangData.yoga]
    );

    const dayChoghadiya = useMemo(
        () => buildDayChoghadiya(panchangData.vara, panchangData.sunrise, panchangData.sunset),
        [panchangData.vara, panchangData.sunrise, panchangData.sunset]
    );

    const nightChoghadiya = useMemo(
        () => buildNightChoghadiya(panchangData.vara, panchangData.sunset, panchangData.sunrise),
        [panchangData.vara, panchangData.sunset, panchangData.sunrise]
    );

    const goToDay = (offset: number) => {
        setSelectedDate((prev) => {
            const d = new Date(prev);
            d.setDate(d.getDate() + offset);
            return d;
        });
    };

    const goToToday = () => setSelectedDate(new Date());

    const isToday = selectedDate.toDateString() === new Date().toDateString();

    const formattedDate = selectedDate.toLocaleDateString("en-IN", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
    });

    const hindiDay = hindiDays[panchangData.vara] || "";

    const toggleElement = (key: Exclude<ExpandedElement, null>) => {
        setExpandedElement((prev) => (prev === key ? null : key));
    };

    const nakshatraNatureTone: "green" | "amber" | "red" = nakshatraInfo
        ? /good|auspicious|benefic|favor/i.test(nakshatraInfo.nature)
            ? "green"
            : /bad|inauspicious|malefic|harsh|fierce|cruel/i.test(nakshatraInfo.nature)
                ? "red"
                : "amber"
        : "amber";

    // Resolve translated vibe strings
    const vibeLabel =
        vibe.status === "auspicious"
            ? t("vibeAuspicious")
            : vibe.status === "inauspicious"
                ? t("vibeInauspicious")
                : t("vibeMixed");
    const vibeSummary =
        vibe.status === "auspicious"
            ? t("vibeAuspiciousSummary")
            : vibe.status === "inauspicious"
                ? t("vibeInauspiciousSummary")
                : t("vibeMixedSummary");

    return (
        <MainLayout>
            {/* Hero */}
            <section className="relative bg-gradient-to-br from-primary via-primary to-[#5a0606] text-white overflow-hidden">
                <div className="absolute inset-0">
                    <div className="absolute top-10 right-20 w-72 h-72 bg-accent/15 rounded-full blur-3xl" />
                    <div className="absolute -bottom-10 -left-10 w-56 h-56 bg-secondary/10 rounded-full blur-3xl" />
                </div>
                <div className="container mx-auto px-4 relative z-10 py-12 md:py-16">
                    <div className="flex justify-end mb-4">
                        <LanguageSwitcher />
                    </div>
                    <div className="max-w-2xl mx-auto text-center">
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-sm text-sm mb-4">
                            <Calendar className="h-3.5 w-3.5 text-accent" />
                            {t("heroBadge")}
                        </div>
                        <h1 className="text-4xl md:text-5xl font-bold font-heading mb-3">
                            {t("heroTitle")}
                        </h1>
                        <p className="text-white/70 text-base max-w-lg mx-auto">
                            {t("heroSubtitle")} {panchangData.masa} {t("heroSubtitleSuffix")}
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
                                {hindiDay} &middot; {panchangData.paksha} Paksha &middot; {panchangData.masa} ({panchangData.ritu})
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
                                {t("goToToday")}
                            </Button>
                        </div>
                    )}
                </div>
            </div>

            <section className="py-8 md:py-12">
                <div className="container mx-auto px-4 max-w-5xl">

                    {/* Festivals Banner */}
                    {panchangData.festivals.length > 0 && (
                        <div className="mb-8 rounded-2xl bg-accent/10 border border-accent/20 p-5">
                            <div className="flex items-start gap-3">
                                <div className="w-10 h-10 rounded-xl bg-accent/20 flex items-center justify-center shrink-0">
                                    <PartyPopper className="h-5 w-5 text-accent" />
                                </div>
                                <div>
                                    <p className="text-xs font-bold uppercase tracking-wider text-accent mb-1">{t("festivalToday")}</p>
                                    {panchangData.festivals.map((f) => (
                                        <div key={f.name}>
                                            <p className="font-bold text-gray-900">{f.name}</p>
                                            {f.description && (
                                                <p className="text-sm text-gray-600 mt-0.5">{f.description}</p>
                                            )}
                                            {f.isFastingDay && (
                                                <span className="inline-flex items-center gap-1 mt-1 text-[11px] font-medium text-primary bg-primary/5 px-2 py-0.5 rounded-full">
                                                    {t("fastingDay")}
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
                            { icon: Sunrise, labelKey: "labelSunrise" as const, value: panchangData.sunrise, color: "text-amber-500", bg: "bg-amber-50" },
                            { icon: Sunset, labelKey: "labelSunset" as const, value: panchangData.sunset, color: "text-orange-500", bg: "bg-orange-50" },
                            { icon: MoonStar, labelKey: "labelMoonrise" as const, value: panchangData.moonrise, color: "text-blue-500", bg: "bg-blue-50" },
                            { icon: AlertTriangle, labelKey: "labelRahuKaal" as const, value: panchangData.rahuKaal, color: "text-red-600", bg: "bg-red-50" },
                        ].map(({ icon: Icon, labelKey, value, color, bg }) => (
                            <div key={labelKey} className={cn("rounded-2xl p-4 text-center", bg)}>
                                <Icon className={cn("h-6 w-6 mx-auto mb-2", color)} />
                                <p className="text-[11px] text-gray-500 mb-0.5">{t(labelKey)}</p>
                                <p className={cn("text-lg md:text-xl font-bold", labelKey === "labelRahuKaal" ? "text-red-600" : "text-gray-900")}>
                                    {value}
                                </p>
                            </div>
                        ))}
                    </div>

                    {/* Today's Vibe */}
                    <Card className="mb-8 border-gray-100 shadow-sm py-0 overflow-hidden">
                        <CardContent className="p-0">
                            <div className="grid md:grid-cols-[1.2fr_1fr] gap-0">
                                <div className="p-6 md:p-7 border-b md:border-b-0 md:border-r border-gray-100">
                                    <div className="flex items-center gap-2 mb-3">
                                        <span
                                            className={cn(
                                                "inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border",
                                                vibe.pillClass
                                            )}
                                        >
                                            <span className={cn("w-1.5 h-1.5 rounded-full", vibe.dotClass)} />
                                            {vibeLabel}
                                        </span>
                                        <span className="text-[11px] uppercase tracking-wider text-gray-400 font-bold">
                                            {t("todaysVibe")}
                                        </span>
                                    </div>
                                    <p className="text-sm text-gray-600 leading-relaxed mb-4">
                                        {vibeSummary}
                                    </p>
                                    <div className="flex flex-wrap gap-2">
                                        {tithiInfo && (
                                            <InfoPill
                                                label={`${t("pillTithiPrefix")} ${tithiInfo.nature}`}
                                                tone={tithiInfo.auspicious ? "green" : "red"}
                                            />
                                        )}
                                        {nakshatraInfo && (
                                            <InfoPill
                                                label={`${t("pillNakshatraPrefix")} ${nakshatraInfo.nature}`}
                                                tone={nakshatraNatureTone}
                                            />
                                        )}
                                        {yogaInfo && (
                                            <InfoPill
                                                label={`${t("pillYogaPrefix")} ${yogaInfo.auspicious ? t("pillYogaFavorable") : t("pillYogaChallenging")}`}
                                                tone={yogaInfo.auspicious ? "green" : "red"}
                                            />
                                        )}
                                    </div>
                                </div>
                                {varaInfo && (
                                    <div className="p-6 md:p-7 bg-gradient-to-br from-primary/5 to-accent/5">
                                        <p className="text-[11px] uppercase tracking-wider text-primary font-bold mb-3">
                                            {t("weekdayProfile")}
                                        </p>
                                        <p className="text-lg font-heading font-bold text-gray-900 mb-0.5">
                                            {varaInfo.english} &middot; {varaInfo.hindi}
                                        </p>
                                        <p className="text-xs text-gray-500 mb-4">
                                            {t("ruledBy")} {varaInfo.ruler} &middot; {t("deity")} {varaInfo.deity}
                                        </p>
                                        <div className="flex items-center gap-3 bg-white/60 rounded-xl p-3 border border-gray-100">
                                            <span
                                                className="inline-block w-8 h-8 rounded-full border-2 border-white shadow-sm shrink-0"
                                                style={{ backgroundColor: varaInfo.colorHex }}
                                            />
                                            <div>
                                                <p className="text-[11px] text-gray-400">{t("luckyColor")}</p>
                                                <p className="text-sm font-bold text-gray-900">
                                                    {varaInfo.color}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </CardContent>
                    </Card>

                    {/* Main Panchang Elements */}
                    <div className="rounded-2xl border border-gray-100 bg-white overflow-hidden mb-8">
                        <div className="bg-primary/5 px-6 py-4 border-b border-gray-100">
                            <h2 className="text-lg font-bold font-heading text-gray-900 flex items-center gap-2">
                                <Sparkles className="h-5 w-5 text-primary" />
                                {t("fiveElementsHeading")}
                            </h2>
                            <p className="text-xs text-gray-500 mt-0.5">{t("fiveElementsTip")}</p>
                        </div>
                        <div className="divide-y divide-gray-50">
                            {[
                                {
                                    key: "tithi" as const,
                                    icon: Moon,
                                    label: t("tithiLabel"),
                                    english: t("tithiEnglish"),
                                    value: `${panchangData.paksha} ${lang === "hi" && tithiInfo ? tithiInfo.hindi : panchangData.tithi}`,
                                    subStart: `${t("startsAt")} ${panchangData.tithiStartTime}`,
                                    sub: `${t("endsAt")} ${panchangData.tithiEndTime}`,
                                    hasDetails: Boolean(tithiInfo),
                                },
                                {
                                    key: "nakshatra" as const,
                                    icon: Star,
                                    label: t("nakshatraLabel"),
                                    english: t("nakshatraEnglish"),
                                    value: `${lang === "hi" && nakshatraInfo ? nakshatraInfo.hindi : panchangData.nakshatra} (${t("pada")} ${panchangData.nakshatraPada})`,
                                    subStart: `${t("startsAt")} ${panchangData.nakshatraStartTime}`,
                                    sub: `${t("endsAt")} ${panchangData.nakshatraEndTime}`,
                                    hasDetails: Boolean(nakshatraInfo),
                                },
                                {
                                    key: "yoga" as const,
                                    icon: Sun,
                                    label: t("yogaLabel"),
                                    english: t("yogaEnglish"),
                                    value: lang === "hi" && yogaInfo ? yogaInfo.hindi : panchangData.yoga,
                                    subStart: `${t("startsAt")} ${panchangData.yogaStartTime}`,
                                    sub: `${t("endsAt")} ${panchangData.yogaEndTime}`,
                                    hasDetails: Boolean(yogaInfo),
                                },
                                {
                                    key: "karana" as const,
                                    icon: Calendar,
                                    label: t("karanaLabel"),
                                    english: t("karanaEnglish"),
                                    value: lang === "hi" && karanaInfo ? karanaInfo.hindi : panchangData.karana,
                                    subStart: `${t("startsAt")} ${panchangData.karanaStartTime}`,
                                    sub: `${t("endsAt")} ${panchangData.karanaEndTime}`,
                                    hasDetails: Boolean(karanaInfo),
                                },
                                {
                                    key: "vara" as const,
                                    icon: Clock,
                                    label: t("varaLabel"),
                                    english: t("varaEnglish"),
                                    value: `${lang === "hi" && varaInfo ? varaInfo.hindi : panchangData.vara} (${hindiDay})`,
                                    subStart: null,
                                    sub: null,
                                    hasDetails: Boolean(varaInfo),
                                },
                            ].map(({ key, icon: Icon, label, english, value, subStart, sub, hasDetails }) => {
                                const expanded = expandedElement === key;
                                return (
                                    <div key={english}>
                                        <button
                                            type="button"
                                            onClick={() => hasDetails && toggleElement(key)}
                                            disabled={!hasDetails}
                                            className={cn(
                                                "w-full flex items-center gap-4 px-6 py-4 text-left transition-colors",
                                                hasDetails ? "hover:bg-gray-50/70 cursor-pointer" : "cursor-default"
                                            )}
                                            aria-expanded={expanded}
                                        >
                                            <div className="w-10 h-10 rounded-xl bg-primary/5 flex items-center justify-center shrink-0">
                                                <Icon className="h-5 w-5 text-primary" />
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <p className="text-[11px] text-gray-400">
                                                    {label} ({english})
                                                </p>
                                                <p className="font-bold text-gray-900 text-sm">{value}</p>
                                            </div>
                                            {(subStart || sub) && (
                                                <span className="hidden sm:flex flex-col items-end text-right shrink-0">
                                                    {subStart && (
                                                        <span className="text-[11px] text-gray-400">
                                                            {subStart}
                                                        </span>
                                                    )}
                                                    {sub && (
                                                        <span className="text-[11px] text-gray-400">
                                                            {sub}
                                                        </span>
                                                    )}
                                                </span>
                                            )}
                                            {hasDetails && (
                                                <ChevronDown
                                                    className={cn(
                                                        "h-4 w-4 text-gray-400 shrink-0 transition-transform",
                                                        expanded && "rotate-180"
                                                    )}
                                                />
                                            )}
                                        </button>
                                        {expanded && hasDetails && (
                                            <div className="px-6 pb-6 pt-1 bg-gray-50/40">
                                                {key === "tithi" && tithiInfo && <TithiDetails info={tithiInfo} t={t} />}
                                                {key === "nakshatra" && nakshatraInfo && (
                                                    <NakshatraDetails info={nakshatraInfo} t={t} />
                                                )}
                                                {key === "yoga" && yogaInfo && <YogaDetails info={yogaInfo} t={t} />}
                                                {key === "karana" && karanaInfo && (
                                                    <KaranaDetails info={karanaInfo} t={t} />
                                                )}
                                                {key === "vara" && varaInfo && <VaraDetails info={varaInfo} t={t} />}
                                            </div>
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    {/* Activity Recommendations */}
                    {activityGuides.length > 0 && (
                        <div className="rounded-2xl border border-gray-100 bg-white overflow-hidden mb-8">
                            <div className="bg-primary/5 px-6 py-4 border-b border-gray-100">
                                <h2 className="text-lg font-bold font-heading text-gray-900 flex items-center gap-2">
                                    <Info className="h-5 w-5 text-primary" />
                                    {t("activityHeading")}
                                </h2>
                                <p className="text-xs text-gray-500 mt-0.5">
                                    {t("activitySubtitle")}
                                </p>
                            </div>
                            <div className="p-4 md:p-5 grid md:grid-cols-2 gap-3">
                                {activityGuides.map((guide) => (
                                    <ActivityTile
                                        key={guide.category}
                                        guide={guide}
                                        favorableLabel={t("activityFavorable")}
                                        avoidLabel={t("activityAvoid")}
                                    />
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Auspicious & Inauspicious Timings */}
                    <div className="grid md:grid-cols-2 gap-4 mb-8">
                        {/* Auspicious */}
                        <div className="rounded-2xl border border-green-100 bg-white overflow-hidden">
                            <div className="bg-green-50 px-5 py-3 border-b border-green-100">
                                <h3 className="text-sm font-bold text-green-800 flex items-center gap-2">
                                    <Sparkles className="h-4 w-4" />
                                    {t("auspiciousTimings")}
                                </h3>
                            </div>
                            <div className="divide-y divide-green-50">
                                {[
                                    { labelKey: "labelBrahmaMuhurta" as const, value: panchangData.brahmaMuhurta },
                                    { labelKey: "labelAbhijitMuhurta" as const, value: panchangData.abhijitMuhurta },
                                ].map(({ labelKey, value }) => (
                                    <div key={labelKey} className="flex items-center justify-between px-5 py-3">
                                        <span className="text-sm text-gray-700">{t(labelKey)}</span>
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
                                    {t("inauspiciousTimings")}
                                </h3>
                            </div>
                            <div className="divide-y divide-red-50">
                                {[
                                    { labelKey: "labelRahuKaal" as const, value: panchangData.rahuKaal },
                                    { labelKey: "labelYamaganda" as const, value: panchangData.yamaganda },
                                    { labelKey: "labelGulikaKaal" as const, value: panchangData.gulikaKaal },
                                ].map(({ labelKey, value }) => (
                                    <div key={labelKey} className="flex items-center justify-between px-5 py-3">
                                        <span className="text-sm text-gray-700">{t(labelKey)}</span>
                                        <span className="text-sm font-bold text-red-600">{value}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Choghadiya Muhurta */}
                    <div className="rounded-2xl border border-gray-100 bg-white overflow-hidden mb-8">
                        <div className="bg-primary/5 px-6 py-4 border-b border-gray-100">
                            <h2 className="text-lg font-bold font-heading text-gray-900 flex items-center gap-2">
                                <Clock className="h-5 w-5 text-primary" />
                                {t("choghadiyaHeading")}
                            </h2>
                            <p className="text-xs text-gray-500 mt-0.5">
                                {t("choghadiyaSubtitle")}
                            </p>
                        </div>
                        <div className="p-4 md:p-5">
                            <Tabs
                                value={choghadiyaTab}
                                onValueChange={(v) => setChoghadiyaTab(v as ChoghadiyaTab)}
                            >
                                <TabsList className="mb-4">
                                    <TabsTrigger value="day">{t("choghadiyaDay")}</TabsTrigger>
                                    <TabsTrigger value="night">{t("choghadiyaNight")}</TabsTrigger>
                                </TabsList>
                                <TabsContent value="day">
                                    {dayChoghadiya.length > 0 ? (
                                        <div className="rounded-xl border border-gray-100 divide-y divide-gray-50 overflow-hidden">
                                            {dayChoghadiya.map((period, idx) => (
                                                <ChoghadiyaRow
                                                    key={`day-${idx}-${period.name}`}
                                                    period={period}
                                                    shubhLabel={t("choghadiyaShubh")}
                                                    ashubhLabel={t("choghadiyaAshubh")}
                                                />
                                            ))}
                                        </div>
                                    ) : (
                                        <p className="text-sm text-gray-500 text-center py-8">
                                            {t("choghadiyaUnavailable")}
                                        </p>
                                    )}
                                </TabsContent>
                                <TabsContent value="night">
                                    {nightChoghadiya.length > 0 ? (
                                        <div className="rounded-xl border border-gray-100 divide-y divide-gray-50 overflow-hidden">
                                            {nightChoghadiya.map((period, idx) => (
                                                <ChoghadiyaRow
                                                    key={`night-${idx}-${period.name}`}
                                                    period={period}
                                                    shubhLabel={t("choghadiyaShubh")}
                                                    ashubhLabel={t("choghadiyaAshubh")}
                                                />
                                            ))}
                                        </div>
                                    ) : (
                                        <p className="text-sm text-gray-500 text-center py-8">
                                            {t("choghadiyaUnavailable")}
                                        </p>
                                    )}
                                </TabsContent>
                            </Tabs>
                        </div>
                    </div>

                    {/* Mantra of the Day */}
                    {varaInfo && (
                        <div className="mb-8">
                            <MantraOfDay
                                vara={varaInfo}
                                mantraOfDayLabel={t("mantraOfDay")}
                                copyLabel={t("mantraCopy")}
                                copiedLabel={t("mantraCopied")}
                                chantTip={t("mantraChantTip")}
                            />
                        </div>
                    )}

                    {/* Astronomical Info */}
                    <div className="rounded-2xl border border-gray-100 bg-white overflow-hidden mb-8">
                        <div className="bg-primary/5 px-6 py-4 border-b border-gray-100">
                            <h3 className="text-sm font-bold text-gray-900 flex items-center gap-2">
                                <Moon className="h-4 w-4 text-primary" />
                                {t("astronomicalHeading")}
                            </h3>
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-gray-50">
                            {[
                                { labelKey: "labelMoonSign" as const, value: panchangData.moonRashi },
                                { labelKey: "labelSunSign" as const, value: panchangData.sunRashi },
                                { labelKey: "labelSeason" as const, value: panchangData.ritu },
                                { labelKey: "labelHinduMonth" as const, value: panchangData.masa },
                            ].map(({ labelKey, value }) => (
                                <div key={labelKey} className="px-5 py-4 text-center">
                                    <p className="text-[11px] text-gray-400 mb-0.5">{t(labelKey)}</p>
                                    <p className="text-sm font-bold text-gray-900">{value}</p>
                                </div>
                            ))}
                        </div>
                        <div className="border-t border-gray-50 grid grid-cols-3 divide-x divide-gray-50">
                            {[
                                { labelKey: "labelVikramSamvat" as const, value: String(panchangData.samvat.vikram) },
                                { labelKey: "labelShakaSamvat" as const, value: String(panchangData.samvat.shaka) },
                                { labelKey: "labelSamvatsara" as const, value: panchangData.samvat.samvatsara },
                            ].map(({ labelKey, value }) => (
                                <div key={labelKey} className="px-5 py-3 text-center">
                                    <p className="text-[11px] text-gray-400 mb-0.5">{t(labelKey)}</p>
                                    <p className="text-sm font-bold text-gray-900">{value}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            <FaqSection
                description={t("faqDescription")}
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
                        {t("ctaHeading")}
                    </h3>
                    <p className="text-sm text-gray-500 mb-6 max-w-md mx-auto">
                        {t("ctaSubtitle")}
                    </p>
                    <div className="flex items-center justify-center gap-3">
                        <ConsultationButton service="Muhurta Guidance" className="bg-primary rounded-xl">
                            {t("ctaBook")}
                            <ArrowRight className="h-4 w-4 ml-1.5" />
                        </ConsultationButton>
                        <Button variant="outline" className="rounded-xl" asChild>
                            <Link href="/free-horoscope">{t("ctaHoroscope")}</Link>
                        </Button>
                    </div>
                </div>
            </section>
        </MainLayout>
    );
}
