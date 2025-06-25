const express = require("express");
const route = express.Router();
const authRoute = require("./authentication");
const categoryRoute = require("./category");
const subCategoryRoute = require("./subCategory");
const productRoute = require("./product");
const orderRoute = require("./order");
const userRoute = require("./user");

route.use("/authentication", authRoute);
route.use("/category", categoryRoute);
route.use("/subcategory", subCategoryRoute);
route.use("/product", productRoute);
route.use("/users", userRoute);
route.use("/order", orderRoute);
module.exports = route;
