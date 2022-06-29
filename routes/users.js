const router = require("express").Router();
const { celebrate, Joi } = require("celebrate");
const {
  updateUser, getInfoAboutMe, changeBalanceUser,
} = require("../controllers/users");

router.get("/api/users/me", getInfoAboutMe);
router.patch("/api/users/me", celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    email: Joi.string().required().email(),
  }),
}), updateUser);
router.patch("/api/users/balance", celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    email: Joi.string().required().email(),
    balance: Joi.number().min(0).required(),
  }),
}), changeBalanceUser);
module.exports = router;
