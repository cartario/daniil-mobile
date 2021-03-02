import React from 'react';
import {View, Text} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import {THEME} from '../theme';
import { Provider } from 'react-redux';
import {store} from '../store';

// import {HomeTabNavigator} from './home-tab-navigator';
// import {EventsTabNavigator} from './events-tab-navigator';

// import CreateScreen from '../screens/CreateScreen';
// import AboutScreen from '../screens/AboutScreen';




const Drawer = createDrawerNavigator();

// const MainNavigation = ({navigation}) => {
//   return (
//     <Provider store={store}>
//     <NavigationContainer>
//       <Drawer.Navigator 
//         initialRouteName="Home"
//         drawerContentOptions={{
//           activeTintColor: THEME.MAIN_COLOR,
//           labelStyle: {
//             fontFamily: 'open-bold'
//           }
//         }}      
//       >
//         <Drawer.Screen name="Home" component={HomeTabNavigator} />
//         <Drawer.Screen name="Events" component={EventsTabNavigator} />
//         {/* <Drawer.Screen name="Locations" component={LocationsTabNavigator} /> */}
//         <Drawer.Screen name="Create" component={CreateScreen} />
//         <Drawer.Screen name="About" component={AboutScreen} />
//       </Drawer.Navigator>
//     </NavigationContainer>
//     </Provider>
//   );
// };

const Feed = () => {
  return <View><Text style={{color: THEME.MAIN_COLOR}}>feed</Text></View>
};

const Article = () => {
  return <View><Text style={{color: THEME.ORANGE_COLOR}}>Article</Text></View>
}

const MainNavigation = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Drawer.Navigator>
          <Drawer.Screen name="Feed" component={Feed} />
          <Drawer.Screen name="Article" component={Article} />
        </Drawer.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

export default MainNavigation;
