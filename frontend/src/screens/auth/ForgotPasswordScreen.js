import React, { useState } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import { Button } from '../../components/common/Button';
import { Input } from '../../components/common/Input';
import { Header } from '../../components/common/Header';
import { colors } from '../../theme/colors';
import { spacing } from '../../theme/spacing';

export const ForgotPasswordScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    if (!email) {
      Alert.alert('Error', 'Please enter your email address');
      return;
    }
    setSubmitted(true);
  };

  return (
    <View style={styles.container}>
      <Header title="Reset Password" onBack={() => navigation.goBack()} />
      <View style={styles.content}>
        {submitted ? (
          <View style={styles.successArea}>
            <Text style={styles.successIcon}>✉️</Text>
            <Text style={styles.successTitle}>Check your inbox</Text>
            <Text style={styles.successText}>
              We sent password reset instructions to {email}.
            </Text>
            <Button
              title="Back to Login"
              onPress={() => navigation.navigate('Login')}
              style={{ marginTop: spacing.lg }}
            />
          </View>
        ) : (
          <View>
            <Text style={styles.infoText}>
              Enter the email associated with your account and we'll send a link to reset your password.
            </Text>
            <Input
              label="Email Address"
              placeholder="e.g. alex@example.com"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
            />
            <Button title="Send Reset Link" onPress={handleSubmit} />
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  content: {
    padding: spacing.lg,
  },
  infoText: {
    fontSize: 14,
    color: colors.textSecondary,
    marginBottom: spacing.lg,
    lineHeight: 20,
  },
  successArea: {
    alignItems: 'center',
    paddingTop: spacing.xxl,
  },
  successIcon: {
    fontSize: 50,
  },
  successTitle: {
    fontSize: 20,
    fontWeight: '700',
    marginTop: spacing.md,
  },
  successText: {
    fontSize: 14,
    color: colors.textSecondary,
    textAlign: 'center',
    marginTop: spacing.xs,
  },
});

export default ForgotPasswordScreen;
