import { MainLayout } from "@/components/templates/main-layout";
import { Card, CardContent } from "@/components/ui/card";
import { siteConfig } from "@/config/site";
import { Star, Users, Shield, Award } from "lucide-react";

export const metadata = {
    title: "About Us",
    description: "Learn about AstroPlanet - Your trusted source for authentic astrology products and services.",
};

export default function AboutPage() {
    const stats = [
        { icon: Users, label: "Happy Customers", value: "10,000+" },
        { icon: Star, label: "Products", value: "500+" },
        { icon: Shield, label: "Years Experience", value: "15+" },
        { icon: Award, label: "Certified Astrologers", value: "20+" },
    ];

    return (
        <MainLayout>
            {/* Hero Section */}
            <section className="bg-gradient-to-br from-primary to-secondary text-primary-foreground py-20">
                <div className="container mx-auto px-4 text-center">
                    <h1 className="text-4xl md:text-5xl font-bold font-heading mb-4">
                        About {siteConfig.name}
                    </h1>
                    <p className="text-xl text-primary-foreground/80 max-w-2xl mx-auto">
                        {siteConfig.tagline}
                    </p>
                </div>
            </section>

            {/* Stats */}
            <section className="py-12 bg-muted">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                        {stats.map((stat) => (
                            <Card key={stat.label} className="text-center">
                                <CardContent className="pt-6">
                                    <stat.icon className="h-8 w-8 mx-auto text-primary mb-2" />
                                    <p className="text-3xl font-bold text-primary">{stat.value}</p>
                                    <p className="text-sm text-muted-foreground">{stat.label}</p>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>

            {/* Story Section */}
            <section className="py-16">
                <div className="container mx-auto px-4">
                    <div className="max-w-3xl mx-auto">
                        <h2 className="text-3xl font-bold font-heading mb-6 text-center">
                            Our Story
                        </h2>
                        <div className="prose max-w-none">
                            <p>
                                AstroPlanet was founded with a simple mission: to make authentic
                                Vedic astrology accessible to everyone. We believe that the ancient
                                wisdom of astrology can help guide people towards a more fulfilling
                                life.
                            </p>
                            <p className="mt-4">
                                Our team of certified astrologers and spiritual practitioners work
                                tirelessly to bring you the finest gemstones, puja items, and
                                personalized astrological services. Every product in our collection
                                is carefully sourced and verified for authenticity.
                            </p>
                            <p className="mt-4">
                                Whether you&apos;re seeking guidance through a difficult period,
                                looking for the perfect gemstone to enhance your spiritual journey,
                                or simply curious about what the stars have in store for you,
                                AstroPlanet is here to help.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Values Section */}
            <section className="py-16 bg-primary text-primary-foreground">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-bold font-heading mb-12 text-center">
                        Our Values
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="text-center">
                            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary-foreground/10 flex items-center justify-center">
                                <Shield className="h-8 w-8" />
                            </div>
                            <h3 className="text-xl font-bold mb-2">Authenticity</h3>
                            <p className="text-primary-foreground/80">
                                Every product is genuine and verified by our expert team.
                            </p>
                        </div>
                        <div className="text-center">
                            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary-foreground/10 flex items-center justify-center">
                                <Star className="h-8 w-8" />
                            </div>
                            <h3 className="text-xl font-bold mb-2">Excellence</h3>
                            <p className="text-primary-foreground/80">
                                We strive for the highest quality in products and services.
                            </p>
                        </div>
                        <div className="text-center">
                            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary-foreground/10 flex items-center justify-center">
                                <Users className="h-8 w-8" />
                            </div>
                            <h3 className="text-xl font-bold mb-2">Trust</h3>
                            <p className="text-primary-foreground/80">
                                Building lasting relationships with our customers since 2008.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Business Info */}
            <section className="py-16">
                <div className="container mx-auto px-4">
                    <div className="max-w-xl mx-auto text-center">
                        <h2 className="text-3xl font-bold font-heading mb-6">
                            Business Information
                        </h2>
                        <Card>
                            <CardContent className="pt-6 space-y-2">
                                <p>
                                    <strong>Company Name:</strong> {siteConfig.business.name}
                                </p>
                                <p>
                                    <strong>GST Number:</strong> {siteConfig.business.gst}
                                </p>
                                <p>
                                    <strong>Address:</strong> {siteConfig.contact.address}
                                </p>
                                <p>
                                    <strong>Email:</strong> {siteConfig.contact.email}
                                </p>
                                <p>
                                    <strong>Phone:</strong> {siteConfig.contact.phone}
                                </p>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </section>
        </MainLayout>
    );
}
