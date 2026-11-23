import { moderateScale } from '../utils/responsive';

/**
 * Consistent Fintech Typography Scale
 */
export const typography = {
  // Headings
  h1: {
    fontSize: moderateScale(30),
    fontWeight: '800',
    lineHeight: moderateScale(38),
    letterSpacing: -0.5,
  },
  h2: {
    fontSize: moderateScale(24),
    fontWeight: '700',
    lineHeight: moderateScale(30),
    letterSpacing: -0.3,
  },
  h3: {
    fontSize: moderateScale(20),
    fontWeight: '700',
    lineHeight: moderateScale(26),
    letterSpacing: -0.2,
  },
  h4: {
    fontSize: moderateScale(17),
    fontWeight: '600',
    lineHeight: moderateScale(22),
  },

  // Display (Large balances)
  displayBalance: {
    fontSize: moderateScale(34),
    fontWeight: '800',
    lineHeight: moderateScale(42),
    letterSpacing: -0.8,
  },
  displaySub: {
    fontSize: moderateScale(16),
    fontWeight: '600',
    lineHeight: moderateScale(20),
  },

  // Body text
  bodyLarge: {
    fontSize: moderateScale(16),
    fontWeight: '400',
    lineHeight: moderateScale(22),
  },
  body: {
    fontSize: moderateScale(14),
    fontWeight: '400',
    lineHeight: moderateScale(20),
  },
  bodyBold: {
    fontSize: moderateScale(14),
    fontWeight: '600',
    lineHeight: moderateScale(20),
  },
  bodySmall: {
    fontSize: moderateScale(12),
    fontWeight: '400',
    lineHeight: moderateScale(16),
  },
  bodySmallBold: {
    fontSize: moderateScale(12),
    fontWeight: '600',
    lineHeight: moderateScale(16),
  },

  // Interactive & UI
  button: {
    fontSize: moderateScale(15),
    fontWeight: '600',
    letterSpacing: 0.1,
  },
  buttonSmall: {
    fontSize: moderateScale(13),
    fontWeight: '600',
    letterSpacing: 0.1,
  },
  caption: {
    fontSize: moderateScale(11),
    fontWeight: '500',
    lineHeight: moderateScale(14),
  },
  label: {
    fontSize: moderateScale(13),
    fontWeight: '600',
    letterSpacing: 0.2,
  },
};

export default typography;
