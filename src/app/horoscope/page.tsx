"use client";

import { MainLayout } from "@/components/templates/main-layout";
import { ZodiacSign } from "@/components/molecules/zodiac-sign";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { HoroscopeSign } from "@/types";
import { zodiacSigns } from "@/lib/data/zodiac";
import { getDailyHoroscope } from "@/lib/api/horoscope";
import { useState } from "react";
import { Star, Sparkles } from "lucide-react";

export default function HoroscopePage() {
    const [selectedSign, setSelectedSign] = useState<HoroscopeSign | null>(null);
    const [horoscope, setHoroscope] = useState<string>("");
    const [isLoading, setIsLoading] = useState(false);

    const handleSignClick = async (sign: HoroscopeSign) => {
        setSelectedSign(sign);
        setIsLoading(true);

        try {
            const result = await getDailyHoroscope(sign.sign);
            setHoroscope(result.text);
        } catch {
            setHoroscope(
                "Unable to fetch horoscope at this time. Please try again later."
            );
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <MainLayout>
            {/* Page Header */}
            <section className="relative bg-gradient-to-br from-primary via-[#6b0707] to-[#3d0404] text-white py-16 overflow-hidden">
                {/* Static decorative elements instead of random stars */}
                <div className="absolute inset-0 opacity-20 bg-[radial-gradient(white_1px,transparent_1px)] bg-[size:50px_50px]" />
                <div className="absolute top-0 right-0 w-64 h-64 bg-accent/20 rounded-full blur-3xl" />
                <div className="absolute bottom-0 left-0 w-48 h-48 bg-secondary/20 rounded-full blur-3xl" />

                <div className="container mx-auto px-4 text-center relative z-10">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm mb-4">
                        <Star className="h-4 w-4 text-accent" />
                        <span className="text-sm">Free Daily Predictions</span>
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold font-serif mb-4">
                        Daily Horoscope
                    </h1>
                    <p className="text-white/80 text-lg max-w-xl mx-auto">
                        Select your zodiac sign to discover what the stars have in store for you today
                    </p>
                </div>
            </section>

            <section className="py-16 bg-gradient-to-b from-gray-50 to-white">
                <div className="container mx-auto px-4">
                    {/* Section Title */}
                    <div className="text-center mb-10">
                        <Badge className="mb-3 bg-primary/10 text-primary border-primary/30">
                            Choose Your Sign
                        </Badge>
                        <h2 className="text-2xl font-bold font-serif text-gray-800">
                            12 Zodiac Signs
                        </h2>
                    </div>

                    {/* Zodiac Signs Grid */}
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 mb-12">
                        {zodiacSigns.map((sign) => (
                            <ZodiacSign
                                key={sign.sign}
                                sign={sign}
                                isSelected={selectedSign?.sign === sign.sign}
                                onClick={handleSignClick}
                                size="md"
                            />
                        ))}
                    </div>

                    {/* Horoscope Reading */}
                    {selectedSign && (
                        <Card className="max-w-3xl mx-auto border-0 shadow-xl bg-white overflow-hidden">
                            <CardHeader className="text-center bg-gradient-to-br from-primary/5 to-secondary/5 pb-6">
                                <div className="w-24 h-24 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-lg">
                                    <span className="text-5xl text-white">{selectedSign.symbol}</span>
                                </div>
                                <CardTitle className="text-2xl font-serif">
                                    {selectedSign.name}
                                    <span className="text-primary ml-2">({selectedSign.hindi})</span>
                                </CardTitle>
                                <p className="text-muted-foreground">{selectedSign.dates}</p>
                                <Badge className="mt-2 bg-accent text-black border-0">
                                    Today&apos;s Reading
                                </Badge>
                            </CardHeader>
                            <CardContent className="p-8">
                                {isLoading ? (
                                    <div className="text-center py-8">
                                        <div className="relative w-16 h-16 mx-auto mb-4">
                                            <div className="absolute inset-0 rounded-full border-4 border-primary/20"></div>
                                            <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-primary animate-spin"></div>
                                            <Sparkles className="absolute inset-0 m-auto h-6 w-6 text-primary" />
                                        </div>
                                        <p className="text-muted-foreground">
                                            Reading the stars...
                                        </p>
                                    </div>
                                ) : (
                                    <div className="prose max-w-none">
                                        <p className="text-lg leading-relaxed text-gray-700">
                                            {horoscope}
                                        </p>
                                    </div>
                                )}
                            </CardContent>
                        </Card>
                    )}

                    {/* Instructions */}
                    {!selectedSign && (
                        <div className="text-center py-12">
                            <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-primary/10 to-secondary/10 flex items-center justify-center">
                                <Star className="h-10 w-10 text-primary" />
                            </div>
                            <p className="text-muted-foreground text-lg">
                                Click on your zodiac sign above to see your daily horoscope
                            </p>
                        </div>
                    )}
                </div>
            </section>
        </MainLayout>
    );
}
