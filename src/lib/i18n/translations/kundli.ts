// Hindi/English dictionary for the Free Kundli Calculator tool.
// Keys are stable, descriptive camelCase. `hi` MUST have exactly the same keys as `en`.

export const kundli = {
  en: {
    // Hero
    heroBadge: "Vedic Astrology Dashboard",
    heroTitle: "Free Janam Kundli Online",
    heroSubtitle:
      "Your complete Janam Kundli with ascendant insights, planetary significations, nakshatra details, dosha analysis and personalized remedies — all in one place.",
    heroPill1: "100% Free Forever",
    heroPill2: "Lahiri Ayanamsa",
    heroPill3: "16 Divisional Charts",
    heroPill4: "English & हिंदी",

    // Birth-details form
    formEyebrow: "Birth Details",
    formTitle: "Enter Your Details",
    labelDob: "Date of Birth",
    placeholderDob: "Select date of birth",
    labelTob: "Time of Birth",
    placeholderTob: "Select time of birth",
    labelPob: "Place of Birth",
    generateBtn: "Generate Kundli",

    // Why-generate-here section
    whyEyebrow: "Why Generate Your Kundli Here",
    whyTitle: "Everything a Vedic astrologer checks, in one click",
    whyCard1Title: "Precise Birth Chart",
    whyCard1Desc:
      "Lagna, Chandra & Surya kundli computed with sidereal Lahiri ayanamsa — the standard used by Indian astrologers.",
    whyCard2Title: "Planets, Houses & Nakshatra",
    whyCard2Desc:
      "Position of all 9 grahas, 12 bhavas, and your janma nakshatra with classical attributes.",
    whyCard3Title: "Dosha Check",
    whyCard3Desc:
      "Manglik dosha, Sade Sati and Kaal Sarp dosha flagged automatically from your chart.",
    whyCard4Title: "Remedies & Lucky Signs",
    whyCard4Desc:
      "Gemstones, mantras, lucky numbers, colors and direction — personalised to your rashi.",

    // Results header + trinity card
    resultsEyebrow: "Janam Kundli",
    resultsTitle: "Your Birth Chart",
    nativeLabel: "Native",
    trinityEyebrow: "Your Core Trinity",
    trinityTitle: "Three Major Signs",
    signLagna: "Lagna (Ascendant)",
    signChandra: "Chandra Rashi",
    signSurya: "Surya Rashi",

    // Tabs
    tabOverview: "Overview",
    tabChart: "Chart",
    tabPlanets: "Planets",
    tabHouses: "Houses",
    tabNakshatra: "Nakshatra",
    tabDasha: "Dasha",
    tabDoshas: "Doshas",
    tabRemedies: "Remedies",

    // Ascendant card
    ascendantPersonalityTitle: "Ascendant Personality",
    ascendantPersonalityFallback:
      "Detailed ascendant traits for this sign will appear here once the data layer is loaded.",
    ascendantPersonalityEyebrow: "Ascendant Personality",
    labelStrengths: "Strengths",
    labelWeaknesses: "Weaknesses",
    labelSuitedCareers: "Suited Careers",

    // Nakshatra summary card
    birthNakshatra: "Birth Nakshatra",
    nakshatraDeity: "Deity",
    nakshatraSymbol: "Symbol",
    nakshatraGana: "Gana",
    nakshatraSummaryFallback:
      "Details for this nakshatra will appear once data loads.",

    // Mahadasha summary card
    currentMahadasha: "Current Mahadasha",
    focusPeriodLabel: "Focus period",
    yearsUnit: "years",

    // Dosha summary card
    doshaSummary: "Dosha Summary",
    doshaManglik: "Manglik",
    doshaSadeSati: "Sade Sati",
    doshaKaalSarp: "Kaal Sarp",
    statusActive: "Active",
    statusNone: "None",

    // Chart controls
    controlStyle: "Style",
    controlLabels: "Labels",
    labelLangEnglish: "English",
    labelLangHindi: "हिंदी",
    chartUnavailable: "Chart not available.",

    // Chart insights card
    chartInsights: "Chart Insights",
    planetaryConjunctions: "Planetary Conjunctions",
    noConjunctions: "No major conjunctions in this chart.",
    dignifiedPlacements: "Dignified Placements",
    noDignifiedPlacements:
      "No planets in own sign, exalted, or in mooltrikona.",

    // Planet card
    karakaLabel: "Karaka",
    inLabel: "In",
    moreSuffix: "more",
    mantraLabel: "Mantra",
    gemstoneLabel: "Gemstone",
    dayLabel: "Day",

    // House card
    houseLabel: "House",
    rashiLabel: "Rashi",
    houseEmpty: "empty",

    // Dosha card
    severityLabel: "Severity",
    statusActiveDosha: "Active",
    statusInactiveDosha: "Inactive",
    doshaWhyLabel: "Why",
    doshaRemediesLabel: "Remedies",

    // Remedies-by-type section
    remediesNoneFound: "No personalized remedies found for",
    remediesConsultPrompt: ". Try consulting an astrologer below.",

    // Nakshatra detail section
    nakshatraDetailMissing:
      "Detailed nakshatra information is not available for this name format. This can happen if the computed nakshatra label doesn't match our dataset.",
    nakshatraTileDeity: "Deity",
    nakshatraTileSymbol: "Symbol",
    nakshatraTileRuler: "Ruler",
    nakshatraTileGana: "Gana",
    nakshatraTileNadi: "Nadi",
    nakshatraTileYoni: "Yoni",
    nakshatraTileVarna: "Varna",
    nakshatraTileTatva: "Tatva",
    nakshatraAbout: "About",
    nakshatraTraits: "Traits",

    // Planets tab
    planetaryPositions: "Planetary Positions",
    colPlanet: "Planet",
    colRashi: "Rashi",
    colDegree: "Degree",
    colNakshatra: "Nakshatra",
    colRetro: "Retro",
    colDignity: "Dignity",
    dignityNeutral: "Neutral",
    planetSignifications: "Planet Significations",
    planetSignificationsHint: "Tap a card to reveal mantra & gemstone",

    // Doshas tab
    doshaMangalTitle: "Mangal Dosha",
    doshaSadeSatiTitle: "Sade Sati",
    doshaKaalSarpTitle: "Kaal Sarp Dosha",
    doshaLoading: "Dosha analysis is loading…",

    // Remedies tab
    remediesEyebrow: "Personalized for Your Current Mahadasha",
    remediesForLabel: "Remedies for",
    gemstoneCtaTitle: "Want authentic, certified gemstones?",
    gemstoneCtaDesc:
      "Explore our curated collection of lab-tested gemstones aligned with your planetary recommendations.",
    shopGemstonesBtn: "Shop Gemstones",
    talkToAstrologerBtn: "Talk to an Astrologer",

    // Vimshottari Dasha section
    vimshottariDasha: "Vimshottari Dasha",
    currentAntardasha: "Current Antardasha",
    endsLabel: "Ends:",
    fullMahadashaCycle: "Full Mahadasha Cycle",
    dashaTimelineHeading: "Mahadasha Timeline",
    dashaColPlanet: "Mahadasha",
    dashaColStart: "Starts",
    dashaColEnd: "Ends",
    dashaCurrentBadge: "Current",
    dashaTotalLabel: "Total",
    dashaRemainingLabel: "Remaining",
    unitYearsShort: "y",
    unitMonthsShort: "m",
    unitLessThanMonth: "<1m",

    // States
    errorStateMessage:
      "Unable to generate Kundli. Please check your birth details and try again.",
    emptyStateMessage:
      "Enter your birth details above and click \"Generate Kundli\" to see your Vedic birth chart, planetary positions, and dasha periods.",

    // SEO long-form section
    seoEyebrow: "Understanding Your Janam Kundli",
    seoTitle: "What does your free kundli actually reveal?",
    seoIntro:
      "A Janam Kundli is the cosmic blueprint of your life. Below is a quick guide to what each part of your free online kundli means and how to use it.",
    seoCard1Title: "Lagna (Ascendant)",
    seoCard1Body:
      "The rashi rising on the eastern horizon at your exact moment of birth. Lagna shapes your personality, body type, attitude and how the world sees you. The lagna also decides which rashi sits in which bhava (house).",
    seoCard2Title: "Chandra Rashi (Moon Sign)",
    seoCard2Body:
      "The rashi where the Moon is placed in your kundli. Chandra rashi rules your mind, emotions, motherhood, and is the anchor of all Vedic predictions — including dasha calculations and kundli milan.",
    seoCard3Title: "Surya Rashi (Sun Sign)",
    seoCard3Body:
      "Your sidereal Vedic sun sign. This is different from your Western sun sign. Surya rashi governs ego, authority, father, career direction, and your core sense of self.",
    seoCard4Title: "Janma Nakshatra",
    seoCard4Body:
      "One of the 27 lunar mansions. Your birth nakshatra is the starting point of your Vimshottari Dasha and reveals deep personality traits, life karma and your ruling planetary energy.",
    seoCard5Title: "Vimshottari Dasha",
    seoCard5Body:
      "A 120-year planetary timeline unique to Vedic astrology. The current mahadasha tells you which planet is shaping this phase of your life, and antardashas describe finer events year by year.",
    seoCard6Title: "Doshas (Manglik, Sade Sati, Kaal Sarp)",
    seoCard6Body:
      "Specific planetary placements that traditional astrology considers challenging. Our calculator automatically flags Manglik dosha, Sade Sati phase and Kaal Sarp dosha so you know what to check with an astrologer.",
    trustEyebrow: "Free, Accurate, Astrologer-Grade",
    trustTitle: "Why thousands trust our free Vedic kundli calculator",
    trustBody:
      "We use the same astronomical engine and Lahiri ayanamsa that professional Indian astrologers rely on — no watered-down generic content, no email signup, no hidden charges. The mathematical accuracy of your janam patrika here matches a paid software reading; what you get on top is a clean, mobile-friendly dashboard with chart styles, divisional charts (D1 to D60), planetary periods and remedies in plain language.",
    statDivisionalCharts: "Divisional Charts",
    statNakshatras: "Nakshatras",
    statGrahas: "Grahas",

    // Related tools
    exploreMoreEyebrow: "Explore More",
    exploreMoreTitle: "Other free Vedic astrology tools",
    toolMilanTitle: "Kundli Milan",
    toolMilanDesc: "Match marriage compatibility with 36-point Guna Milan.",
    toolNumerologyTitle: "Numerology",
    toolNumerologyDesc: "Discover your life path, lucky number and destiny.",
    toolHoroscopeTitle: "Daily Horoscope",
    toolHoroscopeDesc: "Today's reading personalised to your rashi.",
    toolGemstoneTitle: "Gemstone Advice",
    toolGemstoneDesc: "Right stone for you based on your kundli.",
    tryNow: "Try now",

    // FAQ
    faqDescription:
      "Got questions about your free kundli online? Below we answer the most common queries about the janam kundli, how our kundli calculator works, what your vedic astrology birth chart reveals, and when a free kundli analysis is enough versus consulting a professional astrologer.",
    faqQ1: "What is a Janam Kundli and why is it important?",
    faqA1:
      "A Janam Kundli, also called a janam patrika or vedic astrology birth chart, is a snapshot of the sky at the exact moment you were born. It maps the position of the Sun, Moon, planets, and ascendant (lagna) across 12 houses. In Vedic tradition, the kundli is used to understand personality, career direction, relationships, health tendencies, and timing of life events through dashas.",
    faqQ2: "How is the free kundli calculated on this page?",
    faqA2:
      "Our free kundli calculator uses your name, date of birth, exact time of birth, and place of birth to compute the planetary longitudes using the sidereal zodiac with the Lahiri ayanamsa, which is the standard in Indian astrology. From those positions we derive your lagna, rashi, nakshatra, planetary house placements, basic doshas, and your current Vimshottari Dasha period.",
    faqQ3: "Is a free online kundli accurate compared to a paid astrologer?",
    faqA3:
      "The mathematical kundli generated here is accurate as long as your birth time and place are correct. The planetary positions, nakshatra, and dasha will match what a professional astrologer calculates. The difference lies in interpretation. A trained astrologer can read combinations, divisional charts, and timing nuances that no automated tool can fully replicate, which is why deeper readings still benefit from a human expert.",
    faqQ4: "Why do I need exact time and place of birth?",
    faqA4:
      "The ascendant changes roughly every two hours, and house placements shift with it. Even a 15 minute difference in birth time can change your lagna and the entire house structure of your kundli. Place of birth sets the latitude and longitude used to calculate the local horizon, so a horoscope by date of birth alone, without time and place, cannot give you a reliable Vedic chart.",
    faqQ5: "What does my janam kundli actually reveal?",
    faqA5:
      "Your kundli shows the rashi (sign) and nakshatra of each planet, the house each planet sits in, your ascendant, and aspects between planets. From these we read tendencies in personality, mind, career, marriage, finances, health, and family. The Vimshottari Dasha system layered on top tells you which planet is currently influencing your life, which helps explain present circumstances and upcoming themes.",
    faqQ6: "What is Manglik dosha and does my kundli show it?",
    faqA6:
      "Manglik dosha, sometimes called Mangal dosha, is formed when Mars sits in specific houses from the lagna, Moon, or Venus. It is traditionally considered when matching kundlis for marriage. Our free kundli analysis flags whether Mars placement indicates a Manglik combination, but the strength of the dosha and its cancellations need careful evaluation by an astrologer before drawing any conclusion.",
    faqQ7: "What is Vimshottari Dasha and how do I read it?",
    faqA7:
      "Vimshottari Dasha is a 120 year planetary cycle unique to Vedic astrology. Each planet rules a fixed number of years, and the order is decided by the nakshatra of your Moon at birth. The current mahadasha tells you which planet is shaping the broad themes of this period of your life, and antardashas inside it bring the finer events. Our calculator shows your active mahadasha automatically.",
    faqQ8:
      "What is the difference between a Vedic kundli and a Western horoscope?",
    faqA8:
      "Western astrology uses the tropical zodiac, which is tied to the seasons, while Vedic astrology uses the sidereal zodiac, which is tied to the actual fixed stars. Because of this, your sun sign in a Western chart is often different from your rashi in a janam kundli. Vedic astrology also adds nakshatras, dashas, and divisional charts, which give it a much more time based predictive structure.",
    faqQ9: "Can I save or print my free kundli from this page?",
    faqA9:
      "Yes. Once your janam kundli is generated, you can use your browser's print option to save it as a PDF or print a hard copy. Many users keep a printed kundli handy when consulting an astrologer or for matchmaking. Make sure your birth details are entered correctly before saving, since any correction will require regenerating the chart.",
    faqQ10:
      "When should I consult a real astrologer instead of relying only on this tool?",
    faqA10:
      "A free kundli online is great for self study, basic understanding, and casual queries. For important life decisions like marriage matching, career changes, business launches, health concerns, or remedies for difficult dasha periods, it is wise to consult a qualified Vedic astrologer. They can study your divisional charts, transits, and family context together, which a generic kundli calculator cannot do on its own.",

    // Bottom CTA
    ctaTitle: "Want a Detailed Kundli Reading?",
    ctaDesc:
      "Get a personalized birth chart analysis from our expert Vedic astrologers with remedies and predictions.",
    bookConsultationBtn: "Book Consultation",
    contactUsBtn: "Contact Us",
  },
  hi: {
    // Hero
    heroBadge: "वैदिक ज्योतिष डैशबोर्ड",
    heroTitle: "मुफ़्त जन्म कुंडली ऑनलाइन",
    heroSubtitle:
      "आपकी संपूर्ण जन्म कुंडली — लग्न विश्लेषण, ग्रहों के कारकत्व, नक्षत्र विवरण, दोष विश्लेषण और व्यक्तिगत उपाय, सब एक ही जगह।",
    heroPill1: "100% हमेशा मुफ़्त",
    heroPill2: "लाहिरी अयनांश",
    heroPill3: "16 वर्ग कुंडलियाँ",
    heroPill4: "English और हिंदी",

    // Birth-details form
    formEyebrow: "जन्म विवरण",
    formTitle: "अपना विवरण दर्ज करें",
    labelDob: "जन्म तिथि",
    placeholderDob: "जन्म तिथि चुनें",
    labelTob: "जन्म समय",
    placeholderTob: "जन्म समय चुनें",
    labelPob: "जन्म स्थान",
    generateBtn: "कुंडली बनाएँ",

    // Why-generate-here section
    whyEyebrow: "अपनी कुंडली यहाँ क्यों बनाएँ",
    whyTitle: "जो कुछ एक वैदिक ज्योतिषी देखता है, सब एक क्लिक में",
    whyCard1Title: "सटीक जन्म कुंडली",
    whyCard1Desc:
      "लग्न, चंद्र और सूर्य कुंडली, निरयन लाहिरी अयनांश से गणना — वही मानक जो भारतीय ज्योतिषी उपयोग करते हैं।",
    whyCard2Title: "ग्रह, भाव और नक्षत्र",
    whyCard2Desc:
      "सभी 9 ग्रहों, 12 भावों और आपके जन्म नक्षत्र की स्थिति, शास्त्रीय गुणों सहित।",
    whyCard3Title: "दोष जाँच",
    whyCard3Desc:
      "मांगलिक दोष, साढ़े साती और काल सर्प दोष आपकी कुंडली से स्वतः पहचाने जाते हैं।",
    whyCard4Title: "उपाय और शुभ संकेत",
    whyCard4Desc:
      "रत्न, मंत्र, शुभ अंक, रंग और दिशा — आपकी राशि के अनुसार व्यक्तिगत।",

    // Results header + trinity card
    resultsEyebrow: "जन्म कुंडली",
    resultsTitle: "आपकी जन्म कुंडली",
    nativeLabel: "जातक",
    trinityEyebrow: "आपकी मूल त्रयी",
    trinityTitle: "तीन प्रमुख राशियाँ",
    signLagna: "लग्न (आरोही)",
    signChandra: "चंद्र राशि",
    signSurya: "सूर्य राशि",

    // Tabs
    tabOverview: "सारांश",
    tabChart: "कुंडली",
    tabPlanets: "ग्रह",
    tabHouses: "भाव",
    tabNakshatra: "नक्षत्र",
    tabDasha: "दशा",
    tabDoshas: "दोष",
    tabRemedies: "उपाय",

    // Ascendant card
    ascendantPersonalityTitle: "लग्न व्यक्तित्व",
    ascendantPersonalityFallback:
      "इस राशि के विस्तृत लग्न गुण डेटा लोड होने पर यहाँ दिखाई देंगे।",
    ascendantPersonalityEyebrow: "लग्न व्यक्तित्व",
    labelStrengths: "शक्तियाँ",
    labelWeaknesses: "कमज़ोरियाँ",
    labelSuitedCareers: "उपयुक्त करियर",

    // Nakshatra summary card
    birthNakshatra: "जन्म नक्षत्र",
    nakshatraDeity: "देवता",
    nakshatraSymbol: "प्रतीक",
    nakshatraGana: "गण",
    nakshatraSummaryFallback:
      "इस नक्षत्र का विवरण डेटा लोड होने पर दिखाई देगा।",

    // Mahadasha summary card
    currentMahadasha: "वर्तमान महादशा",
    focusPeriodLabel: "मुख्य अवधि",
    yearsUnit: "वर्ष",

    // Dosha summary card
    doshaSummary: "दोष सारांश",
    doshaManglik: "मांगलिक",
    doshaSadeSati: "साढ़े साती",
    doshaKaalSarp: "काल सर्प",
    statusActive: "सक्रिय",
    statusNone: "नहीं",

    // Chart controls
    controlStyle: "शैली",
    controlLabels: "लेबल",
    labelLangEnglish: "English",
    labelLangHindi: "हिंदी",
    chartUnavailable: "कुंडली उपलब्ध नहीं है।",

    // Chart insights card
    chartInsights: "कुंडली अंतर्दृष्टि",
    planetaryConjunctions: "ग्रह युति",
    noConjunctions: "इस कुंडली में कोई प्रमुख युति नहीं है।",
    dignifiedPlacements: "बलवान स्थितियाँ",
    noDignifiedPlacements:
      "कोई ग्रह स्वराशि, उच्च या मूलत्रिकोण में नहीं है।",

    // Planet card
    karakaLabel: "कारक",
    inLabel: "में",
    moreSuffix: "और",
    mantraLabel: "मंत्र",
    gemstoneLabel: "रत्न",
    dayLabel: "वार",

    // House card
    houseLabel: "भाव",
    rashiLabel: "राशि",
    houseEmpty: "खाली",

    // Dosha card
    severityLabel: "गंभीरता",
    statusActiveDosha: "सक्रिय",
    statusInactiveDosha: "निष्क्रिय",
    doshaWhyLabel: "क्यों",
    doshaRemediesLabel: "उपाय",

    // Remedies-by-type section
    remediesNoneFound: "इसके लिए कोई व्यक्तिगत उपाय नहीं मिला",
    remediesConsultPrompt: "। नीचे किसी ज्योतिषी से परामर्श करें।",

    // Nakshatra detail section
    nakshatraDetailMissing:
      "इस नाम प्रारूप के लिए विस्तृत नक्षत्र जानकारी उपलब्ध नहीं है। ऐसा तब हो सकता है जब गणना किया गया नक्षत्र नाम हमारे डेटासेट से मेल न खाए।",
    nakshatraTileDeity: "देवता",
    nakshatraTileSymbol: "प्रतीक",
    nakshatraTileRuler: "स्वामी",
    nakshatraTileGana: "गण",
    nakshatraTileNadi: "नाड़ी",
    nakshatraTileYoni: "योनि",
    nakshatraTileVarna: "वर्ण",
    nakshatraTileTatva: "तत्व",
    nakshatraAbout: "परिचय",
    nakshatraTraits: "गुण",

    // Planets tab
    planetaryPositions: "ग्रह स्थिति",
    colPlanet: "ग्रह",
    colRashi: "राशि",
    colDegree: "अंश",
    colNakshatra: "नक्षत्र",
    colRetro: "वक्री",
    colDignity: "बल",
    dignityNeutral: "सम",
    planetSignifications: "ग्रह कारकत्व",
    planetSignificationsHint: "मंत्र और रत्न देखने के लिए कार्ड पर टैप करें",

    // Doshas tab
    doshaMangalTitle: "मंगल दोष",
    doshaSadeSatiTitle: "साढ़े साती",
    doshaKaalSarpTitle: "काल सर्प दोष",
    doshaLoading: "दोष विश्लेषण लोड हो रहा है…",

    // Remedies tab
    remediesEyebrow: "आपकी वर्तमान महादशा के लिए व्यक्तिगत",
    remediesForLabel: "के लिए उपाय",
    gemstoneCtaTitle: "प्रामाणिक, प्रमाणित रत्न चाहिए?",
    gemstoneCtaDesc:
      "अपनी ग्रह संबंधी सिफ़ारिशों के अनुरूप, हमारे प्रयोगशाला-परीक्षित रत्नों का चुनिंदा संग्रह देखें।",
    shopGemstonesBtn: "रत्न खरीदें",
    talkToAstrologerBtn: "ज्योतिषी से बात करें",

    // Vimshottari Dasha section
    vimshottariDasha: "विंशोत्तरी दशा",
    currentAntardasha: "वर्तमान अंतर्दशा",
    endsLabel: "समाप्ति:",
    fullMahadashaCycle: "संपूर्ण महादशा चक्र",
    dashaTimelineHeading: "महादशा समयरेखा",
    dashaColPlanet: "महादशा",
    dashaColStart: "प्रारंभ",
    dashaColEnd: "समाप्त",
    dashaCurrentBadge: "वर्तमान",
    dashaTotalLabel: "सम्पूर्ण",
    dashaRemainingLabel: "शेष",
    unitYearsShort: "वर्ष",
    unitMonthsShort: "माह",
    unitLessThanMonth: "1 माह से कम",

    // States
    errorStateMessage:
      "कुंडली बनाने में असमर्थ। कृपया अपना जन्म विवरण जाँचें और पुनः प्रयास करें।",
    emptyStateMessage:
      "अपना जन्म विवरण ऊपर दर्ज करें और अपनी वैदिक जन्म कुंडली, ग्रह स्थिति और दशा अवधि देखने के लिए \"कुंडली बनाएँ\" पर क्लिक करें।",

    // SEO long-form section
    seoEyebrow: "अपनी जन्म कुंडली को समझें",
    seoTitle: "आपकी मुफ़्त कुंडली वास्तव में क्या बताती है?",
    seoIntro:
      "जन्म कुंडली आपके जीवन का ब्रह्मांडीय खाका है। नीचे एक संक्षिप्त मार्गदर्शिका है कि आपकी मुफ़्त ऑनलाइन कुंडली का प्रत्येक भाग क्या दर्शाता है और इसका उपयोग कैसे करें।",
    seoCard1Title: "लग्न (आरोही)",
    seoCard1Body:
      "आपके जन्म के ठीक क्षण पूर्वी क्षितिज पर उदित होने वाली राशि। लग्न आपके व्यक्तित्व, शारीरिक गठन, दृष्टिकोण और दुनिया आपको कैसे देखती है, इसे आकार देता है। लग्न यह भी तय करता है कि कौन-सी राशि किस भाव में बैठेगी।",
    seoCard2Title: "चंद्र राशि",
    seoCard2Body:
      "वह राशि जहाँ आपकी कुंडली में चंद्रमा स्थित है। चंद्र राशि आपके मन, भावनाओं और मातृत्व पर शासन करती है और सभी वैदिक भविष्यवाणियों का आधार है — जिसमें दशा गणना और कुंडली मिलान शामिल हैं।",
    seoCard3Title: "सूर्य राशि",
    seoCard3Body:
      "आपकी निरयन वैदिक सूर्य राशि। यह आपकी पाश्चात्य सूर्य राशि से अलग है। सूर्य राशि अहंकार, अधिकार, पिता, करियर की दिशा और आपके मूल आत्मबोध को नियंत्रित करती है।",
    seoCard4Title: "जन्म नक्षत्र",
    seoCard4Body:
      "27 चंद्र नक्षत्रों में से एक। आपका जन्म नक्षत्र आपकी विंशोत्तरी दशा का आरंभ बिंदु है और गहरे व्यक्तित्व गुण, जीवन कर्म तथा आपकी शासक ग्रह ऊर्जा को प्रकट करता है।",
    seoCard5Title: "विंशोत्तरी दशा",
    seoCard5Body:
      "वैदिक ज्योतिष की अद्वितीय 120-वर्षीय ग्रह समयरेखा। वर्तमान महादशा बताती है कि कौन-सा ग्रह आपके जीवन के इस चरण को आकार दे रहा है, और अंतर्दशाएँ वर्ष-दर-वर्ष सूक्ष्म घटनाओं का वर्णन करती हैं।",
    seoCard6Title: "दोष (मांगलिक, साढ़े साती, काल सर्प)",
    seoCard6Body:
      "विशिष्ट ग्रह स्थितियाँ जिन्हें पारंपरिक ज्योतिष चुनौतीपूर्ण मानता है। हमारा कैलकुलेटर स्वतः मांगलिक दोष, साढ़े साती चरण और काल सर्प दोष को चिह्नित करता है ताकि आप जान सकें कि किसी ज्योतिषी से क्या जाँचना है।",
    trustEyebrow: "मुफ़्त, सटीक, ज्योतिषी-स्तरीय",
    trustTitle: "क्यों हज़ारों लोग हमारे मुफ़्त वैदिक कुंडली कैलकुलेटर पर भरोसा करते हैं",
    trustBody:
      "हम वही खगोलीय इंजन और लाहिरी अयनांश उपयोग करते हैं जिस पर पेशेवर भारतीय ज्योतिषी निर्भर रहते हैं — कोई हल्की सामान्य सामग्री नहीं, कोई ईमेल साइनअप नहीं, कोई छिपा शुल्क नहीं। यहाँ आपकी जन्म पत्रिका की गणितीय सटीकता एक सशुल्क सॉफ़्टवेयर रीडिंग के बराबर है; इसके अलावा आपको मिलता है एक स्वच्छ, मोबाइल-अनुकूल डैशबोर्ड जिसमें कुंडली शैलियाँ, वर्ग कुंडलियाँ (D1 से D60), ग्रह दशाएँ और सरल भाषा में उपाय शामिल हैं।",
    statDivisionalCharts: "वर्ग कुंडलियाँ",
    statNakshatras: "नक्षत्र",
    statGrahas: "ग्रह",

    // Related tools
    exploreMoreEyebrow: "और देखें",
    exploreMoreTitle: "अन्य मुफ़्त वैदिक ज्योतिष उपकरण",
    toolMilanTitle: "कुंडली मिलान",
    toolMilanDesc: "36 गुण मिलान के साथ विवाह अनुकूलता जाँचें।",
    toolNumerologyTitle: "अंक ज्योतिष",
    toolNumerologyDesc: "अपना जीवन पथ, शुभ अंक और भाग्य जानें।",
    toolHoroscopeTitle: "दैनिक राशिफल",
    toolHoroscopeDesc: "आपकी राशि के अनुसार आज की भविष्यवाणी।",
    toolGemstoneTitle: "रत्न सलाह",
    toolGemstoneDesc: "आपकी कुंडली के आधार पर आपके लिए सही रत्न।",
    tryNow: "अभी आज़माएँ",

    // FAQ
    faqDescription:
      "अपनी मुफ़्त ऑनलाइन कुंडली के बारे में प्रश्न हैं? नीचे हम जन्म कुंडली से जुड़े सबसे आम सवालों के उत्तर देते हैं — हमारा कुंडली कैलकुलेटर कैसे काम करता है, आपकी वैदिक जन्म कुंडली क्या बताती है, और कब मुफ़्त कुंडली विश्लेषण पर्याप्त है बनाम किसी पेशेवर ज्योतिषी से परामर्श।",
    faqQ1: "जन्म कुंडली क्या है और यह क्यों महत्वपूर्ण है?",
    faqA1:
      "जन्म कुंडली, जिसे जन्म पत्रिका या वैदिक जन्म चार्ट भी कहते हैं, आपके जन्म के ठीक क्षण आकाश का एक चित्र है। यह सूर्य, चंद्र, ग्रहों और लग्न की स्थिति को 12 भावों में दर्शाती है। वैदिक परंपरा में कुंडली का उपयोग व्यक्तित्व, करियर की दिशा, संबंध, स्वास्थ्य प्रवृत्तियों और दशाओं के माध्यम से जीवन घटनाओं के समय को समझने के लिए किया जाता है।",
    faqQ2: "इस पृष्ठ पर मुफ़्त कुंडली की गणना कैसे होती है?",
    faqA2:
      "हमारा मुफ़्त कुंडली कैलकुलेटर आपके नाम, जन्म तिथि, सटीक जन्म समय और जन्म स्थान का उपयोग करके निरयन राशि चक्र और लाहिरी अयनांश से ग्रहों के देशांतर की गणना करता है, जो भारतीय ज्योतिष का मानक है। इन स्थितियों से हम आपका लग्न, राशि, नक्षत्र, ग्रहों की भाव स्थिति, मूल दोष और आपकी वर्तमान विंशोत्तरी दशा अवधि निकालते हैं।",
    faqQ3: "क्या मुफ़्त ऑनलाइन कुंडली एक सशुल्क ज्योतिषी की तुलना में सटीक है?",
    faqA3:
      "यहाँ बनाई गई गणितीय कुंडली तब तक सटीक है जब तक आपका जन्म समय और स्थान सही है। ग्रहों की स्थिति, नक्षत्र और दशा वही होंगे जो एक पेशेवर ज्योतिषी गणना करता है। अंतर व्याख्या में है। एक प्रशिक्षित ज्योतिषी ग्रह योग, वर्ग कुंडलियाँ और समय की बारीकियाँ पढ़ सकता है जिन्हें कोई स्वचालित उपकरण पूरी तरह दोहरा नहीं सकता, इसीलिए गहरी रीडिंग में अब भी मानव विशेषज्ञ का लाभ मिलता है।",
    faqQ4: "मुझे सटीक जन्म समय और स्थान की आवश्यकता क्यों है?",
    faqA4:
      "लग्न लगभग हर दो घंटे में बदलता है, और इसके साथ भाव स्थिति भी खिसकती है। जन्म समय में मात्र 15 मिनट का अंतर भी आपका लग्न और कुंडली की पूरी भाव संरचना बदल सकता है। जन्म स्थान स्थानीय क्षितिज की गणना के लिए अक्षांश और देशांतर तय करता है, इसलिए समय और स्थान के बिना केवल जन्म तिथि से बनी कुंडली एक विश्वसनीय वैदिक चार्ट नहीं दे सकती।",
    faqQ5: "मेरी जन्म कुंडली वास्तव में क्या प्रकट करती है?",
    faqA5:
      "आपकी कुंडली प्रत्येक ग्रह की राशि और नक्षत्र, प्रत्येक ग्रह जिस भाव में बैठा है, आपका लग्न, और ग्रहों के बीच दृष्टि दिखाती है। इनसे हम व्यक्तित्व, मन, करियर, विवाह, धन, स्वास्थ्य और परिवार की प्रवृत्तियाँ पढ़ते हैं। इसके ऊपर लगी विंशोत्तरी दशा प्रणाली बताती है कि कौन-सा ग्रह वर्तमान में आपके जीवन को प्रभावित कर रहा है, जो वर्तमान परिस्थितियों और आगामी विषयों को समझाने में मदद करता है।",
    faqQ6: "मांगलिक दोष क्या है और क्या मेरी कुंडली इसे दिखाती है?",
    faqA6:
      "मांगलिक दोष, जिसे कभी-कभी मंगल दोष भी कहते हैं, तब बनता है जब मंगल लग्न, चंद्र या शुक्र से विशिष्ट भावों में स्थित होता है। विवाह के लिए कुंडली मिलान में इसे पारंपरिक रूप से देखा जाता है। हमारा मुफ़्त कुंडली विश्लेषण यह चिह्नित करता है कि क्या मंगल की स्थिति मांगलिक योग दर्शाती है, परंतु दोष की तीव्रता और उसके भंग का सावधानीपूर्वक मूल्यांकन किसी निष्कर्ष से पहले ज्योतिषी द्वारा आवश्यक है।",
    faqQ7: "विंशोत्तरी दशा क्या है और मैं इसे कैसे पढ़ूँ?",
    faqA7:
      "विंशोत्तरी दशा वैदिक ज्योतिष की अद्वितीय 120-वर्षीय ग्रह चक्र है। प्रत्येक ग्रह एक निश्चित वर्षों पर शासन करता है, और क्रम जन्म के समय आपके चंद्रमा के नक्षत्र से तय होता है। वर्तमान महादशा बताती है कि कौन-सा ग्रह आपके जीवन के इस काल के व्यापक विषयों को आकार दे रहा है, और इसके भीतर की अंतर्दशाएँ सूक्ष्म घटनाएँ लाती हैं। हमारा कैलकुलेटर आपकी सक्रिय महादशा स्वतः दिखाता है।",
    faqQ8: "वैदिक कुंडली और पाश्चात्य राशिफल में क्या अंतर है?",
    faqA8:
      "पाश्चात्य ज्योतिष सायन राशि चक्र का उपयोग करता है, जो ऋतुओं से जुड़ा है, जबकि वैदिक ज्योतिष निरयन राशि चक्र का उपयोग करता है, जो वास्तविक स्थिर तारों से जुड़ा है। इसी कारण पाश्चात्य चार्ट में आपकी सूर्य राशि अक्सर जन्म कुंडली में आपकी राशि से भिन्न होती है। वैदिक ज्योतिष में नक्षत्र, दशाएँ और वर्ग कुंडलियाँ भी जुड़ती हैं, जो इसे कहीं अधिक समय-आधारित भविष्यसूचक संरचना देती हैं।",
    faqQ9: "क्या मैं इस पृष्ठ से अपनी मुफ़्त कुंडली सहेज या प्रिंट कर सकता हूँ?",
    faqA9:
      "हाँ। आपकी जन्म कुंडली बन जाने के बाद, आप अपने ब्राउज़र के प्रिंट विकल्प से इसे PDF के रूप में सहेज सकते हैं या हार्ड कॉपी प्रिंट कर सकते हैं। कई उपयोगकर्ता ज्योतिषी से परामर्श या कुंडली मिलान के समय एक प्रिंटेड कुंडली साथ रखते हैं। सहेजने से पहले सुनिश्चित करें कि आपका जन्म विवरण सही दर्ज है, क्योंकि किसी भी सुधार के लिए चार्ट को फिर से बनाना होगा।",
    faqQ10:
      "मुझे केवल इस उपकरण पर निर्भर रहने के बजाय कब एक वास्तविक ज्योतिषी से परामर्श करना चाहिए?",
    faqA10:
      "मुफ़्त ऑनलाइन कुंडली स्व-अध्ययन, मूल समझ और सामान्य प्रश्नों के लिए बढ़िया है। विवाह मिलान, करियर परिवर्तन, व्यवसाय आरंभ, स्वास्थ्य चिंताओं या कठिन दशा अवधियों के उपायों जैसे महत्वपूर्ण जीवन निर्णयों के लिए, किसी योग्य वैदिक ज्योतिषी से परामर्श करना बुद्धिमानी है। वे आपकी वर्ग कुंडलियों, गोचर और पारिवारिक संदर्भ का एक साथ अध्ययन कर सकते हैं, जो एक सामान्य कुंडली कैलकुलेटर स्वयं नहीं कर सकता।",

    // Bottom CTA
    ctaTitle: "विस्तृत कुंडली विश्लेषण चाहिए?",
    ctaDesc:
      "हमारे विशेषज्ञ वैदिक ज्योतिषियों से उपाय और भविष्यवाणियों सहित व्यक्तिगत जन्म कुंडली विश्लेषण प्राप्त करें।",
    bookConsultationBtn: "परामर्श बुक करें",
    contactUsBtn: "संपर्क करें",
  },
} as const;
