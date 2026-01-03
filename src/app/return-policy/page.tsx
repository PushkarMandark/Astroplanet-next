"use client";

import { MainLayout } from "@/components/templates/main-layout";

export default function ReturnPolicyPage() {
    return (
        <MainLayout>
            {/* Hero Section */}
            <section className="bg-gradient-to-br from-primary via-[#6b0707] to-[#3d0404] text-white py-16">
                <div className="container mx-auto px-4 text-center">
                    <h1 className="text-4xl md:text-5xl font-bold font-serif mb-4">
                        Return Policy
                    </h1>
                    <p className="text-white/80 max-w-2xl mx-auto">
                        Simple and transparent 10 days return policy
                    </p>
                </div>
            </section>

            {/* Content */}
            <section className="py-16 bg-gray-50">
                <div className="container mx-auto px-4 max-w-4xl">
                    <div className="bg-white rounded-xl shadow-lg p-8 md:p-12 prose prose-lg max-w-none">
                        <p className="lead text-lg text-muted-foreground mb-8">
                            Astro E Shops offers a transparent and very simple <strong>10 days return policy</strong>.
                        </p>

                        <h2>Conditions to be Eligible for the Return Policy</h2>

                        <ol>
                            <li>Items must be unused, in original conditions.</li>
                            <li>Returns for items are subject to inspection and checking by the Astro E-Shop.</li>
                            <li>Product should be accompanied with Original Product Certificate and original / copy of the invoice, packing, documentation, etc.</li>
                            <li>Damages due to neglect or improper usage will not be accepted back.</li>
                        </ol>

                        <h2>Important Notes</h2>

                        <div className="bg-amber-50 border border-amber-200 rounded-lg p-6 my-6">
                            <ul className="mb-0">
                                <li className="text-amber-900">Return shipment is at the customer&apos;s cost.</li>
                                <li className="text-amber-900">In order to return the product, contact customer support and get a return authorization.</li>
                            </ul>
                        </div>

                        <h2 className="mt-8">How to Return</h2>
                        <p>
                            To initiate a return, please contact our customer support team:
                        </p>
                        <ul>
                            <li>Email: <a href="mailto:support@astroeshop.com">support@astroeshop.com</a></li>
                            <li>Phone: <a href="tel:+919599686887">+91 9599686887</a></li>
                        </ul>
                        <p>
                            Our team will provide you with a return authorization and instructions for shipping the product back to us.
                        </p>
                    </div>
                </div>
            </section>
        </MainLayout>
    );
}
