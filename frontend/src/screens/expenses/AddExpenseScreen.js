import React, { useState } from 'react';
import { View, StyleSheet, Alert, ScrollView, StatusBar, Text } from 'react-native';
import Header from '../../components/common/Header';
import CustomInput from '../../components/common/CustomInput';
import CustomButton from '../../components/common/CustomButton';
import SplitSelector from '../../components/expense/SplitSelector';
import { SPLIT_TYPES } from '../../utils/constants';
import colors from '../../theme/colors';
import spacing from '../../theme/spacing';
import typography from '../../theme/typography';
import { moderateScale } from '../../utils/responsive';

export const AddExpenseScreen = ({ route, navigation }) => {
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [splitType, setSplitType] = useState(SPLIT_TYPES.EQUAL);
  const [loading, setLoading] = useState(false);

  const handleSave = () => {
    if (!description.trim() || !amount || isNaN(amount)) {
      Alert.alert('Validation Error', 'Please enter a description and valid dollar amount.');
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      Alert.alert(
        'Expense Saved! 🎉',
        `"${description}" for $${parseFloat(amount).toFixed(2)} was split equally.`,
        [{ text: 'OK', onPress: () => navigation.goBack() }]
      );
    }, 600);
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.white} />
      <Header
        title="Add Expense"
        subtitle="Log bill & assign shares"
        showBack
        onBack={() => navigation.goBack()}
      />

      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.formCard}>
          <CustomInput
            label="What was this expense for?"
            placeholder="e.g. Dinner at Nobu, Airbnb, Groceries"
            value={description}
            onChangeText={setDescription}
          />

          <CustomInput
            label="Total Amount ($)"
            placeholder="0.00"
            value={amount}
            onChangeText={setAmount}
            keyboardType="decimal-pad"
          />

          <View style={styles.payerBox}>
            <Text style={styles.payerLabel}>Paid by</Text>
            <View style={styles.payerPill}>
              <Text style={styles.payerText}>Alex Rivera (You)</Text>
            </View>
          </View>

          <SplitSelector selectedType={splitType} onSelectType={setSplitType} />

          <CustomButton
            title="Save Expense"
            size="lg"
            variant="primary"
            fullWidth
            loading={loading}
            onPress={handleSave}
            style={styles.saveBtn}
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
  formCard: {
    backgroundColor: colors.white,
    borderRadius: spacing.borderRadius.xl,
    padding: moderateScale(20),
    borderWidth: 1,
    borderColor: colors.borderLight,
    ...spacing.shadows.subtle,
  },
  payerBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: colors.background,
    borderRadius: spacing.borderRadius.md,
    padding: moderateScale(12),
    marginBottom: moderateScale(16),
  },
  payerLabel: {
    ...typography.body,
    color: colors.textSecondary,
  },
  payerPill: {
    backgroundColor: colors.secondarySubtle,
    borderRadius: spacing.borderRadius.full,
    paddingHorizontal: moderateScale(12),
    paddingVertical: moderateScale(4),
  },
  payerText: {
    ...typography.caption,
    color: colors.primaryDark,
    fontWeight: '700',
  },
  saveBtn: {
    marginTop: moderateScale(24),
  },
});

export default AddExpenseScreen;
