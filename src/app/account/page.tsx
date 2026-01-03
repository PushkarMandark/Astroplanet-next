"use client";

import { useState, useEffect } from "react";
import {
    User,
    MapPin,
    Mail,
    Phone,
    Edit,
    Shield,
    Plus,
    Eye,
    EyeOff,
    Loader2,
    Check,
    X,
    Home,
    Building2,
    Save
} from "lucide-react";
import { AccountLayout } from "@/components/templates/account-layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { useAuthStore } from "@/stores";
import { toast } from "sonner";

const WP_URL = process.env.NEXT_PUBLIC_WP_URL || "https://api.astroeshop.com";

interface Address {
    id: string;
    type: "billing" | "shipping";
    label: string;
    first_name: string;
    last_name: string;
    company: string;
    address_1: string;
    address_2: string;
    city: string;
    state: string;
    postcode: string;
    country: string;
    phone: string;
    isDefault?: boolean;
}

const INDIAN_STATES = [
    "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh",
    "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka",
    "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya", "Mizoram",
    "Nagaland", "Odisha", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu",
    "Telangana", "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal",
    "Delhi", "Jammu and Kashmir", "Ladakh"
];

export default function AccountPage() {
    const [mounted, setMounted] = useState(false);
    const [isEditingProfile, setIsEditingProfile] = useState(false);
    const [showPasswordForm, setShowPasswordForm] = useState(false);
    const [showAddressDialog, setShowAddressDialog] = useState(false);
    const [editingAddress, setEditingAddress] = useState<Address | null>(null);

    // Profile form state
    const [profileForm, setProfileForm] = useState({
        firstName: "",
        lastName: "",
        phone: "",
        dateOfBirth: ""
    });

    // Password form state
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    // Address form state
    const [addressForm, setAddressForm] = useState<Partial<Address>>({
        type: "shipping",
        label: "Home",
        first_name: "",
        last_name: "",
        company: "",
        address_1: "",
        address_2: "",
        city: "",
        state: "",
        postcode: "",
        country: "India",
        phone: ""
    });

    // Saved addresses
    const [addresses, setAddresses] = useState<Address[]>([]);

    const [isLoading, setIsLoading] = useState(false);

    const user = useAuthStore((state) => state.user);
    const token = useAuthStore((state) => state.token);

    useEffect(() => {
        setMounted(true);
        if (user) {
            setProfileForm({
                firstName: user.firstName || "",
                lastName: user.lastName || "",
                phone: "",
                dateOfBirth: ""
            });
        }
    }, [user]);

    const handleProfileSave = async () => {
        setIsLoading(true);
        try {
            const response = await fetch(`${WP_URL}/wp-json/wp/v2/users/me`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,
                },
                body: JSON.stringify({
                    first_name: profileForm.firstName,
                    last_name: profileForm.lastName,
                    name: `${profileForm.firstName} ${profileForm.lastName}`.trim(),
                }),
            });

            if (response.ok) {
                toast.success("Profile updated successfully!");
                setIsEditingProfile(false);
            } else {
                toast.error("Failed to update profile");
            }
        } catch {
            toast.error("An error occurred");
        } finally {
            setIsLoading(false);
        }
    };

    const handlePasswordChange = async () => {
        if (newPassword !== confirmPassword) {
            toast.error("Passwords do not match");
            return;
        }
        if (newPassword.length < 8) {
            toast.error("Password must be at least 8 characters");
            return;
        }

        setIsLoading(true);
        try {
            const response = await fetch(`${WP_URL}/wp-json/wp/v2/users/me`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,
                },
                body: JSON.stringify({ password: newPassword }),
            });

            if (response.ok) {
                toast.success("Password updated!");
                setShowPasswordForm(false);
                setNewPassword("");
                setConfirmPassword("");
            } else {
                toast.error("Failed to update password");
            }
        } catch {
            toast.error("An error occurred");
        } finally {
            setIsLoading(false);
        }
    };

    const handleAddressSave = () => {
        if (!addressForm.address_1 || !addressForm.city || !addressForm.state || !addressForm.postcode) {
            toast.error("Please fill in all required fields");
            return;
        }

        const newAddress: Address = {
            id: editingAddress?.id || Date.now().toString(),
            type: addressForm.type as "billing" | "shipping",
            label: addressForm.label || "Home",
            first_name: addressForm.first_name || "",
            last_name: addressForm.last_name || "",
            company: addressForm.company || "",
            address_1: addressForm.address_1 || "",
            address_2: addressForm.address_2 || "",
            city: addressForm.city || "",
            state: addressForm.state || "",
            postcode: addressForm.postcode || "",
            country: "India",
            phone: addressForm.phone || "",
            isDefault: addresses.length === 0
        };

        if (editingAddress) {
            setAddresses(prev => prev.map(a => a.id === editingAddress.id ? newAddress : a));
            toast.success("Address updated!");
        } else {
            setAddresses(prev => [...prev, newAddress]);
            toast.success("Address added!");
        }

        setShowAddressDialog(false);
        setEditingAddress(null);
        resetAddressForm();
    };

    const resetAddressForm = () => {
        setAddressForm({
            type: "shipping",
            label: "Home",
            first_name: "",
            last_name: "",
            company: "",
            address_1: "",
            address_2: "",
            city: "",
            state: "",
            postcode: "",
            country: "India",
            phone: ""
        });
    };

    const handleDeleteAddress = (id: string) => {
        setAddresses(prev => prev.filter(a => a.id !== id));
        toast.success("Address deleted");
    };

    const openEditAddress = (address: Address) => {
        setAddressForm(address);
        setEditingAddress(address);
        setShowAddressDialog(true);
    };

    return (
        <AccountLayout title="Account Settings" description="Manage your profile and preferences">
            <Tabs defaultValue="profile" className="w-full">
                <TabsList className="mb-6 w-full sm:w-auto">
                    <TabsTrigger value="profile">Profile</TabsTrigger>
                    <TabsTrigger value="addresses">Addresses</TabsTrigger>
                    <TabsTrigger value="security">Security</TabsTrigger>
                </TabsList>

                {/* Profile Tab */}
                <TabsContent value="profile">
                    <Card className="border-0 shadow-lg py-4">
                        <CardHeader>
                            <div className="flex items-center justify-between">
                                <div>
                                    <CardTitle>Personal Information</CardTitle>
                                    <CardDescription>Manage your personal details</CardDescription>
                                </div>
                                {!isEditingProfile ? (
                                    <Button variant="outline" size="sm" onClick={() => setIsEditingProfile(true)}>
                                        <Edit className="h-4 w-4 mr-2" />
                                        Edit
                                    </Button>
                                ) : (
                                    <div className="flex gap-2">
                                        <Button size="sm" onClick={handleProfileSave} disabled={isLoading}>
                                            {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4 mr-1" />}
                                            Save
                                        </Button>
                                        <Button variant="ghost" size="sm" onClick={() => setIsEditingProfile(false)}>
                                            <X className="h-4 w-4" />
                                        </Button>
                                    </div>
                                )}
                            </div>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="grid md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <Label>First Name</Label>
                                    <div className="flex items-center gap-2">
                                        <User className="h-4 w-4 text-muted-foreground" />
                                        <Input
                                            value={mounted ? (isEditingProfile ? profileForm.firstName : user?.firstName || "Not set") : ""}
                                            onChange={(e) => setProfileForm(p => ({ ...p, firstName: e.target.value }))}
                                            readOnly={!isEditingProfile}
                                            className={!isEditingProfile ? "bg-muted" : ""}
                                        />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <Label>Last Name</Label>
                                    <div className="flex items-center gap-2">
                                        <User className="h-4 w-4 text-muted-foreground" />
                                        <Input
                                            value={mounted ? (isEditingProfile ? profileForm.lastName : user?.lastName || "Not set") : ""}
                                            onChange={(e) => setProfileForm(p => ({ ...p, lastName: e.target.value }))}
                                            readOnly={!isEditingProfile}
                                            className={!isEditingProfile ? "bg-muted" : ""}
                                        />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <Label>Email Address</Label>
                                    <div className="flex items-center gap-2">
                                        <Mail className="h-4 w-4 text-muted-foreground" />
                                        <Input value={mounted ? (user?.email || "") : ""} readOnly className="bg-muted" />
                                    </div>
                                    <p className="text-xs text-muted-foreground">Email cannot be changed here</p>
                                </div>
                                <div className="space-y-2">
                                    <Label>Phone Number</Label>
                                    <div className="flex items-center gap-2">
                                        <Phone className="h-4 w-4 text-muted-foreground" />
                                        <Input
                                            placeholder="Add phone number"
                                            value={profileForm.phone}
                                            onChange={(e) => setProfileForm(p => ({ ...p, phone: e.target.value }))}
                                            readOnly={!isEditingProfile}
                                            className={!isEditingProfile ? "bg-muted" : ""}
                                        />
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                {/* Addresses Tab */}
                <TabsContent value="addresses">
                    <Card className="border-0 shadow-lg py-4">
                        <CardHeader>
                            <div className="flex items-center justify-between">
                                <div>
                                    <CardTitle>Saved Addresses</CardTitle>
                                    <CardDescription>Manage your delivery addresses</CardDescription>
                                </div>
                                <Button
                                    size="sm"
                                    className="bg-gradient-to-r from-primary to-primary/80"
                                    onClick={() => {
                                        resetAddressForm();
                                        setEditingAddress(null);
                                        setShowAddressDialog(true);
                                    }}
                                >
                                    <Plus className="h-4 w-4 mr-2" />
                                    Add Address
                                </Button>
                            </div>
                        </CardHeader>
                        <CardContent>
                            {addresses.length === 0 ? (
                                <div className="text-center py-12">
                                    <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-muted flex items-center justify-center">
                                        <MapPin className="h-8 w-8 text-muted-foreground" />
                                    </div>
                                    <p className="text-muted-foreground mb-4">No addresses saved yet</p>
                                    <Button
                                        variant="outline"
                                        onClick={() => {
                                            resetAddressForm();
                                            setShowAddressDialog(true);
                                        }}
                                    >
                                        <Plus className="h-4 w-4 mr-2" />
                                        Add Your First Address
                                    </Button>
                                </div>
                            ) : (
                                <div className="grid md:grid-cols-2 gap-4">
                                    {addresses.map((address) => (
                                        <div
                                            key={address.id}
                                            className={`p-4 rounded-lg border-2 ${address.isDefault ? "border-primary/50 bg-primary/5" : "border-muted"}`}
                                        >
                                            <div className="flex items-start justify-between mb-2">
                                                <div className="flex items-center gap-2">
                                                    {address.label === "Home" ? (
                                                        <Home className="h-4 w-4 text-primary" />
                                                    ) : (
                                                        <Building2 className="h-4 w-4 text-primary" />
                                                    )}
                                                    <h4 className="font-semibold">{address.label}</h4>
                                                </div>
                                                {address.isDefault && (
                                                    <Badge variant="secondary" className="text-xs">Default</Badge>
                                                )}
                                            </div>
                                            <p className="text-sm text-muted-foreground">
                                                {address.first_name} {address.last_name}<br />
                                                {address.address_1}<br />
                                                {address.address_2 && <>{address.address_2}<br /></>}
                                                {address.city}, {address.state} {address.postcode}<br />
                                                {address.country}
                                            </p>
                                            {address.phone && (
                                                <p className="text-sm text-muted-foreground mt-1">
                                                    Phone: {address.phone}
                                                </p>
                                            )}
                                            <div className="flex gap-2 mt-3">
                                                <Button
                                                    variant="outline"
                                                    size="sm"
                                                    onClick={() => openEditAddress(address)}
                                                >
                                                    Edit
                                                </Button>
                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    className="text-destructive hover:text-destructive"
                                                    onClick={() => handleDeleteAddress(address.id)}
                                                >
                                                    Delete
                                                </Button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </TabsContent>

                {/* Security Tab */}
                <TabsContent value="security">
                    <Card className="border-0 shadow-lg py-4">
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
                            {/* Change Password */}
                            <div className="p-5 rounded-lg border bg-card">
                                <div className="flex items-center justify-between mb-3">
                                    <div>
                                        <h4 className="font-semibold">Change Password</h4>
                                        <p className="text-sm text-muted-foreground">
                                            Keep your account secure with a strong password
                                        </p>
                                    </div>
                                    {!showPasswordForm && (
                                        <Button variant="outline" onClick={() => setShowPasswordForm(true)}>
                                            Update Password
                                        </Button>
                                    )}
                                </div>

                                {showPasswordForm && (
                                    <div className="mt-4 space-y-4 pt-4 border-t">
                                        <div className="space-y-2">
                                            <Label>New Password</Label>
                                            <div className="relative">
                                                <Input
                                                    type={showPassword ? "text" : "password"}
                                                    value={newPassword}
                                                    onChange={(e) => setNewPassword(e.target.value)}
                                                    placeholder="Enter new password (min 8 characters)"
                                                />
                                                <Button
                                                    type="button"
                                                    variant="ghost"
                                                    size="icon"
                                                    className="absolute right-0 top-0 h-full px-3"
                                                    onClick={() => setShowPassword(!showPassword)}
                                                >
                                                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                                </Button>
                                            </div>
                                        </div>
                                        <div className="space-y-2">
                                            <Label>Confirm Password</Label>
                                            <Input
                                                type={showPassword ? "text" : "password"}
                                                value={confirmPassword}
                                                onChange={(e) => setConfirmPassword(e.target.value)}
                                                placeholder="Confirm new password"
                                            />
                                        </div>
                                        <div className="flex gap-2">
                                            <Button onClick={handlePasswordChange} disabled={isLoading}>
                                                {isLoading ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : <Check className="h-4 w-4 mr-2" />}
                                                Save Password
                                            </Button>
                                            <Button variant="ghost" onClick={() => { setShowPasswordForm(false); setNewPassword(""); setConfirmPassword(""); }}>
                                                Cancel
                                            </Button>
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* 2FA */}
                            <div className="p-5 rounded-lg border bg-card">
                                <div className="flex items-center justify-between mb-2">
                                    <h4 className="font-semibold">Two-Factor Authentication</h4>
                                    <Badge variant="secondary">Coming Soon</Badge>
                                </div>
                                <p className="text-sm text-muted-foreground mb-4">
                                    Add an extra layer of security to your account
                                </p>
                                <Button variant="outline" disabled>Enable 2FA</Button>
                            </div>

                            <Separator />

                            {/* Danger Zone */}
                            <div className="p-5 rounded-lg border border-destructive/30 bg-destructive/5">
                                <h4 className="font-semibold text-destructive mb-2">Danger Zone</h4>
                                <p className="text-sm text-muted-foreground mb-4">
                                    Permanently delete your account. Contact support to proceed.
                                </p>
                                <Button variant="destructive" size="sm" disabled>Delete Account</Button>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>

            {/* Add/Edit Address Dialog */}
            <Dialog open={showAddressDialog} onOpenChange={setShowAddressDialog}>
                <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
                    <DialogHeader>
                        <DialogTitle>{editingAddress ? "Edit Address" : "Add New Address"}</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4 py-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label>Address Label</Label>
                                <Select
                                    value={addressForm.label}
                                    onValueChange={(v) => setAddressForm(f => ({ ...f, label: v }))}
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select type" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="Home">Home</SelectItem>
                                        <SelectItem value="Work">Work</SelectItem>
                                        <SelectItem value="Other">Other</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="space-y-2">
                                <Label>Type</Label>
                                <Select
                                    value={addressForm.type}
                                    onValueChange={(v) => setAddressForm(f => ({ ...f, type: v as "billing" | "shipping" }))}
                                >
                                    <SelectTrigger>
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="shipping">Shipping</SelectItem>
                                        <SelectItem value="billing">Billing</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label>First Name *</Label>
                                <Input
                                    value={addressForm.first_name}
                                    onChange={(e) => setAddressForm(f => ({ ...f, first_name: e.target.value }))}
                                />
                            </div>
                            <div className="space-y-2">
                                <Label>Last Name *</Label>
                                <Input
                                    value={addressForm.last_name}
                                    onChange={(e) => setAddressForm(f => ({ ...f, last_name: e.target.value }))}
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label>Address Line 1 *</Label>
                            <Input
                                value={addressForm.address_1}
                                onChange={(e) => setAddressForm(f => ({ ...f, address_1: e.target.value }))}
                                placeholder="House/Flat number, Street name"
                            />
                        </div>

                        <div className="space-y-2">
                            <Label>Address Line 2</Label>
                            <Input
                                value={addressForm.address_2}
                                onChange={(e) => setAddressForm(f => ({ ...f, address_2: e.target.value }))}
                                placeholder="Landmark, Area (optional)"
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label>City *</Label>
                                <Input
                                    value={addressForm.city}
                                    onChange={(e) => setAddressForm(f => ({ ...f, city: e.target.value }))}
                                />
                            </div>
                            <div className="space-y-2">
                                <Label>PIN Code *</Label>
                                <Input
                                    value={addressForm.postcode}
                                    onChange={(e) => setAddressForm(f => ({ ...f, postcode: e.target.value }))}
                                    maxLength={6}
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label>State *</Label>
                            <Select
                                value={addressForm.state}
                                onValueChange={(v) => setAddressForm(f => ({ ...f, state: v }))}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Select state" />
                                </SelectTrigger>
                                <SelectContent>
                                    {INDIAN_STATES.map(state => (
                                        <SelectItem key={state} value={state}>{state}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="space-y-2">
                            <Label>Phone Number</Label>
                            <Input
                                value={addressForm.phone}
                                onChange={(e) => setAddressForm(f => ({ ...f, phone: e.target.value }))}
                                placeholder="+91 XXXXXXXXXX"
                            />
                        </div>
                    </div>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setShowAddressDialog(false)}>
                            Cancel
                        </Button>
                        <Button onClick={handleAddressSave}>
                            {editingAddress ? "Update Address" : "Save Address"}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </AccountLayout>
    );
}
