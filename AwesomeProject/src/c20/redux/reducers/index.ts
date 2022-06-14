import {combineReducers} from 'redux';
import {counterReducer as Counter} from './counter';

const rootReducer = combineReducers({
  Counter,
});

export default rootReducer;
