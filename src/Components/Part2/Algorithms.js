import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { FaHome, FaArrowLeft, FaArrowRight, FaHourglassEnd, FaBullseye, FaListOl, FaUtensils, FaMapMarkedAlt, FaSort, FaSearch, FaThumbsUp, FaLanguage, FaCloud, FaMousePointer } from "react-icons/fa";

export default function AlgorithmComponent() {
    const navigate = useNavigate();
    const [lang, setLang] = useState("en");
    const [active, setActive] = useState(0);

    const stages = {
        en: {
            home: "Home",
            stages: {
                1: {
                    title: "What's an Algorithm? Your Step-by-Step Guide!",
                    analogy: "Think of it like a recipe or a LEGO instruction booklet.",
                    details: [
                        {
                            subtitle: "The Big Idea: Everything is a Set of Instructions!",
                            text: "Every day, without even realizing it, you use algorithms to get things done. It might sound technical, but it's true. For example, when you decide to make a simple bowl of cereal, your brain automatically follows a sequence of steps. You get a bowl, pour the cereal, then add milk. That entire series of steps—first this, then that, then the next thing—is an algorithm. It's simply a clear, ordered way to complete a task. This applies to everything, from tying your shoelaces to following directions to a friend's house; there's a hidden algorithm for almost every task you perform.",
                        },
                        {
                            subtitle: "The Actual Definition",
                            text: "Technically, an **Algorithm** is a finite set of clear, ordered rules and instructions designed to perform a specific task or solve a problem.\n\n* Finite: It must have a clear end; it can't go on forever.\n* Well-defined: Each instruction must be crystal clear, with only one possible meaning.\n* Ordered: The steps must be performed in the correct sequence for it to work.",
                            highlight: true,
                        },
                        {
                            subtitle: "Why Do Algorithms Matter? (The Real-World Impact)",
                            text: "Algorithms are the **backbone** of modern technology. Without them, your smartphone or computer would be useless.\n\n* **1. Computers Aren't 'Smart':** They are incredibly fast, but they need precise, step-by-step instructions for every single task. Those instructions are algorithms.\n* **2. They Find the Best Solution:** Google Maps uses a powerful algorithm to analyze millions of possibilities and find the absolute fastest route for you, saving you time and fuel.\n* **3. They Ensure Reliable Results:** An ATM or a calculator follows a strict algorithm to ensure it gives the correct output every single time, without fail.\n\nIn short, algorithms turn our fast but 'unthinking' computers into the useful, efficient, and reliable tools we use every day.",
                        },
                        {
                            subtitle: "Mini-Algorithms in Your Daily Life",
                            text: "You use dozens of them without thinking! \n\n**Getting Ready for School:**\n1. Wake up.\n2. Brush your teeth.\n3. Get dressed.\n4. Eat breakfast.\n5. Pack your bag. \n(Goal: Be ready for school on time!)\n\n**Making Tea:**\n1. Boil water.\n2. Place a tea bag in a mug.\n3. Pour the hot water into the mug.\n4. Let it steep for 3 minutes.\n5. Remove the tea bag and add sugar or milk if desired.\n(Goal: A perfect cup of tea!)",
                        },
                    ],
                },
                2: {
                    title: "The 3 Golden Rules of Algorithms",
                    analogy: "Think of it as a perfect treasure map. If it's endless, vague, or the steps are out of order, you'll never find the treasure!",
                    details: [
                        {
                            subtitle: "1. Must Be Finite: It Has to End!",
                            text: "An algorithm can't run forever. It must have a clear stopping point. Just like a recipe has a final step, an algorithm needs to conclude to be useful. This prevents it from getting stuck in an infinite loop.",
                            icon: <FaHourglassEnd />
                        },
                        {
                            subtitle: "2. Must Be Well-Defined: No Guesswork!",
                            text: "Every instruction must be crystal clear. Vague instructions like 'add a bit of salt' are bad for algorithms. It should be precise, like 'add 1/4 teaspoon of salt'. Computers need exact commands.",
                            icon: <FaBullseye />
                        },
                        {
                            subtitle: "3. Must Be Ordered: Sequence is Key!",
                            text: "The sequence of instructions is critical. You have to put on your socks **before** your shoes. Scrambling the steps of an algorithm will lead to the wrong result or a complete failure.",
                            icon: <FaListOl />
                        }
                    ]
                },
                3: {
                    title: "Algorithms in Everyday Life",
                    analogy: "You're an algorithm expert and you don't even know it! Many daily routines are algorithms in disguise.",
                    details: [
                        {
                            subtitle: "Making a Sandwich: A Delicious Algorithm",
                            text: "1. **Get two slices of bread.** (Input)\n2. **Spread mayonnaise on one slice.**\n3. **Add lettuce, tomato, and cheese.**\n4. **Place the second slice on top.**\n5. **Cut the sandwich in half.** (Processing)\n6. **Serve on a plate.** (Output)\nThis simple, ordered set of steps guarantees a consistent result every time!",
                            icon: <FaUtensils />
                        },
                        {
                            subtitle: "Following GPS Directions: A Navigational Algorithm",
                            text: "When you use a GPS, it's running a powerful algorithm:\n1. **Define starting point and destination.** (Input)\n2. **Analyze all possible routes, considering traffic and distance.** (Processing)\n3. **Provide turn-by-turn instructions.**\n4. **Recalculate if you miss a turn.**\n5. **Announce you've arrived.** (Output)\nIt's a perfect example of a complex problem solved with clear, ordered steps.",
                            icon: <FaMapMarkedAlt />
                        }
                    ]
                },
                4: {
                    title: "How Computers Use Algorithms",
                    analogy: "If a computer is a super-fast chef, algorithms are its recipes for handling information.",
                    details: [
                        {
                            subtitle: "Sorting: Creating Order from Chaos",
                            text: "Computers use sorting algorithms to arrange data in a specific order, like A-Z or lowest to highest. It's how your contacts are alphabetized!\n\n**Example (Bubble Sort):**\n`REPEAT until no swaps are made:`\n  `FOR each item in the list:`\n    `IF item > next item:`\n      `SWAP them`",
                            icon: <FaSort />
                        },
                        {
                            subtitle: "Searching: Finding a Needle in a Haystack",
                            text: "Searching algorithms help computers find specific pieces of data in a huge collection. This is how search engines find a single webpage among billions.\n\n**Example (Linear Search):**\n`FOR each item in the list:`\n  `IF item is what we're looking for:`\n    `RETURN item`\n`RETURN 'Not Found'`",
                            icon: <FaSearch />
                        },
                        {
                            subtitle: "Recommendations: Guessing What You'll Like",
                            text: "Recommendation algorithms analyze your past behavior to predict what you might like in the future. It's how streaming services suggest movies or online stores show you products.\n\n**How it works:**\n`IF you liked Movie A and Movie B:`\n  `AND other people who liked A and B also liked C:`\n    `THEN recommend Movie C to you.`",
                            icon: <FaThumbsUp />
                        }
                    ]
                },
                5: {
                    title: "This Page is an Algorithm!",
                    analogy: "This very component is a great example of algorithms working together to create an interactive experience.",
                    details: [
                        {
                            subtitle: "Language Toggle: A Selection Algorithm",
                            text: "When you click the 'EN' or 'हिं' button, you're running an algorithm that does the following:\n1. **Detects a click event.**\n2. **Checks which button was clicked.**\n3. **Sets the 'lang' state to 'en' or 'hi'.**\n4. **Re-renders the entire component with the new language content.**\nThis simple selection logic allows the display to change instantly.",
                            icon: <FaLanguage />
                        },
                        {
                            subtitle: "Stage Buttons: A State Management Algorithm",
                            text: "Clicking on a stage button (like this one!) triggers another algorithm:\n1. **Receives the stage number you clicked.**\n2. **Updates the 'active' state to that number.**\n3. **The component re-renders, showing you the content for the new active stage.**\n4. **The button's color changes because its style is dependent on the 'active' state.**",
                            icon: <FaMousePointer />
                        },
                        {
                            subtitle: "Floating Clouds: An Animation Algorithm",
                            text: "The animated clouds in the background are controlled by a looping animation algorithm. It continuously updates their position and opacity over a set duration to create a smooth, floating effect. Clicking the 'Clouds: On/Off' button toggles the `play` state that controls this animation loop.",
                            icon: <FaCloud />
                        }
                    ]
                },
            },
        },
        hi: {
            home: "होम",
            stages: {
                1: {
                    title: "Algorithm क्या है? आपका स्टेप-बाय-स्टेप गाइड!",
                    analogy: "इसे एक रेसिपी या LEGO इंस्ट्रक्शन बुकलेट की तरह सोचें।",
                    details: [
                        {
                            subtitle: "मूल विचार: हर चीज़ के लिए निर्देश!",
                            text: "हर दिन, जब हम कोई भी काम करते हैं, तो हम अनजाने में ही Algorithm का इस्तेमाल कर रहे होते हैं। यह सोचने में थोड़ा अजीब लग सकता है, लेकिन यह सच है। उदाहरण के लिए, जब आपको सुबह भूख लगती है और आप एक साधारण सैंडविच बनाने का फैसला करते हैं, तो आपका दिमाग अपने आप कुछ कदम उठाता है। आप पहले ब्रेड के दो स्लाइस निकालते हैं, फिर आप उन पर मक्खन या चटनी लगाते हैं, फिर अपनी पसंदीदा सब्ज़ियाँ रखते हैं, और अंत में दोनों स्लाइस को एक साथ जोड़ देते हैं। कदमों की यह पूरी श्रृंखला—पहला कदम, दूसरा कदम, तीसरा कदम—यही एक Algorithm है। यह किसी काम को पूरा करने का एक स्पष्ट और क्रमबद्ध तरीका है। यह सिर्फ सैंडविच बनाने तक ही सीमित नहीं है; जूते के फीते बांधने से लेकर अपनी स्कूल की किताबों को बैग में लगाने तक, हर काम में एक छिपा हुआ Algorithms होता है।",
                        },
                        {
                            subtitle: "वास्तविक परिभाषा (Actual Definition)",
                            text: "तकनीकी रूप से, **एल्गोरिदम** किसी विशेष कार्य को पूरा करने या किसी समस्या को हल करने के लिए बनाए गए **नियमों और निर्देशों का एक सीमित, स्पष्ट और क्रमबद्ध समूह** है।\n\n* सीमित (Finite): इसके स्टेप्स गिने-चुने होते हैं और यह हमेशा एक अंत पर पहुँचता है।\n* स्पष्ट (Well-defined): हर निर्देश का केवल एक ही मतलब होता है, ताकि कोई भ्रम न हो।\n* क्रमबद्ध (Ordered): हर निर्देश एक खास क्रम में होता है, और उस क्रम का पालन करना ज़रूरी है।",
                            highlight: true,
                        },
                        {
                            subtitle: "Algorithms क्यों महत्वपूर्ण हैं?",
                            text: "एल्गोरिदम आधुनिक तकनीक की **बुनियाद** है। इसके बिना, आपका स्मार्टफोन या कंप्यूटर काम ही नहीं कर सकता। \n" +
                                "1. कंप्यूटर 'स्मार्ट' नहीं होते: वे बस तेज़ होते हैं और उन्हें हर काम के लिए सटीक, स्टेप-बाय-स्टेप निर्देशों की ज़रूरत होती है। ये निर्देश ही एल्गोरिदम हैं। \n" +
                                "2. यह सबसे अच्छा तरीका ढूंढता है: Google Maps एक बेहतरीन एल्गोरिदम का उपयोग करके लाखों संभावनाओं में से सबसे तेज़ रास्ता ढूंढता है, जिससे आपका समय बचता है।\n" +
                                "3. भरोसेमंद परिणाम: ATM या कैलकुलेटर एक सटीक एल्गोरिदम पर चलते हैं, इसलिए वे हर बार एक जैसा और सही परिणाम देते हैं। \n" +
                                "संक्षेप में, एल्गोरिदम हमारे तेज़ लेकिन 'नासमझ' कंप्यूटरों को निर्देश देकर उन्हें उपयोगी, कुशल और भरोसेमंद बनाते हैं।",
                        },
                        {
                            subtitle: "रोज़मर्रा की ज़िंदगी में मिनी-एल्गोरिदम",
                            text: "आप बिना सोचे-समझे ही दर्जनों का इस्तेमाल करते हैं!\n\n" +
                                "स्कूल के लिए तैयार होना:\n" +
                                "1. जागो।\n" +
                                "2. अपने दाँत ब्रश करो।\n" +
                                "3. कपड़े पहनो।\n" +
                                "4. नाश्ता करो।\n" +
                                "5. अपना बैग पैक करो।\n" +
                                "(लक्ष्य: समय पर स्कूल के लिए तैयार होना!)\n\n" +
                                "चाय बनाना:\n" +
                                "1. पानी उबालो।\n" +
                                "2. एक कप में टी बैग रखो।\n" +
                                "3. कप में गर्म पानी डालो।\n" +
                                "4. इसे 3 मिनट के लिए कप में रहने दो।\n" +
                                "5. टी बैग निकालो और इच्छानुसार चीनी या दूध मिलाओ।\n" +
                                "(लक्ष्य: एक बढ़िया कप चाय!)"
                        }
                    ],
                },
                2: {
                    title: "एल्गोरिथम के 3 सुनहरे नियम",
                    analogy: "इसे एक उत्तम खजाने के नक्शे की तरह सोचें। यदि यह अंतहीन, अस्पष्ट, या क्रम से बाहर है, तो आप कभी भी खजाना नहीं ढूंढ पाएंगे!",
                    details: [
                        {
                            subtitle: "1. सीमित होना चाहिए: इसका अंत होना ही चाहिए!",
                            text: "एक एल्गोरिथम हमेशा के लिए नहीं चल सकता। इसका एक स्पष्ट समापन बिंदु होना चाहिए। जैसे एक रेसिपी में एक अंतिम चरण होता है, वैसे ही एक एल्गोरिथम को उपयोगी होने के लिए समाप्त होना चाहिए। यह इसे एक अनंत लूप में फंसने से रोकता है।",
                            icon: <FaHourglassEnd />
                        },
                        {
                            subtitle: "2. अच्छी तरह से परिभाषित: कोई अनुमान नहीं!",
                            text: "प्रत्येक निर्देश बिल्कुल स्पष्ट होना चाहिए। 'थोड़ा नमक डालें' जैसे अस्पष्ट निर्देश एल्गोरिथम के लिए खराब हैं। यह सटीक होना चाहिए, जैसे '1/4 चम्मच नमक डालें'। कंप्यूटरों को सटीक आदेशों की आवश्यकता होती है।",
                            icon: <FaBullseye />
                        },
                        {
                            subtitle: "3. क्रमबद्ध होना चाहिए: अनुक्रम महत्वपूर्ण है!",
                            text: "निर्देशों का क्रम महत्वपूर्ण है। आपको अपने जूते **से पहले** अपने मोजे पहनने होंगे। एक एल्गोरिथम के चरणों को उलटने से गलत परिणाम या पूरी तरह से विफलता होगी।",
                            icon: <FaListOl />
                        }
                    ]
                },
                3: {
                    title: "रोजमर्रा की जिंदगी में एल्गोरिदम",
                    analogy: "आप एक एल्गोरिथम विशेषज्ञ हैं और आपको इसका पता भी नहीं है! कई दैनिक दिनचर्याएं छिपे हुए एल्गोरिदम हैं।",
                    details: [
                        {
                            subtitle: "सैंडविच बनाना: एक स्वादिष्ट एल्गोरिथम",
                            text: "1. **ब्रेड के दो स्लाइस लें।** (इनपुट)\n2. **एक स्लाइस पर मेयोनेज़ फैलाएं।**\n3. **लेट्यूस, टमाटर और पनीर डालें।**\n4. **दूसरा स्लाइस ऊपर रखें।**\n5. **सैंडविच को आधा काटें।** (प्रोसेसिंग)\n6. **एक प्लेट में परोसें।** (आउटपुट)\nयह सरल, क्रमबद्ध चरणों का सेट हर बार एक समान परिणाम की गारंटी देता है!",
                            icon: <FaUtensils />
                        },
                        {
                            subtitle: "जीपीएस निर्देशों का पालन करना: एक नेविगेशनल एल्गोरिथम",
                            text: "जब आप जीपीएस का उपयोग करते हैं, तो यह एक शक्तिशाली एल्गोरिथम चला रहा होता है:\n1. **प्रारंभिक बिंदु और गंतव्य को परिभाषित करें।** (इनपुट)\n2. **ट्रैफिक और दूरी को ध्यान में रखते हुए सभी संभावित मार्गों का विश्लेषण करें।** (प्रोसेसिंग)\n3. **बारी-बारी से निर्देश प्रदान करें।**\n4. **यदि आप एक मोड़ चूक जाते हैं तो पुनर्गणना करें।**\n5. **घोषणा करें कि आप पहुंच गए हैं।** (आउटपुट)\nयह स्पष्ट, क्रमबद्ध चरणों से हल की गई एक जटिल समस्या का एक आदर्श उदाहरण है।",
                            icon: <FaMapMarkedAlt />
                        }
                    ]
                },
                4: {
                    title: "कंप्यूटर एल्गोरिदम का उपयोग कैसे करते हैं",
                    analogy: "यदि कंप्यूटर एक सुपर-फास्ट शेफ है, तो एल्गोरिदम जानकारी को संभालने के लिए उसकी रेसिपी हैं।",
                    details: [
                        {
                            subtitle: "सॉर्टिंग: अराजकता से व्यवस्था बनाना",
                            text: "कंप्यूटर डेटा को एक विशिष्ट क्रम में व्यवस्थित करने के लिए सॉर्टिंग एल्गोरिदम का उपयोग करते हैं, जैसे A-Z या सबसे कम से उच्चतम तक। इसी तरह आपके संपर्क वर्णानुक्रम में होते हैं!\n\n**उदाहरण (बबल सॉर्ट):**\n`तब तक दोहराएं जब तक कोई स्वैप न हो:`\n  `सूची में प्रत्येक आइटम के लिए:`\n    `यदि आइटम > अगला आइटम:`\n      `उन्हें स्वैप करें`",
                            icon: <FaSort />
                        },
                        {
                            subtitle: "खोजना: भूसे के ढेर में सुई ढूंढना",
                            text: "खोज एल्गोरिदम कंप्यूटर को एक विशाल संग्रह में डेटा के विशिष्ट टुकड़ों को खोजने में मदद करते हैं। इसी तरह सर्च इंजन अरबों में से एक वेबपेज ढूंढते हैं।\n\n**उदाहरण (रैखिक खोज):**\n`सूची में प्रत्येक आइटम के लिए:`\n  `यदि आइटम वही है जो हम खोज रहे हैं:`\n    `आइटम लौटाएं`\n`'नहीं मिला' लौटाएं`",
                            icon: <FaSearch />
                        },
                        {
                            subtitle: "सिफारिशें: अनुमान लगाना कि आपको क्या पसंद आएगा",
                            text: "सिफारिश एल्गोरिदम भविष्य में आपको क्या पसंद आ सकता है, इसका अनुमान लगाने के लिए आपके पिछले व्यवहार का विश्लेषण करते हैं। इसी तरह स्ट्रीमिंग सेवाएं फिल्में सुझाती हैं या ऑनलाइन स्टोर आपको उत्पाद दिखाते हैं।\n\n**यह कैसे काम करता है:**\n`यदि आपको मूवी A और मूवी B पसंद आई:`\n  `और जिन अन्य लोगों को A और B पसंद आई, उन्हें C भी पसंद आई:`\n    `तो आपको मूवी C की सिफारिश करें।`",
                            icon: <FaThumbsUp />
                        }
                    ]
                },
                5: {
                    title: "यह पृष्ठ एक एल्गोरिथम है!",
                    analogy: "यह घटक स्वयं एक इंटरैक्टिव अनुभव बनाने के लिए मिलकर काम करने वाले एल्गोरिदम का एक बेहतरीन उदाहरण है।",
                    details: [
                        {
                            subtitle: "भाषा टॉगल: एक चयन एल्गोरिथम",
                            text: "जब आप 'EN' या 'हिं' बटन पर क्लिक करते हैं, तो आप एक एल्गोरिथम चला रहे होते हैं जो निम्नलिखित कार्य करता है:\n1. **एक क्लिक इवेंट का पता लगाता है।**\n2. **जांचता है कि कौन सा बटन क्लिक किया गया था।**\n3. **'lang' स्थिति को 'en' या 'hi' पर सेट करता है।**\n4. **नई भाषा सामग्री के साथ पूरे घटक को फिर से प्रस्तुत करता है।**\nयह सरल चयन तर्क प्रदर्शन को तुरंत बदलने की अनुमति देता है।",
                            icon: <FaLanguage />
                        },
                        {
                            subtitle: "स्टेज बटन: एक राज्य प्रबंधन एल्गोरिथम",
                            text: "एक स्टेज बटन (जैसे यह!) पर क्लिक करने से एक और एल्गोरिथम शुरू हो जाता है:\n1. **आपके द्वारा क्लिक किए गए स्टेज नंबर को प्राप्त करता है।**\n2. **'सक्रिय' स्थिति को उस नंबर पर अपडेट करता है।**\n3. **घटक फिर से प्रस्तुत होता है, जो आपको नए सक्रिय चरण के लिए सामग्री दिखाता है।**\n4. **बटन का रंग बदल जाता है क्योंकि इसकी शैली 'सक्रिय' स्थिति पर निर्भर करती है।**",
                            icon: <FaMousePointer />
                        },
                        {
                            subtitle: "तैरते बादल: एक एनीमेशन एल्गोरिथम",
                            text: "पृष्ठभूमि में एनिमेटेड बादल एक लूपिंग एनीमेशन एल्गोरिथम द्वारा नियंत्रित होते हैं। यह एक सहज, तैरता हुआ प्रभाव बनाने के लिए एक निर्धारित अवधि में उनकी स्थिति और अपारदर्शिता को लगातार अपडेट करता है। 'बादल: चालू/बंद' बटन पर क्लिक करने से इस एनीमेशन लूप को नियंत्रित करने वाली `play` स्थिति टॉगल हो जाती है।",
                            icon: <FaCloud />
                        }
                    ]
                },
            },
        },
    };

    const stageColors = {
        1: "from-sky-100 to-sky-300",
        2: "from-pink-100 to-pink-300",
        3: "from-green-100 to-green-300",
        4: "from-violet-100 to-violet-300",
        5: "from-yellow-100 to-yellow-300",
    };

    const currentStage = stages[lang].stages[active + 1];
    const t = (key) => currentStage?.[key] || stages.en.stages[active + 1]?.[key];

    useEffect(() => {
        if (active < 0) setActive(0);
        const totalStages = Object.keys(stages.en.stages).length;
        if (active >= totalStages) setActive(totalStages - 1);
    }, [active, stages.en.stages]);

    return (
        <div className="w-full min-h-screen flex flex-col items-center justify-center py-12 px-4 bg-gradient-to-br from-sky-50 via-violet-50 to-pink-50">
            <div className="relative max-w-5xl w-full mx-auto">
                <Header lang={lang} setLang={setLang} currentContent={stages[lang]?.home || stages.en.home} />

                <div className={`relative bg-gradient-to-br ${stageColors[active + 1]} rounded-3xl shadow-2xl overflow-hidden p-6 md:p-10`}>
                    
                    <div>
                        <h1 className="text-2xl md:text-4xl font-extrabold text-slate-800 drop-shadow-lg">{t("title")}</h1>
                        <p className="mt-2 text-sm md:text-base text-slate-700">{t("analogy")}</p>
                    </div>

                    <div className="flex flex-wrap justify-center gap-2 sm:gap-3 p-2 sm:p-3 my-6 bg-gray-100 rounded-xl">
                        {Object.keys(stages.en.stages).map((key, i) => (
                            <motion.button
                                key={i}
                                onClick={() => setActive(i)}
                                className={`px-3 sm:px-5 py-2 rounded-lg text-sm sm:text-md font-semibold transition-all duration-300 flex items-center gap-2 ${active === i
                                    ? "bg-sky-600 text-white shadow"
                                    : "bg-white text-gray-600 hover:bg-sky-100 hover:text-sky-700 border border-gray-200"
                                    }`}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                {stages[lang].stages[key].title}
                            </motion.button>
                        ))}
                    </div>

                    {currentStage?.custom ? (
                        <LEGOStage lang={lang} />
                    ) : (
                        <div className="mt-6 bg-white/80 rounded-xl p-4 md:p-6 text-slate-800 shadow space-y-4">
                            {currentStage?.details ? (
                                currentStage.details.map((item, index) =>
                                    item.highlight ? (
                                        <motion.div
                                            key={index}
                                            className="bg-sky-50 border-l-4 border-sky-500 p-4 my-6 rounded-r-lg shadow-inner"
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ duration: 0.5, ease: "easeOut" }}
                                        >
                                            <h3 className="font-bold text-lg text-sky-800">{item.subtitle} 💡</h3>
                                            <DefinitionList text={item.text} />
                                        </motion.div>
                                    ) : (
                                        <div key={index} className="flex items-start gap-4 my-4">
                                            {item.icon && <div className="text-3xl text-sky-600 mt-1">{item.icon}</div>}
                                            <div className="flex-1">
                                                <h3 className="font-semibold text-lg text-slate-800">{item.subtitle}</h3>
                                                <HighlightedText text={item.text} />
                                            </div>
                                        </div>
                                    )
                                )
                            ) : (
                                <p>{t("description")}</p>
                            )}
                        </div>
                    )}
                </div>

                <div className="flex flex-col md:flex-row justify-between items-center mt-4 p-4 sm:p-6 bg-gray-100 rounded-lg shadow-md gap-4 md:gap-0 max-w-7xl mx-auto">
                    <button
                        onClick={() => {
                            if (active === 0) {
                                navigate('/module2/data-structures');
                            } else {
                                setActive(active - 1);
                            }
                        }}
                        className="flex items-center gap-2 px-3 sm:px-4 py-2 bg-purple-200 hover:bg-purple-300 text-purple-900 rounded-lg shadow transition text-sm sm:text-base"
                    >
                        <FaArrowLeft />
                        {lang === 'en' ? 'Previous' : 'पिछला'}
                    </button>

                    <button
                        onClick={() => {
                            const totalStages = Object.keys(stages.en.stages).length;
                            if (active === totalStages - 1) {
                                navigate('/parts/prt2');
                            } else {
                                setActive(active + 1);
                            }
                        }}
                        className="flex items-center gap-2 px-3 sm:px-4 py-2 bg-green-200 hover:bg-green-300 text-green-900 rounded-lg shadow transition text-sm sm:text-base"
                    >
                        {lang === 'en' ? 'Next' : 'अगला'}
                        <FaArrowRight />
                    </button>
                </div>
            </div>
        </div>
    );
}

const HighlightedText = ({ text }) => {
    const parts = text.split(/(\*\*.*?\*\*)/g);
    return (
        <p style={{ whiteSpace: 'pre-line' }} className="mt-1 text-slate-700">
            {parts.map((part, i) =>
                part.startsWith('**') && part.endsWith('**') ?
                    <strong key={i} className="font-bold text-sky-600">{part.slice(2, -2)}</strong> :
                    part
            )}
        </p>
    );
};

const DefinitionList = ({ text }) => {
    const lines = text.split('\n').filter(line => line.trim() !== '');
    return (
        <div className="space-y-2">
            {lines.map((line, i) => {
                if (line.startsWith('* ')) {
                    const parts = line.substring(2).split(':');
                    const keyword = parts[0];
                    const description = parts.slice(1).join(':');
                    return (
                        <p key={i} className="text-sky-700">
                            <strong className="font-bold text-sky-800">{`* ${keyword}:`}</strong>
                            {description}
                        </p>
                    );
                }
                return <p key={i} className="text-sky-700">{line}</p>;
            })}
        </div>
    );
};

function Header({ lang, setLang, currentContent }) {
    return (
        <div className="flex items-center justify-between mb-6">
            <Link
                to="/parts/prt2"
                className="inline-flex items-center px-4 py-2 bg-white rounded-full shadow-md border border-gray-200 hover:bg-gray-100 transition"
            >
                <motion.div
                    className="mr-2"
                    animate={{ y: [0, -5, 0] }}
                    transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
                >
                    <FaHome className="text-lg text-sky-600" />
                </motion.div>
                {currentContent}
            </Link>

            <div className="flex space-x-2">
                <button
                    onClick={() => setLang("en")}
                    className={`px-3 py-1 rounded-lg border font-semibold ${lang === "en"
                        ? "bg-sky-600 text-white border-sky-600"
                        : "bg-white text-gray-700 border-gray-300"
                        } transition`}
                >
                    EN
                </button>
                <button
                    onClick={() => setLang("hi")}
                    className={`px-3 py-1 rounded-lg border font-semibold ${lang === "hi"
                        ? "bg-sky-600 text-white border-sky-600"
                        : "bg-white text-gray-700 border-gray-300"
                        } transition`}
                >
                    हिं
                </button>
            </div>
        </div>
    );
}

function LEGOStage({ lang }) {
    return (
        <div className="mt-6 bg-white/90 rounded-xl p-4 md:p-6 shadow space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col items-center justify-center space-y-2">
                    <svg className="w-32 h-32" viewBox="0 0 100 100">
                        <rect x="10" y="10" width="80" height="80" fill="#fbbf24" rx="5" />
                        <text x="50%" y="50%" dominantBaseline="middle" textAnchor="middle" fill="#1e3a8a" fontSize="10">Instruction Booklet</text>
                    </svg>
                    <p className="text-center text-sm font-semibold text-slate-800">
                        {lang === 'en' ? 'Algorithm: Step-by-step LEGO instructions' : 'एल्गोरिथ्म: क्रमबद्ध LEGO निर्देश'}
                    </p>
                </div>
                <div className="flex flex-col items-center justify-center space-y-2">
                    <svg className="w-48 h-32" viewBox="0 0 200 100">
                        <circle cx="30" cy="50" r="10" fill="#60a5fa" />
                        <circle cx="70" cy="50" r="10" fill="#60a5fa" />
                        <circle cx="110" cy="50" r="10" fill="#60a5fa" />
                        <circle cx="150" cy="50" r="10" fill="#60a5fa" />
                        <circle cx="190" cy="50" r="10" fill="#60a5fa" />
                    </svg>
                    <p className="text-center text-sm font-semibold text-slate-800">
                        {lang === 'en' ? 'SDLC: Full LEGO project cycle' : 'SDLC: पूरा LEGO प्रोजेक्ट चक्र'}
                    </p>
                </div>
            </div>
            <div className="text-center text-sm text-slate-700">
                {lang === 'en'
                    ? 'The Instruction Booklet (Algorithm) is part of the full SDLC LEGO Project!'
                    : 'निर्देश पुस्तिका (एल्गोरिथ्म) पूरे SDLC LEGO प्रोजेक्ट का हिस्सा है!'}
            </div>
        </div>
    );
}