import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sun, Moon, Smile } from "lucide-react";

// UIUXShowcase.jsx
// Single-file React component showcasing an animated, content-rich explanation of UI vs UX.
// - Uses Tailwind CSS utility classes for styling
// - Uses Framer Motion for "wonder" animations
// - Responsive and accessible

export default function UIUXShowcase() {
  const [dark, setDark] = useState(false);
  const [flipped, setFlipped] = useState(false);
  const [confetti, setConfetti] = useState([]);
  const contentRef = useRef(null);

  useEffect(() => {
    // toggle body class for background (works if outer app uses Tailwind's dark mode via class)
    if (dark) document.documentElement.classList.add("dark");
    else document.documentElement.classList.remove("dark");
  }, [dark]);

  useEffect(() => {
    if (!flipped) return;
    // spawn a satisfying burst of confetti-like orbs
    const pieces = Array.from({ length: 18 }).map((_, i) => ({
      id: i,
      left: 20 + Math.random() * 60,
      delay: Math.random() * 0.12,
      size: 6 + Math.random() * 16,
      rotation: Math.random() * 360,
    }));
    setConfetti(pieces);
    const t = setTimeout(() => setConfetti([]), 1800);
    return () => clearTimeout(t);
  }, [flipped]);

  function scrollToContent() {
    contentRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  // Motion variants
  const container = {
    hidden: { opacity: 0, y: 12 },
    show: { opacity: 1, y: 0, transition: { staggerChildren: 0.06 } },
  };

  const fadeUp = {
    hidden: { opacity: 0, y: 8 },
    show: { opacity: 1, y: 0 },
  };

  const float = {
    animate: { y: [0, -12, 0], x: [0, 6, -6, 0], rotate: [0, 4, -4, 0] },
    transition: { repeat: Infinity, duration: 6, ease: "easeInOut" },
  };

  return (
    <main className={`min-h-screen transition-colors duration-500 ${dark ? "bg-slate-900 text-slate-100" : "bg-gradient-to-br from-pink-50 via-indigo-50 to-amber-50 text-slate-900"}`}>
      {/* Background floating orbs for wonder-vibes */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute -left-10 top-8 w-72 h-72 rounded-full bg-gradient-to-tr from-pink-300 via-indigo-400 to-amber-300 blur-3xl opacity-40"
          {...float}
        />
        <motion.div
          className="absolute right-0 -bottom-10 w-80 h-80 rounded-full bg-gradient-to-tr from-teal-200 via-cyan-300 to-indigo-400 blur-2xl opacity-30"
          animate={{ y: [0, -20, 0], x: [0, 8, -8, 0] }}
          transition={{ repeat: Infinity, duration: 8, ease: "easeInOut" }}
        />
      </div>

      <header className="max-w-6xl mx-auto px-6 py-8 relative z-10">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h1 className="text-3xl sm:text-4xl font-extrabold leading-tight tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 via-pink-500 to-amber-500">
              UI <span className="opacity-90">&</span> UX — The Magic of Design
            </h1>
            <p className="mt-2 text-sm sm:text-base text-slate-600 dark:text-slate-300 max-w-xl">
              Scroll down and click the demo. This interactive guide explains the difference between UI (look &amp; feel) and UX (the experience), with delightful animations and practical examples that make the ideas stick.
            </p>
            <div className="mt-4 flex gap-3">
              <button
                onClick={scrollToContent}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg shadow-md text-sm font-semibold bg-gradient-to-r from-indigo-600 to-pink-500 text-white hover:scale-105 transform transition"
              >
                <Smile size={18} /> Start exploring
              </button>

              <button
                onClick={() => setDark((d) => !d)}
                aria-pressed={dark}
                className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white/70 dark:bg-slate-700/60 backdrop-blur-sm text-sm"
                title="Toggle theme"
              >
                {dark ? <Sun size={16} /> : <Moon size={16} />} <span className="text-xs">{dark ? "Light" : "Dark"}</span>
              </button>
            </div>
          </div>

          <div className="hidden md:flex items-center gap-4">
            <animatedBadge label="Positive vibes" description="playful, optimistic color theme" />
            <animatedBadge label="Content-rich" description="definitions, analogies, examples" />
            <animatedBadge label="Highly animated" description="microinteractions & motion" />
          </div>
        </div>
      </header>

      <section ref={contentRef} className="max-w-6xl mx-auto px-6 pb-24 relative z-10">
        <motion.div initial="hidden" animate="show" variants={container} className="grid gap-8 md:grid-cols-2">
          {/* Left column: Definitions + Analogy + Demo */}
          <motion.article variants={fadeUp} className="space-y-6">
            <div className="p-6 rounded-2xl shadow-lg bg-white dark:bg-slate-800/60 backdrop-blur-sm">
              <h2 className="text-xl font-bold">What is UI vs UX?</h2>
              <p className="mt-3 text-slate-600 dark:text-slate-300">
                <strong>UI (User Interface)</strong> is the look and feel — the visual language, typography, color, spacing and the micro-interactions that make your product inviting.
              </p>
              <p className="mt-2 text-slate-600 dark:text-slate-300">
                <strong>UX (User Experience)</strong> is the overall journey — how the product behaves, how easy it is to achieve goals, the emotional arc from first touch to mastery.
              </p>
            </div>

            <div className="p-6 rounded-2xl shadow-lg bg-gradient-to-br from-indigo-50 via-pink-50 to-amber-50 dark:from-slate-800/40 dark:via-slate-800/30 dark:to-slate-900/30">
              <h3 className="font-semibold text-lg">A playful analogy</h3>
              <p className="mt-2 text-slate-700 dark:text-slate-300">
                Imagine a joke printed on a beautiful card:
              </p>
              <ul className="mt-3 ml-6 list-disc text-slate-700 dark:text-slate-300">
                <li><strong>UI</strong>: the design of the punchline card — fonts, color, the way the punchline is revealed.</li>
                <li><strong>UX</strong>: whether the joke makes you laugh, how surprising and satisfying the reveal is, and whether you'd tell it again.</li>
              </ul>

              <p className="mt-3 text-sm text-slate-600 dark:text-slate-300">The demo on the right is exactly that card — interact with it to feel the difference.</p>
            </div>

            <div className="p-6 rounded-2xl shadow-lg bg-white dark:bg-slate-800/60">
              <h3 className="text-lg font-semibold">Why both matter</h3>
              <p className="mt-2 text-slate-600 dark:text-slate-300">
                Great UI draws people in; great UX keeps them coming back. Design teams measure both: UI with visual polish and consistency; UX with task success rates, time-on-task, and emotional feedback.
              </p>
            </div>

            <div className="space-y-3">
              <h4 className="font-semibold">Quick takeaways</h4>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
                <li className="p-3 rounded-lg bg-gradient-to-r from-emerald-50 to-cyan-50">UI = clarity, consistency, hierarchy</li>
                <li className="p-3 rounded-lg bg-gradient-to-r from-yellow-50 to-orange-50">UX = ease, delight, accessibility</li>
                <li className="p-3 rounded-lg bg-gradient-to-r from-purple-50 to-pink-50">Microinteractions matter</li>
                <li className="p-3 rounded-lg bg-gradient-to-r from-sky-50 to-indigo-50">Test early and often</li>
              </ul>
            </div>
          </motion.article>

          {/* Right column: Joke Card demo + Examples */}
          <motion.aside variants={fadeUp} className="space-y-6">
            <div className="p-6 rounded-3xl shadow-2xl bg-white dark:bg-slate-800/60 relative overflow-hidden">
              <h3 className="font-bold text-lg">Interactive demo — The Joke Card</h3>
              <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">Click the card to reveal the punchline. Observe how UI (visuals) and UX (timing, surprise, motion) combine to make the moment delightful.</p>

              <div className="mt-6 flex items-center justify-center">
                <div className="w-full max-w-sm">
                  <div className="relative">
                    <motion.button
                      onClick={() => setFlipped((f) => !f)}
                      onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && setFlipped((f) => !f)}
                      aria-pressed={flipped}
                      aria-label="Reveal punchline"
                      className="w-full cursor-pointer"
                      style={{ perspective: 1200 }}
                    >
                      <motion.div
                        initial={false}
                        animate={{ rotateY: flipped ? 180 : 0 }}
                        transition={{ type: "spring", stiffness: 320, damping: 28 }}
                        className="relative rounded-2xl shadow-xl"
                        style={{ transformStyle: "preserve-3d" }}
                      >
                        {/* Front */}
                        <div
                          className="absolute inset-0 rounded-2xl p-6 bg-gradient-to-br from-indigo-600 to-pink-500 text-white flex flex-col justify-between"
                          style={{ backfaceVisibility: "hidden" }}
                        >
                          <div>
                            <div className="text-xs uppercase tracking-wide font-semibold opacity-90">Setup</div>
                            <h4 className="mt-2 font-extrabold text-2xl leading-tight">Why did the designer bring a ladder?</h4>
                            <p className="mt-3 text-sm opacity-90">(Tap to reveal the punchline — notice the soft shadows, spacing &amp; playful type.)</p>
                          </div>

                          <div className="mt-4 flex items-center justify-between">
                            <div className="text-sm">UI: polished visuals</div>
                            <div className="text-sm font-semibold">UX: delightful reveal</div>
                          </div>
                        </div>

                        {/* Back */}
                        <div
                          className="absolute inset-0 rounded-2xl p-6 bg-white dark:bg-slate-700/80 text-slate-900 dark:text-white flex flex-col justify-between"
                          style={{ transform: "rotateY(180deg)", backfaceVisibility: "hidden" }}
                        >
                          <div>
                            <div className="text-xs uppercase tracking-wide font-semibold text-indigo-600">Punchline</div>
                            <h4 className="mt-2 font-extrabold text-2xl leading-tight text-indigo-700 dark:text-indigo-300">Because they wanted to improve the "user landing"!</h4>
                            <p className="mt-3 text-sm opacity-90">A small pun and good timing — the surprise + the pleasant motion = solid UX.</p>
                          </div>

                          <div className="mt-4 flex items-center justify-between">
                            <div className="text-sm">Satisfaction: high</div>
                            <div className="text-sm font-semibold text-indigo-600">Share-worthy</div>
                          </div>
                        </div>
                      </motion.div>
                    </motion.button>

                    {/* Confetti Orbs */}
                    <AnimatePresence>
                      {confetti.map((c) => (
                        <motion.span
                          key={c.id}
                          initial={{ opacity: 0, y: 0, scale: 0.6 }}
                          animate={{ opacity: 1, y: -120 - Math.random() * 60, x: (Math.random() > 0.5 ? 1 : -1) * (20 + Math.random() * 120), rotate: 360 }}
                          exit={{ opacity: 0 }}
                          transition={{ delay: c.delay, duration: 1.6, ease: "easeOut" }}
                          className="pointer-events-none absolute rounded-full"
                          style={{ left: `${c.left}%`, bottom: 6, width: c.size, height: c.size, background: `linear-gradient(135deg, rgba(59,130,246,0.9), rgba(236,72,153,0.9))`, boxShadow: "0 6px 18px rgba(0,0,0,0.08)" }}
                        />
                      ))}
                    </AnimatePresence>

                  </div>

                  <div className="mt-4 flex gap-3">
                    <button
                      onClick={() => {
                        setFlipped(true);
                        setTimeout(() => setFlipped(false), 1600);
                      }}
                      className="flex-1 px-4 py-2 rounded-lg bg-indigo-600 text-white font-semibold shadow hover:scale-105 transform transition"
                    >
                      Try auto-reveal
                    </button>

                    <button
                      onClick={() => setFlipped(false)}
                      className="px-4 py-2 rounded-lg bg-white/60 dark:bg-slate-700/60 text-sm"
                    >
                      Reset
                    </button>
                  </div>
                </div>
              </div>

              <div className="mt-5 text-xs text-slate-500 dark:text-slate-300">Tip: good timing (animation easing &amp; duration) makes identical content feel dramatically better.</div>
            </div>

            <div className="p-6 rounded-2xl shadow-lg bg-white dark:bg-slate-800/60">
              <h4 className="font-semibold mb-3">Real-world examples</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <exampleCard title="Mobile App" ui="clean nav, tactile buttons" ux="fast onboarding, progressive disclosure" />
                <exampleCard title="E‑Commerce" ui="high-contrast CTAs, product cards" ux="frictionless checkout, clear trust signals" />
                <exampleCard title="Dashboard" ui="data visual hierarchy" ux="customizable views, fast search" />
                <exampleCard title="Onboarding" ui="friendly illustrations" ux="guided tasks & feedback" />
              </div>
            </div>

            <div className="p-6 rounded-2xl shadow-lg bg-gradient-to-r from-emerald-50 to-cyan-50 dark:bg-slate-800/40">
              <h4 className="font-semibold">Microinteractions & accessibility</h4>
              <p className="mt-2 text-sm text-slate-700 dark:text-slate-300">Microinteractions (button presses, loading states, subtle motion) are the heartbeat of delightful UX. Always pair them with accessibility — motion should be respectful: prefer reduced-motion settings in production.</p>
            </div>
          </motion.aside>
        </motion.div>

        {/* Timeline + Checklist */}
        <motion.div className="mt-12 grid gap-8 md:grid-cols-3">
          <motion.div variants={fadeUp} className="md:col-span-2 p-6 rounded-2xl shadow-lg bg-white dark:bg-slate-800/60">
            <h4 className="font-bold mb-4">A compact UX flow (how a good experience is built)</h4>
            <ol className="space-y-4">
              <li className="flex gap-4 items-start">
                <div className="mt-1 w-8 h-8 rounded-full bg-indigo-600 text-white flex items-center justify-center font-semibold">1</div>
                <div>
                  <div className="font-semibold">Research</div>
                  <div className="text-sm text-slate-600 dark:text-slate-300">Understand users: goals, pain points, context.</div>
                </div>
              </li>
              <li className="flex gap-4 items-start">
                <div className="mt-1 w-8 h-8 rounded-full bg-amber-400 text-slate-900 flex items-center justify-center font-semibold">2</div>
                <div>
                  <div className="font-semibold">Design (UI)</div>
                  <div className="text-sm text-slate-600 dark:text-slate-300">Visual language, components, responsive layouts.</div>
                </div>
              </li>
              <li className="flex gap-4 items-start">
                <div className="mt-1 w-8 h-8 rounded-full bg-emerald-400 text-slate-900 flex items-center justify-center font-semibold">3</div>
                <div>
                  <div className="font-semibold">Prototype & Test</div>
                  <div className="text-sm text-slate-600 dark:text-slate-300">Rapid prototypes, usability testing, iterate fast.</div>
                </div>
              </li>
              <li className="flex gap-4 items-start">
                <div className="mt-1 w-8 h-8 rounded-full bg-pink-400 text-white flex items-center justify-center font-semibold">4</div>
                <div>
                  <div className="font-semibold">Measure & Evolve</div>
                  <div className="text-sm text-slate-600 dark:text-slate-300">Analytics, surveys, and continuous design improvements.</div>
                </div>
              </li>
            </ol>
          </motion.div>

          <motion.aside variants={fadeUp} className="p-6 rounded-2xl shadow-lg bg-white dark:bg-slate-800/60">
            <h5 className="font-bold mb-3">Checklist (quick)</h5>
            <ul className="text-sm space-y-2">
              <li>✅ Visual hierarchy is clear</li>
              <li>✅ Buttons and CTAs are predictable</li>
              <li>✅ Feedback on every action</li>
              <li>✅ Motion respects reduced-motion prefs</li>
              <li>✅ Accessibility (contrast, keyboard, screen reader)</li>
            </ul>
          </motion.aside>
        </motion.div>
      </section>

      <footer className="max-w-6xl mx-auto px-6 py-8 text-sm text-slate-500 dark:text-slate-400">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-3">
          <div>Made with ✨ by your friendly design explainer — tweak colors, timing, and copy to match your brand.</div>
          <div className="text-xs">Tip: To reduce motion for sensitive users, check prefers-reduced-motion in CSS and disable heavy animations.</div>
        </div>
      </footer>
    </main>
  );
}


/* ---------------------- Helper components (inside same file for single-file deliverable) ---------------------- */

function animatedBadge({ label, description }) {
  // tiny visual badge used in header; exported as function to keep JSX concise
  return (
    <motion.div whileHover={{ y: -4 }} className="px-3 py-2 rounded-xl bg-white/70 dark:bg-slate-700/60 shadow text-xs">
      <div className="font-semibold">{label}</div>
      <div className="text-xs opacity-80">{description}</div>
    </motion.div>
  );
}

function exampleCard({ title, ui, ux }) {
  return (
    <motion.div whileHover={{ scale: 1.02 }} className="p-3 rounded-lg bg-white/60 dark:bg-slate-700/60 shadow-sm">
      <div className="font-semibold">{title}</div>
      <div className="text-xs mt-1 text-slate-600 dark:text-slate-300"><strong>UI:</strong> {ui}</div>
      <div className="text-xs text-slate-600 dark:text-slate-300"><strong>UX:</strong> {ux}</div>
    </motion.div>
  );
}
