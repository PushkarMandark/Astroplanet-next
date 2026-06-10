"use client";

import { cn } from "@/lib/utils";
import {
  KundliChartProps,
  rashiLabel,
  rashiCellLabel,
  PLANET_ABBR_COLOR,
  planetLabel,
} from "@/lib/astrology/chart-types";

/**
 * South Indian (fixed-zodiac) Kundli chart.
 *
 * 4×4 perimeter grid. The 12 outer cells are fixed to specific rashis
 * (regardless of ascendant); the centre 2×2 is a label block.
 *
 * Rashi map (row,col) → rashi number:
 *   Top row    : Pisces(12)  Aries(1)   Taurus(2)  Gemini(3)
 *   Right col  : Cancer(4)   Leo(5)
 *   Bottom row : Sagittarius(9) Capricorn(10) Aquarius(11)  – wait, see below
 *
 * Standard fixed-zodiac mapping used here (clockwise from Aries at top-2nd):
 *   (0,0)=12  (0,1)=1   (0,2)=2   (0,3)=3
 *   (1,3)=4
 *   (2,3)=5
 *   (3,3)=6   (3,2)=7   (3,1)=8   (3,0)=9
 *   (2,0)=10
 *   (1,0)=11
 *
 * The cell holding the ascendant rashi gets an "L" badge.
 */

interface CellPos {
  row: number;
  col: number;
  rashi: number;
}

const PERIMETER: CellPos[] = [
  { row: 0, col: 0, rashi: 12 },
  { row: 0, col: 1, rashi: 1 },
  { row: 0, col: 2, rashi: 2 },
  { row: 0, col: 3, rashi: 3 },
  { row: 1, col: 3, rashi: 4 },
  { row: 2, col: 3, rashi: 5 },
  { row: 3, col: 3, rashi: 6 },
  { row: 3, col: 2, rashi: 7 },
  { row: 3, col: 1, rashi: 8 },
  { row: 3, col: 0, rashi: 9 },
  { row: 2, col: 0, rashi: 10 },
  { row: 1, col: 0, rashi: 11 },
];

export function SouthIndianChart({
  data,
  labelLang = "english",
  className,
  title,
}: KundliChartProps) {
  // Reverse-lookup: rashi → planets sitting in the house that holds that rashi.
  const planetsByRashi: Record<number, string[]> = {};
  for (let h = 1; h <= 12; h++) {
    const r = data.houseRashi[h];
    if (r) {
      planetsByRashi[r] = data.housePlanets[h] ?? [];
    }
  }

  // Build a quick lookup of rashi at (row,col).
  const rashiAt: Record<string, number> = {};
  for (const p of PERIMETER) {
    rashiAt[`${p.row},${p.col}`] = p.rashi;
  }

  // Render a 4x4 grid. Inner 2x2 (rows 1-2, cols 1-2) is the centre label.
  return (
    <div className={cn("w-full", className)}>
      {title ? (
        <h3 className="text-center font-playfair text-sm font-semibold text-primary mb-2">
          {title}
        </h3>
      ) : null}
      <div className="relative w-full max-w-md mx-auto aspect-square">
        <div className="absolute inset-0 grid grid-cols-4 grid-rows-4 border-2 border-primary/40 rounded-md overflow-hidden bg-primary/[0.03]">
          {Array.from({ length: 16 }).map((_, idx) => {
            const row = Math.floor(idx / 4);
            const col = idx % 4;
            const isInner = row >= 1 && row <= 2 && col >= 1 && col <= 2;
            if (isInner) {
              // Only render the single centred label cell on the first inner index
              if (row === 1 && col === 1) {
                return (
                  <div
                    key={idx}
                    className="col-span-2 row-span-2 flex flex-col items-center justify-center bg-primary/[0.04]"
                  >
                    <span className="font-playfair text-primary text-sm sm:text-base font-semibold">
                      {labelLang === "hindi" ? "जन्म कुंडली" : "Rashi Chart"}
                    </span>
                    <span className="text-[10px] text-gray-500 mt-1">
                      {labelLang === "hindi" ? "लग्न" : "Lagna"}:{" "}
                      {rashiLabel(data.ascendantRashi, labelLang)}
                    </span>
                  </div>
                );
              }
              return null;
            }
            const rashi = rashiAt[`${row},${col}`] ?? 0;
            const planets = planetsByRashi[rashi] ?? [];
            const isLagna = rashi === data.ascendantRashi;
            return (
              <div
                key={idx}
                className={cn(
                  "relative border border-primary/30 p-1 flex flex-col",
                  isLagna && "bg-primary/[0.08]"
                )}
              >
                <div className="flex items-center justify-between">
                  <span className="text-[9px] text-gray-500 font-medium">
                    {rashiCellLabel(rashi, labelLang)}
                  </span>
                  {isLagna ? (
                    <span className="text-[8px] bg-primary text-white rounded px-1 leading-tight">
                      L
                    </span>
                  ) : null}
                </div>
                <div className="flex-1 flex flex-wrap items-center justify-center gap-x-1 gap-y-0 leading-none">
                  {planets.map((p, i) => (
                    <span
                      key={`${rashi}-${p}-${i}`}
                      className={cn(
                        "text-[10px] sm:text-xs font-bold",
                        PLANET_ABBR_COLOR[p] ?? "text-gray-700"
                      )}
                    >
                      {planetLabel(p, labelLang)}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
