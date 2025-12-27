"use client";

import { useState } from "react";
import { Search, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface SearchBoxProps {
    placeholder?: string;
    onSearch: (query: string) => void;
    className?: string;
}

export function SearchBox({
    placeholder = "Search...",
    onSearch,
    className,
}: SearchBoxProps) {
    const [query, setQuery] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Basic sanitization: remove potential XSS chars and trim
        const sanitizedQuery = query
            .trim()
            .replace(/[<>{}()]/g, "")
            .slice(0, 100);

        if (sanitizedQuery) {
            onSearch(sanitizedQuery);
        }
    };

    const handleClear = () => {
        setQuery("");
        onSearch("");
    };

    return (
        <form onSubmit={handleSubmit} className={cn("relative flex", className)}>
            <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder={placeholder}
                    className="pl-10 pr-10"
                />
                {query && (
                    <button
                        type="button"
                        onClick={handleClear}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    >
                        <X className="h-4 w-4" />
                    </button>
                )}
            </div>
            <Button type="submit" className="ml-2">
                Search
            </Button>
        </form>
    );
}
