import React from "react";
import { Card, Button } from "@mui/material";
import { FaStar } from "react-icons/fa";
import ReplayIcon from "@mui/icons-material/Replay";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

const ResultsScreen = ({ t, score, quizDataLength, resetQuiz, studentName, timeUp }) => {
  const navigate = useNavigate();
  let grade = "";
  let stars = 0;
  let motivationalMessage = "";
  const percentage = (score / quizDataLength) * 100;

  if (percentage < 40) {
    grade = t.results.failed;
    motivationalMessage = (t.results.failedMessage || "").replace('{studentName}', studentName);
    stars = 1;
  } else if (percentage < 60) {
    grade = t.results.passed;
    motivationalMessage = (t.results.passedMessage || "").replace('{studentName}', studentName);
    stars = 2;
  } else if (percentage < 80) {
    grade = t.results.c_grade;
    motivationalMessage = (t.results.c_gradeMessage || "").replace('{studentName}', studentName);
    stars = 3;
  } else if (percentage < 95) {
    grade = t.results.b_grade;
    motivationalMessage = (t.results.b_gradeMessage || "").replace('{studentName}', studentName);
    stars = 4;
  } else {
    grade = t.results.excellent;
    motivationalMessage = (t.results.excellentMessage || "").replace('{studentName}', studentName);
    stars = 5;
  }

  return (
    <div
      className="min-h-screen w-full flex flex-col items-center justify-center p-4 sm:p-6 bg-gradient-to-br from-lime-200 via-yellow-200 to-orange-200"
      style={{ fontFamily: "'Roboto', sans-serif" }}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.8, y: 50 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.5, type: "spring" }}
      >
        <Card className="shadow-2xl border-4 border-dashed border-purple-500 rounded-2xl bg-white/70 backdrop-blur-sm p-6 sm:p-8 text-center max-w-lg w-full">
          <h1 className="text-5xl sm:text-6xl font-creepster text-purple-700 mb-2">
            {timeUp ? t.timesUp : t.quizComplete}
          </h1>
          {timeUp && <p className="text-red-600 font-bold mb-4">Your time is up!</p>}
          <p className="text-2xl sm:text-3xl font-bold text-gray-800 mb-4">
            {t.score}: {score} / {quizDataLength}
          </p>
          <p className="text-2xl sm:text-3xl font-bold text-pink-600 mb-4">{grade}</p>
          <div className="flex justify-center mb-4">
            {Array(stars)
              .fill(0)
              .map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ delay: i * 0.1, type: "spring" }}
                >
                  <FaStar className="text-yellow-500 text-3xl sm:text-4xl mx-1" />
                </motion.div>
              ))}
          </div>
          <p className="text-base sm:text-lg text-gray-700 mb-6">{motivationalMessage}</p>
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <Button
              onClick={resetQuiz}
              variant="outlined"
              size="large"
              startIcon={<ReplayIcon />}
              className="!border-purple-600 !text-purple-700 hover:!bg-purple-100 !font-bold rounded-full shadow"
            >
              {t.playAgain}
            </Button>
            <Button
              onClick={() => navigate("/parts/prt1")}
              variant="contained"
              size="large"
              endIcon={<ArrowForwardIcon />}
              className="!bg-gradient-to-r !from-pink-500 !to-yellow-500 hover:!from-pink-600 hover:!to-yellow-600 !text-white !font-bold rounded-full shadow-lg"
            >
              Next
            </Button>
          </div>
        </Card>
      </motion.div>
    </div>
  );
};

export default ResultsScreen;