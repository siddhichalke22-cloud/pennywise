import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
  StatusBar,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import colors from '../../theme/colors';
import spacing from '../../theme/spacing';
import typography from '../../theme/typography';
import { moderateScale } from '../../utils/responsive';
import CustomButton from '../../components/common/CustomButton';
import CustomInput from '../../components/common/CustomInput';
import Header from '../../components/common/Header';
import { useAuth } from '../../hooks/useAuth';
import { validateRegistrationForm } from '../../utils/validators';

/**
 * Fintech RegisterScreen
 * Connects directly to backend POST /api/auth/register via Axios in AuthContext.
 * Features:
 * - Full name
 * - Email address
 * - Password (with visibility toggle)
 * - Confirm password (with visibility toggle)
 * - Register button with loading state
 * - Login navigation link
 * - Inline error banners & client-side pre-validation
 */
export const RegisterScreen = ({ navigation }) => {
  const { register } = useAuth();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [fieldErrors, setFieldErrors] = useState({});

  const handleRegister = async () => {
    // Reset previous errors
    setErrorMessage(null);
    setFieldErrors({});

    // 1. Client-side pre-validation
    const validation = validateRegistrationForm({
      name,
      email,
      password,
      confirmPassword,
    });

    if (!validation.isValid) {
      setErrorMessage(validation.error);
      return;
    }

    // 2. Submit to backend API via Axios
    try {
      setLoading(true);
      await register(name, email, password);
      // On success, AuthContext sets token/user, automatically transitioning to HomeScreen
    } catch (err) {
      console.error('[RegisterScreen] Registration error:', err);
      const serverMessage =
        err.message || 'Registration failed. Please try again.';
      setErrorMessage(serverMessage);

      // If server returned specific field errors (e.g. from express-validator)
      if (err.errors && Array.isArray(err.errors)) {
        const errorsByField = {};
        err.errors.forEach((e) => {
          if (e.path) errorsByField[e.path] = e.msg;
        });
        setFieldErrors(errorsByField);
      }

      Alert.alert('Registration Failed', serverMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.keyboardContainer}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
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
          keyboardShouldPersistTaps="handled"
        >
          {/* Header Title Section */}
          <View style={styles.titleSection}>
            <View style={styles.badgePill}>
              <Text style={styles.badgeText}>JOIN PENNYWISE</Text>
            </View>
            <Text style={styles.title}>Create your account 🚀</Text>
            <Text style={styles.subtitle}>
              Sign up to start splitting expenses fairly and settling balances
              with friends.
            </Text>
          </View>

          {/* Inline Error Banner */}
          {errorMessage ? (
            <View style={styles.errorBanner}>
              <Text style={styles.errorBannerIcon}>⚠️</Text>
              <Text style={styles.errorBannerText}>{errorMessage}</Text>
            </View>
          ) : null}

          {/* Registration Form Fields */}
          <View style={styles.formCard}>
            {/* 1. Full Name */}
            <CustomInput
              label="Full Name"
              placeholder="e.g. Jane Doe"
              value={name}
              onChangeText={(text) => {
                setName(text);
                if (fieldErrors.name) setFieldErrors({ ...fieldErrors, name: null });
              }}
              autoCapitalize="words"
              error={fieldErrors.name}
            />

            {/* 2. Email Address */}
            <CustomInput
              label="Email Address"
              placeholder="e.g. jane@example.com"
              value={email}
              onChangeText={(text) => {
                setEmail(text);
                if (fieldErrors.email) setFieldErrors({ ...fieldErrors, email: null });
              }}
              keyboardType="email-address"
              autoCapitalize="none"
              error={fieldErrors.email}
            />

            {/* 3. Password */}
            <CustomInput
              label="Password"
              placeholder="Minimum 6 characters"
              value={password}
              onChangeText={(text) => {
                setPassword(text);
                if (fieldErrors.password) setFieldErrors({ ...fieldErrors, password: null });
              }}
              secureTextEntry
              helperText="Must be at least 6 characters long"
              error={fieldErrors.password}
            />

            {/* 4. Confirm Password */}
            <CustomInput
              label="Confirm Password"
              placeholder="Re-enter your password"
              value={confirmPassword}
              onChangeText={(text) => {
                setConfirmPassword(text);
                if (fieldErrors.confirmPassword) {
                  setFieldErrors({ ...fieldErrors, confirmPassword: null });
                }
              }}
              secureTextEntry
              error={fieldErrors.confirmPassword}
            />

            {/* Security Notice */}
            <View style={styles.securityPill}>
              <Text style={styles.securityIcon}>🔒</Text>
              <Text style={styles.securityText}>
                Passwords are encrypted using bcrypt. Plain-text is never stored.
              </Text>
            </View>

            {/* Terms of Service */}
            <Text style={styles.termsText}>
              By creating an account, you agree to our{' '}
              <Text style={styles.termsLink}>Terms of Service</Text> and{' '}
              <Text style={styles.termsLink}>Privacy Policy</Text>.
            </Text>

            {/* 5. Register Button */}
            <CustomButton
              title="Create Account"
              size="lg"
              variant="primary"
              fullWidth
              loading={loading}
              disabled={loading}
              onPress={handleRegister}
              style={styles.registerBtn}
            />
          </View>

          {/* 6. Login Navigation Link */}
          <View style={styles.footerLinkRow}>
            <Text style={styles.footerPrompt}>Already have an account? </Text>
            <TouchableOpacity
              onPress={() => navigation.navigate('Login')}
              hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
            >
              <Text style={styles.footerLink}>Sign In</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  keyboardContainer: {
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  scrollContent: {
    paddingHorizontal: moderateScale(22),
    paddingBottom: moderateScale(40),
  },
  titleSection: {
    marginTop: moderateScale(6),
    marginBottom: moderateScale(18),
  },
  badgePill: {
    alignSelf: 'flex-start',
    backgroundColor: colors.secondarySubtle,
    borderRadius: spacing.borderRadius.xs,
    paddingHorizontal: moderateScale(10),
    paddingVertical: moderateScale(3),
    marginBottom: moderateScale(8),
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
    fontSize: moderateScale(28),
  },
  subtitle: {
    ...typography.body,
    color: colors.textSecondary,
    marginTop: moderateScale(6),
    lineHeight: moderateScale(22),
  },
  errorBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.dangerSoft,
    borderWidth: 1,
    borderColor: colors.dangerLight,
    borderRadius: spacing.borderRadius.md,
    paddingHorizontal: moderateScale(12),
    paddingVertical: moderateScale(10),
    marginBottom: moderateScale(16),
  },
  errorBannerIcon: {
    fontSize: moderateScale(16),
    marginRight: moderateScale(8),
  },
  errorBannerText: {
    ...typography.bodySmallBold,
    color: colors.dangerDark,
    flex: 1,
  },
  formCard: {
    backgroundColor: colors.white,
  },
  securityPill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.secondaryGhost,
    borderRadius: spacing.borderRadius.sm,
    paddingHorizontal: moderateScale(12),
    paddingVertical: moderateScale(8),
    marginVertical: moderateScale(8),
    borderWidth: 1,
    borderColor: colors.borderPurple,
  },
  securityIcon: {
    fontSize: moderateScale(14),
    marginRight: moderateScale(8),
  },
  securityText: {
    ...typography.caption,
    color: colors.primaryDark,
    flex: 1,
    lineHeight: moderateScale(16),
    fontWeight: '500',
  },
  termsText: {
    ...typography.caption,
    color: colors.textSecondary,
    lineHeight: moderateScale(18),
    marginVertical: moderateScale(10),
  },
  termsLink: {
    color: colors.primary,
    fontWeight: '600',
  },
  registerBtn: {
    marginTop: moderateScale(6),
    marginBottom: moderateScale(10),
  },
  footerLinkRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: moderateScale(16),
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

export default RegisterScreen;
