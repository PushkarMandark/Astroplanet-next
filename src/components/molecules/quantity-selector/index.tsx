"use client";

import { Minus, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

interface QuantitySelectorProps {
    value: number;
    onChange: (value: number) => void;
    min?: number;
    max?: number;
    className?: string;
}

export function QuantitySelector({
    value,
    onChange,
    min = 1,
    max = 99,
    className,
}: QuantitySelectorProps) {
    const handleDecrease = () => {
        if (value > min) {
            onChange(value - 1);
        }
    };

    const handleIncrease = () => {
        if (value < max) {
            onChange(value + 1);
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = parseInt(e.target.value, 10);
        if (!isNaN(newValue) && newValue >= min && newValue <= max) {
            onChange(newValue);
        }
    };

    return (
        <div className={cn("flex items-center gap-1", className)}>
            <Button
                variant="outline"
                size="icon"
                className="h-8 w-8"
                onClick={handleDecrease}
                disabled={value <= min}
            >
                <Minus className="h-4 w-4" />
            </Button>
            <Input
                type="number"
                value={value}
                onChange={handleInputChange}
                className="w-14 h-8 text-center px-1"
                min={min}
                max={max}
            />
            <Button
                variant="outline"
                size="icon"
                className="h-8 w-8"
                onClick={handleIncrease}
                disabled={value >= max}
            >
                <Plus className="h-4 w-4" />
            </Button>
        </div>
    );
}
