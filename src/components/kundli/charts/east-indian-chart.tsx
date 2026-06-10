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
 * East Indian (Bengali) Kundli chart.
 *
 * 12 outer regions: 4 corner squares + 4 side triangles + 4 inner squares
 * arranged around an empty centre area. House numbering starts at
 * top-left corner and proceeds CLOCKWISE around the chart.
 *
 *   House 1  = top-left corner square
 *   House 2  = top side triangle
 *   House 3  = top-right corner square
 *   House 4  = inner top square (between corner squares, just inside)
 *   House 5  = right side triangle
 *   House 6  = inner right square
 *   House 7  = bottom-right corner square
 *   House 8  = bottom side triangle
 *   House 9  = bottom-left corner square
 *   House 10 = inner bottom square
 *   House 11 = left side triangle
 *   House 12 = inner left square
 *
 * Geometry: 400x400, 100-unit corner squares, 100x100 inner squares,
 * centred around C(200,200) with 200x200 inner empty region.
 */

const SIZE = 400;
const STROKE = "rgba(128,9,9,0.4)";
const LAGNA_FILL = "rgba(128,9,9,0.08)";
const BG_FILL = "rgba(128,9,9,0.03)";

interface Region {
  house: number;
  /** SVG polygon points. */
  points: string;
  cx: number;
  cy: number;
  rashiX: number;
  rashiY: number;
  /** Anchor for the rashi name so it stays inside the region near edges. */
  rashiAnchor: "start" | "middle" | "end";
}

const REGIONS: Region[] = [
  // House 1 — top-left corner square (0,0)-(100,100)
  {
    house: 1,
    points: "0,0 100,0 100,100 0,100",
    cx: 50,
    cy: 50,
    rashiX: 8,
    rashiY: 12,
    rashiAnchor: "start",
  },
  // House 2 — top side triangle: (100,0)→(300,0)→(200,100)
  {
    house: 2,
    points: "100,0 300,0 200,100",
    cx: 200,
    cy: 35,
    rashiX: 200,
    rashiY: 12,
    rashiAnchor: "middle",
  },
  // House 3 — top-right corner square (300,0)-(400,100)
  {
    house: 3,
    points: "300,0 400,0 400,100 300,100",
    cx: 350,
    cy: 50,
    rashiX: 392,
    rashiY: 12,
    rashiAnchor: "end",
  },
  // House 4 — inner top-left cell (100,100)-(200,200)
  {
    house: 4,
    points: "100,100 200,100 200,200 100,200",
    cx: 150,
    cy: 150,
    rashiX: 106,
    rashiY: 112,
    rashiAnchor: "start",
  },
  // House 5 — right side triangle: (400,100)→(400,300)→(300,200)
  {
    house: 5,
    points: "400,100 400,300 300,200",
    cx: 365,
    cy: 200,
    rashiX: 392,
    rashiY: 108,
    rashiAnchor: "end",
  },
  // House 6 — inner top-right cell (200,100)-(300,200)
  {
    house: 6,
    points: "200,100 300,100 300,200 200,200",
    cx: 250,
    cy: 150,
    rashiX: 206,
    rashiY: 112,
    rashiAnchor: "start",
  },
  // House 7 — bottom-right corner square (300,300)-(400,400)
  {
    house: 7,
    points: "300,300 400,300 400,400 300,400",
    cx: 350,
    cy: 350,
    rashiX: 392,
    rashiY: 392,
    rashiAnchor: "end",
  },
  // House 8 — bottom side triangle: (100,400)→(300,400)→(200,300)
  {
    house: 8,
    points: "100,400 300,400 200,300",
    cx: 200,
    cy: 365,
    rashiX: 200,
    rashiY: 392,
    rashiAnchor: "middle",
  },
  // House 9 — bottom-left corner square (0,300)-(100,400)
  {
    house: 9,
    points: "0,300 100,300 100,400 0,400",
    cx: 50,
    cy: 350,
    rashiX: 8,
    rashiY: 392,
    rashiAnchor: "start",
  },
  // House 10 — inner bottom-right cell (200,200)-(300,300)
  {
    house: 10,
    points: "200,200 300,200 300,300 200,300",
    cx: 250,
    cy: 250,
    rashiX: 206,
    rashiY: 212,
    rashiAnchor: "start",
  },
  // House 11 — left side triangle: (0,100)→(0,300)→(100,200)
  {
    house: 11,
    points: "0,100 0,300 100,200",
    cx: 35,
    cy: 200,
    rashiX: 8,
    rashiY: 108,
    rashiAnchor: "start",
  },
  // House 12 — inner bottom-left cell (100,200)-(200,300)
  {
    house: 12,
    points: "100,200 200,200 200,300 100,300",
    cx: 150,
    cy: 250,
    rashiX: 106,
    rashiY: 212,
    rashiAnchor: "start",
  },
];

export function EastIndianChart({
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
          aria-label="East Indian Kundli chart"
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
          {/* Centre title text */}
          <text
            x={200}
            y={200}
            fontSize="14"
            fill="rgba(128,9,9,0.7)"
            textAnchor="middle"
            dominantBaseline="middle"
            fontFamily="Playfair Display, serif"
          >
            {labelLang === "hindi" ? "जन्म कुंडली" : "Janma Kundli"}
          </text>
          <text
            x={200}
            y={222}
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
                  x={r.cx - 45}
                  y={r.cy - 8}
                  width={90}
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
