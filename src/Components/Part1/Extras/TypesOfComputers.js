import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  FaRocket,
  FaUniversity,
  FaIndustry,
  FaLaptopCode,
  FaHome,
  FaArrowLeft,
  FaArrowRight,
} from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";


const CONTENT = {
  en: {
    home: "Home",
    heading: "Types of Computers",
    intro:
      "Computers are like a magical family of helpers, each with its own special talent. From giant brains that predict the weather to tiny ones that fit in your pocket, let's meet the members of this amazing digital family and discover their stories!",
    sections: {
      size: {
        title: "Meet the Family: From Biggest to Smallest",
        subtitle: "Let's journey through the generations of computers, each with a unique story.",
        items: [
          {
            id: "super",
            title: "Supercomputers: The Titans",
            short: "The fastest, most powerful computers on Earth.",
            story: "Imagine a superhero who can solve the world's biggest puzzles in a flash. That's a supercomputer! They are so large they fill an entire room and are used for giant tasks like forecasting weather, designing spaceships, and creating new medicines. They are the Einsteins of the computer world.",
            functionalities: ["High-speed calculations (trillions per second)", "Complex simulations", "Large-scale data analysis"],
            pros: ["Incredible processing power", "Solves problems impossible for other computers"],
            cons: ["Extremely expensive", "Consumes a lot of energy and space", "Requires specialized staff"],
            usageSectors: ["Scientific Research", "Weather Forecasting", "Aerospace", "Medicine"],
            examples: ["Frontier (USA)", "Fugaku (Japan)", "LUMI (Europe)"],
            icon: <FaRocket className="text-red-500 w-12 h-12" />,
            imageUrl: "https://wp.technologyreview.com/wp-content/uploads/2023/09/52117623798_84faf38201_OLCF.jpg",
          },
          {
            id: "mainframe",
            title: "Mainframes: The Reliable Giants",
            short: "The dependable workhorses for big organizations.",
            story: "Think of a mainframe as the head librarian of a massive city library. It works tirelessly behind the scenes, helping thousands of people at once. Banks, airlines, and big companies use them to process huge amounts of data securely and reliably, like managing your bank account or booking a flight.",
            functionalities: ["High-volume transaction processing", "Manages massive databases", "Supports thousands of users simultaneously"],
            pros: ["Extremely reliable and stable (runs for years without failure)", "High security", "Processes massive amounts of data"],
            cons: ["Very expensive", "Requires a controlled environment (cooling, power)", "Less flexible than smaller computers"],
            usageSectors: ["Banking", "Airlines", "Insurance", "Retail"],
            examples: ["IBM z-series", "Unisys ClearPath Dorado", "Hitachi Z-series"],
            icon: <FaUniversity className="text-purple-600 w-12 h-12" />,
            imageUrl: "https://www.networkworld.com/wp-content/uploads/2024/04/data-center-mainframe-woman-it-specialist_shutterstock_1394035181-1.jpg?quality=50&strip=all",
          },
          {
            id: "mini",
            title: "Minicomputers: The Department Managers",
            short: "The mid-size computers for specific tasks.",
            story: "Before everyone had a computer on their desk, there were minicomputers. They were like a friendly department manager, smaller and more affordable than the giant mainframes, but still powerful enough to serve a whole team in a business or a lab. They paved the way for the personal computers we use today.",
            functionalities: ["Serves multiple users", "Process control in factories", "Data acquisition in labs"],
            pros: ["Smaller and cheaper than mainframes", "More powerful than microcomputers of their time"],
            cons: ["Largely replaced by powerful servers and PCs", "Outdated technology"],
            usageSectors: ["Manufacturing", "Scientific Laboratories", "Small Businesses (historically)"],
            examples: ["DEC PDP-8", "HP 2100", "Data General Nova"],
            icon: <FaIndustry className="text-green-600 w-12 h-12" />,
            imageUrl: "https://images.computerhistory.org/blog-media/hp-2116-chm.jpg",
          },
          {
            id: "micro",
            title: "Microcomputers: The Personal Companions",
            short: "The computers we use every day.",
            story: "This is the computer you know and love! From the trusty desktop in your study to the sleek laptop in your bag, microcomputers are our personal companions. They empower us to learn, create, play, and connect with the world. They are the reason the digital world is at our fingertips.",
            functionalities: ["Personal tasks (word processing, browsing)", "Gaming and entertainment", "Software development"],
            pros: ["Affordable and accessible", "Portable (laptops, tablets)", "Easy to use"],
            cons: ["Less powerful than larger computers", "Can be prone to viruses and malware"],
            usageSectors: ["Home", "Education", "Business", "Entertainment"],
            examples: ["Desktops (PCs, iMacs)", "Laptops (MacBook, Chromebook)", "Tablets (iPad, Surface)"],
            icon: <FaLaptopCode className="text-sky-500 w-12 h-12" />,
            imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/82/Home_or_Personal_Computers_from_1977_-_Commodore_PET_2001%2C_Apple_II%2C_TRS-80_Model_I%2C_together_called_%27Trinity77%27_%28edited_image%29.jpg/1920px-Home_or_Personal_Computers_from_1977_-_Commodore_PET_2001%2C_Apple_II%2C_TRS-80_Model_I%2C_together_called_%27Trinity77%27_%28edited_image%29.jpg",
          },
        ],
      },
      use: {
        title: "Types According to Use",
        items: [
          {
            id: "general",
            title: "General Purpose Computers: The All-Rounders",
            story: "These are the computers we use every day. Like a talented artist who can paint, draw, and sculpt, a general-purpose computer can handle almost any task you throw at it, from writing an essay and browsing the internet to playing games and editing videos. Your laptop or phone is a perfect example of this versatile helper.",
            functionalities: ["Runs a variety of software", "Handles diverse data types (text, images, sound)", "User-programmable"],
            pros: ["Highly versatile and flexible", "Can be customized with different software", "Widely available and affordable"],
            cons: ["May not be as efficient as a specialized computer for a specific task"],
            usageSectors: ["Home", "Education", "Business", "Entertainment"],
            examples: ["Laptops", "Desktops", "Smartphones", "Tablets"],
            imageUrl: "https://www.fujitsu.com/cn/en/imagesgig5/fujitsum1800_tcm144-5405170_tcm144-2750236-32.jpg",
          },
          {
            id: "special",
            title: "Special Purpose Computers: The Specialists",
            story: "Imagine a master chef who only makes one perfect dish. That's a special-purpose computer. It's designed to do one job with incredible efficiency and reliability. Think of an ATM at a bank, a washing machine, or the system that controls traffic lights. They do their one task perfectly.",
            functionalities: ["Performs a single, dedicated function", "Hardware and software are optimized for a specific task"],
            pros: ["Very efficient and fast at its specific task", "High reliability", "Often has a simpler user interface"],
            cons: ["Not versatile; cannot be used for other tasks"],
            usageSectors: ["Banking (ATMs)", "Home Appliances", "Traffic Control", "Medical Devices"],
            examples: ["ATM", "Washing Machine Controller", "Traffic Light Controller", "Medical Imaging Devices"],
            imageUrl: "https://img.etimg.com/thumb/width-1200,height-900,imgsize-1860948,resizemode-75,msid-113625358/wealth/save/latest-daily-cash-deposit-limit-at-atms-sbi-hdfc-bank-bank-of-baroda-union-bank-of-india-pnb.jpg",
          },
        ],
      },
      functionality: {
        title: "Types According to Functionality",
        items: [
          {
            id: "analog",
            title: "Analog Computers: The Measurers",
            story: "Before everything was about 1s and 0s, there were analog computers. Think of them as master measurers. Like a classic thermometer using mercury to measure temperature, analog computers use continuous physical quantities like voltage or pressure to represent data. They are great for measuring and simulating real-world phenomena.",
            functionalities: ["Processes continuous data", "Simulates physical systems", "Performs calculations using physical properties"],
            pros: ["Provides real-time results", "Can be very fast for specific types of calculations"],
            cons: ["Less precise than digital computers", "Limited memory and versatility", "Susceptible to noise and interference"],
            usageSectors: ["Scientific research (historical)", "Engineering (control systems)", "Aviation (flight simulators)"],
            examples: ["Slide Rule", "Astrolabe", "Operational Amplifiers", "Mechanical Integrators"],
            imageUrl: "https://quantumzeitgeist.com/wp-content/uploads/analog.jpeg",
          },
          {
            id: "digital",
            title: "Digital Computers: The Counters",
            story: "This is the computer that powers our modern world. It speaks the language of 1s and 0s (binary) to represent everything from text and numbers to photos and videos. Every smartphone, laptop, and desktop computer you see is a digital computer, performing millions of calculations per second with incredible precision.",
            functionalities: ["Processes discrete data (binary)", "Performs logical and arithmetic operations", "Stores large amounts of data"],
            pros: ["Highly accurate and reliable", "Can store and process vast amounts of data", "Versatile and programmable"],
            cons: ["Can be more complex than analog computers", "Requires conversion of analog signals to digital"],
            usageSectors: ["Virtually all sectors of modern life"],
            examples: ["Smartphones", "Laptops", "Desktop PCs", "Digital Calculators", "Servers"],
            imageUrl: "https://scooboo.in/cdn/shop/products/flair-electronic-calculatorsdigital-calculatorsflairscooboo8901765141897-358337.jpg?v=1673501318&width=1214",
          },
          {
            id: "hybrid",
            title: "Hybrid Computers: The Best of Both Worlds",
            story: "What if you could combine the real-time measuring power of an analog computer with the precision and memory of a digital one? That's a hybrid computer! They are used in special situations where you need both. For example, in a hospital's ICU, a hybrid computer can measure a patient's heart rate (analog) and then store that data precisely (digital).",
            functionalities: ["Combines analog and digital processing", "Converts data between analog and digital formats"],
            pros: ["Combines the speed of analog with the accuracy of digital", "Can solve complex problems in real-time"],
            cons: ["Expensive and complex to design and maintain", "Used for very specific applications"],
            usageSectors: ["Hospitals (ICU, ECG)", "Scientific Laboratories", "Aviation", "Industrial Control"],
            examples: ["ECG Machines", "Dialysis Machines", "Weather forecasting systems"],
            imageUrl: "https://www.allstatesmed.com/cdn/shop/articles/AllStatesMedicalEquipmentDistribution-299154-electro-cardiogram-machines-image1_800x.jpg?v=1723570187.jpeg",
          },
        ],
      },
    },
    serversNote:
      "Where do server computers occur? Servers can be small (like minicomputers) or very large (like mainframes). By use, they are special-purpose machines that share data with many users — web servers, mail servers, database servers and game servers.",
    funFacts: [
      "The first gigabyte hard drive, the IBM 3380, was released in 1980, weighed over 500 pounds, and cost $40,000.",
      "The word 'bug' in computer jargon comes from a real bug! In 1947, a moth was found trapped in a relay of the Harvard Mark II computer, causing a malfunction.",
      "More than 5 billion people use the internet, but the first billion was only reached in 2005.",
      "The computer in your smartphone is millions of times more powerful than all of NASA's combined computing power in 1969 that was used to send astronauts to the moon."
    ],
    engagement: "Which type of computer do you find most fascinating?",
    previous: "Previous",
    next: "Part 1 Completed",
  },

  hi: {
    home: "होम",
    heading: "कंप्यूटर के प्रकार",
    intro:
      "कंप्यूटर सहायकों के एक जादुई परिवार की तरह हैं, जिनमें से प्रत्येक की अपनी विशेष प्रतिभा है। मौसम की भविष्यवाणी करने वाले विशाल दिमाग से लेकर आपकी जेब में फिट होने वाले छोटे दिमाग तक, आइए इस अद्भुत डिजिटल परिवार के सदस्यों से मिलें और उनकी कहानियों की खोज करें!",
    sections: {
      size: {
        title: "परिवार से मिलें: सबसे बड़े से सबसे छोटे तक",
        subtitle: "आइए कंप्यूटर की पीढ़ियों की यात्रा करें, प्रत्येक की एक अनूठी कहानी है।",
        items: [
          {
            id: "super",
            title: "सुपर कंप्यूटर: टाइटन्स",
            short: "पृथ्वी पर सबसे तेज़, सबसे शक्तिशाली कंप्यूटर।",
            story: "एक ऐसे सुपरहीरो की कल्पना करें जो दुनिया की सबसे बड़ी पहेलियों को पलक झपकते ही सुलझा सके। वह एक सुपर कंप्यूटर है! वे इतने बड़े हैं कि वे एक पूरे कमरे को भर देते हैं और मौसम का पूर्वानुमान, अंतरिक्ष यान डिजाइन करने और नई दवाएं बनाने जैसे विशाल कार्यों के लिए उपयोग किए जाते हैं। वे कंप्यूटर की दुनिया के आइंस्टीन हैं।",
            functionalities: ["उच्च गति की गणना (प्रति सेकंड खरबों)", "जटिल सिमुलेशन", "बड़े पैमाने पर डेटा विश्लेषण"],
            pros: ["अविश्वसनीय प्रसंस्करण शक्ति", "अन्य कंप्यूटरों के लिए असंभव समस्याओं का समाधान करता है"],
            cons: ["अत्यंत महंगा", "बहुत अधिक ऊर्जा और स्थान की खपत करता है", "विशेषज्ञ कर्मचारियों की आवश्यकता है"],
            usageSectors: ["वैज्ञानिक अनुसंधान", "मौसम पूर्वानुमान", "एयरोस्पेस", "चिकित्सा"],
            examples: ["फ्रंटियर (यूएसए)", "फुगाकू (जापान)", "लूमी (यूरोप)"],
            imageUrl: "https://wp.technologyreview.com/wp-content/uploads/2023/09/52117623798_84faf38201_OLCF.jpg",
          },
          {
            id: "mainframe",
            title: "मेनफ्रेम: विश्वसनीय दिग्गज",
            short: "बड़े संगठनों के लिए भरोसेमंद वर्कहॉर्स।",
            story: "एक मेनफ्रेम को एक विशाल शहर के पुस्तकालय के प्रमुख लाइब्रेरियन के रूप में सोचें। यह पर्दे के पीछे अथक रूप से काम करता है, एक ही बार में हजारों लोगों की मदद करता है। बैंक, एयरलाइंस और बड़ी कंपनियां इसका उपयोग बड़ी मात्रा में डेटा को सुरक्षित और मज़बूती से संसाधित करने के लिए करती हैं, जैसे आपके बैंक खाते का प्रबंधन करना या उड़ान बुक करना।",
            functionalities: ["उच्च-मात्रा लेनदेन प्रसंस्करण", "विशाल डेटाबेस का प्रबंधन करता है", "एक साथ हजारों उपयोगकर्ताओं का समर्थन करता है"],
            pros: ["अत्यंत विश्वसनीय और स्थिर (बिना किसी विफलता के वर्षों तक चलता है)", "उच्च सुरक्षा", "बड़ी मात्रा में डेटा संसाधित करता है"],
            cons: ["बहुत महंगा", "एक नियंत्रित वातावरण की आवश्यकता है (कूलिंग, पावर)", "छोटे कंप्यूटरों की तुलना में कम लचीला"],
            usageSectors: ["बैंकिंग", "एयरलाइंस", "बीमा", "खुदरा"],
            examples: ["आईबीएम जेड-सीरीज़", "यूनिसिस क्लियरपाथ डोराडो", "हिताची जेड-सीरीज़"],
            imageUrl: "https://www.networkworld.com/wp-content/uploads/2024/04/data-center-mainframe-woman-it-specialist_shutterstock_1394035181-1.jpg?quality=50&strip=all",
          },
          {
            id: "mini",
            title: "मिनी कंप्यूटर: विभाग प्रबंधक",
            short: "विशिष्ट कार्यों के लिए मध्य आकार के कंप्यूटर।",
            story: "इससे पहले कि हर किसी के डेस्क पर एक कंप्यूटर हो, मिनी कंप्यूटर थे। वे एक दोस्ताना विभाग प्रबंधक की तरह थे, जो विशाल मेनफ्रेम से छोटे और अधिक किफायती थे, लेकिन फिर भी एक व्यवसाय या प्रयोगशाला में पूरी टीम की सेवा करने के लिए पर्याप्त शक्तिशाली थे। उन्होंने आज हमारे द्वारा उपयोग किए जाने वाले व्यक्तिगत कंप्यूटरों का मार्ग प्रशस्त किया।",
            functionalities: ["कई उपयोगकर्ताओं की सेवा करता है", "कारखानों में प्रक्रिया नियंत्रण", "प्रयोगशालाओं में डेटा अधिग्रहण"],
            pros: ["मेनफ्रेम से छोटे और सस्ते", "अपने समय के माइक्रो कंप्यूटर से अधिक शक्तिशाली"],
            cons: ["बड़े पैमाने पर शक्तिशाली सर्वर और पीसी द्वारा प्रतिस्थापित", "पुरानी तकनीक"],
            usageSectors: ["विनिर्माण", "वैज्ञानिक प्रयोगशालाएं", "छोटे व्यवसाय (ऐतिहासिक रूप से)"],
            examples: ["डीईसी पीडीपी-8", "एचपी 2100", "डेटा जनरल नोवा"],
            imageUrl: "https://images.computerhistory.org/blog-media/hp-2116-chm.jpg",
          },
          {
            id: "micro",
            title: "माइक्रो कंप्यूटर: व्यक्तिगत साथी",
            short: "वे कंप्यूटर जिनका हम हर दिन उपयोग करते हैं।",
            story: "यह वह कंप्यूटर है जिसे आप जानते हैं और प्यार करते हैं! आपके अध्ययन में भरोसेमंद डेस्कटॉप से ​​लेकर आपके बैग में चिकना लैपटॉप तक, माइक्रो कंप्यूटर हमारे व्यक्तिगत साथी हैं। वे हमें सीखने, बनाने, खेलने और दुनिया से जुड़ने के लिए सशक्त बनाते हैं। वे कारण हैं कि डिजिटल दुनिया हमारी उंगलियों पर है।",
            functionalities: ["व्यक्तिगत कार्य (वर्ड प्रोसेसिंग, ब्राउज़िंग)", "गेमिंग और मनोरंजन", "सॉफ्टवेयर विकास"],
            pros: ["सस्ती और सुलभ", "पोर्टेबल (लैपटॉप, टैबलेट)", "उपयोग में आसान"],
            cons: ["बड़े कंप्यूटरों की तुलना में कम शक्तिशाली", "वायरस और मैलवेयर से ग्रस्त हो सकते हैं"],
            usageSectors: ["घर", "शिक्षा", "व्यवसाय", "मनोरंजन"],
            examples: ["डेस्कटॉप (पीसी, आईमैक)", "लैपटॉप (मैकबुक, क्रोमबुक)", "टैबलेट (आईपैड, सरफेस)"],
            imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/82/Home_or_Personal_Computers_from_1977_-_Commodore_PET_2001%2C_Apple_II%2C_TRS-80_Model_I%2C_together_called_%27Trinity77%27_%28edited_image%29.jpg/1920px-Home_or_Personal_Computers_from_1977_-_Commodore_PET_2001%2C_Apple_II%2C_TRS-80_Model_I%2C_together_called_%27Trinity77%27_%28edited_image%29.jpg",
          },
        ],
      },
      use: {
        title: "उपयोग के अनुसार प्रकार",
        items: [
          {
            id: "general",
            title: "सामान्य प्रयोजन कंप्यूटर: ऑल-राउंडर",
            story: "ये वे कंप्यूटर हैं जिनका हम हर दिन उपयोग करते हैं। एक प्रतिभाशाली कलाकार की तरह जो पेंट, ड्रॉ और मूर्तिकला कर सकता है, एक सामान्य-उद्देश्य वाला कंप्यूटर आपके द्वारा फेंके गए लगभग किसी भी कार्य को संभाल सकता है, एक निबंध लिखने और इंटरनेट ब्राउज़ करने से लेकर गेम खेलने और वीडियो संपादित करने तक। आपका लैपटॉप या फोन इस बहुमुखी सहायक का एक आदर्श उदाहरण है।",
            functionalities: ["विभिन्न प्रकार के सॉफ़्टवेयर चलाता है", "विविध डेटा प्रकारों (पाठ, चित्र, ध्वनि) को संभालता है", "उपयोगकर्ता-प्रोग्राम करने योग्य"],
            pros: ["अत्यधिक बहुमुखी और लचीला", "विभिन्न सॉफ़्टवेयर के साथ अनुकूलित किया जा सकता है", "व्यापक रूप से उपलब्ध और सस्ती"],
            cons: ["किसी विशिष्ट कार्य के लिए एक विशेष कंप्यूटर जितना कुशल नहीं हो सकता है"],
            usageSectors: ["घर", "शिक्षा", "व्यवसाय", "मनोरंजन"],
            examples: ["लैपटॉप", "डेस्कटॉप", "स्मार्टफोन", "टैबलेट"],
            imageUrl: "https://www.fujitsu.com/cn/en/imagesgig5/fujitsum1800_tcm144-5405170_tcm144-2750236-32.jpg",
          },
          {
            id: "special",
            title: "विशेष प्रयोजन कंप्यूटर: विशेषज्ञ",
            story: "एक मास्टर शेफ की कल्पना करें जो केवल एक आदर्श व्यंजन बनाता है। वह एक विशेष प्रयोजन वाला कंप्यूटर है। यह एक काम को अविश्वसनीय दक्षता और विश्वसनीयता के साथ करने के लिए डिज़ाइन किया गया है। एक बैंक में एक एटीएम, एक वॉशिंग मशीन, या ट्रैफिक लाइट को नियंत्रित करने वाली प्रणाली के बारे में सोचें। वे अपना एक काम पूरी तरह से करते हैं।",
            functionalities: ["एक एकल, समर्पित कार्य करता है", "हार्डवेयर और सॉफ्टवेयर एक विशिष्ट कार्य के लिए अनुकूलित हैं"],
            pros: ["अपने विशिष्ट कार्य पर बहुत कुशल और तेज़", "उच्च विश्वसनीयता", "अक्सर एक सरल उपयोगकर्ता इंटरफ़ेस होता है"],
            cons: ["बहुमुखी नहीं; अन्य कार्यों के लिए उपयोग नहीं किया जा सकता है"],
            usageSectors: ["बैंकिंग (एटीएम)", "घरेलू उपकरण", "यातायात नियंत्रण", "चिकित्सा उपकरण"],
            examples: ["एटीएम", "वॉशिंग मशीन नियंत्रक", "यातायात प्रकाश नियंत्रक", "चिकित्सा इमेजिंग उपकरण"],
            imageUrl: "https://img.etimg.com/thumb/width-1200,height-900,imgsize-1860948,resizemode-75,msid-113625358/wealth/save/latest-daily-cash-deposit-limit-at-atms-sbi-hdfc-bank-bank-of-baroda-union-bank-of-india-pnb.jpg",
          },
        ],
      },
      functionality: {
        title: "कार्यक्षमता के अनुसार प्रकार",
        items: [
          {
            id: "analog",
            title: "एनालॉग कंप्यूटर: मापक",
            story: "इससे पहले कि सब कुछ 1 और 0 के बारे में था, एनालॉग कंप्यूटर थे। उन्हें मास्टर मेजरर्स के रूप में सोचें। तापमान को मापने के लिए पारा का उपयोग करने वाले एक क्लासिक थर्मामीटर की तरह, एनालॉग कंप्यूटर डेटा का प्रतिनिधित्व करने के लिए वोल्टेज या दबाव जैसी निरंतर भौतिक मात्राओं का उपयोग करते हैं। वे वास्तविक दुनिया की घटनाओं को मापने और अनुकरण करने के लिए बहुत अच्छे हैं।",
            functionalities: ["निरंतर डेटा संसाधित करता है", "भौतिक प्रणालियों का अनुकरण करता है", "भौतिक गुणों का उपयोग करके गणना करता है"],
            pros: ["वास्तविक समय के परिणाम प्रदान करता है", "विशिष्ट प्रकार की गणनाओं के लिए बहुत तेज़ हो सकता है"],
            cons: ["डिजिटल कंप्यूटरों की तुलना में कम सटीक", "सीमित मेमोरी और बहुमुखी प्रतिभा", "शोर और हस्तक्षेप के प्रति संवेदनशील"],
            usageSectors: ["वैज्ञानिक अनुसंधान (ऐतिहासिक)", "इंजीनियरिंग (नियंत्रण प्रणाली)", "विमानन (उड़ान सिमुलेटर)"],
            examples: ["स्लाइड रूल", "एस्ट्रोलैब", "ऑपरेशनल एम्पलीफायर्स", "मैकेनिकल इंटीग्रेटर्स"],
            imageUrl: "https://quantumzeitgeist.com/wp-content/uploads/analog.jpeg",
          },
          {
            id: "digital",
            title: "डिजिटल कंप्यूटर: काउंटर",
            story: "यह वह कंप्यूटर है जो हमारी आधुनिक दुनिया को शक्ति प्रदान करता है। यह पाठ और संख्याओं से लेकर तस्वीरों और वीडियो तक सब कुछ का प्रतिनिधित्व करने के लिए 1 और 0 (बाइनरी) की भाषा बोलता है। आपके द्वारा देखा जाने वाला हर स्मार्टफोन, लैपटॉप और डेस्कटॉप कंप्यूटर एक डिजिटल कंप्यूटर है, जो प्रति सेकंड लाखों गणनाओं को अविश्वसनीय सटीकता के साथ करता है।",
            functionalities: ["असतत डेटा (बाइनरी) संसाधित करता है", "तार्किक और अंकगणितीय संचालन करता है", "बड़ी मात्रा में डेटा संग्रहीत करता है"],
            pros: ["अत्यधिक सटीक और विश्वसनीय", "बड़ी मात्रा में डेटा संग्रहीत और संसाधित कर सकता है", "बहुमुखी और प्रोग्राम करने योग्य"],
            cons: ["एनालॉग कंप्यूटरों की तुलना में अधिक जटिल हो सकता है", "एनालॉग संकेतों को डिजिटल में बदलने की आवश्यकता है"],
            usageSectors: ["आधुनिक जीवन के लगभग सभी क्षेत्र"],
            examples: ["स्मार्टफोन", "लैपटॉप", "डेस्कटॉप पीसी", "डिजिटल कैलकुलेटर", "सर्वर"],
            imageUrl: "https://scooboo.in/cdn/shop/products/flair-electronic-calculatorsdigital-calculatorsflairscooboo8901765141897-358337.jpg?v=1673501318&width=1214",
          },
          {
            id: "hybrid",
            title: "हाइब्रिड कंप्यूटर: दोनों दुनिया के सर्वश्रेष्ठ",
            story: "क्या होगा यदि आप एक एनालॉग कंप्यूटर की रीयल-टाइम मापने की शक्ति को एक डिजिटल की सटीकता और मेमोरी के साथ जोड़ सकते हैं? वह एक हाइब्रिड कंप्यूटर है! उनका उपयोग विशेष स्थितियों में किया जाता है जहां आपको दोनों की आवश्यकता होती है। उदाहरण के लिए, एक अस्पताल के आईसीयू में, एक हाइब्रिड कंप्यूटर एक मरीज की हृदय गति (एनालॉग) को माप सकता है और फिर उस डेटा को ठीक (डिजिटल) रूप से संग्रहीत कर सकता है।",
            functionalities: ["एनालॉग और डिजिटल प्रसंस्करण को जोड़ती है", "एनालॉग और डिजिटल प्रारूपों के बीच डेटा परिवर्तित करता है"],
            pros: ["एनालॉग की गति को डिजिटल की सटीकता के साथ जोड़ती है", "वास्तविक समय में जटिल समस्याओं का समाधान कर सकती है"],
            cons: ["डिजाइन और रखरखाव के लिए महंगा और जटिल", "बहुत विशिष्ट अनुप्रयोगों के लिए उपयोग किया जाता है"],
            usageSectors: ["अस्पताल (आईसीयू, ईसीजी)", "वैज्ञानिक प्रयोगशालाएं", "विमानन", "औद्योगिक नियंत्रण"],
            examples: ["ईसीजी मशीनें", "डायलिसिस मशीनें", "मौसम पूर्वानुमान प्रणाली"],
            imageUrl: "https://www.allstatesmed.com/cdn/shop/articles/AllStatesMedicalEquipmentDistribution-299154-electro-cardiogram-machines-image1_800x.jpg?v=1723570187.jpeg",
          },
        ],
      },
    },
    serversNote:
      "सर्वर कंप्यूटर कहाँ आते हैं? सर्वर छोटे (मिनी) भी हो सकते हैं और बहुत बड़े (मेनफ्रेम) भी। उपयोग के अनुसार ये विशेष-उद्देश्य मशीनें हैं जो कई उपयोगकर्ताओं को डेटा शेयर करती हैं — वेब सर्वर, मेल सर्वर, डेटाबेस सर्वर और गेम सर्वर।",
    funFacts: [
      "पहला गीगाबाइट हार्ड ड्राइव, आईबीएम 3380, 1980 में जारी किया गया था, जिसका वजन 500 पाउंड से अधिक था, और इसकी लागत $40,000 थी।",
      "कंप्यूटर शब्दजाल में 'बग' शब्द एक वास्तविक बग से आया है! 1947 में, हार्वर्ड मार्क II कंप्यूटर के एक रिले में एक कीट फंसा हुआ पाया गया, जिससे खराबी आ गई।",
      "5 अरब से अधिक लोग इंटरनेट का उपयोग करते हैं, लेकिन पहला अरब केवल 2005 में पहुंचा था।",
      "आपके स्मार्टफोन में कंप्यूटर 1969 में नासा की संयुक्त कंप्यूटिंग शक्ति से लाखों गुना अधिक शक्तिशाली है जिसका उपयोग अंतरिक्ष यात्रियों को चंद्रमा पर भेजने के लिए किया गया था।"
    ],
    engagement: "आपको कौन सा कंप्यूटर सबसे आकर्षक लगता है?",
    previous: "पिछला",
    next: "पार्ट 1 पूरा हुआ",
  },
};

const cardVariant = {
  hidden: { opacity: 0, y: 20, scale: 0.98 },
  visible: (i = 1) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { delay: i * 0.12, type: "spring", stiffness: 80 },
  }),
};

export default function TypesOfComputers() {
  const [lang, setLang] = useState("en");
  const navigate = useNavigate();
  const t = CONTENT[lang];

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.ctrlKey && event.key === 'k') {
        event.preventDefault();
        setLang(prevLang => prevLang === 'en' ? 'hi' : 'en');
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className="max-w-5xl mx-auto p-4 sm:p-6 lg:p-8">
      <div className="flex items-center justify-between mb-8">
        <Link to="/parts/prt1" className="inline-flex items-center px-4 py-2 bg-white rounded-full shadow-md border border-gray-200 hover:bg-gray-100 transition">
          <FaHome className="mr-2 text-lg text-sky-600" />
          {t.home}
        </Link>
        <div className="flex space-x-2">
          <button onClick={() => setLang("en")} className={`px-3 py-1 rounded-lg border font-semibold ${lang === "en" ? "bg-sky-600 text-white border-sky-600" : "bg-white text-gray-700 border-gray-300"} transition`}>EN</button>
          <button onClick={() => setLang("hi")} className={`px-3 py-1 rounded-lg border font-semibold ${lang === "hi" ? "bg-sky-600 text-white border-sky-600" : "bg-white text-gray-700 border-gray-300"} transition`}>हिं</button>
        </div>
      </div>

      <motion.h1
        className="text-3xl sm:text-4xl md:text-5xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 via-pink-500 to-yellow-400 text-center"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        {t.heading}
      </motion.h1>

      <motion.p
        className="text-center text-gray-600 mt-4 max-w-2xl mx-auto"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        {t.intro}
      </motion.p>

      {/* Computer Types Section */}
      <div className="mt-12 space-y-12">
        {t.sections.size.items.map((it, i) => (
          <motion.article
            key={it.id}
            className="bg-white rounded-2xl shadow-lg overflow-hidden"
            variants={cardVariant}
            custom={i}
            initial="hidden"
            animate="visible"
            whileHover={{ scale: 1.02, shadow: "2xl" }}
          >
            <img src={it.imageUrl} alt={it.title} className="w-full h-auto object-contain" />
            <div className="p-6">
              <h3 className="text-2xl sm:text-3xl font-bold text-gray-800">{it.title}</h3>
              <p className="text-gray-600 mt-2 text-sm sm:text-base">{it.story}</p>

              <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-bold text-lg text-gray-700">Functionalities</h4>
                  <ul className="mt-2 list-disc list-inside text-gray-600 space-y-1">
                    {it.functionalities.map(f => <li key={f}>{f}</li>)}
                  </ul>
                </div>
                <div>
                  <h4 className="font-bold text-lg text-gray-700">Usage Sectors</h4>
                  <p className="mt-2 text-gray-600">{it.usageSectors.join(", ")}</p>
                  <h4 className="font-bold text-lg text-gray-700 mt-4">Examples</h4>
                  <p className="mt-2 text-gray-600">{it.examples.join(", ")}</p>
                </div>
                <div>
                  <h4 className="font-bold text-lg text-green-600">Pros</h4>
                  <ul className="mt-2 list-disc list-inside text-green-700 space-y-1">
                    {it.pros.map(p => <li key={p}>{p}</li>)}
                  </ul>
                </div>
                <div>
                  <h4 className="font-bold text-lg text-red-600">Cons</h4>
                  <ul className="mt-2 list-disc list-inside text-red-700 space-y-1">
                    {it.cons.map(c => <li key={c}>{c}</li>)}
                  </ul>
                </div>
              </div>
            </div>
          </motion.article>
        ))}
      </div>

      {/* Other Categories Section */}
      <div className="mt-12">
        <h2 className="text-3xl font-bold text-center mb-8">{t.sections.use.title}</h2>
        <div className="grid md:grid-cols-1 lg:grid-cols-2 gap-8">
          {t.sections.use.items.map((it, i) => (
            <motion.article
              key={it.id}
              className="bg-white rounded-2xl shadow-lg overflow-hidden"
              variants={cardVariant}
              custom={i}
              initial="hidden"
              animate="visible"
              whileHover={{ scale: 1.02, shadow: "2xl" }}
            >
              <img src={it.imageUrl} alt={it.title} className="w-full h-auto object-contain" />
              <div className="p-6">
                <h3 className="text-2xl sm:text-3xl font-bold text-gray-800">{it.title}</h3>
                <p className="text-gray-600 mt-2 text-sm sm:text-base">{it.story}</p>

                <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-bold text-lg text-gray-700">Functionalities</h4>
                    <ul className="mt-2 list-disc list-inside text-gray-600 space-y-1">
                      {it.functionalities.map(f => <li key={f}>{f}</li>)}
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-bold text-lg text-gray-700">Usage Sectors</h4>
                    <p className="mt-2 text-gray-600">{it.usageSectors.join(", ")}</p>
                    <h4 className="font-bold text-lg text-gray-700 mt-4">Examples</h4>
                    <p className="mt-2 text-gray-600">{it.examples.join(", ")}</p>
                  </div>
                  <div>
                    <h4 className="font-bold text-lg text-green-600">Pros</h4>
                    <ul className="mt-2 list-disc list-inside text-green-700 space-y-1">
                      {it.pros.map(p => <li key={p}>{p}</li>)}
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-bold text-lg text-red-600">Cons</h4>
                    <ul className="mt-2 list-disc list-inside text-red-700 space-y-1">
                      {it.cons.map(c => <li key={c}>{c}</li>)}
                    </ul>
                  </div>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>

      <div className="mt-12">
        <h2 className="text-3xl font-bold text-center mb-8">{t.sections.functionality.title}</h2>
        <div className="grid md:grid-cols-1 lg:grid-cols-2 gap-8">
          {t.sections.functionality.items.map((it, i) => (
            <motion.article
              key={it.id}
              className="bg-white rounded-2xl shadow-lg overflow-hidden"
              variants={cardVariant}
              custom={i}
              initial="hidden"
              animate="visible"
              whileHover={{ scale: 1.02, shadow: "2xl" }}
            >
              <img src={it.imageUrl} alt={it.title} className="w-full h-auto object-contain" />
              <div className="p-6">
                <h3 className="text-2xl sm:text-3xl font-bold text-gray-800">{it.title}</h3>
                <p className="text-gray-600 mt-2 text-sm sm:text-base">{it.story}</p>

                <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-bold text-lg text-gray-700">Functionalities</h4>
                    <ul className="mt-2 list-disc list-inside text-gray-600 space-y-1">
                      {it.functionalities.map(f => <li key={f}>{f}</li>)}
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-bold text-lg text-gray-700">Usage Sectors</h4>
                    <p className="mt-2 text-gray-600">{it.usageSectors.join(", ")}</p>
                    <h4 className="font-bold text-lg text-gray-700 mt-4">Examples</h4>
                    <p className="mt-2 text-gray-600">{it.examples.join(", ")}</p>
                  </div>
                  <div>
                    <h4 className="font-bold text-lg text-green-600">Pros</h4>
                    <ul className="mt-2 list-disc list-inside text-green-700 space-y-1">
                      {it.pros.map(p => <li key={p}>{p}</li>)}
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-bold text-lg text-red-600">Cons</h4>
                    <ul className="mt-2 list-disc list-inside text-red-700 space-y-1">
                      {it.cons.map(c => <li key={c}>{c}</li>)}
                    </ul>
                  </div>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>

      {/* Fun & Engagement */}
      <motion.div className="mt-12 p-6 rounded-2xl bg-white shadow-lg" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <h3 className="text-2xl font-bold text-center">{lang === "en" ? "Interesting Fun Facts" : "रोचक तथ्य"}</h3>
        <ul className="mt-4 text-gray-700 list-disc list-inside space-y-2 max-w-2xl mx-auto">
          {t.funFacts.map((fact, index) => (
            <li key={index}>{fact}</li>
          ))}
        </ul>
      </motion.div>

      <div className="w-full flex justify-between items-center mt-10 p-4 bg-gray-100 rounded-lg shadow-md">
        <button
          onClick={() => navigate('/part1/history-of-computers')}
          className="flex items-center gap-2 px-4 py-2 bg-purple-200 hover:bg-purple-300 text-purple-900 rounded-lg shadow transition"
        >
          <FaArrowLeft />
          {t.previous}
        </button>
        <button
          onClick={() => navigate('/parts/prt1')}
          className="flex items-center gap-2 px-4 py-2 bg-green-200 hover:bg-green-300 text-green-900 rounded-lg shadow transition"
        >
          {t.next}
          <FaArrowRight />
        </button>
      </div>
    </div>
  );
}
