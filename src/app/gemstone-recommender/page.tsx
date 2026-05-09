"use client";

import { useState } from "react";
import { MainLayout } from "@/components/templates/main-layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Gem, Sparkles, Star, AlertTriangle, Hand, Calendar, Sun, Moon, ArrowRight, ShieldCheck, CalendarDays, Clock, MapPin } from "lucide-react";
import { Calendar as CalendarPicker } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import { LocationSearch } from "@/components/molecules/location-search";
import { ConsultationButton } from "@/components/molecules/consultation-button";
import { FaqSection } from "@/components/molecules";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { getKundli, Observer, rashiNames } from "@ishubhamx/panchangam-js";

// --- Data ---

// Rashi to Lord mapping per Vedic astrology
const rashiToLord: Record<number, string> = {
  0: "Mars",
  1: "Venus",
  2: "Mercury",
  3: "Moon",
  4: "Sun",
  5: "Mercury",
  6: "Venus",
  7: "Mars",
  8: "Jupiter",
  9: "Saturn",
  10: "Saturn",
  11: "Jupiter",
};

interface GemstoneInfo {
  primary: string;
  alt: string;
  metal: string;
  finger: string;
  day: string;
  benefits: string;
  caution: string;
}

const planetToGemstone: Record<string, GemstoneInfo> = {
  Sun: {
    primary: "Ruby (Manik)",
    alt: "Garnet, Red Spinel",
    metal: "Gold",
    finger: "Ring finger",
    day: "Sunday",
    benefits:
      "Ruby strengthens leadership qualities, boosts confidence, and enhances vitality. It helps gain recognition, authority, and supports heart health. Ideal for those seeking success in government or politics.",
    caution:
      "Avoid if Sun is a functional malefic for your ascendant. Consult an astrologer before wearing.",
  },
  Moon: {
    primary: "Pearl (Moti)",
    alt: "Moonstone",
    metal: "Silver",
    finger: "Little finger",
    day: "Monday",
    benefits:
      "Pearl calms the mind, controls emotions, and strengthens mental health. It enhances intuition, improves relationships with mother, and brings peace. Excellent for those in creative fields.",
    caution:
      "Not recommended if Moon is waning or associated with malefics in certain positions. Seek expert guidance.",
  },
  Mars: {
    primary: "Red Coral (Moonga)",
    alt: "Carnelian",
    metal: "Gold/Copper",
    finger: "Ring finger",
    day: "Tuesday",
    benefits:
      "Red Coral boosts courage, physical strength, and determination. It helps overcome laziness, debt, and property-related issues. Beneficial for athletes and those in defence or real estate.",
    caution:
      "Should be avoided if Mars is a malefic lord for your chart. Always verify with an astrologer.",
  },
  Mercury: {
    primary: "Emerald (Panna)",
    alt: "Green Tourmaline, Peridot",
    metal: "Gold",
    finger: "Little finger",
    day: "Wednesday",
    benefits:
      "Emerald sharpens intellect, improves communication, and enhances business acumen. It aids in education, writing, and trade. Highly beneficial for students and professionals in finance or IT.",
    caution:
      "Avoid if Mercury is combust or a functional malefic. Professional consultation is advised.",
  },
  Jupiter: {
    primary: "Yellow Sapphire (Pukhraj)",
    alt: "Citrine, Yellow Topaz",
    metal: "Gold",
    finger: "Index finger",
    day: "Thursday",
    benefits:
      "Yellow Sapphire brings wisdom, prosperity, and spiritual growth. It strengthens marriage prospects, wealth, and children-related matters. One of the most auspicious gemstones in Vedic astrology.",
    caution:
      "Generally safe but should still be verified for your specific chart. Avoid low-quality or treated stones.",
  },
  Venus: {
    primary: "Diamond (Heera)",
    alt: "White Sapphire, Zircon",
    metal: "Silver/Platinum",
    finger: "Middle finger",
    day: "Friday",
    benefits:
      "Diamond enhances luxury, romance, artistic talents, and beauty. It attracts wealth, improves married life, and supports reproductive health. Ideal for those in arts, entertainment, or fashion.",
    caution:
      "Not advisable if Venus is debilitated or a functional malefic. Consult before wearing.",
  },
  Saturn: {
    primary: "Blue Sapphire (Neelam)",
    alt: "Amethyst, Blue Spinel",
    metal: "Silver/Iron",
    finger: "Middle finger",
    day: "Saturday",
    benefits:
      "Blue Sapphire can bring rapid results in career, discipline, and long-term wealth. It helps overcome delays, legal issues, and chronic problems. Extremely powerful when suited to the wearer.",
    caution:
      "Blue Sapphire is the most sensitive gemstone. It MUST be trial-worn for 3 days before permanent use. Never wear without expert consultation.",
  },
  Rahu: {
    primary: "Hessonite (Gomed)",
    alt: "Orange Zircon",
    metal: "Silver",
    finger: "Middle finger",
    day: "Saturday",
    benefits:
      "Hessonite neutralizes the malefic effects of Rahu, helps with confusion, addictions, and foreign connections. It supports success in unconventional fields and overseas endeavors.",
    caution:
      "Only wear if Rahu is positively placed or during Rahu Mahadasha. Expert analysis is essential.",
  },
  Ketu: {
    primary: "Cat's Eye (Lehsunia)",
    alt: "Tiger's Eye",
    metal: "Silver",
    finger: "Little finger",
    day: "Tuesday",
    benefits:
      "Cat's Eye protects against hidden enemies, accidents, and supernatural influences. It enhances spiritual progress, detachment, and mystical abilities. Good during Ketu Mahadasha.",
    caution:
      "Highly sensitive stone similar to Blue Sapphire. Trial wear is recommended. Consult an experienced astrologer.",
  },
};

const PLANET_NAMES = ["Sun", "Moon", "Mars", "Mercury", "Jupiter", "Venus", "Saturn", "Rahu", "Ketu"] as const;

interface PlanetData {
  rashi: number;
  rashiName: string;
  degree: number;
  isRetrograde: boolean;
  dignity: string;
}

interface KundliResult {
  ascendant: { rashi: number; rashiName: string; nakshatra: string };
  planets: Record<string, PlanetData>;
  dasha?: { currentMahadasha?: { planet: string; endTime: Date | string } };
}

interface AdditionalRec {
  planet: string;
  condition: string;
  gemstone: GemstoneInfo;
}

// --- Default observer: Gurugram ---
const DEFAULT_ELEVATION = 217;

export default function GemstoneRecommenderPage() {
  const [birthDate, setBirthDate] = useState("");
  const [birthTime, setBirthTime] = useState("");
  const [result, setResult] = useState<{
    kundli: KundliResult;
    primaryPlanet: string;
    primaryGemstone: GemstoneInfo;
    additional: AdditionalRec[];
  } | null>(null);
  const [error, setError] = useState("");
  const [dobDate, setDobDate] = useState<Date | undefined>(undefined);
  const [place, setPlace] = useState("Gurugram");
  const [lat, setLat] = useState(28.4595);
  const [lon, setLon] = useState(77.0266);

  function handleCalculate() {
    setError("");
    setResult(null);

    if (!birthDate || !birthTime) {
      setError("Please enter both date and time of birth.");
      return;
    }

    try {
      const [year, month, day] = birthDate.split("-").map(Number);
      const [hour, minute] = birthTime.split(":").map(Number);

      const observer = new Observer(lat, lon, DEFAULT_ELEVATION);
      const kundli = getKundli(
        new Date(year, month - 1, day, hour, minute),
        observer
      ) as unknown as KundliResult;

      // Primary gemstone from ascendant lord
      const ascRashi = kundli.ascendant.rashi;
      const primaryPlanet = rashiToLord[ascRashi] || "Sun";
      const primaryGemstone = planetToGemstone[primaryPlanet];

      // Additional recommendations from weak/afflicted planets
      const additional: AdditionalRec[] = [];
      const planets = kundli.planets || {};

      for (const name of PLANET_NAMES) {
        if (name === primaryPlanet) continue;
        const p = planets[name];
        if (!p) continue;

        let condition = "";
        if (p.dignity === "debilitated") condition = "Debilitated";
        else if (p.dignity === "enemy") condition = "In enemy sign";
        else if (p.isRetrograde) condition = "Retrograde";

        if (condition && planetToGemstone[name]) {
          additional.push({
            planet: name,
            condition,
            gemstone: planetToGemstone[name],
          });
        }
      }

      setResult({ kundli, primaryPlanet, primaryGemstone, additional });
    } catch {
      setError("Could not calculate Kundli. Please check your inputs and try again.");
    }
  }

  const moonRashiName = result
    ? rashiNames[result.kundli.planets?.Moon?.rashi] || result.kundli.planets?.Moon?.rashiName || "---"
    : "";
  const sunRashiName = result
    ? rashiNames[result.kundli.planets?.Sun?.rashi] || result.kundli.planets?.Sun?.rashiName || "---"
    : "";

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
              <Gem className="h-3.5 w-3.5 text-accent" />
              Vedic Gemstone Therapy
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-heading mb-4 leading-tight">
              Gemstone Recommender
            </h1>
            <p className="text-white/70 text-base md:text-lg max-w-lg mx-auto">
              Discover the perfect gemstone for you based on your birth chart. Our Vedic astrology engine analyzes your
              Kundli to recommend stones that strengthen beneficial planets and protect against afflictions.
            </p>
          </div>
        </div>
      </section>

      {/* Form Section */}
      <section className="py-12 md:py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-md mx-auto">
            <Card className="shadow-lg border-primary/10">
              <CardHeader className="text-center pb-2">
                <CardTitle className="text-xl font-heading flex items-center justify-center gap-2 text-primary">
                  <Sparkles className="h-5 w-5 text-secondary" />
                  Enter Your Birth Details
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-5">
                <div className="space-y-2">
                  <Label className="text-sm font-medium text-gray-700 flex items-center gap-1.5">
                    <CalendarDays className="h-3.5 w-3.5 text-primary" />
                    Date of Birth
                  </Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full justify-start text-left font-normal rounded-xl h-10",
                          !dobDate && "text-gray-400"
                        )}
                      >
                        <CalendarDays className="h-4 w-4 mr-2 text-primary" />
                        {dobDate ? format(dobDate, "dd MMMM yyyy") : "Select date of birth"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <CalendarPicker
                        mode="single"
                        selected={dobDate}
                        onSelect={(date) => {
                          setDobDate(date);
                          if (date) {
                            const y = date.getFullYear();
                            const m = String(date.getMonth() + 1).padStart(2, "0");
                            const d = String(date.getDate()).padStart(2, "0");
                            setBirthDate(`${y}-${m}-${d}`);
                          }
                        }}
                        defaultMonth={dobDate || new Date(2000, 0)}
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
                <div className="space-y-2">
                  <Label className="text-sm font-medium text-gray-700 flex items-center gap-1.5">
                    <Clock className="h-3.5 w-3.5 text-primary" />
                    Time of Birth
                  </Label>
                  <Input
                    type="time"
                    value={birthTime}
                    onChange={(e) => setBirthTime(e.target.value)}
                    className="rounded-xl"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-sm font-medium text-gray-700 flex items-center gap-1.5">
                    <MapPin className="h-3.5 w-3.5 text-primary" />
                    Place of Birth
                  </Label>
                  <LocationSearch
                    defaultValue="Gurugram"
                    onSelect={(loc) => {
                      setPlace(loc.name);
                      setLat(loc.lat);
                      setLon(loc.lon);
                    }}
                  />
                  <p className="text-[11px] text-gray-400">
                    {place} — {lat.toFixed(4)}°N, {lon.toFixed(4)}°E
                  </p>
                </div>
                {error && (
                  <p className="text-sm text-red-600 text-center">{error}</p>
                )}
                <Button
                  onClick={handleCalculate}
                  className="w-full bg-primary hover:bg-primary/90 text-white font-semibold py-3"
                >
                  <Gem className="h-4 w-4 mr-2" />
                  Find My Gemstones
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Results Section */}
      {result && (
        <section className="py-12 md:py-16 bg-white">
          <div className="container mx-auto px-4 space-y-12">
            {/* Primary Gemstone */}
            <div className="max-w-2xl mx-auto">
              <div className="text-center mb-6">
                <p className="text-xs font-bold uppercase tracking-widest text-secondary mb-2">
                  Your Primary Gemstone
                </p>
                <h2 className="text-2xl md:text-3xl font-bold font-heading text-gray-900">
                  Based on Your Ascendant
                </h2>
              </div>
              <Card className="shadow-xl border-2 border-accent/40 overflow-hidden">
                <div className="bg-linear-to-r from-primary to-primary/80 p-6 text-white text-center">
                  <Gem className="h-12 w-12 mx-auto mb-3 text-accent" />
                  <h3 className="text-2xl md:text-3xl font-bold font-heading">
                    {result.primaryGemstone.primary}
                  </h3>
                  <p className="text-white/80 mt-2 text-sm">
                    Based on your Ascendant:{" "}
                    <span className="text-accent font-semibold">
                      {rashiNames[result.kundli.ascendant.rashi] || result.kundli.ascendant.rashiName}
                    </span>{" "}
                    &mdash; Ruled by{" "}
                    <span className="text-accent font-semibold">{result.primaryPlanet}</span>
                  </p>
                </div>
                <CardContent className="p-6 space-y-5">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1 flex items-center gap-1.5">
                      <ShieldCheck className="h-4 w-4 text-primary" />
                      Benefits
                    </h4>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      {result.primaryGemstone.benefits}
                    </p>
                  </div>

                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div className="bg-background rounded-lg p-3">
                      <p className="text-xs text-gray-500 mb-1">Metal</p>
                      <p className="text-sm font-semibold text-gray-800">{result.primaryGemstone.metal}</p>
                    </div>
                    <div className="bg-background rounded-lg p-3">
                      <Hand className="h-3.5 w-3.5 mx-auto text-secondary mb-1" />
                      <p className="text-xs text-gray-500 mb-1">Finger</p>
                      <p className="text-sm font-semibold text-gray-800">{result.primaryGemstone.finger}</p>
                    </div>
                    <div className="bg-background rounded-lg p-3">
                      <Calendar className="h-3.5 w-3.5 mx-auto text-secondary mb-1" />
                      <p className="text-xs text-gray-500 mb-1">Best Day</p>
                      <p className="text-sm font-semibold text-gray-800">{result.primaryGemstone.day}</p>
                    </div>
                  </div>

                  <div>
                    <p className="text-xs text-gray-500 mb-1">Alternative Stones</p>
                    <p className="text-sm font-medium text-gray-700">{result.primaryGemstone.alt}</p>
                  </div>

                  <div className="bg-amber-50 border border-amber-200 rounded-lg p-3">
                    <p className="text-xs text-amber-800">
                      <AlertTriangle className="h-3 w-3 inline mr-1" />
                      {result.primaryGemstone.caution}
                    </p>
                  </div>

                  <Link href="/shop" className="block">
                    <Button className="w-full bg-secondary hover:bg-secondary/90 text-white font-semibold">
                      Shop {result.primaryGemstone.primary.split(" (")[0]}
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </div>

            {/* Additional Recommendations */}
            {result.additional.length > 0 && (
              <div className="max-w-4xl mx-auto">
                <div className="text-center mb-6">
                  <p className="text-xs font-bold uppercase tracking-widest text-secondary mb-2">
                    Additional Recommendations
                  </p>
                  <h2 className="text-2xl md:text-3xl font-bold font-heading text-gray-900">
                    Strengthen Weak Planets
                  </h2>
                  <p className="text-gray-500 text-sm mt-1">
                    These planets need support in your birth chart
                  </p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                  {result.additional.map((rec) => (
                    <Card key={rec.planet} className="shadow-md border-gray-200 hover:shadow-lg transition-shadow">
                      <CardContent className="p-5 space-y-3">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                              <Star className="h-4 w-4 text-primary" />
                            </div>
                            <div>
                              <p className="font-semibold text-gray-900 text-sm">{rec.planet}</p>
                              <p className="text-xs text-red-600 font-medium">{rec.condition}</p>
                            </div>
                          </div>
                          <Gem className="h-5 w-5 text-accent" />
                        </div>
                        <div>
                          <p className="font-semibold text-primary text-sm">{rec.gemstone.primary}</p>
                          <p className="text-xs text-gray-500 mt-1 line-clamp-2">{rec.gemstone.benefits}</p>
                        </div>
                        <div className="flex items-center justify-between text-xs text-gray-500">
                          <span>{rec.gemstone.metal} &middot; {rec.gemstone.finger}</span>
                          <span>{rec.gemstone.day}</span>
                        </div>
                        <Link href="/shop">
                          <Button
                            variant="outline"
                            size="sm"
                            className="w-full border-primary/20 text-primary hover:bg-primary/5 text-xs"
                          >
                            Shop {rec.gemstone.primary.split(" (")[0]}
                            <ArrowRight className="h-3 w-3 ml-1" />
                          </Button>
                        </Link>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )}

            {/* Birth Chart Summary */}
            <div className="max-w-2xl mx-auto">
              <div className="text-center mb-6">
                <p className="text-xs font-bold uppercase tracking-widest text-secondary mb-2">
                  Your Birth Chart
                </p>
                <h2 className="text-2xl md:text-3xl font-bold font-heading text-gray-900">
                  Summary
                </h2>
              </div>
              <Card className="shadow-md border-gray-200">
                <CardContent className="p-6">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                    <div className="bg-background rounded-lg p-4">
                      <Star className="h-5 w-5 mx-auto mb-2 text-primary" />
                      <p className="text-xs text-gray-500 mb-1">Ascendant (Lagna)</p>
                      <p className="font-semibold text-gray-900 text-sm">
                        {rashiNames[result.kundli.ascendant.rashi] || result.kundli.ascendant.rashiName}
                      </p>
                      <p className="text-xs text-gray-500 mt-0.5">
                        {result.kundli.ascendant.nakshatra}
                      </p>
                    </div>
                    <div className="bg-background rounded-lg p-4">
                      <Moon className="h-5 w-5 mx-auto mb-2 text-primary" />
                      <p className="text-xs text-gray-500 mb-1">Moon Sign</p>
                      <p className="font-semibold text-gray-900 text-sm">{moonRashiName}</p>
                    </div>
                    <div className="bg-background rounded-lg p-4">
                      <Sun className="h-5 w-5 mx-auto mb-2 text-secondary" />
                      <p className="text-xs text-gray-500 mb-1">Sun Sign</p>
                      <p className="font-semibold text-gray-900 text-sm">{sunRashiName}</p>
                    </div>
                    <div className="bg-background rounded-lg p-4">
                      <Sparkles className="h-5 w-5 mx-auto mb-2 text-accent" />
                      <p className="text-xs text-gray-500 mb-1">Mahadasha</p>
                      <p className="font-semibold text-gray-900 text-sm">
                        {result.kundli.dasha?.currentMahadasha?.planet || "---"}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Important Note / Disclaimer */}
            <div className="max-w-2xl mx-auto">
              <Card className="border-amber-300 bg-amber-50 shadow-sm">
                <CardContent className="p-5 flex gap-3">
                  <AlertTriangle className="h-5 w-5 text-amber-600 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-amber-900 mb-1">Important Note</h4>
                    <p className="text-sm text-amber-800 leading-relaxed">
                      Gemstone recommendations are based on Vedic astrology principles. Please consult a qualified
                      astrologer before wearing any gemstone, especially Blue Sapphire (Neelam). The effectiveness of
                      gemstones depends on stone quality, correct weight, and proper energization (Pran Pratishtha).
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      )}

      {/* FAQ Section */}
      <FaqSection
        description="Vedic gemstones, also known as Ratnas, channel planetary energies from your birth chart to amplify benefic influences and soothe afflictions. Below are answers to the most common questions about lucky gemstone recommendations, the Navaratna system, Pukhraj, Neelam, certification, weight, and how to wear them safely."
        faqs={[
          {
            question: "How do Vedic gemstones actually work?",
            answer: "Each gemstone is believed to act like an antenna for a specific planet. Ruby resonates with the Sun, Pearl with the Moon, Pukhraj with Jupiter, and so on. When the matching planet is benefic but weak in your Kundli, wearing its stone is said to absorb cosmic rays of that planet through the skin and strengthen its influence in areas like career, marriage, health, or wealth.",
          },
          {
            question: "What is Navaratna and which 9 gemstones make it up?",
            answer: "Navaratna means nine gems, one for each of the nine Vedic planets. The traditional set is Ruby for Sun, Pearl for Moon, Red Coral for Mars, Emerald for Mercury, Yellow Sapphire (Pukhraj) for Jupiter, Diamond for Venus, Blue Sapphire (Neelam) for Saturn, Hessonite (Gomed) for Rahu, and Cat's Eye (Lehsunia) for Ketu. A Navaratna pendant combines all nine in a fixed pattern.",
          },
          {
            question: "Why should gemstone choice be based on the birth chart and not just zodiac sign?",
            answer: "Sun-sign suggestions are too generic. The right gemstone depends on your Lagna (ascendant), the strength of planets in your chart, the houses they rule, and the current Mahadasha. Two people born under the same sign can need very different stones. Our recommender uses your full birth date, time, and place to compute the Kundli, which is far more accurate than zodiac-only advice.",
          },
          {
            question: "Can a wrong gemstone harm you?",
            answer: "Yes, especially Blue Sapphire (Neelam). If Saturn is malefic for your ascendant, Neelam can intensify struggles instead of helping. Even Pukhraj or Moonga can backfire when the ruling planet sits in a hostile house. This is why we recommend a 3-day trial wear for sensitive stones and always suggest confirming with a qualified astrologer before permanent use.",
          },
          {
            question: "What is the minimum carat weight for a gemstone to work?",
            answer: "A common Vedic guideline is one ratti (around 0.91 carats) for every 12 kilograms of body weight, with most adults wearing between 3 and 7 carats. Ruby, Pukhraj, and Neelam usually start showing effects from 3 carats. Pearl and Moonga can be effective at 5 to 7 carats. Quality matters more than size, an untreated 3-carat stone outperforms a treated 7-carat one.",
          },
          {
            question: "Which finger and metal should I use for my gemstone?",
            answer: "Pukhraj goes on the index finger in gold. Ruby and Moonga sit on the ring finger, Ruby in gold and Moonga in copper or gold. Pearl and Emerald are worn on the little finger in silver or gold. Neelam, Diamond, and Gomed go on the middle finger. Cat's Eye sits on the little finger in silver. Always wear the gem so it touches the skin to allow energy flow.",
          },
          {
            question: "How do I energize or activate a gemstone before wearing?",
            answer: "On the planet's day and during a clean Hora or Choghadiya, soak the ring in raw cow milk, Ganga jal, or a mix of milk, honey, curd, ghee, and sugar (Panchamrit) for a few hours. Then chant the planet's beej mantra 108 times, light a diya, and wear the ring with the planet's mantra in mind. This Pran Pratishtha process is believed to awaken the stone's vibration.",
          },
          {
            question: "What are uparatnas and when should I use a substitute stone?",
            answer: "Uparatnas are softer, more affordable substitutes for the nine main gems. Yellow Topaz or Citrine substitutes Pukhraj, Garnet or Red Spinel for Ruby, Green Tourmaline or Peridot for Emerald, Amethyst for Neelam, and White Sapphire or Zircon for Diamond. They work at lower intensity but are useful when budget is tight or when you want to test compatibility before investing in a precious stone.",
          },
          {
            question: "Why is gemstone certification important?",
            answer: "A genuine natural gemstone with no heat or chemical treatment is essential for astrological results. Always insist on a lab certificate from GIA, IGI, GRS, Gubelin, or an equivalent gemmological lab. The report should mention origin, treatment status, weight in carats, and clarity. Treated, glass-filled, or synthetic stones are cheap but carry no astrological value and can mislead the wearer.",
          },
          {
            question: "When should I remove or replace my gemstone?",
            answer: "If a stone develops a visible crack, internal cloudiness, or simply slips off on its own, treat it as a sign that the gem has absorbed energy and needs replacement. Many wearers re-energize their gem every six months. Remove the stone when its planet's Mahadasha or Antardasha ends and the next planet becomes more relevant. A short astrology check before replacing is always wise.",
          },
        ]}
      />

      {/* Bottom CTA */}
      <section className={cn("py-12 md:py-16", result ? "bg-background" : "bg-white")}>
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center space-y-6">
            <h2 className="text-2xl md:text-3xl font-bold font-heading text-gray-900">
              Need Expert Guidance?
            </h2>
            <p className="text-gray-500 max-w-lg mx-auto">
              Our experienced Vedic astrologers can provide personalized gemstone recommendations based on a detailed
              analysis of your complete birth chart.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <ConsultationButton service="Gemstone Consultation" className="bg-primary hover:bg-primary/90 text-white font-semibold px-8">
                Get Personalized Consultation
                <ArrowRight className="h-4 w-4 ml-2" />
              </ConsultationButton>
              <Link href="/shop">
                <Button
                  variant="outline"
                  className="border-primary text-primary hover:bg-primary/5 font-semibold px-8"
                >
                  <Gem className="h-4 w-4 mr-2" />
                  Shop All Gemstones
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </MainLayout>
  );
}
