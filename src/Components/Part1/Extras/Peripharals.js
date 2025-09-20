import { motion } from "framer-motion";
import { Server, Router, Home as HomeIcon, Cpu } from "lucide-react";
import { Link, useNavigate } from 'react-router-dom';
import { FaKeyboard, FaMouse, FaHeadphones, FaDesktop, FaBrain, FaHandPaper, FaHome, FaArrowLeft, FaArrowRight } from "react-icons/fa";
import React, { useState } from "react";

const content = {
    en: {
        home: "Home",
        title: "What are Peripherals? 🖥️",
        def_part1: "A ",
        def_part1_span: "peripheral",
        def_part2: " is any device connected to a computer that isn’t part of its ",
        def_part2_span: "core components",
        def_part3: " (CPU, RAM, Motherboard).",
        def_desc: "Think of them as helpful “sidekicks” that let us interact with the computer.",
        confusion_title: "Why is it Confusing?",
        confusion_text: "Students often think peripherals (like monitors & keyboards) are “core” parts because they feel essential for everyday use.",
        core_components_title: "Core Components",
        core_components_desc: "CPU, RAM, Motherboard = the ",
        core_components_desc_span: "Brain & Organs",
        core_components_desc_cont: ". Without them, the computer can’t function.",
        peripherals_title: "Peripherals",
        peripherals_desc: "Keyboard, Monitor, Mouse = the ",
        peripherals_desc_span: "Hands, Eyes & Ears",
        peripherals_desc_cont: ". They help us interact but aren’t the “brain.”",
        examples_title: "What if the Monitor was a Core Part?",
        examples_subtitle: "Many students think a monitor must be a core part of the computer. But let’s look at real-world examples where computers work perfectly fine <em>without one</em>.",
        server_title: "Servers",
        server_text: " run the internet 💻. They usually don’t have monitors — they’re managed remotely through networks. This is called a ",
        server_text_span: "headless system",
        router_title: "Wi-Fi router",
        router_text: " is a tiny computer ⚙️. It has a CPU, RAM, and storage — but no monitor!",
        smarthome_title: "Smart home hubs",
        smarthome_text: " like Alexa or Google Home process commands and play audio 🎶 — all without screens.",
        embedded_title: "Embedded systems",
        embedded_text: " power things like cars, microwaves, and washing machines 🚗 — they compute but don’t “show” you their work.",
        takeaway: "👉 The takeaway: Just like a person carries a bat and ball while playing, but doesn’t need them while reading a book, in the same way a computer uses peripheral devices only when they are needed.",
        takeaway_span: "Core components",
        takeaway_cont: " (CPU, RAM, Motherboard) do the real computing. A monitor is just one way to <em>see</em> the results, not a part of the core brain itself.",
        previous: "Previous",
        next: "Next",
    },
    hi: {
        home: "होम",
        title: "पेरिफेरल्स क्या हैं? 🖥️",
        def_part1: "एक ",
        def_part1_span: "पेरिफेरल",
        def_part2: " कंप्यूटर से जुड़ा कोई भी उपकरण है जो उसके ",
        def_part2_span: "मुख्य घटकों",
        def_part3: " (सीपीयू, रैम, मदरबोर्ड) का हिस्सा नहीं है।",
        def_desc: "उन्हें सहायक \"साइडकिक्स\" के रूप में सोचें जो हमें कंप्यूटर के साथ बातचीत करने देते हैं।",
        confusion_title: "यह भ्रामक क्यों है?",
        confusion_text: "छात्र अक्सर सोचते हैं कि पेरिफेरल्स (जैसे मॉनिटर और कीबोर्ड) \"मुख्य\" भाग हैं क्योंकि वे रोजमर्रा के उपयोग के लिए आवश्यक महसूस करते हैं।",
        core_components_title: "मुख्य घटक",
        core_components_desc: "सीपीयू, रैम, मदरबोर्ड = ",
        core_components_desc_span: "मस्तिष्क और अंग",
        core_components_desc_cont: "। उनके बिना, कंप्यूटर कार्य नहीं कर सकता है।",
        peripherals_title: "पेरिफेरल्स",
        peripherals_desc: "कीबोर्ड, मॉनिटर, माउस = ",
        peripherals_desc_span: "हाथ, आंखें और कान",
        peripherals_desc_cont: "। वे हमें बातचीत करने में मदद करते हैं लेकिन \"मस्तिष्क\" नहीं हैं।",
        examples_title: "क्या होगा यदि मॉनिटर एक मुख्य भाग होता?",
        examples_subtitle: "कई छात्र सोचते हैं कि मॉनिटर कंप्यूटर का एक मुख्य हिस्सा होना चाहिए। लेकिन आइए वास्तविक दुनिया के उदाहरण देखें जहां कंप्यूटर <em>बिना एक के</em> पूरी तरह से ठीक काम करते हैं।",
        server_title: "सर्वर",
        server_text: " इंटरनेट चलाते हैं 💻। उनके पास आमतौर पर मॉनिटर नहीं होते हैं - उन्हें नेटवर्क के माध्यम से दूर से प्रबंधित किया जाता है। इसे ",
        server_text_span: "हेडलेस सिस्टम",
        router_title: "वाई-फाई राउटर",
        router_text: " एक छोटा कंप्यूटर है ⚙️। इसमें एक सीपीयू, रैम और स्टोरेज है - लेकिन कोई मॉनिटर नहीं है!",
        smarthome_title: "स्मार्ट होम हब",
        smarthome_text: " जैसे एलेक्सा या गूगल होम कमांड प्रोसेस करते हैं और ऑडियो चलाते हैं 🎶 - सभी बिना स्क्रीन के।",
        embedded_title: "एंबेडेड सिस्टम",
        embedded_text: " कारों, माइक्रोवेव और वाशिंग मशीन जैसी चीजों को शक्ति प्रदान करते हैं 🚗 - वे गणना करते हैं लेकिन आपको अपना काम \"दिखाते\" नहीं हैं।",
        takeaway: "👉 निष्कर्ष: जैसे इंसान खेलते समय बैट और बॉल साथ लेता है, पर किताब पढ़ते समय उनकी ज़रूरत नहीं होती, वैसे ही कंप्यूटर भी पेरिफेरल डिवाइस तभी इस्तेमाल करता है जब उनकी ज़रूरत होती है।",
        takeaway_span: "मुख्य घटक",
        takeaway_cont: " (सीपीयू, रैम, मदरबोर्ड) वास्तविक कंप्यूटिंग करते हैं। एक मॉनिटर परिणामों को <em>देखने</em> का सिर्फ एक तरीका है, न कि स्वयं मुख्य मस्तिष्क का हिस्सा।",
        previous: "पिछला",
        next: "अगला",
    }
};

const peripheralExamples = [
    { icon: <FaKeyboard />, label: "Keyboard" },
    { icon: <FaMouse />, label: "Mouse" },
    { icon: <FaHeadphones />, label: "Headphones" },
    { icon: <FaDesktop />, label: "Monitor" },
];

export default function PeripheralsLesson() {
    const [lang, setLang] = useState('en');
    const navigate = useNavigate();
    const t = content[lang];

    return (
        <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-pink-50 to-purple-100 flex flex-col items-center py-8 px-4 sm:px-6 lg:px-8 font-sans">
            <div className="w-full max-w-6xl">
                {/* Header */}
                <div className="flex items-center justify-between mb-8">
                    <Link
                        to="/parts/prt1"
                        className="inline-flex items-center px-4 py-2 bg-white rounded-full shadow-md border border-gray-200 hover:bg-gray-100 transition"
                    >
                        <FaHome className="mr-2 text-lg text-sky-600" />
                        {t.home}
                    </Link>

                    <div className="flex space-x-2">
                        <button
                            onClick={() => setLang("en")}
                            className={`px-3 py-1 rounded-lg border font-semibold ${lang === "en"
                                ? "bg-sky-600 text-white border-sky-600"
                                : "bg-white text-gray-700 border-gray-300"
                                } transition`}
                        >
                            EN
                        </button>
                        <button
                            onClick={() => setLang("hi")}
                            className={`px-3 py-1 rounded-lg border font-semibold ${lang === "hi"
                                ? "bg-sky-600 text-white border-sky-600"
                                : "bg-white text-gray-700 border-gray-300"
                                } transition`}
                        >
                            हिं
                        </button>
                    </div>
                </div>

                {/* Title */}
                <motion.h1
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.7, type: "spring" }}
                    className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-purple-700 mb-8 drop-shadow-lg text-center"
                >
                    {t.title}
                </motion.h1>

                {/* Definition Section */}
                <motion.div
                    whileHover={{ scale: 1.02 }}
                    className="bg-white rounded-2xl shadow-lg p-6 max-w-3xl mx-auto mb-10 text-center border-2 border-purple-200"
                >
                    <p className="text-lg lg:text-xl font-medium text-gray-700">
                        {t.def_part1}
                        <span className="font-bold text-purple-600">{t.def_part1_span}</span>
                        {t.def_part2}
                        <span className="bg-yellow-300 px-1 py-1 rounded">{t.def_part2_span}</span>
                        {t.def_part3}
                    </p>
                    <p className="mt-3 text-gray-600 italic">{t.def_desc}</p>
                </motion.div>

                {/* Confusion Section */}
                <motion.div
                    initial={{ x: -100, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.8 }}
                    className="bg-purple-50 rounded-2xl shadow-md p-6 max-w-xl mx-auto mb-10 text-center border-2 border-yellow-300"
                >
                    <h2 className="text-xl sm:text-2xl font-semibold text-purple-700 mb-2">
                        {t.confusion_title}
                    </h2>
                    <p className="text-gray-700">{t.confusion_text}</p>
                </motion.div>

                {/* Core vs Peripherals */}
                <motion.div
                    initial={{ y: 50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                    className="flex flex-col md:flex-row items-center justify-center gap-6 mb-12"
                >
                    <motion.div
                        whileHover={{ rotate: -2, scale: 1.05 }}
                        className="bg-white rounded-xl p-6 shadow-md border-2 border-purple-400 w-full md:w-80 text-center"
                    >
                        <FaBrain className="text-5xl text-purple-600 mx-auto mb-3" />
                        <h3 className="text-lg font-bold text-purple-700">
                            {t.core_components_title}
                        </h3>
                        <p className="text-sm text-gray-600">
                            {t.core_components_desc}
                            <span className="font-semibold">{t.core_components_desc_span}</span>
                            {t.core_components_desc_cont}
                        </p>
                    </motion.div>

                    <motion.div
                        animate={{ x: [0, 10, 0] }}
                        transition={{ repeat: Infinity, duration: 1.5 }}
                        className="text-3xl text-purple-500 rotate-90 md:rotate-0"
                    >
                        ➡️
                    </motion.div>

                    <motion.div
                        whileHover={{ rotate: 2, scale: 1.05 }}
                        className="bg-white rounded-xl p-6 shadow-md border-2 border-yellow-400 w-full md:w-80 text-center"
                    >
                        <FaHandPaper className="text-5xl text-yellow-500 mx-auto mb-3" />
                        <h3 className="text-lg font-bold text-yellow-600">{t.peripherals_title}</h3>
                        <p className="text-sm text-gray-600">
                            {t.peripherals_desc}
                            <span className="font-semibold">{t.peripherals_desc_span}</span>
                            {t.peripherals_desc_cont}
                        </p>
                    </motion.div>
                </motion.div>

                {/* Peripheral Examples */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 mb-12">
                    {peripheralExamples.map((item, idx) => (
                        <motion.div
                            key={idx}
                            whileHover={{ scale: 1.15, rotate: 3 }}
                            className="bg-white rounded-xl shadow-lg p-4 flex flex-col items-center border border-gray-200"
                        >
                            <div className="text-4xl text-purple-500 mb-2">{item.icon}</div>
                            <p className="text-sm font-semibold text-gray-700">{item.label}</p>
                        </motion.div>
                    ))}
                </div>

                {/* Examples Section */}
                <motion.div
                    className="p-6 bg-purple-50 rounded-2xl shadow-lg max-w-4xl mx-auto mt-8"
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <h2 className="text-2xl sm:text-3xl font-bold text-purple-800 mb-4">
                        {t.examples_title}
                    </h2>
                    <p
                        className="text-base lg:text-lg mb-4"
                        dangerouslySetInnerHTML={{ __html: t.examples_subtitle }}
                    />

                    <div className="space-y-4">
                        <motion.div
                            className="flex items-center gap-4 bg-white p-4 rounded-xl shadow"
                            whileHover={{ scale: 1.02 }}
                        >
                            <Server className="text-purple-600 w-10 h-10 flex-shrink-0" />
                            <p>
                                <span className="font-bold text-purple-700">{t.server_title}</span>
                                {t.server_text}
                                <span className="bg-pink-200 px-1 rounded">{t.server_text_span}</span>.
                            </p>
                        </motion.div>

                        <motion.div
                            className="flex items-center gap-4 bg-white p-4 rounded-xl shadow"
                            whileHover={{ scale: 1.02 }}
                        >
                            <Router className="text-green-600 w-10 h-10 flex-shrink-0" />
                            <p>
                                <span className="font-bold text-green-700">{t.router_title}</span>
                                {t.router_text}
                            </p>
                        </motion.div>

                        <motion.div
                            className="flex items-center gap-4 bg-white p-4 rounded-xl shadow"
                            whileHover={{ scale: 1.02 }}
                        >
                            <HomeIcon className="text-blue-600 w-10 h-10 flex-shrink-0" />
                            <p>
                                <span className="font-bold text-blue-700">{t.smarthome_title}</span>
                                {t.smarthome_text}
                            </p>
                        </motion.div>

                        <motion.div
                            className="flex items-center gap-4 bg-white p-4 rounded-xl shadow"
                            whileHover={{ scale: 1.02 }}
                        >
                            <Cpu className="text-red-600 w-10 h-10 flex-shrink-0" />
                            <p>
                                <span className="font-bold text-red-700">{t.embedded_title}</span>
                                {t.embedded_text}
                            </p>
                        </motion.div>
                    </div>

                    <p
                        className="mt-6 text-lg"
                        dangerouslySetInnerHTML={{
                            __html: t.takeaway.replace(
                                "{takeaway_span}",
                                `<span class="bg-yellow-200 px-2 rounded">${t.takeaway_span}</span>`
                            ),
                        }}
                    />
                </motion.div>

                {/* Navigation */}
                <div className="w-full flex justify-between items-center mt-12 p-4 bg-gray-100 rounded-lg shadow-md">
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => navigate("/part1/input-output-devices")}
                        className="flex items-center gap-2 px-4 py-2 bg-purple-200 hover:bg-purple-300 text-purple-900 rounded-lg shadow transition"
                    >
                        <FaArrowLeft />
                        {t.previous}
                    </motion.button>

                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => navigate("/part1/tertiary-storage")}
                        className="flex items-center gap-2 px-4 py-2 bg-green-200 hover:bg-green-300 text-green-900 rounded-lg shadow transition"
                    >
                        {t.next}
                        <FaArrowRight />
                    </motion.button>
                </div>
            </div>
        </div>

    );
}
