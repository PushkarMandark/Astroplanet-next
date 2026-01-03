"use client";

import Link from "next/link";
import { Package, Heart, ShoppingBag, TrendingUp, ArrowRight, Clock } from "lucide-react";
import { AccountLayout } from "@/components/templates/account-layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuthStore, useCartStore, useWishlistStore } from "@/stores";
import { formatPrice } from "@/lib/api/client";
import { useState, useEffect } from "react";

export default function DashboardPage() {
    const [mounted, setMounted] = useState(false);
    const user = useAuthStore((state) => state.user);
    const cartItemCount = useCartStore((state) => state.getItemCount());
    const wishlistCount = useWishlistStore((state) => state.items.length);

    useEffect(() => {
        setMounted(true);
    }, []);

    // Quick stats for dashboard
    const stats = [
        {
            label: "Cart Items",
            value: mounted ? cartItemCount : 0,
            icon: ShoppingBag,
            href: "/cart",
            color: "bg-blue-500",
        },
        {
            label: "Wishlist",
            value: mounted ? wishlistCount : 0,
            icon: Heart,
            href: "/wishlist",
            color: "bg-pink-500",
        },
        {
            label: "Total Orders",
            value: 0,
            icon: Package,
            href: "/orders",
            color: "bg-green-500",
        },
    ];

    return (
        <AccountLayout
            title="Dashboard"
            description={`Welcome back${user?.displayName ? `, ${user.displayName}` : ''}!`}
        >
            {/* Quick Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
                {stats.map((stat) => {
                    const Icon = stat.icon;
                    return (
                        <Link key={stat.label} href={stat.href}>
                            <Card className="border-0 shadow-md hover:shadow-lg transition-shadow cursor-pointer">
                                <CardContent className="p-4 flex items-center gap-4">
                                    <div className={`w-12 h-12 rounded-lg ${stat.color} flex items-center justify-center`}>
                                        <Icon className="h-6 w-6 text-white" />
                                    </div>
                                    <div>
                                        <p className="text-2xl font-bold">{stat.value}</p>
                                        <p className="text-sm text-muted-foreground">{stat.label}</p>
                                    </div>
                                </CardContent>
                            </Card>
                        </Link>
                    );
                })}
            </div>

            {/* Recent Orders */}
            <Card className="border-0 shadow-lg mb-8">
                <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle className="flex items-center gap-2">
                        <Clock className="h-5 w-5 text-primary" />
                        Recent Orders
                    </CardTitle>
                    <Button asChild variant="ghost" size="sm">
                        <Link href="/orders">
                            View All
                            <ArrowRight className="h-4 w-4 ml-1" />
                        </Link>
                    </Button>
                </CardHeader>
                <CardContent>
                    <div className="text-center py-8">
                        <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-muted flex items-center justify-center">
                            <Package className="h-8 w-8 text-muted-foreground" />
                        </div>
                        <p className="text-muted-foreground mb-4">No orders yet</p>
                        <Button asChild>
                            <Link href="/shop">
                                <ShoppingBag className="h-4 w-4 mr-2" />
                                Start Shopping
                            </Link>
                        </Button>
                    </div>
                </CardContent>
            </Card>

            {/* Account Quick Actions */}
            <Card className="border-0 shadow-lg">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <TrendingUp className="h-5 w-5 text-primary" />
                        Quick Actions
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                        <Link href="/shop" className="p-4 rounded-lg bg-muted/50 hover:bg-muted text-center transition-colors">
                            <ShoppingBag className="h-6 w-6 mx-auto mb-2 text-primary" />
                            <span className="text-sm font-medium">Browse Shop</span>
                        </Link>
                        <Link href="/orders" className="p-4 rounded-lg bg-muted/50 hover:bg-muted text-center transition-colors">
                            <Package className="h-6 w-6 mx-auto mb-2 text-primary" />
                            <span className="text-sm font-medium">Track Orders</span>
                        </Link>
                        <Link href="/wishlist" className="p-4 rounded-lg bg-muted/50 hover:bg-muted text-center transition-colors">
                            <Heart className="h-6 w-6 mx-auto mb-2 text-primary" />
                            <span className="text-sm font-medium">Wishlist</span>
                        </Link>
                        <Link href="/account" className="p-4 rounded-lg bg-muted/50 hover:bg-muted text-center transition-colors">
                            <TrendingUp className="h-6 w-6 mx-auto mb-2 text-primary" />
                            <span className="text-sm font-medium">Settings</span>
                        </Link>
                    </div>
                </CardContent>
            </Card>
        </AccountLayout>
    );
}
