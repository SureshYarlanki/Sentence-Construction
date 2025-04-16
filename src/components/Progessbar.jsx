const PROGRESS_COLORS = [
  "bg-red-500",
  "bg-orange-500",
  "bg-amber-500",
  "bg-yellow-500",
  "bg-lime-500",
  "bg-green-500",
  "bg-emerald-500",
  "bg-teal-500",
  "bg-cyan-500",
  "bg-blue-500",
];
import React from "react";
const ProgressBar = ({ currentIndex, total }) => {
  const segments = Array(10)
    .fill(0)
    .map((_, i) => {
      const start = i * (total / 10);
      const end = (i + 1) * (total / 10);
      return {
        color: PROGRESS_COLORS[i],
        active: currentIndex >= start && currentIndex < end,
        completed: currentIndex >= end,
      };
    });

  return (
    <div className="flex items-center gap-2 pb-4">
      <div className="flex gap-1 w-full">
        {segments.map((s, i) => (
          <div
            key={i}
            className={`h-2 flex-1 rounded-sm transition-all duration-300 ${
              s.completed
                ? s.color
                : s.active
                ? `${s.color} opacity-80`
                : "bg-gray-200"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default ProgressBar;
