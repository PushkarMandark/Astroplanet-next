"use client";

import { Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { XCircle, RefreshCcw, Home, Phone, Mail, ArrowLeft } from "lucide-react";
import { MainLayout } from "@/components/templates/main-layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { siteConfig } from "@/config/site";

function PaymentFailedContent() {
    const searchParams = useSearchParams();
    const orderId = searchParams.get("order_id");
    const errorMessage = searchParams.get("message") || "Your payment could not be processed.";

    return (
        <MainLayout>
            <section className="py-20 bg-gradient-to-b from-red-50 to-white dark:from-red-950/20 dark:to-background">
                <div className="container mx-auto px-4">
                    <div className="max-w-2xl mx-auto text-center">
                        {/* Error Icon */}
                        <div className="w-24 h-24 mx-auto mb-8 rounded-full bg-gradient-to-br from-red-400 to-red-600 flex items-center justify-center shadow-lg">
                            <XCircle className="h-14 w-14 text-white" />
                        </div>

                        {/* Error Message */}
                        <h1 className="text-4xl md:text-5xl font-bold font-heading text-red-700 dark:text-red-400 mb-4">
                            Payment Failed
                        </h1>
                        <p className="text-xl text-gray-600 dark:text-gray-400 mb-2">
                            {errorMessage}
                        </p>
                        <p className="text-muted-foreground mb-8">
                            Don&apos;t worry, no amount has been deducted from your account.
                        </p>

                        {/* Order Info Card */}
                        {orderId && (
                            <Card className="mb-8 border-0 shadow-lg">
                                <CardContent className="p-8">
                                    <div className="flex items-center justify-center gap-2 mb-4">
                                        <span className="text-muted-foreground">Order ID:</span>
                                        <span className="font-semibold">#{orderId}</span>
                                    </div>

                                    <Separator className="my-6" />

                                    {/* What to do */}
                                    <div className="text-left space-y-4">
                                        <h3 className="font-semibold text-lg mb-4">What you can do:</h3>

                                        <div className="flex items-start gap-4 p-4 rounded-lg bg-muted/50">
                                            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                                                <span className="text-primary font-bold text-sm">1</span>
                                            </div>
                                            <div>
                                                <h4 className="font-medium mb-1">Try Again</h4>
                                                <p className="text-sm text-muted-foreground">
                                                    Click the retry button below to attempt payment again with the same or different payment method.
                                                </p>
                                            </div>
                                        </div>

                                        <div className="flex items-start gap-4 p-4 rounded-lg bg-muted/50">
                                            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                                                <span className="text-primary font-bold text-sm">2</span>
                                            </div>
                                            <div>
                                                <h4 className="font-medium mb-1">Check Your Bank</h4>
                                                <p className="text-sm text-muted-foreground">
                                                    Ensure you have sufficient balance and your card/UPI is not blocked for online transactions.
                                                </p>
                                            </div>
                                        </div>

                                        <div className="flex items-start gap-4 p-4 rounded-lg bg-muted/50">
                                            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                                                <span className="text-primary font-bold text-sm">3</span>
                                            </div>
                                            <div>
                                                <h4 className="font-medium mb-1">Contact Support</h4>
                                                <p className="text-sm text-muted-foreground">
                                                    If the problem persists, reach out to our support team for assistance.
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        )}

                        {/* Action Buttons */}
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                            <Button asChild size="lg" className="bg-gradient-to-r from-primary to-primary/80">
                                <Link href="/checkout">
                                    <RefreshCcw className="h-5 w-5 mr-2" />
                                    Try Again
                                </Link>
                            </Button>
                            <Button asChild size="lg" variant="outline">
                                <Link href="/">
                                    <Home className="h-5 w-5 mr-2" />
                                    Back to Home
                                </Link>
                            </Button>
                        </div>

                        {/* Contact Support */}
                        <div className="mt-10 p-6 rounded-lg bg-muted/30">
                            <h3 className="font-semibold mb-4">Need Help?</h3>
                            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                                <a
                                    href={`tel:${siteConfig.contact.phone.replace(/\s/g, '')}`}
                                    className="flex items-center gap-2 text-primary hover:underline"
                                >
                                    <Phone className="h-4 w-4" />
                                    {siteConfig.contact.phone}
                                </a>
                                <a
                                    href={`mailto:${siteConfig.contact.email}`}
                                    className="flex items-center gap-2 text-primary hover:underline"
                                >
                                    <Mail className="h-4 w-4" />
                                    {siteConfig.contact.email}
                                </a>
                            </div>
                        </div>

                        {/* Back to Cart */}
                        <div className="mt-8">
                            <Link
                                href="/cart"
                                className="inline-flex items-center text-muted-foreground hover:text-primary"
                            >
                                <ArrowLeft className="h-4 w-4 mr-1" />
                                Back to Cart
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </MainLayout>
    );
}

export default function PaymentFailedPage() {
    return (
        <Suspense fallback={
            <MainLayout>
                <section className="py-20">
                    <div className="container mx-auto px-4 text-center">
                        <div className="animate-pulse">
                            <div className="w-24 h-24 mx-auto mb-8 rounded-full bg-gray-200" />
                            <div className="h-10 w-64 mx-auto mb-4 bg-gray-200 rounded" />
                            <div className="h-6 w-96 mx-auto bg-gray-200 rounded" />
                        </div>
                    </div>
                </section>
            </MainLayout>
        }>
            <PaymentFailedContent />
        </Suspense>
    );
}
