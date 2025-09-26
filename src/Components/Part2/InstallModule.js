import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import {
  FaDownload,
  FaSyncAlt,
  FaTools,
  FaCheckCircle,
  FaExclamationTriangle,
  FaCogs,
  FaCloudDownloadAlt,
  FaPlay,
  FaHome,
  FaArrowLeft,
  FaArrowRight,
} from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";

const bilingual = {
  en: {
    home: "Home",
    title: "Mastering Software: Installation & Updates",
    subtitle: "From initial setup to ongoing maintenance, learn how to manage software effectively.",
    concept: "Software installation is the process of setting up a program on your computer so it can be executed. Updates are new, improved, or fixed versions of the software. This lifecycle is crucial for adding new <strong>features</strong>, fixing <strong>bugs</strong> that cause crashes, and patching <strong>security vulnerabilities</strong> that could be exploited by attackers.",
    analogy: "Think of planting a tree. <strong>Installation</strong> is like planting the sapling in the right spot with good soil. It's the initial setup. <strong>Updates</strong> are like watering the tree, giving it fertilizer, and pruning dead branches. This ongoing care ensures the tree grows strong, stays healthy (bug-free), and is protected from pests (security threats).",
    how: [
      "Use trusted package managers and installers (e.g., apt, yum, npm, pip).",
      "Always test updates in a staging environment before deploying to production systems.",
      "Automate the installation and update process with CI/CD pipelines for consistency.",
      "Implement versioning and have rollback strategies, like canary releases or blue/green deployments.",
      "Continuously monitor the system after an update and have a clear incident response plan.",
    ],
    installLabel: "Run Install",
    checkUpdates: "Check for Updates",
    applyUpdate: "Apply Update",
    previous: "Previous",
    next: "Next",
    simulationExplanation: "This interactive simulation lets you experience the software lifecycle. <strong>Run Install</strong> mimics the initial setup of an application. The progress bar shows the steps involved. Afterwards, you can <strong>Check for Updates</strong> to see if a new version is available. If so, <strong>Apply Update</strong> will patch the software to the latest version. This process is essential for keeping your software secure and functional.",
    securityTitle: "Your Digital Shield: The Role of Security",
    securityExplanation: "In the digital world, security is not just a feature; it's a necessity. When you <strong>install</strong> software, you're placing trust in its developer. Always download from official sources to avoid malicious software (malware) disguised as legitimate programs. <strong>Updates</strong> are your primary defense against new threats. Developers release patches to fix security holes as soon as they're found. Ignoring updates is like leaving your front door unlocked for cybercriminals. <em>Always install updates promptly to protect your data and privacy.</em>",
    howUpdatesHappenTitle: "How Updates Happen",
    howUpdatesHappenContent: "Updates are typically delivered over the internet. Your device periodically checks with the software developer's servers for new versions. When an update is found, it's downloaded and installed. This can happen automatically in the background or require your manual approval.",
    whatUpdatesDoTitle: "What Updates Actually Do",
    whatUpdatesDoContent: "Updates can range from minor bug fixes to major feature overhauls. They replace or modify existing files in the software's installation directory. This could involve patching security holes, improving performance, adding new functionalities, or updating the user interface.",
    whyUpdatesNeededTitle: "Why Updates Are Needed",
    whyUpdatesNeededContent: "Software is rarely perfect upon release. Updates are crucial for fixing bugs discovered after launch, adapting to new technologies, and, most importantly, protecting you from security threats. As new vulnerabilities are found, developers release updates to patch them, keeping your data safe.",
    behindTheScenesTitle: "Behind the Scenes of Updates and Installs",
    behindTheScenesContent: "When you install software, an installer program unpacks compressed files into specific directories (like `C:\\Program Files` on Windows). It then creates shortcuts on your desktop or in the Start Menu for easy access. Crucially, it also integrates with the operating system by creating registry entries (on Windows) or configuration files. These tell the OS where to find the program's files and how it should interact with other software. This is how the program 'attaches' to your system. Updates work similarly, but often use a 'patch' that only contains the changed files, making the process faster.",
    installOnPC: "Install on PC",
    installOnMobile: "Install on Mobile",
    pcInstallPath: "Installing to C:\\Program Files\\MyApp...",
    downloadSample: "Download Sample .exe",
    exeExplanationTitle: "What is a .exe file?",
    exeExplanationContent: "A .exe file (or executable) is a type of file that runs a program on Windows. When you double-click it, the operating system executes the code within the file to install or run the application.",
  },
  hi: {
    home: "होम",
    title: "सॉफ्टवेयर में महारत: इंस्टॉलेशन और अपडेट्स",
    subtitle: "शुरुआती सेटअप से लेकर निरंतर रखरखाव तक, सॉफ्टवेयर को प्रभावी ढंग से प्रबंधित करना सीखें।",
    concept: "सॉफ्टवेयर इंस्टॉलेशन आपके कंप्यूटर पर एक प्रोग्राम को स्थापित करने की प्रक्रिया है ताकि इसे चलाया जा सके। अपडेट्स सॉफ्टवेयर के नए, बेहतर, या सुधारे हुए संस्करण होते हैं। यह जीवनचक्र नई <strong>सुविधाएँ</strong> जोड़ने, क्रैश का कारण बनने वाले <strong>बग्स</strong> को ठीक करने, और हमलावरों द्वारा फायदा उठाए जा सकने वाली <strong>सुरक्षा कमजोरियों</strong> को पैच करने के लिए महत्वपूर्ण है।",
    analogy: "एक पेड़ लगाने के बारे में सोचें। <strong>इंस्टॉलेशन</strong> एक पौधे को सही जगह पर अच्छी मिट्टी के साथ लगाने जैसा है। यह शुरुआती सेटअप है। <strong>अपडेट्स</strong> पेड़ को पानी देने, उसे खाद देने और मृत शाखाओं को काटने जैसा है। यह निरंतर देखभाल सुनिश्चित करती है कि पेड़ मजबूत हो, स्वस्थ रहे (बग-मुक्त), और कीटों (सुरक्षा खतरों) से सुरक्षित रहे।",
    how: [
      "विश्वसनीय पैकेज मैनेजर और इंस्टॉलर (जैसे, apt, yum, npm, pip) का उपयोग करें।",
      "उत्पादन प्रणालियों में तैनात करने से पहले हमेशा एक स्टेजिंग वातावरण में अपडेट का परीक्षण करें।",
      "संगति के लिए CI/CD पाइपलाइनों के साथ स्थापना और अद्यतन प्रक्रिया को स्वचालित करें।",
      "संस्करण लागू करें और रोलबैक रणनीतियाँ रखें, जैसे कैनरी रिलीज़ या ब्लू/ग्रीन परिनियोजन।",
      "अद्यतन के बाद सिस्टम की लगातार निगरानी करें और एक स्पष्ट घटना प्रतिक्रिया योजना बनाएं।",
    ],
    installLabel: "इंस्टॉल चलाएँ",
    checkUpdates: "अपडेट जांचें",
    applyUpdate: "अपडेट लागू करें",
    previous: "पिछला",
    next: "अगला",
    simulationExplanation: "यह इंटरैक्टिव सिमुलेशन आपको सॉफ्टवेयर जीवनचक्र का अनुभव करने देता है। <strong>इंस्टॉल चलाएँ</strong> एक एप्लिकेशन के शुरुआती सेटअप की नकल करता है। प्रगति बार इसमें शामिल कदमों को दिखाता है। बाद में, आप यह देखने के लिए <strong>अपडेट जांचें</strong> कर सकते हैं कि क्या कोई नया संस्करण उपलब्ध है। यदि ऐसा है, तो <strong>अपडेट लागू करें</strong> सॉफ्टवेयर को नवीनतम संस्करण में पैच कर देगा। यह प्रक्रिया आपके सॉफ्टवेयर को सुरक्षित और कार्यात्मक बनाए रखने के लिए आवश्यक है।",
    securityTitle: "आपका डिजिटल कवच: सुरक्षा की भूमिका",
    securityExplanation: "डिजिटल दुनिया में, सुरक्षा केवल एक सुविधा नहीं है; यह एक आवश्यकता है। जब आप सॉफ्टवेयर <strong>इंस्टॉल</strong> करते हैं, तो आप उसके डेवलपर पर भरोसा कर रहे होते हैं। वैध कार्यक्रमों के रूप में छिपे दुर्भावनापूर्ण सॉफ़्टवेयर (मैलवेयर) से बचने के लिए हमेशा आधिकारिक स्रोतों से डाउनलोड करें। <strong>अपडेट्स</strong> नए खतरों के खिलाफ आपकी प्राथमिक रक्षा हैं। डेवलपर्स सुरक्षा छेदों को ठीक करने के लिए पैच जारी करते हैं जैसे ही वे मिलते हैं। अपडेट्स को अनदेखा करना साइबर अपराधियों के लिए अपने सामने का दरवाजा खुला छोड़ने जैसा है। <em>अपने डेटा और गोपनीयता की रक्षा के लिए हमेशा अपडेट तुरंत इंस्टॉल करें।</em>",
    howUpdatesHappenTitle: "अपडेट कैसे होते हैं",
    howUpdatesHappenContent: "अपडेट आमतौर पर इंटरनेट पर दिए जाते हैं। आपका डिवाइस समय-समय पर सॉफ्टवेयर डेवलपर के सर्वर से नए संस्करणों की जांच करता है। जब कोई अपडेट मिलता है, तो उसे डाउनलोड और इंस्टॉल किया जाता है। यह स्वचालित रूप से पृष्ठभूमि में हो सकता है या इसके लिए आपकी मैन्युअल स्वीकृति की आवश्यकता हो सकती है।",
    whatUpdatesDoTitle: "अपडेट वास्तव में क्या करते हैं",
    whatUpdatesDoContent: "अपडेट मामूली बग फिक्स से लेकर बड़े फीचर ओवरहाल तक हो सकते हैं। वे सॉफ़्टवेयर की इंस्टॉलेशन डायरेक्टरी में मौजूदा फ़ाइलों को प्रतिस्थापित या संशोधित करते हैं। इसमें सुरक्षा छेदों को पैच करना, प्रदर्शन में सुधार करना, नई कार्यक्षमताएं जोड़ना, या उपयोगकर्ता इंटरफ़ेस को अपडेट करना शामिल हो सकता है।",
    whyUpdatesNeededTitle: "अपडेट की आवश्यकता क्यों है",
    whyUpdatesNeededContent: "लॉन्च के बाद खोजे गए बग को ठीक करने, नई तकनीकों के अनुकूल होने और सबसे महत्वपूर्ण रूप से, आपको सुरक्षा खतरों से बचाने के लिए अपडेट महत्वपूर्ण हैं। जैसे ही नई कमजोरियां मिलती हैं, डेवलपर्स उन्हें पैच करने के लिए अपडेट जारी करते हैं, जिससे आपका डेटा सुरक्षित रहता है।",
    behindTheScenesTitle: "अपडेट और इंस्टॉल के पर्दे के पीछे",
    behindTheScenesContent: "जब आप सॉफ़्टवेयर इंस्टॉल करते हैं, तो एक इंस्टॉलर प्रोग्राम संपीड़ित फ़ाइलों को विशिष्ट डायरेक्ट्री (जैसे विंडोज पर `C:\\Program Files`) में अनपैक करता है। फिर यह आसान पहुंच के लिए आपके डेस्कटॉप पर या स्टार्ट मेन्यू में शॉर्टकट बनाता है। महत्वपूर्ण रूप से, यह रजिस्ट्री प्रविष्टियाँ (विंडोज पर) या कॉन्फ़िगरेशन फ़ाइलें बनाकर ऑपरेटिंग सिस्टम के साथ एकीकृत होता है। ये OS को बताते हैं कि प्रोग्राम की फाइलें कहाँ मिलेंगी और इसे अन्य सॉफ़्टवेयर के साथ कैसे इंटरैक्ट करना चाहिए। इस तरह प्रोग्राम आपके सिस्टम से 'अटैच' होता है। अपडेट भी इसी तरह काम करते हैं, लेकिन अक्सर एक 'पैच' का उपयोग करते हैं जिसमें केवल बदली हुई फाइलें होती हैं, जिससे प्रक्रिया तेज हो जाती है।",
    installOnPC: "पीसी पर इंस्टॉल करें",
    installOnMobile: "मोबाइल पर इंस्टॉल करें",
    pcInstallPath: "C:\\Program Files\\MyApp पर इंस्टॉल हो रहा है...",
    downloadSample: "नमूना .exe डाउनलोड करें",
    exeExplanationTitle: ".exe फ़ाइल क्या है?",
    exeExplanationContent: ".exe फ़ाइल (या निष्पादन योग्य) एक प्रकार की फ़ाइल है जो विंडोज पर एक प्रोग्राम चलाती है। जब आप इस पर डबल-क्लिक करते हैं, तो ऑपरेटिंग सिस्टम एप्लिकेशन को इंस्टॉल करने या चलाने के लिए फ़ाइल के भीतर कोड निष्पादित करता है।",
  },
};

export default function InstallModule() {
  const [lang, setLang] = useState("en");
  const navigate = useNavigate();
  const t = bilingual[lang];

  const [installing, setInstalling] = useState(false);
  const [installProgress, setInstallProgress] = useState(0);
  const [installSuccess, setInstallSuccess] = useState(null);
  const installRef = useRef(null);

  const [checking, setChecking] = useState(false);
  const [updateAvailable, setUpdateAvailable] = useState(false);
  const [applying, setApplying] = useState(false);
  const [applyProgress, setApplyProgress] = useState(0);
  const applyRef = useRef(null);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.ctrlKey && event.key === "k") {
        event.preventDefault();
        setLang((prevLang) => (prevLang === "en" ? "hi" : "en"));
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      if (installRef.current) clearInterval(installRef.current);
      if (applyRef.current) clearInterval(applyRef.current);
    };
  }, []);

  function startInstall(type) {
    setInstalling(type);
    setInstallProgress(0);
    setInstallSuccess(null);
    installRef.current = setInterval(() => {
      setInstallProgress((p) => {
        const nxt = Math.min(100, p + Math.random() * 22);
        if (nxt >= 100) {
          clearInterval(installRef.current);
          const ok = Math.random() > 0.06;
          setInstallSuccess(ok);
          setInstalling(null);
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
      const found = Math.random() > 0.45;
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
          setApplying(false);
          setUpdateAvailable(false);
          return 100;
        }
        return nxt;
      });
    }, 350);
  }

  return (
    <div className="p-6 md:p-10 lg:p-14 bg-white min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <Link
            to="/parts/prt2"
            className="inline-flex items-center px-4 py-2 bg-gray-100 rounded-full shadow-md border border-gray-200 hover:bg-gray-200 transition"
          >
            <FaHome className="mr-2 text-lg text-sky-600" />
            {t.home}
          </Link>
          <div className="flex items-center gap-3">
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
              HI
            </button>
          </div>
        </div>

        <div className="text-center mb-6">
          <motion.h1
            initial={{ y: -8, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="text-2xl md:text-3xl font-extrabold text-gray-800"
          >
            {t.title}
          </motion.h1>
          <motion.p
            initial={{ y: -6, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="text-sm text-gray-600 italic"
          >
            {t.subtitle}
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-gray-50 rounded-2xl p-6 shadow-sm"
            >
              <h3 className="text-lg font-semibold flex items-center gap-3">
                <FaTools className="w-5 h-5 text-sky-500" />{" "}
                {lang === "en" ? "Concept" : "संकल्पना"}
              </h3>
              <p
                className="mt-3 text-slate-700"
                dangerouslySetInnerHTML={{ __html: t.concept }}
              />

              <div className="mt-6">
                <h4 className="text-sm font-medium text-slate-600">
                  {lang === "en" ? "Analogy" : "उपमा"}
                </h4>
                <p
                  className="mt-2 text-slate-700"
                  dangerouslySetInnerHTML={{ __html: t.analogy }}
                />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-gray-50 rounded-2xl p-6 shadow-sm"
            >
              <h3 className="text-lg font-semibold flex items-center gap-3">
                <FaCogs className="w-5 h-5 text-sky-500" />{" "}
                {lang === "en"
                  ? "How Professionals Do It"
                  : "पेशेवर इसे कैसे करते हैं"}
              </h3>
              <ol className="mt-3 list-decimal list-inside text-slate-700">
                {t.how.map((s, i) => (
                  <li key={i} className="py-1">
                    {s}
                  </li>
                ))}
              </ol>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-gray-50 rounded-2xl p-6 shadow-sm"
            >
              <h3 className="text-lg font-semibold flex items-center gap-3">
                <FaCloudDownloadAlt className="w-5 h-5 text-sky-500" />{" "}
                {t.howUpdatesHappenTitle}
              </h3>
              <p className="mt-3 text-slate-700">{t.howUpdatesHappenContent}</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-gray-50 rounded-2xl p-6 shadow-sm"
            >
              <h3 className="text-lg font-semibold flex items-center gap-3">
                <FaSyncAlt className="w-5 h-5 text-sky-500" /> {t.whatUpdatesDoTitle}
              </h3>
              <p className="mt-3 text-slate-700">{t.whatUpdatesDoContent}</p>
            </motion.div>
          </div>

          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-gray-50 rounded-2xl p-6 shadow-sm"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="bg-sky-100 p-2 rounded-md">
                    <FaCloudDownloadAlt className="w-5 h-5 text-sky-500" />
                  </div>
                  <div>
                    <div className="text-xl font-medium">
                      {lang === "en"
                        ? "Interactive Simulation"
                        : "इंटरैक्टिव सिमुलेशन"}
                    </div>
                    <div className="text-sm text-slate-500">
                      {lang === "en"
                        ? "Simulate installing and updating software."
                        : "सॉफ़्टवेयर स्थापित करने और अद्यतन करने का अनुकरण करें।"}
                    </div>
                  </div>
                </div>
              </div>
              <p className="text-base text-slate-600 mt-4 italic">
                {t.simulationExplanation}
              </p>

              <div className="mt-4 space-y-4">
                <div className="flex gap-2">
                  <button
                    onClick={() => startInstall("pc")}
                    disabled={installing}
                    className="w-full px-3 py-2 rounded-md text-sm inline-flex items-center justify-center gap-2 bg-blue-600 text-white hover:bg-blue-700 disabled:bg-slate-400"
                  >
                    <FaDownload /> {t.installOnPC}
                  </button>
                  <button
                    onClick={() => startInstall("mobile")}
                    disabled={installing}
                    className="w-full px-3 py-2 rounded-md text-sm inline-flex items-center justify-center gap-2 bg-green-600 text-white hover:bg-green-700 disabled:bg-slate-400"
                  >
                    <FaDownload /> {t.installOnMobile}
                  </button>
                </div>

                {installing && (
                  <div className="text-center text-base text-slate-600">
                    {t.pcInstallPath}
                  </div>
                )}

                <div className="w-full bg-slate-200 rounded-full h-3 overflow-hidden mt-2">
                  <div
                    className={`h-3 rounded-full transition-all ${
                      installSuccess === true
                        ? "bg-emerald-500"
                        : installSuccess === false
                        ? "bg-rose-500"
                        : "bg-sky-400"
                    }`}
                    style={{ width: `${installProgress}%` }}
                  />
                </div>
                <div className="mt-2 text-xs text-slate-600 flex items-center gap-2">
                  <span>{Math.round(installProgress)}%</span>
                  {installSuccess === true && (
                    <span className="inline-flex items-center gap-1 text-emerald-600">
                      <FaCheckCircle />{" "}
                      {lang === "en" ? "Installed" : "इंस्टॉल हुआ"}
                    </span>
                  )}
                  {installSuccess === false && (
                    <span className="inline-flex items-center gap-1 text-rose-600">
                      <FaExclamationTriangle />{" "}
                      {lang === "en"
                        ? "Installation failed"
                        : "इंस्टॉल विफल"}
                    </span>
                  )}
                </div>
              </div>

              <div className="mt-4">
                <div className="flex items-center gap-2">
                  <button
                    onClick={checkForUpdates}
                    disabled={checking}
                    className={`flex-1 px-3 py-2 rounded-md text-sm inline-flex items-center justify-center gap-2 ${
                      checking
                        ? "bg-slate-300"
                        : "bg-blue-600 text-white hover:bg-blue-700"
                    }`}
                  >
                    {checking ? "..." : t.checkUpdates}
                  </button>
                  <button
                    onClick={applyUpdate}
                    disabled={!updateAvailable || applying}
                    className={`flex-1 px-3 py-2 rounded-md text-sm inline-flex items-center justify-center gap-2 ${
                      !updateAvailable || applying
                        ? "bg-slate-300"
                        : "bg-blue-500 text-white hover:bg-blue-600"
                    }`}
                  >
                    {applying ? (
                      <FaPlay className="animate-pulse" />
                    ) : (
                      <FaSyncAlt />
                    )}{" "}
                    <span>{t.applyUpdate}</span>
                  </button>
                </div>
                <div className="mt-2 text-sm text-slate-600">
                  {checking
                    ? lang === "en"
                      ? "Checking for updates..."
                      : "अपडेट की जाँच हो रही है..."
                    : updateAvailable
                    ? lang === "en"
                      ? "Update available!"
                      : "अपडेट उपलब्ध!"
                    : lang === "en"
                    ? "No updates found"
                    : "कोई अपडेट नहीं मिला"}
                </div>
                <div className="w-full bg-slate-200 rounded-full h-3 overflow-hidden mt-2">
                  <div
                    className={`h-3 rounded-full transition-all ${
                      applying ? "bg-emerald-500" : "bg-sky-300"
                    }`}
                    style={{ width: `${applyProgress}%` }}
                  />
                </div>
              </div>

              <div className="mt-4 p-4 bg-gray-100 rounded-lg">
                <h4 className="font-semibold text-lg text-gray-800">
                  {t.exeExplanationTitle}
                </h4>
                <p className="text-base text-slate-600 mt-1">
                  {t.exeExplanationContent}
                </p>
                <a
                  href="data:application/octet-stream;base64,ZXhlY3V0YWJsZSBmaWxl"
                  download="sample.exe"
                  className="mt-2 inline-block px-3 py-1 bg-purple-600 text-white text-sm rounded-md hover:bg-purple-700"
                >
                  {t.downloadSample}
                </a>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-gray-50 rounded-2xl p-6 shadow-sm"
            >
              <h3 className="text-lg font-semibold flex items-center gap-3">
                {t.securityTitle}
              </h3>
              <p className="mt-3 text-slate-700 italic">
                {t.securityExplanation}
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-gray-50 rounded-2xl p-6 shadow-sm"
            >
              <h3 className="text-lg font-semibold flex items-center gap-3">
                <FaExclamationTriangle className="w-5 h-5 text-sky-500" />{" "}
                {t.whyUpdatesNeededTitle}
              </h3>
              <p className="mt-3 text-slate-700">{t.whyUpdatesNeededContent}</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
              className="bg-gray-50 rounded-2xl p-6 shadow-sm"
            >
              <h3 className="text-lg font-semibold flex items-center gap-3">
                <FaCogs className="w-5 h-5 text-sky-500" /> {t.behindTheScenesTitle}
              </h3>
              <p className="mt-3 text-slate-700">{t.behindTheScenesContent}</p>
            </motion.div>
          </div>
        </div>

        <div className="w-full flex justify-between items-center mt-10 p-4 bg-gray-100 rounded-lg shadow-md">
          <button
            onClick={() => navigate("/module4/distribution-models")}
            className="flex items-center gap-2 px-4 py-2 bg-purple-200 hover:bg-purple-300 text-purple-900 rounded-lg shadow transition"
          >
            <FaArrowLeft />
            {t.previous}
          </button>
          <button
            onClick={() => navigate("/parts/prt2")}
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