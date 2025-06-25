const express = require("express");

const {
  getAllOrders,
  createOrder,
} = require("../../controller/orderController");

const route = express.Router();

route.post("/createorder", createOrder);
route.get("/getallorder", getAllOrders);
module.exports = route;
