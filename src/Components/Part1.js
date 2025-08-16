import React from "react";
import { useNavigate, Link } from "react-router-dom";
import { FaLaptop, FaCogs, FaMicrochip, FaMemory, FaKeyboard, FaHome, FaDatabase, FaHdd, FaChartBar, FaMouse } from "react-icons/fa";
import { motion } from "framer-motion";
import studentCartoon from '../Assets/Student_Cartton.png'
import teacherCartoon from '../Assets/teacher_Cartoon.png'

const topics = [
  {
    id: 1,
    title: "Chapter 1: What is a Computer?",
    fact: "Defining a computer as a helpful electronic machine.",
    path: "/part1/chapters/ch1",
    icon: <FaLaptop className="text-blue-500 text-3xl" />
  },
  {
    id: 2,
    title: "Chapter 2: The Main Parts (Hardware)",
    fact: "Introducing the physical components of a computer.",
    path: "/part1/chapters/ch2",
    icon: <FaCogs className="text-pink-500 text-3xl" />
  },
  {
    id: 3,
    title: "Chapter 3: The Brain of the Computer: The CPU",
    fact: "Explaining the CPU's role as the central processing unit.",
    path: "/part1/chapters/ch3",
    icon: <FaMicrochip className="text-yellow-500 text-3xl" />
  },
  {
    id: 4,
    title: "Chapter 4: Memory and Storage",
    fact: "Differentiating between temporary memory (RAM) and permanent storage (Hard Drive).",
    path: "/part1/chapters/ch4",
    icon: <FaMemory className="text-green-500 text-3xl" />
  },
  {
    id: 5,
    title: "Chapter 5: Input and Output Devices",
    fact: "How we talk to the computer and how it talks back.",
    path: "/part1/chapters/ch5",
    icon: <FaKeyboard className="text-purple-500 text-3xl" />
  },
  {
    id: 6,
    title: "Chapter Extra 01: Peripherals",
    fact: "Devices that let us interact with the computer, like keyboard and mouse.",
    path: "/part1/chapters/peripherals",
    icon: <FaMouse className="text-purple-500 text-3xl" />
  }, {
    id: 7,
    title: "Chapter Extra 02: Tertiary Storage",
    fact: "Used for long-term backups and archival storage.",
    path: "/part1/chapters/tertriaryStorage",
    icon: <FaDatabase className="text-blue-500 text-3xl" />
  },
  {
    id: 2,
    title: "Chapter Extra 03: Other Storage Types",
    fact: "Covers different storage technologies beyond primary and secondary.",
    path: "/part1/chapters/otherStorageTypes",
    icon: <FaHdd className="text-green-500 text-3xl" />
  },{
    id: 4,
    title: "Chapter Extra 05: RAM vs ROM",
    fact: "Differences between volatile and non-volatile memory.",
    path: "/part1/chapters/ramVsRom",
    icon: <FaMemory className="text-red-500 text-3xl" />
  },
  {
    id: 3,
    title: "Chapter Extra 04: Memory Comparison",
    fact: "Compare speeds, cost, and uses of various memory types.",
    path: "/part1/chapters/memoryComparison",
    icon: <FaChartBar className="text-yellow-500 text-3xl" />
  }
];

export default function Part1() {
  const navigate = useNavigate();

  return (
  <div className="relative min-h-screen bg-gradient-to-br from-blue-100 via-pink-100 to-yellow-100 p-8 font-sans">
  {/* Home Button */}
    <div className="flex justify-center mb-6">
      <Link
        to="/"
        className="inline-flex items-center px-4 py-2 bg-white rounded-full shadow-md border border-gray-200 hover:bg-gray-100 transition"
      >
        <FaHome className="mr-2 text-lg text-indigo-600" />
        Home
      </Link>
    </div>

    {/* Title */}
    <motion.h1
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 100 }}
      className="text-4xl font-bold text-center text-blue-700 mb-10 flex items-center justify-center gap-2"
    >
      🚀 Your First Step into Computers – Inviting for beginners.
    </motion.h1>

    <h2 className="text-2xl font-semibold mb-6 text-pink-600 text-center">
      Part 1: The Basics - Understanding the Computer
    </h2>

    {/* Chapter List */}
    <div className="space-y-4 max-w-3xl mx-auto">
      {topics.map((topic, index) => (
        <motion.div
          key={topic.id}
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: index * 0.15 }}
          onClick={() => navigate(topic.path)}
          className="group bg-white rounded-2xl shadow-lg p-5 flex items-center gap-4 cursor-pointer 
                     transform transition-all duration-300 hover:scale-105 hover:shadow-2xl"
        >
          {topic.icon}
          <div>
            <h3 className="text-lg font-bold text-gray-800 group-hover:text-indigo-600 transition-colors duration-300">
              {topic.title}
            </h3>
            <p className="text-gray-600 text-sm">{topic.fact}</p>
          </div>
        </motion.div>
      ))}
    </div>
  </div>
);

}
