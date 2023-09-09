import React, {FC, useState} from 'react';
import {View, ViewStyle, TextStyle} from 'react-native';
import {NavigatorParamList} from '../../navigators/app-navigator';
import {StackScreenProps} from '@react-navigation/stack';
import {Button} from '../../components';
import {color} from '../../theme';
import {OnGoing} from './components/onGoing/onGoing';

export const Job: FC<StackScreenProps<NavigatorParamList, 'job'>> = ({
  navigation,
}) => {
  const [isPressOnGoing, setIsPressOnGoing] = useState<boolean>(true);
  const [isPressAvailable, setIsPressAvailable] = useState<boolean>(false);
  const [isPressHistory, setIsPressHistory] = useState<boolean>(false);
  return (
    <View style={CONTAINER}>
      <View style={CONTENT_VIEW}>
        <Button
          text="Ongoing"
          style={[
            BUTTON,
            {
              backgroundColor: isPressOnGoing ? color.black1 : color.gray6,
            },
          ]}
          textStyle={[
            BUTTON_TEXT,
            {
              color: isPressOnGoing ? color.white : color.gray8,
            },
          ]}
          onPress={() => {
            setIsPressOnGoing(true);
            setIsPressAvailable(false);
            setIsPressHistory(false);
          }}
        />
        <Button
          text="Available"
          style={[
            BUTTON,
            {
              backgroundColor: isPressAvailable ? color.black1 : color.gray6,
            },
          ]}
          textStyle={[
            BUTTON_TEXT,
            {
              color: isPressAvailable ? color.white : color.gray8,
            },
          ]}
          onPress={() => {
            setIsPressOnGoing(false);
            setIsPressAvailable(true);
            setIsPressHistory(false);
          }}
        />
        <Button
          text="History"
          style={[
            BUTTON,
            {
              backgroundColor: isPressHistory ? color.black1 : color.gray6,
            },
          ]}
          textStyle={[
            BUTTON_TEXT,
            {
              color: isPressHistory ? color.white : color.gray8,
            },
          ]}
          onPress={() => {
            setIsPressOnGoing(false);
            setIsPressAvailable(false);
            setIsPressHistory(true);
          }}
        />
      </View>
      <View style={BODY}>
        {isPressOnGoing && <OnGoing />}
        {isPressAvailable && <View />}
        {isPressHistory && <View />}
      </View>
    </View>
  );
};

const CONTAINER: ViewStyle = {
  flex: 1,
  backgroundColor: 'white',
};
const CONTENT_VIEW: ViewStyle = {
  justifyContent: 'space-around',
  flexDirection: 'row',
  marginTop: 20,
};
const BUTTON: ViewStyle = {
  justifyContent: 'center',
  alignItems: 'center',
  width: 120,
  height: 40,
  backgroundColor: color.black1,
};
const BUTTON_TEXT: TextStyle = {
  fontSize: 16,
  fontWeight: '400',
  color: color.white,
};
const BODY: ViewStyle = {
  justifyContent: 'center',
  alignItems: 'center',
  marginTop: 20,
};
