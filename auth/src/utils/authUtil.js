const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const redis = require('./redisUtil');
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
  return jwt.sign(data, key);
};

const validateToken = async (token) => {
  const key = process.env.JWT_SECRET_KEY;
  const verification = jwt.verify(token, key, (err, decoded) => {
    return err ? false : decoded;
  });
  if (!verification) return false;
  const redisCheck = await redis.get(verification.userName);
  if (redisCheck !== token) {
    return false;
  } else {
    return verification;
  }
};

const storeToken = async (token, userName) => {
  const redisClient = redis;
  await redisClient.set(userName, token, 'EX', 3600);
};

module.exports = { encryptPassword, comparePassword, generateToken, validateToken, storeToken };