"use client";

import Link from "next/link";
import {
    User,
    MapPin,
    Package,
    Heart,
    Settings,
    LogOut,
    Mail,
    Phone,
    Edit,
    Shield
} from "lucide-react";
import { MainLayout } from "@/components/templates/main-layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuthStore } from "@/stores";
import { useState, useEffect } from "react";

export default function AccountPage() {
    const [mounted, setMounted] = useState(false);
    const { user, isAuthenticated, logout } = useAuthStore();

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return (
            <MainLayout>
                <section className="bg-gradient-to-r from-primary to-primary/80 text-white py-12">
                    <div className="container mx-auto px-4">
                        <h1 className="text-4xl font-bold font-serif">My Account</h1>
                    </div>
                </section>
                <section className="py-12">
                    <div className="container mx-auto px-4">
                        <div className="animate-pulse h-96 bg-muted rounded-lg" />
                    </div>
                </section>
            </MainLayout>
        );
    }

    // If not authenticated, show login prompt
    if (!isAuthenticated()) {
        return (
            <MainLayout>
                <section className="bg-gradient-to-r from-primary to-primary/80 text-white py-12">
                    <div className="container mx-auto px-4">
                        <h1 className="text-4xl font-bold font-serif">My Account</h1>
                    </div>
                </section>
                <section className="py-20">
                    <div className="container mx-auto px-4 text-center">
                        <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-muted flex items-center justify-center">
                            <User className="h-12 w-12 text-muted-foreground" />
                        </div>
                        <h2 className="text-2xl font-bold font-serif mb-2">
                            Sign In to Your Account
                        </h2>
                        <p className="text-muted-foreground mb-8 max-w-md mx-auto">
                            Access your profile, orders, wishlist, and more by signing into your account.
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
                    <div className="flex items-center gap-4">
                        <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center text-3xl font-bold">
                            {user?.displayName?.charAt(0) || user?.firstName?.charAt(0) || 'U'}
                        </div>
                        <div>
                            <h1 className="text-3xl font-bold font-serif">
                                Welcome, {user?.displayName || user?.firstName || 'User'}!
                            </h1>
                            <p className="text-white/80">{user?.email || 'user@example.com'}</p>
                        </div>
                    </div>
                </div>
            </section>

            <section className="py-12">
                <div className="container mx-auto px-4">
                    <div className="grid lg:grid-cols-4 gap-8">
                        {/* Sidebar Navigation */}
                        <aside className="lg:col-span-1">
                            <Card className="border-0 shadow-lg sticky top-24">
                                <CardContent className="p-4">
                                    <nav className="space-y-1">
                                        <Link href="/account" className="flex items-center gap-3 p-3 rounded-lg bg-primary/10 text-primary font-medium">
                                            <User className="h-5 w-5" />
                                            Profile
                                        </Link>
                                        <Link href="/orders" className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted transition-colors">
                                            <Package className="h-5 w-5" />
                                            Orders
                                        </Link>
                                        <Link href="/wishlist" className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted transition-colors">
                                            <Heart className="h-5 w-5" />
                                            Wishlist
                                        </Link>
                                        <Link href="#addresses" className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted transition-colors">
                                            <MapPin className="h-5 w-5" />
                                            Addresses
                                        </Link>
                                        <Link href="#settings" className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted transition-colors">
                                            <Settings className="h-5 w-5" />
                                            Settings
                                        </Link>
                                        <Separator className="my-2" />
                                        <button
                                            onClick={logout}
                                            className="flex items-center gap-3 p-3 rounded-lg hover:bg-destructive/10 text-destructive transition-colors w-full"
                                        >
                                            <LogOut className="h-5 w-5" />
                                            Sign Out
                                        </button>
                                    </nav>
                                </CardContent>
                            </Card>
                        </aside>

                        {/* Main Content */}
                        <main className="lg:col-span-3">
                            <Tabs defaultValue="profile" className="w-full">
                                <TabsList className="mb-8">
                                    <TabsTrigger value="profile">Profile</TabsTrigger>
                                    <TabsTrigger value="addresses">Addresses</TabsTrigger>
                                    <TabsTrigger value="security">Security</TabsTrigger>
                                </TabsList>

                                {/* Profile Tab */}
                                <TabsContent value="profile">
                                    <Card className="border-0 shadow-lg">
                                        <CardHeader>
                                            <div className="flex items-center justify-between">
                                                <div>
                                                    <CardTitle>Personal Information</CardTitle>
                                                    <CardDescription>Manage your personal details</CardDescription>
                                                </div>
                                                <Button variant="outline" size="sm">
                                                    <Edit className="h-4 w-4 mr-2" />
                                                    Edit
                                                </Button>
                                            </div>
                                        </CardHeader>
                                        <CardContent className="space-y-6">
                                            <div className="grid md:grid-cols-2 gap-6">
                                                <div className="space-y-2">
                                                    <Label>Full Name</Label>
                                                    <Input value={user?.displayName || `${user?.firstName || ''} ${user?.lastName || ''}`.trim() || ''} readOnly className="bg-muted" />
                                                </div>
                                                <div className="space-y-2">
                                                    <Label>Email Address</Label>
                                                    <div className="flex items-center gap-2">
                                                        <Mail className="h-4 w-4 text-muted-foreground" />
                                                        <Input value={user?.email || ''} readOnly className="bg-muted" />
                                                    </div>
                                                </div>
                                                <div className="space-y-2">
                                                    <Label>Phone Number</Label>
                                                    <div className="flex items-center gap-2">
                                                        <Phone className="h-4 w-4 text-muted-foreground" />
                                                        <Input placeholder="Add phone number" className="bg-muted" />
                                                    </div>
                                                </div>
                                                <div className="space-y-2">
                                                    <Label>Date of Birth</Label>
                                                    <Input type="date" className="bg-muted" />
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>
                                </TabsContent>

                                {/* Addresses Tab */}
                                <TabsContent value="addresses">
                                    <Card className="border-0 shadow-lg">
                                        <CardHeader>
                                            <div className="flex items-center justify-between">
                                                <div>
                                                    <CardTitle>Saved Addresses</CardTitle>
                                                    <CardDescription>Manage your delivery addresses</CardDescription>
                                                </div>
                                                <Button size="sm" className="bg-gradient-to-r from-primary to-primary/80">
                                                    Add New Address
                                                </Button>
                                            </div>
                                        </CardHeader>
                                        <CardContent>
                                            <div className="grid md:grid-cols-2 gap-4">
                                                {/* Default Address */}
                                                <div className="p-4 rounded-lg border-2 border-primary/30 bg-primary/5 relative">
                                                    <Badge className="absolute top-2 right-2 bg-primary">Default</Badge>
                                                    <h4 className="font-semibold mb-2">Home</h4>
                                                    <p className="text-sm text-muted-foreground">
                                                        123 Example Street<br />
                                                        Apartment 4B<br />
                                                        New Delhi, Delhi 110001<br />
                                                        India
                                                    </p>
                                                    <div className="flex gap-2 mt-4">
                                                        <Button variant="outline" size="sm">Edit</Button>
                                                        <Button variant="ghost" size="sm" className="text-destructive">Remove</Button>
                                                    </div>
                                                </div>

                                                {/* Add New Address Card */}
                                                <div className="p-4 rounded-lg border-2 border-dashed border-muted-foreground/30 flex items-center justify-center min-h-[200px]">
                                                    <Button variant="ghost" className="flex flex-col gap-2 h-auto py-4">
                                                        <MapPin className="h-8 w-8 text-muted-foreground" />
                                                        <span className="text-muted-foreground">Add New Address</span>
                                                    </Button>
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>
                                </TabsContent>

                                {/* Security Tab */}
                                <TabsContent value="security">
                                    <Card className="border-0 shadow-lg">
                                        <CardHeader>
                                            <div className="flex items-center gap-3">
                                                <Shield className="h-6 w-6 text-primary" />
                                                <div>
                                                    <CardTitle>Security Settings</CardTitle>
                                                    <CardDescription>Manage your account security</CardDescription>
                                                </div>
                                            </div>
                                        </CardHeader>
                                        <CardContent className="space-y-6">
                                            <div className="p-4 rounded-lg bg-muted/50">
                                                <h4 className="font-semibold mb-2">Change Password</h4>
                                                <p className="text-sm text-muted-foreground mb-4">
                                                    Keep your account secure with a strong password
                                                </p>
                                                <Button variant="outline">Update Password</Button>
                                            </div>

                                            <div className="p-4 rounded-lg bg-muted/50">
                                                <h4 className="font-semibold mb-2">Two-Factor Authentication</h4>
                                                <p className="text-sm text-muted-foreground mb-4">
                                                    Add an extra layer of security to your account
                                                </p>
                                                <Button variant="outline">Enable 2FA</Button>
                                            </div>

                                            <Separator />

                                            <div className="p-4 rounded-lg border border-destructive/30 bg-destructive/5">
                                                <h4 className="font-semibold text-destructive mb-2">Delete Account</h4>
                                                <p className="text-sm text-muted-foreground mb-4">
                                                    Permanently delete your account and all associated data
                                                </p>
                                                <Button variant="destructive" size="sm">Delete Account</Button>
                                            </div>
                                        </CardContent>
                                    </Card>
                                </TabsContent>
                            </Tabs>
                        </main>
                    </div>
                </div>
            </section>
        </MainLayout>
    );
}
