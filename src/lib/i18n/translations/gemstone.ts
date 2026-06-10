// Hindi/English dictionary for the Gemstone Recommender tool.
// Keys are stable, descriptive camelCase. `hi` MUST have exactly the same keys as `en`.

export const gemstone = {
  en: {
    // --- Hero ---
    heroBadge: "Vedic Gemstone Therapy",
    heroTitle: "Gemstone Recommender",
    heroSubtitle:
      "Discover the perfect gemstone for you based on your birth chart. Our Vedic astrology engine analyzes your Kundli to recommend stones that strengthen beneficial planets and protect against afflictions.",

    // --- Form ---
    formTitle: "Enter Your Birth Details",
    labelDob: "Date of Birth",
    dobPlaceholder: "Select date of birth",
    labelTime: "Time of Birth",
    labelPlace: "Place of Birth",
    findBtn: "Find My Gemstones",

    // --- Errors ---
    errBothRequired: "Please enter both date and time of birth.",
    errCalcFailed: "Could not calculate Kundli. Please check your inputs and try again.",

    // --- Primary Gemstone ---
    primaryEyebrow: "Your Primary Gemstone",
    primaryHeading: "Based on Your Ascendant",
    basedOnAscendant: "Based on your Ascendant:",
    ruledBy: "Ruled by",
    benefits: "Benefits",
    metal: "Metal",
    finger: "Finger",
    bestDay: "Best Day",
    alternativeStones: "Alternative Stones",
    shopPrefix: "Shop",

    // --- Additional Recommendations ---
    additionalEyebrow: "Additional Recommendations",
    additionalHeading: "Strengthen Weak Planets",
    additionalSub: "These planets need support in your birth chart",
    condDebilitated: "Debilitated",
    condEnemy: "In enemy sign",
    condRetrograde: "Retrograde",

    // --- Birth Chart Summary ---
    chartEyebrow: "Your Birth Chart",
    chartHeading: "Summary",
    ascendantLagna: "Ascendant (Lagna)",
    moonSign: "Moon Sign",
    sunSign: "Sun Sign",
    mahadasha: "Mahadasha",

    // --- Disclaimer ---
    importantNote: "Important Note",
    disclaimerBody:
      "Gemstone recommendations are based on Vedic astrology principles. Please consult a qualified astrologer before wearing any gemstone, especially Blue Sapphire (Neelam). The effectiveness of gemstones depends on stone quality, correct weight, and proper energization (Pran Pratishtha).",

    // --- planetToGemstone prose: benefits + caution ---
    benefitSun:
      "Ruby strengthens leadership qualities, boosts confidence, and enhances vitality. It helps gain recognition, authority, and supports heart health. Ideal for those seeking success in government or politics.",
    cautionSun:
      "Avoid if Sun is a functional malefic for your ascendant. Consult an astrologer before wearing.",
    benefitMoon:
      "Pearl calms the mind, controls emotions, and strengthens mental health. It enhances intuition, improves relationships with mother, and brings peace. Excellent for those in creative fields.",
    cautionMoon:
      "Not recommended if Moon is waning or associated with malefics in certain positions. Seek expert guidance.",
    benefitMars:
      "Red Coral boosts courage, physical strength, and determination. It helps overcome laziness, debt, and property-related issues. Beneficial for athletes and those in defence or real estate.",
    cautionMars:
      "Should be avoided if Mars is a malefic lord for your chart. Always verify with an astrologer.",
    benefitMercury:
      "Emerald sharpens intellect, improves communication, and enhances business acumen. It aids in education, writing, and trade. Highly beneficial for students and professionals in finance or IT.",
    cautionMercury:
      "Avoid if Mercury is combust or a functional malefic. Professional consultation is advised.",
    benefitJupiter:
      "Yellow Sapphire brings wisdom, prosperity, and spiritual growth. It strengthens marriage prospects, wealth, and children-related matters. One of the most auspicious gemstones in Vedic astrology.",
    cautionJupiter:
      "Generally safe but should still be verified for your specific chart. Avoid low-quality or treated stones.",
    benefitVenus:
      "Diamond enhances luxury, romance, artistic talents, and beauty. It attracts wealth, improves married life, and supports reproductive health. Ideal for those in arts, entertainment, or fashion.",
    cautionVenus:
      "Not advisable if Venus is debilitated or a functional malefic. Consult before wearing.",
    benefitSaturn:
      "Blue Sapphire can bring rapid results in career, discipline, and long-term wealth. It helps overcome delays, legal issues, and chronic problems. Extremely powerful when suited to the wearer.",
    cautionSaturn:
      "Blue Sapphire is the most sensitive gemstone. It MUST be trial-worn for 3 days before permanent use. Never wear without expert consultation.",
    benefitRahu:
      "Hessonite neutralizes the malefic effects of Rahu, helps with confusion, addictions, and foreign connections. It supports success in unconventional fields and overseas endeavors.",
    cautionRahu:
      "Only wear if Rahu is positively placed or during Rahu Mahadasha. Expert analysis is essential.",
    benefitKetu:
      "Cat's Eye protects against hidden enemies, accidents, and supernatural influences. It enhances spiritual progress, detachment, and mystical abilities. Good during Ketu Mahadasha.",
    cautionKetu:
      "Highly sensitive stone similar to Blue Sapphire. Trial wear is recommended. Consult an experienced astrologer.",

    // --- FAQ ---
    faqDescription:
      "Vedic gemstones, also known as Ratnas, channel planetary energies from your birth chart to amplify benefic influences and soothe afflictions. Below are answers to the most common questions about lucky gemstone recommendations, the Navaratna system, Pukhraj, Neelam, certification, weight, and how to wear them safely.",
    faqQ1: "How do Vedic gemstones actually work?",
    faqA1:
      "Each gemstone is believed to act like an antenna for a specific planet. Ruby resonates with the Sun, Pearl with the Moon, Pukhraj with Jupiter, and so on. When the matching planet is benefic but weak in your Kundli, wearing its stone is said to absorb cosmic rays of that planet through the skin and strengthen its influence in areas like career, marriage, health, or wealth.",
    faqQ2: "What is Navaratna and which 9 gemstones make it up?",
    faqA2:
      "Navaratna means nine gems, one for each of the nine Vedic planets. The traditional set is Ruby for Sun, Pearl for Moon, Red Coral for Mars, Emerald for Mercury, Yellow Sapphire (Pukhraj) for Jupiter, Diamond for Venus, Blue Sapphire (Neelam) for Saturn, Hessonite (Gomed) for Rahu, and Cat's Eye (Lehsunia) for Ketu. A Navaratna pendant combines all nine in a fixed pattern.",
    faqQ3: "Why should gemstone choice be based on the birth chart and not just zodiac sign?",
    faqA3:
      "Sun-sign suggestions are too generic. The right gemstone depends on your Lagna (ascendant), the strength of planets in your chart, the houses they rule, and the current Mahadasha. Two people born under the same sign can need very different stones. Our recommender uses your full birth date, time, and place to compute the Kundli, which is far more accurate than zodiac-only advice.",
    faqQ4: "Can a wrong gemstone harm you?",
    faqA4:
      "Yes, especially Blue Sapphire (Neelam). If Saturn is malefic for your ascendant, Neelam can intensify struggles instead of helping. Even Pukhraj or Moonga can backfire when the ruling planet sits in a hostile house. This is why we recommend a 3-day trial wear for sensitive stones and always suggest confirming with a qualified astrologer before permanent use.",
    faqQ5: "What is the minimum carat weight for a gemstone to work?",
    faqA5:
      "A common Vedic guideline is one ratti (around 0.91 carats) for every 12 kilograms of body weight, with most adults wearing between 3 and 7 carats. Ruby, Pukhraj, and Neelam usually start showing effects from 3 carats. Pearl and Moonga can be effective at 5 to 7 carats. Quality matters more than size, an untreated 3-carat stone outperforms a treated 7-carat one.",
    faqQ6: "Which finger and metal should I use for my gemstone?",
    faqA6:
      "Pukhraj goes on the index finger in gold. Ruby and Moonga sit on the ring finger, Ruby in gold and Moonga in copper or gold. Pearl and Emerald are worn on the little finger in silver or gold. Neelam, Diamond, and Gomed go on the middle finger. Cat's Eye sits on the little finger in silver. Always wear the gem so it touches the skin to allow energy flow.",
    faqQ7: "How do I energize or activate a gemstone before wearing?",
    faqA7:
      "On the planet's day and during a clean Hora or Choghadiya, soak the ring in raw cow milk, Ganga jal, or a mix of milk, honey, curd, ghee, and sugar (Panchamrit) for a few hours. Then chant the planet's beej mantra 108 times, light a diya, and wear the ring with the planet's mantra in mind. This Pran Pratishtha process is believed to awaken the stone's vibration.",
    faqQ8: "What are uparatnas and when should I use a substitute stone?",
    faqA8:
      "Uparatnas are softer, more affordable substitutes for the nine main gems. Yellow Topaz or Citrine substitutes Pukhraj, Garnet or Red Spinel for Ruby, Green Tourmaline or Peridot for Emerald, Amethyst for Neelam, and White Sapphire or Zircon for Diamond. They work at lower intensity but are useful when budget is tight or when you want to test compatibility before investing in a precious stone.",
    faqQ9: "Why is gemstone certification important?",
    faqA9:
      "A genuine natural gemstone with no heat or chemical treatment is essential for astrological results. Always insist on a lab certificate from GIA, IGI, GRS, Gubelin, or an equivalent gemmological lab. The report should mention origin, treatment status, weight in carats, and clarity. Treated, glass-filled, or synthetic stones are cheap but carry no astrological value and can mislead the wearer.",
    faqQ10: "When should I remove or replace my gemstone?",
    faqA10:
      "If a stone develops a visible crack, internal cloudiness, or simply slips off on its own, treat it as a sign that the gem has absorbed energy and needs replacement. Many wearers re-energize their gem every six months. Remove the stone when its planet's Mahadasha or Antardasha ends and the next planet becomes more relevant. A short astrology check before replacing is always wise.",

    // --- Bottom CTA ---
    ctaHeading: "Need Expert Guidance?",
    ctaBody:
      "Our experienced Vedic astrologers can provide personalized gemstone recommendations based on a detailed analysis of your complete birth chart.",
    ctaConsultBtn: "Get Personalized Consultation",
    ctaShopBtn: "Shop All Gemstones",
  },
  hi: {
    // --- Hero ---
    heroBadge: "वैदिक रत्न चिकित्सा",
    heroTitle: "रत्न परामर्शदाता",
    heroSubtitle:
      "अपनी जन्म कुंडली के आधार पर अपने लिए सर्वोत्तम रत्न का पता लगाएं। हमारा वैदिक ज्योतिष इंजन आपकी कुंडली का विश्लेषण करके ऐसे रत्न सुझाता है जो शुभ ग्रहों को बल देते हैं और ग्रह दोषों से रक्षा करते हैं।",

    // --- Form ---
    formTitle: "अपना जन्म विवरण दर्ज करें",
    labelDob: "जन्म तिथि",
    dobPlaceholder: "जन्म तिथि चुनें",
    labelTime: "जन्म समय",
    labelPlace: "जन्म स्थान",
    findBtn: "मेरे रत्न खोजें",

    // --- Errors ---
    errBothRequired: "कृपया जन्म तिथि और जन्म समय दोनों दर्ज करें।",
    errCalcFailed: "कुंडली की गणना नहीं हो सकी। कृपया अपनी जानकारी जांचें और पुनः प्रयास करें।",

    // --- Primary Gemstone ---
    primaryEyebrow: "आपका मुख्य रत्न",
    primaryHeading: "आपके लग्न के आधार पर",
    basedOnAscendant: "आपके लग्न के आधार पर:",
    ruledBy: "स्वामी ग्रह",
    benefits: "लाभ",
    metal: "धातु",
    finger: "अंगुली",
    bestDay: "शुभ दिन",
    alternativeStones: "वैकल्पिक रत्न",
    shopPrefix: "खरीदें",

    // --- Additional Recommendations ---
    additionalEyebrow: "अतिरिक्त सुझाव",
    additionalHeading: "कमज़ोर ग्रहों को बल दें",
    additionalSub: "आपकी जन्म कुंडली में इन ग्रहों को सहायता की आवश्यकता है",
    condDebilitated: "नीच का",
    condEnemy: "शत्रु राशि में",
    condRetrograde: "वक्री",

    // --- Birth Chart Summary ---
    chartEyebrow: "आपकी जन्म कुंडली",
    chartHeading: "सारांश",
    ascendantLagna: "लग्न",
    moonSign: "चंद्र राशि",
    sunSign: "सूर्य राशि",
    mahadasha: "महादशा",

    // --- Disclaimer ---
    importantNote: "महत्वपूर्ण सूचना",
    disclaimerBody:
      "रत्न संबंधी सुझाव वैदिक ज्योतिष के सिद्धांतों पर आधारित हैं। कोई भी रत्न धारण करने से पहले, विशेषकर नीलम, किसी योग्य ज्योतिषी से परामर्श अवश्य लें। रत्नों का प्रभाव रत्न की गुणवत्ता, सही वज़न और उचित प्राण प्रतिष्ठा पर निर्भर करता है।",

    // --- planetToGemstone prose: benefits + caution ---
    benefitSun:
      "माणिक नेतृत्व क्षमता को मज़बूत करता है, आत्मविश्वास बढ़ाता है और जीवनशक्ति में वृद्धि करता है। यह मान-सम्मान और अधिकार दिलाने में सहायक है तथा हृदय के स्वास्थ्य को बल देता है। सरकारी सेवा या राजनीति में सफलता चाहने वालों के लिए आदर्श है।",
    cautionSun:
      "यदि आपके लग्न के लिए सूर्य अशुभ (फंक्शनल मैलेफिक) है तो इसे धारण न करें। धारण करने से पहले किसी ज्योतिषी से परामर्श करें।",
    benefitMoon:
      "मोती मन को शांत करता है, भावनाओं को नियंत्रित करता है और मानसिक स्वास्थ्य को मज़बूत बनाता है। यह अंतर्ज्ञान बढ़ाता है, माता के साथ संबंध सुधारता है और शांति प्रदान करता है। रचनात्मक क्षेत्रों में कार्यरत लोगों के लिए उत्तम है।",
    cautionMoon:
      "यदि चंद्रमा क्षीण हो या कुछ स्थानों पर पाप ग्रहों से युक्त हो तो इसे धारण करना उचित नहीं है। विशेषज्ञ मार्गदर्शन लें।",
    benefitMars:
      "मूंगा साहस, शारीरिक बल और दृढ़ संकल्प को बढ़ाता है। यह आलस्य, ऋण और संपत्ति संबंधी समस्याओं से उबरने में सहायक है। खिलाड़ियों तथा रक्षा या रियल एस्टेट क्षेत्र के लोगों के लिए लाभकारी है।",
    cautionMars:
      "यदि आपकी कुंडली में मंगल अशुभ स्वामी हो तो इससे बचना चाहिए। हमेशा किसी ज्योतिषी से पुष्टि कर लें।",
    benefitMercury:
      "पन्ना बुद्धि को तीव्र करता है, संवाद कौशल में सुधार लाता है और व्यापारिक सूझबूझ बढ़ाता है। यह शिक्षा, लेखन और व्यापार में सहायक है। वित्त या आईटी क्षेत्र के विद्यार्थियों एवं पेशेवरों के लिए अत्यंत लाभकारी है।",
    cautionMercury:
      "यदि बुध अस्त (कॉम्बस्ट) हो या अशुभ ग्रह हो तो इसे धारण न करें। किसी विशेषज्ञ से परामर्श लेने की सलाह दी जाती है।",
    benefitJupiter:
      "पुखराज ज्ञान, समृद्धि और आध्यात्मिक उन्नति लाता है। यह विवाह योग, धन और संतान संबंधी मामलों को मज़बूत करता है। यह वैदिक ज्योतिष के सबसे शुभ रत्नों में से एक है।",
    cautionJupiter:
      "यह सामान्यतः सुरक्षित है, फिर भी आपकी विशेष कुंडली के लिए इसकी पुष्टि अवश्य करनी चाहिए। निम्न गुणवत्ता वाले या उपचारित (ट्रीटेड) रत्न न लें।",
    benefitVenus:
      "हीरा विलासिता, प्रेम, कलात्मक प्रतिभा और सौंदर्य को बढ़ाता है। यह धन आकर्षित करता है, वैवाहिक जीवन सुधारता है और प्रजनन स्वास्थ्य को बल देता है। कला, मनोरंजन या फैशन क्षेत्र के लोगों के लिए आदर्श है।",
    cautionVenus:
      "यदि शुक्र नीच का हो या अशुभ ग्रह हो तो इसे धारण करना उचित नहीं है। धारण करने से पहले परामर्श करें।",
    benefitSaturn:
      "नीलम करियर, अनुशासन और दीर्घकालिक धन में शीघ्र परिणाम दे सकता है। यह विलंब, कानूनी मामलों और पुरानी समस्याओं से उबरने में सहायक है। जब यह धारक के अनुकूल हो, तो अत्यंत प्रभावशाली होता है।",
    cautionSaturn:
      "नीलम सबसे संवेदनशील रत्न है। स्थायी रूप से धारण करने से पहले इसे 3 दिन तक परीक्षण के तौर पर पहनना अनिवार्य है। विशेषज्ञ परामर्श के बिना इसे कभी न पहनें।",
    benefitRahu:
      "गोमेद राहु के अशुभ प्रभावों को कम करता है तथा भ्रम, व्यसन और विदेश संबंधी मामलों में सहायक है। यह असामान्य क्षेत्रों और विदेशी प्रयासों में सफलता दिलाता है।",
    cautionRahu:
      "इसे केवल तभी धारण करें जब राहु शुभ स्थान पर हो या राहु महादशा चल रही हो। विशेषज्ञ विश्लेषण आवश्यक है।",
    benefitKetu:
      "लहसुनिया छिपे हुए शत्रुओं, दुर्घटनाओं और नकारात्मक शक्तियों से रक्षा करता है। यह आध्यात्मिक उन्नति, वैराग्य और रहस्यमय क्षमताओं को बढ़ाता है। केतु महादशा में यह लाभकारी है।",
    cautionKetu:
      "यह नीलम के समान अत्यंत संवेदनशील रत्न है। इसे परीक्षण के तौर पर पहनने की सलाह दी जाती है। किसी अनुभवी ज्योतिषी से परामर्श करें।",

    // --- FAQ ---
    faqDescription:
      "वैदिक रत्न, जिन्हें रत्न (रत्ना) भी कहा जाता है, आपकी जन्म कुंडली से ग्रहों की ऊर्जा को संचालित करते हैं ताकि शुभ प्रभावों को बढ़ाया जा सके और दोषों को शांत किया जा सके। नीचे शुभ रत्नों के सुझाव, नवरत्न पद्धति, पुखराज, नीलम, प्रमाणन, वज़न और उन्हें सुरक्षित रूप से धारण करने के तरीके से जुड़े सबसे सामान्य प्रश्नों के उत्तर दिए गए हैं।",
    faqQ1: "वैदिक रत्न वास्तव में कैसे काम करते हैं?",
    faqA1:
      "माना जाता है कि प्रत्येक रत्न किसी विशेष ग्रह के लिए एक एंटीना की तरह कार्य करता है। माणिक सूर्य से, मोती चंद्रमा से, पुखराज बृहस्पति से और इसी प्रकार अन्य रत्न संबंधित ग्रहों से तालमेल रखते हैं। जब संबंधित ग्रह शुभ हो परंतु कुंडली में कमज़ोर हो, तो उसका रत्न धारण करने से उस ग्रह की किरणें त्वचा के माध्यम से अवशोषित होकर करियर, विवाह, स्वास्थ्य या धन जैसे क्षेत्रों में उसके प्रभाव को मज़बूत करती हैं।",
    faqQ2: "नवरत्न क्या है और इसमें कौन-से 9 रत्न शामिल होते हैं?",
    faqA2:
      "नवरत्न का अर्थ है नौ रत्न, प्रत्येक नवग्रह के लिए एक। पारंपरिक समूह इस प्रकार है — सूर्य के लिए माणिक, चंद्रमा के लिए मोती, मंगल के लिए मूंगा, बुध के लिए पन्ना, बृहस्पति के लिए पुखराज, शुक्र के लिए हीरा, शनि के लिए नीलम, राहु के लिए गोमेद और केतु के लिए लहसुनिया। नवरत्न पेंडेंट में ये सभी नौ रत्न एक निश्चित क्रम में जड़े होते हैं।",
    faqQ3: "रत्न का चयन केवल राशि के बजाय जन्म कुंडली के आधार पर क्यों होना चाहिए?",
    faqA3:
      "केवल सूर्य राशि के आधार पर दिए गए सुझाव बहुत सामान्य होते हैं। सही रत्न आपके लग्न, कुंडली में ग्रहों की शक्ति, उनके स्वामित्व वाले भावों और वर्तमान महादशा पर निर्भर करता है। एक ही राशि में जन्मे दो व्यक्तियों को बहुत भिन्न रत्नों की आवश्यकता हो सकती है। हमारा परामर्शदाता कुंडली की गणना के लिए आपकी पूरी जन्म तिथि, समय और स्थान का उपयोग करता है, जो केवल राशि-आधारित सलाह से कहीं अधिक सटीक है।",
    faqQ4: "क्या गलत रत्न आपको नुकसान पहुंचा सकता है?",
    faqA4:
      "हां, विशेषकर नीलम। यदि आपके लग्न के लिए शनि अशुभ है, तो नीलम सहायता करने के बजाय कष्टों को बढ़ा सकता है। यहां तक कि पुखराज या मूंगा भी तब विपरीत प्रभाव डाल सकते हैं जब स्वामी ग्रह प्रतिकूल भाव में हो। यही कारण है कि हम संवेदनशील रत्नों के लिए 3 दिन का परीक्षण धारण करने की सलाह देते हैं और स्थायी रूप से पहनने से पहले हमेशा किसी योग्य ज्योतिषी से पुष्टि करने को कहते हैं।",
    faqQ5: "रत्न के प्रभावी होने के लिए न्यूनतम कैरेट वज़न कितना होना चाहिए?",
    faqA5:
      "एक सामान्य वैदिक नियम के अनुसार शरीर के प्रत्येक 12 किलोग्राम वज़न पर एक रत्ती (लगभग 0.91 कैरेट) रत्न होना चाहिए, और अधिकांश वयस्क 3 से 7 कैरेट के बीच रत्न धारण करते हैं। माणिक, पुखराज और नीलम सामान्यतः 3 कैरेट से प्रभाव दिखाना शुरू करते हैं। मोती और मूंगा 5 से 7 कैरेट में प्रभावी हो सकते हैं। आकार से अधिक गुणवत्ता मायने रखती है — एक अनुपचारित 3 कैरेट का रत्न उपचारित 7 कैरेट के रत्न से बेहतर परिणाम देता है।",
    faqQ6: "मुझे अपना रत्न किस अंगुली में और किस धातु में धारण करना चाहिए?",
    faqA6:
      "पुखराज सोने में तर्जनी अंगुली में पहना जाता है। माणिक और मूंगा अनामिका अंगुली में पहने जाते हैं — माणिक सोने में और मूंगा तांबे या सोने में। मोती और पन्ना कनिष्ठा अंगुली में चांदी या सोने में पहने जाते हैं। नीलम, हीरा और गोमेद मध्यमा अंगुली में पहने जाते हैं। लहसुनिया चांदी में कनिष्ठा अंगुली में पहना जाता है। रत्न को हमेशा इस प्रकार पहनें कि वह त्वचा को स्पर्श करे ताकि ऊर्जा का प्रवाह हो सके।",
    faqQ7: "रत्न पहनने से पहले उसे कैसे ऊर्जावान या अभिमंत्रित करें?",
    faqA7:
      "संबंधित ग्रह के दिन और शुभ होरा या चौघड़िया में अंगूठी को कच्चे गाय के दूध, गंगाजल, या दूध, शहद, दही, घी और शक्कर के मिश्रण (पंचामृत) में कुछ घंटों के लिए डुबोएं। फिर ग्रह के बीज मंत्र का 108 बार जाप करें, दीया जलाएं और ग्रह के मंत्र का ध्यान करते हुए अंगूठी धारण करें। यह प्राण प्रतिष्ठा की प्रक्रिया रत्न की ऊर्जा को जागृत करने वाली मानी जाती है।",
    faqQ8: "उपरत्न क्या हैं और मुझे विकल्प रत्न का उपयोग कब करना चाहिए?",
    faqA8:
      "उपरत्न नौ मुख्य रत्नों के अपेक्षाकृत नरम और सस्ते विकल्प होते हैं। पीला पुखराज (टोपाज़) या सुनैला पुखराज का विकल्प है, गार्नेट या रेड स्पिनल माणिक का, ग्रीन टूरमलाइन या पेरीडॉट पन्ने का, एमेथिस्ट (कटैला) नीलम का, और सफेद पुखराज या जरकन हीरे का विकल्प है। ये कम तीव्रता पर कार्य करते हैं परंतु तब उपयोगी होते हैं जब बजट सीमित हो या आप किसी कीमती रत्न में निवेश करने से पहले उसकी अनुकूलता जांचना चाहते हों।",
    faqQ9: "रत्न का प्रमाणन (सर्टिफिकेशन) क्यों महत्वपूर्ण है?",
    faqA9:
      "ज्योतिषीय परिणामों के लिए बिना किसी ताप या रासायनिक उपचार वाला असली प्राकृतिक रत्न आवश्यक है। हमेशा GIA, IGI, GRS, Gubelin या किसी समकक्ष रत्न प्रयोगशाला से लैब प्रमाणपत्र की मांग करें। रिपोर्ट में रत्न की उत्पत्ति, उपचार की स्थिति, कैरेट में वज़न और स्पष्टता का उल्लेख होना चाहिए। उपचारित, कांच भरे या कृत्रिम रत्न सस्ते होते हैं परंतु उनका कोई ज्योतिषीय महत्व नहीं होता और वे धारक को भ्रमित कर सकते हैं।",
    faqQ10: "मुझे अपना रत्न कब उतारना या बदलना चाहिए?",
    faqA10:
      "यदि रत्न में दिखाई देने वाली दरार आ जाए, उसमें भीतर से धुंधलापन आ जाए, या वह स्वयं ही निकलकर गिर जाए, तो इसे संकेत मानें कि रत्न ने ऊर्जा अवशोषित कर ली है और उसे बदलने की आवश्यकता है। कई लोग अपने रत्न को हर छह माह में पुनः ऊर्जावान करते हैं। जब संबंधित ग्रह की महादशा या अंतर्दशा समाप्त हो और अगला ग्रह अधिक प्रभावी हो जाए, तब रत्न उतार दें। रत्न बदलने से पहले एक छोटी ज्योतिष जांच हमेशा बुद्धिमानी है।",

    // --- Bottom CTA ---
    ctaHeading: "विशेषज्ञ मार्गदर्शन चाहिए?",
    ctaBody:
      "हमारे अनुभवी वैदिक ज्योतिषी आपकी संपूर्ण जन्म कुंडली के विस्तृत विश्लेषण के आधार पर व्यक्तिगत रत्न सुझाव प्रदान कर सकते हैं।",
    ctaConsultBtn: "व्यक्तिगत परामर्श प्राप्त करें",
    ctaShopBtn: "सभी रत्न खरीदें",
  },
} as const;
