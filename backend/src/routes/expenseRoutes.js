const express = require('express');
const { body } = require('express-validator');
const {
  createExpense,
  getGroupExpenses,
  getExpenseById,
  deleteExpense,
} = require('../controllers/expenseController');
const { protect } = require('../middleware/authMiddleware');
const validate = require('../middleware/validate');

const router = express.Router();

router.use(protect);

router.route('/')
  .post(
    [
      body('description').trim().notEmpty().withMessage('Description is required'),
      body('amount').isFloat({ gt: 0 }).withMessage('Amount must be greater than 0'),
      body('groupId').notEmpty().withMessage('Group ID is required'),
    ],
    validate,
    createExpense
  );

router.route('/group/:groupId')
  .get(getGroupExpenses);

router.route('/:id')
  .get(getExpenseById)
  .delete(deleteExpense);

module.exports = router;
