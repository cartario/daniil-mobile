import { ActionCreators } from '../actions/home';
import { Http } from '../../http';

const BASE_URL = 'https://centerdaniil.ru/api/studios';
const BASE_EVENTS_URL = 'https://centerdaniil.ru/api/events';

const adapter = (data) => {
  //адаптирую ответ сервера к своей структуре данных
  data.forEach((studio) => (studio.id = studio._id));
  return data;
};

const getRandomEvent = (items) => {  
  // items[0].priority = true; //принудительно сетит первый элемент массива
  const priorityEvent = items.find((items) => items.priority); //выбирает приоритетный ивент
  return priorityEvent || items[Math.floor(Math.random() * items.length)];
};

export const Operations = {
  fetchStudios: () => async (dispatch) => {
    // dispatch(ActionCreators.setLoader(true));
    try {
      const studios = await Http.get(BASE_URL);
      dispatch(ActionCreators.setStudios(adapter(studios)));
    } catch (err) {
      console.log(err);
    } finally {
      // dispatch(ActionCreators.setLoader(false));
    }
  },

  fetchEvent: () => async (dispatch) => {
    try {
      const events = await Http.get(BASE_EVENTS_URL);
      const last3Events = events
      .filter((item)=>new Date(item.date)>=new Date()) //фильтрует предстоящие даты
      .sort((b, a) => new Date(a.date) - new Date(b.date)).slice(0, 3); //сортирует по дате и берет 3 последних
      const randomEvent = getRandomEvent(last3Events);
      randomEvent.id = randomEvent._id; //adapter
      dispatch(ActionCreators.setEvent(randomEvent));
    } catch (err) {
      throw err;
    }
  },
};
