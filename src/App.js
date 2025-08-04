import React, { useState, useEffect, useRef } from "react";
import ramStorage from "./Assets/ramStorage.png";
import BlueprintTable from "./Components/blueprint.jsx";
// Main App component that holds all the logic and child components
const App = () => {
  // State to manage which major part of the book is currently active
  const [activePart, setActivePart] = useState("part1");
  // State to manage which chapter link in the header is highlighted (for scroll-spy)
  const [activeChapterId, setActiveChapterId] = useState("ch1-intro");
  // Ref to hold all the chapter sections for the IntersectionObserver
  const sectionsRef = useRef([]);
  const observer = useRef(null);
  <section className="bg-indigo-50 p-6 mb-10 rounded-xl shadow-md">
    <h2 className="text-2xl md:text-3xl font-bold mb-4 text-gray-900">
      📘 Interactive Blueprint
    </h2>
    <p className="mb-4 text-gray-700 text-lg">
      Click on any chapter to jump to that topic.
    </p>

    <div className="overflow-x-auto">
      <table className="min-w-full bg-white rounded-xl overflow-hidden border border-gray-200">
        <thead className="bg-indigo-100">
          <tr>
            <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
              Part
            </th>
            <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
              Chapter
            </th>
            <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
              Concept
            </th>
          </tr>
        </thead>
        <tbody>
          {/* Example rows (repeat for all chapters) */}
          <tr
            className="hover:bg-indigo-50 cursor-pointer"
            onClick={() =>
              document
                .getElementById("ch1")
                .scrollIntoView({ behavior: "smooth" })
            }
          >
            <td className="px-4 py-3 text-sm text-gray-600">Part 1</td>
            <td className="px-4 py-3 text-sm text-blue-600 font-medium">
              Chapter 1: What is a Computer?
            </td>
            <td className="px-4 py-3 text-sm text-gray-700">
              Defining a computer as a helpful electronic machine.
            </td>
          </tr>
          <tr
            className="hover:bg-indigo-50 cursor-pointer"
            onClick={() =>
              document
                .getElementById("ch2")
                .scrollIntoView({ behavior: "smooth" })
            }
          >
            <td className="px-4 py-3 text-sm text-gray-600">Part 1</td>
            <td className="px-4 py-3 text-sm text-blue-600 font-medium">
              Chapter 2: The Main Parts (Hardware)
            </td>
            <td className="px-4 py-3 text-sm text-gray-700">
              Introducing the physical components of a computer.
            </td>
          </tr>
          {/* Continue for all chapters like ch3, ch4, ch5... ch16 */}
        </tbody>
      </table>
    </div>
  </section>;
  // Effect to handle the scroll-spy and update the active chapter link
  useEffect(() => {
    // Disconnect previous observer if it exists
    if (observer.current) {
      observer.current.disconnect();
    }

    const options = {
      root: null,
      rootMargin: "-50% 0px -50% 0px", // Trigger when section is in the middle of the viewport
      threshold: 0,
    };

    // Create a new IntersectionObserver instance
    observer.current = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveChapterId(entry.target.id);
        }
      });
    }, options);

    // Observe all the chapter sections
    sectionsRef.current.forEach((section) => {
      if (section) {
        observer.current.observe(section);
      }
    });

    // Cleanup function to disconnect the observer
    return () => {
      if (observer.current) {
        observer.current.disconnect();
      }
    };
  }, [activePart]); // Rerun effect when the active part changes

  // Function to handle smooth scrolling to a chapter section
  const scrollToChapter = (id) => {
    const element = document.getElementById(id);
    if (element) {
      window.scrollTo({
        top: element.offsetTop - 80, // Adjust for the fixed header height
        behavior: "smooth",
      });
    }
  };

  // Component for the Interactive Cards
  const InteractiveCard = ({
    id,
    title,
    emoji,
    borderColor,
    analogy,
    definition,
  }) => {
    const [isActive, setIsActive] = useState(false);

    // Function to toggle the card's active state
    const toggleCard = () => {
      setIsActive((prev) => !prev);
    };

    return (
      <div
        id={`card-${id}`}
        className={`flow-card p-6 bg-white rounded-xl shadow-lg border-l-4 ${borderColor} hover:shadow-xl hover:scale-105 ${
          isActive ? "active" : ""
        }`}
        onClick={toggleCard}
      >
        <div className="flex items-center space-x-4">
          <span className="text-4xl">{emoji}</span>
          <h3 className="text-xl font-bold text-gray-900">{title}</h3>
        </div>
        {/* Conditionally render the content based on isActive state */}
        {isActive && (
          <div
            className="mt-4"
            style={{ color: borderColor.replace("border-", "text-") }}
          >
            <p className="font-semibold text-lg mb-2">Analogy:</p>
            <p>{analogy}</p>
            <p className="font-semibold text-lg mt-4 mb-2">
              Technical Definition:
            </p>
            <p>{definition}</p>
          </div>
        )}
      </div>
    );
  };

  // Data for the chapters and cards, stored as an object for easy access
  const chapterData = {
    part1: [
      {
        id: "ch1-intro",
        title: "Chapter 1: What is a Computer? �",
        subtitle:
          "Let's understand what a computer is with a simple real-life example and a formal definition.",
        img: "https://4.imimg.com/data4/RQ/PS/MY-25091456/how-to-donate-computer-1-500x500.jpg",
        content: (
          <>
            <section className="bg-white p-8 rounded-xl shadow-lg mb-12">
              <h2 className="text-2xl md:text-3xl font-bold mb-4 text-gray-900">
                A Simple Machine
              </h2>
              <p className="text-lg mb-6 text-gray-700">
                A computer is a smart machine that helps us with our work, just
                like a **mixer grinder** in the kitchen. Let's see how they are
                similar.
              </p>
              <div className="flex flex-col md:flex-row items-center justify-center space-y-8 md:space-y-0 md:space-x-8">
                <div className="flex-1 text-center">
                  <span className="text-6xl">🌶️</span>
                  <p className="text-xl font-semibold mt-2">Raw Spices</p>
                  <p className="text-md text-gray-500">You put these in.</p>
                </div>
                <div className="text-4xl text-gray-400">➡️</div>
                <div className="flex-1 text-center">
                  <span className="text-6xl">🔄</span>
                  <p className="text-xl font-semibold mt-2">Grinding</p>
                  <p className="text-md text-gray-500">
                    The machine does the work.
                  </p>
                </div>
                <div className="text-4xl text-gray-400">➡️</div>
                <div className="flex-1 text-center">
                  <span className="text-6xl">🥣</span>
                  <p className="text-xl font-semibold mt-2">Spice Powder</p>
                  <p className="text-md text-gray-500">The finished result.</p>
                </div>
              </div>
            </section>
            <section className="bg-white p-8 rounded-xl shadow-lg mb-12">
              <h2 className="text-2xl md:text-3xl font-bold mb-4 text-gray-900">
                The Technical Definition
              </h2>
              <p className="text-lg mb-6 text-gray-700">
                In technical terms, a computer is much more than a simple
                machine.
              </p>
              <div className="p-6 bg-indigo-100 border-l-4 border-indigo-500 rounded-r-lg max-w-2xl mx-auto text-left">
                <p className="text-indigo-800">
                  A **computer** is an **electronic device** that manipulates
                  **information**, or **data**, according to a set of
                  **instructions**. It has the ability to **store**,
                  **retrieve**, and **process data**.
                </p>
              </div>
            </section>
          </>
        ),
      },
      {
        id: "ch2-hardware",
        title: "Chapter 2: The Main Parts (Hardware) ⚙️",
        subtitle:
          "A computer is made of many physical parts. These are called **Hardware**.",
        img: "https://nctaindia.in/images/course/hardware.png",
        content: (
          <section className="bg-white p-8 rounded-xl shadow-lg mb-12">
            <h2 className="text-2xl md:text-3xl font-bold mb-4 text-gray-900">
              The Computer's "Body"
            </h2>
            <p className="text-lg mb-6 text-gray-700">
              Think of the computer as a living being. Its physical parts are
              like a human body with a **brain (CPU)**, a **short-term memory
              (RAM)**, and a **long-term storage space (Hard Drive/SSD)**.
            </p>
          </section>
        ),
      },
      {
        id: "ch3-cpu",
        title: "Chapter 3: The Brain of the Computer: The CPU 🧠",
        subtitle:
          "The **Central Processing Unit (CPU)** is the most important part of the computer's hardware. It's the \"brain\" that performs all the calculations and tells other parts what to do.",
        img: "https://www.globalspec.com/ImageRepository/LearnMore/201311/chips8b74c2a3d3b543d58e6a4540e6469e25.png",
        content: (
          <>
            <section className="bg-white p-8 rounded-xl shadow-lg mb-12">
              <h2 className="text-2xl md:text-3xl font-bold mb-4 text-gray-900">
                The Headmaster of the School
              </h2>
              <p className="text-lg mb-6 text-gray-700">
                The CPU is like the **headmaster of a school**. It's the boss
                who makes all the important decisions, solves all the difficult
                problems, and directs the teachers and students (other parts of
                the computer) to get their work done.
              </p>
            </section>
            <section className="bg-white p-8 rounded-xl shadow-lg">
              <h2 className="text-2xl md:text-3xl font-bold mb-4 text-gray-900">
                How the CPU Works (Block Diagram)
              </h2>
              <p className="text-lg mb-6 text-gray-700">
                This diagram shows how a computer processes data from input
                devices, through the CPU and memory, to the output devices.
              </p>

              {/* Diagram layout */}
              <div className="grid grid-cols-5 gap-4 text-center items-center justify-center">
                {/* Input */}
                <div className="col-span-1 p-4 border-2 border-blue-300 rounded-lg bg-blue-50">
                  <span className="text-4xl">⌨️</span>
                  <p className="font-semibold mt-2">Input</p>
                  <p className="text-sm text-gray-500">Keyboard, Mouse</p>
                </div>

                {/* Arrow */}
                <div className="text-2xl text-gray-400">➡️</div>

                {/* CPU */}
                <div className="col-span-1 p-4 border-4 border-indigo-500 rounded-lg bg-indigo-100">
                  <span className="text-4xl">🧠</span>
                  <p className="font-bold mt-2">CPU</p>
                  <div className="mt-2 space-y-1">
                    <div className="p-1 border border-indigo-400 bg-white rounded">
                      <p className="text-sm font-semibold text-indigo-700">
                        Control Unit (CU)
                      </p>
                    </div>
                    <div className="p-1 border border-indigo-400 bg-white rounded">
                      <p className="text-sm font-semibold text-indigo-700">
                        ALU
                      </p>
                    </div>
                  </div>
                </div>

                {/* Arrow */}
                <div className="text-2xl text-gray-400">➡️</div>

                {/* Output */}
                <div className="col-span-1 p-4 border-2 border-green-300 rounded-lg bg-green-50">
                  <span className="text-4xl">🖥️</span>
                  <p className="font-semibold mt-2">Output</p>
                  <p className="text-sm text-gray-500">Monitor, Printer</p>
                </div>
              </div>

              {/* Memory unit below CPU */}
              <div className="mt-6 flex justify-center">
                <div className="p-4 border-2 border-yellow-400 rounded-lg bg-yellow-50 text-center w-64">
                  <span className="text-4xl">💾</span>
                  <p className="font-semibold mt-2">Memory Unit</p>
                  <p className="text-sm text-gray-500">
                    Stores data and instructions
                  </p>
                </div>
              </div>
            </section>
          </>
        ),
      },
      {
        id: "ch4-memory-storage",
        title: "Chapter 4: Memory and Storage ✍️📦",
        subtitle:
          "Let's explore the difference between a computer's temporary memory and its permanent storage.",
        img: ramStorage,
        content: (
          <div className="grid md:grid-cols-2 gap-6">
            <InteractiveCard
              id="ram"
              title="RAM (Memory)"
              emoji="✍️"
              borderColor="border-yellow-500"
              analogy="RAM is like your **kitchen countertop**. You keep all your ingredients there for a recipe you are currently cooking, but you clear it once you are done."
              definition="**Random Access Memory (RAM)** is a form of computer memory used to store working data and machine code. It's a temporary, high-speed workspace for the computer."
            />
            <InteractiveCard
              id="storage"
              title="Storage"
              emoji="📦"
              borderColor="border-blue-500"
              analogy="Storage is like a **steel almirah (cupboard)**. It holds all your clothes, books, and important items safely for a long time, even when the lights are off."
              definition="**Storage** (like a Hard Drive or SSD) is where data is saved permanently. It keeps all your files, applications, and operating system data even when the computer is turned off."
            />
          </div>
        ),
      },
      {
        id: "ch5-io-devices",
        title: "Chapter 5: Input and Output Devices ⌨️🖱️",
        subtitle:
          "We use these devices to communicate with the computer, giving it instructions and getting results back.",
        img: "https://media.geeksforgeeks.org/wp-content/uploads/20250315122640215754/Input----Output--Devices.webp",
        content: (
          <div className="grid md:grid-cols-2 gap-6">
            <InteractiveCard
              id="input-devices"
              title="Input Devices"
              emoji="⌨️"
              borderColor="border-green-500"
              analogy="Input devices are like our **hands and mouth**. They are how we provide information and commands to the computer."
              definition="**Input devices** are hardware that allow you to enter data into the computer. Common examples include a keyboard, mouse, and microphone."
            />
            <InteractiveCard
              id="output-devices"
              title="Output Devices"
              emoji="🖥️"
              borderColor="border-red-500"
              analogy="Output devices are like our **eyes and ears**. They are how the computer shows us the results of its work."
              definition="**Output devices** are hardware that display or provide the processed data from the computer. Common examples include a monitor, speakers, and a printer."
            />
          </div>
        ),
      },
    ],
    part2: [
      {
        id: "ch6-software",
        title: "Chapter 6: What is Software? 🖥️",
        subtitle:
          "If hardware is the body of the computer, then **Software** is its mind and soul. It's the set of instructions that tells the hardware what to do.",
        img: "https://placehold.co/600x400/808080/FFFFFF?text=Software",
        content: (
          <section className="bg-white p-8 rounded-xl shadow-lg mb-12">
            <h2 className="text-2xl md:text-3xl font-bold mb-4 text-gray-900">
              Hardware vs. Software
            </h2>
            <p className="text-lg mb-6 text-gray-700">
              Think of it this way: Hardware is a **car**, and software is the
              **driver**. The car (hardware) is a physical thing you can touch,
              but without a driver (software), it can't go anywhere.
            </p>
            <div className="flex flex-col md:flex-row items-center justify-center space-y-8 md:space-y-0 md:space-x-8">
              <div className="flex-1 text-center">
                <span className="text-6xl">🚗</span>
                <p className="text-xl font-semibold mt-2">Hardware</p>
                <p className="text-md text-gray-500">
                  The physical parts you can touch.
                </p>
              </div>
              <div className="text-4xl text-gray-400">➕</div>
              <div className="flex-1 text-center">
                <span className="text-6xl">🧑‍✈️</span>
                <p className="text-xl font-semibold mt-2">Software</p>
                <p className="text-md text-gray-500">
                  The instructions that make it work.
                </p>
              </div>
            </div>
          </section>
        ),
      },
      {
        id: "ch7-os",
        title: "Chapter 7: The Operating System (OS) 🧠",
        subtitle:
          "The Operating System is the single most important piece of software on a computer. It's what makes everything work together.",
        img: "https://placehold.co/600x400/808080/FFFFFF?text=Operating+System",
        content: (
          <section className="bg-white p-8 rounded-xl shadow-lg">
            <h2 className="text-2xl md:text-3xl font-bold mb-4 text-gray-900">
              The Master Manager
            </h2>
            <p className="text-lg mb-6 text-gray-700">
              The OS acts as a manager for all the parts of the computer. It
              handles everything from the moment you turn on the machine to when
              you shut it down.
            </p>
            <InteractiveCard
              id="os"
              title="What an OS does"
              emoji="👮"
              borderColor="border-indigo-500"
              analogy="The OS is like the **traffic police** of the computer. It directs all the processes and tasks, ensuring that everything runs smoothly and doesn't crash into each other."
              definition="The **Operating System (OS)** is a set of system software that manages computer hardware and software resources and provides common services for computer programs. It is the core software that enables the computer to function and allows you to interact with it."
            />
          </section>
        ),
      },
      {
        id: "ch8-types-of-software",
        title: "Chapter 8: Types of Software 🛠️",
        subtitle:
          "If hardware is the body and software is the mind, then we must understand that there are different types of software with different jobs.",
        img: "https://placehold.co/600x400/808080/FFFFFF?text=System+vs+Application+Software",
        content: (
          <section className="bg-white p-8 rounded-xl shadow-lg mb-12">
            <h2 className="text-2xl md:text-3xl font-bold mb-4 text-gray-900">
              System vs. Application Software
            </h2>
            <p className="text-lg mb-6 text-gray-700">
              **System software** is like the **entire toolbox** that holds and
              organizes all the tools. The **Operating System (OS)** is the most
              important type of system software. It manages the computer's
              resources and provides a platform for other software to run.
            </p>
            <p className="text-lg mb-6 text-gray-700">
              **Application software**, on the other hand, is like a **specific
              tool** in that toolbox, such as a **hammer (for writing a
              document)** or a **screwdriver (for editing a photo)**. These
              programs are designed for specific tasks that you want to perform.
            </p>
            <div className="flex flex-col md:flex-row items-center justify-center space-y-8 md:space-y-0 md:space-x-8">
              <div className="flex-1 text-center">
                <span className="text-6xl">🧰</span>
                <p className="text-xl font-semibold mt-2">System Software</p>
                <p className="text-md text-gray-500">
                  The toolbox (e.g., Operating System)
                </p>
              </div>
              <div className="text-4xl text-gray-400">↔️</div>
              <div className="flex-1 text-center">
                <span className="text-6xl">🔨</span>
                <p className="text-xl font-semibold mt-2">
                  Application Software
                </p>
                <p className="text-md text-gray-500">
                  A specific tool (e.g., MS Word, a game)
                </p>
              </div>
            </div>
          </section>
        ),
      },
    ],
    part3: [
      {
        id: "ch9-internet",
        title: "Chapter 9: The World Wide Web 🌐",
        subtitle:
          "The internet connects computers all over the world. The World Wide Web is a collection of websites you can visit on the internet.",
        img: "https://placehold.co/600x400/808080/FFFFFF?text=World+Wide+Web",
        content: (
          <section className="bg-white p-8 rounded-xl shadow-lg mb-12">
            <h2 className="text-2xl md:text-3xl font-bold mb-4 text-gray-900">
              The Global Library
            </h2>
            <p className="text-lg mb-6 text-gray-700">
              Think of the internet as a massive, global library. The **World
              Wide Web** is like the specific section of that library where all
              the books (websites) are.
            </p>
            <div className="p-6 bg-indigo-100 border-l-4 border-indigo-500 rounded-r-lg max-w-2xl mx-auto text-left">
              <p className="text-indigo-800">
                A **website** is a collection of related webpages, and a **web
                browser** (like Chrome or Firefox) is the application software
                you use to view these webpages.
              </p>
            </div>
          </section>
        ),
      },
    ],
  };

  // A helper component to render a single chapter
  const Chapter = ({ id, title, subtitle, img, content }) => (
    <section id={id} className="text-center mb-12 scroll-mt-20">
      <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
        {title}
      </h1>
      <p className="text-lg text-gray-600">{subtitle}</p>
      <div className="flex justify-center mt-8">
        <img
          src={img}
          alt={`An image for ${title}`}
          className="rounded-xl shadow-lg w-full max-w-md md:max-w-xl"
        />
      </div>
      {content}
      <hr className="my-12 border-gray-300" />
    </section>
  );

  // A helper function to create a new list of chapters for the current part
  const chapterLinks = (partId) => {
    return chapterData[partId].map((chapter) => (
      <li key={chapter.id}>
        <a
          href={`#${chapter.id}`}
          className={`nav-link pb-1 border-b-2 border-transparent cursor-pointer ${
            activeChapterId === chapter.id ? "active" : ""
          }`}
          onClick={(e) => {
            e.preventDefault();
            scrollToChapter(chapter.id);
          }}
        >
          {chapter.title.split(":")[0]}
        </a>
      </li>
    ));
  };

  return (
    <>
      <style>
        {`
                body {
                    font-family: 'Inter', sans-serif;
                    background-color: #f7f7f7;
                }
                .flow-card {
                    transition: all 0.3s ease-in-out;
                    cursor: pointer;
                }
                .flow-card.active {
                    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
                    transform: scale(1.05);
                }
                .nav-link {
                    transition: color 0.3s, border-bottom-color 0.3s;
                }
                .nav-link.active {
                    color: #4f46e5;
                    border-bottom-color: #4f46e5;
                }
                .tab-button {
                    transition: all 0.2s ease-in-out;
                    transform: translateY(0);
                    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
                    border-bottom: 3px solid #7c3aed;
                    background: linear-gradient(145deg, #a78bfa, #8b5cf6);
                    color: white;
                }
                .tab-button.active {
                    background: #ffffff;
                    color: #4f46e5;
                    box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
                    transform: translateY(2px);
                    border-bottom: none;
                }
                .content-section {
                    display: none;
                }
                .content-section.active {
                    display: block;
                }
                `}
      </style>

      <div className="text-gray-800">
        <header className="bg-white shadow-sm sticky top-0 z-50">
          <nav className="container mx-auto px-6 py-4">
            <ul className="flex justify-center space-x-4 md:space-x-6 overflow-x-auto whitespace-nowrap">
              {chapterLinks(activePart)}
            </ul>
          </nav>
        </header>

        <main className="container mx-auto p-6 md:p-12 max-w-4xl">
          <div className="bg-gray-200 p-2 rounded-xl flex space-x-2 mb-8">
            <button
              className={`tab-button w-1/3 px-4 py-3 rounded-xl text-sm md:text-base font-semibold ${
                activePart === "part1" ? "active" : ""
              }`}
              onClick={() => setActivePart("part1")}
            >
              Part 1: The Body ⚙️
            </button>
            <button
              className={`tab-button w-1/3 px-4 py-3 rounded-xl text-sm md:text-base font-semibold ${
                activePart === "part2" ? "active" : ""
              }`}
              onClick={() => setActivePart("part2")}
            >
              Part 2: The Mind 🖥️
            </button>
            <button
              className={`tab-button w-1/3 px-4 py-3 rounded-xl text-sm md:text-base font-semibold ${
                activePart === "part3" ? "active" : ""
              }`}
              onClick={() => setActivePart("part3")}
            >
              Part 3: The Web 🌐
            </button>
          </div>

          {/* Render content for the active part */}
          {Object.keys(chapterData).map((partId) => (
            <div
              key={partId}
              id={partId}
              className={`content-section ${
                activePart === partId ? "active" : ""
              }`}
            >
              {chapterData[partId].map((chapter) => (
                <div
                  key={chapter.id}
                  ref={(el) => sectionsRef.current.push(el)}
                >
                  <Chapter {...chapter} />
                </div>
              ))}
            </div>
          ))}
        </main>
      </div>
    </>
  );
};

export default App;
