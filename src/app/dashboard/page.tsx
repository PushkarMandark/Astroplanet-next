"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { MainLayout } from "@/components/templates/main-layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useAuthStore } from "@/stores";
import { User, Package, Heart, LogOut, Settings } from "lucide-react";

export default function DashboardPage() {
    const router = useRouter();
    const { user, isAuthenticated, logout } = useAuthStore();

    useEffect(() => {
        if (!isAuthenticated()) {
            router.push("/login?redirect=/dashboard");
        }
    }, [isAuthenticated, router]);

    const handleLogout = () => {
        logout();
        router.push("/");
    };

    if (!user) {
        return (
            <MainLayout>
                <div className="min-h-[60vh] flex items-center justify-center">
                    <p className="text-muted-foreground">Loading...</p>
                </div>
            </MainLayout>
        );
    }

    return (
        <MainLayout>
            {/* Page Header */}
            <section className="bg-primary text-primary-foreground py-8">
                <div className="container mx-auto px-4">
                    <h1 className="text-3xl font-bold font-heading">My Account</h1>
                    <p className="text-primary-foreground/80">Welcome back, {user.displayName}!</p>
                </div>
            </section>

            <section className="py-8">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                        {/* Sidebar */}
                        <div className="lg:col-span-1">
                            <Card>
                                <CardHeader>
                                    <div className="flex items-center gap-4">
                                        <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                                            <User className="h-8 w-8 text-primary" />
                                        </div>
                                        <div>
                                            <p className="font-semibold">{user.displayName}</p>
                                            <p className="text-sm text-muted-foreground">{user.email}</p>
                                        </div>
                                    </div>
                                </CardHeader>
                                <CardContent className="space-y-2">
                                    <Button variant="ghost" className="w-full justify-start">
                                        <Package className="h-4 w-4 mr-2" />
                                        My Orders
                                    </Button>
                                    <Button variant="ghost" className="w-full justify-start">
                                        <Heart className="h-4 w-4 mr-2" />
                                        Wishlist
                                    </Button>
                                    <Button variant="ghost" className="w-full justify-start">
                                        <Settings className="h-4 w-4 mr-2" />
                                        Account Settings
                                    </Button>
                                    <Separator />
                                    <Button
                                        variant="ghost"
                                        className="w-full justify-start text-destructive hover:text-destructive"
                                        onClick={handleLogout}
                                    >
                                        <LogOut className="h-4 w-4 mr-2" />
                                        Logout
                                    </Button>
                                </CardContent>
                            </Card>
                        </div>

                        {/* Main Content */}
                        <div className="lg:col-span-3">
                            <Tabs defaultValue="orders">
                                <TabsList className="w-full justify-start">
                                    <TabsTrigger value="orders">Orders</TabsTrigger>
                                    <TabsTrigger value="profile">Profile</TabsTrigger>
                                </TabsList>

                                <TabsContent value="orders" className="mt-6">
                                    <Card>
                                        <CardHeader>
                                            <CardTitle>Recent Orders</CardTitle>
                                        </CardHeader>
                                        <CardContent>
                                            <div className="text-center py-8">
                                                <Package className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                                                <p className="text-muted-foreground">No orders yet.</p>
                                                <Button asChild className="mt-4">
                                                    <a href="/shop">Start Shopping</a>
                                                </Button>
                                            </div>
                                        </CardContent>
                                    </Card>
                                </TabsContent>

                                <TabsContent value="profile" className="mt-6">
                                    <Card>
                                        <CardHeader>
                                            <CardTitle>Profile Information</CardTitle>
                                        </CardHeader>
                                        <CardContent className="space-y-4">
                                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                                <div>
                                                    <p className="text-sm text-muted-foreground">Username</p>
                                                    <p className="font-medium">{user.username}</p>
                                                </div>
                                                <div>
                                                    <p className="text-sm text-muted-foreground">Email</p>
                                                    <p className="font-medium">{user.email}</p>
                                                </div>
                                                <div>
                                                    <p className="text-sm text-muted-foreground">Display Name</p>
                                                    <p className="font-medium">{user.displayName}</p>
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>
                                </TabsContent>
                            </Tabs>
                        </div>
                    </div>
                </div>
            </section>
        </MainLayout>
    );
}
