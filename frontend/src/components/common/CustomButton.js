import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ActivityIndicator,
  View,
} from 'react-native';
import colors from '../../theme/colors';
import spacing from '../../theme/spacing';
import typography from '../../theme/typography';
import { moderateScale } from '../../utils/responsive';

/**
 * Reusable Fintech CustomButton
 * Supports variants: primary (deep purple), secondary (soft lavender),
 * outline (purple border), ghost (clean), danger (coral red), white (glass/card)
 */
export const CustomButton = ({
  title,
  onPress,
  variant = 'primary', // 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger' | 'white'
  size = 'md',        // 'sm' | 'md' | 'lg'
  icon,
  iconPosition = 'left',
  loading = false,
  disabled = false,
  fullWidth = false,
  style,
  textStyle,
}) => {
  const getBackgroundColor = () => {
    if (disabled) return colors.border;
    switch (variant) {
      case 'primary':
        return colors.primary;
      case 'secondary':
        return colors.secondarySubtle;
      case 'outline':
      case 'ghost':
        return 'transparent';
      case 'danger':
        return colors.danger;
      case 'white':
        return colors.white;
      default:
        return colors.primary;
    }
  };

  const getTextColor = () => {
    if (disabled) return colors.textMuted;
    switch (variant) {
      case 'primary':
        return colors.white;
      case 'secondary':
        return colors.primary;
      case 'outline':
      case 'ghost':
        return colors.primary;
      case 'danger':
        return colors.white;
      case 'white':
        return colors.primaryDark;
      default:
        return colors.white;
    }
  };

  const isOutline = variant === 'outline';

  return (
    <TouchableOpacity
      activeOpacity={0.82}
      onPress={onPress}
      disabled={disabled || loading}
      style={[
        styles.button,
        styles[size],
        { backgroundColor: getBackgroundColor() },
        isOutline && styles.outlineBorder,
        variant === 'primary' && !disabled && spacing.shadows.purpleGlow,
        fullWidth && styles.fullWidth,
        style,
      ]}
    >
      {loading ? (
        <ActivityIndicator size="small" color={getTextColor()} />
      ) : (
        <View style={styles.contentRow}>
          {icon && iconPosition === 'left' && (
            <View style={styles.iconLeft}>{icon}</View>
          )}
          <Text
            style={[
              styles.text,
              styles[`text_${size}`],
              { color: getTextColor() },
              textStyle,
            ]}
          >
            {title}
          </Text>
          {icon && iconPosition === 'right' && (
            <View style={styles.iconRight}>{icon}</View>
          )}
        </View>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: spacing.borderRadius.md,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  contentRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  sm: {
    paddingVertical: moderateScale(7),
    paddingHorizontal: moderateScale(14),
    borderRadius: spacing.borderRadius.sm,
  },
  md: {
    paddingVertical: moderateScale(12),
    paddingHorizontal: moderateScale(20),
    borderRadius: spacing.borderRadius.md,
    minHeight: moderateScale(48),
  },
  lg: {
    paddingVertical: moderateScale(15),
    paddingHorizontal: moderateScale(26),
    borderRadius: spacing.borderRadius.lg,
    minHeight: moderateScale(54),
  },
  outlineBorder: {
    borderWidth: 1.5,
    borderColor: colors.primary,
  },
  fullWidth: {
    width: '100%',
  },
  text: {
    ...typography.button,
    textAlign: 'center',
  },
  text_sm: {
    fontSize: moderateScale(13),
  },
  text_md: {
    fontSize: moderateScale(15),
  },
  text_lg: {
    fontSize: moderateScale(17),
    fontWeight: '700',
  },
  iconLeft: {
    marginRight: moderateScale(8),
  },
  iconRight: {
    marginLeft: moderateScale(8),
  },
});

export default CustomButton;
