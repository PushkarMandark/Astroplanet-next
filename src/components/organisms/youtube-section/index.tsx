import { Play } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface Video {
    title: string;
    views: string;
    duration?: string;
    thumbnail?: string;
}

const defaultVideos: Video[] = [
    { title: "Daily Panchang Updates", views: "12K+ views", duration: "10:35" },
    { title: "Weekly Horoscope Predictions", views: "8K+ views", duration: "15:20" },
    { title: "Gemstone Benefits Guide", views: "15K+ views", duration: "12:45" },
];

interface YouTubeSectionProps {
    videos?: Video[];
    title?: string;
    subtitle?: string;
    description?: string;
    channelUrl?: string;
}

export function YouTubeSection({
    videos = defaultVideos,
    title = "Watch & Learn",
    subtitle = "On YouTube",
    description = "Subscribe to our channel for astrology tips, predictions, and spiritual guidance",
    channelUrl = "https://youtube.com/astroeshop",
}: YouTubeSectionProps) {
    return (
        <section className="py-20 bg-gray-50">
            <div className="container mx-auto px-4">
                <div className="text-center mb-14">
                    <Badge className="mb-4 bg-red-100 text-red-600 border-red-200 px-4 py-1">
                        <Play className="h-3 w-3 mr-1 inline" />
                        {subtitle}
                    </Badge>
                    <h2 className="text-4xl md:text-5xl font-bold font-serif mb-4">
                        {title}
                    </h2>
                    <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
                        {description}
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {videos.map((video, idx) => (
                        <Card key={idx} className="group border-0 shadow-lg hover:shadow-xl transition-all overflow-hidden cursor-pointer">
                            <div className="relative aspect-video bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
                                <div className="w-16 h-16 rounded-full bg-red-600 flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg">
                                    <Play className="h-8 w-8 text-white ml-1" />
                                </div>
                                {video.duration && (
                                    <div className="absolute bottom-2 right-2 bg-black/80 text-white text-xs px-2 py-1 rounded">
                                        {video.duration}
                                    </div>
                                )}
                            </div>
                            <CardContent className="p-4">
                                <h3 className="font-semibold line-clamp-2 group-hover:text-primary transition-colors">
                                    {video.title}
                                </h3>
                                <p className="text-sm text-muted-foreground mt-1">{video.views}</p>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                <div className="text-center mt-10">
                    <Button variant="outline" size="lg" className="text-red-600 border-red-300 hover:bg-red-50" asChild>
                        <a href={channelUrl} target="_blank" rel="noopener noreferrer">
                            <Play className="h-4 w-4 mr-2" />
                            Visit YouTube Channel
                        </a>
                    </Button>
                </div>
            </div>
        </section>
    );
}
