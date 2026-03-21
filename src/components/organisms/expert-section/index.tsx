import { Phone, MessageCircle, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ConsultationButton } from "@/components/molecules/consultation-button";

interface ExpertSectionProps {
    title?: string;
    subtitle?: string;
    description?: string;
    expertName?: string;
    expertInitials?: string;
    yearsExperience?: string;
    happyClients?: string;
    rating?: string;
    features?: Array<{
        title: string;
        description: string;
    }>;
    onBookConsultation?: () => void;
    onWhatsApp?: () => void;
    whatsappNumber?: string;
}

const defaultFeatures = [
    {
        title: "Personalized Birth Chart Analysis",
        description: "Complete Kundli reading with detailed predictions",
    },
    {
        title: "Remedies & Solutions",
        description: "Custom remedies for your specific challenges",
    },
    {
        title: "Ongoing Support",
        description: "Follow-up consultations and guidance",
    },
];

export function ExpertSection({
    title = "Get Personal Consultation",
    subtitle = "Expert Guidance",
    description = "Whether you're seeking guidance on love, career, health, or life decisions, our expert astrologers provide accurate readings based on your unique birth chart.",
    expertName = "Meet Our Expert",
    expertInitials = "AP",
    yearsExperience = "15+",
    happyClients = "10K+",
    rating = "4.9★",
    features = defaultFeatures,
    whatsappNumber = "+919971000226",
}: ExpertSectionProps) {
    return (
        <section className="py-20 bg-linear-to-r from-primary/5 via-secondary/5 to-accent/5">
            <div className="container mx-auto px-4">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    <div className="relative">
                        <div className="absolute -top-4 -left-4 w-full h-full bg-gradient-to-br from-primary to-secondary rounded-3xl" />
                        <div className="relative bg-gradient-to-br from-primary to-[#5c0606] rounded-3xl p-8 md:p-12 text-white">
                            <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-br from-accent to-yellow-400 flex items-center justify-center text-4xl font-bold text-black shadow-xl">
                                {expertInitials}
                            </div>
                            <h3 className="text-3xl font-bold font-serif text-center mb-4">
                                {expertName}
                            </h3>
                            <p className="text-center text-white/80 mb-6">
                                Our team of certified Vedic astrologers brings decades of experience in traditional Indian astrology, offering personalized guidance and accurate predictions.
                            </p>
                            <div className="grid grid-cols-3 gap-4 text-center">
                                <div>
                                    <div className="text-3xl font-bold text-accent">{yearsExperience}</div>
                                    <div className="text-sm text-white/70">Years Experience</div>
                                </div>
                                <div>
                                    <div className="text-3xl font-bold text-accent">{happyClients}</div>
                                    <div className="text-sm text-white/70">Happy Clients</div>
                                </div>
                                <div>
                                    <div className="text-3xl font-bold text-accent">{rating}</div>
                                    <div className="text-sm text-white/70">Rating</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div>
                        <Badge className="mb-4 bg-primary/10 text-primary border-primary/30">
                            {subtitle}
                        </Badge>
                        <h2 className="text-4xl md:text-5xl font-bold font-serif mb-6">
                            {title}
                        </h2>
                        <p className="text-muted-foreground text-lg mb-8">
                            {description}
                        </p>

                        <div className="space-y-4 mb-8">
                            {features.map((feature, idx) => (
                                <div key={idx} className="flex items-start gap-3">
                                    <CheckCircle className="h-6 w-6 text-green-500 flex-shrink-0 mt-0.5" />
                                    <div>
                                        <h4 className="font-semibold">{feature.title}</h4>
                                        <p className="text-sm text-muted-foreground">{feature.description}</p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="flex flex-wrap gap-4">
                            <ConsultationButton size="lg" service="Expert Consultation" className="bg-linear-to-r from-primary to-primary/80">
                                <Phone className="h-4 w-4 mr-2" />
                                Book Consultation
                            </ConsultationButton>
                            <Button
                                size="lg"
                                variant="outline"
                                className="bg-[#25D366] text-white border-0 hover:bg-[#20bd5a]"
                                asChild
                            >
                                <a href={`https://wa.me/${whatsappNumber.replace(/\+/g, '')}`} target="_blank" rel="noopener noreferrer">
                                    <MessageCircle className="h-4 w-4 mr-2" />
                                    WhatsApp Us
                                </a>
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
