/**
 * Formats a numeric value into a currency display string
 * @param {number} amount
 * @param {string} currency - currency code (default USD)
 * @returns {string} formatted currency string
 */
export const formatCurrency = (amount = 0, currency = 'USD') => {
  const numericAmount = Number(amount) || 0;
  try {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency || 'USD',
    }).format(numericAmount);
  } catch (err) {
    return `${currency} ${numericAmount.toFixed(2)}`;
  }
};
