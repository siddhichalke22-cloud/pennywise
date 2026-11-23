import { Dimensions, PixelRatio, Platform } from 'react-native';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

// Standard mobile baseline guideline dimensions (iPhone 13 / 14 / X)
const BASE_WIDTH = 375;
const BASE_HEIGHT = 812;

/**
 * Scales a size based on device screen width
 */
export const scale = (size) => (SCREEN_WIDTH / BASE_WIDTH) * size;

/**
 * Scales a size based on device screen height
 */
export const verticalScale = (size) => (SCREEN_HEIGHT / BASE_HEIGHT) * size;

/**
 * Moderately scales a size with a damping factor (default 0.5)
 */
export const moderateScale = (size, factor = 0.5) =>
  size + (scale(size) - size) * factor;

/**
 * Scales font sizes consistently across iOS and Android
 */
export const fontScale = (size) => {
  const newSize = (SCREEN_WIDTH / BASE_WIDTH) * size;
  if (Platform.OS === 'ios') {
    return Math.round(PixelRatio.roundToNearestPixel(newSize));
  }
  return Math.round(PixelRatio.roundToNearestPixel(newSize)) - 1;
};

export const screenWidth = SCREEN_WIDTH;
export const screenHeight = SCREEN_HEIGHT;
export const isSmallDevice = SCREEN_WIDTH < 375;
export const isTablet = SCREEN_WIDTH >= 768;

export default {
  scale,
  verticalScale,
  moderateScale,
  fontScale,
  screenWidth,
  screenHeight,
  isSmallDevice,
  isTablet,
};
