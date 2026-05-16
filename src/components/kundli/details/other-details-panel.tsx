"use client";

import {
  Crown,
  Droplets,
  Flame,
  Gem,
  Heart,
  Magnet,
  PawPrint,
  Sparkles,
  Star,
  Sun,
} from "lucide-react";

import { cn } from "@/lib/utils";
import type { BirthAttributes } from "@/lib/astrology/birth-attributes";

export interface OtherDetailsPanelProps {
  attributes: BirthAttributes;
  className?: string;
}

interface Row {
  key: keyof BirthAttributes;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
}

const ROWS: readonly Row[] = [
  { key: "rashiPaya", label: "Rashi Paya", icon: Gem },
  { key: "nakshatraPaya", label: "Nakshatra Paya", icon: Gem },
  { key: "tattva", label: "Tattva", icon: Flame },
  { key: "yunja", label: "Yunja", icon: Sun },
  { key: "varna", label: "Varna", icon: Crown },
  { key: "vashya", label: "Vashya", icon: Magnet },
  { key: "tara", label: "Tara", icon: Star },
  { key: "yoni", label: "Yoni", icon: PawPrint },
  { key: "gana", label: "Gana", icon: Sparkles },
  { key: "nadi", label: "Nadi", icon: Droplets },
];

export function OtherDetailsPanel({
  attributes,
  className,
}: OtherDetailsPanelProps) {
  return (
    <section
      className={cn(
        "rounded-2xl border border-gray-100 bg-white p-5 shadow-sm",
        className,
      )}
      aria-label="Other classical birth attributes"
    >
      <header className="mb-4 flex items-start gap-3">
        <span className="mt-0.5 inline-flex h-9 w-9 items-center justify-center rounded-full bg-primary/10 text-primary">
          <Heart className="h-4 w-4" aria-hidden="true" />
        </span>
        <div>
          <h3 className="font-playfair text-lg font-semibold text-gray-900">
            Other Details
          </h3>
          <p className="text-xs text-gray-500">Classical Janma Attributes</p>
        </div>
      </header>

      <dl className="overflow-hidden rounded-xl border border-gray-100">
        {ROWS.map((row, idx) => {
          const Icon = row.icon;
          const value = attributes[row.key] || "—";
          const striped = idx % 2 === 0 ? "bg-gray-50" : "bg-white";
          return (
            <div
              key={row.key}
              className={cn(
                "grid grid-cols-[1fr_auto] items-center gap-3 px-3 py-2.5 sm:grid-cols-2 sm:px-4 sm:py-3",
                striped,
              )}
            >
              <dt className="flex min-w-0 items-center gap-2 text-sm text-gray-700">
                <Icon
                  className="h-4 w-4 shrink-0 text-primary/70"
                  aria-hidden="true"
                />
                <span className="truncate">{row.label}</span>
              </dt>
              <dd className="text-right text-sm font-semibold text-primary sm:text-left">
                {value}
              </dd>
            </div>
          );
        })}
      </dl>
    </section>
  );
}
