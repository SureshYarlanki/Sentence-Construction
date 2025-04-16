import Option from "./Option";

const OptionsList = ({ options, selectedOptions, onSelect }) => (
  <div className="mt-8">
    <h3 className="text-md font-medium text-gray-700 mb-4">
      Select words to complete the sentence:
    </h3>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
      {options
        .filter((opt) => !selectedOptions.includes(opt))
        .map((opt, idx) => (
          <Option
            key={idx}
            option={opt}
            onSelect={onSelect}
            isSelected={false}
            isUsed={false}
          />
        ))}
    </div>
  </div>
);

export default OptionsList;
