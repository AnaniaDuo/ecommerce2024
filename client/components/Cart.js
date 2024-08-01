import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

function Cart() {
  const [cartProducts, setCartProducts] = useState([]);
  const { userId } = useParams();

  useEffect(() => {
    async function fetchCart() {
      const { data } = await axios.get(`/api/users/${userId}/cart`);
      setCartProducts(data.products);
    }
    fetchCart();
  }, []);

  return (
    <div>
      {cartProducts.map((product) => (
        <div key={product.id}>
          <div>Product name: {product.name}</div>
          <div>Quantity: {product.OrderDetails.quantity}</div>
          <div>Price: ${product.OrderDetails.quantity * product.price}</div>
        </div>
      ))}
    </div>
  );
}

export default Cart;
