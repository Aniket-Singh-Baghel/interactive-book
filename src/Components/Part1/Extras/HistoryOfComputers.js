import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaChevronLeft,
  FaChevronRight,
  FaPlay,
  FaStop,
  FaDownload,
  FaClipboard,
  FaGlobe,
  FaMicrochip,
  FaBrain,
  FaClock,
} from "react-icons/fa";

/**
 * HistoryOfComputersComponent.jsx
 * A long, interactive React component that tells the story of computer history
 * with animated SVGs, timeline, story-mode, multilingual support (en/hi), and
 * interactive controls. Built with Tailwind CSS and Framer Motion.
 *
 * Notes:
 * - Requires: framer-motion, react-icons, tailwindcss in your project.
 * - Does NOT require html2canvas/jspdf. For export we provide JSON export and window.print().
 * - Copy this single file into your React project and import where needed.
 */

const CONTENT = {
  en: {
    title: "History of Computers",
    subtitle: "The journey of computers from early mechanical devices to today’s digital age",
    intro:
      "Join a story-driven animated journey: from the simple Abacus through vacuum tubes, transistors, chips, personal computers and the intelligent systems of today.",
    generations: [
      {
        id: "pre-mechanical",
        short: "Early Mechanical Devices",
        title: "Pre-Mechanical & Mechanical (Abacus → Babbage)",
        years: "Before 1940",
        icon: "⚙️",
        svg: "abacus",
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
        svg: "vacuum",
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
        svg: "transistor",
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
        svg: "ic",
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
        svg: "pc",
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
        svg: "cloud",
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
        svg: "quantum",
        bullets: [
          "**Quantum computing** promises different ways to compute using quantum bits (qubits).",
          "**Brain–computer interfaces**, **edge AI**, and more energy-efficient architectures are coming.",
          "The future combines speed, parallelism, and intelligence in new ways.",
        ],
        story:
          "A crystal ball that solves puzzles lightning-fast — quantum is not magic, but it will feel magical for certain problems.",
      },
    ],
    cta: "Play story",
    exportLabel: "Export timeline (JSON)",
    printLabel: "Print timeline",
  },
  hi: {
    title: "कंप्यूटर का इतिहास",
    subtitle: "यांत्रिक उपकरणों से आज के डिजिटल युग तक की यात्रा",
    intro:
      "एक कहानी-आधारित एनिमेटेड यात्रा में जुड़ें: सरल अबेकस से वैक्यूम ट्यूब, ट्रांजिस्टर, चिप्स, पर्सनल कंप्यूटर और आज के बुद्धिमान सिस्टम तक।",
    generations: [
      {
        id: "pre-mechanical",
        short: "प्रारंभिक यांत्रिक उपकरण",
        title: "पूर्व-यांत्रिक और यांत्रिक (अबेकस → बबैज)",
        years: "1940 से पहले",
        icon: "⚙️",
        svg: "abacus",
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
        svg: "vacuum",
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
        svg: "transistor",
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
        svg: "ic",
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
        svg: "pc",
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
        svg: "cloud",
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
        svg: "quantum",
        bullets: [
          "**क्वांटम कंप्यूटिंग** कुछ समस्याओं के लिए अलग तरह से गणना करने का वादा करती है।",
          "**ब्रेन- कंप्यूटर इंटरफेस**, **एज AI**, और अधिक ऊर्जा- कुशल आर्किटेक्चर आ रहे हैं।",
          "भविष्य नई गति, समवर्तीता, और बुद्धिमत्ता जोड़कर आगे बढ़ेगा।",
        ],
        story:
          "एक क्रिस्टल बॉल जो तेज़ी से पहेलियों को हल कर दे — क्वांटम जादू नहीं, किन्तु निश्चित समस्याओं के लिए जादुई सा लगेगा।",
      },
    ],
    cta: "कहानी चलाएँ",
    exportLabel: "समयरेखा निर्यात (JSON)",
    printLabel: "समयरेखा प्रिंट करें",
  },
};

// Small SVG components used in the timeline — simplified and animated with framer-motion props
function AbacusSVG({ animate = true, className = "w-36 h-24" }) {
  return (
    <svg viewBox="0 0 200 120" className={className} xmlns="http://www.w3.org/2000/svg">
      <rect x="2" y="6" width="196" height="12" rx="3" fill="#7c3aed" opacity="0.08" />
      <g stroke="#c084fc" strokeWidth="2">
        {[...Array(7)].map((_, i) => (
          <line key={i} x1={20 + i * 24} y1="16" x2={20 + i * 24} y2="100" strokeLinecap="round" />
        ))}
      </g>
      {[...Array(7)].map((_, i) => (
        <motion.circle
          key={i}
          cx={20 + i * 24}
          cy={40 + (i % 2 === 0 ? 6 : -6)}
          r="8"
          fill="#f97316"
          animate={animate ? { y: [0, 10, 0] } : undefined}
          transition={{ repeat: Infinity, duration: 2 + (i % 3) * 0.4 }}
        />
      ))}
    </svg>
  );
}

function VacuumSVG({ className = "w-36 h-24" }) {
  return (
    <svg viewBox="0 0 200 120" className={className} xmlns="http://www.w3.org/2000/svg">
      <rect x="6" y="16" width="188" height="84" rx="8" fill="#111827" opacity="0.06" />
      {[...Array(4)].map((_, i) => (
        <g key={i} transform={`translate(${30 + i * 36},28)`}> 
          <rect x="0" y="0" width="20" height="48" rx="3" fill="#fde68a" />
          <circle cx="10" cy="12" r="4" fill="#f97316" />
        </g>
      ))}
    </svg>
  );
}

function TransistorSVG({ className = "w-36 h-24" }) {
  return (
    <svg viewBox="0 0 200 120" className={className} xmlns="http://www.w3.org/2000/svg">
      <rect x="4" y="8" width="192" height="104" rx="10" fill="#ecfccb" opacity="0.06" />
      <g transform="translate(40,24)">
        <rect x="0" y="0" width="120" height="72" rx="8" fill="#bbf7d0" />
        <circle cx="20" cy="36" r="10" fill="#22c55e" />
        <rect x="40" y="24" width="60" height="6" rx="3" fill="#65a30d" />
      </g>
    </svg>
  );
}

function ChipSVG({ className = "w-36 h-24" }) {
  return (
    <svg viewBox="0 0 200 120" className={className} xmlns="http://www.w3.org/2000/svg">
      <rect x="40" y="20" width="120" height="80" rx="12" fill="#0ea5e9" />
      <g>
        {[...Array(6)].map((_, i) => (
          <rect key={i} x={50 + i * 18} y={30} width={8} height={60} rx={2} fill="#0284c7" />
        ))}
      </g>
    </svg>
  );
}

function PcSVG({ className = "w-36 h-24" }) {
  return (
    <svg viewBox="0 0 200 120" className={className} xmlns="http://www.w3.org/2000/svg">
      <rect x="10" y="12" width="180" height="86" rx="12" fill="#eef2ff" />
      <rect x="28" y="28" width="144" height="56" rx="6" fill="#fff" />
      <rect x="60" y="92" width="80" height="8" rx="2" fill="#c7d2fe" />
    </svg>
  );
}

function CloudSVG({ className = "w-36 h-24" }) {
  return (
    <svg viewBox="0 0 200 120" className={className} xmlns="http://www.w3.org/2000/svg">
      <path d="M40 70 Q20 50 40 40 Q60 20 100 30 Q140 10 160 36 Q188 46 170 72 Z" fill="#bfdbfe" />
      <text x="70" y="78" fill="#0f172a" fontSize="10">Cloud</text>
    </svg>
  );
}

function QuantumSVG({ className = "w-36 h-24" }) {
  return (
    <svg viewBox="0 0 200 120" className={className} xmlns="http://www.w3.org/2000/svg">
      <circle cx="100" cy="60" r="30" fill="#c084fc" opacity="0.14" />
      <g stroke="#7c3aed" strokeWidth="1.8" fill="none">
        <path d="M70 60 q15 -30 60 0" />
        <path d="M70 60 q15 30 60 0" />
      </g>
    </svg>
  );
}

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
  const data = CONTENT[lang];
  const [activeId, setActiveId] = useState(data.generations[0].id);
  const [storyPlaying, setStoryPlaying] = useState(false);
  const [storyStep, setStoryStep] = useState(0);
  const storyTimerRef = useRef(null);

  useEffect(() => {
    // ensure when language changes, active resets
    setActiveId(CONTENT[lang].generations[0].id);
    stopStory();
  }, [lang]);

  useEffect(() => {
    return () => stopStory();
  }, []);

  function stopStory() {
    setStoryPlaying(false);
    clearTimeout(storyTimerRef.current);
    storyTimerRef.current = null;
    setStoryStep(0);
  }

  function playStory() {
    // auto-advance through generations, focusing each one
    stopStory();
    setStoryPlaying(true);
    let idx = 0;
    const gens = CONTENT[lang].generations;

    const next = () => {
      if (idx >= gens.length) {
        stopStory();
        return;
      }
      setActiveId(gens[idx].id);
      setStoryStep(idx + 1);
      idx += 1;
      storyTimerRef.current = setTimeout(next, 4200);
    };

    next();
  }

  function exportJSON() {
    const blob = new Blob([JSON.stringify(CONTENT[lang], null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${lang}-history-of-computers.json`;
    a.click();
    URL.revokeObjectURL(url);
  }

  function copyToClipboard() {
    navigator.clipboard
      .writeText(JSON.stringify(CONTENT[lang], null, 2))
      .then(() => alert("Timeline copied to clipboard"))
      .catch(() => alert("Copy failed"));
  }

  const activeIndex = data.generations.findIndex((g) => g.id === activeId);

  return (
    <section className="p-6 bg-gradient-to-b from-white via-slate-50 to-gray-50 min-h-screen">
      <div className="max-w-6xl mx-auto">
        {/* HEADER */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
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

          <div className="flex items-center gap-3">
            <div className="text-sm text-slate-500 mr-2 hidden sm:block">{lang === "en" ? "Language" : "भाषा"}</div>
            <div className="flex rounded-lg overflow-hidden border border-slate-200">
              <button
                onClick={() => setLang("en")}
                className={`px-3 py-1 text-sm font-medium ${lang === "en" ? "bg-indigo-600 text-white" : "bg-white text-slate-700"}`}
              >
                English
              </button>
              <button
                onClick={() => setLang("hi")}
                className={`px-3 py-1 text-sm font-medium ${lang === "hi" ? "bg-indigo-600 text-white" : "bg-white text-slate-700"}`}
              >
                हिन्दी
              </button>
            </div>
          </div>
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

              <div className="mt-4 flex items-center gap-3">
                <button
                  onClick={() => playStory()}
                  className="px-4 py-2 bg-indigo-600 text-white rounded-lg flex items-center gap-2"
                >
                  <FaPlay />
                  <span>{data.cta}</span>
                </button>

                <button
                  onClick={() => window.scrollTo({ top: 420, behavior: "smooth" })}
                  className="px-4 py-2 border rounded-lg text-slate-700 hover:bg-slate-50 transition"
                >
                  {lang === "en" ? "Jump to Timeline" : "टाइमलाइन पर जाएँ"}
                </button>
              </div>
            </div>

            <div className="mt-4 md:mt-0 md:w-64 md:flex-none flex justify-center">
              <motion.div whileHover={{ rotate: 6 }} className="rounded-xl p-2">
                <StoryPeekSVG />
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* TIMELINE + DETAILS */}
        <div className="mt-8 grid gap-6 lg:grid-cols-3">
          {/* Timeline column */}
          <div className="col-span-1">
            <div className="sticky top-6 space-y-4">
              <div className="bg-white p-4 rounded-2xl shadow">
                <div className="flex items-center justify-between">
                  <div className="text-sm text-slate-500">{lang === "en" ? "Timeline" : "समयरेखा"}</div>
                  <div className="text-xs text-slate-400">{data.generations.length} {lang === "en" ? "stages" : "स्टेज"}</div>
                </div>

                <div className="mt-4">
                  {data.generations.map((g, i) => (
                    <motion.button
                      key={g.id}
                      onClick={() => setActiveId(g.id)}
                      whileHover={{ scale: 1.02 }}
                      className={`w-full text-left p-3 rounded-lg mb-2 transition flex items-center gap-3 ${g.id === activeId ? "bg-indigo-50 border border-indigo-100" : ""}`}
                    >
                      <div className="w-10 h-10 rounded-lg bg-indigo-100 flex items-center justify-center text-indigo-700 font-bold">{g.icon}</div>
                      <div className="flex-1">
                        <div className="font-semibold text-slate-800">{g.title}</div>
                        <div className="text-xs text-slate-500">{g.years}</div>
                      </div>
                      <div className="text-xs text-slate-400">{i + 1}</div>
                    </motion.button>
                  ))}
                </div>

                <div className="mt-4 text-xs text-slate-500">
                  <div>{lang === "en" ? "Tip:" : "टिप:"} {lang === "en" ? "Click a stage to explore. Use play to auto-step through the story." : "किसी स्टेज पर क्लिक करें और प्ले से कहानी ऑटो चलाएं।"}</div>
                </div>
              </div>
            </div>
          </div>

          {/* Details column */}
          <div className="col-span-2">
            <AnimatePresence mode="wait">
              {data.generations.map((g) => {
                if (g.id !== activeId) return null;
                return (
                  <motion.div
                    key={g.id}
                    initial={{ opacity: 0, x: 16 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -16 }}
                    transition={{ type: "spring", stiffness: 120 }}
                    className="bg-white rounded-2xl p-6 shadow-lg"
                  >
                    <div className="md:flex md:items-start md:gap-6">
                      <div className="md:flex-none">
                        <div className="w-48 h-36 flex items-center justify-center">
                          {g.svg === "abacus" && <AbacusSVG />}
                          {g.svg === "vacuum" && <VacuumSVG />}
                          {g.svg === "transistor" && <TransistorSVG />}
                          {g.svg === "ic" && <ChipSVG />}
                          {g.svg === "pc" && <PcSVG />}
                          {g.svg === "cloud" && <CloudSVG />}
                          {g.svg === "quantum" && <QuantumSVG />}
                        </div>
                      </div>

                      <div className="md:flex-1">
                        <div className="flex items-center justify-between">
                          <div>
                            <h3 className="text-2xl font-semibold text-slate-900">{g.title}</h3>
                            <div className="text-sm text-slate-500 mt-1">{g.years}</div>
                          </div>

                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => {
                                const idx = data.generations.findIndex((x) => x.id === g.id);
                                const nextIdx = Math.max(0, idx - 1);
                                setActiveId(data.generations[nextIdx].id);
                              }}
                              className="p-2 rounded-lg border"
                            >
                              <FaChevronLeft />
                            </button>

                            <button
                              onClick={() => {
                                const idx = data.generations.findIndex((x) => x.id === g.id);
                                const nextIdx = Math.min(data.generations.length - 1, idx + 1);
                                setActiveId(data.generations[nextIdx].id);
                              }}
                              className="p-2 rounded-lg border"
                            >
                              <FaChevronRight />
                            </button>
                          </div>
                        </div>

                        <div className="mt-4 text-slate-700 leading-relaxed">
                          <p>{g.story}</p>
                        </div>

                        <div className="mt-4 grid md:grid-cols-2 gap-3">
                          {g.bullets.map((b, i) => (
                            <motion.div
                              key={i}
                              initial={{ opacity: 0, y: 8 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: 0.06 * i }}
                              className="bg-indigo-50/40 border border-indigo-100 rounded-lg p-3 text-sm"
                            >
                              {renderWithBold(b)}
                            </motion.div>
                          ))}
                        </div>

                        <div className="mt-6 flex items-center gap-3">
                          <button
                            onClick={() => alert(`${g.title} — ${g.years}`)}
                            className="px-4 py-2 bg-indigo-600 text-white rounded-lg"
                          >
                            {lang === "en" ? "Fun Fact" : "रोचक तथ्य"}
                          </button>

                          <button
                            onClick={() => {
                              // scroll to next
                              const idx = data.generations.findIndex((x) => x.id === g.id);
                              const nextIdx = Math.min(data.generations.length - 1, idx + 1);
                              setActiveId(data.generations[nextIdx].id);
                            }}
                            className="px-4 py-2 border rounded-lg"
                          >
                            {lang === "en" ? "Next" : "अगला"}
                          </button>

                          <div className="text-xs text-slate-400 ml-auto">{lang === "en" ? `Stage ${activeIndex + 1}/${data.generations.length}` : `स्टेज ${activeIndex + 1}/${data.generations.length}`}</div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>

            {/* Comparative chart (simple bars animated) */}
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.12 }}
              className="mt-6 bg-white rounded-2xl p-6 shadow"
            >
              <h4 className="font-semibold text-slate-900">{lang === "en" ? "Comparative View" : "तुलनात्मक दृश्य"}</h4>
              <p className="text-xs text-slate-500 mt-1">{lang === "en" ? "Size, Speed and Cost trends across generations" : "पीढ़ियों में आकार, गति और लागत रुझान"}</p>

              <div className="mt-4 space-y-3">
                {[
                  { label: lang === "en" ? "Size" : "आकार", values: [90, 60, 36, 14, 6, 2] },
                  { label: lang === "en" ? "Speed" : "गति", values: [10, 30, 50, 78, 95, 99] },
                  { label: lang === "en" ? "Cost (relative)" : "लागत (सापेक्ष)", values: [95, 70, 40, 30, 20, 25] },
                ].map((metric, mi) => (
                  <div key={mi}>
                    <div className="flex items-center justify-between text-xs text-slate-500 mb-2">
                      <div>{metric.label}</div>
                      <div className="text-xs">{lang === "en" ? "First → Future" : "प्रथम → भविष्य"}</div>
                    </div>
                    <div className="flex gap-2 items-end h-28">
                      {metric.values.map((v, vi) => (
                        <motion.div
                          key={vi}
                          initial={{ height: 2 }}
                          whileInView={{ height: `${(v / 100) * 100}%` }}
                          viewport={{ once: true }}
                          transition={{ type: "spring", stiffness: 160, damping: 16, delay: vi * 0.06 }}
                          className="bg-indigo-500 rounded-t-md w-full"
                          style={{ width: `${100 / metric.values.length}%` }}
                        />
                      ))}
                    </div>
                    <div className="flex text-xs text-slate-400 justify-between mt-1">
                      {data.generations.map((g, idx) => (
                        <div key={g.id} className="w-full text-center" style={{ width: `${100 / data.generations.length}%` }}>{g.short}</div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Story wrap up */}
            <motion.div className="mt-6 bg-gradient-to-r from-indigo-50 to-white p-6 rounded-2xl shadow">
              <div className="flex items-start gap-4">
                <div className="text-indigo-600 text-3xl"><FaGlobe /></div>
                <div>
                  <div className="font-semibold text-slate-900">{lang === "en" ? "Story Summary" : "कहानी सार"}</div>
                  <div className="text-sm text-slate-700 mt-2">{lang === "en" ? "From beads to brains: every generation made computing smaller, faster, and more useful." : "मोतियों से दिमाग तक: हर पीढ़ी ने कंप्यूटिंग को छोटा, तेज और अधिक उपयोगी बनाया।"}</div>
                  <div className="mt-3 flex gap-2">
                    <button onClick={() => { setActiveId(data.generations[0].id); window.scrollTo({ top: 0, behavior: "smooth" }); }} className="px-3 py-2 rounded-lg border">{lang === "en" ? "Start" : "शुरू"}</button>
                    <button onClick={() => setActiveId(data.generations[data.generations.length - 1].id)} className="px-3 py-2 rounded-lg border">{lang === "en" ? "Jump to Future" : "भविष्य पर जाएँ"}</button>
                  </div>
                </div>
              </div>
            </motion.div>

          </div>
        </div>
      </div>
    </section>
  );
}

/**
 * Small helper components used above but defined after export to keep file tidy.
 */

function StoryPeekSVG() {
  return (
    <svg viewBox="0 0 160 120" className="w-36 h-28" xmlns="http://www.w3.org/2000/svg">
      <rect x="4" y="6" width="152" height="108" rx="10" fill="#eef2ff" />
      <g>
        <rect x="18" y="18" width="60" height="10" rx="4" fill="#c7d2fe" />
        <rect x="18" y="34" width="110" height="8" rx="4" fill="#e9d5ff" />
        <rect x="18" y="50" width="80" height="8" rx="4" fill="#bbf7d0" />
      </g>
    </svg>
  );
}

function FaPrintIconFallback() {
  // Some environments don't like importing FaPrint; fallback to simple svg icon
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M19 8H5V3H19V8Z" stroke="#0f172a" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M19 21H5V14H19V21Z" stroke="#0f172a" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M7 14V9H17V14" stroke="#0f172a" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
