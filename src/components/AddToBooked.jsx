import React from 'react';
import { StyleSheet, View, Text, Button } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; 
import { THEME } from '../theme';

const AddToBooked = () => {
  const [booked, setBooked] = React.useState(false);

  const handleClick = () => {    
    setBooked(!booked)
  }

  return (
    <View style={styles.container}>  
    <Ionicons name={booked ? 'star' : 'star-outline'} size={32} color={THEME.MAIN_COLOR} onPress={handleClick} />
      {/* <Button title="Добавить в избранное?" onPress={handleClick} />       */}
    </View>
  );
};

export default AddToBooked;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginVertical: 20,
    textAlign: 'center',    
  },
});
