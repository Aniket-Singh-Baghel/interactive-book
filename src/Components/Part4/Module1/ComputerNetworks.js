import React, { useState, useRef, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaNetworkWired,
  FaRoute,
  FaLaptop,
  FaHouseUser,
  FaMapSigns,
  FaExchangeAlt,
  FaBolt,
  FaPlus,
  FaTrash,
  FaPlay,
  FaPause,
  FaRedoAlt,
  FaHome,
  FaArrowLeft,
  FaArrowRight,
} from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";

// ComputerNetworks.js
// Interactive teaching component: LAN vs WAN
// - Drag nodes, add/remove, connect
// - LAN/WAN modes with example topologies
// - Packet animation (simple), speed control
// - Bilingual support (en/hi)
// Requires: Tailwind CSS, Framer Motion, react-icons

const content = {
  en: {
    home: "Home",
    previous: "Previous",
    next: "Next",
    title: "Computer Networks Explained",
    subtitle: "Interactive guide to LAN, WAN, and how data travels the internet.",
    lan_name: "Local Area Network (LAN)",
    lan_description: "Connects devices in a small area — homes, classrooms, offices. Think of it as neighborhood streets.",
    wan_name: "Wide Area Network (WAN)",
    wan_description: "Connects networks over large distances — cities or countries via ISPs and backbone links. Think of it as highways and intercity roads.",
    router_label: "Router",
    pc_alice_label: "PC - Alice",
    laptop_bob_label: "Laptop - Bob",
    printer_label: "Printer",
    isp_north_label: "ISP - North",
    isp_central_label: "ISP - Central",
    isp_south_label: "ISP - South",
    datacenter_label: "Data Center",
    remote_office_label: "Remote Office",
    branch_label: "Branch",
    play: "Play",
    pause: "Pause",
    speed: "Speed",
    add_node: "Add Node",
    reset: "Reset",
    drag_instruct: "Drag nodes to reposition. Click a node for connect/remove options.",
    node_info_router: "Forwards network packets",
    node_info_device: "A network device",
    connect: "Connect",
    remove: "Remove",
    teaching_content: "Teaching Content",
    lan_mode: "LAN (Local)",
    wan_mode: "WAN (Wide)",
    overview: "Overview",
    explanation_title: "How It Works: Digital Devices & The Internet",
    explanation_text: "A <strong>computer network</strong> is a collection of interconnected devices, like computers, phones, and servers, that can exchange data and share resources.\n\nWhen you send an email or watch a video, your device breaks the data into small pieces called <strong>packets</strong>. Each packet is like a tiny digital envelope, containing a part of your data and the addresses of the sender and receiver (IP addresses).\n\nThese packets travel through a local network (LAN) to a <strong>router</strong>. The router is like a local post office; it reads the destination address and sends the packet out onto the wider internet (WAN). The packet hops between many routers on the internet backbone, each one choosing the best path, until it reaches the destination's local network and finally, the correct device. It all happens in milliseconds!",
    analogy_title: "Analogy: The Postal Service",
    analogy_text: "Think of the internet as a global postal service. Your <strong>device</strong> is your house. The <strong>data packets</strong> are letters you send. The <strong>LAN</strong> is your local street, connecting you to the neighborhood postbox (your <strong>router</strong>). The <strong>WAN</strong> is the entire network of roads, highways, and airplane routes that mail trucks use to carry letters between cities and countries (other routers and internet backbones). Just like the postal service, the internet's job is to read the address on each packet and deliver it to the right destination, no matter how far away.",
    try_this: "Try this",
    try_1: "Add nodes in LAN mode and observe fast, local packet flows.",
    try_2: "Switch to WAN mode and notice latency and longer links.",
    try_3: "Connect nodes and then run the simulation.",
    quiz: "Quiz",
    quiz_q1: "Which network is usually inside a single building?",
    quiz_a1: "LAN",
    quiz_q2: "Which network type might use ISPs and backbone links?",
    quiz_a2: "WAN",
    tool_utility: "This interactive tool helps students build mock networks and understand routing/design tradeoffs.",
  },
  hi: {
    home: "होम",
    previous: "पिछला",
    next: "अगला",
    title: "कंप्यूटर नेटवर्क समझाया गया",
    subtitle: "LAN, WAN, और इंटरनेट पर डेटा कैसे यात्रा करता है, यह समझने के लिए इंटरैक्टिव गाइड।",
    lan_name: "लोकल एरिया नेटवर्क (LAN)",
    lan_description: "छोटे क्षेत्र में उपकरणों को जोड़ता है — घर, कक्षाएँ, कार्यालय। इसे पड़ोस की सड़कों के रूप में सोचें।",
    wan_name: "वाइड एरिया नेटवर्क (WAN)",
    wan_description: "बड़े क्षेत्रों में नेटवर्क्स को जोड़ता है — शहर या देशों में ISP और बैकबोन लिंक के माध्यम से। इसे राजकीय हाइवे के रूप में सोचें।",
    router_label: "राउटर",
    pc_alice_label: "पीसी - ऐलिस",
    laptop_bob_label: "लैपटॉप - बॉब",
    printer_label: "प्रिंटर",
    isp_north_label: "आईएसपी - उत्तर",
    isp_central_label: "आईएसपी - केंद्रीय",
    isp_south_label: "आईएसपी - दक्षिण",
    datacenter_label: "डेटा सेंटर",
    remote_office_label: "रिमोट ऑफिस",
    branch_label: "शाखा",
    play: "चलाएँ",
    pause: "रोकें",
    speed: "गति",
    add_node: "नोड जोड़ें",
    reset: "रीसेट",
    drag_instruct: "नोड्स को खींच कर स्थानांतरित करें। किसी नोड पर क्लिक करें कनेक्ट/रिमूव विकल्प के लिए।",
    node_info_router: "नेटवर्क पैकेट को आगे भेजता है",
    node_info_device: "एक नेटवर्क डिवाइस",
    connect: "कनेक्ट करें",
    remove: "हटायें",
    teaching_content: "शिक्षण सामग्री",
    lan_mode: "LAN (लोकल)",
    wan_mode: "WAN (दूरस्थ)",
    overview: "विस्तार",
    explanation_title: "यह कैसे काम करता है: डिजिटल डिवाइस और इंटरनेट",
    explanation_text: "एक <strong>कंप्यूटर नेटवर्क</strong> इंटरकनेक्टेड डिवाइसों का एक संग्रह है, जैसे कंप्यूटर, फोन और सर्वर, जो डेटा का आदान-प्रदान कर सकते हैं और संसाधनों को साझा कर सकते हैं।\n\nजब आप एक ईमेल भेजते हैं या एक वीडियो देखते हैं, तो आपका डिवाइस डेटा को <strong>पैकेट</strong> नामक छोटे टुकड़ों में तोड़ देता है। प्रत्येक पैकेट एक छोटे डिजिटल लिफाफे की तरह होता है, जिसमें आपके डेटा का एक हिस्सा और प्रेषक और रिसीवर के पते (आईपी पते) होते हैं।\n\nये पैकेट एक स्थानीय नेटवर्क (LAN) के माध्यम से एक <strong>राउटर</strong> तक जाते हैं। राउटर एक स्थानीय डाकघर की तरह है; यह गंतव्य का पता पढ़ता है और पैकेट को व्यापक इंटरनेट (WAN) पर भेजता है। पैकेट इंटरनेट बैकबोन पर कई राउटरों के बीच कूदता है, प्रत्येक सबसे अच्छा रास्ता चुनता है, जब तक कि यह गंतव्य के स्थानीय नेटवर्क और अंत में, सही डिवाइस तक नहीं पहुंच जाता। यह सब मिलीसेकंड में होता है!",
    analogy_title: "उपमा: डाक सेवा",
    analogy_text: "इंटरनेट को एक वैश्विक डाक सेवा के रूप में सोचें। आपका <strong>डिवाइस</strong> आपका घर है। <strong>डेटा पैकेट</strong> आपके द्वारा भेजे गए पत्र हैं। <strong>LAN</strong> आपकी स्थानीय सड़क है, जो आपको पड़ोस के पोस्टबॉक्स (आपके <strong>राउटर</strong>) से जोड़ती है। <strong>WAN</strong> सड़कों, राजमार्गों और हवाई जहाज के मार्गों का पूरा नेटवर्क है जिसका उपयोग मेल ट्रक शहरों और देशों (अन्य राउटर और इंटरनेट बैकबोन) के बीच पत्र ले जाने के लिए करते हैं। डाक सेवा की तरह ही, इंटरनेट का काम प्रत्येक पैकेट पर पते को पढ़ना और उसे सही गंतव्य तक पहुंचाना है, चाहे वह कितनी भी दूर क्यों न हो।",
    try_this: "प्रयोग",
    try_1: "LAN मोड में नोड्स जोड़ें और देखें कैसे पैकेट तेज़ी से चलते हैं।",
    try_2: "WAN मोड पर स्विच करें और समझें दूरी और लेटेंसी का प्रभाव।",
    try_3: "किसी नोड को कनेक्ट करें और फिर सिमुलेशन चलाएँ।",
    quiz: "क्विज़",
    quiz_q1: "कौन सा नेटवर्क आमतौर पर एक ही इमारत के अंदर होता है?",
    quiz_a1: "LAN",
    quiz_q2: "किस नेटवर्क प्रकार में ISPs और बैकबोन कड़ियाँ उपयोग हो सकती हैं?",
    quiz_a2: "WAN",
    tool_utility: "यह व्यावहारिक उपकरण छात्रों के लिए नकली नेटवर्क बनाने और रूटिंग/डिजाइन शर्तों को समझने में सहायक है।",
  }
};

function uid(prefix = "n") {
  return `${prefix}_${Math.random().toString(36).slice(2, 9)}`;
}

const DEFAULT_TOPOLOGIES = {
  lan: {
    nodes: [
      { id: "r1", type: "router", labelKey: "router_label", x: 50, y: 22 },
      { id: "pc1", type: "pc", labelKey: "pc_alice_label", x: 26, y: 58 },
      { id: "pc2", type: "pc", labelKey: "laptop_bob_label", x: 74, y: 58 },
      { id: "printer", type: "printer", labelKey: "printer_label", x: 50, y: 78 },
    ],
    links: [
      { id: "l1", a: "r1", b: "pc1" },
      { id: "l2", a: "r1", b: "pc2" },
      { id: "l3", a: "r1", b: "printer" },
    ],
  },
  wan: {
    nodes: [
      { id: "isp1", type: "isp", labelKey: "isp_north_label", x: 18, y: 22 },
      { id: "isp2", type: "isp", labelKey: "isp_central_label", x: 50, y: 16 },
      { id: "isp3", type: "isp", labelKey: "isp_south_label", x: 82, y: 22 },
      { id: "dc", type: "datacenter", labelKey: "datacenter_label", x: 50, y: 58 },
      { id: "office", type: "office", labelKey: "remote_office_label", x: 18, y: 78 },
      { id: "branch", type: "branch", labelKey: "branch_label", x: 82, y: 78 },
    ],
    links: [
      { id: "l1", a: "isp1", b: "isp2" },
      { id: "l2", a: "isp2", b: "isp3" },
      { id: "l3", a: "isp2", b: "dc" },
      { id: "l4", a: "dc", b: "office" },
      { id: "l5", a: "dc", b: "branch" },
    ],
  },
};

function IconForType(type) {
  switch (type) {
    case "router":
      return <FaNetworkWired />;
    case "pc":
      return <FaLaptop />;
    case "printer":
      return <FaHouseUser />;
    case "isp":
      return <FaRoute />;
    case "datacenter":
      return <FaMapSigns />;
    case "office":
    case "branch":
      return <FaExchangeAlt />;
    default:
      return <FaBolt />;
  }
}

export default function ComputerNetworks({ initialLang = "en" }) {
  const [mode, setMode] = useState("lan");
  const [lang, setLang] = useState(initialLang);
  const t = content[lang];

  const getInitialNodes = (currentMode) => {
    return DEFAULT_TOPOLOGIES[currentMode].nodes.map(n => ({ ...n, label: t[n.labelKey] }));
  };

  const [nodes, setNodes] = useState(getInitialNodes(mode));
  const [links, setLinks] = useState(DEFAULT_TOPOLOGIES[mode].links.map(l => ({ ...l })));
  const [selectedNode, setSelectedNode] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState(1);
  const canvasRef = useRef(null);
  const [draggingId, setDraggingId] = useState(null);
  const [newNodeType, setNewNodeType] = useState("pc");
  const navigate = useNavigate();

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

  useEffect(() => {
    setNodes(getInitialNodes(mode));
    setLinks(DEFAULT_TOPOLOGIES[mode].links.map(l => ({ ...l })));
    setSelectedNode(null);
    setIsPlaying(false);
  }, [mode]);

  useEffect(() => {
    setNodes(getInitialNodes(mode));
  }, [lang]);

  function addNode() {
    const id = uid("n");
    const newNode = {
      id,
      type: newNodeType,
      x: 50,
      y: 50,
      label: `${newNodeType} ${id}`,
    };
    setNodes(prev => [...prev, newNode]);
  }

  function removeNode(id) {
    setNodes(prev => prev.filter(x => x.id !== id));
    setLinks(prev => prev.filter(x => x.a !== id && x.b !== id));
    if (selectedNode === id) setSelectedNode(null);
  }

  function connectNodes(a, b) {
    if (!a || !b || a === b) return;
    if (links.some(l => (l.a === a && l.b === b) || (l.a === b && l.b === a))) return;
    setLinks(prev => [...prev, { id: uid('link'), a, b }]);
  }

  function handlePointerDown(e, id) {
    e.preventDefault();
    setDraggingId(id);
  }

  function handlePointerMove(e) {
    if (!draggingId) return;
    const rect = canvasRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setNodes(list => list.map(n => n.id === draggingId ? { ...n, x: Math.min(98, Math.max(2, x)), y: Math.min(98, Math.max(2, y)) } : n));
  }

  function handlePointerUp() {
    setDraggingId(null);
  }

  const toggleSimulation = () => setIsPlaying(p => !p);

  function findNode(id) { return nodes.find(n => n.id === id); }

  const stats = useMemo(() => ({ nodes: nodes.length, links: links.length }), [nodes, links]);

  return (
    <div className="min-h-screen bg-sky-50 text-slate-900 font-sans">
      <header className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-md shadow-lg z-20 p-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link
            to="/parts/prt4"
            className="flex items-center gap-2 text-lg font-semibold text-indigo-600 hover:text-indigo-800 transition-colors"
          >
            <FaHome />
            <span>{t.home}</span>
          </Link>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setLang("en")}
              className={`px-4 py-1.5 rounded-full text-sm font-bold transition-all duration-300 ${
                lang === "en"
                  ? "bg-indigo-600 text-white shadow-md"
                  : "bg-white text-indigo-600 hover:bg-indigo-100"
              }`}
            >
              EN
            </button>
            <button
              onClick={() => setLang("hi")}
              className={`px-4 py-1.5 rounded-full text-sm font-bold transition-all duration-300 ${
                lang === "hi"
                  ? "bg-indigo-600 text-white shadow-md"
                  : "bg-white text-indigo-600 hover:bg-indigo-100"
              }`}
            >
              हिं
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-12">
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="flex-1 bg-white rounded-2xl p-6 shadow-lg">
            <div className="flex flex-col sm:flex-row items-start justify-between gap-4 mb-4">
              <div className="flex-1">
                <h2 className="text-2xl font-bold text-slate-800">{mode === 'lan' ? t.lan_name : t.wan_name}</h2>
                <p className="text-slate-600 mt-1">{mode === 'lan' ? t.lan_description : t.wan_description}</p>
              </div>

              <div className="flex items-center gap-2 flex-wrap">
                <div className="bg-slate-100 rounded-lg p-1 flex items-center gap-1">
                  <button
                    onClick={() => setMode("lan")}
                    className={`px-3 py-1.5 rounded-md text-sm font-semibold transition-colors ${
                      mode === "lan"
                        ? "bg-indigo-600 text-white shadow"
                        : "text-slate-600 hover:bg-slate-200"
                    }`}
                  >
                    LAN
                  </button>
                  <button
                    onClick={() => setMode("wan")}
                    className={`px-3 py-1.5 rounded-md text-sm font-semibold transition-colors ${
                      mode === "wan"
                        ? "bg-indigo-600 text-white shadow"
                        : "text-slate-600 hover:bg-slate-200"
                    }`}
                  >
                    WAN
                  </button>
                </div>

                <div className="bg-slate-100 rounded-lg p-1 flex items-center gap-2">
                  <button
                    onClick={toggleSimulation}
                    className="px-3 py-2 bg-indigo-600 hover:bg-indigo-700 rounded-md flex items-center gap-2 text-white font-semibold"
                  >
                    {isPlaying ? <FaPause /> : <FaPlay />}
                    <span className="text-sm">
                      {isPlaying ? t.pause : t.play}
                    </span>
                  </button>

                  <div className="flex items-center gap-2 px-2">
                    <div className="text-sm font-medium text-slate-600">{t.speed}</div>
                    <input
                      aria-label="speed"
                      type="range"
                      min="0.5"
                      max="2"
                      step="0.1"
                      value={speed}
                      onChange={(e) => setSpeed(Number(e.target.value))}
                      className="w-28 cursor-pointer"
                    />
                    <div className="text-sm font-mono text-slate-700 w-10 text-right">
                      {speed.toFixed(1)}x
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div
              ref={canvasRef}
              onPointerMove={handlePointerMove}
              onPointerUp={handlePointerUp}
              onPointerCancel={handlePointerUp}
              className="relative bg-slate-100 rounded-xl border-2 border-slate-200 h-[420px] sm:h-[520px] overflow-hidden"
            >
              <svg
                viewBox="0 0 100 100"
                preserveAspectRatio="none"
                className="w-full h-full absolute inset-0 pointer-events-none"
              >
                <defs>
                  <linearGradient id="linkGrad" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="#818cf8" />
                    <stop offset="100%" stopColor="#4f46e5" />
                  </linearGradient>
                </defs>

                {links.map((link) => {
                  const A = findNode(link.a);
                  const B = findNode(link.b);
                  if (!A || !B) return null;
                  return (
                    <line
                      key={link.id}
                      x1={A.x}
                      y1={A.y}
                      x2={B.x}
                      y2={B.y}
                      stroke="url(#linkGrad)"
                      strokeWidth={0.5}
                      opacity={0.8}
                      strokeLinecap="round"
                      vectorEffect="non-scaling-stroke"
                    />
                  );
                })}

                {isPlaying &&
                  links.length > 0 &&
                  links.map((link, idx) => {
                    const A = findNode(link.a);
                    const B = findNode(link.b);
                    if (!A || !B) return null;
                    const duration = 3 / speed;
                    const delay = (idx % 3) * 0.6;
                    return (
                      <motion.circle
                        key={`p-${link.id}`}
                        cx={A.x}
                        cy={A.y}
                        r={0.8}
                        fill="#f59e0b"
                        initial={{ cx: A.x, cy: A.y, opacity: 0 }}
                        animate={{ cx: B.x, cy: B.y, opacity: [0, 1, 1, 0] }}
                        transition={{
                          duration,
                          delay,
                          ease: "linear",
                          repeat: Infinity,
                        }}
                        opacity={0.95}
                      />
                    );
                  })}
              </svg>

              {nodes.map((node) => (
                <div
                  key={node.id}
                  style={{ left: `${node.x}%`, top: `${node.y}%` }}
                  className="absolute -translate-x-1/2 -translate-y-1/2 z-20 pointer-events-auto cursor-grab active:cursor-grabbing"
                  onPointerDown={(e) => handlePointerDown(e, node.id)}
                >
                  <div className={`flex flex-col items-center text-center`}>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() =>
                        setSelectedNode(node.id === selectedNode ? null : node.id)
                      }
                      className={`flex flex-col items-center p-2.5 rounded-full bg-white text-slate-700 shadow-lg ring-2 ring-slate-200 transition-all ${selectedNode === node.id ? '!ring-indigo-500 ring-4' : ''}`}
                      aria-label={node.label}
                    >
                      <div className="text-2xl text-indigo-600">{IconForType(node.type)}</div>
                      <div className="text-[10px] mt-1 text-slate-700 font-semibold tracking-wide">
                        {node.label}
                      </div>
                    </motion.button>

                    <AnimatePresence>
                      {selectedNode === node.id && (
                        <motion.div
                          initial={{ opacity: 0, y: -10, scale: 0.95 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: -10, scale: 0.95 }}
                          className="absolute left-1/2 -translate-x-1/2 bottom-full mb-3 w-56 bg-white backdrop-blur-md p-3 rounded-lg text-sm text-slate-800 border border-slate-200 shadow-xl z-50"
                        >
                          <div className="font-bold text-base">{node.label}</div>
                          <div className="text-slate-600 text-sm mt-1">
                            {node.type === "router" ? t.node_info_router : t.node_info_device}
                          </div>

                          <div className="flex gap-2 mt-3">
                            <button
                              onClick={() => connectNodes(selectedNode, node.id)}
                              className="flex-1 bg-indigo-100 hover:bg-indigo-200 text-indigo-800 px-3 py-1.5 rounded-md text-sm font-semibold transition-colors"
                            >
                              {t.connect}
                            </button>
                            <button
                              onClick={() => removeNode(node.id)}
                              className="flex-1 bg-red-100 hover:bg-red-200 text-red-800 px-3 py-1.5 rounded-md text-sm font-semibold transition-colors"
                            >
                              {t.remove}
                            </button>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                <select
                  value={newNodeType}
                  onChange={(e) => setNewNodeType(e.target.value)}
                  className="bg-slate-100 text-slate-800 px-3 py-2 rounded-md text-sm font-semibold border-2 border-slate-200 hover:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
                >
                  <option value="pc">PC</option>
                  <option value="router">Router</option>
                  <option value="printer">Printer</option>
                  <option value="office">Office</option>
                  <option value="datacenter">Data Center</option>
                </select>

                <button
                  onClick={addNode}
                  className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 px-4 py-2 rounded-md text-white font-semibold shadow transition-transform active:scale-95"
                >
                  <FaPlus />
                  <span className="text-sm">{t.add_node}</span>
                </button>

                <button
                  onClick={() => {
                    setNodes(getInitialNodes(mode));
                    setLinks(DEFAULT_TOPOLOGIES[mode].links.map((l) => ({ ...l })));
                    setSelectedNode(null);
                    setIsPlaying(false);
                  }}
                  className="flex items-center gap-2 bg-slate-200 hover:bg-slate-300 px-4 py-2 rounded-md text-slate-800 font-semibold shadow-sm transition-transform active:scale-95"
                >
                  <FaTrash />
                  <span className="text-sm">{t.reset}</span>
                </button>
              </div>

              <div className="text-sm text-slate-500 text-center sm:text-right">
                {t.drag_instruct}
              </div>
            </div>
          </div>

          <aside className="w-full lg:w-[28rem] shrink-0 bg-white rounded-2xl p-6 shadow-lg space-y-6">
            <div className="border-b border-slate-200 pb-4">
              <h3 className="text-lg font-bold text-slate-800">{t.teaching_content}</h3>
              <p className="text-slate-600">
                {mode === "lan" ? t.lan_mode : t.wan_mode}
              </p>
            </div>

            <div>
              <h4 className="font-bold text-indigo-700 mb-2">{t.explanation_title}</h4>
              <p className="text-slate-600 leading-relaxed" dangerouslySetInnerHTML={{ __html: t.explanation_text }} />
            </div>
            
            <div className="bg-slate-50 p-4 rounded-lg border border-slate-200">
              <h4 className="font-bold text-indigo-700 mb-2">{t.analogy_title}</h4>
              <p className="text-slate-600 leading-relaxed" dangerouslySetInnerHTML={{ __html: t.analogy_text }} />
            </div>

            <div>
              <h4 className="font-bold text-indigo-700 mb-2">{t.try_this}</h4>
              <ul className="text-slate-600 list-disc list-inside space-y-2">
                <li>{t.try_1}</li>
                <li>{t.try_2}</li>
                <li>{t.try_3}</li>
              </ul>
            </div>

            <div className="bg-slate-50 p-4 rounded-lg border border-slate-200">
              <h4 className="font-bold text-indigo-700 mb-2">{t.quiz}</h4>
              <div className="space-y-3">
                  <div className="p-3 bg-white rounded border border-slate-200">
                    <p className="font-semibold text-slate-800">{t.quiz_q1}</p>
                    <details className="mt-2 text-sm text-slate-600">
                      <summary className="cursor-pointer font-medium text-indigo-600 hover:text-indigo-800">Answer</summary>
                      <p className="mt-1 p-2 bg-slate-100 rounded">{t.quiz_a1}</p>
                    </details>
                  </div>
                  <div className="p-3 bg-white rounded border border-slate-200">
                    <p className="font-semibold text-slate-800">{t.quiz_q2}</p>
                    <details className="mt-2 text-sm text-slate-600">
                      <summary className="cursor-pointer font-medium text-indigo-600 hover:text-indigo-800">Answer</summary>
                      <p className="mt-1 p-2 bg-slate-100 rounded">{t.quiz_a2}</p>
                    </details>
                  </div>
              </div>
            </div>

            <p className="text-sm text-slate-500 text-center">{t.tool_utility}</p>
          </aside>
        </div>
        <div className="w-full flex justify-between items-center mt-12 p-4 bg-white rounded-lg shadow-md">
          <button
            onClick={() => navigate("/part4/basics-of-connectivity")}
            className="flex items-center gap-2 px-4 py-2 bg-purple-200 hover:bg-purple-300 text-purple-900 rounded-lg shadow transition"
          >
            <FaArrowLeft />
            {t.previous}
          </button>
          <button
            onClick={() => navigate("/part4/network-topologies")}
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
 