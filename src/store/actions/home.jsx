import {ACTION_TYPES} from '../types';

export const ActionCreators = {
  setStudios: (studios)=>({
    type: ACTION_TYPES.SET_STUDIOS,
    payload: studios
  }),

  setEvent: (event)=>({
    type: ACTION_TYPES.SET_EVENT,
    payload: event
  })
}