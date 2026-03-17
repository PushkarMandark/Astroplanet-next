const HOROSCOPE_API_URL = "https://horoscope-app-api.vercel.app/api/v1";
const HOROSCOPE_TIMEOUT_MS = 10_000;

interface HoroscopeApiData {
    horoscope_data: string;
}

interface HoroscopeApiResponse {
    success: boolean;
    data?: HoroscopeApiData;
}

// Fetch daily horoscope for a zodiac sign
export async function getDailyHoroscope(
    sign: string
): Promise<{ success: boolean; text: string }> {
    try {
        const response = await fetch(
            `${HOROSCOPE_API_URL}/get-horoscope/daily?sign=${sign}&day=today`,
            { signal: AbortSignal.timeout(HOROSCOPE_TIMEOUT_MS) }
        );

        const data: HoroscopeApiResponse = await response.json();

        if (data.success && data.data?.horoscope_data) {
            return { success: true, text: data.data.horoscope_data };
        }

        return {
            success: false,
            text: "Unable to fetch horoscope at this time. Please try again later.",
        };
    } catch {
        return {
            success: false,
            text: "Unable to fetch horoscope at this time. Please try again later.",
        };
    }
}
