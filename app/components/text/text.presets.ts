import {TextStyle} from 'react-native';
import {color} from '../../theme';

/**
 * All text will start off looking like this.
 */
const BASE: TextStyle = {
  // fontFamily: typography.primary,
  color: color.black1,
  fontSize: 15,
};

/**
 * All the variations of text styling within the app.
 *
 * You want to customize these to whatever you need in your app.
 */
export const presets = {
  /**
   * The default text styles.
   */
  default: BASE,

  /**
   * A bold version of the default text.
   */
  bold: {...BASE, fontWeight: 'bold'} as TextStyle,
};

/**
 * A list of preset names.
 */
export type TextPresets = keyof typeof presets;
