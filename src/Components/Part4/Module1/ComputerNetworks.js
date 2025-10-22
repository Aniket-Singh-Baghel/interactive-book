import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Wifi,
  Server,
  Globe,
  Home,
  Bluetooth,
  Cloud,
} from "lucide-react";
import { FaHome, FaArrowLeft, FaArrowRight, FaNetworkWired } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";

const content = {
  en: {
    home: "Home",
    previous: "Previous",
    next: "Next",
    title: "Computer Networks",
    subtitle: "A friendly, visual dive into LAN, WAN, PAN and how data flows.",
    networkOverviewTitle: "What is a Network?",
    networkOverviewText: "A network connects devices so they can exchange data — like houses in a town connected by roads. Networks range from tiny (your smartwatch talking to your phone) to global (the Internet connecting the world).",
    pc: "PC",
    phone: "Phone",
    laptop: "Laptop",
    router: "Router",
    server: "Server",
    networkTypes: [
      { key: "PAN", title: "PAN — Personal Area Network", blurb: "Connects your personal devices, like a smartwatch to a phone.", details: "Covers a few meters, typically using Bluetooth. It's for connecting peripherals without needing a router." },
      { key: "LAN", title: "LAN — Local Area Network", blurb: "Connects devices in a single room, office, or building.", details: "High-speed and secure, a LAN is the most common network for homes and businesses to share resources like printers." },
      { key: "WLAN", title: "WLAN — Wireless LAN", blurb: "A LAN, but without the cables, using Wi-Fi technology.", details: "Offers the convenience of mobility within the LAN's range, but can be less stable than a wired connection." },
      { key: "MAN", title: "MAN — Metropolitan Area Network", blurb: "Connects a city or a large campus, linking multiple LANs.", details: "Often used by governments or large corporations to build a private network across a city." },
      { key: "WAN", title: "WAN — Wide Area Network", blurb: "Spans a large geographical area, connecting countries.", details: "The Internet is the largest WAN, a global network of computers. WANs connect LANs and MANs together." },
    ],
    realWorldTitle: "Real-World Examples",
    realWorldSubtitle: "Explore common networks you meet every day.",
    realWorldExamples: [
      { title: "Home Wi‑Fi (LAN / WLAN)", desc: "Your laptop, phone, and smart TV connect to a single router, which in turn connects to the internet. This setup lets you share files locally and access the web." },
      { title: "School Computer Lab (LAN)", desc: "All computers are connected via Ethernet cables to a central server and a shared printer, allowing students to access common files and print from any machine." },
      { title: "City-Wide Public Wi-Fi (MAN)", desc: "A city provides free internet access in parks and public buildings by linking multiple Wi-Fi hotspots across town, creating a large municipal network." },
      { title: "Global Video Conference (WAN)", desc: "Colleagues in different countries join a video call. Their voices and video travel through their local LANs, across the global WAN (the Internet), and to each other." },
    ],
    comparisonTitle: "Network Types: A Quick Comparison",
    tableHeaders: { network: "Network", coverage: "Coverage", speed: "Speed", compatibility: "Compatibility", cost: "Cost" },
    tableRows: [
      { type: "PAN", area: "~1–10 m", speed: "Low", compatibility: "High", cost: "Low" },
      { type: "LAN", area: "Home/Office", speed: "High", compatibility: "High", cost: "Medium" },
      { type: "WLAN", area: "Home/Office", speed: "Medium-High", compatibility: "Very High", cost: "Medium" },
      { type: "MAN", area: "City/Campus", speed: "Medium", compatibility: "Medium", cost: "High" },
      { type: "WAN", area: "Global", speed: "Variable", compatibility: "High", cost: "Very High" },
    ],
    analogyTitle: "Analogy Zone",
    analogies: [
      { title: "Roads & Highways", text: "LANs are like local streets, and WANs are the highways connecting cities. Packets are the cars carrying data to their destination." },
      { title: "Postal Service", text: "Each packet has an IP address, like a mailing address. Routers act as post offices, sorting and sending the packets along the best route." },
      { title: "Library System", text: "A server is like a library's main desk. Your computer (a LAN device) requests information, and the server finds and delivers it back to you." },
    ],
  },
  hi: {
    home: "होम",
    previous: "पिछला",
    next: "अगला",
    title: "कंप्यूटर नेटवर्क",
    subtitle: "कंप्यूटर नेटवर्क को आसान भाषा में समझें — LAN, WAN, PAN और डेटा कैसे चलता है।",
    networkOverviewTitle: "नेटवर्क क्या है?",
    networkOverviewText: "एक नेटवर्क उपकरणों को जोड़ता है ताकि वे डेटा का आदान-प्रदान कर सकें - जैसे एक शहर में सड़कें जो घरों को जोड़ती हैं। नेटवर्क छोटे (आपकी स्मार्टवॉच आपके फोन से बात कर रही है) से लेकर वैश्विक (इंटरनेट जो दुनिया को जोड़ता है) तक होते हैं।",
    pc: "पीसी",
    phone: "फोन",
    laptop: "लैपटॉप",
    router: "राउटर",
    server: "सर्वर",
    networkTypes: [
      { key: "PAN", title: "पैन — व्यक्तिगत क्षेत्र नेटवर्क", blurb: "आपके व्यक्तिगत उपकरणों को जोड़ता है, जैसे स्मार्टवॉच को फोन से।", details: "कुछ मीटर की दूरी तय करता है, आमतौर पर ब्लूटूथ का उपयोग करता है। यह बिना राउटर के पेरिफेरल्स को जोड़ने के लिए है।" },
      { key: "LAN", title: "लैन — स्थानीय क्षेत्र नेटवर्क", blurb: "एक कमरे, कार्यालय या इमारत में उपकरणों को जोड़ता है।", details: "उच्च गति और सुरक्षित, लैन घरों और व्यवसायों के लिए प्रिंटर जैसे संसाधनों को साझा करने के लिए सबसे आम नेटवर्क है।" },
      { key: "WLAN", title: "डब्ल्यूएलएएन — वायरलेस लैन", blurb: "एक लैन, लेकिन बिना केबल के, वाई-फाई तकनीक का उपयोग करता है।", details: "लैन की सीमा के भीतर गतिशीलता की सुविधा प्रदान करता है, लेकिन वायर्ड कनेक्शन की तुलना में कम स्थिर हो सकता है।" },
      { key: "MAN", title: "मैन — मेट्रोपॉलिटन एरिया नेटवर्क", blurb: "एक शहर या एक बड़े परिसर को जोड़ता है, कई लैन को जोड़ता है।", details: "अक्सर सरकारों या बड़े निगमों द्वारा एक शहर में एक निजी नेटवर्क बनाने के लिए उपयोग किया जाता है।" },
      { key: "WAN", title: "वैन — वाइड एरिया नेटवर्क", blurb: "एक बड़े भौगोलिक क्षेत्र में फैला है, जो देशों को जोड़ता है।", details: "इंटरनेट सबसे बड़ा वैन है, जो कंप्यूटरों का एक वैश्विक नेटवर्क है। वैन लैन और मैन को एक साथ जोड़ते हैं।" },
    ],
    realWorldTitle: "वास्तविक-दुनिया के उदाहरण",
    realWorldSubtitle: "हर दिन मिलने वाले सामान्य नेटवर्क का अन्वेषण करें।",
    realWorldExamples: [
      { title: "होम वाई-फाई (लैन / डब्ल्यूएलएएन)", desc: "आपका लैपटॉप, फोन और स्मार्ट टीवी एक ही राउटर से जुड़ते हैं, जो बदले में इंटरनेट से जुड़ता है। यह सेटअप आपको स्थानीय रूप से फाइलें साझा करने और वेब तक पहुंचने की सुविधा देता है।" },
      { title: "स्कूल कंप्यूटर लैब (लैन)", desc: "सभी कंप्यूटर ईथरनेट केबल के माध्यम से एक केंद्रीय सर्वर और एक साझा प्रिंटर से जुड़े होते हैं, जिससे छात्र सामान्य फाइलों तक पहुंच सकते हैं और किसी भी मशीन से प्रिंट कर सकते हैं।" },
      { title: "शहर-व्यापी सार्वजनिक वाई-फाई (मैन)", desc: "एक शहर पार्कों और सार्वजनिक भवनों में मुफ्त इंटरनेट का उपयोग प्रदान करता है, जो शहर भर में कई वाई-फाई हॉटस्पॉट को जोड़कर एक बड़ा नगरपालिका नेटवर्क बनाता है।" },
      { title: "वैश्विक वीडियो सम्मेलन (वैन)", desc: "विभिन्न देशों के सहकर्मी एक वीडियो कॉल में शामिल होते हैं। उनकी आवाज और वीडियो उनके स्थानीय लैन के माध्यम से, वैश्विक वैन (इंटरनेट) के पार, और एक दूसरे तक यात्रा करते हैं।" },
    ],
    comparisonTitle: "नेटवर्क प्रकार: एक त्वरित तुलना",
    tableHeaders: { network: "नेटवर्क", coverage: "कवरेज", speed: "गति", compatibility: "संगतता", cost: "लागत" },
    tableRows: [
        { type: "पैन", area: "~1–10 मीटर", speed: "कम", compatibility: "उच्च", cost: "कम" },
        { type: "लैन", area: "घर/कार्यालय", speed: "उच्च", compatibility: "उच्च", cost: "मध्यम" },
        { type: "डब्ल्यूएलएएन", area: "घर/कार्यालय", speed: "मध्यम-उच्च", compatibility: "बहुत उच्च", cost: "मध्यम" },
        { type: "मैन", area: "शहर/परिसर", speed: "मध्यम", compatibility: "मध्यम", cost: "उच्च" },
        { type: "वैन", area: "वैश्विक", speed: "चर", compatibility: "उच्च", cost: "बहुत उच्च" },
    ],
    analogyTitle: "सादृश्य क्षेत्र",
    analogies: [
      { title: "सड़कें और राजमार्ग", text: "लैन स्थानीय सड़कों की तरह हैं, और वैन शहरों को जोड़ने वाले राजमार्ग हैं। पैकेट डेटा को उनके गंतव्य तक ले जाने वाली कारें हैं।" },
      { title: "डाक सेवा", text: "प्रत्येक पैकेट का एक आईपी पता होता है, जैसे एक मेलिंग पता। राउटर डाकघरों के रूप में कार्य करते हैं, जो पैकेटों को छांटते हैं और उन्हें सर्वोत्तम मार्ग पर भेजते हैं।" },
      { title: "पुस्तकालय प्रणाली", text: "एक सर्वर एक पुस्तकालय के मुख्य डेस्क की तरह है। आपका कंप्यूटर (एक लैन डिवाइस) जानकारी का अनुरोध करता है, और सर्वर उसे ढूंढता है और आपको वापस वितरित करता है।" },
    ],
  },
};

export default function ComputerNetworks() {
  const [lang, setLang] = useState("en");
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
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);
  
  const container = {
    hidden: { opacity: 0, y: 12 },
    show: { opacity: 1, y: 0, transition: { staggerChildren: 0.06 } },
  };

  const fadeUp = {
    hidden: { opacity: 0, y: 8 },
    show: { opacity: 1, y: 0 },
  };

  return (
    <div className="min-h-screen bg-sky-50 text-slate-800 font-sans">
      <header className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-md shadow-lg z-[100] p-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link to="/parts/prt4" className="flex items-center gap-2 text-lg font-semibold text-sky-600 hover:text-sky-800 transition-colors">
            <FaHome />
            <span>{t.home}</span>
          </Link>
          <div className="flex items-center gap-2">
            <button onClick={() => setLang("en")} className={`px-4 py-1.5 rounded-full text-sm font-bold transition-all duration-300 ${lang === 'en' ? 'bg-sky-600 text-white shadow-md' : 'bg-white text-sky-600 hover:bg-sky-100'}`}>EN</button>
            <button onClick={() => setLang("hi")} className={`px-4 py-1.5 rounded-full text-sm font-bold transition-all duration-300 ${lang === 'hi' ? 'bg-sky-600 text-white shadow-md' : 'bg-white text-sky-600 hover:bg-sky-100'}`}>हिं</button>
          </div>
        </div>
      </header>

      <main className="px-4 sm:px-6 lg:px-8 pt-24 pb-12">
        <motion.div initial="hidden" animate="show" variants={container} className="text-center mb-12 max-w-7xl mx-auto">
          <motion.h1 variants={fadeUp} className="text-4xl sm:text-5xl font-extrabold text-sky-700 tracking-tight flex items-center justify-center gap-3">
            <FaNetworkWired /> {t.title}
          </motion.h1>
          <motion.p variants={fadeUp} className="mt-4 text-base sm:text-lg text-slate-600 max-w-3xl mx-auto">
            {t.subtitle}
          </motion.p>
        </motion.div>

        <div className="space-y-8">
          <NetworkOverview t={t} />
          <NetworkTypes t={t} />
          <RealWorldExamples t={t} />
          <ComparisonChart t={t} />
          <AnalogyZone t={t} />
        </div>

        <div className="w-full flex justify-between items-center mt-10 p-4 bg-sky-100/50 rounded-lg shadow-md">
            <button
              onClick={() => navigate('/part4/basics-of-connectivity')}
              className="flex items-center gap-2 px-4 py-2 bg-slate-200 hover:bg-slate-300 text-slate-800 rounded-lg shadow transition"
            >
              <FaArrowLeft />
              {t.previous}
            </button>
            <button
              onClick={() => navigate('/part4/how-info-travels')}
              className="flex items-center gap-2 px-4 py-2 bg-sky-500 hover:bg-sky-600 text-white rounded-lg shadow transition"
            >
              {t.next}
              <FaArrowRight />
            </button>
          </div>
      </main>
    </div>
  );
}

function NetworkOverview({ t }) {
  return (
    <section className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-sm">
      <div className="flex flex-col items-center">
        <div>
          <motion.h2
            initial={{ x: -10, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.4 }}
            className="text-2xl font-semibold text-center"
          >
            {t.networkOverviewTitle}
          </motion.h2>
          <p className="mt-2 text-slate-600 max-w-2xl text-center">
            {t.networkOverviewText}
          </p>
        </div>
        <div className="mt-4 w-full">
          <MiniNetworkIllustration t={t} />
        </div>
      </div>
    </section>
  );
}

function MiniNetworkIllustration({ t }) {
  return (
    <div className="w-full h-64 bg-gradient-to-br from-sky-100 to-white rounded-xl p-3 shadow-inner">
      <svg viewBox="0 0 400 200" className="w-full h-full">
        <g>
          <circle cx="50" cy="100" r="15" fill="#fff" stroke="#7dd3fc" strokeWidth="3" />
          <text x="50" y="105" fontSize="10" textAnchor="middle" fill="#0369a1">{t.pc}</text>

          <circle cx="120" cy="50" r="15" fill="#fff" stroke="#a5f3fc" strokeWidth="3" />
          <text x="120" y="55" fontSize="10" textAnchor="middle" fill="#0369a1">{t.phone}</text>

          <circle cx="120" cy="150" r="15" fill="#fff" stroke="#a5f3fc" strokeWidth="3" />
          <text x="120" y="155" fontSize="10" textAnchor="middle" fill="#0369a1">{t.laptop}</text>

          <circle cx="250" cy="100" r="20" fill="#fff" stroke="#38bdf8" strokeWidth="3" />
          <text x="250" y="105" fontSize="10" textAnchor="middle" fill="#0369a1">{t.router}</text>

          <circle cx="350" cy="100" r="15" fill="#fff" stroke="#7dd3fc" strokeWidth="3" />
          <text x="350" y="105" fontSize="10" textAnchor="middle" fill="#0369a1">{t.server}</text>
        </g>
        <g>
          <path d="M65,100 L230,100" stroke="#bae6fd" strokeWidth="3" strokeLinecap="round" />
          <path d="M135,55 L235,95" stroke="#bae6fd" strokeWidth="3" strokeLinecap="round" />
          <path d="M135,145 L235,105" stroke="#bae6fd" strokeWidth="3" strokeLinecap="round" />
          <path d="M270,100 L335,100" stroke="#bae6fd" strokeWidth="3" strokeLinecap="round" />
        </g>
        <g>
          <motion.circle r="5" fill="#06b6d4" animate={{ cx: [65, 240, 335], cy: [100, 100, 100] }} transition={{ duration: 4, repeat: Infinity, repeatType: "loop", ease: "linear" }} />
          <motion.circle r="5" fill="#fb923c" animate={{ cx: [135, 240, 65], cy: [55, 95, 100] }} transition={{ duration: 3.5, repeat: Infinity, repeatType: "loop", ease: "linear", delay: 1 }} />
          <motion.circle r="5" fill="#84cc16" animate={{ cx: [135, 240, 335], cy: [145, 105, 100] }} transition={{ duration: 4.5, repeat: Infinity, repeatType: "loop", ease: "linear", delay: 2 }} />
        </g>
      </svg>
    </div>
  );
}

function NetworkTypes({ t }) {
  const icons = {
    PAN: <Bluetooth size={28} />,
    LAN: <Home size={28} />,
    WLAN: <Wifi size={28} />,
    MAN: <Server size={28} />,
    WAN: <Globe size={28} />,
  };

  return (
    <section className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
      {t.networkTypes.map((type, i) => (
        <motion.article
          key={type.key}
          className="bg-white rounded-xl p-5 shadow-sm flex flex-col"
          initial={{ y: 8, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: i * 0.08 }}
        >
          <div className="flex items-center gap-4">
            <div className="rounded-lg bg-sky-50 p-3">{icons[type.key]}</div>
            <div>
              <h3 className="font-semibold">{type.title}</h3>
              <p className="text-sm text-slate-600">{type.blurb}</p>
            </div>
          </div>
          <p className="mt-3 text-sm text-slate-700 flex-grow">{type.details}</p>
        </motion.article>
      ))}
    </section>
  );
}

function RealWorldExamples({ t }) {
  const icons = [<Wifi size={20} />, <Server size={20} />, <Globe size={20} />, <Cloud size={20} />];
  const colors = ["from-sky-50 to-white", "from-emerald-50 to-white", "from-rose-50 to-white", "from-indigo-50 to-white"];

  return (
    <section className="bg-white/80 rounded-2xl p-6 shadow-sm">
      <h3 className="text-xl font-semibold text-center">{t.realWorldTitle}</h3>
      <p className="mt-2 text-slate-600 text-center">{t.realWorldSubtitle}</p>
      <div className="mt-4 grid md:grid-cols-2 gap-4">
        {t.realWorldExamples.map((ex, i) => (
          <motion.div
            key={ex.title}
            className={`rounded-xl p-4 shadow-md bg-gradient-to-br ${colors[i]}`}
            initial={{ scale: 0.98, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: i * 0.06 }}
          >
            <div className="flex items-start gap-3">
              <div className="p-2 rounded-lg bg-white/80">{icons[i]}</div>
              <div>
                <h4 className="font-medium">{ex.title}</h4>
                <p className="text-sm text-slate-600">{ex.desc}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

function ComparisonChart({ t }) {
  return (
    <section className="bg-white/80 rounded-2xl p-6 shadow-sm">
      <h3 className="text-xl font-semibold text-center">{t.comparisonTitle}</h3>
      <div className="mt-4 overflow-x-auto">
        <table className="w-full text-left text-sm table-auto">
          <thead>
            <tr className="text-slate-600 bg-slate-50">
              <th className="p-3">{t.tableHeaders.network}</th>
              <th className="p-3">{t.tableHeaders.coverage}</th>
              <th className="p-3">{t.tableHeaders.speed}</th>
              <th className="p-3">{t.tableHeaders.compatibility}</th>
              <th className="p-3">{t.tableHeaders.cost}</th>
            </tr>
          </thead>
          <tbody>
            {t.tableRows.map((r) => (
              <tr key={r.type} className="border-b border-slate-100">
                <td className="p-3 font-medium">{r.type}</td>
                <td className="p-3 text-slate-600">{r.area}</td>
                <td className="p-3 text-slate-600">{r.speed}</td>
                <td className="p-3 text-slate-600">{r.compatibility}</td>
                <td className="p-3 text-slate-600">{r.cost}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

function AnalogyZone({ t }) {
  const icons = [
    ( <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-sky-500" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 2a.75.75 0 01.75.75V5.5h3.25a.75.75 0 010 1.5H10.75V10h3.25a.75.75 0 010 1.5H10.75V14.5h3.25a.75.75 0 010 1.5H10.75V17.25a.75.75 0 01-1.5 0V16H6a.75.75 0 010-1.5h2.25V10H6a.75.75 0 010-1.5h2.25V5.75A.75.75 0 0110 5V2z" clipRule="evenodd" /></svg> ),
    ( <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-emerald-500" viewBox="0 0 20 20" fill="currentColor"><path d="M3 3a1 1 0 00-1 1v12a1 1 0 001 1h14a1 1 0 001-1V4a1 1 0 00-1-1H3zm1.5 1.5a.5.5 0 01.5.5v1.293l6.5-3.25a.5.5 0 01.5 0l6.5 3.25V5a.5.5 0 01.5-.5h.5a.5.5 0 01.5.5v.293l-7.75 3.875a.5.5 0 01-.5 0L3.25 5.793V5.5a.5.5 0 01.5-.5h.5zM3.5 8.09l7 3.5a.5.5 0 00.5 0l7-3.5V16a.5.5 0 01-.5.5H4a.5.5 0 01-.5-.5V8.09z" /></svg> ),
    ( <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-indigo-500" viewBox="0 0 20 20" fill="currentColor"><path d="M2 4.5A2.5 2.5 0 014.5 2h11A2.5 2.5 0 0118 4.5V15.5A2.5 2.5 0 0115.5 18h-11A2.5 2.5 0 012 15.5V4.5zM4.5 3A1.5 1.5 0 003 4.5v11A1.5 1.5 0 004.5 17h11a1.5 1.5 0 001.5-1.5v-11A1.5 1.5 0 0015.5 3h-11z" /><path d="M5 6.5A1.5 1.5 0 016.5 5h7A1.5 1.5 0 0115 6.5v7a1.5 1.5 0 01-1.5 1.5h-7A1.5 1.5 0 015 13.5v-7zM6.5 6A.5.5 0 006 6.5v7a.5.5 0 00.5.5h7a.5.5 0 00.5-.5v-7A.5.5 0 0013.5 6h-7z" /><path d="M7 8.5a.5.5 0 01.5-.5h5a.5.5 0 010 1h-5a.5.5 0 01-.5-.5zm0 2a.5.5 0 01.5-.5h5a.5.5 0 010 1h-5a.5.5 0 01-.5-.5zm0 2a.5.5 0 01.5-.5h3a.5.5 0 010 1h-3a.5.5 0 01-.5-.5z" /></svg> ),
  ];

  return (
    <section className="rounded-2xl p-6 bg-white/80 shadow-sm">
      <h3 className="text-xl font-semibold text-center">{t.analogyTitle}</h3>
      <div className="mt-4 grid md:grid-cols-3 gap-6">
        {t.analogies.map((a, i) => (
          <motion.div
            key={i}
            className="p-6 rounded-lg bg-slate-50 text-center flex flex-col items-center"
            whileHover={{ y: -6, boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)" }}
            transition={{ type: "spring", stiffness: 120 }}
          >
            {icons[i]}
            <h4 className="font-medium mt-4">{a.title}</h4>
            <p className="mt-2 text-sm text-slate-600">{a.text}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}