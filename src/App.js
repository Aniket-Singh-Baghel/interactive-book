import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaPencilAlt } from "react-icons/fa";
import { motion } from "framer-motion";
import Part1 from "./Assets/part1.jpeg";
import Part2 from "./Assets/part2.jpeg";
import Part3 from "./Assets/part3.jpeg";
import Part4 from "./Assets/part4.jpeg";
import Part5 from "./Assets/part5.jpeg";

const topics = [
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
];

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

  const handleImageLoad = () => {
    setImagesLoaded((prev) => prev + 1);
  };

  useEffect(() => {
    if (imagesLoaded === topics.length) {
      // Smooth exit after images load
      setTimeout(() => setLoading(false), 700);
    }
  }, [imagesLoaded]);

  useEffect(() => {
  if (loading) {
    window.scrollTo({ top: 0, behavior: "instant" });
  }
}, [loading]);

  const progress = (imagesLoaded / topics.length) * 100;

  return (
    <>
      {loading && <LoadingSpinner progress={progress} />}
      <div style={{ visibility: loading ? "hidden" : "visible" }}>
        <div className="min-h-screen bg-gradient-to-b from-blue-100 to-indigo-200 p-8">
          <h1 className="text-4xl font-extrabold text-center mb-4 text-indigo-800 drop-shadow-md">
            🖥️ Computer Lab Adventure
          </h1>
          <p className="text-center text-lg text-gray-700 mb-10">
            Click a station and start your learning journey through the digital
            world!
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {topics.map((topic) => (
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
            🚀 Tip: Start with{" "}
            <span className="font-semibold">The Basics</span> and work your way
            to <span className="font-semibold">Looking Ahead</span> for the full
            adventure!
          </div>
        </div>
      </div>
    </>
  );
};

export default StationPage;
