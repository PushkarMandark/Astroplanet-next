"use client";

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
    const getPageNumbers = (): (number | "ellipsis")[] => {
        const pageSet = new Set<number>();

        // Always show first and last page
        pageSet.add(1);
        if (totalPages > 1) pageSet.add(totalPages);

        // Pages around current
        for (let i = Math.max(2, currentPage - 1); i <= Math.min(totalPages - 1, currentPage + 1); i++) {
            pageSet.add(i);
        }

        // Build sorted array and insert ellipsis where there are gaps
        const sorted = Array.from(pageSet).sort((a, b) => a - b);
        const pages: (number | "ellipsis")[] = [sorted[0]];
        for (let i = 1; i < sorted.length; i++) {
            if (sorted[i] - sorted[i - 1] > 1) {
                pages.push("ellipsis");
            }
            pages.push(sorted[i]);
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
                            aria-label="More pages"
                            className="flex items-center justify-center h-10 w-10 text-muted-foreground"
                        >
                            <MoreHorizontal className="h-4 w-4" aria-hidden="true" />
                        </span>
                    ) : (
                        <Button
                            key={pageNum}
                            variant={pageNum === currentPage ? "default" : "outline"}
                            size="icon"
                            onClick={() => onPageChange(pageNum)}
                            aria-label={`Page ${pageNum}`}
                            aria-current={pageNum === currentPage ? "page" : undefined}
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
