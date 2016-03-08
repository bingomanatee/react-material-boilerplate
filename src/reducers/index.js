import { combineReducers } from 'redux';
import fuelSavingsAppState from './fuelSavings';
import user from './user';

const rootReducer = combineReducers({
  fuelSavingsAppState,
  user
});

export default rootReducer;
