"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
    LayoutDashboard,
    Package,
    Heart,
    Settings,
    LogOut,
    User,
    ChevronRight,
    Menu
} from "lucide-react";
import { MainLayout } from "@/components/templates/main-layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useAuthStore } from "@/stores";
import { cn } from "@/lib/utils";

interface AccountLayoutProps {
    children: React.ReactNode;
    title: string;
    description?: string;
}

const navigationItems = [
    { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { href: "/orders", label: "My Orders", icon: Package },
    { href: "/wishlist", label: "Wishlist", icon: Heart },
    { href: "/account", label: "Account Settings", icon: Settings },
];

export function AccountLayout({ children, title, description }: AccountLayoutProps) {
    const [mounted, setMounted] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const pathname = usePathname();
    const router = useRouter();
    const { user, isAuthenticated, logout } = useAuthStore();

    useEffect(() => {
        setMounted(true);
    }, []);

    useEffect(() => {
        if (mounted && !isAuthenticated()) {
            router.push(`/login?redirect=${pathname}`);
        }
    }, [mounted, isAuthenticated, router, pathname]);

    const handleLogout = () => {
        logout();
        router.push("/");
    };

    // Loading state
    if (!mounted) {
        return (
            <MainLayout>
                <section className="bg-gradient-to-r from-primary to-primary/80 text-white py-8">
                    <div className="container mx-auto px-4">
                        <div className="h-8 w-48 bg-white/20 rounded animate-pulse" />
                    </div>
                </section>
                <section className="py-8">
                    <div className="container mx-auto px-4">
                        <div className="grid lg:grid-cols-4 gap-8">
                            <div className="hidden lg:block">
                                <div className="h-80 bg-muted rounded-lg animate-pulse" />
                            </div>
                            <div className="lg:col-span-3">
                                <div className="h-96 bg-muted rounded-lg animate-pulse" />
                            </div>
                        </div>
                    </div>
                </section>
            </MainLayout>
        );
    }

    // Not authenticated
    if (!isAuthenticated()) {
        return (
            <MainLayout>
                <section className="bg-gradient-to-r from-primary to-primary/80 text-white py-12">
                    <div className="container mx-auto px-4">
                        <h1 className="text-3xl font-bold font-serif">{title}</h1>
                    </div>
                </section>
                <section className="py-20">
                    <div className="container mx-auto px-4 text-center">
                        <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-muted flex items-center justify-center">
                            <User className="h-12 w-12 text-muted-foreground" />
                        </div>
                        <h2 className="text-2xl font-bold font-serif mb-2">
                            Sign In Required
                        </h2>
                        <p className="text-muted-foreground mb-8 max-w-md mx-auto">
                            Please sign in to access your account.
                        </p>
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                            <Button asChild size="lg" className="bg-gradient-to-r from-primary to-primary/80">
                                <Link href={`/login?redirect=${pathname}`}>Sign In</Link>
                            </Button>
                            <Button asChild size="lg" variant="outline">
                                <Link href="/register">Create Account</Link>
                            </Button>
                        </div>
                    </div>
                </section>
            </MainLayout>
        );
    }

    const SidebarContent = () => (
        <>
            {/* User Info */}
            <div className="p-4 border-b">
                <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center text-white font-bold text-lg">
                        {user?.displayName?.charAt(0) || user?.email?.charAt(0) || "U"}
                    </div>
                    <div className="flex-1 min-w-0">
                        <p className="font-semibold truncate">
                            {user?.displayName || user?.username || "User"}
                        </p>
                        <p className="text-xs text-muted-foreground truncate">
                            {user?.email || ""}
                        </p>
                    </div>
                </div>
            </div>

            {/* Navigation */}
            <nav className="p-2 flex-1">
                {navigationItems.map((item) => {
                    const isActive = pathname === item.href ||
                        (item.href !== "/dashboard" && pathname.startsWith(item.href));
                    const Icon = item.icon;

                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            onClick={() => setMobileMenuOpen(false)}
                            className={cn(
                                "flex items-center gap-3 px-4 py-3 rounded-lg mb-1 transition-all",
                                isActive
                                    ? "bg-primary text-primary-foreground font-medium shadow-sm"
                                    : "hover:bg-muted text-muted-foreground hover:text-foreground"
                            )}
                        >
                            <Icon className="h-5 w-5" />
                            <span className="flex-1">{item.label}</span>
                            {isActive && <ChevronRight className="h-4 w-4" />}
                        </Link>
                    );
                })}
            </nav>

            {/* Logout */}
            <div className="p-2 border-t">
                <Button
                    variant="ghost"
                    onClick={handleLogout}
                    className="w-full justify-start text-destructive hover:text-destructive hover:bg-destructive/10"
                >
                    <LogOut className="h-5 w-5 mr-3" />
                    Sign Out
                </Button>
            </div>
        </>
    );

    return (
        <MainLayout>
            {/* Page Header */}
            <section className="bg-gradient-to-r from-primary to-primary/80 text-white py-8">
                <div className="container mx-auto px-4">
                    <div className="flex items-center gap-4">
                        {/* Mobile Menu Button */}
                        <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
                            <SheetTrigger asChild className="lg:hidden">
                                <Button variant="ghost" size="icon" className="text-white hover:bg-white/20">
                                    <Menu className="h-6 w-6" />
                                </Button>
                            </SheetTrigger>
                            <SheetContent side="left" className="w-72 p-0 flex flex-col">
                                <SidebarContent />
                            </SheetContent>
                        </Sheet>

                        <div>
                            <h1 className="text-2xl md:text-3xl font-bold font-serif">{title}</h1>
                            {description && (
                                <p className="text-white/80 text-sm md:text-base">{description}</p>
                            )}
                        </div>
                    </div>
                </div>
            </section>

            {/* Main Content */}
            <section className="py-8">
                <div className="container mx-auto px-4">
                    <div className="grid lg:grid-cols-4 gap-8">
                        {/* Desktop Sidebar */}
                        <aside className="hidden lg:block">
                            <Card className="border-0 shadow-lg sticky top-24 overflow-hidden">
                                <CardContent className="p-0 flex flex-col">
                                    <SidebarContent />
                                </CardContent>
                            </Card>
                        </aside>

                        {/* Content Area */}
                        <main className="lg:col-span-3">
                            {children}
                        </main>
                    </div>
                </div>
            </section>
        </MainLayout>
    );
}
