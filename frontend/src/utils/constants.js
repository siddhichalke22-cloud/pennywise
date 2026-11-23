export const SPLIT_TYPES = {
  EQUAL: 'EQUAL',
  EXACT: 'EXACT',
  PERCENTAGE: 'PERCENTAGE',
};

export const GROUP_CATEGORIES = {
  TRIP: 'trip',
  HOME: 'home',
  COUPLE: 'couple',
  OTHER: 'other',
};

export const EXPENSE_CATEGORIES = [
  { id: 'food', label: 'Food & Dining', icon: '🍔' },
  { id: 'transport', label: 'Transportation', icon: '🚗' },
  { id: 'entertainment', label: 'Entertainment', icon: '🎬' },
  { id: 'utilities', label: 'Utilities', icon: '⚡' },
  { id: 'groceries', label: 'Groceries', icon: '🛒' },
  { id: 'rent', label: 'Rent', icon: '🏠' },
  { id: 'other', label: 'Other', icon: '🧾' },
];

export const STORAGE_KEYS = {
  AUTH_TOKEN: '@pennywise_auth_token',
  USER_DATA: '@pennywise_user_data',
};
