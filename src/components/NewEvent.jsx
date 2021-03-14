import React from 'react';
import { View, Text, StyleSheet, Modal, Alert, TouchableOpacity } from 'react-native';
import FormNewEvent from '../components/FormNewEvent';

const NewEvent = () => {
  const [modalVisible, setModalVisible] = React.useState(false);

  const handleClickPlus = () => {
    setModalVisible(true)
  };

  return (
    <>
      <View style={styles.plus}>
        <TouchableOpacity onPress={handleClickPlus}>
          <Text
            style={{ marginTop: -25, color: '#fff', fontSize: 80, textAlignVertical: 'center' }}
          >
            +
          </Text>
        </TouchableOpacity>
      </View>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(false);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Знаешь об интресном событии? Поделись с нами!</Text>

            <FormNewEvent/>

            <TouchableOpacity
              style={{ ...styles.openButton, backgroundColor: '#2196F3' }}
              onPress={() => {
                setModalVisible(!modalVisible);
              }}>
              <Text style={styles.textStyle}>Закрыть</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </>
  );
};

export default NewEvent;

const styles = StyleSheet.create({
  plus: {
    position: 'absolute',
    bottom: 10,
    right: 10,
    zIndex: 10,
    justifyContent: 'center',
    alignItems: 'center',
    width: 60,
    height: 60,
    borderRadius: 50,
    backgroundColor: 'green',

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.58,
    shadowRadius: 16.0,
    elevation: 24,
  },
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
