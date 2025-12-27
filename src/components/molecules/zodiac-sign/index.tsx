"use client";

import { cn } from "@/lib/utils";
import { HoroscopeSign } from "@/types";

interface ZodiacSignProps {
    sign: HoroscopeSign;
    isSelected?: boolean;
    onClick?: (sign: HoroscopeSign) => void;
    size?: "sm" | "md" | "lg";
    className?: string;
}

export function ZodiacSign({
    sign,
    isSelected = false,
    onClick,
    size = "md",
    className,
}: ZodiacSignProps) {
    const sizeClasses = {
        sm: "p-3",
        md: "p-5",
        lg: "p-8",
    };

    const iconSizeClasses = {
        sm: "text-2xl w-10 h-10",
        md: "text-3xl w-14 h-14",
        lg: "text-5xl w-20 h-20",
    };

    return (
        <button
            onClick={() => onClick?.(sign)}
            className={cn(
                "flex flex-col items-center rounded-xl transition-all duration-300 group",
                sizeClasses[size],
                isSelected
                    ? "bg-gradient-to-br from-primary to-primary/80 shadow-lg shadow-primary/20 scale-105"
                    : "bg-white hover:bg-gradient-to-br hover:from-primary/5 hover:to-secondary/5 border border-gray-100 hover:border-primary/30 hover:shadow-lg",
                className
            )}
        >
            {/* Icon container with brand gradient */}
            <div className={cn(
                "flex items-center justify-center rounded-xl mb-3 transition-all duration-300",
                iconSizeClasses[size],
                isSelected
                    ? "bg-white/20"
                    : "bg-gradient-to-br from-primary/10 to-secondary/10 group-hover:from-primary/20 group-hover:to-secondary/20"
            )}>
                <span className={cn(
                    "transition-colors duration-300",
                    isSelected ? "text-white" : "text-primary"
                )}>
                    {sign.symbol}
                </span>
            </div>

            {/* Sign name */}
            <span className={cn(
                "font-bold text-sm transition-colors",
                isSelected ? "text-white" : "text-gray-800"
            )}>
                {sign.name}
            </span>

            {/* Hindi name */}
            <span className={cn(
                "text-xs transition-colors",
                isSelected ? "text-white/80" : "text-primary"
            )}>
                {sign.hindi}
            </span>

            {/* Dates */}
            <span className={cn(
                "text-xs mt-1 transition-colors",
                isSelected ? "text-white/70" : "text-muted-foreground"
            )}>
                {sign.dates}
            </span>
        </button>
    );
}
