import React from 'react';
import { Text, View, ScrollView, StyleSheet, FlatList } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { Operations } from '../store/operations/studios';
import BoardItem from '../components/BoardItem';
import AppLoader from '../components/AppLoader';
import { THEME } from '../theme';
import { format } from 'date-fns';
import ru from 'date-fns/locale/ru';

const HomeScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const { allStudios, isLoaded, todayStudios } = useSelector(({ studios }) => studios);

  const studiosLusinvoka = todayStudios.filter((studio) => studio.adress === 'Люсиновская, 53');
  const studiosTrofimova = todayStudios.filter((studio) => studio.adress !== 'Люсиновская, 53');

  const handleBoardItemOpen = (obj) => {   
    navigation.navigate('Studios', { screen: 'Studio', params: obj });
  };

  React.useEffect(() => {
    dispatch(Operations.fetchStudios());
  }, []);

  if (!allStudios.length) {
    return <AppLoader />;
  }

  return (
    <View style={styles.wrap}>
      <ScrollView>
        <Text style={styles.header}>
          Занятия на сегодня
          <Text style={styles.headerDate}>
            {' '}
            {format(new Date(), 'dd MMMM iiii', { locale: ru })}
          </Text>
        </Text>

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
    marginVertical: 20,
    fontSize: 20,
    textAlign: 'center',
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
});
