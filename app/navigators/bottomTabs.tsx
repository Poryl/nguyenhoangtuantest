import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Home, Coin, Job, Menu} from '../screens';
import Ionicons from 'react-native-vector-icons/Ionicons';

const Tab = createBottomTabNavigator();

export function BottomTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="home"
        component={Home}
        options={{
          title: 'Home',
          headerTitleAlign: 'left',
          tabBarIcon: ({color}) => <Ionicons size={20} name={'home-outline'} color={color} />,
        }}
      />
      <Tab.Screen
        name="coin"
        component={Coin}
        options={{
          title: 'Coin',
          headerTitleAlign: 'left',
          tabBarIcon: ({color}) => <Ionicons size={20} name={'logo-bitcoin'} color={color} />,
        }}
      />
      <Tab.Screen
        name="job"
        component={Job}
        options={{
          title: 'Job',
          headerTitleAlign: 'left',
          tabBarIcon: ({color}) => <Ionicons size={20} name={'car-outline'} color={color} />,
        }}
      />
      <Tab.Screen
        name="menu"
        component={Menu}
        options={{
          title: 'Menu',
          headerTitleAlign: 'left',
          tabBarIcon: ({color}) => <Ionicons size={20} name={'menu-outline'} color={color} />,
        }}
      />
    </Tab.Navigator>
  );
}
