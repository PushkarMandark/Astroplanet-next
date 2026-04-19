"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
    Menu,
    ShoppingCart,
    User,
    Search,
    ChevronDown,
    Star,
    Calendar,
    Hash,
    Phone,
    Mail,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useCartStore, useAuthStore, useUIStore } from "@/stores";
import { siteConfig } from "@/config/site";
import { navigationConfig } from "@/config/navigation";
import { decodeHtmlEntities } from "@/lib/utils/decode";
import { CartSidebar } from "@/components/molecules/cart-sidebar";
import { useMounted } from "@/lib/hooks/use-mounted";

export function Header() {
    const mounted = useMounted();
    const [isCartOpen, setIsCartOpen] = useState(false);
    const cartItemCount = useCartStore((state) => state.getItemCount());
    const isAuthenticated = useAuthStore((state) => state.isAuthenticated());
    const { isMobileMenuOpen, toggleMobileMenu, closeMobileMenu } = useUIStore();

    const freeToolsIcons: Record<string, React.ReactNode> = {
        star: <Star className="h-5 w-5" />,
        calendar: <Calendar className="h-5 w-5" />,
        hash: <Hash className="h-5 w-5" />,
    };

    return (
        <>
            <header className="sticky top-0 z-50 w-full">
                {/* Top Bar */}
                <div className="hidden md:block bg-gradient-to-r from-primary via-primary to-[#5c0606] text-white">
                    <div className="container mx-auto px-4 py-2 flex items-center justify-between text-sm">
                        <div className="flex items-center gap-6">
                            <a href={`mailto:${siteConfig.contact.email}`} className="flex items-center gap-2 hover:text-accent transition-colors">
                                <Mail className="h-4 w-4" />
                                {siteConfig.contact.email}
                            </a>
                            <a href={`tel:${siteConfig.contact.phone.replace(/\s/g, '')}`} className="flex items-center gap-2 hover:text-accent transition-colors">
                                <Phone className="h-4 w-4" />
                                {siteConfig.contact.phone}
                            </a>
                        </div>
                        <div className="flex items-center gap-4">
                            <span className="text-white/70">Follow us:</span>
                            {Object.entries(siteConfig.social).slice(0, 4).map(([name, url]) => (
                                <a
                                    key={name}
                                    href={url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="hover:text-accent capitalize transition-colors"
                                >
                                    {name}
                                </a>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Main Header */}
                <div className="bg-white/95 backdrop-blur-md border-b shadow-sm">
                    <div className="container mx-auto px-4">
                        <div className="flex h-18 items-center justify-between py-3">
                            {/* Mobile Menu Button */}
                            <Sheet open={isMobileMenuOpen} onOpenChange={toggleMobileMenu}>
                                <SheetTrigger asChild className="md:hidden">
                                    <Button variant="ghost" size="icon" className="hover:bg-primary/10">
                                        <Menu className="h-6 w-6" />
                                    </Button>
                                </SheetTrigger>
                                <SheetContent side="left" className="w-80">
                                    <SheetHeader>
                                        <SheetTitle className="text-2xl font-serif bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                                            {siteConfig.name}
                                        </SheetTitle>
                                    </SheetHeader>
                                    <nav className="flex flex-col gap-2 mt-6">
                                        {navigationConfig.main.map((item) =>
                                            item.children ? (
                                                <div key={item.label}>
                                                    <p className="font-semibold px-3 py-2 text-primary">{item.label}</p>
                                                    <div className="ml-2 flex flex-col gap-1 border-l-2 border-primary/20 pl-4">
                                                        {item.children.map((child) => (
                                                            <Link
                                                                key={child.href}
                                                                href={child.href}
                                                                onClick={closeMobileMenu}
                                                                className="flex items-center gap-2 px-3 py-2 text-sm rounded-md hover:bg-primary/10 transition-colors"
                                                            >
                                                                {decodeHtmlEntities(child.label)}
                                                                {child.badge && (
                                                                    <Badge className="ml-auto bg-green-500 text-white border-0 text-xs">
                                                                        {child.badge}
                                                                    </Badge>
                                                                )}
                                                            </Link>
                                                        ))}
                                                    </div>
                                                </div>
                                            ) : (
                                                <Link
                                                    key={item.href}
                                                    href={item.href}
                                                    onClick={closeMobileMenu}
                                                    className="px-3 py-3 font-medium rounded-md hover:bg-primary/10 transition-colors"
                                                >
                                                    {item.label}
                                                </Link>
                                            )
                                        )}
                                    </nav>
                                </SheetContent>
                            </Sheet>

                            {/* Logo */}
                            <Link href="/" className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                                    <Star className="h-5 w-5 text-white" />
                                </div>
                                <span className="text-2xl font-bold font-serif bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                                    {siteConfig.name}
                                </span>
                            </Link>

                            {/* Desktop Navigation */}
                            <nav className="hidden md:flex items-center gap-1">
                                {navigationConfig.main.map((item) =>
                                    item.children ? (
                                        <DropdownMenu key={item.label}>
                                            <DropdownMenuTrigger asChild>
                                                <Button variant="ghost" className="gap-1 font-medium hover:text-primary hover:bg-primary/10">
                                                    {item.label}
                                                    <ChevronDown className="h-4 w-4" />
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align="center" className="w-72 p-2">
                                                {item.children.map((child) => (
                                                    <DropdownMenuItem key={child.href} asChild>
                                                        <Link
                                                            href={child.href}
                                                            className="flex items-start gap-3 p-3 rounded-lg hover:bg-primary/5 cursor-pointer"
                                                        >
                                                            <span className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary/10 to-secondary/10 flex items-center justify-center text-primary flex-shrink-0">
                                                                {child.icon && freeToolsIcons[child.icon]}
                                                            </span>
                                                            <div>
                                                                <div className="font-semibold flex items-center gap-2">
                                                                    {decodeHtmlEntities(child.label)}
                                                                    {child.badge && (
                                                                        <Badge className="bg-green-500 text-white border-0 text-xs">
                                                                            {child.badge}
                                                                        </Badge>
                                                                    )}
                                                                </div>
                                                                {child.description && (
                                                                    <p className="text-xs text-muted-foreground mt-0.5">
                                                                        {child.description}
                                                                    </p>
                                                                )}
                                                            </div>
                                                        </Link>
                                                    </DropdownMenuItem>
                                                ))}
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    ) : (
                                        <Button key={item.href} variant="ghost" asChild className="font-medium hover:text-primary hover:bg-primary/10">
                                            <Link href={item.href}>{decodeHtmlEntities(item.label)}</Link>
                                        </Button>
                                    )
                                )}
                            </nav>

                            {/* Actions */}
                            <div className="flex items-center gap-2">
                                <Button variant="ghost" size="icon" className="hidden md:flex hover:bg-primary/10">
                                    <Search className="h-5 w-5" />
                                </Button>

                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="relative hover:bg-primary/10"
                                    onClick={() => setIsCartOpen(true)}
                                >
                                    <ShoppingCart className="h-5 w-5" />
                                    {mounted && cartItemCount > 0 && (
                                        <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-gradient-to-r from-accent to-yellow-400 text-black text-xs font-bold flex items-center justify-center shadow-sm">
                                            {cartItemCount}
                                        </span>
                                    )}
                                </Button>

                                {mounted && (
                                    isAuthenticated ? (
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button variant="ghost" size="icon" className="hover:bg-primary/10">
                                                    <User className="h-5 w-5" />
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align="end" className="w-48">
                                                <DropdownMenuItem asChild>
                                                    <Link href="/dashboard" className="cursor-pointer">Dashboard</Link>
                                                </DropdownMenuItem>
                                                <DropdownMenuItem asChild>
                                                    <Link href="/dashboard?tab=orders" className="cursor-pointer">My Orders</Link>
                                                </DropdownMenuItem>
                                                <DropdownMenuItem asChild>
                                                    <Link href="/logout" className="text-destructive cursor-pointer">Logout</Link>
                                                </DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    ) : (
                                        <Button asChild className="bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 shadow-sm">
                                            <Link href="/login">Login</Link>
                                        </Button>
                                    )
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            {/* Cart Sidebar */}
            <CartSidebar open={isCartOpen} onOpenChange={setIsCartOpen} />
        </>
    );
}
