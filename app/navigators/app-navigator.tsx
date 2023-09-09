/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import {Platform, useColorScheme, View, ViewStyle} from 'react-native';
import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {navigationRef} from './navigation-utilities';
//
import {BottomTabs} from './bottomTabs';
import {OnGoingDetail} from '../screens';
import {DataOnGoing} from '../model/dataOnGoing';

export type NavigatorParamList = {
  //
  home: any;
  bottomTabs: undefined;
  coin: any;
  job: any;
  menu: any;
  onGoingDetail: {data: DataOnGoing};
};

const Stack = createNativeStackNavigator<NavigatorParamList>();

const AppStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        animation: Platform.OS === 'android' ? 'fade' : 'default',
      }}>
      <Stack.Group>
        <Stack.Screen name="bottomTabs" component={BottomTabs} />
        <Stack.Screen name="onGoingDetail" component={OnGoingDetail} />
      </Stack.Group>
    </Stack.Navigator>
  );
};

interface NavigationProps
  extends Partial<React.ComponentProps<typeof NavigationContainer>> {}

export const AppNavigator = (props: NavigationProps) => {
  const routeNameRef = React.useRef();
  const colorScheme = useColorScheme();

  return (
    <View style={CONTAINER}>
      <NavigationContainer
        ref={navigationRef}
        theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}
        {...props}
        onReady={() => {
          routeNameRef.current = navigationRef.getCurrentRoute()?.name;
        }}
        onStateChange={() => {
          const currentRouteName = navigationRef.getCurrentRoute()?.name;
          routeNameRef.current = currentRouteName;
        }}>
        <AppStack />
      </NavigationContainer>
    </View>
  );
};

AppNavigator.displayName = 'AppNavigator';

const CONTAINER: ViewStyle = {
  flex: 1,
};

/**
 * A list of routes from which we're allowed to leave the app when
 * the user presses the back button on Android.
 *
 * Anything not on this list will be a standard `back` action in
 * react-navigation.
 *
 * `canExit` is used in ./app/app.tsx in the `useBackButtonHandler` hook.
 */
const exitRoutes = ['authen'];
export const canExit = (routeName: string) => exitRoutes.includes(routeName);
