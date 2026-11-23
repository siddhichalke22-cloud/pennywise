const mongoose = require('mongoose');
const { SPLIT_TYPES, EXPENSE_CATEGORIES } = require('../utils/constants');

const expenseSplitSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    amount: {
      type: Number,
      required: true,
      min: 0,
    },
    percentage: {
      type: Number,
      min: 0,
      max: 100,
    },
  },
  { _id: false }
);

const expenseSchema = new mongoose.Schema(
  {
    description: {
      type: String,
      required: [true, 'Expense description is required'],
      trim: true,
      maxlength: 100,
    },
    amount: {
      type: Number,
      required: [true, 'Expense amount is required'],
      min: 0.01,
    },
    currency: {
      type: String,
      default: 'USD',
      uppercase: true,
    },
    group: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Group',
      required: true,
    },
    paidBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    category: {
      type: String,
      enum: Object.values(EXPENSE_CATEGORIES),
      default: EXPENSE_CATEGORIES.OTHER,
    },
    splitType: {
      type: String,
      enum: Object.values(SPLIT_TYPES),
      default: SPLIT_TYPES.EQUAL,
    },
    splits: [expenseSplitSchema],
    date: {
      type: Date,
      default: Date.now,
    },
    notes: {
      type: String,
      default: '',
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Expense', expenseSchema);
