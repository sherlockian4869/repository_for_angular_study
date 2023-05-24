const express = require("express");
const router = express.Router();
const User = require("../model/user");
const jwt = require("jsonwebtoken");
const config = require("../config/dev");

router.post("/login", function (req, res) {
  const { email, password } = req.body;

  if (!email) {
    return res.status(422).send({
      error: [{ title: "user error", detail: "Please fill email" }],
    });
  }

  if (!password) {
    return res.status(422).send({
      error: [{ title: "user error", detail: "Please fill password" }],
    });
  }

  User.findOne({ email }).then((foundUser) => {
    if (!foundUser) {
      return res.status(422).send({
        error: [{ title: "user error", detail: "user is not exist" }],
      });
    }
    if (!foundUser.hasSamePassword(password)) {
      return res.status(422).send({
        error: [{ title: "user error", detail: "incorrect password" }],
      });
    }
    const token = jwt.sign(
      {
        userid: foundUser.id,
        username: foundUser.username,
      },
      config.SECRET,
      { expiresIn: "1h" }
    );
    return res.json(token);
  });
});

router.post("/signup", function (req, res) {
  const { username, email, password, confirmPassword } = req.body;
  /**
   *const username = req.body.username;
   *const email = req.body.email;
   * const password = req.body.password;
   *const confirmPassword = req.body.confirmPassword;
   */

  if (!username) {
    return res.status(422).send({
      error: [{ title: "user error", detail: "Please fill username" }],
    });
  }

  if (!email) {
    return res.status(422).send({
      error: [{ title: "user error", detail: "Please fill email" }],
    });
  }

  if (!password) {
    return res.status(422).send({
      error: [{ title: "user error", detail: "Please fill password" }],
    });
  }

  if (password !== confirmPassword) {
    return res.status(422).send({
      error: [{ title: "user error", detail: "Please check passwords" }],
    });
  }

  User.findOne({ email }).then((foundUser) => {
    if (foundUser) {
      return res.status(422).send({
        error: [{ title: "user error", detail: "user already exist" }],
      });
    }

    const user = new User({ username, email, password });
    user
      .save()
      .then(() => {
        return res.json({ register: true });
      })
      .catch((err) => {
        if (err) {
          return res.status(422).send({
            error: [{ title: "user error", detail: "something went wrong" }],
          });
        }
      });
  });
});

module.exports = router;
