import {
    getPanchangam,
    Observer,
    tithiNames,
    nakshatraNames,
    yogaNames,
    pakshaNames,
    dayNames,
    rashiNames,
} from "@ishubhamx/panchangam-js";

// Default location: Gurugram (AVIS TRADERS HQ)
const DEFAULT_LAT = 28.4595;
const DEFAULT_LON = 77.0266;
const DEFAULT_ELEVATION = 217;
const IST_OFFSET = 330; // minutes

export interface PanchangResult {
    tithi: string;
    tithiEndTime: string;
    paksha: string;
    nakshatra: string;
    nakshatraEndTime: string;
    nakshatraPada: number;
    yoga: string;
    yogaEndTime: string;
    karana: string;
    vara: string;
    sunrise: string;
    sunset: string;
    moonrise: string;
    rahuKaal: string;
    yamaganda: string;
    gulikaKaal: string;
    brahmaMuhurta: string;
    abhijitMuhurta: string;
    moonRashi: string;
    sunRashi: string;
    masa: string;
    ritu: string;
    samvat: { vikram: number; shaka: number; samvatsara: string };
    festivals: { name: string; description: string; isFastingDay: boolean }[];
}

function formatTime(date: Date | undefined | null): string {
    if (!date) return "--:--";
    // Convert UTC to IST
    const ist = new Date(date.getTime() + IST_OFFSET * 60 * 1000);
    const h = ist.getUTCHours().toString().padStart(2, "0");
    const m = ist.getUTCMinutes().toString().padStart(2, "0");
    return `${h}:${m}`;
}

function formatTimeRange(start: Date | undefined | null, end: Date | undefined | null): string {
    return `${formatTime(start)} - ${formatTime(end)}`;
}

export function calculatePanchang(date: Date): PanchangResult {
    const observer = new Observer(DEFAULT_LAT, DEFAULT_LON, DEFAULT_ELEVATION);
    const p = getPanchangam(date, observer, { timezoneOffset: IST_OFFSET });

    return {
        tithi: tithiNames[p.tithi] || `Tithi ${p.tithi}`,
        tithiEndTime: formatTime(p.tithiEndTime),
        paksha: pakshaNames[p.paksha === "Shukla" ? 0 : 1] || String(p.paksha),
        nakshatra: nakshatraNames[p.nakshatra] || `Nakshatra ${p.nakshatra}`,
        nakshatraEndTime: formatTime(p.nakshatraEndTime),
        nakshatraPada: p.nakshatraPada ?? 0,
        yoga: yogaNames[p.yoga] || `Yoga ${p.yoga}`,
        yogaEndTime: formatTime(p.yogaEndTime),
        karana: typeof p.karana === "string" ? p.karana : `Karana ${p.karana}`,
        vara: dayNames[p.vara] || "---",
        sunrise: formatTime(p.sunrise),
        sunset: formatTime(p.sunset),
        moonrise: formatTime(p.moonrise),
        rahuKaal: formatTimeRange(p.rahuKalamStart, p.rahuKalamEnd),
        yamaganda: formatTimeRange(p.yamagandaKalam?.start, p.yamagandaKalam?.end),
        gulikaKaal: formatTimeRange(p.gulikaKalam?.start, p.gulikaKalam?.end),
        brahmaMuhurta: formatTimeRange(p.brahmaMuhurta?.start, p.brahmaMuhurta?.end),
        abhijitMuhurta: formatTimeRange(p.abhijitMuhurta?.start, p.abhijitMuhurta?.end),
        moonRashi: rashiNames[p.moonRashi?.index] || p.moonRashi?.name || "---",
        sunRashi: rashiNames[p.sunRashi?.index] || p.sunRashi?.name || "---",
        masa: p.masa?.name || "---",
        ritu: p.ritu || "---",
        samvat: p.samvat || { vikram: 0, shaka: 0, samvatsara: "---" },
        festivals: (p.festivals || []).map((f: { name: string; description?: string; isFastingDay?: boolean }) => ({
            name: f.name,
            description: f.description || "",
            isFastingDay: f.isFastingDay || false,
        })),
    };
}
