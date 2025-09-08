import React, { useState } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { FaHome, FaLaptopCode, FaCogs, FaArrowLeft, FaArrowRight, FaBalanceScale, FaQuestionCircle } from "react-icons/fa";

const content = {
    en: {
        home: "Home",
        title: "Chapter 8: Types of Software",
        analogy_title: "Analogy: The Two Sides of a Coin",
        analogy_text: "Software has two main faces. <strong>System Software</strong> is like the side of the coin with the mint year and official seal—it's essential for the coin to exist and function. <strong>Application Software</strong> is like the other side with the cool picture—it's what you usually look at and use for a specific purpose.",
        system_software: "System Software",
        system_desc: "The foundational layer that manages the computer itself. It's the 'engine' of the car.",
        app_software: "Application Software",
        app_desc: "The programs you use to get things done. These are the 'destinations' you drive the car to.",
        vs_title: "System Software vs. Operating System",
        vs_text: "This can be a bit confusing! Think of 'System Software' as a broad category, like 'Fruit'. The 'Operating System' (like Windows or iOS) is the most important *type* of fruit in that category, like an 'Apple'. Other system software exists (like device drivers), but the OS is the main one you hear about.",
        table_title: "System vs. Application Software",
        table_headers: {
            feature: "Feature",
            system: "System Software",
            app: "Application Software"
        },
        table_data: [
            { feature: "Purpose", system: "Manages computer hardware & provides a platform for apps", app: "Performs specific tasks for the user" },
            { feature: "Examples", system: "Windows, macOS, Android, iOS", app: "MS Word, Chrome, Photoshop, Games" },
            { feature: "User Interaction", system: "Runs in the background; usually indirect interaction", app: "User interacts with it directly and constantly" },
            { feature: "Dependency", system: "Can run independently", app: "Requires System Software to run" }
        ],
        balance_title: "The Balancing Act",
        balance_desc: "Both types of software are essential and work together. System software runs the hardware, and application software gives the user powerful tools to use that hardware.",
        previous: "Previous",
        next: "Next",
    },
    hi: {
        home: "होम",
        title: "अध्याय 8: सॉफ्टवेयर के प्रकार",
        analogy_title: "उदाहरण: एक सिक्के के दो पहलू",
        analogy_text: "सॉफ्टवेयर के दो मुख्य चेहरे होते हैं। <strong>सिस्टम सॉफ्टवेयर</strong> सिक्के के उस पहलू की तरह है जिस पर टकसाल का साल और आधिकारिक मुहर होती है—यह सिक्के के अस्तित्व और कार्य के लिए आवश्यक है। <strong>एप्लिकेशन सॉफ्टवेयर</strong> दूसरे पहलू की तरह है जिस पर अच्छी तस्वीर होती है—यह वह है जिसे आप आमतौर पर देखते हैं और एक विशिष्ट उद्देश्य के लिए उपयोग करते हैं।",
        system_software: "सिस्टम सॉफ्टवेयर",
        system_desc: "वह मूलभूत परत जो कंप्यूटर को ही प्रबंधित करती है। यह कार का 'इंजन' है।",
        app_software: "एप्लिकेशन सॉफ्टवेयर",
        app_desc: "वे प्रोग्राम जिनका उपयोग आप काम पूरा करने के लिए करते हैं। ये वे 'गंतव्य' हैं जहाँ आप कार चलाते हैं।",
        vs_title: "सिस्टम सॉफ्टवेयर बनाम ऑपरेटिंग सिस्टम",
        vs_text: "यह थोड़ा भ्रमित करने वाला हो सकता है! 'सिस्टम सॉफ्टवेयर' को एक विस्तृत श्रेणी के रूप में सोचें, जैसे 'फल'। 'ऑपरेटिंग सिस्टम' (जैसे विंडोज या आईओएस) उस श्रेणी में सबसे महत्वपूर्ण *प्रकार* का फल है, जैसे 'सेब'। अन्य सिस्टम सॉफ्टवेयर भी मौजूद हैं (जैसे डिवाइस ड्राइवर), लेकिन ओएस मुख्य है जिसके बारे में आप सुनते हैं।",
        table_title: "सिस्टम बनाम एप्लिकेशन सॉफ्टवेयर",
        table_headers: {
            feature: "फ़ीचर",
            system: "सिस्टम सॉफ्टवेयर",
            app: "एप्लिकेशन सॉफ्टवेयर"
        },
        table_data: [
            { feature: "उद्देश्य", system: "कंप्यूटर हार्डवेयर का प्रबंधन करता है और ऐप्स के लिए एक मंच प्रदान करता है", app: "उपयोगकर्ता के लिए विशिष्ट कार्य करता है" },
            { feature: "उदाहरण", system: "विंडोज, मैकओएस, एंड्रॉइड, आईओएस", app: "एमएस वर्ड, क्रोम, फोटोशॉप, गेम्स" },
            { feature: "उपयोगकर्ता इंटरैक्शन", system: "बैकग्राउंड में चलता है; आमतौर पर अप्रत्यक्ष इंटरैक्शन", app: "उपयोगकर्ता इसके साथ सीधे और लगातार इंटरैक्ट करता है" },
            { feature: "निर्भरता", system: "स्वतंत्र रूप से चल सकता है", app: "चलने के लिए सिस्टम सॉफ्टवेयर की आवश्यकता है" }
        ],
        balance_title: "संतुलन का कार्य",
        balance_desc: "दोनों प्रकार के सॉफ्टवेयर आवश्यक हैं और एक साथ काम करते हैं। सिस्टम सॉफ्टवेयर हार्डवेयर चलाता है, और एप्लिकेशन सॉफ्टवेयर उपयोगकर्ता को उस हार्डवेयर का उपयोग करने के लिए शक्तिशाली उपकरण देता है।",
        previous: "पिछला",
        next: "अगला",
    }
};

const TypesOfSoftware = () => {
    const [lang, setLang] = useState('en');
    const navigate = useNavigate();
    const t = content[lang];

    const cardVariants = {
        initial: { opacity: 0, y: 50, scale: 0.9 },
        animate: (i) => ({
            opacity: 1,
            y: 0,
            scale: 1,
            transition: {
                delay: i * 0.2,
                type: 'spring',
                stiffness: 120,
            },
        }),
    };

    return (
        <div className="p-4 sm:p-6 lg:p-8 min-h-screen bg-gradient-to-br from-teal-50 to-cyan-100 font-sans">
            <div className="max-w-6xl mx-auto">
                <div className="flex items-center justify-between mb-8">
                    <Link to="/parts/prt2" className="inline-flex items-center px-4 py-2 bg-white rounded-full shadow-md border border-gray-200 hover:bg-gray-100 transition">
                        <FaHome className="mr-2 text-lg text-sky-600" />
                        {t.home}
                    </Link>
                    <div className="flex space-x-2">
                        <button onClick={() => setLang("en")} className={`px-3 py-1 rounded-lg border font-semibold ${lang === "en" ? "bg-sky-600 text-white border-sky-600" : "bg-white text-gray-700 border-gray-300"} transition`}>EN</button>
                        <button onClick={() => setLang("hi")} className={`px-3 py-1 rounded-lg border font-semibold ${lang === "hi" ? "bg-sky-600 text-white border-sky-600" : "bg-white text-gray-700 border-gray-300"} transition`}>हिं</button>
                    </div>
                </div>

                <motion.h1
                    className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-center text-cyan-800 mb-4"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                >
                    {t.title}
                </motion.h1>
                
                <motion.div
                    className="bg-white/70 backdrop-blur-sm p-6 rounded-2xl mb-8 shadow-lg border border-cyan-200"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.2 }}
                >
                    <h2 className="text-xl sm:text-2xl font-semibold text-cyan-700 mb-2">{t.analogy_title}</h2>
                    <p className="text-gray-700" dangerouslySetInnerHTML={{ __html: t.analogy_text }} />
                </motion.div>

                <div className="grid md:grid-cols-2 gap-8 items-stretch mb-8">
                    <motion.div custom={1} variants={cardVariants} initial="initial" animate="animate" className="bg-white p-6 rounded-2xl shadow-xl flex flex-col">
                        <div className="flex items-center gap-4 mb-4">
                            <FaCogs size={40} className="text-blue-500 flex-shrink-0" />
                            <h3 className="text-2xl font-bold text-blue-700">{t.system_software}</h3>
                        </div>
                        <p className="text-gray-600 flex-grow">{t.system_desc}</p>
                    </motion.div>

                    <motion.div custom={2} variants={cardVariants} initial="initial" animate="animate" className="bg-white p-6 rounded-2xl shadow-xl flex flex-col">
                        <div className="flex items-center gap-4 mb-4">
                            <FaLaptopCode size={40} className="text-green-500 flex-shrink-0" />
                            <h3 className="text-2xl font-bold text-green-700">{t.app_software}</h3>
                        </div>
                        <p className="text-gray-600 flex-grow">{t.app_desc}</p>
                    </motion.div>
                </div>
                
                <motion.div 
                    className="mb-8 bg-yellow-50 border-l-4 border-yellow-400 p-6 rounded-r-lg"
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 }}
                >
                    <div className="flex items-center">
                        <FaQuestionCircle className="text-yellow-600 text-3xl mr-4 flex-shrink-0" />
                        <div>
                            <h3 className="font-bold text-lg text-yellow-800">{t.vs_title}</h3>
                            <p className="text-yellow-700 mt-1">{t.vs_text}</p>
                        </div>
                    </div>
                </motion.div>

                <motion.div
                    className="overflow-x-auto shadow-lg rounded-2xl mb-12"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                >
                    <h2 className="text-2xl font-bold text-center text-gray-800 mb-4 pt-4">{t.table_title}</h2>
                    <table className="min-w-full bg-white rounded-b-2xl">
                        <thead>
                            <tr className="bg-cyan-600 text-white">
                                <th className="py-3 px-4 text-left text-sm sm:text-base">{t.table_headers.feature}</th>
                                <th className="py-3 px-4 text-left text-sm sm:text-base">{t.table_headers.system}</th>
                                <th className="py-3 px-4 text-left text-sm sm:text-base">{t.table_headers.app}</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {t.table_data.map((row, index) => (
                                <tr key={index} className={index % 2 === 0 ? 'bg-cyan-50/50' : 'bg-white'}>
                                    <td className="py-3 px-4 font-semibold text-gray-700 text-sm sm:text-base">{row.feature}</td>
                                    <td className="py-3 px-4 text-gray-600 text-sm sm:text-base">{row.system}</td>
                                    <td className="py-3 px-4 text-gray-600 text-sm sm:text-base">{row.app}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </motion.div>

                <motion.div 
                    className="mt-12 p-6 bg-white rounded-2xl shadow-lg"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                >
                    <h2 className="text-2xl font-bold text-center text-gray-800 mb-4">{t.balance_title}</h2>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8">
                        <motion.div whileHover={{ scale: 1.05 }} className="text-center">
                            <FaCogs className="text-5xl text-blue-500 mx-auto" />
                            <p className="mt-2 font-semibold">{t.system_software}</p>
                        </motion.div>
                        <FaBalanceScale className="text-4xl sm:text-6xl text-gray-400 my-4 sm:my-0" />
                        <motion.div whileHover={{ scale: 1.05 }} className="text-center">
                            <FaLaptopCode className="text-5xl text-green-500 mx-auto" />
                            <p className="mt-2 font-semibold">{t.app_software}</p>
                        </motion.div>
                    </div>
                     <p className="text-center text-gray-600 mt-6 max-w-2xl mx-auto">{t.balance_desc}</p>
                </motion.div>

                <div className="flex flex-col sm:flex-row justify-between items-center mt-12 p-4 bg-gray-100 rounded-lg shadow-md gap-4">
                    <button onClick={() => navigate('/module1/operating-system')} className="flex items-center gap-2 px-4 py-2 bg-purple-200 hover:bg-purple-300 text-purple-900 rounded-lg shadow transition">
                        <FaArrowLeft /> {t.previous}
                    </button>
                    <button onClick={() => navigate('/parts/prt2')} className="flex items-center gap-2 px-4 py-2 bg-green-200 hover:bg-green-300 text-green-900 rounded-lg shadow transition">
                        {t.next} <FaArrowRight />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default TypesOfSoftware;
