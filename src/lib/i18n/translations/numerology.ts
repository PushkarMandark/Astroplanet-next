// Hindi/English dictionary for the Free Numerology Calculator tool.
// Keys are stable, descriptive camelCase. `hi` MUST have exactly the same keys as `en`.
// NOTE: Profile titles (.hindi) and gemstone names (.gemstoneHindi) come from
//       NUMBER_PROFILES in numerology-meanings.ts — do NOT duplicate them here.

export const numerology = {
  en: {
    // Hero badge / badge pill
    heroBadge: "अंक ज्योतिष / Vedic Numerology",

    // Hero heading
    heroTitle: "Free numerology calculator",

    // Hero subtitle — before results
    heroSubtitleDefault:
      "Discover your life path and destiny through the ancient science of numbers.",
    // Hero subtitle — after results
    heroSubtitleResult:
      "Explore the hidden meanings of your Life Path, Destiny and more — decoded from your name and birth date.",

    // Input form
    formStepLabel: "Step 1",
    formHeading: "Enter your details",
    labelName: "Full Name",
    placeholderName: "Enter your full name as on birth certificate",
    labelBirthDate: "Birth Date",
    btnCalculate: "Calculate Numbers",
    btnReset: "Reset",

    // Validation errors
    errorNameRequired: "Name is required",
    errorBirthDateRequired: "Birth date is required",

    // Life Path hero card
    lifePathLabel: "Your Life Path Number",
    lifePathFallback: "Number",
    badgePlanet: "Planet",
    badgeElement: "Element",
    badgeGemstone: "Gemstone",

    // Core numbers strip
    coreNumbersEyebrow: "Your core numbers · Tap a card for details",

    // Dimension labels (used in tiles and tabs)
    dimLifePath: "Life Path",
    dimDestiny: "Destiny",
    dimSoulUrge: "Soul Urge",
    dimPersonality: "Personality",
    dimBirthday: "Birthday",
    dimPersonalYear: "Personal Year",

    // Expanded dimension header — "Destiny · Number 7"
    dimNumberSeparator: "· Number",

    // Vedic numbers grid
    moolAnkLabel: "Mool Ank",
    moolAnkDesc: "Ruling number from birth day",
    bhagyaAnkLabel: "Bhagya Ank",
    bhagyaAnkDesc: "Destiny number from full DOB",

    // Tabs
    tabPersonality: "Personality",
    tabCareer: "Career",
    tabLove: "Love",
    tabLucky: "Lucky",
    tabYear: "Year",
    tabKarmic: "Karmic",
    tabMantra: "Mantra",

    // Personality tab
    personalityCoreEyebrow: "Core personality",
    strengthsLabel: "Strengths",
    watchoutsLabel: "Watch-outs",
    famousPeopleEyebrow: "Famous",
    affirmationEyebrow: "Daily affirmation",
    btnCopy: "Copy",
    btnCopied: "Copied",

    // Personality tab — empty state
    personalityUnavailable:
      "Profile details are not available for this number.",

    // Career tab
    careerPathsEyebrow: "Career paths that suit you",
    careerBasedOn: "Based on your Life Path",
    btnGetCareerGuidance: "Get Career Guidance",
    btnExploreServices: "Explore Services",

    // Career tab — empty state
    careerUnavailable: "Career insights unavailable.",

    // Compatibility tab
    topCompatibleEyebrow: "Top 3 compatible numbers",
    compatibilityScore: "Score",
    challengingMatchesEyebrow: "Challenging matches",
    checkMatchEyebrow: "Check your match",
    partnerInputHint: "Enter partner's Life Path Number (1-9)",
    partnerInputPlaceholder: "e.g. 5",
    yourLifePath: "Your Life Path:",

    // Lucky tab
    luckyDaysEyebrow: "Lucky days",
    luckyNumbersEyebrow: "Lucky numbers",
    luckyColourEyebrow: "Lucky colour",
    luckyGemstoneEyebrow: "Lucky gemstone",
    friendshipGridEyebrow: "Friendship grid",
    friendshipGridBasedOn: "Based on your Mool Ank",

    // Friendship grid relation labels
    relationFriend: "Friend",
    relationNeutral: "Neutral",
    relationEnemy: "Enemy",

    // Lucky tab — empty state
    luckyUnavailable: "Lucky data unavailable.",

    // Personal Year tab
    personalYearLabel: "Personal year",
    yearAhead: "Your year ahead",
    opportunitiesLabel: "Opportunities",
    cautionsLabel: "Cautions",
    bestMonthsEyebrow: "Best months",
    nineYearCycleEyebrow: "Your 9-year cycle",
    nineYearCycleDesc: "You are in year",
    nineYearCycleSuffix: "of a 9-year spiritual cycle.",

    // Karmic tab
    karmicNoLessonsTitle: "No karmic lessons detected",
    karmicNoLessonsDesc: "Your birth date includes all digits 1-9.",
    karmicMissingDigitLabel: "Missing digit",
    karmicChallengeLabel: "Challenge:",
    karmicRemedyLabel: "Remedy:",

    // Mantra tab
    planetMantraEyebrow: "Planet mantra",
    chantInstruction: "Chant 108 times daily",

    // Mantra tab — empty state
    mantraUnavailable: "Mantra unavailable for this number.",

    // Share strip
    shareLabel: "Share your reading",

    // Toast messages
    toastLinkCopied: "Link copied!",
    toastLinkCopyError: "Could not copy link",
    toastAffirmationCopied: "Affirmation copied!",
    toastAffirmationCopyError: "Could not copy affirmation",
    toastMantraCopied: "Mantra copied!",
    toastMantraCopyError: "Could not copy mantra",

    // CTA section
    ctaHeading: "Want a Detailed Numerology Report?",
    ctaSubtext:
      "Get a personalized numerology analysis from our expert astrologers — lucky name corrections, remedies and more.",
    btnBookConsultation: "Book Consultation",
    btnContactUs: "Contact Us",

    // FAQ section description
    faqDescription:
      "Numerology is the ancient science of numbers that reveals personality, life path and destiny patterns hidden in your name and birth date. Below are common questions about Life Path, Destiny, Soul Urge, Personality numbers, Vedic Anka Jyotish, Mool Ank, Bhagya Ank and how this free numerology calculator works for Indian users.",

    // FAQ questions & answers
    faqQ1: "What is numerology and how does it work?",
    faqA1: "Numerology is the study of how numbers influence personality, relationships and life events. Each letter and birth date digit corresponds to a number from 1 to 9, with each number ruled by a planet. By reducing your name and date of birth to single digits, numerology reveals your strengths, challenges and life direction. In India, this practice is rooted in Vedic Anka Jyotish, which connects numbers to the navagraha planetary system used in Hindu astrology.",
    faqQ2: "How is the Life Path number calculated?",
    faqA2: "Your Life Path number is calculated by adding the day, month and year of your birth, then reducing the total to a single digit between 1 and 9. For example, a person born on 15 August 1990 would add 1+5+8+1+9+9+0 = 33, then 3+3 = 6, giving a Life Path 6. The exception is Master Numbers 11, 22 and 33, which are not reduced. The Life Path describes your core life journey and the lessons you came to learn.",
    faqQ3: "What is the difference between Life Path, Destiny, Soul Urge and Personality numbers?",
    faqA3: "Each number reveals a different layer of you. The Life Path comes from your birth date and shows your overall journey. The Destiny number, also called Expression, is derived from your full name and reveals your potential and life purpose. The Soul Urge, calculated from the vowels in your name, reflects your inner desires and motivations. The Personality number, from the consonants, shows how others perceive you. Together they form a complete numerology blueprint.",
    faqQ4: "What are Mool Ank and Bhagya Ank in Vedic Anka Jyotish?",
    faqA4: "Mool Ank, or root number, is derived only from the date of birth, reduced to a single digit. It represents your basic nature, instincts and ruling planet from the moment you were born. Bhagya Ank, or destiny number, is calculated from the entire date including month and year, and represents the karma and destiny shaped by your full birth time. Both are core concepts in Anka Jyotish, the Vedic numerology system widely used across India.",
    faqQ5: "What are Master Numbers 11, 22 and 33?",
    faqA5: "Master Numbers are 11, 22 and 33, considered highly spiritual and powerful in numerology. They are not reduced to single digits. Number 11 is the intuitive visionary, 22 is the master builder who turns dreams into reality, and 33 is the master teacher driven by compassion. People with Master Numbers often feel intense pressure to live up to their potential. They carry both greater gifts and bigger responsibilities than single-digit numbers.",
    faqQ6: "What is the Personal Year cycle and why does it change every year?",
    faqA6: "The Personal Year is calculated by adding your birth day, birth month and the current calendar year, reduced to a single digit. It changes annually because the year value changes, placing you in a new phase of a 9-year spiritual cycle. Year 1 brings new beginnings, year 5 brings change and freedom, year 9 brings completion. Knowing your Personal Year helps you plan major decisions, business launches, marriage and travel in alignment with the natural energy of that year.",
    faqQ7: "Can changing my name change my life through numerology?",
    faqA7: "Yes, name correction is a popular remedy in Indian numerology. Since the Destiny, Soul Urge and Personality numbers are derived from your name, adjusting the spelling can shift these vibrations and bring them into harmony with your Mool Ank and Bhagya Ank. Many people add or remove a letter to balance challenging numbers. However, name changes work best when paired with mindset, action and consistent use of the new spelling across documents and daily life.",
    faqQ8: "What are karmic lessons and missing digits?",
    faqA8: "Karmic lessons are revealed by the digits missing from your full date of birth. If your birth date does not contain a particular digit between 1 and 9, that number represents a quality you came to develop in this lifetime. For instance, a missing 5 may indicate lessons around freedom and change, while a missing 7 may point to deeper spiritual study. Identifying these gaps helps you focus on the traits and habits that need conscious cultivation.",
    faqQ9: "How are lucky numbers, colours and gemstones derived?",
    faqA9: "Each Life Path or Mool Ank is ruled by a planet, and lucky days, colours and gemstones come from that planetary association. For example, number 1 is ruled by the Sun, with red and gold colours and ruby as the primary gemstone. Number 6 is ruled by Venus, favouring white and pink with diamond. These choices are believed to amplify positive planetary energy and are commonly used in Indian remedies, jewellery and clothing on important days.",
    faqQ10: "How accurate is this free numerology calculator and what are its limitations?",
    faqA10: "This calculator follows the standard Pythagorean and Vedic Anka Jyotish methods, so the numbers it generates are mathematically accurate based on the name and birth date you enter. The interpretations are general guidance drawn from traditional numerology meanings and should not be treated as absolute predictions. For a deeper analysis covering name corrections, business numerology, compatibility with your spouse and personalized remedies, a consultation with a qualified astrologer is recommended.",
  },

  hi: {
    // Hero badge / badge pill
    heroBadge: "अंक ज्योतिष / वैदिक न्यूमेरोलॉजी",

    // Hero heading
    heroTitle: "मुफ्त अंक ज्योतिष कैलकुलेटर",

    // Hero subtitle — before results
    heroSubtitleDefault:
      "संख्याओं के प्राचीन विज्ञान से अपना जीवन पथ और भाग्य जानें।",
    // Hero subtitle — after results
    heroSubtitleResult:
      "अपने नाम और जन्म तिथि से निकाले गए जीवन पथ, भाग्यांक और अन्य अंकों के छुपे अर्थ जानें।",

    // Input form
    formStepLabel: "चरण 1",
    formHeading: "अपना विवरण दर्ज करें",
    labelName: "पूरा नाम",
    placeholderName: "जन्म प्रमाण पत्र अनुसार पूरा नाम दर्ज करें",
    labelBirthDate: "जन्म तिथि",
    btnCalculate: "अंक निकालें",
    btnReset: "रीसेट करें",

    // Validation errors
    errorNameRequired: "नाम आवश्यक है",
    errorBirthDateRequired: "जन्म तिथि आवश्यक है",

    // Life Path hero card
    lifePathLabel: "आपका मूलांक",
    lifePathFallback: "अंक",
    badgePlanet: "ग्रह",
    badgeElement: "तत्व",
    badgeGemstone: "रत्न",

    // Core numbers strip
    coreNumbersEyebrow: "आपके मुख्य अंक · विवरण के लिए कार्ड छुएं",

    // Dimension labels
    dimLifePath: "मूलांक",
    dimDestiny: "भाग्यांक",
    dimSoulUrge: "आत्मा अंक",
    dimPersonality: "व्यक्तित्व अंक",
    dimBirthday: "जन्म दिन अंक",
    dimPersonalYear: "व्यक्तिगत वर्ष",

    // Expanded dimension header
    dimNumberSeparator: "· अंक",

    // Vedic numbers grid
    moolAnkLabel: "मूलांक",
    moolAnkDesc: "जन्म दिन से शासक अंक",
    bhagyaAnkLabel: "भाग्यांक",
    bhagyaAnkDesc: "पूर्ण जन्म तिथि से भाग्य अंक",

    // Tabs
    tabPersonality: "व्यक्तित्व",
    tabCareer: "करियर",
    tabLove: "प्रेम",
    tabLucky: "शुभ",
    tabYear: "वर्ष",
    tabKarmic: "कर्म",
    tabMantra: "मंत्र",

    // Personality tab
    personalityCoreEyebrow: "मूल स्वभाव",
    strengthsLabel: "गुण",
    watchoutsLabel: "सावधानियाँ",
    famousPeopleEyebrow: "प्रसिद्ध",
    affirmationEyebrow: "दैनिक सकारात्मक वाक्य",
    btnCopy: "कॉपी करें",
    btnCopied: "कॉपी हुआ",

    // Personality tab — empty state
    personalityUnavailable: "इस अंक के लिए प्रोफ़ाइल विवरण उपलब्ध नहीं है।",

    // Career tab
    careerPathsEyebrow: "आपके अनुकूल करियर",
    careerBasedOn: "आपके मूलांक के आधार पर",
    btnGetCareerGuidance: "करियर मार्गदर्शन लें",
    btnExploreServices: "सेवाएँ देखें",

    // Career tab — empty state
    careerUnavailable: "करियर जानकारी उपलब्ध नहीं है।",

    // Compatibility tab
    topCompatibleEyebrow: "शीर्ष 3 अनुकूल अंक",
    compatibilityScore: "स्कोर",
    challengingMatchesEyebrow: "कठिन मेल",
    checkMatchEyebrow: "अपना मेल जाँचें",
    partnerInputHint: "साथी का मूलांक दर्ज करें (1-9)",
    partnerInputPlaceholder: "जैसे 5",
    yourLifePath: "आपका मूलांक:",

    // Lucky tab
    luckyDaysEyebrow: "शुभ दिन",
    luckyNumbersEyebrow: "शुभ अंक",
    luckyColourEyebrow: "शुभ रंग",
    luckyGemstoneEyebrow: "शुभ रत्न",
    friendshipGridEyebrow: "मित्रता ग्रिड",
    friendshipGridBasedOn: "आपके मूलांक के आधार पर",

    // Friendship grid relation labels
    relationFriend: "अनुकूल",
    relationNeutral: "तटस्थ",
    relationEnemy: "प्रतिकूल",

    // Lucky tab — empty state
    luckyUnavailable: "शुभ जानकारी उपलब्ध नहीं है।",

    // Personal Year tab
    personalYearLabel: "व्यक्तिगत वर्ष",
    yearAhead: "आपका आने वाला वर्ष",
    opportunitiesLabel: "अवसर",
    cautionsLabel: "सावधानियाँ",
    bestMonthsEyebrow: "सर्वोत्तम महीने",
    nineYearCycleEyebrow: "आपका 9-वर्षीय चक्र",
    nineYearCycleDesc: "आप 9-वर्षीय आध्यात्मिक चक्र के वर्ष",
    nineYearCycleSuffix: "में हैं।",

    // Karmic tab
    karmicNoLessonsTitle: "कोई कर्म पाठ नहीं मिला",
    karmicNoLessonsDesc: "आपकी जन्म तिथि में 1-9 सभी अंक शामिल हैं।",
    karmicMissingDigitLabel: "लुप्त अंक",
    karmicChallengeLabel: "चुनौती:",
    karmicRemedyLabel: "उपाय:",

    // Mantra tab
    planetMantraEyebrow: "ग्रह मंत्र",
    chantInstruction: "प्रतिदिन 108 बार जप करें",

    // Mantra tab — empty state
    mantraUnavailable: "इस अंक के लिए मंत्र उपलब्ध नहीं है।",

    // Share strip
    shareLabel: "अपना फल साझा करें",

    // Toast messages
    toastLinkCopied: "लिंक कॉपी हुआ!",
    toastLinkCopyError: "लिंक कॉपी नहीं हो सका",
    toastAffirmationCopied: "सकारात्मक वाक्य कॉपी हुआ!",
    toastAffirmationCopyError: "सकारात्मक वाक्य कॉपी नहीं हो सका",
    toastMantraCopied: "मंत्र कॉपी हुआ!",
    toastMantraCopyError: "मंत्र कॉपी नहीं हो सका",

    // CTA section
    ctaHeading: "विस्तृत अंक ज्योतिष रिपोर्ट चाहिए?",
    ctaSubtext:
      "हमारे विशेषज्ञ ज्योतिषियों से व्यक्तिगत अंक विश्लेषण पाएं — शुभ नाम सुधार, उपाय और बहुत कुछ।",
    btnBookConsultation: "परामर्श बुक करें",
    btnContactUs: "संपर्क करें",

    // FAQ section description
    faqDescription:
      "अंक ज्योतिष संख्याओं का वह प्राचीन विज्ञान है जो आपके नाम और जन्म तिथि में छुपे व्यक्तित्व, जीवन पथ और भाग्य के रहस्य उजागर करता है। नीचे मूलांक, भाग्यांक, आत्मा अंक, वैदिक अंक ज्योतिष और इस कैलकुलेटर के उपयोग से जुड़े सामान्य प्रश्न दिए गए हैं।",

    // FAQ questions & answers
    faqQ1: "अंक ज्योतिष क्या है और यह कैसे काम करता है?",
    faqA1: "अंक ज्योतिष एक विज्ञान है जो बताता है कि संख्याएं व्यक्तित्व, रिश्तों और जीवन की घटनाओं को कैसे प्रभावित करती हैं। प्रत्येक अक्षर और जन्म तिथि का अंक 1 से 9 के बीच किसी संख्या से मेल खाता है, और हर संख्या किसी ग्रह द्वारा शासित होती है। आपके नाम और जन्म तिथि को एकल अंकों में घटाकर अंक ज्योतिष आपकी शक्तियां, चुनौतियां और जीवन दिशा प्रकट करता है। भारत में यह वैदिक अंक ज्योतिष में निहित है, जो संख्याओं को नवग्रह प्रणाली से जोड़ता है।",
    faqQ2: "जीवन पथ संख्या की गणना कैसे होती है?",
    faqA2: "जीवन पथ संख्या जन्म के दिन, महीने और वर्ष को जोड़कर, फिर उसे एकल अंक में घटाकर निकाली जाती है। उदाहरण: 15 अगस्त 1990 → 1+5+8+1+9+9+0 = 33 → 3+3 = 6, जिससे जीवन पथ 6 मिलता है। अपवाद हैं मास्टर नंबर 11, 22 और 33, जिन्हें घटाया नहीं जाता। जीवन पथ आपकी मूल यात्रा और सीखे जाने वाले पाठों का वर्णन करता है।",
    faqQ3: "जीवन पथ, भाग्यांक, आत्मा अंक और व्यक्तित्व अंक में क्या अंतर है?",
    faqA3: "प्रत्येक संख्या आपके अलग पहलू को प्रकट करती है। जीवन पथ जन्म तिथि से आता है और समग्र यात्रा दिखाता है। भाग्यांक पूरे नाम से निकाला जाता है और जीवन उद्देश्य बताता है। आत्मा अंक नाम के स्वरों से, आंतरिक इच्छाएं प्रकट करता है। व्यक्तित्व अंक व्यंजनों से, दूसरों की नजर में आपकी छवि बताता है। मिलकर ये एक पूर्ण अंक ज्योतिष ब्लूप्रिंट बनाते हैं।",
    faqQ4: "वैदिक अंक ज्योतिष में मूलांक और भाग्यांक क्या हैं?",
    faqA4: "मूलांक केवल जन्म तिथि से एकल अंक में निकाला जाता है और आपकी बुनियादी प्रकृति व शासक ग्रह दर्शाता है। भाग्यांक पूरी जन्म तिथि (दिन, महीना, वर्ष) से निकाला जाता है और कर्म व भाग्य को दर्शाता है। दोनों वैदिक अंक ज्योतिष के मूल सिद्धांत हैं, जो पूरे भारत में व्यापक रूप से उपयोग होते हैं।",
    faqQ5: "मास्टर नंबर 11, 22 और 33 क्या हैं?",
    faqA5: "मास्टर नंबर 11, 22 और 33 अंक ज्योतिष में अत्यंत आध्यात्मिक और शक्तिशाली माने जाते हैं। इन्हें एकल अंकों में नहीं घटाया जाता। 11 अंतर्ज्ञानी दृष्टा है, 22 सपनों को हकीकत में बदलने वाला मास्टर बिल्डर है, और 33 करुणा से प्रेरित मास्टर शिक्षक है। इन अंकों वाले लोग अधिक उपहार और जिम्मेदारियां लेकर आते हैं।",
    faqQ6: "व्यक्तिगत वर्ष चक्र क्या है और यह हर साल क्यों बदलता है?",
    faqA6: "व्यक्तिगत वर्ष जन्म दिन, जन्म महीने और वर्तमान वर्ष को जोड़कर, एकल अंक में घटाकर निकाला जाता है। यह हर साल बदलता है क्योंकि वर्ष का मान बदलता है। वर्ष 1 नई शुरुआत, वर्ष 5 बदलाव और स्वतंत्रता, वर्ष 9 समापन लाता है। अपना व्यक्तिगत वर्ष जानने से बड़े निर्णयों, विवाह और व्यापार की योजना में मदद मिलती है।",
    faqQ7: "क्या अंक ज्योतिष से नाम बदलकर जीवन बदल सकते हैं?",
    faqA7: "हां, नाम सुधार भारतीय अंक ज्योतिष में एक लोकप्रिय उपाय है। भाग्यांक, आत्मा अंक और व्यक्तित्व अंक नाम से निकाले जाते हैं, इसलिए वर्तनी बदलने से ये कंपन बदल सकते हैं। बहुत से लोग चुनौतीपूर्ण संख्याओं को संतुलित करने के लिए एक अक्षर जोड़ते या हटाते हैं। हालांकि, नाम परिवर्तन तब सबसे अच्छा काम करता है जब इसे सकारात्मक सोच और सातत्यपूर्ण उपयोग के साथ जोड़ा जाए।",
    faqQ8: "कर्मिक पाठ और लुप्त अंक क्या हैं?",
    faqA8: "कर्मिक पाठ आपकी जन्म तिथि में अनुपस्थित अंकों से प्रकट होते हैं। यदि जन्म तिथि में 1 से 9 के बीच कोई अंक नहीं है, वह गुणवत्ता आपको इस जन्म में विकसित करनी है। जैसे, 5 की अनुपस्थिति स्वतंत्रता के पाठों का संकेत देती है, 7 की अनुपस्थिति आध्यात्मिक अध्ययन की ओर इशारा करती है।",
    faqQ9: "भाग्यशाली अंक, रंग और रत्न कैसे निर्धारित होते हैं?",
    faqA9: "प्रत्येक जीवन पथ या मूलांक किसी ग्रह द्वारा शासित होता है और उसी से भाग्यशाली दिन, रंग और रत्न आते हैं। उदाहरण: अंक 1 सूर्य द्वारा शासित है — लाल, सोने के रंग और माणिक्य। अंक 6 शुक्र द्वारा — सफेद, गुलाबी और हीरा। ये विकल्प सकारात्मक ग्रहीय ऊर्जा बढ़ाते हैं और महत्वपूर्ण दिनों पर उपयोग किए जाते हैं।",
    faqQ10: "यह मुफ्त अंक ज्योतिष कैलकुलेटर कितना सटीक है?",
    faqA10: "यह कैलकुलेटर मानक पाइथागोरियन और वैदिक अंक ज्योतिष विधियों का पालन करता है, इसलिए दर्ज नाम और जन्म तिथि के आधार पर संख्याएं गणितीय रूप से सटीक हैं। व्याख्याएं सामान्य मार्गदर्शन हैं, निरपेक्ष भविष्यवाणी नहीं। नाम सुधार, व्यापार अंक ज्योतिष, अनुकूलता और व्यक्तिगत उपायों के लिए योग्य ज्योतिषी से परामर्श लें।",
  },
} as const;
