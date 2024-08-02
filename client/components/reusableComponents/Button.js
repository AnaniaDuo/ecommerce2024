import React from "react";

function Button({ text, onClickFunc, addedStyle = "", disabled = false }) {
  return (
    <button
      className={`bg-gray-900 hover:bg-gray-700 text-white font-medium py-2 px-4 rounded-full ${addedStyle}`}
      onClick={onClickFunc}
      disabled={disabled}
    >
      {text}
    </button>
  );
}

export default Button;
