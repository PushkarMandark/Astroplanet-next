"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
    className?: string;
}

export function Pagination({
    currentPage,
    totalPages,
    onPageChange,
    className,
}: PaginationProps) {
    // Generate page numbers to show
    const getPageNumbers = () => {
        const pages: (number | "ellipsis")[] = [];
        const showEllipsisStart = currentPage > 3;
        const showEllipsisEnd = currentPage < totalPages - 2;

        // Always show first page
        pages.push(1);

        if (showEllipsisStart) {
            pages.push("ellipsis");
        }

        // Pages around current
        for (let i = Math.max(2, currentPage - 1); i <= Math.min(totalPages - 1, currentPage + 1); i++) {
            if (!pages.includes(i)) {
                pages.push(i);
            }
        }

        if (showEllipsisEnd) {
            pages.push("ellipsis");
        }

        // Always show last page if more than 1 page
        if (totalPages > 1 && !pages.includes(totalPages)) {
            pages.push(totalPages);
        }

        return pages;
    };

    if (totalPages <= 1) {
        return null;
    }

    return (
        <nav
            className={cn("flex items-center justify-center gap-1", className)}
            aria-label="Pagination"
        >
            {/* Previous Button */}
            <Button
                variant="outline"
                size="icon"
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage <= 1}
                className="h-10 w-10"
            >
                <ChevronLeft className="h-4 w-4" />
                <span className="sr-only">Previous page</span>
            </Button>

            {/* Page Numbers */}
            <div className="flex items-center gap-1">
                {getPageNumbers().map((pageNum, idx) =>
                    pageNum === "ellipsis" ? (
                        <span
                            key={`ellipsis-${idx}`}
                            className="flex items-center justify-center h-10 w-10 text-muted-foreground"
                        >
                            <MoreHorizontal className="h-4 w-4" />
                        </span>
                    ) : (
                        <Button
                            key={pageNum}
                            variant={pageNum === currentPage ? "default" : "outline"}
                            size="icon"
                            onClick={() => onPageChange(pageNum)}
                            className={cn(
                                "h-10 w-10",
                                pageNum === currentPage && "bg-primary text-primary-foreground"
                            )}
                        >
                            {pageNum}
                        </Button>
                    )
                )}
            </div>

            {/* Next Button */}
            <Button
                variant="outline"
                size="icon"
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage >= totalPages}
                className="h-10 w-10"
            >
                <ChevronRight className="h-4 w-4" />
                <span className="sr-only">Next page</span>
            </Button>
        </nav>
    );
}
