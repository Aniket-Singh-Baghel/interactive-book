import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { FaArrowLeft, FaArrowRight, FaHome } from "react-icons/fa";

// --- SDLC Stages Data ---
const sdlcStages = [
    {
        id: 0,
        name: 'What is SDLC?',
        icon: '📘',
        color: '#16a085',
        description:
            'SDLC stands for Software Development Life Cycle. It is a step-by-step plan to make software. It helps developers know what to do, when to do it, and how to check their work. Following SDLC reduces mistakes and makes sure the software works well for users.',
        analogy: {
            title: 'Analogy: Following a Recipe 🍰',
            text: 'Just like baking a cake, you need a plan. You list ingredients, follow steps, and check if it tastes good. Without a plan, you could forget sugar or burn the cake. SDLC is like a recipe for building software.'
        },
        example:
            'Imagine you want to make a simple quiz app. SDLC helps you plan what the app will do, how it will look, how to build it, test it, and finally share it with friends.'
    },
    {
        id: 1,
        name: 'Planning & Requirement Analysis',
        icon: '🤔',
        color: '#8e44ad',
        description:
            'This is the first step where we decide what the software should do. We talk to people who will use it, think about the features, and figure out if it is possible with the time and tools we have. We make a simple plan for what to build first.',
        analogy: {
            title: 'Analogy: Planning a Party 🎉',
            text: 'Before throwing a party, you decide the number of guests, the food, the games, and the decorations. You make a list so nothing is forgotten. Similarly, in planning, we list all the features the software should have.'
        },
        example:
            'If making a quiz app, planning decides how many questions, how scoring works, and what colors or buttons the app should have.'
    },
    {
        id: 2,
        name: 'Design',
        icon: '🎨',
        color: '#3498db',
        description:
            'In this step, we decide how the software will look and work. We design the screens, buttons, and menus. We also decide how the pieces of the app will work together behind the scenes.',
        analogy: {
            title: 'Analogy: Drawing a Map 🗺️',
            text: 'Before building a maze, you draw a map showing all the paths and dead ends. This helps builders know exactly what to make. In design, we draw a plan for the app’s look and flow.'
        },
        example:
            'For the quiz app, designers create pictures showing where questions appear, how the next button works, and what colors to use.'
    },
    {
        id: 3,
        name: 'Implementation / Development',
        icon: '💻',
        color: '#27ae60',
        description:
            'Now it’s time to write the code! Developers follow the design to create the software. Each part is built carefully, like putting together blocks to make a bigger structure.',
        analogy: {
            title: 'Analogy: Building with Lego 🧱',
            text: 'You follow instructions to build a Lego set, piece by piece. Each piece has its place, and when combined, it becomes the complete model. Coding is similar.'
        },
        example:
            'In the quiz app, developers write code for the questions, scoring, and buttons so the app works correctly.'
    },
    {
        id: 4,
        name: 'Testing',
        icon: '🧪',
        color: '#f1c40f',
        description:
            'We check the software to see if it works properly. We look for mistakes or problems and fix them. Testing ensures the app does what it is supposed to do.',
        analogy: {
            title: 'Analogy: Taste Testing 🍪',
            text: 'After baking cookies, you taste them to see if they are sweet enough or not burnt. You fix problems before sharing with friends. Testing software is like taste testing.'
        },
        example:
            'In the quiz app, testing checks if questions show up correctly, scores count right, and buttons do what they should.'
    },
    {
        id: 5,
        name: 'Deployment',
        icon: '🚀',
        color: '#e67e22',
        description:
            'Once everything works well, we release the software so users can use it. Deployment can be simple or gradual, depending on how many users there are.',
        analogy: {
            title: 'Analogy: Sharing Your Game 🕹️',
            text: 'After creating a board game, you give it to friends to play. Deployment is when the software becomes available for everyone to use.'
        },
        example:
            'The quiz app is uploaded to the app store or website so classmates can try it.'
    },
    {
        id: 6,
        name: 'Maintenance',
        icon: '🛠️',
        color: '#c0392b',
        description:
            'After users start using the software, we keep it running smoothly. We fix any problems, improve features, and update it as needed.',
        analogy: {
            title: 'Analogy: Taking Care of a Garden 🌱',
            text: 'After planting, you water plants, remove weeds, and make changes to help them grow. Maintaining software is similar; you keep it healthy and useful.'
        },
        example:
            'If the quiz app has a bug or a feature request, developers fix it or add new features to make it better for users.'
    }
];
const sdlcStagesHindi = [
    {
        id: 0,
        name: 'SDLC क्या है?',
        icon: '📘',
        color: '#16a085',
        description:
            'SDLC का मतलब Software Development Life Cycle है। यह सॉफ़्टवेयर बनाने की एक step-by-step योजना है। इससे डेवलपर्स को पता चलता है कि क्या करना है, कब करना है और काम की जांच कैसे करनी है। SDLC का पालन करने से गलतियाँ कम होती हैं और सॉफ़्टवेयर उपयोगकर्ताओं के लिए सही ढंग से काम करता है।',
        analogy: {
            title: 'उदाहरण: रेसिपी का पालन करना 🍰',
            text: 'जैसे केक बनाने के लिए योजना बनानी पड़ती है, सामग्री की सूची बनानी होती है, चरणों का पालन करना होता है और टेस्ट करना पड़ता है कि स्वाद सही है या नहीं। SDLC भी सॉफ़्टवेयर बनाने की रेसिपी की तरह है।'
        },
        example:
            'मान लीजिए आप एक क्विज़ ऐप बनाना चाहते हैं। SDLC आपको योजना बनाने में मदद करता है कि ऐप क्या करेगा, कैसा दिखेगा, कैसे बनाया जाएगा, टेस्ट कैसे किया जाएगा और अंत में दोस्तों के साथ साझा कैसे किया जाएगा।'
    },
    {
        id: 1,
        name: 'योजना और आवश्यकता विश्लेषण',
        icon: '🤔',
        color: '#8e44ad',
        description:
            'यह पहला चरण है जिसमें हम तय करते हैं कि सॉफ़्टवेयर क्या करेगा। हम उपयोगकर्ताओं से बात करते हैं, फीचर्स सोचते हैं और तय करते हैं कि क्या समय और उपकरणों के साथ इसे करना संभव है। हम तय करते हैं कि पहले क्या बनाना है।',
        analogy: {
            title: 'उदाहरण: पार्टी की योजना बनाना 🎉',
            text: 'पार्टी करने से पहले, आप तय करते हैं कि कितने मेहमान आएंगे, खाना क्या होगा, खेल और सजावट कैसी होगी। इसी तरह, सॉफ़्टवेयर के लिए भी सभी फीचर्स की योजना बनाई जाती है।'
        },
        example:
            'अगर आप क्विज़ ऐप बना रहे हैं, तो योजना तय करती है कि कितने प्रश्न होंगे, स्कोर कैसे होगा, ऐप के रंग और बटन कैसे दिखेंगे।'
    },
    {
        id: 2,
        name: 'डिज़ाइन',
        icon: '🎨',
        color: '#3498db',
        description:
            'इस चरण में हम तय करते हैं कि सॉफ़्टवेयर कैसा दिखेगा और काम करेगा। स्क्रीन, बटन, मेनू डिज़ाइन किए जाते हैं। यह भी तय किया जाता है कि ऐप के हिस्से पीछे से कैसे काम करेंगे।',
        analogy: {
            title: 'उदाहरण: नक्शा बनाना 🗺️',
            text: 'भूलेभटके को बनाने से पहले आप उसका नक्शा बनाते हैं जिसमें रास्ते और डेड-एंड दिखाए जाते हैं। डिज़ाइन में हम ऐप की रूपरेखा और फ्लो बनाते हैं।'
        },
        example:
            'क्विज़ ऐप के लिए, डिज़ाइनर चित्र बनाते हैं कि प्रश्न कहाँ दिखेंगे, अगले बटन का काम कैसे होगा, और रंग कैसे होंगे।'
    },
    {
        id: 3,
        name: 'इम्प्लीमेंटेशन / डेवलपमेंट',
        icon: '💻',
        color: '#27ae60',
        description:
            'अब कोड लिखने का समय है! डेवलपर्स डिज़ाइन का पालन करते हुए सॉफ़्टवेयर बनाते हैं। हर हिस्सा ध्यान से बनाया जाता है, जैसे ब्लॉक्स को जोड़कर बड़ी संरचना बनाना।',
        analogy: {
            title: 'उदाहरण: लेगो से निर्माण 🧱',
            text: 'आप निर्देशों का पालन करके लेगो सेट बनाते हैं, एक-एक टुकड़ा जोड़ते हैं। कोडिंग भी इसी तरह होती है।'
        },
        example:
            'क्विज़ ऐप में, डेवलपर्स प्रश्न, स्कोर और बटन के लिए कोड लिखते हैं ताकि ऐप सही तरीके से काम करे।'
    },
    {
        id: 4,
        name: 'टेस्टिंग',
        icon: '🧪',
        color: '#f1c40f',
        description:
            'हम सॉफ़्टवेयर की जांच करते हैं कि यह सही काम कर रहा है या नहीं। हम गलतियों और समस्याओं को ढूंढते हैं और उन्हें ठीक करते हैं। टेस्टिंग यह सुनिश्चित करती है कि ऐप वैसा ही काम करे जैसा सोचा गया है।',
        analogy: {
            title: 'उदाहरण: टेस्ट करना 🍪',
            text: 'कुकीज़ बेक करने के बाद, आप उन्हें चखते हैं कि क्या स्वाद सही है और जली नहीं हैं। टेस्टिंग सॉफ़्टवेयर के लिए भी ऐसा ही है।'
        },
        example:
            'क्विज़ ऐप में, टेस्टिंग यह सुनिश्चित करती है कि प्रश्न सही दिखें, स्कोर सही गिने जाएं और बटन सही काम करें।'
    },
    {
        id: 5,
        name: 'डिप्लॉयमेंट',
        icon: '🚀',
        color: '#e67e22',
        description:
            'जब सब कुछ सही से काम करने लगे, हम सॉफ़्टवेयर को उपयोगकर्ताओं के लिए जारी करते हैं। डिप्लॉयमेंट सरल या क्रमिक हो सकता है, उपयोगकर्ताओं की संख्या पर निर्भर करता है।',
        analogy: {
            title: 'उदाहरण: गेम साझा करना 🕹️',
            text: 'बोर्ड गेम बनाने के बाद, आप इसे दोस्तों के साथ खेलते हैं। डिप्लॉयमेंट तब होता है जब सॉफ़्टवेयर सभी के लिए उपलब्ध हो जाता है।'
        },
        example:
            'क्विज़ ऐप को ऐप स्टोर या वेबसाइट पर अपलोड किया जाता है ताकि छात्र इसे इस्तेमाल कर सकें।'
    },
    {
        id: 6,
        name: 'रखरखाव / मेंटेनेंस',
        icon: '🛠️',
        color: '#c0392b',
        description:
            'उपयोगकर्ता सॉफ़्टवेयर का उपयोग करने लगे, तो हम इसे सुचारू रूप से चलाते रहते हैं। हम किसी भी समस्या को ठीक करते हैं, फीचर्स सुधारते हैं और जरूरत पड़ने पर अपडेट करते हैं।',
        analogy: {
            title: 'उदाहरण: बाग़ की देखभाल 🌱',
            text: 'पौधे लगाने के बाद, आप उन्हें पानी देते हैं, जंगली पौधों को हटाते हैं और विकास के लिए बदलाव करते हैं। सॉफ़्टवेयर को मेंटेन करना भी ऐसा ही है।'
        },
        example:
            'यदि क्विज़ ऐप में कोई बग या नया फीचर रिक्वेस्ट आता है, तो डेवलपर्स इसे सुधारते हैं या नए फीचर जोड़ते हैं।'
    }
];

// --- Animation Variants ---
const contentVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.98 },
    visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.5, type: 'spring', bounce: 0.4 } },
    exit: { opacity: 0, y: -30, scale: 1.02, transition: { duration: 0.3 } }
};

// --- Animated SVG per Stage ---
function AnimatedSVG({ stage }) {
    switch (stage.id) {
        case 0:
            return (
                <motion.svg width="50" height="50" viewBox="0 0 50 50"
                    initial={{ rotate: 0 }} animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 8, ease: 'linear' }}>
                    <circle cx="25" cy="25" r="20" fill={stage.color} opacity={0.3} />
                    <text x="50%" y="50%" textAnchor="middle" dominantBaseline="middle" fontSize="20" fill="white">{stage.icon}</text>
                </motion.svg>
            );
        case 1:
            return (
                <motion.svg width="50" height="50" viewBox="0 0 50 50"
                    initial={{ scale: 0.8 }} animate={{ scale: [0.8, 1.05, 0.95, 1] }}
                    transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}>
                    <rect x="10" y="10" width="30" height="30" rx="5" fill={stage.color} opacity={0.4} />
                    <text x="50%" y="50%" textAnchor="middle" dominantBaseline="middle" fontSize="20" fill="white">{stage.icon}</text>
                </motion.svg>
            );
        case 2:
            return (
                <motion.svg width="50" height="50" viewBox="0 0 50 50"
                    initial={{ y: -5 }} animate={{ y: [0, -5, 0, 5, 0] }}
                    transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }}>
                    <polygon points="25,5 45,45 5,45" fill={stage.color} opacity={0.4} />
                    <text x="50%" y="60%" textAnchor="middle" dominantBaseline="middle" fontSize="18" fill="white">{stage.icon}</text>
                </motion.svg>
            );
        case 3:
            return (
                <motion.svg width="50" height="50" viewBox="0 0 50 50"
                    initial={{ rotate: -10 }} animate={{ rotate: [-10, 10, -10] }}
                    transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}>
                    <circle cx="25" cy="25" r="15" fill={stage.color} opacity={0.5} />
                    <text x="50%" y="50%" textAnchor="middle" dominantBaseline="middle" fontSize="20" fill="white">{stage.icon}</text>
                </motion.svg>
            );
        case 4:
            return (
                <motion.svg width="50" height="50" viewBox="0 0 50 50"
                    initial={{ scale: 1 }} animate={{ scale: [1, 1.2, 1, 1.2, 1] }}
                    transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}>
                    <ellipse cx="25" cy="25" rx="20" ry="10" fill={stage.color} opacity={0.4} />
                    <text x="50%" y="50%" textAnchor="middle" dominantBaseline="middle" fontSize="18" fill="white">{stage.icon}</text>
                </motion.svg>
            );
        case 5:
            return (
                <motion.svg width="50" height="50" viewBox="0 0 50 50"
                    initial={{ y: 0 }} animate={{ y: [0, -8, 0, -8, 0] }}
                    transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}>
                    <polygon points="25,0 45,50 5,50" fill={stage.color} opacity={0.5} />
                    <text x="50%" y="60%" textAnchor="middle" dominantBaseline="middle" fontSize="18" fill="white">{stage.icon}</text>
                </motion.svg>
            );
        case 6:
            return (
                <motion.svg width="50" height="50" viewBox="0 0 50 50"
                    initial={{ rotate: 0 }} animate={{ rotate: [0, 20, -20, 0] }}
                    transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }}>
                    <circle cx="25" cy="25" r="18" fill={stage.color} opacity={0.3} />
                    <text x="50%" y="50%" textAnchor="middle" dominantBaseline="middle" fontSize="18" fill="white">{stage.icon}</text>
                </motion.svg>
            );
        default:
            return <div>{stage.icon}</div>;
    }
}

export default function SDLCExplorer() {
    const [language, setLanguage] = useState('en');
    const [activeStage, setActiveStage] = useState(sdlcStages[0]);
    const [sidebarOpen, setSidebarOpen] = useState(false); // for mobile
    const navigate = useNavigate();

    const currentStage = language === 'en'
        ? sdlcStages.find(stage => stage.id === activeStage.id)
        : sdlcStagesHindi.find(stage => stage.id === activeStage.id);

    return (
        <>
            {/* Language Toggle */}
            <div className="flex justify-end p-4 space-x-2">
                <button
                    onClick={() => setLanguage('en')}
                    className={`px-3 py-1 rounded-lg border font-semibold ${language === 'en'
                        ? 'bg-blue-500 text-white border-blue-500'
                        : 'bg-white text-gray-700 border-gray-300'
                        } transition`}
                >
                    EN
                </button>

                <button
                    onClick={() => setLanguage('hi')}
                    className={`px-3 py-1 rounded-lg border font-semibold ${language === 'hi'
                        ? 'bg-blue-500 text-white border-blue-500'
                        : 'bg-white text-gray-700 border-gray-300'
                        } transition`}
                >
                    हिं
                </button>
            </div>

            {/* Home Button */}
            <div className="flex justify-center mb-6 -mt-6">
                <Link
                    to="/parts/prt2"
                    className="inline-flex items-center px-4 py-2 bg-white rounded-full shadow-md border border-gray-200 hover:bg-gray-100 transition"
                >
                    <motion.div
                        className="mr-2"
                        animate={{ y: [0, -6, 0] }}
                        transition={{ repeat: Infinity, duration: 1, ease: "easeInOut" }}
                    >
                        <FaHome className="text-lg text-indigo-600" />
                    </motion.div>
                    Home
                </Link>
            </div>

            {/* Title */}
            <motion.h1
                initial={{ y: -30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ type: "spring", stiffness: 120 }}
                className="text-4xl font-extrabold text-center text-purple-700 mb-2"
            >
                🚗 SDLC : Software Development Lifecycle
            </motion.h1>

            {/* Main Container */}
            <div className="flex flex-col md:flex-row font-sans bg-gray-100 w-full max-w-6xl mx-auto my-8 shadow-2xl rounded-2xl overflow-hidden min-h-[700px]">

                {/* Sidebar Toggle Button (mobile) */}
                <div className="md:hidden flex justify-end p-4">
                    <button
                        onClick={() => setSidebarOpen(!sidebarOpen)}
                        className="px-3 py-2 bg-purple-500 text-white rounded-lg shadow"
                    >
                        {sidebarOpen ? 'Close Menu' : 'Open Menu'}
                    </button>
                </div>

                {/* Sidebar */}
                <aside className={`bg-white p-6 border-r border-gray-200 md:w-1/3 w-full md:block ${sidebarOpen ? 'block' : 'hidden'} md:relative absolute z-50 top-0 left-0 h-full md:h-auto`}>
                    <h2 className="text-2xl font-bold text-gray-800 mb-2">
                        {language === 'en' ? 'The SDLC' : 'SDLC चरण'}
                    </h2>
                    <p className="text-gray-500 mb-6">
                        {language === 'en' ? 'Click a stage to learn more.' : 'अधिक जानने के लिए किसी चरण पर क्लिक करें।'}
                    </p>
                    <nav className="space-y-2">
                        {sdlcStages.map(stage => {
                            const stageName = language === 'en'
                                ? stage.name
                                : sdlcStagesHindi.find(s => s.id === stage.id).name;

                            return (
                                <motion.button
                                    key={stage.id}
                                    onClick={() => {
                                        setActiveStage(stage);
                                        setSidebarOpen(false); // close sidebar on mobile
                                    }}
                                    className="w-full flex items-center text-left p-3 rounded-lg transition-all duration-300 focus:outline-none focus-visible:ring-2"
                                    style={{ color: activeStage.id === stage.id ? 'white' : '#374151' }}
                                    animate={{
                                        backgroundColor: activeStage.id === stage.id ? stage.color : 'rgba(243,244,246,0)',
                                        boxShadow: activeStage.id === stage.id ? `0 4px 14px 0 ${stage.color}55` : 'none'
                                    }}
                                    whileHover={{
                                        backgroundColor: activeStage.id !== stage.id ? '#f3f4f6' : stage.color,
                                        scale: 1.03
                                    }}
                                    whileTap={{ scale: 0.98 }}
                                >
                                    <motion.div
                                        className="text-2xl w-10 h-10 flex items-center justify-center rounded-full mr-4"
                                        animate={{
                                            backgroundColor: activeStage.id === stage.id ? 'rgba(255,255,255,0.2)' : '#e5e7eb',
                                            color: activeStage.id === stage.id ? 'white' : stage.color
                                        }}
                                    >
                                        {stage.icon}
                                    </motion.div>
                                    <span className="font-semibold">{stageName}</span>
                                </motion.button>
                            );
                        })}
                    </nav>
                </aside>

                {/* Main Content */}
                <main className="md:w-2/3 w-full p-6 md:p-10 bg-purple-100">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeStage.id}
                            variants={contentVariants}
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                            className="flex flex-col h-full"
                        >
                            <header className="flex flex-col md:flex-row items-center mb-6 text-center md:text-left">
                                {/* SVG */}
                                <div
                                    className="p-4 rounded-xl shadow-md flex items-center justify-center mb-4 md:mb-0"
                                    style={{ backgroundColor: activeStage.color, color: 'white' }}
                                >
                                    <AnimatedSVG stage={activeStage} />
                                </div>

                                {/* Title */}
                                <h1 className="text-4xl font-extrabold text-gray-800 md:ml-5">
                                    {currentStage.name}
                                </h1>
                            </header>

                            <div className="space-y-6 text-gray-600 leading-relaxed">
                                <section>
                                    <h3 className="text-lg font-bold mb-2" style={{ color: activeStage.color }}>What Happens Here?</h3>
                                    <p>{currentStage.description}</p>
                                </section>

                                <section>
                                    <div className="bg-white border-l-4 rounded-r-lg p-5" style={{ borderColor: activeStage.color }}>
                                        <h3 className="text-lg font-bold mb-2 flex items-center" style={{ color: activeStage.color }}>{currentStage.analogy.title}</h3>
                                        <p className="text-sm">{currentStage.analogy.text}</p>
                                    </div>
                                </section>

                                <section>
                                    <h3 className="text-lg font-bold mb-2 flex items-center" style={{ color: activeStage.color }}>Practical Example</h3>
                                    <p>{currentStage.example}</p>
                                </section>
                            </div>
                        </motion.div>
                    </AnimatePresence>
                </main>
            </div>

            {/* Page Navigation */}
            <div className="flex flex-col md:flex-row justify-between items-center -mt-8 p-6 bg-gray-100 rounded-lg shadow-md gap-4 md:gap-0">
                {/* Previous Button */}
                <button
                    onClick={() => {
                        if (activeStage.id === 0) {
                            // At first stage → navigate to external path
                            navigate('/module2/developer-role');
                        } else {
                            // Go to previous stage
                            const prevStage = sdlcStages.find(stage => stage.id === activeStage.id - 1);
                            setActiveStage(prevStage);
                        }
                    }}
                    className="flex items-center gap-2 px-4 py-2 bg-purple-200 hover:bg-purple-300 text-purple-900 rounded-lg shadow transition"
                >
                    <FaArrowLeft />
                    Previous
                </button>

                {/* Next Button */}
                <button
                    onClick={() => {
                        if (activeStage.id === sdlcStages.length - 1) {
                            navigate('/module2/programming-languages');
                        } else {

                            const nextStage = sdlcStages.find(stage => stage.id === activeStage.id + 1);
                            setActiveStage(nextStage);
                        }
                    }}
                    className="flex items-center gap-2 px-4 py-2 bg-green-200 hover:bg-green-300 text-green-900 rounded-lg shadow transition"
                >
                    Next
                    <FaArrowRight />
                </button>

            </div>

        </>
    );
}

