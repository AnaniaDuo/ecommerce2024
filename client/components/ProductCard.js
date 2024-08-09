import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Button from "./reusableComponents/Button";
import axios from "axios";
import { TOKEN } from "../components/utilities/constants";
import { ToastContainer, toast } from "react-toastify";

function ProductCard({
  product,
  adminView = false,
  handleClickDelete = () => {},
  handleClickUpdate = () => {},
}) {
  const { id, name, description, imageUrl, price } = product;
  const userId = useSelector((state) => {
    return state.auth.id;
  });

  async function handleAddToCart() {
    console.log("add to cart");
    const token = window.localStorage.getItem(TOKEN);
    const response = await axios.post(
      `/api/users/${userId}/cart`,
      {
        productId: id,
      },
      {
        headers: {
          authorization: token,
        },
      }
    );

    if (response.status === 200) {
      console.log("successfull added to cart");
      toast("Successfully added to cart!");
    } else {
      toast("Error adding to cart");
    }
  }

  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg hover:bg-gray-200 h p-2 text-gray-700">
      <button className="">
        <Link to={`/products/${id}`}>
          <img
            className="w-80 max-h-80"
            src={imageUrl}
            alt="Product image"
            loading="lazy"
          />
          <div className="px-6 py-3 flex items-center justify-center">
            <span className="font-bold text-xl">{name}</span>
            <span className="mx-2 ">${price}</span>
          </div>
        </Link>
      </button>
      {adminView ? (
        <div className="w-full flex justify-center gap-2">
          <Button text="Delete" onClickFunc={handleClickDelete} />
          <Button text="Update" onClickFunc={handleClickUpdate} />
        </div>
      ) : (
        <div className="w-full flex justify-center mb-3">
          <Button text="Add to Cart" onClickFunc={handleAddToCart} />
        </div>
      )}
    </div>
  );
}

export default ProductCard;
