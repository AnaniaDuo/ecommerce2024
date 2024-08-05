import React, { useState, useEffect } from "react";
import { useParams, Link, useHistory } from "react-router-dom";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import Button from "./reusableComponents/Button";
import { TOKEN } from "../components/utilities/constants";

function SingleProduct() {
  const userId = useSelector((state) => {
    return state.auth.id;
  });
  const { productId } = useParams();
  const [product, setProduct] = useState({});
  const history = useHistory();
  const REACT_APP_BASE_URL = "http://localhost:8080";
  const token = window.localStorage.getItem(TOKEN);

  useEffect(() => {
    async function fetchSingleProduct() {
      const { data } = await axios.get(`/api/products/${productId}`);
      setProduct(data);
    }
    fetchSingleProduct();
  }, []);

  async function handleAddToCart() {
    const response = await axios.post(
      `/api/users/${userId}/cart`,
      {
        productId,
      },
      {
        headers: {
          authorization: token,
        },
      }
    );
    console.log("response", response);
    if (response.status === 200) {
      console.log("about to navigate to new page");
      history.push(`/users/${userId}/cart`);
    }
  }

  return (
    <div className="flex p-4 gap-8 mt-8">
      <div className="flex justify-center">
        <img src={`${REACT_APP_BASE_URL}/${product.imageUrl}`} />
      </div>
      <div className="space-y-2">
        <h2>{product.name}</h2>
        <div className="text-xl font-medium">${product.price}</div>

        <div>{product.description}</div>
        <Button text="Add to Cart" onClickFunc={handleAddToCart} />
      </div>
    </div>
  );
}

export default SingleProduct;
