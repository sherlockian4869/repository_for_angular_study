const express = require("express");
const router = express.Router();
const Product = require("../model/product");

router.get("", function (req, res) {
  Product.find()
    .then((foundProducts) => {
      res.json(foundProducts);
    })
    .catch((err) => {
      // エラーハンドリング
      console.error(err);
      res.status(500).json({ error: "サーバーエラーが発生しました" });
    });
});

router.get("/:productId", function (req, res) {
  const productId = req.params.productId;
  Product.findById(productId)
    .then((foundProduct) => {
      res.json(foundProduct);
    })
    .catch((err) => {
      // エラーハンドリング
      console.error(err);
      res.status(500).json({ error: "サーバーエラーが発生しました" });
    });
});

module.exports = router;
