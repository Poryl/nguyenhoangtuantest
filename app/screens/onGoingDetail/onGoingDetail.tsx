import {NavigatorParamList} from '../../navigators/app-navigator';
import {StackScreenProps} from '@react-navigation/stack';
import React, {
  FC,
  useCallback,
  useMemo,
  useRef,
  useState,
  useEffect,
} from 'react';
import {
  View,
  ViewStyle,
  TouchableOpacity,
  TextStyle,
  Image,
  ActivityIndicator,
  ImageStyle,
  StyleSheet,
} from 'react-native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {color} from '../../theme';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {goBack} from '../../navigators';
import BottomSheet from '@gorhom/bottom-sheet';
import SwipeButton from 'rn-swipe-button';
import {BottomModalComponent, Text} from '../../components';
import MapView, {Polyline, Marker, PROVIDER_GOOGLE} from 'react-native-maps';

const SWIPE_ICON = require('./images/swipe-icon.png');
const IMAGE_POPUP = require('./images/image-popup.png');

export const OnGoingDetail: FC<
  StackScreenProps<NavigatorParamList, 'onGoingDetail'>
> = ({route}) => {
  const {data} = route?.params || {};
  const mapRef = useRef<MapView | null>(null);
  const bottomSheetRef = useRef<BottomSheet>(null);
  const [isFull, setIsFull] = useState<boolean>(false);
  const [isCompletedOrder, setIsCompletedOrder] = useState<boolean>(false);
  const [isShowPopup, setIsShowPopup] = useState<boolean>(false);
  const [isIndex0, setIsIndex0] = useState<boolean>(false);
  const [isIndex1, setIsIndex1] = useState<boolean>(false);

  // variables
  const snapPoints = useMemo(() => ['25%', '50%', '100%'], []);

  // callbacks
  const handleSheetChanges = useCallback((index: number) => {
    if (index === 2) {
      setIsFull(true);
    } else {
      if (index === 0) {
        setIsIndex0(true);
        setIsIndex1(false);
      } else {
        setIsIndex0(false);
        setIsIndex1(true);
      }
      setIsFull(false);
    }
  }, []);

  const checkoutButton = () => {
    return (
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        {isCompletedOrder ? (
          <ActivityIndicator size={'small'} color={color.gray3} />
        ) : (
          <Image source={SWIPE_ICON} style={{width: 20, height: 20}} />
        )}
      </View>
    );
  };

  const [coordinates, setCoordinates] = useState([
    {latitude: 1.337366120583553, longitude: 103.96152556715107},
    {latitude: 1.3063632498770628, longitude: 103.83375082482213},
  ]);

  useEffect(() => {
    // Calculate the bounding box of the polyline coordinates
    const minLat = Math.min(...coordinates.map(coord => coord.latitude));
    const maxLat = Math.max(...coordinates.map(coord => coord.latitude));
    const minLng = Math.min(...coordinates.map(coord => coord.longitude));
    const maxLng = Math.max(...coordinates.map(coord => coord.longitude));

    // Calculate the region that fits the bounding box
    const region = {
      latitude: (minLat + maxLat) / 2,
      longitude: (minLng + maxLng) / 2,
      latitudeDelta: maxLat - minLat + 0.1, // Add some padding (adjust as needed)
      longitudeDelta: maxLng - minLng + 0.1, // Add some padding (adjust as needed)
    };

    // Set the region to fit the polyline on the screen
    if (mapRef.current) {
      mapRef.current.fitToCoordinates(coordinates, {
        edgePadding: {top: 50, right: 50, bottom: 50, left: 50}, // Adjust padding as needed
        animated: true,
      });

      mapRef.current.animateToRegion(region); // Optional: Center the map on the polyline
    }
  }, [coordinates]);

  return (
    <GestureHandlerRootView style={GESTURE_CONTAINER}>
      <View style={CONTAINER}>
        <MapView
          ref={mapRef}
          provider={PROVIDER_GOOGLE}
          style={StyleSheet.absoluteFillObject}
          showsUserLocation>
          {/* Marker for Icon 1 */}
          <Marker coordinate={coordinates[0]}>
            <View style={MARKER_VIEW}>
              <Ionicons size={15} name={'car-outline'} color={color.white} />
            </View>
          </Marker>
          <Polyline
            coordinates={coordinates}
            lineDashPattern={[10, 5]}
            strokeColor={color.blue} // fallback for when `strokeColors` is not supported by the map-provider
            strokeWidth={2}
            lineCap="round"
          />
          {/* Marker for Icon 2 */}
          <Marker coordinate={coordinates[1]}>
            {/* Custom Icon for Marker 2 */}
            <View style={MARKER_VIEW}>
              <Ionicons
                size={15}
                name={'arrow-down-outline'}
                color={color.white}
              />
            </View>
          </Marker>
        </MapView>
        <View style={BUTTON_BACK_VIEW}>
          <TouchableOpacity style={LOCATE_BUTTON_VIEW} onPress={() => goBack()}>
            <Ionicons
              size={20}
              name={'chevron-back-outline'}
              color={color.black1}
            />
          </TouchableOpacity>
        </View>
        <View
          style={[
            LOCATE_VIEW,
            {
              top: isIndex0 ? 330 : isIndex1 ? -50 : 0,
            },
          ]}>
          <TouchableOpacity
            style={LOCATE_BUTTON_VIEW}
            onPress={() =>
              setCoordinates([
                {
                  latitude: 1.337366120583553,
                  longitude: 103.96152556715107,
                },
                {
                  latitude: 1.3063632498770628,
                  longitude: 103.83375082482213,
                },
              ])
            }>
            <Ionicons size={20} name={'locate-outline'} color={color.black1} />
          </TouchableOpacity>
        </View>
        <BottomSheet
          ref={bottomSheetRef}
          index={0}
          snapPoints={snapPoints}
          backgroundStyle={{
            backgroundColor: isFull ? color.white : color.black1,
          }}
          onChange={handleSheetChanges}>
          <View style={CONTAINER_VIEW}>
            {isFull ? (
              <View style={HEADER_FULL}>
                <View style={HEADER_FULL_CONTAINER}>
                  <TouchableOpacity onPress={() => goBack()}>
                    <Ionicons
                      size={20}
                      name={'chevron-back-outline'}
                      color={color.black1}
                    />
                  </TouchableOpacity>
                  <View>
                    <Text style={ID_TEXT} text={'LY-4b3dec'} />
                  </View>
                  <View>
                    {isCompletedOrder ? (
                      <ActivityIndicator size={'small'} color={color.orange} />
                    ) : (
                      <View />
                    )}
                  </View>
                </View>
                <View style={PRICE_VIEW}>
                  <Text text={data.price} style={PRICE_TEXT} />
                  <TouchableOpacity style={SYNC_VIEW}>
                    <Ionicons
                      size={20}
                      name={'sync-outline'}
                      color={color.blue}
                    />
                  </TouchableOpacity>
                </View>
                <View style={LINE} />
              </View>
            ) : (
              <View style={HEADER}>
                <View style={HEADER_CONTAINER}>
                  <Text style={TEXT_ORDER} text={'12'} />
                  <View style={HEADER_VIEW}>
                    <Text style={TEXT_DATE} text={'December'} />
                    <Text style={TEXT_NUMBER} text={'N95899'} />
                  </View>
                </View>
                <Text style={TEXT_PRICE} text={data.price} />
              </View>
            )}

            <View style={CONTENT}>
              <View style={BODY}>
                <View style={ICON_SHIELD}>
                  <Ionicons
                    size={30}
                    name={'shield-checkmark'}
                    color={color.white}
                  />
                </View>
                <Text style={SHIELD_TEXT} text={'STANDARD RIDE'} />
              </View>
              <View style={BODY_CONTAINER}>
                <Ionicons size={20} name={'man-outline'} color={color.blue} />
                <View style={BODY}>
                  <View style={SYMBOL} />
                  <View style={PICKUP_VIEW}>
                    <Text style={PICKUP_TEXT} text={data.pickup} />
                    <Text
                      style={PICKUP_ADDRESS_TEXT}
                      text={data.addressPickup}
                    />
                    <Text style={PICKUP_STATUS_TEXT} text={'Picked up'} />
                  </View>
                </View>
                <View style={BODY}>
                  <Ionicons size={20} name={'ellipse'} color={color.blue} />
                  <View style={DROPOFF_VIEW}>
                    <Text style={PICKUP_TIME_TEXT} text={'6:06pm'} />
                    <Text style={PICKUP_TEXT} text={data.dropOff} />
                    <Text
                      style={PICKUP_ADDRESS_TEXT}
                      text={data.addressDropOff}
                    />
                    <Text style={PICKUP_STATUS_TEXT} text={'Dropped - off'} />
                  </View>
                </View>
              </View>
            </View>
            <View style={JOB_DATE_VIEW}>
              <Text style={JOB_DATE_TEXT} text={'Job Date'} />
              <Text style={DATE_TEXT} text={'12/12/2023'} />
            </View>
            <View style={HEADER_FULL}>
              <SwipeButton
                disableResetOnTap
                railBackgroundColor={color.blue}
                railStyles={{
                  backgroundColor: color.transparent,
                  borderColor: color.blue,
                }}
                thumbIconBackgroundColor="#FFFFFF"
                title="Completed"
                titleColor={color.white}
                titleFontSize={16}
                thumbIconComponent={checkoutButton}
                onSwipeSuccess={() => {
                  setIsCompletedOrder(true);
                  setIsShowPopup(true);
                }}
              />
            </View>
          </View>
        </BottomSheet>
        <BottomModalComponent
          isVisible={isShowPopup}
          isShowIcon
          imageCode={IMAGE_POPUP}
          imageStyle={IMAGE}
          title={'You have not arrived back at Expo'}
          titleStyle={TITLE_POPUP}
          subtitle={'Please report back at Foyer 1 to complete the job.'}
          subtitleStyle={SUBTITLE_POPUP}
          confirmBtTitle={'Ok'}
          confirmButtonStyle={CONFIRM_BUTTON}
          onConfirm={() => setIsShowPopup(false)}
          onClose={() => setIsShowPopup(false)}
        />
      </View>
    </GestureHandlerRootView>
  );
};

const GESTURE_CONTAINER: ViewStyle = {flex: 1};
const CONTAINER: ViewStyle = {
  flex: 1,
  backgroundColor: 'white',
  alignItems: 'center',
  justifyContent: 'center',
};
const MARKER_VIEW: ViewStyle = {
  width: 30,
  height: 30,
  borderRadius: 60,
  backgroundColor: color.blue,
  justifyContent: 'center',
  alignItems: 'center',
};
const BUTTON_BACK_VIEW: ViewStyle = {
  position: 'absolute',
  top: 50,
  left: 20,
  bottom: 0,
  justifyContent: 'flex-start',
  alignItems: 'center',
};
const LOCATE_VIEW: ViewStyle = {
  position: 'absolute',
  right: 0,
  bottom: 0,
  justifyContent: 'center',
  alignItems: 'center',
};
const LOCATE_BUTTON_VIEW: ViewStyle = {
  width: 40,
  height: 40,
  borderRadius: 60,
  backgroundColor: color.white,
  justifyContent: 'center',
  alignItems: 'center',
};
const CONTAINER_VIEW: ViewStyle = {
  flex: 1,
  backgroundColor: color.white,
  borderStartStartRadius: 5,
  borderStartEndRadius: 5,
};
const HEADER: ViewStyle = {
  flexDirection: 'row',
  backgroundColor: color.black1,
  padding: 20,
  justifyContent: 'space-between',
  alignItems: 'center',
};
const HEADER_FULL: ViewStyle = {
  height: 'auto',
  marginTop: 30,
};
const HEADER_FULL_CONTAINER: ViewStyle = {
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  paddingHorizontal: 10,
};
const HEADER_CONTAINER: ViewStyle = {
  flexDirection: 'row',
};
const ID_TEXT: TextStyle = {
  fontSize: 18,
  color: color.black1,
  fontWeight: '700',
};
const PRICE_TEXT: TextStyle = {
  fontSize: 22,
  color: color.black1,
  fontWeight: '400',
};
const PRICE_VIEW: ViewStyle = {
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center',
  marginTop: 30,
};
const SYNC_VIEW: ViewStyle = {
  marginLeft: 20,
};
const LINE: ViewStyle = {
  width: '100%',
  height: 2,
  backgroundColor: color.black1,
  marginVertical: 10,
};
const HEADER_VIEW: ViewStyle = {
  flexDirection: 'column',
  marginHorizontal: 20,
};
const TEXT_ORDER: TextStyle = {
  fontSize: 28,
  color: color.white,
  fontWeight: '700',
};
const TEXT_DATE: TextStyle = {
  fontSize: 18,
  color: color.white,
  fontWeight: '400',
};
const TEXT_NUMBER: TextStyle = {
  fontSize: 14,
  color: color.gray3,
  fontWeight: '400',
  paddingVertical: 2,
};
const TEXT_PRICE: TextStyle = {
  fontSize: 28,
  color: color.white,
  fontWeight: '400',
};
const CONTENT: ViewStyle = {
  padding: 20,
};
const BODY: ViewStyle = {
  flexDirection: 'row',
};
const ICON_SHIELD: ViewStyle = {
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: color.blue,
  width: 50,
  height: 50,
  borderRadius: 60,
};
const SHIELD_TEXT: TextStyle = {
  fontSize: 18,
  color: color.blue,
  fontWeight: '400',
  paddingHorizontal: 10,
};
const BODY_CONTAINER: ViewStyle = {
  padding: 10,
  marginTop: 10,
};
const SYMBOL: ViewStyle = {
  width: 2,
  height: 130,
  backgroundColor: color.blue,
  marginLeft: 8,
  marginVertical: 5,
};
const PICKUP_VIEW: ViewStyle = {
  flexDirection: 'column',
  marginHorizontal: 30,
  top: -20,
  justifyContent: 'space-around',
  height: 80,
};
const PICKUP_TEXT: TextStyle = {
  fontSize: 20,
  color: color.black1,
  fontWeight: '700',
};
const PICKUP_ADDRESS_TEXT: TextStyle = {
  fontSize: 14,
  color: color.gray3,
  fontWeight: '400',
};
const PICKUP_STATUS_TEXT: TextStyle = {
  fontSize: 14,
  color: color.green,
  fontWeight: '700',
};
const PICKUP_TIME_TEXT: TextStyle = {
  fontSize: 14,
  color: color.blue1,
  fontWeight: '700',
};
const DROPOFF_VIEW: ViewStyle = {
  flexDirection: 'column',
  marginHorizontal: 20,
  justifyContent: 'space-around',
  height: 130,
};
const JOB_DATE_VIEW: ViewStyle = {
  flexDirection: 'row',
  justifyContent: 'space-between',
  paddingHorizontal: 35,
  paddingVertical: 5,
  alignItems: 'center',
};
const JOB_DATE_TEXT: TextStyle = {
  fontSize: 14,
  color: color.gray3,
  fontWeight: '400',
};
const DATE_TEXT: TextStyle = {
  fontSize: 14,
  color: color.black1,
  fontWeight: '700',
};
const IMAGE: ImageStyle = {
  width: 200,
  height: 180,
};
const TITLE_POPUP: TextStyle = {
  fontSize: 28,
  color: color.black1,
  fontWeight: '500',
  textAlign: 'center',
};
const SUBTITLE_POPUP: TextStyle = {
  fontSize: 16,
  color: color.dark5,
  fontWeight: '500',
  textAlign: 'center',
  marginVertical: 10,
};
const CONFIRM_BUTTON: ViewStyle = {
  width: 320,
  height: 45,
  backgroundColor: color.black1,
  borderRadius: 0,
  marginVertical: 10,
};
