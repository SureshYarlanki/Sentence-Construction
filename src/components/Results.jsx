import React from "react";
import { Link } from "react-router-dom";

export default function Results({ questions, answers, score, totalTime }) {
  const calculateAccuracy = () => {
    return Math.round((score / questions.length) * 100);
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins > 0 ? `${mins}m ` : ""}${secs}s`;
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-md overflow-hidden">
        <div className="px-6 py-4 border-b">
          <h1 className="text-2xl font-bold text-gray-800 text-center">
            Sentence Construction Results
          </h1>
        </div>

        <div className="p-6 border-b">
          <div className="flex flex-col items-center">
            <div className="relative w-40 h-40 mb-4">
              <div className="absolute w-full h-full rounded-full border-[12px] border-gray-200"></div>

              <div
                className="absolute w-full h-full rounded-full border-[12px] border-transparent"
                style={{
                  borderColor: "#3b82f6",
                  clipPath: `polygon(0 0, 50% 0, 50% 100%, 0 100%)`,
                  transform: `rotate(${calculateAccuracy() * 3.6}deg)`,
                  transformOrigin: "center",
                }}
              ></div>

              <div className="absolute w-28 h-28 rounded-full bg-white top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex items-center justify-center">
                <div className="text-center">
                  <h1 className="text-3xl font-bold text-blue-600">
                    {calculateAccuracy()}%
                  </h1>
                  <p className="text-xs text-gray-500">Accuracy</p>
                </div>
              </div>
            </div>

            <div className="flex gap-6 text-center">
              <div>
                <p className="text-sm text-gray-600">Score</p>
                <p className="text-2xl font-bold text-gray-800">
                  {score}/{questions.length}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Time</p>
                <p className="text-2xl font-bold text-gray-800">
                  {formatTime(totalTime)}
                </p>
              </div>
            </div>

            <p className="mt-4 text-gray-600 text-center max-w-md">
              {calculateAccuracy() >= 80
                ? "Excellent work! Your sentence construction skills are strong."
                : calculateAccuracy() >= 50
                ? "Good effort! With a bit more practice, you'll master sentence construction."
                : "Keep practicing! Review the correct answers below to improve."}
            </p>

            <div className="bg-gray-50 px-6 py-4 text-center">
              <Link
                to="/"
                onClick={() => window.reload()}
                className="inline-block px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors mr-4"
              >
                Return Home
              </Link>
{/*               <button
                onClick={() => window.location.reload()}
                className="inline-block px-6 py-2 bg-white border border-blue-600 text-blue-600 rounded-md hover:bg-blue-50 transition-colors"
              >
                Retake Test
              </button> */}
            </div>
          </div>
        </div>

        <div className="divide-y divide-gray-200">
          {questions.map((question, index) => {
            const userAnswer = answers[question.questionId] || [];
            const isCorrect =
              JSON.stringify(userAnswer) ===
              JSON.stringify(question.correctAnswer);
            const questionParts = question.question.split("_____________");

            return (
              <div key={question.questionId} className="p-6">
                <div className="">
                  <div
                    className={`mr-4 mt-1 ${
                      isCorrect ? "text-green-500" : "text-red-500"
                    }`}
                  ></div>
                  <div className="flex justify-between">
                    <h1 className="text-lg font-semibold text-gray-800">
                      Prompt
                    </h1>
                    <h1 className="text-sm text-gray-600">
                      {index + 1}/{questions.length}
                    </h1>
                  </div>

                  <div className="flex-1">
                    <div className="mb-3 mt-5">
                      {!isCorrect && (
                        <div className="mt-3  p-3 rounded-md">
                          <div className="text-gray-700">
                            {questionParts.map((part, i) => (
                              <React.Fragment key={i}>
                                {part}
                                {i < questionParts.length - 1 && (
                                  <span className="mx-1 px-2 py-1 rounded bg-green-100 text-green-800">
                                    {question.correctAnswer[i]}
                                  </span>
                                )}
                              </React.Fragment>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="mt-1 bg-blue-50 p-3 text-gray-800">
                      <p className="text-sm font-medium text-blue-800 mb-3 flex gap-2 ">
                        Your Response
                        <span>
                          {isCorrect ? (
                            <h1 className="text-green-400">Correct</h1>
                          ) : (
                            <h1 className="text-red-400">Wrong</h1>
                          )}
                        </span>
                      </p>
                      {questionParts.map((part, i) => (
                        <React.Fragment key={i}>
                          {part}
                          {i < questionParts.length - 1 && (
                            <span
                              className={`mx-1 px-2 py-1 rounded ${
                                userAnswer[i] === question.correctAnswer[i]
                                  ? "bg-green-100 text-green-800"
                                  : "bg-red-100 text-red-800"
                              }`}
                            >
                              {userAnswer[i] || "______"}
                            </span>
                          )}
                        </React.Fragment>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
