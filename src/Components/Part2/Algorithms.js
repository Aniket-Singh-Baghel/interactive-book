import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FaHome } from "react-icons/fa";

export default function AlgorithmComponent() {
    const [lang, setLang] = useState("en");
    const [active, setActive] = useState(0);
    const [floatPlay, setFloatPlay] = useState(true);

    // --- CONTENT UPDATE START ---
    // The stages object is updated, especially for stage 1, to include rich content.
    const stages = {
        en: {
            stages: {
                1: {
                    title: "What's an Algorithm? Your Step-by-Step Guide!",
                    analogy: "Think of it like a recipe or a LEGO instruction booklet.",
                    details: [
                        {
                            subtitle: "The Big Idea: Everything is a Set of Instructions!",
                            text: "Every day, without even realizing it, you use algorithms to get things done. It might sound technical, but it's true. For example, when you decide to make a simple bowl of cereal, your brain automatically follows a sequence of steps. You get a bowl, pour the cereal, then add milk. That entire series of steps—first this, then that, then the next thing—is an algorithm. It's simply a clear, ordered way to complete a task. This applies to everything, from tying your shoelaces to following directions to a friend's house; there's a hidden algorithm for almost every task you perform.",
                        },
                        {
                            subtitle: "The Actual Definition",
                            text: "Technically, an **Algorithm** is a finite set of clear, ordered rules and instructions designed to perform a specific task or solve a problem.\n\n* **Finite:** It must have a clear end; it can't go on forever.\n* **Well-defined:** Each instruction must be crystal clear, with only one possible meaning.\n* **Ordered:** The steps must be performed in the correct sequence for it to work.",
                            highlight: true,
                        },
                        {
                            subtitle: "Why Do Algorithms Matter? (The Real-World Impact)",
                            text: "Algorithms are the **backbone** of modern technology. Without them, your smartphone or computer would be useless.\n\n* **1. Computers Aren't 'Smart':** They are incredibly fast, but they need precise, step-by-step instructions for every single task. Those instructions are algorithms.\n* **2. They Find the Best Solution:** Google Maps uses a powerful algorithm to analyze millions of possibilities and find the absolute fastest route for you, saving you time and fuel.\n* **3. They Ensure Reliable Results:** An ATM or a calculator follows a strict algorithm to ensure it gives the correct output every single time, without fail.\n\nIn short, algorithms turn our fast but 'unthinking' computers into the useful, efficient, and reliable tools we use every day.",
                        },
                        {
                            subtitle: "Mini-Algorithms in Your Daily Life",
                            text: "You use dozens of them without thinking! \n\n**Getting Ready for School:**\n1. Wake up.\n2. Brush your teeth.\n3. Get dressed.\n4. Eat breakfast.\n5. Pack your bag. \n(Goal: Be ready for school on time!)\n\n**Making Tea:**\n1. Boil water.\n2. Place a tea bag in a mug.\n3. Pour the hot water into the mug.\n4. Let it steep for 3 minutes.\n5. Remove the tea bag and add sugar or milk if desired.\n(Goal: A perfect cup of tea!)",
                        },
                    ],
                },
                2: {
                    title: "Rules of a Good Algorithm",
                    analogy: "Clear, ordered, and must end.",
                    description: "Every step must be clear, in order, and finish with an answer.",
                },
                3: {
                    title: "Daily Life Examples",
                    analogy: "Brushing teeth, traffic lights.",
                    description: "We follow small algorithms daily like brushing teeth.",
                },
                4: {
                    title: "How Computers Use Algorithms",
                    analogy: "Sorting, searching, recommendations.",
                    description: "Computers use algorithms to find, sort, and suggest videos or data.",
                },
                5: {
                    title: "Full Component Demo",
                    analogy: "See everything combined.",
                    description: "This stage shows the complete component design with clouds, multilingual support, stage colors, and interactive buttons.",
                },
                6: {
                    title: "Algorithm vs. SDLC: The LEGO Project",
                    analogy: "Compare Algorithm steps with full SDLC LEGO cycle.",
                    description: "Custom layout with Algorithm (booklet) and SDLC (full project) using inline SVGs and Tailwind.",
                    custom: true,
                },
            },
        },
        hi: {
            stages: {
                1: {
                    title: "Algorithm क्या है? आपका स्टेप-बाय-स्टेप गाइड!",
                    analogy: "इसे एक रेसिपी या LEGO इंस्ट्रक्शन बुकलेट की तरह सोचें।",
                    details: [
                        {
                            subtitle: "मूल विचार: हर चीज़ के लिए निर्देश!",
                            text: "हर दिन, जब हम कोई भी काम करते हैं, तो हम अनजाने में ही Algorithm का इस्तेमाल कर रहे होते हैं। यह सोचने में थोड़ा अजीब लग सकता है, लेकिन यह सच है। उदाहरण के लिए, जब आपको सुबह भूख लगती है और आप एक साधारण सैंडविच बनाने का फैसला करते हैं, तो आपका दिमाग अपने आप कुछ कदम उठाता है। आप पहले ब्रेड के दो स्लाइस निकालते हैं, फिर आप उन पर मक्खन या चटनी लगाते हैं, फिर अपनी पसंदीदा सब्ज़ियाँ रखते हैं, और अंत में दोनों स्लाइस को एक साथ जोड़ देते हैं। कदमों की यह पूरी श्रृंखला—पहला कदम, दूसरा कदम, तीसरा कदम—यही एक Algorithm है। यह किसी काम को पूरा करने का एक स्पष्ट और क्रमबद्ध तरीका है। यह सिर्फ सैंडविच बनाने तक ही सीमित नहीं है; जूते के फीते बांधने से लेकर अपनी स्कूल की किताबों को बैग में लगाने तक, हर काम में एक छिपा हुआ Algorithms होता है।",
                        },
                        {
                            subtitle: "वास्तविक परिभाषा (Actual Definition)",
                            text: "तकनीकी रूप से, **एल्गोरिदम** किसी विशेष कार्य को पूरा करने या किसी समस्या को हल करने के लिए बनाए गए **नियमों और निर्देशों का एक सीमित, स्पष्ट और क्रमबद्ध समूह** है।\n\n* **सीमित (Finite):** इसके स्टेप्स गिने-चुने होते हैं और यह हमेशा एक अंत पर पहुँचता है।\n* **स्पष्ट (Well-defined):** हर निर्देश का केवल एक ही मतलब होता है, ताकि कोई भ्रम न हो।\n* **क्रमबद्ध (Ordered):** हर निर्देश एक खास क्रम में होता है, और उस क्रम का पालन करना ज़रूरी है।",
                            highlight: true,
                        },
                        {
                            subtitle: "Algorithms क्यों महत्वपूर्ण हैं?",
                            text: "एल्गोरिदम आधुनिक तकनीक की **बुनियाद** है। इसके बिना, आपका स्मार्टफोन या कंप्यूटर काम ही नहीं कर सकता। \n" +
                                "1. कंप्यूटर 'स्मार्ट' नहीं होते: वे बस तेज़ होते हैं और उन्हें हर काम के लिए सटीक, स्टेप-बाय-स्टेप निर्देशों की ज़रूरत होती है। ये निर्देश ही एल्गोरिदम हैं। \n" +
                                "2. यह सबसे अच्छा तरीका ढूंढता है: Google Maps एक बेहतरीन एल्गोरिदम का उपयोग करके लाखों संभावनाओं में से सबसे तेज़ रास्ता ढूंढता है, जिससे आपका समय बचता है।\n" +
                                "3. भरोसेमंद परिणाम: ATM या कैलकुलेटर एक सटीक एल्गोरिदम पर चलते हैं, इसलिए वे हर बार एक जैसा और सही परिणाम देते हैं। \n" +
                                "संक्षेप में, एल्गोरिदम हमारे तेज़ लेकिन 'नासमझ' कंप्यूटरों को निर्देश देकर उन्हें उपयोगी, कुशल और भरोसेमंद बनाते हैं।",
                        },
                        {
                            subtitle: "रोज़मर्रा की ज़िंदगी में मिनी-एल्गोरिदम",
                            text: "आप बिना सोचे-समझे ही दर्जनों का इस्तेमाल करते हैं!\n\n" +
                                "स्कूल के लिए तैयार होना:\n" +
                                "1. जागो।\n" +
                                "2. अपने दाँत ब्रश करो।\n" +
                                "3. कपड़े पहनो।\n" +
                                "4. नाश्ता करो।\n" +
                                "5. अपना बैग पैक करो।\n" +
                                "(लक्ष्य: समय पर स्कूल के लिए तैयार होना!)\n\n" +
                                "चाय बनाना:\n" +
                                "1. पानी उबालो।\n" +
                                "2. एक कप में टी बैग रखो।\n" +
                                "3. कप में गर्म पानी डालो।\n" +
                                "4. इसे 3 मिनट के लिए कप में रहने दो।\n" +
                                "5. टी बैग निकालो और इच्छानुसार चीनी या दूध मिलाओ।\n" +
                                "(लक्ष्य: एक बढ़िया कप चाय!)"
                        }
                    ],
                },
                2: {
                    title: "एक अच्छे एल्गोरिथ्म के नियम",
                    analogy: "साफ़, क्रम में और अंत होना चाहिए।",
                    description: "हर कदम साफ़ होना चाहिए, क्रम में और अंत में उत्तर मिलना चाहिए।",
                },
                3: {
                    title: "दैनिक जीवन के उदाहरण",
                    analogy: "दांत साफ़ करना, ट्रैफिक लाइट्स।",
                    description: "हम रोज़ छोटे एल्गोरिथ्म अपनाते हैं जैसे दांत साफ़ करना।",
                },
                4: {
                    title: "कंप्यूटर एल्गोरिथ्म कैसे इस्तेमाल करते हैं",
                    analogy: "सॉर्टिंग, खोज, सुझाव।",
                    description: "कंप्यूटर एल्गोरिथ्म से चीज़ें ढूँढते, सजाते और सुझाव देते हैं।",
                },
                5: {
                    title: "पूरा कॉम्पोनेंट डेमो",
                    analogy: "सब कुछ एक साथ देखें।",
                    description: "यह चरण पूरे कॉम्पोनेंट डिज़ाइन को दिखाता है जिसमें बादल, बहुभाषी समर्थन, रंगीन चरण और इंटरैक्टिव बटन शामिल हैं।",
                },
                6: {
                    title: "एल्गोरिथ्म बनाम SDLC: LEGO परियोजना",
                    analogy: "एल्गोरिथ्म के चरणों की तुलना पूरे SDLC LEGO चक्र से करें।",
                    description: "इंलाइन SVG और Tailwind का उपयोग करके एल्गोरिथ्म (बुकलेट) और SDLC (पूरा प्रोजेक्ट) के साथ कस्टम लेआउट।",
                    custom: true,
                },
            },
        },
    };
    // --- CONTENT UPDATE END ---

    const stageColors = {
        1: "from-sky-100 to-sky-300",
        2: "from-pink-100 to-pink-300",
        3: "from-green-100 to-green-300",
        4: "from-violet-100 to-violet-300",
        5: "from-yellow-100 to-yellow-300",
        6: "from-indigo-100 to-indigo-300",
    };

    const currentStage = stages[lang].stages[active + 1];
    const t = (key) => currentStage?.[key] || stages.en.stages[active + 1]?.[key];

    useEffect(() => {
        if (active < 0) setActive(0);
        const totalStages = Object.keys(stages.en.stages).length;
        if (active >= totalStages) setActive(totalStages - 1);
    }, [active, stages.en.stages]);

    return (
        <div className="w-full min-h-screen flex items-center justify-center py-12 px-4 bg-gradient-to-br from-sky-50 via-violet-50 to-pink-50">
            <div className="relative max-w-5xl w-full mx-auto">
                <FloatingClouds play={floatPlay} />

                <div className={`relative bg-gradient-to-br ${stageColors[active + 1]} rounded-3xl shadow-2xl overflow-hidden p-6 md:p-10`}>
                    <Header lang={lang} setLang={setLang} currentContent={stages[lang]?.home || stages.en.home} />

                    <div>
                        <h1 className="text-2xl md:text-4xl font-extrabold text-slate-800 drop-shadow-lg">{t("title")}</h1>
                        <p className="mt-2 text-sm md:text-base text-slate-700">{t("analogy")}</p>
                    </div>

                    {/* --- RENDER LOGIC UPDATE START --- */}
                    {currentStage?.custom ? (
                        <LEGOStage lang={lang} />
                    ) : (
                        <div className="mt-6 bg-white/80 rounded-xl p-4 md:p-6 text-slate-800 shadow space-y-4">
                            {currentStage?.details ? (
                                currentStage.details.map((item, index) =>
                                    // Check if the highlight flag is true
                                    item.highlight ? (
                                        <motion.div
                                            key={index}
                                            className="bg-sky-50 border-l-4 border-sky-500 p-4 my-6 rounded-r-lg shadow-inner"
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ duration: 0.5, ease: "easeOut" }}
                                        >
                                            <h3 className="font-bold text-lg text-sky-800">{item.subtitle} 💡</h3>
                                            <p style={{ whiteSpace: 'pre-line' }} className="mt-2 text-sky-700">
                                                {item.text}
                                            </p>
                                        </motion.div>
                                    ) : (
                                        // Otherwise, render the normal content
                                        <div key={index}>
                                            <h3 className="font-semibold text-lg text-slate-800">{item.subtitle}</h3>
                                            <p style={{ whiteSpace: 'pre-line' }} className="mt-1 text-slate-700">
                                                {item.text}
                                            </p>
                                        </div>
                                    )
                                )
                            ) : (
                                <p>{t("description")}</p>
                            )}
                        </div>
                    )}
                    {/* --- RENDER LOGIC UPDATE END --- */}

                    <div className="mt-8 flex flex-wrap gap-2">
                        {Object.keys(stages.en.stages).map((key, i) => (
                            <button
                                key={i}
                                onClick={() => setActive(i)}
                                className={`px-4 py-2 rounded-full text-sm font-semibold transition ${active === i
                                    ? "bg-slate-800 text-white shadow-md"
                                    : "bg-white/80 text-slate-700 border border-gray-200 hover:bg-gray-100"
                                    }`}
                            >
                                {stages[lang].stages[key].title}
                            </button>
                        ))}
                    </div>

                    <div className="mt-6">
                        <button
                            onClick={() => setFloatPlay((s) => !s)}
                            className="px-3 py-1 text-xs rounded-lg bg-white/60 border border-gray-300 text-slate-700 hover:bg-white"
                        >
                            {floatPlay ? (lang === "en" ? "Clouds: On" : "बादल: चालू") : (lang === "en" ? "Clouds: Off" : "बादल: बंद")}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

// The rest of the components remain unchanged as they are functional.
function FloatingClouds({ play = true }) {
    return (
        <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
            {[...Array(5)].map((_, i) => (
                <motion.div
                    key={i}
                    initial={{ opacity: 0, y: -50 }}
                    animate={play ? { opacity: [0, 0.3, 0.6, 0.3], y: [-50, 0, -30, -50] } : { opacity: 0, y: -50 }}
                    transition={{ repeat: Infinity, duration: 20 + i * 5, ease: "easeInOut" }}
                    className="absolute w-48 h-24 bg-white/70 rounded-full blur-2xl top-0 left-0"
                    style={{ left: `${i * 20}%` }}
                />
            ))}
        </div>
    );
}

function Header({ lang, setLang, currentContent }) {
    return (
        <div className="flex items-center justify-between mb-6">
            <Link
                to="/parts/prt2"
                className="inline-flex items-center px-4 py-2 bg-white rounded-full shadow-md border border-gray-200 hover:bg-gray-100 transition"
            >
                <motion.div
                    className="mr-2"
                    animate={{ y: [0, -5, 0] }}
                    transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
                >
                    <FaHome className="text-lg text-sky-600" />
                </motion.div>
                {currentContent}
            </Link>

            <div className="flex space-x-2">
                <button
                    onClick={() => setLang("en")}
                    className={`px-3 py-1 rounded-lg border font-semibold ${lang === "en"
                        ? "bg-sky-600 text-white border-sky-600"
                        : "bg-white text-gray-700 border-gray-300"
                        } transition`}
                >
                    EN
                </button>
                <button
                    onClick={() => setLang("hi")}
                    className={`px-3 py-1 rounded-lg border font-semibold ${lang === "hi"
                        ? "bg-sky-600 text-white border-sky-600"
                        : "bg-white text-gray-700 border-gray-300"
                        } transition`}
                >
                    हिं
                </button>
            </div>
        </div>
    );
}

function LEGOStage({ lang }) {
    return (
        <div className="mt-6 bg-white/90 rounded-xl p-4 md:p-6 shadow space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col items-center justify-center space-y-2">
                    <svg className="w-32 h-32" viewBox="0 0 100 100">
                        <rect x="10" y="10" width="80" height="80" fill="#fbbf24" rx="5" />
                        <text x="50%" y="50%" dominantBaseline="middle" textAnchor="middle" fill="#1e3a8a" fontSize="10">Instruction Booklet</text>
                    </svg>
                    <p className="text-center text-sm font-semibold text-slate-800">
                        {lang === 'en' ? 'Algorithm: Step-by-step LEGO instructions' : 'एल्गोरिथ्म: क्रमबद्ध LEGO निर्देश'}
                    </p>
                </div>
                <div className="flex flex-col items-center justify-center space-y-2">
                    <svg className="w-48 h-32" viewBox="0 0 200 100">
                        <circle cx="30" cy="50" r="10" fill="#60a5fa" />
                        <circle cx="70" cy="50" r="10" fill="#60a5fa" />
                        <circle cx="110" cy="50" r="10" fill="#60a5fa" />
                        <circle cx="150" cy="50" r="10" fill="#60a5fa" />
                        <circle cx="190" cy="50" r="10" fill="#60a5fa" />
                    </svg>
                    <p className="text-center text-sm font-semibold text-slate-800">
                        {lang === 'en' ? 'SDLC: Full LEGO project cycle' : 'SDLC: पूरा LEGO प्रोजेक्ट चक्र'}
                    </p>
                </div>
            </div>
            <div className="text-center text-sm text-slate-700">
                {lang === 'en'
                    ? 'The Instruction Booklet (Algorithm) is part of the full SDLC LEGO Project!'
                    : 'निर्देश पुस्तिका (एल्गोरिथ्म) पूरे SDLC LEGO प्रोजेक्ट का हिस्सा है!'}
            </div>
        </div>
    );
}