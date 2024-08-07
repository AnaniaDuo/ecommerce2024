import React, { useState } from "react";

function ProductHorizontalCard({
  product,
  cartProducts,
  setCartProducts,
  idx,
}) {
  const { name, price, imageUrl } = product;
  const { quantity } = product.OrderDetails;
  const [quantityState, setQuantityState] = useState(quantity);

  function handleChangeQuantity(e) {
    const updatedQuantity = parseInt(e.target.value);
    setQuantityState(updatedQuantity);
    let updatedCartProducts = [...cartProducts];
    updatedCartProducts[idx].OrderDetails.quantity = updatedQuantity;
    setCartProducts(updatedCartProducts);
  }

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
          <div className="text-gray-900 font-bold text-xl mb-2 grid grid-cols-4 ">
            <div>Name:</div>
            <div className="col-span-3">{name}</div>
          </div>

          <label className="text-gray-700 text-base grid grid-cols-4">
            <div className="flex items-center">Quantity:</div>
            <input
              type="number"
              value={quantityState}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 col-span-3"
              onChange={handleChangeQuantity}
            />
          </label>
          <div className="text-gray-700 text-base grid grid-cols-4 mt-2">
            <div>Total:</div>
            <div className="col-span-3">${quantity * price}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductHorizontalCard;
