import { useState, useEffect } from 'react';
import { Lightbulb, CheckCircle2, XCircle, RefreshCcw, Home, ChevronLeft, ChevronRight } from 'lucide-react';

// The original, unshuffled quiz data
const quizData = [
  {
    "question": "Hardware is like a car, and software is the driver. Which of the following best describes the relationship between hardware and software?",
    "hint": "Think about the role of the driver in the analogy. Does the car function without the driver's instructions?",
    "answerOptions": [
      {
        "text": "Hardware can function perfectly without any software.",
        "isCorrect": false,
        "rationale": "Hardware is useless without software to provide instructions, just as a car can't drive itself without a driver."
      },
      {
        "text": "Software is a physical component you can touch.",
        "isCorrect": false,
        "rationale": "Software is a set of instructions, not a physical object. Hardware is the physical component."
      },
      {
        "text": "Software tells the hardware what to do and how to do it.",
        "isCorrect": true,
        "rationale": "This aligns perfectly with the analogy: the driver (software) tells the car (hardware) where to go and how to operate."
      },
      {
        "text": "Hardware and software are two names for the same thing.",
        "isCorrect": false,
        "rationale": "Hardware and software are distinct but dependent components of a computer system."
      }
    ]
  },
  {
    "question": "The Operating System (OS) is like a sarpanch (village head) who organizes everything. What is the primary function of the OS?",
    "hint": "What is the main role of the 'manager' or 'organizer' of a computer system?",
    "answerOptions": [
      {
        "text": "To create documents and spreadsheets.",
        "isCorrect": false,
        "rationale": "Creating documents is a task for application software like MS Word, not the primary function of the OS."
      },
      {
        "text": "To provide power to the computer's components.",
        "isCorrect": false,
        "rationale": "The Power Supply Unit (PSU) provides power, not the OS."
      },
      {
        "text": "To manage the computer's hardware and other software.",
        "isCorrect": true,
        "rationale": "Just as a sarpanch manages village resources, the OS manages all the computer's resources, from the CPU and memory to the applications."
      },
      {
        "text": "To protect the computer from physical damage.",
        "isCorrect": false,
        "rationale": "Physical protection is the role of the computer's casing and user care, not the software."
      }
    ]
  },
  {
    "question": "A smartphone's OS (like iOS or Android) is the core software that makes the phone work. Which of these is a direct function of the OS?",
    "hint": "Think about what the phone does right after you turn it on, before you can open any apps.",
    "answerOptions": [
      {
        "text": "Taking a picture with the camera.",
        "isCorrect": false,
        "rationale": "Taking a picture is a task for an application (the camera app), which the OS helps to run, but is not a direct function of the OS itself."
      },
      {
        "text": "Placing a call to a friend.",
        "isCorrect": false,
        "rationale": "This is a function of the phone application, which is a type of application software."
      },
      {
        "text": "Starting up the phone and displaying the home screen.",
        "isCorrect": true,
        "rationale": "The OS is responsible for the boot-up process, managing the user interface, and making the phone usable."
      },
      {
        "text": "Charging the phone's battery.",
        "isCorrect": false,
        "rationale": "Charging is a function of the hardware and electrical components, not the software."
      }
    ]
  },
  {
    "question": "Application software is like a screwdriver, and the OS is the toolbox. Which of the following is an example of **application software**?",
    "hint": "Application software is a tool for a specific job, while system software manages the entire system.",
    "answerOptions": [
      {
        "text": "Microsoft Windows.",
        "isCorrect": false,
        "rationale": "Microsoft Windows is a widely used operating system, which is a type of system software."
      },
      {
        "text": "The computer's BIOS (Basic Input/Output System).",
        "isCorrect": false,
        "rationale": "BIOS is a type of system software that helps the computer start up."
      },
      {
        "text": "A video game like 'Minecraft'.",
        "isCorrect": true,
        "rationale": "A video game is designed for a specific task (entertainment) and runs 'on top of' the operating system, making it application software."
      },
      {
        "text": "The device driver for a printer.",
        "isCorrect": false,
        "rationale": "A device driver is a type of system software that enables the OS to communicate with a specific piece of hardware."
      }
    ]
  },
  {
    "question": "What is the key difference between **system software** and **application software**?",
    "hint": "Think about the purpose of each type of software. Is its goal to manage the computer or to perform a user-facing task?",
    "answerOptions": [
      {
        "text": "System software is free, while application software is always paid.",
        "isCorrect": false,
        "rationale": "This is incorrect. Both system and application software can be free or paid."
      },
      {
        "text": "System software runs on the computer, and application software runs on a smartphone.",
        "isCorrect": false,
        "rationale": "This is incorrect. Both types of software run on all kinds of computing devices, including smartphones and computers."
      },
      {
        "text": "System software manages the computer's resources, while application software helps the user perform specific tasks.",
        "isCorrect": true,
        "rationale": "This is the core distinction. System software manages the underlying operations, and application software provides tools for the user."
      },
      {
        "text": "System software is written in a different language than application software.",
        "isCorrect": false,
        "rationale": "The programming language used does not define the type of software."
      }
    ]
  },
  {
    "question": "When you turn on a computer, which type of software is the **first** to load and run?",
    "hint": "What software acts as the foundation that all other software is built upon?",
    "answerOptions": [
      {
        "text": "An application like a web browser.",
        "isCorrect": false,
        "rationale": "A web browser can only be opened after the operating system has loaded."
      },
      {
        "text": "A video game.",
        "isCorrect": false,
        "rationale": "Like a web browser, a video game is an application that requires the OS to be running first."
      },
      {
        "text": "The operating system (OS).",
        "isCorrect": true,
        "rationale": "The operating system is the master control program that must load first to prepare the computer for running any other software."
      },
      {
        "text": "A text document.",
        "isCorrect": false,
        "rationale": "A text document is a data file, not a program. It can only be opened by an application once the OS is running."
      }
    ]
  },
  {
    "question": "The operating system acts as an intermediary between the user and the computer hardware. What is the benefit of this arrangement?",
    "hint": "Think about the role of a 'middleman' or 'manager' and how they make things simpler for others.",
    "answerOptions": [
      {
        "text": "It prevents the user from using any application software.",
        "isCorrect": false,
        "rationale": "This is incorrect. The OS is what *enables* the user to use application software."
      },
      {
        "text": "It allows the user to directly program the hardware themselves.",
        "isCorrect": false,
        "rationale": "The OS abstracts this complexity, preventing the user from needing to deal with low-level hardware details directly."
      },
      {
        "text": "It makes the computer run faster than without an OS.",
        "isCorrect": false,
        "rationale": "While an efficient OS is fast, the primary purpose is management and usability, not solely speed."
      },
      {
        "text": "It makes it easier for the user to interact with the computer and its devices.",
        "isCorrect": true,
        "rationale": "By managing everything behind the scenes, the OS provides a user-friendly interface that simplifies complex tasks like printing or saving a file."
      }
    ]
  },
  {
    "question": "Imagine you are using a word processor to type a letter. The word processor (like MS Word) is which type of software?",
    "hint": "Is the software a tool you use to perform a specific task, or is it a program that manages the entire computer?",
    "answerOptions": [
      {
        "text": "System software.",
        "isCorrect": false,
        "rationale": "MS Word is not a core program that manages the computer; it is a tool for a specific user task."
      },
      {
        "text": "Operating system.",
        "isCorrect": false,
        "rationale": "The operating system would be Windows or macOS, not the word processor itself."
      },
      {
        "text": "Application software.",
        "isCorrect": true,
        "rationale": "A word processor is a classic example of application software, designed for the specific task of creating and editing text documents."
      },
      {
        "text": "Hardware.",
        "isCorrect": false,
        "rationale": "The word processor is software, not a physical component of the computer."
      }
    ]
  },
  {
    "question": "A car's engine (hardware) is useless without a driver (software). Which of the following best fits the 'driver' part of the analogy for a computer?",
    "hint": "The 'driver' is the set of instructions. Which of these options represents instructions?",
    "answerOptions": [
      {
        "text": "The computer monitor.",
        "isCorrect": false,
        "rationale": "The monitor is hardware, an output device that displays information, not a set of instructions."
      },
      {
        "text": "A physical mouse.",
        "isCorrect": false,
        "rationale": "A mouse is a piece of hardware that provides input, not the instructions to make the computer work."
      },
      {
        "text": "The instructions in a program that you run.",
        "isCorrect": true,
        "rationale": "These instructions are the code that tells the hardware what to do, which is precisely the role of 'software' in the analogy."
      },
      {
        "text": "The computer's hard drive.",
        "isCorrect": false,
        "rationale": "The hard drive is hardware used for storing data, not the instructions themselves."
      }
    ]
  },
  {
    "question": "Think of a music player app on your phone. This app uses the phone's speakers (hardware) to play music. What type of software is the music player app?",
    "hint": "Is the music app a tool for a specific job, or is it the core software that manages the entire phone?",
    "answerOptions": [
      {
        "text": "System software.",
        "isCorrect": false,
        "rationale": "The music player is not managing the entire phone; it is a tool for a specific task."
      },
      {
        "text": "Operating system.",
        "isCorrect": false,
        "rationale": "The operating system is Android or iOS, not the app itself."
      },
      {
        "text": "Application software.",
        "isCorrect": true,
        "rationale": "The music player is a program designed for the specific purpose of playing music, making it an application."
      },
      {
        "text": "A hardware device.",
        "isCorrect": false,
        "rationale": "The app is a program, not a physical device."
      }
    ]
  },
  {
    "question": "A sarpanch (village head) ensures that all villagers (hardware) and organizations (other software) work together smoothly. What is the computer equivalent of this 'sarpanch'?",
    "hint": "The 'sarpanch' is the 'main manager' of the entire system.",
    "answerOptions": [
      {
        "text": "An internet browser.",
        "isCorrect": false,
        "rationale": "An internet browser is a specific application, not the master manager of the entire computer."
      },
      {
        "text": "The computer's monitor.",
        "isCorrect": false,
        "rationale": "The monitor is hardware, an output device."
      },
      {
        "text": "The Central Processing Unit (CPU).",
        "isCorrect": false,
        "rationale": "The CPU is the hardware that executes instructions, but it is the OS that organizes and manages what the CPU does."
      },
      {
        "text": "The Operating System (OS).",
        "isCorrect": true,
        "rationale": "The OS is the core software that manages and organizes all the computer's resources, similar to a village head."
      }
    ]
  },
  {
    "question": "Which of the following is an example of **system software**?",
    "hint": "System software is the foundation of the computer, while application software runs on top of it.",
    "answerOptions": [
      {
        "text": "A calculator application.",
        "isCorrect": false,
        "rationale": "A calculator is a specific tool for a specific task, making it application software."
      },
      {
        "text": "A video editing program.",
        "isCorrect": false,
        "rationale": "Video editing software is designed for a specific creative task, making it application software."
      },
      {
        "text": "The macOS operating system.",
        "isCorrect": true,
        "rationale": "macOS is a well-known operating system, and all operating systems are considered a core type of system software."
      },
      {
        "text": "An antivirus program.",
        "isCorrect": false,
        "rationale": "An antivirus program is an application that runs on top of the OS, not the core system software itself."
      }
    ]
  },
  {
    "question": "What is the relationship between the operating system and application software?",
    "hint": "Think of the OS as the base layer that all other software depends on.",
    "answerOptions": [
      {
        "text": "Application software can run without an operating system.",
        "isCorrect": false,
        "rationale": "Application software relies on the OS to manage hardware and other resources; it cannot run on its own."
      },
      {
        "text": "The operating system is a type of application software.",
        "isCorrect": false,
        "rationale": "This is incorrect. They are two distinct categories. The OS is system software."
      },
      {
        "text": "The operating system provides a platform for application software to run on.",
        "isCorrect": true,
        "rationale": "The OS manages resources and provides a stable environment, or 'platform', for all other applications to function correctly."
      },
      {
        "text": "They are both physical components of the computer.",
        "isCorrect": false,
        "rationale": "They are both types of software, which is non-physical."
      }
    ]
  },
  {
    "question": "A toolkit is full of different tools for different jobs. Following the analogy, which of the following is an example of a 'tool' from the 'toolkit'?",
    "hint": "A 'tool' in this analogy is a program designed for a specific task.",
    "answerOptions": [
      {
        "text": "The computer's motherboard.",
        "isCorrect": false,
        "rationale": "The motherboard is the physical hardware, not a tool or a program."
      },
      {
        "text": "A graphics design program (e.g., Photoshop).",
        "isCorrect": true,
        "rationale": "A graphics design program is a specific tool for a specific job (graphics design), which fits the definition of application software."
      },
      {
        "text": "The Linux operating system.",
        "isCorrect": false,
        "rationale": "Linux is the 'toolkit' itself, not one of the tools inside it."
      },
      {
        "text": "The computer's hard drive.",
        "isCorrect": false,
        "rationale": "The hard drive is hardware for storage."
      }
    ]
  }
];

// Helper function to shuffle an array (Fisher-Yates algorithm)
const shuffleArray = (array) => {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
};

// Main Quiz App component
export default function App() {
  const [currentPage, setCurrentPage] = useState('home'); // State to manage which page is shown: 'home', 'quiz', or 'results'
  const [shuffledQuizData, setShuffledQuizData] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [selectedAnswerIndex, setSelectedAnswerIndex] = useState(null);
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState(false);
  const [navigationWarning, setNavigationWarning] = useState('');

  // Handle initialization on page load/restart
  const handleStartQuiz = () => {
    setCurrentPage('quiz');
    setShuffledQuizData(shuffleArray(quizData));
    setCurrentQuestionIndex(0);
    setScore(0);
    setShowHint(false);
    setSelectedAnswerIndex(null);
    setIsAnswerSubmitted(false);
  };
  
  // This is a custom function to simulate a React Router's `useNavigate` hook.
  // It changes the app's internal view state to simulate navigation.
  const handleNavigate = (path) => {
    if (path === '/parts/prt2' && currentPage === 'results') {
      setCurrentPage('home');
      setNavigationWarning('');
    } else if (path === '/parts/prt2' && currentPage !== 'results') {
      setNavigationWarning('You must complete the quiz before returning to the home page!');
    }
  };

  const handleAnswerClick = (index) => {
    if (isAnswerSubmitted) return;

    setSelectedAnswerIndex(index);
    setIsAnswerSubmitted(true);
    setNavigationWarning(''); // Clear any warnings
    const isCorrect = shuffledQuizData[currentQuestionIndex].answerOptions[index].isCorrect;

    if (isCorrect) {
      setScore(score + 1);
    }
  };
  
  // Handle moving to the next question
  const handleNextQuestion = () => {
    if (!isAnswerSubmitted) {
      setNavigationWarning(`Please answer the current question before moving on. Your current score is ${score}.`);
      return;
    }
    setNavigationWarning('');
    setShowHint(false);
    setSelectedAnswerIndex(null);
    setIsAnswerSubmitted(false);

    if (currentQuestionIndex + 1 < shuffledQuizData.length) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setCurrentPage('results');
    }
  };
  
  // Handle moving to the previous question
  const handlePreviousQuestion = () => {
    if (!isAnswerSubmitted) {
      setNavigationWarning(`Please answer the current question before moving back. Your current score is ${score}.`);
      return;
    }
    setNavigationWarning('');
    setShowHint(false);
    setSelectedAnswerIndex(null);
    setIsAnswerSubmitted(false);
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const getButtonClass = (index) => {
    if (!isAnswerSubmitted) {
      return "bg-white text-gray-800 hover:bg-yellow-200 transition-colors";
    }

    if (shuffledQuizData[currentQuestionIndex].answerOptions[index].isCorrect) {
      return "bg-green-500 text-white shadow-lg border-2 border-green-700";
    } else if (index === selectedAnswerIndex) {
      return "bg-red-500 text-white shadow-lg border-2 border-red-700";
    } else {
      return "bg-gray-300 text-gray-500 cursor-not-allowed";
    }
  };

  const getIcon = (index) => {
    if (!isAnswerSubmitted) return null;
    if (shuffledQuizData[currentQuestionIndex].answerOptions[index].isCorrect) {
      return <CheckCircle2 className="w-5 h-5 mr-2" />;
    } else if (index === selectedAnswerIndex) {
      return <XCircle className="w-5 h-5 mr-2" />;
    }
    return null;
  };

  // ----------------------------------------------------
  // RENDER SECTIONS BASED ON currentPage STATE
  // ----------------------------------------------------

  // 1. Render the Home Page
  if (currentPage === 'home') {
    return (
      <div className="flex items-center justify-center h-screen bg-yellow-100 p-4 font-sans">
        <div className="w-full max-w-xl p-8 bg-white rounded-3xl shadow-2xl border-4 border-yellow-500 text-center transform transition-all duration-500 scale-100 hover:scale-105">
          <h1 className="text-5xl font-extrabold text-yellow-600 mb-4">
            Software Basics Quiz
          </h1>
          <p className="text-xl font-semibold text-gray-700 mb-6">
            Test your knowledge of hardware, software, and operating systems!
          </p>
          <button
            onClick={handleStartQuiz}
            className="w-fit mx-auto px-10 py-4 bg-yellow-500 text-white font-bold text-xl rounded-full shadow-lg hover:bg-yellow-600 transition-transform transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-yellow-300 flex items-center justify-center"
          >
            Start Quiz!
          </button>
        </div>
      </div>
    );
  }
  
  // 2. Render the Results Page
  if (currentPage === 'results') {
    return (
      <div className="flex items-center justify-center h-screen bg-yellow-100 p-4 font-sans">
        <div className="w-full max-w-xl p-8 bg-white rounded-3xl shadow-2xl border-4 border-yellow-500 text-center transform transition-all duration-500 scale-100 hover:scale-105">
          <h2 className="text-4xl font-extrabold text-yellow-600 mb-4">Quiz Complete! 🎉</h2>
          <p className="text-xl font-semibold text-gray-700 mb-6">
            You scored {score} out of {shuffledQuizData.length}.
          </p>
          <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 justify-center">
            <button
              // Now using the custom navigate function
              onClick={() => handleNavigate('/parts/prt2')}
              className="w-full sm:w-auto px-8 py-3 bg-gray-500 text-white font-bold text-lg rounded-full shadow-lg hover:bg-gray-600 transition-transform transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-gray-300 flex items-center justify-center"
            >
              <Home className="w-5 h-5 mr-2" />
              Go to Home Page
            </button>
            <button
              onClick={handleStartQuiz}
              className="w-full sm:w-auto px-8 py-3 bg-yellow-500 text-white font-bold text-lg rounded-full shadow-lg hover:bg-yellow-600 transition-transform transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-yellow-300 flex items-center justify-center"
            >
              <RefreshCcw className="w-5 h-5 mr-2" />
              Play Again!
            </button>
          </div>
        </div>
      </div>
    );
  }

  // 3. Render the Quiz Questions
  if (shuffledQuizData.length === 0) {
    // This case should be rare, but good for safety
    return (
      <div className="flex items-center justify-center h-screen bg-yellow-100 p-4 font-sans">
        <h2 className="text-3xl font-extrabold text-yellow-600">Loading Quiz...</h2>
      </div>
    );
  }

  const currentQuestion = shuffledQuizData[currentQuestionIndex];

  return (
    <div className="flex items-center justify-center h-screen bg-yellow-100 p-4 font-sans">
      <div className="w-full max-w-4xl p-6 md:p-10 bg-white rounded-3xl shadow-2xl border-4 border-yellow-500 transform transition-all duration-500 scale-100 hover:scale-105">
        <div className="flex justify-between items-center mb-4">
          <span className="text-xl font-bold text-gray-700">
            Question {currentQuestionIndex + 1} / {shuffledQuizData.length}
          </span>
          <span className="text-xl font-bold text-yellow-600">
            Score: {score}
          </span>
        </div>

        <div className="md:grid md:grid-cols-2 md:gap-8">
          <div className="flex flex-col">
            <div className="mb-6 bg-yellow-500 text-white p-4 rounded-xl shadow-md">
              <h3 className="text-xl font-semibold">{currentQuestion.question}</h3>
            </div>
            {showHint && (
              <div className="mt-4 p-4 rounded-xl bg-blue-100 border-l-4 border-blue-500 shadow-inner animate-fade-in">
                <h4 className="font-bold text-blue-600 mb-1">Hint:</h4>
                <p className="text-gray-700 text-sm md:text-base">{currentQuestion.hint}</p>
              </div>
            )}
            {isAnswerSubmitted && (
              <div className="mt-6 p-4 rounded-xl bg-gray-100 border-l-4 border-yellow-500 shadow-inner animate-fade-in">
                <h4 className={`font-bold ${currentQuestion.answerOptions[selectedAnswerIndex]?.isCorrect ? 'text-green-600' : 'text-red-600'}`}>
                  {currentQuestion.answerOptions[selectedAnswerIndex]?.isCorrect ? 'Correct!' : 'Incorrect!'}
                </h4>
                <p className="text-gray-700 mt-2 text-sm md:text-base">
                  {currentQuestion.answerOptions[selectedAnswerIndex]?.rationale}
                </p>
              </div>
            )}
            {navigationWarning && (
              <div className="mt-4 p-4 rounded-xl bg-red-100 border-l-4 border-red-500 shadow-inner animate-fade-in">
                <p className="text-red-700 font-semibold text-sm md:text-base">{navigationWarning}</p>
              </div>
            )}
          </div>

          <div className="flex flex-col justify-between mt-6 md:mt-0">
            <div className="space-y-4">
              {currentQuestion.answerOptions.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswerClick(index)}
                  disabled={isAnswerSubmitted}
                  className={`w-full flex items-center justify-between p-4 rounded-full font-semibold transition-transform duration-200 transform ${getButtonClass(index)}`}
                >
                  <span className="flex-1 text-left text-sm md:text-base">{option.text}</span>
                  {getIcon(index)}
                </button>
              ))}
            </div>

            <div className="mt-6 grid grid-cols-3 gap-4">
              <button
                onClick={handlePreviousQuestion}
                disabled={currentQuestionIndex === 0}
                className={`w-full px-6 py-3 font-bold rounded-full shadow-md transition-transform transform hover:scale-105 focus:outline-none focus:ring-4 flex items-center justify-center ${currentQuestionIndex > 0 ? 'bg-yellow-500 text-white hover:bg-yellow-600 focus:ring-yellow-300' : 'bg-gray-300 text-gray-500 cursor-not-allowed'}`}
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={() => setShowHint(!showHint)}
                className="w-full px-6 py-3 bg-blue-500 text-white font-semibold rounded-full shadow-md flex items-center justify-center hover:bg-blue-600 transition-colors transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-blue-300"
              >
                <Lightbulb className="w-5 h-5" />
              </button>
              <button
                onClick={handleNextQuestion}
                className={`w-full px-6 py-3 font-bold rounded-full shadow-md transition-transform transform hover:scale-105 focus:outline-none focus:ring-4 flex items-center justify-center ${isAnswerSubmitted ? 'bg-yellow-500 text-white hover:bg-yellow-600 focus:ring-yellow-300' : 'bg-gray-300 text-gray-500 cursor-not-allowed'}`}
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
            <button
                // Now using the custom navigate function
                onClick={() => handleNavigate('/parts/prt2')}
                className="mt-4 w-full px-6 py-3 bg-gray-500 text-white font-bold rounded-full shadow-md flex items-center justify-center hover:bg-gray-600 transition-transform transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-gray-300"
              >
                <Home className="w-5 h-5 mr-2" />
                Home
              </button>
          </div>
        </div>
      </div>
    </div>
  );
}
