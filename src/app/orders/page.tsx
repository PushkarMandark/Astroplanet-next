"use client";

import { Package, Eye, ShoppingBag, Clock, CheckCircle, Truck, XCircle } from "lucide-react";
import { AccountLayout } from "@/components/templates/account-layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { EmptyState } from "@/components/molecules/empty-state";
import { formatPrice } from "@/lib/api/client";
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

// Mock orders - will be replaced with WooCommerce API
const mockOrders: Order[] = [];

interface Order {
    id: number;
    date: string;
    status: string;
    total: number;
    items: Array<{ name: string; quantity: number; price: number }>;
}

export default function OrdersPage() {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    return (
        <AccountLayout title="My Orders" description="Track and manage your orders">
            <Tabs defaultValue="all" className="w-full">
                <TabsList className="mb-6 w-full sm:w-auto">
                    <TabsTrigger value="all">All</TabsTrigger>
                    <TabsTrigger value="processing">Processing</TabsTrigger>
                    <TabsTrigger value="shipped">Shipped</TabsTrigger>
                    <TabsTrigger value="completed">Completed</TabsTrigger>
                </TabsList>

                <TabsContent value="all">
                    <div className="space-y-4">
                        {mockOrders.length > 0 ? (
                            mockOrders.map((order) => (
                                <OrderCard key={order.id} order={order} />
                            ))
                        ) : (
                            <OrdersEmptyState />
                        )}
                    </div>
                </TabsContent>

                <TabsContent value="processing">
                    <div className="space-y-4">
                        {mockOrders.filter(o => o.status === 'processing').length > 0 ? (
                            mockOrders.filter(o => o.status === 'processing').map((order) => (
                                <OrderCard key={order.id} order={order} />
                            ))
                        ) : (
                            <EmptyFilterState status="processing" />
                        )}
                    </div>
                </TabsContent>

                <TabsContent value="shipped">
                    <div className="space-y-4">
                        {mockOrders.filter(o => o.status === 'shipped').length > 0 ? (
                            mockOrders.filter(o => o.status === 'shipped').map((order) => (
                                <OrderCard key={order.id} order={order} />
                            ))
                        ) : (
                            <EmptyFilterState status="shipped" />
                        )}
                    </div>
                </TabsContent>

                <TabsContent value="completed">
                    <div className="space-y-4">
                        {mockOrders.filter(o => o.status === 'completed').length > 0 ? (
                            mockOrders.filter(o => o.status === 'completed').map((order) => (
                                <OrderCard key={order.id} order={order} />
                            ))
                        ) : (
                            <EmptyFilterState status="completed" />
                        )}
                    </div>
                </TabsContent>
            </Tabs>
        </AccountLayout>
    );
}

function OrderCard({ order }: { order: Order }) {
    const config = statusConfig[order.status] || statusConfig.pending;
    const StatusIcon = config.icon;

    return (
        <Card className="border-0 shadow-md overflow-hidden">
            <CardHeader className="bg-muted/30 py-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-full ${config.bgColor} flex items-center justify-center`}>
                            <StatusIcon className={`h-5 w-5 ${config.color}`} />
                        </div>
                        <div>
                            <CardTitle className="text-base">Order #{order.id}</CardTitle>
                            <p className="text-xs text-muted-foreground">
                                {new Date(order.date).toLocaleDateString('en-IN', {
                                    year: 'numeric',
                                    month: 'short',
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
            <CardContent className="p-4">
                <div className="space-y-2 mb-4">
                    {order.items.map((item, idx) => (
                        <div key={idx} className="flex justify-between items-center text-sm">
                            <span className="text-muted-foreground">
                                {item.name} × {item.quantity}
                            </span>
                            <span className="font-medium">{formatPrice(item.price)}</span>
                        </div>
                    ))}
                </div>
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pt-3 border-t">
                    <div>
                        <span className="text-sm text-muted-foreground">Total: </span>
                        <span className="text-lg font-bold text-primary">{formatPrice(order.total)}</span>
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

function OrdersEmptyState() {
    return (
        <Card className="card-shadow">
            <CardContent className="py-16">
                <EmptyState
                    icon={ShoppingBag}
                    title="No Orders Yet"
                    description="You haven't placed any orders yet. Start shopping to see your orders here."
                    actionLabel="Start Shopping"
                    actionHref="/shop"
                />
            </CardContent>
        </Card>
    );
}

function EmptyFilterState({ status }: { status: string }) {
    return (
        <Card className="card-shadow">
            <CardContent className="py-12 text-center">
                <Package className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                <p className="text-muted-foreground">
                    No {status} orders found
                </p>
            </CardContent>
        </Card>
    );
}
