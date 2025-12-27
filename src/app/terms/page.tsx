import { MainLayout } from "@/components/templates/main-layout";
import { siteConfig } from "@/config/site";

export const metadata = {
    title: "Terms of Service",
    description: "Terms of Service for AstroPlanet - Rules and conditions for using our website and services.",
};

export default function TermsPage() {
    return (
        <MainLayout>
            <section className="bg-primary text-primary-foreground py-12">
                <div className="container mx-auto px-4">
                    <h1 className="text-3xl md:text-4xl font-bold font-heading">
                        Terms of Service
                    </h1>
                    <p className="text-primary-foreground/80 mt-2">
                        Last updated: December 2024
                    </p>
                </div>
            </section>

            <section className="py-12">
                <div className="container mx-auto px-4">
                    <div className="max-w-3xl mx-auto prose">
                        <h2>Agreement to Terms</h2>
                        <p>
                            By accessing or using {siteConfig.name}, you agree to be bound by
                            these Terms of Service. If you disagree with any part of these
                            terms, you may not access our website.
                        </p>

                        <h2>Use of Service</h2>
                        <p>
                            You agree to use our service only for lawful purposes and in
                            accordance with these Terms. You are responsible for:
                        </p>
                        <ul>
                            <li>Providing accurate information when making purchases</li>
                            <li>Maintaining the security of your account</li>
                            <li>All activities that occur under your account</li>
                        </ul>

                        <h2>Products and Services</h2>
                        <p>
                            All products and services are subject to availability. We reserve
                            the right to limit quantities and to discontinue any product at
                            any time.
                        </p>

                        <h2>Pricing</h2>
                        <p>
                            All prices are listed in Indian Rupees (INR) and are inclusive of
                            applicable taxes. We reserve the right to change prices at any
                            time without prior notice.
                        </p>

                        <h2>Payment</h2>
                        <p>
                            We accept payments through secure payment gateways including
                            Razorpay and PayU. All payment information is processed securely.
                        </p>

                        <h2>Intellectual Property</h2>
                        <p>
                            All content on this website, including text, images, logos, and
                            graphics, is the property of {siteConfig.name} and is protected
                            by intellectual property laws.
                        </p>

                        <h2>Astrological Services Disclaimer</h2>
                        <p>
                            Our astrological services and readings are provided for
                            entertainment and guidance purposes only. We do not guarantee
                            the accuracy of predictions or outcomes. You should not make
                            important life decisions based solely on astrological advice.
                        </p>

                        <h2>Limitation of Liability</h2>
                        <p>
                            {siteConfig.name} shall not be liable for any indirect,
                            incidental, special, or consequential damages arising from or
                            related to your use of our services.
                        </p>

                        <h2>Changes to Terms</h2>
                        <p>
                            We reserve the right to modify these terms at any time. Changes
                            will be effective immediately upon posting on our website.
                        </p>

                        <h2>Contact Information</h2>
                        <p>
                            For questions about these Terms, please contact us at:
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
