"use client";

import { useState, useMemo } from "react";
import { MainLayout } from "@/components/templates/main-layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { ConsultationButton } from "@/components/molecules/consultation-button";
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
} from "lucide-react";
import { LocationSearch } from "@/components/molecules/location-search";
import {
  getKundli,
  Observer,
  rashiNames,
  nakshatraNames,
} from "@ishubhamx/panchangam-js";
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

function formatDate(dateStr: string) {
  if (!dateStr) return "";
  const d = new Date(dateStr);
  return d.toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

/* ── North Indian chart layout ─────────────────────────── */

type CellType = "house" | "center";

interface CellDef {
  type: CellType;
  house?: number;
}

const CHART_GRID: CellDef[][] = [
  [
    { type: "house", house: 12 },
    { type: "house", house: 1 },
    { type: "house", house: 2 },
    { type: "house", house: 3 },
  ],
  [
    { type: "house", house: 11 },
    { type: "center" },
    { type: "center" },
    { type: "house", house: 4 },
  ],
  [
    { type: "house", house: 10 },
    { type: "center" },
    { type: "center" },
    { type: "house", house: 5 },
  ],
  [
    { type: "house", house: 9 },
    { type: "house", house: 8 },
    { type: "house", house: 7 },
    { type: "house", house: 6 },
  ],
];

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
  currentMahadasha: { planet: string; endTime: Date | string };
  currentAntardasha: { planet: string; endTime: Date | string };
  fullCycle: unknown[];
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
}

function AscendantCard({ traits, rashiName, hindiName }: AscendantCardProps) {
  if (!traits) {
    return (
      <Card className="border-gray-100 shadow-sm">
        <CardContent>
          <div className="flex items-center gap-2 mb-3">
            <Info className="h-4 w-4 text-primary" />
            <h3 className="text-base font-bold font-heading text-gray-900">
              Ascendant Personality
            </h3>
          </div>
          <p className="text-sm text-gray-500">
            Detailed ascendant traits for <strong>{rashiName}</strong> will
            appear here once the data layer is loaded.
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
              Ascendant Personality — {rashiName}
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
                Strengths
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
                Weaknesses
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
                Suited Careers
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
}

function NakshatraSummaryCard({ nakshatraName }: NakshatraSummaryCardProps) {
  const info = getNakshatraInfo(nakshatraName);

  return (
    <Card className="border-gray-100 shadow-sm">
      <CardContent>
        <div className="flex items-center gap-2 mb-3">
          <Star className="h-4 w-4 text-accent" />
          <p className="text-[11px] font-bold uppercase tracking-widest text-gray-500">
            Birth Nakshatra
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
                <span className="text-gray-400">Deity</span>
                <span className="font-medium text-gray-800">{info.deity}</span>
              </div>
            )}
            {info.symbol && (
              <div className="flex items-center justify-between">
                <span className="text-gray-400">Symbol</span>
                <span className="font-medium text-gray-800">{info.symbol}</span>
              </div>
            )}
            {info.gana && (
              <div className="flex items-center justify-between">
                <span className="text-gray-400">Gana</span>
                <span className="font-medium text-gray-800">{info.gana}</span>
              </div>
            )}
          </div>
        ) : (
          <p className="text-xs text-gray-400">
            Details for this nakshatra will appear once data loads.
          </p>
        )}
      </CardContent>
    </Card>
  );
}

interface MahadashaSummaryCardProps {
  planet: string;
}

function MahadashaSummaryCard({ planet }: MahadashaSummaryCardProps) {
  const effects: MahadashaEffects | undefined = MAHADASHA[planet];
  const hindi = PLANET_HINDI[planet as PlanetKey] ?? "";

  return (
    <Card className="border-gray-100 shadow-sm">
      <CardContent>
        <div className="flex items-center gap-2 mb-3">
          <Clock className="h-4 w-4 text-secondary" />
          <p className="text-[11px] font-bold uppercase tracking-widest text-gray-500">
            Current Mahadasha
          </p>
        </div>
        <p className="text-2xl font-bold font-heading text-gray-900">
          {planet}
          {hindi && <span className="text-accent ml-2 text-lg">{hindi}</span>}
        </p>
        {effects?.years !== undefined ? (
          <p className="text-xs text-gray-500 mt-1">
            Focus period: {effects.years} years
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

interface DoshaSummaryCardProps {
  mangal: DoshaResult;
  sadeSati: DoshaResult;
  kaalSarp: DoshaResult;
}

function DoshaSummaryCard({ mangal, sadeSati, kaalSarp }: DoshaSummaryCardProps) {
  const rows: Array<{ name: string; active: boolean }> = [
    { name: "Manglik", active: mangal.active },
    { name: "Sade Sati", active: sadeSati.active },
    { name: "Kaal Sarp", active: kaalSarp.active },
  ];

  return (
    <Card className="border-gray-100 shadow-sm">
      <CardContent>
        <div className="flex items-center gap-2 mb-3">
          <Shield className="h-4 w-4 text-primary" />
          <p className="text-[11px] font-bold uppercase tracking-widest text-gray-500">
            Dosha Summary
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
                {r.active ? "Active" : "None"}
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
}

function ChartInsightsCard({
  conjunctions,
  dignifiedPlanets,
}: ChartInsightsCardProps) {
  return (
    <Card className="border-gray-100 shadow-sm">
      <CardContent className="space-y-5">
        <div className="flex items-center gap-2">
          <TrendingUp className="h-4 w-4 text-secondary" />
          <h3 className="text-base font-bold font-heading text-gray-900">
            Chart Insights
          </h3>
        </div>

        <div>
          <p className="text-[11px] font-bold uppercase tracking-widest text-gray-500 mb-2">
            Planetary Conjunctions
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
              No major conjunctions in this chart.
            </p>
          )}
        </div>

        <div>
          <p className="text-[11px] font-bold uppercase tracking-widest text-gray-500 mb-2">
            Dignified Placements
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
              No planets in own sign, exalted, or in mooltrikona.
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
}

function PlanetCard({
  planetKey,
  info,
  rashiName,
  expanded,
  onToggle,
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
                  Karaka: {info.karaka}
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
          In
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
                  +{info.significations.length - 4} more
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
                Mantra
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
                <span className="text-gray-400">Gemstone:</span>{" "}
                <span className="font-medium text-gray-800">{info.gemstone}</span>
              </p>
            </div>
          )}
          {info?.day && (
            <p className="text-xs text-gray-600">
              <span className="text-gray-400">Day:</span> {info.day}
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
}

function HouseCard({ num, info, rashiIdx, planets }: HouseCardProps) {
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
              {info?.name ?? `House ${num}`}
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
          <span className="text-gray-400">Rashi: </span>
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
            <span className="text-[10px] text-gray-300">empty</span>
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
}

function DoshaCard({ title, result, icon: Icon }: DoshaCardProps) {
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
                  Severity: {result.severity}
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
            {result.active ? "Active" : "Inactive"}
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
              Why
            </p>
            <p className="text-sm text-gray-700 leading-relaxed">
              {result.explanation}
            </p>
          </div>
        )}

        {result.remedies && result.remedies.length > 0 && (
          <div>
            <p className="text-[11px] font-bold uppercase tracking-widest text-gray-500 mb-2">
              Remedies
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
}

function RemediesByTypeSection({
  remedies,
  mahadashaPlanet,
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
            No personalized remedies found for{" "}
            <span className="font-medium text-gray-800">
              {mahadashaPlanet}
            </span>
            . Try consulting an astrologer below.
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
}

function NakshatraDetailSection({ nakshatraName }: NakshatraDetailSectionProps) {
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
            Detailed nakshatra information is not available for this name
            format. This can happen if the computed nakshatra label doesn&apos;t
            match our dataset.
          </p>
        </CardContent>
      </Card>
    );
  }

  const topTiles: Array<{ label: string; value: string | undefined }> = [
    { label: "Deity", value: info.deity },
    { label: "Symbol", value: info.symbol },
    { label: "Ruler", value: info.ruler },
    { label: "Gana", value: info.gana },
  ];

  const bottomTiles: Array<{ label: string; value: string | undefined }> = [
    { label: "Nadi", value: info.nadi },
    { label: "Yoni", value: info.yoni },
    { label: "Varna", value: info.varna },
    { label: "Tatva", value: info.tatva },
  ];

  return (
    <div className="space-y-5">
      <Card className="border-gray-100 shadow-sm overflow-hidden">
        <div className="relative bg-gradient-to-r from-primary to-primary/80 text-white p-6">
          <div className="absolute top-0 right-0 w-32 h-32 bg-accent/15 rounded-full blur-3xl" />
          <div className="relative z-10">
            <p className="text-[11px] font-bold uppercase tracking-widest text-white/60 mb-1">
              Birth Nakshatra
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
                About
              </p>
              <p className="text-sm text-gray-700 leading-relaxed">
                {info.description}
              </p>
            </div>
          )}

          {info.traits && info.traits.length > 0 && (
            <div>
              <p className="text-[11px] font-bold uppercase tracking-widest text-gray-500 mb-2">
                Traits
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
  const [dobDate, setDobDate] = useState<Date | undefined>(undefined);
  const [dob, setDob] = useState("");
  const [tob, setTob] = useState("");
  const [place, setPlace] = useState("Gurugram");
  const [generated, setGenerated] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");
  const [expandedPlanet, setExpandedPlanet] = useState<string | null>(null);
  const [chartLabelLang, setChartLabelLang] = useState<"english" | "hindi">(
    "english"
  );

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
    if (!kundli?.dasha?.currentMahadasha?.planet) return [] as Remedy[];
    return getPlanetRemedies(kundli.dasha.currentMahadasha.planet);
  }, [kundli]);

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

  return (
    <MainLayout>
      {/* ── Hero Section ──────────────────────────────── */}
      <section className="relative bg-primary text-white overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-10 right-20 w-72 h-72 bg-accent/15 rounded-full blur-3xl" />
          <div className="absolute -bottom-10 -left-10 w-56 h-56 bg-secondary/10 rounded-full blur-3xl" />
        </div>
        <div className="container mx-auto px-4 relative z-10 py-14 md:py-20">
          <div className="max-w-2xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-sm text-sm mb-5">
              <Globe className="h-3.5 w-3.5 text-accent" />
              Vedic Astrology Dashboard
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-heading mb-4 leading-tight">
              Free Kundli Generator
            </h1>
            <p className="text-white/70 text-base md:text-lg max-w-lg mx-auto">
              Your complete Janam Kundli with ascendant insights, planetary
              significations, nakshatra details, dosha analysis and
              personalized remedies — all in one place.
            </p>
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
                  Birth Details
                </p>
                <h2 className="text-2xl md:text-3xl font-bold font-heading text-gray-900">
                  Enter Your Details
                </h2>
              </div>

              <div className="space-y-5">
                {/* Date of Birth — Calendar Picker */}
                <div className="space-y-2">
                  <Label className="text-sm font-medium text-gray-700 flex items-center gap-1.5">
                    <CalendarDays className="h-3.5 w-3.5 text-primary" />
                    Date of Birth
                  </Label>
                  <Popover>
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
                          : "Select date of birth"}
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
                    Time of Birth
                  </Label>
                  <Input
                    id="tob"
                    type="time"
                    value={tob}
                    onChange={(e) => setTob(e.target.value)}
                    className="rounded-xl"
                  />
                </div>

                {/* Place of Birth — with location search */}
                <div className="space-y-2">
                  <Label className="text-sm font-medium text-gray-700 flex items-center gap-1.5">
                    <MapPin className="h-3.5 w-3.5 text-primary" />
                    Place of Birth
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
                    Generate Kundli
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

      {/* ── Results Section ────────────────────────────── */}
      {generated && kundli && (
        <section className="pb-16">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto space-y-8">
              {/* Birth Details Summary Strip */}
              <div className="text-center">
                <p className="text-xs font-bold uppercase tracking-widest text-secondary mb-2">
                  Janam Kundli
                </p>
                <h2 className="text-2xl md:text-3xl font-bold font-heading text-gray-900 mb-1">
                  Your Birth Chart
                </h2>
                <p className="text-sm text-gray-500">
                  Native &middot; {formatDate(dob)} &middot; {tob} &middot;{" "}
                  {place}
                </p>
              </div>

              {/* 3 Signs Card */}
              <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-primary via-primary to-primary/90 text-white p-6 md:p-8">
                <div className="absolute top-0 right-0 w-52 h-52 bg-accent/15 rounded-full blur-3xl" />
                <div className="absolute bottom-0 left-0 w-40 h-40 bg-secondary/15 rounded-full blur-3xl" />

                <div className="relative z-10">
                  <div className="text-center mb-6">
                    <p className="text-[11px] font-bold uppercase tracking-widest text-white/60 mb-1">
                      Your Core Trinity
                    </p>
                    <h3 className="text-xl md:text-2xl font-bold font-heading">
                      Three Major Signs
                    </h3>
                  </div>

                  <div className="grid sm:grid-cols-3 gap-4">
                    <SignTile
                      label="Lagna (Ascendant)"
                      icon={Sparkles}
                      rashi={ascendantRashiInfo}
                      rashiIdx={kundli.ascendant.rashi}
                    />
                    <SignTile
                      label="Chandra Rashi"
                      icon={Moon}
                      rashi={moonRashiInfo}
                      rashiIdx={kundli.planets.Moon?.rashi ?? 0}
                    />
                    <SignTile
                      label="Surya Rashi"
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
                      <Info className="h-3.5 w-3.5" /> Overview
                    </TabsTrigger>
                    <TabsTrigger
                      value="chart"
                      className="rounded-lg px-3 py-1.5 text-sm"
                    >
                      <Globe className="h-3.5 w-3.5" /> Chart
                    </TabsTrigger>
                    <TabsTrigger
                      value="planets"
                      className="rounded-lg px-3 py-1.5 text-sm"
                    >
                      <Sparkles className="h-3.5 w-3.5" /> Planets
                    </TabsTrigger>
                    <TabsTrigger
                      value="houses"
                      className="rounded-lg px-3 py-1.5 text-sm"
                    >
                      <Home className="h-3.5 w-3.5" /> Houses
                    </TabsTrigger>
                    <TabsTrigger
                      value="nakshatra"
                      className="rounded-lg px-3 py-1.5 text-sm"
                    >
                      <Star className="h-3.5 w-3.5" /> Nakshatra
                    </TabsTrigger>
                    <TabsTrigger
                      value="doshas"
                      className="rounded-lg px-3 py-1.5 text-sm"
                    >
                      <Shield className="h-3.5 w-3.5" /> Doshas
                    </TabsTrigger>
                    <TabsTrigger
                      value="remedies"
                      className="rounded-lg px-3 py-1.5 text-sm"
                    >
                      <Gem className="h-3.5 w-3.5" /> Remedies
                    </TabsTrigger>
                  </TabsList>
                </div>

                {/* ── Overview Tab ─────────────────────── */}
                <TabsContent value="overview" className="mt-6 space-y-5">
                  <AscendantCard
                    traits={ascendantTraits}
                    rashiName={kundli.ascendant.rashiName}
                    hindiName={ascendantRashiInfo?.hindi ?? ""}
                  />

                  <div className="grid md:grid-cols-3 gap-4">
                    <NakshatraSummaryCard
                      nakshatraName={kundli.dasha.birthNakshatra}
                    />
                    <MahadashaSummaryCard
                      planet={kundli.dasha.currentMahadasha.planet}
                    />
                    {doshas && (
                      <DoshaSummaryCard
                        mangal={doshas.mangal}
                        sadeSati={doshas.sadeSati}
                        kaalSarp={doshas.kaalSarp}
                      />
                    )}
                  </div>
                </TabsContent>

                {/* ── Chart Tab ────────────────────────── */}
                <TabsContent value="chart" className="mt-6 space-y-5">
                  {/* Chart toggle */}
                  <div className="flex items-center justify-center gap-2">
                    <span className="text-xs text-gray-500 mr-1">Labels:</span>
                    <Button
                      variant={chartLabelLang === "english" ? "default" : "outline"}
                      size="sm"
                      onClick={() => setChartLabelLang("english")}
                      className={cn(
                        "rounded-lg text-xs h-8",
                        chartLabelLang === "english" &&
                          "bg-primary hover:bg-primary/90"
                      )}
                    >
                      North Indian
                    </Button>
                    <Button
                      variant={chartLabelLang === "hindi" ? "default" : "outline"}
                      size="sm"
                      onClick={() => setChartLabelLang("hindi")}
                      className={cn(
                        "rounded-lg text-xs h-8",
                        chartLabelLang === "hindi" &&
                          "bg-primary hover:bg-primary/90"
                      )}
                    >
                      हिंदी Labels
                    </Button>
                  </div>

                  {/* Birth Chart Grid */}
                  <div className="bg-white rounded-2xl border border-gray-100 shadow-lg p-6 md:p-8">
                    <div className="flex items-center gap-2 mb-6">
                      <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                        <Globe className="h-4 w-4 text-primary" />
                      </div>
                      <h3 className="text-lg font-bold font-heading text-gray-900">
                        Birth Chart (Kundli)
                      </h3>
                    </div>

                    <div className="max-w-lg mx-auto">
                      <div className="grid grid-cols-4 border-2 border-primary/30 rounded-xl overflow-hidden">
                        {CHART_GRID.flat().map((cell, idx) => {
                          if (cell.type === "center") {
                            const centerIdx = [5, 6, 9, 10].indexOf(idx);
                            if (centerIdx === 0) {
                              return (
                                <div
                                  key={idx}
                                  className="col-span-1 aspect-square flex items-end justify-end p-2 bg-primary/[0.03]"
                                >
                                  <span className="text-[10px] text-primary/40 font-heading font-bold">
                                    जन्म
                                  </span>
                                </div>
                              );
                            }
                            if (centerIdx === 1) {
                              return (
                                <div
                                  key={idx}
                                  className="col-span-1 aspect-square flex items-end justify-start p-2 bg-primary/[0.03]"
                                >
                                  <span className="text-[10px] text-primary/40 font-heading font-bold">
                                    कुंडली
                                  </span>
                                </div>
                              );
                            }
                            if (centerIdx === 2) {
                              return (
                                <div
                                  key={idx}
                                  className="col-span-1 aspect-square flex items-start justify-end p-2 bg-primary/[0.03]"
                                >
                                  <Moon className="h-4 w-4 text-primary/20" />
                                </div>
                              );
                            }
                            return (
                              <div
                                key={idx}
                                className="col-span-1 aspect-square flex items-start justify-start p-2 bg-primary/[0.03]"
                              >
                                <Sun className="h-4 w-4 text-primary/20" />
                              </div>
                            );
                          }

                          const houseNum = cell.house!;
                          const rashi = houseRashi[houseNum];
                          const planets = housePlanets[houseNum] ?? [];
                          const rashiLabel =
                            rashi !== undefined
                              ? chartLabelLang === "hindi"
                                ? RASHIS[rashi]?.hindi ??
                                  rashiNames[rashi] ??
                                  String(rashi)
                                : rashiNames[rashi] ?? String(rashi)
                              : "";

                          return (
                            <div
                              key={idx}
                              className={cn(
                                "aspect-square border border-primary/15 p-1.5 sm:p-2 flex flex-col justify-between transition-colors hover:bg-primary/[0.03]",
                                houseNum === 1 && "bg-accent/[0.06]"
                              )}
                            >
                              <div className="flex items-start justify-between">
                                <span className="text-[10px] sm:text-xs font-bold text-primary/70">
                                  {houseNum}
                                </span>
                                {rashiLabel && (
                                  <span
                                    className={cn(
                                      "text-[9px] sm:text-[10px] text-gray-400",
                                      chartLabelLang === "hindi" && "text-accent/90"
                                    )}
                                  >
                                    {rashiLabel}
                                  </span>
                                )}
                              </div>
                              <div className="flex flex-wrap gap-0.5">
                                {planets.map((p) => (
                                  <span
                                    key={p}
                                    className={cn(
                                      "text-[9px] sm:text-[10px] font-bold px-1 py-0.5 rounded",
                                      PLANET_ABBR_COLOR[p] ??
                                        "text-gray-500 bg-gray-50"
                                    )}
                                  >
                                    {p}
                                  </span>
                                ))}
                              </div>
                            </div>
                          );
                        })}
                      </div>

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
                  </div>

                  <ChartInsightsCard
                    conjunctions={chartAnalysis.conjunctions}
                    dignifiedPlanets={chartAnalysis.dignified}
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
                        Planetary Positions
                      </h3>
                    </div>

                    <div className="overflow-x-auto -mx-6 px-6">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="border-b-2 border-primary/10">
                            <th className="text-left py-3 pr-3 text-xs font-bold uppercase tracking-wider text-gray-500">
                              Planet
                            </th>
                            <th className="text-left py-3 px-3 text-xs font-bold uppercase tracking-wider text-gray-500">
                              Rashi
                            </th>
                            <th className="text-right py-3 px-3 text-xs font-bold uppercase tracking-wider text-gray-500">
                              Degree
                            </th>
                            <th className="text-left py-3 px-3 text-xs font-bold uppercase tracking-wider text-gray-500">
                              Nakshatra
                            </th>
                            <th className="text-center py-3 px-3 text-xs font-bold uppercase tracking-wider text-gray-500">
                              Retro
                            </th>
                            <th className="text-left py-3 pl-3 text-xs font-bold uppercase tracking-wider text-gray-500">
                              Dignity
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
                                    {planet.dignity || "Neutral"}
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
                        Planet Significations
                      </h3>
                      <span className="text-xs text-gray-400">
                        Tap a card to reveal mantra &amp; gemstone
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
                      />
                    ))}
                  </div>
                </TabsContent>

                {/* ── Nakshatra Tab ────────────────────── */}
                <TabsContent value="nakshatra" className="mt-6">
                  <NakshatraDetailSection
                    nakshatraName={kundli.dasha.birthNakshatra}
                  />
                </TabsContent>

                {/* ── Doshas Tab ───────────────────────── */}
                <TabsContent value="doshas" className="mt-6">
                  {doshas ? (
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                      <DoshaCard
                        title="Mangal Dosha"
                        result={doshas.mangal}
                        icon={Flame}
                      />
                      <DoshaCard
                        title="Sade Sati"
                        result={doshas.sadeSati}
                        icon={Clock}
                      />
                      <DoshaCard
                        title="Kaal Sarp Dosha"
                        result={doshas.kaalSarp}
                        icon={Shield}
                      />
                    </div>
                  ) : (
                    <Card className="border-gray-100 shadow-sm">
                      <CardContent>
                        <p className="text-sm text-gray-500">
                          Dosha analysis is loading…
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
                          Personalized for Your Current Mahadasha
                        </p>
                        <h3 className="text-lg font-bold font-heading text-gray-900">
                          Remedies for {kundli.dasha.currentMahadasha.planet}
                          <span className="text-accent ml-2 text-base">
                            {PLANET_HINDI[
                              kundli.dasha.currentMahadasha.planet as PlanetKey
                            ] ?? ""}
                          </span>
                        </h3>
                      </div>
                    </div>
                  </div>

                  <RemediesByTypeSection
                    remedies={personalizedRemedies}
                    mahadashaPlanet={kundli.dasha.currentMahadasha.planet}
                  />

                  <div className="rounded-2xl bg-primary/[0.04] border border-primary/10 p-6 text-center">
                    <h4 className="text-base font-bold font-heading text-gray-900 mb-1.5">
                      Want authentic, certified gemstones?
                    </h4>
                    <p className="text-sm text-gray-600 mb-4 max-w-md mx-auto">
                      Explore our curated collection of lab-tested gemstones
                      aligned with your planetary recommendations.
                    </p>
                    <div className="flex flex-wrap items-center justify-center gap-3">
                      <Button asChild className="bg-primary hover:bg-primary/90 rounded-xl">
                        <Link href="/shop/gemstones">
                          <Gem className="h-4 w-4 mr-1.5" />
                          Shop Gemstones
                          <ArrowRight className="h-4 w-4 ml-1.5" />
                        </Link>
                      </Button>
                      <ConsultationButton
                        service={`Mahadasha ${kundli.dasha.currentMahadasha.planet} Remedies`}
                        variant="outline"
                        className="rounded-xl border-primary/30 text-primary hover:bg-primary/5"
                      >
                        <Users className="h-4 w-4 mr-1.5" />
                        Talk to an Astrologer
                      </ConsultationButton>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>

              {/* ── Dasha Section ──────────────────────── */}
              {kundli.dasha && (
                <div className="bg-white rounded-2xl border border-gray-100 shadow-lg p-6 md:p-8">
                  <div className="flex items-center gap-2 mb-6">
                    <div className="w-8 h-8 rounded-lg bg-accent/10 flex items-center justify-center">
                      <Clock className="h-4 w-4 text-accent" />
                    </div>
                    <h3 className="text-lg font-bold font-heading text-gray-900">
                      Vimshottari Dasha
                    </h3>
                  </div>

                  {/* Birth Nakshatra */}
                  <div className="mb-6 p-4 rounded-xl bg-primary/[0.03] border border-primary/10">
                    <p className="text-xs text-gray-500 mb-1">
                      Birth Nakshatra
                    </p>
                    <p className="text-lg font-bold font-heading text-primary">
                      {kundli.dasha.birthNakshatra}
                    </p>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    {/* Current Mahadasha */}
                    <div className="p-5 rounded-xl border border-gray-100 bg-gray-50/50">
                      <p className="text-xs font-bold uppercase tracking-widest text-secondary mb-3">
                        Current Mahadasha
                      </p>
                      <p className="text-2xl font-bold font-heading text-gray-900 mb-1">
                        {kundli.dasha.currentMahadasha.planet}
                      </p>
                      <p className="text-xs text-gray-500">
                        {PLANET_HINDI[
                          kundli.dasha.currentMahadasha.planet as PlanetKey
                        ] ?? ""}
                      </p>
                      <div className="mt-3 flex items-center gap-1.5 text-xs text-gray-500">
                        <CalendarDays className="h-3 w-3" />
                        Ends:{" "}
                        {formatEndTime(
                          kundli.dasha.currentMahadasha.endTime
                        )}
                      </div>
                    </div>

                    {/* Current Antardasha */}
                    <div className="p-5 rounded-xl border border-gray-100 bg-gray-50/50">
                      <p className="text-xs font-bold uppercase tracking-widest text-secondary mb-3">
                        Current Antardasha
                      </p>
                      <p className="text-2xl font-bold font-heading text-gray-900 mb-1">
                        {kundli.dasha.currentAntardasha.planet}
                      </p>
                      <p className="text-xs text-gray-500">
                        {PLANET_HINDI[
                          kundli.dasha.currentAntardasha.planet as PlanetKey
                        ] ?? ""}
                      </p>
                      <div className="mt-3 flex items-center gap-1.5 text-xs text-gray-500">
                        <CalendarDays className="h-3 w-3" />
                        Ends:{" "}
                        {formatEndTime(
                          kundli.dasha.currentAntardasha.endTime
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Full Dasha Cycle */}
                  {kundli.dasha.fullCycle &&
                    kundli.dasha.fullCycle.length > 0 && (
                      <div className="mt-6">
                        <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-3">
                          Full Mahadasha Cycle
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {kundli.dasha.fullCycle.map(
                            (entry: unknown, i: number) => {
                              const d = entry as {
                                planet: string;
                                endTime: Date | string;
                              };
                              const isCurrent =
                                d.planet ===
                                kundli.dasha.currentMahadasha.planet;
                              const accentCls =
                                PLANET_ABBR_COLOR[
                                  PLANET_ABBR[d.planet as PlanetKey] ?? ""
                                ] ?? "";
                              return (
                                <div
                                  key={i}
                                  className={cn(
                                    "px-3 py-2 rounded-lg text-center border transition-colors relative overflow-hidden",
                                    isCurrent
                                      ? "bg-primary text-white border-primary shadow-md shadow-primary/20"
                                      : "bg-white border-gray-100 hover:border-primary/20"
                                  )}
                                >
                                  {!isCurrent && accentCls && (
                                    <span
                                      className={cn(
                                        "absolute top-1 right-1 w-1.5 h-1.5 rounded-full",
                                        accentCls.split(" ")[1] ?? ""
                                      )}
                                      aria-hidden
                                    />
                                  )}
                                  <p
                                    className={cn(
                                      "text-xs font-bold",
                                      isCurrent
                                        ? "text-white"
                                        : "text-gray-900"
                                    )}
                                  >
                                    {d.planet}
                                  </p>
                                  <p
                                    className={cn(
                                      "text-[10px] mt-0.5",
                                      isCurrent
                                        ? "text-white/60"
                                        : "text-gray-400"
                                    )}
                                  >
                                    {formatEndTime(d.endTime)}
                                  </p>
                                </div>
                              );
                            }
                          )}
                        </div>
                      </div>
                    )}
                </div>
              )}
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
                Unable to generate Kundli. Please check your birth details
                and try again.
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
                Enter your birth details above and click &quot;Generate
                Kundli&quot; to see your Vedic birth chart, planetary
                positions, and dasha periods.
              </p>
            </div>
          </div>
        </section>
      )}

      {/* ── Bottom CTA ─────────────────────────────────── */}
      <section className="py-12 border-t border-gray-100 bg-gray-50/40">
        <div className="container mx-auto px-4 text-center">
          <h3 className="text-xl md:text-2xl font-bold font-heading text-gray-900 mb-2">
            Want a Detailed Kundli Reading?
          </h3>
          <p className="text-sm text-gray-500 mb-6 max-w-md mx-auto">
            Get a personalized birth chart analysis from our expert Vedic
            astrologers with remedies and predictions.
          </p>
          <div className="flex items-center justify-center gap-3">
            <ConsultationButton
              service="Detailed Kundli Reading"
              className="bg-primary rounded-xl"
            >
              Book Consultation
              <ArrowRight className="h-4 w-4 ml-1.5" />
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
