const { validationResult } = require('express-validator');
const { sendResponse } = require('../utils/apiResponse');

/**
 * Middleware to validate request payloads based on express-validator rules
 */
const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return sendResponse(res, 400, false, 'Validation failed', null, errors.array());
  }
  next();
};

module.exports = validate;
