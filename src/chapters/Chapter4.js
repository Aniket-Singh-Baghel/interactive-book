import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom"
import { FaKeyboard, FaMicrochip, FaDesktop, FaDatabase, FaArrowRight, FaArrowLeft, FaHome } from "react-icons/fa";



export default function Chapter4() {
  const [openCard, setOpenCard] = useState(null);

  const toggleCard = (card) => {
    setOpenCard(openCard === card ? null : card);
  };

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-100 p-6 flex flex-col items-center">
        {/* Title */}
        <div className="flex justify-center">
          <Link
            to="/"
            className="px-6 py-2 bg-yellow-400 text-white font-semibold rounded-full shadow-lg hover:bg-yellow-500 transition"
          >
            🏠 Home
          </Link>
        </div>
        <h1 className="text-4xl font-bold text-purple-800 mb-6 mt-6 flex items-center gap-2">
          ✍️📦 Chapter 4: Memory & Storage
        </h1>
        <p className="text-lg text-gray-700 max-w-2xl text-center mb-8">
          Let's explore the difference between a computer's temporary memory and its permanent storage — with examples, fun facts, and comparisons.
        </p>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-5xl">

          {/* RAM Card */}
          <motion.div
            className="bg-white shadow-lg rounded-2xl p-6 cursor-pointer flex flex-col items-center"
            onClick={() => toggleCard("ram")}
            whileHover={{ scale: 1.03 }}
          >
            <img src="https://media.istockphoto.com/id/157721899/photo/male-hand-installing-memory-on-computer-motherboard.jpg?s=612x612&w=0&k=20&c=p0xb4clzcXeVgw8RVlLyFpXZXKY5QvKFApvVLoMasGs=" alt="RAM Cartoon" className="mx-auto w-75 h-75 object-contain" />
            <h2 className="text-2xl font-semibold text-blue-700 text-center mt-4">RAM (Memory)</h2>
            <AnimatePresence>
              {openCard === "ram" && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mt-4 text-gray-700"
                >
                  <p><strong>Analogy:</strong> RAM is like your <em>kitchen countertop</em> — it holds things you're working on, but gets cleared when done.</p>
                  <p className="mt-2"><strong>Technical:</strong> Random Access Memory is a temporary high-speed workspace for active programs and data.</p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Storage Card */}
          <motion.div
            className="bg-white shadow-lg rounded-2xl p-6 cursor-pointer flex flex-col items-center"
            onClick={() => toggleCard("storage")}
            whileHover={{ scale: 1.03 }}
          >
            <img src="https://cdn.mos.cms.futurecdn.net/L3ydUhzAdFDuaJXPKp4VnK.jpg" alt="Storage Cartoon" className="mx-auto w-75 h-75 object-contain" />
            <h2 className="text-2xl font-semibold text-green-700 text-center mt-4">Storage</h2>
            <AnimatePresence>
              {openCard === "storage" && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mt-4 text-gray-700"
                >
                  <p><strong>Analogy:</strong> Storage is like a <em>steel almirah</em> — it keeps everything safe even when the lights are off.</p>
                  <p className="mt-2"><strong>Technical:</strong> Stores data permanently (HDD/SSD), keeping files and OS intact after shutdown.</p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

        </div>

        {/* Comparison Table */}
        <div className="bg-white shadow-md rounded-lg mt-8 p-6 max-w-4xl">
          <h3 className="text-xl font-semibold mb-4">📊 Quick Comparison</h3>
          <table className="table-auto w-full border-collapse border border-gray-300 text-center">
            <thead className="bg-gray-100">
              <tr>
                <th className="border p-2">Feature</th>
                <th className="border p-2">RAM</th>
                <th className="border p-2">Storage</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border p-2">Speed</td>
                <td className="border p-2">Very Fast</td>
                <td className="border p-2">Slower</td>
              </tr>
              <tr>
                <td className="border p-2">Volatility</td>
                <td className="border p-2">Temporary</td>
                <td className="border p-2">Permanent</td>
              </tr>
              <tr>
                <td className="border p-2">Purpose</td>
                <td className="border p-2">Run Programs</td>
                <td className="border p-2">Store Data</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Fun Fact */}
        <div className="bg-yellow-100 mt-6 p-4 rounded-lg shadow-md max-w-3xl text-center">
          💡 <strong>Fun Fact:</strong> The more RAM you have, the more programs you can run smoothly at the same time.
        </div>

        {/* Navigation */}
        <Link
          to="/chapters/ch3"
          className="fixed left-4 top-1/2 transform -translate-y-1/2 bg-white border border-gray-200 rounded-full p-3 shadow hover:bg-gray-100 transition"
          aria-label="Previous chapter"
        >
          <FaArrowLeft className="text-lg text-indigo-600" />
        </Link>
        <Link
          to="/chapters/ch5"
          className="fixed right-4 top-1/2 transform -translate-y-1/2 bg-white border border-gray-200 rounded-full p-3 shadow hover:bg-gray-100 transition"
          aria-label="Next chapter"
        >
          <FaArrowRight className="text-lg text-indigo-600" />
        </Link>
      </div>
    </>
  );
}
