import React, { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { FaHome, FaArrowLeft, FaArrowRight, FaServer, FaDatabase, FaCode, FaUserShield, FaBrain } from "react-icons/fa";
import { Link, useNavigate } from 'react-router-dom';

const content = {
  en: {
    home: "Home",
    title: "Backend Development: The Digital Brain 🧠",
    subtitle: "Explore the powerful server-side that handles data, security, and the logic that makes applications work seamlessly.",
    main_analogy_title: "The Restaurant Kitchen Analogy",
    main_analogy_desc: "A web application is like a restaurant. The frontend is the dining area where you enjoy your meal. The backend is the bustling kitchen where chefs (servers) prepare food (process data) using ingredients from a well-stocked pantry (database).",
    server_title: "The Server: The Master Chef",
    server_desc: "The server acts as the head chef, orchestrating the entire kitchen. It takes orders (requests), manages the cooking process, and ensures every dish (response) is perfect.",
    database_title: "The Database: The Pantry",
    database_desc: "The database is a vast, organized pantry. It stores every ingredient (data) imaginable, from user profiles to content, all neatly labeled and ready for the chef.",
    api_title: "The API: The Waiter",
    api_desc: "The API is the diligent waiter, shuttling orders between the dining room (frontend) and the kitchen (backend). It's the vital communication link that ensures you get what you asked for.",
    auth_title: "Authentication & Authorization",
    auth_desc: "This is like the restaurant's security. Authentication is checking your ID at the door to see who you are. Authorization is checking the guest list to see what areas you're allowed to access.",
    clarification_title: "Frontend vs. Backend vs. Database",
    clarification_frontend: "<strong>Frontend:</strong> What you see and interact with (the dining area). It's all about the user experience, design, and presentation.",
    clarification_backend: "<strong>Backend:</strong> The hidden engine (the kitchen). It handles the logic, calculations, and data management that you don't see.",
    clarification_database: "<strong>Database:</strong> The organized storage (the pantry). It's where all the application's data is kept securely.",
    live_example_title: "Live Backend Example: User Login",
    live_example_desc: "Enter a username below to see how the backend 'authenticates' a user. This is a simplified simulation.",
    live_example_button: "Login",
    live_example_loading: "Checking credentials...",
    live_example_success: "Welcome, ",
    live_example_error: "User not found. Try 'admin' or 'guest'.",
    previous: "previous",
    next: "Next",
  },
  hi: {
    home: "होम",
    title: "बैकएंड डेवलपमेंट: डिजिटल मस्तिष्क 🧠",
    subtitle: "शक्तिशाली सर्वर-साइड का अन्वेषण करें जो डेटा, सुरक्षा और उस तर्क को संभालता है जो अनुप्रयोगों को सहजता से काम करता है।",
    main_analogy_title: "रेस्टोरेंट की रसोई की उपमा",
    main_analogy_desc: "एक वेब एप्लिकेशन एक रेस्टोरेंट की तरह है। फ्रंटएंड डाइनिंग एरिया है जहाँ आप अपने भोजन का आनंद लेते हैं। बैकएंड व्यस्त रसोई है जहाँ शेफ (सर्वर) एक अच्छी तरह से स्टॉक की गई पेंट्री (डेटाबेस) से सामग्री का उपयोग करके भोजन (डेटा प्रोसेस) तैयार करते हैं।",
    server_title: "सर्वर: मास्टर शेफ",
    server_desc: "सर्वर हेड शेफ के रूप में काम करता है, जो पूरी रसोई का संचालन करता है। यह ऑर्डर (अनुरोध) लेता है, खाना पकाने की प्रक्रिया का प्रबंधन करता है, और यह सुनिश्चित करता है कि हर व्यंजन (प्रतिक्रिया) एकदम सही हो।",
    database_title: "डेटाबेस: पैंट्री",
    database_desc: "डेटाबेस एक विशाल, संगठित पेंट्री है। यह उपयोगकर्ता प्रोफाइल से लेकर सामग्री तक, हर कल्पनीय घटक (डेटा) को संग्रहीत करता है, सभी बड़े करीने से लेबल किए गए और शेफ के लिए तैयार हैं।",
    api_title: "एपीआई: वेटर",
    api_desc: "एपीआई मेहनती वेटर है, जो डाइनिंग रूम (फ्रंटएंड) और किचन (बैकएंड) के बीच ऑर्डर भेजता है। यह महत्वपूर्ण संचार लिंक है जो यह सुनिश्चित करता है कि आपको वही मिले जो आपने मांगा था।",
    auth_title: "प्रमाणीकरण और प्राधिकरण",
    auth_desc: "यह रेस्टोरेंट की सुरक्षा की तरह है। प्रमाणीकरण यह देखने के लिए दरवाजे पर आपकी आईडी की जाँच कर रहा है कि आप कौन हैं। प्राधिकरण यह देखने के लिए अतिथि सूची की जाँच कर रहा है कि आपको किन क्षेत्रों तक पहुँचने की अनुमति है।",
    clarification_title: "फ्रंटएंड बनाम बैकएंड बनाम डेटाबेस",
    clarification_frontend: "<strong>फ्रंटएंड:</strong> जो आप देखते हैं और जिसके साथ इंटरैक्ट करते हैं (डाइनिंग एरिया)। यह सब उपयोगकर्ता अनुभव, डिजाइन और प्रस्तुति के बारे में है।",
    clarification_backend: "<strong>बैकएंड:</strong> छिपा हुआ इंजन (रसोई)। यह उस तर्क, गणना और डेटा प्रबंधन को संभालता है जिसे आप नहीं देखते हैं।",
    clarification_database: "<strong>डेटाबेस:</strong> संगठित भंडारण (पेंट्री)। यहीं पर एप्लिकेशन का सारा डेटा सुरक्षित रूप से रखा जाता है।",
    live_example_title: "लाइव बैकएंड उदाहरण: उपयोगकर्ता लॉगिन",
    live_example_desc: "यह देखने के लिए नीचे एक उपयोगकर्ता नाम दर्ज करें कि बैकएंड उपयोगकर्ता को कैसे 'प्रमाणित' करता है। यह एक सरलीकृत सिमुलेशन है।",
    live_example_button: "लॉग इन करें",
    live_example_loading: "क्रेडेंशियल्स की जाँच हो रही है...",
    live_example_success: "आपका स्वागत है, ",
    live_example_error: "उपयोगकर्ता नहीं मिला। 'admin' या 'guest' का प्रयास करें।",
    previous: "पिछला",
    next: "अगला",
  }
};

const Card = ({ icon, title, description, children }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.5 }}
    transition={{ duration: 0.6, ease: "easeOut" }}
    className="bg-white p-6 rounded-xl shadow-lg border border-gray-200 hover:shadow-pink-100 transition-all duration-300"
  >
    <div className="flex items-center mb-4">
      <div className="p-3 bg-pink-100 text-pink-500 rounded-full mr-4">
        {icon}
      </div>
      <h3 className="text-xl font-bold text-gray-800">{title}</h3>
    </div>
    <p className="text-gray-600" dangerouslySetInnerHTML={{ __html: description }} />
    {children}
  </motion.div>
);

const BackendDevelopment = () => {
  const [lang, setLang] = useState('en');
  const [username, setUsername] = useState('');
  const [loginStatus, setLoginStatus] = useState('');
  const [loading, setLoading] = useState(false);
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
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleLogin = useCallback(() => {
    setLoading(true);
    setLoginStatus('');
    setTimeout(() => {
      if (username.toLowerCase() === 'admin' || username.toLowerCase() === 'guest') {
        setLoginStatus(`${t.live_example_success}${username}!`);
      } else {
        setLoginStatus(t.live_example_error);
      }
      setLoading(false);
    }, 1500);
  }, [username, t]);

  return (
    <div className="p-4 sm:p-6 lg:p-8 min-h-screen bg-pink-50 text-gray-800 font-sans">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center justify-between mb-12">
          <Link to="/parts/prt2" className="inline-flex items-center px-4 py-2 bg-white rounded-full shadow-md border border-gray-200 hover:bg-gray-100 transition">
            <FaHome className="mr-2 text-lg text-pink-500" />
            {t.home}
          </Link>
          <div className="flex space-x-2">
            <button onClick={() => setLang("en")} className={`px-3 py-1 rounded-lg border font-semibold ${lang === "en" ? "bg-pink-500 text-white border-pink-500" : "bg-white text-gray-700 border-gray-300"} transition`}>EN</button>
            <button onClick={() => setLang("hi")} className={`px-3 py-1 rounded-lg border font-semibold ${lang === "hi" ? "bg-pink-500 text-white border-pink-500" : "bg-white text-gray-700 border-gray-300"} transition`}>हिं</button>
          </div>
        </div>

        <div className="text-center mb-12">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900 mb-3"
          >
            {t.title}
          </motion.h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            {t.subtitle}
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          <Card icon={<FaServer size={22} />} title={t.server_title} description={t.server_desc} />
          <Card icon={<FaDatabase size={22} />} title={t.database_title} description={t.database_desc} />
          <Card icon={<FaCode size={22} />} title={t.api_title} description={t.api_desc} />
        </div>

        <div className="grid md:grid-cols-1 gap-8 mb-12">
          <Card icon={<FaUserShield size={22} />} title={t.auth_title} description={t.auth_desc} />
        </div>

        <Card icon={<FaBrain size={22} />} title={t.clarification_title}>
          <div className="mt-4 space-y-4">
            <p className="text-gray-600" dangerouslySetInnerHTML={{ __html: t.clarification_frontend }} />
            <p className="text-gray-600" dangerouslySetInnerHTML={{ __html: t.clarification_backend }} />
            <p className="text-gray-600" dangerouslySetInnerHTML={{ __html: t.clarification_database }} />
          </div>
        </Card>

        <div className="mt-12">
          <Card icon={<FaCode size={22} />} title={t.live_example_title} description={t.live_example_desc}>
            <div className="mt-4 flex flex-col sm:flex-row gap-4 items-center">
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter username"
                className="w-full sm:w-auto flex-grow bg-gray-100 border border-gray-300 rounded-lg px-4 py-2 text-gray-800 focus:outline-none focus:ring-2 focus:ring-pink-400"
              />
              <motion.button
                onClick={handleLogin}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full sm:w-auto px-6 py-2 bg-pink-500 text-white font-bold rounded-lg shadow-lg hover:bg-pink-600 transition"
                disabled={loading}
              >
                {loading ? t.live_example_loading : t.live_example_button}
              </motion.button>
            </div>
            {loginStatus && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className={`mt-4 text-center font-semibold ${loginStatus.includes(t.live_example_success) ? 'text-green-600' : 'text-red-600'}`}
              >
                {loginStatus}
              </motion.p>
            )}
          </Card>
        </div>


        <div className="w-full flex justify-between items-center mt-12 p-4 bg-white rounded-lg shadow-md border border-gray-200">
          <button
            onClick={() => navigate('/module3/frontend')}
            className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-pink-600 rounded-lg shadow transition"
          >
            <FaArrowLeft />
            {t.previous}
          </button>
          <button
            onClick={() => navigate('/module3/databases')}
            className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-pink-600 rounded-lg shadow transition"
          >
            {t.next}
            <FaArrowRight />
          </button>
        </div>
      </div>
    </div>
  );
};

export default BackendDevelopment;
