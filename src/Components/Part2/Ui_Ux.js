import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Smile } from "lucide-react";
import { FaHome, FaArrowLeft, FaArrowRight, FaPaintBrush } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";

// Content object for multilingual support
const content = {
  en: {
    title: "UI & UX — The Magic of Design",
    subtitle: "This interactive guide explains the difference between UI (look & feel) and UX (the experience), with delightful animations and practical examples that make the ideas stick.",
    whatIsUiVsUx: "What is UI vs UX?",
    uiDefinition: "<strong>UI (User Interface)</strong> is the look and feel — the visual language, typography, color, spacing and the micro-interactions that make your product inviting.",
    uxDefinition: "<strong>UX (User Experience)</strong> is the overall journey — how the product behaves, how easy it is to achieve goals, the emotional arc from first touch to mastery.",
    playfulAnalogy: "A playful analogy",
    analogyText: "Imagine a joke printed on a beautiful card:",
    analogyUI: "<strong>UI</strong>: the design of the punchline card — fonts, color, the way the punchline is revealed.",
    analogyUX: "<strong>UX</strong>: whether the joke makes you laugh, how surprising and satisfying the reveal is, and whether you'd tell it again.",
    demoHint: "The demo on the right is exactly that card — interact with it to feel the difference.",
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
    uxFlowStep1Desc: "Understand users: goals, pain points, context.",
    uxFlowStep2: "Design (UI)",
    uxFlowStep2Desc: "Visual language, components, responsive layouts.",
    uxFlowStep3: "Prototype & Test",
    uxFlowStep3Desc: "Rapid prototypes, usability testing, iterate fast.",
    uxFlowStep4: "Measure & Evolve",
    uxFlowStep4Desc: "Analytics, surveys, and continuous design improvements.",
    checklistTitle: "Checklist (quick)",
    checklistItem1: "✅ Visual hierarchy is clear",
    checklistItem2: "✅ Buttons and CTAs are predictable",
    checklistItem3: "✅ Feedback on every action",
    checklistItem4: "✅ Motion respects reduced-motion prefs",
    checklistItem5: "✅ Accessibility (contrast, keyboard, screen reader)",
    home: "Home",
    previous: "Previous",
    next: "Next",
  },
  hi: {
    title: "UI और UX - डिजाइन का जादू",
    subtitle: "यह इंटरैक्टिव गाइड UI (दिखने और महसूस करने का तरीका) और UX (अनुभव) के बीच के अंतर को समझाता है, जिसमें रमणीय एनिमेशन और व्यावहारिक उदाहरण हैं जो विचारों को टिकाऊ बनाते हैं।",
    whatIsUiVsUx: "UI बनाम UX क्या है?",
    uiDefinition: "<strong>UI (यूजर इंटरफेस)</strong> लुक और फील है - विज़ुअल लैंग्वेज, टाइपोग्राफी, रंग, स्पेसिंग और माइक्रो-इंटरेक्शन जो आपके उत्पाद को आकर्षक बनाते हैं।",
    uxDefinition: "<strong>UX (यूजर एक्सपीरियंस)</strong> समग्र यात्रा है - उत्पाद कैसे व्यवहार करता है, लक्ष्यों को प्राप्त करना कितना आसान है, पहले स्पर्श से निपुणता तक भावनात्मक चाप।",
    playfulAnalogy: "एक चंचल सादृश्य",
    analogyText: "एक सुंदर कार्ड पर छपे एक चुटकुले की कल्पना करें:",
    analogyUI: "<strong>UI</strong>: पंचलाइन कार्ड का डिज़ाइन — फ़ॉन्ट, रंग, जिस तरह से पंचलाइन सामने आती है।",
    analogyUX: "<strong>UX</strong>: क्या चुटकुला आपको हंसाता है, खुलासा कितना आश्चर्यजनक और संतोषजनक है, और क्या आप इसे फिर से बताएंगे।",
    demoHint: "दाईं ओर का डेमो ठीक वैसा ही कार्ड है - अंतर महसूस करने के लिए इसके साथ बातचीत करें।",
    whyBothMatter: "दोनों क्यों मायने रखते हैं",
    whyBothMatterText: "शानदार UI लोगों को आकर्षित करता है; शानदार UX उन्हें वापस लाता रहता है। डिज़ाइन टीमें दोनों को मापती हैं: UI को विज़ुअल पॉलिश और स्थिरता के साथ; UX को कार्य सफलता दर, कार्य-पर-समय और भावनात्मक प्रतिक्रिया के साथ।",
    uiVsUxTitle: "UI बनाम UX: कौन अधिक महत्वपूर्ण है?",
    uiVsUxText: "यह एक क्लासिक सवाल है, लेकिन यह पूछने जैसा है कि कार के लिए क्या अधिक महत्वपूर्ण है: इंजन या स्टीयरिंग व्हील? आपको एक कार्यात्मक और सुखद सवारी के लिए दोनों की आवश्यकता है। <strong>एक सुंदर कार जो नहीं चलती (शानदार UI, भयानक UX) बेकार है। एक कार जो पूरी तरह से चलती है लेकिन असहज और नियंत्रित करने में मुश्किल है (शानदार UX, भयानक UI) एक निराशाजनक अनुभव है।</strong> सबसे अच्छे उत्पादों में दोनों का एक सहज एकीकरण होता है।",
    quickTakeaways: "त्वरित सीख",
    takeaway1: "UI = स्पष्टता, संगति, पदानuक्रम",
    takeaway2: "UX = आसानी, आनंद, पहुंच",
    takeaway3: "माइक्रोइंटरेक्शन मायने रखते हैं",
    takeaway4: "जल्दी और अक्सर परीक्षण करें",
    microinteractionsTitle: "माइक्रोइंटरेक्शन और पहुंच",
    microinteractionsText: "माइक्रोइंटरेक्शन (बटन प्रेस, लोडिंग स्टेट्स, सूक्ष्म गति) रमणीय UX की धड़कन हैं। हमेशा उन्हें पहुंच के साथ जोड़ें - गति सम्मानजनक होनी चाहिए: उत्पादन में कम-गति वाली प्राथमिकताओं को प्राथमिकता दें।",
    uxFlowTitle: "एक कॉम्पैक्ट UX प्रवाह (एक अच्छा अनुभव कैसे बनाया जाता है)",
    uxFlowStep1: "अनुसंधान",
    uxFlowStep1Desc: "उपयोगकर्ताओं को समझें: लक्ष्य, दर्द बिंदु, संदर्भ।",
    uxFlowStep2: "डिजाइन (UI)",
    uxFlowStep2Desc: "विजुअल लैंग्वेज, कंपोनेंट्स, रिस्पॉन्सिव लेआउट।",
    uxFlowStep3: "प्रोटोटाइप और परीक्षण",
    uxFlowStep3Desc: "रैपिड प्रोटोटाइप, प्रयोज्य परीक्षण, तेजी से पुनरावृति।",
    uxFlowStep4: "मापें और विकसित करें",
    uxFlowStep4Desc: "एनालिटिक्स, सर्वेक्षण और निरंतर डिजाइन सुधार।",
    checklistTitle: "चेकलिस्ट (त्वरित)",
    checklistItem1: "✅ दृश्य पदानुक्रम स्पष्ट है",
    checklistItem2: "✅ बटन और सीटीए पूर्वानुमानित हैं",
    checklistItem3: "✅ हर क्रिया पर प्रतिक्रिया",
    checklistItem4: "✅ गति कम-गति वरीयताओं का सम्मान करती है",
    checklistItem5: "✅ पहुंच (कंट्रास्ट, कीबोर्ड, स्क्रीन रीडर)",
    home: "होम",
    previous: "पिछला",
    next: "अगला",
  }
};

export default function UiUx() {
  const [lang, setLang] = useState("en");
  const contentRef = useRef(null);
  const navigate = useNavigate();
  const t = content[lang];

  function scrollToContent() {
    contentRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

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
            to="/"
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

          <motion.aside variants={fadeUp} className="p-6 rounded-2xl shadow-lg bg-white">
            <h5 className="font-bold mb-3">{t.checklistTitle}</h5>
            <ul className="text-sm space-y-2">
              <li>{t.checklistItem1}</li>
              <li>{t.checklistItem2}</li>
              <li>{t.checklistItem3}</li>
              <li>{t.checklistItem4}</li>
              <li>{t.checklistItem5}</li>
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
