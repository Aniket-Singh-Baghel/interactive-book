import React, { useState,useEffect } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { FaKeyboard, FaMicrochip, FaDesktop, FaDatabase, FaArrowRight, FaArrowLeft, FaHome, FaArrowDown } from "react-icons/fa";

const content = {
    en: {
        home: "Home",
        title: "The Brain of the Computer: The CPU 🧠",
        subtitle: "The <strong>CPU</strong> is the computer's brain — it performs calculations and tells other parts what to do.",
        diagram_title: "How the CPU Works (Block Diagram)",
        diagram_subtitle: "This diagram shows how data flows from input devices → CPU → output devices, with memory storing instructions/data.",
        input: "Input",
        input_devices: "Keyboard, Mouse",
        output: "Output",
        output_devices: "Monitor, Printer",
        cpu: "CPU",
        cu: "Control Unit (CU)",
        alu: "ALU (Arithmetic Logic Unit)",
        memory: "Memory Unit",
        memory_desc: "Stores data & instructions",
        img1_caption: "Processor (chip)",
        img2_caption: "Motherboard (holds CPU)",
        img3_caption: "PC Cabinet / Case",
        explanation1: "Think of the CPU as the school headmaster: it receives instructions (from memory or input), decides what to do, and tells other parts how to act.",
        explanation2: "The <strong>Control Unit (CU)</strong> fetches instructions and coordinates everything. The <strong>ALU</strong> performs math and logic (like adding scores or comparing values).",
        explanation3: "Memory stores the lessons and rules; input gives new tasks; output shows the results. Saying a short story (analogy) about a headmaster passing notes helps kids remember the roles.",
        previous: "Previous",
        next: "Next",
    },
    hi: {
        home: "होम",
        title: "कंप्यूटर का मस्तिष्क: सीपीयू 🧠",
        subtitle: "<strong>सीपीयू</strong> कंप्यूटर का मस्तिष्क है - यह गणना करता है और अन्य भागों को बताता है कि क्या करना है।",
        diagram_title: "सीपीयू कैसे काम करता है (ब्लॉक डायग्राम)",
        diagram_subtitle: "यह आरेख दिखाता है कि डेटा इनपुट डिवाइस → सीपीयू → आउटपुट डिवाइस से कैसे प्रवाहित होता है, जिसमें मेमोरी निर्देशों/डेटा को संग्रहीत करती है।",
        input: "इनपुट",
        input_devices: "कीबोर्ड, माउस",
        output: "आउटपुट",
        output_devices: "मॉनिटर, प्रिंटर",
        cpu: "सीपीयू",
        cu: "कंट्रोल यूनिट (सीयू)",
        alu: "एएलयू (अरिथमैटिक लॉजिक यूनिट)",
        memory: "मेमोरी यूनिट",
        memory_desc: "डेटा और निर्देश संग्रहीत करता है",
        img1_caption: "प्रोसेसर (चिप)",
        img2_caption: "मदरबोर्ड (सीपीयू रखता है)",
        img3_caption: "पीसी कैबिनेट / केस",
        explanation1: "सीपीयू को स्कूल के हेडमास्टर के रूप में सोचें: यह निर्देश प्राप्त करता है (मेमोरी या इनपुट से), क्या करना है यह तय करता है, और अन्य भागों को बताता है कि कैसे कार्य करना है।",
        explanation2: "<strong>कंट्रोल यूनिट (सीयू)</strong> निर्देश प्राप्त करती है और सब कुछ समन्वयित करती है। <strong>एएलयू</strong> गणित और तर्क करता है (जैसे स्कोर जोड़ना या मानों की तुलना करना)।",
        explanation3: "मेमोरी पाठ और नियमों को संग्रहीत करती है; इनपुट नए कार्य देता है; आउटपुट परिणाम दिखाता है। हेडमास्टर के नोट्स पास करने के बारे में एक छोटी कहानी (उपमा) कहने से बच्चों को भूमिकाएं याद रखने में मदद मिलती है।",
        previous: "पिछला",
        next: "अगला",
    }
};

const DiagramBox = ({ title, subtitle, bg = "bg-white", border = "border-gray-200", icon }) => (
    <div className={`rounded-xl p-4 sm:p-5 shadow-sm ${bg} border ${border} flex flex-col items-center text-center w-40 sm:w-56`}>
        <div className="text-3xl mb-2 text-indigo-700">{icon}</div>
        <div className="font-semibold text-gray-800 text-sm sm:text-base">{title}</div>
        {subtitle && <div className="text-xs sm:text-sm text-gray-500 mt-1">{subtitle}</div>}
    </div>
);

const CpuInnerBox = ({ label }) => (
    <div className="mt-2 sm:mt-3 w-32 sm:w-36 p-2 rounded-md bg-white border border-indigo-200 text-indigo-700 text-xs sm:text-sm font-semibold shadow-sm">
        {label}
    </div>
);

const Chapter3 = () => {
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
        <div className="p-4 sm:p-6 lg:p-8 min-h-screen bg-gray-50 font-sans">
            <div className="max-w-6xl mx-auto">
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
                    <motion.h1 initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-gray-800">{t.title}</motion.h1>
                    <motion.p initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="text-gray-600 mt-2 max-w-2xl mx-auto text-sm sm:text-base lg:text-lg" dangerouslySetInnerHTML={{ __html: t.subtitle }} />
                </header>

                <motion.section initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.2 }} className="bg-white rounded-2xl p-4 sm:p-8 shadow-lg">
                    <h2 className="text-xl sm:text-2xl font-bold text-center text-gray-800 mb-2">{t.diagram_title}</h2>
                    <p className="text-center text-gray-600 mb-8 text-sm sm:text-base">{t.diagram_subtitle}</p>

                    <div className="flex flex-col md:flex-row items-center justify-around gap-4">
                        <DiagramBox title={t.input} subtitle={t.input_devices} bg="bg-indigo-50" border="border-indigo-200" icon={<FaKeyboard />} />
                        
                        <FaArrowRight className="text-2xl text-gray-400 hidden md:block" />
                        <FaArrowDown className="text-2xl text-gray-400 md:hidden" />

                        <div className="flex flex-col items-center gap-4">
                            <div className="rounded-xl p-4 sm:p-5 shadow-lg border-4 border-indigo-300 bg-indigo-50 w-56 sm:w-72 flex flex-col items-center">
                                <div className="text-3xl sm:text-4xl mb-2 text-pink-600"><FaMicrochip /></div>
                                <div className="text-base sm:text-lg font-bold text-indigo-900">{t.cpu}</div>
                                <div className="mt-2 sm:mt-4 w-full flex flex-col items-center">
                                    <CpuInnerBox label={t.cu} />
                                    <CpuInnerBox label={t.alu} />
                                </div>
                            </div>
                            <FaArrowDown className="text-3xl text-gray-400" />
                            <DiagramBox title={t.memory} subtitle={t.memory_desc} bg="bg-yellow-50" border="border-yellow-200" icon={<FaDatabase />} />
                        </div>
                        
                        <FaArrowRight className="text-2xl text-gray-400 hidden md:block" />
                        <FaArrowDown className="text-2xl text-gray-400 md:hidden" />

                        <DiagramBox title={t.output} subtitle={t.output_devices} bg="bg-green-50" border="border-green-200" icon={<FaDesktop />} />
                    </div>

                    <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
                        <div className="flex flex-col items-center">
                            <img src="https://i.cdn.newsbytesapp.com/images/l76620240904114749.jpeg" alt="CPU chip" className="w-full max-w-[288px] h-52 object-cover rounded-xl shadow-lg border-2 border-gray-200" />
                            <p className="mt-3 text-base sm:text-lg text-gray-800 font-semibold">{t.img1_caption}</p>
                        </div>
                        <div className="flex flex-col items-center">
                            <img src="https://img1.wsimg.com/isteam/ip/5138d36c-e672-4e5c-90cf-d7f5871abcd1/motherboard-683247_1280.png" alt="Motherboard" className="w-full max-w-[288px] h-52 object-cover rounded-xl shadow-lg border-2 border-gray-200" />
                            <p className="mt-3 text-base sm:text-lg text-gray-800 font-semibold">{t.img2_caption}</p>
                        </div>
                        <div className="flex flex-col items-center">
                            <img src="https://i.ytimg.com/vi/VWcsanwCQnE/maxresdefault.jpg" alt="Cabinet" className="w-full max-w-[288px] h-52 object-cover rounded-xl shadow-lg border-2 border-gray-200" />
                            <p className="mt-3 text-base sm:text-lg text-gray-800 font-semibold">{t.img3_caption}</p>
                        </div>
                    </div>

                    <div className="mt-8 max-w-3xl mx-auto text-gray-700 space-y-3 text-sm sm:text-base">
                        <p>{t.explanation1}</p>
                        <p dangerouslySetInnerHTML={{ __html: t.explanation2 }} />
                        <p>{t.explanation3}</p>
                    </div>
                </motion.section>

                <div className="w-full flex justify-between items-center mt-10 p-4 bg-gray-100 rounded-lg shadow-md">
                    <button onClick={() => navigate('/part1/computer-hardware')} className="flex items-center gap-2 px-4 py-2 bg-purple-200 hover:bg-purple-300 text-purple-900 rounded-lg shadow transition">
                        <FaArrowLeft /> {t.previous}
                    </button>
                    <button onClick={() => navigate('/part1/memory-and-storage')} className="flex items-center gap-2 px-4 py-2 bg-green-200 hover:bg-green-300 text-green-900 rounded-lg shadow transition">
                        {t.next} <FaArrowRight />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Chapter3;
