"use client";

import Image from "next/image";
import { useCallback, useState } from "react";
import { cn } from "@/lib/utils";

const PLACEHOLDER = "/images/placeholder.svg";

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
    const [failed, setFailed] = useState(false);
    const imgSrc = failed ? PLACEHOLDER : (src || PLACEHOLDER);
    const handleError = useCallback(() => setFailed(true), []);

    const isExternal = imgSrc.startsWith("http");

    if (fill) {
        return (
            <Image
                src={imgSrc}
                alt={alt}
                fill
                priority={priority}
                className={cn(`object-${objectFit}`, className)}
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                unoptimized={isExternal}
                onError={handleError}
            />
        );
    }

    return (
        <Image
            src={imgSrc}
            alt={alt}
            width={width || 400}
            height={height || 400}
            priority={priority}
            className={cn(`object-${objectFit}`, className)}
            unoptimized={isExternal}
            onError={handleError}
        />
    );
}
