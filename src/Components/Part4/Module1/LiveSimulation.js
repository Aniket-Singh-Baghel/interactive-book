import React, { useState, useRef, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaNetworkWired,
  FaBolt,
  FaPlus,
  FaTrash,
  FaPlay,
  FaPause,
  FaWifi,
  FaServer,
  FaDesktop,
  FaMobileAlt,
  FaSatelliteDish,
} from "react-icons/fa";

// InteractiveConnectivitySimulation.js
// - Drag nodes, add/remove, connect
// - Wired/Wireless modes with example topologies
// - Packet animation, speed control
// - Bilingual support (en/hi)

const DEFAULT_TOPOLOGIES = {
  wired: {
    name: { en: "Wired Network", hi: "वायर्ड नेटवर्क" },
    description: {
      en: "Uses physical cables for a stable, high-speed connection.",
      hi: "एक स्थिर, उच्च गति कनेक्शन के लिए भौतिक केबल का उपयोग करता है।",
    },
    nodes: [
      { id: "router", type: "router", label: { en: "Router", hi: "राउटर" }, x: 50, y: 20 },
      { id: "pc", type: "pc", label: { en: "Desktop PC", hi: "डेस्कटॉप पीसी" }, x: 25, y: 70 },
      { id: "server", type: "server", label: { en: "File Server", hi: "फ़ाइल सर्वर" }, x: 75, y: 70 },
    ],
    links: [
      { id: "l1", a: "router", b: "pc" },
      { id: "l2", a: "router", b: "server" },
    ],
  },
  wireless: {
    name: { en: "Wireless Network", hi: "वायरलेस नेटवर्क" },
    description: {
      en: "Uses radio waves (Wi-Fi) for a flexible, convenient connection.",
      hi: "एक लचीला, सुविधाजनक कनेक्शन के लिए रेडियो तरंगों (वाई-फाई) का उपयोग करता है।",
    },
    nodes: [
        { id: "modem", type: "wifi", label: { en: "Wi-Fi Router", hi: "वाई-फाई राउटर" }, x: 50, y: 30 },
        { id: "laptop", type: "pc", label: { en: "Laptop", hi: "लैपटॉप" }, x: 25, y: 70 },
        { id: "phone", type: "phone", label: { en: "Smartphone", hi: "स्मार्टफोन" }, x: 75, y: 70 },
    ],
    links: [
      { id: "l1", a: "modem", b: "laptop" },
      { id: "l2", a: "modem", b: "phone" },
    ],
  },
  satellite: {
    name: { en: "Satellite Network", hi: "सैटेलाइट नेटवर्क" },
    description: {
      en: "Uses a satellite to connect remote locations to the internet.",
      hi: "इंटरनेट से दूरस्थ स्थानों को जोड़ने के लिए एक उपग्रह का उपयोग करता है।",
    },
    nodes: [
      { id: "user", type: "pc", label: { en: "Remote User", hi: "दूरस्थ उपयोगकर्ता" }, x: 20, y: 80 },
      { id: "dish", type: "satellite", label: { en: "Satellite Dish", hi: "सैटेलाइट डिश" }, x: 50, y: 20 },
      { id: "server", type: "server", label: { en: "Data Center", hi: "डेटा सेंटर" }, x: 80, y: 80 },
    ],
    links: [
      { id: "l1", a: "user", b: "dish" },
      { id: "l2", a: "dish", b: "server" },
    ],
  },
  deviceDescriptions: {
    router: {
      en: "Directs data packets between computer networks.",
      hi: "कंप्यूटर नेटवर्क के बीच डेटा पैकेट निर्देशित करता है।",
    },
    pc: {
      en: "A personal computer for end-users.",
      hi: "अंतिम-उपयोगकर्ताओं के लिए एक व्यक्तिगत कंप्यूटर।",
    },
    server: {
      en: "Stores, sends, and receives data for clients.",
      hi: "ग्राहकों के लिए डेटा संग्रहीत करता है, भेजता है और प्राप्त करता है।",
    },
    wifi: {
      en: "Provides wireless internet access to devices.",
      hi: "उपकरणों को वायरलेस इंटरनेट का उपयोग प्रदान करता है।",
    },
    phone: {
      en: "A mobile device for communication and data.",
      hi: "संचार और डेटा के लिए एक मोबाइल उपकरण।",
    },
    satellite: {
      en: "Receives and transmits signals from/to a satellite.",
      hi: "एक उपग्रह से/को सिग्नल प्राप्त और प्रसारित करता है।",
    },
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
      return <FaDesktop />;
    case "server":
      return <FaServer />;
    case "wifi":
        return <FaWifi />;
    case "phone":
        return <FaMobileAlt />;
    case "satellite":
        return <FaSatelliteDish />;
    default:
      return <FaBolt />;
  }
}

export default function InteractiveConnectivitySimulation({ initialLang = "en" }) {
  const [mode, setMode] = useState("wired");
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
  const [connectingNodeId, setConnectingNodeId] = useState(null);

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

    if (nodes.length > 0) {
      let closestNode = null;
      let minDistance = Infinity;

      nodes.forEach(node => {
        const distance = Math.pow(node.x - newNode.x, 2) + Math.pow(node.y - newNode.y, 2);
        if (distance < minDistance) {
          minDistance = distance;
          closestNode = node;
        }
      });
      
      if (closestNode) {
        setLinks(prev => [...prev, { id: uid('link'), a: newNode.id, b: closestNode.id }]);
      }
    }

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
    <div className="w-full">
      <div className="flex flex-col gap-6">

        <div className="flex-1 bg-white rounded-2xl p-4 shadow-lg border border-slate-200 min-h-[520px]">
          <div className="flex items-start justify-between gap-4 mb-4">
            <div className="flex items-center gap-3">
              <h2 className="text-slate-800 font-bold text-lg">{L(topology.name)}</h2>
              <div className="text-slate-500 text-sm">{L(topology.description)}</div>
            </div>

            <div className="flex items-center gap-2">
              <div className="bg-slate-100 rounded-md p-1 flex items-center gap-2">
                <button onClick={() => setMode('wired')} className={`px-3 py-1 rounded-md text-sm ${mode === 'wired' ? 'bg-indigo-600 text-white shadow' : 'text-slate-600 hover:bg-slate-200'}`}>Wired</button>
                <button onClick={() => setMode('wireless')} className={`px-3 py-1 rounded-md text-sm ${mode === 'wireless' ? 'bg-indigo-600 text-white shadow' : 'text-slate-600 hover:bg-slate-200'}`}>Wireless</button>
                <button onClick={() => setMode('satellite')} className={`px-3 py-1 rounded-md text-sm ${mode === 'satellite' ? 'bg-indigo-600 text-white shadow' : 'text-slate-600 hover:bg-slate-200'}`}>Satellite</button>
              </div>

              <div className="bg-slate-100/80 rounded-md p-1 flex items-center gap-2">
                <button onClick={toggleSimulation} className="px-3 py-2 bg-indigo-600 hover:bg-indigo-700 rounded-md flex items-center gap-2 text-white">
                  {isPlaying ? <FaPause /> : <FaPlay />}
                  <span className="text-sm">{isPlaying ? (lang === 'hi' ? 'रोकें' : 'Pause') : (lang === 'hi' ? 'चलाएँ' : 'Play')}</span>
                </button>

                <div className="flex items-center gap-2 px-2">
                  <div className="text-xs text-slate-500">{lang === 'hi' ? 'गति' : 'Speed'}</div>
                  <input aria-label="speed" type="range" min="0.5" max="2" step="0.1" value={speed} onChange={(e) => setSpeed(Number(e.target.value))} className="w-28" />
                  <div className="text-xs text-slate-600 w-10 text-right">{speed.toFixed(1)}x</div>
                </div>

                <div className="text-slate-500 text-xs pl-2">{stats.nodes} nodes • {stats.links} links</div>
              </div>
            </div>
          </div>

          <div
            ref={canvasRef}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            onPointerCancel={handlePointerUp}
            className="relative bg-slate-50 rounded-xl border border-slate-200 h-[420px] sm:h-[520px] overflow-hidden"
          >
            <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="w-full h-full absolute inset-0 pointer-events-none">
              <defs>
                <linearGradient id="linkGrad" x1="0" x2="1">
                  <stop offset="0%" stopColor="#4F46E5" stopOpacity="0.9" />
                  <stop offset="100%" stopColor="#10B981" stopOpacity="0.9" />
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
                    opacity={0.8}
                    strokeLinecap="round"
                    vectorEffect="non-scaling-stroke"
                    strokeDasharray={mode === 'wireless' || mode === "satellite" ? "4 4" : "none"}
                  />
                );
              })}

              {isPlaying && links.length > 0 && links.map((link, idx) => {
                const A = findNode(link.a);
                const B = findNode(link.b);
                if (!A || !B) return null;
                const duration = 3 / speed;
                return (
                  <motion.circle
                    key={`p-${link.id}-${speed}`}
                    cx={A.x}
                    cy={A.y}
                    r={0.9}
                    fill="#F59E0B"
                    initial={{ cx: A.x, cy: A.y, opacity: 0 }}
                    animate={{ cx: B.x, cy: B.y, opacity: [0, 1, 1, 0] }}
                    transition={{ duration, ease: "linear", repeat: Infinity, delay: (idx % 3) * 0.6 }}
                    opacity={0.95}
                  />
                );
              })}
            </svg>

           {nodes.map((node) => {
  let popupClasses = 'absolute left-1/2 -translate-x-1/2';
  if (node.x < 25) {
    popupClasses = 'absolute left-0';
  } else if (node.x > 75) {
    popupClasses = 'absolute right-0';
  }

  return (
    <div
      key={node.id}
      style={{ left: `${node.x}%`, top: `${node.y}%` }}
      className="absolute -translate-x-1/2 -translate-y-1/2 z-20 pointer-events-auto"
      onPointerDown={(e) => handlePointerDown(e, node.id)}
    >
      <div className="flex flex-col items-center text-center">
        <motion.button
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => {
            if (connectingNodeId) {
              connectNodes(connectingNodeId, node.id);
              setConnectingNodeId(null);
              setSelectedNode(null);
            } else {
              setSelectedNode(node.id === selectedNode ? null : node.id);
            }
          }}
          className={`flex flex-col items-center p-2 rounded-full bg-white text-slate-700 shadow-md ring-1 ring-slate-200/50 ${connectingNodeId ? 'cursor-pointer' : ''}`}
          aria-label={node.label?.en || node.id}
        >
          <div className="text-xl">{IconForType(node.type)}</div>
          <div className="text-[10px] mt-1 text-slate-600 font-medium">
            {lang === 'hi' ? node.label.hi : node.label.en}
          </div>
        </motion.button>

        <AnimatePresence>
          {selectedNode === node.id && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              className={`${popupClasses} ${
                node.y > 50 ? 'bottom-full mb-3' : 'top-full mt-3'
              } w-52 bg-white/90 backdrop-blur-md p-3 rounded-lg text-xs text-slate-700 border border-slate-200 shadow-xl z-50`}
            >
              <div className="font-semibold">
                {lang === 'hi' ? node.label.hi : node.label.en}
              </div>
              <div className="text-slate-500 text-xs mt-1">
                {L(DEFAULT_TOPOLOGIES.deviceDescriptions[node.type])}
              </div>

              <div className="flex gap-2 mt-2">
                <button
                  onClick={() => setConnectingNodeId(node.id)}
                  className="flex-1 bg-slate-100 hover:bg-slate-200 px-2 py-1 rounded text-xs"
                >
                  {connectingNodeId === node.id ? (lang === 'hi' ? 'रद्द करें' : 'Cancel') : (lang === 'hi' ? 'कनेक्ट करें' : 'Connect')}
                </button>
                <button
                  onClick={() => removeNode(node.id)}
                  className="flex-1 bg-red-500 hover:bg-red-600 px-2 py-1 rounded text-xs text-white"
                >
                  {lang === 'hi' ? 'हटायें' : 'Remove'}
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
})}

          </div>

          <div className="mt-4 flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <select value={newNodeType} onChange={(e) => setNewNodeType(e.target.value)} className="bg-slate-100 text-slate-800 px-2 py-1 rounded-md text-sm border border-slate-200">
                <option value="pc">PC</option>
                <option value="router">Router</option>
                <option value="server">Server</option>
                <option value="wifi">Wi-Fi</option>
                <option value="phone">Phone</option>
                <option value="satellite">Satellite Dish</option>
              </select>

              <button onClick={addNode} className="flex items-center gap-2 bg-emerald-500 hover:bg-emerald-600 px-3 py-2 rounded-md text-white"><FaPlus /> <span className="text-sm">{lang === 'hi' ? 'नोड जोड़ें' : 'Add Node'}</span></button>

              <button onClick={() => {
                setNodes(DEFAULT_TOPOLOGIES[mode].nodes.map(n => ({ ...n })))
                setLinks(DEFAULT_TOPOLOGIES[mode].links.map(l => ({ ...l })))
                setSelectedNode(null)
                setIsPlaying(false)
              }} className="flex items-center gap-2 bg-slate-200 hover:bg-slate-300 px-3 py-2 rounded-md text-slate-700"><FaTrash /> <span className="text-sm">{lang === 'hi' ? 'रीसेट' : 'Reset'}</span></button>
            </div>

            <div className="text-xs text-slate-500">{lang === 'hi' ? 'नोड्स को खींच कर स्थानांतरित करें। किसी नोड पर क्लिक करें कनेक्ट/रिमूव विकल्प के लिए।' : 'Drag nodes to reposition. Click a node for connect/remove options.'}</div>
          </div>
        </div>

      </div>
    </div>
  );
}
