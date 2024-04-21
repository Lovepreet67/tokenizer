import {Dimensions, PixelRatio, Platform} from 'react-native';

const {width: SCREEN_WIDTH, height: SCREEN_HEIGHT} = Dimensions.get('window');

const scale = SCREEN_WIDTH / 375;

const scaleVertical = SCREEN_HEIGHT / 812;

export function scaled(size: number) {
  const newSize = size * scale;
  if (Platform.OS === 'ios') {
    return Math.round(PixelRatio.roundToNearestPixel(newSize));
  } else {
    return Math.round(PixelRatio.roundToNearestPixel(newSize)) - 1;
  }
}

export function verticalSacled(size: number) {
  const newSize = size * scaleVertical;
  if (Platform.OS === 'ios') {
    return Math.round(PixelRatio.roundToNearestPixel(newSize));
  } else {
    return Math.round(PixelRatio.roundToNearestPixel(newSize)) - 1;
  }
}

const SIZES = {
  heading: scaled(33),
  secondaryButton: scaled(25),
  primaryButton: scaled(35),
  primaryFont: scaled(20),
  title: scaled(20),
  pText: scaled(14),
  primaryInput: scaled(33),
  listTitle: scaled(16),
  error: scaled(20),
  transactionAmount: scaled(22),
  transactionName: scaled(17),
  transactionDate: scaled(14),
};

enum WEIGHTS {
  medium = '600',
  light = '600',
}

export {SIZES, WEIGHTS};
