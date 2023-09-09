import {StyleProp, TextProps as TextProperties, TextStyle} from 'react-native';

export interface TextAnimationProps extends TextProperties {
  /**
   * The text to display if not using `tx` or nested components.
   */
  text?: string | null;

  /**
   * An optional style override useful for padding & margin.
   */
  textStyle?: StyleProp<TextStyle>;
}