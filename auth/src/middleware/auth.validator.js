const joi = require('joi');

const userSchema = joi.object({
  userName: joi.string().required().max(30),
  password: joi.string().required().max(30).min(8)
});
const tokenSchema = joi.object({
  token: joi.string().required()
});
const userValidator = (req, res, next) => {

  const { error } = userSchema.validate(req.body);
  if (error) {
    return res.status(400).json(error.details[0].message);
  }
  else {
    next();
  }
};

const tokenValidator = (req, res, next) => {
  const token = req.body.token;
  const { error } = tokenSchema.validate({ token });
  if (error) {
    console.log(error);
    return res.status(400).json(error.details[0].message);
  }
  else {
    next();
  }
};

module.exports = { userValidator, tokenValidator };