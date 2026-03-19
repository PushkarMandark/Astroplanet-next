import React, { useState, useRef, useEffect, useCallback } from "react";
import { ChevronRight, ChevronLeft, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { OptimizedImage } from "@/components/atoms/image";
import { cn } from "@/lib/utils";

interface Image {
    id: number;
    src: string;
    alt?: string;
}

interface ProductImageGalleryProps {
    images: Image[];
    productName: string;
}

export function ProductImageGallery({ images, productName }: ProductImageGalleryProps) {
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [showZoom, setShowZoom] = useState(false);
    const [zoomPos, setZoomPos] = useState({ x: 50, y: 50 });
    const imageRef = useRef<HTMLDivElement>(null);
    const autoPlayRef = useRef<ReturnType<typeof setInterval> | null>(null);
    const [isPaused, setIsPaused] = useState(false);

    const hasMultiple = images.length > 1;
    const currentImage = images[selectedIndex]?.src || "/images/placeholder.svg";

    const goNext = useCallback(() => {
        setSelectedIndex((prev) => (prev + 1) % images.length);
    }, [images.length]);

    const goPrev = useCallback(() => {
        setSelectedIndex((prev) => (prev - 1 + images.length) % images.length);
    }, [images.length]);

    // Auto-slide every 5 seconds, pause on hover
    useEffect(() => {
        if (!hasMultiple) return;
        if (isPaused) {
            if (autoPlayRef.current) clearInterval(autoPlayRef.current);
            return;
        }
        autoPlayRef.current = setInterval(goNext, 5000);
        return () => {
            if (autoPlayRef.current) clearInterval(autoPlayRef.current);
        };
    }, [hasMultiple, isPaused, goNext]);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!imageRef.current) return;
        const rect = imageRef.current.getBoundingClientRect();
        const x = Math.max(0, Math.min(100, ((e.clientX - rect.left) / rect.width) * 100));
        const y = Math.max(0, Math.min(100, ((e.clientY - rect.top) / rect.height) * 100));
        setZoomPos({ x, y });
    };

    return (
        <div className="space-y-3">
            {/* Main Image Container */}
            <div
                className="relative aspect-square rounded-2xl overflow-hidden bg-gray-50 border border-gray-200 group"
                onMouseEnter={() => {
                    setIsPaused(true);
                    setShowZoom(true);
                }}
                onMouseLeave={() => {
                    setIsPaused(false);
                    setShowZoom(false);
                }}
            >
                {/* Main Image — this div tracks mouse for zoom */}
                <div
                    ref={imageRef}
                    className="relative w-full h-full cursor-crosshair"
                    onMouseMove={handleMouseMove}
                >
                    <OptimizedImage
                        src={currentImage}
                        alt={productName}
                        fill
                        className="object-contain p-6"
                        priority
                    />

                    {/* Zoomed view overlaid on the image on desktop */}
                    {showZoom && (
                        <div
                            className="hidden lg:block absolute inset-0 z-10 pointer-events-none"
                            style={{
                                backgroundImage: `url(${currentImage})`,
                                backgroundSize: "250%",
                                backgroundPosition: `${zoomPos.x}% ${zoomPos.y}%`,
                                backgroundRepeat: "no-repeat",
                            }}
                        />
                    )}
                </div>

                {/* Navigation Arrows — z-20 so they sit above zoom overlay */}
                {hasMultiple && (
                    <>
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={(e) => { e.stopPropagation(); goPrev(); }}
                            className="absolute left-3 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full bg-white/90 hover:bg-white shadow-md z-20 opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                            <ChevronLeft className="h-5 w-5 text-gray-700" />
                        </Button>
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={(e) => { e.stopPropagation(); goNext(); }}
                            className="absolute right-3 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full bg-white/90 hover:bg-white shadow-md z-20 opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                            <ChevronRight className="h-5 w-5 text-gray-700" />
                        </Button>
                    </>
                )}

                {/* Dot Indicators */}
                {hasMultiple && (
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-1.5 z-20">
                        {images.map((_, i) => (
                            <button
                                key={i}
                                onClick={() => setSelectedIndex(i)}
                                className={cn(
                                    "rounded-full transition-all",
                                    selectedIndex === i
                                        ? "w-6 h-2 bg-primary"
                                        : "w-2 h-2 bg-gray-300 hover:bg-gray-400"
                                )}
                            />
                        ))}
                    </div>
                )}

                {/* Zoom Hint */}
                <div className="hidden lg:flex absolute bottom-4 left-4 bg-black/50 backdrop-blur-sm text-white px-2.5 py-1 rounded-full text-[10px] uppercase tracking-wider font-medium items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity z-20">
                    <Search className="h-3 w-3" />
                    Hover to zoom
                </div>
            </div>

            {/* Thumbnails */}
            {hasMultiple && (
                <div className="flex gap-2 overflow-x-auto pb-1">
                    {images.map((image, index) => (
                        <button
                            key={`${image.id}-${index}`}
                            onClick={() => setSelectedIndex(index)}
                            className={cn(
                                "relative w-16 h-16 shrink-0 rounded-lg overflow-hidden border-2 transition-all",
                                selectedIndex === index
                                    ? "border-primary ring-1 ring-primary/20"
                                    : "border-gray-200 hover:border-gray-300"
                            )}
                        >
                            <OptimizedImage
                                src={image.src}
                                alt={`${productName} ${index + 1}`}
                                fill
                                className="object-cover"
                            />
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}
