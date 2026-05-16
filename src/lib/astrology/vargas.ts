/**
 * Varga (divisional chart) data layer.
 *
 * Converts `Kundli` / `VargaChart` objects produced by `@ishubhamx/panchangam-js`
 * into the project's neutral `ChartData` shape so that all chart-style renderers
 * (North/South/East/West Indian) can consume a single uniform input.
 *
 * Conversion rules (whole-sign houses):
 *   - house 1 = ascendant rashi
 *   - house N (1..12) sits on rashi  ((ascRashi + N - 2) mod 12) + 1
 *   - For each planet whose rashi is R, its house is ((R - ascRashi + 12) mod 12) + 1
 */

import type { Kundli, VargaChart } from "@ishubhamx/panchangam-js";
import type { ChartData, VargaKey } from "./chart-types";
import { VARGA_OPTIONS, clampRashi } from "./chart-types";

/**
 * Maps every planet-name shape the library may emit (capitalised: "Sun",
 * lowercased: "sun", or already an abbreviation: "Su") to its 2-letter code.
 */
export const PLANET_NAME_TO_ABBR: Record<string, string> = {
  // Capitalised (Kundli.houses[].planets and most varga outputs)
  Sun: "Su",
  Moon: "Mo",
  Mars: "Ma",
  Mercury: "Me",
  Jupiter: "Ju",
  Venus: "Ve",
  Saturn: "Sa",
  Rahu: "Ra",
  Ketu: "Ke",
  // Lowercased (in case lib normalises)
  sun: "Su",
  moon: "Mo",
  mars: "Ma",
  mercury: "Me",
  jupiter: "Ju",
  venus: "Ve",
  saturn: "Sa",
  rahu: "Ra",
  ketu: "Ke",
  // Already abbreviated (identity)
  Su: "Su",
  Mo: "Mo",
  Ma: "Ma",
  Me: "Me",
  Ju: "Ju",
  Ve: "Ve",
  Sa: "Sa",
  Ra: "Ra",
  Ke: "Ke",
};

/** Best-effort lookup that falls back to a capitalised 2-char slice. */
function toAbbr(planet: unknown): string {
  if (typeof planet !== "string" || planet.length === 0) return "";
  const hit = PLANET_NAME_TO_ABBR[planet];
  if (hit) return hit;
  return planet.charAt(0).toUpperCase() + planet.slice(1, 2).toLowerCase();
}

/** house number (1..12) that rashi `r` occupies given ascendant rashi `asc`. */
function houseOf(r: number, asc: number): number {
  return ((clampRashi(r) - clampRashi(asc) + 12) % 12) + 1;
}

/** rashi number sitting in house `h` given ascendant rashi `asc`. */
function rashiAtHouse(h: number, asc: number): number {
  return ((clampRashi(asc) + h - 2) % 12) + 1;
}

/**
 * Look up the rashi of a planet in a planets bag, tolerating different
 * casing. Returns `undefined` if no entry has a usable `rashi`.
 */
function planetRashi(
  planets: Record<string, { rashi?: number }> | undefined,
  name: string,
): number | undefined {
  if (!planets) return undefined;
  const candidates = [name, name.toLowerCase(), name.toUpperCase()];
  for (const key of candidates) {
    const r = planets[key]?.rashi;
    if (typeof r === "number" && Number.isFinite(r)) return clampRashi(r);
  }
  return undefined;
}

/**
 * Convert a `VargaChart` (D2..D60) from the library to our `ChartData`.
 * Uses the chart's own ascendant — does NOT inherit the D1 lagna.
 */
export function vargaToChartData(varga: VargaChart): ChartData {
  const ascendantRashi = clampRashi(varga?.ascendant?.rashi ?? 1);

  const houseRashi: Record<number, number> = {};
  const housePlanets: Record<number, string[]> = {};
  for (let h = 1; h <= 12; h++) {
    houseRashi[h] = rashiAtHouse(h, ascendantRashi);
    housePlanets[h] = [];
  }

  // Prefer the library-supplied houses[] (already grouped) when present.
  if (Array.isArray(varga?.houses) && varga.houses.length > 0) {
    for (const bhava of varga.houses) {
      const h = bhava?.number;
      if (!h || h < 1 || h > 12) continue;
      houseRashi[h] = clampRashi(bhava.rashi);
      if (Array.isArray(bhava.planets)) {
        housePlanets[h] = bhava.planets.map(toAbbr).filter(Boolean);
      }
    }
  } else if (varga?.planets) {
    // Fallback: derive from planets' rashi
    for (const [name, pos] of Object.entries(varga.planets)) {
      const h = houseOf(pos.rashi, ascendantRashi);
      const abbr = toAbbr(name);
      if (abbr) housePlanets[h].push(abbr);
    }
  }

  const moonRashi = planetRashi(varga?.planets, "Moon");
  const sunRashi = planetRashi(varga?.planets, "Sun");

  return { houseRashi, housePlanets, ascendantRashi, moonRashi, sunRashi };
}

/**
 * Convert the D1 (rashi) chart from a `Kundli`. Uses `kundli.houses` directly.
 */
export function d1ToChartData(kundli: Kundli): ChartData {
  const ascendantRashi = clampRashi(kundli?.ascendant?.rashi ?? 1);
  const houseRashi: Record<number, number> = {};
  const housePlanets: Record<number, string[]> = {};
  for (let h = 1; h <= 12; h++) {
    houseRashi[h] = rashiAtHouse(h, ascendantRashi);
    housePlanets[h] = [];
  }

  if (Array.isArray(kundli?.houses)) {
    for (const bhava of kundli.houses) {
      const h = bhava?.number;
      if (!h || h < 1 || h > 12) continue;
      houseRashi[h] = clampRashi(bhava.rashi);
      if (Array.isArray(bhava.planets)) {
        housePlanets[h] = bhava.planets.map(toAbbr).filter(Boolean);
      }
    }
  }

  const moonRashi = planetRashi(kundli?.planets, "Moon");
  const sunRashi = planetRashi(kundli?.planets, "Sun");

  return { houseRashi, housePlanets, ascendantRashi, moonRashi, sunRashi };
}

const VARGA_KEYS = VARGA_OPTIONS.map((v) => v.key) as readonly VargaKey[];

/**
 * Build a record of all 16 supported varga charts keyed by `VargaKey`.
 *
 * D1 is always built from `kundli.houses` (the lagna chart). For D2..D60 we
 * prefer `kundli.vargas` (already computed by `getKundli`) and fall back to
 * an empty placeholder if a particular varga is missing on the input.
 */
export function getAllVargaCharts(kundli: Kundli): Record<VargaKey, ChartData> {
  const out = {} as Record<VargaKey, ChartData>;
  const supplied = kundli?.vargas ?? {};

  for (const key of VARGA_KEYS) {
    if (key === "D1") {
      out[key] = d1ToChartData(kundli);
      continue;
    }
    const chart = supplied[key];
    if (chart) {
      out[key] = vargaToChartData(chart);
    } else {
      // Empty placeholder so consumers never get `undefined`. Falls back to
      // the D1 ascendant + D1 Moon/Sun rashi so Chandra/Surya Lagna still works.
      const ascendantRashi = clampRashi(kundli?.ascendant?.rashi ?? 1);
      const houseRashi: Record<number, number> = {};
      const housePlanets: Record<number, string[]> = {};
      for (let h = 1; h <= 12; h++) {
        houseRashi[h] = rashiAtHouse(h, ascendantRashi);
        housePlanets[h] = [];
      }
      out[key] = {
        houseRashi,
        housePlanets,
        ascendantRashi,
        moonRashi: planetRashi(kundli?.planets, "Moon"),
        sunRashi: planetRashi(kundli?.planets, "Sun"),
      };
    }
  }

  return out;
}
