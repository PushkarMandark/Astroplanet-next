/**
 * Panchang interpretations data layer.
 *
 * Pure data + helper functions — no React, no browser APIs. Every export
 * is consumed by `src/app/panchang/page.tsx`.
 */

// ────────────────────────────────────────────────────────────────────────────
// Tithi (lunar day)
// ────────────────────────────────────────────────────────────────────────────

export interface TithiInfo {
  name: string;
  hindi: string;
  number: number;
  deity: string;
  nature: "Nanda" | "Bhadra" | "Jaya" | "Rikta" | "Purna";
  auspicious: boolean;
  favorable: string[];
  avoid: string[];
  description: string;
}

export const TITHIS: TithiInfo[] = [
  {
    name: "Pratipada",
    hindi: "प्रतिपदा",
    number: 1,
    deity: "Agni",
    nature: "Nanda",
    auspicious: true,
    favorable: [
      "Starting new ventures",
      "Installing deities",
      "Light religious rituals",
      "Coronations and inaugurations",
    ],
    avoid: ["Travel to unknown places", "Aggressive disputes"],
    description:
      "The first day of the lunar fortnight. A Nanda tithi ruled by Agni — a joyful, fresh-start day suitable for light, hopeful beginnings.",
  },
  {
    name: "Dwitiya",
    hindi: "द्वितीया",
    number: 2,
    deity: "Brahma",
    nature: "Bhadra",
    auspicious: true,
    favorable: [
      "Buying property or vehicles",
      "Laying foundation stones",
      "Beginning education",
      "Marriage arrangements",
    ],
    avoid: ["Quarrels", "Risky financial moves"],
    description:
      "A Bhadra tithi associated with Brahma. Supports auspicious, stable undertakings that need thoughtful planning.",
  },
  {
    name: "Tritiya",
    hindi: "तृतीया",
    number: 3,
    deity: "Gauri",
    nature: "Jaya",
    auspicious: true,
    favorable: [
      "Jewellery purchase",
      "Wearing new clothes",
      "Sacred ceremonies for women",
      "Akshaya Tritiya style investments",
    ],
    avoid: ["Commencing war-like disputes", "Harsh speech"],
    description:
      "A Jaya tithi ruled by Gauri. Victorious for arts, beauty, and feminine grace; excellent for purchases intended to last.",
  },
  {
    name: "Chaturthi",
    hindi: "चतुर्थी",
    number: 4,
    deity: "Ganesha",
    nature: "Rikta",
    auspicious: false,
    favorable: [
      "Ganesha worship",
      "Removal of obstacles rituals",
      "Meditation and introspection",
    ],
    avoid: [
      "Starting new ventures",
      "Travel",
      "Marriage or celebratory events",
    ],
    description:
      "A Rikta tithi presided over by Ganesha. Devoted to removal of obstacles, but generally unsuitable for starting fresh work.",
  },
  {
    name: "Panchami",
    hindi: "पञ्चमी",
    number: 5,
    deity: "Naga",
    nature: "Purna",
    auspicious: true,
    favorable: [
      "Medicine and healing rituals",
      "Learning mantras",
      "Snake worship (Naga Panchami)",
      "Financial planning",
    ],
    avoid: ["Borrowing money", "Surgeries on extremities"],
    description:
      "A Purna tithi associated with the Nagas. Complete and full — favourable for medicine, study, and wealth-oriented rituals.",
  },
  {
    name: "Shashthi",
    hindi: "षष्ठी",
    number: 6,
    deity: "Kartikeya",
    nature: "Nanda",
    auspicious: true,
    favorable: [
      "Worship of Kartikeya / Skanda",
      "Coronations",
      "Valour-related efforts",
      "Naming ceremonies",
    ],
    avoid: ["Southward travel", "Major surgeries"],
    description:
      "A Nanda tithi of Kartikeya. Strength and courage flow well; good for martial arts, leadership, and child-related rites.",
  },
  {
    name: "Saptami",
    hindi: "सप्तमी",
    number: 7,
    deity: "Surya",
    nature: "Bhadra",
    auspicious: true,
    favorable: [
      "Surya worship",
      "Travel",
      "Commencing journeys",
      "Government-related work",
    ],
    avoid: ["Disputes with authority", "Late-night activities"],
    description:
      "A Bhadra tithi ruled by the Sun. Brings clarity, vitality, and support from authority — ideal for leadership and travel.",
  },
  {
    name: "Ashtami",
    hindi: "अष्टमी",
    number: 8,
    deity: "Shiva",
    nature: "Jaya",
    auspicious: true,
    favorable: [
      "Shiva worship",
      "Martial practice",
      "Debates and contests",
      "Cutting through obstacles",
    ],
    avoid: ["Marriage", "Long journeys"],
    description:
      "A Jaya tithi of Lord Shiva. Fierce and victorious — best for disciplined, transformative efforts rather than celebrations.",
  },
  {
    name: "Navami",
    hindi: "नवमी",
    number: 9,
    deity: "Durga",
    nature: "Rikta",
    auspicious: false,
    favorable: [
      "Durga worship",
      "Protective rituals",
      "Shakti sadhana",
    ],
    avoid: [
      "Beginning new work",
      "House-warming",
      "Joyful celebrations",
    ],
    description:
      "A Rikta tithi of Durga. Powerful for spiritual protection, but considered empty for worldly starts.",
  },
  {
    name: "Dashami",
    hindi: "दशमी",
    number: 10,
    deity: "Dharma (Yama)",
    nature: "Purna",
    auspicious: true,
    favorable: [
      "Righteous actions",
      "Charitable work",
      "Conflict resolution",
      "Long journeys",
    ],
    avoid: ["Deceitful dealings", "Cutting of relationships"],
    description:
      "A Purna tithi ruled by Dharma. Complete and stable — ideal for duty-bound, moral, and long-standing commitments.",
  },
  {
    name: "Ekadashi",
    hindi: "एकादशी",
    number: 11,
    deity: "Vishnu",
    nature: "Nanda",
    auspicious: true,
    favorable: [
      "Fasting and spiritual sadhana",
      "Vishnu worship",
      "Chanting and japa",
      "Donations",
    ],
    avoid: ["Heavy meals (traditional fast)", "Initiating worldly deals"],
    description:
      "A Nanda tithi dedicated to Vishnu. The most spiritually charged tithi — traditionally observed with a fast for liberation and inner purity.",
  },
  {
    name: "Dwadashi",
    hindi: "द्वादशी",
    number: 12,
    deity: "Vishnu",
    nature: "Bhadra",
    auspicious: true,
    favorable: [
      "Breaking Ekadashi fast (parana)",
      "Vishnu worship",
      "Charity to brahmanas",
      "Travel",
    ],
    avoid: ["Aggression", "Overeating"],
    description:
      "A Bhadra tithi of Vishnu. A calm, grace-filled day to complete Ekadashi observances and continue dharmic actions.",
  },
  {
    name: "Trayodashi",
    hindi: "त्रयोदशी",
    number: 13,
    deity: "Kamadeva",
    nature: "Jaya",
    auspicious: true,
    favorable: [
      "Friendly gatherings",
      "Romantic commitments",
      "Fine arts and music",
      "Pradosha worship of Shiva",
    ],
    avoid: ["Quarrels with partners", "Cruel speech"],
    description:
      "A Jaya tithi linked with Kamadeva. Sweet, sociable, and amorous — excellent for love, arts, and Pradosha vrata.",
  },
  {
    name: "Chaturdashi",
    hindi: "चतुर्दशी",
    number: 14,
    deity: "Shiva",
    nature: "Rikta",
    auspicious: false,
    favorable: [
      "Shiva worship (Masik Shivaratri)",
      "Tantric sadhana",
      "Ancestor rites",
    ],
    avoid: [
      "Starting a business",
      "Marriage",
      "Travel for pleasure",
    ],
    description:
      "A Rikta tithi of Shiva. Strong for intense sadhana and ancestor rituals, but unsuitable for joyful beginnings.",
  },
  {
    name: "Purnima / Amavasya",
    hindi: "पूर्णिमा / अमावस्या",
    number: 15,
    deity: "Chandra (Purnima) / Pitr (Amavasya)",
    nature: "Purna",
    auspicious: true,
    favorable: [
      "Satyanarayan katha (Purnima)",
      "Ancestor tarpan (Amavasya)",
      "Charity and donations",
      "Meditation and japa",
    ],
    avoid: [
      "Emotional impulsivity",
      "Heavy travel on Amavasya",
    ],
    description:
      "A Purna tithi: full-moon Purnima of the Shukla paksha is highly auspicious for charity and Chandra worship, while Amavasya in the Krishna paksha is best reserved for ancestor rituals and introspection.",
  },
];

export function getTithiInfo(name: string): TithiInfo | null {
  if (!name) return null;
  const needle = name.trim().toLowerCase();
  return (
    TITHIS.find(
      (t) =>
        t.name.toLowerCase() === needle ||
        t.hindi === name.trim() ||
        t.hindi.toLowerCase() === needle,
    ) ?? null
  );
}

// ────────────────────────────────────────────────────────────────────────────
// Nakshatra
// ────────────────────────────────────────────────────────────────────────────

export interface NakshatraActivity {
  name: string;
  hindi: string;
  deity: string;
  ruler: string;
  nature: "Swift" | "Fixed" | "Sharp" | "Soft" | "Movable" | "Mixed" | "Fierce";
  favorable: string[];
  avoid: string[];
  description: string;
}

export const NAKSHATRA_ACTIVITIES: NakshatraActivity[] = [
  {
    name: "Ashwini",
    hindi: "अश्विनी",
    deity: "Ashwini Kumaras",
    ruler: "Ketu",
    nature: "Swift",
    favorable: [
      "Travel",
      "Starting fresh projects",
      "Medical treatment and healing",
      "Buying vehicles",
      "Learning new skills",
    ],
    avoid: ["Marriage", "Long-term commitments", "House-warming"],
    description:
      "A swift nakshatra of the celestial healers. Excellent for quick, energetic beginnings but not for commitments that need long stability.",
  },
  {
    name: "Bharani",
    hindi: "भरणी",
    deity: "Yama",
    ruler: "Venus",
    nature: "Fierce",
    favorable: [
      "Destruction of negativity",
      "Property disputes resolution",
      "Finishing difficult tasks",
    ],
    avoid: ["Marriage", "Auspicious ceremonies", "Starting a new business"],
    description:
      "A fierce nakshatra ruled by Yama. Useful for ending what must be ended, but unsuitable for joyful starts.",
  },
  {
    name: "Krittika",
    hindi: "कृत्तिका",
    deity: "Agni",
    ruler: "Sun",
    nature: "Sharp",
    favorable: [
      "Cutting hair (first time)",
      "Surgeries and incisions",
      "Fire rituals",
      "Legal victories",
    ],
    avoid: ["Marriage", "Gentle devotional work"],
    description:
      "A sharp nakshatra of Agni. Penetrating and cleansing — ideal for cutting, fire, and decisive action.",
  },
  {
    name: "Rohini",
    hindi: "रोहिणी",
    deity: "Brahma / Prajapati",
    ruler: "Moon",
    nature: "Fixed",
    favorable: [
      "House-warming (Griha Pravesh)",
      "Planting trees and crops",
      "Marriage",
      "Arts, music, and creative work",
      "Buying durable goods",
    ],
    avoid: ["Destructive work", "Surgery"],
    description:
      "A fixed nakshatra of Brahma and the Moon's favourite. Supremely auspicious for growth, beauty, and long-lasting foundations.",
  },
  {
    name: "Mrigashira",
    hindi: "मृगशिरा",
    deity: "Soma (Moon)",
    ruler: "Mars",
    nature: "Soft",
    favorable: [
      "Travel",
      "Romantic ventures",
      "Buying clothes and ornaments",
      "Searching for something lost",
    ],
    avoid: ["Long commitments", "Aggressive confrontation"],
    description:
      "A soft, searching nakshatra. Gentle and exploratory — ideal for travel, romance, and inquiry.",
  },
  {
    name: "Ardra",
    hindi: "आर्द्रा",
    deity: "Rudra",
    ruler: "Rahu",
    nature: "Sharp",
    favorable: [
      "Research and deep study",
      "Destroying enemies",
      "Piercing old patterns",
    ],
    avoid: ["Marriage", "House-warming", "Buying ornaments"],
    description:
      "A sharp nakshatra of Rudra. Stormy and transformative — favours deep breakthroughs but not joyful social starts.",
  },
  {
    name: "Punarvasu",
    hindi: "पुनर्वसु",
    deity: "Aditi",
    ruler: "Jupiter",
    nature: "Movable",
    favorable: [
      "Travel and returning home",
      "Starting new ventures",
      "Spiritual study",
      "Reconciliation",
    ],
    avoid: ["Stationary long-term work"],
    description:
      "A movable nakshatra of Aditi. Restorative and renewing — great for restarts, returns, and re-establishing harmony.",
  },
  {
    name: "Pushya",
    hindi: "पुष्य",
    deity: "Brihaspati",
    ruler: "Saturn",
    nature: "Soft",
    favorable: [
      "Almost all auspicious activities",
      "Marriage",
      "House-warming",
      "Coronations",
      "Buying gold",
      "Education ceremonies",
    ],
    avoid: ["Marriage in some traditions (regional variation)"],
    description:
      "Traditionally the most auspicious of all nakshatras, called the 'king of nakshatras'. Suitable for nearly every auspicious undertaking.",
  },
  {
    name: "Ashlesha",
    hindi: "आश्लेषा",
    deity: "Nagas",
    ruler: "Mercury",
    nature: "Sharp",
    favorable: [
      "Tantric sadhana",
      "Strategic planning",
      "Dealing with hidden enemies",
    ],
    avoid: ["Marriage", "Joyful ceremonies", "New friendships"],
    description:
      "A sharp nakshatra of the serpents. Deep and penetrating, but unsuitable for outward celebratory work.",
  },
  {
    name: "Magha",
    hindi: "मघा",
    deity: "Pitrs (Ancestors)",
    ruler: "Ketu",
    nature: "Fierce",
    favorable: [
      "Ancestor rituals (Shraddha)",
      "Asserting authority",
      "Coronations",
    ],
    avoid: ["Starting happy events", "Marriage", "House-warming"],
    description:
      "A fierce nakshatra of the ancestors. Regal but sombre — best reserved for authority work and ancestor rites.",
  },
  {
    name: "Purva Phalguni",
    hindi: "पूर्वा फाल्गुनी",
    deity: "Bhaga",
    ruler: "Venus",
    nature: "Fierce",
    favorable: [
      "Marriage (with caveats)",
      "Pleasurable gatherings",
      "Arts and entertainment",
    ],
    avoid: ["Serious business contracts", "Harsh negotiations"],
    description:
      "A fierce yet pleasure-loving nakshatra of Bhaga. Favours romance, luxury, and creative arts.",
  },
  {
    name: "Uttara Phalguni",
    hindi: "उत्तरा फाल्गुनी",
    deity: "Aryaman",
    ruler: "Sun",
    nature: "Fixed",
    favorable: [
      "Marriage",
      "Contracts and agreements",
      "House-warming",
      "Charity",
    ],
    avoid: ["Rash decisions"],
    description:
      "A fixed nakshatra of Aryaman. Supremely stable — one of the best for marriage and formal commitments.",
  },
  {
    name: "Hasta",
    hindi: "हस्त",
    deity: "Savitr (Sun)",
    ruler: "Moon",
    nature: "Swift",
    favorable: [
      "Handicrafts",
      "Travel",
      "Buying and selling",
      "Medical healing",
      "Learning new skills",
    ],
    avoid: ["Heavy, static commitments"],
    description:
      "A swift nakshatra of the Sun. Deft and quick-witted — perfect for craft, commerce, and skilful action.",
  },
  {
    name: "Chitra",
    hindi: "चित्रा",
    deity: "Tvashtr / Vishwakarma",
    ruler: "Mars",
    nature: "Soft",
    favorable: [
      "Building and architecture",
      "Buying jewellery and clothes",
      "Arts, design, decoration",
      "House-warming",
    ],
    avoid: ["Surgery", "Military conflict"],
    description:
      "A soft, creative nakshatra of the celestial architect. Excellent for construction, design, and aesthetic work.",
  },
  {
    name: "Swati",
    hindi: "स्वाती",
    deity: "Vayu",
    ruler: "Rahu",
    nature: "Movable",
    favorable: [
      "Travel and trade",
      "Diplomacy",
      "Starting businesses",
      "Learning",
    ],
    avoid: ["Rigid long-term contracts"],
    description:
      "A movable nakshatra of the wind. Flexible and independent — ideal for commerce, negotiation, and travel.",
  },
  {
    name: "Vishakha",
    hindi: "विशाखा",
    deity: "Indra-Agni",
    ruler: "Jupiter",
    nature: "Mixed",
    favorable: [
      "Goal-oriented ventures",
      "Political work",
      "Festivals",
      "Publishing",
    ],
    avoid: ["Marriage (traditionally)", "Travel far from home"],
    description:
      "A mixed nakshatra of Indra and Agni. Ambitious and determined — great for pursuits requiring focused effort.",
  },
  {
    name: "Anuradha",
    hindi: "अनुराधा",
    deity: "Mitra",
    ruler: "Saturn",
    nature: "Soft",
    favorable: [
      "Friendships and alliances",
      "Travel",
      "Group endeavours",
      "Devotional music",
    ],
    avoid: ["Solitary aggressive undertakings"],
    description:
      "A soft nakshatra of Mitra. Warm and devoted — auspicious for friendship, cooperation, and spiritual companionship.",
  },
  {
    name: "Jyeshtha",
    hindi: "ज्येष्ठा",
    deity: "Indra",
    ruler: "Mercury",
    nature: "Sharp",
    favorable: [
      "Gaining authority",
      "Secret intelligence work",
      "Sharp strategic decisions",
    ],
    avoid: ["Marriage", "House-warming", "Joyful events"],
    description:
      "A sharp nakshatra of Indra. Powerful but harsh — better for seniority and strategy than celebration.",
  },
  {
    name: "Mula",
    hindi: "मूल",
    deity: "Nirriti",
    ruler: "Ketu",
    nature: "Sharp",
    favorable: [
      "Uprooting old problems",
      "Research",
      "Ayurvedic herbal work",
    ],
    avoid: ["Marriage", "House-warming", "New business"],
    description:
      "A sharp nakshatra of Nirriti. Goes to the root — helpful for deep healing, unsuitable for outward starts.",
  },
  {
    name: "Purva Ashadha",
    hindi: "पूर्वाषाढा",
    deity: "Apah (Waters)",
    ruler: "Venus",
    nature: "Fierce",
    favorable: [
      "Declarations of victory",
      "Naval or water-related work",
      "Debates and competitions",
    ],
    avoid: ["Harsh endings", "Marriage (regional view)"],
    description:
      "A fierce nakshatra of the waters. Invigorating and victorious — great for morale and bold statements.",
  },
  {
    name: "Uttara Ashadha",
    hindi: "उत्तराषाढा",
    deity: "Vishwadevas",
    ruler: "Sun",
    nature: "Fixed",
    favorable: [
      "Marriage",
      "Long-term contracts",
      "Laying foundations",
      "Political alliances",
    ],
    avoid: ["Quick, impulsive actions"],
    description:
      "A fixed nakshatra of the Vishwadevas. Unshakeable — one of the best for enduring commitments.",
  },
  {
    name: "Shravana",
    hindi: "श्रवण",
    deity: "Vishnu",
    ruler: "Moon",
    nature: "Movable",
    favorable: [
      "Listening and learning",
      "Starting education",
      "Music",
      "Travel",
      "Initiations",
    ],
    avoid: ["Pure stationary work"],
    description:
      "A movable nakshatra of Vishnu. Reflective and attentive — superb for study, speech, and spiritual listening.",
  },
  {
    name: "Dhanishta",
    hindi: "धनिष्ठा",
    deity: "Eight Vasus",
    ruler: "Mars",
    nature: "Movable",
    favorable: [
      "Buying property",
      "Music and dance",
      "Group work",
      "Wealth-generating efforts",
    ],
    avoid: ["Marriage (traditional caution)"],
    description:
      "A movable nakshatra of the Vasus. Rhythmic and wealth-oriented — excellent for arts, music, and prosperity.",
  },
  {
    name: "Shatabhisha",
    hindi: "शतभिषा",
    deity: "Varuna",
    ruler: "Rahu",
    nature: "Movable",
    favorable: [
      "Medical healing",
      "Astrology and occult study",
      "Water-related work",
    ],
    avoid: ["Marriage", "Celebratory starts"],
    description:
      "A movable nakshatra of Varuna. The healer of a hundred physicians — strong for health, research, and the mystical.",
  },
  {
    name: "Purva Bhadrapada",
    hindi: "पूर्वाभाद्रपदा",
    deity: "Aja Ekapada",
    ruler: "Jupiter",
    nature: "Fierce",
    favorable: [
      "Intense tapasya",
      "Yogic practice",
      "Ending old karmas",
    ],
    avoid: ["Marriage", "Light social events"],
    description:
      "A fierce nakshatra of Aja Ekapada. Austere and transformative — best for discipline, not celebration.",
  },
  {
    name: "Uttara Bhadrapada",
    hindi: "उत्तराभाद्रपदा",
    deity: "Ahir Budhnya",
    ruler: "Saturn",
    nature: "Fixed",
    favorable: [
      "Deep meditation",
      "Charitable foundations",
      "Long-term commitments",
      "Marriage",
    ],
    avoid: ["Rash impulsive actions"],
    description:
      "A fixed nakshatra of the deep-sea serpent. Profound and settled — good for wisdom, charity, and committed bonds.",
  },
  {
    name: "Revati",
    hindi: "रेवती",
    deity: "Pushan",
    ruler: "Mercury",
    nature: "Soft",
    favorable: [
      "Travel (especially overseas)",
      "Spiritual journeys",
      "Completion of projects",
      "Charity",
    ],
    avoid: ["Beginning aggressive battles"],
    description:
      "A soft nakshatra of Pushan, protector of travellers. Nourishing and completing — perfect for journeys and closure.",
  },
];

export function getNakshatraActivity(name: string): NakshatraActivity | null {
  if (!name) return null;
  const needle = name.trim().toLowerCase();
  return (
    NAKSHATRA_ACTIVITIES.find(
      (n) =>
        n.name.toLowerCase() === needle ||
        n.hindi === name.trim() ||
        n.hindi.toLowerCase() === needle,
    ) ?? null
  );
}

// ────────────────────────────────────────────────────────────────────────────
// Yoga
// ────────────────────────────────────────────────────────────────────────────

export interface YogaInfo {
  name: string;
  hindi: string;
  auspicious: boolean;
  nature: "Benefic" | "Malefic" | "Neutral";
  description: string;
}

const MALEFIC_YOGAS: ReadonlySet<string> = new Set([
  "Vishkambha",
  "Atiganda",
  "Shula",
  "Ganda",
  "Vyaghata",
  "Vajra",
  "Vyatipata",
  "Parigha",
  "Vaidhriti",
]);

const YOGA_NAMES: ReadonlyArray<{ name: string; hindi: string; desc: string }> = [
  { name: "Vishkambha", hindi: "विष्कुम्भ", desc: "Obstructive influence — avoid starting important work in its early hours." },
  { name: "Priti", hindi: "प्रीति", desc: "Brings affection and harmony — good for friendships and romantic matters." },
  { name: "Ayushman", hindi: "आयुष्मान्", desc: "Grants longevity and vitality — auspicious for health-related beginnings." },
  { name: "Saubhagya", hindi: "सौभाग्य", desc: "Bestows good fortune — favourable for marriage and auspicious ceremonies." },
  { name: "Shobhana", hindi: "शोभन", desc: "Beautiful and uplifting — ideal for celebrations and aesthetic work." },
  { name: "Atiganda", hindi: "अतिगण्ड", desc: "Carries a knot of obstacles — avoid major undertakings." },
  { name: "Sukarma", hindi: "सुकर्मा", desc: "Rewards righteous actions — excellent for virtuous and charitable work." },
  { name: "Dhriti", hindi: "धृति", desc: "Gives steadfastness — good for foundations and stable commitments." },
  { name: "Shula", hindi: "शूल", desc: "Sharp and piercing — avoid travel and risky undertakings." },
  { name: "Ganda", hindi: "गण्ड", desc: "Knotty and complicated — inauspicious for smooth beginnings." },
  { name: "Vriddhi", hindi: "वृद्धि", desc: "Promotes growth — very favourable for business and investments." },
  { name: "Dhruva", hindi: "ध्रुव", desc: "Firm and unchanging — ideal for permanent foundations and fixed assets." },
  { name: "Vyaghata", hindi: "व्याघात", desc: "Signifies collision and harm — avoid critical activities." },
  { name: "Harshana", hindi: "हर्षण", desc: "Brings joy and gladness — auspicious for celebration and learning." },
  { name: "Vajra", hindi: "वज्र", desc: "Harsh and thunderbolt-like — avoid delicate or new ventures." },
  { name: "Siddhi", hindi: "सिद्धि", desc: "Grants accomplishment — excellent for any important work." },
  { name: "Vyatipata", hindi: "व्यतीपात", desc: "Highly inauspicious — avoid starting anything significant." },
  { name: "Variyan", hindi: "वरीयान्", desc: "Provides comfort and ease — good for pleasures and creative arts." },
  { name: "Parigha", hindi: "परिघ", desc: "Obstructive like a barrier — avoid new beginnings." },
  { name: "Shiva", hindi: "शिव", desc: "Benevolent and protective — favourable for spiritual and worldly success." },
  { name: "Siddha", hindi: "सिद्ध", desc: "Established and accomplished — auspicious for all serious work." },
  { name: "Sadhya", hindi: "साध्य", desc: "Accomplishable — supports goal-oriented effort." },
  { name: "Shubha", hindi: "शुभ", desc: "Purely auspicious — one of the best yogas for any activity." },
  { name: "Shukla", hindi: "शुक्ल", desc: "Bright and pure — good for learning and spiritual starts." },
  { name: "Brahma", hindi: "ब्रह्म", desc: "Wisdom-giving — supports knowledge, rituals, and elevated work." },
  { name: "Indra", hindi: "इन्द्र", desc: "Regal and authoritative — favours leadership and public success." },
  { name: "Vaidhriti", hindi: "वैधृति", desc: "Disruptive and divisive — strongly avoid important undertakings." },
];

export const YOGAS: YogaInfo[] = YOGA_NAMES.map((y) => {
  const malefic = MALEFIC_YOGAS.has(y.name);
  return {
    name: y.name,
    hindi: y.hindi,
    auspicious: !malefic,
    nature: malefic ? "Malefic" : "Benefic",
    description: y.desc,
  };
});

export function getYogaInfo(name: string): YogaInfo | null {
  if (!name) return null;
  const needle = name.trim().toLowerCase();
  return (
    YOGAS.find(
      (y) =>
        y.name.toLowerCase() === needle ||
        y.hindi === name.trim() ||
        y.hindi.toLowerCase() === needle,
    ) ?? null
  );
}

// ────────────────────────────────────────────────────────────────────────────
// Karana
// ────────────────────────────────────────────────────────────────────────────

export interface KaranaInfo {
  name: string;
  hindi: string;
  type: "Fixed" | "Movable";
  auspicious: boolean;
  description: string;
}

export const KARANAS: KaranaInfo[] = [
  {
    name: "Bava",
    hindi: "बव",
    type: "Movable",
    auspicious: true,
    description:
      "A movable karana that supports stability-seeking activity and steady progress.",
  },
  {
    name: "Balava",
    hindi: "बालव",
    type: "Movable",
    auspicious: true,
    description:
      "A movable karana favourable for learning, childlike creativity, and fresh ventures.",
  },
  {
    name: "Kaulava",
    hindi: "कौलव",
    type: "Movable",
    auspicious: true,
    description:
      "A movable karana that supports relationships, family affairs, and social bonds.",
  },
  {
    name: "Taitila",
    hindi: "तैतिल",
    type: "Movable",
    auspicious: true,
    description:
      "A movable karana that favours love, friendship, and cordial gatherings.",
  },
  {
    name: "Gara",
    hindi: "गर",
    type: "Movable",
    auspicious: true,
    description:
      "A movable karana good for agriculture, sowing, and work that grows over time.",
  },
  {
    name: "Vanija",
    hindi: "वणिज",
    type: "Movable",
    auspicious: true,
    description:
      "A movable karana of the merchant — very favourable for trade and business dealings.",
  },
  {
    name: "Vishti (Bhadra)",
    hindi: "विष्टि (भद्रा)",
    type: "Movable",
    auspicious: false,
    description:
      "A movable karana known as Bhadra. Considered malefic — avoid important work during its duration.",
  },
  {
    name: "Shakuni",
    hindi: "शकुनि",
    type: "Fixed",
    auspicious: true,
    description:
      "A fixed karana falling in the second half of Chaturdashi of Krishna paksha; suitable for medicinal and mantra work.",
  },
  {
    name: "Chatushpada",
    hindi: "चतुष्पाद",
    type: "Fixed",
    auspicious: true,
    description:
      "A fixed karana of the first half of Amavasya — good for cattle-related and ancestor rituals.",
  },
  {
    name: "Naga",
    hindi: "नाग",
    type: "Fixed",
    auspicious: true,
    description:
      "A fixed karana of the second half of Amavasya — favourable for Naga worship and protective rituals.",
  },
  {
    name: "Kintughna",
    hindi: "किंस्तुघ्न",
    type: "Fixed",
    auspicious: true,
    description:
      "A fixed karana in the first half of Shukla Pratipada — considered auspicious for beginning fresh work.",
  },
];

export function getKaranaInfo(name: string): KaranaInfo | null {
  if (!name) return null;
  const needle = name.trim().toLowerCase();
  return (
    KARANAS.find((k) => {
      const kName = k.name.toLowerCase();
      const kHindi = k.hindi;
      const kBase = kName.split(" ")[0];
      return (
        kName === needle ||
        kBase === needle ||
        kHindi === name.trim() ||
        kHindi.toLowerCase() === needle
      );
    }) ?? null
  );
}

// ────────────────────────────────────────────────────────────────────────────
// Vara (weekday)
// ────────────────────────────────────────────────────────────────────────────

export interface VaraInfo {
  english: string;
  hindi: string;
  ruler: string;
  deity: string;
  color: string;
  colorHex: string;
  mantra: string;
  mantraTransliteration: string;
  mantraMeaning: string;
  favorable: string[];
  fasts: string[];
  description: string;
}

export const VARAS: Record<string, VaraInfo> = {
  Sunday: {
    english: "Sunday",
    hindi: "रविवार",
    ruler: "Sun (Surya)",
    deity: "Surya / Shiva",
    color: "Red / Orange",
    colorHex: "#FF5C16",
    mantra: "ॐ ह्रां ह्रीं ह्रौं सः सूर्याय नमः",
    mantraTransliteration: "Om Hraam Hreem Hraum Sah Suryaya Namah",
    mantraMeaning:
      "Salutations to Surya, the Sun — bestower of radiance, leadership, and vitality.",
    favorable: [
      "Leadership and authority work",
      "Government-related matters",
      "Health and vitality rituals",
      "Meeting superiors",
    ],
    fasts: [
      "Ravivar Vrat for Surya — abstain from salt, eat one meal at sunset",
    ],
    description:
      "Ruled by the Sun, Sunday energizes leadership, confidence, and self-expression. Best for activities that need visibility and recognition.",
  },
  Monday: {
    english: "Monday",
    hindi: "सोमवार",
    ruler: "Moon (Chandra)",
    deity: "Shiva",
    color: "White",
    colorHex: "#FFFFFF",
    mantra: "ॐ श्रां श्रीं श्रौं सः चन्द्रमसे नमः",
    mantraTransliteration: "Om Shraam Shreem Shraum Sah Chandramase Namah",
    mantraMeaning:
      "Salutations to Chandra, the Moon — giver of calmness, nourishment, and emotional balance.",
    favorable: [
      "Emotional and family matters",
      "Mother-related decisions",
      "Water-related activities",
      "Meditation and devotional work",
    ],
    fasts: [
      "Somvar Vrat for Shiva — single meal, offering bilva leaves",
      "Solah Somvar Vrat (sixteen Mondays)",
    ],
    description:
      "Ruled by the Moon and dedicated to Shiva, Monday nurtures peace, intuition, and emotional healing.",
  },
  Tuesday: {
    english: "Tuesday",
    hindi: "मंगलवार",
    ruler: "Mars (Mangal)",
    deity: "Hanuman",
    color: "Red",
    colorHex: "#C1121F",
    mantra: "ॐ क्रां क्रीं क्रौं सः भौमाय नमः",
    mantraTransliteration: "Om Kraam Kreem Kraum Sah Bhaumaya Namah",
    mantraMeaning:
      "Salutations to Mangal, the red planet — protector and bestower of courage and strength.",
    favorable: [
      "Courageous undertakings",
      "Property and land matters",
      "Martial practice and sports",
      "Debt resolution",
    ],
    fasts: [
      "Mangalvar Vrat for Hanuman — offering sindoor, chanting Hanuman Chalisa",
    ],
    description:
      "Ruled by Mars and devoted to Hanuman, Tuesday fuels courage, discipline, and protective energy.",
  },
  Wednesday: {
    english: "Wednesday",
    hindi: "बुधवार",
    ruler: "Mercury (Budh)",
    deity: "Ganesha",
    color: "Green",
    colorHex: "#16A34A",
    mantra: "ॐ ब्रां ब्रीं ब्रौं सः बुधाय नमः",
    mantraTransliteration: "Om Braam Breem Braum Sah Budhaya Namah",
    mantraMeaning:
      "Salutations to Budha, the planet of intellect — giver of wisdom, speech, and commerce.",
    favorable: [
      "Business dealings",
      "Education and learning",
      "Communication and writing",
      "Travel for trade",
    ],
    fasts: [
      "Budhvar Vrat for Ganesha — offering durva grass and modak",
    ],
    description:
      "Ruled by Mercury and devoted to Ganesha, Wednesday sharpens intellect, communication, and commercial success.",
  },
  Thursday: {
    english: "Thursday",
    hindi: "गुरुवार",
    ruler: "Jupiter (Brihaspati)",
    deity: "Vishnu / Brihaspati",
    color: "Yellow",
    colorHex: "#EDC43A",
    mantra: "ॐ ग्रां ग्रीं ग्रौं सः गुरवे नमः",
    mantraTransliteration: "Om Graam Greem Graum Sah Gurave Namah",
    mantraMeaning:
      "Salutations to Brihaspati, the guru of the gods — bestower of wisdom, dharma, and auspiciousness.",
    favorable: [
      "Education and initiations",
      "Marriage ceremonies",
      "Spiritual and religious work",
      "Financial planning",
    ],
    fasts: [
      "Guruvar Vrat for Vishnu / Brihaspati — offering bananas and turmeric, wearing yellow",
    ],
    description:
      "Ruled by Jupiter and devoted to Vishnu, Thursday is the most auspicious weekday for dharmic, educational, and marital work.",
  },
  Friday: {
    english: "Friday",
    hindi: "शुक्रवार",
    ruler: "Venus (Shukra)",
    deity: "Lakshmi / Santoshi Ma",
    color: "White / Pink",
    colorHex: "#F472B6",
    mantra: "ॐ द्रां द्रीं द्रौं सः शुक्राय नमः",
    mantraTransliteration: "Om Draam Dreem Draum Sah Shukraya Namah",
    mantraMeaning:
      "Salutations to Shukra, the teacher of the asuras — bestower of love, wealth, and refined pleasures.",
    favorable: [
      "Love and marriage matters",
      "Arts, beauty, luxury purchases",
      "Wealth-attracting rituals",
      "Diplomatic conversations",
    ],
    fasts: [
      "Shukravar Vrat for Santoshi Ma / Lakshmi — offering jaggery and gram",
    ],
    description:
      "Ruled by Venus and devoted to Lakshmi, Friday graces love, beauty, and prosperity.",
  },
  Saturday: {
    english: "Saturday",
    hindi: "शनिवार",
    ruler: "Saturn (Shani)",
    deity: "Shani / Hanuman",
    color: "Dark Blue / Black",
    colorHex: "#1E3A8A",
    mantra: "ॐ प्रां प्रीं प्रौं सः शनैश्चराय नमः",
    mantraTransliteration: "Om Praam Preem Praum Sah Shanaishcharaya Namah",
    mantraMeaning:
      "Salutations to Shanaishchara, the slow-moving Saturn — giver of discipline, justice, and karmic balance.",
    favorable: [
      "Disciplined long-term work",
      "Service to the needy",
      "Removing obstacles through Hanuman worship",
      "Professional commitments",
    ],
    fasts: [
      "Shanivar Vrat for Shani — offering sesame oil, black sesame, and urad",
      "Hanuman puja for Saturn's relief",
    ],
    description:
      "Ruled by Saturn and associated with Shani and Hanuman, Saturday favours hard work, humility, and the release of karmic burdens.",
  },
};

// ────────────────────────────────────────────────────────────────────────────
// Choghadiya
// ────────────────────────────────────────────────────────────────────────────

export type ChoghadiyaName =
  | "Amrit"
  | "Shubh"
  | "Labh"
  | "Char"
  | "Rog"
  | "Kaal"
  | "Udveg";

export interface ChoghadiyaInfo {
  name: ChoghadiyaName;
  hindi: string;
  auspicious: boolean;
  ruler: string;
  description: string;
}

export const CHOGHADIYAS: Record<ChoghadiyaName, ChoghadiyaInfo> = {
  Amrit: {
    name: "Amrit",
    hindi: "अमृत",
    auspicious: true,
    ruler: "Moon",
    description: "Best for all good work, especially starting new ventures.",
  },
  Shubh: {
    name: "Shubh",
    hindi: "शुभ",
    auspicious: true,
    ruler: "Jupiter",
    description: "Ideal for marriage, house-warming, and religious ceremonies.",
  },
  Labh: {
    name: "Labh",
    hindi: "लाभ",
    auspicious: true,
    ruler: "Mercury",
    description: "Favours education, business, and financial gains.",
  },
  Char: {
    name: "Char",
    hindi: "चर",
    auspicious: true,
    ruler: "Venus",
    description: "Good for travel, short journeys, and moving assets.",
  },
  Rog: {
    name: "Rog",
    hindi: "रोग",
    auspicious: false,
    ruler: "Mars",
    description: "Avoid — associated with illness and conflicts.",
  },
  Kaal: {
    name: "Kaal",
    hindi: "काल",
    auspicious: false,
    ruler: "Saturn",
    description: "Avoid — brings delay, obstacles, and inaction.",
  },
  Udveg: {
    name: "Udveg",
    hindi: "उद्वेग",
    auspicious: false,
    ruler: "Sun",
    description: "Avoid new work — tension, worry, and anxiety dominate.",
  },
};

const DAY_CHOGHADIYA_SEQUENCES: Record<string, ChoghadiyaName[]> = {
  Sunday: ["Udveg", "Char", "Labh", "Amrit", "Kaal", "Shubh", "Rog", "Udveg"],
  Monday: ["Amrit", "Kaal", "Shubh", "Rog", "Udveg", "Char", "Labh", "Amrit"],
  Tuesday: ["Rog", "Udveg", "Char", "Labh", "Amrit", "Kaal", "Shubh", "Rog"],
  Wednesday: ["Labh", "Amrit", "Kaal", "Shubh", "Rog", "Udveg", "Char", "Labh"],
  Thursday: ["Shubh", "Rog", "Udveg", "Char", "Labh", "Amrit", "Kaal", "Shubh"],
  Friday: ["Char", "Labh", "Amrit", "Kaal", "Shubh", "Rog", "Udveg", "Char"],
  Saturday: ["Kaal", "Shubh", "Rog", "Udveg", "Char", "Labh", "Amrit", "Kaal"],
};

const NIGHT_CHOGHADIYA_SEQUENCES: Record<string, ChoghadiyaName[]> = {
  Sunday: ["Shubh", "Amrit", "Char", "Rog", "Kaal", "Labh", "Udveg", "Shubh"],
  Monday: ["Char", "Rog", "Kaal", "Labh", "Udveg", "Shubh", "Amrit", "Char"],
  Tuesday: ["Kaal", "Labh", "Udveg", "Shubh", "Amrit", "Char", "Rog", "Kaal"],
  Wednesday: ["Udveg", "Shubh", "Amrit", "Char", "Rog", "Kaal", "Labh", "Udveg"],
  Thursday: ["Amrit", "Char", "Rog", "Kaal", "Labh", "Udveg", "Shubh", "Amrit"],
  Friday: ["Rog", "Kaal", "Labh", "Udveg", "Shubh", "Amrit", "Char", "Rog"],
  Saturday: ["Labh", "Udveg", "Shubh", "Amrit", "Char", "Rog", "Kaal", "Labh"],
};

function normalizeWeekday(weekday: string): string | null {
  if (!weekday) return null;
  const cleaned = weekday.trim().toLowerCase();
  const map: Record<string, string> = {
    sunday: "Sunday",
    monday: "Monday",
    tuesday: "Tuesday",
    wednesday: "Wednesday",
    thursday: "Thursday",
    friday: "Friday",
    saturday: "Saturday",
    रविवार: "Sunday",
    सोमवार: "Monday",
    मंगलवार: "Tuesday",
    बुधवार: "Wednesday",
    गुरुवार: "Thursday",
    शुक्रवार: "Friday",
    शनिवार: "Saturday",
  };
  return map[cleaned] ?? map[weekday.trim()] ?? null;
}

export function getDayChoghadiyaSequence(weekdayName: string): ChoghadiyaName[] {
  const key = normalizeWeekday(weekdayName);
  if (!key) return [];
  return [...DAY_CHOGHADIYA_SEQUENCES[key]];
}

export function getNightChoghadiyaSequence(
  weekdayName: string,
): ChoghadiyaName[] {
  const key = normalizeWeekday(weekdayName);
  if (!key) return [];
  return [...NIGHT_CHOGHADIYA_SEQUENCES[key]];
}

export interface ChoghadiyaPeriod {
  name: ChoghadiyaName;
  hindi: string;
  auspicious: boolean;
  start: string;
  end: string;
}

/**
 * Parse "HH:MM", "HH:MM AM/PM", "hh:mm am", "h:mm PM", or 24-hour input
 * into minutes since midnight. Returns null when parsing fails.
 */
function parseTimeToMinutes(input: string): number | null {
  if (!input || typeof input !== "string") return null;
  const trimmed = input.trim();
  if (!trimmed) return null;

  const match = trimmed.match(/^(\d{1,2}):(\d{2})\s*([AaPp][Mm])?$/);
  if (!match) return null;

  let hours = parseInt(match[1], 10);
  const minutes = parseInt(match[2], 10);
  const suffix = match[3]?.toUpperCase();

  if (!Number.isFinite(hours) || !Number.isFinite(minutes)) return null;
  if (minutes < 0 || minutes > 59) return null;

  if (suffix) {
    if (hours < 1 || hours > 12) return null;
    if (suffix === "AM") {
      if (hours === 12) hours = 0;
    } else {
      if (hours !== 12) hours += 12;
    }
  } else {
    if (hours < 0 || hours > 23) return null;
  }

  return hours * 60 + minutes;
}

/**
 * Format minutes since midnight back to "hh:mm AM/PM".
 * Wraps across the 24-hour boundary so night periods print correctly.
 */
export function formatMinutesToTime(minutes: number): string {
  if (!Number.isFinite(minutes)) return "";
  const normalized = ((Math.round(minutes) % 1440) + 1440) % 1440;
  const h24 = Math.floor(normalized / 60);
  const m = normalized % 60;
  const suffix = h24 >= 12 ? "PM" : "AM";
  let h12 = h24 % 12;
  if (h12 === 0) h12 = 12;
  const hh = h12.toString().padStart(2, "0");
  const mm = m.toString().padStart(2, "0");
  return `${hh}:${mm} ${suffix}`;
}

function buildPeriods(
  sequence: ChoghadiyaName[],
  startMinutes: number,
  endMinutesInclusive: number,
): ChoghadiyaPeriod[] {
  const totalMinutes = endMinutesInclusive - startMinutes;
  if (totalMinutes <= 0) return [];
  const step = totalMinutes / 8;
  const periods: ChoghadiyaPeriod[] = [];
  for (let i = 0; i < 8; i++) {
    const name = sequence[i];
    const info = CHOGHADIYAS[name];
    const start = startMinutes + step * i;
    const end = startMinutes + step * (i + 1);
    periods.push({
      name,
      hindi: info.hindi,
      auspicious: info.auspicious,
      start: formatMinutesToTime(start),
      end: formatMinutesToTime(end),
    });
  }
  return periods;
}

export function buildDayChoghadiya(
  weekdayName: string,
  sunriseHHMM: string,
  sunsetHHMM: string,
): ChoghadiyaPeriod[] {
  const sequence = getDayChoghadiyaSequence(weekdayName);
  if (sequence.length === 0) return [];

  const sunrise = parseTimeToMinutes(sunriseHHMM);
  const sunset = parseTimeToMinutes(sunsetHHMM);
  if (sunrise === null || sunset === null) return [];

  const sunsetAdjusted = sunset <= sunrise ? sunset + 24 * 60 : sunset;
  return buildPeriods(sequence, sunrise, sunsetAdjusted);
}

export function buildNightChoghadiya(
  weekdayName: string,
  sunsetHHMM: string,
  nextSunriseHHMM: string,
): ChoghadiyaPeriod[] {
  const sequence = getNightChoghadiyaSequence(weekdayName);
  if (sequence.length === 0) return [];

  const sunset = parseTimeToMinutes(sunsetHHMM);
  const nextSunrise = parseTimeToMinutes(nextSunriseHHMM);
  if (sunset === null || nextSunrise === null) return [];

  const nextAdjusted =
    nextSunrise <= sunset ? nextSunrise + 24 * 60 : nextSunrise;
  return buildPeriods(sequence, sunset, nextAdjusted);
}

// ────────────────────────────────────────────────────────────────────────────
// Activity Suggestions
// ────────────────────────────────────────────────────────────────────────────

export interface ActivityGuide {
  category: string;
  favorable: boolean;
  reason: string;
}

interface ActivityCategory {
  category: string;
  /** Keywords on a nakshatra's `favorable` list that mean the nakshatra supports this activity. */
  nakshatraKeywords: string[];
  /** Keywords on a nakshatra's `avoid` list that mean the nakshatra explicitly cautions against this activity. */
  avoidKeywords: string[];
}

const ACTIVITY_CATEGORIES: ActivityCategory[] = [
  {
    category: "Travel",
    nakshatraKeywords: ["travel", "journey"],
    avoidKeywords: ["travel", "journey"],
  },
  {
    category: "Business / New Ventures",
    nakshatraKeywords: [
      "business",
      "trade",
      "new ventures",
      "starting",
      "new project",
      "financial",
      "commerce",
    ],
    avoidKeywords: ["new business", "new ventures", "starting"],
  },
  {
    category: "Marriage",
    nakshatraKeywords: ["marriage"],
    avoidKeywords: ["marriage"],
  },
  {
    category: "House Warming (Griha Pravesh)",
    nakshatraKeywords: [
      "house-warming",
      "house warming",
      "griha pravesh",
      "foundation",
      "building",
      "construction",
    ],
    avoidKeywords: ["house-warming", "house warming", "griha pravesh"],
  },
  {
    category: "Education / Learning",
    nakshatraKeywords: [
      "education",
      "learning",
      "study",
      "listening",
      "initiation",
    ],
    avoidKeywords: ["education", "learning"],
  },
  {
    category: "Medical Procedures",
    nakshatraKeywords: [
      "medical",
      "healing",
      "surgery",
      "medicine",
      "ayurvedic",
    ],
    avoidKeywords: ["surgery"],
  },
];

function listMatches(items: string[] | undefined, keywords: string[]): boolean {
  if (!items || items.length === 0) return false;
  const normalized = items.map((i) => i.toLowerCase());
  return keywords.some((k) =>
    normalized.some((item) => item.includes(k.toLowerCase())),
  );
}

export function getActivitySuggestions(
  tithi: string,
  nakshatra: string,
  yoga: string,
): ActivityGuide[] {
  const tithiInfo = getTithiInfo(tithi);
  const nakshatraInfo = getNakshatraActivity(nakshatra);
  const yogaInfo = getYogaInfo(yoga);

  return ACTIVITY_CATEGORIES.map(({ category, nakshatraKeywords, avoidKeywords }) => {
    const nakshatraSupports = nakshatraInfo
      ? listMatches(nakshatraInfo.favorable, nakshatraKeywords)
      : false;
    const nakshatraWarns = nakshatraInfo
      ? listMatches(nakshatraInfo.avoid, avoidKeywords)
      : false;

    const tithiOk = tithiInfo ? tithiInfo.auspicious : true;
    const yogaOk = yogaInfo ? yogaInfo.auspicious : true;

    const favorable = Boolean(
      tithiOk && yogaOk && nakshatraSupports && !nakshatraWarns,
    );

    let reason: string;
    if (favorable) {
      const parts: string[] = [];
      if (tithiInfo) parts.push(`tithi ${tithiInfo.name} is auspicious`);
      if (nakshatraInfo)
        parts.push(`${nakshatraInfo.name} nakshatra supports this`);
      if (yogaInfo) parts.push(`${yogaInfo.name} yoga is benefic`);
      reason = parts.length > 0 ? parts.join("; ") : "All panchang elements align well.";
    } else {
      const issues: string[] = [];
      if (tithiInfo && !tithiInfo.auspicious)
        issues.push(`${tithiInfo.name} is a ${tithiInfo.nature} tithi`);
      if (yogaInfo && !yogaInfo.auspicious)
        issues.push(`${yogaInfo.name} yoga is malefic`);
      if (nakshatraInfo && nakshatraWarns)
        issues.push(`${nakshatraInfo.name} nakshatra cautions against this`);
      else if (nakshatraInfo && !nakshatraSupports)
        issues.push(
          `${nakshatraInfo.name} nakshatra does not specifically favour this`,
        );
      if (!tithiInfo && !nakshatraInfo && !yogaInfo)
        issues.push("panchang data unavailable");
      reason =
        issues.length > 0
          ? `Not recommended — ${issues.join("; ")}.`
          : "Not recommended today.";
    }

    return { category, favorable, reason };
  });
}
