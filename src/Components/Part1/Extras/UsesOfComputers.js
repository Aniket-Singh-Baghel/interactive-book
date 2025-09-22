import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import {
    FaUniversity,
    FaHospital,
    FaBriefcase,
    FaMoneyBillWave,
    FaMusic,
    FaComments,
    FaFlask,
    FaHome,
    FaArrowLeft,
    FaArrowRight,
    FaRobot,
} from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";

// Multilingual content with 'key' for consistent icon mapping
const content = {
    en: {
        home: "Home",
        previous: "Previous",
        next: "Next",
        title: "Uses of Computers",
        subtitle: "Where and how computers help us in daily life",
        sections: [
            {
                key: "education",
                icon: "🎓",
                title: "Education",
                points: [
                    "Computers make learning **interactive** with **smart classrooms** and **digital boards**.",
                    "Access to **online courses**, **e-books**, and **digital libraries** anytime, anywhere.",
                    "**Virtual labs** and **simulation software** help students perform experiments safely.",
                    "Teachers use **projectors**, **tablets**, and **ICT tools** to explain concepts better.",
                ],
            },
            {
                key: "healthcare",
                icon: "🏥",
                title: "Healthcare",
                points: [
                    "**Patient records** and hospital data are stored securely in **databases**.",
                    "**MRI, CT Scans**, and **X-rays** depend on computer-controlled machines.",
                    "**Robotic surgeries** are guided by advanced computer systems.",
                    "**Telemedicine** and **real-time monitoring devices** connect doctors with patients remotely.",
                ],
            },
            {
                key: "business",
                icon: "💼",
                title: "Business",
                points: [
                    "**Accounting software** and **ERP systems** manage company finances.",
                    "Companies use **video conferencing** and **emails** for global communication.",
                    "Large firms depend on **cloud platforms** and **servers** for data storage.",
                    "**ICT tools** help in **decision-making** with accurate reports and analysis.",
                ],
            },
            {
                key: "banking",
                icon: "🏦",
                title: "Banking",
                points: [
                    "**ATMs** and **online banking systems** are fully computer-controlled.",
                    "**Core Banking Systems (CBS)** manage transactions across all branches.",
                    "**Internet banking** and **mobile apps** allow secure money transfers.",
                    "Computers detect **fraud** using **AI-powered security systems**.",
                    "Bank staff use **data servers** for customer records and financial reports.",
                ],
            },
            {
                key: "entertainment",
                icon: "🎶",
                title: "Entertainment",
                points: [
                    "**Movies, music, and games** are powered by **multimedia software**.",
                    "Computers are used in **editing**, **animation**, and **special effects**.",
                    "**Virtual Reality (VR)** and **3D gaming** provide immersive experiences.",
                    "**Streaming platforms** like YouTube, Netflix rely on powerful computer servers.",
                ],
            },
            {
                key: "communication",
                icon: "📱",
                title: "Communication",
                points: [
                    "**Instant messaging apps** and **emails** make fast communication possible.",
                    "**Video calls** and **conferencing** connect people worldwide.",
                    "**Social media platforms** depend on ICT networks and data centers.",
                    "**Mobile applications** are powered by **computer systems** behind the scenes.",
                ],
            },
            {
                key: "science",
                icon: "🔬",
                title: "Science & Research",
                points: [
                    "**Supercomputers** perform **complex calculations** and data analysis.",
                    "**AI and Machine Learning** help in drug discovery and **climate studies**.",
                    "**Simulations** and **data visualization software** improve research accuracy.",
                    "**Space exploration** and **satellite launches** rely heavily on computers.",
                ],
            },
            {
                key: "analogy",
                icon: "🤖",
                title: "Analogy: A Helpful Robot",
                points: [
                    "Think of a computer as a **super-fast robot** that follows your commands.",
                    "It can **remember** huge amounts of information, like a robot with a giant brain.",
                    "It **calculates** numbers in a flash, like a robot solving puzzles instantly.",
                    "It **connects** you to friends, just like a robot delivering messages anywhere in the world.",
                ],
            },
        ],
        conclusion:
            "Computers and ICT systems make education **smarter**, healthcare **safer**, business **faster**, banking **secure**, entertainment **richer**, communication **stronger**, and research **deeper**.",
    },

    hi: {
        home: "होम",
        previous: "पिछला",
        next: "अगला",
        title: "कंप्यूटर का उपयोग",
        subtitle: "हमारे दैनिक जीवन में कंप्यूटर कहाँ और कैसे मदद करते हैं",
        sections: [
            {
                key: "education",
                icon: "🎓",
                title: "शिक्षा",
                points: [
                    "कंप्यूटर शिक्षा को **इंटरैक्टिव** बनाते हैं, जैसे **स्मार्ट क्लासरूम** और **डिजिटल बोर्ड**।",
                    "**ऑनलाइन कोर्स**, **ई-पुस्तकें** और **डिजिटल लाइब्रेरी** हर समय उपलब्ध रहती हैं।",
                    "**वर्चुअल लैब्स** और **सिमुलेशन सॉफ़्टवेयर** सुरक्षित प्रयोग करने में मदद करते हैं।",
                    "शिक्षक **प्रोजेक्टर**, **टैबलेट** और **ICT उपकरणों** से बेहतर पढ़ा सकते हैं।",
                ],
            },
            {
                key: "healthcare",
                icon: "🏥",
                title: "स्वास्थ्य",
                points: [
                    "**रोगियों का रिकॉर्ड** और अस्पताल डेटा **डेटाबेस** में सुरक्षित रहता है।",
                    "**MRI, CT स्कैन** और **X-ray** कंप्यूटर नियंत्रित मशीनों पर आधारित हैं।",
                    "**रोबोटिक सर्जरी** उन्नत कंप्यूटर सिस्टम द्वारा संचालित होती हैं।",
                    "**टेलीमेडिसिन** और **रीयल-टाइम डिवाइस** डॉक्टरों और मरीजों को दूर से जोड़ते हैं।",
                ],
            },
            {
                key: "business",
                icon: "💼",
                title: "व्यापार",
                points: [
                    "**अकाउंटिंग सॉफ़्टवेयर** और **ERP सिस्टम** कंपनी की वित्तीय व्यवस्था संभालते हैं।",
                    "**वीडियो कॉन्फ्रेंसिंग** और **ईमेल** से वैश्विक संचार संभव होता है।",
                    "**क्लाउड प्लेटफ़ॉर्म** और **सर्वर** बड़े डेटा को संग्रहित करते हैं।",
                    "**ICT उपकरण** रिपोर्ट और विश्लेषण के माध्यम से निर्णय लेने में मदद करते हैं।",
                ],
            },
            {
                key: "banking",
                icon: "🏦",
                title: "बैंकिंग",
                points: [
                    "**ATM मशीनें** और **ऑनलाइन बैंकिंग सिस्टम** पूरी तरह कंप्यूटर पर आधारित हैं।",
                    "**कोर बैंकिंग सिस्टम (CBS)** सभी शाखाओं के लेनदेन प्रबंधित करते हैं।",
                    "**इंटरनेट बैंकिंग** और **मोबाइल ऐप्स** से सुरक्षित पैसे का लेनदेन होता है।",
                    "कंप्यूटर **एआई सुरक्षा सिस्टम** से **धोखाधड़ी** की पहचान करते हैं।",
                    "बैंक कर्मचारी **डेटा सर्वर** से ग्राहक रिकॉर्ड और वित्तीय रिपोर्ट संभालते हैं।",
                    "**UPI और डिजिटल वॉलेट** आज के समय में सबसे तेज़ और सुरक्षित भुगतान प्रणाली है।",

                ],

            },
            {
                key: "entertainment",
                icon: "🎶",
                title: "मनोरंजन",
                points: [
                    "**फिल्में, संगीत और गेम्स** **मल्टीमीडिया सॉफ़्टवेयर** से चलते हैं।",
                    "कंप्यूटर **एडिटिंग**, **एनीमेशन** और **स्पेशल इफेक्ट्स** में उपयोग होते हैं।",
                    "**वर्चुअल रियलिटी (VR)** और **3D गेमिंग** रोमांचक अनुभव देते हैं।",
                    "**स्ट्रीमिंग प्लेटफ़ॉर्म** (यूट्यूब, नेटफ्लिक्स) शक्तिशाली कंप्यूटर सर्वर पर चलते हैं।",
                ],
            },
            {
                key: "communication",
                icon: "📱",
                title: "संचार",
                points: [
                    "**मैसेजिंग ऐप्स** और **ईमेल** तेज़ संचार में मदद करते हैं।",
                    "**वीडियो कॉल** और **कांफ्रेंसिंग** से दुनिया जुड़ी रहती है।",
                    "**सोशल मीडिया प्लेटफ़ॉर्म** ICT नेटवर्क पर आधारित हैं।",
                    "**मोबाइल ऐप्स** के पीछे **कंप्यूटर सिस्टम** काम करते हैं।",
                ],
            },
            {
                key: "science",
                icon: "🔬",
                title: "विज्ञान और अनुसंधान",
                points: [
                    "**सुपरकंप्यूटर** जटिल गणनाएँ और **डेटा विश्लेषण** करते हैं।",
                    "**एआई और मशीन लर्निंग** नई दवाइयों और **जलवायु अध्ययन** में मदद करते हैं।",
                    "**सिमुलेशन** और **डेटा विज़ुअलाइजेशन सॉफ़्टवेयर** अनुसंधान की सटीकता बढ़ाते हैं।",
                    "**अंतरिक्ष अन्वेषण** और **उपग्रह प्रक्षेपण** पूरी तरह कंप्यूटर पर आधारित हैं।",
                ],
            },
            {
                key: "analogy",
                icon: "🤖",
                title: "सादृश्य: एक सहायक रोबोट",
                points: [
                    "एक कंप्यूटर को एक **सुपर-फास्ट रोबोट** के रूप में सोचें जो आपके आदेशों का पालन करता है।",
                    "यह एक विशाल मस्तिष्क वाले रोबोट की तरह बड़ी मात्रा में जानकारी **याद रख** सकता है।",
                    "यह एक फ्लैश में संख्याओं की **गणना करता** है, जैसे एक रोबोट तुरंत पहेलियाँ सुलझाता है।",
                    "यह आपको दोस्तों से **जोड़ता** है, ठीक उसी तरह जैसे एक रोबोट दुनिया में कहीं भी संदेश पहुंचाता है।",
                ],
            },
        ],
        conclusion:
            "कंप्यूटर और ICT सिस्टम शिक्षा को **स्मार्ट**, स्वास्थ्य को **सुरक्षित**, व्यापार को **तेज़**, बैंकिंग को **सुरक्षित**, मनोरंजन को **समृद्ध**, संचार को **मजबूत** और अनुसंधान को **गहरा** बनाते हैं।",
    },
};

// Map keys to icons (consistent across languages)
const iconMap = {
    education: FaUniversity,
    healthcare: FaHospital,
    business: FaBriefcase,
    banking: FaMoneyBillWave,
    entertainment: FaMusic,
    communication: FaComments,
    science: FaFlask,
    analogy: FaRobot,
};

// Motion variants
const cardVariant = {
    hidden: { opacity: 0, y: 12 },
    visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 110, damping: 14 } },
};
const listVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.09 } },
};
const itemVariant = {
    hidden: { opacity: 0, x: -18 },
    visible: { opacity: 1, x: 0, transition: { type: "spring", stiffness: 140 } },
};

// Simple parser to convert **bold** into <strong>
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

export default function UsesOfComputersComponent() {
    const [lang, setLang] = useState("en");
    const navigate = useNavigate();
    const t = content[lang];
    const { title, subtitle, sections, conclusion } = t;
    const pdfRef = useRef();

    useEffect(() => {
        const handleKeyDown = (event) => {
            if (event.ctrlKey && event.key === 'k') {
                event.preventDefault();
                setLang(prevLang => prevLang === 'en' ? 'hi' : 'en');
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, []);

    return (
        <div className="p-4 sm:p-6 lg:p-8 min-h-screen bg-gradient-to-br from-blue-50 to-green-50 font-sans">
            <div className="max-w-5xl mx-auto" ref={pdfRef}>
                <div className="flex items-center justify-between mb-8">
                    <Link to="/parts/prt1" className="inline-flex items-center px-4 py-2 bg-white rounded-full shadow-md border border-gray-200 hover:bg-gray-100 transition">
                        <FaHome className="mr-2 text-lg text-sky-600" />
                        {t.home}
                    </Link>
                    <div className="flex space-x-2">
                        <button onClick={() => setLang("en")} className={`px-3 py-1 rounded-lg border font-semibold ${lang === "en" ? "bg-sky-600 text-white border-sky-600" : "bg-white text-gray-700 border-gray-300"} transition`}>EN</button>
                        <button onClick={() => setLang("hi")} className={`px-3 py-1 rounded-lg border font-semibold ${lang === "hi" ? "bg-sky-600 text-white border-sky-600" : "bg-white text-gray-700 border-gray-300"} transition`}>हिं</button>
                    </div>
                </div>

                <div className="relative rounded-3xl overflow-hidden bg-white shadow-2xl p-8 md:p-12 text-center">
                    {/* Decorative animated SVG - subtle organic blobs and drifting circles */}
                    <motion.div
                        aria-hidden
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 0.55 }}
                        transition={{ duration: 1 }}
                        className="absolute inset-0 -z-10"
                    >
                        <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 800 300" xmlns="http://www.w3.org/2000/svg">
                            <defs>
                                <linearGradient id="g1" x1="0" x2="1">
                                    <stop offset="0%" stopColor="#eef2ff" />
                                    <stop offset="100%" stopColor="#eefaf6" />
                                </linearGradient>
                            </defs>
                            <motion.path
                                d="M0 120 C150 10 350 230 800 80 L800 300 L0 300 Z"
                                fill="url(#g1)"
                                initial={{ pathLength: 0 }}
                                animate={{ pathLength: [0, 1] }}
                                transition={{ duration: 1.2 }}
                            />
                            <motion.circle
                                cx="120"
                                cy="40"
                                r="18"
                                animate={{ y: [0, -8, 0], opacity: [0.7, 1, 0.7] }}
                                transition={{ repeat: Infinity, duration: 4 }}
                                fill="#e9d5ff"
                            />
                            <motion.circle
                                cx="700"
                                cy="60"
                                r="12"
                                animate={{ y: [0, 6, 0], opacity: [0.6, 1, 0.6] }}
                                transition={{ repeat: Infinity, duration: 3.6 }}
                                fill="#dcfce7"
                            />
                        </svg>
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: -6, scale: 0.98 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        transition={{ duration: 0.6 }}
                        className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900"
                    >
                        {title}
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.12 }}
                        className="mt-2 text-slate-600 max-w-xl mx-auto"
                    >
                        {subtitle}
                    </motion.p>
                </div>

                {/* CARDS GRID */}
                <div className="mt-8 grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                    {sections.map((sec, idx) => {
                        const Icon = iconMap[sec.key] || FaUniversity;
                        return (
                            <motion.article
                                key={sec.title + idx}
                                variants={cardVariant}
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true, amount: 0.12 }}
                                whileHover={{ scale: 1.05, y: -5, boxShadow: "0px 10px 20px rgba(0,0,0,0.1)" }}
                                className="relative bg-white rounded-2xl p-6 shadow-md transition-all"
                            >
                                <div className="flex items-start gap-4">
                                    <motion.div
                                        className="flex-none w-14 h-14 rounded-lg bg-indigo-50/70 flex items-center justify-center ring-1 ring-indigo-100"
                                        animate={{ y: [0, -6, 0] }}
                                        transition={{ repeat: Infinity, duration: 4.2, ease: "easeInOut" }}
                                    >
                                        <Icon className="w-6 h-6 text-indigo-600" />
                                    </motion.div>

                                    <div className="min-w-0 flex-1">
                                        <h3 className="text-lg font-semibold text-slate-900 flex items-center gap-2">
                                            {sec.title} <span className="text-xl">{sec.icon}</span>
                                        </h3>
                                        <motion.ul
                                            initial="hidden"
                                            whileInView="visible"
                                            variants={listVariants}
                                            viewport={{ once: true, amount: 0.2 }}
                                            className="mt-3 space-y-2 text-slate-700 text-sm"
                                        >
                                            {sec.points.map((pt, i) => (
                                                <motion.li
                                                    key={i}
                                                    variants={itemVariant}
                                                    className="flex items-start gap-3"
                                                >
                                                    <div className="mt-1 text-indigo-600 font-bold">•</div>
                                                    <div className="leading-relaxed">{renderWithBold(pt)}</div>
                                                </motion.li>
                                            ))}
                                        </motion.ul>
                                    </div>
                                </div>
                            </motion.article>
                        );
                    })}
                </div>

                {/* CONCLUSION / CTA */}
                <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mt-10 rounded-2xl bg-gradient-to-r from-indigo-50/40 to-white p-6 flex flex-col sm:flex-row items-center justify-between gap-4"
                >
                    <div className="text-slate-900 font-semibold text-sm sm:text-base">{renderWithBold(conclusion)}</div>
                </motion.div>
            </div>
            <div className="w-full flex justify-between items-center mt-10 p-4 bg-gray-100 rounded-lg shadow-md">
                <button
                    onClick={() => navigate('/part1/what-is-computer')}
                    className="flex items-center gap-2 px-4 py-2 bg-purple-200 hover:bg-purple-300 text-purple-900 rounded-lg shadow transition"
                >
                    <FaArrowLeft />
                    {t.previous}
                </button>
                <button
                    onClick={() => navigate('/part1/computer-hardware')}
                    className="flex items-center gap-2 px-4 py-2 bg-green-200 hover:bg-green-300 text-green-900 rounded-lg shadow transition"
                >
                    {t.next}
                    <FaArrowRight />
                </button>
            </div>
        </div>
    );
}
