"use client";

import { cn } from "@/lib/utils";
import {
  KundliChartProps,
  rashiLabel,
  PLANET_ABBR_COLOR,
} from "@/lib/astrology/chart-types";

/**
 * North Indian (lotus-petal) Kundli chart — classical curved style.
 *
 * Topology is unchanged from the straight-diamond version (same 12 regions
 * sharing the same vertices), but the 8 segments running from each side
 * midpoint to the two adjacent corner-midpoints are rendered as quadratic
 * Bezier curves bowing outward toward the nearest outer corner. The two
 * main diagonals (TL→BR and TR→BL) and the outer square stay straight,
 * preserving the swastika-like center cross of the traditional kundli.
 *
 * House numbering (anti-clockwise from top petal):
 *   1 = top petal           7 = bottom petal
 *   2 = top-left leaf       8 = bottom-right leaf
 *   3 = top-left corner     9 = bottom-right corner
 *   4 = left petal         10 = right petal
 *   5 = bottom-left corner 11 = top-right corner
 *   6 = bottom-left leaf   12 = top-right leaf
 */

const SIZE = 400;
const STROKE = "rgba(128,9,9,0.55)";
const STROKE_THIN = "rgba(128,9,9,0.4)";
const LAGNA_FILL = "rgba(128,9,9,0.08)";
const BG_FILL = "rgba(128,9,9,0.03)";

/**
 * Pre-computed quadratic Bezier curve segments for the 8 lines that bow
 * outward from side midpoints to corner-midpoints. Each entry is the
 * `Q ctrlX ctrlY endX endY` fragment continuing from the prior point.
 *
 * Control points are offset ~40px from the straight-line midpoint along
 * the perpendicular pointing to the nearest outer corner (TL/TR/BL/BR).
 */
const Q = {
  // top half ─────────────────────────────────
  T_CL: "Q 120 20 100 100", // T(200,0)   → CL(100,100), bowing toward TL
  CL_T: "Q 120 20 200 0", // CL          → T
  T_CR: "Q 280 20 300 100", // T          → CR(300,100), bowing toward TR
  CR_T: "Q 280 20 200 0", // CR          → T
  // left half ────────────────────────────────
  L_CL: "Q 20 120 100 100", // L(0,200)   → CL,           bowing toward TL
  CL_L: "Q 20 120 0 200", // CL          → L
  L_CLp: "Q 20 280 100 300", // L          → CL'(100,300), bowing toward BL
  CLp_L: "Q 20 280 0 200", // CL'         → L
  // bottom half ──────────────────────────────
  B_CLp: "Q 120 380 100 300", // B(200,400) → CL',         bowing toward BL
  CLp_B: "Q 120 380 200 400", // CL'        → B
  B_CRp: "Q 280 380 300 300", // B          → CR'(300,300), bowing toward BR
  CRp_B: "Q 280 380 200 400", // CR'        → B
  // right half ───────────────────────────────
  R_CRp: "Q 380 280 300 300", // R(400,200) → CR',         bowing toward BR
  CRp_R: "Q 380 280 400 200", // CR'        → R
  R_CR: "Q 380 120 300 100", // R          → CR,          bowing toward TR
  CR_R: "Q 380 120 400 200", // CR         → R
} as const;

interface Region {
  house: number;
  /** SVG path describing the region outline. */
  path: string;
  /** Approx center where planet abbreviations render. */
  cx: number;
  cy: number;
  /** Where the rashi number renders (small, near a corner). */
  rashiX: number;
  rashiY: number;
}

const REGIONS: Region[] = [
  // House 1 — top petal: T → CL → C → CR → T (outer arms curve)
  {
    house: 1,
    path: `M 200 0 ${Q.T_CL} L 200 200 L 300 100 ${Q.CR_T} Z`,
    cx: 200,
    cy: 105,
    rashiX: 200,
    rashiY: 30,
  },
  // House 2 — top-left leaf: TL → T → CL → TL  (T→CL curves)
  {
    house: 2,
    path: `M 0 0 L 200 0 ${Q.T_CL} Z`,
    cx: 105,
    cy: 50,
    rashiX: 25,
    rashiY: 18,
  },
  // House 3 — top-left corner: TL → CL → L → TL  (CL→L curves)
  {
    house: 3,
    path: `M 0 0 L 100 100 ${Q.CL_L} Z`,
    cx: 50,
    cy: 105,
    rashiX: 12,
    rashiY: 28,
  },
  // House 4 — left petal: CL → C → CL' → L → CL  (CL'→L and L→CL curve)
  {
    house: 4,
    path: `M 100 100 L 200 200 L 100 300 ${Q.CLp_L} ${Q.L_CL} Z`,
    cx: 105,
    cy: 200,
    rashiX: 30,
    rashiY: 200,
  },
  // House 5 — bottom-left corner: L → CL' → BL → L  (L→CL' curves)
  {
    house: 5,
    path: `M 0 200 ${Q.L_CLp} L 0 400 Z`,
    cx: 50,
    cy: 295,
    rashiX: 12,
    rashiY: 374,
  },
  // House 6 — bottom-left leaf: BL → B → CL' → BL  (B→CL' curves)
  {
    house: 6,
    path: `M 0 400 L 200 400 ${Q.B_CLp} Z`,
    cx: 105,
    cy: 350,
    rashiX: 25,
    rashiY: 386,
  },
  // House 7 — bottom petal: B → CL' → C → CR' → B
  {
    house: 7,
    path: `M 200 400 ${Q.B_CLp} L 200 200 L 300 300 ${Q.CRp_B} Z`,
    cx: 200,
    cy: 295,
    rashiX: 200,
    rashiY: 372,
  },
  // House 8 — bottom-right leaf: B → CR' → BR → B  (B→CR' curves)
  {
    house: 8,
    path: `M 200 400 ${Q.B_CRp} L 400 400 Z`,
    cx: 295,
    cy: 350,
    rashiX: 376,
    rashiY: 386,
  },
  // House 9 — bottom-right corner: BR → R → CR' → BR  (R→CR' curves)
  {
    house: 9,
    path: `M 400 400 L 400 200 ${Q.R_CRp} Z`,
    cx: 350,
    cy: 295,
    rashiX: 388,
    rashiY: 374,
  },
  // House 10 — right petal: CR → C → CR' → R → CR
  {
    house: 10,
    path: `M 300 100 L 200 200 L 300 300 ${Q.CRp_R} ${Q.R_CR} Z`,
    cx: 295,
    cy: 200,
    rashiX: 372,
    rashiY: 200,
  },
  // House 11 — top-right corner: R → CR → TR → R  (R→CR curves)
  {
    house: 11,
    path: `M 400 200 ${Q.R_CR} L 400 0 Z`,
    cx: 350,
    cy: 105,
    rashiX: 388,
    rashiY: 28,
  },
  // House 12 — top-right leaf: TR → T → CR → TR  (T→CR curves)
  {
    house: 12,
    path: `M 400 0 L 200 0 ${Q.T_CR} Z`,
    cx: 295,
    cy: 50,
    rashiX: 376,
    rashiY: 18,
  },
];

export function NorthIndianChart({
  data,
  labelLang = "english",
  className,
  title,
}: KundliChartProps) {
  return (
    <div className={cn("w-full", className)}>
      {title ? (
        <h3 className="text-center font-playfair text-sm font-semibold text-primary mb-2">
          {title}
        </h3>
      ) : null}
      <div className="relative w-full max-w-md mx-auto aspect-square">
        <svg
          viewBox={`0 0 ${SIZE} ${SIZE}`}
          width="100%"
          height="100%"
          xmlns="http://www.w3.org/2000/svg"
          aria-label="North Indian Kundli chart"
        >
          {/* Outer square */}
          <rect
            x={0}
            y={0}
            width={SIZE}
            height={SIZE}
            fill={BG_FILL}
            stroke={STROKE}
            strokeWidth={2}
            rx={2}
          />

          {/* Region outlines (curved petals + straight corner diagonals) */}
          {REGIONS.map((r) => {
            const isLagna = r.house === 1;
            return (
              <path
                key={`outline-${r.house}`}
                d={r.path}
                fill={isLagna ? LAGNA_FILL : "transparent"}
                stroke={STROKE_THIN}
                strokeWidth={1.2}
                strokeLinejoin="round"
                strokeLinecap="round"
              />
            );
          })}

          {/* Small mandala dot at the center where the main diagonals meet. */}
          <circle cx={200} cy={200} r={3} fill="rgba(128,9,9,0.45)" />

          {/* Labels overlay (rendered on top of the strokes). */}
          {REGIONS.map((r) => {
            const rashi = data.houseRashi[r.house] ?? 0;
            const planets = data.housePlanets[r.house] ?? [];
            const isLagna = r.house === 1;
            return (
              <g key={`labels-${r.house}`}>
                {/* House number (tiny, top corner-ish) */}
                <text
                  x={r.rashiX}
                  y={r.rashiY}
                  fontSize="10"
                  fontWeight="600"
                  fill="rgba(128,9,9,0.55)"
                  textAnchor="middle"
                  dominantBaseline="middle"
                >
                  {r.house}
                </text>
                {/* Rashi number, small below the house number */}
                <text
                  x={r.rashiX}
                  y={r.rashiY + 12}
                  fontSize="9"
                  fill="#9ca3af"
                  textAnchor="middle"
                  dominantBaseline="middle"
                >
                  {rashi || ""}
                </text>
                {/* Lagna marker pill */}
                {isLagna ? (
                  <text
                    x={r.cx}
                    y={r.cy - 14}
                    fontSize="9"
                    fontWeight="700"
                    fill="rgba(128,9,9,0.75)"
                    textAnchor="middle"
                    dominantBaseline="middle"
                  >
                    L
                  </text>
                ) : null}
                {/* Planet abbreviations row */}
                <foreignObject
                  x={r.cx - 48}
                  y={r.cy - 8}
                  width={96}
                  height={28}
                >
                  <div className="flex flex-wrap items-center justify-center gap-x-1 gap-y-0 leading-none">
                    {planets.map((p, i) => (
                      <span
                        key={`${r.house}-${p}-${i}`}
                        className={cn(
                          "text-[10px] sm:text-xs font-bold",
                          PLANET_ABBR_COLOR[p] ?? "text-gray-700",
                        )}
                      >
                        {p}
                      </span>
                    ))}
                  </div>
                </foreignObject>
              </g>
            );
          })}
        </svg>
      </div>
      {/* Ascendant footer note */}
      <p className="text-center text-[10px] text-gray-500 mt-2">
        Lagna: {rashiLabel(data.ascendantRashi, labelLang)}
      </p>
    </div>
  );
}
