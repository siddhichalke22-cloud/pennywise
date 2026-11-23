const Expense = require('../models/Expense');
const Group = require('../models/Group');
const { calculateSplits } = require('../services/splitCalculationService');
const { sendResponse } = require('../utils/apiResponse');

/**
 * Add a new expense
 * POST /api/expenses
 */
const createExpense = async (req, res, next) => {
  try {
    const { description, amount, currency, groupId, category, splitType, customSplits, paidBy } = req.body;

    const group = await Group.findById(groupId);
    if (!group) {
      return sendResponse(res, 404, false, 'Group not found');
    }

    const memberIds = group.members.map((m) => m.user.toString());
    const splits = calculateSplits(amount, memberIds, splitType, customSplits);

    const expense = await Expense.create({
      description,
      amount,
      currency: currency || group.currency,
      group: groupId,
      paidBy: paidBy || req.user._id,
      category,
      splitType,
      splits,
    });

    return sendResponse(res, 201, true, 'Expense created successfully', expense);
  } catch (error) {
    next(error);
  }
};

/**
 * Get expenses for a specific group
 * GET /api/expenses/group/:groupId
 */
const getGroupExpenses = async (req, res, next) => {
  try {
    const expenses = await Expense.find({ group: req.params.groupId })
      .populate('paidBy', 'name email avatar')
      .populate('splits.user', 'name email')
      .sort({ date: -1 });

    return sendResponse(res, 200, true, 'Group expenses retrieved', expenses);
  } catch (error) {
    next(error);
  }
};

/**
 * Get single expense details
 * GET /api/expenses/:id
 */
const getExpenseById = async (req, res, next) => {
  try {
    const expense = await Expense.findById(req.params.id)
      .populate('paidBy', 'name email avatar')
      .populate('splits.user', 'name email');

    if (!expense) {
      return sendResponse(res, 404, false, 'Expense not found');
    }

    return sendResponse(res, 200, true, 'Expense details retrieved', expense);
  } catch (error) {
    next(error);
  }
};

/**
 * Delete an expense
 * DELETE /api/expenses/:id
 */
const deleteExpense = async (req, res, next) => {
  try {
    const expense = await Expense.findById(req.params.id);
    if (!expense) {
      return sendResponse(res, 404, false, 'Expense not found');
    }

    await expense.deleteOne();
    return sendResponse(res, 200, true, 'Expense deleted successfully');
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createExpense,
  getGroupExpenses,
  getExpenseById,
  deleteExpense,
};
