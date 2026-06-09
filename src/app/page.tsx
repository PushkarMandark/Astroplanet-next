import Link from "next/link";
import {
  ArrowRight,
} from "lucide-react";
import { MainLayout } from "@/components/templates/main-layout";
import { HeroSection } from "@/components/organisms/hero-section";
import { ProductGrid } from "@/components/organisms/product-grid";
import { ServicesSection } from "@/components/organisms/services-section";
import { ToolsSection } from "@/components/organisms/tools-section";
import { TestimonialsSection } from "@/components/organisms/testimonials-section";
import { FeaturesSection } from "@/components/organisms/features-section";
import { CTASection } from "@/components/organisms/cta-section";
import { ExpertSection } from "@/components/organisms/expert-section";
import { YouTubeSection } from "@/components/organisms/youtube-section";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { getProducts, getFeaturedProducts } from "@/lib/api/products";
import { servicesConfig } from "@/config/site";
import { organizationJsonLd, faqJsonLd } from "@/lib/structured-data";

export const metadata = {
  alternates: { canonical: "/" },
};

const homepageFaqs = [
  {
    question: "What is Vedic astrology and how is it different from Western astrology?",
    answer: "Vedic astrology (Jyotish) is the traditional Indian system of astrology dating back thousands of years. It uses the sidereal zodiac based on actual star positions, while Western astrology uses the tropical zodiac based on the Sun's relationship to Earth's seasons. Vedic astrology focuses heavily on karma, dashas (planetary periods), and predictive techniques like Kundli analysis.",
  },
  {
    question: "How accurate is a free online Kundli?",
    answer: "AstroEshop's free Kundli generator uses precise astronomical calculations to produce a birth chart with planetary positions, houses, nakshatras, and Vimshottari Dasha — the same data a professional astrologer uses. For deeper personalized predictions, we recommend a paid consultation with one of our certified Vedic astrologers.",
  },
  {
    question: "Are AstroEshop's gemstones authentic and certified?",
    answer: "Yes. Every gemstone we sell is sourced from trusted suppliers and comes with a lab certificate of authenticity. We also offer a personalized Gemstone Recommender tool that suggests the right stone based on your birth chart before you buy.",
  },
  {
    question: "Do you ship across India?",
    answer: "Yes. We ship pan-India with tracked delivery. Orders above ₹500 qualify for free shipping; below that, a flat ₹50 shipping fee applies. Estimated delivery is 3–7 business days depending on your location.",
  },
  {
    question: "How does Kundli matching (Guna Milan) work?",
    answer: "Kundli matching uses the 36-point Ashtakoot system to compare two birth charts across 8 compatibility factors — Varna, Vashya, Tara, Yoni, Graha Maitri, Gana, Bhakoot, and Nadi. A score of 18 or higher is generally considered compatible for marriage. Try our free Kundli Matching tool to see your score instantly.",
  },
  {
    question: "Can I get a refund or return a product?",
    answer: "Yes. We accept returns within the timeframe specified in our Return Policy, provided the product is unused and in its original packaging. Personalized consultations and digital readings are non-refundable once delivered. See our Refund & Cancellation Policy for full details.",
  },
];

export default async function HomePage() {
  // Fetch products server-side
  const [featuredProducts, allProducts] = await Promise.all([
    getFeaturedProducts(8),
    getProducts({ per_page: 8 }),
  ]);

  // Use all products if no featured found
  const displayProducts = featuredProducts.length > 0 ? featuredProducts : allProducts.slice(0, 8);

  const organizationSchema = organizationJsonLd();
  const faqSchema = faqJsonLd(homepageFaqs);

  return (
    <MainLayout>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      {/* Hero Section */}
      <HeroSection
        subtitle="✨ Your Fate is Written in the Stars. Make Us Read This"
        title="Your Future Holds Answers, Find Them Today"
        description="Your life's most important questions deserve better than any random guesswork. Whether you want success in your career, harmony in your relationships, financial stability or spiritual growth, the wisdom of Vedic Astrology can help to illuminate your path ahead."
        primaryCta={{ label: "Explore Shop", href: "/shop" }}
        secondaryCta={{ label: "Free Horoscope", href: "/free-horoscope" }}
      />

      {/* Our Services Section */}
      <ServicesSection
        services={servicesConfig}
        description="Guiding your path with wisdom, insight, and authentic Vedic expertise."
      />

      {/* Free Tools Section */}
      <ToolsSection />

      {/* Expert Astrologer Section */}
      <ExpertSection
        expertName="Connect with the Professional Astrologers"
        expertDescription="Get in touch with the expert astrologers for Janam Kundli Analysis, Career Guidance, Marriage Compatibility, Gemstone Recommendations, and customized astrological solutions."
        title="Your Birth Chart Has The Answers"
        description="Get personalized astrology insights, effective remedies, and expert guidance to overcome challenges and open new doors in life."
        features={[
          { title: "Accurate Kundli Reading" },
          { title: "Reliable Astrology Service" },
          { title: "Helps in All Journey of Life" },
        ]}
      />

      {/* Featured Products Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-12 gap-4">
            <div>
              <Badge className="mb-4 bg-primary/10 text-primary border-primary/30 px-4 py-1">
                Curated Collection
              </Badge>
              <h2 className="text-4xl md:text-5xl font-bold font-serif mb-2">
                Featured Products
              </h2>
              <p className="text-muted-foreground text-lg">
                Handpicked spiritual items for your cosmic journey
              </p>
            </div>
            <Button asChild variant="outline" size="lg" className="group">
              <Link href="/shop">
                View All Products
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
          </div>

          <ProductGrid products={displayProducts} columns={4} />
        </div>
      </section>

      {/* YouTube/Videos Section */}
      <YouTubeSection />

      {/* Why Choose Us Section */}
      <FeaturesSection />

      {/* Testimonials Section */}
      <TestimonialsSection />

      {/* CTA Section */}
      <CTASection />
    </MainLayout>
  );
}
