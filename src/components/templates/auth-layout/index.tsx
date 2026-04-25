import Link from "next/link";
import { siteConfig } from "@/config/site";

interface AuthLayoutProps {
    children: React.ReactNode;
    title: string;
    description?: string;
}

export function AuthLayout({ children, title, description }: AuthLayoutProps) {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-cream to-cream-light p-4">
            {/* Logo */}
            <Link href="/" className="mb-8">
                <img
                    src="/images/logo.webp"
                    alt={siteConfig.name}
                    className="h-14 w-auto"
                />
            </Link>

            {/* Auth Card */}
            <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-8">
                <div className="text-center mb-6">
                    <h1 className="text-2xl font-bold font-serif">{title}</h1>
                    {description && (
                        <p className="text-muted-foreground mt-2">{description}</p>
                    )}
                </div>
                {children}
            </div>

            {/* Footer */}
            <p className="mt-8 text-sm text-muted-foreground">
                © {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
            </p>
        </div>
    );
}
