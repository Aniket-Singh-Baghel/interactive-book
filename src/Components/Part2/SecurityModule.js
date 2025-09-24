import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import {
  FaLock,
  FaShieldAlt,
  FaUserShield,
  FaNetworkWired,
  FaBug,
  FaTools,
  FaShieldVirus,
  FaExclamationTriangle,
  FaKey,
  FaClipboardList,
  FaPlay,
  FaCheckCircle,
} from 'react-icons/fa';
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip } from 'recharts';

// SecurityModule.jsx
// Single-file React component with internal subcomponents
// - Bilingual (EN/HI) toggle
// - Animated title + SVG lock animation
// - Sections: Concept, Analogy, Why, Pros/Cons, How pros do it, Tools, Student examples
// - Interactive "Lock/Scan" demo that simulates a security scan
// - Coverage pie chart (threat mitigation sample)
// - Checklist, code snippet (security checklist / sample policy)
// - TailwindCSS + Framer Motion + react-icons + Recharts

const SAMPLE_SECURITY_POLICY = `# Minimal Security Checklist (example)
- Enforce HTTPS
- Use strong password hashing (bcrypt / Argon2)
- Implement rate limiting on auth endpoints
- Validate & sanitize all inputs
- Use principle of least privilege for credentials
- Keep dependencies up-to-date and monitor CVEs
- Enable multi-factor authentication (MFA)
`;

const COVERAGE = [
  { name: 'Mitigated', value: 64 },
  { name: 'Unmitigated', value: 36 },
];
const COLORS = ['#06b6d4', '#f97316'];

const bilingual = {
  en: {
    title: 'Software Security',
    subtitle: 'Protecting software and data from attacks and unauthorized access.',
    concept: 'Practices and patterns to protect software, its data, and its users from threats and unauthorized access.',
    analogy: 'Installing locks, alarms, and security guards for your digital building.',
    why: [
      'Protect user data and privacy.',
      'Prevent financial and reputational loss.',
      'Comply with legal & regulatory requirements.',
    ],
    pros: ['Reduces risk of breaches.', 'Increases user trust.', 'Helps meet compliance.'],
    cons: ['Requires ongoing effort and updates.', 'Can add complexity and latency if done poorly.'],
    how: [
      'Threat Modeling: Identify assets, entry points, and threats.',
      'Secure Coding: Validate input, avoid unsafe patterns.',
      'Authentication & Authorization: Strong auth and least privilege.',
      'Encryption: Protect data in transit and at rest.',
      'Monitoring & Response: Logs, SIEM, incident playbooks.',
      'Supply Chain Security: Lock down dependencies and CI.',
    ],
    tools: [
      'Static analysis: ESLint, Semgrep',
      'Dependency scanners: Snyk, Dependabot',
      'Secrets scanning: TruffleHog, git-secrets',
      'Runtime protection: WAF (Cloudflare, ModSecurity)',
      'Auth: OAuth2/OIDC, Auth0, Keycloak',
      'Pen testing: BurpSuite, OWASP ZAP',
    ],
    examples: [
      'Student example: Store passwords with bcrypt; never plaintext.',
      'Project example: Add HTTPS to dev server and HSTS for production.',
    ],
    runScan: 'Run Security Scan',
    scanAgain: 'Scan Again',
    coverageLabel: 'Threat Mitigation (sample)',
    copyPolicy: 'Copy policy',
    lock: 'Lock',
    unlock: 'Unlock',
    scanResultsGood: 'No critical issues found',
    scanResultsBad: 'Potential issues detected — investigate',
  },
  hi: {
    title: 'सॉफ्टवेयर सुरक्षा',
    subtitle: 'सॉफ़्टवेयर और उसके डेटा को हमलों और अनधिकृत पहुंच से बचाना।',
    concept: 'सॉफ़्टवेयर, इसके डेटा और उपयोगकर्ताओं को खतरों और अनधिकृत पहुंच से बचाने के लिए प्रथाएँ और पैटर्न।',
    analogy: 'आपकी डिजिटल बिल्डिंग के लिए ताले, अलार्म और सुरक्षा गार्ड लगाना।',
    why: [
      'उपयोगकर्ता डेटा और गोपनीयता की रक्षा।',
      'आर्थिक और प्रतिष्ठा संबंधी हानि रोकना।',
      'कानूनी और नियामक आवश्यकताओं का पालन।',
    ],
    pros: ['ब्रीच के जोखिम को कम करता है।', 'उपयोगकर्ता का भरोसा बढ़ता है।', 'कम्प्लायंस में मदद करता है।'],
    cons: ['निरंतर प्रयास और अपडेट की आवश्यकता।', 'यदि गलत तरीके से किया जाए तो जटिलता/देर बढ़ सकती है।'],
    how: [
      'थ्रेट मॉडलिंग: संपत्ति, एंट्री पॉइंट और खतरों की पहचान।',
      'सुरक्षित कोडिंग: इनपुट सत्यापन और असुरक्षित पैटर्न से बचें।',
      'प्रमाणीकरण और प्राधिकरण: मजबूत auth और न्यूनाधिकृत अनुमति।',
      'एन्क्रिप्शन: ट्रांज़िट और एट-रेस्ट डेटा की सुरक्षा।',
      'मॉनिटरिंग और रिस्पॉन्स: लॉग, SIEM, घटना प्लेबुक।',
      'सप्लाई-चेन सुरक्षा: निर्भरता और CI लॉकडाउन।',
    ],
    tools: [
      'स्टैटिक विश्लेषण: ESLint, Semgrep',
      'डिपेंडेंसी स्कैनर: Snyk, Dependabot',
      'सीक्रेट्स स्कैनिंग: TruffleHog, git-secrets',
      'रनटाइम प्रोटेक्शन: WAF (Cloudflare, ModSecurity)',
      'ऑथ: OAuth2/OIDC, Auth0, Keycloak',
      'पेनेटेस्टिंग: BurpSuite, OWASP ZAP',
    ],
    examples: [
      'छात्र उदाहरण: पासवर्ड bcrypt के साथ स्टोर करें; प्लेनटेक्स्ट नहीं।',
      'प्रोजेक्ट उदाहरण: dev सर्वर पर HTTPS जोड़ें और production में HSTS लगाएं।',
    ],
    runScan: 'सिक्योरिटी स्कैन चलाएँ',
    scanAgain: 'फिर से स्कैन करें',
    coverageLabel: 'थ्रेट मिटिगेशन (नमूना)',
    copyPolicy: 'पॉलिसी कॉपी करें',
    lock: 'लॉक',
    unlock: 'अनलॉक',
    scanResultsGood: 'कोई गंभीर समस्या नहीं मिली',
    scanResultsBad: 'संभावित समस्याएँ मिलीं — जाँच करें',
  },
};

export default function SecurityModule() {
  const [lang, setLang] = useState('en');
  const t = bilingual[lang];

  // interactive scan simulation
  const [scanning, setScanning] = useState(false);
  const [scanProgress, setScanProgress] = useState(0);
  const [scanResultGood, setScanResultGood] = useState(null);
  const scanRef = useRef(null);

  // lock state demo
  const [locked, setLocked] = useState(true);

  useEffect(() => {
    return () => {
      if (scanRef.current) clearInterval(scanRef.current);
    };
  }, []);

  function startScan() {
    setScanning(true);
    setScanProgress(0);
    setScanResultGood(null);
    scanRef.current = setInterval(() => {
      setScanProgress((p) => {
        const nxt = Math.min(100, p + Math.random() * 18);
        if (nxt >= 100) {
          clearInterval(scanRef.current);
          const ok = Math.random() > 0.24; // sometimes issues
          setScanResultGood(ok);
          setScanning(false);
          return 100;
        }
        return nxt;
      });
    }, 300);
  }

  function toggleLock() {
    setLocked((s) => !s);
  }

  function copyPolicy() {
    navigator.clipboard
      .writeText(SAMPLE_SECURITY_POLICY)
      .catch(() => {});
  }

  return (
    <div className="p-6 md:p-10 bg-gradient-to-b from-emerald-50 to-white min-h-screen">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-start gap-4 mb-6">
          <div className="flex items-center gap-4">
            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 0.4 }} className="bg-white/80 p-2 rounded-lg shadow">
              <FaLock className="w-6 h-6 text-emerald-600" />
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
              <button onClick={() => setLang('en')} className={`px-3 py-1 rounded-full text-sm font-medium ${lang === 'en' ? 'bg-emerald-600 text-white' : 'text-slate-700'}`}>
                EN
              </button>
              <button onClick={() => setLang('hi')} className={`px-3 py-1 rounded-full text-sm font-medium ${lang === 'hi' ? 'bg-emerald-600 text-white' : 'text-slate-700'}`}>
                HI
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <motion.div initial={{ opacity: 0, x: -6 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.05 }} className="bg-white rounded-2xl p-6 shadow">
              <h3 className="text-lg font-semibold flex items-center gap-3"><FaShieldAlt className="w-5 h-5 text-emerald-500" /> {lang === 'en' ? 'Concept' : 'संकल्पना'}</h3>
              <p className="mt-3 text-slate-700">{t.concept}</p>

              <div className="mt-4 grid md:grid-cols-2 gap-4">
                <div>
                  <h4 className="text-sm font-medium text-slate-600">{lang === 'en' ? 'Analogy' : 'उपमा'}</h4>
                  <p className="mt-2 text-slate-700">{t.analogy}</p>

                  <h4 className="text-sm font-medium text-slate-600 mt-4">{lang === 'en' ? 'Why needed' : 'क्यों ज़रूरी है'}</h4>
                  <ul className="mt-2 list-disc list-inside text-slate-700">
                    {t.why.map((w, i) => (<li key={i}>{w}</li>))}
                  </ul>
                </div>

                <div>
                  <h4 className="text-sm font-medium text-slate-600">{lang === 'en' ? 'Pros' : 'फ़ायदे'}</h4>
                  <ul className="mt-2 list-disc list-inside text-slate-700">{t.pros.map((p, i) => (<li key={i}>{p}</li>))}</ul>

                  <h4 className="text-sm font-medium text-slate-600 mt-4">{lang === 'en' ? 'Cons' : 'नुकसान'}</h4>
                  <ul className="mt-2 list-disc list-inside text-slate-700">{t.cons.map((c, i) => (<li key={i}>{c}</li>))}</ul>
                </div>
              </div>

              <div className="mt-6">
                <h4 className="text-sm font-medium text-slate-600">{lang === 'en' ? 'How professionals do it' : 'प्रोफेशनल इसे कैसे करते हैं'}</h4>
                <ol className="mt-3 list-decimal list-inside text-slate-700">{t.how.map((s, i) => (<li key={i} className="py-1">{s}</li>))}</ol>
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, x: -6 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.08 }} className="bg-white rounded-2xl p-6 shadow">
              <h3 className="text-lg font-semibold flex items-center gap-3"><FaTools className="w-5 h-5 text-emerald-600" /> {lang === 'en' ? 'Tools & Practices' : 'उपकरण और प्रथाएँ'}</h3>
              <p className="mt-2 text-slate-700">{lang === 'en' ? 'Common security tools and practices:' : 'सामान्य सुरक्षा उपकरण और प्रथाएँ:'}</p>

              <ul className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-2 text-slate-700">
                {t.tools.map((tool, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <span className="w-8 h-8 flex items-center justify-center bg-emerald-50 rounded-full"><FaKey className="w-4 h-4 text-emerald-600" /></span>
                    <div>
                      <div className="text-sm font-medium">{tool}</div>
                      <div className="text-xs text-slate-500 mt-1">{idx % 2 === 0 ? (lang === 'en' ? 'Developer-facing' : 'डेवलपर के लिए') : (lang === 'en' ? 'Ops/Security' : 'ऑप्स/सिक्योरिटी')}</div>
                    </div>
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div initial={{ opacity: 0, x: -6 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }} className="bg-white rounded-2xl p-6 shadow">
              <h3 className="text-lg font-semibold flex items-center gap-3"><FaShieldVirus className="w-5 h-5 text-rose-500" /> {lang === 'en' ? 'Student Examples' : 'छात्र उदाहरण'}</h3>
              <ul className="mt-3 list-disc list-inside text-slate-700">{t.examples.map((ex, i) => (<li key={i} className="py-1">{ex}</li>))}</ul>

              <div className="mt-4 bg-slate-50 rounded p-3">
                <pre className="whitespace-pre-wrap text-xs text-slate-800 overflow-auto">{SAMPLE_SECURITY_POLICY}</pre>
                <div className="mt-2 flex items-center gap-2">
                  <button onClick={copyPolicy} className="inline-flex items-center gap-2 px-3 py-1 rounded-md border text-slate-700 hover:bg-slate-100"><FaClipboardList /> <span className="text-xs">{t.copyPolicy}</span></button>
                  <div className="text-xs text-slate-500">{lang === 'en' ? '(Example policy)' : '(उदाहरण पॉलिसी)'}</div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right column: interactive + chart */}
          <div className="space-y-6">
            <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.08 }} className="bg-white rounded-2xl p-6 shadow">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="bg-emerald-50 p-2 rounded-md"><FaUserShield className="text-emerald-600 w-5 h-5" /></div>
                  <div>
                    <div className="text-sm font-medium">{lang === 'en' ? 'Interactive Lock & Scan' : 'इंटरैक्टिव लॉक और स्कैन'}</div>
                    <div className="text-xs text-slate-500">{lang === 'en' ? 'Try locking and running a simulated security scan.' : 'लॉक करके सिम्युलेटेड स्कैन चलाएँ।'}</div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button onClick={toggleLock} className={`px-3 py-1 rounded-md text-sm inline-flex items-center gap-2 ${locked ? 'bg-emerald-600 text-white' : 'bg-slate-100 text-slate-700'}`}>
                    <FaLock /> <span>{locked ? t.lock : t.unlock}</span>
                  </button>
                </div>
              </div>

              {/* Lock SVG */}
              <div className="w-full h-40 flex items-center justify-center mt-4">
                <motion.svg width="140" height="140" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <motion.rect x="3" y="10" width="18" height="11" rx="2" stroke="#0f172a" strokeWidth="1.2" fill={locked ? '#ecfccb' : '#fff7ed'} />
                  <motion.path d="M7 10V7a5 5 0 0110 0v3" stroke="#065f46" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" initial={{ rotate: 0 }} animate={{ rotate: locked ? 0 : -10 }} transform-origin="12px 8px" />
                  <motion.circle cx="12" cy="15" r="1.6" fill={locked ? '#065f46' : '#92400e'} />
                </motion.svg>
              </div>

              <div className="mt-4 flex items-center gap-3">
                <button onClick={startScan} disabled={scanning} className={`inline-flex items-center gap-2 px-4 py-2 rounded-md shadow text-white ${scanning ? 'bg-slate-400' : 'bg-emerald-600 hover:bg-emerald-700'}`}>
                  <FaPlay /> <span>{scanning ? t.runScan + '...' : t.runScan}</span>
                </button>

                <div className="flex-1">
                  <div className="w-full bg-slate-100 rounded-full h-3 overflow-hidden">
                    <div className={`h-3 rounded-full transition-all ${scanResultGood === true ? 'bg-emerald-500' : scanResultGood === false ? 'bg-rose-500' : 'bg-emerald-400'}`} style={{ width: `${scanProgress}%` }} />
                  </div>
                  <div className="mt-2 text-xs text-slate-600 flex items-center gap-2">
                    <span>{Math.round(scanProgress)}%</span>
                    {scanResultGood === true && (<span className="inline-flex items-center gap-1 text-emerald-600"><FaCheckCircle /> {t.scanResultsGood}</span>)}
                    {scanResultGood === false && (<span className="inline-flex items-center gap-1 text-rose-600"><FaExclamationTriangle /> {t.scanResultsBad}</span>)}
                  </div>
                </div>
              </div>

            </motion.div>

            <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="bg-white rounded-2xl p-6 shadow">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-medium text-slate-700">{t.coverageLabel}</h4>
                <div className="text-xs text-slate-500">{lang === 'en' ? 'sample data' : 'नमूना डेटा'}</div>
              </div>

              <div className="w-full h-40 mt-3">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={COVERAGE} dataKey="value" innerRadius={28} outerRadius={48} paddingAngle={4}>
                      {COVERAGE.map((entry, i) => (<Cell key={`c-${i}`} fill={COLORS[i % COLORS.length]} />))}
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
          <h4 className="font-semibold text-slate-700 mb-2">{lang === 'en' ? 'Usage & Integration Notes' : 'उपयोग और इंटीग्रेशन नोट्स'}</h4>
          <div className="text-sm text-slate-600">
            <p>{lang === 'en' ? '1) Copy this file into your React project (e.g., src/components/SecurityModule.jsx).' : '1) इस फ़ाइल को अपने React प्रोजेक्ट में कॉपी करें (उदा., src/components/SecurityModule.jsx)।'}</p>
            <p className="mt-2">{lang === 'en' ? '2) Install dependencies: framer-motion, react-icons, recharts. Ensure Tailwind is configured.' : '2) निर्भरता स्थापित करें: framer-motion, react-icons, recharts। Tailwind कॉन्फ़िगर करें।'}</p>
            <pre className="mt-3 bg-slate-50 p-3 rounded text-xs text-slate-700">{`npm install framer-motion react-icons recharts --save
# or
# yarn add framer-motion react-icons recharts`}</pre>
            <p className="mt-3">{lang === 'en' ? '3) Optional: Connect the scan button to an actual security scanner or CI job; replace sample policy with your org policy.' : '3) वैकल्पिक: स्कैन बटन को वास्तविक सिक्योरिटी स्कैनर या CI जॉब से जोड़ें; सैंपल पॉलिसी को अपने संगठन की पॉलिसी से बदलें।'}</p>
            <p className="mt-3 text-xs text-slate-500">{lang === 'en' ? 'Stay secure! 🔐' : 'सुरक्षित रहें! 🔐'}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
