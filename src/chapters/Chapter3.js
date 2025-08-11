// src/chapters/Chapter3.jsx
import React from "react";
import { Link } from "react-router-dom";
import { FaKeyboard, FaMicrochip, FaDesktop, FaDatabase, FaArrowRight, FaArrowLeft, FaHome } from "react-icons/fa";

const DiagramBox = ({ title, subtitle, bg = "bg-white", border = "border-gray-200", icon }) => {
    return (
        <div className={`rounded-xl p-5 shadow-sm ${bg} border ${border} flex flex-col items-center text-center w-56`}>
            <div className="text-3xl mb-2 text-indigo-700">{icon}</div>
            <div className="font-semibold text-gray-800">{title}</div>
            {subtitle && <div className="text-sm text-gray-500 mt-1">{subtitle}</div>}
        </div>
    );
};

const CpuInnerBox = ({ label }) => (
    <div className="mt-3 w-36 p-2 rounded-md bg-white border border-indigo-200 text-indigo-700 text-sm font-semibold shadow-sm">
        {label}
    </div>
);

const Chapter3 = () => {
    return (
        <div className="p-6 min-h-screen bg-gray-50">
            {/* Home button (top center) */}
            <div className="max-w-5xl mx-auto relative">
                <div className="flex justify-center mb-6">
                    <Link
                        to="/"
                        className="inline-flex items-center px-4 py-2 bg-white rounded-full shadow-md border border-gray-200 hover:bg-gray-100 transition"
                    >
                        <FaHome className="mr-2 text-lg text-indigo-600" />
                        Home
                    </Link>
                </div>

                {/* Page header */}
                <header className="text-center mb-6">
                    <h1 className="text-3xl font-extrabold text-gray-800">Chapter 3: The Brain of the Computer: The CPU 🧠</h1>
                    <p className="text-gray-600 mt-2 max-w-2xl mx-auto">
                        The <strong>CPU</strong> is the computer's brain — it performs calculations and tells other parts what to do.
                    </p>
                </header>

                {/* Diagram Card */}
                <section className="bg-white rounded-2xl p-8 shadow-md">
                    <h2 className="text-2xl font-bold text-center text-gray-800 mb-4">How the CPU Works (Block Diagram)</h2>
                    <p className="text-center text-gray-600 mb-8">
                        This diagram shows how data flows from input devices → CPU → output devices, with memory storing instructions/data.
                    </p>

                    {/* Diagram layout */}
                    <div className="flex flex-col items-center">
                        {/* top row: input -> cpu -> output */}
                        <div className="w-full flex items-center justify-between px-6 md:px-12">
                            <div className="flex-1 flex justify-center">
                                <DiagramBox
                                    title="Input"
                                    subtitle="Keyboard, Mouse"
                                    bg="bg-indigo-50"
                                    border="border-indigo-200"
                                    icon={<FaKeyboard />}
                                />
                            </div>

                            {/* arrow */}
                            <div className="w-12 flex justify-center">
                                <div className="bg-indigo-50 text-indigo-700 p-3 rounded-full shadow-sm">
                                    <FaArrowRight />
                                </div>
                            </div>

                            {/* CPU block (center) */}
                            <div className="flex-1 flex justify-center">
                                <div className="rounded-xl p-5 shadow-lg border-4 border-indigo-300 bg-indigo-50 w-72 flex flex-col items-center">
                                    <div className="text-4xl mb-2 text-pink-600">
                                        <FaMicrochip />
                                    </div>
                                    <div className="text-lg font-bold text-indigo-900">CPU</div>

                                    {/* inner boxes */}
                                    <div className="mt-4 w-full flex flex-col items-center">
                                        <CpuInnerBox label="Control Unit (CU)" />
                                        <CpuInnerBox label="ALU (Arithmetic Logic Unit)" />
                                    </div>
                                </div>
                            </div>

                            {/* arrow */}
                            <div className="w-12 flex justify-center">
                                <div className="bg-indigo-50 text-indigo-700 p-3 rounded-full shadow-sm">
                                    <FaArrowRight />
                                </div>
                            </div>

                            <div className="flex-1 flex justify-center">
                                <DiagramBox
                                    title="Output"
                                    subtitle="Monitor, Printer"
                                    bg="bg-green-50"
                                    border="border-green-200"
                                    icon={<FaDesktop />}
                                />
                            </div>
                        </div>

                        {/* Memory unit below CPU */}
                        <div className="mt-10 flex ml-20 justify-center w-full">
                            <div className="w-full flex justify-center">
                                <div className="w-80">
                                    <DiagramBox
                                        title="Memory Unit"
                                        subtitle="Stores data & instructions"
                                        bg="bg-yellow-50"
                                        border="border-yellow-200"
                                        icon={<FaDatabase />}
                                    />
                                </div>
                            </div>
                        </div>

                        {/* CPU images row (optional visuals) */}
                        < div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
                            <div className="flex flex-col items-center">
                                <img
                                    src="https://i.cdn.newsbytesapp.com/images/l76620240904114749.jpeg"
                                    alt="CPU chip"
                                    className="w-72 h-52 object-cover rounded-xl shadow-lg border-2 border-gray-200"
                                />
                                <p className="mt-3 text-lg text-gray-800 font-semibold">Processor (chip)</p>
                            </div>
                            <div className="flex flex-col items-center">
                                <img
                                    src="https://img1.wsimg.com/isteam/ip/5138d36c-e672-4e5c-90cf-d7f5871abcd1/motherboard-683247_1280.png"
                                    alt="Motherboard"
                                    className="w-72 h-52 object-cover rounded-xl shadow-lg border-2 border-gray-200"
                                />
                                <p className="mt-3 text-lg text-gray-800 font-semibold">Motherboard (holds CPU)</p>
                            </div>
                            <div className="flex flex-col items-center">
                                <img
                                    src="https://i.ytimg.com/vi/VWcsanwCQnE/maxresdefault.jpg"
                                    alt="Cabinet"
                                    className="w-72 h-52 object-cover rounded-xl shadow-lg border-2 border-gray-200"
                                />
                                <p className="mt-3 text-lg text-gray-800 font-semibold">PC Cabinet / Case</p>
                            </div>
                        </div>
                        {/* explanation and analogies */}
                        <div className="mt-8 max-w-3xl text-gray-700 space-y-3">
                            <p>
                                Think of the CPU as the school headmaster: it receives instructions (from memory or input), decides what to do, and tells other parts how to act.
                            </p>
                            <p>
                                The <strong>Control Unit (CU)</strong> fetches instructions and coordinates everything. The <strong>ALU</strong> performs math and logic (like adding scores or comparing values).
                            </p>
                            <p>
                                Memory stores the lessons and rules; input gives new tasks; output shows the results. Saying a short story (analogy) about a headmaster passing notes helps kids remember the roles.
                            </p>
                        </div>
                    </div>
                </section>

                {/* Floating Prev / Next navigation (center-right and center-left) */}
                <Link
                    to="/chapters/ch2"
                    className="fixed left-4 top-1/2 transform -translate-y-1/2 bg-white border border-gray-200 rounded-full p-3 shadow hover:bg-gray-100 transition"
                    aria-label="Previous chapter"
                >
                    <FaArrowLeft className="text-lg text-indigo-600" />
                </Link>

                <Link
                    to="/chapters/ch4"
                    className="fixed right-4 top-1/2 transform -translate-y-1/2 bg-white border border-gray-200 rounded-full p-3 shadow hover:bg-gray-100 transition"
                    aria-label="Next chapter"
                >
                    <FaArrowRight className="text-lg text-indigo-600" />
                </Link>
            </div >
        </div >
    );
};

export default Chapter3;
