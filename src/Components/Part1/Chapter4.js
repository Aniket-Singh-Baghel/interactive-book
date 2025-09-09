import React, { useState } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { FaArrowRight, FaArrowLeft, FaHome } from "react-icons/fa";

const content = {
    en: {
        home: "Home",
        title: "✍️📦 Memory & Storage",
        subtitle: "Let's explore the difference between a computer's temporary memory and its permanent storage.",
        ram_title: "RAM (Memory)",
        ram_analogy: "<strong>Analogy:</strong> RAM is like your <em>kitchen countertop</em> — it holds things you're working on, but gets cleared when done.",
        ram_tech: "<strong>Technical:</strong> Random Access Memory is a temporary high-speed workspace for active programs and data.",
        storage_title: "Storage",
        storage_analogy: "<strong>Analogy:</strong> Storage is like a <em>steel almirah</em> — it keeps everything safe even when the lights are off.",
        storage_tech: "<strong>Technical:</strong> Stores data permanently (HDD/SSD), keeping files and OS intact after shutdown.",
        compare_title: "📊 Quick Comparison",
        table_headers: {
            feature: "Feature",
            ram: "RAM",
            storage: "Storage"
        },
        table_data: [
            { feature: "Speed", ram: "Very Fast", storage: "Slower" },
            { feature: "Volatility", ram: "Temporary", storage: "Permanent" },
            { feature: "Purpose", ram: "Run Programs", storage: "Store Data" }
        ],
        fun_fact: "💡 <strong>Fun Fact:</strong> The more RAM you have, the more programs you can run smoothly at the same time.",
        previous: "Previous",
        next: "Next",
    },
    hi: {
        home: "होम",
        title: "✍️📦मेमोरी और स्टोरेज",
        subtitle: "आइए कंप्यूटर की अस्थायी मेमोरी और उसके स्थायी स्टोरेज के बीच के अंतर को जानें।",
        ram_title: "रैम (मेमोरी)",
        ram_analogy: "<strong>उदाहरण:</strong> रैम आपके <em>किचन काउंटरटॉप</em> की तरह है - यह उन चीजों को रखता है जिन पर आप काम कर रहे हैं, लेकिन काम पूरा होने पर साफ हो जाता है।",
        ram_tech: "<strong>तकनीकी:</strong> रैंडम एक्सेस मेमोरी सक्रिय प्रोग्राम और डेटा के लिए एक अस्थायी उच्च गति वाला कार्यक्षेत्र है।",
        storage_title: "स्टोरेज",
        storage_analogy: "<strong>उदाहरण:</strong> स्टोरेज एक <em>स्टील की अलमारी</em> की तरह है - यह बत्ती बंद होने पर भी सब कुछ सुरक्षित रखता है।",
        storage_tech: "<strong>तकनीकी:</strong> डेटा को स्थायी रूप से (HDD/SSD) संग्रहीत करता है, शटडाउन के बाद फ़ाइलों और ओएस को बरकरार रखता है।",
        compare_title: "📊 त्वरित तुलना",
        table_headers: {
            feature: "फ़ीचर",
            ram: "रैम",
            storage: "स्टोरेज"
        },
        table_data: [
            { feature: "गति", ram: "बहुत तेज़", storage: "धीमा" },
            { feature: "अस्थिरता", ram: "अस्थायी", storage: "स्थायी" },
            { feature: "उद्देश्य", ram: "प्रोग्राम चलाएं", storage: "डेटा स्टोर करें" }
        ],
        fun_fact: "💡 <strong>मजेदार तथ्य:</strong> आपके पास जितनी अधिक रैम होगी, आप एक ही समय में उतने ही अधिक प्रोग्राम सुचारू रूप से चला सकते हैं।",
        previous: "पिछला",
        next: "अगला",
    }
};

export default function Chapter4() {
    const [lang, setLang] = useState('en');
    const navigate = useNavigate();
    const t = content[lang];

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-100 p-4 sm:p-6 lg:p-8 flex flex-col items-center font-sans">
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

                <header className="text-center mb-10">
                    <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-purple-800 mb-4 flex items-center justify-center gap-2">
                        {t.title}
                    </h1>
                    <p className="text-base lg:text-lg text-gray-700 max-w-3xl mx-auto">
                        {t.subtitle}
                    </p>
                </header>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full">
                    <motion.div
                        className="bg-white shadow-lg rounded-2xl p-6 flex flex-col items-center"
                        whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
                    >
                        <img src="https://media.istockphoto.com/id/157721899/photo/male-hand-installing-memory-on-computer-motherboard.jpg?s=612x612&w=0&k=20&c=p0xb4clzcXeVgw8RVlLyFpXZXKY5QvKFApvVLoMasGs=" alt="RAM" className="w-full h-48 object-cover rounded-lg mb-4" />
                        <h2 className="text-2xl font-semibold text-blue-700 text-center">{t.ram_title}</h2>
                        <div className="mt-4 text-gray-700 space-y-2 text-center text-sm sm:text-base">
                            <p dangerouslySetInnerHTML={{ __html: t.ram_analogy }} />
                            <p dangerouslySetInnerHTML={{ __html: t.ram_tech }} />
                        </div>
                    </motion.div>

                    <motion.div
                        className="bg-white shadow-lg rounded-2xl p-6 flex flex-col items-center"
                        whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
                    >
                        <img src="https://cdn.mos.cms.futurecdn.net/L3ydUhzAdFDuaJXPKp4VnK.jpg" alt="Storage" className="w-full h-48 object-cover rounded-lg mb-4" />
                        <h2 className="text-2xl font-semibold text-green-700 text-center">{t.storage_title}</h2>
                        <div className="mt-4 text-gray-700 space-y-2 text-center text-sm sm:text-base">
                             <p dangerouslySetInnerHTML={{ __html: t.storage_analogy }} />
                             <p dangerouslySetInnerHTML={{ __html: t.storage_tech }} />
                        </div>
                    </motion.div>
                </div>

                <div className="bg-white shadow-md rounded-lg mt-10 p-6 w-full">
                    <h3 className="text-xl sm:text-2xl font-semibold mb-4 text-center">{t.compare_title}</h3>
                    <div className="overflow-x-auto">
                        <table className="table-auto w-full border-collapse border border-gray-300 text-center">
                            <thead className="bg-gray-100">
                                <tr>
                                    <th className="border p-2 text-sm sm:text-base">{t.table_headers.feature}</th>
                                    <th className="border p-2 text-sm sm:text-base">{t.table_headers.ram}</th>
                                    <th className="border p-2 text-sm sm:text-base">{t.table_headers.storage}</th>
                                </tr>
                            </thead>
                            <tbody>
                                {t.table_data.map((row, index) => (
                                    <tr key={index}>
                                        <td className="border p-2 font-semibold">{row.feature}</td>
                                        <td className="border p-2">{row.ram}</td>
                                        <td className="border p-2">{row.storage}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                <div className="bg-yellow-100 border-l-4 border-yellow-400 mt-8 p-4 rounded-lg shadow-md w-full text-center">
                    <p className="text-yellow-800" dangerouslySetInnerHTML={{ __html: t.fun_fact }} />
                </div>

                <div className="w-full flex justify-between items-center mt-10 p-4 bg-gray-100 rounded-lg shadow-md">
                    <button onClick={() => navigate('/part1/chapters/ch3')} className="flex items-center gap-2 px-4 py-2 bg-purple-200 hover:bg-purple-300 text-purple-900 rounded-lg shadow transition">
                        <FaArrowLeft /> {t.previous}
                    </button>
                    <button onClick={() => navigate('/part1/chapters/ch5')} className="flex items-center gap-2 px-4 py-2 bg-green-200 hover:bg-green-300 text-green-900 rounded-lg shadow transition">
                        {t.next} <FaArrowRight />
                    </button>
                </div>
            </div>
        </div>
    );
}
