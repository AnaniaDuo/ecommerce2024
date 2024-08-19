import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { useParams, useHistory } from "react-router-dom";
import Button from "./reusableComponents/Button";
import ErrorMessage from "./reusableComponents/ErrorMessage";
import ProductHorizontalCard from "./ProductHorizontalCard";
import EmptyCartView from "./EmptyCartView";
import { TOKEN, inputStyle } from "../components/utilities/constants";
import { validateForm } from "./utilities";
import Modal from "./reusableComponents/Modal";

function Cart() {
  const [cartProducts, setCartProducts] = useState([]);
  const [showCheckoutModal, setShowCheckoutModal] = useState(false);
  const [total, setTotal] = useState(0);
  const { userId } = useParams();
  const history = useHistory();
  const user = useSelector((state) => {
    return state.auth;
  });
  const token = window.localStorage.getItem(TOKEN);
  const INITIAL_CHECKOUT_STATE = {
    email: "",
    nameOnCard: "",
    cardNumber: "",
    exp: "",
    cvc: "",
    address: "",
    city: "",
    state: "",
    postal: "",
  };
  const [checkoutInfo, setCheckoutInfo] = useState(INITIAL_CHECKOUT_STATE);
  const [error, setError] = useState({});
  console.log("what is cartproduct", cartProducts);

  useEffect(() => {
    async function fetchCart() {
      const response = await axios.get(`/api/users/${userId}/cart`, {
        headers: {
          authorization: token,
        },
      });
      if (response.status === 200) {
        setCartProducts(response.data?.products);
      }
    }
    fetchCart();
  }, []);

  useEffect(() => {
    if (cartProducts?.length > 0) {
      let totalPrice = 0;
      for (let i = 0; i < cartProducts.length; i++) {
        const quantity = cartProducts[i].OrderDetails.quantity;
        const price = cartProducts[i].price;
        totalPrice += quantity * price;
      }
      setTotal(totalPrice);
    }
  }, [cartProducts]);

  async function handleCheckout() {
    await axios.put(
      `/api/users/${userId}/checkout`,
      {
        isCompleted: true,
        cartProducts,
      },
      {
        headers: {
          authorization: token,
        },
      }
    );
    history.push("/home");
  }

  async function handleDeleteProductInCart(productId) {
    await axios.delete(`/api/users/${userId}/cart/${productId}`, {
      headers: {
        authorization: token,
      },
    });
    const filterCartProducts = [...cartProducts].filter(
      (prod) => prod.id !== productId
    );
    setCartProducts(filterCartProducts);
  }

  function handleChange(e) {
    const { name, value } = e.target;
    console.log("is changing");
    setError({ ...error, [name]: "" });
    setCheckoutInfo((prevState) => ({ ...prevState, [name]: value }));
  }

  function handleConfirmCheckout() {
    const err = validateForm(checkoutInfo);
    if (Object.keys(err).length !== 0) {
      setError(err);
      return;
    }
    handleCheckout();
  }

  function handleCancelCheckout() {
    setError({});
    setShowCheckoutModal(false);
  }

  if (!cartProducts?.length) {
    return <EmptyCartView />;
  }

  return (
    <div className="flex flex-wrap justify-center gap-4 mt-6 pb-8">
      {cartProducts.map((product, idx) => (
        <ProductHorizontalCard
          key={product.id}
          product={product}
          cartProducts={cartProducts}
          setCartProducts={setCartProducts}
          idx={idx}
          handleDeleteProductInCart={handleDeleteProductInCart}
        />
      ))}
      <div className="text-xl font-bold w-full text-right">Total: ${total}</div>
      <div className="fixed bottom-8 left-0 flex justify-center w-full">
        <Button
          text="Checkout"
          onClickFunc={() => setShowCheckoutModal(true)}
        />
      </div>
      {showCheckoutModal && (
        <Modal
          title="Check out Information"
          message=""
          showIcon={false}
          actionText="Checkout"
          buttonColor="bg-gray-900 hover:bg-gray-700"
          handleConfirm={handleConfirmCheckout}
          handleCancel={handleCancelCheckout}
        >
          <form>
            <div>
              <label name="email" htmlFor="email">
                Email address
              </label>
              <input
                className={inputStyle}
                type="email"
                name="email"
                value={checkoutInfo.email}
                onChange={handleChange}
                required
              />
              <ErrorMessage message={error?.email} />
            </div>
            <div>
              <label name="nameOnCard"> </label>
              Name on card
              <input
                className={inputStyle}
                type="text"
                name="nameOnCard"
                value={checkoutInfo.nameOnCard}
                onChange={handleChange}
              />
              <ErrorMessage message={error?.nameOnCard} />
            </div>
            <div>
              <label name="cardNumber"> </label>
              Card number
              <input
                className={inputStyle}
                type="text"
                name="cardNumber"
                value={checkoutInfo.cardNumber}
                onChange={handleChange}
              />
              <ErrorMessage message={error?.cardNumber} />
            </div>
            <div className="flex gap-2 -mx-1">
              <label name="exp">
                Expiration date (MM/YY)
                <input
                  className={inputStyle}
                  type="text"
                  name="exp"
                  value={checkoutInfo.exp}
                  onChange={handleChange}
                />
                <ErrorMessage message={error?.exp} />
              </label>

              <label name="cvc">
                CVC
                <input
                  className={inputStyle}
                  type="number"
                  name="cvc"
                  value={checkoutInfo.cvc}
                  onChange={handleChange}
                />
                <ErrorMessage message={error?.cvc} />
              </label>
            </div>
            <label name="address">
              Address
              <input
                className={inputStyle}
                type="text"
                name="address"
                value={checkoutInfo.address}
                onChange={handleChange}
              />
              <ErrorMessage message={error?.address} />
            </label>
            <div className="flex gap-2 -mx-1">
              <label name="city">
                City
                <input
                  className={inputStyle}
                  type="text"
                  name="city"
                  value={checkoutInfo.city}
                  onChange={handleChange}
                />
                <ErrorMessage message={error?.city} />
              </label>
              <label name="state">
                State
                <input
                  className={inputStyle}
                  type="text"
                  name="state"
                  value={checkoutInfo.state}
                  onChange={handleChange}
                />
                <ErrorMessage message={error?.state} />
              </label>
              <label name="postal">
                Postal code
                <input
                  className={inputStyle}
                  type="number"
                  name="postal"
                  value={checkoutInfo.postal}
                  onChange={handleChange}
                />
                <ErrorMessage message={error?.postal} />
              </label>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
}

export default Cart;
