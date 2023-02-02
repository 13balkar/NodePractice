const Joi = require('joi');
const HttpErrors = require('../../Errors/httpErrors');

const getTaskSchema = Joi.alternatives().try(
  Joi.string().valid('complete', 'incomplete'),
  Joi.string().regex(/^[0-9]+$/)
).required();

const postTaskSchema = Joi.object({
  taskName: Joi.string().min(3).max(30).required(),
});

const putTaskSchema = Joi.object({
  id: Joi.number().integer().positive().required(),
  taskName: Joi.string().min(3).max(30).required(),
  isComplete: Joi.boolean().required()
});
const patchTaskSchema = Joi.object({
  id: Joi.number().integer().positive().required(),
  isComplete: Joi.boolean().required()
}).required();

const getTaskValidator = (req, res, next) => {
  try {
    const { error } = getTaskSchema.validate(req.params.code);
    if (error) {
      throw new HttpErrors(error.details[0].message, 400);
    }
    else {
      next();
    }
  } catch (err) {
    if (err instanceof HttpErrors) {
      res.status(err.code).json({ 'message': err.message });
    }
    else
      res.status(500).json({ 'message': 'Internal server error.' });
  }
};

const postTaskValidator = (req, res, next) => {
  try {
    const { error } = postTaskSchema.validate(req.body);
    if (error) {
      throw new HttpErrors(error.details[0].message, 400);
    }
    else {
      next();
    }
  }
  catch (err) {
    if (err instanceof HttpErrors) {
      res.status(err.code).json({ 'message': err.message });
    }
    else
      res.status(500).json({ 'message': 'Internal server error.' });
  }
};

const putTaskValidator = (req, res, next) => {
  try {
    const { error } = putTaskSchema.validate(req.body);
    if (error) {
      throw new HttpErrors(error.details[0].message, 400);
    }
    else {
      next();
    }
  }
  catch (err) {
    if (err instanceof HttpErrors) {
      res.status(err.code).json({ 'message': err.message });
    }
    else
      res.status(500).json({ 'message': 'Internal server error.' });
  }
};
const patchTaskValidator = (req, res, next) => {


  try {
    const { error } = patchTaskSchema.validate(req.params);
    if (error) {
      throw new HttpErrors(error.details[0].message, 400);
    }
    else {
      next();
    }
  }
  catch (err) {
    if (err instanceof HttpErrors) {
      res.status(err.code).json({ 'message': err.message });
    }
    else
      res.status(500).json({ 'message': 'Internal server error.' });
  }
};

module.exports = { getTaskValidator, postTaskValidator, putTaskValidator, patchTaskValidator };