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
        title: "The Digital World - Internet & Safety",
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
        title: "डिजिटल दुनिया - इंटरनेट और सुरक्षा",
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
  const t = content[lang];

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
  if (loading) {
    window.scrollTo({ top: 0, behavior: "instant" });
  }
}, [loading]);

  const progress = (imagesLoaded / t.topics.length) * 100;

  return (
    <>
      {loading && <LoadingSpinner progress={progress} />}
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
