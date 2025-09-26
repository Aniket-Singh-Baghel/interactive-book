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
  FaUserSecret,
  FaSearch,
  FaLightbulb,
  FaHome,
  FaArrowLeft,
  FaArrowRight,
  FaUsers,
  FaDollarSign,
  FaHeart,
} from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";

const bilingual = {
  en: {
    home: "Home",
    title: "Freeware, Shareware & Open Source",
    subtitle: "Understanding different ways software is distributed and licensed.",
    concept:
      "Software distribution models are strategies for how software is delivered to end-users. These models define the terms of use, cost, and access to the underlying source code. Think of them as different business plans for software, each with its own philosophy and goals, from widespread adoption to direct revenue or community collaboration.",
    analogy: "Imagine sharing a cake recipe. <strong>Freeware</strong> is like giving someone a slice of cake for free. They can eat it, but they don't know the recipe. <strong>Shareware</strong> is giving them a small bite to try; if they like it, they can buy the whole cake. <strong>Open Source</strong> is like sharing the entire recipe with everyone. Anyone can bake the cake, modify the recipe, and even share their new, improved version with the community.",
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
        {
            name: "Distribution (Freeware/Shareware): GitHub Releases, Itch.io",
            description: "These platforms are like digital storefronts where you can upload the final, ready-to-use version of your software (e.g., an `.exe` or `.dmg` file). This is perfect for **Freeware** (just download and use) and **Shareware** (download a trial version)."
        },
        {
            name: "Distribution (Open Source): npm, PyPI, Maven",
            description: "These are package managers, which are like app stores for programmers. They are the backbone of the **Open Source** world, allowing developers to easily share and use each other's code libraries. When you run `npm install react`, you're using a package manager."
        },
        {
            name: "Monetization (Shareware/OSS): Gumroad, Stripe",
            description: "These services handle the money. They provide the 'buy now' button and process payments. For **Shareware**, they unlock the full version after payment. For **Open Source**, they can be used to sell support, premium features, or accept donations."
        },
        {
            name: "Community (Open Source): GitHub Issues, Discord",
            description: "A project needs a place to live and grow. **GitHub Issues** is a bug tracker. **Discord** and Slack are for real-time chat and community building. These are essential for **Open Source** projects to gather feedback, collaborate on fixes, and build a loyal following."
        }
    ],
    models: {
        freeware: {
            title: "Freeware",
            icon: FaGift,
            color: "green",
            description: "Freeware is software that is available for use at no monetary cost. It's 'free' as in 'free beer'. However, it is typically proprietary, meaning the source code is not available, and users cannot modify or redistribute the software.",
            analogy: "<strong>Analogy: A free radio station.</strong> You can listen to the music for free, but you don't own the songs, and you can't become a DJ on that station. The station makes money through ads or other means, not by selling you the music.",
            examples: ["Google Chrome", "Skype", "VLC Media Player"]
        },
        shareware: {
            title: "Shareware",
            icon: FaPlay,
            color: "amber",
            description: "Shareware is software distributed on a 'try before you buy' basis. Users can download and use the software for a limited time or with limited features. To unlock the full version, they need to pay. It's a marketing method.",
            analogy: "<strong>Analogy: A free trial for a streaming service.</strong> You get to watch movies for 30 days, but after the trial ends, you have to subscribe to keep watching. You get a good sense of the service's value before committing.",
            examples: ["WinRAR (nag-screen)", "Sublime Text (unlimited trial)", "Adobe Photoshop (7-day trial)"]
        },
        opensource: {
            title: "Open Source",
            icon: FaBookOpen,
            color: "sky",
            description: "Open-source software (OSS) is software with source code that anyone can inspect, modify, and enhance. It's 'free' as in 'free speech'. It promotes collaboration and transparency. While often free of charge, businesses can still make money by providing support, hosting, or premium features.",
            analogy: "<strong>Analogy: A community garden.</strong> Everyone has access to the garden plot (the code). You can plant your own vegetables, use what others have grown, and work together to make the garden better for everyone. You might even sell some of your produce at a market.",
            examples: ["Linux Operating System", "VS Code (core is OSS)", "Mozilla Firefox", "React"]
        }
    },
    simulation: {
        title: "Live Simulation",
        description: "Choose a model and see a simulation of its potential outcomes over a short period.",
        metrics_explanation: "The simulation demonstrates how each distribution model might perform across three key metrics: Users (potential reach), Revenue (potential income), and Community (user involvement).",
        metrics_explanation_details: {
            users_revenue: "A large user base doesn't always mean high revenue. <strong>Freeware</strong> often has millions of users but generates little to no direct income. <strong>Shareware</strong>, on the other hand, has fewer users but aims to convert a percentage of them into paying customers, directly linking users to revenue.",
            users_community: "A large user base is the pool from which a community can form. However, they are not the same.",
            community_revenue: "A strong <strong>Open Source</strong> community can drive indirect revenue. Businesses might pay for expert support, consulting, or premium features built on top of the open-source foundation. The community's contributions improve the core product, making these paid services more valuable."
        },
        users_vs_community_title: "Users vs. Community: What's the Difference?",
        users_vs_community_explanation: "A <strong>User</strong> is anyone who uses the software. They are often passive consumers. For example, someone who downloads VLC Media Player to watch a video is a user. A <strong>Community Member</strong> is an active participant. They are a smaller, more engaged subset of users who contribute back to the project. They might report bugs, help others on forums, write documentation, or even submit code improvements. They are invested in the project's future.",
        select: "Select a model",
        start: "Start Simulation",
        users: "Users",
        revenue: "Revenue",
        community: "Community"
    },
    quickChecklist: "Quick checklist",
    usageNotes: "Usage & Notes",
    previous: "Previous",
    next: "Next",
  },
  hi: {
    home: "होम",
    title: "फ्रीवेयर, शेयरवेयर और ओपन सोर्स",
    subtitle: "सॉफ्टवेयर वितरित और लाइसेंस करने के विभिन्न तरीकों को समझना।",
    concept:
      "सॉफ्टवेयर वितरण मॉडल अंतिम-उपयोगकर्ताओं तक सॉफ्टवेयर पहुंचाने की रणनीतियाँ हैं। ये मॉडल उपयोग की शर्तों, लागत और स्रोत कोड तक पहुंच को परिभाषित करते हैं। इन्हें सॉफ्टवेयर के लिए अलग-अलग व्यावसायिक योजनाओं के रूप में सोचें, जिनमें से प्रत्येक का अपना दर्शन और लक्ष्य होता है, जैसे व्यापक रूप से अपनाना, प्रत्यक्ष राजस्व या सामुदायिक सहयोग।",
    analogy: "एक केक रेसिपी साझा करने की कल्पना करें। <strong>फ्रीवेयर</strong> किसी को मुफ्त में केक का एक टुकड़ा देने जैसा है। वे इसे खा सकते हैं, लेकिन उन्हें रेसिपी का पता नहीं है। <strong>शेयरवेयर</strong> उन्हें चखने के लिए एक छोटा सा टुकड़ा देना है; अगर उन्हें यह पसंद है, तो वे पूरा केक खरीद सकते हैं। <strong>ओपन सोर्स</strong> पूरी रेसिपी को सभी के साथ साझा करने जैसा है। कोई भी केक बना सकता है, रेसिपी को संशोधित कर सकता है, और यहां तक कि अपने नए, बेहतर संस्करण को समुदाय के साथ साझा भी कर सकता है।",
    why: [
      "यह स्पष्ट करता है कि सॉफ्टवेयर का उपयोग और पुनर्वितरण कैसे किया जा सकता है।",
      "उपयोगकर्ताओं को लागत, पारदर्शिता और लचीलेपन के आधार पर चयन करने में मदद करता है।",
      "डेवलपर्स और व्यवसायों को मुद्रीकरण और सहयोग पर मार्गदर्शन करता है।",
    ],
    pros: [
      "फ्रीवेयर: अपनाने में कोई बाधा नहीं।",
      "शेयरवेयर: 'खरीदने से पहले कोशिश' करने का अवसर।",
      "ओपन सोर्स: पारदर्शिता, सहयोग और दीर्घकालिक स्थिरता।",
    ],
    cons: [
      "फ्रीवेयर: सीमित नियंत्रण, अक्सर बंद-स्रोत।",
      "शेयरवेयर: बार-बार आने वाले संदेशों या सीमाओं से उपयोगकर्ताओं को परेशान कर सकता है।",
      "ओपन सोर्स: मुद्रीकरण के लिए रखरखाव और स्पष्ट लाइसेंसिंग की आवश्यकता हो सकती है।",
    ],
    how: [
      "लक्ष्य तय करें: व्यापक अपनाना, राजस्व, या समुदाय का निर्माण।",
      "लाइसेंस चुनें: अनुज्ञेय (MIT) बनाम कॉपीलेफ्ट (GPL) बनाम मालिकाना शर्तें।",
      "वितरण तैयार करें: बायनेरिज़, इंस्टॉलर, पैकेज रजिस्ट्रियाँ।",
      "दस्तावेज़, योगदान दिशानिर्देश और सहायता चैनल प्रदान करें।",
    ],
    tools: [
        {
            name: "वितरण (फ्रीवेयर/शेयरवेयर): GitHub Releases, Itch.io",
            description: "ये प्लेटफॉर्म डिजिटल स्टोरफ्रंट की तरह हैं जहाँ आप अपने सॉफ़्टवेयर का अंतिम, उपयोग के लिए तैयार संस्करण (जैसे, `.exe` या `.dmg` फ़ाइल) अपलोड कर सकते हैं। यह **फ्रीवेयर** (बस डाउनलोड करें और उपयोग करें) और **शेयरवेयर** (ट्रायल संस्करण डाउनलोड करें) के लिए एकदम सही है।"
        },
        {
            name: "वितरण (ओपन सोर्स): npm, PyPI, Maven",
            description: "ये पैकेज मैनेजर हैं, जो प्रोग्रामर के लिए ऐप स्टोर की तरह हैं। ये **ओपन सोर्स** दुनिया की रीढ़ हैं, जो डेवलपर्स को आसानी से एक-दूसरे के कोड लाइब्रेरी को साझा करने और उपयोग करने की अनुमति देते हैं। जब आप `npm install react` चलाते हैं, तो आप एक पैकेज मैनेजर का उपयोग कर रहे होते हैं।"
        },
        {
            name: "मुद्रीकरण (शेयरवेयर/ओएसएस): Gumroad, Stripe",
            description: "ये सेवाएँ पैसे का प्रबंधन करती हैं। वे 'अभी खरीदें' बटन प्रदान करते हैं और भुगतान संसाधित करते हैं। **शेयरवेयर** के लिए, वे भुगतान के बाद पूर्ण संस्करण को अनलॉक करते हैं। **ओपन सोर्स** के लिए, उनका उपयोग समर्थन, प्रीमियम सुविधाएँ बेचने या दान स्वीकार करने के लिए किया जा सकता है।"
        },
        {
            name: "समुदाय (ओपन सोर्स): GitHub Issues, Discord",
            description: "एक परियोजना को रहने और बढ़ने के लिए एक जगह की आवश्यकता होती है। **GitHub Issues** एक बग ट्रैकर है। **Discord** और स्लैक रीयल-टाइम चैट और सामुदायिक निर्माण के लिए हैं। ये **ओपन सोर्स** परियोजनाओं के लिए प्रतिक्रिया एकत्र करने, सुधारों पर सहयोग करने और एक वफादार अनुयायी बनाने के लिए आवश्यक हैं।"
        }
    ],
    models: {
        freeware: {
            title: "फ्रीवेयर",
            icon: FaGift,
            color: "green",
            description: "फ्रीवेयर वह सॉफ्टवेयर है जो बिना किसी मौद्रिक लागत के उपयोग के लिए उपलब्ध है। यह 'मुफ्त' है जैसे 'मुफ्त की बीयर'। हालाँकि, यह आमतौर पर प्रोप्राइटरी होता है, जिसका अर्थ है कि स्रोत कोड उपलब्ध नहीं है, और उपयोगकर्ता सॉफ्टवेयर को संशोधित या पुनर्वितरित नहीं कर सकते हैं।",
            analogy: "<strong>उपमा: एक मुफ्त रेडियो स्टेशन।</strong> आप मुफ्त में संगीत सुन सकते हैं, लेकिन आप गानों के मालिक नहीं हैं, और आप उस स्टेशन पर डीजे नहीं बन सकते। स्टेशन विज्ञापनों या अन्य माध्यमों से पैसा कमाता है, न कि आपको संगीत बेचकर।",
            examples: ["गूगल क्रोम", "स्काइप", "वीएलसी मीडिया प्लेयर"]
        },
        shareware: {
            title: "शेयरवेयर",
            icon: FaPlay,
            color: "amber",
            description: "शेयरवेयर 'खरीदने से पहले कोशिश करें' के आधार पर वितरित किया जाने वाला सॉफ्टवेयर है। उपयोगकर्ता सीमित समय के लिए या सीमित सुविधाओं के साथ सॉफ्टवेयर डाउनलोड और उपयोग कर सकते हैं। पूर्ण संस्करण को अनलॉक करने के लिए, उन्हें भुगतान करने की आवश्यकता है। यह एक मार्केटिंग विधि है।",
            analogy: "<strong>उपमा: एक स्ट्रीमिंग सेवा के लिए एक मुफ्त ट्रायल।</strong> आपको 30 दिनों के लिए फिल्में देखने को मिलती हैं, लेकिन ट्रायल समाप्त होने के बाद, आपको देखते रहने के लिए सब्सक्राइब करना होगा। आपको प्रतिबद्ध होने से पहले सेवा के मूल्य का एक अच्छा अंदाजा हो जाता है।",
            examples: ["विनरार (नэг-स्क्रीन)", "सब्लाइम टेक्स्ट (असीमित ट्रायल)", "एडोब फोटोशॉप (7-दिन का ट्रायल)"]
        },
        opensource: {
            title: "ओपन सोर्स",
            icon: FaBookOpen,
            color: "sky",
            description: "ओपन-सोर्स सॉफ्टवेयर (OSS) वह सॉफ्टवेयर है जिसका स्रोत कोड कोई भी देख सकता है, संशोधित कर सकता है और बढ़ा सकता है। यह 'मुक्त' है जैसे 'अभिव्यक्ति की स्वतंत्रता'। यह सहयोग और पारदर्शिता को बढ़ावा देता है। हालांकि अक्सर मुफ्त होता है, व्यवसाय अभी भी सहायता, होस्टिंग या प्रीमियम सुविधाएँ प्रदान करके पैसा कमा सकते हैं।",
            analogy: "<strong>उपमा: एक सामुदायिक उद्यान।</strong> हर किसी की बगीचे की भूमि (कोड) तक पहुंच होती है। आप अपनी सब्जियां लगा सकते हैं, दूसरों द्वारा उगाई गई चीजों का उपयोग कर सकते हैं, और बगीचे को सभी के लिए बेहतर बनाने के लिए मिलकर काम कर सकते हैं। आप अपनी कुछ उपज बाजार में बेच भी सकते हैं।",
            examples: ["लिनक्स ऑपरेटिंग सिस्टम", "वीएस कोड (कोर ओएसएस है)", "मोज़िला फ़ायरफ़ॉक्स", "रिएक्ट"]
        }
    },
    simulation: {
        title: "लाइव सिमुलेशन",
        description: "एक मॉडल चुनें और एक छोटी अवधि में उसके संभावित परिणामों का अनुकरण देखें।",
        metrics_explanation: "यह सिमुलेशन दिखाता है कि प्रत्येक मॉडल तीन प्रमुख मैट्रिक्स पर कैसा प्रदर्शन करता है: उपयोगकर्ता (संभावित पहुंच), राजस्व (संभावित आय), और समुदाय (उपयोगकर्ता की भागीदारी)।",
        metrics_explanation_details: {
            users_revenue: "एक बड़ा उपयोगकर्ता आधार हमेशा उच्च राजस्व का मतलब नहीं है। <strong>फ्रीवेयर</strong> में अक्सर लाखों उपयोगकर्ता होते हैं लेकिन इससे बहुत कम या कोई प्रत्यक्ष आय नहीं होती है। दूसरी ओर, <strong>शेयरवेयर</strong> के कम उपयोगकर्ता होते हैं, लेकिन इसका उद्देश्य उनमें से एक प्रतिशत को भुगतान करने वाले ग्राहकों में बदलना है, जो सीधे उपयोगकर्ताओं को राजस्व से जोड़ता है।",
            users_community: "एक बड़ा उपयोगकर्ता आधार वह पूल है जिससे एक समुदाय बन सकता है। हालांकि, वे एक जैसे नहीं हैं।",
            community_revenue: "एक मजबूत <strong>ओपन सोर्स</strong> समुदाय अप्रत्यक्ष राजस्व चला सकता है। व्यवसाय विशेषज्ञ सहायता, परामर्श, या ओपन-सोर्स नींव के शीर्ष पर निर्मित प्रीमियम सुविधाओं के लिए भुगतान कर सकते हैं। समुदाय के योगदान से मुख्य उत्पाद में सुधार होता है, जिससे ये भुगतान सेवाएं अधिक मूल्यवान हो जाती हैं।"
        },
        users_vs_community_title: "उपयोगकर्ता बनाम समुदाय: क्या अंतर है?",
        users_vs_community_explanation: "एक <strong>उपयोगकर्ता</strong> कोई भी है जो सॉफ्टवेयर का उपयोग करता है। वे अक्सर निष्क्रिय उपभोक्ता होते हैं। उदाहरण के लिए, कोई व्यक्ति जो वीडियो देखने के लिए वीएलसी मीडिया प्लेयर डाउनलोड करता है, वह एक उपयोगकर्ता है। एक <strong>समुदाय का सदस्य</strong> एक सक्रिय भागीदार होता है। वे उपयोगकर्ताओं का एक छोटा, अधिक व्यस्त उपसमूह हैं जो परियोजना में वापस योगदान करते हैं। वे बग की रिपोर्ट कर सकते हैं, मंचों पर दूसरों की मदद कर सकते हैं, दस्तावेज़ लिख सकते हैं, या कोड सुधार भी प्रस्तुत कर सकते हैं। वे परियोजना के भविष्य में निवेशित हैं।",
        select: "एक मॉडल चुनें",
        start: "सिमुलेशन शुरू करें",
        users: "उपयोगकर्ता",
        revenue: "राजस्व",
        community: "समुदाय"
    },
    quickChecklist: "त्वरित चेकलिस्ट",
    usageNotes: "उपयोग और नोट्स",
    previous: "पिछला",
    next: "अगला",
  }
};

const modelStyles = {
    green: {
        container: "p-4 rounded-lg border-l-4 border-green-400 bg-green-50",
        title: "text-lg font-bold text-green-800 flex items-center gap-3",
        icon: "w-6 h-6 text-green-600",
    },
    amber: {
        container: "p-4 rounded-lg border-l-4 border-amber-400 bg-amber-50",
        title: "text-lg font-bold text-amber-800 flex items-center gap-3",
        icon: "w-6 h-6 text-amber-600",
    },
    sky: {
        container: "p-4 rounded-lg border-l-4 border-sky-400 bg-sky-50",
        title: "text-lg font-bold text-sky-800 flex items-center gap-3",
        icon: "w-6 h-6 text-sky-600",
    },
};

const simBarStyles = {
    sky: { icon: "text-sky-500", bg: "bg-sky-500" },
    amber: { icon: "text-amber-500", bg: "bg-amber-500" },
    rose: { icon: "text-rose-500", bg: "bg-rose-500" },
};

const SimulationBar = ({ icon: Icon, label, value, color }) => {
    const styles = simBarStyles[color];
    return (
        <div>
            <div className="flex items-center justify-between mb-1">
                <div className="flex items-center gap-2">
                    <Icon className={`w-4 h-4 ${styles.icon}`} />
                    <span className="text-sm font-medium text-slate-700">{label}</span>
                </div>
                <span className="text-sm font-bold text-slate-800">{Math.round(value)}</span>
            </div>
            <div className="w-full bg-slate-200 rounded-full h-2.5">
                <motion.div
                    className={`h-2.5 rounded-full ${styles.bg}`}
                    initial={{ width: 0 }}
                    animate={{ width: `${value}%` }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                />
            </div>
        </div>
    );
};

const DistributionModelSimulation = ({ t }) => {
    const [model, setModel] = useState(null);
    const [isRunning, setIsRunning] = useState(false);
    const [results, setResults] = useState({ users: 0, revenue: 0, community: 0 });
    const intervalRef = useRef(null);

    const SIMULATION_CONFIG = {
        freeware: { users: 95, revenue: 5, community: 10 },
        shareware: { users: 40, revenue: 80, community: 20 },
        opensource: { users: 70, revenue: 30, community: 90 },
    };

    const startSimulation = () => {
        if (!model) return;
        setIsRunning(true);
        setResults({ users: 0, revenue: 0, community: 0 });

        let progress = 0;
        intervalRef.current = setInterval(() => {
            progress += 5;
            if (progress > 100) {
                clearInterval(intervalRef.current);
                setIsRunning(false);
                return;
            }
            setResults({
                users: (SIMULATION_CONFIG[model].users * progress) / 100,
                revenue: (SIMULATION_CONFIG[model].revenue * progress) / 100,
                community: (SIMULATION_CONFIG[model].community * progress) / 100,
            });
        }, 100);
    };

    useEffect(() => {
        return () => clearInterval(intervalRef.current);
    }, []);

    return (
        <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }} className="bg-white rounded-2xl p-6 shadow">
            <h4 className="text-lg font-semibold flex items-center gap-3">{t.simulation.title}</h4>
            <p className="text-sm text-slate-600 mt-2 italic">{t.simulation.description}</p>
            <p className="text-sm text-slate-600 mt-2 p-2 bg-blue-50 border-l-4 border-blue-400 italic">{t.simulation.metrics_explanation}</p>

            <div className="mt-4">
                <h5 className="text-sm font-bold text-slate-800 mb-2">{t.simulation.select}</h5>
                <div className="grid grid-cols-3 gap-2">
                    {Object.keys(SIMULATION_CONFIG).map((m) => (
                        <button key={m} onClick={() => setModel(m)} disabled={isRunning} className={`p-2 rounded-lg text-sm font-semibold border-2 transition ${model === m ? 'border-emerald-500 bg-emerald-50' : 'border-slate-200 hover:bg-slate-100'}`}>
                            {t.models[m].title}
                        </button>
                    ))}
                </div>
            </div>

            <button onClick={startSimulation} disabled={!model || isRunning} className="mt-4 w-full py-2 px-4 bg-emerald-600 text-white rounded-lg font-semibold hover:bg-emerald-700 disabled:bg-slate-400 transition flex items-center justify-center gap-2">
                <FaPlay />
                {t.simulation.start}
            </button>

            <div className="mt-6 space-y-4">
                <SimulationBar icon={FaUsers} label={t.simulation.users} value={results.users} color="sky" />
                <SimulationBar icon={FaDollarSign} label={t.simulation.revenue} value={results.revenue} color="amber" />
                <SimulationBar icon={FaHeart} label={t.simulation.community} value={results.community} color="rose" />
            </div>
            <div className="mt-6 text-sm text-slate-600 space-y-4">
                <p dangerouslySetInnerHTML={{ __html: t.simulation.metrics_explanation_details.users_revenue }} />
                <p dangerouslySetInnerHTML={{ __html: t.simulation.metrics_explanation_details.users_community }} />
                <p dangerouslySetInnerHTML={{ __html: t.simulation.metrics_explanation_details.community_revenue }} />
                <div className="pt-4 border-t border-slate-200">
                    <h5 className="font-bold text-slate-800">{t.simulation.users_vs_community_title}</h5>
                    <p className="mt-2" dangerouslySetInnerHTML={{ __html: t.simulation.users_vs_community_explanation }} />
                </div>
            </div>
        </motion.div>
    );
};

export default function LicensingModule() {
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

  return (
    <div className="p-6 md:p-10 lg:p-14 bg-gray-50 min-h-screen">
      <div className="max-w-6xl mx-auto">
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

        <div className="text-center mb-6">
            <motion.h1 initial={{ y: -8, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.05 }} className="text-2xl md:text-3xl font-extrabold text-emerald-800">
                {t.title}
            </motion.h1>
            <motion.p initial={{ y: -6, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="text-sm text-emerald-600 italic">
                {t.subtitle}
            </motion.p>
        </div>


        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <motion.div initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.05 }} className="bg-white rounded-2xl p-6 shadow">
              <h3 className="text-lg font-semibold flex items-center gap-3"><FaLightbulb className="w-5 h-5 text-emerald-500" /> {lang === "en" ? "Concept" : "अवधारणा"}</h3>
              <p className="mt-3 text-slate-700 italic">{t.concept}</p>
              <div className="mt-4 p-4 bg-emerald-50 rounded-lg border-l-4 border-emerald-400">
                <h4 className="font-bold text-slate-600">{lang === "en" ? "Analogy" : "उपमा"}</h4>
                <p className="mt-2 text-slate-700 italic" dangerouslySetInnerHTML={{ __html: t.analogy }} />
              </div>
            </motion.div>
            
            <motion.div initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }} className="bg-white rounded-2xl p-6 shadow">
                <h3 className="text-lg font-semibold flex items-center gap-3 mb-4">
                    <FaCodeBranch className="w-5 h-5 text-emerald-600" /> {lang === "en" ? "The Three Models in Detail" : "तीन मॉडल विस्तार से"}
                </h3>
                <div className="space-y-6">
                    {Object.values(t.models).map((model) => {
                        const Icon = model.icon;
                        const styles = modelStyles[model.color];
                        return (
                            <div key={model.title} className={styles.container}>
                                <h4 className={styles.title}>
                                    <Icon className={styles.icon} />
                                    {model.title}
                                </h4>
                                <p className="mt-2 text-slate-700 italic">{model.description}</p>
                                <p className="mt-3 text-slate-600" dangerouslySetInnerHTML={{ __html: model.analogy }} />
                                <div className="mt-4">
                                    <h5 className="font-semibold text-slate-800">{lang === 'en' ? 'Examples:' : 'उदाहरण:'}</h5>
                                    <ul className="mt-2 list-disc list-inside text-slate-700 text-sm">
                                        {model.examples.map((ex, i) => (<li key={i}>{ex}</li>))}
                                    </ul>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.08 }} className="bg-white rounded-2xl p-6 shadow">
                <h3 className="text-lg font-semibold flex items-center gap-3"><FaTag className="w-5 h-5 text-emerald-600" /> {lang === "en" ? "Tools & Platforms" : "उपकरण और प्लेटफॉर्म"}</h3>
                <p className="mt-2 text-slate-700 italic">{lang === "en" ? "Common platforms and services used for software distribution and monetization:" : "सॉफ़्टवेयर वितरण और मुद्रीकरण के लिए उपयोग किए जाने वाले सामान्य प्लेटफ़ॉर्म और सेवाएँ:"}</p>

                <ul className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4 text-slate-700">
                    {t.tools.map((tool, idx) => (
                    <li key={idx} className="flex items-start gap-3 p-3 bg-emerald-50 rounded-lg">
                        <span className="w-8 h-8 flex-shrink-0 flex items-center justify-center bg-white rounded-full shadow-sm"><FaDownload className="w-4 h-4 text-emerald-600" /></span>
                        <div>
                            <div className="font-bold text-sm text-emerald-800">{tool.name}</div>
                            <div className="text-xs text-slate-600 mt-1 italic" dangerouslySetInnerHTML={{ __html: tool.description }} />
                        </div>
                    </li>
                    ))}
                </ul>
            </motion.div>
          </div>

          <div className="space-y-6">
            <DistributionModelSimulation t={t} />
            <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }} className="bg-white rounded-2xl p-6 shadow">
                <h4 className="text-lg font-semibold flex items-center gap-3">{lang === "en" ? "Key Differences" : "मुख्य अंतर"}</h4>
                <div className="mt-4 space-y-3">
                    <div>
                        <h5 className="font-bold text-slate-800">{lang === 'en' ? 'Why needed' : 'क्यों ज़रूरी है'}</h5>
                        <ul className="mt-2 list-disc list-inside text-slate-700 text-sm italic">{t.why.map((w, i) => (<li key={i}>{w}</li>))}</ul>
                    </div>
                    <div>
                        <h5 className="font-bold text-slate-800">{lang === 'en' ? 'Pros' : 'फ़ायदे'}</h5>
                        <ul className="mt-2 list-disc list-inside text-slate-700 text-sm italic">{t.pros.map((p, i) => (<li key={i}>{p}</li>))}</ul>
                    </div>
                    <div>
                        <h5 className="font-bold text-slate-800">{lang === 'en' ? 'Cons' : 'नुकसान'}</h5>
                        <ul className="mt-2 list-disc list-inside text-slate-700 text-sm italic">{t.cons.map((c, i) => (<li key={i}>{c}</li>))}</ul>
                    </div>
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
          </div>
        </div>
        
        <div className="w-full flex justify-between items-center mt-10 p-4 bg-gray-100 rounded-lg shadow-md">
          <button
            onClick={() => navigate("/module4/cloud-computing")}
            className="flex items-center gap-2 px-4 py-2 bg-purple-200 hover:bg-purple-300 text-purple-900 rounded-lg shadow transition"
          >
            <FaArrowLeft />
            {t.previous}
          </button>
          <button
            onClick={() => navigate("/module4/installation-updates")}
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