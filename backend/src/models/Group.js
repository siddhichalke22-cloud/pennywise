const mongoose = require('mongoose');
const { GROUP_CATEGORIES } = require('../utils/constants');

const groupMemberSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    role: {
      type: String,
      enum: ['admin', 'member'],
      default: 'member',
    },
    joinedAt: {
      type: Date,
      default: Date.now,
    },
  },
  { _id: false }
);

const groupSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please provide a group name'],
      trim: true,
      maxlength: 60,
    },
    description: {
      type: String,
      trim: true,
      default: '',
    },
    category: {
      type: String,
      enum: Object.values(GROUP_CATEGORIES),
      default: GROUP_CATEGORIES.OTHER,
    },
    currency: {
      type: String,
      default: 'USD',
      uppercase: true,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    members: [groupMemberSchema],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Group', groupSchema);
