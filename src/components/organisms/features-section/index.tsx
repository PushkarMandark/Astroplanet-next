import { Shield, Award, Truck, HeartHandshake, LucideIcon } from "lucide-react";

export interface Feature {
    icon: LucideIcon;
    title: string;
    description: string;
}

const defaultFeatures: Feature[] = [
    {
        icon: Shield,
        title: "100% Authentic",
        description: "Every product is genuine and verified by our expert gemologists",
    },
    {
        icon: Award,
        title: "Expert Astrologers",
        description: "Consultations with certified Vedic astrologers with 15+ years experience",
    },
    {
        icon: Truck,
        title: "Free Shipping",
        description: "Complimentary shipping on orders above ₹500 across India",
    },
    {
        icon: HeartHandshake,
        title: "Trusted Service",
        description: "10,000+ happy customers with 4.9★ average rating",
    },
];

interface FeaturesSectionProps {
    features?: Feature[];
    title?: string;
    description?: string;
}

export function FeaturesSection({
    features = defaultFeatures,
    title = "Why Choose AstroPlanet?",
    description = "We're committed to providing authentic products and services backed by centuries of Vedic tradition",
}: FeaturesSectionProps) {
    return (
        <section className="py-20 bg-gradient-to-br from-primary via-primary to-[#5c0606] text-white relative overflow-hidden">
            {/* Decorative elements */}
            <div className="absolute inset-0 opacity-10">
                <div className="absolute top-10 left-10 w-40 h-40 border border-white rounded-full" />
                <div className="absolute bottom-10 right-10 w-60 h-60 border border-white rounded-full" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] border border-white/20 rounded-full" />
            </div>

            <div className="container mx-auto px-4 relative z-10">
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-bold font-serif mb-4">
                        {title}
                    </h2>
                    <p className="text-white/70 text-lg max-w-2xl mx-auto">
                        {description}
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {features.map((feature) => (
                        <div key={feature.title} className="text-center group">
                            <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-white/10 backdrop-blur-sm flex items-center justify-center group-hover:bg-accent group-hover:scale-110 transition-all duration-300">
                                <feature.icon className="h-10 w-10 text-accent group-hover:text-black" />
                            </div>
                            <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                            <p className="text-white/70">
                                {feature.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
