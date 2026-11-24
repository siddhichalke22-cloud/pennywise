const authService = require('../services/authService');
const { sendResponse } = require('../utils/apiResponse');

/**
 * Register a new user
 * POST /api/auth/register
 */
const register = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    const result = await authService.registerUser({ name, email, password });
    return sendResponse(res, 201, true, 'User registered successfully', result);
  } catch (error) {
    const statusCode = error.statusCode || 400;
    return sendResponse(res, statusCode, false, error.message);
  }
};

/**
 * Login user
 * POST /api/auth/login
 */
const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const result = await authService.loginUser({ email, password });
    return sendResponse(res, 200, true, 'Login successful', result);
  } catch (error) {
    const statusCode = error.statusCode || 401;
    return sendResponse(res, statusCode, false, error.message);
  }
};

/**
 * Get current user profile
 * GET /api/auth/me
 */
const getMe = async (req, res) => {
  return sendResponse(res, 200, true, 'User profile retrieved', req.user);
};

module.exports = {
  register,
  login,
  getMe,
};
