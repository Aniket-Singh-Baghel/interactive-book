import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaArrowRight, FaArrowLeft, FaHome, FaKeyboard, FaTv, FaGlobe, FaLightbulb } from "react-icons/fa";
import { Link, useNavigate } from 'react-router-dom';

const content = {
    en: {
        home: "Home",
        title: "Ports & Connectors",
        subtitle: "How devices link with the CPU and communicate",
        metaphor: "Think of ports as doors and connectors as keys — they must match to let data in or out.",
        categories_title: "Port Categories",
        categories: [
            { title: "Universal I/O Ports", description: "USB family for keyboards, mice, storage." },
            { title: "Display Ports", description: "HDMI, VGA, DisplayPort for monitors." },
            { title: "Networking Ports", description: "RJ45, RJ11 for internet and phone lines." },
            { title: "Audio Ports", description: "3.5mm Jack, Optical for sound." },
            { title: "Legacy Ports", description: "PS/2, Serial for older devices." },
        ],
        ports_title: "Explore the Ports",
        ports: [
            {
                name: "USB 3.0",
                description: "Used for keyboards, mice, storage devices.",
                fun_fact: "USB 3.0 is up to 10 times faster than USB 2.0.",
                port_image: "https://www.usbmemorydirect.com/blog/wp-content/uploads/2021/06/USB3-ports.jpg",
                connector_image: "https://atlas-content-cdn.pixelsquid.com/stock-images/usb-plug-cable-Ya7YWP2-600.jpg",
                device_image: "https://www.lifewire.com/thmb/iGbppRVUkKCVwS_u3b1AwHr9NHc=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/USBPort_BrianAJackson_GettyImages-1437236528-59e99324956a403fb8e697c607d98a98.jpg",
            },
            {
                name: "HDMI",
                description: "Used for connecting to high-definition displays.",
                fun_fact: "HDMI can carry both video and audio signals.",
                port_image: "https://www.pacroban.com/cdn/shop/articles/hdmi-port_5cf232e3-1d17-47ec-bb0f-fe1515c619eb.png?v=1754511784&width=1100",
                connector_image: "https://www.electronics-notes.com/images/hdmi-male-mini-connector-3191.jpg",
                device_image: "https://blacki.co.in/cdn/shop/files/1_842749cf-c41c-46e3-9cd3-c428feba5214.png?v=1697096717&width=2048",
            },
            {
                name: "RJ45",
                description: "Used for connecting to a wired network.",
                fun_fact: "RJ45 stands for Registered Jack 45.",
                port_image: "https://download.zone/wp-content/uploads/2022/05/depositphotos_14391097-stock-illustration-ethernet-jack-icon.webp",
                connector_image: "https://patchbox.com/wp-content/uploads/2023/01/RJ45-Connectors-Single-Images.jpg",
                device_image: "https://img.freepik.com/premium-photo/lan-network-internet-connection-ethernet-rj45-cable-plug-lan-port-modem-router_483511-1848.jpg",
            },
        ],
        flow_title: "Connecting to the CPU",
        flow_items: [
            { icon: FaKeyboard, label: "Keyboard" },
            { icon: FaTv, label: "Monitor" },
            { icon: FaGlobe, label: "Internet" },
        ],
        comparison_title: "Old vs. New Ports",
        old_ports: ["VGA", "PS/2", "Parallel", "Serial"],
        new_ports: ["HDMI", "USB-C", "DisplayPort", "Thunderbolt"],
        closing_title: "Key Takeaway",
        closing_message: "Without ports and connectors, your CPU is like a locked room — it cannot talk to the outside world.",
        closing_fun_fact: "USB-C is slowly replacing HDMI, charging ports, and even headphone jacks on many devices.",
        previous: "Previous",
        next: "Next",
    },
    hi: {
        home: "होम",
        title: "पोर्ट और कनेक्टर",
        subtitle: "डिवाइस सीपीयू के साथ कैसे लिंक होते हैं और संचार करते हैं",
        metaphor: "पोर्ट्स को दरवाजों और कनेक्टर्स को चाबियों के रूप में सोचें - डेटा को अंदर या बाहर जाने देने के लिए उनका मेल खाना चाहिए।",
        categories_title: "पोर्ट श्रेणियाँ",
        categories: [
            { title: "यूनिवर्सल I/O पोर्ट्स", description: "कीबोर्ड, माउस, स्टोरेज के लिए यूएसबी परिवार।" },
            { title: "डिस्प्ले पोर्ट्स", description: "मॉनिटर के लिए एचडीएमआई, वीजीए, डिस्प्लेपोर्ट।" },
            { title: "नेटवर्किंग पोर्ट्स", description: "इंटरनेट और फोन लाइनों के लिए आरजे45, आरजे11।" },
            { title: "ऑडियो पोर्ट्स", description: "ध्वनि के लिए 3.5 मिमी जैक, ऑप्टिकल।" },
            { title: "लिगेसी पोर्ट्स", description: "पुराने उपकरणों के लिए पीएस/2, सीरियल।" },
        ],
        ports_title: "पोर्ट्स का अन्वेषण करें",
        ports: [
            {
                name: "यूएसबी 3.0",
                description: "कीबोर्ड, माउस, स्टोरेज डिवाइस के लिए उपयोग किया जाता है।",
                fun_fact: "यूएसबी 3.0 यूएसबी 2.0 से 10 गुना तेज है।",
                port_image: "https://images.wondershare.com/recoverit/article/2021/05/what-is-usb-3_0-2.jpg",
                connector_image: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/75/Connector_USB_3_IMGP6024_wp.jpg/250px-Connector_USB_3_IMGP6024_wp.jpg",
                device_image: "https://www.lifewire.com/thmb/iGbppRVUkKCVwS_u3b1AwHr9NHc=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/USBPort_BrianAJackson_GettyImages-1437236528-59e99324956a403fb8e697c607d98a98.jpg",
            },
            {
                name: "एचडीएमआई",
                description: "उच्च-परिभाषा डिस्प्ले से कनेक्ट करने के लिए उपयोग किया जाता है।",
                fun_fact: "एचडीएमआई वीडियो और ऑडियो दोनों सिग्नल ले जा सकता है।",
                port_image: "https://www.pacroban.com/cdn/shop/articles/hdmi-port_5cf232e3-1d17-47ec-bb0f-fe1515c619eb.png?v=1754511784&width=1100",
                connector_image: "https://www.electronics-notes.com/images/hdmi-male-mini-connector-3191.jpg",
                device_image: "https://blacki.co.in/cdn/shop/files/1_842749cf-c41c-46e3-9cd3-c428feba5214.png?v=1697096717&width=2048",
            },
            {
                name: "आरजे45",
                description: "वायर्ड नेटवर्क से कनेक्ट करने के लिए उपयोग किया जाता है।",
                fun_fact: "आरजे45 का मतलब रजिस्टर्ड जैक 45 है।",
                port_image: "https://download.zone/wp-content/uploads/2022/05/depositphotos_14391097-stock-illustration-ethernet-jack-icon.webp",
                connector_image: "https://patchbox.com/wp-content/uploads/2023/01/RJ45-Connectors-Single-Images.jpg",
                device_image: "https://img.freepik.com/premium-photo/lan-network-internet-connection-ethernet-rj45-cable-plug-lan-port-modem-router_483511-1848.jpg",
            },
        ],
        flow_title: "सीपीयू से कनेक्ट हो रहा है",
        flow_items: [
            { icon: FaKeyboard, label: "कीबोर्ड" },
            { icon: FaTv, label: "मॉनिटर" },
            { icon: FaGlobe, label: "इंटरनेट" },
        ],
        comparison_title: "पुराने बनाम नए पोर्ट",
        old_ports: ["वीजीए", "पीएस/2", "पैरेलल", "सीरियल"],
        new_ports: ["एचडीएमआई", "यूएसबी-सी", "डिस्प्लेपोर्ट", "थंडरबोल्ट"],
        closing_title: "मुख्य सीख",
        closing_message: "पोर्ट और कनेक्टर के बिना, आपका सीपीयू एक बंद कमरे की तरह है - यह बाहरी दुनिया से बात नहीं कर सकता।",
        closing_fun_fact: "यूएसबी-सी धीरे-धीरे कई उपकरणों पर एचडीएमआई, चार्जिंग पोर्ट और यहां तक ​​कि हेडफोन जैक की जगह ले रहा है।",
        previous: "पिछला",
        next: "अगला",
    }
};

const PortCard = ({ port }) => {
    const [isFlipped, setIsFlipped] = useState(false);

    return (
        <motion.div
            className="w-full h-80"
            style={{ perspective: '1000px' }}
            onClick={() => setIsFlipped(!isFlipped)}
            whileHover={{ scale: 1.05 }}
        >
            <motion.div
                className="relative w-full h-full"
                style={{ transformStyle: 'preserve-3d' }}
                animate={{ rotateY: isFlipped ? 180 : 0 }}
                transition={{ duration: 0.6 }}
            >
                {/* Front Side */}
                <div className="absolute w-full h-full bg-white rounded-xl shadow-lg p-6 flex flex-col items-center justify-between" style={{ backfaceVisibility: 'hidden' }}>
                    <img src={port.port_image} alt={`${port.name} port`} className="w-24 h-24 object-contain" />
                    <img src={port.connector_image} alt={`${port.name} connector`} className="w-24 h-24 object-contain" />
                    <h3 className="text-xl font-bold text-gray-800 mt-4">{port.name}</h3>
                    <p className="text-gray-600 text-center">{port.description}</p>
                    <p className="text-sm italic text-gray-500 mt-2">{port.fun_fact}</p>
                </div>
                {/* Back Side */}
                <div className="absolute w-full h-full bg-gray-800 rounded-xl shadow-lg p-6 flex flex-col items-center justify-center" style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}>
                    <img src={port.device_image} alt={`${port.name} device`} className="w-48 h-48 object-contain rounded-lg" />
                    <p className="text-white text-lg font-semibold mt-4">{port.name}</p>
                </div>
            </motion.div>
        </motion.div>
    );
};

const PortsAndConnectors = () => {
    const [lang, setLang] = useState('en');
    const navigate = useNavigate();
    const t = content[lang];

    return (
        <div className="p-4 sm:p-6 lg:p-8 min-h-screen bg-gradient-to-br from-purple-50 to-indigo-50 font-sans">
            <div className="max-w-5xl mx-auto">
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

                <div className="p-4 sm:p-6 max-w-4xl mx-auto bg-white rounded-2xl shadow-2xl">
                    {/* Hero Section */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-center mb-12"
                    >
                        <motion.h1
                            initial={{ y: -30, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ type: "spring", stiffness: 100 }}
                            className="text-4xl md:text-5xl font-bold text-gray-800"
                        >
                            <motion.span
                                animate={{
                                    scale: [1, 1.2, 1],
                                }}
                                transition={{
                                    duration: 0.5,
                                    ease: "easeInOut",
                                }}
                                className="inline-block"
                            >
                                🔌
                            </motion.span>{" "}
                            {t.title}
                        </motion.h1>
                        <motion.p
                            initial={{ y: 30, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.2, type: "spring", stiffness: 80 }}
                            className="text-lg text-gray-600 mt-4"
                        >
                            {t.subtitle}
                        </motion.p>
                        <motion.div
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ delay: 0.4 }}
                            className="mt-6 text-md text-indigo-600 bg-indigo-50 p-4 rounded-lg italic"
                        >
                            "{t.metaphor}"
                        </motion.div>
                    </motion.div>

                    {/* Category Sections */}
                    <div className="mt-12">
                        <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">{t.categories_title}</h2>
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {t.categories.map((category, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 50, scale: 0.9 }}
                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                    transition={{ delay: 0.2 * index }}
                                    className="bg-gray-50 p-6 rounded-xl shadow-md hover:shadow-xl transition-shadow"
                                >
                                    <h3 className="text-xl font-bold text-indigo-700">{category.title}</h3>
                                    <p className="text-gray-600 mt-2">{category.description}</p>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    {/* Card Layout for Each Port */}
                    <div className="mt-16">
                        <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">{t.ports_title}</h2>
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12">
                            {t.ports.map((port, index) => (
                                <PortCard key={index} port={port} />
                            ))}
                        </div>
                    </div>

                    {/* Flow Connection */}
                    <div className="mt-16">
                        <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">{t.flow_title}</h2>
                        <div className="relative flex items-center justify-center h-96">
                            <motion.img
                                src="https://www.pcstudio.in/wp-content/uploads/2025/01/Ant-Esports-Crystal-Wood-Atx-Cabinet-With-Type-C-Black-1-1.webp"
                                alt="CPU"
                                className="w-32 h-32"
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ delay: 0.2 }}
                            />
                            {t.flow_items.map((item, index) => {
                                const angle = (index / t.flow_items.length) * 2 * Math.PI;
                                const x = Math.cos(angle) * 150;
                                const y = Math.sin(angle) * 150;
                                const Icon = item.icon;
                                return (
                                    <motion.div
                                        key={index}
                                        className="absolute flex flex-col items-center"
                                        initial={{ x: 0, y: 0, opacity: 0 }}
                                        animate={{ x, y, opacity: 1 }}
                                        transition={{ delay: 0.5 + index * 0.2 }}
                                    >
                                        <Icon className="text-4xl text-indigo-500" />
                                        <p className="mt-2 text-gray-700">{item.label}</p>
                                    </motion.div>
                                );
                            })}
                        </div>
                    </div>

                    {/* Comparison Grid */}
                    <div className="mt-16">
                        <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">{t.comparison_title}</h2>
                        <div className="flex justify-center">
                            <div className="grid grid-cols-2 gap-8 w-full max-w-2xl relative">
                                {/* Old Ports */}
                                <div className="flex flex-col items-center">
                                    <h3 className="text-2xl font-semibold text-gray-500 mb-4">Old</h3>
                                    {t.old_ports.map((port, index) => (
                                        <motion.div
                                            key={index}
                                            initial={{ opacity: 0, x: -50 }}
                                            animate={{ opacity: 0.5, x: 0 }}
                                            transition={{ delay: 0.2 * index }}
                                            className="bg-gray-200 text-gray-700 p-4 rounded-lg mb-4 w-full text-center"
                                        >
                                            {port}
                                        </motion.div>
                                    ))}
                                </div>
                                {/* New Ports */}
                                <div className="flex flex-col items-center">
                                    <h3 className="text-2xl font-semibold text-green-500 mb-4">New</h3>
                                    {t.new_ports.map((port, index) => (
                                        <motion.div
                                            key={index}
                                            initial={{ opacity: 0, x: 50 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: 0.2 * index }}
                                            className="bg-green-100 text-green-800 p-4 rounded-lg mb-4 w-full text-center"
                                        >
                                            {port}
                                        </motion.div>
                                    ))}
                                </div>
                                <div className="absolute h-full w-1 bg-gray-300 left-1/2 top-0 transform -translate-x-1/2 flex items-center justify-center">
                                    <span className="text-4xl">⏳</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Closing Insight Section */}
                    <div className="mt-16">
                        <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">{t.closing_title}</h2>
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.2 }}
                            className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded-lg shadow-md"
                        >
                            <div className="flex items-center">
                                <motion.div
                                    animate={{
                                        scale: [1, 1.2, 1],
                                        rotate: [0, 10, -10, 0]
                                    }}
                                    transition={{
                                        duration: 1,
                                        ease: "easeInOut",
                                        repeat: Infinity,
                                        repeatDelay: 2
                                    }}
                                >
                                    <FaLightbulb className="text-4xl text-yellow-500 mr-4" />
                                </motion.div>
                                <div>
                                    <p className="text-lg text-gray-800">{t.closing_message}</p>
                                    <p className="text-md italic text-gray-600 mt-4">{t.closing_fun_fact}</p>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>

                <div className="w-full flex justify-between items-center mt-10 p-4 bg-gray-100 rounded-lg shadow-md">
                    <button
                        onClick={() => navigate('/part1/input-output-devices')}
                        className="flex items-center gap-2 px-4 py-2 bg-purple-200 hover:bg-purple-300 text-purple-900 rounded-lg shadow transition"
                    >
                        <FaArrowLeft />
                        {t.previous}
                    </button>
                    <button
                        onClick={() => navigate('/part1/history-of-computers')}
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

export default PortsAndConnectors;
