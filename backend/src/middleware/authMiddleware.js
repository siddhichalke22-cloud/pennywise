const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { sendResponse } = require('../utils/apiResponse');

/**
 * Middleware to protect routes and verify JWT bearer tokens
 */
const protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(
        token,
        process.env.JWT_SECRET || 'pennywise_jwt_dev_secret_key_12345'
      );

      req.user = await User.findById(decoded.id).select('-password');
      if (!req.user) {
        return sendResponse(res, 401, false, 'User not found for this token');
      }

      return next();
    } catch (error) {
      console.error('[AuthMiddleware] Verification error:', error.message);
      return sendResponse(res, 401, false, 'Not authorized, token invalid or expired');
    }
  }

  if (!token) {
    return sendResponse(res, 401, false, 'Not authorized, no token provided');
  }
};

module.exports = {
  protect,
};
