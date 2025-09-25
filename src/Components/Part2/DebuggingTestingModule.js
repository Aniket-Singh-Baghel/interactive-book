import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {FaCheckCircle, FaTimesCircle, FaPlay, FaArrowLeft, FaArrowRight, FaHome } from "react-icons/fa";
import { Link, useNavigate } from 'react-router-dom';

const content = {
  en: {
    home: "Home",
    title: "Testing & Debugging 🐞",
    subtitle: "Ensuring your code is reliable, bug-free, and ready for the world.",
    
    testing_title: "What is Testing?",
    testing_desc: "<em>Testing</em> is the process of <strong>verifying that a software application does what it is supposed to do</strong>. It's like checking your homework before submitting it to the teacher. You want to find any mistakes before anyone else does.",
    testing_analogy_title: "The Car Factory Analogy",
    testing_analogy: "Imagine a car factory. Before a car is sold, it goes through a series of tests: the engine is checked, the brakes are tested, and the lights are inspected. This is to ensure the car is safe and works correctly. Software testing is the same; it's a quality control process.",

    debugging_title: "What is Debugging?",
    debugging_desc: "<em>Debugging</em> is the process of <strong>finding and fixing errors (bugs) in the source code</strong> of a program. This happens <em>after</em> a test has failed or a bug has been reported. It's the detective work of software development.",
    debugging_analogy_title: "The Detective Analogy",
    debugging_analogy: "If testing is like knowing a crime has been committed, debugging is the detective's job to find out who did it, how, and why. A debugger is a special tool that helps developers inspect the code step-by-step to find the root cause of the problem.",

    testing_types_title: "Types of Software Testing",
    testing_types: [
      {
        name: "Unit Testing",
        description: "Testing individual components or functions in isolation. It's like checking each ingredient before you cook.",
        example: "A test that checks if a `sum(2, 3)` function correctly returns `5`."
      },
      {
        name: "Integration Testing",
        description: "Testing how multiple components work together. It's like making sure the engine and wheels of a car work together.",
        example: "A test that checks if logging in (authentication) correctly shows the user's dashboard (UI)."
      },
      {
        name: "End-to-End (E2E) Testing",
        description: "Testing the entire application flow from start to finish, simulating a real user's journey.",
        example: "A test that simulates a user signing up, adding an item to the cart, and checking out."
      }
    ],

    distinction_title: "Testing vs. Debugging: Key Differences",
    distinction: [
      {
        aspect: "Goal",
        testing: "To find defects and bugs.",
        debugging: "To fix the defects found."
      },
      {
        aspect: "Timing",
        testing: "Planned and scheduled before release.",
        debugging: "Unplanned, happens when a bug is found."
      },
      {
        aspect: "Process",
        testing: "Can be automated or manual.",
        debugging: "Mostly a manual process."
      },
      {
        aspect: "Who does it?",
        testing: "Often done by a dedicated testing team.",
        debugging: "Done by the developer who wrote the code."
      }
    ],

    interactive_title: "Live Simulation: Spot the Bug!",
    interactive_desc: "Here is a simple function that is supposed to add two numbers. But there's a bug! Can you spot it? Run the tests to see what happens.",
    code_snippet: `function add(a, b) {
  return a - b; // Oops! This should be addition.
}`,
    run_tests_button: "Run Tests",
    test_results_title: "Test Results",
    test_case_1: "Test Case 1: 2 + 3 = 5",
    test_case_2: "Test Case 2: 10 + 5 = 15",

    ui_testing_title: "UI Testing Simulation",
    ui_testing_desc: "Check if the button's color changes on click.",
    ui_button_text: "Click Me",
    ui_test_button: "Test UI",
    ui_test_result: "Button color changed successfully!",

    edge_case_title: "Edge Case Testing",
    edge_case_desc: "Test how the system handles unexpected or extreme inputs. Enter a username to test.",
    edge_case_input_placeholder: "Enter username",
    edge_case_test_button: "Test Username",

    detective_animation_title: "Interactive Detective: The Case of the Missing Clue",
    detective_animation_desc: "Become a code detective! Below is an animated scene. Your mission, should you choose to accept it, is to find the hidden clues within the code. Each clue represents a 'bug' or an 'issue' that you need to solve. Pay close attention to the details and see if you can spot all the anomalies.",
    detective_animation_tip: "Hover over different elements in the scene to uncover hidden messages and clues. Click on the bugs to 'squash' them!",
    
    previous: "Previous",
    next: "Next",
  },
  hi: {
    home: "होम",
    title: "टेस्टिंग और डीबगिंग 🐞",
    subtitle: "यह सुनिश्चित करना कि आपका कोड विश्वसनीय, बग-मुक्त और दुनिया के लिए तैयार है।",

    testing_title: "टेस्टिंग क्या है?",
    testing_desc: "<em>टेस्टिंग</em> यह <strong>सत्यापित करने की प्रक्रिया है कि एक सॉफ्टवेयर एप्लिकेशन वही करता है जो उसे करना चाहिए</strong>। यह शिक्षक को अपना होमवर्क जमा करने से पहले उसकी जाँच करने जैसा है। आप चाहते हैं कि कोई और गलती खोजने से पहले आप खुद ही गलतियाँ खोज लें।",
    testing_analogy_title: "कार फैक्ट्री का सादृश्य",
    testing_analogy: "एक कार फैक्ट्री की कल्पना करें। कार बेचने से पहले, यह कई परीक्षणों से गुजरती है: इंजन की जाँच की जाती है, ब्रेक का परीक्षण किया जाता है, और लाइट का निरीक्षण किया जाता है। यह सुनिश्चित करने के लिए है कि कार सुरक्षित है और सही तरीके से काम करती है। सॉफ्टवेयर टेस्टिंग भी यही है; यह एक गुणवत्ता नियंत्रण प्रक्रिया है।",

    debugging_title: "डीबगिंग क्या है?",
    debugging_desc: "<em>डीबगिंग</em> एक प्रोग्राम के <strong>सोर्स कोड में त्रुटियों (बग) को खोजने और ठीक करने की प्रक्रिया है</strong>। यह तब होता है जब कोई परीक्षण विफल हो जाता है या कोई बग रिपोर्ट किया जाता है। यह सॉफ्टवेयर डेवलपमेंट की जासूसी का काम है।",
    debugging_analogy_title: "जासूस का सादृश्य",
    debugging_analogy: "अगर टेस्टिंग यह जानने जैसा है कि कोई अपराध किया गया है, तो डीबगिंग जासूस का काम है कि यह पता लगाए कि यह किसने, कैसे और क्यों किया। एक डीबगर एक विशेष उपकरण है जो डेवलपर्स को समस्या का मूल कारण खोजने के लिए कोड का चरण-दर-चरण निरीक्षण करने में मदद करता है।",

    testing_types_title: "सॉफ्टवेयर टेस्टिंग के प्रकार",
    testing_types: [
      {
        name: "यूनिट टेस्टिंग",
        description: "अलग-अलग घटकों या कार्यों का परीक्षण करना। यह खाना पकाने से पहले प्रत्येक सामग्री की जाँच करने जैसा है।",
        example: "एक परीक्षण जो यह जाँचता है कि `sum(2, 3)` फ़ंक्शन सही ढंग से `5` लौटाता है या नहीं।"
      },
      {
        name: "इंटीग्रेशन टेस्टिंग",
        description: "यह परीक्षण करना कि कई घटक एक साथ कैसे काम करते हैं। यह सुनिश्चित करने जैसा है कि कार का इंजन और पहिए एक साथ काम करते हैं।",
        example: "एक परीक्षण जो यह जाँचता है कि लॉग इन करने (प्रमाणीकरण) से उपयोगकर्ता का डैशबोर्ड (UI) सही ढंग से दिखाई देता है या नहीं।"
      },
      {
        name: "एंड-टू-एंड (E2E) टेस्टिंग",
        description: "एक वास्तविक उपयोगकर्ता की यात्रा का अनुकरण करते हुए, शुरू से अंत तक पूरे एप्लिकेशन प्रवाह का परीक्षण करना।",
        example: "एक परीक्षण जो एक उपयोगकर्ता को साइन अप करने, कार्ट में एक आइटम जोड़ने और चेक आउट करने का अनुकरण करता है।"
      }
    ],

    distinction_title: "टेस्टिंग बनाम डीबगिंग: मुख्य अंतर",
    distinction: [
      {
        aspect: "लक्ष्य",
        testing: "दोषों और बगों को खोजना।",
        debugging: "पाए गए दोषों को ठीक करना।"
      },
      {
        aspect: "समय",
        testing: "रिलीज से पहले योजनाबद्ध और निर्धारित।",
        debugging: "अनियोजित, जब कोई बग पाया जाता है तब होता है।"
      },
      {
        aspect: "प्रक्रिया",
        testing: "स्वचालित या मैनुअल हो सकता है।",
        debugging: "अधिकतर एक मैनुअल प्रक्रिया।"
      },
      {
        aspect: "कौन करता है?",
        testing: "अक्सर एक समर्पित परीक्षण टीम द्वारा किया जाता है।",
        debugging: "उस डेवलपर द्वारा किया जाता है जिसने कोड लिखा है।"
      }
    ],

    interactive_title: "लाइव सिमुलेशन: बग को पहचानें!",
    interactive_desc: "यहाँ एक सरल फ़ंक्शन है जिसे दो नंबरों को जोड़ना चाहिए। लेकिन इसमें एक बग है! क्या आप इसे पहचान सकते हैं? यह देखने के लिए परीक्षण चलाएँ कि क्या होता है।",
    code_snippet: `function add(a, b) {
  return a - b; // अरे! यह जोड़ होना चाहिए।
}`,
    run_tests_button: "टेस्ट चलाएँ",
    test_results_title: "टेस्ट के परिणाम",
    test_case_1: "टेस्ट केस 1: 2 + 3 = 5",
    test_case_2: "टेस्ट केस 2: 10 + 5 = 15",

    ui_testing_title: "यूआई टेस्टिंग सिमुलेशन",
    ui_testing_desc: "जांचें कि क्लिक करने पर बटन का रंग बदलता है या नहीं।",
    ui_button_text: "मुझे क्लिक करें",
    ui_test_button: "यूआई टेस्ट करें",
    ui_test_result: "बटन का रंग सफलतापूर्वक बदल गया!",

    edge_case_title: "एज केस टेस्टिंग",
    edge_case_desc: "परीक्षण करें कि सिस्टम अनपेक्षित या चरम इनपुट को कैसे संभालता है। परीक्षण के लिए एक उपयोगकर्ता नाम दर्ज करें।",
    edge_case_input_placeholder: "उपयोगकर्ता नाम दर्ज करें",
    edge_case_test_button: "उपयोगकर्ता नाम का परीक्षण करें",

    detective_animation_title: "इंटरैक्टिव जासूस",
    detective_animation_desc: "एनिमेटेड एसवीजी डेमो",
    detective_animation_tip: "टिप: मैग्नीफाइंग ग्लास का उपयोग कोड पथों को अलग करने की कल्पना करने के लिए करें।",

    previous: "पिछला",
    next: "अगला",
  }
};

const DebuggingTestingModule = () => {
  const [lang, setLang] = useState('en');
  const [testResults, setTestResults] = useState(null);
  const [uiTestResult, setUiTestResult] = useState('');
  const [edgeCaseResult, setEdgeCaseResult] = useState('');
  const [username, setUsername] = useState('');
  const [isButtonClicked, setIsButtonClicked] = useState(false);
  const navigate = useNavigate();
  const t = content[lang];

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

  const runTests = () => {
    const results = {
      test1: 2 + 3 === 2 - 3, // This will be false
      test2: 10 + 5 === 10 - 5, // This will be false
    };
    setTestResults(results);
  };

  const testUi = () => {
    setIsButtonClicked(true);
    setTimeout(() => {
      setUiTestResult(t.ui_test_result);
    }, 500);
  };

  const testEdgeCase = () => {
    if (username.length < 3) {
      setEdgeCaseResult("Error: Username must be at least 3 characters long.");
    } else if (username.length > 15) {
      setEdgeCaseResult("Error: Username must be no more than 15 characters long.");
    } else if (!/^[a-zA-Z0-9_]+$/.test(username)) {
      setEdgeCaseResult("Error: Username can only contain letters, numbers, and underscores.");
    } else {
      setEdgeCaseResult("Success: Username is valid.");
    }
  };

  return (
    <div className="bg-gray-50 font-sans">
      <div className="p-4 sm:p-6 lg:p-8 min-h-screen">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <Link to="/parts/prt2" className="inline-flex items-center px-4 py-2 bg-white rounded-full shadow-md border border-gray-200 hover:bg-gray-100 transition">
              <FaHome className="mr-2 text-lg text-sky-600" />
              {t.home}
            </Link>
            <div className="flex space-x-2">
              <button onClick={() => setLang("en")} className={`px-3 py-1 rounded-lg border font-semibold ${lang === "en" ? "bg-sky-600 text-white border-sky-600" : "bg-white text-gray-700 border-gray-300"} transition`}>EN</button>
              <button onClick={() => setLang("hi")} className={`px-3 py-1 rounded-lg border font-semibold ${lang === "hi" ? "bg-sky-600 text-white border-sky-600" : "bg-white text-gray-700 border-gray-300"} transition`}>हिं</button>
            </div>
          </div>
          <div className="p-4 sm:p-6 lg:p-8 max-w-4xl mx-auto bg-white rounded-2xl shadow-lg">
            <motion.h1
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-3xl sm:text-4xl lg:text-5xl font-bold text-center text-gray-800 mb-2"
            >
              {t.title}
            </motion.h1>
            <p className="text-center text-gray-600 mb-8 text-base sm:text-lg">
              {t.subtitle}
            </p>

            {/* Testing Section */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-blue-50 p-6 rounded-lg shadow-inner mb-6"
            >
              <h2 className="text-xl sm:text-2xl font-semibold text-blue-800 mb-3">{t.testing_title}</h2>
              <p className="text-gray-700 mb-4" dangerouslySetInnerHTML={{ __html: t.testing_desc }} />
              <h3 className="text-lg font-semibold text-blue-700 mb-2">{t.testing_analogy_title}</h3>
              <p className="text-gray-700"><i>{t.testing_analogy}</i></p>
            </motion.div>

            {/* Debugging Section */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-red-50 p-6 rounded-lg shadow-inner mb-6"
            >
              <h2 className="text-xl sm:text-2xl font-semibold text-red-800 mb-3">{t.debugging_title}</h2>
              <p className="text-gray-700 mb-4" dangerouslySetInnerHTML={{ __html: t.debugging_desc }} />
              <h3 className="text-lg font-semibold text-red-700 mb-2">{t.debugging_analogy_title}</h3>
              <p className="text-gray-700"><i>{t.debugging_analogy}</i></p>
            </motion.div>

            {/* SVG Detective Animation */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="bg-sky-50 p-6 rounded-lg shadow-inner mb-6"
            >
              <h2 className="text-xl sm:text-2xl font-semibold text-sky-800 mb-3">{t.detective_animation_title}</h2>
              <p className="text-gray-700 mb-4">{t.detective_animation_desc}</p>
              <div className="w-full h-80 relative overflow-hidden rounded-lg bg-gray-800 border-4 border-gray-700 shadow-2xl">
                <svg viewBox="0 0 800 400" className="w-full h-full">
                  {/* Background */}
                  <rect width="800" height="400" fill="url(#night-sky)" />
                  <defs>
                    <radialGradient id="night-sky" cx="50%" cy="50%" r="50%">
                      <stop offset="0%" stopColor="#0d1a26" />
                      <stop offset="100%" stopColor="#000000" />
                    </radialGradient>
                  </defs>

                  {/* Detective */}
                  <motion.g
                    initial={{ x: 50, y: 200 }}
                    animate={{ x: [50, 700, 50], y: [200, 210, 200] }}
                    transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
                  >
                    {/* Hat */}
                    <path d="M 50 100 Q 75 80 100 100 L 110 105 L 40 105 Z" fill="#4a3b2a" />
                    {/* Body */}
                    <path d="M 60 105 L 90 105 L 85 150 L 65 150 Z" fill="#6b5b4a" />
                    {/* Magnifying Glass */}
                    <circle cx="120" cy="110" r="20" fill="none" stroke="#c0c0c0" strokeWidth="5" />
                    <line x1="135" y1="125" x2="150" y2="140" stroke="#c0c0c0" strokeWidth="5" />
                  </motion.g>

                  {/* Bugs */}
                  {[
                    { cx: 200, cy: 300, r: 10, color: "#f44336" },
                    { cx: 400, cy: 150, r: 8, color: "#ff9800" },
                    { cx: 600, cy: 250, r: 12, color: "#4caf50" },
                  ].map((bug, i) => (
                    <motion.g
                      key={i}
                      whileHover={{ scale: 1.5, rotate: 15 }}
                      className="cursor-pointer"
                    >
                      <motion.circle
                        cx={bug.cx}
                        cy={bug.cy}
                        r={bug.r}
                        fill={bug.color}
                        animate={{
                          cx: bug.cx + (Math.random() - 0.5) * 50,
                          cy: bug.cy + (Math.random() - 0.5) * 50,
                        }}
                        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                      />
                    </motion.g>
                  ))}
                  
                  {/* Footprints */}
                  <motion.g
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 2, duration: 2 }}
                  >
                    <path d="M 100 350 Q 110 360 120 350 T 140 350" fill="#ffffff" opacity="0.1" />
                    <path d="M 180 340 Q 190 350 200 340 T 220 340" fill="#ffffff" opacity="0.1" />
                    <path d="M 260 355 Q 270 365 280 355 T 300 355" fill="#ffffff" opacity="0.1" />
                  </motion.g>
                </svg>
              </div>
              <p className="text-xs text-slate-500 mt-2"><i>{t.detective_animation_tip}</i></p>
            </motion.div>

            {/* Testing Types Section */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="mb-6"
            >
              <h2 className="text-2xl sm:text-3xl font-bold text-center text-gray-800 mb-6">{t.testing_types_title}</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {t.testing_types.map((type, index) => (
                  <div key={index} className="bg-gray-100 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
                    <h3 className="font-bold text-xl text-gray-900 mb-2">{type.name}</h3>
                    <p className="text-base text-gray-700 mt-1">{type.description}</p>
                    <p className="text-sm text-gray-600 mt-4 p-2 bg-gray-200 rounded"><em><strong>Example:</strong> {type.example}</em></p>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Distinction Table */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="mb-6"
            >
              <h2 className="text-2xl sm:text-3xl font-bold text-center text-gray-800 mb-6">{t.distinction_title}</h2>
              <div className="overflow-x-auto rounded-lg shadow-md">
                <table className="w-full min-w-max divide-y divide-gray-200">
                  <thead className="bg-gray-200">
                    <tr>
                      <th className="px-6 py-3 text-left text-sm font-medium text-gray-600 uppercase tracking-wider">{t.distinction[0].aspect}</th>
                      <th className="px-6 py-3 text-left text-sm font-medium text-gray-600 uppercase tracking-wider">Testing</th>
                      <th className="px-6 py-3 text-left text-sm font-medium text-gray-600 uppercase tracking-wider">Debugging</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {t.distinction.map((item, index) => (
                      <tr key={index} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">{item.aspect}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-gray-700">{item.testing}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-gray-700">{item.debugging}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </motion.div>

            {/* Interactive Simulations */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-10">
              {/* Spot the Bug */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="bg-green-50 p-6 rounded-lg shadow-inner"
              >
                <h2 className="text-xl sm:text-2xl font-semibold text-green-800 mb-3">{t.interactive_title}</h2>
                <p className="text-gray-700 mb-4">{t.interactive_desc}</p>
                <div className="bg-gray-900 text-white p-4 rounded-lg mb-4 overflow-x-auto">
                  <pre><code>{t.code_snippet}</code></pre>
                </div>
                <button
                  onClick={runTests}
                  className="flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg shadow transition"
                >
                  <FaPlay />
                  {t.run_tests_button}
                </button>
                {testResults && (
                  <div className="mt-4 space-y-2">
                    <h3 className="text-lg font-semibold text-gray-800">{t.test_results_title}</h3>
                    <div className={`flex items-center gap-2 p-3 rounded ${testResults.test1 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                      {testResults.test1 ? <FaCheckCircle /> : <FaTimesCircle />}
                      <span>{t.test_case_1} - {testResults.test1 ? 'Passed' : 'Failed'}</span>
                    </div>
                    <div className={`flex items-center gap-2 p-3 mt-2 rounded ${testResults.test2 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                      {testResults.test2 ? <FaCheckCircle /> : <FaTimesCircle />}
                      <span>{t.test_case_2} - {testResults.test2 ? 'Passed' : 'Failed'}</span>
                    </div>
                  </div>
                )}
              </motion.div>

              {/* UI & Edge Case Testing */}
              <div className="space-y-8">
                {/* UI Testing */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 }}
                  className="bg-yellow-50 p-6 rounded-lg shadow-inner"
                >
                  <h2 className="text-xl sm:text-2xl font-semibold text-yellow-800 mb-3">{t.ui_testing_title}</h2>
                  <p className="text-gray-700 mb-4">{t.ui_testing_desc}</p>
                  <button
                    onClick={testUi}
                    className={`px-4 py-2 rounded-lg shadow transition ${isButtonClicked ? 'bg-green-500' : 'bg-blue-500'} text-white`}
                  >
                    {t.ui_button_text}
                  </button>
                  {uiTestResult && (
                    <div className="mt-4 flex items-center gap-2 text-green-800">
                      <FaCheckCircle />
                      <span>{uiTestResult}</span>
                    </div>
                  )}
                </motion.div>

                {/* Edge Case Testing */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 }}
                  className="bg-purple-50 p-6 rounded-lg shadow-inner"
                >
                  <h2 className="text-xl sm:text-2xl font-semibold text-purple-800 mb-3">{t.edge_case_title}</h2>
                  <p className="text-gray-700 mb-4">{t.edge_case_desc}</p>
                  <div className="flex flex-col sm:flex-row items-center gap-2">
                    <input
                      type="text"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      placeholder={t.edge_case_input_placeholder}
                      className="border border-gray-300 p-2 rounded-lg w-full"
                    />
                    <button
                      onClick={testEdgeCase}
                      className="flex items-center gap-2 px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg shadow transition w-full sm:w-auto"
                    >
                      <FaPlay />
                      {t.edge_case_test_button}
                    </button>
                  </div>
                  {edgeCaseResult && (
                    <div className={`mt-4 flex items-center gap-2 p-3 rounded ${edgeCaseResult.startsWith('Success') ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                      {edgeCaseResult.startsWith('Success') ? <FaCheckCircle /> : <FaTimesCircle />}
                      <span>{edgeCaseResult}</span>
                    </div>
                  )}
                </motion.div>
              </div>
            </div>

          </div>

          <div className="w-full flex justify-between items-center mt-10 p-4 bg-gray-100 rounded-lg shadow-md">
            <button
              onClick={() => navigate('/module4/version-control')}
              className="flex items-center gap-2 px-4 py-2 bg-purple-200 hover:bg-purple-300 text-purple-900 rounded-lg shadow transition"
            >
              <FaArrowLeft />
              {t.previous}
            </button>
            <button
              onClick={() => navigate('/module4/security')}
              className="flex items-center gap-2 px-4 py-2 bg-green-200 hover:bg-green-300 text-green-900 rounded-lg shadow transition"
            >
              {t.next}
              <FaArrowRight />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DebuggingTestingModule;