const createError = require("http-errors");
const Joi = require("joi");

module.exports = validateCampground = (req, res, next) => {
  const campgroundSchemaValidator = Joi.object({
    title: Joi.string().required(),
    price: Joi.number().required().min(0),
    images: Joi.array(),
    location: Joi.string().required(),
    description: Joi.string().required(),
  });
  const { error } = campgroundSchemaValidator.validate(req.body);
  if (error) {
    next(createError(400, error.details.map((el) => el.message).join(",")));
  } else {
    next();
  }
};
