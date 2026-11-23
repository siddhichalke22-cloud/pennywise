const User = require('../models/User');
const generateToken = require('../utils/generateToken');

/**
 * Service to handle user authentication and registrations
 */
const registerUser = async ({ name, email, password }) => {
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new Error('User already exists with this email');
  }

  const user = await User.create({ name, email, password });
  const token = generateToken(user._id);

  return {
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      defaultCurrency: user.defaultCurrency,
    },
    token,
  };
};

const loginUser = async ({ email, password }) => {
  const user = await User.findOne({ email }).select('+password');
  if (!user || !(await user.comparePassword(password))) {
    throw new Error('Invalid email or password');
  }

  const token = generateToken(user._id);

  return {
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      defaultCurrency: user.defaultCurrency,
    },
    token,
  };
};

module.exports = {
  registerUser,
  loginUser,
};
