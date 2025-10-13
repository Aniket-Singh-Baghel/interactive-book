import React, { useMemo, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaPlay,
  FaPause,
  FaUser,
  FaBroadcastTower,
  FaSatelliteDish,
  FaServer,
  FaWifi,
  FaPlug,
  FaGlobe,
  FaLanguage,
  FaRedoAlt,
} from "react-icons/fa";

// Responsive network simulation component (Dark UI - polished)
// Features added:
// - Cleaner card layout, improved spacing & typography
// - Mobile-first responsive behavior
// - Better control grouping and accessible labels
// - Slightly refined animations and packet visuals
// - RTL/Hindi support preserved via `lang` prop

const BASE_NODES = {
  wired: [
    { id: "pc", icon: <FaUser />, label: { en: "PC", hi: "पीसी" }, x: 8, y: 70 },
    { id: "switch", icon: <FaPlug />, label: { en: "Switch", hi: "स्विच" }, x: 48, y: 70 },
    { id: "server", icon: <FaServer />, label: { en: "Server", hi: "सर्वर" }, x: 92, y: 70 },
  ],
  wifi: [
    { id: "phone", icon: <FaUser />, label: { en: "Device", hi: "डिवाइस" }, x: 12, y: 72 },
    { id: "router", icon: <FaWifi />, label: { en: "Wi‑Fi Router", hi: "वाई‑फाई राउटर" }, x: 48, y: 42 },
    { id: "server", icon: <FaServer />, label: { en: "Server", hi: "सर्वर" }, x: 88, y: 20 },
  ],
  satellite: [
    { id: "device", icon: <FaUser />, label: { en: "Device", hi: "डिवाइस" }, x: 12, y: 78 },
    { id: "satellite", icon: <FaSatelliteDish />, label: { en: "Satellite", hi: "सैटेलाइट" }, x: 50, y: 12 },
    { id: "ground", icon: <FaBroadcastTower />, label: { en: "Ground Station", hi: "ग्राउंड स्टेशन" }, x: 74, y: 46 },
    { id: "server", icon: <FaServer />, label: { en: "Server", hi: "सर्वर" }, x: 92, y: 86 },
  ],
};

const IconBubble = ({ children }) => (
  <div className="inline-flex items-center gap-2 bg-white/6 text-white rounded-full px-3 py-1 text-xs font-medium shadow-sm">
    {children}
  </div>
);

const Packet = ({ path, duration = 1.6, delay = 0, color = "#7DD3FC", size = 7, speed = 1 }) => {
  // Use SVG motion for more consistent positioning inside viewBox
  return (
    <motion.g
      initial={{ opacity: 0, offsetDistance: "0%" }}
      animate={{ opacity: [0, 1, 1, 0], offsetDistance: ["0%", "40%", "90%", "100%"] }}
      transition={{ duration: duration / speed, delay, ease: "linear", repeat: Infinity }}
      aria-hidden
    >
      {/* Render a small rounded rect as the packet - positioned by offsetPath in style when inside HTML element. For SVG we'll just draw a circle and animate along the path using <animateMotion> fallback is not used. */}
      <circle r={size / 2} fill={color} fillOpacity="0.95" strokeOpacity="0.05" />
    </motion.g>
  );
};

const AnimatedPath = ({ d, color = "#60A5FA", dash = "4 4", duration = 1.4, delay = 0, isPlaying }) => (
  <motion.path
    d={d}
    fill="none"
    stroke={color}
    strokeWidth={isPlaying ? 0.9 : 0.9}
    strokeDasharray={dash}
    strokeLinecap="round"
    initial={{ pathLength: 0, opacity: 0 }}
    animate={{ pathLength: 1, opacity: 1 }}
    transition={{ duration, delay, ease: "easeInOut" }}
  />
);

export default function NetworkSimulation({ lang = "en" }) {
  const [mode, setMode] = useState("wired");
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState(1);
  const [activeNode, setActiveNode] = useState(null);
  const svgRef = useRef(null);

  const nodes = useMemo(() => BASE_NODES[mode], [mode]);
  const getNode = id => nodes.find(n => n.id === id) || { x: 50, y: 50 };

  const paths = useMemo(() => {
    if (mode === "wired") {
      const pc = getNode("pc");
      const sw = getNode("switch");
      const srv = getNode("server");
      return [
        { id: "pc-sw", d: `M ${pc.x} ${pc.y} L ${sw.x} ${sw.y}` },
        { id: "sw-srv", d: `M ${sw.x} ${sw.y} L ${srv.x} ${srv.y}` },
      ];
    }

    if (mode === "wifi") {
      const dev = getNode("phone");
      const rt = getNode("router");
      const srv = getNode("server");
      return [
        { id: "dev-rt", d: `M ${dev.x} ${dev.y} C ${dev.x + 18} ${dev.y - 26}, ${rt.x - 10} ${rt.y + 12}, ${rt.x} ${rt.y}` },
        { id: "rt-srv", d: `M ${rt.x} ${rt.y} C ${rt.x + 20} ${rt.y - 10}, ${srv.x - 20} ${srv.y + 20}, ${srv.x} ${srv.y}` },
      ];
    }

    const device = getNode("device");
    const sat = getNode("satellite");
    const ground = getNode("ground");
    const server = getNode("server");

    return [
      { id: "device-sat", d: `M ${device.x} ${device.y} C ${device.x + 18} ${device.y - 66}, ${sat.x - 20} ${sat.y + 28}, ${sat.x} ${sat.y}` },
      { id: "sat-ground", d: `M ${sat.x} ${sat.y} C ${sat.x + 18} ${sat.y + 30}, ${ground.x - 8} ${ground.y - 10}, ${ground.x} ${ground.y}` },
      { id: "ground-server", d: `M ${ground.x} ${ground.y} L ${server.x} ${server.y}` },
    ];
  }, [mode, nodes]);

  const togglePlay = () => setIsPlaying(p => !p);
  const restart = () => { setIsPlaying(false); setTimeout(() => setIsPlaying(true), 70); };

  const L = (textObj) => (textObj ? (lang === "hi" ? textObj.hi : textObj.en) : "");

  return (
    <div className="w-full max-w-6xl mx-auto p-3 sm:p-6">
      <div className="flex flex-col lg:flex-row gap-4">
        {/* Simulation Card */}
        <div className="flex-1 bg-gradient-to-b from-slate-900/90 to-slate-800/95 rounded-2xl p-4 shadow-2xl ring-1 ring-white/5 min-h-[340px]">
          <div className="flex items-start justify-between gap-3 mb-3">
            <div className="flex items-center gap-3">
              <h3 className="text-white text-lg sm:text-xl font-semibold tracking-tight">{lang === "hi" ? "नेटवर्क सिमुलेशन" : "Network Simulation"}</h3>
              <IconBubble>
                <FaGlobe />
                <span className="ml-1 text-xs uppercase">{mode}</span>
              </IconBubble>
            </div>

            <div className="flex items-center gap-2">
              <div className="hidden sm:flex items-center gap-2 bg-white/2 rounded-md p-1">
                <button onClick={() => setMode("wired")} className={`px-3 py-1 rounded-md text-sm font-medium ${mode === "wired" ? "bg-white/10 text-white" : "text-slate-300 hover:bg-white/5"}`}>Wired</button>
                <button onClick={() => setMode("wifi")} className={`px-3 py-1 rounded-md text-sm font-medium ${mode === "wifi" ? "bg-white/10 text-white" : "text-slate-300 hover:bg-white/5"}`}>Wi‑Fi</button>
                <button onClick={() => setMode("satellite")} className={`px-3 py-1 rounded-md text-sm font-medium ${mode === "satellite" ? "bg-white/10 text-white" : "text-slate-300 hover:bg-white/5"}`}>Satellite</button>
              </div>

              <div className="sm:hidden flex items-center gap-1 bg-white/3 rounded-md p-1">
                <select value={mode} onChange={(e) => setMode(e.target.value)} className="bg-transparent text-slate-100 text-sm focus:outline-none">
                  <option value="wired">Wired</option>
                  <option value="wifi">Wi‑Fi</option>
                  <option value="satellite">Satellite</option>
                </select>
              </div>
            </div>
          </div>

          <div className="relative w-full rounded-lg overflow-hidden border border-white/6" style={{ minHeight: 260 }}>
            <svg ref={svgRef} viewBox="0 0 100 100" preserveAspectRatio="xMidYMid meet" className="w-full h-[300px] sm:h-[360px] md:h-[420px]">
              <defs>
                <linearGradient id="bg2" x1="0" x2="0" y1="0" y2="1">
                  <stop offset="0%" stopColor="#071024" stopOpacity="0.6" />
                  <stop offset="100%" stopColor="#031022" stopOpacity="1" />
                </linearGradient>
                <filter id="softGlow" x="-50%" y="-50%" width="200%" height="200%">
                  <feDropShadow dx="0" dy="0" stdDeviation="2" floodColor="#60A5FA" floodOpacity="0.08" />
                </filter>
              </defs>

              <rect x="0" y="0" width="100" height="100" fill="url(#bg2)" />

              <g>
                {paths.map((p, i) => (
                  <AnimatedPath
                    key={p.id}
                    d={p.d}
                    color={mode === "wired" ? "#FDE68A" : "#60A5FA"}
                    duration={1.2}
                    delay={i * 0.2}
                    isPlaying={isPlaying}
                  />
                ))}
              </g>

            </svg>

            {/* Absolute overlay for nodes */}
            <div className="absolute inset-0 pointer-events-none">
              {nodes.map(node => (
                <div key={node.id} style={{ left: `${node.x}%`, top: `${node.y}%` }} className="absolute -translate-x-1/2 -translate-y-1/2 z-20 pointer-events-auto">
                  <motion.button
                    onClick={() => setActiveNode(node.id === activeNode ? null : node.id)}
                    className="flex flex-col items-center gap-1 focus:outline-none"
                    aria-label={L(node.label)}
                    whileHover={{ scale: 1.05 }}
                  >
                    <div className={`p-2 sm:p-3 rounded-full text-white drop-shadow-lg transition-transform duration-200 ${activeNode === node.id ? "bg-sky-500/90 scale-110 ring-2 ring-sky-400" : "bg-gradient-to-br from-slate-700 to-slate-800"}`}>
                      <span className="text-lg sm:text-2xl">{node.icon}</span>
                    </div>
                    <div className="text-[10px] sm:text-xs text-slate-200 mt-1 font-medium">{L(node.label)}</div>
                  </motion.button>

                  <AnimatePresence>
                    {activeNode === node.id && (
                      <motion.div
                        initial={{ opacity: 0, y: node.y > 60 ? 8 : -8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: node.y > 60 ? 8 : -8 }}
                        className={`absolute ${node.y > 60 ? "bottom-full mb-3" : "top-full mt-3"} left-1/2 -translate-x-1/2 w-44 sm:w-56 bg-slate-800/95 backdrop-blur-md text-white border border-white/8 rounded-lg p-3 text-xs sm:text-sm shadow-xl z-50`}
                      >
                        <div className="font-semibold">{L(node.label)}</div>
                        <div className="mt-1 text-xs text-slate-200 leading-relaxed">
                          {mode === "wired" && (L({ en: "Connected via cable. Fast & stable.", hi: "केबल से जुड़ा। तेज़ और स्थिर।" }))}
                          {mode === "wifi" && (L({ en: "Sends wireless signals to the router.", hi: "राउटर को वायरलेस सिग्नल भेजता है।" }))}
                          {mode === "satellite" && (L({ en: "Communicates via satellite link (long distance).", hi: "सैटेलाइट लिंक के जरिए संचार (लंबी दूरी)।" }))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}

              {/* Packets visual (subtle) - rendered as small glowing dots using HTML overlay for consistent blur */}
              <AnimatePresence>
                {isPlaying && paths.map((p, i) => (
                  <div key={`packets-${p.id}`} className="absolute inset-0 pointer-events-none">
                    {/* We'll render two moving pseudo-packets per path using CSS animations tied to path d attribute isn't trivial here; this keeps it visually consistent and simple */}
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: [0, 1, 1, 0] }}
                      transition={{ repeat: Infinity, duration: 2.6 / speed, delay: i * 0.6 }}
                      className="absolute"
                      aria-hidden
                    >
                      {/* Decorative dot placed roughly - for full accuracy you'd animate along SVG path using more advanced motionPath plugins. This simplified version keeps performance high. */}
                      <div style={{ left: `calc(${(i + 1) * 20}% - 8px)`, top: `calc(${30 + i * 10}% - 8px)` }} className="absolute w-2.5 h-2.5 rounded-full bg-sky-400/90 blur-sm shadow-[0_0_8px_rgba(96,165,250,0.6)]" />
                    </motion.div>
                  </div>
                ))}
              </AnimatePresence>

            </div>

          </div>

          {/* Controls */}
          <div className="mt-3 flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <button onClick={togglePlay} aria-pressed={isPlaying} className="flex items-center gap-2 px-3 py-2 rounded-lg bg-indigo-600/90 hover:bg-indigo-700 text-white font-semibold shadow focus:ring-2 focus:ring-indigo-400">
                {isPlaying ? <FaPause /> : <FaPlay />}
                <span className="ml-1">{isPlaying ? (lang === "hi" ? "रोकें" : "Pause") : (lang === "hi" ? "चलाएँ" : "Play")}</span>
              </button>

              <button onClick={restart} className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white/6 text-white hover:bg-white/8">
                <FaRedoAlt />
                <span className="ml-1 text-sm">{lang === "hi" ? "रीस्टार्ट" : "Restart"}</span>
              </button>

              <div className="flex items-center gap-2 ml-2 text-sm text-slate-200">
                <div className="text-xs">{lang === "hi" ? "गति" : "Speed"}</div>
                <input type="range" min="0.5" max="2" step="0.1" value={speed} onChange={(e) => setSpeed(Number(e.target.value))} className="w-28" aria-label="Speed" />
                <div className="w-10 text-right">{speed.toFixed(1)}x</div>
              </div>
            </div>

            <div className="text-xs text-slate-300">{lang === "hi" ? "किसी भी आइकन पर क्लिक करें स्पष्टीकरण के लिए" : "Click any icon for explanation"}</div>
          </div>
        </div>

        {/* Teaching Panel */}
        <aside className="w-full lg:w-80 shrink-0 bg-slate-800/95 rounded-2xl p-4 shadow-inner ring-1 ring-white/5">
          <div className="flex items-center justify-between mb-3">
            <div>
              <div className="text-sm text-slate-300">{lang === "hi" ? "शिक्षण नोट्स" : "Teaching Notes"}</div>
              <div className="text-white font-semibold">{mode === "wired" ? (lang === "hi" ? "वायर्ड नेटवर्क" : "Wired Network") : (mode === "wifi" ? (lang === "hi" ? "वायरलेस - वाई‑फाई" : "Wireless - Wi‑Fi") : (lang === "hi" ? "वायरलेस - सैटेलाइट" : "Wireless - Satellite"))}</div>
            </div>
            <div className="text-slate-400 text-xs">{lang === "hi" ? "बुनियादी" : "Basics"}</div>
          </div>

          <ul className="space-y-3 text-slate-200 text-sm">
            <li>
              <div className="font-medium">{lang === "hi" ? "डेटा पैकेट" : "Data Packet"}</div>
              <div className="text-slate-300 text-xs">{lang === "hi" ? "छोटा संदेश जो नेटवर्क पर यात्रा करता है" : "A small message that travels on the network"}</div>
            </li>

            <li>
              <div className="font-medium">{lang === "hi" ? "गति और स्थिरता" : "Speed & Stability"}</div>
              <div className="text-slate-300 text-xs">{mode === "wired" ? (lang === "hi" ? "वायर्ड तेज़ और स्थिर होता है" : "Wired is fast and stable") : (lang === "hi" ? "वायरलेस में देरी और हस्तक्षेप हो सकता है" : "Wireless can have latency and interference")}</div>
            </li>

            <li>
              <div className="font-medium">{lang === "hi" ? "वास्तविक दुनिया" : "Real World"}</div>
              <div className="text-slate-300 text-xs">{mode === "satellite" ? (lang === "hi" ? "सैटेलाइट का उपयोग समुद्र/दूरस्थ क्षेत्र में होता है" : "Satellites are used for sea/remote areas") : (lang === "hi" ? "घर और स्कूल में वाई‑फाई सामान्य है" : "Wi‑Fi is common in homes and schools")}</div>
            </li>
          </ul>

          <div className="mt-4">
            <div className="text-xs text-slate-400">{lang === "hi" ? "प्रयोग" : "Try"}</div>
            <div className="flex gap-2 mt-2">
              <button onClick={() => { setMode("wired"); setIsPlaying(true); }} className="flex-1 px-3 py-2 rounded-md bg-white/6 text-white">{lang === "hi" ? "वायर्ड दिखाएँ" : "Show Wired"}</button>
              <button onClick={() => { setMode("wifi"); setIsPlaying(true); }} className="flex-1 px-3 py-2 rounded-md bg-white/6 text-white">Wi‑Fi</button>
            </div>
            <button onClick={() => { setMode("satellite"); setIsPlaying(true); }} className="w-full mt-2 px-3 py-2 rounded-md bg-white/6 text-white">Satellite</button>
          </div>

        </aside>
      </div>

      <div className="mt-4 text-center text-xs text-slate-400">{lang === "hi" ? "यह कंपोनेंट टेलविंड, फ्रेमर‑मोशन और react‑icons का उपयोग करता है" : "This component uses Tailwind, Framer‑Motion and react‑icons"}</div>
    </div>
  );
}
