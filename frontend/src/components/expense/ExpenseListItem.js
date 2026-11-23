import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { colors } from '../../theme/colors';
import { spacing } from '../../theme/spacing';
import { formatCurrency } from '../../utils/currencyFormatter';
import { formatDate } from '../../utils/dateFormatter';
import ExpenseCategoryBadge from './ExpenseCategoryBadge';

export const ExpenseListItem = ({ expense, currentUserId, onPress }) => {
  const isPaidByMe = expense.paidBy?._id === currentUserId || expense.paidBy === currentUserId;
  const mySplit = expense.splits?.find(
    (s) => s.user?._id === currentUserId || s.user === currentUserId
  );

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      style={styles.container}
      onPress={onPress}
    >
      <View style={styles.left}>
        <ExpenseCategoryBadge category={expense.category} />
        <View style={styles.info}>
          <Text style={styles.description} numberOfLines={1}>
            {expense.description}
          </Text>
          <Text style={styles.meta}>
            {isPaidByMe ? 'You paid' : `${expense.paidBy?.name || 'Someone'} paid`} • {formatDate(expense.date)}
          </Text>
        </View>
      </View>

      <View style={styles.right}>
        <Text style={styles.totalAmount}>
          {formatCurrency(expense.amount, expense.currency)}
        </Text>
        {isPaidByMe ? (
          <Text style={[styles.subText, { color: colors.success }]}>
            you lent {formatCurrency(expense.amount - (mySplit?.amount || 0), expense.currency)}
          </Text>
        ) : (
          <Text style={[styles.subText, { color: colors.danger }]}>
            you borrowed {formatCurrency(mySplit?.amount || 0, expense.currency)}
          </Text>
        )}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: spacing.sm + 4,
    paddingHorizontal: spacing.md,
    backgroundColor: colors.white,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  left: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  info: {
    marginLeft: spacing.sm,
    flex: 1,
  },
  description: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
  },
  meta: {
    fontSize: 12,
    color: colors.textSecondary,
    marginTop: 2,
  },
  right: {
    alignItems: 'flex-end',
    marginLeft: spacing.sm,
  },
  totalAmount: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.text,
  },
  subText: {
    fontSize: 12,
    fontWeight: '500',
    marginTop: 2,
  },
});

export default ExpenseListItem;
