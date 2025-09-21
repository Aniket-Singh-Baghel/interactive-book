import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { FaHome, FaBars, FaTimes, FaBook, FaChevronRight } from 'react-icons/fa';
import { LanguageContext } from '../../LanguageContext';

const menuContent = {
    en: {
        home: 'Home',
        parts: 'Parts',
        part1: 'Part 1: The Basics',
        part2: 'Part 2: The Software Side',
        part3: 'Part 3: Using a Computer',
        part4: 'Part 4: The Digital World',
        part5: 'Part 5: Digital Safety',
        part6: 'Part 6: Looking Ahead',
        chapters: {
            "Acknowledgement": "/",
            "Introduction": "/introduction",
            "Station": "/station",
            "Part 1": {
                "Home": "/parts/prt1",
                "Chapter 1: What is a Computer?": "/part1/what-is-computer",
                "Uses of Computers": "/part1/uses-of-computer",
                "Chapter 2: Computer Hardware": "/part1/computer-hardware",
                "Chapter 3: CPU Brain": "/part1/cpu-brain",
                "Chapter 4: Memory and Storage": "/part1/memory-and-storage",
                "Chapter 5: Input-Output Devices": "/part1/input-output-devices",
                "Peripherals": "/part1/peripherals",
                "Tertiary Storage": "/part1/tertiary-storage",
                "Other Storage Types": "/part1/other-storage-types",
                "RAM vs ROM": "/part1/ram-vs-rom",
                "Memory Comparison": "/part1/memory-comparison",
                "Memory Units": "/part1/memory-units",
                "Ports and Connectors": "/part1/ports-and-connectors",
                "History of Computers": "/part1/history-of-computers",
                "Types of Computers": "/part1/types-of-computers",
                "Quiz 1": "/part1/chapters/qiz1"
            },
            "Part 2": {
                "Home": "/parts/prt2",
                "Chapter 6: What is Software?": "/module1/what-is-software",
                "Chapter 7: Operating System": "/module1/operating-system",
                "Chapter 8: Types of Software": "/module1/types-of-software",
                "Developer Role": "/module2/developer-role",
                "SDLC": "/module2/sdlc",
                "Programming Languages": "/module2/programming-languages",
                "Data Structures": "/module2/data-structures",
                "Algorithms": "/module2/algorithms",
                "Design Principles": "/module3/design-principles",
                "UI/UX": "/module3/ui-ux",
                "Frontend": "/module3/frontend",
                "Backend": "/module3/backend",
                "Databases": "/module3/databases",
                "Quiz 2": "/part2/chapters/qiz2"
            },
            "Part 3": {
                "Home": "/parts/prt3",
                "Chapter 9": "/part3/chapters/ch9",
                "Chapter 10": "/part3/chapters/ch10",
                "Chapter 11": "/part3/chapters/ch11",
                "Chapter 12": "/part3/chapters/ch12"
            },
            "Part 4": "/parts/prt4",
            "Part 5": {
                "Home": "/parts/prt5",
                "Chapter 15": "/part5/chapters/ch15",
                "Chapter 16": "/part5/chapters/ch16"
            },
            "Part 6": "/parts/prt6",
        }
    },
    hi: {
        home: 'होम',
        parts: 'भाग',
        part1: 'भाग 1: मूल बातें',
        part2: 'भाग 2: सॉफ्टवेयर साइड',
        part3: 'भाग 3: कंप्यूटर का उपयोग',
        part4: 'भाग 4: डिजिटल दुनिया',
        part5: 'भाग 5: डिजिटल सुरक्षा',
        part6: 'भाग 6: आगे देख रहे हैं',
        chapters: {
            "स्वीकृति": "/",
            "परिचय": "/introduction",
            "स्टेशन": "/station",
            "भाग 1": {
                "होम": "/parts/prt1",
                "अध्याय 1: कंप्यूटर क्या है?": "/part1/what-is-computer",
                "कंप्यूटर के उपयोग": "/part1/uses-of-computer",
                "अध्याय 2: कंप्यूटर हार्डवेयर": "/part1/computer-hardware",
                "अध्याय 3: सीपीयू ब्रेन": "/part1/cpu-brain",
                "अध्याय 4: मेमोरी और स्टोरेज": "/part1/memory-and-storage",
                "अध्याय 5: इनपुट-आउटपुट डिवाइस": "/part1/input-output-devices",
                "पेरिफेरल्स": "/part1/peripherals",
                "तृतीयक भंडारण": "/part1/tertiary-storage",
                "अन्य भंडारण प्रकार": "/part1/other-storage-types",
                "रैम बनाम रोम": "/part1/ram-vs-rom",
                "मेमोरी तुलना": "/part1/memory-comparison",
                "मेमोरी इकाइयाँ": "/part1/memory-units",
                "पोर्ट और कनेक्टर": "/part1/ports-and-connectors",
                "कंप्यूटर का इतिहास": "/part1/history-of-computers",
                "कंप्यूटर के प्रकार": "/part1/types-of-computers",
                "प्रश्नोत्तरी 1": "/part1/chapters/qiz1"
            },
            "भाग 2": {
                "होम": "/parts/prt2",
                "अध्याय 6: सॉफ्टवेयर क्या है?": "/module1/what-is-software",
                "अध्याय 7: ऑपरेटिंग सिस्टम": "/module1/operating-system",
                "अध्याय 8: सॉफ्टवेयर के प्रकार": "/module1/types-of-software",
                "डेवलपर की भूमिका": "/module2/developer-role",
                "एसडीएलसी": "/module2/sdlc",
                "प्रोग्रामिंग भाषाएं": "/module2/programming-languages",
                "डेटा संरचनाएं": "/module2/data-structures",
                "एल्गोरिदम": "/module2/algorithms",
                "डिजाइन सिद्धांत": "/module3/design-principles",
                "यूआई/यूएक्स": "/module3/ui-ux",
                "फ्रंटएंड": "/module3/frontend",
                "बैकएंड": "/module3/backend",
                "डेटाबेस": "/module3/databases",
                "प्रश्नोत्तरी 2": "/part2/chapters/qiz2"
            },
            "भाग 3": {
                "होम": "/parts/prt3",
                "अध्याय 9": "/part3/chapters/ch9",
                "अध्याय 10": "/part3/chapters/ch10",
                "अध्याय 11": "/part3/chapters/ch11",
                "अध्याय 12": "/part3/chapters/ch12"
            },
            "भाग 4": "/parts/prt4",
            "भाग 5": {
                "होम": "/parts/prt5",
                "अध्याय 15": "/part5/chapters/ch15",
                "अध्याय 16": "/part5/chapters/ch16"
            },
            "भाग 6": "/parts/prt6",
        }
    }
};

const Menu = () => {
    const { language, setLanguage } = useContext(LanguageContext);
    const [isOpen, setIsOpen] = useState(false);
    const t = menuContent[language];

    const renderLinks = (links) => {
        return Object.entries(links).map(([text, path]) => {
            if (typeof path === 'object') {
                return (
                    <li key={text} className="relative group">
                        <button className="w-full text-left flex items-center justify-between px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                            {text}
                            <FaChevronRight className="ml-2 h-3 w-3" />
                        </button>
                        <ul className="absolute left-full top-0 mt-0 w-48 bg-white rounded-md shadow-lg py-1 z-20 hidden group-hover:block">
                            {renderLinks(path)}
                        </ul>
                    </li>
                );
            }
            return (
                <li key={text}>
                    <Link to={path} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                        {text}
                    </Link>
                </li>
            );
        });
    };

    return (
        <nav className="bg-gray-800 text-white shadow-lg">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <div className="flex items-center">
                        <Link to="/station" className="flex-shrink-0 font-bold text-xl">
                            Computer Lab
                        </Link>
                    </div>
                    <div className="hidden md:block">
                        <div className="ml-10 flex items-baseline space-x-4">
                            <Link to="/station" className="flex items-center px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-700">
                                <FaHome className="mr-2" />
                                {t.home}
                            </Link>
                             <div className="relative group">
                                <button className="flex items-center px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-700">
                                    <FaBook className="mr-2" />
                                    <span>{t.parts}</span>
                                </button>
                                <ul className="absolute left-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-20 hidden group-hover:block">
                                    {renderLinks(t.chapters)}
                                </ul>
                            </div>
                        </div>
                    </div>
                     <div className="hidden md:flex items-center">
                        <button onClick={() => setLanguage('en')} className={`px-3 py-1 rounded-lg border text-sm font-semibold ${language === 'en' ? 'bg-sky-600 text-white' : 'bg-gray-700'}`}>EN</button>
                        <button onClick={() => setLanguage('hi')} className={`ml-2 px-3 py-1 rounded-lg border text-sm font-semibold ${language === 'hi' ? 'bg-sky-600 text-white' : 'bg-gray-700'}`}>हिं</button>
                    </div>
                    <div className="-mr-2 flex md:hidden">
                        <button onClick={() => setIsOpen(!isOpen)} className="bg-gray-800 inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                            <span className="sr-only">Open main menu</span>
                            {isOpen ? <FaTimes /> : <FaBars />}
                        </button>
                    </div>
                </div>
            </div>

            {isOpen && (
                <div className="md:hidden">
                    <ul className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                        {renderLinks(t.chapters)}
                    </ul>
                     <div className="pt-4 pb-3 border-t border-gray-700">
                        <div className="flex items-center px-5">
                             <button onClick={() => setLanguage('en')} className={`px-3 py-1 rounded-lg border text-sm font-semibold ${language === 'en' ? 'bg-sky-600 text-white' : 'bg-gray-700'}`}>EN</button>
                        <button onClick={() => setLanguage('hi')} className={`ml-2 px-3 py-1 rounded-lg border text-sm font-semibold ${language === 'hi' ? 'bg-sky-600 text-white' : 'bg-gray-700'}`}>हिं</button>
                        </div>
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Menu;
