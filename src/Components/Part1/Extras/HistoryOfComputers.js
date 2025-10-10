import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaHome, FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { History } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

const CONTENT = {
    en: {
        home: "Home",
        title: "History of Computers",
        subtitle: "The journey of computers from early mechanical devices to today’s digital age",
        intro:
            "Explore the journey of computers: from the simple Abacus through vacuum tubes, transistors, chips, personal computers and the intelligent systems of today.",
        generations: [
            {
                id: "pre-mechanical",
                short: "Early Mechanical Devices",
                title: "Pre-Mechanical & Mechanical (Abacus → Babbage)",
                years: "Before 1940",
                icon: "⚙️",
                color: "#836953",
                images: [
                    "https://images.computerhistory.org/revonline/images/xb93.80p-03-01.jpg?w=600",
                    "https://secondary.com.ng/images/me.jpg",
                    "https://upload.wikimedia.org/wikipedia/commons/c/cc/Babbages_Analytical_Engine%2C_1834-1871._%289660574685%29.jpg"
                ],
                bullets: [
                    "**Abacus**: An early counting tool using beads on rods.",
                    "**Pascaline**: One of the first mechanical calculators using gears.",
                    "**Analytical Engine**: Charles Babbage's concept for a programmable machine, a blueprint for modern computers.",
                ],
                pros: [
                    "**Foundation**: Laid the mathematical and mechanical groundwork for computing.",
                    "**Automation**: First attempts to automate calculation, moving beyond manual human effort."
                ],
                cons: [
                    "**Extremely Slow**: Operations took a very long time.",
                    "**Manual Operation**: Required constant human intervention.",
                    "**Single-Purpose**: Each device could only perform very specific tasks."
                ],
                usage: [
                    "**Trade & Commerce**: The Abacus was widely used for basic arithmetic in markets.",
                    "**Science**: Early calculators helped in astronomy and navigation."
                ],
                handling: [
                    "**By Hand**: All devices were operated manually, by moving beads or turning cranks.",
                    "**No Programming**: These were not programmable; their function was fixed by their physical structure."
                ],
                story:
                    "Imagine a time before electricity. To solve a math problem, you'd either use an Abacus, sliding beads by hand, or turn a crank on a complex box of gears. These were the first steps, proving that machines could handle numbers and logic.",
            },
            {
                id: "gen1",
                short: "First Generation",
                title: "First Generation (Vacuum Tubes)",
                years: "1940–1956",
                icon: "💡",
                color: "#b9770e",
                images: [
                    "https://upload.wikimedia.org/wikipedia/commons/e/e9/Elektronenroehren-auswahl.jpg",
                    "https://upload.wikimedia.org/wikipedia/commons/6/6c/ENIAC_Penn1.jpg",
                    "https://images.computerhistory.org/chess/univac-1.1953.102645278.jpg?w=600"
                ],
                bullets: [
                    "**Core Technology**: Used thousands of **vacuum tubes** which acted as switches.",
                    "**Memory**: Magnetic drums were used for memory.",
                    "**Programming**: Programmed in machine language, a series of 0s and 1s.",
                ],
                pros: [
                    "**The First**: These were the first electronic, general-purpose computers.",
                    "**Speed**: Calculated thousands of times faster than any human could."
                ],
                cons: [
                    "**Massive Size**: Often took up entire rooms.",
                    "**High Energy Use**: Consumed enormous amounts of electricity.",
                    "**Overheating**: Generated intense heat, leading to frequent breakdowns.",
                    "**Unreliable**: Vacuum tubes failed often and needed constant replacement."
                ],
                usage: [
                    "**Military**: Calculating artillery firing tables and code-breaking during WWII.",
                    "**Science**: Used for complex scientific and engineering calculations.",
                    "**Census**: The UNIVAC was famously used for the U.S. Census Bureau."
                ],
                handling: [
                    "**Expert Teams**: Operated by highly trained technicians.",
                    "**Punch Cards**: Programs and data were fed into the machine using punched cards.",
                    "**Physical Switches**: Setting up a program often involved physically flipping switches and re-plugging cables."
                ],
                story:
                    "Picture a giant, humming room filled with glowing glass tubes. Lights flicker as it crunches numbers for secret military projects. This was the birth of electronic computing—powerful, but fragile and demanding.",
            },
            {
                id: "gen2",
                short: "Second Generation",
                title: "Second Generation (Transistors)",
                years: "1956–1963",
                icon: "🔋",
                color: "#2e86c1",
                images: [
                    "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjS8oogp9BQP8BDzOCJru2AMkLxTis5q8zo9r7D3g8D3RiDF4xm4TLmXWaq56L2vxXl3dyILAlPyq0K2DlC4q5oGUCRY1CXxyxs9rL6_o6ajhQGr4kOg62yMP4-FGcDGhGQqyqUvHTLC4-D/w1200-h630-p-k-no-nu/Transistor.jpg",
                    "https://zjcomputerhistory.weebly.com/uploads/2/2/6/6/22664196/273432971.jpg",
                    "https://images.shiksha.com/mediadata/images/articles/1733368899phpmI9VTZ.jpeg"
                ],
                bullets: [
                    "**Core Technology**: **Transistors** replaced bulky vacuum tubes.",
                    "**Programming Languages**: High-level languages like **FORTRAN** and **COBOL** emerged.",
                    "**Memory**: Magnetic core memory became standard.",
                ],
                pros: [
                    "**Smaller & Cheaper**: A fraction of the size and cost of first-gen computers.",
                    "**More Reliable**: Transistors rarely failed compared to vacuum tubes.",
                    "**Energy Efficient**: Used significantly less power and produced less heat."
                ],
                cons: [
                    "**Still Large**: Though smaller, they were still the size of large cabinets.",
                    "**Cooling Needed**: Required powerful air conditioning to operate.",
                    "**High Cost**: Still too expensive for anyone but large organizations."
                ],
                usage: [
                    "**Business**: Widespread use in large corporations for payroll, inventory, and accounting.",
                    "**Scientific Research**: Universities and labs could afford and use them for research.",
                    "**Early Automation**: Used in the first airline reservation systems."
                ],
                handling: [
                    "**Easier Programming**: High-level languages made programming more accessible.",
                    "**Batch Processing**: Jobs were still submitted in batches on punch cards and tape.",
                    "**Professionals**: Operated by trained programmers and computer operators."
                ],
                story:
                    "The giant, hot room of tubes was replaced by a sleek (for the time) set of metal cabinets. Computers were no longer just for secret government projects; they were entering the world of big business, managing money and data with newfound reliability.",
            },
            {
                id: "gen3",
                short: "Third Generation",
                title: "Third Generation (Integrated Circuits)",
                years: "1964–1971",
                icon: "📘",
                color: "#1e8449",
                images: [
                    "https://www.yic-electronics.com/upfile/images/e8/20240823145924342.jpg",
                    "https://www.avaq.com/files/uploads/editor/b/20230616173549different-types-of-integrated-circuit.webp",
                    "https://engineering.uiowa.edu/sites/engineering.uiowa.edu/files/styles/ultrawide__1312_x_562/public/2023-06/Blue-circuit-EE-MEng-ind.jpg?h=bde28bee&itok=NhzhvLeo"
                ],
                bullets: [
                    "**Core Technology**: **Integrated Circuits (ICs)**, or 'chips', placed many transistors onto a single piece of silicon.",
                    "**Operating Systems**: Became advanced enough to allow multiple programs to run at once (multitasking).",
                    "**Minicomputers**: A new class of smaller, more affordable computers emerged."
                ],
                pros: [
                    "**Major Size Reduction**: Computers became much smaller and faster.",
                    "**Mass Production**: ICs could be mass-produced, drastically lowering costs.",
                    "**Increased Accessibility**: The introduction of keyboards and monitors made them more interactive."
                ],
                cons: [
                    "**Complex to Build**: Manufacturing ICs was a highly complex and delicate process.",
                    "**Specialized Use**: Still primarily for businesses and universities."
                ],
                usage: [
                    "**Data Management**: Used extensively for databases and information systems.",
                    "**Aerospace**: The Apollo Guidance Computer was a famous example of this technology.",
                    "**Industry**: Controlled manufacturing processes and industrial automation."
                ],
                handling: [
                    "**Interactive Input**: Users could interact with the computer via keyboards and see output on screens.",
                    "**Operating Systems**: The OS handled many of the complex operations, making the computer easier to use.",
                    "**Time-Sharing**: Multiple users could access the same computer simultaneously."
                ],
                story:
                    "Imagine shrinking an entire circuit board onto a tiny silicon chip. This breakthrough made computers small and cheap enough for more businesses to own one. For the first time, you could type a command and see an instant response on a screen.",
            },
            {
                id: "gen4",
                short: "Fourth Generation",
                title: "Fourth Generation (Microprocessors)",
                years: "1971–Present",
                icon: "🖥️",
                color: "#884ea0",
                images: [
                    "https://electrosome.com/wp-content/uploads/2017/04/Intel-Core-i7.jpg",
                    "https://cdn.britannica.com/08/23608-004-47D6DC21/IBM-Personal-Computer-machine-Microsoft-MS-DOS-operating-1981.jpg",
                    "https://upload.wikimedia.org/wikipedia/commons/d/d1/Macintosh_128k_transparency.png"
                ],
                bullets: [
                    "**Core Technology**: The **Microprocessor** put the entire CPU (Central Processing Unit) onto a single chip.",
                    "**Personal Computers (PCs)**: The birth of computers for individuals (Apple, IBM PC).",
                    "**GUIs**: Graphical User Interfaces with windows, menus, and icons made computers user-friendly."
                ],
                pros: [
                    "**Affordable & Compact**: Small enough to fit on a desk and cheap enough for home use.",
                    "**Easy to Use**: GUIs and mice made computers accessible to non-experts.",
                    "**Software Revolution**: Explosion of software for games, word processing, and more."
                ],
                cons: [
                    "**Limited Power**: Early PCs had very limited memory and processing capabilities.",
                    "**Lack of Standards**: Many different, incompatible computer designs competed."
                ],
                usage: [
                    "**Home & Education**: Used for homework, learning, and entertainment.",
                    "**Small Business**: Revolutionized offices with word processors and spreadsheets.",
                    "**Gaming**: Became a major platform for video games."
                ],
                handling: [
                    "**Direct Interaction**: Anyone could use a keyboard and mouse to control the computer.",
                    "**Consumer Software**: Software was sold in stores on floppy disks.",
                    "**The Internet**: The beginnings of networking connected computers together."
                ],
                story:
                    "The computer finally leaves the giant data center and arrives in your home. It's a beige box on your desk that lets you play games, write letters, and organize your life. This was the moment computing became personal.",
            },
            {
                id: "gen5",
                short: "Fifth Generation",
                title: "Fifth Generation (AI & Connectivity)",
                years: "Present & Beyond",
                icon: "☁️",
                color: "#d35400",
                images: [
                    "https://cdn.mos.cms.futurecdn.net/v2/t:0,l:240,cw:1440,ch:1080,q:80,w:1440/VFLt5vHV7aCoLrLGjP9Qwm.jpg",
                    "https://techblog.smc.it/static/c5256a11117134b1d5f3bd35c479db40/a41d1/ml.jpg",
                    "https://www.cnet.com/a/img/resize/0d324c433c2a121511ac93165d755562d9d15c71/hub/2019/11/12/18974419-4505-4f36-a67b-19d85a855364/apple-iphone-11-11pro-11-pro-max-1123.jpg?auto=webp&fit=crop&height=675&width=1200"
                ],
                bullets: [
                    "**Core Technology**: Focus on **Artificial Intelligence (AI)**, parallel processing, and connectivity.",
                    "**The Internet & Cloud**: Global networks and centralized data storage become dominant.",
                    "**Mobile Computing**: Powerful computers (smartphones, tablets) are now in our pockets."
                ],
                pros: [
                    "**Globally Connected**: The internet links billions of devices and people.",
                    "**Powerful & Portable**: Incredible computing power in small, battery-powered devices.",
                    "**Intelligent Systems**: AI allows computers to learn, reason, and interact naturally."
                ],
                cons: [
                    "**Privacy Concerns**: Massive data collection raises privacy and security issues.",
                    "**Misinformation**: The ease of sharing information can spread false content.",
                    "**Digital Divide**: Not everyone has equal access to this technology."
                ],
                usage: [
                    "**Everywhere**: Used in every sector, from communication and entertainment to science and finance.",
                    "**Social Media & E-commerce**: Redefined how we interact and shop.",
                    "**Internet of Things (IoT)**: Smart devices in homes, cars, and cities are all connected."
                ],
                handling: [
                    "**Natural Interaction**: Touch screens, voice commands (Siri, Alexa), and gestures are common.",
                    "**Always On**: Constant connectivity to the internet is assumed.",
                    "**App-Based**: Functionality is delivered through specialized applications (apps)."
                ],
                story:
                    "Your computer is no longer just a box on your desk—it's in your pocket, on your wrist, and in your home. It talks to you, learns your habits, and connects you to the entire world instantly. Computing has become an invisible, intelligent part of everyday life.",
            },
            {
                id: "future",
                short: "Future",
                title: "Future (Quantum & Beyond)",
                years: "Tomorrow",
                icon: "🔮",
                color: "#c0392b",
                images: [
                    "https://www.azoquantum.com/images/Article_Images/ImageForArticle_519_17140003651563270.jpg",
                    "https://www.itu.int/hub/wp-content/uploads/sites/4/2024/03/AdobeStock_612060108_resized.jpeg.optimal.jpeg",
                    "https://media.wired.com/photos/654bf064161b27c73a87151e/master/w_2560%2Cc_limit/science_neuralink_h_1357591465.jpg"
                ],
                bullets: [
                    "**Quantum Computing**: Uses qubits to perform calculations in fundamentally new ways, solving problems impossible for classical computers.",
                    "**Neuromorphic Computing**: Chips that are modeled on the human brain's structure.",
                    "**Brain-Computer Interfaces (BCI)**: Direct communication pathways between the brain and a device."
                ],
                pros: [
                    "**Unprecedented Power**: Quantum computers could revolutionize medicine, materials science, and AI.",
                    "**Energy Efficiency**: Neuromorphic chips promise to process information with far less power.",
                    "**Seamless Integration**: BCIs could offer new ways for people with disabilities to interact with the world."
                ],
                cons: [
                    "**Extreme Complexity**: These technologies are incredibly difficult to design and build.",
                    "**Stability Issues**: Quantum computers are very fragile and prone to errors (decoherence).",
                    "**Ethical Questions**: BCIs and advanced AI raise profound ethical and societal questions."
                ],
                usage: [
                    "**Drug Discovery**: Simulating molecules to create new medicines.",
                    "**Financial Modeling**: Solving complex financial problems that are currently intractable.",
                    "**Cryptography**: Could break most current forms of encryption (but also create new, stronger ones)."
                ],
                handling: [
                    "**Specialized Environments**: Quantum computers require ultra-cold, controlled environments.",
                    "**New Algorithms**: Requires entirely new ways of thinking and programming.",
                    "**Abstract Interaction**: Programmers will interact with these systems through complex software layers."
                ],
                story:
                    "Imagine a computer that doesn't just follow instructions, but explores all possibilities at once to discover a new life-saving drug. Or a chip that thinks like a brain. This is the future—a world where computing is not just faster, but fundamentally different, merging with our biology and tackling the universe's biggest questions.",
            },
        ],
    },
    hi: {
        home: "होम",
        title: "कंप्यूटर का इतिहास",
        subtitle: "यांत्रिक उपकरणों से आज के डिजिटल युग तक की यात्रा",
        intro:
            "कंप्यूटर की यात्रा का अन्वेषण करें: सरल अबेकस से वैक्यूम ट्यूब, ट्रांजिस्टर, चिप्स, पर्सनल कंप्यूटर और आज के बुद्धिमान सिस्टम तक।",
        generations: [
            {
                id: "pre-mechanical",
                short: "प्रारंभिक यांत्रिक उपकरण",
                title: "पूर्व-यांत्रिक और यांत्रिक (अबेकस → बैबेज)",
                years: "1940 से पहले",
                icon: "⚙️",
                color: "#836953",
                images: [
                    "https://images.computerhistory.org/revonline/images/xb93.80p-03-01.jpg?w=600",
                    "https://secondary.com.ng/images/me.jpg",
                    "https://upload.wikimedia.org/wikipedia/commons/c/cc/Babbages_Analytical_Engine%2C_1834-1871._%289660574685%29.jpg"
                ],
                bullets: [
                    "**अबेकस**: छड़ों पर मोतियों का उपयोग करने वाला एक प्रारंभिक गणना उपकरण।",
                    "**पास्कलिन**: गियर का उपयोग करने वाले पहले यांत्रिक कैलकुलेटरों में से एक।",
                    "**एनालिटिकल इंजन**: चार्ल्स बैबेज की एक प्रोग्राम करने योग्य मशीन की अवधारणा, जो आधुनिक कंप्यूटरों का एक खाका था।",
                ],
                pros: [
                    "**नींव**: कंप्यूटिंग के लिए गणितीय और यांत्रिक आधार तैयार किया।",
                    "**स्वचालन**: गणना को स्वचालित करने का पहला प्रयास, जो मानव प्रयास से आगे था।"
                ],
                cons: [
                    "**अत्यंत धीमा**: कार्यों में बहुत लंबा समय लगता था।",
                    "**मैनुअल ऑपरेशन**: निरंतर मानव हस्तक्षेप की आवश्यकता होती थी।",
                    "**एकल-उद्देश्य**: प्रत्येक उपकरण केवल बहुत विशिष्ट कार्य कर सकता था।"
                ],
                usage: [
                    "**व्यापार और वाणिज्य**: अबेकस का व्यापक रूप से बाजारों में बुनियादी अंकगणित के लिए उपयोग किया जाता था।",
                    "**विज्ञान**: प्रारंभिक कैलकुलेटरों ने खगोल विज्ञान और नेविगेशन में मदद की।"
                ],
                handling: [
                    "**हाथ से**: सभी उपकरण मैन्युअल रूप से संचालित होते थे, मोतियों को हिलाकर या क्रैंक घुमाकर।",
                    "**कोई प्रोग्रामिंग नहीं**: ये प्रोग्राम करने योग्य नहीं थे; उनका कार्य उनकी भौतिक संरचना द्वारा निर्धारित था।"
                ],
                story:
                    "बिजली से पहले का समय सोचें। गणित की समस्या को हल करने के लिए, आप या तो हाथ से मोतियों को खिसकाकर अबेकस का उपयोग करते, या गियर्स के एक जटिल बॉक्स पर एक क्रैंक घुमाते। ये पहले कदम थे, यह साबित करते हुए कि मशीनें संख्याओं और तर्क को संभाल सकती हैं।",
            },
            {
                id: "gen1",
                short: "प्रथम पीढ़ी",
                title: "प्रथम पीढ़ी (वैक्यूम ट्यूब)",
                years: "1940–1956",
                icon: "💡",
                color: "#b9770e",
                images: [
                    "https://upload.wikimedia.org/wikipedia/commons/e/e9/Elektronenroehren-auswahl.jpg",
                    "https://upload.wikimedia.org/wikipedia/commons/6/6c/ENIAC_Penn1.jpg",
                    "https://images.computerhistory.org/chess/univac-1.1953.102645278.jpg?w=600"
                ],
                bullets: [
                    "**मुख्य प्रौद्योगिकी**: हजारों **वैक्यूम ट्यूब** का उपयोग किया गया जो स्विच के रूप में कार्य करते थे।",
                    "**मेमोरी**: मेमोरी के लिए चुंबकीय ड्रम का उपयोग किया जाता था।",
                    "**प्रोग्रामिंग**: मशीन भाषा में प्रोग्राम किया गया, जो 0 और 1 की एक श्रृंखला थी।",
                ],
                pros: [
                    "**पहले**: ये पहले इलेक्ट्रॉनिक, सामान्य-उद्देश्य वाले कंप्यूटर थे।",
                    "**गति**: किसी भी इंसान की तुलना में हजारों गुना तेजी से गणना करते थे।"
                ],
                cons: [
                    "**विशाल आकार**: अक्सर पूरे कमरे घेर लेते थे।",
                    "**उच्च ऊर्जा उपयोग**: भारी मात्रा में बिजली की खपत करते थे।",
                    "**अधिक गर्म होना**: तीव्र गर्मी उत्पन्न करते थे, जिससे बार-बार खराब होते थे।",
                    "**अविश्वसनीय**: वैक्यूम ट्यूब अक्सर विफल हो जाते थे और उन्हें लगातार बदलने की आवश्यकता होती थी।"
                ],
                usage: [
                    "**सेना**: द्वितीय विश्व युद्ध के दौरान तोपखाने की फायरिंग टेबल और कोड-ब्रेकिंग की गणना।",
                    "**विज्ञान**: जटिल वैज्ञानिक और इंजीनियरिंग गणनाओं के लिए उपयोग किया जाता था।",
                    "**जनगणना**: UNIVAC का प्रसिद्ध रूप से अमेरिकी जनगणना ब्यूरो के लिए उपयोग किया गया था।"
                ],
                handling: [
                    "**विशेषज्ञ टीमें**: उच्च प्रशिक्षित तकनीशियनों द्वारा संचालित।",
                    "**पंच कार्ड**: प्रोग्राम और डेटा को पंच किए गए कार्डों का उपयोग करके मशीन में डाला जाता था।",
                    "**भौतिक स्विच**: एक प्रोग्राम सेट करने में अक्सर भौतिक रूप से स्विच फ्लिप करना और केबल को फिर से प्लग करना शामिल होता था।"
                ],
                story:
                    "एक विशाल, गूंजते हुए कमरे की कल्पना करें जो चमकते कांच के ट्यूबों से भरा हो। गुप्त सैन्य परियोजनाओं के लिए संख्याएँ crunch करते समय बत्तियाँ टिमटिमाती हैं। यह इलेक्ट्रॉनिक कंप्यूटिंग का जन्म था — शक्तिशाली, लेकिन नाजुक और मांग वाला।",
            },
            {
                id: "gen2",
                short: "द्वितीय पीढ़ी",
                title: "द्वितीय पीढ़ी (ट्रांजिस्टर)",
                years: "1956–1963",
                icon: "🔋",
                color: "#2e86c1",
                images: [
                    "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjS8oogp9BQP8BDzOCJru2AMkLxTis5q8zo9r7D3g8D3RiDF4xm4TLmXWaq56L2vxXl3dyILAlPyq0K2DlC4q5oGUCRY1CXxyxs9rL6_o6ajhQGr4kOg62yMP4-FGcDGhGQqyqUvHTLC4-D/w1200-h630-p-k-no-nu/Transistor.jpg",
                    "https://zjcomputerhistory.weebly.com/uploads/2/2/6/6/22664196/273432971.jpg",
                    "https://images.shiksha.com/mediadata/images/articles/1733368899phpmI9VTZ.jpeg"
                ],
                bullets: [
                    "**मुख्य प्रौद्योगिकी**: **ट्रांजिस्टर** ने भारी वैक्यूम ट्यूबों की जगह ले ली।",
                    "**प्रोग्रामिंग भाषाएँ**: **FORTRAN** और **COBOL** जैसी उच्च-स्तरीय भाषाएँ उभरीं।",
                    "**मेमोरी**: चुंबकीय कोर मेमोरी मानक बन गई।",
                ],
                pros: [
                    "**छोटे और सस्ते**: पहली पीढ़ी के कंप्यूटरों के आकार और लागत का एक अंश।",
                    "**अधिक विश्वसनीय**: वैक्यूम ट्यूबों की तुलना में ट्रांजिस्टर शायद ही कभी विफल होते थे।",
                    "**ऊर्जा कुशल**: काफी कम बिजली का उपयोग करते थे और कम गर्मी पैदा करते थे।"
                ],
                cons: [
                    "**अभी भी बड़े**: हालांकि छोटे, वे अभी भी बड़े कैबिनेट के आकार के थे।",
                    "**कूलिंग की आवश्यकता**: संचालित करने के लिए शक्तिशाली एयर कंडीशनिंग की आवश्यकता होती थी।",
                    "**उच्च लागत**: अभी भी बड़े संगठनों के अलावा किसी के लिए भी बहुत महंगे थे।"
                ],
                usage: [
                    "**व्यवसाय**: बड़ी कंपनियों में पेरोल, इन्वेंट्री और लेखांकन के लिए व्यापक उपयोग।",
                    "**वैज्ञानिक अनुसंधान**: विश्वविद्यालय और प्रयोगशालाएँ अनुसंधान के लिए उन्हें खरीद और उपयोग कर सकते थे।",
                    "**प्रारंभिक स्वचालन**: पहली एयरलाइन आरक्षण प्रणालियों में उपयोग किया जाता था।"
                ],
                handling: [
                    "**आसान प्रोग्रामिंग**: उच्च-स्तरीय भाषाओं ने प्रोग्रामिंग को अधिक सुलभ बना दिया।",
                    "**बैच प्रोसेसिंग**: नौकरियां अभी भी पंच कार्ड और टेप पर बैचों में जमा की जाती थीं।",
                    "**पेशेवर**: प्रशिक्षित प्रोग्रामर और कंप्यूटर ऑपरेटरों द्वारा संचालित।"
                ],
                story:
                    "ट्यूबों का विशाल, गर्म कमरा (समय के लिए) धातु के कैबिनेट के एक चिकना सेट द्वारा प्रतिस्थापित किया गया था। कंप्यूटर अब केवल गुप्त सरकारी परियोजनाओं के लिए नहीं थे; वे बड़े व्यवसाय की दुनिया में प्रवेश कर रहे थे, पैसे और डेटा को नई विश्वसनीयता के साथ प्रबंधित कर रहे थे।",
            },
            {
                id: "gen3",
                short: "तृतीय पीढ़ी",
                title: "तृतीय पीढ़ी (इंटीग्रेटेड सर्किट)",
                years: "1964–1971",
                icon: "📘",
                color: "#1e8449",
                images: [
                    "https://www.yic-electronics.com/upfile/images/e8/20240823145924342.jpg",
                    "https://www.avaq.com/files/uploads/editor/b/20230616173549different-types-of-integrated-circuit.webp",
                    "https://engineering.uiowa.edu/sites/engineering.uiowa.edu/files/styles/ultrawide__1312_x_562/public/2023-06/Blue-circuit-EE-MEng-ind.jpg?h=bde28bee&itok=NhzhvLeo"
                ],
                bullets: [
                    "**मुख्य प्रौद्योगिकी**: **इंटीग्रेटेड सर्किट (आईसी)**, या 'चिप्स', ने कई ट्रांजिस्टरों को सिलिकॉन के एक ही टुकड़े पर रखा।",
                    "**ऑपरेटिंग सिस्टम**: एक साथ कई प्रोग्राम चलाने की अनुमति देने के लिए पर्याप्त उन्नत हो गए (मल्टीटास्किंग)।",
                    "**मिनीकंप्यूटर**: छोटे, अधिक किफायती कंप्यूटरों का एक नया वर्ग उभरा।"
                ],
                pros: [
                    "**आकार में बड़ी कमी**: कंप्यूटर बहुत छोटे और तेज हो गए।",
                    "**बड़े पैमाने पर उत्पादन**: आईसी का बड़े पैमाने पर उत्पादन किया जा सकता है, जिससे लागत में भारी कमी आई।",
                    "**बढ़ी हुई पहुंच**: कीबोर्ड और मॉनिटर की शुरूआत ने उन्हें अधिक इंटरैक्टिव बना दिया।"
                ],
                cons: [
                    "**निर्माण में जटिल**: आईसी का निर्माण एक अत्यधिक जटिल और नाजुक प्रक्रिया थी।",
                    "**विशेष उपयोग**: अभी भी मुख्य रूप से व्यवसायों और विश्वविद्यालयों के लिए।"
                ],
                usage: [
                    "**डेटा प्रबंधन**: डेटाबेस और सूचना प्रणालियों के लिए बड़े पैमाने पर उपयोग किया जाता है।",
                    "**एयरोस्पेस**: अपोलो गाइडेंस कंप्यूटर इस तकनीक का एक प्रसिद्ध उदाहरण था।",
                    "**उद्योग**: नियंत्रित विनिर्माण प्रक्रियाएं और औद्योगिक स्वचालन।"
                ],
                handling: [
                    "**इंटरैक्टिव इनपुट**: उपयोगकर्ता कीबोर्ड के माध्यम से कंप्यूटर के साथ बातचीत कर सकते थे और स्क्रीन पर आउटपुट देख सकते थे।",
                    "**ऑपरेटिंग सिस्टम**: ओएस ने कई जटिल कार्यों को संभाला, जिससे कंप्यूटर का उपयोग करना आसान हो गया।",
                    "**टाइम-शेयरिंग**: कई उपयोगकर्ता एक ही समय में एक ही कंप्यूटर का उपयोग कर सकते थे।"
                ],
                story:
                    "एक पूरे सर्किट बोर्ड को एक छोटे सिलिकॉन चिप पर सिकोड़ने की कल्पना करें। इस सफलता ने कंप्यूटरों को इतना छोटा और सस्ता बना दिया कि अधिक व्यवसाय एक का मालिक हो सकते हैं। पहली बार, आप एक कमांड टाइप कर सकते थे और स्क्रीन पर तत्काल प्रतिक्रिया देख सकते थे।",
            },
            {
                id: "gen4",
                short: "चौथी पीढ़ी",
                title: "चौथी पीढ़ी (माइक्रोप्रोसेसर)",
                years: "1971–Present",
                icon: "🖥️",
                color: "#884ea0",
                images: [
                    "https://electrosome.com/wp-content/uploads/2017/04/Intel-Core-i7.jpg",
                    "https://cdn.britannica.com/08/23608-004-47D6DC21/IBM-Personal-Computer-machine-Microsoft-MS-DOS-operating-1981.jpg",
                    "https://upload.wikimedia.org/wikipedia/commons/d/d1/Macintosh_128k_transparency.png"
                ],
                bullets: [
                    "**मुख्य प्रौद्योगिकी**: **माइक्रोप्रोसेसर** ने पूरे सीपीयू (सेंट्रल प्रोसेसिंग यूनिट) को एक ही चिप पर रख दिया।",
                    "**पर्सनल कंप्यूटर (पीसी)**: व्यक्तियों के लिए कंप्यूटर का जन्म (एप्पल, आईबीएम पीसी)।",
                    "**जीयूआई**: विंडोज, मेनू और आइकन के साथ ग्राफिकल यूजर इंटरफेस ने कंप्यूटर को उपयोगकर्ता के अनुकूल बना दिया।"
                ],
                pros: [
                    "**सस्ता और कॉम्पैक्ट**: एक डेस्क पर फिट होने के लिए काफी छोटा और घर के उपयोग के लिए काफी सस्ता।",
                    "**उपयोग में आसान**: जीयूआई और चूहों ने कंप्यूटर को गैर-विशेषज्ञों के लिए सुलभ बना दिया।",
                    "**सॉफ्टवेयर क्रांति**: गेम, वर्ड प्रोसेसिंग और बहुत कुछ के लिए सॉफ्टवेयर का विस्फोट।"
                ],
                cons: [
                    "**सीमित शक्ति**: शुरुआती पीसी में बहुत सीमित मेमोरी और प्रसंस्करण क्षमताएं थीं।",
                    "**मानकों का अभाव**: कई अलग-अलग, असंगत कंप्यूटर डिजाइन प्रतिस्पर्धी थे।"
                ],
                usage: [
                    "**घर और शिक्षा**: होमवर्क, सीखने और मनोरंजन के लिए उपयोग किया जाता है।",
                    "**लघु व्यवसाय**: वर्ड प्रोसेसर और स्प्रेडशीट के साथ कार्यालयों में क्रांति ला दी।",
                    "**गेमिंग**: वीडियो गेम के लिए एक प्रमुख मंच बन गया।"
                ],
                handling: [
                    "**प्रत्यक्ष सहभागिता**: कोई भी कंप्यूटर को नियंत्रित करने के लिए कीबोर्ड और माउस का उपयोग कर सकता है।",
                    "**उपभोक्ता सॉफ्टवेयर**: सॉफ्टवेयर फ्लॉपी डिस्क पर दुकानों में बेचा जाता था।",
                    "**इंटरनेट**: नेटवर्किंग की शुरुआत ने कंप्यूटरों को एक साथ जोड़ा।"
                ],
                story:
                    "कंप्यूटर अंततः विशाल डेटा सेंटर छोड़ देता है और आपके घर पहुंचता है। यह आपकी मेज पर एक बेज बॉक्स है जो आपको गेम खेलने, पत्र लिखने और अपने जीवन को व्यवस्थित करने देता है। यह वह क्षण था जब कंप्यूटिंग व्यक्तिगत हो गई।",
            },
            {
                id: "gen5",
                short: "पंचमी पीढ़ी",
                title: "पंचमी पीढ़ी (एआई और कनेक्टिविटी)",
                years: "Present & Beyond",
                icon: "☁️",
                color: "#d35400",
                images: [
                    "https://cdn.mos.cms.futurecdn.net/v2/t:0,l:240,cw:1440,ch:1080,q:80,w:1440/VFLt5vHV7aCoLrLGjP9Qwm.jpg",
                    "https://techblog.smc.it/static/c5256a11117134b1d5f3bd35c479db40/a41d1/ml.jpg",
                    "https://www.cnet.com/a/img/resize/0d324c433c2a121511ac93165d755562d9d15c71/hub/2019/11/12/18974419-4505-4f36-a67b-19d85a855364/apple-iphone-11-11pro-11-pro-max-1123.jpg?auto=webp&fit=crop&height=675&width=1200"
                ],
                bullets: [
                    "**मुख्य प्रौद्योगिकी**: **आर्टिफिशियल इंटेलिजेंस (एआई)**, समानांतर प्रसंस्करण और कनेक्टिविटी पर ध्यान केंद्रित करें।",
                    "**इंटरनेट और क्लाउड**: वैश्विक नेटवर्क और केंद्रीकृत डेटा भंडारण प्रमुख हो जाते हैं।",
                    "**मोबाइल कंप्यूटिंग**: शक्तिशाली कंप्यूटर (स्मार्टफोन, टैबलेट) अब हमारी जेब में हैं।"
                ],
                pros: [
                    "**विश्व स्तर पर जुड़ा हुआ**: इंटरनेट अरबों उपकरणों और लोगों को जोड़ता है।",
                    "**शक्तिशाली और पोर्टेबल**: छोटे, बैटरी चालित उपकरणों में अविश्वसनीय कंप्यूटिंग शक्ति।",
                    "**बुद्धिमान प्रणालियाँ**: एआई कंप्यूटरों को सीखने, तर्क करने और स्वाभाविक रूप से बातचीत करने की अनुमति देता है।"
                ],
                cons: [
                    "**गोपनीयता संबंधी चिंताएँ**: बड़े पैमाने पर डेटा संग्रह गोपनीयता और सुरक्षा के मुद्दे उठाता है।",
                    "**गलत सूचना**: जानकारी साझा करने में आसानी झूठी सामग्री फैला सकती है।",
                    "**डिजिटल डिवाइड**: हर किसी के पास इस तकनीक तक समान पहुंच नहीं है।"
                ],
                usage: [
                    "**हर जगह**: संचार और मनोरंजन से लेकर विज्ञान और वित्त तक हर क्षेत्र में उपयोग किया जाता है।",
                    "**सोशल मीडिया और ई-कॉमर्स**: हमारे बातचीत और खरीदारी के तरीके को फिर से परिभाषित किया।",
                    "**इंटरनेट ऑफ थिंग्स (IoT)**: घरों, कारों और शहरों में स्मार्ट डिवाइस सभी जुड़े हुए हैं।"
                ],
                handling: [
                    "**प्राकृतिक सहभागिता**: टच स्क्रीन, वॉयस कमांड (सिरी, एलेक्सा), और इशारे आम हैं।",
                    "**हमेशा चालू**: इंटरनेट से निरंतर कनेक्टिविटी मान ली जाती है।",
                    "**ऐप-आधारित**: कार्यक्षमता विशेष अनुप्रयोगों (ऐप्स) के माध्यम से वितरित की जाती है।"
                ],
                story:
                    "आपका कंप्यूटर अब केवल आपकी मेज पर एक बॉक्स नहीं है - यह आपकी जेब में, आपकी कलाई पर और आपके घर में है। यह आपसे बात करता है, आपकी आदतें सीखता है, और आपको तुरंत पूरी दुनिया से जोड़ता है। कंप्यूटिंग रोजमर्रा की जिंदगी का एक अदृश्य, बुद्धिमान हिस्सा बन गया है।",
            },
            {
                id: "future",
                short: "भविष्य",
                title: "भविष्य (क्वांटम और परे)",
                years: "Tomorrow",
                icon: "🔮",
                color: "#c0392b",
                images: [
                    "https://www.azoquantum.com/images/Article_Images/ImageForArticle_519_17140003651563270.jpg",
                    "https://www.itu.int/hub/wp-content/uploads/sites/4/2024/03/AdobeStock_612060108_resized.jpeg.optimal.jpeg",
                    "https://media.wired.com/photos/654bf064161b27c73a87151e/master/w_2560%2Cc_limit/science_neuralink_h_1357591465.jpg"
                ],
                bullets: [
                    "**क्वांटम कंप्यूटिंग**: शास्त्रीय कंप्यूटरों के लिए असंभव समस्याओं को हल करते हुए, मौलिक रूप से नए तरीकों से गणना करने के लिए क्यूबिट्स का उपयोग करता है।",
                    "**न्यूरोमॉर्फिक कंप्यूटिंग**: चिप्स जो मानव मस्तिष्क की संरचना पर आधारित होते हैं।",
                    "**ब्रेन-कंप्यूटर इंटरफेस (बीसीआई)**: मस्तिष्क और एक उपकरण के बीच सीधे संचार मार्ग।"
                ],
                pros: [
                    "**अभूतपूर्व शक्ति**: क्वांटम कंप्यूटर दवा, सामग्री विज्ञान और एआई में क्रांति ला सकते हैं।",
                    "**ऊर्जा दक्षता**: न्यूरोमॉर्फिक चिप्स बहुत कम शक्ति के साथ सूचना को संसाधित करने का वादा करते हैं।",
                    "**निर्बाध एकीकरण**: बीसीआई विकलांग लोगों को दुनिया के साथ बातचीत करने के नए तरीके प्रदान कर सकते हैं।"
                ],
                cons: [
                    "**अत्यधिक जटिलता**: इन तकनीकों को डिजाइन और निर्माण करना अविश्वसनीय रूप से कठिन है।",
                    "**स्थिरता के मुद्दे**: क्वांटम कंप्यूटर बहुत नाजुक होते हैं और त्रुटियों (डीकोहेरेंस) के प्रति प्रवण होते हैं।",
                    "**नैतिक प्रश्न**: बीसीआई और उन्नत एआई गहन नैतिक और सामाजिक प्रश्न उठाते हैं।"
                ],
                usage: [
                    "**दवा की खोज**: नई दवाएं बनाने के लिए अणुओं का अनुकरण करना।",
                    "**वित्तीय मॉडलिंग**: जटिल वित्तीय समस्याओं को हल करना जो वर्तमान में असाध्य हैं।",
                    "**क्रिप्टोग्राफी**: अधिकांश वर्तमान प्रकार के एन्क्रिप्शन को तोड़ सकता है (लेकिन नए, मजबूत भी बना सकता है)।"
                ],
                handling: [
                    "**विशेष वातावरण**: क्वांटम कंप्यूटरों को अति-ठंडे, नियंत्रित वातावरण की आवश्यकता होती है।",
                    "**नए एल्गोरिदम**: सोचने और प्रोग्रामिंग के पूरी तरह से नए तरीकों की आवश्यकता है।",
                    "**अमूर्त सहभागिता**: प्रोग्रामर इन प्रणालियों के साथ जटिल सॉफ्टवेयर परतों के माध्यम से बातचीत करेंगे।"
                ],
                story:
                    "एक ऐसे कंप्यूटर की कल्पना करें जो सिर्फ निर्देशों का पालन नहीं करता है, बल्कि एक नई जीवन रक्षक दवा की खोज के लिए एक ही बार में सभी संभावनाओं की पड़ताल करता है। या एक चिप जो मस्तिष्क की तरह सोचती है। यह भविष्य है - एक ऐसी दुनिया जहां कंप्यूटING केवल तेज नहीं है, बल्कि मौलिक रूप से अलग है, हमारी जीव विज्ञान के साथ विलय कर रही है और ब्रह्मांड के सबसे बड़े सवालों से निपट रही है।",
            },
        ],
    },
};

// Helpers
function renderWithBold(text) {
    if (!text) return null;
    const parts = text.split(/(\*\*.*?\*\*)/g);
    return parts.map((part, i) => {
        const m = part.match(/^\*\*(.*)\*\*$/);
        if (m) return (
            <strong key={i} className="font-semibold" style={{ color: '#5D4037' }}>
                {m[1]}
            </strong>
        );
        return <span key={i}>{part}</span>;
    });
}

const DetailSection = ({ title, items, color, lang }) => {
    if (!items || items.length === 0) return null;
    return (
        <div className="mt-6">
            <h4 className="font-bold text-xl mb-3 text-stone-700" style={{ color }}>
                {title}
            </h4>
            <div className="space-y-2">
                {items.map((item, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.05 * i }}
                        className="bg-[#F5F5F5]/50 border border-stone-300/60 rounded-lg p-3 text-sm text-stone-800 shadow-sm"
                    >
                        {renderWithBold(item)}
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

const ContentBlock = ({ image, children }) => (
    <div className="mt-8 border-t-2 border-dashed border-stone-400/50 pt-8">
        <motion.img
            src={image}
            alt="Historical computer"
            className="w-full h-auto object-cover rounded-lg shadow-lg mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        />
        {children}
    </div>
);


const TimelineStepper = ({ generations, activeId, setActiveId, lang }) => {
    return (
        <div className="w-full overflow-x-auto pb-4">
            <div className="flex items-center justify-between" style={{ minWidth: `${generations.length * 100}px` }}>
                {generations.map((g, i) => (
                    <React.Fragment key={g.id}>
                        <div className="flex flex-col items-center">
                            <button
                                onClick={() => setActiveId(g.id)}
                                className="flex flex-col items-center text-center transition-transform duration-200 hover:scale-110"
                            >
                                <motion.div
                                    className="w-12 h-12 rounded-full flex items-center justify-center text-xl shadow-md"
                                    animate={{
                                        backgroundColor: g.id === activeId ? g.color : '#FFFFFF',
                                        color: g.id === activeId ? '#FFFFFF' : g.color,
                                        scale: g.id === activeId ? 1.1 : 1,
                                    }}
                                >
                                    {g.icon}
                                </motion.div>
                                <div className={`mt-2 text-xs font-semibold ${g.id === activeId ? 'text-stone-800' : 'text-stone-500'}`}>
                                    {g.short}
                                </div>
                            </button>
                        </div>
                        {i < generations.length - 1 && (
                            <div className="flex-1 h-1 bg-stone-300/70" />
                        )}
                    </React.Fragment>
                ))}
            </div>
        </div>
    );
};


export default function HistoryOfComputersComponent() {
    const [lang, setLang] = useState("en");
    const data = CONTENT[lang];
    const [activeId, setActiveId] = useState(data.generations[0].id);
    const navigate = useNavigate();

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

    const activeIndex = data.generations.findIndex((g) => g.id === activeId);
    const activeGeneration = data.generations[activeIndex];

    const handleStageChange = (newIndex) => {
        const safeIndex = (newIndex + data.generations.length) % data.generations.length;
        setActiveId(data.generations[safeIndex].id);
        window.scrollTo(0, 0);
    };

    return (
        <section className="p-4 sm:p-6 bg-gradient-to-b from-[#fdf6e3] via-[#f3eade] to-[#e8e0d1] min-h-screen font-serif">
            <div className="max-w-4xl mx-auto">

                {/* HEADER */}
                <div className="flex items-center justify-between mb-8">
                    <Link to="/parts/prt1" className="inline-flex items-center px-4 py-2 bg-white/80 rounded-full shadow-md border border-stone-200/80 hover:bg-white transition">
                        <FaHome className="mr-2 text-lg text-amber-800" />
                        <span className="text-stone-800">{data.home}</span>
                    </Link>
                    <div className="flex space-x-2">
                        <button onClick={() => setLang("en")} className={`px-3 py-1 rounded-lg border font-semibold ${lang === "en" ? "bg-amber-800 text-white border-amber-800" : "bg-white/80 text-stone-700 border-stone-300/80"} transition`}>EN</button>
                        <button onClick={() => setLang("hi")} className={`px-3 py-1 rounded-lg border font-semibold ${lang === "hi" ? "bg-amber-800 text-white border-amber-800" : "bg-white/80 text-stone-700 border-stone-300/80"} transition`}>हिं</button>
                    </div>
                </div>

                {/* TITLE SECTION */}
                <div className="text-center mb-8">
                    <motion.h1
                        initial={{ opacity: 0, y: -8 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-4xl md:text-5xl font-extrabold text-stone-800"
                    >
                        {data.title}
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.1 }}
                        className="text-stone-600 mt-2 max-w-2xl mx-auto"
                    >
                        {data.subtitle}
                    </motion.p>
                </div>

                {/* INTRO CARD */}
                <motion.div
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="my-8 bg-white/60 rounded-2xl p-6 shadow-md"
                >
                    <div className="md:flex md:items-center md:gap-6">
                        <div className="md:flex-1">
                            <p className="text-stone-700 leading-relaxed">{data.intro}</p>
                        </div>
                        <div className="mt-4 md:mt-0 flex justify-center">
                            <motion.div whileHover={{ rotate: 6, scale: 1.1 }} className="rounded-xl p-4 bg-amber-100/50 text-amber-800">
                                <History size={56} />
                            </motion.div>
                        </div>
                    </div>
                </motion.div>

                {/* HORIZONTAL STEPPER */}
                <div className="my-12 bg-white/60 p-4 rounded-xl shadow-md">
                    <TimelineStepper generations={data.generations} activeId={activeId} setActiveId={setActiveId} lang={lang} />
                </div>


                {/* DETAILS CONTENT */}
                <AnimatePresence mode="wait">
                    <motion.div
                        key={activeId}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.4 }}
                        className="bg-white/70 rounded-2xl p-6 sm:p-8 shadow-xl"
                    >
                        <h2 className="text-3xl font-bold text-stone-900" style={{ color: activeGeneration.color }}>
                            {activeGeneration.title}
                        </h2>
                        <p className="text-sm text-stone-500 mt-1">{activeGeneration.years}</p>

                        <ContentBlock image={activeGeneration.images[0]}>
                            <div className="mt-4 text-stone-700 leading-relaxed border-l-4 pl-4" style={{ borderColor: activeGeneration.color }}>
                                <p className="italic">{activeGeneration.story}</p>
                            </div>
                            <DetailSection title={lang === 'en' ? "Key Features" : "मुख्य विशेषताएँ"} items={activeGeneration.bullets} color={activeGeneration.color} lang={lang} />
                        </ContentBlock>

                        {activeGeneration.images.length > 1 && (
                            <ContentBlock image={activeGeneration.images[1]}>
                                <DetailSection title={lang === 'en' ? "Advantages" : "फायदे"} items={activeGeneration.pros} color="#16a34a" lang={lang} />
                                <DetailSection title={lang === 'en' ? "Disadvantages" : "नुकसान"} items={activeGeneration.cons} color="#dc2626" lang={lang} />
                            </ContentBlock>
                        )}

                        {activeGeneration.images.length > 2 && (
                            <ContentBlock image={activeGeneration.images[2]}>
                                <DetailSection title={lang === 'en' ? "Usage Sector" : "उपयोग क्षेत्र"} items={activeGeneration.usage} color="#2563eb" lang={lang} />
                                <DetailSection title={lang === 'en' ? "How It Was Handled" : "कैसे संभाला गया"} items={activeGeneration.handling} color="#475569" lang={lang} />
                            </ContentBlock>
                        )}
                        
                        <div className="mt-10 flex justify-between items-center border-t border-stone-200/80 pt-6">
                            <button
                                onClick={() => handleStageChange(activeIndex - 1)}
                                className="flex items-center gap-2 px-4 py-2 bg-stone-200/80 hover:bg-stone-300/80 text-stone-800 rounded-lg shadow transition"
                            >
                                <FaArrowLeft />
                                {lang === 'en' ? 'Previous' : 'पिछला'}
                            </button>
                            <div className="text-xs text-stone-500">
                                {lang === "en" ? `Stage ${activeIndex + 1}/${data.generations.length}` : `चरण ${activeIndex + 1}/${data.generations.length}`}
                            </div>
                            <button
                                onClick={() => handleStageChange(activeIndex + 1)}
                                className="flex items-center gap-2 px-4 py-2 bg-stone-200/80 hover:bg-stone-300/80 text-stone-800 rounded-lg shadow transition"
                            >
                                {lang === 'en' ? 'Next' : 'अगला'}
                                <FaArrowRight />
                            </button>
                        </div>
                    </motion.div>
                </AnimatePresence>

                {/* Comparative chart */}
                <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 }}
                    className="mt-12 bg-white/60 rounded-2xl p-6 shadow-md"
                >
                    <h4 className="font-bold text-xl text-stone-800">
                        {lang === "en" ? "Comparative View" : "तुलनात्मक दृश्य"}
                    </h4>
                    <p className="text-xs text-stone-500 mt-1">
                        {lang === "en"
                            ? "Size, Speed and Cost trends across generations"
                            : "पीढ़ियों में आकार, गति और लागत रुझान"}
                    </p>

                    <div className="mt-6 space-y-4">
                        {[
                            {
                                label: lang === "en" ? "Size" : "आकार",
                                values: [90, 60, 36, 14, 6, 2],
                                color: "bg-red-800/70",
                            },
                            {
                                label: lang === "en" ? "Speed" : "गति",
                                values: [10, 30, 50, 78, 95, 99],
                                color: "bg-sky-800/70",
                            },
                            {
                                label: lang === "en" ? "Cost (relative)" : "लागत (सापेक्ष)",
                                values: [95, 70, 40, 30, 20, 25],
                                color: "bg-green-800/70",
                            },
                        ].map((metric) => (
                            <div key={metric.label}>
                                <div className="flex items-center justify-between text-xs text-stone-600 mb-1">
                                    <div>{metric.label}</div>
                                    <div className="text-xs">
                                        {lang === "en" ? "First → Future" : "प्रथम → भविष्य"}
                                    </div>
                                </div>
                                <div className="flex items-center bg-stone-200/80 rounded-full h-4">
                                    <motion.div
                                        className={`${metric.color} h-4 rounded-full`}
                                        initial={{ width: 0 }}
                                        whileInView={{ width: `${metric.values[activeIndex]}%` }}
                                        viewport={{ once: false }}
                                        transition={{ type: "spring", stiffness: 50, damping: 15 }}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </motion.div>

                {/* Page Navigation */}
                <div className="flex flex-col md:flex-row justify-between items-center mt-10 p-4 bg-white/70 rounded-lg shadow-md gap-4 md:gap-0">
                    <button
                        onClick={() => navigate('/part1/ports-and-connectors')}
                        className="flex items-center gap-2 px-4 py-2 bg-amber-200/70 hover:bg-amber-300/70 text-amber-900 rounded-lg shadow transition"
                    >
                        <FaArrowLeft />
                        {lang === 'en' ? 'Previous Chapter' : 'पिछला अध्याय'}
                    </button>
                    <button
                        onClick={() => navigate('/part1/types-of-computers')}
                        className="flex items-center gap-2 px-4 py-2 bg-amber-200/70 hover:bg-amber-300/70 text-amber-900 rounded-lg shadow transition"
                    >
                        {lang === 'en' ? 'Next Chapter' : 'अगला अध्याय'}
                        <FaArrowRight />
                    </button>
                </div>
            </div>
        </section>
    );
}