import React from 'react';
import { Alert, Modal, StyleSheet, Text, TouchableHighlight, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; 
import AppLoader from '../components/AppLoader';
import {THEME} from '../theme';
import { format } from 'date-fns';
import ru from 'date-fns/locale/ru';
import FormJoin from '../components/FormJoin';

const JoinModal = ({ visible, onCancel, itemId , type}) => {
  
  const [item, setItem] = React.useState();

  React.useEffect(() => {
    async function fetchItem() {
      try {
        const response = await fetch(`https://centerdaniil.ru/api/${type}/${itemId}`);
        const data = await response.json();
        setItem(data);       
      } catch (err) {
        console.log(err);
      }
    }
    fetchItem();
  }, []);

  if (!item ) {    
    return <AppLoader />;
  }
  
  const {date, title} = item;

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
        
        {date && <Text >
        {format(new Date(date), 'dd/MMM/yyyy', { locale: ru })}
        </Text>}

        <Text style={styles.headerEvent}>{item.name || title}</Text>

        {date ? <FormJoin title={title} date={item.date}/>   :
        <FormJoin title={item.name || item.title} type={type}/>   
        }

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
