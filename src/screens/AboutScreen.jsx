import React from 'react';
import { Text, Button, View, StyleSheet, TextInput, TouchableOpacity, Keyboard } from 'react-native';
import { THEME } from '../theme';
import {Http} from '../http';
import * as Linking from 'expo-linking';

const AboutScreen = ({ navigation }) => {
  const [form, setForm] = React.useState('');
  const [status, setStatus] = React.useState({
    isLoaded: false,
    isSuccessAdded: null
  });
   
  const {isLoaded, isSuccessAdded} = status;  

  const isValid = form.length > 3;

  const handleSubmit = async () => {
    setStatus({...status, isLoaded: true})
    try{
      const response = await Http.post('https://daniil-mobile-default-rtdb.firebaseio.com/feedbacks.json',form);
      setForm('');
      
      if(response){
        setStatus({isLoaded: false, isSuccessAdded: true})
      }
      else{
        setStatus({isLoaded: false, isSuccessAdded: null})
      }      
    }
    catch(err){ 
      setStatus({isLoaded: false, isSuccessAdded: null})    
      throw err;
    }      
  };

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
      <Text style={styles.header}>О приложении</Text>

      

      <View style={{ alignItems: 'center' }} >
        <Text style={{ fontWeight: 'bold', marginTop: 10 }}>Версия 1.0.0. </Text>
        
        <TouchableOpacity onPress={()=>Linking.openURL('https://centerdaniil.ru')}>
          <Text style={styles.link}>Подробности: https://centerdaniil.ru</Text>
        </TouchableOpacity>
       
      </View>

      <Text style={{...styles.header, marginTop: 20}}>Обратная связь</Text>
      <Button title='скрыть клавиатуру' onPress={()=>Keyboard.dismiss()}/>
      <TextInput
        style={styles.input}          
        placeholder="введите текст(минимум 3 символа)"
        multiline
        autoCapitalize="none"
        autoCorrect={false}
        maxLength={64}
        defaultValue={form}
        onChangeText={setForm}            
      /> 
      {isSuccessAdded && <Text style={styles.tost}>Успешно отправлено</Text>}
      <TouchableOpacity  
        activeOpacity={0.7}
        style={isValid ? styles.btn : {...styles.btn, backgroundColor: 'grey'}}
        onPress={handleSubmit}
        disabled={!isValid}
      >
        
        <Text style={{color: '#fff'}}>{isLoaded ? 'Отправление...' : 'Отправить'}</Text>
      </TouchableOpacity>

      <View style={{ alignItems: 'center' }}>
        <Text style={{ marginTop: 20 }}>Разработка и дизайн: </Text>
        <Text>Vasiliy Zaikov</Text>
        <Text>cartario@yandex.ru</Text>
      </View>      
    </View>
  );
};

export default AboutScreen;

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
