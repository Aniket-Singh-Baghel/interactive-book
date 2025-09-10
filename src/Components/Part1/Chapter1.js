import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaPepperHot, FaBlender, FaCheckCircle, FaArrowRight, FaArrowLeft, FaHome } from "react-icons/fa";
import { Link, useNavigate } from 'react-router-dom';

const content = {
    en: {
        home: "Home",
        title: "What is a Computer? 🤖",
        subtitle: "Let's understand what a computer is with a simple real-life example and a formal definition.",
        simple_machine_title: "A Simple Machine",
        simple_machine_desc: "A computer is a smart machine that helps us with our work, just like a <strong>mixer grinder</strong> in the kitchen. Let's see how they are similar.",
        input_title: "Raw Spices",
        input_desc: "You put these in.",
        process_title: "Grinding",
        process_desc: "The machine does the work.",
        output_title: "Spice Powder",
        output_desc: "The finished result.",
        tech_def_title: "The Technical Definition",
        tech_def_p1: "In technical terms, a <strong>computer</strong> is an <strong>electronic device</strong> that manipulates <strong>information</strong>, or <strong>data</strong>, according to a set of <strong>instructions</strong>. It has the ability to <strong>store</strong>, <strong>retrieve</strong>, and <strong>process data</strong>.",
        tech_def_p2: "Computers can perform complex calculations at lightning speed, automate tasks, and run software that helps us with communication, creativity, problem-solving, entertainment, and much more.",
        previous: "Previous",
        next: "Next",
    },
    hi: {
        home: "होम",
        title: "कंप्यूटर क्या है? 🤖",
        subtitle: "आइए एक सरल वास्तविक जीवन के उदाहरण और एक औपचारिक परिभाषा के साथ समझें कि कंप्यूटर क्या है।",
        simple_machine_title: "एक सरल मशीन",
        simple_machine_desc: "कंप्यूटर एक स्मार्ट मशीन है जो हमारे काम में हमारी मदद करती है, ठीक रसोई में एक <strong>मिक्सर ग्राइंडर</strong> की तरह। आइए देखें कि वे कैसे समान हैं।",
        input_title: "कच्चे मसाले",
        input_desc: "आप इन्हें अंदर डालते हैं।",
        process_title: "पीसना",
        process_desc: "मशीन काम करती है।",
        output_title: "मसाला पाउडर",
        output_desc: "तैयार परिणाम।",
        tech_def_title: "तकनीकी परिभाषा",
        tech_def_p1: "तकनीकी शब्दों में, एक <strong>कंप्यूटर</strong> एक <strong>इलेक्ट्रॉनिक उपकरण</strong> है जो <strong>निर्देशों</strong> के एक सेट के अनुसार <strong>सूचना</strong>, या <strong>डेटा</strong> में हेरफेर करता है। इसमें <strong>डेटा</strong> को <strong>संग्रहीत</strong> करने, <strong>पुनर्प्राप्त</strong> करने और <strong>संसाधित</strong> करने की क्षमता होती है।",
        tech_def_p2: "कंप्यूटर बिजली की गति से जटिल गणना कर सकते हैं, कार्यों को स्वचालित कर सकते हैं, और सॉफ्टवेयर चला सकते हैं जो हमें संचार, रचनात्मकता, समस्या-समाधान, मनोरंजन, और बहुत कुछ में मदद करता है।",
        previous: "पिछला",
        next: "अगला",
    }
};

const Chapter1 = () => {
  const [lang, setLang] = useState('en');
  const navigate = useNavigate();
  const t = content[lang];

  return (
    <div className="p-4 sm:p-6 lg:p-8 min-h-screen bg-gradient-to-br from-blue-50 to-green-50 font-sans">
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

        <div className="p-4 sm:p-6 max-w-4xl mx-auto bg-white rounded-2xl shadow-2xl">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-2xl sm:text-3xl lg:text-4xl font-bold text-center text-gray-800 mb-2"
          >
            {t.title}
          </motion.h1>
          <p className="text-center text-gray-600 mb-6 text-sm sm:text-base">
            {t.subtitle}
          </p>

          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="flex justify-center mb-6"
          >
            <img
              src='https://4.imimg.com/data4/RQ/PS/MY-25091456/how-to-donate-computer-1-500x500.jpg'
              alt="Old computer"
              className="rounded-lg shadow-md w-full max-w-md"
            />
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-gray-50 p-6 rounded-lg shadow-inner mb-6"
          >
            <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-3 text-center">
              {t.simple_machine_title}
            </h2>
            <p className="text-gray-700 text-center mb-6" dangerouslySetInnerHTML={{ __html: t.simple_machine_desc }} />
            
            <div className="flex flex-col sm:flex-row justify-around items-center gap-6 sm:gap-4">
              <div className="text-center">
                <FaPepperHot className="text-4xl mx-auto text-red-500" />
                <p className="font-semibold mt-2">{t.input_title}</p>
                <p className="text-sm text-gray-500">{t.input_desc}</p>
              </div>
              <FaArrowRight className="text-2xl text-gray-400 rotate-90 sm:rotate-0" />
              <div className="text-center">
                <FaBlender className="text-4xl mx-auto text-blue-500" />
                <p className="font-semibold mt-2">{t.process_title}</p>
                <p className="text-sm text-gray-500">{t.process_desc}</p>
              </div>
              <FaArrowRight className="text-2xl text-gray-400 rotate-90 sm:rotate-0" />
              <div className="text-center">
                <FaCheckCircle className="text-4xl mx-auto text-green-500" />
                <p className="font-semibold mt-2">{t.output_title}</p>
                <p className="text-sm text-gray-500">{t.output_desc}</p>
              </div>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="bg-blue-50 p-6 rounded-lg shadow-sm border-l-4 border-blue-400"
          >
            <h2 className="text-xl sm:text-2xl font-bold mb-3 text-center text-blue-800">{t.tech_def_title}</h2>
            <p className="text-gray-700" dangerouslySetInnerHTML={{ __html: t.tech_def_p1 }} />
            <p className="mt-4 text-gray-700">{t.tech_def_p2}</p>
          </motion.div>
        </div>
        
        <div className="w-full flex justify-between items-center mt-10 p-4 bg-gray-100 rounded-lg shadow-md">
            <button
                onClick={() => navigate('/parts/prt1')}
                className="flex items-center gap-2 px-4 py-2 bg-purple-200 hover:bg-purple-300 text-purple-900 rounded-lg shadow transition"
            >
                <FaArrowLeft />
                {t.previous}
            </button>
            <button
                onClick={() => navigate('/part1/computer-hardware')}
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

export default Chapter1;
