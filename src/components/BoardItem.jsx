import React from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import { THEME } from '../theme';

const BoardItem = ({ studio, onOpen }) => {
  const { id, title, timeFrom, timeTo, age_min } = studio;

  const time = new Date().getHours();
  const timeFromAdapted = Number(timeFrom.split(':')[0]);
  const timeToAdapted = Number(timeTo.split(':')[0]);

  const isMatch = (time>=timeFromAdapted && time<timeToAdapted);

  // const testTime = 16;
  // const isMatch = testTime >= timeFromAdapted && testTime < timeToAdapted; //тестовый

  const handleClick = () =>{
    const obj = {
      studioId: id,      
      studioTitle: title,
    };

    onOpen(obj)
  };  

  return (
    <TouchableOpacity
      activeOpacity='0.7'
      onPress={handleClick}
    >
      <View style={isMatch ? { ...styles.wrap, backgroundColor: THEME.MAIN_COLOR } : styles.wrap}>
        <Text style={styles.text}>
          {title} {age_min}+
        </Text>
        <Text style={styles.textNow}>{isMatch ? 'прямо сейчас' : ''}</Text>
        <Text style={styles.time}>
          {timeFrom}-{'\n'}
          {timeTo}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default BoardItem;

const styles = StyleSheet.create({
  wrap: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#fff',
  },
  text: {
    width: '60%',
    padding: 10,
    color: '#fff',
  },
  textNow: {
    width: '20%',
    paddingTop: 10,
    fontSize: 12,
    color: '#000',
  },
  time: {
    width: '20%',
    padding: 10,
    color: '#fff',
  },
});
