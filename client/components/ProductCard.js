import React from "react";
import { Link } from "react-router-dom";

function ProductCard({ product }) {
  const { id, name, description, imageUrl, price } = product;

  return (
    <button class="max-w-sm rounded overflow-hidden shadow-lg hover:bg-green-900 hover:text-white p-2">
      <Link to={`/products/${id}`}>
        <img className="w-full max-h-80" src={imageUrl} alt="Product image" />
        <div className="px-6 py-4">
          <div className="font-bold text-xl mb-2">{name}</div>
        </div>
        <div className="px-6 pt-4 pb-2">${price}</div>
      </Link>
    </button>
  );
}

export default ProductCard;
