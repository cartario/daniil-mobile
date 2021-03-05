import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { AppHeaderIcon } from '../components/AppHederIcon';
import InfoModal from '../components/InfoModal';
import HomeScreen from '../screens/HomeScreen';
import {THEME} from '../theme';

const Stack = createStackNavigator();

export const HomeNavigator = ({ navigation }) => {  
  const [infoModal, setInfoModal] = React.useState(false); 
  
  return (
    <Stack.Navigator>
      <Stack.Screen
        options={({ route }) => ({
          headerTitle: 'Главная',
          headerTintColor: THEME.ORANGE_COLOR,
          headerRight: () => {
            return (
              <HeaderButtons HeaderButtonComponent={AppHeaderIcon}>
                <Item iconName="information-circle" onPress={() => setInfoModal(true)} />
                <InfoModal visible={infoModal} onCancel={setInfoModal} />
              </HeaderButtons>              
            );
          },
          headerLeft: () => {
            return (
              <HeaderButtons HeaderButtonComponent={AppHeaderIcon}>
                <Item title="menu" iconName="menu" onPress={() => navigation.toggleDrawer()} />
              </HeaderButtons>             
            );
          },
        })}
        name="Home"
        component={HomeScreen}
      />     
    </Stack.Navigator>
  );
};
