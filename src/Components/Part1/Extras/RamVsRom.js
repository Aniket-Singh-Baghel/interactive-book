import React, { useRef, useState, useEffect } from "react";
import { gsap } from "gsap";
import { FaArrowLeft, FaArrowRight, FaHome } from "react-icons/fa";
import { useNavigate, Link } from "react-router-dom";
import { useGSAP } from "@gsap/react";
import { Flip } from "gsap/Flip";

gsap.registerPlugin(Flip);

// Hindi translations are generated using an online translator.
const content = {
    en: {
        home: "Home",
        title: "📖 What in the World is ROM? 🤔",
        intro1: "Imagine you just bought a new video game console. You plug it in, press the power button, and the console's logo pops up, a little loading animation appears, and the main menu loads — all without inserting a game!",
        intro2: "That's the magic of <strong>ROM (Read-Only Memory)</strong>. Think of it as a rulebook permanently glued to your computer's brain. This rulebook has essential instructions for the computer to wake up, find its operating system, and get ready to work. You can't erase it, rewrite it, or delete it accidentally. It's set in stone by the manufacturer!",
        romCharacterTitle: "😄 Gary the Groundskeeper (ROM)",
        romCharacterDescription: "Gary is grumpy but reliable. He knows how to open doors, turn on lights, and start the office. His instructions are written in stone — he never forgets!",
        romCharacterAnalogy: "Analogy: The permanent rulebook.",
        ramCharacterTitle: "🧠 Timmy the Temp (RAM)",
        ramCharacterDescription: "Timmy is energetic and fast. He holds all the documents the boss (CPU) is working on right now. When the day ends, everything is cleared!",
        ramCharacterAnalogy: "Analogy: The active workbench.",
        tableFeature: "Feature",
        tableRam: "RAM (Timmy)",
        tableRom: "ROM (Gary)",
        tableJobRole: "Job Role",
        tableJobRoleRam: "The fast, temporary worker",
        tableJobRoleRom: "The permanent start-up specialist",
        tableMemoryType: "Memory Type",
        tableMemoryTypeRam: "Volatile. Forgets everything when off",
        tableMemoryTypeRom: "Non-Volatile. Remembers forever",
        tableSpeed: "Speed",
        tableSpeedRam: "Extremely fast, right next to CPU",
        tableSpeedRom: "Very fast but only for start-up instructions",
        tableDataUsage: "Data Usage",
        tableDataUsageRam: "Holds programs & data currently in use",
        tableDataUsageRom: "Holds essential start-up instructions",
        tableSize: "Size",
        tableSizeRam: "Usually larger (8 GB, 16 GB)",
        tableSizeRom: "Very small (a few MB)",
        tableAnalogy: "Analogy",
        tableAnalogyRam: "The active workbench",
        tableAnalogyRom: "The permanent rulebook",
        outro: "The bottom line: You need Gary (ROM) to get the office running every morning, and you need Timmy (RAM) to do the actual work throughout the day. Without Gary, the office can't even open. Without Timmy, no work gets done!",
        previous: "Previous",
        next: "Next"
    },
    hi: {
        home: "होम",
        title: "📖 ROM क्या है? 🤔",
        intro1: "कल्पना कीजिए कि आपने अभी-अभी एक नया वीडियो गेम कंसोल खरीदा है। आप इसे प्लग इन करते हैं, पावर बटन दबाते हैं, और कंसोल का लोगो दिखाई देता है, एक छोटा लोडिंग एनीमेशन दिखाई देता है, और मुख्य मेनू लोड होता है - सब कुछ बिना गेम डाले!",
        intro2: "यह <strong>ROM (रीड-ओनली मेमोरी)</strong> का जादू है। इसे अपने कंप्यूटर के मस्तिष्क से स्थायी रूप से चिपकी हुई एक नियम पुस्तिका के रूप में सोचें। इस नियम पुस्तिका में कंप्यूटर को जगाने, उसके ऑपरेटिंग सिस्टम को खोजने और काम के लिए तैयार होने के लिए आवश्यक निर्देश हैं। आप इसे गलती से मिटा, फिर से लिख या हटा नहीं सकते। यह निर्माता द्वारा पत्थर की लकीर है!",
        romCharacterTitle: "😄 गैरी द ग्राउंड्सकीपर (ROM)",
        romCharacterDescription: "गैरी गुस्सैल लेकिन भरोसेमंद है। वह जानता है कि दरवाजे कैसे खोलें, बत्तियाँ कैसे चालू करें और कार्यालय कैसे शुरू करें। उसके निर्देश पत्थर में लिखे हैं - वह कभी नहीं भूलता!",
        romCharacterAnalogy: "सादृश्य: स्थायी नियम पुस्तिका।",
        ramCharacterTitle: "🧠 टिम्मी द टेम्प (RAM)",
        ramCharacterDescription: "टिम्मी ऊर्जावान और तेज है। उसके पास वे सभी दस्तावेज़ हैं जिन पर बॉस (सीपीयू) अभी काम कर रहा है। जब दिन समाप्त होता है, तो सब कुछ साफ़ हो जाता है!",
        ramCharacterAnalogy: "सादृश्य: सक्रिय कार्यक्षेत्र।",
        tableFeature: "विशेषता",
        tableRam: "रैम (टिम्मी)",
        tableRom: "रोम (गैरी)",
        tableJobRole: "कार्य भूमिका",
        tableJobRoleRam: "तेज, अस्थायी कार्यकर्ता",
        tableJobRoleRom: "स्थायी स्टार्ट-अप विशेषज्ञ",
        tableMemoryType: "मेमोरी प्रकार",
        tableMemoryTypeRam: "अस्थिर। बंद होने पर सब कुछ भूल जाता है",
        tableMemoryTypeRom: "गैर-अस्थिर। हमेशा याद रखता है",
        tableSpeed: "गति",
        tableSpeedRam: "अत्यंत तेज, सीपीयू के ठीक बगल में",
        tableSpeedRom: "बहुत तेज लेकिन केवल स्टार्ट-अप निर्देशों के लिए",
        tableDataUsage: "डेटा उपयोग",
        tableDataUsageRam: "वर्तमान में उपयोग में आने वाले प्रोग्राम और डेटा रखता है",
        tableDataUsageRom: "आवश्यक स्टार्ट-अप निर्देश रखता है",
        tableSize: "आकार",
        tableSizeRam: "आमतौर पर बड़ा (8 जीबी, 16 जीबी)",
        tableSizeRom: "बहुत छोटा (कुछ एमबी)",
        tableAnalogy: "सादृश्य",
        tableAnalogyRam: "सक्रिय कार्यक्षेत्र",
        tableAnalogyRom: "स्थायी नियम पुस्तिका",
        outro: "निष्कर्ष: आपको हर सुबह कार्यालय चलाने के लिए गैरी (ROM) की आवश्यकता है, और आपको दिन भर वास्तविक काम करने के लिए टिम्मी (RAM) की आवश्यकता है। गैरी के बिना, कार्यालय खुल भी नहीं सकता। टिम्मी के बिना, कोई काम नहीं होता!",
        previous: "पिछला",
        next: "अगला"
    }
};

const RAM_ROM_Component = () => {
    const [language, setLang] = useState('en');
    const navigate = useNavigate();
    const container = useRef(null);
    const introRef = useRef(null);
    const charactersRef = useRef(null);
    const tableRef = useRef(null);
    const outroRef = useRef(null);

    useEffect(() => {
        const handleKeyDown = (event) => {
            if (event.ctrlKey && event.key === 'k') {
                event.preventDefault();
                setLang(prevLang => prevLang === 'en' ? 'hi' : 'en');
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, []);

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
            className="min-h-screen bg-gray-50 py-8 sm:py-12 px-4 sm:px-6 lg:px-8 flex flex-col items-center font-sans"
        >
            <div className="w-full max-w-5xl flex justify-between items-center mb-6 px-4">
                <Link
                    to="/parts/prt1"
                    className="inline-flex items-center px-4 py-2 bg-white rounded-full shadow-md border border-gray-200 hover:bg-gray-100 transition"
                >
                    <FaHome className="mr-2 text-lg text-indigo-600 animate-bounce" />
                    {content[language].home}
                </Link>
                <div className="flex space-x-2">
                    <button
                        onClick={() => setLang('en')}
                        className={`px-3 py-1 text-sm font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${language === 'en' ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-700'
                            }`}
                    >
                        EN
                    </button>
                    <button
                        onClick={() => setLang('hi')}
                        className={`px-3 py-1 text-sm font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 ${language === 'hi' ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-700'
                            }`}
                    >
                        HI
                    </button>
                </div>
            </div>
            {/* Intro Section */}
            <div
                ref={introRef}
                className="bg-white shadow-xl rounded-xl p-6 md:p-8 max-w-4xl mb-10 w-full"
            >
                <h1 className="text-3xl sm:text-4xl font-bold text-indigo-700 mb-4 flex items-center gap-3" dangerouslySetInnerHTML={{ __html: content[language].title }}>
                </h1>
                <p className="text-gray-700 text-base sm:text-lg mb-3" dangerouslySetInnerHTML={{ __html: content[language].intro1 }}>
                </p>
                <p className="text-gray-700 text-base sm:text-lg" dangerouslySetInnerHTML={{ __html: content[language].intro2 }}>
                </p>
            </div>

            {/* Characters Section */}
            <div
                ref={charactersRef}
                className="flex flex-col md:flex-row gap-6 md:gap-8 mb-10 max-w-5xl w-full"
            >
                {/* ROM Character */}
                <div className="bg-yellow-100 rounded-xl shadow-lg p-6 flex-1 cursor-pointer hover:scale-105 transition-transform duration-300">
                    <h2 className="text-xl sm:text-2xl font-bold mb-3 flex items-center gap-2 text-gray-800" dangerouslySetInnerHTML={{ __html: content[language].romCharacterTitle }}>
                    </h2>
                    <p className="text-gray-800 mb-2 text-base sm:text-lg" dangerouslySetInnerHTML={{ __html: content[language].romCharacterDescription }}>
                    </p>
                    <p className="italic text-gray-800" dangerouslySetInnerHTML={{ __html: content[language].romCharacterAnalogy }}></p>
                </div>

                {/* RAM Character */}
                <div className="bg-blue-100 rounded-xl shadow-lg p-6 flex-1 cursor-pointer hover:scale-105 transition-transform duration-300">
                    <h2 className="text-xl sm:text-2xl font-bold mb-3 flex items-center gap-2 text-gray-800" dangerouslySetInnerHTML={{ __html: content[language].ramCharacterTitle }}>
                    </h2>
                    <p className="text-gray-800 mb-2 text-base sm:text-lg" dangerouslySetInnerHTML={{ __html: content[language].ramCharacterDescription }}>
                    </p>
                    <p className="italic text-gray-800" dangerouslySetInnerHTML={{ __html: content[language].ramCharacterAnalogy }}></p>
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
                            <th className="px-2 py-2 sm:px-4 sm:py-3 text-left text-sm sm:text-base font-semibold text-gray-800">{content[language].tableFeature}</th>
                            <th className="px-2 py-2 sm:px-4 sm:py-3 text-left text-sm sm:text-base font-semibold text-gray-800">{content[language].tableRam}</th>
                            <th className="px-2 py-2 sm:px-4 sm:py-3 text-left text-sm sm:text-base font-semibold text-gray-800">{content[language].tableRom}</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        <tr className="hover:bg-gray-50 transition-colors">
                            <td className="px-2 py-2 sm:px-4 sm:py-3 font-semibold text-sm sm:text-base text-gray-800">{content[language].tableJobRole}</td>
                            <td className="px-2 py-2 sm:px-4 sm:py-3 text-sm sm:text-base text-gray-800">
                                {content[language].tableJobRoleRam}
                            </td>
                            <td className="px-2 py-2 sm:px-4 sm:py-3 text-sm sm:text-base text-gray-800">
                                {content[language].tableJobRoleRom}
                            </td>
                        </tr>
                        <tr className="hover:bg-gray-50 transition-colors">
                            <td className="px-2 py-2 sm:px-4 sm:py-3 font-semibold text-sm sm:text-base text-gray-800">
                                {content[language].tableMemoryType}
                            </td>
                            <td className="px-2 py-2 sm:px-4 sm:py-3 text-sm sm:text-base text-gray-800">
                                {content[language].tableMemoryTypeRam}
                            </td>
                            <td className="px-2 py-2 sm:px-4 sm:py-3 text-sm sm:text-base text-gray-800">
                                {content[language].tableMemoryTypeRom}
                            </td>
                        </tr>
                        <tr className="hover:bg-gray-50 transition-colors">
                            <td className="px-2 py-2 sm:px-4 sm:py-3 font-semibold text-sm sm:text-base text-gray-800">{content[language].tableSpeed}</td>
                            <td className="px-2 py-2 sm:px-4 sm:py-3 text-sm sm:text-base text-gray-800">
                                {content[language].tableSpeedRam}
                            </td>
                            <td className="px-2 py-2 sm:px-4 sm:py-3 text-sm sm:text-base text-gray-800">
                                {content[language].tableSpeedRom}
                            </td>
                        </tr>
                        <tr className="hover:bg-gray-50 transition-colors">
                            <td className="px-2 py-2 sm:px-4 sm:py-3 font-semibold text-sm sm:text-base text-gray-800">
                                {content[language].tableDataUsage}
                            </td>
                            <td className="px-2 py-2 sm:px-4 sm:py-3 text-sm sm:text-base text-gray-800">
                                {content[language].tableDataUsageRam}
                            </td>
                            <td className="px-2 py-2 sm:px-4 sm:py-3 text-sm sm:text-base text-gray-800">
                                {content[language].tableDataUsageRom}
                            </td>
                        </tr>
                        <tr className="hover:bg-gray-50 transition-colors">
                            <td className="px-2 py-2 sm:px-4 sm:py-3 font-semibold text-sm sm:text-base text-gray-800">{content[language].tableSize}</td>
                            <td className="px-2 py-2 sm:px-4 sm:py-3 text-sm sm:text-base text-gray-800">
                                {content[language].tableSizeRam}
                            </td>
                            <td className="px-2 py-2 sm:px-4 sm:py-3 text-sm sm:text-base text-gray-800">{content[language].tableSizeRom}</td>
                        </tr>
                        <tr className="hover:bg-gray-50 transition-colors">
                            <td className="px-2 py-2 sm:px-4 sm:py-3 font-semibold text-sm sm:text-base text-gray-800">{content[language].tableAnalogy}</td>
                            <td className="px-2 py-2 sm:px-4 sm:py-3 text-sm sm:text-base text-gray-800">
                                {content[language].tableAnalogyRam}
                            </td>
                            <td className="px-2 py-2 sm:px-4 sm:py-3 text-sm sm:text-base text-gray-800">
                                {content[language].tableAnalogyRom}
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <p ref={outroRef} className="mt-8 max-w-4xl text-gray-800 text-center text-base sm:text-lg" dangerouslySetInnerHTML={{ __html: content[language].outro }}>
            </p>
            <div className="w-full max-w-5xl flex justify-between items-center mt-10 p-4 bg-gray-100 rounded-lg shadow-md">
                <button
                    onClick={() => navigate('/part1/other-storage-types')}
                    className="flex items-center gap-2 px-3 py-2 sm:px-4 text-sm sm:text-base bg-purple-200 hover:bg-purple-300 text-purple-900 rounded-lg shadow transition"
                >
                    <FaArrowLeft />
                    {content[language].previous}
                </button>

                <button
                    onClick={() => navigate('/part1/memory-comparison')}
                    className="flex items-center gap-2 px-3 py-2 sm:px-4 text-sm sm:text-base bg-green-200 hover:bg-green-300 text-green-900 rounded-lg shadow transition"
                >
                    {content[language].next}
                    <FaArrowRight />
                </button>
            </div>
        </div>
    );
};

export default RAM_ROM_Component;