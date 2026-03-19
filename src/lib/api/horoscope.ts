// Local horoscope content generator
// Uses date-based deterministic selection so readings change daily but are consistent within a day

const horoscopePool: Record<string, string[]> = {
    aries: [
        "Today brings a surge of energy and motivation, dear Aries. Channel your natural leadership abilities into a project that matters to you. A conversation with someone close could reveal an unexpected opportunity. Trust your instincts when making decisions — your gut feeling is remarkably accurate right now. Physical activity will help you stay centered and focused.",
        "The stars encourage you to slow down and reflect before acting today, Aries. While your impulse is to charge ahead, patience will serve you better. A financial matter requires careful attention — review the details before committing. Your creative energy is especially strong this evening, making it a great time for artistic pursuits or brainstorming sessions.",
        "An exciting opportunity may present itself today, Aries. Your confidence and charm are at their peak, making this an excellent time for networking or important conversations. However, be mindful of others' feelings — your directness, while admired, could unintentionally cause friction. A surprise message from an old friend could brighten your day.",
        "Today is perfect for setting new intentions, Aries. The planetary alignment supports fresh starts and bold moves. Focus on what truly matters to you rather than getting caught up in others' expectations. A health-related insight could lead to positive lifestyle changes. Evening hours favor romantic connections and deep conversations.",
        "Your determination is your superpower today, Aries. Challenges that seemed overwhelming yesterday will feel manageable now. A mentor or authority figure may offer guidance that reshapes your perspective. Financial prospects look favorable — consider exploring new income streams. Remember to balance ambition with rest for optimal results.",
    ],
    taurus: [
        "Stability and comfort are your themes today, dear Taurus. Focus on strengthening the foundations of your life — whether that means organizing your home, reviewing your finances, or nurturing important relationships. A creative project you've been putting off deserves your attention now. Trust the process and remember that good things take time.",
        "The stars highlight your practical nature today, Taurus. Use your grounded energy to tackle tasks that require attention to detail. A conversation about money or resources could lead to a profitable arrangement. Your sensual side is heightened — indulge in good food, nature walks, or artistic appreciation.",
        "Today calls for patience and persistence, Taurus. A situation that has been developing slowly is about to reach a turning point. Your loyalty to friends and family is noticed and appreciated. Consider investing in your personal growth through learning or skill development. Evening hours bring peace and contentment.",
        "Your intuition is especially strong today, Taurus. Pay attention to subtle signals in your environment and relationships. A practical solution to a longstanding problem may suddenly become clear. Financial matters favor conservative approaches. Spend time in nature to recharge your earth energy.",
        "Romance and creativity take center stage today, Taurus. Whether single or attached, your magnetic charm attracts positive attention. A work project benefits from your methodical approach — don't rush the process. Self-care rituals will be especially nourishing now. Trust your values when facing a difficult decision.",
    ],
    gemini: [
        "Your communication skills shine brightly today, Gemini. Express yourself freely — your words carry extra weight and influence. A stimulating conversation could spark a brilliant idea or open new doors. Stay curious and open to learning from unexpected sources. Social connections made today have the potential for lasting significance.",
        "Today brings mental clarity and quick thinking, Gemini. You'll find it easy to multitask and juggle various responsibilities. A sibling or close friend may need your advice — your perspective will be invaluable. Creative writing or journaling could lead to important self-discoveries. Embrace variety and keep your schedule flexible.",
        "The stars encourage networking and social engagement today, Gemini. Your natural wit and charm make you the life of any gathering. A piece of information you receive could change your plans in a positive way. Be mindful of overcommitting — choose quality over quantity in your engagements. Reading or studying brings particular satisfaction.",
        "Your adaptable nature serves you well today, Gemini. Changes in plans that might frustrate others will feel exciting to you. A technology-related opportunity deserves exploration. Your ideas are flowing freely — capture them before they slip away. Evening conversations with loved ones bring warmth and understanding.",
        "Intellectual pursuits are highly favored today, Gemini. Whether you're researching, studying, or teaching, your mind is sharp and receptive. Travel plans or short trips could lead to memorable experiences. A financial decision benefits from thorough analysis rather than impulse. Your dual nature helps you see both sides of any situation.",
    ],
    cancer: [
        "Home and family take priority today, dear Cancer. Your nurturing instincts are heightened — use them to create harmony in your closest relationships. A nostalgic memory could bring clarity to a current situation. Trust your emotional intelligence when navigating complex dynamics. Evening hours are perfect for cooking, decorating, or family gatherings.",
        "The stars illuminate your emotional depth today, Cancer. Allow yourself to feel fully without judgment. A creative outlet — painting, music, or writing — can help process complex feelings. Financial security gets a boost through careful planning. A maternal figure in your life may offer wisdom worth listening to.",
        "Today favors domestic improvements and self-care, Cancer. Reorganizing your living space can shift your mental energy in positive ways. A heartfelt conversation with a loved one strengthens your bond. Your protective nature is admired, but remember to also let others take care of you sometimes. Comfort food and cozy evenings restore your spirit.",
        "Your intuition is remarkably accurate today, Cancer. Trust those gut feelings, especially regarding people's true intentions. A real estate or property matter may require attention. Your compassionate nature draws others to you for support — set healthy boundaries where needed. The moon's energy especially favors meditation and reflection.",
        "Emotional connections deepen today, Cancer. Whether in romance, friendship, or family, your ability to understand others creates meaningful moments. A career opportunity may arise from an unexpected direction. Financial matters benefit from your cautious, well-planned approach. Create a sanctuary at home where you can recharge.",
    ],
    leo: [
        "Your natural radiance shines even brighter today, Leo. Step into the spotlight — opportunities for recognition and leadership await. A creative project you've been developing is ready to be shared with the world. Generosity toward others returns to you tenfold. Romance and playful energy fill the evening hours.",
        "Today empowers your creative expression, Leo. Whether through art, performance, or simply your personal style, let your unique light shine. A child or younger person may inspire you in unexpected ways. Financial ventures that align with your passions have strong potential. Your warmth and loyalty strengthen important friendships.",
        "The stars highlight your leadership qualities today, Leo. Others look to you for direction and inspiration — don't shy away from this role. A bold decision could lead to significant progress in your career. Physical activities, especially those involving competition or performance, are highly favored. Your confidence is contagious.",
        "Romance and self-expression are your themes today, Leo. Your magnetic personality attracts admirers and opportunities alike. A creative block dissolves as inspiration flows freely. Be generous with praise and recognition of others' efforts. Social gatherings or celebrations bring joy and meaningful connections.",
        "Today calls for courage and authenticity, Leo. Being true to yourself — even when it's challenging — leads to breakthrough moments. A professional opportunity aligns with your long-term goals. Your protective nature ensures those you love feel safe and valued. Golden hour brings particularly powerful creative energy.",
    ],
    virgo: [
        "Your analytical mind is especially sharp today, Virgo. Use this clarity to organize, plan, and solve problems that have been lingering. Health and wellness routines started today will have lasting benefits. A colleague or friend appreciates your practical advice. Evening hours favor quiet reflection and personal development.",
        "Attention to detail is your superpower today, Virgo. Tasks that require precision and care will flow effortlessly. A health-related discovery or routine adjustment improves your well-being. Your service-oriented nature helps someone in need — this kindness creates positive ripple effects. Journaling brings valuable insights.",
        "The stars favor practical improvements today, Virgo. Decluttering — whether physical spaces or mental baggage — brings refreshing clarity. A work project benefits from your meticulous approach. Dietary changes or new exercise routines show promising results. Your grounded wisdom helps a friend navigate a complex situation.",
        "Today brings opportunities for growth through service, Virgo. Your natural desire to help others aligns with meaningful causes or projects. Communication is clear and productive — important emails or conversations achieve desired outcomes. A nature walk or garden time restores your earth element energy.",
        "Your perfectionist tendencies serve you well today, Virgo — channel them productively rather than critically. A systematic approach to a complex task yields impressive results. Health consciousness leads to positive choices. A mentor recognizes your dedication and offers valuable guidance. Self-care isn't selfish — prioritize your needs.",
    ],
    libra: [
        "Balance and harmony are your guiding stars today, Libra. Relationships take center stage — meaningful conversations strengthen bonds and resolve misunderstandings. Your aesthetic sense is heightened, making this an excellent day for decorating, shopping, or creative projects. A diplomatic approach to a conflict earns respect and positive outcomes.",
        "The stars highlight partnership and collaboration today, Libra. Whether in romance, business, or friendship, joint ventures are especially favored. Your natural charm and grace make negotiations smooth and productive. Art and beauty inspire you — visit a gallery, listen to music, or beautify your surroundings.",
        "Today calls for honest self-reflection, Libra. While you naturally seek external harmony, inner balance is equally important. A decision you've been weighing finds clarity when you trust your heart alongside your head. Social events bring opportunities for meaningful connections. Justice and fairness matter — stand up for what's right.",
        "Your diplomatic skills are in high demand today, Libra. Others seek your balanced perspective on complex situations. A romantic gesture — given or received — strengthens an important relationship. Creative collaborations produce beautiful results. Balance social time with quiet moments of self-care.",
        "Harmony in relationships brings you joy today, Libra. A compromise or agreement reached now will have lasting positive effects. Your sense of style and aesthetics impresses others. Legal or contractual matters are favorably aspected. Evening hours bring romantic energy and opportunities for deeper connection.",
    ],
    scorpio: [
        "Transformation and depth define your day, Scorpio. Your penetrating insight cuts through surface appearances to reveal hidden truths. A financial matter benefits from your strategic thinking. Emotional intensity can be channeled into creative or passionate pursuits. Trust the process of change — what ends makes room for something better.",
        "The stars amplify your investigative nature today, Scorpio. Research, analysis, and deep dives into any subject yield valuable discoveries. A secret or hidden information comes to light — use this knowledge wisely. Your magnetic presence draws others into your orbit. Embrace vulnerability as strength.",
        "Today favors intense focus and determination, Scorpio. Your ability to concentrate deeply gives you an edge in challenging tasks. A joint financial matter or shared resource requires attention. Your transformative energy inspires others to face their own shadows. Meditation or therapy brings powerful breakthroughs.",
        "Power and influence are your themes today, Scorpio. Your natural intensity commands respect and attention. A mystery or puzzle that's been nagging you finds resolution. Financial strategies developed now have strong long-term potential. Your loyal nature deepens trust in your closest relationships.",
        "Emotional depth and passion guide you today, Scorpio. Channel your powerful feelings into meaningful action rather than internal turmoil. A research project or investigation reaches an important milestone. Trust your ability to regenerate and transform any situation. Intimate conversations bring healing and understanding.",
    ],
    sagittarius: [
        "Adventure and optimism fill your day, Sagittarius. The stars encourage exploration — whether through travel, learning, or philosophical inquiry. Your enthusiasm is contagious and inspires those around you. A teaching or mentoring opportunity allows you to share your wisdom. Keep your eyes open for signs pointing toward your next great journey.",
        "Today brings expansion and growth, Sagittarius. Your natural optimism is well-placed — good fortune favors bold moves. An educational opportunity or cultural experience broadens your perspective. Long-distance communication brings welcome news. Your philosophical nature helps others see the bigger picture.",
        "The stars highlight your adventurous spirit today, Sagittarius. Whether planning a trip, starting a course, or exploring new ideas, your quest for knowledge is rewarded. A foreign connection or cultural exchange brings unexpected benefits. Your honesty and directness are appreciated, even when the truth is complex.",
        "Freedom and truth are your guiding principles today, Sagittarius. Resist anything that feels constraining or inauthentic. A spiritual practice or philosophical discussion brings profound insights. Travel plans crystallize into exciting possibilities. Your generosity of spirit attracts abundance in all forms.",
        "Your jovial nature brightens everyone's day, Sagittarius. Humor and wisdom combined make you an excellent communicator. Legal or academic matters proceed favorably. A spontaneous adventure leads to memorable experiences. Keep your long-term vision clear while enjoying the present moment.",
    ],
    capricorn: [
        "Ambition and discipline drive your success today, Capricorn. Long-term plans take significant steps forward through your dedicated effort. Authority figures recognize your competence and reliability. A financial strategy you've been developing shows promising results. Balance work with rest — sustainable progress is your goal.",
        "The stars support your career ambitions today, Capricorn. Your natural authority and organizational skills impress those in positions of power. A structured approach to a complex project yields measurable results. Property or real estate matters are favorably aspected. Remember that true success includes personal fulfillment.",
        "Today rewards patience and perseverance, Capricorn. The mountain you've been climbing is closer to its summit than you realize. A mentor or elder offers guidance rooted in experience. Financial planning and investment decisions are especially well-aspected. Your dry wit lightens serious moments.",
        "Responsibility and achievement are your themes today, Capricorn. Others depend on your reliability and follow-through. A professional milestone approaches — prepare to celebrate your hard work. Traditional approaches prove effective in resolving modern challenges. Family legacy and heritage provide grounding inspiration.",
        "Your practical wisdom shines today, Capricorn. Complex problems yield to your methodical approach. A career opportunity aligns with your long-term goals and values. Financial discipline now creates future abundance. Take time to acknowledge how far you've come — you deserve recognition.",
    ],
    aquarius: [
        "Innovation and originality mark your day, Aquarius. Your unique perspective on problems leads to breakthrough solutions. Community involvement or group activities bring satisfaction and meaningful connections. Technology plays a favorable role in your endeavors. Embrace your individuality — the world needs your visionary thinking.",
        "The stars highlight your humanitarian nature today, Aquarius. A cause close to your heart gains momentum through your involvement. Friendships and social networks provide support and opportunities. Your innovative thinking solves a problem that conventional approaches couldn't. Digital projects or tech-related ventures are especially favored.",
        "Today celebrates your unconventional approach, Aquarius. Ideas that seemed too bold yesterday now find receptive audiences. A group project or community effort achieves a significant milestone. Your ability to see the future helps you prepare while others react. Scientific or technological discoveries capture your imagination.",
        "Freedom and progress guide your actions today, Aquarius. Challenge outdated systems and propose better alternatives. A friendship deepens through shared ideals and intellectual connection. Technology simplifies a complex task. Your detached perspective helps others gain clarity on emotional situations.",
        "Your visionary nature is especially powerful today, Aquarius. Ideas and insights that come to you now have the potential to create real change. Collaborative efforts multiply your impact. A surprise encounter with a like-minded individual sparks inspiration. Honor your need for independence while staying connected to your community.",
    ],
    pisces: [
        "Intuition and compassion guide your path today, Pisces. Your psychic sensitivity is heightened — pay attention to dreams, symbols, and subtle feelings. Creative expression flows effortlessly, making this an ideal day for artistic pursuits. A spiritual practice or meditation brings deep peace. Your empathy helps heal someone in need.",
        "The stars amplify your creative and spiritual gifts today, Pisces. Music, art, poetry, or dance become powerful channels for expression. A compassionate act creates ripple effects of kindness. Boundaries with energy-draining situations are important — protect your sensitive nature. Water-related activities bring refreshment and clarity.",
        "Today favors imagination and faith, Pisces. Trust in the unseen forces guiding your path, even when logic can't explain them. A charitable cause or volunteer opportunity brings deep fulfillment. Your artistic talents receive recognition or encouragement. Dreams carry important messages — keep a journal by your bed.",
        "Your empathetic nature is your greatest gift today, Pisces. Others are drawn to your understanding and non-judgmental presence. A creative project reaches a beautiful completion. Spiritual practices deepen your connection to the divine. Financial intuition guides you toward wise choices. Rest and solitude recharge your sensitive soul.",
        "Mystical and magical energy surrounds you today, Pisces. Your connection to the unseen world is especially strong. A creative inspiration arrives seemingly from nowhere — capture it immediately. Forgiveness and letting go of past hurts brings liberation. Your gentle strength inspires others to open their hearts.",
    ],
};

function getDayOfYear(): number {
    const now = new Date();
    const start = new Date(now.getFullYear(), 0, 0);
    const diff = now.getTime() - start.getTime();
    return Math.floor(diff / (1000 * 60 * 60 * 24));
}

export async function getDailyHoroscope(
    sign: string
): Promise<{ success: boolean; text: string }> {
    const signKey = sign.toLowerCase();
    const readings = horoscopePool[signKey];

    if (!readings || readings.length === 0) {
        return {
            success: false,
            text: "Unable to fetch horoscope at this time. Please try again later.",
        };
    }

    // Pick a reading based on day of year so it changes daily but stays consistent throughout the day
    const dayOfYear = getDayOfYear();
    const index = dayOfYear % readings.length;

    return { success: true, text: readings[index] };
}
