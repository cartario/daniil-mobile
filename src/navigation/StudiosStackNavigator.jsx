import React from 'react';
import {View, Text} from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { AppHeaderIcon } from '../components/AppHederIcon';
import HeaderTitleHome from '../components/HeaderTitleHome';
import StudiosScreen from '../screens/StudiosScreen';
import StudioScreen from '../screens/StudioScreen';
import InfoModal from '../components/InfoModal';
import JoinModal from '../components/JoinModal';
import {THEME} from '../theme';

const Stack = createStackNavigator();

export const StudiosNavigator = ({ navigation }) => {
  
  const [modal, setModal] = React.useState(false); 
  const [infoModal, setInfoModal] = React.useState(false);

  return (
    <Stack.Navigator>
      <Stack.Screen
        options={({ route }) => ({
          headerTitle: 'Студии/Секции',
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
        name="Studios"
        component={StudiosScreen}
      />
      <Stack.Screen
        options={({ navigation, route }) => ({
          headerTintColor: THEME.MAIN_COLOR,
          headerBackTitle: 'Назад',
          headerTitle: ()=><View>
            <Text style={{color: THEME.ORANGE_COLOR, fontFamily: 'open-bold', fontSize: 16}}>{route.params.studioTitle.substr(0, 10)}...</Text>
          </View>,
          headerRight: () => {
            
            return (
              <HeaderButtons HeaderButtonComponent={AppHeaderIcon}>
                <Item
                  title="join"
                  iconName={'md-send-sharp'}
                  onPress={() => setModal(true)}/>
                  <JoinModal visible={modal} type='studios' onCancel={setModal} itemId={route.params.studioId}/>
                
              </HeaderButtons>
            );
          },
        })}
        name="Studio"
        component={StudioScreen}
      />
    </Stack.Navigator>
  );
};
