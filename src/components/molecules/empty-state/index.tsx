import Link from "next/link";
import { LucideIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface EmptyStateProps {
    icon: LucideIcon;
    title: string;
    description: string;
    actionLabel?: string;
    actionHref?: string;
    onAction?: () => void;
    className?: string;
    iconClassName?: string;
}

/**
 * Reusable empty state component for when there's no data to display.
 * Used across dashboard, orders, wishlist, and other pages.
 */
export function EmptyState({
    icon: Icon,
    title,
    description,
    actionLabel,
    actionHref,
    onAction,
    className,
    iconClassName,
}: EmptyStateProps) {
    return (
        <div className={cn("text-center py-12", className)}>
            <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-muted flex items-center justify-center">
                <Icon className={cn("h-10 w-10 text-muted-foreground", iconClassName)} />
            </div>
            <h3 className="text-xl font-bold font-serif mb-2">{title}</h3>
            <p className="text-muted-foreground mb-6 max-w-sm mx-auto">{description}</p>

            {(actionLabel && actionHref) && (
                <Button asChild className="btn-primary">
                    <Link href={actionHref}>{actionLabel}</Link>
                </Button>
            )}

            {(actionLabel && onAction && !actionHref) && (
                <Button onClick={onAction} className="btn-primary">
                    {actionLabel}
                </Button>
            )}
        </div>
    );
}
