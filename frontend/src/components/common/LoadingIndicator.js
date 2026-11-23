import React from 'react';
import { View, ActivityIndicator, StyleSheet, Text } from 'react-native';
import colors from '../../theme/colors';
import spacing from '../../theme/spacing';
import typography from '../../theme/typography';
import { moderateScale } from '../../utils/responsive';

/**
 * Reusable Fintech LoadingIndicator
 */
export const LoadingIndicator = ({
  text = 'Loading Pennywise...',
  size = 'large',
  fullScreen = false,
  color = colors.primary,
  style,
}) => {
  return (
    <View style={[styles.container, fullScreen && styles.fullScreen, style]}>
      <View style={styles.circleBg}>
        <ActivityIndicator size={size} color={color} />
      </View>
      {text ? <Text style={styles.text}>{text}</Text> : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: moderateScale(24),
  },
  fullScreen: {
    flex: 1,
    backgroundColor: colors.background,
  },
  circleBg: {
    width: moderateScale(60),
    height: moderateScale(60),
    borderRadius: moderateScale(30),
    backgroundColor: colors.secondarySubtle,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: moderateScale(12),
  },
  text: {
    ...typography.bodySmallBold,
    color: colors.primaryDark,
    textAlign: 'center',
  },
});

export default LoadingIndicator;
