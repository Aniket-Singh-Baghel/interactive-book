import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FaFileAlt, FaImage, FaVideo, FaDatabase, FaArrowRight, FaArrowLeft, FaHome, FaLightbulb } from "react-icons/fa";
import { Link, useNavigate } from 'react-router-dom';

const content = {
    en: {
        home: "Home",
        hero_title: "💾 How Digital Memory is Measured",
        hero_subtitle: "From tiny text files to massive cloud storage — let’s understand KB, MB, GB & TB.",
        hero_metaphor: "Think of memory like containers: a cup (KB), a bottle (MB), a bucket (GB), and a tank (TB).",
        kb_title: "Kilobyte (KB)",
        kb_size: "1 KB = 1,024 Bytes",
        kb_example: "≈ one page of plain text.",
        kb_fact: "Your WhatsApp text message is usually less than 1 KB!",
        mb_title: "Megabyte (MB)",
        mb_size: "1 MB = 1,024 KB",
        mb_example: "≈ a high-quality photo or a short song.",
        mb_fact: "The first floppy disks held only 1.44 MB.",
        gb_title: "Gigabyte (GB)",
        gb_size: "1 GB = 1,024 MB",
        gb_example: "≈ a full-length HD movie.",
        gb_fact: "The first iPod in 2001 had 5 GB of storage!",
        tb_title: "Terabyte (TB)",
        tb_size: "1 TB = 1,024 GB",
        tb_example: "≈ thousands of movies or an entire library of books.",
        tb_fact: "A single TB can hold about 250,000 photos.",
        chart_title: "Visualizing the Scale",
        insight_title: "Did you know?",
        insight_text: "Your phone’s 128 GB storage can hold about 32,000 songs or 60 HD movies!",
        previous: "Previous",
        next: "Next",
    },
    hi: {
        home: "होम",
        hero_title: "💾 डिजिटल मेमोरी को कैसे मापा जाता है",
        hero_subtitle: "छोटी टेक्स्ट फ़ाइलों से लेकर बड़े क्लाउड स्टोरेज तक - आइए KB, MB, GB और TB को समझें।",
        hero_metaphor: "मेमोरी को कंटेनरों की तरह सोचें: एक कप (KB), एक बोतल (MB), एक बाल्टी (GB), और एक टैंक (TB)।",
        kb_title: "किलोबाइट (KB)",
        kb_size: "1 KB = 1,024 बाइट्स",
        kb_example: "≈ एक पेज का सादा टेक्स्ट।",
        kb_fact: "आपका व्हाट्सएप टेक्स्ट संदेश आमतौर पर 1 KB से कम होता है!",
        mb_title: "मेगाबाइट (MB)",
        mb_size: "1 MB = 1,024 KB",
        mb_example: "≈ एक उच्च-गुणवत्ता वाली तस्वीर या एक छोटा गाना।",
        mb_fact: "पहले फ्लॉपी डिस्क में केवल 1.44 MB होता था।",
        gb_title: "गीगाबाइट (GB)",
        gb_size: "1 GB = 1,024 MB",
        gb_example: "≈ एक पूरी लंबाई की HD फिल्म।",
        gb_fact: "2001 में पहले आईपॉड में 5 GB स्टोरेज था!",
        tb_title: "टेराबाइट (TB)",
        tb_size: "1 TB = 1,024 GB",
        tb_example: "≈ हजारों फिल्में या किताबों की पूरी लाइब्रेरी।",
        tb_fact: "एक TB में लगभग 250,000 तस्वीरें रखी जा सकती हैं।",
        chart_title: "पैमाने की कल्पना करना",
        insight_title: "क्या आप जानते हैं?",
        insight_text: "आपके फ़ोन का 128 GB स्टोरेज लगभग 32,000 गाने या 60 HD फिल्में रख सकता है!",
        previous: "पिछला",
        next: "अगला",
    }
};

const cardData = [
    { icon: <FaFileAlt className="text-3xl text-blue-500" />, titleKey: "kb_title", sizeKey: "kb_size", exampleKey: "kb_example", factKey: "kb_fact" },
    { icon: <FaImage className="text-3xl text-green-500" />, titleKey: "mb_title", sizeKey: "mb_size", exampleKey: "mb_example", factKey: "mb_fact" },
    { icon: <FaVideo className="text-3xl text-red-500" />, titleKey: "gb_title", sizeKey: "gb_size", exampleKey: "gb_example", factKey: "gb_fact" },
    { icon: <FaDatabase className="text-3xl text-purple-500" />, titleKey: "tb_title", sizeKey: "tb_size", exampleKey: "tb_example", factKey: "tb_fact" },
];

const comparisonData = [
    { unit: 'KB', size: 1, color: 'bg-blue-400' },
    { unit: 'MB', size: 10, color: 'bg-green-400' },
    { unit: 'GB', size: 40, color: 'bg-red-400' },
    { unit: 'TB', size: 100, color: 'bg-purple-400' },
];

const MemoryUnits = () => {
    const [lang, setLang] = useState('en');
    const navigate = useNavigate();
    const t = content[lang];

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { staggerChildren: 0.2 } },
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: { y: 0, opacity: 1, transition: { type: "spring", stiffness: 100 } },
    };

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
        <div className="p-4 sm:p-6 lg:p-8 min-h-screen bg-gradient-to-br from-gray-50 to-blue-100 font-sans">
            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <div className="flex items-center justify-between mb-8">
                    <Link to="/parts/prt1" className="inline-flex items-center px-4 py-2 bg-white rounded-full shadow-md border border-gray-200 hover:bg-gray-100 transition">
                        <FaHome className="mr-2 text-lg text-blue-600" />
                        {t.home}
                    </Link>
                    <div className="flex space-x-2">
                        <button onClick={() => setLang("en")} className={`px-3 py-1 rounded-lg border font-semibold ${lang === "en" ? "bg-blue-600 text-white border-blue-600" : "bg-white text-gray-700 border-gray-300"} transition`}>EN</button>
                        <button onClick={() => setLang("hi")} className={`px-3 py-1 rounded-lg border font-semibold ${lang === "hi" ? "bg-blue-600 text-white border-blue-600" : "bg-white text-gray-700 border-gray-300"} transition`}>हिं</button>
                    </div>
                </div>

                {/* Main Content */}
                <div className="bg-white rounded-2xl shadow-2xl p-6 sm:p-8">
                    {/* Hero Section */}
                    <motion.div
                        className="text-center mb-12"
                        initial={{ opacity: 0, y: -30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, ease: "easeOut" }}
                    >
                        <h1 className="text-3xl py-4 sm:text-4xl lg:text-5xl font-extrabold text-gray-800 mb-3">
                            {/* Emoji stays natural */}
                            <span className="mr-2">💾</span>
                            {/* Gradient applies only to text */}
                            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
                                {t.hero_title.replace("💾 ", "")}
                            </span>
                        </h1>

                        <p className="text-gray-600 text-base sm:text-lg mb-4">{t.hero_subtitle}</p>
                        <p className="text-gray-500 italic text-sm sm:text-base">{t.hero_metaphor}</p>
                    </motion.div>


                    {/* Memory Unit Cards with Animated Flow */}
                    <motion.div
                        className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-0"
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                    >
                        {cardData.map((card, index) => (
                            <React.Fragment key={index}>
                                <motion.div
                                    className="bg-gray-50 p-4 rounded-xl shadow-lg w-full sm:w-1/4 flex flex-col items-center text-center"
                                    variants={itemVariants}
                                    whileHover={{ scale: 1.05, y: -5, boxShadow: "0px 15px 25px rgba(0,0,0,0.1)" }}
                                >
                                    {card.icon}
                                    <h3 className="font-bold text-lg mt-2 text-gray-800">{t[card.titleKey]}</h3>
                                    <p className="text-xs text-gray-500 font-mono">{t[card.sizeKey]}</p>
                                    <p className="text-sm text-gray-700 my-2">{t[card.exampleKey]}</p>
                                    <p className="text-xs italic text-blue-600">"{t[card.factKey]}"</p>
                                </motion.div>
                                {index < cardData.length - 1 && (
                                    <motion.div variants={itemVariants} className="text-2xl text-gray-400 mx-2 my-2 sm:my-0 transform sm:rotate-0 rotate-90">
                                        <FaArrowRight />
                                    </motion.div>
                                )}
                            </React.Fragment>
                        ))}
                    </motion.div>

                    {/* Comparison Chart */}
                    <motion.div className="mt-16" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }}>
                        <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">{t.chart_title}</h2>
                        <div className="bg-gray-100 p-4 rounded-lg space-y-3">
                            {comparisonData.map(item => (
                                <div key={item.unit} className="flex items-center gap-4">
                                    <span className="font-bold text-sm w-8">{item.unit}</span>
                                    <div className="flex-1 bg-gray-200 rounded-full h-6">
                                        <motion.div
                                            className={`${item.color} h-6 rounded-full`}
                                            style={{ width: `${item.size}%` }}
                                            initial={{ width: 0 }}
                                            animate={{ width: `${item.size}%` }}
                                            transition={{ duration: 1, ease: "easeOut", delay: 1.2 }}
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </motion.div>

                    {/* Closing Insight Section */}
                    <motion.div
                        className="mt-12 bg-blue-50 border-l-4 border-blue-500 p-4 rounded-r-lg"
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 1.5, type: "spring" }}
                    >
                        <div className="flex items-center">
                            <FaLightbulb className="text-2xl text-blue-500 mr-4" />
                            <div>
                                <h3 className="font-bold text-lg text-blue-800">{t.insight_title}</h3>
                                <p className="text-blue-700">{t.insight_text}</p>
                            </div>
                        </div>
                    </motion.div>
                </div>

                {/* Footer Navigation */}
                <div className="w-full flex justify-between items-center mt-10 p-4 bg-gray-100 rounded-lg shadow-md">
                    <button
                        onClick={() => navigate('/part1/memory-comparison')}
                        className="flex items-center gap-2 px-4 py-2 bg-purple-200 hover:bg-purple-300 text-purple-900 rounded-lg shadow transition"
                    >
                        <FaArrowLeft />
                        {t.previous}
                    </button>
                    <button
                        onClick={() => navigate('/part1/ports-and-connectors')}
                        className="flex items-center gap-2 px-4 py-2 bg-green-200 hover:bg-green-300 text-green-900 rounded-lg shadow transition"
                    >
                        {t.next}
                        <FaArrowRight />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default MemoryUnits;
