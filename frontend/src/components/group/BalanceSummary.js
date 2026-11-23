import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors } from '../../theme/colors';
import { spacing } from '../../theme/spacing';
import { formatCurrency } from '../../utils/currencyFormatter';

export const BalanceSummary = ({ totalOwed = 0, totalOwe = 0, currency = 'USD' }) => {
  const netBalance = totalOwed - totalOwe;

  return (
    <View style={styles.card}>
      <View style={styles.netSection}>
        <Text style={styles.netLabel}>Total Balance</Text>
        <Text
          style={[
            styles.netAmount,
            {
              color:
                netBalance > 0
                  ? colors.success
                  : netBalance < 0
                  ? colors.danger
                  : colors.textSecondary,
            },
          ]}
        >
          {netBalance >= 0 ? `+${formatCurrency(netBalance, currency)}` : `-${formatCurrency(Math.abs(netBalance), currency)}`}
        </Text>
      </View>

      <View style={styles.divider} />

      <View style={styles.row}>
        <View style={styles.column}>
          <Text style={styles.subLabel}>You are owed</Text>
          <Text style={[styles.subValue, { color: colors.success }]}>
            {formatCurrency(totalOwed, currency)}
          </Text>
        </View>

        <View style={styles.column}>
          <Text style={styles.subLabel}>You owe</Text>
          <Text style={[styles.subValue, { color: colors.danger }]}>
            {formatCurrency(totalOwe, currency)}
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.white,
    borderRadius: spacing.borderRadius.lg,
    padding: spacing.md,
    marginHorizontal: spacing.md,
    marginVertical: spacing.sm,
    borderWidth: 1,
    borderColor: colors.border,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 2,
  },
  netSection: {
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  netLabel: {
    fontSize: 13,
    color: colors.textSecondary,
    fontWeight: '500',
  },
  netAmount: {
    fontSize: 28,
    fontWeight: '800',
    marginTop: 2,
  },
  divider: {
    height: 1,
    backgroundColor: colors.border,
    marginVertical: spacing.sm,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  column: {
    alignItems: 'center',
  },
  subLabel: {
    fontSize: 12,
    color: colors.textSecondary,
  },
  subValue: {
    fontSize: 16,
    fontWeight: '700',
    marginTop: 2,
  },
});

export default BalanceSummary;
