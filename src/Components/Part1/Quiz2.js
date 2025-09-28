import React, { useState, useEffect, useMemo, useCallback } from "react";
import "@fontsource/comic-neue";
import StartScreen from "./StartScreen";
import InstructionsScreen from "./InstructionsScreen";
import QuizScreen from "./QuizScreen2";
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
  const [showHint, setShowHint] = useState(false);
  const [score, setScore] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [timeLeft, setTimeLeft] = useState(18 * 60);
  const [timeUp, setTimeUp] = useState(false);
  const [tabSwitchCount, setTabSwitchCount] = useState(0);
  const [showWarningModal, setShowWarningModal] = useState(false);
  const [isDisqualified, setIsDisqualified] = useState(false);
  const [questionStatuses, setQuestionStatuses] = useState([]);
  const [submittedAnswers, setSubmittedAnswers] = useState({});
  const [endTime, setEndTime] = useState(null);
  const [showInstructions, setShowInstructions] = useState(true);

  const t = content[lang];

  const questionsMap = useMemo(() => {
    const map = new Map();
    t.quizData.forEach((q) => map.set(q.id, q));
    return map;
  }, [t]);

  const allQuestionsAttempted = useMemo(() => {
    return questionStatuses.every(status => status === 'answered' || status === 'markedForReview');
  }, [questionStatuses]);

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

  const calculateFinalScore = useCallback(() => {
    let finalScore = 0;
    for (const questionIdx in submittedAnswers) {
      const questionId = shuffledIds[questionIdx];
      const question = questionsMap.get(questionId);
      const optionIndex = submittedAnswers[questionIdx];
      if (question && question.options[optionIndex] && question.options[optionIndex].isCorrect) {
        finalScore += 1;
      } else {
        finalScore -= 0.5;
      }
    }
    setScore(finalScore);
  }, [submittedAnswers, shuffledIds, questionsMap]);

  useEffect(() => {
    if (!quizStarted || showResults || isDisqualified) {
      return;
    }

    const timerId = setInterval(() => {
      const newTimeLeft = Math.round((endTime - Date.now()) / 1000);
      if (newTimeLeft > 0) {
        setTimeLeft(newTimeLeft);
      } else {
        setTimeLeft(0);
        calculateFinalScore();
        setShowResults(true);
        setTimeUp(true);
        clearInterval(timerId);
      }
    }, 1000);

    return () => clearInterval(timerId);
  }, [quizStarted, showResults, isDisqualified, endTime, calculateFinalScore]);

  useEffect(() => {
    if (!quizStarted || showResults) {
      return;
    }

    const handleVisibilityChange = () => {
      if (document.hidden) {
        setTabSwitchCount((prevCount) => {
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
    const newShuffledIds = shuffle(questionIds);
    setShuffledIds(newShuffledIds);
    setQuestionStatuses(Array(newShuffledIds.length).fill("unseen"));
    setSubmittedAnswers({});
    setQuizStarted(true);
    setIdx(0);
    setSelectedOptionIndex(null);
    setShowHint(false);
    setScore(0);
    setShowResults(false);
    setTimeLeft(18 * 60);
    setEndTime(Date.now() + 18 * 60 * 1000);
    setTimeUp(false);
    setTabSwitchCount(0);
    setIsDisqualified(false);
    setShowWarningModal(false);
  };

  const updateStatus = (index, status) => {
    setQuestionStatuses((prev) => {
      const newStatuses = [...prev];
      const currentStatus = newStatuses[index];
      if (currentStatus === "answered" && status === "markedForReview") {
        newStatuses[index] = status;
      } else if (currentStatus !== "answered") {
        newStatuses[index] = status;
      }
      return newStatuses;
    });
  };

  const handlePick = (opt, index) => {
    setSelectedOptionIndex(index);
    updateStatus(idx, "answered");
    setSubmittedAnswers((prev) => ({ ...prev, [idx]: index }));
  };

  const goToQuestion = (questionIndex) => {
    if (questionIndex >= 0 && questionIndex < shuffledIds.length) {
      setIdx(questionIndex);
      const previouslySubmittedAnswer = submittedAnswers[questionIndex];
      if (previouslySubmittedAnswer !== undefined) {
        setSelectedOptionIndex(previouslySubmittedAnswer);
      } else {
        setSelectedOptionIndex(null);
      }
      setShowHint(false);
    }
  };

  const next = () => {
    if (selectedOptionIndex === null) {
      updateStatus(idx, "skipped");
    }
    if (idx < shuffledIds.length - 1) {
      goToQuestion(idx + 1);
    } else {
      if (allQuestionsAttempted) {
        calculateFinalScore();
        setShowResults(true);
      }
    }
  };

  const markForReview = () => {
    updateStatus(idx, "markedForReview");
  };

  const navigateToQuestion = (questionIndex) => {
    goToQuestion(questionIndex);
  };

  const resetQuiz = () => {
    setShowInstructions(true);
    setQuizStarted(false);
  };
  
  const handleContinueFromInstructions = () => {
    setShowInstructions(false);
  };

  if (showInstructions) {
    return <InstructionsScreen t={t} onContinue={handleContinueFromInstructions} lang={lang} setLang={setLang} />;
  }

  if (!quizStarted) {
    return <StartScreen t={t} startQuiz={startQuiz} lang={lang} setLang={setLang} />;
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
    return <DisqualificationScreen onShowResults={() => setShowResults(true)} t={t} lang={lang} setLang={setLang} />;
  }

  const currentQuestionId = shuffledIds[idx];
  const translatedQ = questionsMap.get(currentQuestionId);

  const progress = Math.round(((idx + 1) / shuffledIds.length) * 100);

  return (
    <>
      <WarningModal
        isOpen={showWarningModal}
        onClose={() => setShowWarningModal(false)}
        t={t}
        lang={lang}
        setLang={setLang}
      />
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
        showHint={showHint}
        setShowHint={setShowHint}
        handlePick={handlePick}
        next={next}
        questionStatuses={questionStatuses}
        navigateToQuestion={navigateToQuestion}
        markForReview={markForReview}
        allQuestionsAttempted={allQuestionsAttempted}
      />
    </>
  );
}