import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
// import Header from "./components/Header";
import Header from "./components/Header";
import Question from "./components/Question";
import Results from "./components/Results";

function App() {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [score, setScore] = useState(0);
  const [startTime, setStartTime] = useState(null);
  const [totalTime, setTotalTime] = useState(0);
  const [questionStartTime, setQuestionStartTime] = useState(null);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const res = await fetch("http://localhost:3001/data");
        const json = await res.json();
        console.log("Fetched JSON:", json);

        if (json.questions) {
          setQuestions(json.questions);
          setStartTime(new Date());
          setQuestionStartTime(new Date());
        } else {
          console.error("Questions data not found");
        }
      } catch (error) {
        console.error("Error fetching questions:", error);
      }
    };

    fetchQuestions();
  }, []);
  const handleConfirmQuit = () => {
    // Clear all quiz-related data
    localStorage.removeItem("quizProgress");
    localStorage.removeItem("userAnswers");
    sessionStorage.removeItem("quizState");

    // Optionally reload or navigate to home
    window.location.href = "/";
  };


  const handleAnswer = (questionId, answer) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: answer,
    }));
  };

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
      setQuestionStartTime(new Date());
    } else {
      calculateResults();
    }
  };

  const handleTimeout = () => {
    handleNext();
  };

  const calculateResults = () => {
    let correct = 0;
    questions.forEach((question) => {
      const userAnswer = answers[question.questionId];
      if (
        userAnswer &&
        JSON.stringify(userAnswer) === JSON.stringify(question.correctAnswer)
      ) {
        correct++;
      }
    });
    setScore(correct);
    setTotalTime(Math.floor((new Date() - startTime) / 1000));
    setQuizCompleted(true);
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route
          path="/test"
          element={
            quizCompleted ? (
              <Results
                questions={questions}
                answers={answers}
                score={score}
                totalTime={totalTime}
              />
            ) : questions.length === 0 ? (
              <div className="flex justify-center items-center h-screen">
                Loading...
              </div>
            ) : (
              <div className="min-h-screen bg-gray-50">
                <Header
                  currentQuestion={currentQuestionIndex + 1}
                  totalQuestions={questions.length}
                  onConfirmQuit={handleConfirmQuit}
                />

                <div className="container mx-auto px-4 py-8">
                  <Question
                    question={questions[currentQuestionIndex]}
                    onAnswer={(answer) =>
                      handleAnswer(
                        questions[currentQuestionIndex].questionId,
                        answer
                      )
                    }
                    userAnswer={
                      answers[questions[currentQuestionIndex].questionId] || []
                    }
                    onTimeout={handleTimeout}
                    currentQuestionIndex={currentQuestionIndex}
                    totalQuestions={questions.length}
                  />
                  <div className="mt-8 flex justify-end">
                    <button
                      onClick={handleNext}
                      disabled={
                        !answers[questions[currentQuestionIndex].questionId] ||
                        answers[questions[currentQuestionIndex].questionId]
                          .length !==
                          questions[currentQuestionIndex].correctAnswer.length
                      }
                      className={`px-6 py-2 rounded-md ${
                        answers[questions[currentQuestionIndex].questionId]
                          ?.length ===
                        questions[currentQuestionIndex].correctAnswer.length
                          ? "bg-blue-600 text-white hover:bg-blue-700"
                          : "bg-gray-300 text-gray-500 cursor-not-allowed"
                      }`}
                    >
                      {currentQuestionIndex < questions.length - 1
                        ? "Next"
                        : "Finish"}
                    </button>
                  </div>
                </div>
              </div>
            )
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
