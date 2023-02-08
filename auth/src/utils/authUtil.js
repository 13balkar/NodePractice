const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const encryptPassword = async (password) => {
  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(password, saltRounds);
  return hashedPassword;
};

const comparePassword = async (password, hashedPassword) => {
  const comparison = await bcrypt.compare(password, hashedPassword);
  return comparison;
};

const generateToken = async (userName) => {
  const key = process.env.JWT_SECRET_KEY;
  const data = {
    userName: userName,
    time: Date()
  };
  return await jwt.sign(data, key);
};

const validateToken = (token) => {
  const key = process.env.JWT_SECRET_KEY;
  const verification = jwt.verify(token, key, (err, decoded) => {
    return err ? false : decoded;
  });
  return verification;
};
module.exports = { encryptPassword, comparePassword, generateToken, validateToken };