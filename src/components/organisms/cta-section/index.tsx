import Link from "next/link";
import { Sparkles, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface CTASectionProps {
    badge?: string;
    title?: string;
    highlightedText?: string;
    description?: string;
    primaryCta?: {
        label: string;
        href: string;
    };
    secondaryCta?: {
        label: string;
        href: string;
    };
}

export function CTASection({
    badge = "Start Your Journey Today",
    title = "Ready to Explore Your",
    highlightedText = "Cosmic Destiny",
    description = "Join thousands of seekers who have discovered their path through our authentic astrology products and personalized services.",
    primaryCta = { label: "Shop Now", href: "/shop" },
    secondaryCta = { label: "Explore Services", href: "/services" },
}: CTASectionProps) {
    return (
        <section className="py-24 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-accent/10 via-secondary/10 to-accent/10" />
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-gradient-radial from-accent/20 to-transparent rounded-full blur-3xl" />
            <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-gradient-radial from-secondary/20 to-transparent rounded-full blur-3xl" />

            <div className="container mx-auto px-4 relative z-10 text-center">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 backdrop-blur-sm border border-primary/20 mb-6">
                    <Sparkles className="h-4 w-4 text-primary" />
                    <span className="text-sm font-medium text-primary">{badge}</span>
                </div>

                <h2 className="text-4xl md:text-6xl font-bold font-serif mb-6 max-w-3xl mx-auto leading-tight">
                    {title} <span className="text-primary">{highlightedText}</span>?
                </h2>
                <p className="text-muted-foreground mb-10 max-w-2xl mx-auto text-lg">
                    {description}
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                    <Button asChild size="lg" className="bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 px-8 py-6 text-lg shadow-lg hover:shadow-xl transition-all">
                        <Link href={primaryCta.href}>
                            {primaryCta.label}
                            <ArrowRight className="ml-2 h-5 w-5" />
                        </Link>
                    </Button>
                    <Button asChild size="lg" variant="outline" className="px-8 py-6 text-lg">
                        <Link href={secondaryCta.href}>{secondaryCta.label}</Link>
                    </Button>
                </div>
            </div>
        </section>
    );
}
