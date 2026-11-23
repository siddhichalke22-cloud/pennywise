/**
 * Greedy algorithm to simplify group debts (minimizes transactions needed to settle up)
 * @param {Object} balances - map of { userId: netAmount }
 * @returns {Array<Object>} list of transactions { from, to, amount }
 */
export const simplifyDebts = (balances = {}) => {
  const debtors = []; // owes money (negative net)
  const creditors = []; // is owed money (positive net)

  Object.entries(balances).forEach(([userId, amount]) => {
    const rounded = Math.round(amount * 100) / 100;
    if (rounded < -0.01) {
      debtors.push({ userId, amount: -rounded });
    } else if (rounded > 0.01) {
      creditors.push({ userId, amount: rounded });
    }
  });

  debtors.sort((a, b) => b.amount - a.amount);
  creditors.sort((a, b) => b.amount - a.amount);

  const transactions = [];
  let i = 0;
  let j = 0;

  while (i < debtors.length && j < creditors.length) {
    const settleAmount = Math.min(debtors[i].amount, creditors[j].amount);
    transactions.push({
      from: debtors[i].userId,
      to: creditors[j].userId,
      amount: Math.round(settleAmount * 100) / 100,
    });

    debtors[i].amount -= settleAmount;
    creditors[j].amount -= settleAmount;

    if (debtors[i].amount < 0.01) i++;
    if (creditors[j].amount < 0.01) j++;
  }

  return transactions;
};
