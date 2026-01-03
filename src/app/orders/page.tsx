"use client";

import Link from "next/link";
import { Package, Eye, ArrowRight, ShoppingBag, Clock, CheckCircle, Truck, XCircle } from "lucide-react";
import { MainLayout } from "@/components/templates/main-layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { formatPrice } from "@/lib/api/client";
import { useAuthStore } from "@/stores";
import { useState, useEffect } from "react";

// Order status icons and colors
const statusConfig: Record<string, { icon: React.ElementType; color: string; bgColor: string }> = {
    pending: { icon: Clock, color: "text-yellow-600", bgColor: "bg-yellow-100" },
    processing: { icon: Package, color: "text-blue-600", bgColor: "bg-blue-100" },
    "on-hold": { icon: Clock, color: "text-orange-600", bgColor: "bg-orange-100" },
    completed: { icon: CheckCircle, color: "text-green-600", bgColor: "bg-green-100" },
    shipped: { icon: Truck, color: "text-indigo-600", bgColor: "bg-indigo-100" },
    cancelled: { icon: XCircle, color: "text-red-600", bgColor: "bg-red-100" },
    refunded: { icon: XCircle, color: "text-gray-600", bgColor: "bg-gray-100" },
};

// Mock orders for display (will be replaced with WooCommerce API)
const mockOrders = [
    {
        id: 1234,
        date: "2024-01-15",
        status: "completed",
        total: 2499,
        items: [
            { name: "Natural Ruby Gemstone", quantity: 1, price: 2499 }
        ]
    },
    {
        id: 1235,
        date: "2024-01-20",
        status: "shipped",
        total: 1599,
        items: [
            { name: "5 Mukhi Rudraksha", quantity: 2, price: 799 }
        ]
    },
    {
        id: 1236,
        date: "2024-01-25",
        status: "processing",
        total: 4999,
        items: [
            { name: "Sri Yantra Gold Plated", quantity: 1, price: 4999 }
        ]
    },
];

export default function OrdersPage() {
    const [mounted, setMounted] = useState(false);
    const isAuthenticated = useAuthStore((state) => state.isAuthenticated());

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return (
            <MainLayout>
                <section className="bg-gradient-to-r from-primary to-primary/80 text-white py-12">
                    <div className="container mx-auto px-4">
                        <h1 className="text-4xl font-bold font-serif">My Orders</h1>
                    </div>
                </section>
                <section className="py-12">
                    <div className="container mx-auto px-4">
                        <div className="animate-pulse space-y-4">
                            {[1, 2, 3].map((i) => (
                                <div key={i} className="h-32 bg-muted rounded-lg" />
                            ))}
                        </div>
                    </div>
                </section>
            </MainLayout>
        );
    }

    // If not authenticated, show login prompt
    if (!isAuthenticated) {
        return (
            <MainLayout>
                <section className="bg-gradient-to-r from-primary to-primary/80 text-white py-12">
                    <div className="container mx-auto px-4">
                        <h1 className="text-4xl font-bold font-serif">My Orders</h1>
                    </div>
                </section>
                <section className="py-20">
                    <div className="container mx-auto px-4 text-center">
                        <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-muted flex items-center justify-center">
                            <Package className="h-12 w-12 text-muted-foreground" />
                        </div>
                        <h2 className="text-2xl font-bold font-serif mb-2">
                            Sign In to View Orders
                        </h2>
                        <p className="text-muted-foreground mb-8 max-w-md mx-auto">
                            Please sign in to your account to view your order history and track shipments.
                        </p>
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                            <Button asChild size="lg" className="bg-gradient-to-r from-primary to-primary/80">
                                <Link href="/login">Sign In</Link>
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

    return (
        <MainLayout>
            {/* Page Header */}
            <section className="bg-gradient-to-r from-primary to-primary/80 text-white py-12">
                <div className="container mx-auto px-4">
                    <h1 className="text-4xl font-bold font-serif">My Orders</h1>
                    <p className="text-white/80 mt-2">Track and manage your orders</p>
                </div>
            </section>

            <section className="py-12">
                <div className="container mx-auto px-4">
                    <Tabs defaultValue="all" className="w-full">
                        <TabsList className="mb-8">
                            <TabsTrigger value="all">All Orders</TabsTrigger>
                            <TabsTrigger value="processing">Processing</TabsTrigger>
                            <TabsTrigger value="shipped">Shipped</TabsTrigger>
                            <TabsTrigger value="completed">Completed</TabsTrigger>
                        </TabsList>

                        <TabsContent value="all">
                            <div className="space-y-6">
                                {mockOrders.length > 0 ? (
                                    mockOrders.map((order) => (
                                        <OrderCard key={order.id} order={order} />
                                    ))
                                ) : (
                                    <EmptyState />
                                )}
                            </div>
                        </TabsContent>

                        <TabsContent value="processing">
                            <div className="space-y-6">
                                {mockOrders.filter(o => o.status === 'processing').map((order) => (
                                    <OrderCard key={order.id} order={order} />
                                ))}
                            </div>
                        </TabsContent>

                        <TabsContent value="shipped">
                            <div className="space-y-6">
                                {mockOrders.filter(o => o.status === 'shipped').map((order) => (
                                    <OrderCard key={order.id} order={order} />
                                ))}
                            </div>
                        </TabsContent>

                        <TabsContent value="completed">
                            <div className="space-y-6">
                                {mockOrders.filter(o => o.status === 'completed').map((order) => (
                                    <OrderCard key={order.id} order={order} />
                                ))}
                            </div>
                        </TabsContent>
                    </Tabs>
                </div>
            </section>
        </MainLayout>
    );
}

interface Order {
    id: number;
    date: string;
    status: string;
    total: number;
    items: Array<{ name: string; quantity: number; price: number }>;
}

function OrderCard({ order }: { order: Order }) {
    const config = statusConfig[order.status] || statusConfig.pending;
    const StatusIcon = config.icon;

    return (
        <Card className="border-0 shadow-lg overflow-hidden">
            <CardHeader className="bg-muted/30 py-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                        <div className={`w-12 h-12 rounded-full ${config.bgColor} flex items-center justify-center`}>
                            <StatusIcon className={`h-6 w-6 ${config.color}`} />
                        </div>
                        <div>
                            <CardTitle className="text-lg">Order #{order.id}</CardTitle>
                            <p className="text-sm text-muted-foreground">
                                Placed on {new Date(order.date).toLocaleDateString('en-IN', {
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric'
                                })}
                            </p>
                        </div>
                    </div>
                    <Badge className={`${config.bgColor} ${config.color} border-0 capitalize`}>
                        {order.status}
                    </Badge>
                </div>
            </CardHeader>
            <CardContent className="p-6">
                <div className="space-y-3 mb-4">
                    {order.items.map((item, idx) => (
                        <div key={idx} className="flex justify-between items-center">
                            <span className="text-muted-foreground">
                                {item.name} × {item.quantity}
                            </span>
                            <span className="font-medium">{formatPrice(item.price)}</span>
                        </div>
                    ))}
                </div>
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-4 border-t">
                    <div>
                        <span className="text-sm text-muted-foreground">Order Total: </span>
                        <span className="text-xl font-bold text-primary">{formatPrice(order.total)}</span>
                    </div>
                    <Button variant="outline" size="sm">
                        <Eye className="h-4 w-4 mr-2" />
                        View Details
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
}

function EmptyState() {
    return (
        <div className="text-center py-16">
            <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-muted flex items-center justify-center">
                <ShoppingBag className="h-12 w-12 text-muted-foreground" />
            </div>
            <h3 className="text-xl font-bold mb-2">No Orders Yet</h3>
            <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                You haven&apos;t placed any orders yet. Start shopping to see your orders here.
            </p>
            <Button asChild className="bg-gradient-to-r from-primary to-primary/80">
                <Link href="/shop">
                    Start Shopping
                    <ArrowRight className="h-4 w-4 ml-2" />
                </Link>
            </Button>
        </div>
    );
}
