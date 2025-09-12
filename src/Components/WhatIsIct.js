import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaHome, FaGlobe, FaWifi, FaLaptopCode, FaMobileAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const ICTComponent = () => {
  const [lang, setLang] = useState("en");
  const navigate = useNavigate();

  const content = {
    en: {
      title: "What is ICT?",
      description:
        "ICT stands for Information and Communication Technology. It uses computers, the internet, and mobile devices to collect, process, store, and share information. ICT makes learning, communication, and work faster, smarter, and more connected.",
      usage: "📌 Usage Areas: Education, Healthcare, Business, Banking, Communication, Entertainment.",
      connect: "🌍 ICT connects the world by breaking barriers of distance and time through instant communication and global access to knowledge.",
      need: "⚡ Why the World Needs ICT: To improve learning, boost productivity, increase connectivity, and create smarter solutions for everyday life.",
    },
    hi: {
      title: "आईसीटी क्या है?",
      description:
        "आईसीटी का अर्थ है सूचना और संचार प्रौद्योगिकी। इसमें कंप्यूटर, इंटरनेट और मोबाइल उपकरणों का उपयोग करके जानकारी को एकत्रित करना, संसाधित करना, संग्रहीत करना और साझा करना शामिल है। आईसीटी सीखने, संचार और काम को तेज़, बेहतर और जुड़ा हुआ बनाता है।",
      usage: "📌 उपयोग क्षेत्र: शिक्षा, स्वास्थ्य सेवा, व्यवसाय, बैंकिंग, संचार, मनोरंजन।",
      connect: "🌍 आईसीटी दुनिया को दूरी और समय की सीमाओं से मुक्त कर त्वरित संचार और वैश्विक ज्ञान तक पहुँच प्रदान करके जोड़ता है।",
      need: "⚡ दुनिया को आईसीटी क्यों चाहिए: सीखने को बेहतर बनाने, उत्पादकता बढ़ाने, कनेक्टिविटी बढ़ाने और रोज़मर्रा की ज़िंदगी के लिए स्मार्ट समाधान बनाने के लिए।",
    },
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-50 to-purple-100 flex flex-col items-center justify-center p-6">
      {/* Header with Home & Toggle */}
      <div className="w-full flex justify-between items-center mb-8 px-4">
        <button
          onClick={() => navigate("/")}
          className="flex items-center space-x-2 text-blue-700 font-semibold hover:scale-110 transition"
        >
          <FaHome className="text-2xl" />
          <span>Home</span>
        </button>

        <button
          onClick={() => setLang(lang === "en" ? "hi" : "en")}
          className="px-4 py-2 rounded-xl bg-blue-600 text-white font-semibold hover:bg-blue-700 transition"
        >
          {lang === "en" ? "हिन्दी" : "English"}
        </button>
      </div>

      {/* Main Card */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="bg-white rounded-2xl shadow-xl p-8 max-w-3xl text-center relative overflow-hidden"
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

        <p className="text-gray-700 text-lg leading-relaxed mb-4">
          {content[lang].description}
        </p>
        <p className="text-gray-700 text-lg leading-relaxed mb-2">
          {content[lang].usage}
        </p>
        <p className="text-gray-700 text-lg leading-relaxed mb-2">
          {content[lang].connect}
        </p>
        <p className="text-gray-700 text-lg leading-relaxed mb-6">
          {content[lang].need}
        </p>

        {/* Animated Icons */}
        <div className="flex justify-center gap-8 text-5xl text-blue-600 mb-8">
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

        {/* Prev / Next Buttons */}
        <div className="flex justify-between">
          <button
            onClick={() => navigate("/")}
            className="px-6 py-2 rounded-lg bg-gray-200 text-gray-800 font-semibold hover:bg-gray-300 transition"
          >
            ⬅ Previous
          </button>
          <button
            onClick={() => navigate("/home")}
            className="px-6 py-2 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 transition"
          >
            Next ➡
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default ICTComponent;
