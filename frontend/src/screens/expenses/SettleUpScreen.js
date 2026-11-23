import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Header } from '../../components/common/Header';
import { Button } from '../../components/common/Button';
import { colors } from '../../theme/colors';
import { spacing } from '../../theme/spacing';

export const SettleUpScreen = ({ route, navigation }) => {
  return (
    <View style={styles.container}>
      <Header title="Settle Up" onBack={() => navigation.goBack()} />
      <View style={styles.content}>
        <Text style={styles.title}>Record a Payment</Text>
        <Text style={styles.description}>
          Choose who paid whom to balance the group ledger.
        </Text>
        <Button
          title="Done"
          onPress={() => navigation.goBack()}
          style={{ marginTop: spacing.xl }}
        />
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
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.text,
  },
  description: {
    fontSize: 14,
    color: colors.textSecondary,
    textAlign: 'center',
    marginTop: spacing.sm,
  },
});

export default SettleUpScreen;
