import React from "react";
const QuitModal = ({ onCancel, onConfirm }) => (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div className="bg-white p-6 rounded-lg shadow-xl max-w-md w-full">
      <h3 className="text-lg font-medium text-gray-900 mb-4">Quit Quiz?</h3>
      <p className="text-gray-600 mb-6">
        Are you sure you want to quit? All progress will be lost.
      </p>
      <div className="flex justify-end gap-3">
        <button
          onClick={onCancel}
          className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
        >
          Cancel
        </button>
        <button
          onClick={onConfirm}
          className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
        >
          Confirm Quit
        </button>
      </div>
    </div>
  </div>
);

export default QuitModal;
