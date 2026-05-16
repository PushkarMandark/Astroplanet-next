/**
 * Shared types for kundli chart rendering and analysis.
 *
 * All chart-style components (North/South/East/West Indian) and varga charts
 * accept ChartData as their input. This decouples the underlying library shape
 * from the visual components.
 */

export type LabelLang = "english" | "hindi";

export type AscendantReference = "lagna" | "chandra" | "surya";

/** Short 2–3 letter planet codes used in chart cells. */
export type PlanetAbbr =
  | "Su"
  | "Mo"
  | "Ma"
  | "Me"
  | "Ju"
  | "Ve"
  | "Sa"
  | "Ra"
  | "Ke"
  | "Pluto" // included for completeness (not used in standard vedic)
  ;

export interface ChartData {
  /** Rashi number (1–12) sitting in each house (house number 1–12 → rashi 1–12). */
  houseRashi: Record<number, number>;
  /** Planet abbreviation list in each house (house number 1–12 → ["Su","Mo"]). */
  housePlanets: Record<number, string[]>;
  /** Rashi number (1–12) of the ascendant / reference point. */
  ascendantRashi: number;
  /** Rashi (1–12) where Moon sits IN THIS CHART — required for Chandra Lagna rotation. */
  moonRashi?: number;
  /** Rashi (1–12) where Sun sits IN THIS CHART — required for Surya Lagna rotation. */
  sunRashi?: number;
}

/** Normalise a rashi value into the range [1, 12]. Handles NaN, negatives, and overflow. */
export function clampRashi(r: number): number {
  if (!Number.isFinite(r)) return 1;
  const m = ((Math.trunc(r) - 1) % 12 + 12) % 12;
  return m + 1;
}

export interface KundliChartProps {
  data: ChartData;
  labelLang?: LabelLang;
  className?: string;
  /** Optional title shown above the chart e.g. "D1 — Rashi". */
  title?: string;
}

/** All 16 supported divisional charts. */
export const VARGA_OPTIONS = [
  { key: "D1", name: "Rashi", description: "Body, general matters" },
  { key: "D2", name: "Hora", description: "Wealth" },
  { key: "D3", name: "Drekkana", description: "Siblings" },
  { key: "D4", name: "Chaturthamsha", description: "Property, fortune" },
  { key: "D7", name: "Saptamsha", description: "Children" },
  { key: "D9", name: "Navamsa", description: "Spouse, dharma" },
  { key: "D10", name: "Dashamsha", description: "Career" },
  { key: "D12", name: "Dvadashamsha", description: "Parents" },
  { key: "D16", name: "Shodashamsha", description: "Vehicles, comforts" },
  { key: "D20", name: "Vimshamsha", description: "Spiritual progress" },
  { key: "D24", name: "Chaturvimshamsha", description: "Education" },
  { key: "D27", name: "Saptavimshamsha", description: "Strengths & weaknesses" },
  { key: "D30", name: "Trimshamsha", description: "Misfortunes" },
  { key: "D40", name: "Khavedamsha", description: "Auspicious & inauspicious" },
  { key: "D45", name: "Akshavedamsha", description: "All areas of life" },
  { key: "D60", name: "Shashtiamsha", description: "Past karma" },
] as const;

export type VargaKey = (typeof VARGA_OPTIONS)[number]["key"];

export const CHART_STYLE_OPTIONS = [
  { key: "north", label: "North" },
  { key: "south", label: "South" },
  { key: "east", label: "East" },
  { key: "west", label: "West" },
] as const;

export type ChartStyle = (typeof CHART_STYLE_OPTIONS)[number]["key"];

export const ASCENDANT_OPTIONS = [
  { key: "lagna", label: "Lagna", short: "—" },
  { key: "chandra", label: "Chandra", short: "Mo" },
  { key: "surya", label: "Surya", short: "Su" },
] as const;

/** Rashi name table (1-indexed: RASHI_NAMES[1] = "Aries"). */
export const RASHI_NAMES_EN = [
  "",
  "Aries",
  "Taurus",
  "Gemini",
  "Cancer",
  "Leo",
  "Virgo",
  "Libra",
  "Scorpio",
  "Sagittarius",
  "Capricorn",
  "Aquarius",
  "Pisces",
] as const;

export const RASHI_NAMES_HI = [
  "",
  "मेष",
  "वृषभ",
  "मिथुन",
  "कर्क",
  "सिंह",
  "कन्या",
  "तुला",
  "वृश्चिक",
  "धनु",
  "मकर",
  "कुम्भ",
  "मीन",
] as const;

/** Short 3-letter rashi abbreviation (used in compact South Indian style). */
export const RASHI_ABBR_EN = [
  "",
  "Ari",
  "Tau",
  "Gem",
  "Can",
  "Leo",
  "Vir",
  "Lib",
  "Sco",
  "Sag",
  "Cap",
  "Aqu",
  "Pis",
] as const;

export function rashiLabel(rashi: number, lang: LabelLang): string {
  if (rashi < 1 || rashi > 12) return "";
  return lang === "hindi" ? RASHI_NAMES_HI[rashi] : RASHI_NAMES_EN[rashi];
}

/** Planet abbreviation colour classes (Tailwind utility classes). */
export const PLANET_ABBR_COLOR: Record<string, string> = {
  Su: "text-orange-600",
  Mo: "text-blue-500",
  Ma: "text-red-600",
  Me: "text-emerald-600",
  Ju: "text-yellow-600",
  Ve: "text-pink-500",
  Sa: "text-slate-600",
  Ra: "text-purple-600",
  Ke: "text-gray-500",
};
