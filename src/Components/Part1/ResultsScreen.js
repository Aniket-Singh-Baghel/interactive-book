import React from "react";
import { Card, Button } from "@mui/material";
import { FaStar, FaCheck, FaTimes } from "react-icons/fa";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

const ResultsScreen = ({
  t,
  score,
  quizDataLength,
  studentName,
  timeUp,
  isDisqualified,
  shuffledIds,
  submittedAnswers,
  questionsMap,
}) => {
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
      className="min-h-screen w-full flex flex-col items-center p-4 sm:p-6 bg-gradient-to-br from-lime-200 via-yellow-200 to-orange-200 overflow-y-auto"
      style={{ fontFamily: "'Roboto', sans-serif" }}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.8, y: 50 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.5, type: "spring" }}
        className="w-full max-w-4xl"
      >
        <Card className="shadow-2xl border-4 border-dashed border-purple-500 rounded-2xl bg-white/70 backdrop-blur-sm p-6 sm:p-8 text-center mb-6">
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
          <div className="flex flex-col sm:flex-row justify-center">
            <Button
              onClick={() => navigate("/parts/prt1")}
              variant="contained"
              size="large"
              endIcon={<ArrowForwardIcon />}
              className="!bg-gradient-to-r !from-pink-500 !to-yellow-500 hover:!from-pink-600 hover:!to-yellow-600 !text-white !font-bold rounded-full shadow-lg"
            >
              End Quiz
            </Button>
          </div>
        </Card>
      </motion.div>

      {!isDisqualified && (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="w-full max-w-4xl"
        >
          <Card className="shadow-xl rounded-2xl bg-white/80 backdrop-blur-sm p-6 sm:p-8 w-full">
            <h2 className="text-3xl font-bold text-gray-800 text-center mb-6">Answer Key</h2>
            <div className="space-y-6">
              {shuffledIds.map((questionId, index) => {
                const question = questionsMap.get(questionId);
                const userAnswerIndex = submittedAnswers[index];
                const correctAnswerIndex = question.options.findIndex(opt => opt.isCorrect);

                return (
                  <div key={questionId} className="border-b-2 border-gray-200 pb-4 text-left">
                    <p className="text-lg font-semibold text-gray-900 mb-3">
                      {index + 1}. {question.question}
                    </p>
                    <div className="space-y-2">
                      {question.options.map((option, optIndex) => {
                        const isUserAnswer = optIndex === userAnswerIndex;
                        const isCorrectAnswer = optIndex === correctAnswerIndex;
                        
                        let optionStyle = "flex items-center p-3 rounded-lg text-sm";
                        let icon = null;

                        if (isCorrectAnswer) {
                          optionStyle += " bg-green-100 text-green-900 font-semibold";
                          icon = <FaCheck className="mr-3 text-green-600 flex-shrink-0" />;
                        } else if (isUserAnswer && !isCorrectAnswer) {
                          optionStyle += " bg-red-100 text-red-900 line-through";
                          icon = <FaTimes className="mr-3 text-red-600 flex-shrink-0" />;
                        } else {
                          optionStyle += " text-gray-800";
                        }
                        
                        return (
                          <div key={optIndex} className={optionStyle}>
                            {icon}
                            <span>{option.text}</span>
                          </div>
                        );
                      })}
                       {userAnswerIndex === undefined && (
                          <p className="text-sm text-yellow-700 bg-yellow-100 p-3 rounded-lg font-semibold mt-2">You did not answer this question.</p>
                        )}
                    </div>
                  </div>
                );
              })}
            </div>
          </Card>
        </motion.div>
      )}
    </div>
  );
};

export default ResultsScreen;