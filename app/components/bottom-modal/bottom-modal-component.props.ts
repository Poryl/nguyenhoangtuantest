import {TextStyle, ViewStyle} from 'react-native';

export interface BottomModalComponentProps {
  /**
   * show , hide component
   */
  isVisible: boolean;

  /**
   * show , hide icon
   */
  isShowIcon?: boolean;

  /**
   * Image code
   */
  imageCode?: any;

  /**
   * Image Style
   */
  imageStyle?: any;

  /**
   * Title text
   */
  title?: string;

  /**
   * Title style
   */
  titleStyle?: any;

  /**
   * Subtitle
   */
  subtitle?: string;

  /**
   * Subtitle style
   */
  subtitleStyle?: any;

  /**
   * Confirm text style
   */
  confirmTextStyle?: TextStyle;

  /**
   * Container Button Style
   */
  containerButtonStyle?: any;

  /**
   * Confirm Button Style
   */
  confirmButtonStyle?: ViewStyle;

  /**
   * Confirm Button title
   */
  confirmBtTitle?: string;

  /**
   * Main Button , confirm alert callback
   */
  onConfirm: () => void;

  /**
   * Close modal callback
   */
  onClose?: () => void;
}
