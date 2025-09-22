import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaKeyboard, FaMicrophone, FaMouse, FaDesktop, FaPrint, FaVolumeUp, FaHome, FaArrowLeft, FaArrowRight, FaArrowDown, FaTimes } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";

const content = {
    en: {
        home: "Home",
        title: "Input & Output Devices ⌨️🖱️",
        subtitle: "How we talk to the computer and how it talks back — with analogies, definitions, and interactive visuals.",
        understanding_title: "Understanding Input & Output",
        input_title: "🎯 Input Devices",
        input_analogy: "<strong>Analogy:</strong> Like our <em>hands and mouth</em>, they let us send instructions to the computer.",
        input_def: "<strong>Technical Definition:</strong> Hardware that allows users to enter data or control signals into a computer system.",
        input_examples_text: "Examples: Keyboard, mouse, scanner, microphone, joystick.",
        output_title: "📢 Output Devices",
        output_analogy: "<strong>Analogy:</strong> Like our <em>eyes and ears</em>, they present information from the computer back to us.",
        output_def: "<strong>Technical Definition:</strong> Hardware that conveys processed data from the computer to the user in visual, audio, or physical form.",
        output_examples_text: "Examples: Monitor, speakers, printer, projector.",
        diagram_title: "Input → Processing → Output",
        diagram_subtitle: "Devices let us provide data (input) and receive results (output). Some devices can do both.",
        cpu_title: "CPU / Processing",
        cpu_desc: "Where input is transformed into useful output.",
        process_label: "Process",
        learn_more: "Learn more ▾",
        memory_tip: "Memory Tip:",
        examples_label: "Examples:",
        challenge_title: "Quick Challenge",
        challenge_text: "Ask: \"Name one input and one output device you used today.\" Then explain each in one sentence.",
        button1_text: "Practice: List 5 inputs",
        button2_text: "Class Activity: Draw & Label",
        button2_alert: "Great idea! Have the students draw their favorite device and label its input/output parts.",
        facts_title: "Quick Facts & Tips",
        fact1: "<strong>Oldest mouse fact:</strong> the first mouse had a single button and was wooden!",
        fact2: "<strong>Microphones:</strong> modern voice recognition needs clear speech and a quiet room to work well.",
        fact3: "<strong>Monitors:</strong> more pixels = clearer images; DPI matters for print vs screen.",
        previous: "Previous",
        next: "Next",
        practice_modal_title: "Here are 5 Input Devices!",
    },
    hi: {
        home: "होम",
        title: "अध्याय 5: इनपुट और आउटपुट डिवाइस ⌨️🖱️",
        subtitle: "हम कंप्यूटर से कैसे बात करते हैं और वह कैसे जवाब देता है - उपमाओं, परिभाषाओं और इंटरैक्टिव दृश्यों के साथ।",
        understanding_title: "इनपुट और आउटपुट को समझना",
        input_title: "🎯 इनपुट डिवाइस",
        input_analogy: "<strong>उदाहरण:</strong> हमारे <em>हाथ और मुंह</em> की तरह, वे हमें कंप्यूटर को निर्देश भेजने देते हैं।",
        input_def: "<strong>तकनीकी परिभाषा:</strong> हार्डवेयर जो उपयोगकर्ताओं को कंप्यूटर सिस्टम में डेटा या नियंत्रण संकेत दर्ज करने की अनुमति देता है।",
        input_examples_text: "उदाहरण: कीबोर्ड, माउस, स्कैनर, माइक्रोफोन, जॉयस्टिक।",
        output_title: "📢 आउटपुट डिवाइस",
        output_analogy: "<strong>उदाहरण:</strong> हमारी <em>आंखों और कानों</em> की तरह, वे कंप्यूटर से संसाधित जानकारी हमें प्रस्तुत करते हैं।",
        output_def: "<strong>तकनीकी परिभाषा:</strong> हार्डवेयर जो कंप्यूटर से संसाधित डेटा को उपयोगकर्ता को दृश्य, श्रव्य या भौतिक रूप में पहुंचाता है।",
        output_examples_text: "उदाहरण: मॉनिटर, स्पीकर, प्रिंटर, प्रोजेक्टर।",
        diagram_title: "इनपुट → प्रसंस्करण → आउटपुट",
        diagram_subtitle: "डिवाइस हमें डेटा प्रदान करने (इनपुट) और परिणाम प्राप्त करने (आउटपुट) की सुविधा देते हैं। कुछ डिवाइस दोनों कर सकते हैं।",
        cpu_title: "सीपीयू / प्रसंस्करण",
        cpu_desc: "जहां इनपुट को उपयोगी आउटपुट में बदल दिया जाता है।",
        process_label: "प्रक्रिया",
        learn_more: "और जानें ▾",
        memory_tip: "याद रखने की युक्ति:",
        examples_label: "उदाहरण:",
        challenge_title: "त्वरित चुनौती",
        challenge_text: "पूछें: \"आज आपके द्वारा उपयोग किए गए एक इनपुट और एक आउटपुट डिवाइस का नाम बताएं।\" फिर प्रत्येक को एक वाक्य में समझाएं।",
        button1_text: "अभ्यास: 5 इनपुट सूचीबद्ध करें",
        button2_text: "कक्षा गतिविधि: ड्रा और लेबल",
        button2_alert: "बढ़िया विचार! छात्रों से उनके पसंदीदा डिवाइस को बनाने और उसके इनपुट/आउटपुट भागों को लेबल करने के लिए कहें।",
        facts_title: "त्वरित तथ्य और सुझाव",
        fact1: "<strong>सबसे पुराने माउस का तथ्य:</strong> पहले माउस में एक ही बटन था और वह लकड़ी का था!",
        fact2: "<strong>माइक्रोफोन:</strong> आधुनिक आवाज पहचान को अच्छी तरह से काम करने के लिए स्पष्ट भाषण और एक शांत कमरे की आवश्यकता होती है।",
        fact3: "<strong>मॉनिटर:</strong> अधिक पिक्सल = स्पष्ट चित्र; प्रिंट बनाम स्क्रीन के लिए डीपीआई मायने रखता है।",
        previous: "पिछला",
        next: "अगला",
        practice_modal_title: "यहाँ 5 इनपुट डिवाइस हैं!",
    }
};

const practiceExamples = {
    en: ["Keyboard", "Mouse", "Microphone", "Scanner", "Webcam"],
    hi: ["कीबोर्ड", "माउस", "माइक्रोफोन", "स्कैनर", "वेब कैमरा"]
};

const inputDevices = { en: [ { emoji: "⌨️", title: "Keyboard", short: "Type letters, numbers, and commands.", fact: "Think: 'Keyboard = Writing by hand'. Fast and versatile.", examples: ["Typing documents", "Chatting", "Shortcut commands (Ctrl/Cmd + C)"], icon: FaKeyboard }, { emoji: "🖱️", title: "Mouse / Touchpad", short: "Pointing, clicking, dragging — precision control.", fact: "Analogous to pointing with your finger; very useful for GUIs.", examples: ["Selecting text", "Dragging files", "Right-click menus"], icon: FaMouse }, { emoji: "🎙️", title: "Microphone", short: "Record voice or give voice commands.", fact: "Like speaking to a friend — the computer transcribes or responds.", examples: ["Voice assistant", "Recording audio for lessons"], icon: FaMicrophone } ], hi: [ { emoji: "⌨️", title: "कीबोर्ड", short: "अक्षर, संख्याएं और आदेश टाइप करें।", fact: "सोचें: 'कीबोर्ड = हाथ से लिखना'। तेज़ और बहुमुखी।", examples: ["दस्तावेज़ टाइप करना", "चैटिंग", "शॉर्टकट कमांड (Ctrl/Cmd + C)"], icon: FaKeyboard }, { emoji: "🖱️", title: "माउस / टचपैड", short: "इंगित करना, क्लिक करना, खींचना - सटीक नियंत्रण।", fact: "अपनी उंगली से इंगित करने के समान; जीयूआई के लिए बहुत उपयोगी।", examples: ["टेक्स्ट का चयन करना", "फ़ाइलें खींचना", "राइट-क्लिक मेनू"], icon: FaMouse }, { emoji: "🎙️", title: "माइक्रोफोन", short: "आवाज रिकॉर्ड करें या आवाज कमांड दें।", fact: "एक दोस्त से बात करने की तरह - कंप्यूटर लिखता है या जवाब देता है।", examples: ["वॉयस असिस्टेंट", "पाठ के लिए ऑडियो रिकॉर्ड करना"], icon: FaMicrophone } ] };
const outputDevices = { en: [ { emoji: "🖥️", title: "Monitor", short: "Shows visuals: text, images, videos.", fact: "Monitor = eyes of the computer. Resolution and size change clarity.", examples: ["Watching videos", "Viewing documents", "Presentations"], icon: FaDesktop }, { emoji: "🔊", title: "Speakers / Headphones", short: "Play sound: music, alerts, voice.", fact: "Speakers = voice of the computer. Volume & quality matter.", examples: ["Playing music", "Hearing notifications", "Audio for videos"], icon: FaVolumeUp }, { emoji: "🖨️", title: "Printer", short: "Produce physical copies of digital content.", fact: "Printer = paper output; handy for reports and certificates.", examples: ["Printing homework", "Photographs", "Tickets"], icon: FaPrint } ], hi: [ { emoji: "🖥️", title: "मॉनिटर", short: "दृश्य दिखाता है: पाठ, चित्र, वीडियो।", fact: "मॉनिटर = कंप्यूटर की आंखें। संकल्प और आकार स्पष्टता बदलते हैं।", examples: ["वीडियो देखना", "दस्तावेज़ देखना", "प्रस्तुतियाँ"], icon: FaDesktop }, { emoji: "🔊", title: "स्पीकर / हेडफ़ोन", short: "ध्वनि चलाएं: संगीत, अलर्ट, आवाज।", fact: "स्पीकर = कंप्यूटर की आवाज। वॉल्यूम और गुणवत्ता मायने रखती है।", examples: ["संगीत बजाना", "सूचनाएं सुनना", "वीडियो के लिए ऑडियो"], icon: FaVolumeUp }, { emoji: "🖨️", title: "प्रिंटर", short: "डिजिटल सामग्री की भौतिक प्रतियां तैयार करें।", fact: "प्रिंटर = कागज आउटपुट; रिपोर्ट और प्रमाण पत्र के लिए आसान।", examples: ["होमवर्क प्रिंट करना", "तस्वीरें", "टिकट"], icon: FaPrint } ] };

const DeviceCard = ({ emoji, title, short, fact, examples, icon: Icon, t }) => ( <motion.div whileHover={{ y: -6, scale: 1.02 }} className="bg-white rounded-2xl shadow-md p-5 hover:shadow-xl transition-transform duration-300"> <div className="flex items-start space-x-4"> <div className="w-14 h-14 rounded-full bg-gradient-to-br from-indigo-50 to-indigo-100 flex items-center justify-center text-3xl shadow-sm"><span aria-hidden>{emoji}</span></div> <div className="flex-1"> <div className="flex items-center justify-between"> <h3 className="text-lg font-semibold text-indigo-800">{title}</h3> <div className="text-indigo-500 text-2xl"><Icon /></div> </div> <p className="text-sm text-gray-700 mt-2">{short}</p> <details className="mt-3 group"> <motion.summary whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="cursor-pointer text-sm text-indigo-600 font-medium list-none flex items-center"> {t.learn_more} <span className="transition-transform duration-300 group-open:rotate-90 ml-1">▸</span> </motion.summary> <div className="mt-2 text-sm text-gray-700 space-y-2"> <p><strong>{t.memory_tip}</strong> {fact}</p> {examples && ( <div><div className="font-semibold mt-1">{t.examples_label}</div><ul className="list-disc pl-5 mt-1 text-gray-700">{examples.map((ex, i) => (<li key={i}>{ex}</li>))}</ul></div>)} </div> </details> </div> </div> </motion.div> );

const Chapter5 = () => {
    const [lang, setLang] = useState('en');
    const [isPracticeModalOpen, setIsPracticeModalOpen] = useState(false);
    const navigate = useNavigate();
    const t = content[lang];
    const inputs = inputDevices[lang];
    const outputs = outputDevices[lang];

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

    const handlePracticeClick = () => {
        confetti({ particleCount: 150, spread: 90, origin: { y: 0.6 } });
        setIsPracticeModalOpen(true);
    };

    return (
        <div className="p-4 sm:p-6 lg:p-8 min-h-screen bg-gray-50 font-sans">
            <AnimatePresence>
                {isPracticeModalOpen && (
                    <motion.div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsPracticeModalOpen(false)}>
                        <motion.div className="bg-white rounded-2xl shadow-2xl p-6 max-w-sm w-full" initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 20 }} onClick={(e) => e.stopPropagation()}>
                            <div className="flex justify-between items-center mb-4"><h3 className="text-xl font-bold text-indigo-700">{t.practice_modal_title}</h3><motion.button whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.9 }} onClick={() => setIsPracticeModalOpen(false)} className="text-gray-500 hover:text-gray-800"><FaTimes /></motion.button></div>
                            <ul className="space-y-2">{practiceExamples[lang].map((item, index) => (
                                <motion.li key={index} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 + index * 0.1 }} className="p-3 bg-indigo-50 rounded-lg font-medium text-indigo-800">{item}</motion.li>
                            ))}</ul>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
            <div className="max-w-6xl mx-auto">
                <div className="flex items-center justify-between mb-8">
                    <Link to="/parts/prt1" className="inline-flex items-center px-4 py-2 bg-white rounded-full shadow-md border border-gray-200 hover:bg-gray-100 transition"><FaHome className="mr-2 text-lg text-sky-600" />{t.home}</Link>
                    <div className="flex space-x-2">
                        <button onClick={() => setLang("en")} className={`px-3 py-1 rounded-lg border font-semibold ${lang === "en" ? "bg-sky-600 text-white border-sky-600" : "bg-white text-gray-700 border-gray-300"} transition`}>EN</button>
                        <button onClick={() => setLang("hi")} className={`px-3 py-1 rounded-lg border font-semibold ${lang === "hi" ? "bg-sky-600 text-white border-sky-600" : "bg-white text-gray-700 border-gray-300"} transition`}>हिं</button>
                    </div>
                </div>
                <header className="text-center mb-10">
                    <motion.h1 initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-800">{t.title}</motion.h1>
                    <motion.p initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="text-gray-600 mt-2 max-w-3xl mx-auto text-sm sm:text-base lg:text-lg">{t.subtitle}</motion.p>
                </header>
                <section className="bg-gradient-to-r from-indigo-50 to-blue-50 p-6 rounded-2xl shadow mb-8">
                    <h2 className="text-xl sm:text-2xl font-bold text-indigo-800 mb-4">{t.understanding_title}</h2>
                    <div className="grid md:grid-cols-2 gap-6">
                        <div className="p-4 bg-white rounded-xl shadow"><h3 className="font-semibold text-lg text-indigo-700 mb-2">{t.input_title}</h3><p className="mb-2 text-sm sm:text-base" dangerouslySetInnerHTML={{ __html: t.input_analogy }} /><p className="mb-1 text-sm sm:text-base" dangerouslySetInnerHTML={{ __html: t.input_def }} /><p className="text-sm text-gray-700">{t.input_examples_text}</p></div>
                        <div className="p-4 bg-white rounded-xl shadow"><h3 className="font-semibold text-lg text-indigo-700 mb-2">{t.output_title}</h3><p className="mb-2 text-sm sm:text-base" dangerouslySetInnerHTML={{ __html: t.output_analogy }} /><p className="mb-1 text-sm sm:text-base" dangerouslySetInnerHTML={{ __html: t.output_def }} /><p className="text-sm text-gray-700">{t.output_examples_text}</p></div>
                    </div>
                </section>
                <section className="bg-white rounded-3xl p-4 sm:p-8 shadow-lg mb-8">
                    <h2 className="text-2xl sm:text-3xl font-bold text-center text-gray-800 mb-2">{t.diagram_title}</h2>
                    <p className="text-center text-gray-600 mb-8 max-w-2xl mx-auto">{t.diagram_subtitle}</p>
                    <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                        <div className="flex-1 w-full"><div className="grid gap-4">{inputs.map((d, i) => <DeviceCard key={`in-${i}`} {...d} t={t} />)}</div></div>
                        <div className="flex flex-col items-center my-4 md:my-0">
                            <div className="bg-indigo-50 rounded-xl p-6 shadow-inner border border-indigo-100 text-center w-48 sm:w-60 mb-4">
                                <div className="text-indigo-600 text-4xl mb-2">🧠</div>
                                <div className="text-lg font-bold text-indigo-900">{t.cpu_title}</div>
                                <p className="text-sm text-gray-700 mt-2">{t.cpu_desc}</p>
                            </div>
                            <div className="flex items-center space-x-2 md:flex-col md:space-y-2">
                                <motion.div animate={{ x: [0, 8, 0] }} transition={{ repeat: Infinity, repeatType: "loop", duration: 1.4 }} className="text-indigo-500 text-3xl hidden md:block" aria-hidden><FaArrowRight /></motion.div>
                                <motion.div animate={{ y: [0, 8, 0] }} transition={{ repeat: Infinity, repeatType: "loop", duration: 1.4 }} className="text-indigo-500 text-3xl md:hidden" aria-hidden><FaArrowDown /></motion.div>
                                <div className="px-3 py-1 rounded-full bg-gray-100 text-sm">{t.process_label}</div>
                                <motion.div animate={{ x: [0, -8, 0] }} transition={{ repeat: Infinity, repeatType: "loop", duration: 1.4 }} className="text-indigo-500 text-3xl hidden md:block" aria-hidden><FaArrowLeft /></motion.div>
                                <motion.div animate={{ y: [0, -8, 0] }} transition={{ repeat: Infinity, repeatType: "loop", duration: 1.4 }} className="text-indigo-500 text-3xl md:hidden" aria-hidden><FaArrowDown /></motion.div>
                            </div>
                        </div>
                        <div className="flex-1 w-full"><div className="grid gap-4">{outputs.map((d, i) => <DeviceCard key={`out-${i}`} {...d} t={t} />)}</div></div>
                    </div>
                </section>
                <section className="bg-white rounded-2xl p-6 shadow-md mb-8">
                    <h3 className="text-xl font-semibold mb-2">{t.challenge_title}</h3>
                    <p className="text-gray-700 mb-4">{t.challenge_text}</p>
                    <div className="flex gap-3 flex-wrap">
                        <motion.button onClick={handlePracticeClick} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="px-4 py-2 bg-indigo-600 text-white rounded-lg shadow hover:bg-indigo-700 transition">{t.button1_text}</motion.button>
                        <motion.button onClick={() => alert(t.button2_alert)} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="px-4 py-2 bg-yellow-500 text-white rounded-lg shadow hover:bg-yellow-600 transition">{t.button2_text}</motion.button>
                    </div>
                </section>
                <section className="bg-white rounded-2xl p-6 shadow-sm mb-12">
                    <h3 className="text-lg font-semibold mb-2">{t.facts_title}</h3>
                    <ul className="list-disc pl-5 text-gray-700 space-y-1">
                        <li dangerouslySetInnerHTML={{ __html: t.fact1 }} />
                        <li dangerouslySetInnerHTML={{ __html: t.fact2 }} />
                        <li dangerouslySetInnerHTML={{ __html: t.fact3 }} />
                    </ul>
                </section>
                <div className="w-full flex justify-between items-center mt-10 p-4 bg-gray-100 rounded-lg shadow-md">
                    <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={() => navigate('/part1/memory-and-storage')} className="flex items-center gap-2 px-4 py-2 bg-purple-200 hover:bg-purple-300 text-purple-900 rounded-lg shadow transition"><FaArrowLeft />{t.previous}</motion.button>
                    <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={() => navigate('/part1/peripherals')} className="flex items-center gap-2 px-4 py-2 bg-green-200 hover:bg-green-300 text-green-900 rounded-lg shadow transition">{t.next}<FaArrowRight /></motion.button>
                </div>
            </div>
        </div>
    );
};

export default Chapter5;
