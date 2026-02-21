import React, { useState, useRef, useEffect } from "react";
import { ChevronRight, ChevronLeft, Heart, Share2, ZoomIn, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
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
    const [selectedImageIndex, setSelectedImageIndex] = useState(0);
    const [isHovering, setIsHovering] = useState(false);
    const [zoomPosition, setZoomPosition] = useState({ x: 0, y: 0 });
    const imageContainerRef = useRef<HTMLDivElement>(null);

    const hasMultipleImages = images.length > 1;
    const mainImage = images[selectedImageIndex]?.src || "/images/placeholder.svg";

    const handleNextImage = () => {
        setSelectedImageIndex((prev) => (prev + 1) % images.length);
    };

    const handlePrevImage = () => {
        setSelectedImageIndex((prev) => (prev - 1 + images.length) % images.length);
    };

    const handleImageHover = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!imageContainerRef.current) return;
        const { left, top, width, height } = imageContainerRef.current.getBoundingClientRect();
        const x = ((e.clientX - left) / width) * 100;
        const y = ((e.clientY - top) / height) * 100;
        setZoomPosition({ x, y });
    };

    // Auto-slide effect
    useEffect(() => {
        if (!hasMultipleImages) return;
        const interval = setInterval(() => {
            if (!isHovering) {
                setSelectedImageIndex((prev) => (prev + 1) % images.length);
            }
        }, 4000);
        return () => clearInterval(interval);
    }, [hasMultipleImages, images.length, isHovering]);

    return (
        <div className="space-y-4">
            <div
                ref={imageContainerRef}
                className="relative aspect-square rounded-3xl overflow-hidden bg-gray-50 border-2 border-gray-100 shadow-xl cursor-crosshair group"
                onMouseEnter={() => setIsHovering(true)}
                onMouseLeave={() => setIsHovering(false)}
                onMouseMove={handleImageHover}
            >
                <OptimizedImage
                    src={mainImage}
                    alt={productName}
                    fill
                    className="object-contain p-8 transition-transform duration-500 group-hover:scale-105"
                    priority
                />

                {/* Magnifier Lens */}
                {isHovering && (
                    <div
                        className="pointer-events-none absolute w-32 h-32 rounded-full border-4 border-white shadow-2xl overflow-hidden z-30"
                        style={{
                            left: `${zoomPosition.x}%`,
                            top: `${zoomPosition.y}%`,
                            transform: 'translate(-50%, -50%)',
                            backgroundImage: `url(${mainImage})`,
                            backgroundSize: '600%',
                            backgroundPosition: `${zoomPosition.x}% ${zoomPosition.y}%`,
                            backgroundRepeat: 'no-repeat'
                        }}
                    />
                )}

                {/* Quick Actions */}
                <div className="absolute top-4 right-4 flex flex-col gap-2 z-50">
                    <Button
                        variant="secondary"
                        size="icon"
                        className="rounded-full bg-white/90 backdrop-blur-sm shadow-xl hover:bg-red-50 hover:text-red-500 border border-gray-100 transition-all active:scale-95"
                    >
                        <Heart className="h-5 w-5 text-gray-700 hover:text-red-500 fill-transparent hover:fill-red-500" />
                    </Button>
                    <Button
                        variant="secondary"
                        size="icon"
                        className="rounded-full bg-white/90 backdrop-blur-sm shadow-xl hover:bg-blue-50 hover:text-blue-500 border border-gray-100 transition-all active:scale-95"
                    >
                        <Share2 className="h-5 w-5 text-gray-700 hover:text-blue-500" />
                    </Button>
                </div>

                {/* Zoom Hint */}
                <div className="absolute bottom-4 left-4 bg-black/60 backdrop-blur-md text-white px-3 py-1.5 rounded-full text-[10px] uppercase tracking-wider font-bold flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity z-20">
                    <Search className="h-3 w-3" />
                    Move to zoom
                </div>

                {/* Navigation Arrows */}
                {hasMultipleImages && (
                    <>
                        <Button
                            variant="secondary"
                            size="icon"
                            onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                handlePrevImage();
                            }}
                            className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-white/90 hover:bg-white shadow-xl opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-all z-50 w-10 h-10"
                        >
                            <ChevronLeft className="h-6 w-6 text-gray-800" />
                        </Button>
                        <Button
                            variant="secondary"
                            size="icon"
                            onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                handleNextImage();
                            }}
                            className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-white/90 hover:bg-white shadow-xl opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-all z-50 w-10 h-10"
                        >
                            <ChevronRight className="h-6 w-6 text-gray-800" />
                        </Button>
                    </>
                )}

                {/* Image Counter */}
                {hasMultipleImages && (
                    <div className="absolute bottom-6 right-6 bg-primary/90 backdrop-blur-md px-3 py-1.5 rounded-full text-xs font-bold shadow-lg text-white z-20">
                        {selectedImageIndex + 1} / {images.length}
                    </div>
                )}
            </div>

            {/* Thumbnails */}
            {hasMultipleImages && (
                <div className="grid grid-cols-5 gap-3">
                    {images.map((image, index) => (
                        <button
                            key={`${image.id}-${index}`}
                            onClick={() => setSelectedImageIndex(index)}
                            onMouseEnter={() => setSelectedImageIndex(index)}
                            className={cn(
                                "relative aspect-square rounded-xl overflow-hidden border-2 transition-all hover:scale-105",
                                selectedImageIndex === index
                                    ? "border-primary shadow-lg ring-2 ring-primary/20"
                                    : "border-gray-200 hover:border-gray-300"
                            )}
                        >
                            <OptimizedImage
                                src={image.src}
                                alt={`${productName} thumbnail ${index + 1}`}
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
