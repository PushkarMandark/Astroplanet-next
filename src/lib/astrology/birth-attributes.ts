/**
 * Classical Vedic birth attributes derived from a native's Moon rashi and
 * janma nakshatra. Mirrors the "Other Details" block shown on drikpanchang.com
 * kundli reports.
 *
 * All lookups are O(1) (array index by 1-based rashi or nakshatra index).
 * Mappings follow classical sources (Brihat Samhita, Muhurta Chintamani).
 * Where multiple traditions disagree (e.g. Vashya for split rashis), the
 * dominant whole-rashi mapping is used — see inline comments.
 */

/** Nakshatra name table (0 is empty so index 1..27 maps to a name). */
export const NAKSHATRA_NAMES = [
  "",
  "Ashwini",
  "Bharani",
  "Krittika",
  "Rohini",
  "Mrigashira",
  "Ardra",
  "Punarvasu",
  "Pushya",
  "Ashlesha",
  "Magha",
  "Purva Phalguni",
  "Uttara Phalguni",
  "Hasta",
  "Chitra",
  "Swati",
  "Vishakha",
  "Anuradha",
  "Jyeshtha",
  "Mula",
  "Purva Ashadha",
  "Uttara Ashadha",
  "Shravana",
  "Dhanishta",
  "Shatabhisha",
  "Purva Bhadrapada",
  "Uttara Bhadrapada",
  "Revati",
] as const;

/** Normalise a nakshatra string for comparison (lower-case, collapse whitespace). */
function normalise(name: string): string {
  return name.trim().toLowerCase().replace(/\s+/g, " ");
}

/** Pre-built lookup map (lower-case name → 1..27 index). O(1) lookup. */
const NAKSHATRA_INDEX_MAP: Record<string, number> = (() => {
  const map: Record<string, number> = {};
  for (let i = 1; i <= 27; i++) {
    map[normalise(NAKSHATRA_NAMES[i])] = i;
  }
  return map;
})();

/** Case-insensitive nakshatra lookup. Returns 1..27 or 0 if not found. */
export function nakshatraIndex(name: string): number {
  if (!name) return 0;
  return NAKSHATRA_INDEX_MAP[normalise(name)] ?? 0;
}

// ─────────────────────────────────────────────────────────────────────────────
// Lookup tables (1-indexed; index 0 sentinel = "—")
// ─────────────────────────────────────────────────────────────────────────────

/** Yoni (animal symbolism) — 1-indexed by nakshatra. */
const YONI_TABLE: readonly string[] = [
  "—",
  "Horse", // Ashwini
  "Elephant", // Bharani
  "Sheep", // Krittika
  "Serpent", // Rohini
  "Serpent", // Mrigashira
  "Dog", // Ardra
  "Cat", // Punarvasu
  "Sheep", // Pushya
  "Cat", // Ashlesha
  "Rat", // Magha
  "Rat", // Purva Phalguni
  "Cow", // Uttara Phalguni
  "Buffalo", // Hasta
  "Tiger", // Chitra
  "Buffalo", // Swati
  "Tiger", // Vishakha
  "Deer", // Anuradha
  "Deer", // Jyeshtha
  "Dog", // Mula
  "Monkey", // Purva Ashadha
  "Mongoose", // Uttara Ashadha
  "Monkey", // Shravana
  "Lion", // Dhanishta
  "Horse", // Shatabhisha
  "Lion", // Purva Bhadrapada
  "Cow", // Uttara Bhadrapada
  "Elephant", // Revati
] as const;

export function getYoni(nakIdx: number): string {
  if (nakIdx < 1 || nakIdx > 27) return "—";
  return YONI_TABLE[nakIdx];
}

/** Gana (temperament) — 1-indexed. */
type Gana = "Deva" | "Manushya" | "Rakshasa" | "—";

const GANA_TABLE: readonly Gana[] = [
  "—",
  "Deva", // Ashwini
  "Manushya", // Bharani
  "Rakshasa", // Krittika
  "Manushya", // Rohini
  "Deva", // Mrigashira
  "Manushya", // Ardra
  "Deva", // Punarvasu
  "Deva", // Pushya
  "Rakshasa", // Ashlesha
  "Rakshasa", // Magha
  "Manushya", // Purva Phalguni
  "Manushya", // Uttara Phalguni
  "Deva", // Hasta
  "Rakshasa", // Chitra
  "Deva", // Swati
  "Rakshasa", // Vishakha
  "Deva", // Anuradha
  "Rakshasa", // Jyeshtha
  "Rakshasa", // Mula
  "Manushya", // Purva Ashadha
  "Manushya", // Uttara Ashadha
  "Deva", // Shravana
  "Rakshasa", // Dhanishta
  "Rakshasa", // Shatabhisha
  "Manushya", // Purva Bhadrapada
  "Manushya", // Uttara Bhadrapada
  "Deva", // Revati
] as const;

export function getGana(nakIdx: number): Gana {
  if (nakIdx < 1 || nakIdx > 27) return "—";
  return GANA_TABLE[nakIdx];
}

/** Nadi — 1-indexed. */
type Nadi = "Adi" | "Madhya" | "Antya" | "—";

const NADI_TABLE: readonly Nadi[] = [
  "—",
  "Adi", // Ashwini
  "Madhya", // Bharani
  "Antya", // Krittika
  "Antya", // Rohini
  "Madhya", // Mrigashira
  "Adi", // Ardra
  "Adi", // Punarvasu
  "Madhya", // Pushya
  "Antya", // Ashlesha
  "Antya", // Magha
  "Madhya", // Purva Phalguni
  "Adi", // Uttara Phalguni
  "Adi", // Hasta
  "Madhya", // Chitra
  "Antya", // Swati
  "Antya", // Vishakha
  "Madhya", // Anuradha
  "Adi", // Jyeshtha
  "Adi", // Mula
  "Madhya", // Purva Ashadha
  "Antya", // Uttara Ashadha
  "Antya", // Shravana
  "Madhya", // Dhanishta
  "Adi", // Shatabhisha
  "Adi", // Purva Bhadrapada
  "Madhya", // Uttara Bhadrapada
  "Antya", // Revati
] as const;

export function getNadi(nakIdx: number): Nadi {
  if (nakIdx < 1 || nakIdx > 27) return "—";
  return NADI_TABLE[nakIdx];
}

/** Varna — 1-indexed by moon rashi (1=Aries..12=Pisces). */
type Varna = "Brahmin" | "Kshatriya" | "Vaishya" | "Shudra" | "—";

const VARNA_TABLE: readonly Varna[] = [
  "—",
  "Kshatriya", // Aries (fire)
  "Vaishya", // Taurus (earth)
  "Shudra", // Gemini (air)
  "Brahmin", // Cancer (water)
  "Kshatriya", // Leo (fire)
  "Vaishya", // Virgo (earth)
  "Shudra", // Libra (air)
  "Brahmin", // Scorpio (water)
  "Kshatriya", // Sagittarius (fire)
  "Vaishya", // Capricorn (earth)
  "Shudra", // Aquarius (air)
  "Brahmin", // Pisces (water)
] as const;

export function getVarna(moonRashi: number): Varna {
  if (moonRashi < 1 || moonRashi > 12) return "—";
  return VARNA_TABLE[moonRashi];
}

/** Vashya — 1-indexed by moon rashi. Uses whole-rashi simplification. */
const VASHYA_TABLE: readonly string[] = [
  "—",
  "Chatushpada", // Aries
  "Chatushpada", // Taurus
  "Manava", // Gemini
  "Jalachara", // Cancer
  "Vanachara", // Leo
  "Manava", // Virgo
  "Manava", // Libra
  "Keeta", // Scorpio
  "Manava", // Sagittarius (1st half is human; whole-rashi simplification)
  "Jalachara", // Capricorn (2nd half aquatic; whole-rashi → Jalachara)
  "Manava", // Aquarius
  "Jalachara", // Pisces
] as const;

export function getVashya(moonRashi: number): string {
  if (moonRashi < 1 || moonRashi > 12) return "—";
  return VASHYA_TABLE[moonRashi];
}

/** Tattva — 1-indexed by moon rashi. */
type Tattva = "Fiery" | "Earthy" | "Airy" | "Watery" | "—";

const TATTVA_TABLE: readonly Tattva[] = [
  "—",
  "Fiery", // Aries
  "Earthy", // Taurus
  "Airy", // Gemini
  "Watery", // Cancer
  "Fiery", // Leo
  "Earthy", // Virgo
  "Airy", // Libra
  "Watery", // Scorpio
  "Fiery", // Sagittarius
  "Earthy", // Capricorn
  "Airy", // Aquarius
  "Watery", // Pisces
] as const;

export function getTattva(moonRashi: number): Tattva {
  if (moonRashi < 1 || moonRashi > 12) return "—";
  return TATTVA_TABLE[moonRashi];
}

/** Yunja — three-fold partition of the 27 nakshatras. */
type Yunja = "Purva" | "Madhya" | "Uttara" | "—";

export function getYunja(nakIdx: number): Yunja {
  if (nakIdx < 1 || nakIdx > 27) return "—";
  if (nakIdx <= 9) return "Purva";
  if (nakIdx <= 18) return "Madhya";
  return "Uttara";
}

/** Rashi Paya (metal of birth) — 1-indexed by moon rashi. */
type Paya = "Golden" | "Silver" | "Copper" | "Iron" | "—";

const RASHI_PAYA_TABLE: readonly Paya[] = [
  "—",
  "Golden", // Aries
  "Silver", // Taurus
  "Copper", // Gemini
  "Silver", // Cancer
  "Iron", // Leo
  "Copper", // Virgo
  "Iron", // Libra
  "Golden", // Scorpio
  "Silver", // Sagittarius
  "Copper", // Capricorn
  "Iron", // Aquarius
  "Golden", // Pisces
] as const;

export function getRashiPaya(moonRashi: number): Paya {
  if (moonRashi < 1 || moonRashi > 12) return "—";
  return RASHI_PAYA_TABLE[moonRashi];
}

/**
 * Nakshatra Paya — simplified 4-cycle by nakshatra index modulo 4.
 *   nakIdx % 4 === 1 → Golden
 *   nakIdx % 4 === 2 → Silver
 *   nakIdx % 4 === 3 → Copper
 *   nakIdx % 4 === 0 → Iron
 */
const NAK_PAYA_CYCLE: readonly Paya[] = ["Iron", "Golden", "Silver", "Copper"];

export function getNakshatraPaya(nakIdx: number): Paya {
  if (nakIdx < 1 || nakIdx > 27) return "—";
  return NAK_PAYA_CYCLE[nakIdx % 4];
}

/**
 * Tara — the 9-fold auspiciousness reckoning from the Janma Nakshatra.
 * Counting Tara starts from the birth nakshatra as #1 (Janma), so for the
 * native's own kundli the Janma Tara is always "Janma". Transit-aware
 * computation against a current/event nakshatra is left for future work.
 */
export function getTara(_janmaNakshatraIdx: number): string {
  void _janmaNakshatraIdx;
  return "Janma";
}

// ─────────────────────────────────────────────────────────────────────────────
// Aggregate
// ─────────────────────────────────────────────────────────────────────────────

export interface BirthAttributes {
  rashiPaya: string;
  nakshatraPaya: string;
  tattva: string;
  yunja: string;
  varna: string;
  vashya: string;
  tara: string;
  yoni: string;
  gana: string;
  nadi: string;
}

/** Compute all 10 birth attributes from moon rashi (1..12) and nakshatra name. */
export function getBirthAttributes(input: {
  moonRashi: number;
  nakshatraName: string;
}): BirthAttributes {
  const { moonRashi, nakshatraName } = input;
  const nakIdx = nakshatraIndex(nakshatraName);
  return {
    rashiPaya: getRashiPaya(moonRashi),
    nakshatraPaya: getNakshatraPaya(nakIdx),
    tattva: getTattva(moonRashi),
    yunja: getYunja(nakIdx),
    varna: getVarna(moonRashi),
    vashya: getVashya(moonRashi),
    tara: getTara(nakIdx),
    yoni: getYoni(nakIdx),
    gana: getGana(nakIdx),
    nadi: getNadi(nakIdx),
  };
}
