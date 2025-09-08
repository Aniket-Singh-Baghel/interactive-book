import React, { useState } from "react";
import {
  motion,
  useInView,
  useMotionValue,
  useTransform,
  animate,
} from "framer-motion";
import {
  Search,
  BookOpen,
  Milestone,
  Star,
} from "lucide-react";
import { FaHome, FaArrowLeft, FaArrowRight } from 'react-icons/fa'
import { Link, useNavigate } from "react-router-dom";


const content = {
    en: {
        home: "Home",
        hero_title: "You Are a Problem-Solver",
        hero_subtitle: "Developers are creators. They take ideas and turn them into reality. Your journey starts with curiosity and small steps.",
        discover_text: "Discover how developers think, from spotting everyday problems to crafting real-world solutions.",
        explore_text: "Explore inspiring journeys, practical examples, and step-by-step insights to ignite your own path in software development.",
        how_dev_thinks_title: "How a Developer Thinks",
        steps: [
            { title: "Find the Need", text: "Look for problems people face daily." },
            { title: "Plan the Steps", text: "Break the big idea into tiny tasks." },
            { title: "Try It Small", text: "Build & test a small piece first." },
            { title: "Improve Gently", text: "Fix mistakes and polish it up." },
        ],
        ideas_to_apps_title: "From Ideas to Real Apps",
        examples: [
            { title: "Bus Stop Board", need: "People don’t know when the bus will come.", plan: "Show next buses & minutes left.", build: "Take timings, compare with clock, display numbers." },
            { title: "Class Attendance", need: "Teachers spend time marking names.", plan: "Tap student’s name to mark present.", build: "List names, tap = mark, count total present." },
            { title: "Canteen Token", need: "Long lunch line is confusing.", plan: "Give token numbers and call in order.", build: "Issue token, show current number, beep next." },
        ],
        growth_rewards_title: "Your Growth = Your Rewards",
        salary_junior: "Junior",
        salary_mid: "Mid-Level",
        salary_senior: "Senior / Lead",
        per_year: "per year",
        journeys_title: "Real Journeys, Real Inspiration ✨",
        stories: [
            { who: "From Fashion to Engineer", note: "Started with an online fashion course but discovered a passion for problem-solving. Took a free intro to coding course, built small projects, and eventually became a developer while also teaching kids to code on weekends. Overcame the fear of switching careers and embraced continuous learning.", source: "Passion + practice works. Fear of starting is normal; persistence creates mastery." },
            { who: "From Landscaping to Dev", note: "Worked long hours in landscaping and often felt limited by routine work. Started building simple web projects after work, learning through trial and error. Gradually progressed to freelance gigs, then a full-time developer role. Learned that small consistent efforts compound into major breakthroughs.", source: "Learn by building. Every small project teaches a bigger lesson." },
            { who: "Internal Move to Tech", note: "Started in operations with zero coding experience. Curiosity drove them to learn tools and automation. Built small scripts to solve daily tasks, gradually getting noticed by the tech team. Transitioned into a tech role without formal CS education, proving passion and initiative matter more than credentials.", source: "Courage to begin is enough. Start small, keep building, the rest will follow." },
            { who: "Teacher to Software Developer", note: "Spent years teaching students, but always wanted to create tools that could impact more people. Learned Python and JavaScript at night, built educational apps, contributed to open-source projects, and eventually landed a dev role in edtech. Shows that transferable skills + persistence create new paths.", source: "Your past experience is an asset. Combine it with learning and passion." },
            { who: "Self-Taught College Dropout", note: "Dropped out of college due to financial challenges. Taught themselves coding via online resources and mentorship communities. Built a portfolio of projects, networked online, and secured a role in a startup. Proves that determination and self-learning can outperform formal education.", source: "Learning never stops. Your mindset defines your trajectory." },
            { who: "From Hobbyist to Innovator", note: "Started coding as a weekend hobby. Solved small automation problems for friends and family, then built apps to streamline local businesses. Their projects caught attention online, leading to collaborations and eventually a full-time software development career.", source: "Start with curiosity, solve real problems, and opportunities will follow." },
        ],
        journey: "Journey:",
        lesson: "Lesson:",
        need_label: "Need:",
        plan_label: "Plan:",
        build_label: "Build:",
        previous: "Previous",
        next: "Next",
    },
    hi: {
        home: "होम",
        hero_title: "आप एक समस्या-समाधानकर्ता हैं",
        hero_subtitle: "डेवलपर्स निर्माता होते हैं। वे विचारों को हकीकत में बदलते हैं। आपकी यात्रा जिज्ञासा और छोटे कदमों से शुरू होती है।",
        discover_text: "जानें कि डेवलपर्स कैसे सोचते हैं, रोजमर्रा की समस्याओं को पहचानने से लेकर वास्तविक दुनिया के समाधान तैयार करने तक।",
        explore_text: "सॉफ्टवेयर डेवलपमेंट में अपना रास्ता रोशन करने के लिए प्रेरणादायक यात्राएं, व्यावहारिक उदाहरण और चरण-दर-चरण अंतर्दृष्टि का अन्वेषण करें।",
        how_dev_thinks_title: "एक डेवलपर कैसे सोचता है",
        steps: [
            { title: "ज़रूरत ढूंढें", text: "लोगों द्वारा प्रतिदिन सामना की जाने वाली समस्याओं की तलाश करें।" },
            { title: "कदमों की योजना बनाएं", text: "बड़े विचार को छोटे-छोटे कार्यों में तोड़ें।" },
            { title: "छोटे से प्रयास करें", text: "पहले एक छोटा सा हिस्सा बनाएं और उसका परीक्षण करें।" },
            { title: "धीरे-धीरे सुधार करें", text: "गलतियों को सुधारें और उसे बेहतर बनाएं।" },
        ],
        ideas_to_apps_title: "विचारों से वास्तविक ऐप्स तक",
        examples: [
            { title: "बस स्टॉप बोर्ड", need: "लोगों को नहीं पता कि बस कब आएगी।", plan: "अगली बसें और बचे हुए मिनट दिखाएं।", build: "समय लें, घड़ी से तुलना करें, नंबर प्रदर्शित करें।" },
            { title: "कक्षा उपस्थिति", need: "शिक्षक नाम अंकित करने में समय व्यतीत करते हैं।", plan: "उपस्थित चिह्नित करने के लिए छात्र के नाम पर टैप करें।", build: "नामों की सूची बनाएं, टैप = चिह्न, कुल उपस्थित की गणना करें।" },
            { title: "कैंटीन टोकन", need: "लंबी दोपहर के भोजन की लाइन भ्रमित करने वाली है।", plan: "टोकन नंबर दें और क्रम में बुलाएं।", build: "टोकन जारी करें, वर्तमान नंबर दिखाएं, अगले के लिए बीप करें।" },
        ],
        growth_rewards_title: "आपका विकास = आपके पुरस्कार",
        salary_junior: "जूनियर",
        salary_mid: "मिड-लेवल",
        salary_senior: "सीनियर / लीड",
        per_year: "प्रति वर्ष",
        journeys_title: "वास्तविक यात्राएं, वास्तविक प्रेरणा ✨",
        stories: [
            { who: "फैशन से इंजीनियर तक", note: "एक ऑनलाइन फैशन कोर्स से शुरुआत की, लेकिन समस्या-समाधान के प्रति जुनून की खोज की। एक मुफ्त कोडिंग कोर्स किया, छोटी परियोजनाएं बनाईं, और अंततः एक डेवलपर बन गए।", source: "जुनून + अभ्यास काम करता है। शुरू करने का डर सामान्य है; दृढ़ता से महारत हासिल होती है।" },
            { who: "बागवानी से देव तक", note: "बागवानी में लंबे समय तक काम किया और अक्सर नियमित काम से सीमित महसूस किया। काम के बाद सरल वेब परियोजनाएं बनाना शुरू किया, परीक्षण और त्रुटि के माध्यम से सीखा।", source: "निर्माण करके सीखें। हर छोटी परियोजना एक बड़ा सबक सिखाती है।" },
            { who: "टेक में आंतरिक कदम", note: "शून्य कोडिंग अनुभव के साथ संचालन में शुरुआत की। जिज्ञासा ने उन्हें उपकरण और स्वचालन सीखने के लिए प्रेरित किया।", source: "शुरू करने का साहस ही काफी है। छोटा शुरू करें, निर्माण करते रहें, बाकी सब अपने आप हो जाएगा।" },
            { who: "शिक्षक से सॉफ्टवेयर डेवलपर तक", note: "वर्षों तक छात्रों को पढ़ाया, लेकिन हमेशा ऐसे उपकरण बनाना चाहते थे जो अधिक लोगों को प्रभावित कर सकें। रात में पायथन और जावास्क्रिप्ट सीखा।", source: "आपका पिछला अनुभव एक संपत्ति है। इसे सीखने और जुनून के साथ मिलाएं।" },
            { who: "स्व-शिक्षित कॉलेज ड्रॉपआउट", note: "वित्तीय चुनौतियों के कारण कॉलेज छोड़ दिया। ऑनलाइन संसाधनों और मेंटरशिप समुदायों के माध्यम से खुद को कोडिंग सिखाई।", source: "सीखना कभी नहीं रुकता। आपकी मानसिकता आपके प्रक्षेपवक्र को परिभाषित करती है।" },
            { who: "शौकिया से प्रर्वतक तक", note: "एक सप्ताहांत शौक के रूप में कोडिंग शुरू की। दोस्तों और परिवार के लिए छोटी स्वचालन समस्याओं को हल किया, फिर स्थानीय व्यवसायों को सुव्यवस्थित करने के लिए ऐप बनाए।", source: "जिज्ञासा से शुरू करें, वास्तविक समस्याओं को हल करें, और अवसर मिलेंगे।" },
        ],
        journey: "यात्रा:",
        lesson: "सबक:",
        need_label: "ज़रूरत:",
        plan_label: "योजना:",
        build_label: "निर्माण:",
        previous: "पिछला",
        next: "अगला",
    }
};


const AnimatedDeveloperMindIcon = () => {
  return (
    <motion.svg
      viewBox="40 40 160 110"
      width="250"
      height="auto"
      className="mx-auto"
      initial="hidden"
      animate="visible"
      preserveAspectRatio="xMidYMid meet"
    >
      <motion.rect x="90" y="100" width="84" height="12" fill="#4B5563" rx="2" />
      <motion.ellipse cx="135" cy="92" rx="14" ry="7" fill="#FCD34D" stroke="#B45309" />
      <motion.rect x="123" y="85" width="24" height="10" rx="5" fill="#FCD34D" stroke="#B45309" />
      {[...Array(5)].map((_, i) => (
        <motion.path
          key={`cup-${i}`}
          d={`M135 ${92 - i * 2} C${133 - i} ${85 - i * 3}, ${137 + i} ${80 - i * 3}, 135 ${72 - i * 4}`}
          stroke="#D1D5DB" strokeWidth={Math.random() * 2 + 1} strokeOpacity={Math.random() * 0.5 + 0.5} fill="none"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: [0, 1, 0], y: [-5, -25, -50] }}
          transition={{ duration: 3 + Math.random(), delay: i * 0.3, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}
      {[...Array(4)].map((_, i) => (
        <motion.path
          key={`dev-${i}`}
          d={`M140 ${90 - i * 2} C${138 - i} ${85 - i * 2}, ${142 + i} ${78 - i * 2}, 138 ${70 - i * 3}`}
          stroke="#D1D5DB" strokeWidth={Math.random() * 1.5 + 0.5} strokeOpacity={Math.random() * 0.4 + 0.4} fill="none"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: [0, 1, 0], y: [-10, -30, -60] }}
          transition={{ duration: 3 + Math.random(), delay: i * 0.4, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}
      <motion.rect x="38" y="110" width="44" height="10" fill="#6B7280" rx="2" />
      <motion.rect x="50" y="120" width="20" height="10" fill="#6B7280" rx="2" />
      <motion.circle cx="60" cy="60" r="16" fill="#FCA5A5" stroke="#78350F" strokeWidth="1.5" />
      <motion.rect x="52" y="56" width="8" height="6" rx="2" stroke="#111827" fill="none" />
      <motion.rect x="60" y="56" width="8" height="6" rx="2" stroke="#111827" fill="none" />
      <motion.line x1="60" y1="59" x2="60" y2="59" stroke="#111827" />
      <motion.rect x="48" y="74" width="24" height="32" rx="5" fill="#3B82F6" />
      <motion.rect x="40" y="78" width="8" height="18" rx="3" fill="#3B82F6" animate={{ rotate: [0, -15, 0, 15, 0] }} transition={{ duration: 1.5, repeat: Infinity }} />
      <motion.rect x="72" y="78" width="8" height="18" rx="3" fill="#3B82F6" animate={{ rotate: [0, 15, 0, -15, 0] }} transition={{ duration: 1.5, repeat: Infinity, delay: 0.75 }} />
      <motion.rect x="44" y="106" width="12" height="22" fill="#2563EB" rx="3" />
      <motion.rect x="64" y="106" width="12" height="22" fill="#2563EB" rx="3" />
      <motion.rect x="45" y="90" width="30" height="18" fill="#9CA3AF" stroke="#374151" rx="2" />
      <motion.rect x="45" y="90" width="30" height="2" fill="#1F2937" />
      {[...Array(4)].map((_, i) => (
        <motion.rect
          key={i} x="50" y={95 + i * 3} width={20} height="2"
          fill={i % 2 === 0 ? "#10B981" : "#F59E0B"}
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 1, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.5 }}
        />
      ))}
    </motion.svg>
  );
};

const MorphBlob = () => (
  <motion.div
    className="absolute -top-32 -left-32 w-96 h-96 bg-gradient-to-r from-cyan-500/30 to-indigo-500/30 rounded-full blur-3xl"
    animate={{ scale: [1, 1.2, 1], rotate: [0, 30, -30, 0] }}
    transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
  />
);

const stepsIcons = [<Search className="w-8 h-8" />, <BookOpen className="w-8 h-8" />, <Milestone className="w-8 h-8" />, <Star className="w-8 h-8" />];

const AnimatedCounter = ({ to }) => {
  const count = useMotionValue(0);
  const rounded = useTransform(count, Math.round);
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true });

  React.useEffect(() => {
    if (isInView) {
      animate(count, to, { duration: 2, ease: "easeOut" });
    }
  }, [isInView, to, count]);

  return <motion.span ref={ref}>{rounded}</motion.span>;
};

const DeveloperHybridPage = () => {
    const [lang, setLang] = useState('en');
    const navigate = useNavigate();
    const t = content[lang];

    return (
        <div className="relative min-h-screen bg-gradient-to-b from-slate-900 via-indigo-950 to-slate-900 text-gray-200 font-sans overflow-hidden">
        <MorphBlob />
        <div className="flex items-center justify-between p-4 sm:p-6 lg:p-8">
            <Link
                to="/parts/prt2"
                className="inline-flex items-center ml-8 px-5 py-2 rounded-full border border-cyan-400/50 text-cyan-300 font-semibold transition-all bg-cyan-500/10 hover:bg-cyan-500/20 hover:shadow-[0_0_20px_rgba(34,211,238,0.6)] backdrop-blur-md"
            >
                <FaHome className="mr-2 text-lg text-cyan-300" />
                {t.home}
            </Link>
            <div className="flex space-x-2">
                <button
                    onClick={() => setLang("en")}
                    className={`px-4 py-2 rounded-full text-sm font-semibold transition-all ${lang === 'en' ? 'bg-cyan-400 text-slate-900 shadow-lg shadow-cyan-400/30' : 'bg-slate-800/50 text-gray-300 border border-slate-700 hover:bg-slate-700'}`}
                >
                    EN
                </button>
                <button
                    onClick={() => setLang("hi")}
                    className={`px-4 py-2 rounded-full text-sm font-semibold transition-all ${lang === 'hi' ? 'bg-cyan-400 text-slate-900 shadow-lg shadow-cyan-400/30' : 'bg-slate-800/50 text-gray-300 border border-slate-700 hover:bg-slate-700'}`}
                >
                    हिं
                </button>
            </div>
        </div>
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-2">
            <motion.header className="text-center py-10">
            <div className="relative flex justify-center items-center">
                <AnimatedDeveloperMindIcon />
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-7xl font-extrabold">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-emerald-400 to-purple-400">
                {t.hero_title}
                </span>
            </h1>
            <motion.p className="max-w-2xl mx-auto text-lg md:text-xl text-gray-400 mt-4">
                {t.hero_subtitle}
            </motion.p>
            </motion.header>
            <div className="max-w-2xl mx-auto mt-4 space-y-4 text-gray-300 text-lg">
            <div className="flex items-start gap-3">
                <span className="mt-1 text-yellow-400 text-xl">🚀</span>
                <p dangerouslySetInnerHTML={{ __html: t.discover_text.replace(/developers think/g, '<span class="font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-emerald-400 to-purple-400">developers think</span>').replace(/everyday problems/g, '<span class="font-semibold text-yellow-400">everyday problems</span>').replace(/real-world solutions/g, '<span class="font-bold text-green-400">real-world solutions</span>') }} />
            </div>

            <div className="flex items-start gap-3">
                <span className="mt-1 text-cyan-400 text-xl">💻</span>
                <p dangerouslySetInnerHTML={{ __html: t.explore_text.replace(/inspiring journeys/g, '<span class="font-bold text-purple-400">inspiring journeys</span>').replace(/practical examples/g, '<span class="font-semibold text-cyan-400">practical examples</span>').replace(/insights/g, '<span class="font-bold text-emerald-400">insights</span>').replace(/software development/g, '<span class="font-bold text-yellow-400">software development</span>') }} />
            </div>
            </div>

            <section className="my-16 sm:my-20">
            <h2 className="text-center text-3xl md:text-4xl font-bold mb-12">
                {t.how_dev_thinks_title}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
                {t.steps.map((step, i) => (
                <motion.div
                    key={step.title}
                    className="bg-[#161B22] p-6 rounded-xl border border-gray-800 text-center"
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.2 }}
                >
                    <div className="flex justify-center items-center w-20 h-20 rounded-full bg-gray-800/50 mx-auto mb-4 text-cyan-400">
                    {stepsIcons[i]}
                    </div>
                    <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                    <p className="text-gray-400">{step.text}</p>
                </motion.div>
                ))}
            </div>
            </section>

            <section className="my-16 sm:my-20">
            <h2 className="text-center text-3xl md:text-4xl font-bold mb-12">
                {t.ideas_to_apps_title}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
                {t.examples.map((ex, i) => (
                <motion.div
                    key={ex.title}
                    className="bg-[#161B22] p-6 rounded-xl border border-gray-800"
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ delay: i * 0.2 }}
                >
                    <h3 className="text-xl font-bold text-emerald-400 mb-4">
                    {ex.title}
                    </h3>
                    <p><b className="text-gray-300">{t.need_label}</b> {ex.need}</p>
                    <p><b className="text-gray-300">{t.plan_label}</b> {ex.plan}</p>
                    <p><b className="text-gray-300">{t.build_label}</b> {ex.build}</p>
                </motion.div>
                ))}
            </div>
            </section>

            <section className="my-16 sm:my-20">
            <h2 className="text-center text-3xl md:text-4xl font-bold mb-12">
                {t.growth_rewards_title}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                <motion.div className="bg-[#161B22] p-6 sm:p-8 rounded-xl border border-gray-800">
                <h3 className="text-xl font-bold">{t.salary_junior}</h3>
                <p className="text-4xl font-bold text-emerald-400">
                    ₹<AnimatedCounter to={3} />–<AnimatedCounter to={10} /> L
                </p>
                <p className="text-sm text-gray-400">{t.per_year}</p>
                </motion.div>
                <motion.div className="bg-[#161B22] p-6 sm:p-8 rounded-xl border-2 border-purple-500 scale-105 shadow-lg shadow-purple-500/20">
                <h3 className="text-xl font-bold">{t.salary_mid}</h3>
                <p className="text-5xl font-bold text-purple-400">
                    ₹<AnimatedCounter to={10} />–<AnimatedCounter to={25} /> L
                </p>
                <p className="text-sm text-gray-400">{t.per_year}</p>
                </motion.div>
                <motion.div className="bg-[#161B22] p-6 sm:p-8 rounded-xl border border-gray-800">
                <h3 className="text-xl font-bold">{t.salary_senior}</h3>
                <p className="text-4xl font-bold text-cyan-400">
                    ₹<AnimatedCounter to={25} />–<AnimatedCounter to={80} /> L+
                </p>
                <p className="text-sm text-gray-400">{t.per_year}</p>
                </motion.div>
            </div>
            </section>

            <section className="my-16 sm:my-20">
            <h2 className="text-center text-3xl md:text-4xl font-bold mb-12">
                {t.journeys_title}
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                {t.stories.map((s, i) => (
                <motion.div
                    key={s.who}
                    className="bg-[#161B22] p-6 rounded-xl border border-gray-800 shadow-lg hover:shadow-cyan-500/30"
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.2, type: "spring", stiffness: 80 }}
                >
                    <h3 className="font-bold text-center text-emerald-400 text-lg md:text-xl mb-2 decoration-sky-400 decoration-2">
                    {s.who} 💡
                    </h3>

                    <p className="text-gray-300 my-2">
                    <span className="font-semibold text-pink-600">{t.journey}</span> {s.note}
                    </p>

                    <p className="text-gray-300 my-2">
                    <span className="font-semibold text-yellow-400">{t.lesson}</span> {s.source}
                    </p>

                    <div className="mt-4 flex gap-2 justify-center">
                    <span>🚀</span>
                    <span>💻</span>
                    <span>🎯</span>
                    </div>
                </motion.div>
                ))}
            </div>
            </section>

            <div className="flex justify-between items-center my-8 p-4 bg-white/5 border border-white/10 rounded-xl backdrop-blur-md">
            <button
                onClick={() => navigate('/parts/prt2')}
                className="flex items-center gap-2 px-4 py-2 rounded-lg border border-cyan-400/50 text-cyan-300 font-medium transition-all bg-cyan-500/10 hover:bg-cyan-500/20 hover:shadow-[0_0_15px_rgba(34,211,238,0.6)]"
            >
                <FaArrowLeft className="text-cyan-300" />
                {t.previous}
            </button>

            <button
                onClick={() => navigate('/module2/sdlc')}
                className="flex items-center gap-2 px-4 py-2 rounded-lg border border-fuchsia-400/50 text-fuchsia-300 font-medium transition-all bg-fuchsia-500/10 hover:bg-fuchsia-500/20 hover:shadow-[0_0_15px_rgba(217,70,239,0.6)]"
            >
                {t.next}
                <FaArrowRight className="text-fuchsia-300" />
            </button>
            </div>
        </div>
        </div>
    );
};

export default DeveloperHybridPage;
