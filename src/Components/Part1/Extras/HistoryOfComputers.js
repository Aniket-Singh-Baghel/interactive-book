import React, { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaGlobe, FaHome, FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { FiMenu, FiX } from "react-icons/fi";
import { History } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

const CONTENT = {
    en: {
        home: "Home",
        title: "History of Computers",
        subtitle: "The journey of computers from early mechanical devices to today’s digital age",
        intro:
            "Explore the journey of computers: from the simple Abacus through vacuum tubes, transistors, chips, personal computers and the intelligent systems of today.",
        generations: [
            {
                id: "pre-mechanical",
                short: "Early Mechanical Devices",
                title: "Pre-Mechanical & Mechanical (Abacus → Babbage)",
                years: "Before 1940",
                icon: "⚙️",
                color: "#64748b",
                images: [
                    "https://images.computerhistory.org/revonline/images/xb93.80p-03-01.jpg?w=600",
                    "https://images.computerhistory.org/revonline/images/b150.81p-03-01.jpg?w=600",
                    "https://upload.wikimedia.org/wikipedia/commons/c/cc/Babbages_Analytical_Engine%2C_1834-1871._%289660574685%29.jpg"
                ],
                bullets: [
                    "**Abacus**: Counting beads used across ancient civilizations.",
                    "**Pascaline** & **Gears**: Mechanical calculators that used gears to add numbers.",
                    "**Charles Babbage** designed the Analytical Engine — the idea of a programmable machine.",
                ],
                story:
                    "Imagine a farmer counting grains with beads (Abacus). Then someone builds a wooden machine where wheels and gears do the counting — that was the first spark of mechanical computing.",
            },
            {
                id: "gen1",
                short: "First Generation",
                title: "First Generation (Vacuum Tubes)",
                years: "1940–1956",
                icon: "💡",
                color: "#f59e0b",
                images: [
                    "https://upload.wikimedia.org/wikipedia/commons/e/e9/Elektronenroehren-auswahl.jpg",
                    "https://upload.wikimedia.org/wikipedia/commons/6/6c/ENIAC_Penn1.jpg",
                    "https://images.computerhistory.org/chess/univac-1.1953.102645278.jpg?w=600"
                ],
                bullets: [
                    "Used **vacuum tubes** for switching and amplification.",
                    "Large, energy-hungry, and produced lots of heat — like rooms full of glowing lanterns.",
                    "Famous machines: **ENIAC**, **UNIVAC**.",
                ],
                story:
                    "Picture a dark hall full of glowing glass tubes — they glowed like lanterns, and required teams to operate. They were powerful but bulky.",
            },
            {
                id: "gen2",
                short: "Second Generation",
                title: "Second Generation (Transistors)",
                years: "1956–1963",
                icon: "🔋",
                color: "#0ea5e9",
                images: [
                    "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjS8oogp9BQP8BDzOCJru2AMkLxTis5q8zo9r7D3g8D3RiDF4xm4TLmXWaq56L2vxXl3dyILAlPyq0K2DlC4q5oGUCRY1CXxyxs9rL6_o6ajhQGr4kOg62yMP4-FGcDGhGQqyqUvHTLC4-D/w1200-h630-p-k-no-nu/Transistor.jpg",
                    "https://zjcomputerhistory.weebly.com/uploads/2/2/6/6/22664196/273432971.jpg"
                ],
                bullets: [
                    "**Transistors** replaced vacuum tubes making machines smaller and more reliable.",
                    "Lower power consumption, faster switching, and better durability.",
                    "Example systems: commercial transistor-based computers and improved scientific machines.",
                ],
                story:
                    "Imagine replacing a giant oil lamp with a compact flashlight — same light, much less space and effort. Transistors were that flashlight for computers.",
            },
            {
                id: "gen3",
                short: "Third Generation",
                title: "Third Generation (Integrated Circuits)",
                years: "1964–1971",
                icon: "📘",
                color: "#10b981",
                images: [
                    "https://www.yic-electronics.com/upfile/images/e8/20240823145924342.jpg",
                    "https://www.avaq.com/files/uploads/editor/b/20230616173549different-types-of-integrated-circuit.webp",
                    "https://engineering.uiowa.edu/sites/engineering.uiowa.edu/files/styles/ultrawide__1312_x_562/public/2023-06/Blue-circuit-EE-MEng-ind.jpg?h=bde28bee&itok=NhzhvLeo"
                ],
                bullets: [
                    "**Integrated Circuits (ICs)** put many transistors on a single chip.",
                    "Computers became even smaller and more affordable.",
                    "Key idea: miniaturization and modularity — whole systems on fewer boards.",
                ],
                story:
                    "Think of cramming a whole library into a single book: suddenly information and computing power were compact and manageable.",
            },
            {
                id: "gen4",
                short: "Fourth Generation",
                title: "Fourth Generation (Microprocessors & Personal Computers)",
                years: "1971–1980s",
                icon: "🖥️",
                color: "#3b82f6",
                images: [
                    "https://electrosome.com/wp-content/uploads/2017/04/Intel-Core-i7.jpg",
                    "https://cdn.britannica.com/08/23608-004-47D6DC21/IBM-Personal-Computer-machine-Microsoft-MS-DOS-operating-1981.jpg"
                ],
                bullets: [
                    "**Microprocessors** put the CPU onto a single chip (Intel 4004 and successors).",
                    "Birth of **personal computers**: Apple, Altair, IBM PCs later.",
                    "Computers moved from labs and businesses into homes and schools.",
                ],
                story:
                    "A family's living room getting its first television is like a household getting its first PC: suddenly computing is personal, familiar, and part of daily life.",
            },
            {
                id: "gen5",
                short: "Fifth Generation",
                title: "Fifth Generation (AI, Internet & Mobile)",
                years: "1980s–Present",
                icon: "☁️",
                color: "#8b5cf6",
                images: [
                    "https://cdn.mos.cms.futurecdn.net/v2/t:0,l:240,cw:1440,ch:1080,q:80,w:1440/VFLt5vHV7aCoLrLGjP9Qwm.jpg",
                    "https://techblog.smc.it/static/c5256a11117134b1d5f3bd35c479db40/a41d1/ml.jpg"
                ],
                bullets: [
                    "Rise of the **Internet**, **mobile computing**, and massive distributed systems (cloud).",
                    "**AI and Machine Learning** enable computers to learn from data.",
                    "Smartphones put powerful computers in pockets and connected everyone globally.",
                ],
                story:
                    "Imagine your best friend is not only reachable by voice but can learn, suggest, and help — that's today's computers: connected, smart, and personal.",
            },
            {
                id: "future",
                short: "Future",
                title: "Future (Quantum & Beyond)",
                years: "Tomorrow",
                icon: "🔮",
                color: "#f43f5e",
                images: [
                    "https://www.azoquantum.com/images/Article_Images/ImageForArticle_519_17140003651563270.jpg",
                    "https://www.itu.int/hub/wp-content/uploads/sites/4/2024/03/AdobeStock_612060108_resized.jpeg.optimal.jpeg"
                ],
                bullets: [
                    "**Quantum computing** promises different ways to compute using quantum bits (qubits).",
                    "**Brain–computer interfaces**, **edge AI**, and more energy-efficient architectures are coming.",
                    "The future combines speed, parallelism, and intelligence in new ways.",
                ],
                story:
                    "Imagine a computer that doesn't just follow instructions, but explores all possibilities at once. Quantum computers will tackle problems in medicine, materials science, and AI that are impossible today. We're also heading towards brain-computer interfaces, where our thoughts can interact directly with machines, and truly intelligent systems that learn and create alongside us. The future of computing is not just about faster machines, but a deeper integration with humanity.",
            },
        ],
        exportLabel: "Export timeline (JSON)",
        printLabel: "Print timeline",
    },
    hi: {
        home: "होम",
        title: "कंप्यूटर का इतिहास",
        subtitle: "यांत्रिक उपकरणों से आज के डिजिटल युग तक की यात्रा",
        intro:
            "कंप्यूटर की यात्रा का अन्वेषण करें: सरल अबेकस से वैक्यूम ट्यूब, ट्रांजिस्टर, चिप्स, पर्सनल कंप्यूटर और आज के बुद्धिमान सिस्टम तक।",
        generations: [
            {
                id: "pre-mechanical",
                short: "प्रारंभिक यांत्रिक उपकरण",
                title: "पूर्व-यांत्रिक और यांत्रिक (अबेकस → बबैज)",
                years: "1940 से पहले",
                icon: "⚙️",
                color: "#64748b",
                bullets: [
                    "**अबेकस**: प्राचीन सभ्यताओं में उपयोग में आने वाले गणना-मोती।",
                    "**पैसकलिन** और गियर: संख्याओं को जोड़ने वाले यांत्रिक कैलकुलेटर।",
                    "**चार्ल्स बबैज** ने एनालिटिकल इंजन डिज़ाइन किया — प्रोग्रामेबल मशीन का विचार।",
                ],
                story:
                    "एक किसान अनाज गिनने के लिए मोतियों का उपयोग करता है (अबेकस)। फिर किसी ने एक लकड़ी की मशीन बनाई जहाँ पहिए और गियर गिनती करते थे — यही यांत्रिक कंप्यूटिंग की शुरुआत थी।",
            },
            {
                id: "gen1",
                short: "प्रथम पीढ़ी",
                title: "प्रथम पीढ़ी (वैक्यूम ट्यूब)",
                years: "1940–1956",
                icon: "💡",
                color: "#f59e0b",
                bullets: [
                    "स्विचिंग और एम्प्लिफिकेशन के लिए **वैक्यूम ट्यूब** का उपयोग किया गया।",
                    "बड़े, ऊर्जा-उपभोग करने वाले और बहुत गर्म होने वाले — लाखों दीपकों जैसी उपस्थिति।",
                    "प्रसिद्ध मशीनें: **ENIAC**, **UNIVAC**।",
                ],
                story:
                    "एक अँधेरे हॉल की कल्पना करें जो चमकते ग्लास ट्यूबों से भरा हो — वे दीपकों की तरह जगमगाते थे और संचालन के लिए टीम चाहिए थी।",
            },
            {
                id: "gen2",
                short: "द्वितीय पीढ़ी",
                title: "द्वितीय पीढ़ी (ट्रांजिस्टर)",
                years: "1956–1963",
                icon: "🔋",
                color: "#0ea5e9",
                bullets: [
                    "**ट्रांजिस्टर** ने वैक्यूम ट्यूब की जगह ली और मशीनों को छोटा और अधिक विश्वसनीय बनाया।",
                    "कम ऊर्जा खर्च, तेज़ स्विचिंग और बेहतर मजबूती।",
                    "उदाहरण: व्यापार और वैज्ञानिक उपयोग के लिए ट्रांजिस्टर-आधारित कंप्यूटर।",
                ],
                story:
                    "किसी विशाल तेल के लालटेन को एक छोटे फ़्लैशलाइट से बदलने की कल्पना करें — वही सरलता ट्रांजिस्टर ने लाई।",
            },
            {
                id: "gen3",
                short: "तृतीय पीढ़ी",
                title: "तृतीय पीढ़ी (इंटीग्रेटेड सर्किट)",
                years: "1964–1971",
                icon: "📘",
                color: "#10b981",
                bullets: [
                    "**इंटीग्रेटेड सर्किट (ICs)** ने कई ट्रांजिस्टर एक ही चिप पर डाले।",
                    "कंप्यूटर और भी छोटे और सस्ती हुए।",
                    "विचार: सूक्ष्मीकरण और मॉड्यूलरिटी — कम बोर्ड पर पूरे सिस्टम।",
                ],
                story:
                    "पूरे पुस्तकालय को एक पुस्तक में समेटने की तरह सोचें: जानकारी और कंप्यूटिंग शक्ति अब कॉम्पैक्ट और प्रबंधनीय हो गई।",
            },
            {
                id: "gen4",
                short: "चौथी पीढ़ी",
                title: "चौथी पीढ़ी (माइक्रोप्रोसेसर और पर्सनल कंप्यूटर)",
                years: "1971–1980s",
                icon: "🖥️",
                color: "#3b82f6",
                bullets: [
                    "**माइक्रोप्रोसेसर** ने CPU को एक चिप पर रखा (Intel 4004 आदि)।",
                    "**पर्सनल कंप्यूटर** का जन्म: Apple, Altair, IBM PC बाद में।",
                    "कंप्यूटर लैब और बिज़नेस से घरों और स्कूलों तक पहुँच गए।",
                ],
                story:
                    "एक परिवार के लिविंग रूम में पहली टीवी की तरह, पहला PC भी घर में कंप्यूटिंग को आम और परिचित बना गया।",
            },
            {
                id: "gen5",
                short: "पंचमी पीढ़ी",
                title: "पंचमी पीढ़ी (एआई, इंटरनेट और मोबाइल)",
                years: "1980s–वर्तमान",
                icon: "☁️",
                color: "#8b5cf6",
                bullets: [
                    "**इंटरनेट**, **मोबाइल कंप्यूटिंग** और बड़े वितरित सिस्टम (क्लाउड) का उदय।",
                    "**एआई और मशीन लर्निंग** कंप्यूटरों को डेटा से सीखने देते हैं।",
                    "स्मार्टफोन ने शक्तिशाली कंप्यूटर को-pocket में ला दिया और सभी को जोड़ा।",
                ],
                story:
                    "कल्पना कीजिए कि आपका सबसे अच्छा दोस्त अब न केवल पहुँचा जा सकता है बल्कि सीख भी सकता है — यही आज के कंप्यूटर हैं।",
            },
            {
                id: "future",
                short: "भविष्य",
                title: "भविष्य (क्वांटम और इसके परे)",
                years: "कल",
                icon: "🔮",
                color: "#f43f5e",
                bullets: [
                    "**क्वांटम कंप्यूटिंग** कुछ समस्याओं के लिए अलग तरह से गणना करने का वादा करती है।",
                    "**ब्रेन- कंप्यूटर इंटरफेस**, **एज AI**, और अधिक ऊर्जा- कुशल आर्किटेक्चर आ रहे हैं।",
                    "भविष्य नई गति, समवर्तीता, और बुद्धिमत्ता जोड़कर आगे बढ़ेगा।",
                ],
                story:
                    "एक ऐसे कंप्यूटर की कल्पना करें जो सिर्फ निर्देशों का पालन नहीं करता, बल्कि एक ही बार में सभी संभावनाओं को तलाशता है। क्वांटम कंप्यूटर चिकित्सा, पदार्थ विज्ञान और एआई में उन समस्याओं का समाधान करेंगे जो आज असंभव हैं। हम ब्रेन-कंप्यूटर इंटरफेस की ओर भी बढ़ रहे हैं, जहां हमारे विचार सीधे मशीनों के साथ बातचीत कर सकते हैं, और वास्तव में बुद्धिमान प्रणालियां जो हमारे साथ सीखती और बनाती हैं। कंप्यूटिंग का भविष्य केवल तेज मशीनों के बारे में नहीं है, बल्कि मानवता के साथ गहरे एकीकरण का है।",
            },
        ],
        exportLabel: "समयरेखा निर्यात (JSON)",
        printLabel: "समयरेखा प्रिंट करें",
    },
};

// Helpers
function renderWithBold(text) {
    if (!text) return null;
    const parts = text.split(/(\*\*.*?\*\*)/g);
    return parts.map((part, i) => {
        const m = part.match(/^\*\*(.*)\*\*$/);
        if (m) return (
            <strong key={i} className="font-semibold text-indigo-600">
                {m[1]}
            </strong>
        );
        return <span key={i}>{part}</span>;
    });
}

export default function HistoryOfComputersComponent() {
    const [lang, setLang] = useState("en");
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const data = CONTENT[lang];
    const [activeId, setActiveId] = useState(data.generations[0].id);
    const timelineRef = useRef(null);
    const stageRefs = useRef({});
    const navigate = useNavigate();

    const activeIndex = data.generations.findIndex((g) => g.id === activeId);

    return (
        <section className="p-6 bg-gradient-to-b from-white via-slate-50 to-gray-50 min-h-screen">
            <div className="max-w-6xl mx-auto">

                {/* HEADER */}
                <div className="flex items-center justify-between mb-8">
                    <Link to="/parts/prt1" className="inline-flex items-center px-4 py-2 bg-white rounded-full shadow-md border border-gray-200 hover:bg-gray-100 transition">
                        <FaHome className="mr-2 text-lg text-sky-600" />
                        {data.home}
                    </Link>
                    <div className="flex space-x-2">
                        <button onClick={() => setLang("en")} className={`px-3 py-1 rounded-lg border font-semibold ${lang === "en" ? "bg-sky-600 text-white border-sky-600" : "bg-white text-gray-700 border-gray-300"} transition`}>EN</button>
                        <button onClick={() => setLang("hi")} className={`px-3 py-1 rounded-lg border font-semibold ${lang === "hi" ? "bg-sky-600 text-white border-sky-600" : "bg-white text-gray-700 border-gray-300"} transition`}>हिं</button>
                    </div>
                </div>

                <div className="lg:hidden flex justify-end mb-4">
                    <button
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        className="flex items-center justify-center px-4 py-2 bg-white rounded-xl shadow-md text-slate-700 font-semibold"
                    >
                        {isMenuOpen ? <FiX className="mr-2" /> : <FiMenu className="mr-2" />}
                        {isMenuOpen ? "Close Menu" : "Open Menu"}
                    </button>
                </div>
                <div>
                    <motion.h1
                        initial={{ opacity: 0, y: -8 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="text-3xl md:text-4xl font-extrabold text-slate-900"
                    >
                        {data.title}
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.12 }}
                        className="text-slate-600 mt-2 max-w-2xl"
                    >
                        {data.subtitle}
                    </motion.p>
                </div>

                {/* INTRO CARD */}
                <motion.div
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="mt-6 bg-white rounded-2xl p-6 shadow-lg"
                >
                    <div className="md:flex md:items-center md:gap-6">
                        <div className="md:flex-1">
                            <p className="text-slate-700 leading-relaxed">{data.intro}</p>
                            {/* "Play Story" and "Jump to Timeline" buttons removed */}
                        </div>

                        <div className="mt-4 md:mt-0 md:w-64 md:flex-none flex justify-center">
                            <motion.div whileHover={{ rotate: 6, scale: 1.1 }} className="rounded-xl p-4 bg-indigo-50 text-indigo-500">
                                <History size={56} />
                            </motion.div>
                        </div>
                    </div>
                </motion.div>

                {/* TIMELINE + DETAILS */}
                <div className="mt-8 grid gap-6 lg:grid-cols-2" ref={timelineRef}>
                    {/* Timeline column */}
                    <div className={`
                        col-span-1 lg:block
                        ${isMenuOpen ? 'block' : 'hidden'}
                        fixed lg:relative top-0 left-0 w-full h-full bg-white z-40 p-6 lg:p-0 lg:bg-transparent lg:h-auto overflow-y-auto
                    `}>
                        <div className="sticky top-6 space-y-4">
                            <div className="bg-white p-4 rounded-2xl shadow">
                                <div className="flex items-center justify-between">
                                    <div className="text-sm text-slate-500">{lang === "en" ? "Timeline" : "समयरेखा"}</div>
                                    <button onClick={() => setIsMenuOpen(false)} className="lg:hidden text-2xl text-slate-500"><FiX /></button>
                                </div>

                                <div className="mt-2 text-xs text-slate-500">
                                    <div>{lang === "en" ? "Tip:" : "टिप:"} {lang === "en" ? "Click a stage to explore." : "किसी स्टेज पर क्लिक करें।"}</div>
                                </div>

                                <div className="mt-4 space-y-2">
                                    {data.generations.map((g, i) => (
                                        <motion.button
                                            key={g.id}
                                            ref={el => stageRefs.current[g.id] = el}
                                            onClick={() => {
                                                setActiveId(g.id);
                                                setIsMenuOpen(false); // Close menu on selection
                                            }}
                                            className="w-full flex items-center text-left p-3 rounded-lg transition-all duration-300 focus:outline-none focus-visible:ring-2"
                                            style={{ color: g.id === activeId ? 'white' : '#374151' }}
                                            animate={{
                                                backgroundColor: g.id === activeId ? g.color : 'rgba(243,244,246,0)',
                                                boxShadow: g.id === activeId ? `0 4px 14px 0 ${g.color}55` : 'none'
                                            }}
                                            whileHover={{
                                                backgroundColor: g.id !== activeId ? '#f3f4f6' : g.color,
                                                scale: 1.03
                                            }}
                                            whileTap={{ scale: 0.98 }}
                                        >
                                            <motion.div
                                                className="text-2xl w-10 h-10 flex items-center justify-center rounded-full mr-4"
                                                animate={{
                                                    backgroundColor: g.id === activeId ? 'rgba(255,255,255,0.2)' : '#e5e7eb',
                                                    color: g.id === activeId ? 'white' : g.color
                                                }}
                                            >
                                                {g.icon}
                                            </motion.div>
                                            <div className="flex-1">
                                                <div className="font-semibold">{g.title}</div>
                                                <div className="text-xs">{g.years}</div>
                                            </div>
                                            <div className="text-xs text-slate-400">{i + 1}</div>
                                        </motion.button>
                                    ))}
                                </div>
                            </div>
                            <AnimatePresence>
                                {data.generations.map((g) => {
                                    if (g.id !== activeId) return null;
                                    return (
                                        <motion.div
                                            key={`${g.id}-bullets`}
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: -10 }}
                                            className="bg-white p-4 rounded-2xl shadow"
                                        >
                                            <h4 className="font-bold text-lg mb-2" style={{ color: g.color }}>
                                                Key Features
                                            </h4>
                                            <div className="space-y-2">
                                                {g.bullets.map((b, i) => (
                                                    <motion.div
                                                        key={i}
                                                        initial={{ opacity: 0, x: -10 }}
                                                        animate={{ opacity: 1, x: 0 }}
                                                        transition={{ delay: 0.1 * i }}
                                                        className="bg-indigo-50/40 border border-indigo-100 rounded-lg p-3 text-sm"
                                                    >
                                                        {renderWithBold(b)}
                                                    </motion.div>
                                                ))}
                                            </div>
                                        </motion.div>
                                    )
                                })}
                            </AnimatePresence>
                        </div>
                    </div>

                    {/* Details column */}
                    <div className="col-span-1">
                        <AnimatePresence mode="wait">
                            {data.generations.map((g) => {
                                if (g.id !== activeId) return null;
                                return (
                                    <motion.div
                                        key={g.id}
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        className=""
                                    >
                                        <motion.div
                                            initial={{ opacity: 0, x: 16 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            exit={{ opacity: 0, x: -16 }}
                                            transition={{ type: "spring", stiffness: 120 }}
                                            className="bg-white rounded-2xl p-6 shadow-lg relative"
                                        >
                                            {/* Image Section */}
                                            <div className="mb-4">
                                                {g.images && g.images.map((imgUrl, index) => (
                                                    <div key={index} className="mb-4">
                                                        <img src={imgUrl} alt={`${g.short} ${index + 1}`} className="w-full h-auto object-cover rounded-lg shadow-md" />
                                                        <p className="mt-2 text-center font-bold" style={{ color: g.color }}>
                                                            {g.short} {g.images.length > 1 ? index + 1 : ''}
                                                        </p>
                                                    </div>
                                                ))}
                                            </div>

                                            {/* Text Content Section */}
                                            <div>
                                                <div className="flex items-center justify-between">
                                                    <div>
                                                        <h3 className="text-2xl font-semibold text-slate-900">
                                                            {g.title}
                                                        </h3>
                                                        <div className="text-sm text-slate-500 mt-1">{g.years}</div>
                                                    </div>
                                                </div>

                                                <div className="mt-4 text-slate-700 leading-relaxed">
                                                    <p>{g.story}</p>
                                                </div>

                                                <div className="mt-6 flex items-center gap-3">
                                                    <div className="text-xs text-slate-400 ml-auto">
                                                        {lang === "en"
                                                            ? `Stage ${activeIndex + 1}/${data.generations.length}`
                                                            : `स्टेज ${activeIndex + 1}/${data.generations.length}`}
                                                    </div>
                                                </div>
                                            </div>
                                        </motion.div>
                                    </motion.div>
                                );
                            })}
                        </AnimatePresence>

                        {/* Comparative chart moved to be full-width below */}

                        {/* Story wrap up */}
                        <motion.div className="mt-6 bg-gradient-to-r from-indigo-50 to-white p-6 rounded-2xl shadow">
                            <div className="flex items-start gap-4">
                                <div className="text-indigo-600 text-3xl">
                                    <FaGlobe />
                                </div>
                                <div>
                                    <div className="font-semibold text-slate-900">
                                        {lang === "en" ? "Story Summary" : "कहानी सार"}
                                    </div>
                                    <div className="text-sm text-slate-700 mt-2">
                                        {lang === "en"
                                            ? "From beads to brains: every generation made computing smaller, faster, and more useful."
                                            : "मोतियों से दिमाग तक: हर पीढ़ी ने कंप्यूटिंग को छोटा, तेज और अधिक उपयोगी बनाया।"}
                                    </div>
                                    {/* "Start" and "Jump to Future" buttons removed */}
                                </div>
                            </div>
                        </motion.div>
                    </div>

                </div>

                {/* Comparative chart (simple bars animated) */}
                <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.12 }}
                    className="mt-6 bg-white rounded-2xl p-6 shadow"
                >
                    <h4 className="font-semibold text-slate-900">
                        {lang === "en" ? "Comparative View" : "तुलनात्मक दृश्य"}
                    </h4>
                    <p className="text-xs text-slate-500 mt-1">
                        {lang === "en"
                            ? "Size, Speed and Cost trends across generations"
                            : "पीढ़ियों में आकार, गति और लागत रुझान"}
                    </p>

                    <div className="mt-4 space-y-3">
                        {[
                            {
                                label: lang === "en" ? "Size" : "आकार",
                                values: [90, 60, 36, 14, 6, 2],
                                color: "bg-red-500",
                            },
                            {
                                label: lang === "en" ? "Speed" : "गति",
                                values: [10, 30, 50, 78, 95, 99],
                                color: "bg-blue-500",
                            },
                            {
                                label: lang === "en" ? "Cost (relative)" : "लागत (सापेक्ष)",
                                values: [95, 70, 40, 30, 20, 25],
                                color: "bg-green-500",
                            },
                        ].map((metric, mi) => (
                            <div key={mi}>
                                <div className="flex items-center justify-between text-xs text-slate-500 mb-2">
                                    <div>{metric.label}</div>
                                    <div className="text-xs">
                                        {lang === "en" ? "First → Future" : "प्रथम → भविष्य"}
                                    </div>
                                </div>
                                <div className="flex gap-2 items-end h-28">
                                    {metric.values.map((v, vi) => (
                                        <motion.div
                                            key={vi}
                                            initial={{ height: 2 }}
                                            whileInView={{ height: `${(v / 100) * 100}%` }}
                                            viewport={{ once: true }}
                                            transition={{
                                                type: "spring",
                                                stiffness: 100,
                                                damping: 10,
                                                delay: vi * 0.1,
                                            }}
                                            className={`${metric.color} rounded-t-md w-full`}
                                            title={`${metric.label}: ${v}`}
                                            style={{ width: `${100 / metric.values.length}%` }}
                                        />
                                    ))}
                                </div>
                                <div className="flex text-xs text-slate-400 justify-between mt-1">
                                    {data.generations.map((g, idx) => (
                                        <div
                                            key={g.id}
                                            className="w-full text-center"
                                            style={{ width: `${100 / data.generations.length}%` }}
                                        >
                                            {g.short}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </motion.div>

                {/* Page Navigation */}
                <div className="flex flex-col md:flex-row justify-between items-center mt-10 p-4 bg-gray-100 rounded-lg shadow-md gap-4 md:gap-0">
                    {/* Previous Button */}
                    <button
                        onClick={() => {
                            const currentIndex = data.generations.findIndex(g => g.id === activeId);
                            if (currentIndex === 0) {
                                navigate('/part1/ports-and-connectors');
                            } else {
                                const prevStageId = data.generations[currentIndex - 1].id;
                                setActiveId(prevStageId);
                            }
                        }}
                        className="flex items-center gap-2 px-4 py-2 bg-purple-200 hover:bg-purple-300 text-purple-900 rounded-lg shadow transition"
                    >
                        <FaArrowLeft />
                        Previous
                    </button>

                    {/* Next Button */}
                    <button
                        onClick={() => {
                            const currentIndex = data.generations.findIndex(g => g.id === activeId);
                            if (currentIndex === data.generations.length - 1) {
                                // The user requested navigation to 'types-of-computer', and will create the component later.
                                navigate('/part1/types-of-computer');
                            } else {
                                const nextStageId = data.generations[currentIndex + 1].id;
                                setActiveId(nextStageId);
                            }
                        }}
                        className="flex items-center gap-2 px-4 py-2 bg-green-200 hover:bg-green-300 text-green-900 rounded-lg shadow transition"
                    >
                        Next
                        <FaArrowRight />
                    </button>
                </div>
            </div>
        </section>
    );
}

