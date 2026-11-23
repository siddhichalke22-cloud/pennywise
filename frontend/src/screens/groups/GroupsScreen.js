import React, { useEffect } from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import { useGroups } from '../../hooks/useGroups';
import { Header } from '../../components/common/Header';
import { Button } from '../../components/common/Button';
import { GroupCard } from '../../components/group/GroupCard';
import { colors } from '../../theme/colors';
import { spacing } from '../../theme/spacing';

export const GroupsScreen = ({ navigation }) => {
  const { groups, loading, fetchGroups } = useGroups();

  useEffect(() => {
    fetchGroups();
  }, [fetchGroups]);

  return (
    <View style={styles.container}>
      <Header
        title="Your Groups"
        rightAction={
          <Button
            title="+ New Group"
            size="sm"
            onPress={() => navigation.navigate('CreateGroup')}
          />
        }
      />
      <FlatList
        data={groups}
        keyExtractor={(item) => item._id}
        refreshing={loading}
        onRefresh={fetchGroups}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <GroupCard
            group={item}
            onPress={() =>
              navigation.navigate('GroupDetail', {
                groupId: item._id,
                groupName: item.name,
              })
            }
          />
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  list: {
    padding: spacing.md,
  },
});

export default GroupsScreen;
