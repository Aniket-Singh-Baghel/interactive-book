import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FaDatabase, FaServer, FaLaptopCode, FaArrowRight, FaArrowLeft, FaHome } from "react-icons/fa";
import { Link, useNavigate } from 'react-router-dom';

const content = {
  en: {
    home: "Home",
    title: "What is a Database? 🗃️",
    subtitle: "Let's explore what databases are and why they are so important in the digital world.",
    what_is_db_title: "What is a Database?",
    what_is_db_desc: "A database is an organized collection of data, stored and accessed electronically. Think of it as a digital filing cabinet where all the important information is kept neatly.",
    analogy_title: "A Library Analogy",
    analogy_desc: "A library is a great real-world example of a database. The library has a huge collection of books (the data). The books are organized by genre, author, etc. (the structure). You can search for a book using the library's catalog (the query). The librarian who helps you find the book is like the Database Management System (DBMS).",
    why_db_title: "Why are Databases Important?",
    why_db_p1: "Databases are the backbone of almost every application you use. They store your profile information on social media, the products you see on online stores, and even the contacts on your phone.",
    why_db_p2: "Without databases, the internet as we know it would not exist. They allow us to store, retrieve, and manage vast amounts of data quickly, efficiently, and securely.",
    comparison_title: "Databases vs. Spreadsheets",
    comparison_desc: "While a spreadsheet (like Excel) can store data, it's not a true database. Here's a quick comparison:",
    comparison_table: [
      { feature: "Data Size", spreadsheet: "Good for small amounts of data", database: "Can handle huge amounts of data" },
      { feature: "Multiple Users", spreadsheet: "Difficult for multiple people to edit at once", database: "Designed for many users to access and edit simultaneously" },
      { feature: "Data Integrity", spreadsheet: "Easy to make mistakes and enter incorrect data", database: "Has rules to ensure data is consistent and accurate" },
      { feature: "Speed", spreadsheet: "Slows down with a lot of data", database: "Optimized for fast data retrieval" }
    ],
    previous: "Previous",
    next: "Next",
  },
  hi: {
    home: "होम",
    title: "डेटाबेस क्या है? 🗃️",
    subtitle: "आइए जानें कि डेटाबेस क्या हैं और वे डिजिटल दुनिया में इतने महत्वपूर्ण क्यों हैं।",
    what_is_db_title: "डेटाबेस क्या है?",
    what_is_db_desc: "डेटाबेस डेटा का एक संगठित संग्रह है, जिसे इलेक्ट्रॉनिक रूप से संग्रहीत और एक्सेस किया जाता है। इसे एक डिजिटल फाइलिंग कैबिनेट के रूप में सोचें जहां सभी महत्वपूर्ण जानकारी बड़े करीने से रखी जाती है।",
    analogy_title: "एक पुस्तकालय का उदाहरण",
    analogy_desc: "एक पुस्तकालय डेटाबेस का एक बेहतरीन वास्तविक दुनिया का उदाहरण है। पुस्तकालय में पुस्तकों का एक विशाल संग्रह है (डेटा)। पुस्तकें शैली, लेखक, आदि (संरचना) द्वारा व्यवस्थित की जाती हैं। आप पुस्तकालय की सूची (क्वेरी) का उपयोग करके एक पुस्तक खोज सकते हैं। लाइब्रेरियन जो आपको पुस्तक खोजने में मदद करता है, वह डेटाबेस मैनेजमेंट सिस्टम (DBMS) की तरह है।",
    why_db_title: "डेटाबेस क्यों महत्वपूर्ण हैं?",
    why_db_p1: "डेटाबेस आपके द्वारा उपयोग किए जाने वाले लगभग हर एप्लिकेशन की रीढ़ हैं। वे सोशल मीडिया पर आपकी प्रोफ़ाइल जानकारी, ऑनलाइन स्टोर पर आपके द्वारा देखे जाने वाले उत्पादों और यहां तक कि आपके फोन पर संपर्कों को भी संग्रहीत करते हैं।",
    why_db_p2: "डेटाबेस के बिना, जैसा कि हम जानते हैं, इंटरनेट का अस्तित्व नहीं होता। वे हमें बड़ी मात्रा में डेटा को जल्दी, कुशलतापूर्वक और सुरक्षित रूप سے اسٹور کرنے, بازیافت کرنے اور ان کا نظم کرنے کی اجازت دیتے ہیں۔",
    comparison_title: "डेटाबेस बनाम स्प्रेडशीट",
    comparison_desc: "हालांकि एक स्प्रेडशीट (जैसे एक्सेल) डेटा स्टोर कर सकती है, यह एक सच्चा डेटाबेस नहीं है। यहां एक त्वरित तुलना है:",
    comparison_table: [
      { feature: "डेटा का आकार", spreadsheet: "कम मात्रा में डेटा के लिए अच्छा है", database: "भारी मात्रा में डेटा को संभाल सकता है" },
      { feature: "कई उपयोगकर्ता", spreadsheet: "एक साथ कई लोगों के लिए संपादित करना मुश्किल है", database: "कई उपयोगकर्ताओं को एक साथ एक्सेस और संपादित करने के लिए डिज़ाइन किया गया है" },
      { feature: "डेटा की doğruluğu", spreadsheet: "गलतियाँ करना और गलत डेटा दर्ज करना आसान है", database: "यह सुनिश्चित करने के लिए नियम हैं कि डेटा सुसंगत और सटीक है" },
      { feature: "गति", spreadsheet: "बहुत सारे डेटा के साथ धीमा हो जाता है", database: "तेजी से डेटा पुनर्प्राप्ति के लिए अनुकूलित" }
    ],
    previous: "पिछला",
    next: "अगला",
  }
};

const Databases = () => {
  const [lang, setLang] = useState('en');
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

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return (
    <div className="p-4 sm:p-6 lg:p-8 min-h-screen bg-gray-50 font-sans">
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
        <div className="p-4 sm:p-6 max-w-4xl mx-auto bg-white rounded-2xl shadow-xl">
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
            <FaDatabase className="text-8xl text-blue-500" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-gray-50 p-6 rounded-lg shadow-inner mb-6"
          >
            <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-3 text-center">
              {t.what_is_db_title}
            </h2>
            <p className="text-gray-700 text-center mb-6" dangerouslySetInnerHTML={{ __html: t.what_is_db_desc }} />

            <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-3 text-center">
              {t.analogy_title}
            </h3>
            <p className="text-gray-700 text-center mb-6" dangerouslySetInnerHTML={{ __html: t.analogy_desc }} />

          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="bg-blue-50 p-6 rounded-lg shadow-sm border-l-4 border-blue-400 mb-6"
          >
            <h2 className="text-xl sm:text-2xl font-bold mb-3 text-center text-blue-800">{t.why_db_title}</h2>
            <p className="text-gray-700" dangerouslySetInnerHTML={{ __html: t.why_db_p1 }} />
            <p className="mt-4 text-gray-700">{t.why_db_p2}</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="bg-green-50 p-6 rounded-lg shadow-sm border-l-4 border-green-400"
          >
            <h2 className="text-xl sm:text-2xl font-bold mb-3 text-center text-green-800">{t.comparison_title}</h2>
            <p className="text-gray-700 text-center mb-6" dangerouslySetInnerHTML={{ __html: t.comparison_desc }} />
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left text-gray-500">
                <thead className="text-xs text-gray-700 uppercase bg-gray-200">
                  <tr>
                    <th scope="col" className="px-6 py-3">Feature</th>
                    <th scope="col" className="px-6 py-3">Spreadsheet</th>
                    <th scope="col" className="px-6 py-3">Database</th>
                  </tr>
                </thead>
                <tbody>
                  {t.comparison_table.map((row, index) => (
                    <tr key={index} className="bg-white border-b">
                      <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">{row.feature}</th>
                      <td className="px-6 py-4">{row.spreadsheet}</td>
                      <td className="px-6 py-4">{row.database}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        </div>

        <div className="w-full flex justify-between items-center mt-10 p-4 bg-gray-100 rounded-lg shadow-md">
          <button
            onClick={() => navigate('/module3/ui-ux')}
            className="flex items-center gap-2 px-4 py-2 bg-purple-200 hover:bg-purple-300 text-purple-900 rounded-lg shadow transition"
          >
            <FaArrowLeft />
            {t.previous}
          </button>
          <button
            onClick={() => navigate('/module3/backend')}
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

export default Databases;
