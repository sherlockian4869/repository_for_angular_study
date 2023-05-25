const jwt = require("jsonwebtoken");
const config = require("../config/dev");
const User = require("../model/user");

function notAuthorized(res) {
  return res.status(401).send({
    errors: [{ title: "not authorized", detail: "you need to login!" }],
  });
}

exports.authMiddleware = function (req, res, next) {
  const token = req.headers.authorization;
  if (!token) {
    return notAuthorized(res);
  }

  jwt.verify(token.split(" ")[1], config.SECRET, function (err, decodedToken) {
    if (err) {
      return res.status(401).send({
        errors: [{ title: "not authorized", detail: "invalid token" }],
      });
    }

    User.findById(decodedToken.userid)
      .then((foundUser) => {
        if (!foundUser) {
          return res.status(401).send({
            errors: [{ title: "not authorized", detail: "user not found" }],
          });
        }
        next();
      })
      .catch((err) => {
        return res.status(401).send({
          errors: [{ title: "not authorized", detail: "invalid token" }],
        });
      });
  });
};
