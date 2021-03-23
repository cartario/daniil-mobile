import React from 'react';
import { Text, Button, View, StyleSheet, TextInput, TouchableOpacity, Keyboard } from 'react-native';
import { THEME } from '../theme';
import {Http} from '../http';
import * as Linking from 'expo-linking';
import Scanner from '../components/Scanner';

const ScannerScreen = ({ navigation }) => {
  const [form, setForm] = React.useState('');
  const [status, setStatus] = React.useState({
    isLoaded: false,
    isSuccessAdded: null
  });
   
  const {isLoaded, isSuccessAdded} = status;  

  

  React.useEffect(()=>{
    let timer;
    if(isSuccessAdded){
      timer = setTimeout(()=>{
        setStatus({...status, isSuccessAdded: null})
      }, 3000)
    }

    return ()=>clearTimeout(timer);
  },[isSuccessAdded])

  return (
    <View style={styles.center}>      
      <Button title="вернуться назад" onPress={() => navigation.goBack()} />
      <Text style={styles.header}>Сканер</Text>
      <Scanner />

        
    </View>
  );
};

export default ScannerScreen;

const styles = StyleSheet.create({
  center: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
  header: {
    fontSize: 20,
    fontFamily: 'open-bold',
  },
  tost: {
    width: '70%',
    padding: 10,
    textAlign: 'center',
    backgroundColor: 'green',
    color: 'white',
  },
  input: {
    width: '70%',
    height: 100,
    marginVertical: 10,
    padding: 20,
    borderColor: 'grey',
    borderWidth: 2,
    borderRadius: 20,
    color: 'black',
    backgroundColor: '#fff',
  },
  btn: {
    alignItems: 'center', 
    width: '70%',
    padding: 10,
    backgroundColor: THEME.MAIN_COLOR,      
    borderColor: 'grey',
    borderWidth: 2,
    borderRadius: 20
  },
  link: {
    marginVertical: 10,
    textDecorationLine: 'underline'
  }
});
