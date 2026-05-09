"use client";

import { useState } from "react";
import Link from "next/link";
import { MainLayout } from "@/components/templates/main-layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import {
  Heart,
  Sparkles,
  ArrowRight,
  Shield,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  Users,
  Star,
  Loader2,
  MapPin,
  CalendarDays,
  Clock,
} from "lucide-react";
import { LocationSearch } from "@/components/molecules/location-search";
import { ConsultationButton } from "@/components/molecules/consultation-button";
import { FaqSection } from "@/components/molecules";
import {
  getKundli,
  matchKundli,
  Observer,
} from "@ishubhamx/panchangam-js";

interface KootaResult {
  name: string;
  score: number;
  maxScore: number;
  description: string;
  area: string;
}

interface DoshaResult {
  hasDosha: boolean;
  isHigh: boolean;
  description: string;
}

interface MatchResult {
  ashtakoot: {
    totalScore: number;
    kootas: KootaResult[];
  };
  dosha: {
    boy: DoshaResult;
    girl: DoshaResult;
  };
  verdict: string;
}

function getScoreColor(score: number, max: number): string {
  const ratio = max > 0 ? score / max : 0;
  if (ratio >= 0.8) return "text-green-600";
  if (ratio >= 0.4) return "text-amber-500";
  return "text-red-500";
}

function getBarColor(score: number, max: number): string {
  const ratio = max > 0 ? score / max : 0;
  if (ratio >= 0.8) return "bg-green-500";
  if (ratio >= 0.4) return "bg-amber-400";
  return "bg-red-400";
}

function getCircleColor(total: number): string {
  if (total >= 25) return "#22c55e";
  if (total >= 18) return "#f59e0b";
  return "#ef4444";
}

function getRecommendation(total: number): {
  text: string;
  icon: typeof CheckCircle2;
  color: string;
} {
  if (total >= 25)
    return {
      text: "Excellent match! Highly recommended.",
      icon: CheckCircle2,
      color: "text-green-600",
    };
  if (total >= 18)
    return {
      text: "Good match with minor adjustments needed.",
      icon: AlertTriangle,
      color: "text-amber-500",
    };
  return {
    text: "Consultation recommended before proceeding.",
    icon: XCircle,
    color: "text-red-500",
  };
}

export default function CompatibilityPage() {
  const [boyDobDate, setBoyDobDate] = useState<Date | undefined>(undefined);
  const [boyDob, setBoyDob] = useState("");
  const [boyTob, setBoyTob] = useState("");
  const [boyPlace, setBoyPlace] = useState("Gurugram");
  const [boyLat, setBoyLat] = useState(28.4595);
  const [boyLon, setBoyLon] = useState(77.0266);

  const [girlDobDate, setGirlDobDate] = useState<Date | undefined>(undefined);
  const [girlDob, setGirlDob] = useState("");
  const [girlTob, setGirlTob] = useState("");
  const [girlPlace, setGirlPlace] = useState("Gurugram");
  const [girlLat, setGirlLat] = useState(28.4595);
  const [girlLon, setGirlLon] = useState(77.0266);

  const [result, setResult] = useState<MatchResult | null>(null);
  const [isCalculating, setIsCalculating] = useState(false);
  const [error, setError] = useState("");

  const handleCalculate = () => {
    setError("");
    setResult(null);

    if (!boyDob || !boyTob) {
      setError("Please enter the boy's date and time of birth.");
      return;
    }
    if (!girlDob || !girlTob) {
      setError("Please enter the girl's date and time of birth.");
      return;
    }

    setIsCalculating(true);

    try {
      const boyDateTime = new Date(`${boyDob}T${boyTob}:00`);
      const girlDateTime = new Date(`${girlDob}T${girlTob}:00`);

      if (isNaN(boyDateTime.getTime()) || isNaN(girlDateTime.getTime())) {
        setError("Invalid date or time entered. Please check and try again.");
        setIsCalculating(false);
        return;
      }

      const boyObserver = new Observer(boyLat, boyLon, 217);
      const girlObserver = new Observer(girlLat, girlLon, 217);
      const kundli1 = getKundli(boyDateTime, boyObserver);
      const kundli2 = getKundli(girlDateTime, girlObserver);
      const match = matchKundli(kundli1, kundli2) as MatchResult;

      setResult(match);
    } catch {
      setError(
        "Unable to calculate compatibility. Please check the details and try again."
      );
    } finally {
      setIsCalculating(false);
    }
  };

  const recommendation = result
    ? getRecommendation(result.ashtakoot.totalScore)
    : null;

  const circleRadius = 54;
  const circleCircumference = 2 * Math.PI * circleRadius;
  const scoreOffset = result
    ? circleCircumference -
      (result.ashtakoot.totalScore / 36) * circleCircumference
    : circleCircumference;

  return (
    <MainLayout>
      {/* Hero */}
      <section className="relative bg-primary text-white overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-10 right-20 w-72 h-72 bg-accent/15 rounded-full blur-3xl" />
          <div className="absolute -bottom-10 -left-10 w-56 h-56 bg-secondary/10 rounded-full blur-3xl" />
        </div>
        <div className="container mx-auto px-4 relative z-10 py-14 md:py-20">
          <div className="max-w-2xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-sm text-sm mb-5">
              <Heart className="h-3.5 w-3.5 text-accent" />
              Vedic Compatibility
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-heading mb-4 leading-tight">
              Free Kundli Match Making Calculator
            </h1>
            <p className="text-white/70 text-base md:text-lg max-w-lg mx-auto">
              Check marriage compatibility using the ancient 36-point Ashtakoot
              Guna Milan system based on Vedic astrology.
            </p>
          </div>
        </div>
      </section>

      {/* Form Section */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-10">
              <p className="text-xs font-bold uppercase tracking-widest text-secondary mb-2">
                Enter Birth Details
              </p>
              <h2 className="text-2xl md:text-3xl font-bold font-heading text-gray-900">
                Boy &amp; Girl Details
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
              {/* Boy's Details */}
              <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center">
                    <Users className="h-5 w-5 text-blue-600" />
                  </div>
                  <h3 className="text-lg font-bold font-heading text-gray-900">
                    Boy&apos;s Details
                  </h3>
                </div>

                <div className="space-y-4">
                  <div>
                    <Label className="text-sm font-medium text-gray-700 mb-1.5 flex items-center gap-1.5">
                      <CalendarDays className="h-3.5 w-3.5 text-primary" />
                      Date of Birth
                    </Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className={cn(
                            "w-full justify-start text-left font-normal rounded-xl h-10",
                            !boyDobDate && "text-gray-400"
                          )}
                        >
                          <CalendarDays className="h-4 w-4 mr-2 text-primary" />
                          {boyDobDate ? format(boyDobDate, "dd MMMM yyyy") : "Select date of birth"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={boyDobDate}
                          onSelect={(date) => {
                            setBoyDobDate(date);
                            if (date) {
                              const y = date.getFullYear();
                              const m = String(date.getMonth() + 1).padStart(2, "0");
                              const d = String(date.getDate()).padStart(2, "0");
                              setBoyDob(`${y}-${m}-${d}`);
                            }
                          }}
                          defaultMonth={boyDobDate || new Date(2000, 0)}
                          captionLayout="dropdown"
                          fromYear={1930}
                          toYear={new Date().getFullYear()}
                          classNames={{
                            caption_label: "text-sm font-medium",
                            nav_button: "h-7 w-7 bg-transparent p-0 text-gray-600 hover:text-primary",
                          }}
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-gray-700 mb-1.5 flex items-center gap-1.5">
                      <Clock className="h-3.5 w-3.5 text-primary" />
                      Time of Birth
                    </Label>
                    <Input
                      type="time"
                      value={boyTob}
                      onChange={(e) => setBoyTob(e.target.value)}
                      className="rounded-xl"
                    />
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-gray-700 mb-1.5 flex items-center gap-1.5">
                      <MapPin className="h-3.5 w-3.5 text-primary" />
                      Place of Birth
                    </Label>
                    <LocationSearch
                      defaultValue="Gurugram"
                      onSelect={(loc) => {
                        setBoyPlace(loc.name);
                        setBoyLat(loc.lat);
                        setBoyLon(loc.lon);
                      }}
                    />
                    <p className="text-[10px] text-gray-400 mt-1">{boyPlace}</p>
                  </div>
                </div>
              </div>

              {/* Girl's Details */}
              <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-xl bg-pink-50 flex items-center justify-center">
                    <Heart className="h-5 w-5 text-pink-500" />
                  </div>
                  <h3 className="text-lg font-bold font-heading text-gray-900">
                    Girl&apos;s Details
                  </h3>
                </div>

                <div className="space-y-4">
                  <div>
                    <Label className="text-sm font-medium text-gray-700 mb-1.5 flex items-center gap-1.5">
                      <CalendarDays className="h-3.5 w-3.5 text-primary" />
                      Date of Birth
                    </Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className={cn(
                            "w-full justify-start text-left font-normal rounded-xl h-10",
                            !girlDobDate && "text-gray-400"
                          )}
                        >
                          <CalendarDays className="h-4 w-4 mr-2 text-primary" />
                          {girlDobDate ? format(girlDobDate, "dd MMMM yyyy") : "Select date of birth"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={girlDobDate}
                          onSelect={(date) => {
                            setGirlDobDate(date);
                            if (date) {
                              const y = date.getFullYear();
                              const m = String(date.getMonth() + 1).padStart(2, "0");
                              const d = String(date.getDate()).padStart(2, "0");
                              setGirlDob(`${y}-${m}-${d}`);
                            }
                          }}
                          defaultMonth={girlDobDate || new Date(2000, 0)}
                          captionLayout="dropdown"
                          fromYear={1930}
                          toYear={new Date().getFullYear()}
                          classNames={{
                            caption_label: "text-sm font-medium",
                            nav_button: "h-7 w-7 bg-transparent p-0 text-gray-600 hover:text-primary",
                          }}
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-gray-700 mb-1.5 flex items-center gap-1.5">
                      <Clock className="h-3.5 w-3.5 text-primary" />
                      Time of Birth
                    </Label>
                    <Input
                      type="time"
                      value={girlTob}
                      onChange={(e) => setGirlTob(e.target.value)}
                      className="rounded-xl"
                    />
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-gray-700 mb-1.5 flex items-center gap-1.5">
                      <MapPin className="h-3.5 w-3.5 text-primary" />
                      Place of Birth
                    </Label>
                    <LocationSearch
                      defaultValue="Gurugram"
                      onSelect={(loc) => {
                        setGirlPlace(loc.name);
                        setGirlLat(loc.lat);
                        setGirlLon(loc.lon);
                      }}
                    />
                    <p className="text-[10px] text-gray-400 mt-1">{girlPlace}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Error */}
            {error && (
              <div className="mt-6 text-center">
                <p className="text-sm text-red-500 bg-red-50 inline-block px-4 py-2 rounded-xl">
                  {error}
                </p>
              </div>
            )}

            {/* Calculate Button */}
            <div className="mt-8 text-center">
              <Button
                size="lg"
                onClick={handleCalculate}
                disabled={isCalculating}
                className="bg-primary hover:bg-primary/90 rounded-xl px-10 py-6 text-base font-semibold"
              >
                {isCalculating ? (
                  <>
                    <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                    Calculating...
                  </>
                ) : (
                  <>
                    <Sparkles className="h-5 w-5 mr-2" />
                    Check Compatibility
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Results */}
      {result && recommendation && (
        <section className="pb-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              {/* Score Circle */}
              <div className="text-center mb-12">
                <p className="text-xs font-bold uppercase tracking-widest text-secondary mb-6">
                  Compatibility Score
                </p>
                <div className="relative w-40 h-40 mx-auto mb-6">
                  <svg
                    className="w-full h-full -rotate-90"
                    viewBox="0 0 120 120"
                  >
                    <circle
                      cx="60"
                      cy="60"
                      r={circleRadius}
                      fill="none"
                      stroke="#e5e7eb"
                      strokeWidth="8"
                    />
                    <circle
                      cx="60"
                      cy="60"
                      r={circleRadius}
                      fill="none"
                      stroke={getCircleColor(result.ashtakoot.totalScore)}
                      strokeWidth="8"
                      strokeLinecap="round"
                      strokeDasharray={circleCircumference}
                      strokeDashoffset={scoreOffset}
                      className="transition-all duration-1000 ease-out"
                    />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span
                      className="text-4xl font-bold font-heading"
                      style={{
                        color: getCircleColor(result.ashtakoot.totalScore),
                      }}
                    >
                      {result.ashtakoot.totalScore}
                    </span>
                    <span className="text-sm text-gray-400">out of 36</span>
                  </div>
                </div>
                <p className="text-lg font-semibold text-gray-700">
                  {result.verdict}
                </p>
              </div>

              {/* Recommendation */}
              <div
                className={cn(
                  "flex items-center gap-3 justify-center mb-12 p-4 rounded-2xl",
                  result.ashtakoot.totalScore >= 25
                    ? "bg-green-50"
                    : result.ashtakoot.totalScore >= 18
                      ? "bg-amber-50"
                      : "bg-red-50"
                )}
              >
                <recommendation.icon
                  className={cn("h-6 w-6 shrink-0", recommendation.color)}
                />
                <p
                  className={cn(
                    "text-base font-semibold",
                    recommendation.color
                  )}
                >
                  {recommendation.text}
                </p>
              </div>

              {/* Ashtakoot Breakdown */}
              <div className="mb-12">
                <div className="text-center mb-8">
                  <p className="text-xs font-bold uppercase tracking-widest text-secondary mb-2">
                    Detailed Analysis
                  </p>
                  <h3 className="text-2xl font-bold font-heading text-gray-900">
                    Ashtakoot Guna Milan
                  </h3>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {result.ashtakoot.kootas.map((koota) => (
                    <div
                      key={koota.name}
                      className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm"
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h4 className="font-bold text-gray-900">
                            {koota.name}
                          </h4>
                          <p className="text-xs text-gray-400">{koota.area}</p>
                        </div>
                        <span
                          className={cn(
                            "text-sm font-bold",
                            getScoreColor(koota.score, koota.maxScore)
                          )}
                        >
                          {koota.score}/{koota.maxScore}
                        </span>
                      </div>

                      {/* Progress bar */}
                      <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden mb-3">
                        <div
                          className={cn(
                            "h-full rounded-full transition-all duration-700 ease-out",
                            getBarColor(koota.score, koota.maxScore)
                          )}
                          style={{
                            width: `${koota.maxScore > 0 ? (koota.score / koota.maxScore) * 100 : 0}%`,
                          }}
                        />
                      </div>

                      <p className="text-xs text-gray-500 leading-relaxed">
                        {koota.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Mangal Dosha */}
              <div className="mb-12">
                <div className="text-center mb-8">
                  <p className="text-xs font-bold uppercase tracking-widest text-secondary mb-2">
                    Dosha Analysis
                  </p>
                  <h3 className="text-2xl font-bold font-heading text-gray-900">
                    Mangal Dosha Status
                  </h3>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Boy Dosha */}
                  <div
                    className={cn(
                      "rounded-2xl border p-6",
                      result.dosha.boy.hasDosha
                        ? result.dosha.boy.isHigh
                          ? "border-red-200 bg-red-50"
                          : "border-amber-200 bg-amber-50"
                        : "border-green-200 bg-green-50"
                    )}
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <div
                        className={cn(
                          "w-10 h-10 rounded-xl flex items-center justify-center",
                          result.dosha.boy.hasDosha
                            ? result.dosha.boy.isHigh
                              ? "bg-red-100"
                              : "bg-amber-100"
                            : "bg-green-100"
                        )}
                      >
                        {result.dosha.boy.hasDosha ? (
                          <AlertTriangle
                            className={cn(
                              "h-5 w-5",
                              result.dosha.boy.isHigh
                                ? "text-red-500"
                                : "text-amber-500"
                            )}
                          />
                        ) : (
                          <Shield className="h-5 w-5 text-green-600" />
                        )}
                      </div>
                      <div>
                        <h4 className="font-bold text-gray-900">
                          Boy - Mangal Dosha
                        </h4>
                        <p
                          className={cn(
                            "text-xs font-semibold",
                            result.dosha.boy.hasDosha
                              ? result.dosha.boy.isHigh
                                ? "text-red-500"
                                : "text-amber-500"
                              : "text-green-600"
                          )}
                        >
                          {result.dosha.boy.hasDosha
                            ? result.dosha.boy.isHigh
                              ? "High Mangal Dosha"
                              : "Mangal Dosha Present"
                            : "No Mangal Dosha"}
                        </p>
                      </div>
                    </div>
                    <p className="text-sm text-gray-600">
                      {result.dosha.boy.description}
                    </p>
                  </div>

                  {/* Girl Dosha */}
                  <div
                    className={cn(
                      "rounded-2xl border p-6",
                      result.dosha.girl.hasDosha
                        ? result.dosha.girl.isHigh
                          ? "border-red-200 bg-red-50"
                          : "border-amber-200 bg-amber-50"
                        : "border-green-200 bg-green-50"
                    )}
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <div
                        className={cn(
                          "w-10 h-10 rounded-xl flex items-center justify-center",
                          result.dosha.girl.hasDosha
                            ? result.dosha.girl.isHigh
                              ? "bg-red-100"
                              : "bg-amber-100"
                            : "bg-green-100"
                        )}
                      >
                        {result.dosha.girl.hasDosha ? (
                          <AlertTriangle
                            className={cn(
                              "h-5 w-5",
                              result.dosha.girl.isHigh
                                ? "text-red-500"
                                : "text-amber-500"
                            )}
                          />
                        ) : (
                          <Shield className="h-5 w-5 text-green-600" />
                        )}
                      </div>
                      <div>
                        <h4 className="font-bold text-gray-900">
                          Girl - Mangal Dosha
                        </h4>
                        <p
                          className={cn(
                            "text-xs font-semibold",
                            result.dosha.girl.hasDosha
                              ? result.dosha.girl.isHigh
                                ? "text-red-500"
                                : "text-amber-500"
                              : "text-green-600"
                          )}
                        >
                          {result.dosha.girl.hasDosha
                            ? result.dosha.girl.isHigh
                              ? "High Mangal Dosha"
                              : "Mangal Dosha Present"
                            : "No Mangal Dosha"}
                        </p>
                      </div>
                    </div>
                    <p className="text-sm text-gray-600">
                      {result.dosha.girl.description}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* FAQ Section */}
      <FaqSection
        description="Get clarity on Vedic Kundli matching, Ashtakoot Guna Milan, Mangal Dosha, and Nadi Dosha. These FAQs explain how horoscope matching scores work, what makes a good marriage compatibility result, and when to consult an expert pandit for a deeper free Kundli match for marriage."
        faqs={[
          {
            question: "What is Guna Milan in Kundli matching?",
            answer:
              "Guna Milan is the traditional Vedic system of checking marriage compatibility between a boy and girl using their birth charts. It is also called Ashtakoot, meaning eight categories. Each Kundli is analysed across eight kootas, and points are awarded out of a total of 36. The higher the matching score, the more harmonious the partnership is believed to be on mental, physical, and karmic levels.",
          },
          {
            question: "What is a good score in Kundli matching out of 36?",
            answer:
              "In Vedic astrology, a score of 18 out of 36 is considered the minimum acceptable level for marriage. A score between 18 and 24 is treated as average to good, 25 to 32 is excellent, and 32 plus is rare and considered ideal. Anything below 18 is generally not recommended without expert review. Remember, the final verdict also depends on Mangal dosha, Nadi dosha, and overall planetary placement, not just the total guna count.",
          },
          {
            question: "What do the eight kootas in Ashtakoot measure?",
            answer:
              "The eight kootas each cover a specific area. Varna checks spiritual compatibility, Vashya measures mutual control and influence, Tara looks at health and well-being, Yoni shows physical and sexual compatibility, Graha Maitri measures mental and intellectual harmony, Gana indicates temperament, Bhakoot reflects family welfare and finances, and Nadi shows genetic and progeny compatibility. Nadi carries the highest weight at 8 points, which is why it strongly influences the final matching result.",
          },
          {
            question: "What is Mangal Dosha and how does it affect marriage?",
            answer:
              "Mangal Dosha, also known as Manglik dosha, occurs when Mars sits in the 1st, 2nd, 4th, 7th, 8th, or 12th house of the birth chart. It is believed to bring tension, delays, or conflict in marriage. The traditional remedy is to match a Manglik person with another Manglik partner, as the doshas cancel out. Mild Mangal dosha can also be balanced through specific pujas, gemstones, and remedies suggested by an experienced astrologer.",
          },
          {
            question: "Why is Nadi Dosha given so much importance?",
            answer:
              "Nadi carries 8 points, the highest weight in Ashtakoot, because it represents genetic, biological, and health compatibility between partners. When both boy and girl share the same Nadi, called Nadi Dosha, classical texts warn of issues with progeny, health, and long-term wellbeing of children. However, Nadi Dosha can sometimes be cancelled if both Kundlis share the same nakshatra or rashi. A pandit should always confirm Nadi Dosha before drawing conclusions.",
          },
          {
            question: "Why are exact birth time and place needed for Kundli matching?",
            answer:
              "Vedic astrology calculates the moon sign, nakshatra, and lagna based on the precise moment and location of birth. Even a 10 minute difference can change the nakshatra, which directly affects 6 out of 8 kootas, including Nadi. The place of birth determines the latitude and longitude used for planetary positions. For an accurate free Kundli match for marriage, always enter exact time of birth from the hospital record and the correct city.",
          },
          {
            question: "How accurate is online Kundli matching versus a pandit?",
            answer:
              "An online tool like this gives you a fast, mathematically accurate Ashtakoot score and dosha check based on classical Vedic rules. It is excellent for an initial compatibility filter and self-understanding. However, an experienced astrologer also studies dasha periods, planetary strengths, divisional charts like D9 Navamsa, and life context. For low scores, doshas, or important final decisions, a personal consultation with a Vedic pandit is strongly recommended.",
          },
          {
            question: "Can a low Kundli matching score be fixed or improved?",
            answer:
              "A low guna score cannot be changed mathematically, but its negative effects can often be reduced. Astrologers may suggest specific remedies such as gemstone therapy, mantra chanting, planetary pujas, donations, or Manglik dosha nivaran rituals. In some cases, dosha cancellation rules apply automatically based on planetary positions. Never panic over a single low score, as a complete chart reading by an expert may reveal strong yogas that balance and support a successful marriage.",
          },
          {
            question: "Is Kundli matching only for arranged marriages?",
            answer:
              "Not at all. While horoscope matching is a strong tradition in arranged marriages across India, more couples in love marriages now use it for self-awareness and to understand each other deeply. It helps both partners see strengths, friction points, and karmic patterns in the relationship. Whether your match is arranged by family or chosen by love, a Kundli match offers an extra layer of clarity before committing to lifelong partnership.",
          },
          {
            question: "Is Vedic Kundli matching still relevant today?",
            answer:
              "Yes, Kundli matching remains highly relevant in modern Indian society. While lifestyles have changed, the core challenges in marriage, such as compatibility of values, temperament, family, finances, and health, are still real. Ashtakoot Guna Milan offers a structured, time-tested framework to assess these areas. Treat it as one valuable input alongside emotional connection, communication, and shared goals. Remember, no chart guarantees outcomes, but it can guide you with awareness.",
          },
        ]}
      />

      {/* Bottom CTA */}
      <section className="py-12 border-t border-gray-100 bg-gray-50/40">
        <div className="container mx-auto px-4 text-center">
          <h3 className="text-xl md:text-2xl font-bold font-heading text-gray-900 mb-2">
            Want a Detailed Compatibility Analysis?
          </h3>
          <p className="text-sm text-gray-500 mb-6 max-w-md mx-auto">
            Get personalized marriage consultation from our expert Vedic
            astrologers with complete Kundli analysis.
          </p>
          <div className="flex items-center justify-center gap-3">
            <ConsultationButton service="Marriage Compatibility Analysis" className="bg-primary rounded-xl">
              Book Consultation
              <ArrowRight className="h-4 w-4 ml-1.5" />
            </ConsultationButton>
            <Button variant="outline" className="rounded-xl" asChild>
              <Link href="/contact">
                <Star className="h-4 w-4 mr-1.5" />
                Contact Us
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </MainLayout>
  );
}
