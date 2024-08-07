import React, { useState, useEffect } from "react";
import Button from "./Button";
import axios from "axios";
import { TOKEN } from "../../components/utilities/constants";

export function DrawerWithForm({
  setShowSlideInModal,
  products,
  setProducts,
  isUpdate = false,
  selectedProduct = {},
  setSelectedProduct = () => {},
}) {
  const INITIAL_STATE = {
    name: "",
    title: "",
    description: "",
    price: "",
    quantity: "",
    isDecaf: false,
  };
  const [inputProduct, setInputProduct] = useState(INITIAL_STATE);
  const token = window.localStorage.getItem(TOKEN);

  useEffect(() => {
    if (isUpdate) {
      setInputProduct(selectedProduct);
    }
  }, []);

  function handleChange(event) {
    let { name, value } = event.target;
    if (["price", "quantity"].includes(name)) {
      value = parseInt(value);
    }
    if (value === "true") value = true;
    if (value === "false") value = false;
    setInputProduct((values) => ({ ...values, [name]: value }));
  }

  async function handleAddProduct(event) {
    event.preventDefault();

    const { data } = await axios.post(
      "/api/products",
      { ...inputProduct },
      {
        headers: {
          authorization: token,
        },
      }
    );
    setProducts([...products, { ...data }]);
    setShowSlideInModal(false);
  }

  async function handleUpdateProductInDb(e) {
    e.preventDefault();
    const { data } = await axios.put(
      `/api/products/${selectedProduct.id}`,
      { ...inputProduct },
      {
        headers: {
          authorization: token,
        },
      }
    );

    console.log("what is data now", data);

    setProducts(data);
    setShowSlideInModal(false);
  }

  function handleCloseModal() {
    setSelectedProduct({});
    setShowSlideInModal(false);
  }

  return (
    <div>
      <div className="bg-gray-50 fixed top-0 right-0 z-40 h-screen p-4 bg-white w-80 dark:bg-gray-200">
        <div className="-mx-4 border-b-2 border-gray-300">
          <h5
            id="drawer-label"
            className="inline-flex items-center mb-2 text-base font-semibold text-gray-500 uppercase dark:text-gray-400 pl-4"
          >
            {isUpdate ? "Update Product" : "Add Product"}
          </h5>
        </div>

        <button
          type="button"
          data-drawer-hide="drawer-contact"
          aria-controls="drawer-contact"
          className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 absolute top-2.5 end-2.5 inline-flex items-center justify-center dark:hover:bg-gray-600 dark:hover:text-white"
          onClick={handleCloseModal}
        >
          <svg
            className="w-3 h-3"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 14 14"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
            />
          </svg>
          <span className="sr-only">Close menu</span>
        </button>
        <form className="mb-2">
          <div className="mb-2">
            <label
              htmlFor="name"
              className="block mb-2 text-sm font-medium text-gray-900 "
            >
              Name
            </label>

            <input
              type="text"
              name="name"
              value={inputProduct.name}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              placeholder="Peach Tea"
              required
              onChange={handleChange}
            />
          </div>
          <div className="mb-2">
            <label
              htmlFor="price"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Price
            </label>
            <input
              type="number"
              name="price"
              value={inputProduct.price}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              placeholder="15"
              required
              onChange={handleChange}
            />
          </div>
          <div className="mb-2">
            <label
              htmlFor="inventoryQuantity"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Quantity
            </label>
            <input
              type="text"
              name="inventoryQuantity"
              value={inputProduct.inventoryQuantity}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              placeholder="100"
              required
              onChange={handleChange}
            />
          </div>
          <div className="mb-2">
            <label
              htmlFor="description"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Description
            </label>
            <textarea
              name="description"
              value={inputProduct.description}
              rows="4"
              className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Best tea ever"
              onChange={handleChange}
            ></textarea>
          </div>
          <div onChange={handleChange}>
            <div className="flex items-center mb-4">
              <input
                id="default-radio-1"
                type="radio"
                checked={!inputProduct.isDecaf}
                name="isDecaf"
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 "
              />
              <label
                htmlFor="default-radio-1"
                className="ms-2 text-sm font-medium text-gray-900"
              >
                Caffeinated
              </label>
            </div>
            <div className="flex items-center">
              <input
                id="default-radio-2"
                type="radio"
                checked={inputProduct.isDecaf}
                name="isDecaf"
                className="w-4 h-4 text-blue-600  border-gray-900 focus:ring-blue-500 "
              />
              <label
                htmlFor="default-radio-2"
                className="ms-2 text-sm font-medium text-gray-900"
              >
                Decaffeinated
              </label>
            </div>
          </div>

          <div className="mt-4">
            <Button
              text={isUpdate ? "Update Product" : "Add Product"}
              onClickFunc={
                isUpdate ? handleUpdateProductInDb : handleAddProduct
              }
              addedStyle="rounded-xl w-72"
            />
          </div>
        </form>
      </div>
    </div>
  );
}
