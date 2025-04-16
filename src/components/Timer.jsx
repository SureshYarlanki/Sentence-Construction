import { useState, useEffect } from "react";

export default function Timer({ duration, onComplete }) {
  const [timeLeft, setTimeLeft] = useState(duration);
  const [isBlinking, setIsBlinking] = useState(false);

  useEffect(() => {
    if (timeLeft <= 0) {
      onComplete();
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 5) setIsBlinking(true);
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, onComplete]);

  useEffect(() => {
    setTimeLeft(duration);
    setIsBlinking(false);
  }, [duration]);

  const formatTime = (seconds) => {
    const min = String(Math.floor(seconds / 60)).padStart(2, "0");
    const sec = String(seconds % 60).padStart(2, "0");
    return `${min}:${sec}`;
  };

  return (
    <div className={`flex items-center ${isBlinking ? "animate-pulse" : ""}`}>
      <svg
        className="w-5 h-5 mr-2 text-red-500"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
      <span
        className={`font-medium ${
          timeLeft <= 5 ? "text-red-500" : "text-gray-700"
        }`}
      >
        {formatTime(timeLeft)}
      </span>
    </div>
  );
}
