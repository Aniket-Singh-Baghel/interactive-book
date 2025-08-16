import { motion } from "framer-motion";
import { FaCompactDisc, FaArrowLeft, FaArrowRight,FaHome } from "react-icons/fa";
import { GiArchiveRegister } from "react-icons/gi";
import { Link, useNavigate } from "react-router-dom";

export default function TertiaryStorage() {
    const navigate = useNavigate()
    const tertiaryExamples = [
        {
            name: "CD (Compact Disc)",
            appearance: "Shiny small silver disc, often with rainbow reflections.",
            advantage: "Cheap & simple to use.",
            disadvantage: "Low storage (~700MB).",
        },
        {
            name: "DVD (Digital Versatile Disc)",
            appearance: "Looks like a CD but usually labeled 'DVD'; can store movies.",
            advantage: "More space (~4.7GB).",
            disadvantage: "Still limited compared to HDDs/SSDs.",
        },
        {
            name: "Blu-ray Disc",
            appearance: "Looks similar to a DVD but often has a blue label or box.",
            advantage: "High capacity (~25–100GB).",
            disadvantage: "Special drives needed, becoming rare.",
        },
    ];

    return (
        <div className="p-6 max-w-5xl mx-auto">
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
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6 }}
                className="text-3xl font-bold text-center mb-8"
            >
                📀 Tertiary Storage
            </motion.h1>

            {/* Intro */}
            <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7 }}
                className="text-gray-700 mb-6 text-lg text-center"
            >
                "Tertiary" means <span className="font-semibold text-purple-600">third level</span> storage. 💡
                Think of it like putting old school projects into a box in your attic — safe, but not instantly reachable.
                It’s slower than primary & secondary storage, but great for **backup and archiving**.
            </motion.p>

            {/* Divider */}
            <div className="flex justify-center my-10">
                <GiArchiveRegister className="text-5xl text-purple-600 animate-bounce" />
            </div>

            {/* Tertiary Examples */}
            <div className="grid md:grid-cols-3 gap-8">
                {tertiaryExamples.map((ex, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, rotateY: 90 }}
                        whileInView={{ opacity: 1, rotateY: 0 }}
                        whileHover={{ scale: 1.05, rotate: 2 }}
                        transition={{ duration: 0.7 }}
                        className="bg-purple-50 border border-purple-200 rounded-2xl shadow-lg p-6 cursor-pointer hover:shadow-2xl"
                    >
                        <div className="flex justify-center mb-3">
                            <FaCompactDisc className="text-purple-500 text-4xl animate-pulse" />
                        </div>
                        <h3 className="text-lg font-bold mb-2 text-purple-700 text-center">
                            {ex.name}
                        </h3>
                        <p className="text-sm text-gray-700 mb-2">
                            🎨 Appearance: {ex.appearance}
                        </p>
                        <p className="text-sm text-green-600 mb-1">✅ {ex.advantage}</p>
                        <p className="text-sm text-red-600">❌ {ex.disadvantage}</p>
                    </motion.div>
                ))}
            </div>

            {/* Closing Note */}
            <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="mt-12 p-6 bg-gray-100 rounded-2xl shadow-md"
            >
                <h3 className="font-semibold text-lg mb-2 text-purple-700">✨ Key Takeaway</h3>
                <p className="text-gray-700">
                    - **Tertiary Storage** = Rarely used, slower, mostly for **backups & archives**. <br />
                    - Students can spot them because they look like **shiny discs** (CD/DVD/Blu-ray). <br />
                    - Unlike a pendrive or SD card, these aren’t everyday tools — more like long-term shelves 📦.
                </p>
            </motion.div>
            <div className="w-full flex justify-between items-center mt-10 p-4 bg-gray-100 rounded-lg shadow-md">
                <button
                    onClick={() => navigate('/part1/chapters/peripherals')}
                    className="flex items-center gap-2 px-4 py-2 bg-purple-200 hover:bg-purple-300 text-purple-900 rounded-lg shadow transition"
                >
                    <FaArrowLeft />
                    Previous
                </button>

                <button
                    onClick={() => navigate('/part1/chapters/otherStorageTypes')}
                    className="flex items-center gap-2 px-4 py-2 bg-green-200 hover:bg-green-300 text-green-900 rounded-lg shadow transition"
                >
                    Next
                    <FaArrowRight />
                </button>
            </div>
        </div>
    );
}
