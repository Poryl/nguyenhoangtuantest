import {ViewStyle, TextStyle} from 'react-native';
import {color} from '../../theme';

const BASE_CONTAINER: ViewStyle = {
  justifyContent: 'center',
  alignItems: 'center',
  width: '90%',
  borderRadius: 50,
  marginStart: 15,
  marginEnd: 15,
};

export const viewPresets: Record<string, ViewStyle> = {
  white: {
    ...BASE_CONTAINER,
    borderColor: color.black1,
    backgroundColor: color.white,
  } as ViewStyle,

  disabled: {
    backgroundColor: color.gray3,
  } as ViewStyle,
};

const BASE_TEXT_STYLE: TextStyle = {
  fontSize: 16,
  fontWeight: '400',
};
export const textPresets: Record<ButtonPresetNames, TextStyle> = {
  white: {
    ...BASE_TEXT_STYLE,
    color: color.white,
  } as TextStyle,

  disabled: {
    ...BASE_TEXT_STYLE,
    color: color.gray3,
  } as TextStyle,
};

export type ButtonPresetNames = keyof typeof viewPresets;
