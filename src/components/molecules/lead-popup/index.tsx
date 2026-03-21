"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Sparkles, Send, CheckCircle, Loader2 } from "lucide-react";
import { useLeadStore } from "@/stores";
import { submitInquiry } from "@/lib/api/contact";

const leadSchema = z.object({
    name: z.string().min(2, "Name is required"),
    email: z.string().email("Please enter a valid email"),
    phone: z.string().regex(/^[6-9]\d{9}$/, "Enter a valid 10-digit Indian mobile number"),
    message: z.string().optional(),
});

type LeadFormData = z.infer<typeof leadSchema>;

export function LeadPopup() {
    const { isOpen, service, closeLead } = useLeadStore();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);

    const form = useForm<LeadFormData>({
        resolver: zodResolver(leadSchema),
        defaultValues: { name: "", email: "", phone: "", message: "" },
    });

    const onSubmit = async (data: LeadFormData) => {
        setIsSubmitting(true);
        try {
            const result = await submitInquiry({
                name: data.name,
                email: data.email,
                phone: data.phone,
                subject: "consultation-request",
                message: data.message || `Interested in: ${service}`,
                source: "lead_capture",
                service,
            });
            if (result.success) {
                setIsSubmitted(true);
            } else {
                form.setError("root", { message: result.message || "Something went wrong." });
            }
        } catch {
            form.setError("root", { message: "Network error. Please try again." });
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleClose = () => {
        closeLead();
        // Reset after animation
        setTimeout(() => {
            form.reset();
            setIsSubmitted(false);
        }, 300);
    };

    return (
        <Dialog open={isOpen} onOpenChange={(open) => !open && handleClose()}>
            <DialogContent className="sm:max-w-md p-0 overflow-hidden rounded-2xl">
                {/* Header */}
                <div className="bg-primary px-6 pt-6 pb-5 text-white">
                    <DialogHeader>
                        <div className="flex items-center gap-3 mb-1">
                            <div className="w-10 h-10 rounded-xl bg-white/15 flex items-center justify-center">
                                <Sparkles className="h-5 w-5 text-accent" />
                            </div>
                            <DialogTitle className="text-lg font-bold font-heading text-white">
                                Book a Consultation
                            </DialogTitle>
                        </div>
                        <DialogDescription className="text-white/60 text-sm">
                            {service ? `Service: ${service}` : "Get expert Vedic astrology guidance"}
                        </DialogDescription>
                    </DialogHeader>
                </div>

                {/* Body */}
                <div className="px-6 pb-6 pt-2">
                    {isSubmitted ? (
                        <div className="text-center py-8">
                            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-green-50 flex items-center justify-center">
                                <CheckCircle className="h-8 w-8 text-green-600" />
                            </div>
                            <h3 className="text-lg font-bold text-green-700 mb-1">
                                Request Submitted!
                            </h3>
                            <p className="text-sm text-gray-500 mb-5">
                                Our astrologer will contact you within 24 hours.
                            </p>
                            <Button
                                onClick={handleClose}
                                variant="outline"
                                className="rounded-xl"
                            >
                                Close
                            </Button>
                        </div>
                    ) : (
                        <Form {...form}>
                            <form
                                onSubmit={form.handleSubmit(onSubmit)}
                                className="space-y-4"
                            >
                                <FormField
                                    control={form.control}
                                    name="name"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="text-xs font-semibold text-gray-700">
                                                Full Name *
                                            </FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder="Your name"
                                                    className="rounded-xl h-10"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <div className="grid grid-cols-2 gap-3">
                                    <FormField
                                        control={form.control}
                                        name="email"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel className="text-xs font-semibold text-gray-700">
                                                    Email *
                                                </FormLabel>
                                                <FormControl>
                                                    <Input
                                                        type="email"
                                                        placeholder="you@email.com"
                                                        className="rounded-xl h-10"
                                                        {...field}
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
                                                <FormLabel className="text-xs font-semibold text-gray-700">
                                                    Phone *
                                                </FormLabel>
                                                <FormControl>
                                                    <Input
                                                        type="tel"
                                                        placeholder="98XXXXXXXX"
                                                        className="rounded-xl h-10"
                                                        {...field}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>

                                <FormField
                                    control={form.control}
                                    name="message"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="text-xs font-semibold text-gray-700">
                                                Message (optional)
                                            </FormLabel>
                                            <FormControl>
                                                <Textarea
                                                    placeholder="Tell us briefly what you need help with..."
                                                    rows={3}
                                                    className="rounded-xl resize-none"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                {form.formState.errors.root && (
                                    <p className="text-sm text-red-500 text-center">
                                        {form.formState.errors.root.message}
                                    </p>
                                )}

                                <Button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="w-full h-11 rounded-xl bg-primary hover:bg-primary/90 text-sm font-semibold"
                                >
                                    {isSubmitting ? (
                                        <>
                                            <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                                            Submitting...
                                        </>
                                    ) : (
                                        <>
                                            <Send className="h-4 w-4 mr-2" />
                                            Book Consultation
                                        </>
                                    )}
                                </Button>

                                <p className="text-[10px] text-gray-400 text-center">
                                    We respect your privacy. No spam, ever.
                                </p>
                            </form>
                        </Form>
                    )}
                </div>
            </DialogContent>
        </Dialog>
    );
}
