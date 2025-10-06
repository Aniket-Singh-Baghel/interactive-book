import React from "react";
import { useNavigate } from "react-router-dom";
import { FaBrain, FaDatabase, FaLink, FaWifi, FaSignal, FaHome } from "react-icons/fa";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const topics = [
  {
    id: 1,
    title: "Artificial Intelligence & Machine Learning",
    concept: "Simulating human intelligence in machines.",
    analogy: "AI is the library; ML is learning from the books.",
    icon: <FaBrain className="text-indigo-500 text-3xl" />,
    path: "/parts/prt4/ai-ml",
  },
  {
    id: 2,
    title: "Big Data & Cloud Computing",
    concept: "Handling massive data with cloud power.",
    analogy: "Big Data is the LEGOs; the Cloud is the workshop.",
    icon: <FaDatabase className="text-teal-500 text-3xl" />,
    path: "/parts/prt4/big-data",
  },
  {
    id: 3,
    title: "Blockchain & Cryptocurrencies",
    concept: "A secure digital ledger for transactions.",
    analogy: "A public notebook no one can erase.",
    icon: <FaLink className="text-orange-500 text-3xl" />,
    path: "/parts/prt4/blockchain",
  },
  {
    id: 4,
    title: "The Internet of Things (IoT)",
    concept: "Connecting everyday objects to the internet.",
    analogy: "Giving a digital voice to your fridge.",
    icon: <FaWifi className="text-cyan-500 text-3xl" />,
    path: "/parts/prt4/iot",
  },
  {
    id: 5,
    title: "5G, 6G & Ultra-Fast Internet",
    concept: "The next leap in wireless technology.",
    analogy: "From a highway (4G) to teleportation (6G).",
    icon: <FaSignal className="text-pink-500 text-3xl" />,
    path: "/parts/prt4/5g-6g",
  },
];

export default function Part4() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen relative bg-gradient-to-br from-purple-100 via-indigo-100 to-blue-100 p-8 font-sans overflow-hidden">
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
        className="text-4xl font-bold text-center text-indigo-700 mb-3"
      >
        🚀 Advanced Digital Technologies
      </motion.h1>

      {/* Tagline */}
      <p className="text-center text-purple-600 font-semibold mb-10">
        Part 4: Exploring the frontiers of technology.
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
