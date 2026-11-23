import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { colors } from '../../theme/colors';
import { spacing } from '../../theme/spacing';
import { SPLIT_TYPES } from '../../utils/constants';

export const SplitSelector = ({ selectedType, onSelectType }) => {
  const options = [
    { label: 'Equally (=)', value: SPLIT_TYPES.EQUAL },
    { label: 'Exact ($)', value: SPLIT_TYPES.EXACT },
    { label: 'Percent (%)', value: SPLIT_TYPES.PERCENTAGE },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Split Method</Text>
      <View style={styles.buttonRow}>
        {options.map((opt) => {
          const isSelected = selectedType === opt.value;
          return (
            <TouchableOpacity
              key={opt.value}
              style={[
                styles.optionButton,
                isSelected && styles.optionSelected,
              ]}
              onPress={() => onSelectType(opt.value)}
            >
              <Text
                style={[
                  styles.optionText,
                  isSelected && styles.optionTextSelected,
                ]}
              >
                {opt.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: spacing.sm,
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    color: colors.text,
    marginBottom: spacing.xs,
  },
  buttonRow: {
    flexDirection: 'row',
    backgroundColor: colors.inputBackground,
    borderRadius: spacing.borderRadius.md,
    padding: 3,
  },
  optionButton: {
    flex: 1,
    paddingVertical: spacing.sm,
    alignItems: 'center',
    borderRadius: spacing.borderRadius.sm,
  },
  optionSelected: {
    backgroundColor: colors.white,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  optionText: {
    fontSize: 13,
    color: colors.textSecondary,
    fontWeight: '500',
  },
  optionTextSelected: {
    color: colors.primaryDark,
    fontWeight: '700',
  },
});

export default SplitSelector;
