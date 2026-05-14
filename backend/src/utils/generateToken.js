const jwt = require('jsonwebtoken');

// Generates a secure JSON Web Token for the user
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || '30d',
  });
};

module.exports = generateToken;
