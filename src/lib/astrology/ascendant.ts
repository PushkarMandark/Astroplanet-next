/**
 * Ascendant-reference rotation helpers.
 *
 * In Vedic astrology a chart is sometimes read with the Moon (Chandra Lagna)
 * or Sun (Surya Lagna) treated as the 1st house instead of the rising sign
 * (Lagna). These helpers perform a pure rotation of an existing `ChartData`
 * around a new reference rashi.
 *
 * Invariants:
 *   - Total planet count is preserved by `rotateToAscendant`.
 *   - Output is a fresh object — no input mutation.
 */

import type { AscendantReference, ChartData } from "./chart-types";
import { clampRashi } from "./chart-types";

/**
 * Rotate a chart so that `newAscendantRashi` sits at house 1.
 *
 * For every existing entry in `data.houseRashi` (which maps house# -> rashi),
 * we map that rashi to its new house number using the whole-sign rule:
 *
 *     newHouse(r) = ((r - newAsc + 12) mod 12) + 1
 *
 * Planets follow their rashi, so we walk the (oldHouse -> planets) pairs and
 * re-bucket them under the new house derived from that rashi.
 */
export function rotateToAscendant(
  data: ChartData,
  newAscendantRashi: number,
): ChartData {
  const newAsc = clampRashi(newAscendantRashi);

  const houseRashi: Record<number, number> = {};
  const housePlanets: Record<number, string[]> = {};
  for (let h = 1; h <= 12; h++) {
    houseRashi[h] = ((newAsc + h - 2) % 12) + 1;
    housePlanets[h] = [];
  }

  // Re-bucket planets by their rashi (taken from the source houseRashi map).
  for (let oldHouse = 1; oldHouse <= 12; oldHouse++) {
    const rashi = data.houseRashi?.[oldHouse];
    const planets = data.housePlanets?.[oldHouse];
    if (!rashi || !planets || planets.length === 0) continue;
    const r = clampRashi(rashi);
    const newHouse = ((r - newAsc + 12) % 12) + 1;
    housePlanets[newHouse] = housePlanets[newHouse].concat(planets);
  }

  // Moon/Sun rashi are invariant under whole-sign rotation — the planets'
  // signs don't change, only which house holds which sign. Carry them
  // through so Chandra/Surya Lagna toggling stays correct on rotated views.
  return {
    houseRashi,
    housePlanets,
    ascendantRashi: newAsc,
    moonRashi: data.moonRashi,
    sunRashi: data.sunRashi,
  };
}

/**
 * Resolve a chart for a given ascendant reference.
 *
 *   - "lagna"   → returns `data` unchanged (the original lagna chart).
 *   - "chandra" → rotates so the Moon's rashi sits at house 1.
 *   - "surya"   → rotates so the Sun's rashi sits at house 1.
 *
 * Moon/Sun rashi are read from the chart itself (`data.moonRashi`/`sunRashi`)
 * so that each varga uses its OWN Moon and Sun positions. If not present,
 * caller-supplied fallbacks are used.
 *
 * Returns `null` if the input chart is missing or the requested reference
 * rashi cannot be placed (e.g. 0 / undefined).
 */
export function applyAscendantReference(
  data: ChartData | null | undefined,
  reference: AscendantReference,
  fallbackMoonRashi?: number,
  fallbackSunRashi?: number,
): ChartData | null {
  if (!data) return null;
  if (reference === "lagna") return data;

  const target =
    reference === "chandra"
      ? data.moonRashi ?? fallbackMoonRashi
      : data.sunRashi ?? fallbackSunRashi;
  if (
    typeof target !== "number" ||
    !Number.isFinite(target) ||
    target < 1 ||
    target > 12
  ) {
    return null;
  }

  return rotateToAscendant(data, target);
}
