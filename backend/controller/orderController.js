const Order = require("../models/orderShcema");

// Create a new order
const createOrder = async (req, res) => {
  try {
    const { fullName, email, phone, address, total, paymentStatus, cartItems } =
      req.body;

    if (
      !fullName ||
      !email ||
      !phone ||
      !address ||
      !total ||
      !cartItems?.length
    ) {
      return res.status(400).json({ message: "All fields are required." });
    }

    const newOrder = new Order({
      fullName,
      email,
      phone,
      address,
      total,
      paymentStatus,
      cartItems,
    });

    const savedOrder = await newOrder.save();
    res.status(201).json(savedOrder);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Get all orders
const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    res.status(200).json(orders);
  } catch (error) {
    console.error("Fetching orders error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = {
  createOrder,
  getAllOrders,
};
