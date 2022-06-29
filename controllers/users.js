const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const BadRequestError = require("../errors/bad-request-err");
const NotFoundError = require("../errors/not-found-err");
const ConflictError = require("../errors/conflict-err");
const UnauthorizedError = require("../errors/unauthorized-err");
const ANSWER = require("../utils/answers");
const CONFIG_DEV = require("../utils/configDev");

module.exports.getInfoAboutMe = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => {
      res.status(200).send(user);
    })
    .catch((err) => {
      if (err.name === "CastError") {
        next(new BadRequestError(ANSWER.BadRequestUser));
      } else {
        next(err);
      }
    });
};
module.exports.updateUser = (req, res, next) => {
  const { name, email } = req.body;
  User.findByIdAndUpdate(req.user._id, { name, email },
    { new: true, runValidators: true, upsert: true })
    .orFail(new Error("NotValidIdUser"))
    .then((user) => {
      res.status(200).send(user);
    })
    .catch((err) => {
      if (err.message === "NotValidIdUser") {
        next(new NotFoundError(ANSWER.UserNotFound));
      } else if (err.name === "ValidationError") {
        next(new BadRequestError(ANSWER.BadRequest));
      } else {
        next(err);
      }
    });
};
module.exports.createUser = (req, res, next) => {
  const {
    name, email, password,
  } = req.body;
  User.findOne({ email })
    .then((customer) => {
      if (customer) {
        throw new ConflictError(ANSWER.UserEmailExist);
      }
      return bcrypt.hash(password, 10)
        .then((hash) => User.create({
          name, email, password: hash,
        }))
        .then((user) => {
          res.status(200).send({
            name: user.name,
            _id: user._id,
            email: user.email,
          });
        })
        .catch((err) => {
          if (err.name === "ValidationError") {
            next(new BadRequestError(ANSWER.BadRequest));
          } else {
            next(err);
          }
        });
    }).catch(next);
};
module.exports.login = (req, res, next) => {
  const { email, password } = req.body;
  const { JWT_SECRET, NODE_ENV } = process.env;
  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        NODE_ENV === "production" ? JWT_SECRET : CONFIG_DEV.JWT_SECRET_DEV,
        { expiresIn: "7d" },
      );
      res.status(200).send({ token });
    })
    .catch((err) => {
      if (err.message === "IncorrectEmailOrPassword") {
        next(new UnauthorizedError(ANSWER.WrongEmailOrPassword));
      } else {
        next(err);
      }
    });
};
