const createError = require("http-errors");
const Joi = require("joi");

module.exports = validateUser = (req, res, next) => {
  const userSchemaValidator = Joi.object({
    username: Joi.string().required(),
    email: Joi.string().required(),
    password: Joi.string().required(),
  });

  const { error } = userSchemaValidator.validate(req.body);
  if (error) {
    next(createError(400, error));
  } else {
    next();
  }
};
