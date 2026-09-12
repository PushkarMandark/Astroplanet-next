"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

// How long the bar may run before we assume the navigation is not going to
// finish (offline, blocked, etc.) and hide it so it never gets stuck on.
const SAFETY_TIMEOUT_MS = 20_000;

/**
 * Thin indeterminate bar across the top of the viewport while a navigation is
 * in flight.
 *
 * Why: this site is a static export served from a slow shared host. A click on
 * any nav link makes Next fetch that route's payload (1-3 s here) before
 * anything on screen changes, and the App Router ships no built-in indicator
 * for that gap - users read it as "the page is stuck". The bar starts on the
 * click itself, before React knows anything about the navigation, so it also
 * shows through the full-reload fallback Next uses when a payload fetch fails.
 *
 * It finishes when the pathname actually changes (derived, not set in an
 * effect - this repo's lint config treats setState-in-effect as an error), and
 * a safety timeout hides it if the route never changes.
 */
export function NavigationProgress() {
    const pathname = usePathname();
    // The pathname we were on when the user clicked. The bar shows only while
    // we are still on that pathname; the moment the route changes, this no
    // longer matches and the bar disappears without any effect-driven setState.
    const [startedOn, setStartedOn] = useState<string | null>(null);
    const showing = startedOn !== null && startedOn === pathname;

    // Start on any same-origin link click that will change the URL. Bubble
    // phase (not capture) so components that preventDefault are respected.
    // Re-subscribed on pathname change so the closure always sees the live one.
    useEffect(() => {
        const onClick = (event: MouseEvent) => {
            if (event.defaultPrevented || event.button !== 0) return;
            if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;

            const target = event.target as Element | null;
            const anchor = target?.closest?.("a[href]") as HTMLAnchorElement | null;
            if (!anchor) return;
            if (anchor.target && anchor.target !== "_self") return;
            if (anchor.hasAttribute("download")) return;

            const rawHref = anchor.getAttribute("href") ?? "";
            if (rawHref.startsWith("#") || rawHref.startsWith("mailto:") || rawHref.startsWith("tel:")) return;

            let url: URL;
            try {
                url = new URL(anchor.href, window.location.href);
            } catch {
                return;
            }
            if (url.origin !== window.location.origin) return;
            if (url.pathname === window.location.pathname && url.search === window.location.search) return;

            setStartedOn(pathname);
        };
        document.addEventListener("click", onClick);
        return () => document.removeEventListener("click", onClick);
    }, [pathname]);

    // Never leave the bar running forever.
    useEffect(() => {
        if (!showing) return;
        const timer = window.setTimeout(() => setStartedOn(null), SAFETY_TIMEOUT_MS);
        return () => window.clearTimeout(timer);
    }, [showing]);

    return (
        <div
            role="progressbar"
            aria-hidden={!showing}
            aria-busy={showing}
            aria-label="Loading page"
            className={`pointer-events-none fixed inset-x-0 top-0 z-[60] h-[3px] overflow-hidden transition-opacity duration-200 ${
                showing ? "opacity-100" : "opacity-0"
            }`}
        >
            {/* Brand gold (designTokens.accent) via an arbitrary value: shadcn's
                `bg-accent` token is a neutral hover colour, not the brand gold. */}
            <div
                className="h-full w-1/3 rounded-r-full bg-[#EDC43A] shadow-[0_0_8px_rgba(237,196,58,0.9)]"
                style={{ animation: showing ? "astro-nav-progress 1.2s ease-in-out infinite" : "none" }}
            />
        </div>
    );
}
