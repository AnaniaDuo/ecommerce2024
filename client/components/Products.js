import React from "react";
import ProductCard from "./ProductCard";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Products({ displayedProducts }) {
  return (
    <div className="flex flex-wrap justify-center gap-4 pb-12">
      {displayedProducts.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}

      <ToastContainer autoClose={1500} theme="light" />
    </div>
  );
}

export default Products;
