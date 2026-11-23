import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import { expenseApi } from '../../services/api/expenseApi';
import { Header } from '../../components/common/Header';
import { Button } from '../../components/common/Button';
import { formatCurrency } from '../../utils/currencyFormatter';
import { formatDate } from '../../utils/dateFormatter';
import { colors } from '../../theme/colors';
import { spacing } from '../../theme/spacing';

export const ExpenseDetailScreen = ({ route, navigation }) => {
  const { expenseId } = route.params;
  const [expense, setExpense] = useState(null);

  useEffect(() => {
    expenseApi.getExpenseById(expenseId).then((res) => setExpense(res.data)).catch(console.error);
  }, [expenseId]);

  const handleDelete = async () => {
    Alert.alert('Delete Expense', 'Are you sure you want to remove this expense?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Delete',
        style: 'destructive',
        onPress: async () => {
          await expenseApi.deleteExpense(expenseId);
          navigation.goBack();
        },
      },
    ]);
  };

  if (!expense) {
    return <View style={styles.container} />;
  }

  return (
    <View style={styles.container}>
      <Header title="Expense Details" onBack={() => navigation.goBack()} />
      <View style={styles.content}>
        <Text style={styles.description}>{expense.description}</Text>
        <Text style={styles.amount}>
          {formatCurrency(expense.amount, expense.currency)}
        </Text>
        <Text style={styles.meta}>
          Paid by {expense.paidBy?.name || 'Someone'} on {formatDate(expense.date)}
        </Text>

        <View style={styles.splitsContainer}>
          <Text style={styles.splitsTitle}>Splits</Text>
          {expense.splits?.map((split, idx) => (
            <View key={idx} style={styles.splitRow}>
              <Text style={styles.memberName}>{split.user?.name || 'Member'}</Text>
              <Text style={styles.splitAmount}>
                {formatCurrency(split.amount, expense.currency)}
              </Text>
            </View>
          ))}
        </View>

        <Button
          title="Delete Expense"
          variant="danger"
          onPress={handleDelete}
          style={{ marginTop: spacing.xl }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  content: {
    padding: spacing.lg,
  },
  description: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.text,
  },
  amount: {
    fontSize: 32,
    fontWeight: '800',
    color: colors.primaryDark,
    marginTop: spacing.xs,
  },
  meta: {
    fontSize: 14,
    color: colors.textSecondary,
    marginTop: spacing.xs,
  },
  splitsContainer: {
    marginTop: spacing.xl,
    paddingTop: spacing.md,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  splitsTitle: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: spacing.sm,
  },
  splitRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: spacing.xs,
  },
  memberName: {
    fontSize: 15,
    color: colors.text,
  },
  splitAmount: {
    fontSize: 15,
    fontWeight: '600',
  },
});

export default ExpenseDetailScreen;
