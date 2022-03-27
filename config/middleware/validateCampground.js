const createError = require("http-errors");
const Joi = require("joi");

module.exports = validateCampground = (req, res, next) => {
  const campgroundSchemaValidator = Joi.object({
    title: Joi.string(),
    price: Joi.number().min(0),
    images: Joi.array(),
    location: Joi.string(),
    description: Joi.string(),
    deleteImages: Joi.array(),
  });
  const { error } = campgroundSchemaValidator.validate(req.body);
  if (error) {
    next(createError(400, error.details.map((el) => el.message).join(",")));
  } else {
    next();
  }
};
