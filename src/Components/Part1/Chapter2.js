import React, { useState } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { FaHome, FaArrowLeft, FaArrowRight } from "react-icons/fa";

const content = {
    en: {
        home: "Home",
        title: "The Main Parts (Hardware) ⚙️",
        subtitle: "A computer is made of many physical parts. These are called <strong>hardware</strong>. Below are the key parts with cartoon visuals and simple analogies to help students remember.",
        memory_trick_title: "Memory Trick — Robot Friend 🤖",
        memory_trick_text: "Brain = CPU, Notepad = RAM, Cupboard = Storage, Eyes = Monitor, Hands = Keyboard, Pointer = Mouse, Voice = Speakers",
        memory_trick_tip: "Say it out loud with the kids — helps it stick! 🎯",
        fun_activities_title: "Fun Activities to Remember",
        activity1: "<strong>Match Game:</strong> Draw a robot and label its parts with hardware names.",
        activity2: "<strong>Explain in One Sentence:</strong> Kids say what each part does in their own words.",
        activity3: "<strong>Draw & Colour:</strong> Recreate the cartoon visuals and stick them on a poster.",
        previous: "Previous",
        next: "Next",
        parts: [
            { emoji: "🧠", title: "CPU — The Brain", desc: "Controls all actions, makes decisions and performs calculations." },
            { emoji: "🗒️", title: "RAM — Short-Term Memory", desc: "Temporary working space. Fast, but forgets when power is off." },
            { emoji: "📦", title: "Storage — Long-Term Memory", desc: "Stores files, photos, and programs permanently." },
            { emoji: "🖥️", title: "Monitor — The Eyes", desc: "Shows you what the computer is doing (text, images, videos)." },
            { emoji: "⌨️", title: "Keyboard — The Hands", desc: "Type letters and numbers; give commands." },
            { emoji: "🖱️", title: "Mouse — The Pointer", desc: "Point, click, drag — helps you interact with the screen." },
            { emoji: "🔊", title: "Speakers — The Voice", desc: "Plays audio: music, alerts, and sounds from programs." }
        ]
    },
    hi: {
        home: "होम",
        title: "मुख्य भाग (हार्डवेयर) ⚙️",
        subtitle: "एक कंप्यूटर कई भौतिक भागों से बना होता है। इन्हें <strong>हार्डवेयर</strong> कहा जाता है। नीचे छात्रों को याद रखने में मदद करने के लिए कार्टून दृश्यों और सरल उपमाओं के साथ प्रमुख भाग दिए गए हैं।",
        memory_trick_title: "याद रखने की ट्रिक - रोबोट दोस्त 🤖",
        memory_trick_text: "दिमाग = सीपीयू, नोटपैड = रैम, अलमारी = स्टोरेज, आंखें = मॉनिटर, हाथ = कीबोर्ड, पॉइंटर = माउस, आवाज = स्पीकर",
        memory_trick_tip: "बच्चों के साथ इसे जोर से कहें - यह याद रखने में मदद करता है! 🎯",
        fun_activities_title: "याद रखने के लिए मजेदार गतिविधियाँ",
        activity1: "<strong>मैच गेम:</strong> एक रोबोट बनाएं और उसके हिस्सों पर हार्डवेयर के नाम लेबल करें।",
        activity2: "<strong>एक वाक्य में समझाएं:</strong> बच्चे अपने शब्दों में बताएं कि प्रत्येक भाग क्या करता है।",
        activity3: "<strong>ड्रॉ और कलर:</strong> कार्टून दृश्यों को फिर से बनाएं और उन्हें एक पोस्टर पर चिपकाएं।",
        previous: "पिछला",
        next: "अगला",
        parts: [
            { emoji: "🧠", title: "सीपीयू - दिमाग", desc: "सभी क्रियाओं को नियंत्रित करता है, निर्णय लेता है और गणना करता है।" },
            { emoji: "🗒️", title: "रैम - शॉर्ट-टर्म मेमोरी", desc: "अस्थायी कार्य स्थान। तेज़, लेकिन बिजली बंद होने पर भूल जाता है।" },
            { emoji: "📦", title: "स्टोरेज - लॉन्ग-टर्म मेमोरी", desc: "फ़ाइलों, फ़ोटो और प्रोग्राम को स्थायी रूप से संग्रहीत करता है।" },
            { emoji: "🖥️", title: "मॉनिटर - आंखें", desc: "आपको दिखाता है कि कंप्यूटर क्या कर रहा है (टेक्स्ट, चित्र, वीडियो)।" },
            { emoji: "⌨️", title: "कीबोर्ड - हाथ", desc: "अक्षर और संख्याएँ टाइप करें; आदेश दें।" },
            { emoji: "🖱️", title: "माउस - पॉइंटर", desc: "पॉइंट करें, क्लिक करें, खींचें - आपको स्क्रीन के साथ इंटरैक्ट करने में मदद करता है।" },
            { emoji: "🔊", title: "स्पीकर - आवाज", desc: "ऑडियो चलाता है: संगीत, अलर्ट और प्रोग्राम से ध्वनियाँ।" }
        ]
    }
};

const PartCard = ({ emoji, title, desc, visual }) => (
    <div className="bg-white rounded-2xl shadow-md p-5 hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300">
      <div className="flex items-center space-x-4">
        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-yellow-100 to-yellow-200 flex items-center justify-center text-3xl shadow-sm">
          <span aria-hidden>{emoji}</span>
        </div>
        <div>
          <h3 className="text-lg font-bold text-gray-800">{title}</h3>
          <p className="text-sm text-gray-600 mt-1">{desc}</p>
        </div>
      </div>
      <div className="mt-4 flex items-center justify-center">
        <div className="w-full max-w-xs">{visual}</div>
      </div>
    </div>
);

const CartoonCPU = () => ( <div className="p-4 rounded-xl bg-indigo-50 border-2 border-indigo-100"><svg viewBox="0 0 120 80" className="w-full h-28"><rect x="10" y="10" width="100" height="60" rx="8" fill="#EEF2FF" stroke="#C7D2FE" /><rect x="30" y="22" width="60" height="36" rx="4" fill="#4F46E5" /><text x="60" y="44" textAnchor="middle" fill="white" fontWeight="700" fontSize="10">CPU</text><g stroke="#C7D2FE" strokeWidth="2"><line x1="10" y1="20" x2="2" y2="20" /><line x1="10" y1="40" x2="2" y2="40" /><line x1="10" y1="60" x2="2" y2="60" /><line x1="110" y1="20" x2="118" y2="20" /><line x1="110" y1="40" x2="118" y2="40" /><line x1="110" y1="60" x2="118" y2="60" /></g></svg></div> );
const CartoonRAM = () => ( <div className="p-4 rounded-xl bg-yellow-50 border-2 border-yellow-100"><svg viewBox="0 0 120 60" className="w-full h-24"><rect x="8" y="12" width="104" height="36" rx="6" fill="#FFFBEB" stroke="#FDE68A" /><rect x="18" y="20" width="84" height="20" rx="3" fill="#F59E0B" /><text x="60" y="34" textAnchor="middle" fill="white" fontWeight="700" fontSize="9">RAM</text><g fill="#FDE68A"><rect x="12" y="48" width="8" height="6" rx="2" /><rect x="28" y="48" width="8" height="6" rx="2" /><rect x="44" y="48" width="8" height="6" rx="2" /><rect x="60" y="48" width="8" height="6" rx="2" /></g></svg></div> );
const CartoonStorage = () => ( <div className="p-4 rounded-xl bg-green-50 border-2 border-green-100"><svg viewBox="0 0 120 70" className="w-full h-28"><rect x="12" y="16" width="96" height="38" rx="8" fill="#ECFDF5" stroke="#BBF7D0" /><rect x="22" y="22" width="76" height="8" rx="3" fill="#10B981" /><rect x="22" y="34" width="76" height="8" rx="3" fill="#059669" /><text x="60" y="54" textAnchor="middle" fill="#065F46" fontWeight="700" fontSize="9">Storage (HDD / SSD)</text></svg></div> );
const CartoonMonitor = () => ( <div className="p-3 rounded-xl bg-sky-50 border-2 border-sky-100"><svg viewBox="0 0 120 80" className="w-full h-28"><rect x="12" y="12" rx="8" width="96" height="56" fill="#EFF6FF" stroke="#BFDBFE" /><rect x="22" y="22" width="76" height="34" rx="4" fill="#3B82F6" /><circle cx="60" cy="40" r="4" fill="#BFDBFE" /><rect x="46" y="66" width="28" height="6" rx="3" fill="#94A3B8" /></svg></div> );
const CartoonKeyboard = () => ( <div className="p-3 rounded-xl bg-pink-50 border-2 border-pink-100"><div className="w-full h-20 rounded-md bg-gradient-to-b from-pink-50 to-pink-100 p-3"><div className="grid grid-cols-8 gap-2">{Array.from({ length: 24 }).map((_, i) => ( <div key={i} className="h-4 rounded bg-white/90 shadow-inner" /> ))}</div></div></div> );
const CartoonMouse = () => ( <div className="p-3 rounded-xl bg-amber-50 border-2 border-amber-100"><svg viewBox="0 0 120 60" className="w-full h-20"><ellipse cx="60" cy="30" rx="40" ry="22" fill="#FFFBEB" stroke="#FDE68A" /><rect x="57" y="8" width="6" height="30" rx="3" fill="#FDE68A" /><text x="60" y="46" textAnchor="middle" fontSize="9" fill="#92400E" fontWeight="600">Mouse</text></svg></div> );
const CartoonSpeakers = () => ( <div className="p-3 rounded-xl bg-violet-50 border-2 border-violet-100"><div className="flex items-center justify-around"><div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center shadow">🔊</div><div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center shadow">♪</div></div></div> );

const visuals = [<CartoonCPU />, <CartoonRAM />, <CartoonStorage />, <CartoonMonitor />, <CartoonKeyboard />, <CartoonMouse />, <CartoonSpeakers />];

const Chapter2 = () => {
  const [lang, setLang] = useState('en');
  const navigate = useNavigate();
  const t = content[lang];

  return (
    <div className="p-4 sm:p-6 lg:p-8 min-h-screen bg-gradient-to-br from-blue-50 to-pink-50 font-sans">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center justify-between mb-8">
            <Link to="/parts/prt1" className="inline-flex items-center px-4 py-2 bg-white rounded-full shadow-md border border-gray-200 hover:bg-gray-100 transition">
                <FaHome className="mr-2 text-lg text-sky-600" />
                {t.home}
            </Link>
            <div className="flex space-x-2">
                <button onClick={() => setLang("en")} className={`px-3 py-1 rounded-lg border font-semibold ${lang === "en" ? "bg-sky-600 text-white border-sky-600" : "bg-white text-gray-700 border-gray-300"} transition`}>EN</button>
                <button onClick={() => setLang("hi")} className={`px-3 py-1 rounded-lg border font-semibold ${lang === "hi" ? "bg-sky-600 text-white border-sky-600" : "bg-white text-gray-700 border-gray-300"} transition`}>हिं</button>
            </div>
        </div>

        <header className="text-center mb-10">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-800"
          >
            {t.title}
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-gray-600 mt-2 max-w-3xl mx-auto text-sm sm:text-base lg:text-lg"
            dangerouslySetInnerHTML={{ __html: t.subtitle }}
          />
        </header>

        <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="bg-gradient-to-r from-indigo-50 to-pink-50 border-l-4 border-indigo-200 p-4 rounded-lg shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4 mb-8"
        >
          <div>
            <h3 className="font-bold text-indigo-700 text-base sm:text-lg">{t.memory_trick_title}</h3>
            <p className="text-sm text-gray-700">{t.memory_trick_text}</p>
          </div>
          <div className="text-sm text-gray-500 italic text-center sm:text-right">
            {t.memory_trick_tip}
          </div>
        </motion.div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {t.parts.map((part, index) => (
            <PartCard
              key={index}
              emoji={part.emoji}
              title={part.title}
              desc={part.desc}
              visual={visuals[index]}
            />
          ))}
        </div>

        <section className="mt-12 bg-gradient-to-r from-white to-slate-50 p-6 rounded-xl border border-gray-100 shadow-sm">
          <h3 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-4">{t.fun_activities_title}</h3>
          <ul className="list-disc pl-5 text-gray-700 space-y-2">
            <li dangerouslySetInnerHTML={{ __html: t.activity1 }} />
            <li dangerouslySetInnerHTML={{ __html: t.activity2 }} />
            <li dangerouslySetInnerHTML={{ __html: t.activity3 }} />
          </ul>
        </section>

        <div className="w-full flex justify-between items-center mt-10 p-4 bg-gray-100 rounded-lg shadow-md">
          <button
            onClick={() => navigate('/part1/what-is-computer')}
            className="flex items-center gap-2 px-4 py-2 bg-purple-200 hover:bg-purple-300 text-purple-900 rounded-lg shadow transition"
          >
            <FaArrowLeft />
            {t.previous}
          </button>
          <button
            onClick={() => navigate('/part1/cpu-brain')}
            className="flex items-center gap-2 px-4 py-2 bg-green-200 hover:bg-green-300 text-green-900 rounded-lg shadow transition"
          >
            {t.next}
            <FaArrowRight />
          </button>
        </div>
      </div>
    </div>
  );
};
export default Chapter2;
