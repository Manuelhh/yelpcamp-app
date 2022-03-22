const createError = require("http-errors");
const Joi = require("joi");

module.exports = validateReview = (req, res, next) => {
  const reviewSchemaValidator = Joi.object({
    body: Joi.string().required(),
    rating: Joi.number().required().min(0).max(5),
  });
  const { error } = reviewSchemaValidator.validate(req.body);
  if (error) {
    next(createError(500, error));
  } else {
    next();
  }
};
