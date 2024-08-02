import React from "react";
import { Link } from "react-router-dom";
import Button from "./reusableComponents/Button";

function EmptyCartView() {
  return (
    <div className="mt-12 pb-12 h-full  flex flex-col items-center justify-center gap-4 text-gray-700">
      <p>There is no items in your cart.</p>
      <Link to="/home">
        <Button text="Start Shopping" />
      </Link>
    </div>
  );
}

export default EmptyCartView;
