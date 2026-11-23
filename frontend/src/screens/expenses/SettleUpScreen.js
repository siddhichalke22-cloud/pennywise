import React, { useState } from 'react';
import { View, Text, StyleSheet, Alert, StatusBar, ScrollView } from 'react-native';
import Header from '../../components/common/Header';
import CustomButton from '../../components/common/CustomButton';
import Avatar from '../../components/common/Avatar';
import colors from '../../theme/colors';
import spacing from '../../theme/spacing';
import typography from '../../theme/typography';
import { moderateScale } from '../../utils/responsive';

export const SettleUpScreen = ({ navigation }) => {
  const [selectedUser, setSelectedUser] = useState('Sarah Jenkins');
  const [settled, setSettled] = useState(false);

  const handleSettle = () => {
    Alert.alert(
      'Payment Recorded',
      `You successfully recorded a settlement of $45.00 with ${selectedUser}.`,
      [{ text: 'Great!', onPress: () => navigation.goBack() }]
    );
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.white} />
      <Header
        title="Settle Up"
        subtitle="Record debt payments"
        showBack
        onBack={() => navigation.goBack()}
      />

      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.card}>
          <Text style={styles.title}>Who are you settling with?</Text>

          <View style={styles.settleRow}>
            <View style={styles.userBox}>
              <Avatar name="Alex Rivera" size={moderateScale(56)} />
              <Text style={styles.userName}>You</Text>
            </View>

            <View style={styles.arrowCircle}>
              <Text style={styles.arrowEmoji}>➔</Text>
            </View>

            <View style={styles.userBox}>
              <Avatar name={selectedUser} size={moderateScale(56)} />
              <Text style={styles.userName}>{selectedUser}</Text>
            </View>
          </View>

          <View style={styles.amountPill}>
            <Text style={styles.amountLabel}>Total to Settle</Text>
            <Text style={styles.amountValue}>$45.00</Text>
          </View>

          <CustomButton
            title={`Record Payment to ${selectedUser.split(' ')[0]}`}
            size="lg"
            variant="primary"
            fullWidth
            onPress={handleSettle}
            style={styles.settleBtn}
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
  content: {
    padding: moderateScale(16),
  },
  card: {
    backgroundColor: colors.white,
    borderRadius: spacing.borderRadius.xl,
    padding: moderateScale(22),
    borderWidth: 1,
    borderColor: colors.borderLight,
    ...spacing.shadows.subtle,
  },
  title: {
    ...typography.h3,
    color: colors.text,
    textAlign: 'center',
    marginBottom: moderateScale(20),
  },
  settleRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginBottom: moderateScale(24),
  },
  userBox: {
    alignItems: 'center',
  },
  userName: {
    ...typography.bodyBold,
    color: colors.text,
    marginTop: moderateScale(8),
  },
  arrowCircle: {
    width: moderateScale(42),
    height: moderateScale(42),
    borderRadius: moderateScale(21),
    backgroundColor: colors.secondarySubtle,
    alignItems: 'center',
    justifyContent: 'center',
  },
  arrowEmoji: {
    fontSize: moderateScale(18),
    color: colors.primary,
  },
  amountPill: {
    backgroundColor: colors.background,
    borderRadius: spacing.borderRadius.lg,
    padding: moderateScale(16),
    alignItems: 'center',
    marginBottom: moderateScale(20),
  },
  amountLabel: {
    ...typography.caption,
    color: colors.textSecondary,
    textTransform: 'uppercase',
  },
  amountValue: {
    ...typography.displayBalance,
    color: colors.primaryDark,
    marginTop: moderateScale(4),
  },
  settleBtn: {
    marginTop: moderateScale(8),
  },
});

export default SettleUpScreen;
