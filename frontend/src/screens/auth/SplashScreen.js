import React, { useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  StatusBar,
} from 'react-native';
import colors from '../../theme/colors';
import spacing from '../../theme/spacing';
import typography from '../../theme/typography';
import { moderateScale } from '../../utils/responsive';
import CustomButton from '../../components/common/CustomButton';

/**
 * Fintech Branded SplashScreen
 * Deep purple background with soft lavender glowing circles,
 * clean brand mark, slogan, and smooth transition to Welcome.
 */
export const SplashScreen = ({ navigation }) => {
  useEffect(() => {
    // Auto-advance to Welcome screen after brief branded preview
    const timer = setTimeout(() => {
      navigation.replace('Welcome');
    }, 1800);

    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={colors.primaryDark} />

      {/* Decorative Gradient-like Glow Circles */}
      <View style={styles.glowCircleLarge} />
      <View style={styles.glowCircleSmall} />

      {/* Branded Center Icon & Title */}
      <View style={styles.content}>
        <View style={styles.logoContainer}>
          <Text style={styles.logoIcon}>💰</Text>
        </View>

        <Text style={styles.brandTitle}>Pennywise</Text>
        <View style={styles.taglinePill}>
          <Text style={styles.taglineText}>Smart Shared Expenses</Text>
        </View>
      </View>

      {/* Bottom Loading / Quick Continue */}
      <View style={styles.footer}>
        <ActivityIndicator size="small" color={colors.secondarySoft} />
        <Text style={styles.loadingText}>Initializing your wallet...</Text>

        <CustomButton
          title="Skip to Welcome →"
          variant="ghost"
          size="sm"
          onPress={() => navigation.replace('Welcome')}
          textStyle={{ color: colors.secondarySoft }}
          style={{ marginTop: moderateScale(10) }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primaryDark,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: moderateScale(50),
    paddingHorizontal: moderateScale(24),
    position: 'relative',
    overflow: 'hidden',
  },
  glowCircleLarge: {
    position: 'absolute',
    top: -moderateScale(80),
    right: -moderateScale(60),
    width: moderateScale(280),
    height: moderateScale(280),
    borderRadius: moderateScale(140),
    backgroundColor: colors.primaryLight,
    opacity: 0.15,
  },
  glowCircleSmall: {
    position: 'absolute',
    bottom: -moderateScale(40),
    left: -moderateScale(40),
    width: moderateScale(220),
    height: moderateScale(220),
    borderRadius: moderateScale(110),
    backgroundColor: colors.secondary,
    opacity: 0.12,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoContainer: {
    width: moderateScale(96),
    height: moderateScale(96),
    borderRadius: spacing.borderRadius.xl,
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    borderWidth: 1.5,
    borderColor: 'rgba(255, 255, 255, 0.3)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: moderateScale(18),
    ...spacing.shadows.purpleGlow,
  },
  logoIcon: {
    fontSize: moderateScale(48),
  },
  brandTitle: {
    ...typography.h1,
    color: colors.white,
    fontSize: moderateScale(36),
    fontWeight: '800',
    letterSpacing: -0.5,
  },
  taglinePill: {
    backgroundColor: colors.secondarySubtle,
    borderRadius: spacing.borderRadius.full,
    paddingHorizontal: moderateScale(14),
    paddingVertical: moderateScale(4),
    marginTop: moderateScale(10),
  },
  taglineText: {
    ...typography.caption,
    color: colors.primaryDark,
    fontWeight: '700',
    letterSpacing: 0.5,
    textTransform: 'uppercase',
  },
  footer: {
    alignItems: 'center',
  },
  loadingText: {
    ...typography.caption,
    color: colors.secondarySoft,
    marginTop: moderateScale(8),
    fontWeight: '500',
  },
});

export default SplashScreen;
