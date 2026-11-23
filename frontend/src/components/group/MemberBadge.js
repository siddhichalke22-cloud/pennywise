import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors } from '../../theme/colors';
import { spacing } from '../../theme/spacing';
import Avatar from '../common/Avatar';

export const MemberBadge = ({ member, role }) => {
  return (
    <View style={styles.badge}>
      <Avatar name={member?.name || 'User'} size={28} />
      <Text style={styles.name} numberOfLines={1}>
        {member?.name || 'Member'}
      </Text>
      {role === 'admin' && (
        <View style={styles.roleTag}>
          <Text style={styles.roleText}>Admin</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.inputBackground,
    paddingVertical: spacing.xs,
    paddingHorizontal: spacing.sm,
    borderRadius: spacing.borderRadius.full,
    marginRight: spacing.xs,
    marginBottom: spacing.xs,
  },
  name: {
    fontSize: 13,
    color: colors.text,
    marginLeft: spacing.xs,
    fontWeight: '500',
  },
  roleTag: {
    marginLeft: spacing.xs,
    backgroundColor: colors.primaryLight,
    borderRadius: spacing.borderRadius.sm,
    paddingHorizontal: 4,
    paddingVertical: 1,
  },
  roleText: {
    fontSize: 10,
    color: colors.primaryDark,
    fontWeight: '600',
  },
});

export default MemberBadge;
