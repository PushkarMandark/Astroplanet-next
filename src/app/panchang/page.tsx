"use client";

import { useState } from "react";
import { MainLayout } from "@/components/templates/main-layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calendar, Sun, Moon, Star, Clock } from "lucide-react";

// Panchang data structure
interface PanchangData {
    date: string;
    tithi: { name: string; endTime: string };
    nakshatra: { name: string; endTime: string };
    yoga: { name: string; endTime: string };
    karana: { name: string; endTime: string };
    vaar: string;
    sunrise: string;
    sunset: string;
    moonrise: string;
    rahuKaal: string;
    moonPhase: string;
}

export default function PanchangPage() {
    const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split("T")[0]);

    // Static panchang data (in real app, this would come from API/service)
    const panchang: PanchangData = {
        date: selectedDate,
        tithi: { name: "Shukla Ekadashi", endTime: "14:23" },
        nakshatra: { name: "Rohini", endTime: "19:45" },
        yoga: { name: "Siddhi", endTime: "11:30" },
        karana: { name: "Baalava", endTime: "14:23" },
        vaar: "Shanivar (Saturday)",
        sunrise: "06:48",
        sunset: "17:32",
        moonrise: "15:20",
        rahuKaal: "09:00 - 10:30",
        moonPhase: "Waxing Gibbous (75%)",
    };

    const panchangItems = [
        { label: "तिथि (Tithi)", value: panchang.tithi.name, subtext: `Ends at ${panchang.tithi.endTime}`, icon: Moon },
        { label: "नक्षत्र (Nakshatra)", value: panchang.nakshatra.name, subtext: `Ends at ${panchang.nakshatra.endTime}`, icon: Star },
        { label: "योग (Yoga)", value: panchang.yoga.name, subtext: `Ends at ${panchang.yoga.endTime}`, icon: Sun },
        { label: "करण (Karana)", value: panchang.karana.name, subtext: `Ends at ${panchang.karana.endTime}`, icon: Calendar },
        { label: "वार (Day)", value: panchang.vaar, icon: Calendar },
    ];

    return (
        <MainLayout>
            {/* Page Header */}
            <section className="bg-gradient-to-br from-secondary via-secondary/90 to-accent/30 text-primary-foreground py-12">
                <div className="container mx-auto px-4 text-center">
                    <h1 className="text-3xl md:text-4xl font-bold font-heading mb-2">
                        Daily Panchang
                    </h1>
                    <p className="text-primary-foreground/80">
                        Hindu calendar with tithi, nakshatra, and auspicious timings
                    </p>
                </div>
            </section>

            <section className="py-12">
                <div className="container mx-auto px-4">
                    {/* Date Picker */}
                    <div className="max-w-md mx-auto mb-8">
                        <Card>
                            <CardContent className="pt-6">
                                <div className="flex items-center gap-4">
                                    <div className="flex-1">
                                        <Label htmlFor="date">Select Date</Label>
                                        <Input
                                            id="date"
                                            type="date"
                                            value={selectedDate}
                                            onChange={(e) => setSelectedDate(e.target.value)}
                                            className="mt-1"
                                        />
                                    </div>
                                    <Button
                                        variant="outline"
                                        onClick={() => setSelectedDate(new Date().toISOString().split("T")[0])}
                                        className="mt-6"
                                    >
                                        Today
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Panchang Display */}
                    <div className="max-w-4xl mx-auto">
                        {/* Sun/Moon Timings */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                            <Card className="text-center">
                                <CardContent className="pt-6">
                                    <Sun className="h-8 w-8 mx-auto text-accent mb-2" />
                                    <p className="text-sm text-muted-foreground">Sunrise</p>
                                    <p className="text-xl font-bold">{panchang.sunrise}</p>
                                </CardContent>
                            </Card>
                            <Card className="text-center">
                                <CardContent className="pt-6">
                                    <Sun className="h-8 w-8 mx-auto text-orange-500 mb-2" />
                                    <p className="text-sm text-muted-foreground">Sunset</p>
                                    <p className="text-xl font-bold">{panchang.sunset}</p>
                                </CardContent>
                            </Card>
                            <Card className="text-center">
                                <CardContent className="pt-6">
                                    <Moon className="h-8 w-8 mx-auto text-blue-400 mb-2" />
                                    <p className="text-sm text-muted-foreground">Moonrise</p>
                                    <p className="text-xl font-bold">{panchang.moonrise}</p>
                                </CardContent>
                            </Card>
                            <Card className="text-center bg-destructive/10">
                                <CardContent className="pt-6">
                                    <Clock className="h-8 w-8 mx-auto text-destructive mb-2" />
                                    <p className="text-sm text-muted-foreground">Rahu Kaal</p>
                                    <p className="text-xl font-bold text-destructive">{panchang.rahuKaal}</p>
                                </CardContent>
                            </Card>
                        </div>

                        {/* Main Panchang Elements */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-center">
                                    पंचांग - {new Date(selectedDate).toLocaleDateString("en-IN", {
                                        weekday: "long",
                                        year: "numeric",
                                        month: "long",
                                        day: "numeric",
                                    })}
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {panchangItems.map((item) => (
                                        <div
                                            key={item.label}
                                            className="flex items-start gap-4 p-4 rounded-lg bg-muted"
                                        >
                                            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                                                <item.icon className="h-6 w-6 text-primary" />
                                            </div>
                                            <div>
                                                <p className="text-sm text-muted-foreground">{item.label}</p>
                                                <p className="text-lg font-semibold">{item.value}</p>
                                                {item.subtext && (
                                                    <p className="text-sm text-muted-foreground">{item.subtext}</p>
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                {/* Moon Phase */}
                                <div className="mt-6 p-4 rounded-lg bg-muted text-center">
                                    <Moon className="h-12 w-12 mx-auto text-blue-400 mb-2" />
                                    <p className="text-sm text-muted-foreground">Moon Phase</p>
                                    <p className="text-lg font-semibold">{panchang.moonPhase}</p>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </section>
        </MainLayout>
    );
}
