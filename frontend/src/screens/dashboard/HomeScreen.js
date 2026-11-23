import React, { useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, RefreshControl } from 'react-native';
import { useAuth } from '../../hooks/useAuth';
import { useGroups } from '../../hooks/useGroups';
import { BalanceSummary } from '../../components/group/BalanceSummary';
import { GroupCard } from '../../components/group/GroupCard';
import { Header } from '../../components/common/Header';
import { Button } from '../../components/common/Button';
import { colors } from '../../theme/colors';
import { spacing } from '../../theme/spacing';

export const HomeScreen = ({ navigation }) => {
  const { user } = useAuth();
  const { groups, loading, fetchGroups } = useGroups();

  useEffect(() => {
    fetchGroups();
  }, [fetchGroups]);

  return (
    <View style={styles.container}>
      <Header
        title="Pennywise"
        subtitle={`Welcome back, ${user?.name || 'Friend'}`}
        rightAction={
          <Button
            title="+ New Group"
            size="sm"
            onPress={() => navigation.navigate('GroupsTab', { screen: 'CreateGroup' })}
          />
        }
      />

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        refreshControl={<RefreshControl refreshing={loading} onRefresh={fetchGroups} />}
      >
        <BalanceSummary totalOwed={120.5} totalOwe={45.0} currency="USD" />

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Your Groups</Text>
        </View>

        {groups.length === 0 && !loading ? (
          <View style={styles.emptyState}>
            <Text style={styles.emptyText}>No groups yet.</Text>
            <Text style={styles.emptySubtext}>
              Create a group for your trip, house, or project to start tracking expenses.
            </Text>
          </View>
        ) : (
          groups.map((group) => (
            <GroupCard
              key={group._id}
              group={group}
              onPress={() =>
                navigation.navigate('GroupsTab', {
                  screen: 'GroupDetail',
                  params: { groupId: group._id, groupName: group.name },
                })
              }
            />
          ))
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollContent: {
    paddingBottom: spacing.xxl,
  },
  sectionHeader: {
    paddingHorizontal: spacing.md,
    marginTop: spacing.md,
    marginBottom: spacing.xs,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.text,
  },
  emptyState: {
    padding: spacing.xl,
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.textSecondary,
  },
  emptySubtext: {
    fontSize: 13,
    color: colors.textSecondary,
    textAlign: 'center',
    marginTop: spacing.xs,
  },
});

export default HomeScreen;
