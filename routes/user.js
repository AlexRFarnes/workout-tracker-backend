const express = require('express');
const { login, signup } = require('../controllers/userController');

const router = express.Router();

// signup
router.post('/signup', signup);

// login
router.post('/login', login);

module.exports = router;
