import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import {
  FaGift,
  FaTag,
  FaBookOpen,
  FaCodeBranch,
  FaDownload,
  FaPlay,
  FaClipboard,
  FaBalanceScale,
  FaUserSecret,
  FaSearch,
  FaLightbulb,
  FaCopy,
} from "react-icons/fa";
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip } from "recharts";

// LicensingModule.jsx
// Single-file React component (Tailwind + Framer Motion + Recharts + react-icons)
// Topic: Freeware, Shareware, & Open Source
// Features:
// - Bilingual (English / Hindi) toggle
// - Animated title, SVG food/recipe analogy animation
// - Sections: Concept, Analogy, Why needed, Pros/Cons, How professionals use them, Tools & Platforms, Examples
// - Interactive selector (Freeware / Shareware / Open Source) with animated cards and example lists
// - Sample chart comparing Cost vs SourceAccess vs Community
// - Copyable license/snippet examples and Usage notes

const SAMPLE_LICENSE_SNIPPETS = {
  freeware: `// Freeware: Informal distribution
// No cost to use. Source usually closed.
// Example: proprietary free tool binary distribution.
`,
  shareware: `// Shareware: Try before you buy
// Time-limited or feature-limited trial; payment unlocks full features.
// Example: show a trial notice and purchase flow.
`,
  opensource: `// Open Source: Source code available
// Common licenses: MIT, Apache 2.0, GPL
// Example: package.json with repository and license fields.
{
  "name": "my-project",
  "license": "MIT",
  "repository": "https://github.com/you/my-project"
}
`,
};

const COMPARISON = [
  { name: "Cost", Freeware: 0, Shareware: 50, OpenSource: 10 },
  { name: "Source Access", Freeware: 10, Shareware: 20, OpenSource: 90 },
  { name: "Community", Freeware: 20, Shareware: 10, OpenSource: 85 },
];

const PIE = [
  { name: "Freeware", value: 35 },
  { name: "Shareware", value: 25 },
  { name: "Open Source", value: 40 },
];
const COLORS = ["#34D399", "#FBBF24", "#60A5FA"];

const bilingual = {
  en: {
    title: "Freeware, Shareware & Open Source",
    subtitle: "Different distribution models: free to use, try-before-buy, or source-shared." ,
    concept:
      "Different models for distributing software based on cost, licensing, and access to source code. Each model serves different user and business needs.",
    analogy: "Different ways to share food: giving it away, offering a free sample, or sharing the recipe.",
    why: [
      "Clarifies how software can be used and redistributed.",
      "Helps users choose based on cost, transparency, and flexibility.",
      "Guides developers & businesses on monetization and collaboration.",
    ],
    pros: [
      "Freeware: low barrier to adoption.",
      "Shareware: allows try-before-buy conversion.",
      "Open Source: transparency, collaboration, and long-term sustainability.",
    ],
    cons: [
      "Freeware: limited control, often closed-source.",
      "Shareware: can frustrate users with nags or limits.",
      "Open Source: may need maintenance and clear licensing to monetize.",
    ],
    how: [
      "Decide goals: adoption, revenue, community building.",
      "Choose license: permissive (MIT) vs copyleft (GPL) vs proprietary terms.",
      "Prepare distribution: binaries, installers, package registries.",
      "Provide docs, contribution guidelines, and support channels.",
    ],
    tools: [
      "Distribution: GitHub Releases, npm, PyPI, Homebrew",
      "Monetization: Gumroad, FastSpring, License keys",
      "Community: GitHub Issues, Discussions, Discord",
    ],
    examples: {
      freeware: ["Skype (classic examples of free clients)", "Some utility tools free to use"],
      shareware: ["WinRAR (trial with nag), many desktop apps offering trial periods"],
      opensource: ["Linux, VS Code (OSS core), Blender, React (library)"],
    },
    selectLabel: "Select model",
    copySnippet: "Copy snippet",
    quickChecklist: "Quick checklist",
    usageNotes: "Usage & Notes",
  },
  hi: {
    title: "Freeware, Shareware और Open Source",
    subtitle: "विभिन्न वितरण मॉडल: मुफ्त उपयोग, ट्रायल-फिर-खरीद, या स्रोत-साझा।",
    concept: "लाइसेंसिंग और स्रोत कोड की पहुंच के आधार पर सॉफ़्टवेयर वितरित करने के अलग-अलग मॉडल। हर मॉडल अलग उपयोगकर्ता और व्यापार ज़रूरतें पूरा करता है।",
    analogy: "खाना बाँटने के अलग तरीके: मुफ्त दे देना, स्वाद चखाना, या रेसिपी साझा करना।",
    why: [
      "इस्तेमाल और पुनर्वितरण के नियम स्पष्ट होते हैं।",
      "उपयोगकर्ता लागत, पारदर्शिता और लचीलापन के आधार पर चुन सकते हैं।",
      "डेवलपर और व्यवसाय के लिए मोनेटाइज़ेशन और सहयोग के मार्ग दिखते हैं।",
    ],
    pros: [
      "Freeware: अपनाने में आसानी।",
      "Shareware: ट्रायल से खरीदारी तक कन्वर्ज़न का मौका।",
      "Open Source: पारदर्शिता, सहयोग, दीर्घकालिक स्थिरता।",
    ],
    cons: [
      "Freeware: अक्सर closed-source और सीमित नियंत्रण।",
      "Shareware: nagging/लिमिट्स प्रयोगकर्ता को परेशान कर सकते हैं।",
      "Open Source: रखरखाव और क्लियर लाइसेंसिंग की आवश्यकता।",
    ],
    how: [
      "लक्ष्य तय करें: अपनाना, राजस्व, या कम्युनिटी निर्माण।",
      "लाइसेंस चुनें: permissive (MIT) बनाम copyleft (GPL) बनाम proprietary।",
      "डिस्ट्रीब्यूशन तैयार करें: binaries, installers, package registries।",
      "डॉक्स, योगदान दिशानिर्देश, और सपोर्ट चैनल दें।",
    ],
    tools: [
      "वितरण: GitHub Releases, npm, PyPI, Homebrew",
      "मोनिटाइज़ेशन: Gumroad, FastSpring, License keys",
      "कम्युनिटी: GitHub Issues, Discussions, Discord",
    ],
    examples: {
      freeware: ["Skype (कभी-कभी के उदाहरण)", "कई छोटे उपयोगिता टूल्स"],
      shareware: ["WinRAR (ट्रायल), कई डेस्कटॉप ऐप्स जो ट्रायल देते हैं"],
      opensource: ["Linux, VS Code (OSS कोर), Blender, React (लाइब्रेरी)"],
    },
    selectLabel: "मॉडल चुनें",
    copySnippet: "स्निपेट कॉपी करें",
    quickChecklist: "त्वरित चेकलिस्ट",
    usageNotes: "उपयोग और नोट्स",
  },
};

export default function LicensingModule() {
  const [lang, setLang] = useState("en");
  const t = bilingual[lang];

  const [selected, setSelected] = useState("opensource");
  const [copied, setCopied] = useState(false);

  const chartData = PIE;

  function selectModel(m) {
    setSelected(m);
    // small micro-animation hook could be used
  }

  function copySnippet() {
    const txt = SAMPLE_LICENSE_SNIPPETS[selected];
    navigator.clipboard
      .writeText(txt)
      .then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 1800);
      })
      .catch(() => {});
  }

  return (
    <div className="p-6 md:p-10 lg:p-14 bg-gradient-to-b from-emerald-50 to-white min-h-screen">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 0.36 }} className="bg-white/80 p-2 rounded-lg shadow">
              <FaBookOpen className="w-6 h-6 text-emerald-600" />
            </motion.div>
            <div>
              <motion.h1 initial={{ y: -8, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.05 }} className="text-2xl md:text-3xl font-extrabold text-emerald-800">
                {t.title}
              </motion.h1>
              <motion.p initial={{ y: -6, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="text-sm text-emerald-600">
                {t.subtitle}
              </motion.p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="text-xs text-slate-600 mr-1">EN / HI</div>
            <div className="inline-flex rounded-full bg-white/70 p-1 shadow">
              <button onClick={() => setLang("en")} className={`px-3 py-1 rounded-full text-sm font-medium ${lang === "en" ? "bg-emerald-600 text-white" : "text-slate-700"}`}>EN</button>
              <button onClick={() => setLang("hi")} className={`px-3 py-1 rounded-full text-sm font-medium ${lang === "hi" ? "bg-emerald-600 text-white" : "text-slate-700"}`}>HI</button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <motion.div initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.05 }} className="bg-white rounded-2xl p-6 shadow">
              <h3 className="text-lg font-semibold flex items-center gap-3"><FaLightbulb className="w-5 h-5 text-emerald-500" /> {lang === "en" ? "Concept" : "संकल्पना"}</h3>
              <p className="mt-3 text-slate-700">{t.concept}</p>

              <div className="mt-6 grid md:grid-cols-2 gap-4">
                <div>
                  <h4 className="text-sm font-medium text-slate-600">{lang === "en" ? "Analogy" : "उपमा"}</h4>
                  <p className="mt-2 text-slate-700">{t.analogy}</p>

                  <h4 className="text-sm font-medium text-slate-600 mt-4">{lang === "en" ? "Why needed" : "क्यों ज़रूरी है"}</h4>
                  <ul className="mt-2 list-disc list-inside text-slate-700">{t.why.map((w, i) => (<li key={i}>{w}</li>))}</ul>
                </div>

                <div>
                  <h4 className="text-sm font-medium text-slate-600">{lang === "en" ? "Pros" : "फ़ायदे"}</h4>
                  <ul className="mt-2 list-disc list-inside text-slate-700">{t.pros.map((p, i) => (<li key={i}>{p}</li>))}</ul>

                  <h4 className="text-sm font-medium text-slate-600 mt-4">{lang === "en" ? "Cons" : "नुकसान"}</h4>
                  <ul className="mt-2 list-disc list-inside text-slate-700">{t.cons.map((c, i) => (<li key={i}>{c}</li>))}</ul>
                </div>
              </div>

              <div className="mt-6">
                <h4 className="text-sm font-medium text-slate-600">{lang === "en" ? "How professionals choose & use" : "प्रोफेशनल कैसे चुनते और उपयोग करते हैं"}</h4>
                <ol className="mt-3 list-decimal list-inside text-slate-700">{t.how.map((s, i) => (<li key={i} className="py-1">{s}</li>))}</ol>
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.08 }} className="bg-white rounded-2xl p-6 shadow">
              <h3 className="text-lg font-semibold flex items-center gap-3"><FaTag className="w-5 h-5 text-emerald-600" /> {lang === "en" ? "Tools & Distribution" : "उपकरण और वितरण"}</h3>
              <p className="mt-2 text-slate-700">{lang === "en" ? "Platforms commonly used to distribute software:" : "सॉफ़्टवेयर वितरित करने के लिए सामान्य प्लेटफ़ॉर्म:"}</p>

              <ul className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-2 text-slate-700">
                {t.tools.map((tool, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <span className="w-8 h-8 flex items-center justify-center bg-emerald-50 rounded-full"><FaDownload className="w-4 h-4 text-emerald-600" /></span>
                    <div>
                      <div className="text-sm font-medium">{tool}</div>
                      <div className="text-xs text-slate-500 mt-1">{idx % 2 === 0 ? (lang === "en" ? "Distribution" : "वितरण") : (lang === "en" ? "Community" : "कम्युनिटी")}</div>
                    </div>
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }} className="bg-white rounded-2xl p-6 shadow">
              <h3 className="text-lg font-semibold flex items-center gap-3"><FaCodeBranch className="w-5 h-5 text-emerald-600" /> {lang === "en" ? "Examples" : "उदाहरण"}</h3>
              <div className="mt-3 grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className={`p-4 rounded-lg border ${selected === 'freeware' ? 'border-emerald-300 bg-emerald-50' : 'border-slate-100'} cursor-pointer`} onClick={() => selectModel('freeware')}>
                  <div className="flex items-center gap-3">
                    <FaGift className="w-5 h-5 text-green-500" /> <div className="font-semibold">{lang === 'en' ? 'Freeware' : 'Freeware'}</div>
                  </div>
                  <ul className="mt-3 text-slate-700 text-sm">
                    {t.examples.freeware.map((ex, i) => (<li key={i}>{ex}</li>))}
                  </ul>
                </div>

                <div className={`p-4 rounded-lg border ${selected === 'shareware' ? 'border-amber-300 bg-amber-50' : 'border-slate-100'} cursor-pointer`} onClick={() => selectModel('shareware')}>
                  <div className="flex items-center gap-3">
                    <FaPlay className="w-5 h-5 text-amber-500" /> <div className="font-semibold">{lang === 'en' ? 'Shareware' : 'Shareware'}</div>
                  </div>
                  <ul className="mt-3 text-slate-700 text-sm">
                    {t.examples.shareware.map((ex, i) => (<li key={i}>{ex}</li>))}
                  </ul>
                </div>

                <div className={`p-4 rounded-lg border ${selected === 'opensource' ? 'border-sky-300 bg-sky-50' : 'border-slate-100'} cursor-pointer`} onClick={() => selectModel('opensource')}>
                  <div className="flex items-center gap-3">
                    <FaBookOpen className="w-5 h-5 text-sky-500" /> <div className="font-semibold">{lang === 'en' ? 'Open Source' : 'Open Source'}</div>
                  </div>
                  <ul className="mt-3 text-slate-700 text-sm">
                    {t.examples.opensource.map((ex, i) => (<li key={i}>{ex}</li>))}
                  </ul>
                </div>
              </div>

              <div className="mt-4 bg-slate-50 p-3 rounded">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="text-xs text-slate-500">{lang === 'en' ? 'Selected model' : 'चुना हुआ मॉडल'}</div>
                    <div className="text-sm font-medium mt-1">{selected === 'freeware' ? (lang === 'en' ? 'Freeware' : 'Freeware') : selected === 'shareware' ? (lang === 'en' ? 'Shareware' : 'Shareware') : (lang === 'en' ? 'Open Source' : 'Open Source')}</div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button onClick={copySnippet} className="inline-flex items-center gap-2 px-3 py-1 rounded-md border text-slate-700 hover:bg-slate-100"><FaCopy /> <span className="text-xs">{t.copySnippet}</span></button>
                    <div className="text-xs text-slate-500">{copied ? (lang === 'en' ? 'Copied!' : 'कॉपी हुआ!') : ''}</div>
                  </div>
                </div>

                <pre className="mt-3 whitespace-pre-wrap text-xs text-slate-800">{SAMPLE_LICENSE_SNIPPETS[selected]}</pre>
              </div>
            </motion.div>
          </div>

          <div className="space-y-6">
            <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.08 }} className="bg-white rounded-2xl p-6 shadow">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="bg-emerald-50 p-2 rounded-md"><FaBalanceScale className="text-emerald-600 w-5 h-5" /></div>
                  <div>
                    <div className="text-sm font-medium">{lang === 'en' ? 'Interactive Comparison' : 'इंटरैक्टिव तुलना'}</div>
                    <div className="text-xs text-slate-500">{lang === 'en' ? 'Compare Cost vs Source Access vs Community' : 'लागत बनाम स्रोत पहुँच बनाम समुदाय की तुलना करें'}</div>
                  </div>
                </div>

                <div className="text-xs text-slate-500">{lang === 'en' ? 'Sample data' : 'नमूना डेटा'}</div>
              </div>

              <div className="w-full h-44 mt-3">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={chartData} dataKey="value" innerRadius={28} outerRadius={48} paddingAngle={4}>
                      {chartData.map((entry, i) => (<Cell key={`c-${i}`} fill={COLORS[i % COLORS.length]} />))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>

              <div className="mt-4 text-xs text-slate-600">
                {lang === 'en' ? 'Tip: Open Source heavily favors source access and community. Shareware balances trial & revenue. Freeware emphasizes free adoption.' : 'टिप: Open Source स्रोत पहुँच और समुदाय को प्राथमिकता देता है। Shareware ट्रायल और राजस्व का संतुलन रखता है। Freeware अपनाने में आसानी देता है।'}
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="bg-white rounded-2xl p-6 shadow">
              <h4 className="text-sm font-medium text-slate-700">{t.quickChecklist}</h4>
              <ul className="mt-3 text-slate-700">
                <li className="py-1 flex items-start gap-2"><FaSearch className="w-4 h-4 text-emerald-500 mt-1" /> {lang === 'en' ? 'Decide goals: adoption, revenue, or collaboration.' : 'लक्ष्य तय करें: अपनाना, राजस्व, या सहयोग।'}</li>
                <li className="py-1 flex items-start gap-2"><FaUserSecret className="w-4 h-4 text-emerald-500 mt-1" /> {lang === 'en' ? 'Pick a clear license and document usage rights.' : 'एक स्पष्ट लाइसेंस चुनें और उपयोग के अधिकार डाक्यूमेंट करें।'}</li>
                <li className="py-1 flex items-start gap-2"><FaClipboard className="w-4 h-4 text-emerald-500 mt-1" /> {lang === 'en' ? 'Provide contribution guidelines and support channels.' : 'योगदान दिशानिर्देश और सपोर्ट चैनल प्रदान करें।'}</li>
              </ul>
            </motion.div>

            <div className="text-xs text-slate-400">{lang === 'en' ? 'Ready to drop into Tailwind + React project.' : 'Tailwind + React प्रोजेक्ट में जोड़ने के लिए तैयार।'}</div>
          </div>
        </div>

        <div className="mt-8 bg-white rounded-2xl p-6 shadow">
          <h4 className="font-semibold text-slate-700 mb-2">{t.usageNotes}</h4>
          <div className="text-sm text-slate-600">
            <p>{lang === 'en' ? '1) Copy this file into your React project (e.g., src/components/LicensingModule.jsx).' : '1) इस फ़ाइल को अपने React प्रोजेक्ट में कॉपी करें (उदा., src/components/LicensingModule.jsx)।'}</p>
            <p className="mt-2">{lang === 'en' ? '2) Install dependencies: framer-motion, react-icons, recharts. Ensure Tailwind is configured.' : '2) निर्भरता स्थापित करें: framer-motion, react-icons, recharts। Tailwind कॉन्फ़िगर करें।'}</p>
            <pre className="mt-3 bg-slate-50 p-3 rounded text-xs text-slate-700">{`npm install framer-motion react-icons recharts --save
# or
# yarn add framer-motion react-icons recharts`}</pre>
            <p className="mt-3">{lang === 'en' ? '3) Optional: Replace example lists and snippets with your project-specific licenses and distribution notes.' : '3) वैकल्पिक: उदाहरण सूचियों और स्निपेट को अपने प्रोजेक्ट-विशिष्ट लाइसेंस और वितरण नोट्स से बदलें।'}</p>
            <p className="mt-3 text-xs text-slate-500">{lang === 'en' ? 'Happy sharing — choose the right model for your goals.' : 'शेयरिंग के लिए शुभकामनाएँ — अपने लक्ष्य के लिए सही मॉडल चुनें।'}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
