"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { MainLayout } from "@/components/templates/main-layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Hash, Sparkles, Heart, User, Calendar, Star } from "lucide-react";

const numerologySchema = z.object({
    name: z.string().min(2, "Name is required"),
    birthDate: z.string().min(1, "Birth date is required"),
});

type NumerologyFormData = z.infer<typeof numerologySchema>;

interface NumerologyResult {
    lifePath: number;
    destiny: number;
    soulUrge: number;
    personality: number;
    birthday: number;
    personalYear: number;
}

// Calculate numerology numbers
function reduceToSingle(num: number): number {
    while (num > 9 && num !== 11 && num !== 22 && num !== 33) {
        num = num.toString().split("").reduce((a, b) => a + parseInt(b), 0);
    }
    return num;
}

function calculateLifePath(dateStr: string): number {
    const date = new Date(dateStr);
    const sum = date.getFullYear() + (date.getMonth() + 1) + date.getDate();
    return reduceToSingle(sum);
}

function nameToNumber(name: string): number {
    const values: Record<string, number> = {
        a: 1, b: 2, c: 3, d: 4, e: 5, f: 6, g: 7, h: 8, i: 9,
        j: 1, k: 2, l: 3, m: 4, n: 5, o: 6, p: 7, q: 8, r: 9,
        s: 1, t: 2, u: 3, v: 4, w: 5, x: 6, y: 7, z: 8,
    };
    const sum = name.toLowerCase().split("").reduce((acc, char) => acc + (values[char] || 0), 0);
    return reduceToSingle(sum);
}

function getVowelNumber(name: string): number {
    const vowels = "aeiou";
    const values: Record<string, number> = { a: 1, e: 5, i: 9, o: 6, u: 3 };
    const sum = name.toLowerCase().split("").filter(c => vowels.includes(c)).reduce((acc, char) => acc + values[char], 0);
    return reduceToSingle(sum);
}

function getConsonantNumber(name: string): number {
    const vowels = "aeiou";
    const values: Record<string, number> = {
        b: 2, c: 3, d: 4, f: 6, g: 7, h: 8, j: 1, k: 2, l: 3, m: 4, n: 5,
        p: 7, q: 8, r: 9, s: 1, t: 2, v: 4, w: 5, x: 6, y: 7, z: 8,
    };
    const sum = name.toLowerCase().split("").filter(c => !vowels.includes(c) && values[c]).reduce((acc, char) => acc + (values[char] || 0), 0);
    return reduceToSingle(sum);
}

const meanings: Record<number, { title: string; description: string }> = {
    1: { title: "The Leader", description: "Independent, ambitious, and pioneering. You're a natural leader who likes to forge your own path." },
    2: { title: "The Peacemaker", description: "Diplomatic, intuitive, and cooperative. You excel at bringing people together and finding harmony." },
    3: { title: "The Creative", description: "Expressive, artistic, and social. You have a gift for communication and creative self-expression." },
    4: { title: "The Builder", description: "Practical, hardworking, and reliable. You build solid foundations and value stability." },
    5: { title: "The Freedom Seeker", description: "Adventurous, versatile, and dynamic. You crave freedom and embrace change." },
    6: { title: "The Nurturer", description: "Caring, responsible, and family-oriented. You have a deep desire to help and protect others." },
    7: { title: "The Seeker", description: "Analytical, introspective, and spiritual. You seek deeper truths and inner wisdom." },
    8: { title: "The Achiever", description: "Ambitious, authoritative, and business-minded. You're driven to succeed and accumulate wealth." },
    9: { title: "The Humanitarian", description: "Compassionate, generous, and idealistic. You have a broad vision and desire to serve humanity." },
    11: { title: "The Intuitive", description: "Highly intuitive and spiritually aware. You're a visionary with the potential to inspire others." },
    22: { title: "The Master Builder", description: "Powerful and capable of turning dreams into reality. You can achieve great things on a large scale." },
    33: { title: "The Master Teacher", description: "Deeply compassionate and wise. You have the ability to guide and uplift humanity." },
};

export default function NumerologyPage() {
    const [result, setResult] = useState<NumerologyResult | null>(null);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<NumerologyFormData>({
        resolver: zodResolver(numerologySchema),
    });

    const onSubmit = (data: NumerologyFormData) => {
        const currentYear = new Date().getFullYear();
        const birthDate = new Date(data.birthDate);
        const personalYearSum = (birthDate.getMonth() + 1) + birthDate.getDate() + currentYear;

        setResult({
            lifePath: calculateLifePath(data.birthDate),
            destiny: nameToNumber(data.name),
            soulUrge: getVowelNumber(data.name),
            personality: getConsonantNumber(data.name),
            birthday: reduceToSingle(birthDate.getDate()),
            personalYear: reduceToSingle(personalYearSum),
        });
    };

    const numberCards = result ? [
        { label: "Life Path Number", value: result.lifePath, icon: Star, description: "Your life's purpose and the path you're meant to walk." },
        { label: "Destiny Number", value: result.destiny, icon: Sparkles, description: "What you're destined to become and achieve." },
        { label: "Soul Urge Number", value: result.soulUrge, icon: Heart, description: "Your inner desires and what truly motivates you." },
        { label: "Personality Number", value: result.personality, icon: User, description: "How others perceive you and your outer personality." },
        { label: "Birthday Number", value: result.birthday, icon: Calendar, description: "Your natural talents and abilities." },
        { label: "Personal Year", value: result.personalYear, icon: Hash, description: "The theme and energy of your current year." },
    ] : [];

    return (
        <MainLayout>
            {/* Page Header */}
            <section className="bg-gradient-to-br from-accent/80 via-accent to-secondary/30 text-accent-foreground py-12">
                <div className="container mx-auto px-4 text-center">
                    <h1 className="text-3xl md:text-4xl font-bold font-heading mb-2">
                        Numerology Calculator
                    </h1>
                    <p className="text-accent-foreground/80">
                        Discover your life path and destiny through the power of numbers
                    </p>
                </div>
            </section>

            <section className="py-12">
                <div className="container mx-auto px-4">
                    {/* Input Form */}
                    <Card className="max-w-md mx-auto mb-8">
                        <CardHeader>
                            <CardTitle className="text-center">Enter Your Details</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="name">Full Name</Label>
                                    <Input
                                        id="name"
                                        {...register("name")}
                                        placeholder="Enter your full name"
                                    />
                                    {errors.name && (
                                        <p className="text-sm text-destructive">{errors.name.message}</p>
                                    )}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="birthDate">Birth Date</Label>
                                    <Input
                                        id="birthDate"
                                        type="date"
                                        {...register("birthDate")}
                                    />
                                    {errors.birthDate && (
                                        <p className="text-sm text-destructive">{errors.birthDate.message}</p>
                                    )}
                                </div>

                                <Button type="submit" className="w-full">
                                    <Hash className="h-4 w-4 mr-2" />
                                    Calculate Numbers
                                </Button>
                            </form>
                        </CardContent>
                    </Card>

                    {/* Results */}
                    {result && (
                        <div className="max-w-4xl mx-auto space-y-8">
                            {/* Main Life Path Card */}
                            <Card className="bg-gradient-to-br from-primary/10 to-secondary/10">
                                <CardContent className="text-center">
                                    <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-primary text-primary-foreground flex items-center justify-center">
                                        <span className="text-4xl font-bold">{result.lifePath}</span>
                                    </div>
                                    <h2 className="text-2xl font-bold font-heading mb-2">
                                        {meanings[result.lifePath]?.title || `Number ${result.lifePath}`}
                                    </h2>
                                    <p className="text-muted-foreground max-w-xl mx-auto">
                                        {meanings[result.lifePath]?.description}
                                    </p>
                                </CardContent>
                            </Card>

                            {/* All Numbers Grid */}
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                {numberCards.map((card) => (
                                    <Card key={card.label}>
                                        <CardContent>
                                            <div className="flex items-start gap-4">
                                                <div className="w-12 h-12 rounded-full bg-accent/20 flex items-center justify-center flex-shrink-0">
                                                    <span className="text-xl font-bold text-accent">{card.value}</span>
                                                </div>
                                                <div>
                                                    <p className="font-semibold">{card.label}</p>
                                                    <p className="text-sm text-muted-foreground">{card.description}</p>
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </section>
        </MainLayout>
    );
}
