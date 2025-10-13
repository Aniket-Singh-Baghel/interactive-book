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
} from "react-icons/fa";

// ComputerNetworks.js
// Interactive teaching component: LAN vs WAN
// - Drag nodes, add/remove, connect
// - LAN/WAN modes with example topologies
// - Packet animation (simple), speed control
// - Bilingual support (en/hi)
// Requires: Tailwind CSS, Framer Motion, react-icons

const DEFAULT_TOPOLOGIES = {
  lan: {
    name: { en: "Local Area Network (LAN)", hi: "लोकल एरिया नेटवर्क (LAN)" },
    description: {
      en: "LAN connects devices in a small area — homes, classrooms, offices. Think of it as neighborhood streets.",
      hi: "LAN छोटे क्षेत्र में उपकरणों को जोड़ता है — घर, कक्षाएँ, कार्यालय। इसे पड़ोस की सड़कों के रूप में सोचें।",
    },
    nodes: [
      { id: "r1", type: "router", label: { en: "Router", hi: "राउटर" }, x: 50, y: 22 },
      { id: "pc1", type: "pc", label: { en: "PC - Alice", hi: "पीसी - ऐलिस" }, x: 26, y: 58 },
      { id: "pc2", type: "pc", label: { en: "Laptop - Bob", hi: "लैपटॉप - बॉब" }, x: 74, y: 58 },
      { id: "printer", type: "printer", label: { en: "Printer", hi: "प्रिंटर" }, x: 50, y: 78 },
    ],
    links: [
      { id: "l1", a: "r1", b: "pc1" },
      { id: "l2", a: "r1", b: "pc2" },
      { id: "l3", a: "r1", b: "printer" },
    ],
  },

  wan: {
    name: { en: "Wide Area Network (WAN)", hi: "वाइड एरिया नेटवर्क (WAN)" },
    description: {
      en: "WAN connects networks over large distances — cities or countries via ISPs and backbone links. Think of it as highways and intercity roads.",
      hi: "WAN बड़े क्षेत्रों में नेटवर्क्स को जोड़ता है — शहर या देशों में ISP और बैकबोन लिंक के माध्यम से। इसे राजकीय हाइवे के रूप में सोचें।",
    },
    nodes: [
      { id: "isp1", type: "isp", label: { en: "ISP - North", hi: "आईएसपी - उत्तर" }, x: 18, y: 22 },
      { id: "isp2", type: "isp", label: { en: "ISP - Central", hi: "आईएसपी - केंद्रीय" }, x: 50, y: 16 },
      { id: "isp3", type: "isp", label: { en: "ISP - South", hi: "आईएसपी - दक्षिण" }, x: 82, y: 22 },
      { id: "dc", type: "datacenter", label: { en: "Data Center", hi: "डेटा सेंटर" }, x: 50, y: 58 },
      { id: "office", type: "office", label: { en: "Remote Office", hi: "रिमोट ऑफिस" }, x: 18, y: 78 },
      { id: "branch", type: "branch", label: { en: "Branch", hi: "शाखा" }, x: 82, y: 78 },
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

function uid(prefix = "n") {
  return `${prefix}_${Math.random().toString(36).slice(2, 9)}`;
}

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
  const [topology, setTopology] = useState(DEFAULT_TOPOLOGIES[mode]);
  const [nodes, setNodes] = useState(DEFAULT_TOPOLOGIES[mode].nodes.map(n => ({ ...n })));
  const [links, setLinks] = useState(DEFAULT_TOPOLOGIES[mode].links.map(l => ({ ...l })));
  const [selectedNode, setSelectedNode] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState(1);
  const canvasRef = useRef(null);
  const [draggingId, setDraggingId] = useState(null);
  const [newNodeType, setNewNodeType] = useState("pc");

  useEffect(() => {
    setTopology(DEFAULT_TOPOLOGIES[mode]);
    setNodes(DEFAULT_TOPOLOGIES[mode].nodes.map(n => ({ ...n })));
    setLinks(DEFAULT_TOPOLOGIES[mode].links.map(l => ({ ...l })));
    setSelectedNode(null);
    setIsPlaying(false);
  }, [mode]);

  const L = (obj) => (typeof obj === "string" ? obj : (lang === "hi" ? obj.hi : obj.en));

  function addNode() {
    const id = uid("n");
    const newNode = {
      id,
      type: newNodeType,
      x: 50,
      y: 50,
      label: { en: `${newNodeType} ${id}`, hi: `${newNodeType} ${id}` },
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

  const startSimulation = () => setIsPlaying(true);
  const stopSimulation = () => setIsPlaying(false);
  const toggleSimulation = () => setIsPlaying(p => !p);

  function findNode(id) { return nodes.find(n => n.id === id); }

  const teachingText = useMemo(() => ({
    en: {
      about: "LAN vs WAN — core differences and real-world examples.",
      long: "A Local Area Network (LAN) connects devices in a small geographic area like a home or school. Devices often share resources (printer, files) and low-latency, high-bandwidth links are common.\n\nA Wide Area Network (WAN) connects multiple LANs across cities, countries or continents — typically via ISPs and backbone links. WAN links may be slower, have higher latency, and use routing over complex topologies.\n\nAnalogy: A LAN is like neighborhood streets where houses are close; a WAN is like national highways connecting cities. Use LANs for local collaboration and WANs to reach remote branches or the internet.",
      quiz: [
        { q: "Which network is usually inside a single building?", a: "LAN" },
        { q: "Which network type might use ISPs and backbone links?", a: "WAN" },
      ],
    },
    hi: {
      about: "LAN बनाम WAN — मूल अंतर और वास्तविक दुनिया के उदाहरण।",
      long: "लोकल एरिया नेटवर्क (LAN) छोटे भौगोलिक क्षेत्र जैसे घर या स्कूल में उपकरणों को जोड़ता है। उपकरण आमतौर पर संसाधन साझा करते हैं और कम विलंबता, उच्च बैंडविड्थ कड़ियाँ सामान्य हैं।\n\nवाइड एरिया नेटवर्क (WAN) कई LANs को शहरों, देशों या महाद्वीपों में जोड़ता है — आमतौर पर ISPs और बैकबोन कड़ियों के माध्यम से। WAN कड़ियाँ धीमी हो सकती हैं, उच्च विलंबता हो सकती है, और जटिल टोपोलॉजी के ऊपर रूटिंग का उपयोग कर सकती हैं।\n\nउपमा: LAN पड़ोसी सड़कों जैसा है जहाँ घर पास होते हैं; WAN राष्ट्रीय हाइवे जैसी है जो शहरों को जोड़ती है। LAN स्थानीय सहयोग के लिए और WAN दूरस्थ शाखाओं या इंटरनेट तक पहुँचने के लिए उपयोग करें।",
      quiz: [
        { q: "कौन सा नेटवर्क आमतौर पर एक ही इमारत के अंदर होता है?", a: "LAN" },
        { q: "किस नेटवर्क प्रकार में ISPs और बैकबोन कड़ियाँ उपयोग हो सकती हैं?", a: "WAN" },
      ],
    }
  }), [lang]);

  const stats = useMemo(() => ({ nodes: nodes.length, links: links.length }), [nodes, links]);

  return (
    <div className="w-full max-w-7xl mx-auto p-4 sm:p-6">
      <div className="flex flex-col lg:flex-row gap-6">

        <div className="flex-1 bg-gradient-to-b from-slate-900 to-slate-800 rounded-2xl p-4 shadow-xl min-h-[520px]">
          <div className="flex items-start justify-between gap-4 mb-4">
            <div className="flex items-center gap-3">
              <h2 className="text-white font-bold text-lg">{L(topology.name)}</h2>
              <div className="text-slate-300 text-sm">{L(topology.description)}</div>
            </div>

            <div className="flex items-center gap-2">
              <div className="bg-white/5 rounded-md p-1 flex items-center gap-2">
                <button onClick={() => setMode('lan')} className={`px-3 py-1 rounded-md text-sm ${mode === 'lan' ? 'bg-white/10 text-white' : 'text-slate-300 hover:bg-white/5'}`}>LAN</button>
                <button onClick={() => setMode('wan')} className={`px-3 py-1 rounded-md text-sm ${mode === 'wan' ? 'bg-white/10 text-white' : 'text-slate-300 hover:bg-white/5'}`}>WAN</button>
              </div>

              <div className="bg-white/3 rounded-md p-1 flex items-center gap-2">
                <button onClick={toggleSimulation} className="px-3 py-2 bg-indigo-600/90 rounded-md flex items-center gap-2 text-white">
                  {isPlaying ? <FaPause /> : <FaPlay />}
                  <span className="text-sm">{isPlaying ? (lang === 'hi' ? 'रोकें' : 'Pause') : (lang === 'hi' ? 'चलाएँ' : 'Play')}</span>
                </button>

                <div className="flex items-center gap-2 px-2">
                  <div className="text-xs text-slate-300">{lang === 'hi' ? 'गति' : 'Speed'}</div>
                  <input aria-label="speed" type="range" min="0.5" max="2" step="0.1" value={speed} onChange={(e) => setSpeed(Number(e.target.value))} className="w-28" />
                  <div className="text-xs text-slate-200 w-10 text-right">{speed.toFixed(1)}x</div>
                </div>

                <div className="text-slate-300 text-xs pl-2">{stats.nodes} nodes • {stats.links} links</div>
              </div>
            </div>
          </div>

          <div
            ref={canvasRef}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            onPointerCancel={handlePointerUp}
            className="relative bg-gradient-to-b from-slate-800/60 via-transparent to-slate-900/40 rounded-xl border border-white/6 h-[420px] sm:h-[520px] overflow-hidden"
          >
            <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="w-full h-full absolute inset-0 pointer-events-none">
              <defs>
                <linearGradient id="linkGrad" x1="0" x2="1">
                  <stop offset="0%" stopColor="#60A5FA" stopOpacity="0.9" />
                  <stop offset="100%" stopColor="#34D399" stopOpacity="0.9" />
                </linearGradient>
              </defs>

              {links.map(link => {
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
                    strokeWidth={0.8}
                    opacity={0.9}
                    strokeLinecap="round"
                    vectorEffect="non-scaling-stroke"
                  />
                );
              })}

              {isPlaying && links.length > 0 && links.map((link, idx) => {
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
                    r={0.9}
                    fill="#FDE68A"
                    initial={{ cx: A.x, cy: A.y, opacity: 0 }}
                    animate={{ cx: B.x, cy: B.y, opacity: [0, 1, 1, 0] }}
                    transition={{ duration, delay, ease: "linear", repeat: Infinity }}
                    opacity={0.95}
                  />
                );
              })}
            </svg>

            {nodes.map(node => (
              <div
                key={node.id}
                style={{ left: `${node.x}%`, top: `${node.y}%` }}
                className="absolute -translate-x-1/2 -translate-y-1/2 z-20 pointer-events-auto"
                onPointerDown={(e) => handlePointerDown(e, node.id)}
              >
                <div className={`flex flex-col items-center text-center`}>
                  <motion.button
                    whileHover={{ scale: 1.08 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setSelectedNode(node.id === selectedNode ? null : node.id)}
                    className={`flex flex-col items-center p-2 rounded-full bg-gradient-to-br from-slate-700 to-slate-800 text-white shadow-md ring-1 ring-white/6`}
                    aria-label={node.label?.en || node.id}
                  >
                    <div className="text-xl">{IconForType(node.type)}</div>
                    <div className="text-[10px] mt-1 text-slate-200 font-medium">{lang === 'hi' ? node.label.hi : node.label.en}</div>
                  </motion.button>

                  <AnimatePresence>
                    {selectedNode === node.id && (
                      <motion.div
                        initial={{ opacity: 0, y: -8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -8 }}
                        className="absolute left-1/2 -translate-x-1/2 bottom-full mb-3 w-52 bg-slate-800/95 backdrop-blur-md p-3 rounded-lg text-xs text-slate-100 border border-white/6 shadow-xl z-50"
                      >
                        <div className="font-semibold">{lang === 'hi' ? node.label.hi : node.label.en}</div>
                        <div className="text-slate-300 text-xs mt-1">{node.type === 'router' ? (lang === 'hi' ? 'नेटवर्क पैकेट को आगे भेजता है' : 'Forwards network packets') : (lang === 'hi' ? 'एक नेटवर्क डिवाइस' : 'A network device')}</div>

                        <div className="flex gap-2 mt-2">
                          <button onClick={() => connectNodes(selectedNode, node.id)} className="flex-1 bg-white/6 px-2 py-1 rounded text-xs">{lang === 'hi' ? 'कनेक्ट करें' : 'Connect'}</button>
                          <button onClick={() => removeNode(node.id)} className="flex-1 bg-red-600/80 px-2 py-1 rounded text-xs text-white">{lang === 'hi' ? 'हटायें' : 'Remove'}</button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                </div>
              </div>
            ))}

          </div>

          <div className="mt-4 flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <select value={newNodeType} onChange={(e) => setNewNodeType(e.target.value)} className="bg-slate-800 text-slate-100 px-2 py-1 rounded-md text-sm">
                <option value="pc">PC</option>
                <option value="router">Router</option>
                <option value="printer">Printer</option>
                <option value="office">Office</option>
                <option value="datacenter">Data Center</option>
              </select>

              <button onClick={addNode} className="flex items-center gap-2 bg-emerald-500 px-3 py-2 rounded-md text-white"><FaPlus /> <span className="text-sm">{lang === 'hi' ? 'नोड जोड़ें' : 'Add Node'}</span></button>

              <button onClick={() => {
                setNodes(DEFAULT_TOPOLOGIES[mode].nodes.map(n => ({ ...n }));
                setLinks(DEFAULT_TOPOLOGIES[mode].links.map(l => ({ ...l }));
                setSelectedNode(null);
                setIsPlaying(false);
              }} className="flex items-center gap-2 bg-white/6 px-3 py-2 rounded-md text-white"><FaTrash /> <span className="text-sm">{lang === 'hi' ? 'रीसेट' : 'Reset'}</span></button>
            </div>

            <div className="text-xs text-slate-300">{lang === 'hi' ? 'नोड्स को खींच कर स्थानांतरित करें। किसी नोड पर क्लिक करें कनेक्ट/रिमूव विकल्प के लिए।' : 'Drag nodes to reposition. Click a node for connect/remove options.'}</div>
          </div>
        </div>

        <aside className="w-full lg:w-96 shrink-0 bg-slate-800/95 rounded-2xl p-4 shadow-inner">
          <div className="flex items-center justify-between mb-3">
            <div>
              <div className="text-sm text-slate-300">{lang === 'hi' ? 'शिक्षण सामग्री' : 'Teaching Content'}</div>
              <div className="text-white font-semibold">{mode === 'lan' ? (lang === 'hi' ? 'LAN (लोकल)' : 'LAN (Local)') : (lang === 'hi' ? 'WAN (दूरस्थ)' : 'WAN (Wide)')}</div>
            </div>
            <div className="flex items-center gap-2">
              <button onClick={() => setLang(l => l === 'en' ? 'hi' : 'en')} className="px-2 py-1 bg-white/6 rounded text-sm">{lang === 'hi' ? 'EN' : 'HI'}</button>
              <div className="text-slate-400 text-xs">{lang === 'hi' ? 'विस्तार' : 'Overview'}</div>
            </div>
          </div>

          <div className="text-slate-200 text-sm leading-relaxed whitespace-pre-line">{lang === 'hi' ? teachingText.hi.long : teachingText.en.long}</div>

          <div className="mt-4">
            <div className="text-sm text-slate-300 mb-2">{lang === 'hi' ? 'प्रयोग' : 'Try this'}</div>
            <ol className="text-slate-200 text-sm list-decimal list-inside space-y-2">
              <li>{lang === 'hi' ? 'LAN मोड में नोड्स जोड़ें और देखें कैसे पैकेट तेज़ी से चलते हैं।' : 'Add nodes in LAN mode and observe fast, local packet flows.'}</li>
              <li>{lang === 'hi' ? 'WAN मोड पर स्विच करें और समझें दूरी और लेटेंसी का प्रभाव।' : 'Switch to WAN mode and notice latency and longer links.'}</li>
              <li>{lang === 'hi' ? 'किसी नोड को कनेक्ट करें और फिर सिमुलेशन चलाएँ।' : 'Connect nodes and then run the simulation.'}</li>
            </ol>
          </div>

          <div className="mt-4 bg-slate-900/60 p-3 rounded-lg border border-white/6">
            <div className="flex items-center justify-between text-slate-300 text-sm mb-2">
              <div>{lang === 'hi' ? 'क्विज़' : 'Quiz'}</div>
              <div className="text-xs text-slate-500">{lang === 'hi' ? 'प्रश्न' : 'Questions'}</div>
            </div>
            <div className="text-slate-200 text-sm space-y-2">
              {(lang === 'hi' ? teachingText.hi.quiz : teachingText.en.quiz).map((q, i) => (
                <div key={i} className="p-2 bg-slate-800/60 rounded">
                  <div className="text-xs">{q.q}</div>
                  <details className="mt-1 text-xs text-slate-300 p-1"><summary className="cursor-pointer text-sky-300">Answer</summary><div className="mt-1">{q.a}</div></details>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-4 text-xs text-slate-400">{lang === 'hi' ? 'यह व्यावहारिक उपकरण छात्रों के लिए नकली नेटवर्क बनाने और रूटिंग/डिजाइन शर्तों को समझने में सहायक है।' : 'This interactive tool helps students build mock networks and understand routing/design tradeoffs.'}</div>
        </aside>

      </div>
    </div>
  );
}
