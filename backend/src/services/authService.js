const User = require('../models/User');
const generateToken = require('../utils/generateToken');

/**
 * Service to handle user registration and credential validation
 * @param {Object} userData - { name, email, password }
 * @returns {Object} { user, token }
 */
const registerUser = async ({ name, email, password }) => {
  const normalizedEmail = email.toLowerCase().trim();

  // 1. Check whether the email already exists in the database
  const existingUser = await User.findOne({ email: normalizedEmail });
  if (existingUser) {
    const error = new Error('An account with this email address already exists');
    error.statusCode = 409;
    throw error;
  }

  // 2. Create the user document (Mongoose pre-save hook handles bcrypt hashing)
  const user = await User.create({
    name: name.trim(),
    email: normalizedEmail,
    password,
  });

  // 3. Generate signed JWT token
  const token = generateToken(user._id);

  return {
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      defaultCurrency: user.defaultCurrency,
      avatar: user.avatar,
      createdAt: user.createdAt,
    },
    token,
  };
};

/**
 * Service to authenticate existing user
 * @param {Object} credentials - { email, password }
 * @returns {Object} { user, token }
 */
const loginUser = async ({ email, password }) => {
  const normalizedEmail = email.toLowerCase().trim();

  // Explicitly select password field since select: false on schema
  const user = await User.findOne({ email: normalizedEmail }).select('+password');
  if (!user || !(await user.comparePassword(password))) {
    const error = new Error('Invalid email address or password');
    error.statusCode = 401;
    throw error;
  }

  const token = generateToken(user._id);

  return {
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      defaultCurrency: user.defaultCurrency,
      avatar: user.avatar,
      createdAt: user.createdAt,
    },
    token,
  };
};

module.exports = {
  registerUser,
  loginUser,
};
