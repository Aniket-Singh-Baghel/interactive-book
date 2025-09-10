import { motion } from "framer-motion";
import { FaCompactDisc, FaArrowLeft, FaArrowRight, FaHome } from "react-icons/fa";
import { GiArchiveRegister } from "react-icons/gi";
import { Link, useNavigate } from "react-router-dom";
import React, { useState } from "react";

const content = {
    en: {
        home: "Home",
        title: "📀 Tertiary Storage",
        intro: "Tertiary means **third level** storage. 💡 Think of it like putting old school projects into a box in your attic — safe, but not instantly reachable. It’s slower than primary & secondary storage, but great for **backup and archiving**.",
        takeaway_title: "✨ Key Takeaway",
        takeaway_text: "- **Tertiary Storage** = Rarely used, slower, mostly for **backups & archives**. <br />- Students can spot them because they look like **shiny discs** (CD/DVD/Blu-ray). <br />- Unlike a pendrive or SD card, these aren’t everyday tools — more like long-term shelves 📦.",
        previous: "Previous",
        next: "Next",
        examples: [
            { name: "CD (Compact Disc)", appearance: "Shiny small silver disc, often with rainbow reflections.", advantage: "Cheap & simple to use.", disadvantage: "Low storage (~700MB)." },
            { name: "DVD (Digital Versatile Disc)", appearance: "Looks like a CD but usually labeled 'DVD'; can store movies.", advantage: "More space (~4.7GB).", disadvantage: "Still limited compared to HDDs/SSDs." },
            { name: "Blu-ray Disc", appearance: "Looks similar to a DVD but often has a blue label or box.", advantage: "High capacity (~25–100GB).", disadvantage: "Special drives needed, becoming rare." },
        ],
        appearance_label: "🎨 Appearance: ",
    },
    hi: {
        home: "होम",
        title: "📀 तृतीयक स्टोरेज",
        intro: "तृतीयक का अर्थ है **तीसरे स्तर** का भंडारण। 💡 इसे अपने पुराने स्कूल प्रोजेक्ट्स को अपने अटारी में एक बॉक्स में रखने जैसा समझें - सुरक्षित, लेकिन तुरंत पहुंचने योग्य नहीं। यह प्राथमिक और द्वितीयक भंडारण की तुलना में धीमा है, लेकिन **बैकअप और संग्रह** के लिए बहुत अच्छा है।",
        takeaway_title: "✨ मुख्य निष्कर्ष",
        takeaway_text: "- **तृतीयक स्टोरेज** = शायद ही कभी इस्तेमाल किया जाता है, धीमा, ज्यादातर **बैकअप और अभिलेखागार** के लिए। <br />- छात्र उन्हें पहचान सकते हैं क्योंकि वे **चमकदार डिस्क** (सीडी/डीवीडी/ब्लू-रे) की तरह दिखते हैं। <br />- पेनड्राइव या एसडी कार्ड के विपरीत, ये रोजमर्रा के उपकरण नहीं हैं - बल्कि लंबी अवधि के शेल्फ की तरह हैं 📦।",
        previous: "पिछला",
        next: "अगला",
        examples: [
            { name: "सीडी (कॉम्पैक्ट डिस्क)", appearance: "चमकदार छोटी चांदी की डिस्क, अक्सर इंद्रधनुषी प्रतिबिंबों के साथ।", advantage: "सस्ता और उपयोग में आसान।", disadvantage: "कम भंडारण (~700MB)।" },
            { name: "डीवीडी (डिजिटल वर्सटाइल डिस्क)", appearance: "सीडी की तरह दिखता है लेकिन आमतौर पर 'डीवीडी' का लेबल लगा होता है; फिल्में स्टोर कर सकता है।", advantage: "अधिक स्थान (~4.7GB)।", disadvantage: "एचडीडी/एसएसडी की तुलना में अभी भी सीमित है।" },
            { name: "ब्लू-रे डिस्क", appearance: "डीवीडी के समान दिखता है लेकिन अक्सर नीले लेबल या बॉक्स के साथ आता है।", advantage: "उच्च क्षमता (~25–100GB)।", disadvantage: "विशेष ड्राइव की आवश्यकता है, दुर्लभ होता जा रहा है।" },
        ],
        appearance_label: "🎨 उपस्थिति: ",
    }
};

const HighlightedText = ({ text }) => {
    const parts = text.split(/\*\*(.*?)\*\*/g);
    return (
        <p className="text-lg text-gray-700 text-center">
            {parts.map((part, index) =>
                index % 2 === 1 ? (
                    <span key={index} className="font-bold bg-yellow-200 text-purple-700 px-2 py-1 rounded-md">{part}</span>
                ) : (
                    part
                )
            )}
        </p>
    );
};

const HighlightedList = ({ text }) => {
    const parts = text.split(/\*\*(.*?)\*\*/g);
    return (
        <p className="text-gray-700">
            {parts.map((part, index) =>
                index % 2 === 1 ? (
                    <span key={index} className="font-bold bg-yellow-200 text-purple-700 px-1 rounded">{part}</span>
                ) : (
                    <span dangerouslySetInnerHTML={{ __html: part }} />
                )
            )}
        </p>
    );
};

export default function TertiaryStorage() {
    const [lang, setLang] = useState('en');
    const navigate = useNavigate();
    const t = content[lang];

    return (
        <div className="p-4 sm:p-6 lg:p-8 min-h-screen bg-gradient-to-br from-yellow-50 via-pink-50 to-purple-100 flex flex-col items-center font-sans">
            <div className="w-full max-w-6xl">
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

                <motion.h1 initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 0.6 }} className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-center mb-8 text-purple-700">{t.title}</motion.h1>

                <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} className="mb-6">
                    <HighlightedText text={t.intro} />
                </motion.div>

                <div className="flex justify-center my-10">
                    <motion.div animate={{ scale: [1, 1.1, 1] }} transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}>
                        <GiArchiveRegister className="text-5xl text-purple-600" />
                    </motion.div>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    {t.examples.map((ex, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, rotateY: 90 }}
                            whileInView={{ opacity: 1, rotateY: 0 }}
                            whileHover={{ scale: 1.05, rotate: 2 }}
                            transition={{ duration: 0.7, delay: i * 0.1 }}
                            className="bg-purple-50 border border-purple-200 rounded-2xl shadow-lg p-6 cursor-pointer hover:shadow-2xl"
                        >
                            <div className="flex justify-center mb-3">
                                <FaCompactDisc className="text-purple-500 text-4xl animate-pulse" />
                            </div>
                            <h3 className="text-lg font-bold mb-2 text-purple-700 text-center">{ex.name}</h3>
                            <p className="text-sm text-gray-700 mb-2"><strong>{t.appearance_label}</strong>{ex.appearance}</p>
                            <p className="text-sm text-green-600 mb-1">✅ {ex.advantage}</p>
                            <p className="text-sm text-red-600">❌ {ex.disadvantage}</p>
                        </motion.div>
                    ))}
                </div>

                <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="mt-12 p-6 bg-gray-100 rounded-2xl shadow-md">
                    <h3 className="font-semibold text-xl lg:text-2xl mb-2 text-purple-700">{t.takeaway_title}</h3>
                    <HighlightedList text={t.takeaway_text} />
                </motion.div>

                <div className="w-full flex justify-between items-center mt-12 p-4 bg-gray-100 rounded-lg shadow-md">
                    <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={() => navigate('/part1/peripherals')} className="flex items-center gap-2 px-4 py-2 bg-purple-200 hover:bg-purple-300 text-purple-900 rounded-lg shadow transition"><FaArrowLeft />{t.previous}</motion.button>
                    <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={() => navigate('/part1/other-storage-types')} className="flex items-center gap-2 px-4 py-2 bg-green-200 hover:bg-green-300 text-green-900 rounded-lg shadow transition">{t.next}<FaArrowRight /></motion.button>
                </div>
            </div>
        </div>
    );
}
