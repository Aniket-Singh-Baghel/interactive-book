import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Wifi,
  Server,
  Globe,
  Home,
  Smartphone,
  Bluetooth,
  Database,
  Cloud,
  ArrowRight,
  Zap,
} from "lucide-react";

/*
  InteractiveNetworksLesson
  - Single-file React component (no TypeScript)
  - Tailwind CSS for styling (light, positive theme)
  - Framer-motion for animations
  - lucide-react for icons

  Usage:
  - Place this file in a React app that uses Tailwind.
  - Ensure dependencies: framer-motion, lucide-react
  - Example: npm install framer-motion lucide-react
*/

export default function InteractiveNetworksLesson() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-50 via-white to-sky-50 text-slate-900 p-6">
      <div className="max-w-6xl mx-auto">
        <Header />
        <main className="mt-8 space-y-10">
          <NetworkOverview />
          <NetworkTypes />
          <RealWorldExamples />
          <DataFlowSimulation />
          <ComparisonChart />
          <AnalogyZone />
          <QuizSection />
          <Footer />
        </main>
      </div>
    </div>
  );
}

/* -------------------- Header -------------------- */
function Header() {
  return (
    <header className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
      <div>
        <motion.h1
          initial={{ y: -10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="text-3xl md:text-4xl font-extrabold leading-tight"
        >
          How the World Connects — <span className="text-sky-600">Computer Networks</span>
        </motion.h1>
        <p className="mt-2 text-slate-600">A friendly, visual dive into LAN, WAN, PAN and how data flows.</p>
      </div>
      <div className="flex items-center gap-4">
        <Badge icon={<Wifi size={18} />} label="Hands-on" />
        <Badge icon={<Globe size={18} />} label="Real examples" />
        <Badge icon={<Zap size={18} />} label="Animated" />
      </div>
    </header>
  );
}

function Badge({ icon, label }) {
  return (
    <div className="inline-flex items-center gap-2 rounded-full bg-white/80 px-3 py-1 text-sm shadow-sm">
      <div className="text-sky-500">{icon}</div>
      <span className="text-slate-700">{label}</span>
    </div>
  );
}

/* -------------------- Network Overview -------------------- */
function NetworkOverview() {
  return (
    <section className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-sm">
      <div className="md:flex md:items-center md:justify-between">
        <div>
          <motion.h2
            initial={{ x: -10, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.4 }}
            className="text-2xl font-semibold"
          >
            What is a Network?
          </motion.h2>
          <p className="mt-2 text-slate-600 max-w-2xl">
            A network connects devices so they can exchange data — like houses in a town connected by
            roads. Networks range from tiny (your smartwatch talking to your phone) to global (the
            Internet connecting the world).
          </p>
        </div>
        <div className="mt-4 md:mt-0">
          <MiniNetworkIllustration />
        </div>
      </div>
    </section>
  );
}

function MiniNetworkIllustration() {
  return (
    <div className="w-72 h-44 bg-gradient-to-br from-sky-100 to-white rounded-xl p-3 shadow-inner">
      <svg viewBox="0 0 300 160" className="w-full h-full">
        {/* simple nodes and links */}
        <g>
          <circle cx="50" cy="80" r="14" fill="#fff" stroke="#7dd3fc" strokeWidth="3" />
          <text x="50" y="86" fontSize="8" textAnchor="middle" fill="#0369a1">PC</text>

          <circle cx="130" cy="40" r="14" fill="#fff" stroke="#a5f3fc" strokeWidth="3" />
          <text x="130" y="46" fontSize="8" textAnchor="middle" fill="#0369a1">Phone</text>

          <circle cx="210" cy="80" r="18" fill="#fff" stroke="#38bdf8" strokeWidth="3" />
          <text x="210" y="86" fontSize="8" textAnchor="middle" fill="#0369a1">Router</text>

          <path d="M64,80 L116,46" stroke="#bae6fd" strokeWidth="3" strokeLinecap="round" />
          <path d="M144,46 L192,80" stroke="#bae6fd" strokeWidth="3" strokeLinecap="round" />

          <motion.circle
            cx="110"
            cy="74"
            r="5"
            fill="#06b6d4"
            animate={{ cx: [70, 110, 150], cy: [78, 58, 78] }}
            transition={{ duration: 3, repeat: Infinity, repeatType: "loop" }}
          />
        </g>
      </svg>
    </div>
  );
}

/* -------------------- Network Types -------------------- */
function NetworkTypes() {
  const types = [
    {
      key: "PAN",
      title: "PAN — Personal Area Network",
      blurb: "Tiny, personal: Bluetooth headphones, smartwatch + phone.",
      icon: <Bluetooth size={28} />,
    },
    {
      key: "LAN",
      title: "LAN — Local Area Network",
      blurb: "Home, office, school lab: fast, limited area.",
      icon: <Home size={28} />,
    },
    {
      key: "WLAN",
      title: "WLAN — Wireless LAN",
      blurb: "Wi‑Fi networks that remove cables but keep LAN behavior.",
      icon: <Wifi size={28} />,
    },
    {
      key: "MAN",
      title: "MAN — Metropolitan Area Network",
      blurb: "A city or campus connecting many LANs.",
      icon: <Server size={28} />,
    },
    {
      key: "WAN",
      title: "WAN — Wide Area Network",
      blurb: "Broad, long-distance links — the backbone of the Internet.",
      icon: <Globe size={28} />,
    },
  ];

  return (
    <section className="grid md:grid-cols-3 gap-4">
      {types.map((t, i) => (
        <motion.article
          key={t.key}
          className="bg-white rounded-xl p-5 shadow-sm"
          initial={{ y: 8, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: i * 0.08 }}
        >
          <div className="flex items-center gap-4">
            <div className="rounded-lg bg-sky-50 p-3">{t.icon}</div>
            <div>
              <h3 className="font-semibold">{t.title}</h3>
              <p className="text-sm text-slate-600">{t.blurb}</p>
            </div>
          </div>
          <div className="mt-4 text-sm text-slate-700">
            <strong>Real-life:</strong>
            <p className="mt-1 text-slate-600">
              {t.key === "PAN" && "Bluetooth earbuds connect to a phone within a few meters."}
              {t.key === "LAN" && "School lab computers share files and a single printer."}
              {t.key === "WLAN" && "Home Wi‑Fi lets phones and laptops access the internet."}
              {t.key === "MAN" && "A university connects buildings via fiber optics."}
              {t.key === "WAN" && "ISPs link cities via long fiber and satellite links."}
            </p>
          </div>
        </motion.article>
      ))}
    </section>
  );
}

/* -------------------- Real World Examples -------------------- */
function RealWorldExamples() {
  const examples = [
    {
      title: "Home Wi‑Fi (LAN / WLAN)",
      desc: "Devices connect to a router which connects to ISP — easy local sharing.",
      icon: <Wifi size={20} />,
      color: "from-sky-50 to-white",
    },
    {
      title: "School Lab (LAN)",
      desc: "Computers and a shared printer inside a classroom or building.",
      icon: <Server size={20} />,
      color: "from-emerald-50 to-white",
    },
    {
      title: "City Network (MAN)",
      desc: "Multiple campuses are connected with high-speed city links.",
      icon: <Globe size={20} />,
      color: "from-rose-50 to-white",
    },
    {
      title: "Global Internet (WAN)",
      desc: "A global mesh connecting countries via undersea cables and satellites.",
      icon: <Cloud size={20} />,
      color: "from-indigo-50 to-white",
    },
  ];

  return (
    <section className="bg-white/80 rounded-2xl p-6 shadow-sm">
      <h3 className="text-xl font-semibold">Real-world examples</h3>
      <p className="mt-2 text-slate-600">Explore common networks you meet every day.</p>
      <div className="mt-4 grid md:grid-cols-2 gap-4">
        {examples.map((ex, i) => (
          <motion.div
            key={ex.title}
            className={`rounded-xl p-4 shadow-md bg-gradient-to-br ${ex.color}`}
            initial={{ scale: 0.98, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: i * 0.06 }}
          >
            <div className="flex items-start gap-3">
              <div className="p-2 rounded-lg bg-white/80">{ex.icon}</div>
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

/* -------------------- Data Flow Simulation -------------------- */
function DataFlowSimulation() {
  const [packets, setPackets] = useState([]);
  const nextId = useRef(1);

  useEffect(() => {
    const iv = setInterval(() => {
      // spawn a packet occasionally
      setPackets((p) => [...p.slice(-6), { id: nextId.current++, from: Math.random() > 0.5 ? "LAN" : "WAN" }]);
    }, 1200);
    return () => clearInterval(iv);
  }, []);

  return (
    <section className="rounded-2xl p-6 bg-white/80 shadow-sm">
      <h3 className="text-xl font-semibold">Data Flow Simulation</h3>
      <p className="mt-1 text-sm text-slate-600">Watch packets (dots) travel through a small network and beyond.</p>

      <div className="mt-4 grid md:grid-cols-2 gap-6 items-center">
        <div className="rounded-lg p-4 bg-gradient-to-br from-sky-50 to-white shadow-inner">
          <NetworkCanvas packets={packets} />
        </div>

        <div>
          <ul className="space-y-2 text-sm text-slate-700">
            <li>
              <strong>LAN:</strong> Fast, local switching — packets move quickly between nearby devices.
            </li>
            <li>
              <strong>Router:</strong> Decides where packets go next — like a traffic interchange.
            </li>
            <li>
              <strong>WAN:</strong> Longer trips across backbone links; travel time and paths vary.
            </li>
            <li className="mt-2 text-slate-600">Tip: Hover device nodes to highlight packet routes in the canvas.</li>
          </ul>
        </div>
      </div>
    </section>
  );
}

function NetworkCanvas({ packets }) {
  const width = 420;
  const height = 220;

  return (
    <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-56" preserveAspectRatio="xMidYMid meet">
      {/* LAN cluster */}
      <g>
        <rect x="12" y="30" width="150" height="130" rx="12" fill="#ffffff" stroke="#bfdbfe" strokeWidth="1.5" />
        <text x="86" y="48" fontSize="12" textAnchor="middle" fill="#0369a1">LAN</text>

        <circle cx="50" cy="80" r="10" fill="#fff" stroke="#60a5fa" />
        <text x="50" y="86" fontSize="8" textAnchor="middle" fill="#0369a1">PC</text>

        <circle cx="120" cy="120" r="10" fill="#fff" stroke="#60a5fa" />
        <text x="120" y="126" fontSize="8" textAnchor="middle" fill="#0369a1">Phone</text>

        <circle cx="180" cy="95" r="12" fill="#fff" stroke="#38bdf8" />
        <text x="180" y="101" fontSize="8" textAnchor="middle" fill="#0369a1">Router</text>
      </g>

      {/* WAN cloud */}
      <g>
        <ellipse cx="340" cy="90" rx="60" ry="36" fill="#fff" stroke="#c7d2fe" />
        <text x="340" y="94" fontSize="12" textAnchor="middle" fill="#4338ca">WAN / Internet</text>
      </g>

      {/* paths */}
      <path d="M192,95 C220,95 260,95 280,95 C300,95 320,90 330,92" stroke="#bae6fd" strokeWidth="3" fill="none" strokeLinecap="round" />

      {/* packets as moving dots along path */}
      {packets.map((pkt, i) => {
        // compute position based on id for pseudo animation
        const t = ((pkt.id % 100) / 100) * 1.0; // normalized 0..1
        // simple mapping along path (piecewise)
        const x = 190 + Math.min(140 * (i / Math.max(1, packets.length)), 140) + (Math.sin(pkt.id * 0.7) + 1) * 6;
        const y = 95 + Math.sin((pkt.id + i) * 0.6) * 10;
        return (
          <motion.circle
            key={pkt.id}
            cx={x}
            cy={y}
            r={5}
            initial={{ opacity: 0.2 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.2 }}
            className={`fill-sky-400`}
          />
        );
      })}

      {/* small legend */}
      <g>
        <rect x="12" y="168" width="120" height="28" rx="8" fill="#ffffff" stroke="#e6eefc" />
        <text x="20" y="186" fontSize="10" fill="#0f172a">Packets = messages/data</text>
      </g>
    </svg>
  );
}

/* -------------------- Comparison Chart -------------------- */
function ComparisonChart() {
  const rows = [
    { type: "PAN", area: "~1–10 m", example: "Bluetooth devices", speed: "Low", tech: "Bluetooth, NFC" },
    { type: "LAN", area: "Home/Office", example: "Wi‑Fi, Ethernet", speed: "High", tech: "Ethernet, Wi‑Fi" },
    { type: "MAN", area: "City/Campus", example: "City Wi‑Fi", speed: "Medium", tech: "Fiber, Microwave" },
    { type: "WAN", area: "Global", example: "Internet", speed: "Variable", tech: "Fiber, Satellite" },
  ];

  return (
    <section className="bg-white/80 rounded-2xl p-6 shadow-sm">
      <h3 className="text-xl font-semibold">Quick Comparison</h3>
      <div className="mt-4 overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="text-slate-600">
              <th className="p-2">Network</th>
              <th className="p-2">Coverage</th>
              <th className="p-2">Example</th>
              <th className="p-2">Speed</th>
              <th className="p-2">Common Tech</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r, i) => (
              <tr key={r.type} className={i % 2 === 0 ? "bg-white" : "bg-slate-50"}>
                <td className="p-2 font-medium">{r.type}</td>
                <td className="p-2 text-slate-600">{r.area}</td>
                <td className="p-2 text-slate-600">{r.example}</td>
                <td className="p-2 text-slate-600">{r.speed}</td>
                <td className="p-2 text-slate-600">{r.tech}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

/* -------------------- Analogy Zone -------------------- */
function AnalogyZone() {
  const analogies = [
    {
      title: "Roads & Highways",
      text: "Packets are cars and networks are roads. LANs = neighborhood streets; WANs = highways.",
    },
    {
      title: "Postal Service",
      text: "Each packet has an address (IP). Routers are like post offices — they forward to the right next hop.",
    },
    {
      title: "Phone Calls vs Letters",
      text: "Streaming is like a phone call (continuous), while emails are like letters (stored and forwarded).",
    },
  ];

  return (
    <section className="rounded-2xl p-6 bg-white/80 shadow-sm">
      <h3 className="text-xl font-semibold">Analogy Zone</h3>
      <div className="mt-4 grid md:grid-cols-3 gap-4">
        {analogies.map((a, i) => (
          <motion.div
            key={i}
            className="p-4 rounded-lg bg-slate-50"
            whileHover={{ translateY: -6 }}
            transition={{ type: "spring", stiffness: 120 }}
          >
            <h4 className="font-medium">{a.title}</h4>
            <p className="mt-2 text-sm text-slate-600">{a.text}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

/* -------------------- Quiz Section -------------------- */
function QuizSection() {
  const q = {
    question: "Which network fits this scenario: A set of computers in a classroom connected to a single switch and printer?",
    options: ["PAN", "LAN", "MAN", "WAN"],
    answer: "LAN",
  };

  const [sel, setSel] = useState(null);
  const [result, setResult] = useState(null);

  function submit() {
    if (!sel) return;
    setResult(sel === q.answer ? "correct" : "wrong");
  }

  function reset() {
    setSel(null);
    setResult(null);
  }

  return (
    <section className="rounded-2xl p-6 bg-white/80 shadow-sm">
      <h3 className="text-xl font-semibold">Quick Quiz</h3>
      <p className="mt-2 text-slate-600">Test your understanding with a short question.</p>

      <div className="mt-4 grid md:grid-cols-2 gap-4">
        <div>
          <p className="font-medium">{q.question}</p>
          <div className="mt-3 space-y-2">
            {q.options.map((o) => (
              <button
                key={o}
                onClick={() => setSel(o)}
                className={`w-full text-left rounded-lg px-4 py-2 border ${
                  sel === o ? "border-sky-500 bg-sky-50" : "border-transparent bg-white"
                }`}
              >
                {o}
              </button>
            ))}
          </div>

          <div className="mt-4 flex gap-2">
            <button onClick={submit} className="px-4 py-2 bg-sky-600 text-white rounded-lg">
              Submit
            </button>
            <button onClick={reset} className="px-4 py-2 bg-white border rounded-lg">
              Reset
            </button>
          </div>
        </div>

        <div>
          <ResultPanel result={result} correct={q.answer} selected={sel} />
        </div>
      </div>
    </section>
  );
}

function ResultPanel({ result, correct, selected }) {
  if (!result) {
    return (
      <div className="rounded-lg p-4 bg-slate-50">
        <p className="text-slate-600">Make a selection and submit to see the result.</p>
      </div>
    );
  }

  return (
    <div className={`rounded-lg p-4 ${result === "correct" ? "bg-emerald-50" : "bg-rose-50"}`}>
      {result === "correct" ? (
        <div>
          <h4 className="font-semibold text-emerald-700">Nice! That's correct 🎉</h4>
          <p className="text-sm text-emerald-700 mt-2">LANs are local networks inside homes, offices and classrooms.</p>
        </div>
      ) : (
        <div>
          <h4 className="font-semibold text-rose-700">Almost — not quite</h4>
          <p className="text-sm text-rose-700 mt-2">You chose <strong>{selected}</strong>. The correct answer is <strong>{correct}</strong>.</p>
        </div>
      )}
    </div>
  );
}

/* -------------------- Footer -------------------- */
function Footer() {
  return (
    <footer className="mt-6 text-sm text-slate-600">
      <div className="flex items-center justify-between">
        <div>Made with ❤️ — explain networks with friendly visuals.</div>
        <div className="text-slate-500">Tip: Add more scenarios or split into small slides for lessons.</div>
      </div>
    </footer>
  );
}
