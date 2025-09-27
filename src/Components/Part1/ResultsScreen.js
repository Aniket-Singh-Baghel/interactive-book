import React, { useEffect } from "react";
import { Card, Button } from "@mui/material";
import { FaStar } from "react-icons/fa";
import ReplayIcon from "@mui/icons-material/Replay";
import { motion } from "framer-motion";
import confetti from "canvas-confetti";
import { useNavigate } from "react-router-dom";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";


const ResultsScreen = ({ t, score, quizDataLength, resetQuiz, studentName, timeUp }) => {
  const navigate = useNavigate();
  let grade = "";
  let stars = 0;
  let motivationalMessage = "";

  if (score < 6) {
    grade = t.results.failed;
    motivationalMessage = (t.results.failedMessage || "").replace('{studentName}', studentName);
  } else if (score < 10) {
    grade = t.results.passed;
    motivationalMessage = (t.results.passedMessage || "").replace('{studentName}', studentName);
  } else if (score < 12) {
    grade = t.results.c_grade;
    motivationalMessage = (t.results.c_gradeMessage || "").replace('{studentName}', studentName);
  } else if (score < 15) {
    grade = t.results.b_grade;
    motivationalMessage = (t.results.b_gradeMessage || "").replace('{studentName}', studentName);
  } else if (score < 18) {
    grade = t.results.a_grade;
    motivationalMessage = (t.results.a_gradeMessage || "").replace('{studentName}', studentName);
    stars = 3;
  } else {
    grade = t.results.excellent;
    motivationalMessage = (t.results.excellentMessage || "").replace('{studentName}', studentName);
    stars = 5;
  }

  useEffect(() => {
    if (score >= 18) {
      confetti({
        particleCount: 150,
        spread: 90,
        origin: { y: 0.6 },
      });
    }
  }, [score]);

  return (
    <div
      className="min-h-screen w-full flex flex-col items-center justify-center p-6 bg-gradient-to-br from-yellow-100 via-pink-100 to-blue-100"
      style={{ fontFamily: "'Comic Neue', cursive" }}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="shadow-2xl border-4 border-pink-300 rounded-3xl p-8 text-center max-w-lg">
          <h1 className="text-4xl font-extrabold text-purple-700 mb-2">
            {timeUp ? t.timesUp : t.quizComplete}
          </h1>
          {timeUp && <p className="text-red-500 font-bold mb-4">Sorry, you ran out of time!</p>}
          <p className="text-2xl font-bold text-gray-700 mb-4">
            {t.score}: {score} / {quizDataLength}
          </p>
          <p className="text-2xl font-bold text-blue-600 mb-4">{grade}</p>
          <div className="flex justify-center mb-4">
            {Array(stars)
              .fill(0)
              .map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: i * 0.1 }}
                >
                  <FaStar className="text-yellow-400 text-4xl mx-1" />
                </motion.div>
              ))}
          </div>
          <p className="text-lg text-gray-600 mb-6">{motivationalMessage}</p>
          <div className="flex justify-center space-x-4">
            <Button
              onClick={resetQuiz}
              variant="contained"
              size="large"
              startIcon={<ReplayIcon />}
              className="!bg-green-500 hover:!bg-green-600 !text-white !font-bold rounded-full shadow"
            >
              {t.playAgain}
            </Button>
            <Button
              onClick={() => navigate("/part1/peripherals")}
              variant="contained"
              size="large"
              endIcon={<ArrowForwardIcon />}
              className="!bg-blue-500 hover:!bg-blue-600 !text-white !font-bold rounded-full shadow"
            >
              Next Page
            </Button>
          </div>
        </Card>
      </motion.div>
    </div>
  );
};

export default ResultsScreen;