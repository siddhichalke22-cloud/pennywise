const User = require('../models/User');
const { sendResponse } = require('../utils/apiResponse');

/**
 * Search users by name or email
 * GET /api/users/search?q=query
 */
const searchUsers = async (req, res, next) => {
  try {
    const { q } = req.query;
    if (!q || q.trim() === '') {
      return sendResponse(res, 200, true, 'No search term provided', []);
    }

    const users = await User.find({
      $and: [
        { _id: { $ne: req.user._id } },
        {
          $or: [
            { name: { $regex: q, $options: 'i' } },
            { email: { $regex: q, $options: 'i' } },
          ],
        },
      ],
    }).select('name email avatar');

    return sendResponse(res, 200, true, 'Users found', users);
  } catch (error) {
    next(error);
  }
};

/**
 * Update user profile
 * PUT /api/users/profile
 */
const updateProfile = async (req, res, next) => {
  try {
    const { name, defaultCurrency, avatar } = req.body;
    const user = await User.findById(req.user._id);

    if (name) user.name = name;
    if (defaultCurrency) user.defaultCurrency = defaultCurrency;
    if (avatar !== undefined) user.avatar = avatar;

    await user.save();
    return sendResponse(res, 200, true, 'Profile updated successfully', user);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  searchUsers,
  updateProfile,
};
