import React, { useState,useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaHome, FaMobileAlt, FaTv, FaLightbulb, FaArrowLeft, FaArrowRight, FaTimes } from "react-icons/fa";
import { MdLocalLaundryService, MdOutlineRouter, MdVideogameAsset, MdWatch } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";

const content = {
    en: {
        home: "Home",
        title: "Chapter 6 — What is Software?",
        concept: "Software is the set of instructions that makes the hardware work.",
        analogy_title: "Analogy",
        analogy_text: "Hardware = the car. ",
        analogy_text_span: "Software = the driver",
        analogy_text_cont: " that tells the car where to go.",
        no_software: "No S/W",
        with_software: "With S/W",
        task: "Task",
        task_text: "Play Music",
        toggle_tip_title: "Try the toggle",
        toggle_tip_text: "See software in action",
        simple_explanation: "Simple Explanation",
        explanation_p1: "Think: ",
        explanation_p1_span1: "Hardware",
        explanation_p1_cont: " is the physical parts (like the car). ",
        explanation_p1_span2: "Software",
        explanation_p1_cont2: " is the instructions (like the driver) telling the hardware what to do.",
        explanation_p2: "Analogy: the driver tells the car where to go, how fast, and when to stop.",
        examples_tap: "Tap to see the software examples",
        hide: "Hide",
        show: "Show",
        software_examples: "Software examples:",
        fun_activity: "Fun Activity",
        activity_text: "Ask 2 friends: Name a device and then say what the “software” for it would be. Example: TV → YouTube app.",
        give_example: "Give me an example",
        show_with_software: "Show 'With Software'",
        stop_animation: "Stop",
        previous: "Previous",
        next: "Next",
        footer_tip: "Tip:",
        footer_tip_text: " Without software, hardware is just parts. Software is the instruction book that makes parts useful.",
        modal_title: "More Fun Examples!",
        modal_close: "Close",
    },
    hi: {
        home: "होम",
        title: "अध्याय 6 - सॉफ्टवेयर क्या है?",
        concept: "सॉफ्टवेयर उन निर्देशों का समूह है जो हार्डवेयर को काम करने में मदद करता है।",
        analogy_title: "उदाहरण",
        analogy_text: "हार्डवेयर = कार। ",
        analogy_text_span: "सॉफ्टवेयर = ड्राइवर",
        analogy_text_cont: " जो कार को बताता है कि कहाँ जाना है।",
        no_software: "सॉफ्टवेयर नहीं",
        with_software: "सॉफ्टवेयर के साथ",
        task: "कार्य",
        task_text: "संगीत चलाएं",
        toggle_tip_title: "टॉगल आज़माएं",
        toggle_tip_text: "सॉफ्टवेयर को काम करते देखें",
        simple_explanation: "सरल व्याख्या",
        explanation_p1: "सोचें: ",
        explanation_p1_span1: "हार्डवेयर",
        explanation_p1_cont: " भौतिक हिस्से हैं (जैसे कार)। ",
        explanation_p1_span2: "सॉफ्टवेयर",
        explanation_p1_cont2: " निर्देश हैं (जैसे ड्राइवर) जो हार्डवेयर को बताते हैं कि क्या करना है।",
        explanation_p2: "उदाहरण: ड्राइवर कार को बताता है कि कहाँ जाना है, कितनी तेजी से, और कब रुकना है।",
        examples_tap: "सॉफ्टवेयर के उदाहरण देखने के लिए टैप करें",
        hide: "छिपाएं",
        show: "दिखाएं",
        software_examples: "सॉफ्टवेयर के उदाहरण:",
        fun_activity: "मजेदार गतिविधि",
        activity_text: "2 दोस्तों से पूछें: एक डिवाइस का नाम बताएं और फिर बताएं कि उसके लिए “सॉफ्टवेयर” क्या होगा। उदाहरण: टीवी → यूट्यूब ऐप।",
        give_example: "मुझे एक उदाहरण दें",
        show_with_software: "'सॉफ्टवेयर के साथ' दिखाएं",
        stop_animation: "रोके",
        previous: "पिछला",
        next: "अगला",
        footer_tip: "सुझाव:",
        footer_tip_text: " सॉफ्टवेयर के बिना, हार्डवेयर सिर्फ पुर्जे हैं। सॉफ्टवेयर वह निर्देश पुस्तिका है जो पुर्जों को उपयोगी बनाती है।",
        modal_title: "और भी मजेदार उदाहरण!",
        modal_close: "बंद करें",
    }
};

const examplesData = {
    en: [
        { id: "phone", title: "Smartphone", deviceIcon: <FaMobileAlt className="text-3xl text-indigo-600" />, exampleSoftware: ["WhatsApp", "YouTube", "Calculator", "Camera App"] },
        { id: "tv", title: "Smart TV", deviceIcon: <FaTv className="text-3xl text-orange-500" />, exampleSoftware: ["YouTube App", "Netflix", "Settings", "Screen Cast"] },
        { id: "washing", title: "Washing Machine", deviceIcon: <MdLocalLaundryService className="text-3xl text-teal-600" />, exampleSoftware: ["Wash Program Controller", "Delay Start Timer"] },
    ],
    hi: [
        { id: "phone", title: "स्मार्टफोन", deviceIcon: <FaMobileAlt className="text-3xl text-indigo-600" />, exampleSoftware: ["व्हाट्सएप", "यूट्यूब", "कैलकुलेटर", "कैमरा ऐप"] },
        { id: "tv", title: "स्मार्ट टीवी", deviceIcon: <FaTv className="text-3xl text-orange-500" />, exampleSoftware: ["यूट्यूब ऐप", "नेटफ्लिक्स", "सेटिंग्स", "स्क्रीन कास्ट"] },
        { id: "washing", title: "वॉशिंग मशीन", deviceIcon: <MdLocalLaundryService className="text-3xl text-teal-600" />, exampleSoftware: ["वॉश प्रोग्राम कंट्रोलर", "डिले स्टार्ट टाइमर"] },
    ]
};

const funExamples = {
    en: [
        { device: "Gaming Console", software: "The game itself (e.g., Mario Kart)", icon: <MdVideogameAsset/> },
        { device: "Smart Watch", software: "Fitness Tracker, Clock Face App", icon: <MdWatch/> },
        { device: "Wi-Fi Router", software: "Firmware that connects you to the internet", icon: <MdOutlineRouter/> },
        { device: "Robot Vacuum", software: "Room mapping & cleaning schedule program", icon: <FaHome/> },
    ],
    hi: [
        { device: "गेमिंग कंसोल", software: "गेम खुद (जैसे, मारियो कार्ट)", icon: <MdVideogameAsset/> },
        { device: "स्मार्ट वॉच", software: "फिटनेस ट्रैकर, क्लॉक फेस ऐप", icon: <MdWatch/> },
        { device: "वाई-फाई राउटर", software: "फर्मवेयर जो आपको इंटरनेट से जोड़ता है", icon: <MdOutlineRouter/> },
        { device: "रोबोट वैक्यूम", software: "कमरे की मैपिंग और सफाई शेड्यूल प्रोग्राम", icon: <FaHome/> },
    ]
}


export default function Chapter6() {
  const [powered, setPowered] = useState(false);
  const [openExample, setOpenExample] = useState(null);
  const [lang, setLang] = useState('en');
  const [isExampleModalOpen, setIsExampleModalOpen] = useState(false);
  const navigate = useNavigate();

  const t = content[lang];
  const examples = examplesData[lang];
  const modalExamples = funExamples[lang];

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
    <div className="min-h-screen relative bg-gradient-to-br from-pink-50 via-purple-50 to-yellow-50 p-4 sm:p-8 md:px-12 font-sans overflow-hidden">
        <AnimatePresence>
            {isExampleModalOpen && (
                <motion.div 
                    className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={() => setIsExampleModalOpen(false)}
                >
                    <motion.div 
                        className="bg-white rounded-2xl shadow-2xl p-6 max-w-md w-full"
                        initial={{ scale: 0.9, y: 20 }}
                        animate={{ scale: 1, y: 0 }}
                        exit={{ scale: 0.9, y: 20 }}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-xl font-bold text-indigo-700">{t.modal_title}</h3>
                            <button onClick={() => setIsExampleModalOpen(false)} className="text-gray-500 hover:text-gray-800">
                                <FaTimes />
                            </button>
                        </div>
                        <ul className="space-y-3">
                            {modalExamples.map((ex, index) => (
                                <li key={index} className="flex items-center gap-4 p-3 bg-indigo-50 rounded-lg">
                                    <div className="text-3xl text-indigo-500">{ex.icon}</div>
                                    <div>
                                        <p className="font-bold text-gray-800">{ex.device}</p>
                                        <p className="text-sm text-gray-600">→ {ex.software}</p>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>

      <div className="flex items-center justify-between">
          <Link
            to="/parts/prt2"
            className="inline-flex items-center px-4 py-2 bg-white rounded-full shadow-md border border-gray-200 hover:bg-gray-100 transition"
          >
            <FaHome className="mr-2 text-lg text-sky-600" />
            {t.home}
          </Link>

          <div className="flex space-x-2">
            <button
                onClick={() => setLang("en")}
                className={`px-3 py-1 rounded-lg border font-semibold ${lang === "en" ? "bg-sky-600 text-white border-sky-600" : "bg-white text-gray-700 border-gray-300"} transition`}
            >
                EN
            </button>
            <button
                onClick={() => setLang("hi")}
                className={`px-3 py-1 rounded-lg border font-semibold ${lang === "hi" ? "bg-sky-600 text-white border-sky-600" : "bg-white text-gray-700 border-gray-300"} transition`}
            >
                हिं
            </button>
          </div>
        </div>

      <motion.h1
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 120 }}
        className="text-2xl md:text-4xl font-extrabold text-center text-purple-700 my-8"
      >
        🚗 {t.title}
      </motion.h1>

      <p className="text-center text-pink-600 font-medium mb-8 -mt-4 px-2">
        {t.concept}
      </p>

      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <div className="relative bg-white/60 rounded-2xl p-6 shadow-lg">
          <div className="flex justify-between items-center mb-4">
            <div>
              <h2 className="text-lg font-bold text-gray-800">{t.analogy_title}</h2>
              <p className="text-sm text-gray-600 pr-6">
                {t.analogy_text}<span className="font-semibold">{t.analogy_text_span}</span>{t.analogy_text_cont}
              </p>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-500">{t.no_software}</span>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={powered}
                  onChange={() => setPowered((p) => !p)}
                  className="sr-only peer"
                />
                <div className="w-12 h-6 bg-gray-300 rounded-full peer-checked:bg-indigo-500 transition" />
                <div className="absolute left-0.5 top-0.5 w-5 h-5 bg-white rounded-full shadow transform peer-checked:translate-x-6 transition" />
              </label>
              <span className="text-sm text-gray-500">{t.with_software}</span>
            </div>
          </div>

          <div className="h-56 relative overflow-hidden">
            <div className="absolute left-0 right-0 bottom-8 h-20 bg-gradient-to-r from-gray-200 to-gray-300 rounded-lg shadow-inner" />

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="absolute right-4 top-2 sm:right-6 sm:top-6 bg-yellow-100 px-3 py-2 rounded-lg shadow-md border border-yellow-200 max-w-[40%]"
            >
              <div className="text-xs sm:text-sm font-semibold text-yellow-800">{t.task}</div>
              <div className="text-xs text-yellow-700">{t.task_text}</div>
            </motion.div>

            <motion.div
              animate={powered ? { x: [-20, 160, 320] } : { x: 0 }}
              transition={powered ? { repeat: Infinity, repeatType: "loop", duration: 4, ease: "easeInOut" } : { duration: 0 }}
              className="absolute bottom-8 left-6"
            >
              <svg width="220" height="110" viewBox="0 0 220 110" xmlns="http://www.w3.org/2000/svg">
                <rect x="10" y="30" rx="20" ry="20" width="180" height="50" fill={powered ? "#4f46e5" : "#c7c7c7"} stroke="#333" strokeWidth="2" />
                <path d="M40 30 L80 10 L140 10 L170 30 Z" fill={powered ? "#6d28d9" : "#bdbdbd"} stroke="#333" strokeWidth="2" />
                <circle cx="50" cy="85" r="12" fill="#111827" />
                <circle cx="150" cy="85" r="12" fill="#111827" />
                <circle cx="100" cy="35" r="8" fill={powered ? "#ffd29b" : "#e6e6e6"} stroke="#333" />
                {powered ? (
                  <g>
                    <circle cx="98" cy="35" r="1.5" fill="#000" />
                    <circle cx="102" cy="35" r="1.5" fill="#000" />
                  </g>
                ) : (
                  <g>
                    <line x1="95" y1="35" x2="101" y2="35" stroke="#777" strokeWidth="1.2" />
                    <line x1="103" y1="35" x2="109" y2="35" stroke="#777" strokeWidth="1.2" />
                  </g>
                )}
                {powered && (
                  <g>
                    <path d="M190 40 q10 -5 20 0" stroke="#ffd166" strokeWidth="2" fill="none" opacity="0.9" />
                    <path d="M190 50 q10 -5 20 0" stroke="#ffd166" strokeWidth="2" fill="none" opacity="0.6" />
                  </g>
                )}
              </svg>
            </motion.div>

            <div className="absolute left-4 top-2 sm:left-6 sm:top-6 bg-white/80 px-3 py-2 rounded-lg shadow-sm max-w-[45%]">
              <div className="text-xs sm:text-sm text-gray-700 font-semibold">{t.toggle_tip_title}</div>
              <div className="text-xs text-gray-500">{t.toggle_tip_text}</div>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <motion.div
            initial={{ scale: 0.98, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.15 }}
            className="bg-white rounded-2xl p-5 shadow-lg"
          >
            <h3 className="text-lg font-bold text-gray-800 mb-2">{t.simple_explanation}</h3>
            <p className="text-gray-600 text-sm">
              {t.explanation_p1}<span className="font-semibold">{t.explanation_p1_span1}</span>{t.explanation_p1_cont}
              <span className="font-semibold">{t.explanation_p1_span2}</span>{t.explanation_p1_cont2}
            </p>
            <div className="mt-3 flex items-center gap-2 text-sm text-gray-700">
              <FaLightbulb className="text-yellow-500" />
              <div>{t.explanation_p2}</div>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 gap-3">
            {examples.map((ex) => {
              const opened = openExample === ex.id;
              return (
                <motion.div
                  key={ex.id}
                  layout
                  transition={{ layout: { duration: 0.25 } }}
                  className={`bg-white rounded-2xl p-4 shadow-md cursor-pointer border ${opened ? "border-indigo-300" : "border-transparent"}`}
                  onClick={() => setOpenExample(opened ? null : ex.id)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-indigo-50 rounded-lg flex items-center justify-center">
                        {ex.deviceIcon}
                      </div>
                      <div>
                        <div className="font-semibold text-gray-800">{ex.title}</div>
                        <div className="text-xs text-gray-500">{t.examples_tap}</div>
                      </div>
                    </div>
                    <div className="text-xs text-indigo-600 font-medium">{opened ? t.hide : t.show}</div>
                  </div>

                  {opened && (
                    <motion.div
                      initial={{ opacity: 0, y: -6 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.2 }}
                      className="mt-3 text-sm text-gray-700"
                    >
                      <div className="font-medium mb-2">{t.software_examples}</div>
                      <ul className="list-disc pl-5 space-y-1">
                        {ex.exampleSoftware.map((s) => (
                          <li key={s} className="text-gray-600">{s}</li>
                        ))}
                      </ul>
                    </motion.div>
                  )}
                </motion.div>
              );
            })}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-2xl p-4 shadow-lg"
          >
            <h4 className="font-semibold text-gray-800">{t.fun_activity}</h4>
            <p className="text-sm text-gray-600 mb-2">
              {t.activity_text}
            </p>
            <div className="flex gap-2">
              <button
                onClick={() => setIsExampleModalOpen(true)}
                className="px-3 py-2 bg-indigo-600 text-white rounded-lg text-sm shadow hover:bg-indigo-700 transition"
              >
                {t.give_example}
              </button>
              <button
                onClick={() => setPowered(!powered)}
                className="px-3 py-2 bg-green-500 text-white rounded-lg text-sm shadow hover:bg-green-600 transition"
              >
                {powered ? t.stop_animation : t.show_with_software}
              </button>
            </div>
          </motion.div>
        </div>
      </div>
      <div className="flex justify-between items-center mt-10 p-4 bg-gray-100 rounded-lg shadow-md">
        <button
          onClick={() => navigate('/parts/prt2')}
          className="flex items-center gap-2 px-4 py-2 bg-purple-200 hover:bg-purple-300 text-purple-900 rounded-lg shadow transition"
        >
          <FaArrowLeft />
          {t.previous}
        </button>

        <button
          onClick={() => navigate('/module1/operating-system')}
          className="flex items-center gap-2 px-4 py-2 bg-green-200 hover:bg-green-300 text-green-900 rounded-lg shadow transition"
        >
          {t.next}
          <FaArrowRight />
        </button>
      </div>
      <div className="max-w-3xl mx-auto mt-8 text-center text-sm text-gray-600">
        <strong>{t.footer_tip}</strong>{t.footer_tip_text}
      </div>
    </div>
  );
}
