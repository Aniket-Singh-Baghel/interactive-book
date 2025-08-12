import React from "react";
import { useNavigate } from "react-router-dom";
import { FaLaptop, FaCogs, FaMicrochip, FaMemory, FaKeyboard } from "react-icons/fa";
import { motion } from "framer-motion";
import studentCartoon from '../Assets/Student_Cartton.png'
import teacherCartoon from '../Assets/teacher_Cartoon.png'

const topics = [
  {
    id: 1,
    title: "Chapter 1: What is a Computer?",
    fact: "Defining a computer as a helpful electronic machine.",
    path: "/chapters/ch1",
    icon: <FaLaptop className="text-blue-500 text-3xl" />
  },
  {
    id: 2,
    title: "Chapter 2: The Main Parts (Hardware)",
    fact: "Introducing the physical components of a computer.",
    path: "/chapters/ch2",
    icon: <FaCogs className="text-pink-500 text-3xl" />
  },
  {
    id: 3,
    title: "Chapter 3: The Brain of the Computer: The CPU",
    fact: "Explaining the CPU's role as the central processing unit.",
    path: "/chapters/ch3",
    icon: <FaMicrochip className="text-yellow-500 text-3xl" />
  },
  {
    id: 4,
    title: "Chapter 4: Memory and Storage",
    fact: "Differentiating between temporary memory (RAM) and permanent storage (Hard Drive).",
    path: "/chapters/ch4",
    icon: <FaMemory className="text-green-500 text-3xl" />
  },
  {
    id: 5,
    title: "Chapter 5: Input and Output Devices",
    fact: "How we talk to the computer and how it talks back.",
    path: "/chapters/ch5",
    icon: <FaKeyboard className="text-purple-500 text-3xl" />
  }
];

export default function Part1() {
  const navigate = useNavigate();

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-blue-100 via-pink-100 to-yellow-100 p-8 font-sans overflow-hidden">
      
      {/* Cartoon Characters */}
      <motion.img
        src={teacherCartoon}
        alt="Teacher Cartoon"
        className="absolute max-w-full -bottom-16 -left-8"
        animate={{ y: [0, -10, 0] }}
        transition={{ repeat: Infinity, duration: 3 }}
      />
      <motion.img
        src={studentCartoon}
        alt="Student Cartoon"
        className="absolute w-72 bottom-4 right-4"
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 3 }}
      />

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
            transition={{ delay: index * 0.2 }}
            whileHover={{ scale: 1.05, rotate: 1 }}
            className="bg-white rounded-2xl shadow-lg p-5 flex items-center gap-4 cursor-pointer hover:shadow-2xl"
            onClick={() => navigate(topic.path)}
          >
            {topic.icon}
            <div>
              <h3 className="text-lg font-bold text-gray-800">{topic.title}</h3>
              <p className="text-gray-600 text-sm">{topic.fact}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
