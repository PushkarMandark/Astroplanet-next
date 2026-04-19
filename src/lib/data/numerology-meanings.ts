// Numerology data layer for AstroEshop.
// Pure data — no React imports, no browser APIs.
// Covers numbers 1-9 plus master numbers 11, 22, 33 where applicable.

export type NumerologyNumber = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 11 | 22 | 33;

export interface NumberProfile {
    number: NumerologyNumber;
    title: string;
    hindi: string;
    planet: string;
    element: string;
    color: string;
    colorHex: string;
    gemstone: string;
    gemstoneHindi: string;
    luckyDays: string[];
    luckyNumbers: number[];
    unfriendlyNumbers: number[];
    personality: string;
    strengths: string[];
    weaknesses: string[];
    careers: string[];
    famousPeople: string[];
    mantra: string;
    mantraTransliteration: string;
    mantraMeaning: string;
    affirmation: string;
    description: string;
}

export type NumerologyDimension =
    | "lifePath"
    | "destiny"
    | "soulUrge"
    | "personality"
    | "birthday"
    | "personalYear";

export interface DimensionMeaning {
    title: string;
    summary: string;
    description: string;
}

export interface PersonalYearGuide {
    year: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;
    theme: string;
    description: string;
    opportunities: string[];
    cautions: string[];
    bestMonths: string[];
}

export interface CompatibilityInfo {
    score: number;
    label: "Excellent" | "Good" | "Moderate" | "Challenging";
    summary: string;
}

export interface KarmicLesson {
    missingDigit: number;
    lesson: string;
    challenge: string;
    remedy: string;
}

export type NumberRelation = "Friend" | "Neutral" | "Enemy";

// --- NUMBER PROFILES -----------------------------------------------------

export const NUMBER_PROFILES: Record<NumerologyNumber, NumberProfile> = {
    1: {
        number: 1,
        title: "The Leader",
        hindi: "नेता",
        planet: "Sun (सूर्य)",
        element: "Fire",
        color: "Golden Orange",
        colorHex: "#E8A33D",
        gemstone: "Ruby",
        gemstoneHindi: "माणिक्य",
        luckyDays: ["Sunday", "Monday", "Tuesday"],
        luckyNumbers: [1, 3, 5, 9],
        unfriendlyNumbers: [4, 8],
        personality:
            "Number 1 people are natural-born leaders with strong individuality and an unshakeable drive to pioneer new paths. They carry the radiant energy of the Sun, commanding respect wherever they go. Independence is their oxygen.",
        strengths: [
            "Strong leadership instincts",
            "Creative and original thinking",
            "Courage under pressure",
            "Self-reliant and decisive",
            "High ambition and focus",
        ],
        weaknesses: [
            "Can become domineering",
            "Impatient with slower partners",
            "Ego-driven when unbalanced",
            "Dislikes taking advice",
        ],
        careers: [
            "Entrepreneur",
            "CEO / Founder",
            "Politician",
            "Film director",
            "Military officer",
            "Inventor",
        ],
        famousPeople: [
            "Narendra Modi",
            "Walt Disney",
            "A. R. Rahman",
            "Martin Luther King Jr.",
            "Sachin Tendulkar",
        ],
        mantra: "ॐ सूर्याय नमः",
        mantraTransliteration: "Om Suryaya Namah",
        mantraMeaning: "Salutations to the radiant Sun, source of all vitality and clarity.",
        affirmation: "I lead my life with courage, clarity, and creative power.",
        description:
            "The number 1 represents the seed of all creation — the first spark from which every other number flows. It embodies ambition, originality, and the will to shape reality through personal effort.",
    },
    2: {
        number: 2,
        title: "The Peacemaker",
        hindi: "शांतिदूत",
        planet: "Moon (चंद्र)",
        element: "Water",
        color: "Silver White",
        colorHex: "#D9E6F2",
        gemstone: "Pearl",
        gemstoneHindi: "मोती",
        luckyDays: ["Monday", "Friday"],
        luckyNumbers: [1, 2, 4, 7],
        unfriendlyNumbers: [5, 9],
        personality:
            "Number 2 people are gentle, intuitive, and deeply attuned to the emotional currents around them. Ruled by the Moon, they are natural diplomats who thrive in harmonious partnerships. Their strength lies in empathy rather than force.",
        strengths: [
            "Exceptional empathy and intuition",
            "Gifted mediators",
            "Loyal and supportive partners",
            "Cooperative team players",
            "Patient and understanding",
        ],
        weaknesses: [
            "Overly sensitive to criticism",
            "Indecisive under pressure",
            "Prone to mood swings",
            "Can avoid confrontation",
        ],
        careers: [
            "Counsellor / Therapist",
            "Diplomat",
            "Nurse",
            "Artist",
            "HR professional",
            "Teacher",
        ],
        famousPeople: [
            "Mahatma Gandhi",
            "Shah Rukh Khan",
            "Madonna",
            "Amitabh Bachchan",
            "Bill Clinton",
        ],
        mantra: "ॐ चंद्राय नमः",
        mantraTransliteration: "Om Chandraya Namah",
        mantraMeaning: "Salutations to the calming Moon, bringer of peace and emotional balance.",
        affirmation: "I create harmony through empathy, patience, and gentle strength.",
        description:
            "The number 2 is the vibration of union — the sacred duality where yin meets yang. It governs relationships, cooperation, and the quiet power of listening.",
    },
    3: {
        number: 3,
        title: "The Communicator",
        hindi: "कलाकार",
        planet: "Jupiter (गुरु)",
        element: "Fire",
        color: "Yellow",
        colorHex: "#F5C542",
        gemstone: "Yellow Sapphire",
        gemstoneHindi: "पुखराज",
        luckyDays: ["Thursday", "Sunday", "Tuesday"],
        luckyNumbers: [3, 6, 9],
        unfriendlyNumbers: [8],
        personality:
            "Number 3 people are expressive, optimistic, and overflowing with creative energy. Blessed by Jupiter, they attract abundance through words, wit, and wisdom. Their presence lifts the room effortlessly.",
        strengths: [
            "Brilliant communicators",
            "Naturally optimistic",
            "Creatively versatile",
            "Socially magnetic",
            "Philosophical and wise",
        ],
        weaknesses: [
            "Can scatter energy across too many projects",
            "Tendency to exaggerate",
            "Superficial when bored",
            "Struggles with routine",
        ],
        careers: [
            "Writer / Author",
            "Actor / Performer",
            "Teacher / Professor",
            "Public speaker",
            "Journalist",
            "Designer",
        ],
        famousPeople: [
            "Rabindranath Tagore",
            "Salman Khan",
            "J. K. Rowling",
            "Jawaharlal Nehru",
            "Alia Bhatt",
        ],
        mantra: "ॐ बृहस्पतये नमः",
        mantraTransliteration: "Om Brihaspataye Namah",
        mantraMeaning: "Salutations to Jupiter, the guru of wisdom, expansion, and good fortune.",
        affirmation: "I express my truth with joy, creativity, and confidence.",
        description:
            "The number 3 is the vibration of creative expression — the trinity of mind, body, and spirit speaking as one. It brings laughter, learning, and the magic of storytelling.",
    },
    4: {
        number: 4,
        title: "The Builder",
        hindi: "निर्माता",
        planet: "Rahu (राहु)",
        element: "Earth",
        color: "Grey",
        colorHex: "#6B7280",
        gemstone: "Hessonite",
        gemstoneHindi: "गोमेद",
        luckyDays: ["Saturday", "Sunday"],
        luckyNumbers: [1, 2, 5, 7],
        unfriendlyNumbers: [3, 9],
        personality:
            "Number 4 people are disciplined, methodical, and deeply loyal to the systems they build. Ruled by Rahu, they see the world through an unconventional lens yet grind harder than anyone to ground their vision. They are the quiet architects of lasting foundations.",
        strengths: [
            "Exceptionally hardworking",
            "Honest and dependable",
            "Practical problem solvers",
            "Highly organized",
            "Strong sense of duty",
        ],
        weaknesses: [
            "Rigid and stubborn",
            "Resistant to change",
            "Pessimistic when stressed",
            "Slow to trust",
        ],
        careers: [
            "Engineer",
            "Architect",
            "Scientist",
            "Banker / Accountant",
            "Project manager",
            "Civil servant",
        ],
        famousPeople: [
            "Indira Gandhi",
            "Bill Gates",
            "Aamir Khan",
            "Barack Obama",
            "Arundhati Roy",
        ],
        mantra: "ॐ राहवे नमः",
        mantraTransliteration: "Om Rahave Namah",
        mantraMeaning:
            "Salutations to Rahu, whose shadow teaches us to see beyond the visible and master the unseen.",
        affirmation: "I build my life on solid foundations with patience and discipline.",
        description:
            "The number 4 is the vibration of structure — the four corners of a house, the four seasons, the four directions. It rewards those who honour process, patience, and hard work.",
    },
    5: {
        number: 5,
        title: "The Freedom Seeker",
        hindi: "स्वतंत्र",
        planet: "Mercury (बुध)",
        element: "Air",
        color: "Green",
        colorHex: "#3FA35A",
        gemstone: "Emerald",
        gemstoneHindi: "पन्ना",
        luckyDays: ["Wednesday", "Friday"],
        luckyNumbers: [1, 3, 5, 6],
        unfriendlyNumbers: [2],
        personality:
            "Number 5 people are quick-witted, adventurous, and allergic to routine. Ruled by Mercury, they live on curiosity, learning faster than most and talking even faster. Change is not something they fear — it is how they breathe.",
        strengths: [
            "Sharp intellect and wit",
            "Adaptable to any situation",
            "Persuasive communicators",
            "Natural networkers",
            "Magnetic charm",
        ],
        weaknesses: [
            "Restless and easily bored",
            "Impulsive decision-making",
            "Difficulty with long-term commitment",
            "Prone to excess",
        ],
        careers: [
            "Marketing professional",
            "Sales leader",
            "Travel writer",
            "Stock trader",
            "Journalist",
            "Content creator",
        ],
        famousPeople: [
            "Swami Vivekananda",
            "Angelina Jolie",
            "Ranveer Singh",
            "Steven Spielberg",
            "Priyanka Chopra",
        ],
        mantra: "ॐ बुधाय नमः",
        mantraTransliteration: "Om Budhaya Namah",
        mantraMeaning: "Salutations to Mercury, the swift messenger of intellect and communication.",
        affirmation: "I embrace change with curiosity, confidence, and joyful freedom.",
        description:
            "The number 5 is the vibration of movement — the restless traveller in the middle of the 1-9 cycle. It governs the five senses and rewards those who remain forever curious.",
    },
    6: {
        number: 6,
        title: "The Nurturer",
        hindi: "पालनहार",
        planet: "Venus (शुक्र)",
        element: "Earth",
        color: "Pink",
        colorHex: "#F4B6C2",
        gemstone: "Diamond",
        gemstoneHindi: "हीरा",
        luckyDays: ["Friday", "Tuesday", "Thursday"],
        luckyNumbers: [3, 6, 9],
        unfriendlyNumbers: [1, 8],
        personality:
            "Number 6 people are devoted caretakers whose hearts are wired for love, beauty, and service. Ruled by Venus, they create homes and circles that feel like sanctuaries. Responsibility is not a burden for them — it is a form of love.",
        strengths: [
            "Deeply compassionate",
            "Strong aesthetic sense",
            "Reliable family anchor",
            "Harmonizing presence",
            "Generous and hospitable",
        ],
        weaknesses: [
            "Tendency to over-give",
            "Can become worrisome",
            "Struggles to say no",
            "Jealous when insecure",
        ],
        careers: [
            "Doctor",
            "Interior designer",
            "Chef / Restaurateur",
            "Fashion designer",
            "Social worker",
            "Hospitality manager",
        ],
        famousPeople: [
            "Mother Teresa",
            "Deepika Padukone",
            "John Lennon",
            "Sonam Kapoor",
            "Meryl Streep",
        ],
        mantra: "ॐ शुक्राय नमः",
        mantraTransliteration: "Om Shukraya Namah",
        mantraMeaning: "Salutations to Venus, the graceful bringer of love, beauty, and harmony.",
        affirmation: "I give and receive love in balance, nurturing myself as I nurture others.",
        description:
            "The number 6 is the vibration of responsibility and beauty — the heart chakra of numerology. It governs home, health, and the art of caring without losing oneself.",
    },
    7: {
        number: 7,
        title: "The Seeker",
        hindi: "साधक",
        planet: "Ketu (केतु)",
        element: "Water",
        color: "Violet",
        colorHex: "#7C5CB5",
        gemstone: "Cat's Eye",
        gemstoneHindi: "लहसुनिया",
        luckyDays: ["Monday", "Sunday"],
        luckyNumbers: [2, 4, 7],
        unfriendlyNumbers: [9],
        personality:
            "Number 7 people are deep thinkers, mystics, and quiet observers of life's hidden patterns. Ruled by Ketu, they carry old-soul wisdom and a strong pull toward the unseen. They need solitude the way others need air.",
        strengths: [
            "Analytical and intuitive",
            "Spiritually inclined",
            "Excellent researchers",
            "Independent thinkers",
            "Insightful teachers",
        ],
        weaknesses: [
            "Can become isolated",
            "Overly skeptical",
            "Slow to trust others",
            "Prone to overthinking",
        ],
        careers: [
            "Researcher / Scientist",
            "Philosopher",
            "Psychologist",
            "Astrologer",
            "Author",
            "Data analyst",
        ],
        famousPeople: [
            "Albert Einstein",
            "Dr. A. P. J. Abdul Kalam",
            "Princess Diana",
            "Satyajit Ray",
            "Leonardo DiCaprio",
        ],
        mantra: "ॐ केतवे नमः",
        mantraTransliteration: "Om Ketave Namah",
        mantraMeaning:
            "Salutations to Ketu, the liberator whose detachment opens the door to spiritual wisdom.",
        affirmation: "I trust my inner wisdom and walk the path of truth with quiet confidence.",
        description:
            "The number 7 is the vibration of inner seeking — the sage on the mountain who questions everything to find the essence. It governs intuition, research, and spiritual depth.",
    },
    8: {
        number: 8,
        title: "The Powerhouse",
        hindi: "शक्ति",
        planet: "Saturn (शनि)",
        element: "Earth",
        color: "Deep Blue",
        colorHex: "#1F3A5F",
        gemstone: "Blue Sapphire",
        gemstoneHindi: "नीलम",
        luckyDays: ["Saturday", "Friday"],
        luckyNumbers: [1, 2, 5, 8],
        unfriendlyNumbers: [3, 6],
        personality:
            "Number 8 people are ambitious achievers with an iron will and a long view of life. Ruled by Saturn, they climb slowly but rarely fall, understanding that real power is earned through discipline. Behind their calm exterior runs a fierce drive for results.",
        strengths: [
            "Strong executive ability",
            "Financially astute",
            "Patient long-term planner",
            "Unshakeable under pressure",
            "Justice-minded",
        ],
        weaknesses: [
            "Can appear cold or distant",
            "Workaholic tendencies",
            "Materialistic when unbalanced",
            "Slow to forgive",
        ],
        careers: [
            "Business magnate",
            "Investment banker",
            "Real estate developer",
            "Judge / Lawyer",
            "Corporate strategist",
            "Industrialist",
        ],
        famousPeople: [
            "Dhirubhai Ambani",
            "Warren Buffett",
            "Sundar Pichai",
            "Pablo Picasso",
            "Kiran Mazumdar-Shaw",
        ],
        mantra: "ॐ शनैश्चराय नमः",
        mantraTransliteration: "Om Shanaishcharaya Namah",
        mantraMeaning:
            "Salutations to Saturn, the stern teacher of karma, patience, and disciplined effort.",
        affirmation: "I build lasting success through discipline, integrity, and patient action.",
        description:
            "The number 8 is the vibration of material mastery — the infinity symbol turned upright, balancing the seen and unseen. It governs power, karma, and the slow rewards of sustained effort.",
    },
    9: {
        number: 9,
        title: "The Humanitarian",
        hindi: "योद्धा",
        planet: "Mars (मंगल)",
        element: "Fire",
        color: "Red",
        colorHex: "#C0392B",
        gemstone: "Red Coral",
        gemstoneHindi: "मूंगा",
        luckyDays: ["Tuesday", "Thursday", "Friday"],
        luckyNumbers: [3, 5, 6, 9],
        unfriendlyNumbers: [4, 7],
        personality:
            "Number 9 people are fiery idealists who fight for causes larger than themselves. Ruled by Mars, they carry the warrior's courage blended with a healer's compassion. They love passionately, serve boldly, and forgive more than anyone expects.",
        strengths: [
            "Courageous and passionate",
            "Deeply compassionate",
            "Natural-born leaders of causes",
            "Generous with time and energy",
            "Tenacious under adversity",
        ],
        weaknesses: [
            "Hot-tempered when crossed",
            "Impulsive in anger",
            "Can become a martyr",
            "Impatient with the mundane",
        ],
        careers: [
            "Soldier / Officer",
            "Surgeon",
            "Social activist",
            "Athlete",
            "Firefighter",
            "Spiritual leader",
        ],
        famousPeople: [
            "Mahatma Gandhi",
            "Amitabh Bachchan",
            "Mahendra Singh Dhoni",
            "Mother Teresa",
            "Jim Carrey",
        ],
        mantra: "ॐ अंगारकाय नमः",
        mantraTransliteration: "Om Angarakaya Namah",
        mantraMeaning:
            "Salutations to Mars, the fierce warrior who grants courage, energy, and noble victory.",
        affirmation: "I channel my fire into service, courage, and compassionate action.",
        description:
            "The number 9 is the vibration of completion — the final single digit that contains echoes of all the others. It governs endings, universal love, and the courage to release what has served its time.",
    },
    11: {
        number: 11,
        title: "The Intuitive Master",
        hindi: "दिव्य दृष्टा",
        planet: "Moon (चंद्र) — Master",
        element: "Water",
        color: "Silver",
        colorHex: "#C0C0C0",
        gemstone: "Pearl",
        gemstoneHindi: "मोती",
        luckyDays: ["Monday", "Friday"],
        luckyNumbers: [2, 4, 7, 11],
        unfriendlyNumbers: [9],
        personality:
            "Number 11 is a master number that amplifies the intuition of 2 into visionary channels. These souls often feel they are here on a spiritual mission, receiving insights that others miss entirely. Their nervous system runs hot — inspiration and anxiety can look very similar.",
        strengths: [
            "Extraordinary intuition",
            "Inspirational presence",
            "Visionary ideas",
            "Deep spiritual awareness",
            "Charismatic teachers",
        ],
        weaknesses: [
            "Highly sensitive and anxious",
            "Self-doubt blocks genius",
            "Can feel overwhelmed",
            "Prone to nervous exhaustion",
        ],
        careers: [
            "Spiritual teacher",
            "Visionary artist",
            "Motivational speaker",
            "Psychologist",
            "Filmmaker",
            "Healer",
        ],
        famousPeople: [
            "Sri Aurobindo",
            "Michelle Obama",
            "Prince William",
            "Jennifer Aniston",
            "Ramana Maharshi",
        ],
        mantra: "ॐ सोमाय नमः",
        mantraTransliteration: "Om Somaya Namah",
        mantraMeaning:
            "Salutations to the luminous Moon, whose light reveals what the mind alone cannot see.",
        affirmation: "I trust my intuition and share my light to inspire others.",
        description:
            "The master number 11 carries the full vibration of 2 raised to visionary heights. It is the channel between the seen and unseen, asking its bearers to turn insight into service.",
    },
    22: {
        number: 22,
        title: "The Master Builder",
        hindi: "महानिर्माता",
        planet: "Jupiter (गुरु) — Master",
        element: "Earth",
        color: "Royal Blue",
        colorHex: "#1E3A8A",
        gemstone: "Yellow Sapphire",
        gemstoneHindi: "पुखराज",
        luckyDays: ["Thursday", "Sunday"],
        luckyNumbers: [2, 4, 8, 22],
        unfriendlyNumbers: [5, 7],
        personality:
            "Number 22 is the most powerful master number — the dreamer who can actually construct the dream. Combining the intuition of 11 with the discipline of 4, these individuals turn grand visions into institutions, movements, and lasting legacies. They think in decades, not days.",
        strengths: [
            "Able to manifest large visions",
            "Highly disciplined",
            "Practical idealist",
            "Natural institution-builder",
            "Inspires long-term loyalty",
        ],
        weaknesses: [
            "Immense pressure of potential",
            "Can burn out from overwork",
            "May underplay ambition from fear",
            "Struggles to delegate",
        ],
        careers: [
            "Nation-builder / Statesman",
            "Large-scale entrepreneur",
            "Urban planner / Architect",
            "Philanthropist",
            "University founder",
            "Global project leader",
        ],
        famousPeople: [
            "Dr. A. P. J. Abdul Kalam",
            "Dalai Lama",
            "Oprah Winfrey",
            "Bill Gates",
            "Rabindranath Tagore",
        ],
        mantra: "ॐ बृहस्पतये नमः",
        mantraTransliteration: "Om Brihaspataye Namah",
        mantraMeaning:
            "Salutations to Jupiter, guru of expansion, wisdom, and the building of great works.",
        affirmation: "I turn my highest vision into lasting reality with patience and service.",
        description:
            "The master number 22 carries the vibration of the practical visionary. It asks its bearers to combine intuition with disciplined action and build structures that uplift generations.",
    },
    33: {
        number: 33,
        title: "The Master Healer",
        hindi: "गुरुदेव",
        planet: "Venus (शुक्र) — Master",
        element: "Ether",
        color: "Rose Gold",
        colorHex: "#E8B4A4",
        gemstone: "Diamond",
        gemstoneHindi: "हीरा",
        luckyDays: ["Friday", "Sunday"],
        luckyNumbers: [3, 6, 9, 33],
        unfriendlyNumbers: [1, 8],
        personality:
            "Number 33 is the rarest master number — the Christ-consciousness of pure, selfless love made practical. These souls pour their gifts into uplifting humanity, often sacrificing personal comfort without complaint. They teach by example, not by lecture.",
        strengths: [
            "Profound compassion",
            "Healing presence",
            "Selfless service orientation",
            "Artistic and spiritual depth",
            "Uplifts entire communities",
        ],
        weaknesses: [
            "Risk of total self-sacrifice",
            "Can ignore personal needs",
            "Heavy emotional burden",
            "Difficulty setting boundaries",
        ],
        careers: [
            "Spiritual teacher",
            "Humanitarian leader",
            "Counsellor / Healer",
            "Non-profit founder",
            "Arts patron",
            "Community organizer",
        ],
        famousPeople: [
            "Mother Teresa",
            "Albert Einstein",
            "Meryl Streep",
            "Sri Ramakrishna",
            "Francis of Assisi",
        ],
        mantra: "ॐ शुक्राय नमः",
        mantraTransliteration: "Om Shukraya Namah",
        mantraMeaning:
            "Salutations to Venus, whose grace turns love into the highest form of service.",
        affirmation: "I serve with love, heal with presence, and honour my own light.",
        description:
            "The master number 33 is the vibration of the compassionate teacher. It combines the creativity of 3 with the nurturing of 6 at their highest octave, dedicating life to the upliftment of others.",
    },
};

export function getNumberProfile(n: number): NumberProfile | null {
    if (!Number.isFinite(n)) return null;
    const key = Math.trunc(n) as NumerologyNumber;
    if (key in NUMBER_PROFILES) {
        return NUMBER_PROFILES[key];
    }
    // Reduce non-master numbers to single digit
    const reduced = reduceToSingle(Math.abs(Math.trunc(n)));
    if (reduced >= 1 && reduced <= 9) {
        return NUMBER_PROFILES[reduced as NumerologyNumber];
    }
    return null;
}

// --- DIMENSION MEANINGS --------------------------------------------------

type DimensionRecord = Record<NumerologyNumber, DimensionMeaning>;

const LIFE_PATH_MEANINGS: DimensionRecord = {
    1: {
        title: "Life Path 1 — The Pioneer",
        summary: "Your life's journey is to lead, innovate, and stand on your own feet.",
        description:
            "You are here to forge original paths where none existed and to inspire others by going first. Lessons around ego, independence, and self-trust will appear until you learn to lead from confidence rather than insecurity.",
    },
    2: {
        title: "Life Path 2 — The Diplomat",
        summary: "Your life's journey is built around partnership, sensitivity, and peace-making.",
        description:
            "You grow through relationships, learning that strength can be soft and that cooperation often achieves more than command. Your path asks you to trust your intuition without losing yourself in others.",
    },
    3: {
        title: "Life Path 3 — The Storyteller",
        summary: "Your life's journey is to express, create, and uplift through words and art.",
        description:
            "You are here to bring joy, beauty, and communication into the world. The lesson is focus — channelling your scattered creative gifts into one voice strong enough to be heard.",
    },
    4: {
        title: "Life Path 4 — The Architect",
        summary: "Your life's journey is to build lasting structures through discipline and work.",
        description:
            "You incarnated to master the art of patient construction — in business, family, and character. Your path rewards steady effort and teaches flexibility when rigidity becomes a cage.",
    },
    5: {
        title: "Life Path 5 — The Adventurer",
        summary: "Your life's journey is freedom, change, and experiential learning.",
        description:
            "You are here to taste life from many angles and convert experience into wisdom. The challenge is responsibility — choosing freedom that serves your growth instead of running from commitment.",
    },
    6: {
        title: "Life Path 6 — The Caretaker",
        summary: "Your life's journey revolves around love, responsibility, and beauty.",
        description:
            "You are wired to nurture family, community, and the spaces around you. Your lesson is balance — giving generously without losing yourself in everyone else's needs.",
    },
    7: {
        title: "Life Path 7 — The Mystic",
        summary: "Your life's journey is the search for truth beneath appearances.",
        description:
            "You are drawn to the deeper questions and the quiet places where answers live. The path asks you to balance solitude with connection and to share what you find instead of hoarding it.",
    },
    8: {
        title: "Life Path 8 — The Executive",
        summary: "Your life's journey is mastering power, money, and material reality.",
        description:
            "You are here to learn the ethics and disciplines of worldly authority. Wealth and influence will come when you wield them with integrity rather than fear or control.",
    },
    9: {
        title: "Life Path 9 — The Humanitarian",
        summary: "Your life's journey is service, compassion, and letting go.",
        description:
            "You carry the wisdom of all the numbers before you, called to serve causes larger than yourself. Your lesson is surrender — releasing what has completed its purpose with grace instead of grief.",
    },
    11: {
        title: "Life Path 11 — The Illuminator",
        summary: "Your life's journey is to channel intuition into inspiration for others.",
        description:
            "You walk a high-voltage spiritual path where sensitivity is your gift and your burden. The work is to steady your nervous system enough to deliver the visions you receive.",
    },
    22: {
        title: "Life Path 22 — The Master Builder",
        summary: "Your life's journey is to turn grand visions into tangible institutions.",
        description:
            "You are here to build something that outlives you — a company, a movement, a legacy. The path tests your faith in your own power and your patience with slow, real-world progress.",
    },
    33: {
        title: "Life Path 33 — The Master Teacher",
        summary: "Your life's journey is compassionate service at the highest octave.",
        description:
            "You are called to uplift humanity through unconditional love made practical. The lesson is self-care — remembering that the lamp must stay lit to light other lamps.",
    },
};

const DESTINY_MEANINGS: DimensionRecord = {
    1: {
        title: "Destiny 1 — The Originator",
        summary: "You are meant to become a leader who creates something that did not exist before.",
        description:
            "Your name's vibration pulls you toward pioneering roles and original ideas. Fulfilment comes when you stop borrowing other people's dreams and commit to a vision that is unmistakably yours.",
    },
    2: {
        title: "Destiny 2 — The Harmonizer",
        summary: "You are meant to become a bridge-builder between people and ideas.",
        description:
            "Your destiny unfolds through partnership, mediation, and gentle leadership. The world will ask you to be the person who holds the centre when everyone else is pulling apart.",
    },
    3: {
        title: "Destiny 3 — The Inspirer",
        summary: "You are meant to become a voice that lifts others through creativity.",
        description:
            "Your destiny is to be seen and heard — whether through writing, performance, teaching, or design. Resisting the spotlight will feel like swimming against your own current.",
    },
    4: {
        title: "Destiny 4 — The Foundation",
        summary: "You are meant to become the dependable builder others rely on.",
        description:
            "Your destiny is to be the one who makes things work, lasts, and scales. Over time you become the quiet backbone of organisations, families, and communities.",
    },
    5: {
        title: "Destiny 5 — The Messenger",
        summary: "You are meant to become a carrier of ideas across boundaries.",
        description:
            "Your destiny pulls you toward communication, travel, media, and change. You are built to translate experiences for others and open doors that have stayed locked too long.",
    },
    6: {
        title: "Destiny 6 — The Guardian",
        summary: "You are meant to become a protector and beautifier of community.",
        description:
            "Your destiny centres on home, healing, and creating environments where people feel safe and seen. Responsibility is not your trap — it is your medium.",
    },
    7: {
        title: "Destiny 7 — The Truth-Seeker",
        summary: "You are meant to become an analyst, sage, or spiritual researcher.",
        description:
            "Your destiny is to uncover hidden patterns — in data, in scripture, or in the human mind. You are built to ask better questions than anyone around you.",
    },
    8: {
        title: "Destiny 8 — The Authority",
        summary: "You are meant to become a leader in the material and financial world.",
        description:
            "Your destiny is executive — building enterprises, managing capital, or shaping policy. Integrity is the price of admission; without it, success erodes as quickly as it arrives.",
    },
    9: {
        title: "Destiny 9 — The Servant-Leader",
        summary: "You are meant to become a figure of service and universal love.",
        description:
            "Your destiny is to lead while giving — your cause, your art, your presence all point beyond yourself. The larger the audience you serve, the more alive you feel.",
    },
    11: {
        title: "Destiny 11 — The Inspired Voice",
        summary: "You are meant to become a spiritual teacher or visionary messenger.",
        description:
            "Your destiny is to channel high insights into language ordinary people can use. Fame, when it comes, is a by-product of authentic service.",
    },
    22: {
        title: "Destiny 22 — The Empire Builder",
        summary: "You are meant to become someone who builds structures that last generations.",
        description:
            "Your destiny is at the scale of organisations, institutions, or movements. The world is literally waiting for you to believe you can hold this much.",
    },
    33: {
        title: "Destiny 33 — The Christed Servant",
        summary: "You are meant to become a healing presence in the world at large.",
        description:
            "Your destiny is the rare combination of art, service, and spiritual authority. You are built to love in a way that actually rebuilds broken things.",
    },
};

const SOUL_URGE_MEANINGS: DimensionRecord = {
    1: {
        title: "Soul Urge 1 — Craving Independence",
        summary: "Deep down, your soul hungers for self-expression and autonomy.",
        description:
            "Behind every choice is a quiet demand to be the author of your own story. You feel suffocated by environments that require you to shrink and come alive when you are allowed to lead.",
    },
    2: {
        title: "Soul Urge 2 — Craving Connection",
        summary: "Deep down, your soul longs for intimate partnership and peace.",
        description:
            "Your inner world is wired for harmony, shared silence, and deep listening. You would trade grand success for a loving bond that truly sees you.",
    },
    3: {
        title: "Soul Urge 3 — Craving Expression",
        summary: "Deep down, your soul longs to be heard, seen, and celebrated.",
        description:
            "Your inner voice aches to create — to speak, write, perform, or design. Joy is not a luxury for you, it is a need your soul refuses to negotiate away.",
    },
    4: {
        title: "Soul Urge 4 — Craving Order",
        summary: "Deep down, your soul longs for stability, reliability, and structure.",
        description:
            "You feel most alive when your environment is predictable and your work is solid. Chaos wounds you in ways outsiders rarely notice.",
    },
    5: {
        title: "Soul Urge 5 — Craving Freedom",
        summary: "Deep down, your soul longs for variety, travel, and new experience.",
        description:
            "You measure a life well lived in stories, not possessions. Anything that feels like a cage — even a gilded one — eventually becomes unbearable.",
    },
    6: {
        title: "Soul Urge 6 — Craving Love",
        summary: "Deep down, your soul longs to care deeply and be cared for.",
        description:
            "Your inner world is organised around home, family, and beauty. You feel fulfilled when you are tending to people and spaces that matter to you.",
    },
    7: {
        title: "Soul Urge 7 — Craving Understanding",
        summary: "Deep down, your soul longs for solitude and spiritual depth.",
        description:
            "You are drawn to quiet libraries, long walks, and conversations that skip the small talk. Surface-level living leaves you hollow; meaning is your oxygen.",
    },
    8: {
        title: "Soul Urge 8 — Craving Achievement",
        summary: "Deep down, your soul longs for influence, mastery, and legacy.",
        description:
            "You want to leave visible footprints — an institution, a portfolio, a body of work. Power matters to you, but only when wielded with integrity.",
    },
    9: {
        title: "Soul Urge 9 — Craving Higher Purpose",
        summary: "Deep down, your soul longs to serve something larger than itself.",
        description:
            "You are most content when your daily work connects to a cause. A life devoted purely to personal gain eventually feels meaningless to you.",
    },
    11: {
        title: "Soul Urge 11 — Craving Illumination",
        summary: "Deep down, your soul longs for spiritual insight and inspired service.",
        description:
            "Your inner world is charged with intuition and higher perception. You crave practices and company that keep your frequency high.",
    },
    22: {
        title: "Soul Urge 22 — Craving Mastery",
        summary: "Deep down, your soul longs to manifest great visions in the world.",
        description:
            "You feel an inner call to build something big enough to matter. Small horizons make you restless in ways you cannot fully explain.",
    },
    33: {
        title: "Soul Urge 33 — Craving Compassionate Service",
        summary: "Deep down, your soul longs to heal and uplift others.",
        description:
            "Your heart is tuned to the pain of the world and the beauty within it. You feel most alive when your giving is flowing freely and without performance.",
    },
};

const PERSONALITY_MEANINGS: DimensionRecord = {
    1: {
        title: "Personality 1 — The Confident Front",
        summary: "You come across as strong, capable, and a little larger than life.",
        description:
            "People read you as a leader before you say a word. This impression opens doors but can intimidate those who would benefit from seeing your softer side.",
    },
    2: {
        title: "Personality 2 — The Gentle Presence",
        summary: "You come across as warm, approachable, and easy to trust.",
        description:
            "Strangers often share sensitive things with you surprisingly fast. Your calm aura invites confidence, though some may mistake your softness for weakness.",
    },
    3: {
        title: "Personality 3 — The Charismatic Spark",
        summary: "You come across as witty, expressive, and full of life.",
        description:
            "You are the person people remember from a room — bright voice, quick smile, sharp phrase. The challenge is letting others see what lies beneath the sparkle.",
    },
    4: {
        title: "Personality 4 — The Reliable Rock",
        summary: "You come across as steady, serious, and dependable.",
        description:
            "People assume — usually correctly — that you will deliver what you promise. You earn long-term respect rather than sudden attention.",
    },
    5: {
        title: "Personality 5 — The Magnetic Explorer",
        summary: "You come across as curious, clever, and socially agile.",
        description:
            "Your energy makes conversation easy and routines interesting. Others sometimes struggle to pin you down, which is both your charm and your mystery.",
    },
    6: {
        title: "Personality 6 — The Warm Host",
        summary: "You come across as nurturing, gracious, and aesthetically refined.",
        description:
            "People feel at home in your presence within minutes. Your attention to detail in how you dress, host, and speak leaves a lasting impression of care.",
    },
    7: {
        title: "Personality 7 — The Quiet Sage",
        summary: "You come across as reserved, thoughtful, and slightly mysterious.",
        description:
            "You speak less than most and people lean in to hear you. There is an unmistakable depth to your presence that can feel intimidating at first.",
    },
    8: {
        title: "Personality 8 — The Commanding Executive",
        summary: "You come across as authoritative, composed, and ambitious.",
        description:
            "People sense power in you even when you are being quiet. Your composure under pressure and clarity about goals make you a natural to put in charge.",
    },
    9: {
        title: "Personality 9 — The Noble Spirit",
        summary: "You come across as dignified, passionate, and idealistic.",
        description:
            "Something about you feels older and more principled than average. You are often trusted with causes and confidences, sometimes more than you want.",
    },
    11: {
        title: "Personality 11 — The Inspired Presence",
        summary: "You come across as sensitive, luminous, and slightly otherworldly.",
        description:
            "People often say your eyes are very alive. Your aura carries a spiritual charge that uplifts some and unsettles others.",
    },
    22: {
        title: "Personality 22 — The Weighty Builder",
        summary: "You come across as grounded, visionary, and quietly powerful.",
        description:
            "You feel big without being loud. People instinctively hand you responsibility because you carry it so well.",
    },
    33: {
        title: "Personality 33 — The Compassionate Teacher",
        summary: "You come across as wise, kind, and genuinely present.",
        description:
            "People often leave conversations with you feeling better about themselves. Your warmth is palpable and oddly healing.",
    },
};

const BIRTHDAY_MEANINGS: DimensionRecord = {
    1: {
        title: "Birthday 1 — A Born Originator",
        summary: "Your birth day gifts you with leadership energy and pioneering drive.",
        description:
            "You arrived with a seed of independence stitched into your nature. Even as a child, you preferred doing things your own way and probably still do.",
    },
    2: {
        title: "Birthday 2 — A Born Diplomat",
        summary: "Your birth day gifts you with sensitivity and relational intelligence.",
        description:
            "You came in reading rooms and feeling other people's feelings before you could name your own. This gift, used wisely, makes you extraordinary with people.",
    },
    3: {
        title: "Birthday 3 — A Born Performer",
        summary: "Your birth day gifts you with creativity and natural charisma.",
        description:
            "You were likely the child who told stories, drew pictures, or made the family laugh. Expression is not something you do — it is who you are.",
    },
    4: {
        title: "Birthday 4 — A Born Worker",
        summary: "Your birth day gifts you with discipline and a steady work ethic.",
        description:
            "You arrived with an unusual capacity to sit, focus, and finish. That quiet consistency is the superpower most people only discover about you years in.",
    },
    5: {
        title: "Birthday 5 — A Born Explorer",
        summary: "Your birth day gifts you with versatility and restless curiosity.",
        description:
            "You came in curious about everything and unwilling to stay in any one lane for long. Variety keeps you alive; routine slowly dims your light.",
    },
    6: {
        title: "Birthday 6 — A Born Caregiver",
        summary: "Your birth day gifts you with warmth and a protective instinct.",
        description:
            "You were probably the child who mothered the younger kids or worried about family happiness. That caring instinct is both your calling and your edit list.",
    },
    7: {
        title: "Birthday 7 — A Born Seeker",
        summary: "Your birth day gifts you with analytical depth and inner quiet.",
        description:
            "You arrived with a serious face and deep eyes, needing alone time even as a small child. Silence refuels you the way conversation refuels others.",
    },
    8: {
        title: "Birthday 8 — A Born Strategist",
        summary: "Your birth day gifts you with executive ability and ambition.",
        description:
            "You came in with a strong sense of fairness, value, and long-range vision. Even small decisions feel strategic to you.",
    },
    9: {
        title: "Birthday 9 — A Born Humanitarian",
        summary: "Your birth day gifts you with compassion and courage.",
        description:
            "You arrived with a big heart and a warrior's spirit. Injustice genuinely burns in you and service energises you in ways entertainment cannot.",
    },
    11: {
        title: "Birthday 11 — A Born Channel",
        summary: "Your birth day gifts you with intuitive and spiritual sensitivity.",
        description:
            "You came in with an unusually open channel to the subtle world. Dreams, synchronicities, and strong hunches have probably been normal for you all your life.",
    },
    22: {
        title: "Birthday 22 — A Born Master Builder",
        summary: "Your birth day gifts you with both vision and the will to execute it.",
        description:
            "You arrived with the rare combination of big imagination and grounded persistence. Large projects attract you because they finally match your inner scale.",
    },
    33: {
        title: "Birthday 33 — A Born Teacher of the Heart",
        summary: "Your birth day gifts you with extraordinary compassion and insight.",
        description:
            "You came in with a tender heart that seems to understand suffering without needing to be told. Service finds you early, whether you look for it or not.",
    },
};

const PERSONAL_YEAR_MEANINGS: DimensionRecord = {
    1: {
        title: "Personal Year 1 — Planting Seeds",
        summary: "This year is about fresh starts and new identity.",
        description:
            "A new nine-year cycle opens, asking you to choose direction with intention. Whatever you plant now — habits, relationships, ventures — will shape the years that follow.",
    },
    2: {
        title: "Personal Year 2 — Cultivating Connection",
        summary: "This year is about patience, partnership, and quiet development.",
        description:
            "Seeds you planted last year need tending, not forcing. Relationships, contracts, and collaborations grow in importance.",
    },
    3: {
        title: "Personal Year 3 — Expression and Expansion",
        summary: "This year is about creativity, visibility, and social joy.",
        description:
            "Doors open through communication — writing, speaking, networking, performing. The year rewards putting yourself out there in a genuine voice.",
    },
    4: {
        title: "Personal Year 4 — Building Foundations",
        summary: "This year is about disciplined work and systems.",
        description:
            "Expect a slower, grounded energy that asks for organisation, budgeting, and follow-through. What you solidify now becomes your launchpad later.",
    },
    5: {
        title: "Personal Year 5 — Freedom and Change",
        summary: "This year is about movement, variety, and calculated risk.",
        description:
            "Unexpected opportunities, travel, and pivots show up. Stay flexible but avoid impulsive breaks from important commitments.",
    },
    6: {
        title: "Personal Year 6 — Home and Responsibility",
        summary: "This year centres on love, family, and service.",
        description:
            "Attention turns toward relationships, home renovation, health, and responsibility. Service comes naturally and creates lasting goodwill.",
    },
    7: {
        title: "Personal Year 7 — Reflection and Study",
        summary: "This year is about inner work and introspection.",
        description:
            "Outer striving slows down so inner understanding can catch up. Invest in learning, therapy, spiritual practice, and solitary work.",
    },
    8: {
        title: "Personal Year 8 — Harvest and Power",
        summary: "This year is about achievement, wealth, and authority.",
        description:
            "The cycle rewards the inner work of recent years with tangible results. Money, promotions, and leadership opportunities crystallise.",
    },
    9: {
        title: "Personal Year 9 — Completion and Release",
        summary: "This year is about closure, service, and letting go.",
        description:
            "The cycle ends, asking you to release what no longer fits. Expect emotional waves, acts of service, and clearing that prepares you for a new 1 year.",
    },
    11: {
        title: "Personal Year 11 — Inspired Vision",
        summary: "A heightened 2 year asking for inspiration and partnership.",
        description:
            "Intuition runs strong and ideas arrive quickly. Keep your nervous system steady and share the visions that feel persistent.",
    },
    22: {
        title: "Personal Year 22 — Master Building",
        summary: "A heightened 4 year asking you to manifest something large.",
        description:
            "The discipline of 4 meets the vision of 22, creating a rare window to launch significant projects. Plan carefully, then commit hard.",
    },
    33: {
        title: "Personal Year 33 — Compassionate Service",
        summary: "A heightened 6 year emphasising healing and uplifting others.",
        description:
            "Your caring has more than usual reach this year. Pour your energy into service, but guard your own replenishment.",
    },
};

export const DIMENSION_MEANINGS: Record<NumerologyDimension, DimensionRecord> = {
    lifePath: LIFE_PATH_MEANINGS,
    destiny: DESTINY_MEANINGS,
    soulUrge: SOUL_URGE_MEANINGS,
    personality: PERSONALITY_MEANINGS,
    birthday: BIRTHDAY_MEANINGS,
    personalYear: PERSONAL_YEAR_MEANINGS,
};

export function getDimensionMeaning(
    dim: NumerologyDimension,
    n: number,
): DimensionMeaning | null {
    if (!Number.isFinite(n)) return null;
    const table = DIMENSION_MEANINGS[dim];
    if (!table) return null;
    const key = Math.trunc(n) as NumerologyNumber;
    if (key in table) return table[key];
    const reduced = reduceToSingle(Math.abs(Math.trunc(n)));
    if (reduced >= 1 && reduced <= 9) {
        return table[reduced as NumerologyNumber];
    }
    return null;
}

// --- PERSONAL YEAR CYCLE -------------------------------------------------

export const PERSONAL_YEAR_CYCLE: Record<number, PersonalYearGuide> = {
    1: {
        year: 1,
        theme: "New Beginnings",
        description:
            "A fresh nine-year chapter opens. Every seed you plant this year — a business, a habit, a relationship — shapes the decade to come.",
        opportunities: [
            "Launch a new venture or role",
            "Rebrand your identity",
            "Move to a new city",
            "Start independent work",
        ],
        cautions: [
            "Avoid rushing into unnecessary conflict",
            "Resist forcing results too quickly",
            "Do not neglect existing responsibilities",
        ],
        bestMonths: ["March", "May", "October"],
    },
    2: {
        year: 2,
        theme: "Patience & Partnership",
        description:
            "After last year's ignition, this year demands slow growth and cooperation. Relationships, contracts, and emotional refinement take centre stage.",
        opportunities: [
            "Deepen key partnerships",
            "Sign important contracts",
            "Develop intuitive practices",
            "Mediate and build trust",
        ],
        cautions: [
            "Avoid impulsive decisions",
            "Guard against oversensitivity",
            "Do not force outcomes",
        ],
        bestMonths: ["February", "July", "November"],
    },
    3: {
        year: 3,
        theme: "Creativity & Expression",
        description:
            "A socially vibrant year full of creative opportunity and joyful self-expression. Visibility grows, but only if you stay focused.",
        opportunities: [
            "Publish writing or creative work",
            "Build a personal brand",
            "Expand social and professional network",
            "Launch communication-driven projects",
        ],
        cautions: [
            "Avoid scattering energy",
            "Guard against overspending",
            "Do not let criticism destabilise you",
        ],
        bestMonths: ["March", "June", "December"],
    },
    4: {
        year: 4,
        theme: "Work & Foundations",
        description:
            "A year of grounded labour, systems, and steady achievement. Shortcuts will backfire; patient work pays off handsomely.",
        opportunities: [
            "Build lasting systems and processes",
            "Invest in skills and credentials",
            "Purchase property or assets",
            "Strengthen financial foundations",
        ],
        cautions: [
            "Avoid excessive workaholism",
            "Guard against rigidity",
            "Do not ignore your health",
        ],
        bestMonths: ["April", "August", "October"],
    },
    5: {
        year: 5,
        theme: "Change & Freedom",
        description:
            "A pivotal year of movement, change, and unexpected openings. The cycle asks you to adapt fast while staying true to core commitments.",
        opportunities: [
            "Travel and cultural exchange",
            "Career pivots and bold moves",
            "Media, marketing, and networking",
            "Healthy risk-taking",
        ],
        cautions: [
            "Avoid impulsive break-ups",
            "Guard against overindulgence",
            "Do not abandon unfinished work",
        ],
        bestMonths: ["May", "July", "September"],
    },
    6: {
        year: 6,
        theme: "Family & Responsibility",
        description:
            "A nurturing year centred on home, health, and meaningful service. Relationships deepen and obligations feel heavier — and more rewarding.",
        opportunities: [
            "Marriage, family expansion, or home renovation",
            "Health-focused lifestyle upgrades",
            "Teaching, counselling, or healing work",
            "Community-building projects",
        ],
        cautions: [
            "Avoid martyrdom and over-giving",
            "Guard against interference in others' lives",
            "Do not ignore personal boundaries",
        ],
        bestMonths: ["June", "September", "December"],
    },
    7: {
        year: 7,
        theme: "Spiritual Introspection",
        description:
            "An inward year for study, reflection, and refinement. Outer progress slows so inner clarity can catch up.",
        opportunities: [
            "Deep study, research, or higher education",
            "Therapy, coaching, or spiritual practice",
            "Writing and creative solitude",
            "Reassessing life direction",
        ],
        cautions: [
            "Avoid isolating to an unhealthy degree",
            "Guard against overthinking",
            "Do not force material goals",
        ],
        bestMonths: ["January", "July", "November"],
    },
    8: {
        year: 8,
        theme: "Harvest & Achievement",
        description:
            "A powerful year for material success, leadership, and public recognition. Karma ripens in both directions, so integrity matters more than ever.",
        opportunities: [
            "Major promotions or business expansion",
            "Wealth-building and investment decisions",
            "Real estate and big-ticket purchases",
            "Executive and leadership roles",
        ],
        cautions: [
            "Avoid cutting ethical corners",
            "Guard against burnout",
            "Do not let ego dominate relationships",
        ],
        bestMonths: ["April", "August", "October"],
    },
    9: {
        year: 9,
        theme: "Completion & Release",
        description:
            "The cycle closes. Relationships, roles, and possessions that have completed their purpose will ask to be released gracefully.",
        opportunities: [
            "Large-scale service and giving",
            "Closing chapters with honour",
            "Forgiveness and emotional healing",
            "Artistic legacy work",
        ],
        cautions: [
            "Avoid starting major new ventures now",
            "Guard against emotional volatility",
            "Do not cling to what is leaving",
        ],
        bestMonths: ["March", "September", "December"],
    },
};

export function getPersonalYearGuide(n: number): PersonalYearGuide | null {
    if (!Number.isFinite(n)) return null;
    const reduced = reduceToSingle(Math.abs(Math.trunc(n)));
    if (reduced >= 1 && reduced <= 9) {
        return PERSONAL_YEAR_CYCLE[reduced] ?? null;
    }
    return null;
}

// --- COMPATIBILITY -------------------------------------------------------

type CompatibilityTier = "best" | "moderate" | "challenging";

const COMPATIBILITY_RULES: Record<number, Record<number, CompatibilityTier>> = {
    1: buildTierMap({ best: [1, 3, 5, 6, 9], moderate: [2, 4, 7, 8], challenging: [] }),
    2: buildTierMap({ best: [1, 2, 4, 7, 8], moderate: [3, 5, 6, 9], challenging: [] }),
    3: buildTierMap({ best: [1, 3, 5, 6, 9], moderate: [2, 4, 7], challenging: [8] }),
    4: buildTierMap({ best: [1, 2, 5, 6, 7], moderate: [4], challenging: [3, 8, 9] }),
    5: buildTierMap({ best: [1, 3, 5, 6, 9], moderate: [2, 4, 7, 8], challenging: [] }),
    6: buildTierMap({ best: [3, 5, 6, 9], moderate: [1, 2, 4, 7, 8], challenging: [] }),
    7: buildTierMap({ best: [2, 4, 5, 7], moderate: [1, 3, 6, 8, 9], challenging: [] }),
    8: buildTierMap({ best: [1, 2, 5, 8], moderate: [4, 7], challenging: [3, 6, 9] }),
    9: buildTierMap({ best: [3, 5, 6, 9], moderate: [1, 2, 7], challenging: [4, 8] }),
};

function buildTierMap(tiers: {
    best: number[];
    moderate: number[];
    challenging: number[];
}): Record<number, CompatibilityTier> {
    const out: Record<number, CompatibilityTier> = {};
    tiers.best.forEach((n) => (out[n] = "best"));
    tiers.moderate.forEach((n) => (out[n] = "moderate"));
    tiers.challenging.forEach((n) => (out[n] = "challenging"));
    return out;
}

function resolveTier(a: number, b: number): CompatibilityTier {
    const fromA = COMPATIBILITY_RULES[a]?.[b];
    const fromB = COMPATIBILITY_RULES[b]?.[a];
    // Prefer the stronger of the two to keep the relation symmetric and charitable.
    const rank: Record<CompatibilityTier, number> = {
        best: 3,
        moderate: 2,
        challenging: 1,
    };
    if (fromA && fromB) {
        return rank[fromA] >= rank[fromB] ? fromA : fromB;
    }
    return fromA ?? fromB ?? "moderate";
}

export function getCompatibility(a: number, b: number): CompatibilityInfo {
    const reducedA = safeReduce(a);
    const reducedB = safeReduce(b);
    const tier = resolveTier(reducedA, reducedB);
    if (tier === "best") {
        return {
            score: reducedA === reducedB ? 9 : 10,
            label: "Excellent",
            summary: `Numbers ${reducedA} and ${reducedB} share a vibrant, natural rhythm — this pairing tends to inspire and uplift both sides.`,
        };
    }
    if (tier === "moderate") {
        return {
            score: 6,
            label: "Moderate",
            summary: `Numbers ${reducedA} and ${reducedB} can work beautifully with conscious communication and mutual respect for each other's pace.`,
        };
    }
    return {
        score: 3,
        label: "Challenging",
        summary: `Numbers ${reducedA} and ${reducedB} tend to pull in different directions — this bond demands patience, boundaries, and genuine effort.`,
    };
}

// --- KARMIC LESSONS ------------------------------------------------------

export const KARMIC_LESSONS: Record<number, KarmicLesson> = {
    1: {
        missingDigit: 1,
        lesson: "Learning self-assertion and independent leadership",
        challenge:
            "You may struggle to stand up for yourself, voice an unpopular opinion, or move without permission. This lifetime asks you to build the spine you did not inherit.",
        remedy:
            "Practice small daily acts of leadership and decisive choice; recite the Surya mantra at sunrise.",
    },
    2: {
        missingDigit: 2,
        lesson: "Learning cooperation, patience, and intimate partnership",
        challenge:
            "You may find relationships draining, struggle to read emotions, or avoid sensitive conversations. This lifetime asks you to develop emotional intelligence through consistent practice.",
        remedy:
            "Cultivate a partnership you truly invest in; offer white flowers to the Moon on Monday evenings.",
    },
    3: {
        missingDigit: 3,
        lesson: "Learning joyful self-expression and creative courage",
        challenge:
            "You may hold back words, dim your creativity, or downplay achievements. This lifetime asks you to speak, create, and celebrate openly instead of living in quiet edit mode.",
        remedy:
            "Take up a creative practice and share the results; chant the Brihaspati mantra on Thursdays.",
    },
    4: {
        missingDigit: 4,
        lesson: "Learning discipline, focus, and follow-through",
        challenge:
            "You may start many things and finish few, or resist the structure required for mastery. This lifetime asks you to respect the slow, steady labour behind every visible success.",
        remedy:
            "Build one small routine that you never skip; serve the needy on Saturdays to honour Rahu.",
    },
    5: {
        missingDigit: 5,
        lesson: "Learning adaptability and healthy freedom",
        challenge:
            "You may resist change, fear travel, or stay in situations long past their expiration date. This lifetime asks you to embrace life's movement instead of clinging to the familiar.",
        remedy:
            "Say yes to one new experience weekly; chant the Budh mantra on Wednesdays for quick-wittedness.",
    },
    6: {
        missingDigit: 6,
        lesson: "Learning love, responsibility, and emotional commitment",
        challenge:
            "You may shy away from family duty, intimate commitment, or caring for others. This lifetime asks you to stop treating responsibility as a trap and see it as devotion.",
        remedy:
            "Take meaningful responsibility for one person or cause; offer white sweets on Fridays in Venus's honour.",
    },
    7: {
        missingDigit: 7,
        lesson: "Learning faith, introspection, and inner wisdom",
        challenge:
            "You may distract yourself from silence, fear solitude, or refuse spiritual questions. This lifetime asks you to make peace with your own company and the deeper layers of life.",
        remedy:
            "Meditate daily, even for five minutes; recite the Ketu mantra or observe periodic silence.",
    },
    8: {
        missingDigit: 8,
        lesson: "Learning right use of power, money, and authority",
        challenge:
            "You may undervalue your worth, mishandle money, or avoid positions of authority altogether. This lifetime asks you to master material reality with integrity rather than avoid it.",
        remedy:
            "Build transparent financial habits and take on small leadership roles; serve the elderly on Saturdays.",
    },
    9: {
        missingDigit: 9,
        lesson: "Learning compassion, forgiveness, and service",
        challenge:
            "You may struggle with forgiveness, resist service, or become cynical about humanity. This lifetime asks you to reconnect your personal work with a larger purpose.",
        remedy:
            "Contribute time or money to a cause larger than yourself; chant the Mangal mantra on Tuesdays.",
    },
};

export function getKarmicLessons(birthDate: string): KarmicLesson[] {
    if (typeof birthDate !== "string" || !birthDate) return [];
    const digits = birthDate.replace(/\D/g, "");
    if (!digits) return [];
    const present = new Set<number>();
    for (const ch of digits) {
        const d = Number(ch);
        if (d >= 1 && d <= 9) present.add(d);
    }
    const missing: KarmicLesson[] = [];
    for (let d = 1; d <= 9; d++) {
        if (!present.has(d) && KARMIC_LESSONS[d]) {
            missing.push(KARMIC_LESSONS[d]);
        }
    }
    return missing;
}

// --- RULING / BHAGYA ANK -------------------------------------------------

export function getMoolAnk(dayOfMonth: number): number {
    if (!Number.isFinite(dayOfMonth)) return 0;
    const day = Math.abs(Math.trunc(dayOfMonth));
    if (day < 1) return 0;
    return reduceToSingle(day);
}

export function getBhagyaAnk(birthDate: string): number {
    if (typeof birthDate !== "string" || !birthDate) return 0;
    const digits = birthDate.replace(/\D/g, "");
    if (!digits) return 0;
    let sum = 0;
    for (const ch of digits) sum += Number(ch);
    // Preserve master numbers where appropriate.
    if (sum === 11 || sum === 22 || sum === 33) return sum;
    return reduceToSingle(sum);
}

// --- NUMBER FRIENDSHIP GRID ----------------------------------------------

const RELATION_RULES: Record<number, { friends: number[]; enemies: number[] }> = {
    1: { friends: [3, 5, 9], enemies: [6, 7, 8] },
    2: { friends: [1, 4, 7], enemies: [9] },
    3: { friends: [1, 2, 5, 7, 9], enemies: [8] },
    4: { friends: [1, 2, 5, 6, 8], enemies: [9] },
    5: { friends: [1, 3, 6], enemies: [] },
    6: { friends: [3, 5, 8, 9], enemies: [1] },
    7: { friends: [2, 3, 4, 6], enemies: [9] },
    8: { friends: [1, 2, 4, 5, 6], enemies: [3] },
    9: { friends: [1, 3, 5, 6], enemies: [4, 7] },
};

export function getNumberRelations(n: number): Record<number, NumberRelation> {
    const reduced = safeReduce(n);
    const rules = RELATION_RULES[reduced] ?? { friends: [], enemies: [] };
    const result: Record<number, NumberRelation> = {};
    for (let other = 1; other <= 9; other++) {
        if (other === reduced) {
            result[other] = "Friend";
            continue;
        }
        if (rules.friends.includes(other)) {
            result[other] = "Friend";
        } else if (rules.enemies.includes(other)) {
            result[other] = "Enemy";
        } else {
            result[other] = "Neutral";
        }
    }
    return result;
}

// --- INTERNAL HELPERS ----------------------------------------------------

function reduceToSingle(value: number): number {
    let n = Math.abs(Math.trunc(value));
    while (n > 9) {
        let sum = 0;
        while (n > 0) {
            sum += n % 10;
            n = Math.floor(n / 10);
        }
        n = sum;
    }
    return n;
}

function safeReduce(n: number): number {
    if (!Number.isFinite(n)) return 1;
    const truncated = Math.abs(Math.trunc(n));
    if (truncated === 0) return 1;
    return reduceToSingle(truncated);
}
