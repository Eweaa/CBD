const express = require('express');

const { loginUser, registerUser } = require('../controllers/User.Controller');

const router = express.Router();

// login route
router.post('/login', loginUser);

// signup route
router.post('/register', registerUser);

module.exports = router;