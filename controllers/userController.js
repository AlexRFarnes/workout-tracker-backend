const jwt = require('jsonwebtoken');
const User = require('../models/User');

const generateToken = _id => {
  return jwt.sign({ _id }, process.env.JWT_SECRET, {
    expiresIn: '3d',
  });
};

// signup
const signup = async (req, res) => {
  const { email, username, password } = req.body;
  console.log(email, username, password);

  try {
    const user = await User.signupUser(email, username, password);

    const token = generateToken(user._id);

    res.status(200).json({ email, username, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// login
const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.loginUser(email, password);

    const token = generateToken(user._id);

    res.status(200).json({ email: user.email, username: user.username, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = { login, signup };
