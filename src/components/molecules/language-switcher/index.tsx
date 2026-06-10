"use client";

import { Languages } from "lucide-react";
import { cn } from "@/lib/utils";
import { useLanguageStore, type Lang } from "@/lib/i18n";
import { useMounted } from "@/lib/hooks/use-mounted";

const OPTIONS: { value: Lang; label: string }[] = [
    { value: "en", label: "English" },
    { value: "hi", label: "हिंदी" },
];

export interface LanguageSwitcherProps {
    className?: string;
}

/**
 * EN / हिंदी toggle bound to the shared language store. Stateless beyond the
 * store; any page using `useT`/`useLang` re-renders when the language changes.
 */
export function LanguageSwitcher({ className }: LanguageSwitcherProps) {
    const lang = useLanguageStore((s) => s.lang);
    const setLang = useLanguageStore((s) => s.setLang);
    const mounted = useMounted();

    // Render the default ("en") on the server / before hydration to keep markup stable.
    const active: Lang = mounted ? lang : "en";

    return (
        <div
            role="radiogroup"
            aria-label="Select language"
            className={cn(
                "inline-flex items-center gap-1 rounded-full border border-gray-200 bg-white p-1 shadow-sm",
                className
            )}
        >
            <Languages className="ml-1.5 h-4 w-4 text-gray-400" aria-hidden="true" />
            {OPTIONS.map((opt) => (
                <button
                    key={opt.value}
                    type="button"
                    role="radio"
                    aria-checked={active === opt.value}
                    onClick={() => setLang(opt.value)}
                    className={cn(
                        "rounded-full px-3 py-1 text-sm font-medium transition-colors",
                        active === opt.value
                            ? "bg-[#800909] text-white"
                            : "text-gray-600 hover:bg-gray-100"
                    )}
                >
                    {opt.label}
                </button>
            ))}
        </div>
    );
}
