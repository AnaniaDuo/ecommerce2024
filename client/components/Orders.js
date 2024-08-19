import React, { useState, useEffect } from "react";
import axios from "axios";
import { TOKEN } from "../components/utilities/constants";
import Button from "./reusableComponents/Button";
import { ToastContainer, toast } from "react-toastify";

function Orders() {
  const token = window.localStorage.getItem(TOKEN);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    async function fetchOrders() {
      const { data } = await axios.get("/api/orders", {
        headers: {
          authorization: token,
        },
      });
      console.log("what is all orders", data);
      setOrders(data);
    }
    fetchOrders();
  }, []);

  async function handleFullfillOrder(orderId) {
    console.log("fullfill");
    const response = await axios.post(
      `/api/orders/${orderId}`,
      {
        isFullfilled: true,
      },
      {
        headers: {
          authorization: token,
        },
      }
    );

    if (response.status === 200) {
      const updatedOrder = response.data;
      let newOrders = [...orders];
      const index = newOrders.findIndex(
        (order) => order.id === updatedOrder.id
      );
      newOrders[index] = updatedOrder;
      setOrders(newOrders);
      toast("Successfully updated order");
    } else {
      toast("Error updating order in database");
    }
  }

  function getReadableDate(updatedAt) {
    const date = new Date(updatedAt);

    // Format the date to a more readable format
    const readableDate = date.toLocaleString("en-US", {
      weekday: "long", // "Saturday"
      year: "numeric", // "2024"
      month: "long", // "August"
      day: "numeric", // "16"
      hour: "numeric", // "12" for 12 PM or "00" for 24-hour format
      minute: "numeric", // "08"
      second: "numeric", // "03"
      hour12: true, // "12:08:03 AM"
    });
    return readableDate;
  }

  return (
    <div>
      {orders.map((order) => (
        <div
          key={order.id}
          className="border rounded-lg p-6 mt-6 bg-white shadow-lg"
        >
          <div>Order ID: {order.id}</div>
          <div>Is completed: {order.isCompleted ? "YES" : "NO"}</div>
          <div>Is fullFilled: {order.isFullfilled ? "YES" : "NO"}</div>
          <div>Last time update: {getReadableDate(order.updatedAt)}</div>
          <div className="flex flex-wrap mb-6 gap-4">
            {order.products.map((product) => (
              <div key={product.id} className="border rounded-lg p-4">
                <div className="border-b-2">Product name: {product.name}</div>
                <div className="border-b-2">
                  Product quantity: {product.OrderDetails.quantity}
                </div>
                <div>
                  Quantity left in inventory: {product.inventoryQuantity}
                </div>
              </div>
            ))}
          </div>
          {!order.isFullfilled && (
            <Button
              text="Mark as Fullfilled"
              onClickFunc={() => handleFullfillOrder(order.id)}
            />
          )}
        </div>
      ))}
      <ToastContainer autoClose={1500} theme="light" />
    </div>
  );
}

export default Orders;
