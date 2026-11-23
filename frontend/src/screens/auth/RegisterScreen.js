import React, { useState } from 'react';
import { View, Text, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import { useAuth } from '../../hooks/useAuth';
import { Button } from '../../components/common/Button';
import { Input } from '../../components/common/Input';
import { colors } from '../../theme/colors';
import { spacing } from '../../theme/spacing';

export const RegisterScreen = ({ navigation }) => {
  const { register } = useAuth();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    if (!name || !email || !password) {
      Alert.alert('Validation Error', 'Please fill in all fields');
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
      <View style={styles.headerArea}>
        <Text style={styles.title}>Create Account</Text>
        <Text style={styles.subtitle}>Join Pennywise to manage group bills</Text>
      </View>

      <View style={styles.formArea}>
        <Input
          label="Full Name"
          placeholder="e.g. Jane Doe"
          value={name}
          onChangeText={setName}
        />

        <Input
          label="Email Address"
          placeholder="e.g. jane@example.com"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
        />

        <Input
          label="Password (min 6 characters)"
          placeholder="••••••••"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />

        <Button
          title="Create Account"
          onPress={handleRegister}
          loading={loading}
          style={styles.button}
        />
      </View>

      <View style={styles.footer}>
        <Text style={styles.footerText}>Already have an account? </Text>
        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <Text style={styles.loginLink}>Sign In</Text>
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
    marginBottom: spacing.xl,
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    color: colors.text,
  },
  subtitle: {
    fontSize: 15,
    color: colors.textSecondary,
    marginTop: spacing.xs,
  },
  formArea: {
    width: '100%',
  },
  button: {
    marginTop: spacing.sm,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: spacing.xl,
  },
  footerText: {
    color: colors.textSecondary,
  },
  loginLink: {
    color: colors.primary,
    fontWeight: '700',
  },
});

export default RegisterScreen;
