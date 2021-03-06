import { ACTION_TYPES } from '../types';

const initialState = {
  allStudios: [],
  todayStudios: [],
  isLoaded: false,
  event: null,
};

export const reducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case ACTION_TYPES.SET_STUDIOS:
      const today = new Date().getDay().toString();

      return {
        ...state,
        allStudios: payload,
        todayStudios: payload
          .filter((studio) => studio.day === today)
          .sort((a, b) => Number(a.timeFrom.split(':')[0]) - Number(b.timeFrom.split(':')[0])), //сортировка по времени
      };

    case ACTION_TYPES.SET_EVENT:
      return {...state,
        event: payload
      }
    default:
      return state;
  }
};
