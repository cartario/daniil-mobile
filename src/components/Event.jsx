import React from 'react';
import { Text, View, TouchableOpacity, StyleSheet, ImageBackground } from 'react-native';
import { format } from 'date-fns';
import ru from "date-fns/locale/ru";

const Event = ({event, onOpen }) => {
  const {title, posterUrl, date} = event;
  return (
    <TouchableOpacity onPress={onOpen} style={styles.wrap} activeOpacity={0.7}>
      <View style={styles.event}>
        <ImageBackground source={{ uri: posterUrl }} style={styles.image}>
          <View style={styles.textWrap}>
            <Text style={styles.title}>{title.substr(0,12)}...</Text>
            {/* <Text style={styles.date}>{price}</Text> */}
            <Text style={styles.date}>{format(new Date(date), 'dd/MMM/yyyy', {locale: ru})}</Text>
          </View>
        </ImageBackground>
      </View>
    </TouchableOpacity>
  );
};

export default Event;

const styles = StyleSheet.create({
  center: {
    // flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  event: {
    flex: 1,
    marginBottom: 20,
  },
  image: {
    width: '100%',
    height: 200,
  },
  textWrap: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    padding: 15,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  title: {
    fontSize: 18,
    fontFamily: 'open-bold',
    color: 'white',
  },
  date: {
    color: '#fff',
  },
});
