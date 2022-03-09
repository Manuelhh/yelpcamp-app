const createError = require("http-errors");
const Joi = require("joi");

module.exports = validateReview = (req, res, next) => {
  const reviewSchemaValidator = Joi.object({
    body: Joi.string().required(),
    rating: Joi.number().required().min(1),
  });
  const { error } = reviewSchemaValidator.validate(req.body);
  if (error) {
    next(createError(400, error));
  } else {
    next();
  }
};
