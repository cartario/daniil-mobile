import React from 'react';
import { Text, View, StyleSheet, FlatList, RefreshControl } from 'react-native';

import AppLoader from '../components/AppLoader';
import Event from '../components/Event';

const EventsScreen = ({ navigation }) => {
  const [refreshing, setRefreshing] = React.useState(false);
  const [events, setEvents] = React.useState();

  const onRefresh = React.useCallback(async () => {
    setRefreshing(true);
    try { //дублирование!!!!!!TODO add operation dispatch
      const response = await fetch(`https://centerdaniil.ru/api/events`);
      const data = await response.json();

      const adapter = (data) => {
        data.forEach((event) => (event.id = event._id));
        return data.sort((a, b) => new Date(b.date) - new Date(a.date)); //сортирует по дате - новые сверху
      };

      setEvents(adapter(data));

      setRefreshing(false);
    } catch (error) {
      console.error(error);
    }
  }, [refreshing]);

  const handleOpen = (event) => {
    navigation.navigate('Event', {
      eventId: event.id,
      eventTitle: event.title,
    });
  };

  React.useEffect(() => {
    async function fetchEvents() {
      try {
        const response = await fetch(`https://centerdaniil.ru/api/events`);
        const data = await response.json();

        const adapter = (data) => {
          data.forEach((event) => (event.id = event._id));
          return data.sort((a, b) => new Date(b.date) - new Date(a.date)); //сортирует по дате - новые сверху
        };

        setEvents(adapter(data));
      } catch (err) {
        console.log(err);
      }
    }
    fetchEvents();
  }, []);

  if (!events) {
    return <AppLoader />;
  }

  return (
    <>
      <View style={styles.wrap}>
        {events.length ? (
          <FlatList
            keyExtractor={(item) => item.id}
            data={events.slice(4,8)}
            renderItem={({ item }) => <Event event={item} onOpen={() => handleOpen(item)} />}
            refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
          />
        ) : (
          <View style={styles.noEvents}>
            <Text>no-events</Text>
          </View>
        )}
      </View>
    </>
  );
};

export default EventsScreen;

const styles = StyleSheet.create({
  wrap: {
    padding: 10,
  },
  noEvents: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
