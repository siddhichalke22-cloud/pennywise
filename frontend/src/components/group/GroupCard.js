import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import colors from '../../theme/colors';
import spacing from '../../theme/spacing';
import typography from '../../theme/typography';
import { moderateScale } from '../../utils/responsive';

/**
 * Reusable Fintech GroupCard
 * Rounded elevated card with emoji/icon badge in soft lavender,
 * member count, category label, and net balance status.
 */
export const GroupCard = ({ group, onPress, style }) => {
  if (!group) return null;

  const membersCount =
    group.membersCount ||
    (group.members ? group.members.length : 0);

  const emoji = group.emoji || '👥';
  const isOwed = group.userNetStatus === 'owed';
  const isOwe = group.userNetStatus === 'owe';

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={onPress}
      style={[styles.card, style]}
    >
      <View style={styles.topRow}>
        <View style={styles.leftInfo}>
          <View style={styles.emojiBadge}>
            <Text style={styles.emojiText}>{emoji}</Text>
          </View>
          <View style={styles.titleArea}>
            <Text style={styles.name} numberOfLines={1}>
              {group.name}
            </Text>
            <Text style={styles.category}>
              {group.category || 'Shared Expenses'}
            </Text>
          </View>
        </View>

        {group.userNetBalance !== undefined ? (
          <View
            style={[
              styles.balancePill,
              isOwed
                ? styles.balancePillOwed
                : isOwe
                ? styles.balancePillOwe
                : styles.balancePillSettled,
            ]}
          >
            <Text
              style={[
                styles.balanceText,
                isOwed
                  ? styles.balanceTextOwed
                  : isOwe
                  ? styles.balanceTextOwe
                  : styles.balanceTextSettled,
              ]}
            >
              {isOwed
                ? `+$${group.userNetBalance.toFixed(2)}`
                : isOwe
                ? `-$${group.userNetBalance.toFixed(2)}`
                : 'Settled'}
            </Text>
          </View>
        ) : null}
      </View>

      <View style={styles.divider} />

      <View style={styles.footerRow}>
        <Text style={styles.memberText}>
          👥 {membersCount} members
        </Text>
        {group.recentActivity ? (
          <Text style={styles.activityText} numberOfLines={1}>
            {group.recentActivity}
          </Text>
        ) : (
          <Text style={styles.tapToView}>Tap to view details →</Text>
        )}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.white,
    borderRadius: spacing.borderRadius.lg,
    padding: moderateScale(16),
    marginVertical: moderateScale(6),
    borderWidth: 1,
    borderColor: colors.borderLight,
    ...spacing.shadows.subtle,
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  leftInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  emojiBadge: {
    width: moderateScale(46),
    height: moderateScale(46),
    borderRadius: spacing.borderRadius.md,
    backgroundColor: colors.secondarySubtle,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: moderateScale(12),
  },
  emojiText: {
    fontSize: moderateScale(22),
  },
  titleArea: {
    flex: 1,
  },
  name: {
    ...typography.h4,
    color: colors.text,
    fontSize: moderateScale(16),
  },
  category: {
    ...typography.caption,
    color: colors.textSecondary,
    marginTop: moderateScale(2),
  },
  balancePill: {
    paddingVertical: moderateScale(5),
    paddingHorizontal: moderateScale(10),
    borderRadius: spacing.borderRadius.full,
  },
  balancePillOwed: {
    backgroundColor: colors.successSoft,
  },
  balancePillOwe: {
    backgroundColor: colors.dangerSoft,
  },
  balancePillSettled: {
    backgroundColor: colors.background,
  },
  balanceText: {
    ...typography.caption,
    fontWeight: '700',
  },
  balanceTextOwed: {
    color: colors.successDark,
  },
  balanceTextOwe: {
    color: colors.dangerDark,
  },
  balanceTextSettled: {
    color: colors.textMuted,
  },
  divider: {
    height: 1,
    backgroundColor: colors.borderLight,
    marginVertical: moderateScale(12),
  },
  footerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  memberText: {
    ...typography.caption,
    color: colors.textSecondary,
    fontWeight: '500',
  },
  activityText: {
    ...typography.caption,
    color: colors.primaryDark,
    flex: 1,
    textAlign: 'right',
    marginLeft: moderateScale(8),
    fontWeight: '500',
  },
  tapToView: {
    ...typography.caption,
    color: colors.primary,
    fontWeight: '600',
  },
});

export default GroupCard;
