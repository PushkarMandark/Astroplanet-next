"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/stores";
import { Loader2 } from "lucide-react";

export default function LogoutPage() {
    const router = useRouter();
    const logout = useAuthStore((state) => state.logout);

    useEffect(() => {
        // Perform logout
        logout();

        // Redirect to home after a brief delay
        const timer = setTimeout(() => {
            router.push("/");
        }, 500);

        return () => clearTimeout(timer);
    }, [logout, router]);

    return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="text-center">
                <Loader2 className="h-8 w-8 animate-spin text-primary mx-auto mb-4" />
                <p className="text-muted-foreground">Logging out...</p>
            </div>
        </div>
    );
}
