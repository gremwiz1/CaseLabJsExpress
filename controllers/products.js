const Product = require("../models/product");
const BadRequestError = require("../errors/bad-request-err");
const NotFoundError = require("../errors/not-found-err");
const ForbiddenError = require("../errors/forbidden-err");
const ANSWER = require("../utils/answers");

module.exports.getAllProducts = (req, res, next) => {
  Product.find({})
    .then((products) => res.status(200).send(products))
    .catch(next);
};
module.exports.getProduct = (req, res, next) => {
  Product.findById(req.params.productId)
    .then((product) => res.status(200).send(product))
    .catch(next);
};
module.exports.createProduct = (req, res, next) => {
  const {
    description, image, name, price,
  } = req.body;
  if (req.user.isAdmin) {
    Product.create({
      description,
      image,
      name,
      price,
    })
      .then((product) => res.status(200).send(product))
      .catch((err) => {
        if (err.name === "ValidationError") {
          next(new BadRequestError(ANSWER.BadRequest));
        } else {
          next(err);
        }
      });
  } else {
    next(new ForbiddenError(ANSWER.ForbiddenCreateProduct));
  }
};
module.exports.updateProduct = (req, res, next) => {
  const {
    description, image, name, price, quantity,
  } = req.body;
  if (req.user.isAdmin) {
    Product.findByIdAndUpdate(req.productId,
      {
        description,
        image,
        name,
        price,
        quantity,
      },
      { new: true, runValidators: true, upsert: true })
      .orFail(new Error("NotValidIdProduct"))
      .then((product) => res.status(200).send(product))
      .catch((err) => {
        if (err.message === "NotValidIdProduct") {
          next(new NotFoundError(ANSWER.NotFoundProduct));
        } else if (err.name === "ValidationError") {
          next(new BadRequestError(ANSWER.BadRequest));
        } else {
          next(err);
        }
      });
  } else {
    next(new ForbiddenError(ANSWER.ForbiddenUpdateProduct));
  }
};
module.exports.deleteProduct = (req, res, next) => {
  Product.findById(req.params.productId)
    .orFail(new Error("NotValidIdProduct"))
    .then((product) => {
      if (req.user.isAdmin) {
        product.remove();
        return res.status(200).send({ message: ANSWER.ProductSuccessDelete });
      }
      return Promise.reject(new Error("YouNotDeleteProduct"));
    })
    .catch((err) => {
      if (err.message === "NotValidIdProduct") {
        next(new NotFoundError(ANSWER.NotFoundProduct));
      } else if (err.message === "YouNotDeleteProduct") {
        next(new ForbiddenError(ANSWER.ForbiddenDeleteProduct));
      } else if (err.name === "CastError") {
        next(new BadRequestError(ANSWER.BadRequest));
      } else {
        next(err);
      }
    });
};
