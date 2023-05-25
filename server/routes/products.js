const express = require("express");
const router = express.Router();
const Product = require("../model/product");
const UserCtrl = require("../controllers/user");

router.get("", function (req, res) {
  Product.find()
    .then((foundProducts) => {
      return res.json(foundProducts);
    })
    .catch((err) => {
      return res.status(500).json({ error: "サーバーエラーが発生しました" });
    });
});

router.get("/:productId", UserCtrl.authMiddleware, function (req, res) {
  const productId = req.params.productId;
  Product.findById(productId)
    .then((foundProduct) => {
      return res.json(foundProduct);
    })
    .catch((err) => {
      return res.status(422).send({
        errors: [
          {
            title: "product error",
            detail: "product not found",
          },
        ],
      });
    });
});

module.exports = router;
