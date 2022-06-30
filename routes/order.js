const router = require("express").Router();
const { celebrate, Joi } = require("celebrate");

const {
  createOrder, updateOrder, getOrder, getAllOrders, deleteOrder, getAllOrdersByUserId,
} = require("../controllers/orders");

router.get("/api/order/:orderId", getOrder);
router.get("/api/allOrders", getAllOrders);
router.get("/api/allOrdersByUser", getAllOrdersByUserId);
router.post("/api/order", celebrate({
  body: Joi.object().keys({
    orderProducts: Joi.array().items(Joi.object().keys({
      idProduct: Joi.string().length(24).hex().required(),
      quantity: Joi.number().min(1).required(),
    })),
    comment: Joi.string(),
    orderPrice: Joi.number().required(),
  }),
}), createOrder);
router.patch("/api/order/:orderId", celebrate({
  body: Joi.object().keys({
    orderPerson: Joi.string().length(24).hex(),
    orderProducts: Joi.array().items(Joi.object().keys({
      idProduct: Joi.string().length(24).hex(),
      quantity: Joi.number().min(1),
    })),
    comment: Joi.string(),
    orderPrice: Joi.number(),
    check: Joi.boolean(),
    orderStatus: Joi.number(),
  }),
}), updateOrder);
router.delete("/api/order/:orderId", celebrate({
  params: Joi.object().keys({
    orderId: Joi.string().length(24).hex(),
  }),
}), deleteOrder);
module.exports = router;
