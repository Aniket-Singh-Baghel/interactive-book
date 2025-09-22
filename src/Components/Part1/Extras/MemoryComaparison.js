import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate, Link } from "react-router-dom";
import { FaHome, FaArrowLeft, FaArrowRight } from 'react-icons/fa'

// Inline SVG for the icon for Primary Storage
const PrimaryIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-yellow-500">
        <path d="M11.625 1.5c-4.475 1.933-7.25 6.096-7.25 10.5 0 3.016 1.137 5.75 3.047 7.766-.546-.38-1.127-.674-1.726-.872a3.818 3.818 0 0 0 .83-2.008c.557-2.029.98-4.032.98-4.032.062-.303-.048-.601-.303-.793a3.87 3.87 0 0 0-2.396-1.124l-.16-.013c-.303 0-.58.174-.716.45-.136.277-.123.618.033.882l.432.748c1.32.766 2.484 1.83 3.39 3.065a12.89 12.89 0 0 0 2.536-4.502c.866-2.583 1.13-5.187.733-7.587L11.625 1.5Z" />
        <path d="M12.375 1.5c4.475 1.933 7.25 6.096 7.25 10.5 0 3.016-1.137 5.75-3.047 7.766.546-.38 1.127-.674 1.726-.872a3.818 3.818 0 0 0-.83-2.008c-.557-2.029-.98-4.032-.98-4.032-.062-.303.048-.601.303-.793a3.87 3.87 0 0 0 2.396-1.124l.16-.013c.303 0 .58.174.716.45.136.277.123.618-.033.882l-.432.748c-1.32.766-2.484 1.83-3.39 3.065a12.89 12.89 0 0 0-2.536-4.502c-.866-2.583-1.13-5.187-.733-7.587Z" />
    </svg>
);

// Inline SVG for the icon for Secondary Storage
const SecondaryIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-blue-500">
        <path fillRule="evenodd" d="M19.5 2.25a.75.75 0 0 0-.75.75v14.25a.75.75 0 0 0 1.5 0V3a.75.75 0 0 0-.75-.75Zm-15 0a.75.75 0 0 0-.75.75v14.25a.75.75 0 0 0 1.5 0V3a.75.75 0 0 0-.75-.75Zm7.5 0a.75.75 0 0 0-.75.75v17.25a.75.75 0 0 0 1.5 0V3a.75.75 0 0 0-.75-.75Z" clipRule="evenodd" />
    </svg>
);

// Inline SVG for the icon for Tertiary Storage
const TertiaryIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-green-500">
        <path d="M12.75 12.75a.75.75 0 0 1-.75.75H7.5a.75.75 0 0 1 0-1.5h4.5a.75.75 0 0 1 .75.75ZM7.5 7.5a.75.75 0 0 0 0 1.5h9a.75.75 0 0 0 0-1.5h-9Z" />
        <path fillRule="evenodd" d="M2.25 3a.75.75 0 0 0 0 1.5h19.5a.75.75 0 0 0 0-1.5H2.25ZM3 6a.75.75 0 0 1 .75-.75h16.5a.75.75 0 0 1 .75.75v13.5A.75.75 0 0 1 20.25 21H3.75A.75.75 0 0 1 3 20.25V6Zm3.75 3a.75.75 0 0 0 0 1.5h9a.75.75 0 0 0 0-1.5h-9Z" clipRule="evenodd" />
    </svg>
);

const content = {
    en: {
        home: "Home",
        title: "💽 Computer Storage Types",
        subtitle: "Explore the different types of computer storage, their speed, cost, and special facts!",
        tableHeaderType: "Type",
        tableHeaderDescription: "Description",
        tableHeaderOtherNames: "Other Names",
        tableHeaderExamples: "Examples & Facts",
        previous: "Previous",
        next: "Next",
        storageTypes: [
            {
                id: 'primary',
                icon: <PrimaryIcon />,
                type: 'Primary Storage',
                description: 'Main memory for active tasks. Volatile: data disappears when power is off.',
                otherNames: 'Main Memory, Internal Memory, Temporary Storage, Volatile Memory',
                examplesAndFacts: 'RAM, CPU Cache, Registers',
                factText: '⚡ Fast access memory!',
                tags: [
                    { text: 'Volatile', color: 'bg-yellow-100 text-yellow-800' },
                    { text: 'Fast', color: 'bg-blue-100 text-blue-800' },
                ]
            },
            {
                id: 'secondary',
                icon: <SecondaryIcon />,
                type: 'Secondary Storage',
                description: 'Long-term storage for programs and data. Non-volatile: keeps data when powered off.',
                otherNames: 'Mass Storage, External Memory, Permanent Storage',
                examplesAndFacts: 'HDD, SSD, USB drives, SD cards',
                factText: '🚀 SSD is much faster than HDD!',
                tags: [
                    { text: 'Non-volatile', color: 'bg-blue-100 text-blue-800' },
                    { text: 'Persistent', color: 'bg-green-100 text-green-800' },
                ]
            },
            {
                id: 'tertiary',
                icon: <TertiaryIcon />,
                type: 'Tertiary Storage',
                description: 'Used for long-term archives and backups. Very slow but cost-effective.',
                otherNames: 'Offline Storage, Archival Storage',
                examplesAndFacts: 'Magnetic tapes, Automated tape libraries',
                factText: '📼 Stores rarely accessed data safely for years.',
                tags: [
                    { text: 'Slow', color: 'bg-green-100 text-green-800' },
                    { text: 'Cost-effective', color: 'bg-gray-200 text-gray-800' },
                ]
            }
        ]
    },
    hi: {
        home: "होम",
        title: "💽 कंप्यूटर स्टोरेज के प्रकार",
        subtitle: "विभिन्न प्रकार के कंप्यूटर स्टोरेज, उनकी गति, लागत और विशेष तथ्यों का अन्वेषण करें!",
        tableHeaderType: "प्रकार",
        tableHeaderDescription: "विवरण",
        tableHeaderOtherNames: "अन्य नाम",
        tableHeaderExamples: "उदाहरण और तथ्य",
        previous: "पिछला",
        next: "अगला",
        storageTypes: [
            {
                id: 'primary',
                icon: <PrimaryIcon />,
                type: 'प्राथमिक स्टोरेज',
                description: 'सक्रिय कार्यों के लिए मुख्य मेमोरी। अस्थिर: बिजली बंद होने पर डेटा गायब हो जाता है।',
                otherNames: 'मुख्य मेमोरी, आंतरिक मेमोरी, अस्थायी स्टोरेज, अस्थिर मेमोरी',
                examplesAndFacts: 'रैम, सीपीयू कैश, रजिस्टर',
                factText: '⚡ तेज एक्सेस मेमोरी!',
                tags: [
                    { text: 'अस्थिर', color: 'bg-yellow-100 text-yellow-800' },
                    { text: 'तेज', color: 'bg-blue-100 text-blue-800' },
                ]
            },
            {
                id: 'secondary',
                icon: <SecondaryIcon />,
                type: 'माध्यमिक स्टोरेज',
                description: 'प्रोग्राम और डेटा के लिए दीर्घकालिक स्टोरेज। गैर-अस्थिर: बिजली बंद होने पर डेटा रखता है।',
                otherNames: 'मास स्टोरेज, बाहरी मेमोरी, स्थायी स्टोरेज',
                examplesAndFacts: 'एचडीडी, एसएसडी, यूएसबी ड्राइव, एसडी कार्ड',
                factText: '🚀 एसएसडी एचडीडी की तुलना में बहुत तेज है!',
                tags: [
                    { text: 'गैर-अस्थिर', color: 'bg-blue-100 text-blue-800' },
                    { text: 'स्थायी', color: 'bg-green-100 text-green-800' },
                ]
            },
            {
                id: 'tertiary',
                icon: <TertiaryIcon />,
                type: 'तृतीयक स्टोरेज',
                description: 'दीर्घकालिक अभिलेखागार और बैकअप के लिए उपयोग किया जाता है। बहुत धीमा लेकिन लागत प्रभावी।',
                otherNames: 'ऑफलाइन स्टोरेज, अभिलेखीय स्टोरेज',
                examplesAndFacts: 'चुंबकीय टेप, स्वचालित टेप लाइब्रेरी',
                factText: '📼 शायद ही कभी एक्सेस किए गए डेटा को वर्षों तक सुरक्षित रूप से संग्रहीत करता है।',
                tags: [
                    { text: 'धीमा', color: 'bg-green-100 text-green-800' },
                    { text: 'लागत प्रभावी', color: 'bg-gray-200 text-gray-800' },
                ]
            }
        ]
    }
};

const MemoryComparison = () => {
    const [language, setLanguage] = useState('en');
    const navigate = useNavigate()
    // Variants for the container to orchestrate the staggered entry of table rows.
    const containerVariants = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2, // Stagger the animation of each child (row) by 0.2 seconds
                delayChildren: 0.3,    // Delay the start of the entire animation
            },
        },
    };

    // Variants for each individual table row.
    const itemVariants = {
        hidden: { opacity: 0, y: 30, scale: 0.95 },
        show: { opacity: 1, y: 0, scale: 1, transition: { ease: "easeOut" } },
    };

    useEffect(() => {
        const handleKeyDown = (event) => {
            if (event.ctrlKey && event.key === 'k') {
                event.preventDefault();
                setLanguage(prevLang => prevLang === 'en' ? 'hi' : 'en');
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, []);

    return (
        <>
            <style>
                {`
                @media (max-width: 767px) {
                    td[data-label]::before {
                        content: attr(data-label);
                        font-weight: bold;
                        display: block;
                        margin-bottom: 0.5rem;
                        color: #374151;
                    }
                }
                `}
            </style>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="bg-gray-50 min-h-screen font-sans"
            >
                <div className="max-w-7xl mx-auto py-8 sm:py-12 px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center mb-8">
                        <Link
                            to="/parts/prt1"
                            className="inline-flex items-center px-4 py-2 bg-white rounded-full shadow-md border border-gray-200 hover:bg-gray-100 transition"
                        >
                            <FaHome className="mr-2 text-lg text-indigo-600 animate-bounce" />
                            {content[language].home}
                        </Link>
                        <div className="flex space-x-2">
                            <button
                                onClick={() => setLanguage('en')}
                                className={`px-3 py-1 rounded-lg border font-semibold ${language === 'en' ? 'bg-sky-600 text-white border-sky-600' : 'bg-white text-gray-700 border-gray-300'
                                    } transition`}
                            >
                                EN
                            </button>
                            <button
                                onClick={() => setLanguage('hi')}
                                className={`px-3 py-1 rounded-lg border font-semibold ${language === 'hi' ? 'bg-sky-600 text-white border-sky-600' : 'bg-white text-gray-700 border-gray-300'
                                    } transition`}
                            >
                                हिं
                            </button>
                        </div>
                    </div>
                    <motion.div
                        initial={{ opacity: 0, y: -20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        transition={{ duration: 1, ease: "easeOut" }}
                        className="text-center"
                    >
                        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-indigo-700 mb-4">
                            {content[language].title}
                        </h1>
                        <p className="text-gray-600 mb-12 text-base sm:text-lg md:text-xl max-w-3xl mx-auto">
                            {content[language].subtitle}
                        </p>
                    </motion.div>

                    <div className="overflow-x-auto">
                        <motion.table
                            initial="hidden"
                            animate="show"
                            variants={containerVariants}
                            className="min-w-full divide-y divide-gray-200 bg-white shadow-lg rounded-2xl overflow-hidden border border-gray-100"
                        >
                            <thead className="bg-gray-100 hidden md:table-header-group">
                                <tr>
                                    <th className="px-4 py-3 sm:px-6 sm:py-4 text-left font-bold text-sm sm:text-base md:text-lg text-gray-800">{content[language].tableHeaderType}</th>
                                    <th className="px-4 py-3 sm:px-6 sm:py-4 text-left font-bold text-sm sm:text-base md:text-lg text-gray-800">{content[language].tableHeaderDescription}</th>
                                    <th className="px-4 py-3 sm:px-6 sm:py-4 text-left font-bold text-sm sm:text-base md:text-lg text-gray-800">{content[language].tableHeaderOtherNames}</th>
                                    <th className="px-4 py-3 sm:px-6 sm:py-4 text-left font-bold text-sm sm:text-base md:text-lg text-gray-800">{content[language].tableHeaderExamples}</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200 md:divide-y-0">
                                {content[language].storageTypes.map((storage) => (
                                    <motion.tr
                                        key={storage.id}
                                        variants={itemVariants}
                                        whileHover={{ scale: 1.02, boxShadow: "0 5px 20px rgba(0,0,0,0.1)" }}
                                        className="block md:table-row mb-4 md:mb-0 border rounded-lg md:border-none"
                                    >
                                        <td className="px-4 py-3 sm:px-6 sm:py-4 font-semibold flex items-center gap-2 text-sm sm:text-base text-gray-800 md:table-cell" data-label={content[language].tableHeaderType}>
                                            {storage.icon} {storage.type}
                                        </td>
                                        <td className="px-4 py-3 sm:px-6 sm:py-4 text-sm sm:text-base text-gray-700 block md:table-cell" data-label={content[language].tableHeaderDescription}>{storage.description}</td>
                                        <td className="px-4 py-3 sm:px-6 sm:py-4 text-sm sm:text-base text-gray-700 block md:table-cell" data-label={content[language].tableHeaderOtherNames}>{storage.otherNames}</td>
                                        <td className="px-4 py-3 sm:px-6 sm:py-4 text-sm sm:text-base text-gray-700 block md:table-cell" data-label={content[language].tableHeaderExamples}>
                                            {storage.examplesAndFacts}
                                            <br />
                                            <span className="text-xs sm:text-sm text-gray-500">{storage.factText}</span>
                                            <div className="mt-2 flex gap-2 flex-wrap">
                                                {storage.tags.map(tag => (
                                                    <span key={tag.text} className={`${tag.color} px-2 py-1 rounded-full text-xs`}>
                                                        {tag.text}
                                                    </span>
                                                ))}
                                            </div>
                                        </td>
                                    </motion.tr>
                                ))}
                            </tbody>
                        </motion.table>
                    </div>
                </div>
                <div className="w-full flex justify-between items-center mt-10 p-4 bg-gray-100 rounded-lg shadow-md max-w-7xl mx-auto">
                    <button
                        onClick={() => navigate('/part1/ram-vs-rom')}
                        className="flex items-center gap-2 px-3 py-2 sm:px-4 text-sm sm:text-base bg-purple-200 hover:bg-purple-300 text-purple-900 rounded-lg shadow transition"
                    >
                        <FaArrowLeft />
                        {content[language].previous}
                    </button>

                    <button
                        onClick={() => navigate('/part1/memory-units')}
                        className="flex items-center gap-2 px-3 py-2 sm:px-4 text-sm sm:text-base bg-green-200 hover:bg-green-300 text-green-900 rounded-lg shadow transition"
                    >
                        {content[language].next}
                        <FaArrowRight />
                    </button>
                </div>
            </motion.div>
        </>
    );
};

export default MemoryComparison;
