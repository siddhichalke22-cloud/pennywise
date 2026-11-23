/**
 * Pennywise Fintech Design System Color Palette
 * Primary: Deep Purple
 * Secondary: Soft Lavender
 * Background: White & Light Grey
 */
export const colors = {
  // Primary - Deep Purple
  primary: '#5B21B6',        // Deep Royal Purple (Main brand)
  primaryDark: '#4C1D95',    // Deeper Rich Purple (Headings, balance cards)
  primaryDarker: '#2E1065',  // Midnight Purple (High contrast text, dark cards)
  primaryLight: '#7C3AED',   // Vibrant Purple (Interactive accents)
  primaryLighter: '#8B5CF6', // Electric Purple (Gradients & active indicators)

  // Secondary - Soft Lavender
  secondary: '#A78BFA',      // Lavender Purple
  secondaryLight: '#C4B5FD', // Soft Lavender
  secondarySoft: '#DDD6FE',  // Muted Lavender (Icon containers, subtle borders)
  secondarySubtle: '#EDE9FE',// Very Soft Lavender (Pill backgrounds, hover states)
  secondaryGhost: '#F5F3FF', // Ultra Light Lavender (Subtle card backdrops)

  // Backgrounds & Surfaces
  white: '#FFFFFF',
  background: '#F8F9FA',     // Soft fintech light grey background
  backgroundAlt: '#F3F4F6',  // Slightly deeper grey for input wrappers & tabs
  surface: '#FFFFFF',        // Pure white card background
  surfaceElevated: '#FFFFFF',// Elevated card surface

  // Neutrals & Typography
  text: '#1E1B4B',           // Deep Navy-Purple for high legibility
  textSecondary: '#6B7280',  // Muted Slate Grey for labels & metadata
  textMuted: '#9CA3AF',      // Light Slate Grey for placeholders & inactive icons
  border: '#E5E7EB',         // Crisp neutral border
  borderLight: '#F3F4F6',    // Soft border for inner card dividers
  borderPurple: '#E9D5FF',   // Lavender-tinted accent border

  // Fintech Accents (Splitwise-style Indicators)
  success: '#10B981',        // Emerald Green (You are owed / Paid)
  successDark: '#059669',    // Deep Emerald
  successLight: '#D1FAE5',   // Soft Green badge background
  successSoft: '#ECFDF5',    // Light Green card tint

  danger: '#EF4444',         // Coral Red (You owe / Unpaid)
  dangerDark: '#DC2626',     // Deep Coral Red
  dangerLight: '#FEE2E2',    // Soft Red badge background
  dangerSoft: '#FEF2F2',     // Light Red card tint

  warning: '#F59E0B',        // Amber Gold
  warningLight: '#FEF3C7',   // Soft Amber badge background
  info: '#3B82F6',           // Royal Blue
  infoLight: '#DBEAFE',      // Soft Blue badge background

  // Overlay & Shadows
  black: '#000000',
  overlay: 'rgba(30, 27, 75, 0.4)',
  shadowColor: '#4C1D95',    // Purple-tinted subtle drop shadows
};

export default colors;
