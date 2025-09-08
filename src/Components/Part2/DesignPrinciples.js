import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaHome, FaArrowLeft, FaArrowRight, FaDraftingCompass, FaCheckCircle, FaRecycle, FaLayerGroup, FaPlus, FaBolt, FaUserFriends, FaToolbox, FaExchangeAlt } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";

const principlesContent = {
  en: {
    title: "Software Design Principles",
    concept: "Guidelines for creating well-structured, efficient, and maintainable software.",
    home: "Home",
    why_matters_title: "Why Do Design Principles Matter?",
    why_matters_text: "Imagine building a house without a plan. It might stand for a while, but it will soon have problems like leaks or weak walls. Design principles are the plan for software. They help developers build applications that are strong, flexible, and easy to fix or upgrade later.",
    principles: [
      {
        id: "kiss",
        acronym: "KISS",
        fullForm: "Keep It Simple, Stupid",
        icon: <FaCheckCircle className="text-green-500" />,
        color: "from-green-50 to-teal-50",
        explanation: "The KISS principle states that most systems work best if they are kept simple rather than made complicated. Simplicity should be a key goal in design, and unnecessary complexity should be avoided.",
        analogy_title: "Analogy: A TV Remote",
        analogy_text: "Imagine two TV remotes. One has 5 buttons: On/Off, Volume Up, Volume Down, Channel Up, Channel Down. The other is a 'Universal Remote' with 100 tiny buttons. The simple remote is easy for anyone to use. The complex one is confusing. Good software design is like the simple remote: focused and easy to understand.",
      },
      {
        id: "dry",
        acronym: "DRY",
        fullForm: "Don't Repeat Yourself",
        icon: <FaRecycle className="text-blue-500" />,
        color: "from-blue-50 to-indigo-50",
        explanation: "This principle is about reducing the repetition of information. Every piece of knowledge or logic in a system should have a single, unambiguous representation. If you have the same information in two places and need to change it, you have to remember to change it in both places, which can lead to mistakes.",
        analogy_title: "Analogy: A Friend's Address",
        analogy_text: "You write your friend's new address on a sticky note, in your phone contacts, and in a notebook. When they move, you have to update all three places. If you only kept the address in your phone's contacts (a single source of truth), you would only need to update it once. DRY means having one place for each piece of information.",
      },
      {
        id: "solid",
        acronym: "SOLID",
        fullForm: "SOLID Principles",
        icon: <FaLayerGroup className="text-purple-500" />,
        color: "from-purple-50 to-pink-50",
        explanation: "SOLID is an acronym for five design principles that help make software more understandable, flexible, and maintainable. They are like the rules a team of superheroes follows to work together effectively.",
        analogy_title: "Analogy: A Team of Superheroes",
        analogy_text: "Think of your software as a team of superheroes. For the team to be effective, each hero must follow certain rules. These rules help them save the day without getting in each other's way.",
        sub_principles: [
          { name: "S - Single Responsibility", desc: "Every hero has one main job. The Flash handles super-speed tasks, while Superman handles super-strength tasks. You don't ask The Flash to lift a building. In software, each part should do only one main thing.", icon: FaBolt },
          { name: "O - Open/Closed", desc: "The superhero team can always welcome a new hero (it's 'open' for new members) without changing the existing heroes' powers (their current powers are 'closed' for changes). Software should allow new features to be added without changing the old, working code.", icon: FaPlus },
          { name: "L - Liskov Substitution", desc: "If Superman is busy, you can send Supergirl to do a job that requires flight and strength. She can perfectly substitute for him. In software, a 'substitute' part must be able to do everything the original part can do.", icon: FaUserFriends },
          { name: "I - Interface Segregation", desc: "You don't call the entire superhero team just to stop a cat from a tree. You only call the hero with the right skills. Software shouldn't force a part to have functions it doesn't need.", icon: FaToolbox },
          { name: "D - Dependency Inversion", desc: "Batman doesn't build the Batmobile's engine himself. He builds the car to use any powerful engine that fits a standard connection. This way, he can easily swap in a new, better engine later. High-level parts of software should depend on standard 'plugs' (abstractions), not specific, low-level parts.", icon: FaExchangeAlt }
        ]
      },
    ]
  },
  hi: {
    title: "सॉफ्टवेयर डिजाइन के नियम",
    concept: "सॉफ्टवेयर को मजबूत, तेज और आसानी से ठीक करने लायक बनाने के नियम।",
    home: "होम",
    why_matters_title: "डिजाइन के नियम क्यों जरूरी हैं?",
    why_matters_text: "सोचिए, आप बिना किसी नक्शे के घर बना रहे हैं। शायद वह खड़ा हो जाए, पर उसमें जल्दी ही दिक्कतें आने लगेंगी, जैसे दीवारों में सीलन। डिजाइन के नियम सॉफ्टवेयर का नक्शा होते हैं। ये डेवलपर्स को ऐसे ऐप बनाने में मदद करते हैं जो मजबूत हों, लचीले हों और जिन्हें बाद में ठीक करना या सुधारना आसान हो।",
    principles: [
      {
        id: "kiss",
        acronym: "KISS",
        fullForm: "Keep It Simple, Stupid",
        icon: <FaCheckCircle className="text-green-500" />,
        color: "from-green-50 to-teal-50",
        explanation: "KISS नियम कहता है कि ज्यादातर चीजें तब सबसे अच्छा काम करती हैं जब उन्हें जटिल बनाने के बजाय सरल रखा जाए। डिजाइन में सरलता एक मुख्य लक्ष्य होना चाहिए।",
        analogy_title: "उदाहरण: टीवी का रिमोट",
        analogy_text: "दो टीवी रिमोट सोचिए। एक में 5 बटन हैं: ऑन/ऑफ, आवाज कम/ज्यादा, चैनल बदलना। दूसरा 'यूनिवर्सल रिमोट' है जिसमें 100 छोटे-छोटे बटन हैं। सरल रिमोट इस्तेमाल करना बहुत आसान है, जबकि जटिल रिमोट कन्फ्यूजिंग है। अच्छा सॉफ्टवेयर डिजाइन सरल रिमोट जैसा होता है।",
      },
      {
        id: "dry",
        acronym: "DRY",
        fullForm: "Don't Repeat Yourself",
        icon: <FaRecycle className="text-blue-500" />,
        color: "from-blue-50 to-indigo-50",
        explanation: "इस नियम का मतलब है जानकारी को दोहराने से बचना। हर जानकारी या लॉजिक को सिस्टम में एक ही जगह पर लिखा जाना चाहिए। अगर आप एक ही चीज दो जगह लिखते हैं, तो उसे बदलते समय आपको दोनों जगह बदलना याद रखना होगा, जिससे गलतियाँ हो सकती हैं।",
        analogy_title: "उदाहरण: दोस्त का पता",
        analogy_text: "आप अपने दोस्त का नया पता एक कागज पर, अपने फोन में और एक डायरी में लिखते हैं। जब वह फिर से घर बदलता है, तो आपको तीनों जगह पता बदलना होगा। अगर आप सिर्फ फोन में पता रखते (एक ही जगह), तो आपको बस एक बार अपडेट करना पड़ता। DRY का यही मतलब है।",
      },
      {
        id: "solid",
        acronym: "SOLID",
        fullForm: "SOLID Principles",
        icon: <FaLayerGroup className="text-purple-500" />,
        color: "from-purple-50 to-pink-50",
        explanation: "SOLID पाँच डिजाइन नियमों का एक समूह है जो सॉफ्टवेयर को समझने, बदलने और संभालने में आसान बनाता है। ये सुपरहीरोज की एक टीम के नियमों की तरह हैं जो उन्हें मिलकर काम करने में मदद करते हैं।",
        analogy_title: "उदाहरण: सुपरहीरो की एक टीम",
        analogy_text: "अपने सॉफ्टवेयर को सुपरहीरोज की एक टीम की तरह सोचें। टीम को असरदार बनाने के लिए, हर हीरो को कुछ नियमों का पालन करना पड़ता है। ये नियम उन्हें एक-दूसरे के काम में बाधा डाले बिना दुनिया बचाने में मदद करते हैं।",
        sub_principles: [
            { name: "S - सिंगल रिस्पॉन्सिबिलिटी", desc: "हर हीरो का एक मुख्य काम होता है। फ्लैश सुपर-स्पीड का काम करता है, सुपरमैन सुपर-स्ट्रेंथ का। आप फ्लैश को बिल्डिंग उठाने के लिए नहीं कहते। सॉफ्टवेयर में भी, हर हिस्से का केवल एक मुख्य काम होना चाहिए।", icon: FaBolt },
            { name: "O - ओपन/क्लोज्ड", desc: "सुपरहीरो टीम हमेशा एक नए हीरो का स्वागत कर सकती है (यह नए सदस्यों के लिए 'खुली' है) बिना मौजूदा हीरो की शक्तियों को बदले (उनकी शक्तियाँ 'बंद' हैं)। सॉफ्टवेयर में भी नए फीचर पुराने कोड को बदले बिना जोड़े जाने चाहिए।", icon: FaPlus },
            { name: "L - लिस्कोव सब्स्टिट्यूशन", desc: "अगर सुपरमैन व्यस्त है, तो आप सुपरगर्ल को उड़ान और ताकत की आवश्यकता वाले काम के लिए भेज सकते हैं। वह पूरी तरह से उसकी जगह ले सकती है। सॉफ्टवेयर में, एक 'विकल्प' हिस्सा वह सब कुछ करने में सक्षम होना चाहिए जो मूल हिस्सा कर सकता है।", icon: FaUserFriends },
            { name: "I - इंटरफेस सेग्रीगेशन", desc: "आप सिर्फ एक बिल्ली को पेड़ से बचाने के लिए पूरी सुपरहीरो टीम को नहीं बुलाते। आप केवल सही कौशल वाले हीरो को बुलाते हैं। सॉफ्टवेयर को किसी हिस्से को ऐसे फ़ंक्शन नहीं देने चाहिए जिनकी उसे आवश्यकता नहीं है।", icon: FaToolbox },
            { name: "D - डिपेंडेंसी इन्वर्जन", desc: "बैटमैन बैटमोबाइल का इंजन खुद नहीं बनाता। वह कार को इस तरह से बनाता है कि वह किसी भी शक्तिशाली इंजन का उपयोग कर सके जो एक मानक कनेक्शन में फिट हो। इस तरह, वह बाद में आसानी से एक नया, बेहतर इंजन लगा सकता है। सॉफ्टवेयर के उच्च-स्तरीय हिस्सों को विशिष्ट, निम्न-स्तरीय हिस्सों पर निर्भर नहीं होना चाहिए।", icon: FaExchangeAlt }
        ]
      },
    ]
  }
};

const BackgroundShapes = () => (
    <div className="absolute inset-0 overflow-hidden z-0">
        <motion.div
            className="absolute top-[5%] left-[10%] w-72 h-72 bg-purple-300 rounded-full filter blur-3xl opacity-30"
            animate={{
                x: [0, 100, 0, -50, 0],
                y: [0, -50, 50, 100, 0],
                scale: [1, 1.2, 1, 1.1, 1],
            }}
            transition={{
                duration: 25,
                repeat: Infinity,
                repeatType: 'mirror',
            }}
        />
        <motion.div
            className="absolute bottom-[10%] right-[15%] w-80 h-80 bg-yellow-300 rounded-full filter blur-3xl opacity-30"
            animate={{
                x: [0, -80, 0, 70, 0],
                y: [0, 60, -40, 90, 0],
                scale: [1, 1.1, 1.2, 1, 1],
            }}
            transition={{
                duration: 30,
                repeat: Infinity,
                repeatType: 'mirror',
                delay: 5,
            }}
        />
         <motion.div
            className="absolute top-[20%] right-[5%] w-60 h-60 bg-green-300 rounded-full filter blur-3xl opacity-20"
            animate={{
                x: [0, -40, 0, 30, 0],
                y: [0, 30, -20, 50, 0],
                scale: [1, 1.1, 1, 1.2, 1],
            }}
            transition={{
                duration: 20,
                repeat: Infinity,
                repeatType: 'mirror',
                delay: 2,
            }}
        />
    </div>
);


export default function DesignPrinciples() {
  const [lang, setLang] = useState("en");
  const [expandedId, setExpandedId] = useState(null);
  const navigate = useNavigate();

  const content = principlesContent[lang];

  const handleToggle = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans py-8 relative overflow-hidden">
      <BackgroundShapes />
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 relative z-10">
        <div className="flex items-center justify-between">
          <Link
            to="/parts/prt2"
            className="inline-flex items-center px-4 py-2 bg-white rounded-full shadow-md border border-gray-200 hover:bg-gray-100 transition"
          >
            <FaHome className="mr-2 text-lg text-sky-600" />
            {content.home}
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

        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-4xl font-extrabold text-center text-gray-800 mb-2 flex items-center justify-center gap-3">
            <FaDraftingCompass className="text-yellow-500" /> {content.title}
          </h1>
          <p className="text-center text-gray-500 font-medium mb-8">
            {content.concept}
          </p>
        </motion.div>
        
        <div className="max-w-4xl mx-auto space-y-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl shadow-lg border border-gray-200"
          >
            <h2 className="text-2xl font-bold text-gray-800 mb-3">{content.why_matters_title}</h2>
            <p className="text-gray-600 leading-relaxed">{content.why_matters_text}</p>
          </motion.div>

          {content.principles.map((p) => (
            <div key={p.id}>
              <motion.div
                onClick={() => handleToggle(p.id)}
                className={`p-6 rounded-2xl shadow-lg cursor-pointer transition-all duration-300 ${expandedId === p.id ? 'bg-white/80 backdrop-blur-sm' : `bg-gradient-to-br ${p.color} hover:shadow-xl`}`}
                whileHover={{ y: expandedId !== p.id ? -5 : 0 }}
              >
                <div className="flex items-center gap-4">
                  <div className="text-4xl">{p.icon}</div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-800">{p.acronym}</h3>
                    <p className="text-sm text-gray-600">{p.fullForm}</p>
                  </div>
                </div>
              </motion.div>

              <AnimatePresence>
                {expandedId === p.id && (
                  <motion.div
                    initial={{ opacity: 0, height: 0, marginTop: 0 }}
                    animate={{ opacity: 1, height: 'auto', marginTop: '-1rem' }}
                    exit={{ opacity: 0, height: 0, marginTop: 0 }}
                    transition={{ duration: 0.4, ease: "easeInOut" }}
                    className="bg-white/80 backdrop-blur-sm rounded-b-2xl shadow-inner overflow-hidden"
                  >
                    <div className="p-8 pt-12 space-y-4 text-gray-800 leading-relaxed">
                       <p>{p.explanation}</p>
                        <div className="bg-black/5 p-4 rounded-lg">
                            <h4 className="font-bold mb-2">{p.analogy_title}</h4>
                            <p>{p.analogy_text}</p>
                        </div>
                        {p.sub_principles && (
                            <div>
                                <h4 className="font-bold mb-2 text-xl">The 5 SOLID Principles:</h4>
                                <ul className="space-y-3">
                                    {p.sub_principles.map(sub => (
                                        <li key={sub.name} className="flex items-start gap-4 bg-black/5 p-3 rounded-lg">
                                            <div className="text-2xl text-purple-600 pt-1"><sub.icon /></div>
                                            <div>
                                                <p className="font-bold">{sub.name}</p>
                                                <p className="text-sm">{sub.desc}</p>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>

        <div className="flex justify-between items-center mt-12 max-w-4xl mx-auto">
            <button
            onClick={() => navigate('/module2/algorithms')}
            className="flex items-center gap-2 px-4 py-2 bg-orange-200 hover:bg-orange-300 text-orange-900 rounded-lg shadow transition"
            >
            <FaArrowLeft />
            Previous
            </button>
            <button
            onClick={() => navigate('/module3/ui-ux')}
            className="flex items-center gap-2 px-4 py-2 bg-green-200 hover:bg-green-300 text-green-900 rounded-lg shadow transition"
            >
            Next
            <FaArrowRight />
            </button>
        </div>
      </div>
    </div>
  );
}
