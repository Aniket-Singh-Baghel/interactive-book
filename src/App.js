import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { FaPencilAlt, FaHome } from "react-icons/fa";
import { motion } from "framer-motion";
import Part1 from "./Assets/part1.jpeg";
import Part2 from "./Assets/part2.jpeg";
import Part3 from "./Assets/part3.jpeg";
import Part4 from "./Assets/part4.jpeg";
import Part5 from "./Assets/part5.jpeg";

const content = {
  en: {
    home: "Home",
    title: "🖥️ Computer Lab Adventure",
    subtitle: "Click a station and start your learning journey through the digital world!",
    tip: "🚀 Tip: Start with",
    tip_basics: "The Basics",
    tip_end: "and work your way to",
    tip_ahead: "Looking Ahead",
    tip_full: "for the full adventure!",
    overlay: {
      title: "How to Use This Book",
      instructions: [
        "This book is divided into multiple parts, and each part has chapters about a specific topic.",
        "To navigate, use the <strong>Previous</strong>, <strong>Next</strong>, and <strong>Home</strong> buttons.",
        "For example, if you enter the first part, which is about hardware, you will learn about hardware and its components in ICT.",
        "Press the <strong>Home</strong> button at any time to return to this main page."
      ],
      button: "Got it!"
    },
    topics: [
      {
        id: 1,
        part: "Part-1",
        title: "The Basics - Understanding the Computer",
        fact: "💡 The first computer mouse was made of wood!",
        image: Part1,
        path: "/parts/prt1",
      },
      {
        id: 2,
        part: "Part-2",
        title: "The Software Side - Giving Instructions",
        fact: "💡 Early monitors could only show green text!",
        image: Part2,
        path: "/parts/prt2",
      },
      {
        id: 3,
        part: "Part-3",
        title: "Using a Computer - Practical Skills",
        fact: "💡 Before GUIs, everything was typed in commands!",
        image: Part3,
        path: "/parts/prt3",
      },
      {
        id: 4,
        part: "Part-4",
        title: "The Digital World & Internet",
        fact: "💡 The first email was sent in 1971!",
        image: Part4,
        path: "/parts/prt4",
      },
      {
        id: 5,
        part: "Part-5",
        title: "Digital-Safety",
        fact: "💡 Stay alert online, safety comes first!",
        image: Part4,
        path: "/parts/prt5",
      },
      {
        id: 6,
        part: "Part-6",
        title: "Looking Ahead - From Beginner to Pro",
        fact: "💡 Quantum computers can solve problems in seconds!",
        image: Part5,
        path: "/parts/prt6",
      },
    ],
  },
  hi: {
    home: "होम",
    title: "🖥️ Computer लैब एडवेंचर",
    subtitle: "एक स्टेशन पर क्लिक करें और डिजिटल दुनिया के माध्यम से अपनी सीखने की यात्रा शुरू करें!",
    tip: "🚀 सलाह: ",
    tip_basics: "मूल बातें",
    tip_end: "से शुरू करें और",
    tip_ahead: "आगे बढ़ते हुए",
    tip_full: "पूरे एडवेंचर का आनंद लें!",
    overlay: {
      title: "इस पुस्तक का उपयोग कैसे करें",
      instructions: [
        "यह पुस्तक कई भागों में विभाजित है, और प्रत्येक भाग में एक विशिष्ट विषय के बारे में अध्याय हैं।",
        "नेविगेट करने के लिए, <strong>पिछला</strong>, <strong>अगला</strong>, और <strong>होम</strong> बटन का उपयोग करें।",
        "उदाहरण के लिए, यदि आप पहले भाग में प्रवेश करते हैं, जो हार्डवेयर के बारे में है, तो आप आईसीटी में हार्डवेयर और उसके घटकों के बारे में जानेंगे।",
        "मुख्य पृष्ठ पर लौटने के लिए किसी भी समय <strong>होम</strong> बटन दबाएं।"
      ],
      button: "समझ गया!"
    },
    topics: [
      {
        id: 1,
        part: "भाग-1",
        title: "मूल बातें - Computer को समझना",
        fact: "💡 पहला computer माउस लकड़ी का बना था!",
        image: Part1,
        path: "/parts/prt1",
      },
      {
        id: 2,
        part: "भाग-2",
        title: "Software साइड - निर्देश देना",
        fact: "💡 शुरुआती मॉनिटर केवल हरा टेक्स्ट दिखा सकते थे!",
        image: Part2,
        path: "/parts/prt2",
      },
      {
        id: 3,
        part: "भाग-3",
        title: "Computer का उपयोग - व्यावहारिक कौशल",
        fact: "💡 GUI से पहले, सब कुछ कमांड में टाइप किया जाता था!",
        image: Part3,
        path: "/parts/prt3",
      },
      {
        id: 4,
        part: "भाग-4",
        title: "डिजिटल दुनिया और इंटरनेट",
        fact: "💡 पहला ईमेल 1971 में भेजा गया था!",
        image: Part4,
        path: "/parts/prt4",
      },
      {
        id: 5,
        part: "भाग-5",
        title: "डिजिटल-सुरक्षा",
        fact: "💡 ऑनलाइन सतर्क रहें, सुरक्षा पहले आती है!",
        image: Part4,
        path: "/parts/prt5",
      },
      {
        id: 6,
        part: "भाग-6",
        title: "आगे देखना - शुरुआती से प्रो तक",
        fact: "💡 क्वांटम computer सेकंड में समस्याओं का समाधान कर सकते हैं!",
        image: Part5,
        path: "/parts/prt6",
      },
    ],
  },
};


const LoadingSpinner = ({ progress }) => (
  <div className="flex flex-col justify-center items-center min-h-screen bg-gradient-to-b from-blue-100 to-indigo-200">
    <motion.div
      animate={{ rotate: 360 }}
      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
      className="w-16 h-16 border-8 border-gray-200 border-t-blue-500 rounded-full"
    ></motion.div>

    {/* Progress Bar */}
    <div className="w-64 mt-8 bg-gray-200 rounded-full h-4 overflow-hidden">
      <motion.div
        className="bg-blue-500 h-4"
        initial={{ width: 0 }}
        animate={{ width: `${progress}%` }}
        transition={{ duration: 0.3 }}
      ></motion.div>
    </div>

    <motion.p
      className="text-indigo-800 text-lg mt-4 font-semibold"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, repeat: Infinity, repeatType: "reverse" }}
    >
      Loading... {Math.round(progress)}%
    </motion.p>
  </div>
);

const StationPage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [imagesLoaded, setImagesLoaded] = useState(0);
  const [lang, setLang] = useState('en');
  const [showOverlay, setShowOverlay] = useState(false);
  const t = content[lang];

  useEffect(() => {
    const hasSeenOverlay = sessionStorage.getItem('hasSeenStationOverlay');
    if (!hasSeenOverlay) {
      setShowOverlay(true);
    }
  }, []);

  const handleImageLoad = () => {
    setImagesLoaded((prev) => prev + 1);
  };

  useEffect(() => {
    if (imagesLoaded === t.topics.length) {
      // Smooth exit after images load
      setTimeout(() => setLoading(false), 700);
    }
  }, [imagesLoaded, t.topics.length]);

  useEffect(() => {
    if (loading || showOverlay) {
      window.scrollTo({ top: 0, behavior: "instant" });
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [loading, showOverlay]);

  const progress = (imagesLoaded / t.topics.length) * 100;

  const handleCloseOverlay = () => {
    sessionStorage.setItem('hasSeenStationOverlay', 'true');
    setShowOverlay(false);
  };

  const InstructionOverlay = ({ lang, setLang }) => (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
      <div className="bg-white p-8 rounded-lg shadow-2xl max-w-2xl w-11/12 text-gray-800 relative">
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
        <h2 className="text-3xl font-bold mb-6 text-indigo-700">{t.overlay.title}</h2>
        <ol className="list-decimal list-inside space-y-4 text-lg">
          {t.overlay.instructions.map((text, index) => (
            <li key={index} dangerouslySetInnerHTML={{ __html: text }} />
          ))}
        </ol>
        <button
          onClick={handleCloseOverlay}
          className="mt-8 bg-indigo-600 text-white font-bold py-2 px-6 rounded-lg hover:bg-indigo-700 transition-all duration-300"
        >
          {t.overlay.button}
        </button>
      </div>
    </div>
  );

  return (
    <>
      {loading && <LoadingSpinner progress={progress} />}
      {showOverlay && <InstructionOverlay lang={lang} setLang={setLang} />}
      <div style={{ visibility: loading ? "hidden" : "visible" }}>
        <div className="min-h-screen bg-gradient-to-b from-blue-100 to-indigo-200 p-8">

        <div className="flex items-center justify-between mb-8">
            <Link to="/introduction" className="inline-flex items-center px-4 py-2 bg-white rounded-full shadow-md border border-gray-200 hover:bg-gray-100 transition">
                <FaHome className="mr-2 text-lg text-sky-600" />
                {t.home}
            </Link>
            <div className="flex space-x-2">
                <button onClick={() => setLang("en")} className={`px-3 py-1 rounded-lg border font-semibold ${lang === "en" ? "bg-sky-600 text-white border-sky-600" : "bg-white text-gray-700 border-gray-300"} transition`}>EN</button>
                <button onClick={() => setLang("hi")} className={`px-3 py-1 rounded-lg border font-semibold ${lang === "hi" ? "bg-sky-600 text-white border-sky-600" : "bg-white text-gray-700 border-gray-300"} transition`}>हिं</button>
            </div>
        </div>

          <h1 className="text-4xl font-extrabold text-center mb-4 text-indigo-800 drop-shadow-md">
            {t.title}
          </h1>
          <p className="text-center text-lg text-gray-700 mb-10">
            {t.subtitle}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {t.topics.map((topic) => (
              <motion.div
                key={topic.id}
                className="bg-white rounded-2xl overflow-hidden shadow-lg cursor-pointer hover:shadow-2xl"
                onClick={() => navigate(topic.path)}
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 200 }}
              >
                <img
                  src={topic.image}
                  alt={topic.title}
                  className="w-full h-48 object-cover"
                  onLoad={handleImageLoad}
                />
                <div className="p-6">
                  <div className="flex items-center space-x-2">
                    <FaPencilAlt className="text-orange-700" />
                    <h1 className="font-bold text-lg">{topic.part}</h1>
                  </div>
                  <h2 className="text-xl font-bold text-indigo-700">
                    {topic.title}
                  </h2>
                  <p className="text-gray-600 mt-3 italic">{topic.fact}</p>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-12 text-gray-700">
            {t.tip}{" "}
            <span className="font-semibold">{t.tip_basics}</span> {t.tip_end}{" "}
            <span className="font-semibold">{t.tip_ahead}</span> {t.tip_full}
          </div>
        </div>
      </div>
    </>
  );
};

export default StationPage;
