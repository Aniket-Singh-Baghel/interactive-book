import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { FaLaptop, FaCogs, FaMicrochip, FaMemory, FaKeyboard, FaHome, FaDatabase, FaHdd, FaChartBar, FaMouse } from "react-icons/fa";
import { motion } from "framer-motion";

const content = {
    en: {
        home: "Home",
        main_title: "🚀 Your First Step into Computers – Inviting for beginners.",
        part_title: "Part 1: The Basics - Understanding the Computer",
        topics: [
            { id: 1, title: "Chapter 1: What is a Computer?", concept: "Defining a computer as a helpful electronic machine.", path: "/part1/chapters/ch1", icon: <FaLaptop className="text-blue-500 text-3xl" /> },
            { id: 2, title: "Chapter 2: The Main Parts (Hardware)", concept: "Introducing the physical components of a computer.", path: "/part1/chapters/ch2", icon: <FaCogs className="text-pink-500 text-3xl" /> },
            { id: 3, title: "Chapter 3: The Brain of the Computer: The CPU", concept: "Explaining the CPU's role as the central processing unit.", path: "/part1/chapters/ch3", icon: <FaMicrochip className="text-yellow-500 text-3xl" /> },
            { id: 4, title: "Chapter 4: Memory and Storage", concept: "Differentiating between temporary memory (RAM) and permanent storage (Hard Drive).", path: "/part1/chapters/ch4", icon: <FaMemory className="text-green-500 text-3xl" /> },
            { id: 5, title: "Chapter 5: Input and Output Devices", concept: "How we talk to the computer and how it talks back.", path: "/part1/chapters/ch5", icon: <FaKeyboard className="text-purple-500 text-3xl" /> },
            { id: 6, title: "Chapter Extra 01: Peripherals", concept: "Devices that let us interact with the computer, like keyboard and mouse.", path: "/part1/chapters/peripherals", icon: <FaMouse className="text-purple-500 text-3xl" /> },
            { id: 7, title: "Chapter Extra 02: Tertiary Storage", concept: "Used for long-term backups and archival storage.", path: "/part1/chapters/tertriaryStorage", icon: <FaDatabase className="text-blue-500 text-3xl" /> },
            { id: 8, title: "Chapter Extra 03: Other Storage Types", concept: "Covers different storage technologies beyond primary and secondary.", path: "/part1/chapters/otherStorageTypes", icon: <FaHdd className="text-green-500 text-3xl" /> },
            { id: 9, title: "Chapter Extra 04: RAM vs ROM", concept: "Differences between volatile and non-volatile memory.", path: "/part1/chapters/ramVsRom", icon: <FaMemory className="text-red-500 text-3xl" /> },
            { id: 10, title: "Chapter Extra 05: Memory Comparison", concept: "Compare speeds, cost, and uses of various memory types.", path: "/part1/chapters/memoryComparison", icon: <FaChartBar className="text-yellow-500 text-3xl" /> }
        ]
    },
    hi: {
        home: "होम",
        main_title: "🚀 कंप्यूटर में आपका पहला कदम - Inviting for beginners.",
        part_title: "भाग 1:The Basics - कंप्यूटर को समझना",
        topics: [
            { id: 1, title: "Chapter 1: What is a Computer?", concept: "कंप्यूटर को एक सहायक इलेक्ट्रॉनिक मशीन के रूप में परिभाषित करना।", path: "/part1/chapters/ch1", icon: <FaLaptop className="text-blue-500 text-3xl" /> },
            { id: 2, title: "Chapter 2: The Main Parts (Hardware)", concept: "कंप्यूटर के भौतिक घटकों का परिचय।", path: "/part1/chapters/ch2", icon: <FaCogs className="text-pink-500 text-3xl" /> },
            { id: 3, title: "Chapter 3: The Brain of the Computer: The CPU", concept: "सीपीयू की भूमिका को केंद्रीय प्रसंस्करण इकाई के रूप में समझाना।", path: "/part1/chapters/ch3", icon: <FaMicrochip className="text-yellow-500 text-3xl" /> },
            { id: 4, title: "Chapter 4: Memory and Storage", concept: "अस्थायी मेमोरी (रैम) और स्थायी स्टोरेज (हार्ड ड्राइव) के बीच अंतर करना।", path: "/part1/chapters/ch4", icon: <FaMemory className="text-green-500 text-3xl" /> },
            { id: 5, title: "Chapter 5: Input and Output Devices", concept: "हम कंप्यूटर से कैसे बात करते हैं और वह कैसे जवाब देता है।", path: "/part1/chapters/ch5", icon: <FaKeyboard className="text-purple-500 text-3xl" /> },
            { id: 6, title: "Chapter Extra 01: Peripherals", concept: "वे उपकरण जो हमें कंप्यूटर के साथ इंटरैक्ट करने देते हैं, जैसे कीबोर्ड और माउस।", path: "/part1/chapters/peripherals", icon: <FaMouse className="text-purple-500 text-3xl" /> },
            { id: 7, title: "Chapter Extra 02: Tertiary Storage", concept: "दीर्घकालिक बैकअप और अभिलेखीय भंडारण के लिए उपयोग किया जाता है।", path: "/part1/chapters/tertriaryStorage", icon: <FaDatabase className="text-blue-500 text-3xl" /> },
            { id: 8, title: "Chapter Extra 03: Other Storage Types", concept: "प्राथमिक और द्वितीयक से परे विभिन्न भंडारण प्रौद्योगिकियों को शामिल करता है।", path: "/part1/chapters/otherStorageTypes", icon: <FaHdd className="text-green-500 text-3xl" /> },
            { id: 9, title: "Chapter Extra 04: RAM vs ROM", concept: "वाष्पशील और गैर-वाष्पशील मेमोरी के बीच अंतर।", path: "/part1/chapters/ramVsRom", icon: <FaMemory className="text-red-500 text-3xl" /> },
            { id: 10, title: "Chapter Extra 05: Memory Comparison", concept: "विभिन्न मेमोरी प्रकारों की गति, लागत और उपयोग की तुलना करें।", path: "/part1/chapters/memoryComparison", icon: <FaChartBar className="text-yellow-500 text-3xl" /> }
        ]
    }
};

export default function Part1() {
  const [lang, setLang] = useState('en');
  const navigate = useNavigate();
  const t = content[lang];

  return (
  <div className="relative min-h-screen bg-gradient-to-br from-blue-100 via-pink-100 to-yellow-100 p-4 sm:p-8 font-sans">
    <div className="flex items-center justify-between mb-8">
        <Link to="/" className="inline-flex items-center px-4 py-2 bg-white rounded-full shadow-md border border-gray-200 hover:bg-gray-100 transition">
            <FaHome className="mr-2 text-lg text-sky-600" />
            {t.home}
        </Link>
        <div className="flex space-x-2">
            <button onClick={() => setLang("en")} className={`px-3 py-1 rounded-lg border font-semibold ${lang === "en" ? "bg-sky-600 text-white border-sky-600" : "bg-white text-gray-700 border-gray-300"} transition`}>EN</button>
            <button onClick={() => setLang("hi")} className={`px-3 py-1 rounded-lg border font-semibold ${lang === "hi" ? "bg-sky-600 text-white border-sky-600" : "bg-white text-gray-700 border-gray-300"} transition`}>हिं</button>
        </div>
    </div>

    <motion.h1
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 100 }}
      className="text-2xl sm:text-3xl lg:text-4xl font-bold text-center text-blue-700 mb-4"
    >
      {t.main_title}
    </motion.h1>

    <h2 className="text-xl sm:text-2xl font-semibold mb-8 text-pink-600 text-center">
      {t.part_title}
    </h2>

    <div className="space-y-4 max-w-3xl mx-auto">
      {t.topics.map((topic, index) => (
        <motion.div
          key={topic.id}
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: index * 0.1 }}
          onClick={() => navigate(topic.path)}
          className="group bg-white rounded-2xl shadow-lg p-5 flex items-center gap-4 cursor-pointer 
                     transform transition-all duration-300 hover:scale-105 hover:shadow-2xl"
        >
          {topic.icon}
          <div>
            <h3 className="text-lg font-bold text-gray-800 group-hover:text-indigo-600 transition-colors duration-300">
              {topic.title}
            </h3>
            <p className="text-gray-600 text-sm">{topic.concept}</p>
          </div>
        </motion.div>
      ))}
    </div>
  </div>
);

}
