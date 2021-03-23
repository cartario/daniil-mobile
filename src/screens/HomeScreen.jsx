import React from 'react';
import {
  Text,
  View,
  ScrollView,
  StyleSheet,
  FlatList,
  Image,
  RefreshControl,
  Platform,
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { Operations } from '../store/operations/home';
import BoardItem from '../components/BoardItem';
import AppLoader from '../components/AppLoader';
import { THEME } from '../theme';
import { format } from 'date-fns';
import ru from 'date-fns/locale/ru';
import { LinearGradient } from 'expo-linear-gradient';
import NewEvent from '../components/NewEvent';

const HomeScreen = ({ navigation }) => {
  const [refreshing, setRefreshing] = React.useState(false);
  const dispatch = useDispatch();
  const { allStudios, isLoaded, todayStudios, event } = useSelector(({ home }) => home);

  const studiosLusinvoka = todayStudios.filter((studio) => studio.adress === 'Люсиновская, 53');
  const studiosTrofimova = todayStudios.filter((studio) => studio.adress !== 'Люсиновская, 53');

  const handleBoardItemOpen = (obj) => {
    navigation.navigate('Studios', { screen: 'Studio', params: obj });
  };

  const onRefresh = React.useCallback(async () => {
    setRefreshing(true);
    try {
      dispatch(Operations.fetchStudios());
      dispatch(Operations.fetchEvent());
      setRefreshing(false);
    } catch (error) {
      console.error(error);
    }
  }, [refreshing]);

  React.useEffect(() => {
    dispatch(Operations.fetchStudios());
    dispatch(Operations.fetchEvent());
  }, []);

  if (!allStudios.length) {
    return <AppLoader />;
  }

  return (
    <View style={styles.wrap}>
      
      {/* {Platform.OS === 'ios' && (
        <NewEvent />
      )} */}

      <ScrollView refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
        <View>
          {!event ? (
            <View style={styles.noEvent}>
              <Text style={{ textAlign: 'center' }}>
                Мы еще готовим для вас ближайшее мероприятие...
              </Text>
            </View>
          ) : (
            <>
              <LinearGradient colors={[THEME.MAIN_COLOR, '#01579b']}>
                <Text style={styles.header}>
                  Предстоящее мероприятие
                  <Text style={styles.headerDate}>
                    {' '}
                    {format(new Date(event.date), 'dd MMMM iiii', { locale: ru })}
                  </Text>
                </Text>
              </LinearGradient>

              <Image
                style={{ width: '100%', height: 400 }}
                source={{ uri: event.posterUrl }}
                resizeMode="contain"
              />

              <Text style={styles.eventDescription}>{event.description}</Text>
            </>
          )}
        </View>

        <LinearGradient colors={[THEME.MAIN_COLOR, '#01579b']} style={{ marginTop: 40 }}>
          <Text style={styles.header}>
            Занятия на сегодня
            <Text style={styles.headerDate}>
              {' '}
              {format(new Date(), 'dd MMMM iiii', { locale: ru })}
            </Text>
          </Text>
        </LinearGradient>

        {studiosLusinvoka.length ? (
          <>
            <Text style={styles.addressTitle}>Люсиновская, 53</Text>
            <View style={styles.list}>
              {studiosLusinvoka.map((item) => (
                <BoardItem key={item.id} studio={item} onOpen={handleBoardItemOpen} />
              ))}
            </View>
          </>
        ) : (
          <Text>Сегодня на Люсиновской занятия закончились</Text>
        )}

        {studiosTrofimova.length ? (
          <>
            <Text style={styles.addressTitle}>Трофимова 9 корп.2</Text>
            <View style={styles.list}>
              {studiosTrofimova.map((item) => (
                <BoardItem key={item.id} studio={item} onOpen={handleBoardItemOpen} />
              ))}
            </View>
          </>
        ) : (
          <Text>Сегодня на Трофимова занятия закончились</Text>
        )}
      </ScrollView>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  wrap: {
    textAlign: 'center',
  },
  header: {
    minHeight: 50,
    paddingVertical: 20,
    paddingHorizontal: 5,
    fontSize: 20,
    textAlign: 'center',
    color: '#fff',
  },
  headerDate: {
    fontWeight: 'bold',
  },
  list: {
    marginBottom: 20,
    backgroundColor: THEME.ORANGE_COLOR,
  },
  addressTitle: {
    marginVertical: 10,
    textAlign: 'center',
    color: THEME.MAIN_COLOR,
    fontWeight: 'bold',
  },
  noEvent: {
    paddingTop: 20,
    textAlign: 'center',
  },
  eventDescription: {
    margin: 0,
    padding: 10,
  }
});
