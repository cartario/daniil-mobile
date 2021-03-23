import React from 'react';
import { View, Text, StyleSheet, Modal, Alert, TouchableOpacity } from 'react-native';
import FormNewEvent from '../components/FormNewEvent';

const NewEventScreen = () => { 

  return (
    <>      
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Знаешь об интресном событии? Поделись с нами!</Text>

            <FormNewEvent/>            
          </View>
        </View>
      
    </>
  );
};

export default NewEventScreen;

const styles = StyleSheet.create({
  
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    
    backgroundColor: 'rgba(0,0,0,0.8)'
  },
  modalView: {
    justifyContent: 'space-between',
    width: '100%',
    height: '60%',
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  openButton: {
    
    backgroundColor: '#F194FF',
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});
