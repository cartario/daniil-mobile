import {createStore, combineReducers, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import {reducer as home} from '../store/reducers/home';
// import {reducer as user} from '../store/reducers/user';
// import {eventsReducer} from '../store/reducers/events';

const rootReducer = combineReducers({
  home
})

export const store = createStore(rootReducer, applyMiddleware(thunk));
