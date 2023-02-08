const { user } = require('../../database/models');
const httpError = require('../../errors/httpErrors');
const { encryptPassword, comparePassword, generateToken, validateToken, storeToken } = require('../utils/authUtil');

const create = async (userName, password) => {
  const userExists = await user.findOne({ where: { userName: userName } });
  if (userExists) {
    throw new httpError('User already exists', 409);
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
    throw new httpError('User not found', 404);
  }
  else {
    if (await comparePassword(password, userExists.password)) {
      const token = await generateToken(userName);
      storeToken(token, userExists.userName);
      return ({ token });
    }
    else
      throw new httpError('Invalid Password', 401);

  }
};

const validateHandler = async (token) => {
  const validatedToken = await validateToken(token);
  if (!validatedToken) {
    throw new httpError('Invalid Token', 401);
  }
  else {
    const userExists = await user.findOne({ where: { userName: validatedToken.userName } });
    if (!userExists) {
      throw new httpError('User not found', 404);
    } else {
      return userExists;
    }
  }
};
module.exports = { create, login, validateHandler };