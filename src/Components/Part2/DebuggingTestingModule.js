import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import {
    FaBug,
    FaSearch,
    FaTools,
    FaCheckCircle,
    FaTimesCircle,
    FaPlay,
    FaCode,
    FaBook,
    FaWrench,
    FaShieldAlt,
    FaSpinner,
} from "react-icons/fa";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";


const COVERAGE_DATA = [
    { name: "Covered", value: 78 },
    { name: "Not Covered", value: 22 },
];
const COLORS = ["#10B981", "#EF4444"];

const bilingual = {
    en: {
        title: "Debugging & Testing",
        subtitle: "Find bugs, fix them, and verify your software works the way it should.",
        concept:
            "The process of finding and fixing errors (bugs) and ensuring the software works correctly.",
        analogy:
            "A detective looks for clues (bugs) and an inspector ensures everything is up to code.",
        why: [
            "Improves reliability and user trust.",
            "Prevents regressions and reduces maintenance costs.",
            "Helps find edge-cases before users do.",
        ],
        pros: [
            "Catches errors early.",
            "Improves code quality.",
            "Builds confidence for releases.",
        ],
        cons: [
            "Takes time to write tests (but saves time later).",
            "False confidence with poor tests.",
        ],
        how: [
            "Reproduce: Make the bug appear consistently.",
            "Isolate: Minimize the failing scope.",
            "Fix: Implement a minimal, well-tested fix.",
            "Verify: Add tests and run full suite.",
            "Review & CI: Peer review and automated pipelines.",
        ],
        tools: [
            "Jest / Vitest (unit)",
            "React Testing Library (DOM)",
            "Cypress / Playwright (E2E)",
            "ESLint (static checks)",
            "Prettier (formatting)",
            "CI: GitHub Actions / GitLab CI",
        ],
        examples: [
            "Student example: Your calculator app shows wrong total — write a unit test for the add function.",
            "Project example: Form validation failing for edge case email formats — add DOM tests + E2E signup flow.",
        ],
        runTests: "Run Tests",
        runAgain: "Run Again",
        coverageLabel: "Sample Coverage",
        copySnippet: "Copy snippet",
    },
    hi: {
        title: "डीबगिंग और टेस्टिंग",
        subtitle: "खामियों (bugs) को ढूँढना, ठीक करना, और यह सुनिश्चित करना कि सॉफ़्टवेयर सही काम कर रहा है।",
        concept: "त्रुटियों (बग्स) को खोजने और ठीक करने की प्रक्रिया, तथा सॉफ़्टवेयर की सही कार्यक्षमता की पुष्टि।",
        analogy:
            "एक जासूस सुराग (bugs) ढूँढता है और एक निरीक्षक यह सुनिश्चित करता है कि सब कुछ नियमों के अनुसार है।",
        why: [
            "विश्वसनीयता और उपयोगकर्ता भरोसा बढ़ता है।",
            "तकरारों/बग्स को रोका जाता है और रखरखाव की लागत घटती है।",
            "उपयोगकर्ताओं के सामने आने से पहले edge-cases मिल जाते हैं।",
        ],
        pros: [
            "त्रुटियाँ पहले पकड़ी जाती हैं।",
            "कोड की गुणवत्ता सुधरती है।",
            "रिलीज़ के लिए आत्मविश्वास बनता है।",
        ],
        cons: [
            "टेस्ट लिखने में समय लगता है (पर बाद में बचत होती है)।",
            "कमज़ोर टेस्ट से गलत सुरक्षा मिल सकती है।",
        ],
        how: [
            "पुनरुत्पादन: बग को स्थायी रूप से दिखाएँ।",
            "अलग करें: असफल हिस्से को छोटा करें।",
            "ठीक करें: न्यूनतम, परीक्षण-सहित fix लागू करें।",
            "सत्यापन: टेस्ट जोड़ें और पूरी टेस्ट-सूट चलाएँ।",
            "रिव्यू और CI: सहकर्मी समीक्षा और स्वचालित पाइपलाइन्स।",
        ],
        tools: [
            "Jest / Vitest (unit)",
            "React Testing Library (DOM)",
            "Cypress / Playwright (E2E)",
            "ESLint (static checks)",
            "Prettier (formatting)",
            "CI: GitHub Actions / GitLab CI",
        ],
        examples: [
            "छात्र उदाहरण: आपके कैलकुलेटर ऐप में गलत कुल दिखता है — add फ़ंक्शन के लिए unit test लिखें।",
            "प्रोजेक्ट उदाहरण: फॉर्म वेलिडेशन कुछ ईमेल फ़ॉर्मैट्स पर fail हो रहा है — DOM टेस्ट और E2E signup flow जोड़ें।",
        ],
        runTests: "टेस्ट चलाएँ",
        runAgain: "फिर चलाएँ",
        coverageLabel: "नमूना कवरेज",
        copySnippet: "स्निपेट कॉपी करें",
    },
};

const SAMPLE_TEST_SNIPPET = `// Example: sum.test.js (Jest)
import { sum } from './utils';

describe('sum', () => {
  it('adds positive numbers', () => {
    expect(sum(1, 2)).toBe(3);
  });

  it('handles zero', () => {
    expect(sum(0, 5)).toBe(5);
  });
});
`;

export default function DebuggingTestingModule() {
    const [lang, setLang] = useState("en");
    const t = bilingual[lang];

    const [running, setRunning] = useState(false);
    const [progress, setProgress] = useState(0);
    const [passed, setPassed] = useState(null);
    const [copied, setCopied] = useState(false);

    const intervalRef = useRef(null);

    useEffect(() => {
        return () => {
            if (intervalRef.current) clearInterval(intervalRef.current);
        };
    }, []);

    function startTests() {
        setRunning(true);
        setProgress(0);
        setPassed(null);
        intervalRef.current = setInterval(() => {
            setProgress((p) => {
                if (p >= 100) {
                    clearInterval(intervalRef.current);
                    // random pass/fail for demo
                    const didPass = Math.random() > 0.12; // mostly pass
                    setPassed(didPass);
                    setRunning(false);
                    return 100;
                }
                return Math.min(100, p + Math.random() * 12);
            });
        }, 300);
    }

    function copySnippet() {
        navigator.clipboard
            .writeText(SAMPLE_TEST_SNIPPET)
            .then(() => {
                setCopied(true);
                setTimeout(() => setCopied(false), 2000);
            })
            .catch(() => {
                setCopied(false);
            });
    }

    return (
        <div className="p-6 md:p-10 lg:p-16 bg-gradient-to-b from-sky-50 to-white min-h-screen">
            <div className="max-w-7xl mx-auto">
                <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-4">
                        <motion.div
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ duration: 0.4 }}
                            className="bg-white/80 backdrop-blur p-2 rounded-lg shadow"
                            aria-hidden
                        >
                            <FaSearch className="text-sky-600 w-6 h-6" />
                        </motion.div>

                        <div>
                            <motion.h1
                                initial={{ y: -10, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.05 }}
                                className="text-2xl md:text-3xl font-extrabold text-sky-800"
                            >
                                {t.title}
                            </motion.h1>
                            <motion.p
                                initial={{ y: -6, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                className="text-sm text-sky-600"
                            >
                                {t.subtitle}
                            </motion.p>
                        </div>
                    </div>

                    <div className="flex items-center gap-3">
                        <div className="text-xs text-slate-600 mr-1">EN / HI</div>
                        <div className="inline-flex rounded-full bg-white/70 p-1 shadow">
                            <button
                                onClick={() => setLang("en")}
                                className={`px-3 py-1 rounded-full text-sm font-medium ${lang === "en" ? "bg-sky-600 text-white" : "text-slate-700"
                                    }`}
                                aria-pressed={lang === "en"}
                            >
                                EN
                            </button>
                            <button
                                onClick={() => setLang("hi")}
                                className={`px-3 py-1 rounded-full text-sm font-medium ${lang === "hi" ? "bg-sky-600 text-white" : "text-slate-700"
                                    }`}
                                aria-pressed={lang === "hi"}
                            >
                                HI
                            </button>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Left: Content */}
                    <div className="lg:col-span-2 space-y-6">
                        <motion.div
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.05 }}
                            className="bg-white rounded-2xl p-6 shadow"
                        >
                            <h3 className="text-lg font-semibold flex items-center gap-3">
                                <FaTools className="w-5 h-5 text-sky-500" /> {lang === "en" ? "Concept" : "संकल्पना"}
                            </h3>
                            <p className="mt-3 text-slate-700">{t.concept}</p>

                            <div className="mt-6 grid md:grid-cols-2 gap-4">
                                <div>
                                    <h4 className="text-sm font-medium text-slate-600">{lang === "en" ? "Analogy" : "उपमा"}</h4>
                                    <p className="mt-2 text-slate-700">{t.analogy}</p>

                                    <div className="mt-4">
                                        <h4 className="text-sm font-medium text-slate-600">{lang === "en" ? "Why needed" : "क्यों ज़रूरी है"}</h4>
                                        <ul className="mt-2 list-disc list-inside text-slate-700">
                                            {t.why.map((w, i) => (
                                                <li key={i}>{w}</li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>

                                <div>
                                    <h4 className="text-sm font-medium text-slate-600">{lang === "en" ? "Pros" : "फ़ायदे"}</h4>
                                    <ul className="mt-2 list-disc list-inside text-slate-700">
                                        {t.pros.map((p, i) => (
                                            <li key={i}>{p}</li>
                                        ))}
                                    </ul>

                                    <h4 className="text-sm font-medium text-slate-600 mt-4">{lang === "en" ? "Cons" : "नुकसान"}</h4>
                                    <ul className="mt-2 list-disc list-inside text-slate-700">
                                        {t.cons.map((c, i) => (
                                            <li key={i}>{c}</li>
                                        ))}
                                    </ul>
                                </div>
                            </div>

                            <div className="mt-6">
                                <h4 className="text-sm font-medium text-slate-600">{lang === "en" ? "How professionals do it" : "प्रोफेशनल इसे कैसे करते हैं"}</h4>
                                <ol className="mt-3 list-decimal list-inside text-slate-700">
                                    {t.how.map((s, i) => (
                                        <li key={i} className="py-1">
                                            {s}
                                        </li>
                                    ))}
                                </ol>
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: -6 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.07 }}
                            className="bg-white rounded-2xl p-6 shadow"
                        >
                            <div className="flex items-start justify-between gap-4">
                                <div>
                                    <h3 className="text-lg font-semibold flex items-center gap-3">
                                        <FaBug className="w-5 h-5 text-rose-500" /> {lang === "en" ? "Tools & Stack" : "उपकरण और स्टैक"}
                                    </h3>
                                    <p className="mt-2 text-slate-700">{lang === "en" ? "Common tools used by developers:" : "डेवलपर्स द्वारा उपयोग किए जाने वाले सामान्य टूल्स:"}</p>

                                    <ul className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-2 text-slate-700">
                                        {t.tools.map((tool, idx) => (
                                            <li key={idx} className="flex items-center gap-2">
                                                <span className="w-7 h-7 flex items-center justify-center bg-sky-50 rounded-full">
                                                    {idx % 2 === 0 ? <FaCheckCircle className="w-4 h-4 text-sky-600" /> : <FaWrench className="w-4 h-4 text-amber-500" />}
                                                </span>
                                                <span>{tool}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                <div className="w-44">
                                    <ResponsiveContainer width="100%" height={120}>
                                        <PieChart>
                                            <Pie data={COVERAGE_DATA} dataKey="value" innerRadius={28} outerRadius={44} paddingAngle={2}>
                                                {COVERAGE_DATA.map((entry, i) => (
                                                    <Cell key={`cell-${i}`} fill={COLORS[i % COLORS.length]} />
                                                ))}
                                            </Pie>
                                            <Tooltip />
                                        </PieChart>
                                    </ResponsiveContainer>
                                    <div className="text-xs text-center mt-1 text-slate-600">{t.coverageLabel}</div>
                                </div>
                            </div>

                            <div className="mt-4 border-t pt-4 flex flex-col sm:flex-row gap-3">
                                <button
                                    onClick={startTests}
                                    disabled={running}
                                    className={`inline-flex items-center gap-2 px-4 py-2 rounded-md shadow text-white ${running ? "bg-slate-400" : "bg-sky-600 hover:bg-sky-700"}`}
                                    aria-disabled={running}
                                >
                                    {running ? <FaSpinner className="animate-spin" /> : <FaPlay />} <span>{running ? t.runTests + '...' : t.runTests}</span>
                                </button>

                                <button
                                    onClick={copySnippet}
                                    className="inline-flex items-center gap-2 px-4 py-2 rounded-md border text-slate-700 hover:bg-slate-50"
                                >
                                    <FaCode /> <span>{t.copySnippet}</span>
                                </button>

                                <div className="flex-1 self-center min-w-0">
                                    <div className="w-full bg-slate-100 rounded-full h-3 overflow-hidden">
                                        <div
                                            className={`h-3 rounded-full transition-all ${passed === true ? "bg-emerald-500" : passed === false ? "bg-rose-500" : "bg-sky-400"}`}
                                            style={{ width: `${progress}%` }}
                                            role="progressbar"
                                            aria-valuenow={Math.round(progress)}
                                            aria-valuemin={0}
                                            aria-valuemax={100}
                                        />
                                    </div>

                                    <div className="mt-2 text-xs text-slate-600 flex items-center gap-2">
                                        <span>{Math.round(progress)}%</span>
                                        {passed === true && (
                                            <span className="inline-flex items-center gap-1 text-emerald-600">
                                                <FaCheckCircle /> {lang === "en" ? "All checks passed" : "सभी चेक पास"}
                                            </span>
                                        )}
                                        {passed === false && (
                                            <span className="inline-flex items-center gap-1 text-rose-600">
                                                <FaTimesCircle /> {lang === "en" ? "Some tests failed" : "कुछ टेस्ट फेल"}
                                            </span>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: -6 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.09 }}
                            className="bg-white rounded-2xl p-6 shadow"
                        >
                            <h3 className="text-lg font-semibold flex items-center gap-3">
                                <FaBook className="w-5 h-5 text-sky-600" /> {lang === "en" ? "Real-life examples for students" : "छात्रों के लिए वास्तविक-जीवन उदाहरण"}
                            </h3>
                            <ul className="mt-3 list-disc list-inside text-slate-700">
                                {t.examples.map((ex, i) => (
                                    <li key={i} className="py-1">
                                        {ex}
                                    </li>
                                ))}
                            </ul>

                            <div className="mt-4 bg-slate-50 rounded p-3">
                                <pre className="whitespace-pre-wrap text-xs text-slate-800 overflow-auto">{SAMPLE_TEST_SNIPPET}</pre>
                                <div className="mt-2 text-xs text-slate-500">{lang === "en" ? "(Jest example)" : "(Jest उदाहरण)"}</div>
                            </div>
                        </motion.div>
                    </div>

                    {/* Right: Visual & Interactive */}
                    <div className="space-y-6">
                        <motion.div
                            initial={{ opacity: 0, y: 6 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.08 }}
                            className="bg-white rounded-2xl p-6 shadow flex flex-col gap-4"
                        >
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="bg-emerald-50 p-2 rounded-md">
                                        <FaSearch className="text-emerald-600 w-5 h-5" />
                                    </div>
                                    <div>
                                        <div className="text-sm font-medium">{lang === "en" ? "Interactive Detective" : "इंटरैक्टिव जासूस"}</div>
                                        <div className="text-xs text-slate-500">{lang === "en" ? "Animated SVG demo" : "एनिमेटेड SVG डेमो"}</div>
                                    </div>
                                </div>

                                <div className="text-xs text-slate-500">{lang === "en" ? "Playful animation for teaching" : "शिक्षण के लिए प्लेफुल एनिमेशन"}</div>
                            </div>

                            {/* SVG Detective + Bugs */}
                            <div className="w-full h-56 relative overflow-hidden rounded-lg bg-gradient-to-b from-sky-50 to-white border">
                                <svg viewBox="0 0 600 220" className="w-full h-full">
                                    {/* ground */}
                                    <rect x="0" y="170" width="600" height="50" fill="#f8fafc"></rect>

                                    {/* Magnifying glass (animated) */}
                                    <motion.g
                                        className="cursor-pointer"
                                        initial={{ x: -60, y: 20 }}
                                        animate={{ x: [-60, 80, 30, 180, 120, 300, 260], y: [20, 12, 18, 24, 10, 18, 12] }}
                                        transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                                    >
                                        <circle cx="40" cy="60" r="28" fill="#fff" stroke="#0ea5b1" strokeWidth="4" opacity="0.95" />
                                        <circle cx="40" cy="60" r="20" fill="#0ea5b1" opacity="0.06" />
                                        <rect x="60" y="82" width="48" height="8" rx="4" transform="rotate(28 84 86)" fill="#c7f0ef" />
                                    </motion.g>

                                    {/* Bugs (moving icons) */}
                                    <motion.g
                                        initial={{ x: 600 }}
                                        animate={{ x: [600, 480, 420, 360, 300, 220, 160, 80, 0, -60] }}
                                        transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
                                    >
                                        <motion.circle animate={{ cy: [140, 130, 138, 132, 140] }} transition={{ duration: 2, yoyo: Infinity }} cx="520" cy="140" r="8" fill="#ef4444" />
                                        <motion.circle animate={{ cy: [150, 145, 148, 142, 150] }} transition={{ duration: 2.4, yoyo: Infinity }} cx="460" cy="150" r="6" fill="#f97316" />
                                        <motion.circle animate={{ cy: [135, 128, 132, 126, 135] }} transition={{ duration: 1.8, yoyo: Infinity }} cx="380" cy="135" r="7" fill="#f59e0b" />
                                    </motion.g>

                                    {/* Simple 'clue' marker */}
                                    <motion.g
                                        initial={{ scale: 0 }}
                                        animate={{ scale: [0, 1.04, 1] }}
                                        transition={{ delay: 1.2, duration: 1.6 }}
                                        transform="translate(260, 50)"
                                    >
                                        <rect x="0" y="0" width="120" height="60" rx="10" fill="#fff" stroke="#93c5fd" />
                                        <text x="14" y="28" fontSize="12" fill="#0f172a">{lang === "en" ? "Bug: off-by-one" : "बग: ऑफ-बाय-वन"}</text>
                                        <text x="14" y="44" fontSize="10" fill="#475569">{lang === "en" ? "Clue: index error" : "सुराग: इंडेक्स त्रुटि"}</text>
                                    </motion.g>
                                </svg>

                                {/* faint decorative bugs (CSS animated) */}
                                <div className="absolute left-4 top-4 opacity-60">
                                    <div className="bug w-4 h-4 rounded-full" />
                                </div>
                                <div className="absolute right-6 bottom-8 opacity-70">
                                    <div className="bug w-3 h-3 rounded-full" />
                                </div>

                                <style>{`
                  .bug { background: linear-gradient(180deg,#f43f5e,#fb923c); box-shadow: 0 1px 6px rgba(0,0,0,0.08); animation: roam 6s linear infinite; }
                  @keyframes roam { 0%{transform: translate(0,0)} 25%{transform: translate(18px,-10px)} 50%{transform: translate(-6px,12px)} 75%{transform: translate(-18px,-6px)} 100%{transform: translate(0,0)} }
                `}</style>
                            </div>

                            <div className="text-xs text-slate-500">{lang === "en" ? "Tip: Use the magnifying glass to imagine isolating code paths." : "टिप: मैग्नीफाइंग ग्लास का कल्पना करें कि यह कोड पाथ्स को अलग कर रहा है।"}</div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 6 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="bg-white rounded-2xl p-6 shadow"
                        >
                            <h4 className="text-sm font-medium text-slate-700">{lang === "en" ? "Quick Checklist" : "त्वरित चेकलिस्ट"}</h4>
                            <ul className="mt-3 text-slate-700 list-inside">
                                <li className="flex items-center gap-2 py-1"><FaSearch className="w-4 h-4 text-sky-500" /> {lang === "en" ? "Reproduce the issue" : "समस्या को पुनरुत्पन्न करें"}</li>
                                <li className="flex items-center gap-2 py-1"><FaCode className="w-4 h-4 text-sky-500" /> {lang === "en" ? "Write a failing test" : "एक फेलिंग टेस्ट लिखें"}</li>
                                <li className="flex items-center gap-2 py-1"><FaWrench className="w-4 h-4 text-sky-500" /> {lang === "en" ? "Apply minimal fix" : "न्यूनतम फिक्स लागू करें"}</li>
                                <li className="flex items-center gap-2 py-1"><FaShieldAlt className="w-4 h-4 text-sky-500" /> {lang === "en" ? "Add regression test" : "रिग्रेशन टेस्ट जोड़ें"}</li>
                            </ul>
                        </motion.div>

                        <div className="text-xs text-slate-400">{lang === "en" ? "This component is ready to drop into a Tailwind + React project. See usage notes below." : "यह घटक Tailwind + React प्रोजेक्ट में जोड़ने के लिए तैयार है। नीचे उपयोग नोट देखें।"}</div>
                    </div>
                </div>

                {/* Footer / usage notes */}
                <div className="mt-8 bg-white rounded-2xl p-6 shadow">
                    <h4 className="font-semibold text-slate-700 mb-2">{lang === "en" ? "Usage & Notes" : "उपयोग और नोट्स"}</h4>
                    <div className="text-sm text-slate-600">
                        <p>
                            {lang === "en"
                                ? "1) Copy this file into your React project (e.g., src/components/DebuggingTestingModule.jsx)."
                                : "1) इस फ़ाइल को अपने React प्रोजेक्ट में कॉपी करें (उदा., src/components/DebuggingTestingModule.jsx)।"}
                        </p>
                        <p className="mt-2">
                            {lang === "en"
                                ? "2) Install dependencies: framer-motion, react-icons, recharts. Ensure Tailwind is configured in your project."
                                : "2) निर्भरता स्थापित करें: framer-motion, react-icons, recharts। सुनिश्चित करें कि आपके प्रोजेक्ट में Tailwind कॉन्फ़िगर है।"}
                        </p>

                        <pre className="mt-3 bg-slate-50 p-3 rounded text-xs text-slate-700">
                            {`npm install framer-motion react-icons recharts --save
# or
# yarn add framer-motion react-icons recharts`}
                        </pre>

                        <p className="mt-3">
                            {lang === "en"
                                ? "3) Optional: Replace the sample test snippet with your own snippets or connect the run button to a real CI endpoint."
                                : "3) वैकल्पिक: सैंपल टेस्ट स्निपेट को अपने स्निपेट से बदलें या रन बटन को वास्तविक CI endpoint से जोड़ें।"}
                        </p>

                        <p className="mt-3 text-xs text-slate-500">{lang === "en" ? "Happy debugging! 🕵️‍♂️" : "सुखद डीबगिंग! 🕵️"}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
