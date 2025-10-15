import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FaHome, FaArrowLeft, FaArrowRight, FaNetworkWired } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import InteractiveConnectivitySimulation from "./LiveSimulation.js";

const content = {
  en: {
    home: "Home",
    previous: "Previous",
    next: "Next",
    title: "Basics of Connectivity",
    subtitle: "Explore how devices connect in the digital world through interactive simulations.",
    wired_simulation: "Wired Network",
    wireless_simulation: "Wireless Network",
    simulation_explanation_title: "How This Simulation Works",
    simulation_explanation_text: "This interactive simulation lets you build and observe simple networks. You can <strong>drag and drop</strong> nodes to reposition them. Click on a node to see options to <strong>connect it to another node</strong> or <strong>remove it</strong>. Use the controls to <strong>add new nodes</strong> of different types (like PCs, routers, and satellite dishes), <strong>pause/play</strong> the packet animation, and <strong>reset</strong> the simulation to the default layout. The <strong>speed slider</strong> directly controls how fast the data packets move along the connections. Notice how <strong>wireless and satellite</strong> connections are represented with <strong>dashed lines</strong> to distinguish them from the solid lines of a <strong>wired</strong> connection.",
    digital_world_title: "Connectivity in the Digital World",
    digital_world_text: "In the digital world, connectivity isn't just about linking devices; it's about creating a <strong>global network of information</strong>. When you visit a website, your computer sends a request packet that might travel through dozens of routers and across continents via undersea fiber optic cables. This vast, interconnected system is the <strong>Internet</strong>. It relies on standardized <strong>protocols</strong> (like TCP/IP) to ensure that data from any device can be understood by any other, creating a seamless experience whether you're sending an email, streaming a movie, or video-calling a friend on the other side of the world. Every online action you take is a testament to this incredible, planet-spanning connectivity.",
    deep_dive_title: "Deep Dive: How Data Packets Flow",
    deep_dive_text: "Data travels across networks in small pieces called <strong>packets</strong>. Each packet is like a tiny digital envelope containing a piece of your data (like a part of an email or a slice of a photo) and a <strong>header</strong>. The header is critical—it contains the <strong>IP addresses</strong> of the sender and the recipient, acting like a mailing address. <strong>Routers</strong> are the post offices of the internet; they read these addresses and forward the packets along the most efficient path to their destination. When all the packets arrive, the receiving device reassembles them in the correct order to reconstruct the original data. This process happens millions of times a second, enabling everything we do online.",
    analogy_title: "Analogy: A City's Transport System",
    analogy_text: "Think of network connectivity like a city's transportation system. <strong>Wired networks</strong> (like Ethernet cables) are like <strong>dedicated subway lines or highways</strong>. They are incredibly fast, reliable, and can handle a lot of traffic, but they are fixed in place. You have to go to a specific station to use them. <strong>Wireless networks</strong> (like Wi-Fi) are like <strong>taxis or ride-sharing services</strong>. They offer amazing flexibility and convenience, letting you connect from almost anywhere, but the journey can be slower due to traffic (interference), roadblocks (walls), or just the distance to your destination. The <strong>data packets</strong> are the <strong>passengers or cargo</strong>, each with a specific address, trying to get to their destination as efficiently as possible.",
    node_type: "Type",
    daily_use: "Daily Use",
    pause: "Pause",
    play: "Play",
    speed: "Speed",
    examples_title: "Practical Examples",
    examples_list: [
        "<strong>Gaming Night:</strong> Your gaming console connected via an Ethernet cable to the router for a lag-free online match, while your friends connect their phones to the Wi-Fi for snacks and music.",
        "<strong>Smart Home Hub:</strong> Your smart speaker (like Alexa or Google Home) wirelessly controls lights, thermostats, and cameras, all communicating through your Wi-Fi network.",
        "<strong>Video Conferencing:</strong> A satellite internet connection allows someone in a remote, rural area to have a video call with a team in a city skyscraper, bridging vast distances.",
        "<strong>In-Car Bluetooth:</strong> Your phone connecting wirelessly to your car's stereo to play music or take hands-free calls is a mini-network in action.",
        "<strong>Library Computers:</strong> The desktop computers at a public library using a wired LAN connection so that dozens of users can reliably access the internet and shared printers simultaneously."
    ],
    technologies_title: "Wired vs. Wireless Technologies: A Closer Look",
    wired_tech_title: "Wired Connections: The Digital Highways",
    wired_tech_text: "Wired connections use physical cables to transfer data, offering high speed and reliability. They are like the superhighways of the digital world, perfect for when you need a stable and fast connection.",
    wired_tech_examples: [
        "<strong>Ethernet</strong>: The most common wired connection for homes and offices, connecting computers to routers.",
        "<strong>Fiber Optics</strong>: Uses light to transfer data at incredibly high speeds, powering modern broadband.",
        "<strong>Coaxial Cables</strong>: Often used for cable TV and internet."
    ],
    wireless_tech_title: "Wireless Connections: The Freedom to Connect",
    wireless_tech_text: "Wireless technologies use radio waves to send data through the air, giving us the freedom to connect from anywhere. They are like the side roads and delivery drones of the digital world, offering convenience and mobility.",
    wireless_tech_examples: [
        "<strong>Wi-Fi</strong>: The most popular wireless technology, used in homes, schools, and public places to connect devices to the internet.",
        "<strong>Bluetooth</strong>: Used for short-range communication between devices, like connecting headphones to your phone.",
        "<strong>Cellular (4G/5G)</strong>: The technology that connects your smartphone to the internet over long distances."
    ],
    connectivity_types_title: "Data Packet Flow: Wired, Wireless, and Satellite",
    connectivity_types: [
      {
        title: "Wired Connectivity",
        description: "Data packets travel through physical cables, like Ethernet or fiber optics. This creates a direct, stable path from sender to receiver.",
        pros_title: "Pros",
        pros: ["<strong>High Speed:</strong> Generally the fastest option.", "<strong>Low Latency:</strong> Minimal delay in data transfer.", "<strong>Reliable & Secure:</strong> Less prone to interference or unauthorized access."],
        cons_title: "Cons",
        cons: ["<strong>Limited Mobility:</strong> Devices are tethered by cables.", "<strong>Complex Installation:</strong> Can be difficult to set up in large or old buildings."],
        usage_title: "Usage Sectors",
        usage: "Ideal for offices, data centers, gaming setups, and home networks where speed and stability are critical.",
        devices_title: "Participating Devices",
        devices: "<strong>Router:</strong> Directs traffic. <strong>Switch:</strong> Connects multiple devices on a network. <strong>End Devices:</strong> PCs, servers. <strong>Cables:</strong> Ethernet, Fiber Optic.",
        direction_title: "Connection Type",
        direction: "<strong>Two-way connection</strong>, allowing simultaneous data sending and receiving."
      },
      {
        title: "Wireless Connectivity (Wi-Fi)",
        description: "Data packets are converted into radio waves and transmitted from a wireless router to a device's receiver.",
        pros_title: "Pros",
        pros: ["<strong>Mobility & Convenience:</strong> Connect from anywhere within range.", "<strong>Easy Setup:</strong> No need to run physical cables."],
        cons_title: "Cons",
        cons: ["<strong>Interference:</strong> Can be affected by walls, other Wi-Fi networks, or electronics.", "<strong>Variable Speed:</strong> Slower than wired and speed can fluctuate."],
        usage_title: "Usage Sectors",
        usage: "Homes, cafes, airports, smart devices (IoT), and connecting mobile users.",
        devices_title: "Participating Devices",
        devices: "<strong>Wireless Access Point (WAP)/Router:</strong> Sends and receives radio signals. <strong>End Devices:</strong> Laptops, smartphones, tablets with wireless adapters.",
        direction_title: "Connection Type",
        direction: "<strong>Two-way connection</strong> for sending and receiving data."
      },
      {
        title: "Satellite Connectivity",
        description: "Data packets travel from a user's dish to a satellite in space, which then relays the signal back to a ground station connected to the internet.",
        pros_title: "Pros",
        pros: ["<strong>Global Coverage:</strong> Provides internet access in remote or rural areas.", "<strong>Reaches Anywhere:</strong> Not dependent on ground-based infrastructure."],
        cons_title: "Cons",
        cons: ["<strong>High Latency:</strong> Significant delay due to the vast distance the signal travels.", "<strong>Weather Dependent:</strong> Rain, snow, or storms can disrupt the signal."],
        usage_title: "Usage Sectors",
        usage: "Rural internet, GPS navigation, satellite television broadcasting, in-flight Wi-Fi.",
        devices_title: "Participating Devices",
        devices: "<strong>Satellite Dish:</strong> Sends and receives signals from the satellite. <strong>Modem:</strong> Processes the signal. <strong>Satellite:</strong> Relays signals between the user and the ground station. <strong>Ground Station:</strong> Connects the satellite network to the internet.",
        direction_title: "Connection Type",
        direction: "Can be <strong>one-way</strong> (e.g., satellite TV) or <strong>two-way</strong> (e.g., satellite internet)."
      }
    ]
  },
  hi: {
    home: "होम",
    previous: "पिछला",
    next: "अगला",
    title: "कनेक्टिविटी की मूल बातें",
    subtitle: "इंटरैक्टिव सिमुलेशन के माध्यम से जानें कि डिजिटल दुनिया में डिवाइस कैसे जुड़ते हैं।",
    wired_simulation: "वायर्ड नेटवर्क",
    wireless_simulation: "वायरलेस नेटवर्क",
    simulation_explanation_title: "यह सिमुलेशन कैसे काम करता है",
    simulation_explanation_text: "यह इंटरैक्टिव सिमुलेशन आपको सरल नेटवर्क बनाने और उनका निरीक्षण करने देता है। आप नोड्स को <strong>खींचकर और छोड़कर</strong> उनकी स्थिति बदल सकते हैं। किसी नोड पर क्लिक करके उसे <strong>दूसरे नोड से जोड़ने</strong> या <strong>उसे हटाने</strong> के विकल्प देखें। विभिन्न प्रकार के नए नोड्स (जैसे पीसी, राउटर और सैटेलाइट डिश) <strong>जोड़ने</strong>, पैकेट एनीमेशन को <strong>रोकने/चलाने</strong>, और सिमुलेशन को डिफ़ॉल्ट लेआउट पर <strong>रीसेट करने</strong> के लिए नियंत्रणों का उपयोग करें। <strong>स्पीड स्लाइडर</strong> सीधे नियंत्रित करता है कि डेटा पैकेट कनेक्शन के साथ कितनी तेजी से चलते हैं। ध्यान दें कि <strong>वायरलेस और सैटेलाइट</strong> कनेक्शनों को <strong>डैश्ड लाइनों</strong> से दर्शाया गया है ताकि उन्हें <strong>वायर्ड</strong> कनेक्शन की ठोस लाइनों से अलग किया जा सके।",
    digital_world_title: "डिजिटल दुनिया में कनेक्टिविटी",
    digital_world_text: "डिजिटल दुनिया में, कनेक्टिविटी केवल उपकरणों को जोड़ने के बारे में नहीं है; यह <strong>सूचना का एक वैश्विक नेटवर्क</strong> बनाने के बारे में है। जब आप किसी वेबसाइट पर जाते हैं, तो आपका कंप्यूटर एक अनुरोध पैकेट भेजता है जो दर्जनों राउटरों से होकर और महाद्वीपों के पार समुद्री फाइबर ऑप्टिक केबलों के माध्यम से यात्रा कर सकता है। यह विशाल, परस्पर जुड़ी प्रणाली ही <strong>इंटरनेट</strong> है। यह मानकीकृत <strong>प्रोटोकॉल</strong> (जैसे टीसीपी/आईपी) पर निर्भर करता है ताकि यह सुनिश्चित हो सके कि किसी भी डिवाइस से डेटा को किसी अन्य द्वारा समझा जा सके, जिससे एक सहज अनुभव बनता है चाहे आप ईमेल भेज रहे हों, मूवी स्ट्रीम कर रहे हों, या दुनिया के दूसरी तरफ किसी दोस्त को वीडियो-कॉल कर रहे हों। आपके द्वारा की जाने वाली हर ऑनलाइन कार्रवाई इस अविश्वसनीय, ग्रह-व्यापी कनेक्टिविटी का एक प्रमाण है।",
    deep_dive_title: "गहराई से जानें: डेटा पैकेट कैसे प्रवाहित होते हैं",
    deep_dive_text: "डेटा नेटवर्क पर <strong>पैकेट</strong> नामक छोटे टुकड़ों में यात्रा करता है। प्रत्येक पैकेट आपके डेटा का एक टुकड़ा (जैसे ईमेल का एक हिस्सा या फोटो का एक टुकड़ा) और एक <strong>हेडर</strong> युक्त एक छोटे डिजिटल लिफाफे की तरह है। हेडर महत्वपूर्ण है—इसमें प्रेषक और प्राप्तकर्ता के <strong>आईपी पते</strong> होते हैं, जो एक मेलिंग पते की तरह काम करते हैं। <strong>राउटर</strong> इंटरनेट के डाकघर हैं; वे इन पतों को पढ़ते हैं और पैकेट को उनके गंतव्य के लिए सबसे कुशल पथ पर आगे बढ़ाते हैं। जब सभी पैकेट पहुंच जाते हैं, तो प्राप्त करने वाला उपकरण मूल डेटा के पुनर्निर्माण के लिए उन्हें सही क्रम में फिर से जोड़ता है। यह प्रक्रिया एक सेकंड में लाखों बार होती है, जो हम ऑनलाइन सब कुछ करने में सक्षम बनाती है।",
    analogy_title: "उपमा: एक शहर की परिवहन प्रणाली",
    analogy_text: "नेटवर्क कनेक्टिविटी को एक शहर की परिवहन प्रणाली की तरह सोचें। <strong>वायर्ड नेटवर्क</strong> (जैसे ईथरनेट केबल) <strong>समर्पित मेट्रो लाइनों या राजमार्गों</strong> की तरह हैं। वे अविश्वसनीय रूप से तेज़, विश्वसनीय होते हैं, और बहुत अधिक ट्रैफिक संभाल सकते हैं, लेकिन वे एक जगह पर स्थिर होते हैं। उनका उपयोग करने के लिए आपको एक विशिष्ट स्टेशन पर जाना पड़ता है। <strong>वायरलेस नेटवर्क</strong> (जैसे वाई-फाई) <strong>टैक्सी या राइड-शेयरिंग सेवाओं</strong> की तरह हैं। वे अद्भुत लचीलापन और सुविधा प्रदान करते हैं, जिससे आप लगभग कहीं से भी जुड़ सकते हैं, लेकिन यात्रा ट्रैफिक (हस्तक्षेप), बाधाओं (दीवारों), या आपके गंतव्य की दूरी के कारण धीमी हो सकती है। <strong>डेटा पैकेट</strong> <strong>यात्री या माल</strong> की तरह हैं, प्रत्येक का एक विशिष्ट पता होता है, जो अपने गंतव्य तक कुशलता से पहुंचने की कोशिश कर रहा है।",
    node_type: "प्रकार",
    daily_use: "दैनिक उपयोग",
    pause: "रोकें",
    play: "चलाएं",
    speed: "गति",
    examples_title: "व्यावहारिक उदाहरण",
    examples_list: [
        "<strong>गेमिंग नाइट:</strong> आपका गेमिंग कंसोल एक लैग-फ्री ऑनलाइन मैच के लिए राउटर से ईथरनेट केबल के माध्यम से जुड़ा हुआ है, जबकि आपके दोस्त स्नैक्स और संगीत के लिए अपने फोन को वाई-फाई से कनेक्ट करते हैं।",
        "<strong>स्मार्ट होम हब:</strong> आपका स्मार्ट स्पीकर (जैसे एलेक्सा या गूगल होम) वायरलेस तरीके से रोशनी, थर्मोस्टैट्स और कैमरों को नियंत्रित करता है, जो सभी आपके वाई-फाई नेटवर्क के माध्यम से संचार करते हैं।",
        "<strong>वीडियो कॉन्फ्रेंसिंग:</strong> एक सैटेलाइट इंटरनेट कनेक्शन एक दूरस्थ, ग्रामीण क्षेत्र में किसी को एक शहर के गगनचुंबी इमारत में एक टीम के साथ वीडियो कॉल करने की अनुमति देता है, जो विशाल दूरियों को पाटता है।",
        "<strong>इन-कार ब्लूटूथ:</strong> संगीत चलाने या हैंड्स-फ्री कॉल लेने के लिए आपकी कार के स्टीरियो से वायरलेस तरीके से कनेक्ट होने वाला आपका फोन एक्शन में एक मिनी-नेटवर्क है।",
        "<strong>लाइब्रेरी कंप्यूटर:</strong> एक सार्वजनिक पुस्तकालय में डेस्कटॉप कंप्यूटर एक वायर्ड लैन कनेक्शन का उपयोग करते हैं ताकि दर्जनों उपयोगकर्ता एक साथ मज़बूती से इंटरनेट और साझा प्रिंटर का उपयोग कर सकें।"
    ],
    technologies_title: "वायर्ड बनाम वायरलेस टेक्नोलॉजीज: एक नज़दीकी नज़र",
    wired_tech_title: "वायर्ड कनेक्शन: डिजिटल हाईवे",
    wired_tech_text: "वायर्ड कनेक्शन डेटा ट्रांसफर करने के लिए भौतिक केबल का उपयोग करते हैं, जो उच्च गति और विश्वसनीयता प्रदान करते हैं। वे डिजिटल दुनिया के सुपरहाइवे की तरह हैं, जब आपको एक स्थिर और तेज़ कनेक्शन की आवश्यकता होती है तो यह एकदम सही है।",
    wired_tech_examples: [
        "<strong>ईथरनेट</strong>: घरों और कार्यालयों के लिए सबसे आम वायर्ड कनेक्शन, कंप्यूटर को राउटर से जोड़ता है।",
        "<strong>फाइबर ऑप्टिक्स</strong>: अविश्वसनीय रूप से उच्च गति पर डेटा स्थानांतरित करने के लिए प्रकाश का उपयोग करता है, जो आधुनिक ब्रॉडबैंड को शक्ति प्रदान करता है।",
        "<strong>कोएक्सियल केबल</strong>: अक्सर केबल टीवी और इंटरनेट के लिए उपयोग किया जाता है।"
    ],
    wireless_tech_title: "वायरलेस कनेक्शन: कनेक्ट करने की स्वतंत्रता",
    wireless_tech_text: "वायरलेस प्रौद्योगिकियां हवा के माध्यम से डेटा भेजने के लिए रेडियो तरंगों का उपयोग करती हैं, जिससे हमें कहीं से भी जुड़ने की स्वतंत्रता मिलती है। वे डिजिटल दुनिया की साइड सड़कों और डिलीवरी ड्रोन की तरह हैं, जो सुविधा और गतिशीलता प्रदान करते हैं।",
    wireless_tech_examples: [
        "<strong>वाई-फाई</strong>: सबसे लोकप्रिय वायरलेस तकनीक, जिसका उपयोग घरों, स्कूलों और सार्वजनिक स्थानों पर उपकरणों को इंटरनेट से जोड़ने के लिए किया जाता है।",
        "<strong>ब्लूटूथ</strong>: उपकरणों के बीच छोटी दूरी के संचार के लिए उपयोग किया जाता है, जैसे हेडफ़ोन को आपके फ़ोन से कनेक्ट करना।",
        "<strong>सेलुलर (4G/5G)</strong>: वह तकनीक जो आपके स्मार्टफोन को लंबी दूरी पर इंटरनेट से जोड़ती है।"
    ],
    connectivity_types_title: "डेटा पैकेट प्रवाह: वायर्ड, वायरलेस और सैटेलाइट",
    connectivity_types: [
      {
        title: "वायर्ड कनेक्टिविटी",
        description: "डेटा पैकेट भौतिक केबलों, जैसे ईथरनेट या फाइबर ऑप्टिक्स, के माध्यम से यात्रा करते हैं। यह प्रेषक से प्राप्तकर्ता तक एक सीधा, स्थिर पथ बनाता है।",
        pros_title: "फायदे",
        pros: ["<strong>उच्च गति:</strong> आम तौर पर सबसे तेज़ विकल्प।", "<strong>कम विलंबता:</strong> डेटा ट्रांसफर में न्यूनतम देरी।", "<strong>विश्वसनीय और सुरक्षित:</strong> हस्तक्षेप या अनधिकृत पहुंच के प्रति कम संवेदनशील।"],
        cons_title: "नुकसान",
        cons: ["<strong>सीमित गतिशीलता:</strong> डिवाइस केबलों से बंधे होते हैं।", "<strong>जटिल स्थापना:</strong> बड़ी या पुरानी इमारतों में स्थापित करना मुश्किल हो सकता है।"],
        usage_title: "उपयोग क्षेत्र",
        usage: "कार्यालयों, डेटा केंद्रों, गेमिंग सेटअप और घरेलू नेटवर्क के लिए आदर्श जहां गति और स्थिरता महत्वपूर्ण है।",
        devices_title: "भाग लेने वाले उपकरण",
        devices: "<strong>राउटर:</strong> ट्रैफिक को निर्देशित करता है। <strong>स्विच:</strong> एक नेटवर्क पर कई उपकरणों को जोड़ता है। <strong>अंतिम उपकरण:</strong> पीसी, सर्वर। <strong>केबल:</strong> ईथरनेट, फाइबर ऑप्टिक।",
        direction_title: "कनेक्शन प्रकार",
        direction: "<strong>दो-तरफ़ा कनेक्शन</strong>, एक साथ डेटा भेजने और प्राप्त करने की अनुमति देता है।"
      },
      {
        title: "वायरलेस कनेक्टिविटी (वाई-फाई)",
        description: "डेटा पैकेट को रेडियो तरंगों में परिवर्तित किया जाता है और एक वायरलेस राउटर से डिवाइस के रिसीवर तक प्रेषित किया जाता है।",
        pros_title: "फायदे",
        pros: ["<strong>गतिशीलता और सुविधा:</strong> सीमा के भीतर कहीं से भी कनेक्ट करें।", "<strong>आसान सेटअप:</strong> भौतिक केबल चलाने की कोई आवश्यकता नहीं है।"],
        cons_title: "नुकसान",
        cons: ["<strong>हस्तक्षेप:</strong> दीवारों, अन्य वाई-फाई नेटवर्क या इलेक्ट्रॉनिक्स से प्रभावित हो सकता है।", "<strong>परिवर्तनीय गति:</strong> वायर्ड से धीमी और गति में उतार-चढ़ाव हो सकता है।"],
        usage_title: "उपयोग क्षेत्र",
        usage: "घर, कैफे, हवाई अड्डे, स्मार्ट डिवाइस (IoT), और मोबाइल उपयोगकर्ताओं को जोड़ने के लिए।",
        devices_title: "भाग लेने वाले उपकरण",
        devices: "<strong>वायरलेस एक्सेस प्वाइंट (WAP)/राउटर:</strong> रेडियो सिग्नल भेजता और प्राप्त करता है। <strong>अंतिम उपकरण:</strong> लैपटॉप, स्मार्टफोन, वायरलेस एडेप्टर वाले टैबलेट।",
        direction_title: "कनेक्शन प्रकार",
        direction: "<strong>दो-तरफ़ा कनेक्शन</strong> डेटा भेजने और प्राप्त करने के लिए।"
      },
      {
        title: "सैटेलाइट कनेक्टिविटी",
        description: "डेटा पैकेट एक उपयोगकर्ता की डिश से अंतरिक्ष में एक उपग्रह तक यात्रा करते हैं, जो फिर सिग्नल को इंटरनेट से जुड़े एक ग्राउंड स्टेशन पर वापस भेजता है।",
        pros_title: "फायदे",
        pros: ["<strong>वैश्विक कवरेज:</strong> दूरस्थ या ग्रामीण क्षेत्रों में इंटरनेट का उपयोग प्रदान करता है।", "<strong>कहीं भी पहुंच:</strong> जमीन-आधारित बुनियादी ढांचे पर निर्भर नहीं है।"],
        cons_title: "नुकसान",
        cons: ["<strong>उच्च विलंबता:</strong> सिग्नल द्वारा तय की गई विशाल दूरी के कारण महत्वपूर्ण देरी।", "<strong>मौसम पर निर्भर:</strong> बारिश, बर्फ या तूफान सिग्नल को बाधित कर सकते हैं।"],
        usage_title: "उपयोग क्षेत्र",
        usage: "ग्रामीण इंटरनेट, जीपीएस नेविगेशन, सैटेलाइट टेलीविजन प्रसारण, इन-फ्लाइट वाई-फाई।",
        devices_title: "भाग लेने वाले उपकरण",
        devices: "<strong>सैटेलाइट डिश:</strong> उपग्रह से सिग्नल भेजता और प्राप्त करता है। <strong>मोडेम:</strong> सिग्नल को संसाधित करता है। <strong>उपग्रह:</strong> उपयोगकर्ता और ग्राउंड स्टेशन के बीच सिग्नल रिले करता है। <strong>ग्राउंड स्टेशन:</strong> सैटेलाइट नेटवर्क को इंटरनेट से जोड़ता है।",
        direction_title: "कनेक्शन प्रकार",
        direction: "<strong>एक-तरफ़ा</strong> (जैसे, सैटेलाइट टीवी) या <strong>दो-तरफ़ा</strong> (जैसे, सैटेलाइट इंटरनेट) हो सकता है।"
      }
    ]
  },
};

export default function BasicsOfConnectivity() {
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
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);
  
  const container = {
    hidden: { opacity: 0, y: 12 },
    show: { opacity: 1, y: 0, transition: { staggerChildren: 0.06 } },
  };

  const fadeUp = {
    hidden: { opacity: 0, y: 8 },
    show: { opacity: 1, y: 0 },
  };

  return (
    <div className="min-h-screen bg-amber-50 text-slate-800 font-sans">
      <header className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-md shadow-lg z-[100] p-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link to="/parts/prt4" className="flex items-center gap-2 text-lg font-semibold text-amber-600 hover:text-amber-800 transition-colors">
            <FaHome />
            <span>{t.home}</span>
          </Link>
          <div className="flex items-center gap-2">
            <button onClick={() => setLang("en")} className={`px-4 py-1.5 rounded-full text-sm font-bold transition-all duration-300 ${lang === 'en' ? 'bg-amber-600 text-white shadow-md' : 'bg-white text-amber-600 hover:bg-amber-100'}`}>EN</button>
            <button onClick={() => setLang("hi")} className={`px-4 py-1.5 rounded-full text-sm font-bold transition-all duration-300 ${lang === 'hi' ? 'bg-amber-600 text-white shadow-md' : 'bg-white text-amber-600 hover:bg-amber-100'}`}>हिं</button>
          </div>
        </div>
      </header>

      <main className="px-4 sm:px-6 lg:px-8 pt-24 pb-12">
        <motion.div initial="hidden" animate="show" variants={container} className="text-center mb-12 max-w-7xl mx-auto">
          <motion.h1 variants={fadeUp} className="text-4xl sm:text-5xl font-extrabold text-amber-700 tracking-tight flex items-center justify-center gap-3">
            <FaNetworkWired /> {t.title}
          </motion.h1>
          <motion.p variants={fadeUp} className="mt-4 text-base sm:text-lg text-slate-600 max-w-3xl mx-auto">
            {t.subtitle}
          </motion.p>
        </motion.div>

        <div className="space-y-8">
          {/* Analogy Section */}
          <motion.div variants={fadeUp} className="p-6 rounded-2xl shadow-lg bg-white">
            <h3 className="font-semibold text-lg sm:text-xl text-center">{t.analogy_title}</h3>
            <p className="mt-3 text-slate-600 text-center" dangerouslySetInnerHTML={{ __html: t.analogy_text }} />
          </motion.div>

          {/* Full-Width Simulation Section */}
          <div className="my-8 -mx-4 sm:-mx-6 lg:-mx-8">
            <InteractiveConnectivitySimulation initialLang={lang} />
          </div>

          {/* Grid for other sections */}
          <div className="space-y-8 mt-12">
            <motion.div variants={fadeUp} className="p-6 rounded-2xl shadow-lg bg-white">
              <h3 className="font-semibold text-lg sm:text-xl">{t.simulation_explanation_title}</h3>
              <p className="mt-3 text-slate-600" dangerouslySetInnerHTML={{ __html: t.simulation_explanation_text }} />
            </motion.div>
            <motion.div variants={fadeUp} className="p-6 rounded-2xl shadow-lg bg-white">
              <h3 className="font-semibold text-lg sm:text-xl">{t.digital_world_title}</h3>
              <p className="mt-3 text-slate-600" dangerouslySetInnerHTML={{ __html: t.digital_world_text }} />
            </motion.div>
            <motion.div variants={fadeUp} className="p-6 rounded-2xl shadow-lg bg-white">
              <h3 className="font-semibold text-lg sm:text-xl">{t.deep_dive_title}</h3>
              <p className="mt-3 text-slate-600" dangerouslySetInnerHTML={{ __html: t.deep_dive_text }} />
            </motion.div>
            <div className="my-8 -mx-4 sm:-mx-6 lg:-mx-8">
            <motion.div variants={fadeUp} className="w-full p-6 rounded-2xl shadow-lg bg-white">
              <h3 className="font-semibold text-lg sm:text-xl">{t.examples_title}</h3>
              <ul className="mt-3 text-slate-600 space-y-3 list-disc pl-5">
                {t.examples_list.map((item, index) => (
                  <li key={index} dangerouslySetInnerHTML={{ __html: item }} />
                ))}
              </ul>
            </motion.div>
            </div>
            {/* New Technologies Section */}
            <motion.div variants={fadeUp} className="p-6 rounded-2xl shadow-lg bg-white">
              <h3 className="font-semibold text-xl sm:text-2xl text-center mb-6">{t.technologies_title}</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h4 className="font-bold text-lg sm:text-xl text-amber-700">{t.wired_tech_title}</h4>
                  <p className="mt-2 text-slate-600">{t.wired_tech_text}</p>
                  <ul className="mt-4 space-y-2 list-disc pl-5">
                    {t.wired_tech_examples.map((item, index) => (
                      <li key={index} dangerouslySetInnerHTML={{ __html: item }} />
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="font-bold text-lg sm:text-xl text-amber-700">{t.wireless_tech_title}</h4>
                  <p className="mt-2 text-slate-600">{t.wireless_tech_text}</p>
                  <ul className="mt-4 space-y-2 list-disc pl-5">
                    {t.wireless_tech_examples.map((item, index) => (
                      <li key={index} dangerouslySetInnerHTML={{ __html: item }} />
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
            {/* Data Packet Flow Section */}
            <motion.div variants={fadeUp} className="p-6 rounded-2xl shadow-lg bg-white">
              <h3 className="font-semibold text-xl sm:text-2xl text-center mb-6">{t.connectivity_types_title}</h3>
              <div className="space-y-8">
                {t.connectivity_types.map((type, index) => (
                  <div key={index} className="border-b border-slate-200 pb-6 last:border-b-0">
                    <h4 className="font-bold text-lg sm:text-xl text-amber-700">{type.title}</h4>
                    <p className="mt-2 text-slate-600">{type.description}</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                      <div>
                        <h5 className="font-semibold text-slate-800">{type.pros_title}</h5>
                        <ul className="mt-2 space-y-1 list-disc pl-5 text-emerald-600">
                          {type.pros.map((pro, i) => (
                            <li key={i}><span className="text-slate-600" dangerouslySetInnerHTML={{ __html: pro }} /></li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h5 className="font-semibold text-slate-800">{type.cons_title}</h5>
                        <ul className="mt-2 space-y-1 list-disc pl-5 text-red-500">
                          {type.cons.map((con, i) => (
                            <li key={i}><span className="text-slate-600" dangerouslySetInnerHTML={{ __html: con }} /></li>
                          ))}
                        </ul>
                      </div>
                    </div>
                    <div className="mt-4">
                      <h5 className="font-semibold text-slate-800">{type.usage_title}</h5>
                      <p className="mt-1 text-slate-600">{type.usage}</p>
                    </div>
                    <div className="mt-4">
                      <h5 className="font-semibold text-slate-800">{type.devices_title}</h5>
                      <p className="mt-1 text-slate-600" dangerouslySetInnerHTML={{ __html: type.devices }} />
                    </div>
                     <div className="mt-4">
                      <h5 className="font-semibold text-slate-800">{type.direction_title}</h5>
                      <p className="mt-1 text-slate-600" dangerouslySetInnerHTML={{ __html: type.direction }} />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>

        <div className="w-full flex justify-between items-center mt-10 p-4 bg-amber-100/50 rounded-lg shadow-md">
            <button
              onClick={() => navigate('/parts/prt4')}
              className="flex items-center gap-2 px-4 py-2 bg-slate-200 hover:bg-slate-300 text-slate-800 rounded-lg shadow transition"
            >
              <FaArrowLeft />
              {t.previous}
            </button>
            <button
              onClick={() => navigate('/part4/computer-networks')}
              className="flex items-center gap-2 px-4 py-2 bg-amber-500 hover:bg-amber-600 text-white rounded-lg shadow transition"
            >
              {t.next}
              <FaArrowRight />
            </button>
          </div>
      </main>
    </div>
  );
}