    import React, { useRef } from "react";
    import { gsap } from "gsap";
    import { FaArrowLeft, FaArrowRight, FaHome } from "react-icons/fa";
    import { useNavigate,Link } from "react-router-dom";
    import { useGSAP } from "@gsap/react";
    import { Flip } from "gsap/Flip";

    gsap.registerPlugin(Flip);

    const RAM_ROM_Component = () => {
        const navigate = useNavigate();
        const container = useRef(null);
        const introRef = useRef(null);
        const charactersRef = useRef(null);
        const tableRef = useRef(null);
        const outroRef = useRef(null);

        useGSAP(() => {
            const tl = gsap.timeline({
                defaults: {
                    duration: 1,
                    ease: "power3.out",
                },
                delay: 0.5,
            });

            // 1. Animate the Intro Section
            tl.from(introRef.current, {
                opacity: 0,
                y: 50,
            })
                .from(
                    introRef.current.querySelector("h1"),
                    {
                        scale: 0.8,
                        opacity: 0,
                        y: -20,
                        ease: "back.out(1.7)",
                    },
                    "<" // Start this animation at the same time as the previous one
                );

            // 2. Animate the Characters Section
            tl.from(charactersRef.current, {
                opacity: 0,
                y: 50,
            }, "<0.3") // Start 0.3 seconds after the previous animation ends
                .from(
                    charactersRef.current.children,
                    {
                        opacity: 0,
                        scale: 0.8,
                        stagger: 0.2,
                        ease: "back.out(1.7)",
                    },
                    "<"
                );

            // 3. Animate the Comparison Table
            tl.from(tableRef.current, {
                opacity: 0,
                y: 50,
                ease: "power2.inOut",
            }, "<0.3")
                .from(
                    tableRef.current.querySelectorAll("th, td"),
                    {
                        opacity: 0,
                        stagger: 0.05,
                        duration: 0.5,
                    },
                    "<0.5"
                );

            // 4. Animate the Outro Paragraph
            tl.from(outroRef.current, {
                opacity: 0,
                y: 30,
                ease: "power2.out",
            }, "<0.5");
        }, { scope: container, revertOnUpdate: true });

        return (
            <div
                ref={container}
                className="min-h-screen bg-gray-50 py-12 px-4 flex flex-col items-center font-sans"
            >
                <div className="flex justify-center mb-6">
                    <Link
                        to="/parts/prt1"
                        className="inline-flex items-center px-4 py-2 bg-white rounded-full shadow-md border border-gray-200 hover:bg-gray-100 transition"
                    >
                        <FaHome className="mr-2 text-lg text-indigo-600 animate-bounce" />
                        Home
                    </Link>
                </div>
                {/* Intro Section */}
                <div
                    ref={introRef}
                    className="bg-white shadow-xl rounded-xl p-6 max-w-3xl mb-10 w-full"
                >
                    <h1 className="text-3xl font-bold text-indigo-700 mb-4 flex items-center gap-2">
                        📖 What in the World is ROM? 🤔
                    </h1>
                    <p className="text-gray-700 mb-3">
                        Imagine you just bought a new video game console. You plug it in, press
                        the power button, and the console's logo pops up, a little loading
                        animation appears, and the main menu loads — all without inserting a
                        game!
                    </p>
                    <p className="text-gray-700">
                        That's the magic of <strong>ROM (Read-Only Memory)</strong>. Think of
                        it as a rulebook permanently glued to your computer's brain. This
                        rulebook has essential instructions for the computer to wake up, find
                        its operating system, and get ready to work. You can't erase it,
                        rewrite it, or delete it accidentally. It's set in stone by the
                        manufacturer!
                    </p>
                </div>

                {/* Characters Section */}
                <div
                    ref={charactersRef}
                    className="flex flex-col md:flex-row gap-6 mb-10 max-w-5xl w-full"
                >
                    {/* ROM Character */}
                    <div className="bg-yellow-100 rounded-xl shadow-lg p-5 flex-1 cursor-pointer hover:scale-105 transition-transform duration-300">
                        <h2 className="text-xl font-bold mb-2 flex items-center gap-2 text-gray-800">
                            😄 Gary the Groundskeeper (ROM)
                        </h2>
                        <p className="text-gray-800 mb-2">
                            Gary is grumpy but reliable. He knows how to open doors, turn on
                            lights, and start the office. His instructions are written in stone
                            — he never forgets!
                        </p>
                        <p className="italic text-gray-800">Analogy: The permanent rulebook.</p>
                    </div>

                    {/* RAM Character */}
                    <div className="bg-blue-100 rounded-xl shadow-lg p-5 flex-1 cursor-pointer hover:scale-105 transition-transform duration-300">
                        <h2 className="text-xl font-bold mb-2 flex items-center gap-2 text-gray-800">
                            🧠 Timmy the Temp (RAM)
                        </h2>
                        <p className="text-gray-800 mb-2">
                            Timmy is energetic and fast. He holds all the documents the boss
                            (CPU) is working on right now. When the day ends, everything is
                            cleared!
                        </p>
                        <p className="italic text-gray-800">Analogy: The active workbench.</p>
                    </div>
                </div>

                {/* Comparison Table */}
                <div
                    ref={tableRef}
                    className="overflow-x-auto w-full max-w-5xl bg-white shadow-xl rounded-xl"
                >
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-100">
                            <tr>
                                <th className="px-4 py-3 text-left text-gray-800">Feature</th>
                                <th className="px-4 py-3 text-left text-gray-800">RAM (Timmy)</th>
                                <th className="px-4 py-3 text-left text-gray-800">ROM (Gary)</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            <tr className="hover:bg-gray-50 transition-colors">
                                <td className="px-4 py-3 font-semibold text-gray-800">Job Role</td>
                                <td className="px-4 py-3 text-gray-800">
                                    The fast, temporary worker
                                </td>
                                <td className="px-4 py-3 text-gray-800">
                                    The permanent start-up specialist
                                </td>
                            </tr>
                            <tr className="hover:bg-gray-50 transition-colors">
                                <td className="px-4 py-3 font-semibold text-gray-800">
                                    Memory Type
                                </td>
                                <td className="px-4 py-3 text-gray-800">
                                    Volatile. Forgets everything when off
                                </td>
                                <td className="px-4 py-3 text-gray-800">
                                    Non-Volatile. Remembers forever
                                </td>
                            </tr>
                            <tr className="hover:bg-gray-50 transition-colors">
                                <td className="px-4 py-3 font-semibold text-gray-800">Speed</td>
                                <td className="px-4 py-3 text-gray-800">
                                    Extremely fast, right next to CPU
                                </td>
                                <td className="px-4 py-3 text-gray-800">
                                    Very fast but only for start-up instructions
                                </td>
                            </tr>
                            <tr className="hover:bg-gray-50 transition-colors">
                                <td className="px-4 py-3 font-semibold text-gray-800">
                                    Data Usage
                                </td>
                                <td className="px-4 py-3 text-gray-800">
                                    Holds programs & data currently in use
                                </td>
                                <td className="px-4 py-3 text-gray-800">
                                    Holds essential start-up instructions
                                </td>
                            </tr>
                            <tr className="hover:bg-gray-50 transition-colors">
                                <td className="px-4 py-3 font-semibold text-gray-800">Size</td>
                                <td className="px-4 py-3 text-gray-800">
                                    Usually larger (8 GB, 16 GB)
                                </td>
                                <td className="px-4 py-3 text-gray-800">Very small (a few MB)</td>
                            </tr>
                            <tr className="hover:bg-gray-50 transition-colors">
                                <td className="px-4 py-3 font-semibold text-gray-800">Analogy</td>
                                <td className="px-4 py-3 text-gray-800">
                                    The active workbench
                                </td>
                                <td className="px-4 py-3 text-gray-800">
                                    The permanent rulebook
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <p ref={outroRef} className="mt-6 max-w-3xl text-gray-800 text-center">
                    The bottom line: You need Gary (ROM) to get the office running every
                    morning, and you need Timmy (RAM) to do the actual work throughout the
                    day. Without Gary, the office can't even open. Without Timmy, no work
                    gets done!
                </p>
                <div className="w-full flex justify-between items-center mt-10 p-4 bg-gray-100 rounded-lg shadow-md">
                    <button
                        onClick={() => navigate('/part1/chapters/otherStorageTypes')}
                        className="flex items-center gap-2 px-4 py-2 bg-purple-200 hover:bg-purple-300 text-purple-900 rounded-lg shadow transition"
                    >
                        <FaArrowLeft />
                        Previous
                    </button>

                    <button
                        onClick={() => navigate('/part1/chapters/memoryComparison')}
                        className="flex items-center gap-2 px-4 py-2 bg-green-200 hover:bg-green-300 text-green-900 rounded-lg shadow transition"
                    >
                        Next
                        <FaArrowRight />
                    </button>
                </div>
            </div>
        );
    };

    export default RAM_ROM_Component;