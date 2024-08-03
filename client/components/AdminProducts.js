import React, { useState } from "react";
import { Link } from "react-router-dom";
import ProductCard from "./ProductCard";
import Button from "./reusableComponents/Button";
import { DrawerWithForm } from "./reusableComponents/DrawerWithForm";

function AdminProducts({ displayedProducts, products, setProducts }) {
  const [showAddProductSlideIn, setShowAddProductSlideIn] = useState(false);

  function handleAddProduct() {
    setShowAddProductSlideIn(true);
  }

  return (
    <div>
      <div className="flex justify-center gap-4 my-4">
        <Button text="Add Product" onClickFunc={handleAddProduct} />
        <Link to="/users">
          <Button text="View User" />
        </Link>
      </div>
      <div className="flex flex-wrap justify-center gap-4 pb-12">
        {displayedProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
      {showAddProductSlideIn && (
        <DrawerWithForm
          setShowAddProductSlideIn={setShowAddProductSlideIn}
          products={products}
          setProducts={setProducts}
        />
      )}
    </div>
  );
}

export default AdminProducts;
