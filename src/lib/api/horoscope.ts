// Deterministic horoscope data layer for AstroEshop.
// All computations are pure client-side functions seeded by (sign, period, date)
// so values stay stable within a given period but vary across signs/periods.

import { zodiacSigns } from "@/lib/data/zodiac";
import type { HoroscopeSign } from "@/types";

// ---------------------------------------------------------------------------
// Public types
// ---------------------------------------------------------------------------

export type HoroscopePeriod = "daily" | "weekly" | "monthly" | "yearly";

export interface HoroscopeAspects {
    love: number;
    career: number;
    health: number;
    finance: number;
    family: number;
}

export interface HoroscopeLuckyColor {
    name: string;
    hex: string;
}

export interface HoroscopeCompatibleSign {
    sign: string;
    name: string;
    symbol: string;
}

export interface HoroscopeMantra {
    sanskrit: string;
    transliteration: string;
    meaning: string;
}

export interface HoroscopeGemstone {
    name: string;
    hindi: string;
    shopCategory: string;
}

export interface HoroscopeData {
    sign: string;
    name: string;
    hindi: string;
    symbol: string;
    element: string;
    period: HoroscopePeriod;
    periodLabel: string;
    overall: string;
    overallRating: number;
    luckyNumber: number;
    luckyColor: HoroscopeLuckyColor;
    luckyTime: string;
    compatibleSign: HoroscopeCompatibleSign;
    mood: string;
    ruler: string;
    aspects: HoroscopeAspects;
    dos: string[];
    donts: string[];
    mantra: HoroscopeMantra;
    gemstone: HoroscopeGemstone;
}

// ---------------------------------------------------------------------------
// Horoscope readings pool (preserved verbatim from original file)
// ---------------------------------------------------------------------------

const horoscopePool: Record<string, string[]> = {
    aries: [
        "Today brings a surge of energy and motivation, dear Aries. Channel your natural leadership abilities into a project that matters to you. A conversation with someone close could reveal an unexpected opportunity. Trust your instincts when making decisions — your gut feeling is remarkably accurate right now. Physical activity will help you stay centered and focused.",
        "The stars encourage you to slow down and reflect before acting today, Aries. While your impulse is to charge ahead, patience will serve you better. A financial matter requires careful attention — review the details before committing. Your creative energy is especially strong this evening, making it a great time for artistic pursuits or brainstorming sessions.",
        "An exciting opportunity may present itself today, Aries. Your confidence and charm are at their peak, making this an excellent time for networking or important conversations. However, be mindful of others' feelings — your directness, while admired, could unintentionally cause friction. A surprise message from an old friend could brighten your day.",
        "Today is perfect for setting new intentions, Aries. The planetary alignment supports fresh starts and bold moves. Focus on what truly matters to you rather than getting caught up in others' expectations. A health-related insight could lead to positive lifestyle changes. Evening hours favor romantic connections and deep conversations.",
        "Your determination is your superpower today, Aries. Challenges that seemed overwhelming yesterday will feel manageable now. A mentor or authority figure may offer guidance that reshapes your perspective. Financial prospects look favorable — consider exploring new income streams. Remember to balance ambition with rest for optimal results.",
        "A fiery spark returns to your ambitions, dear Aries. Use this momentum to finally initiate something you have been postponing in your career. A workout or brisk morning walk will fuel your clarity throughout the day. Avoid letting small frustrations hijack your focus — redirect that heat into meaningful progress. Someone younger may look up to you for guidance.",
        "Leadership opportunities quietly present themselves today, Aries. Rather than announcing your plans loudly, demonstrate capability through action. A family member may lean on your strength — offer it without making them feel smaller. Light a red candle or recite a Hanuman chant to align with Mars energy. Financial discipline practiced now prevents larger worries ahead.",
        "Passion colours every interaction today, dear Aries. In love, your warmth rekindles closeness that had turned routine; if single, a magnetic encounter may surprise you. At work, avoid crossing boundaries simply because you can — restraint is strength. Your body craves movement and fresh air. Honour that urge before the afternoon slips away.",
        "A creative fire stirs beneath your usual drive, Aries. You may discover that an artistic hobby, sport, or side venture deserves more room in your life. Listen when a trusted friend gives you a reality check — they see what your momentum hides. Spicy food and strong coffee may disturb sleep; choose warmth without overstimulation. Evening mantra practice brings grounding.",
        "Courage opens doors that patience alone cannot, dear Aries. A stalled conversation at work finally shifts when you speak your truth plainly. Romance benefits from playful gestures rather than grand declarations. Watch your spending on gadgets or impulse luxuries — desire is loud today. A short walk at sunrise recharges your inner flame.",
        "You are being asked to lead yourself before leading others, Aries. Before taking on one more responsibility, audit the ones already draining you. A relative may need your fierce protection — stand up for them without aggression. Wearing deep red or copper today subtly amplifies Mars energy. Save a portion of today\'s income toward a long-held goal.",
        "An unexpected detour could turn into your best story, dear Aries. Say yes to a short trip, a new route home, or an unfamiliar cuisine. Your instincts about a new acquaintance are accurate — trust the subtle pull or pull-back. Career-wise, a quick decision serves you better than endless debate. Balance this pace with hydration and deep breathing.",
        "Your fighting spirit is best aimed inward today, Aries — at old habits, not at people. A health routine you restart now will hold for months if you start small. A sibling or cousin brings warmth through a simple gesture. Financially, revisit a recurring expense that no longer earns its place. End the day with gratitude rather than grievance.",
        "Confidence returns with quiet authority, dear Aries. You no longer need to prove yourself in rooms where your work already speaks. A mentor figure offers perspective on a decision you keep circling — hear them out fully. Romance asks for listening more than leading today. A simple Hanuman Chalisa recitation steadies any lingering anxiety.",
    ],
    taurus: [
        "Stability and comfort are your themes today, dear Taurus. Focus on strengthening the foundations of your life — whether that means organizing your home, reviewing your finances, or nurturing important relationships. A creative project you've been putting off deserves your attention now. Trust the process and remember that good things take time.",
        "The stars highlight your practical nature today, Taurus. Use your grounded energy to tackle tasks that require attention to detail. A conversation about money or resources could lead to a profitable arrangement. Your sensual side is heightened — indulge in good food, nature walks, or artistic appreciation.",
        "Today calls for patience and persistence, Taurus. A situation that has been developing slowly is about to reach a turning point. Your loyalty to friends and family is noticed and appreciated. Consider investing in your personal growth through learning or skill development. Evening hours bring peace and contentment.",
        "Your intuition is especially strong today, Taurus. Pay attention to subtle signals in your environment and relationships. A practical solution to a longstanding problem may suddenly become clear. Financial matters favor conservative approaches. Spend time in nature to recharge your earth energy.",
        "Romance and creativity take center stage today, Taurus. Whether single or attached, your magnetic charm attracts positive attention. A work project benefits from your methodical approach — don't rush the process. Self-care rituals will be especially nourishing now. Trust your values when facing a difficult decision.",
        "Quiet accumulation is your form of strength, dear Taurus. Small deposits — of savings, skill practice, or affection — compound into real security. A colleague may try to rush your pace; hold your rhythm without apology. Food made slowly and eaten mindfully restores more than hunger. Light a diya at dusk to settle the home\'s energy.",
        "The universe rewards your steady hands today, Taurus. A purchase you have researched thoroughly finally makes sense to commit to. In love, physical closeness — a long hug, a home-cooked meal together — rebuilds trust better than words. Resist a sudden urge to change your hairstyle or home layout drastically. Gentle Venus energy favours a floral fragrance.",
        "Your body holds wisdom today, dear Taurus — listen to it. A subtle ache, a craving, or fatigue is information, not inconvenience. A financial document needs a second read before you sign. Your garden, balcony plants, or even a single potted tulsi want your attention. Someone you mentored quietly thanks you in their own way.",
        "Patience becomes a quiet superpower today, Taurus. A negotiation at work favours the one who speaks last, not loudest. Allow a loved one to finish their thought before offering solutions. Your voice sounds especially rich today — sing, hum, or simply speak with warmth. Avoid heavy meals late in the night for better sleep.",
        "A sensory reset is overdue, dear Taurus. Declutter your wardrobe, reorganise your kitchen shelf, or take a long bath with fragrant oils. Financially, review subscriptions that silently drain you. An old friend\'s message is more meaningful than it seems — respond thoughtfully. Venus favours acts of quiet beauty rather than display.",
        "Love grounds you today in the most unexpected ways, Taurus. A partner\'s small, consistent gesture matters more than any grand promise. Singles may feel drawn to someone calm, dependable, and slightly understated. At work, your reliability is quietly being measured and rewarded. Treat yourself to fresh flowers or silk-soft fabric.",
        "Your values are your compass today, dear Taurus. A tempting shortcut at work clashes with your sense of fairness — honour the latter. Financial conservatism now protects a future expansion you have not yet planned. A close friend needs to be heard, not advised. Walking barefoot on grass, even briefly, balances your earth element.",
        "Long-term thinking pays off today, Taurus. A property, investment, or skill you have nurtured for years quietly appreciates. In relationships, loyalty is recognised without fanfare — feel the warmth of being truly known. Overindulgence in sweets or screen time could leave you heavy; choose slowness, not sluggishness. Chanting a Shukra mantra softens tensions.",
        "Beauty is medicine for you today, dear Taurus. Visit a garden, a temple, or simply a well-lit market lane and let your senses feed you. A practical idea for supplementary income gently surfaces — write it down. In love, consistency matters more than novelty. Close the night with a warm milk and a calming book.",
    ],
    gemini: [
        "Your communication skills shine brightly today, Gemini. Express yourself freely — your words carry extra weight and influence. A stimulating conversation could spark a brilliant idea or open new doors. Stay curious and open to learning from unexpected sources. Social connections made today have the potential for lasting significance.",
        "Today brings mental clarity and quick thinking, Gemini. You'll find it easy to multitask and juggle various responsibilities. A sibling or close friend may need your advice — your perspective will be invaluable. Creative writing or journaling could lead to important self-discoveries. Embrace variety and keep your schedule flexible.",
        "The stars encourage networking and social engagement today, Gemini. Your natural wit and charm make you the life of any gathering. A piece of information you receive could change your plans in a positive way. Be mindful of overcommitting — choose quality over quantity in your engagements. Reading or studying brings particular satisfaction.",
        "Your adaptable nature serves you well today, Gemini. Changes in plans that might frustrate others will feel exciting to you. A technology-related opportunity deserves exploration. Your ideas are flowing freely — capture them before they slip away. Evening conversations with loved ones bring warmth and understanding.",
        "Intellectual pursuits are highly favored today, Gemini. Whether you're researching, studying, or teaching, your mind is sharp and receptive. Travel plans or short trips could lead to memorable experiences. A financial decision benefits from thorough analysis rather than impulse. Your dual nature helps you see both sides of any situation.",
        "Curiosity is your currency today, dear Gemini. A short video, podcast, or book chapter sparks an idea worth developing. A neighbour or cousin becomes an unexpected source of support. Be honest in at least one conversation where you have been giving vague answers. Light, flexible exercise — stretching or yoga — suits your nervous system best.",
        "The air around you is thick with messages today, Gemini. Respond to the pending email, return the missed call, and clear the notification backlog — each one unblocks fresh energy. A casual remark reveals someone\'s real feelings about a shared plan. Avoid signing contracts without reading footnotes. A green or mint-coloured accent brings Mercury\'s favour.",
        "Your versatility is a real asset today, dear Gemini. Switching between projects, roles, or moods comes naturally and others admire it. A sibling or close friend needs clarity from you, not more options. Financially, small diversified savings beat one big bet. A short journaling session before bed untangles overthinking.",
        "Words carry weight today, Gemini — choose them with care. A well-phrased message can heal a rift that has lingered quietly. In love, playful teasing is welcomed; sarcasm is not. Reading something outside your usual genre widens your perspective. Keep a small bottle of water nearby — hydration sharpens your already quick mind.",
        "Today invites you to go deeper rather than wider, dear Gemini. Pick one topic, idea, or relationship and commit your full attention for a few hours. You will discover richness that skimming never reveals. A friend\'s honest feedback about your pace lands correctly. Avoid caffeine overload — your mind is racing enough.",
        "Networking brings genuine returns today, Gemini. A casual coffee or a quick call with a former colleague opens a door you did not expect. Watch your tone on social media — a harmless joke may land poorly. Your ideas are ahead of the room, but pacing them kindly earns allies. A walk under a tree settles scattered thoughts.",
        "Learning unlocks earning today, dear Gemini. A short online course, certification, or free workshop aligns directly with an upcoming opportunity. In love, intellectual intimacy matters as much as emotional warmth — discuss dreams, not just logistics. Keep your phone face-down during meals today. An evening conversation with family feels restorative.",
        "Your mind is your temple today, Gemini — keep it orderly. Note down the three questions circling in your head and address them one at a time. Travel, even a short commute, offers small revelations if you stay present. A financial app or tool you adopt now streamlines months ahead. Reciting a Budh mantra softens mental static.",
        "Flexibility is a form of wisdom today, dear Gemini. A change in plans is not a setback but a redirection — follow it curiously. A neighbour, classmate, or junior offers insight beyond their years. In love, ask open-ended questions rather than assuming answers. A cool breeze, a window seat, and a good book could be the luxury your day needs.",
        "Communication bridges you to abundance today, Gemini. A proposal, pitch, or application you draft now has strong chances of approval. Be careful not to over-explain — your first version is often the clearest. An unexpected bit of gossip is better left unrepeated. A cup of tulsi tea in the evening clears both throat and mind.",
    ],
    cancer: [
        "Home and family take priority today, dear Cancer. Your nurturing instincts are heightened — use them to create harmony in your closest relationships. A nostalgic memory could bring clarity to a current situation. Trust your emotional intelligence when navigating complex dynamics. Evening hours are perfect for cooking, decorating, or family gatherings.",
        "The stars illuminate your emotional depth today, Cancer. Allow yourself to feel fully without judgment. A creative outlet — painting, music, or writing — can help process complex feelings. Financial security gets a boost through careful planning. A maternal figure in your life may offer wisdom worth listening to.",
        "Today favors domestic improvements and self-care, Cancer. Reorganizing your living space can shift your mental energy in positive ways. A heartfelt conversation with a loved one strengthens your bond. Your protective nature is admired, but remember to also let others take care of you sometimes. Comfort food and cozy evenings restore your spirit.",
        "Your intuition is remarkably accurate today, Cancer. Trust those gut feelings, especially regarding people's true intentions. A real estate or property matter may require attention. Your compassionate nature draws others to you for support — set healthy boundaries where needed. The moon's energy especially favors meditation and reflection.",
        "Emotional connections deepen today, Cancer. Whether in romance, friendship, or family, your ability to understand others creates meaningful moments. A career opportunity may arise from an unexpected direction. Financial matters benefit from your cautious, well-planned approach. Create a sanctuary at home where you can recharge.",
        "Your home is your power centre today, dear Cancer. A small change — a lamp moved, fresh flowers, a polished floor — shifts the entire mood of the house. An older relative\'s advice carries more weight than it seems. Save a portion of any unexpected income before it disappears into daily expenses. A glass of milk at moonrise soothes your lunar energy.",
        "Emotional bravery is required today, Cancer. A feeling you have been tucking away asks to be acknowledged — not acted on, just acknowledged. A friend opens up to you; hold their words without trying to fix everything. Professionally, a quiet achievement earns respect from someone influential. Journaling by candlelight deepens self-understanding.",
        "Moonlight favours gentleness today, dear Cancer. Soften your self-talk, especially around a recent mistake. A family WhatsApp group brings news worth responding to personally. In love, a small ritual — tea together, a shared playlist — matters more than grand plans. Cool colours like pale blue or silver subtly support your mood.",
        "Your memory is a gift today, Cancer, but not a cage. Honour the past while releasing what no longer serves you. A financial lesson from your parents\' experience becomes strangely relevant. Cooking for someone you love nourishes both of you. Avoid heavy confrontations after sunset — emotions amplify in the dark.",
        "Your nurturing nature attracts those who need safety today, dear Cancer. Be generous, but notice when a pattern becomes depletion. A property-related paper, loan, or lease requires your attention before week\'s end. Spending time near water — even a bathtub or a fountain — calms your nervous system. Chant a Chandra mantra before sleeping.",
        "Intuition outpaces logic today, Cancer. A hunch about a coworker, a product, or a route proves correct when you trust it. In romance, a partner\'s silence carries meaning — ask gently rather than assume. Healthy boundaries are not walls; they are welcome mats with rules. A white or silver accessory anchors your day.",
        "Home improvements pay emotional dividends today, dear Cancer. Fixing that loose tap, clearing an overflowing shelf, or deep-cleaning one room frees stuck energy. A childhood friend surfaces in your mind — reach out. Financially, a family-run venture or joint savings plan looks promising. Evening moon bathing, even from a balcony, is healing.",
        "Your kindness is a form of power today, Cancer — use it with awareness. A subordinate or junior needs encouragement more than correction. In love, vulnerability deepens rather than weakens your bond. Protect your energy from overly dramatic voices today. A simple home-cooked meal outshines any outside indulgence.",
        "Feelings are data today, dear Cancer — read them as you would a report. A gut response to a business offer is worth trusting, even without full reasoning. Spend time with a grandparent, elder, or mentor figure; their presence is rare wisdom. A sea-green or pearl-toned outfit subtly amplifies Moon energy. Sleep earlier than usual tonight.",
        "Security is not only financial for you, dear Cancer — it is emotional and relational too. Strengthen each area in small ways today. A gentle apology opens doors that long explanations cannot. Creative cooking, baking, or even plating food thoughtfully relaxes your soul. An old photograph brings unexpected peace.",
    ],
    leo: [
        "Your natural radiance shines even brighter today, Leo. Step into the spotlight — opportunities for recognition and leadership await. A creative project you've been developing is ready to be shared with the world. Generosity toward others returns to you tenfold. Romance and playful energy fill the evening hours.",
        "Today empowers your creative expression, Leo. Whether through art, performance, or simply your personal style, let your unique light shine. A child or younger person may inspire you in unexpected ways. Financial ventures that align with your passions have strong potential. Your warmth and loyalty strengthen important friendships.",
        "The stars highlight your leadership qualities today, Leo. Others look to you for direction and inspiration — don't shy away from this role. A bold decision could lead to significant progress in your career. Physical activities, especially those involving competition or performance, are highly favored. Your confidence is contagious.",
        "Romance and self-expression are your themes today, Leo. Your magnetic personality attracts admirers and opportunities alike. A creative block dissolves as inspiration flows freely. Be generous with praise and recognition of others' efforts. Social gatherings or celebrations bring joy and meaningful connections.",
        "Today calls for courage and authenticity, Leo. Being true to yourself — even when it's challenging — leads to breakthrough moments. A professional opportunity aligns with your long-term goals. Your protective nature ensures those you love feel safe and valued. Golden hour brings particularly powerful creative energy.",
        "Your heart leads beautifully today, dear Leo. A generous act — mentoring, gifting, or covering someone\'s bill — circulates back to you multiplied. In love, warm affection expressed openly is received wonderfully. A creative portfolio, reel, or presentation deserves final polish and public sharing. Wearing gold or sunrise hues boosts your solar radiance.",
        "Recognition arrives quietly today, Leo. A senior notices your consistency even if they do not announce it publicly. Resist the urge to dominate a family discussion — listening earns you more respect. Financially, a long-term insurance or investment plan makes sense to revisit. A Surya mantra at sunrise aligns your confidence with purpose.",
        "Your playful side needs oxygen today, dear Leo. Schedule something that is pure fun — a concert, a dance class, a day with children in your family. Romance blossoms through spontaneity rather than strategy. A small ego check from a close friend is medicine, not an insult. Sunlight on your skin, even briefly, lifts your mood.",
        "Creativity pays today, Leo — literally. A passion project shows signs of monetisation if you refine its presentation. Leadership is needed at home; bring calm authority to a family decision. Avoid overspending on appearances when substance already speaks. A short nap in the afternoon sharpens your evening charisma.",
        "Your loyalty is noticed by the right people today, dear Leo. A long-time colleague, friend, or family member remembers how you stood by them. Use this goodwill gracefully, not transactionally. In love, expressing appreciation first melts any lingering coldness. A walk at golden hour rekindles your inner fire.",
        "Drama is best kept on stage today, Leo — not in your life. Resist the urge to inflate a minor misunderstanding. A child, niece, nephew, or student brings unexpected joy through their simple honesty. Financially, pride should not push you into a purchase you cannot comfortably afford. Evening reading sharpens perspective.",
        "Authentic leadership is your theme today, dear Leo. Share credit visibly; it returns as respect. A performance, pitch, or public moment goes better than you imagined. In romance, your words have the power to make your partner\'s week — use them generously. Ruby or coral tones subtly strengthen your Sun-ruled aura.",
        "Your radiance is useful only when rested, Leo. Guard your sleep like it is a kingdom, because it is. A competitive situation at work is better won with grace than grandeur. A business idea involving art, entertainment, or self-expression shines today. Chant the Aditya Hridaya stotra for strength.",
        "Today celebrates your big-hearted nature, dear Leo. Donate, mentor, tip generously, or simply praise someone who rarely gets appreciated. Watch out for flattery disguised as friendship. A creative collaboration could become long-term if you set clear terms early. A short meditation before an important meeting centres you beautifully.",
        "Self-worth is quieter than self-image, Leo — nurture the former today. Reflect on what makes you proud beyond what others see. A health-related habit linked to your heart or spine deserves attention. Romance prefers sincerity over spectacle now. A cup of saffron-infused milk at night adds warmth to your rest.",
    ],
    virgo: [
        "Your analytical mind is especially sharp today, Virgo. Use this clarity to organize, plan, and solve problems that have been lingering. Health and wellness routines started today will have lasting benefits. A colleague or friend appreciates your practical advice. Evening hours favor quiet reflection and personal development.",
        "Attention to detail is your superpower today, Virgo. Tasks that require precision and care will flow effortlessly. A health-related discovery or routine adjustment improves your well-being. Your service-oriented nature helps someone in need — this kindness creates positive ripple effects. Journaling brings valuable insights.",
        "The stars favor practical improvements today, Virgo. Decluttering — whether physical spaces or mental baggage — brings refreshing clarity. A work project benefits from your meticulous approach. Dietary changes or new exercise routines show promising results. Your grounded wisdom helps a friend navigate a complex situation.",
        "Today brings opportunities for growth through service, Virgo. Your natural desire to help others aligns with meaningful causes or projects. Communication is clear and productive — important emails or conversations achieve desired outcomes. A nature walk or garden time restores your earth element energy.",
        "Your perfectionist tendencies serve you well today, Virgo — channel them productively rather than critically. A systematic approach to a complex task yields impressive results. Health consciousness leads to positive choices. A mentor recognizes your dedication and offers valuable guidance. Self-care isn't selfish — prioritize your needs.",
        "Small systems create big freedom for you today, dear Virgo. A simple checklist, meal plan, or expense tracker put in place now saves hours later. A colleague may need your help debugging a process — share without lecturing. Your digestion responds well to warm, simple, home-cooked food. A brief walk after meals is a genuine tonic.",
        "Service brings you joy today, Virgo — but choose where you spend it. Not every request deserves your highest effort; prioritise what aligns with your growth. A health report, lab test, or wellness check taken today brings timely insight. Financially, revisit insurance coverage and emergency funds. A Budh mantra sharpens clarity.",
        "Your mind is a diagnostic instrument today, dear Virgo. Use it to audit one area of life — finances, wardrobe, calendar — and streamline it. In relationships, softness matters more than accuracy; you can be right and still be gentle. A cool green workspace lifts your focus. Herbal tea replaces that third coffee well.",
        "Details you notice today others completely miss, Virgo. A small error caught early prevents a larger embarrassment for your team. Cooking something nourishing from scratch is both therapy and indulgence. Your partner or close friend needs warmth before analysis. Avoid over-scrolling at night — your mind needs true rest.",
        "Routine is your ritual today, dear Virgo. Wake, move, hydrate, eat, work, rest — let the pattern hold you. A mentor\'s casual remark becomes a career turning point if you heed it. Financial spring-cleaning, even on a random day, brings relief. A plant on your desk quietly stabilises your Mercury energy.",
        "Your standards help you, Virgo — but today let them relax slightly for others. A family member is doing their best in their own way; honour the effort, not only the outcome. A work project benefits from a short pause rather than another revision. An early dinner aids both digestion and sleep.",
        "Clarity favours you today, dear Virgo. Difficult conversations you have been rehearsing land well when you finally have them. Financial decisions around savings, SIPs, or tax planning are especially favourable. Your body is signalling subtle needs — honour hydration, stretching, and screen breaks. Evening silence is healing.",
        "You are a quiet architect of other people\'s ease, Virgo. Today, receive help too — even if accepting feels uncomfortable. A study, certification, or skill upgrade opens a door you did not see coming. In love, a thoughtful gesture like a handwritten note goes further than expensive gifts. A short pranayama session calms perfectionism.",
        "Simplicity is sophistication for you today, dear Virgo. Reduce, refine, and reorganise rather than adding anything new. A senior colleague may ask for your honest opinion — offer it with tact and evidence. Avoid self-criticism over past choices; each one brought a lesson. A neem, tulsi, or herbal remedy supports health gently.",
        "Your attention to others\' wellbeing is remarkable, Virgo — aim some of it inward today. Book that long-postponed check-up or simply take a proper lunch break. Organising your digital files clears unexpected mental space. A friend\'s gratitude reminds you that your help truly mattered. A light, early dinner sets up better rest.",
    ],
    libra: [
        "Balance and harmony are your guiding stars today, Libra. Relationships take center stage — meaningful conversations strengthen bonds and resolve misunderstandings. Your aesthetic sense is heightened, making this an excellent day for decorating, shopping, or creative projects. A diplomatic approach to a conflict earns respect and positive outcomes.",
        "The stars highlight partnership and collaboration today, Libra. Whether in romance, business, or friendship, joint ventures are especially favored. Your natural charm and grace make negotiations smooth and productive. Art and beauty inspire you — visit a gallery, listen to music, or beautify your surroundings.",
        "Today calls for honest self-reflection, Libra. While you naturally seek external harmony, inner balance is equally important. A decision you've been weighing finds clarity when you trust your heart alongside your head. Social events bring opportunities for meaningful connections. Justice and fairness matter — stand up for what's right.",
        "Your diplomatic skills are in high demand today, Libra. Others seek your balanced perspective on complex situations. A romantic gesture — given or received — strengthens an important relationship. Creative collaborations produce beautiful results. Balance social time with quiet moments of self-care.",
        "Harmony in relationships brings you joy today, Libra. A compromise or agreement reached now will have lasting positive effects. Your sense of style and aesthetics impresses others. Legal or contractual matters are favorably aspected. Evening hours bring romantic energy and opportunities for deeper connection.",
        "Elegance is your language today, dear Libra. The way you dress, speak, and respond quietly shapes how people treat you. A legal document or agreement reviewed today prevents confusion later. In love, small romantic touches — a handwritten card, a shared song — revive sweetness. Rose or jasmine fragrance aligns with your Venus energy.",
        "You thrive in balance, Libra, but today that balance must be internal. Say no to one demand without explanation — your energy is a resource, not a public utility. A partnership, business or personal, enters a more honest chapter. Avoid spending heavily on beauty or decor to soothe stress; a walk works better. A Shukra mantra smooths conflicts.",
        "Partnership is the highlight of your day, dear Libra. A serious conversation with your spouse, business partner, or best friend redefines how you collaborate. Listen fully before replying — your first comment today is almost always the most persuasive. Pastel pink or soft blue lifts your mood. A balanced meal beats intermittent snacking.",
        "Justice matters to you today, Libra — do not flinch from it. Stand up for someone who cannot advocate for themselves. In romance, honesty delivered with kindness strengthens a bond. Financially, a fair split with family or co-investors prevents resentment. An art gallery, poetry reading, or soft instrumental playlist restores your balance.",
        "Your charm is a strategic asset today, dear Libra. Use it to open doors in networking, interviews, or negotiations. Remember that a compliment lands better when it is specific. Clutter in your surroundings affects you more than others realise — tidy one shelf. A harmless indulgence like a soft-scented candle at night is perfectly allowed.",
        "Today\'s decisions should favour long-term harmony, Libra, not short-term pleasantness. A gentle confrontation now avoids a bigger one later. A creative collaboration with someone stylistically different from you surprises both of you. Walk gracefully past gossip; your name is cleaner than those stirring it. A cup of rose tea suits your evening.",
        "Your aesthetic instinct is money-making today, dear Libra. Consider refining your wardrobe, portfolio, or workspace — it subtly influences opportunities. A legal paper, MoU, or rental agreement deserves a second reading. In love, shared silence feels intimate rather than awkward. A walk in a well-lit, clean garden brings equilibrium.",
        "You are drawn to beauty today, Libra, but choose depth over decoration. A cultural event, classical concert, or museum visit feeds your soul. A family member seeks your impartial judgment — offer it gently. Financially, avoid lending without a clear understanding. A soft pink or peach shade suits both your mood and your skin.",
        "Balance begins with your body today, dear Libra. Posture, breath, and hydration quietly determine your charm. An old flame or ex might cross your mind — reflect, do not reach out impulsively. A creative idea involving fashion, interiors, or design deserves serious research. Evening mantra chanting brings stillness.",
        "Harmony is not sameness, Libra — it is dialogue. Today welcomes healthy disagreement followed by sincere reconnection. A partnership ready to take the next step may need a written agreement. Your diplomacy smooths a workplace tension you did not even cause. A soft floral bouquet at home amplifies Venus energy.",
    ],
    scorpio: [
        "Transformation and depth define your day, Scorpio. Your penetrating insight cuts through surface appearances to reveal hidden truths. A financial matter benefits from your strategic thinking. Emotional intensity can be channeled into creative or passionate pursuits. Trust the process of change — what ends makes room for something better.",
        "The stars amplify your investigative nature today, Scorpio. Research, analysis, and deep dives into any subject yield valuable discoveries. A secret or hidden information comes to light — use this knowledge wisely. Your magnetic presence draws others into your orbit. Embrace vulnerability as strength.",
        "Today favors intense focus and determination, Scorpio. Your ability to concentrate deeply gives you an edge in challenging tasks. A joint financial matter or shared resource requires attention. Your transformative energy inspires others to face their own shadows. Meditation or therapy brings powerful breakthroughs.",
        "Power and influence are your themes today, Scorpio. Your natural intensity commands respect and attention. A mystery or puzzle that's been nagging you finds resolution. Financial strategies developed now have strong long-term potential. Your loyal nature deepens trust in your closest relationships.",
        "Emotional depth and passion guide you today, Scorpio. Channel your powerful feelings into meaningful action rather than internal turmoil. A research project or investigation reaches an important milestone. Trust your ability to regenerate and transform any situation. Intimate conversations bring healing and understanding.",
        "Transformation begins in silence today, dear Scorpio. A habit you have quietly grown out of can finally be released without drama. A joint account, shared loan, or inherited asset may need attention — handle it with clarity, not suspicion. Your penetrating gaze reads a room accurately; trust those signals. Wear deep burgundy to anchor your power.",
        "Your magnetism is especially strong today, Scorpio. Use it to negotiate, persuade, or advocate for something meaningful. Be careful with texts sent in late-night emotional states — reread before you send. A past wound closes today if you decide to stop revisiting it. A Mangal mantra balances intensity with strength.",
        "Depth attracts depth today, dear Scorpio. A conversation about life, loss, or purpose connects you to someone meaningfully. A research-based project, investigation, or data deep-dive yields a breakthrough. In love, emotional honesty is more seductive than mystery now. A dark chocolate treat in the afternoon is permissible indulgence.",
        "Control is less about others and more about yourself today, Scorpio. A situation you cannot dictate can still be navigated with mastery. Financially, strategies involving insurance, taxes, or long-term wealth are favoured. A trusted friend\'s perspective reveals a blind spot — accept it without defensiveness. Evening silence is a gift you can give yourself.",
        "Your intensity is a compass today, dear Scorpio — follow it to what truly matters. Drop one commitment that no longer holds meaning. Someone from your past reappears; greet them neutrally before deciding how much space to offer. A black or deep plum outfit grounds your day. Journaling your rawest feelings privately brings clarity.",
        "Transformation is physical too, Scorpio. A new workout, cleanse, or detox started now holds stronger commitment than most. Avoid consuming heavy, dark, or overly stimulating content before bed; your dreams absorb everything. A confidential conversation at work deserves your secrecy — you earn trust that pays later. A red coral or garnet accessory resonates.",
        "Your loyalty is fierce, dear Scorpio, but loyalty to truth comes first. If a fact contradicts a person you love, honour the fact while staying kind. A side income, investment, or strategic partnership deserves reevaluation. Romantic intimacy deepens when you share a long-held feeling openly. A brief meditation by candlelight centres you.",
        "Today favours endings that clear the ground for beginnings, Scorpio. Close a pending loan, unfinished project, or lingering subscription. Your resilience inspires a younger family member more than you realise. Avoid secretive money moves — transparency protects you now. A Shiva mantra at dusk elevates your inner stillness.",
        "Power is quietest when it is real, dear Scorpio. You do not need to prove strength today — simply act from it. A mystery at work or home resolves when you ask one precise question. In love, do not test your partner; invite them instead. A small investment in a meaningful book or course is well spent.",
        "Emotional truth is your medicine today, Scorpio. Speak one thing you have been carrying silently to a trusted listener. Financial housekeeping — nominations, wills, joint holdings — deserves unglamorous attention. A secret that is not yours to share must remain with its owner. A hot bath with a few drops of essential oil restores you.",
    ],
    sagittarius: [
        "Adventure and optimism fill your day, Sagittarius. The stars encourage exploration — whether through travel, learning, or philosophical inquiry. Your enthusiasm is contagious and inspires those around you. A teaching or mentoring opportunity allows you to share your wisdom. Keep your eyes open for signs pointing toward your next great journey.",
        "Today brings expansion and growth, Sagittarius. Your natural optimism is well-placed — good fortune favors bold moves. An educational opportunity or cultural experience broadens your perspective. Long-distance communication brings welcome news. Your philosophical nature helps others see the bigger picture.",
        "The stars highlight your adventurous spirit today, Sagittarius. Whether planning a trip, starting a course, or exploring new ideas, your quest for knowledge is rewarded. A foreign connection or cultural exchange brings unexpected benefits. Your honesty and directness are appreciated, even when the truth is complex.",
        "Freedom and truth are your guiding principles today, Sagittarius. Resist anything that feels constraining or inauthentic. A spiritual practice or philosophical discussion brings profound insights. Travel plans crystallize into exciting possibilities. Your generosity of spirit attracts abundance in all forms.",
        "Your jovial nature brightens everyone's day, Sagittarius. Humor and wisdom combined make you an excellent communicator. Legal or academic matters proceed favorably. A spontaneous adventure leads to memorable experiences. Keep your long-term vision clear while enjoying the present moment.",
        "Expansion calls you today, dear Sagittarius. A travel plan, foreign collaboration, or higher education goal gains momentum if you take the first logistical step. An elder\'s blessing, literal or emotional, feels especially powerful now. Avoid promising more than you can deliver in one enthusiastic moment. A yellow or saffron thread worn on the wrist aligns Jupiter\'s grace.",
        "Your optimism is a gift to others today, Sagittarius, but pair it with practicality. A mentor offers a correction that initially stings but ultimately elevates. Financial planning focused on long-term goals — retirement, property, children\'s future — is deeply favoured. Stretch in the morning to match your restless energy. Chant a Guru mantra at noon.",
        "Philosophy meets practicality today, dear Sagittarius. A spiritual book, satsang, or documentary shifts something in your worldview. Romance enjoys playful banter that leads to genuine depth. Avoid impulsive travel bookings without reviewing the fine print. A wholesome vegetarian meal agrees with your body today. Evening stargazing, even briefly, refills your spirit.",
        "Freedom is sacred for you, Sagittarius, but so is follow-through. Finish what you began before chasing the next idea. A professor, guide, or senior colleague recognises your potential openly. Luck favours bold but thoughtful moves — not reckless ones. Yellow-toned clothing subtly supports Jupiter\'s influence today.",
        "Your honesty is appreciated today, dear Sagittarius — delivered with tact, it becomes leadership. A relative asks for financial advice; offer perspective rather than a direct loan. An online course about personal growth or spirituality calls your name. Laughter shared with old friends is genuine therapy. A turmeric-based drink suits your digestion.",
        "Adventure does not always mean distance, Sagittarius. Today, try a new neighbourhood, cafe, or unfamiliar route — novelty lifts your spirit. Your teaching gift shines; share a skill or story with someone eager to learn. Avoid gambling, speculative bets, or quick-rich schemes. A Lord Vishnu chant brings steadiness.",
        "Truth-seeking defines your day, dear Sagittarius. A question you have been holding deserves real research, not guesswork. A legal or academic document gets clarity if you read it patiently. In love, a shared belief system strengthens the connection more than shared hobbies. A walk under open sky restores your natural freedom.",
        "Your generosity is noticed today, Sagittarius. Donate time, money, or attention to a cause close to your heart — the universe quietly returns it. Avoid overcommitting to social events; rest is also a spiritual practice. A long phone call with a distant loved one is balm for the week. A Brihaspati Kavacham reading is especially auspicious.",
        "Big-picture thinking favours you today, dear Sagittarius. Zoom out — from a disagreement, a financial worry, or a work frustration — and choose your next move from above. A publishing, teaching, or content-creation opportunity is worth pursuing. Your humour diffuses a tense family conversation beautifully. A yellow flower offered at a temple pleases Jupiter.",
        "Exploration of ideas is your nourishment today, Sagittarius. A podcast, scripture, or philosophy video sparks real reflection. Avoid dispensing advice unless genuinely asked; your influence grows with restraint. Financially, a long-term saving scheme begun now blossoms in time. A simple haldi-milk at night strengthens immunity and spirit.",
    ],
    capricorn: [
        "Ambition and discipline drive your success today, Capricorn. Long-term plans take significant steps forward through your dedicated effort. Authority figures recognize your competence and reliability. A financial strategy you've been developing shows promising results. Balance work with rest — sustainable progress is your goal.",
        "The stars support your career ambitions today, Capricorn. Your natural authority and organizational skills impress those in positions of power. A structured approach to a complex project yields measurable results. Property or real estate matters are favorably aspected. Remember that true success includes personal fulfillment.",
        "Today rewards patience and perseverance, Capricorn. The mountain you've been climbing is closer to its summit than you realize. A mentor or elder offers guidance rooted in experience. Financial planning and investment decisions are especially well-aspected. Your dry wit lightens serious moments.",
        "Responsibility and achievement are your themes today, Capricorn. Others depend on your reliability and follow-through. A professional milestone approaches — prepare to celebrate your hard work. Traditional approaches prove effective in resolving modern challenges. Family legacy and heritage provide grounding inspiration.",
        "Your practical wisdom shines today, Capricorn. Complex problems yield to your methodical approach. A career opportunity aligns with your long-term goals and values. Financial discipline now creates future abundance. Take time to acknowledge how far you've come — you deserve recognition.",
        "Discipline sets you apart today, dear Capricorn. While others chase quick wins, your slow-built foundation earns quiet admiration. A family elder reminds you of a value worth reclaiming. Financially, review your taxes, SIPs, or long-term plans without procrastinating. A dark blue or charcoal outfit subtly channels Saturn\'s strength.",
        "Saturn rewards steady effort today, Capricorn. A project you have kept alive through many tough phases shows signs of turning profitable. Avoid shortcuts that compromise integrity — your reputation is your biggest asset. Chant a Shani mantra at dusk to balance burdens. Black sesame or a simple dal dinner feels grounding.",
        "Responsibility comes naturally to you, dear Capricorn — but today delegate one item that does not need to be yours. A professional mentor observes you closely; impress through consistency, not flamboyance. Romance benefits from a concrete plan, like a weekend away, rather than vague promises. A walk up a flight of stairs beats an elevator ride today.",
        "Your ambition is your engine, Capricorn, but rest is your fuel. A properly slept night does more for your career than three restless ones. A family responsibility becomes lighter when you share it honestly. Savings directed into disciplined investments pay off long-term. A muted earth-toned outfit feels aligned today.",
        "Today asks for the long view, dear Capricorn. A career decision should be judged by where it places you in five years, not five weeks. Offer tough love to someone younger only after listening fully. Real estate, land, or property discussions are auspicious. A simple temple visit or Hanuman Chalisa recitation fortifies your mood.",
        "Your reputation speaks before you do today, Capricorn. Guard it by honouring commitments — even the tiny ones. A senior trusts you with sensitive information; hold it with integrity. Avoid harsh self-judgment about slow progress — you are further than you feel. A nourishing meal eaten slowly restores your earth element.",
        "Structure frees you, dear Capricorn, rather than confines you. A morning routine recalibrated today supports you for months. A business partnership benefits from written clarity on roles and finances. Be gentle with a family member whose pace is different from yours. A Shani Sadhe Sati-aware life includes patience as prayer.",
        "Persistence outshines brilliance today, Capricorn. A task you have been chipping away at quietly turns a corner. An older colleague offers mentorship if you ask respectfully. Financially, consolidate small scattered accounts into a simpler, trackable structure. A short walk before dinner uplifts your discipline.",
        "Today\'s wins are behind-the-scenes wins, dear Capricorn. The kind that do not trend but quietly secure your future. A parent or parental figure needs your time more than your money. Emotional reserves matter as much as professional ones — rest before you are empty. A black-threaded rudraksha or simple bead bracelet feels right.",
        "Climbing your mountain is a long practice, Capricorn — but today pause to enjoy the view. Acknowledge three achievements you rarely celebrate. A serious conversation with your spouse or partner about finances strengthens trust. Professional content, books, or courses related to leadership are especially useful. A Shani aarti at twilight is grounding.",
    ],
    aquarius: [
        "Innovation and originality mark your day, Aquarius. Your unique perspective on problems leads to breakthrough solutions. Community involvement or group activities bring satisfaction and meaningful connections. Technology plays a favorable role in your endeavors. Embrace your individuality — the world needs your visionary thinking.",
        "The stars highlight your humanitarian nature today, Aquarius. A cause close to your heart gains momentum through your involvement. Friendships and social networks provide support and opportunities. Your innovative thinking solves a problem that conventional approaches couldn't. Digital projects or tech-related ventures are especially favored.",
        "Today celebrates your unconventional approach, Aquarius. Ideas that seemed too bold yesterday now find receptive audiences. A group project or community effort achieves a significant milestone. Your ability to see the future helps you prepare while others react. Scientific or technological discoveries capture your imagination.",
        "Freedom and progress guide your actions today, Aquarius. Challenge outdated systems and propose better alternatives. A friendship deepens through shared ideals and intellectual connection. Technology simplifies a complex task. Your detached perspective helps others gain clarity on emotional situations.",
        "Your visionary nature is especially powerful today, Aquarius. Ideas and insights that come to you now have the potential to create real change. Collaborative efforts multiply your impact. A surprise encounter with a like-minded individual sparks inspiration. Honor your need for independence while staying connected to your community.",
        "Originality is your daily practice today, dear Aquarius. An idea that feels too strange may be precisely the breakthrough your team needs. A community initiative — from your housing society to an online group — invites your contribution. Financially, a digital or tech-based stream of income deserves exploration. A silver or icy-blue accent aligns with Saturn\'s uranian side.",
        "Friendship is your wealth today, Aquarius. A casual check-in message to someone becomes unexpectedly important. Watch for mental fatigue from scrolling too many social feeds — unplug for at least an hour. Your humanitarian instinct finds a cause worth one small action. A Shani mantra blended with meditation deepens perspective.",
        "Your mind is racing beautifully today, dear Aquarius — note the ideas down before they evaporate. A technological solution to a family or work problem suddenly becomes clear. Avoid emotional coldness with a loved one who wants closeness now. A cool meditation or breathing exercise channels your nervous energy. An electric blue accessory subtly empowers you.",
        "Reform from within, not only outside, Aquarius. A personal habit audited honestly reveals what you can upgrade. A group project benefits from your unique framing; share it even if it seems unconventional. In love, emotional availability matters more than intellectual agreement today. A futuristic book or documentary feeds your imagination.",
        "Innovation meets service today, dear Aquarius. An idea for improving something broken — a process, a form, a community service — deserves your first step. A new friend from a completely different background expands your worldview. Avoid getting lost in abstract debate when action is needed. A simple walk with music in your ears resets you.",
        "Your detachment is a strength, Aquarius, when balanced with warmth. Today, let a loved one feel you, not just hear you. Professionally, a volunteering or pro bono gig brings unexpected networking value. Financial caution on crypto, speculative startups, or unverified schemes is wise. A Shani mantra before sleep protects your nerves.",
        "Group energy favours you today, dear Aquarius. A class, webinar, or team brainstorm brings unexpected synergy. Avoid becoming the only contrarian in the room — be principled, not just provocative. In romance, consistent small gestures impress more than dramatic ones. A herbal tea with a dash of lemon refreshes your mood.",
        "Vision without execution is daydreaming, Aquarius. Today, convert one idea into a real step — a draft, a sign-up, a first call. A humanitarian cause you believe in accepts simple help: time, voice, or small donation. Watch overspending on gadgets or tech subscriptions. An evening of minimal screens feels surprisingly good.",
        "Your independence is your identity, dear Aquarius — but today let someone in. A partner, sibling, or close friend needs to know they are more than convenient; they are chosen. A creative project blends art, tech, or activism in a fresh way. Pale violet or icy tones suit your aura today. A short social-media detox clears your mind.",
        "You are ahead of your time, Aquarius — but honour the practical present too. Pay that bill, file that form, answer that overdue message. A senior mentor sees your unconventional gifts clearly; let them guide one decision. An online course on design, data, or psychology feels especially relevant. Chanting Shani aarti in the evening calms the overactive mind.",
    ],
    pisces: [
        "Intuition and compassion guide your path today, Pisces. Your psychic sensitivity is heightened — pay attention to dreams, symbols, and subtle feelings. Creative expression flows effortlessly, making this an ideal day for artistic pursuits. A spiritual practice or meditation brings deep peace. Your empathy helps heal someone in need.",
        "The stars amplify your creative and spiritual gifts today, Pisces. Music, art, poetry, or dance become powerful channels for expression. A compassionate act creates ripple effects of kindness. Boundaries with energy-draining situations are important — protect your sensitive nature. Water-related activities bring refreshment and clarity.",
        "Today favors imagination and faith, Pisces. Trust in the unseen forces guiding your path, even when logic can't explain them. A charitable cause or volunteer opportunity brings deep fulfillment. Your artistic talents receive recognition or encouragement. Dreams carry important messages — keep a journal by your bed.",
        "Your empathetic nature is your greatest gift today, Pisces. Others are drawn to your understanding and non-judgmental presence. A creative project reaches a beautiful completion. Spiritual practices deepen your connection to the divine. Financial intuition guides you toward wise choices. Rest and solitude recharge your sensitive soul.",
        "Mystical and magical energy surrounds you today, Pisces. Your connection to the unseen world is especially strong. A creative inspiration arrives seemingly from nowhere — capture it immediately. Forgiveness and letting go of past hurts brings liberation. Your gentle strength inspires others to open their hearts.",
        "Your intuition is a quiet oracle today, dear Pisces. Pay attention to the first thought that rises before logic interferes. A spiritual teacher, podcast, or scripture speaks directly to a question you have been carrying. Avoid absorbing the emotional stress of someone who is not ready to heal. A Guru mantra at dawn protects your sensitive aura.",
        "Creativity flows almost unreasonably today, Pisces. Keep a notebook, voice recorder, or sketchpad nearby — inspiration does not wait. A financial idea linked to art, healing, or spirituality has potential if you ground it practically. In love, a small poetic gesture touches someone deeply. Aquamarine or sea-green tones resonate with your energy.",
        "Compassion is your compass, dear Pisces, but do not lose yourself in another\'s storm. Offer help from a stable shore, not by drowning with them. A dream last night may carry a message — reflect on it with kindness. An ancient temple, meditation app, or soothing kirtan feels healing. Avoid excessive sweets or alcohol.",
        "Your sensitivity is a gift today, Pisces — protect it. Choose your environments carefully; crowded or loud spaces drain you more than others. A spiritual practice — mantra, silence, prayer, or journaling — replenishes you faster than any entertainment. A soft-spoken encouragement from you changes someone\'s day quietly. Spend time near a river, pond, or fountain.",
        "Surrender is not weakness today, dear Pisces — it is strategy. Let go of one outcome you have been obsessively controlling. A creative collaboration with a close friend brings unexpected joy. Financial intuition helps you avoid a subtle scam or bad deal. Evening chanting or soft instrumental music wraps your mind in peace.",
        "Dreams and reality blur beautifully today, Pisces. Channel this haze into art, writing, or design rather than escapism. A loved one needs quiet presence, not elaborate advice. Avoid mixing romance with financial entanglement without clarity. A sea or river visit, or even blue-themed decor at home, uplifts your soul.",
        "Your empathy heals a wound today, dear Pisces — sometimes in someone else, sometimes in yourself. An act of charity, even a small one, purifies your karma. Keep commitments simple and honest; over-promising hurts your sensitive conscience later. A Guru mantra cleanses mental fog beautifully. Sleep with a soft, dim light nearby for gentler dreams.",
        "Spiritual growth accelerates today, Pisces. A scripture verse or a line from an elder\'s message strikes deeper than usual. Avoid numbing feelings with excessive scrolling, streaming, or snacking — sit with them instead. Your artistic gifts attract recognition if you share your work publicly. A short temple visit or meditation under a tree grounds you.",
        "Your imagination is a laboratory today, dear Pisces. Solutions to tangled problems arrive not through force but through gentle reflection. A friend pours their heart out; listen without absorbing their emotions as your own. In love, a shared silence feels more intimate than a long date. A soft lavender or turquoise colour supports your mood.",
        "Water, music, and kindness are your allies today, Pisces. Start the day with a long sip of warm water and end it with a soulful melody. A creative project finds completion when you stop editing and start publishing. An older teacher or guide offers a perspective that reframes a long worry. Chanting Om Namo Narayanaya softens the heart.",
    ],
};

// ---------------------------------------------------------------------------
// Seeding helpers
// ---------------------------------------------------------------------------

function hash(str: string): number {
    let h = 5381;
    for (let i = 0; i < str.length; i++) {
        h = ((h << 5) + h + str.charCodeAt(i)) | 0;
    }
    return Math.abs(h);
}

function pickSeeded<T>(items: readonly T[], seed: string): T {
    return items[hash(seed) % items.length];
}

function pickN<T>(items: readonly T[], n: number, seed: string): T[] {
    const count = Math.min(n, items.length);
    const pool = items.slice();
    const out: T[] = [];
    for (let i = 0; i < count; i++) {
        const idx = hash(`${seed}:${i}`) % pool.length;
        out.push(pool[idx]);
        pool.splice(idx, 1);
    }
    return out;
}

function seededRating(seed: string): number {
    // Range 2-5 inclusive (keeps tone positive).
    return 2 + (hash(seed) % 4);
}

function getDayOfYear(date: Date): number {
    const start = new Date(date.getFullYear(), 0, 0);
    const diff = date.getTime() - start.getTime();
    return Math.floor(diff / (1000 * 60 * 60 * 24));
}

function getWeekOfYear(date: Date): number {
    // ISO-ish week: Monday-based, but stable enough for seeding purposes.
    const start = new Date(date.getFullYear(), 0, 1);
    const dayOfYear = getDayOfYear(date);
    const startDow = start.getDay() || 7;
    return Math.floor((dayOfYear + startDow - 1) / 7) + 1;
}

function getPeriodSeed(
    sign: string,
    period: HoroscopePeriod,
    date: Date
): string {
    const year = date.getFullYear();
    switch (period) {
        case "daily":
            return `${sign}-${year}-d${getDayOfYear(date)}`;
        case "weekly":
            return `${sign}-${year}-w${getWeekOfYear(date)}`;
        case "monthly":
            return `${sign}-${year}-m${date.getMonth() + 1}`;
        case "yearly":
            return `${sign}-${year}-y`;
    }
}

function getPeriodLabel(period: HoroscopePeriod): string {
    switch (period) {
        case "daily":
            return "Today";
        case "weekly":
            return "This Week";
        case "monthly":
            return "This Month";
        case "yearly":
            return "This Year";
    }
}

// ---------------------------------------------------------------------------
// Static per-sign data tables
// ---------------------------------------------------------------------------

const RULERS: Record<string, string> = {
    aries: "Mars",
    taurus: "Venus",
    gemini: "Mercury",
    cancer: "Moon",
    leo: "Sun",
    virgo: "Mercury",
    libra: "Venus",
    scorpio: "Mars",
    sagittarius: "Jupiter",
    capricorn: "Saturn",
    aquarius: "Saturn",
    pisces: "Jupiter",
};

const PLANET_GEMSTONES: Record<string, { name: string; hindi: string }> = {
    Mars: { name: "Red Coral", hindi: "मूंगा" },
    Venus: { name: "Diamond", hindi: "हीरा" },
    Mercury: { name: "Emerald", hindi: "पन्ना" },
    Moon: { name: "Pearl", hindi: "मोती" },
    Sun: { name: "Ruby", hindi: "माणिक्य" },
    Jupiter: { name: "Yellow Sapphire", hindi: "पुखराज" },
    Saturn: { name: "Blue Sapphire", hindi: "नीलम" },
};

const PLANET_MANTRAS: Record<string, HoroscopeMantra> = {
    Mars: {
        sanskrit: "ॐ क्रां क्रीं क्रौं सः भौमाय नमः",
        transliteration: "Om Kraam Kreem Kraum Sah Bhaumaya Namah",
        meaning: "Salutations to Mangal (Mars) — grant courage, strength, and victory.",
    },
    Venus: {
        sanskrit: "ॐ द्रां द्रीं द्रौं सः शुक्राय नमः",
        transliteration: "Om Draam Dreem Draum Sah Shukraya Namah",
        meaning: "Salutations to Shukra (Venus) — bestow love, beauty, and harmony.",
    },
    Mercury: {
        sanskrit: "ॐ ब्रां ब्रीं ब्रौं सः बुधाय नमः",
        transliteration: "Om Braam Breem Braum Sah Budhaya Namah",
        meaning: "Salutations to Budh (Mercury) — grant intellect, clarity, and wise speech.",
    },
    Moon: {
        sanskrit: "ॐ श्रां श्रीं श्रौं सः चन्द्रमसे नमः",
        transliteration: "Om Shraam Shreem Shraum Sah Chandramase Namah",
        meaning: "Salutations to Chandra (Moon) — bless the mind with peace and intuition.",
    },
    Sun: {
        sanskrit: "ॐ ह्रां ह्रीं ह्रौं सः सूर्याय नमः",
        transliteration: "Om Hraam Hreem Hraum Sah Suryaya Namah",
        meaning: "Salutations to Surya (Sun) — grant vitality, confidence, and leadership.",
    },
    Jupiter: {
        sanskrit: "ॐ ग्रां ग्रीं ग्रौं सः गुरवे नमः",
        transliteration: "Om Graam Greem Graum Sah Gurave Namah",
        meaning: "Salutations to Guru (Jupiter) — grant wisdom, fortune, and right guidance.",
    },
    Saturn: {
        sanskrit: "ॐ प्रां प्रीं प्रौं सः शनैश्चराय नमः",
        transliteration: "Om Praam Preem Praum Sah Shanaishcharaya Namah",
        meaning: "Salutations to Shani (Saturn) — bestow discipline, patience, and just rewards.",
    },
};

const COMPATIBLE_SIGNS: Record<string, readonly string[]> = {
    aries: ["leo", "sagittarius", "gemini", "aquarius"],
    taurus: ["virgo", "capricorn", "cancer", "pisces"],
    gemini: ["libra", "aquarius", "aries", "leo"],
    cancer: ["scorpio", "pisces", "taurus", "virgo"],
    leo: ["aries", "sagittarius", "gemini", "libra"],
    virgo: ["taurus", "capricorn", "cancer", "scorpio"],
    libra: ["gemini", "aquarius", "leo", "sagittarius"],
    scorpio: ["cancer", "pisces", "virgo", "capricorn"],
    sagittarius: ["aries", "leo", "libra", "aquarius"],
    capricorn: ["taurus", "virgo", "scorpio", "pisces"],
    aquarius: ["gemini", "libra", "aries", "sagittarius"],
    pisces: ["cancer", "scorpio", "taurus", "capricorn"],
};

const LUCKY_COLORS: Record<string, readonly HoroscopeLuckyColor[]> = {
    aries: [
        { name: "Scarlet", hex: "#DC2626" },
        { name: "Crimson", hex: "#B91C1C" },
        { name: "Amber", hex: "#F59E0B" },
        { name: "Coral", hex: "#FB7185" },
    ],
    taurus: [
        { name: "Forest Green", hex: "#15803D" },
        { name: "Emerald", hex: "#059669" },
        { name: "Olive", hex: "#65A30D" },
        { name: "Rose", hex: "#FB7185" },
    ],
    gemini: [
        { name: "Sunshine Yellow", hex: "#EAB308" },
        { name: "Turquoise", hex: "#14B8A6" },
        { name: "Lime", hex: "#84CC16" },
        { name: "Sky Blue", hex: "#38BDF8" },
    ],
    cancer: [
        { name: "Pearl White", hex: "#F3F4F6" },
        { name: "Silver", hex: "#94A3B8" },
        { name: "Sea Blue", hex: "#0EA5E9" },
        { name: "Lavender", hex: "#A78BFA" },
    ],
    leo: [
        { name: "Royal Gold", hex: "#F59E0B" },
        { name: "Sunset Orange", hex: "#EA580C" },
        { name: "Ruby", hex: "#DC2626" },
        { name: "Copper", hex: "#B45309" },
    ],
    virgo: [
        { name: "Sage", hex: "#65A30D" },
        { name: "Earth Brown", hex: "#78350F" },
        { name: "Navy", hex: "#1E3A8A" },
        { name: "Cream", hex: "#FEF3C7" },
    ],
    libra: [
        { name: "Rose Pink", hex: "#EC4899" },
        { name: "Soft Pink", hex: "#F9A8D4" },
        { name: "Pastel Blue", hex: "#BFDBFE" },
        { name: "Mint", hex: "#86EFAC" },
    ],
    scorpio: [
        { name: "Deep Maroon", hex: "#800909" },
        { name: "Black", hex: "#111827" },
        { name: "Burgundy", hex: "#991B1B" },
        { name: "Plum", hex: "#7E22CE" },
    ],
    sagittarius: [
        { name: "Royal Purple", hex: "#7C3AED" },
        { name: "Indigo", hex: "#4F46E5" },
        { name: "Turquoise", hex: "#14B8A6" },
        { name: "Orange", hex: "#F97316" },
    ],
    capricorn: [
        { name: "Earth Brown", hex: "#78350F" },
        { name: "Charcoal", hex: "#1F2937" },
        { name: "Olive", hex: "#65A30D" },
        { name: "Deep Green", hex: "#064E3B" },
    ],
    aquarius: [
        { name: "Electric Blue", hex: "#2563EB" },
        { name: "Aqua", hex: "#06B6D4" },
        { name: "Violet", hex: "#8B5CF6" },
        { name: "Silver", hex: "#94A3B8" },
    ],
    pisces: [
        { name: "Sea Green", hex: "#14B8A6" },
        { name: "Aquamarine", hex: "#22D3EE" },
        { name: "Lavender", hex: "#A78BFA" },
        { name: "Coral", hex: "#FB7185" },
    ],
};

const MOODS: readonly string[] = [
    "Energetic",
    "Focused",
    "Creative",
    "Peaceful",
    "Passionate",
    "Reflective",
    "Joyful",
    "Adventurous",
    "Grounded",
    "Inspired",
    "Confident",
    "Contemplative",
];

const LUCKY_TIMES: readonly string[] = [
    "6 AM - 8 AM",
    "8 AM - 11 AM",
    "11 AM - 1 PM",
    "2 PM - 4 PM",
    "4 PM - 6 PM",
    "6 PM - 9 PM",
    "9 PM - 11 PM",
];

// ---------------------------------------------------------------------------
// Do's and don'ts per sign (6-7 each, short actionable strings)
// ---------------------------------------------------------------------------

const DOS: Record<string, readonly string[]> = {
    aries: [
        "Start a new project today",
        "Lead a team discussion",
        "Exercise to release energy",
        "Trust your first instinct",
        "Wear red for luck",
        "Make that bold call",
        "Spend time outdoors",
        "Chant a Hanuman Chalisa verse",
        "Pick one postponed goal today",
        "Offer mentorship to someone younger",
        "Hydrate well before workouts",
        "Speak your truth kindly",
        "Wake early for sunrise energy",
        "Light a red candle tonight",
        "Do ten minutes of journaling",
    ],
    taurus: [
        "Tend your garden or plants",
        "Cook a nourishing meal",
        "Review monthly finances",
        "Treat yourself to quality",
        "Spend time in nature",
        "Strengthen a loyal bond",
        "Invest in lasting comfort",
        "Light a diya at dusk",
        "Save a small amount today",
        "Wear earthy green tones",
        "Enjoy a slow home-cooked breakfast",
        "Walk barefoot on grass",
        "Offer fresh flowers at home",
        "Declutter your wardrobe shelf",
        "Listen to soothing classical music",
    ],
    gemini: [
        "Share an interesting idea",
        "Read something new today",
        "Reach out to a sibling",
        "Write down quick thoughts",
        "Attend a social gathering",
        "Learn a small new skill",
        "Send that pending message",
        "Clear your notification backlog",
        "Ask one curious question today",
        "Sip tulsi tea in evening",
        "Take short walking breaks",
        "Listen fully before replying",
        "Finish one unfinished task first",
        "Wear mint or sky-blue tones",
        "Chant a Budh mantra daily",
    ],
    cancer: [
        "Call a family member",
        "Cook for someone special",
        "Organize your home space",
        "Honor your true feelings",
        "Keep a gratitude journal",
        "Take a restorative bath",
        "Visit an old memory",
        "Offer milk at moonrise",
        "Write a thank-you note",
        "Spend quiet time near water",
        "Recite a Chandra mantra",
        "Bake or prepare something comforting",
        "Wear pearl or silver tones",
        "Sort through old photographs",
        "Sleep by a dim warm lamp",
    ],
    leo: [
        "Dress to feel powerful",
        "Praise someone sincerely today",
        "Create something purely expressive",
        "Take center stage confidently",
        "Plan a generous gesture",
        "Invest in creative hobbies",
        "Celebrate a small win",
        "Offer water to the sun",
        "Wear gold or saffron tones",
        "Mentor a junior enthusiastically",
        "Recite the Aditya Hridaya stotra",
        "Share credit with your team",
        "Plan a festive family evening",
        "Perform on stage or video",
        "Gift a book to someone",
    ],
    virgo: [
        "Tidy one small space",
        "Plan your week clearly",
        "Eat clean wholesome food",
        "Offer help to someone",
        "Review a health habit",
        "Write a detailed list",
        "Take a mindful walk",
        "Book a pending health check",
        "Organise your digital files",
        "Drink warm herbal tea",
        "Chant a Budh mantra softly",
        "Keep a plant on desk",
        "Stretch between work blocks",
        "Prepare a simple meal plan",
        "Journal three small wins",
    ],
    libra: [
        "Beautify your living space",
        "Mediate a small disagreement",
        "Plan a date or outing",
        "Choose elegance over impulse",
        "Compliment someone genuinely today",
        "Balance work with rest",
        "Listen to calming music",
        "Wear rose or pastel tones",
        "Read a poem aloud",
        "Light a jasmine-scented candle",
        "Offer white flowers at shrine",
        "Review any pending agreement",
        "Take a romantic evening walk",
        "Chant a Shukra mantra quietly",
        "Revisit your art or design",
    ],
    scorpio: [
        "Dive deep into research",
        "Release an old grudge",
        "Trust your powerful intuition",
        "Have one honest conversation",
        "Meditate on your goals",
        "Invest in long-term strategy",
        "Strengthen a close bond",
        "Chant a Mangal mantra today",
        "Write your rawest feelings privately",
        "Review insurance and nominations",
        "Wear deep burgundy or black",
        "Detox one draining habit",
        "Read a transformative biography",
        "Practice silence for an hour",
        "Light a candle at dusk",
    ],
    sagittarius: [
        "Plan a short adventure",
        "Read about a new culture",
        "Share your honest wisdom",
        "Stretch your body outdoors",
        "Write a personal manifesto",
        "Explore a higher teaching",
        "Take one brave step",
        "Chant a Guru mantra today",
        "Wear yellow or saffron tones",
        "Visit a place of learning",
        "Teach a skill to someone",
        "Offer turmeric at a shrine",
        "Read ten pages of philosophy",
        "Book a future travel plan",
        "Laugh with old friends",
    ],
    capricorn: [
        "Review your long-term goals",
        "Build a clear schedule",
        "Honor a family tradition",
        "Invest in quality work",
        "Mentor a junior colleague",
        "Take a disciplined break",
        "Save toward a milestone",
        "Chant a Shani mantra daily",
        "Offer sesame oil at shrine",
        "Wear charcoal or deep blue",
        "Climb stairs over elevator",
        "Keep one commitment today",
        "Consolidate scattered bank accounts",
        "Write a five-year plan",
        "Eat a simple grounding meal",
    ],
    aquarius: [
        "Contribute to a cause",
        "Try an unconventional idea",
        "Connect with a friend",
        "Explore new technology today",
        "Share a visionary thought",
        "Support a community project",
        "Challenge an outdated system",
        "Chant a Shani mantra quietly",
        "Take a social-media detox hour",
        "Wear electric blue or silver",
        "Draft one bold proposal",
        "Volunteer for a local cause",
        "Study a new emerging field",
        "Reach out to an old mentor",
        "Journal your future vision",
    ],
    pisces: [
        "Meditate for ten minutes",
        "Create art freely today",
        "Trust your quiet intuition",
        "Help someone anonymously",
        "Record a vivid dream",
        "Spend time near water",
        "Listen to soulful music",
        "Chant Om Namo Narayanaya",
        "Wear sea-green or aquamarine",
        "Offer water at a tulsi",
        "Read one spiritual verse",
        "Practice slow mindful breathing",
        "Paint or sketch without judgment",
        "Donate quietly to charity",
        "Sleep early for vivid dreams",
    ],
};

const DONTS: Record<string, readonly string[]> = {
    aries: [
        "Avoid impulsive purchases",
        "Don't argue with elders",
        "Skip risky activities",
        "Avoid signing contracts hastily",
        "Don't suppress your feelings",
        "Stay clear of negative people",
        "Avoid picking unnecessary fights",
        "Don't skip your rest",
        "Avoid overcommitting in one burst",
        "Skip harsh words you\'ll regret",
        "Don't gamble on speculation",
        "Avoid speeding on the road",
        "Don't interrupt in meetings",
        "Skip late-night caffeine drinks",
        "Avoid comparing your pace constantly",
    ],
    taurus: [
        "Don't resist needed change",
        "Avoid overindulging in food",
        "Skip impulse luxury buys",
        "Don't hold stubborn grudges",
        "Avoid rushing key decisions",
        "Don't ignore subtle warnings",
        "Skip unnecessary financial risks",
        "Don't lend without terms",
        "Avoid late-night heavy meals",
        "Skip sudden drastic home changes",
        "Don't hoard old clutter",
        "Avoid mixing romance with business",
        "Don't argue when hungry",
        "Skip trends for short-lived appeal",
        "Avoid ignoring your body\'s signals",
    ],
    gemini: [
        "Don't spread yourself thin",
        "Avoid careless gossip today",
        "Skip unreliable shortcuts",
        "Don't overcommit your schedule",
        "Avoid unverified news sources",
        "Don't abandon tasks midway",
        "Skip confusing mixed signals",
        "Don't scroll during meals",
        "Avoid rash late-night texting",
        "Skip reading every notification instantly",
        "Don't promise what you\'ll forget",
        "Avoid excess caffeine jitters",
        "Don't debate for sport",
        "Skip shallow online arguments",
        "Avoid sharing unverified rumours",
    ],
    cancer: [
        "Avoid emotional overreactions today",
        "Don't dwell on old hurts",
        "Skip draining social situations",
        "Don't neglect self-care needs",
        "Avoid pessimistic company tonight",
        "Don't take criticism personally",
        "Skip impulsive home decisions",
        "Don't absorb others\' stress",
        "Avoid revisiting painful chats",
        "Skip late-night emotional calls",
        "Don't ignore property paperwork",
        "Avoid comparing your healing journey",
        "Don't snack through sadness",
        "Skip hoarding old letters",
        "Avoid sleeping with phone nearby",
    ],
    leo: [
        "Avoid seeking constant validation",
        "Don't overspend on display",
        "Skip dramatic confrontations today",
        "Don't ignore honest feedback",
        "Avoid arrogant posturing",
        "Don't neglect loved ones",
        "Skip attention-seeking detours",
        "Don't punish through silence",
        "Avoid impulsive luxury purchases",
        "Skip competing with friends\' wins",
        "Don't overextend your loyalty",
        "Avoid flattery disguised as friendship",
        "Don't overlook your rest",
        "Skip performing when exhausted",
        "Avoid speaking over quieter voices",
    ],
    virgo: [
        "Don't overanalyze every detail",
        "Avoid harsh self-criticism today",
        "Skip judgmental comments",
        "Don't obsess over perfection",
        "Avoid unnecessary worry spirals",
        "Don't skip meals while working",
        "Skip toxic comparison thinking",
        "Don't delay health checkups",
        "Avoid correcting everyone\'s small mistakes",
        "Skip overplanning into paralysis",
        "Don't snack on stress",
        "Avoid micromanaging your team",
        "Don't volunteer beyond capacity",
        "Skip endless editing loops",
        "Avoid caffeine after evening",
    ],
    libra: [
        "Avoid people-pleasing today",
        "Don't postpone tough decisions",
        "Skip unnecessary overthinking",
        "Don't avoid healthy conflict",
        "Avoid indecisive back-and-forth",
        "Don't compromise core values",
        "Skip excessive social spending",
        "Don't ignore written agreements",
        "Avoid flirting with complications",
        "Skip gossip at social gatherings",
        "Don't take sides hastily",
        "Avoid overspending on appearances",
        "Don't delay a necessary apology",
        "Skip vague promises to friends",
        "Avoid romantic texts after wine",
    ],
    scorpio: [
        "Avoid harboring deep resentment",
        "Don't manipulate for control",
        "Skip suspicious overthinking today",
        "Don't isolate from loved ones",
        "Avoid secretive money moves",
        "Don't react from jealousy",
        "Skip late-night arguments",
        "Don't stalk old profiles",
        "Avoid brooding in dark rooms",
        "Skip revenge-driven decisions",
        "Don't mix passion with deception",
        "Avoid over-reading between lines",
        "Don't cut ties impulsively",
        "Skip risky speculative investments",
        "Avoid hoarding emotional secrets",
    ],
    sagittarius: [
        "Avoid overpromising today",
        "Don't be blunt without tact",
        "Skip reckless financial bets",
        "Don't neglect small details",
        "Avoid restless wandering habits",
        "Don't preach unsolicited advice",
        "Skip half-planned travel",
        "Don't ignore visa paperwork",
        "Avoid judging different beliefs",
        "Skip impulsive job switches",
        "Don't chase every shiny idea",
        "Avoid boastful storytelling",
        "Don't overpack your calendar",
        "Skip unplanned long road trips",
        "Avoid investing in rumours",
    ],
    capricorn: [
        "Avoid overworking through exhaustion",
        "Don't be overly pessimistic",
        "Skip rigid emotional walls",
        "Don't dismiss creative ideas",
        "Avoid status-driven spending",
        "Don't neglect family time",
        "Skip harsh self-judgment",
        "Don't shortchange your sleep",
        "Avoid harsh words to juniors",
        "Skip endless productivity comparisons",
        "Don't bury feelings in work",
        "Avoid lending family without terms",
        "Don't postpone medical checkups",
        "Skip brooding over slow progress",
        "Avoid refusing help that\'s offered",
    ],
    aquarius: [
        "Avoid emotional detachment today",
        "Don't dismiss traditional wisdom",
        "Skip unnecessary rebellion",
        "Don't overcommit to groups",
        "Avoid isolating from loved ones",
        "Don't ignore practical needs",
        "Skip purely theoretical plans",
        "Don't argue with elders publicly",
        "Avoid endless online debates",
        "Skip crypto hype gambles",
        "Don't skip family occasions",
        "Avoid rebelling for the sake",
        "Don't overload on screens",
        "Skip buying gadgets impulsively",
        "Avoid promising revolutionary results overnight",
    ],
    pisces: [
        "Avoid escapist habits today",
        "Don't absorb others' stress",
        "Skip unclear financial commitments",
        "Don't ignore real deadlines",
        "Avoid self-pity spirals",
        "Don't forget to rest",
        "Skip draining people today",
        "Don't overpromise out of kindness",
        "Avoid excess sweets and alcohol",
        "Skip binge-watching late nights",
        "Don't lend without clarity",
        "Avoid mixing dreams with planning",
        "Don't neglect paperwork deadlines",
        "Skip endless daydream spirals",
        "Avoid emotionally heavy crowds",
    ],
};

// ---------------------------------------------------------------------------
// Lookup helpers
// ---------------------------------------------------------------------------

const signByKey: Map<string, HoroscopeSign> = new Map(
    zodiacSigns.map((s) => [s.sign, s])
);

function findSign(sign: string): HoroscopeSign | undefined {
    return signByKey.get(sign.toLowerCase());
}

// ---------------------------------------------------------------------------
// Public API
// ---------------------------------------------------------------------------

export function getSignFromDate(date: Date): string {
    const month = date.getMonth() + 1; // 1-12
    const day = date.getDate();

    if ((month === 3 && day >= 21) || (month === 4 && day <= 19)) return "aries";
    if ((month === 4 && day >= 20) || (month === 5 && day <= 20)) return "taurus";
    if ((month === 5 && day >= 21) || (month === 6 && day <= 20)) return "gemini";
    if ((month === 6 && day >= 21) || (month === 7 && day <= 22)) return "cancer";
    if ((month === 7 && day >= 23) || (month === 8 && day <= 22)) return "leo";
    if ((month === 8 && day >= 23) || (month === 9 && day <= 22)) return "virgo";
    if ((month === 9 && day >= 23) || (month === 10 && day <= 22)) return "libra";
    if ((month === 10 && day >= 23) || (month === 11 && day <= 21)) return "scorpio";
    if ((month === 11 && day >= 22) || (month === 12 && day <= 21)) return "sagittarius";
    if ((month === 12 && day >= 22) || (month === 1 && day <= 19)) return "capricorn";
    if ((month === 1 && day >= 20) || (month === 2 && day <= 18)) return "aquarius";
    return "pisces"; // feb 19 - mar 20
}

export function getHoroscopeData(
    sign: string,
    period: HoroscopePeriod = "daily",
    date: Date = new Date()
): HoroscopeData | null {
    const signKey = sign.toLowerCase();
    const signInfo = findSign(signKey);
    const readings = horoscopePool[signKey];

    if (!signInfo || !readings || readings.length === 0) {
        return null;
    }

    const seed = getPeriodSeed(signKey, period, date);

    const aspects: HoroscopeAspects = {
        love: seededRating(`${seed}:love`),
        career: seededRating(`${seed}:career`),
        health: seededRating(`${seed}:health`),
        finance: seededRating(`${seed}:finance`),
        family: seededRating(`${seed}:family`),
    };

    const overallRating = Math.round(
        (aspects.love +
            aspects.career +
            aspects.health +
            aspects.finance +
            aspects.family) /
            5
    );

    const overallIndex = hash(seed) % readings.length;
    const overall = readings[overallIndex];

    const luckyNumber = 1 + (hash(`${seed}:luckyNumber`) % 9); // 1-9
    const luckyColor = pickSeeded(LUCKY_COLORS[signKey], `${seed}:color`);
    const luckyTime = pickSeeded(LUCKY_TIMES, `${seed}:time`);
    const mood = pickSeeded(MOODS, `${seed}:mood`);

    const compatibleKey = pickSeeded(
        COMPATIBLE_SIGNS[signKey],
        `${seed}:compat`
    );
    const compatibleInfo = findSign(compatibleKey);
    const compatibleSign: HoroscopeCompatibleSign = compatibleInfo
        ? {
              sign: compatibleInfo.sign,
              name: compatibleInfo.name,
              symbol: compatibleInfo.symbol,
          }
        : { sign: compatibleKey, name: compatibleKey, symbol: "" };

    const ruler = RULERS[signKey];
    const gemstoneInfo = PLANET_GEMSTONES[ruler];
    const gemstone: HoroscopeGemstone = {
        name: gemstoneInfo.name,
        hindi: gemstoneInfo.hindi,
        shopCategory: "gemstones",
    };
    const mantra = PLANET_MANTRAS[ruler];

    const dos = pickN(DOS[signKey], 3, `${seed}:dos`);
    const donts = pickN(DONTS[signKey], 3, `${seed}:donts`);

    return {
        sign: signInfo.sign,
        name: signInfo.name,
        hindi: signInfo.hindi,
        symbol: signInfo.symbol,
        element: signInfo.element,
        period,
        periodLabel: getPeriodLabel(period),
        overall,
        overallRating,
        luckyNumber,
        luckyColor,
        luckyTime,
        compatibleSign,
        mood,
        ruler,
        aspects,
        dos,
        donts,
        mantra,
        gemstone,
    };
}

export function getRankedSigns(
    period: HoroscopePeriod = "daily",
    date: Date = new Date()
): Array<{ sign: HoroscopeSign; rating: number }> {
    return zodiacSigns
        .map((sign) => {
            const data = getHoroscopeData(sign.sign, period, date);
            return {
                sign,
                rating: data ? data.overallRating : 0,
            };
        })
        .sort((a, b) => b.rating - a.rating);
}

export async function getDailyHoroscope(
    sign: string
): Promise<{ success: boolean; text: string }> {
    const data = getHoroscopeData(sign, "daily", new Date());
    if (!data) {
        return {
            success: false,
            text: "Unable to fetch horoscope at this time. Please try again later.",
        };
    }
    return { success: true, text: data.overall };
}
