import { useState, useEffect } from "react";
import { RiCloseLine } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import Timer from "./Timer";
import Option from "./Option";
import QuitModal from "./QuitModal";
import ProgressBar from "./Progessbar";
import BlankSentence from "./BlankSentence";
import OptionsList from "./OptionsList";

const Question = ({
  question,
  onAnswer,
  userAnswer,
  onTimeout,
  currentQuestionIndex,
  totalQuestions,
  resetTestData,
}) => {
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [blanks, setBlanks] = useState([]);
  const [showQuitModal, setShowQuitModal] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const parts = question.question.split("_____________");
    setBlanks(parts);
    setSelectedOptions(userAnswer || []);
  }, [question.questionId, question.question, userAnswer]);

  const handleOptionSelect = (option) => {
    if (selectedOptions.includes(option)) return;
    if (selectedOptions.length < blanks.length - 1) {
      const updated = [...selectedOptions, option];
      setSelectedOptions(updated);
      onAnswer(updated);
    }
  };

  const handleBlankClick = (index) => {
    const updated = [...selectedOptions];
    updated.splice(index, 1);
    setSelectedOptions(updated);
    onAnswer(updated);
  };

  const handleConfirmQuit = () => {
    localStorage.removeItem("quizProgress");
    localStorage.removeItem("userAnswers");
    sessionStorage.removeItem("quizState");
    resetTestData?.();
    window.location.href = "/";
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 max-w-3xl mx-auto relative">
      {showQuitModal && (
        <QuitModal
          onCancel={() => setShowQuitModal(false)}
          onConfirm={handleConfirmQuit}
        />
      )}
      <div className="flex justify-between items-center mb-4">
        <Timer duration={30} onComplete={onTimeout} key={question.questionId} />
        <button
          onClick={() => setShowQuitModal(true)}
          className="flex items-center gap-1 text-gray-500 hover:text-gray-700"
        >
          <span className="text-sm border px-3 py-1 border-black text-black rounded-lg">Quit</span>
        </button>
      </div>
      <div>
        <ProgressBar
          currentIndex={currentQuestionIndex}
          total={totalQuestions}
        />
      </div>

      <BlankSentence
        blanks={blanks}
        selectedOptions={selectedOptions}
        onBlankClick={handleBlankClick}
      />

      <OptionsList
        options={question.options}
        selectedOptions={selectedOptions}
        onSelect={handleOptionSelect}
      />
    </div>
  );
};

export default Question;
