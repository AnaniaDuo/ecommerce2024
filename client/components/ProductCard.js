import React from "react";
import { Link } from "react-router-dom";
import Button from "./reusableComponents/Button";

function ProductCard({
  product,
  adminView = false,
  handleClickDelete = () => {},
  handleClickUpdate = () => {},
}) {
  const { id, name, description, imageUrl, price } = product;

  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg hover:bg-gray-200 h p-2 text-gray-700">
      <button className="">
        <Link to={`/products/${id}`}>
          <img className="w-full max-h-80" src={imageUrl} alt="Product image" />
          <div className="px-6 py-4">
            <div className="font-bold text-xl">{name}</div>
          </div>
          <div className="px-6 pb-2">${price}</div>
        </Link>
      </button>
      {adminView && (
        <div className="w-full flex justify-center gap-2">
          <Button text="Delete" onClickFunc={handleClickDelete} />
          <Button text="Update" onClickFunc={handleClickUpdate} />
        </div>
      )}
    </div>
  );
}

export default ProductCard;
