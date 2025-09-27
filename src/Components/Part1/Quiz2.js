import React, { useState, useEffect, useMemo } from "react";
import "@fontsource/comic-neue";
import StartScreen from "./StartScreen";
import QuizScreen from "./QuizScreen";
import ResultsScreen from "./ResultsScreen";
import { content } from "./Content2";
import WarningModal from "./WarningModal";
import DisqualificationScreen from "./DisqualificationScreen";

const shuffle = (arr) => {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
};

const questionIds = content.en.quizData.map((q) => q.id);

export default function Quiz_2() {
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
  const [timeLeft, setTimeLeft] = useState(18 * 60);
  const [timeUp, setTimeUp] = useState(false);
  const [, setTabSwitchCount] = useState(0);
  const [showWarningModal, setShowWarningModal] = useState(false);
  const [isDisqualified, setIsDisqualified] = useState(false);

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
    if (quizStarted && !showResults && !isDisqualified) {
      if (timeLeft > 0) {
        const timerId = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
        return () => clearTimeout(timerId);
      } else {
        setShowResults(true);
        setTimeUp(true);
      }
    }
  }, [quizStarted, timeLeft, showResults, isDisqualified]);

  useEffect(() => {
    if (!quizStarted || showResults) {
      return;
    }

    const handleVisibilityChange = () => {
      if (document.hidden) {
        setTabSwitchCount(prevCount => {
          const newCount = prevCount + 1;
          if (newCount === 1) {
            setShowWarningModal(true);
          } else if (newCount >= 2) {
            setIsDisqualified(true);
          }
          return newCount;
        });
      }
    };

    const preventCopyPaste = (event) => {
      event.preventDefault();
      alert("Copying and pasting is disabled during the quiz.");
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    window.addEventListener("copy", preventCopyPaste);
    window.addEventListener("paste", preventCopyPaste);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      window.removeEventListener("copy", preventCopyPaste);
      window.removeEventListener("paste", preventCopyPaste);
    };
  }, [quizStarted, showResults]);

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
    setTimeLeft(18 * 60);
    setTimeUp(false);
    setTabSwitchCount(0);
    setIsDisqualified(false);
  };

  const handlePick = (opt, index) => {
    if (isAnswerSubmitted) return;
    setSelectedOptionIndex(index);
    setIsAnswerSubmitted(true);
    if (opt.isCorrect) {
      setScore((s) => s + 1);
    } else {
      setScore((s) => s - 0.5);
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
        timeUp={timeUp}
        isDisqualified={isDisqualified}
      />
    );
  }

  if (isDisqualified) {
    return <DisqualificationScreen onShowResults={() => setShowResults(true)} />;
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
    <>
      <WarningModal isOpen={showWarningModal} onClose={() => setShowWarningModal(false)} />
      <QuizScreen
        t={t}
        lang={lang}
      setLang={setLang}
      idx={idx}
      quizData={t.quizData}
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
    </>
  );
}