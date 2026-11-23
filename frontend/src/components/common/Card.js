import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { colors } from '../../theme/colors';
import { spacing } from '../../theme/spacing';

export const Card = ({ children, onPress, style }) => {
  const Component = onPress ? TouchableOpacity : View;

  return (
    <Component
      activeOpacity={0.85}
      onPress={onPress}
      style={[styles.card, style]}
    >
      {children}
    </Component>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.card,
    borderRadius: spacing.borderRadius.lg,
    padding: spacing.md,
    marginVertical: spacing.xs,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
    borderWidth: 1,
    borderColor: colors.border,
  },
});

export default Card;
