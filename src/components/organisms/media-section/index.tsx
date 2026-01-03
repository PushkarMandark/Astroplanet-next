interface MediaLogo {
    name: string;
    url?: string;
}

const defaultMediaLogos: MediaLogo[] = [
    { name: "Times of India", url: "/images/media/toi.png" },
    { name: "NDTV", url: "/images/media/ndtv.png" },
    { name: "Hindustan Times", url: "/images/media/ht.png" },
    { name: "India Today", url: "/images/media/it.png" },
    { name: "Zee News", url: "/images/media/zee.png" },
    { name: "ANI", url: "/images/media/ani.png" },
];

interface MediaSectionProps {
    logos?: MediaLogo[];
    title?: string;
}

export function MediaSection({
    logos = defaultMediaLogos,
    title = "As Featured In",
}: MediaSectionProps) {
    return (
        <section className="py-12 bg-white border-y border-gray-100">
            <div className="container mx-auto px-4">
                <div className="text-center mb-8">
                    <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
                        {title}
                    </h3>
                </div>
                <div className="flex flex-wrap items-center justify-center gap-8 md:gap-16 opacity-60 hover:opacity-100 transition-opacity">
                    {logos.map((logo) => (
                        <div key={logo.name} className="h-8 md:h-10 flex items-center">
                            <span className="text-xl md:text-2xl font-bold text-gray-400 tracking-tight">
                                {logo.name}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
