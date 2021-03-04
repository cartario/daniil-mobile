import React from 'react';
import {View, Text} from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { AppHeaderIcon } from '../components/AppHederIcon';
import HeaderTitleHome from '../components/HeaderTitleHome';
import EventsScreen from '../screens/EventsScreen';
import EventScreen from '../screens/EventScreen';
import InfoModal from '../components/InfoModal';
import JoinModal from '../components/JoinModal';
import {THEME} from '../theme';

const Stack = createStackNavigator();

export const EventsNavigator = ({ navigation }) => {
  // const dispatch = useDispatch();

  const [modal, setModal] = React.useState(false); //исправить на route.params

  
  return (
    <Stack.Navigator>
      <Stack.Screen
        options={({ route }) => ({
          headerTitle: 'Мероприятия',
          headerTintColor: THEME.ORANGE_COLOR,
          headerRight: () => {
            return (
              <HeaderButtons HeaderButtonComponent={AppHeaderIcon}>
                <Item iconName="information-circle" onPress={() => setModal(true)} />
                <InfoModal visible={modal} onCancel={setModal} />
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
        name="Events"
        component={EventsScreen}
      />
      <Stack.Screen
        options={({ navigation, route }) => ({
          headerTintColor: THEME.MAIN_COLOR,
          headerBackTitle: 'Назад',
          headerTitle: ()=><View>
            <Text style={{color: THEME.ORANGE_COLOR, fontFamily: 'open-bold', fontSize: 16}}>{route.params.eventTitle.substr(0, 10)}...</Text>
          </View>,
          headerRight: () => {
            
            return (
              <HeaderButtons HeaderButtonComponent={AppHeaderIcon}>
                <Item
                  title="join"
                  iconName={'people'}
                  onPress={() => setModal(true)}/>
                  <JoinModal visible={modal} onCancel={setModal} eventId={route.params.eventId}/>
                
              </HeaderButtons>
            );
          },
        })}
        name="Event"
        component={EventScreen}
      />
    </Stack.Navigator>
  );
};
