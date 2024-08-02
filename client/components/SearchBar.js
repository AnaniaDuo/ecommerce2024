import React, { useState } from "react";

function SearchBar({ products, setDisplayedProducts }) {
  const [searchedText, setSearchedText] = useState("");

  function onChangeHandler(e) {
    setSearchedText(e.target.value);
  }

  function onSearchHandler(e) {
    e.preventDefault();
    if (!searchedText) {
      setDisplayedProducts(products);
      return;
    }
    const foundProducts = products.filter((product) =>
      product.name.toLowerCase().includes(searchedText.toLowerCase())
    );
    setDisplayedProducts(foundProducts);
  }

  function onKeyDownHandler(e) {
    if (e.key === "Enter") onSearchHandler(e);
  }

  return (
    <form className="flex items-center w-4/6">
      <label htmlFor="voice-search" className="sr-only">
        Search
      </label>
      <div className="relative w-full">
        <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none"></div>
        <input
          type="text"
          id="voice-search"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Search Tea Name"
          required
          onChange={onChangeHandler}
          value={searchedText}
        />
        <button
          type="button"
          className="absolute inset-y-0 end-0 flex items-center pe-3"
        >
          {/* <svg
            className="w-4 h-4 text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 16 20"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M15 7v3a5.006 5.006 0 0 1-5 5H6a5.006 5.006 0 0 1-5-5V7m7 9v3m-3 0h6M7 1h2a3 3 0 0 1 3 3v5a3 3 0 0 1-3 3H7a3 3 0 0 1-3-3V4a3 3 0 0 1 3-3Z"
            />
          </svg> */}
        </button>
      </div>
      <button
        type="submit"
        className="inline-flex items-center py-2.5 px-3 ms-2 text-sm font-medium text-white bg-gray-200 rounded-lg border border-gray-300 hover:bg-gray-500 focus:outline-none focus:ring-gray-300 dark:bg-gray-500 dark:hover:bg-gray-400 "
        onClick={onSearchHandler}
        onKeyDown={onKeyDownHandler}
      >
        <svg
          className="w-4 h-4 me-2"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 20 20"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
          />
        </svg>
        Search
      </button>
    </form>
  );
}

export default SearchBar;
