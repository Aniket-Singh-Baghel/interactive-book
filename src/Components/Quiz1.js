import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Question Bank
const questionsData = [
  // Chapter 1: What is a Computer?
  {
    question: "What is a computer?",
    options: [
      "A helpful electronic machine",
      "A cupboard",
      "A car engine",
      "A machine that makes tea"
    ],
    answer: "A helpful electronic machine"
  },
  {
    question: "Which analogy best explains a computer?",
    options: [
      "A mixer grinder turning ingredients into a dish",
      "A bicycle carrying passengers",
      "A book storing stories",
      "A torch giving light"
    ],
    answer: "A mixer grinder turning ingredients into a dish"
  },
  {
    question: "Which of these is NOT a feature of a computer?",
    options: [
      "Processes data",
      "Stores information",
      "Brews coffee",
      "Runs programs"
    ],
    answer: "Brews coffee"
  },

  // Chapter 2: Main Parts (Hardware)
  {
    question: "Which part is called the brain of the computer?",
    options: ["CPU", "RAM", "Monitor", "Keyboard"],
    answer: "CPU"
  },
  {
    question: "Which is the short-term memory of a computer?",
    options: ["RAM", "SSD", "HDD", "CD Drive"],
    answer: "RAM"
  },
  {
    question: "Which analogy fits the main parts of a computer?",
    options: [
      "Human body with brain, memory, and storage",
      "Car with wheels, engine, and seats",
      "Tree with roots, trunk, and leaves",
      "House with rooms, doors, and windows"
    ],
    answer: "Human body with brain, memory, and storage"
  },

  // Chapter 3: CPU
  {
    question: "What does CPU stand for?",
    options: [
      "Central Processing Unit",
      "Computer Power Utility",
      "Central Performance Upgrade",
      "Control Program Unit"
    ],
    answer: "Central Processing Unit"
  },
  {
    question: "The CPU is like which role in a school?",
    options: ["Headmaster", "Peon", "Student", "Librarian"],
    answer: "Headmaster"
  },
  {
    question: "Which is NOT a function of the CPU?",
    options: [
      "Processing data",
      "Storing clothes",
      "Running programs",
      "Controlling tasks"
    ],
    answer: "Storing clothes"
  },

  // Chapter 4: Memory & Storage
  {
    question: "RAM is like which part of a kitchen?",
    options: [
      "Kitchen countertop for immediate work",
      "Fridge for cold storage",
      "Sink for washing dishes",
      "Dining table for serving food"
    ],
    answer: "Kitchen countertop for immediate work"
  },
  {
    question: "Which is permanent storage?",
    options: ["Hard Drive/SSD", "RAM", "Cache", "Clipboard"],
    answer: "Hard Drive/SSD"
  },
  {
    question: "Hard drive is like which household item?",
    options: [
      "Steel almirah for long-term storage",
      "Cooking pot for making food",
      "Light bulb for brightness",
      "TV for entertainment"
    ],
    answer: "Steel almirah for long-term storage"
  },

  // Chapter 5: Input & Output
  {
    question: "Which is an input device?",
    options: ["Keyboard", "Monitor", "Printer", "Speakers"],
    answer: "Keyboard"
  },
  {
    question: "Which is an output device?",
    options: ["Monitor", "Keyboard", "Mouse", "Scanner"],
    answer: "Monitor"
  },
  {
    question: "Analogy for input and output devices?",
    options: [
      "Writing a letter and reading the reply",
      "Driving a car and parking it",
      "Cooking food and washing dishes",
      "Planting a tree and watering it"
    ],
    answer: "Writing a letter and reading the reply"
  }
];

// Shuffle helper
function shuffleArray(array) {
  return [...array].sort(() => Math.random() - 0.5);
}

export default function Quiz() {
  const [questions, setQuestions] = useState(shuffleArray(questionsData));
  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);

  const handleAnswer = (selectedOption) => {
    if (selectedOption === questions[current].answer) {
      setScore(score + 1);
    }
    setTimeout(() => {
      if (current + 1 < questions.length) {
        setCurrent(current + 1);
      } else {
        setFinished(true);
      }
    }, 400);
  };

  const tryAgain = () => {
    setQuestions(shuffleArray(questionsData));
    setCurrent(0);
    setScore(0);
    setFinished(false);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-blue-400 to-purple-500 p-4">
      <div className="bg-white rounded-2xl shadow-lg p-6 w-full max-w-lg text-center">
        {!finished ? (
          <>
            {/* Progress */}
            <div className="mb-4">
              <div className="text-lg font-bold mb-2">
                Question {current + 1} / {questions.length}
              </div>
              <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden">
                <motion.div
                  className="bg-green-500 h-2"
                  initial={{ width: 0 }}
                  animate={{
                    width: `${((current + 1) / questions.length) * 100}%`
                  }}
                  transition={{ duration: 0.4 }}
                />
              </div>
            </div>

            {/* Question Animation */}
            <AnimatePresence mode="wait">
              <motion.div
                key={current}
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.4 }}
              >
                <h2 className="text-xl font-semibold mb-4">
                  {questions[current].question}
                </h2>
                <div className="space-y-3">
                  {questions[current].options.map((opt, index) => (
                    <motion.button
                      whileTap={{ scale: 0.95 }}
                      key={index}
                      onClick={() => handleAnswer(opt)}
                      className="w-full bg-gray-100 hover:bg-blue-100 text-lg py-2 rounded-lg shadow"
                    >
                      {opt}
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          </>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-2xl font-bold mb-4">🎉 Quiz Finished!</h2>
            <p className="mb-4">
              Your Score: {score} / {questions.length}
            </p>
            <button
              onClick={tryAgain}
              className="px-6 py-2 bg-green-500 text-white rounded-lg shadow hover:bg-green-600"
            >
              Try Again 🔄
            </button>
          </motion.div>
        )}
      </div>
    </div>
  );
}
