"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { MainLayout } from "@/components/templates/main-layout";

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    useEffect(() => {
        console.error("Application error:", error);
    }, [error]);

    return (
        <MainLayout>
            <div className="flex flex-col items-center justify-center min-h-[60vh] px-4 py-16 text-center">
                <div className="max-w-md w-full p-8 bg-zinc-900/50 rounded-lg border border-zinc-800 backdrop-blur-sm">
                    <h2 className="text-2xl font-bold mb-4 text-white">Something went wrong!</h2>
                    <p className="text-zinc-400 mb-8">
                        We apologize for the inconvenience. Our team has been notified of the
                        issue and we are working to fix it.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Button
                            onClick={() => reset()}
                            className="bg-primary hover:bg-primary/90 text-primary-foreground"
                        >
                            Try again
                        </Button>
                        <Button
                            variant="outline"
                            onClick={() => (window.location.href = "/")}
                            className="border-primary/20 hover:bg-primary/10"
                        >
                            Go to Home
                        </Button>
                    </div>
                </div>
            </div>
        </MainLayout>
    );
}
