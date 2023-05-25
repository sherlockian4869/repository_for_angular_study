const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const config = require("./config/dev");
const FakeDB = require("./fake_db");

const productRoutes = require("./routes/products");
const userRoutes = require("./routes/users");

mongoose.connect(config.DB_URI).then(() => {
  console.log("Connected!");
  const fakeDb = new FakeDB();
  //   fakeDb.initDb();
});

const app = express();
app.use(bodyParser.json());

app.use("/api/v1/products", productRoutes);
app.use("/api/v1/users", userRoutes);

const PORT = process.env.PORT || "3001";

app.listen(PORT, function () {
  console.log("running server");
});
