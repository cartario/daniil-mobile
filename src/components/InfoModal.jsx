import React from 'react';
import { Alert, Modal, StyleSheet, Text, TouchableHighlight, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; 
import {THEME} from '../theme';

const InfoModal = ({ visible, onCancel }) => {
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
        <Text style={styles.header}>Это важно! </Text>
        <View style={styles.textWrap}>
          <Text style={styles.text}>
            1. Выбирая студии/секции обращай внимание на возраст, расписание и адрес
          </Text>
          <Text style={styles.text}>           
            2. Выбирая мероприятие обращай внимание на дату
          </Text>
          <Text style={styles.text}>         
            3. Доступны платные и бесплатные группы
          </Text>
          <Text style={styles.text}>          
            4. Записывайся и присоединяйся к нам!
          </Text>   
        </View>              
      </View>
    </Modal>
  );
};

export default InfoModal;

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
    marginTop: 20,
    marginBottom: 20,
    fontWeight: 'bold',
    fontSize: 24,
    color: THEME.ORANGE_COLOR
  },
  closeModal: {
    margin: 20,
    fontWeight: 'bold'
  },
  text: {
    margin: 10,
    fontSize: 16,
    textAlign: 'left'
  }
});
