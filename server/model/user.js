const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt");

const UserSchema = new Schema({
  username: {
    type: String,
    require: true,
    max: [60, "60文字以下で入力してください"],
  },
  email: {
    type: String,
    require: true,
    lowercase: true,
    unipue: true,
    max: [30, "30文字以下で入力してください"],
  },
  password: {
    type: String,
    require: true,
    min: [6, "6文字以上で入力してください"],
    max: [20, "20文字以下で入力してください"],
  },
});

UserSchema.pre("save", function (next) {
  const user = this;
  const saltRounds = 10;

  bcrypt.genSalt(saltRounds, function (err, salt) {
    bcrypt.hash(user.password, salt, function (err, hash) {
      user.password = hash;
      next();
    });
  });
});

UserSchema.methods.hasSamePassword = function (inputPassword) {
  const user = this;
  return bcrypt.compareSync(inputPassword, user.password);
};

module.exports = mongoose.model("User", UserSchema);
