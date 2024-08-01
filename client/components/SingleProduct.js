import React, { useState, useEffect } from "react";
import { useParams, Link, useHistory } from "react-router-dom";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";

function SingleProduct() {
  const userId = useSelector((state) => {
    return state.auth.id;
  });
  const { productId } = useParams();
  const [product, setProduct] = useState({});
  const history = useHistory();

  useEffect(() => {
    async function fetchSingleProduct() {
      const { data } = await axios.get(`/api/products/${productId}`);
      setProduct(data);
    }
    fetchSingleProduct();
  }, []);

  async function handleAddToCart() {
    console.log("what is product id now", productId, typeof productId);
    const response = await axios.post(`/api/users/${userId}/cart`, {
      productId,
    });
    console.log("response", response);
    if (response.status === 200) {
      console.log("about to navigate to new page");
      history.push(`/users/${userId}/cart`);
    }
  }

  console.log("what is product id", productId);
  return (
    <div className="flex p-4 gap-8">
      <div className="flex justify-center">
        <img src={product.imageUrl} />
      </div>
      <div className="space-y-2">
        <h2>{product.name}</h2>
        <div className="text-xl font-medium">${product.price}</div>

        <div>{product.description}</div>
        <button
          className="bg-green-700 hover:bg-green-900 text-white font-bold py-2 px-4 rounded-full"
          onClick={handleAddToCart}
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}

export default SingleProduct;
