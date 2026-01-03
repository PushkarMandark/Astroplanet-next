import { cn } from "@/lib/utils";

interface PageHeaderProps {
    title: string;
    description?: string;
    children?: React.ReactNode;
    className?: string;
}

/**
 * Consistent gradient page header used across dashboard, account, and other pages.
 */
export function PageHeader({ title, description, children, className }: PageHeaderProps) {
    return (
        <section className={cn("bg-gradient-to-r from-primary to-primary/80 text-white py-12", className)}>
            <div className="container mx-auto px-4">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div>
                        <h1 className="text-3xl md:text-4xl font-bold font-serif">{title}</h1>
                        {description && (
                            <p className="text-white/80 mt-1">{description}</p>
                        )}
                    </div>
                    {children && (
                        <div className="flex items-center gap-4">
                            {children}
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
}
