import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  Star,
  Calendar,
  Hash,
  Sparkles,
  Shield,
  Truck,
  Award,
  HeartHandshake,
  Phone,
  MessageCircle,
  Play,
  Users,
  CheckCircle,
  BookOpen,
  Gem,
  Home,
  Heart,
  Briefcase,
  Baby
} from "lucide-react";
import { MainLayout } from "@/components/templates/main-layout";
import { HeroSection } from "@/components/organisms/hero-section";
import { ProductGrid } from "@/components/organisms/product-grid";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { getProducts, getFeaturedProducts } from "@/lib/api/products";

// Services data
const services = [
  {
    icon: BookOpen,
    title: "Kundli Analysis",
    description: "Detailed birth chart reading",
    href: "/services",
    color: "from-orange-500 to-red-500"
  },
  {
    icon: Heart,
    title: "Match Making",
    description: "Kundli matching for marriage",
    href: "/services",
    color: "from-pink-500 to-rose-500"
  },
  {
    icon: Gem,
    title: "Gemstone Advice",
    description: "Personalized gem recommendations",
    href: "/shop",
    color: "from-purple-500 to-indigo-500"
  },
  {
    icon: Home,
    title: "Vastu Shastra",
    description: "Home & office Vastu consultation",
    href: "/services",
    color: "from-green-500 to-emerald-500"
  },
  {
    icon: Briefcase,
    title: "Career Guidance",
    description: "Professional path insights",
    href: "/services",
    color: "from-blue-500 to-cyan-500"
  },
  {
    icon: Baby,
    title: "Baby Names",
    description: "Auspicious names as per nakshatra",
    href: "/services",
    color: "from-amber-500 to-yellow-500"
  },
];

// Media logos
const mediaLogos = [
  { name: "Times of India", url: "/images/media/toi.png" },
  { name: "NDTV", url: "/images/media/ndtv.png" },
  { name: "Hindustan Times", url: "/images/media/ht.png" },
  { name: "India Today", url: "/images/media/it.png" },
  { name: "Zee News", url: "/images/media/zee.png" },
  { name: "ANI", url: "/images/media/ani.png" },
];

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

      {/* Our Services Section - NEW */}
      <section className="py-20 bg-gradient-to-b from-muted/30 to-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-14">
            <Badge className="mb-4 bg-primary/10 text-primary border-primary/30 px-4 py-1">
              What We Offer
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold font-serif mb-4">
              Our Services
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
              Comprehensive astrology services to guide you through life&apos;s journey
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {services.map((service) => (
              <Link key={service.title} href={service.href} className="group">
                <Card className="h-full border-0 shadow-md hover:shadow-xl transition-all duration-300 group-hover:-translate-y-2 text-center">
                  <CardContent className="p-6">
                    <div className={`w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br ${service.color} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                      <service.icon className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="font-bold text-sm mb-1">{service.title}</h3>
                    <p className="text-xs text-muted-foreground">{service.description}</p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>

          <div className="text-center mt-10">
            <Button asChild size="lg" className="bg-gradient-to-r from-primary to-primary/80">
              <Link href="/services">
                View All Services
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* As Featured In Section - NEW */}
      <section className="py-12 bg-white border-y border-gray-100">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
              As Featured In
            </h3>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-8 md:gap-16 opacity-60 hover:opacity-100 transition-opacity">
            {mediaLogos.map((logo) => (
              <div key={logo.name} className="h-8 md:h-10 flex items-center">
                <span className="text-xl md:text-2xl font-bold text-gray-400 tracking-tight">
                  {logo.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Free Tools Section */}
      <section className="py-20 bg-gradient-to-b from-white to-muted/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-14">
            <Badge className="mb-4 bg-accent/20 text-accent-foreground border-accent/30 px-4 py-1">
              Free Forever
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold font-serif mb-4 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Free Astrology Tools
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
              Explore your cosmic insights with our powerful astrology tools - completely free
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Horoscope */}
            <Link href="/horoscope" className="group">
              <Card className="h-full border-0 shadow-lg hover:shadow-2xl transition-all duration-500 group-hover:-translate-y-2 bg-gradient-to-br from-white to-orange-50 overflow-hidden relative">
                <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-secondary/20 to-transparent rounded-full -translate-y-1/2 translate-x-1/2" />
                <CardContent className="p-8 relative">
                  <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-secondary to-orange-400 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <Star className="h-10 w-10 text-white" />
                  </div>
                  <Badge className="bg-green-500 text-white border-0 mb-4">
                    FREE
                  </Badge>
                  <h3 className="text-2xl font-bold font-serif mb-3">
                    Daily Horoscope
                  </h3>
                  <p className="text-muted-foreground">
                    Get personalized daily predictions for all 12 zodiac signs with expert interpretations
                  </p>
                  <div className="mt-6 flex items-center text-secondary font-medium">
                    Check Your Sign
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-2 transition-transform" />
                  </div>
                </CardContent>
              </Card>
            </Link>

            {/* Panchang */}
            <Link href="/panchang" className="group">
              <Card className="h-full border-0 shadow-lg hover:shadow-2xl transition-all duration-500 group-hover:-translate-y-2 bg-gradient-to-br from-white to-amber-50 overflow-hidden relative">
                <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-accent/20 to-transparent rounded-full -translate-y-1/2 translate-x-1/2" />
                <CardContent className="p-8 relative">
                  <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-accent to-yellow-400 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <Calendar className="h-10 w-10 text-black" />
                  </div>
                  <Badge className="bg-green-500 text-white border-0 mb-4">
                    FREE
                  </Badge>
                  <h3 className="text-2xl font-bold font-serif mb-3">
                    Daily Panchang
                  </h3>
                  <p className="text-muted-foreground">
                    Hindu calendar with tithi, nakshatra, yoga, and auspicious timings
                  </p>
                  <div className="mt-6 flex items-center text-accent font-medium">
                    View Today&apos;s Panchang
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-2 transition-transform" />
                  </div>
                </CardContent>
              </Card>
            </Link>

            {/* Numerology */}
            <Link href="/numerology" className="group">
              <Card className="h-full border-0 shadow-lg hover:shadow-2xl transition-all duration-500 group-hover:-translate-y-2 bg-gradient-to-br from-white to-red-50 overflow-hidden relative">
                <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-primary/20 to-transparent rounded-full -translate-y-1/2 translate-x-1/2" />
                <CardContent className="p-8 relative">
                  <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-primary to-red-700 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <Hash className="h-10 w-10 text-white" />
                  </div>
                  <Badge className="bg-green-500 text-white border-0 mb-4">
                    FREE
                  </Badge>
                  <h3 className="text-2xl font-bold font-serif mb-3">
                    Numerology
                  </h3>
                  <p className="text-muted-foreground">
                    Discover your life path number, destiny number, and personal meanings
                  </p>
                  <div className="mt-6 flex items-center text-primary font-medium">
                    Calculate Now
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-2 transition-transform" />
                  </div>
                </CardContent>
              </Card>
            </Link>
          </div>
        </div>
      </section>

      {/* Expert Astrologer Section - NEW */}
      <section className="py-20 bg-gradient-to-r from-primary/5 via-secondary/5 to-accent/5">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="relative">
              <div className="absolute -top-4 -left-4 w-full h-full bg-gradient-to-br from-primary to-secondary rounded-3xl" />
              <div className="relative bg-gradient-to-br from-primary to-[#5c0606] rounded-3xl p-8 md:p-12 text-white">
                <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-br from-accent to-yellow-400 flex items-center justify-center text-4xl font-bold text-black shadow-xl">
                  AP
                </div>
                <h3 className="text-3xl font-bold font-serif text-center mb-4">
                  Meet Our Expert
                </h3>
                <p className="text-center text-white/80 mb-6">
                  Our team of certified Vedic astrologers brings decades of experience in traditional Indian astrology, offering personalized guidance and accurate predictions.
                </p>
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <div className="text-3xl font-bold text-accent">15+</div>
                    <div className="text-sm text-white/70">Years Experience</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-accent">10K+</div>
                    <div className="text-sm text-white/70">Happy Clients</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-accent">4.9★</div>
                    <div className="text-sm text-white/70">Rating</div>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <Badge className="mb-4 bg-primary/10 text-primary border-primary/30">
                Expert Guidance
              </Badge>
              <h2 className="text-4xl md:text-5xl font-bold font-serif mb-6">
                Get Personal Consultation
              </h2>
              <p className="text-muted-foreground text-lg mb-8">
                Whether you&apos;re seeking guidance on love, career, health, or life decisions, our expert astrologers provide accurate readings based on your unique birth chart.
              </p>

              <div className="space-y-4 mb-8">
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-6 w-6 text-green-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-semibold">Personalized Birth Chart Analysis</h4>
                    <p className="text-sm text-muted-foreground">Complete Kundli reading with detailed predictions</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-6 w-6 text-green-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-semibold">Remedies & Solutions</h4>
                    <p className="text-sm text-muted-foreground">Custom remedies for your specific challenges</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-6 w-6 text-green-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-semibold">Ongoing Support</h4>
                    <p className="text-sm text-muted-foreground">Follow-up consultations and guidance</p>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap gap-4">
                <Button size="lg" className="bg-gradient-to-r from-primary to-primary/80">
                  <Phone className="h-4 w-4 mr-2" />
                  Book Consultation
                </Button>
                <Button size="lg" variant="outline" className="bg-[#25D366] text-white border-0 hover:bg-[#20bd5a]">
                  <MessageCircle className="h-4 w-4 mr-2" />
                  WhatsApp Us
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

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

      {/* YouTube/Videos Section - NEW */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-14">
            <Badge className="mb-4 bg-red-100 text-red-600 border-red-200 px-4 py-1">
              <Play className="h-3 w-3 mr-1 inline" />
              On YouTube
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold font-serif mb-4">
              Watch & Learn
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
              Subscribe to our channel for astrology tips, predictions, and spiritual guidance
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: "Daily Panchang Updates", views: "12K+ views" },
              { title: "Weekly Horoscope Predictions", views: "8K+ views" },
              { title: "Gemstone Benefits Guide", views: "15K+ views" },
            ].map((video, idx) => (
              <Card key={idx} className="group border-0 shadow-lg hover:shadow-xl transition-all overflow-hidden cursor-pointer">
                <div className="relative aspect-video bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
                  <div className="w-16 h-16 rounded-full bg-red-600 flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg">
                    <Play className="h-8 w-8 text-white ml-1" />
                  </div>
                  <div className="absolute bottom-2 right-2 bg-black/80 text-white text-xs px-2 py-1 rounded">
                    10:35
                  </div>
                </div>
                <CardContent className="p-4">
                  <h3 className="font-semibold line-clamp-2 group-hover:text-primary transition-colors">
                    {video.title}
                  </h3>
                  <p className="text-sm text-muted-foreground mt-1">{video.views}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-10">
            <Button variant="outline" size="lg" className="text-red-600 border-red-300 hover:bg-red-50">
              <Play className="h-4 w-4 mr-2" />
              Visit YouTube Channel
            </Button>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-20 bg-gradient-to-br from-primary via-primary to-[#5c0606] text-white relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-40 h-40 border border-white rounded-full" />
          <div className="absolute bottom-10 right-10 w-60 h-60 border border-white rounded-full" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] border border-white/20 rounded-full" />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold font-serif mb-4">
              Why Choose AstroPlanet?
            </h2>
            <p className="text-white/70 text-lg max-w-2xl mx-auto">
              We&apos;re committed to providing authentic products and services backed by centuries of Vedic tradition
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center group">
              <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-white/10 backdrop-blur-sm flex items-center justify-center group-hover:bg-accent group-hover:scale-110 transition-all duration-300">
                <Shield className="h-10 w-10 text-accent group-hover:text-black" />
              </div>
              <h3 className="text-xl font-bold mb-3">100% Authentic</h3>
              <p className="text-white/70">
                Every product is genuine and verified by our expert gemologists
              </p>
            </div>

            <div className="text-center group">
              <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-white/10 backdrop-blur-sm flex items-center justify-center group-hover:bg-accent group-hover:scale-110 transition-all duration-300">
                <Award className="h-10 w-10 text-accent group-hover:text-black" />
              </div>
              <h3 className="text-xl font-bold mb-3">Expert Astrologers</h3>
              <p className="text-white/70">
                Consultations with certified Vedic astrologers with 15+ years experience
              </p>
            </div>

            <div className="text-center group">
              <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-white/10 backdrop-blur-sm flex items-center justify-center group-hover:bg-accent group-hover:scale-110 transition-all duration-300">
                <Truck className="h-10 w-10 text-accent group-hover:text-black" />
              </div>
              <h3 className="text-xl font-bold mb-3">Free Shipping</h3>
              <p className="text-white/70">
                Complimentary shipping on orders above ₹500 across India
              </p>
            </div>

            <div className="text-center group">
              <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-white/10 backdrop-blur-sm flex items-center justify-center group-hover:bg-accent group-hover:scale-110 transition-all duration-300">
                <HeartHandshake className="h-10 w-10 text-accent group-hover:text-black" />
              </div>
              <h3 className="text-xl font-bold mb-3">Trusted Service</h3>
              <p className="text-white/70">
                10,000+ happy customers with 4.9★ average rating
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section - NEW */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-14">
            <Badge className="mb-4 bg-accent/20 text-accent-foreground border-accent/30 px-4 py-1">
              <Users className="h-3 w-3 mr-1 inline" />
              Happy Customers
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold font-serif mb-4">
              What Our Clients Say
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: "Priya Sharma",
                location: "Delhi",
                rating: 5,
                text: "The gemstone recommendation was perfect! I felt positive changes within weeks. Highly recommend their services."
              },
              {
                name: "Rajesh Kumar",
                location: "Mumbai",
                rating: 5,
                text: "Excellent Kundli analysis. The predictions were accurate and the remedies really helped solve my career issues."
              },
              {
                name: "Anita Patel",
                location: "Bangalore",
                rating: 5,
                text: "Amazing match making service. The astrologer explained everything in detail. Very satisfied with the consultation."
              },
            ].map((testimonial, idx) => (
              <Card key={idx} className="border-0 shadow-lg p-6">
                <CardContent className="p-0">
                  <div className="flex items-center gap-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 fill-accent text-accent" />
                    ))}
                  </div>
                  <p className="text-gray-600 mb-4 italic">&ldquo;{testimonial.text}&rdquo;</p>
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white font-bold">
                      {testimonial.name.charAt(0)}
                    </div>
                    <div>
                      <h4 className="font-semibold">{testimonial.name}</h4>
                      <p className="text-sm text-muted-foreground">{testimonial.location}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-accent/10 via-secondary/10 to-accent/10" />
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-gradient-radial from-accent/20 to-transparent rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-gradient-radial from-secondary/20 to-transparent rounded-full blur-3xl" />

        <div className="container mx-auto px-4 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 backdrop-blur-sm border border-primary/20 mb-6">
            <Sparkles className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium text-primary">Start Your Journey Today</span>
          </div>

          <h2 className="text-4xl md:text-6xl font-bold font-serif mb-6 max-w-3xl mx-auto leading-tight">
            Ready to Explore Your <span className="text-primary">Cosmic Destiny</span>?
          </h2>
          <p className="text-muted-foreground mb-10 max-w-2xl mx-auto text-lg">
            Join thousands of seekers who have discovered their path through our authentic
            astrology products and personalized services.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button asChild size="lg" className="bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 px-8 py-6 text-lg shadow-lg hover:shadow-xl transition-all">
              <Link href="/shop">
                Shop Now
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="px-8 py-6 text-lg">
              <Link href="/services">Explore Services</Link>
            </Button>
          </div>
        </div>
      </section>
    </MainLayout>
  );
}
