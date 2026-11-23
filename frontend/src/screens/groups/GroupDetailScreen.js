import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  StatusBar,
} from 'react-native';
import Header from '../../components/common/Header';
import CustomButton from '../../components/common/CustomButton';
import ExpenseCard from '../../components/expense/ExpenseCard';
import EmptyState from '../../components/common/EmptyState';
import colors from '../../theme/colors';
import spacing from '../../theme/spacing';
import typography from '../../theme/typography';
import { moderateScale } from '../../utils/responsive';
import { dummyGroups, dummyExpenses } from '../../data/dummyData';

export const GroupDetailScreen = ({ route, navigation }) => {
  const { groupId, groupName } = route.params;

  const currentGroup =
    dummyGroups.find((g) => g.id === groupId) || {
      id: groupId,
      name: groupName || 'Group',
      membersCount: 4,
      emoji: '👥',
      category: 'Trip',
    };

  const groupExpenses = dummyExpenses.filter(
    (e) => e.groupId === groupId || !groupId
  );

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.white} />
      <Header
        title={currentGroup.name}
        subtitle={`${currentGroup.membersCount || 4} members • ${currentGroup.category}`}
        showBack
        onBack={() => navigation.goBack()}
        rightAction={
          <CustomButton
            title="+ Add Bill"
            size="sm"
            variant="primary"
            onPress={() => navigation.navigate('AddExpense', { groupId: currentGroup.id })}
          />
        }
      />

      {/* Settle Up Action Banner */}
      <View style={styles.actionsBar}>
        <CustomButton
          title="⇄ Settle Up Group Debts"
          variant="secondary"
          size="md"
          fullWidth
          onPress={() => navigation.navigate('SettleUp', { groupId: currentGroup.id })}
        />
      </View>

      <FlatList
        data={groupExpenses.length > 0 ? groupExpenses : dummyExpenses}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <ExpenseCard
            expense={item}
            onPress={() =>
              navigation.navigate('ExpenseDetail', { expenseId: item.id })
            }
          />
        )}
        ListEmptyComponent={
          <EmptyState
            icon="🧾"
            title="No expenses logged yet"
            description="Start splitting expenses in this group by tapping the Add Bill button."
            actionTitle="+ Add First Bill"
            onAction={() =>
              navigation.navigate('AddExpense', { groupId: currentGroup.id })
            }
          />
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
    paddingHorizontal: moderateScale(16),
    paddingVertical: moderateScale(10),
    backgroundColor: colors.white,
    borderBottomWidth: 1,
    borderBottomColor: colors.borderLight,
  },
  listContent: {
    padding: moderateScale(16),
  },
});

export default GroupDetailScreen;
