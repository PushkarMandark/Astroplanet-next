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
import { MediaSection } from "@/components/organisms/media-section";
import { YouTubeSection } from "@/components/organisms/youtube-section";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { getProducts, getFeaturedProducts } from "@/lib/api/products";
import { servicesConfig } from "@/config/site";

export default async function HomePage() {
  // Fetch products server-side
  const [featuredProducts, allProducts] = await Promise.all([
    getFeaturedProducts(8),
    getProducts({ per_page: 8 }),
  ]);

  // Use all products if no featured found
  const displayProducts = featuredProducts.length > 0 ? featuredProducts : allProducts.slice(0, 8);

  return (
    <MainLayout>
      {/* Hero Section */}
      <HeroSection
        subtitle="✨ Your Cosmic Journey Starts Here"
        title="Discover Your Destiny"
        description="Unlock the secrets of the universe with authentic astrology products, personalized readings, and expert guidance from certified Vedic astrologers."
        primaryCta={{ label: "Explore Shop", href: "/shop" }}
        secondaryCta={{ label: "Free Horoscope", href: "/horoscope" }}
      />

      {/* Our Services Section */}
      <ServicesSection services={servicesConfig} />

      {/* As Featured In Section */}
      <MediaSection />

      {/* Free Tools Section */}
      <ToolsSection />

      {/* Expert Astrologer Section */}
      <ExpertSection />

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
