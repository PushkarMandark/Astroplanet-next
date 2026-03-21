"use client";

import { useState, useMemo } from "react";
import { MainLayout } from "@/components/templates/main-layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
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
} from "lucide-react";
import { LocationSearch } from "@/components/molecules/location-search";
import {
  getKundli,
  Observer,
  rashiNames,
  nakshatraNames,
} from "@ishubhamx/panchangam-js";

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

function getNakshatraFromDegree(longitude: number) {
  const idx = Math.floor(longitude / (360 / 27));
  return nakshatraNames[idx] ?? "—";
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

/* ── Page component ────────────────────────────────────── */

export default function KundliPage() {
  const [dobDate, setDobDate] = useState<Date | undefined>(undefined);
  const [dob, setDob] = useState("");
  const [tob, setTob] = useState("");
  const [place, setPlace] = useState("Gurugram");
  const [generated, setGenerated] = useState(false);

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

  const handleGenerate = () => {
    if (dob && tob) {
      setGenerated(false);
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
  };

  const formatDate = (dateStr: string) => {
    if (!dateStr) return "";
    const d = new Date(dateStr);
    return d.toLocaleDateString("en-IN", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  const formatEndTime = (endTime: Date | string) => {
    const d = endTime instanceof Date ? endTime : new Date(endTime);
    return d.toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  /* Map house number → planet abbreviations in that house */
  const housePlanets = useMemo(() => {
    if (!kundli) return {};
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
    if (!kundli) return {};
    const map: Record<number, number> = {};
    if (kundli.houses) {
      kundli.houses.forEach((h) => {
        map[h.number] = h.rashi;
      });
    }
    return map;
  }, [kundli]);

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
              Vedic Astrology
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-heading mb-4 leading-tight">
              Free Kundli Generator
            </h1>
            <p className="text-white/70 text-base md:text-lg max-w-lg mx-auto">
              Generate your Vedic birth chart (Janam Kundli) instantly.
              Discover your ascendant, planetary positions, and current dasha
              periods.
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
                        {dobDate ? format(dobDate, "dd MMMM yyyy") : "Select date of birth"}
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
                          nav_button: "h-7 w-7 bg-transparent p-0 text-gray-600 hover:text-primary",
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
            <div className="max-w-5xl mx-auto space-y-8">
              {/* Birth Details Summary */}
              <div className="text-center">
                <p className="text-xs font-bold uppercase tracking-widest text-secondary mb-2">
                  Janam Kundli
                </p>
                <h2 className="text-2xl md:text-3xl font-bold font-heading text-gray-900 mb-1">
                  Your Birth Chart
                </h2>
                <p className="text-sm text-gray-500">
                  {formatDate(dob)} &middot; {tob} &middot; {place}
                </p>
              </div>

              {/* ── Ascendant Card ──────────────────────── */}
              <div className="relative rounded-2xl overflow-hidden bg-primary text-white p-6 md:p-8">
                <div className="absolute top-0 right-0 w-40 h-40 bg-accent/15 rounded-full blur-3xl" />
                <div className="absolute bottom-0 left-0 w-32 h-32 bg-secondary/10 rounded-full blur-3xl" />

                <div className="relative z-10 flex flex-col sm:flex-row items-center gap-5">
                  <div className="w-20 h-20 rounded-2xl bg-white/15 backdrop-blur-sm flex items-center justify-center shrink-0">
                    <Sun className="h-10 w-10 text-accent" />
                  </div>
                  <div className="text-center sm:text-left">
                    <p className="text-white/60 text-xs uppercase tracking-widest mb-1">
                      Ascendant (Lagna)
                    </p>
                    <h3 className="text-2xl md:text-3xl font-bold font-heading">
                      {kundli.ascendant.rashiName}
                      <span className="text-accent ml-2 text-lg">
                        ({rashiNames[kundli.ascendant.rashi] ?? ""})
                      </span>
                    </h3>
                    <div className="flex flex-wrap items-center gap-2 mt-3 justify-center sm:justify-start">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-xs text-white/80">
                        <Star className="h-3 w-3 text-accent" />
                        Nakshatra: {kundli.ascendant.nakshatra}
                      </span>
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-accent/20 text-xs text-accent">
                        Pada: {kundli.ascendant.pada}
                      </span>
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-xs text-white/80">
                        {kundli.ascendant.longitude.toFixed(2)}°
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* ── Birth Chart Grid ───────────────────── */}
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
                        // Center cells (indices 5,6,9,10 in the flat array)
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
                            {rashi !== undefined && (
                              <span className="text-[9px] sm:text-[10px] text-gray-400">
                                {rashiNames[rashi] ?? rashi}
                              </span>
                            )}
                          </div>
                          <div className="flex flex-wrap gap-0.5">
                            {planets.map((p) => (
                              <span
                                key={p}
                                className={cn(
                                  "text-[9px] sm:text-[10px] font-bold px-1 py-0.5 rounded",
                                  p === "Su"
                                    ? "text-orange-600 bg-orange-50"
                                    : p === "Mo"
                                      ? "text-blue-600 bg-blue-50"
                                      : p === "Ma"
                                        ? "text-red-600 bg-red-50"
                                        : p === "Me"
                                          ? "text-green-600 bg-green-50"
                                          : p === "Ju"
                                            ? "text-yellow-600 bg-yellow-50"
                                            : p === "Ve"
                                              ? "text-pink-600 bg-pink-50"
                                              : p === "Sa"
                                                ? "text-indigo-600 bg-indigo-50"
                                                : p === "Ra"
                                                  ? "text-gray-600 bg-gray-100"
                                                  : "text-gray-500 bg-gray-50"
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
                      <span
                        key={key}
                        className="text-[10px] text-gray-500"
                      >
                        <span className="font-bold text-gray-700">
                          {PLANET_ABBR[key]}
                        </span>{" "}
                        {key}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* ── Planets Table ──────────────────────── */}
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
                                  <RotateCcw className="h-2.5 w-2.5" />
                                  R
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
                          kundli.dasha.currentMahadasha
                            .planet as PlanetKey
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
                          kundli.dasha.currentAntardasha
                            .planet as PlanetKey
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
                              return (
                                <div
                                  key={i}
                                  className={cn(
                                    "px-3 py-2 rounded-lg text-center border transition-colors",
                                    isCurrent
                                      ? "bg-primary text-white border-primary shadow-md shadow-primary/20"
                                      : "bg-white border-gray-100 hover:border-primary/20"
                                  )}
                                >
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
            <ConsultationButton service="Detailed Kundli Reading" className="bg-primary rounded-xl">
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
