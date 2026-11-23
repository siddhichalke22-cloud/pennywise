const Group = require('../models/Group');
const { sendResponse } = require('../utils/apiResponse');

/**
 * Create a new group
 * POST /api/groups
 */
const createGroup = async (req, res, next) => {
  try {
    const { name, description, category, currency } = req.body;
    const group = await Group.create({
      name,
      description,
      category,
      currency: currency || 'USD',
      createdBy: req.user._id,
      members: [{ user: req.user._id, role: 'admin' }],
    });

    return sendResponse(res, 201, true, 'Group created successfully', group);
  } catch (error) {
    next(error);
  }
};

/**
 * Get all groups for the authenticated user
 * GET /api/groups
 */
const getUserGroups = async (req, res, next) => {
  try {
    const groups = await Group.find({ 'members.user': req.user._id })
      .populate('members.user', 'name email avatar')
      .sort({ updatedAt: -1 });

    return sendResponse(res, 200, true, 'Groups retrieved successfully', groups);
  } catch (error) {
    next(error);
  }
};

/**
 * Get single group details
 * GET /api/groups/:id
 */
const getGroupById = async (req, res, next) => {
  try {
    const group = await Group.findById(req.params.id)
      .populate('members.user', 'name email avatar')
      .populate('createdBy', 'name email');

    if (!group) {
      return sendResponse(res, 404, false, 'Group not found');
    }

    return sendResponse(res, 200, true, 'Group details retrieved', group);
  } catch (error) {
    next(error);
  }
};

/**
 * Add a member to a group
 * POST /api/groups/:id/members
 */
const addMember = async (req, res, next) => {
  try {
    const { userId } = req.body;
    const group = await Group.findById(req.params.id);

    if (!group) {
      return sendResponse(res, 404, false, 'Group not found');
    }

    const alreadyMember = group.members.some((m) => m.user.toString() === userId);
    if (alreadyMember) {
      return sendResponse(res, 400, false, 'User is already a member of this group');
    }

    group.members.push({ user: userId, role: 'member' });
    await group.save();

    return sendResponse(res, 200, true, 'Member added to group', group);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createGroup,
  getUserGroups,
  getGroupById,
  addMember,
};
