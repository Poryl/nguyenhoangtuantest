import React, {FC} from 'react';
import {View, ViewStyle, Text} from 'react-native';
import {NavigatorParamList} from '../../navigators/app-navigator';
import {StackScreenProps} from '@react-navigation/stack';

export const Coin: FC<StackScreenProps<NavigatorParamList, 'coin'>> = () => {
  return (
    <View style={CONTAINER}>
      <Text>Coin Screen</Text>
    </View>
  );
};

const CONTAINER: ViewStyle = {
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: 'white',
};
