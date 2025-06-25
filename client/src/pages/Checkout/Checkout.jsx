import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";

const Checkout = () => {
  const location = useLocation();
  const { subTotal, shippingCharge, total, cartItems } = location.state || {};
  console.log(location);

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    address: "",
    phone: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const orderData = {
      ...formData,
      total,
      paymentStatus: "Unpaid",
      cartItems,
    };

    try {
      const res = await axios.post(
        "http://localhost:5000/api/v1/order/createorder",
        orderData
      );
      alert("Order Placed Successfully!");
    } catch (error) {
      console.error("Order failed:", error);
      alert("Order Failed");
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <h2 className="text-3xl font-bold mb-8">Checkout</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <form onSubmit={handleSubmit} className="space-y-4">
          <h3 className="text-xl font-semibold mb-4">Billing Details</h3>
          <input
            name="fullName"
            onChange={handleChange}
            placeholder="Full Name"
            className="w-full border px-4 py-2 rounded"
            required
          />
          <input
            name="email"
            type="email"
            onChange={handleChange}
            placeholder="Email"
            className="w-full border px-4 py-2 rounded"
            required
          />
          <input
            name="address"
            onChange={handleChange}
            placeholder="Address"
            className="w-full border px-4 py-2 rounded"
            required
          />
          <input
            name="phone"
            onChange={handleChange}
            placeholder="Phone"
            className="w-full border px-4 py-2 rounded"
            required
          />
          <button
            type="submit"
            className="mt-4 bg-[#000000d0] text-white px-4 py-2 rounded"
          >
            Place Order
          </button>
        </form>

        <div className="bg-gray-100 p-6 rounded-lg shadow">
          <h3 className="text-xl font-semibold mb-4">Order Summary</h3>
          <ul className="space-y-2 mb-4">
            <li className="flex justify-between">
              <span>Sub Total</span>
              <span>${subTotal}</span>
            </li>
            <li className="flex justify-between">
              <span>Shipping</span>
              <span>${shippingCharge}</span>
            </li>
          </ul>
          <div className="flex justify-between font-bold border-t pt-4">
            <span>Total</span>
            <span>${total}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
