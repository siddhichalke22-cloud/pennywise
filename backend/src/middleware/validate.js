const { validationResult } = require('express-validator');
const { sendResponse } = require('../utils/apiResponse');

/**
 * Middleware to validate request payloads based on express-validator rules
 * Returns HTTP 400 with first error message and complete errors array
 */
const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const errorArray = errors.array();
    const primaryMessage = errorArray[0]?.msg || 'Validation failed';
    return sendResponse(res, 400, false, primaryMessage, null, errorArray);
  }
  next();
};

module.exports = validate;
