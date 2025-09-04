import React, { useState, useRef, useEffect } from "react";
import { FaArrowRight, FaArrowLeft, FaHome } from "react-icons/fa";
import { MousePointer2 } from "lucide-react";
import { motion, MotionConfig, useReducedMotion, useMotionValue, useTransform, animate } from "framer-motion";
import { Link, useNavigate } from 'react-router-dom'


export default function DigitalSafetyShowcase() {
  const [activeTab, setActiveTab] = useState("intro");
  const tablistRef = useRef(null);
  const navigate = useNavigate()
  const prefersReduced = useReducedMotion();
  const mouseX = useMotionValue(typeof window !== "undefined" ? window.innerWidth / 2 : 0);
  const mouseY = useMotionValue(typeof window !== "undefined" ? window.innerHeight / 2 : 0);
  const cardRef = useRef(null);

  useEffect(() => {
    if (prefersReduced) return;
    const onMove = (e) => {
      animate(mouseX, e.clientX, {
        type: "spring",
        stiffness: 300,
        damping: 20,
      });
      animate(mouseY, e.clientY, {
        type: "spring",
        stiffness: 300,
        damping: 20,
      });
    };

    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, [prefersReduced, mouseX, mouseY]);

  const rotateX = useTransform(mouseY, (y) => {
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return 0;
    return -((y - rect.top - rect.height / 2) / 40);
  });
  const rotateY = useTransform(mouseX, (x) => {
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return 0;
    return (x - rect.left - rect.width / 2) / 40;
  });

  useEffect(() => {
    const tabOrder = ["intro", "need", "types", "rules", "kindness"]; // moved inside effect
    const el = tablistRef.current;
    if (!el) return;

    const onKey = (e) => {
      const idx = tabOrder.indexOf(activeTab);

      if (e.key === "ArrowRight") {
        setActiveTab(tabOrder[(idx + 1) % tabOrder.length]);
        e.preventDefault();
      } else if (e.key === "ArrowLeft") {
        setActiveTab(tabOrder[(idx - 1 + tabOrder.length) % tabOrder.length]);
        e.preventDefault();
      } else if (e.key === "Home") {
        setActiveTab(tabOrder[0]);
        e.preventDefault();
      } else if (e.key === "End") {
        setActiveTab(tabOrder[tabOrder.length - 1]);
        e.preventDefault();
      }
    };

    el.addEventListener("keydown", onKey);
    return () => el.removeEventListener("keydown", onKey);
  }, [activeTab]);

  const tabs = [
    { id: "intro", label: "🌐 Introduction" },
    { id: "need", label: "💡 Why It Matters" },
    { id: "types", label: "🔐 Types of Safety" },
    { id: "rules", label: "📜 Safety Rules" },
    { id: "kindness", label: "🤝 Kindness Online" },
  ];

  const TabHeader = () => (
    <div
      ref={tablistRef}
      role="tablist"
      aria-label="Digital safety sections"
      className="flex flex-wrap justify-center gap-3 mb-10"
    >
      {tabs.map((tab) => {
        const selected = activeTab === tab.id;
        return (
          <button
            key={tab.id}
            role="tab"
            aria-selected={selected}
            aria-controls={`panel-${tab.id}`}
            id={`tab-${tab.id}`}
            tabIndex={selected ? 0 : -1}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-2 rounded-xl text-base md:text-lg font-semibold shadow-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-cyan-300/60
              ${selected ? "bg-cyan-500 text-white scale-105" : "bg-white/10 text-gray-200 hover:bg-cyan-400/30"}`}
          >
            {tab.label}
          </button>
        );
      })}
    </div>
  );

  const Panel = ({ id, children }) => (
    <section
      id={`panel-${id}`}
      role="tabpanel"
      aria-labelledby={`tab-${id}`}
      hidden={activeTab !== id}
    >
      {activeTab === id && (
        <motion.div
          key={id}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          {children}
        </motion.div>
      )}
    </section>
  );

  function ShieldIconMini({ className = "" }) {
    return (
      <motion.svg
        className={`h-7 w-7 ${className}`}
        viewBox="0 0 24 24"
        fill="currentColor"
        initial={{ scale: 0.9 }}
        animate={{ scale: [0.9, 1.05, 0.9] }}
        transition={{ repeat: Infinity, duration: 2 }}
      >
        <path d="M12 2l5 2v4c0 3.2-2.3 6.1-5 7.2-2.7-1.1-5-4-5-7.2V4l5-2z" />
        <motion.path
          d="M9 12l2 2 4-4"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.2, repeat: Infinity, repeatType: "reverse" }}
        />
      </motion.svg>
    );
  }

  function LockIconMiniBigRed({ className = "" }) {
    return (
      <motion.svg
        className={`h-18 w-18 ${className}`}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.9"
        // Breathing scale pulse
        initial={{ scale: 0.95 }}
        animate={{ scale: [0.95, 1.15, 0.95] }}
        transition={{ repeat: Infinity, duration: 2.2, ease: "easeInOut" }}
        style={{
          // Additional precise red glow on the vector itself
          filter:
            "drop-shadow(0 0 8px rgba(239,68,68,0.9)) drop-shadow(0 0 20px rgba(239,68,68,0.6))",
        }}
      >
        <rect x="4" y="10" width="16" height="10" rx="2.6" />
        <path d="M8 10V7a4 4 0 118 0v3" />
        <circle cx="12" cy="15" r="1.35" fill="currentColor" stroke="none" />
      </motion.svg>
    );
  }

  const handlePrev = () => {
    const tabOrder = ["intro", "need", "types", "rules", "kindness"];
    const idx = tabOrder.indexOf(activeTab);

    if (idx === 0) {
      navigate("/parts/prt5");
    } else {
      setActiveTab(tabOrder[idx - 1]);
    }
  };

  const handleNext = () => {
    const tabOrder = ["intro", "need", "types", "rules", "kindness"];
    const idx = tabOrder.indexOf(activeTab);

    if (idx === tabOrder.length - 1) {
      navigate("/error404");
    } else {
      setActiveTab(tabOrder[idx + 1]);
    }
  };

  const digitalSafetyPoints = [
    {
      text: "Keeps important information like your phone number, home address and passwords safe from strangers."
    },
    {
      text: "Teaches us to share carefully and speak politely when using apps, chats, or online games.",
    },
    {
      text: "Helps you avoid fake messages, fraud links, and hackers who try to steal information.",
    },
    {
      text: "Reminds you to use strong and different passwords so no one can easily guess them.",
    },
    {
      text: "Guides you to open only trusted websites and avoid harmful or fake sites.",
    },
    {
      text: "Keeps your computer and phone safe from viruses, malware, and harmful downloads.",
    },
    {
      text: "Helps you behave kindly and respectfully online so others see you positively.",
    },
  ];

  const digitalThreats = [
    {
      title: "Scams",
      desc: "Fake offers, phishing forms, and impostor DMs try to steal money.",
    },
    {
      title: "Malware",
      desc: "Untrusted downloads can harm devices or spy on activity.",
    },
    {
      title: "Hackers",
      desc: "Weak passwords and reused logins get cracked or leaked.",
    },
    {
      title: "Cyberbullying",
      desc: "Mean posts or threats can hurt mental health; report and block.",
    },
  ];

const items = [
  { icon: "🔒", title: "Device Safety", points: ["Lock screen & updates", "Antivirus basics", "App permissions hygiene"] },
  { icon: "🗂", title: "Data Safety", points: ["Backups & secure cloud", "Share minimally", "Encrypt sensitive files"] },
  { icon: "🆔", title: "Identity Safety", points: ["Keep address/phone/Aadhaar private", "Strong passwords", "Beware profile oversharing"] },
  { icon: "💬", title: "Communication Safety", points: ["Be respectful", "Avoid strangers", "Limit personal details in chats"] },
  { icon: "💳", title: "Financial Safety", points: ["Use secure payment methods", "Monitor transactions", "Avoid phishing emails"] },
  { icon: "🌐", title: "Online Privacy", points: ["Use VPN when needed", "Manage cookies & trackers", "Control social media visibility"] },
  { icon: "🛡", title: "Network Safety", points: ["Secure Wi-Fi", "Avoid public hotspots for sensitive tasks", "Strong router passwords"] },
  { icon: "🧑‍💻", title: "Account Safety", points: ["Enable two-factor authentication", "Regularly update passwords", "Monitor account activity"] },
  { icon: "📚", title: "Educational Safety", points: ["Verify sources before sharing", "Critical thinking online", "Avoid scams & misinformation"] },
];


  return (
    <div className="relative min-h-screen bg-gradient-to-br from-[#0a0b1e] via-[#13183b] to-[#2a1040] text-white flex flex-col items-center py-10 px-4 overflow-hidden">
      {/* Home page Link */}
      <div className="flex justify-center mb-4">
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
      {/* dotted Background */}
      <div className="pointer-events-none absolute inset-0 opacity-75"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.35) 1px, transparent 1px)",
          backgroundSize: "24px 24px",
          maskImage:
            "linear-gradient(to bottom, transparent, black 12%, black 88%, transparent)",
          WebkitMaskImage:
            "linear-gradient(to bottom, transparent, black 12%, black 88%, transparent)",
        }}
      />
      {/* Left and Right Corner Glow effect of the Dotted Bg */}
      <motion.div className="pointer-events-none absolute -top-20 -left-24 h-96 w-96 rounded-full bg-cyan-400/20 blur-3xl"
        animate={{ y: [0, -12, 0] }}
        transition={{ repeat: Infinity, duration: 8, ease: "easeInOut" }}
      />
      <motion.div className="pointer-events-none absolute -bottom-24 -right-28 h-[28rem] w-[28rem] rounded-full bg-fuchsia-400/20 blur-3xl"
        animate={{ y: [0, 14, 0] }}
        transition={{ repeat: Infinity, duration: 9, ease: "easeInOut" }}
      />
      {/* Chapter Title */}
      <h1 className="text-4xl md:text-5xl font-extrabold mb-8 text-center text-cyan-300 drop-shadow-[0_0_24px_rgba(34,211,238,0.35)]">
        ✨ Chapter 16: Digital Safety ✨
      </h1>
      <TabHeader />
      <div className="relative max-w-4xl w-full bg-white/5 rounded-3xl shadow-2xl p-8 backdrop-blur-xl border border-white/10">
        {/* Decorative scan line */}
        <motion.div className="pointer-events-none absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        />
        {/* Introduction */}
        <Panel id="intro">
          <div className="relative inline-block px-2 py-2 text-center">
            <span className="sr-only">What is Digital Safety?</span>
            <motion.h2 className="text-2xl md:text-4xl font-extrabold tracking-tight
                   font-cyber text-pink-500 drop-shadow-[0_1px_0_rgba(0,0,0,0.4)]"
              animate={{ y: [0, 0] }} transition={{ duration: 6, repeat: Infinity, ease: "linear" }}>
              What is Digital Safety?
            </motion.h2>
          </div>
          {/* Animated globe with top red-glow pulsing lock + orbiting shield */}

          <div className="relative mx-auto mt-4 w-56 h-56">
            <motion.div
              className="absolute inset-0 rounded-full bg-cyan-400/10 blur-2xl"
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 18, ease: "linear" }}
            />
            {/* Globe */}
            <motion.svg
              className="relative z-10 w-56 h-56 text-cyan-300 drop-shadow-[0_0_24px_rgba(34,211,238,0.45)]"
              viewBox="0 0 200 200"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <motion.circle cx="100" cy="100" r="64" initial={{ pathLength: 0, opacity: 0.8 }} animate={{ pathLength: 1, opacity: 1 }} transition={{ duration: 1.4, ease: "easeInOut" }} />
              <motion.path d="M36 100h128" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1, delay: 0.2 }} />
              <motion.path d="M100 36v128" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1, delay: 0.35 }} />
              <motion.path d="M52 70c15-12 81-12 96 0" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1, delay: 0.5 }} />
              <motion.path d="M52 130c15 12 81 12 96 0" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1, delay: 0.65 }} />
              <motion.ellipse cx="100" cy="100" rx="80" ry="30" className="opacity-70" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1, delay: 0.8 }} />
              <motion.ellipse cx="100" cy="100" rx="50" ry="18" className="opacity-50" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1, delay: 1.0 }} />
              <circle cx="100" cy="100" r="2.5" fill="currentColor" opacity="0.9" />
            </motion.svg>

            {/* Center red-glow pulsing lock */}
            <div className="absolute inset-0 flex items-center justify-center z-30">
              <motion.div
                className="absolute w-20 h-20 rounded-full"
                style={{
                  filter:
                    "drop-shadow(0 0 14px rgba(239,68,68,0.85)) drop-shadow(0 0 28px rgba(239,68,68,0.55)) drop-shadow(0 0 52px rgba(239,68,68,0.35))",
                }}
                initial={{ opacity: 0.7 }}
                animate={{ opacity: [0.6, 0.95, 0.6] }}
                transition={{ repeat: Infinity, duration: 2.2, ease: "easeInOut" }}
              />
              <LockIconMiniBigRed className="text-red-400 relative z-40 w-12 h-12" />
            </div>

            {/* Orbiting spaceship/shield */}
            <motion.div
              className="absolute left-1/2 top-1/2 z-40"
              style={{ translateX: "-50%", translateY: "-50%" }}
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 10, ease: "linear" }}
            >
              <div className="relative" style={{ transform: "translateX(80px)" }}>

                <motion.div
                  className="absolute inset-0 rounded-full"
                  style={{
                    filter:
                      "drop-shadow(0 0 10px rgba(34,211,238,0.9)) drop-shadow(0 0 20px rgba(34,211,238,0.6))",
                  }}
                  animate={{ opacity: [0.6, 1, 0.6], scale: [0.9, 1.1, 0.9] }}
                  transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                />
                <ShieldIconMini className="text-cyan-200 relative z-50 w-8 h-8" />
              </div>
            </motion.div>

            {/* Subtle floating green particles */}
            {Array.from({ length: 10 }).map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1.5 h-1.5 rounded-full bg-green-400"
                style={{
                  top: `${Math.random() * 100}%`,
                  left: `${Math.random() * 100}%`,
                  filter: "drop-shadow(0 0 6px rgba(34,197,94,0.6))",
                }}
                animate={{
                  y: [0, -8, 0],
                  opacity: [0.2, 0.7, 0.2],
                  scale: [0.7, 1.1, 0.7],
                }}
                transition={{
                  duration: 3 + Math.random() * 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: Math.random() * 2,
                }}
              />
            ))}
          </div>

          <p className="text-white/90 mb-4 flex items-start">
            <MousePointer2
              className="h-20 w-20 text-green-400 mr-2 rotate-[135deg] drop-shadow-[0_0_8px_rgba(236,72,153,0.6)]" />
            <span>
              Digital safety is staying safe online by protecting identity, data, and devices with smart habits.
              Digital safety means keeping accounts private, devices secure, and information safe from scams and hacks.
              Digital safety is using strong passwords and safe browsing to protect personal information and devices.
            </span>
          </p>

          <ul className="list-disc pl-6 text-white/85 space-y-2 mb-6">
            {digitalSafetyPoints.map((point, index) => (
              <li key={index}>
                {point.text} {point.ref && <span className="text-gray-400">{point.ref}</span>}
              </li>
            ))}
          </ul>

          <FunFacts facts={[
            "The average strong passphrase is 3+ random words and 16+ characters long—easier to remember and harder to crack.",
            "Browsers show a padlock when the site uses HTTPS, encrypting data in transit.",
          ]} />
        </Panel>

        {/* Why It Matters */}
        <Panel id="need" className="bg-[#0B1220] text-[#E8EEF6] p-6 rounded-2xl shadow-lg">
          {/* Section Heading */}
          <h2 className="text-3xl md:text-4xl font-extrabold mb-4 
                 text-[#FFC857] drop-shadow-[0_0_12px_rgba(255,200,87,0.4)]">
            Why Digital Safety Matters
          </h2>

          {/* Intro paragraph */}
          <p className="text-[#A8B3C5] mb-5 leading-relaxed max-w-2xl">
            The internet is amazing for learning, fun, and shopping —
            but hidden dangers like scams, malware, and bullies exist.
            Practicing safe habits protects your <span className="text-[#10B3C8] font-semibold">accounts</span>,
            <span className="text-[#10B3C8] font-semibold"> money</span>,
            <span className="text-[#10B3C8] font-semibold"> reputation</span>, and
            <span className="text-[#10B3C8] font-semibold"> devices</span>.
          </p>

          {/* Animated alert-clock hybrid */}
          <motion.svg
            className="mx-auto mt-2 w-36 h-36 text-[#00ff9dbb] drop-shadow-[0_0_10px_rgba(255,200,87,0.45)]"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
          >
            {/* Outer clock face */}
            <circle cx="12" cy="12" r="9" className="opacity-70" />

            {/* Moving hand */}
            <motion.path
              d="M12 7v5h4.5"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 1 }}
            />

            {/* Pulsing circle ring */}
            <motion.circle
              cx="12" cy="12" r="9"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 3, repeat: Infinity, repeatType: "reverse" }}
            />
          </motion.svg>

          {/* Risk cards grid */}
          <div className="grid sm:grid-cols-2 gap-5">
            {digitalThreats.map((item, index) => (
              <div
                key={index}
                className="bg-[#121A2A] rounded-xl p-4 border border-transparent 
                   hover:border-[#10B3C8]/60 hover:shadow-md 
                   transition-all duration-300 group"
              >
                <Bullet title={item.title} desc={item.desc} />
              </div>
            ))}
          </div>

          {/* Quick Tips */}
          <Tips
            tips={[
              "Use unique passwords for important accounts (email, banking, socials).",
              "Always double-check site URLs before paying or entering details.",
            ]}
            className="mt-6"
          />
        </Panel>

        {/* Types of Safety */}
        <Panel id="types">
          <MotionConfig reducedMotion="user">
            <section className="relative mx-auto max-w-5xl px-6 text-white">
              {/* Heading */}
              <h2 className="text-3xl md:text-4xl font-extrabold mb-4 
                 text-[#FFC857] drop-shadow-[0_0_12px_rgba(255,200,87,0.4)]">
                Types of Digital Safety
              </h2>
              <p className="text-[#A8B3C5] mb-5 leading-relaxed max-w-2xl">
                Digital safety is more than just passwords — it covers a range of practices to protect you online. Key types include
                <span className="text-[#10B3C8] font-semibold"> personal safety</span>,
                <span className="text-[#10B3C8] font-semibold"> financial security</span>,
                <span className="text-[#10B3C8] font-semibold"> data privacy</span>, and
                <span className="text-[#10B3C8] font-semibold"> device protection</span>.
                By understanding these types and practicing safe habits, you can safeguard your
                <span className="text-[#10B3C8] font-semibold"> accounts</span>,
                <span className="text-[#10B3C8] font-semibold"> personal information</span>,
                <span className="text-[#10B3C8] font-semibold"> devices</span>, and
                <span className="text-[#10B3C8] font-semibold"> online reputation</span> from potential threats like scams, malware, and cyberbullying.
              </p>
              {/* Credit-card animation */}
              <div className="relative mx-auto mt-6 h-48 w-72">
                <motion.div
                  ref={cardRef}
                  className="relative z-10 h-full w-full rounded-2xl"
                  style={!prefersReduced ? { rotateX, rotateY, transformStyle: "preserve-3d", transition: "transform 0.1s ease-out" } : {}}
                >
                  <motion.div
                    className="relative h-full w-full rounded-2xl"
                    animate={!prefersReduced ? { rotateY: [0, 180, 360] } : undefined}
                    transition={!prefersReduced ? { duration: 12, repeat: Infinity, ease: "linear" } : undefined}
                    style={{ transformStyle: "preserve-3d" }}
                  >
                    {/* Front - Visa Theme */}
                    <div
                      className="absolute inset-0 rounded-2xl  bg-gradient-to-br from-[#1A1F71] via-[#3A4DBF] to-[#F7B600] text-white shadow-lg flex flex-col justify-center px-4"
                      style={{ backfaceVisibility: "hidden" }}
                    >
                      <CardFace
                        label="CYBER PAY"
                        number="5242  8610  3391  2044"
                        name="A. STUDENT"
                        expiry="12/27"
                      />
                    </div>

                    {/* Back - Visa Theme */}
                    <div
                      className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[#1A1F71] via-[#3A4DBF] to-[#F7B600] text-white shadow-lg flex flex-col justify-center px-4"
                      style={{ transform: "rotateY(180deg)", backfaceVisibility: "hidden" }}
                    >
                      <CardBack />
                    </div>
                  </motion.div>
                </motion.div>
              </div>

              {/* Grid */}
              <motion.div
                className="grid gap-6 md:grid-cols-2 mt-8"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-60px" }}
                variants={{
                  hidden: { opacity: 0, y: 24 },
                  visible: { opacity: 1, y: 0, transition: { staggerChildren: 0.12 } },
                }}
              >
                {items.map((c, i) => (
                  <motion.div
                    key={i}
                    variants={{
                      hidden: { opacity: 0, scale: 0.98 },
                      visible: { opacity: 1, scale: 1 }
                    }}
                    initial="hidden"
                    animate="visible"
                    whileHover={{
                      scale: 1.03,
                      boxShadow: "0 0 20px rgba(16, 179, 200, 0.5), 0 0 40px rgba(16, 179, 200, 0.3)",
                      transition: { duration: 0.3, ease: "easeOut" }
                    }}
                    transition={{ duration: 0.35 }}
                    className="rounded-2xl bg-[#0F1A2B] ring-1 ring-white/10 p-6 shadow-[0_6px_40px_rgba(0,0,0,0.35)]"
                  >
                    <div className="flex items-center gap-3 text-lg font-semibold text-white">
                      <span className="text-2xl">{c.icon}</span>
                      <h3 className="text-xl">{c.title}</h3>
                    </div>
                    <ul className="mt-4 space-y-2 text-white/85">
                      {c.points.map((p, idx) => (
                        <li key={idx} className="flex gap-2">
                          <span className="mt-1 h-1.5 w-1.5 rounded-full bg-cyan-400/80"></span>
                          <span>{p}</span>
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                ))}

              </motion.div>
            </section>
          </MotionConfig>
        </Panel>

        {/* Safety Rules */}
        <Panel id="rules">
          <h2 className="text-3xl font-bold mb-3 text-pink-300">Easy Safety Rules</h2>
          <ol className="list-decimal pl-6 text-white/90 space-y-2 mb-4">
            <li>Use strong, unique passwords or passphrases; enable 2-step verification (OTP/fingerprint).</li>
            <li>Keep personal info private; think before posting photos or details.</li>
            <li>Don’t click unknown links, pop-ups, or “free gift” messages.</li>
            <li>Be cautious on public Wi‑Fi and with random QR codes.</li>
            <li>Check for HTTPS padlock before entering any data or making payments.</li>
          </ol>

          {/* Animated checkmark drawing */}
          <motion.svg
            className="mx-auto mt-4 w-40 h-40 text-pink-300"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <motion.path
              d="M5 13l4 4L19 7"
              strokeLinecap="round"
              strokeLinejoin="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1.2, repeat: Infinity, repeatType: "reverse", repeatDelay: 0.6 }}
            />
          </motion.svg>

          <Tips tips={[
            "Create passphrases: three random words + numbers or symbols.",
            "Use a password manager to avoid reuse.",
          ]} />
        </Panel>

        {/* Kindness Online */}
        <Panel id="kindness">
          <h2 className="text-3xl font-bold mb-3 text-purple-300">Kind and Smart Online</h2>
          <p className="text-white/90 mb-3">
            Being safe includes being kind: respect others, avoid bullying, and fact-check before sharing. Report scams or harassment to a trusted adult or platform moderation. [Report mapping] [5]
          </p>
          <ul className="list-disc pl-6 text-white/90 space-y-2 mb-4">
            <li>Use positive language; pause before posting angry replies.</li>
            <li>Don’t forward rumors or private screenshots.</li>
            <li>Block and report harmful accounts; save evidence if needed.</li>
          </ul>

          {/* Animated heart pulse + orbiting shield */}
          <div className="relative w-44 h-44 mx-auto">
            <motion.svg
              className="absolute inset-0 w-44 h-44 text-purple-300"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <motion.path
                d="M12 21s-7-4.5-9-8.5C1 8 3.5 5 6.8 5c2 0 3.2 1.2 5.2 3.2C14.8 6.2 16 5 18 5 21.3 5 23.8 8 21 12.5 19 16.5 12 21 12 21z"
                animate={{ scale: [1, 1.06, 1] }}
                transition={{ repeat: Infinity, duration: 1.8 }}
              />
            </motion.svg>
            <motion.div
              className="absolute left-1/2 top-1/2 -ml-3 -mt-3"
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 8, ease: "linear" }}
            >
              <ShieldOrbit />
            </motion.div>
          </div>

          <FunFacts facts={[
            "Kind comments can start positive chains—others copy the tone they see.",
            "Platforms boost helpful, well-sourced posts; low-quality content often gets less reach.",
          ]} />
        </Panel>
      </div>
      <div className="flex justify-between items-center w-full px-4 py-4 bg-white/5 border border-white/10 rounded-xl backdrop-blur-md">
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

    </div>
  );
}

/* ---------- Small pieces ---------- */
function Bullet({ title, desc }) {
  return (
    <div className="rounded-xl border border-white/10 bg-white/5 p-4 backdrop-blur-sm hover:border-white/20 transition">
      <div className="font-semibold">{title}</div>
      <div className="text-white/85">{desc}</div>
    </div>
  );
}

function Tips({ tips }) {
  return (
    <div className="mt-6 grid sm:grid-cols-2 gap-3">
      {tips.map((t, i) => (
        <div key={i} className="rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white/85">
          {t}
        </div>
      ))}
    </div>
  );
}

function CardFace({ label, number, name, expiry }) {
  return (
    <div className="h-full w-full p-4 flex flex-col justify-between">
      {/* Top row: Label + Chip */}
      <div className="flex items-center justify-between text-cyan-300">
        <span className="font-semibold tracking-wider text-sm sm:text-base">{label}</span>
        <span className="h-6 w-10 sm:h-8 sm:w-12 rounded bg-cyan-400/30 blur-[1px]" />
      </div>

      {/* Card Number */}
      <div className="mt-6 text-lg sm:text-2xl md:text-2xl tracking-widest break-words">
        {number}
      </div>

      {/* Cardholder and Expiry */}
      <div className="mt-4 flex items-center justify-between text-xs sm:text-sm text-white/85 w-full">
        <div className="flex flex-col">
          <span className="text-white/60 text-[0.65rem] sm:text-xs">CARDHOLDER</span>
          <span className="tracking-wide truncate">{name}</span>
        </div>
        <div className="flex flex-col items-end">
          <span className="text-white/60 text-[0.65rem] sm:text-xs">EXPIRES</span>
          <span className="tracking-wide">{expiry}</span>
        </div>
      </div>
    </div>
  );
}

function CardBack() {
  return (
    <div className="h-full w-full p-5">
      <div className="h-8 w-full bg-white/70 rounded-sm mt-2" />
      <div className="mt-6 flex items-center justify-between">
        <div className="h-10 w-40 rounded bg-white/20 backdrop-blur" />
        <div className="h-10 w-16 rounded bg-cyan-400/30 backdrop-blur" />
      </div>
    </div>
  );
}
function FunFacts({ facts }) {
  return (
    <div className="mt-6 grid sm:grid-cols-2 gap-3">
      {facts.map((f, i) => (
        <div key={i} className="relative rounded-lg border border-white/10 bg-white/5 px-3 py-3 text-sm text-white/85 overflow-hidden">
          <motion.div
            className="pointer-events-none absolute -inset-1 opacity-30 bg-gradient-to-r from-transparent via-white/20 to-transparent"
            animate={{ x: ["-10%", "110%"] }}
            transition={{ repeat: Infinity, duration: 3 }}
          />
          <span className="font-semibold text-cyan-200">Fun Fact:</span> {f}
        </div>
      ))}
    </div>
  );
}

function ShieldOrbit() {
  return (
    <svg viewBox="0 0 24 24" className="h-6 w-6 text-cyan-300">
      <g fill="currentColor" stroke="currentColor" strokeWidth="0.6">
        <path d="M12 2l5 2v4c0 3.2-2.3 6.1-5 7.2-2.7-1.1-5-4-5-7.2V4l5-2z" />
      </g>
    </svg>
  );
}
