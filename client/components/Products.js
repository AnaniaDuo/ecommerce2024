import React from "react";
import ProductCard from "./ProductCard";

function Products({ displayedProducts }) {
  return (
    <div className="flex flex-wrap justify-center gap-4 pb-12">
      {displayedProducts.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}

export default Products;
