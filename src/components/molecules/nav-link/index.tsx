"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

interface NavLinkProps {
    href: string;
    label: string;
    icon?: LucideIcon;
    isActive?: boolean;
    badge?: string;
    className?: string;
    onClick?: () => void;
}

export function NavLink({
    href,
    label,
    icon: Icon,
    isActive = false,
    badge,
    className,
    onClick,
}: NavLinkProps) {
    return (
        <Link
            href={href}
            onClick={onClick}
            className={cn(
                "flex items-center gap-2 px-3 py-2 text-sm font-medium rounded-md transition-colors",
                isActive
                    ? "bg-primary text-primary-foreground"
                    : "text-foreground/70 hover:text-foreground hover:bg-muted",
                className
            )}
        >
            {Icon && <Icon className="h-4 w-4" />}
            {label}
            {badge && (
                <span className="ml-auto inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    {badge}
                </span>
            )}
        </Link>
    );
}
