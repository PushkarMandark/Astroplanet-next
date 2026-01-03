import { Star, Users } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export interface Testimonial {
    name: string;
    location: string;
    rating: number;
    text: string;
}

const defaultTestimonials: Testimonial[] = [
    {
        name: "Priya Sharma",
        location: "Delhi",
        rating: 5,
        text: "The gemstone recommendation was perfect! I felt positive changes within weeks. Highly recommend their services."
    },
    {
        name: "Rajesh Kumar",
        location: "Mumbai",
        rating: 5,
        text: "Excellent Kundli analysis. The predictions were accurate and the remedies really helped solve my career issues."
    },
    {
        name: "Anita Patel",
        location: "Bangalore",
        rating: 5,
        text: "Amazing match making service. The astrologer explained everything in detail. Very satisfied with the consultation."
    },
];

interface TestimonialsSectionProps {
    testimonials?: Testimonial[];
    title?: string;
    subtitle?: string;
}

export function TestimonialsSection({
    testimonials = defaultTestimonials,
    title = "What Our Clients Say",
    subtitle = "Happy Customers",
}: TestimonialsSectionProps) {
    return (
        <section className="py-20 bg-white">
            <div className="container mx-auto px-4">
                <div className="text-center mb-14">
                    <Badge className="mb-4 bg-accent/20 text-accent-foreground border-accent/30 px-4 py-1">
                        <Users className="h-3 w-3 mr-1 inline" />
                        {subtitle}
                    </Badge>
                    <h2 className="text-4xl md:text-5xl font-bold font-serif mb-4">
                        {title}
                    </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {testimonials.map((testimonial, idx) => (
                        <Card key={idx} className="border-0 shadow-lg p-6">
                            <CardContent className="p-0">
                                <div className="flex items-center gap-1 mb-4">
                                    {[...Array(testimonial.rating)].map((_, i) => (
                                        <Star key={i} className="h-5 w-5 fill-accent text-accent" />
                                    ))}
                                </div>
                                <p className="text-gray-600 mb-4 italic">&ldquo;{testimonial.text}&rdquo;</p>
                                <div className="flex items-center gap-3">
                                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white font-bold">
                                        {testimonial.name.charAt(0)}
                                    </div>
                                    <div>
                                        <h4 className="font-semibold">{testimonial.name}</h4>
                                        <p className="text-sm text-muted-foreground">{testimonial.location}</p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    );
}
