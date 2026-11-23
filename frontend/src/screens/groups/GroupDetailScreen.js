import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { groupApi } from '../../services/api/groupApi';
import { useExpenses } from '../../hooks/useExpenses';
import { Header } from '../../components/common/Header';
import { Button } from '../../components/common/Button';
import { ExpenseListItem } from '../../components/expense/ExpenseListItem';
import { colors } from '../../theme/colors';
import { spacing } from '../../theme/spacing';

export const GroupDetailScreen = ({ route, navigation }) => {
  const { groupId, groupName } = route.params;
  const [group, setGroup] = useState(null);
  const { expenses, loading, fetchExpenses } = useExpenses(groupId);

  useEffect(() => {
    groupApi.getGroupById(groupId).then((res) => setGroup(res.data)).catch(console.error);
    fetchExpenses();
  }, [groupId, fetchExpenses]);

  return (
    <View style={styles.container}>
      <Header
        title={groupName || 'Group'}
        subtitle={group ? `${group.members?.length || 0} members` : ''}
        onBack={() => navigation.goBack()}
        rightAction={
          <Button
            title="+ Add Bill"
            size="sm"
            onPress={() => navigation.navigate('AddExpense', { groupId })}
          />
        }
      />

      <View style={styles.actionsBar}>
        <Button
          title="Settle Up"
          variant="outline"
          size="sm"
          onPress={() => navigation.navigate('SettleUp', { groupId })}
          style={styles.actionBtn}
        />
      </View>

      <FlatList
        data={expenses}
        keyExtractor={(item) => item._id}
        refreshing={loading}
        onRefresh={fetchExpenses}
        renderItem={({ item }) => (
          <ExpenseListItem
            expense={item}
            onPress={() => navigation.navigate('ExpenseDetail', { expenseId: item._id })}
          />
        )}
        ListEmptyComponent={
          <View style={styles.empty}>
            <Text style={styles.emptyText}>No expenses logged yet in this group.</Text>
          </View>
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  actionsBar: {
    flexDirection: 'row',
    padding: spacing.md,
    backgroundColor: colors.white,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  actionBtn: {
    flex: 1,
  },
  empty: {
    padding: spacing.xl,
    alignItems: 'center',
  },
  emptyText: {
    color: colors.textSecondary,
    fontSize: 14,
  },
});

export default GroupDetailScreen;
