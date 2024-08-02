import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useHistory } from "react-router-dom";
import Button from "./reusableComponents/Button";
import ProductHorizontalCard from "./ProductHorizontalCard";

function Cart() {
  const [cartProducts, setCartProducts] = useState([]);
  const { userId } = useParams();
  const history = useHistory();

  useEffect(() => {
    async function fetchCart() {
      const { data } = await axios.get(`/api/users/${userId}/cart`);
      setCartProducts(data.products);
    }
    fetchCart();
  }, []);

  async function handleCheckout() {
    const { data } = await axios.put(`/api/users/${userId}/checkout`, {
      isCompleted: true,
    });
    console.log("what is data after checkout", data);
    history.push("/home");
  }

  return (
    <div className="flex flex-wrap justify-center gap-4 py-8">
      {cartProducts.map((product) => (
        <ProductHorizontalCard key={product.id} product={product} />
      ))}
      <div className="fixed bottom-8 left-0 flex justify-center w-full">
        <Button text="Checkout" onClickFunc={handleCheckout} />
      </div>
    </div>
  );
}

export default Cart;
