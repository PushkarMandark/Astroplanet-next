// Hindi/English dictionary for the Free Match Making Calculator page.
// Keys are stable, descriptive camelCase. `hi` MUST have exactly the same keys as `en`.

export const matchmaking = {
  en: {
    // Hero
    heroBadge: "Vedic Compatibility",
    heroTitle: "Free Kundli Match Making Calculator",
    heroSubtitle:
      "Check marriage compatibility using the ancient 36-point Ashtakoot Guna Milan system based on Vedic astrology.",

    // Form section
    formEyebrow: "Enter Birth Details",
    formTitle: "Boy & Girl Details",

    // Boy card
    boyCardTitle: "Boy's Details",

    // Girl card
    girlCardTitle: "Girl's Details",

    // Shared form labels
    labelDob: "Date of Birth",
    placeholderDob: "Select date of birth",
    labelTob: "Time of Birth",
    labelPlace: "Place of Birth",

    // Calculate button
    calculateBtn: "Check Compatibility",
    calculatingBtn: "Calculating...",

    // Validation errors
    errorBoyDetails: "Please enter the boy's date and time of birth.",
    errorGirlDetails: "Please enter the girl's date and time of birth.",
    errorInvalidDate: "Invalid date or time entered. Please check and try again.",
    errorGeneral:
      "Unable to calculate compatibility. Please check the details and try again.",

    // Results: score circle
    compatibilityScoreEyebrow: "Compatibility Score",
    outOf36: "out of 36",

    // Recommendation messages (keys used from getRecommendationKey)
    recommendationExcellent: "Excellent match! Highly recommended.",
    recommendationGood: "Good match with minor adjustments needed.",
    recommendationConsult: "Consultation recommended before proceeding.",

    // Ashtakoot breakdown section
    detailedAnalysisEyebrow: "Detailed Analysis",
    ashtakootTitle: "Ashtakoot Guna Milan",

    // Mangal Dosha section
    doshaAnalysisEyebrow: "Dosha Analysis",
    mangalDoshaTitle: "Mangal Dosha Status",
    boyMangalDosha: "Boy - Mangal Dosha",
    girlMangalDosha: "Girl - Mangal Dosha",
    highMangalDosha: "High Mangal Dosha",
    mangalDoshaPresent: "Mangal Dosha Present",
    noMangalDosha: "No Mangal Dosha",

    // Bottom CTA
    ctaTitle: "Want a Detailed Compatibility Analysis?",
    ctaSubtitle:
      "Get personalized marriage consultation from our expert Vedic astrologers with complete Kundli analysis.",
    ctaBookBtn: "Book Consultation",
    ctaContactBtn: "Contact Us",

    // FAQ
    faqDescription:
      "Get clarity on Vedic Kundli matching, Ashtakoot Guna Milan, Mangal Dosha, and Nadi Dosha. These FAQs explain how horoscope matching scores work, what makes a good marriage compatibility result, and when to consult an expert pandit for a deeper free Kundli match for marriage.",
    faq1Q: "What is Guna Milan in Kundli matching?",
    faq1A:
      "Guna Milan is the traditional Vedic system of checking marriage compatibility between a boy and girl using their birth charts. It is also called Ashtakoot, meaning eight categories. Each Kundli is analysed across eight kootas, and points are awarded out of a total of 36. The higher the matching score, the more harmonious the partnership is believed to be on mental, physical, and karmic levels.",
    faq2Q: "What is a good score in Kundli matching out of 36?",
    faq2A:
      "In Vedic astrology, a score of 18 out of 36 is considered the minimum acceptable level for marriage. A score between 18 and 24 is treated as average to good, 25 to 32 is excellent, and 32 plus is rare and considered ideal. Anything below 18 is generally not recommended without expert review. Remember, the final verdict also depends on Mangal dosha, Nadi dosha, and overall planetary placement, not just the total guna count.",
    faq3Q: "What do the eight kootas in Ashtakoot measure?",
    faq3A:
      "The eight kootas each cover a specific area. Varna checks spiritual compatibility, Vashya measures mutual control and influence, Tara looks at health and well-being, Yoni shows physical and sexual compatibility, Graha Maitri measures mental and intellectual harmony, Gana indicates temperament, Bhakoot reflects family welfare and finances, and Nadi shows genetic and progeny compatibility. Nadi carries the highest weight at 8 points, which is why it strongly influences the final matching result.",
    faq4Q: "What is Mangal Dosha and how does it affect marriage?",
    faq4A:
      "Mangal Dosha, also known as Manglik dosha, occurs when Mars sits in the 1st, 2nd, 4th, 7th, 8th, or 12th house of the birth chart. It is believed to bring tension, delays, or conflict in marriage. The traditional remedy is to match a Manglik person with another Manglik partner, as the doshas cancel out. Mild Mangal dosha can also be balanced through specific pujas, gemstones, and remedies suggested by an experienced astrologer.",
    faq5Q: "Why is Nadi Dosha given so much importance?",
    faq5A:
      "Nadi carries 8 points, the highest weight in Ashtakoot, because it represents genetic, biological, and health compatibility between partners. When both boy and girl share the same Nadi, called Nadi Dosha, classical texts warn of issues with progeny, health, and long-term wellbeing of children. However, Nadi Dosha can sometimes be cancelled if both Kundlis share the same nakshatra or rashi. A pandit should always confirm Nadi Dosha before drawing conclusions.",
    faq6Q: "Why are exact birth time and place needed for Kundli matching?",
    faq6A:
      "Vedic astrology calculates the moon sign, nakshatra, and lagna based on the precise moment and location of birth. Even a 10 minute difference can change the nakshatra, which directly affects 6 out of 8 kootas, including Nadi. The place of birth determines the latitude and longitude used for planetary positions. For an accurate free Kundli match for marriage, always enter exact time of birth from the hospital record and the correct city.",
    faq7Q: "How accurate is online Kundli matching versus a pandit?",
    faq7A:
      "An online tool like this gives you a fast, mathematically accurate Ashtakoot score and dosha check based on classical Vedic rules. It is excellent for an initial compatibility filter and self-understanding. However, an experienced astrologer also studies dasha periods, planetary strengths, divisional charts like D9 Navamsa, and life context. For low scores, doshas, or important final decisions, a personal consultation with a Vedic pandit is strongly recommended.",
    faq8Q: "Can a low Kundli matching score be fixed or improved?",
    faq8A:
      "A low guna score cannot be changed mathematically, but its negative effects can often be reduced. Astrologers may suggest specific remedies such as gemstone therapy, mantra chanting, planetary pujas, donations, or Manglik dosha nivaran rituals. In some cases, dosha cancellation rules apply automatically based on planetary positions. Never panic over a single low score, as a complete chart reading by an expert may reveal strong yogas that balance and support a successful marriage.",
    faq9Q: "Is Kundli matching only for arranged marriages?",
    faq9A:
      "Not at all. While horoscope matching is a strong tradition in arranged marriages across India, more couples in love marriages now use it for self-awareness and to understand each other deeply. It helps both partners see strengths, friction points, and karmic patterns in the relationship. Whether your match is arranged by family or chosen by love, a Kundli match offers an extra layer of clarity before committing to lifelong partnership.",
    faq10Q: "Is Vedic Kundli matching still relevant today?",
    faq10A:
      "Yes, Kundli matching remains highly relevant in modern Indian society. While lifestyles have changed, the core challenges in marriage, such as compatibility of values, temperament, family, finances, and health, are still real. Ashtakoot Guna Milan offers a structured, time-tested framework to assess these areas. Treat it as one valuable input alongside emotional connection, communication, and shared goals. Remember, no chart guarantees outcomes, but it can guide you with awareness.",
  },
  hi: {
    // Hero
    heroBadge: "वैदिक अनुकूलता",
    heroTitle: "मुफ़्त कुंडली मिलान कैलकुलेटर",
    heroSubtitle:
      "वैदिक ज्योतिष पर आधारित प्राचीन 36-अंक अष्टकूट गुण मिलान प्रणाली से विवाह अनुकूलता जाँचें।",

    // Form section
    formEyebrow: "जन्म विवरण दर्ज करें",
    formTitle: "वर और वधू का विवरण",

    // Boy card
    boyCardTitle: "वर का विवरण",

    // Girl card
    girlCardTitle: "वधू का विवरण",

    // Shared form labels
    labelDob: "जन्म तिथि",
    placeholderDob: "जन्म तिथि चुनें",
    labelTob: "जन्म समय",
    labelPlace: "जन्म स्थान",

    // Calculate button
    calculateBtn: "अनुकूलता जाँचें",
    calculatingBtn: "गणना हो रही है...",

    // Validation errors
    errorBoyDetails: "कृपया वर की जन्म तिथि और समय दर्ज करें।",
    errorGirlDetails: "कृपया वधू की जन्म तिथि और समय दर्ज करें।",
    errorInvalidDate: "अमान्य तिथि या समय। कृपया जाँच कर पुनः प्रयास करें।",
    errorGeneral:
      "अनुकूलता की गणना नहीं हो सकी। कृपया विवरण जाँच कर पुनः प्रयास करें।",

    // Results: score circle
    compatibilityScoreEyebrow: "अनुकूलता स्कोर",
    outOf36: "36 में से",

    // Recommendation messages
    recommendationExcellent: "उत्कृष्ट मिलान! अत्यंत अनुशंसित।",
    recommendationGood: "अच्छा मिलान, थोड़े सुधार की आवश्यकता।",
    recommendationConsult: "आगे बढ़ने से पहले परामर्श अनुशंसित।",

    // Ashtakoot breakdown section
    detailedAnalysisEyebrow: "विस्तृत विश्लेषण",
    ashtakootTitle: "अष्टकूट गुण मिलान",

    // Mangal Dosha section
    doshaAnalysisEyebrow: "दोष विश्लेषण",
    mangalDoshaTitle: "मंगल दोष स्थिति",
    boyMangalDosha: "वर - मंगल दोष",
    girlMangalDosha: "वधू - मंगल दोष",
    highMangalDosha: "उच्च मंगल दोष",
    mangalDoshaPresent: "मंगल दोष उपस्थित",
    noMangalDosha: "मंगल दोष नहीं",

    // Bottom CTA
    ctaTitle: "विस्तृत अनुकूलता विश्लेषण चाहते हैं?",
    ctaSubtitle:
      "हमारे विशेषज्ञ वैदिक ज्योतिषियों से संपूर्ण कुंडली विश्लेषण के साथ व्यक्तिगत विवाह परामर्श प्राप्त करें।",
    ctaBookBtn: "परामर्श बुक करें",
    ctaContactBtn: "संपर्क करें",

    // FAQ
    faqDescription:
      "वैदिक कुंडली मिलान, अष्टकूट गुण मिलान, मंगल दोष और नाड़ी दोष पर स्पष्टता पाएं। ये FAQ बताते हैं कि राशि मिलान स्कोर कैसे काम करते हैं, अच्छे विवाह अनुकूलता परिणाम में क्या महत्वपूर्ण है, और कब किसी विशेषज्ञ पंडित से गहन कुंडली मिलान परामर्श लेना चाहिए।",
    faq1Q: "कुंडली मिलान में गुण मिलान क्या है?",
    faq1A:
      "गुण मिलान वर और वधू की जन्म कुंडली के आधार पर विवाह अनुकूलता जाँचने की पारंपरिक वैदिक प्रणाली है। इसे अष्टकूट भी कहते हैं, जिसका अर्थ है आठ श्रेणियाँ। प्रत्येक कुंडली का आठ कूटों पर विश्लेषण किया जाता है और कुल 36 में से अंक दिए जाते हैं। मिलान स्कोर जितना अधिक होगा, मानसिक, शारीरिक और कार्मिक स्तर पर साझेदारी उतनी ही सामंजस्यपूर्ण मानी जाती है।",
    faq2Q: "36 में से कुंडली मिलान में अच्छा स्कोर क्या है?",
    faq2A:
      "वैदिक ज्योतिष में 36 में से 18 का स्कोर विवाह के लिए न्यूनतम स्वीकार्य स्तर माना जाता है। 18 से 24 के बीच का स्कोर औसत से अच्छा, 25 से 32 उत्कृष्ट और 32 से अधिक दुर्लभ व आदर्श माना जाता है। 18 से कम के लिए विशेषज्ञ समीक्षा के बिना सामान्यतः अनुशंसा नहीं की जाती। याद रखें, अंतिम निर्णय केवल गुण संख्या पर नहीं, बल्कि मंगल दोष, नाड़ी दोष और समग्र ग्रह स्थिति पर भी निर्भर करता है।",
    faq3Q: "अष्टकूट के आठ कूट क्या मापते हैं?",
    faq3A:
      "आठ कूट प्रत्येक एक विशिष्ट क्षेत्र को कवर करते हैं। वर्ण आध्यात्मिक अनुकूलता जाँचता है, वश्य आपसी नियंत्रण और प्रभाव मापता है, तारा स्वास्थ्य और कल्याण देखता है, योनि शारीरिक अनुकूलता दर्शाता है, ग्रह मैत्री मानसिक सामंजस्य मापती है, गण स्वभाव बताता है, भकूट पारिवारिक कल्याण और वित्त दर्शाता है, और नाड़ी आनुवंशिक व संतान अनुकूलता दिखाती है। नाड़ी का सर्वाधिक भार 8 अंक है, इसीलिए यह अंतिम मिलान परिणाम को सबसे अधिक प्रभावित करती है।",
    faq4Q: "मंगल दोष क्या है और यह विवाह को कैसे प्रभावित करता है?",
    faq4A:
      "मंगल दोष, जिसे मांगलिक दोष भी कहते हैं, तब होता है जब मंगल जन्म कुंडली के पहले, दूसरे, चौथे, सातवें, आठवें या बारहवें भाव में होता है। मान्यता है कि यह विवाह में तनाव, विलंब या संघर्ष लाता है। पारंपरिक उपाय है कि मांगलिक व्यक्ति का विवाह दूसरे मांगलिक से कराया जाए, जिससे दोष निरस्त हो जाते हैं। हल्के मंगल दोष को अनुभवी ज्योतिषी द्वारा सुझाई गई विशेष पूजाओं, रत्नों और उपायों से भी संतुलित किया जा सकता है।",
    faq5Q: "नाड़ी दोष को इतना महत्व क्यों दिया जाता है?",
    faq5A:
      "नाड़ी को अष्टकूट में सर्वाधिक 8 अंक इसलिए मिलते हैं क्योंकि यह भागीदारों के बीच आनुवंशिक, जैविक और स्वास्थ्य संबंधी अनुकूलता को दर्शाती है। जब वर और वधू दोनों की नाड़ी एक समान हो, जिसे नाड़ी दोष कहते हैं, तो शास्त्र संतान, स्वास्थ्य और बच्चों के दीर्घकालिक कल्याण में समस्याओं की चेतावनी देते हैं। हालांकि नाड़ी दोष कभी-कभी रद्द हो सकता है यदि दोनों कुंडलियों का नक्षत्र या राशि समान हो। निष्कर्ष निकालने से पहले हमेशा एक पंडित से नाड़ी दोष की पुष्टि करनी चाहिए।",
    faq6Q: "कुंडली मिलान के लिए सटीक जन्म समय और स्थान क्यों जरूरी है?",
    faq6A:
      "वैदिक ज्योतिष जन्म के सटीक क्षण और स्थान के आधार पर चंद्र राशि, नक्षत्र और लग्न की गणना करता है। 10 मिनट के अंतर से भी नक्षत्र बदल सकता है, जो नाड़ी सहित 8 में से 6 कूटों को सीधे प्रभावित करता है। जन्म स्थान ग्रहों की स्थिति के लिए उपयोग किए जाने वाले अक्षांश और देशांतर निर्धारित करता है। सटीक मुफ़्त कुंडली मिलान के लिए हमेशा अस्पताल के रिकॉर्ड से सटीक जन्म समय और सही शहर दर्ज करें।",
    faq7Q: "ऑनलाइन कुंडली मिलान बनाम पंडित कितना सटीक है?",
    faq7A:
      "इस जैसा ऑनलाइन टूल आपको शास्त्रीय वैदिक नियमों पर आधारित त्वरित, गणितीय रूप से सटीक अष्टकूट स्कोर और दोष जाँच देता है। यह प्रारंभिक अनुकूलता फ़िल्टर और आत्म-समझ के लिए उत्कृष्ट है। हालांकि एक अनुभवी ज्योतिषी दशा काल, ग्रह बल, D9 नवमांश जैसे वर्गीय चार्ट और जीवन संदर्भ का भी अध्ययन करते हैं। कम स्कोर, दोष या महत्वपूर्ण अंतिम निर्णयों के लिए वैदिक पंडित से व्यक्तिगत परामर्श दृढ़ता से अनुशंसित है।",
    faq8Q: "क्या कम कुंडली मिलान स्कोर को ठीक या सुधारा जा सकता है?",
    faq8A:
      "कम गुण स्कोर को गणितीय रूप से नहीं बदला जा सकता, लेकिन इसके नकारात्मक प्रभावों को अक्सर कम किया जा सकता है। ज्योतिषी रत्न चिकित्सा, मंत्र जप, ग्रह पूजा, दान या मांगलिक दोष निवारण अनुष्ठान जैसे विशिष्ट उपाय सुझा सकते हैं। कुछ मामलों में ग्रह स्थितियों के आधार पर दोष निरस्तीकरण नियम स्वतः लागू होते हैं। एक कम स्कोर से घबराएं नहीं, क्योंकि किसी विशेषज्ञ द्वारा संपूर्ण चार्ट रीडिंग में ऐसे मजबूत योग सामने आ सकते हैं जो सफल विवाह को संतुलित और समर्थित करते हैं।",
    faq9Q: "क्या कुंडली मिलान केवल अरेंज मैरेज के लिए है?",
    faq9A:
      "बिल्कुल नहीं। हालांकि राशि मिलान भारत भर में अरेंज मैरेज की एक मजबूत परंपरा है, अब लव मैरेज में भी अधिक जोड़े इसे आत्म-जागरूकता और एक-दूसरे को गहराई से समझने के लिए उपयोग करते हैं। यह दोनों साझेदारों को रिश्ते की मजबूती, घर्षण बिंदुओं और कार्मिक पैटर्न देखने में मदद करता है। चाहे आपका मिलान परिवार द्वारा हो या प्रेम से चुना गया हो, कुंडली मिलान आजीवन साझेदारी के प्रति प्रतिबद्ध होने से पहले स्पष्टता की एक अतिरिक्त परत प्रदान करता है।",
    faq10Q: "क्या वैदिक कुंडली मिलान आज भी प्रासंगिक है?",
    faq10A:
      "हाँ, कुंडली मिलान आधुनिक भारतीय समाज में अत्यंत प्रासंगिक बना हुआ है। जीवनशैली बदल गई है, लेकिन विवाह में मूल चुनौतियाँ, जैसे मूल्यों, स्वभाव, परिवार, वित्त और स्वास्थ्य की अनुकूलता, अभी भी वास्तविक हैं। अष्टकूट गुण मिलान इन क्षेत्रों का आकलन करने के लिए एक व्यवस्थित, समय-परीक्षित ढांचा प्रदान करता है। इसे भावनात्मक जुड़ाव, संचार और साझा लक्ष्यों के साथ एक मूल्यवान इनपुट के रूप में देखें। याद रखें, कोई भी कुंडली परिणामों की गारंटी नहीं देती, लेकिन यह आपको जागरूकता के साथ मार्गदर्शन कर सकती है।",
  },
} as const;
