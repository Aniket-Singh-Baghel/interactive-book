import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaDatabase, FaPlus, FaMinus, FaList, FaTerminal, FaLightbulb, FaPlay, FaEraser, FaHashtag, FaFont, FaToggleOn, FaDotCircle, FaMapPin, FaHome, FaArrowLeft, FaArrowRight } from 'react-icons/fa';

// A mock Link component since we are in a single-file environment
const Link = ({ to, children, className }) => <a href={to} className={className}>{children}</a>;

const content = {
    en: {
        title: "Understanding Data Structures",
        subtitle: "From messy data to organized solutions – a guide for beginners.",
        home: "Home",
        stages: {
            1: {
                title: "What are Data Structures?",
                analogy: "Imagine a messy room full of toys. It's hard to find anything! Data Structures are like toy boxes, shelves, and labeled drawers. They help us organize information neatly so we can find and use it easily.",
                description: "In programming, we need to store information (like names, numbers, or lists). Data Structures are the special formats we use to store and manage that data efficiently for specific tasks.",
                code: `// Welcome!\n// This is a live code editor.\n// You can write and run JavaScript here.\n// Try changing the message below and click "Run Code".\n\nconsole.log("Hello, Data Structures!");`,
            },
            2: {
                title: "Integers",
                analogy: "An integer is like counting whole apples. You can have 1, 5, or 100 apples, but never 2 and a half. They are solid, whole numbers.",
                description: "Integers represent whole numbers, both positive and negative, without any decimal points. They are the most basic numeric type used for counting, indexing, and simple arithmetic.",
                code: `// Integers are whole numbers.\nlet myAge = 30;\nlet score = -150;\nlet numberOfItems = 100;\n\nlet total = myAge * 10;\n\nconsole.log("My age is:", myAge);\nconsole.log("The total score is:", total);`,
            },
            3: {
                title: "Floating-Point Numbers",
                analogy: "Floats are like measuring ingredients for a recipe. You might need 1.5 cups of flour or 0.25 teaspoons of salt. They allow for fractional, precise values.",
                description: "Floating-point numbers, or 'floats', represent numbers with a decimal point. They are essential for calculations involving fractions, such as scientific measurements, financial data, or graphics.",
                code: `// Floats have decimal points.\nconst pi = 3.14159;\nlet price = 19.99;\nlet temperature = -5.5;\n\nlet area = pi * 10 * 10; // Area of a circle\n\nconsole.log("The price is:", price);\nconsole.log("The area is:", area);`,
            },
            4: {
                title: "Characters",
                analogy: "A character is like a single alphabet block. It can be 'A', 'B', or 'C', but only one letter at a time. Special symbols like '$' or '!' are also characters.",
                description: "A character is a single letter, symbol, or number. In JavaScript, characters are technically strings of length one, enclosed in single or double quotes.",
                code: `// Characters are single symbols.\nlet firstInitial = 'J';\nlet currencySymbol = '$';\nlet punctuation = '!';\n\nlet message = "My initial is " + firstInitial;\n\nconsole.log("The symbol is:", currencySymbol);\nconsole.log(message);`,
            },
            5: {
                title: "Booleans",
                analogy: "A boolean is like a light switch. It can only be in one of two states: on (true) or off (false). There's no in-between.",
                description: "Booleans represent a truth value, which can only be `true` or `false`. They are fundamental for control flow, making decisions in code with `if` statements and loops.",
                code: `// Booleans are either true or false.\nlet isLearning = true;\nlet isTired = false;\nlet hasCoffee = true;\n\n// A simple decision\nif (isLearning && hasCoffee && !isTired) {\n  console.log("Let's keep coding!");\n} else {\n  console.log("Time for a break.");\n}`,
            },
            6: {
                title: "Pointers (References)",
                analogy: "A pointer is like a sticky note on your fridge that says 'Milk is in the grocery bag.' The note itself isn't the milk, but it tells you exactly where to find it.",
                description: "In JavaScript, we don't manage memory directly like in C++. Instead, we use 'references'. When you have an object or array, the variable holds a reference (an address) to where the actual data is stored in memory.",
                code: `// Objects and Arrays use references.\nlet personA = { name: "Alex" };\n\n// personB does not get a copy of the object,\n// it gets a reference (a pointer) to the same object.\nlet personB = personA;\n\nconsole.log("Person A's name:", personA.name); // Alex\nconsole.log("Person B's name:", personB.name); // Alex\n\n// If we change the data through personB...\npersonB.name = "Beth";\n\n// ...it also changes for personA, because they\n// both point to the SAME object in memory.\nconsole.log("Person A's name is now:", personA.name); // Beth`,
            },
            7: {
                title: "Arrays",
                analogy: "An Array is like a numbered shelf. You can put items on it in order, and you can find any item by knowing its shelf number (which we call an 'index'). The first shelf is always number 0.",
                description: "Arrays are ordered lists of values. You can store multiple items in a single variable, and access them using a numerical index. They are one of the most common and useful data structures.",
                code: `let fruits = ["Apple", "Banana", "Cherry"];\n\n// Access by index (starts at 0)\nconsole.log(fruits[1]); // "Banana"\n\n// Add an item to the end\nfruits.push("Date");\n\n// Remove the last item\nfruits.pop();\n\nconsole.log("Total fruits:", fruits.length);`
            }
        },
        common: {
            stage: "Stage",
            codeEditor: "Live Code Editor",
            visualizer: "Interactive Visualizer",
            runCode: "Run Code",
            clearOutput: "Clear",
            output: "Output Console",
            increment: "Increment",
            decrement: "Decrement",
            toggle: "Toggle",
            add: "Add",
            removeLast: "Remove Last",
            getByIndex: "Get by Index",
            enterValue: "Enter a value...",
            enterIndex: "Enter an index...",
            changeName: "Change Name",
        },
    },
    hi: {
        title: "डेटा स्ट्रक्चर्स को समझना",
        subtitle: "अव्यवस्थित डेटा से सुव्यवस्थित समाधान तक – beginners लोगों के लिए एक मार्गदर्शिका।",
        home: "होम",
        stages: {
            1: {
                title: "डेटा स्ट्रक्चर्स क्या हैं?",
                analogy: "सोचिए, एक कमरा खिलौनों से भरा है और सब कुछ बिखरा हुआ है। कुछ भी ढूंढना मुश्किल है! डेटा स्ट्रक्चर्स खिलौनों के बॉक्स, शेल्फ और नाम वाले दराज की तरह हैं। ये जानकारी को करीने से रखने में मदद करते हैं ताकि हम उसे आसानी से ढूंढ सकें और इस्तेमाल कर सकें।",
                description: "प्रोग्रामिंग में, हमें जानकारी (जैसे नाम, नंबर, या लिस्ट) को स्टोर करना होता है। डेटा स्ट्रक्चर्स वो खास तरीके हैं जिनसे हम डेटा को अच्छे से स्टोर और प्रबंधित करते हैं।",
                code: `// Welcome!\n// This is a live code editor.\n// You can write and run JavaScript here.\n// Try changing the message below and click "Run Code".\n\nconsole.log("Hello, Data Structures!");`,
            },
            2: {
                title: "पूर्णांक (Integers)",
                analogy: "पूर्णांक पूरे सेब गिनने जैसा है। आपके पास 1, 5, या 100 सेब हो सकते हैं, लेकिन कभी भी ढाई सेब नहीं। ये ठोस, पूरी संख्याएँ हैं।",
                description: "पूर्णांक बिना किसी दशमलव बिंदु के, सकारात्मक और नकारात्मक, पूरी संख्याओं का प्रतिनिधित्व करते हैं। ये गिनती, इंडेक्सिंग और सरल अंकगणित के लिए उपयोग किए जाने वाले सबसे बुनियादी संख्यात्मक प्रकार हैं।",
                code: `// पूर्णांक पूरी संख्याएँ होती हैं।\nlet meriUmar = 30;\nlet score = -150;\nlet vastuonKiSankhya = 100;\n\nlet kul = meriUmar * 10;\n\nconsole.log("मेरी उम्र है:", meriUmar);\nconsole.log("कुल स्कोर है:", kul);`,
            },
            3: {
                title: "फ्लोटिंग-पॉइंट नंबर",
                analogy: "फ्लोट एक रेसिपी के लिए सामग्री मापने जैसा है। आपको 1.5 कप आटा या 0.25 चम्मच नमक की आवश्यकता हो सकती है। वे भिन्नात्मक, सटीक मानों की अनुमति देते हैं।",
                description: "फ्लोटिंग-पॉइंट नंबर, या 'फ्लोट्स', दशमलव बिंदु वाली संख्याओं का प्रतिनिधित्व करते हैं। वे वैज्ञानिक माप, वित्तीय डेटा या ग्राफिक्स जैसे भिन्नों से जुड़े गणनाओं के लिए आवश्यक हैं।",
                code: `// Floats have decimal points.\nconst pi = 3.14159;\nlet price = 19.99;\nlet temperature = -5.5;\n\nlet area = pi * 10 * 10; // Area of a circle\n\nconsole.log("The price is:", price);\nconsole.log("The area is:", area);`,
            },
            4: {
                title: "कैरेक्टर (Characters)",
                analogy: "एक कैरेक्टर एक अक्षर ब्लॉक की तरह है। यह 'A', 'B', या 'C' हो सकता है, लेकिन एक बार में केवल एक अक्षर। '$' या '!' जैसे विशेष प्रतीक भी कैरेक्टर हैं।",
                description: "एक कैरेक्टर एक एकल अक्षर, प्रतीक या संख्या है। जावास्क्रिप्ट में, कैरेक्टर तकनीकी रूप से लंबाई एक के स्ट्रिंग होते हैं, जो एकल या दोहरे उद्धरणों में संलग्न होते हैं।",
                code: `// Characters are single symbols.\nlet firstInitial = 'J';\nlet currencySymbol = '$';\nlet punctuation = '!';\n\nlet message = "My initial is " + firstInitial;\n\nconsole.log("The symbol is:", currencySymbol);\nconsole.log(message);`,
            },
            5: {
                title: "बूलियन (Booleans)",
                analogy: "एक बूलियन एक लाइट स्विच की तरह है। यह केवल दो अवस्थाओं में से एक में हो सकता है: चालू (true) या बंद (false)। बीच में कुछ भी नहीं है।",
                description: "बूलियन एक सत्य मान का प्रतिनिधित्व करते हैं, जो केवल `true` या `false` हो सकता है। वे `if` स्टेटमेंट और लूप के साथ कोड में निर्णय लेने, नियंत्रण प्रवाह के लिए मौलिक हैं।",
                code: `// Booleans are either true or false.\nlet isLearning = true;\nlet isTired = false;\nlet hasCoffee = true;\n\n// A simple decision\nif (isLearning && hasCoffee && !isTired) {\n  console.log("Let's keep coding!");\n} else {\n  console.log("Time for a break.");\n}`,
            },
            6: {
                title: "पॉइंटर्स (संदर्भ)",
                analogy: "एक पॉइंटर आपके फ्रिज पर एक चिपचिपे नोट की तरह है जो कहता है 'दूध किराने की थैली में है।' नोट खुद दूध नहीं है, लेकिन यह आपको बताता है कि इसे ठीक कहाँ खोजना है।",
                description: "जावास्क्रिप्ट में, हम C++ की तरह सीधे मेमोरी का प्रबंधन नहीं करते हैं। इसके बजाय, हम 'संदर्भ' का उपयोग करते हैं। जब आपके पास कोई ऑब्जेक्ट या ऐरे होता है, तो वैरिएबल में एक संदर्भ (एक पता) होता है जहां वास्तविक डेटा मेमोरी में संग्रहीत होता है।",
                code: `// Objects and Arrays use references.\nlet personA = { name: "Alex" };\n\n// personB does not get a copy of the object,\n// it gets a reference (a pointer) to the same object.\nlet personB = personA;\n\nconsole.log("Person A's name:", personA.name); // Alex\nconsole.log("Person B's name:", personB.name); // Alex\n\n// If we change the data through personB...\npersonB.name = "Beth";\n\n// ...it also changes for personA, because they\n// both point to the SAME object in memory.\nconsole.log("Person A's name is now:", personA.name); // Beth`,
            },
            7: {
                title: "ऐरे (Arrays)",
                analogy: "एक ऐरे एक नंबर वाली शेल्फ की तरह है। आप उस पर क्रम में सामान रख सकते हैं, और आप किसी भी सामान को उसका शेल्फ नंबर (जिसे हम 'index' कहते हैं) जानकर ढूंढ सकते हैं। पहली शेल्फ का नंबर हमेशा 0 होता है।",
                description: "ऐरे मानों की क्रमबद्ध सूचियाँ हैं। आप एक ही वैरिएबल में कई आइटम स्टोर कर सकते हैं, और उन्हें एक संख्यात्मक इंडेक्स का उपयोग करके एक्सेस कर सकते हैं। वे सबसे आम और उपयोगी डेटा संरचनाओं में से एक हैं।",
                code: `let fruits = ["Apple", "Banana", "Cherry"];\n\n// Access by index (starts at 0)\nconsole.log(fruits[1]); // "Banana"\n\n// Add an item to the end\nfruits.push("Date");\n\n// Remove the last item\nfruits.pop();\n\nconsole.log("Total fruits:", fruits.length);`
            }
        },
        common: {
            stage: "स्टेज",
            codeEditor: "लाइव कोड एडिटर",
            visualizer: "इंटरैक्टिव विज़ुअलाइज़र",
            runCode: "कोड चलाएं",
            clearOutput: "साफ़ करें",
            output: "आउटपुट कंसोल",
            increment: "बढ़ाएं",
            decrement: "घटाएं",
            toggle: "टॉगल करें",
            add: "जोड़ें",
            removeLast: "आखिरी हटाएं",
            getByIndex: "इंडेक्स से पाएं",
            enterValue: "एक मान दर्ज करें...",
            enterIndex: "एक इंडेक्स दर्ज करें...",
            changeName: "नाम बदलें",
        },
    },
};

const DataStructuresModule = () => {
    const [lang, setLang] = useState("en");
    const [activeStage, setActiveStage] = useState(1);
    const [code, setCode] = useState("");
    const [output, setOutput] = useState([]);

    // State for interactive visualizers
    const [integer, setInteger] = useState(42);
    const [float, setFloat] = useState(3.14);
    const [character, setCharacter] = useState('A');
    const [boolean, setBoolean] = useState(true);
    const [refObject, setRefObject] = useState({ name: "Alex" });
    const [refObjectNameInput, setRefObjectNameInput] = useState("Beth");
    const [array, setArray] = useState(["Apple", "Banana", "Cherry"]);
    const [arrayInput, setArrayInput] = useState("");


    const currentContent = content[lang];
    const stageData = currentContent.stages[activeStage];

    useEffect(() => {
        setCode(stageData.code);
        setOutput([]);
    }, [activeStage, lang, stageData.code]);

    const runCode = useCallback(() => {
        setOutput([]);
        const originalConsoleLog = console.log;
        const newOutput = [];

        console.log = (...args) => {
            const message = args.map(arg => typeof arg === 'object' && arg !== null ? JSON.stringify(arg, null, 2) : String(arg)).join(' ');
            newOutput.push({ type: 'log', message });
        };

        try {
            /* eslint-disable-next-line no-new-func */
            new Function(code)();
        } catch (error) {
            newOutput.push({ type: 'error', message: error.message });
        } finally {
            console.log = originalConsoleLog;
            setOutput(newOutput);
        }
    }, [code]);

    const getStageIcon = (stage) => {
        const icons = { 1: FaLightbulb, 2: FaHashtag, 3: FaDotCircle, 4: FaFont, 5: FaToggleOn, 6: FaMapPin, 7: FaList };
        const colors = { 1: 'text-yellow-500', 2: 'text-green-500', 3: 'text-purple-500', 4: 'text-Pink-500', 5: 'text-pink-500', 6: 'text-red-500', 7: 'text-purple-500' };
        const Icon = icons[stage];
        return Icon ? <Icon className={colors[stage]} /> : null;
    };

    const getVisualizerContent = () => {
        switch (activeStage) {
            case 2: // Integer
                return <div className="text-center">
                    <motion.div initial={{ scale: 0.8 }} animate={{ scale: 1 }} className="text-7xl font-bold text-green-600 bg-green-100 rounded-full w-32 h-32 flex items-center justify-center mx-auto shadow-lg">{integer}</motion.div>
                    <div className="flex justify-center gap-4 mt-6">
                        <button onClick={() => setInteger(i => i + 1)} className="px-4 py-2 bg-green-500 text-white rounded-lg shadow hover:bg-green-600">{currentContent.common.increment}</button>
                        <button onClick={() => setInteger(i => i - 1)} className="px-4 py-2 bg-red-500 text-white rounded-lg shadow hover:bg-red-600">{currentContent.common.decrement}</button>
                    </div>
                </div>;
            case 3: // Float
                return <div className="text-center">
                    <div className="text-6xl font-semibold text-blue-600 bg-blue-100 rounded-lg px-6 py-4 inline-block mx-auto shadow-lg">{float.toFixed(2)}</div>
                    <div className="flex justify-center gap-4 mt-6">
                        <button onClick={() => setFloat(f => f + 0.5)} className="px-4 py-2 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600">+ 0.5</button>
                        <button onClick={() => setFloat(f => f * 2)} className="px-4 py-2 bg-purple-500 text-white rounded-lg shadow hover:bg-purple-600">x 2</button>
                    </div>
                </div>;
            case 4: // Character
                return <div className="text-center">
                    <input type="text" value={character} onChange={(e) => setCharacter(e.target.value.slice(0, 1))} maxLength="1" className="text-7xl font-bold text-indigo-600 bg-indigo-100 rounded-full w-32 h-32 flex items-center justify-center mx-auto shadow-lg text-center border-2 border-indigo-300 focus:outline-none focus:ring-4 focus:ring-indigo-200" />
                </div>;
            case 5: // Boolean
                return <div className="text-center flex flex-col items-center gap-4">
                    <div className={`text-5xl font-bold px-6 py-3 rounded-lg shadow-lg ${boolean ? 'bg-pink-500 text-white' : 'bg-gray-300 text-gray-600'}`}>{String(boolean)}</div>
                    <button onClick={() => setBoolean(b => !b)} className="px-6 py-2 bg-pink-500 text-white rounded-lg shadow hover:bg-pink-600">{currentContent.common.toggle}</button>
                </div>;
            case 6: // References
                return <div className="w-full text-center">
                    <div className="flex flex-col md:flex-row justify-around items-center gap-4">
                        <div className="p-4 border-2 border-dashed border-red-400 rounded-lg bg-red-50">
                            <h3 className="font-bold text-red-700">Variable <code>personA</code></h3>
                            <p className="font-mono bg-white p-2 rounded mt-1">{`{ name: "${refObject.name}" }`}</p>
                        </div>
                        <div className="p-4 border-2 border-dashed border-red-400 rounded-lg bg-red-50">
                            <h3 className="font-bold text-red-700">Variable <code>personB</code></h3>
                            <p className="font-mono bg-white p-2 rounded mt-1">{`{ name: "${refObject.name}" }`}</p>
                        </div>
                    </div>
                    <FaArrowRight className="text-gray-400 text-3xl my-4 hidden md:block mx-auto transform -rotate-45" />
                    <FaArrowRight className="text-gray-400 text-3xl my-4 hidden md:block mx-auto transform rotate-45 -mt-12" />
                    <div className="p-4 bg-gray-700 text-white rounded-lg shadow-xl inline-block mt-4">
                        <h3 className="font-bold text-gray-300">Object in Memory</h3>
                        <p className="font-mono bg-gray-900 p-2 rounded mt-1">{`{ name: "${refObject.name}" }`}</p>
                    </div>
                    <div className="mt-6 flex justify-center gap-2">
                        <input type="text" value={refObjectNameInput} onChange={(e) => setRefObjectNameInput(e.target.value)} className="px-3 py-2 rounded border border-gray-300 focus:ring-2 focus:ring-sky-400 focus:outline-none" />
                        <button onClick={() => setRefObject({ name: refObjectNameInput })} className="px-4 py-2 bg-red-500 text-white rounded-lg shadow hover:bg-red-600">{currentContent.common.changeName}</button>
                    </div>
                </div>;
            case 7: // Array
                return <div className="w-full">
                    <div className="flex flex-wrap justify-center gap-2 mb-4 min-h-[50px]">
                        {array.map((item, idx) => (
                            <motion.div key={idx} className="flex flex-col items-center px-4 py-2 rounded-md bg-purple-500 text-white text-sm shadow">
                                <span className="font-bold text-xs bg-purple-700 px-1 rounded -mt-3 mb-1">{idx}</span>{item}
                            </motion.div>
                        ))}
                    </div>
                    <div className="flex gap-2 justify-center mt-4">
                        <input value={arrayInput} onChange={(e) => setArrayInput(e.target.value)} placeholder={currentContent.common.enterValue} className="px-3 py-2 rounded border border-gray-300 focus:ring-2 focus:ring-sky-400 focus:outline-none" />
                        <button onClick={() => { if (arrayInput) setArray([...array, arrayInput]); setArrayInput(""); }} className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"><FaPlus /></button>
                        <button onClick={() => setArray(arr => arr.slice(0, -1))} className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"><FaMinus /></button>
                    </div>
                </div>;
            default:
                return null;
        }
    };

    return (
        <div className="bg-slate-50 min-h-screen font-sans py-8">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">

                <div className="flex items-center justify-between px-4">
                    {/* Home Link */}
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
                        {currentContent.home}
                    </Link>

                    {/* Language Toggle */}
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


                {/* Header */}
                <motion.div
                    className="flex flex-col sm:flex-row items-center sm:items-start gap-6 bg-white p-6 sm:p-8 rounded-2xl shadow-lg border border-gray-200"
                    initial={{ y: -30, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                >
                    <div className="p-4 bg-sky-100 rounded-full flex-shrink-0">
                        <FaDatabase className="text-5xl text-sky-500" />
                    </div>
                    <div className="text-center sm:text-left">
                        <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-800">{currentContent.title}</h1>
                        <p className="text-lg text-gray-500 mt-1">{currentContent.subtitle}</p>
                    </div>
                </motion.div>

                {/* Stage Buttons */}
                <div className="flex flex-wrap justify-center gap-3 p-3 bg-gray-100 rounded-xl">
                    {Object.keys(currentContent.stages).map((stage) => (
                        <motion.button
                            key={stage}
                            onClick={() => setActiveStage(parseInt(stage))}
                            className={`px-5 py-2 rounded-lg text-md font-semibold transition-all duration-300 flex items-center gap-2 ${activeStage === parseInt(stage)
                                ? "bg-sky-600 text-white shadow"
                                : "bg-white text-gray-600 hover:bg-sky-100 hover:text-sky-700 border border-gray-200"
                                }`}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            {getStageIcon(stage)} {currentContent.common.stage} {stage}
                        </motion.button>
                    ))}
                </div>

                {/* Stage Content */}
                <AnimatePresence mode="wait">
                    <motion.div
                        key={`stage-${activeStage}-${lang}`}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.4, ease: "easeInOut" }}
                        className="flex flex-col lg:flex-row gap-8 w-full"
                        layout
                    >
                        {/* Description */}
                        <motion.div
                            layout
                            className="bg-white p-6 sm:p-8 rounded-2xl shadow-lg border border-gray-200 flex-1 space-y-5"
                        >
                            <h3 className="text-2xl sm:text-3xl font-bold text-gray-800">{stageData.title}</h3>
                            <p className="text-sky-800 text-md italic bg-sky-50 p-4 rounded-lg border-l-4 border-sky-400">
                                <span className="font-bold text-sky-900">{lang === 'en' ? 'Analogy' : 'उपमा'}:</span> {stageData.analogy}
                            </p>
                            <p className="text-gray-600 leading-relaxed">{stageData.description}</p>
                        </motion.div>

                        {/* Visualizer */}
                        {activeStage > 1 && (
                            <motion.div
                                layout
                                className="bg-white p-6 sm:p-8 rounded-2xl shadow-lg border border-gray-200 flex flex-col items-center justify-center min-h-[300px] flex-1"
                            >
                                <h4 className="text-gray-700 text-xl font-bold mb-6 flex items-center gap-2">
                                    <FaTerminal className="text-sky-500" /> {currentContent.common.visualizer}
                                </h4>
                                {getVisualizerContent()}
                            </motion.div>
                        )}
                    </motion.div>
                </AnimatePresence>


                {/* Code Editor */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white p-6 sm:p-8 rounded-2xl shadow-lg border border-gray-200"
                >
                    <h4 className="text-gray-700 text-xl font-bold mb-4 flex items-center gap-2">
                        <FaTerminal className="text-sky-500" /> {currentContent.common.codeEditor}
                    </h4>
                    <div className="bg-slate-900 rounded-lg shadow-inner font-mono text-sm">
                        <textarea
                            value={code}
                            onChange={(e) => setCode(e.target.value)}
                            className="w-full h-64 p-4 bg-transparent text-gray-200 resize-none border-0 focus:ring-0 focus:outline-none"
                            spellCheck="false"
                        />
                    </div>
                    <div className="flex flex-col sm:flex-row items-center justify-between mt-4 gap-2 sm:gap-0">
                        <motion.button
                            onClick={runCode}
                            className="px-6 py-2 bg-green-500 text-white font-semibold rounded-lg shadow hover:bg-green-600 flex items-center gap-2"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <FaPlay /> {currentContent.common.runCode}
                        </motion.button>

                        {output.length > 0 && (
                            <motion.button
                                onClick={() => setOutput([])}
                                className="px-4 py-2 bg-gray-200 text-gray-600 font-semibold rounded-lg hover:bg-gray-300 flex items-center gap-2"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <FaEraser /> {currentContent.common.clearOutput}
                            </motion.button>
                        )}
                    </div>

                    {output.length > 0 && (
                        <div className="mt-4">
                            <h5 className="font-semibold text-gray-600 mb-2">{currentContent.common.output}</h5>
                            <div className="bg-gray-100 p-4 rounded-lg font-mono text-sm text-gray-800 space-y-1 max-h-48 overflow-y-auto">
                                {output.map((line, index) => (
                                    <pre
                                        key={index}
                                        className={`whitespace-pre-wrap ${line.type === 'error' ? 'text-red-600' : ''}`}
                                    >
                                        {line.message}
                                    </pre>
                                ))}
                            </div>
                        </div>
                    )}
                </motion.div>

            </div>
            <div className="flex flex-col md:flex-row justify-between items-center mt-4 p-6 bg-gray-100 rounded-lg shadow-md gap-4 md:gap-0">
                {/* Previous Button */}
                <button
                    onClick={() => {
                        if (activeStage === 1) {
                            // In a real app with a router, you would use navigate()
                            // For this mock, we'll simulate navigation
                            window.location.href = '/module2/programming-languages';
                        } else {
                            setActiveStage(activeStage - 1);
                        }
                    }}
                    className="flex items-center gap-2 px-4 py-2 bg-purple-200 hover:bg-purple-300 text-purple-900 rounded-lg shadow transition"
                >
                    <FaArrowLeft />
                    Previous
                    {currentContent.common.previous}
                </button>

                {/* Next Button */}
                <button
                    onClick={() => {
                        const totalStages = Object.keys(currentContent.stages).length;
                        if (activeStage === totalStages) {
                            // Last stage → page navigation
                            window.location.href = '/module2/algorithms';
                        } else {
                            // Go to next stage
                            setActiveStage(activeStage + 1);
                        }
                    }}
                    className="flex items-center gap-2 px-4 py-2 bg-green-200 hover:bg-green-300 text-green-900 rounded-lg shadow transition"
                >
                    {currentContent.common.next}
                    <FaArrowRight />
                    Next
                </button>
            </div>
        </div>
    );
};

export default DataStructuresModule;

