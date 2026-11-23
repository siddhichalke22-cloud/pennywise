import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import colors from '../../theme/colors';
import spacing from '../../theme/spacing';
import typography from '../../theme/typography';
import { moderateScale } from '../../utils/responsive';
import { formatCurrency } from '../../utils/currencyFormatter';

/**
 * Reusable Fintech ExpenseCard
 * Displays category icon in a soft lavender badge, expense title,
 * group tag, date, who paid, and a clear "you lent" vs "you owe" badge.
 */
export const ExpenseCard = ({ expense, onPress, style }) => {
  if (!expense) return null;

  const isLent = expense.userImpact?.type === 'lent';
  const isOwe = expense.userImpact?.type === 'owe';
  const impactAmount = expense.userImpact?.amount || 0;

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={onPress}
      style={[styles.card, style]}
    >
      <View style={styles.leftContainer}>
        {/* Soft Lavender Category Badge */}
        <View style={styles.categoryBadge}>
          <Text style={styles.categoryIcon}>
            {expense.categoryIcon || '🧾'}
          </Text>
        </View>

        {/* Expense Info */}
        <View style={styles.infoContainer}>
          <Text style={styles.title} numberOfLines={1}>
            {expense.title}
          </Text>

          <View style={styles.metaRow}>
            {expense.groupName ? (
              <View style={styles.groupPill}>
                <Text style={styles.groupText} numberOfLines={1}>
                  {expense.groupName}
                </Text>
              </View>
            ) : null}
            <Text style={styles.metaDot}>•</Text>
            <Text style={styles.dateText}>{expense.date}</Text>
          </View>

          <Text style={styles.payerText} numberOfLines={1}>
            {expense.paidBy?.isCurrentUser
              ? `You paid ${formatCurrency(expense.amount, expense.currency)}`
              : `${expense.paidBy?.name || 'Someone'} paid ${formatCurrency(
                  expense.amount,
                  expense.currency
                )}`}
          </Text>
        </View>
      </View>

      {/* Right Side Impact Badge */}
      <View style={styles.rightContainer}>
        {isLent ? (
          <View style={[styles.impactPill, styles.lentPill]}>
            <Text style={styles.lentLabel}>you lent</Text>
            <Text style={styles.lentAmount}>
              +{formatCurrency(impactAmount, expense.currency)}
            </Text>
          </View>
        ) : isOwe ? (
          <View style={[styles.impactPill, styles.owePill]}>
            <Text style={styles.oweLabel}>you owe</Text>
            <Text style={styles.oweAmount}>
              -{formatCurrency(impactAmount, expense.currency)}
            </Text>
          </View>
        ) : (
          <View style={[styles.impactPill, styles.neutralPill]}>
            <Text style={styles.neutralLabel}>settled</Text>
            <Text style={styles.neutralAmount}>
              {formatCurrency(expense.amount, expense.currency)}
            </Text>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.surface,
    borderRadius: spacing.borderRadius.lg,
    paddingVertical: moderateScale(14),
    paddingHorizontal: moderateScale(16),
    marginVertical: moderateScale(6),
    borderWidth: 1,
    borderColor: colors.borderLight,
    ...spacing.shadows.card,
  },
  leftContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    marginRight: moderateScale(12),
  },
  categoryBadge: {
    width: moderateScale(48),
    height: moderateScale(48),
    borderRadius: spacing.borderRadius.md,
    backgroundColor: colors.secondarySubtle,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: moderateScale(12),
    borderWidth: 1,
    borderColor: colors.secondarySoft,
  },
  categoryIcon: {
    fontSize: moderateScale(22),
  },
  infoContainer: {
    flex: 1,
  },
  title: {
    ...typography.h4,
    color: colors.text,
    marginBottom: moderateScale(2),
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: moderateScale(2),
  },
  groupPill: {
    backgroundColor: colors.secondaryGhost,
    borderRadius: spacing.borderRadius.xs,
    paddingHorizontal: moderateScale(6),
    paddingVertical: moderateScale(1),
  },
  groupText: {
    ...typography.caption,
    color: colors.primaryDark,
    fontWeight: '600',
  },
  metaDot: {
    marginHorizontal: moderateScale(4),
    color: colors.textMuted,
    fontSize: moderateScale(10),
  },
  dateText: {
    ...typography.caption,
    color: colors.textSecondary,
  },
  payerText: {
    ...typography.bodySmall,
    color: colors.textSecondary,
  },
  rightContainer: {
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  impactPill: {
    paddingVertical: moderateScale(6),
    paddingHorizontal: moderateScale(10),
    borderRadius: spacing.borderRadius.md,
    alignItems: 'flex-end',
    minWidth: moderateScale(80),
  },
  lentPill: {
    backgroundColor: colors.successSoft,
    borderWidth: 1,
    borderColor: colors.successLight,
  },
  owePill: {
    backgroundColor: colors.dangerSoft,
    borderWidth: 1,
    borderColor: colors.dangerLight,
  },
  neutralPill: {
    backgroundColor: colors.background,
  },
  lentLabel: {
    ...typography.caption,
    color: colors.successDark,
    fontWeight: '600',
    textTransform: 'uppercase',
  },
  lentAmount: {
    ...typography.bodyBold,
    color: colors.successDark,
    fontSize: moderateScale(14),
  },
  oweLabel: {
    ...typography.caption,
    color: colors.dangerDark,
    fontWeight: '600',
    textTransform: 'uppercase',
  },
  oweAmount: {
    ...typography.bodyBold,
    color: colors.dangerDark,
    fontSize: moderateScale(14),
  },
  neutralLabel: {
    ...typography.caption,
    color: colors.textMuted,
    textTransform: 'uppercase',
  },
  neutralAmount: {
    ...typography.bodyBold,
    color: colors.textSecondary,
    fontSize: moderateScale(13),
  },
});

export default ExpenseCard;
