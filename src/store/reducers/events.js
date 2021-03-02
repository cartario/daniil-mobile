import { ACTION_TYPES } from "../types";

const initialState = {
  items: []
};

export const reducer = (state = initialState, action) => {
  const {type, paylod} = action;

  switch(type){
    case ACTION_TYPES.SET_EVENTS:
      return state;
    default: 
      return state;
  }
};
