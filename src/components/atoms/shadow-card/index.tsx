import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { forwardRef, ComponentProps } from "react";

type ShadowCardProps = ComponentProps<typeof Card>;

/**
 * Card with shadow styling - the most common card variant in the app.
 * Removes border and adds shadow-lg by default.
 */
const ShadowCard = forwardRef<HTMLDivElement, ShadowCardProps>(
    ({ className, ...props }, ref) => (
        <Card
            ref={ref}
            className={cn("border-0 shadow-lg", className)}
            {...props}
        />
    )
);
ShadowCard.displayName = "ShadowCard";

export { ShadowCard };
