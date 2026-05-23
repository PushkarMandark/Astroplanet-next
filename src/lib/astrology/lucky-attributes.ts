/**
 * Classical Vedic lucky attributes keyed by Moon rashi (1..12).
 * Used by the free kundli calculator to show a personalised lucky panel.
 *
 * Values are the most commonly cited associations in Indian astrology texts.
 * Index 0 is a sentinel — rashis are 1-indexed to match the panchangam-js library.
 */

export interface LuckyAttributes {
  rashi: number;
  rashiName: string;
  hindi: string;
  symbol: string;
  ruler: string;
  element: "Fire" | "Earth" | "Air" | "Water";
  gemstone: string;
  alternateStone: string;
  numbers: number[];
  colors: string[];
  day: string;
  direction: string;
  metal: string;
  deity: string;
  mantra: string;
  /** Color hex values used for the swatch. Same order as colors[]. */
  colorHex: string[];
}

const TABLE: readonly LuckyAttributes[] = [
  // 0 sentinel
  {
    rashi: 0,
    rashiName: "",
    hindi: "",
    symbol: "",
    ruler: "",
    element: "Fire",
    gemstone: "",
    alternateStone: "",
    numbers: [],
    colors: [],
    day: "",
    direction: "",
    metal: "",
    deity: "",
    mantra: "",
    colorHex: [],
  },
  // 1 Aries
  {
    rashi: 1,
    rashiName: "Aries",
    hindi: "मेष",
    symbol: "♈",
    ruler: "Mars",
    element: "Fire",
    gemstone: "Red Coral",
    alternateStone: "Carnelian",
    numbers: [1, 9],
    colors: ["Red", "Saffron"],
    colorHex: ["#dc2626", "#f59e0b"],
    day: "Tuesday",
    direction: "South",
    metal: "Copper",
    deity: "Hanuman",
    mantra: "ॐ अं अंगारकाय नमः",
  },
  // 2 Taurus
  {
    rashi: 2,
    rashiName: "Taurus",
    hindi: "वृषभ",
    symbol: "♉",
    ruler: "Venus",
    element: "Earth",
    gemstone: "Diamond",
    alternateStone: "White Sapphire",
    numbers: [6, 5],
    colors: ["White", "Pink"],
    colorHex: ["#f8fafc", "#f9a8d4"],
    day: "Friday",
    direction: "South-East",
    metal: "Silver",
    deity: "Lakshmi",
    mantra: "ॐ शुं शुक्राय नमः",
  },
  // 3 Gemini
  {
    rashi: 3,
    rashiName: "Gemini",
    hindi: "मिथुन",
    symbol: "♊",
    ruler: "Mercury",
    element: "Air",
    gemstone: "Emerald",
    alternateStone: "Peridot",
    numbers: [5, 3],
    colors: ["Green", "Yellow"],
    colorHex: ["#16a34a", "#eab308"],
    day: "Wednesday",
    direction: "North",
    metal: "Brass",
    deity: "Vishnu",
    mantra: "ॐ बुं बुधाय नमः",
  },
  // 4 Cancer
  {
    rashi: 4,
    rashiName: "Cancer",
    hindi: "कर्क",
    symbol: "♋",
    ruler: "Moon",
    element: "Water",
    gemstone: "Pearl",
    alternateStone: "Moonstone",
    numbers: [2, 7],
    colors: ["White", "Silver"],
    colorHex: ["#f8fafc", "#cbd5e1"],
    day: "Monday",
    direction: "North-West",
    metal: "Silver",
    deity: "Shiva",
    mantra: "ॐ सों सोमाय नमः",
  },
  // 5 Leo
  {
    rashi: 5,
    rashiName: "Leo",
    hindi: "सिंह",
    symbol: "♌",
    ruler: "Sun",
    element: "Fire",
    gemstone: "Ruby",
    alternateStone: "Red Garnet",
    numbers: [1, 4],
    colors: ["Gold", "Orange"],
    colorHex: ["#eab308", "#f97316"],
    day: "Sunday",
    direction: "East",
    metal: "Gold",
    deity: "Surya",
    mantra: "ॐ सूं सूर्याय नमः",
  },
  // 6 Virgo
  {
    rashi: 6,
    rashiName: "Virgo",
    hindi: "कन्या",
    symbol: "♍",
    ruler: "Mercury",
    element: "Earth",
    gemstone: "Emerald",
    alternateStone: "Jade",
    numbers: [5, 3],
    colors: ["Green", "Earthy Brown"],
    colorHex: ["#16a34a", "#92400e"],
    day: "Wednesday",
    direction: "North",
    metal: "Brass",
    deity: "Vishnu",
    mantra: "ॐ बुं बुधाय नमः",
  },
  // 7 Libra
  {
    rashi: 7,
    rashiName: "Libra",
    hindi: "तुला",
    symbol: "♎",
    ruler: "Venus",
    element: "Air",
    gemstone: "Diamond",
    alternateStone: "Opal",
    numbers: [6, 5],
    colors: ["White", "Sky Blue"],
    colorHex: ["#f8fafc", "#7dd3fc"],
    day: "Friday",
    direction: "West",
    metal: "Silver",
    deity: "Lakshmi",
    mantra: "ॐ शुं शुक्राय नमः",
  },
  // 8 Scorpio
  {
    rashi: 8,
    rashiName: "Scorpio",
    hindi: "वृश्चिक",
    symbol: "♏",
    ruler: "Mars",
    element: "Water",
    gemstone: "Red Coral",
    alternateStone: "Bloodstone",
    numbers: [9, 1],
    colors: ["Maroon", "Red"],
    colorHex: ["#7f1d1d", "#dc2626"],
    day: "Tuesday",
    direction: "South",
    metal: "Copper",
    deity: "Hanuman",
    mantra: "ॐ अं अंगारकाय नमः",
  },
  // 9 Sagittarius
  {
    rashi: 9,
    rashiName: "Sagittarius",
    hindi: "धनु",
    symbol: "♐",
    ruler: "Jupiter",
    element: "Fire",
    gemstone: "Yellow Sapphire",
    alternateStone: "Yellow Topaz",
    numbers: [3, 9],
    colors: ["Yellow", "Golden"],
    colorHex: ["#eab308", "#f59e0b"],
    day: "Thursday",
    direction: "North-East",
    metal: "Gold",
    deity: "Brihaspati",
    mantra: "ॐ बृं बृहस्पतये नमः",
  },
  // 10 Capricorn
  {
    rashi: 10,
    rashiName: "Capricorn",
    hindi: "मकर",
    symbol: "♑",
    ruler: "Saturn",
    element: "Earth",
    gemstone: "Blue Sapphire",
    alternateStone: "Amethyst",
    numbers: [8, 6],
    colors: ["Dark Blue", "Black"],
    colorHex: ["#1e3a8a", "#0f172a"],
    day: "Saturday",
    direction: "West",
    metal: "Iron",
    deity: "Shani",
    mantra: "ॐ शं शनैश्चराय नमः",
  },
  // 11 Aquarius
  {
    rashi: 11,
    rashiName: "Aquarius",
    hindi: "कुंभ",
    symbol: "♒",
    ruler: "Saturn",
    element: "Air",
    gemstone: "Blue Sapphire",
    alternateStone: "Lapis Lazuli",
    numbers: [8, 4],
    colors: ["Electric Blue", "Grey"],
    colorHex: ["#2563eb", "#6b7280"],
    day: "Saturday",
    direction: "West",
    metal: "Iron",
    deity: "Shani",
    mantra: "ॐ शं शनैश्चराय नमः",
  },
  // 12 Pisces
  {
    rashi: 12,
    rashiName: "Pisces",
    hindi: "मीन",
    symbol: "♓",
    ruler: "Jupiter",
    element: "Water",
    gemstone: "Yellow Sapphire",
    alternateStone: "Aquamarine",
    numbers: [3, 7],
    colors: ["Yellow", "Sea Green"],
    colorHex: ["#eab308", "#2dd4bf"],
    day: "Thursday",
    direction: "North-East",
    metal: "Gold",
    deity: "Brihaspati",
    mantra: "ॐ बृं बृहस्पतये नमः",
  },
];

export function getLuckyAttributes(rashi: number): LuckyAttributes | null {
  if (!Number.isFinite(rashi) || rashi < 1 || rashi > 12) return null;
  return TABLE[rashi] ?? null;
}
