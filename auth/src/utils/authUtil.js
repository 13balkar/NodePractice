const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const encryptPassword = async (password) => {
  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(password, saltRounds);
  return hashedPassword;
};

const comparePassword = async (password, hashedPassword) => {
  return await bcrypt.compare(password, hashedPassword);
};

const generateToken = async (userName) => {
  const key = process.env.JWT_SECRET_KEY;
  const data = {
    userName: userName,
    time: Date()
  };
  return await jwt.sign(data, key);
};

const validateToken = async (token) => {
  const key = process.env.JWT_SECRET_KEY;
  return await jwt.verify(token, key);
};
module.exports = { encryptPassword, comparePassword, generateToken, validateToken };