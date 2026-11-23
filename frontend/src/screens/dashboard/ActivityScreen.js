import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { Header } from '../../components/common/Header';
import { colors } from '../../theme/colors';
import { spacing } from '../../theme/spacing';

const mockActivities = [
  { id: '1', text: 'You added "Dinner at Joe\'s"', time: '2 hours ago', icon: '🍔' },
  { id: '2', text: 'Sarah settled up $25.00', time: 'Yesterday', icon: '✅' },
  { id: '3', text: 'You joined group "Goa Trip"', time: '3 days ago', icon: '🏖️' },
];

export const ActivityScreen = () => {
  return (
    <View style={styles.container}>
      <Header title="Recent Activity" />
      <FlatList
        data={mockActivities}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text style={styles.icon}>{item.icon}</Text>
            <View style={styles.textContainer}>
              <Text style={styles.activityText}>{item.text}</Text>
              <Text style={styles.timeText}>{item.time}</Text>
            </View>
          </View>
        )}
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  listContent: {
    padding: spacing.md,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    padding: spacing.md,
    borderRadius: spacing.borderRadius.md,
    marginBottom: spacing.xs,
    borderWidth: 1,
    borderColor: colors.border,
  },
  icon: {
    fontSize: 24,
    marginRight: spacing.md,
  },
  textContainer: {
    flex: 1,
  },
  activityText: {
    fontSize: 15,
    color: colors.text,
  },
  timeText: {
    fontSize: 12,
    color: colors.textSecondary,
    marginTop: 2,
  },
});

export default ActivityScreen;
