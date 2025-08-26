import React, { useMemo, useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Shield,
  Cpu,
  Terminal,
  Network,
  Lock,
  Bug,
  Globe,
  BookOpen,
  Rocket,
  Sparkles,
  CircuitBoard,
  Mail,
  Download,
  CreditCard,
  UserCheck,
  Users,
  AlertTriangle
} from "lucide-react";



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
function PulseBadge({ label }) {
  return (
    <div className="relative inline-flex items-center gap-2">
      <span className="absolute -left-2 inline-flex h-3 w-3">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
        <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500" />
      </span>
      <Badge className="pl-4 bg-emerald-500/20 text-emerald-200 border border-emerald-400/30">{label}</Badge>
    </div>
  );
}

// Datasets
// ======================
// Beginner-Friendly Content
// ======================

// Theory Topics
// ======= THEORY TOPICS (split "Types of Cyber Crimes") =======
// ======= THEORY TOPICS HIERARCHY =======
// ======= THEORY TOPICS HIERARCHY =======
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




// Practical Labs
const PRACTICAL_LABS = [
  {
    icon: <Lock className="h-5 w-5" />,
    title: "Password Strength Check",
    steps: [
      "Try creating a weak password like 12345.",
      "Now create a strong one with letters, numbers, and symbols.",
      "Compare which is harder to guess.",
      "Understand why strong passwords protect better."
    ],
  },
  {
    icon: <Mail className="h-5 w-5" />, // you can import Mail from lucide-react
    title: "Phishing Email Demo",
    steps: [
      "Look at a sample fake email that asks for your password.",
      "Notice spelling mistakes or strange links.",
      "Compare with a real email from the same company.",
      "Learn to never click suspicious links."
    ],
  },
  {
    icon: <Globe className="h-5 w-5" />,
    title: "Social Media Privacy Settings",
    steps: [
      "Open your social media account.",
      "Check what personal info is public.",
      "Switch account to private mode.",
      "See how privacy reduces risk of misuse."
    ],
  },
  {
    icon: <Download className="h-5 w-5" />, // you can import Download from lucide-react
    title: "Safe Downloading",
    steps: [
      "Try searching for a popular app on unofficial sites.",
      "See how risky pop-ups/ads appear.",
      "Now download the same app from the official store.",
      "Understand why official sources are safer."
    ],
  },
];

// Packet stream (animated dots)
function PacketStream() {
  return (
    <div className="relative h-44 w-full overflow-hidden">
      {[0, 1, 2, 3, 4, 5].map((row) => (
        <div key={row} className="absolute left-0 right-0" style={{ top: `${row * 18 + 8}px` }}>
          <motion.div
            className="h-0.5 w-full bg-gradient-to-r from-transparent via-cyan-400/40 to-transparent"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
          />
          <motion.span
            className="absolute -top-1 h-3 w-3 rounded-full bg-fuchsia-300 shadow-[0_0_16px_2px_rgba(217,70,239,0.6)]"
            initial={{ left: "-4%" }}
            animate={{ left: ["-4%", "104%"] }}
            transition={{ duration: 3 + row * 0.4, repeat: Infinity, ease: "linear", delay: row * 0.2 }}
          />
        </div>
      ))}
    </div>
  );
}

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
  const [progress, setProgress] = useState(42);

  useEffect(() => {
    const t = setInterval(() => setProgress((p) => (p >= 96 ? 24 : p + 2)), 800);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="relative min-h-screen w-full bg-slate-950 text-slate-100">
      <CyberBackground />

      {/* HERO */}
      <section className="relative px-5 md:px-4 py-8 md:py-4">
        <div className="max-w-6xl mx-auto">
          <div className="relative">
            <GlowRing />
            <div className="relative rounded-3xl border border-white/10 overflow-hidden bg-slate-900/60 backdrop-blur-md shadow-2xl">
              <div className="grid md:grid-cols-2 gap-0">
                <div className="p-8 md:p-12">
                  <div className="inline-flex items-center gap-2 text-xs tracking-widest uppercase text-cyan-300/90">
                    <Sparkles className="h-4 w-4" /> Real-time Interactive Cyber Module
                  </div>
                  <h1 className="mt-4 text-4xl md:text-6xl font-black leading-tight">
                    <GradientText>Cyber Lab</GradientText>
                    <span className="block text-slate-300 font-semibold text-xl md:text-2xl mt-2">Theory ↔ Practice. High-Fi. Animated.</span>
                  </h1>
                  <p className="mt-6 text-slate-300/90 max-w-prose">
                    Explore foundational concepts and jump straight into hands-on labs. Designed for classrooms and workshops with cinematic micro-interactions and a neon cyber aesthetic.
                  </p>
                  <div className="mt-6 flex flex-wrap gap-3">
                    <Button onClick={() => setTab("theory")} className="bg-cyan-600 hover:bg-cyan-500">Theory</Button>
                    <Button onClick={() => setTab("practice")} className="bg-fuchsia-600 hover:bg-fuchsia-500">Practical</Button>
                    <Button variant="outline" className="border-white/20 bg-white/5">Quick Demo</Button>
                  </div>
                  <div className="mt-8 space-y-2">
                    <PulseBadge label="Live progress" />
                    <Progress value={progress} className="h-2 bg-white/10" />
                  </div>
                </div>
                <div className="relative min-h-[300px] md:min-h-[420px]">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="relative">
                      <div className="absolute -inset-10 rounded-full blur-3xl bg-fuchsia-500/20" />
                      <div className="absolute inset-x-0 -bottom-10 h-40 bg-gradient-to-t from-slate-950 to-transparent" />
                      <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ type: "spring", stiffness: 120 }}
                        className="relative grid grid-cols-2 gap-4">
                        <TiltCard>
                          <div className="p-4">
                            <CardHeader className="pb-2"><CardTitle className="flex items-center gap-2 text-cyan-200"><Shield className="h-5 w-5" />Defense</CardTitle></CardHeader>
                            <CardContent className="text-slate-300/80">Defense-in-depth, least privilege.</CardContent>
                          </div>
                        </TiltCard>
                        <TiltCard>
                          <div className="p-4">
                            <CardHeader className="pb-2"><CardTitle className="flex items-center gap-2 text-fuchsia-200"><Bug className="h-5 w-5" />Threats</CardTitle></CardHeader>
                            <CardContent className="text-slate-300/80">OWASP, CVEs, exploit chain.</CardContent>
                          </div>
                        </TiltCard>
                        <TiltCard className="col-span-2">
                          <div className="p-4">
                            <CardHeader className="pb-2"><CardTitle className="flex items-center gap-2 text-emerald-200"><Network className="h-5 w-5" />Traffic</CardTitle></CardHeader>
                            <CardContent>
                              <PacketStream />
                            </CardContent>
                          </div>
                        </TiltCard>
                      </motion.div>
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
              <TabsList className="bg-white/10 border border-white/10">
                <TabsTrigger value="theory">Theoretical</TabsTrigger>
                <TabsTrigger value="practice">Practical</TabsTrigger>
                <TabsTrigger value="resources">Resources</TabsTrigger>
              </TabsList>
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
                  <motion.div key={lab.title} initial={{ y: 20, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.06 }}>
                    <TiltCard>
                      <div className="p-4">
                        <CardHeader className="pb-2">
                          <CardTitle className="flex items-center gap-2">
                            <span className="text-fuchsia-200">{lab.icon}</span>
                            <span>{lab.title}</span>
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <ol className="list-decimal list-inside space-y-1 text-sm text-slate-300/90">
                            {lab.steps.map((s) => (<li key={s}>{s}</li>))}
                          </ol>
                          <div className="mt-4 flex gap-2">
                            <Button size="sm" className="bg-emerald-600 hover:bg-emerald-500">Start</Button>
                            <Button size="sm" variant="outline" className="border-white/20 bg-white/5">View Guide</Button>
                          </div>
                        </CardContent>
                      </div>
                    </TiltCard>
                  </motion.div>
                ))}

                <motion.div initial={{ y: 20, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.18 }} className="md:col-span-3">
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
              </div>
            </TabsContent>

            {/* RESOURCES */}
            <TabsContent value="resources">
              <div className="grid md:grid-cols-2 gap-6">
                <TiltCard>
                  <div className="p-4">
                    <CardHeader className="pb-2"><CardTitle className="flex items-center gap-2"><BookOpen className="h-5 w-5" /> Quick Theory Recap</CardTitle></CardHeader>
                    <CardContent className="text-sm text-slate-300/85">
                      <ul className="list-disc list-inside space-y-1">
                        <li>Security is about trade-offs: usability, cost, risk.</li>
                        <li>Trust but verify → better: <em>never trust, always verify</em>.</li>
                        <li>Assume breach; practice incident response.</li>
                        <li>Automation + observability win over ad-hoc heroics.</li>
                      </ul>
                    </CardContent>
                  </div>
                </TiltCard>
                <TiltCard>
                  <div className="p-4">
                    <CardHeader className="pb-2"><CardTitle className="flex items-center gap-2"><Rocket className="h-5 w-5" /> Teaching Tips</CardTitle></CardHeader>
                    <CardContent className="text-sm text-slate-300/85">
                      <ul className="list-disc list-inside space-y-1">
                        <li>Use the Packet Stream as a visual metaphor for data in transit.</li>
                        <li>Assign labs in pairs: one plays <em>attacker</em>, one <em>defender</em>.</li>
                        <li>Have students map each step to a control in the NIST/ISO framework.</li>
                        <li>Finish with a 10-minute tabletop incident drill.</li>
                      </ul>
                    </CardContent>
                  </div>
                </TiltCard>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="relative px-5 md:px-10 pb-10">
        <div className="max-w-6xl mx-auto text-xs text-slate-400/80 flex items-center gap-2">
          <Cpu className="h-4 w-4" /> Built for fast sessions • <span className="text-slate-300">Tip:</span> Press <kbd className="px-1.5 py-0.5 rounded bg-white/10 border border-white/20">T</kbd> then <kbd className="px-1.5 py-0.5 rounded bg-white/10 border border-white/20">P</kbd> to jump Theory/Practical.
        </div>
      </footer>
    </div>
  );
}
