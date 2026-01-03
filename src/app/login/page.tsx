"use client";

import { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { AuthLayout } from "@/components/templates/auth-layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuthStore } from "@/stores";
import { login } from "@/lib/api/auth";
import { toast } from "sonner";
import { useRouter, useSearchParams } from "next/navigation";
import { Loader2 } from "lucide-react";

const loginSchema = z.object({
    username: z.string().min(1, "Username is required"),
    password: z.string().min(1, "Password is required"),
});

type LoginFormData = z.infer<typeof loginSchema>;

function LoginForm() {
    const [isLoading, setIsLoading] = useState(false);
    const [mounted, setMounted] = useState(false);
    const router = useRouter();
    const searchParams = useSearchParams();
    const authLogin = useAuthStore((state) => state.login);
    const isAuthenticated = useAuthStore((state) => state.isAuthenticated());

    const redirectTo = searchParams.get("redirect") || "/dashboard";

    useEffect(() => {
        setMounted(true);
    }, []);

    // If already authenticated, redirect
    useEffect(() => {
        if (mounted && isAuthenticated) {
            router.push(redirectTo);
        }
    }, [mounted, isAuthenticated, router, redirectTo]);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginFormData>({
        resolver: zodResolver(loginSchema),
    });

    const onSubmit = async (data: LoginFormData) => {
        setIsLoading(true);

        try {
            const result = await login(data);

            if (result.success && result.token && result.user) {
                authLogin(result.user, result.token);
                toast.success("Login successful!");
                router.push(redirectTo);
            } else {
                toast.error(result.message || "Invalid credentials");
            }
        } catch (error) {
            toast.error("An error occurred. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    // Show loading while checking auth
    if (!mounted) {
        return (
            <div className="flex items-center justify-center py-8">
                <Loader2 className="h-6 w-6 animate-spin text-primary" />
            </div>
        );
    }

    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div className="space-y-2">
                    <Label htmlFor="username">Username or Email</Label>
                    <Input
                        id="username"
                        type="text"
                        placeholder="Enter your username"
                        {...register("username")}
                        disabled={isLoading}
                    />
                    {errors.username && (
                        <p className="text-sm text-destructive">{errors.username.message}</p>
                    )}
                </div>

                <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <Input
                        id="password"
                        type="password"
                        placeholder="Enter your password"
                        {...register("password")}
                        disabled={isLoading}
                    />
                    {errors.password && (
                        <p className="text-sm text-destructive">{errors.password.message}</p>
                    )}
                </div>

                <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading ? (
                        <>
                            <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                            Signing in...
                        </>
                    ) : (
                        "Sign In"
                    )}
                </Button>
            </form>

            <div className="mt-6 text-center text-sm">
                <p className="text-muted-foreground">
                    Don&apos;t have an account?{" "}
                    <Link href="/register" className="text-primary hover:underline">
                        Sign up
                    </Link>
                </p>
            </div>
        </>
    );
}

export default function LoginPage() {
    return (
        <AuthLayout
            title="Welcome Back"
            description="Sign in to your account to continue"
        >
            <Suspense fallback={
                <div className="flex items-center justify-center py-8">
                    <Loader2 className="h-6 w-6 animate-spin text-primary" />
                </div>
            }>
                <LoginForm />
            </Suspense>
        </AuthLayout>
    );
}
