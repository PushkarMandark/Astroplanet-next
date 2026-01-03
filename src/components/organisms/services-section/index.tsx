import Link from "next/link";
import { ArrowRight, LucideIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export interface Service {
    icon: LucideIcon;
    title: string;
    description: string;
    href: string;
    color: string;
}

interface ServicesSectionProps {
    services: Service[];
    title?: string;
    subtitle?: string;
    description?: string;
    showViewAll?: boolean;
    viewAllHref?: string;
}

export function ServicesSection({
    services,
    title = "Our Services",
    subtitle = "What We Offer",
    description = "Comprehensive astrology services to guide you through life's journey",
    showViewAll = true,
    viewAllHref = "/services",
}: ServicesSectionProps) {
    return (
        <section className="py-20 bg-gradient-to-b from-muted/30 to-white">
            <div className="container mx-auto px-4">
                <div className="text-center mb-14">
                    <Badge className="mb-4 bg-primary/10 text-primary border-primary/30 px-4 py-1">
                        {subtitle}
                    </Badge>
                    <h2 className="text-4xl md:text-5xl font-bold font-serif mb-4">
                        {title}
                    </h2>
                    <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
                        {description}
                    </p>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
                    {services.map((service) => (
                        <Link key={service.title} href={service.href} className="group">
                            <Card className="h-full border-0 shadow-md hover:shadow-xl transition-all duration-300 group-hover:-translate-y-2 text-center">
                                <CardContent className="p-6">
                                    <div className={`w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br ${service.color} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                                        <service.icon className="h-8 w-8 text-white" />
                                    </div>
                                    <h3 className="font-bold text-sm mb-1">{service.title}</h3>
                                    <p className="text-xs text-muted-foreground">{service.description}</p>
                                </CardContent>
                            </Card>
                        </Link>
                    ))}
                </div>

                {showViewAll && (
                    <div className="text-center mt-10">
                        <Button asChild size="lg" className="bg-gradient-to-r from-primary to-primary/80">
                            <Link href={viewAllHref}>
                                View All Services
                                <ArrowRight className="ml-2 h-4 w-4" />
                            </Link>
                        </Button>
                    </div>
                )}
            </div>
        </section>
    );
}
