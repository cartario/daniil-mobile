import React from 'react';
import { Text } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Scanner from '../screens/ScannerScreen';
import {HomeNavigator} from '../navigation/HomeStackNavigator';
import {Ionicons} from '@expo/vector-icons';
import {THEME} from '../theme';
import NewEventScreen from '../screens/NewEventScreen';
import {BookedEventsNavigator} from '../navigation/BookedEventsStackNavigator';

const Tab = createBottomTabNavigator();

export const TabNavigator = () => {
  return (
    <Tab.Navigator
    screenOptions={({ route }) => ({
      tabBarIcon: ({ focused, color, size }) => {
        let iconName;

        if (route.name === 'Home') {
          iconName = focused
            ? 'home'
            : 'home-outline';
        } 

        else if (route.name === 'Scanner') {
          iconName = focused
            ? 'qr-code'
            : 'qr-code-outline';
        }
        
        else if (route.name === 'NewEvent') {
          iconName = focused ? 'add' : 'add-outline';
        }

        else if (route.name === 'Booked') {
          iconName = focused ? 'star' : 'star-outline';
        }

        // You can return any component that you like here!
        return <Ionicons name={iconName} size={size} color={color} />;
      },
    })}
    tabBarOptions={{
      activeTintColor: THEME.MAIN_COLOR,
      inactiveTintColor: 'gray',
    }}
    >
      <Tab.Screen name="Home" component={HomeNavigator} options={{title: 'Главная'}}/>
      <Tab.Screen name="Scanner" component={Scanner} options={{title: 'QR-код'}}/>      
      <Tab.Screen name="Booked" component={BookedEventsNavigator} options={{title: 'Избранное'}}/>
      <Tab.Screen name="NewEvent" component={NewEventScreen} options={{title: 'Добавить'}} />     
    </Tab.Navigator>
  );
};
