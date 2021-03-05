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
} from 'react-native';

import AppLoader from '../components/AppLoader';
import { format } from 'date-fns';
import ru from 'date-fns/locale/ru';
import { THEME } from '../theme';
import { TouchableOpacity } from 'react-native-gesture-handler';

const DAYS = ['ПН','ВТ','СР','ЧТ','ПТ','СБ','ВС'];

const StudioScreen = ({ navigation, route }) => {
  const { studioId } = route.params;
  const [studio, setStudio] = React.useState();
  const [targetStudios, setTargetStudios] = React.useState();
  const [showPhotos, setShowPhotos] = React.useState(false);

  const toggleShowPhotos = () => {
    setShowPhotos(!showPhotos);
  };

  const windowWidth = Dimensions.get('window').width;
  const [imgSize, setImgSize] = React.useState({ width: 0, height: 0 });

  React.useEffect(() => {
    async function fetchEvent() {
      try {
        
        const response = await fetch(`https://centerdaniil.ru/api/studios/${studioId}`);
        const data = await response.json();
        setStudio(data);

        const responseList = await fetch(`https://centerdaniil.ru/api/studios`);
        const dataList = await responseList.json();

        const targetStudios = dataList.filter((item)=>item.name===data.name);        

        setTargetStudios(targetStudios.map((stud)=>{
          return {
            day: stud.day,
            timeFrom: stud.timeFrom,
            timeTo: stud.timeTo,
            age_min: stud.age_min,
            groupNumber: stud.groupNumber
          }
        }));

        Image.getSize(data.imgUrl, (width, height) => {
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

  if (!studio || !imgSize.width) {
    //проевряем если появмлся ивент и размеры картинки
    return <AppLoader />;
  }  

  console.log(targetStudios);

  const { title, imgUrl, description, adress, cab, type, day, timeFrom, timeTo, age_min , price, groupNumber} = studio;

  const imgResize = (windowWidth / imgSize.width) * imgSize.height; //утсанавливаем размеры для картинки

  return (
    <ScrollView style={styles.wrap}>
      <Image
        style={{ ...styles.img, height: imgResize }}
        source={{ uri: imgUrl }}
        resizeMode="cover"
      />
      <Text style={{ ...styles.title, ...styles.border }}>{title}</Text>     

      <Text style={{ ...styles.date, ...styles.border }}>
        {targetStudios.map((studio)=> {
          const {day, timeFrom, timeTo, groupNumber, age_min} = studio;
          return `${DAYS[day]} ${timeFrom}-${timeTo} (${groupNumber} подгруппа ${age_min}+) ${"\n"}`
        })}    
      </Text>
      
      <Text style={{ ...styles.description, ...styles.border }}>{description}</Text>
      <Text style={{ ...styles.border }}>Адрес: {adress} {"\n"} Кабинет: {cab}</Text>
      <Text style={{ ...styles.border }}>Стоимость: {price==='free' ? 'Бесплатно' : price}</Text>
      <Text style={{ ...styles.border }}>Категория: {type}</Text>

      <View style={{ marginTop: 30 }}>
        <Text style={{ ...styles.footer }}>Разработка и дизайн приложения:</Text>
        <Text style={{ ...styles.footer }}>Василий Зайков</Text>
        <Text style={{ ...styles.footer }}>+7-926-491-53-49, cartario@yandex.ru</Text>
        <Text style={{ ...styles.footer }}>Москва, 2021</Text>
      </View>
     
    </ScrollView>
  );
};

export default StudioScreen;

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
    marginTop: 50,
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
