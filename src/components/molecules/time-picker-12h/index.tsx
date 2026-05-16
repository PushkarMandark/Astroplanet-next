"use client";

import { useLayoutEffect, useMemo, useRef, useState } from "react";
import { Clock, Sunrise, Moon, ChevronUp, ChevronDown } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export interface TimePicker12hProps {
  /** 24-hour "HH:MM" string, or empty string for unset */
  value: string;
  onChange: (next: string) => void;
  id?: string;
  placeholder?: string;
  className?: string;
}

type Meridiem = "AM" | "PM";

function parse(value: string) {
  if (!value || !/^\d{1,2}:\d{2}$/.test(value)) {
    return {
      hour12: 9 as number,
      minute: 0 as number,
      meridiem: "AM" as Meridiem,
      hasValue: false,
    };
  }
  const [h, m] = value.split(":").map(Number);
  const meridiem: Meridiem = h >= 12 ? "PM" : "AM";
  let hour12 = h % 12;
  if (hour12 === 0) hour12 = 12;
  return { hour12, minute: m, meridiem, hasValue: true };
}

function to24h(hour12: number, minute: number, meridiem: Meridiem) {
  let h = hour12 % 12;
  if (meridiem === "PM") h += 12;
  return `${String(h).padStart(2, "0")}:${String(minute).padStart(2, "0")}`;
}

function format12hLabel(hour12: number, minute: number, meridiem: Meridiem) {
  return `${hour12}:${String(minute).padStart(2, "0")} ${meridiem}`;
}

export function TimePicker12h({
  value,
  onChange,
  id,
  placeholder = "Select time",
  className,
}: TimePicker12hProps) {
  const parsed = useMemo(() => parse(value), [value]);
  const [open, setOpen] = useState(false);

  const { hour12, minute, meridiem, hasValue } = parsed;

  const hourListRef = useRef<HTMLDivElement>(null);
  const minuteListRef = useRef<HTMLDivElement>(null);

  // Scroll active item into view when popover opens. Read-only DOM work, no setState.
  useLayoutEffect(() => {
    if (!open) return;
    const scrollActive = (container: HTMLDivElement | null) => {
      if (!container) return;
      const active = container.querySelector<HTMLElement>("[data-active='true']");
      if (active) {
        active.scrollIntoView({ block: "center" });
      }
    };
    scrollActive(hourListRef.current);
    scrollActive(minuteListRef.current);
  }, [open]);

  const handleHour = (h: number) => onChange(to24h(h, minute, meridiem));
  const handleMinute = (m: number) => onChange(to24h(hour12, m, meridiem));
  const handleMeridiem = (mer: Meridiem) => onChange(to24h(hour12, minute, mer));

  const adjustMinute = (delta: number) => {
    const next = (minute + delta + 60) % 60;
    handleMinute(next);
  };
  const adjustHour = (delta: number) => {
    let next = hour12 + delta;
    if (next > 12) next = 1;
    if (next < 1) next = 12;
    handleHour(next);
  };

  const setNow = () => {
    const now = new Date();
    const h = now.getHours();
    const m = now.getMinutes();
    onChange(`${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`);
  };

  const displayLabel = hasValue ? format12hLabel(hour12, minute, meridiem) : "";

  const hours = Array.from({ length: 12 }, (_, i) => i + 1);
  const minutes = Array.from({ length: 60 }, (_, i) => i);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button
          id={id}
          type="button"
          aria-haspopup="dialog"
          aria-expanded={open}
          className={cn(
            "w-full flex items-center justify-between gap-3 rounded-xl border border-input bg-transparent px-3 py-2 text-sm shadow-xs transition-colors hover:border-primary/40 focus:outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50 focus-visible:border-ring",
            !displayLabel && "text-muted-foreground",
            className,
          )}
        >
          <span className="flex items-center gap-2">
            <Clock className="h-3.5 w-3.5 text-primary" />
            {displayLabel || placeholder}
          </span>
          {hasValue && (
            <span
              className={cn(
                "inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide",
                meridiem === "AM"
                  ? "bg-accent/15 text-accent-foreground"
                  : "bg-primary/10 text-primary",
              )}
            >
              {meridiem === "AM" ? (
                <Sunrise className="h-3 w-3" />
              ) : (
                <Moon className="h-3 w-3" />
              )}
              {meridiem}
            </span>
          )}
        </button>
      </PopoverTrigger>

      <PopoverContent
        align="start"
        className="w-70 p-0 overflow-hidden rounded-2xl border border-primary/15 shadow-xl"
      >
        {/* Live preview header */}
        <div className="bg-linear-to-br from-primary via-primary to-primary/90 text-white px-4 py-3 flex items-center justify-between">
          <div>
            <p className="text-[10px] uppercase tracking-widest text-white/70 font-semibold">
              Selected Time
            </p>
            <p className="font-heading text-2xl font-bold tabular-nums">
              {hour12}
              <span className="text-white/70">:</span>
              {String(minute).padStart(2, "0")}
              <span className="ml-2 text-base font-semibold text-accent">
                {meridiem}
              </span>
            </p>
          </div>
          <Clock className="h-8 w-8 text-white/30" />
        </div>

        {/* Body */}
        <div className="p-3 flex gap-2 bg-background">
          {/* Hour column */}
          <div className="flex-1">
            <div className="flex items-center justify-between mb-1 px-1">
              <span className="text-[10px] font-bold uppercase tracking-widest text-gray-500">
                Hour
              </span>
              <div className="flex">
                <button
                  type="button"
                  onClick={() => adjustHour(-1)}
                  className="p-0.5 rounded text-gray-400 hover:text-primary hover:bg-primary/5"
                  aria-label="Previous hour"
                >
                  <ChevronUp className="h-3 w-3" />
                </button>
                <button
                  type="button"
                  onClick={() => adjustHour(1)}
                  className="p-0.5 rounded text-gray-400 hover:text-primary hover:bg-primary/5"
                  aria-label="Next hour"
                >
                  <ChevronDown className="h-3 w-3" />
                </button>
              </div>
            </div>
            <div
              ref={hourListRef}
              className="h-40 overflow-y-auto rounded-lg border border-gray-100 bg-white scroll-smooth [scrollbar-width:thin]"
              role="listbox"
              aria-label="Hour"
            >
              {hours.map((h) => {
                const active = hasValue && h === hour12;
                return (
                  <button
                    key={h}
                    type="button"
                    role="option"
                    aria-selected={active}
                    data-active={active}
                    onClick={() => handleHour(h)}
                    className={cn(
                      "w-full text-center py-1.5 text-sm tabular-nums transition-colors",
                      active
                        ? "bg-primary text-white font-bold"
                        : "text-gray-700 hover:bg-primary/5 hover:text-primary",
                    )}
                  >
                    {h}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Minute column */}
          <div className="flex-1">
            <div className="flex items-center justify-between mb-1 px-1">
              <span className="text-[10px] font-bold uppercase tracking-widest text-gray-500">
                Minute
              </span>
              <div className="flex">
                <button
                  type="button"
                  onClick={() => adjustMinute(-1)}
                  className="p-0.5 rounded text-gray-400 hover:text-primary hover:bg-primary/5"
                  aria-label="Previous minute"
                >
                  <ChevronUp className="h-3 w-3" />
                </button>
                <button
                  type="button"
                  onClick={() => adjustMinute(1)}
                  className="p-0.5 rounded text-gray-400 hover:text-primary hover:bg-primary/5"
                  aria-label="Next minute"
                >
                  <ChevronDown className="h-3 w-3" />
                </button>
              </div>
            </div>
            <div
              ref={minuteListRef}
              className="h-40 overflow-y-auto rounded-lg border border-gray-100 bg-white scroll-smooth [scrollbar-width:thin]"
              role="listbox"
              aria-label="Minute"
            >
              {minutes.map((m) => {
                const active = hasValue && m === minute;
                return (
                  <button
                    key={m}
                    type="button"
                    role="option"
                    aria-selected={active}
                    data-active={active}
                    onClick={() => handleMinute(m)}
                    className={cn(
                      "w-full text-center py-1.5 text-sm tabular-nums transition-colors",
                      active
                        ? "bg-primary text-white font-bold"
                        : "text-gray-700 hover:bg-primary/5 hover:text-primary",
                    )}
                  >
                    {String(m).padStart(2, "0")}
                  </button>
                );
              })}
            </div>
          </div>

          {/* AM/PM column */}
          <div className="w-16 flex flex-col gap-2">
            <span className="text-[10px] font-bold uppercase tracking-widest text-gray-500 px-1">
              Period
            </span>
            <button
              type="button"
              role="radio"
              aria-checked={hasValue && meridiem === "AM"}
              onClick={() => handleMeridiem("AM")}
              className={cn(
                "flex-1 rounded-lg border flex flex-col items-center justify-center gap-1 transition-all",
                hasValue && meridiem === "AM"
                  ? "border-primary bg-primary text-white shadow-md shadow-primary/20"
                  : "border-gray-200 bg-white text-gray-600 hover:border-primary/40 hover:text-primary",
              )}
            >
              <Sunrise className="h-4 w-4" />
              <span className="text-xs font-bold">AM</span>
            </button>
            <button
              type="button"
              role="radio"
              aria-checked={hasValue && meridiem === "PM"}
              onClick={() => handleMeridiem("PM")}
              className={cn(
                "flex-1 rounded-lg border flex flex-col items-center justify-center gap-1 transition-all",
                hasValue && meridiem === "PM"
                  ? "border-primary bg-primary text-white shadow-md shadow-primary/20"
                  : "border-gray-200 bg-white text-gray-600 hover:border-primary/40 hover:text-primary",
              )}
            >
              <Moon className="h-4 w-4" />
              <span className="text-xs font-bold">PM</span>
            </button>
          </div>
        </div>

        {/* Footer actions */}
        <div className="flex items-center justify-between gap-2 px-3 pb-3 bg-background">
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="text-xs"
            onClick={setNow}
          >
            Now
          </Button>
          <Button
            type="button"
            size="sm"
            className="text-xs rounded-lg"
            onClick={() => setOpen(false)}
          >
            Done
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
}

/** Format a 24h "HH:MM" string for display as "h:mm AM/PM". Returns empty string if invalid. */
export function format12h(value: string): string {
  const p = parse(value);
  if (!p.hasValue) return "";
  return format12hLabel(p.hour12, p.minute, p.meridiem);
}
