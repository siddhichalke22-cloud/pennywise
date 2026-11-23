import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  RefreshControl,
  StatusBar,
} from 'react-native';
import colors from '../../theme/colors';
import spacing from '../../theme/spacing';
import typography from '../../theme/typography';
import { moderateScale } from '../../utils/responsive';
import BalanceCard from '../../components/group/BalanceCard';
import ExpenseCard from '../../components/expense/ExpenseCard';
import EmptyState from '../../components/common/EmptyState';
import Avatar from '../../components/common/Avatar';
import CustomButton from '../../components/common/CustomButton';
import {
  currentUser,
  dummyBalance,
  dummyGroups,
  dummyExpenses,
} from '../../data/dummyData';

/**
 * Fintech HomeScreen
 * Features:
 * - User Profile & Notification Header
 * - Branded Deep Purple BalanceCard with quick actions
 * - Quick Action Buttons (Add Expense, New Group, Settle, Analytics)
 * - Active Group Previews Carousel
 * - Interactive Filter Pills ("All", "You Lent", "You Owe")
 * - Dynamic Recent Expenses Feed using ExpenseCard
 * - EmptyState when filter returns no expenses
 */
export const HomeScreen = ({ navigation }) => {
  const [activeFilter, setActiveFilter] = useState('ALL'); // 'ALL' | 'LENT' | 'OWE'
  const [refreshing, setRefreshing] = useState(false);
  const [expenses, setExpenses] = useState(dummyExpenses);

  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      setExpenses(dummyExpenses);
      setRefreshing(false);
    }, 800);
  };

  // Filter expenses dynamically based on selected pill
  const filteredExpenses = expenses.filter((exp) => {
    if (activeFilter === 'LENT') return exp.userImpact?.type === 'lent';
    if (activeFilter === 'OWE') return exp.userImpact?.type === 'owe';
    return true;
  });

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.white} />

      {/* Top Header: Avatar, Greeting, Notification Bell */}
      <View style={styles.topHeader}>
        <View style={styles.userProfileRow}>
          <Avatar
            name={currentUser.name}
            uri={currentUser.avatar}
            size={moderateScale(44)}
          />
          <View style={styles.greetingWrapper}>
            <Text style={styles.greetingSub}>WELCOME BACK</Text>
            <Text style={styles.greetingName}>
              {currentUser.firstName} Rivera 👋
            </Text>
          </View>
        </View>

        <TouchableOpacity
          style={styles.notificationBell}
          activeOpacity={0.7}
          onPress={() => navigation.navigate('Activity')}
        >
          <Text style={styles.bellIcon}>🔔</Text>
          <View style={styles.notificationDot} />
        </TouchableOpacity>
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={[colors.primary]}
            tintColor={colors.primary}
          />
        }
      >
        {/* Reusable BalanceCard */}
        <BalanceCard
          netBalance={dummyBalance.netBalance}
          totalOwed={dummyBalance.totalOwed}
          totalOwe={dummyBalance.totalOwe}
          currency={dummyBalance.currency}
          onAddExpense={() =>
            navigation.navigate('GroupsTab', {
              screen: 'AddExpense',
              params: { groupId: 'grp_1' },
            })
          }
          onSettleUp={() =>
            navigation.navigate('GroupsTab', {
              screen: 'SettleUp',
              params: { groupId: 'grp_1' },
            })
          }
        />

        {/* Quick Actions Row */}
        <View style={styles.quickActionsContainer}>
          <TouchableOpacity
            style={styles.quickActionBtn}
            activeOpacity={0.75}
            onPress={() =>
              navigation.navigate('GroupsTab', {
                screen: 'AddExpense',
                params: { groupId: 'grp_1' },
              })
            }
          >
            <View style={styles.quickActionCircle}>
              <Text style={styles.quickActionEmoji}>＋</Text>
            </View>
            <Text style={styles.quickActionLabel}>Add Bill</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.quickActionBtn}
            activeOpacity={0.75}
            onPress={() =>
              navigation.navigate('GroupsTab', { screen: 'CreateGroup' })
            }
          >
            <View style={styles.quickActionCircle}>
              <Text style={styles.quickActionEmoji}>👥</Text>
            </View>
            <Text style={styles.quickActionLabel}>New Group</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.quickActionBtn}
            activeOpacity={0.75}
            onPress={() =>
              navigation.navigate('GroupsTab', {
                screen: 'SettleUp',
                params: { groupId: 'grp_1' },
              })
            }
          >
            <View style={styles.quickActionCircle}>
              <Text style={styles.quickActionEmoji}>⇄</Text>
            </View>
            <Text style={styles.quickActionLabel}>Settle</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.quickActionBtn}
            activeOpacity={0.75}
            onPress={() => navigation.navigate('Activity')}
          >
            <View style={styles.quickActionCircle}>
              <Text style={styles.quickActionEmoji}>📊</Text>
            </View>
            <Text style={styles.quickActionLabel}>Activity</Text>
          </TouchableOpacity>
        </View>

        {/* Active Groups Section */}
        <View style={styles.sectionHeaderRow}>
          <Text style={styles.sectionTitle}>Active Groups</Text>
          <TouchableOpacity
            onPress={() => navigation.navigate('GroupsTab')}
            hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
          >
            <Text style={styles.seeAllText}>See all ({dummyGroups.length}) →</Text>
          </TouchableOpacity>
        </View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.groupsScrollRow}
        >
          {dummyGroups.map((grp) => (
            <TouchableOpacity
              key={grp.id}
              activeOpacity={0.8}
              onPress={() =>
                navigation.navigate('GroupsTab', {
                  screen: 'GroupDetail',
                  params: { groupId: grp.id, groupName: grp.name },
                })
              }
              style={styles.groupCardMini}
            >
              <View style={styles.groupCardHeader}>
                <View style={styles.groupCardEmojiWrapper}>
                  <Text style={styles.groupCardEmoji}>{grp.emoji}</Text>
                </View>
                <Text
                  style={[
                    styles.groupStatusText,
                    grp.userNetStatus === 'owed'
                      ? styles.groupStatusOwed
                      : grp.userNetStatus === 'owe'
                      ? styles.groupStatusOwe
                      : styles.groupStatusSettled,
                  ]}
                >
                  {grp.userNetStatus === 'owed'
                    ? `+$${grp.userNetBalance.toFixed(2)}`
                    : grp.userNetStatus === 'owe'
                    ? `-$${grp.userNetBalance.toFixed(2)}`
                    : 'Settled'}
                </Text>
              </View>

              <Text style={styles.groupCardName} numberOfLines={1}>
                {grp.name}
              </Text>
              <Text style={styles.groupCardMeta}>
                👥 {grp.membersCount} members • {grp.category}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Expenses Feed Header & Filter Tabs */}
        <View style={styles.feedHeaderSection}>
          <View style={styles.sectionHeaderRow}>
            <Text style={styles.sectionTitle}>Recent Expenses</Text>
            <Text style={styles.feedCounterText}>
              {filteredExpenses.length} records
            </Text>
          </View>

          {/* Interactive Filter Pills */}
          <View style={styles.filterRow}>
            <TouchableOpacity
              style={[
                styles.filterPill,
                activeFilter === 'ALL' && styles.filterPillActive,
              ]}
              onPress={() => setActiveFilter('ALL')}
            >
              <Text
                style={[
                  styles.filterPillText,
                  activeFilter === 'ALL' && styles.filterPillTextActive,
                ]}
              >
                All Bills
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.filterPill,
                activeFilter === 'LENT' && styles.filterPillActive,
              ]}
              onPress={() => setActiveFilter('LENT')}
            >
              <Text
                style={[
                  styles.filterPillText,
                  activeFilter === 'LENT' && styles.filterPillTextActive,
                ]}
              >
                You Lent (Green)
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.filterPill,
                activeFilter === 'OWE' && styles.filterPillActive,
              ]}
              onPress={() => setActiveFilter('OWE')}
            >
              <Text
                style={[
                  styles.filterPillText,
                  activeFilter === 'OWE' && styles.filterPillTextActive,
                ]}
              >
                You Owe (Red)
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Dynamic Expenses Feed */}
        <View style={styles.expensesFeed}>
          {filteredExpenses.length === 0 ? (
            <EmptyState
              icon="🎉"
              title="No bills under this filter"
              description="You have no pending splits in this category. You're completely up to date!"
              actionTitle="View All Expenses"
              onAction={() => setActiveFilter('ALL')}
            />
          ) : (
            filteredExpenses.map((expense) => (
              <ExpenseCard
                key={expense.id}
                expense={expense}
                onPress={() =>
                  navigation.navigate('GroupsTab', {
                    screen: 'ExpenseDetail',
                    params: { expenseId: expense.id },
                  })
                }
              />
            ))
          )}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  topHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: moderateScale(16),
    paddingTop: moderateScale(14),
    paddingBottom: moderateScale(10),
    backgroundColor: colors.white,
    borderBottomWidth: 1,
    borderBottomColor: colors.borderLight,
  },
  userProfileRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  greetingWrapper: {
    marginLeft: moderateScale(10),
  },
  greetingSub: {
    ...typography.caption,
    color: colors.primaryDark,
    fontWeight: '700',
    letterSpacing: 0.8,
  },
  greetingName: {
    ...typography.h4,
    color: colors.text,
    fontSize: moderateScale(16),
  },
  notificationBell: {
    width: moderateScale(40),
    height: moderateScale(40),
    borderRadius: spacing.borderRadius.sm,
    backgroundColor: colors.secondarySubtle,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  bellIcon: {
    fontSize: moderateScale(18),
  },
  notificationDot: {
    position: 'absolute',
    top: moderateScale(8),
    right: moderateScale(8),
    width: moderateScale(8),
    height: moderateScale(8),
    borderRadius: moderateScale(4),
    backgroundColor: colors.danger,
    borderWidth: 1.5,
    borderColor: colors.white,
  },
  scrollContent: {
    paddingBottom: moderateScale(40),
  },
  quickActionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: moderateScale(16),
    marginTop: moderateScale(6),
    marginBottom: moderateScale(14),
  },
  quickActionBtn: {
    alignItems: 'center',
  },
  quickActionCircle: {
    width: moderateScale(52),
    height: moderateScale(52),
    borderRadius: spacing.borderRadius.lg,
    backgroundColor: colors.white,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: colors.borderLight,
    ...spacing.shadows.subtle,
  },
  quickActionEmoji: {
    fontSize: moderateScale(22),
    color: colors.primary,
  },
  quickActionLabel: {
    ...typography.caption,
    color: colors.text,
    fontWeight: '600',
    marginTop: moderateScale(6),
  },
  sectionHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: moderateScale(16),
    marginBottom: moderateScale(8),
    marginTop: moderateScale(6),
  },
  sectionTitle: {
    ...typography.h3,
    color: colors.text,
    fontSize: moderateScale(18),
  },
  seeAllText: {
    ...typography.bodySmallBold,
    color: colors.primary,
  },
  groupsScrollRow: {
    paddingHorizontal: moderateScale(16),
    paddingBottom: moderateScale(12),
    gap: moderateScale(12),
  },
  groupCardMini: {
    width: moderateScale(160),
    backgroundColor: colors.white,
    borderRadius: spacing.borderRadius.lg,
    padding: moderateScale(14),
    borderWidth: 1,
    borderColor: colors.borderLight,
    ...spacing.shadows.subtle,
  },
  groupCardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: moderateScale(10),
  },
  groupCardEmojiWrapper: {
    width: moderateScale(36),
    height: moderateScale(36),
    borderRadius: spacing.borderRadius.sm,
    backgroundColor: colors.secondarySubtle,
    alignItems: 'center',
    justifyContent: 'center',
  },
  groupCardEmoji: {
    fontSize: moderateScale(18),
  },
  groupStatusText: {
    ...typography.caption,
    fontWeight: '700',
  },
  groupStatusOwed: {
    color: colors.successDark,
  },
  groupStatusOwe: {
    color: colors.dangerDark,
  },
  groupStatusSettled: {
    color: colors.textMuted,
  },
  groupCardName: {
    ...typography.h4,
    color: colors.text,
    fontSize: moderateScale(14),
    marginBottom: moderateScale(2),
  },
  groupCardMeta: {
    ...typography.caption,
    color: colors.textSecondary,
    fontSize: moderateScale(11),
  },
  feedHeaderSection: {
    marginTop: moderateScale(10),
  },
  feedCounterText: {
    ...typography.caption,
    color: colors.textSecondary,
  },
  filterRow: {
    flexDirection: 'row',
    paddingHorizontal: moderateScale(16),
    marginVertical: moderateScale(8),
    gap: moderateScale(8),
  },
  filterPill: {
    paddingVertical: moderateScale(6),
    paddingHorizontal: moderateScale(12),
    borderRadius: spacing.borderRadius.full,
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.border,
  },
  filterPillActive: {
    backgroundColor: colors.secondarySubtle,
    borderColor: colors.primary,
  },
  filterPillText: {
    ...typography.caption,
    color: colors.textSecondary,
    fontWeight: '600',
  },
  filterPillTextActive: {
    color: colors.primaryDark,
    fontWeight: '700',
  },
  expensesFeed: {
    paddingHorizontal: moderateScale(16),
  },
});

export default HomeScreen;
