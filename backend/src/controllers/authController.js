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
    return sendResponse(res, 400, false, error.message);
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
    return sendResponse(res, 401, false, error.message);
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
