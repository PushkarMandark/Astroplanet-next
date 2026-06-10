// Hindi/English dictionary for the Daily Panchang page.
// Keys are stable, descriptive camelCase. `hi` MUST have exactly the same keys as `en`.
// NOTE: tithi/nakshatra/yoga/karana/vara *names* come from panchang-meanings.ts `.hindi` fields
// via `lang === "hi" ? item.hindi : item.name` — do NOT duplicate them here.

export const panchang = {
  en: {
    // Hero badge / heading / subtitle
    heroBadge: "Hindu Calendar",
    heroTitle: "Daily Panchang",
    heroSubtitle: "Tithi, Nakshatra, Yoga, Karana & auspicious timings for",
    heroSubtitleSuffix: "month",

    // Date navigator
    goToToday: "Go to Today",

    // Festivals banner
    festivalToday: "Festival Today",
    fastingDay: "Fasting Day",

    // Sun / moon timing cards
    labelSunrise: "Sunrise",
    labelSunset: "Sunset",
    labelMoonrise: "Moonrise",
    labelRahuKaal: "Rahu Kaal",

    // Today's Vibe section
    todaysVibe: "Today's Vibe",
    vibeAuspicious: "Auspicious Day",
    vibeMixed: "Mixed Day",
    vibeInauspicious: "Inauspicious Day",
    vibeAuspiciousSummary:
      "Planetary influences today support new beginnings, spiritual practice, and important undertakings.",
    vibeMixedSummary:
      "A balanced day with both favorable and cautionary energies. Time activities mindfully using Choghadiya.",
    vibeInauspiciousSummary:
      "Cosmic energies are challenging today. Prefer routine work, prayer, and avoid major new starts.",

    // Vibe info-pills
    pillTithiPrefix: "Tithi:",
    pillNakshatraPrefix: "Nakshatra:",
    pillYogaPrefix: "Yoga:",
    pillYogaFavorable: "Favorable",
    pillYogaChallenging: "Challenging",

    // Weekday profile (varaInfo card)
    weekdayProfile: "Weekday Profile",
    ruledBy: "Ruled by",
    deity: "Deity",
    luckyColor: "Lucky Color",

    // Five Elements section
    fiveElementsHeading: "पंचांग — Five Elements",
    fiveElementsTip: "Tap any row for meaning & guidance",

    // Five element row labels (static label part shown as "label (english)")
    tithiLabel: "तिथि",
    tithiEnglish: "Tithi",
    nakshatraLabel: "नक्षत्र",
    nakshatraEnglish: "Nakshatra",
    yogaLabel: "योग",
    yogaEnglish: "Yoga",
    karanaLabel: "करण",
    karanaEnglish: "Karana",
    varaLabel: "वार",
    varaEnglish: "Day",

    // Sub-text inside element rows
    startsAt: "Starts at",
    endsAt: "Ends at",
    pada: "Pada",

    // Detail cell labels (inside expanded accordion)
    cellDeity: "Deity",
    cellNature: "Nature",
    cellTithiNo: "Tithi No.",
    cellRuler: "Ruler",
    cellType: "Type",
    cellDay: "Day",
    cellLuckyColor: "Lucky Color",
    cellMantra: "Mantra",
    cellTraditionalFasts: "Traditional Fasts",
    cellFavorableActivities: "Favorable Activities",

    // BulletList titles
    bulletFavorable: "Favorable",
    bulletAvoid: "Avoid",

    // InfoPill labels
    pillAuspicious: "Auspicious",
    pillInauspicious: "Inauspicious",

    // Activity Recommendations section
    activityHeading: "Activity Recommendations",
    activitySubtitle: "What's favorable & what to avoid today",
    activityFavorable: "Favorable",
    activityAvoid: "Avoid",

    // Auspicious timings panel
    auspiciousTimings: "Auspicious Timings",
    labelBrahmaMuhurta: "Brahma Muhurta",
    labelAbhijitMuhurta: "Abhijit Muhurta",

    // Inauspicious timings panel
    inauspiciousTimings: "Inauspicious Timings",
    labelYamaganda: "Yamaganda",
    labelGulikaKaal: "Gulika Kaal",

    // Choghadiya section
    choghadiyaHeading: "Choghadiya Muhurta",
    choghadiyaSubtitle:
      "8 time windows for day & night — plan important tasks in Shubh periods",
    choghadiyaDay: "Day Choghadiya",
    choghadiyaNight: "Night Choghadiya",
    choghadiyaUnavailable: "Choghadiya unavailable for this date",
    choghadiyaShubh: "Shubh",
    choghadiyaAshubh: "Ashubh",

    // Mantra of the Day (MantraOfDay component)
    mantraOfDay: "Mantra of the Day",
    mantraCopy: "Copy",
    mantraCopied: "Copied",
    mantraChantTip: "Chant 108 times before sunrise for best results",

    // Astronomical Details section
    astronomicalHeading: "Astronomical Details",
    labelMoonSign: "Moon Sign",
    labelSunSign: "Sun Sign",
    labelSeason: "Season (Ritu)",
    labelHinduMonth: "Hindu Month",
    labelVikramSamvat: "Vikram Samvat",
    labelShakaSamvat: "Shaka Samvat",
    labelSamvatsara: "Samvatsara",

    // Bottom CTA
    ctaHeading: "Need Personalized Muhurta Guidance?",
    ctaSubtitle:
      "Our expert astrologers can find the most auspicious dates and timings for your important events.",
    ctaBook: "Book Consultation",
    ctaHoroscope: "Daily Horoscope",

    // FAQ section description
    faqDescription:
      "The Panchang is the traditional Hindu calendar that maps each day's cosmic energies through five limbs (panchanga). Use this guide to understand tithi, nakshatra, yoga, karana and vara, identify auspicious muhurat like Brahma Muhurta and Abhijit, and avoid inauspicious periods such as Rahu Kaal when planning daily activities.",

    // FAQ questions and answers
    faqQ1: "What is Panchang and why is it important?",
    faqA1: "Panchang is the traditional Hindu almanac that records five key elements of each day: tithi (lunar day), vara (weekday), nakshatra (lunar mansion), yoga and karana. Together these reveal the spiritual quality of the day. Indian families have used Panchang for centuries to choose muhurat for weddings, travel, business launches, religious rituals and other important activities.",
    faqQ2: "What are the five limbs (panchanga) of the Hindu calendar?",
    faqA2: "The five limbs are tithi (one of 30 lunar days based on moon-sun angle), vara (the weekday ruled by a planet), nakshatra (one of 27 lunar constellations the moon transits), yoga (a sun-moon longitude combination indicating energy quality), and karana (half of a tithi). Each limb adds a layer of meaning that helps determine whether a moment is favourable for a given activity.",
    faqQ3: "What is Rahu Kaal and why should it be avoided?",
    faqA3: "Rahu Kaal is a daily 90-minute window ruled by the shadow planet Rahu, considered inauspicious for starting new ventures, signing contracts, travel or important purchases. Its timing changes each day based on sunrise and the weekday. Many people simply pause major decisions during Rahu Kaal and use it instead for routine work, prayer or chanting.",
    faqQ4: "What is Brahma Muhurta and why wake up during it?",
    faqA4: "Brahma Muhurta is the 96-minute window ending about 48 minutes before sunrise, traditionally regarded as the most spiritually charged time of the day. The mind is naturally calm, the air is sattvic, and the atmosphere supports meditation, study, yoga and mantra practice. Sages have long recommended waking in Brahma Muhurta for clarity, health and spiritual progress.",
    faqQ5: "What is Abhijit Muhurta?",
    faqA5: "Abhijit Muhurta is a roughly 48-minute window centred on local solar noon, considered universally auspicious for almost any task except journeys towards the south. It is often called the victory muhurta and is a popular fallback when no other clear muhurat is available. Use it for important meetings, signing documents, or starting work that needs strong, steady energy.",
    faqQ6: "What is Choghadiya and how is it used?",
    faqA6: "Choghadiya divides daytime and nighttime into eight roughly 90-minute windows, each labelled Amrit, Shubh, Labh, Char, Rog, Kaal or Udveg. Shubh, Labh and Amrit are favourable for most activities, while Rog, Kaal and Udveg are best avoided for new starts. Choghadiya is widely used in Gujarat, Maharashtra and Rajasthan for quick muhurta lookups during the day.",
    faqQ7: "Why does Panchang vary by city or location?",
    faqA7: "Panchang timings depend on local sunrise, sunset and moon position, which differ across longitudes and latitudes. A tithi or Rahu Kaal that begins at one time in Delhi will start a few minutes earlier or later in Mumbai, Bengaluru or Kolkata. For accurate muhurat, always generate the Panchang for the city where the activity will actually take place.",
    faqQ8: "How do I use Panchang to choose a muhurat for weddings or travel?",
    faqA8: "For weddings, look for a favourable tithi (avoid Amavasya, Chaturdashi), benefic nakshatra such as Rohini, Mrigashira or Uttara Phalguni, an auspicious yoga, and a clear window outside Rahu Kaal and Yamaganda. For travel, also consider directional shool for that weekday. Combining multiple favourable factors generally gives better results than relying on any single element.",
    faqQ9: "What is the difference between Drik (modern) and traditional Panchang?",
    faqA9: "Drik Panchang uses precise modern astronomical calculations of actual planetary positions, so its tithi and nakshatra timings closely match what you can observe in the sky. Traditional Vakya Panchang relies on classical formulas that can drift slightly over centuries. Most contemporary Panchang sites, including this tool, follow the Drik system for better accuracy with current sky positions.",
    faqQ10: "What are Amanta and Purnimanta calendars?",
    faqA10: "Amanta and Purnimanta are two ways of marking the start of a Hindu lunar month. The Amanta system, common in South India, Maharashtra and Gujarat, ends each month on the new moon (Amavasya). The Purnimanta system, followed across most of North India, ends each month on the full moon (Purnima). The festivals are the same, but their month names can differ by one across regions.",
  },

  hi: {
    // Hero badge / heading / subtitle
    heroBadge: "हिंदू पंचांग",
    heroTitle: "दैनिक पंचांग",
    heroSubtitle: "तिथि, नक्षत्र, योग, करण और शुभ मुहूर्त —",
    heroSubtitleSuffix: "माह",

    // Date navigator
    goToToday: "आज पर जाएँ",

    // Festivals banner
    festivalToday: "आज का पर्व",
    fastingDay: "व्रत का दिन",

    // Sun / moon timing cards
    labelSunrise: "सूर्योदय",
    labelSunset: "सूर्यास्त",
    labelMoonrise: "चंद्रोदय",
    labelRahuKaal: "राहु काल",

    // Today's Vibe section
    todaysVibe: "आज का फल",
    vibeAuspicious: "शुभ दिन",
    vibeMixed: "मिश्रित दिन",
    vibeInauspicious: "अशुभ दिन",
    vibeAuspiciousSummary:
      "आज ग्रहों का प्रभाव नए कार्यारंभ, साधना और महत्त्वपूर्ण कार्यों के लिए अनुकूल है।",
    vibeMixedSummary:
      "आज का दिन शुभ और सावधानी दोनों ऊर्जाओं का संतुलन लिए हुए है। चोघड़िया से कार्य समय का चुनाव करें।",
    vibeInauspiciousSummary:
      "आज के ग्रह-नक्षत्र चुनौतीपूर्ण हैं। नित्यकर्म, पूजा-पाठ करें और नए कार्य आरंभ करने से बचें।",

    // Vibe info-pills
    pillTithiPrefix: "तिथि:",
    pillNakshatraPrefix: "नक्षत्र:",
    pillYogaPrefix: "योग:",
    pillYogaFavorable: "शुभ",
    pillYogaChallenging: "चुनौतीपूर्ण",

    // Weekday profile (varaInfo card)
    weekdayProfile: "वार परिचय",
    ruledBy: "स्वामी",
    deity: "देवता",
    luckyColor: "शुभ रंग",

    // Five Elements section
    fiveElementsHeading: "पंचांग — पाँच अंग",
    fiveElementsTip: "विवरण और मार्गदर्शन के लिए किसी पंक्ति पर टैप करें",

    // Five element row labels
    tithiLabel: "तिथि",
    tithiEnglish: "Tithi",
    nakshatraLabel: "नक्षत्र",
    nakshatraEnglish: "Nakshatra",
    yogaLabel: "योग",
    yogaEnglish: "Yoga",
    karanaLabel: "करण",
    karanaEnglish: "Karana",
    varaLabel: "वार",
    varaEnglish: "Day",

    // Sub-text inside element rows
    startsAt: "प्रारंभ",
    endsAt: "समाप्ति",
    pada: "पद",

    // Detail cell labels
    cellDeity: "देवता",
    cellNature: "स्वभाव",
    cellTithiNo: "तिथि क्रमांक",
    cellRuler: "स्वामी",
    cellType: "प्रकार",
    cellDay: "वार",
    cellLuckyColor: "शुभ रंग",
    cellMantra: "मंत्र",
    cellTraditionalFasts: "परंपरागत व्रत",
    cellFavorableActivities: "शुभ कार्य",

    // BulletList titles
    bulletFavorable: "शुभ कार्य",
    bulletAvoid: "परहेज करें",

    // InfoPill labels
    pillAuspicious: "शुभ",
    pillInauspicious: "अशुभ",

    // Activity Recommendations section
    activityHeading: "क्रिया-कलाप मार्गदर्शन",
    activitySubtitle: "आज क्या करें और क्या न करें",
    activityFavorable: "शुभ",
    activityAvoid: "परहेज",

    // Auspicious timings panel
    auspiciousTimings: "शुभ समय",
    labelBrahmaMuhurta: "ब्रह्म मुहूर्त",
    labelAbhijitMuhurta: "अभिजित मुहूर्त",

    // Inauspicious timings panel
    inauspiciousTimings: "अशुभ समय",
    labelYamaganda: "यमगण्ड",
    labelGulikaKaal: "गुलिक काल",

    // Choghadiya section
    choghadiyaHeading: "चोघड़िया मुहूर्त",
    choghadiyaSubtitle:
      "दिन और रात के 8 समय-खंड — शुभ चोघड़िए में महत्त्वपूर्ण कार्य करें",
    choghadiyaDay: "दिन चोघड़िया",
    choghadiyaNight: "रात चोघड़िया",
    choghadiyaUnavailable: "इस तिथि के लिए चोघड़िया उपलब्ध नहीं है",
    choghadiyaShubh: "शुभ",
    choghadiyaAshubh: "अशुभ",

    // Mantra of the Day
    mantraOfDay: "दिन का मंत्र",
    mantraCopy: "कॉपी करें",
    mantraCopied: "कॉपी हुआ",
    mantraChantTip: "सूर्योदय से पहले 108 बार जाप करने से श्रेष्ठ फल मिलता है",

    // Astronomical Details section
    astronomicalHeading: "ज्योतिषीय विवरण",
    labelMoonSign: "चंद्र राशि",
    labelSunSign: "सूर्य राशि",
    labelSeason: "ऋतु",
    labelHinduMonth: "हिंदू मास",
    labelVikramSamvat: "विक्रम संवत",
    labelShakaSamvat: "शक संवत",
    labelSamvatsara: "संवत्सर",

    // Bottom CTA
    ctaHeading: "व्यक्तिगत मुहूर्त मार्गदर्शन चाहिए?",
    ctaSubtitle:
      "हमारे विशेषज्ञ ज्योतिषी आपके महत्त्वपूर्ण कार्यों के लिए सबसे शुभ तिथि और मुहूर्त निकालेंगे।",
    ctaBook: "परामर्श बुक करें",
    ctaHoroscope: "दैनिक राशिफल",

    // FAQ section description
    faqDescription:
      "पंचांग पारंपरिक हिंदू कैलेंडर है जो प्रत्येक दिन की ब्रह्मांडीय ऊर्जाओं को पाँच अंगों (पंचांग) के माध्यम से प्रस्तुत करता है। इस मार्गदर्शिका से तिथि, नक्षत्र, योग, करण और वार को समझें; ब्रह्म मुहूर्त और अभिजित मुहूर्त जैसे शुभ मुहूर्त पहचानें; और राहु काल जैसे अशुभ कालों में महत्त्वपूर्ण कार्य करने से बचें।",

    // FAQ questions and answers
    faqQ1: "पंचांग क्या है और यह क्यों महत्त्वपूर्ण है?",
    faqA1: "पंचांग पारंपरिक हिंदू पंचांग है जो प्रत्येक दिन के पाँच प्रमुख अंग — तिथि (चंद्र दिन), वार (सप्ताह का दिन), नक्षत्र (चंद्र मंडल), योग और करण — का विवरण देता है। ये सब मिलकर दिन की आध्यात्मिक गुणवत्ता प्रकट करते हैं। भारतीय परिवार सदियों से विवाह, यात्रा, व्यापार आरंभ, धार्मिक अनुष्ठान और अन्य महत्त्वपूर्ण कार्यों के लिए मुहूर्त चुनने हेतु पंचांग का उपयोग करते आए हैं।",
    faqQ2: "हिंदू पंचांग के पाँच अंग कौन-कौन से हैं?",
    faqA2: "पाँच अंग हैं — तिथि (चंद्र-सूर्य कोण पर आधारित 30 चंद्र दिनों में से एक), वार (ग्रह-स्वामी सप्ताह का दिन), नक्षत्र (27 चंद्र नक्षत्रों में से एक जिसमें चंद्रमा विचरण करता है), योग (सूर्य-चंद्र रेखांश के संयोग से ऊर्जा गुण का बोध), और करण (तिथि का आधा भाग)। प्रत्येक अंग अर्थ की एक परत जोड़ता है जिससे यह निर्धारित होता है कि कोई क्षण किसी कार्य के लिए अनुकूल है या नहीं।",
    faqQ3: "राहु काल क्या है और इससे क्यों बचना चाहिए?",
    faqA3: "राहु काल प्रतिदिन का एक 90 मिनट का खंड है जो छाया ग्रह राहु के प्रभाव में होता है। इसे नए उद्यम आरंभ करने, अनुबंध पर हस्ताक्षर करने, यात्रा या महत्त्वपूर्ण क्रय के लिए अशुभ माना जाता है। इसका समय प्रतिदिन सूर्योदय और वार के अनुसार बदलता है। बहुत से लोग राहु काल में बड़े निर्णय स्थगित कर देते हैं और इस समय का उपयोग नियमित कार्य, पूजा-पाठ या मंत्र जाप के लिए करते हैं।",
    faqQ4: "ब्रह्म मुहूर्त क्या है और इसमें जागना क्यों अच्छा माना जाता है?",
    faqA4: "ब्रह्म मुहूर्त सूर्योदय से लगभग 48 मिनट पहले समाप्त होने वाला 96 मिनट का काल है, जिसे दिन का सर्वाधिक आध्यात्मिक रूप से शक्तिशाली समय माना जाता है। इस समय मन स्वाभाविक रूप से शांत होता है, वायु सात्त्विक होती है और वातावरण ध्यान, अध्ययन, योग व मंत्र साधना के लिए अनुकूल होता है। ऋषि-मुनियों ने स्वास्थ्य, स्पष्टता और आध्यात्मिक उन्नति के लिए ब्रह्म मुहूर्त में जागने की परंपरा सदा से प्रचलित की है।",
    faqQ5: "अभिजित मुहूर्त क्या होता है?",
    faqA5: "अभिजित मुहूर्त स्थानीय सौर मध्याह्न के आस-पास का लगभग 48 मिनट का काल है, जिसे दक्षिण दिशा की यात्रा को छोड़कर लगभग किसी भी कार्य के लिए सार्वभौमिक रूप से शुभ माना जाता है। इसे 'विजय मुहूर्त' भी कहते हैं और जब कोई अन्य स्पष्ट मुहूर्त उपलब्ध न हो तब यह एक लोकप्रिय विकल्प है। महत्त्वपूर्ण बैठकों, दस्तावेज़ों पर हस्ताक्षर करने या दृढ़ ऊर्जा की आवश्यकता वाले कार्यों को आरंभ करने के लिए इसका उपयोग करें।",
    faqQ6: "चोघड़िया क्या है और इसका उपयोग कैसे होता है?",
    faqA6: "चोघड़िया दिन और रात को आठ लगभग 90 मिनट के खंडों में विभाजित करता है, जिन्हें अमृत, शुभ, लाभ, चर, रोग, काल या उद्वेग नाम दिया जाता है। शुभ, लाभ और अमृत अधिकांश कार्यों के लिए अनुकूल हैं, जबकि रोग, काल और उद्वेग में नया कार्य आरंभ न करना उचित है। चोघड़िया का उपयोग गुजरात, महाराष्ट्र और राजस्थान में दैनिक त्वरित मुहूर्त निर्धारण के लिए बड़े पैमाने पर होता है।",
    faqQ7: "पंचांग शहर या स्थान के अनुसार अलग क्यों होता है?",
    faqA7: "पंचांग के समय स्थानीय सूर्योदय, सूर्यास्त और चंद्रमा की स्थिति पर निर्भर करते हैं, जो देशांतर और अक्षांश के अनुसार भिन्न होते हैं। दिल्ली में जिस समय कोई तिथि या राहु काल आरंभ होता है, वही मुंबई, बेंगलुरु या कोलकाता में कुछ मिनट आगे-पीछे हो सकता है। सटीक मुहूर्त के लिए सदा उस नगर का पंचांग देखें जहाँ वह कार्य वास्तव में होना है।",
    faqQ8: "विवाह या यात्रा के लिए मुहूर्त चुनने में पंचांग का उपयोग कैसे करें?",
    faqA8: "विवाह के लिए शुभ तिथि (अमावस्या और चतुर्दशी से बचें), रोहिणी, मृगशिरा या उत्तर फाल्गुनी जैसे शुभ नक्षत्र, अनुकूल योग और राहु काल व यमगण्ड से मुक्त समय खिड़की देखें। यात्रा के लिए उस वार की दिशा-शूल भी ध्यान में रखें। केवल एक तत्त्व पर निर्भर रहने की अपेक्षा एकाधिक शुभ कारकों का संयोग सामान्यतः बेहतर परिणाम देता है।",
    faqQ9: "दृक (आधुनिक) और पारंपरिक पंचांग में क्या अंतर है?",
    faqA9: "दृक पंचांग वास्तविक ग्रह स्थितियों की सटीक आधुनिक खगोलीय गणनाओं का उपयोग करता है, इसलिए इसके तिथि और नक्षत्र के समय आकाश में दिखने वाली वास्तविकता से मेल खाते हैं। पारंपरिक वाक्य पंचांग शास्त्रीय सूत्रों पर आधारित है, जो शताब्दियों में थोड़ा अंतर दे सकते हैं। इस टूल सहित अधिकांश समकालीन पंचांग स्थल वर्तमान ग्रह-स्थितियों की सटीकता के लिए दृक पद्धति अपनाते हैं।",
    faqQ10: "अमांत और पूर्णिमांत पंचांग क्या होते हैं?",
    faqA10: "अमांत और पूर्णिमांत हिंदू चंद्र मास के आरंभ को चिह्नित करने के दो तरीके हैं। अमांत पद्धति, जो दक्षिण भारत, महाराष्ट्र और गुजरात में प्रचलित है, प्रत्येक मास का अंत अमावस्या पर करती है। पूर्णिमांत पद्धति, जो उत्तर भारत के अधिकांश भाग में मानी जाती है, प्रत्येक मास का अंत पूर्णिमा पर करती है। पर्व-त्योहार समान होते हैं, परंतु क्षेत्र के अनुसार मास के नाम एक से भिन्न हो सकते हैं।",
  },
} as const;
