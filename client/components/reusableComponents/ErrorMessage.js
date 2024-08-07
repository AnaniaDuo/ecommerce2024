import React from "react";

function ErrorMessage({ message }) {
  return (
    <div className="w-full text-right text-red-500 text-sm mt-2">
      {message}.
    </div>
  );
}

export default ErrorMessage;
