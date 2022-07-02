const router = require("express").Router();
const { celebrate, Joi } = require("celebrate");
const { login, createUser } = require("../controllers/users");
const usersRouter = require("./users");
const productRouter = require("./product");
const orderRouter = require("./order");
const errorsRouter = require("./errors");
const auth = require("../middlewares/auth");

router.post("/api/signin", celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
  }),
}), login);
router.post("/api/signup", celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
    name: Joi.string().min(2).max(30).required(),
  }),
}), createUser);
router.use(auth);
router.use("/", usersRouter);
router.use("/", productRouter);
router.use("/", orderRouter);
router.use("*", errorsRouter);
module.exports = router;
