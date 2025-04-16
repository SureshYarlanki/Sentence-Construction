import React from "react";
import Timer from "./Timer";

export default function Header({ currentQuestion, totalQuestions }) {
  return (
    <header className="bg-white shadow-sm relative z-10">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <h1 className="text-xl font-bold text-gray-800">
            Sentence Construction
          </h1>
          <span className="text-gray-600">
            Question {currentQuestion} of {totalQuestions}
          </span>
        </div>

        <Timer duration={300} onComplete={() => {}} />
      </div>
    </header>
  );
}
