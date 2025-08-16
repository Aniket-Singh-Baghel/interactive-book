import { motion } from "framer-motion";
import { Server, Router, Home, Cpu } from "lucide-react";
import { Link, useNavigate } from 'react-router-dom';
import { FaKeyboard, FaMouse, FaHeadphones, FaDesktop, FaBrain, FaHandPaper, FaHome, FaArrowLeft, FaArrowRight } from "react-icons/fa";

export default function PeripheralsLesson() {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-pink-50 to-purple-100 flex flex-col items-center py-12 px-6 font-sans">
            {/* Home Button */}
            <div className="flex justify-center mb-6">
                <Link
                    to="/parts/prt1"
                    className="inline-flex items-center px-4 py-2 bg-white rounded-full shadow-md border border-gray-200 hover:bg-gray-100 transition"
                >
                    <FaHome className="mr-2 text-lg text-indigo-600" />
                    Home
                </Link>
            </div>

            {/* Title */}
            <motion.h1
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.7, type: "spring" }}
                className="text-4xl font-extrabold text-purple-700 mb-8 drop-shadow-lg"
            >
                What are Peripherals? 🖥️
            </motion.h1>

            {/* Technical Definition Card */}
            <motion.div
                whileHover={{ scale: 1.05 }}
                className="bg-white rounded-2xl shadow-lg p-6 max-w-2xl mb-10 text-center border-2 border-purple-200"
            >
                <p className="text-lg font-medium text-gray-700">
                    A <span className="font-bold text-purple-600">peripheral</span> is any device connected to a computer
                    that isn’t part of its <span className="bg-yellow-300 px-1 py-1 rounded">core components</span> (CPU, RAM, Motherboard).
                </p>
                <p className="mt-3 text-gray-600 italic">
                    Think of them as helpful “sidekicks” that let us interact with the computer.
                </p>
            </motion.div>

            {/* Confusion Explanation */}
            <motion.div
                initial={{ x: -100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.8 }}
                className="bg-purple-50 rounded-2xl shadow-md p-6 max-w-xl mb-10 text-center border-2 border-yellow-300"
            >
                <h2 className="text-xl font-semibold text-purple-700 mb-2">Why is it Confusing?</h2>
                <p className="text-gray-700">
                    Students often think peripherals (like monitors & keyboards) are “core” parts
                    because they feel essential for everyday use.
                </p>
            </motion.div>

            {/* Analogy Section */}
            <motion.div
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="flex flex-col md:flex-row items-center gap-6 mb-12"
            >
                {/* Core Components */}
                <motion.div
                    whileHover={{ rotate: -2, scale: 1.05 }}
                    className="bg-white rounded-xl p-6 shadow-md border-2 border-purple-400 w-72 text-center"
                >
                    <FaBrain className="text-5xl text-purple-600 mx-auto mb-3" />
                    <h3 className="text-lg font-bold text-purple-700">Core Components</h3>
                    <p className="text-sm text-gray-600">
                        CPU, RAM, Motherboard = the <span className="font-semibold">Brain & Organs</span>.
                        Without them, the computer can’t function.
                    </p>
                </motion.div>

                {/* Analogy Arrow */}
                <motion.div
                    animate={{ x: [0, 10, 0] }}
                    transition={{ repeat: Infinity, duration: 1.5 }}
                    className="text-3xl text-purple-500"
                >
                    ➡️
                </motion.div>

                {/* Peripherals */}
                <motion.div
                    whileHover={{ rotate: 2, scale: 1.05 }}
                    className="bg-white rounded-xl p-6 shadow-md border-2 border-yellow-400 w-72 text-center"
                >
                    <FaHandPaper className="text-5xl text-yellow-500 mx-auto mb-3" />
                    <h3 className="text-lg font-bold text-yellow-600">Peripherals</h3>
                    <p className="text-sm text-gray-600">
                        Keyboard, Monitor, Mouse = the <span className="font-semibold">Hands, Eyes & Ears</span>.
                        They help us interact but aren’t the “brain.”
                    </p>
                </motion.div>
            </motion.div>

            {/* Examples with Animation */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
                {[
                    { icon: <FaKeyboard />, label: "Keyboard" },
                    { icon: <FaMouse />, label: "Mouse" },
                    { icon: <FaHeadphones />, label: "Headphones" },
                    { icon: <FaDesktop />, label: "Monitor" },
                ].map((item, idx) => (
                    <motion.div
                        key={idx}
                        whileHover={{ scale: 1.15, rotate: 3 }}
                        className="bg-white rounded-xl shadow-lg p-4 flex flex-col items-center border border-gray-200"
                    >
                        <div className="text-4xl text-purple-500 mb-2">{item.icon}</div>
                        <p className="text-sm font-semibold text-gray-700">{item.label}</p>
                    </motion.div>
                ))}
            </div>
            <motion.div
                className="p-6 bg-purple-50 rounded-2xl shadow-lg max-w-3xl mx-auto mt-8"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
            >
                <h2 className="text-2xl font-bold text-purple-800 mb-4">
                    💡 What if the Monitor was a Core Part?
                </h2>

                <p className="text-lg mb-4">
                    Many students think <span className="bg-yellow-200 px-1 rounded">a
                        monitor</span> must be a core part of the computer. But let’s look at
                    real-world examples where computers work perfectly fine <em>without
                        one</em>.
                </p>

                {/* Servers Example */}
                <motion.div
                    className="flex items-center gap-4 bg-white p-4 rounded-xl mb-4 shadow"
                    whileHover={{ scale: 1.02 }}
                >
                    <Server className="text-purple-600 w-10 h-10" />
                    <p>
                        <span className="font-bold text-purple-700">Servers</span> run the
                        internet 💻. They usually don’t have monitors — they’re managed
                        remotely through networks. This is called a{" "}
                        <span className="bg-pink-200 px-1 rounded">headless system</span>.
                    </p>
                </motion.div>

                {/* Routers Example */}
                <motion.div
                    className="flex items-center gap-4 bg-white p-4 rounded-xl mb-4 shadow"
                    whileHover={{ scale: 1.02 }}
                >
                    <Router className="text-green-600 w-10 h-10" />
                    <p>
                        Your <span className="font-bold text-green-700">Wi-Fi router</span> is
                        a tiny computer ⚙️. It has a CPU, RAM, and storage — but no monitor!
                    </p>
                </motion.div>

                {/* Smart Home Hub Example */}
                <motion.div
                    className="flex items-center gap-4 bg-white p-4 rounded-xl mb-4 shadow"
                    whileHover={{ scale: 1.02 }}
                >
                    <Home className="text-blue-600 w-10 h-10" />
                    <p>
                        <span className="font-bold text-blue-700">Smart home hubs</span> like
                        Alexa or Google Home process commands and play audio 🎶 — all without
                        screens.
                    </p>
                </motion.div>

                {/* Embedded Systems Example */}
                <motion.div
                    className="flex items-center gap-4 bg-white p-4 rounded-xl mb-4 shadow"
                    whileHover={{ scale: 1.02 }}
                >
                    <Cpu className="text-red-600 w-10 h-10" />
                    <p>
                        <span className="font-bold text-red-700">Embedded systems</span> power
                        things like cars, microwaves, and washing machines 🚗 — they compute
                        but don’t “show” you their work.
                    </p>
                </motion.div>

                <p className="mt-4 text-lg">
                    👉 The takeaway: <span className="bg-yellow-200 px-2 rounded">Core
                        components</span> (CPU, RAM, Motherboard) do the real computing. A
                    monitor is just one way to <em>see</em> the results, not a part of the
                    core brain itself.
                </p>
            </motion.div>
            <div className="w-full flex justify-between items-center mt-10 p-4 bg-gray-100 rounded-lg shadow-md">
                <button
                    onClick={() => navigate('/part1/chapters/ch5')}
                    className="flex items-center gap-2 px-4 py-2 bg-purple-200 hover:bg-purple-300 text-purple-900 rounded-lg shadow transition"
                >
                    <FaArrowLeft />
                    Previous
                </button>

                <button
                    onClick={() => navigate('/part1/chapters/tertriaryStorage')}
                    className="flex items-center gap-2 px-4 py-2 bg-green-200 hover:bg-green-300 text-green-900 rounded-lg shadow transition"
                >
                    Next
                    <FaArrowRight />
                </button>
            </div>

        </div>
    );
}
