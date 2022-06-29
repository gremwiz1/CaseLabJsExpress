const jwt = require("jsonwebtoken");
const UnauthorizedError = require("../errors/unauthorized-err");
const ANSWER = require("../utils/answers");
const CONFIG_DEV = require("../utils/configDev");

module.exports = (req, res, next) => {
  const { authorization } = req.headers;
  const { JWT_SECRET, NODE_ENV } = process.env;
  if (!authorization || !authorization.startsWith("Bearer ")) {
    next(new UnauthorizedError(ANSWER.DemandAuthorization));
  }

  const token = authorization.replace("Bearer ", "");
  let payload;

  try {
    payload = jwt.verify(token, NODE_ENV === "production" ? JWT_SECRET : CONFIG_DEV.JWT_SECRET_DEV);
  } catch (err) {
    next(new UnauthorizedError(ANSWER.DemandAuthorization));
  }

  req.user = payload; // записываем пейлоуд в объект запроса

  return next(); // пропускаем запрос дальше
};
