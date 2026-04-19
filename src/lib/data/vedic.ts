/**
 * Comprehensive Vedic Astrology reference data layer.
 *
 * Pure data + helpers. No framework imports. Strict TypeScript.
 * All data is sourced from traditional Vedic astrology (Brihat Parashara
 * Hora Shastra, Jataka Parijata, and classical almanacs) and kept concise
 * so it can ship inside a client bundle.
 */

// ─── Rashis (12 zodiac signs) ───────────────────────────────────────────────

export interface RashiInfo {
  key: string;
  name: string;
  hindi: string;
  symbol: string;
  symbolEn: string;
  element: "Fire" | "Earth" | "Air" | "Water";
  quality: "Cardinal" | "Fixed" | "Mutable";
  ruler: string;
  rulerHindi: string;
  gender: "Male" | "Female";
  bodyPart: string;
  direction: string;
  traits: string[];
  description: string;
}

export const RASHIS: RashiInfo[] = [
  {
    key: "aries",
    name: "Aries",
    hindi: "मेष",
    symbol: "♈",
    symbolEn: "Ram",
    element: "Fire",
    quality: "Cardinal",
    ruler: "Mars",
    rulerHindi: "मंगल",
    gender: "Male",
    bodyPart: "Head, face",
    direction: "East",
    traits: ["bold", "pioneering", "impulsive", "energetic", "competitive", "direct"],
    description:
      "Aries is the first sign of the zodiac, associated with new beginnings, courage and leadership. Ruled by Mars, natives are direct, action-oriented and eager to initiate.",
  },
  {
    key: "taurus",
    name: "Taurus",
    hindi: "वृषभ",
    symbol: "♉",
    symbolEn: "Bull",
    element: "Earth",
    quality: "Fixed",
    ruler: "Venus",
    rulerHindi: "शुक्र",
    gender: "Female",
    bodyPart: "Face, throat",
    direction: "South",
    traits: ["steady", "sensual", "patient", "stubborn", "practical", "loyal"],
    description:
      "Taurus is a fixed earth sign symbolised by the bull, valuing stability, comfort and material security. Ruled by Venus, natives enjoy beauty, food, luxury and loyal relationships.",
  },
  {
    key: "gemini",
    name: "Gemini",
    hindi: "मिथुन",
    symbol: "♊",
    symbolEn: "Twins",
    element: "Air",
    quality: "Mutable",
    ruler: "Mercury",
    rulerHindi: "बुध",
    gender: "Male",
    bodyPart: "Arms, shoulders",
    direction: "West",
    traits: ["curious", "witty", "dual", "adaptable", "talkative", "quick"],
    description:
      "Gemini is a mutable air sign represented by the twins, signifying intellect, communication and duality. Ruled by Mercury, natives are versatile, inquisitive and quick-thinking.",
  },
  {
    key: "cancer",
    name: "Cancer",
    hindi: "कर्क",
    symbol: "♋",
    symbolEn: "Crab",
    element: "Water",
    quality: "Cardinal",
    ruler: "Moon",
    rulerHindi: "चंद्र",
    gender: "Female",
    bodyPart: "Chest",
    direction: "North",
    traits: ["nurturing", "emotional", "intuitive", "protective", "moody", "sensitive"],
    description:
      "Cancer is a cardinal water sign symbolised by the crab, deeply attached to family, home and inner feelings. Ruled by the Moon, natives are caring, imaginative and sensitive to their environment.",
  },
  {
    key: "leo",
    name: "Leo",
    hindi: "सिंह",
    symbol: "♌",
    symbolEn: "Lion",
    element: "Fire",
    quality: "Fixed",
    ruler: "Sun",
    rulerHindi: "सूर्य",
    gender: "Male",
    bodyPart: "Heart, spine",
    direction: "East",
    traits: ["proud", "generous", "charismatic", "dramatic", "warm", "creative"],
    description:
      "Leo is a fixed fire sign ruled by the Sun, associated with royalty, self-expression and magnetism. Natives are confident, warm-hearted leaders who enjoy recognition and creativity.",
  },
  {
    key: "virgo",
    name: "Virgo",
    hindi: "कन्या",
    symbol: "♍",
    symbolEn: "Maiden",
    element: "Earth",
    quality: "Mutable",
    ruler: "Mercury",
    rulerHindi: "बुध",
    gender: "Female",
    bodyPart: "Belly, intestines",
    direction: "South",
    traits: ["analytical", "precise", "helpful", "critical", "modest", "service-oriented"],
    description:
      "Virgo is a mutable earth sign symbolised by the maiden, ruled by Mercury and oriented toward analysis and refinement. Natives are detail-focused, hard-working and driven by service.",
  },
  {
    key: "libra",
    name: "Libra",
    hindi: "तुला",
    symbol: "♎",
    symbolEn: "Scales",
    element: "Air",
    quality: "Cardinal",
    ruler: "Venus",
    rulerHindi: "शुक्र",
    gender: "Male",
    bodyPart: "Waist, kidneys",
    direction: "West",
    traits: ["diplomatic", "harmonious", "charming", "indecisive", "fair", "aesthetic"],
    description:
      "Libra is a cardinal air sign of the scales, representing balance, partnership and justice. Ruled by Venus, natives are sociable, aesthetic and seek harmony in relationships.",
  },
  {
    key: "scorpio",
    name: "Scorpio",
    hindi: "वृश्चिक",
    symbol: "♏",
    symbolEn: "Scorpion",
    element: "Water",
    quality: "Fixed",
    ruler: "Mars",
    rulerHindi: "मंगल",
    gender: "Female",
    bodyPart: "Reproductive organs",
    direction: "North",
    traits: ["intense", "secretive", "transformative", "loyal", "passionate", "investigative"],
    description:
      "Scorpio is a fixed water sign symbolised by the scorpion, ruled by Mars and linked with transformation and hidden truths. Natives are penetrating, emotionally intense and fiercely loyal.",
  },
  {
    key: "sagittarius",
    name: "Sagittarius",
    hindi: "धनु",
    symbol: "♐",
    symbolEn: "Archer",
    element: "Fire",
    quality: "Mutable",
    ruler: "Jupiter",
    rulerHindi: "गुरु",
    gender: "Male",
    bodyPart: "Thighs, hips",
    direction: "East",
    traits: ["adventurous", "philosophical", "optimistic", "blunt", "freedom-loving", "generous"],
    description:
      "Sagittarius is a mutable fire sign represented by the archer, ruled by Jupiter and concerned with truth, travel and higher learning. Natives are optimistic, forthright and ever-seeking.",
  },
  {
    key: "capricorn",
    name: "Capricorn",
    hindi: "मकर",
    symbol: "♑",
    symbolEn: "Sea-goat",
    element: "Earth",
    quality: "Cardinal",
    ruler: "Saturn",
    rulerHindi: "शनि",
    gender: "Female",
    bodyPart: "Knees, joints",
    direction: "South",
    traits: ["ambitious", "disciplined", "responsible", "reserved", "patient", "traditional"],
    description:
      "Capricorn is a cardinal earth sign of the sea-goat, ruled by Saturn and devoted to long-term achievement. Natives are disciplined, persevering and carry strong responsibility.",
  },
  {
    key: "aquarius",
    name: "Aquarius",
    hindi: "कुंभ",
    symbol: "♒",
    symbolEn: "Water-bearer",
    element: "Air",
    quality: "Fixed",
    ruler: "Saturn",
    rulerHindi: "शनि",
    gender: "Male",
    bodyPart: "Ankles, calves",
    direction: "West",
    traits: ["innovative", "humanitarian", "detached", "unique", "independent", "idealistic"],
    description:
      "Aquarius is a fixed air sign of the water-bearer, ruled by Saturn and linked to humanitarian vision and originality. Natives are intellectual, unconventional and think in terms of collective progress.",
  },
  {
    key: "pisces",
    name: "Pisces",
    hindi: "मीन",
    symbol: "♓",
    symbolEn: "Fish",
    element: "Water",
    quality: "Mutable",
    ruler: "Jupiter",
    rulerHindi: "गुरु",
    gender: "Female",
    bodyPart: "Feet",
    direction: "North",
    traits: ["compassionate", "artistic", "intuitive", "dreamy", "empathetic", "spiritual"],
    description:
      "Pisces is a mutable water sign symbolised by two fish, ruled by Jupiter and associated with imagination and spirituality. Natives are deeply empathetic, creative and drawn to the transcendent.",
  },
];

export function getRashiByIndex(idx: number): RashiInfo {
  const safe = ((idx % 12) + 12) % 12;
  return RASHIS[safe];
}

// ─── Nakshatras (27 lunar mansions) ─────────────────────────────────────────

export interface NakshatraInfo {
  index: number;
  name: string;
  hindi: string;
  deity: string;
  ruler: string;
  symbol: string;
  gana: "Deva" | "Manushya" | "Rakshasa";
  nadi: "Vata" | "Pitta" | "Kapha";
  yoni: string;
  varna: "Brahmin" | "Kshatriya" | "Vaishya" | "Shudra";
  tatva: "Fire" | "Earth" | "Air" | "Water" | "Ether";
  traits: string[];
  description: string;
}

export const NAKSHATRAS: NakshatraInfo[] = [
  {
    index: 0,
    name: "Ashwini",
    hindi: "अश्विनी",
    deity: "Ashwini Kumaras",
    ruler: "Ketu",
    symbol: "Horse's head",
    gana: "Deva",
    nadi: "Vata",
    yoni: "Horse",
    varna: "Vaishya",
    tatva: "Earth",
    traits: ["swift", "healing", "pioneering", "youthful", "adventurous"],
    description:
      "Ashwini is the first nakshatra, presided over by the celestial twin physicians who bring healing and swift action. Natives are energetic, quick to start and often gifted with restorative abilities.",
  },
  {
    index: 1,
    name: "Bharani",
    hindi: "भरणी",
    deity: "Yama",
    ruler: "Venus",
    symbol: "Yoni",
    gana: "Manushya",
    nadi: "Pitta",
    yoni: "Elephant",
    varna: "Shudra",
    tatva: "Earth",
    traits: ["creative", "disciplined", "intense", "bearing", "transformative"],
    description:
      "Bharani is ruled by Yama, the lord of restraint and transformation, and governs the power to nurture and purify. Natives carry heavy responsibility and develop discipline through experience.",
  },
  {
    index: 2,
    name: "Krittika",
    hindi: "कृत्तिका",
    deity: "Agni",
    ruler: "Sun",
    symbol: "Razor / flame",
    gana: "Rakshasa",
    nadi: "Kapha",
    yoni: "Sheep",
    varna: "Brahmin",
    tatva: "Earth",
    traits: ["sharp", "purifying", "brave", "critical", "truthful"],
    description:
      "Krittika is ruled by Agni, the fire god who burns away impurity to reveal truth. Natives are incisive, straightforward and often cut through illusion to get to the core of a matter.",
  },
  {
    index: 3,
    name: "Rohini",
    hindi: "रोहिणी",
    deity: "Brahma",
    ruler: "Moon",
    symbol: "Chariot / ox cart",
    gana: "Manushya",
    nadi: "Kapha",
    yoni: "Serpent",
    varna: "Shudra",
    tatva: "Earth",
    traits: ["attractive", "fertile", "sensual", "stable", "artistic"],
    description:
      "Rohini is the favourite nakshatra of the Moon, associated with beauty, growth and material abundance. Natives are charming, creative and drawn to comfort and the finer things in life.",
  },
  {
    index: 4,
    name: "Mrigashira",
    hindi: "मृगशिरा",
    deity: "Soma",
    ruler: "Mars",
    symbol: "Deer's head",
    gana: "Deva",
    nadi: "Vata",
    yoni: "Serpent",
    varna: "Shudra",
    tatva: "Earth",
    traits: ["searching", "gentle", "curious", "restless", "poetic"],
    description:
      "Mrigashira is ruled by Soma and signifies the eternal seeker, ever in pursuit of knowledge or beauty. Natives are gentle yet restless, often changing paths in search of deeper meaning.",
  },
  {
    index: 5,
    name: "Ardra",
    hindi: "आर्द्रा",
    deity: "Rudra",
    ruler: "Rahu",
    symbol: "Teardrop / diamond",
    gana: "Manushya",
    nadi: "Vata",
    yoni: "Dog",
    varna: "Shudra",
    tatva: "Water",
    traits: ["stormy", "intense", "transformative", "analytical", "compassionate"],
    description:
      "Ardra is presided over by Rudra, the storm god whose tears dissolve the old to make way for the new. Natives pass through powerful emotional storms that eventually yield clarity and insight.",
  },
  {
    index: 6,
    name: "Punarvasu",
    hindi: "पुनर्वसु",
    deity: "Aditi",
    ruler: "Jupiter",
    symbol: "Quiver of arrows",
    gana: "Deva",
    nadi: "Vata",
    yoni: "Cat",
    varna: "Vaishya",
    tatva: "Water",
    traits: ["restorative", "optimistic", "wise", "mobile", "nurturing"],
    description:
      "Punarvasu, ruled by the mother goddess Aditi, signifies return, renewal and the restoration of prosperity. Natives are philosophical, generous and often rebuild after loss with faith.",
  },
  {
    index: 7,
    name: "Pushya",
    hindi: "पुष्य",
    deity: "Brihaspati",
    ruler: "Saturn",
    symbol: "Cow's udder / lotus",
    gana: "Deva",
    nadi: "Pitta",
    yoni: "Sheep",
    varna: "Kshatriya",
    tatva: "Water",
    traits: ["nourishing", "dutiful", "devout", "protective", "wise"],
    description:
      "Pushya is considered the most auspicious nakshatra, ruled by Brihaspati, the guru of the gods. Natives are dutiful nourishers who prosper through service, faith and steady effort.",
  },
  {
    index: 8,
    name: "Ashlesha",
    hindi: "आश्लेषा",
    deity: "Nagas",
    ruler: "Mercury",
    symbol: "Coiled serpent",
    gana: "Rakshasa",
    nadi: "Kapha",
    yoni: "Cat",
    varna: "Shudra",
    tatva: "Water",
    traits: ["hypnotic", "clever", "secretive", "strategic", "penetrating"],
    description:
      "Ashlesha is ruled by the serpent deities and carries the power of embrace, entanglement and wisdom. Natives are shrewd, magnetic and capable of both deep insight and strategic manoeuvre.",
  },
  {
    index: 9,
    name: "Magha",
    hindi: "मघा",
    deity: "Pitris",
    ruler: "Ketu",
    symbol: "Royal throne",
    gana: "Rakshasa",
    nadi: "Kapha",
    yoni: "Rat",
    varna: "Shudra",
    tatva: "Water",
    traits: ["regal", "ancestral", "proud", "traditional", "authoritative"],
    description:
      "Magha is ruled by the ancestors and evokes the throne of lineage, dignity and heritage. Natives carry a strong sense of identity, honour tradition, and often lead with natural authority.",
  },
  {
    index: 10,
    name: "Purva Phalguni",
    hindi: "पूर्व फाल्गुनी",
    deity: "Bhaga",
    ruler: "Venus",
    symbol: "Front legs of bed",
    gana: "Manushya",
    nadi: "Pitta",
    yoni: "Rat",
    varna: "Brahmin",
    tatva: "Water",
    traits: ["playful", "romantic", "generous", "creative", "sociable"],
    description:
      "Purva Phalguni is ruled by Bhaga, the god of marital bliss and good fortune. Natives are warm-hearted, artistic and drawn to enjoyment, romance and generous living.",
  },
  {
    index: 11,
    name: "Uttara Phalguni",
    hindi: "उत्तर फाल्गुनी",
    deity: "Aryaman",
    ruler: "Sun",
    symbol: "Back legs of bed",
    gana: "Manushya",
    nadi: "Vata",
    yoni: "Cow",
    varna: "Kshatriya",
    tatva: "Fire",
    traits: ["dependable", "charitable", "fair", "friendly", "steady"],
    description:
      "Uttara Phalguni is ruled by Aryaman, patron of contracts, friendship and noble conduct. Natives are reliable, upright and build lasting partnerships through integrity.",
  },
  {
    index: 12,
    name: "Hasta",
    hindi: "हस्त",
    deity: "Savitar",
    ruler: "Moon",
    symbol: "Open hand",
    gana: "Deva",
    nadi: "Vata",
    yoni: "Buffalo",
    varna: "Vaishya",
    tatva: "Fire",
    traits: ["skilful", "clever", "crafty", "helpful", "dexterous"],
    description:
      "Hasta is ruled by Savitar, the solar deity of skilful creation, and signifies the power of the hands. Natives are dexterous, resourceful and often talented with crafts, healing or trade.",
  },
  {
    index: 13,
    name: "Chitra",
    hindi: "चित्रा",
    deity: "Vishvakarma",
    ruler: "Mars",
    symbol: "Bright jewel / pearl",
    gana: "Rakshasa",
    nadi: "Pitta",
    yoni: "Tiger",
    varna: "Vaishya",
    tatva: "Fire",
    traits: ["magnetic", "artistic", "charismatic", "stylish", "precise"],
    description:
      "Chitra is ruled by Vishvakarma, the divine architect, and signifies the power to design something brilliant. Natives are stylish, creative and often captivate others with their presence.",
  },
  {
    index: 14,
    name: "Swati",
    hindi: "स्वाति",
    deity: "Vayu",
    ruler: "Rahu",
    symbol: "Young sprout in wind",
    gana: "Deva",
    nadi: "Kapha",
    yoni: "Buffalo",
    varna: "Shudra",
    tatva: "Fire",
    traits: ["independent", "flexible", "diplomatic", "resilient", "business-minded"],
    description:
      "Swati is ruled by Vayu, the wind god, and embodies the spirit of independence and flexibility. Natives adapt to every environment, value freedom and often thrive in trade and diplomacy.",
  },
  {
    index: 15,
    name: "Vishakha",
    hindi: "विशाखा",
    deity: "Indra and Agni",
    ruler: "Jupiter",
    symbol: "Triumphal arch",
    gana: "Rakshasa",
    nadi: "Kapha",
    yoni: "Tiger",
    varna: "Kshatriya",
    tatva: "Fire",
    traits: ["goal-oriented", "determined", "ambitious", "focused", "tenacious"],
    description:
      "Vishakha is ruled by Indra and Agni, gods of victorious effort, and signifies single-minded pursuit of a goal. Natives are determined, strategic and willing to endure hardship for achievement.",
  },
  {
    index: 16,
    name: "Anuradha",
    hindi: "अनुराधा",
    deity: "Mitra",
    ruler: "Saturn",
    symbol: "Lotus / staff",
    gana: "Deva",
    nadi: "Pitta",
    yoni: "Deer",
    varna: "Shudra",
    tatva: "Fire",
    traits: ["devoted", "friendly", "cooperative", "loyal", "travel-loving"],
    description:
      "Anuradha is ruled by Mitra, god of friendship, and signifies devotion and harmonious cooperation. Natives build deep friendships, often rise through group effort and enjoy travel.",
  },
  {
    index: 17,
    name: "Jyeshtha",
    hindi: "ज्येष्ठा",
    deity: "Indra",
    ruler: "Mercury",
    symbol: "Earring / umbrella",
    gana: "Rakshasa",
    nadi: "Vata",
    yoni: "Deer",
    varna: "Shudra",
    tatva: "Air",
    traits: ["senior", "protective", "responsible", "secretive", "commanding"],
    description:
      "Jyeshtha is ruled by Indra, king of the gods, and represents seniority, responsibility and hidden power. Natives often carry adult burdens early and mature into protective authority figures.",
  },
  {
    index: 18,
    name: "Mula",
    hindi: "मूल",
    deity: "Nirriti",
    ruler: "Ketu",
    symbol: "Bunch of roots",
    gana: "Rakshasa",
    nadi: "Vata",
    yoni: "Dog",
    varna: "Shudra",
    tatva: "Air",
    traits: ["investigative", "philosophical", "ruthless", "deep", "uprooting"],
    description:
      "Mula is ruled by the goddess of dissolution and signifies the power to get to the root. Natives are searching, philosophical and sometimes face upheavals that reveal a deeper truth.",
  },
  {
    index: 19,
    name: "Purva Ashadha",
    hindi: "पूर्वाषाढ़ा",
    deity: "Apas",
    ruler: "Venus",
    symbol: "Fan / winnowing basket",
    gana: "Manushya",
    nadi: "Pitta",
    yoni: "Monkey",
    varna: "Brahmin",
    tatva: "Air",
    traits: ["invincible", "inspiring", "proud", "expansive", "persuasive"],
    description:
      "Purva Ashadha is ruled by the waters and connotes invincibility and expansive vision. Natives are optimistic, persuasive and rarely accept defeat in their endeavours.",
  },
  {
    index: 20,
    name: "Uttara Ashadha",
    hindi: "उत्तराषाढ़ा",
    deity: "Vishvedevas",
    ruler: "Sun",
    symbol: "Elephant tusk / planks of bed",
    gana: "Manushya",
    nadi: "Kapha",
    yoni: "Mongoose",
    varna: "Kshatriya",
    tatva: "Air",
    traits: ["victorious", "ethical", "dutiful", "persevering", "leaderly"],
    description:
      "Uttara Ashadha is ruled by the universal gods and represents enduring victory and righteous achievement. Natives are principled, patient and often rise to positions of lasting influence.",
  },
  {
    index: 21,
    name: "Shravana",
    hindi: "श्रवण",
    deity: "Vishnu",
    ruler: "Moon",
    symbol: "Three footprints / ear",
    gana: "Deva",
    nadi: "Kapha",
    yoni: "Monkey",
    varna: "Shudra",
    tatva: "Air",
    traits: ["listening", "learned", "traditional", "connective", "wise"],
    description:
      "Shravana is ruled by Vishnu and carries the power of hearing, learning and spreading knowledge. Natives are keen listeners, scholarly and often act as bridges between people and ideas.",
  },
  {
    index: 22,
    name: "Dhanishta",
    hindi: "धनिष्ठा",
    deity: "Ashta Vasus",
    ruler: "Mars",
    symbol: "Drum / flute",
    gana: "Rakshasa",
    nadi: "Pitta",
    yoni: "Lion",
    varna: "Vaishya",
    tatva: "Ether",
    traits: ["rhythmic", "affluent", "musical", "enterprising", "generous"],
    description:
      "Dhanishta is ruled by the eight Vasus and symbolises wealth, rhythm and celebration. Natives are energetic, often musically or commercially gifted, and attract prosperity through enterprise.",
  },
  {
    index: 23,
    name: "Shatabhisha",
    hindi: "शतभिषा",
    deity: "Varuna",
    ruler: "Rahu",
    symbol: "Empty circle / hundred stars",
    gana: "Rakshasa",
    nadi: "Vata",
    yoni: "Horse",
    varna: "Shudra",
    tatva: "Ether",
    traits: ["healing", "mysterious", "independent", "scientific", "reclusive"],
    description:
      "Shatabhisha is ruled by Varuna and means 'hundred healers', linked with medicine and mystic research. Natives are private, investigative and often drawn to healing, technology or occult science.",
  },
  {
    index: 24,
    name: "Purva Bhadrapada",
    hindi: "पूर्व भाद्रपद",
    deity: "Aja Ekapada",
    ruler: "Jupiter",
    symbol: "Two-faced man / front legs of funeral cot",
    gana: "Manushya",
    nadi: "Vata",
    yoni: "Lion",
    varna: "Brahmin",
    tatva: "Ether",
    traits: ["intense", "austere", "visionary", "fiery", "transformative"],
    description:
      "Purva Bhadrapada is ruled by the one-footed serpent deity and carries the fire of purification. Natives are austere, visionary and often pass through intense inner transformation.",
  },
  {
    index: 25,
    name: "Uttara Bhadrapada",
    hindi: "उत्तर भाद्रपद",
    deity: "Ahir Budhnya",
    ruler: "Saturn",
    symbol: "Back legs of funeral cot / twins",
    gana: "Manushya",
    nadi: "Pitta",
    yoni: "Cow",
    varna: "Kshatriya",
    tatva: "Ether",
    traits: ["deep", "compassionate", "patient", "mystical", "stabilising"],
    description:
      "Uttara Bhadrapada is ruled by the serpent of the ocean depths, signifying hidden wisdom and calm strength. Natives are deep-thinking, compassionate and often serve as a stabilising presence.",
  },
  {
    index: 26,
    name: "Revati",
    hindi: "रेवती",
    deity: "Pushan",
    ruler: "Mercury",
    symbol: "Fish / drum",
    gana: "Deva",
    nadi: "Kapha",
    yoni: "Elephant",
    varna: "Shudra",
    tatva: "Ether",
    traits: ["gentle", "protective", "spiritual", "nurturing", "guiding"],
    description:
      "Revati is ruled by Pushan, the shepherd god who guides souls safely across journeys. Natives are gentle, nurturing and often act as kind guides to people, animals or those in transition.",
  },
];

export function getNakshatraInfo(name: string): NakshatraInfo | null {
  if (!name) return null;
  const needle = name.trim().toLowerCase();
  return (
    NAKSHATRAS.find(
      (n) => n.name.toLowerCase() === needle || n.hindi === name.trim(),
    ) ?? null
  );
}

// ─── Planets (9 grahas) ─────────────────────────────────────────────────────

export interface PlanetInfo {
  key: string;
  hindi: string;
  nature: "Benefic" | "Malefic" | "Mixed";
  karaka: string;
  significations: string[];
  gemstone: string;
  gemstoneHindi: string;
  mantra: string;
  mantraTransliteration: string;
  mantraMeaning: string;
  color: string;
  day: string;
  direction: string;
  metal: string;
  number: number;
  description: string;
}

export const PLANETS: Record<string, PlanetInfo> = {
  Sun: {
    key: "Sun",
    hindi: "सूर्य",
    nature: "Malefic",
    karaka: "Soul, father, authority",
    significations: [
      "Soul and ego",
      "Father and paternal figures",
      "Authority and leadership",
      "Government and kings",
      "Vitality and health",
      "Self-confidence",
      "Public reputation",
    ],
    gemstone: "Ruby",
    gemstoneHindi: "माणिक्य",
    mantra: "ॐ ह्रां ह्रीं ह्रौं सः सूर्याय नमः",
    mantraTransliteration: "Om Hraam Hreem Hraum Sah Suryaya Namah",
    mantraMeaning: "Salutations to the Sun, source of light, life and vitality.",
    color: "Red / gold",
    day: "Sunday",
    direction: "East",
    metal: "Gold / copper",
    number: 1,
    description:
      "The Sun is the natural soul karaka and ruler of Leo, signifying the self, father and royal authority. A strong Sun grants confidence, vitality and recognition.",
  },
  Moon: {
    key: "Moon",
    hindi: "चंद्र",
    nature: "Benefic",
    karaka: "Mind, mother, emotions",
    significations: [
      "Mind and emotions",
      "Mother and nurturing",
      "Comfort and home",
      "Memory and imagination",
      "Public and masses",
      "Bodily fluids",
      "Moods and receptivity",
    ],
    gemstone: "Pearl",
    gemstoneHindi: "मोती",
    mantra: "ॐ श्रां श्रीं श्रौं सः चन्द्रमसे नमः",
    mantraTransliteration: "Om Shraam Shreem Shraum Sah Chandramase Namah",
    mantraMeaning: "Salutations to the Moon, bestower of peace, comfort and nurturance.",
    color: "White",
    day: "Monday",
    direction: "North-West",
    metal: "Silver",
    number: 2,
    description:
      "The Moon is the karaka of mind, mother and emotional nature and rules Cancer. A strong Moon brings mental peace, popularity and emotional resilience.",
  },
  Mars: {
    key: "Mars",
    hindi: "मंगल",
    nature: "Malefic",
    karaka: "Courage, siblings, energy",
    significations: [
      "Courage and strength",
      "Siblings, especially brothers",
      "Energy and drive",
      "Warfare and combat",
      "Discipline and sports",
      "Property and land",
      "Technical and engineering work",
    ],
    gemstone: "Red Coral",
    gemstoneHindi: "मूंगा",
    mantra: "ॐ क्रां क्रीं क्रौं सः भौमाय नमः",
    mantraTransliteration: "Om Kraam Kreem Kraum Sah Bhaumaya Namah",
    mantraMeaning: "Salutations to Mars, commander of courage and protector of dharma.",
    color: "Red",
    day: "Tuesday",
    direction: "South",
    metal: "Copper / gold",
    number: 9,
    description:
      "Mars is the general of the planetary cabinet, ruling Aries and Scorpio and signifying courage and drive. A strong Mars imparts bravery, discipline and physical stamina.",
  },
  Mercury: {
    key: "Mercury",
    hindi: "बुध",
    nature: "Mixed",
    karaka: "Intellect, communication, trade",
    significations: [
      "Intellect and analysis",
      "Communication and speech",
      "Trade and commerce",
      "Education and learning",
      "Writing and language",
      "Youth and friendships",
      "Short travels",
    ],
    gemstone: "Emerald",
    gemstoneHindi: "पन्ना",
    mantra: "ॐ ब्रां ब्रीं ब्रौं सः बुधाय नमः",
    mantraTransliteration: "Om Braam Breem Braum Sah Budhaya Namah",
    mantraMeaning: "Salutations to Mercury, lord of intelligence and articulate speech.",
    color: "Green",
    day: "Wednesday",
    direction: "North",
    metal: "Brass",
    number: 5,
    description:
      "Mercury is the prince of the planetary cabinet, ruling Gemini and Virgo and governing intellect and communication. A strong Mercury grants quick wit, fluency and business acumen.",
  },
  Jupiter: {
    key: "Jupiter",
    hindi: "गुरु",
    nature: "Benefic",
    karaka: "Wisdom, teacher, children",
    significations: [
      "Wisdom and knowledge",
      "Guru and teachers",
      "Dharma and ethics",
      "Children and progeny",
      "Wealth and prosperity",
      "Expansion and optimism",
      "Religion and philosophy",
    ],
    gemstone: "Yellow Sapphire",
    gemstoneHindi: "पुखराज",
    mantra: "ॐ ग्रां ग्रीं ग्रौं सः गुरवे नमः",
    mantraTransliteration: "Om Graam Greem Graum Sah Gurave Namah",
    mantraMeaning: "Salutations to Jupiter, guru of the gods and bestower of wisdom.",
    color: "Yellow",
    day: "Thursday",
    direction: "North-East",
    metal: "Gold",
    number: 3,
    description:
      "Jupiter is the greatest benefic, ruling Sagittarius and Pisces and signifying dharma, wisdom and expansion. A strong Jupiter brings good fortune, children, learning and ethical clarity.",
  },
  Venus: {
    key: "Venus",
    hindi: "शुक्र",
    nature: "Benefic",
    karaka: "Love, luxury, spouse",
    significations: [
      "Love and romance",
      "Marriage and spouse",
      "Beauty and aesthetics",
      "Luxury and comforts",
      "Arts and music",
      "Pleasure and sensuality",
      "Vehicles and fine goods",
    ],
    gemstone: "Diamond",
    gemstoneHindi: "हीरा",
    mantra: "ॐ द्रां द्रीं द्रौं सः शुक्राय नमः",
    mantraTransliteration: "Om Draam Dreem Draum Sah Shukraya Namah",
    mantraMeaning: "Salutations to Venus, preceptor of love, art and refined living.",
    color: "White / Pink",
    day: "Friday",
    direction: "South-East",
    metal: "Silver",
    number: 6,
    description:
      "Venus is the guru of the demons, ruling Taurus and Libra and signifying love, art and enjoyment. A strong Venus blesses with relationships, creativity and material comfort.",
  },
  Saturn: {
    key: "Saturn",
    hindi: "शनि",
    nature: "Malefic",
    karaka: "Karma, discipline, longevity",
    significations: [
      "Karma and consequences",
      "Discipline and duty",
      "Delay and obstacles",
      "Servants and labour",
      "Service and the poor",
      "Aging and longevity",
      "Hard lessons and detachment",
    ],
    gemstone: "Blue Sapphire",
    gemstoneHindi: "नीलम",
    mantra: "ॐ प्रां प्रीं प्रौं सः शनैश्चराय नमः",
    mantraTransliteration: "Om Praam Preem Praum Sah Shanaishcharaya Namah",
    mantraMeaning: "Salutations to Saturn, lord of karma and just rewarder of effort.",
    color: "Dark blue / black",
    day: "Saturday",
    direction: "West",
    metal: "Iron",
    number: 8,
    description:
      "Saturn is the strict karmic judge, ruling Capricorn and Aquarius and teaching discipline through delay. A strong Saturn grants endurance, longevity and mastery built over time.",
  },
  Rahu: {
    key: "Rahu",
    hindi: "राहु",
    nature: "Malefic",
    karaka: "Obsession, illusion, foreign influence",
    significations: [
      "Illusion and maya",
      "Foreign travel and lands",
      "Obsession and cravings",
      "Material desire",
      "Innovation and disruption",
      "Technology and machines",
      "Unconventional paths",
    ],
    gemstone: "Hessonite",
    gemstoneHindi: "गोमेद",
    mantra: "ॐ भ्रां भ्रीं भ्रौं सः राहवे नमः",
    mantraTransliteration: "Om Bhraam Bhreem Bhraum Sah Rahave Namah",
    mantraMeaning: "Salutations to Rahu, shadow planet who magnifies worldly desire.",
    color: "Smoke",
    day: "Saturday",
    direction: "South-West",
    metal: "Lead",
    number: 4,
    description:
      "Rahu is the north lunar node, a shadow planet that amplifies desire, ambition and foreign influence. When well-placed it can grant sudden gains, innovation and unusual success.",
  },
  Ketu: {
    key: "Ketu",
    hindi: "केतु",
    nature: "Malefic",
    karaka: "Detachment, spirituality, moksha",
    significations: [
      "Moksha and liberation",
      "Detachment and renunciation",
      "Spirituality and mysticism",
      "Past-life impressions",
      "Intuition and insight",
      "Occult and hidden knowledge",
      "Research and seclusion",
    ],
    gemstone: "Cat's Eye",
    gemstoneHindi: "लहसुनिया",
    mantra: "ॐ स्रां स्रीं स्रौं सः केतवे नमः",
    mantraTransliteration: "Om Sraam Sreem Sraum Sah Ketave Namah",
    mantraMeaning: "Salutations to Ketu, shadow planet who grants insight and detachment.",
    color: "Multi-color",
    day: "Tuesday",
    direction: "No fixed direction",
    metal: "Iron",
    number: 7,
    description:
      "Ketu is the south lunar node, the headless shadow that dissolves attachment and illuminates the spiritual. Its placement often shows where the soul seeks moksha and inner realisation.",
  },
};

// ─── Houses / Bhavas (12) ───────────────────────────────────────────────────

export interface HouseInfo {
  number: number;
  name: string;
  nameEn: string;
  hindi: string;
  category:
    | "Kendra"
    | "Trikona"
    | "Upachaya"
    | "Dusthana"
    | "Panapara"
    | "Apoklima";
  significations: string[];
  description: string;
}

export const HOUSES: HouseInfo[] = [
  {
    number: 1,
    name: "Tanu Bhava",
    nameEn: "House of Self",
    hindi: "तनु भाव",
    category: "Kendra",
    significations: [
      "Self and body",
      "Personality",
      "Physical appearance",
      "Health and vitality",
      "Start of life",
      "General temperament",
    ],
    description:
      "The first house represents the native themselves — body, personality and the broad trajectory of life. It is the foundation on which the entire chart is read.",
  },
  {
    number: 2,
    name: "Dhana Bhava",
    nameEn: "House of Wealth",
    hindi: "धन भाव",
    category: "Panapara",
    significations: [
      "Accumulated wealth",
      "Speech and voice",
      "Family of birth",
      "Food and intake",
      "Values and possessions",
    ],
    description:
      "The second house governs earned wealth, speech, family and the food one eats. It reflects values held close and the resources one accumulates.",
  },
  {
    number: 3,
    name: "Sahaja Bhava",
    nameEn: "House of Siblings and Courage",
    hindi: "सहज भाव",
    category: "Upachaya",
    significations: [
      "Younger siblings",
      "Courage and initiative",
      "Short journeys",
      "Self-effort",
      "Hobbies and skills",
    ],
    description:
      "The third house relates to personal courage, siblings and the effort one puts forth. It grows stronger over time as self-made ventures mature.",
  },
  {
    number: 4,
    name: "Sukha Bhava",
    nameEn: "House of Happiness and Home",
    hindi: "सुख भाव",
    category: "Kendra",
    significations: [
      "Mother",
      "Home and property",
      "Vehicles",
      "Comfort and emotions",
      "Land and real estate",
    ],
    description:
      "The fourth house is the seat of the mother, home and inner happiness. It shows the emotional foundation from which the native operates.",
  },
  {
    number: 5,
    name: "Putra Bhava",
    nameEn: "House of Children and Intelligence",
    hindi: "पुत्र भाव",
    category: "Trikona",
    significations: [
      "Children and progeny",
      "Creativity",
      "Romance and love affairs",
      "Intelligence",
      "Speculation and gains",
    ],
    description:
      "The fifth house signifies children, creative intelligence and romantic life. It is a trikona of dharma and carries the fruits of past good karma.",
  },
  {
    number: 6,
    name: "Shatru Bhava",
    nameEn: "House of Enemies and Health",
    hindi: "रिपु भाव",
    category: "Upachaya",
    significations: [
      "Enemies and opponents",
      "Debts",
      "Disease",
      "Service and employment",
      "Daily work and routine",
      "Pets",
    ],
    description:
      "The sixth house is concerned with enemies, debts, illness and daily service. Despite its hardships it is an upachaya, improving with effort over time.",
  },
  {
    number: 7,
    name: "Kalatra Bhava",
    nameEn: "House of Spouse",
    hindi: "कलत्र भाव",
    category: "Kendra",
    significations: [
      "Marriage and spouse",
      "Partnerships",
      "Business partners",
      "Public dealings",
      "Sexual relationships",
    ],
    description:
      "The seventh house rules marriage, partnerships and one's dealings with the public. It reflects the kind of partner the native attracts and works with.",
  },
  {
    number: 8,
    name: "Ayush Bhava",
    nameEn: "House of Longevity and Transformation",
    hindi: "आयु भाव",
    category: "Dusthana",
    significations: [
      "Longevity and death",
      "Occult and hidden matters",
      "Inheritance and insurance",
      "Sudden events",
      "Obstacles",
      "Research and depth",
    ],
    description:
      "The eighth house governs longevity, inheritance and sudden, transformative events. It is the most mystical of the dusthanas, opening the door to hidden knowledge.",
  },
  {
    number: 9,
    name: "Dharma Bhava",
    nameEn: "House of Fortune and Dharma",
    hindi: "धर्म भाव",
    category: "Trikona",
    significations: [
      "Fortune and luck",
      "Higher learning",
      "Father",
      "Spirituality and faith",
      "Long journeys",
      "Guru and teachers",
    ],
    description:
      "The ninth house is the most auspicious trikona, covering dharma, fortune and higher wisdom. It shows the native's relationship with father, guru and the divine order.",
  },
  {
    number: 10,
    name: "Karma Bhava",
    nameEn: "House of Career",
    hindi: "कर्म भाव",
    category: "Kendra",
    significations: [
      "Career and profession",
      "Reputation",
      "Social status",
      "Public recognition",
      "Authority and position",
    ],
    description:
      "The tenth house is the apex of the chart, ruling career, reputation and public standing. Planets here directly shape how the native is seen in society.",
  },
  {
    number: 11,
    name: "Labha Bhava",
    nameEn: "House of Gains",
    hindi: "लाभ भाव",
    category: "Upachaya",
    significations: [
      "Gains and income",
      "Friends and networks",
      "Hopes and wishes",
      "Elder siblings",
      "Fulfilment of desires",
    ],
    description:
      "The eleventh house governs gains, friendships and the fulfilment of wishes. It is the strongest upachaya and generally supports growth in income and circle.",
  },
  {
    number: 12,
    name: "Vyaya Bhava",
    nameEn: "House of Losses and Moksha",
    hindi: "व्यय भाव",
    category: "Dusthana",
    significations: [
      "Losses and expenses",
      "Foreign lands and travel",
      "Spirituality",
      "Moksha and liberation",
      "Isolation and retreat",
      "Bed pleasures and sleep",
    ],
    description:
      "The twelfth house deals with losses, expenditure and what is given up. It is also the house of moksha and quiet spiritual refinement.",
  },
];

// ─── Ascendant traits per lagna ─────────────────────────────────────────────

export interface AscendantTraits {
  strengths: string[];
  weaknesses: string[];
  career: string[];
  description: string;
}

export const ASCENDANT_TRAITS: Record<string, AscendantTraits> = {
  aries: {
    strengths: ["Courageous", "Pioneering spirit", "Natural leadership", "High energy", "Direct"],
    weaknesses: ["Impulsive", "Short temper", "Impatient", "Can be confrontational"],
    career: ["Armed forces and police", "Sports and athletics", "Surgery and emergency medicine", "Entrepreneurship"],
    description:
      "Aries ascendants carry a warrior's spark — confident, assertive and eager to pioneer. They thrive on challenge and lead most effectively from the front, though they must learn patience and self-restraint.",
  },
  taurus: {
    strengths: ["Steady and reliable", "Practical outlook", "Patient and enduring", "Refined taste", "Loyal"],
    weaknesses: ["Stubborn", "Materialistic", "Resistant to change", "Possessive"],
    career: ["Banking and finance", "Luxury goods and hospitality", "Agriculture", "Music and arts"],
    description:
      "Taurus ascendants are grounded builders with an eye for beauty and comfort. They work methodically, value stability and tend to accumulate wealth through disciplined effort over years.",
  },
  gemini: {
    strengths: ["Quick intellect", "Adaptable", "Articulate communicator", "Curious", "Versatile"],
    weaknesses: ["Restless", "Indecisive", "Gossip-prone", "Easily bored"],
    career: ["Journalism and media", "Teaching and writing", "Sales and marketing", "IT and software"],
    description:
      "Gemini ascendants are bright, mercurial and endlessly curious, moving easily between subjects and people. They shine in roles that reward communication and mental agility, but must cultivate focus.",
  },
  cancer: {
    strengths: ["Deeply caring", "Intuitive", "Protective of loved ones", "Tenacious", "Imaginative"],
    weaknesses: ["Moody", "Overly sensitive", "Clingy", "Prone to worry"],
    career: ["Healthcare and nursing", "Hospitality and catering", "Real estate", "Teaching young children"],
    description:
      "Cancer ascendants lead with heart — caring, sensitive and loyal to family and home. They are emotionally wise and excel in nurturing roles, but need to guard against being overwhelmed by feelings.",
  },
  leo: {
    strengths: ["Charismatic", "Generous", "Confident leader", "Warm-hearted", "Creative"],
    weaknesses: ["Proud", "Dramatic", "Stubborn", "Sensitive to criticism"],
    career: ["Government and administration", "Film and entertainment", "Management and leadership", "Creative arts"],
    description:
      "Leo ascendants carry an innate regal quality and a love of recognition. They inspire others with warmth and vision, and do best in roles that let them express creativity, lead openly and be seen.",
  },
  virgo: {
    strengths: ["Analytical", "Meticulous", "Service-oriented", "Practical", "Health-conscious"],
    weaknesses: ["Over-critical", "Worry-prone", "Perfectionist", "Judgemental"],
    career: ["Accounting and audit", "Medical and allied health", "Editing and research", "Data analysis"],
    description:
      "Virgo ascendants are thoughtful, methodical and strongly drawn to service. They excel wherever precision matters, and grow happiest when they balance their analytical eye with self-compassion.",
  },
  libra: {
    strengths: ["Diplomatic", "Charming", "Sense of fairness", "Aesthetic taste", "Partnership-oriented"],
    weaknesses: ["Indecisive", "Conflict-averse", "Dependent on others", "Can be superficial"],
    career: ["Law and mediation", "Counselling and HR", "Fashion and design", "Public relations"],
    description:
      "Libra ascendants are refined, sociable and skilled at finding common ground. They thrive where partnership, beauty and fairness matter, but must learn to make firm decisions on their own.",
  },
  scorpio: {
    strengths: ["Intense focus", "Emotional depth", "Resourceful", "Fiercely loyal", "Investigative"],
    weaknesses: ["Jealous", "Secretive", "Vengeful when wronged", "Controlling"],
    career: ["Research and investigation", "Surgery and psychology", "Occult and healing", "Finance and insurance"],
    description:
      "Scorpio ascendants are penetrating, secretive and transformative, willing to dive where others will not. They do powerful work behind the scenes and blossom when they trust rather than control.",
  },
  sagittarius: {
    strengths: ["Optimistic", "Philosophical", "Adventurous", "Ethical", "Generous"],
    weaknesses: ["Blunt", "Restless", "Over-confident", "Dislikes restriction"],
    career: ["Teaching and higher education", "Law and policy", "Travel and tourism", "Publishing and religion"],
    description:
      "Sagittarius ascendants are truth-seekers with a wide worldview and a taste for travel. They are natural teachers and mentors, most fulfilled when their work aligns with personal meaning.",
  },
  capricorn: {
    strengths: ["Disciplined", "Responsible", "Ambitious", "Patient", "Organised"],
    weaknesses: ["Reserved", "Pessimistic at times", "Workaholic", "Emotionally distant"],
    career: ["Civil service and government", "Engineering and construction", "Corporate leadership", "Long-term investing"],
    description:
      "Capricorn ascendants are serious, structured and built for the long climb. They rise steadily through effort and integrity, and often achieve the greatest success in the second half of life.",
  },
  aquarius: {
    strengths: ["Innovative", "Humanitarian", "Independent", "Intellectual", "Future-oriented"],
    weaknesses: ["Emotionally detached", "Unpredictable", "Rebellious", "Stubborn in views"],
    career: ["Science and technology", "Social work and NGOs", "Astrology and mysticism", "Research and innovation"],
    description:
      "Aquarius ascendants are original thinkers who care deeply about community and progress. They shine in reform-minded or technical roles and need intellectual freedom to give their best.",
  },
  pisces: {
    strengths: ["Compassionate", "Intuitive", "Artistic", "Adaptable", "Spiritually inclined"],
    weaknesses: ["Escapist", "Easily influenced", "Overly idealistic", "Boundary issues"],
    career: ["Music and fine arts", "Healing and spirituality", "Counselling and social service", "Film and poetry"],
    description:
      "Pisces ascendants are gentle, imaginative souls with a natural bridge to the spiritual. They thrive in creative or healing work, and grow strongest when they honour their intuition without losing grounding.",
  },
};

// ─── Mahadasha effects (9 planets) ──────────────────────────────────────────

export interface MahadashaEffects {
  years: number;
  description: string;
  positives: string[];
  challenges: string[];
  remedies: string[];
}

export const MAHADASHA: Record<string, MahadashaEffects> = {
  Sun: {
    years: 6,
    description:
      "The Sun mahadasha lasts six years and brings focus onto identity, authority and recognition. Its effects depend strongly on the Sun's placement and dignity in the birth chart.",
    positives: [
      "Rise in status and reputation",
      "Favour from government and authority",
      "Improved confidence and self-identity",
      "Gains through father or paternal figures",
    ],
    challenges: [
      "Ego conflicts with seniors",
      "Health issues related to heart or eyes",
      "Strain with the father",
      "Overwork and burnout",
    ],
    remedies: [
      "Recite the Aditya Hridaya Stotra on Sundays",
      "Offer water to the Sun at sunrise",
      "Donate wheat or jaggery on Sunday",
      "Wear a Ruby under astrological guidance",
    ],
  },
  Moon: {
    years: 10,
    description:
      "The Moon mahadasha lasts ten years and highlights emotional life, home and the mother. Its quality mirrors the Moon's strength, sign and aspects in the natal chart.",
    positives: [
      "Emotional fulfilment and peace",
      "Gains through mother or home",
      "Popularity with the public",
      "Favourable marriage and family life",
    ],
    challenges: [
      "Emotional ups and downs",
      "Water-related or respiratory issues",
      "Stress with mother or women",
      "Moods affecting decisions",
    ],
    remedies: [
      "Chant Chandra mantra on Mondays",
      "Donate milk, rice or white items on Monday",
      "Maintain a clean, calm home",
      "Wear a pearl after expert consultation",
    ],
  },
  Mars: {
    years: 7,
    description:
      "The Mars mahadasha lasts seven years and activates drive, courage and confrontation. It can be a period of rapid action and achievement, or of conflict and accident if Mars is weak.",
    positives: [
      "Courage to take bold decisions",
      "Gains in property or real estate",
      "Success in competition and sports",
      "Energy for leadership roles",
    ],
    challenges: [
      "Disputes and litigation",
      "Accidents or injuries",
      "Anger and impulsiveness",
      "Blood-related health issues",
    ],
    remedies: [
      "Recite Hanuman Chalisa on Tuesdays",
      "Observe a Tuesday fast",
      "Donate red lentils or red cloth",
      "Wear red coral with astrological guidance",
    ],
  },
  Mercury: {
    years: 17,
    description:
      "The Mercury mahadasha lasts seventeen years and colours life with intellect, trade and communication. Its fruits depend on Mercury's condition and the houses it governs.",
    positives: [
      "Success in business and commerce",
      "Growth in learning and skills",
      "Improved communication and network",
      "Gains through writing or technology",
    ],
    challenges: [
      "Nervous tension and overthinking",
      "Skin or speech-related issues",
      "Instability from over-adaptability",
      "Problems with partners or siblings",
    ],
    remedies: [
      "Chant the Budh beej mantra on Wednesdays",
      "Donate green gram or green clothes",
      "Feed green fodder to cows",
      "Wear an emerald after expert advice",
    ],
  },
  Jupiter: {
    years: 16,
    description:
      "The Jupiter mahadasha spans sixteen years and typically expands knowledge, ethics and prosperity. As the great benefic's dasha, it is often among the most fortunate periods of life.",
    positives: [
      "Wealth, children or marriage blessings",
      "Growth in wisdom and spirituality",
      "Respect, position and honour",
      "Favour of teachers and elders",
    ],
    challenges: [
      "Weight gain or liver issues",
      "Over-optimism leading to loss",
      "Conflict with established dharma if Jupiter is afflicted",
      "Ego in matters of knowledge",
    ],
    remedies: [
      "Recite Guru Stotra on Thursdays",
      "Donate yellow items, chickpeas or turmeric",
      "Respect teachers, gurus and elders",
      "Wear a yellow sapphire with guidance",
    ],
  },
  Venus: {
    years: 20,
    description:
      "The Venus mahadasha is the longest at twenty years and accentuates love, beauty and enjoyment. It can bring luxurious living, artistic success and happy partnerships when Venus is strong.",
    positives: [
      "Marriage and romantic happiness",
      "Gains through arts, media or luxury",
      "Comfortable lifestyle and vehicles",
      "Success in diplomacy and design",
    ],
    challenges: [
      "Over-indulgence in pleasure",
      "Relationship drama",
      "Reproductive or kidney health issues",
      "Laziness if Venus is afflicted",
    ],
    remedies: [
      "Chant Shukra beej mantra on Fridays",
      "Donate white clothes, sugar or curd",
      "Respect women and the feminine principle",
      "Wear a diamond or white sapphire as prescribed",
    ],
  },
  Saturn: {
    years: 19,
    description:
      "The Saturn mahadasha lasts nineteen years and tests the native through discipline, delay and duty. Its rewards, when they come, are lasting and rooted in genuine karmic maturity.",
    positives: [
      "Slow but solid career growth",
      "Longevity and endurance",
      "Rise through sustained hard work",
      "Karmic understanding and detachment",
    ],
    challenges: [
      "Delays and denials",
      "Chronic health issues or fatigue",
      "Loneliness and depression",
      "Loss through servants or subordinates",
    ],
    remedies: [
      "Recite Shani Chalisa or Dasharatha Shani Stotra on Saturdays",
      "Donate black sesame, iron or mustard oil",
      "Serve the poor, elderly or labourers",
      "Observe Saturday fasts with honest intent",
    ],
  },
  Rahu: {
    years: 18,
    description:
      "The Rahu mahadasha runs for eighteen years and magnifies ambition, foreign connections and unconventional paths. It can deliver meteoric rise or confusing illusion depending on Rahu's placement.",
    positives: [
      "Sudden gains and opportunities",
      "Success in foreign lands or technology",
      "Rise above original social station",
      "Innovation and unconventional achievement",
    ],
    challenges: [
      "Confusion, addiction or anxiety",
      "Deceit from others",
      "Legal or tax troubles",
      "Unstable relationships",
    ],
    remedies: [
      "Chant Rahu mantra or Durga Saptashati on Saturdays",
      "Donate blankets, sesame oil or black gram",
      "Feed stray dogs or crows",
      "Wear hessonite only after a thorough reading",
    ],
  },
  Ketu: {
    years: 7,
    description:
      "The Ketu mahadasha lasts seven years and pushes the native inward, toward detachment and spirituality. It can feel disorienting in worldly terms but profoundly clarifying in inner terms.",
    positives: [
      "Spiritual awakening and insight",
      "Release from stale attachments",
      "Gains through research or occult knowledge",
      "Sharper intuition and discernment",
    ],
    challenges: [
      "Sudden losses or separations",
      "Health issues that defy diagnosis",
      "Isolation or confusion",
      "Strained relationships",
    ],
    remedies: [
      "Chant Ketu mantra or Maha Mrityunjaya Mantra",
      "Donate multi-coloured blankets or sesame",
      "Practise meditation and silence",
      "Wear cat's eye only with expert guidance",
    ],
  },
};

// ─── Dosha checks ───────────────────────────────────────────────────────────

export interface DoshaResult {
  active: boolean;
  severity?: "low" | "medium" | "high";
  description: string;
  explanation: string;
  remedies: string[];
}

export interface ChartInput {
  ascendantRashi: number;
  moonRashi: number;
  planets: Record<string, { rashi: number }>;
}

const MANGLIK_HOUSES = new Set<number>([1, 2, 4, 7, 8, 12]);

function houseFromReference(planetRashi: number, referenceRashi: number): number {
  return (((planetRashi - referenceRashi) % 12) + 12) % 12 + 1;
}

const RASHI_NAME_AT = (idx: number): string => RASHIS[((idx % 12) + 12) % 12].name;

export function checkMangalDosha(chart: ChartInput): DoshaResult {
  const mars = chart.planets["Mars"];
  if (!mars) {
    return {
      active: false,
      description: "Mangal Dosha could not be determined because Mars position is missing.",
      explanation: "Mars data is unavailable in the provided chart input.",
      remedies: [],
    };
  }

  const houseFromLagna = houseFromReference(mars.rashi, chart.ascendantRashi);
  const houseFromMoon = houseFromReference(mars.rashi, chart.moonRashi);

  const fromLagna = MANGLIK_HOUSES.has(houseFromLagna);
  const fromMoon = MANGLIK_HOUSES.has(houseFromMoon);
  const active = fromLagna || fromMoon;

  const remedies = [
    "Worship Lord Hanuman and recite Hanuman Chalisa on Tuesdays",
    "Wear a red coral on the ring finger after astrological consultation",
    "Observe a fast on Tuesdays with sincerity",
    "Recite Mangal Chalisa or the Mars beej mantra 108 times",
    "Donate red items like masoor dal, red cloth or copper on Tuesdays",
  ];

  if (!active) {
    return {
      active: false,
      description: "No significant Mangal Dosha is indicated in the chart.",
      explanation: `Mars sits in ${RASHI_NAME_AT(mars.rashi)}, house ${houseFromLagna} from Lagna and house ${houseFromMoon} from Moon — outside the Manglik houses 1, 2, 4, 7, 8 and 12.`,
      remedies: remedies.slice(0, 3),
    };
  }

  const severity: "low" | "medium" | "high" = fromLagna && fromMoon
    ? "high"
    : "medium";

  const sources: string[] = [];
  if (fromLagna) sources.push(`house ${houseFromLagna} from Lagna`);
  if (fromMoon) sources.push(`house ${houseFromMoon} from Moon`);

  return {
    active: true,
    severity,
    description:
      severity === "high"
        ? "Strong Mangal Dosha is present; Mars falls in sensitive houses from both Lagna and Moon."
        : "Mangal Dosha is indicated; Mars occupies a sensitive house in the chart.",
    explanation: `Mars is placed in ${RASHI_NAME_AT(mars.rashi)} — ${sources.join(" and ")}. Classical texts consider Mars in houses 1, 2, 4, 7, 8 or 12 from Lagna or Moon to be Manglik.`,
    remedies,
  };
}

export function checkSadeSati(
  moonRashi: number,
  currentSaturnRashi: number,
): DoshaResult {
  const diff = (((currentSaturnRashi - moonRashi) % 12) + 12) % 12;

  const remedies = [
    "Observe a Saturday fast with devotion and simplicity",
    "Recite the Shani Chalisa or Dasharatha Shani Stotra on Saturdays",
    "Donate black sesame, iron, mustard oil or black cloth on Saturdays",
    "Feed crows, dogs or the poor on Saturdays",
    "Wear a blue sapphire only after thorough astrological consultation",
  ];

  if (diff === 11) {
    return {
      active: true,
      severity: "medium",
      description: "Sade Sati is active in its rising phase.",
      explanation: `Saturn in ${RASHI_NAME_AT(currentSaturnRashi)} transits the 12th sign from your natal Moon in ${RASHI_NAME_AT(moonRashi)}, beginning the first phase of Sade Sati.`,
      remedies,
    };
  }

  if (diff === 0) {
    return {
      active: true,
      severity: "high",
      description: "Sade Sati is active in its peak phase.",
      explanation: `Saturn in ${RASHI_NAME_AT(currentSaturnRashi)} is transiting over your natal Moon sign ${RASHI_NAME_AT(moonRashi)}, the most intense phase of Sade Sati.`,
      remedies,
    };
  }

  if (diff === 1) {
    return {
      active: true,
      severity: "medium",
      description: "Sade Sati is active in its setting phase.",
      explanation: `Saturn in ${RASHI_NAME_AT(currentSaturnRashi)} occupies the 2nd sign from your natal Moon in ${RASHI_NAME_AT(moonRashi)}, the final phase of Sade Sati.`,
      remedies,
    };
  }

  return {
    active: false,
    description: "Sade Sati is not currently active.",
    explanation: `Saturn is in ${RASHI_NAME_AT(currentSaturnRashi)}, not within the 12th, 1st or 2nd sign from your natal Moon in ${RASHI_NAME_AT(moonRashi)}.`,
    remedies: remedies.slice(0, 3),
  };
}

const NON_NODAL_PLANETS = [
  "Sun",
  "Moon",
  "Mars",
  "Mercury",
  "Jupiter",
  "Venus",
  "Saturn",
] as const;

export function checkKaalSarpDosha(chart: ChartInput): DoshaResult {
  const rahu = chart.planets["Rahu"];
  const ketu = chart.planets["Ketu"];

  const remedies = [
    "Recite the Rahu and Ketu beej mantras 108 times on Saturdays",
    "Perform a Kaal Sarp Dosh Nivaran Puja at Trimbakeshwar or Kalahasti",
    "Donate a silver snake pair at a Shiva temple",
    "Offer milk and flowers at a Nag Devata shrine on Nag Panchami",
    "Chant the Maha Mrityunjaya Mantra regularly for protection",
  ];

  if (!rahu || !ketu) {
    return {
      active: false,
      description:
        "Kaal Sarp Dosha could not be determined because Rahu or Ketu position is missing.",
      explanation: "Node positions are unavailable in the provided chart input.",
      remedies: [],
    };
  }

  const rahuR = ((rahu.rashi % 12) + 12) % 12;
  const ketuR = ((ketu.rashi % 12) + 12) % 12;

  const collected: number[] = [];
  for (const key of NON_NODAL_PLANETS) {
    const p = chart.planets[key];
    if (!p) {
      return {
        active: false,
        description:
          "Kaal Sarp Dosha could not be fully determined due to missing planet data.",
        explanation: `Position of ${key} is unavailable in the provided chart input.`,
        remedies: [],
      };
    }
    collected.push(((p.rashi % 12) + 12) % 12);
  }

  // Arc from Rahu to Ketu going forward: signs strictly between Rahu and Ketu (exclusive of Rahu and Ketu themselves).
  const forwardArc = new Set<number>();
  for (let i = 1; i < 12; i++) {
    const sign = (rahuR + i) % 12;
    if (sign === ketuR) break;
    forwardArc.add(sign);
  }

  const backwardArc = new Set<number>();
  for (let i = 1; i < 12; i++) {
    const sign = (rahuR - i + 12) % 12;
    if (sign === ketuR) break;
    backwardArc.add(sign);
  }

  const allInForward = collected.every(
    (sign) => forwardArc.has(sign) || sign === rahuR || sign === ketuR,
  );
  const allInBackward = collected.every(
    (sign) => backwardArc.has(sign) || sign === rahuR || sign === ketuR,
  );

  if (allInForward || allInBackward) {
    return {
      active: true,
      severity: "medium",
      description: "Kaal Sarp Dosha is indicated in the chart.",
      explanation: `All seven non-nodal planets fall on one side of the Rahu (${RASHIS[rahuR].name}) – Ketu (${RASHIS[ketuR].name}) axis, forming the Kaal Sarp yoga.`,
      remedies,
    };
  }

  return {
    active: false,
    description: "No Kaal Sarp Dosha is formed in the chart.",
    explanation: `At least one planet is placed outside the arc between Rahu (${RASHIS[rahuR].name}) and Ketu (${RASHIS[ketuR].name}), so the Kaal Sarp configuration does not apply.`,
    remedies: remedies.slice(0, 3),
  };
}

// ─── Remedies helpers ───────────────────────────────────────────────────────

export interface Remedy {
  type: "Gemstone" | "Mantra" | "Donation" | "Fasting" | "Puja" | "Action";
  title: string;
  description: string;
}

const PLANET_REMEDIES: Record<string, Remedy[]> = {
  Sun: [
    {
      type: "Gemstone",
      title: "Wear a Ruby",
      description:
        "Wear a natural ruby of at least two carats set in gold on the ring finger of the right hand, after astrological consultation.",
    },
    {
      type: "Mantra",
      title: "Aditya Hridaya Stotra",
      description:
        "Recite the Aditya Hridaya Stotra eleven times on Sunday mornings for strength, confidence and success.",
    },
    {
      type: "Donation",
      title: "Wheat and jaggery on Sunday",
      description:
        "Donate wheat, jaggery or copper on Sunday mornings to uplift a weak or afflicted Sun.",
    },
    {
      type: "Fasting",
      title: "Sunday fast",
      description:
        "Observe a fast on Sundays with a single satvik meal to harmonise the solar energy in the chart.",
    },
    {
      type: "Action",
      title: "Surya Namaskar daily",
      description:
        "Perform twelve rounds of Surya Namaskar at sunrise while offering water to the Sun.",
    },
  ],
  Moon: [
    {
      type: "Gemstone",
      title: "Wear a Pearl",
      description:
        "Wear a natural pearl in silver on the little finger of the right hand, prescribed by a qualified astrologer.",
    },
    {
      type: "Mantra",
      title: "Chandra Beej Mantra",
      description:
        "Chant 'Om Shraam Shreem Shraum Sah Chandramase Namah' 108 times on Monday evenings.",
    },
    {
      type: "Donation",
      title: "Milk and white items",
      description:
        "Donate milk, rice or white clothing on Monday mornings and at Shiva temples.",
    },
    {
      type: "Puja",
      title: "Worship Lord Shiva",
      description:
        "Offer water and milk over a Shiva Linga on Mondays and recite 'Om Namah Shivaya'.",
    },
    {
      type: "Action",
      title: "Respect your mother",
      description:
        "Take your mother's blessings regularly and avoid arguments with her, as the Moon signifies motherly love.",
    },
  ],
  Mars: [
    {
      type: "Gemstone",
      title: "Wear Red Coral",
      description:
        "Wear a natural red coral in gold or copper on the ring finger, on a Tuesday, under astrological guidance.",
    },
    {
      type: "Mantra",
      title: "Hanuman Chalisa",
      description:
        "Recite the Hanuman Chalisa daily, especially on Tuesdays, for protection and courage.",
    },
    {
      type: "Donation",
      title: "Red lentils and cloth",
      description:
        "Donate masoor dal, red cloth or jaggery on Tuesdays to pacify an afflicted Mars.",
    },
    {
      type: "Fasting",
      title: "Tuesday fast",
      description:
        "Observe a fast on Tuesdays with a single meal, ideally without salt, while chanting Hanuman mantras.",
    },
    {
      type: "Puja",
      title: "Visit Hanuman temple",
      description:
        "Visit a Hanuman temple on Tuesdays, offer sindoor and light a ghee lamp.",
    },
  ],
  Mercury: [
    {
      type: "Gemstone",
      title: "Wear an Emerald",
      description:
        "Wear a natural emerald in gold on the little finger of the right hand after consultation.",
    },
    {
      type: "Mantra",
      title: "Budh Beej Mantra",
      description:
        "Chant 'Om Braam Breem Braum Sah Budhaya Namah' 108 times on Wednesday mornings.",
    },
    {
      type: "Donation",
      title: "Green items on Wednesday",
      description:
        "Donate green mung beans, green cloth or books to students on Wednesdays.",
    },
    {
      type: "Action",
      title: "Respect teachers and students",
      description:
        "Help young learners, donate stationery or books, and speak truthfully to strengthen Mercury.",
    },
    {
      type: "Fasting",
      title: "Wednesday fast",
      description:
        "Observe a simple Wednesday fast, eating only green vegetables and fruits during the day.",
    },
  ],
  Jupiter: [
    {
      type: "Gemstone",
      title: "Wear a Yellow Sapphire",
      description:
        "Wear a natural yellow sapphire in gold on the index finger after astrological advice.",
    },
    {
      type: "Mantra",
      title: "Guru Beej Mantra",
      description:
        "Chant 'Om Graam Greem Graum Sah Gurave Namah' 108 times on Thursday mornings.",
    },
    {
      type: "Donation",
      title: "Yellow items on Thursday",
      description:
        "Donate chickpeas, turmeric, yellow cloth or sweets to Brahmins and teachers on Thursdays.",
    },
    {
      type: "Fasting",
      title: "Thursday fast",
      description:
        "Fast on Thursdays with yellow foods such as banana and chana dal, dedicated to Lord Vishnu or Brihaspati.",
    },
    {
      type: "Action",
      title: "Respect gurus and elders",
      description:
        "Seek blessings from teachers, gurus and elders; study sacred texts and live by your dharma.",
    },
  ],
  Venus: [
    {
      type: "Gemstone",
      title: "Wear a Diamond or White Sapphire",
      description:
        "Wear a natural diamond or a white sapphire in platinum or silver on the middle finger, under guidance.",
    },
    {
      type: "Mantra",
      title: "Shukra Beej Mantra",
      description:
        "Chant 'Om Draam Dreem Draum Sah Shukraya Namah' 108 times on Friday mornings.",
    },
    {
      type: "Donation",
      title: "White sweets and clothing",
      description:
        "Donate white clothes, sugar, curd or perfumed items on Fridays, especially to young women.",
    },
    {
      type: "Fasting",
      title: "Friday fast",
      description:
        "Observe a Friday fast with satvik white foods while chanting the Lakshmi or Durga mantra.",
    },
    {
      type: "Action",
      title: "Respect the feminine",
      description:
        "Honour women in your life, engage with the arts and cultivate beauty and refinement in living spaces.",
    },
  ],
  Saturn: [
    {
      type: "Gemstone",
      title: "Wear a Blue Sapphire",
      description:
        "Wear a natural blue sapphire in iron or silver on the middle finger only after careful astrological testing.",
    },
    {
      type: "Mantra",
      title: "Shani Beej Mantra",
      description:
        "Chant 'Om Praam Preem Praum Sah Shanaishcharaya Namah' 108 times on Saturday evenings.",
    },
    {
      type: "Donation",
      title: "Black sesame and iron",
      description:
        "Donate black sesame, mustard oil, black cloth or iron items to the needy on Saturdays.",
    },
    {
      type: "Fasting",
      title: "Saturday fast",
      description:
        "Observe a Saturday fast with simple food, and offer oil to a Shani idol or a peepal tree.",
    },
    {
      type: "Action",
      title: "Serve the underprivileged",
      description:
        "Serve the elderly, labourers and the poor; honest service pleases Saturn more than any ritual.",
    },
  ],
  Rahu: [
    {
      type: "Gemstone",
      title: "Wear Hessonite (Gomed)",
      description:
        "Wear a natural hessonite in silver on the middle finger of the right hand, only with expert guidance.",
    },
    {
      type: "Mantra",
      title: "Rahu Beej Mantra",
      description:
        "Chant 'Om Bhraam Bhreem Bhraum Sah Rahave Namah' 108 times on Saturday evenings.",
    },
    {
      type: "Donation",
      title: "Blankets and black gram",
      description:
        "Donate blankets, sesame oil or black gram on Saturdays, especially to lepers and the destitute.",
    },
    {
      type: "Puja",
      title: "Durga Saptashati recitation",
      description:
        "Recite Durga Saptashati or Chandi Path periodically to reduce the illusion and fear caused by Rahu.",
    },
    {
      type: "Action",
      title: "Feed stray dogs and crows",
      description:
        "Feed stray dogs, crows and black animals regularly to soothe Rahu's shadow influence.",
    },
  ],
  Ketu: [
    {
      type: "Gemstone",
      title: "Wear Cat's Eye (Lehsunia)",
      description:
        "Wear a natural cat's eye in silver on the little finger of the right hand, strictly under astrological guidance.",
    },
    {
      type: "Mantra",
      title: "Ketu Beej Mantra",
      description:
        "Chant 'Om Sraam Sreem Sraum Sah Ketave Namah' 108 times on Tuesday or Saturday evenings.",
    },
    {
      type: "Donation",
      title: "Multi-coloured blankets",
      description:
        "Donate multi-coloured blankets, sesame or iron items to sadhus and the poor on Saturdays.",
    },
    {
      type: "Puja",
      title: "Maha Mrityunjaya Mantra",
      description:
        "Chant the Maha Mrityunjaya Mantra 108 times to neutralise sudden losses or fears indicated by Ketu.",
    },
    {
      type: "Action",
      title: "Meditation and silence",
      description:
        "Cultivate regular meditation and short periods of silence to channel Ketu's energy toward inner clarity.",
    },
  ],
};

export function getPlanetRemedies(planetKey: string): Remedy[] {
  const remedies = PLANET_REMEDIES[planetKey];
  return remedies ? [...remedies] : [];
}
