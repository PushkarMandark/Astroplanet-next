import Link from "next/link";
import { Star, Calendar, Hash, CircleDot, Heart, Gem, LucideIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface Tool {
    icon: LucideIcon;
    title: string;
    href: string;
    color: string;
    iconColor?: string;
}

const defaultTools: Tool[] = [
    {
        icon: Star,
        title: "Daily Horoscope",
        href: "/free-horoscope",
        color: "from-orange-400 to-secondary",
    },
    {
        icon: Calendar,
        title: "Panchang",
        href: "/panchang",
        color: "from-emerald-400 to-green-600",
    },
    {
        icon: Hash,
        title: "Numerology",
        href: "/free-numerology-calculator",
        color: "from-violet-500 to-purple-600",
    },
    {
        icon: CircleDot,
        title: "Free Kundli",
        href: "/free-kundli-calculator",
        color: "from-pink-500 to-rose-500",
    },
    {
        icon: Heart,
        title: "Match Making",
        href: "/free-match-making-calculator",
        color: "from-red-500 to-primary",
    },
    {
        icon: Gem,
        title: "Gemstone Finder",
        href: "/gemstone-recommender",
        color: "from-sky-500 to-indigo-600",
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
        <section className="py-20 border-t border-gray-100 bg-linear-to-b from-muted/50 to-white">
            <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                    <Badge className="mb-4 bg-accent/20 text-accent-foreground border-accent/30 px-4 py-1">
                        {subtitle}
                    </Badge>
                    <h2 className="text-4xl md:text-5xl font-bold font-serif mb-4 bg-linear-to-r from-primary to-secondary bg-clip-text text-transparent">
                        {title}
                    </h2>
                    <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
                        {description}
                    </p>
                </div>

                <div className="grid grid-cols-3 gap-3 sm:gap-5 md:grid-cols-6 max-w-4xl mx-auto">
                    {defaultTools.map((tool) => (
                        <Link
                            key={tool.title}
                            href={tool.href}
                            className="group flex flex-col items-center gap-3 rounded-2xl border border-border/60 bg-white p-4 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
                        >
                            <div
                                className={`w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-linear-to-br ${tool.color} flex items-center justify-center shadow-md group-hover:scale-110 transition-transform duration-300`}
                            >
                                <tool.icon className={`h-7 w-7 ${tool.iconColor || "text-white"}`} />
                            </div>
                            <span className="text-xs sm:text-sm font-semibold text-center leading-tight text-foreground">
                                {tool.title}
                            </span>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}
