import React, { useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  Shield,
  Terminal,
  Lock,
  Bug,
  Globe,
  Sparkles,
  CircuitBoard,
  Mail,
  CreditCard,
  UserCheck,
  Users,
  AlertTriangle,
  UserX,
  XCircle,
  Rocket
} from "lucide-react";
import { FaArrowRight, FaArrowLeft, FaHome } from "react-icons/fa";
import { useNavigate, Link } from "react-router-dom";

// ==== UI REPLACEMENTS (shadcn-free) ====

// Button
export function Button({ children, className = "", ...props }) {
  return (
    <button
      className={`px-4 py-2 rounded-md font-medium transition ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}

// Card
export function Card({ children, className = "" }) {
  return (
    <div className={`rounded-xl border border-white/10 bg-slate-900/60 ${className}`}>
      {children}
    </div>
  );
}
export function CardHeader({ children, className = "" }) {
  return <div className={`mb-2 ${className}`}>{children}</div>;
}
export function CardTitle({ children, className = "" }) {
  return <h3 className={`font-semibold text-white ${className}`}>{children}</h3>;
}
export function CardContent({ children, className = "" }) {
  return <div className={className}>{children}</div>;
}

// Tabs
export function Tabs({ value, onValueChange, children }) {
  return <div>{React.Children.map(children, (child) => React.cloneElement(child, { tabValue: value, setTab: onValueChange }))}</div>;
}
export function TabsList({ children, className = "" }) {
  return <div className={`inline-flex rounded-lg overflow-hidden ${className}`}>{children}</div>;
}
export function TabsTrigger({ value, tabValue, setTab, children }) {
  const active = value === tabValue;
  return (
    <button
      onClick={() => setTab(value)}
      className={`px-4 py-2 text-sm transition ${active ? "bg-cyan-600 text-white" : "bg-transparent text-slate-300 hover:text-white"}`}
    >
      {children}
    </button>
  );
}
export function TabsContent({ value, tabValue, children }) {
  return value === tabValue ? <div className="mt-4">{children}</div> : null;
}

// Accordion
export function Accordion({ children }) {
  return <div>{children}</div>;
}
export function AccordionItem({ children }) {
  return <div className="border-b border-white/10">{children}</div>;
}
export function AccordionTrigger({ children, ...props }) {
  const [open, setOpen] = React.useState(false);
  return (
    <div>
      <button onClick={() => setOpen(!open)} className="w-full text-left py-2 font-medium text-slate-200">
        {children}
      </button>
      {open && props.children}
    </div>
  );
}
export function AccordionContent({ children }) {
  return <div className="pl-4 pb-2 text-slate-400 text-sm">{children}</div>;
}

// Badge
export function Badge({ children, className = "" }) {
  return (
    <span className={`inline-flex items-center px-2 py-0.5 text-xs rounded-md ${className}`}>
      {children}
    </span>
  );
}

// Progress
export function Progress({ value, className = "" }) {
  return (
    <div className={`w-full bg-slate-700 rounded-full overflow-hidden ${className}`}>
      <div className="h-full bg-emerald-400 transition-all" style={{ width: `${value}%` }} />
    </div>
  );
}


/* ======================
   CyberLab (React, JS)
   Converted from your original component
   ====================== */

// Utility: gradient text
function GradientText({ children, className = "" }) {
  return (
    <span className={`bg-gradient-to-r from-cyan-300 via-fuchsia-300 to-emerald-300 bg-clip-text text-transparent drop-shadow ${className}`}>
      {children}
    </span>
  );
}

// Glow ring
function GlowRing({ className = "" }) {
  return (
    <div className={`pointer-events-none absolute -inset-0.5 rounded-3xl blur-xl opacity-30 bg-gradient-to-r from-cyan-400/70 via-fuchsia-400/70 to-emerald-400/70 ${className}`} />
  );
}

// Animated background (grid + particles)
function CyberBackground() {
  const nodes = useMemo(() => Array.from({ length: 48 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    r: 1 + Math.random() * 2,
    d: 0.4 + Math.random() * 1.2,
  })), []);

  return (
    <div className="absolute inset-0 overflow-hidden">
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(transparent 0 90%, rgba(0,255,255,.09) 90% 100%), linear-gradient(90deg, transparent 0 90%, rgba(255,0,255,.08) 90% 100%)",
          backgroundSize: "36px 36px, 36px 36px",
          maskImage: "radial-gradient(circle at 50% 30%, black 0%, black 50%, transparent 85%)",
          WebkitMaskImage: "radial-gradient(circle at 50% 30%, black 0%, black 50%, transparent 85%)",
          animation: "gridShift 18s linear infinite",
        }}
      />
      {nodes.map((n) => (
        <motion.span
          key={n.id}
          className="absolute rounded-full bg-cyan-300/40 shadow-[0_0_20px_2px_rgba(34,211,238,0.35)]"
          style={{ left: `${n.x}%`, top: `${n.y}%`, width: n.r * 2, height: n.r * 2 }}
          animate={{
            y: [0, -8, 6, 0],
            x: [0, 4, -6, 0],
            opacity: [0.25, 0.7, 0.4, 0.25],
          }}
          transition={{ duration: 6 + n.d, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}
      <style>{`
        @keyframes gridShift { from { background-position: 0px 0px, 0px 0px; } to { background-position: 360px 360px, 360px 0px; } }
      `}</style>
    </div>
  );
}

function ShieldVsVirus() {
  return (
    <div className="relative flex flex-col items-center justify-center h-full w-full bg-white/10 rounded-2xl shadow-lg p-8">
      {/* Shield */}
      <motion.div
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="text-green-400 mb-12"
      >
        <Shield className="w-28 h-28" />
      </motion.div>

      {/* Virus Moving Towards Shield */}
      <motion.div
        animate={{ y: [0, -150, 0] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        className="text-red-400"
      >
        <Bug className="w-20 h-20" />
      </motion.div>
    </div>
  );
}


// TiltCard wrapper (simple 3D tilt using mouse position -> transform)
function TiltCard({ children, className = "", ...rest }) {
  // We'll use CSS transforms on mouse move for tilt effect (no types)
  function handleMouse(e) {
    const el = e.currentTarget;
    const rect = el.getBoundingClientRect();
    const px = e.clientX - rect.left - rect.width / 2;
    const py = e.clientY - rect.top - rect.height / 2;
    const rx = Math.max(-12, Math.min(12, (py / (rect.height / 2)) * 12));
    const ry = Math.max(-12, Math.min(12, (px / (rect.width / 2)) * -12));
    el.style.transform = `perspective(900px) rotateX(${rx}deg) rotateY(${ry}deg) scale(1.01)`;
  }
  function handleLeave(e) {
    const el = e.currentTarget;
    el.style.transform = `perspective(900px) rotateX(0deg) rotateY(0deg) scale(1)`;
  }

  return (
    <motion.div
      onMouseMove={handleMouse}
      onMouseLeave={handleLeave}
      whileHover={{ scale: 1.01 }}
      transition={{ type: "spring", stiffness: 200, damping: 20 }}
      className={`relative rounded-2xl p-0.5 bg-gradient-to-br from-cyan-500/30 via-fuchsia-500/30 to-emerald-500/30 shadow-xl ${className}`}
      {...rest}
    >
      <GlowRing />
      <div className="relative rounded-2xl bg-slate-900/70 backdrop-blur-md border border-white/10">
        {children}
      </div>
    </motion.div>
  );
}

// Circuit divider SVG
function CircuitDivider() {
  return (
    <div className="relative h-6 w-full overflow-hidden">
      <motion.svg
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2 }}
        className="absolute inset-0"
        preserveAspectRatio="none"
        viewBox="0 0 100 10"
      >
        <defs>
          <linearGradient id="glow" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#22d3ee" stopOpacity="0.6" />
            <stop offset="50%" stopColor="#d946ef" stopOpacity="0.7" />
            <stop offset="100%" stopColor="#34d399" stopOpacity="0.6" />
          </linearGradient>
        </defs>
        <motion.path
          d="M0 5 H25 l4 -3 h10 l4 3 h10 l4 -3 h10 l4 3 H100"
          fill="none"
          stroke="url(#glow)"
          strokeWidth="0.7"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{
            duration: 2.4,
            ease: "easeInOut",
            repeat: Infinity,
            repeatType: "reverse",
          }}
        />
      </motion.svg>
    </div>
  );
}



// Pulse badge
// function PulseBadge({ label }) {
//   return (
//     <div className="relative inline-flex items-center gap-2">
//       <span className="absolute -left-2 inline-flex h-3 w-3">
//         <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
//         <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500" />
//       </span>
//       <Badge className="pl-4 bg-emerald-500/20 text-emerald-200 border border-emerald-400/30">{label}</Badge>
//     </div>
//   );
// }

// ======= THEORY TOPICS (split "Types of Cyber Crimes") =======
const THEORY_TOPICS = [
  // 1. Full-width Introduction
  {
    icon: <Shield className="h-5 w-5" />,
    title: "1. Introduction to Cyber Crime",
    fullWidth: true,
    points: [
      "Simple definition: Crimes that are done using computers, internet, or digital devices.",
      "Example analogy: Just like theft or fraud happens in real life, cyber crimes happen online.",
    ],
  },

  // 2. Master card for Types of Cyber Crime
  {
    icon: <Bug className="h-5 w-5" />,
    title: "2. Types of Cyber Crime",
    fullWidth: true,
    points: [
      "There are several types of cyber crimes that students should be aware of. Each type has its own method and impact.",
    ],
  },

  // 2a. Individual type cards
  // 2a. Individual type cards with relevant icons
  {
    icon: <Terminal className="h-5 w-5" />,
    title: "Hacking",
    points: [
      "Unauthorized access to someone’s computer or account.",
      "Example: Breaking into someone’s email.",
    ],
  },
  {
    icon: <Lock className="h-5 w-5" />,
    title: "Identity Theft",
    points: [
      "Stealing personal information (Aadhaar, PAN, credit card details).",
      "Example: Using someone’s bank details to withdraw money.",
    ],
  },
  {
    icon: <Mail className="h-5 w-5" />,
    title: "Phishing",
    points: [
      "Fake emails/messages that trick users to share passwords or OTPs.",
      "Example: 'Your bank account will be blocked, click here.'",
    ],
  },
  {
    icon: <CreditCard className="h-5 w-5" />,
    title: "Online Fraud / Scams",
    points: [
      "Online shopping fraud, lottery scams, job scams.",
    ],
  },
  {
    icon: <UserCheck className="h-5 w-5" />,
    title: "Cyber Bullying & Stalking",
    points: [
      "Harassing or threatening someone online.",
      "Continuously following, messaging, or spying online.",
    ],
  },
  {
    icon: <Users className="h-5 w-5" />,
    title: "Child Exploitation & Software Piracy",
    points: [
      "Harmful content or misuse of children through the internet.",
      "Copying or using software illegally.",
    ],
  },
  {
    icon: <AlertTriangle className="h-5 w-5" />,
    title: "Ransomware & Fake News",
    points: [
      "Spreading fake news or rumors on social media.",
      "Criminals locking data and demanding money.",
    ],
  },
  {
    icon: <CircuitBoard className="h-5 w-5" />,
    title: "DDoS Attack",
    points: [
      "Overwhelming a website or server with massive traffic to make it unavailable.",
      "Example: Flooding an online store with fake requests to crash it.",
    ],
  },


  // 3. Real-life Examples (full-width, separate)
  {
    icon: <Globe className="h-5 w-5" />,
    title: "3. Real-life Examples",
    fullWidth: true,
    points: [
      "Online exam paper leak cases.",
      "Bank OTP frauds.",
      "WhatsApp fraud messages.",
      "Famous ransomware attack WannaCry (2017).",
    ],
  },

  // 4. Impact of Cyber Crime (full-width, separate)
  {
    icon: <Lock className="h-5 w-5" />,
    title: "4. Impact of Cyber Crime",
    fullWidth: true,
    points: [
      "Financial loss (money stolen).",
      "Emotional/psychological harm (bullying, harassment).",
      "Loss of privacy (data leaks).",
      "Threat to national security (cyber attacks on government websites).",
    ],
  },
];

const showAlert = (msg) => {
  alert(msg);
};

// Your PRACTICAL LABS data

const PRACTICAL_LABS = [
  {
    id: "phishing",
    icon: <Mail className="h-6 w-6 text-blue-600" />,
    title: "Phishing Email Demo",
    steps: [
      "View a fake email that asks you to reset your bank password.",
      "Hover over the link — notice the suspicious URL.",
      "Compare with a real bank email that has a secure domain.",
      "Learn why clicking unknown links can lead to credential theft."
    ],
    guide:
      "In cybercrime, phishing runs like a mass-distribution scam. Attackers send out crafted emails that mimic trusted institutions, often embedding malicious links or attachments. These emails usually exploit urgency or fear to push victims into clicking quickly. Once clicked, the victim is redirected to a spoofed site where credentials or financial data are harvested. Advanced phishing operations even use lookalike domains, stolen brand logos, and spoofed email headers to bypass filters and increase credibility.",
    demo: (
      <div className="bg-white p-6 rounded-2xl shadow-lg space-y-4 text-lg">
        <h3 className="font-bold text-red-600 text-xl">🚨 Fake Bank Email</h3>
        <p>
          Dear User, your account has been <b>blocked</b>.
          Click below to reset your password immediately!
        </p>
        <a
          href="https://example.com"
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => showAlert("⚠️ This link is malicious!")}
          className="text-blue-700 underline hover:text-blue-900 font-semibold text-lg"
        >
          http://secure-bank-login.xyz/reset
        </a>
      </div>
    ),
  },
  {
    id: "malware",
    icon: <Bug className="h-6 w-6 text-yellow-500" />,
    title: "Malware Pop-Up Trap",
    steps: [
      "See a pop-up offering a 'Free Movie Download'.",
      "Notice how it asks to disable antivirus before installing.",
      "Compare with a legitimate installer that doesn’t do this.",
      "Understand how malware lures users with tempting offers."
    ],
    guide:
      "Malware distribution is often hidden behind lures like pirated software, fake installers, or system updates. Criminal operators spread these files on forums, torrent sites, or through malicious ads. Once installed, the malware may create a backdoor, log keystrokes, exfiltrate sensitive documents, or join the victim’s machine into a botnet. To increase infection rates, attackers frequently disguise malware as popular free content and force users to bypass legitimate protections like antivirus or browser warnings.",
    demo: (
      <div className="bg-gray-900 text-white p-6 rounded-2xl shadow-lg space-y-3 text-lg">
        <h3 className="font-bold text-yellow-400 text-xl">⚠️ Free Movie Download</h3>
        <p>Download blockbuster movies now – FREE!</p>
        <button
          onClick={() => showAlert("⚠️ You almost downloaded malware!")}
          className="bg-green-500 px-5 py-2 rounded-xl hover:bg-green-600 font-semibold text-lg"
        >
          Download
        </button>
        <p className="text-sm text-red-400 mt-2">* Disable antivirus to continue</p>
      </div>
    ),
  },
  {
    id: "identity",
    icon: <UserX className="h-6 w-6 text-purple-600" />,
    title: "Fake Profile Identity Theft",
    steps: [
      "Look at a fake social media account using stolen photos.",
      "Spot mismatched details like name vs. location.",
      "Compare with a verified genuine account.",
      "Understand how identity theft enables scams and fraud."
    ],
    guide:
      "Identity theft on social media is executed through fake accounts built with stolen or scraped personal photos and bios. Criminals use these impersonations to build trust with victims, run romance scams, or collect further personal data. Often, these profiles are part of large-scale social engineering campaigns, where attackers clone dozens of legitimate users to spread misinformation, solicit money transfers, or phish for sensitive information. Over time, these accounts make it difficult for victims to distinguish between genuine and fraudulent online identities.",

    demo: (
      <div className="bg-white p-6 rounded-2xl shadow-lg flex items-center gap-4 text-lg">
        <img
          src="https://randomuser.me/api/portraits/men/32.jpg"
          alt="profile"
          className="w-16 h-16 rounded-full border"
        />
        <div>
          <p className="font-bold text-xl">John Mark (Fake)</p>
          <p className="text-gray-600">Lives in Paris</p>
          <p className="text-gray-600">Works at Microsoft</p>
          <button
            onClick={() => showAlert("⚠️ This profile is fake!")}
            className="mt-3 bg-blue-600 text-white px-4 py-2 rounded-xl hover:bg-blue-700 font-semibold text-lg"
          >
            Follow
          </button>
        </div>
      </div>
    ),
  },
  {
    id: "fraud",
    icon: <CreditCard className="h-6 w-6 text-red-600" />,
    title: "Online Shopping Fraud",
    steps: [
      "Visit a fake e-commerce site with unreal discounts (90% off iPhone).",
      "Check the payment page — it lacks HTTPS lock symbol.",
      "Compare with a real shopping site checkout page.",
      "Learn how fraudsters capture credit card info."
    ],
    guide:
      "Online shopping fraud operations use cloned e-commerce websites that mirror real brands while advertising impossible discounts to bait buyers. These sites are set up quickly on cheap domains and often promoted through social media ads or spam messages. Once victims enter payment details, the data is captured and either sold on underground markets or used directly for card-not-present fraud. In many cases, the victim never receives any product, and the site may disappear overnight, only to reappear under a new name.",
    demo: (
      <div className="bg-white p-6 rounded-2xl shadow-lg text-lg">
        <h3 className="font-bold text-red-600 text-xl">🔥 iPhone 15 Pro – 90% OFF</h3>
        <p>Only $99! Limited Offer.</p>
        <input
          type="text"
          placeholder="Card Number"
          className="border p-3 w-full rounded-xl mt-3 text-lg"
        />
        <button
          onClick={() => showAlert("⚠️ Fraudulent payment attempt blocked!")}
          className="bg-red-500 text-white px-5 py-2 rounded-xl mt-3 hover:bg-red-600 font-semibold text-lg"
        >
          Pay Now
        </button>
        <p className="text-sm text-red-500 mt-2">⚠️ No HTTPS Secure Lock</p>
      </div>
    ),
  },
  {
  id: "ddos",
  icon: <Rocket className="h-6 w-6 text-pink-500" />,
  title: "DDoS Attack Simulation",
  steps: [
    "Understand how attackers flood a server with massive traffic to crash it.",
    "Observe a demo simulation of overwhelming requests on a target website.",
    "Learn why DDoS attacks disrupt services and how mitigation works.",
    "Compare with normal traffic to see the difference."
  ],
  guide:
    "Distributed Denial of Service (DDoS) attacks occur when multiple systems send excessive traffic to a target server or website, overwhelming its capacity and making it unavailable. These attacks are often executed via botnets. Learning to identify traffic patterns and use mitigation tools is crucial to prevent service downtime. Understanding DDoS helps in strengthening network security, analyzing traffic anomalies, and preparing incident response strategies.",
  demo: (
    <div className="bg-slate-800 text-white p-6 rounded-2xl shadow-lg space-y-4 text-lg">
      <h3 className="font-bold text-pink-400 text-xl">🚀 Simulated DDoS Attack</h3>
      <p>Click the button below to simulate a massive traffic attack on a test server.</p>
      <button
        onClick={() => showAlert("⚠️ DDoS attack simulation triggered!")}
        className="bg-pink-500 px-5 py-2 rounded-xl hover:bg-pink-600 font-semibold text-lg"
      >
        Simulate DDoS
      </button>
      <p className="text-sm text-gray-300 mt-2">* This is a safe demo environment for learning purposes.</p>
    </div>
  ),
},

];


// Modal component
const DemoModal = ({ open, onClose, title, children }) => {
  if (!open) return null;
  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
      <div className="bg-slate-900 text-white rounded-lg shadow-lg w-full max-w-lg p-5 relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-slate-400 hover:text-white"
        >
          <XCircle className="h-6 w-6" />
        </button>
        <h2 className="text-xl font-bold mb-3">{title}</h2>
        <div className="text-sm">{children}</div>
      </div>
    </div>
  );
};

// Main Practical Labs component

// Packet stream (animated dots)
// function PacketStream() {
//   return (
//     <div className="relative h-44 w-full overflow-hidden">
//       {[0, 1, 2, 3, 4, 5].map((row) => (
//         <div key={row} className="absolute left-0 right-0" style={{ top: `${row * 18 + 8}px` }}>
//           <motion.div
//             className="h-0.5 w-full bg-gradient-to-r from-transparent via-cyan-400/40 to-transparent"
//             initial={{ opacity: 0 }}
//             whileInView={{ opacity: 1 }}
//             viewport={{ once: true }}
//             transition={{ duration: 1 }}
//           />
//           <motion.span
//             className="absolute -top-1 h-3 w-3 rounded-full bg-fuchsia-300 shadow-[0_0_16px_2px_rgba(217,70,239,0.6)]"
//             initial={{ left: "-4%" }}
//             animate={{ left: ["-4%", "104%"] }}
//             transition={{ duration: 3 + row * 0.4, repeat: Infinity, ease: "linear", delay: row * 0.2 }}
//           />
//         </div>
//       ))}
//     </div>
//   );
// }

// Threat radar

function ThreatRadar() {
  return (
    <div className="relative aspect-square max-w-xs mx-auto">
      <svg viewBox="0 0 100 100" className="w-full h-full">
        <defs>
          <radialGradient id="radar" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#22d3ee" stopOpacity="0.25" />
            <stop offset="100%" stopColor="#0ea5e9" stopOpacity="0.05" />
          </radialGradient>
        </defs>
        <circle cx="50" cy="50" r="48" fill="url(#radar)" stroke="#22d3ee55" strokeWidth="0.5" />
        {[1, 2, 3].map((r) => (
          <circle key={r} cx="50" cy="50" r={r * 12} fill="none" stroke="#22d3ee33" strokeWidth="0.4" />
        ))}
      </svg>
      <motion.div className="absolute inset-0 origin-center" animate={{ rotate: 360 }} transition={{ duration: 6, repeat: Infinity, ease: "linear" }}>
        <div className="absolute left-1/2 top-1/2 h-1 w-[45%] bg-cyan-400/60" style={{ transformOrigin: "left" }} />
      </motion.div>
      <motion.span className="absolute left-[72%] top-[36%] h-2 w-2 rounded-full bg-rose-400 shadow-[0_0_12px_3px_rgba(244,63,94,0.7)]" animate={{ scale: [1, 1.4, 1] }} transition={{ repeat: Infinity, duration: 1.8 }} />
      <motion.span className="absolute left-[32%] top-[68%] h-2 w-2 rounded-full bg-yellow-300 shadow-[0_0_12px_3px_rgba(250,204,21,0.6)]" animate={{ scale: [1, 1.4, 1] }} transition={{ repeat: Infinity, duration: 2.2, delay: 0.5 }} />
    </div>
  );
}

// Radar icon small
function RadarIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="opacity-90">
      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5" className="text-cyan-300" />
      <path d="M12 12 L21 12" stroke="currentColor" strokeWidth="1.5" className="text-cyan-300" />
      <path d="M12 12 L17 5" stroke="currentColor" strokeWidth="1.5" className="text-cyan-300" />
      <circle cx="17" cy="5" r="1.2" fill="currentColor" className="text-fuchsia-300" />
    </svg>
  );
}

// Main component
export default function CyberLab() {
  const [tab, setTab] = useState("theory");
  const [openLab, setOpenLab] = useState(null);
  // const [progress, setProgress] = useState(42);

  // useEffect(() => {
  //   const t = setInterval(() => setProgress((p) => (p >= 96 ? 24 : p + 2)), 800);
  //   return () => clearInterval(t);
  // }, []);

  const navigate = useNavigate()

  const handlePrev = () => {
    if (tab === "theory") {
      navigate("/parts/prt5");
    } else if (tab === "practice") {
      setTab("theory");
    }
  };

  const handleNext = () => {
    if (tab === "theory") {
      setTab("practice");
    } else if (tab === "practice") {
      navigate("/parts/prt5");
    }
  };

  return (
    <div className="relative min-h-screen w-full bg-slate-950 text-slate-100">
      <CyberBackground />
      <div className="flex justify-center mb-1 pt-4">
        <Link
          to="/parts/prt5"
          className="inline-flex items-center px-5 py-2 rounded-full border border-cyan-400/50 
               text-cyan-300 font-semibold transition-all
               bg-cyan-500/10 hover:bg-cyan-500/20 
               hover:shadow-[0_0_20px_rgba(34,211,238,0.6)] backdrop-blur-md"
        >
          <FaHome className="mr-2 text-lg text-cyan-300" />
          Home
        </Link>
      </div>

      {/* HERO */}
      <section className="relative px-5 md:px-4 py-8 md:py-4">
        <div className="max-w-6xl mx-auto">
          <div className="relative">
            <GlowRing />
            <div className="relative rounded-3xl border border-white/10 overflow-hidden bg-slate-900/60 backdrop-blur-md shadow-2xl">
              <div className="grid md:grid-cols-2 gap-0">

                {/* Left Column */}
                <div className="p-8 md:p-12">
                  <div className="inline-flex items-center gap-2 text-xs tracking-widest uppercase text-cyan-300/90">
                    <Sparkles className="h-4 w-4" /> Real-time Interactive Cyber Module
                  </div>
                  <h1 className="mt-4 text-4xl md:text-6xl font-black leading-tight">
                    <GradientText> Understanding Cyber Crime</GradientText>
                    <span className="block text-slate-300 font-semibold text-xl md:text-lg mt-3">
                      🎯 Awareness 👀 → Action ⌨️ → Protection 🔒
                    </span>
                  </h1>
                  <p className="mt-6 text-slate-300/90 max-w-prose">
                    Cyber Crime refers to illegal activities carried out using computers,
                    the internet, or digital devices. From hacking to online fraud,
                    it affects individuals, organizations, and even nations.
                  </p>
                </div>

                {/* Right Column */}
                {/* Right Column */}
                <div className="relative min-h-[300px] md:min-h-[420px] w-full flex items-center justify-center pr-6 md:pr-12">
                  <div className="relative w-full h-full flex items-center justify-center">
                    <div className="absolute -inset-10 rounded-full blur-3xl bg-fuchsia-500/20" />

                    <div className="w-full max-w-[500px] mx-auto">
                      <ShieldVsVirus />
                    </div>
                  </div>
                </div>


              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="relative w-full">
        <CircuitDivider />
      </div>

      {/* CONTENT */}
      <section className="relative px-5 md:px-10 pb-20">
        <div className="max-w-6xl mx-auto">
          <Tabs value={tab} onValueChange={setTab}>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center justify-between mb-4">
                <div className="bg-white/10 border border-white/10 rounded-md p-1 flex">
                  <Button
                    onClick={() => setTab("theory")}
                    className={`ml-0 ${tab === "theory" ? "bg-cyan-600 text-white" : "bg-transparent hover:bg-cyan-500/30"}`}
                  >
                    Theory
                  </Button>
                  <Button
                    onClick={() => setTab("practice")}
                    className={`ml-2 ${tab === "practice" ? "bg-fuchsia-600 text-white" : "bg-transparent hover:bg-fuchsia-500/30"}`}
                  >
                    Practical
                  </Button>
                </div>
              </div>
              <div className="hidden md:flex items-center gap-2 text-xs text-slate-300/80">
                <CircuitBoard className="h-4 w-4" />
                <span>Cyber mode engaged</span>
              </div>
            </div>

            {/* THEORY */}
            <TabsContent value="theory">
              <div className="grid md:grid-cols-3 gap-6">
                {THEORY_TOPICS.map((t, i) => (
                  <motion.div
                    key={t.title}
                    initial={{ y: 20, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.05 }}
                    className={t.fullWidth ? "md:col-span-3" : ""}
                  >
                    <TiltCard>
                      <div className="p-4">
                        <CardHeader className="pb-3">
                          <CardTitle className="flex items-center gap-2">
                            <span className="text-cyan-200">{t.icon}</span>
                            <span>{t.title}</span>
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <Accordion type="single" collapsible>
                            {t.points.map((p, idx) => (
                              <AccordionItem key={idx} value={`p-${idx}`}>
                                <AccordionTrigger className="text-sm">{p}</AccordionTrigger>
                                <AccordionContent className="text-sm text-slate-300/80" />
                              </AccordionItem>
                            ))}
                          </Accordion>
                        </CardContent>
                      </div>
                    </TiltCard>
                  </motion.div>

                ))}

              </div>
            </TabsContent>

            {/* PRACTICAL */}
            <TabsContent value="practice">
              <div className="grid md:grid-cols-3 gap-6">
                {PRACTICAL_LABS.map((lab, i) => (
                  <motion.div
                    key={lab.title}
                    initial={{ y: 20, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.06 }}
                  >
                    <div className="bg-slate-800 border border-slate-700 rounded-xl shadow p-4">
                      <h3 className="flex items-center gap-2 text-lg text-cyan-300">
                        {lab.icon}
                        {lab.title}
                      </h3>
                      <ol className="list-decimal list-inside text-sm text-slate-300 mt-2 space-y-1">
                        {lab.steps.map((s, idx) => (
                          <li key={idx}>{s}</li>
                        ))}
                      </ol>
                      <div className="mt-4 flex gap-2">
                        <button
                          onClick={() => setOpenLab({ title: lab.title + " - Demo", content: lab.demo })}
                          className="px-3 py-1 bg-emerald-600 hover:bg-emerald-500 text-white text-sm rounded"
                        >
                          Start
                        </button>
                        <button
                          onClick={() =>
                            setOpenLab({
                              title: lab.title + " - Guide",
                              content: (
                                <div className="space-y-4">
                                  {/* Main Guide */}
                                  <p className="text-lg text-slate-100 leading-relaxed">
                                    {lab.guide}
                                  </p>
                                  <div className="relative w-full h-36 rounded-xl overflow-hidden">
                                    <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/20 via-fuchsia-400/20 to-yellow-400/20 animate-pulse rounded-xl"></div>
                                    <p className="absolute inset-0 flex items-center justify-center text-slate-300 font-bold text-lg">
                                      🔒 Stay Safe Online!
                                    </p>
                                  </div>
                                </div>
                              ),
                            })
                          }
                          className="px-4 py-2 border border-white/20 bg-white/10 hover:bg-white/20 text-sm rounded-md font-semibold"
                        >
                          View Guide
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}

                {/* Modal */}
                <DemoModal
                  open={!!openLab}
                  onClose={() => setOpenLab(null)}
                  title={openLab?.title}
                >
                  {openLab?.content}
                </DemoModal>
              </div>
              <motion.div initial={{ y: 20, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.18 }} className="md:col-span-3 mt-5">
                <TiltCard>
                  <div className="p-4">
                    <CardHeader className="pb-2">
                      <CardTitle className="flex items-center gap-2 text-cyan-200"><RadarIcon /> Threat Radar</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid md:grid-cols-2 gap-6 items-center">
                        <ThreatRadar />
                        <div className="text-sm text-slate-300/85 space-y-2">
                          <p>Live simulation of signal sweep spotting anomalies on the network plane. Use this to discuss detection vs prevention and mean-time-to-respond.</p>
                          <div className="flex flex-wrap gap-2">
                            {['Phishing', 'Ransomware', 'Misconfig', 'Insider', 'DDoS'].map(tag => (
                              <Badge key={tag} className="bg-white/10 border border-white/15">{tag}</Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </div>
                </TiltCard>
              </motion.div>
            </TabsContent>
          </Tabs>
        </div>
      </section >
      <div className="flex justify-between items-center -mt-6 p-4 bg-white/5 border border-white/10 rounded-xl backdrop-blur-md">
        <button
          onClick={handlePrev}
          className="flex items-center gap-2 px-4 py-2 rounded-lg border border-cyan-400/50 
               text-cyan-300 font-medium transition-all
               bg-cyan-500/10 hover:bg-cyan-500/20 
               hover:shadow-[0_0_15px_rgba(34,211,238,0.6)]"
        >
          <FaArrowLeft className="text-cyan-300" />
          Previous
        </button>

        <button
          onClick={handleNext}
          className="flex items-center gap-2 px-4 py-2 rounded-lg border border-fuchsia-400/50 
               text-fuchsia-300 font-medium transition-all
               bg-fuchsia-500/10 hover:bg-fuchsia-500/20 
               hover:shadow-[0_0_15px_rgba(217,70,239,0.6)]"
        >
          Next
          <FaArrowRight className="text-fuchsia-300" />
        </button>
      </div>
    </div >
  );
}
