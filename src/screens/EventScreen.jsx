import React from 'react';
import {
  Text,
  View,
  ScrollView,
  StyleSheet,
  Image,
  Dimensions,
  Button,
  FlatList,
  RefreshControl,
  Platform,
} from 'react-native';

import AppLoader from '../components/AppLoader';
import { format } from 'date-fns';
import ru from 'date-fns/locale/ru';
import { THEME } from '../theme';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Calendar from '../components/Calendar';
import AddToBooked from '../components/AddToBooked';

const EventScreen = ({ navigation, route }) => {
  const { eventId } = route.params;
  const [event, setEvent] = React.useState();
  const [showPhotos, setShowPhotos] = React.useState(false);

  const toggleShowPhotos = () => {
    setShowPhotos(!showPhotos);
  };

  const windowWidth = Dimensions.get('window').width;
  const [imgSize, setImgSize] = React.useState({ width: 0, height: 0 });

  React.useEffect(() => {
    async function fetchEvent() {
      try {
        const response = await fetch(`https://centerdaniil.ru/api/events/${eventId}`);
        const data = await response.json();
        setEvent(data);

        Image.getSize(data.posterUrl, (width, height) => {
          //узнаем размеры нужной картинки

          setImgSize({
            width: width,
            height: height,
          });
        });
      } catch (err) {
        console.log(err);
      }
    }
    fetchEvent();
  }, []);

  if (!event || !imgSize.width) {
    //проевряем если появмлся ивент и размеры картинки
    return <AppLoader />;
  }

  const { title, posterUrl, date, description, place, category, photos } = event;

  const imgResize = (windowWidth / imgSize.width) * imgSize.height; //утсанавливаем размеры для картинки

  return (
    <ScrollView style={styles.wrap}>
      <Image
        style={{ ...styles.img, height: imgResize }}
        source={{ uri: posterUrl }}
        resizeMode="cover"
      />

      {Platform.OS === 'ios' && (
        <>
          <View>
            <AddToBooked/>
          </View>
          <View style={{ ...styles.title }}>
            <Calendar date={date} title={title} />
          </View>
        </>
      )}
      <Text style={{ ...styles.title, ...styles.border }}>{title}</Text>
      <Text style={{ ...styles.date, ...styles.border }}>
        {format(new Date(date), 'dd/MMM/yyyy', { locale: ru })}
      </Text>

      <Text style={{ ...styles.description, ...styles.border }}>{description}</Text>
      <Text style={{ ...styles.border }}>Место проведения: {place}</Text>
      <Text style={{ ...styles.border }}>Категория: {category}</Text>

      {photos && photos.length ? (
        <View style={{ ...styles.border }}>
          <TouchableOpacity onPress={toggleShowPhotos}>
            <Text style={{ textAlign: 'center' }}>
              Фотоотчет {showPhotos ? '(свернуть)' : '(развернуть)'}
            </Text>
          </TouchableOpacity>
          {showPhotos &&
            photos
              .split(',')
              .map((img) => (
                <Image
                  key={img}
                  style={{ width: '100%', minHeight: 400 }}
                  source={{ uri: img.trim() }}
                  resizeMode="contain"
                />
              ))}

          {showPhotos && <Button onPress={() => setShowPhotos(false)} title="свернуть" />}
        </View>
      ) : (
        <Text></Text>
      )}

      <View style={{ marginTop: 30 }}>
        <Text style={{ ...styles.footer }}>Разработка и дизайн приложения:</Text>
        <Text style={{ ...styles.footer }}>Василий Зайков</Text>
        <Text style={{ ...styles.footer }}>+7-926-491-53-49, cartario@yandex.ru</Text>
        <Text style={{ ...styles.footer }}>Москва, 2021</Text>
      </View>
    </ScrollView>
  );
};

export default EventScreen;

const styles = StyleSheet.create({
  wrap: {
    padding: 10,
  },
  border: {
    marginVertical: 5,
    padding: 10,
    borderWidth: 1,
    borderColor: THEME.MAIN_COLOR,
    textAlign: 'center',
  },

  img: {
    width: '100%',
  },
  title: {
    // marginTop: 50,
    textAlign: 'center',
    fontSize: 20,
    fontFamily: 'open-bold',
    backgroundColor: THEME.MAIN_COLOR,
  },
  date: {
    fontSize: 18,
    textAlign: 'center',
    color: THEME.ORANGE_COLOR,
  },
  footer: {
    paddingLeft: 5,
    textAlign: 'center',
    backgroundColor: THEME.ORANGE_COLOR,
    color: '#fff',
  },
});
