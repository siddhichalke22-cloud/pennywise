import React, { useState } from 'react';
import { View, Text, StyleSheet, Alert, StatusBar } from 'react-native';
import CustomButton from '../../components/common/CustomButton';
import CustomInput from '../../components/common/CustomInput';
import Header from '../../components/common/Header';
import colors from '../../theme/colors';
import spacing from '../../theme/spacing';
import typography from '../../theme/typography';
import { moderateScale } from '../../utils/responsive';

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
      <StatusBar barStyle="dark-content" backgroundColor={colors.white} />
      <Header
        title="Reset Password"
        showBack
        onBack={() => navigation.goBack()}
      />
      <View style={styles.content}>
        {submitted ? (
          <View style={styles.successArea}>
            <View style={styles.successCircle}>
              <Text style={styles.successIcon}>✉️</Text>
            </View>
            <Text style={styles.successTitle}>Check your inbox</Text>
            <Text style={styles.successText}>
              We sent password reset instructions to {email}.
            </Text>
            <CustomButton
              title="Back to Sign In"
              variant="primary"
              size="lg"
              fullWidth
              onPress={() => navigation.navigate('Login')}
              style={{ marginTop: moderateScale(24) }}
            />
          </View>
        ) : (
          <View>
            <Text style={styles.infoText}>
              Enter the email address associated with your Pennywise account and
              we'll send you instructions to reset your password.
            </Text>
            <CustomInput
              label="Email Address"
              placeholder="e.g. alex@example.com"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
            />
            <CustomButton
              title="Send Reset Link"
              variant="primary"
              size="lg"
              fullWidth
              onPress={handleSubmit}
              style={{ marginTop: moderateScale(12) }}
            />
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
    padding: moderateScale(20),
  },
  infoText: {
    ...typography.body,
    color: colors.textSecondary,
    marginBottom: moderateScale(20),
    lineHeight: moderateScale(22),
  },
  successArea: {
    alignItems: 'center',
    paddingTop: moderateScale(40),
  },
  successCircle: {
    width: moderateScale(80),
    height: moderateScale(80),
    borderRadius: moderateScale(40),
    backgroundColor: colors.secondarySubtle,
    alignItems: 'center',
    justifyContent: 'center',
  },
  successIcon: {
    fontSize: moderateScale(36),
  },
  successTitle: {
    ...typography.h2,
    color: colors.text,
    marginTop: moderateScale(16),
  },
  successText: {
    ...typography.body,
    color: colors.textSecondary,
    textAlign: 'center',
    marginTop: moderateScale(6),
    lineHeight: moderateScale(20),
  },
});

export default ForgotPasswordScreen;
