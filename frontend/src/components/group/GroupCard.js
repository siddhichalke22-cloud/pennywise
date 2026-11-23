import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { colors } from '../../theme/colors';
import { spacing } from '../../theme/spacing';
import Card from '../common/Card';

export const GroupCard = ({ group, onPress }) => {
  return (
    <Card onPress={onPress} style={styles.card}>
      <View style={styles.headerRow}>
        <View style={styles.titleArea}>
          <Text style={styles.name}>{group.name}</Text>
          <Text style={styles.category}>{group.category || 'General'}</Text>
        </View>
        <Text style={styles.memberCount}>
          👥 {group.members?.length || 0} members
        </Text>
      </View>
      {group.description ? (
        <Text style={styles.description} numberOfLines={2}>
          {group.description}
        </Text>
      ) : null}
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    marginBottom: spacing.sm,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  titleArea: {
    flex: 1,
  },
  name: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.text,
  },
  category: {
    fontSize: 12,
    color: colors.textSecondary,
    textTransform: 'capitalize',
    marginTop: 2,
  },
  memberCount: {
    fontSize: 13,
    color: colors.textSecondary,
    fontWeight: '500',
  },
  description: {
    fontSize: 14,
    color: colors.textSecondary,
    marginTop: spacing.sm,
  },
});

export default GroupCard;
