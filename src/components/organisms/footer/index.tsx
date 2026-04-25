import Link from "next/link";
import { Mail, Phone, MapPin, Facebook, Instagram, Twitter, Youtube } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { siteConfig } from "@/config/site";
import { navigationConfig } from "@/config/navigation";

export function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="relative overflow-hidden">
            {/* Newsletter Section */}
            <div className="bg-gradient-to-r from-accent/20 via-secondary/10 to-accent/20 py-12">
                <div className="container mx-auto px-4">
                    <div className="max-w-2xl mx-auto text-center">
                        <h3 className="text-2xl font-bold font-serif mb-2">
                            Subscribe to Our Newsletter
                        </h3>
                        <p className="text-muted-foreground mb-6">
                            Get daily horoscopes, exclusive offers, and spiritual guidance delivered to your inbox
                        </p>
                        <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                            <Input
                                type="email"
                                placeholder="Enter your email"
                                className="flex-1 bg-white"
                            />
                            <Button className="bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70">
                                Subscribe
                            </Button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Footer */}
            <div className="bg-gradient-to-br from-primary via-primary to-[#3d0404] text-white">
                <div className="container mx-auto px-4 py-16">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
                        {/* Brand */}
                        <div className="lg:col-span-1">
                            <div className="flex items-center gap-3 mb-6">
                                <img
                                    src="/images/logo.webp"
                                    alt={siteConfig.name}
                                    className="h-12 w-auto bg-white/95 rounded-lg p-1.5"
                                />
                            </div>
                            <p className="text-white/70 mb-6 leading-relaxed">
                                {siteConfig.tagline}. Your trusted destination for authentic Vedic astrology products and personalized spiritual guidance.
                            </p>
                            <div className="flex gap-3">
                                <a href={siteConfig.social.facebook} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-accent hover:text-black transition-colors">
                                    <Facebook className="h-5 w-5" />
                                </a>
                                <a href={siteConfig.social.instagram} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-accent hover:text-black transition-colors">
                                    <Instagram className="h-5 w-5" />
                                </a>
                                <a href={siteConfig.social.twitter} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-accent hover:text-black transition-colors">
                                    <Twitter className="h-5 w-5" />
                                </a>
                                <a href={siteConfig.social.youtube} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-accent hover:text-black transition-colors">
                                    <Youtube className="h-5 w-5" />
                                </a>
                            </div>
                        </div>

                        {/* Quick Links */}
                        <div>
                            <h4 className="font-bold text-lg mb-6 flex items-center gap-2">
                                <span className="w-8 h-0.5 bg-accent"></span>
                                Quick Links
                            </h4>
                            <ul className="space-y-3">
                                {navigationConfig.footer.quickLinks.map((link) => (
                                    <li key={link.href}>
                                        <Link
                                            href={link.href}
                                            className="text-white/70 hover:text-accent transition-colors flex items-center gap-2"
                                        >
                                            <span className="w-1.5 h-1.5 rounded-full bg-accent/50"></span>
                                            {link.label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Free Tools */}
                        <div>
                            <h4 className="font-bold text-lg mb-6 flex items-center gap-2">
                                <span className="w-8 h-0.5 bg-accent"></span>
                                Free Tools
                            </h4>
                            <ul className="space-y-3">
                                {navigationConfig.footer.freeTools.map((link) => (
                                    <li key={link.href}>
                                        <Link
                                            href={link.href}
                                            className="text-white/70 hover:text-accent transition-colors flex items-center gap-2"
                                        >
                                            <span className="w-1.5 h-1.5 rounded-full bg-green-400"></span>
                                            {link.label}
                                            <span className="text-xs bg-green-500 text-white px-1.5 py-0.5 rounded">FREE</span>
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Contact */}
                        <div>
                            <h4 className="font-bold text-lg mb-6 flex items-center gap-2">
                                <span className="w-8 h-0.5 bg-accent"></span>
                                Contact Us
                            </h4>
                            <div className="space-y-4">
                                <a
                                    href={`mailto:${siteConfig.contact.email}`}
                                    className="flex items-center gap-3 text-white/70 hover:text-accent transition-colors"
                                >
                                    <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center flex-shrink-0">
                                        <Mail className="h-5 w-5" />
                                    </div>
                                    {siteConfig.contact.email}
                                </a>
                                <a
                                    href={`tel:${siteConfig.contact.phone.replace(/\s/g, "")}`}
                                    className="flex items-center gap-3 text-white/70 hover:text-accent transition-colors"
                                >
                                    <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center flex-shrink-0">
                                        <Phone className="h-5 w-5" />
                                    </div>
                                    {siteConfig.contact.phone}
                                </a>
                                <div className="flex items-start gap-3 text-white/70">
                                    <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center flex-shrink-0">
                                        <MapPin className="h-5 w-5" />
                                    </div>
                                    <span>{siteConfig.contact.address}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <Separator className="my-10 bg-white/10" />

                    {/* Bottom */}
                    <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                        <div className="flex flex-wrap items-center gap-4 text-sm text-white/60">
                            <p>© {currentYear} {siteConfig.name}. All rights reserved.</p>
                            <span className="hidden md:inline">|</span>
                            <p>{siteConfig.business.name}</p>
                        </div>
                        <div className="flex items-center gap-6 text-sm">
                            {navigationConfig.footer.policies.map((link) => (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    className="text-white/60 hover:text-accent transition-colors"
                                >
                                    {link.label}
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}
