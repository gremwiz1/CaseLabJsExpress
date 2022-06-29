const mongoose = require("mongoose");
const { isURL } = require("validator");
const ANSWER = require("../utils/answers");

const productSchema = new mongoose.Schema({
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
    validate: {
      validator: (v) => isURL(v),
      message: ANSWER.ImageNotUrl,
    },
  },
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  quantity: {
    type: Number,
    default: 0,
  },
});
module.exports = mongoose.model("product", productSchema);
