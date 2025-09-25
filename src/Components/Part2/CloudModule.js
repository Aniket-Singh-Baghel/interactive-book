import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import {
  FaCloud,
  FaServer,
  FaCogs,
  FaChartLine,
  FaCopy,
  FaPlay,
  FaCheckCircle,
  FaSpinner,
  FaGlobe,
  FaCloudUploadAlt,
  FaHome,
  FaArrowLeft,
  FaArrowRight,
} from "react-icons/fa";
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip } from "recharts";
import { Link, useNavigate } from "react-router-dom";

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
    home: "Home",
    title: "Cloud Computing",
    subtitle:
      "Delivering computing services—servers, storage, databases, networking—over the Internet.",
    concept:
      "Think of it like this: instead of owning a car (which you have to maintain, insure, and park), you use a ride-sharing service. You get the benefit of transportation without the headache of ownership. Cloud computing is similar. Instead of buying and managing your own servers, you rent computing power from a provider like Amazon, Google, or Microsoft. This allows you to build and run applications without worrying about the underlying infrastructure.",
    analogy:
      "It's like using a streaming service for movies instead of buying DVDs. You get access to a huge library of content on demand, without having to store or manage physical discs. The cloud provides on-demand access to computing resources.",
    why: [
      "No Upfront Cost: You don't need to buy expensive servers.",
      "Pay-as-you-go: You only pay for what you use, like an electricity bill.",
      "Scalability: Easily handle more users as your application grows.",
      "Accessibility: Access your data and applications from anywhere in the world.",
    ],
    pros: [
      "Flexibility: Easily scale your resources up or down as needed.",
      "Reliability: Cloud providers offer high uptime and data redundancy.",
      "Security: Major providers invest heavily in security measures.",
    ],
    cons: [
      "Dependency: You are dependent on the cloud provider.",
      "Cost Management: Costs can escalate if not managed properly.",
      "Security Concerns: Data privacy and security are major concerns.",
    ],
    how: [
      "Choose a provider: AWS, Google Cloud, Microsoft Azure are the most popular.",
      "Select a service: Depending on your needs, you might choose IaaS, PaaS, or SaaS.",
      "Deploy your application: Use the provider's tools to deploy and manage your application.",
      "Monitor and optimize: Continuously monitor your application's performance and cost.",
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
      "Host a personal website or blog on a free tier service like Netlify or Vercel.",
      "Build a simple web application and deploy it on a PaaS like Heroku.",
      "Use cloud storage services like Google Drive or Dropbox to store and share your files.",
    ],
    deploy: "Deploy to Cloud",
    deployAgain: "Deploy Again",
    copySnippet: "Copy snippet",
    autoscaleLabel: "Autoscaling: simulated instances",
    costLabel: "Cost Breakdown (sample)",
    previous: "Previous",
    next: "Next",
  },
  hi: {
    home: "होम",
    title: "क्लाउड कम्प्यूटिंग",
    subtitle:
      "इंटरनेट पर सर्वर, स्टोरेज, डेटाबेस और अन्य कंप्यूटिंग सेवाएँ प्रदान करना।",
    concept:
      "इसे ऐसे समझें: एक कार खरीदने (जिसका आपको रखरखाव, बीमा और पार्किंग करनी पड़ती है) के बजाय, आप एक राइड-शेयरिंग सेवा का उपयोग करते हैं। आपको स्वामित्व की सिरदर्दी के बिना परिवहन का लाभ मिलता है। क्लाउड कंप्यूटिंग भी कुछ ऐसी ही है। अपने स्वयं के सर्वर खरीदने और प्रबंधित करने के बजाय, आप अमेज़ॅन, गूगल, या माइक्रोसॉफ्ट जैसे प्रदाता से कंप्यूटिंग शक्ति किराए पर लेते हैं। यह आपको अंतर्निहित बुनियादी ढांचे की चिंता किए बिना एप्लिकेशन बनाने और चलाने की अनुमति देता है।",
    analogy:
      "यह डीवीडी खरीदने के बजाय फिल्मों के लिए एक स्ट्रीमिंग सेवा का उपयोग करने जैसा है। आपको भौतिक डिस्क को संग्रहीत या प्रबंधित किए बिना, मांग पर सामग्री की एक विशाल लाइब्रेरी तक पहुंच प्राप्त होती है। क्लाउड कंप्यूटिंग संसाधनों तक ऑन-डिमांड पहुंच प्रदान करता है।",
    why: [
      "कोई अग्रिम लागत नहीं: आपको महंगे सर्वर खरीदने की आवश्यकता नहीं है।",
      "जितना उपयोग उतना भुगतान: आप केवल उसी के लिए भुगतान करते हैं जो आप उपयोग करते हैं, जैसे बिजली का बिल।",
      "मापनीयता: जैसे-जैसे आपका एप्लिकेशन बढ़ता है, अधिक उपयोगकर्ताओं को आसानी से संभालें।",
      "पहुंच: दुनिया में कहीं से भी अपने डेटा और एप्लिकेशन तक पहुंचें।",
    ],
    pros: [
      "लचीलापन: आवश्यकतानुसार अपने संसाधनों को आसानी से ऊपर या नीचे करें।",
      "विश्वसनीयता: क्लाउड प्रदाता उच्च अपटाइम और डेटा अतिरेक प्रदान करते हैं।",
      "सुरक्षा: प्रमुख प्रदाता सुरक्षा उपायों में भारी निवेश करते हैं।",
    ],
    cons: [
      "निर्भरता: आप क्लाउड प्रदाता पर निर्भर हैं।",
      "लागत प्रबंधन: यदि ठीक से प्रबंधित नहीं किया गया तो लागत बढ़ सकती है।",
      "सुरक्षा चिंताएँ: डेटा गोपनीयता और सुरक्षा प्रमुख चिंताएँ हैं।",
    ],
    how: [
      "एक प्रदाता चुनें: AWS, Google Cloud, Microsoft Azure सबसे लोकप्रिय हैं।",
      "एक सेवा चुनें: अपनी आवश्यकताओं के आधार पर, आप IaaS, PaaS, या SaaS चुन सकते हैं।",
      "अपना एप्लिकेशन तैनात करें: अपने एप्लिकेशन को तैनात और प्रबंधित करने के लिए प्रदाता के टूल का उपयोग करें।",
      "निगरानी और अनुकूलन करें: अपने एप्लिकेशन के प्रदर्शन और लागत की लगातार निगरानी करें।",
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
      "Netlify या Vercel जैसी मुफ्त टियर सेवा पर एक व्यक्तिगत वेबसाइट या ब्लॉग होस्ट करें।",
      "एक साधारण वेब एप्लिकेशन बनाएं और इसे Heroku जैसे PaaS पर तैनात करें।",
      "अपनी फ़ाइलों को संग्रहीत और साझा करने के लिए Google ड्राइव या ड्रॉपबॉक्स जैसी क्लाउड स्टोरेज सेवाओं का उपयोग करें।",
    ],
    deploy: "क्लाउड पर डिप्लॉय करें",
    deployAgain: "फिर से डिप्लॉय करें",
    copySnippet: "स्निपेट कॉपी करें",
    autoscaleLabel: "ऑटोस्केलिंग: सिम्युलेटेड इंस्टेंसेज़",
    costLabel: "लागत विभाजन (नमूना)",
    previous: "पिछला",
    next: "अगला",
  },
};

export default function CloudModule() {
  const [lang, setLang] = useState("en");
  const navigate = useNavigate();
  const t = bilingual[lang];

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.ctrlKey && event.key === "k") {
        event.preventDefault();
        setLang((prevLang) => (prevLang === "en" ? "hi" : "en"));
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

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
    <div className="p-6 md:p-10 lg:p-14 bg-white min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <Link
            to="/parts/prt2"
            className="inline-flex items-center px-4 py-2 bg-white rounded-full shadow-md border border-gray-200 hover:bg-gray-100 transition"
          >
            <FaHome className="mr-2 text-lg text-sky-600" />
            {t.home}
          </Link>
          <div className="flex space-x-2">
            <button
              onClick={() => setLang("en")}
              className={`px-3 py-1 rounded-lg border font-semibold ${
                lang === "en"
                  ? "bg-sky-600 text-white border-sky-600"
                  : "bg-white text-gray-700 border-gray-300"
              } transition`}
            >
              EN
            </button>
            <button
              onClick={() => setLang("hi")}
              className={`px-3 py-1 rounded-lg border font-semibold ${
                lang === "hi"
                  ? "bg-sky-600 text-white border-sky-600"
                  : "bg-white text-gray-700 border-gray-300"
              } transition`}
            >
              हिं
            </button>
          </div>
        </div>

        <div className="flex items-center gap-4 mb-6">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.4 }}
            className="bg-gray-100 p-2 rounded-lg shadow"
          >
            <FaCloud className="w-6 h-6 text-sky-600" />
          </motion.div>

          <div>
            <motion.h1
              initial={{ y: -8, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.05 }}
              className="text-2xl md:text-3xl font-extrabold text-gray-800"
            >
              {t.title}
            </motion.h1>
            <motion.p
              initial={{ y: -6, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="text-sm text-gray-600"
            >
              {t.subtitle}
            </motion.p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <motion.div
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.05 }}
              className="bg-white rounded-2xl p-6 shadow"
            >
              <h3 className="text-lg font-semibold flex items-center gap-3">
                <FaGlobe className="w-5 h-5 text-sky-600" />{" "}
                {lang === "en" ? "Concept" : "संकल्पना"}
              </h3>
              <p className="mt-3 text-slate-700 italic">{t.concept}</p>

              <div className="mt-4 grid md:grid-cols-2 gap-4">
                <div>
                  <h4 className="text-sm font-medium text-slate-600">
                    {lang === "en" ? "Analogy" : "उपमा"}
                  </h4>
                  <p className="mt-2 text-slate-700 italic">{t.analogy}</p>

                  <h4 className="text-sm font-medium text-slate-600 mt-4">
                    {lang === "en" ? "Why needed" : "क्यों ज़रूरी है"}
                  </h4>
                  <ul className="mt-2 list-disc list-inside text-slate-700">
                    {t.why.map((w, i) => (
                      <li key={i} className="italic">
                        {w}
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="text-sm font-medium text-slate-600">
                    {lang === "en" ? "Pros" : "फ़ायदे"}
                  </h4>
                  <ul className="mt-2 list-disc list-inside text-slate-700">
                    {t.pros.map((p, i) => (
                      <li key={i} className="italic">
                        {p}
                      </li>
                    ))}
                  </ul>

                  <h4 className="text-sm font-medium text-slate-600 mt-4">
                    {lang === "en" ? "Cons" : "नुकसान"}
                  </h4>
                  <ul className="mt-2 list-disc list-inside text-slate-700">
                    {t.cons.map((c, i) => (
                      <li key={i} className="italic">
                        {c}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="mt-6">
                <h4 className="text-sm font-medium text-slate-600">
                  {lang === "en"
                    ? "How professionals use it"
                    : "प्रोफेशनल इसे कैसे उपयोग करते हैं"}
                </h4>
                <ol className="mt-3 list-decimal list-inside text-slate-700">
                  {t.how.map((s, i) => (
                    <li key={i} className="py-1 italic">
                      {s}
                    </li>
                  ))}
                </ol>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.08 }}
              className="bg-white rounded-2xl p-6 shadow"
            >
              <h3 className="text-lg font-semibold flex items-center gap-3">
                <FaServer className="w-5 h-5 text-sky-600" />{" "}
                {lang === "en" ? "Tools & Services" : "उपकरण और सेवाएँ"}
              </h3>
              <p className="mt-2 text-slate-700 italic">
                {lang === "en"
                  ? "Popular cloud platforms and helpful tools:"
                  : "लोकप्रिय क्लाउड प्लेटफ़ॉर्म और सहायक टूल:"}
              </p>

              <ul className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-2 text-slate-700">
                {t.tools.map((tool, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <span className="w-8 h-8 flex items-center justify-center bg-sky-100 rounded-full">
                      <FaCogs className="w-4 h-4 text-sky-600" />
                    </span>
                    <div>
                      <div className="text-sm font-medium bold">{tool}</div>
                      <div className="text-xs text-slate-500 mt-1 italic">
                        {idx % 2 === 0
                          ? lang === "en"
                            ? "Infra / Dev"
                            : "इनफ्रा / देव"
                          : lang === "en"
                          ? "Managed / Platform"
                          : "मैनेज्ड / प्लेटफ़ॉर्म"}
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white rounded-2xl p-6 shadow"
            >
              <h3 className="text-lg font-semibold flex items-center gap-3">
                <FaChartLine className="w-5 h-5 text-sky-600" />{" "}
                {lang === "en"
                  ? "Student & Project Examples"
                  : "छात्र और प्रोजेक्ट उदाहरण"}
              </h3>
              <ul className="mt-3 list-disc list-inside text-slate-700">
                {t.examples.map((ex, i) => (
                  <li key={i} className="py-1 italic">
                    {ex}
                  </li>
                ))}
              </ul>

              <div className="mt-4 bg-slate-50 rounded p-3">
                <pre className="whitespace-pre-wrap text-xs text-slate-800 overflow-auto">
                  {SAMPLE_DEPLOY_SNIPPET}
                </pre>
                <div className="mt-2 flex items-center gap-2">
                  <button
                    onClick={copySnippet}
                    className="inline-flex items-center gap-2 px-3 py-1 rounded-md border text-slate-700 hover:bg-slate-100"
                  >
                    <FaCopy /> <span className="text-xs">{t.copySnippet}</span>
                  </button>
                  <div className="text-xs text-slate-500 italic">
                    {lang === "en"
                      ? "(Deployment snippet)"
                      : "(डिप्लॉयमेंट स्निपेट)"}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right column: interactive + chart */}
          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.08 }}
              className="bg-white rounded-2xl p-6 shadow"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="bg-sky-100 p-2 rounded-md">
                    <FaCloudUploadAlt className="w-5 h-5 text-sky-600" />
                  </div>
                  <div>
                    <div className="text-sm font-medium bold">
                      {lang === "en"
                        ? "Interactive Deploy"
                        : "इंटरैक्टिव डिप्लॉय"}
                    </div>
                    <div className="text-xs text-slate-500 italic">
                      {lang === "en"
                        ? "Simulate deploying an app and see autoscaling in action."
                        : "एक ऐप को सिम्युलेटेड रूप से डिप्लॉय करें और ऑटोस्केल देखें।"}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={startDeploy}
                    disabled={deploying}
                    className={`px-3 py-1 rounded-md text-sm inline-flex items-center gap-2 ${
                      deploying
                        ? "bg-slate-400 text-white"
                        : "bg-sky-600 text-white hover:bg-sky-700"
                    }`}
                  >
                    {deploying ? (
                      <FaSpinner className="animate-spin" />
                    ) : (
                      <FaPlay />
                    )}{" "}
                    <span>{deploying ? t.deploy + "..." : t.deploy}</span>
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
                  <motion.g
                    initial={{ y: 40 }}
                    animate={{ y: [40, 34, 40] }}
                    transition={{ duration: 4, repeat: Infinity }}
                  >
                    <ellipse
                      cx="150"
                      cy="70"
                      rx="110"
                      ry="36"
                      fill="url(#cg)"
                      opacity="0.95"
                    />
                    <circle cx="90" cy="60" r="28" fill="#7dd3fc" />
                    <circle cx="140" cy="48" r="36" fill="#38bdf8" />
                    <circle cx="200" cy="60" r="26" fill="#60a5fa" />
                  </motion.g>

                  {/* small data centers (servers) moving toward cloud when deployed */}
                  <motion.g
                    initial={{ x: -40 }}
                    animate={{
                      x: deploying ? [-40, 20, 80, 130, 180, 220] : [-40, -40],
                    }}
                    transition={{ duration: 6, repeat: deploying ? Infinity : 0 }}
                  >
                    <rect
                      x="-20"
                      y="100"
                      width="30"
                      height="18"
                      rx="3"
                      fill="#e6f6ff"
                      stroke="#7dd3fc"
                    />
                    <rect
                      x="10"
                      y="108"
                      width="30"
                      height="10"
                      rx="2"
                      fill="#e6f6ff"
                      stroke="#7dd3fc"
                    />
                    <rect
                      x="50"
                      y="100"
                      width="30"
                      height="18"
                      rx="3"
                      fill="#fff7ed"
                      stroke="#60a5fa"
                    />
                    <rect
                      x="90"
                      y="106"
                      width="30"
                      height="12"
                      rx="2"
                      fill="#fff7ed"
                      stroke="#60a5fa"
                    />
                  </motion.g>
                </svg>

                {/* instance pills */}
                <div className="absolute right-4 top-4 text-xs text-slate-600 italic">
                  {t.autoscaleLabel}
                </div>
                <div className="absolute right-4 bottom-4 flex items-center gap-2">
                  <div className="text-xs text-slate-500">{instances}</div>
                  <div className="w-24 h-6 bg-sky-100 rounded-full flex items-center justify-center text-xs text-sky-700 shadow">
                    Instances
                  </div>
                </div>
              </div>

              <div className="mt-4">
                <div className="w-full bg-slate-100 rounded-full h-3 overflow-hidden">
                  <div
                    className={`h-3 rounded-full transition-all ${
                      deploySuccess === true
                        ? "bg-emerald-500"
                        : deploySuccess === false
                        ? "bg-rose-500"
                        : "bg-sky-400"
                    }`}
                    style={{ width: `${deployProgress}%` }}
                  />
                </div>
                <div className="mt-2 text-xs text-slate-600 flex items-center gap-2">
                  <span>{Math.round(deployProgress)}%</span>
                  {deploySuccess === true && (
                    <span className="inline-flex items-center gap-1 text-emerald-600">
                      <FaCheckCircle />{" "}
                      {lang === "en"
                        ? "Deployed successfully"
                        : "सफलतापूर्वक डिप्लॉय हुआ"}
                    </span>
                  )}
                  {deploySuccess === false && (
                    <span className="inline-flex items-center gap-1 text-rose-600">
                      {lang === "en" ? "Deployment failed" : "डिप्लॉय विफल"}
                    </span>
                  )}
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white rounded-2xl p-6 shadow"
            >
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-medium text-slate-700 bold">
                  {t.costLabel}
                </h4>
                <div className="text-xs text-slate-500 italic">
                  {lang === "en" ? "sample data" : "नमूना डेटा"}
                </div>
              </div>

              <div className="w-full h-40 mt-3">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={COST_SCALABILITY}
                      dataKey="value"
                      innerRadius={28}
                      outerRadius={48}
                      paddingAngle={4}
                    >
                      {COST_SCALABILITY.map((entry, i) => (
                        <Cell
                          key={`c-${i}`}
                          fill={COLORS[i % COLORS.length]}
                        />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </motion.div>
          </div>
        </div>
        <div className="w-full flex justify-between items-center mt-10 p-4 bg-gray-100 rounded-lg shadow-md">
          <button
            onClick={() => navigate("/module4/security")}
            className="flex items-center gap-2 px-4 py-2 bg-purple-200 hover:bg-purple-300 text-purple-900 rounded-lg shadow transition"
          >
            <FaArrowLeft />
            {t.previous}
          </button>
          <button
            onClick={() => navigate("/module4/distribution-models")}
            className="flex items-center gap-2 px-4 py-2 bg-green-200 hover:bg-green-300 text-green-900 rounded-lg shadow transition"
          >
            {t.next}
            <FaArrowRight />
          </button>
        </div>
      </div>
    </div>
  );
}
