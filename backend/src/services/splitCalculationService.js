const { SPLIT_TYPES } = require('../utils/constants');

/**
 * Calculates member expense shares based on split strategy
 * @param {number} totalAmount
 * @param {Array<string>} memberIds
 * @param {string} splitType
 * @param {Array<Object>} customSplits
 * @returns {Array<Object>} calculated splits
 */
const calculateSplits = (totalAmount, memberIds, splitType, customSplits = []) => {
  if (splitType === SPLIT_TYPES.EQUAL) {
    const count = memberIds.length;
    if (count === 0) return [];
    
    const perPerson = Math.floor((totalAmount / count) * 100) / 100;
    const remainder = Math.round((totalAmount - perPerson * count) * 100) / 100;

    return memberIds.map((userId, index) => ({
      user: userId,
      // Allocate leftover cents to the first member
      amount: index === 0 ? perPerson + remainder : perPerson,
    }));
  }

  if (splitType === SPLIT_TYPES.EXACT) {
    return customSplits.map((item) => ({
      user: item.user,
      amount: Number(item.amount),
    }));
  }

  if (splitType === SPLIT_TYPES.PERCENTAGE) {
    return customSplits.map((item) => ({
      user: item.user,
      percentage: Number(item.percentage),
      amount: Math.round(((totalAmount * item.percentage) / 100) * 100) / 100,
    }));
  }

  return [];
};

/**
 * Calculates net balances for each member within a group
 * @param {Array<Object>} expenses
 * @param {Array<Object>} settlements
 * @returns {Object} net balances by user ID
 */
const calculateGroupBalances = (expenses, settlements = []) => {
  const balances = {};

  // Process expenses
  expenses.forEach((expense) => {
    const paidBy = expense.paidBy.toString();
    balances[paidBy] = (balances[paidBy] || 0) + expense.amount;

    expense.splits.forEach((split) => {
      const splitUser = split.user.toString();
      balances[splitUser] = (balances[splitUser] || 0) - split.amount;
    });
  });

  // Process settlements
  settlements.forEach((settlement) => {
    const payer = settlement.payer.toString();
    const payee = settlement.payee.toString();

    balances[payer] = (balances[payer] || 0) + settlement.amount;
    balances[payee] = (balances[payee] || 0) - settlement.amount;
  });

  return balances;
};

module.exports = {
  calculateSplits,
  calculateGroupBalances,
};
