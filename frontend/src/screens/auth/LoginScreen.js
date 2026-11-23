import React, { useState } from 'react';
import { View, Text, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import { useAuth } from '../../hooks/useAuth';
import { Button } from '../../components/common/Button';
import { Input } from '../../components/common/Input';
import { colors } from '../../theme/colors';
import { spacing } from '../../theme/spacing';

export const LoginScreen = ({ navigation }) => {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Validation Error', 'Please enter both email and password');
      return;
    }

    try {
      setLoading(true);
      await login(email, password);
    } catch (err) {
      Alert.alert('Login Failed', err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerArea}>
        <Text style={styles.logo}>Pennywise</Text>
        <Text style={styles.subtitle}>Split expenses easily with friends</Text>
      </View>

      <View style={styles.formArea}>
        <Input
          label="Email Address"
          placeholder="e.g. alex@example.com"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
        />

        <Input
          label="Password"
          placeholder="••••••••"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />

        <Button
          title="Sign In"
          onPress={handleLogin}
          loading={loading}
          style={styles.signInButton}
        />

        <TouchableOpacity
          onPress={() => navigation.navigate('ForgotPassword')}
          style={styles.forgotButton}
        >
          <Text style={styles.forgotText}>Forgot password?</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.footer}>
        <Text style={styles.footerText}>Don't have an account? </Text>
        <TouchableOpacity onPress={() => navigation.navigate('Register')}>
          <Text style={styles.registerLink}>Sign Up</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    paddingHorizontal: spacing.lg,
    justifyContent: 'center',
  },
  headerArea: {
    alignItems: 'center',
    marginBottom: spacing.xl,
  },
  logo: {
    fontSize: 36,
    fontWeight: '800',
    color: colors.primary,
  },
  subtitle: {
    fontSize: 15,
    color: colors.textSecondary,
    marginTop: spacing.xs,
  },
  formArea: {
    width: '100%',
  },
  signInButton: {
    marginTop: spacing.sm,
  },
  forgotButton: {
    alignItems: 'center',
    marginTop: spacing.md,
  },
  forgotText: {
    color: colors.textSecondary,
    fontSize: 14,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: spacing.xl,
  },
  footerText: {
    color: colors.textSecondary,
  },
  registerLink: {
    color: colors.primary,
    fontWeight: '700',
  },
});

export default LoginScreen;
