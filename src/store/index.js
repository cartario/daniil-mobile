import {createStore, combineReducers, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import {reducer as studios} from '../store/reducers/studios';
// import {reducer as user} from '../store/reducers/user';
// import {eventsReducer} from '../store/reducers/events';

const rootReducer = combineReducers({
  studios
})

export const store = createStore(rootReducer, applyMiddleware(thunk));
