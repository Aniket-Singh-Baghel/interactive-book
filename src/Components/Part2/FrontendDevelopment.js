import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useMotionValue, useTransform } from "framer-motion";
import {
  Monitor,
  MousePointerClick,
  Paintbrush,
  Store,
  Star,
  Sparkles,
  DoorOpen,
  Lightbulb,
  Sun,
  Moon,
} from "lucide-react";

// --- Small UI primitives (self-contained, replaceable) ---
const Card = ({ children, className = "" }) => (
  <div className={`rounded-2xl shadow-lg bg-white p-5 ${className}`}>{children}</div>
);

const Button = ({ children, className = "", ...props }) => (
  <button
    {...props}
    className={`inline-flex items-center gap-2 px-4 py-2 rounded-2xl font-semibold shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 ${className}`}
  >
    {children}
  </button>
);

const Badge = ({ children }) => (
  <span className="px-3 py-1 rounded-full bg-gradient-to-r from-sky-100 to-emerald-100 text-sm font-semibold shadow">{children}</span>
);

// --- Confetti component (fixed & improved) ---
function Confetti({ count = 28, active = false }) {
  const colors = [
    "#FF6B6B",
    "#FFD93D",
    "#6BE4A6",
    "#6BD3FF",
    "#A78BFA",
    "#FF9BB3",
  ];

  const pieces = Array.from({ length: count }).map((_, i) => ({
    id: i,
    left: Math.random() * 100,
    delay: Math.random() * 0.6,
    rot: Math.random() * 360,
    size: Math.random() * 12 + 8,
    color: colors[Math.floor(Math.random() * colors.length)],
  }));

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 overflow-hidden z-50">
      <AnimatePresence>
        {active && (
          <div className="absolute inset-0">
            {pieces.map((p) => (
              <motion.div
                key={p.id}
                initial={{ opacity: 0, y: -20, x: `${p.left}%`, rotate: p.rot }}
                animate={{ opacity: [1, 1, 0], y: [0, 160 + Math.random() * 220], rotate: p.rot + 360 }}
                exit={{ opacity: 0 }}
                transition={{ delay: p.delay, duration: 1.6, ease: "easeOut" }}
                style={{ left: `${p.left}%` }}
                className="absolute top-8 rounded-sm"
              >
                <div style={{ width: p.size, height: p.size, background: p.color }} className="rounded-sm" />
              </motion.div>
            ))}
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

// --- Simple Shop preview tile ---
function ShopPreview({ color = "#FFD1A6", open = false, decorations = [] }) {
  return (
    <motion.div
      layout
      initial={{ scale: 0.98, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      className="relative w-72 md:w-96 p-4 rounded-2xl shadow-2xl bg-gradient-to-br from-white/80 to-white/60"
    >
      <motion.div
        className="absolute -top-6 left-1/2 transform -translate-x-1/2 px-4 py-2 rounded-full shadow-md flex items-center gap-3"
        animate={{ rotate: [0, 2, 0, -2, 0] }}
        transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
        style={{ background: color }}
      >
        <Store size={18} />
        <div className="font-extrabold text-sm">My Cool Shop</div>
      </motion.div>

      <div className="mt-8 bg-white rounded-xl p-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-bold">Sunny Snacks</h3>
            <p className="text-xs text-gray-500">A friendly place built with Frontend magic</p>
          </div>

          <div className="flex items-center gap-2">
            <div className="text-sm text-gray-600">Lights</div>
            <div className="w-12 h-6 rounded-full bg-yellow-200 flex items-center p-1">
              <div
                className={`w-5 h-5 rounded-full bg-yellow-400 transition-transform ${open ? "translate-x-6" : "translate-x-0"}`}
              />
            </div>
          </div>
        </div>

        <div className="mt-3 grid grid-cols-3 gap-3 items-end">
          <motion.div className="col-span-2 rounded-lg h-28 bg-gradient-to-b from-slate-50 to-slate-100 flex items-center justify-center relative overflow-hidden">
            <motion.div animate={{ scale: open ? 1.02 : 1 }} transition={{ type: "spring", stiffness: 60 }}>
              <div className="text-center">
                <div className="text-5xl">🏪</div>
                <div className="text-xs text-gray-500">Welcome!</div>
              </div>
            </motion.div>

            <div className="absolute bottom-2 right-2 flex gap-1">
              {decorations.map((d, i) => (
                <div key={i} className="p-1 rounded bg-white/90 shadow text-xs">{d}</div>
              ))}
            </div>
          </motion.div>

          <div className="rounded-lg h-28 bg-gradient-to-b from-rose-50 to-rose-100 flex items-center justify-center">
            <div className="text-sm text-rose-700">Signboard</div>
          </div>
        </div>

        <div className="mt-4 flex gap-3 items-center justify-between">
          <div className="text-sm text-gray-600">Door</div>
          <motion.div animate={{ x: open ? 6 : 0 }} transition={{ type: "spring", stiffness: 100 }} className="p-2 bg-slate-50 rounded">
            <DoorOpen size={18} />
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}

// --- Main component ---
export default function FrontendDevelopment() {
  // core visual / behavior states
  const [themeColor, setThemeColor] = useState("#FFD1A6");
  const [shopOpen, setShopOpen] = useState(true);
  const [decorations, setDecorations] = useState([]);
  const [showConfetti, setShowConfetti] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(false);
  const [kidsMode, setKidsMode] = useState(true);

  // audio via ref (no external hook)
  const audioRef = useRef(null);
  useEffect(() => {
    // guard for SSR
    if (typeof window !== "undefined") {
      try {
        audioRef.current = new Audio("/sounds/chime.mp3");
        audioRef.current.volume = 0.65;
      } catch (e) {
        audioRef.current = null;
      }
    }
  }, []);

  // parallax for hero
  const y = useMotionValue(0);
  const yTransform = useTransform(y, [0, 260], [0, -30]);

  // play chime when confetti shows
  useEffect(() => {
    let t;
    if (showConfetti) {
      if (soundEnabled && audioRef.current) {
        audioRef.current.currentTime = 0;
        const p = audioRef.current.play();
        if (p && p.catch) p.catch(() => {}); // ignore promise rejections
      }
      t = setTimeout(() => setShowConfetti(false), 1600);
    }

    return () => clearTimeout(t);
  }, [showConfetti, soundEnabled]);

  // helpers
  const addDecoration = (emoji) => setDecorations((s) => [...s, emoji]);
  const clearDecorations = () => setDecorations([]);
  const triggerCelebrate = (extra = null) => {
    if (extra) addDecoration(extra);
    setShowConfetti(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 via-rose-50 to-emerald-50 p-6 md:p-12">
      <Confetti active={showConfetti} />

      <section className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
        {/* HERO / LEFT */}
        <motion.header className="md:col-span-7 p-6 bg-white/80 rounded-3xl shadow-2xl backdrop-blur" style={{ y: yTransform }}>
          <motion.div initial={{ opacity: 0, y: -18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-3xl bg-gradient-to-br from-yellow-200 to-pink-200 shadow-md">
                <Sparkles size={28} className="text-orange-600" />
              </div>

              <div>
                <h1 className="text-4xl md:text-5xl font-extrabold leading-tight">Frontend Development</h1>
                <p className="text-gray-600 mt-2 max-w-xl">Building the visual, interactive part of an app — like designing a shop's storefront, signs, and lights that make people smile.</p>
              </div>
            </div>

            <div className="mt-6 flex gap-3 flex-wrap">
              <Badge>Visual</Badge>
              <Badge>Interactive</Badge>
              <Badge>Playful</Badge>
            </div>

            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Card>
                <div className="flex items-start gap-4">
                  <Monitor size={22} className="text-sky-500" />
                  <div>
                    <h4 className="font-bold">What kids see</h4>
                    <p className="text-sm text-gray-600">Screens, buttons, colors — frontend draws the stage where app stories happen.</p>
                  </div>
                </div>
              </Card>

              <Card>
                <div className="flex items-start gap-4">
                  <MousePointerClick size={22} className="text-green-500" />
                  <div>
                    <h4 className="font-bold">What they do</h4>
                    <p className="text-sm text-gray-600">Click, type, swipe — frontend makes these actions delightful and clear.</p>
                  </div>
                </div>
              </Card>

              <Card>
                <div className="flex items-start gap-4">
                  <Paintbrush size={22} className="text-pink-500" />
                  <div>
                    <h4 className="font-bold">Design</h4>
                    <p className="text-sm text-gray-600">Colors, spacing and friendly text guide people to explore and have fun.</p>
                  </div>
                </div>
              </Card>

              <Card>
                <div className="flex items-start gap-4">
                  <Lightbulb size={22} className="text-yellow-500" />
                  <div>
                    <h4 className="font-bold">Why it matters</h4>
                    <p className="text-sm text-gray-600">Good frontend turns ideas into joyful experiences — like turning a blank shop into a welcoming place.</p>
                  </div>
                </div>
              </Card>
            </div>

            <div className="mt-6 flex items-center gap-4">
              <Button onClick={() => triggerCelebrate()} className="bg-gradient-to-r from-pink-500 to-yellow-400 text-white">Start the Magic ✨</Button>

              <div className="ml-auto flex items-center gap-3">
                <div className="text-sm text-gray-600">Kids Mode</div>
                <button onClick={() => setKidsMode((s) => !s)} aria-pressed={kidsMode} className={`w-14 h-7 rounded-full p-1 ${kidsMode ? "bg-emerald-400" : "bg-gray-300"}`}>
                  <div className={`h-5 w-5 bg-white rounded-full shadow transform ${kidsMode ? "translate-x-7" : "translate-x-0"} transition-transform`} />
                </button>
              </div>
            </div>
          </motion.div>
        </motion.header>

        {/* RIGHT: Live preview + controls */}
        <aside className="md:col-span-5 p-4 rounded-3xl shadow-lg bg-white/60 backdrop-blur">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Star size={18} className="text-amber-500" />
                <div>
                  <div className="text-sm font-semibold">Live Shop Preview</div>
                  <div className="text-xs text-gray-500">Change colors, open doors, decorate!</div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button title="Toggle sound" onClick={() => setSoundEnabled((s) => !s)} className={`p-2 rounded ${soundEnabled ? "bg-yellow-100" : "bg-gray-100"}`}>
                  {soundEnabled ? <Sun size={16} /> : <Moon size={16} />}
                </button>

                <div className="flex items-center gap-2">
                  <label htmlFor="color" className="text-xs text-gray-600">Color</label>
                  <input id="color" type="color" value={themeColor} onChange={(e) => setThemeColor(e.target.value)} className="w-10 h-7 p-0 border-none" />
                </div>
              </div>
            </div>

            <div className="mt-4">
              <ShopPreview color={themeColor} open={shopOpen} decorations={decorations} />

              <div className="mt-4 flex gap-2 items-center">
                <Button onClick={() => setShopOpen((s) => !s)} className="bg-white">{shopOpen ? "Close Shop" : "Open Shop"}</Button>
                <Button onClick={() => { triggerCelebrate("🎈"); addDecoration("🎈"); }} className="bg-white">Add 🎈</Button>
                <Button onClick={() => { clearDecorations(); triggerCelebrate(); }} className="bg-white">Clear</Button>
              </div>

              <div className="mt-4 grid grid-cols-3 gap-2">
                { ["🎈","🌟","🎁","🍭","🍪","🌈"].map((e) => (
                  <motion.button key={e} whileTap={{ scale: 0.92 }} onClick={() => addDecoration(e)} className="py-2 px-3 rounded-lg bg-white shadow">{e}</motion.button>
                )) }
              </div>
            </div>
          </motion.div>
        </aside>
      </section>

      {/* DENSE CONTENT AREA */}
      <section className="max-w-7xl mx-auto mt-12 p-4 grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">

          <motion.div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { title: "Buttons", icon: <MousePointerClick size={28} className="text-white"/>, desc: "Buttons respond with bounces and tiny sounds." },
              { title: "Forms", icon: <Monitor size={28} className="text-white"/>, desc: "Inputs guide you with friendly messages and animated helpers." },
              { title: "Menus", icon: <Paintbrush size={28} className="text-white"/>, desc: "Menus slide and show playful pointers." }
            ].map((c) => (
              <motion.div key={c.title} whileHover={{ scale: 1.04 }} className="bg-gradient-to-br from-white to-white/90 p-4 rounded-2xl shadow-md">
                <div className="flex items-center gap-3">
                  <div className="w-14 h-14 rounded-lg flex items-center justify-center bg-gradient-to-br from-indigo-500 to-emerald-400 text-white shadow-lg">{c.icon}</div>
                  <div>
                    <h4 className="font-bold">{c.title}</h4>
                    <div className="text-xs text-gray-600">{c.desc}</div>
                  </div>
                </div>

                <div className="mt-4">
                  {c.title === "Buttons" && (
                    <motion.button whileHover={{ scale: 1.06 }} whileTap={{ scale: 0.96 }} onClick={() => triggerCelebrate()} className="px-4 py-2 rounded-xl bg-gradient-to-r from-pink-400 to-yellow-400 text-white font-bold shadow">Click me!</motion.button>
                  )}

                  {c.title === "Forms" && (
                    <div className="mt-2">
                      <input placeholder="Type your name" className="w-full px-3 py-2 rounded-md border focus:outline-none focus:ring-2 focus:ring-amber-300" />
                    </div>
                  )}

                  {c.title === "Menus" && (
                    <div className="mt-2 inline-block relative">
                      <motion.div whileHover={{ scale: 1.03 }} className="px-3 py-2 rounded-lg bg-white shadow">Menu ▾</motion.div>
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </motion.div>

          <Card>
            <h3 className="text-xl font-extrabold">How Frontend Builds an App — step by step (kid version)</h3>
            <ol className="mt-3 list-decimal list-inside space-y-2 text-sm text-gray-700">
              <li><b>Plan the shop:</b> choose colors, signs, and what goes on the shelves.</li>
              <li><b>Draw the windows:</b> make simple mockups that show where things go.</li>
              <li><b>Make it interactive:</b> add buttons, menus and little animations so people know what to do.</li>
              <li><b>Test with friends:</b> watch how kids play — then make it easier and more fun.</li>
              <li><b>Ship it:</b> put the shop on the internet so everyone can visit!</li>
            </ol>

            <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-3">
              <div className="p-4 rounded-xl bg-sky-50">
                <h4 className="font-bold">Micro-interaction</h4>
                <p className="text-xs text-gray-600">Small responses like a button wiggle or a tiny sound — these make apps feel alive.</p>
              </div>
              <div className="p-4 rounded-xl bg-rose-50">
                <h4 className="font-bold">Accessibility</h4>
                <p className="text-xs text-gray-600">Big labels, good contrast and keyboard support so all kids can play.</p>
              </div>
            </div>
          </Card>

          <Card>
            <h3 className="text-lg font-bold">Mini Build: Make a sign</h3>
            <p className="text-xs text-gray-600 mt-2">Pick a background color and an icon to create a magical sign for your shop.</p>

            <div className="mt-3 flex gap-3 items-center">
              <input type="color" value={themeColor} onChange={(e) => setThemeColor(e.target.value)} className="w-14 h-10 p-0 border-none" />

              <div className="flex gap-2">
                {["🌟","🍭","🎈","🍪"].map((s) => (
                  <button key={s} onClick={() => addDecoration(s)} className="px-3 py-2 rounded bg-white shadow">{s}</button>
                ))}
              </div>

              <div className="ml-auto">
                <Button onClick={() => triggerCelebrate()} className="bg-gradient-to-r from-rose-500 to-yellow-400 text-white">Make Sign</Button>
              </div>
            </div>

            <div className="mt-4">
              <div className="inline-block p-4 rounded-2xl shadow" style={{ background: themeColor }}>
                <div className="text-2xl">{decorations.slice(-1)[0] ?? "✨"}</div>
              </div>
            </div>
          </Card>

        </div>

        <aside className="space-y-6">
          <Card>
            <h3 className="font-bold">Quick Glossary</h3>
            <ul className="mt-3 text-sm text-gray-700 space-y-2">
              <li><b>UI</b>: The look and layout — buttons, colors, text.</li>
              <li><b>UX</b>: The whole feeling — was it easy and fun?</li>
              <li><b>Micro-interaction</b>: Tiny animations that say "good job".</li>
              <li><b>Responsive</b>: Works on phones and tablets too.</li>
            </ul>
          </Card>

          <Card>
            <h3 className="font-bold">Tiny Quiz</h3>
            <div className="mt-2 text-sm">
              <p>Which part makes a button wiggle?</p>
              <div className="mt-2 flex gap-2">
                <button onClick={() => triggerCelebrate("🎉")} className="px-3 py-2 rounded bg-white shadow">A. Backend</button>
                <button onClick={() => triggerCelebrate("🎉")} className="px-3 py-2 rounded bg-white shadow">B. Frontend</button>
              </div>
            </div>
          </Card>

          <Card>
            <h3 className="font-bold">Tips for grown-ups</h3>
            <ul className="text-xs text-gray-600 mt-2 space-y-2">
              <li>Keep interactions simple and discoverable.</li>
              <li>Use clear labels and large tap targets for kids.</li>
              <li>Test on real devices and watch how children use it.</li>
            </ul>
          </Card>
        </aside>
      </section>

      {/* Footer CTA */}
      <footer className="max-w-7xl mx-auto mt-12 p-6 rounded-3xl bg-white/80 shadow-2xl flex flex-col md:flex-row items-center gap-4">
        <div>
          <h3 className="text-2xl font-extrabold">Ready to build a storefront?</h3>
          <p className="text-gray-600">Try changing the color, add decorations, then press the big glowing button to celebrate.</p>
        </div>

        <div className="ml-auto flex items-center gap-4">
          <Button onClick={() => triggerCelebrate()} className="bg-gradient-to-r from-rose-500 to-yellow-400 text-white font-extrabold">Let's Build the Magic ✨</Button>

          <Button onClick={() => { clearDecorations(); setThemeColor('#FFD1A6'); setShopOpen(true); }} className="bg-white">Reset</Button>
        </div>
      </footer>

      <style>{`
        .rounded-3xl { border-radius: 1.5rem; }
        .rounded-2xl { border-radius: 1rem; }
        .shadow-2xl { box-shadow: 0 25px 50px rgba(16,24,40,0.08); }
      `}</style>
    </div>
  );
}
