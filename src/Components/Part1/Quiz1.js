import React, { useState, useEffect, useMemo } from "react";
import "@fontsource/comic-neue";
import StartScreen from "./StartScreen";
import QuizScreen from "./QuizScreen";
import ResultsScreen from "./ResultsScreen";
import { content } from "./Content";

const shuffle = (arr) => {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
};

const questionIds = content.en.quizData.map((q) => q.id);

export default function AnimatedQuiz() {
  const [lang, setLang] = useState("en");
  const [studentName, setStudentName] = useState("");
  const [quizStarted, setQuizStarted] = useState(false);
  const [shuffledIds, setShuffledIds] = useState([]);
  const [idx, setIdx] = useState(0);
  const [selectedOptionIndex, setSelectedOptionIndex] = useState(null);
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [score, setScore] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [timeLeft, setTimeLeft] = useState(23 * 60);

  const t = content[lang];
  
  const questionsMap = useMemo(() => {
    const map = new Map();
    t.quizData.forEach(q => map.set(q.id, q));
    return map;
  }, [t]);


  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.ctrlKey && event.key === "k") {
        event.preventDefault();
        setLang((prevLang) => (prevLang === "en" ? "hi" : "en"));
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  useEffect(() => {
    if (quizStarted && timeLeft > 0 && !showResults) {
      const timerId = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timerId);
    }
  }, [quizStarted, timeLeft, showResults]);

  const startQuiz = (name) => {
    setStudentName(name);
    setShuffledIds(shuffle(questionIds));
    setQuizStarted(true);
    setIdx(0);
    setSelectedOptionIndex(null);
    setIsAnswerSubmitted(false);
    setShowHint(false);
    setScore(0);
    setShowResults(false);
    setTimeLeft(23 * 60);
  };

  const handlePick = (opt, index) => {
    if (isAnswerSubmitted) return;
    setSelectedOptionIndex(index);
    setIsAnswerSubmitted(true);
    if (opt.isCorrect) {
      setScore((s) => s + 1);
    }
  };

  const next = () => {
    if (!isAnswerSubmitted) return;

    if (idx < shuffledIds.length - 1) {
      setIdx((i) => i + 1);
      setSelectedOptionIndex(null);
      setIsAnswerSubmitted(false);
      setShowHint(false);
    } else {
      setShowResults(true);
    }
  };

  const resetQuiz = () => {
    setQuizStarted(false);
  };

  if (!quizStarted) {
    return <StartScreen t={t} startQuiz={startQuiz} />;
  }

  if (showResults) {
    return (
      <ResultsScreen
        t={t}
        score={score}
        quizDataLength={shuffledIds.length}
        resetQuiz={resetQuiz}
        studentName={studentName}
      />
    );
  }

  const currentQuestionId = shuffledIds[idx];
  const translatedQ = questionsMap.get(currentQuestionId);
  
  const selectedOpt =
    selectedOptionIndex !== null && translatedQ
      ? translatedQ.options[selectedOptionIndex]
      : null;
  const isCorrect = selectedOpt && selectedOpt.isCorrect;
  const isWrong = selectedOpt && !selectedOpt.isCorrect;
  const progress = Math.round(((idx + 1) / shuffledIds.length) * 100);

  return (
    <QuizScreen
      t={t}
      lang={lang}
      setLang={setLang}
      idx={idx}
      quizData={shuffledIds} // Pass shuffledIds to keep track of length
      timeLeft={timeLeft}
      score={score}
      progress={progress}
      translatedQ={translatedQ}
      selectedOptionIndex={selectedOptionIndex}
      isAnswerSubmitted={isAnswerSubmitted}
      isCorrect={isCorrect}
      isWrong={isWrong}
      showHint={showHint}
      setShowHint={setShowHint}
      handlePick={handlePick}
      next={next}
    />
  );
}