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
  /*
      0 — новый
      1 — Принят, готовится
      2 - У курьера
      3 - Выдан
      7 — отменён
    */
  orderStatus: {
    type: Number,
    default: 0,
  },
});
module.exports = mongoose.model("order", orderSchema);
