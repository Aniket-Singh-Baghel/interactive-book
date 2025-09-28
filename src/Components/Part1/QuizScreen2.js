import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Card,
  CardContent,
  Button,
  Chip,
  LinearProgress,
} from "@mui/material";
import LightbulbIcon from "@mui/icons-material/Lightbulb";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import BookmarkIcon from '@mui/icons-material/Bookmark';

const QuizScreen = ({
  t,
  lang,
  setLang,
  idx,
  quizData,
  timeLeft,
  score,
  progress,
  translatedQ,
  selectedOptionIndex,
  showHint,
  setShowHint,
  handlePick,
  next,
  questionStatuses,
  navigateToQuestion,
  markForReview,
  allQuestionsAttempted,
}) => {
  if (!translatedQ) {
    return null;
  }

  const timerColor = timeLeft < 60 ? "!bg-red-500" : "!bg-teal-500";
  const timerPulse = timeLeft < 60 ? { scale: [1, 1.1, 1], transition: { duration: 0.7, repeat: Infinity } } : {};

  const getButtonText = () => {
    if (idx === quizData.length - 1) {
      return t.submit;
    }
    return selectedOptionIndex !== null ? t.nextQuestion : "Skip";
  };

  return (
    <div
      className="min-h-screen w-full flex flex-col items-center justify-center p-4 sm:p-6 bg-gradient-to-br from-lime-200 via-yellow-200 to-orange-200"
      style={{ fontFamily: "'Roboto', sans-serif" }}
    >
      <div className="w-full max-w-4xl">
        <div className="flex items-center justify-end mb-3">
          <div className="flex space-x-2">
            <button onClick={() => setLang("en")} className={`px-3 py-1 rounded-lg border-2 font-semibold ${lang === "en" ? "bg-purple-600 text-white border-purple-700" : "bg-white/80 text-gray-800 border-purple-400"} transition`}>EN</button>
            <button onClick={() => setLang("hi")} className={`px-3 py-1 rounded-lg border-2 font-semibold ${lang === "hi" ? "bg-purple-600 text-white border-purple-700" : "bg-white/80 text-gray-800 border-purple-400"} transition`}>हिं</button>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between mb-3 space-y-2 sm:space-y-0">
          <Chip
            label={`${t.question} ${idx + 1} / ${quizData.length}`}
            className="!bg-pink-400 !text-white !font-bold"
          />
          <motion.div
            animate={timerPulse}
            className={`text-white font-bold py-1 px-4 text-lg rounded-full shadow-lg ${timerColor}`}
          >
            {`${Math.floor(timeLeft / 60)}:${String(
              timeLeft % 60
            ).padStart(2, "0")}`}
          </motion.div>
          <Chip
            label={`${t.score}: ${score}`}
            className="!bg-yellow-500 !text-black !font-bold"
          />
        </div>

        <LinearProgress
          variant="determinate"
          value={progress}
          className="!h-3 !rounded-full !bg-white/80"
          sx={{
            '& .MuiLinearProgress-bar': {
              background: 'linear-gradient(to right, #ec4899, #f59e0b)'
            }
          }}
        />

        <div className="flex flex-col lg:flex-row gap-4 mt-5">
          <div className="w-full lg:w-3/4 order-2 lg:order-1">
            <AnimatePresence mode="wait">
              <motion.div
                key={idx}
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -30, opacity: 0 }}
                transition={{ type: "spring", stiffness: 120, damping: 15 }}
              >
                <Card className="shadow-2xl border-4 border-dashed border-purple-500 rounded-2xl bg-white/70 backdrop-blur-sm">
                  <CardContent className="p-5 sm:p-6">
                    <motion.h2
                      initial={{ x: -12, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: 0.05 }}
                      className="text-lg sm:text-2xl font-creepster text-purple-700 mb-6 text-center"
                    >
                      {translatedQ.question}
                    </motion.h2>

                    <div className="grid gap-3">
                      {translatedQ.options.map((opt, index) => {
                        const chosen = selectedOptionIndex === index;

                        const base = "w-full text-left rounded-xl px-4 py-3 font-semibold shadow-md transition text-gray-800";
                        const idle = "bg-cyan-200 hover:bg-cyan-300 border-2 border-cyan-400 hover:border-cyan-500";
                        let cls = `${base} ${idle}`;
                        
                        if (chosen) {
                          cls = `${base} bg-purple-400 text-white border-2 border-purple-600`;
                        }

                        return (
                          <motion.button
                            key={opt.text}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => handlePick(opt, index)}
                            className={cls}
                          >
                            {opt.text}
                          </motion.button>
                        );
                      })}
                    </div>

                    <div className="mt-4 flex items-center gap-2">
                      <Button
                        startIcon={<LightbulbIcon />}
                        variant="outlined"
                        onClick={() => setShowHint((s) => !s)}
                        className="!border-orange-500 !text-orange-600 hover:!bg-orange-100 !font-bold rounded-full"
                      >
                        {showHint ? t.hideHint : t.showHint}
                      </Button>
                      {showHint && (
                        <motion.span
                          initial={{ opacity: 0, x: 8 }}
                          animate={{ opacity: 1, x: 0 }}
                          className="text-orange-700 font-semibold"
                        >
                          💡 {translatedQ.hint}
                        </motion.span>
                      )}
                    </div>

                    <div className="mt-6 flex flex-col sm:flex-row justify-between items-center gap-4 sm:gap-2">
                      <Button
                        startIcon={<BookmarkIcon />}
                        onClick={markForReview}
                        disabled={selectedOptionIndex === null}
                        variant="outlined"
                        className="!border-yellow-500 !text-yellow-600 hover:!bg-yellow-100 !font-bold rounded-full"
                      >
                        Review
                      </Button>
                      <div className="flex gap-2">
                        <Button
                          endIcon={<ArrowForwardIcon />}
                          onClick={next}
                          disabled={idx === quizData.length - 1 && !allQuestionsAttempted}
                          className="!bg-gradient-to-r !from-pink-500 !to-yellow-500 hover:!from-pink-600 hover:!to-yellow-600 !text-white !font-bold rounded-full shadow-lg !px-6 !py-3 !text-lg transition-all duration-300"
                        >
                          {getButtonText()}
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="w-full lg:w-1/4 mt-4 lg:mt-0 order-1 lg:order-2">
            <Card className="shadow-lg rounded-2xl bg-white/70 backdrop-blur-sm">
              <CardContent>
                <h3 className="font-bold text-lg mb-3 text-center text-purple-800">Questions</h3>
                <div className="grid grid-cols-6 sm:grid-cols-8 md:grid-cols-10 lg:grid-cols-5 gap-2">
                  {Array.from({ length: quizData.length }, (_, i) => {
                    const status = questionStatuses[i];
                    let style = "bg-gray-200 text-gray-800 border-gray-300";
                    if (status === 'answered') style = "bg-green-500 text-white border-green-600";
                    if (status === 'skipped') style = "bg-transparent text-gray-800 border-gray-400";
                    if (status === 'markedForReview') style = "bg-yellow-400 text-white border-yellow-500";
                    if (i === idx) style += " ring-2 ring-blue-500";

                    return (
                      <button
                        key={i}
                        onClick={() => navigateToQuestion(i)}
                        className={`h-9 w-9 rounded-lg flex items-center justify-center font-bold border-2 transition-all duration-200 ${style}`}
                      >
                        {i + 1}
                      </button>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuizScreen;