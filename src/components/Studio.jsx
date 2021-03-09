import React from 'react';
import { Text, View, TouchableOpacity, StyleSheet, ImageBackground } from 'react-native';
import { format } from 'date-fns';
import ru from "date-fns/locale/ru";

const Studio = ({studio, onOpen }) => {
  const {name, title, imgUrl, age_min} = studio;
  
  return (
    <TouchableOpacity onPress={onOpen} style={styles.wrap} activeOpacity={0.7}>
      <View style={styles.studio}>
        <ImageBackground source={{ uri: imgUrl }} style={styles.image}>
          <View style={styles.textWrap}>
            <Text style={styles.title}>{name.substr(0,25)}...</Text>
            {/* <Text style={styles.date}>{price}</Text> */}
            <Text style={styles.date}>{age_min}+</Text>
          </View>
        </ImageBackground>
      </View>
    </TouchableOpacity>
  );
};

export default Studio;

const styles = StyleSheet.create({
  center: {
    // flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  studio: {
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
