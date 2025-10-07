import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  FaGlobe,
  FaEnvelope,
  FaServer,
  FaLaptop,
  FaCloud,
  FaArrowRight,
  FaInfoCircle,
  FaPlay,
  FaPause,
} from "react-icons/fa";

// Chapter 1: What is the Internet?
// Single-file React component designed for TailwindCSS + Framer Motion + react-icons
// Positive, light theme, interactive 'live simulation' built with simple state & animations.

export default function Chapter1WhatIsInternet() {
  const [packetRunning, setPacketRunning] = useState(false);
  const [speed, setSpeed] = useState(1); // 0.5 (slow) - 2 (fast)
  const [showGlossary, setShowGlossary] = useState(false);
  const [activeTerm, setActiveTerm] = useState(null);
  const [quizAnswer, setQuizAnswer] = useState(null);
  const [quizResult, setQuizResult] = useState(null);

  const glossary = [
    {
      term: "IP Address",
      short: "किसी भी डिवाइस का विशिष्ट पता।",
      long:
        "IP Address एक अनूठा नंबर होता है जो हर इंटरनेट-संबंधित डिवाइस को दिया जाता है — जैसे घर का पता।",
    },
    {
      term: "Server",
      short: "डेटा और सेवाओं को होस्ट करने वाला कंप्यूटर।",
      long:
        "Server वह कंप्यूटर है जो वेबसाइट, वीडियो या फाइल जैसी चीज़ों को स्टोर करता है और जरूरत पड़ने पर दूसरों को भेजता है।",
    },
    {
      term: "Client",
      short: "सेवा मांगने वाला डिवाइस (आपका फोन/लैपटॉप)।",
      long:
        "Client वो डिवाइस है जो किसी सर्वर से कुछ माँगता है — उदाहरण: जब आप ब्राउज़र में कोई वेबसाइट खोलते हैं।",
    },
    {
      term: "DNS",
      short: "डोमेन नाम सिस्टम — वेबसाइट के नाम को IP में बदलता है।",
      long:
        "DNS एक तरह की फोनबुक है जो वेबसाइट के नाम (जैसे example.com) को उनके IP पते में बदल देती है ताकि ब्राउज़र जान सके कहाँ जाना है।",
    },
    {
      term: "Packet",
      short: "डेटा का एक छोटा टुकड़ा।",
      long:
        "किसी बड़ी फाइल या संदेश को छोटे-छोटे हिस्सों (packets) में बांटा जाता है ताकि वे अलग-अलग रास्तों से तेजी से और सुरक्षित तरीके से पहुँच सकें।",
    },
  ];

  const startSimulation = () => {
    setPacketRunning(true);
    setQuizResult(null);
  };

  const stopSimulation = () => {
    setPacketRunning(false);
  };

  const toggleGlossary = () => setShowGlossary((s) => !s);

  const submitQuiz = () => {
    const correct = quizAnswer === "b";
    setQuizResult(correct ? "सही! 🎉 IP पता एक विशेष पता है।" : "गलत — सही उत्तर: (b) IP Address।");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-sky-50 p-6 text-gray-800">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <header className="flex items-center gap-4 mb-6">
          <div className="p-3 rounded-lg bg-white shadow-md">
            <FaGlobe className="text-3xl text-sky-500" />
          </div>
          <div>
            <h1 className="text-2xl md:text-3xl font-extrabold text-sky-700">What is the Internet?</h1>
            <p className="text-sm text-sky-600 mt-1">Concept: A global network of connected computers.</p>
            <p className="text-sm text-sky-600">Analogy: A giant, worldwide postal system for digital information.</p>
          </div>
        </header>

        {/* Intro Card */}
        <section className="bg-white rounded-2xl p-6 shadow-lg mb-6">
          <p className="text-lg leading-relaxed">
            इंटरनेट असल में बहुत-सी छोटी-छोटी नेटवर्क्स का एक बड़ा जाल है — यह बिलकुल वैसे ही है जैसे आपके शहर
            के सारे रास्ते एक दूसरे से जुड़े हुए हैं।
          </p>

          <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-sky-50 rounded-lg">
              <h3 className="font-semibold text-sky-700">नींव</h3>
              <p className="text-sm">कंप्यूटर और सर्वर जो आपस में जुड़े होते हैं।</p>
            </div>
            <div className="p-4 bg-sky-50 rounded-lg">
              <h3 className="font-semibold text-sky-700">रास्ते</h3>
              <p className="text-sm">तारें, केबल और वायरलेस सिग्नल जो डाटा को ले जाते हैं।</p>
            </div>
            <div className="p-4 bg-sky-50 rounded-lg">
              <h3 className="font-semibold text-sky-700">नियम</h3>
              <p className="text-sm">IP, DNS, और नियम जो डाटा के आदान-प्रदान को नियंत्रित करते हैं।</p>
            </div>
          </div>
        </section>

        {/* Analogy Section */}
        <section className="mb-6">
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="bg-white rounded-2xl p-6 shadow-md"
          >
            <h2 className="text-xl font-bold text-sky-700 mb-3">Analogy — The Global Postal System</h2>
            <p className="leading-relaxed">
              कल्पना कीजिए कि आप किसी दोस्त को चिट्ठी भेजना चाहते हैं। आप उसे एक पता लिखते हैं, और पोस्ट ऑफिस
              उस चिट्ठी को छोटा-छोटा कर के विभिन्न रास्तों से भेजता है—सड़कें, गाड़ी, विमान। इंटरनेट में भी यही होता है:
              आपका संदेश (या फ़ाइल) छोटे पैकेट्स में टूटता है और कई रास्तों से एक साथ भेजा जाता है।
            </p>

            <div className="mt-4 p-4 bg-sky-50 rounded-lg flex items-center gap-4">
              <FaEnvelope className="text-2xl text-sky-500" />
              <div>
                <div className="text-sm font-semibold">चिट्ठी → पैकेट</div>
                <div className="text-xs text-gray-600">बड़ी सामग्री को छोटे पैकेट्स में तोड़ना</div>
              </div>
            </div>
          </motion.div>
        </section>

        {/* Live Simulation */}
        <section className="mb-6">
          <div className="bg-white rounded-2xl p-6 shadow-lg">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-sky-700">Live Simulation — Send a Packet</h3>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => (packetRunning ? stopSimulation() : startSimulation())}
                  className="inline-flex items-center gap-2 px-3 py-2 bg-sky-600 text-white rounded-lg shadow hover:bg-sky-700"
                >
                  {packetRunning ? <FaPause /> : <FaPlay />}
                  <span>{packetRunning ? "Pause" : "Start"}</span>
                </button>

                <div className="flex items-center gap-2 bg-sky-50 rounded-lg px-3 py-2">
                  <label className="text-sm text-sky-600">Speed</label>
                  <input
                    type="range"
                    min={0.5}
                    max={2}
                    step={0.1}
                    value={speed}
                    onChange={(e) => setSpeed(Number(e.target.value))}
                    className="w-32"
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
              {/* left: explanation */}
              <div>
                <h4 className="font-semibold text-sky-700 mb-2">क्या हो रहा है?</h4>
                <p className="text-sm leading-relaxed">
                  निचे की डायग्राम में, <span className="font-semibold">Laptop</span> से एक पैकेट भेजा जाएगा —
                  वह पैकेट राउटर और सर्वर से गुजरेगा और अंत में <span className="font-semibold">Globe</span> पर पहुँचेगा।
                  आप स्टार्ट दबाकर पैकेट को यात्रा करते हुए देख सकते हैं।</p>

                <ul className="mt-3 text-sm space-y-2">
                  <li>• पैकेट = छोटी जानकारी की यूनिट</li>
                  <li>• Router/Server = पैकेट को सही दिशा देता है</li>
                  <li>• DNS = नाम → IP का अनुवाद</li>
                </ul>
              </div>

              {/* center: simulation canvas */}
              <div className="col-span-1 md:col-span-1">
                <div className="relative h-48 bg-gradient-to-b from-white to-sky-50 rounded-xl p-4 flex items-center justify-between">
                  {/* Laptop */}
                  <div className="flex flex-col items-center gap-2">
                    <FaLaptop className="text-3xl text-sky-500" />
                    <div className="text-xs">Laptop (Client)</div>
                  </div>

                  {/* path middle: router/server */}
                  <div className="flex-1 mx-4 flex items-center justify-center relative">
                    <div className="absolute left-0 right-0 top-6 h-0.5 bg-sky-200" />

                    <motion.div
                      animate={{ x: packetRunning ? `calc(100% * ${speed})` : 0 }}
                      transition={{ repeat: Infinity, duration: Math.max(1.6 / speed, 0.4), ease: "linear" }}
                      style={{ left: 0 }}
                      className="absolute w-6 h-6 rounded-full bg-sky-500 shadow-md flex items-center justify-center text-white"
                    >
                      <FaArrowRight />
                    </motion.div>

                    <div className="flex items-center gap-6 z-10">
                      <div className="flex flex-col items-center">
                        <FaCloud className="text-2xl text-sky-400" />
                        <div className="text-xs">Router</div>
                      </div>

                      <div className="flex flex-col items-center">
                        <FaServer className="text-2xl text-sky-400" />
                        <div className="text-xs">Server</div>
                      </div>
                    </div>
                  </div>

                  {/* Globe */}
                  <div className="flex flex-col items-center gap-2">
                    <FaGlobe className="text-3xl text-sky-500" />
                    <div className="text-xs">Internet (Destination)</div>
                  </div>
                </div>

                <div className="mt-3 text-xs text-gray-600">Note: यह एक सरल विज़ुअल है — असली इंटरनेट में पैकेट कई रास्तों से अलग-अलग तरीके से जा सकते हैं।</div>
              </div>

              {/* right: step-by-step */}
              <div>
                <h4 className="font-semibold text-sky-700 mb-2">Step-by-step</h4>
                <ol className="list-decimal pl-5 text-sm space-y-2">
                  <li>आप (Client) वेबसाइट का नाम लिखते हैं (example.com)।</li>
                  <li>DNS उस नाम को IP में बदलता है।</li>
                  <li>आपका ब्राउज़र सर्वर से कनेक्ट होता है और डेटा के छोटे पैकेट माँगता है।</li>
                  <li>पैकेट विभिन्न राउटरों के जरिए पहुँचते हैं और मिलकर फाइल बनाते हैं।</li>
                </ol>
              </div>
            </div>
          </div>
        </section>

        {/* Detailed Concepts */}
        <section className="mb-6">
          <div className="bg-white rounded-2xl p-6 shadow-md">
            <h3 className="text-lg font-bold text-sky-700 mb-3">Deep Dive — आसान भाषा में</h3>

            <div className="space-y-4 text-sm leading-relaxed">
              <div>
                <h4 className="font-semibold">IP Address — कौन कहाँ रहता है</h4>
                <p>
                  हर डिवाइस को एक IP Address मिलता है — जैसे घर का पता। यह बताता है कि पैकेट को कहाँ भेजना है।
                </p>
              </div>

              <div>
                <h4 className="font-semibold">DNS — फोनबुक</h4>
                <p>
                  DNS नामों को IP में बदलता है ताकि कंप्यूटर यह समझ सके कि किस सर्वर से जुड़ना है। आप नाम याद रखना पढ़ते हैं, मशीनें नंबर पसंद करती हैं।
                </p>
              </div>

              <div>
                <h4 className="font-semibold">Packets — छोटी-छोटी चिट्ठियाँ</h4>
                <p>
                  बड़ी फ़ाइलों को छोटे पैकेट्स में बांटा जाता है — यह तेज़ और भरोसेमंद होता है। यदि कोई पैकेट खो जाए तो केवल वो ही दोबारा माँगा जाता है।
                </p>
              </div>

              <div>
                <h4 className="font-semibold">ISP — आपका इंटरनेट दोस्त</h4>
                <p>ISP (Internet Service Provider) वह कंपनी है जो आपको इंटरनेट तक पहुँच देती है — जैसे आपके शहर की लोकल परिवहन सेवा।</p>
              </div>

              <div>
                <h4 className="font-semibold">Latency और Bandwidth</h4>
                <p>
                  Latency = कितनी देर लगती है; Bandwidth = कितनी बड़ी चीज़ एक बार में जा सकती है।
                  कल्पना करें: Latency एक सन्देश के लिए ट्रैफिक लाइट है, और Bandwidth एक सड़क की चौड़ाई है।
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Real Life Examples */}
        <section className="mb-6">
          <div className="bg-white rounded-2xl p-6 shadow-lg">
            <h3 className="text-lg font-bold text-sky-700 mb-3">Real-life Examples</h3>
            <ul className="list-disc pl-5 space-y-2 text-sm">
              <li>
                <strong>Video Streaming:</strong> वीडियो छोटे पैकेट्स में आता है और आपके प्लेयर उन्हें जोड़ता है — यही कारण है कि कभी-कभी बफ़रिंग होता है।
              </li>
              <li>
                <strong>Email:</strong> आपका ईमेल कई सर्वरों के जरिए जाता है और छोटे हिस्सों में भेजा जाता है।
              </li>
              <li>
                <strong>Online Game:</strong> कम latency चाहिए — खिलाड़ी की हर चाल तुरंत पहुँचे यह ज़रूरी है।
              </li>
            </ul>
          </div>
        </section>

        {/* Interactive Glossary */}
        <section className="mb-6">
          <div className="bg-white rounded-2xl p-6 shadow-md">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold text-sky-700">Glossary</h3>
              <button
                onClick={toggleGlossary}
                className="text-sm inline-flex items-center gap-2 px-3 py-2 bg-sky-50 rounded-lg"
              >
                <FaInfoCircle /> {showGlossary ? "Hide" : "Show"}
              </button>
            </div>

            {showGlossary && (
              <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-3">
                {glossary.map((g) => (
                  <div key={g.term} className="p-4 bg-sky-50 rounded-lg">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-semibold">{g.term}</div>
                        <div className="text-xs text-gray-600">{g.short}</div>
                      </div>
                      <button
                        onClick={() => setActiveTerm(activeTerm === g.term ? null : g.term)}
                        className="text-sky-600 text-xs"
                      >
                        {activeTerm === g.term ? "Hide" : "Read"}
                      </button>
                    </div>

                    {activeTerm === g.term && <p className="mt-2 text-sm text-gray-700">{g.long}</p>}
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Mini Quiz */}
        <section className="mb-10">
          <div className="bg-white rounded-2xl p-6 shadow-lg">
            <h3 className="text-lg font-bold text-sky-700 mb-3">Mini Quiz — परखें आपने क्या सीखा</h3>
            <div className="text-sm">
              <p className="mb-3">प्रश्न: IP Address किससे मिलता-जुलता है?</p>
              <div className="flex flex-col gap-2">
                <label className={`p-3 rounded-lg border ${quizAnswer === "a" ? "border-sky-600 bg-sky-50" : "border-gray-200"}`}>
                  <input type="radio" name="q1" value="a" onChange={() => setQuizAnswer("a")} /> a) किसी व्यक्ति का नाम
                </label>
                <label className={`p-3 rounded-lg border ${quizAnswer === "b" ? "border-sky-600 bg-sky-50" : "border-gray-200"}`}>
                  <input type="radio" name="q1" value="b" onChange={() => setQuizAnswer("b")} /> b) घर का पता (location)
                </label>
                <label className={`p-3 rounded-lg border ${quizAnswer === "c" ? "border-sky-600 bg-sky-50" : "border-gray-200"}`}>
                  <input type="radio" name="q1" value="c" onChange={() => setQuizAnswer("c")} /> c) एक गाना
                </label>
              </div>

              <div className="mt-4 flex items-center gap-2">
                <button onClick={submitQuiz} className="px-4 py-2 bg-sky-600 text-white rounded-lg">Submit</button>
                <button onClick={() => { setQuizAnswer(null); setQuizResult(null); }} className="px-4 py-2 bg-sky-50 rounded-lg">Reset</button>
              </div>

              {quizResult && <div className="mt-3 text-sm font-semibold text-sky-700">{quizResult}</div>}
            </div>
          </div>
        </section>

        {/* Footer / Next steps */}
        <footer className="py-6 text-center text-sm text-gray-600">
          <div>अद्भुत — आपने "What is the Internet?" का पहला अध्याय पूरा किया!</div>
          <div className="mt-2">अगला: Module 1 → How Information Travels</div>
        </footer>
      </div>
    </div>
  );
}
