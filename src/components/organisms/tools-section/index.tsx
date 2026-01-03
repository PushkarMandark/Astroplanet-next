import Link from "next/link";
import { ArrowRight, Star, Calendar, Hash } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const defaultTools = [
    {
        icon: Star,
        title: "Daily Horoscope",
        description: "Get personalized daily predictions for all 12 zodiac signs with expert interpretations",
        href: "/horoscope",
        ctaText: "Check Your Sign",
        color: "from-secondary to-orange-400",
        bgGradient: "from-white to-orange-50",
        accentColor: "secondary",
    },
    {
        icon: Calendar,
        title: "Daily Panchang",
        description: "Hindu calendar with tithi, nakshatra, yoga, and auspicious timings",
        href: "/panchang",
        ctaText: "View Today's Panchang",
        color: "from-accent to-yellow-400",
        bgGradient: "from-white to-amber-50",
        accentColor: "accent",
        iconColor: "text-black",
    },
    {
        icon: Hash,
        title: "Numerology",
        description: "Discover your life path number, destiny number, and personal meanings",
        href: "/numerology",
        ctaText: "Calculate Now",
        color: "from-primary to-red-700",
        bgGradient: "from-white to-red-50",
        accentColor: "primary",
    },
];

interface ToolsSectionProps {
    title?: string;
    subtitle?: string;
    description?: string;
}

export function ToolsSection({
    title = "Free Astrology Tools",
    subtitle = "Free Forever",
    description = "Explore your cosmic insights with our powerful astrology tools - completely free",
}: ToolsSectionProps) {
    return (
        <section className="py-20 bg-gradient-to-b from-white to-muted/50">
            <div className="container mx-auto px-4">
                <div className="text-center mb-14">
                    <Badge className="mb-4 bg-accent/20 text-accent-foreground border-accent/30 px-4 py-1">
                        {subtitle}
                    </Badge>
                    <h2 className="text-4xl md:text-5xl font-bold font-serif mb-4 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                        {title}
                    </h2>
                    <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
                        {description}
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {defaultTools.map((tool) => (
                        <Link key={tool.title} href={tool.href} className="group">
                            <Card className={`h-full border-0 shadow-lg hover:shadow-2xl transition-all duration-500 group-hover:-translate-y-2 bg-gradient-to-br ${tool.bgGradient} overflow-hidden relative`}>
                                <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-primary/20 to-transparent rounded-full -translate-y-1/2 translate-x-1/2" />
                                <CardContent className="p-8 relative">
                                    <div className={`w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-br ${tool.color} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                                        <tool.icon className={`h-10 w-10 ${tool.iconColor || "text-white"}`} />
                                    </div>
                                    <Badge className="bg-green-500 text-white border-0 mb-4">
                                        FREE
                                    </Badge>
                                    <h3 className="text-2xl font-bold font-serif mb-3">
                                        {tool.title}
                                    </h3>
                                    <p className="text-muted-foreground">
                                        {tool.description}
                                    </p>
                                    <div className={`mt-6 flex items-center text-${tool.accentColor} font-medium`}>
                                        {tool.ctaText}
                                        <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-2 transition-transform" />
                                    </div>
                                </CardContent>
                            </Card>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}
