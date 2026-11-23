import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  StatusBar,
} from 'react-native';
import colors from '../../theme/colors';
import spacing from '../../theme/spacing';
import typography from '../../theme/typography';
import { moderateScale } from '../../utils/responsive';
import CustomButton from '../../components/common/CustomButton';
import { useAuth } from '../../hooks/useAuth';

/**
 * Fintech Onboarding WelcomeScreen
 * Clean hero layout showcasing core value proposition:
 * - Roommates & friend group expense splitting
 * - Real-time simplified debts
 * - Instant settle up
 */
export const WelcomeScreen = ({ navigation }) => {
  const { loginDemo } = useAuth();

  const handleDemoAccess = async () => {
    try {
      await loginDemo();
    } catch (err) {
      navigation.navigate('Login');
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.background} />

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Top Brand Header */}
        <View style={styles.topBar}>
          <View style={styles.logoSmall}>
            <Text style={styles.logoIcon}>💰</Text>
          </View>
          <Text style={styles.brandName}>Pennywise</Text>
        </View>

        {/* Hero Card Visual Preview */}
        <View style={styles.heroCard}>
          <View style={styles.heroCardBadge}>
            <Text style={styles.heroCardBadgeText}>⚡ GROUP EXPENSE TRACKER</Text>
          </View>
          <Text style={styles.heroCardAmount}>+$345.50</Text>
          <Text style={styles.heroCardSub}>Net balance across 4 active groups</Text>

          {/* Mini Simulated Split Pill */}
          <View style={styles.splitSimulationRow}>
            <View style={styles.simPillLent}>
              <Text style={styles.simPillText}>↑ You are owed $520.00</Text>
            </View>
            <View style={styles.simPillOwe}>
              <Text style={styles.simPillText}>↓ You owe $174.50</Text>
            </View>
          </View>
        </View>

        {/* Value Proposition Section */}
        <View style={styles.headlineArea}>
          <Text style={styles.mainHeadline}>
            Split bills fairly.{'\n'}
            <Text style={styles.highlightText}>Zero awkwardness.</Text>
          </Text>
          <Text style={styles.subHeadline}>
            The intelligent expense manager designed for roommates, road trips,
            couples, and weekend hangouts.
          </Text>
        </View>

        {/* Feature Highlights with Soft Lavender Accents */}
        <View style={styles.featuresContainer}>
          <View style={styles.featureItem}>
            <View style={styles.featureIconBadge}>
              <Text style={styles.featureEmoji}>🤝</Text>
            </View>
            <View style={styles.featureTextWrapper}>
              <Text style={styles.featureTitle}>Flexible Bill Splits</Text>
              <Text style={styles.featureDesc}>
                Split equally, by exact dollars, or percentages with a tap.
              </Text>
            </View>
          </View>

          <View style={styles.featureItem}>
            <View style={styles.featureIconBadge}>
              <Text style={styles.featureEmoji}>✨</Text>
            </View>
            <View style={styles.featureTextWrapper}>
              <Text style={styles.featureTitle}>Smart Debt Simplifier</Text>
              <Text style={styles.featureDesc}>
                Reduces 10 complex transactions into the minimum payments needed.
              </Text>
            </View>
          </View>

          <View style={styles.featureItem}>
            <View style={styles.featureIconBadge}>
              <Text style={styles.featureEmoji}>🔒</Text>
            </View>
            <View style={styles.featureTextWrapper}>
              <Text style={styles.featureTitle}>Clear Settlement Records</Text>
              <Text style={styles.featureDesc}>
                Keep transparent audit trails of who paid what, when, and where.
              </Text>
            </View>
          </View>
        </View>

        {/* Call to Actions */}
        <View style={styles.actionSection}>
          <CustomButton
            title="Get Started Free"
            size="lg"
            variant="primary"
            fullWidth
            onPress={() => navigation.navigate('Register')}
            style={styles.primaryBtn}
          />

          <CustomButton
            title="I already have an account"
            size="md"
            variant="secondary"
            fullWidth
            onPress={() => navigation.navigate('Login')}
            style={styles.secondaryBtn}
          />

          {/* Quick Demo One-Tap Access */}
          <CustomButton
            title="⚡ Explore Live Demo Mode"
            size="sm"
            variant="ghost"
            fullWidth
            onPress={handleDemoAccess}
            textStyle={{ color: colors.primary, fontWeight: '700' }}
            style={{ marginTop: moderateScale(6) }}
          />
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollContent: {
    paddingHorizontal: moderateScale(20),
    paddingTop: moderateScale(48),
    paddingBottom: moderateScale(36),
  },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: moderateScale(20),
  },
  logoSmall: {
    width: moderateScale(36),
    height: moderateScale(36),
    borderRadius: spacing.borderRadius.sm,
    backgroundColor: colors.secondarySubtle,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: moderateScale(10),
  },
  logoIcon: {
    fontSize: moderateScale(20),
  },
  brandName: {
    ...typography.h3,
    color: colors.primaryDark,
    fontWeight: '800',
  },
  heroCard: {
    backgroundColor: colors.primaryDark,
    borderRadius: spacing.borderRadius.xl,
    padding: moderateScale(22),
    marginVertical: moderateScale(12),
    ...spacing.shadows.purpleGlow,
  },
  heroCardBadge: {
    alignSelf: 'flex-start',
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    paddingHorizontal: moderateScale(10),
    paddingVertical: moderateScale(3),
    borderRadius: spacing.borderRadius.xs,
    marginBottom: moderateScale(8),
  },
  heroCardBadgeText: {
    ...typography.caption,
    color: colors.secondarySoft,
    fontWeight: '700',
    fontSize: moderateScale(10),
    letterSpacing: 0.8,
  },
  heroCardAmount: {
    ...typography.displayBalance,
    color: colors.white,
    fontSize: moderateScale(32),
  },
  heroCardSub: {
    ...typography.caption,
    color: colors.secondarySoft,
    marginTop: moderateScale(2),
  },
  splitSimulationRow: {
    flexDirection: 'row',
    marginTop: moderateScale(14),
    gap: moderateScale(8),
  },
  simPillLent: {
    flex: 1,
    backgroundColor: 'rgba(16, 185, 129, 0.2)',
    paddingVertical: moderateScale(6),
    paddingHorizontal: moderateScale(10),
    borderRadius: spacing.borderRadius.sm,
    borderWidth: 1,
    borderColor: 'rgba(16, 185, 129, 0.4)',
  },
  simPillOwe: {
    flex: 1,
    backgroundColor: 'rgba(239, 68, 68, 0.2)',
    paddingVertical: moderateScale(6),
    paddingHorizontal: moderateScale(10),
    borderRadius: spacing.borderRadius.sm,
    borderWidth: 1,
    borderColor: 'rgba(239, 68, 68, 0.4)',
  },
  simPillText: {
    ...typography.caption,
    color: colors.white,
    fontWeight: '600',
    fontSize: moderateScale(11),
    textAlign: 'center',
  },
  headlineArea: {
    marginTop: moderateScale(16),
    marginBottom: moderateScale(18),
  },
  mainHeadline: {
    ...typography.h1,
    color: colors.text,
    fontSize: moderateScale(28),
    lineHeight: moderateScale(36),
  },
  highlightText: {
    color: colors.primary,
  },
  subHeadline: {
    ...typography.body,
    color: colors.textSecondary,
    marginTop: moderateScale(8),
    lineHeight: moderateScale(22),
  },
  featuresContainer: {
    marginVertical: moderateScale(8),
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    borderRadius: spacing.borderRadius.lg,
    padding: moderateScale(14),
    marginVertical: moderateScale(5),
    borderWidth: 1,
    borderColor: colors.borderLight,
    ...spacing.shadows.subtle,
  },
  featureIconBadge: {
    width: moderateScale(44),
    height: moderateScale(44),
    borderRadius: spacing.borderRadius.md,
    backgroundColor: colors.secondarySubtle,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: moderateScale(14),
  },
  featureEmoji: {
    fontSize: moderateScale(22),
  },
  featureTextWrapper: {
    flex: 1,
  },
  featureTitle: {
    ...typography.h4,
    color: colors.text,
    fontSize: moderateScale(15),
  },
  featureDesc: {
    ...typography.bodySmall,
    color: colors.textSecondary,
    marginTop: moderateScale(2),
  },
  actionSection: {
    marginTop: moderateScale(20),
  },
  primaryBtn: {
    marginBottom: moderateScale(10),
  },
  secondaryBtn: {
    marginBottom: moderateScale(4),
  },
});

export default WelcomeScreen;
