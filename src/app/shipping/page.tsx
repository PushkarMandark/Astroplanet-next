import { Truck, Clock, MapPin, Shield, Phone, Package, CheckCircle } from "lucide-react";
import { MainLayout } from "@/components/templates/main-layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { siteConfig } from "@/config/site";

export const metadata = {
    title: "Shipping Information",
    description: "Learn about our shipping policies, delivery timelines, and shipping charges for AstroPlanet orders.",
};

const shippingZones = [
    {
        zone: "Metro Cities",
        cities: "Delhi NCR, Mumbai, Bangalore, Chennai, Hyderabad, Kolkata, Pune",
        standard: "3-5 business days",
        express: "1-2 business days",
    },
    {
        zone: "Tier 2 Cities",
        cities: "Jaipur, Lucknow, Chandigarh, Ahmedabad, Indore, Bhopal",
        standard: "5-7 business days",
        express: "2-3 business days",
    },
    {
        zone: "Other Locations",
        cities: "Rest of India",
        standard: "7-10 business days",
        express: "3-5 business days",
    },
];

const faqs = [
    {
        question: "How can I track my order?",
        answer: "Once your order is shipped, you will receive an email and SMS with tracking details. You can also track your order by logging into your account and visiting the 'My Orders' section."
    },
    {
        question: "Do you ship internationally?",
        answer: "Currently, we only ship within India. International shipping will be available soon. Please contact us for special international requests."
    },
    {
        question: "What if I'm not available to receive the package?",
        answer: "Our courier partners will attempt delivery 3 times. If unsuccessful, the package will be returned to our warehouse. Please ensure someone is available to receive the package or provide an alternate delivery address."
    },
    {
        question: "Can I change my delivery address after placing an order?",
        answer: "Yes, you can request an address change before the order is shipped. Please contact our customer support immediately with your order number. Address changes are not possible once the order is in transit."
    },
    {
        question: "What happens if my package is lost or damaged?",
        answer: "All our shipments are insured. In case of loss or damage during transit, please contact us within 48 hours of delivery with photos of the damage. We will arrange for a replacement or full refund."
    },
];

export default function ShippingPage() {
    return (
        <MainLayout>
            {/* Hero Section */}
            <section className="bg-gradient-to-r from-primary to-primary/80 text-white py-16">
                <div className="container mx-auto px-4 text-center">
                    <Truck className="h-16 w-16 mx-auto mb-6 text-accent" />
                    <h1 className="text-4xl md:text-5xl font-bold font-serif mb-4">
                        Shipping Information
                    </h1>
                    <p className="text-xl text-white/80 max-w-2xl mx-auto">
                        Fast and secure delivery of authentic astrology products across India
                    </p>
                </div>
            </section>

            {/* Shipping Highlights */}
            <section className="py-16 bg-gradient-to-b from-accent/10 to-white">
                <div className="container mx-auto px-4">
                    <div className="grid md:grid-cols-3 gap-8">
                        <div className="text-center">
                            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-green-100 flex items-center justify-center">
                                <CheckCircle className="h-8 w-8 text-green-600" />
                            </div>
                            <h3 className="font-bold text-lg mb-2">Free Shipping</h3>
                            <p className="text-muted-foreground">
                                On orders above ₹500 across India
                            </p>
                        </div>
                        <div className="text-center">
                            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-blue-100 flex items-center justify-center">
                                <Shield className="h-8 w-8 text-blue-600" />
                            </div>
                            <h3 className="font-bold text-lg mb-2">Secure Packaging</h3>
                            <p className="text-muted-foreground">
                                All items carefully packed for safe delivery
                            </p>
                        </div>
                        <div className="text-center">
                            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-purple-100 flex items-center justify-center">
                                <Package className="h-8 w-8 text-purple-600" />
                            </div>
                            <h3 className="font-bold text-lg mb-2">Insured Shipments</h3>
                            <p className="text-muted-foreground">
                                All packages insured against loss or damage
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Delivery Timelines */}
            <section className="py-16">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-12">
                        <Badge className="mb-4 bg-primary/10 text-primary border-primary/30">
                            <Clock className="h-3 w-3 mr-1" />
                            Delivery Times
                        </Badge>
                        <h2 className="text-3xl font-bold font-serif mb-4">
                            Estimated Delivery Timelines
                        </h2>
                        <p className="text-muted-foreground max-w-2xl mx-auto">
                            Delivery times vary based on your location. All orders are processed within 24-48 hours.
                        </p>
                    </div>

                    <div className="grid gap-6 max-w-4xl mx-auto">
                        {shippingZones.map((zone, idx) => (
                            <Card key={idx} className="border-0 shadow-lg">
                                <CardHeader className="pb-3">
                                    <div className="flex items-center gap-3">
                                        <MapPin className="h-5 w-5 text-primary" />
                                        <CardTitle>{zone.zone}</CardTitle>
                                    </div>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-sm text-muted-foreground mb-4">
                                        {zone.cities}
                                    </p>
                                    <div className="grid sm:grid-cols-2 gap-4">
                                        <div className="p-4 rounded-lg bg-muted/50">
                                            <span className="text-sm text-muted-foreground">Standard Delivery</span>
                                            <p className="font-semibold text-lg">{zone.standard}</p>
                                        </div>
                                        <div className="p-4 rounded-lg bg-primary/5 border border-primary/20">
                                            <span className="text-sm text-primary">Express Delivery</span>
                                            <p className="font-semibold text-lg">{zone.express}</p>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>

            {/* Shipping Charges */}
            <section className="py-16 bg-muted/30">
                <div className="container mx-auto px-4">
                    <div className="max-w-4xl mx-auto">
                        <div className="text-center mb-12">
                            <h2 className="text-3xl font-bold font-serif mb-4">
                                Shipping Charges
                            </h2>
                        </div>

                        <Card className="border-0 shadow-lg overflow-hidden">
                            <CardContent className="p-0">
                                <table className="w-full">
                                    <thead className="bg-primary text-white">
                                        <tr>
                                            <th className="text-left p-4">Order Value</th>
                                            <th className="text-left p-4">Standard</th>
                                            <th className="text-left p-4">Express</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr className="border-b">
                                            <td className="p-4">Below ₹500</td>
                                            <td className="p-4">₹50</td>
                                            <td className="p-4">₹100</td>
                                        </tr>
                                        <tr className="border-b bg-green-50">
                                            <td className="p-4 font-medium">₹500 and above</td>
                                            <td className="p-4 text-green-600 font-semibold">FREE</td>
                                            <td className="p-4">₹50</td>
                                        </tr>
                                        <tr>
                                            <td className="p-4">Gemstones (Any Value)</td>
                                            <td className="p-4 text-green-600 font-semibold">FREE</td>
                                            <td className="p-4 text-green-600 font-semibold">FREE</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </section>

            {/* FAQs */}
            <section className="py-16">
                <div className="container mx-auto px-4">
                    <div className="max-w-3xl mx-auto">
                        <div className="text-center mb-12">
                            <h2 className="text-3xl font-bold font-serif mb-4">
                                Frequently Asked Questions
                            </h2>
                        </div>

                        <Accordion type="single" collapsible className="w-full">
                            {faqs.map((faq, idx) => (
                                <AccordionItem key={idx} value={`item-${idx}`}>
                                    <AccordionTrigger className="text-left">
                                        {faq.question}
                                    </AccordionTrigger>
                                    <AccordionContent className="text-muted-foreground">
                                        {faq.answer}
                                    </AccordionContent>
                                </AccordionItem>
                            ))}
                        </Accordion>
                    </div>
                </div>
            </section>

            {/* Contact Section */}
            <section className="py-16 bg-gradient-to-r from-primary/5 via-secondary/5 to-accent/5">
                <div className="container mx-auto px-4 text-center">
                    <h2 className="text-2xl font-bold font-serif mb-4">
                        Need Help with Shipping?
                    </h2>
                    <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
                        Our customer support team is here to help you with any shipping-related queries.
                    </p>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <a
                            href={`tel:${siteConfig.contact.phone.replace(/\s/g, '')}`}
                            className="flex items-center gap-2 px-6 py-3 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow"
                        >
                            <Phone className="h-5 w-5 text-primary" />
                            <span className="font-medium">{siteConfig.contact.phone}</span>
                        </a>
                        <a
                            href={`mailto:${siteConfig.contact.email}`}
                            className="flex items-center gap-2 px-6 py-3 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow"
                        >
                            <span className="font-medium">{siteConfig.contact.email}</span>
                        </a>
                    </div>
                </div>
            </section>
        </MainLayout>
    );
}
