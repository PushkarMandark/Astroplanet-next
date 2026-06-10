"use client";

import { cn } from "@/lib/utils";
import {
  KundliChartProps,
  rashiLabel,
  PLANET_ABBR_COLOR,
  planetLabel,
  rashiCellLabel,
} from "@/lib/astrology/chart-types";

/**
 * West Indian Kundli chart.
 *
 * Layout: a 3×3 grid where each of the four CORNER cells is split along
 * its diagonal, producing 8 corner triangles + 4 side rectangles = 12
 * regions surrounding an empty centre.
 *
 * House numbering (clockwise from top-left outer triangle):
 *
 *   ┌──────┬──────┬──────┐
 *   │  1\  │      │  /4  │
 *   │ 12 \ │  2   │ /  3 │
 *   ├──────┼──────┼──────┤
 *   │      │      │      │
 *   │ 11   │  ✦  │  5   │
 *   ├──────┼──────┼──────┤
 *   │ 10 / │      │ \ 7  │
 *   │  /9  │  8   │  6\  │
 *   └──────┴──────┴──────┘
 *
 * The top-left corner is split: outer triangle = house 1, inner = house 12.
 * The top-right corner: outer = house 4, inner = house 3.
 * The bottom-right corner: outer = house 7, inner = house 6.
 * The bottom-left corner: outer = house 10, inner = house 9.
 *
 * (This is a clean stylised West Indian variant — variants differ across
 * regional traditions; the goal here is twelve distinct cells with the
 * ascendant at house 1.)
 */

const SIZE = 400;
const STROKE = "rgba(128,9,9,0.4)";
const LAGNA_FILL = "rgba(128,9,9,0.08)";
const BG_FILL = "rgba(128,9,9,0.03)";

interface Region {
  house: number;
  points: string;
  cx: number;
  cy: number;
  rashiX: number;
  rashiY: number;
  /** Anchor for the rashi name so it stays inside the region near edges. */
  rashiAnchor: "start" | "end";
}

// Grid: each cell is 400/3 ≈ 133.33 wide. We use exact thirds to keep edges clean.
const T = SIZE / 3; // 133.33...
const T2 = (2 * SIZE) / 3; // 266.66...

const REGIONS: Region[] = [
  // Top-left corner cell (0,0)-(T,T) split along the main diagonal.
  // House 1 — upper-right triangle of the cell (outer, larger visual weight)
  {
    house: 1,
    points: `0,0 ${T},0 ${T},${T}`,
    cx: T * 0.66,
    cy: T * 0.33,
    rashiX: T - 8,
    rashiY: 12,
    rashiAnchor: "end",
  },
  // House 12 — lower-left triangle of the same cell
  {
    house: 12,
    points: `0,0 ${T},${T} 0,${T}`,
    cx: T * 0.33,
    cy: T * 0.66,
    rashiX: 8,
    rashiY: T - 12,
    rashiAnchor: "start",
  },
  // Top middle rectangle (T,0)-(T2,T) — House 2
  {
    house: 2,
    points: `${T},0 ${T2},0 ${T2},${T} ${T},${T}`,
    cx: (T + T2) / 2,
    cy: T / 2,
    rashiX: T + 8,
    rashiY: 12,
    rashiAnchor: "start",
  },
  // Top-right corner cell (T2,0)-(SIZE,T) split along the anti-diagonal.
  // House 4 — upper-left triangle (outer)
  {
    house: 4,
    points: `${T2},0 ${SIZE},0 ${T2},${T}`,
    cx: T2 + T * 0.33,
    cy: T * 0.33,
    rashiX: T2 + 8,
    rashiY: 12,
    rashiAnchor: "start",
  },
  // House 3 — lower-right triangle
  {
    house: 3,
    points: `${SIZE},0 ${SIZE},${T} ${T2},${T}`,
    cx: T2 + T * 0.66,
    cy: T * 0.66,
    rashiX: SIZE - 8,
    rashiY: T - 12,
    rashiAnchor: "end",
  },
  // Right middle rectangle (T2,T)-(SIZE,T2) — House 5
  {
    house: 5,
    points: `${T2},${T} ${SIZE},${T} ${SIZE},${T2} ${T2},${T2}`,
    cx: (T2 + SIZE) / 2,
    cy: (T + T2) / 2,
    rashiX: SIZE - 8,
    rashiY: T + 12,
    rashiAnchor: "end",
  },
  // Bottom-right corner cell (T2,T2)-(SIZE,SIZE) split along the main diagonal.
  // House 7 — lower-left triangle (outer)
  {
    house: 7,
    points: `${T2},${T2} ${SIZE},${SIZE} ${T2},${SIZE}`,
    cx: T2 + T * 0.33,
    cy: T2 + T * 0.66,
    rashiX: T2 + 8,
    rashiY: SIZE - 12,
    rashiAnchor: "start",
  },
  // House 6 — upper-right triangle
  {
    house: 6,
    points: `${T2},${T2} ${SIZE},${T2} ${SIZE},${SIZE}`,
    cx: T2 + T * 0.66,
    cy: T2 + T * 0.33,
    rashiX: SIZE - 8,
    rashiY: T2 + 12,
    rashiAnchor: "end",
  },
  // Bottom middle rectangle (T,T2)-(T2,SIZE) — House 8
  {
    house: 8,
    points: `${T},${T2} ${T2},${T2} ${T2},${SIZE} ${T},${SIZE}`,
    cx: (T + T2) / 2,
    cy: (T2 + SIZE) / 2,
    rashiX: T + 8,
    rashiY: SIZE - 12,
    rashiAnchor: "start",
  },
  // Bottom-left corner cell (0,T2)-(T,SIZE) split along the anti-diagonal.
  // House 10 — upper-right triangle (outer)
  {
    house: 10,
    points: `0,${T2} ${T},${T2} 0,${SIZE}`,
    cx: T * 0.33,
    cy: T2 + T * 0.33,
    rashiX: 8,
    rashiY: T2 + 12,
    rashiAnchor: "start",
  },
  // House 9 — lower-right triangle
  {
    house: 9,
    points: `${T},${T2} ${T},${SIZE} 0,${SIZE}`,
    cx: T * 0.66,
    cy: T2 + T * 0.66,
    rashiX: T - 8,
    rashiY: SIZE - 12,
    rashiAnchor: "end",
  },
  // Left middle rectangle (0,T)-(T,T2) — House 11
  {
    house: 11,
    points: `0,${T} ${T},${T} ${T},${T2} 0,${T2}`,
    cx: T / 2,
    cy: (T + T2) / 2,
    rashiX: 8,
    rashiY: T + 12,
    rashiAnchor: "start",
  },
];

export function WestIndianChart({
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
          aria-label="West Indian Kundli chart"
        >
          <rect
            x={0}
            y={0}
            width={SIZE}
            height={SIZE}
            fill={BG_FILL}
            stroke={STROKE}
            strokeWidth={1.5}
          />

          {/* Centre block label */}
          <rect
            x={T}
            y={T}
            width={T}
            height={T}
            fill="rgba(128,9,9,0.04)"
            stroke={STROKE}
            strokeWidth={1}
          />
          <text
            x={SIZE / 2}
            y={SIZE / 2 - 6}
            fontSize="13"
            fill="rgba(128,9,9,0.7)"
            textAnchor="middle"
            dominantBaseline="middle"
            fontFamily="Playfair Display, serif"
          >
            {labelLang === "hindi" ? "पश्चिमी" : "West Indian"}
          </text>
          <text
            x={SIZE / 2}
            y={SIZE / 2 + 12}
            fontSize="10"
            fill="#6b7280"
            textAnchor="middle"
            dominantBaseline="middle"
          >
            {labelLang === "hindi" ? "लग्न" : "Lagna"}:{" "}
            {rashiLabel(data.ascendantRashi, labelLang)}
          </text>

          {REGIONS.map((r) => {
            const rashi = data.houseRashi[r.house] ?? 0;
            const planets = data.housePlanets[r.house] ?? [];
            const isLagna = r.house === 1;
            return (
              <g key={r.house}>
                <polygon
                  points={r.points}
                  fill={isLagna ? LAGNA_FILL : "transparent"}
                  stroke={STROKE}
                  strokeWidth={1}
                />
                <text
                  x={r.rashiX}
                  y={r.rashiY}
                  fontSize="9"
                  fontWeight="500"
                  fill="#6b7280"
                  textAnchor={r.rashiAnchor}
                  dominantBaseline="middle"
                >
                  {rashiCellLabel(rashi, labelLang)}
                </text>
                {isLagna ? (
                  <text
                    x={r.cx}
                    y={r.cy - 14}
                    fontSize="8"
                    fill="rgba(128,9,9,0.7)"
                    textAnchor="middle"
                    dominantBaseline="middle"
                    fontWeight={700}
                  >
                    L
                  </text>
                ) : null}
                <foreignObject
                  x={r.cx - 40}
                  y={r.cy - 8}
                  width={80}
                  height={22}
                >
                  <div className="flex flex-wrap items-center justify-center gap-x-1 gap-y-0 leading-none">
                    {planets.map((p, i) => (
                      <span
                        key={`${r.house}-${p}-${i}`}
                        className={cn(
                          "text-[10px] sm:text-xs font-bold",
                          PLANET_ABBR_COLOR[p] ?? "text-gray-700"
                        )}
                      >
                        {planetLabel(p, labelLang)}
                      </span>
                    ))}
                  </div>
                </foreignObject>
              </g>
            );
          })}
        </svg>
      </div>
    </div>
  );
}
