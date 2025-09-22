import { motion } from "framer-motion";
import { FaUsb, FaArrowLeft, FaArrowRight, FaHome, FaSdCard, FaCloud, FaPlusCircle, FaMinusCircle } from "react-icons/fa";
import { useNavigate, Link } from "react-router-dom";
import { FaFloppyDisk } from "react-icons/fa6";
import React, { useState, useEffect } from "react";

const content = {
    en: {
        home: "Home",
        title: "📦 Other Storage Types",
        subtitle: "Beyond the main hard drive, many other devices store our data. Let's explore them!",
        previous: "Previous",
        next: "Next",
        use_cases: "Use Cases:",
        pros: "Pros:",
        cons: "Cons:",
        storage_types: [
            {
                title: "Flash Drive (USB)",
                icon: <FaUsb className="text-blue-500" />,
                description: "A small, portable device that plugs into a USB port. The most common way to move files between computers.",
                pros: ["Very portable", "Easy to use", "Affordable"],
                cons: ["Easy to lose", "Can be broken", "Risk of viruses"],
                use_cases: ["Transferring documents", "Sharing photos", "Creating bootable installers"],
            },
            {
                title: "SD Card",
                icon: <FaSdCard className="text-orange-500" />,
                description: "A tiny memory card used in many digital devices like cameras, phones, and drones.",
                pros: ["Very small", "High capacity available", "Essential for many devices"],
                cons: ["Can be fragile", "Easy to lose", "Needs a card reader"],
                use_cases: ["Storing photos in a camera", "Expanding phone storage", "Recording video on a drone"],
            },
            {
                title: "Cloud Storage",
                icon: <FaCloud className="text-sky-500" />,
                description: "Storing your data online on servers instead of on your own device. Accessible from anywhere with internet.",
                pros: ["Access from anywhere", "Easy to share", "Automatic backups"],
                cons: ["Requires internet", "Can have monthly fees", "Privacy concerns"],
                use_cases: ["Google Drive for documents", "iCloud for phone backups", "Dropbox for file sharing"],
            },
            {
                title: "Floppy Disk (Historic)",
                icon: <FaFloppyDisk className="text-gray-500" />,
                description: "An old type of magnetic storage, famous for being the 'save' icon. It held very little data.",
                pros: ["Iconic!", "Helped start personal computing"],
                cons: ["Holds very little data (~1.44MB)", "Very slow", "Easily damaged"],
                use_cases: ["Saving small documents (in the 1990s)", "Distributing software (long ago)"],
            },
        ],
    },
    hi: {
        home: "होम",
        title: "📦 अन्य स्टोरेज प्रकार",
        subtitle: "मुख्य हार्ड ड्राइव के अलावा, कई अन्य डिवाइस हमारे डेटा को संग्रहीत करते हैं। आइए उनका अन्वेषण करें!",
        previous: "पिछला",
        next: "अगला",
        use_cases: "उपयोग के मामले:",
        pros: "फायदे:",
        cons: "नुकसान:",
        storage_types: [
            {
                title: "फ्लैश ड्राइव (यूएसबी)",
                icon: <FaUsb className="text-blue-500" />,
                description: "एक छोटा, पोर्टेबल डिवाइस जो यूएसबी पोर्ट में प्लग होता है। कंप्यूटरों के बीच फ़ाइलों को स्थानांतरित करने का सबसे आम तरीका।",
                pros: ["बहुत पोर्टेबल", "उपयोग में आसान", "सस्ता"],
                cons: ["खोने में आसान", "टूट सकता है", "वायरस का खतरा"],
                use_cases: ["दस्तावेज़ स्थानांतरित करना", "तस्वीरें साझा करना", "बूटेबल इंस्टॉलर बनाना"],
            },
            {
                title: "एसडी कार्ड",
                icon: <FaSdCard className="text-orange-500" />,
                description: "कैमरा, फोन और ड्रोन जैसे कई डिजिटल उपकरणों में इस्तेमाल होने वाला एक छोटा मेमोरी कार्ड।",
                pros: ["बहुत छोटा", "उच्च क्षमता उपलब्ध", "कई उपकरणों के लिए आवश्यक"],
                cons: ["नाजुक हो सकता है", "खोने में आसान", "कार्ड रीडर की आवश्यकता है"],
                use_cases: ["कैमरे में तस्वीरें संग्रहीत करना", "फोन भंडारण का विस्तार करना", "ड्रोन पर वीडियो रिकॉर्ड करना"],
            },
            {
                title: "क्लाउड स्टोरेज",
                icon: <FaCloud className="text-sky-500" />,
                description: "अपने डेटा को अपने डिवाइस के बजाय सर्वर पर ऑनलाइन संग्रहीत करना। इंटरनेट के साथ कहीं से भी पहुँचा जा सकता है।",
                pros: ["कहीं से भी पहुँच", "साझा करना आसान", "स्वचालित बैकअप"],
                cons: ["इंटरनेट की आवश्यकता है", "मासिक शुल्क हो सकता है", "गोपनीयता की चिंता"],
                use_cases: ["दस्तावेजों के लिए गूगल ड्राइव", "फोन बैकअप के लिए आईक्लाउड", "फ़ाइल साझा करने के लिए ड्रॉपबॉक्स"],
            },
            {
                title: "फ्लॉपी डिस्क (ऐतिहासिक)",
                icon: <FaFloppyDisk className="text-gray-500" />,
                description: "'सहेजें' आइकन के रूप में प्रसिद्ध एक पुराने प्रकार का चुंबकीय भंडारण। इसमें बहुत कम डेटा होता था।",
                pros: ["प्रतिष्ठित!", "व्यक्तिगत कंप्यूटिंग शुरू करने में मदद की"],
                cons: ["बहुत कम डेटा रखता है (~1.44MB)", "बहुत धीमा", "आसानी से क्षतिग्रस्त"],
                use_cases: ["छोटे दस्तावेज़ सहेजना (1990 के दशक में)", "सॉफ्टवेयर वितरित करना (बहुत पहले)"],
            },
        ],
    }
};

const StorageCard = ({ type, t }) => (
    <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6 }}
        className="bg-white rounded-2xl shadow-lg p-6 flex flex-col"
    >
        <div className="flex items-center gap-4 mb-4">
            <div className="text-5xl">{type.icon}</div>
            <h3 className="text-2xl font-bold text-gray-800">{type.title}</h3>
        </div>
        <p className="text-gray-600 mb-4 flex-grow">{type.description}</p>

        <div className="space-y-3 text-sm">
            <div>
                <h4 className="font-semibold text-gray-700 mb-1">{t.use_cases}</h4>
                <ul className="list-disc list-inside space-y-1">
                    {type.use_cases.map((item, i) => <li key={i}>{item}</li>)}
                </ul>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <div>
                    <h4 className="font-semibold text-green-700 mb-1 flex items-center gap-1"><FaPlusCircle />{t.pros}</h4>
                    <ul className="list-disc list-inside text-green-600 space-y-1">
                        {type.pros.map((item, i) => <li key={i}>{item}</li>)}
                    </ul>
                </div>
                <div>
                    <h4 className="font-semibold text-red-700 mb-1 flex items-center gap-1"><FaMinusCircle />{t.cons}</h4>
                    <ul className="list-disc list-inside text-red-600 space-y-1">
                        {type.cons.map((item, i) => <li key={i}>{item}</li>)}
                    </ul>
                </div>
            </div>
        </div>
    </motion.div>
);

export default function OtherStorageTypes() {
    const [lang, setLang] = useState('en');
    const navigate = useNavigate();
    const t = content[lang];

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
        <div className="p-4 sm:p-6 lg:p-8 min-h-screen bg-gradient-to-br from-purple-50 to-blue-100 font-sans">
            <div className="w-full max-w-7xl mx-auto">
                <div className="flex items-center justify-between mb-8">
                    <Link to="/parts/prt1" className="inline-flex items-center px-4 py-2 bg-white rounded-full shadow-md border border-gray-200 hover:bg-gray-100 transition">
                        <FaHome className="mr-2 text-lg text-sky-600" />
                        {t.home}
                    </Link>
                    <div className="flex space-x-2">
                        <button
                            onClick={() => setLang("en")}
                            className={`px-3 py-1 rounded-lg border font-semibold ${lang === "en" ? "bg-sky-600 text-white border-sky-600" : "bg-white text-gray-700 border-gray-300"} transition`}>EN</button>
                        <button
                            onClick={() => setLang("hi")}
                            className={`px-3 py-1 rounded-lg border font-semibold ${lang === "hi" ? "bg-sky-600 text-white border-sky-600" : "bg-white text-gray-700 border-gray-300"} transition`}>हिं</button>
                    </div>
                </div>

                <header className="text-center mb-12">
                    <motion.h1 initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-purple-800">{t.title}</motion.h1>
                    <motion.p initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="text-gray-600 mt-2 max-w-3xl mx-auto text-sm sm:text-base lg:text-lg">{t.subtitle}</motion.p>
                </header>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {t.storage_types.map((type, i) => (
                        <StorageCard key={i} type={type} t={t} />
                    ))}
                </div>

                <div className="w-full flex justify-between items-center mt-12 p-4 bg-gray-100 rounded-lg shadow-md">
                    <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={() => navigate('/part1/tertiary-storage')} className="flex items-center gap-2 px-4 py-2 bg-purple-200 hover:bg-purple-300 text-purple-900 rounded-lg shadow transition"><FaArrowLeft />{t.previous}</motion.button>
                    <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={() => navigate('/part1/ram-vs-rom')} className="flex items-center gap-2 px-4 py-2 bg-green-200 hover:bg-green-300 text-green-900 rounded-lg shadow transition">{t.next}<FaArrowRight /></motion.button>
                </div>
            </div>
        </div>
    );
}
