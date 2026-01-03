"use client";

import { MainLayout } from "@/components/templates/main-layout";

export default function AboutUsPage() {
    return (
        <MainLayout>
            {/* Hero Section */}
            <section className="bg-gradient-to-br from-primary via-[#6b0707] to-[#3d0404] text-white py-20">
                <div className="container mx-auto px-4 text-center">
                    <h1 className="text-4xl md:text-5xl font-bold font-serif mb-4">
                        About Us
                    </h1>
                    <p className="text-white/80 text-xl max-w-3xl mx-auto">
                        Your one-stop solution for astrology products, services, Rudraksha, gemstones, Kundli, and Yantra
                    </p>
                </div>
            </section>

            {/* Content */}
            <section className="py-16 bg-gray-50">
                <div className="container mx-auto px-4 max-w-4xl">
                    <div className="bg-white rounded-xl shadow-lg p-8 md:p-12 prose prose-lg max-w-none">
                        <p className="lead text-lg text-muted-foreground mb-8">
                            Astroeshop provides the finest astrological services around the globe, here we provide you best facilities about Yantra, Rudraksha, Gems as well as accurate horoscope prediction by the world&apos;s top astrologer <strong>Acharya Indu Prakash Ji</strong>.
                        </p>

                        <p>
                            Astroeshop helps you for your better future and provides the best effective treatments and remedies for those people who are struggling or facing problems in their life. Acharya Indu Prakash helps you to break the barrier of your life.
                        </p>

                        <div className="bg-primary/5 border-l-4 border-primary rounded-r-lg p-6 my-8">
                            <p className="text-primary font-semibold mb-2">Founded by Excellence</p>
                            <p className="mb-0">
                                Astroeshop is founded by the World&apos;s best astrologer <strong>Acharya Indu Prakash Ji</strong>. Astroeshop is the one-stop solution for all those people, who are struggling in their life or facing some serious problems. Products provided by us are energized by Acharya Ji. We have been the leading astrology company for 20 years in the market.
                            </p>
                        </div>

                        <h2>Our Philosophy</h2>
                        <p>
                            Astrology is a way of identifying practical steps and guiding us to improve our lives. We help to create a better and happier life for you. Our astrological remedies help to reduce the impact of the malefic planet&apos;s influence on the human natural chart and to use the domains of beneficial planets.
                        </p>

                        <p>
                            Astrology seeks to establish contact with the higher and natural qualities of the soul and to form a personal relationship with God. Vedic astrology is a revolution in nature, intended to aid the process of growth, emerging understanding, and overcoming limitations.
                        </p>

                        <h2>Our Products & Services</h2>
                        <p>
                            Includes Gems, Yantras, Rosary, Rudraksha, pendants, and rings especially designed for the zodiac sign, and crystals and elements of Parad. These products serve as a protection against all forms of evil power and help to attract:
                        </p>

                        <ul>
                            <li>Material prosperity</li>
                            <li>Success</li>
                            <li>Love and relationships</li>
                            <li>Power and happiness</li>
                            <li>Peace and well-being</li>
                            <li>The fulfillment of desires</li>
                            <li>Good health</li>
                        </ul>

                        <div className="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-lg p-8 mt-10 text-center">
                            <h3 className="text-2xl font-bold mb-4">20+ Years of Excellence</h3>
                            <p className="text-lg mb-0">
                                Serving thousands of customers worldwide with authentic astrological products and services
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        </MainLayout>
    );
}
