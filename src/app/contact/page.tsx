"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { MainLayout } from "@/components/templates/main-layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {
    Mail,
    Phone,
    MapPin,
    MessageCircle,
    Clock,
    Send,
    CheckCircle,
    Sparkles
} from "lucide-react";
import { siteConfig } from "@/config/site";

const contactSchema = z.object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    email: z.string().email("Please enter a valid email"),
    phone: z.string().optional(),
    subject: z.string().min(1, "Please select a subject"),
    message: z.string().min(10, "Message must be at least 10 characters"),
});

type ContactFormData = z.infer<typeof contactSchema>;

const subjects = [
    { value: "product-inquiry", label: "Product Inquiry" },
    { value: "service-inquiry", label: "Service Inquiry" },
    { value: "order-status", label: "Order Status" },
    { value: "refund-request", label: "Refund Request" },
    { value: "technical-support", label: "Technical Support" },
    { value: "other", label: "Other" },
];

export default function ContactPage() {
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const form = useForm<ContactFormData>({
        resolver: zodResolver(contactSchema),
        defaultValues: {
            name: "",
            email: "",
            phone: "",
            subject: "",
            message: "",
        },
    });

    const onSubmit = async (data: ContactFormData) => {
        setIsSubmitting(true);

        try {
            const WP_URL = process.env.NEXT_PUBLIC_WP_URL || "https://api.astroeshop.com";

            const response = await fetch(`${WP_URL}/wp-json/astroeshop/v1/inquiry`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    customer_name: data.name,
                    customer_email: data.email,
                    customer_phone: data.phone || "",
                    inquiry_subject: data.subject,
                    inquiry_message: data.message,
                    inquiry_source: "contact_form",
                    inquiry_status: "new",
                    inquiry_timestamp: new Date().toISOString(),
                }),
            });

            const result = await response.json();

            if (response.ok && result.success) {
                setIsSubmitted(true);
            } else {
                console.error("Form submission failed:", result);
                alert("Failed to send message. Please try again.");
            }
        } catch (error) {
            console.error("Error submitting form:", error);
            alert("An error occurred. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    const resetForm = () => {
        form.reset();
        setIsSubmitted(false);
    };

    return (
        <MainLayout>
            {/* Hero Section */}
            <section className="relative bg-gradient-to-br from-primary via-[#6b0707] to-[#3d0404] text-white py-20 overflow-hidden">
                <div className="absolute inset-0 opacity-20 bg-[radial-gradient(white_1px,transparent_1px)] bg-[size:50px_50px]" />
                <div className="absolute top-0 right-0 w-64 h-64 bg-accent/20 rounded-full blur-3xl" />
                <div className="absolute bottom-0 left-0 w-48 h-48 bg-secondary/20 rounded-full blur-3xl" />

                <div className="container mx-auto px-4 text-center relative z-10">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm mb-4">
                        <MessageCircle className="h-4 w-4 text-accent" />
                        <span className="text-sm">We&apos;re here to help</span>
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold font-serif mb-4">
                        Contact Us
                    </h1>
                    <p className="text-white/80 text-lg max-w-xl mx-auto">
                        We&apos;re here to help you on your spiritual journey. Reach out to us with any questions.
                    </p>
                </div>
            </section>

            {/* Contact Content */}
            <section className="py-16 bg-gradient-to-b from-gray-50 to-white">
                <div className="container mx-auto px-4 max-w-6xl">
                    <div className="grid lg:grid-cols-2 gap-12">
                        {/* Contact Information */}
                        <div>
                            <Badge className="mb-4 bg-primary/10 text-primary border-primary/30">
                                Get In Touch
                            </Badge>
                            <h2 className="text-3xl font-bold font-serif mb-6">
                                We&apos;d Love to Hear From You
                            </h2>
                            <p className="text-muted-foreground mb-8">
                                Have questions about our products or services? Need spiritual guidance?
                                Our team of experts is ready to assist you.
                            </p>

                            {/* Contact Cards */}
                            <div className="space-y-4">
                                {/* Address */}
                                <Card className="border-0 shadow-md hover:shadow-lg transition-shadow">
                                    <CardContent className="p-5">
                                        <div className="flex gap-4">
                                            <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary/10 to-secondary/10 flex items-center justify-center flex-shrink-0">
                                                <MapPin className="h-6 w-6 text-primary" />
                                            </div>
                                            <div>
                                                <h4 className="font-bold mb-1">Our Address</h4>
                                                <p className="text-sm text-muted-foreground">
                                                    {siteConfig.business.name}<br />
                                                    {siteConfig.contact.address}
                                                </p>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>

                                {/* Phone */}
                                <Card className="border-0 shadow-md hover:shadow-lg transition-shadow">
                                    <CardContent className="p-5">
                                        <div className="flex gap-4">
                                            <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary/10 to-secondary/10 flex items-center justify-center flex-shrink-0">
                                                <Phone className="h-6 w-6 text-primary" />
                                            </div>
                                            <div>
                                                <h4 className="font-bold mb-1">Phone</h4>
                                                <a
                                                    href={`tel:${siteConfig.contact.phone.replace(/\s/g, "")}`}
                                                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                                                >
                                                    {siteConfig.contact.phone}
                                                </a>
                                                <p className="text-xs text-muted-foreground mt-1">Mon - Sat: 10:00 AM - 7:00 PM</p>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>

                                {/* Email */}
                                <Card className="border-0 shadow-md hover:shadow-lg transition-shadow">
                                    <CardContent className="p-5">
                                        <div className="flex gap-4">
                                            <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary/10 to-secondary/10 flex items-center justify-center flex-shrink-0">
                                                <Mail className="h-6 w-6 text-primary" />
                                            </div>
                                            <div>
                                                <h4 className="font-bold mb-1">Email</h4>
                                                <a
                                                    href={`mailto:${siteConfig.contact.email}`}
                                                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                                                >
                                                    {siteConfig.contact.email}
                                                </a>
                                                <p className="text-xs text-muted-foreground mt-1">We respond within 24 hours</p>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>

                                {/* WhatsApp Button */}
                                <a
                                    href={`https://wa.me/${siteConfig.contact.phone.replace(/\s/g, "").replace("+", "")}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center justify-center gap-3 w-full py-4 rounded-xl bg-[#25D366] text-white font-semibold hover:bg-[#20bd5a] transition-colors shadow-md hover:shadow-lg"
                                >
                                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                                    </svg>
                                    Chat on WhatsApp
                                </a>

                                {/* Business Hours */}
                                <Card className="border-0 shadow-md">
                                    <CardHeader className="pb-2">
                                        <CardTitle className="text-base flex items-center gap-2">
                                            <Clock className="h-4 w-4 text-primary" />
                                            Business Hours
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent className="pt-0">
                                        <div className="space-y-2 text-sm">
                                            <div className="flex justify-between py-2 border-b">
                                                <span>Monday - Saturday</span>
                                                <span className="font-medium">10:00 AM - 7:00 PM</span>
                                            </div>
                                            <div className="flex justify-between py-2">
                                                <span>Sunday</span>
                                                <span className="font-medium text-muted-foreground">Closed</span>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>
                        </div>

                        {/* Contact Form */}
                        <div>
                            <Card className="border-0 shadow-xl overflow-hidden">
                                <CardHeader className="bg-gradient-to-r from-primary to-primary/80 text-white py-6 px-6">
                                    <div className="flex items-center gap-3 mb-2">
                                        <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                                            <Sparkles className="h-5 w-5 text-accent" />
                                        </div>
                                        <CardTitle className="font-serif text-xl text-white">Send Us a Message</CardTitle>
                                    </div>
                                    <p className="text-sm text-white/80">
                                        Fill out the form below and we&apos;ll get back to you as soon as possible.
                                    </p>
                                </CardHeader>
                                <CardContent className="p-6">
                                    {isSubmitted ? (
                                        <div className="text-center py-12">
                                            <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-green-100 flex items-center justify-center">
                                                <CheckCircle className="h-10 w-10 text-green-600" />
                                            </div>
                                            <h3 className="text-xl font-bold text-green-600 mb-2">
                                                Message Sent Successfully!
                                            </h3>
                                            <p className="text-muted-foreground mb-6">
                                                Thank you for reaching out. We&apos;ll get back to you within 24 hours.
                                            </p>
                                            <Button onClick={resetForm} variant="outline">
                                                Send Another Message
                                            </Button>
                                        </div>
                                    ) : (
                                        <Form {...form}>
                                            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
                                                <FormField
                                                    control={form.control}
                                                    name="name"
                                                    render={({ field }) => (
                                                        <FormItem>
                                                            <FormLabel>Your Name *</FormLabel>
                                                            <FormControl>
                                                                <Input
                                                                    placeholder="Enter your name"
                                                                    {...field}
                                                                    className="h-12"
                                                                />
                                                            </FormControl>
                                                            <FormMessage />
                                                        </FormItem>
                                                    )}
                                                />

                                                <FormField
                                                    control={form.control}
                                                    name="email"
                                                    render={({ field }) => (
                                                        <FormItem>
                                                            <FormLabel>Email Address *</FormLabel>
                                                            <FormControl>
                                                                <Input
                                                                    type="email"
                                                                    placeholder="Enter your email"
                                                                    {...field}
                                                                    className="h-12"
                                                                />
                                                            </FormControl>
                                                            <FormMessage />
                                                        </FormItem>
                                                    )}
                                                />

                                                <FormField
                                                    control={form.control}
                                                    name="phone"
                                                    render={({ field }) => (
                                                        <FormItem>
                                                            <FormLabel>Phone Number</FormLabel>
                                                            <FormControl>
                                                                <Input
                                                                    type="tel"
                                                                    placeholder="Enter your phone number"
                                                                    {...field}
                                                                    className="h-12"
                                                                />
                                                            </FormControl>
                                                            <FormMessage />
                                                        </FormItem>
                                                    )}
                                                />

                                                <FormField
                                                    control={form.control}
                                                    name="subject"
                                                    render={({ field }) => (
                                                        <FormItem>
                                                            <FormLabel>Subject *</FormLabel>
                                                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                                <FormControl>
                                                                    <SelectTrigger className="h-12 w-full">
                                                                        <SelectValue placeholder="Select a subject" />
                                                                    </SelectTrigger>
                                                                </FormControl>
                                                                <SelectContent>
                                                                    {subjects.map((subject) => (
                                                                        <SelectItem key={subject.value} value={subject.value}>
                                                                            {subject.label}
                                                                        </SelectItem>
                                                                    ))}
                                                                </SelectContent>
                                                            </Select>
                                                            <FormMessage />
                                                        </FormItem>
                                                    )}
                                                />

                                                <FormField
                                                    control={form.control}
                                                    name="message"
                                                    render={({ field }) => (
                                                        <FormItem>
                                                            <FormLabel>Message *</FormLabel>
                                                            <FormControl>
                                                                <Textarea
                                                                    placeholder="How can we help you?"
                                                                    rows={5}
                                                                    {...field}
                                                                />
                                                            </FormControl>
                                                            <FormMessage />
                                                        </FormItem>
                                                    )}
                                                />

                                                <Button
                                                    type="submit"
                                                    className="w-full h-12 bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 text-lg"
                                                    disabled={isSubmitting}
                                                >
                                                    {isSubmitting ? (
                                                        <>
                                                            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                                                            Sending...
                                                        </>
                                                    ) : (
                                                        <>
                                                            <Send className="h-5 w-5 mr-2" />
                                                            Send Message
                                                        </>
                                                    )}
                                                </Button>
                                            </form>
                                        </Form>
                                    )}
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </div>
            </section>

            {/* Map Section */}
            <section className="py-12 bg-gray-50">
                <div className="container mx-auto px-4 max-w-5xl">
                    <div className="text-center mb-8">
                        <Badge className="mb-3 bg-accent/20 text-accent-foreground border-accent/30">
                            Our Location
                        </Badge>
                        <h2 className="text-2xl font-bold font-serif">Find Us</h2>
                    </div>
                    <Card className="border-0 shadow-lg overflow-hidden">
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3507.5033092752895!2d77.0853!3d28.4579!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d18e9d0000001%3A0x0!2sChakkarpur%2C%20Gurugram%2C%20Haryana!5e0!3m2!1sen!2sin!4v1"
                            width="100%"
                            height="400"
                            style={{ border: 0 }}
                            allowFullScreen
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                        />
                    </Card>
                </div>
            </section>
        </MainLayout>
    );
}
