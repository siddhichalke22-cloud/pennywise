import { moderateScale } from '../utils/responsive';
import colors from './colors';

/**
 * Spacing, Border Radiuses, and Fintech Elevation Shadows
 */
export const spacing = {
  // Spacing Scale
  xxs: moderateScale(2),
  xs: moderateScale(4),
  sm: moderateScale(8),
  md: moderateScale(16),
  lg: moderateScale(24),
  xl: moderateScale(32),
  xxl: moderateScale(40),

  // Rounded Radiuses
  borderRadius: {
    xs: 6,
    sm: 10,
    md: 14,       // Standard button & input radius
    lg: 20,       // Standard card radius
    xl: 26,       // Hero cards, BalanceCard
    full: 9999,   // Pill buttons, avatars, filter badges
  },

  // Shadows
  shadows: {
    subtle: {
      shadowColor: colors.shadowColor,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.04,
      shadowRadius: 6,
      elevation: 2,
    },
    card: {
      shadowColor: colors.shadowColor,
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.07,
      shadowRadius: 12,
      elevation: 3,
    },
    elevated: {
      shadowColor: colors.shadowColor,
      shadowOffset: { width: 0, height: 8 },
      shadowOpacity: 0.12,
      shadowRadius: 20,
      elevation: 6,
    },
    purpleGlow: {
      shadowColor: colors.primary,
      shadowOffset: { width: 0, height: 6 },
      shadowOpacity: 0.25,
      shadowRadius: 14,
      elevation: 6,
    },
  },
};

export default spacing;
