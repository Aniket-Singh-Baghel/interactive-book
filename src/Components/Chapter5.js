// src/chapters/Chapter5.jsx
import React from "react";
import { Link } from "react-router-dom";
import { FaKeyboard, FaMicrophone, FaMouse, FaDesktop, FaPrint, FaVolumeUp, FaHome, FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { motion } from "framer-motion";

const DeviceCard = ({ emoji, title, short, fact, examples, icon: Icon }) => {
  return (
    <motion.div
      whileHover={{ y: -6, scale: 1.02 }}
      className="bg-white rounded-2xl shadow-md p-5 hover:shadow-xl transition-transform duration-300"
    >
      <div className="flex items-start space-x-4">
        <div className="w-14 h-14 rounded-full bg-gradient-to-br from-indigo-50 to-indigo-100 flex items-center justify-center text-3xl shadow-sm">
          <span aria-hidden>{emoji}</span>
        </div>
        <div className="flex-1">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-indigo-800">{title}</h3>
            <div className="text-indigo-500 text-2xl">
              <Icon />
            </div>
          </div>
          <p className="text-sm text-gray-700 mt-2">{short}</p>

          <details className="mt-3">
            <summary className="cursor-pointer text-sm text-indigo-600 font-medium">Learn more ▾</summary>
            <div className="mt-2 text-sm text-gray-700 space-y-2">
              <p><strong>Memory Tip:</strong> {fact}</p>
              {examples && (
                <div>
                  <div className="font-semibold mt-1">Examples:</div>
                  <ul className="list-disc pl-5 mt-1 text-gray-700">
                    {examples.map((ex, i) => (
                      <li key={i}>{ex}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </details>
        </div>
      </div>
    </motion.div>
  );
};

const FlowArrow = ({ direction = "right" }) => (
  <motion.div
    animate={{ x: [0, direction === "right" ? 8 : -8, 0] }}
    transition={{ repeat: Infinity, repeatType: "loop", duration: 1.4 }}
    className="text-indigo-500 text-3xl"
    aria-hidden
  >
    {direction === "right" ? "➡️" : "⬅️"}
  </motion.div>
);

const Chapter5 = () => {
  return (
    <div className="p-6 min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto">
        {/* Home button */}
        <div className="flex justify-center mb-6">
          <Link
            to="/parts/prt1"
            className="inline-flex items-center px-4 py-2 bg-white rounded-full shadow-md border border-gray-200 hover:bg-gray-100 transition"
          >
            <FaHome className="mr-2 text-indigo-600" />
            Home
          </Link>
        </div>

        {/* Header */}
        <header className="text-center mb-6">
          <h1 className="text-3xl md:text-4xl font-extrabold text-gray-800">Chapter 5: Input & Output Devices ⌨️🖱️</h1>
          <p className="text-gray-600 mt-2 max-w-3xl mx-auto">
            How we talk to the computer and how it talks back — with analogies, definitions, and interactive visuals.
          </p>
        </header>

        {/* Analogy & Technical Definition Section */}
        <section className="bg-gradient-to-r from-indigo-50 to-blue-50 p-6 rounded-2xl shadow mb-8">
          <h2 className="text-xl font-bold text-indigo-800 mb-4">Understanding Input & Output</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {/* Input analogy */}
            <div className="p-4 bg-white rounded-xl shadow">
              <h3 className="font-semibold text-lg text-indigo-700 mb-2">🎯 Input Devices</h3>
              <p className="mb-2"><strong>Analogy:</strong> Like our <em>hands and mouth</em>, they let us send instructions to the computer.</p>
              <p className="mb-1"><strong>Technical Definition:</strong> Hardware that allows users to enter data or control signals into a computer system.</p>
              <p className="text-sm text-gray-700">Examples: Keyboard, mouse, scanner, microphone, joystick.</p>
            </div>
            {/* Output analogy */}
            <div className="p-4 bg-white rounded-xl shadow">
              <h3 className="font-semibold text-lg text-indigo-700 mb-2">📢 Output Devices</h3>
              <p className="mb-2"><strong>Analogy:</strong> Like our <em>eyes and ears</em>, they present information from the computer back to us.</p>
              <p className="mb-1"><strong>Technical Definition:</strong> Hardware that conveys processed data from the computer to the user in visual, audio, or physical form.</p>
              <p className="text-sm text-gray-700">Examples: Monitor, speakers, printer, projector.</p>
            </div>
          </div>
        </section>

        {/* Main diagram */}
        <section className="bg-white rounded-3xl p-8 shadow-lg mb-8">
          <h2 className="text-2xl font-bold text-center text-gray-800 mb-4">Input → Processing → Output</h2>
          <p className="text-center text-gray-600 mb-6">Devices let us provide data (input) and receive results (output). Some devices can do both.</p>

          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            {/* Input */}
            <div className="flex-1">
              <div className="grid gap-4">
                <DeviceCard emoji="⌨️" title="Keyboard" short="Type letters, numbers, and commands." fact="Think: 'Keyboard = Writing by hand'. Fast and versatile." examples={["Typing documents", "Chatting", "Shortcut commands (Ctrl/Cmd + C)"]} icon={FaKeyboard} />
                <DeviceCard emoji="🖱️" title="Mouse / Touchpad" short="Pointing, clicking, dragging — precision control." fact="Analogous to pointing with your finger; very useful for GUIs." examples={["Selecting text", "Dragging files", "Right-click menus"]} icon={FaMouse} />
                <DeviceCard emoji="🎙️" title="Microphone" short="Record voice or give voice commands." fact="Like speaking to a friend — the computer transcribes or responds." examples={["Voice assistant", "Recording audio for lessons"]} icon={FaMicrophone} />
              </div>
            </div>

            {/* Processing */}
            <div className="flex flex-col items-center">
              <div className="bg-indigo-50 rounded-xl p-6 shadow-inner border border-indigo-100 text-center w-60 mb-4">
                <div className="text-indigo-600 text-4xl mb-2">🧠</div>
                <div className="text-lg font-bold text-indigo-900">CPU / Processing</div>
                <p className="text-sm text-gray-700 mt-2">Where input is transformed into useful output.</p>
              </div>
              <div className="flex items-center space-x-2">
                <FlowArrow direction="left" />
                <div className="px-3 py-1 rounded-full bg-gray-100 text-sm">Process</div>
                <FlowArrow direction="right" />
              </div>
            </div>   

            {/* Output */}
            <div className="flex-1">
              <div className="grid gap-4">
                <DeviceCard emoji="🖥️" title="Monitor" short="Shows visuals: text, images, videos." fact="Monitor = eyes of the computer. Resolution and size change clarity." examples={["Watching videos", "Viewing documents", "Presentations"]} icon={FaDesktop} />
                <DeviceCard emoji="🔊" title="Speakers / Headphones" short="Play sound: music, alerts, voice." fact="Speakers = voice of the computer. Volume & quality matter." examples={["Playing music", "Hearing notifications", "Audio for videos"]} icon={FaVolumeUp} />
                <DeviceCard emoji="🖨️" title="Printer" short="Produce physical copies of digital content." fact="Printer = paper output; handy for reports and certificates." examples={["Printing homework", "Photographs", "Tickets"]} icon={FaPrint} />
              </div>
            </div>
          </div>
        </section>

        {/* Quiz */}
        <section className="bg-white rounded-2xl p-6 shadow-md mb-8">
          <h3 className="text-xl font-semibold mb-2">Quick Challenge</h3>
          <p className="text-gray-700 mb-4">Ask: "Name one input and one output device you used today." Then explain each in one sentence.</p>
          <div className="flex gap-3 flex-wrap">
            <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg shadow hover:bg-indigo-700 transition">Practice: List 5 inputs</button>
            <button className="px-4 py-2 bg-yellow-500 text-white rounded-lg shadow hover:bg-yellow-600 transition">Class Activity: Draw & Label</button>
          </div>
        </section>

        {/* Facts */}
        <section className="bg-white rounded-2xl p-6 shadow-sm mb-12">
          <h3 className="text-lg font-semibold mb-2">Quick Facts & Tips</h3>
          <ul className="list-disc pl-5 text-gray-700 space-y-1">
            <li><strong>Oldest mouse fact:</strong> the first mouse had a single button and was wooden!</li>
            <li><strong>Microphones:</strong> modern voice recognition needs clear speech and a quiet room to work well.</li>
            <li><strong>Monitors:</strong> more pixels = clearer images; DPI matters for print vs screen.</li>
          </ul>
        </section>

        {/* Navigation */}
        <Link to="/part1/chapters/ch4" className="fixed left-4 top-1/2 transform -translate-y-1/2 bg-white border border-gray-200 rounded-full p-3 shadow hover:bg-gray-100 transition" aria-label="Previous chapter">
          <FaArrowLeft className="text-lg text-indigo-600" />
        </Link>
        <Link to="/part1/chapters/qiz1" className="fixed right-4 top-1/2 transform -translate-y-1/2 bg-white border border-gray-200 rounded-full p-3 shadow hover:bg-gray-100 transition" aria-label="Next chapter">
          <FaArrowRight className="text-lg text-indigo-600" />
        </Link>
      </div>
    </div>
  );
};

export default Chapter5;
