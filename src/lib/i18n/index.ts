// Lightweight client-side i18n for the free-tool pages.
// Language preference persists via localStorage (same pattern as cart/wishlist stores).
// Dictionaries follow the shape { en: {...}, hi: {...} } where `hi` mirrors every key of `en`.

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { LabelLang } from "@/lib/astrology/chart-types";

export type Lang = "en" | "hi";

/** A translation dictionary: an `en` block and a `hi` block with identical keys. */
export type Dictionary<K extends string = string> = {
    en: Record<K, string>;
    hi: Record<K, string>;
};

interface LanguageState {
    lang: Lang;
    setLang: (lang: Lang) => void;
    toggleLang: () => void;
}

export const useLanguageStore = create<LanguageState>()(
    persist(
        (set, get) => ({
            lang: "en",
            setLang: (lang: Lang) => set({ lang }),
            toggleLang: () => set({ lang: get().lang === "en" ? "hi" : "en" }),
        }),
        { name: "astroplanet-lang" }
    )
);

/** Current UI language (`"en" | "hi"`). */
export function useLang(): Lang {
    return useLanguageStore((s) => s.lang);
}

/**
 * Returns a translator bound to the current language for the given dictionary.
 * `t(key)` returns the string for the active language, falling back to the
 * English value (then the raw key) if a key is missing.
 */
export function useT<D extends Dictionary>(dict: D) {
    const lang = useLang();
    return (key: keyof D["en"]): string => {
        const table = dict[lang] as Record<string, string>;
        const fallback = dict.en as Record<string, string>;
        return table[key as string] ?? fallback[key as string] ?? String(key);
    };
}

/** Maps the i18n language code to the chart renderers' `LabelLang`. */
export function toLabelLang(lang: Lang): LabelLang {
    return lang === "hi" ? "hindi" : "english";
}
