import React, { useState, useEffect } from "react";
import axios from "axios";
import ProductCard from "./ProductCard";

function Products() {
  // set states
  const [products, setProducts] = useState([]);

  // load all products
  useEffect(() => {
    async function fetchAllProducts() {
      const { data } = await axios.get("/api/products");
      setProducts(data);
    }
    fetchAllProducts();
  }, []);

  return (
    <div className="flex flex-wrap justify-center gap-4 pb-12">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}

export default Products;
