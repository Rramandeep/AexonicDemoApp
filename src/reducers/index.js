import { combineReducers } from 'redux'
import { locationsData } from './locationDataReducer';

const appReducer = combineReducers({
  locationsData
});

const rootReducer = (state, action) => {
  return appReducer(state, action);
};

export default rootReducer;