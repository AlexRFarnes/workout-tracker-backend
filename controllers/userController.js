const User = require('../models/User');

// login
const login = async (req, res) => {
  res.json({ msg: 'Login' });
};

// signup
const signup = async (req, res) => {
  const { email, username, password } = req.body;

  try {
    const user = await User.signupUser({ email, username, password });

    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = { login, signup };