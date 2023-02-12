const jwt = require('jsonwebtoken');
const User = require('../models/User');

const authenticate = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({ error: 'Authorization token required' });
  }

  const token = authorization.split(' ')[1];

  jwt.verify(token, process.env.JWT_SECRET, async (error, decode) => {
    if (error) {
      return res.status(401).json({ error: 'Unauthorized access' });
    }

    req.user = await User.findById(decode._id).select('_id');

    next();
  });
};

module.exports = authenticate;
