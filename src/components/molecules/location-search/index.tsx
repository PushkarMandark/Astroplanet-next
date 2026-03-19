"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { MapPin, Search, Loader2 } from "lucide-react";

interface LocationResult {
    display_name: string;
    lat: string;
    lon: string;
}

interface LocationSearchProps {
    defaultValue?: string;
    onSelect: (location: { name: string; lat: number; lon: number }) => void;
    placeholder?: string;
}

export function LocationSearch({
    defaultValue = "Gurugram",
    onSelect,
    placeholder = "Search city... e.g. Mumbai, Delhi, Jaipur",
}: LocationSearchProps) {
    const [query, setQuery] = useState(defaultValue);
    const [results, setResults] = useState<LocationResult[]>([]);
    const [isSearching, setIsSearching] = useState(false);
    const [showDropdown, setShowDropdown] = useState(false);
    const searchTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    // Close dropdown on outside click
    useEffect(() => {
        const handleClick = (e: MouseEvent) => {
            if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
                setShowDropdown(false);
            }
        };
        document.addEventListener("mousedown", handleClick);
        return () => document.removeEventListener("mousedown", handleClick);
    }, []);

    const searchLocation = useCallback((q: string) => {
        if (searchTimeout.current) clearTimeout(searchTimeout.current);
        if (q.length < 2) {
            setResults([]);
            setShowDropdown(false);
            return;
        }
        setIsSearching(true);
        searchTimeout.current = setTimeout(async () => {
            try {
                const res = await fetch(
                    `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(q)}&format=json&limit=5&countrycodes=in`,
                    { headers: { "Accept-Language": "en" } }
                );
                const data: LocationResult[] = await res.json();
                setResults(data);
                setShowDropdown(data.length > 0);
            } catch {
                setResults([]);
            } finally {
                setIsSearching(false);
            }
        }, 400);
    }, []);

    const handleSelect = (loc: LocationResult) => {
        const shortName = loc.display_name.split(",").slice(0, 2).join(",").trim();
        setQuery(shortName);
        setShowDropdown(false);
        setResults([]);
        onSelect({
            name: shortName,
            lat: parseFloat(loc.lat),
            lon: parseFloat(loc.lon),
        });
    };

    return (
        <div className="relative" ref={containerRef}>
            <div className="relative">
                <Input
                    type="text"
                    value={query}
                    onChange={(e) => {
                        setQuery(e.target.value);
                        searchLocation(e.target.value);
                    }}
                    onFocus={() => {
                        if (results.length > 0) setShowDropdown(true);
                    }}
                    placeholder={placeholder}
                    className="rounded-xl pr-9"
                />
                <div className="absolute right-3 top-1/2 -translate-y-1/2">
                    {isSearching ? (
                        <Loader2 className="h-4 w-4 text-gray-400 animate-spin" />
                    ) : (
                        <Search className="h-4 w-4 text-gray-400" />
                    )}
                </div>
            </div>

            {showDropdown && results.length > 0 && (
                <div className="absolute z-50 w-full mt-1 bg-white rounded-xl border border-gray-200 shadow-xl overflow-hidden">
                    {results.map((loc, i) => (
                        <button
                            key={i}
                            type="button"
                            onClick={() => handleSelect(loc)}
                            className="w-full text-left px-4 py-2.5 hover:bg-primary/5 transition-colors flex items-start gap-2 border-b border-gray-50 last:border-0"
                        >
                            <MapPin className="h-3.5 w-3.5 text-primary mt-0.5 shrink-0" />
                            <span className="text-sm text-gray-700 line-clamp-1">
                                {loc.display_name}
                            </span>
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}
