const { user } = require('../../database/models');
const httpError = require('../../errors/httpErrors');
const { encryptPassword, comparePassword, generateToken, validateToken } = require('../utils/authUtil');

const create = async (userName, password) => {
  const userExists = await user.findOne({ where: { userName: userName } });
  if (userExists) {
    throw new httpError(409, 'User already exists');
  }
  else {
    password = await encryptPassword(password);
    await user.create({ userName, password });
    return ({ message: 'User created successfully' });
  }
};

const login = async (userName, password) => {
  const userExists = await user.findOne({ where: { userName: userName } });
  if (!userExists) {
    throw new httpError(404, 'User not found');
  }
  else {
    const hashedPassword = await encryptPassword(password);
    if (comparePassword(password, hashedPassword)) {
      return generateToken(userName);
    }
    else
      throw new httpError(401, 'Invalid Password');

  }
};

const validateHandler = async (token) => {
  const validatedToken = await validateToken(token);
  const userExists = await user.findOne({ where: { userName: validatedToken.userName } });
  if (!userExists) {
    throw new httpError(404, 'User not found');
  } else {
    return userExists;
  }
};
module.exports = { create, login, validateHandler };