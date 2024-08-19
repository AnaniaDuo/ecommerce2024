import React from "react";

function ErrorMessage({ message }) {
  return (
    <div className="w-full text-right text-sm text-red-600 font-bold">
      {message}.
    </div>
  );
}

export default ErrorMessage;
