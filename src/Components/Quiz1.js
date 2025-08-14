import React, { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaHome,FaArrowRight, FaArrowLeft,  } from "react-icons/fa";
import { Link } from "react-router-dom";
import {
  Card,
  CardContent,
  Button,
  Chip,
  LinearProgress,
  Alert,
  IconButton,
} from "@mui/material";
import ReplayIcon from "@mui/icons-material/Replay";
import LightbulbIcon from "@mui/icons-material/Lightbulb";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import "@fontsource/comic-neue"; // fun, cartoonish font

// --- helpers ---
const shuffle = (arr) => {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
};

export default function AnimatedQuiz() {
  // --- quiz data lives in the same file ---
  const baseQuizData = useMemo(
    () => [
      {
        question:
          "A computer is like a helpful electronic machine. Which of the following is the best analogy for a computer's ability to process information and follow instructions?",
        options: [
          "A blank canvas waiting for an artist.",
          "A library full of books.",
          "A television that only displays images.",
          "A skilled chef following a recipe.",
        ],
        answer: "A skilled chef following a recipe.",
        hint:
          "Who follows step-by-step instructions to create a final result?",
        explanation:
          "Like a chef following a recipe, a computer follows a program (instructions) to process data and produce an output.",
      },
      {
        question:
          "Hardware is to a computer as a skeleton and organs are to a human body. Which of the following is an example of computer hardware?",
        options: [
          "A text document you typed.",
          "A mouse and a keyboard.",
          "A video game application.",
          "The computer's operating system.",
        ],
        answer: "A mouse and a keyboard.",
        hint: "It’s something you can physically touch.",
        explanation:
          "Hardware includes physical components such as the mouse, keyboard, monitor, and CPU box.",
      },
      {
        question:
          "The CPU (Central Processing Unit) is often called the brain of the computer. Which task is primarily handled by the CPU?",
        options: [
          "Displaying images and text on the monitor.",
          "Storing photos and videos for long-term access.",
          "Performing millions of calculations per second to run a program.",
          "Saving a file to a USB flash drive.",
        ],
        answer:
          "Performing millions of calculations per second to run a program.",
        hint: "Which component does the 'thinking' and calculations?",
        explanation:
          "The CPU executes instructions and performs calculations that allow software to run.",
      },
      {
        question:
          "RAM is like a chef's cutting board for active ingredients. Which is a characteristic of RAM?",
        options: [
          "It has a much larger capacity than a hard drive.",
          "It provides faster access to data than a hard drive.",
          "It’s used for long-term file storage.",
          "It stores data permanently, even when power is off.",
        ],
        answer: "It provides faster access to data than a hard drive.",
        hint: "Which one is fast but temporary?",
        explanation:
          "RAM is fast, temporary memory used while programs are running; contents are lost when power is off.",
      },
      {
        question:
          "Which of the following can be both an input and an output device?",
        options: [
          "A standard desktop monitor.",
          "A keyboard.",
          "A touchscreen monitor.",
          "A printer.",
        ],
        answer: "A touchscreen monitor.",
        hint: "You can touch it to send input and see output on it.",
        explanation:
          "A touchscreen both displays information (output) and receives touch input from the user.",
      },
      {
        question:
          "Which characteristic distinguishes a computer from a simple calculator?",
        options: [
          "A computer can only perform arithmetic operations.",
          "A computer has a physical keyboard.",
          "A computer can display numbers.",
          "A computer can be programmed to store and execute a sequence of instructions.",
        ],
        answer:
          "A computer can be programmed to store and execute a sequence of instructions.",
        hint: "Think about programmability, not just calculation.",
        explanation:
          "Computers are general-purpose and programmable; calculators mainly do arithmetic.",
      },
      {
        question:
          "A hard drive is primarily a storage device. What happens to its data when the computer is shut down?",
        options: [
          "It is moved to the RAM.",
          "It is completely erased.",
          "It is compressed to save space.",
          "It remains intact and can be accessed on startup.",
        ],
        answer: "It remains intact and can be accessed on startup.",
        hint: "Hard drives are for permanent storage.",
        explanation:
          "Data on hard drives/SSDs persists even when the computer is powered off.",
      },
      {
        question:
          "Consider a computer's motherboard. Which description is best?",
        options: [
          "It is the main circuit board that connects all the computer's components.",
          "It is a device for displaying visual information.",
          "It is an input device used to enter data.",
          "It stores all permanent files and documents.",
        ],
        answer:
          "It is the main circuit board that connects all the computer's components.",
        hint: "Think of the board that everything plugs into.",
        explanation:
          "The motherboard provides electrical connections and communication pathways between components.",
      },
      {
        question:
          "In computer hardware, what does the term 'peripheral' refer to?",
        options: [
          "The main circuit board of the computer.",
          "The software that runs on the computer.",
          "The internal components of the CPU.",
          "Any external device that connects to and is controlled by the computer.",
        ],
        answer:
          "Any external device that connects to and is controlled by the computer.",
        hint: "Examples: mouse, printer, webcam.",
        explanation:
          "Peripherals are external devices like mice, printers, scanners, and webcams.",
      },
      {
        question:
          "A digital camera connected to a computer to transfer photos is an example of which type of device?",
        options: [
          "Storage device.",
          "Output device.",
          "Processing device.",
          "Input device.",
        ],
        answer: "Input device.",
        hint: "It sends data (photos) into the computer.",
        explanation:
          "When transferring photos to a computer, the camera acts as an input device.",
      },
      {
        question: "Which analogy fits RAM best?",
        options: [
          "A communication network that connects offices.",
          "A temporary workbench where projects are actively being worked on.",
          "A long-term storage warehouse for all goods.",
          "A company’s official filing cabinet for important documents.",
        ],
        answer:
          "A temporary workbench where projects are actively being worked on.",
        hint: "Short-term, active workspace.",
        explanation:
          "RAM is like a workspace used for tasks in progress; data is not stored permanently.",
      },
      {
        question: "CPU performance in GHz primarily indicates:",
        options: [
          "The number of cycles the CPU can execute per second.",
          "The size of the CPU's physical components.",
          "How many different types of software it can run.",
          "The amount of data the CPU can store permanently.",
        ],
        answer: "The number of cycles the CPU can execute per second.",
        hint: "It’s a speed/frequency measure.",
        explanation:
          "GHz measures clock speed: billions of cycles per second.",
      },
      {
        question: "Which is an example of a computer’s output?",
        options: [
          "Typing a letter on the keyboard.",
          "A song playing through speakers.",
          "Saving a file to the hard drive.",
          "Clicking a mouse button.",
        ],
        answer: "A song playing through speakers.",
        hint: "Output = computer sends information to you.",
        explanation:
          "Sound from speakers is information going out from the computer to the user.",
      },
      {
        question:
          "To run a video editing program, which sequence is correct?",
        options: [
          "The program is loaded from RAM into the CPU's cache, then executed.",
          "The program is loaded from the hard drive into RAM, then executed by the CPU.",
          "The CPU directly executes the program from the hard drive.",
          "The program is loaded from RAM into the hard drive, then executed by the CPU.",
        ],
        answer:
          "The program is loaded from the hard drive into RAM, then executed by the CPU.",
        hint: "Storage → RAM → CPU.",
        explanation:
          "Programs are read from storage into RAM, and the CPU executes instructions from RAM.",
      },
    ],
    []
  );

  // we keep a working copy we can shuffle/reset
  const [quiz, setQuiz] = useState(() => shuffle(baseQuizData));
  const [idx, setIdx] = useState(0);
  const [selected, setSelected] = useState(null);
  const [lockedCorrect, setLockedCorrect] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [score, setScore] = useState(0);

  const q = quiz[idx];

  const handlePick = (opt) => {
    // if already got it correct, block further changes
    if (lockedCorrect) return;

    setSelected(opt);

    if (opt === q.answer) {
      setLockedCorrect(true);
      setScore((s) => s + 1);
    }
  };

  const next = () => {
    if (idx < quiz.length - 1) {
      setIdx((i) => i + 1);
      setSelected(null);
      setLockedCorrect(false);
      setShowHint(false);
    }
  };

  const prev = () => {
    if (idx > 0) {
      setIdx((i) => i - 1);
      setSelected(null);
      setLockedCorrect(false);
      setShowHint(false);
    }
  };

  const resetShuffle = () => {
    setQuiz(shuffle(baseQuizData));
    setIdx(0);
    setSelected(null);
    setLockedCorrect(false);
    setShowHint(false);
    setScore(0);
  };

  const progress = Math.round(((idx + 1) / quiz.length) * 100);
  const isCorrect = selected && selected === q.answer;
  const isWrong = selected && selected !== q.answer;

  return (
    <div
      className="min-h-screen w-full flex flex-col items-center p-6 bg-gradient-to-br from-yellow-100 via-pink-100 to-blue-100"
      style={{ fontFamily: "'Comic Neue', cursive" }}
    >
      <div className="flex justify-center mb-6">
        <Link
          to="/parts/prt1"
          className="inline-flex items-center px-4 py-2 bg-white rounded-full shadow-md border border-gray-200 hover:bg-gray-100 transition"
        >
          <FaHome className="mr-2 text-indigo-600" />
          Home
        </Link>
      </div>

      <div className="w-full max-w-3xl">
        {/* Header row */}
        <div className="flex items-center justify-between mb-3">
          <Chip
            label={`Question ${idx + 1} / ${quiz.length}`}
            color="primary"
            className="!bg-pink-500 !text-white !font-bold"
          />
          <Chip
            label={`Score: ${score}`}
            className="!bg-green-500 !text-white !font-bold"
          />
        </div>

        <LinearProgress
          variant="determinate"
          value={progress}
          className="!h-3 !rounded-full !bg-white"
        />

        <div className="flex items-center justify-between mt-4">
          <IconButton
            onClick={prev}
            disabled={idx === 0}
            className="!bg-white hover:!bg-pink-50 shadow"
          >
            <ArrowBackIcon />
          </IconButton>
          <Button
            onClick={resetShuffle}
            startIcon={<ReplayIcon />}
            className="!bg-violet-500 hover:!bg-violet-600 !text-white !font-bold rounded-full shadow"
          >
            Reset & Shuffle
          </Button>
          <IconButton
            onClick={next}
            disabled={idx === quiz.length - 1}
            className="!bg-white hover:!bg-pink-50 shadow"
          >
            <ArrowForwardIcon />
          </IconButton>
        </div>

        {/* Card */}
        <AnimatePresence mode="wait">
          <motion.div
            key={idx}
            initial={{ y: 30, opacity: 0, scale: 0.98 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: -30, opacity: 0, scale: 0.98 }}
            transition={{ type: "spring", stiffness: 120, damping: 15 }}
            className="mt-5"
          >
            <Card className="shadow-2xl border-4 border-pink-300 rounded-3xl">
              <CardContent className="p-6">
                {/* Question */}
                <motion.h2
                  initial={{ x: -12, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.05 }}
                  className="text-2xl font-extrabold text-purple-700 mb-4"
                >
                  {q.question}
                </motion.h2>

                {/* Options */}
                <div className="grid gap-3">
                  {q.options.map((opt) => {
                    const chosen = selected === opt;
                    const correct = opt === q.answer;

                    // dynamic styles
                    const base =
                      "w-full text-left rounded-2xl px-4 py-3 font-bold shadow transition";
                    const idle =
                      "bg-yellow-200 hover:bg-yellow-300 border-2 border-yellow-400";
                    const pickedWrong =
                      "bg-red-200 border-2 border-red-500";
                    const pickedRight =
                      "bg-green-200 border-2 border-green-500";
                    const revealedRight =
                      "bg-green-100 border-2 border-green-400";

                    let cls = `${base} ${idle}`;
                    if (selected) {
                      if (chosen && correct) cls = `${base} ${pickedRight}`;
                      else if (chosen && !correct)
                        cls = `${base} ${pickedWrong}`;
                      else if (!chosen && correct)
                        cls = `${base} ${revealedRight}`;
                      else cls = `${base} ${idle}`;
                    }

                    return (
                      <motion.button
                        key={opt}
                        whileHover={{ scale: lockedCorrect ? 1 : 1.02 }}
                        whileTap={{ scale: lockedCorrect ? 1 : 0.98 }}
                        onClick={() => handlePick(opt)}
                        disabled={lockedCorrect}
                        className={cls}
                      >
                        {opt}
                      </motion.button>
                    );
                  })}
                </div>

                {/* Hint toggle */}
                <div className="mt-4 flex items-center gap-2">
                  <Button
                    startIcon={<LightbulbIcon />}
                    variant="outlined"
                    onClick={() => setShowHint((s) => !s)}
                    className="!border-orange-400 !text-orange-600 !font-bold rounded-full"
                  >
                    {showHint ? "Hide Hint" : "Show Hint"}
                  </Button>
                  {showHint && (
                    <motion.span
                      initial={{ opacity: 0, x: 8 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="text-orange-600 font-bold"
                    >
                      💡 {q.hint}
                    </motion.span>
                  )}
                </div>

                {/* Feedback */}
                <div className="mt-4">
                  {isCorrect && (
                    <Alert
                      icon={<CheckCircleOutlineIcon fontSize="inherit" />}
                      severity="success"
                      className="rounded-2xl"
                    >
                      Correct! {q.explanation}
                    </Alert>
                  )}
                  {isWrong && (
                    <Alert
                      icon={<HighlightOffIcon fontSize="inherit" />}
                      severity="error"
                      className="rounded-2xl"
                    >
                      Not quite. {q.explanation}
                    </Alert>
                  )}
                </div>

                {/* Next button (also in header icons, but this is big+friendly) */}
                <div className="mt-6 flex justify-end">
                  <Button
                    endIcon={<ArrowForwardIcon />}
                    onClick={next}
                    disabled={idx === quiz.length - 1}
                    className="!bg-green-500 hover:!bg-green-600 !text-white !font-bold rounded-full shadow"
                  >
                    Next Question
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </AnimatePresence>
        <Link to="/part1/chapters/ch5" className="fixed left-4 top-1/2 transform -translate-y-1/2 bg-white border border-gray-200 rounded-full p-3 shadow hover:bg-gray-100 transition" aria-label="Previous chapter">
          <FaArrowLeft className="text-lg text-indigo-600" />
        </Link>
        <Link to="/parts/prt1" className="fixed right-4 top-1/2 transform -translate-y-1/2 bg-white border border-gray-200 rounded-full p-3 shadow hover:bg-gray-100 transition" aria-label="Next chapter">
          <FaArrowRight className="text-lg text-indigo-600" />
        </Link>
      </div>
    </div>
  );
}
