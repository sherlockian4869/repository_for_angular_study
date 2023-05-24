const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ProductSchema = new Schema({
  coverImage: String,
  name: {
    type: String,
    require: true,
    max: [60, "60文字以下で入力してください"],
  },
  price: Number,
  description: String,
  heading1: String,
  heading2: String,
  heading3: String,
  headingtext1: String,
  headingtext2: String,
  headingtext3: String,
});

module.exports = mongoose.model("Product", ProductSchema);
