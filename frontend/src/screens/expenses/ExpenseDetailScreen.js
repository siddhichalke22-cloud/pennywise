import React from 'react';
import { View, Text, StyleSheet, Alert, ScrollView, StatusBar } from 'react-native';
import Header from '../../components/common/Header';
import CustomButton from '../../components/common/CustomButton';
import colors from '../../theme/colors';
import spacing from '../../theme/spacing';
import typography from '../../theme/typography';
import { moderateScale } from '../../utils/responsive';
import { formatCurrency } from '../../utils/currencyFormatter';
import { dummyExpenses } from '../../data/dummyData';

export const ExpenseDetailScreen = ({ route, navigation }) => {
  const { expenseId } = route.params;

  const expense =
    dummyExpenses.find((e) => e.id === expenseId) || dummyExpenses[0];

  const handleDelete = () => {
    Alert.alert('Delete Expense', 'Are you sure you want to remove this expense?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Delete',
        style: 'destructive',
        onPress: () => {
          Alert.alert('Expense Deleted', 'The expense has been removed.');
          navigation.goBack();
        },
      },
    ]);
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.white} />
      <Header
        title="Expense Details"
        showBack
        onBack={() => navigation.goBack()}
      />

      <ScrollView contentContainerStyle={styles.content}>
        {/* Main Card */}
        <View style={styles.heroCard}>
          <View style={styles.badgeRow}>
            <View style={styles.categoryBadge}>
              <Text style={styles.categoryIcon}>{expense.categoryIcon || '🧾'}</Text>
            </View>
            <View style={styles.groupPill}>
              <Text style={styles.groupText}>{expense.groupName}</Text>
            </View>
          </View>

          <Text style={styles.title}>{expense.title}</Text>
          <Text style={styles.amount}>
            {formatCurrency(expense.amount, expense.currency)}
          </Text>

          <Text style={styles.meta}>
            Paid by <Text style={styles.bold}>{expense.paidBy?.name || 'Someone'}</Text> • {expense.date}
          </Text>
        </View>

        {/* Split Breakdown */}
        <View style={styles.splitsCard}>
          <Text style={styles.splitsTitle}>SPLIT ALLOCATION ({expense.splitType || 'EQUAL'})</Text>

          <View style={styles.splitRow}>
            <Text style={styles.memberName}>Alex Rivera (You)</Text>
            <Text style={styles.splitAmount}>
              {formatCurrency(expense.userImpact?.amount || 21.05, expense.currency)}
            </Text>
          </View>
          <View style={styles.divider} />

          <View style={styles.splitRow}>
            <Text style={styles.memberName}>Sarah Jenkins</Text>
            <Text style={styles.splitAmount}>
              {formatCurrency(expense.userImpact?.amount || 21.05, expense.currency)}
            </Text>
          </View>
          <View style={styles.divider} />

          <View style={styles.splitRow}>
            <Text style={styles.memberName}>Marcus Chen</Text>
            <Text style={styles.splitAmount}>
              {formatCurrency(expense.userImpact?.amount || 21.05, expense.currency)}
            </Text>
          </View>
          <View style={styles.divider} />

          <View style={styles.splitRow}>
            <Text style={styles.memberName}>Maya Patel</Text>
            <Text style={styles.splitAmount}>
              {formatCurrency(expense.userImpact?.amount || 21.05, expense.currency)}
            </Text>
          </View>
        </View>

        {/* Delete Action */}
        <CustomButton
          title="Delete Expense"
          variant="outline"
          size="lg"
          fullWidth
          onPress={handleDelete}
          textStyle={{ color: colors.dangerDark }}
          style={styles.deleteBtn}
        />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    padding: moderateScale(16),
  },
  heroCard: {
    backgroundColor: colors.white,
    borderRadius: spacing.borderRadius.xl,
    padding: moderateScale(22),
    borderWidth: 1,
    borderColor: colors.borderLight,
    ...spacing.shadows.subtle,
  },
  badgeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: moderateScale(12),
  },
  categoryBadge: {
    width: moderateScale(48),
    height: moderateScale(48),
    borderRadius: spacing.borderRadius.md,
    backgroundColor: colors.secondarySubtle,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: moderateScale(10),
  },
  categoryIcon: {
    fontSize: moderateScale(24),
  },
  groupPill: {
    backgroundColor: colors.secondaryGhost,
    borderRadius: spacing.borderRadius.xs,
    paddingHorizontal: moderateScale(10),
    paddingVertical: moderateScale(4),
  },
  groupText: {
    ...typography.caption,
    color: colors.primaryDark,
    fontWeight: '700',
  },
  title: {
    ...typography.h2,
    color: colors.text,
    fontSize: moderateScale(22),
  },
  amount: {
    ...typography.displayBalance,
    color: colors.primaryDark,
    marginVertical: moderateScale(6),
  },
  meta: {
    ...typography.body,
    color: colors.textSecondary,
  },
  bold: {
    fontWeight: '700',
    color: colors.text,
  },
  splitsCard: {
    backgroundColor: colors.white,
    borderRadius: spacing.borderRadius.lg,
    padding: moderateScale(18),
    marginTop: moderateScale(14),
    borderWidth: 1,
    borderColor: colors.borderLight,
    ...spacing.shadows.subtle,
  },
  splitsTitle: {
    ...typography.caption,
    color: colors.textSecondary,
    fontWeight: '700',
    letterSpacing: 0.8,
    marginBottom: moderateScale(12),
  },
  splitRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: moderateScale(8),
  },
  memberName: {
    ...typography.bodyBold,
    color: colors.text,
  },
  splitAmount: {
    ...typography.bodyBold,
    color: colors.primaryDark,
  },
  divider: {
    height: 1,
    backgroundColor: colors.borderLight,
  },
  deleteBtn: {
    marginTop: moderateScale(20),
    borderColor: colors.dangerLight,
  },
});

export default ExpenseDetailScreen;
