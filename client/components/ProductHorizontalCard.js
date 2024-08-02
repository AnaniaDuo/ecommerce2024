import React from "react";

function ProductHorizontalCard({ product }) {
  const { name, price, imageUrl } = product;
  const { quantity } = product.OrderDetails;
  return (
    <div className="max-w-sm w-full lg:max-w-full lg:flex shadow">
      <div
        className={`h-40 lg:h-auto lg:w-40 flex-none bg-cover rounded-t lg:rounded-t-none lg:rounded-l text-center overflow-hidden`}
        title="Product image"
      >
        <img className=".bg-cover" src={imageUrl} />
      </div>
      <div className="border-r border-b border-l border-gray-100 lg:border-l-0 lg:border-t lg:border-gray-100 bg-white rounded-b lg:rounded-b-none lg:rounded-r p-4 flex flex-col justify-between leading-normal w-full">
        <div className="mb-8">
          <div className="text-gray-900 font-bold text-xl mb-2">
            Name: {name}
          </div>

          <p className="text-gray-700 text-base">Quantity: {quantity}</p>
          <p className="text-gray-700 text-base">Total: ${quantity * price}</p>
        </div>
      </div>
    </div>
  );
}

export default ProductHorizontalCard;
