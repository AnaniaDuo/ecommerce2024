import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useHistory } from "react-router-dom";
import Button from "./reusableComponents/Button";
import ProductHorizontalCard from "./ProductHorizontalCard";
import EmptyCartView from "./EmptyCartView";
import { TOKEN } from "../components/utilities/constants";

function Cart() {
  const [cartProducts, setCartProducts] = useState([]);
  const { userId } = useParams();
  const history = useHistory();
  const token = window.localStorage.getItem(TOKEN);

  useEffect(() => {
    async function fetchCart() {
      const { data } = await axios.get(`/api/users/${userId}/cart`, {
        headers: {
          authorization: token,
        },
      });
      setCartProducts(data.products);
    }
    fetchCart();
  }, []);

  async function handleCheckout() {
    await axios.put(
      `/api/users/${userId}/checkout`,
      {
        isCompleted: true,
      },
      {
        headers: {
          authorization: token,
        },
      }
    );
    history.push("/home");
  }

  if (!cartProducts.length) {
    return <EmptyCartView />;
  }

  return (
    <div className="flex flex-wrap justify-center gap-4 mt-6 py-8">
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
