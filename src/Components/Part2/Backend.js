import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Server, Database, Settings, Music, Headphones, Users, Speaker } from "lucide-react";

const Card = ({ children, className = "" }) => (
  <div className={`rounded-2xl shadow-lg bg-white p-6 ${className}`}>{children}</div>
);
const Button = ({ children, className = "", ...props }) => (
  <button
    {...props}
    className={`inline-flex items-center gap-2 px-4 py-2 rounded-2xl font-semibold shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 ${className}`}
  >
    {children}
  </button>
);

// --- Translations (English + Hindi) ---
const TEXT = {
  en: {
    title: "Backend Development",
    concept: "Building the server, database, and logic that works behind the scenes to power the frontend.",
    analogyShort: "Analogy: An orchestra — conductor, musicians, sheet music, and stage crew that make the show run.",
    analogyLong:
      "The backend is like an orchestra: the conductor (server) directs the musicians (services), the sheet music (database) holds the notes, and the crew (ops) makes sure the lights and instruments work. Together they create the final performance the audience (frontend) sees.",
    startMagic: "Start the Symphony",
    showAll: "Show All Sections",
    instruments: "Instruments (Services)",
    conductor: "Conductor (Server)",
    sheetMusic: "Sheet Music (Database)",
    stageCrew: "Stage Crew (Ops)",
    whyBackend: "Why Backend Matters",
    tips: "Tips for Building Backend",
    funFacts: "Fun Backend Facts",
    celebrate: "Celebrate Backend 🎉",
    languages: "Languages",
    open: "Open",
    close: "Close",
  },
  hi: {
    title: "बैकएंड डेवलपमेंट",
    concept: "सर्वर, डेटाबेस, और लॉजिक बनाना जो फ्रंटएंड को पीछे से पॉवर देता है।",
    analogyShort: "उपमा: एक ऑर्केस्ट्रा — कंडक्टर, वादक, शीट-म्यूजिक और स्टेज क्रू जो शो चलाते हैं।",
    analogyLong:
      "बैकएंड एक ऑर्केस्ट्रा की तरह है: कंडक्टर (सर्वर) वादकों (सर्विसेस) का निर्देशन करता है, शीट-म्यूजिक (डेटाबेस) ताल और नोट्स रखता है, और स्टेज क्रू (ऑप्स) सुनिश्चित करता है कि लाइट और उपकरण सही काम कर रहे हों। मिलकर वे वह परफॉर्मेंस बनाते हैं जिसे ऑडियंस (फ्रंटएंड) देखती है।",
    startMagic: "सिम्फनी शुरू करें",
    showAll: "सभी सेक्शन दिखाएँ",
    instruments: "वाद्य (सर्विसेस)",
    conductor: "कंडक्टर (सर्वर)",
    sheetMusic: "शीट-म्यूजिक (डेटाबेस)",
    stageCrew: "स्टेज क्रू (ऑप्स)",
    whyBackend: "बैकएंड क्यों मायने रखता है",
    tips: "बैकएंड बनाने के सुझाव",
    funFacts: "मज़ेदार तथ्य",
    celebrate: "बैकएंड का जश्न 🎉",
    languages: "भाषाएँ",
    open: "खोलें",
    close: "बंद करें",
  },
};

// --- Confetti ---
function Confetti({ active = false, count = 28 }) {
  const colors = ["#FF6B6B", "#FFD93D", "#6BE4A6", "#6BD3FF", "#A78BFA", "#FF9BB3"];
  const pieces = Array.from({ length: count }).map((_, i) => ({
    id: i,
    left: Math.random() * 100,
    delay: Math.random() * 0.6,
    rot: Math.random() * 360,
    size: Math.random() * 12 + 8,
    color: colors[Math.floor(Math.random() * colors.length)],
  }));

  return (
    <div className="pointer-events-none fixed inset-0 overflow-hidden z-50">
      <AnimatePresence>
        {active && (
          <div className="absolute inset-0">
            {pieces.map((p) => (
              <motion.div
                key={p.id}
                initial={{ opacity: 0, y: -20, x: `${p.left}%`, rotate: p.rot }}
                animate={{ opacity: [1, 1, 0], y: [0, 180 + Math.random() * 250], rotate: p.rot + 360 }}
                exit={{ opacity: 0 }}
                transition={{ delay: p.delay, duration: 1.8, ease: "easeOut" }}
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

// --- Orchestra Preview (interactive) ---
function OrchestraPreview({ locale, openParts = [] }) {
  const L = TEXT[locale];
  const parts = [
    { key: "conductor", title: L.conductor, icon: <Music size={18} /> },
    { key: "instruments", title: L.instruments, icon: <Headphones size={18} /> },
    { key: "sheet", title: L.sheetMusic, icon: <Database size={18} /> },
    { key: "crew", title: L.stageCrew, icon: <Settings size={18} /> },
  ];

  return (
    <motion.div className="relative w-full p-4 rounded-2xl shadow-2xl bg-gradient-to-br from-white/80 to-white/60">
      <h3 className="text-lg font-bold mb-3 flex items-center gap-2"><Server size={18} /> {L.analogyShort}</h3>

      <div className="grid grid-cols-1 gap-3">
        {parts.map((p, i) => {
          const isOpen = openParts.includes(p.key);
          return (
            <motion.div key={p.key} whileHover={{ scale: 1.02 }} className={`p-3 rounded-xl shadow-md ${isOpen ? 'bg-green-50' : 'bg-gray-50'}`}>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-500 text-white flex items-center justify-center">{p.icon}</div>
                <div>
                  <div className="font-semibold text-sm">{p.title}</div>
                  {isOpen && (
                    <motion.p initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }} className="text-xs text-gray-600 mt-2">
                      {p.key === "conductor" && (locale === 'hi' ?
                        "कंडक्टर सर्वर होता है — जो सभी वादकों को निर्देश देता है और समय पर सही नोट्स भेजता है।" :
                        "The conductor is the server — directing services and keeping time, ensuring everything happens when it should.")}

                      {p.key === "instruments" && (locale === 'hi' ?
                        "वाद्य सेवाएँ हैं — छोटे-छोटे प्रोग्राम जो गीत के हिस्से निभाते हैं (जैसे ऑथ, पेमेंट)।" :
                        "Instruments are the services — small programs playing parts of the song (like auth, payments).")}

                      {p.key === "sheet" && (locale === 'hi' ?
                        "शीट-म्यूजिक (डेटाबेस) सभी नोट्स और जानकारी रखता है ताकि वादक सही सुर में बजा सकें।" :
                        "The sheet music (database) keeps all the notes and information so the musicians play the right tune.")}

                      {p.key === "crew" && (locale === 'hi' ?
                        "स्टेज क्रू ऑप्स/डिप्लॉयमेंट है — वे पृष्ठभूमि में उपकरण लगाते और ठीक रखते हैं।" :
                        "The stage crew are ops/deployment — they set up instruments and keep the stage working behind-the-scenes.")}
                    </motion.p>
                  )}
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}

// --- Main: BackendOrchestra ---
export default function BackendDevelopment() {
  const [locale, setLocale] = useState('en');
  const L = TEXT[locale];

  const [showConfetti, setShowConfetti] = useState(false);
  const [openParts, setOpenParts] = useState([]);
  const audioRef = useRef(null);

  useEffect(() => {
    // initialize optional sound (guarded)
    if (typeof window !== 'undefined') {
      try {
        audioRef.current = new Audio('/sounds/symphony-chime.mp3');
        audioRef.current.volume = 0.6;
      } catch (e) {
        audioRef.current = null;
      }
    }
  }, []);

  useEffect(() => {
    let t;
    if (showConfetti) {
      if (audioRef.current) {
        const p = audioRef.current.play();
        if (p && p.catch) p.catch(() => {});
      }
      t = setTimeout(() => setShowConfetti(false), 1600);
    }
    return () => clearTimeout(t);
  }, [showConfetti]);

  const togglePart = (key) => {
    setOpenParts((prev) => (prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key]));
  };

  const openAll = () => setOpenParts(['conductor', 'instruments', 'sheet', 'crew']);
  const closeAll = () => setOpenParts([]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-orange-50 to-amber-50 p-6 md:p-12">
      <Confetti active={showConfetti} />

      <section className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
        <motion.header className="md:col-span-7 p-6 bg-white/80 rounded-3xl shadow-2xl backdrop-blur">
          <motion.div initial={{ opacity: 0, y: -18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className="flex items-start gap-4">
              <div className="p-3 rounded-3xl bg-gradient-to-br from-yellow-200 to-pink-200 shadow-md">
                <Music size={28} className="text-orange-600" />
              </div>
              <div>
                <h1 className="text-4xl md:text-5xl font-extrabold leading-tight">{L.title}</h1>
                <p className="text-gray-700 mt-3 max-w-xl">{L.concept}</p>
                <p className="text-sm text-gray-600 mt-3 italic">{L.analogyShort}</p>
              </div>
            </div>

            <div className="mt-6 flex gap-3 items-center">
              <div className="flex gap-2">
                <Button onClick={() => setShowConfetti(true)} className="bg-gradient-to-r from-orange-500 to-red-500 text-white">{L.celebrate}</Button>
                <Button onClick={openAll} className="bg-gradient-to-r from-green-400 to-emerald-500 text-white">{L.showAll}</Button>
              </div>

              <div className="ml-auto flex items-center gap-3">
                <label className="text-sm text-gray-600 mr-2">{TEXT[locale].languages}:</label>
                <select
                  aria-label="Select language"
                  value={locale}
                  onChange={(e) => setLocale(e.target.value)}
                  className="rounded px-2 py-1 border"
                >
                  <option value="en">English</option>
                  <option value="hi">हिन्दी</option>
                </select>
              </div>
            </div>

            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Card>
                <h3 className="font-bold">{L.conductor}</h3>
                <p className="text-sm text-gray-600 mt-2">{locale === 'hi' ? 'कंडक्टर सर्वर है — वह अनुरोधों का निर्देशन करता है और सेवाओं को बताता है कब बजना है।' : 'The conductor (server) directs requests and tells services when to play their part.'}</p>
                <div className="mt-3 flex gap-2">
                  <Button onClick={() => togglePart('conductor')} className="bg-white text-gray-700 text-sm">{openParts.includes('conductor') ? L.close : L.open}</Button>
                </div>
              </Card>

              <Card>
                <h3 className="font-bold">{L.instruments}</h3>
                <p className="text-sm text-gray-600 mt-2">{locale === 'hi' ? 'वाद्य छोटे-छोटे सर्विसेस हैं — वे ऑथ, पेमेंट और नोटिफिकेशन जैसे काम करते हैं।' : 'Instruments are services — they handle auth, payments, notifications and more.'}</p>
                <div className="mt-3 flex gap-2">
                  <Button onClick={() => togglePart('instruments')} className="bg-white text-gray-700 text-sm">{openParts.includes('instruments') ? L.close : L.open}</Button>
                </div>
              </Card>

              <Card>
                <h3 className="font-bold">{L.sheetMusic}</h3>
                <p className="text-sm text-gray-600 mt-2">{locale === 'hi' ? 'शीट-म्यूजिक डेटाबेस है — इसमें सारे नोट्स और रिकॉर्ड्स को सुरक्षित रखा जाता है।' : 'The sheet music is the database — it stores all the notes and records.'}</p>
                <div className="mt-3 flex gap-2">
                  <Button onClick={() => togglePart('sheet')} className="bg-white text-gray-700 text-sm">{openParts.includes('sheet') ? L.close : L.open}</Button>
                </div>
              </Card>

              <Card>
                <h3 className="font-bold">{L.stageCrew}</h3>
                <p className="text-sm text-gray-600 mt-2">{locale === 'hi' ? 'स्टेज क्रू ऑप्स और डिप्लॉयमेंट है — वे सबकुछ चालू और सुरक्षित रखते हैं।' : 'Stage crew are ops/deployments — they keep everything running and secure.'}</p>
                <div className="mt-3 flex gap-2">
                  <Button onClick={() => togglePart('crew')} className="bg-white text-gray-700 text-sm">{openParts.includes('crew') ? L.close : L.open}</Button>
                </div>
              </Card>
            </div>
          </motion.div>
        </motion.header>

        <aside className="md:col-span-5 p-4 rounded-3xl shadow-lg bg-white/60 backdrop-blur">
          <OrchestraPreview locale={locale} openParts={openParts} />
          <div className="mt-4 grid grid-cols-2 gap-2">
            <Button onClick={() => { setShowConfetti(true); }} className="bg-white text-gray-700 text-xs">{L.celebrate}</Button>
            <Button onClick={closeAll} className="bg-white text-gray-700 text-xs">{locale === 'hi' ? 'सभी बंद करें' : 'Close All'}</Button>
          </div>
        </aside>
      </section>

      {/* Deep-dive sections */}
      <section className="max-w-7xl mx-auto mt-12 grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card>
          <h3 className="font-bold text-lg">{L.whyBackend}</h3>
          <p className="mt-2 text-sm text-gray-700">{locale === 'hi' ? 'बैकएंड वह हिस्सा है जो डेटा संभालता है, सुरक्षा करता है और लॉजिक चलाता है। यह फ्रंटएंड को वह सब देता है जो देखने में आता है।' : 'Backend handles data, security, and logic. It gives the frontend what it needs to show and interact.'}</p>
        </Card>

        <Card>
          <h3 className="font-bold text-lg">{L.tips}</h3>
          <ul className="mt-2 text-sm text-gray-700 space-y-2">
            <li>{locale === 'hi' ? 'मॉड्यूलर सर्विसेस बनाएं (छोटे वादक).' : 'Build modular services (small musicians).'}</li>
            <li>{locale === 'hi' ? 'डेटा को व्यवस्थित रखें (शीट-म्यूजिक साफ रखें).' : 'Keep data organized (keep sheet music clean).'}</li>
            <li>{locale === 'hi' ? 'ऑटोमेट करें और बैकअप रखें (दूसरा मैनुअल कॉपी).' : 'Automate and backup (keep a spare copy).'} </li>
            <li>{locale === 'hi' ? 'सुरक्षा और पहुंच नियंत्रण का ध्यान रखें.' : 'Mind security and access control.'}</li>
          </ul>
        </Card>

        <Card>
          <h3 className="font-bold text-lg">{L.funFacts}</h3>
          <ul className="mt-2 text-sm text-gray-700 space-y-2">
            <li>{locale === 'hi' ? 'कई बड़े सिस्टम्स में हज़ारों सर्विसेस साथ मिलकर काम करते हैं।' : 'Many large systems run thousands of services together.'}</li>
            <li>{locale === 'hi' ? 'API वेटर की तरह होते हैं — वे ऑर्डर ले कर किचन तक पहुँचाते हैं।' : 'APIs are like waiters — they deliver requests to the kitchen.'}</li>
            <li>{locale === 'hi' ? 'रोलबैक संभव है: बदलाव गलत हो तो पुरानी सीट पर वापस जाएँ।' : 'Rollbacks let you return to a previous state if an update breaks things.'}</li>
          </ul>
        </Card>
      </section>

      {/* Footer CTA */}
      <footer className="max-w-7xl mx-auto mt-12 p-6 rounded-3xl bg-white/80 shadow-2xl flex flex-col md:flex-row items-center gap-4">
        <div>
          <h3 className="text-2xl font-extrabold">{L.title} — {locale === 'hi' ? 'ऑर्केस्ट्रा उपमा' : 'Orchestra Analogy'}</h3>
          <p className="text-gray-600">{locale === 'hi' ? 'कंडक्टर, वादक, शीट-म्यूजिक और स्टेज क्रू मिलकर एक सुन्दर परफॉर्मेंस बनाते हैं।' : 'Conductor, musicians, sheet music and crew make a beautiful performance together.'}</p>
        </div>

        <div className="ml-auto flex items-center gap-4">
          <Button onClick={() => setShowConfetti(true)} className="bg-gradient-to-r from-rose-500 to-yellow-400 text-white font-extrabold">{L.startMagic}</Button>
          <Button onClick={() => { setLocale(locale === 'en' ? 'hi' : 'en'); }} className="bg-white">{locale === 'en' ? 'हिन्दी में देखें' : 'View in English'}</Button>
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
