import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FaGlobe, FaWifi, FaLaptopCode, FaMobileAlt, FaBook, FaHeartbeat, FaBriefcase, FaUniversity, FaComments, FaFilm, FaArrowLeft, FaArrowRight, FaHome, FaLanguage } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const instructionsContent = {
  en: {
    title: "Welcome! Let’s learn how to use this journey.",
    home_button:
      "The Home button is always at the top-left. Tap it anytime to safely return to the main menu.",
    language_toggle:
      "At the top-right, you’ll find the EN/हिं button. Use it to switch between English and Hindi whenever you like.",
    navigation:
      "At the bottom of the page, the Previous and Next buttons will guide you step by step through the adventure. Please read each page carefully before moving on.",
    understand_button: "I Understand, Let’s Begin!"
  },
  hi: {
    title: "नमस्ते! आइए जानें कि इस यात्रा का उपयोग कैसे करें।",
    home_button:
      "ऊपर-बाएँ कोने में होम बटन दिया गया है। इसे दबाकर आप किसी भी समय मुख्य पृष्ठ पर आराम से वापस जा सकते हैं।",
    language_toggle:
      "ऊपर-दाएँ कोने में EN/हिं बटन है। इसकी मदद से आप अपनी पसंद की भाषा — हिंदी या अंग्रेज़ी — चुन सकते हैं।",
    navigation:
      "पेज के सबसे नीचे 'पिछला' और 'अगला' बटन दिए गए हैं। ये आपको एक-एक कदम करके आगे बढ़ने में मदद करेंगे। ध्यान रखिए, हर पेज को अच्छे से पढ़ने के बाद ही आगे बढ़ें।",
    understand_button: "ठीक है, मैंने समझ लिया!"
  }
};

const InstructionsOverlay = ({ onUnderstood, lang, setLang }) => {
  const t = instructionsContent[lang];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        className="bg-white rounded-2xl shadow-2xl p-6 max-w-4xl w-[90%] max-h-[85vh] overflow-y-auto text-center"
      >
        {/* Top Right Language Toggle */}
        <div className="flex justify-end mb-4">
          <div className="flex space-x-2">
            <button
              onClick={() => setLang("en")}
              className={`px-3 py-1 rounded-lg border font-semibold ${
                lang === "en"
                  ? "bg-sky-600 text-white border-sky-600"
                  : "bg-white text-gray-700 border-gray-300"
              } transition`}
            >
              EN
            </button>
            <button
              onClick={() => setLang("hi")}
              className={`px-3 py-1 rounded-lg border font-semibold ${
                lang === "hi"
                  ? "bg-sky-600 text-white border-sky-600"
                  : "bg-white text-gray-700 border-gray-300"
              } transition`}
            >
              हिं
            </button>
          </div>
        </div>

        {/* Title */}
        <h1 className="text-3xl font-extrabold text-indigo-700 mb-6">
          {t.title}
        </h1>

        {/* Instructions */}
        <div className="space-y-6 text-left px-2 sm:px-6">
          {/* Home Button */}
          <div className="flex items-center gap-4">
            <div className="flex items-center justify-center w-14 h-14 bg-blue-100 rounded-full">
              <FaHome className="text-2xl text-sky-600" />
            </div>
            <div>
              <p className="text-lg text-gray-800">{t.home_button}</p>
              <div className="inline-flex items-center px-4 py-1 mt-2 bg-white rounded-full shadow-md border border-gray-200">
                <FaHome className="mr-2 text-lg text-sky-600" />
                {lang === "en" ? "Home" : "होम"}
              </div>
            </div>
          </div>

          {/* Language Toggle */}
          <div className="flex items-center gap-4">
            <div className="flex items-center justify-center w-14 h-14 bg-blue-100 rounded-full">
              <FaLanguage className="text-2xl text-sky-600" />
            </div>
            <div>
              <p className="text-lg text-gray-800">{t.language_toggle}</p>
              <div className="flex space-x-2 mt-2">
                <button className="px-3 py-1 rounded-lg border font-semibold bg-sky-600 text-white border-sky-600">
                  EN
                </button>
                <button className="px-3 py-1 rounded-lg border font-semibold bg-white text-gray-700 border-gray-300">
                  हिं
                </button>
              </div>
            </div>
          </div>

          {/* Navigation Buttons */}
          <div className="flex items-center gap-4">
            <div className="flex items-center justify-center w-14 h-14 bg-blue-100 rounded-full">
              <FaArrowRight className="text-2xl text-green-600" />
            </div>
            <div>
              <p className="text-lg text-gray-800">{t.navigation}</p>
              <div className="flex gap-4 mt-2">
                <button className="flex items-center gap-2 px-4 py-2 bg-purple-200 text-purple-900 rounded-lg shadow">
                  <FaArrowLeft />
                  {lang === "en" ? "Previous" : "पिछला"}
                </button>
                <button className="flex items-center gap-2 px-4 py-2 bg-green-200 text-green-900 rounded-lg shadow">
                  {lang === "en" ? "Next" : "अगला"}
                  <FaArrowRight />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Understood Button */}
        <button
          onClick={onUnderstood}
          className="mt-8 px-8 py-3 bg-indigo-600 text-white font-bold rounded-lg shadow-lg hover:bg-indigo-700 transition-transform transform hover:scale-105"
        >
          {t.understand_button}
        </button>
      </motion.div>
    </div>
  );
};

const ICTComponent = () => {
  const [lang, setLang] = useState("en");
  const [showInstructions, setShowInstructions] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" }); // 👈 scroll to top when page loads
  }, []);


  const content = {
    en: {
      home: "Home",
      title: "What is ICT?",
      description:
        "ICT stands for Information and Communication Technology. It's a broad term that covers all technologies used to handle telecommunications, broadcast media, intelligent building management systems, audiovisual processing and transmission systems, and network-based control and monitoring functions.",
      past: {
        title: "🕰️ ICT in the Past",
        text: "Before the internet, ICT was mainly about telephones, radios, and televisions. Information was slow to travel, and communication was mostly one-to-one or one-to-many. Computers were large, expensive, and used only by experts."
      },
      present: {
        title: "🚀 ICT Today",
        text: "Now, ICT is all around us! With the internet, smartphones, and cloud computing, we can access information instantly, connect with people globally, and use powerful applications for work, learning, and entertainment. It has become an integral part of modern life."
      },
      usage_title: "📌 Key Usage Areas of ICT",
      usage: [
        { name: "Education", icon: <FaBook /> },
        { name: "Healthcare", icon: <FaHeartbeat /> },
        { name: "Business", icon: <FaBriefcase /> },
        { name: "Banking", icon: <FaUniversity /> },
        { name: "Communication", icon: <FaComments /> },
        { name: "Entertainment", icon: <FaFilm /> }
      ],
      connect: "🌍 ICT connects the world by breaking barriers of distance and time through instant communication and global access to knowledge.",
      need: "⚡ Why the World Needs ICT: To improve learning, boost productivity, increase connectivity, and create smarter solutions for everyday life.",
      button_prev: "Previous",
      button_next: "Let's Deep Dive"
    },
    hi: {
      home: "होम",
      title: "आईसीटी क्या है?",
      description:
        "आईसीटी का अर्थ है सूचना और संचार प्रौद्योगिकी। यह एक व्यापक शब्द है जो दूरसंचार, प्रसारण मीडिया, बुद्धिमान भवन प्रबंधन प्रणाली, ऑडियोविजुअल प्रसंस्करण और प्रसारण प्रणाली, और नेटवर्क-आधारित नियंत्रण और निगरानी कार्यों को संभालने के लिए उपयोग की जाने वाली सभी तकनीकों को शामिल करता है।",
      past: {
        title: "🕰️ अतीत में आईसीटी",
        text: "इंटरनेट से पहले, आईसीटी मुख्य रूप से टेलीफोन, रेडियो और टेलीविजन के बारे में था। सूचना धीमी गति से यात्रा करती थी, और संचार ज्यादातर एक-से-एक या एक-से-कई होता था। कंप्यूटर बड़े, महंगे थे, और केवल विशेषज्ञों द्वारा उपयोग किए जाते थे।"
      },
      present: {
        title: "🚀 आज आईसीटी",
        text: "अब, आईसीटी हमारे चारों ओर है! इंटरनेट, स्मार्टफोन और क्लाउड कंप्यूटिंग के साथ, हम तुरंत जानकारी तक पहुंच सकते हैं, विश्व स्तर पर लोगों से जुड़ सकते हैं, और काम, सीखने और मनोरंजन के लिए शक्तिशाली अनुप्रयोगों का उपयोग कर सकते हैं। यह आधुनिक जीवन का एक अभिन्न अंग बन गया है।"
      },
      usage_title: "📌 आईसीटी के प्रमुख उपयोग क्षेत्र",
      usage: [
        { name: "शिक्षा", icon: <FaBook /> },
        { name: "स्वास्थ्य सेवा", icon: <FaHeartbeat /> },
        { name: "व्यापार", icon: <FaBriefcase /> },
        { name: "बैंकिंग", icon: <FaUniversity /> },
        { name: "संचार", icon: <FaComments /> },
        { name: "मनोरंजन", icon: <FaFilm /> }
      ],
      connect: "🌍 आईसीटी दुनिया को दूरी और समय की सीमाओं से मुक्त कर त्वरित संचार और वैश्विक ज्ञान तक पहुँच प्रदान करके जोड़ता है।",
      need: "⚡ दुनिया को आईसीटी क्यों चाहिए: सीखने को बेहतर बनाने, उत्पादकता बढ़ाने, कनेक्टिविटी बढ़ाने और रोज़मर्रा की ज़िंदगी के लिए स्मार्ट समाधान बनाने के लिए।",
      button_prev: "पिछला",
      button_next: "चलो विस्तार से जानें"
    },
  };

  if (showInstructions) {
    return <InstructionsOverlay onUnderstood={() => setShowInstructions(false)} lang={lang} setLang={setLang} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-purple-200 p-4 sm:p-6 md:p-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <p className="ml-4 lg:ml-52">Scroll down for the next page</p>
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

      {/* Main Card */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg p-6 md:p-8 max-w-4xl w-full text-center relative overflow-hidden mx-auto mt-8"
      >
        {/* Floating SVG Circles */}
        <motion.div className="absolute -top-10 -left-10 w-40 h-40 bg-purple-200 rounded-full mix-blend-multiply filter blur-2xl opacity-60 animate-pulse"></motion.div>
        <motion.div className="absolute -bottom-10 -right-10 w-40 h-40 bg-blue-200 rounded-full mix-blend-multiply filter blur-2xl opacity-60 animate-pulse"></motion.div>

        <motion.h1
          className="text-3xl md:text-4xl font-bold text-blue-700 mb-4"
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 100 }}
        >
          {content[lang].title}
        </motion.h1>

        <p className="text-gray-700 text-lg leading-relaxed mb-4 text-left">
          {content[lang].description}
        </p>

        {/* ICT in the Past */}
        <div className="my-6 p-4 bg-gray-100 rounded-lg border border-gray-200 text-left">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">{content[lang].past.title}</h2>
          <p className="text-gray-700 text-lg leading-relaxed">{content[lang].past.text}</p>
        </div>

        {/* ICT Today */}
        <div className="my-6 p-4 bg-blue-50 rounded-lg border border-blue-200 text-left">
          <h2 className="text-2xl font-bold text-blue-800 mb-2">{content[lang].present.title}</h2>
          <p className="text-gray-700 text-lg leading-relaxed">{content[lang].present.text}</p>
        </div>

        {/* Usage Areas */}
        <div className="my-6 text-left">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">{content[lang].usage_title}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {content[lang].usage.map((item, index) => (
              <div key={index} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg border border-gray-200">
                <span className="text-3xl text-blue-500">{item.icon}</span>
                <span className="font-semibold text-gray-700">{item.name}</span>
              </div>
            ))}
          </div>
        </div>

        <p className="text-gray-700 text-lg leading-relaxed mb-2 mt-6 text-left">
          {content[lang].connect}
        </p>
        <p className="text-gray-700 text-lg leading-relaxed mb-6 text-left">
          {content[lang].need}
        </p>

        {/* Animated Icons */}
        <div className="flex justify-center gap-8 text-5xl text-blue-600 mb-8 mt-10">
          <motion.div animate={{ y: [0, -10, 0] }} transition={{ repeat: Infinity, duration: 2 }}>
            <FaLaptopCode />
          </motion.div>
          <motion.div animate={{ y: [0, -10, 0] }} transition={{ repeat: Infinity, duration: 2, delay: 0.3 }}>
            <FaGlobe />
          </motion.div>
          <motion.div animate={{ y: [0, -10, 0] }} transition={{ repeat: Infinity, duration: 2, delay: 0.6 }}>
            <FaWifi />
          </motion.div>
          <motion.div animate={{ y: [0, -10, 0] }} transition={{ repeat: Infinity, duration: 2, delay: 0.9 }}>
            <FaMobileAlt />
          </motion.div>
        </div>
      </motion.div>
      {/* Navigation Buttons */}
      <div className="flex justify-between items-center mt-10 p-4 bg-gray-100 rounded-lg shadow-md">
        <button
          onClick={() => navigate('/')}
          className="flex items-center gap-2 px-4 py-2 bg-purple-200 hover:bg-purple-300 text-purple-900 rounded-lg shadow transition"
        >
          <FaArrowLeft />
          {content[lang].button_prev}
        </button>
        <button
          onClick={() => navigate('/station')}
          className="flex items-center gap-2 px-4 py-2 bg-green-200 hover:bg-green-300 text-green-900 rounded-lg shadow transition"
        >
          {content[lang].button_next}
          <FaArrowRight />
        </button>
      </div>
    </div>
  );
};

export default ICTComponent;
