import React, { useState } from "react";
import Button from "../components/reusableComponents/Button";

function Filter({ products, setDisplayedProducts }) {
  const [expand, setExpand] = useState(false);
  const [cafeineSelected, setCafeineSelected] = useState(true);
  const [decafSelected, setDecafSelected] = useState(true);
  function handleClickFilter() {
    setExpand(!expand);
  }

  function handleApplyFilter() {
    let filterProducts = [];
    if (cafeineSelected && decafSelected) {
      filterProducts = products;
    } else if (cafeineSelected) {
      filterProducts = products.filter((product) => !product.isDecaf);
    } else if (decafSelected) {
      filterProducts = products.filter((product) => product.isDecaf);
    }

    setDisplayedProducts(filterProducts);
  }

  return (
    <div className="relative inline-block text-left">
      <div>
        <button
          type="button"
          className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-600 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
          id="menu-button"
          aria-expanded="true"
          aria-haspopup="true"
          onClick={handleClickFilter}
        >
          Filter
          <svg
            className="-mr-1 h-5 w-5 text-gray-400"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>

      {expand && (
        <div
          className="absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="menu-button"
          tabIndex="-1"
        >
          <div className="pt-3 p-4" role="none">
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="cafeine"
                checked={cafeineSelected}
                onChange={() => setCafeineSelected(!cafeineSelected)}
              />
              <label htmlFor="cafeine">Cafeine</label>
            </div>
            <div className="flex items-center gap-2 mb-3">
              <input
                type="checkbox"
                id="decaf"
                checked={decafSelected}
                onChange={() => setDecafSelected(!decafSelected)}
              />
              <label htmlFor="decaf">Decaf</label>
            </div>
            <div className="flex justify-center">
              <Button
                text="Apply"
                onClickFunc={handleApplyFilter}
                addedStyle="bg-gray-800 hover:bg-gray-600"
                disabled={!decafSelected && !cafeineSelected}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Filter;
