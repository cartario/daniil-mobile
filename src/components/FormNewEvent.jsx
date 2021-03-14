import React from 'react';
import { View, Text, TextInput, StyleSheet, Button } from 'react-native';
import { THEME } from '../theme';
import { Http } from '../http';

const BASE_URL = 'https://daniil-mobile-default-rtdb.firebaseio.com/new-events.json';

const FormNewEvent = () => {

  const initialState = {
    formName: '',    
    formComment: '',
  };

  const [form, setForm] = React.useState(initialState);
  const [isLoading, setLoading] = React.useState(false);
  const [isSendOk, setSendOk] = React.useState(null);
  const [error, setError] = React.useState(null);

  const handleSubmit = async () => {
    setLoading(true);
    setError(null);
    try {
      
      const response = await Http.post(BASE_URL, {        
        ...form,
        createdDate: new Date().toJSON()
      });
      
      if(response) {       
        setSendOk(true);
        setForm(initialState);
        setLoading(false);
        setError(null);
      }
      else{
        setError('something went wrong')
      }
    } catch (err) {
      setError('something went wrong');
      setLoading(false);
      throw err;
    }    
  };

  React.useEffect(() => {
    let timer;
    if (isSendOk) {
      timer = setTimeout(() => {
        setSendOk(null);
      }, 3000);
    }

    return ()=>clearTimeout(timer)
  }, [isSendOk]);

  return (
    <View style={{marginVertical: 20}}>
      <View style={styles.field}>
        <Text style={styles.label}>Название события</Text>
        <TextInput
          style={styles.input}
          onChangeText={(text) =>
            setForm({
              ...form,
              formName: text,
            })
          }
          value={form.formName}
          placeholder="обязательное поле"
        />
      </View>     

      <View style={styles.field}>
        <Text style={styles.label}>Ссылка на событие</Text>
        <TextInput
          style={styles.input}
          onChangeText={(text) =>
            setForm({
              ...form,
              formComment: text,
            })
          }
          value={form.formComment}
          placeholder="обязательное поле"
        />
      </View>

      {isSendOk && <Text style={styles.sendOk}>Успешно отправлено</Text>}
      {error && <Text style={styles.error}>{error}</Text>}

      <View style={styles.submit}>
        <Button
          title={isLoading ? 'Отправка...' : 'Отправить'}
          color={THEME.ORANGE_COLOR}
          disabled={Boolean(!form.formName.length||!form.formComment.length) || isLoading}
          onPress={handleSubmit}
        />
      </View>
    </View>
  );
};

export default FormNewEvent;

const styles = StyleSheet.create({
  field: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  label: {
    width: 100,
  },
  input: {
    width: '70%',
    padding: 10,
    borderColor: 'grey',
    borderBottomWidth: 2,
    color: 'black',
    backgroundColor: '#fff',
  },
  submit: {
    marginTop: 20,   
    borderWidth: 1,
    borderColor: THEME.ORANGE_COLOR
  },
  sendOk: {
    marginTop: 20,
    padding: 20,
    textAlign: 'center',
    backgroundColor: 'green',
    color: '#fff',
  },
  error: {
    marginTop: 20,
    padding: 20,
    textAlign: 'center',
    backgroundColor: 'red',
    color: '#fff',
  },
});
