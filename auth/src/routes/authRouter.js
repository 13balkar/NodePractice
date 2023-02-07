const express = require('express');
const router = express.Router();
const { userValidator } = require('../middleware/auth.validator');
const { createUser, loginUser, validateHandler } = require('../controller/authController');

router.post('/user/create', userValidator, createUser);
router.post('/user/login', userValidator, loginUser);
router.post('/token/validate', validateHandler);
router.get('/', (req, res) => {
  res.status(200).json({
    addUser: {
      url: 'http://localhost:4000/user/create',
      method: 'POST',
      body: {
        userName: 'string',
        password: 'string'
      }
    },
    loginUser: {
      url: 'http://localhost:4000/user/login',
      method: 'POST',
      body: {
        userName: 'string',
        password: 'string'
      }
    },
    validateToken: {
      url: 'http://localhost:4000/token/validate',
      method: 'POST',
      body: {
        token: 'string'
      }
    }
  });
});
module.exports = router;