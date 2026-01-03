"use client";

import { MainLayout } from "@/components/templates/main-layout";

export default function PrivacyPolicyPage() {
    return (
        <MainLayout>
            {/* Hero Section */}
            <section className="bg-gradient-to-br from-primary via-[#6b0707] to-[#3d0404] text-white py-16">
                <div className="container mx-auto px-4 text-center">
                    <h1 className="text-4xl md:text-5xl font-bold font-serif mb-4">
                        Privacy Policy
                    </h1>
                    <p className="text-white/80 max-w-2xl mx-auto">
                        Your privacy is important to us. Learn how we collect, use, and protect your information.
                    </p>
                </div>
            </section>

            {/* Content */}
            <section className="py-16 bg-gray-50">
                <div className="container mx-auto px-4 max-w-4xl">
                    <div className="bg-white rounded-xl shadow-lg p-8 md:p-12 prose prose-lg max-w-none">
                        <p className="lead text-lg text-muted-foreground mb-8">
                            We at Astro E-Shop respect the privacy of our customers and therefore created this particular window for your privacy queries. The material information that we collect from our customers is only used to facilitate the selection of the desired and accordingly offer the most suitable treatment.
                        </p>

                        <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-8">
                            <p className="text-green-800 font-semibold mb-0">
                                We do not sell or share your information to a third party at any time without your permission.
                            </p>
                        </div>

                        <h2>What Information We Collect and How</h2>

                        <ul>
                            <li>Any personal data you knowingly provide us with through forms and emails such as name, telephone, address.</li>
                            <li>During registration, we automatically collect the personal information you provide during the form filling procedure.</li>
                            <li>When you visit Astro E-Shop and interact with the services and tools that reside there, Astro E-Shop and third parties with whom Astro E-Shop has contracted to provide services to Astro E-Shop may collect information on your actions.</li>
                        </ul>

                        <h2>Purpose of Information Collection</h2>

                        <p>
                            The purpose of this information collection is generally to gather broad demographic information that is not personal. We also use your IP address to help diagnose problems with our software or our server and to administer our website.
                        </p>

                        <p>
                            We track the visitor IP address to get more information on visitor&apos;s demography e.g. which parts of the world our traffic comes from. We collect browser types used, screen resolutions, and time spent on the website to analyze trends, administer and troubleshoot the site, understand user linking and disliking within the website.
                        </p>

                        <p>
                            All of this information is used for gathering broad demographic data to enhance the performance and services of the site.
                        </p>

                        <div className="bg-primary/10 border border-primary/20 rounded-lg p-6 mt-8">
                            <h3 className="text-primary mt-0">Our Commitment</h3>
                            <p className="mb-0 font-semibold">
                                WE DO NOT SELL OR SHARE YOUR PERSONAL DATA WITH THE THIRD PARTY WITHOUT YOUR CONSENT.
                            </p>
                        </div>

                        <h2 className="mt-8">Contact Us</h2>
                        <p>
                            If you have any questions about our Privacy Policy, please contact us at:
                        </p>
                        <ul>
                            <li>Email: <a href="mailto:support@astroeshop.com">support@astroeshop.com</a></li>
                            <li>Phone: <a href="tel:+919599686887">+91 9599686887</a></li>
                        </ul>
                    </div>
                </div>
            </section>
        </MainLayout>
    );
}
