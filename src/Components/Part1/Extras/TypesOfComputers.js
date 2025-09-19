import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaRocket,
  FaUniversity,
  FaIndustry,
  FaLaptopCode,
  FaGlobe,
  FaServer,
  FaMobileAlt,
  FaQuestionCircle,
  FaSync,
} from "react-icons/fa";


const CONTENT = {
  en: {
    heading: "Types of Computers",
    intro:
      "Computers come in many different shapes and sizes. Some are huge like a room 🚀, while others fit right into your pocket 📱. Let’s explore the different types of computers!",
    sections: {
      size: {
        title: "Types According to Size",
        subtitle: "Biggest → Smallest (let's compare!)",
        items: [
          {
            id: "super",
            title: "Supercomputers",
            short: "The fastest and largest computers in the world!",
            detail:
              "Used for huge tasks like predicting weather, space research, and discovering medicines. Imagine a giant brain that solves the hardest puzzles!",
            hook: "They can do millions of calculations in a single second!",
            icon: <FaRocket className="text-red-500 w-12 h-12" />,
            img: "https://cdn-icons-png.flaticon.com/512/4727/4727486.png",
          },
          {
            id: "mainframe",
            title: "Mainframe Computers",
            short: "Very large computers used by banks and big companies.",
            detail:
              "They store and process information for thousands of people at once — like a giant library of data that opens many books at the same time.",
            hook: "They help banks, railways and big companies manage tons of information!",
            icon: <FaUniversity className="text-purple-600 w-12 h-12" />,
            img: "https://cdn-icons-png.flaticon.com/512/1048/1048953.png",
          },
          {
            id: "mini",
            title: "Minicomputers",
            short: "Smaller than mainframes but still powerful.",
            detail:
              "Used in offices, factories, and schools to help many people work together. Think of it as a teacher's helper computer in a big school.",
            hook: "Good for medium-sized tasks and many users.",
            icon: <FaIndustry className="text-green-600 w-12 h-12" />,
            img: "https://cdn-icons-png.flaticon.com/512/1157/1157109.png",
          },
          {
            id: "micro",
            title: "Microcomputers (Personal Computers)",
            short: "The computers we use every day — laptops, tablets, desktops.",
            detail:
              "Perfect for learning, playing, drawing and exploring the internet. If you have a laptop or tablet, you already have a microcomputer!",
            hook: "Your home computer is a microcomputer!",
            icon: <FaLaptopCode className="text-sky-500 w-12 h-12" />,
            img: "https://cdn-icons-png.flaticon.com/512/2933/2933245.png",
          },
        ],
      },
      use: {
        title: "Types According to Use",
        items: [
          {
            id: "general",
            title: "General Purpose Computers",
            detail:
              "These can do many tasks — typing, drawing, playing games, or surfing the web. Examples: PC, Laptop.",
            icon: <FaGlobe className="text-indigo-500 w-10 h-10" />,
            analogy: "Like a swiss-army knife — useful for many things.",
          },
          {
            id: "special",
            title: "Special Purpose Computers",
            detail:
              "Made to do one job very well — for example, ATMs (for money), washing machines (to wash clothes), or traffic lights (to control road signals).",
            icon: <FaServer className="text-yellow-600 w-10 h-10" />,
            analogy: "Like a toaster — it only makes toast, but it does it great!",
          },
        ],
      },
      functionality: {
        title: "Types According to Functionality",
        items: [
          {
            id: "analog",
            title: "Analog Computers",
            detail:
              "Used for measuring real things such as speed, temperature and voltage. They work with continuous data. (Old but cool!)",
            icon: <FaGlobe className="text-emerald-600 w-10 h-10" />,
            example: "Example: old speed-measuring instruments.",
          },
          {
            id: "digital",
            title: "Digital Computers",
            detail:
              "The ones we use today — they work with numbers, images and words. Most modern computers are digital.",
            icon: <FaMobileAlt className="text-sky-600 w-10 h-10" />,
            example: "Example: smartphones, laptops.",
          },
          {
            id: "hybrid",
            title: "Hybrid Computers",
            detail:
              "A mix of analog and digital. Used in scientific labs and hospitals where both types of data are needed.",
            icon: <FaServer className="text-pink-600 w-10 h-10" />,
            example: "Example: hospital monitoring systems.",
          },
        ],
      },
    },
    serversNote:
      "Where do server computers occur? Servers can be small (like minicomputers) or very large (like mainframes). By use, they are special-purpose machines that share data with many users — web servers, mail servers, database servers and game servers.",
    funFact:
      "Did you know? The first computers were so big they could fill a whole room! Today, we can carry powerful computers in our pockets as smartphones. 📱",
    engagement: "Which type of computer do you use every day?",
    quiz: {
      q: "Which computer is used by banks to store information for thousands of people?",
      options: ["Microcomputer", "Mainframe", "Smartphone", "Tablet"],
      answer: 1,
    },
  },

  hi: {
    heading: "कंप्यूटर के प्रकार",
    intro:
      "कंप्यूटर कई आकार और प्रकार के होते हैं। कुछ कमरे जितने बड़े होते हैं 🚀, जबकि कुछ आपकी जेब में फिट हो जाते हैं 📱। आइए कंप्यूटर के प्रकार जानें!",
    sections: {
      size: {
        title: "आकार के अनुसार प्रकार",
        subtitle: "सबसे बड़े → सबसे छोटे (बड़े और छोटे मिलाकर देखें!)",
        items: [
          {
            id: "super",
            title: "सुपरकंप्यूटर",
            short: "दुनिया के सबसे तेज़ और सबसे बड़े कंप्यूटर!",
            detail:
              "बड़ा काम करने के लिए उपयोग होते हैं — जैसे मौसम का अनुमान, अंतरिक्ष अनुसंधान और दवाइयाँ खोजने में मदद। कल्पना कीजिए एक बहुत बड़ा दिमाग जो कठिन से कठिन प्रश्न हल करे!",
            hook: "ये एक सेकंड में लाखों हिसाब कर सकते हैं!",
            icon: <FaRocket className="text-red-500 w-12 h-12" />,
            img: "https://cdn-icons-png.flaticon.com/512/4727/4727486.png",
          },
          {
            id: "mainframe",
            title: "मेनफ्रेम कंप्यूटर",
            short: "बैंक और बड़ी कंपनियों द्वारा उपयोग किए जाने वाले बहुत बड़े कंप्यूटर।",
            detail:
              "ये हजारों लोगों की जानकारी एक साथ संभालते हैं — जैसे एक विशाल पुस्तकालय जो कई किताबें एक साथ खोलता है।",
            hook: "ये बैंक, रेलवे और बड़ी कंपनियों की मदद करते हैं!",
            icon: <FaUniversity className="text-purple-600 w-12 h-12" />,
            img: "https://cdn-icons-png.flaticon.com/512/1048/1048953.png",
          },
          {
            id: "mini",
            title: "मिनी कंप्यूटर",
            short: "मेनफ्रेम से छोटे पर फिर भी शक्तिशाली।",
            detail:
              "कार्यालयों, फैक्ट्रियों और स्कूलों में उपयोग होते हैं। इसे एक बड़े स्कूल में शिक्षक के सहायक की तरह समझें।",
            hook: "मध्यम आकार के कार्यों और कई उपयोगकर्ताओं के लिए अच्छे।",
            icon: <FaIndustry className="text-green-600 w-12 h-12" />,
            img: "https://cdn-icons-png.flaticon.com/512/1157/1157109.png",
          },
          {
            id: "micro",
            title: "माइक्रो कंप्यूटर (पर्सनल कंप्यूटर)",
            short: "वो कंप्यूटर जो हम रोज़ इस्तेमाल करते हैं — लैपटॉप, टैबलेट, डेस्कटॉप।",
            detail:
              "सीखने, खेल खेलने, चित्र बनाने और इंटरनेट खोजने के लिए उत्तम। अगर आपके पास लैपटॉप है, तो आपके पास माइक्रो कंप्यूटर है!",
            hook: "आपका घर का कंप्यूटर एक माइक्रो कंप्यूटर है!",
            icon: <FaLaptopCode className="text-sky-500 w-12 h-12" />,
            img: "https://cdn-icons-png.flaticon.com/512/2933/2933245.png",
          },
        ],
      },
      use: {
        title: "उपयोग के अनुसार प्रकार",
        items: [
          {
            id: "general",
            title: "जनरल पर्पज़ कंप्यूटर",
            detail:
              "ये कई काम कर सकते हैं — लिखना, चित्र बनाना, खेलना और इंटरनेट चलाना। उदाहरण: PC, Laptop।",
            icon: <FaGlobe className="text-indigo-500 w-10 h-10" />,
            analogy: "एक स्विस-आर्मी चाकू की तरह — कई कामों के लिए उपयोगी।",
          },
          {
            id: "special",
            title: "विशेष प्रयोजन कंप्यूटर",
            detail:
              "ये केवल एक काम के लिए बनाए जाते हैं — जैसे ATM (पैसे के लिए), वॉशिंग मशीन (कपड़े धोने के लिए)।",
            icon: <FaServer className="text-yellow-600 w-10 h-10" />,
            analogy: "एक टोस्टर की तरह — सिर्फ टोस्ट बनाता है, पर बहुत अच्छा बनाता है!",
          },
        ],
      },
      functionality: {
        title: "कार्यप्रणाली के अनुसार प्रकार",
        items: [
          {
            id: "analog",
            title: "एनालॉग कंप्यूटर",
            detail:
              "वास्तविक चीज़ों जैसे गति, तापमान और वोल्टेज को मापन करने के लिए उपयोग होते हैं। ये लगातार बदलने वाले डेटा के साथ काम करते हैं।",
            icon: <FaGlobe className="text-emerald-600 w-10 h-10" />,
            example: "उदाहरण: पुराने स्पीड मापने वाले यंत्र।",
          },
          {
            id: "digital",
            title: "डिजिटल कंप्यूटर",
            detail:
              "आज हम जो इस्तेमाल करते हैं — ये नंबर, छवियाँ और शब्दों के साथ काम करते हैं। अधिकांश आधुनिक कंप्यूटर डिजिटल होते हैं।",
            icon: <FaMobileAlt className="text-sky-600 w-10 h-10" />,
            example: "उदाहरण: स्मार्टफोन, लैपटॉप।",
          },
          {
            id: "hybrid",
            title: "हाइब्रिड कंप्यूटर",
            detail:
              "एनालॉग और डिजिटल का मिश्रण। ये वैज्ञानिक लैब और अस्पतालों में उपयोग होते हैं।",
            icon: <FaServer className="text-pink-600 w-10 h-10" />,
            example: "उदाहरण: अस्पताल मॉनिटरिंग सिस्टम।",
          },
        ],
      },
    },
    serversNote:
      "सर्वर कंप्यूटर कहाँ आते हैं? सर्वर छोटे (मिनी) भी हो सकते हैं और बहुत बड़े (मेनफ्रेम) भी। उपयोग के अनुसार ये विशेष-उद्देश्य मशीनें हैं जो कई उपयोगकर्ताओं को डेटा शेयर करती हैं — वेब सर्वर, मेल सर्वर, डेटाबेस सर्वर और गेम सर्वर।",
    funFact:
      "क्या आप जानते हैं? पहले के कंप्यूटर इतने बड़े होते थे कि वे पूरे कमरे में भर जाते थे! आज हम पॉकेट में स्मार्टफोन जैसा शक्तिशाली कंप्यूटर ले जा सकते हैं. 📱",
    engagement: "आप रोज़ कौन सा कंप्यूटर इस्तेमाल करते हैं?",
    quiz: {
      q: "कौन सा कंप्यूटर बैंकों द्वारा हजारों लोगों की जानकारी रखने के लिए उपयोग किया जाता है?",
      options: ["माइक्रो कंप्यूटर", "मेनफ्रेम", "स्मार्टफोन", "टैबलेट"],
      answer: 1,
    },
  },
};

const cardVariant = {
  hidden: { opacity: 0, y: 20, scale: 0.98 },
  visible: (i = 1) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { delay: i * 0.12, type: "spring", stiffness: 80 },
  }),
};

export default function TypesOfComputers() {
  const [lang, setLang] = useState("en");
  const data = CONTENT[lang];
  const [selected, setSelected] = useState(null);
  const [quizOpen, setQuizOpen] = useState(false);
  const [quizAnswer, setQuizAnswer] = useState(null);

  const toggleLang = () => setLang((l) => (l === "en" ? "hi" : "en"));

  return (
    <div className="max-w-5xl mx-auto p-6">
      {/* Header */}
      <div className="flex items-center justify-between gap-4">
        <motion.h1
          className="text-4xl md:text-5xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 via-pink-500 to-yellow-400"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          {data.heading}
        </motion.h1>

        <div className="flex items-center gap-2">
          <button
            onClick={toggleLang}
            className="px-3 py-2 rounded-lg border bg-white/70 backdrop-blur text-sm font-medium shadow-sm hover:scale-105 transition-transform"
            aria-label="Toggle language"
          >
            {lang === "en" ? "हिंदी" : "EN"}
          </button>
          <button
            onClick={() => {
              setSelected(null);
              setQuizAnswer(null);
            }}
            className="p-2 rounded-lg bg-white/60 hover:bg-white shadow"
            title="Reset"
          >
            <FaSync />
          </button>
        </div>
      </div>

      {/* Intro */}
      <motion.div
        className="mt-6 p-6 bg-gradient-to-br from-white to-indigo-50 rounded-2xl shadow-lg flex gap-6 items-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <motion.img
          src="https://cdn-icons-png.flaticon.com/512/1524/1524986.png"
          alt="animated laptop"
          className="w-28 h-28"
          initial={{ rotate: -6 }}
          animate={{ rotate: [ -6, 6, -6 ] }}
          transition={{ repeat: Infinity, duration: 3 }}
        />
        <div>
          <p className="text-lg text-gray-700">{data.intro}</p>
          <div className="mt-3 flex gap-3">
            <button
              onClick={() => setQuizOpen(true)}
              className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-indigo-600 text-white font-semibold shadow hover:scale-105 transition-transform"
            >
              <FaQuestionCircle /> {lang === "en" ? "Quick Quiz" : "त्रोटक प्रश्न"}
            </button>
            <button
              onClick={() => window.scrollTo({ top: 800, behavior: "smooth" })}
              className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-white border font-medium shadow hover:scale-105 transition-transform"
            >
              📚 {lang === "en" ? "Explore" : "खोजें"}
            </button>
          </div>
        </div>
      </motion.div>

      {/* Sections */}
      <div className="mt-8 grid gap-8 md:grid-cols-2">
        {/* Left: Size */}
        <div>
          <motion.h2
            className="text-2xl font-bold mb-3"
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
          >
            {data.sections.size.title}
          </motion.h2>
          <p className="text-sm text-gray-600 mb-4">{data.sections.size.subtitle}</p>

          <div className="space-y-4">
            {data.sections.size.items.map((it, i) => (
              <motion.article
                key={it.id}
                className="p-4 rounded-2xl bg-white shadow hover:shadow-2xl cursor-pointer flex gap-4 items-center"
                variants={cardVariant}
                custom={i}
                initial="hidden"
                animate="visible"
                onClick={() => setSelected(it.id)}
                whileHover={{ scale: 1.02 }}
                role="button"
                aria-pressed={selected === it.id}
              >
                <div className="flex-shrink-0">
                  <div className="w-20 h-20 rounded-xl bg-gradient-to-tr from-white to-indigo-50 flex items-center justify-center shadow-inner">
                    {it.icon}
                  </div>
                </div>
                <div className="flex-1">
                  <div className="flex items-start justify-between">
                    <h3 className="text-lg font-semibold">{it.title}</h3>
                    <span className="text-sm text-gray-500">{it.hook}</span>
                  </div>
                  <p className="text-sm text-gray-600 mt-1">{it.short}</p>
                </div>
                <img src={it.img} alt={it.title} className="w-16 h-16 object-contain" />
              </motion.article>
            ))}
          </div>
        </div>

        {/* Right: Use & Functionality + Servers note */}
        <div className="space-y-6">
          <motion.div initial={{ x: 20, opacity: 0 }} animate={{ x: 0, opacity: 1 }}>
            <h2 className="text-2xl font-bold mb-3">{data.sections.use.title}</h2>
            <div className="grid gap-3">
              {data.sections.use.items.map((u) => (
                <motion.div
                  key={u.id}
                  className="p-3 rounded-xl bg-white shadow flex gap-3 items-center"
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="w-12 h-12 flex items-center justify-center bg-indigo-50 rounded-lg">
                    {u.icon}
                  </div>
                  <div>
                    <h4 className="font-semibold">{u.title}</h4>
                    <p className="text-sm text-gray-600">{u.detail}</p>
                    <p className="mt-1 text-xs text-gray-500 italic">{u.analogy}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div initial={{ x: 20, opacity: 0 }} animate={{ x: 0, opacity: 1 }}>
            <h2 className="text-2xl font-bold mb-3">{data.sections.functionality.title}</h2>
            <div className="grid gap-3">
              {data.sections.functionality.items.map((f) => (
                <motion.div
                  key={f.id}
                  className="p-3 rounded-xl bg-white shadow flex gap-3 items-center"
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="w-12 h-12 flex items-center justify-center bg-indigo-50 rounded-lg">
                    {f.icon}
                  </div>
                  <div>
                    <h4 className="font-semibold">{f.title}</h4>
                    <p className="text-sm text-gray-600">{f.detail}</p>
                    {f.example && <p className="mt-1 text-xs text-gray-500 italic">{f.example}</p>}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <div className="p-4 rounded-xl bg-gradient-to-r from-yellow-50 to-white shadow">
            <h4 className="font-semibold">{lang === "en" ? "Server computers" : "सर्वर कंप्यूटर"}</h4>
            <p className="text-sm text-gray-600 mt-2">{data.serversNote}</p>
          </div>
        </div>
      </div>

      {/* Selected detail panel */}
      <AnimatePresence>
        {selected && (
          <motion.div
            className="mt-8 p-6 rounded-2xl bg-gradient-to-br from-white to-indigo-50 shadow-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
          >
            {(() => {
              const section = data.sections.size.items.find((s) => s.id === selected);
              if (!section) return null;
              return (
                <div className="flex gap-6 items-start">
                  <img src={section.img} alt={section.title} className="w-40 h-40 object-contain" />
                  <div>
                    <h3 className="text-2xl font-bold">{section.title}</h3>
                    <p className="mt-2 text-gray-700">{section.detail}</p>
                    <p className="mt-2 text-sm text-indigo-600 font-semibold">{section.hook}</p>
                    <div className="mt-4 flex gap-3">
                      <button
                        onClick={() => setSelected(null)}
                        className="px-3 py-2 bg-white rounded-lg border shadow"
                      >
                        {lang === "en" ? "Close" : "बंद करें"}
                      </button>
                      <button
                        onClick={() => setQuizOpen(true)}
                        className="px-3 py-2 bg-indigo-600 text-white rounded-lg shadow"
                      >
                        {lang === "en" ? "Take Quick Quiz" : "त्वरित प्रश्न लें"}
                      </button>
                    </div>
                  </div>
                </div>
              );
            })()}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Fun & Engagement */}
      <motion.div className="mt-8 p-6 rounded-2xl bg-white shadow-lg" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <h3 className="text-xl font-semibold">{lang === "en" ? "Fun Fact" : "रोचक तथ्य"}</h3>
        <p className="mt-2 text-gray-700">{data.funFact}</p>
        <div className="mt-4 flex items-center justify-between">
          <p className="text-sm text-gray-600 italic">{data.engagement}</p>
          <button
            onClick={() => alert(lang === "en" ? "Tell us: PC, Laptop, Tablet or Phone?" : "बताइये: PC, लैपटॉप, टैबलेट या फोन?")}
            className="px-3 py-2 bg-indigo-600 text-white rounded-lg shadow"
          >
            {lang === "en" ? "Answer" : "उत्तर"}
          </button>
        </div>
      </motion.div>

      {/* Quiz Modal */}
      <AnimatePresence>
        {quizOpen && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div className="w-full max-w-md p-6 bg-white rounded-2xl shadow-lg" initial={{ scale: 0.9 }} animate={{ scale: 1 }} exit={{ scale: 0.9 }}>
              <h4 className="text-lg font-semibold">{data.quiz.q}</h4>
              <div className="mt-4 space-y-3">
                {data.quiz.options.map((opt, idx) => (
                  <label key={idx} className={`flex items-center gap-3 p-3 rounded-lg border ${quizAnswer===idx ? 'border-indigo-500 bg-indigo-50' : 'bg-white'}`}>
                    <input type="radio" name="quiz" checked={quizAnswer===idx} onChange={() => setQuizAnswer(idx)} />
                    <span className="text-sm">{opt}</span>
                  </label>
                ))}
              </div>
              <div className="mt-4 flex justify-end gap-2">
                <button onClick={() => setQuizOpen(false)} className="px-3 py-2 rounded-lg border">{lang==='en'?'Close':'बंद'}</button>
                <button
                  onClick={() => {
                    if (quizAnswer === null) return alert(lang==='en'? 'Please select an option' : 'कृपया एक विकल्प चुनें');
                    if (quizAnswer === data.quiz.answer) alert(lang==='en'? 'Correct! 🎉' : 'सही! 🎉');
                    else alert(lang==='en'? 'Oops! Try again.' : 'उफ़! पुनः प्रयास करें।');
                    setQuizOpen(false);
                    setQuizAnswer(null);
                  }}
                  className="px-3 py-2 rounded-lg bg-indigo-600 text-white"
                >
                  {lang==='en'? 'Submit': 'जमा करें'}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Footer small note */}
      <div className="mt-6 text-xs text-gray-500">Tip: Click any card to read more. Toggle language to switch between English and हिन्दी.</div>
    </div>
  );
}
