import React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { THEME } from '../theme';
import { Provider } from 'react-redux';
import { store } from '../store';
import { EventsNavigator } from '../navigation/EventsStackNavigator';
import { StudiosNavigator } from '../navigation/StudiosStackNavigator';
import { HomeNavigator } from '../navigation/HomeStackNavigator';
import AboutScreen from '../screens/AboutScreen';
import ScannerScreen from '../screens/ScannerScreen';

const Drawer = createDrawerNavigator();

const Feedback = () => {
  return (
    <View>
      <Text style={{ color: THEME.MAIN_COLOR }}>Feedback</Text>
    </View>
  );
};

const About = () => {
  return (
    <View>
      <Text style={{ color: THEME.MAIN_COLOR }}>About</Text>
    </View>
  );
};

const MainNavigation = ({ navigation }) => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Drawer.Navigator>
          <Drawer.Screen
            options={{ drawerLabel: 'Главная' }}
            name="Home"
            component={HomeNavigator}
          />
          <Drawer.Screen
            options={{ drawerLabel: 'Мероприятия' }}
            name="Events"
            component={EventsNavigator}
          />
          <Drawer.Screen
            options={{ drawerLabel: 'Студии/секции' }}
            name="Studios"
            component={StudiosNavigator}
          />
         
          <Drawer.Screen options={{ drawerLabel: 'О нас' }} name="About" component={AboutScreen} />
          <Drawer.Screen options={{ drawerLabel: 'Сканер' }} name="Scanner" component={ScannerScreen} />
        </Drawer.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

export default MainNavigation;
