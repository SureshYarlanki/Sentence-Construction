import React from "react";
const Option=({ option, onSelect, isSelected, isUsed })=> {
  const handleClick = () => {
    if (!isUsed) {
      onSelect(option);
    }
  };

  return (
    <div
      onClick={handleClick}
      className={`p-3 rounded-md cursor-pointer transition-colors ${
        isSelected
          ? "bg-blue-100 border border-blue-300 text-blue-800"
          : isUsed
          ? "bg-gray-100 border border-gray-200 text-gray-400 cursor-not-allowed"
          : "bg-white border border-gray-200 hover:bg-gray-50"
      }`}
    >
      {option}
    </div>
  );
}
export default Option
