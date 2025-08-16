import { motion } from "framer-motion";
import { FaUsb, FaArrowLeft, FaArrowRight, FaHome } from "react-icons/fa";
import { useNavigate,Link } from "react-router-dom";
import { FaFloppyDisk } from "react-icons/fa6"; // ✅ works fine

export default function ExtraStorage() {
    const navigate = useNavigate();
    const facts = [
        {
            title: "Flash Memory",
            icon: <FaUsb className="text-yellow-500 text-4xl" />,
            details: [
                "Invented by Toshiba in the 1980s.",
                "Called 'flash' because erasing was as fast as a camera flash.",
                "No moving parts → more durable than hard drives.",
                "Found in USBs, SD cards, smartphones, SSDs.",
            ],
        },
        {
            title: "Floppy Disk",
            icon: <FaFloppyDisk className="text-blue-500 text-4xl" />,
            details: [
                "💾 The Save icon comes from it!",
                "Used widely in the 70s–90s for software and files.",
                "Storage: just 1.44 MB (smaller than a photo today).",
                "NASA used floppies in spacecraft until the 2000s!",
            ],
        },
    ];

    return (
        <div className="p-6 bg-gradient-to-r from-purple-100 to-pink-100 rounded-2xl shadow-xl space-y-6">
            <div className="flex justify-center mb-6">
                <Link
                    to="/parts/prt1"
                    className="inline-flex items-center px-4 py-2 bg-white rounded-full shadow-md border border-gray-200 hover:bg-gray-100 transition"
                >
                    <FaHome className="mr-2 text-lg text-indigo-600" />
                    Home
                </Link>
            </div>
            <h2 className="text-3xl font-bold text-purple-800 text-center">
                📦 Extra Storage: Flash Memory & Floppy Disks
            </h2>

            <motion.div
                className="grid md:grid-cols-2 gap-6"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
            >
                {/* Flash Memory */}
                <motion.div
                    whileHover={{ scale: 1.05 }}   // ✅ only scale now
                    className="bg-white rounded-xl p-5 shadow-lg border-2 border-yellow-300"
                >
                    <FaUsb className="text-yellow-500 text-5xl mx-auto mb-3" />
                    <h3 className="text-xl font-semibold text-center">Flash Memory</h3>
                    <p className="text-gray-600 text-center mt-2">
                        Modern, fast, and used everywhere: phones, USBs, SD cards.
                    </p>
                    <p className="text-green-600 text-sm text-center mt-1">
                        ✅ Pros: Fast, reliable, portable <br /> ❌ Cons: Costlier per GB
                    </p>
                </motion.div>

                {/* Floppy Disk */}
                <motion.div
                    whileHover={{ scale: 1.05 }}   // ✅ same subtle hover effect
                    className="bg-white rounded-xl p-5 shadow-lg border-2 border-blue-300"
                >
                    <FaFloppyDisk className="text-blue-500 text-5xl mx-auto mb-3" />
                    <h3 className="text-xl font-semibold text-center">Floppy Disk</h3>
                    <p className="text-gray-600 text-center mt-2">
                        Old-school storage, once the king, now just a memory.
                    </p>
                    <p className="text-red-600 text-sm text-center mt-1">
                        ✅ Pros: Portable, iconic <br /> ❌ Cons: Very low capacity
                    </p>
                </motion.div>
            </motion.div>

            {/* 💡 Interesting Facts Section */}
            <motion.div
                className="bg-purple-200 p-5 rounded-xl shadow-md mt-8"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 1 }}
            >
                <h3 className="text-2xl font-bold text-purple-900 flex items-center gap-2">
                    💡 Interesting Facts
                </h3>
                <div className="grid md:grid-cols-2 gap-4 mt-4">
                    {facts.map((fact, index) => (
                        <motion.div
                            key={index}
                            whileHover={{ scale: 1.05 }}
                            className="bg-white p-4 rounded-lg shadow-md border border-gray-200"
                        >
                            <div className="flex items-center gap-3 mb-2">
                                {fact.icon}
                                <h4 className="font-semibold text-lg">{fact.title}</h4>
                            </div>
                            <ul className="list-disc list-inside text-gray-700 space-y-1">
                                {fact.details.map((d, i) => (
                                    <li key={i}>{d}</li>
                                ))}
                            </ul>
                        </motion.div>
                    ))}
                </div>
            </motion.div>
            <div className="w-full flex justify-between items-center mt-10 p-4 bg-gray-100 rounded-lg shadow-md">
                <button
                    onClick={() => navigate('/part1/chapters/tertriaryStorage')}
                    className="flex items-center gap-2 px-4 py-2 bg-purple-200 hover:bg-purple-300 text-purple-900 rounded-lg shadow transition"
                >
                    <FaArrowLeft />
                    Previous
                </button>

                <button
                    onClick={() => navigate('/part1/chapters/ramVsRom')}
                    className="flex items-center gap-2 px-4 py-2 bg-green-200 hover:bg-green-300 text-green-900 rounded-lg shadow transition"
                >
                    Next
                    <FaArrowRight />
                </button>
            </div>
        </div>
    );
}
