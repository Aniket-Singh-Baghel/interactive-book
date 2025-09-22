import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FaDatabase, FaArrowRight, FaArrowLeft, FaHome, FaShapes, FaFileAlt, FaBolt, FaProjectDiagram, FaChartLine } from "react-icons/fa";
import { Link, useNavigate } from 'react-router-dom';

const content = {
  en: {
    home: "Home",
    title: "All About Databases 🗃️",
    subtitle: "Exploring how data is stored, managed, and used in the digital world.",
    what_is_db_title: "What is a Database?",
    what_is_db_desc: "A database is an organized collection of data, stored and accessed electronically. Think of it as a digital filing cabinet where all the important information is kept neatly.",
    analogy_title: "A Library Analogy",
    analogy_desc: "A library is a great real-world example of a database. The library has a huge collection of books (the data). The books are organized by genre, author, etc. (the structure). You can search for a book using the library's catalog (the query). The librarian who helps you find the book is like the Database Management System (DBMS).",
    why_db_title: "Why are Databases Important?",
    why_db_p1: "Databases are the backbone of almost every application you use. They store your profile information on social media, the products you see on online stores, and even the contacts on your phone.",
    why_db_p2: "Without databases, the internet as we know it would not exist. They allow us to store, retrieve, and manage vast amounts of data quickly, efficiently, and securely.",
    comparison_title: "Databases vs. Spreadsheets",
    comparison_desc: "While a spreadsheet (like Excel) can store data, it's not a true database. Here's a quick comparison:",
    comparison_table: [
      { feature: "Data Size", spreadsheet: "Good for small amounts of data", database: "Can handle huge amounts of data" },
      { feature: "Multiple Users", spreadsheet: "Difficult for multiple people to edit at once", database: "Designed for many users to access and edit simultaneously" },
      { feature: "Data Integrity", spreadsheet: "Easy to make mistakes and enter incorrect data", database: "Has rules to ensure data is consistent and accurate" },
      { feature: "Speed", spreadsheet: "Slows down with a lot of data", database: "Optimized for fast data retrieval" }
    ],
    dbms_title: "What is a DBMS?",
    dbms_desc: "A Database Management System (DBMS) is the software that acts as an interface between the user and the database. It allows users to create, read, update, and delete data in a database.",
    dbms_analogy_title: "Analogy: A Librarian",
    dbms_analogy_desc: "Think of a DBMS as a helpful librarian in a massive library. You don't just wander around looking for a book. You go to the librarian (the DBMS), ask for a specific book (your query), and the librarian finds it for you, ensuring it's the right one and in good condition.",
    interactive_showcase_instruction: "Click on a database name to know more about it.",
    db_types_title: "Types of Databases",
    db_types: [
        { 
            name: "Relational (RDBMS)", 
            analogy: "A giant Lego set where each block (table) connects to other blocks in a precise way.", 
            examples: "MySQL, PostgreSQL, Oracle", 
            use: "Storing structured data like users, products, orders.", 
            icon: FaShapes,
            characteristics: "Data is stored in tables with rows and columns. Enforces a strict schema. Uses SQL (Structured Query Language).",
            when_to_use: "When data integrity and consistency are critical, like in financial transactions or e-commerce orders.",
            when_to_avoid: "When dealing with large volumes of unstructured data or when you need high scalability and flexibility.",
            popular_dbms: "MySQL, PostgreSQL, Microsoft SQL Server, Oracle Database."
        },
        { 
            name: "NoSQL", 
            analogy: "A magical filing cabinet that can reshape itself — folders can have different sizes and types of files.", 
            examples: "MongoDB, Firebase, Cassandra", 
            use: "Flexible, unstructured data like messages, social media posts, IoT data.", 
            icon: FaFileAlt,
            characteristics: "Schema-less, allowing for flexible data models (key-value, document, column-family, graph). Horizontally scalable.",
            when_to_use: "For big data applications, real-time web apps, and when you need to store varied data types.",
            when_to_avoid: "When you require complex queries and transactions with strict consistency.",
            popular_dbms: "MongoDB, Cassandra, Couchbase, Amazon DynamoDB."
        },
        { 
            name: "In-Memory", 
            analogy: "Super-fast sticky notes that keep data ready to grab instantly.", 
            examples: "Redis, Memcached", 
            use: "Caching data to make apps faster.", 
            icon: FaBolt,
            characteristics: "Stores data in RAM instead of on a disk, providing extremely fast read/write operations.",
            when_to_use: "For caching, real-time analytics, session management, and gaming leaderboards.",
            when_to_avoid: "For permanent, large-scale data storage, as it can be expensive and data is lost on power failure.",
            popular_dbms: "Redis, Memcached, Hazelcast."
        },
        { 
            name: "Graph", 
            analogy: "A map of cities and roads — shows connections clearly.", 
            examples: "Neo4j, Amazon Neptune", 
            use: "Social networks, recommendation systems.", 
            icon: FaProjectDiagram,
            characteristics: "Stores data as nodes (entities) and edges (relationships). Optimized for querying relationships.",
            when_to_use: "For social networks, fraud detection, and recommendation engines where connections are key.",
            when_to_avoid: "When data is not highly interconnected or when you need to perform complex analytical queries on the entire dataset.",
            popular_dbms: "Neo4j, ArangoDB, Amazon Neptune."
        },
        { 
            name: "Time-Series", 
            analogy: "A diary that records events over time in perfect order.", 
            examples: "InfluxDB, TimescaleDB", 
            use: "Monitoring, analytics, IoT sensors.", 
            icon: FaChartLine,
            characteristics: "Optimized for time-stamped or time-series data. High write and query performance for time-based data.",
            when_to_use: "For monitoring systems, IoT sensor data, and financial trading data.",
            when_to_avoid: "When data does not have a time-series nature.",
            popular_dbms: "InfluxDB, TimescaleDB, Prometheus."
        }
    ],
    db_comparison_title: "Database Type Comparison",
    db_comparison_table: {
        headers: ["Type", "Best For", "Data Structure", "Flexibility", "Example"],
        rows: [
            ["Relational", "Structured data, transactions", "Tables with rows and columns", "Low", "MySQL"],
            ["NoSQL", "Unstructured data, scalability", "Key-value, document, column-family", "High", "MongoDB"],
            ["In-Memory", "Caching, real-time apps", "Key-value, in-memory", "High", "Redis"],
            ["Graph", "Relationships, networks", "Nodes and edges", "Medium", "Neo4j"],
            ["Time-Series", "Time-stamped data, IoT", "Time-indexed series", "Medium", "InfluxDB"]
        ]
    },
    how_companies_handle_db_title: "How Companies Handle Databases",
    how_companies_handle_db_points: [
        { title: "Multiple Database Strategy", desc: "Big companies often use different types of databases for different purposes: Relational for transactions, NoSQL for social media data, In-memory for real-time features." },
        { title: "Backups and Redundancy", desc: "Data is backed up daily, sometimes hourly. Extra copies are stored in multiple locations — like magical twins of your filing cabinet." },
        { title: "Scaling", desc: "Vertical Scaling: Making one database server stronger (like adding more drawers). Horizontal Scaling: Adding more servers/folders to handle more data and users." },
        { title: "Security and Access Control", desc: "Companies use roles and permissions so only the right people can see/edit certain folders." },
        { title: "Monitoring and Maintenance", desc: "Automatic alerts if something goes wrong. Regular cleanup and indexing to keep searches fast." }
    ],
    kid_friendly_title: "Kid-Friendly Example: A Magical School Library",
    kid_friendly_points: [
        "<strong>Relational databases</strong> are the neatly labeled shelves.",
        "<strong>NoSQL</strong> is the creative reading corner where kids can put books anywhere.",
        "<strong>In-memory</strong> is a teacher keeping sticky notes with urgent info.",
        "<strong>Graph database</strong> is a map showing who is friends with whom.",
        "<strong>Time-series</strong> is the daily diary logging everything the students do."
    ],
    interactive_showcase_title: "Interactive Database Showcase",
    previous: "Previous",
    next: "Next",
  },
  hi: {
    home: "होम",
    title: "डेटाबेस के बारे में सब कुछ 🗃️",
    subtitle: "डिजिटल दुनिया में डेटा कैसे संग्रहीत, प्रबंधित और उपयोग किया जाता है, इसका अन्वेषण करें।",
    what_is_db_title: "डेटाबेस क्या है?",
    what_is_db_desc: "डेटाबेस डेटा का एक संगठित संग्रह है, जिसे इलेक्ट्रॉनिक रूप से संग्रहीत और एक्सेस किया जाता है। इसे एक डिजिटल फाइलिंग कैबिनेट के रूप में सोचें जहां सभी महत्वपूर्ण जानकारी बड़े करीने से रखी जाती है।",
    analogy_title: "एक पुस्तकालय का उदाहरण",
    analogy_desc: "एक पुस्तकालय डेटाबेस का एक बेहतरीन वास्तविक दुनिया का उदाहरण है। पुस्तकालय में पुस्तकों का एक विशाल संग्रह है (डेटा)। पुस्तकें शैली, लेखक, आदि (संरचना) द्वारा व्यवस्थित की जाती हैं। आप पुस्तकालय की सूची (क्वेरी) का उपयोग करके एक पुस्तक खोज सकते हैं। लाइब्रेरियन जो आपको पुस्तक खोजने में मदद करता है, वह डेटाबेस मैनेजमेंट सिस्टम (DBMS) की तरह है।",
    why_db_title: "डेटाबेस क्यों महत्वपूर्ण हैं?",
    why_db_p1: "डेटाबेस आपके द्वारा उपयोग किए जाने वाले लगभग हर एप्लिकेशन की रीढ़ हैं। वे सोशल मीडिया पर आपकी प्रोफ़ाइल जानकारी, ऑनलाइन स्टोर पर आपके द्वारा देखे जाने वाले उत्पादों और यहां तक कि आपके फोन पर संपर्कों को भी संग्रहीत करते हैं।",
    why_db_p2: "डेटाबेस के बिना, जैसा कि हम जानते हैं, इंटरनेट का अस्तित्व नहीं होता। वे हमें बड़ी मात्रा में डेटा को जल्दी, कुशलतापूर्वक और सुरक्षित रूप से संग्रहीत करने, पुनर्प्राप्त करने और प्रबंधित करने की अनुमति देते हैं।",
    comparison_title: "डेटाबेस बनाम स्प्रेडशीट",
    comparison_desc: "हालांकि एक स्प्रेडशीट (जैसे एक्सेल) डेटा स्टोर कर सकती है, यह एक सच्चा डेटाबेस नहीं है। यहां एक त्वरित तुलना है:",
    comparison_table: [
      { feature: "डेटा का आकार", spreadsheet: "कम मात्रा में डेटा के लिए अच्छा है", database: "भारी मात्रा में डेटा को संभाल सकता है" },
      { feature: "कई उपयोगकर्ता", spreadsheet: "एक साथ कई लोगों के लिए संपादित करना मुश्किल है", database: "कई उपयोगकर्ताओं को एक साथ एक्सेस और संपादित करने के लिए डिज़ाइन किया गया है" },
      { feature: "डेटा की विश्वसनीयता", spreadsheet: "गलतियाँ करना और गलत डेटा दर्ज करना आसान है", database: "यह सुनिश्चित करने के लिए नियम हैं कि डेटा सुसंगत और सटीक है" },
      { feature: "गति", spreadsheet: "बहुत सारे डेटा के साथ धीमा हो जाता है", database: "तेजी से डेटा पुनर्प्राप्ति के लिए अनुकूलित" }
    ],
    dbms_title: "DBMS क्या है?",
    dbms_desc: "एक डेटाबेस मैनेजमेंट सिस्टम (DBMS) वह सॉफ्टवेयर है जो उपयोगकर्ता और डेटाबेस के बीच एक इंटरफेस के रूप में कार्य करता है। यह उपयोगकर्ताओं को डेटाबेस में डेटा बनाने, पढ़ने, अपडेट करने और हटाने की अनुमति देता है।",
    dbms_analogy_title: "सादृश्य: एक लाइब्रेरियन",
    dbms_analogy_desc: "एक DBMS को एक विशाल पुस्तकालय में एक सहायक लाइब्रेरियन के रूप में सोचें। आप सिर्फ एक किताब की तलाश में इधर-उधर नहीं भटकते। आप लाइब्रेरियन (DBMS) के पास जाते हैं, एक विशिष्ट पुस्तक (आपकी क्वेरी) मांगते हैं, और लाइब्रेरियन इसे आपके लिए ढूंढता है, यह सुनिश्चित करते हुए कि यह सही है और अच्छी स्थिति में है।",
    interactive_showcase_instruction: "इसके बारे में अधिक जानने के लिए डेटाबेस नाम पर क्लिक करें।",
    db_types_title: "डेटाबेस के प्रकार",
    db_types: [
        {
            name: "रिलेशनल (RDBMS)",
            analogy: "एक विशाल लेगो सेट जहां प्रत्येक ब्लॉक (तालिका) अन्य ब्लॉकों से एक सटीक तरीके से जुड़ता है।",
            examples: "MySQL, PostgreSQL, Oracle",
            use: "उपयोगकर्ताओं, उत्पादों, आदेशों जैसे संरचित डेटा को संग्रहीत करना।",
            icon: FaShapes,
            characteristics: "डेटा तालिकाओं में पंक्तियों और स्तंभों में संग्रहीत होता है। एक सख्त स्कीमा लागू करता है। SQL (स्ट्रक्चर्ड क्वेरी लैंग्वेज) का उपयोग करता है।",
            when_to_use: "जब डेटा अखंडता और स्थिरता महत्वपूर्ण हो, जैसे वित्तीय लेनदेन या ई-कॉमर्स ऑर्डर में।",
            when_to_avoid: "बड़ी मात्रा में असंरचित डेटा से निपटने या जब आपको उच्च मापनीयता और लचीलेपन की आवश्यकता होती है।",
            popular_dbms: "MySQL, PostgreSQL, Microsoft SQL Server, Oracle Database."
        },
        {
            name: "नो-एसक्यूएल (NoSQL)",
            analogy: "एक जादुई फाइलिंग कैबिनेट जो खुद को फिर से आकार दे सकती है - फ़ोल्डरों में विभिन्न आकार और प्रकार की फाइलें हो सकती हैं।",
            examples: "MongoDB, Firebase, Cassandra",
            use: "संदेश, सोशल मीडिया पोस्ट, IoT डेटा जैसे लचीले, असंरचित डेटा।",
            icon: FaFileAlt,
            characteristics: "स्कीमा-रहित, लचीले डेटा मॉडल (की-वैल्यू, दस्तावेज़, कॉलम-फ़ैमिली, ग्राफ़) की अनुमति देता है। क्षैतिज रूप से मापनीय।",
            when_to_use: "बड़े डेटा अनुप्रयोगों, रीयल-टाइम वेब ऐप्स के लिए, और जब आपको विभिन्न डेटा प्रकारों को संग्रहीत करने की आवश्यकता होती है।",
            when_to_avoid: "जब आपको सख्त स्थिरता के साथ जटिल प्रश्नों और लेनदेन की आवश्यकता होती है।",
            popular_dbms: "MongoDB, Cassandra, Couchbase, Amazon DynamoDB."
        },
        {
            name: "इन-मेमोरी",
            analogy: "सुपर-फास्ट स्टिकी नोट्स जो डेटा को तुरंत पकड़ने के लिए तैयार रखते हैं।",
            examples: "Redis, Memcached",
            use: "ऐप्स को तेज बनाने के लिए डेटा कैश करना।",
            icon: FaBolt,
            characteristics: "डिस्क के बजाय रैम में डेटा संग्रहीत करता है, जिससे अत्यंत तेज़ पढ़ने/लिखने की कार्रवाई होती है।",
            when_to_use: "कैशिंग, रीयल-टाइम एनालिटिक्स, सत्र प्रबंधन और गेमिंग लीडरबोर्ड के लिए।",
            when_to_avoid: "स्थायी, बड़े पैमाने पर डेटा भंडारण के लिए, क्योंकि यह महंगा हो सकता है और बिजली की विफलता पर डेटा खो जाता है।",
            popular_dbms: "Redis, Memcached, Hazelcast."
        },
        {
            name: "ग्राफ",
            analogy: "शहरों और सड़कों का नक्शा - कनेक्शन स्पष्ट रूप से दिखाता है।",
            examples: "Neo4j, Amazon Neptune",
            use: "सोशल नेटवर्क, सिफारिश प्रणाली।",
            icon: FaProjectDiagram,
            characteristics: "डेटा को नोड्स (इकाइयों) और किनारों (संबंधों) के रूप में संग्रहीत करता है। संबंधों की पूछताछ के लिए अनुकूलित।",
            when_to_use: "सोशल नेटवर्क, धोखाधड़ी का पता लगाने और सिफारिश इंजनों के लिए जहां कनेक्शन महत्वपूर्ण हैं।",
            when_to_avoid: "जब डेटा अत्यधिक परस्पर जुड़ा नहीं होता है या जब आपको पूरे डेटासेट पर जटिल विश्लेषणात्मक प्रश्न करने की आवश्यकता होती है।",
            popular_dbms: "Neo4j, ArangoDB, Amazon Neptune."
        },
        {
            name: "टाइम-सीरीज़",
            analogy: "एक डायरी जो समय के साथ घटनाओं को सही क्रम में रिकॉर्ड करती है।",
            examples: "InfluxDB, TimescaleDB",
            use: "निगरानी, ​​विश्लेषिकी, IoT सेंसर।",
            icon: FaChartLine,
            characteristics: "समय-मुद्रांकित या समय-श्रृंखला डेटा के लिए अनुकूलित। समय-आधारित डेटा के लिए उच्च लिखने और क्वेरी प्रदर्शन।",
            when_to_use: "सिस्टम, IoT सेंसर डेटा और वित्तीय ट्रेडिंग डेटा की निगरानी के लिए।",
            when_to_avoid: "जब डेटा में समय-श्रृंखला प्रकृति नहीं होती है।",
            popular_dbms: "InfluxDB, TimescaleDB, Prometheus."
        }
    ],
    db_comparison_title: "डेटाबेस प्रकार की तुलना",
    db_comparison_table: {
        headers: ["प्रकार", "के लिए सर्वश्रेष्ठ", "डेटा संरचना", "लचीलापन", "उदाहरण"],
        rows: [
            ["रिलेशनल", "संरचित डेटा, लेनदेन", "पंक्तियों और स्तंभों के साथ तालिकाएँ", "कम", "MySQL"],
            ["नो-एसक्यूएल", "असंरचित डेटा, मापनीयता", "कुंजी-मूल्य, दस्तावेज़, स्तंभ-परिवार", "उच्च", "MongoDB"],
            ["इन-मेमोरी", "कैशिंग, रीयल-टाइम ऐप्स", "कुंजी-मूल्य, इन-मेमोरी", "उच्च", "Redis"],
            ["ग्राफ", "रिश्ते, नेटवर्क", "नोड्स और किनारे", "मध्यम", "Neo4j"],
            ["टाइम-सीरीज़", "समय-मुद्रांकित डेटा, IoT", "समय-अनुक्रमित श्रृंखला", "मध्यम", "InfluxDB"]
        ]
    },
    how_companies_handle_db_title: "कंपनियां डेटाबेस को कैसे संभालती हैं",
    how_companies_handle_db_points: [
        { title: "एकाधिक डेटाबेस रणनीति", desc: "बड़ी कंपनियाँ अक्सर विभिन्न उद्देश्यों के लिए विभिन्न प्रकार के डेटाबेस का उपयोग करती हैं: लेनदेन के लिए रिलेशनल, सोशल मीडिया डेटा के लिए नो-एसक्यूएल, रीयल-टाइम सुविधाओं के लिए इन-मेमोरी।" },
        { title: "बैकअप और अतिरेक", desc: "डेटा का दैनिक, कभी-कभी प्रति घंटा बैकअप लिया जाता है। अतिरिक्त प्रतियां कई स्थानों पर संग्रहीत की जाती हैं - जैसे आपकी फाइलिंग कैबिनेट के जादुई जुड़वां।" },
        { title: "स्केलिंग", desc: "वर्टिकल स्केलिंग: एक डेटाबेस सर्वर को मजबूत बनाना (जैसे अधिक दराज जोड़ना)। हॉरिजॉन्टल स्केलिंग: अधिक डेटा और उपयोगकर्ताओं को संभालने के लिए अधिक सर्वर/फ़ोल्डर जोड़ना।" },
        { title: "सुरक्षा और पहुँच नियंत्रण", desc: "कंपनियाँ भूमिकाओं और अनुमतियों का उपयोग करती हैं ताकि केवल सही लोग ही कुछ फ़ोल्डरों को देख/संपादित कर सकें।" },
        { title: "निगरानी और रखरखाव", desc: "कुछ गलत होने पर स्वचालित अलर्ट। खोजों को तेज रखने के लिए नियमित सफाई और अनुक्रमण।" }
    ],
    kid_friendly_title: "बच्चों के अनुकूल उदाहरण: एक जादुई स्कूल पुस्तकालय",
    kid_friendly_points: [
        "<strong>रिलेशनल डेटाबेस</strong> बड़े करीने से लेबल की गई अलमारियां हैं।",
        "<strong>नो-एसक्यूएल</strong> रचनात्मक वाचन कोना है जहां बच्चे कहीं भी किताबें रख सकते हैं।",
        "<strong>इन-मेमोरी</strong> एक शिक्षक है जो तत्काल जानकारी के साथ स्टिकी नोट्स रखता है।",
        "<strong>ग्राफ डेटाबेस</strong> एक नक्शा है जो दिखाता है कि कौन किसके साथ दोस्त है।",
        "<strong>टाइम-सीरीज़</strong> दैनिक डायरी है जो छात्रों द्वारा की जाने वाली हर चीज को लॉग करती है।"
    ],
    interactive_showcase_title: "इंटरैक्टिव डेटाबेस शोकेस",
    previous: "पिछला",
    next: "अगला",
  }
};

const Databases = () => {
  const [lang, setLang] = useState('en');
  const navigate = useNavigate();
  const t = content[lang];
  const [selectedDb, setSelectedDb] = useState(t.db_types[0]);
  const [openDb, setOpenDb] = useState(null);

  const handleDbClick = (db) => {
    if (window.innerWidth < 768) {
      setOpenDb(openDb === db.name ? null : db.name);
    }
    setSelectedDb(db);
  };

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.ctrlKey && event.key === 'k') {
        event.preventDefault();
        setLang(prevLang => prevLang === 'en' ? 'hi' : 'en');
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return (
    <div className="p-4 sm:p-6 lg:p-8 min-h-screen bg-gray-50 font-sans">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <Link to="/parts/prt2" className="inline-flex items-center px-4 py-2 bg-white rounded-full shadow-md border border-gray-200 hover:bg-gray-100 transition">
            <FaHome className="mr-2 text-lg text-sky-600" />
            {t.home}
          </Link>
          <div className="flex space-x-2">
            <button onClick={() => setLang("en")} className={`px-3 py-1 rounded-lg border font-semibold ${lang === "en" ? "bg-sky-600 text-white border-sky-600" : "bg-white text-gray-700 border-gray-300"} transition`}>EN</button>
            <button onClick={() => setLang("hi")} className={`px-3 py-1 rounded-lg border font-semibold ${lang === "hi" ? "bg-sky-600 text-white border-sky-600" : "bg-white text-gray-700 border-gray-300"} transition`}>हिं</button>
          </div>
        </div>
        <div className="p-4 sm:p-6 max-w-4xl mx-auto bg-white rounded-2xl shadow-xl">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-2xl sm:text-3xl lg:text-4xl font-bold text-center text-gray-800 mb-2"
          >
            {t.title}
          </motion.h1>
          <p className="text-center text-gray-600 mb-6 text-sm sm:text-base">
            {t.subtitle}
          </p>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="flex justify-center mb-6"
          >
            <FaDatabase className="text-8xl text-blue-500" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-gray-50 p-6 rounded-lg shadow-inner mb-6"
          >
            <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-3 text-center">
              {t.what_is_db_title}
            </h2>
            <p className="text-gray-700 text-center mb-6" dangerouslySetInnerHTML={{ __html: t.what_is_db_desc }} />

            <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-3 text-center">
              {t.analogy_title}
            </h3>
            <p className="text-gray-700 text-center mb-6" dangerouslySetInnerHTML={{ __html: t.analogy_desc }} />

          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.35 }}
            className="bg-indigo-50 p-6 rounded-lg shadow-sm border-l-4 border-indigo-400 mb-6"
          >
            <h2 className="text-xl sm:text-2xl font-bold mb-3 text-center text-indigo-800">{t.dbms_title}</h2>
            <p className="text-gray-700 text-center">{t.dbms_desc}</p>
            <div className="mt-4 bg-white p-4 rounded-lg shadow-inner">
              <h4 className="font-bold text-indigo-700">{t.dbms_analogy_title}</h4>
              <p className="text-gray-600">{t.dbms_analogy_desc}</p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="bg-blue-50 p-6 rounded-lg shadow-sm border-l-4 border-blue-400 mb-6"
          >
            <h2 className="text-xl sm:text-2xl font-bold mb-3 text-center text-blue-800">{t.why_db_title}</h2>
            <p className="text-gray-700" dangerouslySetInnerHTML={{ __html: t.why_db_p1 }} />
            <p className="mt-4 text-gray-700">{t.why_db_p2}</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="bg-green-50 p-6 rounded-lg shadow-sm border-l-4 border-green-400"
          >
            <h2 className="text-xl sm:text-2xl font-bold mb-3 text-center text-green-800">{t.comparison_title}</h2>
            <p className="text-gray-700 text-center mb-6" dangerouslySetInnerHTML={{ __html: t.comparison_desc }} />
            <div className="space-y-4 md:space-y-0">
                <div className="hidden md:grid md:grid-cols-3 gap-4 text-xs text-gray-700 uppercase bg-gray-200 p-4 rounded-t-lg">
                    <div className="font-bold">Feature</div>
                    <div className="font-bold">Spreadsheet</div>
                    <div className="font-bold">Database</div>
                </div>
                {t.comparison_table.map((row, index) => (
                    <div key={index} className="grid grid-cols-1 md:grid-cols-3 gap-y-2 md:gap-4 p-4 border md:border-t-0 md:border-l md:border-r md:border-b rounded-lg md:rounded-none bg-white">
                        <div className="font-bold text-gray-900"><span className="md:hidden font-semibold text-gray-500">Feature: </span>{row.feature}</div>
                        <div><span className="md:hidden font-semibold text-gray-500">Spreadsheet: </span>{row.spreadsheet}</div>
                        <div><span className="md:hidden font-semibold text-gray-500">Database: </span>{row.database}</div>
                    </div>
                ))}
            </div>
          </motion.div>

          {/* Interactive Showcase */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }} className="mt-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-center text-gray-800 mb-6">{t.interactive_showcase_title}</h2>
            <p className="text-center text-gray-600 mb-4 md:hidden">{t.interactive_showcase_instruction}</p>
            <div className="flex flex-col md:flex-row gap-8">
              <div className="md:w-1/3 flex flex-col gap-4">
                {t.db_types.map(db => (
                  <div key={db.name}>
                    <motion.button
                      onClick={() => handleDbClick(db)}
                      className={`p-4 rounded-lg text-left w-full border-2 ${selectedDb.name === db.name ? 'border-sky-500 bg-sky-50' : 'border-gray-200 bg-white'}`}
                      whileHover={{ scale: 1.02 }}
                    >
                      <div className="flex items-center gap-4">
                        <db.icon className={`text-3xl ${selectedDb.name === db.name ? 'text-sky-600' : 'text-gray-500'}`} />
                        <span className="font-bold text-lg text-gray-800">{db.name}</span>
                      </div>
                    </motion.button>
                    <div className="md:hidden">
                      {openDb === db.name && (
                        <motion.div
                          initial={{ opacity: 0, height: 0, marginTop: 0 }}
                          animate={{ opacity: 1, height: 'auto', marginTop: '1rem' }}
                          exit={{ opacity: 0, height: 0, marginTop: 0 }}
                          className="bg-white p-4 rounded-b-lg shadow-inner"
                        >
                          <p className="text-md text-gray-600 italic mb-3">"{db.analogy}"</p>
                          <div className="space-y-3 text-sm text-gray-700">
                            <div><strong className="font-semibold text-gray-800">Characteristics:</strong><p>{db.characteristics}</p></div>
                            <div><strong className="font-semibold text-gray-800">When to use:</strong><p>{db.when_to_use}</p></div>
                            <div><strong className="font-semibold text-gray-800">When to avoid:</strong><p>{db.when_to_avoid}</p></div>
                            <div><strong className="font-semibold text-gray-800">Popular DBMS:</strong><p>{db.popular_dbms}</p></div>
                          </div>
                        </motion.div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
              <div className="hidden md:block md:w-2/3">
                <motion.div
                  key={selectedDb.name}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="bg-white p-6 rounded-lg shadow-lg"
                >
                  <h3 className="text-2xl font-bold text-sky-700 mb-3">{selectedDb.name}</h3>
                  <p className="text-lg text-gray-600 italic mb-4">"{selectedDb.analogy}"</p>
                  <div className="space-y-4 text-gray-700">
                    <div>
                      <strong className="font-semibold text-gray-800">Key Characteristics:</strong>
                      <p>{selectedDb.characteristics}</p>
                    </div>
                    <div>
                      <strong className="font-semibold text-gray-800">When to use it:</strong>
                      <p>{selectedDb.when_to_use}</p>
                    </div>
                    <div>
                      <strong className="font-semibold text-gray-800">When to avoid it:</strong>
                      <p>{selectedDb.when_to_avoid}</p>
                    </div>
                     <div>
                      <strong className="font-semibold text-gray-800">Popular DBMS:</strong>
                      <p>{selectedDb.popular_dbms}</p>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>

          {/* New Comparison Table */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.7 }} className="mt-8 bg-purple-50 p-6 rounded-lg shadow-sm border-l-4 border-purple-400">
            <h2 className="text-xl sm:text-2xl font-bold mb-3 text-center text-purple-800">{t.db_comparison_title}</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left text-gray-500">
                <thead className="text-xs text-gray-700 uppercase bg-gray-200">
                  <tr>
                    {t.db_comparison_table.headers.map(header => <th key={header} scope="col" className="px-6 py-3">{header}</th>)}
                  </tr>
                </thead>
                <tbody>
                  {t.db_comparison_table.rows.map((row, index) => (
                    <tr key={index} className="bg-white border-b">
                      {row.map((cell, cellIndex) => <td key={cellIndex} className="px-6 py-4">{cell}</td>)}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>

          {/* How Companies Handle Databases */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }} className="mt-8 bg-yellow-50 p-6 rounded-lg shadow-sm border-l-4 border-yellow-400">
            <h2 className="text-xl sm:text-2xl font-bold mb-3 text-center text-yellow-800">{t.how_companies_handle_db_title}</h2>
            <ul className="space-y-4">
              {t.how_companies_handle_db_points.map(point => (
                <li key={point.title}>
                  <strong className="font-semibold text-gray-800">{point.title}:</strong> {point.desc}
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Kid-Friendly Example */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.9 }} className="mt-8 bg-pink-50 p-6 rounded-lg shadow-sm border-l-4 border-pink-400">
            <h2 className="text-xl sm:text-2xl font-bold mb-3 text-center text-pink-800">{t.kid_friendly_title}</h2>
            <ul className="space-y-2 list-disc list-inside">
              {t.kid_friendly_points.map((point, index) => (
                <li key={index} dangerouslySetInnerHTML={{ __html: point }} />
              ))}
            </ul>
          </motion.div>

        </div>

        <div className="w-full flex justify-between items-center mt-10 p-4 bg-gray-100 rounded-lg shadow-md">
          <button
            onClick={() => navigate('/module3/backend')}
            className="flex items-center gap-2 px-4 py-2 bg-purple-200 hover:bg-purple-300 text-purple-900 rounded-lg shadow transition"
          >
            <FaArrowLeft />
            {t.previous}
          </button>
          <button
            onClick={() => navigate('/parts/prt2')}
            className="flex items-center gap-2 px-4 py-2 bg-green-200 hover:bg-green-300 text-green-900 rounded-lg shadow transition"
          >
            {t.next}
            <FaArrowRight />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Databases;
