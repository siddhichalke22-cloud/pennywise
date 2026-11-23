import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Platform,
} from 'react-native';
import colors from '../../theme/colors';
import spacing from '../../theme/spacing';
import typography from '../../theme/typography';
import { moderateScale } from '../../utils/responsive';

/**
 * Reusable Fintech Header
 * Supports title, subtitle, rounded back button, custom right action element,
 * and transparent or solid styling.
 */
export const Header = ({
  title,
  subtitle,
  onBack,
  showBack = false,
  rightElement,
  rightAction, // alias for rightElement
  transparent = false,
  centerTitle = false,
  style,
}) => {
  const rightSlot = rightElement || rightAction;

  return (
    <View
      style={[
        styles.header,
        transparent ? styles.transparentHeader : styles.solidHeader,
        style,
      ]}
    >
      <View style={styles.leftContainer}>
        {showBack || onBack ? (
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={onBack}
            style={styles.backButton}
            hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
          >
            <Text style={styles.backArrow}>‹</Text>
          </TouchableOpacity>
        ) : null}

        <View style={[styles.titleWrapper, centerTitle && styles.centerTitleWrapper]}>
          {title ? (
            <Text
              style={[
                styles.title,
                centerTitle && { textAlign: 'center' },
              ]}
              numberOfLines={1}
            >
              {title}
            </Text>
          ) : null}
          {subtitle ? (
            <Text
              style={[
                styles.subtitle,
                centerTitle && { textAlign: 'center' },
              ]}
              numberOfLines={1}
            >
              {subtitle}
            </Text>
          ) : null}
        </View>
      </View>

      {rightSlot && (
        <View style={styles.rightContainer}>{rightSlot}</View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: moderateScale(16),
    paddingVertical: moderateScale(12),
    minHeight: moderateScale(56),
  },
  solidHeader: {
    backgroundColor: colors.white,
    borderBottomWidth: 1,
    borderBottomColor: colors.borderLight,
  },
  transparentHeader: {
    backgroundColor: 'transparent',
  },
  leftContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  backButton: {
    width: moderateScale(38),
    height: moderateScale(38),
    borderRadius: spacing.borderRadius.sm,
    backgroundColor: colors.secondarySubtle,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: moderateScale(12),
  },
  backArrow: {
    fontSize: moderateScale(26),
    color: colors.primary,
    fontWeight: '600',
    marginTop: Platform.OS === 'ios' ? -2 : -4,
  },
  titleWrapper: {
    flex: 1,
    justifyContent: 'center',
  },
  centerTitleWrapper: {
    alignItems: 'center',
  },
  title: {
    ...typography.h3,
    color: colors.text,
  },
  subtitle: {
    ...typography.caption,
    color: colors.textSecondary,
    marginTop: moderateScale(1),
  },
  rightContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: moderateScale(12),
  },
});

export default Header;
