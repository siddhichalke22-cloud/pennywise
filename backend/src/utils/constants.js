const SPLIT_TYPES = {
  EQUAL: 'EQUAL',
  EXACT: 'EXACT',
  PERCENTAGE: 'PERCENTAGE',
};

const GROUP_CATEGORIES = {
  TRIP: 'trip',
  HOME: 'home',
  COUPLE: 'couple',
  OTHER: 'other',
};

const EXPENSE_CATEGORIES = {
  FOOD: 'food',
  TRANSPORT: 'transport',
  ENTERTAINMENT: 'entertainment',
  UTILITIES: 'utilities',
  GROCERIES: 'groceries',
  RENT: 'rent',
  OTHER: 'other',
};

const SETTLEMENT_STATUS = {
  PENDING: 'pending',
  COMPLETED: 'completed',
  CANCELLED: 'cancelled',
};

module.exports = {
  SPLIT_TYPES,
  GROUP_CATEGORIES,
  EXPENSE_CATEGORIES,
  SETTLEMENT_STATUS,
};
