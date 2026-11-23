/**
 * Mock Fintech Data for Pennywise
 * Pre-configured with realistic expense scenarios for instant evaluation
 */

export const currentUser = {
  id: 'user_1',
  name: 'Alex Rivera',
  firstName: 'Alex',
  email: 'alex.rivera@pennywise.app',
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&h=200&fit=crop&crop=faces',
  currency: 'USD',
  currencySymbol: '$',
  defaultPaymentMethod: 'Apple Pay •••• 4291',
};

export const dummyBalance = {
  netBalance: 345.50,
  totalOwed: 520.00, // Others owe you
  totalOwe: 174.50,  // You owe others
  currency: 'USD',
  currencySymbol: '$',
  monthSummary: {
    totalSpent: 1248.80,
    savedWithSplits: 890.30,
    settledCount: 14,
  },
};

export const dummyCategories = [
  { id: 'food', name: 'Food & Dining', icon: '🍔', color: '#EDE9FE', textColor: '#5B21B6' },
  { id: 'groceries', name: 'Groceries', icon: '🛒', color: '#EDE9FE', textColor: '#5B21B6' },
  { id: 'home', name: 'Rent & Living', icon: '🏠', color: '#EDE9FE', textColor: '#5B21B6' },
  { id: 'transport', name: 'Transport', icon: '🚗', color: '#EDE9FE', textColor: '#5B21B6' },
  { id: 'entertainment', name: 'Fun & Events', icon: '🎬', color: '#EDE9FE', textColor: '#5B21B6' },
  { id: 'utilities', name: 'Bills & Utilities', icon: '⚡', color: '#EDE9FE', textColor: '#5B21B6' },
  { id: 'travel', name: 'Travel & Trips', icon: '✈️', color: '#EDE9FE', textColor: '#5B21B6' },
];

export const dummyGroups = [
  {
    id: 'grp_1',
    name: 'Apartment 402',
    category: 'Home & Living',
    emoji: '🏠',
    membersCount: 4,
    userNetStatus: 'owed', // 'owed' | 'owe' | 'settled'
    userNetBalance: 112.50,
    recentActivity: 'Trader Joe’s groceries added by You',
    updatedAt: '2h ago',
    members: [
      { id: 'user_1', name: 'Alex (You)', isCurrent: true, avatar: currentUser.avatar },
      { id: 'user_2', name: 'Sarah Jenkins', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150' },
      { id: 'user_3', name: 'Marcus Chen', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150' },
      { id: 'user_4', name: 'Maya Patel', avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150' },
    ],
  },
  {
    id: 'grp_2',
    name: 'Goa Weekend 🌴',
    category: 'Travel',
    emoji: '🏖️',
    membersCount: 6,
    userNetStatus: 'owed',
    userNetBalance: 240.00,
    recentActivity: 'Airbnb villa deposit by Marcus',
    updatedAt: 'Yesterday',
    members: [
      { id: 'user_1', name: 'Alex (You)', isCurrent: true },
      { id: 'user_3', name: 'Marcus Chen' },
      { id: 'user_5', name: 'Liam Wilson' },
      { id: 'user_6', name: 'Elena Rostova' },
    ],
  },
  {
    id: 'grp_3',
    name: 'Friday Foodies Club',
    category: 'Dining Out',
    emoji: '🍕',
    membersCount: 5,
    userNetStatus: 'owe',
    userNetBalance: 62.00,
    recentActivity: 'Sushi Omakase settled',
    updatedAt: '3 days ago',
    members: [
      { id: 'user_1', name: 'Alex (You)', isCurrent: true },
      { id: 'user_2', name: 'Sarah Jenkins' },
      { id: 'user_4', name: 'Maya Patel' },
    ],
  },
  {
    id: 'grp_4',
    name: 'Tokyo Trip 2027',
    category: 'Planning',
    emoji: '🗾',
    membersCount: 3,
    userNetStatus: 'settled',
    userNetBalance: 0.00,
    recentActivity: 'Group created by Sarah',
    updatedAt: '1 week ago',
    members: [
      { id: 'user_1', name: 'Alex (You)', isCurrent: true },
      { id: 'user_2', name: 'Sarah Jenkins' },
      { id: 'user_3', name: 'Marcus Chen' },
    ],
  },
];

export const dummyExpenses = [
  {
    id: 'exp_1',
    title: 'Trader Joe’s Weekly Groceries',
    category: 'groceries',
    categoryIcon: '🛒',
    amount: 84.20,
    currency: 'USD',
    currencySymbol: '$',
    date: 'Today, 2:15 PM',
    groupName: 'Apartment 402',
    groupId: 'grp_1',
    paidBy: {
      id: 'user_1',
      name: 'You',
      isCurrentUser: true,
    },
    splitType: 'EQUAL',
    userImpact: {
      type: 'lent', // 'lent' | 'owe' | 'none'
      amount: 63.15,
      label: 'you lent',
    },
    participantsCount: 4,
  },
  {
    id: 'exp_2',
    title: 'Airbnb Beachfront Villa',
    category: 'travel',
    categoryIcon: '🏖️',
    amount: 450.00,
    currency: 'USD',
    currencySymbol: '$',
    date: 'Yesterday, 8:40 PM',
    groupName: 'Goa Weekend 🌴',
    groupId: 'grp_2',
    paidBy: {
      id: 'user_3',
      name: 'Marcus Chen',
      isCurrentUser: false,
    },
    splitType: 'EQUAL',
    userImpact: {
      type: 'owe',
      amount: 75.00,
      label: 'you owe',
    },
    participantsCount: 6,
  },
  {
    id: 'exp_3',
    title: 'Sushi Omakase Dinner',
    category: 'food',
    categoryIcon: '🍣',
    amount: 192.00,
    currency: 'USD',
    currencySymbol: '$',
    date: 'Nov 21, 9:30 PM',
    groupName: 'Friday Foodies Club',
    groupId: 'grp_3',
    paidBy: {
      id: 'user_1',
      name: 'You',
      isCurrentUser: true,
    },
    splitType: 'EQUAL',
    userImpact: {
      type: 'lent',
      amount: 144.00,
      label: 'you lent',
    },
    participantsCount: 4,
  },
  {
    id: 'exp_4',
    title: 'High-Speed Fiber Wi-Fi Bill',
    category: 'utilities',
    categoryIcon: '⚡',
    amount: 65.00,
    currency: 'USD',
    currencySymbol: '$',
    date: 'Nov 19, 11:00 AM',
    groupName: 'Apartment 402',
    groupId: 'grp_1',
    paidBy: {
      id: 'user_2',
      name: 'Sarah Jenkins',
      isCurrentUser: false,
    },
    splitType: 'EQUAL',
    userImpact: {
      type: 'owe',
      amount: 16.25,
      label: 'you owe',
    },
    participantsCount: 4,
  },
  {
    id: 'exp_5',
    title: 'Airport Taxi Transfer',
    category: 'transport',
    categoryIcon: '🚗',
    amount: 48.50,
    currency: 'USD',
    currencySymbol: '$',
    date: 'Nov 18, 4:10 PM',
    groupName: 'Goa Weekend 🌴',
    groupId: 'grp_2',
    paidBy: {
      id: 'user_1',
      name: 'You',
      isCurrentUser: true,
    },
    splitType: 'EQUAL',
    userImpact: {
      type: 'lent',
      amount: 36.38,
      label: 'you lent',
    },
    participantsCount: 4,
  },
  {
    id: 'exp_6',
    title: 'Board Game Cafe Pass',
    category: 'entertainment',
    categoryIcon: '🎲',
    amount: 32.00,
    currency: 'USD',
    currencySymbol: '$',
    date: 'Nov 15, 7:00 PM',
    groupName: 'Friday Foodies Club',
    groupId: 'grp_3',
    paidBy: {
      id: 'user_4',
      name: 'Maya Patel',
      isCurrentUser: false,
    },
    splitType: 'EQUAL',
    userImpact: {
      type: 'owe',
      amount: 8.00,
      label: 'you owe',
    },
    participantsCount: 4,
  },
];

export const dummyRecentActivities = [
  {
    id: 'act_1',
    title: 'Sarah Jenkins settled up $45.00',
    subtitle: 'Via Apple Cash in "Apartment 402"',
    time: '10 mins ago',
    type: 'settlement',
    icon: '✅',
  },
  {
    id: 'act_2',
    title: 'You added "Trader Joe’s Groceries"',
    subtitle: 'Total $84.20 split equally 4 ways',
    time: '2 hours ago',
    type: 'expense_created',
    icon: '🛒',
  },
  {
    id: 'act_3',
    title: 'Marcus Chen added "Airbnb Villa"',
    subtitle: 'You owe $75.00 in "Goa Weekend 🌴"',
    time: 'Yesterday',
    type: 'expense_added',
    icon: '🏖️',
  },
];

export default {
  currentUser,
  dummyBalance,
  dummyCategories,
  dummyGroups,
  dummyExpenses,
  dummyRecentActivities,
};
