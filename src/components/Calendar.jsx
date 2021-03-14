import React from 'react';
import { StyleSheet, View, Text, Button, Platform } from 'react-native';
import * as Calendar from 'expo-calendar';
import { Ionicons } from '@expo/vector-icons'; 

const CalendarComponent = ({date, title}) => {
 
  const [testNewEvent, setTestNewEvent] = React.useState(null);

  const createCalendar = async () => {
    
    const defaultCalendarSource =
    { isLocalAccount: true, name: 'Expo Calendar' };  
    
    const calendars = await Calendar.getCalendarsAsync(Calendar.EntityTypes.EVENT);
    const expoCalendar = calendars.find((each)=>each.title==='Expo Calendar');
  
    let calendarId;

    if(!expoCalendar){
      calendarId = await Calendar.createCalendarAsync({
        title: 'Expo Calendar',
        color: 'blue',
        entityType: Calendar.EntityTypes.EVENT,
        sourceId: defaultCalendarSource.id,
        source: defaultCalendarSource,
        name: 'internalCalendarName',
        ownerAccount: 'personal',
        accessLevel: Calendar.CalendarAccessLevel.OWNER,
      });
    }

    calendarId = expoCalendar.id;    
    
    const newEvent = await Calendar.createEventAsync(calendarId, {
      title: title || 'testTitle',
      startDate: new Date(date),
      endDate: new Date(date),
    });

    setTestNewEvent(true);    
  };

  React.useEffect(() => {
    (async () => {
      const { status } = await Calendar.requestCalendarPermissionsAsync();
      if (status === 'granted') {
        await Calendar.getCalendarsAsync(Calendar.EntityTypes.EVENT);        
      }
    })();
  }, []);

  React.useEffect(()=>{
    if(testNewEvent){
      alert('Событие добавлено в календарь')
    }
  }, [testNewEvent])

  return (
    <View style={styles.container}>  
    <Ionicons name="md-calendar-outline" size={32} color="black" />   
      <Button title="Добавить в календарь?" onPress={createCalendar} />
      {testNewEvent ? <Text style={{color: 'green', textAlign: 'center'}}>Успешно добавлено</Text> : <Text></Text>}
    </View>
  );
};

export default CalendarComponent;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    textAlign: 'center',
    backgroundColor: 'lightgrey',
  },
});
