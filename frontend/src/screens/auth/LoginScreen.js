import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
  StatusBar,
} from 'react-native';
import colors from '../../theme/colors';
import spacing from '../../theme/spacing';
import typography from '../../theme/typography';
import { moderateScale } from '../../utils/responsive';
import CustomButton from '../../components/common/CustomButton';
import CustomInput from '../../components/common/CustomInput';
import Header from '../../components/common/Header';
import { useAuth } from '../../hooks/useAuth';

/**
 * Fintech Branded LoginScreen
 * Supports Email/Password, toggleable password visibility,
 * and a 1-tap "Demo User" shortcut for instant testing.
 */
export const LoginScreen = ({ navigation }) => {
  const { login, loginDemo } = useAuth();
  const [email, setEmail] = useState('alex.rivera@pennywise.app');
  const [password, setPassword] = useState('password123');
  const [loading, setLoading] = useState(false);
  const [demoLoading, setDemoLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Validation Error', 'Please enter your email and password.');
      return;
    }

    try {
      setLoading(true);
      await login(email, password);
    } catch (err) {
      Alert.alert('Login Error', err.message || 'Failed to authenticate');
    } finally {
      setLoading(false);
    }
  };

  const handleQuickDemo = async () => {
    try {
      setDemoLoading(true);
      await loginDemo();
    } catch (err) {
      Alert.alert('Demo Error', err.message);
    } finally {
      setDemoLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.white} />

      <Header
        title=""
        showBack
        onBack={() => navigation.goBack()}
        transparent
      />

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Title Area */}
        <View style={styles.titleSection}>
          <View style={styles.badgePill}>
            <Text style={styles.badgeText}>SECURE ACCESS</Text>
          </View>
          <Text style={styles.title}>Welcome back 👋</Text>
          <Text style={styles.subtitle}>
            Enter your credentials to manage your shared balances and settle up.
          </Text>
        </View>

        {/* Input Form */}
        <View style={styles.formCard}>
          <CustomInput
            label="Email Address"
            placeholder="e.g. alex@example.com"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />

          <CustomInput
            label="Password"
            placeholder="Enter your password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />

          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => navigation.navigate('ForgotPassword')}
            style={styles.forgotBtn}
          >
            <Text style={styles.forgotText}>Forgot password?</Text>
          </TouchableOpacity>

          <CustomButton
            title="Sign In"
            size="lg"
            variant="primary"
            fullWidth
            loading={loading}
            onPress={handleLogin}
            style={styles.signInBtn}
          />

          {/* Quick Demo Mode Button */}
          <CustomButton
            title="⚡ Instant Demo Sign-In"
            size="md"
            variant="secondary"
            fullWidth
            loading={demoLoading}
            onPress={handleQuickDemo}
            style={styles.demoBtn}
          />
        </View>

        {/* Social / Alternative divider */}
        <View style={styles.dividerRow}>
          <View style={styles.dividerLine} />
          <Text style={styles.dividerText}>or continue with</Text>
          <View style={styles.dividerLine} />
        </View>

        <View style={styles.socialRow}>
          <TouchableOpacity
            style={styles.socialBtn}
            activeOpacity={0.8}
            onPress={() => handleQuickDemo()}
          >
            <Text style={styles.socialIcon}>🍏</Text>
            <Text style={styles.socialText}>Apple</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.socialBtn}
            activeOpacity={0.8}
            onPress={() => handleQuickDemo()}
          >
            <Text style={styles.socialIcon}>🌐</Text>
            <Text style={styles.socialText}>Google</Text>
          </TouchableOpacity>
        </View>

        {/* Bottom Switch Link */}
        <View style={styles.footerLinkRow}>
          <Text style={styles.footerPrompt}>Don't have an account? </Text>
          <TouchableOpacity onPress={() => navigation.navigate('Register')}>
            <Text style={styles.footerLink}>Create One</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  scrollContent: {
    paddingHorizontal: moderateScale(22),
    paddingBottom: moderateScale(36),
  },
  titleSection: {
    marginTop: moderateScale(8),
    marginBottom: moderateScale(24),
  },
  badgePill: {
    alignSelf: 'flex-start',
    backgroundColor: colors.secondarySubtle,
    borderRadius: spacing.borderRadius.xs,
    paddingHorizontal: moderateScale(10),
    paddingVertical: moderateScale(3),
    marginBottom: moderateScale(10),
  },
  badgeText: {
    ...typography.caption,
    color: colors.primaryDark,
    fontWeight: '700',
    letterSpacing: 0.6,
  },
  title: {
    ...typography.h1,
    color: colors.text,
    fontSize: moderateScale(30),
  },
  subtitle: {
    ...typography.body,
    color: colors.textSecondary,
    marginTop: moderateScale(6),
    lineHeight: moderateScale(22),
  },
  formCard: {
    backgroundColor: colors.white,
  },
  forgotBtn: {
    alignSelf: 'flex-end',
    marginBottom: moderateScale(20),
    marginTop: -moderateScale(6),
  },
  forgotText: {
    ...typography.bodySmallBold,
    color: colors.primary,
  },
  signInBtn: {
    marginBottom: moderateScale(10),
  },
  demoBtn: {
    marginBottom: moderateScale(10),
  },
  dividerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: moderateScale(20),
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: colors.borderLight,
  },
  dividerText: {
    ...typography.caption,
    color: colors.textMuted,
    marginHorizontal: moderateScale(12),
  },
  socialRow: {
    flexDirection: 'row',
    gap: moderateScale(12),
    marginBottom: moderateScale(24),
  },
  socialBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.background,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: spacing.borderRadius.md,
    paddingVertical: moderateScale(12),
  },
  socialIcon: {
    fontSize: moderateScale(18),
    marginRight: moderateScale(8),
  },
  socialText: {
    ...typography.buttonSmall,
    color: colors.text,
  },
  footerLinkRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: moderateScale(8),
  },
  footerPrompt: {
    ...typography.body,
    color: colors.textSecondary,
  },
  footerLink: {
    ...typography.bodyBold,
    color: colors.primary,
  },
});

export default LoginScreen;
