// src/chapters/Chapter6.jsx
import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaHome,FaMobileAlt, FaTv, FaLightbulb,FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { MdLocalLaundryService } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";

/**
 * Chapter 6 - What is Software?
 * - Interactive car analogy: No Software vs With Software (animated)
 * - Example cards that expand with real-life apps
 *
 * Tailwind + framer-motion required.
 */

const examples = [
  {
    id: "phone",
    title: "Smartphone",
    deviceIcon: <FaMobileAlt className="text-3xl text-indigo-600" />,
    exampleSoftware: ["WhatsApp", "YouTube", "Calculator", "Camera App"],
  },
  {
    id: "tv",
    title: "Smart TV",
    deviceIcon: <FaTv className="text-3xl text-orange-500" />,
    exampleSoftware: ["YouTube App", "Netflix", "Settings", "Screen Cast"],
  },
  {
    id: "washing",
    title: "Washing Machine",
    deviceIcon: <MdLocalLaundryService className="text-3xl text-teal-600" />,
    exampleSoftware: ["Wash Program Controller", "Delay Start Timer"],
  },
];

export default function Chapter6() {
  const [powered, setPowered] = useState(false); // with software = true
  const [openExample, setOpenExample] = useState(null);
  const navigate = useNavigate();

  return (
    <div className="min-h-screen relative bg-gradient-to-br from-pink-50 via-purple-50 to-yellow-50 p-8 font-sans overflow-hidden">
      {/* Home */}
      <div className="flex justify-center mb-6">
        <Link
          to="/parts/prt2"
          className="inline-flex items-center px-4 py-2 bg-white rounded-full shadow-md border border-gray-200 hover:bg-gray-100 transition"
        >
          <FaHome className="mr-2 text-lg text-indigo-600" />
          Home
        </Link>
      </div>

      {/* Title */}
      <motion.h1
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 120 }}
        className="text-4xl font-extrabold text-center text-purple-700 mb-2"
      >
        🚗 Chapter 6 — What is Software?
      </motion.h1>

      <p className="text-center text-pink-600 font-medium mb-8">
        Concept: Software is the set of instructions that makes the hardware work.
      </p>

      {/* Main interactive analogy */}
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        {/* Left: Visual area */}
        <div className="relative bg-white/60 rounded-2xl p-6 shadow-lg">
          <div className="flex justify-between items-center mb-4">
            <div>
              <h2 className="text-lg font-bold text-gray-800">Analogy</h2>
              <p className="text-sm text-gray-600">
                Hardware = the car. <span className="font-semibold">Software = the driver</span> that tells the car where to go.
              </p>
            </div>

            {/* Toggle */}
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-500">No Software</span>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={powered}
                  onChange={() => setPowered((p) => !p)}
                  className="sr-only peer"
                />
                <div className="w-12 h-6 bg-gray-300 rounded-full peer-checked:bg-indigo-500 transition" />
                <div className="absolute left-0.5 top-0.5 w-5 h-5 bg-white rounded-full shadow transform peer-checked:translate-x-6 transition" />
              </label>
              <span className="text-sm text-gray-500">With Software</span>
            </div>
          </div>

          {/* Road + Car visual */}
          <div className="h-56 relative overflow-hidden">
            {/* Simple road */}
            <div className="absolute left-0 right-0 bottom-8 h-20 bg-gradient-to-r from-gray-200 to-gray-300 rounded-lg shadow-inner" />

            {/* Destination sign */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="absolute right-6 top-6 bg-yellow-100 px-3 py-2 rounded-lg shadow-md border border-yellow-200"
            >
              <div className="text-sm font-semibold text-yellow-800">Task</div>
              <div className="text-xs text-yellow-700">Open Music → Play Song</div>
            </motion.div>

            {/* Car (animated when powered=true) */}
            <motion.div
              animate={powered ? { x: [-20, 160, 320] } : { x: 0 }}
              transition={powered ? { repeat: Infinity, repeatType: "loop", duration: 4, ease: "easeInOut" } : { duration: 0 }}
              className="absolute bottom-12 left-6"
            >
              {/* A simple cartoon car + driver built in SVG */}
              <svg width="220" height="110" viewBox="0 0 220 110" xmlns="http://www.w3.org/2000/svg">
                {/* car body */}
                <rect x="10" y="30" rx="20" ry="20" width="180" height="50" fill={powered ? "#4f46e5" : "#c7c7c7"} stroke="#333" strokeWidth="2" />
                {/* roof */}
                <path d="M40 30 L80 10 L140 10 L170 30 Z" fill={powered ? "#6d28d9" : "#bdbdbd"} stroke="#333" strokeWidth="2" />
                {/* wheels */}
                <circle cx="50" cy="85" r="12" fill="#111827" />
                <circle cx="150" cy="85" r="12" fill="#111827" />
                {/* driver head */}
                <circle cx="100" cy="35" r="8" fill={powered ? "#ffd29b" : "#e6e6e6"} stroke="#333" />
                {/* eyes (happy when powered) */}
                {powered ? (
                  <g>
                    <circle cx="98" cy="35" r="1.5" fill="#000" />
                    <circle cx="102" cy="35" r="1.5" fill="#000" />
                  </g>
                ) : (
                  <g>
                    <line x1="95" y1="35" x2="101" y2="35" stroke="#777" strokeWidth="1.2" />
                    <line x1="103" y1="35" x2="109" y2="35" stroke="#777" strokeWidth="1.2" />
                  </g>
                )}
                {/* little motion lines when powered */}
                {powered && (
                  <g>
                    <path d="M190 40 q10 -5 20 0" stroke="#ffd166" strokeWidth="2" fill="none" opacity="0.9" />
                    <path d="M190 50 q10 -5 20 0" stroke="#ffd166" strokeWidth="2" fill="none" opacity="0.6" />
                  </g>
                )}
              </svg>
            </motion.div>

            {/* Short helper text */}
            <div className="absolute left-6 top-4 bg-white/80 px-3 py-2 rounded-lg shadow-sm">
              <div className="text-xs text-gray-700 font-semibold">Try the toggle →</div>
              <div className="text-xs text-gray-500">See how software makes hardware useful</div>
            </div>
          </div>
        </div>

        {/* Right: Examples & Activity */}
        <div className="space-y-4">
          {/* Quick concept card */}
          <motion.div
            initial={{ scale: 0.98, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.15 }}
            className="bg-white rounded-2xl p-5 shadow-lg"
          >
            <h3 className="text-lg font-bold text-gray-800 mb-2">Simple Explanation</h3>
            <p className="text-gray-600 text-sm">
              Think: <span className="font-semibold">Hardware</span> is the physical parts (like the car). <br />
              <span className="font-semibold">Software</span> is the instructions (like the driver) telling the hardware what to do.
            </p>
            <div className="mt-3 flex items-center gap-2 text-sm text-gray-700">
              <FaLightbulb className="text-yellow-500" />
              <div>Analogy: the driver tells the car where to go, how fast, and when to stop.</div>
            </div>
          </motion.div>

          {/* Examples grid */}
          <div className="grid grid-cols-1 gap-3">
            {examples.map((ex) => {
              const opened = openExample === ex.id;
              return (
                <motion.div
                  key={ex.id}
                  layout
                  transition={{ layout: { duration: 0.25 } }}
                  className={`bg-white rounded-2xl p-4 shadow-md cursor-pointer border ${opened ? "border-indigo-300" : "border-transparent"}`}
                  onClick={() => setOpenExample(opened ? null : ex.id)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-indigo-50 rounded-lg flex items-center justify-center">
                        {ex.deviceIcon}
                      </div>
                      <div>
                        <div className="font-semibold text-gray-800">{ex.title}</div>
                        <div className="text-xs text-gray-500">Tap to see the software examples</div>
                      </div>
                    </div>
                    <div className="text-xs text-indigo-600 font-medium">{opened ? "Hide" : "Show"}</div>
                  </div>

                  {opened && (
                    <motion.div
                      initial={{ opacity: 0, y: -6 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.2 }}
                      className="mt-3 text-sm text-gray-700"
                    >
                      <div className="font-medium mb-2">Software examples:</div>
                      <ul className="list-disc pl-5 space-y-1">
                        {ex.exampleSoftware.map((s) => (
                          <li key={s} className="text-gray-600">{s}</li>
                        ))}
                      </ul>
                    </motion.div>
                  )}
                </motion.div>
              );
            })}
          </div>

          {/* Activity */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-2xl p-4 shadow-lg"
          >
            <h4 className="font-semibold text-gray-800">Fun Activity</h4>
            <p className="text-sm text-gray-600 mb-2">
              Ask 2 friends: Name a device and then say what the “software” for it would be. Example: TV → YouTube app.
            </p>
            <div className="flex gap-2">
              <button
                onClick={() => alert("Great! Try: Robot → Robot controller software")}
                className="px-3 py-2 bg-indigo-600 text-white rounded-lg text-sm shadow hover:bg-indigo-700 transition"
              >
                Give me an example
              </button>
              <button
                onClick={() => setPowered(true)}
                className="px-3 py-2 bg-green-500 text-white rounded-lg text-sm shadow hover:bg-green-600 transition"
              >
                Show "With Software"
              </button>
            </div>
          </motion.div>
        </div>
      </div>
      <div className="flex justify-between items-center mt-10 p-4 bg-gray-100 rounded-lg shadow-md">
        <button
          onClick={() => navigate('/parts/prt2')}
          className="flex items-center gap-2 px-4 py-2 bg-purple-200 hover:bg-purple-300 text-purple-900 rounded-lg shadow transition"
        >
          <FaArrowLeft />
          Previous
        </button>

        <button
          onClick={() => navigate('/module1/operating-system')}
          className="flex items-center gap-2 px-4 py-2 bg-green-200 hover:bg-green-300 text-green-900 rounded-lg shadow transition"
        >
          Next
          <FaArrowRight />
        </button>
      </div>
      {/* Footer small tip */}
      <div className="max-w-3xl mx-auto mt-8 text-center text-sm text-gray-600">
        <strong>Tip:</strong> Without software, hardware is just parts. Software is the instruction book that makes parts useful.
      </div>
    </div>
  );
}
