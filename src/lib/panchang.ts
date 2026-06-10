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
    tithiStartTime: string;
    tithiEndTime: string;
    paksha: string;
    nakshatra: string;
    nakshatraStartTime: string;
    nakshatraEndTime: string;
    nakshatraPada: number;
    yoga: string;
    yogaStartTime: string;
    yogaEndTime: string;
    karana: string;
    karanaStartTime: string;
    karanaEndTime: string;
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

const MONTH_ABBR = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

// Like formatTime, but appends the IST day + short month (e.g. "09:21 (11 Jun)")
// when the time falls on a different IST calendar day than `refDate`.
function formatTimeWithDay(d: Date | undefined | null, refDate: Date): string {
    if (!d) return "--:--";
    // Convert UTC to IST (same approach as formatTime)
    const ist = new Date(d.getTime() + IST_OFFSET * 60 * 1000);
    const istRef = new Date(refDate.getTime() + IST_OFFSET * 60 * 1000);
    const h = ist.getUTCHours().toString().padStart(2, "0");
    const m = ist.getUTCMinutes().toString().padStart(2, "0");
    const sameIstDay =
        ist.getUTCFullYear() === istRef.getUTCFullYear() &&
        ist.getUTCMonth() === istRef.getUTCMonth() &&
        ist.getUTCDate() === istRef.getUTCDate();
    if (sameIstDay) return `${h}:${m}`;
    return `${h}:${m} (${ist.getUTCDate()} ${MONTH_ABBR[ist.getUTCMonth()]})`;
}

// Shape of the library's transition entries (yogaTransitions/yogas, karanaTransitions/karanas).
// Typed locally because the library's TS types do not (fully) declare these arrays.
interface PanchangTransition {
    index?: number;
    name: string;
    startTime: Date;
    endTime: Date;
}

export function calculatePanchang(date: Date): PanchangResult {
    const observer = new Observer(DEFAULT_LAT, DEFAULT_LON, DEFAULT_ELEVATION);
    const p = getPanchangam(date, observer, { timezoneOffset: IST_OFFSET });

    // Fields present at runtime but missing/partial on the library's TS type.
    const px = p as unknown as {
        tithiStartTime?: Date | null;
        nakshatraStartTime?: Date | null;
        yogaTransitions?: PanchangTransition[];
        yogas?: PanchangTransition[];
        karanaTransitions?: PanchangTransition[];
        karanas?: PanchangTransition[];
    };

    // Current yoga window: containment search, falling back to the entry whose
    // end time matches the known yogaEndTime (±60s).
    const yogaList = px.yogaTransitions ?? px.yogas ?? [];
    let yt = yogaList.find((tr) => tr.startTime <= date && date < tr.endTime);
    if (!yt && p.yogaEndTime) {
        const yogaEndMs = p.yogaEndTime.getTime();
        yt = yogaList.find((tr) => Math.abs(tr.endTime.getTime() - yogaEndMs) <= 60_000);
    }

    // Current karana window: containment search, falling back to the entry whose
    // name matches the current karana.
    const karanaList = px.karanaTransitions ?? px.karanas ?? [];
    let kt = karanaList.find((tr) => tr.startTime <= date && date < tr.endTime);
    if (!kt && typeof p.karana === "string") {
        const karanaName = p.karana;
        kt = karanaList.find((tr) => tr.name === karanaName);
    }

    return {
        tithi: tithiNames[p.tithi] || `Tithi ${p.tithi}`,
        tithiStartTime: formatTimeWithDay(px.tithiStartTime, date),
        tithiEndTime: formatTime(p.tithiEndTime),
        paksha: pakshaNames[p.paksha === "Shukla" ? 0 : 1] || String(p.paksha),
        nakshatra: nakshatraNames[p.nakshatra] || `Nakshatra ${p.nakshatra}`,
        nakshatraStartTime: formatTimeWithDay(px.nakshatraStartTime, date),
        nakshatraEndTime: formatTime(p.nakshatraEndTime),
        nakshatraPada: p.nakshatraPada ?? 0,
        yoga: yogaNames[p.yoga] || `Yoga ${p.yoga}`,
        yogaStartTime: formatTimeWithDay(yt?.startTime, date),
        yogaEndTime: formatTime(p.yogaEndTime),
        karana: typeof p.karana === "string" ? p.karana : `Karana ${p.karana}`,
        karanaStartTime: formatTimeWithDay(kt?.startTime, date),
        karanaEndTime: formatTimeWithDay(kt?.endTime, date),
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
