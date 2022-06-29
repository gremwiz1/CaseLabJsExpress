const mongoose = require("mongoose");

const productsSchema = new mongoose.Schema({
  idProduct: {
    type: mongoose.ObjectId,
    required: true,
    ref: "product",
  },
  quantity: {
    type: Number,
    required: true,
  },
});
const orderSchema = new mongoose.Schema({
  orderPerson: {
    type: mongoose.ObjectId,
    required: true,
    ref: "user",
  },
  orderPrice: {
    type: Number,
    required: true,
  },
  check: { // обработан ли заказ
    type: Boolean,
    default: false,
  },
  comment: {
    type: String,
  },
  orderProducts: [
    productsSchema,
  ],
});
module.exports = mongoose.model("product", orderSchema);
