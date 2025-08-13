import React from "react";
import { useNavigate } from "react-router-dom";
import { FaDesktop, FaFolderOpen, FaClipboard, FaHome } from "react-icons/fa";
import {Link} from 'react-router-dom'
import { motion } from "framer-motion";
import studentCartoon from '../Assets/Student_Cartton.png'
import teacherCartoon from '../Assets/teacher_Cartoon.png'


const topics = [
  {
    id: 9,
    title: "Chapter 9: The Desktop and Basic Navigation",
    concept: "The main screen and how to use the mouse and keyboard to navigate.",
    analogy: "The desktop is like the main table in your living room, where you can see all important items and start your work.",
    path: "/parts/prt3/ch9",
    icon: <FaDesktop className="text-blue-500 text-3xl" />
  },
  {
    id: 10,
    title: "Chapter 10: Files and Folders",
    concept: "How to organize your documents, photos, and videos.",
    analogy: "A folder is like a file holder or a plastic box in your office. You put similar papers (files) in one box to keep them organized.",
    path: "/parts/prt3/ch10",
    icon: <FaFolderOpen className="text-yellow-500 text-3xl" />
  },
  {
    id: 11,
    title: "Chapter 11: Copy, Cut, Paste, and Delete",
    concept: "Basic commands for managing files and text.",
    analogy: "Copy is like making a Xerox copy. Cut is moving a piece of paper to a new location. Paste is placing it there.",
    path: "/parts/prt3/ch11",
    icon: <FaClipboard className="text-green-500 text-3xl" />
  }
];

export default function Part3() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-100 via-blue-100 to-pink-100 p-8 font-sans">
      {/* Title */}
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
        className="text-4xl font-bold text-center text-green-700 mb-3"
      >
        🖱️ From Clicks to Confidence: Practical Computer Skills
      </motion.h1>

      {/* Tagline */}
      <p className="text-center text-gray-700 mb-10 italic">
        🚀Part3: Ready, Set, Compute! Practical Skills for Everyone
      </p>

      {/* Topics List */}
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
              <p className="text-gray-600 text-sm">
                <strong>Concept:</strong> {topic.concept}
              </p>
              <p className="text-gray-500 text-sm italic">
                <strong>Analogy:</strong> {topic.analogy}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
