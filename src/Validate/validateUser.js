const Joi = require("joi");

const shemaUser = Joi.object({
  login: Joi.string().alphanum().min(4).max(30).required(),
  password: Joi.string().required(),
  email: Joi.string().email(),
});

module.exports = shemaUser;
