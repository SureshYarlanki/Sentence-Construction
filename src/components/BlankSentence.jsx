import React from "react";
const BlankSentence = ({ blanks, selectedOptions, onBlankClick }) => (
  <div className="mb-8">
    <p className="text-gray-800 leading-relaxed text-justify text-lg">
      {blanks.map((part, i) => (
        <span key={i}>
          {part}
          {i < blanks.length - 1 && (
            <span
              onClick={() => onBlankClick(i)}
              className={`inline-block mx-1 px-2 py-1 border-b-2 border-blue-500 min-w-[120px] ${
                selectedOptions[i]
                  ? "bg-blue-50 text-blue-700 cursor-pointer"
                  : "text-gray-400"
              }`}
            >
              {selectedOptions[i] || ""}
            </span>
          )}
        </span>
      ))}
    </p>
  </div>
);

export default BlankSentence;
