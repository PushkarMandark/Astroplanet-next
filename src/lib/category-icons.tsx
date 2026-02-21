import { Sparkles, Star, Gem, Package } from "lucide-react";

export const categoryIcons: Record<string, React.ReactNode> = {
    gemstones: <Gem className="h-5 w-5" />,
    astrology: <Star className="h-5 w-5" />,
    spiritual: <Sparkles className="h-5 w-5" />,
    yantras: <Sparkles className="h-5 w-5" />,
    rudraksha: <Gem className="h-5 w-5" />,
    default: <Package className="h-5 w-5" />,
};
