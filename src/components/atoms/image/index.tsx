import Image from "next/image";
import { cn } from "@/lib/utils";

interface OptimizedImageProps {
    src: string;
    alt: string;
    width?: number;
    height?: number;
    fill?: boolean;
    priority?: boolean;
    className?: string;
    objectFit?: "contain" | "cover" | "fill";
}

export function OptimizedImage({
    src,
    alt,
    width,
    height,
    fill = false,
    priority = false,
    className,
    objectFit = "cover",
}: OptimizedImageProps) {
    // Handle external URLs
    const isExternal = src.startsWith("http");

    if (fill) {
        return (
            <Image
                src={src || "/images/placeholder.jpg"}
                alt={alt}
                fill
                priority={priority}
                className={cn(`object-${objectFit}`, className)}
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                unoptimized={isExternal}
            />
        );
    }

    return (
        <Image
            src={src || "/images/placeholder.jpg"}
            alt={alt}
            width={width || 400}
            height={height || 400}
            priority={priority}
            className={cn(`object-${objectFit}`, className)}
            unoptimized={isExternal}
        />
    );
}
