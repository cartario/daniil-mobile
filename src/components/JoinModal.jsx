import React from 'react';
import { Alert, Modal, StyleSheet, Text, TouchableHighlight, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; 
import AppLoader from '../components/AppLoader';
import {THEME} from '../theme';
import { format } from 'date-fns';
import ru from 'date-fns/locale/ru';

const JoinModal = ({ visible, onCancel, eventId }) => {
  const [event, setEvent] = React.useState();

  React.useEffect(() => {
    async function fetchEvent() {
      try {
        const response = await fetch(`https://centerdaniil.ru/api/events/${eventId}`);
        const data = await response.json();
        setEvent(data);

       
      } catch (err) {
        console.log(err);
      }
    }
    fetchEvent();
  }, []);

  if (!event ) {    
    return <AppLoader />;
  }

  const {date, title} = event;

  return (
    <Modal animationType="slide" transparent={true} visible={visible} style={styles.modal}>
      <View style={styles.center}>
      <TouchableHighlight
          onPress={() => {
            onCancel(false);
          }}
        >          
          <Ionicons name="close-circle" size={24} color={THEME.MAIN_COLOR} />
        </TouchableHighlight>
        <Text style={styles.header}>Хочу записаться</Text>
        
        <Text >
        {format(new Date(date), 'dd/MMM/yyyy', { locale: ru })}
      </Text>
      <Text style={styles.headerEvent}>{title}</Text>
        <View style={styles.text}>
          <Text>
            1. Смотри туториал  {eventId}        
          </Text>
          <Text>           
            2. Жми start и повторяй движения          
          </Text>
          <Text>         
            3. Поставь  себе оценку, двигайся дальше.         
          </Text>
          <Text>          
            4.Удачи и процветания! У тебя все получится!
          </Text>   
        </View>              
      </View>
    </Modal>
  );
};

export default JoinModal;

const styles = StyleSheet.create({
  modal: {
    padding: 15
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 42,
    padding: 15,
    backgroundColor: '#fff',
  },
  header: {
    margin:0,
    padding:0,
    fontWeight: 'bold',
    fontSize: 24,
    color: THEME.ORANGE_COLOR
  },
  headerEvent: {
    marginBottom: 20,
    padding:0,
    fontWeight: 'bold',
    fontSize: 20,
    color: THEME.GREY_COLOR
  },
  closeModal: {
    margin: 20,
    fontWeight: 'bold'
  },
  text: {
    textAlign: 'left'
  }
});
