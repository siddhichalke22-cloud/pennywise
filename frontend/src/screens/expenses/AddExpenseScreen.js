import React, { useState } from 'react';
import { View, StyleSheet, Alert, ScrollView } from 'react-native';
import { useExpenses } from '../../hooks/useExpenses';
import { Header } from '../../components/common/Header';
import { Input } from '../../components/common/Input';
import { Button } from '../../components/common/Button';
import { SplitSelector } from '../../components/expense/SplitSelector';
import { SPLIT_TYPES } from '../../utils/constants';
import { colors } from '../../theme/colors';
import { spacing } from '../../theme/spacing';

export const AddExpenseScreen = ({ route, navigation }) => {
  const { groupId } = route.params;
  const { addExpense } = useExpenses(groupId);

  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [splitType, setSplitType] = useState(SPLIT_TYPES.EQUAL);
  const [loading, setLoading] = useState(false);

  const handleSave = async () => {
    if (!description.trim() || !amount || isNaN(amount)) {
      Alert.alert('Error', 'Please provide a valid description and amount');
      return;
    }

    try {
      setLoading(true);
      await addExpense({
        description,
        amount: parseFloat(amount),
        splitType,
      });
      navigation.goBack();
    } catch (err) {
      Alert.alert('Error adding expense', err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Header title="Add an Expense" onBack={() => navigation.goBack()} />
      <ScrollView contentContainerStyle={styles.content}>
        <Input
          label="Expense Description"
          placeholder="e.g. Grocery run, Dinner"
          value={description}
          onChangeText={setDescription}
        />

        <Input
          label="Amount ($)"
          placeholder="0.00"
          value={amount}
          onChangeText={setAmount}
          keyboardType="decimal-pad"
        />

        <SplitSelector selectedType={splitType} onSelectType={setSplitType} />

        <Button
          title="Save Expense"
          onPress={handleSave}
          loading={loading}
          style={{ marginTop: spacing.lg }}
        />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  content: {
    padding: spacing.md,
  },
});

export default AddExpenseScreen;
