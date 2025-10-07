import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";

import {
  FaGlobe, FaBroadcastTower, FaCloud, FaShieldAlt, FaBook, FaKeyboard,
  FaCogs, FaProjectDiagram, FaUsers, FaUserSecret, FaRocket, FaSeedling,
  FaHandHoldingHeart, FaLaptopCode, FaUserShield, FaBrain, FaLink, FaHome,
  FaNetworkWired, FaWifi, FaServer, FaRoute, FaEthernet, FaSatelliteDish
} from "react-icons/fa";

const content = {
  en: {
    home: "Home",
    main_title: "The Digital Universe",
    part_title: "Part 4: Understanding Our Digital World",
    modules: {
      1: { title: "Networking Fundamentals", emoji: "🌐" },
      2: { title: "First Steps into the Digital World", emoji: "🚀" },
      3: { title: "Your Life Online", emoji: "💬" },
      4: { title: "The Brain of the Internet", emoji: "🧠" },
      5: { title: "The New Technological Frontier", emoji: "🌌" },
      6: { title: "Our Digital Future & Responsibility", emoji: "🤝" },
      7: { title: "Your Practical Digital Toolkit", emoji: "🛠️" },
    },
    chapters: [
      // Module 1: Networking Fundamentals
      {
        id: 1,
        module: 1,
        title: "Basics of Connectivity",
        concept: "How devices are linked together, both with and without wires.",
        analogy: "The different types of roads (wired) and flight paths (wireless) for data.",
        path: "/part4/basics-of-connectivity",
        icon: <FaNetworkWired className="text-green-500" />,
      },
      {
        id: 2,
        module: 1,
        title: "Computer Networks (LAN, WAN)",
        concept: "Connecting devices in a small area (home, school) versus over large distances (internet).",
        analogy: "A local street network (LAN) versus the national highway system (WAN).",
        path: "/part4/computer-networks",
        icon: <FaUsers className="text-blue-500" />,
      },
      {
        id: 3,
        module: 1,
        title: "Network Topologies",
        concept: "The layout or structure of a network (e.g., bus, star, ring).",
        analogy: "City planning for data: a single main road, a central roundabout, or an interconnected web.",
        path: "/part4/network-topologies",
        icon: <FaProjectDiagram className="text-purple-500" />,
      },
      {
        id: 4,
        module: 1,
        title: "OSI & TCP/IP Models",
        concept: "Layered frameworks that explain how data moves across a network.",
        analogy: "The postal system: writing, packaging, addressing, and delivering a letter in stages.",
        path: "/part4/osi-tcp-ip-models",
        icon: <FaBook className="text-orange-500" />,
      },
      {
        id: 5,
        module: 1,
        title: "Key Networking Devices",
        concept: "Understanding the roles of modems, routers, switches, and firewalls.",
        analogy: "The traffic controllers, signal converters, and security guards of the internet.",
        path: "/part4/networking-devices",
        icon: <FaCogs className="text-gray-500" />,
      },
      {
        id: 6,
        module: 1,
        title: "Bandwidth vs. Latency",
        concept: "The difference between network capacity (speed) and delay (ping).",
        analogy: "A highway's width (bandwidth) versus the time it takes to travel it (latency).",
        path: "/part4/bandwidth-vs-latency",
        icon: <FaRoute className="text-red-500" />,
      },

      // Module 2: Internet Fundamentals
      {
        id: 7,
        module: 2,
        title: "What is the Internet?",
        concept: "A global network of connected computers.",
        analogy: "A giant, worldwide postal system for digital information.",
        path: "/part4/what-is-internet",
        icon: <FaGlobe className="text-blue-500" />,
      },
      {
        id: 8,
        module: 2,
        title: "How Information Travels",
        concept: "Data packets, IP addresses, and DNS.",
        analogy: "Sending a package to a specific address by looking up a name in a universal phonebook.",
        path: "/part4/how-info-travels",
        icon: <FaBroadcastTower className="text-green-500" />,
      },
      {
        id: 9,
        module: 2,
        title: "The Physical Internet",
        concept: "Hardware like undersea cables and satellites.",
        analogy: "The roads and bridges that data travels on.",
        path: "/part4/physical-internet",
        icon: <FaEthernet className="text-gray-500" />,
      },
      {
        id: 10,
        module: 2,
        title: "Building Blocks of a Website",
        concept: "Roles of HTML, CSS, and JavaScript.",
        analogy: "HTML is the frame, CSS is the paint, and JavaScript is the electricity.",
        path: "/part4/website-building-blocks",
        icon: <FaProjectDiagram className="text-purple-500" />,
      },
      {
        id: 11,
        module: 2,
        title: "Internet vs. World Wide Web",
        concept: "Differentiating infrastructure from content.",
        analogy: "The Internet is the library; the Web is the collection of books inside it.",
        path: "/part4/internet-vs-web",
        icon: <FaBook className="text-yellow-500" />,
      },

      // Module 3: Digital Tools & Communication
      {
        id: 12,
        module: 3,
        title: "Browsers and Search Engines",
        concept: "Tools for accessing information.",
        analogy: "A browser is your car; a search engine is the GPS.",
        path: "/part4/browsers-search-engines",
        icon: <FaLaptopCode className="text-red-500" />,
      },
      {
        id: 13,
        module: 3,
        title: "Modern Communication",
        concept: "Email, messaging, and video calls.",
        analogy: "Digital versions of letters, notes, and conversations.",
        path: "/part4/modern-communication",
        icon: <FaHandHoldingHeart className="text-pink-500" />,
      },
      {
        id: 14,
        module: 3,
        title: "Social Media",
        concept: "Online platforms for community.",
        analogy: "Public parks where you meet friends and share.",
        path: "/part4/social-media",
        icon: <FaUsers className="text-indigo-500" />,
      },
      {
        id: 15,
        module: 3,
        title: "The Digital Marketplace",
        concept: "E-commerce and digital payments.",
        analogy: "A global shopping mall that is always open.",
        path: "/part4/digital-marketplace",
        icon: <FaRocket className="text-orange-500" />,
      },
      {
        id: 16,
        module: 3,
        title: "Your Digital Identity",
        concept: "Usernames, avatars, and online personas.",
        analogy: "Masks you wear to various parties.",
        path: "/part4/digital-identity",
        icon: <FaUserSecret className="text-teal-500" />,
      },

      // Module 4: Behind the Scenes
      {
        id: 17,
        module: 4,
        title: "Algorithms: The Invisible Hand",
        concept: "Systems that curate information.",
        analogy: "A personal shopper who suggests items just for you.",
        path: "/part4/algorithms",
        icon: <FaCogs className="text-gray-600" />,
      },
      {
        id: 18,
        module: 4,
        title: "Data: The Fuel of the Digital Age",
        concept: "How data is collected and used.",
        analogy: "Data is like oil, refined to power digital services.",
        path: "/part4/data-fuel",
        icon: <FaCloud className="text-sky-500" />,
      },
      {
        id: 19,
        module: 4,
        title: "Open Knowledge & Collaboration",
        concept: "Platforms like Wikipedia.",
        analogy: "A community garden where everyone contributes.",
        path: "/part4/open-knowledge",
        icon: <FaUsers className="text-green-600" />,
      },
      {
        id: 20,
        module: 4,
        title: "Cookies and Trackers",
        concept: "Files websites use to remember you.",
        analogy: "A shopkeeper who remembers your name.",
        path: "/part4/cookies-trackers",
        icon: <FaUserSecret className="text-red-600" />,
      },

      // Module 5: Emerging Technologies
      {
        id: 21,
        module: 5,
        title: "Artificial Intelligence (AI)",
        concept: "Machines that can learn and reason.",
        analogy: "A smart apprentice who learns from examples.",
        path: "/part4/ai",
        icon: <FaBrain className="text-purple-600" />,
      },
      {
        id: 22,
        module: 5,
        title: "The Internet of Things (IoT)",
        concept: "Physical objects connected to the internet.",
        analogy: "Giving a voice to your fridge and lights.",
        path: "/part4/iot",
        icon: <FaBroadcastTower className="text-blue-600" />,
      },
      {
        id: 23,
        module: 5,
        title: "Blockchain & Web3",
        concept: "A secure, decentralized way to record info.",
        analogy: "A public notebook no one can change alone.",
        path: "/part4/blockchain-web3",
        icon: <FaLink className="text-yellow-600" />,
      },
      {
        id: 24,
        module: 5,
        title: "The API Economy",
        concept: "How apps talk to each other.",
        analogy: "A universal translator for apps.",
        path: "/part4/api-economy",
        icon: <FaCogs className="text-gray-700" />,
      },

      // Module 6: Society & Future of Internet
      {
        id: 25,
        module: 6,
        title: "Digital Citizenship & Ethics",
        concept: "Rights and responsibilities online.",
        analogy: "Rules of the road for the information superhighway.",
        path: "/part4/digital-citizenship",
        icon: <FaHandHoldingHeart className="text-pink-600" />,
      },
      {
        id: 26,
        module: 6,
        title: "Into the Metaverse",
        concept: "Immersive, shared virtual worlds.",
        analogy: "A digital version of the real world you can step into.",
        path: "/part4/metaverse",
        icon: <FaLaptopCode className="text-indigo-600" />,
      },
      {
        id: 27,
        module: 6,
        title: "Building a Greener Internet",
        concept: "The environmental impact of tech.",
        analogy: "Making our digital city eco-friendly.",
        path: "/part4/green-internet",
        icon: <FaSeedling className="text-green-700" />,
      },
      {
        id: 28,
        module: 6,
        title: "The Digital Divide",
        concept: "The gap in tech access.",
        analogy: "A city with highways for some and dirt roads for others.",
        path: "/part4/digital-divide",
        icon: <FaUsers className="text-red-700" />,
      },

      // Module 7: Skills & Safety
      {
        id: 29,
        module: 7,
        title: "Essential Digital Skills",
        concept: "Effective searching and netiquette.",
        analogy: "Your driver's license for the internet.",
        path: "/part4/digital-skills",
        icon: <FaKeyboard className="text-blue-700" />,
      },
      {
        id: 30,
        module: 7,
        title: "Managing Your Digital Footprint",
        concept: "Controlling your online information.",
        analogy: "Gardening your digital self.",
        path: "/part4/digital-footprint",
        icon: <FaUserShield className="text-teal-700" />,
      },
      {
        id: 31,
        module: 7,
        title: "Introduction to Cybersecurity",
        concept: "Basics of online protection.",
        analogy: "Locking the doors of your digital house.",
        path: "/part4/cybersecurity",
        icon: <FaShieldAlt className="text-gray-800" />,
      },
      {
        id: 32,
        module: 7,
        title: "Glossary of Key Terms",
        concept: "A quick-reference dictionary.",
        analogy: "A pocket translator for the digital world.",
        path: "/part4/glossary",
        icon: <FaBook className="text-orange-700" />,
      },
    ]

  },
  hi: {
    home: "होम",
    main_title: "डिजिटल यूनिवर्स",
    part_title: "भाग 4: हमारी डिजिटल दुनिया को समझना",
    modules: {
      1: { title: "नेटवर्किंग की मूल बातें", emoji: "🌐" },
      2: { title: "डिजिटल दुनिया में पहला कदम", emoji: "🚀" },
      3: { title: "आपका ऑनलाइन जीवन", emoji: "💬" },
      4: { title: "इंटरनेट का मस्तिष्क", emoji: "🧠" },
      5: { title: "नई तकनीकी सीमा", emoji: "🌌" },
      6: { title: "हमारा डिजिटल भविष्य और जिम्मेदारी", emoji: "🤝" },
      7: { title: "आपकी प्रैक्टिकल डिजिटल टूलकिट", emoji: "🛠️" },
    },
    chapters: [
      // Module 1: Networking Fundamentals
      {
        id: 1,
        module: 1,
        title: "कनेक्टिविटी की मूल बातें",
        concept: "डिवाइस को तारों के साथ और बिना तारों के कैसे जोड़ा जाता है।",
        analogy: "डेटा के लिए विभिन्न प्रकार की सड़कें (वायर्ड) और उड़ान पथ (वायरलेस)।",
        path: "/part4/basics-of-connectivity",
        icon: <FaNetworkWired className="text-green-500" />,
      },
      {
        id: 2,
        module: 1,
        title: "कंप्यूटर नेटवर्क (LAN, WAN)",
        concept: "छोटे क्षेत्र (घर, स्कूल) बनाम लंबी दूरी (इंटरनेट) पर उपकरणों को जोड़ना।",
        analogy: "एक स्थानीय सड़क नेटवर्क (LAN) बनाम राष्ट्रीय राजमार्ग प्रणाली (WAN)।",
        path: "/part4/computer-networks",
        icon: <FaUsers className="text-blue-500" />,
      },
      {
        id: 3,
        module: 1,
        title: "नेटवर्क टोपोलॉजी",
        concept: "एक नेटवर्क का लेआउट या संरचना (जैसे, बस, स्टार, रिंग)।",
        analogy: "डेटा के लिए शहर की योजना: एक मुख्य सड़क, एक केंद्रीय चौराहा, या एक आपस में जुड़ा हुआ वेब।",
        path: "/part4/network-topologies",
        icon: <FaProjectDiagram className="text-purple-500" />,
      },
      {
        id: 4,
        module: 1,
        title: "OSI और TCP/IP मॉडल",
        concept: "स्तरित ढांचे जो बताते हैं कि डेटा एक नेटवर्क पर कैसे चलता है।",
        analogy: "डाक प्रणाली: एक पत्र को चरणों में लिखना, पैकेजिंग, पता लगाना और वितरित करना।",
        path: "/part4/osi-tcp-ip-models",
        icon: <FaBook className="text-orange-500" />,
      },
      {
        id: 5,
        module: 1,
        title: "मुख्य नेटवर्किंग डिवाइस",
        concept: "मोडेम, राउटर, स्विच और फ़ायरवॉल की भूमिकाओं को समझना।",
        analogy: "इंटरनेट के ट्रैफिक कंट्रोलर, सिग्नल कन्वर्टर्स और सुरक्षा गार्ड।",
        path: "/part4/networking-devices",
        icon: <FaCogs className="text-gray-500" />,
      },
      {
        id: 6,
        module: 1,
        title: "बैंडविड्थ बनाम लेटेंसी",
        concept: "नेटवर्क क्षमता (गति) और देरी (पिंग) के बीच का अंतर।",
        analogy: "एक राजमार्ग की चौड़ाई (बैंडविड्थ) बनाम इसे यात्रा करने में लगने वाला समय (विलंबता)।",
        path: "/part4/bandwidth-vs-latency",
        icon: <FaRoute className="text-red-500" />,
      },

      // Module 2: Internet Basics
      {
        id: 7,
        module: 2,
        title: "इंटरनेट क्या है?",
        concept: "जुड़े हुए कंप्यूटरों का एक वैश्विक नेटवर्क।",
        analogy: "डिजिटल जानकारी के लिए एक विशाल, विश्वव्यापी डाक प्रणाली।",
        path: "/part4/what-is-internet",
        icon: <FaGlobe className="text-blue-500" />,
      },
      {
        id: 8,
        module: 2,
        title: "सूचना कैसे यात्रा करती है",
        concept: "डेटा पैकेट, आईपी पते, और डीएनएस।",
        analogy: "एक सार्वभौमिक फोनबुक (डीएनएस) में एक नाम देखकर एक विशिष्ट सड़क पते (आईपी पता) पर एक पैकेज (डेटा पैकेट) भेजना।",
        path: "/part4/how-info-travels",
        icon: <FaBroadcastTower className="text-green-500" />,
      },
      {
        id: 9,
        module: 2,
        title: "भौतिक इंटरनेट",
        concept: "इंटरनेट का हार्डवेयर, जैसे कि समुद्र के नीचे केबल और उपग्रह।",
        analogy: "सड़कें, पुल, और सुरंगें जिन पर डाक ट्रक (डेटा) यात्रा करते हैं।",
        path: "/part4/physical-internet",
        icon: <FaEthernet className="text-gray-500" />,
      },
      {
        id: 10,
        module: 2,
        title: "एक वेबसाइट के बिल्डिंग ब्लॉक्स",
        concept: "एचटीएमएल, सीएसएस, और जावास्क्रिप्ट की भूमिकाएँ।",
        analogy: "एक घर, जहाँ एचटीएमएल फ्रेम और दीवारें हैं, सीएसएस पेंट और फर्नीचर है, और जावास्क्रिप्ट बिजली और प्लंबिंग है।",
        path: "/part4/website-building-blocks",
        icon: <FaProjectDiagram className="text-purple-500" />,
      },
      {
        id: 11,
        module: 2,
        title: "इंटरनेट बनाम वर्ल्ड वाइड वेब",
        concept: "बुनियादी ढांचे (इंटरनेट) को सामग्री (वेब) से अलग करना।",
        analogy: "इंटरनेट खुद पुस्तकालय भवन है; वर्ल्ड वाइड वेब इसके अंदर की सभी पुस्तकों और पत्रिकाओं का संग्रह है।",
        path: "/part4/internet-vs-web",
        icon: <FaBook className="text-yellow-500" />,
      },

      // Module 3: Communication & Media
      {
        id: 12,
        module: 3,
        title: "ब्राउज़र और सर्च इंजन",
        concept: "वेब पर जानकारी तक पहुँचने और खोजने के उपकरण।",
        analogy: "एक ब्राउज़र आपकी कार है, और एक खोज इंजन जीपीएस है जो आपको डिजिटल शहर में कोई भी पता (वेबसाइट) खोजने में मदद करता है।",
        path: "/part4/browsers-search-engines",
        icon: <FaLaptopCode className="text-red-500" />,
      },
      {
        id: 13,
        module: 3,
        title: "आधुनिक संचार",
        concept: "ईमेल, मैसेजिंग, और वीडियो कॉल।",
        analogy: "पत्रों (ईमेल), त्वरित नोट्स (मैसेजिंग), और आमने-सामने की बातचीत (वीडियो कॉल) के डिजिटल संस्करण।",
        path: "/part4/modern-communication",
        icon: <FaHandHoldingHeart className="text-pink-500" />,
      },
      {
        id: 14,
        module: 3,
        title: "सोशल मीडिया",
        concept: "समुदाय और साझा करने के लिए ऑनलाइन प्लेटफ़ॉर्म।",
        analogy: "विशाल सार्वजनिक पार्कों (फेसबुक, इंस्टाग्राम, आदि) का एक संग्रह जहाँ आप दोस्तों से मिल सकते हैं और अपना जीवन साझा कर सकते हैं।",
        path: "/part4/social-media",
        icon: <FaUsers className="text-indigo-500" />,
      },
      {
        id: 15,
        module: 3,
        title: "डिजिटल बाज़ार",
        concept: "ई-कॉमर्स और डिजिटल भुगतान।",
        analogy: "एक वैश्विक शॉपिंग मॉल जो हमेशा खुला रहता है, जहाँ आप नकदी के बजाय डिजिटल वॉलेट से भुगतान करते हैं।",
        path: "/part4/digital-marketplace",
        icon: <FaRocket className="text-orange-500" />,
      },
      {
        id: 16,
        module: 3,
        title: "आपकी डिजिटल पहचान",
        concept: "उपयोगकर्ता नाम, अवतार, और ऑनलाइन व्यक्तित्व।",
        analogy: "विभिन्न पार्टियों में आपके द्वारा पहने जाने वाले विभिन्न मुखौटे या वेशभूषा, प्रत्येक आपके एक अलग हिस्से का प्रतिनिधित्व करता है।",
        path: "/part4/digital-identity",
        icon: <FaUserSecret className="text-teal-500" />,
      },

      // Module 4: Data & Knowledge
      {
        id: 17,
        module: 4,
        title: "एल्गोरिदम: अदृश्य हाथ",
        concept: "सिस्टम जो आपके लिए जानकारी को क्यूरेट और रैंक करते हैं।",
        analogy: "एक व्यक्तिगत दुकानदार जो आपको पसंद आने वाली चीज़ों को देखता है और फिर केवल आपके लिए नए उत्पादों, फिल्मों, या समाचारों का सुझाव देता है।",
        path: "/part4/algorithms",
        icon: <FaCogs className="text-gray-600" />,
      },
      {
        id: 18,
        module: 4,
        title: "डेटा: डिजिटल युग का ईंधन",
        concept: "डेटा कैसे एकत्र किया जाता है, संग्रहीत किया जाता है (क्लाउड में), और उपयोग किया जाता है।",
        analogy: "डेटा तेल की तरह है; एक मूल्यवान संसाधन जिसे एकत्र किया जाता है, विशाल टैंकों (क्लाउड सर्वर) में संग्रहीत किया जाता है, और डिजिटल सेवाओं को शक्ति देने के लिए परिष्कृत किया जाता है।",
        path: "/part4/data-fuel",
        icon: <FaCloud className="text-sky-500" />,
      },
      {
        id: 19,
        module: 4,
        title: "खुला ज्ञान और सहयोग",
        concept: "विकिपीडिया जैसे स्वयंसेवकों द्वारा बनाए गए प्लेटफ़ॉर्म।",
        analogy: "एक सामुदायिक उद्यान जहाँ हर कोई थोड़ा योगदान देता है ताकि भोजन उगाया जा सके जिसे पूरा शहर मुफ्त में साझा कर सके।",
        path: "/part4/open-knowledge",
        icon: <FaUsers className="text-green-600" />,
      },
      {
        id: 20,
        module: 4,
        title: "कुकीज़ और ट्रैकर्स",
        concept: "छोटी फाइलें जिनका उपयोग वेबसाइटें आपको और आपकी गतिविधि को याद रखने के लिए करती हैं।",
        analogy: "एक दुकानदार जो आपका नाम और पिछली बार आपने क्या खरीदा था, याद रखता है, या एक जासूस जो आपको एक दुकान से दूसरी दुकान तक फॉलो करता है।",
        path: "/part4/cookies-trackers",
        icon: <FaUserSecret className="text-red-600" />,
      },

      // Module 5: Emerging Tech
      {
        id: 21,
        module: 5,
        title: "आर्टिफिशियल इंटेलिजेंस (एआई)",
        concept: "मशीनें जो सीख सकती हैं, तर्क कर सकती हैं और बना सकती हैं।",
        analogy: "एक चतुर प्रशिक्षु जो उदाहरणों से सीखकर अपने दम पर कार्य करता है, जैसे मेल छाँटना या सवालों के जवाब देना।",
        path: "/part4/ai",
        icon: <FaBrain className="text-purple-600" />,
      },
      {
        id: 22,
        module: 5,
        title: "इंटरनेट ऑफ थिंग्स (IoT)",
        concept: "रोजमर्रा की भौतिक वस्तुएं इंटरनेट से जुड़ी हुई हैं।",
        analogy: "अपने फ्रिज, लाइट और घड़ी को एक आवाज और एक दिमाग देना ताकि वे एक-दूसरे से और आपसे बात कर सकें।",
        path: "/part4/iot",
        icon: <FaBroadcastTower className="text-blue-600" />,
      },
      {
        id: 23,
        module: 5,
        title: "ब्लॉकचेन और वेब3",
        concept: "जानकारी रिकॉर्ड करने का एक सुरक्षित, विकेन्द्रीकृत तरीका।",
        analogy: "एक सार्वजनिक डिजिटल नोटबुक जिसकी प्रतिलिपि बनाई जाती है और सभी के साथ साझा की जाती है, इसलिए कोई भी व्यक्ति सार्वभौमिक सहमति के बिना इसे नहीं बदल सकता है।",
        path: "/part4/blockchain-web3",
        icon: <FaLink className="text-yellow-600" />,
      },
      {
        id: 24,
        module: 5,
        title: "एपीआई अर्थव्यवस्था",
        concept: "कैसे विभिन्न ऐप और सेवाएं डेटा साझा करने के लिए एक-दूसरे से 'बात' करती हैं।",
        analogy: "एक सार्वभौमिक अनुवादक जो एक मौसम ऐप को आपके कैलेंडर ऐप के साथ अपनी जानकारी साझा करने देता है।",
        path: "/part4/api-economy",
        icon: <FaCogs className="text-gray-700" />,
      },

      // Module 6: Society & Ethics
      {
        id: 25,
        module: 6,
        title: "डिजिटल नागरिकता और नैतिकता",
        concept: "ऑनलाइन दुनिया में हमारे अधिकार और जिम्मेदारियां।",
        analogy: "सूचना सुपरहाइवे के लिए सड़क के नियम, यह सुनिश्चित करना कि हर कोई सुरक्षित रूप से ड्राइव करे और दूसरों का सम्मान करे।",
        path: "/part4/digital-citizenship",
        icon: <FaHandHoldingHeart className="text-pink-600" />,
      },
      {
        id: 26,
        module: 6,
        title: "मेटावर्स में",
        concept: "इमर्सिव, साझा आभासी दुनिया (वीआर/एआर)।",
        analogy: "वास्तविक दुनिया का एक डिजिटल संस्करण जिसमें आप कदम रख सकते हैं, जैसे एक वीडियो गेम जो पूरी तरह से वास्तविक लगता है।",
        path: "/part4/metaverse",
        icon: <FaLaptopCode className="text-indigo-600" />,
      },
      {
        id: 27,
        module: 6,
        title: "एक हरित इंटरनेट का निर्माण",
        concept: "प्रौद्योगिकी का पर्यावरणीय प्रभाव।",
        analogy: "यह सुनिश्चित करना कि हमारा डिजिटल शहर नवीकरणीय ऊर्जा का उपयोग करके और पुराने इलेक्ट्रॉनिक्स को पुनर्चक्रित करके वास्तविक दुनिया को प्रदूषित न करे।",
        path: "/part4/green-internet",
        icon: <FaSeedling className="text-green-700" />,
      },
      {
        id: 28,
        module: 6,
        title: "डिजिटल डिवाइड",
        concept: "प्रौद्योगिकी तक पहुंच वाले और बिना पहुंच वाले लोगों के बीच की खाई।",
        analogy: "एक ऐसा शहर जहां कुछ पड़ोस में सुपर-फास्ट हाईवे हैं जबकि अन्य में केवल कच्ची सड़कें हैं, जो उनके अवसरों को सीमित करती हैं।",
        path: "/part4/digital-divide",
        icon: <FaUsers className="text-red-700" />,
      },

      // Module 7: Skills & Security
      {
        id: 29,
        module: 7,
        title: "आवश्यक डिजिटल कौशल",
        concept: "प्रभावी खोज, गलत सूचना की पहचान, और नेटिकेट।",
        analogy: "इंटरनेट के लिए आपका ड्राइवर का लाइसेंस—बुनियादी कौशल जिनकी आपको सुरक्षित और प्रभावी ढंग से नेविगेट करने के लिए आवश्यकता है।",
        path: "/part4/digital-skills",
        icon: <FaKeyboard className="text-blue-700" />,
      },
      {
        id: 30,
        module: 7,
        title: "अपने डिजिटल फुटप्रिंट का प्रबंधन",
        concept: "आपके द्वारा ऑनलाइन छोड़ी गई जानकारी को नियंत्रित करना।",
        analogy: "अपने डिजिटल स्व के एक सावधान माली होने के नाते, यह तय करना कि कौन से बीज (पोस्ट, फोटो) लगाने हैं और कौन से खरपतवार हटाने हैं।",
        path: "/part4/digital-footprint",
        icon: <FaUserShield className="text-teal-700" />,
      },
      {
        id: 31,
        module: 7,
        title: "साइबर सुरक्षा का परिचय",
        concept: "ऑनलाइन खतरों से खुद को बचाने की मूल बातें।",
        analogy: "चोरों (हैकर्स) को बाहर रखने के लिए अपने डिजिटल घर के दरवाजे और खिड़कियां बंद करना।",
        path: "/part4/cybersecurity",
        icon: <FaShieldAlt className="text-gray-800" />,
      },
      {
        id: 32,
        module: 7,
        title: "प्रमुख शब्दों की शब्दावली",
        concept: "सभी तकनीकी शब्दों के लिए एक त्वरित-संदर्भ शब्दकोश।",
        analogy: "डिजिटल दुनिया की भाषा को समझने के लिए एक पॉकेट अनुवादक।",
        path: "/part4/glossary",
        icon: <FaBook className="text-orange-700" />,
      },
    ],
  },
};

export default function Part4() {
  const [lang, setLang] = useState("en");
  const navigate = useNavigate();
  const t = content[lang];

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
    };
  }, []);

  const groupedModules = t.chapters.reduce((acc, chapter) => {
    const module = chapter.module;
    if (!acc[module]) {
      acc[module] = [];
    }
    acc[module].push(chapter);
    return acc;
  }, {});

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-indigo-100 to-blue-100 p-4 sm:p-8 font-sans">
      <div className="flex items-center justify-between mb-6">
        <Link
          to="/station"
          className="inline-flex items-center px-4 py-2 bg-white rounded-full shadow-md border border-gray-200 hover:bg-gray-100 transition"
        >
          <FaHome className="mr-2 text-lg text-indigo-600" />
          {t.home}
        </Link>
        <div className="flex space-x-2">
          <button
            onClick={() => setLang("en")}
            className={`px-3 py-1 rounded-lg border font-semibold ${lang === "en"
              ? "bg-indigo-600 text-white border-indigo-600"
              : "bg-white text-gray-700 border-gray-300"
              } transition`}
          >
            EN
          </button>
          <button
            onClick={() => setLang("hi")}
            className={`px-3 py-1 rounded-lg border font-semibold ${lang === "hi"
              ? "bg-indigo-600 text-white border-indigo-600"
              : "bg-white text-gray-700 border-gray-300"
              } transition`}
          >
            हिं
          </button>
        </div>
      </div>

      <motion.h1
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 100 }}
        className="text-3xl sm:text-4xl font-bold text-center text-indigo-700 mb-3"
      >
        {t.main_title}
      </motion.h1>

      <p className="text-center text-purple-600 font-semibold mb-10">
        {t.part_title}
      </p>

      <div className="max-w-4xl mx-auto space-y-12">
        {Object.entries(groupedModules).map(([moduleNumber, chapters]) => (
          <motion.section
            key={moduleNumber}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: moduleNumber * 0.2 }}
          >
            <h2 className="text-2xl font-bold mb-6 text-purple-700 flex items-center gap-3">
              <span className="text-3xl">{t.modules[moduleNumber].emoji}</span>
              Module {moduleNumber}: {t.modules[moduleNumber].title}
            </h2>
            <div className="space-y-4">
              {chapters.map((topic, index) => (
                <motion.div
                  key={topic.id}
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.05, x: 10 }}
                  className="bg-white rounded-2xl shadow-lg p-5 flex items-start gap-5 cursor-pointer hover:shadow-2xl transition-shadow"
                  onClick={() => navigate(topic.path)}
                >
                  <div className="text-3xl mt-1">{topic.icon}</div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-800">{topic.title}</h3>
                    <p className="text-gray-600 text-sm mt-1"><strong>Concept:</strong> {topic.concept}</p>
                    <p className="text-gray-500 text-sm italic mt-1"><strong>Analogy:</strong> {topic.analogy}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.section>
        ))}
      </div>
    </div>
  );
}