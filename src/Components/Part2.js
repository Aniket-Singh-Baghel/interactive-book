import React from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';// <-- Import the array

// Import necessary icons from react-icons
import {
  FaQuestionCircle, FaCogs, FaToolbox, FaUserTie, FaSyncAlt, FaCode,
  FaDatabase, FaProjectDiagram, FaDraftingCompass, FaPaintBrush, FaDesktop,
  FaServer, FaHdd, FaGitAlt, FaBug, FaShieldAlt, FaCloud, FaUsers, FaHome,
  FaDownload
} from 'react-icons/fa';


// Details for each module
const moduleDetails = {
  1: { title: "Introduction to Software", emoji: "🖥️" },
  2: { title: "The World of Software Development", emoji: "🧠" },
  3: { title: "Designing & Building Applications", emoji: "🏗️" },
  4: { title: "Professional Practices & Deployment", emoji: "🚀" },
};

export const softwareWorldChapters = [
  // Module 1: Introduction to Software
  {
    id: 1,
    module: 1,
    title: "What is Software?",
    concept: "The set of instructions that tells computer hardware what to do.",
    analogy: "Hardware is the car, and software is the driver telling it where to go.",
    path: "/module1/what-is-software",
    icon: <FaQuestionCircle className="text-purple-500 text-3xl" />
  },
  {
    id: 2,
    module: 1,
    title: "The Operating System (OS)",
    concept: "The core software that manages all hardware and software on a computer.",
    analogy: "The manager of a busy restaurant, directing all staff (programs) and resources (hardware).",
    path: "/module1/operating-system",
    icon: <FaCogs className="text-pink-500 text-3xl" />
  },
  {
    id: 3,
    module: 1,
    title: "Types of Software",
    concept: "System software runs the computer, while application software performs specific tasks for the user.",
    analogy: "System software is the toolbox; application software is the specific tool you use, like a hammer.",
    path: "/module1/types-of-software",
    icon: <FaToolbox className="text-green-500 text-3xl" />
  },

  // Module 2: The World of Software Development
  {
    id: 4,
    module: 2,
    title: "Who is a Software Developer & How They Think",
    concept: "Understanding the role, skills, and problem-solving mindset of the professionals who create software.",
    analogy: "A creative problem-solver, like a detective who finds clues and a storyteller who builds a digital world.",
    path: "/module2/developer-role",
    icon: <FaUserTie className="text-blue-500 text-3xl" />
  },
  {
    id: 5,
    module: 2,
    title: "SDLC and its Stages",
    concept: "A structured process for building software, from planning to deployment and maintenance.",
    analogy: "A recipe for baking a cake, with specific steps from gathering ingredients to serving.",
    path: "/module2/sdlc",
    icon: <FaSyncAlt className="text-teal-500 text-3xl" />
  },
  {
    id: 6,
    module: 2,
    title: "About Programming Languages",
    concept: "Specialized languages used by developers to write instructions for a computer.",
    analogy: "A special language used to talk to a very smart but literal robot.",
    path: "/module2/programming-languages",
    icon: <FaCode className="text-indigo-500 text-3xl" />
  },
  {
    id: 7,
    module: 2,
    title: "Data Structures",
    concept: "A particular way of organizing data in a computer so it can be used efficiently.",
    analogy: "Different ways to organize a library: by author, by genre, or just a pile of books.",
    path: "/module2/data-structures",
    icon: <FaDatabase className="text-gray-600 text-3xl" />
  },
  {
    id: 8,
    module: 2,
    title: 'Algorithms: How Software "Thinks"',
    concept: "The step-by-step instructions that act as the software's 'brain,' allowing it to process information and make decisions.",
    analogy: "Like a recipe for a chef, it's the exact set of steps the software follows to achieve a goal.",
    path: "/module2/algorithms",
    icon: <FaProjectDiagram className="text-orange-500 text-3xl" />
  },

  // Module 3: Designing & Building Applications
  {
    id: 9,
    module: 3,
    title: "Software Design Principles",
    concept: "Guidelines for creating well-structured, efficient, and maintainable software.",
    analogy: "The architectural principles that ensure a building is strong and functional.",
    path: "/module3/design-principles",
    icon: <FaDraftingCompass className="text-yellow-600 text-3xl" />
  },
  {
    id: 10,
    module: 3,
    title: "UI and UX",
    concept: "UI is the look and feel of an app; UX is the overall experience of using it.",
    analogy: "UI is the design of a joke's punchline card; UX is whether the joke makes you laugh.",
    path: "/module3/ui-ux",
    icon: <FaPaintBrush className="text-red-400 text-3xl" />
  },
  {
    id: 11,
    module: 3,
    title: "Frontend Development",
    concept: "Building the visual, interactive part of an application that the user sees.",
    analogy: "Designing and building the storefront, signs, and interior of a shop.",
    path: "/module3/frontend",
    icon: <FaDesktop className="text-sky-500 text-3xl" />
  },
  {
    id: 12,
    module: 3,
    title: "Backend Development",
    concept: "Building the server, database, and logic that works behind the scenes to power the frontend.",
    analogy: "The kitchen, storage rooms, and staff that make the shop run.",
    path: "/module3/backend",
    icon: <FaServer className="text-slate-700 text-3xl" />
  },
  {
    id: 13,
    module: 3,
    title: "Databases",
    concept: "An organized collection of data, stored and accessed electronically from a computer system.",
    analogy: "A massive, perfectly organized digital filing cabinet for all the app's information.",
    path: "/module3/databases",
    icon: <FaHdd className="text-gray-800 text-3xl" />
  },

  // Module 4: Professional Practices & Deployment
  {
    id: 14,
    module: 4,
    title: "Version Control Systems",
    concept: "Software (like Git) that tracks and manages changes to code, enabling collaboration.",
    analogy: "A magic history book for your project that lets you rewind to any previous version.",
    path: "/module4/version-control",
    icon: <FaGitAlt className="text-orange-600 text-3xl" />
  },
  {
    id: 15,
    module: 4,
    title: "Debugging and Testing",
    concept: "The process of finding and fixing errors (bugs) and ensuring the software works correctly.",
    analogy: "A detective looking for clues (bugs) and an inspector ensuring everything is up to code.",
    path: "/module4/testing",
    icon: <FaBug className="text-lime-600 text-3xl" />
  },
  {
    id: 16,
    module: 4,
    title: "Software Security",
    concept: "Practices for protecting software and its data from attacks or unauthorized access.",
    analogy: "Installing locks, alarms, and security guards for your digital building.",
    path: "/module4/security",
    icon: <FaShieldAlt className="text-blue-800 text-3xl" />
  },
  {
    id: 17,
    module: 4,
    title: "Cloud Computing",
    concept: "Delivering computing services—including servers, storage, and software—over the Internet.",
    analogy: "Renting a fully equipped professional kitchen instead of building your own from scratch.",
    path: "/module4/cloud-computing",
    icon: <FaCloud className="text-cyan-500 text-3xl" />
  },
  {
    id: 18,
    module: 4,
    title: "Freeware, Shareware, & Open Source",
    concept: "Different models for distributing software based on cost and access to the source code.",
    analogy: "Different ways to share food: giving it away, offering a free sample, or sharing the recipe.",
    path: "/module4/distribution-models",
    icon: <FaUsers className="text-purple-700 text-3xl" />
  },
  {
    id: 19,
    module: 4,
    title: "Software, Installation and Updates",
    concept: "The process of setting up software and keeping it updated with new features, bug fixes, and security patches.",
    analogy: "Like installing furniture in your home and later repairing or upgrading it when needed.",
    path: "/module4/installation-updates",
    icon: <FaDownload className="text-green-700 text-3xl" />
  }

];

function SoftwareWorldPage() {
  const navigate = useNavigate();

  // Group chapters by module number
  const groupedModules = softwareWorldChapters.reduce((acc, chapter) => {
    const module = chapter.module;
    if (!acc[module]) {
      acc[module] = [];
    }
    acc[module].push(chapter);
    return acc;
  }, {});

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-pink-100 to-yellow-100 p-8 font-sans">
      <div className="flex justify-center mb-6">
        <Link
          to="/station"
          className="inline-flex items-center px-4 py-2 bg-white rounded-full shadow-md border border-gray-200 hover:bg-gray-100 transition"
        >
          <FaHome className="mr-2 text-lg text-indigo-600" />
          Home
        </Link>
      </div>
      <motion.h1
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 100 }}
        className="text-4xl font-bold text-center text-purple-700 mb-10 flex items-center justify-center gap-2"
      >
        🖥️ The Software Story
      </motion.h1>

      <div className="max-w-3xl mx-auto space-y-12">
        {/* Map over the grouped modules */}
        {Object.entries(groupedModules).map(([moduleNumber, chapters]) => (
          <motion.section
            key={moduleNumber}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: moduleNumber * 0.2 }}
          >
            <h2 className="text-2xl font-bold mb-6 text-pink-600 flex items-center gap-3">
              <span className="text-3xl">{moduleDetails[moduleNumber].emoji}</span>
              Module {moduleNumber}: {moduleDetails[moduleNumber].title}
            </h2>
            <div className="space-y-4">
              {/* Map over the chapters within each module */}
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
                  <div className="mt-4">
                    {topic.icon}
                  </div>
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

export default SoftwareWorldPage;