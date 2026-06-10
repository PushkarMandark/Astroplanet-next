"use client";

import { useState, useMemo } from "react";
import { MainLayout } from "@/components/templates/main-layout";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { ConsultationButton } from "@/components/molecules/consultation-button";
import { FaqSection, TimePicker12h, format12h } from "@/components/molecules";
import {
  Star,
  Sparkles,
  Clock,
  MapPin,
  CalendarDays,
  ArrowRight,
  RotateCcw,
  Globe,
  Sun,
  Moon,
  Gem,
  Heart,
  Brain,
  Shield,
  Flame,
  Home,
  Briefcase,
  Users,
  Info,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  TrendingUp,
  Hash,
} from "lucide-react";
import { LocationSearch } from "@/components/molecules/location-search";
import { LanguageSwitcher } from "@/components/molecules";
import { useT, useLang, toLabelLang, type Lang } from "@/lib/i18n";
import { kundli as kundliDict } from "@/lib/i18n/translations/kundli";
import {
  getKundli,
  Observer,
  rashiNames,
  nakshatraNames,
} from "@ishubhamx/panchangam-js";
import {
  NorthIndianChart,
  SouthIndianChart,
  EastIndianChart,
  WestIndianChart,
} from "@/components/kundli/charts";
import {
  ChartStyleSwitcher,
  VargaSelector,
  AscendantSwitcher,
} from "@/components/kundli/chart-controls";
import {
  OtherDetailsPanel,
  LuckyAttributesCard,
  CompatibilityTeaser,
} from "@/components/kundli/details";
import { getAllVargaCharts } from "@/lib/astrology/vargas";
import { applyAscendantReference } from "@/lib/astrology/ascendant";
import { getBirthAttributes } from "@/lib/astrology/birth-attributes";
import { getLuckyAttributes } from "@/lib/astrology/lucky-attributes";
import type {
  ChartStyle,
  VargaKey,
  AscendantReference,
} from "@/lib/astrology/chart-types";
import { VARGA_OPTIONS } from "@/lib/astrology/chart-types";
import {
  RASHIS,
  PLANETS,
  HOUSES,
  ASCENDANT_TRAITS,
  MAHADASHA,
  getNakshatraInfo,
  getPlanetRemedies,
  checkMangalDosha,
  checkSadeSati,
  checkKaalSarpDosha,
  type RashiInfo,
  type PlanetInfo,
  type HouseInfo,
  type AscendantTraits,
  type MahadashaEffects,
  type DoshaResult,
  type Remedy,
  type ChartInput,
} from "@/lib/data/vedic";

/* ── i18n translator type (kundli dictionary) ──────────── */

type KundliTKey = keyof (typeof kundliDict)["en"];
type TFn = (key: KundliTKey) => string;

/* ── Planet helpers ────────────────────────────────────── */

const PLANET_KEYS = [
  "Sun",
  "Moon",
  "Mars",
  "Mercury",
  "Jupiter",
  "Venus",
  "Saturn",
  "Rahu",
  "Ketu",
] as const;

type PlanetKey = (typeof PLANET_KEYS)[number];

const PLANET_ABBR: Record<PlanetKey, string> = {
  Sun: "Su",
  Moon: "Mo",
  Mars: "Ma",
  Mercury: "Me",
  Jupiter: "Ju",
  Venus: "Ve",
  Saturn: "Sa",
  Rahu: "Ra",
  Ketu: "Ke",
};

const PLANET_HINDI: Record<PlanetKey, string> = {
  Sun: "सूर्य",
  Moon: "चंद्र",
  Mars: "मंगल",
  Mercury: "बुध",
  Jupiter: "गुरु",
  Venus: "शुक्र",
  Saturn: "शनि",
  Rahu: "राहु",
  Ketu: "केतु",
};

const PLANET_COLOR_CLASS: Record<PlanetKey, string> = {
  Sun: "text-orange-600 bg-orange-50 border-orange-100",
  Moon: "text-blue-600 bg-blue-50 border-blue-100",
  Mars: "text-red-600 bg-red-50 border-red-100",
  Mercury: "text-green-600 bg-green-50 border-green-100",
  Jupiter: "text-yellow-600 bg-yellow-50 border-yellow-100",
  Venus: "text-pink-600 bg-pink-50 border-pink-100",
  Saturn: "text-indigo-600 bg-indigo-50 border-indigo-100",
  Rahu: "text-gray-700 bg-gray-100 border-gray-200",
  Ketu: "text-gray-500 bg-gray-50 border-gray-100",
};

const PLANET_ABBR_COLOR: Record<string, string> = {
  Su: "text-orange-600 bg-orange-50",
  Mo: "text-blue-600 bg-blue-50",
  Ma: "text-red-600 bg-red-50",
  Me: "text-green-600 bg-green-50",
  Ju: "text-yellow-600 bg-yellow-50",
  Ve: "text-pink-600 bg-pink-50",
  Sa: "text-indigo-600 bg-indigo-50",
  Ra: "text-gray-600 bg-gray-100",
  Ke: "text-gray-500 bg-gray-50",
};

function getNakshatraFromDegree(longitude: number) {
  const idx = Math.floor(longitude / (360 / 27));
  return nakshatraNames[idx] ?? "—";
}

function formatEndTime(endTime: Date | string) {
  const d = endTime instanceof Date ? endTime : new Date(endTime);
  return d.toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

/** Full date-time for the dasha timeline table, e.g. "Mon, 21 Oct 2024, 22:04". */
function formatDashaDate(value: Date | string, locale: string): string {
  const d = value instanceof Date ? value : new Date(value);
  if (Number.isNaN(d.getTime())) return "—";
  return new Intl.DateTimeFormat(locale, {
    year: "numeric",
    month: "short",
    day: "numeric",
    weekday: "short",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).format(d);
}

interface DashaDurationUnits {
  year: string;
  month: string;
  lessThanMonth: string;
  /** Hindi inserts a space before the unit ("17 वर्ष"); English does not ("17y"). */
  spaced: boolean;
}

const MS_PER_DAY = 24 * 60 * 60 * 1000;
const MS_PER_DASHA_YEAR = 365.25 * MS_PER_DAY;
const MS_PER_DASHA_MONTH = 30.44 * MS_PER_DAY;

/** Compact duration like "17y", "6y 11m" (en) or "17 वर्ष", "6 वर्ष 11 माह" (hi). */
function formatDashaDuration(ms: number, units: DashaDurationUnits): string {
  if (!Number.isFinite(ms) || ms <= 0) return units.lessThanMonth;
  let years = Math.floor(ms / MS_PER_DASHA_YEAR);
  let months = Math.round((ms - years * MS_PER_DASHA_YEAR) / MS_PER_DASHA_MONTH);
  if (months >= 12) {
    years += 1;
    months -= 12;
  }
  const glue = units.spaced ? " " : "";
  const parts: string[] = [];
  if (years > 0) parts.push(`${years}${glue}${units.year}`);
  if (months > 0) parts.push(`${months}${glue}${units.month}`);
  return parts.length > 0 ? parts.join(" ") : units.lessThanMonth;
}

function formatDate(dateStr: string) {
  if (!dateStr) return "";
  const d = new Date(dateStr);
  return d.toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

/* ── Vimshottari "current period" correction ───────────────
 * The library reports currentMahadasha/currentAntardasha as of the BIRTH
 * moment (it returns fullCycle[0]), not as of today — so a chart whose
 * balance dasha ended in 2011 still shows it as "current". Derive the true
 * running periods from fullCycle instead: the mahadasha whose window
 * contains now, and its antardasha via the classical proportional split
 * (antar = maha years × antar-lord years / 120, sequence starting from the
 * maha lord at the maha's notional start).
 */
const VIMSHOTTARI_ORDER = [
  "Ketu",
  "Venus",
  "Sun",
  "Moon",
  "Mars",
  "Rahu",
  "Jupiter",
  "Saturn",
  "Mercury",
] as const;

const VIMSHOTTARI_YEARS: Record<string, number> = {
  Ketu: 7,
  Venus: 20,
  Sun: 6,
  Moon: 10,
  Mars: 7,
  Rahu: 18,
  Jupiter: 16,
  Saturn: 19,
  Mercury: 17,
};

interface DashaPeriod {
  planet: string;
  startTime: Date;
  endTime: Date;
}

function deriveCurrentDasha(
  dasha: KundliDasha | null | undefined,
  now: Date = new Date()
): { maha: DashaPeriod; antar: DashaPeriod | null } | null {
  const cycle = dasha?.fullCycle;
  if (!cycle || cycle.length === 0) return null;

  const periods: DashaPeriod[] = cycle
    .map((e) => ({
      planet: e.planet,
      startTime:
        e.startTime instanceof Date ? e.startTime : new Date(e.startTime),
      endTime: e.endTime instanceof Date ? e.endTime : new Date(e.endTime),
    }))
    .filter(
      (e) =>
        Number.isFinite(e.startTime.getTime()) &&
        Number.isFinite(e.endTime.getTime())
    );
  if (periods.length === 0) return null;

  const t = now.getTime();
  const maha =
    periods.find(
      (e) => e.startTime.getTime() <= t && t < e.endTime.getTime()
    ) ??
    (t < periods[0].startTime.getTime()
      ? periods[0]
      : periods[periods.length - 1]);

  // Walk antardashas from the maha's notional start (end − full maha span)
  // so the partial balance dasha at birth also resolves correctly.
  let antar: DashaPeriod | null = null;
  const mahaYears = VIMSHOTTARI_YEARS[maha.planet];
  const startIdx = (VIMSHOTTARI_ORDER as readonly string[]).indexOf(
    maha.planet
  );
  if (mahaYears && startIdx >= 0) {
    const mahaMs = mahaYears * MS_PER_DASHA_YEAR;
    let cursor = maha.endTime.getTime() - mahaMs;
    for (let i = 0; i < VIMSHOTTARI_ORDER.length; i++) {
      const lord = VIMSHOTTARI_ORDER[(startIdx + i) % VIMSHOTTARI_ORDER.length];
      const end = cursor + (mahaMs * VIMSHOTTARI_YEARS[lord]) / 120;
      if (t >= cursor && t < end) {
        antar = {
          planet: lord,
          startTime: new Date(cursor),
          endTime: new Date(end),
        };
        break;
      }
      cursor = end;
    }
  }

  return { maha, antar };
}

/* ── North Indian chart layout ─────────────────────────── */

/* ── Types for kundli result ───────────────────────────── */

interface KundliPlanet {
  longitude: number;
  rashi: number;
  rashiName: string;
  degree: number;
  isRetrograde: boolean;
  dignity: string;
}

interface KundliHouse {
  number: number;
  rashi: number;
  planets: string[];
}

interface KundliDasha {
  birthNakshatra: string;
  dashaBalance?: string;
  currentMahadasha: { planet: string; endTime: Date | string };
  currentAntardasha: { planet: string; endTime: Date | string } | null;
  fullCycle: Array<{
    planet: string;
    startTime: Date | string;
    endTime: Date | string;
  }>;
}

interface KundliResult {
  ascendant: {
    rashi: number;
    rashiName: string;
    longitude: number;
    nakshatra: string;
    pada: number;
  };
  planets: Record<string, KundliPlanet>;
  houses: KundliHouse[];
  dasha: KundliDasha;
}

/* ── House category helpers ────────────────────────────── */

const KENDRA_HOUSES = new Set([1, 4, 7, 10]);
const TRIKONA_HOUSES = new Set([1, 5, 9]);
const DUSTHANA_HOUSES = new Set([6, 8, 12]);

function getHouseCategoryBadge(num: number): { label: string; className: string; icon: typeof Home } {
  if (KENDRA_HOUSES.has(num) && TRIKONA_HOUSES.has(num)) {
    return {
      label: "Kendra + Trikona",
      className: "bg-accent/15 text-amber-700 border-accent/30",
      icon: Sparkles,
    };
  }
  if (KENDRA_HOUSES.has(num)) {
    return {
      label: "Kendra",
      className: "bg-primary/10 text-primary border-primary/20",
      icon: Home,
    };
  }
  if (TRIKONA_HOUSES.has(num)) {
    return {
      label: "Trikona",
      className: "bg-green-50 text-green-700 border-green-200",
      icon: Star,
    };
  }
  if (DUSTHANA_HOUSES.has(num)) {
    return {
      label: "Dusthana",
      className: "bg-red-50 text-red-700 border-red-200",
      icon: AlertTriangle,
    };
  }
  return {
    label: "Upachaya",
    className: "bg-blue-50 text-blue-700 border-blue-200",
    icon: TrendingUp,
  };
}

function getPlanetNatureBadge(nature: string): string {
  const n = nature.toLowerCase();
  if (n.includes("malefic") && n.includes("benefic")) {
    return "bg-amber-50 text-amber-700 border-amber-200";
  }
  if (n.includes("malefic")) return "bg-red-50 text-red-700 border-red-200";
  if (n.includes("benefic")) return "bg-green-50 text-green-700 border-green-200";
  return "bg-gray-50 text-gray-700 border-gray-200";
}

/* ── Remedy type icon helper ───────────────────────────── */

function getRemedyIcon(type: string): typeof Gem {
  const t = type.toLowerCase();
  if (t.includes("gem")) return Gem;
  if (t.includes("mantra")) return Sparkles;
  if (t.includes("don")) return Heart;
  if (t.includes("fast")) return Flame;
  if (t.includes("yantra")) return Shield;
  if (t.includes("ritual") || t.includes("puja")) return Star;
  return Info;
}

/* ─────────────────────────────────────────────────────────
   Module-scope sub-components
   ───────────────────────────────────────────────────────── */

interface SignTileProps {
  label: string;
  icon: typeof Sun;
  rashi: RashiInfo | undefined;
  rashiIdx: number;
}

function SignTile({ label, icon: Icon, rashi, rashiIdx }: SignTileProps) {
  const englishName = rashi?.name ?? rashiNames[rashiIdx] ?? "—";
  const hindiName = rashi?.hindi ?? "";
  const symbol = rashi?.symbol ?? "";
  const element = rashi?.element ?? "";
  const quality = rashi?.quality ?? "";

  return (
    <div className="relative rounded-2xl bg-white/10 backdrop-blur-sm border border-white/15 p-5 text-center overflow-hidden">
      <div className="absolute top-0 right-0 w-20 h-20 bg-white/5 rounded-full blur-2xl" />
      <div className="relative z-10">
        <div className="flex items-center justify-center gap-1.5 mb-3">
          <Icon className="h-3.5 w-3.5 text-accent" />
          <p className="text-[10px] font-bold uppercase tracking-widest text-white/60">
            {label}
          </p>
        </div>
        {symbol && (
          <div className="text-3xl mb-1" aria-hidden>
            {symbol}
          </div>
        )}
        <p className="text-xl font-bold font-heading text-white leading-tight">
          {englishName}
        </p>
        {hindiName && (
          <p className="text-sm text-accent mt-1 font-medium">{hindiName}</p>
        )}
        {(element || quality) && (
          <div className="flex flex-wrap items-center justify-center gap-1.5 mt-3">
            {element && (
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-white/10 text-white/80">
                {element}
              </span>
            )}
            {quality && (
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-white/10 text-white/80">
                {quality}
              </span>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

interface Chip {
  label: string;
  tone?: "green" | "red" | "blue" | "gray" | "primary" | "accent";
}

function ChipList({ items, tone = "gray" }: { items: string[]; tone?: Chip["tone"] }) {
  const toneClass: Record<NonNullable<Chip["tone"]>, string> = {
    green: "bg-green-50 text-green-700 border-green-100",
    red: "bg-red-50 text-red-700 border-red-100",
    blue: "bg-blue-50 text-blue-700 border-blue-100",
    gray: "bg-gray-50 text-gray-700 border-gray-100",
    primary: "bg-primary/10 text-primary border-primary/20",
    accent: "bg-accent/15 text-amber-700 border-accent/30",
  };

  return (
    <div className="flex flex-wrap gap-1.5">
      {items.map((item) => (
        <span
          key={item}
          className={cn(
            "text-[11px] px-2.5 py-1 rounded-full border font-medium",
            toneClass[tone ?? "gray"]
          )}
        >
          {item}
        </span>
      ))}
    </div>
  );
}

interface AscendantCardProps {
  traits: AscendantTraits | undefined;
  rashiName: string;
  hindiName: string;
  t: TFn;
}

function AscendantCard({ traits, rashiName, hindiName, t }: AscendantCardProps) {
  if (!traits) {
    return (
      <Card className="border-gray-100 shadow-sm">
        <CardContent>
          <div className="flex items-center gap-2 mb-3">
            <Info className="h-4 w-4 text-primary" />
            <h3 className="text-base font-bold font-heading text-gray-900">
              {t("ascendantPersonalityTitle")}
            </h3>
          </div>
          <p className="text-sm text-gray-500">
            {t("ascendantPersonalityFallback")}
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-gray-100 shadow-sm overflow-hidden">
      <CardContent className="space-y-5">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
            <Brain className="h-5 w-5 text-primary" />
          </div>
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-secondary mb-1">
              {t("ascendantPersonalityEyebrow")} — {rashiName}
              {hindiName && (
                <span className="text-accent ml-1.5">({hindiName})</span>
              )}
            </p>
            <p className="text-sm md:text-base text-gray-700 leading-relaxed">
              {traits.description}
            </p>
          </div>
        </div>

        {traits.strengths && traits.strengths.length > 0 && (
          <div>
            <div className="flex items-center gap-1.5 mb-2">
              <CheckCircle2 className="h-3.5 w-3.5 text-green-600" />
              <p className="text-[11px] font-bold uppercase tracking-widest text-gray-500">
                {t("labelStrengths")}
              </p>
            </div>
            <ChipList items={traits.strengths} tone="green" />
          </div>
        )}

        {traits.weaknesses && traits.weaknesses.length > 0 && (
          <div>
            <div className="flex items-center gap-1.5 mb-2">
              <XCircle className="h-3.5 w-3.5 text-red-600" />
              <p className="text-[11px] font-bold uppercase tracking-widest text-gray-500">
                {t("labelWeaknesses")}
              </p>
            </div>
            <ChipList items={traits.weaknesses} tone="red" />
          </div>
        )}

        {traits.career && traits.career.length > 0 && (
          <div>
            <div className="flex items-center gap-1.5 mb-2">
              <Briefcase className="h-3.5 w-3.5 text-blue-600" />
              <p className="text-[11px] font-bold uppercase tracking-widest text-gray-500">
                {t("labelSuitedCareers")}
              </p>
            </div>
            <ChipList items={traits.career} tone="blue" />
          </div>
        )}
      </CardContent>
    </Card>
  );
}

interface NakshatraSummaryCardProps {
  nakshatraName: string;
  t: TFn;
}

function NakshatraSummaryCard({ nakshatraName, t }: NakshatraSummaryCardProps) {
  const info = getNakshatraInfo(nakshatraName);

  return (
    <Card className="border-gray-100 shadow-sm">
      <CardContent>
        <div className="flex items-center gap-2 mb-3">
          <Star className="h-4 w-4 text-accent" />
          <p className="text-[11px] font-bold uppercase tracking-widest text-gray-500">
            {t("birthNakshatra")}
          </p>
        </div>
        <p className="text-xl font-bold font-heading text-primary mb-0.5">
          {info?.name ?? nakshatraName}
        </p>
        {info?.hindi && (
          <p className="text-sm text-accent mb-3">{info.hindi}</p>
        )}
        {info ? (
          <div className="space-y-1.5 text-xs text-gray-600">
            {info.deity && (
              <div className="flex items-center justify-between">
                <span className="text-gray-400">{t("nakshatraDeity")}</span>
                <span className="font-medium text-gray-800">{info.deity}</span>
              </div>
            )}
            {info.symbol && (
              <div className="flex items-center justify-between">
                <span className="text-gray-400">{t("nakshatraSymbol")}</span>
                <span className="font-medium text-gray-800">{info.symbol}</span>
              </div>
            )}
            {info.gana && (
              <div className="flex items-center justify-between">
                <span className="text-gray-400">{t("nakshatraGana")}</span>
                <span className="font-medium text-gray-800">{info.gana}</span>
              </div>
            )}
          </div>
        ) : (
          <p className="text-xs text-gray-400">
            {t("nakshatraSummaryFallback")}
          </p>
        )}
      </CardContent>
    </Card>
  );
}

interface MahadashaSummaryCardProps {
  planet: string;
  t: TFn;
}

function MahadashaSummaryCard({ planet, t }: MahadashaSummaryCardProps) {
  const effects: MahadashaEffects | undefined = MAHADASHA[planet];
  const hindi = PLANET_HINDI[planet as PlanetKey] ?? "";

  return (
    <Card className="border-gray-100 shadow-sm">
      <CardContent>
        <div className="flex items-center gap-2 mb-3">
          <Clock className="h-4 w-4 text-secondary" />
          <p className="text-[11px] font-bold uppercase tracking-widest text-gray-500">
            {t("currentMahadasha")}
          </p>
        </div>
        <p className="text-2xl font-bold font-heading text-gray-900">
          {planet}
          {hindi && <span className="text-accent ml-2 text-lg">{hindi}</span>}
        </p>
        {effects?.years !== undefined ? (
          <p className="text-xs text-gray-500 mt-1">
            {t("focusPeriodLabel")}: {effects.years} {t("yearsUnit")}
          </p>
        ) : null}
        {effects?.description && (
          <p className="text-xs text-gray-600 mt-3 leading-relaxed line-clamp-3">
            {effects.description}
          </p>
        )}
      </CardContent>
    </Card>
  );
}

interface DashaTimelineTableProps {
  fullCycle: KundliDasha["fullCycle"];
  currentPlanet: string;
  lang: Lang;
  t: TFn;
}

function DashaTimelineTable({
  fullCycle,
  currentPlanet,
  lang,
  t,
}: DashaTimelineTableProps) {
  const now = Date.now();
  const locale = lang === "hi" ? "hi-IN" : "en-IN";
  const units: DashaDurationUnits = {
    year: t("unitYearsShort"),
    month: t("unitMonthsShort"),
    lessThanMonth: t("unitLessThanMonth"),
    spaced: lang === "hi",
  };
  const toMs = (v: Date | string) =>
    (v instanceof Date ? v : new Date(v)).getTime();

  return (
    <div className="overflow-x-auto rounded-xl border border-gray-100">
      <table className="w-full min-w-130 text-left text-sm">
        <thead>
          <tr className="bg-gray-50/80">
            <th className="px-4 py-2.5 text-[11px] font-bold uppercase tracking-widest text-gray-400">
              {t("dashaColPlanet")}
            </th>
            <th className="px-4 py-2.5 text-[11px] font-bold uppercase tracking-widest text-gray-400">
              {t("dashaColStart")}
            </th>
            <th className="px-4 py-2.5 text-[11px] font-bold uppercase tracking-widest text-gray-400">
              {t("dashaColEnd")}
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {fullCycle.map((entry, i) => {
            const startMs = toMs(entry.startTime);
            const endMs = toMs(entry.endTime);
            const isCurrent = entry.planet === currentPlanet;
            const isPast = !isCurrent && Number.isFinite(endMs) && endMs < now;
            const abbr = PLANET_ABBR[entry.planet as PlanetKey] ?? "";
            const abbrCls =
              PLANET_ABBR_COLOR[abbr] ?? "text-gray-600 bg-gray-50";
            const planetName =
              lang === "hi"
                ? PLANET_HINDI[entry.planet as PlanetKey] ?? entry.planet
                : entry.planet;
            const nameCls = isCurrent
              ? "text-primary"
              : isPast
                ? "text-gray-400"
                : "text-gray-900";

            return (
              <tr
                key={`${entry.planet}-${i}`}
                className={cn(isCurrent && "bg-primary/5")}
              >
                <td className="px-4 py-3 align-top">
                  <div className="flex items-start gap-2.5">
                    <span
                      className={cn(
                        "mt-0.5 inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-lg text-[11px] font-bold",
                        abbrCls,
                        isPast && "opacity-50"
                      )}
                    >
                      {abbr || entry.planet.slice(0, 2)}
                    </span>
                    <div>
                      <div className="flex flex-wrap items-center gap-1.5">
                        <span className={cn("font-bold", nameCls)}>
                          {planetName}
                        </span>
                        {isCurrent && (
                          <span className="rounded-full bg-primary px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-white">
                            {t("dashaCurrentBadge")}
                          </span>
                        )}
                      </div>
                      <p
                        className={cn(
                          "mt-0.5 text-[11px]",
                          isPast ? "text-gray-400" : "text-gray-500"
                        )}
                      >
                        {formatDashaDuration(endMs - startMs, units)}
                      </p>
                      {isCurrent && (
                        <div className="mt-1.5 flex flex-wrap gap-x-4 gap-y-0.5 text-[11px] text-gray-500">
                          <span>
                            {t("dashaTotalLabel")}:{" "}
                            <span className="font-bold text-gray-900">
                              {formatDashaDuration(endMs - startMs, units)}
                            </span>
                          </span>
                          <span>
                            {t("dashaRemainingLabel")}:{" "}
                            <span className="font-bold text-primary">
                              {formatDashaDuration(
                                Math.max(0, endMs - now),
                                units
                              )}
                            </span>
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </td>
                <td
                  className={cn(
                    "whitespace-nowrap px-4 py-3 align-top text-xs",
                    isPast ? "text-gray-400" : "text-gray-600"
                  )}
                >
                  {formatDashaDate(entry.startTime, locale)}
                </td>
                <td
                  className={cn(
                    "whitespace-nowrap px-4 py-3 align-top text-xs",
                    isPast ? "text-gray-400" : "text-gray-600"
                  )}
                >
                  {formatDashaDate(entry.endTime, locale)}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

interface DoshaSummaryCardProps {
  mangal: DoshaResult;
  sadeSati: DoshaResult;
  kaalSarp: DoshaResult;
  t: TFn;
}

function DoshaSummaryCard({
  mangal,
  sadeSati,
  kaalSarp,
  t,
}: DoshaSummaryCardProps) {
  const rows: Array<{ name: string; active: boolean }> = [
    { name: t("doshaManglik"), active: mangal.active },
    { name: t("doshaSadeSati"), active: sadeSati.active },
    { name: t("doshaKaalSarp"), active: kaalSarp.active },
  ];

  return (
    <Card className="border-gray-100 shadow-sm">
      <CardContent>
        <div className="flex items-center gap-2 mb-3">
          <Shield className="h-4 w-4 text-primary" />
          <p className="text-[11px] font-bold uppercase tracking-widest text-gray-500">
            {t("doshaSummary")}
          </p>
        </div>
        <div className="space-y-2">
          {rows.map((r) => (
            <div key={r.name} className="flex items-center justify-between">
              <span className="text-sm text-gray-700">{r.name}</span>
              <span
                className={cn(
                  "text-[11px] font-bold px-2.5 py-1 rounded-full border",
                  r.active
                    ? "bg-red-50 text-red-700 border-red-200"
                    : "bg-green-50 text-green-700 border-green-200"
                )}
              >
                {r.active ? t("statusActive") : t("statusNone")}
              </span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

interface ChartInsightsCardProps {
  conjunctions: Array<{ rashi: number; planets: string[] }>;
  dignifiedPlanets: Array<{ planet: string; dignity: string }>;
  t: TFn;
}

function ChartInsightsCard({
  conjunctions,
  dignifiedPlanets,
  t,
}: ChartInsightsCardProps) {
  return (
    <Card className="border-gray-100 shadow-sm">
      <CardContent className="space-y-5">
        <div className="flex items-center gap-2">
          <TrendingUp className="h-4 w-4 text-secondary" />
          <h3 className="text-base font-bold font-heading text-gray-900">
            {t("chartInsights")}
          </h3>
        </div>

        <div>
          <p className="text-[11px] font-bold uppercase tracking-widest text-gray-500 mb-2">
            {t("planetaryConjunctions")}
          </p>
          {conjunctions.length > 0 ? (
            <div className="space-y-2">
              {conjunctions.map((c) => (
                <div
                  key={c.rashi}
                  className="flex items-center gap-2 p-2 rounded-lg bg-primary/[0.03] border border-primary/10"
                >
                  <span className="text-xs font-bold text-primary min-w-[80px]">
                    {rashiNames[c.rashi] ?? `Rashi ${c.rashi}`}
                  </span>
                  <div className="flex flex-wrap gap-1">
                    {c.planets.map((p) => (
                      <span
                        key={p}
                        className={cn(
                          "text-[10px] font-bold px-1.5 py-0.5 rounded",
                          PLANET_ABBR_COLOR[
                            PLANET_ABBR[p as PlanetKey] ?? ""
                          ] ?? "text-gray-600 bg-gray-100"
                        )}
                      >
                        {p}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-xs text-gray-400">
              {t("noConjunctions")}
            </p>
          )}
        </div>

        <div>
          <p className="text-[11px] font-bold uppercase tracking-widest text-gray-500 mb-2">
            {t("dignifiedPlacements")}
          </p>
          {dignifiedPlanets.length > 0 ? (
            <div className="flex flex-wrap gap-1.5">
              {dignifiedPlanets.map((p) => (
                <span
                  key={p.planet}
                  className={cn(
                    "text-[11px] px-2.5 py-1 rounded-full border font-medium",
                    p.dignity === "Exalted"
                      ? "bg-green-50 text-green-700 border-green-200"
                      : p.dignity === "Own Sign"
                        ? "bg-blue-50 text-blue-700 border-blue-200"
                        : "bg-purple-50 text-purple-700 border-purple-200"
                  )}
                >
                  {p.planet} — {p.dignity}
                </span>
              ))}
            </div>
          ) : (
            <p className="text-xs text-gray-400">
              {t("noDignifiedPlacements")}
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

interface PlanetCardProps {
  planetKey: string;
  info: PlanetInfo | undefined;
  rashiName: string;
  expanded: boolean;
  onToggle: (id: string) => void;
  t: TFn;
}

function PlanetCard({
  planetKey,
  info,
  rashiName,
  expanded,
  onToggle,
  t,
}: PlanetCardProps) {
  const hindi = PLANET_HINDI[planetKey as PlanetKey] ?? "";
  const abbr = PLANET_ABBR[planetKey as PlanetKey] ?? planetKey.slice(0, 2);
  const colorCls = PLANET_COLOR_CLASS[planetKey as PlanetKey] ?? "text-gray-700 bg-gray-50 border-gray-100";

  return (
    <button
      type="button"
      onClick={() => onToggle(planetKey)}
      aria-expanded={expanded}
      className={cn(
        "text-left w-full rounded-2xl border bg-white p-4 transition-all hover:shadow-md",
        expanded ? "border-primary/40 shadow-md" : "border-gray-100"
      )}
    >
      <div className="flex items-start gap-3">
        <div
          className={cn(
            "w-10 h-10 rounded-xl border flex items-center justify-center shrink-0 font-bold text-sm",
            colorCls
          )}
        >
          {abbr}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-2">
            <div className="min-w-0">
              <p className="font-bold text-gray-900 truncate">
                {planetKey}
                {hindi && (
                  <span className="text-accent ml-1.5 font-medium text-sm">
                    {hindi}
                  </span>
                )}
              </p>
              {info?.karaka && (
                <p className="text-[11px] text-gray-500 truncate">
                  {t("karakaLabel")}: {info.karaka}
                </p>
              )}
            </div>
            {info?.nature && (
              <span
                className={cn(
                  "text-[10px] font-bold px-2 py-0.5 rounded-full border whitespace-nowrap",
                  getPlanetNatureBadge(info.nature)
                )}
              >
                {info.nature}
              </span>
            )}
          </div>
        </div>
      </div>

      <div className="mt-3 flex items-center gap-2">
        <span className="text-[10px] uppercase tracking-wider text-gray-400">
          {t("inLabel")}
        </span>
        <span className="text-[11px] font-medium px-2 py-0.5 rounded-full bg-primary/5 text-primary">
          {rashiName}
        </span>
      </div>

      {info?.significations && info.significations.length > 0 && (
        <div className="mt-3">
          <div className="flex flex-wrap gap-1">
            {info.significations.slice(0, expanded ? undefined : 4).map((s) => (
              <span
                key={s}
                className="text-[10px] px-2 py-0.5 rounded-full bg-gray-50 text-gray-600 border border-gray-100"
              >
                {s}
              </span>
            ))}
            {!expanded &&
              info.significations.length > 4 && (
                <span className="text-[10px] px-2 py-0.5 rounded-full text-primary">
                  +{info.significations.length - 4} {t("moreSuffix")}
                </span>
              )}
          </div>
        </div>
      )}

      {expanded && (
        <div className="mt-4 pt-4 border-t border-gray-100 space-y-2">
          {info?.mantra && (
            <div>
              <p className="text-[10px] uppercase tracking-wider text-gray-400 mb-1">
                {t("mantraLabel")}
              </p>
              <p className="text-xs text-gray-700 font-medium leading-relaxed">
                {info.mantra}
              </p>
            </div>
          )}
          {info?.gemstone && (
            <div className="flex items-center gap-1.5">
              <Gem className="h-3 w-3 text-accent" />
              <p className="text-xs">
                <span className="text-gray-400">{t("gemstoneLabel")}:</span>{" "}
                <span className="font-medium text-gray-800">{info.gemstone}</span>
              </p>
            </div>
          )}
          {info?.day && (
            <p className="text-xs text-gray-600">
              <span className="text-gray-400">{t("dayLabel")}:</span> {info.day}
            </p>
          )}
        </div>
      )}
    </button>
  );
}

interface HouseCardProps {
  num: number;
  info: HouseInfo | undefined;
  rashiIdx: number | undefined;
  planets: string[];
  t: TFn;
}

function HouseCard({ num, info, rashiIdx, planets, t }: HouseCardProps) {
  const badge = getHouseCategoryBadge(num);
  const BadgeIcon = badge.icon;

  return (
    <div className="rounded-2xl border border-gray-100 bg-white p-4 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between gap-2 mb-2">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
            <span className="text-sm font-bold text-primary">{num}</span>
          </div>
          <div>
            <p className="text-sm font-bold text-gray-900 leading-tight">
              {info?.name ?? `${t("houseLabel")} ${num}`}
            </p>
            <p className="text-[11px] text-gray-500 leading-tight">
              {info?.nameEn ?? "—"}
            </p>
          </div>
        </div>
        <span
          className={cn(
            "inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full border whitespace-nowrap",
            badge.className
          )}
        >
          <BadgeIcon className="h-2.5 w-2.5" />
          {badge.label}
        </span>
      </div>

      {info?.significations && info.significations.length > 0 && (
        <div className="mt-2 mb-3">
          <div className="flex flex-wrap gap-1">
            {info.significations.slice(0, 4).map((s) => (
              <span
                key={s}
                className="text-[10px] px-1.5 py-0.5 rounded bg-gray-50 text-gray-600 border border-gray-100"
              >
                {s}
              </span>
            ))}
          </div>
        </div>
      )}

      <div className="flex items-center justify-between gap-2 pt-2 border-t border-gray-50">
        <div className="text-[11px]">
          <span className="text-gray-400">{t("rashiLabel")}: </span>
          <span className="font-medium text-gray-800">
            {rashiIdx !== undefined ? rashiNames[rashiIdx] ?? "—" : "—"}
          </span>
        </div>
        <div className="flex flex-wrap gap-1 justify-end">
          {planets.length > 0 ? (
            planets.map((p) => (
              <span
                key={p}
                className={cn(
                  "text-[10px] font-bold px-1.5 py-0.5 rounded",
                  PLANET_ABBR_COLOR[p] ?? "text-gray-600 bg-gray-100"
                )}
              >
                {p}
              </span>
            ))
          ) : (
            <span className="text-[10px] text-gray-300">{t("houseEmpty")}</span>
          )}
        </div>
      </div>
    </div>
  );
}

interface DoshaCardProps {
  title: string;
  result: DoshaResult;
  icon: typeof Shield;
  t: TFn;
}

function DoshaCard({ title, result, icon: Icon, t }: DoshaCardProps) {
  return (
    <Card
      className={cn(
        "border shadow-sm overflow-hidden",
        result.active ? "border-red-200" : "border-green-200"
      )}
    >
      <CardContent className="space-y-4">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <div
              className={cn(
                "w-10 h-10 rounded-xl flex items-center justify-center shrink-0",
                result.active ? "bg-red-50" : "bg-green-50"
              )}
            >
              <Icon
                className={cn(
                  "h-5 w-5",
                  result.active ? "text-red-600" : "text-green-600"
                )}
              />
            </div>
            <div>
              <h3 className="text-base font-bold font-heading text-gray-900">
                {title}
              </h3>
              {result.active && result.severity && (
                <p className="text-[11px] text-gray-500">
                  {t("severityLabel")}: {result.severity}
                </p>
              )}
            </div>
          </div>
          <span
            className={cn(
              "text-[11px] font-bold px-2.5 py-1 rounded-full border whitespace-nowrap",
              result.active
                ? "bg-red-50 text-red-700 border-red-200"
                : "bg-green-50 text-green-700 border-green-200"
            )}
          >
            {result.active ? t("statusActiveDosha") : t("statusInactiveDosha")}
          </span>
        </div>

        {result.description && (
          <p className="text-sm text-gray-700 leading-relaxed">
            {result.description}
          </p>
        )}

        {result.explanation && (
          <div className="p-3 rounded-xl bg-gray-50/70 border border-gray-100">
            <p className="text-[11px] font-bold uppercase tracking-widest text-gray-500 mb-1.5">
              {t("doshaWhyLabel")}
            </p>
            <p className="text-sm text-gray-700 leading-relaxed">
              {result.explanation}
            </p>
          </div>
        )}

        {result.remedies && result.remedies.length > 0 && (
          <div>
            <p className="text-[11px] font-bold uppercase tracking-widest text-gray-500 mb-2">
              {t("doshaRemediesLabel")}
            </p>
            <ul className="space-y-1.5">
              {result.remedies.map((r, idx) => (
                <li
                  key={`${title}-remedy-${idx}`}
                  className="flex items-start gap-2 text-sm text-gray-700"
                >
                  <Sparkles className="h-3.5 w-3.5 text-accent mt-0.5 shrink-0" />
                  <span>{r}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

interface RemediesByTypeSectionProps {
  remedies: Remedy[];
  mahadashaPlanet: string;
  t: TFn;
}

function RemediesByTypeSection({
  remedies,
  mahadashaPlanet,
  t,
}: RemediesByTypeSectionProps) {
  const grouped = useMemo(() => {
    const map = new Map<string, Remedy[]>();
    remedies.forEach((r) => {
      const key = r.type || "Other";
      const existing = map.get(key) ?? [];
      existing.push(r);
      map.set(key, existing);
    });
    return Array.from(map.entries());
  }, [remedies]);

  if (remedies.length === 0) {
    return (
      <Card className="border-gray-100 shadow-sm">
        <CardContent>
          <p className="text-sm text-gray-500">
            {t("remediesNoneFound")}{" "}
            <span className="font-medium text-gray-800">
              {mahadashaPlanet}
            </span>
            {t("remediesConsultPrompt")}
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="grid sm:grid-cols-2 gap-4">
      {grouped.map(([type, items]) => {
        const Icon = getRemedyIcon(type);
        return (
          <Card key={type} className="border-gray-100 shadow-sm">
            <CardContent>
              <div className="flex items-center gap-2 mb-3">
                <div className="w-8 h-8 rounded-lg bg-accent/10 flex items-center justify-center">
                  <Icon className="h-4 w-4 text-accent" />
                </div>
                <h4 className="text-base font-bold font-heading text-gray-900">
                  {type}
                </h4>
              </div>
              <ul className="space-y-2.5">
                {items.map((r, idx) => (
                  <li
                    key={`${type}-${idx}`}
                    className="pl-3 border-l-2 border-accent/30"
                  >
                    <p className="text-sm font-medium text-gray-800">
                      {r.title}
                    </p>
                    {r.description && (
                      <p className="text-xs text-gray-600 mt-0.5 leading-relaxed">
                        {r.description}
                      </p>
                    )}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}

interface NakshatraDetailSectionProps {
  nakshatraName: string;
  t: TFn;
}

function NakshatraDetailSection({
  nakshatraName,
  t,
}: NakshatraDetailSectionProps) {
  const info = getNakshatraInfo(nakshatraName);

  if (!info) {
    return (
      <Card className="border-gray-100 shadow-sm">
        <CardContent>
          <div className="flex items-center gap-2 mb-2">
            <Star className="h-4 w-4 text-accent" />
            <h3 className="text-base font-bold font-heading text-gray-900">
              {nakshatraName}
            </h3>
          </div>
          <p className="text-sm text-gray-500">
            {t("nakshatraDetailMissing")}
          </p>
        </CardContent>
      </Card>
    );
  }

  const topTiles: Array<{ label: string; value: string | undefined }> = [
    { label: t("nakshatraTileDeity"), value: info.deity },
    { label: t("nakshatraTileSymbol"), value: info.symbol },
    { label: t("nakshatraTileRuler"), value: info.ruler },
    { label: t("nakshatraTileGana"), value: info.gana },
  ];

  const bottomTiles: Array<{ label: string; value: string | undefined }> = [
    { label: t("nakshatraTileNadi"), value: info.nadi },
    { label: t("nakshatraTileYoni"), value: info.yoni },
    { label: t("nakshatraTileVarna"), value: info.varna },
    { label: t("nakshatraTileTatva"), value: info.tatva },
  ];

  return (
    <div className="space-y-5">
      <Card className="border-gray-100 shadow-sm overflow-hidden">
        <div className="relative bg-gradient-to-r from-primary to-primary/80 text-white p-6">
          <div className="absolute top-0 right-0 w-32 h-32 bg-accent/15 rounded-full blur-3xl" />
          <div className="relative z-10">
            <p className="text-[11px] font-bold uppercase tracking-widest text-white/60 mb-1">
              {t("birthNakshatra")}
            </p>
            <h3 className="text-3xl font-bold font-heading">
              {info.name}
            </h3>
            {info.hindi && (
              <p className="text-lg text-accent mt-1">{info.hindi}</p>
            )}
          </div>
        </div>
        <CardContent className="space-y-5 pt-5">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {topTiles.map((t) => (
              <div
                key={t.label}
                className="rounded-xl border border-gray-100 bg-gray-50/50 p-3 text-center"
              >
                <p className="text-[10px] uppercase tracking-widest text-gray-400 mb-1">
                  {t.label}
                </p>
                <p className="text-sm font-bold text-gray-800">
                  {t.value ?? "—"}
                </p>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {bottomTiles.map((t) => (
              <div
                key={t.label}
                className="rounded-xl border border-gray-100 bg-gray-50/50 p-3 text-center"
              >
                <p className="text-[10px] uppercase tracking-widest text-gray-400 mb-1">
                  {t.label}
                </p>
                <p className="text-sm font-bold text-gray-800">
                  {t.value ?? "—"}
                </p>
              </div>
            ))}
          </div>

          {info.description && (
            <div>
              <p className="text-[11px] font-bold uppercase tracking-widest text-gray-500 mb-2">
                {t("nakshatraAbout")}
              </p>
              <p className="text-sm text-gray-700 leading-relaxed">
                {info.description}
              </p>
            </div>
          )}

          {info.traits && info.traits.length > 0 && (
            <div>
              <p className="text-[11px] font-bold uppercase tracking-widest text-gray-500 mb-2">
                {t("nakshatraTraits")}
              </p>
              <ChipList items={info.traits} tone="primary" />
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────
   Page component
   ───────────────────────────────────────────────────────── */

export default function KundliPage() {
  const t = useT(kundliDict);
  const lang = useLang();
  const [dobDate, setDobDate] = useState<Date | undefined>(undefined);
  const [dobOpen, setDobOpen] = useState(false);
  const [dob, setDob] = useState("");
  const [tob, setTob] = useState("");
  const [place, setPlace] = useState("Gurugram");
  const [generated, setGenerated] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");
  const [expandedPlanet, setExpandedPlanet] = useState<string | null>(null);
  const [chartStyle, setChartStyle] = useState<ChartStyle>("north");
  const [vargaKey, setVargaKey] = useState<VargaKey>("D1");
  const [ascendantRef, setAscendantRef] = useState<AscendantReference>("lagna");

  // Location coordinates
  const [lat, setLat] = useState(28.4595);
  const [lon, setLon] = useState(77.0266);
  const elevation = 217;

  const kundli = useMemo<KundliResult | null>(() => {
    if (!generated || !dob || !tob) return null;

    try {
      const [year, month, day] = dob.split("-").map(Number);
      const [hour, minute] = tob.split(":").map(Number);

      const observer = new Observer(lat, lon, elevation);
      const result = getKundli(
        new Date(year, month - 1, day, hour, minute),
        observer,
        {}
      );
      return result as unknown as KundliResult;
    } catch {
      return null;
    }
  }, [generated, dob, tob, lat, lon]);

  /* True current maha/antar as of today (the library's "current" is as of birth) */
  const currentDasha = useMemo(() => deriveCurrentDasha(kundli?.dasha), [kundli]);
  const mahaNow = currentDasha?.maha ?? null;
  const antarNow = currentDasha?.antar ?? null;

  /* Map house number → planet abbreviations in that house */
  const housePlanets = useMemo(() => {
    if (!kundli) return {} as Record<number, string[]>;
    const map: Record<number, string[]> = {};
    for (let i = 1; i <= 12; i++) map[i] = [];

    if (kundli.houses) {
      kundli.houses.forEach((h) => {
        if (h.planets && h.planets.length > 0) {
          map[h.number] = h.planets.map(
            (p) => PLANET_ABBR[p as PlanetKey] ?? p
          );
        }
      });
    }

    return map;
  }, [kundli]);

  /* Map house number → rashi number */
  const houseRashi = useMemo(() => {
    if (!kundli) return {} as Record<number, number>;
    const map: Record<number, number> = {};
    if (kundli.houses) {
      kundli.houses.forEach((h) => {
        map[h.number] = h.rashi;
      });
    }
    return map;
  }, [kundli]);

  /* All 16 divisional (varga) charts D1..D60 keyed by VargaKey. */
  const vargaCharts = useMemo(() => {
    if (!kundli) return null;
    // The library type doesn't fully match — cast to its loose Kundli shape.
    return getAllVargaCharts(
      kundli as unknown as Parameters<typeof getAllVargaCharts>[0]
    );
  }, [kundli]);

  /* The chart actually being rendered: selected varga rotated by ascendant reference. */
  const activeChartData = useMemo(() => {
    if (!vargaCharts) return null;
    const base = vargaCharts[vargaKey];
    // base.moonRashi / sunRashi come from THIS varga (so D9 Chandra Lagna
    // uses the D9 Moon, not the D1 Moon). The fallbacks are a safety net
    // in case the library didn't supply a planet entry.
    return applyAscendantReference(
      base,
      ascendantRef,
      base.moonRashi,
      base.sunRashi
    );
  }, [vargaCharts, vargaKey, ascendantRef]);

  /* Resolve the currently selected varga option once for the chart header. */
  const currentVarga = useMemo(
    () => VARGA_OPTIONS.find((v) => v.key === vargaKey),
    [vargaKey]
  );

  /* Classical janma attributes (Rashi Paya, Tattva, Yoni, Gana, Nadi, ...). */
  const birthAttributes = useMemo(() => {
    if (!kundli) return null;
    const moonRashi =
      (kundli.planets?.Moon?.rashi as number | undefined) ??
      kundli.ascendant.rashi;
    return getBirthAttributes({
      moonRashi,
      nakshatraName: kundli.dasha.birthNakshatra,
    });
  }, [kundli]);

  /* Conjunctions (2+ planets in same rashi) and dignified placements */
  const chartAnalysis = useMemo(() => {
    if (!kundli) {
      return {
        conjunctions: [] as Array<{ rashi: number; planets: string[] }>,
        dignified: [] as Array<{ planet: string; dignity: string }>,
      };
    }

    const byRashi = new Map<number, string[]>();
    const dignified: Array<{ planet: string; dignity: string }> = [];

    PLANET_KEYS.forEach((key) => {
      const p = kundli.planets[key];
      if (!p) return;
      const list = byRashi.get(p.rashi) ?? [];
      list.push(key);
      byRashi.set(p.rashi, list);

      if (
        p.dignity === "Exalted" ||
        p.dignity === "Own Sign" ||
        p.dignity === "Mooltrikona"
      ) {
        dignified.push({ planet: key, dignity: p.dignity });
      }
    });

    const conjunctions: Array<{ rashi: number; planets: string[] }> = [];
    byRashi.forEach((planets, rashi) => {
      if (planets.length >= 2) conjunctions.push({ rashi, planets });
    });

    return { conjunctions, dignified };
  }, [kundli]);

  /* Dosha computations + today's Saturn rashi for Sade Sati */
  const doshas = useMemo(() => {
    if (!kundli) return null;

    const ascendantRashi = kundli.ascendant.rashi;
    const moonRashi = kundli.planets.Moon?.rashi ?? ascendantRashi;

    const planetRashis: Record<string, number> = {};
    PLANET_KEYS.forEach((key) => {
      const p = kundli.planets[key];
      if (p) planetRashis[key] = p.rashi;
    });

    // Today's Saturn rashi — doesn't meaningfully depend on observer for sidereal rashi
    let currentSaturnRashi = planetRashis.Saturn ?? 0;
    try {
      const todayObserver = new Observer(lat, lon, elevation);
      const today = getKundli(new Date(), todayObserver, {}) as unknown as KundliResult;
      currentSaturnRashi = today.planets.Saturn?.rashi ?? currentSaturnRashi;
    } catch {
      // keep fallback
    }

    const planetsForChart: Record<string, { rashi: number }> = {};
    Object.entries(planetRashis).forEach(([key, rashi]) => {
      planetsForChart[key] = { rashi };
    });
    const chartInput: ChartInput = {
      ascendantRashi,
      moonRashi,
      planets: planetsForChart,
    };

    return {
      mangal: checkMangalDosha(chartInput),
      sadeSati: checkSadeSati(moonRashi, currentSaturnRashi),
      kaalSarp: checkKaalSarpDosha(chartInput),
    };
  }, [kundli, lat, lon]);

  /* Personalized remedies based on current Mahadasha planet */
  const personalizedRemedies = useMemo(() => {
    const planet =
      currentDasha?.maha.planet ?? kundli?.dasha?.currentMahadasha?.planet;
    if (!planet) return [] as Remedy[];
    return getPlanetRemedies(planet);
  }, [currentDasha, kundli]);

  const handleGenerate = () => {
    if (dob && tob) {
      setGenerated(false);
      setActiveTab("overview");
      setExpandedPlanet(null);
      // Force re-trigger by toggling state
      setTimeout(() => setGenerated(true), 0);
    }
  };

  const handleReset = () => {
    setGenerated(false);
    setDob("");
    setDobDate(undefined);
    setTob("");
    setPlace("Gurugram");
    setLat(28.4595);
    setLon(77.0266);
    setActiveTab("overview");
    setExpandedPlanet(null);
  };

  const togglePlanet = (id: string) => {
    setExpandedPlanet((prev) => (prev === id ? null : id));
  };

  const ascendantKey = kundli?.ascendant.rashiName ?? "";
  const ascendantTraits: AscendantTraits | undefined =
    ASCENDANT_TRAITS[ascendantKey];
  const ascendantRashiInfo: RashiInfo | undefined = kundli
    ? RASHIS[kundli.ascendant.rashi]
    : undefined;

  const moonRashiInfo: RashiInfo | undefined = kundli
    ? RASHIS[kundli.planets.Moon?.rashi ?? 0]
    : undefined;
  const sunRashiInfo: RashiInfo | undefined = kundli
    ? RASHIS[kundli.planets.Sun?.rashi ?? 0]
    : undefined;

  const luckyAttributes = kundli
    ? getLuckyAttributes(kundli.planets.Moon?.rashi ?? 0)
    : null;

  return (
    <MainLayout>
      {/* ── Hero Section ──────────────────────────────── */}
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
              <Globe className="h-3.5 w-3.5 text-accent" />
              {t("heroBadge")}
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-heading mb-4 leading-tight">
              {t("heroTitle")}
            </h1>
            <p className="text-white/70 text-base md:text-lg max-w-lg mx-auto">
              {t("heroSubtitle")}
            </p>

            <div className="mt-7 flex flex-wrap items-center justify-center gap-3 text-xs md:text-sm">
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-sm">
                <CheckCircle2 className="h-3.5 w-3.5 text-accent" />
                {t("heroPill1")}
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-sm">
                <CheckCircle2 className="h-3.5 w-3.5 text-accent" />
                {t("heroPill2")}
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-sm">
                <CheckCircle2 className="h-3.5 w-3.5 text-accent" />
                {t("heroPill3")}
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-sm">
                <CheckCircle2 className="h-3.5 w-3.5 text-accent" />
                {t("heroPill4")}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ── Form Section ──────────────────────────────── */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-xl mx-auto">
            <div className="bg-white rounded-2xl border border-gray-100 shadow-lg p-6 md:p-8">
              <div className="text-center mb-6">
                <p className="text-xs font-bold uppercase tracking-widest text-secondary mb-2">
                  {t("formEyebrow")}
                </p>
                <h2 className="text-2xl md:text-3xl font-bold font-heading text-gray-900">
                  {t("formTitle")}
                </h2>
              </div>

              <div className="space-y-5">
                {/* Date of Birth — Calendar Picker */}
                <div className="space-y-2">
                  <Label className="text-sm font-medium text-gray-700 flex items-center gap-1.5">
                    <CalendarDays className="h-3.5 w-3.5 text-primary" />
                    {t("labelDob")}
                  </Label>
                  <Popover open={dobOpen} onOpenChange={setDobOpen}>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full justify-start text-left font-normal rounded-xl h-10",
                          !dobDate && "text-gray-400"
                        )}
                      >
                        <CalendarDays className="h-4 w-4 mr-2 text-primary" />
                        {dobDate
                          ? format(dobDate, "dd MMMM yyyy")
                          : t("placeholderDob")}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={dobDate}
                        onSelect={(date) => {
                          setDobDate(date);
                          if (date) {
                            const y = date.getFullYear();
                            const m = String(date.getMonth() + 1).padStart(2, "0");
                            const d = String(date.getDate()).padStart(2, "0");
                            setDob(`${y}-${m}-${d}`);
                            setDobOpen(false);
                          }
                        }}
                        defaultMonth={dobDate || new Date(2000, 0)}
                        captionLayout="dropdown"
                        fromYear={1930}
                        toYear={new Date().getFullYear()}
                        classNames={{
                          caption_label: "text-sm font-medium",
                          nav_button:
                            "h-7 w-7 bg-transparent p-0 text-gray-600 hover:text-primary",
                        }}
                      />
                    </PopoverContent>
                  </Popover>
                </div>

                {/* Time of Birth */}
                <div className="space-y-2">
                  <Label
                    htmlFor="tob"
                    className="text-sm font-medium text-gray-700 flex items-center gap-1.5"
                  >
                    <Clock className="h-3.5 w-3.5 text-primary" />
                    {t("labelTob")}
                  </Label>
                  <TimePicker12h
                    id="tob"
                    value={tob}
                    onChange={setTob}
                    placeholder={t("placeholderTob")}
                  />
                </div>

                {/* Place of Birth — with location search */}
                <div className="space-y-2">
                  <Label className="text-sm font-medium text-gray-700 flex items-center gap-1.5">
                    <MapPin className="h-3.5 w-3.5 text-primary" />
                    {t("labelPob")}
                  </Label>
                  <LocationSearch
                    defaultValue="Gurugram"
                    onSelect={(loc) => {
                      setPlace(loc.name);
                      setLat(loc.lat);
                      setLon(loc.lon);
                    }}
                  />
                  <p className="text-[11px] text-gray-400">
                    {place} — {lat.toFixed(4)}°N, {lon.toFixed(4)}°E
                  </p>
                </div>

                {/* Buttons */}
                <div className="flex gap-3 pt-2">
                  <Button
                    onClick={handleGenerate}
                    disabled={!dob || !tob}
                    className="flex-1 bg-primary hover:bg-primary/90 rounded-xl h-11 text-sm font-semibold"
                  >
                    <Sparkles className="h-4 w-4 mr-2" />
                    {t("generateBtn")}
                  </Button>
                  {generated && (
                    <Button
                      variant="outline"
                      onClick={handleReset}
                      className="rounded-xl h-11 border-primary/20 text-primary hover:bg-primary/5"
                    >
                      <RotateCcw className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Why Generate Here (shown until a kundli is generated) ── */}
      {!generated && (
        <section className="bg-linear-to-b from-white via-background to-white py-10 md:py-12 border-t border-gray-100">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <div className="text-center mb-8">
                <p className="text-xs font-bold uppercase tracking-widest text-secondary mb-2">
                  {t("whyEyebrow")}
                </p>
                <h2 className="text-2xl md:text-3xl font-bold font-heading text-gray-900">
                  {t("whyTitle")}
                </h2>
              </div>

              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                  {
                    icon: Globe,
                    title: t("whyCard1Title"),
                    desc: t("whyCard1Desc"),
                    accent: "text-primary",
                    bg: "bg-primary/10",
                  },
                  {
                    icon: Sparkles,
                    title: t("whyCard2Title"),
                    desc: t("whyCard2Desc"),
                    accent: "text-secondary",
                    bg: "bg-secondary/10",
                  },
                  {
                    icon: Shield,
                    title: t("whyCard3Title"),
                    desc: t("whyCard3Desc"),
                    accent: "text-rose-600",
                    bg: "bg-rose-50",
                  },
                  {
                    icon: Gem,
                    title: t("whyCard4Title"),
                    desc: t("whyCard4Desc"),
                    accent: "text-amber-600",
                    bg: "bg-amber-50",
                  },
                ].map((b) => (
                  <div
                    key={b.title}
                    className="group rounded-2xl border border-gray-100 bg-white p-4 md:p-5 transition-all duration-300 hover:border-primary/20 hover:shadow-md hover:-translate-y-0.5"
                  >
                    <div
                      className={cn(
                        "w-10 h-10 rounded-xl flex items-center justify-center mb-3 transition-transform duration-300 group-hover:scale-110",
                        b.bg,
                      )}
                    >
                      <b.icon className={cn("h-5 w-5", b.accent)} />
                    </div>
                    <h3 className="text-sm md:text-base font-bold font-heading text-gray-900 mb-1.5">
                      {b.title}
                    </h3>
                    <p className="text-xs md:text-sm text-gray-600 leading-relaxed">
                      {b.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ── Results Section ────────────────────────────── */}
      {generated && kundli && (
        <section className="pb-16">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto space-y-8">
              {/* Birth Details Summary Strip */}
              <div className="text-center">
                <p className="text-xs font-bold uppercase tracking-widest text-secondary mb-2">
                  {t("resultsEyebrow")}
                </p>
                <h2 className="text-2xl md:text-3xl font-bold font-heading text-gray-900 mb-1">
                  {t("resultsTitle")}
                </h2>
                <p className="text-sm text-gray-500">
                  {t("nativeLabel")} &middot; {formatDate(dob)} &middot;{" "}
                  {format12h(tob) || tob} &middot; {place}
                </p>
              </div>

              {/* 3 Signs Card */}
              <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-primary via-primary to-primary/90 text-white p-6 md:p-8">
                <div className="absolute top-0 right-0 w-52 h-52 bg-accent/15 rounded-full blur-3xl" />
                <div className="absolute bottom-0 left-0 w-40 h-40 bg-secondary/15 rounded-full blur-3xl" />

                <div className="relative z-10">
                  <div className="text-center mb-6">
                    <p className="text-[11px] font-bold uppercase tracking-widest text-white/60 mb-1">
                      {t("trinityEyebrow")}
                    </p>
                    <h3 className="text-xl md:text-2xl font-bold font-heading">
                      {t("trinityTitle")}
                    </h3>
                  </div>

                  <div className="grid sm:grid-cols-3 gap-4">
                    <SignTile
                      label={t("signLagna")}
                      icon={Sparkles}
                      rashi={ascendantRashiInfo}
                      rashiIdx={kundli.ascendant.rashi}
                    />
                    <SignTile
                      label={t("signChandra")}
                      icon={Moon}
                      rashi={moonRashiInfo}
                      rashiIdx={kundli.planets.Moon?.rashi ?? 0}
                    />
                    <SignTile
                      label={t("signSurya")}
                      icon={Sun}
                      rashi={sunRashiInfo}
                      rashiIdx={kundli.planets.Sun?.rashi ?? 0}
                    />
                  </div>
                </div>
              </div>

              {/* Tabs */}
              <Tabs
                value={activeTab}
                onValueChange={setActiveTab}
                className="w-full"
              >
                <div className="overflow-x-auto -mx-4 px-4 pb-1">
                  <TabsList className="inline-flex h-auto w-auto gap-1 rounded-xl bg-gray-100 p-1">
                    <TabsTrigger
                      value="overview"
                      className="rounded-lg px-3 py-1.5 text-sm"
                    >
                      <Info className="h-3.5 w-3.5" /> {t("tabOverview")}
                    </TabsTrigger>
                    <TabsTrigger
                      value="chart"
                      className="rounded-lg px-3 py-1.5 text-sm"
                    >
                      <Globe className="h-3.5 w-3.5" /> {t("tabChart")}
                    </TabsTrigger>
                    <TabsTrigger
                      value="planets"
                      className="rounded-lg px-3 py-1.5 text-sm"
                    >
                      <Sparkles className="h-3.5 w-3.5" /> {t("tabPlanets")}
                    </TabsTrigger>
                    <TabsTrigger
                      value="houses"
                      className="rounded-lg px-3 py-1.5 text-sm"
                    >
                      <Home className="h-3.5 w-3.5" /> {t("tabHouses")}
                    </TabsTrigger>
                    <TabsTrigger
                      value="nakshatra"
                      className="rounded-lg px-3 py-1.5 text-sm"
                    >
                      <Star className="h-3.5 w-3.5" /> {t("tabNakshatra")}
                    </TabsTrigger>
                    <TabsTrigger
                      value="dasha"
                      className="rounded-lg px-3 py-1.5 text-sm"
                    >
                      <Clock className="h-3.5 w-3.5" /> {t("tabDasha")}
                    </TabsTrigger>
                    <TabsTrigger
                      value="doshas"
                      className="rounded-lg px-3 py-1.5 text-sm"
                    >
                      <Shield className="h-3.5 w-3.5" /> {t("tabDoshas")}
                    </TabsTrigger>
                    <TabsTrigger
                      value="remedies"
                      className="rounded-lg px-3 py-1.5 text-sm"
                    >
                      <Gem className="h-3.5 w-3.5" /> {t("tabRemedies")}
                    </TabsTrigger>
                  </TabsList>
                </div>

                {/* ── Overview Tab ─────────────────────── */}
                <TabsContent value="overview" className="mt-6 space-y-5">
                  <AscendantCard
                    traits={ascendantTraits}
                    rashiName={kundli.ascendant.rashiName}
                    hindiName={ascendantRashiInfo?.hindi ?? ""}
                    t={t}
                  />

                  <div className="grid md:grid-cols-3 gap-4">
                    <NakshatraSummaryCard
                      nakshatraName={kundli.dasha.birthNakshatra}
                      t={t}
                    />
                    <MahadashaSummaryCard
                      planet={
                        mahaNow?.planet ?? kundli.dasha.currentMahadasha.planet
                      }
                      t={t}
                    />
                    {doshas && (
                      <DoshaSummaryCard
                        mangal={doshas.mangal}
                        sadeSati={doshas.sadeSati}
                        kaalSarp={doshas.kaalSarp}
                        t={t}
                      />
                    )}
                  </div>

                  {luckyAttributes && (
                    <LuckyAttributesCard attributes={luckyAttributes} />
                  )}

                  {kundli.planets.Moon?.rashi ? (
                    <CompatibilityTeaser
                      userMoonRashi={kundli.planets.Moon.rashi}
                    />
                  ) : null}
                </TabsContent>

                {/* ── Chart Tab ────────────────────────── */}
                <TabsContent value="chart" className="mt-6 space-y-5">
                  {/* Chart controls: style / varga / ascendant */}
                  <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 md:p-5">
                    <div className="flex flex-wrap items-end gap-4">
                      <div className="flex flex-col gap-1">
                        <span className="text-[11px] font-medium uppercase tracking-wide text-gray-500">
                          {t("controlStyle")}
                        </span>
                        <ChartStyleSwitcher
                          value={chartStyle}
                          onChange={setChartStyle}
                        />
                      </div>
                      <VargaSelector value={vargaKey} onChange={setVargaKey} />
                      <AscendantSwitcher
                        value={ascendantRef}
                        onChange={setAscendantRef}
                      />
                    </div>
                  </div>

                  {/* Chart card */}
                  <div className="bg-white rounded-2xl border border-gray-100 shadow-lg p-6 md:p-8">
                    <div className="flex flex-wrap items-center justify-between gap-2 mb-6">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                          <Globe className="h-4 w-4 text-primary" />
                        </div>
                        <h3 className="text-lg font-bold font-heading text-gray-900">
                          {vargaKey} — {currentVarga?.name ?? "Rashi"}
                        </h3>
                      </div>
                      <span className="text-[11px] text-gray-500">
                        {currentVarga?.description}
                      </span>
                    </div>

                    {activeChartData ? (
                      <>
                        {chartStyle === "north" && (
                          <NorthIndianChart
                            data={activeChartData}
                            labelLang={toLabelLang(lang)}
                          />
                        )}
                        {chartStyle === "south" && (
                          <SouthIndianChart
                            data={activeChartData}
                            labelLang={toLabelLang(lang)}
                          />
                        )}
                        {chartStyle === "east" && (
                          <EastIndianChart
                            data={activeChartData}
                            labelLang={toLabelLang(lang)}
                          />
                        )}
                        {chartStyle === "west" && (
                          <WestIndianChart
                            data={activeChartData}
                            labelLang={toLabelLang(lang)}
                          />
                        )}
                      </>
                    ) : (
                      <div className="py-12 text-center text-sm text-gray-500">
                        {t("chartUnavailable")}
                      </div>
                    )}

                    {/* Chart legend */}
                    <div className="mt-4 flex flex-wrap items-center justify-center gap-x-3 gap-y-1">
                      {PLANET_KEYS.map((key) => (
                        <span key={key} className="text-[10px] text-gray-500">
                          <span className="font-bold text-gray-700">
                            {PLANET_ABBR[key]}
                          </span>{" "}
                          {key}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Other classical janma attributes */}
                  {birthAttributes && (
                    <OtherDetailsPanel attributes={birthAttributes} />
                  )}

                  <ChartInsightsCard
                    conjunctions={chartAnalysis.conjunctions}
                    dignifiedPlanets={chartAnalysis.dignified}
                    t={t}
                  />
                </TabsContent>

                {/* ── Planets Tab ──────────────────────── */}
                <TabsContent value="planets" className="mt-6 space-y-5">
                  {/* Planets Table */}
                  <div className="bg-white rounded-2xl border border-gray-100 shadow-lg p-6 md:p-8">
                    <div className="flex items-center gap-2 mb-6">
                      <div className="w-8 h-8 rounded-lg bg-secondary/10 flex items-center justify-center">
                        <Sparkles className="h-4 w-4 text-secondary" />
                      </div>
                      <h3 className="text-lg font-bold font-heading text-gray-900">
                        {t("planetaryPositions")}
                      </h3>
                    </div>

                    <div className="overflow-x-auto -mx-6 px-6">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="border-b-2 border-primary/10">
                            <th className="text-left py-3 pr-3 text-xs font-bold uppercase tracking-wider text-gray-500">
                              {t("colPlanet")}
                            </th>
                            <th className="text-left py-3 px-3 text-xs font-bold uppercase tracking-wider text-gray-500">
                              {t("colRashi")}
                            </th>
                            <th className="text-right py-3 px-3 text-xs font-bold uppercase tracking-wider text-gray-500">
                              {t("colDegree")}
                            </th>
                            <th className="text-left py-3 px-3 text-xs font-bold uppercase tracking-wider text-gray-500">
                              {t("colNakshatra")}
                            </th>
                            <th className="text-center py-3 px-3 text-xs font-bold uppercase tracking-wider text-gray-500">
                              {t("colRetro")}
                            </th>
                            <th className="text-left py-3 pl-3 text-xs font-bold uppercase tracking-wider text-gray-500">
                              {t("colDignity")}
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {PLANET_KEYS.map((key) => {
                            const planet = kundli.planets[key];
                            if (!planet) return null;

                            return (
                              <tr
                                key={key}
                                className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors"
                              >
                                <td className="py-3 pr-3">
                                  <div className="flex items-center gap-2">
                                    <span className="font-bold text-gray-900">
                                      {PLANET_ABBR[key]}
                                    </span>
                                    <span className="text-gray-600">
                                      {key}
                                    </span>
                                    <span className="text-[10px] text-gray-400">
                                      {PLANET_HINDI[key]}
                                    </span>
                                  </div>
                                </td>
                                <td className="py-3 px-3">
                                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-primary/5 text-xs font-medium text-primary">
                                    {planet.rashiName}
                                  </span>
                                </td>
                                <td className="py-3 px-3 text-right font-mono text-xs text-gray-700">
                                  {planet.degree.toFixed(2)}°
                                </td>
                                <td className="py-3 px-3 text-xs text-gray-700">
                                  {getNakshatraFromDegree(planet.longitude)}
                                </td>
                                <td className="py-3 px-3 text-center">
                                  {planet.isRetrograde ? (
                                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-red-50 text-[10px] font-bold text-red-600">
                                      <RotateCcw className="h-2.5 w-2.5" />R
                                    </span>
                                  ) : (
                                    <span className="text-gray-300 text-xs">
                                      —
                                    </span>
                                  )}
                                </td>
                                <td className="py-3 pl-3">
                                  <span
                                    className={cn(
                                      "text-xs font-medium px-2 py-0.5 rounded-full",
                                      planet.dignity === "Exalted"
                                        ? "bg-green-50 text-green-700"
                                        : planet.dignity === "Own Sign"
                                          ? "bg-blue-50 text-blue-700"
                                          : planet.dignity === "Debilitated"
                                            ? "bg-red-50 text-red-700"
                                            : planet.dignity === "Mooltrikona"
                                              ? "bg-purple-50 text-purple-700"
                                              : "bg-gray-50 text-gray-600"
                                    )}
                                  >
                                    {planet.dignity || t("dignityNeutral")}
                                  </span>
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  </div>

                  {/* Planet significations grid */}
                  <div>
                    <div className="flex items-center gap-2 mb-4">
                      <div className="w-8 h-8 rounded-lg bg-accent/10 flex items-center justify-center">
                        <Info className="h-4 w-4 text-accent" />
                      </div>
                      <h3 className="text-lg font-bold font-heading text-gray-900">
                        {t("planetSignifications")}
                      </h3>
                      <span className="text-xs text-gray-400">
                        {t("planetSignificationsHint")}
                      </span>
                    </div>
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                      {PLANET_KEYS.map((key) => (
                        <PlanetCard
                          key={key}
                          planetKey={key}
                          info={PLANETS[key]}
                          rashiName={kundli.planets[key]?.rashiName ?? "—"}
                          expanded={expandedPlanet === key}
                          onToggle={togglePlanet}
                          t={t}
                        />
                      ))}
                    </div>
                  </div>
                </TabsContent>

                {/* ── Houses Tab ───────────────────────── */}
                <TabsContent value="houses" className="mt-6">
                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {Array.from({ length: 12 }, (_, i) => i + 1).map((num) => (
                      <HouseCard
                        key={num}
                        num={num}
                        info={HOUSES[num]}
                        rashiIdx={houseRashi[num]}
                        planets={housePlanets[num] ?? []}
                        t={t}
                      />
                    ))}
                  </div>
                </TabsContent>

                {/* ── Nakshatra Tab ────────────────────── */}
                <TabsContent value="nakshatra" className="mt-6">
                  <NakshatraDetailSection
                    nakshatraName={kundli.dasha.birthNakshatra}
                    t={t}
                  />
                </TabsContent>

                {/* ── Dasha Tab ────────────────────────── */}
                <TabsContent value="dasha" className="mt-6 space-y-5">
                  {kundli.dasha && (
                    <div className="bg-white rounded-2xl border border-gray-100 shadow-lg p-6 md:p-8">
                      <div className="flex items-center gap-2 mb-6">
                        <div className="w-8 h-8 rounded-lg bg-accent/10 flex items-center justify-center">
                          <Clock className="h-4 w-4 text-accent" />
                        </div>
                        <h3 className="text-lg font-bold font-heading text-gray-900">
                          {t("vimshottariDasha")}
                        </h3>
                      </div>

                      {/* Birth Nakshatra */}
                      <div className="mb-6 p-4 rounded-xl bg-primary/[0.03] border border-primary/10">
                        <p className="text-xs text-gray-500 mb-1">
                          {t("birthNakshatra")}
                        </p>
                        <p className="text-lg font-bold font-heading text-primary">
                          {kundli.dasha.birthNakshatra}
                        </p>
                      </div>

                      <div className="grid sm:grid-cols-2 gap-4">
                        {/* Current Mahadasha */}
                        <div className="p-5 rounded-xl border border-gray-100 bg-gray-50/50">
                          <p className="text-xs font-bold uppercase tracking-widest text-secondary mb-3">
                            {t("currentMahadasha")}
                          </p>
                          <p className="text-2xl font-bold font-heading text-gray-900 mb-1">
                            {mahaNow?.planet ??
                              kundli.dasha.currentMahadasha.planet}
                          </p>
                          <p className="text-xs text-gray-500">
                            {PLANET_HINDI[
                              (mahaNow?.planet ??
                                kundli.dasha.currentMahadasha
                                  .planet) as PlanetKey
                            ] ?? ""}
                          </p>
                          <div className="mt-3 space-y-1 text-xs text-gray-500">
                            {mahaNow && (
                              <div className="flex items-center gap-1.5">
                                <CalendarDays className="h-3 w-3" />
                                {t("dashaColStart")}:{" "}
                                {formatEndTime(mahaNow.startTime)}
                              </div>
                            )}
                            <div className="flex items-center gap-1.5">
                              <CalendarDays className="h-3 w-3" />
                              {t("endsLabel")}{" "}
                              {formatEndTime(
                                mahaNow?.endTime ??
                                  kundli.dasha.currentMahadasha.endTime
                              )}
                            </div>
                          </div>
                        </div>

                        {/* Current Antardasha */}
                        {(antarNow || kundli.dasha.currentAntardasha) && (
                          <div className="p-5 rounded-xl border border-gray-100 bg-gray-50/50">
                            <p className="text-xs font-bold uppercase tracking-widest text-secondary mb-3">
                              {t("currentAntardasha")}
                            </p>
                            <p className="text-2xl font-bold font-heading text-gray-900 mb-1">
                              {antarNow?.planet ??
                                kundli.dasha.currentAntardasha?.planet}
                            </p>
                            <p className="text-xs text-gray-500">
                              {PLANET_HINDI[
                                (antarNow?.planet ??
                                  kundli.dasha.currentAntardasha
                                    ?.planet) as PlanetKey
                              ] ?? ""}
                            </p>
                            <div className="mt-3 space-y-1 text-xs text-gray-500">
                              {antarNow && (
                                <div className="flex items-center gap-1.5">
                                  <CalendarDays className="h-3 w-3" />
                                  {t("dashaColStart")}:{" "}
                                  {formatEndTime(antarNow.startTime)}
                                </div>
                              )}
                              <div className="flex items-center gap-1.5">
                                <CalendarDays className="h-3 w-3" />
                                {t("endsLabel")}{" "}
                                {formatEndTime(
                                  antarNow?.endTime ??
                                    kundli.dasha.currentAntardasha!.endTime
                                )}
                              </div>
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Mahadasha Timeline */}
                      {kundli.dasha.fullCycle &&
                        kundli.dasha.fullCycle.length > 0 && (
                          <div className="mt-6">
                            <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-3">
                              {t("dashaTimelineHeading")}
                            </p>
                            <DashaTimelineTable
                              fullCycle={kundli.dasha.fullCycle}
                              currentPlanet={
                                mahaNow?.planet ??
                                kundli.dasha.currentMahadasha.planet
                              }
                              lang={lang}
                              t={t}
                            />
                          </div>
                        )}
                    </div>
                  )}
                </TabsContent>

                {/* ── Doshas Tab ───────────────────────── */}
                <TabsContent value="doshas" className="mt-6">
                  {doshas ? (
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                      <DoshaCard
                        title={t("doshaMangalTitle")}
                        result={doshas.mangal}
                        icon={Flame}
                        t={t}
                      />
                      <DoshaCard
                        title={t("doshaSadeSatiTitle")}
                        result={doshas.sadeSati}
                        icon={Clock}
                        t={t}
                      />
                      <DoshaCard
                        title={t("doshaKaalSarpTitle")}
                        result={doshas.kaalSarp}
                        icon={Shield}
                        t={t}
                      />
                    </div>
                  ) : (
                    <Card className="border-gray-100 shadow-sm">
                      <CardContent>
                        <p className="text-sm text-gray-500">
                          {t("doshaLoading")}
                        </p>
                      </CardContent>
                    </Card>
                  )}
                </TabsContent>

                {/* ── Remedies Tab ─────────────────────── */}
                <TabsContent value="remedies" className="mt-6 space-y-5">
                  <div className="rounded-2xl bg-gradient-to-r from-accent/10 via-accent/5 to-transparent border border-accent/20 p-5">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-accent/20 flex items-center justify-center">
                        <Gem className="h-5 w-5 text-amber-700" />
                      </div>
                      <div>
                        <p className="text-[11px] font-bold uppercase tracking-widest text-secondary">
                          {t("remediesEyebrow")}
                        </p>
                        <h3 className="text-lg font-bold font-heading text-gray-900">
                          {t("remediesForLabel")}{" "}
                          {mahaNow?.planet ??
                            kundli.dasha.currentMahadasha.planet}
                          <span className="text-accent ml-2 text-base">
                            {PLANET_HINDI[
                              (mahaNow?.planet ??
                                kundli.dasha.currentMahadasha
                                  .planet) as PlanetKey
                            ] ?? ""}
                          </span>
                        </h3>
                      </div>
                    </div>
                  </div>

                  <RemediesByTypeSection
                    remedies={personalizedRemedies}
                    mahadashaPlanet={
                      mahaNow?.planet ?? kundli.dasha.currentMahadasha.planet
                    }
                    t={t}
                  />

                  <div className="rounded-2xl bg-primary/[0.04] border border-primary/10 p-6 text-center">
                    <h4 className="text-base font-bold font-heading text-gray-900 mb-1.5">
                      {t("gemstoneCtaTitle")}
                    </h4>
                    <p className="text-sm text-gray-600 mb-4 max-w-md mx-auto">
                      {t("gemstoneCtaDesc")}
                    </p>
                    <div className="flex flex-wrap items-center justify-center gap-3">
                      <Button asChild className="bg-primary hover:bg-primary/90 rounded-xl">
                        <Link href="/shop/gemstones">
                          <Gem className="h-4 w-4 mr-1.5" />
                          {t("shopGemstonesBtn")}
                          <ArrowRight className="h-4 w-4 ml-1.5" />
                        </Link>
                      </Button>
                      <ConsultationButton
                        service={`Mahadasha ${mahaNow?.planet ?? kundli.dasha.currentMahadasha.planet} Remedies`}
                        variant="outline"
                        className="rounded-xl border-primary/30 text-primary hover:bg-primary/5"
                      >
                        <Users className="h-4 w-4 mr-1.5" />
                        {t("talkToAstrologerBtn")}
                      </ConsultationButton>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </section>
      )}

      {/* ── Error State ────────────────────────────────── */}
      {generated && !kundli && (
        <section className="pb-16">
          <div className="container mx-auto px-4 text-center">
            <div className="max-w-sm mx-auto">
              <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-red-50 flex items-center justify-center">
                <Star className="h-8 w-8 text-red-400" />
              </div>
              <p className="text-sm text-gray-500">
                {t("errorStateMessage")}
              </p>
            </div>
          </div>
        </section>
      )}

      {/* ── Empty State ────────────────────────────────── */}
      {!generated && (
        <section className="pb-20">
          <div className="container mx-auto px-4 text-center">
            <div className="max-w-sm mx-auto">
              <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-accent/10 flex items-center justify-center">
                <Star className="h-8 w-8 text-accent" />
              </div>
              <p className="text-sm text-gray-500">
                {t("emptyStateMessage")}
              </p>
            </div>
          </div>
        </section>
      )}

      {/* ── SEO Long-Form Content + Related Tools ──────── */}
      <section className="bg-gradient-to-b from-background via-white to-background py-14 md:py-18 border-t border-gray-100">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-10">
              <p className="text-xs font-bold uppercase tracking-widest text-secondary mb-2">
                {t("seoEyebrow")}
              </p>
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold font-heading text-gray-900 mb-3">
                {t("seoTitle")}
              </h2>
              <p className="text-sm md:text-base text-gray-600 leading-relaxed max-w-2xl mx-auto">
                {t("seoIntro")}
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-4 md:gap-5 mb-10">
              {[
                {
                  icon: Sparkles,
                  title: t("seoCard1Title"),
                  body: t("seoCard1Body"),
                },
                {
                  icon: Moon,
                  title: t("seoCard2Title"),
                  body: t("seoCard2Body"),
                },
                {
                  icon: Sun,
                  title: t("seoCard3Title"),
                  body: t("seoCard3Body"),
                },
                {
                  icon: Star,
                  title: t("seoCard4Title"),
                  body: t("seoCard4Body"),
                },
                {
                  icon: TrendingUp,
                  title: t("seoCard5Title"),
                  body: t("seoCard5Body"),
                },
                {
                  icon: Shield,
                  title: t("seoCard6Title"),
                  body: t("seoCard6Body"),
                },
              ].map((c) => (
                <div
                  key={c.title}
                  className="rounded-2xl border border-gray-100 bg-white p-5 md:p-6 shadow-sm hover:shadow-md hover:border-primary/20 transition-all duration-200"
                >
                  <div className="flex items-start gap-3 mb-2">
                    <div className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                      <c.icon className="h-4 w-4 text-primary" />
                    </div>
                    <h3 className="text-base md:text-lg font-bold font-heading text-gray-900 leading-snug pt-1">
                      {c.title}
                    </h3>
                  </div>
                  <p className="text-sm text-gray-600 leading-relaxed pl-12">
                    {c.body}
                  </p>
                </div>
              ))}
            </div>

            <div className="rounded-3xl bg-gradient-to-br from-primary/5 via-accent/10 to-secondary/5 border border-primary/10 p-6 md:p-8 mb-10">
              <div className="grid md:grid-cols-[1fr_auto] items-center gap-5">
                <div>
                  <p className="text-[11px] font-bold uppercase tracking-widest text-primary mb-1.5">
                    {t("trustEyebrow")}
                  </p>
                  <h3 className="text-xl md:text-2xl font-bold font-heading text-gray-900 mb-2">
                    {t("trustTitle")}
                  </h3>
                  <p className="text-sm md:text-base text-gray-600 leading-relaxed">
                    {t("trustBody")}
                  </p>
                </div>
                <div className="flex md:flex-col gap-3 md:gap-4 justify-center">
                  <div className="text-center">
                    <p className="text-2xl md:text-3xl font-bold font-heading text-primary">16+</p>
                    <p className="text-[10px] uppercase tracking-wider text-gray-500 font-semibold">{t("statDivisionalCharts")}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl md:text-3xl font-bold font-heading text-secondary">27</p>
                    <p className="text-[10px] uppercase tracking-wider text-gray-500 font-semibold">{t("statNakshatras")}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl md:text-3xl font-bold font-heading text-accent">9</p>
                    <p className="text-[10px] uppercase tracking-wider text-gray-500 font-semibold">{t("statGrahas")}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Related Tools strip */}
            <div className="text-center mb-6">
              <p className="text-xs font-bold uppercase tracking-widest text-secondary mb-2">
                {t("exploreMoreEyebrow")}
              </p>
              <h3 className="text-xl md:text-2xl font-bold font-heading text-gray-900">
                {t("exploreMoreTitle")}
              </h3>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {[
                {
                  href: "/free-match-making-calculator/",
                  icon: Heart,
                  title: t("toolMilanTitle"),
                  desc: t("toolMilanDesc"),
                },
                {
                  href: "/free-numerology-calculator/",
                  icon: Hash,
                  title: t("toolNumerologyTitle"),
                  desc: t("toolNumerologyDesc"),
                },
                {
                  href: "/free-horoscope/",
                  icon: Sparkles,
                  title: t("toolHoroscopeTitle"),
                  desc: t("toolHoroscopeDesc"),
                },
                {
                  href: "/gemstone-recommender/",
                  icon: Gem,
                  title: t("toolGemstoneTitle"),
                  desc: t("toolGemstoneDesc"),
                },
              ].map((tool) => (
                <Link
                  key={tool.href}
                  href={tool.href}
                  className="group rounded-2xl border border-gray-100 bg-white p-4 transition-all duration-200 hover:border-primary/30 hover:shadow-md hover:-translate-y-0.5"
                >
                  <div className="w-9 h-9 rounded-lg bg-accent/15 flex items-center justify-center mb-2.5 group-hover:scale-110 transition-transform">
                    <tool.icon className="h-4 w-4 text-primary" />
                  </div>
                  <h4 className="text-sm font-bold font-heading text-gray-900 mb-1">
                    {tool.title}
                  </h4>
                  <p className="text-xs text-gray-500 leading-snug mb-2">
                    {tool.desc}
                  </p>
                  <span className="inline-flex items-center gap-1 text-xs font-semibold text-primary group-hover:gap-1.5 transition-all">
                    {t("tryNow")}
                    <ArrowRight className="h-3 w-3" />
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── FAQ Section ─────────────────────────────────── */}
      <FaqSection
        initialVisible={4}
        description={t("faqDescription")}
        faqs={[
          {
            question: t("faqQ1"),
            answer: t("faqA1"),
            readMoreHref:
              "/blog/what-is-a-janam-kundli-and-why-is-it-important-in-vedic-astrology-complete-guide/",
          },
          {
            question: t("faqQ2"),
            answer: t("faqA2"),
            readMoreHref: "/blog/how-is-the-free-kundli-calculated/",
          },
          {
            question: t("faqQ3"),
            answer: t("faqA3"),
            readMoreHref:
              "/blog/is-a-free-online-kundli-accurate-compared-to-a-paid-astrologer/",
          },
          {
            question: t("faqQ4"),
            answer: t("faqA4"),
          },
          {
            question: t("faqQ5"),
            answer: t("faqA5"),
          },
          {
            question: t("faqQ6"),
            answer: t("faqA6"),
          },
          {
            question: t("faqQ7"),
            answer: t("faqA7"),
          },
          {
            question: t("faqQ8"),
            answer: t("faqA8"),
          },
          {
            question: t("faqQ9"),
            answer: t("faqA9"),
          },
          {
            question: t("faqQ10"),
            answer: t("faqA10"),
          },
        ]}
      />

      {/* ── Bottom CTA ─────────────────────────────────── */}
      <section className="py-12 border-t border-gray-100 bg-gray-50/40">
        <div className="container mx-auto px-4 text-center">
          <h3 className="text-xl md:text-2xl font-bold font-heading text-gray-900 mb-2">
            {t("ctaTitle")}
          </h3>
          <p className="text-sm text-gray-500 mb-6 max-w-md mx-auto">
            {t("ctaDesc")}
          </p>
          <div className="flex items-center justify-center gap-3">
            <ConsultationButton
              service="Detailed Kundli Reading"
              className="bg-primary rounded-xl"
            >
              {t("bookConsultationBtn")}
              <ArrowRight className="h-4 w-4 ml-1.5" />
            </ConsultationButton>
            <Button variant="outline" className="rounded-xl" asChild>
              <Link href="/contact">{t("contactUsBtn")}</Link>
            </Button>
          </div>
        </div>
      </section>
    </MainLayout>
  );
}
