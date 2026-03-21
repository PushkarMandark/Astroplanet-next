"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { useLeadStore } from "@/stores";
import { cn } from "@/lib/utils";

interface ConsultationButtonProps {
    service?: string;
    children: React.ReactNode;
    className?: string;
    variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link";
    size?: "default" | "sm" | "lg" | "icon";
}

export function ConsultationButton({
    service,
    children,
    className,
    variant,
    size,
}: ConsultationButtonProps) {
    const openLead = useLeadStore((s) => s.openLead);

    return (
        <Button
            variant={variant}
            size={size}
            onClick={() => openLead(service)}
            className={cn(className)}
        >
            {children}
        </Button>
    );
}
