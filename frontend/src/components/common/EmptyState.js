import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import colors from '../../theme/colors';
import spacing from '../../theme/spacing';
import typography from '../../theme/typography';
import { moderateScale } from '../../utils/responsive';
import CustomButton from './CustomButton';

/**
 * Reusable Fintech EmptyState
 * Displays a soft lavender illustration container, title, description,
 * and optional call-to-action button.
 */
export const EmptyState = ({
  icon = '🧾',
  title = 'No Expenses Found',
  description = 'You are all settled up! Start tracking expenses by creating a new group or logging a bill.',
  actionTitle,
  onAction,
  style,
}) => {
  return (
    <View style={[styles.container, style]}>
      <View style={styles.iconCircle}>
        {typeof icon === 'string' ? (
          <Text style={styles.iconEmoji}>{icon}</Text>
        ) : (
          icon
        )}
      </View>

      <Text style={styles.title}>{title}</Text>
      <Text style={styles.description}>{description}</Text>

      {actionTitle && onAction && (
        <CustomButton
          title={actionTitle}
          onPress={onAction}
          variant="secondary"
          size="md"
          style={styles.actionButton}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: moderateScale(24),
    paddingVertical: moderateScale(36),
    borderRadius: spacing.borderRadius.lg,
    backgroundColor: colors.white,
    marginVertical: moderateScale(12),
    borderWidth: 1,
    borderColor: colors.borderLight,
    ...spacing.shadows.subtle,
  },
  iconCircle: {
    width: moderateScale(72),
    height: moderateScale(72),
    borderRadius: moderateScale(36),
    backgroundColor: colors.secondarySubtle,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: moderateScale(16),
    borderWidth: 1,
    borderColor: colors.secondarySoft,
  },
  iconEmoji: {
    fontSize: moderateScale(32),
  },
  title: {
    ...typography.h3,
    color: colors.text,
    textAlign: 'center',
    marginBottom: moderateScale(6),
  },
  description: {
    ...typography.body,
    color: colors.textSecondary,
    textAlign: 'center',
    lineHeight: moderateScale(20),
    maxWidth: moderateScale(280),
  },
  actionButton: {
    marginTop: moderateScale(18),
  },
});

export default EmptyState;
