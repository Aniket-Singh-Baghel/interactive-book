import React from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { FaToolbox, FaHome, FaTools, FaLaptopCode, FaCogs, FaArrowLeft, FaArrowRight } from "react-icons/fa";

const TypesOfSoftware = () => {
    const navigate = useNavigate();

    return (
        <div className="p-6 max-w-5xl mx-auto font-sans">
            {/* Heading */}
            <div className="flex justify-center mb-6">
                <Link
                    to="/parts/prt2"
                    className="inline-flex items-center px-4 py-2 bg-white rounded-full shadow-md border border-gray-200 hover:bg-gray-100 transition"
                >
                    <FaHome className="mr-2 text-lg text-indigo-600" />
                    Home
                </Link>
            </div>
            <motion.h1
                className="text-3xl font-bold mb-4 text-purple-700"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
            >
                Chapter 8: Types of Software
            </motion.h1>

            {/* Analogy Section */}
            <motion.div
                className="bg-purple-50 p-5 rounded-xl mb-6 shadow-md"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
            >
                <h2 className="text-xl font-semibold text-purple-600 mb-2">
                    Analogy: Toolbox & Tools
                </h2>
                <p className="text-gray-700">
                    Think of the operating system as the **toolbox** — it stores,
                    organizes, and manages all your tools. Application software is like a
                    **specific tool** inside the toolbox — for example, MS Word is like a
                    screwdriver, built for a specific task.
                </p>
                <div className="flex gap-6 mt-4 justify-center">
                    <motion.div
                        whileHover={{ scale: 1.1 }}
                        className="flex flex-col items-center"
                    >
                        <FaToolbox size={50} className="text-purple-500" />
                        <p className="mt-2 text-sm">Operating System (Toolbox)</p>
                    </motion.div>
                    <motion.div
                        whileHover={{ scale: 1.1 }}
                        className="flex flex-col items-center"
                    >
                        <FaTools size={50} className="text-yellow-500" />
                        <p className="mt-2 text-sm">Application Software (Tool)</p>
                    </motion.div>
                </div>
            </motion.div>

            {/* Comparison Table */}
            <motion.div
                className="overflow-x-auto shadow-lg rounded-lg mb-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
            >
                <table className="min-w-full bg-white rounded-lg">
                    <thead>
                        <tr className="bg-purple-600 text-white">
                            <th className="py-3 px-4 text-left">Feature</th>
                            <th className="py-3 px-4 text-left">System Software</th>
                            <th className="py-3 px-4 text-left">Application Software</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className="border-b">
                            <td className="py-2 px-4 font-semibold">Purpose</td>
                            <td className="py-2 px-4">Manages computer hardware & core functions</td>
                            <td className="py-2 px-4">Performs specific user-oriented tasks</td>
                        </tr>
                        <tr className="border-b bg-gray-50">
                            <td className="py-2 px-4 font-semibold">Examples</td>
                            <td className="py-2 px-4">Windows, macOS, Linux</td>
                            <td className="py-2 px-4">MS Word, Photoshop, Chrome</td>
                        </tr>
                        <tr>
                            <td className="py-2 px-4 font-semibold">Runs on</td>
                            <td className="py-2 px-4">Runs in the background</td>
                            <td className="py-2 px-4">Runs when user opens it</td>
                        </tr>
                    </tbody>
                </table>
            </motion.div>

            {/* Example Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <motion.div
                    className="p-5 bg-blue-50 rounded-xl shadow-md flex items-center gap-4"
                    whileHover={{ scale: 1.05 }}
                >
                    <FaCogs size={40} className="text-blue-500" />
                    <div>
                        <h3 className="font-bold">System Software</h3>
                        <p className="text-sm text-gray-700">
                            Works as the foundation — manages CPU, memory, and devices.
                        </p>
                    </div>
                </motion.div>

                <motion.div
                    className="p-5 bg-green-50 rounded-xl shadow-md flex items-center gap-4"
                    whileHover={{ scale: 1.05 }}
                >
                    <FaLaptopCode size={40} className="text-green-500" />
                    <div>
                        <h3 className="font-bold">Application Software</h3>
                        <p className="text-sm text-gray-700">
                            Helps you complete tasks like writing, designing, or browsing.
                        </p>
                    </div>
                </motion.div>
            </div>
            <div className="flex justify-between items-center mt-10 p-4 bg-gray-100 rounded-lg shadow-md">
                <button
                    onClick={() => navigate('/part2/chapters/ch7')}
                    className="flex items-center gap-2 px-4 py-2 bg-purple-200 hover:bg-purple-300 text-purple-900 rounded-lg shadow transition"
                >
                    <FaArrowLeft />
                    Previous
                </button>

                <button
                    onClick={() => navigate('/parts/prt2')}
                    className="flex items-center gap-2 px-4 py-2 bg-green-200 hover:bg-green-300 text-green-900 rounded-lg shadow transition"
                >
                    Next
                    <FaArrowRight />
                </button>
            </div>
        </div>
    );
};

export default TypesOfSoftware;
