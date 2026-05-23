"use client";

import {
  Gem,
  Hash,
  Palette,
  CalendarDays,
  Compass,
  Sparkles,
  Coins,
  Heart,
} from "lucide-react";

import { cn } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";
import type { LuckyAttributes } from "@/lib/astrology/lucky-attributes";

export interface LuckyAttributesCardProps {
  attributes: LuckyAttributes;
  className?: string;
}

export function LuckyAttributesCard({
  attributes,
  className,
}: LuckyAttributesCardProps) {
  return (
    <Card
      className={cn(
        "border-gray-100 shadow-sm overflow-hidden",
        className,
      )}
    >
      <div className="bg-gradient-to-br from-accent/15 via-secondary/10 to-primary/10 px-5 md:px-6 py-4 border-b border-gray-100">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-white/80 backdrop-blur flex items-center justify-center shadow-sm">
            <Sparkles className="h-5 w-5 text-primary" />
          </div>
          <div>
            <p className="text-[11px] font-bold uppercase tracking-widest text-secondary mb-0.5">
              Your Lucky Signature
            </p>
            <h3 className="text-base md:text-lg font-bold font-heading text-gray-900">
              Lucky Stones, Numbers &amp; More
            </h3>
            <p className="text-xs text-gray-500 mt-0.5">
              Based on your Chandra Rashi: <span className="font-semibold text-primary">{attributes.rashiName}</span> ({attributes.hindi}) {attributes.symbol}
            </p>
          </div>
        </div>
      </div>

      <CardContent className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 pt-5">
        <Tile
          icon={Gem}
          label="Lucky Gemstone"
          value={attributes.gemstone}
          sub={`Alternate: ${attributes.alternateStone}`}
          accent="text-primary"
          bg="bg-primary/10"
        />
        <Tile
          icon={Hash}
          label="Lucky Numbers"
          value={attributes.numbers.join(" • ")}
          sub="Auspicious for important decisions"
          accent="text-secondary"
          bg="bg-secondary/10"
        />
        <Tile
          icon={Palette}
          label="Lucky Colors"
          value={attributes.colors.join(", ")}
          sub="Wear on key occasions"
          accent="text-accent"
          bg="bg-accent/15"
          swatches={attributes.colorHex}
        />
        <Tile
          icon={CalendarDays}
          label="Lucky Day"
          value={attributes.day}
          sub={`Ruled by ${attributes.ruler}`}
          accent="text-primary"
          bg="bg-primary/10"
        />
        <Tile
          icon={Compass}
          label="Lucky Direction"
          value={attributes.direction}
          sub="Face this direction for prayers"
          accent="text-secondary"
          bg="bg-secondary/10"
        />
        <Tile
          icon={Coins}
          label="Lucky Metal"
          value={attributes.metal}
          sub="Auspicious for jewellery"
          accent="text-accent"
          bg="bg-accent/15"
        />
        <Tile
          icon={Heart}
          label="Ishta Devata"
          value={attributes.deity}
          sub="Personal deity for worship"
          accent="text-primary"
          bg="bg-primary/10"
        />
        <div className="sm:col-span-2 rounded-2xl border border-amber-100 bg-amber-50/40 px-4 py-3.5">
          <div className="flex items-center gap-2 mb-1">
            <Sparkles className="h-3.5 w-3.5 text-amber-700" />
            <span className="text-[11px] font-bold uppercase tracking-widest text-amber-700">
              Daily Mantra
            </span>
          </div>
          <p className="text-base md:text-lg font-heading text-gray-900 leading-snug">
            {attributes.mantra}
          </p>
          <p className="text-[11px] text-gray-500 mt-1">
            Chant 108 times on {attributes.day} for best results.
          </p>
        </div>
      </CardContent>

      <div className="px-5 md:px-6 pb-4 pt-1">
        <p className="text-[11px] text-gray-400 italic">
          ✦ Always consult an experienced astrologer before wearing a gemstone — incompatible stones can give adverse results.
        </p>
      </div>
    </Card>
  );
}

interface TileProps {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string;
  sub?: string;
  accent: string;
  bg: string;
  swatches?: string[];
}

function Tile({ icon: Icon, label, value, sub, accent, bg, swatches }: TileProps) {
  return (
    <div className="group rounded-2xl border border-gray-100 bg-white p-3.5 transition-all duration-200 hover:border-primary/20 hover:shadow-md hover:-translate-y-0.5">
      <div className="flex items-start gap-3">
        <div className={cn("w-9 h-9 rounded-lg flex items-center justify-center shrink-0", bg)}>
          <Icon className={cn("h-4 w-4", accent)} />
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-[10px] font-bold uppercase tracking-wider text-gray-500 mb-0.5">
            {label}
          </p>
          <div className="flex items-center gap-2 flex-wrap">
            <p className="text-sm font-semibold text-gray-900 leading-snug">
              {value}
            </p>
            {swatches && (
              <div className="flex items-center gap-1">
                {swatches.map((hex) => (
                  <span
                    key={hex}
                    className="inline-block w-3.5 h-3.5 rounded-full border border-gray-200 shadow-sm"
                    style={{ backgroundColor: hex }}
                    aria-hidden
                  />
                ))}
              </div>
            )}
          </div>
          {sub && (
            <p className="text-[11px] text-gray-500 mt-1 leading-snug">
              {sub}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
