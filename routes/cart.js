const router = require("express").Router();
const { celebrate, Joi } = require("celebrate");
const { isURL } = require("validator");
const ANSWER = require("../utils/answers");

const method = (value) => {
  const result = isURL(value);
  if (result) {
    return value;
  }
  throw new Error(ANSWER.NotCorrectUrl);
};
const {
  getProduct, getAllProducts, updateProduct, createProduct, deleteProduct,
} = require("../controllers/products");

router.get("/api/product/:productId", getProduct);
router.get("/api/allProducts", getAllProducts);
router.post("/api/product", celebrate({
  body: Joi.object().keys({
    description: Joi.string().required(),
    image: Joi.string().required().custom(method),
    name: Joi.string().required(),
    price: Joi.number().required(),
  }),
}), createProduct);
router.patch("/api/product/:productId", celebrate({
  body: Joi.object().keys({
    description: Joi.string().required(),
    image: Joi.string().required().custom(method),
    name: Joi.string().required(),
    price: Joi.number().required(),
  }),
}), updateProduct);
router.delete("/api/product/:productId", celebrate({
  params: Joi.object().keys({
    productId: Joi.string().length(24).hex(),
  }),
}), deleteProduct);
module.exports = router;
