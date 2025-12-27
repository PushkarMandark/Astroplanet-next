import { MainLayout } from "@/components/templates/main-layout";
import { siteConfig } from "@/config/site";

export const metadata = {
    title: "Privacy Policy",
    description: "Privacy Policy for AstroPlanet - How we collect, use, and protect your information.",
};

export default function PrivacyPolicyPage() {
    return (
        <MainLayout>
            <section className="bg-primary text-primary-foreground py-12">
                <div className="container mx-auto px-4">
                    <h1 className="text-3xl md:text-4xl font-bold font-heading">
                        Privacy Policy
                    </h1>
                    <p className="text-primary-foreground/80 mt-2">
                        Last updated: December 2024
                    </p>
                </div>
            </section>

            <section className="py-12">
                <div className="container mx-auto px-4">
                    <div className="max-w-3xl mx-auto prose">
                        <h2>Introduction</h2>
                        <p>
                            At {siteConfig.name}, we are committed to protecting your privacy.
                            This Privacy Policy explains how we collect, use, disclose, and
                            safeguard your information when you visit our website.
                        </p>

                        <h2>Information We Collect</h2>
                        <p>We may collect information about you in a variety of ways:</p>
                        <ul>
                            <li>
                                <strong>Personal Data:</strong> Name, email address, phone number,
                                billing address, and other contact details you provide when
                                registering or making a purchase.
                            </li>
                            <li>
                                <strong>Order Information:</strong> Products purchased, payment
                                details, and delivery information.
                            </li>
                            <li>
                                <strong>Usage Data:</strong> Information about how you interact
                                with our website, including pages visited and links clicked.
                            </li>
                        </ul>

                        <h2>How We Use Your Information</h2>
                        <p>We use the information we collect to:</p>
                        <ul>
                            <li>Process and fulfill your orders</li>
                            <li>Send order confirmations and updates</li>
                            <li>Provide customer support</li>
                            <li>Send marketing communications (with your consent)</li>
                            <li>Improve our website and services</li>
                            <li>Comply with legal obligations</li>
                        </ul>

                        <h2>Information Sharing</h2>
                        <p>
                            We do not sell your personal information. We may share your
                            information with:
                        </p>
                        <ul>
                            <li>Payment processors for transaction processing</li>
                            <li>Shipping companies for order delivery</li>
                            <li>Service providers who assist our operations</li>
                            <li>Legal authorities when required by law</li>
                        </ul>

                        <h2>Data Security</h2>
                        <p>
                            We implement appropriate security measures to protect your personal
                            information. However, no method of transmission over the Internet
                            is 100% secure.
                        </p>

                        <h2>Cookies</h2>
                        <p>
                            We use cookies to enhance your experience on our website. You can
                            control cookie settings through your browser preferences.
                        </p>

                        <h2>Your Rights</h2>
                        <p>You have the right to:</p>
                        <ul>
                            <li>Access your personal information</li>
                            <li>Correct inaccurate data</li>
                            <li>Request deletion of your data</li>
                            <li>Opt-out of marketing communications</li>
                        </ul>

                        <h2>Contact Us</h2>
                        <p>
                            If you have any questions about this Privacy Policy, please contact
                            us at:
                        </p>
                        <ul>
                            <li>Email: {siteConfig.contact.email}</li>
                            <li>Phone: {siteConfig.contact.phone}</li>
                            <li>Address: {siteConfig.contact.address}</li>
                        </ul>
                    </div>
                </div>
            </section>
        </MainLayout>
    );
}
