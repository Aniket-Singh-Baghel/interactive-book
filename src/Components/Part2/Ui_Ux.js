import React, { useState, useRef, useEffect } from "react";
import { motion}  from "framer-motion";
import { FaHome, FaArrowLeft, FaArrowRight, FaPaintBrush } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";

// Content object for multilingual support
const content = {
  en: {
    title: "UI & UX — The Magic of Design",
    subtitle: "This interactive guide explains the difference between UI (look) and UX (feel-the experience), with delightful animations and practical examples that make the ideas stick.",
    whatIsUiVsUx: "What is UI vs UX?",
    uiDefinition: "<strong>UI (User Interface)</strong> is the <strong>look</strong> — the visual language, typography, color, spacing and the micro-interactions that make your product inviting.",
    uxDefinition: "<strong>UX (User Experience)</strong> is the <strong>feel</strong> — overall journey how the product behaves, how easy it is to achieve goals, the emotional arc from first touch to mastery.",
    playfulAnalogy: "A playful analogy",
    analogyText: "Imagine a joke printed on a beautiful card:",
    analogyUI: "<strong>UI</strong>: the design of the punchline card — fonts, color, the way the punchline is revealed.",
    analogyUX: "<strong>UX</strong>: whether the joke makes you laugh, how surprising and satisfying the reveal is, and whether you'd tell it again.",
    demoHint: "Try the demo below to see how UI can transform the same functionality (UX) into a delightful or frustrating experience.",
    whyBothMatter: "Why both matter",
    whyBothMatterText: "Great UI draws people in; great UX keeps them coming back. Design teams measure both: UI with visual polish and consistency; UX with task success rates, time-on-task, and emotional feedback.",
    uiVsUxTitle: "UI vs. UX: Which is More Important?",
    uiVsUxText: "This is a classic question, but it's like asking what's more important for a car: the engine or the steering wheel? You need both to have a functional and enjoyable ride. <strong>A beautiful car that doesn't run (great UI, terrible UX) is useless. A car that runs perfectly but is uncomfortable and difficult to control (great UX, terrible UI) is a frustrating experience.</strong> The best products have a seamless integration of both.",
    quickTakeaways: "Quick takeaways",
    takeaway1: "UI = clarity, consistency, hierarchy",
    takeaway2: "UX = ease, delight, accessibility",
    takeaway3: "Microinteractions matter",
    takeaway4: "Test early and often",
    microinteractionsTitle: "Microinteractions & accessibility",
    microinteractionsText: "Microinteractions (button presses, loading states, subtle motion) are the heartbeat of delightful UX. Always pair them with accessibility — motion should be respectful: prefer reduced-motion settings in production.",
    uxFlowTitle: "A compact UX flow (how a good experience is built)",
    uxFlowStep1: "Research",
    uxFlowStep1Desc: "This is the foundation. It involves user interviews, surveys, and competitive analysis to deeply understand who the users are, what they need, and what their frustrations are with existing solutions. Personas and user journey maps are common outputs.",
    uxFlowStep2: "Design (UI)",
    uxFlowStep2Desc: "Once the user's needs are clear, the design phase begins. This includes creating wireframes (low-fidelity blueprints), mockups (high-fidelity visual designs), and defining the entire visual identity—colors, fonts, and iconography. This is where the product's look and feel comes to life.",
    uxFlowStep3: "Prototype & Test",
    uxFlowStep3Desc: "Before writing a single line of production code, designers create interactive prototypes. These are tested with real users to identify usability issues. This iterative cycle of feedback and refinement is crucial for catching problems early and ensuring the final product is intuitive.",
    uxFlowStep4: "Measure & Evolve",
    uxFlowStep4Desc: "The launch is just the beginning. After release, the team uses analytics tools to track user behavior, gathers feedback through surveys and support tickets, and conducts A/B tests to continuously improve the experience. The product evolves based on real-world data.",
    visualExampleTitle: "UI in Action: A Visual Demonstration",
    visualExampleText: "Good UI is invisible, but bad UI is unforgettable. Below is an interactive example. Toggle between 'Good' and 'Bad' UI to see how much of a difference it makes. The functionality (the UX) remains the same, but the experience is worlds apart.",
    goodUITab: "Good UI",
    badUITab: "Bad UI",
    formTitle: "Sign Up",
    formNamePlaceholder: "Enter your name",
    formEmailPlaceholder: "Enter your email",
    formSubmitButton: "Join Now",
    checklistTitle: "Checklist (quick)",
    checklistItem1: "✅ <strong>Visual hierarchy is clear:</strong> The most important elements on the page should stand out. Use size, color, and placement to guide the user's eye.",
    checklistItem2: "✅ <strong>Buttons and CTAs are predictable:</strong> Buttons should look like buttons. Calls to action (CTAs) should be clearly labeled and tell the user exactly what will happen when they click.",
    checklistItem3: "✅ <strong>Feedback on every action:</strong> The user should always know what's happening. Provide visual feedback for clicks, loading states, and errors.",
    checklistItem4: "✅ <strong>Motion respects reduced-motion prefs:</strong> Animations should be smooth and meaningful, not distracting. Always respect a user's choice to reduce motion in their system settings.",
    checklistItem5: "✅ <strong>Accessibility (contrast, keyboard, screen reader):</strong> Design for everyone. Ensure text has sufficient color contrast, all functionality is accessible with a keyboard, and the page is navigable with a screen reader.",
    home: "Home",
    previous: "Previous",
    next: "Next",
  },
  hi: {
    title: "UI और UX - डिजाइन का जादू",
    subtitle: "यह अध्याय UI (Look) और UX (Feel) के बीच का अंतर सरल भाषा में समझाता है, ताकि आप जान सकें कि किसी प्रोडक्ट का रूप-रंग क्या होता है और उसका उपयोग करते समय कैसा अनुभव मिलता है।",
    whatIsUiVsUx: "UI बनाम UX क्या है?",
    uiDefinition: "<strong>UI (यूजर इंटरफेस)</strong> <strong>लुक</strong> - विज़ुअल लैंग्वेज, टाइपोग्राफी, रंग, स्पेसिंग और माइक्रो-इंटरेक्शन जो आपके उत्पाद को आकर्षक बनाते हैं।",
    uxDefinition: "<strong>UX (यूजर एक्सपीरियंस)</strong> <strong>फील</strong> समग्र यात्रा है - उत्पाद कैसे व्यवहार करता है, लक्ष्यों को प्राप्त करना कितना आसान है, पहले स्पर्श से निपुणता तक भावनात्मक चाप।",
    playfulAnalogy: "एक चंचल सादृश्य",
    analogyText: "एक सुंदर कार्ड पर छपे एक चुटकुले की कल्पना करें:",
    analogyUI: "<strong>UI</strong>: पंचलाइन कार्ड का डिज़ाइन — फ़ॉन्ट, रंग, जिस तरह से पंचलाइन सामने आती है।",
    analogyUX: "<strong>UX</strong>: क्या चुटकुला आपको हंसाता है, खुलासा कितना आश्चर्यजनक और संतोषजनक है, और क्या आप इसे फिर से बताएंगे।",
    demoHint: "नीचे दिए गए डेमो को आज़माएं ताकि देखें कि UI कैसे समान कार्यक्षमता (UX) को एक सुखद या निराशाजनक अनुभव में बदल सकता है।",
    whyBothMatter: "दोनों क्यों मायने रखते हैं",
    whyBothMatterText: "शानदार UI लोगों को आकर्षित करता है; शानदार UX उन्हें वापस लाता रहता है। डिज़ाइन टीमें दोनों को मापती हैं: UI को विज़ुअल पॉलिश और स्थिरता के साथ; UX को कार्य सफलता दर, कार्य-पर-समय और भावनात्मक प्रतिक्रिया के साथ।",
    uiVsUxTitle: "UI बनाम UX: कौन अधिक महत्वपूर्ण है?",
    uiVsUxText: "यह एक क्लासिक सवाल है, लेकिन यह पूछने जैसा है कि कार के लिए क्या अधिक महत्वपूर्ण है: इंजन या स्टीयरिंग व्हील? आपको एक कार्यात्मक और सुखद सवारी के लिए दोनों की आवश्यकता है। <strong>एक सुंदर कार जो नहीं चलती (शानदार UI, बेढंगा UX) बेकार है। एक कार जो पूरी तरह से चलती है लेकिन असहज और नियंत्रित करने में मुश्किल है (शानदार UX, बेढंगा UI) एक निराशाजनक अनुभव है।</strong> सबसे अच्छे उत्पादों में दोनों का एक सहज एकीकरण होता है।",
    quickTakeaways: "त्वरित सीख",
    takeaway1: "UI = स्पष्टता, संगति, क्रमबद्धता",
    takeaway2: "UX = आसानी, आनंद, पहुंच",
    takeaway3: "माइक्रोइंटरेक्शन मायने रखते हैं",
    takeaway4: "जल्दी और अक्सर परीक्षण करें",
    microinteractionsTitle: "माइक्रोइंटरेक्शन और पहुंच",
    microinteractionsText: "माइक्रोइंटरेक्शन (बटन प्रेस, लोडिंग स्टेट्स, सूक्ष्म गति) रमणीय UX की धड़कन हैं। हमेशा उन्हें पहुंच के साथ जोड़ें - गति सम्मानजनक होनी चाहिए: उत्पादन में कम-गति वाली प्राथमिकताओं को प्राथमिकता दें।",
    uxFlowTitle: "एक कॉम्पैक्ट UX प्रवाह (एक अच्छा अनुभव कैसे बनाया जाता है)",
    uxFlowStep1: "अनुसंधान",
    uxFlowStep1Desc: "यह नींव है। इसमें उपयोगकर्ता साक्षात्कार, सर्वेक्षण और प्रतिस्पर्धी विश्लेषण शामिल है ताकि यह गहराई से समझा जा सके कि उपयोगकर्ता कौन हैं, उन्हें क्या चाहिए, और मौजूदा समाधानों के साथ उनकी निराशा क्या है। व्यक्ति और उपयोगकर्ता यात्रा मानचित्र सामान्य आउटपुट हैं।",
    uxFlowStep2: "डिजाइन (UI)",
    uxFlowStep2Desc: "एक बार जब उपयोगकर्ता की ज़रूरतें स्पष्ट हो जाती हैं, तो डिज़ाइन चरण शुरू होता है। इसमें वायरफ्रेम (कम-निष्ठा वाले ब्लूप्रिंट), मॉकअप (उच्च-निष्ठा वाले विज़ुअल डिज़ाइन) बनाना और पूरी विज़ुअल पहचान को परिभाषित करना शामिल है - रंग, फ़ॉन्ट और आइकनोग्राफी। यहीं पर उत्पाद का रूप और अनुभव जीवंत होता है।",
    uxFlowStep3: "प्रोटोटाइप और परीक्षण",
    uxFlowStep3Desc: "उत्पादन कोड की एक भी पंक्ति लिखने से पहले, डिजाइनर इंटरैक्टिव प्रोटोटाइप बनाते हैं। उपयोगिता संबंधी समस्याओं की पहचान करने के लिए वास्तविक उपयोगकर्ताओं के साथ इनका परीक्षण किया जाता है। फीडबैक और शोधन का यह पुनरावृत्त चक्र समस्याओं को जल्दी पकड़ने और यह सुनिश्चित करने के लिए महत्वपूर्ण है कि अंतिम उत्पाद सहज है।",
    uxFlowStep4: "मापें और विकसित करें",
    uxFlowStep4Desc: "लॉन्च सिर्फ शुरुआत है। रिलीज के बाद, टीम उपयोगकर्ता के व्यवहार को ट्रैक करने के लिए एनालिटिक्स टूल का उपयोग करती है, सर्वेक्षण और समर्थन टिकटों के माध्यम से प्रतिक्रिया एकत्र करती है, और अनुभव को लगातार बेहतर बनाने के लिए ए / बी परीक्षण करती है। उत्पाद वास्तविक दुनिया के डेटा के आधार पर विकसित होता है।",
    visualExampleTitle: "UI एक्शन में: एक विज़ुअल प्रदर्शन",
    visualExampleText: "अच्छा UI अदृश्य होता है, लेकिन बुरा UI अविस्मरणीय होता है। नीचे एक इंटरैक्टिव उदाहरण है। 'अच्छा' और 'बुरा' UI के बीच टॉगल करके देखें कि यह कितना अंतर डालता है। ध्यान रहे, कार्यक्षमता (क्या काम होता है) वही रहती है, लेकिन अनुभव (कैसा महसूस होता है) पूरी तरह बदल जाता है।",
    goodUITab: "अच्छा UI",
    badUITab: "बुरा UI",
    formTitle: "साइन अप करें",
    formNamePlaceholder: "अपना नाम दर्ज करें",
    formEmailPlaceholder: "अपना ईमेल दर्ज करें",
    formSubmitButton: "अभी शामिल हों",
    checklistTitle: "चेकलिस्ट (त्वरित)",
    checklistItem1: "✅ <strong>दृश्य पदानुक्रम स्पष्ट है:</strong> पृष्ठ पर सबसे महत्वपूर्ण तत्व बाहर खड़े होने चाहिए। उपयोगकर्ता की नजर को निर्देशित करने के लिए आकार, रंग और प्लेसमेंट का उपयोग करें।",
    checklistItem2: "✅ <strong>बटन और सीटीए पूर्वानुमानित हैं:</strong> बटन बटन की तरह दिखने चाहिए। कॉल टू एक्शन (सीटीए) को स्पष्ट रूप से लेबल किया जाना चाहिए और उपयोगकर्ता को यह बताना चाहिए कि क्लिक करने पर वास्तव में क्या होगा।",
    checklistItem3: "✅ <strong>हर क्रिया पर प्रतिक्रिया:</strong> उपयोगकर्ता को हमेशा पता होना चाहिए कि क्या हो रहा है। क्लिक, लोडिंग स्थितियों और त्रुटियों के लिए दृश्य प्रतिक्रिया प्रदान करें।",
    checklistItem4: "✅ <strong>गति कम-गति वरीयताओं का सम्मान करती है:</strong> एनिमेशन सहज और सार्थक होने चाहिए, ध्यान भंग करने वाले नहीं। हमेशा अपने सिस्टम सेटिंग्स में गति को कम करने के लिए उपयोगकर्ता की पसंद का सम्मान करें।",
    checklistItem5: "✅ <strong>पहुंच (कंट्रास्ट, कीबोर्ड, स्क्रीन रीडर):</strong> सभी के लिए डिज़ाइन करें। सुनिश्चित करें कि टेक्स्ट में पर्याप्त रंग कंट्रास्ट है, सभी कार्यक्षमता कीबोर्ड के साथ सुलभ है, और पृष्ठ स्क्रीन रीडर के साथ नेविगेट करने योग्य है।",
    home: "होम",
    previous: "पिछला",
    next: "अगला",
  }
};

export default function UiUx() {
  const [lang, setLang] = useState("en");
  const [uiVariant, setUiVariant] = useState("good");
  const contentRef = useRef(null);
  const navigate = useNavigate();
  const t = content[lang];

  useEffect(() => {
    const handleKeyDown = (event) => {
      if ((event.metaKey || event.ctrlKey) && event.key === 'k') {
        event.preventDefault();
        setLang(prevLang => (prevLang === 'en' ? 'hi' : 'en'));
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const container = {
    hidden: { opacity: 0, y: 12 },
    show: { opacity: 1, y: 0, transition: { staggerChildren: 0.06 } },
  };

  const fadeUp = {
    hidden: { opacity: 0, y: 8 },
    show: { opacity: 1, y: 0 },
  };

  return (
    <main className="min-h-screen transition-colors duration-500 bg-slate-50 text-slate-900">
      <header className="max-w-6xl mx-auto px-6 py-8 relative z-10">
        <div className="flex items-center justify-between">
          <Link
            to="/parts/prt2"
            className="inline-flex items-center px-4 py-2 bg-white rounded-full shadow-md border border-gray-200 hover:bg-gray-100 transition"
          >
            <FaHome className="mr-2 text-lg text-sky-600" />
            {t.home}
          </Link>

          <div className="flex space-x-2">
            <button
                onClick={() => setLang("en")}
                className={`px-3 py-1 rounded-lg border font-semibold ${lang === "en" ? "bg-sky-600 text-white border-sky-600" : "bg-white text-gray-700 border-gray-300"} transition`}
            >
                EN
            </button>
            <button
                onClick={() => setLang("hi")}
                className={`px-3 py-1 rounded-lg border font-semibold ${lang === "hi" ? "bg-sky-600 text-white border-sky-600" : "bg-white text-gray-700 border-gray-300"} transition`}
            >
                हिं
            </button>
          </div>
        </div>
        <div className="text-center mt-8">
            <h1 className="text-3xl sm:text-4xl font-extrabold leading-tight tracking-tight text-indigo-600 flex items-center justify-center gap-3">
              <FaPaintBrush /> {t.title}
            </h1>
            <p className="mt-2 text-sm sm:text-base text-slate-600 max-w-2xl mx-auto">
              {t.subtitle}
            </p>
        </div>
      </header>

      <section ref={contentRef} className="max-w-6xl mx-auto px-6 pb-24 relative z-10">
        <motion.div initial="hidden" animate="show" variants={container} className="grid gap-8 md:grid-cols-1">
          {/* Left column: Definitions + Analogy + Demo */}
          <motion.article variants={fadeUp} className="space-y-6">
            <div className="p-6 rounded-2xl shadow-lg bg-white backdrop-blur-sm">
              <h2 className="text-xl font-bold">{t.whatIsUiVsUx}</h2>
              <p className="mt-3 text-slate-600" dangerouslySetInnerHTML={{ __html: t.uiDefinition }} />
              <p className="mt-2 text-slate-600" dangerouslySetInnerHTML={{ __html: t.uxDefinition }} />
            </div>

            <div className="p-6 rounded-2xl shadow-lg bg-indigo-50">
              <h3 className="font-semibold text-lg">{t.playfulAnalogy}</h3>
              <p className="mt-2 text-slate-700">{t.analogyText}</p>
              <ul className="mt-3 ml-6 list-disc text-slate-700">
                <li dangerouslySetInnerHTML={{ __html: t.analogyUI }} />
                <li dangerouslySetInnerHTML={{ __html: t.analogyUX }} />
              </ul>
              <p className="mt-3 text-sm text-slate-600">{t.demoHint}</p>
            </div>

            <div className="p-6 rounded-2xl shadow-lg bg-white">
                <h3 className="font-semibold text-lg">{t.visualExampleTitle}</h3>
                <p className="mt-2 text-slate-600">{t.visualExampleText}</p>
                <div className="mt-4 flex space-x-2">
                    <button
                    onClick={() => setUiVariant("good")}
                    className={`px-4 py-2 rounded-lg font-semibold ${
                        uiVariant === "good"
                        ? "bg-green-500 text-white"
                        : "bg-gray-200 text-gray-700"
                    }`}
                    >
                    {t.goodUITab}
                    </button>
                    <button
                    onClick={() => setUiVariant("bad")}
                    className={`px-4 py-2 rounded-lg font-semibold ${
                        uiVariant === "bad"
                        ? "bg-red-500 text-white"
                        : "bg-gray-200 text-gray-700"
                    }`}
                    >
                    {t.badUITab}
                    </button>
                </div>
                <div
                    className={`mt-4 p-6 rounded-lg border ${
                    uiVariant === "good"
                        ? "bg-white border-gray-200"
                        : "bg-yellow-100 border-yellow-400"
                    }`}
                >
                    <h4
                    className={`font-bold text-lg ${
                        uiVariant === "bad" ? "text-red-700 font-serif" : "text-gray-800"
                    }`}
                    >
                    {t.formTitle}
                    </h4>
                    <div className="mt-4 space-y-4">
                    <input
                        type="text"
                        placeholder={t.formNamePlaceholder}
                        className={`w-full p-2 rounded border ${
                        uiVariant === "bad"
                            ? "border-red-500 bg-red-100 text-xs"
                                                        : "border-gray-300"
                        }`}
                    />
                    <input
                        type="email"
                        placeholder={t.formEmailPlaceholder}
                        className={`w-full p-2 rounded border ${
                        uiVariant === "bad"
                            ? "border-purple-500 bg-purple-100 italic"
                            : "border-gray-300"
                        }`}
                    />
                    <button
                        className={`w-full py-2 rounded font-semibold ${
                        uiVariant === "bad"
                            ? "bg-blue-300 text-yellow-900"
                            : "bg-indigo-600 text-white"
                        }`}
                    >
                        {t.formSubmitButton}
                    </button>
                    </div>
                </div>
            </div>

            <div className="p-6 rounded-2xl shadow-lg bg-white">
              <h3 className="font-semibold text-lg">{t.whyBothMatter}</h3>
              <p className="mt-2 text-slate-600">{t.whyBothMatterText}</p>
            </div>

            <div className="p-6 rounded-2xl shadow-lg bg-yellow-50">
              <h3 className="text-lg font-semibold">{t.uiVsUxTitle}</h3>
              <p className="mt-2 text-slate-700" dangerouslySetInnerHTML={{ __html: t.uiVsUxText }} />
            </div>

            <div className="space-y-3">
              <h4 className="font-semibold">{t.quickTakeaways}</h4>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
                <li className="p-3 rounded-lg bg-emerald-100">{t.takeaway1}</li>
                <li className="p-3 rounded-lg bg-yellow-100">{t.takeaway2}</li>
                <li className="p-3 rounded-lg bg-purple-100">{t.takeaway3}</li>
                <li className="p-3 rounded-lg bg-sky-100">{t.takeaway4}</li>
              </ul>
            </div>
          </motion.article>
        </motion.div>

        {/* Timeline + Checklist */}
        <motion.div className="mt-12 grid gap-8 md:grid-cols-2">
          <motion.div variants={fadeUp} className="md:col-span-2 p-6 rounded-2xl shadow-lg bg-white">
            <h4 className="font-bold mb-4">{t.uxFlowTitle}</h4>
            <ol className="space-y-4">
              <li className="flex gap-4 items-start">
                <div className="mt-1 w-8 h-8 rounded-full bg-indigo-600 text-white flex items-center justify-center font-semibold">1</div>
                <div>
                  <div className="font-semibold">{t.uxFlowStep1}</div>
                  <div className="text-sm text-slate-600">{t.uxFlowStep1Desc}</div>
                </div>
              </li>
              <li className="flex gap-4 items-start">
                <div className="mt-1 w-8 h-8 rounded-full bg-amber-400 text-slate-900 flex items-center justify-center font-semibold">2</div>
                <div>
                  <div className="font-semibold">{t.uxFlowStep2}</div>
                  <div className="text-sm text-slate-600">{t.uxFlowStep2Desc}</div>
                </div>
              </li>
              <li className="flex gap-4 items-start">
                <div className="mt-1 w-8 h-8 rounded-full bg-emerald-400 text-slate-900 flex items-center justify-center font-semibold">3</div>
                <div>
                  <div className="font-semibold">{t.uxFlowStep3}</div>
                  <div className="text-sm text-slate-600">{t.uxFlowStep3Desc}</div>
                </div>
              </li>
              <li className="flex gap-4 items-start">
                <div className="mt-1 w-8 h-8 rounded-full bg-pink-400 text-white flex items-center justify-center font-semibold">4</div>
                <div>
                  <div className="font-semibold">{t.uxFlowStep4}</div>
                  <div className="text-sm text-slate-600">{t.uxFlowStep4Desc}</div>
                </div>
              </li>
            </ol>
          </motion.div>

          <motion.aside variants={fadeUp} className="md:col-span-2 p-6 rounded-2xl shadow-lg bg-white">
            <h5 className="font-bold mb-3">{t.checklistTitle}</h5>
            <ul className="text-sm space-y-2">
              <li dangerouslySetInnerHTML={{ __html: t.checklistItem1 }} />
              <li dangerouslySetInnerHTML={{ __html: t.checklistItem2 }} />
              <li dangerouslySetInnerHTML={{ __html: t.checklistItem3 }} />
              <li dangerouslySetInnerHTML={{ __html: t.checklistItem4 }} />
              <li dangerouslySetInnerHTML={{ __html: t.checklistItem5 }} />
            </ul>
          </motion.aside>
        </motion.div>
        <div className="w-full flex justify-between items-center mt-10 p-4 bg-gray-100 rounded-lg shadow-md">
            <button
            onClick={() => navigate('/module3/design-principles')}
            className="flex items-center gap-2 px-4 py-2 bg-purple-200 hover:bg-purple-300 text-purple-900 rounded-lg shadow transition"
            >
            <FaArrowLeft />
            {t.previous}
            </button>
            <button
            onClick={() => navigate('/module3/frontend')}
            className="flex items-center gap-2 px-4 py-2 bg-green-200 hover:bg-green-300 text-green-900 rounded-lg shadow transition"
            >
            {t.next}
            <FaArrowRight />
            </button>
        </div>
      </section>
    </main>
  );
}
