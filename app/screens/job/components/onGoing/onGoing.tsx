import React from 'react';
import {
  FlatList,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
  Text as RNText,
} from 'react-native';
import {DataOnGoing} from '../../../../model/dataOnGoing';
import {color} from '../../../../theme';
import {Text} from '../../../../components';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';

export const OnGoing = () => {
  const navigation: any = useNavigation();
  const data = [
    {
      _id: 1,
      title: 'Expo Hall 7',
      price: '$65.00',
      date: '7 months',
      pickup: 'Expo Hall 7',
      addressPickup: 'Expo Hall 7, Singapore',
      dropOff: 'Far East Plaza',
      addressDropOff: '14, Scotts Road, Orchard, Singapore, Singapore, 228213',
    },
  ];

  const renderItem = ({item, index}: {item: DataOnGoing; index: number}) => {
    return (
      <TouchableOpacity
        style={CONTAINER_LIST}
        key={index}
        onPress={() => navigation.navigate('onGoingDetail', {data: item})}>
        <View style={CONTENT_HEADER}>
          <Text text={item.title} style={TEXT_TITLE} />
          <View style={CONTENT_PRICE_DATE}>
            <Text text={item.price} style={TEXT_PRICE} />
            <View style={ICON_VIEW}>
              <Ionicons size={20} name={'time-outline'} color={color.gray3} />
              <Text text={`in ${item.date}`} style={TEXT_DATE} />
            </View>
          </View>
        </View>
        <View style={BODY}>
          <View style={PICKUP_CONTAINER}>
            <Ionicons size={20} name={'man-outline'} color={color.blue} />
            <RNText style={COMMON_TEXT}>
              {item.pickup}
              <RNText style={ADDRESS_TEXT}>{` - ${item.addressPickup}`}</RNText>
            </RNText>
          </View>
          <View style={SYMBOL} />
          <View style={PICKUP_CONTAINER}>
            <Ionicons size={20} name={'ellipse'} color={color.blue} />
            <RNText style={COMMON_TEXT}>
              {item.dropOff}
              <RNText
                style={ADDRESS_TEXT}>{` - ${item.addressDropOff}`}</RNText>
            </RNText>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <FlatList
      keyExtractor={item => item._id.toString()}
      data={data}
      renderItem={renderItem}
    />
  );
};

const CONTAINER_LIST: ViewStyle = {
  width: 380,
  height: 'auto',
  backgroundColor: color.black1,
};
const CONTENT_HEADER: ViewStyle = {
  flexDirection: 'row',
  justifyContent: 'space-between',
  padding: 10,
};
const CONTENT_PRICE_DATE: ViewStyle = {
  justifyContent: 'flex-end',
  alignItems: 'flex-end',
};
const TEXT_TITLE: TextStyle = {
  fontSize: 16,
  fontWeight: '700',
  color: color.white,
};
const TEXT_PRICE: TextStyle = {
  fontSize: 16,
  fontWeight: '400',
  color: color.white,
};
const TEXT_DATE: TextStyle = {
  fontSize: 14,
  fontWeight: '400',
  color: color.gray3,
  marginLeft: 10,
};
const ICON_VIEW: ViewStyle = {
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'center',
};
const BODY: ViewStyle = {
  paddingHorizontal: 15,
  paddingVertical: 10,
};
const PICKUP_CONTAINER: ViewStyle = {
  flexDirection: 'row',
};
const COMMON_TEXT: TextStyle = {
  fontSize: 16,
  fontWeight: '700',
  color: color.white,
  marginLeft: 5,
  flex: 1,
};
const ADDRESS_TEXT: TextStyle = {
  fontSize: 14,
  fontWeight: '400',
  color: color.gray3,
  marginLeft: 10,
};
const SYMBOL: ViewStyle = {
  width: 3,
  height: 30,
  backgroundColor: color.blue,
  marginLeft: 8,
  marginVertical: 5,
};
