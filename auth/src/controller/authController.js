const httpError = require('../../errors/httpErrors');
const services = require('../services/authService');
const createUser = async (req, res) => {
  try {
    const { userName, password } = req.body;
    const user = await services.create(userName, password);
    res.status(201).json(user);
  }
  catch (err) {
    if (err instanceof httpError) {
      res.status(err.code).json(err.message);
    }
    else {
      res.status(500).json('Internal server error');
    }
  }
};

const loginUser = async (req, res) => {
  try {
    const { userName, password } = req.body;
    const user = await services.login(userName, password);
    res.status(200).json(user);
  }
  catch (err) {
    if (err instanceof httpError) {
      res.status(err.code).json(err.message);
    }
    else {
      res.status(500).json('Internal server error');
    }
  }
};

const validateHandler = async (req, res) => {
  try {
    const { token } = req.body;
    const user = await services.validateHandler(token);
    res.status(200).json(user);
  }
  catch (err) {
    if (err instanceof httpError) {
      res.status(err.code).json(err.message);
    }
    else {
      res.status(500).json('Internal server error');
    }
  }
};

module.exports = { createUser, loginUser, validateHandler };