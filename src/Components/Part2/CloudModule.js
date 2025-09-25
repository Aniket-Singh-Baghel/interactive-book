import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import {
  FaCloud,
  FaServer,
  FaNetworkWired,
  FaCogs,
  FaChartLine,
  FaRocket,
  FaCopy,
  FaPlay,
  FaCheckCircle,
  FaSpinner,
  FaDatabase,
  FaGlobe,
  FaCloudUploadAlt,
} from "react-icons/fa";
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip } from "recharts";

// CloudModule.jsx
// Single-file React component (Tailwind + Framer Motion + Recharts + react-icons)
// Features:
// - Bilingual (English / Hindi) toggle
// - Animated title and SVG cloud animation
// - Sections: Concept, Analogy, Why needed, Pros/Cons, How professionals use it, Tools/Services, Student examples
// - Interactive "Deploy to Cloud" simulation with progress and autoscaling demo
// - Cost vs Scalability sample pie chart
// - Copyable deploy snippet
// - Usage & integration notes

const SAMPLE_DEPLOY_SNIPPET = `# Example: deploy.sh (simple demo script)
# Builds the app and deploys to a generic cloud provider
npm run build
# Assume we have a CLI tool: cloudctl
cloudctl auth login --token $CLOUD_TOKEN
cloudctl deploy --app my-app --region us-east-1 --instances 2
`;

const COST_SCALABILITY = [
  { name: "Compute (autoscaled)", value: 55 },
  { name: "Storage", value: 20 },
  { name: "Networking", value: 15 },
  { name: "Managed Services", value: 10 },
];
const COLORS = ["#0ea5a4", "#60a5fa", "#f97316", "#a78bfa"];

const bilingual = {
  en: {
    title: "Cloud Computing",
    subtitle: "Delivering computing services—servers, storage, databases, networking—over the Internet.",
    concept:
      "Delivering computing services — including servers, storage, databases, networking, analytics and more — over the internet so teams can build and scale apps without managing physical hardware.",
    analogy: "Renting a fully equipped professional kitchen instead of building your own from scratch.",
    why: [
      "Fast provisioning: spin up resources in minutes.",
      "Elasticity: scale up/down with demand.",
      "Cost efficiency: pay only for what you use.",
    ],
    pros: [
      "Reduced time-to-market.",
      "Built-in reliability and global reach.",
      "Rich managed services (databases, ML, analytics).",
    ],
    cons: [
      "Vendor lock-in risk.",
      "Operational cost surprises if not monitored.",
      "Shared responsibility for security — some controls are on you.",
    ],
    how: [
      "Choose provider & region: Consider latency, compliance.",
      "Design for failure: make systems resilient and distributed.",
      "Automate infra: IaC (Terraform/CloudFormation) and CI/CD.",
      "Monitor & optimize: observability, cost management.",
    ],
    tools: [
      "IaaS: AWS EC2, Azure VMs, GCP Compute Engine",
      "PaaS: Heroku, Vercel, Firebase Hosting",
      "Containers: Docker, Kubernetes (EKS/GKE/AKS)",
      "IaC: Terraform, CloudFormation, Pulumi",
      "CI/CD: GitHub Actions, GitLab CI, Jenkins",
      "Databases: RDS, Cloud SQL, DynamoDB, Firestore",
    ],
    examples: [
      "Student example: Host your static site on a CDN (Netlify/Vercel) for free and link a custom domain.",
      "Project example: Containerize a web app and deploy to a managed Kubernetes cluster—use autoscaling to handle traffic spikes.",
    ],
    deploy: "Deploy to Cloud",
    deployAgain: "Deploy Again",
    copySnippet: "Copy snippet",
    autoscaleLabel: "Autoscaling: simulated instances",
    costLabel: "Cost Breakdown (sample)",
  },
  hi: {
    title: "क्लाउड कम्प्यूटिंग",
    subtitle: "इंटरनेट पर सर्वर, स्टोरेज, डेटाबेस और अन्य सेवाएँ प्रदान करना।",
    concept:
      "कंप्यूटिंग सेवाओं को इंटरनेट के माध्यम से प्रदान करना — सर्वर, स्टोरेज, डेटाबेस, नेटवर्किंग, एनालिटिक्स आदि — ताकि टीम फिजिकल हार्डवेयर को मैनेज किए बिना एप बनाकर स्केल कर सकें।",
    analogy: "खुद रेस्टोरेंट किचन बनाने के बजाय, एक पूरी तरह से सुसज्जित प्रोफेशनल किचन किराये पर लेना।",
    why: [
      "तेज़ प्राविजनिंग: मिनटों में रिसोर्स बनाएं।",
      "इलास्टिसिटी: मांग के अनुसार स्केल करें।",
      "लागत-कुशल: केवल उपयोग के लिए भुगतान करें।",
    ],
    pros: [
      "टाइम-टू-मार्केट घटता है।",
      "बिल्ट-इन विश्वसनीयता और ग्लोबल पहुंच।",
      "मैनेज्ड सेवाओं (डेटाबेस, ML) का लाभ।",
    ],
    cons: [
      "वेंडर लॉक-इन का जोखिम।",
      "मॉनिटर न करने पर लागत में आश्चर्यजनक वृद्धि।",
      "सुरक्षा के लिए साझा ज़िम्मेदारी — कुछ कंट्रोल आपकी तरफ हैं।",
    ],
    how: [
      "प्रोवाइडर और रीजन चुनें: लेटेंसी और कम्प्लायंस पर विचार करें।",
      "फेल्योर के लिए डिज़ाइन करें: सिस्टम को रेडंडंट और डिस्ट्रिब्यूटेड बनाएं।",
      "इंफ्रा ऑटोमेट करें: IaC (Terraform/CloudFormation) और CI/CD।",
      "मॉनिटर और ऑप्टिमाइज़ करें: observability और cost management।",
    ],
    tools: [
      "IaaS: AWS EC2, Azure VMs, GCP Compute Engine",
      "PaaS: Heroku, Vercel, Firebase Hosting",
      "Containers: Docker, Kubernetes (EKS/GKE/AKS)",
      "IaC: Terraform, CloudFormation, Pulumi",
      "CI/CD: GitHub Actions, GitLab CI, Jenkins",
      "Databases: RDS, Cloud SQL, DynamoDB, Firestore",
    ],
    examples: [
      "छात्र उदाहरण: अपनी स्टैटिक साइट को CDN (Netlify/Vercel) पर होस्ट करें और कस्टम डोमेन लिंक करें।",
      "प्रोजेक्ट उदाहरण: वेब ऐप को कंटेनराइज़ करके managed Kubernetes क्लस्टर में deploy करें—ट्रैफ़िक स्पाइक्स के लिए autoscaling का उपयोग करें।",
    ],
    deploy: "क्लाउड पर डिप्लॉय करें",
    deployAgain: "फिर से डिप्लॉय करें",
    copySnippet: "स्निपेट कॉपी करें",
    autoscaleLabel: "ऑटोस्केलिंग: सिम्युलेटेड इंस्टेंसेज़",
    costLabel: "लागत विभाजन (नमूना)",
  },
};

export default function CloudModule() {
  const [lang, setLang] = useState("en");
  const t = bilingual[lang];

  // deploy simulation
  const [deploying, setDeploying] = useState(false);
  const [deployProgress, setDeployProgress] = useState(0);
  const [deploySuccess, setDeploySuccess] = useState(null);
  const deployRef = useRef(null);

  // autoscale simulation
  const [instances, setInstances] = useState(2);
  const autoscaleRef = useRef(null);

  useEffect(() => {
    return () => {
      if (deployRef.current) clearInterval(deployRef.current);
      if (autoscaleRef.current) clearInterval(autoscaleRef.current);
    };
  }, []);

  function startDeploy() {
    setDeploying(true);
    setDeployProgress(0);
    setDeploySuccess(null);
    deployRef.current = setInterval(() => {
      setDeployProgress((p) => {
        const nxt = Math.min(100, p + Math.random() * 20);
        if (nxt >= 100) {
          clearInterval(deployRef.current);
          const ok = Math.random() > 0.08; // mostly success
          setDeploySuccess(ok);
          setDeploying(false);
          // kick off autoscale demo when deployed
          startAutoscaleDemo();
          return 100;
        }
        return nxt;
      });
    }, 350);
  }

  function startAutoscaleDemo() {
    if (autoscaleRef.current) clearInterval(autoscaleRef.current);
    setInstances(2);
    let tcount = 0;
    autoscaleRef.current = setInterval(() => {
      tcount += 1;
      // simulate demand peaks
      setInstances((cur) => {
        if (tcount % 7 === 0) return Math.max(1, cur - 1);
        if (tcount % 3 === 0) return cur + Math.floor(Math.random() * 2) + 1;
        return cur;
      });
      if (tcount > 24) {
        clearInterval(autoscaleRef.current);
      }
    }, 900);
  }

  function copySnippet() {
    navigator.clipboard
      .writeText(SAMPLE_DEPLOY_SNIPPET)
      .then(() => {
        // tiny visual feedback handled by caller or toast; simple no-op here
      })
      .catch(() => {});
  }

  return (
    <div className="p-6 md:p-10 lg:p-14 bg-gradient-to-b from-cyan-50 to-white min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 0.4 }} className="bg-white/80 p-2 rounded-lg shadow">
              <FaCloud className="w-6 h-6 text-cyan-600" />
            </motion.div>

            <div>
              <motion.h1 initial={{ y: -8, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.05 }} className="text-2xl md:text-3xl font-extrabold text-cyan-800">
                {t.title}
              </motion.h1>
              <motion.p initial={{ y: -6, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="text-sm text-cyan-600">
                {t.subtitle}
              </motion.p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="text-xs text-slate-600 mr-1">EN / HI</div>
            <div className="inline-flex rounded-full bg-white/70 p-1 shadow">
              <button onClick={() => setLang("en")} className={`px-3 py-1 rounded-full text-sm font-medium ${lang === "en" ? "bg-cyan-600 text-white" : "text-slate-700"}`}>
                EN
              </button>
              <button onClick={() => setLang("hi")} className={`px-3 py-1 rounded-full text-sm font-medium ${lang === "hi" ? "bg-cyan-600 text-white" : "text-slate-700"}`}>
                HI
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <motion.div initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.05 }} className="bg-white rounded-2xl p-6 shadow">
              <h3 className="text-lg font-semibold flex items-center gap-3"><FaGlobe className="w-5 h-5 text-cyan-600" /> {lang === "en" ? "Concept" : "संकल्पना"}</h3>
              <p className="mt-3 text-slate-700">{t.concept}</p>

              <div className="mt-4 grid md:grid-cols-2 gap-4">
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
                <h4 className="text-sm font-medium text-slate-600">{lang === "en" ? "How professionals use it" : "प्रोफेशनल इसे कैसे उपयोग करते हैं"}</h4>
                <ol className="mt-3 list-decimal list-inside text-slate-700">{t.how.map((s, i) => (<li key={i} className="py-1">{s}</li>))}</ol>
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.08 }} className="bg-white rounded-2xl p-6 shadow">
              <h3 className="text-lg font-semibold flex items-center gap-3"><FaServer className="w-5 h-5 text-cyan-600" /> {lang === "en" ? "Tools & Services" : "उपकरण और सेवाएँ"}</h3>
              <p className="mt-2 text-slate-700">{lang === "en" ? "Popular cloud platforms and helpful tools:" : "लोकप्रिय क्लाउड प्लेटफ़ॉर्म और सहायक टूल:"}</p>

              <ul className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-2 text-slate-700">
                {t.tools.map((tool, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <span className="w-8 h-8 flex items-center justify-center bg-cyan-50 rounded-full"><FaCogs className="w-4 h-4 text-cyan-600" /></span>
                    <div>
                      <div className="text-sm font-medium">{tool}</div>
                      <div className="text-xs text-slate-500 mt-1">{idx % 2 === 0 ? (lang === "en" ? "Infra / Dev" : "इनफ्रा / देव") : (lang === "en" ? "Managed / Platform" : "मैनेज्ड / प्लेटफ़ॉर्म")}</div>
                    </div>
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }} className="bg-white rounded-2xl p-6 shadow">
              <h3 className="text-lg font-semibold flex items-center gap-3"><FaChartLine className="w-5 h-5 text-cyan-600" /> {lang === "en" ? "Student & Project Examples" : "छात्र और प्रोजेक्ट उदाहरण"}</h3>
              <ul className="mt-3 list-disc list-inside text-slate-700">{t.examples.map((ex, i) => (<li key={i} className="py-1">{ex}</li>))}</ul>

              <div className="mt-4 bg-slate-50 rounded p-3">
                <pre className="whitespace-pre-wrap text-xs text-slate-800 overflow-auto">{SAMPLE_DEPLOY_SNIPPET}</pre>
                <div className="mt-2 flex items-center gap-2">
                  <button onClick={copySnippet} className="inline-flex items-center gap-2 px-3 py-1 rounded-md border text-slate-700 hover:bg-slate-100"><FaCopy /> <span className="text-xs">{t.copySnippet}</span></button>
                  <div className="text-xs text-slate-500">{lang === "en" ? '(Deployment snippet)' : '(डिप्लॉयमेंट स्निपेट)'}</div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right column: interactive + chart */}
          <div className="space-y-6">
            <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.08 }} className="bg-white rounded-2xl p-6 shadow">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="bg-cyan-50 p-2 rounded-md"><FaCloudUploadAlt className="w-5 h-5 text-cyan-600" /></div>
                  <div>
                    <div className="text-sm font-medium">{lang === "en" ? "Interactive Deploy" : "इंटरैक्टिव डिप्लॉय"}</div>
                    <div className="text-xs text-slate-500">{lang === "en" ? 'Simulate deploying an app and see autoscaling in action.' : 'एक ऐप को सिम्युलेटेड रूप से डिप्लॉय करें और ऑटोस्केल देखें।'}</div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button onClick={startDeploy} disabled={deploying} className={`px-3 py-1 rounded-md text-sm inline-flex items-center gap-2 ${deploying ? 'bg-slate-400 text-white' : 'bg-cyan-600 text-white hover:bg-cyan-700'}`}>
                    {deploying ? <FaSpinner className="animate-spin" /> : <FaPlay />} <span>{deploying ? t.deploy + '...' : t.deploy}</span>
                  </button>
                </div>
              </div>

              {/* Cloud SVG animation */}
              <div className="w-full h-44 flex items-center justify-center mt-4 relative overflow-hidden">
                <svg viewBox="0 0 300 140" className="w-full h-full">
                  <defs>
                    <linearGradient id="cg" x1="0" x2="1" y1="0" y2="1">
                      <stop offset="0%" stopColor="#06b6d4" />
                      <stop offset="100%" stopColor="#60a5fa" />
                    </linearGradient>
                  </defs>

                  {/* big cloud */}
                  <motion.g initial={{ y: 40 }} animate={{ y: [40, 34, 40] }} transition={{ duration: 4, repeat: Infinity }}>
                    <ellipse cx="150" cy="70" rx="110" ry="36" fill="url(#cg)" opacity="0.95" />
                    <circle cx="90" cy="60" r="28" fill="#7dd3fc" />
                    <circle cx="140" cy="48" r="36" fill="#38bdf8" />
                    <circle cx="200" cy="60" r="26" fill="#60a5fa" />
                  </motion.g>

                  {/* small data centers (servers) moving toward cloud when deployed */}
                  <motion.g initial={{ x: -40 }} animate={{ x: deploying ? [ -40, 20, 80, 130, 180, 220 ] : [ -40, -40 ] }} transition={{ duration: 6, repeat: deploying ? Infinity : 0 }}>
                    <rect x="-20" y="100" width="30" height="18" rx="3" fill="#e6f6ff" stroke="#7dd3fc" />
                    <rect x="10" y="108" width="30" height="10" rx="2" fill="#e6f6ff" stroke="#7dd3fc" />
                    <rect x="50" y="100" width="30" height="18" rx="3" fill="#fff7ed" stroke="#60a5fa" />
                    <rect x="90" y="106" width="30" height="12" rx="2" fill="#fff7ed" stroke="#60a5fa" />
                  </motion.g>
                </svg>

                {/* instance pills */}
                <div className="absolute right-4 top-4 text-xs text-slate-600">{t.autoscaleLabel}</div>
                <div className="absolute right-4 bottom-4 flex items-center gap-2">
                  <div className="text-xs text-slate-500">{instances}</div>
                  <div className="w-24 h-6 bg-cyan-50 rounded-full flex items-center justify-center text-xs text-cyan-700 shadow">Instances</div>
                </div>
              </div>

              <div className="mt-4">
                <div className="w-full bg-slate-100 rounded-full h-3 overflow-hidden">
                  <div className={`h-3 rounded-full transition-all ${deploySuccess === true ? 'bg-emerald-500' : deploySuccess === false ? 'bg-rose-500' : 'bg-cyan-400'}`} style={{ width: `${deployProgress}%` }} />
                </div>
                <div className="mt-2 text-xs text-slate-600 flex items-center gap-2">
                  <span>{Math.round(deployProgress)}%</span>
                  {deploySuccess === true && (<span className="inline-flex items-center gap-1 text-emerald-600"><FaCheckCircle /> {lang === 'en' ? 'Deployed successfully' : 'सफलतापूर्वक डिप्लॉय हुआ'}</span>)}
                  {deploySuccess === false && (<span className="inline-flex items-center gap-1 text-rose-600">{lang === 'en' ? 'Deployment failed' : 'डिप्लॉय विफल'}</span>)}
                </div>
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="bg-white rounded-2xl p-6 shadow">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-medium text-slate-700">{t.costLabel}</h4>
                <div className="text-xs text-slate-500">{lang === "en" ? 'sample data' : 'नमूना डेटा'}</div>
              </div>

              <div className="w-full h-40 mt-3">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={COST_SCALABILITY} dataKey="value" innerRadius={28} outerRadius={48} paddingAngle={4}>
                      {COST_SCALABILITY.map((entry, i) => (<Cell key={`c-${i}`} fill={COLORS[i % COLORS.length]} />))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </motion.div>

            <div className="text-xs text-slate-400">{lang === "en" ? 'Drop into Tailwind + React project.' : 'Tailwind + React प्रोजेक्ट में जोड़ने के लिए तैयार।'}</div>
          </div>
        </div>

        <div className="mt-8 bg-white rounded-2xl p-6 shadow">
          <h4 className="font-semibold text-slate-700 mb-2">{lang === "en" ? 'Usage & Notes' : 'उपयोग और नोट्स'}</h4>
          <div className="text-sm text-slate-600">
            <p>{lang === "en" ? '1) Copy this file into your React project (e.g., src/components/CloudModule.jsx).' : '1) इस फ़ाइल को अपने React प्रोजेक्ट में कॉपी करें (उदा., src/components/CloudModule.jsx)।'}</p>
            <p className="mt-2">{lang === "en" ? '2) Install dependencies: framer-motion, react-icons, recharts. Ensure Tailwind CSS is configured.' : '2) निर्भरता स्थापित करें: framer-motion, react-icons, recharts। Tailwind कॉन्फ़िगर करें।'}</p>
            <pre className="mt-3 bg-slate-50 p-3 rounded text-xs text-slate-700">{`npm install framer-motion react-icons recharts --save
# or
# yarn add framer-motion react-icons recharts`}</pre>
            <p className="mt-3">{lang === "en" ? '3) Optional: Connect the deploy button to real CI/CD or a cloud CLI to perform actual deployments.' : '3) वैकल्पिक: डिप्लॉय बटन को वास्तविक CI/CD या cloud CLI से जोड़ें ताकि असली डिप्लॉय हो।'}</p>
            <p className="mt-3 text-xs text-slate-500">{lang === "en" ? 'Build fast. Scale responsibly. ☁️' : 'तेज़ बनाएँ। ज़िम्मेदारी से स्केल करें। ☁️'}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
