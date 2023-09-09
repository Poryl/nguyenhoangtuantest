/* eslint-disable react-native/no-inline-styles */
import React, {FC} from 'react';
import {
  View,
  ViewStyle,
  Image,
  ImageStyle,
  TouchableOpacity,
} from 'react-native';
import Modal from 'react-native-modal';
//
import {BottomModalComponentProps} from './bottom-modal-component.props';
import {Text} from '../text/text';
import {color} from '../../theme';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {Button} from '../button/button';

export const BottomModalComponent: FC<BottomModalComponentProps> = ({
  isVisible,
  isShowIcon,
  title,
  titleStyle,
  subtitle,
  subtitleStyle,
  imageCode,
  imageStyle,
  confirmBtTitle,
  onConfirm,
  onClose,
  confirmButtonStyle,
  confirmTextStyle,
}) => {
  return (
    <Modal
      isVisible={isVisible}
      onBackdropPress={onClose}
      backdropColor={color.mineShaft}
      backdropOpacity={0.5}
      animationInTiming={300}
      animationOutTiming={300}
      backdropTransitionOutTiming={0}
      animationIn={'slideInUp'}
      animationOut={'slideOutDown'}
      style={MODAL}
      statusBarTranslucent>
      <View style={CONTAINER}>
        {isShowIcon ? (
          <TouchableOpacity style={ICON_VIEW} onPress={onClose}>
            <Ionicons size={25} name={'close-outline'} color={color.gray3} />
          </TouchableOpacity>
        ) : null}
        {imageCode ? (
          <Image source={imageCode} style={[IMAGE, imageStyle]} />
        ) : null}
        <Text text={title} style={titleStyle} />
        {subtitle ? <Text style={subtitleStyle} text={subtitle} /> : null}
        <Button
          text={confirmBtTitle}
          style={confirmButtonStyle}
          textStyle={confirmTextStyle}
          onPress={onConfirm}
        />
      </View>
    </Modal>
  );
};

const CONTAINER: ViewStyle = {
  backgroundColor: color.white,
  justifyContent: 'center',
  alignItems: 'center',
  padding: 20,
  height: '55%',
};
const MODAL: ViewStyle = {
  justifyContent: 'flex-end',
  margin: 0,
};
const ICON_VIEW: ViewStyle = {
  alignItems: 'flex-end',
  width: '100%',
};
const IMAGE: ImageStyle = {
  width: 80,
  height: 80,
};
