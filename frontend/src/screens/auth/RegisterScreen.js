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
 * Fintech Branded RegisterScreen
 * Full registration flow with name, email, password,
 * confirmation, and terms notice.
 */
export const RegisterScreen = ({ navigation }) => {
  const { register, loginDemo } = useAuth();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    if (!name.trim() || !email.trim() || !password) {
      Alert.alert('Validation Error', 'Please complete all required fields.');
      return;
    }

    if (password.length < 6) {
      Alert.alert(
        'Weak Password',
        'Password must be at least 6 characters long.'
      );
      return;
    }

    if (confirmPassword && password !== confirmPassword) {
      Alert.alert('Mismatch', 'Passwords do not match.');
      return;
    }

    try {
      setLoading(true);
      await register(name, email, password);
    } catch (err) {
      Alert.alert('Registration Failed', err.message);
    } finally {
      setLoading(false);
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
            <Text style={styles.badgeText}>GET STARTED</Text>
          </View>
          <Text style={styles.title}>Create your account 🚀</Text>
          <Text style={styles.subtitle}>
            Join Pennywise to effortlessly manage group expenses and settle debts.
          </Text>
        </View>

        {/* Input Form */}
        <View style={styles.formCard}>
          <CustomInput
            label="Full Name"
            placeholder="e.g. Alex Rivera"
            value={name}
            onChangeText={setName}
            autoCapitalize="words"
          />

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
            placeholder="At least 6 characters"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            helperText="Must be minimum 6 characters long"
          />

          <CustomInput
            label="Confirm Password"
            placeholder="Re-enter password"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry
          />

          {/* Terms Notice */}
          <Text style={styles.termsText}>
            By creating an account, you agree to the{' '}
            <Text style={styles.termsLink}>Terms of Service</Text> and{' '}
            <Text style={styles.termsLink}>Privacy Policy</Text>.
          </Text>

          <CustomButton
            title="Create Account"
            size="lg"
            variant="primary"
            fullWidth
            loading={loading}
            onPress={handleRegister}
            style={styles.registerBtn}
          />

          {/* Demo shortcut */}
          <CustomButton
            title="⚡ Fill with Demo User"
            size="md"
            variant="secondary"
            fullWidth
            onPress={() => {
              setName('Alex Rivera');
              setEmail('alex.rivera@pennywise.app');
              setPassword('password123');
              setConfirmPassword('password123');
            }}
            style={styles.demoFillBtn}
          />
        </View>

        {/* Bottom Switch Link */}
        <View style={styles.footerLinkRow}>
          <Text style={styles.footerPrompt}>Already have an account? </Text>
          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <Text style={styles.footerLink}>Sign In</Text>
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
    marginBottom: moderateScale(20),
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
    fontSize: moderateScale(28),
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
  termsText: {
    ...typography.caption,
    color: colors.textSecondary,
    lineHeight: moderateScale(18),
    marginVertical: moderateScale(12),
  },
  termsLink: {
    color: colors.primary,
    fontWeight: '600',
  },
  registerBtn: {
    marginBottom: moderateScale(10),
  },
  demoFillBtn: {
    marginBottom: moderateScale(10),
  },
  footerLinkRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: moderateScale(12),
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
