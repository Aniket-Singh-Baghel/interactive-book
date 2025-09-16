import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

const translations = {
  en: {
    heading: "Acknowledgment",
    paragraphs: [
      "Even today, many students studying in government schools do not receive proper computer education. Due to a lack of sufficient books, resources, and opportunities, many students leave school without basic knowledge of computers.",
      "This situation inspired me to create this e‑book. Through this book, I have tried to present the fundamental concepts of computers, their components, and the computer world in simple language, with correct examples and attractive visuals.",
      "If this e‑book helps even a little in students' computer education, it will be my greatest success and joy.",
      "This book is designed so that students can gain knowledge in both Hindi and English. Also, the user interface has been kept as simple and intuitive as possible so that every student can use it easily.",
      "I would like to express my gratitude to all the teachers, friends, and family members who directly or indirectly encouraged and guided me in this work.",
    ],
    signature: "— Aniket Singh Baghel,\n ICT Instructor\nGovt. H.S.S. Ichaul, Satna",
    startButton: "Start your journey",
    topHint: "Scroll down and click the button to start your journey",
    langOptions: { en: "English", hi: "हिन्दी", both: "Both" },
  },
  hi: {
    heading: "आभार",
    paragraphs: [
      "आज भी कई सरकारी विद्यालयों में पढ़ने वाले विद्यार्थियों को कंप्यूटर शिक्षा सही रूप से प्राप्त नहीं हो पाती। पर्याप्त पुस्तकें, संसाधन और अवसर उपलब्ध न होने के कारण अनेक विद्यार्थी पूरे विद्यालयी जीवन में कंप्यूटर की मूलभूत जानकारी से भी वंचित रह जाते हैं।",
      "इसी स्थिति ने मुझे इस ई‑पुस्तक को बनाने के लिए प्रेरित किया। मेरा प्रयास रहा है कि इस पुस्तक के माध्यम से विद्यार्थियों को कंप्यूटर, उसके घटकों तथा कंप्यूटर जगत की मूलभूत अवधारणाओं की जानकारी सरल भाषा, सही उदाहरणों और आकर्षक चित्रों के साथ मिले।",
      "यदि यह ई‑पुस्तक बच्चों को कंप्यूटर शिक्षा में थोड़ी भी मदद करती है तो यह मेरे लिए सबसे बड़ी सफलता और खुशी की बात होगी।",
      "इस पुस्तक को इस प्रकार डिज़ाइन किया गया है कि विद्यार्थी हिंदी तथा अंग्रेज़ी — दोनों भाषाओं में ज्ञान प्राप्त कर सकें। साथ ही, इसका यूज़र इंटरफ़ेस बिल्कुल सरल और सहज रखने का प्रयास किया गया है ताकि हर विद्यार्थी आसानी से इसका उपयोग कर सके।",
      "मैं उन सभी शिक्षकों, मित्रों और परिवारजनों का आभार प्रकट करता हूँ जिन्होंने प्रत्यक्ष या परोक्ष रूप से इस कार्य में मेरा उत्साह बढ़ाया और मेरा मार्गदर्शन किया।",
    ],
    signature: "— Aniket Singh Baghel,\n ICT Instructor\nGovt. H.S.S. Ichaul, Satna",
    startButton: "अपना सफर शुरू करें",
    topHint: "नीचे स्क्रॉल करें और अपना सफर शुरू करने के लिए बटन पर क्लिक करें",
    langOptions: { en: "English", hi: "हिन्दी", both: "दोनों" },
  },
};

export default function AcknowledgmentComponent({ onStart } = {}) {

  const ackRef = useRef(null);
  const startBtnRef = useRef(null);
  const [langView, setLangView] = useState("en");
  const navigate = useNavigate() // 'en' | 'hi'

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-green-50 to-yellow-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      {/* Top hero / CTA */}

      <main className="max-w-4xl mx-auto px-4 py-12">
        {/* New Header */}
        <header className="flex items-center justify-between mb-8 p-4">
            <p className="text-center text-base font-semibold text-gray-700 dark:text-gray-300 ">
              Scroll down to start your journey
            </p>
          <div className="flex space-x-2">
            <button
              onClick={() => setLangView("en")}
              className={`px-3 py-1 rounded-lg border font-semibold ${
                langView === "en"
                  ? "bg-sky-600 text-white border-sky-600"
                  : "bg-white text-gray-700 border-gray-300"
              } transition`}
            >
              EN
            </button>
            <button
              onClick={() => setLangView("hi")}
              className={`px-3 py-1 rounded-lg border font-semibold ${
                langView === "hi"
                  ? "bg-sky-600 text-white border-sky-600"
                  : "bg-white text-gray-700 border-gray-300"
              } transition`}
            >
              हिं
            </button>
          </div>
        </header>

        {/* Acknowledgment Card */}
        <section ref={ackRef} className="space-y-6">
          {langView === "en" && (
            <article className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
              <h3 className="text-xl font-semibold mb-3">{translations.en.heading}</h3>
              {translations.en.paragraphs.map((p, i) => (
                <p key={i} className="text-gray-700 dark:text-gray-300 mb-3 leading-relaxed">
                  {p}
                </p>
              ))}
              <p className="mt-4 whitespace-pre-line text-sm font-medium">{translations.en.signature}</p>
            </article>
          )}

          {langView === "hi" && (
            <article className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
              <h3 className="text-xl font-semibold mb-3">{translations.hi.heading}</h3>
              {translations.hi.paragraphs.map((p, i) => (
                <p key={i} className="text-gray-700 dark:text-gray-300 mb-3 leading-relaxed">
                  {p}
                </p>
              ))}
              <p className="mt-4 whitespace-pre-line text-sm font-medium">{translations.hi.signature}</p>
            </article>
          )}

          {/* Start your journey button */}
          <div className="flex justify-center mt-6">
            <button
              ref={startBtnRef}
              onClick={() => navigate('/introduction')}
              className="px-6 py-3 rounded-lg bg-green-600 text-white font-semibold hover:brightness-105 focus:outline-none focus:ring-2 focus:ring-green-400"
            >
              {langView === "hi" ? translations.hi.startButton : translations.en.startButton}
            </button>
          </div>
        </section>
      </main>

      <footer className="text-center mb-6 text-sm text-gray-500">ICT connects people, ideas, and knowledge—making the world smarter and closer.</footer>
    </div>
  );
}
