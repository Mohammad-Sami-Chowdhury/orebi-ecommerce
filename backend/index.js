require("dotenv").config();
const express = require("express");
var cors = require("cors");
const database = require("./database/database");
const route = require("./route");
const session = require("express-session");
const MongoDBStore = require("connect-mongodb-session")(session);
const app = express();

const port = 5000;
database();
app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:5173", "http://localhost:3000", "https://orebi-ecommerce-ten.vercel.app"],
    credentials: true,
  })
);
const store = new MongoDBStore({
  uri: process.env.DATABASE_URL,
  collection: "mySessions",
});
app.use(
  session({
    secret: "e-commerce",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },
    store: store,
  })
);
app.use(route);
const path = require("path");
app.use("/upload", express.static(path.join(__dirname, "upload")));

app.listen(port, (req, res) => {
  console.log("Back-end is running");
});
