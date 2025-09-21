import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  Monitor,
  MousePointerClick,
  Paintbrush,
  Sparkles,
  Lightbulb,
} from "lucide-react";
import { FaHome, FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import InteractiveWorkflow from "./InteractiveWorkflow";

const content = {
  en: {
    home: "Home",
    title: "Frontend Development",
    subtitle:
      "Building the visual, interactive part of an app — like designing a shop's storefront, signs, and lights that make people smile.",
    badges: ["Visual", "Interactive", "Playful"],
    cards: [
      {
        icon: <Monitor size={22} className="text-sky-500" />,
        title: "What you see",
        desc: "Screens, buttons, colors — frontend draws the stage where app stories happen.",
      },
      {
        icon: <MousePointerClick size={22} className="text-green-500" />,
        title: "What you do",
        desc: "Click, type, swipe — frontend makes these actions delightful and clear.",
      },
      {
        icon: <Paintbrush size={22} className="text-pink-500" />,
        title: "Design",
        desc: "Colors, spacing and friendly text guide people to explore and have fun.",
      },
      {
        icon: <Lightbulb size={22} className="text-yellow-500" />,
        title: "Why it matters",
        desc: "Good frontend turns ideas into joyful experiences — like turning a blank shop into a welcoming place.",
      },
    ],
    howItWorksTitle: "How Frontend Builds an App — A Simple Analogy",
    howItWorksSteps: [
      "<b>Architect's Blueprint (UI/UX Design):</b> Before building a house, an architect draws a blueprint. Similarly, designers create wireframes and mockups that show where buttons, text, and images will go.",
      "<b>Building the Structure (HTML):</b> This is like building the walls and rooms of the house. HTML (HyperText Markup Language) provides the basic structure of a webpage.",
      "<b>Painting and Decorating (CSS):</b> Once the walls are up, you paint them, add furniture, and hang decorations. CSS (Cascading Style Sheets) is used to style the webpage with colors, fonts, and layouts.",
      "<b>Making it Interactive (JavaScript):</b> This is like adding electricity to the house so you can turn on lights, open the garage door, and use appliances. JavaScript brings the webpage to life, making buttons clickable and adding animations.",
    ],
    comparisonTitle: "Frontend vs. Backend: The Restaurant Analogy",
    comparison: [
      {
        role: "Frontend (The Dining Area)",
        desc: "This is everything the customer sees and interacts with: the decor, the menu, the seating, and the waiters. It’s all about presentation and user experience.",
        color: "bg-sky-100",
      },
      {
        role: "Backend (The Kitchen)",
        desc: "This is where the food is actually cooked and prepared. Customers don't see the kitchen, but it's essential for the restaurant to function. The backend handles the database, servers, and application logic.",
        color: "bg-green-100",
      },
    ],
    quizTitle: "Quick Quiz",
    quizQuestion: "Which technology is like the 'paint and furniture' of a website?",
    quizOptions: ["HTML", "CSS", "JavaScript"],
    correctAnswer: "CSS",
    interactiveWorkflow: {
      title: "From Idea to Interactive: A Mini-Project",
      card: {
        title: "Cool Gadget",
        description: "A very useful tool for your daily tasks.",
        button: "Add to Cart",
        buttonAdded: "Added!",
      },
      steps: [
        {
          title: "Blueprint",
          description: "First, we sketch a blueprint (wireframe). It's a simple plan showing where everything goes, without any colors or styles.",
          code: null,
        },
        {
          title: "HTML: The Structure",
          description: "Next, we build the skeleton with HTML. These tags create the basic structure, like adding walls and rooms to a house.",
          code: `
<div class="card">
  <img src="gadget.jpg" alt="Gadget">
  <h3>Cool Gadget</h3>
  <p>A very useful tool...</p>
  <button>Add to Cart</button>
</div>
          `,
        },
        {
          title: "CSS: The Style",
          description: "Now, we add style with CSS. We set colors, fonts, and spacing to make it look great. It's like painting and decorating the house.",
          code: `
.card {
  background: white;
  border-radius: 1rem;
  padding: 1rem;
  box-shadow: 0 10px 15px -3px rgba(0,0,0,0.1);
}

button {
  background-color: #3b82f6; /* blue-500 */
  color: white;
  padding: 0.75rem;
  border-radius: 0.5rem;
}
          `,
        },
        {
          title: "JS: The Magic",
          description: "Finally, we add JavaScript to make it interactive. Now, when you click the button, it changes its text and color!",
          code: `
const button = document.querySelector('button');

button.addEventListener('click', () => {
  button.textContent = 'Added!';
  button.style.backgroundColor = '#22c55e'; // green-500
});
          `,
        },
      ],
    },
    previous: "Previous",
    next: "Next",
  },
  hi: {
    home: "होम",
    title: "फ्रंटएंड डेवलपमेंट",
    subtitle:
      "ऐप का विज़ुअल, इंटरैक्टिव हिस्सा बनाना - जैसे किसी दुकान के 🧿, संकेत, और रोशनी डिज़ाइन करना जो लोगों को मुस्कुराने पर मजबूर कर दे।",
    badges: ["दृश्य", "इंटरैक्टिव", "मनोहर"],
    cards: [
      {
        icon: <Monitor size={22} className="text-sky-500" />,
        title: "आप क्या देखते हैं",
        desc: "स्क्रीन, बटन, रंग - फ्रंटएंड वह मंच बनाता है जहां ऐप की कहानियां होती हैं।",
      },
      {
        icon: <MousePointerClick size={22} className="text-green-500" />,
        title: "आप क्या करते हैं",
        desc: "क्लिक करें, टाइप करें, स्वाइप करें - फ्रंटएंड इन क्रियाओं को रमणीय और स्पष्ट बनाता है।",
      },
      {
        icon: <Paintbrush size={22} className="text-pink-500" />,
        title: "डिज़ाइन",
        desc: "रंग, स्पेसिंग और मैत्रीपूर्ण टेक्स्ट लोगों को खोजने और मज़े करने के लिए मार्गदर्शन करते हैं।",
      },
      {
        icon: <Lightbulb size={22} className="text-yellow-500" />,
        title: "यह क्यों मायने रखता है",
        desc: "अच्छा फ्रंटएंड विचारों को आनंदमय अनुभवों में बदल देता है - जैसे एक खाली दुकान को एक स्वागत योग्य जगह में बदलना।",
      },
    ],
    howItWorksTitle: "फ्रंटएंड एक ऐप कैसे बनाता है - एक सरल सादृश्य",
    howItWorksSteps: [
      "<b>वास्तुकार का ब्लूप्रिंट (UI/UX डिज़ाइन):</b> घर बनाने से पहले, एक वास्तुकार एक ब्लूप्रिंट बनाता है। इसी तरह, डिज़ाइनर वायरफ्रेम और मॉकअप बनाते हैं जो दिखाते हैं कि बटन, टेक्स्ट और चित्र कहाँ जाएंगे।",
      "<b>संरचना का निर्माण (HTML):</b> यह घर की दीवारों और कमरों के निर्माण की तरह है। HTML (हाइपरटेक्स्ट मार्कअप लैंग्वेज) एक वेबपेज की मूल संरचना प्रदान करता है।",
      "<b>पेंटिंग और सजावट (CSS):</b> दीवारें बन जाने के बाद, आप उन्हें पेंट करते हैं, फर्नीचर जोड़ते हैं, और सजावट लटकाते हैं। CSS (कैस्केडिंग स्टाइल शीट्स) का उपयोग वेबपेज को रंगों, फोंट और लेआउट के साथ स्टाइल करने के लिए किया जाता है।",
      "<b>इसे इंटरैक्टिव बनाना (JavaScript):</b> यह घर में बिजली जोड़ने जैसा है ताकि आप लाइट चालू कर सकें, गैरेज का दरवाज़ा खोल सकें और उपकरणों का उपयोग कर सकें। जावास्क्रिप्ट वेबपेज को जीवंत करता है, बटन को क्लिक करने योग्य बनाता है और एनिमेशन जोड़ता है।",
    ],
    comparisonTitle: "फ्रंटएंड बनाम बैकएंड: रेस्तरां सादृश्य",
    comparison: [
      {
        role: "फ्रंटएंड (भोजन क्षेत्र)",
        desc: "यह वह सब कुछ है जो ग्राहक देखता है और जिसके साथ इंटरैक्ट करता है: सजावट, मेनू, बैठने की जगह और वेटर। यह सब प्रस्तुति और उपयोगकर्ता अनुभव के बारे में है।",
        color: "bg-sky-100",
      },
      {
        role: "बैकएंड (रसोई)",
        desc: "यह वह जगह है जहाँ खाना वास्तव में पकाया और तैयार किया जाता है। ग्राहक रसोई नहीं देखते हैं, लेकिन रेस्तरां के कामकाज के लिए यह आवश्यक है। बैकएंड डेटाबेस, सर्वर और एप्लिकेशन लॉजिक को संभालता है।",
        color: "bg-green-100",
      },
    ],
    quizTitle: "क्विक क्विज़",
    quizQuestion: "कौन सी तकनीक किसी वेबसाइट के 'पेंट और फर्नीचर' की तरह है?",
    quizOptions: ["HTML", "CSS", "JavaScript"],
    correctAnswer: "CSS",
    interactiveWorkflow: {
      title: "विचार से इंटरैक्टिव तक: एक मिनी-प्रोजेक्ट",
      card: {
        title: "कूल गैजेट",
        description: "आपके दैनिक कार्यों के लिए एक बहुत ही उपयोगी उपकरण।",
        button: "कार्ट में जोड़ें",
        buttonAdded: "जोड़ा गया!",
      },
      steps: [
        {
          title: "ब्लूप्रिंट",
          description: "सबसे पहले, हम एक ब्लूप्रिंट (वायरफ्रेम) स्केच करते हैं। यह एक सरल योजना है जो दिखाती है कि सब कुछ कहाँ जाएगा, बिना किसी रंग या स्टाइल के।",
          code: null,
        },
        {
          title: "HTML: संरचना",
          description: "इसके बाद, हम HTML के साथ कंकाल बनाते हैं। ये टैग मूल संरचना बनाते हैं, जैसे घर में दीवारें और कमरे जोड़ना।",
          code: `
<div class="card">
  <img src="gadget.jpg" alt="Gadget">
  <h3>कूल गैजेट</h3>
  <p>एक बहुत ही उपयोगी उपकरण...</p>
  <button>कार्ट में जोड़ें</button>
</div>
          `,
        },
        {
          title: "CSS: स्टाइल",
          description: "अब, हम CSS के साथ स्टाइल जोड़ते हैं। हम इसे शानदार दिखाने के लिए रंग, फ़ॉन्ट और स्पेसिंग सेट करते हैं। यह घर को पेंट करने और सजाने जैसा है।",
          code: `
.card {
  background: white;
  border-radius: 1rem;
  padding: 1rem;
  box-shadow: 0 10px 15px -3px rgba(0,0,0,0.1);
}

button {
  background-color: #3b82f6; /* नीला-500 */
  color: white;
  padding: 0.75rem;
  border-radius: 0.5rem;
}
          `,
        },
        {
          title: "JS: जादू",
          description: "अंत में, हम इसे इंटरैक्टिव बनाने के लिए जावास्क्रिप्ट जोड़ते हैं। अब, जब आप बटन पर क्लिक करते हैं, तो इसका टेक्स्ट और रंग बदल जाता है!",
          code: `
const button = document.querySelector('button');

button.addEventListener('click', () => {
  button.textContent = 'जोड़ा गया!';
  button.style.backgroundColor = '#22c55e'; // हरा-500
});
          `,
        },
      ],
    },
    previous: "पिछला",
    next: "अगला",
  },
};

const Card = ({ children, className = "" }) => (
  <div className={`rounded-2xl shadow-lg bg-white p-5 ${className}`}>
    {children}
  </div>
);

const Badge = ({ children }) => (
  <span className="px-3 py-1 rounded-full bg-sky-100 text-sky-800 text-sm font-semibold shadow">
    {children}
  </span>
);

export default function FrontendDevelopment() {
  const [lang, setLang] = useState("en");
  const [quizFeedback, setQuizFeedback] = useState(null);
  const navigate = useNavigate();
  const t = content[lang];

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.ctrlKey && event.key === "k") {
        event.preventDefault();
        setLang((prevLang) => (prevLang === "en" ? "hi" : "en"));
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const handleQuizOptionClick = (option) => {
    if (option === t.correctAnswer) {
      setQuizFeedback({ type: "correct", message: "Correct! CSS is for styling." });
    } else {
      setQuizFeedback({ type: "incorrect", message: "Not quite. Try again!" });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">
      <div className="max-w-5xl mx-auto">
        <header className="flex items-center justify-between mb-8">
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
              className={`px-3 py-1 rounded-lg border font-semibold ${
                lang === "en"
                  ? "bg-sky-600 text-white border-sky-600"
                  : "bg-white text-gray-700 border-gray-300"
              } transition`}
            >
              EN
            </button>
            <button
              onClick={() => setLang("hi")}
              className={`px-3 py-1 rounded-lg border font-semibold ${
                lang === "hi"
                  ? "bg-sky-600 text-white border-sky-600"
                  : "bg-white text-gray-700 border-gray-300"
              } transition`}
            >
              हिं
            </button>
          </div>
        </header>

        <main className="space-y-12">
          <section>
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="p-3 rounded-2xl bg-yellow-200 shadow-md">
                  <Sparkles size={28} className="text-orange-600" />
                </div>
                <div>
                  <h1 className="text-3xl md:text-4xl font-extrabold text-gray-800">
                    {t.title}
                  </h1>
                  <p className="text-gray-600 mt-1 max-w-2xl">{t.subtitle}</p>
                </div>
              </div>
              <div className="flex gap-2 flex-wrap">
                {t.badges.map((badge, index) => (
                  <Badge key={index}>{badge}</Badge>
                ))}
              </div>
            </motion.div>

            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {t.cards.map((card, index) => (
                <Card key={index}>
                  <div className="flex items-start gap-4">
                    {card.icon}
                    <div>
                      <h4 className="font-bold">{card.title}</h4>
                      <p className="text-sm text-gray-600">{card.desc}</p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">{t.howItWorksTitle}</h2>
            <div className="space-y-4">
              {t.howItWorksSteps.map((step, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-start gap-4 p-4 bg-white rounded-lg shadow"
                >
                  <div className="text-2xl font-bold text-sky-500">{index + 1}</div>
                  <p className="text-gray-700" dangerouslySetInnerHTML={{ __html: step }} />
                </motion.div>
              ))}
            </div>
          </section>

          <section>
            <InteractiveWorkflow content={t.interactiveWorkflow} />
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">{t.comparisonTitle}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {t.comparison.map((item, index) => (
                <Card key={index} className={item.color}>
                  <h3 className="font-bold text-lg mb-2">{item.role}</h3>
                  <p className="text-sm text-gray-700">{item.desc}</p>
                </Card>
              ))}
            </div>
          </section>

          <section>
            <Card>
              <h3 className="text-lg font-bold">{t.quizTitle}</h3>
              <p className="mt-2 text-sm text-gray-600">{t.quizQuestion}</p>
              <div className="mt-3 flex gap-2">
                {t.quizOptions.map((option) => (
                  <button
                    key={option}
                    onClick={() => handleQuizOptionClick(option)}
                    className="px-4 py-2 rounded-lg bg-white shadow hover:bg-gray-100 transition"
                  >
                    {option}
                  </button>
                ))}
              </div>
              {quizFeedback && (
                <p
                  className={`mt-3 text-sm font-semibold ${
                    quizFeedback.type === "correct" ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {quizFeedback.message}
                </p>
              )}
            </Card>
          </section>
        </main>

        <footer className="w-full flex justify-between items-center mt-12 p-4 bg-gray-100 rounded-lg shadow-md">
          <button
            onClick={() => navigate("/module3/ui-ux")}
            className="flex items-center gap-2 px-4 py-2 bg-purple-200 hover:bg-purple-300 text-purple-900 rounded-lg shadow transition"
          >
            <FaArrowLeft />
            {t.previous}
          </button>
          <button
            onClick={() => navigate("/module3/backend")}
            className="flex items-center gap-2 px-4 py-2 bg-green-200 hover:bg-green-300 text-green-900 rounded-lg shadow transition"
          >
            {t.next}
            <FaArrowRight />
          </button>
        </footer>
      </div>
    </div>
  );
}
