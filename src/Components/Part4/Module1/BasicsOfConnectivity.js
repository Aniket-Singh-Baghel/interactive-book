import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { FaHome, FaArrowLeft, FaArrowRight, FaNetworkWired } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";

const content = {
  en: {
    home: "Home",
    previous: "Previous",
    next: "Next",
    title: "Basics of Connectivity",
    subtitle: "Explore how devices connect in the digital world through interactive simulations.",
    wired_simulation: "Wired Network",
    wireless_simulation: "Wireless Network",
    simulation_explanation_title: "How This Simulation Works",
    simulation_explanation_text: "This visualizer demonstrates the fundamental difference between wired and wireless connections. The <strong>straight, solid lines</strong> represent <strong>wired wiredLinks</strong>, showing a direct, stable path. The <strong>curved, dashed lines</strong> represent <strong>wireless wiredLinks</strong>, illustrating their more flexible but potentially less direct nature. The moving dots are <strong>data packets</strong>. Notice how they travel in a continuous loop. You can <strong>pause/play</strong> the simulation, adjust the <strong>speed</strong> to see how faster traffic might flow, and toggle the visibility of different network types to focus on specific connections.",
    digital_world_title: "Connectivity in the Digital World",
    digital_world_text: "In the digital world, connectivity isn't just about linking devices; it's about creating a <strong>global network of information</strong>. When you visit a website, your computer sends a request packet that might travel through dozens of routers and across continents via undersea fiber optic cables. This vast, interconnected system is the <strong>Internet</strong>. It relies on standardized <strong>protocols</strong> (like TCP/IP) to ensure that data from any device can be understood by any other, creating a seamless experience whether you're sending an email, streaming a movie, or video-calling a friend on the other side of the world. Every online action you take is a testament to this incredible, planet-spanning connectivity.",
    deep_dive_title: "Deep Dive: How Data Packets Flow",
    deep_dive_text: "Data travels across networks in small pieces called <strong>packets</strong>. Each packet is like a tiny digital envelope containing a piece of your data (like a part of an email or a slice of a photo) and a <strong>header</strong>. The header is critical—it contains the <strong>IP addresses</strong> of the sender and the recipient, acting like a mailing address. <strong>Routers</strong> are the post offices of the internet; they read these addresses and forward the packets along the most efficient path to their destination. When all the packets arrive, the receiving device reassembles them in the correct order to reconstruct the original data. This process happens millions of times a second, enabling everything we do online.",
    analogy_title: "Analogy: A City's Transport System",
    analogy_text: "Think of network connectivity like a city's transportation system. <strong>Wired networks</strong> (like Ethernet cables) are like <strong>dedicated subway lines or highways</strong>. They are incredibly fast, reliable, and can handle a lot of traffic, but they are fixed in place. You have to go to a specific station to use them. <strong>Wireless networks</strong> (like Wi-Fi) are like <strong>taxis or ride-sharing services</strong>. They offer amazing flexibility and convenience, letting you connect from almost anywhere, but the journey can be slower due to traffic (interference), roadblocks (walls), or just the distance to your destination. The <strong>data packets</strong> are the <strong>passengers or cargo</strong>, each with a specific address, trying to get to their destination as efficiently as possible.",
    node_type: "Type",
    daily_use: "Daily Use",
    pause: "Pause",
    play: "Play",
    speed: "Speed",
    examples_title: "Practical Examples",
    examples_list: [
        "<strong>Home Network:</strong> Your Wi-Fi router connecting your laptop, phone, and smart TV.",
        "<strong>School/Office LAN:</strong> Computers in a lab connected via Ethernet cables to a central switch for fast, reliable access to shared files and printers.",
        "<strong>Public Wi-Fi:</strong> Connecting to the internet at a café or airport, a common example of a wireless network."
    ],
  },
  hi: {
    home: "होम",
    previous: "पिछला",
    next: "अगला",
    title: "कनेक्टिविटी की मूल बातें",
    subtitle: "इंटरैक्टिव सिमुलेशन के माध्यम से जानें कि डिजिटल दुनिया में डिवाइस कैसे जुड़ते हैं।",
    wired_simulation: "वायर्ड नेटवर्क",
    wireless_simulation: "वायरलेस नेटवर्क",
    simulation_explanation_title: "यह सिमुलेशन कैसे काम करता है",
    simulation_explanation_text: "यह विज़ुअलाइज़र वायर्ड और वायरलेस कनेक्शन के बीच मूलभूत अंतर को प्रदर्शित करता है। <strong>सीधी, ठोस रेखाएँ</strong> <strong>वायर्ड लिंक</strong> का प्रतिनिधित्व करती हैं, जो एक सीधा, स्थिर पथ दिखाती हैं। <strong>घुमावदार, धराशायी रेखाएँ</strong> <strong>वायरलेस लिंक</strong> का प्रतिनिधित्व करती हैं, जो उनकी अधिक लचीली लेकिन संभावित रूप से कम सीधी प्रकृति को दर्शाती हैं। चलती हुई बिंदियाँ <strong>डेटा पैकेट</strong> हैं। ध्यान दें कि वे एक सतत लूप में कैसे यात्रा करते हैं। आप सिमुलेशन को <strong>रोक/चला</strong> सकते हैं, यह देखने के लिए <strong>गति</strong> को समायोजित कर सकते हैं कि तेज़ ट्रैफ़िक कैसे प्रवाहित हो सकता है, और विशिष्ट कनेक्शनों पर ध्यान केंद्रित करने के लिए विभिन्न नेटवर्क प्रकारों की दृश्यता को टॉगल कर सकते हैं।",
    digital_world_title: "डिजिटल दुनिया में कनेक्टिविटी",
    digital_world_text: "डिजिटल दुनिया में, कनेक्टिविटी केवल उपकरणों को जोड़ने के बारे में नहीं है; यह <strong>सूचना का एक वैश्विक नेटवर्क</strong> बनाने के बारे में है। जब आप किसी वेबसाइट पर जाते हैं, तो आपका कंप्यूटर एक अनुरोध पैकेट भेजता है जो दर्जनों राउटरों से होकर और महाद्वीपों के पार समुद्री फाइबर ऑप्टिक केबलों के माध्यम से यात्रा कर सकता है। यह विशाल, परस्पर जुड़ी प्रणाली ही <strong>इंटरनेट</strong> है। यह मानकीकृत <strong>प्रोटोकॉल</strong> (जैसे टीसीपी/आईपी) पर निर्भर करता है ताकि यह सुनिश्चित हो सके कि किसी भी डिवाइस से डेटा को किसी अन्य द्वारा समझा जा सके, जिससे एक सहज अनुभव बनता है चाहे आप ईमेल भेज रहे हों, मूवी स्ट्रीम कर रहे हों, या दुनिया के दूसरी तरफ किसी दोस्त को वीडियो-कॉल कर रहे हों। आपके द्वारा की जाने वाली हर ऑनलाइन कार्रवाई इस अविश्वसनीय, ग्रह-व्यापी कनेक्टिविटी का एक प्रमाण है।",
    deep_dive_title: "गहराई से जानें: डेटा पैकेट कैसे प्रवाहित होते हैं",
    deep_dive_text: "डेटा नेटवर्क पर <strong>पैकेट</strong> नामक छोटे टुकड़ों में यात्रा करता है। प्रत्येक पैकेट आपके डेटा का एक टुकड़ा (जैसे ईमेल का एक हिस्सा या फोटो का एक टुकड़ा) और एक <strong>हेडर</strong> युक्त एक छोटे डिजिटल लिफाफे की तरह है। हेडर महत्वपूर्ण है—इसमें प्रेषक और प्राप्तकर्ता के <strong>आईपी पते</strong> होते हैं, जो एक मेलिंग पते की तरह काम करते हैं। <strong>राउटर</strong> इंटरनेट के डाकघर हैं; वे इन पतों को पढ़ते हैं और पैकेट को उनके गंतव्य के लिए सबसे कुशल पथ पर आगे बढ़ाते हैं। जब सभी पैकेट पहुंच जाते हैं, तो प्राप्त करने वाला उपकरण मूल डेटा के पुनर्निर्माण के लिए उन्हें सही क्रम में फिर से जोड़ता है। यह प्रक्रिया एक सेकंड में लाखों बार होती है, जो हम ऑनलाइन सब कुछ करने में सक्षम बनाती है।",
    analogy_title: "उपमा: एक शहर की परिवहन प्रणाली",
    analogy_text: "नेटवर्क कनेक्टिविटी को एक शहर की परिवहन प्रणाली की तरह सोचें। <strong>वायर्ड नेटवर्क</strong> (जैसे ईथरनेट केबल) <strong>समर्पित मेट्रो लाइनों या राजमार्गों</strong> की तरह हैं। वे अविश्वसनीय रूप से तेज़, विश्वसनीय होते हैं, और बहुत अधिक ट्रैफिक संभाल सकते हैं, लेकिन वे एक जगह पर स्थिर होते हैं। उनका उपयोग करने के लिए आपको एक विशिष्ट स्टेशन पर जाना पड़ता है। <strong>वायरलेस नेटवर्क</strong> (जैसे वाई-फाई) <strong>टैक्सी या राइड-शेयरिंग सेवाओं</strong> की तरह हैं। वे अद्भुत लचीलापन और सुविधा प्रदान करते हैं, जिससे आप लगभग कहीं से भी जुड़ सकते हैं, लेकिन यात्रा ट्रैफिक (हस्तक्षेप), बाधाओं (दीवारों), या आपके गंतव्य की दूरी के कारण धीमी हो सकती है। <strong>डेटा पैकेट</strong> <strong>यात्री या माल</strong> की तरह हैं, प्रत्येक का एक विशिष्ट पता होता है, जो अपने गंतव्य तक कुशलता से पहुंचने की कोशिश कर रहा है।",
    node_type: "प्रकार",
    daily_use: "दैनिक उपयोग",
    pause: "रोकें",
    play: "चलाएं",
    speed: "गति",
    examples_title: "व्यावहारिक उदाहरण",
    examples_list: [
        "<strong>होम नेटवर्क:</strong> आपका वाई-फाई राउटर जो आपके लैपटॉप, फोन और स्मार्ट टीवी को जोड़ता है।",
        "<strong>स्कूल/ऑफिस लैन:</strong> एक लैब में कंप्यूटर जो साझा फ़ाइलों और प्रिंटर तक तेज़, विश्वसनीय पहुंच के लिए एक केंद्रीय स्विच से ईथरनेट केबल के माध्यम से जुड़े होते हैं।",
        "<strong>सार्वजनिक वाई-फाई:</strong> किसी कैफे या हवाई अड्डे पर इंटरनेट से कनेक्ट करना, एक वायरलेस नेटवर्क का एक सामान्य उदाहरण।"
    ],
  },
};

const wiredNodes = [
  { id: "server", label: "Server", x: 300, y: 50, type: "network" },
  { id: "switch", label: "Switch", x: 300, y: 150, type: "network" },
  { id: "desktop1", label: "Desktop 1", x: 100, y: 250, type: "endpoint" },
  { id: "desktop2", label: "Desktop 2", x: 300, y: 250, type: "endpoint" },
  { id: "printer", label: "Printer", x: 500, y: 250, type: "peripheral" },
];

const wiredwiredLinks = [
  { id: "w1", a: "server", b: "switch", medium: "wired" },
  { id: "w2", a: "switch", b: "desktop1", medium: "wired" },
  { id: "w3", a: "switch", b: "desktop2", medium: "wired" },
  { id: "w4", a: "switch", b: "printer", medium: "wired" },
];

const wirelessNodes = [
    { id: "router", label: "Router", x: 300, y: 100, type: "network" },
    { id: "laptop", label: "Laptop", x: 150, y: 250, type: "endpoint" },
    { id: "phone", label: "Phone", x: 450, y: 250, type: "mobile" },
    { id: "smart-tv", label: "Smart TV", x: 300, y: 350, type: "iot" },
  ];
  
  const wirelesswiredLinks = [
    { id: "wl1", a: "router", b: "laptop", medium: "wireless" },
    { id: "wl2", a: "router", b: "phone", medium: "wireless" },
    { id: "wl3", a: "router", b: "smart-tv", medium: "wireless" },
  ];

function dailyUseFor(type, lang) {
    const uses = {
      en: {
        network: "Connects multiple devices: home router, ISP gateway.",
        endpoint: "Used for work, browsing, streaming — usually stable when wired.",
        peripheral: "Office accessories like printers and scanners.",
        iot: "Smart devices and cameras that stream small continuous data.",
        mobile: "Handheld devices that often switch networks while moving.",
        default: "Everyday device.",
      },
      hi: {
        network: "कई उपकरणों को जोड़ता है: होम राउटर, आईएसपी गेटवे।",
        endpoint: "काम, ब्राउज़िंग, स्ट्रीमिंग के लिए उपयोग किया जाता है - आमतौर पर वायर्ड होने पर स्थिर होता है।",
        peripheral: "प्रिंटर और स्कैनर जैसे कार्यालय सहायक उपकरण।",
        iot: "स्मार्ट डिवाइस और कैमरे जो छोटे निरंतर डेटा स्ट्रीम करते हैं।",
        mobile: "हैंडहेल्ड डिवाइस जो अक्सर चलते-फिरते नेटवर्क स्विच करते हैं।",
        default: "रोजमर्रा का उपकरण।",
      }
    };
    return uses[lang][type] || uses[lang].default;
  }

const Node = ({ node, type, onSelect }) => {
  const nodeColor = {
    network: "bg-blue-500",
    endpoint: "bg-green-500",
    peripheral: "bg-yellow-500",
    iot: "bg-purple-500",
    mobile: "bg-pink-500",
  }[type];

  return (
    <motion.div
      className={`absolute w-24 h-12 flex items-center justify-center rounded-lg shadow-md text-white font-bold text-sm cursor-pointer ${nodeColor}`}
      style={{ left: node.x - 48, top: node.y - 24 }}
      whileHover={{ scale: 1.1 }}
      onClick={() => onSelect(node)}
    >
      {node.label}
    </motion.div>
  );
};

const LinkPath = ({ link, nodes, medium }) => {
    const a = nodes.find(n => n.id === link.a);
    const b = nodes.find(n => n.id === link.b);
  
    if (!a || !b) return null;
  
    const isWireless = medium === "wireless";
    const pathData = isWireless
      ? `M ${a.x} ${a.y} Q ${(a.x + b.x) / 2} ${(a.y + b.y) / 2 - 40} ${b.x} ${b.y}`
      : `M ${a.x} ${a.y} L ${b.x} ${b.y}`;
  
    return (
      <path
        d={pathData}
        stroke={isWireless ? "#3b82f6" : "#10b981"}
        strokeWidth="2"
        fill="none"
        strokeDasharray={isWireless ? "5,5" : "none"}
      />
    );
  };
  
  const Packet = ({ link, nodes, medium, speed, running }) => {
    const a = nodes.find(n => n.id === link.a);
    const b = nodes.find(n => n.id === link.b);
  
    if (!a || !b) return null;
  
    return (
      <motion.circle
        r="6"
        fill={medium === "wireless" ? "#3b82f6" : "#10b981"}
        initial={{ offsetDistance: "0%" }}
        animate={running ? { offsetDistance: "100%" } : {}}
        transition={{
          duration: 3 / speed,
          repeat: Infinity,
          ease: "linear",
        }}
        style={{ offsetPath: `path("${medium === 'wireless' ? `M ${a.x} ${a.y} Q ${(a.x + b.x) / 2} ${(a.y + b.y) / 2 - 40} ${b.x} ${b.y}` : `M ${a.x} ${a.y} L ${b.x} ${b.y}`}")` }}
      />
    );
  };

const Simulation = ({ nodes, wiredLinks, onNodeSelect, speed, running, medium }) => (
    <div className="relative w-full h-[300px] sm:h-[420px] rounded-xl border border-gray-200 bg-gray-50 overflow-hidden shadow-inner">
      <svg width="100%" height="100%" viewBox="0 0 600 400">
        <defs>
          <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="3" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        <g>
          {wiredLinks.map(link => (
            <LinkPath key={link.id} link={link} nodes={nodes} medium={medium} />
          ))}
          {wiredLinks.map(link => (
            <Packet key={`p-${link.id}`} link={link} nodes={nodes} medium={medium} speed={speed} running={running} />
          ))}
        </g>
      </svg>
      {wiredNodes.map(node => (
        <Node key={node.id} node={node} type={node.type} onSelect={onNodeSelect} />
      ))}
    </div>
  );

export default function BasicsOfConnectivity() {
  const [lang, setLang] = useState("en");
  const [activeTab, setActiveTab] = useState("wired");
  const [running, setRunning] = useState(true);
  const [speed, setSpeed] = useState(1);
  const [selectedNode, setSelectedNode] = useState(null);
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
    <div className="min-h-screen bg-sky-50 text-slate-900 font-sans">
      <header className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-md shadow-lg z-20 p-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link to="/parts/prt4" className="flex items-center gap-2 text-lg font-semibold text-indigo-600 hover:text-indigo-800 transition-colors">
            <FaHome />
            <span>{t.home}</span>
          </Link>
          <div className="flex items-center gap-2">
            <button onClick={() => setLang("en")} className={`px-4 py-1.5 rounded-full text-sm font-bold transition-all duration-300 ${lang === 'en' ? 'bg-indigo-600 text-white shadow-md' : 'bg-white text-indigo-600 hover:bg-indigo-100'}`}>EN</button>
            <button onClick={() => setLang("hi")} className={`px-4 py-1.5 rounded-full text-sm font-bold transition-all duration-300 ${lang === 'hi' ? 'bg-indigo-600 text-white shadow-md' : 'bg-white text-indigo-600 hover:bg-indigo-100'}`}>हिं</button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-12">
        <motion.div initial="hidden" animate="show" variants={container} className="text-center mb-12">
          <motion.h1 variants={fadeUp} className="text-4xl sm:text-5xl font-extrabold text-indigo-700 tracking-tight flex items-center justify-center gap-3">
            <FaNetworkWired /> {t.title}
          </motion.h1>
          <motion.p variants={fadeUp} className="mt-4 text-lg text-slate-600 max-w-3xl mx-auto">
            {t.subtitle}
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-white p-4 rounded-2xl shadow-xl">
              <div className="flex border-b border-gray-200 mb-4">
                <button onClick={() => setActiveTab('wired')} className={`px-4 py-2 font-semibold ${activeTab === 'wired' ? 'border-b-2 border-indigo-600 text-indigo-600' : 'text-gray-500'}`}>
                  {t.wired_simulation}
                </button>
                <button onClick={() => setActiveTab('wireless')} className={`px-4 py-2 font-semibold ${activeTab === 'wireless' ? 'border-b-2 border-indigo-600 text-indigo-600' : 'text-gray-500'}`}>
                  {t.wireless_simulation}
                </button>
              </div>

              {activeTab === 'wired' && (
                <Simulation nodes={wiredNodes} wiredLinks={wiredwiredLinks} onNodeSelect={setSelectedNode} speed={speed} running={running} medium="wired" />
              )}
              {activeTab === 'wireless' && (
                <Simulation nodes={wirelessNodes} wiredLinks={wirelesswiredLinks} onNodeSelect={setSelectedNode} speed={speed} running={running} medium="wireless" />
              )}
              
              <div className="flex items-center justify-center gap-4 mt-4">
                <button onClick={() => setRunning(r => !r)} className="px-4 py-2 rounded-lg bg-indigo-100 text-indigo-700 font-semibold hover:bg-indigo-200 transition">
                  {running ? t.pause : t.play}
                </button>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium">{t.speed}</span>
                  <input
                    type="range"
                    min="0.5"
                    max="5"
                    step="0.5"
                    value={speed}
                    onChange={(e) => setSpeed(Number(e.target.value))}
                    className="w-32"
                  />
                </div>
              </div>
            </div>
            {selectedNode && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-4 p-4 bg-white rounded-2xl shadow-lg border border-indigo-200">
                <h3 className="font-bold text-lg text-indigo-700">{selectedNode.label}</h3>
                <p className="text-sm text-gray-600"><strong>{t.node_type}:</strong> {selectedNode.type}</p>
                <p className="text-sm text-gray-500 mt-1"><strong>{t.daily_use}:</strong> {dailyUseFor(selectedNode.type, lang)}</p>
              </motion.div>
            )}
          </div>

          <aside className="space-y-6">
             <motion.div variants={fadeUp} className="p-6 rounded-2xl shadow-lg bg-white">
                <h3 className="font-semibold text-xl">{t.analogy_title}</h3>
                <p className="mt-3 text-slate-600" dangerouslySetInnerHTML={{ __html: t.analogy_text }} />
            </motion.div>
            <motion.div variants={fadeUp} className="p-6 rounded-2xl shadow-lg bg-white">
                <h3 className="font-semibold text-xl">{t.examples_title}</h3>
                <ul className="mt-3 text-slate-600 space-y-3 list-disc pl-5">
                    {t.examples_list.map((item, index) => (
                        <li key={index} dangerouslySetInnerHTML={{ __html: item }} />
                    ))}
                </ul>
            </motion.div>
          </aside>
        </div>

        <motion.div initial="hidden" animate="show" variants={container} className="mt-12 space-y-8">
            <motion.div variants={fadeUp} className="p-6 rounded-2xl shadow-lg bg-white">
                <h3 className="font-semibold text-xl">{t.simulation_explanation_title}</h3>
                <p className="mt-3 text-slate-600" dangerouslySetInnerHTML={{ __html: t.simulation_explanation_text }} />
            </motion.div>
            <motion.div variants={fadeUp} className="p-6 rounded-2xl shadow-lg bg-white">
                <h3 className="font-semibold text-xl">{t.digital_world_title}</h3>
                <p className="mt-3 text-slate-600" dangerouslySetInnerHTML={{ __html: t.digital_world_text }} />
            </motion.div>
            <motion.div variants={fadeUp} className="p-6 rounded-2xl shadow-lg bg-white">
                <h3 className="font-semibold text-xl">{t.deep_dive_title}</h3>
                <p className="mt-3 text-slate-600" dangerouslySetInnerHTML={{ __html: t.deep_dive_text }} />
            </motion.div>
        </motion.div>

        <div className="w-full flex justify-between items-center mt-10 p-4 bg-gray-100 rounded-lg shadow-md">
            <button
              onClick={() => navigate('/module4/distribution-models')}
              className="flex items-center gap-2 px-4 py-2 bg-purple-200 hover:bg-purple-300 text-purple-900 rounded-lg shadow transition"
            >
              <FaArrowLeft />
              {t.previous}
            </button>
            <button
              onClick={() => navigate('/parts/prt2/part4/computer-networks')}
              className="flex items-center gap-2 px-4 py-2 bg-green-200 hover:bg-green-300 text-green-900 rounded-lg shadow transition"
            >
              {t.next}
              <FaArrowRight />
            </button>
          </div>
      </main>
    </div>
  );
}