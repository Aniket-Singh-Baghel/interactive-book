import React from "react";
import { useNavigate } from "react-router-dom";
import { FaPencilAlt } from "react-icons/fa";
import { motion } from "framer-motion";

const topics = [
  {
    id: 1,
    part:'Part-1',
    title: "The Basics - Understanding the Computer",
    fact: "💡 The first computer mouse was made of wood!",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475",
    path: "/parts/prt1"
  },
  {
    id: 2,
    part:'Part-2',
    title: "The Software Side - Giving Instructions",
    fact: "💡 Early monitors could only show green text!",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSpNhOb6NdbrkOMYPwVUYx1vpfluX_T-ofljQ&s",
    path: "/parts/prt2"
  },
  {
    id: 3,
    part:'Part-3',
    title: "Using a Computer - Practical Skills",
    fact: "💡 Before GUIs, everything was typed in commands!",
    image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8",
    path: "/parts/prt3"
  },
  {
    id: 4,
    part:'Part-4',
    title: "The Digital World - Internet & Safety",
    fact: "💡 The first email was sent in 1971!",
    image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c",
    path: "/parts/prt4"
  },
  {
    id: 5,
    part:'Part-5',
    title: "Looking Ahead - From Beginner to Pro",
    fact: "💡 Quantum computers can solve problems in seconds!",
    image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d",
    path: "/parts/prt5"
  }
];

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-100 to-indigo-200 p-8">
      <h1 className="text-4xl font-extrabold text-center mb-4 text-indigo-800 drop-shadow-md">
        🖥️ Computer Lab Adventure
      </h1>
      <p className="text-center text-lg text-gray-700 mb-10">
        Click a station and start your learning journey through the digital world!
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
            />
            <div className="p-6">
              <div className="flex items-center space-x-2 ">
                <FaPencilAlt className="ml-28 text-orange-700"/>
                <h1 className="font-bold text-lg ml-28">{topic.part}</h1>
              </div>
              <h2 className="text-xl font-bold text-indigo-700">{topic.title}</h2>
              <p className="text-gray-600 mt-3 italic">{topic.fact}</p>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="text-center mt-12 text-gray-700">
        🚀 Tip: Start with <span className="font-semibold">The Basics</span> and work your way to <span className="font-semibold">Looking Ahead</span> for the full adventure!
      </div>
    </div>
  );
};

export default HomePage;
