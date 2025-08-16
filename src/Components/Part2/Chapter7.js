import React from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { FaHome, FaArrowLeft, FaArrowRight, FaHdd, FaMicrochip, FaMemory, FaNetworkWired, FaBook, FaChalkboardTeacher, FaTools, FaAppStore, FaMouse, FaShieldAlt, FaProjectDiagram, FaFolderOpen } from "react-icons/fa";

export default function OSChapter7() {

    const navigate = useNavigate();
    
    const diagramItems = [
        { label: "CPU", color: "border-purple-500", icon: <FaMicrochip /> },
        { label: "Memory", color: "border-green-500", icon: <FaMemory /> },
        { label: "Network", color: "border-sky-500", icon: <FaNetworkWired /> },
        { label: "Storage", color: "border-yellow-500", icon: <FaHdd /> },
        { label: "Apps", color: "border-pink-500", icon: <FaAppStore /> },
        { label: "Devices", color: "border-red-500", icon: <FaMouse /> },
    ];

    const infoCards = [
        { title: "Process Manager", icon: <FaProjectDiagram />, text: "Starts, pauses, and stops programs so everything runs smoothly without fighting for the CPU." },
        { title: "Memory Manager", icon: <FaMemory />, text: "Gives each program a safe space to store its data while it’s running." },
        { title: "File System", icon: <FaFolderOpen />, text: "Organizes your files and folders on storage so you can save and find things easily." },
        { title: "Device Drivers", icon: <FaMouse />, text: "Helps the computer talk to keyboard, mouse, printer, and more—like translators for devices." },
        { title: "Security", icon: <FaShieldAlt />, text: "Locks the ‘village gates’ with passwords/permissions to keep your data safe." },
        { title: "Networking", icon: <FaNetworkWired />, text: "Connects your computer to the internet and other computers to share information." },
    ];

    const osCoreData = [
        {
            title: "CPU (The Workers)",
            icon: <FaMicrochip size={40} />,
            color: "bg-purple-100",
            desc: "Like factory workers, the OS decides who gets CPU time at each moment."
        },
        {
            title: "Memory (The Classroom Desks)",
            icon: <FaMemory size={40} />,
            color: "bg-yellow-100",
            desc: "The OS assigns each program its own desk so they don’t disturb others."
        },
        {
            title: "Network (The Hallway & Letters)",
            icon: <FaNetworkWired size={40} />,
            color: "bg-blue-100",
            desc: "Acts like a postmaster, delivering messages between classrooms or schools."
        },
        {
            title: "Storage (The Library)",
            icon: <FaBook size={40} />,
            color: "bg-orange-100",
            desc: "Keeps track of every 'book' (file) so you can find and open it anytime."
        },
        {
            title: "Apps (The Lessons)",
            icon: <FaChalkboardTeacher size={40} />,
            color: "bg-pink-100",
            desc: "Schedules lessons and ensures resources are ready for teachers."
        },
        {
            title: "Devices (School Equipment)",
            icon: <FaTools size={40} />,
            color: "bg-green-100",
            desc: "Makes sure projectors, printers, and devices are ready to use."
        },
    ];

    return (
        <div className="min-h-screen bg-gradient-to-b from-blue-50 to-purple-50 p-6">
            <div className="flex justify-center mb-6">
                <Link
                    to="/parts/prt2"
                    className="inline-flex items-center px-4 py-2 bg-white rounded-full shadow-md border border-gray-200 hover:bg-gray-100 transition"
                >
                    <FaHome className="mr-2 text-lg text-indigo-600" />
                    Home
                </Link>
            </div>

            <div className="flex flex-col items-center">
                <h1 className="text-3xl font-bold text-purple-700 mb-2">
                    Chapter 7 — The Operating System (OS)
                </h1>
                <p className="text-pink-600 mb-8 text-center max-w-xl">
                    The OS is the <strong>manager</strong> that keeps everything and everyone following the rules.
                </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
                {/* OS Core Diagram */}
                <motion.div
                    className="bg-white rounded-2xl p-6 shadow-lg"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <h2 className="flex items-center gap-2 text-lg font-semibold text-purple-700 mb-4">
                        <FaMicrochip /> OS Core Diagram
                    </h2>

                    <div className="relative flex flex-col items-center">
                        <motion.div
                            className="p-6 rounded-lg border-2 border-purple-400 shadow-md text-center bg-white"
                            whileHover={{ scale: 1.05 }}
                        >
                            <FaMicrochip className="text-purple-500 text-2xl mx-auto mb-2" />
                            <p className="font-semibold">OS Core</p>
                            <p className="text-sm text-gray-500">(The Manager)</p>
                        </motion.div>

                        <div className="grid grid-cols-2 gap-4 mt-6">
                            {diagramItems.map((item, index) => (
                                <motion.div
                                    key={index}
                                    className={`p-4 rounded-lg border-2 ${item.color} flex flex-col items-center`}
                                    whileHover={{ scale: 1.05 }}
                                    initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: index * 0.2 }}
                                >
                                    <div className="text-2xl mb-2">{item.icon}</div>
                                    <p className="font-medium">{item.label}</p>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </motion.div>

                {/* Info Cards */}
                <div className="grid sm:grid-cols-2 gap-4">
                    {infoCards.map((card, index) => (
                        <motion.div
                            key={index}
                            className="bg-white rounded-xl shadow-md p-4 flex items-start gap-3 hover:shadow-xl transition"
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.15 }}
                        >
                            <div className="text-purple-600 text-xl">{card.icon}</div>
                            <div>
                                <h3 className="font-semibold">{card.title}</h3>
                                <p className="text-sm text-gray-600">{card.text}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
            <div className="p-6">
                <h2 className="text-2xl font-bold mb-4 text-purple-700">Understanding the OS Core</h2>
                <p className="mb-8">
                    Think of the OS Core as the <strong>school principal</strong> who ensures every teacher, student,
                    and classroom runs smoothly without chaos.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {osCoreData.map((item, index) => (
                        <motion.div
                            key={index}
                            className={`${item.color} p-4 rounded-xl shadow-md flex flex-col items-center text-center`}
                            whileHover={{ scale: 1.05, rotate: 1 }}
                            transition={{ type: "spring", stiffness: 200 }}
                        >
                            <div className="mb-3 text-purple-800">{item.icon}</div>
                            <h3 className="font-semibold text-lg mb-2">{item.title}</h3>
                            <p className="text-gray-700">{item.desc}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
            <div className="flex justify-between items-center mt-10 p-4 bg-gray-100 rounded-lg shadow-md">
                <button
                    onClick={() => navigate('/part2/chapters/ch6')}
                    className="flex items-center gap-2 px-4 py-2 bg-purple-200 hover:bg-purple-300 text-purple-900 rounded-lg shadow transition"
                >
                    <FaArrowLeft />
                    Previous
                </button>

                <button
                    onClick={() => navigate('/part2/chapters/ch8')}
                    className="flex items-center gap-2 px-4 py-2 bg-green-200 hover:bg-green-300 text-green-900 rounded-lg shadow transition"
                >
                    Next
                    <FaArrowRight />
                </button>
            </div>
            <p className="text-center mt-8 text-sm text-gray-700">
                <strong>Remember:</strong> Apps talk to the OS, and the OS talks to the hardware. That’s how the whole “village” stays happy and organized!
            </p>
        </div>
    );
}
