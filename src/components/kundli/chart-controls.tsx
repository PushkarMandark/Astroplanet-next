"use client";

/**
 * Selector UI for the kundli chart panel.
 *
 * Three controlled, presentational components:
 *   - <ChartStyleSwitcher>   N / S / E / W layout toggle
 *   - <VargaSelector>        D1 .. D60 dropdown
 *   - <AscendantSwitcher>    Lagna / Chandra / Surya reference toggle
 *
 * All components are stateless — the parent owns the value and `onChange`.
 */

import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import {
  ASCENDANT_OPTIONS,
  CHART_STYLE_OPTIONS,
  VARGA_OPTIONS,
  type AscendantReference,
  type ChartStyle,
  type VargaKey,
} from "@/lib/astrology/chart-types";

/* ── Chart style switcher ─────────────────────────────────── */

export interface ChartStyleSwitcherProps {
  value: ChartStyle;
  onChange: (v: ChartStyle) => void;
  className?: string;
}

export function ChartStyleSwitcher({
  value,
  onChange,
  className,
}: ChartStyleSwitcherProps) {
  return (
    <div
      role="radiogroup"
      aria-label="Chart style"
      className={cn(
        "inline-flex flex-wrap items-center gap-1 rounded-xl border border-amber-100 bg-amber-50/40 p-1",
        className,
      )}
    >
      {CHART_STYLE_OPTIONS.map((opt) => {
        const active = opt.key === value;
        return (
          <Button
            key={opt.key}
            type="button"
            role="radio"
            aria-checked={active}
            size="sm"
            variant={active ? "default" : "ghost"}
            onClick={() => onChange(opt.key)}
            className={cn(
              "h-8 rounded-lg px-3 text-xs font-medium",
              active
                ? "bg-primary text-primary-foreground shadow-sm"
                : "text-gray-700 hover:bg-amber-100/70",
            )}
          >
            {opt.label}
          </Button>
        );
      })}
    </div>
  );
}

/* ── Varga selector ───────────────────────────────────────── */

export interface VargaSelectorProps {
  value: VargaKey;
  onChange: (v: VargaKey) => void;
  className?: string;
}

export function VargaSelector({
  value,
  onChange,
  className,
}: VargaSelectorProps) {
  const current = VARGA_OPTIONS.find((v) => v.key === value);

  return (
    <div className={cn("flex flex-col gap-1", className)}>
      <label
        htmlFor="varga-selector"
        className="text-[11px] font-medium uppercase tracking-wide text-gray-500"
      >
        Divisional chart
      </label>
      <Select
        value={value}
        onValueChange={(v) => onChange(v as VargaKey)}
      >
        <SelectTrigger
          id="varga-selector"
          aria-label="Select divisional chart"
          className="h-9 w-full min-w-[180px] rounded-lg border-amber-200 bg-white text-sm sm:w-[220px]"
        >
          <SelectValue placeholder="Select varga" />
        </SelectTrigger>
        <SelectContent className="max-h-[320px]">
          {VARGA_OPTIONS.map((opt) => (
            <SelectItem
              key={opt.key}
              value={opt.key}
              className="text-sm"
            >
              <span className="font-semibold text-gray-900">{opt.key}</span>
              <span className="ml-1.5 text-gray-700">— {opt.name}</span>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      {current?.description && (
        <p className="text-[11px] text-gray-500">{current.description}</p>
      )}
    </div>
  );
}

/* ── Ascendant reference switcher ─────────────────────────── */

export interface AscendantSwitcherProps {
  value: AscendantReference;
  onChange: (v: AscendantReference) => void;
  className?: string;
}

export function AscendantSwitcher({
  value,
  onChange,
  className,
}: AscendantSwitcherProps) {
  return (
    <div className={cn("flex flex-col gap-1", className)}>
      <span className="text-[11px] font-medium uppercase tracking-wide text-gray-500">
        View from
      </span>
      <div
        role="radiogroup"
        aria-label="Ascendant reference"
        className="inline-flex items-center gap-1 rounded-xl border border-amber-100 bg-amber-50/40 p-1"
      >
        {ASCENDANT_OPTIONS.map((opt) => {
          const active = opt.key === value;
          return (
            <Button
              key={opt.key}
              type="button"
              role="radio"
              aria-checked={active}
              size="sm"
              variant={active ? "default" : "ghost"}
              onClick={() => onChange(opt.key)}
              className={cn(
                "h-8 rounded-lg px-3 text-xs font-medium",
                active
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "text-gray-700 hover:bg-amber-100/70",
              )}
            >
              {opt.label}
              {opt.short !== "—" && (
                <span className="ml-1 text-[10px] opacity-70">
                  {opt.short}
                </span>
              )}
            </Button>
          );
        })}
      </div>
    </div>
  );
}
