"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { format } from "date-fns";
import {
  Heart,
  CalendarDays,
  Sparkles,
  ArrowRight,
  Loader2,
} from "lucide-react";

import { cn } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { rashiNames } from "@ishubhamx/panchangam-js";

export interface CompatibilityTeaserProps {
  userMoonRashi: number;
  userName?: string;
  className?: string;
}

/**
 * Approximate sidereal sun-rashi by date (month-day). Boundaries are the
 * usual sankranti dates and shift by ~1 day across years — close enough
 * for a teaser; the full Kundli Milan tool does the precise math.
 */
function getSunRashiFromDate(date: Date): number {
  const m = date.getMonth() + 1;
  const d = date.getDate();
  const key = m * 100 + d;
  if (key >= 415 && key <= 514) return 1; // Mesh
  if (key >= 515 && key <= 614) return 2; // Vrishabh
  if (key >= 615 && key <= 716) return 3; // Mithun
  if (key >= 717 && key <= 816) return 4; // Karka
  if (key >= 817 && key <= 916) return 5; // Simha
  if (key >= 917 && key <= 1017) return 6; // Kanya
  if (key >= 1018 && key <= 1116) return 7; // Tula
  if (key >= 1117 && key <= 1215) return 8; // Vrishchik
  if (key >= 1216 || key <= 114) return 9; // Dhanu
  if (key >= 115 && key <= 212) return 10; // Makar
  if (key >= 213 && key <= 314) return 11; // Kumbh
  return 12; // Meen (315 - 414)
}

const ELEMENT: readonly ("Fire" | "Earth" | "Air" | "Water")[] = [
  "Fire", "Fire", "Earth", "Air", "Water", "Fire", "Earth", "Air", "Water", "Fire", "Earth", "Air", "Water",
];

/** Sign-to-sign compatibility 0-100, derived from element + trinal relationship. */
function computeScore(r1: number, r2: number): number {
  const e1 = ELEMENT[r1];
  const e2 = ELEMENT[r2];
  let base = 50;
  if (e1 === e2) base += 25; // same element
  else if ((e1 === "Fire" && e2 === "Air") || (e1 === "Air" && e2 === "Fire")) base += 20;
  else if ((e1 === "Earth" && e2 === "Water") || (e1 === "Water" && e2 === "Earth")) base += 20;
  else if ((e1 === "Fire" && e2 === "Water") || (e1 === "Water" && e2 === "Fire")) base -= 10;
  else if ((e1 === "Earth" && e2 === "Air") || (e1 === "Air" && e2 === "Earth")) base -= 5;

  const diff = Math.abs(r1 - r2);
  const dist = Math.min(diff, 12 - diff);
  if (dist === 0) base += 8;
  else if (dist === 4) base += 12; // trine
  else if (dist === 6) base += 8;  // opposition (often complementary)
  else if (dist === 2) base += 4;  // sextile
  else if (dist === 1 || dist === 11) base -= 6;
  else if (dist === 3 || dist === 5) base -= 2;

  return Math.max(28, Math.min(96, Math.round(base)));
}

function getVerdict(score: number): { label: string; color: string; bg: string; note: string } {
  if (score >= 80) return {
    label: "Excellent Match",
    color: "text-emerald-700",
    bg: "from-emerald-50 to-emerald-100/50",
    note: "Your rashis blend beautifully — emotional harmony and natural understanding are likely.",
  };
  if (score >= 65) return {
    label: "Good Match",
    color: "text-primary",
    bg: "from-primary/5 to-accent/10",
    note: "A supportive bond with shared values. Minor differences strengthen the relationship.",
  };
  if (score >= 50) return {
    label: "Workable Match",
    color: "text-secondary",
    bg: "from-secondary/5 to-amber-50",
    note: "Requires understanding and effort. Worth a deeper kundli milan analysis.",
  };
  return {
    label: "Challenging Match",
    color: "text-rose-700",
    bg: "from-rose-50 to-rose-100/50",
    note: "Element friction noted. Full kundli matching can reveal cancellations and remedies.",
  };
}

export function CompatibilityTeaser({
  userMoonRashi,
  userName,
  className,
}: CompatibilityTeaserProps) {
  const [partnerDob, setPartnerDob] = useState<Date | undefined>(undefined);
  const [computing, setComputing] = useState(false);
  const [showResult, setShowResult] = useState(false);

  const result = useMemo(() => {
    if (!partnerDob || !showResult) return null;
    const partnerRashi = getSunRashiFromDate(partnerDob);
    const score = computeScore(userMoonRashi, partnerRashi);
    return {
      partnerRashi,
      partnerRashiName: rashiNames[partnerRashi] ?? "—",
      yourRashiName: rashiNames[userMoonRashi] ?? "—",
      score,
      verdict: getVerdict(score),
    };
  }, [partnerDob, showResult, userMoonRashi]);

  function handleCheck() {
    if (!partnerDob) return;
    setComputing(true);
    // small delay for UX feedback — feels more "calculated"
    setTimeout(() => {
      setShowResult(true);
      setComputing(false);
    }, 600);
  }

  function handleReset() {
    setPartnerDob(undefined);
    setShowResult(false);
  }

  return (
    <Card className={cn("border-gray-100 shadow-sm overflow-hidden", className)}>
      <div className="bg-gradient-to-br from-rose-50 via-pink-50/40 to-accent/10 px-5 md:px-6 py-4 border-b border-gray-100">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-white/80 backdrop-blur flex items-center justify-center shadow-sm">
            <Heart className="h-5 w-5 text-rose-600" />
          </div>
          <div>
            <p className="text-[11px] font-bold uppercase tracking-widest text-rose-700 mb-0.5">
              Quick Compatibility Check
            </p>
            <h3 className="text-base md:text-lg font-bold font-heading text-gray-900">
              How Compatible Are You &amp; Your Partner?
            </h3>
            <p className="text-xs text-gray-500 mt-0.5">
              Enter your partner&apos;s date of birth for an instant Vedic rashi match.
            </p>
          </div>
        </div>
      </div>

      <CardContent className="pt-5 pb-5">
        {!showResult && (
          <div className="grid sm:grid-cols-[1fr_auto] gap-3 items-end">
            <div className="space-y-1.5">
              <Label className="text-xs font-semibold text-gray-700">
                Partner&apos;s Date of Birth
              </Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal rounded-xl border-gray-200 hover:border-primary/40 hover:bg-primary/5",
                      !partnerDob && "text-gray-500",
                    )}
                  >
                    <CalendarDays className="h-4 w-4 mr-2 text-primary" />
                    {partnerDob ? format(partnerDob, "PPP") : "Pick partner's date of birth"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={partnerDob}
                    onSelect={setPartnerDob}
                    captionLayout="dropdown"
                    startMonth={new Date(1940, 0)}
                    endMonth={new Date(new Date().getFullYear(), 11)}
                    disabled={(d) => d > new Date()}
                  />
                </PopoverContent>
              </Popover>
            </div>
            <Button
              onClick={handleCheck}
              disabled={!partnerDob || computing}
              className="rounded-xl bg-rose-600 hover:bg-rose-700 text-white h-10 px-5"
            >
              {computing ? (
                <>
                  <Loader2 className="h-4 w-4 mr-1.5 animate-spin" />
                  Calculating…
                </>
              ) : (
                <>
                  <Sparkles className="h-4 w-4 mr-1.5" />
                  Check Match
                </>
              )}
            </Button>
          </div>
        )}

        {showResult && result && (
          <div className="space-y-4">
            <div className={cn(
              "rounded-2xl p-5 bg-gradient-to-br",
              result.verdict.bg,
            )}>
              <div className="grid sm:grid-cols-[1fr_auto_1fr] items-center gap-3 mb-4">
                <div className="text-center sm:text-right">
                  <p className="text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-0.5">
                    {userName ? userName : "You"}
                  </p>
                  <p className="text-base md:text-lg font-bold text-gray-900">
                    {result.yourRashiName}
                  </p>
                  <p className="text-[11px] text-gray-500">Chandra Rashi</p>
                </div>
                <Heart className="h-5 w-5 text-rose-500 mx-auto" />
                <div className="text-center sm:text-left">
                  <p className="text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-0.5">
                    Partner
                  </p>
                  <p className="text-base md:text-lg font-bold text-gray-900">
                    {result.partnerRashiName}
                  </p>
                  <p className="text-[11px] text-gray-500">Sun Rashi (approx.)</p>
                </div>
              </div>

              <div className="text-center mb-3">
                <div className="inline-flex items-baseline gap-1">
                  <span className={cn("text-5xl font-bold font-heading", result.verdict.color)}>
                    {result.score}
                  </span>
                  <span className="text-lg text-gray-500 font-medium">/ 100</span>
                </div>
                <p className={cn("text-sm font-bold mt-1", result.verdict.color)}>
                  {result.verdict.label}
                </p>
              </div>

              <div className="w-full bg-white/60 rounded-full h-2 overflow-hidden mb-3">
                <div
                  className={cn(
                    "h-full rounded-full transition-all duration-700",
                    result.score >= 80 ? "bg-emerald-500" :
                    result.score >= 65 ? "bg-primary" :
                    result.score >= 50 ? "bg-secondary" : "bg-rose-500",
                  )}
                  style={{ width: `${result.score}%` }}
                />
              </div>

              <p className="text-sm text-gray-700 leading-relaxed text-center">
                {result.verdict.note}
              </p>
            </div>

            <div className="rounded-xl border border-amber-100 bg-amber-50/50 p-4">
              <p className="text-xs text-gray-700 leading-relaxed">
                <strong className="text-amber-700">Note:</strong> This is a quick sun-rashi based teaser using partner&apos;s DOB only. For an accurate marriage match, the traditional <strong>Ashtakoot Guna Milan</strong> (36-point matching) needs both partners&apos; full birth details — date, time, and place.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-2.5">
              <Button
                asChild
                className="rounded-xl bg-primary hover:bg-primary/90 text-white flex-1"
              >
                <Link href="/free-match-making-calculator/">
                  Try Full Kundli Milan (36-Point)
                  <ArrowRight className="h-4 w-4 ml-1.5" />
                </Link>
              </Button>
              <Button
                variant="outline"
                onClick={handleReset}
                className="rounded-xl border-gray-200"
              >
                Check Another DOB
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
