import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import {
  FaDownload,
  FaSyncAlt,
  FaTools,
  FaRocket,
  FaClipboard,
  FaCheckCircle,
  FaExclamationTriangle,
  FaCogs,
  FaServer,
  FaBoxes,
  FaCloudDownloadAlt,
  FaPlay,
  FaCopy,
} from "react-icons/fa";
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip } from "recharts";

const SAMPLE_INSTALL_SNIPPET = `# Example install script (Linux)
# Install dependencies, build, and run
sudo apt update && sudo apt install -y nodejs npm
git clone https://github.com/you/your-app.git
cd your-app
npm install
npm run build
npm start
`;

const UPDATE_POLICY_SNIPPET = `# Example update policy (short)
- Security patches: apply within 48 hours of release
- Minor bugs/feature releases: schedule weekly
- Major releases: test on staging, deploy during maintenance window
- Rollback plan: maintain previous deployment artifacts for 72 hours
`;

const PIE_DATA = [
  { name: "Security Patches", value: 50 },
  { name: "Minor Updates", value: 30 },
  { name: "Major Releases", value: 20 },
];
const COLORS = ["#ef4444", "#f59e0b", "#10b981"];

const bilingual = {
  en: {
    title: "Software — Installation & Updates",
    subtitle: "Installing software correctly and keeping it updated with patches and releases.",
    concept:
      "The full lifecycle of getting software onto machines (installation) and keeping it up-to-date (updates/patches) to add features, fix bugs, and close security holes.",
    analogy: "Like assembling furniture, then tightening screws and replacing worn parts over time.",
    why: [
      "Security: timely patches mitigate vulnerabilities.",
      "Reliability: updates fix bugs and improve stability.",
      "New features: updates deliver improvements to users.",
    ],
    pros: ["Improves security posture.", "Delivers bug fixes and features.", "Keeps ecosystems healthy and maintainable."],
    cons: [
      "Updates can introduce regressions if not tested.",
      "Installation complexity across platforms.",
      "User disruption if updates are poorly timed.",
    ],
    how: [
      "Package managers and installers (apt, yum, npm, pip, installer bundles).",
      "Use staging environments to test updates before production.",
      "Automate with CI/CD: build artifacts, run tests, and deploy updates.",
      "Use versioning and rollback strategies (canary, blue/green, feature flags).",
      "Monitor after update and have incident response ready.",
    ],
    tools: [
      "Package managers: apt, brew, npm, pip",
      "Containerization: Docker, container registries",
      "Configuration management: Ansible, Chef, Puppet",
      "CI/CD: GitHub Actions, GitLab CI, Jenkins",
      "Update frameworks: Sparkle (mac), WinGet, MSIX, Squirrel",
    ],
    examples: [
      "Student: installing VS Code or Node.js and keeping it updated via package manager.",
      "Project: CI pipeline builds artifacts and deploys to staging; scheduled security patch job applies updates to production during maintenance window.",
    ],
    installLabel: "Run Install",
    checkUpdates: "Check for Updates",
    applyUpdate: "Apply Update",
    copyInstall: "Copy install snippet",
    copyPolicy: "Copy update policy",
    updateChartLabel: "Update Types (sample)",
    quickChecklist: "Quick checklist",
  },
  hi: {
    title: "सॉफ़्टवेयर — इंस्टॉलेशन और अपडेट्स",
    subtitle: "सॉफ़्टवेयर को सही तरीके से इंस्टॉल करना और पैच व रिलीज़ के ज़रिये उसे अपडेट रखना।",
    concept:
      "सॉफ़्टवेयर को मशीनों पर स्थापित करने (इंस्टॉलेशन) और उसे नवीनतम रखने (अपडेट/पैच) की पूरी प्रक्रिया — फीचर जोड़ना, बग ठीक करना और सुरक्षा कमजोरियों को बंद करना।",
    analogy: "किसी फ़र्नीचर की असेंबली करना, फिर समय-समय पर स्क्रू कसना और घिसे हुए पार्ट बदलना।",
    why: [
      "सुरक्षा: समय पर पैच से कमज़ोरियाँ बंद होती हैं।",
      "विश्वसनीयता: अपडेट बग्स को ठीक करते हैं और स्थिरता बढ़ाते हैं।",
      "नए फ़ीचर: अपडेट उपयोगकर्ताओं को सुधार देते हैं।",
    ],
    pros: ["सुरक्षा स्थिति में सुधार।", "बग फिक्स और नए फ़ीचर मिलते हैं।", "इकोसिस्टम में दीर्घकालिक स्थिरता आती है।"],
    cons: [
      "यदि ठीक से टेस्ट न करें तो अपडेट regressions ला सकते हैं।",
      "विभिन्न प्लेटफ़ॉर्म पर इंस्टॉलेशन जटिल हो सकता है।",
      "यदि खराब समय पर किए जाएं तो उपयोगकर्ता प्रभावित हो सकते हैं।",
    ],
    how: [
      "पैकेज मैनेजर और इंस्टॉलर का उपयोग (apt, yum, npm, pip, installer bundles)।",
      "स्टेजिंग पर्यावरण में अपडेट का परीक्षण करें।",
      "CI/CD से ऑटोमेट करें: बिल्ड, टेस्ट और डिप्लॉय।",
      "वर्ज़निंग और रोलबैक रणनीतियाँ उपयोग करें (canary, blue/green, feature flags)।",
      "अपडेट के बाद मॉनिटर करें और incident response तैयार रखें।",
    ],
    tools: [
      "पैकेज मैनेजर: apt, brew, npm, pip",
      "कंटेनरीकरण: Docker, container registry",
      "कॉन्फ़िगरेशन मैनेजमेंट: Ansible, Chef, Puppet",
      "CI/CD: GitHub Actions, GitLab CI, Jenkins",
      "अपडेट फ्रेमवर्क: Sparkle (mac), WinGet, MSIX, Squirrel",
    ],
    examples: [
      "छात्र: VS Code या Node.js इंस्टॉल करना और पैकेज मैनेजर से अपडेट रखना।",
      "प्रोजेक्ट: CI पाइपलाइन आर्टिफैक्ट बनाती है और स्टेजिंग पर डिप्लॉय करती है; शेड्यूल्ड सिक्योरिटी पैच प्रोडक्शन में लागू होते हैं।",
    ],
    installLabel: "इंस्टॉल चलाएँ",
    checkUpdates: "अपडेट जांचें",
    applyUpdate: "अपडेट लागू करें",
    copyInstall: "इंस्टॉल स्निपेट कॉपी करें",
    copyPolicy: "अपडेट पॉलिसी कॉपी करें",
    updateChartLabel: "अपडेट प्रकार (नमूना)",
    quickChecklist: "त्वरित चेकलिस्ट",
  },
};

export default function InstallModule() {
  const [lang, setLang] = useState("en");
  const t = bilingual[lang];

  // install simulation
  const [installing, setInstalling] = useState(false);
  const [installProgress, setInstallProgress] = useState(0);
  const [installSuccess, setInstallSuccess] = useState(null);
  const installRef = useRef(null);

  // update simulation
  const [checking, setChecking] = useState(false);
  const [updateAvailable, setUpdateAvailable] = useState(false);
  const [applying, setApplying] = useState(false);
  const [applyProgress, setApplyProgress] = useState(0);
  const applyRef = useRef(null);

  useEffect(() => {
    return () => {
      if (installRef.current) clearInterval(installRef.current);
      if (applyRef.current) clearInterval(applyRef.current);
    };
  }, []);

  function startInstall() {
    setInstalling(true);
    setInstallProgress(0);
    setInstallSuccess(null);
    installRef.current = setInterval(() => {
      setInstallProgress((p) => {
        const nxt = Math.min(100, p + Math.random() * 22);
        if (nxt >= 100) {
          clearInterval(installRef.current);
          const ok = Math.random() > 0.06; // usually ok
          setInstallSuccess(ok);
          setInstalling(false);
          return 100;
        }
        return nxt;
      });
    }, 300);
  }

  function checkForUpdates() {
    setChecking(true);
    setUpdateAvailable(false);
    setTimeout(() => {
      // arbitrary simulation
      const found = Math.random() > 0.45; // sometimes available
      setUpdateAvailable(found);
      setChecking(false);
    }, 900 + Math.random() * 800);
  }

  function applyUpdate() {
    setApplying(true);
    setApplyProgress(0);
    setInstallSuccess(null);
    applyRef.current = setInterval(() => {
      setApplyProgress((p) => {
        const nxt = Math.min(100, p + Math.random() * 20);
        if (nxt >= 100) {
          clearInterval(applyRef.current);
          const ok = Math.random() > 0.08; // mostly ok
          setApplying(false);
          setUpdateAvailable(false);
          return 100;
        }
        return nxt;
      });
    }, 350);
  }

  function copyInstall() {
    navigator.clipboard.writeText(SAMPLE_INSTALL_SNIPPET).catch(() => {});
  }

  function copyPolicy() {
    navigator.clipboard.writeText(UPDATE_POLICY_SNIPPET).catch(() => {});
  }

  return (
    <div className="p-6 md:p-10 lg:p-14 bg-gradient-to-b from-red-50 to-white min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 0.36 }} className="bg-white/80 p-2 rounded-lg shadow">
              <FaCogs className="w-6 h-6 text-red-500" />
            </motion.div>

            <div>
              <motion.h1 initial={{ y: -8, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.05 }} className="text-2xl md:text-3xl font-extrabold text-red-700">
                {t.title}
              </motion.h1>
              <motion.p initial={{ y: -6, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="text-sm text-red-600">
                {t.subtitle}
              </motion.p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="text-xs text-slate-600 mr-1">EN / HI</div>
            <div className="inline-flex rounded-full bg-white/70 p-1 shadow">
              <button onClick={() => setLang("en")} className={`px-3 py-1 rounded-full text-sm font-medium ${lang === "en" ? "bg-red-600 text-white" : "text-slate-700"}`}>EN</button>
              <button onClick={() => setLang("hi")} className={`px-3 py-1 rounded-full text-sm font-medium ${lang === "hi" ? "bg-red-600 text-white" : "text-slate-700"}`}>HI</button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <motion.div initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.05 }} className="bg-white rounded-2xl p-6 shadow">
              <h3 className="text-lg font-semibold flex items-center gap-3"><FaTools className="w-5 h-5 text-red-500" /> {lang === "en" ? "Concept" : "संकल्पना"}</h3>
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
                <h4 className="text-sm font-medium text-slate-600">{lang === "en" ? "How professionals do it" : "प्रोफेशनल इसे कैसे करते हैं"}</h4>
                <ol className="mt-3 list-decimal list-inside text-slate-700">{t.how.map((s, i) => (<li key={i} className="py-1">{s}</li>))}</ol>
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.08 }} className="bg-white rounded-2xl p-6 shadow">
              <h3 className="text-lg font-semibold flex items-center gap-3"><FaServer className="w-5 h-5 text-red-500" /> {lang === "en" ? "Tools & Ecosystem" : "उपकरण और इकोसिस्टम"}</h3>
              <p className="mt-2 text-slate-700">{lang === "en" ? "Tools and patterns commonly used:" : "सामान्यतः उपयोग किए जाने वाले टूल और पैटर्न:"}</p>

              <ul className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-2 text-slate-700">
                {t.tools.map((tool, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <span className="w-8 h-8 flex items-center justify-center bg-red-50 rounded-full"><FaBoxes className="w-4 h-4 text-red-500" /></span>
                    <div>
                      <div className="text-sm font-medium">{tool}</div>
                      <div className="text-xs text-slate-500 mt-1">{idx % 2 === 0 ? (lang === "en" ? 'Dev/Infra' : 'डेव/इनफ्रा') : (lang === "en" ? 'Packaging/Deploy' : 'पैकेजिंग/डिप्लॉय')}</div>
                    </div>
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }} className="bg-white rounded-2xl p-6 shadow">
              <h3 className="text-lg font-semibold flex items-center gap-3"><FaRocket className="w-5 h-5 text-red-500" /> {lang === "en" ? "Real-life Examples" : "वास्तविक जीवन उदाहरण"}</h3>
              <ul className="mt-3 list-disc list-inside text-slate-700">{t.examples.map((ex, i) => (<li key={i} className="py-1">{ex}</li>))}</ul>

              <div className="mt-4 bg-slate-50 rounded p-3">
                <pre className="whitespace-pre-wrap text-xs text-slate-800 overflow-auto">{SAMPLE_INSTALL_SNIPPET}</pre>
                <div className="mt-2 flex items-center gap-2">
                  <button onClick={copyInstall} className="inline-flex items-center gap-2 px-3 py-1 rounded-md border text-slate-700 hover:bg-slate-100"><FaCopy /> <span className="text-xs">{t.copyInstall}</span></button>
                  <div className="text-xs text-slate-500">{lang === "en" ? '(Install snippet)' : '(इंस्टॉल स्निपेट)'}</div>
                </div>
              </div>
            </motion.div>
          </div>

          <div className="space-y-6">
            <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.08 }} className="bg-white rounded-2xl p-6 shadow">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="bg-red-50 p-2 rounded-md"><FaCloudDownloadAlt className="w-5 h-5 text-red-500" /></div>
                  <div>
                    <div className="text-sm font-medium">{lang === "en" ? "Interactive Install" : "इंटरैक्टिव इंस्टॉल"}</div>
                    <div className="text-xs text-slate-500">{lang === "en" ? 'Simulate installing software with progress and final verification.' : 'प्रोग्रेस और सत्यापन के साथ सॉफ़्टवेयर इंस्टॉल का सिमुलेशन।'}</div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button onClick={startInstall} disabled={installing} className={`px-3 py-1 rounded-md text-sm inline-flex items-center gap-2 ${installing ? 'bg-slate-400 text-white' : 'bg-red-600 text-white hover:bg-red-700'}`}>
                    {installing ? <FaPlay className="animate-pulse" /> : <FaDownload />} <span>{installing ? t.installLabel + '...' : t.installLabel}</span>
                  </button>
                </div>
              </div>

              <div className="mt-4">
                <div className="w-full bg-slate-100 rounded-full h-3 overflow-hidden">
                  <div className={`h-3 rounded-full transition-all ${installSuccess === true ? 'bg-emerald-500' : installSuccess === false ? 'bg-rose-500' : 'bg-red-400'}`} style={{ width: `${installProgress}%` }} />
                </div>

                <div className="mt-2 text-xs text-slate-600 flex items-center gap-2">
                  <span>{Math.round(installProgress)}%</span>
                  {installSuccess === true && (<span className="inline-flex items-center gap-1 text-emerald-600"><FaCheckCircle /> {lang === 'en' ? 'Installed' : 'इंस्टॉल हुआ'}</span>)}
                  {installSuccess === false && (<span className="inline-flex items-center gap-1 text-rose-600"><FaExclamationTriangle /> {lang === 'en' ? 'Installation failed' : 'इंस्टॉल फेल'}</span>)}
                </div>

                <div className="mt-3 text-xs text-slate-500">{lang === 'en' ? 'Tip: Run installs in clean environments or containers for reproducibility.' : 'टिप: पुनरुत्पादन के लिए क्लीन एनवायरनमेंट या कंटेनर में इंस्टॉल चलाएँ।'}</div>
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="bg-white rounded-2xl p-6 shadow">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm font-medium">{lang === 'en' ? 'Update Flow' : 'अपडेट फ्लो'}</div>
                  <div className="text-xs text-slate-500">{lang === 'en' ? 'Check for updates and apply patches safely.' : 'अपडेट की जाँच करें और पैच सुरक्षित तरीके से लागू करें।'}</div>
                </div>

                <div className="flex items-center gap-2">
                  <button onClick={checkForUpdates} disabled={checking} className={`px-3 py-1 rounded-md text-sm inline-flex items-center gap-2 ${checking ? 'bg-slate-300' : 'bg-red-600 text-white hover:bg-red-700'}`}>
                    {checking ? '...' : t.checkUpdates}
                  </button>
                  <button onClick={applyUpdate} disabled={!updateAvailable || applying} className={`px-3 py-1 rounded-md text-sm inline-flex items-center gap-2 ${(!updateAvailable || applying) ? 'bg-slate-300' : 'bg-red-500 text-white hover:bg-red-600'}`}>
                    {applying ? <FaPlay className="animate-pulse" /> : <FaSyncAlt />} <span>{t.applyUpdate}</span>
                  </button>
                </div>
              </div>

              <div className="mt-4">
                <div className="text-xs text-slate-600">{checking ? (lang === 'en' ? 'Checking for updates...' : 'अपडेट की जाँच हो रही है...') : updateAvailable ? (lang === 'en' ? 'Update available!' : 'अपडेट उपलब्ध!') : (lang === 'en' ? 'No updates found' : 'कोई अपडेट नहीं') }</div>

                <div className="mt-3 w-full bg-slate-100 rounded-full h-3 overflow-hidden">
                  <div className={`h-3 rounded-full transition-all ${applying ? 'bg-emerald-500' : 'bg-red-300'}`} style={{ width: `${applyProgress}%` }} />
                </div>

                <div className="mt-2 text-xs text-slate-600">{applying ? `${Math.round(applyProgress)}%` : ''}</div>

                <div className="mt-3 text-xs text-slate-500">{lang === 'en' ? 'Tip: Automate security patches but test major releases in staging first.' : 'टिप: सुरक्षा पैच ऑटोमेट करें, पर major releases पहले स्टेजिंग में टेस्ट करें।'}</div>
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.12 }} className="bg-white rounded-2xl p-6 shadow">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-medium text-slate-700">{t.updateChartLabel}</h4>
                <div className="text-xs text-slate-500">{lang === 'en' ? 'sample distribution' : 'नमूना वितरण'}</div>
              </div>

              <div className="w-full h-36 mt-3">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={PIE_DATA} dataKey="value" innerRadius={22} outerRadius={36} paddingAngle={4}>
                      {PIE_DATA.map((entry, i) => (<Cell key={`c-${i}`} fill={COLORS[i % COLORS.length]} />))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </motion.div>

            <div className="text-xs text-slate-400">{lang === 'en' ? 'Ready to drop into Tailwind + React project.' : 'Tailwind + React प्रोजेक्ट में जोड़ने के लिए तैयार।'}</div>
          </div>
        </div>

        <div className="mt-8 bg-white rounded-2xl p-6 shadow">
          <h4 className="font-semibold text-slate-700 mb-2">{lang === 'en' ? 'Usage & Notes' : 'उपयोग और नोट्स'}</h4>
          <div className="text-sm text-slate-600">
            <p>{lang === 'en' ? '1) Copy this file into your React project (e.g., src/components/InstallModule.jsx).' : '1) इस फ़ाइल को अपने React प्रोजेक्ट में कॉपी करें (उदा., src/components/InstallModule.jsx)।'}</p>
            <p className="mt-2">{lang === 'en' ? '2) Install dependencies: framer-motion, react-icons, recharts. Ensure Tailwind CSS is configured.' : '2) निर्भरता इंस्टॉल करें: framer-motion, react-icons, recharts। Tailwind कॉन्फ़िगर करें।'}</p>
            <pre className="mt-3 bg-slate-50 p-3 rounded text-xs text-slate-700">{`npm install framer-motion react-icons recharts --save
# or
# yarn add framer-motion react-icons recharts`}</pre>
            <p className="mt-3">{lang === 'en' ? '3) Optional: Connect install/update simulation to real endpoints or CI jobs for live demos.' : '3) वैकल्पिक: इंस्टॉल/अपडेट सिमुलेशन को वास्तविक endpoints या CI जॉब से जोड़ें।'}</p>
            <p className="mt-3 text-xs text-slate-500">{lang === 'en' ? 'Ship clean installs. Patch fast. Monitor everything.' : 'साफ़ इंस्टॉल भेजें। तेज़ी से पैच करें। सब मॉनिटर करें।'}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
