import React, { useState } from "react";
import {
    FaWindows,
    FaChrome,
    FaFolder,
    FaMouse,
    FaKeyboard,
    FaArrowLeft,
    FaArrowRight,
    FaHome
} from "react-icons/fa";
import { useNavigate, Link } from "react-router-dom";
import { MdSearch } from "react-icons/md";
import { AiOutlineDesktop } from "react-icons/ai";
import { BsRecycle } from "react-icons/bs";
import { motion } from "framer-motion";

export default function DesktopUI() {
    const [active, setActive] = useState(null);
    const [startOpen, setStartOpen] = useState(false);
    const navigate = useNavigate()

    // store positions for each desktop icon
    const [positions, setPositions] = useState({
        pc: { x: 0, y: 0 },
        bin: { x: 120, y: 0 },
        proj: { x: 240, y: 0 },
    });

    const [dragging, setDragging] = useState(null);

    const handleClick = (item) => {
        if (item === "start") {
            setStartOpen((prev) => !prev); // toggle start menu
            return;
        }
        setActive(item);
        setTimeout(() => setActive(null), 2000); // Reset after 2s
    };

    const handleMouseDown = (e, key) => {
        e.preventDefault();
        setDragging({
            key,
            offsetX: e.clientX - positions[key].x,
            offsetY: e.clientY - positions[key].y,
        });
    };

    const handleMouseMove = (e) => {
        if (!dragging) return;
        const { key, offsetX, offsetY } = dragging;

        // container size
        const container = e.currentTarget.getBoundingClientRect();
        const iconSize = 60; // approximate icon+label size

        // calculate new positions
        let newX = e.clientX - offsetX;
        let newY = e.clientY - offsetY;

        // clamp inside boundaries
        newX = Math.max(0, Math.min(newX, container.width - iconSize));
        newY = Math.max(0, Math.min(newY, container.height - iconSize));

        setPositions((prev) => ({
            ...prev,
            [key]: { x: newX, y: newY },
        }));
    };

    const handleMouseUp = () => {
        setDragging(null);
    };

    return (
        <div
            className="flex flex-col items-center w-full min-h-screen bg-white"
        >
            <div className="flex justify-center mb-3 mt-2">
                <Link
                    to="/parts/prt3"
                    className="inline-flex items-center px-4 py-2 bg-white rounded-full shadow-md border border-gray-200 hover:bg-gray-100 transition"
                >
                    <FaHome className="mr-2 text-lg text-indigo-600" />
                    Home
                </Link>
            </div>

            {/* Title */}
            <motion.h1
                className="text-3xl font-bold text-center mb-6"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
            >
                Chapter 9: The Desktop and Basic Navigation
            </motion.h1>

            {/* Main Grid Layout */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-6xl px-6">

                {/* Left Column: Learning Cards */}
                <div className="flex flex-col gap-6">
                    {/* Concept */}
                    <motion.div
                        className="bg-blue-100 p-4 rounded-2xl shadow"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                    >
                        <p className="text-lg">
                            <b>Concept:</b> The <b>Desktop</b> is the main screen of your computer.
                            You use the <b>mouse</b> and <b>keyboard</b> to navigate and open
                            programs. Icons on the Desktop represent files, apps, or shortcuts.
                        </p>
                    </motion.div>

                    {/* Analogy */}
                    <motion.div
                        className="bg-yellow-100 p-4 rounded-2xl shadow"
                        initial={{ scale: 0.9 }}
                        animate={{ scale: 1 }}
                    >
                        <p className="font-semibold mb-2">📖 Analogy:</p>
                        <p>
                            Think of the Desktop as your <b>study table</b>. The icons are like
                            your <b>books and tools</b>. The mouse and keyboard help you{" "}
                            <b>pick up and open</b> what you need.
                        </p>
                    </motion.div>

                    {/* Fun Fact */}
                    <motion.div
                        className="bg-green-100 p-4 rounded-2xl shadow"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                    >
                        <p className="font-semibold mb-2">💡 Did You Know?</p>
                        <p>
                            The first computer with a desktop-style interface was the{" "}
                            <b>Xerox Alto</b> in the 1970s! It inspired Windows and Mac systems
                            later.
                        </p>
                    </motion.div>

                    {/* Taskbar Explanation */}
                    <motion.div
                        className="bg-purple-100 p-4 rounded-2xl shadow"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                    >
                        <p className="font-semibold mb-2">🟦 Taskbar:</p>
                        <p>
                            The <b>Taskbar</b> is like the <b>control strip</b> at the bottom of Windows.
                            It lets you quickly access <b>Start Menu</b>, <b>Search</b>, and your <b>favorite apps</b>.
                            It’s always visible, so you never lose track of your tools.
                        </p>
                    </motion.div>

                    {/* Search Bar Explanation */}
                    <motion.div
                        className="bg-pink-100 p-4 rounded-2xl shadow"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                    >
                        <p className="font-semibold mb-2">🔍 Search Bar:</p>
                        <p>
                            The <b>Search Bar</b> is like your computer’s <b>spotlight</b>.
                            Instead of clicking through folders, just type what you want —
                            a file, an app, or even settings — and Windows finds it instantly.
                            It saves time, just like using Google inside your own PC.
                        </p>
                    </motion.div>
                </div>

                {/* Right Column: Interaction Area */}
                <div className="flex flex-col gap-6">
                    {/* Mouse & Keyboard */}
                    <div className="grid grid-cols-2 gap-4">
                        <motion.div
                            className="bg-white p-4 rounded-2xl shadow flex flex-col items-center"
                            initial={{ x: -30, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                        >
                            <FaMouse size={50} className="text-blue-600 mb-2" />
                            <p>
                                <b>Mouse:</b> Move, click, double-click, right-click
                            </p>
                        </motion.div>
                        <motion.div
                            className="bg-white p-4 rounded-2xl shadow flex flex-col items-center"
                            initial={{ x: 30, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                        >
                            <FaKeyboard size={50} className="text-green-600 mb-2" />
                            <p>
                                <b>Keyboard:</b> Use arrows, Enter, Esc for navigation
                            </p>
                        </motion.div>
                    </div>

                    {/* Try It Section */}
                    <p className="mb-2 font-semibold">🖥 Try It: Click an icon on the Desktop</p>

                    {/* Desktop Simulation */}
                    <div
                        className="relative p-2 w-full h-[500px] bg-gradient-to-b from-sky-200 to-sky-400 rounded-xl shadow-lg flex flex-col overflow-hidden"
                        onMouseMove={handleMouseMove}
                        onMouseUp={handleMouseUp}
                    >
                        {/* Draggable Desktop Icons */}
                        {Object.entries(positions).map(([key, pos]) => (
                            <div
                                key={key}
                                className={`absolute flex flex-col items-center p-2 cursor-pointer ${active === key ? "bg-blue-500/40 rounded-lg" : ""
                                    }`}
                                style={{ left: pos.x, top: pos.y }}
                                onMouseDown={(e) => handleMouseDown(e, key)}
                                onClick={() => handleClick(key)}
                            >
                                {key === "pc" && (
                                    <>
                                        <AiOutlineDesktop size={40} />
                                        <span className="mt-1">This PC</span>
                                    </>
                                )}
                                {key === "bin" && (
                                    <>
                                        <BsRecycle size={40} />
                                        <span className="mt-1">Recycle Bin</span>
                                    </>
                                )}
                                {key === "proj" && (
                                    <motion.div whileHover={{ scale: 1.1 }} className="cursor-pointer">
                                        <FaFolder size={50} className="text-yellow-600 mx-auto" />
                                        <p>My Folder</p>
                                    </motion.div>
                                )}
                            </div>
                        ))}

                        {/* Taskbar */}
                        <div className="absolute bottom-0 left-0 w-full h-14 bg-[#1c1c28] flex items-center px-4 text-white">
                            <button
                                className="mr-4 hover:scale-110 transition"
                                onClick={() => handleClick("start")}
                            >
                                <FaWindows size={28} />
                            </button>
                            <div
                                className="flex items-center bg-gray-700 px-3 py-1 rounded-lg flex-1 max-w-md cursor-pointer"
                                onClick={() => handleClick("search")}
                            >
                                <MdSearch size={20} className="mr-2" />
                                <span className="text-sm text-gray-300">Search...</span>
                            </div>
                            <button
                                className="ml-4 hover:scale-110 transition"
                                onClick={() => handleClick("chrome")}
                            >
                                <FaChrome size={28} color="#f4c20d" />
                            </button>
                            <button
                                className="ml-4 hover:scale-110 transition"
                                onClick={() => handleClick("folder")}
                            >
                                <FaFolder size={28} color="goldenrod" />
                            </button>
                        </div>

                        {/* Popup for clicked item */}
                        {active && active !== "start" && (
                            <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 bg-black/80 text-white px-4 py-2 rounded-lg shadow-lg">
                                You clicked <b>{active}</b>
                            </div>
                        )}
                        {startOpen && (
                            <div className="absolute bottom-14 left-2 w-48 bg-gray-900 text-white rounded-lg shadow-lg p-3 space-y-2">
                                <div className="hover:bg-gray-700 p-2 rounded">📁 File Explorer</div>
                                <div className="hover:bg-gray-700 p-2 rounded">🌐 Browser</div>
                                <div className="hover:bg-gray-700 p-2 rounded">📝 Notepad</div>
                                <div className="hover:bg-gray-700 p-2 rounded">🎵 Music Player</div>
                                <div className="hover:bg-gray-700 p-2 rounded">📧 Mail</div>
                                <div className="hover:bg-gray-700 p-2 rounded">⚙ Settings</div>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Navigation Buttons */}
            <div className="flex justify-between items-center mt-8 p-4 bg-gray-100 rounded-lg shadow-md w-full max-w-6xl">
                <button
                    onClick={() => navigate('/part2/chapters/ch8')}
                    className="flex items-center gap-2 px-4 py-2 bg-purple-200 hover:bg-purple-300 text-purple-900 rounded-lg shadow transition"
                >
                    <FaArrowLeft />
                    Previous
                </button>

                <button
                    onClick={() => navigate('/part3/chapters/ch10')}
                    className="flex items-center gap-2 px-4 py-2 bg-green-200 hover:bg-green-300 text-green-900 rounded-lg shadow transition"
                >
                    Next
                    <FaArrowRight />
                </button>
            </div>
        </div>
    );
}
