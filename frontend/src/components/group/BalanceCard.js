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
 * Reusable Fintech BalanceCard
 * Deep purple hero card showing net balance, owed vs owe metrics,
 * and quick-action buttons (Add Expense, Settle Up).
 */
export const BalanceCard = ({
  netBalance = 345.5,
  totalOwed = 520.0,
  totalOwe = 174.5,
  currency = 'USD',
  onAddExpense,
  onSettleUp,
  style,
}) => {
  const isPositive = netBalance >= 0;

  return (
    <View style={[styles.card, style]}>
      {/* Background Decorative Accents */}
      <View style={styles.topAccentCircle} />
      <View style={styles.bottomAccentCircle} />

      {/* Card Header Label */}
      <View style={styles.headerRow}>
        <View style={styles.badgeRow}>
          <Text style={styles.headerLabel}>TOTAL BALANCE</Text>
          <View style={styles.currencyBadge}>
            <Text style={styles.currencyText}>{currency}</Text>
          </View>
        </View>
        <Text style={styles.statusIndicator}>● Live</Text>
      </View>

      {/* Hero Balance Amount */}
      <View style={styles.balanceContainer}>
        <Text style={styles.balanceAmount}>
          {isPositive ? '+' : '-'}
          {formatCurrency(Math.abs(netBalance), currency)}
        </Text>
        <Text style={styles.balanceSubtitle}>
          {isPositive ? 'You are owed overall' : 'You owe overall'}
        </Text>
      </View>

      {/* Divider */}
      <View style={styles.divider} />

      {/* Sub Metrics: Owed vs Owe */}
      <View style={styles.metricsRow}>
        {/* Left: You are owed */}
        <View style={styles.metricColumn}>
          <View style={styles.metricLabelRow}>
            <View style={[styles.dot, styles.dotOwed]} />
            <Text style={styles.metricLabel}>You are owed</Text>
          </View>
          <Text style={styles.owedValue}>
            +{formatCurrency(totalOwed, currency)}
          </Text>
        </View>

        <View style={styles.metricDivider} />

        {/* Right: You owe */}
        <View style={styles.metricColumn}>
          <View style={styles.metricLabelRow}>
            <View style={[styles.dot, styles.dotOwe]} />
            <Text style={styles.metricLabel}>You owe</Text>
          </View>
          <Text style={styles.oweValue}>
            -{formatCurrency(totalOwe, currency)}
          </Text>
        </View>
      </View>

      {/* Action Buttons Row */}
      <View style={styles.actionRow}>
        <TouchableOpacity
          activeOpacity={0.85}
          onPress={onAddExpense}
          style={styles.primaryActionBtn}
        >
          <Text style={styles.primaryActionIcon}>＋</Text>
          <Text style={styles.primaryActionText}>Add Expense</Text>
        </TouchableOpacity>

        <TouchableOpacity
          activeOpacity={0.8}
          onPress={onSettleUp}
          style={styles.secondaryActionBtn}
        >
          <Text style={styles.secondaryActionIcon}>⇄</Text>
          <Text style={styles.secondaryActionText}>Settle Up</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.primaryDark,
    borderRadius: spacing.borderRadius.xl,
    padding: moderateScale(20),
    marginHorizontal: moderateScale(16),
    marginVertical: moderateScale(12),
    position: 'relative',
    overflow: 'hidden',
    ...spacing.shadows.purpleGlow,
  },
  topAccentCircle: {
    position: 'absolute',
    top: -moderateScale(50),
    right: -moderateScale(40),
    width: moderateScale(140),
    height: moderateScale(140),
    borderRadius: moderateScale(70),
    backgroundColor: colors.primaryLight,
    opacity: 0.18,
  },
  bottomAccentCircle: {
    position: 'absolute',
    bottom: -moderateScale(60),
    left: -moderateScale(30),
    width: moderateScale(120),
    height: moderateScale(120),
    borderRadius: moderateScale(60),
    backgroundColor: colors.secondary,
    opacity: 0.12,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: moderateScale(8),
  },
  badgeRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerLabel: {
    ...typography.caption,
    color: colors.secondarySoft,
    letterSpacing: 1.2,
    fontWeight: '700',
  },
  currencyBadge: {
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    paddingHorizontal: moderateScale(6),
    paddingVertical: moderateScale(1),
    borderRadius: spacing.borderRadius.xs,
    marginLeft: moderateScale(8),
  },
  currencyText: {
    color: colors.white,
    fontSize: moderateScale(10),
    fontWeight: '700',
  },
  statusIndicator: {
    ...typography.caption,
    color: colors.successLight,
    fontWeight: '600',
  },
  balanceContainer: {
    marginVertical: moderateScale(4),
  },
  balanceAmount: {
    ...typography.displayBalance,
    color: colors.white,
  },
  balanceSubtitle: {
    ...typography.bodySmall,
    color: colors.secondarySoft,
    marginTop: moderateScale(2),
  },
  divider: {
    height: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.12)',
    marginVertical: moderateScale(14),
  },
  metricsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  metricColumn: {
    flex: 1,
  },
  metricDivider: {
    width: 1,
    height: moderateScale(36),
    backgroundColor: 'rgba(255, 255, 255, 0.12)',
    marginHorizontal: moderateScale(12),
  },
  metricLabelRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: moderateScale(4),
  },
  dot: {
    width: moderateScale(7),
    height: moderateScale(7),
    borderRadius: moderateScale(4),
    marginRight: moderateScale(6),
  },
  dotOwed: {
    backgroundColor: colors.success,
  },
  dotOwe: {
    backgroundColor: colors.danger,
  },
  metricLabel: {
    ...typography.caption,
    color: colors.secondarySoft,
    fontWeight: '500',
  },
  owedValue: {
    ...typography.h4,
    color: colors.successLight,
    fontWeight: '700',
  },
  oweValue: {
    ...typography.h4,
    color: colors.dangerLight,
    fontWeight: '700',
  },
  actionRow: {
    flexDirection: 'row',
    marginTop: moderateScale(18),
    gap: moderateScale(10),
  },
  primaryActionBtn: {
    flex: 1.2,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.secondarySubtle,
    borderRadius: spacing.borderRadius.md,
    paddingVertical: moderateScale(11),
    paddingHorizontal: moderateScale(14),
  },
  primaryActionIcon: {
    fontSize: moderateScale(16),
    color: colors.primaryDark,
    fontWeight: '700',
    marginRight: moderateScale(6),
  },
  primaryActionText: {
    ...typography.button,
    color: colors.primaryDark,
    fontSize: moderateScale(14),
  },
  secondaryActionBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.12)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.25)',
    borderRadius: spacing.borderRadius.md,
    paddingVertical: moderateScale(11),
    paddingHorizontal: moderateScale(12),
  },
  secondaryActionIcon: {
    fontSize: moderateScale(16),
    color: colors.white,
    fontWeight: '700',
    marginRight: moderateScale(6),
  },
  secondaryActionText: {
    ...typography.button,
    color: colors.white,
    fontSize: moderateScale(14),
  },
});

export default BalanceCard;
