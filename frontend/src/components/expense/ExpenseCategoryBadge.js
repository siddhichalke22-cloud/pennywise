import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors } from '../../theme/colors';
import { spacing } from '../../theme/spacing';

const CATEGORY_ICONS = {
  food: '🍔',
  transport: '🚗',
  entertainment: '🎬',
  utilities: '⚡',
  groceries: '🛒',
  rent: '🏠',
  other: '🧾',
};

export const ExpenseCategoryBadge = ({ category = 'other' }) => {
  const icon = CATEGORY_ICONS[category.toLowerCase()] || CATEGORY_ICONS.other;

  return (
    <View style={styles.badge}>
      <Text style={styles.icon}>{icon}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  badge: {
    width: 42,
    height: 42,
    borderRadius: spacing.borderRadius.md,
    backgroundColor: colors.inputBackground,
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    fontSize: 20,
  },
});

export default ExpenseCategoryBadge;
