import React, { useState } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { FaHome, FaArrowLeft, FaArrowRight, FaHdd, FaMicrochip, FaMemory, FaNetworkWired, FaBook, FaChalkboardTeacher, FaTools, FaAppStore, FaMouse, FaShieldAlt, FaProjectDiagram, FaFolderOpen } from "react-icons/fa";

const content = {
    en: {
        home: "Home",
        title: "Chapter 7 — The Operating System (OS)",
        subtitle: "The OS is the <strong>manager</strong> of the computer 'village', keeping everything and everyone following the rules.",
        diagram_title: "OS Core Diagram",
        diagram_desc: "This diagram shows how the OS Core (the manager) sits in the middle, connecting the user's applications and devices to the computer's essential hardware like the CPU and Memory. It controls everything.",
        core_label: "OS Core",
        manager_label: "(The Manager)",
        core_understanding_title: "Understanding the OS Core",
        core_understanding_desc: "Think of the OS Core as the <strong>school principal</strong> who ensures every teacher, student, and classroom runs smoothly without chaos.",
        previous: "Previous",
        next: "Next",
        remember: "Remember:",
        remember_text: "Apps talk to the OS, and the OS talks to the hardware. That’s how the whole computer 'village' stays happy and organized!",
    },
    hi: {
        home: "होम",
        title: "अध्याय 7 - ऑपरेटिंग सिस्टम (ओएस)",
        subtitle: "ओएस कंप्यूटर 'गांव' का <strong>मैनेजर</strong> है, जो हर चीज और हर किसी को नियमों का पालन करवाता है।",
        diagram_title: "ओएस कोर डायग्राम",
        diagram_desc: "यह डायग्राम दिखाता है कि कैसे ओएस कोर (मैनेजर) बीच में बैठता है, और उपयोगकर्ता के एप्लिकेशन और डिवाइस को कंप्यूटर के आवश्यक हार्डवेयर जैसे सीपीयू और मेमोरी से जोड़ता है। यह सब कुछ नियंत्रित करता है।",
        core_label: "ओएस कोर",
        manager_label: "(मैनेजर)",
        core_understanding_title: "ओएस कोर को समझना",
        core_understanding_desc: "ओएस कोर को एक <strong>स्कूल के प्रिंसिपल</strong> की तरह सोचें जो यह सुनिश्चित करता है कि हर शिक्षक, छात्र और कक्षा बिना किसी अव्यवस्था के सुचारू रूप से चले।",
        previous: "पिछला",
        next: "अगला",
        remember: "याद रखें:",
        remember_text: "ऐप्स ओएस से बात करते हैं, और ओएस हार्डवेयर से बात करता है। इसी तरह पूरा कंप्यूटर 'गांव' खुश और व्यवस्थित रहता है!",
    }
};

const diagramItemsData = {
    en: [
        { label: "CPU", color: "border-purple-500", icon: <FaMicrochip /> },
        { label: "Memory", color: "border-green-500", icon: <FaMemory /> },
        { label: "Network", color: "border-sky-500", icon: <FaNetworkWired /> },
        { label: "Storage", color: "border-yellow-500", icon: <FaHdd /> },
        { label: "Apps", color: "border-pink-500", icon: <FaAppStore /> },
        { label: "Devices", color: "border-red-500", icon: <FaMouse /> },
    ],
    hi: [
        { label: "सीपीयू", color: "border-purple-500", icon: <FaMicrochip /> },
        { label: "मेमोरी", color: "border-green-500", icon: <FaMemory /> },
        { label: "नेटवर्क", color: "border-sky-500", icon: <FaNetworkWired /> },
        { label: "स्टोरेज", color: "border-yellow-500", icon: <FaHdd /> },
        { label: "ऐप्स", color: "border-pink-500", icon: <FaAppStore /> },
        { label: "डिवाइस", color: "border-red-500", icon: <FaMouse /> },
    ]
};

const infoCardsData = {
    en: [
        { title: "Process Manager", icon: <FaProjectDiagram />, text: "Starts, pauses, and stops programs so everything runs smoothly without fighting for the CPU." },
        { title: "Memory Manager", icon: <FaMemory />, text: "Gives each program a safe space to store its data while it’s running." },
        { title: "File System", icon: <FaFolderOpen />, text: "Organizes your files and folders on storage so you can save and find things easily." },
        { title: "Device Drivers", icon: <FaMouse />, text: "Helps the computer talk to keyboard, mouse, printer, and more—like translators for devices." },
        { title: "Security", icon: <FaShieldAlt />, text: "Locks the ‘village gates’ with passwords/permissions to keep your data safe." },
        { title: "Networking", icon: <FaNetworkWired />, text: "Connects your computer to the internet and other computers to share information." },
    ],
    hi: [
        { title: "प्रोसेस मैनेजर", icon: <FaProjectDiagram />, text: "प्रोग्राम शुरू करता है, रोकता है, और बंद करता है ताकि सब कुछ सीपीयू के लिए लड़े बिना सुचारू रूप से चले।" },
        { title: "मेमोरी मैनेजर", icon: <FaMemory />, text: "चलते समय प्रत्येक प्रोग्राम को अपना डेटा स्टोर करने के लिए एक सुरक्षित स्थान देता है।" },
        { title: "फाइल सिस्टम", icon: <FaFolderOpen />, text: "आपकी फाइलों और फोल्डरों को स्टोरेज पर व्यवस्थित करता है ताकि आप चीजों को आसानी से सहेज सकें और ढूंढ सकें।" },
        { title: "डिवाइस ड्राइवर", icon: <FaMouse />, text: "कंप्यूटर को कीबोर्ड, माउस, प्रिंटर, और अधिक से बात करने में मदद करता है - जैसे उपकरणों के लिए अनुवादक।" },
        { title: "सुरक्षा", icon: <FaShieldAlt />, text: "आपके डेटा को सुरक्षित रखने के लिए पासवर्ड/अनुमतियों के साथ 'गांव के द्वार' बंद कर देता है।" },
        { title: "नेटवर्किंग", icon: <FaNetworkWired />, text: "आपके कंप्यूटर को इंटरनेट और अन्य कंप्यूटरों से जानकारी साझा करने के लिए जोड़ता है।" },
    ]
};

const osCoreDataData = {
    en: [
        { title: "CPU (The Workers)", icon: <FaMicrochip size={40} />, color: "bg-purple-100", desc: "Like factory workers, the OS decides who gets CPU time at each moment." },
        { title: "Memory (The Classroom Desks)", icon: <FaMemory size={40} />, color: "bg-yellow-100", desc: "The OS assigns each program its own desk so they don’t disturb others." },
        { title: "Network (The Hallway & Letters)", icon: <FaNetworkWired size={40} />, color: "bg-blue-100", desc: "Acts like a postmaster, delivering messages between classrooms or schools." },
        { title: "Storage (The Library)", icon: <FaBook size={40} />, color: "bg-orange-100", desc: "Keeps track of every 'book' (file) so you can find and open it anytime." },
        { title: "Apps (The Lessons)", icon: <FaChalkboardTeacher size={40} />, color: "bg-pink-100", desc: "Schedules lessons and ensures resources are ready for teachers." },
        { title: "Devices (School Equipment)", icon: <FaTools size={40} />, color: "bg-green-100", desc: "Makes sure projectors, printers, and devices are ready to use." },
    ],
    hi: [
        { title: "सीपीयू (कार्यकर्ता)", icon: <FaMicrochip size={40} />, color: "bg-purple-100", desc: "फैक्ट्री के कर्मचारियों की तरह, ओएस तय करता है कि हर पल सीपीयू का समय किसे मिलेगा।" },
        { title: "मेमोरी (कक्षा की मेजें)", icon: <FaMemory size={40} />, color: "bg-yellow-100", desc: "ओएस प्रत्येक प्रोग्राम को अपनी मेज देता है ताकि वे दूसरों को परेशान न करें।" },
        { title: "नेटवर्क (हॉलवे और पत्र)", icon: <FaNetworkWired size={40} />, color: "bg-blue-100", desc: "एक पोस्टमास्टर की तरह काम करता है, कक्षाओं या स्कूलों के बीच संदेश पहुंचाता है।" },
        { title: "स्टोरेज (पुस्तकालय)", icon: <FaBook size={40} />, color: "bg-orange-100", desc: "हर 'किताब' (फ़ाइल) का हिसाब रखता है ताकि आप उसे कभी भी ढूंढ और खोल सकें।" },
        { title: "ऐप्स (पाठ)", icon: <FaChalkboardTeacher size={40} />, color: "bg-pink-100", desc: "पाठों का शेड्यूल बनाता है और सुनिश्चित करता है कि संसाधन शिक्षकों के लिए तैयार हैं।" },
        { title: "डिवाइस (स्कूल के उपकरण)", icon: <FaTools size={40} />, color: "bg-green-100", desc: "यह सुनिश्चित करता है कि प्रोजेक्टर, प्रिंटर और डिवाइस उपयोग के लिए तैयार हैं।" },
    ]
};


export default function OSChapter7() {
    const [lang, setLang] = useState('en');
    const navigate = useNavigate();

    const t = content[lang];
    const diagramItems = diagramItemsData[lang];
    const infoCards = infoCardsData[lang];
    const osCoreData = osCoreDataData[lang];
    
    return (
        <div className="min-h-screen bg-gradient-to-b from-blue-50 to-purple-50 p-4 sm:p-6 lg:p-8">
            <div className="flex items-center justify-between">
                <Link
                    to="/parts/prt2"
                    className="inline-flex items-center px-4 py-2 bg-white rounded-full shadow-md border border-gray-200 hover:bg-gray-100 transition"
                >
                    <FaHome className="mr-2 text-lg text-sky-600" />
                    {t.home}
                </Link>
                <div className="flex space-x-2">
                    <button onClick={() => setLang("en")} className={`px-3 py-1 rounded-lg border font-semibold ${lang === "en" ? "bg-sky-600 text-white border-sky-600" : "bg-white text-gray-700 border-gray-300"} transition`}>EN</button>
                    <button onClick={() => setLang("hi")} className={`px-3 py-1 rounded-lg border font-semibold ${lang === "hi" ? "bg-sky-600 text-white border-sky-600" : "bg-white text-gray-700 border-gray-300"} transition`}>हिं</button>
                </div>
            </div>

            <div className="flex flex-col items-center my-8">
                <motion.h1 
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-purple-700 mb-2 text-center"
                >
                    {t.title}
                </motion.h1>
                <motion.p 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="text-pink-600 mb-8 text-center max-w-xl lg:text-lg"
                    dangerouslySetInnerHTML={{ __html: t.subtitle }}
                />
            </div>

            <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
                <motion.div
                    className="bg-white rounded-2xl p-6 shadow-lg"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <h2 className="flex items-center gap-2 text-xl lg:text-2xl font-semibold text-purple-700 mb-4">
                        <FaMicrochip /> {t.diagram_title}
                    </h2>
                    
                    {/* New Diagram Description */}
                    <p className="text-sm text-gray-600 mb-6 bg-purple-50 p-3 rounded-lg border-l-4 border-purple-300">
                        {t.diagram_desc}
                    </p>

                    <div className="relative flex flex-col items-center">
                        <motion.div
                            className="p-4 sm:p-6 rounded-lg border-2 border-purple-400 shadow-md text-center bg-white"
                            whileHover={{ scale: 1.05, transition: { duration: 0.1 } }}
                        >
                            <FaMicrochip className="text-purple-500 text-2xl mx-auto mb-2" />
                            <p className="font-semibold">{t.core_label}</p>
                            <p className="text-xs sm:text-sm text-gray-500">{t.manager_label}</p>
                        </motion.div>

                        <div className="grid grid-cols-2 gap-4 mt-6 w-full">
                            {diagramItems.map((item, index) => (
                                <motion.div
                                    key={index}
                                    className={`p-4 rounded-lg border-2 ${item.color} flex flex-col items-center`}
                                    whileHover={{ scale: 1.05, transition: { duration: 0.1 } }}
                                    initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: index * 0.2 }}
                                >
                                    <div className="text-2xl mb-2">{item.icon}</div>
                                    <p className="font-medium text-sm sm:text-base">{item.label}</p>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </motion.div>

                <div className="grid sm:grid-cols-2 gap-4">
                    {infoCards.map((card, index) => (
                        <motion.div
                            key={index}
                            className="bg-white rounded-xl shadow-md p-4 flex items-start gap-3 hover:shadow-xl transition-shadow"
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.15 }}
                        >
                            <div className="text-purple-600 text-xl mt-1">{card.icon}</div>
                            <div>
                                <h3 className="font-semibold text-base lg:text-lg">{card.title}</h3>
                                <p className="text-sm text-gray-600">{card.text}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
            <div className="p-6 mt-8">
                <h2 className="text-2xl lg:text-3xl font-bold mb-4 text-purple-700" dangerouslySetInnerHTML={{ __html: t.core_understanding_title }} />
                <p className="mb-8 lg:text-lg" dangerouslySetInnerHTML={{ __html: t.core_understanding_desc }} />
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {osCoreData.map((item, index) => (
                        <motion.div
                            key={index}
                            className={`${item.color} p-6 rounded-xl shadow-md flex flex-col items-center text-center`}
                            whileHover={{ scale: 1.05, rotate: 1, transition: { duration: 0.1 } }}
                            transition={{ type: "spring", stiffness: 300 }}
                        >
                            <div className="mb-3 text-purple-800">{item.icon}</div>
                            <h3 className="font-semibold text-lg mb-2">{item.title}</h3>
                            <p className="text-sm sm:text-base text-gray-700">{item.desc}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
            <div className="flex flex-col sm:flex-row justify-between items-center mt-10 p-4 bg-gray-100 rounded-lg shadow-md gap-4">
                <button
                    onClick={() => navigate('/module1/what-is-software')}
                    className="flex items-center gap-2 px-4 py-2 bg-purple-200 hover:bg-purple-300 text-purple-900 rounded-lg shadow transition"
                >
                    <FaArrowLeft />
                    {t.previous}
                </button>

                <button
                    onClick={() => navigate('/module1/types-of-software')}
                    className="flex items-center gap-2 px-4 py-2 bg-green-200 hover:bg-green-300 text-green-900 rounded-lg shadow transition"
                >
                    {t.next}
                    <FaArrowRight />
                </button>
            </div>
            <p className="text-center mt-8 text-sm text-gray-700">
                <strong>{t.remember}</strong> {t.remember_text}
            </p>
        </div>
    );
}
