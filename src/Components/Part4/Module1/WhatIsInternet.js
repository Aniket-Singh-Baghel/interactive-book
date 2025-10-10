import React, { useState, useEffect } from "react";
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
  FaHome,
  FaArrowLeft,
  FaArrowRight as FaArrowRightNav,
  FaHistory, 
  FaBookOpen,
} from "react-icons/fa";
import { Link } from "react-router-dom";

// Content object for multilingual support
const content = {
  en: {
    home: "Home",
    header: {
      title: "What is the Internet?",
      concept: "Concept: A global network of connected computers.",
      analogy: "Analogy: A giant, worldwide postal system for digital information.",
    },
    intro: {
      p1: "The internet is really a giant web of many smaller networks all connected — just like how all the roads in your city are linked together.",
      foundation: {
        title: "Foundation",
        text: "Computers and servers that are connected.",
      },
      pathways: {
        title: "Pathways",
        text: "The wires, cables, and wireless signals that carry data.",
      },
      rules: {
        title: "Rules",
        text: "Protocols like IP and DNS that govern data exchange.",
      },
    },
    history: {
      title: "A Brief History of the Internet",
      p1: "The internet didn't just appear overnight! It started in the 1960s as a US military project called ARPANET, designed to be a decentralized network that could survive a major disaster.",
      p2: "In the 1990s, it became publicly available, and with the invention of the World Wide Web, it transformed into the internet we know today. It has grown from a few connected computers to a global phenomenon that has changed everything.",
      timeline: {
        title: "Key Milestones",
        t1: {
          year: "1969",
          event: "ARPANET goes live.",
        },
        t2: {
          year: "1983",
          event: "TCP/IP protocol is adopted, creating a true network of networks.",
        },
        t3: {
          year: "1991",
          event: "The World Wide Web becomes publicly available.",
        },
        t4: {
          year: "2000s",
          event: "Broadband, social media, and smartphones make the internet a part of daily life.",
        },
      },
    },
    dnsIp: {
        title: "The Internet's Address Book: DNS and IP",
        p1: "To find anything on the internet, your computer needs an address, just like a house. The internet uses two systems for this: IP addresses and DNS.",
        ip: {
          title: "IP Address: The Real Address",
          p1: "Every device connected to the internet has a unique IP (Internet Protocol) address. It's a series of numbers like `192.168.1.1` or `2001:0db8:85a3:0000:0000:8a2e:0370:7334`.",
          analogy: {
            title: "Analogy: A Phone Number",
            text: "Think of an IP address as a phone number. Every phone has a unique number, and to call someone, you need to know their exact number. Similarly, to connect to a website, your computer needs its IP address.",
          },
        },
        dns: {
          title: "DNS: The Friendly Name",
          p1: "Remembering long strings of numbers is hard for us. That's where DNS (Domain Name System) comes in. DNS is like the internet's phonebook. It translates human-friendly domain names (like `google.com`) into computer-friendly IP addresses.",
          analogy: {
            title: "Analogy: Contacts in Your Phone",
            text: "You don't remember all your friends' phone numbers. You save them with their names in your contacts. When you want to call a friend, you just tap their name, and your phone automatically dials the number. DNS does the same for websites.",
          },
        },
        requestResponse: {
          title: "The Request-Response Cycle",
          p1: "When you type a website address and hit Enter, a whole conversation happens in seconds. This is the request-response cycle:",
          steps: {
            s1: {
              title: "1. You make a Request",
              text: "You type `google.com` into your browser. Your browser sends a request to a DNS server: 'What's the IP address for google.com?'",
            },
            s2: {
              title: "2. DNS Responds",
              text: "The DNS server looks up `google.com` in its directory and finds the corresponding IP address (e.g., `172.217.168.46`). It sends this IP address back to your browser.",
            },
            s3: {
              title: "3. Your Browser makes another Request",
              text: "Now that your browser has the IP address, it sends a request directly to that address: 'Please send me the content of your homepage.'",
            },
            s4: {
              title: "4. The Server Responds",
              text: "The Google server receives your request, gathers all the necessary files (HTML, CSS, JavaScript), and sends them back to your browser. Your browser then assembles these files and displays the webpage for you.",
            },
          },
        },
    },
    analogy: {
      title: "Analogy — The Global Postal System",
      p1: "Imagine you want to send a letter to a friend. You write an address on it, and the post office sends it through various routes—roads, trucks, planes. The internet does the same: your message (or file) is broken into small packets and sent along many paths at once.",
      box: {
        title: "Letter → Packet",
        text: "Breaking down large content into smaller packets.",
      },
    },
    simulation: {
      title: "Live Simulation — Send a Packet",
      buttons: {
        start: "Start",
        pause: "Pause",
        speed: "Speed",
      },
      explanation: {
        title: "What's Happening?",
        p1: "In the diagram below, a packet will be sent from the <strong>Laptop</strong>. It will travel through routers and servers to finally reach the <strong>Globe</strong>. Press start to see the packet's journey.",
        li1: "Packet = A small unit of information",
        li2: "Router/Server = Directs the packet correctly",
        li3: "DNS = Translates name → IP address",
      },
      canvas: {
        client: "Laptop (Client)",
        router: "Router",
        server: "Server",
        destination: "Internet (Destination)",
        note: "Note: This is a simplified visual. In the real internet, packets can take many different routes.",
      },
      steps: {
        title: "Step-by-step",
        li1: "You (the Client) type a website name (e.g., example.com).",
        li2: "DNS translates that name into an IP address.",
        li3: "Your browser connects to the server and requests small packets of data.",
        li4: "The packets travel through various routers and are assembled to form the file.",
      },
    },
    deepDive: {
      title: "Deep Dive — In Simple Terms",
      ip: {
        title: "IP Address — Who Lives Where",
        text: "Every device gets an IP Address — like a home address. It tells packets where to go.",
      },
      dns: {
        title: "DNS — The Phonebook",
        text: "DNS translates names to IPs so computers know which server to connect to. You remember names, machines prefer numbers.",
      },
      packets: {
        title: "Packets — The Little Letters",
        text: "Large files are broken into small packets — it's faster and more reliable. If one packet gets lost, only that one needs to be resent.",
      },
      isp: {
        title: "ISP — Your Internet Friend",
        text: "An ISP (Internet Service Provider) is the company that gives you access to the internet — like your city's local transport service.",
      },
      latency: {
        title: "Latency and Bandwidth",
        text: "Latency = how long it takes; Bandwidth = how much can go at once. Think of it this way: Latency is the traffic light for a message, and Bandwidth is the width of the road.",
      },
    },
    examples: {
      title: "Real-life Examples",
      li1: "<strong>Video Streaming:</strong> The video comes in small packets that your player assembles — this is why buffering sometimes happens.",
      li2: "<strong>Email:</strong> Your email travels through multiple servers and is sent in small pieces.",
      li3: "<strong>Online Gaming:</strong> Low latency is crucial — every move a player makes needs to arrive instantly.",
    },
    glossary: {
      title: "Glossary",
      toggle: {
        show: "Show",
        hide: "Hide",
        read: "Read",
      },
      terms: [
        {
          term: "IP Address",
          short: "A unique address for any device.",
          long: "An IP Address is a unique number assigned to every internet-connected device — like a home address.",
        },
        {
          term: "Server",
          short: "A computer that hosts data and services.",
          long: "A Server is a computer that stores things like websites, videos, or files and sends them to others when needed.",
        },
        {
          term: "Client",
          short: "A device asking for a service (your phone/laptop).",
          long: "A Client is a device that requests something from a server — for example, when you open a website in your browser.",
        },
        {
          term: "DNS",
          short: "Domain Name System — converts website names to IPs.",
          long: "DNS is like a phonebook that translates website names (like example.com) into their IP addresses so the browser knows where to go.",
        },
        {
          term: "Packet",
          short: "A small piece of data.",
          long: "A large file or message is broken down into small pieces (packets) so they can travel quickly and securely along different paths.",
        },
      ],
    },
    footer: {
        p1: "Awesome — you've completed the first chapter on 'What is the Internet?'!",
        p2: "Next: Module 1 → How Information Travels",
        prev: "Previous",
        next: "Next",
    },
  },
  hi: {
    home: "होम",
    header: {
      title: "इंटरनेट क्या है?",
      concept: "मुख्य ধারণা: जुड़े हुए कंप्यूटरों का एक वैश्विक नेटवर्क।",
      analogy: "उपमा: डिजिटल जानकारी के लिए एक विशाल, विश्वव्यापी डाक प्रणाली।",
    },
    intro: {
      p1: "इंटरनेट वास्तव में कई छोटे-छोटे नेटवर्कों का एक विशाल जाल है — ठीक वैसे ही जैसे आपके शहर की सभी सड़कें एक-दूसरे से जुड़ी होती हैं।",
      foundation: {
        title: "नींव",
        text: "कंप्यूटर और सर्वर जो आपस में जुड़े होते हैं।",
      },
      pathways: {
        title: "रास्ते",
        text: "तार, केबल और वायरलेस सिग्नल जो डेटा ले जाते हैं।",
      },
      rules: {
        title: "नियम",
        text: "IP और DNS जैसे प्रोटोकॉल जो डेटा के आदान-प्रदान को नियंत्रित करते हैं।",
      },
    },
    history: {
        title: "इंटरनेट का संक्षिप्त इतिहास",
        p1: "इंटरनेट रातों-रात नहीं बना! यह 1960 के दशक में एक अमेरिकी सैन्य परियोजना के रूप में शुरू हुआ, जिसे ARPANET कहा जाता था, जिसे एक विकेन्द्रीकृत नेटवर्क के रूप में डिज़ाइन किया गया था जो एक बड़ी आपदा से बच सकता था।",
        p2: "1990 के दशक में, यह सार्वजनिक रूप से उपलब्ध हो गया, और वर्ल्ड वाइड वेब के आविष्कार के साथ, यह आज हमारे द्वारा जाने जाने वाले इंटरनेट में बदल गया। यह कुछ जुड़े हुए कंप्यूटरों से बढ़कर एक वैश्विक घटना बन गया है जिसने सब कुछ बदल दिया है।",
        timeline: {
          title: "मुख्य मील के पत्थर",
          t1: {
            year: "1969",
            event: "ARPANET लाइव हुआ।",
          },
          t2: {
            year: "1983",
            event: "TCP/IP प्रोटोकॉल को अपनाया गया, जिससे नेटवर्क का एक सच्चा नेटवर्क बना।",
          },
          t3: {
            year: "1991",
            event: "वर्ल्ड वाइड वेब सार्वजनिक रूप से उपलब्ध हुआ।",
          },
          t4: {
            year: "2000 का दशक",
            event: "ब्रॉडबैंड, सोशल मीडिया और स्मार्टफोन ने इंटरनेट को दैनिक जीवन का हिस्सा बना दिया।",
          },
        },
    },
    dnsIp: {
        title: "इंटरनेट की पता पुस्तिका: DNS और IP",
        p1: "इंटरनेट पर कुछ भी खोजने के लिए, आपके कंप्यूटर को एक पते की आवश्यकता होती है, ठीक एक घर की तरह। इंटरनेट इसके लिए दो प्रणालियों का उपयोग करता है: IP पते और DNS।",
        ip: {
          title: "IP पता: असली पता",
          p1: "इंटरनेट से जुड़े हर डिवाइस का एक अनूठा IP (इंटरनेट प्रोटोकॉल) पता होता है। यह `192.168.1.1` या `2001:0db8:85a3:0000:0000:8a2e:0370:7334` जैसी संख्याओं की एक श्रृंखला है।",
          analogy: {
            title: "उपमा: एक फ़ोन नंबर",
            text: "एक IP पते को एक फ़ोन नंबर के रूप में सोचें। हर फ़ोन का एक अनूठा नंबर होता है, और किसी को कॉल करने के लिए, आपको उनका सटीक नंबर जानना होगा। इसी तरह, किसी वेबसाइट से कनेक्ट करने के लिए, आपके कंप्यूटर को उसके IP पते की आवश्यकता होती है।",
          },
        },
        dns: {
          title: "DNS: दोस्ताना नाम",
          p1: "हमारे लिए संख्याओं की लंबी श्रृंखलाओं को याद रखना कठिन है। यहीं पर DNS (डोमेन नेम सिस्टम) काम आता है। DNS इंटरनेट की फोनबुक की तरह है। यह मानव-अनुकूल डोमेन नामों (जैसे `google.com`) को कंप्यूटर-अनुकूल IP पतों में अनुवादित करता है।",
          analogy: {
            title: "उपमा: आपके फ़ोन में संपर्क",
            text: "आपको अपने सभी दोस्तों के फ़ोन नंबर याद नहीं रहते। आप उन्हें अपने संपर्कों में उनके नामों से सहेजते हैं। जब आप किसी मित्र को कॉल करना चाहते हैं, तो आप बस उनके नाम पर टैप करते हैं, और आपका फ़ोन स्वचालित रूप से नंबर डायल करता है। DNS वेबसाइटों के लिए भी यही करता है।",
          },
        },
        requestResponse: {
          title: "अनुरोध-प्रतिक्रिया चक्र",
          p1: "जब आप एक वेबसाइट का पता टाइप करते हैं और एंटर दबाते हैं, तो सेकंडों में एक पूरी बातचीत होती है। यह अनुरोध-प्रतिक्रिया चक्र है:",
          steps: {
            s1: {
              title: "1. आप एक अनुरोध करते हैं",
              text: "आप अपने ब्राउज़र में `google.com` टाइप करते हैं। आपका ब्राउज़र एक DNS सर्वर को एक अनुरोध भेजता है: 'google.com' के लिए IP पता क्या है?",
            },
            s2: {
              title: "2. DNS प्रतिक्रिया देता है",
              text: "DNS सर्वर अपनी निर्देशिका में `google.com` को देखता है और संबंधित IP पता (जैसे, `172.217.168.46`) पाता है। यह इस IP पते को आपके ब्राउज़र पर वापस भेजता है।",
            },
            s3: {
              title: "3. आपका ब्राउज़र एक और अनुरोध करता है",
              text: "अब जब आपके ब्राउज़र के पास IP पता है, तो यह सीधे उस पते पर एक अनुरोध भेजता है: 'कृपया मुझे अपने होमपेज की सामग्री भेजें।'",
            },
            s4: {
              title: "4. सर्वर प्रतिक्रिया देता है",
              text: "Google सर्वर आपका अनुरोध प्राप्त करता है, सभी आवश्यक फ़ाइलों (HTML, CSS, JavaScript) को इकट्ठा करता है, और उन्हें आपके ब्राउज़र पर वापस भेजता है। आपका ब्राउज़र फिर इन फ़ाइलों को इकट्ठा करता है और आपके लिए वेबपेज प्रदर्शित करता है।",
            },
          },
        },
    },
    analogy: {
      title: "उपमा — वैश्विक डाक प्रणाली",
      p1: "कल्पना कीजिए कि आप किसी दोस्त को एक पत्र भेजना चाहते हैं। आप उस पर एक पता लिखते हैं, और डाकघर उसे विभिन्न मार्गों—सड़कों, ट्रकों, विमानों—से भेजता है। इंटरनेट भी यही करता है: आपका संदेश (या फ़ाइल) छोटे पैकेट में टूट जाता है और एक साथ कई रास्तों पर भेजा जाता है।",
      box: {
        title: "पत्र → पैकेट",
        text: "बड़ी सामग्री को छोटे पैकेट में तोड़ना।",
      },
    },
    simulation: {
        title: "लाइव सिमुलेशन — एक पैकेट भेजें",
        buttons: {
          start: "शुरू करें",
          pause: "रोकें",
          speed: "गति",
        },
        explanation: {
          title: "क्या हो रहा है?",
          p1: "नीचे दिए गए चित्र में, एक पैकेट <strong>लैपटॉप</strong> से भेजा जाएगा। यह राउटर और सर्वर से होकर अंत में <strong>ग्लोब</strong> तक पहुंचेगा। पैकेट की यात्रा देखने के लिए स्टार्ट दबाएं।",
          li1: "पैकेट = जानकारी की एक छोटी इकाई",
          li2: "राउटर/सर्वर = पैकेट को सही दिशा देता है",
          li3: "DNS = नाम का IP पते में अनुवाद करता है",
        },
        canvas: {
          client: "लैपटॉप (क्लाइंट)",
          router: "राउटर",
          server: "सर्वर",
          destination: "इंटरनेट (गंतव्य)",
          note: "ध्यान दें: यह एक सरलीकृत दृश्य है। वास्तविक इंटरनेट में, पैकेट कई अलग-अलग मार्ग ले सकते हैं।",
        },
        steps: {
          title: "चरण-दर-चरण",
          li1: "आप (क्लाइंट) एक वेबसाइट का नाम टाइप करते हैं (जैसे, example.com)।",
          li2: "DNS उस नाम का IP पते में अनुवाद करता है।",
          li3: "आपका ब्राउज़र सर्वर से जुड़ता है और डेटा के छोटे पैकेट का अनुरोध करता है।",
          li4: "पैकेट विभिन्न राउटरों से होकर यात्रा करते हैं और फ़ाइल बनाने के लिए इकट्ठे होते हैं।",
        },
    },
    deepDive: {
        title: "गहरी जानकारी — सरल शब्दों में",
        ip: {
          title: "IP पता — कौन कहाँ रहता है",
          text: "हर डिवाइस को एक IP पता मिलता है — जैसे घर का पता। यह पैकेट को बताता है कि कहाँ जाना है।",
        },
        dns: {
          title: "DNS — फोनबुक",
          text: "DNS नामों को IP में बदलता है ताकि कंप्यूटर यह समझ सकें कि किस सर्वर से जुड़ना है। आप नाम याद रखते हैं, मशीनें नंबर पसंद करती हैं।",
        },
        packets: {
          title: "पैकेट — छोटे पत्र",
          text: "बड़ी फ़ाइलों को छोटे पैकेट में तोड़ा जाता है — यह तेज़ और अधिक विश्वसनीय है। यदि कोई एक पैकेट खो जाता है, तो केवल उसी को फिर से भेजने की आवश्यकता होती है।",
        },
        isp: {
          title: "ISP — आपका इंटरनेट मित्र",
          text: "एक ISP (इंटरनेट सेवा प्रदाता) वह कंपनी है जो आपको इंटरनेट तक पहुंच प्रदान करती है — जैसे आपके शहर की स्थानीय परिवहन सेवा।",
        },
        latency: {
          title: "विलंबता और बैंडविड्थ",
          text: "विलंबता (Latency) = कितना समय लगता है; बैंडविड्थ (Bandwidth) = एक बार में कितना जा सकता है। इसे इस तरह सोचें: विलंबता एक संदेश के लिए ट्रैफिक लाइट है, और बैंडविड्थ सड़क की चौड़ाई है।",
        },
    },
    examples: {
        title: "वास्तविक जीवन के उदाहरण",
        li1: "<strong>वीडियो स्ट्रीमिंग:</strong> वीडियो छोटे पैकेट में आता है जिसे आपका प्लेयर इकट्ठा करता है — यही कारण है कि कभी-कभी बफरिंग होती है।",
        li2: "<strong>ईमेल:</strong> आपका ईमेल कई सर्वरों से होकर गुजरता है और छोटे टुकड़ों में भेजा जाता है।",
        li3: "<strong>ऑनलाइन गेमिंग:</strong> कम विलंबता महत्वपूर्ण है — खिलाड़ी द्वारा की गई हर चाल को तुरंत पहुंचना चाहिए।",
    },
    glossary: {
        title: "शब्दावली",
        toggle: {
          show: "दिखाएँ",
          hide: "छिपाएँ",
          read: "पढ़ें",
        },
        terms: [
          {
            term: "IP Address",
            short: "किसी भी डिवाइस का विशिष्ट पता।",
            long: "IP Address एक अनूठा नंबर होता है जो हर इंटरनेट-संबंधित डिवाइस को दिया जाता है — जैसे घर का पता।",
          },
          {
            term: "Server",
            short: "डेटा और सेवाओं को होस्ट करने वाला कंप्यूटर।",
            long: "Server वह कंप्यूटर है जो वेबसाइट, वीडियो या फाइल जैसी चीज़ों को स्टोर करता है और जरूरत पड़ने पर दूसरों को भेजता है।",
          },
          {
            term: "Client",
            short: "सेवा मांगने वाला डिवाइस (आपका फोन/लैपटॉप)।",
            long: "Client वो डिवाइस है जो किसी सर्वर से कुछ माँगता है — उदाहरण: जब आप ब्राउज़र में कोई वेबसाइट खोलते हैं।",
          },
          {
            term: "DNS",
            short: "डोमेन नाम सिस्टम — वेबसाइट के नाम को IP में बदलता है।",
            long: "DNS एक तरह की फोनबुक है जो वेबसाइट के नाम (जैसे example.com) को उनके IP पते में बदल देती है ताकि ब्राउज़र जान सके कहाँ जाना है।",
          },
          {
            term: "Packet",
            short: "डेटा का एक छोटा टुकड़ा।",
            long: "किसी बड़ी फाइल या संदेश को छोटे-छोटे हिस्सों (packets) में बांटा जाता है ताकि वे अलग-अलग रास्तों से तेजी से और सुरक्षित तरीके से पहुँच सकें।",
          },
        ],
    },
    footer: {
        p1: "बहुत बढ़िया — आपने 'इंटरनेट क्या है?' पर पहला अध्याय पूरा कर लिया है!",
        p2: "अगला: मॉड्यूल 1 → सूचना कैसे यात्रा करती है",
        prev: "पिछला",
        next: "अगला",
    },
  },
};

export default function Chapter1WhatIsInternet() {
  const [lang, setLang] = useState("en");
  const [packetRunning, setPacketRunning] = useState(false);
  const [speed, setSpeed] = useState(1);
  const [showGlossary, setShowGlossary] = useState(false);
  const [activeTerm, setActiveTerm] = useState(null);

  const t = content[lang];

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.ctrlKey && e.key === "k") {
        e.preventDefault();
        setLang((prevLang) => (prevLang === "en" ? "hi" : "en"));
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const startSimulation = () => {
    setPacketRunning(true);
  };

  const stopSimulation = () => {
    setPacketRunning(false);
  };

  const toggleGlossary = () => setShowGlossary((s) => !s);

  return (
    <div className="min-h-screen bg-white p-4 sm:p-6 text-gray-800 font-sans">
      <div className="max-w-5xl mx-auto">
        {/* Header with Navigation and Language Toggle */}
        <header className="flex items-center justify-between mb-6 sticky top-0 bg-white bg-opacity-80 backdrop-blur-md z-20 py-4 px-2 rounded-lg shadow-sm">
          <Link to="/parts/prt4" className="flex items-center gap-2 text-sky-600 hover:text-sky-800 transition-colors">
            <FaHome className="text-xl" />
            <span className="font-semibold hidden sm:inline">{t.home}</span>
          </Link>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setLang("en")}
              className={`px-3 py-1 rounded-lg border font-semibold transition-all ${
                lang === "en"
                  ? "bg-sky-600 text-white border-sky-700 shadow"
                  : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
              }`}
            >
              EN
            </button>
            <button
              onClick={() => setLang("hi")}
              className={`px-3 py-1 rounded-lg border font-semibold transition-all ${
                lang === "hi"
                  ? "bg-sky-600 text-white border-sky-700 shadow"
                  : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
              }`}
            >
              हिं
            </button>
          </div>
        </header>

        {/* Main Content */}
        <main>
          {/* Page Title */}
          <section className="text-center mb-8">
            <div className="inline-block p-3 rounded-lg bg-sky-100 shadow-md mb-4">
              <FaGlobe className="text-4xl text-sky-500" />
            </div>
            <h1 className="text-3xl md:text-4xl font-extrabold text-sky-800">{t.header.title}</h1>
            <p className="text-sm text-gray-500 mt-1">{t.header.concept}</p>
            <p className="text-sm text-gray-500 italic">{t.header.analogy}</p>
          </section>

          {/* Intro Card */}
          <section className="bg-sky-50 rounded-2xl p-6 shadow-lg mb-8 border border-sky-100">
            <p className="text-lg leading-relaxed text-center">{t.intro.p1}</p>
            <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
              <div className="p-4 bg-white rounded-lg shadow-sm">
                <h3 className="font-bold text-sky-700 text-lg">{t.intro.foundation.title}</h3>
                <p className="text-sm">{t.intro.foundation.text}</p>
              </div>
              <div className="p-4 bg-white rounded-lg shadow-sm">
                <h3 className="font-bold text-sky-700 text-lg">{t.intro.pathways.title}</h3>
                <p className="text-sm">{t.intro.pathways.text}</p>
              </div>
              <div className="p-4 bg-white rounded-lg shadow-sm">
                <h3 className="font-bold text-sky-700 text-lg">{t.intro.rules.title}</h3>
                <p className="text-sm">{t.intro.rules.text}</p>
              </div>
            </div>
          </section>
          
          {/* History Section */}
          <section className="mb-8">
            <div className="bg-white rounded-2xl p-6 shadow-lg border">
                <h2 className="text-2xl font-bold text-sky-700 mb-4 flex items-center gap-3">
                    <FaHistory /> {t.history.title}
                </h2>
                <p className="mb-4 leading-relaxed">{t.history.p1}</p>
                <p className="mb-6 leading-relaxed">{t.history.p2}</p>
                <div className="bg-sky-50 p-4 rounded-lg border border-sky-200">
                    <h3 className="font-bold text-lg text-sky-700 mb-3">{t.history.timeline.title}</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 text-center">
                        <div className="p-3 bg-white rounded-lg shadow-sm">
                            <p className="font-bold text-sky-600">{t.history.timeline.t1.year}</p>
                            <p className="text-sm">{t.history.timeline.t1.event}</p>
                        </div>
                        <div className="p-3 bg-white rounded-lg shadow-sm">
                            <p className="font-bold text-sky-600">{t.history.timeline.t2.year}</p>
                            <p className="text-sm">{t.history.timeline.t2.event}</p>
                        </div>
                        <div className="p-3 bg-white rounded-lg shadow-sm">
                            <p className="font-bold text-sky-600">{t.history.timeline.t3.year}</p>
                            <p className="text-sm">{t.history.timeline.t3.event}</p>
                        </div>
                        <div className="p-3 bg-white rounded-lg shadow-sm">
                            <p className="font-bold text-sky-600">{t.history.timeline.t4.year}</p>
                            <p className="text-sm">{t.history.timeline.t4.event}</p>
                        </div>
                    </div>
                </div>
            </div>
          </section>
          
          {/* DNS and IP Section */}
          <section className="mb-8">
            <div className="bg-white rounded-2xl p-6 shadow-lg border">
              <h2 className="text-2xl font-bold text-sky-700 mb-4 flex items-center gap-3">
                <FaBookOpen /> {t.dnsIp.title}
              </h2>
              <p className="mb-6 leading-relaxed">{t.dnsIp.p1}</p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-6">
                <div className="p-4 bg-sky-50 rounded-lg border">
                  <h3 className="font-bold text-lg text-sky-700 mb-2">{t.dnsIp.ip.title}</h3>
                  <p className="mb-3">{t.dnsIp.ip.p1}</p>
                  <div className="p-3 bg-white rounded-lg border-l-4 border-sky-500">
                    <h4 className="font-semibold">{t.dnsIp.ip.analogy.title}</h4>
                    <p className="text-sm italic">{t.dnsIp.ip.analogy.text}</p>
                  </div>
                </div>
                <div className="p-4 bg-sky-50 rounded-lg border">
                  <h3 className="font-bold text-lg text-sky-700 mb-2">{t.dnsIp.dns.title}</h3>
                  <p className="mb-3">{t.dnsIp.dns.p1}</p>
                  <div className="p-3 bg-white rounded-lg border-l-4 border-sky-500">
                    <h4 className="font-semibold">{t.dnsIp.dns.analogy.title}</h4>
                    <p className="text-sm italic">{t.dnsIp.dns.analogy.text}</p>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="text-xl font-bold text-sky-700 mb-3">{t.dnsIp.requestResponse.title}</h3>
                <p className="mb-4">{t.dnsIp.requestResponse.p1}</p>
                <div className="space-y-4">
                    <div className="p-3 bg-white rounded-lg shadow-sm border">
                        <h4 className="font-bold text-sky-600">{t.dnsIp.requestResponse.steps.s1.title}</h4>
                        <p className="text-sm">{t.dnsIp.requestResponse.steps.s1.text}</p>
                    </div>
                    <div className="p-3 bg-white rounded-lg shadow-sm border">
                        <h4 className="font-bold text-sky-600">{t.dnsIp.requestResponse.steps.s2.title}</h4>
                        <p className="text-sm">{t.dnsIp.requestResponse.steps.s2.text}</p>
                    </div>
                    <div className="p-3 bg-white rounded-lg shadow-sm border">
                        <h4 className="font-bold text-sky-600">{t.dnsIp.requestResponse.steps.s3.title}</h4>
                        <p className="text-sm">{t.dnsIp.requestResponse.steps.s3.text}</p>
                    </div>
                    <div className="p-3 bg-white rounded-lg shadow-sm border">
                        <h4 className="font-bold text-sky-600">{t.dnsIp.requestResponse.steps.s4.title}</h4>
                        <p className="text-sm">{t.dnsIp.requestResponse.steps.s4.text}</p>
                    </div>
                </div>
              </div>
            </div>
          </section>

          {/* Analogy Section */}
          <section className="mb-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.5 }}
              className="bg-white rounded-2xl p-6 shadow-md border"
            >
              <h2 className="text-2xl font-bold text-sky-700 mb-3">{t.analogy.title}</h2>
              <p className="leading-relaxed">{t.analogy.p1}</p>
              <div className="mt-4 p-4 bg-sky-50 rounded-lg flex items-center gap-4 border border-sky-200">
                <FaEnvelope className="text-3xl text-sky-500 flex-shrink-0" />
                <div>
                  <div className="font-semibold text-lg">{t.analogy.box.title}</div>
                  <div className="text-sm text-gray-600">{t.analogy.box.text}</div>
                </div>
              </div>
            </motion.div>
          </section>

          {/* Live Simulation */}
          <section className="mb-8">
            <div className="bg-white rounded-2xl p-6 shadow-lg border">
              <div className="flex flex-col sm:flex-row items-center justify-between mb-4 gap-4">
                <h3 className="text-2xl font-bold text-sky-700">{t.simulation.title}</h3>
                <div className="flex items-center gap-2 sm:gap-4">
                  <button
                    onClick={() => (packetRunning ? stopSimulation() : startSimulation())}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-sky-600 text-white rounded-lg shadow-md hover:bg-sky-700 active:scale-95 transition-all"
                  >
                    {packetRunning ? <FaPause /> : <FaPlay />}
                    <span>{packetRunning ? t.simulation.buttons.pause : t.simulation.buttons.start}</span>
                  </button>
                  <div className="flex items-center gap-2 bg-sky-50 rounded-lg px-3 py-2 border">
                    <label className="text-sm font-semibold text-sky-600">{t.simulation.buttons.speed}</label>
                    <input
                      type="range"
                      min={0.5}
                      max={2}
                      step={0.1}
                      value={speed}
                      onChange={(e) => setSpeed(Number(e.target.value))}
                      className="w-24"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-center bg-sky-50 p-4 rounded-lg border">
                {/* Left: Explanation */}
                <div className="lg:col-span-1">
                  <h4 className="font-bold text-sky-700 text-lg mb-2">{t.simulation.explanation.title}</h4>
                  <p className="text-sm leading-relaxed mb-3" dangerouslySetInnerHTML={{ __html: t.simulation.explanation.p1 }}></p>
                  <ul className="text-sm space-y-2">
                    <li>• {t.simulation.explanation.li1}</li>
                    <li>• {t.simulation.explanation.li2}</li>
                    <li>• {t.simulation.explanation.li3}</li>
                  </ul>
                </div>

                {/* Center: Simulation Canvas */}
                <div className="lg:col-span-1">
                  <div className="relative h-48 bg-white rounded-xl p-4 flex items-center justify-between shadow-inner">
                    <div className="flex flex-col items-center gap-1 text-center">
                      <FaLaptop className="text-4xl text-sky-600" />
                      <div className="text-xs font-semibold">{t.simulation.canvas.client}</div>
                    </div>
                    <div className="flex-1 mx-2 flex items-center justify-center relative">
                      <div className="absolute left-0 right-0 top-1/2 h-0.5 bg-sky-200 -translate-y-1/2" />
                      <motion.div
                        initial={{ x: 0 }}
                        animate={{ x: packetRunning ? "180%" : 0 }}
                        transition={{
                          repeat: packetRunning ? Infinity : 0,
                          duration: Math.max(2 / speed, 0.5),
                          ease: "linear",
                        }}
                        className="absolute w-7 h-7 rounded-full bg-sky-500 shadow-lg flex items-center justify-center text-white"
                      >
                        <FaArrowRight />
                      </motion.div>
                      <div className="flex w-full justify-around z-10">
                        <div className="flex flex-col items-center gap-1 text-center">
                          <FaCloud className="text-3xl text-sky-400" />
                          <div className="text-xs">{t.simulation.canvas.router}</div>
                        </div>
                        <div className="flex flex-col items-center gap-1 text-center">
                          <FaServer className="text-3xl text-sky-400" />
                          <div className="text-xs">{t.simulation.canvas.server}</div>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col items-center gap-1 text-center">
                      <FaGlobe className="text-4xl text-sky-600" />
                      <div className="text-xs font-semibold">{t.simulation.canvas.destination}</div>
                    </div>
                  </div>
                  <div className="mt-2 text-xs text-gray-500 text-center">{t.simulation.canvas.note}</div>
                </div>

                {/* Right: Step-by-step */}
                <div className="lg:col-span-1">
                  <h4 className="font-bold text-sky-700 text-lg mb-2">{t.simulation.steps.title}</h4>
                  <ol className="list-decimal pl-5 text-sm space-y-2">
                    <li>{t.simulation.steps.li1}</li>
                    <li>{t.simulation.steps.li2}</li>
                    <li>{t.simulation.steps.li3}</li>
                    <li>{t.simulation.steps.li4}</li>
                  </ol>
                </div>
              </div>
            </div>
          </section>

          {/* Deep Dive Section */}
          <section className="mb-8">
            <div className="bg-white rounded-2xl p-6 shadow-md border">
              <h3 className="text-2xl font-bold text-sky-700 mb-4">{t.deepDive.title}</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm leading-relaxed">
                <div className="p-4 bg-sky-50 rounded-lg border">
                  <h4 className="font-bold text-lg">{t.deepDive.ip.title}</h4>
                  <p>{t.deepDive.ip.text}</p>
                </div>
                <div className="p-4 bg-sky-50 rounded-lg border">
                  <h4 className="font-bold text-lg">{t.deepDive.dns.title}</h4>
                  <p>{t.deepDive.dns.text}</p>
                </div>
                <div className="p-4 bg-sky-50 rounded-lg border">
                  <h4 className="font-bold text-lg">{t.deepDive.packets.title}</h4>
                  <p>{t.deepDive.packets.text}</p>
                </div>
                <div className="p-4 bg-sky-50 rounded-lg border">
                  <h4 className="font-bold text-lg">{t.deepDive.isp.title}</h4>
                  <p>{t.deepDive.isp.text}</p>
                </div>
                <div className="md:col-span-2 p-4 bg-sky-50 rounded-lg border">
                  <h4 className="font-bold text-lg">{t.deepDive.latency.title}</h4>
                  <p>{t.deepDive.latency.text}</p>
                </div>
              </div>
            </div>
          </section>

          {/* Real-life Examples */}
          <section className="mb-8">
            <div className="bg-white rounded-2xl p-6 shadow-lg border">
              <h3 className="text-2xl font-bold text-sky-700 mb-4">{t.examples.title}</h3>
              <ul className="list-disc pl-5 space-y-3 text-sm">
                <li dangerouslySetInnerHTML={{ __html: t.examples.li1 }}></li>
                <li dangerouslySetInnerHTML={{ __html: t.examples.li2 }}></li>
                <li dangerouslySetInnerHTML={{ __html: t.examples.li3 }}></li>
              </ul>
            </div>
          </section>

          {/* Interactive Glossary */}
          <section className="mb-8">
            <div className="bg-white rounded-2xl p-6 shadow-md border">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-2xl font-bold text-sky-700">{t.glossary.title}</h3>
                <button
                  onClick={toggleGlossary}
                  className="text-sm inline-flex items-center gap-2 px-4 py-2 bg-sky-100 text-sky-800 rounded-lg hover:bg-sky-200 transition-colors"
                >
                  <FaInfoCircle /> {showGlossary ? t.glossary.toggle.hide : t.glossary.toggle.show}
                </button>
              </div>
              {showGlossary && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {t.glossary.terms.map((g) => (
                    <div key={g.term} className="p-4 bg-sky-50 rounded-lg border">
                      <div className="flex items-start justify-between">
                        <div>
                          <div className="font-bold text-lg">{g.term}</div>
                          <div className="text-xs text-gray-500 italic">{g.short}</div>
                        </div>
                        <button
                          onClick={() => setActiveTerm(activeTerm === g.term ? null : g.term)}
                          className="text-sky-600 text-xs font-semibold hover:underline"
                        >
                          {activeTerm === g.term ? t.glossary.toggle.hide : t.glossary.toggle.read}
                        </button>
                      </div>
                      {activeTerm === g.term && <p className="mt-2 text-sm text-gray-700">{g.long}</p>}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </section>
        </main>

        {/* Footer Navigation */}
        <footer className="flex items-center justify-between mt-8 py-4 border-t">
            <Link to="/parts/prt4" className="flex items-center gap-2 px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-all">
                <FaArrowLeft />
                {t.footer.prev}
            </Link>
            <Link to="/part4/how-info-travels" className="flex items-center gap-2 px-4 py-2 bg-sky-600 text-white rounded-lg hover:bg-sky-700 transition-all">
                {t.footer.next}
                <FaArrowRightNav />
            </Link>
        </footer>

      </div>
    </div>
  );
}