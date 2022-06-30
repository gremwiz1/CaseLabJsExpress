const Order = require("../models/order");
const User = require("../models/user");
const Product = require("../models/product");
const BadRequestError = require("../errors/bad-request-err");
const NotFoundError = require("../errors/not-found-err");
const ForbiddenError = require("../errors/forbidden-err");
const PaymentRequiredError = require("../errors/payment-required-err");
const ANSWER = require("../utils/answers");

module.exports.getAllOrders = (req, res, next) => {
  if (req.user.isAdmin) {
    Order.find({})
      .then((orders) => res.status(200).send(orders))
      .catch(next);
  } else {
    next(new ForbiddenError(ANSWER.ForbiddenGetAllOrders));
  }
};
module.exports.getAllOrdersByUserId = (req, res, next) => {
  Order.find({ orderPerson: req.user._id })
    .then((orders) => res.status(200).send(orders))
    .catch(next);
};
module.exports.getOrder = (req, res, next) => {
  Order.findById(req.params.orderId)
    .then((order) => {
      if (order.orderPerson === req.user._id) {
        res.status(200).send(order);
      } else {
        next(new ForbiddenError(ANSWER.ForbiddenGetOrder));
      }
    })
    .catch(next);
};
module.exports.createOrder = (req, res, next) => {
  const {
    orderPerson, comment, orderProducts, orderPrice,
  } = req.body;
  User.findById(orderPerson)
    .orFail(new Error("NotValidIdUser"))
    .then((user) => {
      if (user.balance < orderPrice) {
        next(new PaymentRequiredError(ANSWER.UserNotEnoughBalance));
      } else {
        // eslint-disable-next-line no-restricted-syntax
        for (const product of orderProducts) {
          Product.findById(product.idProduct)
            .orFail(new Error("NotValidIdProduct"))
            .then((goods) => {
              if (product.quantity > goods.quantity) {
                next(new BadRequestError(ANSWER.ProductNotEnoughQuantity));
              }
            })
            .catch((err) => {
              if (err.message === "NotValidIdProduct") {
                next(new NotFoundError(ANSWER.NotFoundProduct));
              } else {
                next(err);
              }
            });
        }
        Order.create({
          orderPerson, comment, orderProducts, orderPrice,
        })
          .then((order) => {
            User.updateOne({ _id: orderPerson }, { $inc: { balance: -orderPrice } });
            // eslint-disable-next-line no-restricted-syntax
            for (const product of orderProducts) {
              Product.updateOne({ _id: product.idProduct },
                { $inc: { quantity: -product.quantity } });
            }
            res.status(200).send(order);
          })
          .catch((err) => {
            if (err.name === "ValidationError") {
              next(new BadRequestError(ANSWER.BadRequest));
            } else {
              next(err);
            }
          });
      }
    })
    .catch((err) => {
      if (err.message === "NotValidIdUser") {
        next(new NotFoundError(ANSWER.UserNotFound));
      } else {
        next(err);
      }
    });
};
module.exports.updateOrder = (req, res, next) => {
  const {
    orderPerson, comment, orderProducts, orderPrice, check, orderStatus,
  } = req.body;
  if (req.user.isAdmin) {
    Order.findByIdAndUpdate(req.orderId,
      {
        orderPerson, comment, orderProducts, orderPrice, check, orderStatus,
      },
      { new: true, runValidators: true, upsert: true })
      .orFail(new Error("NotValidIdOrder"))
      .then((product) => res.status(200).send(product))
      .catch((err) => {
        if (err.message === "NotValidIdOrder") {
          next(new NotFoundError(ANSWER.OrderNotFound));
        } else if (err.name === "ValidationError") {
          next(new BadRequestError(ANSWER.BadRequest));
        } else {
          next(err);
        }
      });
  } else {
    next(new ForbiddenError(ANSWER.ForbiddenUpdateOrder));
  }
};
module.exports.deleteOrder = (req, res, next) => {
  Order.findById(req.params.orderId)
    .orFail(new Error("NotValidIdOrder"))
    .then((order) => {
      if (req.user.isAdmin) {
        order.remove();
        return res.status(200).send({ message: ANSWER.OrderSuccessDelete });
      }
      return Promise.reject(new Error("YouNotDeleteOrder"));
    })
    .catch((err) => {
      if (err.message === "NotValidIdOrder") {
        next(new NotFoundError(ANSWER.OrderNotFound));
      } else if (err.message === "YouNotDeleteOrder") {
        next(new ForbiddenError(ANSWER.ForbiddenDeleteOrder));
      } else if (err.name === "CastError") {
        next(new BadRequestError(ANSWER.BadRequest));
      } else {
        next(err);
      }
    });
};
