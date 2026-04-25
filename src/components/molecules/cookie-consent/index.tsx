"use client";

import Link from "next/link";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Button } from "@/components/ui/button";
import { useMounted } from "@/lib/hooks/use-mounted";

type ConsentStatus = "pending" | "accepted" | "rejected";

interface CookieConsentState {
    status: ConsentStatus;
    accept: () => void;
    reject: () => void;
}

const useCookieConsentStore = create<CookieConsentState>()(
    persist(
        (set) => ({
            status: "pending",
            accept: () => set({ status: "accepted" }),
            reject: () => set({ status: "rejected" }),
        }),
        {
            name: "astroplanet-cookie-consent",
            partialize: (state) => ({ status: state.status }),
        }
    )
);

export function CookieConsent() {
    const mounted = useMounted();
    const status = useCookieConsentStore((s) => s.status);
    const accept = useCookieConsentStore((s) => s.accept);
    const reject = useCookieConsentStore((s) => s.reject);

    if (!mounted) return null;
    if (status !== "pending") return null;

    return (
        <div
            role="dialog"
            aria-live="polite"
            aria-label="Cookie consent"
            className="fixed bottom-0 inset-x-0 z-50 border-t border-primary bg-[#FFF9F0] shadow-[0_-4px_16px_rgba(0,0,0,0.08)]"
        >
            <div className="container mx-auto px-4 py-4 flex flex-col md:flex-row md:items-center gap-4">
                <p className="text-sm text-foreground/80 flex-1 leading-relaxed">
                    We use cookies to improve your experience and provide
                    personalized astrology recommendations. By continuing, you
                    agree to our{" "}
                    <Link
                        href="/privacy"
                        className="underline text-primary hover:text-primary/80"
                    >
                        Privacy Policy
                    </Link>{" "}
                    and{" "}
                    <Link
                        href="/terms"
                        className="underline text-primary hover:text-primary/80"
                    >
                        Terms
                    </Link>{" "}
                    under India&apos;s DPDP Act, 2023.
                </p>
                <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 sm:flex-shrink-0">
                    <Button
                        variant="outline"
                        onClick={reject}
                        className="border-primary text-primary hover:bg-primary/10"
                    >
                        Reject
                    </Button>
                    <Button
                        onClick={accept}
                        className="bg-primary text-white hover:bg-primary/90"
                    >
                        Accept All
                    </Button>
                </div>
            </div>
        </div>
    );
}
