import React from "react";
import { useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom'
import { FaCode, FaCogs, FaToolbox, FaHome, FaQuestionCircle } from "react-icons/fa";
import { motion } from "framer-motion";
import studentCartoon from '../Assets/Student_Cartton.png'
import teacherCartoon from '../Assets/teacher_Cartoon.png'


const topics = [
  {
    id: 6,
    title: "Chapter 6: What is Software?",
    concept: "Software is the set of instructions that makes the hardware work.",
    analogy: "Hardware is like a car, and software is the driver who tells the car where to go, how fast to drive, and when to stop.",
    path: "/part2/chapters/ch6",
    icon: <FaCode className="text-blue-500 text-3xl" />
  },
  {
    id: 7,
    title: "Chapter 7: The Operating System (OS)",
    concept: "The main software that manages the entire computer.",
    analogy: "Like a sarpanch (village head) who organizes everything and makes sure everyone follows the rules.",
    path: "/part2/chapters/ch7",
    icon: <FaCogs className="text-pink-500 text-3xl" />
  },
  {
    id: 8,
    title: "Chapter 8: Types of Software",
    concept: "Application software (like MS Word) vs system software (like the OS).",
    analogy: "Application software is like a tool (e.g., screwdriver), while the OS is the toolbox holding all tools.",
    path: "/part2/chapters/ch8",
    icon: <FaToolbox className="text-green-500 text-3xl" />
  },
];

export default function Part2() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-pink-100 to-yellow-100 p-8 font-sans">
      <div className="flex justify-center mb-6">
        <Link
          to="/"
          className="inline-flex items-center px-4 py-2 bg-white rounded-full shadow-md border border-gray-200 hover:bg-gray-100 transition"
        >
          <FaHome className="mr-2 text-lg text-indigo-600" />
          Home
        </Link>
      </div>
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
      <motion.h1
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 100 }}
        className="text-4xl font-bold text-center text-purple-700 mb-10 flex items-center justify-center gap-2"
      >
        🖥️ The Software Story
      </motion.h1>
      <h2 className="text-2xl font-semibold mb-6 text-pink-600 text-center">
        Part 2: Software - The storyteller of your digital world.
      </h2>


      <div className="space-y-4 max-w-3xl mx-auto">
        {topics.map((topic, index) => (
          <motion.div
            key={topic.id}
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.2 }}
            whileHover={{ scale: 1.05, rotate: 1 }}
            className="bg-white rounded-2xl shadow-lg p-5 flex items-start gap-4 cursor-pointer hover:shadow-2xl"
            onClick={() => navigate(topic.path)}
          >
            {topic.icon}
            <div>
              <h3 className="text-lg font-bold text-gray-800">{topic.title}</h3>
              <p className="text-gray-600 text-sm"><strong>Concept:</strong> {topic.concept}</p>
              <p className="text-gray-500 text-sm italic"><strong>Analogy:</strong> {topic.analogy}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
