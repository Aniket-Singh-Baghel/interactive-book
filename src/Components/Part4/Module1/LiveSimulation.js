// NetworkSimulation.jsx
// Complete interactive Wired / Wi‑Fi / Satellite simulation component
// - Responsive (percentage layout + viewBox)
// - Modes: wired | wifi | satellite
// - Hindi + English support
// - Explanation bubbles (click nodes) + tooltips
// - Play / Pause / Speed control

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
} from "react-icons/fa";

// Node positions are specified as percentages so the layout scales responsively.
const BASE_NODES = {
  wired: [
    { id: "pc", icon: <FaUser />, label: { en: "PC", hi: "पीसी" }, x: 8, y: 70 },
    { id: "switch", icon: <FaPlug />, label: { en: "Switch", hi: "स्विच" }, x: 35, y: 70 },
    { id: "server", icon: <FaServer />, label: { en: "Server", hi: "सर्वर" }, x: 92, y: 70 },
  ],
  wifi: [
    { id: "phone", icon: <FaUser />, label: { en: "Device", hi: "डिवाइस" }, x: 12, y: 72 },
    { id: "router", icon: <FaWifi />, label: { en: "Wi‑Fi Router", hi: "वाई‑फाई राउटर" }, x: 46, y: 42 },
    { id: "server", icon: <FaServer />, label: { en: "Server", hi: "सर्वर" }, x: 88, y: 20 },
  ],
  satellite: [
    { id: "device", icon: <FaUser />, label: { en: "Device", hi: "डिवाइस" }, x: 12, y: 78 },
    { id: "satellite", icon: <FaSatelliteDish />, label: { en: "Satellite", hi: "सैटेलाइट" }, x: 50, y: 8 },
    { id: "ground", icon: <FaBroadcastTower />, label: { en: "Ground Station", hi: "ग्राउंड स्टेशन" }, x: 78, y: 48 },
    { id: "server", icon: <FaServer />, label: { en: "Server", hi: "सर्वर" }, x: 92, y: 86 },
  ],
};

// Helpful small components
const IconBubble = ({ children }) => (
  <div className="inline-flex items-center gap-2 bg-black/40 text-white/90 rounded-full px-3 py-1 text-xs font-medium shadow">{children}</div>
);

const Packet = ({ path, duration = 1.4, delay = 0, color = "#A7F3D0", size = 8, speed = 1 }) => {
  // Using CSS offset-path for smooth motion along an SVG path. Modern browsers support this.
  const style = {
    width: size,
    height: size,
    borderRadius: "50%",
    backgroundColor: color,
    offsetPath: `path(\"${path}\")`,
    translate: "-50% -50%",
  };

  return (
    <motion.div
      className="absolute z-30"
      style={style}
      initial={{ offsetDistance: "0%", opacity: 0 }}
      animate={{ offsetDistance: "100%", opacity: [0, 1, 1, 0] }}
      transition={{ duration: duration / speed, delay, ease: "linear" }}
      aria-hidden
    />
  );
};

const AnimatedPath = ({ d, color = "#60A5FA", dash = "4 4", duration = 1.5, delay = 0, animateIn = true }) => (
  <motion.path
    d={d}
    fill="none"
    stroke={color}
    strokeWidth={1.5}
    strokeDasharray={dash}
    initial={animateIn ? { pathLength: 0, opacity: 0 } : { opacity: 0 }}
    animate={animateIn ? { pathLength: 1, opacity: 1 } : { opacity: 1 }}
    transition={{ duration, delay, ease: "linear" }}
  />
);

export default function NetworkSimulation({ initialLang = "en" }) {
  const [mode, setMode] = useState("wired"); // wired | wifi | satellite
  const [isPlaying, setIsPlaying] = useState(false);
  const [lang, setLang] = useState(initialLang);
  const [speed, setSpeed] = useState(1);
  const [activeNode, setActiveNode] = useState(null);
  const svgRef = useRef(null);

  const nodes = useMemo(() => BASE_NODES[mode], [mode]);

  // Build helper to get node by id
  const getNode = id => nodes.find(n => n.id === id) || { x: 50, y: 50 };

  // Build paths depending on mode
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
      // Use subtle curves for wireless feel
      return [
        { id: "dev-rt", d: `M ${dev.x} ${dev.y} C ${dev.x + 15} ${dev.y - 25}, ${rt.x - 10} ${rt.y + 10}, ${rt.x} ${rt.y}` },
        { id: "rt-srv", d: `M ${rt.x} ${rt.y} C ${rt.x + 20} ${rt.y - 10}, ${srv.x - 20} ${srv.y + 20}, ${srv.x} ${srv.y}` },
      ];
    }

    // satellite
    const device = getNode("device");
    const sat = getNode("satellite");
    const ground = getNode("ground");
    const server = getNode("server");
    // big arc up to satellite then down
    return [
      { id: "device-sat", d: `M ${device.x} ${device.y} C ${device.x + 20} ${device.y - 60}, ${sat.x - 20} ${sat.y + 30}, ${sat.x} ${sat.y}` },
      { id: "sat-ground", d: `M ${sat.x} ${sat.y} C ${sat.x + 18} ${sat.y + 30}, ${ground.x - 8} ${ground.y - 10}, ${ground.x} ${ground.y}` },
      { id: "ground-server", d: `M ${ground.x} ${ground.y} L ${server.x} ${server.y}` },
    ];
  }, [mode, nodes]);

  // Controls
  const togglePlay = () => setIsPlaying(p => !p);
  const startSimulation = () => { setIsPlaying(true); setActiveNode(null); };
  const stopSimulation = () => { setIsPlaying(false); };

  // Render label in selected language
  const L = (textObj) => (textObj ? (lang === "hi" ? textObj.hi : textObj.en) : "");

  return (
    <div className="w-full max-w-6xl mx-auto p-4">
      <div className="flex flex-col md:flex-row gap-4">
        {/* Left: Simulation Card */}
        <div className="flex-1 bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl p-4 shadow-xl min-h-[360px]">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-3">
              <h3 className="text-white text-lg font-semibold tracking-tight">Network Simulation</h3>
              <IconBubble>
                <FaGlobe />
                <span className="ml-1 text-xs">{mode.toUpperCase()}</span>
              </IconBubble>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setMode("wired")}
                className={`px-3 py-1 rounded-md text-sm font-medium ${mode === "wired" ? "bg-white/10 text-white" : "text-slate-300 hover:bg-white/5"}`}
              >
                Wired
              </button>
              <button
                onClick={() => setMode("wifi")}
                className={`px-3 py-1 rounded-md text-sm font-medium ${mode === "wifi" ? "bg-white/10 text-white" : "text-slate-300 hover:bg-white/5"}`}
              >
                Wi‑Fi
              </button>
              <button
                onClick={() => setMode("satellite")}
                className={`px-3 py-1 rounded-md text-sm font-medium ${mode === "satellite" ? "bg-white/10 text-white" : "text-slate-300 hover:bg-white/5"}`}
              >
                Satellite
              </button>

              <button
                onClick={() => setLang(l => (l === "en" ? "hi" : "en"))}
                className="ml-2 p-2 rounded-md bg-white/6 hover:bg-white/10 text-slate-100"
                aria-label="Toggle language"
              >
                <FaLanguage />
              </button>
            </div>
          </div>

          <div className="relative w-full rounded-lg bg-gradient-to-b from-transparent to-white/2 border border-white/5 overflow-hidden" style={{ minHeight: 260 }}>
            {/* responsive svg - viewBox 0 0 100 100, nodes positioned in % */}
            <svg ref={svgRef} viewBox="0 0 100 100" preserveAspectRatio="xMidYMid meet" className="w-full h-[320px] md:h-[420px]">
              {/* Soft background grid/sky for clarity */}
              <defs>
                <linearGradient id="bg" x1="0" x2="0" y1="0" y2="1">
                  <stop offset="0%" stopColor="#0f172a" stopOpacity="0.6" />
                  <stop offset="100%" stopColor="#0b1220" stopOpacity="0.9" />
                </linearGradient>
              </defs>
              <rect x="0" y="0" width="100" height="100" fill="url(#bg)" />

              {/* static helper connecting lines (subtle) */}
              {paths.map((p, idx) => (
                <line key={`guide-${p.id}`} x1={0} y1={0} x2={0} y2={0} style={{ display: "none" }} />
              ))}

              <g>
                {/* Animated Paths when playing */}
                <AnimatePresence>
                  {isPlaying && paths.map((p, i) => (
                    <AnimatedPath key={p.id} d={p.d} color={mode === "wired" ? "#FDE68A" : "#60A5FA"} duration={1.6} delay={i * 1.5} />
                  ))}
                </AnimatePresence>
              </g>

            </svg>

            {/* Overlay for nodes and packets (absolute positioned in percentages) */}
            <div className="absolute inset-0">
              {/* Nodes */}
              {nodes.map(node => (
                <div
                  key={node.id}
                  className="absolute flex flex-col items-center text-center transform -translate-x-1/2 -translate-y-1/2 z-20"
                  style={{ left: `${node.x}%`, top: `${node.y}%` }}
                >
                  <button
                    onClick={() => setActiveNode(node.id === activeNode ? null : node.id)}
                    className={`flex flex-col items-center gap-1 focus:outline-none`}
                    aria-label={L(node.label)}
                  >
                    <div className={`p-2 rounded-full text-white/95 drop-shadow-lg ${activeNode === node.id ? "bg-white/8 scale-110" : "bg-gradient-to-br from-slate-700 to-slate-800"}`}>
                      <span className="text-xl md:text-2xl">{node.icon}</span>
                    </div>
                    <div className="text-[10px] md:text-xs text-slate-200 mt-1 font-medium">{L(node.label)}</div>
                  </button>

                  {/* Explanation bubble */}
                  <AnimatePresence>
                    {activeNode === node.id && (
                      <motion.div
                        initial={{ opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 6 }}
                        className="mt-2 w-44 md:w-56 bg-white/6 backdrop-blur-sm text-white border border-white/10 rounded-lg p-3 text-xs md:text-sm shadow-lg"
                      >
                        <div className="font-semibold">{L(node.label)}</div>
                        <div className="mt-1 text-xs text-slate-200">
                          {mode === "wired" && (
                            <>
                              {L({ en: "Connected via cable. Fast & stable.", hi: "केबल से जुड़ा। तेज़ और स्थिर।" })}
                            </>
                          )}
                          {mode === "wifi" && (
                            <>
                              {L({ en: "Sends wireless signals to the router.", hi: "राउटर को वायरलेस सिग्नल भेजता है।" })}
                            </>
                          )}
                          {mode === "satellite" && (
                            <>
                              {L({ en: "Communicates via satellite link (long distance).", hi: "सैटेलाइट लिंक के जरिए संचार (लंबी दूरी)।" })}
                            </>
                          )}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}

              {/* Packets (animated dots) - we will spawn a few waves while playing */}
              <AnimatePresence>
                {isPlaying && paths.map((p, i) => (
                  // each path will produce 2 packets for request/response visual
                  <React.Fragment key={`packets-${p.id}`}>
                    <Packet path={p.d} duration={1.4} delay={i * 1.3} color={mode === "wired" ? "#FDE68A" : "#A7F3D0"} speed={speed} size={6} />
                    <Packet path={p.d} duration={1.4} delay={i * 1.3 + 0.6} color={mode === "wired" ? "#FCD34D" : "#BFDBFE"} speed={speed} size={6} />
                  </React.Fragment>
                ))}
              </AnimatePresence>

            </div>
          </div>

          {/* Controls */}
          <div className="mt-3 flex items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <button
                onClick={togglePlay}
                className="flex items-center gap-2 px-3 py-2 rounded-lg bg-indigo-600/90 hover:bg-indigo-700 text-white font-semibold"
              >
                {isPlaying ? <FaPause /> : <FaPlay />}
                <span className="ml-1">{isPlaying ? (lang === "hi" ? "रोकें" : "Pause") : (lang === "hi" ? "चलाएँ" : "Play")}</span>
              </button>

              <button onClick={() => { setIsPlaying(false); setTimeout(() => setIsPlaying(true), 80); }} className="px-3 py-2 rounded-md bg-white/6 text-white">
                {lang === "hi" ? "रीस्टार्ट" : "Restart"}
              </button>

              <div className="flex items-center gap-2 ml-2 text-sm text-slate-200">
                <div className="text-xs">{lang === "hi" ? "गति" : "Speed"}</div>
                <input type="range" min="0.5" max="2" step="0.1" value={speed} onChange={(e) => setSpeed(Number(e.target.value))} className="w-28" />
                <div className="w-8 text-right">{speed}x</div>
              </div>
            </div>

            <div className="text-xs text-slate-300">{lang === "hi" ? "क्लिक करें किसी भी आइकन पर स्पष्टीकरण के लिए" : "Click any icon to see explanation"}</div>
          </div>
        </div>

        {/* Right: Teaching Panel / Notes */}
        <aside className="w-full md:w-80 shrink-0 bg-slate-800 rounded-2xl p-4 shadow-inner">
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
