const router = require("express").Router();
const NotFoundError = require("../errors/not-found-err");
const ANSWER = require("../utils/answers");

router.use("/*", (req, res, next) => {
  next(new NotFoundError(ANSWER.NotFoundPage));
});
module.exports = router;
