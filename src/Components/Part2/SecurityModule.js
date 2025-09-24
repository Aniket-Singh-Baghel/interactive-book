import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FaHome, FaArrowRight, FaArrowLeft } from "react-icons/fa";
import { Link, useNavigate } from 'react-router-dom';

const content = {
  en: {
    home: "Home",
    title: "Software Security 🔐",
    subtitle: "Understanding how to protect software from threats and vulnerabilities.",
    what_is_title: "What is Software Security?",
    what_is_desc: "Software security is about making software as robust as possible against attacks. It's like building a house with strong locks, secure windows, and an alarm system to keep intruders out.",
    why_important_title: "Why is it Important?",
    why_important_points: [
      "<strong>Protects Data:</strong> Keeps user information safe from theft.",
      "<strong>Maintains Trust:</strong> Users are more likely to use software they trust.",
      "<strong>Prevents Financial Loss:</strong> Avoids costly breaches and downtime."
    ],
    common_threats_title: "Common Threats",
    common_threats: [
      { name: "Viruses", desc: "Malicious software that can damage your system." },
      { name: "Phishing", desc: "Tricking users into giving away sensitive information." },
      { name: "SQL Injection", desc: "A way for attackers to steal data from databases." }
    ],
    how_it_works_title: "How Security Works: A Live Example",
    how_it_works_desc: "Imagine you're logging into a website. Here's a simplified view of what happens behind the scenes to keep your password safe:",
    simulation_title: "Interactive Hashing Simulation",
    simulation_intro: "Hashing is like creating a unique 'digital fingerprint' for data. It's a one-way process, so you can't get the original data back from the hash. Let's see how it works with passwords.",
    simulation_step1_title: "Step 1: Enter Your Password",
    simulation_step1_desc: "Type a password in the box below. The system takes this as input.",
    simulation_step2_title: "Step 2: The Hashing Process",
    simulation_step2_desc: "The system uses an algorithm (like a complex mathematical recipe) to convert your password into a fixed-length string of characters. This is the hash. Notice how even a small change in the password creates a completely different hash.",
    simulation_step3_title: "Step 3: Storing the Hash",
    simulation_step3_desc: "The database stores only this hash, not your actual password. When you log in again, the system hashes your new input and compares it to the stored hash. If they match, you're in!",
    simulation_step4_title: "Why is this Secure?",
    simulation_step4_desc: "Even if attackers steal the database, they only get the hashes. Since hashing is a one-way street, they can't turn the hashes back into passwords. To make it even more secure, companies add a unique 'salt' to each password before hashing, making them even harder to crack.",
    simulation_input_placeholder: "Enter a password to hash...",
    simulation_hashed_output: "Hashed Output:",
    previous: "Previous",
    next: "Next",
  },
  hi: {
    home: "होम",
    title: "सॉफ्टवेयर सुरक्षा 🔐",
    subtitle: "सॉफ्टवेयर को खतरों और कमजोरियों से कैसे बचाया जाए, यह समझना।",
    what_is_title: "सॉफ्टवेयर सुरक्षा क्या है?",
    what_is_desc: "सॉफ्टवेयर सुरक्षा का मतलब सॉफ्टवेयर को हमलों के खिलाफ यथासंभव मजबूत बनाना है। यह मजबूत ताले, सुरक्षित खिड़कियों और घुसपैठियों को बाहर रखने के लिए एक अलार्म सिस्टम के साथ एक घर बनाने जैसा है।",
    why_important_title: "यह महत्वपूर्ण क्यों है?",
    why_important_points: [
      "<strong>डेटा की सुरक्षा करता है:</strong> उपयोगकर्ता की जानकारी को चोरी से सुरक्षित रखता है।",
      "<strong>विश्वास बनाए रखता है:</strong> उपयोगकर्ता उस सॉफ़्टवेयर का उपयोग करने की अधिक संभावना रखते हैं जिस पर वे भरोसा करते हैं।",
      "<strong>वित्तीय नुकसान को रोकता है:</strong> महंगे उल्लंघनों और डाउनटाइम से बचाता है।"
    ],
    common_threats_title: "आम खतरे",
    common_threats: [
      { name: "वायरस", desc: "दुर्भावनापूर्ण सॉफ़्टवेयर जो आपके सिस्टम को नुकसान पहुंचा सकता है।" },
      { name: "फ़िशिंग", desc: "उपयोगकर्ताओं को संवेदनशील जानकारी देने के लिए धोखा देना।" },
      { name: "एसक्यूएल इंजेक्शन", desc: "हमलावरों के लिए डेटाबेस से डेटा चुराने का एक तरीका।" }
    ],
    how_it_works_title: "सुरक्षा कैसे काम करती है: एक जीवंत उदाहरण",
    how_it_works_desc: "कल्पना कीजिए कि आप एक वेबसाइट में लॉग इन कर रहे हैं। आपके पासवर्ड को सुरक्षित रखने के लिए पर्दे के पीछे क्या होता है, इसका एक सरलीकृत दृश्य यहां दिया गया है:",
    simulation_title: "इंटरैक्टिव हैशिंग सिमुलेशन",
    simulation_intro: "हैशिंग डेटा के लिए एक अद्वितीय 'डिजिटल फिंगरप्रिंट' बनाने जैसा है। यह एक तरफा प्रक्रिया है, इसलिए आप हैश से मूल डेटा वापस नहीं पा सकते हैं। आइए देखें कि यह पासवर्ड के साथ कैसे काम करता है।",
    simulation_step1_title: "चरण 1: अपना पासवर्ड दर्ज करें",
    simulation_step1_desc: "नीचे दिए गए बॉक्स में एक पासवर्ड टाइप करें। सिस्टम इसे इनपुट के रूप में लेता है।",
    simulation_step2_title: "चरण 2: हैशिंग प्रक्रिया",
    simulation_step2_desc: "सिस्टम आपके पासवर्ड को वर्णों की एक निश्चित लंबाई वाली स्ट्रिंग में बदलने के लिए एक एल्गोरिथ्म (एक जटिल गणितीय नुस्खा की तरह) का उपयोग करता है। यह हैश है। ध्यान दें कि पासवर्ड में एक छोटा सा बदलाव भी पूरी तरह से अलग हैश कैसे बनाता है।",
    simulation_step3_title: "चरण 3: हैश को संग्रहीत करना",
    simulation_step3_desc: "डेटाबेस केवल इस हैश को संग्रहीत करता है, आपके वास्तविक पासवर्ड को नहीं। जब आप फिर से लॉग इन करते हैं, तो सिस्टम आपके नए इनपुट को हैश करता है और इसकी तुलना संग्रहीत हैश से करता है। यदि वे मेल खाते हैं, तो आप अंदर हैं!",
    simulation_step4_title: "यह सुरक्षित क्यों है?",
    simulation_step4_desc: "भले ही हमलावर डेटाबेस चुरा लें, उन्हें केवल हैश मिलते हैं। चूंकि हैशिंग एक तरफा सड़क है, वे हैश को वापस पासवर्ड में नहीं बदल सकते। इसे और भी सुरक्षित बनाने के लिए, कंपनियां प्रत्येक पासवर्ड को हैश करने से पहले उसमें एक अद्वितीय 'नमक' जोड़ती हैं, जिससे उन्हें क्रैक करना और भी मुश्किल हो जाता है।",
    simulation_input_placeholder: "हैश करने के लिए एक पासवर्ड दर्ज करें...",
    simulation_hashed_output: "हैश किया गया आउटपुट:",
    previous: "पिछला",
    next: "अगला",
  }
};

const Security = () => {
  const [lang, setLang] = useState('en');
  const [password, setPassword] = useState('');
  const [hashedPassword, setHashedPassword] = useState('');
  const navigate = useNavigate();
  const t = content[lang];

  const simpleHash = (str) => {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i);
      hash = (hash << 5) - hash + char;
      hash |= 0; // Convert to 32bit integer
    }
    return hash.toString(16);
  };

  useEffect(() => {
    if (password) {
      setHashedPassword(simpleHash(password));
    } else {
      setHashedPassword('');
    }
  }, [password]);

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
          <div className="p-4 sm:p-6 max-w-4xl mx-auto bg-white rounded-2xl shadow-lg">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-center text-gray-800 mb-2">
              {t.title}
            </h1>
            <p className="text-center text-gray-600 mb-6 text-sm sm:text-base">
              {t.subtitle}
            </p>

            <div className="bg-gray-100 p-6 rounded-lg shadow-inner mb-6">
              <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-3 text-center">
                {t.what_is_title}
              </h2>
              <p className="text-gray-700 text-center mb-6" dangerouslySetInnerHTML={{ __html: t.what_is_desc }} />
            </div>

            <div className="bg-blue-50 p-6 rounded-lg shadow-sm border-l-4 border-blue-400 mb-6">
              <h2 className="text-xl sm:text-2xl font-bold mb-3 text-center text-blue-800">{t.why_important_title}</h2>
              <ul className="list-disc list-inside space-y-2">
                {t.why_important_points.map((point, index) => (
                  <li key={index} className="text-gray-700" dangerouslySetInnerHTML={{ __html: point }} />
                ))}
              </ul>
            </div>

            <div className="bg-gray-100 p-6 rounded-lg shadow-inner mb-6">
              <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-3 text-center">
                {t.common_threats_title}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {t.common_threats.map((threat, index) => (
                  <div key={index} className="text-center p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow">
                    <h3 className="font-semibold text-lg">{threat.name}</h3>
                    <p className="text-sm text-gray-600">{threat.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-green-50 p-6 rounded-lg shadow-sm border-l-4 border-green-400">
              <h2 className="text-xl sm:text-2xl font-bold mb-3 text-center text-green-800">{t.simulation_title}</h2>
              <p className="text-gray-700 text-center mb-6">{t.simulation_intro}</p>
              <div className="space-y-8">
                <div className="p-4 border-l-4 border-gray-300">
                  <h3 className="text-lg font-semibold">{t.simulation_step1_title}</h3>
                  <p className="text-gray-600 mt-1">{t.simulation_step1_desc}</p>
                  <input
                    type="text"
                    placeholder={t.simulation_input_placeholder}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full p-2 mt-2 border border-gray-300 rounded-md shadow-sm"
                  />
                </div>
                <div className="p-4 border-l-4 border-gray-300">
                  <h3 className="text-lg font-semibold">{t.simulation_step2_title}</h3>
                  <p className="text-gray-600 mt-1">{t.simulation_step2_desc}</p>
                  <div className="flex items-center gap-4 mt-2">
                    <motion.div
                      key={hashedPassword ? 'locked' : 'unlocked'}
                      initial={{ scale: 0.9, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ duration: 0.5 }}
                    >
                      <svg width="60" height="60" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <motion.rect x="3" y="10" width="18" height="11" rx="2" stroke="#0f172a" strokeWidth="1.2" fill={hashedPassword ? '#dcfce7' : '#fef2f2'} />
                        <motion.path d="M7 10V7a5 5 0 0110 0v3" stroke="#14532d" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" initial={{ rotate: -15 }} animate={{ rotate: hashedPassword ? 0 : -15 }} transform-origin="12px 8px" />
                        <motion.circle cx="12" cy="15" r="1.6" fill={hashedPassword ? '#14532d' : '#991b1b'} />
                      </svg>
                    </motion.div>
                    {hashedPassword && (
                      <div className="flex-1 p-3 bg-gray-100 rounded-md shadow-inner">
                        <p className="font-semibold text-gray-800">{t.simulation_hashed_output}</p>
                        <p className="text-sm text-green-800 font-mono break-all">{hashedPassword}</p>
                      </div>
                    )}
                  </div>
                </div>
                <div className="p-4 border-l-4 border-gray-300">
                  <h3 className="text-lg font-semibold">{t.simulation_step3_title}</h3>
                  <p className="text-gray-600 mt-1">{t.simulation_step3_desc}</p>
                </div>
                <div className="p-4 border-l-4 border-gray-300">
                  <h3 className="text-lg font-semibold">{t.simulation_step4_title}</h3>
                  <p className="text-gray-600 mt-1">{t.simulation_step4_desc}</p>
                </div>
              </div>
            </div>
          </div>
          <div className="w-full flex justify-between items-center mt-10 p-4 bg-gray-100 rounded-lg shadow-md">
            <button
              onClick={() => navigate('/module4/testing')}
              className="flex items-center gap-2 px-4 py-2 bg-purple-200 hover:bg-purple-300 text-purple-900 rounded-lg shadow transition"
            >
              <FaArrowLeft />
              {t.previous}
            </button>
            <button
              onClick={() => navigate('/module4/cloud-computing')}
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

export default Security;