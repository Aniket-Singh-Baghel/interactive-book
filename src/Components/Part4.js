import React from "react";
import { useNavigate } from "react-router-dom";
import { FaGlobe, FaChrome,FaHome } from "react-icons/fa";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const topics = [
  {
    id: 12,
    title: "Chapter 12: What is the Internet?",
    concept: "Introducing the internet as a global network of computers.",
    analogy:
      "The internet is like a vast network of roads and railway lines connecting every city and village in the world, allowing people to send and receive goods (information) from anywhere.",
    icon: <FaGlobe className="text-blue-500 text-3xl" />,
    path: "/parts/prt4/ch12",
  },
  {
    id: 13,
    title: "Chapter 13: Web Browsers and Websites",
    concept: "Explaining how to access the internet.",
    analogy:
      "A web browser is like a bus or train that takes you to different websites (cities) on the internet.",
    icon: <FaChrome className="text-pink-500 text-3xl" />,
    path: "/parts/prt4/ch13",
  },
];

export default function Part4() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen relative bg-gradient-to-br from-green-100 via-yellow-100 to-red-100 p-8 font-sans overflow-hidden">
      {/* Home Button */}
     <div className="flex justify-center mb-6">
        <Link
          to="/station"
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
        className="text-4xl font-bold text-center text-purple-700 mb-3"
      >
        🌐 The Digital World
      </motion.h1>

      {/* Tagline */}
      <p className="text-center text-pink-600 font-semibold mb-10">
        Part 4: Internet & Safety – Navigating the online world with confidence.
      </p>

      {/* Topics List */}
      <div className="space-y-4 max-w-3xl mx-auto">
        {topics.map((topic, index) => (
          <motion.div
            key={topic.id}
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.2 }}
            whileHover={{ scale: 1.03 }}
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
