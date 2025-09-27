import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Card,
  CardContent,
  Button,
  Chip,
  LinearProgress,
  Alert,
} from "@mui/material";
import LightbulbIcon from "@mui/icons-material/Lightbulb";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";

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
  isAnswerSubmitted,
  isCorrect,
  isWrong,
  showHint,
  setShowHint,
  handlePick,
  next,
}) => {
  if (!translatedQ) {
    return null;
  }

  const selectedOpt =
    selectedOptionIndex !== null
      ? translatedQ.options[selectedOptionIndex]
      : null;

  const timerColor = timeLeft < 60 ? "!bg-red-500" : "!bg-blue-500";
  const timerPulse = timeLeft < 60 ? { scale: [1, 1.05, 1], transition: { duration: 1, repeat: Infinity } } : {};

  return (
    <div
      className="min-h-screen w-full flex flex-col items-center p-6 bg-gradient-to-br from-yellow-100 via-pink-100 to-blue-100"
      style={{ fontFamily: "'Comic Neue', cursive" }}
    >
      <div className="w-full max-w-3xl">
        <div className="flex items-center justify-end mb-3">
          <div className="flex space-x-2">
            <button onClick={() => setLang("en")} className={`px-3 py-1 rounded-lg border font-semibold ${lang === "en" ? "bg-sky-600 text-white border-sky-600" : "bg-white text-gray-700 border-gray-300"} transition`}>EN</button>
            <button onClick={() => setLang("hi")} className={`px-3 py-1 rounded-lg border font-semibold ${lang === "hi" ? "bg-sky-600 text-white border-sky-600" : "bg-white text-gray-700 border-gray-300"} transition`}>हिं</button>
          </div>
        </div>

        <div className="flex items-center justify-between mb-3">
          <Chip
            label={`${t.question} ${idx + 1} / ${quizData.length}`}
            color="primary"
            className="!bg-pink-500 !text-white !font-bold"
          />
          <motion.div
            animate={timerPulse}
            className={`text-white font-bold py-2 px-4 text-lg rounded-full shadow-lg ${timerColor}`}
          >
            {`${Math.floor(timeLeft / 60)}:${String(
              timeLeft % 60
            ).padStart(2, "0")}`}
          </motion.div>
          <Chip
            label={`${t.score}: ${score}`}
            className="!bg-green-500 !text-white !font-bold"
          />
        </div>

        <LinearProgress
          variant="determinate"
          value={progress}
          className="!h-3 !rounded-full !bg-white"
        />

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
                <motion.h2
                  initial={{ x: -12, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.05 }}
                  className="text-2xl font-extrabold text-purple-700 mb-4"
                >
                  {translatedQ.question}
                </motion.h2>

                <div className="grid gap-3">
                  {translatedQ.options.map((opt, index) => {
                    const chosen = selectedOptionIndex === index;

                    const base =
                      "w-full text-left rounded-2xl px-4 py-3 font-bold shadow transition";
                    const idle =
                      "bg-yellow-200 hover:bg-yellow-300 border-2 border-yellow-400";
                    let cls = `${base} ${idle}`;

                    if (isAnswerSubmitted) {
                      if (chosen) {
                        if (opt.isCorrect) {
                          cls = `${base} bg-green-200 border-2 border-green-500`;
                        } else {
                          cls = `${base} bg-red-200 border-2 border-red-500`;
                        }
                      } else {
                        cls = `${base} ${idle} opacity-60`;
                      }
                    }

                    return (
                      <motion.button
                        key={opt.text}
                        whileHover={{ scale: isAnswerSubmitted ? 1 : 1.02 }}
                        whileTap={{ scale: isAnswerSubmitted ? 1 : 0.98 }}
                        onClick={() => handlePick(opt, index)}
                        disabled={isAnswerSubmitted}
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
                    className="!border-orange-400 !text-orange-600 !font-bold rounded-full"
                  >
                    {showHint ? t.hideHint : t.showHint}
                  </Button>
                  {showHint && (
                    <motion.span
                      initial={{ opacity: 0, x: 8 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="text-orange-600 font-bold"
                    >
                      💡 {translatedQ.hint}
                    </motion.span>
                  )}
                </div>

                <div className="mt-4">
                  {isCorrect && (
                    <Alert
                      icon={<CheckCircleOutlineIcon fontSize="inherit" />}
                      severity="success"
                      className="rounded-2xl"
                    >
                      {selectedOpt.rationale}
                    </Alert>
                  )}
                  {isWrong && (
                    <Alert
                      icon={<HighlightOffIcon fontSize="inherit" />}
                      severity="error"
                      className="rounded-2xl"
                    >
                      {selectedOpt.rationale}
                    </Alert>
                  )}
                </div>

                <div className="mt-6 flex justify-end">
                  <Button
                    endIcon={<ArrowForwardIcon />}
                    onClick={next}
                    disabled={!isAnswerSubmitted}
                    className="!bg-green-500 hover:!bg-green-600 !text-white !font-bold rounded-full shadow"
                  >
                    {idx === quizData.length - 1 ? t.submit : t.nextQuestion}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default QuizScreen;