import { MainLayout } from "@/components/templates/main-layout";
import { siteConfig } from "@/config/site";

export const metadata = {
    title: "Refund Policy",
    description: "Refund and Return Policy for AstroPlanet products and services.",
};

export default function RefundPolicyPage() {
    return (
        <MainLayout>
            <section className="bg-primary text-primary-foreground py-12">
                <div className="container mx-auto px-4">
                    <h1 className="text-3xl md:text-4xl font-bold font-heading">
                        Refund Policy
                    </h1>
                    <p className="text-primary-foreground/80 mt-2">
                        Last updated: December 2024
                    </p>
                </div>
            </section>

            <section className="py-12">
                <div className="container mx-auto px-4">
                    <div className="max-w-3xl mx-auto prose">
                        <h2>Our Commitment</h2>
                        <p>
                            At {siteConfig.name}, we want you to be completely satisfied with
                            your purchase. If you&apos;re not happy with your order, we&apos;re here
                            to help.
                        </p>

                        <h2>Physical Products</h2>
                        <h3>Returns</h3>
                        <p>
                            You may return most physical products within 7 days of delivery
                            for a full refund, provided:
                        </p>
                        <ul>
                            <li>The item is unused and in its original packaging</li>
                            <li>You have the original receipt or proof of purchase</li>
                            <li>The item is not damaged or altered</li>
                        </ul>

                        <h3>Non-Returnable Items</h3>
                        <p>Certain items cannot be returned, including:</p>
                        <ul>
                            <li>Gemstones and crystals (due to energization and personalization)</li>
                            <li>Personalized or custom-made items</li>
                            <li>Puja items that have been used</li>
                            <li>Sale or clearance items</li>
                        </ul>

                        <h2>Digital Products & Services</h2>
                        <p>
                            Digital products and astrological services are non-refundable once
                            delivered or the service has been initiated. This includes:
                        </p>
                        <ul>
                            <li>Horoscope readings and reports</li>
                            <li>Kundli charts</li>
                            <li>Consultation sessions</li>
                        </ul>

                        <h2>How to Request a Refund</h2>
                        <ol>
                            <li>Contact us at {siteConfig.contact.email} within 7 days</li>
                            <li>Include your order number and reason for return</li>
                            <li>We will provide return shipping instructions</li>
                            <li>Ship the item back at your expense</li>
                        </ol>

                        <h2>Refund Processing</h2>
                        <p>
                            Once we receive your returned item, we will inspect it and process
                            your refund within 5-7 business days. The refund will be credited
                            to your original payment method.
                        </p>

                        <h2>Damaged or Defective Items</h2>
                        <p>
                            If you receive a damaged or defective item, please contact us
                            within 48 hours of delivery with photos of the damage. We will
                            arrange a replacement or full refund at no cost to you.
                        </p>

                        <h2>Contact Us</h2>
                        <p>
                            For any questions about our refund policy, please contact us:
                        </p>
                        <ul>
                            <li>Email: {siteConfig.contact.email}</li>
                            <li>Phone: {siteConfig.contact.phone}</li>
                        </ul>
                    </div>
                </div>
            </section>
        </MainLayout>
    );
}
