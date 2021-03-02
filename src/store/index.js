import {createStore, combineReducers, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import {reducer as events} from '../store/reducers/events';
// import {reducer as user} from '../store/reducers/user';
// import {eventsReducer} from '../store/reducers/events';

const rootReducer = combineReducers({
  events
})

export const store = createStore(rootReducer, applyMiddleware(thunk));
