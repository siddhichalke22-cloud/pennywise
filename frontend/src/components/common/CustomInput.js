import React, { useState } from 'react';
import {
  View,
  TextInput,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import colors from '../../theme/colors';
import spacing from '../../theme/spacing';
import typography from '../../theme/typography';
import { moderateScale } from '../../utils/responsive';

/**
 * Reusable Fintech CustomInput
 * Features: Deep purple focus highlight, built-in password visibility toggle,
 * left & right icon support, error handling, clean rounded surfaces.
 */
export const CustomInput = ({
  label,
  value,
  onChangeText,
  placeholder,
  secureTextEntry = false,
  keyboardType = 'default',
  error,
  helperText,
  leftIcon,
  rightIcon,
  disabled = false,
  containerStyle,
  inputStyle,
  autoCapitalize = 'none',
  ...rest
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const isSecure = secureTextEntry && !isPasswordVisible;

  return (
    <View style={[styles.container, containerStyle]}>
      {label && <Text style={styles.label}>{label}</Text>}

      <View
        style={[
          styles.inputWrapper,
          isFocused && styles.focusedInputWrapper,
          error && styles.errorInputWrapper,
          disabled && styles.disabledInputWrapper,
        ]}
      >
        {leftIcon && <View style={styles.leftIconContainer}>{leftIcon}</View>}

        <TextInput
          style={[styles.input, inputStyle]}
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor={colors.textMuted}
          secureTextEntry={isSecure}
          keyboardType={keyboardType}
          autoCapitalize={autoCapitalize}
          editable={!disabled}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          {...rest}
        />

        {secureTextEntry ? (
          <TouchableOpacity
            style={styles.eyeButton}
            onPress={() => setIsPasswordVisible(!isPasswordVisible)}
            activeOpacity={0.7}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            <Text style={styles.eyeIconText}>
              {isPasswordVisible ? '👁️' : '🔒'}
            </Text>
          </TouchableOpacity>
        ) : rightIcon ? (
          <View style={styles.rightIconContainer}>{rightIcon}</View>
        ) : null}
      </View>

      {error ? (
        <Text style={styles.errorText}>⚠️ {error}</Text>
      ) : helperText ? (
        <Text style={styles.helperText}>{helperText}</Text>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: moderateScale(16),
    width: '100%',
  },
  label: {
    ...typography.label,
    color: colors.text,
    marginBottom: moderateScale(6),
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.background,
    borderRadius: spacing.borderRadius.md,
    borderWidth: 1.5,
    borderColor: colors.border,
    paddingHorizontal: moderateScale(14),
    minHeight: moderateScale(50),
    transition: 'all 0.2s ease',
  },
  focusedInputWrapper: {
    borderColor: colors.primary,
    backgroundColor: colors.white,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 2,
  },
  errorInputWrapper: {
    borderColor: colors.danger,
    backgroundColor: colors.dangerSoft,
  },
  disabledInputWrapper: {
    backgroundColor: colors.backgroundAlt,
    borderColor: colors.border,
    opacity: 0.6,
  },
  input: {
    flex: 1,
    height: '100%',
    color: colors.text,
    fontSize: moderateScale(15),
    fontWeight: '500',
    paddingVertical: moderateScale(10),
  },
  leftIconContainer: {
    marginRight: moderateScale(10),
    justifyContent: 'center',
    alignItems: 'center',
  },
  rightIconContainer: {
    marginLeft: moderateScale(8),
    justifyContent: 'center',
    alignItems: 'center',
  },
  eyeButton: {
    padding: moderateScale(4),
    justifyContent: 'center',
    alignItems: 'center',
  },
  eyeIconText: {
    fontSize: moderateScale(16),
  },
  errorText: {
    ...typography.caption,
    color: colors.dangerDark,
    marginTop: moderateScale(4),
    marginLeft: moderateScale(2),
  },
  helperText: {
    ...typography.caption,
    color: colors.textSecondary,
    marginTop: moderateScale(4),
    marginLeft: moderateScale(2),
  },
});

export default CustomInput;
