import React, { useState } from "react";
import { Link } from "react-router-dom";
import ProductCard from "./ProductCard";
import Button from "./reusableComponents/Button";
import { DrawerWithForm } from "./reusableComponents/DrawerWithForm";
import Modal from "./reusableComponents/Modal";
import axios from "axios";
import { TOKEN } from "../components/utilities/constants";

function AdminProducts({ displayedProducts, products, setProducts }) {
  const [productToBeUpdated, setProductToBeUpdated] = useState({});
  const [productToBeDeleteId, setProductToBeDeleteId] = useState("");
  const [showDeleleModal, setShowDeleteModal] = useState(false);
  const [showSlideInModal, setShowSlideInModal] = useState(false);
  const [showUpdateProductSlideIn, setShowUpdateProductSlideIn] =
    useState(false);

  const token = window.localStorage.getItem(TOKEN);

  function handleAddProduct() {
    setShowSlideInModal(true);
  }

  async function handleDeleteProduct(productId) {
    await axios.delete(`/api/products/${productId}`, {
      headers: {
        authorization: token,
      },
    });
    const updatedProductsState = [...products].filter(
      (product) => product.id !== productId
    );
    setProducts(updatedProductsState);
    setShowDeleteModal(false);
    setProductToBeDeleteId();
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
          <ProductCard
            key={product.id}
            product={product}
            adminView={true}
            handleClickDelete={() => {
              setShowDeleteModal(true);
              setProductToBeDeleteId(product.id);
            }}
            handleClickUpdate={() => {
              setShowSlideInModal(true);
              setProductToBeUpdated(product);
            }}
          />
        ))}
      </div>

      {showSlideInModal && productToBeUpdated.id && (
        <DrawerWithForm
          setShowSlideInModal={setShowSlideInModal}
          products={products}
          setProducts={setProducts}
          isUpdate={true}
          selectedProduct={productToBeUpdated}
          setSelectedProduct={setProductToBeUpdated}
        />
      )}
      {showSlideInModal && !productToBeUpdated.id && (
        <DrawerWithForm
          setShowSlideInModal={setShowSlideInModal}
          products={products}
          setProducts={setProducts}
        />
      )}

      {showDeleleModal && (
        <Modal
          title="Are you sure?"
          message="You are about to permanently delete a product"
          actionText="Delete"
          handleConfirm={() => handleDeleteProduct(productToBeDeleteId)}
          handleCancel={() => setShowDeleteModal(false)}
        />
      )}
    </div>
  );
}

export default AdminProducts;
